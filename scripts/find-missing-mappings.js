const fs = require('fs');
const dataContent = fs.readFileSync('src/data/calculatorData.ts', 'utf8');
const dispatcherContent = fs.readFileSync('src/app/calculators/[id]/ClientCalculatorDispatcher.tsx', 'utf8');

const regex = /id:\s*'([^']+)'/g;
let match;
const dataIds = new Set();
while ((match = regex.exec(dataContent)) !== null) {
  dataIds.add(match[1]);
}

const missing = [];
for (const id of dataIds) {
  if (!dispatcherContent.includes(`case '${id}':`)) {
    missing.push(id);
  }
}

console.log('Missing IDs:', missing);
