import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export const SimpleInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [interest, setInterest] = useState<number>(0);

  const calculateInterest = () => {
    const simpleInterest = (principal * rate * time) / 100;
    setInterest(simpleInterest);
  };

  return (
    <div className="p-6">
      <div className="grid gap-6">
        <div className="space-y-2">
          <label htmlFor="principal" className="block text-sm font-medium text-gray-700">
            Principal Amount
          </label>
          <input
            type="number"
            id="principal"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            min="0"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="rate" className="block text-sm font-medium text-gray-700">
            Interest Rate (% per annum)
          </label>
          <input
            type="number"
            id="rate"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            min="0"
            step="0.1"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time (in years)
          </label>
          <input
            type="number"
            id="time"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            min="0"
            step="0.1"
          />
        </div>

        <button
          onClick={calculateInterest}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Calculate Interest
        </button>

        {interest > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900">Results</h3>
            <div className="mt-2 grid gap-4">
              <div>
                <p className="text-sm text-gray-500">Simple Interest</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ₹{interest.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ₹{(principal + interest).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};