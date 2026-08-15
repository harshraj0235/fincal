"use client";
import React, { useState, useMemo } from 'react';
import { GraduationCap, Calculator, TrendingDown, IndianRupee, Calendar, Percent, Info } from 'lucide-react';

const EducationLoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(7);
  const [moratorium, setMoratorium] = useState(1);

  const results = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const moratoriumMonths = moratorium * 12;
    const repaymentMonths = tenure * 12;

    // Interest during moratorium
    const moratoriumInterest = principal * monthlyRate * moratoriumMonths;
    const totalPrincipalAfterMoratorium = principal + moratoriumInterest;

    // EMI calculation
    const emi = totalPrincipalAfterMoratorium * monthlyRate * Math.pow(1 + monthlyRate, repaymentMonths) /
      (Math.pow(1 + monthlyRate, repaymentMonths) - 1);

    const totalPayment = emi * repaymentMonths;
    const totalInterest = totalPayment - principal;
    const taxSaving80E = Math.min(totalInterest, totalInterest) * 0.3; // Approx 30% slab

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      moratoriumInterest: Math.round(moratoriumInterest),
      taxSaving80E: Math.round(taxSaving80E),
      effectiveInterest: Math.round(totalInterest - taxSaving80E),
    };
  }, [loanAmount, interestRate, tenure, moratorium]);

  const formatCurrency = (n: number) => '₹' + n.toLocaleString('en-IN');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Education Loan EMI Calculator</h2>
        <p className="text-gray-600">Calculate EMI for study in India or abroad with moratorium period & Section 80E tax benefit</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2"><Calculator className="w-5 h-5 text-purple-500" /> Loan Details</h3>

          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
              <span>Loan Amount</span><span className="text-purple-600">{formatCurrency(loanAmount)}</span>
            </label>
            <input type="range" min={100000} max={5000000} step={50000} value={loanAmount} onChange={e => setLoanAmount(+e.target.value)}
              className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>₹1L</span><span>₹50L</span></div>
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
              <span>Interest Rate (% p.a.)</span><span className="text-purple-600">{interestRate}%</span>
            </label>
            <input type="range" min={5} max={15} step={0.1} value={interestRate} onChange={e => setInterestRate(+e.target.value)}
              className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>5%</span><span>15%</span></div>
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
              <span>Repayment Tenure</span><span className="text-purple-600">{tenure} years</span>
            </label>
            <input type="range" min={1} max={15} step={1} value={tenure} onChange={e => setTenure(+e.target.value)}
              className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1 yr</span><span>15 yrs</span></div>
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
              <span>Moratorium Period</span><span className="text-purple-600">{moratorium} year{moratorium > 1 ? 's' : ''}</span>
            </label>
            <input type="range" min={0} max={5} step={1} value={moratorium} onChange={e => setMoratorium(+e.target.value)}
              className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>0 yr</span><span>5 yrs</span></div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-purple-200 text-sm mb-1">Monthly EMI</p>
            <p className="text-3xl font-bold">{formatCurrency(results.emi)}</p>
            <p className="text-purple-200 text-xs mt-1">After {moratorium}-year moratorium period</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1"><IndianRupee className="w-4 h-4 text-gray-400" /><span className="text-xs text-gray-500">Total Payment</span></div>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(results.totalPayment)}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1"><Percent className="w-4 h-4 text-red-400" /><span className="text-xs text-gray-500">Total Interest</span></div>
              <p className="text-lg font-bold text-red-600">{formatCurrency(results.totalInterest)}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1"><Calendar className="w-4 h-4 text-amber-400" /><span className="text-xs text-gray-500">Moratorium Interest</span></div>
              <p className="text-lg font-bold text-amber-600">{formatCurrency(results.moratoriumInterest)}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1"><TrendingDown className="w-4 h-4 text-green-400" /><span className="text-xs text-gray-500">Tax Saving (80E)</span></div>
              <p className="text-lg font-bold text-green-600">{formatCurrency(results.taxSaving80E)}</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Section 80E Tax Benefit</p>
                <p>Interest paid on education loan is fully deductible under Section 80E for up to 8 years from the year you start repaying. No upper limit on deduction amount.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationLoanCalculator;
