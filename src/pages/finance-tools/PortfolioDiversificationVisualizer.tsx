import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  ArrowLeft, 
  BarChart3,
  PieChart,
  Shield
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface AssetClass {
  name: string;
  allocation: number;
  color: string;
  risk: string;
  return: string;
}

const PortfolioDiversificationVisualizer: React.FC = () => {
  const [assets, setAssets] = useState<AssetClass[]>([
    { name: 'Equity', allocation: 40, color: '#3B82F6', risk: 'High', return: '12-15%' },
    { name: 'Debt', allocation: 30, color: '#10B981', risk: 'Low', return: '6-8%' },
    { name: 'Gold', allocation: 15, color: '#F59E0B', risk: 'Medium', return: '8-10%' },
    { name: 'Real Estate', allocation: 10, color: '#EF4444', risk: 'Medium', return: '10-12%' },
    { name: 'Cash', allocation: 5, color: '#8B5CF6', risk: 'Very Low', return: '3-4%' }
  ]);

  const [totalPortfolio, setTotalPortfolio] = useState(1000000);

  const updateAllocation = (index: number, newAllocation: number) => {
    const newAssets = [...assets];
    newAssets[index].allocation = newAllocation;
    setAssets(newAssets);
  };

  const calculateMetrics = () => {
    const totalAllocation = assets.reduce((sum, asset) => sum + asset.allocation, 0);
    const isBalanced = Math.abs(totalAllocation - 100) < 1;
    
    const portfolioBreakdown = assets.map(asset => ({
      ...asset,
      value: (asset.allocation / 100) * totalPortfolio
    }));

    const riskScores = { 'Very Low': 1, 'Low': 2, 'Medium': 3, 'High': 4, 'Very High': 5 };
    const weightedRiskScore = assets.reduce((score, asset) => 
      score + (asset.allocation / 100) * riskScores[asset.risk as keyof typeof riskScores], 0
    );

    let riskLevel = 'Low';
    if (weightedRiskScore > 3.5) riskLevel = 'High';
    else if (weightedRiskScore > 2.5) riskLevel = 'Medium';

    return {
      totalAllocation,
      isBalanced,
      portfolioBreakdown,
      weightedRiskScore,
      riskLevel
    };
  };

  const result = calculateMetrics();

  return (
    <>
      <SEOHelmet
        title="Portfolio Diversification Visualizer - Asset Allocation Analysis | MoneyCal"
        description="Visualize and analyze your portfolio diversification across asset classes. Optimize your asset allocation with our comprehensive portfolio diversification visualizer."
        keywords="portfolio diversification, asset allocation, investment portfolio, diversification calculator, portfolio analysis, asset classes"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link to="/finance-tools" className="text-white hover:text-indigo-200 transition-colors text-sm md:text-base">
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Back to Finance Tools
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Portfolio Diversification Visualizer
              </h1>
              <p className="text-lg md:text-xl text-indigo-100 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
                Visualize and analyze your portfolio diversification across asset classes
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
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 mr-3 text-indigo-600" />
                  Portfolio Allocation
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Portfolio Value (₹)
                    </label>
                    <input
                      type="number"
                      value={totalPortfolio}
                      onChange={(e) => setTotalPortfolio(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
                      placeholder="1000000"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Asset Allocation (%)</h3>
                    {assets.map((asset, index) => (
                      <div key={asset.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700 flex items-center">
                            <div 
                              className="w-4 h-4 rounded-full mr-2" 
                              style={{ backgroundColor: asset.color }}
                            ></div>
                            {asset.name}
                          </label>
                          <span className="text-sm text-gray-500">{asset.allocation}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={asset.allocation}
                          onChange={(e) => updateAllocation(index, Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, ${asset.color} 0%, ${asset.color} ${asset.allocation}%, #e5e7eb ${asset.allocation}%, #e5e7eb 100%)`
                          }}
                        />
                      </div>
                    ))}
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
                {/* Portfolio Summary */}
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold">Portfolio Summary</h3>
                    <PieChart className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl md:text-3xl font-bold mb-1">{result.totalAllocation.toFixed(1)}%</div>
                      <p className="text-indigo-100 text-sm">Total Allocation</p>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold mb-1">{result.riskLevel}</div>
                      <p className="text-indigo-100 text-sm">Risk Level</p>
                    </div>
                  </div>
                  <div className={`mt-4 p-2 rounded-lg text-sm ${result.isBalanced ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    {result.isBalanced ? '✅ Portfolio is balanced' : '⚠️ Portfolio allocation needs adjustment'}
                  </div>
                </div>

                {/* Asset Breakdown */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <BarChart3 className="h-4 w-4 md:h-5 md:w-5 mr-2 text-indigo-600" />
                    Asset Breakdown
                  </h4>
                  <div className="space-y-3">
                    {result.portfolioBreakdown.map((asset) => (
                      <div key={asset.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-3" 
                            style={{ backgroundColor: asset.color }}
                          ></div>
                          <div>
                            <div className="font-medium text-sm">{asset.name}</div>
                            <div className="text-xs text-gray-500">{asset.risk} Risk • {asset.return} Return</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-sm">₹{asset.value.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">{asset.allocation}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diversification Score */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <Shield className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-600" />
                    Diversification Analysis
                  </h4>
                  <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Diversification Score:</span>
                      <span className="font-semibold text-green-600">
                        {assets.length > 3 ? 'Good' : 'Needs Improvement'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Asset Classes:</span>
                      <span className="font-semibold text-indigo-600">
                        {assets.length} classes
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Largest Allocation:</span>
                      <span className="font-semibold text-orange-600">
                        {Math.max(...assets.map(a => a.allocation))}%
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
                to="/finance-tools/stock-cagr-calculator"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-3 md:mb-4">
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Stock CAGR Calculator</h3>
                <p className="text-gray-600 text-xs md:text-sm">Calculate Compound Annual Growth Rate for stock investments</p>
              </Link>

              <Link
                to="/finance-tools/fd-vs-mutual-fund-return-tool"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-3 md:mb-4">
                  <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">FD vs Mutual Fund Return Tool</h3>
                <p className="text-gray-600 text-xs md:text-sm">Compare Fixed Deposit vs Mutual Fund returns with tax implications</p>
              </Link>

              <Link
                to="/finance-tools/real-vs-nominal-return-calculator"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-3 md:mb-4">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Real vs Nominal Return Calculator</h3>
                <p className="text-gray-600 text-xs md:text-sm">Calculate inflation-adjusted returns to understand true investment performance</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PortfolioDiversificationVisualizer;
