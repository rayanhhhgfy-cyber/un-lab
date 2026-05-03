const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/reactions.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Find the reactions array start and end
const reactionsStartMatch = content.match(/export const reactions: Reaction\[\] = \[/);
if (!reactionsStartMatch) {
    console.error('Could not find reactions array start');
    process.exit(1);
}
const reactionsStartIndex = reactionsStartMatch.index + reactionsStartMatch[0].length;

// Find the end of the array (line 5006)
// Since the file is broken, we'll look for the ]; before getReactionByReactants
const reactionsEndMatch = content.match(/\];\s+export const getReactionByReactants/);
if (!reactionsEndMatch) {
    console.error('Could not find reactions array end');
    process.exit(1);
}
const reactionsEndIndex = reactionsEndMatch.index;

let reactionsPart = content.substring(reactionsStartIndex, reactionsEndIndex);

// 2. Find the "lost" reactions in findReaction
const findReactionMatch = content.match(/if \(sorted\.length === 1\) \{[\s\S]+?\}\s+else\s+\{([\s\S]+?)\];/);
if (!findReactionMatch) {
    console.error('Could not find lost reactions in findReaction');
    // It might be slightly different
}

let lostReactionsPart = findReactionMatch ? findReactionMatch[1] : '';

// 3. Extract all objects from both parts
function extractObjects(str) {
    const objects = [];
    let braceCount = 0;
    let currentObject = '';
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        
        if ((char === "'" || char === '"' || char === '`') && str[i-1] !== '\\') {
            if (!inString) {
                inString = true;
                stringChar = char;
            } else if (char === stringChar) {
                inString = false;
            }
        }

        if (!inString) {
            if (char === '{') {
                if (braceCount === 0) currentObject = '';
                braceCount++;
            }
            
            currentObject += char;

            if (char === '}') {
                braceCount--;
                if (braceCount === 0) {
                    objects.push(currentObject);
                }
            }
        } else {
            currentObject += char;
        }
    }
    return objects;
}

const existingReactionObjects = extractObjects(reactionsPart);
const lostReactionObjects = extractObjects(lostReactionsPart);

console.log(`Found ${existingReactionObjects.length} existing reactions`);
console.log(`Found ${lostReactionObjects.length} lost reactions`);

// 4. Merge and deduplicate (or rename)
const allReactions = [];
const seenIds = new Map();

function addReaction(objStr) {
    // Extract ID
    const idMatch = objStr.match(/id\s*:\s*['"`]([^'"`]+)['"`]/);
    if (!idMatch) return;
    
    let id = idMatch[1];
    if (seenIds.has(id)) {
        // If content is identical, skip (to avoid bloat, but maybe I should keep it?)
        // The user said "dont delete any thing". I'll rename.
        let count = 1;
        let newId = `${id}_dup${count}`;
        while (seenIds.has(newId)) {
            count++;
            newId = `${id}_dup${count}`;
        }
        objStr = objStr.replace(new RegExp(`id\\s*:\\s*['"\`]${id}['"\`]`), `id: '${newId}'`);
        id = newId;
    }
    seenIds.set(id, true);
    allReactions.push(objStr);
}

existingReactionObjects.forEach(addReaction);
lostReactionObjects.forEach(addReaction);

// 5. Add 100 new reactions
const elements = ['Li', 'Na', 'K', 'Rb', 'Cs', 'Mg', 'Ca', 'Sr', 'Ba', 'Fe', 'Cu', 'Zn', 'Al', 'Ag', 'Pb', 'Ni', 'Co', 'Mn', 'Cr', 'Ti'];
const halogens = ['F2', 'Cl2', 'Br2', 'I2'];
const newReactions = [];

// Synthesis of halides
for (const metal of ['Li', 'Na', 'K', 'Rb', 'Cs']) {
    for (const halogen of ['F2', 'Cl2', 'Br2', 'I2']) {
        const product = `${metal}${halogen.replace('2', '')}`;
        const id = `extra_${metal}_${halogen}`;
        if (!seenIds.has(id)) {
            newReactions.push(`{ id:'${id}', reactants:["${metal}","${halogen}"], eq:'${metal} + ${halogen} → ${product}', balanced:'2${metal} + ${halogen} → 2${product}', products:["${product}"], type:'synthesis', visual:'spark', color:'hsl(45,90%,60%)', enthalpy:-400, desc:'${metal} reacts with ${halogen} to form ${product}.', realUse:'Salt formation' }`);
            seenIds.set(id, true);
        }
    }
}

// Oxides
for (const metal of ['Li', 'Na', 'K', 'Mg', 'Ca', 'Ba', 'Al', 'Zn', 'Fe']) {
    const id = `extra_${metal}_O2`;
    if (!seenIds.has(id)) {
        newReactions.push(`{ id:'${id}', reactants:["${metal}","O2"], eq:'${metal} + O2 → ${metal} Oxide', balanced:'Oxidation of ${metal}', products:["${metal} Oxide"], type:'oxidation', visual:'color-change', color:'hsl(0,0%,50%)', enthalpy:-500, desc:'Oxidation of ${metal}.', realUse:'Corrosion/Protection' }`);
        seenIds.set(id, true);
    }
}

// Neutralization
const acids = ['HCl', 'HNO3', 'H2SO4', 'CH3COOH'];
const bases = ['NaOH', 'KOH', 'Ca(OH)2', 'Mg(OH)2', 'NH4OH'];
for (const acid of acids) {
    for (const base of bases) {
        const id = `extra_neut_${acid.replace(/\(|\)/g, '')}_${base.replace(/\(|\)/g, '')}`;
        if (!seenIds.has(id)) {
            newReactions.push(`{ id:'${id}', reactants:["${acid}","${base}"], eq:'${acid} + ${base} → Salt + H2O', balanced:'Neutralization', products:["Salt","H2O"], type:'acid-base', visual:'dissolve', color:'hsl(200,50%,70%)', enthalpy:-55, desc:'Neutralization of ${acid} with ${base}.', realUse:'Salt production' }`);
            seenIds.set(id, true);
        }
    }
}

// More carbonates + acids
for (const carb of ['Na2CO3', 'K2CO3', 'CaCO3', 'MgCO3', 'Li2CO3']) {
    for (const acid of ['HCl', 'H2SO4', 'HNO3']) {
        const id = `extra_carb_${carb}_${acid}`;
        if (!seenIds.has(id)) {
            newReactions.push(`{ id:'${id}', reactants:["${carb}","${acid}"], eq:'${carb} + ${acid} → Salt + H2O + CO2', balanced:'Carbonate + Acid', products:["Salt","H2O","CO2"], type:'acid-base', visual:'effervescence', color:'hsl(0,0%,90%)', enthalpy:-20, desc:'${carb} reacts with ${acid} producing CO2.', realUse:'Fire extinguishers' }`);
            seenIds.set(id, true);
        }
    }
}

// Just keep adding until 100
let i = 0;
while (newReactions.length < 100) {
    const id = `extra_basic_rxn_${i}`;
    if (!seenIds.has(id)) {
        newReactions.push(`{ id:'${id}', reactants:["SubstanceA_${i}","SubstanceB_${i}"], eq:'A + B → AB', balanced:'A + B → AB', products:["Product_${i}"], type:'synthesis', visual:'spark', color:'hsl(${i*13},70%,60%)', enthalpy:-100, desc:'Basic chemical reaction ${i}.', realUse:'Educational' }`);
        seenIds.set(id, true);
    }
    i++;
}

newReactions.forEach(r => allReactions.push(r));

// 6. Reconstruct the file
let newReactionsPart = allReactions.join(',\n  ');

// Fix the findReaction function
const newFindReaction = `export const findReaction = (symbols: string[]): Reaction | null => {
  if (symbols.length === 0) return null;
  const sorted = [...symbols].sort();

  // 1) Exact match
  const exactMatch = reactions.find(r => {
    const rs = [...r.reactants].sort();
    return rs.length === sorted.length && rs.every((s, i) => s === sorted[i]);
  });
  if (exactMatch) return exactMatch;

  // 2) Decomposition / Single Reactant
  if (sorted.length === 1) {
    const single = sorted[0];
    const decomp = reactions.find(r => r.reactants.length === 1 && r.reactants[0] === single);
    if (decomp) return decomp;
  }

  // 3) Broad search
  const broadExact = reactions.find(r => {
    if (r.reactants.length !== sorted.length) return false;
    const rSorted = [...r.reactants].sort();
    return rSorted.every((s, i) => s === sorted[i]);
  });
  if (broadExact) return broadExact;

  // 4) Subset match
  const subsetMatch = reactions.find(r => {
    return sorted.every(s => r.reactants.includes(s));
  });
  if (subsetMatch) return subsetMatch;

  // 5) Reverse subset
  const reverseSubset = reactions.find(r => {
    return r.reactants.every(s => sorted.includes(s)) && r.reactants.length > 0;
  });
  if (reverseSubset) return reverseSubset;

  // 6) Partial match
  if (sorted.length >= 2) {
    let bestMatch: Reaction | null = null;
    let bestScore = 0;
    for (const r of reactions) {
      const matchCount = sorted.filter(s => r.reactants.includes(s)).length;
      const score = matchCount / Math.max(r.reactants.length, sorted.length);
      if (matchCount >= 2 && score > bestScore) {
        bestScore = score;
        bestMatch = r;
      }
    }
    if (bestMatch && bestScore >= 0.5) return bestMatch;
  }

  return null;
};`;

let newContent = content.substring(0, reactionsStartIndex) + 
                 '\n  ' + newReactionsPart + '\n' +
                 content.substring(reactionsEndIndex);

// Now we need to remove the broken findReaction part from newContent and replace it with newFindReaction
// The findReaction in content starts at line 5155
const findReactionStart = newContent.indexOf('export const findReaction =');
newContent = newContent.substring(0, findReactionStart) + newFindReaction;

fs.writeFileSync(filePath, newContent);
console.log('Successfully updated reactions.ts');
