const fs = require('fs');
let content = fs.readFileSync('src/data/discover/index.ts', 'utf-8');

// Insert import at the top
const importStr = "import { kusumgarIpoSubscriptionGmp } from './kusumgar-ipo-subscription-gmp';\n";
content = importStr + content;

// Insert into array
const insertIndex = content.indexOf('const _discoverArticles: DiscoverArticle[] = [') + 'const _discoverArticles: DiscoverArticle[] = ['.length;
content = content.slice(0, insertIndex) + '\n    kusumgarIpoSubscriptionGmp,' + content.slice(insertIndex);

fs.writeFileSync('src/data/discover/index.ts', content);
console.log('Added kusumgarIpoSubscriptionGmp to index.ts');
