import React, { useState } from 'react';

export const FinancialGoalCalculator: React.FC = () => {
  const [goalAmount, setGoalAmount] = useState<number>(0);
  const [timeframe, setTimeframe] = useState<number>(0);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(7);

  const calculateMonthlyInvestment = () => {
    const r = interestRate / 100 / 12; // Monthly interest rate
    const n = timeframe * 12; // Total number of months
    const futureValue = goalAmount;
    
    // PMT formula: FV = PMT * (((1 + r)^n - 1) / r)
    // Solving for PMT: PMT = FV * r / ((1 + r)^n - 1)
    const monthlyPayment = (futureValue * r) / (Math.pow(1 + r, n) - 1);
    
    setMonthlyInvestment(Math.round(monthlyPayment));
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Goal Amount (₹)
          </label>
          <input
            type="number"
            value={goalAmount}
            onChange={(e) => setGoalAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your goal amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Frame (Years)
          </label>
          <input
            type="number"
            value={timeframe}
            onChange={(e) => setTimeframe(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter time frame in years"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Annual Return (%)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter expected annual return"
          />
        </div>

        <button
          onClick={calculateMonthlyInvestment}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Calculate Required Monthly Investment
        </button>

        {monthlyInvestment > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Results</h3>
            <p className="text-gray-700">
              To reach your goal of ₹{goalAmount.toLocaleString()} in {timeframe} years, 
              you need to invest:
            </p>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              ₹{monthlyInvestment.toLocaleString()} per month
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Assuming an annual return of {interestRate}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};