import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const CryptocurrencyGuide: React.FC = () => (
  <>
    <SEOHelmet title="Cryptocurrency Investment: Bitcoin Ethereum Tax 30% 1% TDS Regulations India 2025 | MoneyCal" description="Invest in crypto. Bitcoin, Ethereum, crypto exchanges (WazirX, CoinDCX), tax (30% flat + 1% TDS on transactions), legal status, wallet security, risks." keywords="cryptocurrency India, Bitcoin, Ethereum, crypto tax 30%, WazirX CoinDCX, क्रिप्टोकरेंसी निवेश" url="/learn/advanced-specialised-finance/cryptocurrency-investment-bitcoin-ethereum-tax-regulations-india-2025" />
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/advanced-specialised-finance" className="flex items-center gap-2 text-gray-600 hover:text-orange-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 5 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Cryptocurrency: Bitcoin, Ethereum & India Tax Rules!</h1>
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">₿ Crypto in India (2025 Tax Rules)</h2>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Legal Status:</strong> NOT illegal, but NOT legal tender. Can buy/sell/hold. No ban (as of 2025).</li>
            <li>• <strong>Tax (Budget 2022):</strong> 30% flat tax on crypto profits + 1% TDS on every transaction above ₹10K. NO loss offset (if Bitcoin loss, can't offset against Ethereum profit!). Harsh tax = less attractive.</li>
            <li>• <strong>Exchanges:</strong> WazirX (Indian, Binance-owned), CoinDCX (Indian, largest), CoinSwitch Kuber. Minimum: ₹100. Charges: 0.5-1% per trade.</li>
            <li>• <strong>Wallet Security:</strong> Use hardware wallet (Ledger, Trezor - ₹5K) for large amounts. Don't keep on exchange (risk of hacking). Backup seed phrase (12-24 words) safely - NEVER share!</li>
            <li>• <strong>Risks:</strong> Extremely volatile (50-80% crashes common). No regulatory protection. Exchange hacks (WazirX hacked for $230M in 2024). Only invest what you can afford to lose 100%!</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default CryptocurrencyGuide;

