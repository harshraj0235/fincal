import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Home, Car, Briefcase, User } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const DocumentsRequired: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Documents Required for Loan Application in India | Complete Checklist"
        description="Complete document checklist for home, personal, car, business loans. KYC, income proof, address proof, bank statements - everything you need for quick loan approval."
        keywords="loan documents, documents required for loan, home loan documents, personal loan documents, KYC documents, income proof, address proof"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="documents-required"
        breadcrumb={['Learn', 'Loans & Credit', 'Documents Required']}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Documents Required for Any Loan Application
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            लोन के लिए जरूरी documents - Complete Checklist
          </p>

          {/* Universal Documents */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Universal Documents (All Loan Types)</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  1. Identity Proof
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✅ Aadhaar Card</li>
                  <li>✅ PAN Card (mandatory)</li>
                  <li>✅ Passport</li>
                  <li>✅ Voter ID</li>
                  <li>✅ Driving License</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-3">2. Address Proof</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✅ Aadhaar Card</li>
                  <li>✅ Utility bills (&lt;3 months)</li>
                  <li>✅ Rent agreement</li>
                  <li>✅ Property tax receipt</li>
                  <li>✅ Passport</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-3">3. Income Proof</h4>
                <p className="text-xs text-gray-600 mb-2">Salaried:</p>
                <ul className="text-xs text-gray-700 space-y-1 mb-2">
                  <li>✅ Last 3 months salary slips</li>
                  <li>✅ 6 months bank statements</li>
                  <li>✅ Form 16</li>
                  <li>✅ Employment letter</li>
                </ul>
                <p className="text-xs text-gray-600 mb-2">Self-Employed:</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>✅ ITR (last 2-3 years)</li>
                  <li>✅ Profit & Loss statement</li>
                  <li>✅ Balance sheet</li>
                  <li>✅ Bank statements (1 year)</li>
                  <li>✅ Business proof (GST, license)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Loan-Specific Documents */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Loan-Specific Documents</h2>

            {/* Home Loan */}
            <div className="mb-4 bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-3 flex items-center gap-2">
                <Home className="w-6 h-6" />
                Home Loan Additional Documents
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">Property Documents:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Sale deed / Agreement to sell</li>
                    <li>• Chain of title deeds (30 years)</li>
                    <li>• Encumbrance certificate</li>
                    <li>• Property tax receipts</li>
                    <li>• Approved building plan</li>
                    <li>• NOC from society/builder</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">Additional:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Property valuation report</li>
                    <li>• Legal opinion report</li>
                    <li>• Possession letter</li>
                    <li>• Allotment letter</li>
                    <li>• Construction agreement (if under construction)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Car Loan */}
            <div className="mb-4 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Car className="w-6 h-6" />
                Car Loan Additional Documents
              </h3>
              <div className="bg-white p-4 rounded-lg">
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✅ Proforma invoice from dealer</li>
                  <li>✅ Insurance quotation</li>
                  <li>✅ Down payment proof (if paid)</li>
                  <li>✅ Driving license</li>
                  <li>✅ RC (for used car)</li>
                </ul>
              </div>
            </div>

            {/* Business Loan */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-900 mb-3 flex items-center gap-2">
                <Briefcase className="w-6 h-6" />
                Business Loan Additional Documents
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✅ Business registration certificate</li>
                    <li>✅ Partnership deed / MOA-AOA</li>
                    <li>✅ GST registration</li>
                    <li>✅ Shop Act license</li>
                    <li>✅ Trade license</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✅ Last 2 years ITR</li>
                    <li>✅ Audited financials</li>
                    <li>✅ Business bank statements (12 months)</li>
                    <li>✅ Business plan (for new ventures)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Document Preparation Tips */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-yellow-900 mb-4">📋 10 Document Preparation Tips</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Self-attest all copies</strong> (sign, date on each page)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Keep originals ready</strong> for verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Make 2-3 sets</strong> (for multiple banks)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Clear, legible copies</strong> (not faded/torn)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Recent documents</strong> (&lt;3 months for bills)</span>
                </li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Consistent information</strong> (name, address across all docs)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Get property documents verified</strong> by lawyer first</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Highlight key information</strong> (income, employment dates)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Organize in sequence</strong> (as per bank's checklist)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Keep digital copies</strong> (scan everything!)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a href="/learn/loans/compare-loan-offers" className="text-gray-600 hover:text-blue-600">
              ← Previous: Compare Offers
            </a>
            <a href="/learn/loans/common-loan-terms" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Next: Common Loan Terms →
            </a>
          </div>

        </motion.div>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "Documents Required for Loan Application",
            "educationalLevel": "Beginner",
            "inLanguage": ["en", "hi"]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default DocumentsRequired;




