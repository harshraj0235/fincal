const fs = require('fs');
let content = fs.readFileSync('src/components/Header.tsx', 'utf-8');

// Remove 'hidden sm:block' from the logo text so it shows on mobile
const hiddenBlockRegex = /<div className="hidden sm:block">\s*<h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">\s*Finance GPT\s*<\/h1>\s*<\/div>/m;

const visibleBlock = `<div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Finance GPT
              </h1>
            </div>`;

content = content.replace(hiddenBlockRegex, visibleBlock);

fs.writeFileSync('src/components/Header.tsx', content);
console.log('Fixed Header logo visibility on mobile!');
