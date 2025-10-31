import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const MoneyMindsetPsychology: React.FC = () => (
  <>
    <SEOHelmet title="Money Mindset Psychology: Scarcity vs Abundance Wealth Consciousness India 2025 | MoneyCal" description="Develop wealth mindset. Scarcity vs abundance mentality, money beliefs from childhood, breaking poverty cycle, wealth consciousness, positive money affirmations." keywords="money mindset India, abundance mentality, wealth consciousness, scarcity mindset, धन मानसिकता मनोविज्ञान" url="/learn/behavioural-finance-money-psychology/money-mindset-psychology-scarcity-vs-abundance-wealth-india-2025" />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/behavioural-finance-money-psychology" className="flex items-center gap-2 text-gray-600 hover:text-blue-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 1 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Money Mindset: Scarcity vs Abundance!</h1>
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">🧠 Scarcity Mindset vs Abundance Mindset</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white/10 p-4 rounded backdrop-blur">
              <strong className="block mb-2">❌ Scarcity Mindset ("Not Enough"):</strong>
              <ul className="space-y-1">
                <li>• "Money doesn't grow on trees"</li>
                <li>• "Rich people are greedy"</li>
                <li>• "I'll never be wealthy"</li>
                <li>• Fear of spending, hoarding</li>
                <li>• Zero-sum game (if you win, I lose)</li>
              </ul>
            </div>
            <div className="bg-white/10 p-4 rounded backdrop-blur">
              <strong className="block mb-2">✅ Abundance Mindset ("More Than Enough"):</strong>
              <ul className="space-y-1">
                <li>• "There's enough for everyone"</li>
                <li>• "Wealth creates opportunities"</li>
                <li>• "I can learn to build wealth"</li>
                <li>• Investing in growth, generous</li>
                <li>• Win-win mindset (we both can win)</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm">💡 Your mindset attracts your reality. Change your thoughts, change your wealth!</p>
        </div>
      </div>
    </div>
  </>
);

export default MoneyMindsetPsychology;



