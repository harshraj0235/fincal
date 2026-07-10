import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IndianRupee, TrendingUp } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const EMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenure, setTenure] = useState(10);
  const [moratorium, setMoratorium] = useState(5);
  
  const calculateEMI = () => {
    const P = loanAmount;
    const R = interestRate / 12 / 100;
    const N = tenure * 12;
    
    // Simple interest during moratorium
    const simpleInterest = (P * (interestRate / 100) * (moratorium / 12));
    const newPrincipal = P + simpleInterest;
    
    // EMI calculation
    const emi = newPrincipal * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;
    
    return { 
      emi: Math.round(emi), 
      totalAmount: Math.round(totalAmount), 
      totalInterest: Math.round(totalInterest),
      simpleInterest: Math.round(simpleInterest),
      newPrincipal: Math.round(newPrincipal)
    };
  };

  const result = calculateEMI();

  return (
    <LearnLayout
      category="education-loans"
      currentLesson="emi-calculator"
      breadcrumb={['Learn', 'Education Loans', 'Education Loan EMI Calculator']}
    >
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Education Loan EMI Calculator | एजुकेशन लोन EMI कैलकुलेटर</h1>
        <p className="text-red-100 text-lg">Calculate monthly EMI with moratorium period included | मोहलत अवधि सहित</p>
      </div>

      <section className="mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Education Loan EMI | EMI कैलकुलेट करें</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Loan Amount | लोन राशि: ₹{loanAmount.toLocaleString('en-IN')}
              </label>
              <input type="range" min="100000" max="15000000" step="100000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>₹1L</span>
                <span>₹1.5Cr</span>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Interest Rate | ब्याज दर: {interestRate}% p.a.
              </label>
              <input type="range" min="8" max="14" step="0.5" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>8%</span>
                <span>14%</span>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Moratorium Period | मोहलत अवधि: {moratorium} years
              </label>
              <input type="range" min="2" max="10" step="1" value={moratorium} onChange={(e) => setMoratorium(Number(e.target.value))} className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>2 years</span>
                <span>10 years</span>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Repayment Period | रीपेमेंट अवधि: {tenure} years
              </label>
              <input type="range" min="5" max="15" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>5 years</span>
                <span>15 years</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-gray-600 mb-2">During Moratorium</div>
              <div className="text-lg text-gray-700 mb-1">Simple Interest Accrued:</div>
              <div className="text-2xl font-bold text-orange-600">₹{result.simpleInterest.toLocaleString('en-IN')}</div>
              <div className="text-sm text-gray-600 mt-2">New Principal: ₹{result.newPrincipal.toLocaleString('en-IN')}</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-gray-600 mb-2">After Moratorium</div>
              <div className="text-lg text-gray-700 mb-1">Monthly EMI:</div>
              <div className="text-3xl font-bold text-blue-600">₹{result.emi.toLocaleString('en-IN')}</div>
              <div className="text-sm text-gray-600 mt-2">For {tenure} years</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-gray-600 mb-2">Total Interest</div>
              <div className="text-3xl font-bold text-red-600">₹{result.totalInterest.toLocaleString('en-IN')}</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-gray-600 mb-2">Total Payment</div>
              <div className="text-3xl font-bold text-green-600">₹{result.totalAmount.toLocaleString('en-IN')}</div>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              <strong>💡 Note:</strong> Interest during moratorium is calculated as simple interest and added to principal. 
              EMI starts after moratorium ends. Tax benefit of ₹50,000/year under Section 80E can reduce effective cost!
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">EMI Formula | EMI सूत्र</h2>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-lg text-gray-700 mb-4"><strong>EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]</strong></p>
          <ul className="space-y-2 text-gray-700">
            <li><strong>P</strong> = Principal amount (after moratorium interest added)</li>
            <li><strong>R</strong> = Monthly interest rate</li>
            <li><strong>N</strong> = Tenure in months</li>
            <li><strong>Moratorium:</strong> Simple interest accrues during course period</li>
          </ul>
        </div>
      </section>

      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Explore More | और जानें</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/education-loans/repayment-moratorium" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Repayment & Moratorium Guide</div>
            <div className="text-sm text-red-100">Detailed repayment strategy</div>
          </Link>
          <Link to="/learn/education-loans/tax-benefits" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Tax Benefits Section 80E</div>
            <div className="text-sm text-red-100">Save ₹50,000/year on taxes</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default EMICalculator;

