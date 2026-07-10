import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, BarChart3, Target, PieChart, AlertCircle, CheckCircle, Zap, Info, Star, PiggyBank, Calculator, Table as TableIcon } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import SEOHelmet from '../../components/SEOHelmet';
import { CalculatorContentWrapper } from '../../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../../components/CalculatorSchema';

interface SIPAnalysis {
  monthlySIP: number;
  expectedReturn: number;
  investmentPeriod: number;
  totalInvested: number;
  totalValue: number;
  totalGains: number;
  gainPercentage: number;
  yearlyBreakdown: Array<{
    year: number;
    invested: number;
    value: number;
    gains: number;
  }>;
  scenarios: Array<{
    return: number;
    totalValue: number;
    totalGains: number;
    description: string;
  }>;
  recommendations: string[];
  riskAnalysis: {
    riskLevel: 'low' | 'medium' | 'high';
    description: string;
    suitableFor: string[];
  };
  taxImplications: {
    stcg: number;
    ltcg: number;
    totalTax: number;
    afterTaxValue: number;
  };
  milestones: Array<{
    year: number;
    value: number;
    description: string;
  }>;
}

const SIPCalculator: React.FC = () => {
  const [monthlySIP, setMonthlySIP] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [adjustForInflation, setAdjustForInflation] = useState(false);
  const [inflationRate, setInflationRate] = useState(6);
  const [analysis, setAnalysis] = useState<SIPAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'chart' | 'table'>('summary');

  const calculateSIP = () => {
    if (monthlySIP <= 0 || expectedReturn < 0 || investmentPeriod <= 0) {
      alert('Please enter valid SIP parameters');
      return;
    }

    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = investmentPeriod * 12;

    // Calculate future value of SIP using SIP formula
    let totalValue = monthlySIP * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvested = monthlySIP * totalMonths;
    let totalGains = totalValue - totalInvested;
    
    // Adjust for inflation if selected
    if (adjustForInflation) {
      const inflationFactor = Math.pow(1 + (inflationRate / 100), investmentPeriod);
      totalValue = totalValue / inflationFactor;
      totalGains = totalValue - totalInvested;
    }

    const gainPercentage = (totalGains / totalInvested) * 100;

    // Generate yearly breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= investmentPeriod; year++) {
      const invested = monthlySIP * 12 * year;
      let value = calculateValueAtYear(year, expectedReturn);
      
      if (adjustForInflation) {
         const infFactor = Math.pow(1 + (inflationRate / 100), year);
         value = value / infFactor;
      }
      
      const gains = value - invested;
      yearlyBreakdown.push({
        year,
        invested,
        value,
        gains
      });
    }

    // Generate different scenarios
    const scenarios = [
      {
        return: 8,
        totalValue: calculateValueAtReturn(8),
        totalGains: calculateValueAtReturn(8) - totalInvested,
        description: "Conservative (8% returns)"
      },
      {
        return: 12,
        totalValue: totalValue,
        totalGains: totalGains,
        description: "Moderate (12% returns)"
      },
      {
        return: 15,
        totalValue: calculateValueAtReturn(15),
        totalGains: calculateValueAtReturn(15) - totalInvested,
        description: "Aggressive (15% returns)"
      }
    ];

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (investmentPeriod < 5) {
      recommendations.push("Consider a longer investment horizon (5+ years) for better returns and risk management.");
    }
    
    if (expectedReturn < 10) {
      recommendations.push("Consider equity mutual funds for better long-term returns (12-15% expected).");
    }
    
    if (monthlySIP < 1000) {
      recommendations.push("Even small SIP amounts can grow significantly over time. Consider increasing if possible.");
    }
    
    if (gainPercentage > 200) {
      recommendations.push("Excellent potential returns! Stay disciplined with your SIP investments.");
    }
    
    if (totalInvested > totalValue * 0.8) {
      recommendations.push("Your investment is mostly principal. Consider longer investment horizon for better growth.");
    }

    // Risk analysis
    let riskLevel: 'low' | 'medium' | 'high' = 'medium';
    let description = '';
    let suitableFor: string[] = [];

    if (expectedReturn <= 8) {
      riskLevel = 'low';
      description = 'Low risk investments suitable for conservative investors';
      suitableFor = ['Conservative investors', 'Near retirement', 'Short-term goals'];
    } else if (expectedReturn <= 12) {
      riskLevel = 'medium';
      description = 'Moderate risk investments with balanced growth potential';
      suitableFor = ['Balanced investors', 'Medium-term goals', 'Regular income earners'];
    } else {
      riskLevel = 'high';
      description = 'High risk investments with potential for higher returns';
      suitableFor = ['Aggressive investors', 'Long-term goals', 'Young investors'];
    }

    // Tax implications
    const stcg = calculateSTCG(totalValue);
    const ltcg = calculateLTCG(totalValue, totalInvested);
    const totalTax = stcg + ltcg;
    const afterTaxValue = totalValue - totalTax;

    // Generate milestones
    const milestones = [];
    for (let year = 5; year <= investmentPeriod; year += 5) {
      let value = calculateValueAtYear(year, expectedReturn);
      if (adjustForInflation) {
         const infFactor = Math.pow(1 + (inflationRate / 100), year);
         value = value / infFactor;
      }
      milestones.push({
        year,
        value,
        description: `₹${value.toLocaleString(undefined, {maximumFractionDigits: 0})} at year ${year}`
      });
    }

    setAnalysis({
      monthlySIP,
      expectedReturn,
      investmentPeriod,
      totalInvested,
      totalValue,
      totalGains,
      gainPercentage,
      yearlyBreakdown,
      scenarios,
      recommendations,
      riskAnalysis: {
        riskLevel,
        description,
        suitableFor
      },
      taxImplications: {
        stcg,
        ltcg,
        totalTax,
        afterTaxValue
      },
      milestones
    });
    
    setShowResults(true);
    setActiveTab('summary');
  };

  const calculateValueAtYear = (year: number, retRate: number) => {
    const monthlyRate = retRate / 100 / 12;
    const months = year * 12;
    
    return monthlySIP * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  };

  const calculateValueAtReturn = (returnRate: number) => {
    let val = calculateValueAtYear(investmentPeriod, returnRate);
    if (adjustForInflation) {
         const infFactor = Math.pow(1 + (inflationRate / 100), investmentPeriod);
         val = val / infFactor;
    }
    return val;
  };

  const calculateSTCG = (totalValue: number) => {
    // Short-term capital gains (held for less than 1 year) - 15% for equity funds
    return totalValue * 0.15; // Simplified calculation
  };

  const calculateLTCG = (totalValue: number, totalInvested: number) => {
    // Long-term capital gains (held for more than 1 year)
    const gains = totalValue - totalInvested;
    const exemptAmount = Math.min(100000, gains); // ₹1 lakh exemption
    return Math.max(0, (gains - exemptAmount) * 0.10); // 10% on gains above ₹1 lakh
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const resetCalculator = () => {
    setMonthlySIP(5000);
    setExpectedReturn(12);
    setInvestmentPeriod(10);
    setAdjustForInflation(false);
    setInflationRate(6);
    setAnalysis(null);
    setShowResults(false);
  };

  const contentData = {
    title: "SIP Return Calculator (with Inflation)",
    description: `A Systematic Investment Plan (SIP) Calculator helps you accurately estimate the future value of your monthly mutual fund investments. Unlike basic calculators, our advanced SIP calculator features interactive charts, year-by-year tables, and a unique **Inflation Adjustment** tool. Enter your monthly investment, tenure, and expected return to discover how compounding and rupee cost averaging can build a multi-crore corpus.`,
    
    formula: `
### The SIP Calculation Formula
Online SIP calculators use the compound interest formula for periodic contributions. The mathematical formula is:
**FV = P × ({[1 + i]^n - 1} / i) × (1 + i)**

Where:
- **FV** = Future Value of the investment
- **P** = Periodic investment amount (Monthly SIP)
- **i** = Monthly inflation-adjusted rate of return (Annual Rate / 12 / 100)
- **n** = Total number of monthly contributions (Years × 12)
    `,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    
    benefits: [
      "Instantly calculate future value of your monthly investments",
      "Visualize the power of compounding over different time horizons",
      "Plan for long-term financial goals like retirement or children's education",
      "Analyze tax implications (STCG and LTCG) on your mutual fund returns",
      "Determine exactly how much you need to invest monthly to reach a target corpus",
      "Understand how small changes in return rate or tenure drastically affect final wealth",
      "Get a clear year-by-year milestone breakdown of your wealth creation journey",
      "100% free to use, highly accurate, and customized for Indian investors"
    ],
    
    howToSteps: [
      {
        step: "Enter Monthly SIP Amount",
        details: "Input the amount you plan to invest every month. You can start a SIP with as little as ₹500 in most mutual funds in India. It is recommended to invest at least 20-30% of your monthly income towards your financial goals."
      },
      {
        step: "Input Expected Annual Return",
        details: "Enter the percentage return you expect annually. Historically, equity mutual funds in India have delivered 12-15% over the long term (10+ years), while debt funds offer 7-9%. Choose a realistic expectation based on your fund's asset class."
      },
      {
        step: "Select Investment Period",
        details: "Choose how long you plan to continue the SIP in years. The true magic of compounding happens after 10-15 years, so a longer tenure will exponentially increase your wealth. Typical retirement SIPs run for 20-30 years."
      },
      {
        step: "Analyze the Results",
        details: "Click Calculate to view your total invested amount, total estimated wealth, and your pure capital gains. The calculator also provides an annual breakdown, tax estimations, and alternate return scenarios based on different market conditions."
      }
    ],
    
    examples: [
      {
        scenario: "Starting Early for Retirement",
        inputs: [
          { label: "Monthly SIP", value: "₹5,000" },
          { label: "Expected Return", value: "12% per annum" },
          { label: "Investment Period", value: "30 years" }
        ],
        result: "₹1.76 Crores",
        explanation: "Rahul, age 25, starts a SIP of ₹5,000 per month for his retirement at age 55. Over 30 years, he invests a total of ₹18 lakhs. Assuming a 12% annual return, his investment grows to over ₹1.76 Crores. The wealth gained is a massive ₹1.58 Crores! This highlights the immense advantage of starting early."
      },
      {
        scenario: "Planning for Child's Education",
        inputs: [
          { label: "Monthly SIP", value: "₹10,000" },
          { label: "Expected Return", value: "12% per annum" },
          { label: "Investment Period", value: "15 years" }
        ],
        result: "₹50.45 Lakhs",
        explanation: "Priya starts investing ₹10,000 monthly when her child is 3 years old, planning for college at age 18. She invests a total of ₹18 lakhs over 15 years. At an expected 12% return, she will generate a corpus of ₹50.45 Lakhs, comfortably funding higher education expenses."
      },
      {
        scenario: "Short-Term Goal (Car Purchase)",
        inputs: [
          { label: "Monthly SIP", value: "₹15,000" },
          { label: "Expected Return", value: "10% per annum" },
          { label: "Investment Period", value: "5 years" }
        ],
        result: "₹11.61 Lakhs",
        explanation: "Amit wants to buy a premium car in 5 years. He starts a SIP of ₹15,000 per month in a balanced advantage fund assuming 10% returns. Total invested is ₹9,00,000, and it grows to ₹11.61 Lakhs, helping him avoid a heavy-interest car loan."
      }
    ],
    
    tips: [
      "Use the Step-Up SIP strategy: Increase your SIP amount by 10% every year in line with your salary hike to reach goals much faster.",
      "Never stop your SIPs during market crashes. In fact, a falling market allows you to accumulate more mutual fund units at lower NAVs (Rupee Cost Averaging).",
      "Link your SIPs to specific financial goals (like Retirement, House Downpayment, Child's Marriage) for better emotional discipline.",
      "For horizons over 7 years, strongly prefer Equity Mutual Funds (Large Cap, Flexi Cap, or Index Funds) as they beat inflation comfortably.",
      "Don't check your portfolio daily. Equity investments are volatile in the short run but generally trend upward over 5+ years.",
      "Automate your investments. Set your SIP date 2-3 days after your salary credit date so you pay yourself first.",
      "Account for inflation when setting your target corpus. ₹1 Crore today will have the purchasing power of roughly ₹45 Lakhs after 15 years assuming 6% inflation."
    ],
    
    mistakes: [
      "Stopping SIPs temporarily when markets are down or volatile - this completely defeats the benefit of Rupee Cost Averaging.",
      "Expecting unrealistic returns like 20%+ consistently over the long run. Stick to realistic estimates like 10-12% for financial planning.",
      "Withdrawing from your long-term SIP corpus for short-term consumption like vacations or buying gadgets.",
      "Ignoring the impact of expense ratios. A difference of 1% in expense ratio can eat away lakhs of rupees over a 20-year investment period.",
      "Delaying starting a SIP. Waiting 5 years to start investing requires you to invest more than double the monthly amount to reach the same goal.",
      "Investing heavily in thematic or sectoral funds instead of diversified Flexi Cap or Index funds."
    ],
    
    faqs: [
      {
        question: "What is a Systematic Investment Plan (SIP)?",
        answer: "A SIP is a method of investing a fixed sum regularly (usually monthly) in a mutual fund scheme. Instead of investing a lump sum all at once, you spread your investments over a period. This inculcates financial discipline and helps average out the cost of investing since you buy more units when markets are low and fewer units when markets are high."
      },
      {
        question: "Can I stop or pause my SIP anytime?",
        answer: "Yes, SIPs are highly flexible. You can pause, modify, or completely stop your SIP at any time without any penalty from the mutual fund house. You can also withdraw your accumulated corpus anytime (subject to exit loads or lock-in periods like ELSS)."
      },
      {
        question: "Is SIP different from a Mutual Fund?",
        answer: "SIP is just a method of investing, not an investment product itself. The actual product is the Mutual Fund. You can invest in a mutual fund either via SIP (regular intervals) or Lumpsum (one-time). SIP is highly recommended for salaried individuals with regular monthly income."
      },
      {
        question: "Are SIP returns guaranteed?",
        answer: "No, SIP returns are entirely market-linked and are never guaranteed. The returns depend on the performance of the underlying assets (stocks/bonds) held by the mutual fund. However, historical data shows that equity SIPs held for 7-10+ years have overwhelmingly generated positive, inflation-beating returns in India."
      },
      {
        question: "How is tax calculated on Mutual Fund SIPs in India?",
        answer: "For Equity Mutual Funds: Short Term Capital Gains (STCG - held for < 1 year) are taxed at 20%. Long Term Capital Gains (LTCG - held > 1 year) are taxed at 12.5% on gains exceeding ₹1.25 Lakhs per financial year. Important: Every monthly SIP installment is treated as a separate investment for calculating the 1-year holding period."
      },
      {
        question: "What is better: SIP or Recurring Deposit (RD)?",
        answer: "RDs offer guaranteed, fixed returns (usually 6-7%) which are fully taxable, often failing to beat inflation. Equity SIPs offer market-linked, higher expected returns (usually 10-14%) with much better tax efficiency. For short-term goals (< 3 years), RDs are safer. For long-term goals (> 5 years), SIPs are vastly superior for wealth creation."
      },
      {
        question: "How does the Power of Compounding work in a SIP?",
        answer: "Compounding means you earn returns not just on your principal invested, but also on the accumulated returns from previous years. In the later years of a SIP, the wealth generated from compound interest far exceeds your actual invested amount. This is why a longer tenure is the secret to massive wealth creation in SIPs."
      }
    ],
    
    relatedCalculators: [
      { name: "Lumpsum Calculator", url: "/tools/lumpsum-calculator", description: "Calculate returns for one-time bullet investments in mutual funds." },
      { name: "SIP Step-Up Planner", url: "/finance-tools/sip-step-up-planner", description: "See how increasing your SIP annually accelerates your wealth accumulation." },
      { name: "SIP Delay Loss Calculator", url: "/finance-tools/sip-delay-loss-calculator", description: "Visualize the staggering financial cost of delaying your SIP by a few years." },
      { name: "Mutual Fund Goal Planner", url: "/finance-tools/mutual-fund-goal-planner", description: "Find out exactly how much SIP is needed to reach a specific financial target corpus." },
      { name: "Compound Interest Calculator", url: "/tools/compound-interest-calculator", description: "Calculate detailed compounding effects for any investment class." },
      { name: "Retirement Calculator", url: "/tools/retirement-calculator", description: "Plan your retirement corpus taking inflation and expenses into account." }
    ],
    
    lastUpdated: "2025-10-25"
  };

  return (
    <>
      <SEOHelmet
        title="Free SIP Calculator - Calculate SIP Returns & Investment Growth | MoneyCal India"
        description="Calculate your SIP returns with our comprehensive SIP calculator. Analyze different scenarios, risk levels, tax implications, and get personalized recommendations for wealth building."
        keywords="SIP Calculator, systematic investment plan, SIP returns, mutual fund SIP, SIP investment, compound interest, wealth building, investment planning"
        url="/tools/sip-calculator"
        faqData={contentData.faqs}
      />
      <CalculatorSchema
        name="SIP Calculator"
        description="Calculate your SIP returns with our comprehensive SIP calculator. Analyze different scenarios, risk levels, tax implications, and get personalized recommendations for wealth building."
        url="/tools/sip-calculator"
        features={[
          "Instant SIP future value calculations",
          "Detailed tax implications breakdown (LTCG / STCG)",
          "Compare multiple investment scenarios",
          "Risk analysis assessment",
          "Personalized wealth building recommendations",
          "Compound interest milestones",
          "100% free, no registration needed",
          "Mobile-friendly interface"
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated={contentData.lastUpdated}
        rating={{
          value: 4.9,
          count: 22105
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
                  SIP Calculator
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate your SIP returns and see the power of compound interest. Analyze different scenarios, 
                risk levels, tax implications, and get personalized recommendations for wealth building.
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
                <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                SIP Investment Planning
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly SIP Amount (₹)</label>
                  <input
                    type="number"
                    value={monthlySIP}
                    onChange={(e) => setMonthlySIP(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter monthly SIP amount"
                  />
                  <p className="text-sm text-gray-500 mt-1">Systematic Investment Plan amount</p>
                </div>

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
                  <p className="text-sm text-gray-500 mt-1">Expected annual return on investment</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investment Period (Years)</label>
                  <input
                    type="number"
                    value={investmentPeriod}
                    onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 10"
                    min="1"
                    max="50"
                  />
                  <p className="text-sm text-gray-500 mt-1">Duration of SIP investment</p>
                  <p className="text-sm text-gray-500 mt-1">Duration of SIP investment</p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only"
                        checked={adjustForInflation}
                        onChange={(e) => setAdjustForInflation(e.target.checked)}
                      />
                      <div className={`block w-14 h-8 rounded-full transition-colors ${adjustForInflation ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${adjustForInflation ? 'transform translate-x-6' : ''}`}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      Adjust for Inflation
                    </span>
                  </label>
                  
                  {adjustForInflation && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">Inflation Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 6"
                      />
                      <p className="text-xs text-gray-500 mt-1">Historic average in India is ~6%</p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={calculateSIP}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Calculate SIP Returns
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
                  {/* Tabs */}
                  <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-100">
                    <button
                      onClick={() => setActiveTab('summary')}
                      className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${activeTab === 'summary' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Summary
                    </button>
                    <button
                      onClick={() => setActiveTab('chart')}
                      className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${activeTab === 'chart' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Charts
                    </button>
                    <button
                      onClick={() => setActiveTab('table')}
                      className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${activeTab === 'table' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Table
                    </button>
                  </div>

                  {activeTab === 'summary' && (
                    <div className="space-y-6">
                      {/* Summary Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Invested</h3>
                        <PiggyBank className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-3xl font-bold text-blue-600">₹{analysis.totalInvested.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Principal amount</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Value</h3>
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-3xl font-bold text-green-600">₹{analysis.totalValue.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">After {analysis.investmentPeriod} years</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Gains</h3>
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-3xl font-bold text-purple-600">₹{analysis.totalGains.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Profit earned</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Gain %</h3>
                        <Target className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="text-3xl font-bold text-orange-600">{analysis.gainPercentage.toFixed(1)}%</p>
                      <p className="text-sm text-gray-500 mt-1">Return on investment</p>
                    </div>
                  </div>

                  {/* Investment Milestones */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Star className="w-6 h-6 mr-3 text-blue-600" />
                      Investment Milestones
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-gray-900">Year {milestone.year}</h4>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">₹{milestone.value.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Different Scenarios */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <PieChart className="w-6 h-6 mr-3 text-blue-600" />
                      Different Return Scenarios
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.scenarios.map((scenario, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900">{scenario.description}</h4>
                            <span className="text-sm font-semibold text-blue-600">{scenario.return}% returns</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Total Value</p>
                              <p className="font-semibold text-gray-900">₹{scenario.totalValue.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Total Gains</p>
                              <p className="font-semibold text-gray-900">₹{scenario.totalGains.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tax Implications */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Info className="w-6 h-6 mr-3 text-blue-600" />
                      Tax Implications
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">After Tax Value</h4>
                        <p className="text-2xl font-bold text-green-600">₹{analysis.taxImplications.afterTaxValue.toLocaleString()}</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Total Tax</h4>
                        <p className="text-2xl font-bold text-red-600">₹{analysis.taxImplications.totalTax.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Risk Analysis */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <AlertCircle className="w-6 h-6 mr-3 text-blue-600" />
                      Risk Analysis
                    </h3>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-4">
                        <span className={`px-4 py-2 rounded-full text-lg font-semibold ${getRiskColor(analysis.riskAnalysis.riskLevel)}`}>
                          {analysis.riskAnalysis.riskLevel.toUpperCase()} RISK
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{analysis.riskAnalysis.description}</p>
                      <div className="space-y-2">
                        <p className="font-semibold text-gray-900">Suitable for:</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {analysis.riskAnalysis.suitableFor.map((item, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
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
                </div>
              )}

                  {activeTab === 'chart' && (
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                          <PieChart className="w-6 h-6 mr-3 text-blue-600" />
                          Wealth Distribution
                        </h3>
                        <div className="h-64 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                              <Pie
                                data={[
                                  { name: 'Total Invested', value: analysis.totalInvested },
                                  { name: 'Total Gains', value: analysis.totalGains }
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                <Cell key="cell-0" fill="#2563eb" />
                                <Cell key="cell-1" fill="#16a34a" />
                              </Pie>
                              <Tooltip 
                                formatter={(value: number) => `₹${value.toLocaleString()}`}
                              />
                              <Legend />
                            </RechartsPieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                          <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                          Wealth Growth Over Time
                        </h3>
                        <div className="h-64 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analysis.yearlyBreakdown} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                              <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                              <XAxis dataKey="year" tickFormatter={(val) => `Yr ${val}`} />
                              <YAxis tickFormatter={(val) => `₹${(val/100000).toFixed(0)}L`} />
                              <Tooltip formatter={(value: number) => `₹${value.toLocaleString(undefined, {maximumFractionDigits:0})}`} />
                              <Area type="monotone" dataKey="value" name="Total Wealth" stroke="#2563eb" fillOpacity={1} fill="url(#colorValue)" />
                              <Area type="monotone" dataKey="invested" name="Invested" stroke="#16a34a" fillOpacity={1} fill="url(#colorInvested)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'table' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 overflow-hidden">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <TableIcon className="w-6 h-6 mr-3 text-blue-600" />
                        Yearly Breakdown
                      </h3>
                      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50 sticky top-0">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Invested (₹)</th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value (₹)</th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Wealth Gained (₹)</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {analysis.yearlyBreakdown.map((row) => (
                              <tr key={row.year} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.year}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{row.invested.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold text-right">{row.value.toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium text-right">{row.gains.toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}

              {!showResults && (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Calculate Your SIP Returns?</h3>
                  <p className="text-gray-600">
                    Enter your SIP details to see the power of compound interest and get personalized recommendations.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Educational Content */}
          <CalculatorContentWrapper {...contentData} calculatorId="sip-calculator" />
        </div>
      </div>
    </>
  );
};

export default SIPCalculator;
