const fs = require('fs');
const path = require('path');

const dataContent = fs.readFileSync('src/data/calculatorData.ts', 'utf8');
const dispatcherPath = 'src/app/calculators/[id]/ClientCalculatorDispatcher.tsx';
const dispatcherContent = fs.readFileSync(dispatcherPath, 'utf8');

// 1. Get all true calculator IDs from calculatorData.ts
// We evaluate it to get the exact data
const { calculatorCategories } = require('../src/data/calculatorData.js') || {};
// Wait, we can't require TS directly. Let's parse it manually.

let match;
const dataIds = new Set();
// We only want the ones that are actual calculators. Let's extract them properly.
// Better to search for `{ id: '...', name: '...' }`
const calcRegex = /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)'/g;
while ((match = calcRegex.exec(dataContent)) !== null) {
  // Check if it's not a category by looking at context or just ignoring known categories
  if (!match[1].endsWith('-calculators') && !match[1].endsWith('-management') && match[1] !== 'personal-finance' && match[1] !== 'fintech-payments') {
    dataIds.add(match[1]);
  }
}

const missing = [];
for (const id of dataIds) {
  if (!dispatcherContent.includes(`case '${id}':`)) {
    missing.push(id);
  }
}

console.log('Missing calculators:', missing);
