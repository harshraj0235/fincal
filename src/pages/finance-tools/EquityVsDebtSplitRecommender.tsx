import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  ArrowLeft, 
  Activity,
  PieChart,
  Shield
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface RiskProfile {
  id: string;
  name: string;
  description: string;
  equityRange: [number, number];
  debtRange: [number, number];
  color: string;
}

const EquityVsDebtSplitRecommender: React.FC = () => {
  const [age, setAge] = useState(30);
  const [riskProfile, setRiskProfile] = useState('moderate');
  const [investmentHorizon, setInvestmentHorizon] = useState(10);
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [existingInvestments, setExistingInvestments] = useState(100000);

  const riskProfiles: RiskProfile[] = [
    {
      id: 'conservative',
      name: 'Conservative',
      description: 'Low risk tolerance, prefer stable returns',
      equityRange: [20, 40],
      debtRange: [60, 80],
      color: '#10B981'
    },
    {
      id: 'moderate',
      name: 'Moderate',
      description: 'Balanced approach with moderate risk',
      equityRange: [40, 60],
      debtRange: [40, 60],
      color: '#3B82F6'
    },
    {
      id: 'aggressive',
      name: 'Aggressive',
      description: 'High risk tolerance, seek maximum growth',
      equityRange: [60, 80],
      debtRange: [20, 40],
      color: '#EF4444'
    }
  ];

  const calculateRecommendedAllocation = () => {
    const selectedProfile = riskProfiles.find(p => p.id === riskProfile);
    if (!selectedProfile) return null;

    // Age-based adjustment
    let ageEquity = 70;
    if (age < 30) ageEquity = 80;
    else if (age < 40) ageEquity = 70;
    else if (age < 50) ageEquity = 60;
    else if (age < 60) ageEquity = 40;
    else ageEquity = 20;

    // Calculate weighted allocation
    const ageWeight = 0.6;
    const riskWeight = 0.4;
    const riskEquity = (selectedProfile.equityRange[0] + selectedProfile.equityRange[1]) / 2;

    const recommendedEquity = Math.round(ageEquity * ageWeight + riskEquity * riskWeight);
    const recommendedDebt = 100 - recommendedEquity;

    // Calculate amounts
    const totalInvestment = existingInvestments + (monthlyIncome * 0.3 * investmentHorizon * 12);
    const equityAmount = (recommendedEquity / 100) * totalInvestment;
    const debtAmount = (recommendedDebt / 100) * totalInvestment;
    const expectedReturn = (recommendedEquity * 12 + recommendedDebt * 7) / 100;

    return {
      equity: recommendedEquity,
      debt: recommendedDebt,
      equityAmount,
      debtAmount,
      totalInvestment,
      expectedReturn,
      selectedProfile
    };
  };

  const result = calculateRecommendedAllocation();

  return (
    <>
      <SEOHelmet
        title="Equity vs Debt Split Recommender - Optimal Asset Allocation | MoneyCal"
        description="Get personalized recommendations for equity vs debt allocation based on your age, risk profile, and investment goals."
        keywords="equity vs debt allocation, asset allocation calculator, portfolio allocation, investment split"
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <section className="py-12 md:py-16 bg-gradient-to-br from-green-600 via-blue-600 to-green-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link to="/finance-tools" className="text-white hover:text-green-200 transition-colors text-sm md:text-base">
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Back to Finance Tools
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Equity vs Debt Split Recommender
              </h1>
              <p className="text-lg md:text-xl text-green-100 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
                Get personalized asset allocation recommendations
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-8 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 mr-3 text-green-600" />
                  Your Profile
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Risk Profile</label>
                    <div className="space-y-3">
                      {riskProfiles.map((profile) => (
                        <label key={profile.id} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="riskProfile"
                            value={profile.id}
                            checked={riskProfile === profile.id}
                            onChange={(e) => setRiskProfile(e.target.value)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500"
                          />
                          <div className="ml-3">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: profile.color }}></div>
                              <span className="font-medium text-sm md:text-base">{profile.name}</span>
                            </div>
                            <p className="text-xs md:text-sm text-gray-600">{profile.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Investment Horizon (Years)</label>
                      <input
                        type="number"
                        value={investmentHorizon}
                        onChange={(e) => setInvestmentHorizon(Number(e.target.value))}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
                      <input
                        type="number"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Existing Investments (₹)</label>
                    <input
                      type="number"
                      value={existingInvestments}
                      onChange={(e) => setExistingInvestments(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4 md:space-y-6"
              >
                {result ? (
                  <>
                    <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg md:text-xl font-bold">Recommended Allocation</h3>
                        <PieChart className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl font-bold mb-1 text-green-200">
                            {result.equity}%
                          </div>
                          <p className="text-green-100 text-sm">Equity</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl font-bold mb-1 text-blue-200">
                            {result.debt}%
                          </div>
                          <p className="text-blue-100 text-sm">Debt</p>
                        </div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span>Expected Return:</span>
                          <span className="font-bold">{result.expectedReturn.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center mb-3">
                          <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2" />
                          <h4 className="font-semibold text-gray-900 text-sm md:text-base">Equity Investment</h4>
                        </div>
                        <div className="text-lg md:text-2xl font-bold text-green-600 mb-1">
                          ₹{result.equityAmount.toLocaleString()}
                        </div>
                        <p className="text-xs md:text-sm text-gray-600">Recommended amount</p>
                      </div>

                      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center mb-3">
                          <Shield className="h-4 w-4 md:h-5 md:w-5 text-blue-600 mr-2" />
                          <h4 className="font-semibold text-gray-900 text-sm md:text-base">Debt Investment</h4>
                        </div>
                        <div className="text-lg md:text-2xl font-bold text-blue-600 mb-1">
                          ₹{result.debtAmount.toLocaleString()}
                        </div>
                        <p className="text-xs md:text-sm text-gray-600">Recommended amount</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                        <Activity className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-600" />
                        Profile Analysis
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">Risk Profile</div>
                            <div className="text-xs text-gray-500">{result.selectedProfile.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-sm text-green-600">
                              Equity: {result.selectedProfile.equityRange[0]}-{result.selectedProfile.equityRange[1]}%
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">Age-Based Allocation</div>
                            <div className="text-xs text-gray-500">{age} years old</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-sm text-blue-600">
                              Recommended: {result.equity}% Equity
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 text-center">
                    <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Enter Your Details</h3>
                    <p className="text-gray-600 text-sm">Fill in your profile information to get personalized allocation recommendations.</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Related Finance Tools</h2>
              <p className="text-base md:text-lg text-gray-600">Explore other tools to enhance your investment planning</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Link
                to="/finance-tools/portfolio-diversification-visualizer"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-green-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-3 md:mb-4">
                  <PieChart className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Portfolio Diversification Visualizer</h3>
                <p className="text-gray-600 text-xs md:text-sm">Visualize and optimize your portfolio diversification</p>
              </Link>

              <Link
                to="/finance-tools/sip-inflation-adjusted-calculator"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-green-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-3 md:mb-4">
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">SIP Inflation-Adjusted Calculator</h3>
                <p className="text-gray-600 text-xs md:text-sm">Calculate real returns adjusted for inflation impact</p>
              </Link>

              <Link
                to="/finance-tools/real-vs-nominal-return-calculator"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-green-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center mb-3 md:mb-4">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Real vs Nominal Return Calculator</h3>
                <p className="text-gray-600 text-xs md:text-sm">Calculate real returns adjusted for inflation</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EquityVsDebtSplitRecommender;