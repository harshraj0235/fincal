import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back</span>
        </button>
      </div>
      
      <div className="mb-8 flex items-center">
        <Shield className="h-8 w-8 text-primary-600 mr-3" />
        <h1 className="text-3xl font-bold text-neutral-900">Privacy Policy</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <div className="prose prose-lg max-w-none">
          <p className="text-neutral-600">
            Last Updated: June 15, 2025
          </p>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Introduction</h2>
          <p>
            FinCalc India ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, including any other media form, media channel, mobile website, or mobile application related or connected to it (collectively, the "Site").
          </p>
          <p>
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Site.
          </p>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Information We Collect</h2>
          
          <h3 className="text-xl font-medium text-neutral-900 mt-6 mb-3">Personal Data</h3>
          <p>
            We may collect personal identification information from you in a variety of ways, including, but not limited to, when you visit our site, register on the site, subscribe to our newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features, or resources we make available on our Site. You may be asked for, as appropriate:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Demographic information</li>
          </ul>
          <p>
            You may, however, visit our Site anonymously. We will collect personal identification information from you only if you voluntarily submit such information to us. You can always refuse to supply personal identification information, except that it may prevent you from engaging in certain Site-related activities.
          </p>
          
          <h3 className="text-xl font-medium text-neutral-900 mt-6 mb-3">Non-Personal Data</h3>
          <p>
            We may collect non-personal identification information about you whenever you interact with our Site. Non-personal identification information may include your browser name, the type of computer, and technical information about your means of connection to our Site, such as the operating system, Internet service providers, and other similar information.
          </p>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">How We Use Your Information</h2>
          <p>
            We may use the information we collect from you in the following ways:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>To personalize your experience and to deliver content and product offerings relevant to your interests</li>
            <li>To improve our website in order to better serve you</li>
            <li>To allow us to better service you in responding to your customer service requests</li>
            <li>To administer a contest, promotion, survey, or other site feature</li>
            <li>To send periodic emails regarding your account or other products and services</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Cookies</h2>
          <p>
            We use cookies on our Site. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information.
          </p>
          <p>
            We use cookies to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Help remember and process your calculator inputs</li>
            <li>Understand and save your preferences for future visits</li>
            <li>Compile aggregate data about site traffic and site interactions</li>
            <li>Improve our website and services</li>
          </ul>
          <p>
            You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since each browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies.
          </p>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Third-Party Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties unless we provide you with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
          </p>
          <p>
            We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
          </p>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Third-Party Links</h2>
          <p>
            Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.
          </p>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </p>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p>
            We reserve the right to update or change our Privacy Policy at any time. Any changes will be posted on this page with an updated revision date. We encourage you to review this Privacy Policy periodically for any changes.
          </p>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="font-medium">
            Email: privacy@fincalcindia.com<br />
            Phone: +91 1234567890
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;