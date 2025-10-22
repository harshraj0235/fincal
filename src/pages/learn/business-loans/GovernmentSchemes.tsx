import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Award, CheckCircle, ExternalLink, TrendingDown } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const GovernmentSchemes: React.FC = () => {
  return (
    <LearnLayout
      category="business-loans"
      currentLesson="government-schemes"
      breadcrumb={['Learn', 'Business Loans', 'Government Business Loan Schemes']}
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <Globe className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Government Business Loan Schemes 2025 | सरकारी योजनाएं
            </h1>
            <p className="text-orange-100 text-lg">Complete guide to all government schemes - Mudra, Startup India, SIDBI, CGTSME, Stand-Up India</p>
          </div>
        </div>
      </div>

      {/* All Schemes */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Top Government Schemes | शीर्ष सरकारी योजनाएं</h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-xl text-purple-700">1. PMMY (Pradhan Mantri Mudra Yojana)</h4>
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">Most Popular</span>
            </div>
            <p className="text-gray-700 mb-4">Loans up to ₹10 lakh without collateral for micro-enterprises</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm mb-1">Shishu</p>
                <p className="text-2xl font-bold text-purple-600">Up to ₹50,000</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm mb-1">Kishore</p>
                <p className="text-2xl font-bold text-purple-600">₹50K - ₹5L</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm mb-1">Tarun</p>
                <p className="text-2xl font-bold text-purple-600">₹5L - ₹10L</p>
              </div>
            </div>
            <a href="https://www.mudra.org.in/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-purple-600 font-semibold">
              Apply on Mudra Portal <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <h4 className="font-bold text-xl text-blue-700 mb-3">2. CGTMSE (Credit Guarantee Scheme)</h4>
            <p className="text-gray-700 mb-4">75-80% guarantee to banks - Get loans up to ₹2Cr without collateral!</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm mb-1">Coverage:</p>
                <p className="text-2xl font-bold text-blue-600">Up to ₹2 Crore</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm mb-1">Guarantee:</p>
                <p className="text-2xl font-bold text-green-600">75-80%</p>
              </div>
            </div>
            <a href="https://www.cgtmse.in/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-blue-600 font-semibold">
              Learn More <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <h4 className="font-bold text-xl text-green-700 mb-3">3. Stand-Up India Scheme</h4>
            <p className="text-gray-700 mb-4">For SC/ST and women entrepreneurs - ₹10L to ₹1Cr</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm mb-1">Loan Range:</p>
                <p className="text-2xl font-bold text-green-600">₹10L - ₹1Cr</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm mb-1">For:</p>
                <p className="font-bold text-gray-900">Women & SC/ST</p>
              </div>
            </div>
            <a href="https://www.standupmitra.in/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-green-600 font-semibold">
              Apply Now <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* External Links */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">🔗 Official Scheme Portals | आधिकारिक पोर्टल</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <a href="https://www.mudra.org.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-orange-400">
            <span className="font-semibold text-gray-900">Mudra Official</span>
            <ExternalLink className="h-5 w-5 text-orange-600" />
          </a>
          
          <a href="https://www.cgtmse.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-orange-400">
            <span className="font-semibold text-gray-900">CGTMSE Portal</span>
            <ExternalLink className="h-5 w-5 text-orange-600" />
          </a>
          
          <a href="https://www.startupindia.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-orange-400">
            <span className="font-semibold text-gray-900">Startup India</span>
            <ExternalLink className="h-5 w-5 text-orange-600" />
          </a>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/business-loans/tax-benefits" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Next: Tax Benefits</div>
            <div className="text-sm text-orange-100">Deductions on business loans</div>
          </Link>
          <Link to="/learn/business-loans" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Back to Business Loans Hub</div>
            <div className="text-sm text-orange-100">All 15 lessons</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default EMICalculator;

