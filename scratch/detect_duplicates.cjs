const fs = require('fs');

const content = fs.readFileSync('src/data/reactions.ts', 'utf8');
const reactionsMatch = content.match(/export const reactions: Reaction\[] = \[\s*([\s\S]*?)\s*];/);

if (!reactionsMatch) {
    console.log("Could not find reactions array");
    process.exit(1);
}

const reactionsStr = reactionsMatch[1];
// Simple parser for reaction objects
const reactionRegex = /\{\s*id:\s*'([^']*)',\s*reactants:\s*\[([^\]]*)]/g;
let match;
const ids = new Map();
const reactantSets = new Map();

while ((match = reactionRegex.exec(reactionsStr)) !== null) {
    const id = match[1];
    const reactants = match[2].split(',').map(s => s.trim().replace(/'/g, '')).sort().join('+');

    if (ids.has(id)) {
        ids.get(id).push(match.index);
    } else {
        ids.set(id, [match.index]);
    }

    if (reactantSets.has(reactants)) {
        reactantSets.get(reactants).push(id);
    } else {
        reactantSets.set(reactants, [id]);
    }
}

console.log("--- Duplicate IDs ---");
for (const [id, indices] of ids) {
    if (indices.length > 1) {
        console.log(`${id}: found ${indices.length} times`);
    }
}

console.log("\n--- Duplicate Reactant Sets ---");
for (const [reactants, ids] of reactantSets) {
    if (ids.length > 1) {
        console.log(`${reactants}: ${ids.join(', ')}`);
    }
}
