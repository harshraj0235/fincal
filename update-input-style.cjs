const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

// Replace the bottom input bar styling
const oldInputBarRegex = /\{\/\* ── Bottom Input Bar ── \*\/\}\n\s*<div className="bg-gradient-to-t from-white via-white to-white\/80 px-4 py-3 sm:py-4">/m;

const newInputBar = `{/* ── Bottom Input Bar ── */}
          <div className="bg-white border-t border-gray-100 px-4 py-3 sm:py-5 shadow-[0_-10px_40px_rgba(0,0,0,0.02)] relative z-10">`;

content = content.replace(oldInputBarRegex, newInputBar);

// Also make the input field look more like ChatGPT (gray background, rounder)
const oldInputAreaRegex = /<div className="relative flex items-end bg-white rounded-2xl border border-gray-200 shadow-lg shadow-gray-200\/50 focus-within:border-blue-300 focus-within:shadow-blue-100\/50 transition-all">/m;

const newInputArea = `<div className="relative flex items-end bg-gray-50 rounded-2xl border border-gray-200 focus-within:bg-white focus-within:border-gray-300 focus-within:shadow-sm transition-all overflow-hidden">`;

content = content.replace(oldInputAreaRegex, newInputArea);

fs.writeFileSync('src/pages/Home.tsx', content);
console.log('Home.tsx input bar styling updated to look like ChatGPT.');
