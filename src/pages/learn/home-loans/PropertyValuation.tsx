import React from 'react';
import { MapPin, CheckCircle, AlertCircle, TrendingDown } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const PropertyValuation: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Property Valuation Process for Home Loans: What Banks Check 2025"
        description="How do banks value property for home loans in India? Valuation methods, what if bank value is lower than agreed price, and how to avoid issues!"
        keywords="property valuation home loan, bank property valuation, property valuation process, home valuation for loan"
        canonicalUrl="https://moneycal.in/learn/home-loans/property-valuation"
      />
      
      <LearnLayout
        category="home-loans"
        currentLesson="property-valuation"
        breadcrumb={['Learn', 'Home Loans', 'Property Valuation']}
      >
        {/* What is Valuation */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-6 rounded-r-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What is Property Valuation?</h2>
            <p className="text-gray-700 text-lg">
              <strong>Property valuation</strong> = Bank's engineer inspects property and determines its actual market value (not what seller is asking!).
            </p>
            <div className="mt-4 bg-white rounded-lg p-4 border-2 border-orange-300">
              <p className="font-bold text-orange-900 mb-2">⚠️ Critical Point:</p>
              <p className="text-gray-800">Bank gives loan based on THEIR valuation, NOT your agreement price! If bank values lower, YOU pay the difference!</p>
            </div>
          </div>
        </section>

        {/* Real Problem Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Example: Valuation vs Agreement Price</h2>
          
          <div className="bg-white border-2 border-red-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-red-900 mb-4">Problem Scenario:</h3>
            <div className="space-y-3 text-gray-800">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Agreement Price (What you're paying):</span>
                <strong>₹50,00,000</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Bank's Valuation:</span>
                <strong className="text-red-700">₹45,00,000 ⚠️</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>LTV 80%:</span>
                <strong>80% of ₹45L = ₹36L</strong>
              </div>
              <div className="bg-red-100 rounded-lg p-4 mt-3">
                <div className="flex justify-between py-1">
                  <span>Seller wants:</span>
                  <strong>₹50L</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span>Bank gives:</span>
                  <strong>₹36L (not ₹40L!)</strong>
                </div>
                <div className="flex justify-between py-2 border-t-2 border-red-400 mt-2 text-lg">
                  <span className="font-bold">You must pay:</span>
                  <strong className="text-red-700 text-2xl">₹14L (not ₹10L!)</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-100 rounded-lg border-2 border-yellow-400">
              <p className="font-bold text-yellow-900">Solution:</p>
              <p className="text-gray-800">Get independent valuation BEFORE paying token amount! Negotiate with seller if bank value is lower.</p>
            </div>
          </div>
        </section>

        {/* How Banks Value */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">3 Methods Banks Use for Valuation</h2>
          
          <div className="space-y-4">
            <div className="bg-white border-2 border-blue-300 rounded-lg p-5">
              <h3 className="font-bold text-blue-900 mb-2">1. Comparison Method (Most Common)</h3>
              <p className="text-gray-700">Check recent sales of similar properties in same area. If 3BHK flats sold for ₹45-48L, yours valued at ₹46-47L.</p>
            </div>

            <div className="bg-white border-2 border-green-300 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2">2. Cost Method (For New Construction)</h3>
              <p className="text-gray-700">Land value + Construction cost + Depreciation. Used for newly built or under-construction properties.</p>
            </div>

            <div className="bg-white border-2 border-purple-300 rounded-lg p-5">
              <h3 className="font-bold text-purple-900 mb-2">3. Income Method (For Rental Properties)</h3>
              <p className="text-gray-700">Based on rental income potential. Rarely used for self-occupied homes.</p>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Bank's valuation determines loan amount, NOT agreement price</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">If bank values lower than agreed, YOU pay the difference in down payment</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Get independent valuation BEFORE token to avoid surprises</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Common Mistakes Next! ⚠️</h2>
          <p className="text-blue-100 mb-6">
            Learn the top 10 home loan mistakes Indians make and how to avoid them!
          </p>
          <a
            href="/learn/home-loans/common-mistakes"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Common Mistakes →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default PropertyValuation;


