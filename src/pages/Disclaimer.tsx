import React from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

export const Disclaimer: React.FC = () => {
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
          <AlertTriangle className="h-8 w-8 text-amber-600 mr-3" />
          <h1 className="text-3xl font-bold text-neutral-900">Disclaimer</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-neutral-600">Last Updated: June 15, 2025</p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">No Financial Advice</h2>
            <p>
              The information, calculators, and tools provided on this website are for educational and informational purposes only.
              They do not constitute financial, investment, legal, or tax advice. Results from calculators are estimates based on inputs
              and assumptions and may not reflect your specific circumstances.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Professional Guidance Recommended</h2>
            <p>
              Always consult a qualified financial advisor, tax professional, or legal expert before making financial decisions.
              We do not assume any liability for actions taken based on the content or tools on this site.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Accuracy and Liability</h2>
            <p>
              While we strive for accuracy, we do not guarantee that the information is up-to-date, complete, or error-free.
              We are not liable for any losses or damages resulting from the use of our content, calculators, or external links.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Affiliates and Third Parties</h2>
            <p>
              Some links may be affiliate links. We may earn a commission at no extra cost to you. Third-party sites have their own
              terms and privacy policies; we are not responsible for their content or practices.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disclaimer;


