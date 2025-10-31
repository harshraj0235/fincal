import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, ArrowRight, ArrowLeft, BarChart3, TrendingUp, TrendingDown,
  CheckCircle, XCircle, Target, Calendar, Clock, Award, AlertTriangle,
  Lightbulb, RefreshCw, Eye, DollarSign, PieChart, Activity, Zap
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

/**
 * LESSON 7: Reviewing & Adjusting Budget - Stay on Track
 * Category: Money Management & Budgeting
 * Duration: 35 minutes
 * Difficulty: Intermediate
 * 
 * Learning Objectives:
 * 1. Learn why monthly budget reviews are critical
 * 2. Master the review process (compare actual vs planned)
 * 3. Identify overspending patterns quickly
 * 4. Adjust budget for life changes (salary, expenses, goals)
 * 5. Stay financially disciplined with quarterly reviews
 */

const ReviewingBudget: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<'jan' | 'feb' | 'mar'>('jan');

  // Sample budget data
  const budgetData = {
    jan: {
      planned: { needs: 30000, wants: 18000, savings: 12000 },
      actual: { needs: 32500, wants: 22000, savings: 5500 },
      income: 60000
    },
    feb: {
      planned: { needs: 30000, wants: 15000, savings: 15000 },
      actual: { needs: 31000, wants: 16500, savings: 12500 },
      income: 60000
    },
    mar: {
      planned: { needs: 30000, wants: 15000, savings: 15000 },
      actual: { needs: 29500, wants: 14000, savings: 16500 },
      income: 60000
    }
  };

  const current = budgetData[selectedMonth];

  return (
    <>
      <SEOHelmet
        title="Budget Review Guide: Monthly, Quarterly, Annual | MoneyCal Learn"
        description="Master budget reviewing in Hindi & English. Learn to track spending, identify overspending, adjust for life changes. Stay on track with Indian examples."
        keywords="budget review India, track expenses, overspending analysis, budget adjustment, monthly review, quarterly budget Hindi, बजट समीक्षा"
        url="/learn/money-management/reviewing-adjusting-budget-monthly-quarterly-annual"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/money-management" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Money Management</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 7 of 8</span>
                <Link 
                  to="/learn/money-management/financial-mistakes-to-avoid-impulse-spending-india"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span className="hidden sm:inline">Next Lesson</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Lesson Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                  Lesson 7 • 35 Minutes • Intermediate
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Reviewing & Adjusting Your Budget
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  बजट की समीक्षा और समायोजन - ट्रैक पर बने रहें
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learning Objectives (सीखने के उद्देश्य)
              </h3>
              <ul className="space-y-2">
                {[
                  'Why 80% of budgets fail without regular reviews',
                  'Master the monthly review process (15 minutes/month)',
                  'Spot overspending patterns before they become debt',
                  'Adjust budget for life changes (salary increase, new expenses)',
                  'Quarterly deep dives to stay aligned with financial goals'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Section 1: Why Review? */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Eye className="w-8 h-8 text-purple-600" />
              1. Why Review Your Budget? (समीक्षा क्यों?)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Creating a budget is just 20% of the work. The other 80% is <strong>reviewing and adjusting</strong> it monthly. 
                Most Indians create a budget once, then forget it—and wonder why they're still broke!
              </p>

              <div className="bg-red-50 rounded-xl p-6 mb-6 border-2 border-red-300">
                <h4 className="text-xl font-bold text-red-900 mb-4">📊 The Harsh Reality:</h4>
                <div className="space-y-3">
                  {[
                    { stat: '78% of Indians', fact: 'Never review their budget after creating it (2024 HDFC Survey)' },
                    { stat: '65%', fact: "Don't know where their money went by month-end" },
                    { stat: '₹8,000/month', fact: "Average "invisible" overspending Indians don't notice without reviews" },
                    { stat: '3 months', fact: 'Average time before a budget is completely abandoned (without reviews)' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                      <div className="flex justify-between items-center">
                        <strong className="text-red-700">{item.stat}</strong>
                        <span className="text-sm text-gray-700">{item.fact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-300">
                <h4 className="text-xl font-bold text-green-900 mb-4">✅ What Happens WITH Reviews:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Catch overspending early:</strong> Notice ₹5K extra on dining before it becomes ₹15K</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Stay motivated:</strong> See progress (savings growing month-over-month)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Adapt to life:</strong> Got a raise? Allocate before lifestyle inflation hits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Build discipline:</strong> Monthly accountability keeps you honest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Hit goals faster:</strong> Course-correct monthly = reach financial goals 2x faster</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Section 2: Monthly Review Process */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-600" />
              2. Monthly Budget Review (मासिक समीक्षा - 15 Minutes)
            </h2>

            <div className="prose max-w-none">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-8 h-8" />
                  <h4 className="text-2xl font-bold">⏰ When to Review:</h4>
                </div>
                <p className="text-xl mb-3">
                  <strong>1st Sunday of Every Month</strong> - Morning (9-10 AM)
                </p>
                <p className="text-white/90">
                  Set recurring calendar reminder. Treat it like a doctor appointment—NON-NEGOTIABLE!
                </p>
              </div>

              {/* Interactive Budget Comparison */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">📊 Interactive: Actual vs Planned</h4>
                
                <div className="flex gap-2 mb-4">
                  {(['jan', 'feb', 'mar'] as const).map((month) => (
                    <button
                      key={month}
                      onClick={() => setSelectedMonth(month)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        selectedMonth === month
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-blue-100'
                      }`}
                    >
                      {month.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="bg-white rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h5 className="font-bold text-blue-900 mb-3">📝 Planned (Budget)</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b">
                          <span>Needs (50%):</span>
                          <strong>₹{current.planned.needs.toLocaleString()}</strong>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span>Wants (30%):</span>
                          <strong>₹{current.planned.wants.toLocaleString()}</strong>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span>Savings (20%):</span>
                          <strong>₹{current.planned.savings.toLocaleString()}</strong>
                        </div>
                        <div className="flex justify-between py-3 bg-blue-100 px-3 rounded-lg font-bold">
                          <span>Total:</span>
                          <span>₹{current.income.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-bold text-green-900 mb-3">✅ Actual (Spent)</h5>
                      <div className="space-y-2">
                        <div className={`flex justify-between py-2 border-b ${
                          current.actual.needs > current.planned.needs ? 'bg-red-50' : ''
                        }`}>
                          <span>Needs:</span>
                          <strong className={current.actual.needs > current.planned.needs ? 'text-red-700' : ''}>
                            ₹{current.actual.needs.toLocaleString()}
                          </strong>
                        </div>
                        <div className={`flex justify-between py-2 border-b ${
                          current.actual.wants > current.planned.wants ? 'bg-red-50' : ''
                        }`}>
                          <span>Wants:</span>
                          <strong className={current.actual.wants > current.planned.wants ? 'text-red-700' : ''}>
                            ₹{current.actual.wants.toLocaleString()}
                          </strong>
                        </div>
                        <div className={`flex justify-between py-2 border-b ${
                          current.actual.savings < current.planned.savings ? 'bg-red-50' : 'bg-green-50'
                        }`}>
                          <span>Savings:</span>
                          <strong className={current.actual.savings < current.planned.savings ? 'text-red-700' : 'text-green-700'}>
                            ₹{current.actual.savings.toLocaleString()}
                          </strong>
                        </div>
                        <div className="flex justify-between py-3 bg-green-100 px-3 rounded-lg font-bold">
                          <span>Total:</span>
                          <span>₹{(current.actual.needs + current.actual.wants + current.actual.savings).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                    <strong className="text-yellow-900">💡 Analysis:</strong>
                    <p className="text-sm text-gray-700 mt-2">
                      {selectedMonth === 'jan' && '❌ Overspent ₹4K on wants, saved ₹6.5K less! Cut dining/shopping next month.'}
                      {selectedMonth === 'feb' && '⚠️ Wants over by ₹1.5K, but savings improved to ₹12.5K. Getting better!'}
                      {selectedMonth === 'mar' && '✅ EXCELLENT! Under budget on wants, saved ₹16.5K! Keep it up!'}
                    </p>
                  </div>
                </div>
              </div>

              {/* 5-Step Review Process */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border-2 border-indigo-300">
                <h4 className="text-xl font-bold text-indigo-900 mb-5">📋 5-Step Monthly Review Process:</h4>
                
                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: 'Gather All Data (5 mins)',
                      actions: [
                        'Bank statements (all accounts)',
                        'Credit card bills',
                        'UPI transaction history (Google Pay, PhonePe)',
                        'Cash expenses (if tracked manually)'
                      ]
                    },
                    {
                      step: 2,
                      title: 'Calculate Actual Spending (5 mins)',
                      actions: [
                        'Total needs: Rent + groceries + utilities + transport',
                        'Total wants: Dining + entertainment + shopping',
                        'Total savings: SIPs + investments + emergency fund'
                      ]
                    },
                    {
                      step: 3,
                      title: 'Compare vs Budget (2 mins)',
                      actions: [
                        'For each category: Actual - Planned = Variance',
                        'Red flags: Wants overspent by &gt;10%, Savings &lt;20%',
                        'Green flags: All categories within ±5% of plan'
                      ]
                    },
                    {
                      step: 4,
                      title: 'Identify Root Causes (2 mins)',
                      actions: [
                        'Why overspent? (Wedding? Medical emergency? Impulse?)',
                        'Was it one-time or recurring?',
                        'Which specific expenses were unplanned?'
                      ]
                    },
                    {
                      step: 5,
                      title: 'Adjust Next Month (1 min)',
                      actions: [
                        'Cut wants by 20% if overspent this month',
                        'Increase savings allocation if got a raise',
                        'Add new budget lines for recurring expenses'
                      ]
                    }
                  ].map((item) => (
                    <div key={item.step} className="bg-white rounded-lg p-5 border-l-4 border-indigo-500">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h5 className="text-lg font-bold text-indigo-900">{item.title}</h5>
                        </div>
                      </div>
                      <ul className="ml-13 space-y-1 text-sm text-gray-700">
                        {item.actions.map((action, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-indigo-600">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 3: Adjusting for Life Changes */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Activity className="w-8 h-8 text-green-600" />
              3. Adjusting Budget for Life Changes (जीवन परिवर्तन)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Life doesn't stay constant. Your budget shouldn't either! Here's how to adjust when things change:
              </p>

              <div className="space-y-6">
                {[
                  {
                    scenario: '💰 Got a Salary Increase (₹50K → ₹65K)',
                    scenarioHindi: 'वेतन वृद्धि',
                    color: 'green',
                    oldBudget: { needs: 25000, wants: 15000, savings: 10000, total: 50000 },
                    newBudget: { needs: 28000, wants: 17000, savings: 20000, total: 65000 },
                    tips: [
                      '✅ Save 70% of increase: ₹15K raise → save ₹10K more',
                      '✅ Spend 30% on lifestyle: ₹5K for better food/clothes',
                      '❌ DON\'T: Upgrade rent, buy car immediately (lifestyle inflation!)',
                      '✅ DO: Increase SIP from ₹8K → ₹18K'
                    ]
                  },
                  {
                    scenario: '👶 New Baby/Family Member Added',
                    scenarioHindi: 'नया बच्चा/परिवार का सदस्य',
                    color: 'blue',
                    oldBudget: { needs: 30000, wants: 18000, savings: 12000, total: 60000 },
                    newBudget: { needs: 40000, wants: 10000, savings: 10000, total: 60000 },
                    tips: [
                      '✅ Increase needs: +₹10K (diapers, formula, doctor visits)',
                      '✅ Cut wants drastically: ₹18K → ₹10K (no more dining out)',
                      '✅ Maintain minimum 15% savings (₹10K)',
                      '✅ Start child education SIP: ₹3K/month for 18 years = ₹27L'
                    ]
                  },
                  {
                    scenario: '🚗 Bought a Car (New EMI ₹15K/month)',
                    scenarioHindi: 'नई कार खरीदी',
                    color: 'orange',
                    oldBudget: { needs: 30000, wants: 18000, savings: 12000, total: 60000 },
                    newBudget: { needs: 45000, wants: 10000, savings: 5000, total: 60000 },
                    tips: [
                      '⚠️ EMI is a "need" now: ₹30K → ₹45K needs',
                      '❌ Dangerous: Savings dropped to ₹5K (8% only)',
                      '✅ Solution: Increase income (freelance ₹10K) OR sell car',
                      '💡 Better: Buy used car (₹5K EMI instead of ₹15K)'
                    ]
                  },
                  {
                    scenario: '😷 Medical Emergency (₹1L Hospital Bill)',
                    scenarioHindi: 'चिकित्सा आपातकाल',
                    color: 'red',
                    oldBudget: { needs: 30000, wants: 18000, savings: 12000, total: 60000 },
                    newBudget: { needs: 30000, wants: 5000, savings: 0, total: 35000 },
                    tips: [
                      '🚨 Use emergency fund FIRST (if you have it)',
                      '✅ Cut wants to ZERO for 3 months to rebuild fund',
                      '✅ Pause SIPs temporarily (3 months max)',
                      '✅ Replenish emergency fund before resuming normal budget'
                    ]
                  }
                ].map((scenario, i) => (
                  <div key={i} className={`bg-${scenario.color}-50 rounded-xl p-6 border-2 border-${scenario.color}-300`}>
                    <h4 className={`text-xl font-bold text-${scenario.color}-900 mb-2`}>{scenario.scenario}</h4>
                    <p className={`text-${scenario.color}-700 text-sm mb-4`}>{scenario.scenarioHindi}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-white rounded-lg p-4">
                        <strong className="block mb-2 text-gray-900">Old Budget:</strong>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between"><span>Needs:</span><span>₹{scenario.oldBudget.needs.toLocaleString()}</span></div>
                          <div className="flex justify-between"><span>Wants:</span><span>₹{scenario.oldBudget.wants.toLocaleString()}</span></div>
                          <div className="flex justify-between"><span>Savings:</span><span>₹{scenario.oldBudget.savings.toLocaleString()}</span></div>
                          <div className="flex justify-between font-bold pt-2 border-t"><span>Total:</span><span>₹{scenario.oldBudget.total.toLocaleString()}</span></div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <strong className="block mb-2 text-gray-900">New Budget:</strong>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between"><span>Needs:</span><span>₹{scenario.newBudget.needs.toLocaleString()}</span></div>
                          <div className="flex justify-between"><span>Wants:</span><span>₹{scenario.newBudget.wants.toLocaleString()}</span></div>
                          <div className="flex justify-between"><span>Savings:</span><span>₹{scenario.newBudget.savings.toLocaleString()}</span></div>
                          <div className="flex justify-between font-bold pt-2 border-t"><span>Total:</span><span>₹{scenario.newBudget.total.toLocaleString()}</span></div>
                        </div>
                      </div>
                    </div>

                    <div className={`bg-white p-4 rounded-lg`}>
                      <strong className={`text-${scenario.color}-800 block mb-2`}>💡 Adjustment Tips:</strong>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {scenario.tips.map((tip, j) => (
                          <li key={j}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Section 4: Quarterly Deep Dive */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-purple-600" />
              4. Quarterly Review (तिमाही समीक्षा - 1 Hour)
            </h2>

            <div className="prose max-w-none">
              <div className="bg-purple-50 rounded-xl p-6 mb-6 border-2 border-purple-300">
                <h4 className="text-xl font-bold text-purple-900 mb-4">📅 When: Every 3 Months (Mar, Jun, Sep, Dec)</h4>
                <p className="text-purple-800 mb-4">
                  Deep dive to check if you're on track for <strong>annual financial goals</strong>. 
                  This is your "financial health checkup"!
                </p>
                
                <div className="bg-white rounded-lg p-5">
                  <strong className="text-purple-900 block mb-3">📊 What to Review:</strong>
                  <div className="space-y-3">
                    {[
                      { item: 'Net Worth Growth', check: 'Did it increase by 5-10% this quarter?' },
                      { item: 'Goal Progress', check: 'Emergency fund: on track to 6 months? SIP: growing as planned?' },
                      { item: 'Average Monthly Savings Rate', check: 'Maintaining 20%+ consistently?' },
                      { item: 'Debt Reduction', check: 'Credit card debt decreasing? Loans on schedule?' },
                      { item: 'Investment Performance', check: 'MF/stocks: beating inflation (7%+)?' }
                    ].map((review, i) => (
                      <div key={i} className="flex items-start gap-3 py-2 border-b last:border-0">
                        <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-gray-900">{review.item}</strong>
                          <p className="text-sm text-gray-600">{review.check}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
                <strong className="text-blue-900">💡 Quarterly Action Items:</strong>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    <li>• Adjust annual goals if life changed significantly</li>
                    <li>• Rebalance investments (if equity &gt;70%, move some to debt)</li>
                    <li>• Review and cancel unused subscriptions</li>
                    <li>• Check insurance coverage (is it still adequate?)</li>
                    <li>• Plan for upcoming major expenses (festivals, vacations)</li>
                  </ul>
              </div>
            </div>
          </motion.section>

          {/* Key Takeaways */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              ✅ Key Takeaways (मुख्य बातें)
            </h2>
            <div className="space-y-4">
              {[
                'Budget without review = useless. 80% fail because they never check actual vs planned.',
                'Monthly review = 15 minutes, 1st Sunday of every month. Set recurring calendar reminder.',
                '5-step process: Gather data → Calculate actual → Compare → Find root causes → Adjust next month.',
                'Life changes = budget changes: Salary increase? Save 70%. New baby? Cut wants, not savings.',
                'Quarterly deep dive (1 hour): Check net worth, goal progress, investment performance, debt reduction.',
                'Red flag: Savings &lt;15% for 2+ months = lifestyle inflation or overspending (fix ASAP).',
                'Green flag: Within ±5% of budget consistently = financial discipline mastered!',
                'Tool recommendations: Use Money Manager, Walnut, or simple Excel tracker.',
                'Adjust for seasonality: Diwali? Budget extra ₹10K for gifts/shopping in advance.',
                'Remember: Budget is not restrictive—it\'s permission to spend guilt-free within limits!'
              ].map((takeaway, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <span className="text-2xl font-bold text-white/80">{i + 1}.</span>
                  <p className="text-white text-lg">{takeaway}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Related Calculators */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🧮 Track Your Budget (मुफ्त कैलकुलेटर)
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Budget Calculator', link: '/calculators/budget-calculator', icon: '📊', desc: 'Plan and track spending' },
                { name: 'Expense Tracker', link: '/calculators/expense-tracker', icon: '💸', desc: 'Monitor daily expenses' },
                { name: 'Net Worth Calculator', link: '/calculators/net-worth-calculator', icon: '💰', desc: 'Track wealth growth' }
              ].map((calc, i) => (
                <Link
                  key={i}
                  to={calc.link}
                  className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all group"
                >
                  <div className="text-4xl mb-3">{calc.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {calc.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">{calc.desc}</p>
                  <div className="flex items-center text-blue-600 font-semibold text-sm">
                    Open Calculator
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Next Steps */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">
                🎓 Ready for the Final Lesson?
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Complete your money management mastery by learning the top 15 financial mistakes to avoid!
              </p>
              <Link
                to="/learn/money-management/financial-mistakes-to-avoid-impulse-spending-india"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                Final Lesson: Common Money Mistakes
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </motion.section>

          {/* Disclaimer */}
          <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-600">
            <p>
              <strong>Disclaimer:</strong> Budget review processes and adjustment strategies are general guidelines. 
              Your specific situation may require different approaches. Consult a certified financial planner for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewingBudget;

