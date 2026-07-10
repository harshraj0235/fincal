import React, { useState, useMemo } from 'react';
import { DollarSign, IndianRupee, TrendingUp, Download, Share2, ArrowRight } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const PersonalLoanEmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(14);
  const [loanTenure, setLoanTenure] = useState(3);

  const calculations = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalAmount = emi * months;
    const totalInterest = totalAmount - loanAmount;

    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: loanAmount
    };
  }, [loanAmount, interestRate, loanTenure]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <>
      <SEOHelmet
        title="Personal Loan EMI Calculator 2025 India - Instant Personal Loan Calculator | MoneyCal"
        description="Calculate personal loan EMI instantly. Compare interest rates from all banks. Plan medical, wedding, travel expenses. Get instant approval estimate. Free personal loan Calculator 2025."
        keywords="personal loan EMI Calculator, personal loan Calculator India, instant personal loan, personal loan interest rate 2025, wedding loan Calculator, medical loan EMI"
        canonicalUrl="https://moneycal.in/calculators/personal-loan-emi-calculator"
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              💵 Personal Loan EMI Calculator
            </h1>
            <p className="text-xl text-gray-700">Calculate instant personal loan EMI for weddings, medical, travel & more</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Loan Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Loan Amount</label>
                  <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full px-4 py-3 border-2 rounded-xl text-lg font-bold" />
                  <input type="range" min="50000" max="4000000" step="50000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full mt-2" />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Interest Rate (% p.a.)</label>
                  <input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} step="0.1" className="w-full px-4 py-3 border-2 rounded-xl text-lg font-bold" />
                  <input type="range" min="10" max="20" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full mt-2" />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Tenure (Years)</label>
                  <input type="number" value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))} className="w-full px-4 py-3 border-2 rounded-xl text-lg font-bold" />
                  <input type="range" min="1" max="5" value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))} className="w-full mt-2" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Monthly EMI</h2>
                <div className="text-6xl font-black">{formatCurrency(calculations.emi)}</div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-purple-200">
                  <DollarSign className="h-12 w-12 text-purple-600 mb-3" />
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Principal</h3>
                  <p className="text-3xl font-black text-gray-900">{formatCurrency(calculations.principal)}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-orange-200">
                  <TrendingUp className="h-12 w-12 text-orange-600 mb-3" />
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Interest</h3>
                  <p className="text-3xl font-black text-gray-900">{formatCurrency(calculations.totalInterest)}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-pink-200">
                  <IndianRupee className="h-12 w-12 text-pink-600 mb-3" />
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Payment</h3>
                  <p className="text-3xl font-black text-gray-900">{formatCurrency(calculations.totalAmount)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalLoanEmiCalculator;

