import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Car, Home, DollarSign, BarChart3, AlertCircle, CheckCircle, Zap, Info, Star, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface InsuranceAnalysis {
  lifeInsurance: {
    required: number;
    current: number;
    shortfall: number;
    monthlyPremium: number;
    recommendations: string[];
  };
  healthInsurance: {
    required: number;
    current: number;
    shortfall: number;
    monthlyPremium: number;
    recommendations: string[];
  };
  motorInsurance: {
    required: boolean;
    current: boolean;
    monthlyPremium: number;
    recommendations: string[];
  };
  homeInsurance: {
    required: boolean;
    current: boolean;
    monthlyPremium: number;
    recommendations: string[];
  };
  totalMonthlyPremium: number;
  overallRecommendations: string[];
  insuranceScore: {
    score: number;
    level: 'excellent' | 'good' | 'fair' | 'poor';
    description: string;
  };
}

const InsuranceCalculator: React.FC = () => {
  const [age, setAge] = useState(30);
  const [income, setIncome] = useState(1000000);
  const [dependents, setDependents] = useState(2);
  const [currentLifeInsurance, setCurrentLifeInsurance] = useState(0);
  const [currentHealthInsurance, setCurrentHealthInsurance] = useState(0);
  const [hasMotorInsurance, setHasMotorInsurance] = useState(false);
  const [hasHomeInsurance, setHasHomeInsurance] = useState(false);
  const [analysis, setAnalysis] = useState<InsuranceAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateInsurance = () => {
    if (income <= 0 || age <= 0) {
      alert('Please enter valid income and age');
      return;
    }

    // Life Insurance Calculation (10-15x annual income)
    const requiredLifeInsurance = income * 12;
    const lifeInsuranceShortfall = Math.max(0, requiredLifeInsurance - currentLifeInsurance);
    const lifeInsurancePremium = lifeInsuranceShortfall * 0.01 / 12; // 1% of sum assured annually

    // Health Insurance Calculation (₹5-10 lakhs for family)
    const requiredHealthInsurance = dependents > 1 ? 1000000 : 500000;
    const healthInsuranceShortfall = Math.max(0, requiredHealthInsurance - currentHealthInsurance);
    const healthInsurancePremium = healthInsuranceShortfall * 0.02 / 12; // 2% of sum assured annually

    // Motor Insurance (if applicable)
    const motorInsurancePremium = hasMotorInsurance ? 0 : 2000; // ₹2000/month if not covered

    // Home Insurance (if applicable)
    const homeInsurancePremium = hasHomeInsurance ? 0 : 1500; // ₹1500/month if not covered

    const totalMonthlyPremium = lifeInsurancePremium + healthInsurancePremium + motorInsurancePremium + homeInsurancePremium;

    // Generate recommendations
    const lifeInsuranceRecommendations: string[] = [];
    if (lifeInsuranceShortfall > 0) {
      lifeInsuranceRecommendations.push(`You need ₹${lifeInsuranceShortfall.toLocaleString()} more life insurance coverage.`);
    }
    if (currentLifeInsurance === 0) {
      lifeInsuranceRecommendations.push("Consider term life insurance for maximum coverage at minimum cost.");
    }
    if (age > 40 && currentLifeInsurance < income * 8) {
      lifeInsuranceRecommendations.push("As you age, consider increasing your life insurance coverage.");
    }

    const healthInsuranceRecommendations: string[] = [];
    if (healthInsuranceShortfall > 0) {
      healthInsuranceRecommendations.push(`You need ₹${healthInsuranceShortfall.toLocaleString()} more health insurance coverage.`);
    }
    if (currentHealthInsurance === 0) {
      healthInsuranceRecommendations.push("Health insurance is essential for financial protection against medical emergencies.");
    }
    if (age > 50 && currentHealthInsurance < 1000000) {
      healthInsuranceRecommendations.push("Consider increasing health insurance coverage as medical costs rise with age.");
    }

    const motorInsuranceRecommendations: string[] = [];
    if (!hasMotorInsurance) {
      motorInsuranceRecommendations.push("Motor insurance is mandatory in India. Get comprehensive coverage for your vehicle.");
    }

    const homeInsuranceRecommendations: string[] = [];
    if (!hasHomeInsurance) {
      homeInsuranceRecommendations.push("Home insurance protects your property against natural disasters and theft.");
    }

    // Overall recommendations
    const overallRecommendations: string[] = [];
    
    if (totalMonthlyPremium > income * 0.1) {
      overallRecommendations.push("Your insurance premiums are high relative to income. Consider optimizing your coverage.");
    }
    
    if (lifeInsuranceShortfall > 0 && healthInsuranceShortfall > 0) {
      overallRecommendations.push("Prioritize life and health insurance as they provide essential financial protection.");
    }
    
    if (age < 30 && totalMonthlyPremium < income * 0.05) {
      overallRecommendations.push("You're young and healthy - this is the best time to get comprehensive insurance at low premiums.");
    }

    // Calculate insurance score
    let score = 0;
    let level: 'excellent' | 'good' | 'fair' | 'poor' = 'poor';
    let description = '';

    if (lifeInsuranceShortfall === 0) score += 30;
    if (healthInsuranceShortfall === 0) score += 30;
    if (hasMotorInsurance) score += 20;
    if (hasHomeInsurance) score += 20;

    if (score >= 80) {
      level = 'excellent';
      description = 'Excellent insurance coverage with comprehensive protection';
    } else if (score >= 60) {
      level = 'good';
      description = 'Good insurance coverage with room for minor improvements';
    } else if (score >= 40) {
      level = 'fair';
      description = 'Fair insurance coverage with several gaps to address';
    } else {
      level = 'poor';
      description = 'Poor insurance coverage requiring immediate attention';
    }

    setAnalysis({
      lifeInsurance: {
        required: requiredLifeInsurance,
        current: currentLifeInsurance,
        shortfall: lifeInsuranceShortfall,
        monthlyPremium: lifeInsurancePremium,
        recommendations: lifeInsuranceRecommendations
      },
      healthInsurance: {
        required: requiredHealthInsurance,
        current: currentHealthInsurance,
        shortfall: healthInsuranceShortfall,
        monthlyPremium: healthInsurancePremium,
        recommendations: healthInsuranceRecommendations
      },
      motorInsurance: {
        required: true,
        current: hasMotorInsurance,
        monthlyPremium: motorInsurancePremium,
        recommendations: motorInsuranceRecommendations
      },
      homeInsurance: {
        required: true,
        current: hasHomeInsurance,
        monthlyPremium: homeInsurancePremium,
        recommendations: homeInsuranceRecommendations
      },
      totalMonthlyPremium,
      overallRecommendations,
      insuranceScore: {
        score,
        level,
        description
      }
    });
    
    setShowResults(true);
  };

  const getScoreColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreIcon = (level: string) => {
    switch (level) {
      case 'excellent': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'good': return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'fair': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'poor': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const resetCalculator = () => {
    setAge(30);
    setIncome(1000000);
    setDependents(2);
    setCurrentLifeInsurance(0);
    setCurrentHealthInsurance(0);
    setHasMotorInsurance(false);
    setHasHomeInsurance(false);
    setAnalysis(null);
    setShowResults(false);
  };

  return (
    <>
      <SEOHelmet
        title="Free Insurance Calculator - Calculate Your Insurance Needs | MoneyCal India"
        description="Calculate your insurance needs including life, health, motor, and home insurance. Get personalized recommendations and coverage analysis for comprehensive financial protection."
        keywords="insurance Calculator, life insurance, health insurance, motor insurance, home insurance, insurance planning, financial protection, insurance coverage"
        url="/tools/insurance-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Insurance Calculator",
          "description": "Calculate insurance needs and get personalized coverage recommendations",
          "url": "/tools/insurance-calculator",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser"
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  Insurance Calculator
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate your insurance needs and get personalized recommendations for life, health, motor, 
                and home insurance coverage to protect your financial future.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-blue-600" />
                Insurance Assessment
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="18"
                      max="80"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income (₹)</label>
                    <input
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter annual income"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Dependents</label>
                  <input
                    type="number"
                    value={dependents}
                    onChange={(e) => setDependents(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="10"
                  />
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Insurance Coverage</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Life Insurance (₹)</label>
                      <input
                        type="number"
                        value={currentLifeInsurance}
                        onChange={(e) => setCurrentLifeInsurance(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter current life insurance coverage"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Health Insurance (₹)</label>
                      <input
                        type="number"
                        value={currentHealthInsurance}
                        onChange={(e) => setCurrentHealthInsurance(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter current health insurance coverage"
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={hasMotorInsurance}
                          onChange={(e) => setHasMotorInsurance(e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">Have Motor Insurance</span>
                      </label>
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={hasHomeInsurance}
                          onChange={(e) => setHasHomeInsurance(e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">Have Home Insurance</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={calculateInsurance}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <IndianRupee className="w-5 h-5 mr-2" />
                  Calculate Insurance Needs
                </button>
                <button
                  onClick={resetCalculator}
                  className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
                >
                  Reset
                </button>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {showResults && analysis && (
                <>
                  {/* Insurance Score */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Star className="w-6 h-6 mr-3 text-blue-600" />
                      Insurance Score
                    </h3>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-4">
                        {getScoreIcon(analysis.insuranceScore.level)}
                        <span className={`ml-3 px-4 py-2 rounded-full text-lg font-semibold ${getScoreColor(analysis.insuranceScore.level)}`}>
                          {analysis.insuranceScore.level.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-4xl font-bold text-gray-900 mb-2">{analysis.insuranceScore.score}/100</p>
                      <p className="text-gray-600">{analysis.insuranceScore.description}</p>
                    </div>
                  </div>

                  {/* Insurance Coverage Analysis */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
                      Coverage Analysis
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Life Insurance */}
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Heart className="w-5 h-5 text-red-600 mr-3" />
                            <h4 className="font-semibold text-gray-900">Life Insurance</h4>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            analysis.lifeInsurance.shortfall === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {analysis.lifeInsurance.shortfall === 0 ? 'Adequate' : 'Insufficient'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Required</p>
                            <p className="font-semibold text-gray-900">₹{analysis.lifeInsurance.required.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Current</p>
                            <p className="font-semibold text-gray-900">₹{analysis.lifeInsurance.current.toLocaleString()}</p>
                          </div>
                        </div>
                        {analysis.lifeInsurance.shortfall > 0 && (
                          <p className="text-sm text-red-600 mt-2">
                            Shortfall: ₹{analysis.lifeInsurance.shortfall.toLocaleString()}
                          </p>
                        )}
                      </div>

                      {/* Health Insurance */}
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Shield className="w-5 h-5 text-blue-600 mr-3" />
                            <h4 className="font-semibold text-gray-900">Health Insurance</h4>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            analysis.healthInsurance.shortfall === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {analysis.healthInsurance.shortfall === 0 ? 'Adequate' : 'Insufficient'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Required</p>
                            <p className="font-semibold text-gray-900">₹{analysis.healthInsurance.required.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Current</p>
                            <p className="font-semibold text-gray-900">₹{analysis.healthInsurance.current.toLocaleString()}</p>
                          </div>
                        </div>
                        {analysis.healthInsurance.shortfall > 0 && (
                          <p className="text-sm text-red-600 mt-2">
                            Shortfall: ₹{analysis.healthInsurance.shortfall.toLocaleString()}
                          </p>
                        )}
                      </div>

                      {/* Motor Insurance */}
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Car className="w-5 h-5 text-green-600 mr-3" />
                            <h4 className="font-semibold text-gray-900">Motor Insurance</h4>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            analysis.motorInsurance.current ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {analysis.motorInsurance.current ? 'Covered' : 'Not Covered'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Mandatory for all vehicles in India</p>
                      </div>

                      {/* Home Insurance */}
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Home className="w-5 h-5 text-purple-600 mr-3" />
                            <h4 className="font-semibold text-gray-900">Home Insurance</h4>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            analysis.homeInsurance.current ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {analysis.homeInsurance.current ? 'Covered' : 'Not Covered'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Protects against natural disasters and theft</p>
                      </div>
                    </div>
                  </div>

                  {/* Premium Summary */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <DollarSign className="w-6 h-6 mr-3 text-blue-600" />
                      Premium Summary
                    </h3>
                    
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-600 mb-2">
                        ₹{analysis.totalMonthlyPremium.toLocaleString()}/month
                      </p>
                      <p className="text-gray-600">Estimated total monthly premium</p>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Zap className="w-6 h-6 mr-3 text-blue-600" />
                      Personalized Recommendations
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.overallRecommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">{recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {!showResults && (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Assess Your Insurance Needs?</h3>
                  <p className="text-gray-600">
                    Enter your details to get a comprehensive insurance analysis and personalized recommendations for financial protection.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Educational Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Insurance Planning Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Life Insurance</h3>
                <p className="text-gray-600 mb-4">
                  Life insurance provides financial security to your dependents in case of your untimely death.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Coverage should be 10-15x annual income</li>
                  <li>• Term insurance offers maximum coverage</li>
                  <li>• Consider inflation in coverage amount</li>
                  <li>• Review coverage as income grows</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Insurance</h3>
                <p className="text-gray-600 mb-4">
                  Health insurance protects against high medical costs and provides access to quality healthcare.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Minimum ₹5-10 lakhs coverage</li>
                  <li>• Family floater plans are cost-effective</li>
                  <li>• Consider top-up plans for higher coverage</li>
                  <li>• Check network hospitals</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Insurance</h3>
                <p className="text-gray-600 mb-4">
                  Motor and home insurance protect your valuable assets against various risks and damages.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Motor insurance is mandatory</li>
                  <li>• Comprehensive coverage recommended</li>
                  <li>• Home insurance covers natural disasters</li>
                  <li>• Regular policy reviews important</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default InsuranceCalculator;
