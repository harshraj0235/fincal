import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export const EmergencyFundCalculator: React.FC = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(0);
  const [monthsOfCoverage, setMonthsOfCoverage] = useState<number>(6);
  
  const calculateEmergencyFund = () => {
    return monthlyExpenses * monthsOfCoverage;
  };

  return (
    <div className="p-6">
      <div className="grid gap-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-neutral-700 font-medium">Monthly Expenses</span>
            <div className="mt-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">₹</span>
              <input
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                className="block w-full pl-8 pr-3 py-2 border border-neutral-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="Enter your monthly expenses"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-neutral-700 font-medium">Months of Coverage</span>
            <div className="mt-1">
              <input
                type="range"
                min="3"
                max="12"
                step="1"
                value={monthsOfCoverage}
                onChange={(e) => setMonthsOfCoverage(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-neutral-600">
                <span>3 months</span>
                <span>{monthsOfCoverage} months</span>
                <span>12 months</span>
              </div>
            </div>
          </label>
        </div>

        <div className="bg-neutral-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Recommended Emergency Fund</h3>
            <Calculator className="h-5 w-5 text-neutral-500" />
          </div>
          <div className="text-3xl font-bold text-primary">
            ₹{calculateEmergencyFund().toLocaleString('en-IN')}
          </div>
          <p className="mt-2 text-sm text-neutral-600">
            This amount should cover your expenses for {monthsOfCoverage} months in case of emergencies.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Why have an emergency fund?</h4>
          <ul className="list-disc list-inside space-y-2 text-blue-800">
            <li>Provides financial security during unexpected events</li>
            <li>Helps avoid taking on debt for emergencies</li>
            <li>Reduces financial stress and anxiety</li>
            <li>Gives you time to find new employment if needed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};