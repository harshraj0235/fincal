import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export const InflationCalculator: React.FC = () => {
  const [currentAmount, setCurrentAmount] = useState<number>(1000);
  const [inflationRate, setInflationRate] = useState<number>(5);
  const [years, setYears] = useState<number>(10);

  const calculateFutureValue = () => {
    return currentAmount * Math.pow(1 + inflationRate / 100, years);
  };

  return (
    <div className="p-6">
      <div className="grid gap-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-neutral-700">Current Amount (₹)</span>
            <input
              type="number"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              min="0"
            />
          </label>

          <label className="block">
            <span className="text-neutral-700">Annual Inflation Rate (%)</span>
            <input
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              min="0"
              max="100"
              step="0.1"
            />
          </label>

          <label className="block">
            <span className="text-neutral-700">Time Period (Years)</span>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              min="1"
            />
          </label>
        </div>

        <div className="bg-neutral-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Results</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Future Value</span>
              <span className="text-lg font-medium text-neutral-900">
                ₹{calculateFutureValue().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Value Lost to Inflation</span>
              <span className="text-lg font-medium text-neutral-900">
                ₹{(calculateFutureValue() - currentAmount).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start">
            <Calculator className="h-5 w-5 text-blue-600 mt-0.5" />
            <p className="ml-3 text-sm text-blue-700">
              This calculator helps you understand how inflation affects the purchasing power of your money over time.
              The results show how much money you would need in the future to maintain the same purchasing power as your current amount.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};