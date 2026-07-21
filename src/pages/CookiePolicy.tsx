import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { Cookie, ArrowLeft, Shield, Settings, Eye, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WhatsAppBanner from '../components/WhatsAppBanner';


export const CookiePolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHelmet
        title="Cookie Policy - Privacy & Data Protection | MoneyCal.in"
        description="Learn about our cookie policy and how we use cookies to improve your experience on MoneyCal.in. Understand your privacy rights and cookie management options."
        keywords="cookie policy, privacy policy, data protection, cookies management, website privacy, user consent, GDPR compliance"
        url="/cookie-policy"
        type="website"
        image="/images/cookie-policy.jpg"
        tags={["privacy", "cookies", "data protection", "GDPR", "user consent"]}
      />
      
      <WhatsAppBanner />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back</span>
          </button>
        </div>

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Cookie className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Cookie Policy
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding how we use cookies to enhance your experience and protect your privacy on MoneyCal.in
            </p>
        </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Policy Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="prose prose-lg max-w-none">
                  <p className="text-neutral-600 mb-6">Last Updated: June 15, 2025</p>

                  <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4 flex items-center">
                    <Shield className="h-6 w-6 mr-2 text-blue-600" />
                    What Are Cookies?
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit our website. 
                    These files store information that can be recalled by a web server in the domain that placed the cookie. 
                    Cookies help us provide you with a better experience by remembering your preferences and analyzing how you use our site.
                  </p>

                  <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4 flex items-center">
                    <Settings className="h-6 w-6 mr-2 text-green-600" />
                    How We Use Cookies
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">Essential Cookies</h3>
                      <p className="text-blue-700 text-sm">Remember Calculator inputs during your session and ensure basic functionality</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">Preference Cookies</h3>
                      <p className="text-green-700 text-sm">Save your settings and preferences for a personalized experience</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-purple-800 mb-2">Analytics Cookies</h3>
                      <p className="text-purple-700 text-sm">Understand site usage patterns to improve performance and user experience</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-orange-800 mb-2">Advertising Cookies</h3>
                      <p className="text-orange-700 text-sm">From partners like Google AdSense to provide relevant advertisements</p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4 flex items-center">
                    <Eye className="h-6 w-6 mr-2 text-purple-600" />
                    Managing Cookies
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You have complete control over cookies on your device. You can delete all existing cookies and set your browser 
                    to prevent new ones from being placed. However, this may affect your experience as some features may not work properly.
                  </p>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-yellow-800 mb-2">Browser Settings</h3>
                    <p className="text-yellow-700 text-sm">
                      Most browsers allow you to control cookies through their settings. Look for "Privacy" or "Security" settings 
                      to manage cookie preferences.
                    </p>
                  </div>

                  <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4 flex items-center">
                    <Lock className="h-6 w-6 mr-2 text-red-600" />
                    Your Consent
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    On your first visit to MoneyCal.in, we ask for your consent to use non-essential cookies. 
                    You can update your choice at any time by clearing site data or adjusting your browser settings. 
                    Your privacy is important to us, and we respect your choices.
                  </p>

                  <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Types of Cookies We Use</h2>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-semibold text-gray-800">Session Cookies</h3>
                      <p className="text-gray-600 text-sm">Temporary cookies that expire when you close your browser</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h3 className="font-semibold text-gray-800">Persistent Cookies</h3>
                      <p className="text-gray-600 text-sm">Cookies that remain on your device for a set period</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h3 className="font-semibold text-gray-800">Third-Party Cookies</h3>
                      <p className="text-gray-600 text-sm">Cookies placed by external services we use</p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Your Rights</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Under data protection laws, you have the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Access information about how we use your data</li>
                    <li>Request deletion of your personal data</li>
                    <li>Withdraw consent for cookie usage</li>
                    <li>Lodge a complaint with relevant authorities</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Accept All Cookies
                  </button>
                  <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                    Reject Non-Essential
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                    Customize Settings
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  If you have questions about our cookie policy or privacy practices, please contact us.
                </p>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  Contact Support
                </button>
              </div>

              {/* Related Policies */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Policies</h3>
                <div className="space-y-2">
                  <a href="/privacy-policy" className="block text-blue-600 hover:text-blue-800 text-sm">Privacy Policy</a>
                  <a href="/terms-of-service" className="block text-blue-600 hover:text-blue-800 text-sm">Terms of Service</a>
                  <a href="/disclaimer" className="block text-blue-600 hover:text-blue-800 text-sm">Disclaimer</a>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Note</h3>
            <p className="text-yellow-700">
              This cookie policy is part of our commitment to transparency and user privacy. We regularly review and update 
              this policy to ensure compliance with applicable laws and best practices. For the most current information, 
              please check this page regularly.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy;


