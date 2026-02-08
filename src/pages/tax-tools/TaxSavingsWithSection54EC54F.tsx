import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, TrendingUp, Shield, Home } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface TaxSavingsResult {
  capitalGain: number;
  section54EC: {
    eligible: boolean;
    maxAmount: number;
    taxSaved: number;
  };
  section54F: {
    eligible: boolean;
    maxAmount: number;
    taxSaved: number;
  };
  section54: {
    eligible: boolean;
    maxAmount: number;
    taxSaved: number;
  };
  totalTaxSaved: number;
  recommendation: string;
}

const TaxSavingsWithSection54EC54F: React.FC = () => {
  const [capitalGain, setCapitalGain] = useState('');
  const [assetType, setAssetType] = useState('property');
  const [incomeSlab, setIncomeSlab] = useState('30');
  const [result, setResult] = useState<TaxSavingsResult | null>(null);

  const calculateTaxSavings = () => {
    if (!capitalGain) {
      alert('Please enter capital gain amount');
      return;
    }

    const gain = parseFloat(capitalGain);
    const slabRate = parseInt(incomeSlab) / 100;

    // Section 54EC (Bonds)
    const section54ECMax = 500000; // ₹50 lakh limit
    const section54ECEligible = gain <= section54ECMax;
    const section54ECTaxSaved = section54ECEligible ? gain * slabRate : 0;

    // Section 54F (Residential Property)
    const section54FMax = 2000000; // ₹2 crore limit
    const section54FEligible = gain <= section54FMax;
    const section54FTaxSaved = section54FEligible ? gain * slabRate : 0;

    // Section 54 (Residential Property)
    const section54Max = 2000000; // ₹2 crore limit
    const section54Eligible = assetType === 'property' && gain <= section54Max;
    const section54TaxSaved = section54Eligible ? gain * slabRate : 0;

    const totalTaxSaved = section54ECTaxSaved + section54FTaxSaved + section54TaxSaved;
    
    let recommendation = '';
    if (section54ECEligible) {
      recommendation = 'Consider Section 54EC bonds for tax exemption';
    } else if (section54FEligible) {
      recommendation = 'Consider Section 54F for residential property investment';
    } else if (section54Eligible) {
      recommendation = 'Consider Section 54 for residential property reinvestment';
    } else {
      recommendation = 'Explore other tax-saving options or consult a tax advisor';
    }

    setResult({
      capitalGain: gain,
      section54EC: {
        eligible: section54ECEligible,
        maxAmount: section54ECMax,
        taxSaved: section54ECTaxSaved
      },
      section54F: {
        eligible: section54FEligible,
        maxAmount: section54FMax,
        taxSaved: section54FTaxSaved
      },
      section54: {
        eligible: section54Eligible,
        maxAmount: section54Max,
        taxSaved: section54TaxSaved
      },
      totalTaxSaved,
      recommendation
    });
  };

  const resetForm = () => {
    setCapitalGain('');
    setAssetType('property');
    setIncomeSlab('30');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="Tax Savings with Section 54EC, 54F Calculator - Capital Gains Exemption | MoneyCal"
        description="Calculate tax savings from Section 54EC, 54F, and other capital gains exemptions. Plan your investments for maximum tax benefits."
        keywords="Section 54EC calculator, Section 54F calculator, capital gains exemption, tax savings calculator"
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
                Tax Savings with Section 54EC, 54F
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Calculate tax savings from capital gains exemptions
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
                  Capital Gain Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capital Gain Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={capitalGain}
                      onChange={(e) => setCapitalGain(e.target.value)}
                      placeholder="Enter capital gain amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asset Type
                    </label>
                    <select
                      value={assetType}
                      onChange={(e) => setAssetType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="property">Residential Property</option>
                      <option value="land">Land</option>
                      <option value="bonds">Bonds</option>
                      <option value="shares">Shares</option>
                    </select>
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
                      onClick={calculateTaxSavings}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Savings
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
                  Tax Savings Analysis
                </h2>

                {result ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-blue-600">Capital Gain</p>
                        <p className="text-xl font-bold text-blue-900">₹{result.capitalGain.toLocaleString()}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-green-600">Total Tax Saved</p>
                        <p className="text-xl font-bold text-green-900">₹{result.totalTaxSaved.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${result.section54EC.eligible ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                        <h3 className="font-semibold text-gray-900 mb-2">Section 54EC (Bonds)</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Eligible:</span>
                            <span className={result.section54EC.eligible ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                              {result.section54EC.eligible ? 'Yes' : 'No'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Max Amount:</span>
                            <span>₹{result.section54EC.maxAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax Saved:</span>
                            <span className="font-semibold text-green-600">₹{result.section54EC.taxSaved.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg ${result.section54F.eligible ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                        <h3 className="font-semibold text-gray-900 mb-2">Section 54F (Residential Property)</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Eligible:</span>
                            <span className={result.section54F.eligible ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                              {result.section54F.eligible ? 'Yes' : 'No'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Max Amount:</span>
                            <span>₹{result.section54F.maxAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax Saved:</span>
                            <span className="font-semibold text-green-600">₹{result.section54F.taxSaved.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg ${result.section54.eligible ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                        <h3 className="font-semibold text-gray-900 mb-2">Section 54 (Property Reinvestment)</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Eligible:</span>
                            <span className={result.section54.eligible ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                              {result.section54.eligible ? 'Yes' : 'No'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Max Amount:</span>
                            <span>₹{result.section54.maxAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax Saved:</span>
                            <span className="font-semibold text-green-600">₹{result.section54.taxSaved.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
                      <h3 className="font-semibold text-yellow-900 mb-2">Recommendation</h3>
                      <p className="text-yellow-800">{result.recommendation}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter capital gain details to calculate tax savings</p>
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

export default TaxSavingsWithSection54EC54F;
