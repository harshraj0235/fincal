import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import { ArrowLeft, Calculator, TrendingUp, DollarSign, AlertTriangle, BarChart3 } from 'lucide-react';

const FlatRateCalculator: React.FC = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [flatRate, setFlatRate] = useState<number>(12);
  const [loanTenure, setLoanTenure] = useState<number>(5);
  const [flatEMI, setFlatEMI] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [effectiveRate, setEffectiveRate] = useState<number>(0);

  // For comparison with reducing balance
  const [reducingRate, setReducingRate] = useState<number>(8.5);
  const [reducingEMI, setReducingEMI] = useState<number>(0);
  const [reducingTotalInterest, setReducingTotalInterest] = useState<number>(0);

  const calculateFlatRateEMI = () => {
    const principal = loanAmount;
    const annualRate = flatRate;
    const tenureYears = loanTenure;
    
    // Flat rate calculation
    const totalInterestFlat = principal * (annualRate / 100) * tenureYears;
    const totalRepayment = principal + totalInterestFlat;
    const monthlyEMI = totalRepayment / (tenureYears * 12);
    
    setFlatEMI(monthlyEMI);
    setTotalPayment(totalRepayment);
    setTotalInterest(totalInterestFlat);
    
    // Calculate effective rate (approximate)
    const effectiveRateApprox = (2 * totalInterestFlat) / (principal * tenureYears) * 100;
    setEffectiveRate(effectiveRateApprox);
  };

  const calculateReducingBalanceEMI = () => {
    const principal = loanAmount;
    const annualRate = reducingRate;
    const monthlyRate = annualRate / 12 / 100;
    const tenureMonths = loanTenure * 12;

    if (monthlyRate === 0) {
      setReducingEMI(principal / tenureMonths);
      setReducingTotalInterest(0);
      return;
    }

    const monthlyEMI = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    
    setReducingEMI(monthlyEMI);
    setReducingTotalInterest(monthlyEMI * tenureMonths - principal);
  };

  useEffect(() => {
    calculateFlatRateEMI();
    calculateReducingBalanceEMI();
  }, [loanAmount, flatRate, loanTenure, reducingRate]);

  const savings = totalInterest - reducingTotalInterest;
  const percentageDifference = ((flatEMI - reducingEMI) / reducingEMI) * 100;

  return (
    <>
      <SEOHelmet
        title="Flat Rate Loan EMI Calculator - Compare Flat vs Reducing Balance | MoneyCal.in"
        description="Calculate EMI for flat rate loans and compare with reducing balance loans. Understand the true cost difference between flat rate and reducing balance interest calculations."
        keywords={['flat rate EMI calculator', 'flat rate vs reducing balance', 'loan interest comparison', 'flat rate loan', 'interest calculation']}
        url="https://moneycal.in/loan-tools/flat-rate-calculator"
        image="https://moneycal.in/images/flat-rate-calculator.jpg"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
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
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Flat Rate Loan EMI Calculator</h1>
                <p className="text-gray-600">Calculate EMI for flat rate loans and compare with reducing balance</p>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    Flat Interest Rate (% p.a.)
                  </label>
                  <input
                    type="number"
                    value={flatRate}
                    onChange={(e) => setFlatRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter flat interest rate"
                    step="0.1"
                  />
                  <div className="mt-2">
                    <input
                      type="range"
                      min="5"
                      max="25"
                      step="0.1"
                      value={flatRate}
                      onChange={(e) => setFlatRate(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5%</span>
                      <span>25%</span>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter loan tenure"
                  />
                  <div className="mt-2">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 Year</span>
                      <span>10 Years</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reducing Balance Rate for Comparison (% p.a.)
                  </label>
                  <input
                    type="number"
                    value={reducingRate}
                    onChange={(e) => setReducingRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter reducing balance rate"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Flat Rate Results */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Flat Rate Calculation</h2>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ₹{flatEMI.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-gray-600">Monthly EMI (Flat Rate)</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Payment</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Interest</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <p className="text-sm text-yellow-800">
                      <strong>Effective Rate:</strong> ~{effectiveRate.toFixed(2)}% p.a.
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparison Results */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Comparison with Reducing Balance</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Reducing Balance EMI:</span>
                    <span className="font-semibold">₹{reducingEMI.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Flat Rate EMI:</span>
                    <span className="font-semibold">₹{flatEMI.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Difference:</span>
                    <span className={`font-semibold ${percentageDifference > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {percentageDifference > 0 ? '+' : ''}{percentageDifference.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Interest Difference:</span>
                    <span className={`font-semibold ${savings > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {savings > 0 ? '+' : ''}₹{Math.abs(savings).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Formula Info */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Flat Rate Formula</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 font-mono">
                    Total Interest = Principal × Rate × Time
                  </p>
                  <p className="text-sm text-gray-700 font-mono mt-2">
                    EMI = (Principal + Total Interest) ÷ (Time × 12)
                  </p>
                  <div className="mt-2 text-xs text-gray-600">
                    <p>Flat rate applies interest on the full principal amount throughout the loan tenure.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Differences */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Differences: Flat Rate vs Reducing Balance</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-600">Flat Rate</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Interest calculated on full principal amount</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Higher effective interest rate</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Common in microfinance and small loans</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Fixed EMI throughout the tenure</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600">Reducing Balance</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Interest calculated on outstanding balance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Lower effective interest rate</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Standard for home loans and large loans</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Interest portion decreases over time</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlatRateCalculator;
