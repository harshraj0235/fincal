import React, { useState, useEffect } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { Calculator, TrendingUp, Calendar, DollarSign, PieChart } from 'lucide-react';

interface AmortizationEntry {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

const EMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [emi, setEmi] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationEntry[]>([]);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const tenureMonths = loanTenure * 12;
    
    if (monthlyRate === 0) {
      const calculatedEMI = loanAmount / tenureMonths;
      setEmi(calculatedEMI);
      setTotalPayment(loanAmount);
      setTotalInterest(0);
    } else {
      const calculatedEMI = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                           (Math.pow(1 + monthlyRate, tenureMonths) - 1);
      setEmi(calculatedEMI);
      setTotalPayment(calculatedEMI * tenureMonths);
      setTotalInterest(totalPayment - loanAmount);
    }
  };

  const generateAmortizationSchedule = () => {
    const monthlyRate = interestRate / 12 / 100;
    const tenureMonths = loanTenure * 12;
    const schedule: AmortizationEntry[] = [];
    let balance = loanAmount;

    for (let month = 1; month <= tenureMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance = Math.max(0, balance - principalPayment);

      schedule.push({
        month,
        emi: Math.round(emi),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.round(balance)
      });

      if (balance <= 0) break;
    }

    setAmortizationSchedule(schedule);
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  useEffect(() => {
    if (emi > 0) {
      generateAmortizationSchedule();
    }
  }, [emi]);

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
        title="EMI Calculator (Reducing Balance) - MoneyCal.in"
        description="Calculate your loan EMI with reducing balance method. Get detailed amortization schedule and understand your loan repayment structure."
        keywords="EMI calculator, loan EMI, reducing balance, amortization schedule, loan calculator, home loan EMI"
        url="/loan-tools/emi-calculator"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">EMI Calculator</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate your Equated Monthly Installment (EMI) using the reducing balance method. 
              Get detailed amortization schedule and understand your loan repayment structure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter loan tenure"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {loanTenure} years ({loanTenure * 12} months)
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                EMI Calculation Results
              </h2>
              
              <div className="space-y-6">
                {/* EMI Amount */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Monthly EMI</p>
                      <p className="text-3xl font-bold">{formatCurrency(emi)}</p>
                    </div>
                    <Calendar className="h-12 w-12 text-blue-200" />
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 font-medium">Total Payment</p>
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(totalPayment)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 font-medium">Total Interest</p>
                    <p className="text-xl font-bold text-red-600">{formatCurrency(totalInterest)}</p>
                  </div>
                </div>

                {/* Interest to Principal Ratio */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <PieChart className="h-5 w-5 text-green-600 mr-2" />
                    <p className="text-sm font-medium text-gray-700">Interest to Principal Ratio</p>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {loanAmount > 0 ? ((totalInterest / loanAmount) * 100).toFixed(1) : 0}%
                  </div>
                  <p className="text-sm text-gray-600">
                    You pay {formatCurrency(totalInterest)} in interest for {formatCurrency(loanAmount)} principal
                  </p>
                </div>

                {/* Amortization Schedule Toggle */}
                <button
                  onClick={() => setShowSchedule(!showSchedule)}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
                >
                  {showSchedule ? 'Hide' : 'Show'} Amortization Schedule
                </button>
              </div>
            </div>
          </div>

          {/* Amortization Schedule */}
          {showSchedule && amortizationSchedule.length > 0 && (
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 text-purple-600 mr-2" />
                Amortization Schedule
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Month</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">EMI</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Principal</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Interest</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amortizationSchedule.slice(0, 12).map((entry) => (
                      <tr key={entry.month} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-3 text-gray-900">{entry.month}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-900">{formatCurrency(entry.emi)}</td>
                        <td className="border border-gray-200 px-4 py-3 text-green-600">{formatCurrency(entry.principal)}</td>
                        <td className="border border-gray-200 px-4 py-3 text-red-600">{formatCurrency(entry.interest)}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-900">{formatCurrency(entry.balance)}</td>
                      </tr>
                    ))}
                    {amortizationSchedule.length > 12 && (
                      <tr>
                        <td colSpan={5} className="border border-gray-200 px-4 py-3 text-center text-gray-500">
                          ... and {amortizationSchedule.length - 12} more months
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>Showing first 12 months. Total loan tenure: {loanTenure * 12} months</p>
              </div>
            </div>
          )}

          {/* Key Insights */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Reducing Balance Method</h3>
                <p className="text-sm text-gray-600">
                  Interest is calculated on the outstanding principal balance, which decreases with each EMI payment.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Early Years</h3>
                <p className="text-sm text-gray-600">
                  In the initial years, a larger portion of your EMI goes towards interest payment.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Later Years</h3>
                <p className="text-sm text-gray-600">
                  As the loan progresses, more of your EMI goes towards principal repayment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EMICalculator;