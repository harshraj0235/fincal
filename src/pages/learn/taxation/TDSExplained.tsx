import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, FileText, DollarSign, CheckCircle } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const TDSExplained: React.FC = () => (
  <>
    <SEOHelmet title="TDS Explained: Tax Deducted at Source, Form 16, Certificate, Claim Refund India | MoneyCal" description="Complete TDS guide. What is TDS, why deducted, TDS on salary vs interest vs professional fees, Form 16/16A, claiming excess TDS refund." keywords="TDS India, tax deducted at source, Form 16, TDS certificate, TDS refund, TDS क्या है" url="/learn/taxation-compliance/tds-tax-deducted-at-source-certificate-claim-refund-india" />
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/taxation-compliance" className="flex items-center gap-2 text-gray-600 hover:text-teal-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 4 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">TDS: Tax Deducted at Source Explained</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">🤔 What is TDS?</h2>
          <p className="text-gray-700 mb-4">
            <strong>TDS (Tax Deducted at Source)</strong> is tax collected in advance by the payer (employer, bank, client) before paying you. Instead of you paying tax at year-end, government collects it upfront!
          </p>
          <div className="bg-blue-50 p-5 rounded-lg">
            <strong className="text-blue-900 block mb-2">Simple Example:</strong>
            <p className="text-sm text-gray-700">
              Your salary: ₹50,000/month<br />
              Employer deducts TDS: ₹5,000<br />
              You receive: ₹45,000 in hand<br />
              <span className="text-green-700 font-semibold">That ₹5,000 TDS goes to government as your advance tax!</span>
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">💡 TDS on Different Income Types</h2>
          <div className="space-y-3 text-sm">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur">
              <strong className="block mb-2">📊 Salary (Section 192): TDS as per slab</strong>
              <p>Employer deducts monthly based on projected annual income. Form 16 issued yearly.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur">
              <strong className="block mb-2">🏦 Bank Interest (194A): 10% TDS if interest &gt; ₹40K (₹50K for seniors)</strong>
              <p>Banks auto-deduct 10% TDS on FD/savings interest above threshold. Form 16A issued.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur">
              <strong className="block mb-2">💼 Professional Fees (194J): 10% TDS (doctors, CAs, consultants)</strong>
              <p>Clients deduct 10% TDS before payment. Applicable if fee &gt; ₹30K in a year.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur">
              <strong className="block mb-2">🏠 Rent (194-I/IB): 10% TDS if monthly rent &gt; ₹50K</strong>
              <p>Tenant deducts TDS on rent paid to landlord. Must have TAN number.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default TDSExplained;

