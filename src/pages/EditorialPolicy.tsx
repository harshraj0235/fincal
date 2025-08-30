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
            <p className="text-neutral-600">Last Updated: January 15, 2025</p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Our Commitment</h3>
              <p className="text-blue-700">
                At MoneyCal India, we are committed to providing accurate, unbiased, and educational financial content that helps our users make informed decisions. This editorial policy outlines our standards and practices.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Content Standards and Quality</h2>
            <p className="text-gray-700 leading-relaxed">
              All content on MoneyCal India is created with the primary goal of educating users about financial topics relevant to India. We maintain high standards for accuracy, clarity, and usefulness in all our content, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Financial calculators and tools</li>
              <li>Educational articles and guides</li>
              <li>Blog posts and insights</li>
              <li>Tax and investment information</li>
              <li>Government scheme explanations</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Our content is reviewed for accuracy and clarity before publication and is regularly updated to reflect changes in regulations, market conditions, and financial products.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Editorial Independence</h2>
            <p className="text-gray-700 leading-relaxed">
              We maintain editorial independence in all our content decisions. Our editorial team makes content choices based on user needs, educational value, and relevance to Indian financial planning, not on commercial considerations.
            </p>
            <p className="text-gray-700 leading-relaxed">
              When we have sponsored content, affiliate relationships, or partnerships that may influence our content, we disclose this information clearly and transparently on the relevant pages.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Fact-Checking and Verification</h2>
            <p className="text-gray-700 leading-relaxed">
              We follow a rigorous fact-checking process for all our content:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>All financial data and statistics are verified from reliable sources</li>
              <li>Tax information is cross-referenced with current government regulations</li>
              <li>Calculator formulas are tested and validated</li>
              <li>External links are regularly checked for accuracy and relevance</li>
              <li>Content is reviewed by multiple team members before publication</li>
            </ul>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Sources and Attribution</h2>
            <p className="text-gray-700 leading-relaxed">
              We rely on credible sources for our information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Government websites and official publications (RBI, SEBI, Income Tax Department)</li>
              <li>Reputable financial institutions and banks</li>
              <li>Peer-reviewed financial research and studies</li>
              <li>Industry reports from recognized financial organizations</li>
              <li>Expert opinions from qualified financial professionals</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We provide proper attribution and links to sources whenever possible, allowing readers to verify information independently.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Corrections and Updates</h2>
            <p className="text-gray-700 leading-relaxed">
              We are committed to maintaining the accuracy of our content. When we identify errors or receive corrections from users, we:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Correct the information promptly</li>
              <li>Add a correction note with the update date where appropriate</li>
              <li>Review related content to ensure consistency</li>
              <li>Acknowledge the source of the correction when applicable</li>
              <li>Update our editorial processes to prevent similar errors</li>
            </ul>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">User Feedback and Engagement</h2>
            <p className="text-gray-700 leading-relaxed">
              We value feedback from our users and encourage them to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Report errors or inaccuracies they discover</li>
              <li>Suggest topics for new content or calculators</li>
              <li>Share their experiences with our tools</li>
              <li>Provide feedback on content clarity and usefulness</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              All feedback is reviewed by our editorial team and used to improve our content and services.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Content Review Process</h2>
            <p className="text-gray-700 leading-relaxed">
              Our content goes through a multi-step review process:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Initial research and fact-gathering</li>
              <li>Content creation and calculator development</li>
              <li>Internal review for accuracy and clarity</li>
              <li>Technical testing of calculators and tools</li>
              <li>Final editorial review and approval</li>
              <li>Publication and ongoing monitoring</li>
            </ol>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Disclosure of Relationships</h2>
            <p className="text-gray-700 leading-relaxed">
              We believe in transparency and disclose any relationships that might influence our content, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Affiliate partnerships with financial institutions</li>
              <li>Sponsored content or advertising relationships</li>
              <li>Partnerships with financial service providers</li>
              <li>Any financial interests in products or services we mention</li>
            </ul>

            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about our editorial policy, want to report an error, or have suggestions for improvement, please contact us:
            </p>
            <p className="font-medium text-gray-800">
              Email: editorial@moneycal.in<br />
              Contact Form: <a href="/contact-us" className="text-blue-600 underline">Contact Us Page</a>
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              We typically respond to editorial inquiries within 2-3 business days.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorialPolicy;


