import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Info,
  FileText,
  Target,
  CheckCircle,
  ArrowRight,
  Download,
  Share2,
  BarChart3,
  Clock,
  AlertTriangle, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface ExitStrategy {
  name: string;
  description: string;
  taxRate: number;
  holdingPeriod: string;
  advantages: string[];
  disadvantages: string[];
  bestFor: string;
  color: string;
}

interface ExitStrategyResult {
  investmentAmount: number;
  currentValue: number;
  profit: number;
  strategies: {
    strategy: ExitStrategy;
    taxAmount: number;
    netAmount: number;
    effectiveRate: number;
  }[];
  recommendations: string[];
  bestStrategy: string;
}

const ExitStrategyTaxVisualizer: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [currentValue, setCurrentValue] = useState<string>('');
  const [holdingPeriod, setHoldingPeriod] = useState<string>('1');
  const [result, setResult] = useState<ExitStrategyResult | null>(null);

  const exitStrategies: ExitStrategy[] = [
    {
      name: 'Immediate Exit',
      description: 'Sell immediately regardless of holding period',
      taxRate: 15,
      holdingPeriod: 'Any period',
      advantages: ['Quick liquidity', 'No further market risk', 'Immediate cash flow'],
      disadvantages: ['Highest tax rate', 'No LTCG benefits', 'May trigger STCG'],
      bestFor: 'Emergency funds or urgent cash needs',
      color: 'from-red-500 to-red-600'
    },
    {
      name: 'Wait for LTCG',
      description: 'Hold until qualifying for long-term capital gains',
      taxRate: 10,
      holdingPeriod: '1+ years',
      advantages: ['Lower tax rate', '₹1L annual exemption', 'Better tax efficiency'],
      disadvantages: ['Market risk during holding', 'Delayed liquidity', 'Opportunity cost'],
      bestFor: 'Non-urgent exits with growth potential',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Staggered Exit',
      description: 'Sell in multiple tranches over time',
      taxRate: 12.5,
      holdingPeriod: 'Mixed periods',
      advantages: ['Averaged tax rate', 'Reduced market impact', 'Flexible timing'],
      disadvantages: ['Complex planning', 'Multiple transactions', 'Ongoing monitoring'],
      bestFor: 'Large positions with moderate urgency',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Tax-Loss Harvesting',
      description: 'Offset gains with losses from other investments',
      taxRate: 0,
      holdingPeriod: 'Strategic timing',
      advantages: ['Zero tax liability', 'Portfolio optimization', 'Loss utilization'],
      disadvantages: ['Requires other losses', 'Complex strategy', 'Market timing'],
      bestFor: 'Portfolios with mixed performance',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const calculateExitStrategies = () => {
    const investment = parseFloat(investmentAmount) || 0;
    const current = parseFloat(currentValue) || 0;
    const profit = current - investment;
    const holdingMonths = parseFloat(holdingPeriod) || 1;

    if (profit <= 0) {
      setResult(null);
      return;
    }

    const strategies = exitStrategies.map(strategy => {
      let taxAmount = 0;
      let effectiveRate = 0;

      if (strategy.name === 'Immediate Exit') {
        taxAmount = profit * (strategy.taxRate / 100);
        effectiveRate = strategy.taxRate;
      } else if (strategy.name === 'Wait for LTCG') {
        if (holdingMonths >= 12) {
          const taxableAmount = Math.max(0, profit - 100000);
          taxAmount = taxableAmount * (strategy.taxRate / 100);
          effectiveRate = taxableAmount > 0 ? (taxAmount / profit) * 100 : 0;
        } else {
          taxAmount = profit * 15 / 100;
          effectiveRate = 15;
        }
      } else if (strategy.name === 'Staggered Exit') {
        const immediateTax = (profit * 0.5) * 15 / 100;
        const futureTax = (profit * 0.5) * 10 / 100;
        taxAmount = immediateTax + futureTax;
        effectiveRate = (taxAmount / profit) * 100;
      } else if (strategy.name === 'Tax-Loss Harvesting') {
        taxAmount = 0;
        effectiveRate = 0;
      }

      return {
        strategy,
        taxAmount,
        netAmount: profit - taxAmount,
        effectiveRate
      };
    });

    const recommendations: string[] = [];
    const bestStrategy = strategies.reduce((best, current) => 
      current.netAmount > best.netAmount ? current : best
    );

    if (holdingMonths < 12) {
      recommendations.push('Consider waiting for LTCG qualification to reduce tax burden');
    }

    if (profit > 100000) {
      recommendations.push('Plan exits to maximize ₹1L annual exemption benefit');
    }

    if (profit > 500000) {
      recommendations.push('Consider staggered exit to reduce market impact and optimize timing');
    }

    setResult({
      investmentAmount: investment,
      currentValue: current,
      profit,
      strategies,
      recommendations,
      bestStrategy: bestStrategy.strategy.name
    });
  };

  const resetForm = () => {
    setInvestmentAmount('');
    setCurrentValue('');
    setHoldingPeriod('1');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="Exit Strategy Tax Visualizer - Investment Exit Tax Calculator | MoneyCal"
        description="Visualize and compare tax implications of different investment exit strategies. Plan your exits to minimize tax burden and maximize returns with our advanced exit strategy calculator."
        keywords="exit strategy tax Calculator, investment exit planning, capital gains tax optimization, LTCG STCG Calculator, tax-efficient exits, investment withdrawal strategy"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <section className="py-16 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Exit Strategy Tax Visualizer
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Plan your investment exits to minimize tax burden and maximize returns
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <IndianRupee className="h-6 w-6 mr-3 text-purple-600" />
                  Exit Strategy Calculator
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="100000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Value (₹)
                    </label>
                    <input
                      type="number"
                      value={currentValue}
                      onChange={(e) => setCurrentValue(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="150000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Holding Period (Months)
                    </label>
                    <input
                      type="number"
                      value={holdingPeriod}
                      onChange={(e) => setHoldingPeriod(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="12"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateExitStrategies}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                    >
                      Analyze Strategies
                    </button>
                    <button
                      onClick={resetForm}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                {result && (
                  <>
                    <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-green-500">
                      <div className="flex items-center mb-4">
                        <Target className="h-5 w-5 text-green-500" />
                        <h3 className="text-xl font-semibold text-gray-900 ml-2">
                          Exit Analysis Summary
                        </h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            ₹{result.profit.toLocaleString()}
                          </div>
                          <div className="text-sm text-green-700">Total Profit</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {result.bestStrategy}
                          </div>
                          <div className="text-sm text-blue-700">Best Strategy</div>
                        </div>
                      </div>

                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-3xl font-bold text-gray-900">
                          ₹{Math.max(...result.strategies.map(s => s.netAmount)).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Maximum Net Amount</div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Info className="h-5 w-5 mr-2 text-blue-500" />
                        Recommendations
                      </h3>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 bg-white rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-2 text-purple-500" />
                  Strategy Comparison
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {result.strategies.map((strategy, index) => (
                    <div key={index} className={`bg-gradient-to-br ${strategy.strategy.color} rounded-xl p-6 text-white`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{strategy.strategy.name}</h3>
                        {strategy.strategy.name === result.bestStrategy && (
                          <CheckCircle className="h-5 w-5 text-yellow-300" />
                        )}
                      </div>
                      
                      <p className="text-sm opacity-90 mb-4">{strategy.strategy.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">₹{strategy.taxAmount.toLocaleString()}</div>
                          <div className="text-xs opacity-80">Tax Amount</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">₹{strategy.netAmount.toLocaleString()}</div>
                          <div className="text-xs opacity-80">Net Amount</div>
                        </div>
                      </div>
                      
                      <div className="text-center p-2 bg-white/20 rounded-lg">
                        <div className="text-lg font-semibold">{strategy.effectiveRate.toFixed(1)}%</div>
                        <div className="text-xs opacity-80">Effective Tax Rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-white mt-8"
            >
              <h2 className="text-2xl font-semibold mb-6">Related Tax Tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <a 
                  href="/tax-tools/stcg-ltcg-classifier" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">STCG vs LTCG</h3>
                  <p className="text-sm opacity-90">Classify your capital gains</p>
                </a>
                <a 
                  href="/tax-tools/short-term-loss-offset-visualizer" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Loss Offset</h3>
                  <p className="text-sm opacity-90">Optimize loss utilization</p>
                </a>
                <a 
                  href="/tax-tools/tax-efficient-withdrawal-planner" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Withdrawal Planner</h3>
                  <p className="text-sm opacity-90">Plan tax-efficient withdrawals</p>
                </a>
                <a 
                  href="/tax-tools/offset-ltcg-with-annual-exemptions-tool" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">LTCG Exemptions</h3>
                  <p className="text-sm opacity-90">Maximize annual exemptions</p>
                </a>
              </div>
            </motion.div>

            <WhatsAppBanner />
            <AstroFinanceButton />
          </div>
        </section>
      </div>
    </>
  );
};

export default ExitStrategyTaxVisualizer;
