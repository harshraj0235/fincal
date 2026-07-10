import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEOHelmet from '../../../components/SEOHelmet';
import { FileText, AlertCircle, ArrowLeft, Shield, CreditCard, Award } from 'lucide-react';

const CreditCardCertificate: React.FC = () => {
  const navigate = useNavigate();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Credit Card Certificate: What It Means and Common Misconceptions',
    description:
      'Clarifies the concept of a credit card “certificate” for Indian users. Explains statement, certificate of closure, NOC, and bank-issued letters used for compliance.',
    author: {
      '@type': 'Person',
      name: 'Harsh Raj'
    },
    datePublished: '2026-02-16',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': '/learn/credit-cards/certificate'
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOHelmet
        title="Credit Card Certificate: Statement vs Closure Letter vs NOC"
        description="Understand what people mean by a credit card 'certificate'. Learn the difference between monthly statements, certificate of closure, NOC, and bank-issued letters used for compliance in India."
        url="/learn/credit-cards/certificate"
        keywords="credit card certificate, certificate of closure, NOC, statement, India"
        structuredData={structuredData}
        section="Learn: Credit Cards"
        author="Harsh Raj"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Learn', url: '/learn' },
          { name: 'Credit Cards', url: '/learn/credit-cards' },
          { name: 'Credit Card Certificate', url: '/learn/credit-cards/certificate' }
        ]}
        faqData={[
          { question: 'क्या बैंक “क्रेडिट कार्ड सर्टिफिकेट” जारी करते हैं?', answer: 'बैंक अलग-अलग उद्देश्य के लिए अलग दस्तावेज़ जारी करते हैं: monthly statement, certificate of closure, NOC और confirmation letter। generic “certificate” नहीं होता।' },
          { question: 'Certificate of Closure कैसे मिलेगा?', answer: 'कार्ड बंद करने के बाद “certificate of closure” के लिए ब्रांच या customer care पर लिखित अनुरोध करें।' },
          { question: 'NOC कब चाहिए?', answer: 'जब कोई संस्था/एम्प्लॉयर/वीज़ा प्रक्रिया स्पष्ट रूप से NOC मांगे। सामान्य मामलों में closure certificate पर्याप्त होता है।' },
          { question: 'Visa/Employer format कैसे माँगें?', answer: 'Bank से “confirmation letter” अपनी specific wording के साथ request करें—नाम, masked number, तारीखें और उद्देश्य शामिल करें।' },
          { question: 'PDF पर्याप्त है या hard copy चाहिए?', answer: 'अधिकांश मामलों में signed PDF पर्याप्त होता है; कुछ में branch-sealed hard copy मांगी जा सकती है। पहले से स्पष्ट करें।' }
        ]}
      />

      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>
      </div>

      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <CreditCard className="w-6 h-6" />
          Credit Card Certificate: What It Really Is
        </h1>
        <p className="text-gray-600 mt-2">
          Many users search for a “credit card certificate” expecting a formal certificate issued by a bank. In practice,
          banks issue specific documents for different needs: monthly statements, certificate of closure, No-Objection Certificate (NOC),
          and account confirmation letters. This guide explains each and how to request them.
        </p>
      </header>

      <section className="space-y-4">
        <div className="p-4 rounded-lg border">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Monthly Statement (Most Common Document)
          </h2>
          <p className="text-gray-700 mt-2">
            Your monthly statement is the official record of transactions, total due, and payment history. It’s often accepted
            for reimbursement, audit, or expense proof. Statements can be downloaded from your bank app or internet banking.
          </p>
        </div>

        <div className="p-4 rounded-lg border">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Certificate of Closure (After Closing the Card)
          </h2>
          <p className="text-gray-700 mt-2">
            When you permanently close a credit card, ask the bank for a “certificate of closure” or “account closure confirmation”.
            This document states that the card is closed, dues are nil, and no liabilities remain under that account.
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
            <li>Request via branch or customer care after final payment is settled</li>
            <li>Ensure your name, masked card number, closure date, and “no dues” line are present</li>
            <li>Keep a soft copy (PDF) and, if needed, collect a sealed hard copy</li>
          </ul>
        </div>

        <div className="p-4 rounded-lg border">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Award className="w-5 h-5" />
            No-Objection Certificate (NOC)
          </h2>
          <p className="text-gray-700 mt-2">
            Some institutions ask for an NOC from your bank. An NOC states the bank has no objection regarding the closed account or specific request.
            Not every bank issues an NOC for routine matters; a closure certificate or confirmation letter may suffice.
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
            <li>Request format: your name, masked card number, “no dues”, issuing authority, and date</li>
            <li>For visa/employer compliance, add the purpose line as specified by the authority</li>
          </ul>
        </div>

        <div className="p-4 rounded-lg border">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Award className="w-5 h-5" />
            Bank Confirmation Letter (On Request)
          </h2>
          <p className="text-gray-700 mt-2">
            For specialized needs (visa, compliance, corporate policy), banks can issue confirmation letters on letterhead.
            Visit the branch or contact customer care; specify the purpose and details required on the letter.
          </p>
        </div>

        <div className="p-4 rounded-lg border">
          <h2 className="text-xl font-semibold">Sample Confirmation Letter Format</h2>
          <div className="mt-2 rounded-lg bg-gray-50 border p-4 text-gray-800">
            <p><span className="font-semibold">Subject:</span> Credit Card Account Closure Confirmation</p>
            <p>To whom it may concern,</p>
            <p>This is to certify that the credit card account held by <span className="font-semibold">[Your Name]</span> with masked number <span className="font-semibold">XXXX-XXXX-XXXX-[1234]</span> was permanently closed on <span className="font-semibold">[DD/MM/YYYY]</span>. All dues have been settled and there are no outstanding liabilities under this account.</p>
            <p>Issued by: <span className="font-semibold">[Bank Name]</span></p>
            <p>Date of issue: <span className="font-semibold">[DD/MM/YYYY]</span></p>
            <p>Authorized Signatory: ______________________</p>
          </div>
        </div>

        <div className="p-4 rounded-lg border">
          <h2 className="text-xl font-semibold">How to Request the Right Document</h2>
          <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
            <li>Statements: App/Netbanking → Cards → Statements → Download PDF</li>
            <li>Closure certificate: After final settlement → Raise request via branch or support</li>
            <li>NOC: Only if a process demands it → Provide exact wording and purpose</li>
            <li>Confirmation letter: Ask bank to mention masked number, dates and purpose</li>
          </ul>
        </div>

        <div className="p-4 rounded-lg border bg-yellow-50">
          <h3 className="font-semibold flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Practical Tips
          </h3>
          <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
            <li>Use your monthly statement for routine proof of transactions.</li>
            <li>When closing a card, explicitly request a certificate of closure.</li>
            <li>Ask customer care or branch for an NOC only if your use-case explicitly requires it.</li>
            <li>For employer or visa formats, request a bank confirmation letter with exact wording.</li>
          </ul>
        </div>
      </section>

      <nav className="mt-8">
        <h3 className="font-semibold mb-2">Related lessons</h3>
        <ul className="list-disc ml-5 text-blue-700">
          <li>
            <Link to="/learn/credit-cards/statement-guide" className="hover:underline">
              Credit Card Statement Guide
            </Link>
          </li>
          <li>
            <Link to="/learn/credit-cards/closure-process" className="hover:underline">
              Credit Card Closure Process
            </Link>
          </li>
          <li>
            <Link to="/learn/credit-cards/fraud-safety" className="hover:underline">
              Credit Card Fraud Safety
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CreditCardCertificate;
