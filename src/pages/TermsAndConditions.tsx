import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

export const TermsAndConditions: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
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
        <FileText className="h-8 w-8 text-primary-600 mr-3" />
        <h1 className="text-3xl font-bold text-neutral-900">Terms and Conditions</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <div className="prose prose-lg max-w-none">
          <p className="text-neutral-600">
            Last Updated: June 15, 2025
          </p>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Introduction</h2>
          <p>
            These Terms and Conditions ("Terms") govern your use of the FinCalc India website and all content, services, and products available at or through the website (collectively, the "Service"). The Service is owned and operated by FinCalc India ("we," "us," or "our").
          </p>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.
          </p>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Use of the Service</h2>
          
          <h3 className="text-xl font-medium text-neutral-900 mt-6 mb-3">Eligibility</h3>
          <p>
            You must be at least 18 years of age to use this Service. By using the Service and agreeing to these Terms, you represent and warrant that you are at least 18 years of age.
          </p>
          
          <h3 className="text-xl font-medium text-neutral-900 mt-6 mb-3">Account Registration</h3>
          <p>
            Some features of the Service may require you to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          </p>
          
          <h3 className="text-xl font-medium text-neutral-900 mt-6 mb-3">User Conduct</h3>
          <p>
            You agree not to use the Service:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>In any way that violates any applicable national or international law or regulation</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation</li>
            <li>To impersonate or attempt to impersonate FinCalc India, a FinCalc India employee, another user, or any other person or entity</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm FinCalc India or users of the Service or expose them to liability</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of FinCalc India and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of FinCalc India.
          </p>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. FinCalc India expressly disclaims all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>
          <p>
            FinCalc India makes no warranty that:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>The Service will meet your requirements</li>
            <li>The Service will be uninterrupted, timely, secure, or error-free</li>
            <li>The results that may be obtained from the use of the Service will be accurate or reliable</li>
            <li>The quality of any products, services, information, or other material purchased or obtained by you through the Service will meet your expectations</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Financial Disclaimer</h2>
          <p>
            The calculators, tools, and information provided on this website are for informational and educational purposes only. They are not intended to provide financial, investment, legal, or tax advice. The results provided by our calculators are based on the information you input and assumptions that may not apply to your individual situation.
          </p>
          <p>
            Before making any financial decisions, we strongly recommend consulting with a qualified financial advisor, accountant, or legal professional. FinCalc India is not responsible for any decisions made based on the information provided by our calculators or content.
          </p>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Limitation of Liability</h2>
          <p>
            In no event shall FinCalc India, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless FinCalc India and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Your use and access of the Service, by you or any person using your account and password</li>
            <li>A breach of these Terms</li>
            <li>Content posted on the Service</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="font-medium">
            Email: legal@fincalcindia.com<br />
            Phone: +91 1234567890
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default TermsAndConditions;