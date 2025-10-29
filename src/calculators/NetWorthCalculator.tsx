import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const NetWorthCalculator: React.FC = () => {
  const [assets, setAssets] = useState({
    cash: 0,
    investments: 0,
    realEstate: 0,
    vehicles: 0,
    otherAssets: 0
  });

  const [liabilities, setLiabilities] = useState({
    mortgages: 0,
    loans: 0,
    creditCards: 0,
    otherDebts: 0
  });

  const totalAssets = Object.values(assets).reduce((sum, value) => sum + value, 0);
  const totalLiabilities = Object.values(liabilities).reduce((sum, value) => sum + value, 0);
  const netWorth = totalAssets - totalLiabilities;

  const handleAssetChange = (field: keyof typeof assets) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssets(prev => ({
      ...prev,
      [field]: Number(e.target.value) || 0
    }));
  };

  const handleLiabilityChange = (field: keyof typeof liabilities) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setLiabilities(prev => ({
      ...prev,
      [field]: Number(e.target.value) || 0
    }));
  };

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900">Assets</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Cash and Bank Accounts</label>
              <input
                type="number"
                value={assets.cash}
                onChange={handleAssetChange('cash')}
                className="input-field w-full"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Investments</label>
              <input
                type="number"
                value={assets.investments}
                onChange={handleAssetChange('investments')}
                className="input-field w-full"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Real Estate</label>
              <input
                type="number"
                value={assets.realEstate}
                onChange={handleAssetChange('realEstate')}
                className="input-field w-full"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Vehicles</label>
              <input
                type="number"
                value={assets.vehicles}
                onChange={handleAssetChange('vehicles')}
                className="input-field w-full"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Other Assets</label>
              <input
                type="number"
                value={assets.otherAssets}
                onChange={handleAssetChange('otherAssets')}
                className="input-field w-full"
                placeholder="0"
              />
            </div>
          </div>
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-medium text-neutral-700">Total Assets:</span>
              <span className="text-lg font-semibold text-green-600">${totalAssets.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900">Liabilities</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Mortgages</label>
              <input
                type="number"
                value={liabilities.mortgages}
                onChange={handleLiabilityChange('mortgages')}
                className="input-field w-full"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Loans</label>
              <input
                type="number"
                value={liabilities.loans}
                onChange={handleLiabilityChange('loans')}
                className="input-field w-full"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Credit Cards</label>
              <input
                type="number"
                value={liabilities.creditCards}
                onChange={handleLiabilityChange('creditCards')}
                className="input-field w-full"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Other Debts</label>
              <input
                type="number"
                value={liabilities.otherDebts}
                onChange={handleLiabilityChange('otherDebts')}
                className="input-field w-full"
                placeholder="0"
              />
            </div>
          </div>
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-medium text-neutral-700">Total Liabilities:</span>
              <span className="text-lg font-semibold text-red-600">${totalLiabilities.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-neutral-50 rounded-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-neutral-900">Net Worth</h3>
          <span className={`text-2xl font-bold ${netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${netWorth.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};    </div>
  );
};
