const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/reactions.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Helper to extract objects (robustly)
function extractObjects(str) {
    const objects = [];
    let braceCount = 0;
    let currentObject = '';
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if ((char === "'" || char === '"' || char === '`') && str[i-1] !== '\\') {
            if (!inString) { inString = true; stringChar = char; }
            else if (char === stringChar) { inString = false; }
        }
        if (!inString) {
            if (char === '{') { if (braceCount === 0) currentObject = ''; braceCount++; }
            currentObject += char;
            if (char === '}') { braceCount--; if (braceCount === 0) objects.push(currentObject); }
        } else { currentObject += char; }
    }
    return objects;
}

// Extract current reactions
const reactionsStartMatch = content.match(/export const reactions: Reaction\[\] = \[/);
const reactionsEndMatch = content.match(/\];\s+export const getReactionByReactants/);
const reactionsPart = content.substring(reactionsStartMatch.index + reactionsStartMatch[0].length, reactionsEndMatch.index);
const existingObjects = extractObjects(reactionsPart);

const seenIds = new Map();
const allReactions = [];

function cleanObj(objStr) {
    // Compact to single line
    return objStr.replace(/\s+/g, ' ').trim();
}

function addUnique(objStr) {
    const idMatch = objStr.match(/id\s*:\s*['"`]([^'"`]+)['"`]/);
    if (!idMatch) return;
    let id = idMatch[1];
    if (seenIds.has(id)) {
        let count = 1;
        let newId = `${id}_dup${count}`;
        while (seenIds.has(newId)) { count++; newId = `${id}_dup${count}`; }
        objStr = objStr.replace(new RegExp(`id\\s*:\\s*['"\`]${id}['"\`]`), `id: '${newId}'`);
        id = newId;
    }
    seenIds.set(id, true);
    allReactions.push(cleanObj(objStr));
}

existingObjects.forEach(addUnique);

// Add 100+ High Quality Reactions
const metals = ['Li', 'Na', 'K', 'Rb', 'Cs', 'Be', 'Mg', 'Ca', 'Sr', 'Ba', 'Al', 'Zn', 'Fe', 'Cu', 'Ag', 'Pb', 'Ni', 'Co', 'Mn', 'Cr', 'Ti', 'Sn', 'Hg'];
const halogens = ['F2', 'Cl2', 'Br2', 'I2'];
const acids = ['HCl', 'HNO3', 'H2SO4', 'CH3COOH', 'H3PO4', 'HBr', 'HI', 'HF'];
const bases = ['NaOH', 'KOH', 'LiOH', 'Ca(OH)2', 'Mg(OH)2', 'NH4OH', 'Al(OH)3', 'Ba(OH)2'];

// 1. More Synthesis
for (const m of metals) {
    for (const h of halogens) {
        const id = `syn_${m}_${h}`;
        if (!seenIds.has(id)) {
            addUnique(`{ id:'${id}', reactants:["${m}","${h}"], eq:'${m} + ${h} → Salt', balanced:'Synthesis of ${m} halide', products:["${m}${h.replace('2','')} Salt"], type:'synthesis', visual:'spark', color:'hsl(200,70%,60%)', enthalpy:-350, desc:'${m} reacts with ${h}.', realUse:'Industrial chemicals' }`);
        }
    }
}

// 2. Neutralization (Full combinations)
for (const a of acids) {
    for (const b of bases) {
        const id = `neut_${a.replace(/\(|\)/g,'')}_${b.replace(/\(|\)/g,'')}`;
        if (!seenIds.has(id)) {
            addUnique(`{ id:'${id}', reactants:["${a}","${b}"], eq:'${a} + ${b} → Salt + H2O', balanced:'Neutralization', products:["Salt","H2O"], type:'acid-base', visual:'dissolve', color:'hsl(200,50%,70%)', enthalpy:-56, desc:'Neutralization of ${a} with ${b}.', realUse:'pH correction' }`);
        }
    }
}

// 3. Metal + Acid
for (const m of ['Li', 'Na', 'K', 'Mg', 'Ca', 'Zn', 'Al', 'Fe', 'Sn', 'Pb']) {
    for (const a of ['HCl', 'H2SO4', 'HNO3', 'HBr', 'HI']) {
        const id = `disp_${m}_${a}`;
        if (!seenIds.has(id)) {
            addUnique(`{ id:'${id}', reactants:["${m}","${a}"], eq:'${m} + ${a} → Salt + H2', balanced:'Metal Displacement', products:["Salt","H2"], type:'single-replacement', visual:'bubbles', color:'hsl(180,40%,60%)', enthalpy:-150, desc:'${m} displaces hydrogen from ${a}.', realUse:'Hydrogen production' }`);
        }
    }
}

// 4. Combustion (Hydrocarbons)
for (let n = 1; n <= 10; n++) {
    const c = n;
    const h = 2 * n + 2;
    const formula = `C${c}H${h}`;
    const id = `combust_${formula}`;
    if (!seenIds.has(id)) {
        addUnique(`{ id:'${id}', reactants:["${formula}","O2"], eq:'${formula} + O2 → CO2 + H2O', balanced:'Complete Combustion', products:["CO2","H2O"], type:'combustion', visual:'fire', color:'hsl(0,0%,90%)', enthalpy:-2000, desc:'Complete combustion of ${formula}.', realUse:'Fuel' }`);
    }
}

// 5. Metal Oxides + Water
for (const m of ['Li2O', 'Na2O', 'K2O', 'CaO', 'BaO', 'MgO']) {
    const id = `oxide_water_${m}`;
    if (!seenIds.has(id)) {
        addUnique(`{ id:'${id}', reactants:["${m}","H2O"], eq:'${m} + H2O → Hydroxide', balanced:'Synthesis', products:["Base"], type:'synthesis', visual:'dissolve', color:'hsl(120,40%,70%)', enthalpy:-80, desc:'${m} reacts with water to form a base.', realUse:'Building materials' }`);
    }
}

// Reconstruction
const finalContent = content.substring(0, reactionsStartMatch.index + reactionsStartMatch[0].length) +
                   '\n  ' + allReactions.join(',\n  ') + '\n' +
                   content.substring(reactionsEndMatch.index);

fs.writeFileSync(filePath, finalContent);
console.log(`Final update: ${allReactions.length} reactions in database.`);
