import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Calendar,
  Info,
  FileText,
  Target,
  CheckCircle,
  BarChart3,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

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
      taxRate: 20,
      holdingPeriod: 'Any period',
      advantages: ['Quick liquidity', 'No further market risk', 'Immediate cash flow'],
      disadvantages: ['Highest tax rate (STCG 20%)', 'No LTCG benefits', 'May trigger STCG'],
      bestFor: 'Emergency funds or urgent cash needs',
      color: 'from-red-500 to-red-600'
    },
    {
      name: 'Wait for LTCG',
      description: 'Hold until qualifying for long-term capital gains',
      taxRate: 12.5,
      holdingPeriod: '1+ years',
      advantages: ['Lower tax rate', '₹1.25L annual exemption (Budget 2024)', 'Better tax efficiency'],
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
        const stcgRate = 20; // Budget 2024
        taxAmount = profit * (stcgRate / 100);
        effectiveRate = stcgRate;
      } else if (strategy.name === 'Wait for LTCG') {
        if (holdingMonths >= 12) {
          const ltcgExemption = 125000; // Budget 2024
          const taxableAmount = Math.max(0, profit - ltcgExemption);
          taxAmount = taxableAmount * (12.5 / 100); // LTCG 12.5% Budget 2024
          effectiveRate = taxableAmount > 0 ? (taxAmount / profit) * 100 : 0;
        } else {
          taxAmount = profit * 20 / 100; // STCG 20% Budget 2024
          effectiveRate = 20;
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

    if (profit > 125000) {
      recommendations.push('Plan exits to maximize ₹1.25L annual exemption benefit (Budget 2024)');
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
        title="Exit Strategy Tax Visualizer – LTCG ₹1.25L 2026–2050 | MoneyCal"
        description="Plan and visualize tax implications of different exit strategies. LTCG ₹1.25L exemption, 12.5%. Valid 2026 onwards."
        keywords="exit strategy tax calculator India 2026, LTCG STCG exit planner, investment exit tax visualizer, capital gains exit strategy"
        canonicalUrl="/tax-tools/exit-strategy-tax-visualizer"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-600">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/tax-tools" className="hover:text-blue-600">Tax Tools</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium">Exit Strategy Tax Visualizer</span>
            </nav>
          </div>
        </div>
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white pt-12 pb-16">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Tax Planning • Valid 2026–2050
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">
              Exit Strategy Tax Visualizer
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">
              Plan and visualize tax implications of different exit strategies. LTCG ₹1.25L, 12.5%.
            </motion.p>
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
                  <Calculator className="h-6 w-6 mr-3 text-purple-600" />
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

            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Related tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/tax-tools/stcg-ltcg-classifier" className="group flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
                  <ChevronRight className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-indigo-700">STCG vs LTCG Classifier</p>
                    <p className="text-sm text-slate-500">Classify capital gains</p>
                  </div>
                </Link>
                <Link to="/tax-tools/short-term-loss-offset-visualizer" className="group flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
                  <ChevronRight className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-indigo-700">Short-Term Loss Offset</p>
                    <p className="text-sm text-slate-500">Optimize loss utilization</p>
                  </div>
                </Link>
                <Link to="/tax-tools/tax-efficient-withdrawal-planner" className="group flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
                  <ChevronRight className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-indigo-700">Tax-Efficient Withdrawal Planner</p>
                    <p className="text-sm text-slate-500">Plan withdrawals</p>
                  </div>
                </Link>
                <Link to="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="group flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
                  <ChevronRight className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-indigo-700">Offset LTCG with Exemptions</p>
                    <p className="text-sm text-slate-500">Maximize exemption</p>
                  </div>
                </Link>
              </div>
            </section>
            <article className="bg-slate-50 border-t border-slate-200">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 id="exit-guide" className="text-2xl font-bold text-slate-900 mb-4">Exit Strategy Tax Guide (Valid 2026–2050)</h2>
                <p className="text-slate-700 leading-relaxed">
                  Plan exits using LTCG ₹1.25L exemption and 12.5% rate (Budget 2024). Use our <Link to="/tax-tools/exit-strategy-tax-visualizer" className="text-indigo-600 hover:underline font-medium">Exit Strategy Tax Visualizer</Link>, <Link to="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="text-indigo-600 hover:underline font-medium">Offset LTCG with Exemptions Tool</Link>, and <Link to="/tax-tools/tax-efficient-withdrawal-planner" className="text-indigo-600 hover:underline font-medium">Tax-Efficient Withdrawal Planner</Link>. Valid for 2026–2050 unless the law is amended. <a href="https://economictimes.indiatimes.com/wealth/tax/capital-gains-exemption-limit-hiked-to-rs-1-25-lakh-stcg-tax-rate-changed-to-20-ltcg-hiked-to-12-5-on-certain-assets-in-budget-2024/articleshow/111951361.cms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Economic Times – LTCG Budget 2024</a>.
                </p>
              </div>
            </article>
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore more</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Link to="/blog?category=Tax" className="group p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center gap-4">
                  <FileText className="h-10 w-10 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-indigo-700">Tax &amp; investment blog</p>
                    <p className="text-sm text-slate-500">Articles on exits and tax</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 ml-auto" />
                </Link>
                <Link to="/news" className="group p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center gap-4">
                  <ExternalLink className="h-10 w-10 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-indigo-700">Latest news</p>
                    <p className="text-sm text-slate-500">Markets and tax updates</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 ml-auto" />
                </Link>
                <Link to="/tax-tools" className="group p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center gap-4">
                  <Calculator className="h-10 w-10 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-indigo-700">All tax tools</p>
                    <p className="text-sm text-slate-500">Calculators for tax planning</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 ml-auto" />
                </Link>
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default ExitStrategyTaxVisualizer;
