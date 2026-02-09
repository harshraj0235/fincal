import React, { useState, useMemo } from 'react';
import { CheckCircle, Calculator, TrendingUp } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const LoanEligibilityCalculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [existingEmi, setExistingEmi] = useState(0);
  const [interestRate, setInterestRate] = useState(9);
  const [tenure, setTenure] = useState(20);

  const calculations = useMemo(() => {
    const maxEmiAllowed = (monthlyIncome - existingEmi) * 0.5; // 50% FOIR
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    
    // Calculate max loan amount
    const maxLoan = maxEmiAllowed * (Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months));

    return {
      maxEmiAllowed: Math.round(maxEmiAllowed),
      maxLoanEligible: Math.round(maxLoan),
      multipleOfSalary: Math.round(maxLoan / monthlyIncome * 10) / 10
    };
  }, [monthlyIncome, existingEmi, interestRate, tenure]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <>
      <SEOHelmet
        title="Loan Eligibility Calculator - Check How Much Loan You Can Get | MoneyCal"
        description="Calculate your loan eligibility based on salary. Find out maximum home loan, personal loan you can get. Instant loan eligibility calculator 2025."
        keywords="loan eligibility calculator, how much loan can I get, loan eligibility based on salary, home loan eligibility calculator"
        canonicalUrl="https://moneycal.in/calculators/loan-eligibility"
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-black text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ✅ Loan Eligibility Calculator
          </h1>
          <p className="text-center text-xl text-gray-700 mb-12">Check maximum loan amount you can get</p>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
              <div>
                <label className="block font-semibold mb-2">Monthly Income</label>
                <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} className="w-full px-4 py-3 border-2 rounded-xl font-bold" />
              </div>
              <div>
                <label className="block font-semibold mb-2">Existing EMI (if any)</label>
                <input type="number" value={existingEmi} onChange={(e) => setExistingEmi(Number(e.target.value))} className="w-full px-4 py-3 border-2 rounded-xl font-bold" />
              </div>
              <div>
                <label className="block font-semibold mb-2">Interest Rate (%)</label>
                <input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} step="0.1" className="w-full px-4 py-3 border-2 rounded-xl font-bold" />
              </div>
              <div>
                <label className="block font-semibold mb-2">Tenure (Years)</label>
                <input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full px-4 py-3 border-2 rounded-xl font-bold" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white">
                <CheckCircle className="h-12 w-12 mb-4" />
                <h2 className="text-2xl font-bold mb-4">Maximum Loan Eligible</h2>
                <div className="text-5xl font-black mb-2">{formatCurrency(calculations.maxLoanEligible)}</div>
                <p className="text-lg">{calculations.multipleOfSalary}× your monthly salary</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-sm text-gray-600 mb-2">Maximum EMI Allowed</p>
                <p className="text-3xl font-bold text-indigo-600">{formatCurrency(calculations.maxEmiAllowed)}</p>
                <p className="text-xs text-gray-600 mt-1">50% of net monthly income</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanEligibilityCalculator;

