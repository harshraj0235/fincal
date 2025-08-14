import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { ArrowLeft, Shield, Lock, Eye, Database, Users, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

export const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <SEOHelmet
        title="Privacy Policy - Data Protection & Privacy Rights | MoneyCal.in"
        description="Learn about our privacy policy and how we protect your personal information on MoneyCal.in. Understand your data rights and our commitment to privacy protection."
        keywords="privacy policy, data protection, personal information, privacy rights, GDPR compliance, data security, user privacy"
        url="/privacy-policy"
        type="website"
        image="/images/privacy-policy.jpg"
        tags={["privacy", "data protection", "GDPR", "user rights", "security"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </button>
          </div>
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Privacy Policy
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your personal information 
              to ensure a secure and trustworthy experience on MoneyCal.in.
            </p>
          </div>
      
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Policy Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <div className="prose prose-lg max-w-none">
                  <p className="text-neutral-600 mb-6">
                    Last Updated: June 15, 2025
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4 flex items-center">
                    <Lock className="h-6 w-6 mr-2 text-blue-600" />
                    Introduction
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    MoneyCal India ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, including any other media form, media channel, mobile website, or mobile application related or connected to it (collectively, the "Site").
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Site.
                  </p>
          
                  <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4 flex items-center">
                    <Database className="h-6 w-6 mr-2 text-green-600" />
                    Information We Collect
                  </h2>
                  
                  <h3 className="text-xl font-medium text-neutral-900 mt-6 mb-3">Personal Data</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may collect personal identification information from you in a variety of ways, including, but not limited to, when you visit our site, register on the site, subscribe to our newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features, or resources we make available on our Site. You may be asked for, as appropriate:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Demographic information</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    You may, however, visit our Site anonymously. We will collect personal identification information from you only if you voluntarily submit such information to us. You can always refuse to supply personal identification information, except that it may prevent you from engaging in certain Site-related activities.
                  </p>
                  
                  <h3 className="text-xl font-medium text-neutral-900 mt-6 mb-3">Non-Personal Data</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may collect non-personal identification information about you whenever you interact with our Site. Non-personal identification information may include your browser name, the type of computer, and technical information about your means of connection to our Site, such as the operating system, Internet service providers, and other similar information.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4 flex items-center">
                    <Users className="h-6 w-6 mr-2 text-purple-600" />
                    How We Use Your Information
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may use the information we collect from you in the following ways:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
                    <li>To personalize your experience and to deliver content and product offerings relevant to your interests</li>
                    <li>To improve our website in order to better serve you</li>
                    <li>To allow us to better service you in responding to your customer service requests</li>
                    <li>To administer a contest, promotion, survey, or other site feature</li>
                    <li>To send periodic emails regarding your account or other products and services</li>
                  </ul>
                  
                  <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4 flex items-center">
                    <Settings className="h-6 w-6 mr-2 text-orange-600" />
                    Cookies
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We use cookies on our Site. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We use cookies to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
                    <li>Help remember and process your calculator inputs</li>
                    <li>Understand and save your preferences for future visits</li>
                    <li>Compile aggregate data about site traffic and site interactions</li>
                    <li>Improve our website and services</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since each browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Third-Party Disclosure</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties unless we provide you with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Third-Party Links</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Data Security</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to update or change our Privacy Policy at any time. Any changes will be posted on this page with an updated revision date. We encourage you to review this Privacy Policy periodically for any changes.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Contact Us</h2>
                  <p className="text-gray-700 leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p className="font-medium text-gray-800">
                    Email: privacy@moneycal.in<br />
                    Phone: +91 1234567890
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Your Rights */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-blue-600" />
                  Your Rights
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>• <strong>Access:</strong> Request information about your data</p>
                  <p>• <strong>Correction:</strong> Update inaccurate information</p>
                  <p>• <strong>Deletion:</strong> Request data removal</p>
                  <p>• <strong>Portability:</strong> Download your data</p>
                  <p>• <strong>Objection:</strong> Opt-out of processing</p>
                </div>
              </div>

              {/* Data Protection */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Protection</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>• SSL encryption for data transmission</p>
                  <p>• Regular security audits</p>
                  <p>• Limited data retention periods</p>
                  <p>• Secure server infrastructure</p>
                </div>
              </div>

              {/* Related Policies */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Policies</h3>
                <div className="space-y-2">
                  <a href="/cookie-policy" className="block text-blue-600 hover:text-blue-800 text-sm">Cookie Policy</a>
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
              This privacy policy is regularly reviewed and updated to ensure compliance with applicable laws and best practices. 
              For the most current information, please check this page regularly. Your continued use of our site constitutes 
              acceptance of any changes to this policy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;