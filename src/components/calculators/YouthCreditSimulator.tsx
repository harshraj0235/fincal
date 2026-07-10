import React, { useState, useMemo } from 'react';
import { UserCheck, Sparkles, CreditCard, HelpCircle, ArrowRight } from 'lucide-react';

const YouthCreditSimulator: React.FC = () => {
  const [utilization, setUtilization] = useState(20);
  const [onTimePayments, setOnTimePayments] = useState(true);
  const [ageOfCredit, setAgeOfCredit] = useState(1);
  const [totalInquiries, setTotalInquiries] = useState(0);

  const score = useMemo(() => {
    let base = 600;
    // Utilization (Lower is better)
    if (utilization < 10) base += 100;
    else if (utilization < 30) base += 60;
    else if (utilization > 70) base -= 50;

    // Payments
    if (onTimePayments) base += 150;
    else base -= 100;

    // Age
    base += ageOfCredit * 10;

    // Inquiries
    base -= totalInquiries * 15;

    return Math.min(Math.max(base, 300), 900);
  }, [utilization, onTimePayments, ageOfCredit, totalInquiries]);

  const scoreColor = score > 750 ? 'text-emerald-600' : score > 650 ? 'text-blue-600' : 'text-amber-600';

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-indigo-50 overflow-hidden my-10">
      <div className="bg-indigo-900 p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserCheck className="h-6 w-6 text-indigo-300" />
          <h2 className="font-bold text-lg">Youth Credit Path Simulator 2026</h2>
        </div>
        <Sparkles className="h-5 w-5 text-amber-400" />
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row gap-10 items-center mb-10">
            <div className="text-center">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Projected Score</div>
                <div className={`text-6xl font-black ${scoreColor}`}>{score}</div>
                <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold px-3 py-1 bg-slate-100 rounded-full text-slate-600">
                    <HelpCircle className="h-3 w-3" /> CRIF/Experian Estimate
                </div>
            </div>
            <div className="flex-1 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50">
                <p className="text-slate-700 text-sm leading-relaxed italic">
                    "For Indian Gen-Z, the 2026 credit landscape prioritizes 'Credit Mix' and 'Digital Spending Patterns'. Use this tool to simulate how your SBI Student Credit Card usage affects your future loan eligibility."
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-bold text-slate-700">Credit Utilization (%)</label>
                        <span className="text-indigo-600 font-bold">{utilization}%</span>
                    </div>
                    <input 
                        type="range" min="0" max="100" value={utilization} 
                        onChange={(e) => setUtilization(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                        <div className="font-bold text-slate-800 text-sm">All Payments On Time?</div>
                        <div className="text-xs text-slate-500">Includes CC bills & Postpaid</div>
                    </div>
                    <button 
                        onClick={() => setOnTimePayments(!onTimePayments)}
                        className={`px-4 py-1.5 rounded-lg font-bold text-sm transition-all ${onTimePayments ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}
                    >
                        {onTimePayments ? 'YES' : 'NO'}
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Age of Credit History (Years)</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 5].map(y => (
                            <button 
                                key={y} onClick={() => setAgeOfCredit(y)}
                                className={`flex-1 py-2 rounded-lg font-bold border ${ageOfCredit === y ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                {y}y+
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Recent Loan/CC Inquiries</label>
                    <div className="flex gap-2">
                        {[0, 1, 2, 5].map(i => (
                            <button 
                                key={i} onClick={() => setTotalInquiries(i)}
                                className={`flex-1 py-2 rounded-lg font-bold border ${totalInquiries === i ? 'bg-slate-800 border-slate-800 text-white' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                {i === 5 ? '5+' : i}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <button className="w-full mt-10 bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
            Unlock My Financial Roadmap <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default YouthCreditSimulator;
