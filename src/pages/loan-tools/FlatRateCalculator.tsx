import React, { useState, useEffect } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { Calculator, TrendingUp, AlertTriangle, DollarSign, BarChart3 } from 'lucide-react';

const FlatRateCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [flatRate, setFlatRate] = useState<number>(12);
  const [loanTenure, setLoanTenure] = useState<number>(5);
  const [emi, setEmi] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [effectiveRate, setEffectiveRate] = useState<number>(0);

  const calculateFlatRateEMI = () => {
    const tenureMonths = loanTenure * 12;
    const totalInterestAmount = loanAmount * (flatRate / 100) * loanTenure;
    const totalRepayment = loanAmount + totalInterestAmount;
    const calculatedEMI = totalRepayment / tenureMonths;
    
    setEmi(calculatedEMI);
    setTotalPayment(totalRepayment);
    setTotalInterest(totalInterestAmount);
    
    // Calculate effective rate (approximate)
    const effectiveRateApprox = (2 * flatRate * loanTenure) / (loanTenure + 1);
    setEffectiveRate(effectiveRateApprox);
  };

  useEffect(() => {
    calculateFlatRateEMI();
  }, [loanAmount, flatRate, loanTenure]);

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
        title="Flat Rate Loan EMI Calculator - MoneyCal.in"
        description="Calculate EMI for flat rate loans. Compare flat rate vs reducing balance method and understand the true cost of your loan."
        keywords="flat rate EMI calculator, flat rate loan, loan calculator, EMI comparison, reducing balance vs flat rate"
        url="/loan-tools/flat-rate-calculator"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="h-12 w-12 text-orange-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Flat Rate EMI Calculator</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate EMI for flat rate loans where interest is calculated on the original loan amount 
              throughout the entire tenure. Compare with reducing balance method.
            </p>
          </div>

          {/* Warning Alert */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h3>
                <p className="text-yellow-700">
                  Flat rate loans are generally more expensive than reducing balance loans. The interest is calculated 
                  on the full loan amount throughout the entire tenure, even as you pay down the principal.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 text-orange-600 mr-2" />
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    placeholder="Enter loan amount"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {formatCurrency(loanAmount)}
                  </div>
                </div>

                {/* Flat Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Flat Interest Rate (% per annum)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={flatRate}
                    onChange={(e) => setFlatRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    placeholder="Enter flat interest rate"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {flatRate}% per annum (flat rate)
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
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
                <TrendingUp className="h-6 w-6 text-orange-600 mr-2" />
                Flat Rate EMI Results
              </h2>
              
              <div className="space-y-6">
                {/* EMI Amount */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Monthly EMI</p>
                      <p className="text-3xl font-bold">{formatCurrency(emi)}</p>
                    </div>
                    <BarChart3 className="h-12 w-12 text-orange-200" />
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

                {/* Effective Rate */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                    <p className="text-sm font-medium text-gray-700">Effective Interest Rate</p>
                  </div>
                  <div className="text-2xl font-bold text-red-600">
                    {effectiveRate.toFixed(2)}%
                  </div>
                  <p className="text-sm text-gray-600">
                    This is approximately the equivalent reducing balance rate
                  </p>
                </div>

                {/* Interest to Principal Ratio */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <BarChart3 className="h-5 w-5 text-orange-600 mr-2" />
                    <p className="text-sm font-medium text-gray-700">Interest to Principal Ratio</p>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {loanAmount > 0 ? ((totalInterest / loanAmount) * 100).toFixed(1) : 0}%
                  </div>
                  <p className="text-sm text-gray-600">
                    You pay {formatCurrency(totalInterest)} in interest for {formatCurrency(loanAmount)} principal
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
              Flat Rate vs Reducing Balance Comparison
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Flat Rate Details */}
              <div className="bg-orange-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-orange-800 mb-4">Flat Rate Method</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Calculation:</span>
                    <span className="font-semibold">On full loan amount</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly EMI:</span>
                    <span className="font-semibold">{formatCurrency(emi)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest:</span>
                    <span className="font-semibold text-red-600">{formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Payment:</span>
                    <span className="font-semibold">{formatCurrency(totalPayment)}</span>
                  </div>
                </div>
              </div>

              {/* Reducing Balance Details */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Reducing Balance Method</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Calculation:</span>
                    <span className="font-semibold">On outstanding balance</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly EMI:</span>
                    <span className="font-semibold text-blue-600">Lower than flat rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest:</span>
                    <span className="font-semibold text-green-600">Significantly lower</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Payment:</span>
                    <span className="font-semibold text-green-600">Lower overall cost</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Flat Rate Characteristics</h3>
                <p className="text-sm text-gray-600">
                  Interest is calculated on the original loan amount throughout the entire tenure, 
                  regardless of how much principal you've paid.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Higher Cost</h3>
                <p className="text-sm text-gray-600">
                  Flat rate loans typically cost 1.5-2 times more than equivalent reducing balance loans 
                  due to the interest calculation method.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Common Usage</h3>
                <p className="text-sm text-gray-600">
                  Often used by microfinance institutions, small personal loan providers, 
                  and some informal lenders.
                </p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommendations</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">1</div>
                <p className="text-gray-700">
                  <strong>Always compare:</strong> If you have the option, choose reducing balance loans over flat rate loans.
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">2</div>
                <p className="text-gray-700">
                  <strong>Calculate effective rate:</strong> Use the effective rate to compare with other loan offers.
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">3</div>
                <p className="text-gray-700">
                  <strong>Consider prepayment:</strong> If possible, make prepayments to reduce the overall interest burden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlatRateCalculator;