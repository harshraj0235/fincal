import React, { useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { Shield, AlertTriangle, TrendingUp, Target, CheckCircle, XCircle } from 'lucide-react';

const RiskAssessment: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'age',
      question: 'What is your age?',
      options: [
        { value: '18-25', score: 5 },
        { value: '26-35', score: 4 },
        { value: '36-45', score: 3 },
        { value: '46-55', score: 2 },
        { value: '56+', score: 1 }
      ]
    },
    {
      id: 'investment_horizon',
      question: 'What is your investment time horizon?',
      options: [
        { value: 'Less than 1 year', score: 1 },
        { value: '1-3 years', score: 2 },
        { value: '3-5 years', score: 3 },
        { value: '5-10 years', score: 4 },
        { value: 'More than 10 years', score: 5 }
      ]
    },
    {
      id: 'risk_tolerance',
      question: 'How would you react to a 20% decline in your portfolio?',
      options: [
        { value: 'Sell everything immediately', score: 1 },
        { value: 'Sell some investments', score: 2 },
        { value: 'Hold and wait for recovery', score: 3 },
        { value: 'Buy more at lower prices', score: 4 },
        { value: 'See it as a buying opportunity', score: 5 }
      ]
    },
    {
      id: 'financial_goals',
      question: 'What is your primary financial goal?',
      options: [
        { value: 'Preserve capital', score: 1 },
        { value: 'Generate regular income', score: 2 },
        { value: 'Moderate growth', score: 3 },
        { value: 'Capital appreciation', score: 4 },
        { value: 'Maximum growth', score: 5 }
      ]
    },
    {
      id: 'investment_experience',
      question: 'How would you describe your investment experience?',
      options: [
        { value: 'No experience', score: 1 },
        { value: 'Limited experience', score: 2 },
        { value: 'Moderate experience', score: 3 },
        { value: 'Experienced', score: 4 },
        { value: 'Very experienced', score: 5 }
      ]
    },
    {
      id: 'income_stability',
      question: 'How stable is your income?',
      options: [
        { value: 'Very unstable', score: 1 },
        { value: 'Somewhat unstable', score: 2 },
        { value: 'Moderately stable', score: 3 },
        { value: 'Stable', score: 4 },
        { value: 'Very stable', score: 5 }
      ]
    },
    {
      id: 'debt_level',
      question: 'What is your current debt-to-income ratio?',
      options: [
        { value: 'More than 50%', score: 1 },
        { value: '30-50%', score: 2 },
        { value: '20-30%', score: 3 },
        { value: '10-20%', score: 4 },
        { value: 'Less than 10%', score: 5 }
      ]
    },
    {
      id: 'emergency_fund',
      question: 'Do you have an emergency fund?',
      options: [
        { value: 'No emergency fund', score: 1 },
        { value: 'Less than 3 months expenses', score: 2 },
        { value: '3-6 months expenses', score: 3 },
        { value: '6-12 months expenses', score: 4 },
        { value: 'More than 12 months expenses', score: 5 }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const calculateRiskScore = () => {
    let totalScore = 0;
    let answeredQuestions = 0;

    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          totalScore += option.score;
          answeredQuestions++;
        }
      }
    });

    return answeredQuestions > 0 ? totalScore / answeredQuestions : 0;
  };

  const getRiskProfile = (score: number) => {
    if (score <= 1.5) return {
      level: 'Conservative',
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      description: 'You prefer safety and stability over high returns.',
      allocation: {
        equity: 20,
        debt: 60,
        gold: 20
      }
    };
    if (score <= 2.5) return {
      level: 'Moderately Conservative',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      description: 'You prefer a balanced approach with moderate risk.',
      allocation: {
        equity: 40,
        debt: 50,
        gold: 10
      }
    };
    if (score <= 3.5) return {
      level: 'Moderate',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      description: 'You are comfortable with moderate risk for better returns.',
      allocation: {
        equity: 60,
        debt: 30,
        gold: 10
      }
    };
    if (score <= 4.5) return {
      level: 'Moderately Aggressive',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      description: 'You are willing to take higher risks for better returns.',
      allocation: {
        equity: 80,
        debt: 15,
        gold: 5
      }
    };
    return {
      level: 'Aggressive',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      description: 'You are comfortable with high risk for maximum returns.',
      allocation: {
        equity: 90,
        debt: 5,
        gold: 5
      }
    };
  };

  const riskScore = calculateRiskScore();
  const riskProfile = getRiskProfile(riskScore);
  const allQuestionsAnswered = questions.every(q => answers[q.id]);

  const handleSubmit = () => {
    if (allQuestionsAnswered) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      <SEOHelmet
        title="Risk Assessment Tool - Determine Your Investment Risk Profile | MoneyCal India"
        description="Take our comprehensive risk assessment quiz to determine your investment risk tolerance and get personalized portfolio recommendations based on your risk profile."
        keywords="risk assessment, investment risk, risk tolerance, portfolio risk, investment profile, risk analysis, financial risk, investment quiz"
        canonicalUrl="https://moneycal.in/tools/risk-assessment"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Investment Risk Assessment
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover your risk tolerance and get personalized investment recommendations based on your financial profile and goals.
            </p>
          </div>

          {!showResults ? (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-medium text-gray-700">
                    {Object.keys(answers).length} / {questions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-8">
                {questions.map((question, index) => (
                  <div key={question.id} className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {index + 1}. {question.question}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {question.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(question.id, option.value)}
                          className={`p-4 text-left rounded-lg border-2 transition-all ${
                            answers[question.id] === option.value
                              ? 'border-blue-500 bg-blue-50 text-blue-900'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                              answers[question.id] === option.value
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}>
                              {answers[question.id] === option.value && (
                                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                              )}
                            </div>
                            <span className="font-medium">{option.value}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleSubmit}
                  disabled={!allQuestionsAnswered}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    allQuestionsAnswered
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {allQuestionsAnswered ? 'Get My Risk Profile' : 'Complete All Questions'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Risk Profile Results */}
              <div className={`bg-white rounded-xl shadow-lg p-8 border-2 ${riskProfile.border}`}>
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${riskProfile.bg} mb-4`}>
                    <Shield className={`w-8 h-8 ${riskProfile.color}`} />
                  </div>
                  <h2 className={`text-3xl font-bold ${riskProfile.color} mb-2`}>
                    {riskProfile.level} Risk Profile
                  </h2>
                  <p className="text-lg text-gray-600 mb-4">
                    Risk Score: {riskScore.toFixed(1)} / 5.0
                  </p>
                  <p className="text-gray-700 max-w-2xl mx-auto">
                    {riskProfile.description}
                  </p>
                </div>

                {/* Recommended Asset Allocation */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    Recommended Asset Allocation
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {riskProfile.allocation.equity}%
                      </div>
                      <div className="text-sm text-gray-600">Equity</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        {riskProfile.allocation.debt}%
                      </div>
                      <div className="text-sm text-gray-600">Debt</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600 mb-2">
                        {riskProfile.allocation.gold}%
                      </div>
                      <div className="text-sm text-gray-600">Gold</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Recommendations */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                  Investment Recommendations
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Equity Investments</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900">Large Cap Mutual Funds</div>
                          <div className="text-sm text-gray-600">Stable, established companies</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900">Index Funds</div>
                          <div className="text-sm text-gray-600">Low-cost, diversified exposure</div>
                        </div>
                      </div>
                      {riskProfile.level === 'Moderate' || riskProfile.level === 'Moderately Aggressive' || riskProfile.level === 'Aggressive' ? (
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <div className="font-medium text-gray-900">Mid & Small Cap Funds</div>
                            <div className="text-sm text-gray-600">Higher growth potential</div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Debt Investments</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900">Government Bonds</div>
                          <div className="text-sm text-gray-600">Highest safety, guaranteed returns</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900">Corporate Bond Funds</div>
                          <div className="text-sm text-gray-600">Higher returns than government bonds</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900">Fixed Deposits</div>
                          <div className="text-sm text-gray-600">Bank deposits with guaranteed returns</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Management Tips */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-orange-600" />
                  Risk Management Tips
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Diversification</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Spread investments across different asset classes</li>
                      <li>• Invest in different sectors and geographies</li>
                      <li>• Avoid putting all money in one investment</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Regular Review</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Review your portfolio quarterly</li>
                      <li>• Rebalance when allocations drift</li>
                      <li>• Adjust based on life changes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setAnswers({});
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retake Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
