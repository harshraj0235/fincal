import React from 'react';
import { Check, X, Info, ShieldCheck, Zap } from 'lucide-react';

export interface ComparisonData {
  provider: string;
  planName: string;
  premium: string;
  coverage: string;
  waitingPeriod: string;
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  logo?: string;
}

interface Props {
  data: ComparisonData[];
  title?: string;
}

const InsuranceComparisonTable: React.FC<Props> = ({ data, title }) => {
  return (
    <div className="w-full overflow-hidden bg-white rounded-[40px] border border-slate-100 shadow-2xl">
      {title && (
        <div className="p-8 border-b border-slate-50 bg-slate-50/50">
          <h3 className="text-2xl font-black text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500 mt-1">Comparison based on standard 30-year old profile.</p>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-100">
              <th className="p-6 text-sm font-bold text-slate-400 uppercase tracking-widest">Plan Details</th>
              {data.map((item, idx) => (
                <th key={idx} className="p-6 min-w-[280px]">
                  <div className="flex flex-col gap-2">
                    <span className="text-blue-600 text-xs font-black uppercase">{item.provider}</span>
                    <h4 className="text-lg font-black text-slate-900 leading-tight">{item.planName}</h4>
                    <div className="mt-2 text-2xl font-black text-emerald-600">{item.premium}<span className="text-xs text-slate-400 font-medium font-sans">/mo</span></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <tr>
              <td className="p-6 text-sm font-bold text-slate-600 bg-slate-50/30">Total Coverage (SA)</td>
              {data.map((item, idx) => (
                <td key={idx} className="p-6 font-bold text-slate-900">{item.coverage}</td>
              ))}
            </tr>
            <tr>
              <td className="p-6 text-sm font-bold text-slate-600 bg-slate-50/30">Waiting Period</td>
              {data.map((item, idx) => (
                <td key={idx} className="p-6 text-slate-600 font-medium">
                  {item.waitingPeriod}
                  <Info className="w-4 h-4 inline-block ml-1.5 text-slate-300" />
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 text-sm font-bold text-slate-600 bg-slate-50/30 align-top">Key Features</td>
              {data.map((item, idx) => (
                <td key={idx} className="p-6">
                  <ul className="space-y-3">
                    {item.keyFeatures.map((f, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-600 leading-tight">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr className="bg-slate-50/20">
              <td className="p-6 text-sm font-bold text-slate-600 bg-slate-50/30 align-top">Pros & Cons</td>
              {data.map((item, idx) => (
                <td key={idx} className="p-6 space-y-6">
                  <div>
                    <h5 className="text-[10px] font-black uppercase text-emerald-600 mb-2 tracking-widest">Why choose this</h5>
                    <ul className="space-y-2">
                      {item.pros.map((p, i) => (
                        <li key={i} className="text-xs font-bold text-slate-700 bg-emerald-50 px-2 py-1 rounded inline-block mr-2 mb-2">{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black uppercase text-rose-500 mb-2 tracking-widest">Check before buying</h5>
                    <ul className="space-y-2">
                        {item.cons.map((c, i) => (
                          <li key={i} className="text-xs font-bold text-slate-600 flex items-start gap-1.5">
                            <X className="w-3.5 h-3.5 text-rose-400 mt-0.5" /> {c}
                          </li>
                        ))}
                    </ul>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
                <td className="p-6 bg-slate-50/30"></td>
                {data.map((_, idx) => (
                  <td key={idx} className="p-6">
                    <button className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 group">
                      Get Callback <Zap className="w-4 h-4 group-hover:fill-current" />
                    </button>
                    <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">Free expert consultation.</p>
                  </td>
                ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="p-6 bg-blue-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-blue-600" />
          <p className="text-xs text-blue-900 font-bold leading-tight">
            Independent Review by MoneyCal Editorial Team. 
            <br/><span className="text-slate-500 font-medium">We don't sell data, we sell clarity.</span>
          </p>
        </div>
        <div className="text-[10px] text-slate-400 font-semibold italic">Prices are illustrative and actual quote depends on insurer underwriting.</div>
      </div>
    </div>
  );
};

export default InsuranceComparisonTable;
