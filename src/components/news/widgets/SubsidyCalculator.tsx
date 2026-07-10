import React, { useState } from 'react';
import { PieChart, CheckCircle2, Info, ArrowRight } from 'lucide-react';

const SubsidyCalculator: React.FC = () => {
  const [projectCost, setProjectCost] = useState(1000000);
  const [category, setCategory] = useState<'general' | 'special'>('general');
  const [location, setLocation] = useState<'urban' | 'rural'>('rural');

  const calculateSubsidy = () => {
    let percentage = 0;
    if (category === 'general') {
      percentage = location === 'urban' ? 15 : 25;
    } else {
      percentage = location === 'urban' ? 25 : 35;
    }
    
    const subsidy = (projectCost * percentage) / 100;
    const ownContribution = (projectCost * (category === 'general' ? 10 : 5)) / 100;
    const bankLoan = projectCost - subsidy - ownContribution;
    
    return { subsidy, ownContribution, bankLoan, percentage };
  };

  const { subsidy, ownContribution, bankLoan, percentage } = calculateSubsidy();

  return (
    <div className="my-10 p-8 bg-emerald-950 rounded-[2.5rem] border border-emerald-800 shadow-2xl text-white relative overflow-hidden group">
      {/* Glow Effect */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px] group-hover:bg-emerald-500/30 transition-colors"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/30">
            <PieChart className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight uppercase leading-none mb-1">PMEGP Subsidy Calculator</h3>
            <p className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-[0.2em]">Liquid Analysis Tool 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {/* Project Cost Input */}
            <div>
              <div className="flex justify-between mb-4">
                <span className="text-xs font-black text-emerald-500/80 uppercase tracking-widest">Estimated Project Cost</span>
                <span className="text-lg font-black text-white">₹{(projectCost / 100000).toFixed(1)} Lakhs</span>
              </div>
              <input 
                type="range" min="100000" max="5000000" step="100000" 
                value={projectCost} onChange={(e) => setProjectCost(Number(e.target.value))}
                className="w-full h-2 bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <span className="text-[10px] font-black text-emerald-500/80 uppercase tracking-widest">Caste/Category</span>
                <div className="flex bg-emerald-900/50 p-1 rounded-xl border border-emerald-800">
                  <button 
                    onClick={() => setCategory('general')}
                    className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${category === 'general' ? 'bg-emerald-500 text-emerald-950' : 'text-emerald-500'}`}
                  >General</button>
                  <button 
                    onClick={() => setCategory('special')}
                    className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${category === 'special' ? 'bg-emerald-500 text-emerald-950' : 'text-emerald-500'}`}
                  >Special*</button>
                </div>
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-black text-emerald-500/80 uppercase tracking-widest">Location</span>
                <div className="flex bg-emerald-900/50 p-1 rounded-xl border border-emerald-800">
                  <button 
                    onClick={() => setLocation('urban')}
                    className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${location === 'urban' ? 'bg-emerald-500 text-emerald-950' : 'text-emerald-500'}`}
                  >Urban</button>
                  <button 
                    onClick={() => setLocation('rural')}
                    className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${location === 'rural' ? 'bg-emerald-500 text-emerald-950' : 'text-emerald-500'}`}
                  >Rural</button>
                </div>
              </div>
            </div>
            
            <p className="text-[9px] text-emerald-500/60 italic leading-relaxed">
              *Special category includes SC/ST/OBC, Minorities, Women, Ex-servicemen, Physically handicapped, NER, Hill and Border areas.
            </p>
          </div>

          <div className="bg-white/5 rounded-[2rem] p-8 border border-white/10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Govt. Subsidy ({percentage}%)</div>
                <div className="text-3xl font-black text-white">₹{subsidy.toLocaleString()}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-[9px] font-black text-emerald-500/60 uppercase tracking-widest mb-1">Your Contribution</div>
                  <div className="text-lg font-black text-emerald-200">₹{ownContribution.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[9px] font-black text-emerald-500/60 uppercase tracking-widest mb-1">Bank Loan</div>
                  <div className="text-lg font-black text-emerald-200">₹{bankLoan.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <button className="mt-8 w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black uppercase tracking-[0.15em] rounded-2xl flex items-center justify-center gap-2 transition-all group/btn shadow-xl shadow-emerald-500/10">
              Apply for 100% Approval
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-emerald-800/50 flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold text-emerald-500/80 uppercase">Verified PMEGP 2026 Limits</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold text-emerald-500/80 uppercase">No Collateral up to ₹50 Lakhs</span>
          </div>
          <div className="ml-auto flex items-center gap-2 text-[10px] font-medium text-emerald-500/40 italic">
            <Info className="w-3 h-3" />
            Interact to see your data-driven eligibility
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubsidyCalculator;
