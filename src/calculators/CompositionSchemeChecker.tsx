import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle, XCircle, AlertTriangle, Info, TrendingUp, IndianRupee, FileText, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EligibilityResult {
  isEligible: boolean;
  reasons: string[];
  benefits: string[];
  limitations: string[];
  taxRate: number;
  estimatedTax: number;
  normalTax: number;
  savings: number;
}

export const CompositionSchemeChecker: React.FC = () => {
  const [annualTurnover, setAnnualTurnover] = useState<number>(0);
  const [businessType, setBusinessType] = useState<string>('');
  const [hasInterstate, setHasInterstate] = useState<boolean>(false);
  const [isEcommerce, setIsEcommerce] = useState<boolean>(false);
  const [hasIceCream, setHasIceCream] = useState<boolean>(false);
  const [isManufacturer, setIsManufacturer] = useState<boolean>(false);
  const [isRestaurant, setIsRestaurant] = useState<boolean>(false);
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const checkEligibility = () => {
    const eligibilityReasons: string[] = [];
    const benefits: string[] = [];
    const limitations: string[] = [];
    let isEligible = true;
    let taxRate = 0;

    // Check turnover limit
    if (annualTurnover > 15000000) {
      isEligible = false;
      eligibilityReasons.push('❌ Turnover exceeds ₹1.5 crore limit');
    } else if (annualTurnover > 0) {
      eligibilityReasons.push('✅ Turnover within ₹1.5 crore limit');
    }

    // Check interstate supply
    if (hasInterstate) {
      isEligible = false;
      eligibilityReasons.push('❌ Cannot make inter-state supplies under composition scheme');
    } else {
      eligibilityReasons.push('✅ Only intra-state supplies');
    }

    // Check e-commerce
    if (isEcommerce) {
      isEligible = false;
      eligibilityReasons.push('❌ Cannot supply through e-commerce platforms');
    } else {
      eligibilityReasons.push('✅ Not selling through e-commerce');
    }

    // Check ice cream/pan masala
    if (hasIceCream) {
      isEligible = false;
      eligibilityReasons.push('❌ Cannot manufacture ice cream or pan masala');
    } else {
      eligibilityReasons.push('✅ Not manufacturing restricted items');
    }

    // Determine tax rate based on business type
    if (businessType === 'manufacturer' || isManufacturer) {
      taxRate = 1; // 1% for manufacturers
    } else if (businessType === 'restaurant' || isRestaurant) {
      taxRate = 5; // 5% for restaurants
    } else if (businessType === 'trader') {
      taxRate = 1; // 1% for traders
    } else if (businessType === 'service') {
      taxRate = 6; // 6% for service providers
    }

    // Calculate estimated tax
    const estimatedTax = (annualTurnover * taxRate) / 100;
    const normalTax = (annualTurnover * 18) / 100; // Assuming 18% normal rate
    const savings = normalTax - estimatedTax;

    // Benefits
    if (isEligible) {
      benefits.push('Lower tax rate (' + taxRate + '% vs 18% regular)');
      benefits.push('Simple quarterly return filing (GSTR-4)');
      benefits.push('No need to maintain detailed records');
      benefits.push('Reduced compliance burden');
      benefits.push('No requirement of tax invoice');
      benefits.push('Annual savings of ₹' + savings.toLocaleString('en-IN'));
    }

    // Limitations
    limitations.push('Cannot claim Input Tax Credit (ITC)');
    limitations.push('Cannot make inter-state supplies');
    limitations.push('Cannot supply through e-commerce');
    limitations.push('Cannot issue tax invoices');
    limitations.push('Must mention "composition taxable person" on invoices');

    setResult({
      isEligible,
      reasons: eligibilityReasons,
      benefits,
      limitations,
      taxRate,
      estimatedTax,
      normalTax,
      savings
    });
  };

  useEffect(() => {
    if (annualTurnover > 0 && businessType) {
      checkEligibility();
    }
  }, [annualTurnover, businessType, hasInterstate, isEcommerce, hasIceCream, isManufacturer, isRestaurant]);

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Composition Scheme Eligibility Checker
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Check if you're eligible for GST Composition Scheme. Calculate tax savings and understand benefits & limitations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <IndianRupee className="w-6 h-6 mr-3 text-violet-600" />
                Business Details
              </h2>
              
              <div className="space-y-6">
                {/* Annual Turnover */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Annual Turnover (₹)
                  </label>
                  <input
                    type="number"
                    value={annualTurnover || ''}
                    onChange={(e) => setAnnualTurnover(Number(e.target.value))}
                    placeholder="Enter annual turnover"
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    min="0"
                  />
                  {annualTurnover > 0 && (
                    <p className={`text-sm mt-2 flex items-center ${
                      annualTurnover <= 15000000 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {annualTurnover <= 15000000 ? (
                        <><CheckCircle className="w-4 h-4 mr-1" /> Within ₹1.5 crore limit</>
                      ) : (
                        <><XCircle className="w-4 h-4 mr-1" /> Exceeds ₹1.5 crore limit</>
                      )}
                    </p>
                  )}
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Type of Business
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'manufacturer', label: 'Manufacturer', rate: '1%' },
                      { value: 'trader', label: 'Trader', rate: '1%' },
                      { value: 'restaurant', label: 'Restaurant', rate: '5%' },
                      { value: 'service', label: 'Service Provider', rate: '6%' }
                    ].map(type => (
                      <button
                        key={type.value}
                        onClick={() => setBusinessType(type.value)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          businessType === type.value
                            ? 'border-violet-500 bg-violet-50'
                            : 'border-gray-200 hover:border-violet-300'
                        }`}
                      >
                        <div className="font-semibold">{type.label}</div>
                        <div className="text-sm text-gray-600">Tax: {type.rate}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Checks */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Additional Information
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={hasInterstate}
                        onChange={(e) => setHasInterstate(e.target.checked)}
                        className="w-5 h-5 text-violet-600 rounded focus:ring-violet-500"
                      />
                      <span className="ml-3 text-gray-800">Make inter-state supplies</span>
                    </label>

                    <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={isEcommerce}
                        onChange={(e) => setIsEcommerce(e.target.checked)}
                        className="w-5 h-5 text-violet-600 rounded focus:ring-violet-500"
                      />
                      <span className="ml-3 text-gray-800">Sell through e-commerce platforms</span>
                    </label>

                    <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={hasIceCream}
                        onChange={(e) => setHasIceCream(e.target.checked)}
                        className="w-5 h-5 text-violet-600 rounded focus:ring-violet-500"
                      />
                      <span className="ml-3 text-gray-800">Manufacture ice cream/pan masala</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Composition Scheme Basics
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5" />
                  <span>Simplified tax payment at lower rates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5" />
                  <span>Quarterly GSTR-4 return (instead of monthly)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5" />
                  <span>Reduced compliance burden</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 mr-2 mt-0.5" />
                  <span>Cannot claim Input Tax Credit</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {result && (
              <>
                {/* Eligibility Status */}
                <div className={`rounded-2xl shadow-xl p-8 border-2 ${
                  result.isEligible 
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                    : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-300'
                }`}>
                  <div className="flex items-center mb-6">
                    {result.isEligible ? (
                      <CheckCircle className="w-12 h-12 text-green-600 mr-4" />
                    ) : (
                      <XCircle className="w-12 h-12 text-red-600 mr-4" />
                    )}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {result.isEligible ? 'Eligible for Composition Scheme!' : 'Not Eligible'}
                      </h2>
                      <p className="text-gray-600">
                        {result.isEligible 
                          ? 'You can opt for the composition scheme'
                          : 'You must file regular returns'}
                      </p>
                    </div>
                  </div>

                  {/* Eligibility Reasons */}
                  <div className="space-y-2">
                    {result.reasons.map((reason, index) => (
                      <div key={index} className="flex items-start p-3 bg-white rounded-lg">
                        <span className="text-sm">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tax Comparison */}
                {result.isEligible && annualTurnover > 0 && (
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-3 text-violet-600" />
                      Tax Comparison & Savings
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                        <span className="font-medium text-red-800">Normal Scheme Tax (18%):</span>
                        <span className="font-bold text-red-900">{formatCurrency(result.normalTax)}</span>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                        <span className="font-medium text-green-800">Composition Scheme Tax ({result.taxRate}%):</span>
                        <span className="font-bold text-green-900">{formatCurrency(result.estimatedTax)}</span>
                      </div>

                      <div className="flex justify-between items-center p-5 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl shadow-lg">
                        <span className="font-bold text-white text-lg">Annual Savings:</span>
                        <span className="text-2xl font-bold text-white">{formatCurrency(result.savings)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {result.isEligible && result.benefits.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                      Benefits of Composition Scheme
                    </h3>
                    <ul className="space-y-2 text-sm">
                      {result.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start p-3 bg-green-50 rounded-lg text-green-800">
                          <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Limitations */}
                {result.limitations.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                      Limitations to Consider
                    </h3>
                    <ul className="space-y-2 text-sm">
                      {result.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start p-3 bg-orange-50 rounded-lg text-orange-800">
                          <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center mb-6">
            <Info className="w-6 h-6 mr-2 text-violet-600" />
            Composition Scheme - FAQs
          </h2>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is GST Composition Scheme?</h3>
              <p className="text-gray-600">
                Composition Scheme is a simplified GST payment option for small businesses with turnover up to ₹1.5 crore. 
                It offers lower tax rates and reduced compliance.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What are the tax rates under Composition Scheme?</h3>
              <p className="text-gray-600">
                Manufacturers & Traders: 1%, Restaurants: 5%, Other Service Providers: 6%
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I claim Input Tax Credit under Composition Scheme?</h3>
              <p className="text-gray-600">
                No, composition taxpayers cannot claim Input Tax Credit (ITC) on purchases.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Who cannot opt for Composition Scheme?</h3>
              <p className="text-gray-600">
                Businesses making inter-state supplies, e-commerce sellers, manufacturers of ice cream/pan masala, 
                and businesses with turnover above ₹1.5 crore cannot opt for this scheme.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-gray-50 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related GST Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://moneycal.in/tools/gst-liability-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-violet-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GST Liability Calculator</div>
              <div className="text-sm text-gray-600">Calculate net GST liability</div>
            </a>
            <a
              href="https://moneycal.in/tools/gst-amount-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-violet-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GST Amount Calculator</div>
              <div className="text-sm text-gray-600">Calculate GST on sales</div>
            </a>
            <a
              href="https://moneycal.in/tools/gstr-3b-deadline-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-violet-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GSTR-3B Deadline</div>
              <div className="text-sm text-gray-600">Filing deadline calculator</div>
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CompositionSchemeChecker;
