import React, { useState, useMemo } from 'react';
import { Calculator, Info, CheckCircle, AlertTriangle } from 'lucide-react';

const PMEGPMarginMoneyCalculator: React.FC = () => {
  const [projectCost, setProjectCost] = useState<number>(1000000);
  const [category, setCategory] = useState<'general' | 'special'>('general');
  const [location, setLocation] = useState<'urban' | 'rural'>('urban');

  const results = useMemo(() => {
    const ownContributionRate = category === 'general' ? 0.10 : 0.05;
    const subsidyRate = 
      category === 'general' 
        ? (location === 'urban' ? 0.15 : 0.25) 
        : (location === 'urban' ? 0.25 : 0.35);

    const ownContribution = projectCost * ownContributionRate;
    const subsidyValue = projectCost * subsidyRate;
    const loanAmount = projectCost - ownContribution;
    const bankWorkingCapital = projectCost * 0.60; // Approximate

    return {
      ownContribution,
      subsidyValue,
      loanAmount,
      bankWorkingCapital,
      subsidyPercentage: subsidyRate * 100,
      ownPercentage: ownContributionRate * 100
    };
  }, [projectCost, category, location]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden my-8">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="h-6 w-6" />
          <h2 className="text-xl font-bold">PMEGP Margin Money (Subsidy) Solver 2026</h2>
        </div>
        <p className="opacity-80 text-sm">Real-time eligibility & dynamic funding breakdown</p>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Project Cost (Total Investment)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
              <input
                type="number"
                value={projectCost}
                onChange={(e) => setProjectCost(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-bold text-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
              >
                <option value="general">General</option>
                <option value="special">Special (SC/ST/OBC/Woman)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
              >
                <option value="urban">Urban (City)</option>
                <option value="rural">Rural (Village)</option>
              </select>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex gap-3 text-sm text-amber-800">
            <Info className="h-5 w-5 flex-shrink-0" />
            <p><strong>Note:</strong> Maximum project cost allowed is ₹50 Lakhs for Manufacturing and ₹20 Lakhs for Service units under PMEGP 2026 guidelines.</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            Funding Breakdown
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-slate-200">
              <span className="text-slate-600">Your Contribution ({results.ownPercentage}%)</span>
              <span className="font-bold text-gray-900">₹{results.ownContribution.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-200">
              <span className="text-blue-600 font-medium">Govt. Subsidy ({results.subsidyPercentage}%)</span>
              <span className="font-bold text-blue-700">₹{results.subsidyValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-200">
              <span className="text-slate-600">Bank Loan Component</span>
              <span className="font-bold text-gray-900">₹{results.loanAmount.toLocaleString()}</span>
            </div>
            <div className="pt-4 mt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-800">Total Project Value</span>
                <span className="text-2xl font-black text-indigo-700">₹{projectCost.toLocaleString()}</span>
              </div>
              <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
                <div style={{ width: `${results.ownPercentage}%` }} className="bg-amber-400 h-full" title="Own Contribution"></div>
                <div style={{ width: `${results.subsidyPercentage}%` }} className="bg-blue-500 h-full" title="Subsidy"></div>
                <div style={{ width: `${100 - results.ownPercentage - results.subsidyPercentage}%` }} className="bg-indigo-600 h-full" title="Bank Loan"></div>
              </div>
            </div>
          </div>

          <button className="w-full mt-8 bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2">
             Email Detailed Report (Free)
          </button>
        </div>
      </div>
    </div>
  );
};

export default PMEGPMarginMoneyCalculator;
