import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const DigitalWalletsGuide: React.FC = () => (
  <>
    <SEOHelmet title="Digital Wallets Guide: Paytm PhonePe Amazon Pay Google Pay India | MoneyCal" description="Complete wallet guide. Wallet vs UPI, adding money, wallet balance limit (₹1L), KYC requirements, cashback strategies." keywords="digital wallet India, Paytm, PhonePe wallet, Amazon Pay, wallet KYC, cashback, डिजिटल वॉलेट" url="/learn/fintech-digital-payments/digital-wallets-paytm-phonepe-amazon-pay-google-pay-india-complete-guide" />
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 text-gray-600 hover:text-green-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 2 of 6</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Digital Wallets: Cashback & Convenience!</h1>
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">💰 Wallet vs UPI vs Card</h2>
          <ul className="space-y-2">
            <li>• <strong>Wallet:</strong> Pre-loaded balance. Fast payments. Cashback offers. KYC limit: ₹1L/month.</li>
            <li>• <strong>UPI:</strong> Direct bank debit. No pre-loading. Higher limit (₹1L/transaction).</li>
            <li>• <strong>Card:</strong> Credit/Debit card. Interest charges (credit). Transaction fees (some merchants).</li>
            <li>• <strong>Best for:</strong> Wallet = Small payments + cashback. UPI = Large payments. Card = EMI purchases.</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default DigitalWalletsGuide;


