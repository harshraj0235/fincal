import React from 'react';
import { Sparkles } from 'lucide-react';

const AstroFinanceButton: React.FC = () => (
  <div className="bg-white border-b border-gray-200 py-3 px-4 text-center shadow-sm">
    <div className="max-w-7xl mx-auto">
      <a
        href="https://moneycal.in/astro-finance"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
      >
        <Sparkles className="h-5 w-5 text-purple-600" />
        <span className="font-medium bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Explore Astro Finance Insights: Click here
        </span>
      </a>
    </div>
  </div>
);

export default AstroFinanceButton; 