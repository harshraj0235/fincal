import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const EligibilityCalculator: React.FC = () => {
  const [income, setIncome] = useState(50000);
  const [emi, setEmi] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);

  const calculateEligibility = () => {
    const maxEMI = income * 0.5;
    const eligibleLoan = (maxEMI * 60 * 100) / (8.5 * 60 + 100);
    setEmi(Math.floor(maxEMI));
    setLoanAmount(Math.floor(eligibleLoan));
  };

  React.useEffect(() => {
    calculateEligibility();
  }, [income]);

  return (
    <LearnLayout
      category="vehicle-loans"
      currentLesson="eligibility-calculator"
      breadcrumb={['Learn', 'Vehicle Loans', 'Vehicle Loan Eligibility Calculator']}
    >
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <Calculator className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Vehicle Loan Eligibility Calculator | पात्रता कैलकुलेटर
            </h1>
            <p className="text-green-100 text-lg">Check how much car/bike loan you can get based on your monthly income</p>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Eligibility | अपनी पात्रता जांचें</h2>
          
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              Your Monthly Income | मासिक आय: ₹{income.toLocaleString('en-IN')}
            </label>
            <input
              type="range"
              min="15000"
              max="200000"
              step="5000"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>₹15,000</span>
              <span>₹2,00,000</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-gray-600 mb-2">Max Monthly EMI</div>
              <div className="text-3xl font-bold text-green-600">₹{emi.toLocaleString('en-IN')}</div>
              <div className="text-sm text-gray-500 mt-1">(50% of income)</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-gray-600 mb-2">Eligible Loan Amount</div>
              <div className="text-3xl font-bold text-blue-600">₹{loanAmount.toLocaleString('en-IN')}</div>
              <div className="text-sm text-gray-500 mt-1">@ 8.5% for 5 years</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-gray-600 mb-2">Car/Bike Value</div>
              <div className="text-3xl font-bold text-purple-600">₹{Math.floor(loanAmount / 0.85).toLocaleString('en-IN')}</div>
              <div className="text-sm text-gray-500 mt-1">(15% down payment)</div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a 
              href="/calculators/car-loan-calculator"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Detailed Car Loan Calculator | विस्तृत कैलकुलेटर
            </a>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Factors Affecting Eligibility | पात्रता को प्रभावित करने वाले कारक</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              Income & Obligations
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Higher income = higher loan eligibility</li>
              <li>• Banks allow 40-50% of income as EMI</li>
              <li>• Existing EMIs reduce new loan eligibility</li>
              <li>• Bonus, rent income can be considered</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
              CIBIL Score Impact
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>750+:</strong> Best rates, max eligibility</li>
              <li>• <strong>650-750:</strong> Moderate rates, approval likely</li>
              <li>• <strong>&lt;650:</strong> Higher rates, lower eligibility</li>
              <li>• No score: First-time borrowers accepted</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Apply? | आवेदन करने के लिए तैयार?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/vehicle-loans/documents-required" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Next: Documents Required</div>
            <div className="text-sm text-green-100">Check required documents</div>
          </Link>
          <Link to="/learn/vehicle-loans/interest-rates" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Interest Rates 2025</div>
            <div className="text-sm text-green-100">Compare all bank rates</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default EligibilityCalculator;

