import React from 'react';
import { Shield, Lock, BadgeCheck, Users, Award, CheckCircle2, Heart } from 'lucide-react';

// Lightweight version without Framer Motion
export const LightweightTrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data never leaves your device',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: BadgeCheck,
      title: '100% Free',
      description: 'No hidden charges or subscriptions',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Users,
      title: '1M+ Users',
      description: 'Trusted by financial professionals',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Award,
      title: 'ISO Certified',
      description: 'Meets international standards',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-blue-50" style={{ minHeight: '700px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Trust MoneyCal.in?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            India's Most Trusted Financial Calculator Platform - Built with Security, Privacy & Accuracy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${badge.gradient} flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{badge.title}</h3>
                <p className="text-gray-600">{badge.description}</p>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">RBI Guidelines Compliant</h3>
              <p className="text-gray-600">All calculators follow Reserve Bank of India regulations</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Lock className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">SSL Encrypted</h3>
              <p className="text-gray-600">256-bit encryption protects your sensitive data</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-12 h-12 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Made in India</h3>
              <p className="text-gray-600">Designed specifically for Indian tax & financial laws</p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
          <div className="flex items-start">
            <Shield className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Legal Disclaimer</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                MoneyCal.in provides financial calculators for educational and informational purposes only. 
                Results are estimates and should not be considered as financial advice. Please consult with 
                a certified financial advisor, chartered accountant, or tax professional before making any 
                financial decisions. We do not collect, store, or share your personal financial data. All 
                calculations are performed locally in your browser.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 font-medium text-sm">Privacy Policy →</a>
                <a href="/terms-and-conditions" className="text-blue-600 hover:text-blue-800 font-medium text-sm">Terms & Conditions →</a>
                <a href="/disclaimer" className="text-blue-600 hover:text-blue-800 font-medium text-sm">Full Disclaimer →</a>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Certifications */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Verified & Trusted By</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="bg-white px-6 py-3 rounded-lg shadow-md">
              <p className="text-gray-800 font-semibold">🏆 ISO 9001:2015 Certified</p>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-md">
              <p className="text-gray-800 font-semibold">🔒 SSL Secured</p>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-md">
              <p className="text-gray-800 font-semibold">🇮🇳 Made in India</p>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-md">
              <p className="text-gray-800 font-semibold">✅ RBI Compliant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightweightTrustBadges;

