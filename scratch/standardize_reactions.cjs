
const fs = require('fs');

const content = fs.readFileSync('c:/Users/Lenovo/Downloads/un-lab-main/un-lab-main/src/data/reactions.ts', 'utf-8');

// List of diatomic symbols to map
const diatomicMap = {
  'H': 'H2', 'N': 'N2', 'O': 'O2', 'F': 'F2', 'Cl': 'Cl2', 'Br': 'Br2', 'I': 'I2'
};

const fixedContent = content.replace(/{ id:'([^']+)', reactants:\[([^\]]+)\], eq:'([^']+)'/g, (match, id, reactantsRaw, eq) => {
  let reactants = reactantsRaw.split(',').map(r => r.trim().replace(/'/g, ''));
  
  // Special case: if equation has H2O but reactants only has H, fix it
  if (eq.includes('H2O') && reactants.includes('H')) {
    reactants = reactants.map(r => r === 'H' ? 'H2O' : r);
  }
  if (eq.includes('HCl') && reactants.includes('H') && reactants.includes('Cl')) {
    // This is H2 + Cl2 -> HCl, reactants should be H2, Cl2
    reactants = reactants.map(r => diatomicMap[r] || r);
  } else if (eq.includes('HCl') && reactants.includes('H')) {
    // This is likely Zn + HCl, reactants should be Zn, HCl
    reactants = reactants.map(r => r === 'H' ? 'HCl' : r);
  }

  // Standard diatomic mapping for others
  reactants = reactants.map(r => diatomicMap[r] || r);

  const newReactants = reactants.map(r => `'${r}'`).join(',');
  return `{ id:'${id}', reactants:[${newReactants}], eq:'${eq}'`;
});

fs.writeFileSync('c:/Users/Lenovo/Downloads/un-lab-main/un-lab-main/src/data/reactions.ts', fixedContent, 'utf-8');
console.log('Final standardizing complete!');
