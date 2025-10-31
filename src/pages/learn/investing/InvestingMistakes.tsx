import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const InvestingMistakes: React.FC = () => (
  <>
    <SEOHelmet title="Top 10 Investing Mistakes: Panic Selling, Timing Market India | MoneyCal" description="Learn from expensive investing mistakes. Panic selling, market timing, over-trading. Avoid ₹5-10L losses." keywords="investing mistakes India, panic selling, market timing, over trading, common errors, निवेश गलतियाँ" url="/learn/investing-wealth/investing-mistakes-to-avoid-panic-selling-timing-market-india" />
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-red-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 10 of 10 - FINAL!</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Top 10 Investing Mistakes to Avoid</h1>
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <div className="space-y-3">
            {[
              { mistake: 'Panic Selling in Crashes', cost: 'Lose 30-50% by selling at bottom instead of holding' },
              { mistake: 'Trying to Time the Market', cost: 'Miss rallies, buy high, sell low - lose ₹2-5L' },
              { mistake: 'Over-Trading (Daily/Weekly)', cost: 'Brokerage + taxes eat all profits. 90% day traders lose money' },
              { mistake: 'Following Hot Tips Blindly', cost: 'Invest in bad stocks, scams - lose ₹50K-2L' },
              { mistake: 'Investing Without Emergency Fund', cost: 'Forced to sell at loss during emergencies' },
              { mistake: 'Not Diversifying (All in 1 Stock)', cost: 'If stock crashes 80%, entire portfolio gone' },
              { mistake: 'Chasing Past Returns', cost: "Last year's winner often becomes this year's loser" },
              { mistake: 'Ignoring Expense Ratio', cost: 'High fees (2%+) eat ₹15L over 30 years' },
              { mistake: 'Short-Term Thinking (&lt;3 Years)', cost: 'Market volatility destroys wealth. Need 5+ years minimum' },
              { mistake: 'Not Reviewing Portfolio Annually', cost: 'Asset allocation drifts, risk increases unknowingly' }
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-start p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start gap-3">
                  <span className="text-xl font-bold text-red-700">{i + 1}.</span>
                  <div>
                    <strong className="text-gray-900 block">{item.mistake}</strong>
                    <p className="text-sm text-red-800 mt-1">{item.cost}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">🎉 Investing Category Complete!</h2>
          <p className="text-xl mb-6">You've mastered all 10 lessons on wealth creation!</p>
          <Link to="/learn" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
            Explore More Categories <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default InvestingMistakes;


