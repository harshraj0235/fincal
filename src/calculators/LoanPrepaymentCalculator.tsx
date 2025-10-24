import React, { useState, useMemo } from 'react';
import { DollarSign, TrendingDown, Calculator } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

export const LoanPrepaymentCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(9);
  const [tenure, setTenure] = useState(10);
  const [prepaymentAmount, setPrepaymentAmount] = useState(100000);
  const [prepaymentMonth, setPrepaymentMonth] = useState(12);

  const calculations = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    
    // Without prepayment
    const emiWithout = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalWithout = emiWithout * months;
    const interestWithout = totalWithout - loanAmount;

    // With prepayment
    let balance = loanAmount;
    let totalPaid = 0;
    let monthsPaid = 0;
    const emiWith = emiWithout;

    for (let i = 1; i <= months; i++) {
      const interestPart = balance * monthlyRate;
      const principalPart = emiWith - interestPart;
      
      if (i === prepaymentMonth) {
        balance -= prepaymentAmount;
      }
      
      balance -= principalPart;
      totalPaid += emiWith;
      monthsPaid++;

      if (balance <= 0) break;
    }

    const interestWith = totalPaid - loanAmount - prepaymentAmount;
    const savedInterest = interestWithout - interestWith;
    const savedMonths = months - monthsPaid;

    return {
      emiWithout: Math.round(emiWithout),
      interestWithout: Math.round(interestWithout),
      interestWith: Math.round(interestWith),
      savedInterest: Math.round(savedInterest),
      savedMonths: Math.round(savedMonths)
    };
  }, [loanAmount, interestRate, tenure, prepaymentAmount, prepaymentMonth]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <>
      <SEOHelmet
        title="Loan Prepayment Calculator - Calculate Prepayment Savings | MoneyCal"
        description="Calculate how much you can save by prepaying your loan. See interest savings and reduced tenure. Plan lumpsum prepayments strategically."
        keywords="loan prepayment calculator, prepayment savings calculator, home loan prepayment, EMI prepayment calculator"
        canonicalUrl="https://moneycal.in/calculators/prepayment-calculator"
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-black text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            💰 Loan Prepayment Calculator
          </h1>
          <p className="text-center text-xl text-gray-700 mb-12">Calculate interest savings from prepayment</p>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
              <div>
                <label className="block font-semibold mb-2">Original Loan Amount</label>
                <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full px-4 py-3 border-2 rounded-xl font-bold" />
              </div>
              <div>
                <label className="block font-semibold mb-2">Interest Rate (%)</label>
                <input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} step="0.1" className="w-full px-4 py-3 border-2 rounded-xl font-bold" />
              </div>
              <div>
                <label className="block font-semibold mb-2">Tenure (Years)</label>
                <input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full px-4 py-3 border-2 rounded-xl font-bold" />
              </div>
              <div>
                <label className="block font-semibold mb-2">Prepayment Amount</label>
                <input type="number" value={prepaymentAmount} onChange={(e) => setPrepaymentAmount(Number(e.target.value))} className="w-full px-4 py-3 border-2 rounded-xl font-bold" />
              </div>
              <div>
                <label className="block font-semibold mb-2">Prepayment After (Months)</label>
                <input type="number" value={prepaymentMonth} onChange={(e) => setPrepaymentMonth(Number(e.target.value))} className="w-full px-4 py-3 border-2 rounded-xl font-bold" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">💰 Interest Saved</h2>
                <div className="text-5xl font-black">{formatCurrency(calculations.savedInterest)}</div>
                <p className="text-lg mt-2">Tenure reduced by {calculations.savedMonths} months</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <p className="text-xs text-gray-600 mb-1">Without Prepayment</p>
                  <p className="text-xl font-bold text-red-600">{formatCurrency(calculations.interestWithout)}</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <p className="text-xs text-gray-600 mb-1">With Prepayment</p>
                  <p className="text-xl font-bold text-green-600">{formatCurrency(calculations.interestWith)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
