import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, DollarSign, Calendar, Download, Link, Building, BarChart3, FileText, TrendingUp } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { getPdfLibs } from '../../lib/pdfExportClient';

export const LoanAmortizationGenerator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [inputs, setInputs] = useState({
    loanAmount: 10000000,
    interestRate: 8.5,
    loanTenure: 5,
    repaymentFrequency: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
    gracePeriod: 0,
    processingFee: 0.5,
    prepaymentAllowed: true,
    prepaymentPenalty: 2
  });

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalInterest: 0,
    totalAmount: 0,
    amortizationSchedule: [],
    summary: {
      principalAmount: 0,
      totalInterest: 0,
      totalPayments: 0,
      effectiveRate: 0,
      processingFee: 0
    },
    charts: {
      principalVsInterest: [],
      outstandingBalance: [],
      cumulativeInterest: []
    }
  });

  const repaymentFrequencies = [
    { value: 'monthly', label: 'Monthly', periodsPerYear: 12 },
    { value: 'quarterly', label: 'Quarterly', periodsPerYear: 4 },
    { value: 'semi-annually', label: 'Semi-Annually', periodsPerYear: 2 },
    { value: 'annually', label: 'Annually', periodsPerYear: 1 }
  ];

  const calculateAmortization = () => {
    const {
      loanAmount,
      interestRate,
      loanTenure,
      repaymentFrequency,
      gracePeriod,
      processingFee
    } = inputs;

    const frequency = repaymentFrequencies.find(f => f.value === repaymentFrequency);
    if (!frequency) return;

    const periodsPerYear = frequency.periodsPerYear;
    const totalPeriods = loanTenure * periodsPerYear;
    const periodicRate = interestRate / 100 / periodsPerYear;
    const processingFeeAmount = (loanAmount * processingFee) / 100;

    // Calculate periodic payment using PMT formula
    const periodicPayment = loanAmount * (periodicRate * Math.pow(1 + periodicRate, totalPeriods)) / 
                           (Math.pow(1 + periodicRate, totalPeriods) - 1);

    const schedule = [];
    let outstandingBalance = loanAmount;
    let cumulativeInterest = 0;
    let currentDate = new Date(startDate);

    for (let period = 1; period <= totalPeriods; period++) {
      const interestPayment = outstandingBalance * periodicRate;
      const principalPayment = period <= gracePeriod ? 0 : periodicPayment - interestPayment;
      const newBalance = outstandingBalance - principalPayment;

      cumulativeInterest += interestPayment;

      schedule.push({
        period,
        date: new Date(currentDate).toLocaleDateString('en-IN'),
        payment: period <= gracePeriod ? 0 : periodicPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: newBalance,
        cumulativeInterest
      });

      outstandingBalance = newBalance;
      
      // Add period to date
      if (repaymentFrequency === 'monthly') {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else if (repaymentFrequency === 'quarterly') {
        currentDate.setMonth(currentDate.getMonth() + 3);
      } else if (repaymentFrequency === 'semi-annually') {
        currentDate.setMonth(currentDate.getMonth() + 6);
      } else {
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      }
    }

    const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);
    const totalAmount = loanAmount + totalInterest + processingFeeAmount;
    const effectiveRate = (Math.pow(1 + periodicRate, periodsPerYear) - 1) * 100;

    // Prepare chart data
    const principalVsInterest = schedule.map(row => ({
      period: row.period,
      principal: row.principal,
      interest: row.interest
    }));

    const outstandingBalanceChart = schedule.map(row => ({
      period: row.period,
      balance: row.balance
    }));

    const cumulativeInterestChart = schedule.map(row => ({
      period: row.period,
      cumulativeInterest: row.cumulativeInterest
    }));

    setResults({
      monthlyPayment: periodicPayment,
      totalInterest,
      totalAmount,
      amortizationSchedule: schedule,
      summary: {
        principalAmount: loanAmount,
        totalInterest,
        totalPayments: totalAmount,
        effectiveRate,
        processingFee: processingFeeAmount
      },
      charts: {
        principalVsInterest,
        outstandingBalance: outstandingBalanceChart,
        cumulativeInterest: cumulativeInterestChart
      }
    });
  };

  useEffect(() => {
    calculateAmortization();
  }, [inputs]);

  const handleInputChange = (field: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(1) + ' Cr';
    } else if (num >= 100000) {
      return (num / 100000).toFixed(1) + ' L';
    } else {
      return num.toLocaleString();
    }
  };

  const downloadPDF = async () => {
    if (!resultsRef.current) return;
    const { html2canvas, jsPDF } = await getPdfLibs();
    try {
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save('loan-amortization-schedule.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const exportToExcel = () => {
    const csvContent = [
      ['Period', 'Date', 'Payment', 'Principal', 'Interest', 'Outstanding Balance', 'Cumulative Interest'],
      ...results.amortizationSchedule.map(row => [
        row.period,
        row.date,
        row.payment.toFixed(2),
        row.principal.toFixed(2),
        row.interest.toFixed(2),
        row.balance.toFixed(2),
        row.cumulativeInterest.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'loan-amortization-schedule.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEOHelmet
        title="Corporate Loan Amortization Schedule Generator - Free Business Loan Calculator | MoneyCal.in"
        description="Generate detailed corporate loan amortization schedules with Excel export. Calculate EMI, interest payments, and loan repayment schedules for business loans."
        keywords="corporate loan calculator, loan amortization schedule, business EMI tool, corporate loan repayment, business loan calculator"
        url="/corporate-finance/loan-amortization-generator"
        type="website"
        image="/images/loan-amortization-generator.jpg"
        tags={["corporate loan", "amortization", "business loan", "EMI calculator"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </button>
          </div>

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <DollarSign className="h-16 w-16 text-green-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Corporate Loan Amortization Generator
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Generate detailed loan amortization schedules for corporate loans. 
              Calculate EMI, interest payments, and create comprehensive repayment schedules with Excel export.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-green-600 mr-2" />
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
                    value={inputs.loanAmount}
                    onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.interestRate}
                    onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Loan Tenure */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Tenure (Years)
                  </label>
                  <input
                    type="number"
                    value={inputs.loanTenure}
                    onChange={(e) => handleInputChange('loanTenure', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Repayment Frequency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Repayment Frequency
                  </label>
                  <select
                    value={inputs.repaymentFrequency}
                    onChange={(e) => handleInputChange('repaymentFrequency', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {repaymentFrequencies.map((freq, index) => (
                      <option key={index} value={freq.value}>
                        {freq.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Start Date
                  </label>
                  <input
                    type="date"
                    value={inputs.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Grace Period */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grace Period (Interest Only)
                  </label>
                  <input
                    type="number"
                    value={inputs.gracePeriod}
                    onChange={(e) => handleInputChange('gracePeriod', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Number of periods with interest-only payments
                  </p>
                </div>

                {/* Processing Fee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Processing Fee (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.processingFee}
                    onChange={(e) => handleInputChange('processingFee', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Prepayment Options */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={inputs.prepaymentAllowed}
                      onChange={(e) => handleInputChange('prepaymentAllowed', e.target.checked)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Prepayment Allowed
                    </label>
                  </div>
                  
                  {inputs.prepaymentAllowed && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prepayment Penalty (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.prepaymentPenalty}
                        onChange={(e) => handleInputChange('prepaymentPenalty', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div ref={resultsRef} className="space-y-6">
              {/* Loan Summary */}
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-8 text-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <Calendar className="h-6 w-6 mr-2" />
                    Loan Summary
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={downloadPDF}
                      className="flex items-center px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </button>
                    <button
                      onClick={exportToExcel}
                      className="flex items-center px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Excel
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-xl font-bold">
                      {formatCurrency(results.monthlyPayment)}
                    </div>
                    <div className="text-green-100">Periodic Payment</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-xl font-bold">
                      {formatCurrency(results.totalInterest)}
                    </div>
                    <div className="text-green-100">Total Interest</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-xl font-bold">
                      {formatCurrency(results.totalAmount)}
                    </div>
                    <div className="text-green-100">Total Amount</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-xl font-bold">
                      {results.summary.effectiveRate.toFixed(2)}%
                    </div>
                    <div className="text-green-100">Effective Rate</div>
                  </div>
                </div>
              </div>

              {/* Loan Breakdown */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 text-green-600 mr-2" />
                  Loan Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Principal Amount</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(results.summary.principalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Total Interest</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(results.summary.totalInterest)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Processing Fee</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(results.summary.processingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                    <span className="font-semibold text-gray-900">Total Payments</span>
                    <span className="font-bold text-green-600 text-lg">
                      {formatCurrency(results.summary.totalPayments)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Amortization Schedule Preview */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                  Amortization Schedule (First 12 Periods)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2">Period</th>
                        <th className="text-left py-2">Date</th>
                        <th className="text-right py-2">Payment</th>
                        <th className="text-right py-2">Principal</th>
                        <th className="text-right py-2">Interest</th>
                        <th className="text-right py-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.amortizationSchedule.slice(0, 12).map((row, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-2">{row.period}</td>
                          <td className="py-2">{row.date}</td>
                          <td className="text-right py-2">{formatNumber(row.payment)}</td>
                          <td className="text-right py-2">{formatNumber(row.principal)}</td>
                          <td className="text-right py-2">{formatNumber(row.interest)}</td>
                          <td className="text-right py-2">{formatNumber(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {results.amortizationSchedule.length > 12 && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Showing first 12 periods. Download PDF/Excel for complete schedule.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Loan Amortization</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Loan amortization is the process of paying off a loan through regular payments over time. 
                Each payment consists of both principal and interest components, with the interest portion 
                decreasing and principal portion increasing over the loan term.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Components:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Principal:</strong> The original loan amount borrowed</li>
                <li><strong>Interest:</strong> The cost of borrowing, calculated on the outstanding balance</li>
                <li><strong>EMI/Payment:</strong> Fixed periodic payment covering both principal and interest</li>
                <li><strong>Amortization Schedule:</strong> Detailed breakdown of each payment over the loan term</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Corporate Loan Features:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Flexible Repayment:</strong> Monthly, quarterly, semi-annual, or annual payments</li>
                <li><strong>Grace Period:</strong> Interest-only payments for initial periods</li>
                <li><strong>Processing Fees:</strong> One-time charges for loan processing</li>
                <li><strong>Prepayment Options:</strong> Early repayment with or without penalties</li>
                <li><strong>Tax Benefits:</strong> Interest payments may be tax-deductible for businesses</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Benefits of Amortization Schedule:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Clear visibility of payment breakdown over time</li>
                <li>Helps in cash flow planning and budgeting</li>
                <li>Enables comparison of different loan options</li>
                <li>Facilitates prepayment planning and optimization</li>
                <li>Provides documentation for accounting and tax purposes</li>
              </ul>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Corporate Finance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/corporate-finance/business-valuation-calculator" className="text-green-600 hover:text-green-800 underline">Business Valuation Calculator</RouterLink>
                  <RouterLink to="/corporate-finance/capital-structure-analyzer" className="text-green-600 hover:text-green-800 underline">Capital Structure Analyzer</RouterLink>
                  <RouterLink to="/corporate-finance/working-capital-optimizer" className="text-green-600 hover:text-green-800 underline">Working Capital Optimizer</RouterLink>
                  <RouterLink to="/corporate-finance/break-even-calculator" className="text-green-600 hover:text-green-800 underline">Break-Even Point Calculator</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanAmortizationGenerator;
