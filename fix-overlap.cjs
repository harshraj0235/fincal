const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

const oldInputBarRegex = /\{\/\* ── Bottom Input Bar ── \*\/\}\n\s*<div className="absolute bottom-0 left-0 right-0 px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none z-20">/m;

const newInputBar = `{/* ── Bottom Input Bar ── */}
          <div className="w-full px-4 pb-4 sm:px-6 sm:pb-6 bg-transparent flex-shrink-0 relative z-10">`;

if (oldInputBarRegex.test(content)) {
  content = content.replace(oldInputBarRegex, newInputBar);
  fs.writeFileSync('src/pages/Home.tsx', content);
  console.log('Fixed overlap issue by removing absolute positioning!');
} else {
  console.log('Regex failed to match');
}
