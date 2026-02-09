import React, { useState, useEffect } from 'react';
import { Repeat, CheckCircle, XCircle, AlertTriangle, Info, Calculator, FileText, Users, Package } from 'lucide-react';
import { motion } from 'framer-motion';

interface RCMScenario {
  category: string;
  description: string;
  isRCMApplicable: boolean;
  taxRate: number;
  explanation: string;
}

const rcmScenarios: RCMScenario[] = [
  { category: 'Goods Transport Agency (GTA)', description: 'Services from GTA', isRCMApplicable: true, taxRate: 5, explanation: 'RCM applies on GTA services unless GTA issues invoice with GST' },
  { category: 'Legal Services', description: 'Services from advocate/legal consultant', isRCMApplicable: true, taxRate: 18, explanation: 'RCM applies on legal services from advocates' },
  { category: 'Security Services', description: 'Security guard/agency services', isRCMApplicable: true, taxRate: 18, explanation: 'RCM applies if supplier is individual/partnership' },
  { category: 'Unregistered Supplier', description: 'Purchase from unregistered dealer (above ₹5000/day)', isRCMApplicable: true, taxRate: 18, explanation: 'RCM applies when purchasing from unregistered supplier above threshold' },
  { category: 'Import of Services', description: 'Services from foreign entity', isRCMApplicable: true, taxRate: 18, explanation: 'RCM applies on import of services' },
  { category: 'Sponsorship Services', description: 'Sponsorship from body corporate', isRCMApplicable: true, taxRate: 18, explanation: 'RCM applies on sponsorship services' },
  { category: 'Director Services', description: 'Services by directors to company', isRCMApplicable: true, taxRate: 18, explanation: 'RCM applies on director remuneration' },
  { category: 'E-commerce Services', description: 'Services via e-commerce operator', isRCMApplicable: true, taxRate: 18, explanation: 'E-commerce operator collects and pays GST' },
  { category: 'Regular Goods', description: 'Purchase from registered dealer', isRCMApplicable: false, taxRate: 0, explanation: 'Normal GST applies - supplier charges GST' },
  { category: 'Regular Services', description: 'Services from registered service provider', isRCMApplicable: false, taxRate: 0, explanation: 'Normal GST applies - supplier charges GST' },
];

export const RCMApplicabilityChecker: React.FC = () => {
  const [transactionType, setTransactionType] = useState<string>('');
  const [supplierType, setSupplierType] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('');
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);
  const [result, setResult] = useState<{
    isRCMApplicable: boolean;
    reason: string;
    taxRate: number;
    gstAmount: number;
    steps: string[];
  } | null>(null);

  const checkRCMApplicability = () => {
    let isRCM = false;
    let reason = '';
    let taxRate = 0;
    let steps: string[] = [];

    if (transactionType === 'gta-service') {
      isRCM = true;
      reason = 'RCM applies on Goods Transport Agency services';
      taxRate = 5;
      steps = [
        'Recipient pays GST under RCM',
        'File GSTR-3B and pay 5% GST',
        'Can claim ITC on the same',
        'Ensure proper documentation'
      ];
    } else if (transactionType === 'legal-service') {
      isRCM = true;
      reason = 'RCM applies on legal/advocate services';
      taxRate = 18;
      steps = [
        'Recipient pays 18% GST under RCM',
        'Report in GSTR-3B under RCM',
        'Can claim ITC immediately',
        'Keep invoice and payment proof'
      ];
    } else if (transactionType === 'security-service' && supplierType === 'individual') {
      isRCM = true;
      reason = 'RCM applies on security services from individual/partnership';
      taxRate = 18;
      steps = [
        'Pay 18% GST under RCM',
        'Report in GSTR-3B',
        'Claim ITC if eligible',
        'Maintain service agreement'
      ];
    } else if (transactionType === 'unregistered-purchase') {
      if (purchaseAmount > 5000) {
        isRCM = true;
        reason = 'RCM applies - purchase from unregistered dealer above ₹5000/day';
        taxRate = 18;
        steps = [
          'Pay GST under RCM at applicable rate',
          'Cannot claim ITC (Section 16(4))',
          'Report in GSTR-3B',
          'Keep purchase records'
        ];
      } else {
        isRCM = false;
        reason = 'RCM not applicable - purchase below ₹5000/day threshold';
      }
    } else if (transactionType === 'import-service') {
      isRCM = true;
      reason = 'RCM applies on import of services from abroad';
      taxRate = 18;
      steps = [
        'Pay IGST under RCM',
        'Can claim ITC',
        'Report in GSTR-3B',
        'Keep invoice and remittance proof'
      ];
    } else if (transactionType === 'sponsorship') {
      isRCM = true;
      reason = 'RCM applies on sponsorship services';
      taxRate = 18;
      steps = [
        'Pay 18% GST under RCM',
        'Report in GSTR-3B',
        'Claim ITC if used for business',
        'Maintain agreement copy'
      ];
    } else if (transactionType === 'regular-goods' || transactionType === 'regular-service') {
      isRCM = false;
      reason = 'Normal GST applies - supplier will charge GST';
      steps = [
        'Supplier charges GST on invoice',
        'You pay GST-inclusive amount',
        'Claim ITC if eligible',
        'No RCM compliance required'
      ];
    }

    const gstAmount = (purchaseAmount * taxRate) / 100;

    setResult({
      isRCMApplicable: isRCM,
      reason,
      taxRate,
      gstAmount,
      steps
    });
  };

  useEffect(() => {
    if (transactionType) {
      checkRCMApplicability();
    }
  }, [transactionType, supplierType, serviceType, purchaseAmount]);

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <Repeat className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              RCM Applicability Checker
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Check if Reverse Charge Mechanism (RCM) applies to your transaction. 
            Understand your GST liability and compliance requirements.
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction Details</h2>
              
              <div className="space-y-6">
                {/* Transaction Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Type of Transaction
                  </label>
                  <select
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Select transaction type</option>
                    <option value="gta-service">Goods Transport Agency (GTA) Service</option>
                    <option value="legal-service">Legal/Advocate Services</option>
                    <option value="security-service">Security Services</option>
                    <option value="unregistered-purchase">Purchase from Unregistered Dealer</option>
                    <option value="import-service">Import of Services</option>
                    <option value="sponsorship">Sponsorship Services</option>
                    <option value="regular-goods">Regular Goods Purchase</option>
                    <option value="regular-service">Regular Service Purchase</option>
                  </select>
                </div>

                {/* Supplier Type */}
                {transactionType === 'security-service' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Supplier Type
                    </label>
                    <select
                      value={supplierType}
                      onChange={(e) => setSupplierType(e.target.value)}
                      className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">Select supplier type</option>
                      <option value="individual">Individual/Partnership</option>
                      <option value="company">Company/Body Corporate</option>
                    </select>
                  </div>
                )}

                {/* Purchase Amount */}
                {transactionType === 'unregistered-purchase' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Purchase Amount per Day (₹)
                    </label>
                    <input
                      type="number"
                      value={purchaseAmount || ''}
                      onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                      placeholder="Enter purchase amount"
                      className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500"
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      RCM applies if purchase from same unregistered dealer exceeds ₹5,000 per day
                    </p>
                  </div>
                )}

                {/* General Amount */}
                {transactionType && transactionType !== 'unregistered-purchase' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Transaction Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={purchaseAmount || ''}
                      onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                      placeholder="Enter transaction amount"
                      className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500"
                      min="0"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                What is RCM?
              </h3>
              <p className="text-sm text-blue-800 mb-3">
                Reverse Charge Mechanism (RCM) is when the recipient of goods/services pays GST 
                instead of the supplier. This applies to specific transactions as notified by the government.
              </p>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5" />
                  <span>Recipient pays GST to government</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5" />
                  <span>Can claim ITC (if eligible)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5" />
                  <span>Report in GSTR-3B Table 3.1(d)</span>
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
                {/* RCM Status */}
                <div className={`rounded-2xl shadow-xl p-8 border-2 ${
                  result.isRCMApplicable
                    ? 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-300'
                    : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                }`}>
                  <div className="flex items-center mb-6">
                    {result.isRCMApplicable ? (
                      <AlertTriangle className="w-12 h-12 text-orange-600 mr-4" />
                    ) : (
                      <CheckCircle className="w-12 h-12 text-green-600 mr-4" />
                    )}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {result.isRCMApplicable ? 'RCM Applicable' : 'Normal GST Applies'}
                      </h2>
                      <p className="text-gray-600">{result.reason}</p>
                    </div>
                  </div>

                  {result.isRCMApplicable && result.taxRate > 0 && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                        <span className="font-medium">Transaction Amount:</span>
                        <span className="font-bold">{formatCurrency(purchaseAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                        <span className="font-medium">GST Rate:</span>
                        <span className="font-bold text-orange-600">{result.taxRate}%</span>
                      </div>
                      <div className="flex justify-between items-center p-5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg">
                        <span className="font-bold text-white text-lg">GST You Must Pay:</span>
                        <span className="text-2xl font-bold text-white">{formatCurrency(result.gstAmount)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Steps to Follow */}
                {result.isRCMApplicable && result.steps.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <FileText className="w-6 h-6 mr-2 text-pink-600" />
                      Compliance Steps
                    </h3>
                    <div className="space-y-3">
                      {result.steps.map((step, index) => (
                        <div key={index} className="flex items-start p-4 bg-pink-50 rounded-xl">
                          <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold">
                            {index + 1}
                          </div>
                          <span className="text-gray-800 mt-1">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Common RCM Scenarios */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Common RCM Scenarios</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {rcmScenarios.map((scenario, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${
                        scenario.isRCMApplicable
                          ? 'bg-orange-50 border-orange-200'
                          : 'bg-green-50 border-green-200'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{scenario.category}</div>
                            <div className="text-sm text-gray-600">{scenario.description}</div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                            scenario.isRCMApplicable
                              ? 'bg-orange-500 text-white'
                              : 'bg-green-500 text-white'
                          }`}>
                            {scenario.isRCMApplicable ? 'RCM' : 'Normal'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
            <Info className="w-6 h-6 mr-2 text-pink-600" />
            RCM - FAQs
          </h2>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is Reverse Charge Mechanism (RCM)?</h3>
              <p className="text-gray-600">
                Under RCM, the recipient of goods/services pays GST instead of the supplier. 
                This is applicable to specific transactions notified under GST law.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">When does RCM apply?</h3>
              <p className="text-gray-600">
                RCM applies on: GTA services, legal services, services from directors, imports, 
                purchases from unregistered dealers (above ₹5000/day), and other notified categories.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I claim ITC under RCM?</h3>
              <p className="text-gray-600">
                Yes, if the purchase is eligible for ITC. However, for purchases from unregistered dealers under Section 9(4), 
                ITC cannot be claimed.
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
              href="https://moneycal.in/tools/itc-eligibility-checker"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-pink-300 transition-colors"
            >
              <div className="font-medium text-gray-900">ITC Eligibility Checker</div>
              <div className="text-sm text-gray-600">Check ITC claim eligibility</div>
            </a>
            <a
              href="https://moneycal.in/tools/gst-liability-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-pink-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GST Liability Calculator</div>
              <div className="text-sm text-gray-600">Calculate net GST liability</div>
            </a>
            <a
              href="https://moneycal.in/tools/gst-amount-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-pink-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GST Amount Calculator</div>
              <div className="text-sm text-gray-600">Calculate GST amounts</div>
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default RCMApplicabilityChecker;
