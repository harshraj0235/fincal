import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const EmotionalInvesting: React.FC = () => (
  <>
    <SEOHelmet title="Emotional Investing: Fear Greed Panic Selling FOMO India 2025 | MoneyCal" description="Control emotions. Fear (selling at bottom), greed (buying at top), panic selling during crashes, FOMO (buying because friends made profit), how to stay rational." keywords="emotional investing India, fear greed, panic selling, FOMO fear of missing out, भावनात्मक निवेश" url="/learn/behavioural-finance-money-psychology/emotional-investing-fear-greed-panic-selling-fomo-india-2025" />
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/behavioural-finance-money-psychology" className="flex items-center gap-2 text-gray-600 hover:text-red-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 3 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Emotional Investing: Fear, Greed, FOMO!</h1>
        <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">😱 The Enemy Within: Fear & Greed</h2>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Fear (Selling at Bottom):</strong> March 2020 - COVID crash, Nifty fell 40%. Everyone panic sold. Those who stayed invested recovered by Sept 2020 + made 100% by 2024!</li>
            <li>• <strong>Greed (Buying at Top):</strong> Jan 2008 - Everyone buying, "Sensex will hit 30K!" It crashed from 21K to 8K in 2009. Greed makes you buy high.</li>
            <li>• <strong>FOMO (Fear of Missing Out):</strong> Friends made ₹5L in crypto? You jump in at peak. Crypto crashes next month. FOMO = buying late!</li>
            <li>• <strong>Panic Selling:</strong> Portfolio down 20%? Don't panic! Temporary loss becomes permanent if you sell. Markets always recover (eventually).</li>
            <li>• <strong>How to Stay Rational:</strong> 1) Have a plan (asset allocation), 2) Don't check portfolio daily, 3) Automate (SIP), 4) Read history (every crash recovered), 5) Focus on goals, not daily prices.</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default EmotionalInvesting;





