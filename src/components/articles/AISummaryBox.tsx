import React from 'react';
import { Zap, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface AISummaryBoxProps {
  summary: string;
  points?: string[];
}

const AISummaryBox: React.FC<AISummaryBoxProps> = ({ summary, points }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 mb-12 shadow-sm relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
          <Zap className="w-5 h-5 text-white fill-white/20" />
        </div>
        <div>
          <h3 className="text-slate-900 font-black text-lg">Quick Summary</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fact-checked by MoneyCal 2026 AI</p>
        </div>
      </div>

      <p className="text-slate-700 leading-relaxed font-medium mb-6 text-lg">
        {summary}
      </p>

      {points && points.length > 0 && (
        <ul className="space-y-3">
          {points.map((point, index) => (
            <li key={index} className="flex gap-3 text-sm text-slate-600 font-semibold leading-relaxed">
              <span className="text-blue-500 shrink-0 mt-1">
                <Info className="w-4 h-4" />
              </span>
              {point}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default AISummaryBox;
