const fs = require('fs');
let content = fs.readFileSync('src/data/discover/index.ts', 'utf-8');

// Insert import at the top
const importStr = "import { hangSengKospiCrashAsianContagion } from './hang-seng-kospi-crash-asian-contagion';\n";
content = importStr + content;

// Insert into array
const insertIndex = content.indexOf('const _discoverArticles: DiscoverArticle[] = [') + 'const _discoverArticles: DiscoverArticle[] = ['.length;
content = content.slice(0, insertIndex) + '\n    hangSengKospiCrashAsianContagion,' + content.slice(insertIndex);

fs.writeFileSync('src/data/discover/index.ts', content);
console.log('Added hangSengKospiCrashAsianContagion to index.ts');
