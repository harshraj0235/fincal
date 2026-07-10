import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Calendar, TrendingUp, DollarSign, PiggyBank, AlertCircle, CheckCircle, Zap } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { CalculatorContentWrapper } from '../../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../../components/CalculatorSchema';

interface RetirementAnalysis {
  currentAge: number;
  retirementAge: number;
  yearsToRetirement: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturn: number;
  inflationRate: number;
  retirementCorpus: number;
  monthlyPension: number;
  corpusAtRetirement: number;
  shortfall: number;
  recommendations: string[];
  scenarios: Array<{
    scenario: string;
    monthlyContribution: number;
    corpusAtRetirement: number;
    monthlyPension: number;
    description: string;
  }>;
  milestones: Array<{
    age: number;
    year: number;
    corpus: number;
    description: string;
  }>;
}

const RetirementCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [analysis, setAnalysis] = useState<RetirementAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateRetirement = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = yearsToRetirement * 12;

    // Calculate corpus at retirement using SIP formula
    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
    const futureValueOfSIP = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    const corpusAtRetirement = futureValueOfCurrentSavings + futureValueOfSIP;

    // Calculate required corpus (25x annual expenses adjusted for inflation)
    const annualExpensesAtRetirement = monthlyExpenses * 12 * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    const requiredCorpus = annualExpensesAtRetirement * 25; // 25x rule
    const shortfall = Math.max(0, requiredCorpus - corpusAtRetirement);

    // Calculate monthly pension (4% withdrawal rate)
    const monthlyPension = (corpusAtRetirement * 0.04) / 12;

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (shortfall > 0) {
      recommendations.push(`You have a shortfall of ₹${shortfall.toLocaleString()}. Consider increasing your monthly contribution.`);
    }
    
    if (corpusAtRetirement < requiredCorpus * 0.8) {
      recommendations.push("Your retirement corpus is significantly below the recommended amount. Start saving more aggressively.");
    }
    
    if (currentAge > 40 && monthlyContribution < monthlyExpenses * 0.2) {
      recommendations.push("You're over 40 and saving less than 20% of your expenses. Consider increasing your savings rate.");
    }
    
    if (expectedReturn < 10) {
      recommendations.push("Consider investing in equity mutual funds for better long-term returns (12-15% expected).");
    }
    
    if (yearsToRetirement < 20 && corpusAtRetirement < requiredCorpus) {
      recommendations.push("With less than 20 years to retirement, consider working longer or significantly increasing savings.");
    }

    // Generate different scenarios
    const scenarios = [
      {
        scenario: "Conservative",
        monthlyContribution: monthlyContribution * 1.2,
        corpusAtRetirement: calculateCorpus(monthlyContribution * 1.2),
        monthlyPension: (calculateCorpus(monthlyContribution * 1.2) * 0.04) / 12,
        description: "Increase monthly contribution by 20%"
      },
      {
        scenario: "Moderate",
        monthlyContribution: monthlyContribution * 1.5,
        corpusAtRetirement: calculateCorpus(monthlyContribution * 1.5),
        monthlyPension: (calculateCorpus(monthlyContribution * 1.5) * 0.04) / 12,
        description: "Increase monthly contribution by 50%"
      },
      {
        scenario: "Aggressive",
        monthlyContribution: monthlyContribution * 2,
        corpusAtRetirement: calculateCorpus(monthlyContribution * 2),
        monthlyPension: (calculateCorpus(monthlyContribution * 2) * 0.04) / 12,
        description: "Double your monthly contribution"
      }
    ];

    // Generate milestones
    const milestones = [];
    for (let i = 0; i <= yearsToRetirement; i += 5) {
      const age = currentAge + i;
      const corpus = calculateCorpusAtAge(age);
      milestones.push({
        age,
        year: new Date().getFullYear() + i,
        corpus,
        description: `Age ${age} milestone`
      });
    }

    setAnalysis({
      currentAge,
      retirementAge,
      yearsToRetirement,
      currentSavings,
      monthlyContribution,
      expectedReturn,
      inflationRate,
      retirementCorpus: requiredCorpus,
      monthlyPension,
      corpusAtRetirement,
      shortfall,
      recommendations,
      scenarios,
      milestones
    });
    
    setShowResults(true);
  };

  const calculateCorpus = (monthlyContribution: number) => {
    const yearsToRetirement = retirementAge - currentAge;
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = yearsToRetirement * 12;
    
    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
    const futureValueOfSIP = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    
    return futureValueOfCurrentSavings + futureValueOfSIP;
  };

  const calculateCorpusAtAge = (age: number) => {
    const years = age - currentAge;
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = years * 12;
    
    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, years);
    const futureValueOfSIP = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    
    return futureValueOfCurrentSavings + futureValueOfSIP;
  };

  const resetCalculator = () => {
    setCurrentAge(30);
    setRetirementAge(60);
    setCurrentSavings(100000);
    setMonthlyContribution(5000);
    setExpectedReturn(12);
    setInflationRate(6);
    setMonthlyExpenses(50000);
    setAnalysis(null);
    setShowResults(false);
  };

  const contentData = {
    title: "Retirement Calculator India",
    description: "Plan your retirement systematically with our comprehensive Retirement Calculator. Estimate how much corpus you need at retirement, what monthly pension you can expect, and whether your current savings rate is sufficient. Account for inflation, multiple investment options (EPF, NPS, Mutual Funds), and get personalized recommendations.",
    
    benefits: [
      "Calculate your required retirement corpus based on the 25x annual expenses rule",
      "Estimate your monthly pension using the safe 4% withdrawal rate",
      "Identify any shortfall between your projected corpus and required amount",
      "Compare conservative, moderate, and aggressive savings scenarios",
      "Track milestones showing your corpus growth at 5-year intervals",
      "Get personalized recommendations based on your age and savings rate"
    ],
    
    howToSteps: [
      { step: "Enter Your Age Details", details: "Input your current age and the age at which you plan to retire (typically 58-65 in India)." },
      { step: "Add Current Savings & SIP", details: "Enter your existing retirement savings and the monthly amount you currently invest via SIP or other instruments." },
      { step: "Set Monthly Expenses", details: "Enter your current monthly household expenses. The calculator will adjust this for inflation to project future costs." },
      { step: "Choose Return & Inflation Rates", details: "Set your expected annual return (12% for equity, 7-8% for debt) and the inflation rate (typically 6% in India)." }
    ],
    
    examples: [
      {
        scenario: "30-Year-Old Planning for Retirement at 60",
        inputs: [
          { label: "Current Age", value: "30 years" },
          { label: "Retirement Age", value: "60 years" },
          { label: "Current Savings", value: "\u20b91,00,000" },
          { label: "Monthly SIP", value: "\u20b95,000" },
          { label: "Monthly Expenses", value: "\u20b950,000" },
          { label: "Expected Return", value: "12% p.a." }
        ],
        result: "Corpus at 60: \u20b91.77 Cr | Monthly Pension: \u20b959,000",
        explanation: "Starting at 30 with just \u20b95,000/month SIP at 12% return, you can build a corpus of \u20b91.77 Crore by 60. However, with 6% inflation, your monthly expenses will grow to \u20b92.87 Lakh, requiring a corpus of \u20b98.6 Crore. This shows a significant shortfall \u2014 the key learning is to increase SIP amounts over time."
      },
      {
        scenario: "40-Year-Old Aggressive Saver",
        inputs: [
          { label: "Current Age", value: "40 years" },
          { label: "Retirement Age", value: "60 years" },
          { label: "Current Savings", value: "\u20b925,00,000" },
          { label: "Monthly SIP", value: "\u20b925,000" },
          { label: "Monthly Expenses", value: "\u20b975,000" },
          { label: "Expected Return", value: "12% p.a." }
        ],
        result: "Corpus at 60: \u20b92.67 Cr | Monthly Pension: \u20b989,000",
        explanation: "Starting later means you need to save more aggressively. \u20b925,000/month with existing \u20b925L savings can build \u20b92.67 Crore. To close the gap, consider increasing SIP by 10% annually (step-up SIP) and utilizing NPS for additional tax benefits."
      }
    ],
    
    tips: [
      "Start as early as possible. Thanks to compounding, \u20b95,000/month from age 25 grows to more than \u20b925,000/month from age 40 over the same period.",
      "Use step-up SIPs: increase your monthly investment by 10-15% every year as your income grows. This significantly boosts your retirement corpus.",
      "Maximize employer EPF contributions and consider NPS for additional tax benefits of up to \u20b950,000 under Section 80CCD(1B).",
      "Don't withdraw your EPF when switching jobs. Let it compound until retirement for maximum benefit."
    ],
    
    mistakes: [
      "Underestimating inflation. At 6% inflation, your \u20b950,000 monthly expenses today will become \u20b92.87 Lakh in 30 years.",
      "Withdrawing EPF or PPF prematurely when changing jobs, breaking the compounding cycle.",
      "Ignoring healthcare costs in retirement planning. Medical inflation in India is 10-15%, much higher than general inflation.",
      "Having no separate emergency fund, forcing you to dip into retirement savings during unexpected expenses."
    ],
    
    faqs: [
      { question: "How much retirement corpus do I need?", answer: "A common rule of thumb is the 25x rule: you need a corpus equal to 25 times your annual expenses at retirement (adjusted for inflation). For example, if your annual expenses at retirement will be \u20b912 Lakh, you need \u20b93 Crore. This assumes a 4% annual withdrawal rate, which historically sustains a portfolio for 30+ years." },
      { question: "What is the 4% withdrawal rule?", answer: "The 4% rule suggests you can safely withdraw 4% of your retirement corpus in the first year, and adjust that amount for inflation each subsequent year, without running out of money for at least 30 years. On a \u20b91 Crore corpus, this means withdrawing \u20b94 Lakh in Year 1 (\u20b933,333/month)." },
      { question: "Is EPF enough for retirement?", answer: "EPF alone is rarely sufficient. While it is a great starting point (with employer matching and 8.15% guaranteed return), the contribution is capped. You should supplement EPF with NPS, PPF, and equity mutual fund SIPs to build a diversified retirement portfolio." },
      { question: "When should I start planning for retirement?", answer: "The best time is in your 20s, right when you start earning. Starting a \u20b95,000 SIP at age 25 yields approximately \u20b93.24 Crore by 60 at 12% return. The same \u20b95,000 SIP started at 35 yields only \u20b997 Lakh by 60. That's the power of compounding over an extra decade." },
      { question: "How does inflation affect my retirement plan?", answer: "Inflation is the silent killer of retirement plans. At 6% inflation, the purchasing power of \u20b91 Lakh today will be equivalent to only \u20b917,400 in 30 years. This is why your retirement corpus must be large enough to generate income that keeps pace with inflation." }
    ],
    
    relatedCalculators: [
      { name: "SIP Calculator", url: "/tools/sip-calculator", description: "Plan your monthly SIP investments for retirement." },
      { name: "Lumpsum Calculator", url: "/tools/lumpsum-calculator", description: "Calculate returns on one-time investments." },
      { name: "Income Tax Calculator", url: "/tools/income-tax-calculator", description: "Understand tax implications of your retirement withdrawals." },
      { name: "Home Loan Calculator", url: "/tools/home-loan-calculator", description: "Ensure your home loan doesn't impact retirement goals." }
    ],
    
    lastUpdated: "2025-10-25"
  };

  return (
    <>
      <SEOHelmet
        title="Free Retirement Calculator - Plan Your Retirement Corpus | MoneyCal India"
        description="Calculate your retirement corpus and plan for a secure future. Get personalized recommendations for retirement planning with SIP, EPF, NPS, and pension calculations."
        keywords="retirement Calculator, retirement planning, pension planning, retirement corpus, SIP Calculator, retirement savings, financial planning, EPF, NPS"
        canonicalUrl="/tools/retirement-calculator"
        faqData={contentData.faqs}
      />
      <CalculatorSchema
        name="Retirement Calculator"
        description="Calculate and plan your retirement corpus, monthly pension, and savings milestones for a secure future in India."
        url="/tools/retirement-calculator"
        features={[
          "Retirement corpus calculation with inflation adjustment",
          "Monthly pension estimation using 4% withdrawal rule",
          "Shortfall analysis and personalized recommendations",
          "Multiple savings scenario comparison"
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated={contentData.lastUpdated}
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
                  Retirement Calculator
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Plan your retirement corpus and secure your financial future. Calculate how much you need to save 
                monthly to achieve your retirement goals with personalized recommendations.
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
                <Target className="w-6 h-6 mr-3 text-blue-600" />
                Retirement Planning
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Age</label>
                    <input
                      type="number"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="18"
                      max="65"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Retirement Age</label>
                    <input
                      type="number"
                      value={retirementAge}
                      onChange={(e) => setRetirementAge(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="50"
                      max="80"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Retirement Savings (₹)</label>
                  <input
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter current savings"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Contribution (₹)</label>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter monthly SIP amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Monthly Expenses (₹)</label>
                  <input
                    type="number"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter current monthly expenses"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Annual Return (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 12"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Inflation Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 6"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={calculateRetirement}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Calculate Retirement Plan
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
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Retirement Corpus</h3>
                        <PiggyBank className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-3xl font-bold text-blue-600">₹{analysis.corpusAtRetirement.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">At retirement age {analysis.retirementAge}</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Monthly Pension</h3>
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-3xl font-bold text-green-600">₹{analysis.monthlyPension.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">4% withdrawal rate</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Required Corpus</h3>
                        <Target className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="text-3xl font-bold text-orange-600">₹{analysis.retirementCorpus.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">25x annual expenses</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Shortfall</h3>
                        {analysis.shortfall > 0 ? (
                          <AlertCircle className="w-6 h-6 text-red-600" />
                        ) : (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        )}
                      </div>
                      <p className={`text-3xl font-bold ${analysis.shortfall > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ₹{analysis.shortfall.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {analysis.shortfall > 0 ? 'Need to save more' : 'On track!'}
                      </p>
                    </div>
                  </div>

                  {/* Retirement Milestones */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                      Retirement Milestones
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-gray-900">Age {milestone.age} ({milestone.year})</h4>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">₹{milestone.corpus.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Different Scenarios */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                      Different Scenarios
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.scenarios.map((scenario, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900">{scenario.scenario} Plan</h4>
                            <span className="text-sm font-semibold text-blue-600">₹{scenario.monthlyContribution.toLocaleString()}/month</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Retirement Corpus</p>
                              <p className="font-semibold text-gray-900">₹{scenario.corpusAtRetirement.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Monthly Pension</p>
                              <p className="font-semibold text-gray-900">₹{scenario.monthlyPension.toLocaleString()}</p>
                            </div>
                          </div>
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
                  <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Plan Your Retirement?</h3>
                  <p className="text-gray-600">
                    Enter your details to calculate your retirement corpus and get personalized recommendations for a secure future.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Educational Content */}
            <CalculatorContentWrapper {...contentData} calculatorId="retirement-calculator" />
        </div>
      </div>
    </>
  );
};

export default RetirementCalculator;
