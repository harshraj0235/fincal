const fs = require('fs');
let content = fs.readFileSync('src/data/discover/index.ts', 'utf-8');

// Insert import at the top
const importStr = "import { stockMarketCrashTodayReasons } from './stock-market-crash-today-reasons';\n";
content = importStr + content;

// Insert into array
const insertIndex = content.indexOf('const _discoverArticles: DiscoverArticle[] = [') + 'const _discoverArticles: DiscoverArticle[] = ['.length;
content = content.slice(0, insertIndex) + '\n    stockMarketCrashTodayReasons,' + content.slice(insertIndex);

fs.writeFileSync('src/data/discover/index.ts', content);
console.log('Added stockMarketCrashTodayReasons to index.ts');
