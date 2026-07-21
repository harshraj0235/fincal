const fs = require('fs');
const path = require('path');
const file = path.join('d:/New folder (16)/fincal/src/pages/CalculatorPage.tsx');
let content = fs.readFileSync(file, 'utf8');

// Replace synchronous imports with React.lazy
content = content.replace(/import\s+\{\s*([a-zA-Z0-9_]+)\s*\}\s+from\s+['"]([^'"]+)['"];/g, 
  "const $1 = React.lazy(() => import('$2').then(m => ({ default: m.$1 })));"
);

// Replace default imports
content = content.replace(/import\s+([a-zA-Z0-9_]+)\s+from\s+['"](\.\.\/calculators\/[^'"]+)['"];/g, 
  "const $1 = React.lazy(() => import('$2'));"
);

// Replace tools imports
content = content.replace(/import\s+([a-zA-Z0-9_]+)\s+from\s+['"]\.\/tools\/([^'"]+)['"];/g, 
  "const $1 = React.lazy(() => import('./tools/$2'));"
);

// Add Suspense wrapping around renderCalculator()
content = content.replace(
  /\{renderCalculator\(\)\}/g, 
  "<React.Suspense fallback={<div className=\"flex justify-center p-12\"><div className=\"animate-spin rounded-full h-8 w-8 border-b-2 border-[--primary-600]\"></div></div>}>\n        {renderCalculator()}\n      </React.Suspense>"
);

fs.writeFileSync(file, content);
console.log('Successfully applied React.lazy to CalculatorPage.tsx');
