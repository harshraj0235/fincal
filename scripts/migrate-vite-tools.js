const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../../src/pages'); // The old Vite project (d:\New folder (21)\src\pages)
const nextAppDir = path.join(__dirname, '../src/app'); // The new Next.js project (d:\New folder (21)\moneycal-next\src\app)

// Map Vite folders to Next.js hubs
const hubMappings = {
  'insurance': 'insurance-tools',
  'bank': 'bank-tools',
  'corporate': 'corporate-finance',
  'invoicing-tools': 'invoice-generator-business',
  'festival-tools': 'festival-tools',
  'gold': 'gold-tools',
  'gst': 'gst-tools',
  'loan-tools': 'loan-tools',
  'tax-tools': 'tax-tools'
};

// Next.js page.tsx template
const pageTemplate = (componentName, hub, slug) => `import React from 'react';
import { Metadata } from 'next';
import ${componentName} from './${componentName}';

export const metadata: Metadata = {
  title: '${componentName.replace(/([A-Z])/g, ' $1').trim()} | MoneyCal India',
  description: 'Use our free ${componentName.replace(/([A-Z])/g, ' $1').trim()} to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/${hub}/${slug}'
  }
};

export default function Page() {
  return <${componentName} />;
}
`;

function kebabCase(str) {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase().replace(/^-/, '');
}

function processComponentCode(content) {
  let newContent = content;

  // Add "use client" directive
  if (!newContent.includes('"use client"') && !newContent.includes("'use client'")) {
    newContent = '"use client";\n' + newContent;
  }

  // Handle react-router-dom imports
  newContent = newContent.replace(/import\s+{([^}]*)}\s+from\s+['"]react-router-dom['"];?/g, (match, importsStr) => {
    let nextImports = [];
    let navImports = [];

    const imports = importsStr.split(',').map(i => i.trim());
    for (const imp of imports) {
      if (imp === 'Link') {
        nextImports.push(`import Link from 'next/link';`);
      } else if (imp === 'useNavigate') {
        navImports.push('useRouter');
      } else if (imp === 'useParams') {
        navImports.push('useParams');
      } else if (imp === 'useLocation') {
        navImports.push('usePathname');
      } else if (imp.includes('Link as RouterLink')) {
        nextImports.push(`import Link from 'next/link';`);
        newContent = newContent.replace(/<RouterLink/g, '<Link').replace(/<\/RouterLink>/g, '</Link>');
      }
    }

    let finalStr = nextImports.join('\n');
    if (navImports.length > 0) {
      finalStr += `\nimport { ${navImports.join(', ')} } from 'next/navigation';`;
    }
    return finalStr;
  });

  // Replace component logic
  newContent = newContent.replace(/useNavigate\(\)/g, 'useRouter()');
  newContent = newContent.replace(/const\s+navigate\s*=\s*useRouter\(\)/g, 'const router = useRouter()');
  newContent = newContent.replace(/navigate\(/g, 'router.push(');
  
  // Replace Link props
  newContent = newContent.replace(/<Link([^>]*)to=/g, '<Link$1href=');

  // Fix lucide-react duplicate/missing imports
  // Just in case, no major changes needed unless there's an error.

  return newContent;
}

let generatedCount = 0;

for (const [viteFolder, nextHub] of Object.entries(hubMappings)) {
  const sourceHubDir = path.join(srcDir, viteFolder);
  if (!fs.existsSync(sourceHubDir)) {
    console.warn(`Source folder missing: ${sourceHubDir}`);
    continue;
  }

  const files = fs.readdirSync(sourceHubDir).filter(f => f.endsWith('.tsx') && !f.includes('Hub'));

  for (const file of files) {
    const componentName = file.replace('.tsx', '');
    const slug = kebabCase(componentName);
    
    const targetDir = path.join(nextAppDir, nextHub, slug);
    const targetComponentPath = path.join(targetDir, `${componentName}.tsx`);
    const targetPagePath = path.join(targetDir, 'page.tsx');

    // Create directory
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Process and Copy Component
    const originalContent = fs.readFileSync(path.join(sourceHubDir, file), 'utf8');
    const migratedContent = processComponentCode(originalContent);
    fs.writeFileSync(targetComponentPath, migratedContent, 'utf8');

    // Create SEO Page Wrapper
    fs.writeFileSync(targetPagePath, pageTemplate(componentName, nextHub, slug), 'utf8');

    console.log(`✅ Migrated ${viteFolder}/${file} -> ${nextHub}/${slug}`);
    generatedCount++;
  }
}

console.log(`\n🎉 Successfully migrated ${generatedCount} tools from Vite to Next.js!`);
