import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import { ArrowLeft, Calculator, TrendingUp, DollarSign, Calendar, Target } from 'lucide-react';

interface PrepaymentScenario {
  type: 'monthly' | 'lumpsum';
  amount: number;
  startMonth?: number;
  frequency?: number;
}

const PrepaymentCalculator: React.FC = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [originalEMI, setOriginalEMI] = useState<number>(0);
  const [originalTotalInterest, setOriginalTotalInterest] = useState<number>(0);
  
  // Prepayment scenarios
  const [monthlyExtra, setMonthlyExtra] = useState<number>(5000);
  const [lumpsumAmount, setLumpsumAmount] = useState<number>(100000);
  const [lumpsumMonth, setLumpsumMonth] = useState<number>(12);
  
  // Results
  const [newEMI, setNewEMI] = useState<number>(0);
  const [newTenure, setNewTenure] = useState<number>(0);
  const [newTotalInterest, setNewTotalInterest] = useState<number>(0);
  const [interestSaved, setInterestSaved] = useState<number>(0);
  const [timeSaved, setTimeSaved] = useState<number>(0);

  const calculateOriginalEMI = () => {
    const principal = loanAmount;
    const annualRate = interestRate;
    const monthlyRate = annualRate / 12 / 100;
    const tenureMonths = loanTenure * 12;

    if (monthlyRate === 0) {
      const calculatedEMI = principal / tenureMonths;
      setOriginalEMI(calculatedEMI);
      setOriginalTotalInterest(0);
      return;
    }

    const calculatedEMI = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                         (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    
    setOriginalEMI(calculatedEMI);
    setOriginalTotalInterest(calculatedEMI * tenureMonths - principal);
  };

  const calculatePrepaymentImpact = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const originalTenureMonths = loanTenure * 12;
    
    // Simulate loan with monthly extra payment
    let balance = principal;
    let totalInterestPaid = 0;
    let month = 0;
    
    while (balance > 0 && month < originalTenureMonths) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = originalEMI - interestPayment;
      const extraPayment = monthlyExtra;
      
      totalInterestPaid += interestPayment;
      balance = Math.max(0, balance - principalPayment - extraPayment);
      month++;
      
      if (balance <= 0) break;
    }
    
    setNewTenure(month);
    setNewTotalInterest(totalInterestPaid);
    setInterestSaved(originalTotalInterest - totalInterestPaid);
    setTimeSaved(originalTenureMonths - month);
    
    // Calculate new EMI (keeping same tenure)
    if (month < originalTenureMonths) {
      const newEMICalculation = (principal * monthlyRate * Math.pow(1 + monthlyRate, originalTenureMonths)) / 
                               (Math.pow(1 + monthlyRate, originalTenureMonths) - 1);
      setNewEMI(newEMICalculation - monthlyExtra);
    } else {
      setNewEMI(originalEMI);
    }
  };

  useEffect(() => {
    calculateOriginalEMI();
  }, [loanAmount, interestRate, loanTenure]);

  useEffect(() => {
    if (originalEMI > 0) {
      calculatePrepaymentImpact();
    }
  }, [originalEMI, monthlyExtra, lumpsumAmount, lumpsumMonth]);

  return (
    <>
      <SEOHelmet
        title="Prepayment Calculator - Extra Payment Impact Calculator | MoneyCal.in"
        description="Calculate the impact of extra payments and prepayments on your loan. See how much interest and time you can save with additional payments."
        keywords={['prepayment calculator', 'extra payment calculator', 'loan prepayment', 'early loan payoff', 'loan savings calculator']}
        url="https://moneycal.in/loan-tools/prepayment-calculator"
        image="https://moneycal.in/images/prepayment-calculator.jpg"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
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
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Prepayment Calculator</h1>
                <p className="text-gray-600">Calculate the impact of extra payments and prepayments</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Basic Loan Details */}
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter loan amount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate (% p.a.)
                    </label>
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter interest rate"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Tenure (Years)
                    </label>
                    <input
                      type="number"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter loan tenure"
                    />
                  </div>
                </div>
              </div>

              {/* Prepayment Options */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Prepayment Options</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Extra Payment (₹)
                    </label>
                    <input
                      type="number"
                      value={monthlyExtra}
                      onChange={(e) => setMonthlyExtra(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter monthly extra payment"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Additional amount to pay every month along with EMI
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lumpsum Prepayment (₹)
                    </label>
                    <input
                      type="number"
                      value={lumpsumAmount}
                      onChange={(e) => setLumpsumAmount(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter lumpsum amount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lumpsum Payment Month
                    </label>
                    <input
                      type="number"
                      value={lumpsumMonth}
                      onChange={(e) => setLumpsumMonth(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter month number"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Month when you plan to make the lumpsum payment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Original Loan Summary */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Original Loan</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Monthly EMI:</span>
                    <span className="font-semibold">₹{originalEMI.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Total Interest:</span>
                    <span className="font-semibold">₹{originalTotalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Loan Tenure:</span>
                    <span className="font-semibold">{loanTenure} years</span>
                  </div>
                </div>
              </div>

              {/* With Prepayment Results */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">With Prepayment</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">New EMI:</span>
                    <span className="font-semibold text-green-600">₹{newEMI.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Total Interest:</span>
                    <span className="font-semibold text-green-600">₹{newTotalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">New Tenure:</span>
                    <span className="font-semibold text-green-600">{Math.ceil(newTenure / 12)} years {newTenure % 12} months</span>
                  </div>
                </div>
              </div>

              {/* Savings Summary */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Savings</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm text-gray-600">Interest Saved</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{interestSaved.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-100 rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm text-gray-600">Time Saved</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.ceil(timeSaved / 12)} years {timeSaved % 12} months
                    </p>
                  </div>
                </div>
              </div>

              {/* Prepayment Strategy Tips */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Prepayment Strategy Tips</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Pay extra towards principal to reduce interest burden</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Consider prepayment penalties before making large payments</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Compare prepayment benefits with investment returns</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Start prepayment early in the loan tenure for maximum benefit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrepaymentCalculator;
