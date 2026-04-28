
const fs = require('fs');

const content = fs.readFileSync('c:/Users/Lenovo/Downloads/un-lab-main/un-lab-main/src/data/reactions.ts', 'utf-8');

// Extract the reactions array content
const match = content.match(/export const reactions: Reaction\[\] = \[([\s\S]*?)\];/);
if (!match) {
  console.log('Could not find reactions array');
  process.exit(1);
}

const reactionsRaw = match[1];
const lines = reactionsRaw.split('\n');

const uniqueReactions = new Map();
const duplicates = [];

for (const line of lines) {
  const idMatch = line.match(/id:'([^']+)'/);
  if (idMatch) {
    const id = idMatch[1];
    if (uniqueReactions.has(id)) {
      duplicates.push(id);
    } else {
      uniqueReactions.set(id, line);
    }
  }
}

console.log('Duplicates found:', duplicates);
