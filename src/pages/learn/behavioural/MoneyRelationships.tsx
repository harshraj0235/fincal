import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Award } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const MoneyRelationships: React.FC = () => (
  <>
    <SEOHelmet title="Money Relationships: Family Finance Couples Money Management India 2025 | MoneyCal" description="Manage money in relationships. Discussing finances with partner, joint vs separate accounts, financial goals alignment, teaching kids about money, family budget meetings." keywords="money relationships India, family finance, couples money management, joint accounts, teaching kids money, धन और रिश्ते" url="/learn/behavioural-finance-money-psychology/money-relationships-family-finance-couples-money-management-india-2025" />
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/behavioural-finance-money-psychology" className="flex items-center gap-2 text-gray-600 hover:text-pink-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 7 of 7 - FINAL!</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Money & Relationships: Financial Harmony!</h1>
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">💑 Money Management for Couples</h2>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Discuss Before Marriage:</strong> Talk about: 1) Debt (student loans, credit cards), 2) Spending habits (saver vs spender), 3) Financial goals (retire early? buy house?), 4) Family support (sending money to parents?). No surprises!</li>
            <li>• <strong>Joint vs Separate Accounts:</strong> Best: Hybrid! Joint account for household expenses (rent, groceries). Separate accounts for personal spending (no questions asked). Transparent + independent.</li>
            <li>• <strong>Financial Goals Alignment:</strong> Monthly money dates. Review: 1) Budget, 2) Investments, 3) Short-term goals (vacation), 4) Long-term goals (kids education). Both partners on same page!</li>
            <li>• <strong>Teaching Kids About Money:</strong> Age 5-7: Needs vs wants. Age 8-12: Pocket money (₹100/week), savings goal. Age 13-18: Bank account, part-time job. Age 18+: Investing basics, avoid debt. Early lessons = wealthy kids!</li>
            <li>• <strong>Family Budget Meetings:</strong> Monthly 1-hour meeting. Review expenses, upcoming bills, investment returns. Include kids (age 10+). Transparency builds financial literacy.</li>
            <li>• <strong>Conflict Resolution:</strong> Money = #1 reason for divorce. Rules: 1) Both partners earn, both get equal say, 2) Big purchases (₹50K+) = discuss, 3) Emergency fund = untouchable, 4) No blame, focus on solutions.</li>
          </ul>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">🎉 CONGRATULATIONS! ALL 10 CATEGORIES COMPLETE!</h2>
          <p className="text-xl mb-6">You've completed the ENTIRE MoneyCal Learn Platform - 67 comprehensive lessons across 10 categories! You're now a financial expert! 🏆</p>
          <Link to="/learn" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
            Back to Learn Hub <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default MoneyRelationships;

