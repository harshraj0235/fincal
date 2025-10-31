import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const MoneyHabits: React.FC = () => (
  <>
    <SEOHelmet title="Money Habits: Discipline Delayed Gratification Compound Effect India 2025 | MoneyCal" description="Build wealth habits. Pay yourself first, automate savings, delayed gratification (save today for tomorrow), compound effect of small daily actions, 1% improvement daily." keywords="money habits India, discipline, delayed gratification, compound effect, pay yourself first, धन आदतें अनुशासन" url="/learn/behavioural-finance-money-psychology/money-habits-discipline-delayed-gratification-compound-effect-india-2025" />
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/behavioural-finance-money-psychology" className="flex items-center gap-2 text-gray-600 hover:text-purple-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 4 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Money Habits: Small Actions, Big Wealth!</h1>
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">💪 7 Wealth-Building Habits</h2>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Pay Yourself First:</strong> Salary arrives → Transfer 20-30% to investment account FIRST. Then spend rest. Not: Spend first, save leftover (there's never leftover!).</li>
            <li>• <strong>Automate Everything:</strong> Set up auto-SIP on 1st of month. Automate bill payments. Remove temptation to spend/skip.</li>
            <li>• <strong>Delayed Gratification:</strong> Want iPhone? Wait 6 months, invest ₹10K/month instead. After 6 months, buy iPhone + have ₹60K invested! Delayed = doubled.</li>
            <li>• <strong>1% Daily Improvement:</strong> 1% better daily = 37× better in a year (1.01^365 = 37.78). Read 10 pages/day = 12 books/year. Small actions compound!</li>
            <li>• <strong>Track Every Rupee (1 Month):</strong> Track all expenses for 30 days. You'll be shocked! ₹5K on Swiggy? ₹3K on unused subscriptions? Awareness = change.</li>
            <li>• <strong>50/30/20 Rule:</strong> 50% needs (rent, food), 30% wants (entertainment), 20% savings/investments. Simple, sustainable.</li>
            <li>• <strong>Rich Friends, Rich You:</strong> Your income is average of 5 closest friends. Surround yourself with ambitious, wealth-building people. Leave negative "money is evil" friends.</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default MoneyHabits;

