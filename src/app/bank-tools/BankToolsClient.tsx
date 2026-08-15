"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Zap, Target, BarChart3, PieChart, TrendingUp, IndianRupee, FileText, ArrowRight } from 'lucide-react';
import WhatsAppBanner from '@/components/WhatsAppBanner';
import ToolArticle from '@/components/ToolArticle';

const tools = [
  { name: 'Bank Locker Finder', path: '/calculators/bank-locker-finder', description: 'Find and compare locker charges & availability across Indian banks.' },
  { name: 'Bank Charges Analyzer', path: '/calculators/bank-charges-analyzer', description: 'Compare hidden fees, penalties, and charges for all major banks.' },
  { name: 'Missed Call Banking Directory', path: '/missed-call-banking-directory', description: 'Get missed call numbers for balance enquiry & mini statements for all banks.' },
  { name: 'Cheque Bounce Charges Calculator', path: '/calculators/cheque-bounce-charges-calculator', description: 'Check cheque bounce penalties for all Indian banks.' },
  { name: 'Crypto Tax Calculator', path: '/calculators/crypto-tax-estimator', description: 'Estimate your crypto tax liability as per Indian regulations.' },
  { name: 'Astro-Investment Date Picker', path: '/astro-finance/muhurat', description: 'Find auspicious dates and times for investments based on your zodiac.' },
  { name: 'Senior Citizen Savings Planner', path: '/calculators/senior-citizen-savings-planner', description: 'Designs savings plans for SCSS or PMVVY with interest and tax benefit projections.' },
  // Add more tools as needed
];

// If there are multiple arrays, we merge them for search
const allTools = tools.filter((v: any, i: number, a: any) => a.findIndex((t: any) => t.name === v.name) === i);

const BankToolsClient: React.FC = () => {
  const [query, setQuery] = useState('');

  const filteredTools = useMemo(() => {
    if (!query) return allTools;
    const q = query.toLowerCase();
    return allTools.filter(t => t.name.toLowerCase().includes(q) || (t.desc || t.description || '').toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <WhatsAppBanner />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Bank & Savings Tools</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Find IFSC codes, calculate FD returns, compare locker charges, and more.</p>
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
            {filteredTools.map((t, index) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.03 }}>
                <Link href={t.path || '/tools'} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-300 transform hover:-translate-y-1 transition-all block h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{t.name}</h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{t.desc || t.description}</p>
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

export default BankToolsClient;
