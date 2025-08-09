import React from 'react';
import { Cookie, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

export const CookiePolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back</span>
          </button>
        </div>

        <div className="mb-8 flex items-center">
          <Cookie className="h-8 w-8 text-primary-600 mr-3" />
          <h1 className="text-3xl font-bold text-neutral-900">Cookie Policy</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-neutral-600">Last Updated: June 15, 2025</p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device to store data that can be recalled by a web server in the domain that placed the cookie.
              We use both first-party and third-party cookies.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">How We Use Cookies</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Essential cookies to remember calculator inputs during a session</li>
              <li>Preference cookies to save your settings</li>
              <li>Analytics cookies to understand site usage and improve performance</li>
              <li>Advertising cookies from partners like Google AdSense (if enabled)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Managing Cookies</h2>
            <p>
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device and you can set most browsers to prevent them from being placed.
              If you do this, however, you may need to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Consent</h2>
            <p>
              On your first visit, we ask for your consent to use non-essential cookies. You can update your choice at any time by clearing site data or using your browser settings.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy;


