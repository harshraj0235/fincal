import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { Calculator, AlertTriangle, FileText, DollarSign, Clock, Shield } from 'lucide-react';

const ChequeBounceChargesCalculator: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SEOHelmet
        title="Cheque Bounce Charges Calculator India 2025 - Calculate Penalties & Fees"
        description="Calculate cheque bounce charges, penalties, and fees in India for 2025. Understand RBI guidelines, legal implications, and how to avoid cheque bounce charges. Free online calculator."
        keywords="cheque bounce charges calculator, cheque bounce penalty india, rbi cheque bounce charges, cheque bounce fees 2025, cheque dishonour charges"
        url="/calculators/cheque-bounce-charges-calculator"
        type="website"
        image="/images/cheque-bounce-calculator.jpg"
        tags={["cheque bounce", "banking calculator", "rbi guidelines", "penalty calculator"]}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-12 w-12 text-red-500 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Cheque Bounce Charges Calculator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate cheque bounce charges, penalties, and fees according to RBI guidelines for 2025. 
            Understand the legal implications and avoid unnecessary charges.
          </p>
        </div>

        {/* Main Calculator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Calculator Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Calculator className="h-6 w-6 mr-2 text-blue-600" />
              Calculate Charges
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cheque Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="Enter cheque amount"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Type
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="public">Public Sector Bank</option>
                  <option value="private">Private Sector Bank</option>
                  <option value="foreign">Foreign Bank</option>
                  <option value="cooperative">Cooperative Bank</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Bounce
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="insufficient">Insufficient Funds</option>
                  <option value="signature">Signature Mismatch</option>
                  <option value="stale">Stale Cheque</option>
                  <option value="postdated">Post-dated Cheque</option>
                  <option value="technical">Technical Reasons</option>
                </select>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Calculate Charges
              </button>
            </div>
            
            {/* Results Section */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Estimated Charges</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank Charges:</span>
                  <span className="font-semibold">₹200 - ₹500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Legal Notice Fee:</span>
                  <span className="font-semibold">₹500 - ₹1,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Court Filing Fee:</span>
                  <span className="font-semibold">₹1,000 - ₹2,000</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Estimated:</span>
                  <span className="text-red-600">₹1,700 - ₹3,500</span>
                </div>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="space-y-6">
            {/* RBI Guidelines */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                RBI Guidelines 2025
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>• <strong>Bank Charges:</strong> ₹200-500 per bounced cheque</p>
                <p>• <strong>Legal Action:</strong> Criminal offence under Section 138 of NI Act</p>
                <p>• <strong>Penalty:</strong> Up to 2 years imprisonment or fine up to twice the cheque amount</p>
                <p>• <strong>Compensation:</strong> 20% of cheque amount as compensation</p>
                <p>• <strong>Time Limit:</strong> Legal action must be taken within 30 days of bounce</p>
              </div>
            </div>

            {/* Common Reasons */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                Common Reasons for Cheque Bounce
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>• Insufficient funds in account</p>
                <p>• Signature mismatch or forged signature</p>
                <p>• Stale cheque (older than 3 months)</p>
                <p>• Post-dated cheque presented early</p>
                <p>• Account closed or frozen</p>
                <p>• Technical issues or bank errors</p>
              </div>
            </div>

            {/* Prevention Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                How to Avoid Cheque Bounce
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>• Maintain sufficient balance before issuing cheques</p>
                <p>• Use correct signature as per bank records</p>
                <p>• Issue cheques within validity period</p>
                <p>• Keep track of issued cheques</p>
                <p>• Use digital payment methods when possible</p>
                <p>• Inform bank about any signature changes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Information Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <DollarSign className="h-6 w-6 mr-2 text-green-600" />
            Legal Implications & Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Legal Process</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>1. Notice Period:</strong> 30 days to pay the amount</p>
                <p><strong>2. Legal Notice:</strong> Formal notice through lawyer</p>
                <p><strong>3. Court Filing:</strong> File complaint in magistrate court</p>
                <p><strong>4. Trial:</strong> Court proceedings and evidence</p>
                <p><strong>5. Judgment:</strong> Court decision and penalties</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Penalties & Consequences</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>• Criminal Record:</strong> Permanent criminal record</p>
                <p><strong>• Imprisonment:</strong> Up to 2 years jail term</p>
                <p><strong>• Fine:</strong> Up to twice the cheque amount</p>
                <p><strong>• Compensation:</strong> 20% of cheque amount</p>
                <p><strong>• Legal Costs:</strong> Court fees and lawyer charges</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What is the time limit for legal action after cheque bounce?
              </h3>
              <p className="text-gray-700">
                Legal action must be initiated within 30 days of receiving the cheque bounce memo from the bank. 
                After this period, the right to file a complaint expires.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Can I settle a cheque bounce case out of court?
              </h3>
              <p className="text-gray-700">
                Yes, you can settle the case out of court by paying the cheque amount along with any agreed 
                compensation. This is often the most cost-effective solution for both parties.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What documents are required for filing a cheque bounce complaint?
              </h3>
              <p className="text-gray-700">
                You need the original cheque, bank memo, legal notice copy, proof of service, and any 
                correspondence with the drawer. All documents should be properly attested.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Is cheque bounce a criminal offence?
              </h3>
              <p className="text-gray-700">
                Yes, cheque bounce is a criminal offence under Section 138 of the Negotiable Instruments Act, 
                1881. It can result in imprisonment and fines.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Important Disclaimer
          </h3>
          <p className="text-yellow-700">
            This calculator provides estimated charges based on general guidelines. Actual charges may vary 
            depending on the bank, location, and specific circumstances. For accurate legal advice, please 
            consult with a qualified lawyer or legal professional. The information provided is for educational 
            purposes only and should not be considered as legal advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChequeBounceChargesCalculator; 