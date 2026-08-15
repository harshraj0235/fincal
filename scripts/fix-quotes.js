const fs = require('fs');
const path = require('path');

const srcApp = path.join(__dirname, '..', 'src', 'app');

function fixDescriptionQuotes(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      fixDescriptionQuotes(fullPath);
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // We know the buggy line looks exactly like:
      // description: 'Explore ... on MoneyCal, India's most comprehensive financial tools and calculators platform.',
      // Let's replace the single quotes surrounding the description string with double quotes,
      // and escape any internal double quotes just in case.
      
      if (content.includes("description: 'Explore") && content.includes("India's")) {
         // Because of the syntax error, the regex might be tricky, but we can just use string replacement
         // We can replace the exact problematic substring if we can isolate it.
         // Actually, let's just replace `description: 'Explore ` with `description: "Explore `
         // and ` platform.',` with ` platform.",`
         let lines = content.split('\n');
         let modified = false;
         for (let i=0; i<lines.length; i++) {
           if (lines[i].includes("description: 'Explore") && lines[i].includes("India's")) {
              lines[i] = lines[i].replace("description: 'Explore", 'description: "Explore');
              lines[i] = lines[i].replace("platform.',", 'platform.",');
              modified = true;
           }
         }
         
         if (modified) {
            fs.writeFileSync(fullPath, lines.join('\n'));
            console.log(`Fixed syntax error in ${fullPath}`);
         }
      }
    }
  }
}

console.log('Fixing unescaped quotes in descriptions...');
fixDescriptionQuotes(srcApp);
console.log('Fix complete!');
