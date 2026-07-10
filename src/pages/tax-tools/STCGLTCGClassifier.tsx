import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, IndianRupee, TrendingUp, TrendingDown, Info, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface TaxResult {
  type: 'STCG' | 'LTCG';
  holdingPeriod: number;
  taxRate: number;
  taxAmount: number;
  netAmount: number;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const STCGLTCGClassifier: React.FC = () => {
  const [purchaseDate, setPurchaseDate] = useState('');
  const [saleDate, setSaleDate] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [result, setResult] = useState<TaxResult | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const calculateTax = () => {
    if (!purchaseDate || !saleDate || !purchasePrice || !salePrice) {
      alert('Please fill in all fields');
      return;
    }

    const purchase = new Date(purchaseDate);
    const sale = new Date(saleDate);
    const holdingPeriod = Math.floor((sale.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24));
    
    const purchaseAmount = parseFloat(purchasePrice);
    const saleAmount = parseFloat(salePrice);
    const profit = saleAmount - purchaseAmount;

    if (profit <= 0) {
      setResult({
        type: 'STCG',
        holdingPeriod,
        taxRate: 0,
        taxAmount: 0,
        netAmount: saleAmount,
        description: 'No tax on losses',
        color: 'text-green-600',
        icon: <CheckCircle className="h-5 w-5" />
      });
      return;
    }

    let taxResult: TaxResult;

    if (holdingPeriod <= 365) {
      // Short Term Capital Gains
      const taxRate = 15; // 15% for STCG
      const taxAmount = (profit * taxRate) / 100;
      taxResult = {
        type: 'STCG',
        holdingPeriod,
        taxRate,
        taxAmount,
        netAmount: saleAmount - taxAmount,
        description: 'Short Term Capital Gains - Taxed at 15%',
        color: 'text-red-600',
        icon: <TrendingUp className="h-5 w-5" />
      };
    } else {
      // Long Term Capital Gains
      const taxRate = 10; // 10% for LTCG above 1 lakh
      const taxableAmount = Math.max(0, profit - 100000); // 1 lakh exemption
      const taxAmount = (taxableAmount * taxRate) / 100;
      taxResult = {
        type: 'LTCG',
        holdingPeriod,
        taxRate,
        taxAmount,
        netAmount: saleAmount - taxAmount,
        description: `Long Term Capital Gains - Taxed at 10% (₹1,00,000 exemption applied)`,
        color: 'text-blue-600',
        icon: <TrendingDown className="h-5 w-5" />
      };
    }

    setResult(taxResult);
  };

  const resetForm = () => {
    setPurchaseDate('');
    setSaleDate('');
    setPurchasePrice('');
    setSalePrice('');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="STCG vs LTCG Classifier - Capital Gains Tax Calculator | MoneyCal"
        description="Calculate Short Term vs Long Term Capital Gains tax. Determine your holding period, tax rates, and net gains with our advanced STCG LTCG classifier tool."
        keywords="STCG LTCG Calculator, capital gains tax, short term capital gains, long term capital gains, tax Calculator, investment tax, stock market tax"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                STCG vs LTCG Classifier
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Determine your capital gains tax category and calculate tax liability with precision
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <IndianRupee className="h-6 w-6 mr-3 text-blue-600" />
                  Investment Details
                </h2>

                <div className="space-y-6">
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purchase Price (₹)
                    </label>
                    <input
                      type="number"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      placeholder="Enter purchase price"
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
                      placeholder="Enter sale price"
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

              {/* Results */}
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
                    {/* Tax Type Badge */}
                    <div className={`text-center p-4 rounded-lg ${result.type === 'STCG' ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${result.color}`}>
                        {result.icon}
                        <span className="ml-2 text-lg font-bold">{result.type}</span>
                      </div>
                      <p className="text-sm text-gray-600">{result.description}</p>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Holding Period</p>
                        <p className="text-xl font-bold text-gray-900">{result.holdingPeriod} days</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Tax Rate</p>
                        <p className="text-xl font-bold text-gray-900">{result.taxRate}%</p>
                      </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-gray-700">Gross Profit:</span>
                        <span className="font-bold text-green-600">₹{(parseFloat(salePrice) - parseFloat(purchasePrice)).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-gray-700">Tax Amount:</span>
                        <span className="font-bold text-red-600">₹{result.taxAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-700">Net Amount:</span>
                        <span className="font-bold text-blue-600">₹{result.netAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <IndianRupee className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter your investment details to calculate tax liability</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Understanding STCG vs LTCG
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Short Term Capital Gains (STCG)
                  </h3>
                  <ul className="space-y-2 text-red-700">
                    <li>• Holding period: &le; 365 days</li>
                    <li>• Tax rate: 15%</li>
                    <li>• No exemption limit</li>
                    <li>• Applies to equity shares, mutual funds</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <TrendingDown className="h-5 w-5 mr-2" />
                    Long Term Capital Gains (LTCG)
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Holding period: &gt; 365 days</li>
                    <li>• Tax rate: 10%</li>
                    <li>• ₹1,00,000 exemption per year</li>
                    <li>• Applies to equity shares, mutual funds</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Notes
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• This Calculator is for educational purposes</li>
                  <li>• Consult a tax professional for accurate calculations</li>
                  <li>• Tax rates may vary based on individual circumstances</li>
                  <li>• Consider other deductions and exemptions</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default STCGLTCGClassifier;
