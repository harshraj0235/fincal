import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  ArrowLeft, 
  DollarSign,
  BarChart3,
  Calendar,
  Target,
  TrendingDown,
  Activity,
  AlertTriangle
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface InflationData {
  year: number;
  inflationRate: number;
  sipAmount: number;
  adjustedAmount: number;
}

const SIPInflationAdjustedCalculator: React.FC = () => {
  const [monthlySIP, setMonthlySIP] = useState(10000);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);
  const [sipIncrease, setSipIncrease] = useState(10);

  const calculateInflationAdjustedSIP = () => {
    const inflationData: InflationData[] = [];
    let totalInvestment = 0;
    let totalAdjustedInvestment = 0;
    let totalCorpus = 0;
    let adjustedCorpus = 0;

    for (let year = 1; year <= investmentPeriod; year++) {
      const yearlySIP = monthlySIP * 12;
      const sipIncreaseAmount = yearlySIP * (sipIncrease / 100) * (year - 1);
      const adjustedSIP = yearlySIP + sipIncreaseAmount;
      
      const inflationFactor = Math.pow(1 + inflationRate / 100, year);
      const inflationAdjustedAmount = adjustedSIP / inflationFactor;
      
      inflationData.push({
        year,
        inflationRate: inflationRate,
        sipAmount: adjustedSIP,
        adjustedAmount: inflationAdjustedAmount
      });

      totalInvestment += adjustedSIP;
      totalAdjustedInvestment += inflationAdjustedAmount;
      
      // Calculate corpus for this year's investment
      const yearsRemaining = investmentPeriod - year + 1;
      const corpusForThisYear = adjustedSIP * Math.pow(1 + expectedReturn / 100, yearsRemaining);
      const adjustedCorpusForThisYear = inflationAdjustedAmount * Math.pow(1 + (expectedReturn - inflationRate) / 100, yearsRemaining);
      
      totalCorpus += corpusForThisYear;
      adjustedCorpus += adjustedCorpusForThisYear;
    }

    return {
      inflationData,
      totalInvestment,
      totalAdjustedInvestment,
      totalCorpus,
      adjustedCorpus,
      realReturn: ((adjustedCorpus / totalAdjustedInvestment) ** (1 / investmentPeriod) - 1) * 100
    };
  };

  const result = calculateInflationAdjustedSIP();

  return (
    <>
      <SEOHelmet
        title="SIP Inflation-Adjusted Calculator - Calculate Real Returns | MoneyCal"
        description="Calculate SIP returns adjusted for inflation. Understand the real purchasing power of your investments with our inflation-adjusted SIP calculator."
        keywords="SIP inflation calculator, real returns, inflation adjusted SIP, purchasing power, investment returns, inflation impact"
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link to="/finance-tools" className="text-white hover:text-purple-200 transition-colors text-sm md:text-base">
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Back to Finance Tools
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                SIP Inflation-Adjusted Calculator
              </h1>
              <p className="text-lg md:text-xl text-purple-100 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
                Calculate the real purchasing power of your SIP investments
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-8 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 mr-3 text-purple-600" />
                  SIP Parameters
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly SIP Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={monthlySIP}
                      onChange={(e) => setMonthlySIP(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
                      placeholder="10000"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Investment Period (Years)
                      </label>
                      <input
                        type="number"
                        value={investmentPeriod}
                        onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
                        placeholder="10"
                      />
                    </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Return (%)
                    </label>
                    <input
                      type="number"
                        step="0.1"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(Number(e.target.value))}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
                      placeholder="12"
                    />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inflation Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(Number(e.target.value))}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
                        placeholder="6"
                      />
                    </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        SIP Increase (% per year)
                    </label>
                    <input
                      type="number"
                        step="0.1"
                        value={sipIncrease}
                        onChange={(e) => setSipIncrease(Number(e.target.value))}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
                      placeholder="10"
                    />
                    </div>
                  </div>

                  {/* Information Box */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-purple-800">
                        <p className="font-medium mb-1">How it works:</p>
                        <p>This calculator shows how inflation affects your SIP's real purchasing power. The adjusted amount represents what your investment is worth in today's money.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4 md:space-y-6"
              >
                {/* Summary Cards */}
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold">Real Returns Summary</h3>
                    <Activity className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl md:text-3xl font-bold mb-1">
                        {result.realReturn.toFixed(2)}%
                      </div>
                      <p className="text-purple-100 text-sm">Real Return Rate</p>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold mb-1">
                        ₹{result.adjustedCorpus.toLocaleString()}
                      </div>
                      <p className="text-purple-100 text-sm">Real Corpus Value</p>
                    </div>
                  </div>
                  <div className="mt-4 p-2 rounded-lg text-sm bg-purple-500/20">
                    Nominal Return: {expectedReturn}% • Inflation: {inflationRate}%
                  </div>
                </div>

                {/* Investment Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Nominal Investment</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-green-600 mb-1">
                      ₹{result.totalInvestment.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Total amount invested</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <Target className="h-4 w-4 md:h-5 md:w-5 text-purple-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Real Investment</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-purple-600 mb-1">
                      ₹{result.totalAdjustedInvestment.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Inflation-adjusted value</p>
                  </div>
                </div>

                {/* Corpus Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-blue-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Nominal Corpus</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-blue-600 mb-1">
                      ₹{result.totalCorpus.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Future value (nominal)</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <TrendingDown className="h-4 w-4 md:h-5 md:w-5 text-red-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Real Corpus</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-red-600 mb-1">
                      ₹{result.adjustedCorpus.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Future value (real)</p>
                  </div>
                </div>

                {/* Yearly Breakdown */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <BarChart3 className="h-4 w-4 md:h-5 md:w-5 mr-2 text-purple-600" />
                    Yearly Investment Breakdown
                  </h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {result.inflationData.map((data) => (
                      <div key={data.year} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-xs font-semibold text-purple-600">{data.year}</span>
                          </div>
                          <div>
                            <div className="font-medium text-sm">Year {data.year}</div>
                            <div className="text-xs text-gray-500">
                              SIP: ₹{data.sipAmount.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-sm text-purple-600">
                            ₹{data.adjustedAmount.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">Real Value</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Insights */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <Calendar className="h-4 w-4 md:h-5 md:w-5 mr-2 text-purple-600" />
                    Key Insights
                  </h4>
                  <div className="space-y-2 text-xs md:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Purchasing Power Loss:</span>
                      <span className="font-semibold text-red-600">
                        {((result.totalInvestment - result.totalAdjustedInvestment) / result.totalInvestment * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Real vs Nominal Return:</span>
                      <span className="font-semibold text-purple-600">
                        {result.realReturn.toFixed(2)}% vs {expectedReturn}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Corpus Value Loss:</span>
                      <span className="font-semibold text-red-600">
                        ₹{(result.totalCorpus - result.adjustedCorpus).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Effective Return:</span>
                      <span className="font-semibold text-green-600">
                        {(expectedReturn - inflationRate).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Tools Section */}
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
                to="/finance-tools/real-vs-nominal-return-calculator"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center mb-3 md:mb-4">
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Real vs Nominal Return Calculator</h3>
                <p className="text-gray-600 text-xs md:text-sm">Calculate real returns adjusted for inflation and purchasing power</p>
              </Link>

              <Link
                to="/finance-tools/sip-delay-loss-calculator"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3 md:mb-4">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">SIP Delay Loss Calculator</h3>
                <p className="text-gray-600 text-xs md:text-sm">Calculate the cost of delaying your SIP investments</p>
              </Link>

              <Link
                to="/finance-tools/sip-step-up-planner"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-3 md:mb-4">
                  <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">SIP Step-up Planner</h3>
                <p className="text-gray-600 text-xs md:text-sm">Plan and calculate step-up SIP for better wealth creation</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SIPInflationAdjustedCalculator;