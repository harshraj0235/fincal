import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const AlternativeInvestments: React.FC = () => (
  <>
    <SEOHelmet title="Alternative Investments: AIF PMS Gold Bonds Sovereign Bonds Invoice Discounting India 2025 | MoneyCal" description="Explore alternatives. AIF (₹1Cr minimum, category I/II/III), PMS (₹50L), Sovereign Gold Bonds (2.5% interest + gold appreciation), invoice discounting, P2P lending." keywords="alternative investments India, AIF, PMS, Sovereign Gold Bonds, invoice discounting, P2P lending, वैकल्पिक निवेश" url="/learn/advanced-specialised-finance/alternative-investments-india-aif-pms-gold-bonds-sovereign-bonds-invoice-discounting-2025" />
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/advanced-specialised-finance" className="flex items-center gap-2 text-gray-600 hover:text-teal-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 6 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Alternative Investments: Beyond Stocks & MFs!</h1>
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">💎 High Net-Worth Investment Options</h2>
          <ul className="space-y-2 text-sm">
            <li>• <strong>AIF (Alternative Investment Fund):</strong> Minimum ₹1 Crore. Category I: Startups, SMEs. Category II: Private equity, debt funds. Category III: Hedge funds (high risk). Returns: 15-25%. Lock-in: 3-5 years. For HNIs only.</li>
            <li>• <strong>PMS (Portfolio Management Service):</strong> Minimum ₹50 Lakh. Professional manager handles your portfolio. Customized strategy. Fees: 2-3% + 10-20% profit sharing. Better than MF for large amounts.</li>
            <li>• <strong>Sovereign Gold Bonds (SGB):</strong> ₹1g minimum (₹6K). 2.5% annual interest + gold price appreciation. 8-year lock-in (can sell on exchange after 5 years). Tax-free if held till maturity. Best way to invest in gold (better than physical/ETF)!</li>
            <li>• <strong>Invoice Discounting:</strong> Invest in bills receivable of companies. Returns: 10-14%. Tenure: 30-90 days. Platforms: KredX, Invoice Mart. Risk: Company default.</li>
            <li>• <strong>P2P Lending:</strong> Lend to individuals. Returns: 12-18%. Platforms: Faircent, LendBox. Risk: Borrower may not repay. Diversify across 100+ borrowers to reduce risk.</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default AlternativeInvestments;



