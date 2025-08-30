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
            <p className="text-neutral-600">Last Updated: January 15, 2025</p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Notice</h3>
              <p className="text-amber-700">
                Please read this disclaimer carefully before using our financial calculators and content. By using our website, you acknowledge that you have read, understood, and agree to be bound by this disclaimer.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">No Financial Advice</h2>
            <p className="text-gray-700 leading-relaxed">
              The information, calculators, tools, and content provided on MoneyCal India are for educational and informational purposes only. They do not constitute financial, investment, legal, tax, or any other form of professional advice. Results from our calculators are estimates based on the inputs you provide and certain assumptions, and may not reflect your specific financial circumstances, risk tolerance, or investment objectives.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our calculators are designed to help you understand financial concepts and provide rough estimates. They should not be used as the sole basis for making financial decisions. Market conditions, interest rates, tax laws, and other factors can change rapidly and may affect the accuracy of calculations.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Professional Guidance Recommended</h2>
            <p className="text-gray-700 leading-relaxed">
              We strongly recommend that you consult with qualified financial advisors, tax professionals, accountants, or legal experts before making any financial decisions, investments, or tax-related choices. These professionals can provide personalized advice based on your specific situation, goals, and risk tolerance.
            </p>
            <p className="text-gray-700 leading-relaxed">
              MoneyCal India and its creators are not licensed financial advisors, tax professionals, or legal experts. We do not assume any liability for actions taken based on the content, calculators, or tools available on this website.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Accuracy and Liability Limitations</h2>
            <p className="text-gray-700 leading-relaxed">
              While we strive to provide accurate and up-to-date information, we do not guarantee that the information on our website is complete, current, or error-free. Financial markets, tax laws, interest rates, and regulations change frequently, and there may be delays in updating our content to reflect these changes.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We are not liable for any losses, damages, or negative consequences resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Use of our calculators or tools</li>
              <li>Reliance on information provided on our website</li>
              <li>Financial decisions made based on our content</li>
              <li>Technical errors or website downtime</li>
              <li>Outdated or inaccurate information</li>
            </ul>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Investment Risks</h2>
            <p className="text-gray-700 leading-relaxed">
              All investments carry risk, including the potential loss of principal. Past performance does not guarantee future results. The calculators and information on our website do not account for all possible risks and market conditions. You should carefully consider your investment objectives, risk tolerance, and financial situation before making any investment decisions.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Tax Information</h2>
            <p className="text-gray-700 leading-relaxed">
              Tax laws and regulations are complex and subject to change. Our tax calculators provide general estimates based on current tax laws, but individual tax situations can vary significantly. Tax calculations may not account for all deductions, credits, or special circumstances that may apply to your situation. Always consult with a qualified tax professional for personalized tax advice.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Third-Party Content and Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website may contain links to third-party websites, services, or content. We are not responsible for the accuracy, completeness, or reliability of any third-party content. Third-party sites have their own terms of service and privacy policies, and we encourage you to review them.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Some links on our website may be affiliate links, meaning we may earn a commission if you click on them and make a purchase. This does not affect the price you pay and helps support our free services.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">User Responsibility</h2>
            <p className="text-gray-700 leading-relaxed">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Verifying the accuracy of information before making financial decisions</li>
              <li>Consulting with appropriate professionals when needed</li>
              <li>Understanding the limitations of our calculators and tools</li>
              <li>Keeping your financial information secure and private</li>
              <li>Using our website in accordance with applicable laws and regulations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Changes to This Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to update this disclaimer at any time. Changes will be posted on this page with an updated revision date. Your continued use of our website after any changes constitutes acceptance of the updated disclaimer.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this disclaimer or our website, please contact us at:
            </p>
            <p className="font-medium text-gray-800">
              Email: legal@moneycal.in<br />
              Website: https://moneycal.in
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disclaimer;


