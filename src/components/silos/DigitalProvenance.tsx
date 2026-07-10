import React from 'react';
import { Fingerprint, ShieldCheck, Clock, Award } from 'lucide-react';

interface ProvenanceProps {
  author?: string;
  role?: string;
  lastVerified?: string;
}

const DigitalProvenance: React.FC<ProvenanceProps> = ({ 
  author = "MoneyCal Financial Desk", 
  role = "Senior Policy Analyst",
  lastVerified = "March 2026"
}) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 my-10 relative overflow-hidden group">
      <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
        <Fingerprint size={160} />
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex-shrink-0">
           <Award className="h-8 w-8 text-indigo-600" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-slate-900 font-black text-sm uppercase tracking-wider">Verified Human Receipt</h4>
            <div className="bg-emerald-500 h-2 w-2 rounded-full animate-pulse"></div>
          </div>
          
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            In an era of AI-generated misinformation, this data has been cross-referenced with official gazettes and primary government sources by our human editorial team.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span className="text-[10px] font-bold text-slate-500 uppercase">{author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-indigo-600" />
              <span className="text-[10px] font-bold text-slate-500 uppercase">Verified {lastVerified}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Fingerprint className="h-4 w-4 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400 tracking-tighter">HASH: 2026-MC-FIN-PROV</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalProvenance;
