import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const BusinessLoansGuide: React.FC = () => (
  <>
    <SEOHelmet title="Business Loans India: MUDRA MSME Working Capital Term Loan Guide 2025 | MoneyCal" description="Master business loans. MUDRA loan (₹50K-₹10L, no collateral), MSME loans, working capital loan, term loan, eligibility, interest rates (9-15%)." keywords="business loans India, MUDRA loan, MSME loans, working capital loan, term loan, व्यवसाय ऋण मुद्रा" url="/learn/business-finance-entrepreneurship/business-loans-india-mudra-msme-working-capital-term-loan-guide-2025" />
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/business-finance-entrepreneurship" className="flex items-center gap-2 text-gray-600 hover:text-green-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 2 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Business Loans: MUDRA, MSME, Working Capital!</h1>
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">💰 MUDRA Loan (Micro Units Development & Refinance Agency)</h2>
          <ul className="space-y-2">
            <li>• <strong>Shishu:</strong> Up to ₹50,000 (9-12% interest, 3-5 year tenure)</li>
            <li>• <strong>Kishore:</strong> ₹50K-₹5L (10-14% interest, collateral-free)</li>
            <li>• <strong>Tarun:</strong> ₹5L-₹10L (12-15% interest, for established businesses)</li>
            <li>• No processing fees, no collateral for loans up to ₹10L</li>
            <li>• Eligibility: Indian citizen, business plan, GST registration (for &gt;₹5L)</li>
            <li>• Apply through any bank or NBFC (Bajaj Finserv, Tata Capital)</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default BusinessLoansGuide;





