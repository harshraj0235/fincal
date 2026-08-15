const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/app/calculators/[id]/page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Next.js Imports
content = content.replace(/import React from 'react';/, "import React from 'react';\nimport dynamic from 'next/dynamic';\nimport { notFound } from 'next/navigation';\nimport { Metadata } from 'next';");
content = content.replace(/import \{ useNavigate, useParams \} from 'react-router-dom';/, '');
content = content.replace(/import \{ useNavigate \} from 'react-router-dom';/, '');
content = content.replace(/import SEOHelmet from '\.\.\/components\/SEOHelmet';/, '');

// 2. Replace React.lazy with dynamic
// From: const EmiCalculator = React.lazy(() => import('../calculators/EmiCalculator').then(m => ({ default: m.EmiCalculator })));
// To: const EmiCalculator = dynamic(() => import('@/calculators/EmiCalculator').then(m => m.EmiCalculator));
content = content.replace(/React\.lazy\(\(\) => import\('\.\.\/([^']+)'\)\.then\(m => \(\{\s*default:\s*m\.([^\}]+)\s*\}\)\)\)/g, "dynamic(() => import('@/$1').then(m => m.$2 as React.ComponentType<any>))");
content = content.replace(/React\.lazy\(\(\) => import\('\.\/([^']+)'\)\.then\(m => \(\{\s*default:\s*m\.([^\}]+)\s*\}\)\)\)/g, "dynamic(() => import('@/pages/$1').then(m => m.$2 as React.ComponentType<any>))");

// For simple default exports (if any):
content = content.replace(/React\.lazy\(\(\) => import\('\.\.\/([^']+)'\)\)/g, "dynamic(() => import('@/$1'))");
content = content.replace(/React\.lazy\(\(\) => import\('\.\/([^']+)'\)\)/g, "dynamic(() => import('@/pages/$1'))");

// 3. Adapt Next.js Page wrapper
content = content.replace(/export const CalculatorPage: React\.FC = \(\) => \{[\s\S]*?const \{ id \} = useParams<\{ id: string \}>\(\);/g, `export default function CalculatorPage({ params }: { params: { id: string } }) {
  const { id } = params;`);
  
// 4. Update the not found handling
content = content.replace(/if \(!calculator\) \{\s*return \([\s\S]*?<\/div>\s*\);\s*\}/g, 'if (!calculator) { notFound(); }');

// 5. Remove SEOHelmet from the return block
content = content.replace(/<SEOHelmet[\s\S]*?\/>/, '');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully adapted CalculatorPage for Next.js!');
