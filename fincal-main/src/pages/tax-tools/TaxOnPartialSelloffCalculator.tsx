import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, TrendingUp, PieChart } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface PartialSelloffResult {
  totalShares: number;
  sharesSold: number;
  sharesRemaining: number;
  averageCost: number;
  salePrice: number;
  saleProceeds: number;
  capitalGain: number;
  taxAmount: number;
  netProceeds: number;
  holdingPeriod: string;
  taxType: string;
  taxRate: number;
}

const TaxOnPartialSelloffCalculator: React.FC = () => {
  const [totalShares, setTotalShares] = useState('');
  const [sharesSold, setSharesSold] = useState('');
  const [averageCost, setAverageCost] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [saleDate, setSaleDate] = useState('');
  const [result, setResult] = useState<PartialSelloffResult | null>(null);

  const calculateTax = () => {
    if (!totalShares || !sharesSold || !averageCost || !salePrice || !purchaseDate || !saleDate) {
      alert('Please fill in all fields');
      return;
    }

    const total = parseInt(totalShares);
    const sold = parseInt(sharesSold);
    const cost = parseFloat(averageCost);
    const price = parseFloat(salePrice);

    if (sold > total) {
      alert('Shares sold cannot be more than total shares');
      return;
    }

    const remaining = total - sold;
    const soldCost = sold * cost;
    const saleProceeds = sold * price;
    const capitalGain = saleProceeds - soldCost;

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
      taxRate = 15;
    } else {
      holdingPeriod = `${Math.floor(daysDiff / 365)} years`;
      taxType = 'LTCG';
      taxRate = 10;
    }

    const taxAmount = capitalGain > 0 ? (capitalGain * taxRate) / 100 : 0;
    const netProceeds = saleProceeds - taxAmount;

    setResult({
      totalShares: total,
      sharesSold: sold,
      sharesRemaining: remaining,
      averageCost: cost,
      salePrice: price,
      saleProceeds,
      capitalGain,
      taxAmount,
      netProceeds,
      holdingPeriod,
      taxType,
      taxRate
    });
  };

  const resetForm = () => {
    setTotalShares('');
    setSharesSold('');
    setAverageCost('');
    setSalePrice('');
    setPurchaseDate('');
    setSaleDate('');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="Tax on Partial Selloff Calculator - Calculate Tax on Partial Share Sales | MoneyCal"
        description="Calculate tax implications when selling only a portion of your holdings. Understand STCG vs LTCG tax rates."
        keywords="partial selloff tax calculator, share sale tax, STCG LTCG calculator, capital gains tax"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Tax on Partial Selloff Calculator
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Calculate tax implications when selling only a portion of your holdings
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
                  Selloff Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Shares Owned
                    </label>
                    <input
                      type="number"
                      value={totalShares}
                      onChange={(e) => setTotalShares(e.target.value)}
                      placeholder="Enter total shares owned"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shares to Sell
                    </label>
                    <input
                      type="number"
                      value={sharesSold}
                      onChange={(e) => setSharesSold(e.target.value)}
                      placeholder="Enter shares to sell"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average Cost Price (₹)
                    </label>
                    <input
                      type="number"
                      value={averageCost}
                      onChange={(e) => setAverageCost(e.target.value)}
                      placeholder="Enter average cost per share"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sale Price (₹)
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
                  Tax Analysis
                </h2>

                {result ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <PieChart className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-blue-600">Shares Sold</p>
                        <p className="text-xl font-bold text-blue-900">{result.sharesSold}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-green-600">Remaining</p>
                        <p className="text-xl font-bold text-green-900">{result.sharesRemaining}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Sale Proceeds:</span>
                        <span className="font-bold text-gray-900">₹{result.saleProceeds.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Capital Gain/Loss:</span>
                        <span className={`font-bold ${result.capitalGain > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ₹{result.capitalGain.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-gray-700">Tax Amount:</span>
                        <span className="font-bold text-purple-600">₹{result.taxAmount.toLocaleString()}</span>
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
                    <p className="text-gray-600">Enter selloff details to calculate tax</p>
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

export default TaxOnPartialSelloffCalculator;
