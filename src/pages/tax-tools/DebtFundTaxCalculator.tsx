import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Info, TrendingUp, BarChart3 } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


interface DebtFundResult {
  normalTax: number;
  stcgTax: number;
  difference: number;
  recommendation: string;
}

const DebtFundTaxCalculator: React.FC = () => {
  const [gainAmount, setGainAmount] = useState('');
  const [incomeSlab, setIncomeSlab] = useState('30');
  const [result, setResult] = useState<DebtFundResult | null>(null);

  const calculateTax = () => {
    if (!gainAmount) {
      alert('Please enter gain amount');
      return;
    }

    const gain = parseFloat(gainAmount);
    const slabRate = parseInt(incomeSlab) / 100;

    // Normal tax (as per income slab)
    const normalTax = gain * slabRate;
    
    // STCG tax (20% with indexation)
    const stcgTax = gain * 0.20;
    
    const difference = normalTax - stcgTax;
    const recommendation = difference > 0 
      ? 'STCG option is more beneficial'
      : 'Normal tax slab is more beneficial';

    setResult({
      normalTax,
      stcgTax,
      difference,
      recommendation
    });
  };

  const resetForm = () => {
    setGainAmount('');
    setIncomeSlab('30');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="Debt Fund Tax Calculator - Normal vs STCG Rates | MoneyCal"
        description="Compare tax implications of normal vs STCG rates for debt funds."
        keywords="debt fund tax Calculator, STCG Calculator, mutual fund tax"
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Debt Fund Tax Calculator
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Compare normal vs STCG rates for debt funds
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
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <IndianRupee className="h-6 w-6 mr-3 text-blue-600" />
                  Gain Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gain Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={gainAmount}
                      onChange={(e) => setGainAmount(e.target.value)}
                      placeholder="Enter gain amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Income Tax Slab (%)
                    </label>
                    <select
                      value={incomeSlab}
                      onChange={(e) => setIncomeSlab(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="5">5% (Up to ₹2.5L)</option>
                      <option value="20">20% (₹2.5L - ₹5L)</option>
                      <option value="30">30% (Above ₹5L)</option>
                    </select>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateTax}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Tax
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
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
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Info className="h-6 w-6 mr-3 text-blue-600" />
                  Tax Comparison
                </h2>

                {result ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-blue-600">Normal Tax</p>
                        <p className="text-xl font-bold text-blue-900">₹{result.normalTax.toLocaleString()}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-green-600">STCG Tax</p>
                        <p className="text-xl font-bold text-green-900">₹{result.stcgTax.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
                      <h3 className="font-semibold text-purple-900 mb-2">Difference</h3>
                      <p className={`text-lg font-bold ${result.difference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{Math.abs(result.difference).toLocaleString()} 
                        {result.difference > 0 ? ' (STCG Better)' : ' (Normal Better)'}
                      </p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-yellow-900 mb-2">Recommendation</h3>
                      <p className="text-yellow-800">{result.recommendation}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <IndianRupee className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter gain details to compare tax rates</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DebtFundTaxCalculator;
