import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, IndianRupee, TrendingUp, TrendingDown, Info, AlertCircle, CheckCircle, XCircle, BarChart3, Calendar, DollarSign, Users } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import CalculatorSchema from '../../components/CalculatorSchema';


interface GiftedSharesTax {
  donorCostPrice: number;
  fairMarketValue: number;
  giftDate: string;
  saleDate: string;
  salePrice: number;
  relationship: string;
  holdingPeriod: number;
  costOfAcquisition: number;
  capitalGain: number;
  taxRate: number;
  taxAmount: number;
  netAmount: number;
  recommendation: string;
  color: string;
  icon: React.ReactNode;
}

const GiftedSharesTaxEstimator: React.FC = () => {
  const [donorCostPrice, setDonorCostPrice] = useState<string>('');
  const [fairMarketValue, setFairMarketValue] = useState<string>('');
  const [giftDate, setGiftDate] = useState<string>('');
  const [saleDate, setSaleDate] = useState<string>('');
  const [salePrice, setSalePrice] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('relative');
  const [taxCalculation, setTaxCalculation] = useState<GiftedSharesTax | null>(null);

  const calculateGiftedSharesTax = () => {
    if (!donorCostPrice || !fairMarketValue || !giftDate || !saleDate || !salePrice) {
      alert('Please fill in all fields');
      return;
    }

    const donorCost = parseFloat(donorCostPrice);
    const fmv = parseFloat(fairMarketValue);
    const saleAmount = parseFloat(salePrice);
    
    const gift = new Date(giftDate);
    const sale = new Date(saleDate);
    const holdingPeriod = Math.floor((sale.getTime() - gift.getTime()) / (1000 * 60 * 60 * 24));
    
    // Cost of acquisition depends on relationship
    let costOfAcquisition: number;
    if (relationship === 'relative') {
      costOfAcquisition = donorCost; // For relatives, donor's cost is considered
    } else {
      costOfAcquisition = fmv; // For non-relatives, FMV at gift date is considered
    }
    
    const capitalGain = saleAmount - costOfAcquisition;
    
    let taxRate: number;
    let recommendation: string;
    let color: string;
    let icon: React.ReactNode;
    
    if (capitalGain <= 0) {
      taxRate = 0;
      recommendation = 'No tax liability - Capital loss or no gain';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else if (holdingPeriod <= 365) {
      taxRate = 15; // STCG
      recommendation = 'Short-term capital gains tax applies';
      color = 'text-orange-600';
      icon = <AlertCircle className="h-5 w-5" />;
    } else {
      taxRate = 10; // LTCG with 1L exemption
      const taxableAmount = Math.max(0, capitalGain - 100000);
      const taxAmount = (taxableAmount * taxRate) / 100;
      recommendation = 'Long-term capital gains tax with ₹1L exemption';
      color = 'text-blue-600';
      icon = <Info className="h-5 w-5" />;
    }
    
    const taxAmount = capitalGain > 0 ? (capitalGain * taxRate) / 100 : 0;
    const netAmount = saleAmount - taxAmount;

    setTaxCalculation({
      donorCostPrice: donorCost,
      fairMarketValue: fmv,
      giftDate,
      saleDate,
      salePrice: saleAmount,
      relationship,
      holdingPeriod,
      costOfAcquisition,
      capitalGain,
      taxRate,
      taxAmount,
      netAmount,
      recommendation,
      color,
      icon
    });
  };

  const resetForm = () => {
    setDonorCostPrice('');
    setFairMarketValue('');
    setGiftDate('');
    setSaleDate('');
    setSalePrice('');
    setRelationship('relative');
    setTaxCalculation(null);
  };

  return (
    <>
      <SEOHelmet
        title="Gifted Shares Tax Estimator - Calculate Tax on Gifted Shares | MoneyCal"
        description="Calculate tax implications on gifted shares. Determine capital gains tax on shares received as gifts with our comprehensive gifted shares tax calculator."
        keywords="Gifted Shares Tax, Income Tax India, Gift Tax Calculator, Capital Gains on Gift"
      />
      <CalculatorSchema 
        name="Gifted Shares Tax Estimator"
        description="Calculate income tax and capital gains on gifted shares. Check tax implications of shares gifted to relatives or non-relatives in India."
        url="/tax-tools/gifted-shares-tax-estimator"
        features={['Gift Tax Exemption', 'Capital Gains Calculation', 'Relative Definition Analysis']}
        category="FinanceApplication"
        faqData={[
          {
            question: 'Are gifted shares taxable in India?',
            answer: 'Shares gifted to specified relatives are exempt from tax. If gifted to non-relatives and value exceeds ₹50,000, it is taxed under Income from Other Sources.'
          }
        ]}
      />
      <WhatsAppBanner />

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
                Gifted Shares Tax Estimator
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Calculate capital gains tax on shares received as gifts from relatives and non-relatives
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
                  Gift Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Donor's Cost Price (₹)
                    </label>
                    <input
                      type="number"
                      value={donorCostPrice}
                      onChange={(e) => setDonorCostPrice(e.target.value)}
                      placeholder="Enter donor's original cost"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fair Market Value at Gift Date (₹)
                    </label>
                    <input
                      type="number"
                      value={fairMarketValue}
                      onChange={(e) => setFairMarketValue(e.target.value)}
                      placeholder="Enter FMV on gift date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gift Date
                    </label>
                    <input
                      type="date"
                      value={giftDate}
                      onChange={(e) => setGiftDate(e.target.value)}
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relationship with Donor
                    </label>
                    <select
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="relative">Relative (Spouse, Parents, Siblings, etc.)</option>
                      <option value="non-relative">Non-Relative</option>
                    </select>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateGiftedSharesTax}
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
                  <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
                  Tax Analysis
                </h2>

                {taxCalculation ? (
                  <div className="space-y-6">
                    {/* Recommendation */}
                    <div className={`text-center p-4 rounded-lg ${taxCalculation.color.includes('green') ? 'bg-green-50 border border-green-200' : taxCalculation.color.includes('orange') ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${taxCalculation.color}`}>
                        {taxCalculation.icon}
                        <span className="ml-2 text-lg font-bold">Tax Status</span>
                      </div>
                      <p className="text-sm text-gray-600">{taxCalculation.recommendation}</p>
                    </div>

                    {/* Cost Basis */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                        <Gift className="h-5 w-5 mr-2" />
                        Cost of Acquisition
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Relationship:</span>
                          <span className="font-bold text-gray-600">{taxCalculation.relationship === 'relative' ? 'Relative' : 'Non-Relative'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Cost Basis:</span>
                          <span className="font-bold text-gray-600">₹{taxCalculation.costOfAcquisition.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Holding Period:</span>
                          <span className="font-bold text-gray-600">{taxCalculation.holdingPeriod} days</span>
                        </div>
                      </div>
                    </div>

                    {/* Capital Gains */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Capital Gains Calculation
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Sale Price:</span>
                          <span className="font-bold text-blue-600">₹{taxCalculation.salePrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Cost of Acquisition:</span>
                          <span className="font-bold text-blue-600">₹{taxCalculation.costOfAcquisition.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Capital Gain:</span>
                          <span className={`font-bold ${taxCalculation.capitalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ₹{taxCalculation.capitalGain.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tax Calculation */}
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                        <DollarSign className="h-5 w-5 mr-2" />
                        Tax Calculation
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Tax Rate:</span>
                          <span className="font-bold text-purple-600">{taxCalculation.taxRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Tax Amount:</span>
                          <span className="font-bold text-purple-600">₹{taxCalculation.taxAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Net Amount:</span>
                          <span className="font-bold text-purple-600">₹{taxCalculation.netAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter gift details to calculate tax liability</p>
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
                Understanding Gifted Shares Tax
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Gifts from Relatives
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• Cost of acquisition = Donor's cost price</li>
                    <li>• No gift tax on transfer</li>
                    <li>• Capital gains calculated from donor's cost</li>
                    <li>• Includes spouse, parents, siblings</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Gifts from Non-Relatives
                  </h3>
                  <ul className="space-y-2 text-orange-700">
                    <li>• Cost of acquisition = FMV at gift date</li>
                    <li>• No gift tax if FMV &le; ₹50,000</li>
                    <li>• Capital gains calculated from FMV</li>
                    <li>• Higher tax implications</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Tax Rules
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• No gift tax on shares received from relatives</li>
                  <li>• Gift tax applies if FMV &gt; ₹50,000 from non-relatives</li>
                  <li>• Capital gains tax applies on sale of gifted shares</li>
                  <li>• Holding period starts from gift date, not donor's purchase date</li>
                </ul>
              </div>

              <div className="mt-8 bg-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Related Capital Gains Tools
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="/tax-tools/stcg-ltcg-classifier" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">STCG vs LTCG Classifier</span>
                    <p className="text-sm text-purple-600">Determine capital gains category</p>
                  </a>
                  <a href="/tax-tools/equity-tax-estimator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Equity Tax Estimator</span>
                    <p className="text-sm text-purple-600">Calculate equity tax by assessment year</p>
                  </a>
                  <a href="/tax-tools/bonus-shares-tax-impact-tool" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Bonus Shares Tax Tool</span>
                    <p className="text-sm text-purple-600">Calculate tax on bonus shares</p>
                  </a>
                  <a href="/tax-tools/capital-gains-annual-summary-generator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Capital Gains Summary</span>
                    <p className="text-sm text-purple-600">Generate annual capital gains report</p>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GiftedSharesTaxEstimator;
