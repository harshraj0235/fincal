const fs = require('fs');
const path = require('path');

const viteSrcDir = path.join(__dirname, '../../src');
const nextAppDir = path.join(__dirname, '../src/app');

function fixNextJsSyntax(content) {
  let newContent = content;

  // 1. "use client"
  if (!newContent.startsWith('"use client";')) {
    newContent = '"use client";\n' + newContent;
  }

  // 2. React Router to Next Navigation
  if (newContent.includes('react-router-dom')) {
    newContent = newContent.replace(/import\s+{([^}]*)}\s+from\s+['"]react-router-dom['"];?/g, (match, imports) => {
      let replacement = `import { useParams } from 'next/navigation';\n`;
      if (imports.includes('useNavigate')) {
        replacement += `import { useRouter } from 'next/navigation';\n`;
      }
      if (imports.includes('Link')) {
        replacement += `import Link from 'next/link';\n`;
      }
      return replacement;
    });
    
    newContent = newContent.replace(/const\s+navigate\s*=\s*useNavigate\(\);?/g, 'const router = useRouter();');
    newContent = newContent.replace(/\bnavigate\(/g, 'router.push(');
    
    newContent = newContent.replace(/<RouterLink\b/g, '<Link');
    newContent = newContent.replace(/<\/RouterLink>/g, '</Link>');
    newContent = newContent.replace(/<Link([^>]*)to=/g, '<Link$1href=');
  }

  // 3. Fix Relative Imports
  const topLevelDirs = ['components', 'data', 'utils', 'hooks', 'calculators', 'services'];
  newContent = newContent.replace(/from\s+['"](?:\.\.\/)+([a-zA-Z0-9_-]+)\/?(.*?)['"]/g, (match, dirName, restPath) => {
    if (topLevelDirs.includes(dirName)) {
      return `from '@/${dirName}${restPath ? '/' + restPath : ''}'`;
    }
    return match;
  });

  // 4. Lucide Link Collision
  if (/from\s+['"]lucide-react['"]/.test(newContent) && /{.*?\bLink\b.*?}/.test(newContent)) {
    newContent = newContent.replace(/(import\s+{.*?\b)Link(\b.*?}\s+from\s+['"]lucide-react['"])/g, '$1Link as LinkIcon$2');
    newContent = newContent.replace(/LinkIconIcon+/g, 'LinkIcon');
    newContent = newContent.replace(/<Link(?![^>]*href=)/g, '<LinkIcon');
  }

  return newContent;
}

// ==== GOLD TOOLS ====
const goldDir = path.join(nextAppDir, 'gold', '[slug]');
fs.mkdirSync(goldDir, { recursive: true });

// 1. Client Component
const goldSrc = path.join(viteSrcDir, 'pages', 'gold', 'GoldToolPage.tsx');
let goldContent = fs.readFileSync(goldSrc, 'utf8');
goldContent = fixNextJsSyntax(goldContent);
// Wait, the client uses `useParams().toolSlug` because Vite Route was `/gold/:toolSlug`.
// But Next.js dynamic folder is `[slug]`, so Next.js useParams returns `{ slug }`!
goldContent = goldContent.replace(/const\s*{\s*toolSlug\s*}\s*=\s*useParams\(\);/, 'const { slug } = useParams();\n  const toolSlug = slug;');

fs.writeFileSync(path.join(goldDir, 'GoldToolPageClient.tsx'), goldContent, 'utf8');

// 2. Server Page wrapper with generateStaticParams
const goldPageContent = `import React from 'react';
import { Metadata } from 'next';
import GoldToolPageClient from './GoldToolPageClient';
import { goldTools } from '@/data/goldTools';

export function generateStaticParams() {
  return goldTools.map((tool) => ({
    slug: tool.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = goldTools.find(t => t.slug === params.slug);
  if (!tool) return { title: 'Tool Not Found' };
  
  return {
    title: \`\${tool.seo?.title || tool.name} | Gold Tools | MoneyCal.in\`,
    description: tool.seo?.description || tool.description,
    alternates: {
      canonical: \`https://moneycal.in/gold/\${tool.slug}\`,
    }
  };
}

export default function Page() {
  return <GoldToolPageClient />;
}
`;
fs.writeFileSync(path.join(goldDir, 'page.tsx'), goldPageContent, 'utf8');


// ==== FESTIVAL TOOLS ====
const festDir = path.join(nextAppDir, 'festival', '[festivalSlug]', '[toolSlug]');
fs.mkdirSync(festDir, { recursive: true });

// 1. Client Component
const festSrc = path.join(viteSrcDir, 'pages', 'festival', 'FestivalToolPage.tsx');
let festContent = fs.readFileSync(festSrc, 'utf8');
festContent = fixNextJsSyntax(festContent);
fs.writeFileSync(path.join(festDir, 'FestivalToolPageClient.tsx'), festContent, 'utf8');

// 2. Server Page wrapper with generateStaticParams
const festPageContent = `import React from 'react';
import { Metadata } from 'next';
import FestivalToolPageClient from './FestivalToolPageClient';
import { festivalList } from '@/data/festivalTools';

export function generateStaticParams() {
  const params: { festivalSlug: string, toolSlug: string }[] = [];
  
  festivalList.forEach(fest => {
    fest.tools.forEach(tool => {
      params.push({
        festivalSlug: fest.slug,
        toolSlug: tool.slug
      });
    });
  });
  
  return params;
}

export function generateMetadata({ params }: { params: { festivalSlug: string, toolSlug: string } }): Metadata {
  const fest = festivalList.find(f => f.slug === params.festivalSlug);
  const tool = fest?.tools.find(t => t.slug === params.toolSlug);
  
  if (!tool) return { title: 'Tool Not Found' };
  
  return {
    title: \`\${tool.name} | \${fest?.name} Tools | MoneyCal.in\`,
    description: tool.description,
    alternates: {
      canonical: \`https://moneycal.in/festival/\${params.festivalSlug}/\${params.toolSlug}\`,
    }
  };
}

export default function Page() {
  return <FestivalToolPageClient />;
}
`;
fs.writeFileSync(path.join(festDir, 'page.tsx'), festPageContent, 'utf8');

console.log('✅ Generated SSG wrappers and Client components for Gold and Festival Tools.');
