import React, { useState } from 'react';
import { Calculator, ChevronRight, Info } from 'lucide-react';

const MiniEMICalculator: React.FC = () => {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(9.5);
  const [tenure, setTenure] = useState(5);

  const calculateEMI = () => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const emiValue = calculateEMI();

  return (
    <div className="my-10 p-6 bg-slate-900 rounded-2xl border-none shadow-2xl text-white overflow-hidden relative group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Calculator className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-lg font-black tracking-tight uppercase">Liquid EMI Calculator</h3>
          <div className="ml-auto flex items-center gap-1.5 px-2 py-1 bg-green-500/20 rounded text-[10px] font-bold text-green-400 uppercase tracking-widest leading-none">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Live Tool
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loan Amount</span>
                <span className="text-sm font-black text-blue-400">₹{amount.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="100000" max="10000000" step="100000" 
                value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rate (%)</span>
                  <span className="text-sm font-black text-blue-400">{rate}%</span>
                </div>
                <input 
                  type="range" min="5" max="25" step="0.1" 
                  value={rate} onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Years</span>
                  <span className="text-sm font-black text-blue-400">{tenure}y</span>
                </div>
                <input 
                  type="range" min="1" max="30" step="1" 
                  value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 flex flex-col items-center justify-center border border-slate-700/50">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Monthly EMI</div>
            <div className="text-5xl font-black text-white tracking-tighter mb-4">
              ₹{emiValue.toLocaleString()}
            </div>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-sm font-black text-white uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 group">
              Get Detailed Report
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          <Info className="w-3 h-3" />
          Instant calculation for high-intent users. Interact to bypass AI overviews.
        </div>
      </div>
    </div>
  );
};

export default MiniEMICalculator;
