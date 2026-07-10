import React, { useState, useMemo } from 'react';
import { TrendingUp, ShieldCheck, Calculator, ArrowRight } from 'lucide-react';

const SGBLTCGCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState<number>(5000);
  const [sellPrice, setSellPrice] = useState<number>(7500);
  const [units, setUnits] = useState<number>(10);
  const [isMaturity, setIsMaturity] = useState<boolean>(true);

  const results = useMemo(() => {
    const totalPurchase = purchasePrice * units;
    const totalSell = sellPrice * units;
    const grossGain = totalSell - totalPurchase;
    
    // 2026 Rule: Exempt at maturity (8 years), but taxable in secondary market
    const taxRate = isMaturity ? 0 : 0.125; // 12.5% LTCG without indexation (standard 2024-2026 rule)
    const taxAmount = grossGain > 0 ? grossGain * taxRate : 0;
    const netGain = grossGain - taxAmount;

    return {
      totalPurchase,
      totalSell,
      grossGain,
      taxAmount,
      netGain,
      isExempt: isMaturity
    };
  }, [purchasePrice, sellPrice, units, isMaturity]);

  return (
    <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-sm overflow-hidden my-10">
      <div className="bg-emerald-700 p-5 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6" />
          <h2 className="font-bold text-lg">SGB secondary Market Tax Solver (2026)</h2>
        </div>
        <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">
          AI-Proof Logic
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Purchase Price (per gram)</label>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Selling Price (per gram)</label>
              <input
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Total Units (Grams)</label>
              <input
                type="number"
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none font-bold"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isMaturity}
                  onChange={(e) => setIsMaturity(e.target.checked)}
                  className="h-5 w-5 rounded text-emerald-600 outline-none"
                />
                <div>
                  <div className="font-bold text-slate-800 text-sm">Holding until Maturity?</div>
                  <div className="text-xs text-slate-500">Government rules exempt SGB tax after 8 years.</div>
                </div>
              </label>
            </div>

            <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                <div className="text-sm text-emerald-800 font-bold mb-4">Projected Returns</div>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-emerald-700">Gross Capital Gain:</span>
                        <span className="font-bold">₹{results.grossGain.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-red-600">
                        <span>LTCG Tax (12.5%):</span>
                        <span className="font-bold">{results.isExempt ? "EXEMPT" : `₹${results.taxAmount.toLocaleString()}`}</span>
                    </div>
                    <div className="pt-3 border-t border-emerald-200 flex justify-between items-center">
                        <span className="font-bold text-emerald-900">Net Profit:</span>
                        <span className="text-xl font-black text-emerald-700">₹{results.netGain.toLocaleString()}</span>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
                <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <p className="text-xs text-blue-800 italic">
                    "This calculator uses the latest Finance Act 2024 amendments applicable for FY 2025-26, including the removal of indexation benefits for physical & digital gold."
                </p>
            </div>
            <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2">
                Expert Analysis <ArrowRight className="h-4 w-4" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default SGBLTCGCalculator;
