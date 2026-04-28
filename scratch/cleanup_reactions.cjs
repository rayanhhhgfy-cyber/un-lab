
const fs = require('fs');

const content = fs.readFileSync('c:/Users/Lenovo/Downloads/un-lab-main/un-lab-main/src/data/reactions.ts', 'utf-8');

// Extract the reactions array content
const match = content.match(/export const reactions: Reaction\[\] = \[([\s\S]*?)\];/);
const reactionsRaw = match[1];

// Split by lines and parse IDs to find duplicates
const lines = reactionsRaw.split('\n');
const uniqueReactions = [];
const seenIds = new Set();

for (let line of lines) {
  const idMatch = line.match(/id:'([^']+)'/);
  if (idMatch) {
    const id = idMatch[1];
    
    // Fix specific bad reactions
    if (id === 'kmno4-feso4') {
        line = "  { id:'kmno4-feso4', reactants:['KMnO4','FeSO4','H2SO4'], eq:'KMnO₄ + FeSO₄ + H₂SO₄ → MnSO₄ + Fe₂(SO₄)₃ + K₂SO₄ + H₂O', balanced:'2KMnO₄ + 10FeSO₄ + 8H₂SO₄ → 2MnSO₄ + 5Fe₂(SO₄)₃ + K₂SO₄ + 8H₂O', products:['MnSO4','Fe2(SO4)3','K2SO4','H2O'], type:'redox', visual:'color-change', color:'hsl(300,60%,40%)', enthalpy:-165.0, desc:'Potassium permanganate oxidizes iron(II) in acidic solution.', temp:'Room temp', realUse:'Analytical chemistry, water treatment', smiles:'[Mn+2].[O-]S(=O)(=O)[O-]' },";
    }
    if (id === 'h2o2-mno2') {
        line = "  { id:'h2o2-mno2', reactants:['H2O2','MnO2'], eq:'H₂O₂ —(MnO₂)→ H₂O + O₂', balanced:'2H₂O₂ → 2H₂O + O₂↑', products:['H2O','O2'], type:'decomposition', visual:'bubbles', color:'hsl(200,50%,70%)', enthalpy:-196.0, desc:'Hydrogen peroxide decomposes rapidly in the presence of MnO₂ catalyst.', catalyst:'MnO₂', temp:'Room temp', realUse:'Oxygen generation', smiles:'O=O' },";
    }

    if (!seenIds.has(id)) {
      uniqueReactions.push(line);
      seenIds.add(id);
    }
  } else {
    // Preserve comments and empty lines
    uniqueReactions.push(line);
  }
}

const cleanedReactions = uniqueReactions.join('\n');
const newContent = content.replace(/export const reactions: Reaction\[\] = \[([\s\S]*?)\];/, `export const reactions: Reaction[] = [${cleanedReactions}];`);

// Also remove getReactionByReactants
const finalContent = newContent.replace(/export const getReactionByReactants = [\s\S]*?};/, '');

fs.writeFileSync('c:/Users/Lenovo/Downloads/un-lab-main/un-lab-main/src/data/reactions.ts', finalContent, 'utf-8');
console.log('Cleanup complete!');
