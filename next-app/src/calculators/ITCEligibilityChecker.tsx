import React, { useState } from 'react';
import { ShieldCheck, CheckCircle, XCircle, AlertTriangle, Info, FileText, Package, Users, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

interface ITCCheck {
  category: string;
  isEligible: boolean;
  reason: string;
}

export const ITCEligibilityChecker: React.FC = () => {
  const [purchaseType, setPurchaseType] = useState<string>('');
  const [businessUse, setBusinessUse] = useState<string>('');
  const [supplierType, setSupplierType] = useState<string>('');
  const [documentAvailable, setDocumentAvailable] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [checks, setChecks] = useState<ITCCheck[]>([]);
  const [finalEligibility, setFinalEligibility] = useState<boolean>(false);

  const checkITCEligibility = () => {
    const results: ITCCheck[] = [];
    let eligible = true;

    // Check 1: Purchase Type
    if (purchaseType === 'capital-goods') {
      results.push({
        category: 'Purchase Type',
        isEligible: true,
        reason: '✅ Capital goods are eligible for ITC'
      });
    } else if (purchaseType === 'input-goods') {
      results.push({
        category: 'Purchase Type',
        isEligible: true,
        reason: '✅ Input goods used in business are eligible'
      });
    } else if (purchaseType === 'input-services') {
      results.push({
        category: 'Purchase Type',
        isEligible: true,
        reason: '✅ Input services used in business are eligible'
      });
    } else if (purchaseType === 'motor-vehicle') {
      if (businessUse === 'goods-transport') {
        results.push({
          category: 'Purchase Type',
          isEligible: true,
          reason: '✅ Motor vehicles for goods transport are eligible'
        });
      } else {
        results.push({
          category: 'Purchase Type',
          isEligible: false,
          reason: '❌ Motor vehicles for passenger transport not eligible'
        });
        eligible = false;
      }
    } else if (purchaseType === 'food-beverages') {
      results.push({
        category: 'Purchase Type',
        isEligible: false,
        reason: '❌ Food and beverages (except for resale) are blocked credit'
      });
      eligible = false;
    } else if (purchaseType === 'personal-use') {
      results.push({
        category: 'Purchase Type',
        isEligible: false,
        reason: '❌ Items for personal use are not eligible'
      });
      eligible = false;
    }

    // Check 2: Business Use
    if (businessUse === 'business-purpose') {
      results.push({
        category: 'Business Use',
        isEligible: true,
        reason: '✅ Used for business purposes'
      });
    } else if (businessUse === 'exempt-supply') {
      results.push({
        category: 'Business Use',
        isEligible: false,
        reason: '❌ Used for making exempt supplies'
      });
      eligible = false;
    } else if (businessUse === 'personal') {
      results.push({
        category: 'Business Use',
        isEligible: false,
        reason: '❌ Used for personal purposes'
      });
      eligible = false;
    }

    // Check 3: Supplier Type
    if (supplierType === 'registered') {
      results.push({
        category: 'Supplier',
        isEligible: true,
        reason: '✅ Supplier is GST registered'
      });
    } else if (supplierType === 'composition') {
      results.push({
        category: 'Supplier',
        isEligible: false,
        reason: '❌ No ITC on purchases from composition dealers'
      });
      eligible = false;
    } else if (supplierType === 'unregistered') {
      results.push({
        category: 'Supplier',
        isEligible: false,
        reason: '❌ Supplier is not GST registered'
      });
      eligible = false;
    }

    // Check 4: Documentation
    if (documentAvailable) {
      results.push({
        category: 'Documentation',
        isEligible: true,
        reason: '✅ Tax invoice available'
      });
    } else {
      results.push({
        category: 'Documentation',
        isEligible: false,
        reason: '❌ Valid tax invoice is required for ITC'
      });
      eligible = false;
    }

    // Check 5: Payment Status
    if (paymentStatus === 'paid-180-days') {
      results.push({
        category: 'Payment',
        isEligible: true,
        reason: '✅ Payment made within 180 days'
      });
    } else if (paymentStatus === 'paid-after-180') {
      results.push({
        category: 'Payment',
        isEligible: false,
        reason: '❌ Payment not made within 180 days - ITC will be reversed'
      });
      eligible = false;
    } else if (paymentStatus === 'not-paid') {
      results.push({
        category: 'Payment',
        isEligible: false,
        reason: '⚠️ Payment pending - ITC will be reversed if not paid within 180 days'
      });
    }

    setChecks(results);
    setFinalEligibility(eligible);
  };

  useEffect(() => {
    if (purchaseType && businessUse && supplierType) {
      checkITCEligibility();
    }
  }, [purchaseType, businessUse, supplierType, documentAvailable, paymentStatus]);

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
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              ITC Eligibility Checker
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Check if you can claim Input Tax Credit (ITC) on your purchases. 
            Comprehensive validation based on GST laws and regulations.
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Purchase Details</h2>
              
              <div className="space-y-6">
                {/* Purchase Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Package className="w-4 h-4 inline mr-2" />
                    What did you purchase?
                  </label>
                  <select
                    value={purchaseType}
                    onChange={(e) => setPurchaseType(e.target.value)}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select purchase type</option>
                    <option value="input-goods">Input Goods (for production)</option>
                    <option value="capital-goods">Capital Goods (machinery, equipment)</option>
                    <option value="input-services">Input Services (business services)</option>
                    <option value="motor-vehicle">Motor Vehicle</option>
                    <option value="food-beverages">Food & Beverages</option>
                    <option value="personal-use">Personal Use Items</option>
                  </select>
                </div>

                {/* Business Use */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Truck className="w-4 h-4 inline mr-2" />
                    How will you use it?
                  </label>
                  <select
                    value={businessUse}
                    onChange={(e) => setBusinessUse(e.target.value)}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select usage</option>
                    <option value="business-purpose">For business operations/taxable supplies</option>
                    <option value="goods-transport">For transporting goods</option>
                    <option value="exempt-supply">For making exempt supplies</option>
                    <option value="personal">Personal use</option>
                  </select>
                </div>

                {/* Supplier Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Users className="w-4 h-4 inline mr-2" />
                    Supplier Status
                  </label>
                  <select
                    value={supplierType}
                    onChange={(e) => setSupplierType(e.target.value)}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select supplier type</option>
                    <option value="registered">Registered GST dealer</option>
                    <option value="composition">Composition scheme dealer</option>
                    <option value="unregistered">Unregistered dealer</option>
                  </select>
                </div>

                {/* Documentation */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Documentation
                  </label>
                  <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={documentAvailable}
                      onChange={(e) => setDocumentAvailable(e.target.checked)}
                      className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                    />
                    <span className="ml-3 text-gray-800">I have a valid tax invoice</span>
                  </label>
                </div>

                {/* Payment Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Payment Status
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select payment status</option>
                    <option value="paid-180-days">Paid within 180 days</option>
                    <option value="paid-after-180">Paid after 180 days</option>
                    <option value="not-paid">Not yet paid</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {checks.length > 0 && (
              <>
                {/* Final Result */}
                <div className={`rounded-2xl shadow-xl p-8 border-2 ${
                  finalEligibility
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                    : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-300'
                }`}>
                  <div className="flex items-center mb-6">
                    {finalEligibility ? (
                      <CheckCircle className="w-12 h-12 text-green-600 mr-4" />
                    ) : (
                      <XCircle className="w-12 h-12 text-red-600 mr-4" />
                    )}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {finalEligibility ? 'ITC Eligible!' : 'ITC Not Eligible'}
                      </h2>
                      <p className="text-gray-600">
                        {finalEligibility 
                          ? 'You can claim Input Tax Credit on this purchase'
                          : 'You cannot claim ITC - see reasons below'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detailed Checks */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Eligibility Checks</h3>
                  <div className="space-y-3">
                    {checks.map((check, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-xl border-2 ${
                          check.isEligible
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-start">
                          {check.isEligible ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                          )}
                          <div>
                            <div className="font-semibold text-gray-900 mb-1">{check.category}</div>
                            <div className="text-sm text-gray-700">{check.reason}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Blocked Credits Info */}
                <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                  <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Blocked ITC Items
                  </h3>
                  <ul className="space-y-2 text-sm text-orange-800">
                    <li>• Motor vehicles (except for specific business use)</li>
                    <li>• Food and beverages (unless for resale)</li>
                    <li>• Outdoor catering, beauty treatment</li>
                    <li>• Health services, cosmetic surgery</li>
                    <li>• Rent-a-cab, life insurance, health insurance</li>
                    <li>• Travel benefits to employees</li>
                    <li>• Membership of clubs, health & fitness centres</li>
                  </ul>
                </div>
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
            <Info className="w-6 h-6 mr-2 text-teal-600" />
            ITC Eligibility - FAQs
          </h2>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is Input Tax Credit (ITC)?</h3>
              <p className="text-gray-600">
                ITC allows you to claim credit for GST paid on purchases and use it to reduce your GST liability on sales. 
                It helps avoid cascading tax effect.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What are the conditions for claiming ITC?</h3>
              <p className="text-gray-600">
                You must: (1) Have a valid tax invoice, (2) Have received goods/services, 
                (3) Pay supplier within 180 days, (4) File GST returns, (5) Use for business purposes.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I claim ITC on all business expenses?</h3>
              <p className="text-gray-600">
                No, certain items like motor vehicles for personal use, food & beverages (unless for resale), 
                and items listed in Section 17(5) of CGST Act are blocked credits.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What happens if I don't pay supplier within 180 days?</h3>
              <p className="text-gray-600">
                The ITC claimed must be reversed along with interest. You can reclaim it once payment is made.
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
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GST Liability Calculator</div>
              <div className="text-sm text-gray-600">Calculate net liability with ITC</div>
            </a>
            <a
              href="https://moneycal.in/tools/gst-amount-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GST Amount Calculator</div>
              <div className="text-sm text-gray-600">Calculate GST on purchases</div>
            </a>
            <a
              href="https://moneycal.in/tools/reverse-gst-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-300 transition-colors"
            >
              <div className="font-medium text-gray-900">Reverse GST Calculator</div>
              <div className="text-sm text-gray-600">Find base amount</div>
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ITCEligibilityChecker;
