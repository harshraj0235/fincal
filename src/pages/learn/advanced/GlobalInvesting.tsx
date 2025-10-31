import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const GlobalInvesting: React.FC = () => (
  <>
    <SEOHelmet title="Global Investing: US Stocks International Mutual Funds LRS India 2025 | MoneyCal" description="Invest globally. US stocks via Vested/Groww ($250K LRS limit), international mutual funds (Nasdaq 100, S&P 500), currency risk, TDS on global investments." keywords="global investing India, US stocks, international mutual funds, LRS limit, Nasdaq 100, वैश्विक निवेश" url="/learn/advanced-specialised-finance/global-investing-us-stocks-international-mutual-funds-liberalized-remittance-scheme-india-2025" />
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/advanced-specialised-finance" className="flex items-center gap-2 text-gray-600 hover:text-green-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 3 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Global Investing: Invest in US Stocks & Nasdaq!</h1>
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">🌍 How to Invest in US Stocks from India</h2>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Platforms:</strong> Vested, Groww, INDMoney. Buy Apple, Google, Tesla, Amazon directly. Minimum: $1 (₹80). Charges: $5-10/month platform fee + forex charges (0.5-1%).</li>
            <li>• <strong>LRS Limit:</strong> ₹20L ($250K) per person per year (RBI rule). Track forex transactions carefully!</li>
            <li>• <strong>International Mutual Funds:</strong> Invest via Indian MF houses. Nasdaq 100 Fund of Fund (invests in US tech stocks). Returns: 12-15% (but in $). Easier than direct stocks. Tax: As per Indian MF rules.</li>
            <li>• <strong>Currency Risk:</strong> If ₹ weakens vs $ → You gain extra! If ₹ strengthens → You lose. Example: Invest $1000 when ₹/$80. After 1 year, $1000 becomes $1100 (10% gain). But if ₹/$75 now → Your ₹80K became ₹82.5K (only 3% gain in ₹ terms).</li>
            <li>• <strong>Tax:</strong> LTCG: 12.5% (held &gt;2 years). STCG: As per slab. Fill ITR-2 (not ITR-1).</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default GlobalInvesting;


