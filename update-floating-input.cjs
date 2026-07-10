const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

const oldInputBarRegex = /\{\/\* ── Bottom Input Bar ── \*\/\}\n\s*<div className="bg-white border-t border-gray-100 px-4 py-3 sm:py-5 shadow-\[0_-10px_40px_rgba\(0,0,0,0\.02\)\] relative z-10">/m;

const newInputBar = `{/* ── Bottom Input Bar ── */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none z-20">`;

content = content.replace(oldInputBarRegex, newInputBar);

const oldInputAreaRegex = /<div className="relative flex items-end bg-gray-50 rounded-2xl border border-gray-200 focus-within:bg-white focus-within:border-gray-300 focus-within:shadow-sm transition-all overflow-hidden">/m;

const newInputArea = `<div className="relative flex items-end bg-[#f4f4f4] rounded-3xl border border-gray-200 shadow-[0_0_15px_rgba(0,0,0,0.05)] focus-within:bg-white focus-within:border-gray-300 focus-within:shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-all pointer-events-auto">`;

content = content.replace(oldInputAreaRegex, newInputArea);

const disclaimerRegex = /<p className="text-center text-\[10px\] sm:text-\[11px\] text-gray-400 mt-2\.5">/m;
const newDisclaimer = `<p className="text-center text-[10px] sm:text-[11px] text-gray-400 mt-3 pointer-events-auto drop-shadow-sm">`;

content = content.replace(disclaimerRegex, newDisclaimer);

fs.writeFileSync('src/pages/Home.tsx', content);
console.log('Floating input bar updated!');
