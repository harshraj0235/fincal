const fs = require('fs');
let content = fs.readFileSync('src/components/Header.tsx', 'utf-8');

// Update Logo text
content = content.replace(
  /<h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">\s*MoneyCal\.in\s*<\/h1>/m,
  '<h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">\n                Finance GPT\n              </h1>'
);

// Update Logo icon background
content = content.replace(
  /<div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">/m,
  '<div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center shadow-sm">'
);

fs.writeFileSync('src/components/Header.tsx', content);
console.log('Header.tsx updated with Finance GPT logo and colors!');
