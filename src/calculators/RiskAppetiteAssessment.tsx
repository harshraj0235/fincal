import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, AlertTriangle, Info, PieChart, TrendingUp, ArrowRight } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    score: number;
  }[];
}

interface RiskProfile {
  type: string;
  description: string;
  equityAllocation: number;
  debtAllocation: number;
  goldAllocation: number;
  cashAllocation: number;
  alternativeAllocation: number;
}

export const RiskAppetiteAssessment: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Questions for risk assessment
  const questions: Question[] = [
    {
      id: 1,
      text: "What is your primary investment goal?",
      options: [
        { id: "a", text: "Preserving my capital and generating income", score: 1 },
        { id: "b", text: "Generating income with some growth", score: 2 },
        { id: "c", text: "Balanced growth and income", score: 3 },
        { id: "d", text: "Growing my investments over time", score: 4 },
        { id: "e", text: "Maximizing long-term growth potential", score: 5 }
      ]
    },
    {
      id: 2,
      text: "How long do you plan to keep your money invested?",
      options: [
        { id: "a", text: "Less than 1 year", score: 1 },
        { id: "b", text: "1-3 years", score: 2 },
        { id: "c", text: "3-5 years", score: 3 },
        { id: "d", text: "5-10 years", score: 4 },
        { id: "e", text: "More than 10 years", score: 5 }
      ]
    },
    {
      id: 3,
      text: "How would you react if your investment portfolio lost 20% of its value in a month?",
      options: [
        { id: "a", text: "I would sell all my investments immediately", score: 1 },
        { id: "b", text: "I would sell some of my investments", score: 2 },
        { id: "c", text: "I would hold my investments and wait to see if they recover", score: 3 },
        { id: "d", text: "I would see this as an opportunity and invest a little more", score: 4 },
        { id: "e", text: "I would significantly increase my investments to take advantage of lower prices", score: 5 }
      ]
    },
    {
      id: 4,
      text: "Which statement best describes your investment knowledge and experience?",
      options: [
        { id: "a", text: "I have very little knowledge about investments", score: 1 },
        { id: "b", text: "I understand the basics but have limited experience", score: 2 },
        { id: "c", text: "I have a good understanding and some experience", score: 3 },
        { id: "d", text: "I am knowledgeable and have been investing for years", score: 4 },
        { id: "e", text: "I consider myself an expert investor", score: 5 }
      ]
    },
    {
      id: 5,
      text: "How stable is your current and future income?",
      options: [
        { id: "a", text: "Not stable at all - I'm worried about my income", score: 1 },
        { id: "b", text: "Somewhat unstable - my income fluctuates", score: 2 },
        { id: "c", text: "Moderately stable - my income is generally reliable", score: 3 },
        { id: "d", text: "Stable - I'm confident about my income", score: 4 },
        { id: "e", text: "Very stable - my income is guaranteed or highly secure", score: 5 }
      ]
    },
    {
      id: 6,
      text: "How much of your monthly income can you comfortably save and invest?",
      options: [
        { id: "a", text: "Less than 5%", score: 1 },
        { id: "b", text: "5-10%", score: 2 },
        { id: "c", text: "10-20%", score: 3 },
        { id: "d", text: "20-30%", score: 4 },
        { id: "e", text: "More than 30%", score: 5 }
      ]
    },
    {
      id: 7,
      text: "Which investment approach appeals to you most?",
      options: [
        { id: "a", text: "Guaranteed returns with no risk of losing principal", score: 1 },
        { id: "b", text: "Mostly stable returns with minimal risk", score: 2 },
        { id: "c", text: "A mix of stable and growth-oriented investments", score: 3 },
        { id: "d", text: "Primarily growth-oriented with some stability", score: 4 },
        { id: "e", text: "Aggressive growth with high volatility", score: 5 }
      ]
    },
    {
      id: 8,
      text: "How would you allocate ₹10 lakhs if you had to choose only one option?",
      options: [
        { id: "a", text: "Bank fixed deposits and government bonds", score: 1 },
        { id: "b", text: "A mix of fixed deposits and high-quality corporate bonds", score: 2 },
        { id: "c", text: "A balanced mutual fund with 60% equity and 40% debt", score: 3 },
        { id: "d", text: "A diversified equity mutual fund portfolio", score: 4 },
        { id: "e", text: "Individual stocks, sector funds, or international equities", score: 5 }
      ]
    },
    {
      id: 9,
      text: "What is your age group?",
      options: [
        { id: "a", text: "Above 60 years", score: 1 },
        { id: "b", text: "50-60 years", score: 2 },
        { id: "c", text: "40-50 years", score: 3 },
        { id: "d", text: "30-40 years", score: 4 },
        { id: "e", text: "Below 30 years", score: 5 }
      ]
    },
    {
      id: 10,
      text: "Do you have an emergency fund that could cover 3-6 months of expenses?",
      options: [
        { id: "a", text: "No, I don't have any emergency savings", score: 1 },
        { id: "b", text: "I have less than 1 month of expenses saved", score: 2 },
        { id: "c", text: "I have 1-3 months of expenses saved", score: 3 },
        { id: "d", text: "I have 3-6 months of expenses saved", score: 4 },
        { id: "e", text: "I have more than 6 months of expenses saved", score: 5 }
      ]
    }
  ];
  
  // Risk profiles
  const riskProfiles: Record<string, RiskProfile> = {
    conservative: {
      type: "Conservative",
      description: "You prioritize capital preservation over growth. You prefer stable, low-risk investments and are comfortable with modest returns in exchange for security.",
      equityAllocation: 20,
      debtAllocation: 60,
      goldAllocation: 10,
      cashAllocation: 8,
      alternativeAllocation: 2
    },
    moderatelyConservative: {
      type: "Moderately Conservative",
      description: "You seek primarily to preserve capital but are willing to accept a small amount of risk for potential growth. You prefer stability but want some inflation protection.",
      equityAllocation: 35,
      debtAllocation: 45,
      goldAllocation: 10,
      cashAllocation: 7,
      alternativeAllocation: 3
    },
    moderate: {
      type: "Moderate",
      description: "You aim for a balance between growth and capital preservation. You can tolerate some market fluctuations for long-term growth potential.",
      equityAllocation: 50,
      debtAllocation: 35,
      goldAllocation: 7,
      cashAllocation: 5,
      alternativeAllocation: 3
    },
    moderatelyAggressive: {
      type: "Moderately Aggressive",
      description: "You prioritize growth over capital preservation. You can tolerate significant market fluctuations and are comfortable with higher risk for higher potential returns.",
      equityAllocation: 65,
      debtAllocation: 25,
      goldAllocation: 5,
      cashAllocation: 2,
      alternativeAllocation: 3
    },
    aggressive: {
      type: "Aggressive",
      description: "You seek maximum growth and are willing to accept substantial risk. You can tolerate significant market volatility and potential losses in pursuit of higher returns.",
      equityAllocation: 80,
      debtAllocation: 10,
      goldAllocation: 5,
      cashAllocation: 0,
      alternativeAllocation: 5
    }
  };
  
  // Handle answer selection
  const handleAnswer = (questionId: number, optionId: string) => {
    setAnswers({
      ...answers,
      [questionId]: optionId
    });
    
    // Move to next question or show results
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };
  
  // Calculate risk score and determine profile
  const calculateScore = () => {
    let totalScore = 0;
    let answeredQuestions = 0;
    
    questions.forEach(question => {
      if (answers[question.id]) {
        const selectedOption = question.options.find(option => option.id === answers[question.id]);
        if (selectedOption) {
          totalScore += selectedOption.score;
          answeredQuestions++;
        }
      }
    });
    
    // Calculate average score (1-5 scale)
    const avgScore = answeredQuestions > 0 ? totalScore / answeredQuestions : 0;
    setScore(avgScore);
    
    // Determine risk profile
    let profile: RiskProfile;
    if (avgScore < 1.8) {
      profile = riskProfiles.conservative;
    } else if (avgScore < 2.6) {
      profile = riskProfiles.moderatelyConservative;
    } else if (avgScore < 3.4) {
      profile = riskProfiles.moderate;
    } else if (avgScore < 4.2) {
      profile = riskProfiles.moderatelyAggressive;
    } else {
      profile = riskProfiles.aggressive;
    }
    
    setRiskProfile(profile);
    setShowResults(true);
  };
  
  // Go to previous question
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  // Restart assessment
  const restartAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setScore(null);
    setRiskProfile(null);
    setShowResults(false);
  };
  
  return (
    <>
    <SEOHelmet
      title="Risk Appetite Assessment Tool India 2026 - Investment Risk Profile Test | MoneyCal"
      description="Assess your investment risk appetite with a structured questionnaire and map it to suitable portfolio allocation ranges."
      keywords="risk appetite assessment india, investment risk profile test, risk tolerance questionnaire, conservative moderate aggressive investor"
      url="/calculators/risk-appetite-assessment"
    />
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Risk Appetite Assessment</h2>
        <p className="text-neutral-600">
          Determine your investment risk tolerance with this comprehensive assessment. Your answers will help create a personalized investment strategy aligned with your financial goals and comfort level with risk.
        </p>
      </div>

      {!showResults ? (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-neutral-900">Question {currentQuestion + 1} of {questions.length}</h3>
              <span className="text-sm text-neutral-500">{Math.round((currentQuestion / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2.5">
              <div 
                className="bg-[--primary-600] h-2.5 rounded-full" 
                style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-xl font-medium text-neutral-900 mb-4">{questions[currentQuestion].text}</h4>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(questions[currentQuestion].id, option.id)}
                  className={`w-full text-left p-4 rounded-lg border ${
                    answers[questions[currentQuestion].id] === option.id
                      ? 'border-[--primary-500] bg-[--primary-50]'
                      : 'border-neutral-200 hover:border-[--primary-300] hover:bg-[--primary-50]'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                      answers[questions[currentQuestion].id] === option.id
                        ? 'border-[--primary-500] bg-[--primary-500]'
                        : 'border-neutral-300'
                    }`}>
                      {answers[questions[currentQuestion].id] === option.id && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="text-neutral-800">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestion === 0}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                currentQuestion === 0
                  ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Previous
            </button>
            
            {currentQuestion === questions.length - 1 && Object.keys(answers).length === questions.length && (
              <button
                onClick={calculateScore}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-[--primary-600] text-white hover:bg-[--primary-700]"
              >
                See Results
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[--primary-100] text-[--primary-600] mb-4">
                <PieChart className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">Your Risk Profile: {riskProfile?.type}</h3>
              <p className="text-neutral-600 max-w-2xl mx-auto">{riskProfile?.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-[--primary-50] rounded-lg">
                <h4 className="font-medium text-[--primary-800] mb-3">Risk Score</h4>
                <div className="flex items-center mb-2">
                  <div className="w-full bg-neutral-200 rounded-full h-2.5 mr-2">
                    <div 
                      className={`h-full rounded-full ${
                        score && score < 2 ? 'bg-[--success-500]' : 
                        score && score < 3 ? 'bg-[--success-600]' : 
                        score && score < 4 ? 'bg-[--warning-500]' : 
                        'bg-[--error-500]'
                      }`}
                      style={{ width: `${score ? (score / 5) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-lg font-semibold text-neutral-900">{score?.toFixed(1)}/5</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Conservative</span>
                  <span>Moderate</span>
                  <span>Aggressive</span>
                </div>
              </div>
              
              <div className="p-4 bg-neutral-50 rounded-lg">
                <h4 className="font-medium text-neutral-800 mb-3">Suggested Asset Allocation</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-[#3b82f6] mr-2"></span>
                      <span className="text-sm text-neutral-700">Equity</span>
                    </div>
                    <span className="text-sm font-medium text-neutral-900">{riskProfile?.equityAllocation}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-[#f59e0b] mr-2"></span>
                      <span className="text-sm text-neutral-700">Debt</span>
                    </div>
                    <span className="text-sm font-medium text-neutral-900">{riskProfile?.debtAllocation}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-[#eab308] mr-2"></span>
                      <span className="text-sm text-neutral-700">Gold</span>
                    </div>
                    <span className="text-sm font-medium text-neutral-900">{riskProfile?.goldAllocation}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-[#22c55e] mr-2"></span>
                      <span className="text-sm text-neutral-700">Cash</span>
                    </div>
                    <span className="text-sm font-medium text-neutral-900">{riskProfile?.cashAllocation}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-[#a855f7] mr-2"></span>
                      <span className="text-sm text-neutral-700">Alternative</span>
                    </div>
                    <span className="text-sm font-medium text-neutral-900">{riskProfile?.alternativeAllocation}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg border border-[--accent-200]">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-[--accent-600] mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium text-[--accent-800] mb-1">What This Means For You</h4>
                  <p className="text-sm text-[--accent-700] mb-2">
                    {score && score < 2 
                      ? "You have a low tolerance for risk and prioritize capital preservation. Focus on stable, income-generating investments with minimal volatility."
                      : score && score < 3
                      ? "You have a moderate-low tolerance for risk. A balanced approach with emphasis on capital preservation is suitable for you."
                      : score && score < 4
                      ? "You have a moderate tolerance for risk. A balanced portfolio with equal focus on growth and stability would suit your profile."
                      : "You have a high tolerance for risk and prioritize growth. You can consider a more aggressive investment approach with higher equity allocation."}
                  </p>
                  <p className="text-sm text-[--accent-700]">
                    Remember that risk tolerance is just one factor in investment planning. Your financial goals, time horizon, and personal circumstances should also guide your investment decisions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                onClick={restartAssessment}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              >
                Retake Assessment
              </button>
              
              <a 
                href="/calculators/asset-allocation-planner" 
                className="px-4 py-2 rounded-lg text-sm font-medium bg-[--primary-600] text-white hover:bg-[--primary-700] flex items-center"
              >
                Create Asset Allocation Plan
                <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Investment Strategies for {riskProfile?.type} Investors</h3>
            
            <div className="space-y-4">
              {riskProfile?.type === "Conservative" && (
                <>
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <h4 className="font-medium text-neutral-900 mb-2">Recommended Investment Vehicles</h4>
                    <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                      <li>Bank Fixed Deposits and Recurring Deposits</li>
                      <li>Government Securities and Treasury Bills</li>
                      <li>AAA-rated Corporate Bonds</li>
                      <li>Debt Mutual Funds (Short Duration, Banking & PSU, Corporate Bond)</li>
                      <li>Post Office Savings Schemes</li>
                      <li>Senior Citizen Savings Scheme (if eligible)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <h4 className="font-medium text-neutral-900 mb-2">Investment Strategy</h4>
                    <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                      <li>Focus on capital preservation and regular income</li>
                      <li>Maintain higher allocation to fixed income and cash</li>
                      <li>Limit equity exposure to large-cap, dividend-paying stocks</li>
                      <li>Consider tax-efficient debt instruments like SCSS or PPF</li>
                      <li>Maintain adequate emergency fund (6-12 months of expenses)</li>
                    </ul>
                  </div>
                </>
              )}
              
              {riskProfile?.type === "Moderately Conservative" && (
                <>
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <h4 className="font-medium text-neutral-900 mb-2">Recommended Investment Vehicles</h4>
                    <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                      <li>Balanced Advantage Funds or Conservative Hybrid Funds</li>
                      <li>Large-cap Equity Funds (limited allocation)</li>
                      <li>Corporate Bond Funds and Banking & PSU Debt Funds</li>
                      <li>Short to Medium Duration Debt Funds</li>
                      <li>Government Securities and Corporate Bonds</li>
                      <li>Gold ETFs or Sovereign Gold Bonds</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <h4 className="font-medium text-neutral-900 mb-2">Investment Strategy</h4>
                    <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                      <li>Prioritize stability with some growth potential</li>
                      <li>Maintain higher allocation to fixed income than equity</li>
                      <li>Focus on blue-chip stocks and dividend-paying equities</li>
                      <li>Consider systematic withdrawal plans for regular income</li>
                      <li>Maintain adequate emergency fund (6 months of expenses)</li>
                    </ul>
                  </div>
                </>
              )}
              
              {riskProfile?.type === "Moderate" && (
                <>
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <h4 className="font-medium text-neutral-900 mb-2">Recommended Investment Vehicles</h4>
                    <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                      <li>Balanced Hybrid Funds or Aggressive Hybrid Funds</li>
                      <li>Large and Mid-cap Equity Funds</li>
                      <li>Flexicap Funds</li>
                      <li>Corporate Bond Funds and Medium Duration Debt Funds</li>
                      <li>Index Funds tracking Nifty 50 or Sensex</li>
                      <li>Gold ETFs or Sovereign Gold Bonds</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <h4 className="font-medium text-neutral-900 mb-2">Investment Strategy</h4>
                    <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                      <li>Balance between growth and stability</li>
                      <li>Diversify across asset classes and within each asset class</li>
                      <li>Consider SIPs for equity investments to average out market volatility</li>
                      <li>Rebalance portfolio annually to maintain target allocation</li>
                      <li>Maintain emergency fund (3-6 months of expenses)</li>
                    </ul>
                  </div>
                </>
              )}
              
              {riskProfile?.type === "Moderately Aggressive" && (
                <>
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <h4 className="font-medium text-neutral-900 mb-2">Recommended Investment Vehicles</h4>
                    <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                      <li>Diversified Equity Funds (Large, Mid, and Small Cap)</li>
                      <li>Index Funds and ETFs</li>
                      <li>Sectoral or Thematic Funds (limited allocation)</li>
                      <li>International Equity Funds</li>
                      <li>Dynamic Bond Funds</li>
                      <li>REITs and InvITs</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <h4 className="font-medium text-neutral-900 mb-2">Investment Strategy</h4>
                    <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                      <li>Focus on long-term growth with higher equity allocation</li>
                      <li>Diversify across market capitalizations and geographies</li>
                      <li>Consider tactical asset allocation based on market conditions</li>
                      <li>Use SIPs and STPs for disciplined investing</li>
                      <li>Maintain a small cash position for opportunities</li>
                    </ul>
                  </div>
                </>
              )}
              
              {riskProfile?.type === "Aggressive" && (
                <>
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <h4 className="font-medium text-neutral-900 mb-2">Recommended Investment Vehicles</h4>
                    <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                      <li>Diversified Equity Funds with higher Mid and Small Cap allocation</li>
                      <li>Sectoral and Thematic Funds</li>
                      <li>International Equity Funds</li>
                      <li>Small Cap Funds</li>
                      <li>Focused Equity Funds</li>
                      <li>Alternative Investments (REITs, InvITs, AIFs)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <h4 className="font-medium text-neutral-900 mb-2">Investment Strategy</h4>
                    <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                      <li>Maximize growth potential with high equity allocation</li>
                      <li>Diversify across sectors, styles, and geographies</li>
                      <li>Consider tactical and strategic asset allocation</li>
                      <li>Be prepared for higher volatility and potential drawdowns</li>
                      <li>Maintain discipline during market downturns</li>
                    </ul>
                  </div>
                </>
              )}
              
              <div className="p-4 bg-[--warning-50] rounded-lg border border-[--warning-200]">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-[--warning-600] mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-medium text-[--warning-800] mb-1">Important Disclaimer</h4>
                    <p className="text-sm text-[--warning-700]">
                      This risk assessment provides general guidance based on your responses. It is not a substitute for professional financial advice. Your actual investment strategy should consider your complete financial situation, goals, and needs. Consider consulting with a financial advisor before making investment decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[--primary-50] rounded-lg p-6 border border-[--primary-100]">
            <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Next Steps</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a 
                href="/calculators/asset-allocation-planner" 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-[--primary-800] mb-1">Asset Allocation Planner</h4>
                <p className="text-xs text-[--primary-600]">Create a detailed investment plan based on your risk profile</p>
              </a>
              <a 
                href="/calculators/mutual-fund-overlap-checker" 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-[--primary-800] mb-1">Mutual Fund Overlap Checker</h4>
                <p className="text-xs text-[--primary-600]">Ensure proper diversification in your portfolio</p>
              </a>
              <a 
                href="/calculators/sip-calculator" 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-[--primary-800] mb-1">SIP Calculator</h4>
                <p className="text-xs text-[--primary-600]">Plan your systematic investments based on your goals</p>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
    <section className="mt-10">
      <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-3">
        <h2 className="text-2xl font-bold text-neutral-900">Risk profile before return targeting</h2>
        <p className="text-neutral-700">A realistic risk profile helps you stay invested during volatility and avoid reactive decisions that hurt long-term returns.</p>
        <p className="text-neutral-700">Next, convert your profile into implementation using <Link to="/calculators/asset-allocation-planner" className="underline">Asset Allocation Planner</Link> and review concentration via <Link to="/calculators/mutual-fund-overlap-checker" className="underline">Mutual Fund Overlap Checker</Link>.</p>
        <p className="text-neutral-700">This test is educational and should be combined with financial goals, emergency reserves, and horizon-based planning.</p>
      </div>
    </section>
    </>
  );
};

export default RiskAppetiteAssessment;