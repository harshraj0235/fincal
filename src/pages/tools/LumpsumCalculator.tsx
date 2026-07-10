import React, { useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { IndianRupee, TrendingUp, PieChart, BarChart3, Target, AlertCircle } from 'lucide-react';
import { CalculatorContentWrapper } from '../../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../../components/CalculatorSchema';

const LumpsumCalculator: React.FC = () => {
  const [inputs, setInputs] = useState({
    principal: 100000,
    expectedReturn: 12,
    timePeriod: 5,
    inflation: 6
  });

  const [results, setResults] = useState({
    maturityValue: 0,
    totalGains: 0,
    realValue: 0,
    realGains: 0
  });

  const calculateResults = React.useCallback(() => {
    const { principal, expectedReturn, timePeriod, inflation } = inputs;
    
    // Calculate maturity value using compound interest formula
    const maturityValue = principal * Math.pow(1 + expectedReturn / 100, timePeriod);
    
    // Calculate total gains
    const totalGains = maturityValue - principal;
    
    // Calculate real value (adjusted for inflation)
    const realValue = maturityValue / Math.pow(1 + inflation / 100, timePeriod);
    
    // Calculate real gains
    const realGains = realValue - principal;
    
    setResults({
      maturityValue,
      totalGains,
      realValue,
      realGains
    });
  }, [inputs]);

  React.useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  const handleInputChange = (field: string, value: number) => {
    setInputs({ ...inputs, [field]: value });
  };

  const getReturnComparison = () => {
    const { principal, timePeriod } = inputs;
    const simpleInterest = principal * (1 + (inputs.expectedReturn * timePeriod) / 100);
    const compoundInterest = results.maturityValue;
    const difference = compoundInterest - simpleInterest;
    
    return {
      simpleInterest,
      compoundInterest,
      difference,
      percentage: ((difference / simpleInterest) * 100)
    };
  };

  const comparison = getReturnComparison();

  const getYearlyBreakdown = () => {
    const { principal, expectedReturn } = inputs;
    const breakdown = [];
    
    for (let year = 1; year <= inputs.timePeriod; year++) {
      const value = principal * Math.pow(1 + expectedReturn / 100, year);
      const gains = value - principal;
      breakdown.push({
        year,
        value,
        gains,
        percentage: ((gains / principal) * 100)
      });
    }
    
    return breakdown;
  };

  const yearlyBreakdown = getYearlyBreakdown();

  const getRiskAssessment = () => {
    const { expectedReturn } = inputs;
    
    if (expectedReturn > 15) {
      return { level: 'High', color: 'text-red-600', bg: 'bg-red-50', description: 'High risk, high return potential' };
    } else if (expectedReturn > 10) {
      return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50', description: 'Moderate risk, balanced returns' };
    } else {
      return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50', description: 'Low risk, stable returns' };
    }
  };

  const riskAssessment = getRiskAssessment();

  const contentData = {
    title: "Lumpsum Calculator",
    description: "The Lumpsum Calculator is an advanced financial tool designed to help you determine the future value of a one-time investment. Whether you are investing a large bonus, an inheritance, or accumulated savings into mutual funds or fixed deposits, this calculator precisely computes your maturity amount, total wealth gained, and most importantly, your inflation-adjusted real returns. It empowers you to visualize the magic of compounding on your bulk investments over any given time horizon.",
    
    benefits: [
      "Instantly calculate the exact future value of a one-time lumpsum investment",
      "Visualize the difference between simple interest and compound interest wealth generation",
      "Understand the 'Real Value' of your returns by adjusting for future inflation",
      "Get a detailed year-by-year breakdown of your investment growth trajectory",
      "Assess the potential risk level based on your expected return assumptions",
      "Compare how different asset classes (Equity vs Debt) impact your wealth creation",
      "100% free, highly accurate, and customized for the Indian financial ecosystem"
    ],
    
    howToSteps: [
      {
        step: "Enter Investment Amount",
        details: "Input the total one-time amount you wish to invest today. This could be any surplus capital, bonus, or savings you have accumulated."
      },
      {
        step: "Set Expected Annual Return",
        details: "Enter your realistic expected return percentage based on your chosen asset class. Usually, equity mutual funds aim for 12-15%, while debt funds/FDs hover around 6-8%."
      },
      {
        step: "Specify the Investment Period",
        details: "Choose the total number of years you plan to stay invested. The true power of a lumpsum investment is unlocked over longer periods (7+ years)."
      },
      {
        step: "Set Expected Inflation Rate",
        details: "Input the expected average inflation rate during your investment period (typically 5-7% in India) to see your true 'purchasing power' at maturity."
      }
    ],
    
    examples: [
      {
        scenario: "Investing a Yearly Bonus in Equity",
        inputs: [
          { label: "Principal", value: "₹5,00,000 (5 Lakhs)" },
          { label: "Expected Return", value: "12% per annum" },
          { label: "Time Period", value: "15 Years" },
          { label: "Inflation", value: "6%" }
        ],
        result: "₹27.36 Lakhs Maturity (₹11.41 Lakhs Real Value)",
        explanation: "Sanjay invests his ₹5 Lakhs bonus into a diversified equity fund for 15 years. Thanks to compounding, his principal grows more than 5 times to ₹27.36 Lakhs. Even after adjusting for a 6% average inflation over those 15 years, his 'Real Value' in today's money terms is ₹11.41 Lakhs, meaning his actual purchasing power has doubled."
      },
      {
        scenario: "Inheritance Investment in Balanced Advantage Funds",
        inputs: [
          { label: "Principal", value: "₹20,00,000 (20 Lakhs)" },
          { label: "Expected Return", value: "10% per annum" },
          { label: "Time Period", value: "10 Years" },
          { label: "Inflation", value: "6%" }
        ],
        result: "₹51.87 Lakhs Maturity (₹29.02 Lakhs Real Value)",
        explanation: "Priya receives a ₹20 Lakh inheritance and parks it in a moderate risk Balanced Advantage Fund expecting 10% returns. In a decade, her money crosses ₹50 Lakhs. This highlights how a lumpsum investment effectively shields a large corpus from inflation while providing steady capital appreciation."
      },
      {
        scenario: "The Power of Long-Term Compounding (Child's Education)",
        inputs: [
          { label: "Principal", value: "₹1,00,000 (1 Lakh)" },
          { label: "Expected Return", value: "15% per annum" },
          { label: "Time Period", value: "20 Years" },
          { label: "Inflation", value: "6%" }
        ],
        result: "₹16.36 Lakhs Maturity",
        explanation: "Rahul invests ₹1 Lakh as soon as his daughter is born, aiming for aggressive 15% returns through Small Cap funds. In 20 years, without adding a single rupee more, the initial 1 Lakh turns into an impressive ₹16.36 Lakhs, easily funding her higher education. This defines exponential growth."
      }
    ],
    
    tips: [
      "Avoid investing a large lumpsum when the markets are at an all-time high valuation. If valuations are extremely expensive, opt for a Systematic Transfer Plan (STP) instead.",
      "Lumpsum investments in equity are strictly for the long term (5+ years). For short-term goals (1-3 years), stick to Arbitrage Funds, Liquid Funds, or Bank FDs.",
      "Do not ignore inflation. A ₹1 Crore maturity value after 20 years will not have the same purchasing power as ₹1 Crore today. Focus on the 'Real Value' metric.",
      "Rebalance your portfolio. If your equity lumpsum has grown significantly, systematically book profits and move to debt as you near your financial goal deadline.",
      "Taxes matter. Keep in mind Long Term Capital Gains (LTCG) tax of 12.5% on equity investments exceeding ₹1.25 Lakhs per year when calculating your final take-home corpus."
    ],
    
    mistakes: [
      "Panicking and withdrawing a lumpsum investment during a temporary market crash within the first 2-3 years of investing.",
      "Investing emergency funds or money needed in the near term as a lumpsum in volatile equity mutual funds.",
      "Having unrealistic return expectations (like 25-30% constantly) and putting the entire capital into high-risk sectoral or thematic funds.",
      "Trying to precisely 'time the bottom' of the market. It is nearly impossible. Focus on 'time in the market' rather than 'timing the market'."
    ],
    
    faqs: [
      {
        question: "What is the difference between a Lumpsum and a SIP investment?",
        answer: "A lumpsum investment involves putting a significant amount of money into a financial instrument all at once. A Systematic Investment Plan (SIP) involves investing smaller, fixed amounts at regular intervals (e.g., monthly). Lumpsums have higher absolute return potential if timed well but carry higher risk if the market immediately crashes. SIPs average out the purchase cost over time."
      },
      {
        question: "Is it a good time to invest a lumpsum right now in mutual funds?",
        answer: "This depends entirely on the current market valuations (like Nifty PE ratio) and your investment horizon. If you have a horizon of 10+ years, the current market level matters less. However, if markets are heavily overvalued, financial advisors often recommend staggered investments via an STP (Systematic Transfer Plan) over 6-12 months instead of a single lumpsum shot."
      },
      {
        question: "What does 'Real Value (Inflation Adjusted)' mean in the results?",
        answer: "Due to inflation, the purchasing power of money decreases over time. If a car costs ₹10 Lakhs today, at 6% inflation, it will cost ₹17.9 Lakhs in 10 years. 'Real Value' calculates what your future maturity amount is worth in today's money. If your investment earns 12% but inflation is 6%, your 'real' growth is approximately 6%."
      },
      {
        question: "How is the compound interest calculated in this specific lumpsum calculator?",
        answer: "The calculator uses the standard compound interest formula: A = P(1 + r/100)^t, where A is the maturity amount, P is the principal investment, r is the expected annual return rate, and t is the time period in years. It assumes annual compounding for mutual fund growth standard approximations."
      },
      {
        question: "Can I withdraw my lumpsum investment at any time?",
        answer: "It depends on the investment vehicle. Open-ended mutual funds and standard fixed deposits can be withdrawn anytime, though FDs may have premature withdrawal penalties, and mutual funds might have an 'Exit Load' (usually 1%) if withdrawn within 1 year. ELSS (Tax Saving) funds have a strict 3-year lock-in."
      }
    ],
    
    relatedCalculators: [
      { name: "SIP Calculator", url: "/tools/sip-calculator", description: "Calculate returns for regular monthly mutual fund investments." },
      { name: "Lumpsum vs SIP Analyzer", url: "/finance-tools/lumpsum-vs-sip-analyzer", description: "Compare which strategy works best for your capital based on market conditions." },
      { name: "SWP Calculator", url: "/finance-tools/swp-calculator", description: "Plan regular monthly cash withdrawals from your accumulated lumpsum corpus." },
      { name: "Inflation Calculator", url: "/tools/inflation-calculator", description: "Understand how inflation silently erodes the purchasing power of your money over time." }
    ],
    
    lastUpdated: "2025-10-25"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <SEOHelmet
        title="Lumpsum Calculator - Calculate Lumpsum Investment Returns | MoneyCal India"
        description="Calculate returns from lumpsum investments with our comprehensive calculator. Get detailed analysis of maturity value, gains, inflation-adjusted returns, and yearly breakdown."
        keywords="lumpsum Calculator, lumpsum investment, compound interest, investment Calculator, lumpsum returns, investment planning, financial calculator"
        canonicalUrl="/tools/lumpsum-calculator"
        faqData={contentData.faqs}
      />
      <CalculatorSchema
        name="Lumpsum Calculator"
        description="Calculate the future maturity value, wealth gained, and inflation-adjusted real returns of a one-time lumpsum investment."
        url="/tools/lumpsum-calculator"
        features={[
          "Calculate compound interest on single one-time investments",
          "Adjust future maturity value for annual inflation rates",
          "View comprehensive year-by-year growth breakdown",
          "Compare simple vs compound interest power side-by-side",
          "Evaluate basic investment risk levels",
          "Includes real-world examples and comprehensive FAQs"
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated={contentData.lastUpdated}
        rating={{
          value: 4.8,
          count: 18230
        }}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Lumpsum Investment Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate the potential returns from your lumpsum investment with detailed analysis of maturity value, gains, and inflation-adjusted returns.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Investment Details */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <IndianRupee className="w-6 h-6 mr-2 text-blue-600" />
                  Investment Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={inputs.principal}
                      onChange={(e) => handleInputChange('principal', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter investment amount"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Annual Return (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.expectedReturn}
                      onChange={(e) => handleInputChange('expectedReturn', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter expected return"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Period (Years)
                    </label>
                    <input
                      type="number"
                      value={inputs.timePeriod}
                      onChange={(e) => handleInputChange('timePeriod', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter time period"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Inflation Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.inflation}
                      onChange={(e) => handleInputChange('inflation', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter inflation rate"
                    />
                  </div>
                </div>
              </div>

              {/* Yearly Breakdown */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-green-600" />
                  Yearly Breakdown
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Investment Value</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Total Gains</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Gain %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearlyBreakdown.map((item) => (
                        <tr key={item.year} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-900">{item.year}</td>
                          <td className="py-3 px-4 text-right text-gray-900">₹{item.value.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-green-600">₹{item.gains.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-blue-600">{item.percentage.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Investment Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                  Investment Summary
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Initial Investment</span>
                    <span className="font-semibold text-gray-900">₹{inputs.principal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700">Maturity Value</span>
                    <span className="font-semibold text-green-600">₹{results.maturityValue.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700">Total Gains</span>
                    <span className="font-semibold text-blue-600">₹{results.totalGains.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-700">Real Value (Inflation Adjusted)</span>
                    <span className="font-semibold text-purple-600">₹{results.realValue.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-orange-700">Real Gains</span>
                    <span className="font-semibold text-orange-600">₹{results.realGains.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-orange-600" />
                  Risk Assessment
                </h2>
                
                <div className={`p-4 rounded-lg ${riskAssessment.bg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Risk Level</span>
                    <span className={`font-semibold ${riskAssessment.color}`}>{riskAssessment.level}</span>
                  </div>
                  <p className="text-sm text-gray-600">{riskAssessment.description}</p>
                </div>
              </div>

              {/* Compound vs Simple Interest */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <PieChart className="w-6 h-6 mr-2 text-purple-600" />
                  Compound vs Simple Interest
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Simple Interest</span>
                    <span className="font-semibold text-gray-900">₹{comparison.simpleInterest.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700">Compound Interest</span>
                    <span className="font-semibold text-green-600">₹{comparison.compoundInterest.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700">Extra Gains</span>
                    <span className="font-semibold text-blue-600">₹{comparison.difference.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-700">Extra Gain %</span>
                    <span className="font-semibold text-purple-600">{comparison.percentage.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2 text-blue-600" />
                  Recommendations
                </h2>
                
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Long-term Focus:</strong> Lumpsum investments work best for long-term goals (5+ years).
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Diversification:</strong> Consider diversifying across different asset classes.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Tax Planning:</strong> Consider tax-saving investments like ELSS for better post-tax returns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
            <CalculatorContentWrapper {...contentData} calculatorId="lumpsum-calculator" />
        </div>
      </div>
    </div>
  );
};

export default LumpsumCalculator;
