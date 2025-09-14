import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import { ArrowLeft, Calculator, TrendingUp, DollarSign, Calendar, Download } from 'lucide-react';

interface AmortizationEntry {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

const EMICalculator: React.FC = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [emi, setEmi] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationEntry[]>([]);

  const calculateEMI = () => {
    const principal = loanAmount;
    const annualRate = interestRate;
    const monthlyRate = annualRate / 12 / 100;
    const tenureMonths = loanTenure * 12;

    if (monthlyRate === 0) {
      const calculatedEMI = principal / tenureMonths;
      setEmi(calculatedEMI);
      setTotalPayment(principal);
      setTotalInterest(0);
      return;
    }

    const calculatedEMI = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                         (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    
    setEmi(calculatedEMI);
    setTotalPayment(calculatedEMI * tenureMonths);
    setTotalInterest(calculatedEMI * tenureMonths - principal);
  };

  const generateAmortizationSchedule = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const tenureMonths = loanTenure * 12;
    const monthlyEMI = emi;
    
    const schedule: AmortizationEntry[] = [];
    let balance = principal;

    for (let month = 1; month <= tenureMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyEMI - interestPayment;
      balance = Math.max(0, balance - principalPayment);

      schedule.push({
        month,
        emi: monthlyEMI,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
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
  }, [emi, loanAmount, interestRate, loanTenure]);

  const downloadSchedule = () => {
    const csvContent = [
      ['Month', 'EMI', 'Principal', 'Interest', 'Balance'],
      ...amortizationSchedule.map(entry => [
        entry.month,
        entry.emi.toFixed(2),
        entry.principal.toFixed(2),
        entry.interest.toFixed(2),
        entry.balance.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emi-amortization-schedule.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEOHelmet
        title="EMI Calculator (Reducing Balance) - Loan EMI Calculator | MoneyCal.in"
        description="Calculate EMI using standard reducing balance formula with detailed amortization schedule. Get accurate EMI calculations for home loans, personal loans, and more."
        keywords={['EMI calculator', 'reducing balance EMI', 'loan EMI', 'amortization schedule', 'home loan EMI', 'personal loan EMI']}
        url="https://moneycal.in/loan-tools/emi-calculator"
        image="https://moneycal.in/images/emi-calculator.jpg"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to Loan Tools</span>
            </button>
            
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">EMI Calculator (Reducing Balance)</h1>
                <p className="text-gray-600">Calculate EMI using standard formula with amortization schedule</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Loan Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter loan amount"
                  />
                  <div className="mt-2">
                    <input
                      type="range"
                      min="100000"
                      max="10000000"
                      step="50000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹1L</span>
                      <span>₹1Cr</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (% p.a.)
                  </label>
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter interest rate"
                    step="0.1"
                  />
                  <div className="mt-2">
                    <input
                      type="range"
                      min="5"
                      max="20"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5%</span>
                      <span>20%</span>
                    </div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter loan tenure"
                  />
                  <div className="mt-2">
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 Year</span>
                      <span>30 Years</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* EMI Result */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">EMI Calculation</h2>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    ₹{emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-gray-600">Monthly EMI</p>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Payment</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ₹{totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Interest</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formula Info */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Formula Used</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 font-mono">
                    EMI = [P × r × (1+r)^N] / [(1+r)^N − 1]
                  </p>
                  <div className="mt-2 text-xs text-gray-600">
                    <p>Where: P = Principal, r = Monthly Interest Rate, N = Number of Months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amortization Schedule */}
          {amortizationSchedule.length > 0 && (
            <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Amortization Schedule</h2>
                <button
                  onClick={downloadSchedule}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download CSV</span>
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2">Month</th>
                      <th className="text-right py-3 px-2">EMI</th>
                      <th className="text-right py-3 px-2">Principal</th>
                      <th className="text-right py-3 px-2">Interest</th>
                      <th className="text-right py-3 px-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amortizationSchedule.slice(0, 12).map((entry) => (
                      <tr key={entry.month} className="border-b border-gray-100">
                        <td className="py-3 px-2">{entry.month}</td>
                        <td className="py-3 px-2 text-right">₹{entry.emi.toFixed(2)}</td>
                        <td className="py-3 px-2 text-right">₹{entry.principal.toFixed(2)}</td>
                        <td className="py-3 px-2 text-right">₹{entry.interest.toFixed(2)}</td>
                        <td className="py-3 px-2 text-right">₹{entry.balance.toFixed(2)}</td>
                      </tr>
                    ))}
                    {amortizationSchedule.length > 12 && (
                      <tr>
                        <td colSpan={5} className="py-3 px-2 text-center text-gray-500">
                          ... and {amortizationSchedule.length - 12} more months
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EMICalculator;
