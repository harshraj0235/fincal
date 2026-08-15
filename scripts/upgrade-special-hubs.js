const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

// ---------------------------------------------------------
// GOLD TOOLS
// ---------------------------------------------------------
const goldClientPath = path.join(appDir, 'gold-tools', 'GoldToolsClient.tsx');
if (fs.existsSync(goldClientPath)) {
  const goldContent = `"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Zap, ArrowRight } from 'lucide-react';
import WhatsAppBanner from '@/components/WhatsAppBanner';

import { goldTools } from '@/data/goldTools';

const allTools = goldTools.filter((v: any, i: number, a: any) => a.findIndex((t: any) => t.name === v.name) === i);

const GoldToolsHubClient: React.FC = () => {
  const [query, setQuery] = useState('');

  const filteredTools = useMemo(() => {
    if (!query) return allTools;
    const q = query.toLowerCase();
    return allTools.filter((t: any) => t.name.toLowerCase().includes(q) || (t.description || t.desc || '').toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <WhatsAppBanner />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Gold & Silver Tools</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Track live gold rates, purity, and plan your precious metal investments.</p>
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
                      <Zap className="h-6 w-6 text-gray-600 group-hover:text-amber-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors">{t.name}</h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{t.description || t.desc}</p>
                  <div className="mt-4 flex items-center text-sm font-semibold text-amber-600 group-hover:text-amber-800">
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

export default GoldToolsHubClient;
`;
  fs.writeFileSync(goldClientPath, goldContent, 'utf8');
  console.log("✅ Upgraded gold-tools");
  
  const goldPagePath = path.join(appDir, 'gold-tools', 'page.tsx');
  if (fs.existsSync(goldPagePath)) {
      const pageContent = `import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GoldToolsClient';

export const metadata: Metadata = {
  title: 'Gold & Silver Tools | MoneyCal',
  description: 'Track live gold rates, purity, and plan your precious metal investments.',
  alternates: {
    canonical: 'https://moneycal.in/gold-tools'
  }
};

export default function HubPage() {
  return <ClientComponent />;
}
`;
    fs.writeFileSync(goldPagePath, pageContent, 'utf8');
  }
}

// ---------------------------------------------------------
// FESTIVAL TOOLS
// ---------------------------------------------------------
const festivalClientPath = path.join(appDir, 'festival-tools', 'FestivalToolsClient.tsx');
if (fs.existsSync(festivalClientPath)) {
  const festContent = `"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Zap, ArrowRight } from 'lucide-react';
import WhatsAppBanner from '@/components/WhatsAppBanner';

import { festivalTools } from '@/data/festivalTools';

const allTools = festivalTools.filter((v: any, i: number, a: any) => a.findIndex((t: any) => t.name === v.name) === i);

const FestivalToolsHubClient: React.FC = () => {
  const [query, setQuery] = useState('');

  const filteredTools = useMemo(() => {
    if (!query) return allTools;
    const q = query.toLowerCase();
    return allTools.filter((t: any) => t.name.toLowerCase().includes(q) || (t.description || t.desc || '').toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <WhatsAppBanner />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-fuchsia-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Festival & Muhurat Tools</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Find auspicious dates, panchang details, and plan your festival budget easily.</p>
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
                      <Zap className="h-6 w-6 text-gray-600 group-hover:text-pink-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors">{t.name}</h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{t.description || t.desc}</p>
                  <div className="mt-4 flex items-center text-sm font-semibold text-pink-600 group-hover:text-pink-800">
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

export default FestivalToolsHubClient;
`;
  fs.writeFileSync(festivalClientPath, festContent, 'utf8');
  console.log("✅ Upgraded festival-tools");
  
  const festPagePath = path.join(appDir, 'festival-tools', 'page.tsx');
  if (fs.existsSync(festPagePath)) {
      const pageContent = `import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FestivalToolsClient';

export const metadata: Metadata = {
  title: 'Festival & Muhurat Tools | MoneyCal',
  description: 'Find auspicious dates, panchang details, and plan your festival budget easily.',
  alternates: {
    canonical: 'https://moneycal.in/festival-tools'
  }
};

export default function HubPage() {
  return <ClientComponent />;
}
`;
    fs.writeFileSync(festPagePath, pageContent, 'utf8');
  }
}
