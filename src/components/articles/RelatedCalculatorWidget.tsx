import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, Zap } from 'lucide-react';
import { getAllCalculators } from '../../data/calculatorData';

interface RelatedCalculatorWidgetProps {
  postKeywords: string[];
  postCategory: string;
}

const RelatedCalculatorWidget: React.FC<RelatedCalculatorWidgetProps> = ({ postKeywords, postCategory }) => {
  const suggestedCalculator = useMemo(() => {
    const allCalculators = getAllCalculators();
    
    // 1. Try to find an exact match based on keywords
    let bestMatch = null;
    let maxOverlap = 0;
    
    const normalizedPostKeywords = postKeywords.map(k => k.toLowerCase());
    
    for (const calc of allCalculators) {
      const calcKeywords = calc.keywords.map(k => k.toLowerCase());
      
      // Calculate intersection
      const overlap = calcKeywords.filter(k => 
        normalizedPostKeywords.some(pk => pk.includes(k) || k.includes(pk))
      ).length;
      
      if (overlap > maxOverlap) {
        maxOverlap = overlap;
        bestMatch = calc;
      }
    }
    
    // 2. If no keyword match, try category match
    if (!bestMatch) {
      const categoryMatches = allCalculators.filter(c => 
        c.category.toLowerCase().includes(postCategory.toLowerCase()) ||
        postCategory.toLowerCase().includes(c.category.toLowerCase())
      );
      if (categoryMatches.length > 0) {
        bestMatch = categoryMatches[0];
      }
    }
    
    // 3. Fallback to SIP Calculator (highest RPM)
    if (!bestMatch) {
      bestMatch = allCalculators.find(c => c.id === 'sip-calculator') || allCalculators[0];
    }
    
    return bestMatch;
  }, [postKeywords, postCategory]);

  if (!suggestedCalculator) return null;

  return (
    <div className="my-10 w-full bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden group">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 opacity-20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            <Zap className="w-3.5 h-3.5 fill-current" /> Free Tool
          </div>
          <h3 className="text-2xl sm:text-3xl font-black mb-3 leading-tight">
            Ready to calculate your {suggestedCalculator.name.replace('Calculator', '').trim()}?
          </h3>
          <p className="text-blue-100 font-medium max-w-xl">
            Stop guessing. Use our exact, bank-level <strong className="text-white">{suggestedCalculator.name}</strong> to plan your finances perfectly.
          </p>
        </div>
        
        <Link 
          to={`/calculators/${suggestedCalculator.id}`}
          className="flex-shrink-0 group flex items-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-2xl font-black text-lg hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300"
        >
          <Calculator className="w-6 h-6 text-blue-600 group-hover:rotate-12 transition-transform" />
          Calculate Now
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default RelatedCalculatorWidget;
