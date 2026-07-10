import React, { useState, useEffect } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { IndianRupee, Calendar, DollarSign, TrendingUp, Download, Eye, BarChart3 } from 'lucide-react';

interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
}

const AmortizationScheduleViewer: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [emi, setEmi] = useState<number>(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationEntry[]>([]);
  const [showFullSchedule, setShowFullSchedule] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(1);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const tenureMonths = loanTenure * 12;
    
    if (monthlyRate === 0) {
      const calculatedEMI = loanAmount / tenureMonths;
      setEmi(calculatedEMI);
    } else {
      const calculatedEMI = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                           (Math.pow(1 + monthlyRate, tenureMonths) - 1);
      setEmi(calculatedEMI);
    }
  };

  const generateAmortizationSchedule = () => {
    const monthlyRate = interestRate / 12 / 100;
    const tenureMonths = loanTenure * 12;
    const schedule: AmortizationEntry[] = [];
    let balance = loanAmount;
    let cumulativeInterest = 0;
    let cumulativePrincipal = 0;

    for (let month = 1; month <= tenureMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance = Math.max(0, balance - principalPayment);
      cumulativeInterest += interestPayment;
      cumulativePrincipal += principalPayment;

      schedule.push({
        month,
        payment: emi,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance,
        cumulativeInterest,
        cumulativePrincipal
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

  const exportToCSV = () => {
    const headers = ['Month', 'Payment', 'Principal', 'Interest', 'Balance', 'Cumulative Interest', 'Cumulative Principal'];
    const csvContent = [
      headers.join(','),
      ...amortizationSchedule.map(entry => [
        entry.month,
        entry.payment,
        entry.principal,
        entry.interest,
        entry.balance,
        entry.cumulativeInterest,
        entry.cumulativePrincipal
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `amortization-schedule-${loanAmount}-${interestRate}%-${loanTenure}years.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getYearlySummary = () => {
    const yearlyData: { [key: number]: { principal: number; interest: number; balance: number } } = {};
    
    amortizationSchedule.forEach(entry => {
      const year = Math.ceil(entry.month / 12);
      if (!yearlyData[year]) {
        yearlyData[year] = { principal: 0, interest: 0, balance: 0 };
      }
      yearlyData[year].principal += entry.principal;
      yearlyData[year].interest += entry.interest;
      yearlyData[year].balance = entry.balance;
    });
    
    return yearlyData;
  };

  const yearlySummary = getYearlySummary();
  const totalInterest = amortizationSchedule.reduce((sum, entry) => sum + entry.interest, 0);
  const totalPayments = emi * loanTenure * 12;

  return (
    <>
      <SEOHelmet
        title="Amortization Schedule Viewer - MoneyCal.in"
        description="View detailed amortization schedule for your loan. See month-by-month breakdown of principal, interest, and balance with export options."
        keywords="amortization schedule, loan schedule, EMI breakdown, principal interest, loan calculator"
        url="/loan-tools/amortization-schedule-viewer"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <IndianRupee className="h-12 w-12 text-teal-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Amortization Schedule Viewer</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              View detailed amortization schedule for your loan. See month-by-month breakdown 
              of principal, interest, and balance with export and analysis options.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 text-teal-600 mr-2" />
                Loan Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg"
                    placeholder="Enter loan amount"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {formatCurrency(loanAmount)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg"
                    placeholder="Enter interest rate"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {interestRate}% per annum
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Tenure (Years)
                  </label>
                  <input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg"
                    placeholder="Enter loan tenure"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {loanTenure} years ({loanTenure * 12} months)
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
                Loan Summary
              </h2>
              
              <div className="space-y-6">
                {/* EMI Amount */}
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-teal-100 text-sm font-medium">Monthly EMI</p>
                      <p className="text-3xl font-bold">{formatCurrency(emi)}</p>
                    </div>
                    <Calendar className="h-12 w-12 text-teal-200" />
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 font-medium">Total Payments</p>
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(totalPayments)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 font-medium">Total Interest</p>
                    <p className="text-xl font-bold text-red-600">{formatCurrency(totalInterest)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 font-medium">Interest to Principal Ratio</p>
                    <p className="text-xl font-bold text-gray-900">
                      {loanAmount > 0 ? ((totalInterest / loanAmount) * 100).toFixed(1) : 0}%
                    </p>
                  </div>
                </div>

                {/* Export Button */}
                <button
                  onClick={exportToCSV}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Export to CSV
                </button>
              </div>
            </div>

            {/* Yearly Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="h-6 w-6 text-purple-600 mr-2" />
                Yearly Summary
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Year
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {Object.keys(yearlySummary).map(year => (
                      <option key={year} value={year}>Year {year}</option>
                    ))}
                  </select>
                </div>

                {yearlySummary[selectedYear] && (
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 font-medium">Principal Paid</p>
                      <p className="text-xl font-bold text-blue-600">
                        {formatCurrency(yearlySummary[selectedYear].principal)}
                      </p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 font-medium">Interest Paid</p>
                      <p className="text-xl font-bold text-red-600">
                        {formatCurrency(yearlySummary[selectedYear].interest)}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 font-medium">Remaining Balance</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatCurrency(yearlySummary[selectedYear].balance)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Amortization Schedule */}
          {amortizationSchedule.length > 0 && (
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Calendar className="h-6 w-6 text-teal-600 mr-2" />
                  Amortization Schedule
                </h2>
                <button
                  onClick={() => setShowFullSchedule(!showFullSchedule)}
                  className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-200 flex items-center"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {showFullSchedule ? 'Show Summary' : 'Show Full Schedule'}
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Month</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Payment</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Principal</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Interest</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Balance</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Cum. Interest</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Cum. Principal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(showFullSchedule ? amortizationSchedule : amortizationSchedule.slice(0, 12)).map((entry) => (
                      <tr key={entry.month} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-3 text-gray-900">{entry.month}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-900">{formatCurrency(entry.payment)}</td>
                        <td className="border border-gray-200 px-4 py-3 text-green-600">{formatCurrency(entry.principal)}</td>
                        <td className="border border-gray-200 px-4 py-3 text-red-600">{formatCurrency(entry.interest)}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-900">{formatCurrency(entry.balance)}</td>
                        <td className="border border-gray-200 px-4 py-3 text-red-600">{formatCurrency(entry.cumulativeInterest)}</td>
                        <td className="border border-gray-200 px-4 py-3 text-green-600">{formatCurrency(entry.cumulativePrincipal)}</td>
                      </tr>
                    ))}
                    {!showFullSchedule && amortizationSchedule.length > 12 && (
                      <tr>
                        <td colSpan={7} className="border border-gray-200 px-4 py-3 text-center text-gray-500">
                          ... and {amortizationSchedule.length - 12} more months
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  {showFullSchedule 
                    ? `Showing complete schedule for ${loanTenure * 12} months`
                    : `Showing first 12 months. Total loan tenure: ${loanTenure * 12} months`
                  }
                </p>
              </div>
            </div>
          )}

          {/* Key Insights */}
          <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Early Years</h3>
                <p className="text-sm text-gray-600">
                  In the initial years, a larger portion of your EMI goes towards interest payment, 
                  with smaller principal reduction.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Later Years</h3>
                <p className="text-sm text-gray-600">
                  As the loan progresses, more of your EMI goes towards principal repayment, 
                  accelerating the balance reduction.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Prepayment Impact</h3>
                <p className="text-sm text-gray-600">
                  Making prepayments in early years has the maximum impact on reducing 
                  total interest paid over the loan tenure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AmortizationScheduleViewer;
