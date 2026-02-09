import React, { useState, useEffect } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { Calculator, TrendingUp, DollarSign, Calendar, Target, Zap } from 'lucide-react';

interface PrepaymentScenario {
  type: 'lump-sum' | 'monthly-extra';
  amount: number;
  startMonth: number;
  newEMI?: number;
  newTenure?: number;
  interestSaved: number;
  timeSaved: number;
}

const PrepaymentCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [originalEMI, setOriginalEMI] = useState<number>(0);
  const [originalTotalInterest, setOriginalTotalInterest] = useState<number>(0);
  
  // Prepayment scenarios
  const [lumpSumAmount, setLumpSumAmount] = useState<number>(100000);
  const [lumpSumMonth, setLumpSumMonth] = useState<number>(12);
  const [monthlyExtraAmount, setMonthlyExtraAmount] = useState<number>(5000);
  const [monthlyExtraStartMonth, setMonthlyExtraStartMonth] = useState<number>(1);
  
  // Results
  const [lumpSumResults, setLumpSumResults] = useState<PrepaymentScenario | null>(null);
  const [monthlyExtraResults, setMonthlyExtraResults] = useState<PrepaymentScenario | null>(null);
  const [prepaymentOption, setPrepaymentOption] = useState<'reduce-emi' | 'reduce-tenure'>('reduce-tenure');

  const calculateOriginalEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const tenureMonths = loanTenure * 12;
    
    if (monthlyRate === 0) {
      const emi = loanAmount / tenureMonths;
      setOriginalEMI(emi);
      setOriginalTotalInterest(0);
    } else {
      const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                 (Math.pow(1 + monthlyRate, tenureMonths) - 1);
      setOriginalEMI(emi);
      setOriginalTotalInterest(emi * tenureMonths - loanAmount);
    }
  };

  const calculateLumpSumPrepayment = () => {
    if (lumpSumAmount <= 0 || lumpSumMonth <= 0) return;

    const monthlyRate = interestRate / 12 / 100;
    const tenureMonths = loanTenure * 12;
    
    // Calculate outstanding balance at the time of prepayment
    let balance = loanAmount;
    for (let month = 1; month < lumpSumMonth; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = originalEMI - interestPayment;
      balance = Math.max(0, balance - principalPayment);
    }
    
    // Apply lump sum prepayment
    const newBalance = Math.max(0, balance - lumpSumAmount);
    
    if (newBalance <= 0) {
      setLumpSumResults({
        type: 'lump-sum',
        amount: lumpSumAmount,
        startMonth: lumpSumMonth,
        newEMI: 0,
        newTenure: lumpSumMonth,
        interestSaved: originalTotalInterest - (originalEMI * lumpSumMonth - loanAmount),
        timeSaved: tenureMonths - lumpSumMonth
      });
      return;
    }
    
    const remainingMonths = tenureMonths - lumpSumMonth;
    
    if (prepaymentOption === 'reduce-tenure') {
      // Keep EMI same, reduce tenure
      const newTenureMonths = Math.ceil(
        Math.log(1 + (newBalance * monthlyRate) / originalEMI) / Math.log(1 + monthlyRate)
      );
      const totalInterestWithPrepayment = originalEMI * lumpSumMonth + originalEMI * newTenureMonths - loanAmount;
      const interestSaved = originalTotalInterest - totalInterestWithPrepayment;
      
      setLumpSumResults({
        type: 'lump-sum',
        amount: lumpSumAmount,
        startMonth: lumpSumMonth,
        newEMI: originalEMI,
        newTenure: lumpSumMonth + newTenureMonths,
        interestSaved,
        timeSaved: tenureMonths - (lumpSumMonth + newTenureMonths)
      });
    } else {
      // Reduce EMI, keep tenure same
      const newEMI = (newBalance * monthlyRate * Math.pow(1 + monthlyRate, remainingMonths)) / 
                    (Math.pow(1 + monthlyRate, remainingMonths) - 1);
      const totalInterestWithPrepayment = originalEMI * lumpSumMonth + newEMI * remainingMonths - loanAmount;
      const interestSaved = originalTotalInterest - totalInterestWithPrepayment;
      
      setLumpSumResults({
        type: 'lump-sum',
        amount: lumpSumAmount,
        startMonth: lumpSumMonth,
        newEMI,
        newTenure: tenureMonths,
        interestSaved,
        timeSaved: 0
      });
    }
  };

  const calculateMonthlyExtraPrepayment = () => {
    if (monthlyExtraAmount <= 0) return;

    const monthlyRate = interestRate / 12 / 100;
    const tenureMonths = loanTenure * 12;
    let balance = loanAmount;
    let totalInterestPaid = 0;
    let monthsToPayoff = 0;
    
    for (let month = 1; month <= tenureMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = originalEMI - interestPayment;
      const extraPayment = month >= monthlyExtraStartMonth ? monthlyExtraAmount : 0;
      const totalPayment = principalPayment + extraPayment;
      
      totalInterestPaid += interestPayment;
      balance = Math.max(0, balance - totalPayment);
      monthsToPayoff = month;
      
      if (balance <= 0) break;
    }
    
    const interestSaved = originalTotalInterest - totalInterestPaid;
    const timeSaved = tenureMonths - monthsToPayoff;
    
    setMonthlyExtraResults({
      type: 'monthly-extra',
      amount: monthlyExtraAmount,
      startMonth: monthlyExtraStartMonth,
      newEMI: originalEMI + monthlyExtraAmount,
      newTenure: monthsToPayoff,
      interestSaved,
      timeSaved
    });
  };

  useEffect(() => {
    calculateOriginalEMI();
  }, [loanAmount, interestRate, loanTenure]);

  useEffect(() => {
    if (originalEMI > 0) {
      calculateLumpSumPrepayment();
      calculateMonthlyExtraPrepayment();
    }
  }, [originalEMI, lumpSumAmount, lumpSumMonth, monthlyExtraAmount, monthlyExtraStartMonth, prepaymentOption]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <>
      <SEOHelmet
        title="Loan Prepayment Calculator - MoneyCal.in"
        description="Calculate the impact of loan prepayments on your EMI and tenure. Compare lump sum vs monthly extra payments and see how much you can save."
        keywords="loan prepayment calculator, EMI reduction, loan tenure reduction, prepayment impact, extra payment calculator"
        url="/loan-tools/prepayment-calculator"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="h-12 w-12 text-green-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Loan Prepayment Calculator</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate the impact of making prepayments on your loan. Compare lump sum vs monthly extra payments 
              and see how much interest and time you can save.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 text-green-600 mr-2" />
                Loan Details
              </h2>
              
              <div className="space-y-6">
                {/* Loan Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Enter loan amount"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {formatCurrency(loanAmount)}
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Enter interest rate"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {interestRate}% per annum
                  </div>
                </div>

                {/* Loan Tenure */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Tenure (Years)
                  </label>
                  <input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Enter loan tenure"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {loanTenure} years ({loanTenure * 12} months)
                  </div>
                </div>

                {/* Prepayment Option */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prepayment Strategy
                  </label>
                  <select
                    value={prepaymentOption}
                    onChange={(e) => setPrepaymentOption(e.target.value as 'reduce-emi' | 'reduce-tenure')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  >
                    <option value="reduce-tenure">Reduce Tenure (Keep EMI Same)</option>
                    <option value="reduce-emi">Reduce EMI (Keep Tenure Same)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Lump Sum Prepayment */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="h-6 w-6 text-blue-600 mr-2" />
                Lump Sum Prepayment
              </h2>
              
              <div className="space-y-6">
                {/* Lump Sum Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lump Sum Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={lumpSumAmount}
                    onChange={(e) => setLumpSumAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter lump sum amount"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {formatCurrency(lumpSumAmount)}
                  </div>
                </div>

                {/* Lump Sum Month */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prepayment Month
                  </label>
                  <input
                    type="number"
                    value={lumpSumMonth}
                    onChange={(e) => setLumpSumMonth(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter month number"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Month {lumpSumMonth} of {loanTenure * 12}
                  </div>
                </div>

                {/* Results */}
                {lumpSumResults && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 font-medium">Interest Saved</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(lumpSumResults.interestSaved)}
                      </p>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 font-medium">Time Saved</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {lumpSumResults.timeSaved} months
                      </p>
                    </div>

                    {prepaymentOption === 'reduce-tenure' ? (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 font-medium">New Tenure</p>
                        <p className="text-xl font-bold text-gray-900">
                          {lumpSumResults.newTenure} months
                        </p>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 font-medium">New EMI</p>
                        <p className="text-xl font-bold text-gray-900">
                          {formatCurrency(lumpSumResults.newEMI || 0)}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Monthly Extra Payment */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="h-6 w-6 text-purple-600 mr-2" />
                Monthly Extra Payment
              </h2>
              
              <div className="space-y-6">
                {/* Monthly Extra Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Extra Amount per Month (₹)
                  </label>
                  <input
                    type="number"
                    value={monthlyExtraAmount}
                    onChange={(e) => setMonthlyExtraAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                    placeholder="Enter extra amount"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {formatCurrency(monthlyExtraAmount)}
                  </div>
                </div>

                {/* Start Month */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start from Month
                  </label>
                  <input
                    type="number"
                    value={monthlyExtraStartMonth}
                    onChange={(e) => setMonthlyExtraStartMonth(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                    placeholder="Enter start month"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Month {monthlyExtraStartMonth} of {loanTenure * 12}
                  </div>
                </div>

                {/* Results */}
                {monthlyExtraResults && (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 font-medium">Interest Saved</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(monthlyExtraResults.interestSaved)}
                      </p>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 font-medium">Time Saved</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {monthlyExtraResults.timeSaved} months
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 font-medium">New Tenure</p>
                      <p className="text-xl font-bold text-gray-900">
                        {monthlyExtraResults.newTenure} months
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Original Loan Summary */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 text-gray-600 mr-2" />
              Original Loan Summary
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-sm text-gray-600 font-medium">Monthly EMI</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(originalEMI)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-sm text-gray-600 font-medium">Total Interest</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(originalTotalInterest)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-sm text-gray-600 font-medium">Total Payment</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(originalEMI * loanTenure * 12)}</p>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Lump Sum Prepayment</h3>
                <p className="text-sm text-gray-600">
                  Best for windfalls like bonuses, tax refunds, or inheritance. 
                  Reduces both interest and tenure significantly.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Monthly Extra Payment</h3>
                <p className="text-sm text-gray-600">
                  Ideal for consistent extra income. Even small amounts can save 
                  substantial interest over the loan tenure.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Strategy Choice</h3>
                <p className="text-sm text-gray-600">
                  Choose "Reduce Tenure" to pay off faster, or "Reduce EMI" 
                  to improve monthly cash flow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrepaymentCalculator;