import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const DerivativesTrading: React.FC = () => (
  <>
    <SEOHelmet title="Derivatives Trading: Futures Options F&O Nifty Bank Nifty Hedging India 2025 | MoneyCal" description="Master F&O trading. Call & put options, futures contracts, Nifty/Bank Nifty, margin requirements, Greeks (delta, gamma), hedging portfolio risk." keywords="derivatives trading India, F&O, options trading, futures, Nifty, Bank Nifty, डेरिवेटिव ट्रेडिंग" url="/learn/advanced-specialised-finance/derivatives-trading-futures-options-nifty-bank-nifty-hedging-india-2025" />
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/advanced-specialised-finance" className="flex items-center gap-2 text-gray-600 hover:text-purple-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 4 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Derivatives (F&O): High Risk, High Reward!</h1>
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">⚡ F&O Basics</h2>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Call Option:</strong> Right to BUY Nifty at 22,000. If Nifty goes to 22,500 → Profit ₹500 × 50 (lot size) = ₹25,000! Premium paid: ₹5,000. Net profit: ₹20K (400% return!).</li>
            <li>• <strong>Put Option:</strong> Right to SELL Nifty at 22,000. If Nifty falls to 21,500 → Profit ₹25,000 (same calculation). Used to protect portfolio during market crash.</li>
            <li>• <strong>Futures:</strong> Agreement to buy/sell at future date. Margin: 10-15%. Example: Buy 1 lot Nifty future (50 shares) at 22,000. If Nifty → 22,100 → Profit ₹100 × 50 = ₹5,000. But if Nifty → 21,900 → Loss ₹5,000!</li>
            <li>• <strong>Warning:</strong> 95% of F&O traders lose money! Use only 5-10% of portfolio for F&O. NEVER use full capital. Set strict stop-loss. Learn Greeks (delta, theta, gamma) before trading.</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default DerivativesTrading;


