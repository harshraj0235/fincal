import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EMIAffordabilityChecker: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [income, setIncome] = useState('');
  const [result, setResult] = useState<{ emi: number; totalInterest: number; verdict: string } | null>(null);

  const calculate = () => {
    const P = parseFloat(amount);
    const R = parseFloat(rate) / 12 / 100;
    const N = parseInt(tenure) || 0;
    const inc = parseFloat(income);
    if (isNaN(P) || isNaN(R) || isNaN(N) || isNaN(inc) || N === 0) return;
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalInterest = emi * N - P;
    const verdict = emi <= inc * 0.4 ? 'Affordable' : 'High EMI (over 40% of income)';
    setResult({ emi, totalInterest, verdict });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-900 mb-4">EMI/Loan Affordability Checker</h1>
        <div className="space-y-4 mb-6">
          <input type="number" className="input w-full" placeholder="Loan Amount" value={amount} onChange={e => setAmount(e.target.value)} />
          <input type="number" className="input w-full" placeholder="Interest Rate (%)" value={rate} onChange={e => setRate(e.target.value)} />
          <input type="number" className="input w-full" placeholder="Tenure (months)" value={tenure} onChange={e => setTenure(e.target.value)} />
          <input type="number" className="input w-full" placeholder="Monthly Income" value={income} onChange={e => setIncome(e.target.value)} />
          <button className="btn bg-green-600 text-white w-full hover:bg-green-700 transition-all" onClick={calculate}>Check Affordability</button>
        </div>
        {result && (
          <div className="mb-4">
            <div className="text-lg text-green-800 font-semibold">EMI: ₹{result.emi.toFixed(2)}</div>
            <div className="text-lg text-blue-800 font-semibold">Total Interest: ₹{result.totalInterest.toFixed(2)}</div>
            <div className={`text-lg font-semibold ${result.verdict === 'Affordable' ? 'text-green-700' : 'text-red-600'}`}>{result.verdict}</div>
          </div>
        )}
        <Link to="/" className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl shadow-md transition-all mt-4">Back to Tool Hub</Link>
      </div>
    </div>
  );
};

export default EMIAffordabilityChecker; 