import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Info,
  FileText,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Download,
  Share2
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface LossOffsetResult {
  totalSTGains: number;
  totalSTLosses: number;
  totalLTGains: number;
  totalLTLosses: number;
  netSTGains: number;
  netLTGains: number;
  stLossOffset: number;
  ltLossOffset: number;
  carryForwardLoss: number;
  finalTaxableGains: number;
  recommendations: string[];
  status: 'success' | 'warning' | 'info';
  icon: React.ReactNode;
}

const ShortTermLossOffsetVisualizer: React.FC = () => {
  const [stGains, setStGains] = useState<string>('');
  const [stLosses, setStLosses] = useState<string>('');
  const [ltGains, setLtGains] = useState<string>('');
  const [ltLosses, setLtLosses] = useState<string>('');
  const [result, setResult] = useState<LossOffsetResult | null>(null);

  const calculateLossOffset = () => {
    const stG = parseFloat(stGains) || 0;
    const stL = parseFloat(stLosses) || 0;
    const ltG = parseFloat(ltGains) || 0;
    const ltL = parseFloat(ltLosses) || 0;

    // Calculate net gains/losses
    const netSTGains = stG - stL;
    const netLTGains = ltG - ltL;

    // Loss offset rules
    let stLossOffset = 0;
    let ltLossOffset = 0;
    let carryForwardLoss = 0;
    let finalTaxableGains = 0;

    // ST losses can offset ST gains first, then LT gains
    if (stL > stG) {
      stLossOffset = stG; // Offset all ST gains
      const remainingSTLoss = stL - stG;
      
      if (remainingSTLoss > ltG) {
        ltLossOffset = ltG; // Offset all LT gains
        carryForwardLoss = remainingSTLoss - ltG; // Carry forward remaining
        finalTaxableGains = 0;
      } else {
        ltLossOffset = remainingSTLoss; // Offset partial LT gains
        finalTaxableGains = ltG - remainingSTLoss;
      }
    } else {
      stLossOffset = stL; // Offset partial ST gains
      finalTaxableGains = stG - stL + ltG;
    }

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (carryForwardLoss > 0) {
      recommendations.push(`Carry forward ₹${carryForwardLoss.toLocaleString()} for next 8 years`);
    }
    
    if (netSTGains > 0) {
      recommendations.push('Consider holding investments longer to qualify for LTCG benefits');
    }
    
    if (stL > stG) {
      recommendations.push('Maximize ST loss utilization against LT gains this year');
    }

    let status: 'success' | 'warning' | 'info' = 'info';
    let icon: React.ReactNode = <Info className="h-5 w-5" />;

    if (carryForwardLoss > 0) {
      status = 'warning';
      icon = <AlertTriangle className="h-5 w-5" />;
    } else if (finalTaxableGains === 0) {
      status = 'success';
      icon = <CheckCircle className="h-5 w-5" />;
    }

    setResult({
      totalSTGains: stG,
      totalSTLosses: stL,
      totalLTGains: ltG,
      totalLTLosses: ltL,
      netSTGains,
      netLTGains,
      stLossOffset,
      ltLossOffset,
      carryForwardLoss,
      finalTaxableGains,
      recommendations,
      status,
      icon
    });
  };

  const resetForm = () => {
    setStGains('');
    setStLosses('');
    setLtGains('');
    setLtLosses('');
    setResult(null);
  };

  const exportToCSV = () => {
    if (!result) return;
    
    const csvContent = `Short Term Loss Offset Analysis\n\n` +
      `Short Term Gains,${result.totalSTGains}\n` +
      `Short Term Losses,${result.totalSTLosses}\n` +
      `Long Term Gains,${result.totalLTGains}\n` +
      `Long Term Losses,${result.totalLTLosses}\n` +
      `Net ST Gains,${result.netSTGains}\n` +
      `Net LT Gains,${result.netLTGains}\n` +
      `ST Loss Offset,${result.stLossOffset}\n` +
      `LT Loss Offset,${result.ltLossOffset}\n` +
      `Carry Forward Loss,${result.carryForwardLoss}\n` +
      `Final Taxable Gains,${result.finalTaxableGains}\n`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'short-term-loss-offset-analysis.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEOHelmet
        title="Short-Term Loss Offset Visualizer - Capital Loss Tax Calculator | MoneyCal"
        description="Visualize and calculate short-term capital loss offset against gains. Understand loss carry forward rules and optimize your tax strategy with our advanced loss offset calculator."
        keywords="short term loss offset, capital loss calculator, loss carry forward, tax loss harvesting, capital gains tax, investment loss offset, tax optimization"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Short-Term Loss Offset Visualizer
              </h1>
              <p className="text-xl text-red-100 mb-8">
                Optimize your capital loss utilization and understand carry forward rules
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calculator className="h-6 w-6 mr-3 text-red-600" />
                  Loss Offset Calculator
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short-Term Capital Gains (₹)
                    </label>
                    <input
                      type="number"
                      value={stGains}
                      onChange={(e) => setStGains(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short-Term Capital Losses (₹)
                    </label>
                    <input
                      type="number"
                      value={stLosses}
                      onChange={(e) => setStLosses(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Long-Term Capital Gains (₹)
                    </label>
                    <input
                      type="number"
                      value={ltGains}
                      onChange={(e) => setLtGains(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Long-Term Capital Losses (₹)
                    </label>
                    <input
                      type="number"
                      value={ltLosses}
                      onChange={(e) => setLtLosses(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateLossOffset}
                      className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-200"
                    >
                      Calculate Offset
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

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                {result && (
                  <>
                    {/* Summary Card */}
                    <div className={`bg-white rounded-2xl shadow-xl p-6 border-l-4 ${
                      result.status === 'success' ? 'border-green-500' :
                      result.status === 'warning' ? 'border-orange-500' : 'border-blue-500'
                    }`}>
                      <div className="flex items-center mb-4">
                        {result.icon}
                        <h3 className="text-xl font-semibold text-gray-900 ml-2">
                          Loss Offset Summary
                        </h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            ₹{result.stLossOffset.toLocaleString()}
                          </div>
                          <div className="text-sm text-green-700">ST Loss Offset</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            ₹{result.ltLossOffset.toLocaleString()}
                          </div>
                          <div className="text-sm text-blue-700">LT Loss Offset</div>
                        </div>
                      </div>

                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-3xl font-bold text-gray-900">
                          ₹{result.finalTaxableGains.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Final Taxable Gains</div>
                      </div>

                      {result.carryForwardLoss > 0 && (
                        <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                          <div className="text-lg font-semibold text-orange-700">
                            Carry Forward: ₹{result.carryForwardLoss.toLocaleString()}
                          </div>
                          <div className="text-sm text-orange-600">
                            Available for next 8 years
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Recommendations */}
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

                    {/* Export Options */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Results</h3>
                      <div className="flex space-x-3">
                        <button
                          onClick={exportToCSV}
                          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export CSV
                        </button>
                        <button
                          onClick={() => navigator.share && navigator.share({
                            title: 'Short-Term Loss Offset Analysis',
                            text: `Final Taxable Gains: ₹${result.finalTaxableGains.toLocaleString()}`,
                            url: window.location.href
                          })}
                          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {/* Information Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Info className="h-6 w-6 mr-2 text-red-500" />
                Short-Term Loss Offset Rules
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Offset Priority</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <TrendingDown className="h-4 w-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                      <span>ST losses first offset ST gains</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                      <span>Remaining ST losses offset LT gains</span>
                    </li>
                    <li className="flex items-start">
                      <Calendar className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      <span>Unused losses carried forward for 8 years</span>
                    </li>
                    <li className="flex items-start">
                      <DollarSign className="h-4 w-4 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                      <span>LT losses can only offset LT gains</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Points</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <FileText className="h-4 w-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                      <span>Report all losses in ITR for carry forward</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 text-orange-500 flex-shrink-0" />
                      <span>Losses expire after 8 years if not utilized</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      <span>Wash sale rules apply to prevent abuse</span>
                    </li>
                    <li className="flex items-start">
                      <Info className="h-4 w-4 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                      <span>Consider tax-loss harvesting strategies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Related Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 text-white mt-8"
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
                  href="/tax-tools/equity-tax-estimator" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Equity Tax Estimator</h3>
                  <p className="text-sm opacity-90">Calculate equity investment taxes</p>
                </a>
                <a 
                  href="/tax-tools/tax-efficient-withdrawal-planner" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Withdrawal Planner</h3>
                  <p className="text-sm opacity-90">Plan tax-efficient withdrawals</p>
                </a>
                <a 
                  href="/tax-tools/capital-gains-annual-summary-generator" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Annual Summary</h3>
                  <p className="text-sm opacity-90">Generate capital gains summary</p>
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

export default ShortTermLossOffsetVisualizer;


