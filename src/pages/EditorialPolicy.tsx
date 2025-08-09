import React from 'react';
import { FileText, ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

export const EditorialPolicy: React.FC = () => {
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
          <Shield className="h-8 w-8 text-primary-600 mr-3" />
          <h1 className="text-3xl font-bold text-neutral-900">Editorial Policy</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-neutral-600">Last Updated: June 15, 2025</p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Accuracy and Quality</h2>
            <p>
              Our content is created to educate users about finance topics in India. We review calculators and articles for accuracy and clarity before publication and update them when regulations or market conditions change.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Independence</h2>
            <p>
              Editorial decisions are independent. Sponsored content or affiliate relationships are disclosed clearly on the page.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Corrections</h2>
            <p>
              If we identify errors, we correct them promptly and add a note with the update time where appropriate.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Contact</h2>
            <p>
              To report an error or request a correction, contact us via the form on the <a href="/contact-us" className="text-blue-600 underline">Contact Us</a> page.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorialPolicy;


