import React from 'react';
import { Sparkles } from 'lucide-react';

const AstroFinanceButton: React.FC = () => (
  <div className="bg-indigo-600 text-white py-3 px-4 text-center">
    <div className="max-w-7xl mx-auto">
      <a
        href="https://moneycal.in/astro-finance"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 hover:text-indigo-200 transition-colors cursor-pointer"
      >
        <Sparkles className="h-5 w-5" />
        <span className="font-medium">
          Explore Astro Finance Insights: Click here
        </span>
      </a>
    </div>
  </div>
);

export default AstroFinanceButton; 