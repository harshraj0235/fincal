import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const StartupFundingGuide: React.FC = () => (
  <>
    <SEOHelmet title="Startup Funding India: Seed Angel VC Bootstrapping Complete Guide 2025 | MoneyCal" description="Complete startup funding guide. Bootstrapping vs external funding, seed funding (₹25L-₹1Cr), angel investors, venture capital, equity dilution, valuation." keywords="startup funding India, seed funding, angel investors, venture capital VC, bootstrapping, equity dilution, स्टार्टअप फंडिंग" url="/learn/business-finance-entrepreneurship/startup-funding-india-seed-angel-vc-bootstrapping-complete-guide-2025" />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/business-finance-entrepreneurship" className="flex items-center gap-2 text-gray-600 hover:text-blue-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 1 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Startup Funding: From Idea to Unicorn!</h1>
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">🚀 Funding Stages Explained</h2>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Bootstrapping (Self-funded):</strong> Use own savings. ₹1L-₹10L. No equity dilution. Slow growth but full control.</li>
            <li>• <strong>Friends & Family:</strong> ₹5L-₹50L. Informal investment. Risk: relationships strained if business fails.</li>
            <li>• <strong>Seed Funding:</strong> ₹25L-₹1Cr. Angel investors, incubators. Equity: 10-20%. Idea validation stage.</li>
            <li>• <strong>Series A:</strong> ₹3-10Cr. VCs join. Equity: 20-30%. Product-market fit proven. Scale team & marketing.</li>
            <li>• <strong>Series B/C:</strong> ₹25Cr+. Growth stage. Expand geographically. Equity: 15-25% per round.</li>
            <li>• <strong>IPO:</strong> Go public. Raise ₹100Cr+. Exit for early investors. Valuation: ₹1,000Cr+ (unicorn!)</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">💡 Bootstrapping vs VC Funding</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-5 rounded-lg">
              <strong className="text-green-900 block mb-3">✅ Bootstrapping Pros:</strong>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 100% ownership (no equity dilution)</li>
                <li>• Full control over decisions</li>
                <li>• No investor pressure for exits</li>
                <li>• Keep all profits</li>
              </ul>
            </div>
            <div className="bg-red-50 p-5 rounded-lg">
              <strong className="text-red-900 block mb-3">⚠️ Bootstrapping Cons:</strong>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Limited capital = slow growth</li>
                <li>• Personal financial risk</li>
                <li>• Can't hire top talent (low salaries)</li>
                <li>• May miss market opportunities</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-5 rounded-lg">
              <strong className="text-blue-900 block mb-3">✅ VC Funding Pros:</strong>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Large capital = fast scaling</li>
                <li>• Investor mentorship & network</li>
                <li>• Credibility (VC-backed = trusted)</li>
                <li>• Hire experienced team</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-5 rounded-lg">
              <strong className="text-orange-900 block mb-3">⚠️ VC Funding Cons:</strong>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Equity dilution (lose control over time)</li>
                <li>• Investor pressure for rapid growth</li>
                <li>• Board interference in decisions</li>
                <li>• Exit pressure (VCs want returns in 5-7 years)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default StartupFundingGuide;


