import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const EMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(9);
  const [tenure, setTenure] = useState(5);
  
  const calculateEMI = () => {
    const P = loanAmount;
    const R = interestRate / 12 / 100;
    const N = tenure * 12;
    const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;
    return { emi: Math.round(emi), totalAmount: Math.round(totalAmount), totalInterest: Math.round(totalInterest) };
  };

  const result = calculateEMI();

  return (
    <LearnLayout
      category="vehicle-loans"
      currentLesson="emi-calculator"
      breadcrumb={['Learn', 'Vehicle Loans', 'Car Loan EMI Calculator']}
    >
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Car Loan EMI Calculator | कार EMI कैलकुलेटर</h1>
        <p className="text-red-100 text-lg">Calculate monthly EMI, total interest, and payment schedule</p>
      </div>

      <section className="mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Car Loan EMI | अपना EMI कैलकुलेट करें</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Loan Amount | लोन राशि: ₹{loanAmount.toLocaleString('en-IN')}
              </label>
              <input type="range" min="100000" max="2000000" step="50000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>₹1L</span>
                <span>₹20L</span>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Interest Rate | ब्याज दर: {interestRate}% p.a.
              </label>
              <input type="range" min="7" max="15" step="0.5" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>7%</span>
                <span>15%</span>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Loan Tenure | अवधि: {tenure} years
              </label>
              <input type="range" min="1" max="7" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>1 year</span>
                <span>7 years</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-gray-600 mb-2">Monthly EMI</div>
              <div className="text-3xl font-bold text-blue-600">₹{result.emi.toLocaleString('en-IN')}</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-gray-600 mb-2">Total Interest</div>
              <div className="text-3xl font-bold text-red-600">₹{result.totalInterest.toLocaleString('en-IN')}</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-gray-600 mb-2">Total Payment</div>
              <div className="text-3xl font-bold text-green-600">₹{result.totalAmount.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">EMI Formula | EMI सूत्र</h2>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-lg text-gray-700 mb-4"><strong>EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]</strong></p>
          <ul className="space-y-2 text-gray-700">
            <li><strong>P</strong> = Principal loan amount (मूल ऋण राशि)</li>
            <li><strong>R</strong> = Monthly interest rate (ब्याज दर / 12 / 100)</li>
            <li><strong>N</strong> = Loan tenure in months (महीनों में अवधि)</li>
          </ul>
        </div>
      </section>

      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/vehicle-loans/prepayment-guide" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Next: Prepayment Guide</div>
            <div className="text-sm text-red-100">Save on interest</div>
          </Link>
          <Link to="/learn/vehicle-loans/balance-transfer" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Balance Transfer</div>
            <div className="text-sm text-red-100">Switch to lower rates</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default EMICalculator;

