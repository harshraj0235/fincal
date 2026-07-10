import React from 'react';
import { ArrowRight, Calculator, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllCalculators } from '../data/calculatorData';
import { governmentSchemes } from '../data/governmentSchemesData';
import { useTranslation } from 'react-i18next';

interface AutoInternalLinksProps {
  keywords?: string[];
  categories?: string[];
  title?: string;
}

export const AutoInternalLinks: React.FC<AutoInternalLinksProps> = ({ keywords = [], categories = [], title = '' }) => {
  const { t } = useTranslation();

  // Combine searchable terms
  const searchTerms = [...keywords, ...categories, title]
    .map(k => k.toLowerCase())
    .filter(Boolean);

  // Find matching calculators (up to 3)
  const allCalculators = getAllCalculators();
  const matchedCalculators = allCalculators.filter(calc => {
    const calcName = calc.name.toLowerCase();
    const calcDesc = (calc as any).description?.toLowerCase() || '';
    return searchTerms.some(term => calcName.includes(term) || calcDesc.includes(term));
  }).slice(0, 3);

  // Find matching schemes (up to 3)
  const matchedSchemes = governmentSchemes.filter(scheme => {
    const schemeName = scheme.title.toLowerCase();
    const schemeHindi = (scheme.titleHindi || '').toLowerCase();
    return searchTerms.some(term => schemeName.includes(term) || schemeHindi.includes(term));
  }).slice(0, 3);

  if (matchedCalculators.length === 0 && matchedSchemes.length === 0) {
    return null;
  }

  return (
    <div className="my-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden shadow-lg shadow-black/20">
      <div className="bg-slate-800/80 px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-2 h-6 bg-emerald-500 rounded-full inline-block"></span>
          {t('recommended_tools', 'Recommended for You')}
        </h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {matchedCalculators.map(calc => (
          <Link 
            key={calc.id} 
            to={`/calculators/${calc.id}`}
            className="group relative bg-slate-900/50 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10 flex items-center gap-4"
          >
            <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shrink-0">
              <Calculator size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors line-clamp-1">{calc.name}</h4>
            </div>
          </Link>
        ))}

        {matchedSchemes.map(scheme => (
          <Link 
            key={scheme.id} 
            to={`/government-schemes/${scheme.slug}`}
            className="group relative bg-slate-900/50 hover:bg-slate-800 border border-slate-700/50 hover:border-blue-500/50 p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 flex items-start gap-4"
          >
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shrink-0">
              <Landmark size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 group-hover:text-blue-400 transition-colors mb-1 line-clamp-1">{scheme.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{scheme.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
