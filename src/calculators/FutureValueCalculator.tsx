import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export const FutureValueCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [futureValue, setFutureValue] = useState<number | null>(null);

  const calculateFutureValue = () => {
    const fv = principal * Math.pow(1 + rate / 100, time);
    setFutureValue(fv);
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Principal Amount (₹)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="input-field w-full"
            placeholder="Enter principal amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="input-field w-full"
            placeholder="Enter interest rate"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Time Period (Years)
          </label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            className="input-field w-full"
            placeholder="Enter time period"
          />
        </div>

        <button
          onClick={calculateFutureValue}
          className="btn btn-primary w-full flex items-center justify-center"
        >
          <Calculator className="h-4 w-4 mr-2" />
          Calculate Future Value
        </button>

        {futureValue !== null && (
          <div className="mt-6 p-4 bg-[--primary-50] rounded-lg">
            <h3 className="text-lg font-semibold text-[--primary-900] mb-2">
              Future Value
            </h3>
            <p className="text-2xl font-bold text-[--primary-700]">
              ₹{futureValue.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};