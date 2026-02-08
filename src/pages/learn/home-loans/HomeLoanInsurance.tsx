import React from 'react';
import { Shield, CheckCircle, X, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const HomeLoanInsurance: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Home Loan Insurance: Mandatory vs Optional - Complete Guide 2025"
        description="Complete guide to home loan insurance in India - property insurance (mandatory), life insurance (optional), costs, benefits. Make the right choice!"
        keywords="home loan insurance, property insurance home loan, life insurance home loan, loan protection insurance"
        canonicalUrl="https://moneycal.in/learn/home-loans/home-loan-insurance"
      />
      
      <LearnLayout
        category="home-loans"
        currentLesson="home-loan-insurance"
        breadcrumb={['Learn', 'Home Loans', 'Home Loan Insurance']}
      >
        {/* Two Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">2 Types of Home Loan Insurance</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6">
              <Shield className="h-10 w-10 text-green-600 mb-3" />
              <h3 className="text-2xl font-bold text-green-900 mb-3">1. Property Insurance</h3>
              <div className="bg-white rounded-lg p-4 border-2 border-green-300 mb-3">
                <p className="font-bold text-green-800 text-lg">MANDATORY ✅</p>
                <p className="text-sm text-gray-700">Bank requires this for entire loan tenure</p>
              </div>
              <div className="space-y-2 text-gray-800">
                <p><strong>Covers:</strong> Fire, earthquake, flood, riots</p>
                <p><strong>Cost:</strong> 0.25-0.50% of loan amount/year</p>
                <p><strong>Example:</strong> ₹40L loan = ₹10-20K/year</p>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-6">
              <Shield className="h-10 w-10 text-blue-600 mb-3" />
              <h3 className="text-2xl font-bold text-blue-900 mb-3">2. Life Insurance</h3>
              <div className="bg-white rounded-lg p-4 border-2 border-blue-300 mb-3">
                <p className="font-bold text-blue-800 text-lg">OPTIONAL ⚠️</p>
                <p className="text-sm text-gray-700">Your choice (but recommended!)</p>
              </div>
              <div className="space-y-2 text-gray-800">
                <p><strong>Covers:</strong> Death, critical illness, disability</p>
                <p><strong>Cost:</strong> 0.30-0.80% of loan amount/year</p>
                <p><strong>Example:</strong> ₹40L loan = ₹12-32K/year</p>
              </div>
            </div>
          </div>
        </section>

        {/* Should You Take Life Insurance */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Should You Take Home Loan Life Insurance?</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                Take It If:
              </h3>
              <ul className="ml-6 text-gray-700 list-disc space-y-1">
                <li>You're the SOLE earner in family</li>
                <li>You don't have adequate term insurance already</li>
                <li>Family can't afford EMI if you're gone</li>
                <li>You have dependents (spouse, children, parents)</li>
              </ul>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-5">
              <h3 className="font-bold text-red-900 mb-2 flex items-center">
                <X className="h-6 w-6 mr-2" />
                Skip It If:
              </h3>
              <ul className="ml-6 text-gray-700 list-disc space-y-1">
                <li>You already have ₹50L+ term insurance</li>
                <li>Spouse has good income to manage EMI</li>
                <li>No dependents (single, no parents to support)</li>
                <li>Can buy separate term insurance cheaper</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-yellow-100 border-2 border-yellow-400 rounded-lg p-5">
            <h3 className="font-bold text-yellow-900 mb-2">💡 Smart Tip:</h3>
            <p className="text-gray-800">
              <strong>Bank's life insurance is often 30-40% expensive vs regular term insurance!</strong> Better: Buy separate ₹50L term policy for ₹8-12K/year instead of bank's bundled insurance at ₹25-30K/year. Save ₹15-18K annually!
            </p>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Property insurance MANDATORY (0.25-0.50%/year). Covers fire, natural disasters</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Life insurance OPTIONAL (0.30-0.80%/year). Recommended if sole earner</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Bank's life insurance often 30-40% expensive - buy separate term policy instead!</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Property Valuation Next! 🏠</h2>
          <p className="text-blue-100 mb-6">
            Learn how banks value property and what to do if valuation is lower than agreed price!
          </p>
          <a
            href="/learn/home-loans/property-valuation"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Property Valuation →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default HomeLoanInsurance;


