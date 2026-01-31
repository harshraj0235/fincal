import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, TrendingUp, Gift, Calendar } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
interface BonusShareResult {
  originalShares: number;
  bonusRatio: string;
  bonusShares: number;
  totalShares: number;
  originalCost: number;
  costPerShare: number;
  holdingPeriod: string;
  taxType: string;
  taxRate: number;
  taxAmount: number;
  netProceeds: number;
}

const TaxOnBonusSharesTracker: React.FC = () => {
  const [originalShares, setOriginalShares] = useState('');
  const [originalCost, setOriginalCost] = useState('');
  const [bonusRatio, setBonusRatio] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [saleDate, setSaleDate] = useState('');
  const [result, setResult] = useState<BonusShareResult | null>(null);

  const calculateBonusTax = () => {
    if (!originalShares || !originalCost || !bonusRatio || !salePrice || !purchaseDate || !saleDate) {
      alert('Please fill in all fields');
      return;
    }

    const original = parseInt(originalShares);
    const cost = parseFloat(originalCost);
    const ratio = bonusRatio; // e.g., "1:1", "2:1"
    const price = parseFloat(salePrice);

    // Parse bonus ratio
    const ratioParts = ratio.split(':');
    const bonusSharesPerOriginal = parseInt(ratioParts[0]) || 1;
    const originalSharesForBonus = parseInt(ratioParts[1]) || 1;
    
    const bonusShares = Math.floor((original * bonusSharesPerOriginal) / originalSharesForBonus);
    const totalShares = original + bonusShares;
    const costPerShare = cost / totalShares;

    // Calculate holding period
    const purchase = new Date(purchaseDate);
    const sale = new Date(saleDate);
    const daysDiff = Math.floor((sale.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24));

    let holdingPeriod = '';
    let taxType = '';
    let taxRate = 0;

    if (daysDiff <= 365) {
      holdingPeriod = `${daysDiff} days`;
      taxType = 'STCG';
      taxRate = 20; // Budget 2024
    } else {
      holdingPeriod = `${Math.floor(daysDiff / 365)} years`;
      taxType = 'LTCG';
      taxRate = 12.5; // Budget 2024
    }

    const saleProceeds = totalShares * price;
    const capitalGain = saleProceeds - cost;
    const taxableGain = taxType === 'LTCG' ? Math.max(0, capitalGain - 125000) : capitalGain;
    const taxAmount = capitalGain > 0 ? (taxableGain * taxRate) / 100 : 0;
    const netProceeds = saleProceeds - taxAmount;

    setResult({
      originalShares: original,
      bonusRatio: ratio,
      bonusShares,
      totalShares,
      originalCost: cost,
      costPerShare,
      holdingPeriod,
      taxType,
      taxRate,
      taxAmount,
      netProceeds
    });
  };

  const resetForm = () => {
    setOriginalShares('');
    setOriginalCost('');
    setBonusRatio('');
    setSalePrice('');
    setPurchaseDate('');
    setSaleDate('');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="Tax on Bonus Shares Tracker - Calculate Bonus Share Tax Implications | MoneyCal"
        description="Track and calculate tax implications of bonus shares. Understand how bonus shares affect your capital gains tax."
        keywords="bonus shares tax calculator, bonus share tracker, capital gains tax, stock bonus tax"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Tax on Bonus Shares Tracker
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Track and calculate tax implications of bonus shares
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
                  <Calculator className="h-6 w-6 mr-3 text-blue-600" />
                  Bonus Share Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Shares
                    </label>
                    <input
                      type="number"
                      value={originalShares}
                      onChange={(e) => setOriginalShares(e.target.value)}
                      placeholder="Enter number of original shares"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Cost (₹)
                    </label>
                    <input
                      type="number"
                      value={originalCost}
                      onChange={(e) => setOriginalCost(e.target.value)}
                      placeholder="Enter total cost of original shares"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bonus Ratio (e.g., 1:1, 2:1)
                    </label>
                    <input
                      type="text"
                      value={bonusRatio}
                      onChange={(e) => setBonusRatio(e.target.value)}
                      placeholder="Enter bonus ratio"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sale Price per Share (₹)
                    </label>
                    <input
                      type="number"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      placeholder="Enter sale price per share"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purchase Date
                    </label>
                    <input
                      type="date"
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sale Date
                    </label>
                    <input
                      type="date"
                      value={saleDate}
                      onChange={(e) => setSaleDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateBonusTax}
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
                  Bonus Share Analysis
                </h2>

                {result ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <Gift className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-blue-600">Bonus Shares</p>
                        <p className="text-xl font-bold text-blue-900">{result.bonusShares}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-green-600">Total Shares</p>
                        <p className="text-xl font-bold text-green-900">{result.totalShares}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Cost per Share:</span>
                        <span className="font-bold text-gray-900">₹{result.costPerShare.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-gray-700">Sale Proceeds:</span>
                        <span className="font-bold text-purple-600">₹{(result.totalShares * parseFloat(salePrice)).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-gray-700">Tax Amount:</span>
                        <span className="font-bold text-red-600">₹{result.taxAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-300">
                        <span className="text-gray-700 font-semibold">Net Proceeds:</span>
                        <span className="font-bold text-green-600">₹{result.netProceeds.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-3">Tax Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-blue-700">Holding Period:</span>
                          <span className="font-semibold text-blue-900">{result.holdingPeriod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Tax Type:</span>
                          <span className="font-semibold text-blue-900">{result.taxType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Tax Rate:</span>
                          <span className="font-semibold text-blue-900">{result.taxRate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter bonus share details to calculate tax</p>
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

export default TaxOnBonusSharesTracker;
