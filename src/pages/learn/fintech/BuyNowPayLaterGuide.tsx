import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Award } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const BuyNowPayLaterGuide: React.FC = () => (
  <>
    <SEOHelmet title="Buy Now Pay Later (BNPL): LazyPay Simpl ZestMoney How It Works Risks India 2025 | MoneyCal" description="Understand BNPL. What is buy now pay later, how it works, interest-free period (15-30 days), late payment charges (2-3%/month), impact on credit score." keywords="BNPL India, buy now pay later, LazyPay, Simpl, ZestMoney, credit score impact, BNPL कैसे काम करता है" url="/learn/fintech-digital-payments/buy-now-pay-later-bnpl-lazypay-simpl-zestmoney-india-guide-2025" />
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 text-gray-600 hover:text-orange-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 6 of 6 - FINAL!</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Buy Now Pay Later (BNPL): Convenience or Trap?</h1>
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">⚠️ BNPL: How It Works</h2>
          <ul className="space-y-2">
            <li>• Buy products today, pay after 15-30 days (interest-free period)</li>
            <li>• Popular BNPL: LazyPay (₹1L limit), Simpl (₹25K limit), ZestMoney (₹1L), Amazon Pay Later (₹60K)</li>
            <li>• <strong>Trap:</strong> Late payment = 2-3% per month interest (36% annual!) + impacts credit score</li>
            <li>• Use ONLY if you're 100% sure you can repay on time. Miss payment = debt trap!</li>
            <li>• Better alternative: Credit card (45-day interest-free + rewards) or save first then buy</li>
          </ul>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">🎉 FinTech & Digital Payments Category Complete!</h2>
          <p className="text-xl mb-6">You've mastered all 6 lessons on digital payments in India!</p>
          <Link to="/learn" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
            Explore More Categories <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default BuyNowPayLaterGuide;

