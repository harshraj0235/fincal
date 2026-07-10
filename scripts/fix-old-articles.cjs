const fs = require('fs');
const path = require('path');

const filesToFix = [
  'gujarat-tat-s-mains-preparation-strategy.ts',
  'it-layoff-financial-legal-checklist.ts',
  'monsoon-home-appliance-protection-tips.ts',
  'rrb-group-d-general-science-preparation-strategy.ts',
  'understanding-grey-market-premium-gmp.ts'
];

for (const file of filesToFix) {
  const filePath = path.join('src/data/discover', file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Change import
  content = content.replace("import { DiscoverArticle } from '../../types/discover';", "import { DiscoverArticle } from './types';");

  // Rename image to coverImage and update path
  const imageMatch = content.match(/image:\s*'(.+?)'/);
  if (imageMatch) {
    const oldImagePath = imageMatch[1]; // e.g. /electricity_saving_...png
    const basename = path.basename(oldImagePath);
    
    // Move image if it exists in public root
    if (fs.existsSync(path.join('public', basename))) {
       if (!fs.existsSync('public/images/discover')) {
          fs.mkdirSync('public/images/discover', { recursive: true });
       }
       fs.renameSync(path.join('public', basename), path.join('public/images/discover', basename));
    }

    content = content.replace(/image:\s*'.+?',/, `coverImage: '/images/discover/${basename}',`);
  } else {
    // If no coverImage exists but we might need it, let's make sure it's valid
    // For these files, they might already have coverImage.
  }

  // Rename excerpt to snippet
  content = content.replace(/excerpt:/, 'snippet:');

  // Remove readTime, category, tags
  content = content.replace(/readTime:.*?\n/g, '');
  content = content.replace(/category:.*?\n/g, '');
  content = content.replace(/tags:.*?\n/g, '');

  // Wrap content inside sections array
  // Find where content: ` starts
  const contentStartIdx = content.indexOf('content: `');
  if (contentStartIdx !== -1) {
    const beforeContent = content.substring(0, contentStartIdx);
    const afterContentStr = content.substring(contentStartIdx + 10);
    // Find the last backtick that is followed by a comma or newline or spaces and a comma
    const lastBacktickIdx = afterContentStr.lastIndexOf('`');
    if (lastBacktickIdx !== -1) {
       const contentStr = afterContentStr.substring(0, lastBacktickIdx);
       const afterContent = afterContentStr.substring(lastBacktickIdx + 1);

       let newSectionsStr = 'sections: [\n    {\n      type: \'ul\',\n      content: `' + contentStr + '`\n    }\n  ]';
       
       content = beforeContent + newSectionsStr + afterContent;
    }
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Fixed:', file);
}
