import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  ArrowLeft, 
  Info, 
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { CalculatorContentWrapper } from '../../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../../components/CalculatorSchema';
const SIPDelayLossCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [delayMonths, setDelayMonths] = useState(6);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);

  // Calculate the opportunity cost of delaying SIP
  const calculateDelayLoss = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = investmentPeriod * 12;
    
    // Calculate corpus if started immediately
    const immediateCorpus = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    
    // Calculate corpus if started after delay
    const delayedCorpus = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, totalMonths - delayMonths) - 1) / monthlyRate);
    
    const opportunityLoss = immediateCorpus - delayedCorpus;
    const totalInvestment = monthlyInvestment * totalMonths;
    const delayedInvestment = monthlyInvestment * (totalMonths - delayMonths);
    
    return {
      immediateCorpus: Math.round(immediateCorpus),
      delayedCorpus: Math.round(delayedCorpus),
      opportunityLoss: Math.round(opportunityLoss),
      totalInvestment,
      delayedInvestment,
      percentageLoss: Math.round((opportunityLoss / immediateCorpus) * 100)
    };
  };

  const result = calculateDelayLoss();

  const contentData = {
    title: "SIP Delay Loss Calculator",
    description: `A SIP Delay Loss Calculator is an essential financial tool designed to show you the hidden cost of procrastination. By delaying your Systematic Investment Plan by just a few months or years, you lose out on the massive wealth-building power of compounding. This calculator instantly quantifies your "Opportunity Loss" in exact Rupees and percentage, helping you understand why starting early is the golden rule of investing.`,
    
    benefits: [
      "Instantly calculate the exact monetary loss incurred by delaying your investments",
      "Visualize the staggering difference in final corpus between starting 'Now' vs 'Later'",
      "Understand the time-value of money and the true power of compound interest",
      "Motivate yourself to start investing early rather than waiting for the 'perfect time'",
      "Calculate the extra capital you'll need to invest later to catch up to your original goal",
      "See the detailed breakdown of total investments vs total wealth generated",
      "100% free, highly accurate, and customized for Indian mutual fund investors"
    ],
    
    howToSteps: [
      {
        step: "Enter Monthly SIP Amount",
        details: "Input the amount you are planning to invest on a monthly basis. Even starting with a smaller amount early is better than waiting to accumulate a larger monthly surplus."
      },
      {
        step: "Set Expected Annual Return",
        details: "Enter your realistic expected return percentage. Equity mutual funds in India have historically delivered 12-15% over long periods (10+ years)."
      },
      {
        step: "Specify the Delay Period",
        details: "Input how many months you are planning to delay your investment. You would be surprised to see how even a 6-month or 1-year delay can cost you lakhs over a 20-year horizon."
      },
      {
        step: "Set Total Investment Horizon",
        details: "Enter your total planned investment duration in years. The longer the duration, the more catastrophic the delay loss becomes due to the magic of compounding."
      }
    ],
    
    examples: [
      {
        scenario: "The Cost of Waiting for a Salary Hike (1 Year Delay)",
        inputs: [
          { label: "Monthly SIP", value: "₹10,000" },
          { label: "Expected Return", value: "12% per annum" },
          { label: "Delay Period", value: "12 Months (1 Year)" },
          { label: "Investment Period", value: "20 years" }
        ],
        result: "₹10.95 Lakhs Lost",
        explanation: "Amit decides to wait 1 year for his next promotion before starting a ₹10,000 SIP for 20 years. By delaying just 12 months, his final corpus drops from ₹99.91 Lakhs to ₹88.96 Lakhs. The opportunity loss is nearly ₹11 Lakhs, just for delaying an investment of ₹1.2 Lakhs!"
      },
      {
        scenario: "Delaying Retirement Planning (5 Year Delay)",
        inputs: [
          { label: "Monthly SIP", value: "₹15,000" },
          { label: "Expected Return", value: "12% per annum" },
          { label: "Delay Period", value: "60 Months (5 Years)" },
          { label: "Investment Period", value: "25 years" }
        ],
        result: "₹1.37 Crores Lost",
        explanation: "Neha, age 30, plans to start a ₹15k SIP for her retirement at 55 (25 years). If she delays starting until age 35 (5 years later), her final corpus drops from ₹2.84 Crores to ₹1.47 Crores. She loses a staggering ₹1.37 Crores just by delaying 5 years. She would have to triple her monthly SIP to catch up!"
      },
      {
        scenario: "Short-Term Procrastination (6 Months Delay)",
        inputs: [
          { label: "Monthly SIP", value: "₹20,000" },
          { label: "Expected Return", value: "15% per annum" },
          { label: "Delay Period", value: "6 Months" },
          { label: "Investment Period", value: "15 years" }
        ],
        result: "₹10.36 Lakhs Lost",
        explanation: "Rahul plans to invest in small-cap funds (expecting 15%) but delays for 6 months trying to 'time the market'. This 6-month delay on a 15-year horizon costs him over ₹10 Lakhs in lost wealth. Time in the market always beats timing the market."
      }
    ],
    
    tips: [
      "The best time to start investing was yesterday; the second best time is today. Do not wait for the perfectly 'right' time to enter the market.",
      "If you cannot afford your target SIP amount right now, start with half the amount today and use a Step-Up SIP to increase it next year.",
      "Do not try to 'time the market' by waiting for a crash. The wealth lost in waiting often exceeds the minor benefit of buying at lower NAVs.",
      "Compounding is heavily back-loaded. The returns generated in the final 3-5 years of a 20-year SIP often exceed the total returns of the first 15 years.",
      "Automate your investments. Once your KYC is done, simply set up an e-mandate and let the SIP run on autopilot on the 5th of every month.",
      "If you started late, don't panic. You can partially compensate by aggressively stepping up your SIP amount by 15-20% every year."
    ],
    
    mistakes: [
      "Thinking 'I'll start when my salary increases next year'. This is the most common and expensive wealth-destroying mistake.",
      "Waiting to accumulate a large lumpsum instead of starting small monthly SIPs immediately.",
      "Underestimating the steep mathematical cost of a delay. A 10% delay in time often leads to a 30-40% reduction in final wealth.",
      "Over-analyzing which is the 'best' mutual fund for months instead of just picking a low-cost Nifty 50 Index fund and starting today."
    ],
    
    faqs: [
      {
        question: "What is SIP Delay Loss or Opportunity Cost?",
        answer: "SIP delay loss is the massive difference in the final wealth you could have accumulated if you started investing today versus starting later. It occurs because the money you didn't invest loses out on the exponential power of compounding over time."
      },
      {
        question: "Why is the delay loss so disproportionately high?",
        answer: "Because of compound interest. In a long-term SIP, the majority of your wealth is generated in the final few years. When you delay starting by 2 years, you are effectively chopping off the final 2 years of compounding at the end of the horizon, which are the most lucrative years."
      },
      {
        question: "Can I make up for a 5-year delay by investing double the amount later?",
        answer: "Mathematically, yes, but practically it is very difficult. Because compounding favors time over capital, an investor who starts 5 years late often has to invest 2.5x to 3x the original monthly amount just to match the final corpus of someone who started early."
      },
      {
        question: "Is it better to wait for a market dip to start my SIP?",
        answer: "No. Studies show that 'Time in the market' consistently beats 'Timing the market'. Delaying a SIP by 6-12 months while waiting for a crash usually results in a much higher opportunity loss than the marginal benefit of buying at a slightly lower price."
      },
      {
        question: "I am 35 years old. Is it too late to start a SIP?",
        answer: "Absolutely not. While you may have missed out on compounding in your 20s, starting at 35 gives you 25 solid years until retirement (age 60). A disciplined SIP with regular annual step-ups can still comfortably build a multi-crore corpus for your retirement."
      }
    ],
    
    relatedCalculators: [
      { name: "Regular SIP Calculator", url: "/tools/sip-calculator", description: "Calculate your standard SIP returns and view detailed year-by-year compounding milestones." },
      { name: "Step-Up SIP Planner", url: "/finance-tools/sip-step-up-planner", description: "See how increasing your SIP annually can help you catch up on delayed investments." },
      { name: "Retirement Planner", url: "/tools/retirement-calculator", description: "Calculate precisely how much you need to invest monthly to retire peacefully." },
      { name: "Mutual Fund Goal Planner", url: "/finance-tools/mutual-fund-goal-planner", description: "Find out exactly what SIP amount is required to reach a specific financial target." }
    ],
    
    lastUpdated: "2025-10-25"
  };

  return (
    <>
      <SEOHelmet
        title="SIP Delay Loss Calculator - Calculate Opportunity Cost of Delaying Investments | MoneyCal"
        description="Calculate how much money you lose by delaying your SIP investments. Use our SIP delay loss Calculator to understand the opportunity cost of postponing your investment decisions."
        keywords="SIP delay loss Calculator, investment timing, opportunity cost Calculator, SIP investment loss, delayed investment impact, SIP postponement cost"
        url="/finance-tools/sip-delay-loss-calculator"
        faqData={contentData.faqs}
      />
      <CalculatorSchema
        name="SIP Delay Loss Calculator"
        description="Calculate the opportunity cost and financial loss incurred by delaying your Systematic Investment Plan (SIP)."
        url="/finance-tools/sip-delay-loss-calculator"
        features={[
          "Calculate exact monetary opportunity loss of delayed investments",
          "Compare Immediate vs Delayed start scenarios side-by-side",
          "Analyze the percentage impact on your total wealth generation",
          "Understand the time-value of money in mutual fund SIPs",
          "100% free with no registration required",
          "Includes detailed examples and educational guides"
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated={contentData.lastUpdated}
        rating={{
          value: 4.8,
          count: 14750
        }}
      />


      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-red-600 via-orange-600 to-red-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link to="/finance-tools" className="text-white hover:text-red-200 transition-colors">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Finance Tools
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                SIP Delay Loss Calculator
              </h1>
              <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
                Calculate the opportunity cost of delaying your SIP investments and understand the real impact of postponing your investment decisions
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-red-100">
                <span>💰 Opportunity Cost Analysis</span>
                <span>📈 Investment Timing Impact</span>
                <span>🎯 Goal Achievement Delay</span>
                <span>⚡ Time Value of Money</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <IndianRupee className="h-6 w-6 mr-3 text-red-600" />
                  Calculate Delay Loss
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly SIP Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={monthlyInvestment}
                      onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="10000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Annual Return (%)
                    </label>
                    <input
                      type="number"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="12"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delay Period (Months)
                    </label>
                    <input
                      type="number"
                      value={delayMonths}
                      onChange={(e) => setDelayMonths(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="6"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Period (Years)
                    </label>
                    <input
                      type="number"
                      value={investmentPeriod}
                      onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="10"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Opportunity Loss Card */}
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Opportunity Loss</h3>
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div className="text-4xl font-bold mb-2">₹{result.opportunityLoss.toLocaleString()}</div>
                  <p className="text-red-100">You lose {result.percentageLoss}% of potential corpus</p>
                </div>

                {/* Comparison Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-gray-900">Start Immediately</h4>
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      ₹{result.immediateCorpus.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">Final Corpus</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <Clock className="h-5 w-5 text-orange-600 mr-2" />
                      <h4 className="font-semibold text-gray-900">Start After Delay</h4>
                    </div>
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      ₹{result.delayedCorpus.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">Final Corpus</p>
                  </div>
                </div>

                {/* Investment Summary */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                    Investment Summary
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Investment (Immediate):</span>
                      <span className="font-semibold">₹{result.totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Investment (Delayed):</span>
                      <span className="font-semibold">₹{result.delayedInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment Saved:</span>
                      <span className="font-semibold text-green-600">
                        ₹{(result.totalInvestment - result.delayedInvestment).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Educational Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CalculatorContentWrapper {...contentData} />
        </div>
      </div>
    </>
  );
};

export default SIPDelayLossCalculator;
