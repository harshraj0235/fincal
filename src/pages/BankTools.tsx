import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { Link } from 'react-router-dom';

const tools = [
  { name: 'Bank Locker Finder', path: '/calculators/bank-locker-finder', desc: 'Find and compare locker charges & availability across Indian banks.' },
  { name: 'Bank Charges Analyzer', path: '/calculators/bank-charges-analyzer', desc: 'Compare hidden fees, penalties, and charges for all major banks.' },
  { name: 'Missed Call Banking Directory', path: '/missed-call-banking-directory', desc: 'Get missed call numbers for balance enquiry & mini statements for all banks.' },
  { name: 'Cheque Bounce Charges Calculator', path: '/calculators/cheque-bounce-charges-calculator', desc: 'Check cheque bounce penalties for all Indian banks.' },
  // Add more tools as needed
];

const BankTools: React.FC = () => (
  <>
    <SEOHelmet
      title="Bank Tools - All Banking Calculators & Directories | Compare, Find, and Save"
      description="Explore all bank tools: locker finder, charges analyzer, missed call directory, cheque bounce calculator, and more. Free, easy, and SEO-optimized for banking tools, calculators, and directories."
      keywords="bank tools, banking calculators, bank locker finder, bank charges analyzer, missed call banking, cheque bounce charges, financial tools, Indian banks, compare bank charges, bank directories"
      url="/bank-tools"
      tags={["bank tools", "bank calculators", "banking tools", "locker finder", "charges analyzer", "missed call directory"]}
    />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6 text-center">All Bank Tools & Calculators</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">One place for all your banking needs: compare, find, and save with our free tools.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map(tool => (
            <Link key={tool.path} to={tool.path} className="block bg-white rounded-xl shadow-lg p-6 hover:bg-green-50 transition-all border border-green-100">
              <h2 className="text-xl font-bold text-green-700 mb-2">{tool.name}</h2>
              <p className="text-gray-600">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </>
);

export default BankTools; 