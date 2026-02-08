import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, TrendingUp, AlertCircle, CheckCircle, Zap, Info, Star, Calculator, BarChart3, Target, DollarSign } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface CreditScoreAnalysis {
  currentScore: number;
  scoreRange: {
    min: number;
    max: number;
    level: 'excellent' | 'good' | 'fair' | 'poor';
    description: string;
  };
  factors: Array<{
    factor: string;
    impact: 'positive' | 'negative' | 'neutral';
    weight: number;
    description: string;
    recommendation: string;
  }>;
  improvementPlan: {
    timeline: string;
    targetScore: number;
    actions: string[];
    estimatedImprovement: number;
  };
  loanEligibility: {
    personalLoan: boolean;
    homeLoan: boolean;
    carLoan: boolean;
    creditCard: boolean;
    interestRates: {
      personalLoan: number;
      homeLoan: number;
      carLoan: number;
      creditCard: number;
    };
  };
  recommendations: string[];
  scoreHistory: Array<{
    month: string;
    score: number;
    change: number;
  }>;
}

const CreditScoreCalculator: React.FC = () => {
  const [currentScore, setCurrentScore] = useState(750);
  const [paymentHistory, setPaymentHistory] = useState('excellent');
  const [creditUtilization, setCreditUtilization] = useState(30);
  const [creditAge, setCreditAge] = useState(5);
  const [creditMix, setCreditMix] = useState('good');
  const [recentInquiries, setRecentInquiries] = useState(1);
  const [analysis, setAnalysis] = useState<CreditScoreAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateCreditScore = () => {
    if (currentScore < 300 || currentScore > 900) {
      alert('Please enter a valid credit score (300-900)');
      return;
    }

    // Determine score range and level
    let scoreRange = {
      min: 300,
      max: 900,
      level: 'poor' as const,
      description: ''
    };

    if (currentScore >= 750) {
      scoreRange = {
        min: 750,
        max: 900,
        level: 'excellent',
        description: 'Excellent credit score with best loan terms'
      };
    } else if (currentScore >= 700) {
      scoreRange = {
        min: 700,
        max: 749,
        level: 'good',
        description: 'Good credit score with favorable loan terms'
      };
    } else if (currentScore >= 650) {
      scoreRange = {
        min: 650,
        max: 699,
        level: 'fair',
        description: 'Fair credit score with moderate loan terms'
      };
    } else {
      scoreRange = {
        min: 300,
        max: 649,
        level: 'poor',
        description: 'Poor credit score with limited loan options'
      };
    }

    // Analyze factors affecting credit score
    const factors = [
      {
        factor: 'Payment History',
        impact: paymentHistory === 'excellent' ? 'positive' as const : paymentHistory === 'good' ? 'positive' as const : 'negative' as const,
        weight: 35,
        description: 'Timely payment of credit accounts',
        recommendation: paymentHistory === 'excellent' ? 'Keep up the excellent payment history' : 
                      paymentHistory === 'good' ? 'Continue making timely payments' : 
                      'Focus on making all payments on time'
      },
      {
        factor: 'Credit Utilization',
        impact: creditUtilization <= 30 ? 'positive' as const : creditUtilization <= 50 ? 'neutral' as const : 'negative' as const,
        weight: 30,
        description: 'Percentage of available credit being used',
        recommendation: creditUtilization <= 30 ? 'Maintain low credit utilization' : 
                      creditUtilization <= 50 ? 'Consider reducing credit utilization' : 
                      'Reduce credit utilization to below 30%'
      },
      {
        factor: 'Credit Age',
        impact: creditAge >= 7 ? 'positive' as const : creditAge >= 3 ? 'neutral' as const : 'negative' as const,
        weight: 15,
        description: 'Length of credit history',
        recommendation: creditAge >= 7 ? 'Maintain long credit history' : 
                      creditAge >= 3 ? 'Keep accounts open to build history' : 
                      'Avoid closing old accounts'
      },
      {
        factor: 'Credit Mix',
        impact: creditMix === 'excellent' ? 'positive' as const : creditMix === 'good' ? 'positive' as const : 'neutral' as const,
        weight: 10,
        description: 'Variety of credit accounts',
        recommendation: creditMix === 'excellent' ? 'Maintain diverse credit mix' : 
                      creditMix === 'good' ? 'Consider adding different credit types' : 
                      'Diversify your credit portfolio'
      },
      {
        factor: 'Recent Inquiries',
        impact: recentInquiries <= 2 ? 'positive' as const : recentInquiries <= 4 ? 'neutral' as const : 'negative' as const,
        weight: 10,
        description: 'Number of recent credit applications',
        recommendation: recentInquiries <= 2 ? 'Limit new credit applications' : 
                      recentInquiries <= 4 ? 'Avoid multiple applications' : 
                      'Stop applying for new credit'
      }
    ];

    // Generate improvement plan
    const targetScore = Math.min(800, currentScore + 50);
    const estimatedImprovement = targetScore - currentScore;
    
    const actions: string[] = [];
    if (paymentHistory !== 'excellent') {
      actions.push('Make all payments on time');
    }
    if (creditUtilization > 30) {
      actions.push('Reduce credit card balances');
    }
    if (creditAge < 5) {
      actions.push('Keep old accounts open');
    }
    if (recentInquiries > 2) {
      actions.push('Avoid new credit applications');
    }
    if (actions.length === 0) {
      actions.push('Maintain current good practices');
    }

    const improvementPlan = {
      timeline: '6-12 months',
      targetScore,
      actions,
      estimatedImprovement
    };

    // Loan eligibility based on credit score
    const loanEligibility = {
      personalLoan: currentScore >= 650,
      homeLoan: currentScore >= 700,
      carLoan: currentScore >= 650,
      creditCard: currentScore >= 600,
      interestRates: {
        personalLoan: currentScore >= 750 ? 10.5 : currentScore >= 700 ? 12.5 : currentScore >= 650 ? 15.5 : 18.5,
        homeLoan: currentScore >= 750 ? 8.5 : currentScore >= 700 ? 9.0 : currentScore >= 650 ? 9.5 : 10.5,
        carLoan: currentScore >= 750 ? 7.5 : currentScore >= 700 ? 8.0 : currentScore >= 650 ? 8.5 : 9.5,
        creditCard: currentScore >= 750 ? 18 : currentScore >= 700 ? 20 : currentScore >= 650 ? 22 : 24
      }
    };

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (currentScore < 650) {
      recommendations.push("Focus on improving your credit score before applying for major loans.");
    }
    
    if (creditUtilization > 50) {
      recommendations.push("Pay down credit card balances to reduce utilization ratio.");
    }
    
    if (paymentHistory === 'poor') {
      recommendations.push("Set up automatic payments to ensure timely bill payments.");
    }
    
    if (recentInquiries > 4) {
      recommendations.push("Avoid applying for new credit for at least 6 months.");
    }
    
    if (currentScore >= 750) {
      recommendations.push("Excellent score! You qualify for the best loan terms and interest rates.");
    }

    // Generate sample score history
    const scoreHistory = [
      { month: 'Jan 2024', score: Math.max(300, currentScore - 20), change: -5 },
      { month: 'Feb 2024', score: Math.max(300, currentScore - 15), change: 5 },
      { month: 'Mar 2024', score: Math.max(300, currentScore - 10), change: 5 },
      { month: 'Apr 2024', score: Math.max(300, currentScore - 5), change: 5 },
      { month: 'May 2024', score: currentScore, change: 5 }
    ];

    setAnalysis({
      currentScore,
      scoreRange,
      factors,
      improvementPlan,
      loanEligibility,
      recommendations,
      scoreHistory
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      case 'neutral': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const resetCalculator = () => {
    setCurrentScore(750);
    setPaymentHistory('excellent');
    setCreditUtilization(30);
    setCreditAge(5);
    setCreditMix('good');
    setRecentInquiries(1);
    setAnalysis(null);
    setShowResults(false);
  };

  return (
    <>
      <SEOHelmet
        title="Free Credit Score Calculator - Improve Your Credit Score | MoneyCal India"
        description="Calculate and improve your credit score with our comprehensive credit score calculator. Get personalized recommendations, loan eligibility analysis, and credit improvement strategies."
        keywords="credit score calculator, credit score improvement, credit score analysis, loan eligibility, credit score factors, credit monitoring, financial health"
        url="/tools/credit-score-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Credit Score Calculator",
          "description": "Calculate and improve your credit score with personalized recommendations",
          "url": "https://moneycal.in/tools/credit-score-calculator",
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
                  Credit Score Calculator
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Analyze your credit score and get personalized recommendations to improve it. 
                Understand loan eligibility, interest rates, and credit improvement strategies.
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
                <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
                Credit Score Analysis
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Credit Score</label>
                  <input
                    type="number"
                    value={currentScore}
                    onChange={(e) => setCurrentScore(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="300"
                    max="900"
                    placeholder="Enter your credit score"
                  />
                  <p className="text-sm text-gray-500 mt-1">Credit score range: 300-900</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment History</label>
                  <select
                    value={paymentHistory}
                    onChange={(e) => setPaymentHistory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="excellent">Excellent (No late payments)</option>
                    <option value="good">Good (1-2 late payments)</option>
                    <option value="fair">Fair (3-5 late payments)</option>
                    <option value="poor">Poor (Multiple late payments)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credit Utilization (%)</label>
                  <input
                    type="number"
                    value={creditUtilization}
                    onChange={(e) => setCreditUtilization(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="100"
                    placeholder="Percentage of credit used"
                  />
                  <p className="text-sm text-gray-500 mt-1">Keep below 30% for best results</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credit Age (Years)</label>
                  <input
                    type="number"
                    value={creditAge}
                    onChange={(e) => setCreditAge(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="20"
                    placeholder="Length of credit history"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credit Mix</label>
                  <select
                    value={creditMix}
                    onChange={(e) => setCreditMix(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="excellent">Excellent (Multiple types)</option>
                    <option value="good">Good (2-3 types)</option>
                    <option value="fair">Fair (1-2 types)</option>
                    <option value="poor">Poor (Single type)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recent Credit Inquiries</label>
                  <input
                    type="number"
                    value={recentInquiries}
                    onChange={(e) => setRecentInquiries(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="20"
                    placeholder="Number of recent applications"
                  />
                  <p className="text-sm text-gray-500 mt-1">In the last 12 months</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={calculateCreditScore}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Analyze Credit Score
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
                  {/* Credit Score Summary */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Star className="w-6 h-6 mr-3 text-blue-600" />
                      Credit Score Analysis
                    </h3>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-4">
                        {getScoreIcon(analysis.scoreRange.level)}
                        <span className={`ml-3 px-4 py-2 rounded-full text-lg font-semibold ${getScoreColor(analysis.scoreRange.level)}`}>
                          {analysis.scoreRange.level.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-4xl font-bold text-gray-900 mb-2">{analysis.currentScore}</p>
                      <p className="text-gray-600 mb-2">{analysis.scoreRange.description}</p>
                      <p className="text-sm text-gray-500">Score Range: {analysis.scoreRange.min}-{analysis.scoreRange.max}</p>
                    </div>
                  </div>

                  {/* Credit Factors */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
                      Credit Score Factors
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.factors.map((factor, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900">{factor.factor}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">{factor.weight}%</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(factor.impact)}`}>
                                {factor.impact}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{factor.description}</p>
                          <p className="text-sm text-blue-600">{factor.recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Loan Eligibility */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Target className="w-6 h-6 mr-3 text-blue-600" />
                      Loan Eligibility & Interest Rates
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">Personal Loan</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            analysis.loanEligibility.personalLoan ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {analysis.loanEligibility.personalLoan ? 'Eligible' : 'Not Eligible'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Interest Rate: {analysis.loanEligibility.interestRates.personalLoan}%</p>
                      </div>
                      
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">Home Loan</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            analysis.loanEligibility.homeLoan ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {analysis.loanEligibility.homeLoan ? 'Eligible' : 'Not Eligible'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Interest Rate: {analysis.loanEligibility.interestRates.homeLoan}%</p>
                      </div>
                      
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">Car Loan</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            analysis.loanEligibility.carLoan ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {analysis.loanEligibility.carLoan ? 'Eligible' : 'Not Eligible'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Interest Rate: {analysis.loanEligibility.interestRates.carLoan}%</p>
                      </div>
                      
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">Credit Card</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            analysis.loanEligibility.creditCard ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {analysis.loanEligibility.creditCard ? 'Eligible' : 'Not Eligible'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Interest Rate: {analysis.loanEligibility.interestRates.creditCard}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Improvement Plan */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                      Credit Improvement Plan
                    </h3>
                    
                    <div className="text-center mb-6">
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        Target Score: {analysis.improvementPlan.targetScore}
                      </p>
                      <p className="text-gray-600 mb-2">
                        Estimated Improvement: +{analysis.improvementPlan.estimatedImprovement} points
                      </p>
                      <p className="text-sm text-gray-500">
                        Timeline: {analysis.improvementPlan.timeline}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      {analysis.improvementPlan.actions.map((action, index) => (
                        <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">{action}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Zap className="w-6 h-6 mr-3 text-blue-600" />
                      Personalized Recommendations
                    </h3>
                    
                    <div className="space-y-3">
                      {analysis.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">{recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {!showResults && (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Analyze Your Credit Score?</h3>
                  <p className="text-gray-600">
                    Enter your credit score and related information to get a comprehensive analysis and improvement plan.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Credit Score Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Understanding Credit Scores</h3>
                <p className="text-gray-600 mb-4">
                  Credit scores range from 300-900 and determine your creditworthiness for loans and credit cards.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 750+: Excellent (Best rates)</li>
                  <li>• 700-749: Good (Favorable rates)</li>
                  <li>• 650-699: Fair (Moderate rates)</li>
                  <li>• Below 650: Poor (Limited options)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Credit Score Factors</h3>
                <p className="text-gray-600 mb-4">
                  Five main factors determine your credit score, each with different weightage.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Payment History (35%)</li>
                  <li>• Credit Utilization (30%)</li>
                  <li>• Credit Age (15%)</li>
                  <li>• Credit Mix (10%)</li>
                  <li>• Recent Inquiries (10%)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Improving Your Score</h3>
                <p className="text-gray-600 mb-4">
                  Consistent good practices can improve your credit score over time.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Pay bills on time</li>
                  <li>• Keep utilization below 30%</li>
                  <li>• Don't close old accounts</li>
                  <li>• Limit new applications</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CreditScoreCalculator;
