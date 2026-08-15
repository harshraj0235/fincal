const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

function upgradeHubFile(hubName, title, description, colorTheme) {
  const dirPath = path.join(appDir, hubName);
  if (!fs.existsSync(dirPath)) return;
  
  const files = fs.readdirSync(dirPath);
  const clientFile = files.find(f => f.endsWith('Client.tsx') || f === 'page.tsx');
  
  if (!clientFile) return;
  
  const filePath = path.join(dirPath, clientFile);
  let originalContent = fs.readFileSync(filePath, 'utf8');

  // Extract the data array
  let dataMatch = originalContent.match(/const\s+(\w+)\s*=\s*\[[\s\S]*?\];/);
  if (!dataMatch) {
    console.log(`Could not find data array for ${hubName}`);
    return;
  }
  
  let arrayName = dataMatch[1];
  let toolsDataStr = dataMatch[0];
  
  // Create beautiful UI template
  const newContent = `"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Zap, Target, BarChart3, PieChart, TrendingUp, IndianRupee, FileText, ArrowRight } from 'lucide-react';
import WhatsAppBanner from '@/components/WhatsAppBanner';
import ToolArticle from '@/components/ToolArticle';

${toolsDataStr}

const allTools = ${arrayName}.filter((v,i,a)=>a.findIndex((t: any)=>(t.name === v.name))===i);

const ${clientFile.replace('.tsx', '').replace(/[^a-zA-Z0-9]/g, '')}Client: React.FC = () => {
  const [query, setQuery] = useState('');

  const filteredTools = useMemo(() => {
    if (!query) return allTools;
    const q = query.toLowerCase();
    return allTools.filter((t: any) => t.name.toLowerCase().includes(q) || (t.description || t.desc || '').toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <WhatsAppBanner />
      <div className="min-h-screen bg-gradient-to-br ${colorTheme}">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">${title}</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">${description}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-4 mb-8 shadow-sm max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search tools..." 
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((t: any, index: number) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.03 }}>
                <Link href={t.path || '/tools'} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-300 transform hover:-translate-y-1 transition-all block h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{t.name}</h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{t.description || t.desc}</p>
                  <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-800">
                    Open Tool <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </>
  );
};

export default ${clientFile.replace('.tsx', '').replace(/[^a-zA-Z0-9]/g, '')}Client;
`;

  const newClientFileName = `${hubName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}HubClient.tsx`;
  const newClientFilePath = path.join(dirPath, newClientFileName);
  fs.writeFileSync(newClientFilePath, newContent, 'utf8');
  console.log(`✅ Upgraded ${hubName} with new beautiful UI -> ${newClientFileName}`);
  
  // If it was page.tsx that held the array, we need to rewrite page.tsx to import the Client
  if (clientFile === 'page.tsx') {
    const pageContent = `import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './${newClientFileName.replace('.tsx', '')}';

export const metadata: Metadata = {
  title: '${title} | MoneyCal',
  description: '${description}',
  alternates: {
    canonical: 'https://moneycal.in/${hubName}'
  }
};

export default function HubPage() {
  return <ClientComponent />;
}
`;
    fs.writeFileSync(filePath, pageContent, 'utf8');
    console.log(`✅ Rewrote ${hubName}/page.tsx to point to new Client`);
  }
}

upgradeHubFile('finance-tools', 'Finance & Investment Tools', 'Explore SIP, ROI, and comprehensive portfolio analyzers to optimize your wealth.', 'from-blue-50 to-indigo-50/50');
upgradeHubFile('gst-tools', 'GST Calculators & Tools', 'Effortlessly calculate GST, look up HSN codes, and generate invoices with our premium tools.', 'from-purple-50 to-violet-50/50');
upgradeHubFile('gold-tools', 'Gold & Silver Tools', 'Track live gold rates, purity, and plan your precious metal investments.', 'from-yellow-50 to-amber-50/50');
upgradeHubFile('tax-tools', 'Tax Planning Tools', 'Minimize your tax liability with advanced calculators for old vs new regime, 80C, and capital gains.', 'from-red-50 to-rose-50/50');
upgradeHubFile('loan-tools', 'Loan & EMI Calculators', 'Plan your home, personal, and car loans effectively with amortization charts and prepayment strategies.', 'from-emerald-50 to-teal-50/50');
upgradeHubFile('festival-tools', 'Festival & Muhurat Tools', 'Find auspicious dates, panchang details, and plan your festival budget easily.', 'from-pink-50 to-fuchsia-50/50');
