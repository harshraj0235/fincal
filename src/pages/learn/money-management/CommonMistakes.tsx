import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, ArrowRight, ArrowLeft, AlertTriangle, XCircle, CheckCircle,
  TrendingDown, DollarSign, CreditCard, ShoppingCart, Target, Award,
  Lightbulb, Shield, PiggyBank, Smartphone, Car, Home, Brain, Zap,
  Activity, Heart, Calendar, Clock
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

/**
 * LESSON 8: Common Financial Mistakes to Avoid
 * Category: Money Management & Budgeting
 * Duration: 40 minutes
 * Difficulty: Beginner
 * 
 * Learning Objectives:
 * 1. Identify the top 15 financial mistakes Indians make
 * 2. Understand the true cost of each mistake (₹ impact)
 * 3. Learn practical solutions to avoid/fix them
 * 4. Recognize early warning signs before damage is done
 * 5. Build a mistake-proof financial system
 */

const CommonMistakes: React.FC = () => {
  const [expandedMistake, setExpandedMistake] = useState<number | null>(null);

  const mistakes = [
    {
      id: 1,
      mistake: 'No Emergency Fund - Living Paycheck-to-Paycheck',
      mistakeHindi: 'आपातकालीन फंड नहीं',
      severity: 'Critical',
      cost: '₹50,000 - ₹3,00,000 in high-interest debt when emergency hits',
      why: 'One medical emergency, job loss, or car breakdown = forced to borrow at 24-36% interest from credit cards, personal loans, or worse—moneylenders.',
      solution: [
        'Start with mini-goal: Save ₹10,000 in 2 months',
        'Build to ₹50,000 (covers most small emergencies)',
        'Target: 6 months expenses in savings + liquid fund',
        'Auto-transfer ₹5K/month to separate account on salary day'
      ],
      realExample: 'Rajesh had no emergency fund. Father hospitalized. Needed ₹1.5L urgently. Took personal loan @ 18% APR. Now paying ₹27K extra interest over 2 years!'
    },
    {
      id: 2,
      mistake: 'Impulse Buying & Lifestyle Inflation',
      mistakeHindi: 'आवेगपूर्ण खरीदारी',
      severity: 'High',
      cost: '₹60,000 - ₹1,50,000 wasted annually on unnecessary purchases',
      why: "Flipkart sales, Instagram ads, friend pressure → buy things you don't need. Salary increases but savings stay same (upgrade lifestyle instead of wealth).",
      solution: [
        '24-hour rule: Wait 24 hours before buying anything &gt;₹2,000',
        'Uninstall shopping apps during weak moments',
        'When salary increases, save 70% of raise, spend 30%',
        'Ask: "Do I NEED it or just WANT it?"'
      ],
      realExample: 'Priya earned ₹40K → ₹60K. Instead of saving ₹14K more, she upgraded apartment (₹10K extra rent), bought car (₹12K EMI). Savings unchanged at ₹6K. Wasted ₹20K raise opportunity!'
    },
    {
      id: 3,
      mistake: 'Paying Only Credit Card Minimum Due',
      mistakeHindi: 'केवल न्यूनतम भुगतान',
      severity: 'Critical',
      cost: '₹30,000 - ₹50,000 annual interest on ₹1L balance @ 36-42% APR',
      why: 'Banks show minimum (₹2,500 on ₹1L) to trap you. Remaining ₹97,500 compounds at 3% monthly interest = ₹36K+ yearly interest!',
      solution: [
        'ALWAYS pay FULL balance before due date (set auto-pay)',
        'If can\'t pay full → STOP using card immediately',
        'Pay more than minimum (at least 50% of balance)',
        'Consider 0% balance transfer to another card'
      ],
      realExample: 'Amit had ₹1L credit card debt. Paid ₹5K minimum monthly. After 2 years: Still owed ₹85K + paid ₹60K interest. Total loss: ₹60K!'
    },
    {
      id: 4,
      mistake: 'Not Tracking Expenses (Money "Disappears")',
      mistakeHindi: 'खर्चों को ट्रैक नहीं करना',
      severity: 'High',
      cost: '₹8,000 - ₹15,000 leaked monthly = ₹96K - ₹1.8L annually',
      why: "Don't know where money goes. Common response: "Pata nahi, khatam ho gaya!" Small expenses (₹100 Starbucks, ₹50 auto) add up invisibly.",
      solution: [
        'Track EVERY expense for 30 days (use Money Manager app)',
        'Find top 3 leak categories (usually: food delivery, transport, subscriptions)',
        'Set category limits: Max ₹5K dining, ₹2K cafe, ₹1K subscriptions',
        'Review weekly for first 3 months'
      ],
      realExample: 'Rohan tracked for 30 days. Found: ₹8K Zomato (thought ₹3K), ₹3.5K Uber (thought ₹1K), ₹2K unused Netflix/Prime. Total leak: ₹13.5K/month = ₹1.62L/year!'
    },
    {
      id: 5,
      mistake: 'Investing Before Building Emergency Fund',
      mistakeHindi: 'आपातकालीन फंड से पहले निवेश',
      severity: 'High',
      cost: 'Forced to sell investments at loss during emergencies (lose 20-40%)',
      why: 'Started SIP in stocks without emergency fund. Medical emergency hit → market down 30% → sold stocks at loss to pay hospital bill.',
      solution: [
        'Rule: Emergency fund FIRST, investing SECOND',
        'Build minimum 3 months expenses before starting SIP',
        'Ideal: 6 months emergency fund → then invest aggressively',
        'Don\'t pause emergency fund building for "stock opportunities"'
      ],
      realExample: 'Sneha invested ₹2L in stocks without emergency fund. Lost job during COVID. Market crashed 40%. Forced to sell at ₹1.2L (₹80K loss) to survive 6 months.'
    },
    {
      id: 6,
      mistake: 'Taking Loans for Depreciating Assets',
      mistakeHindi: 'घटती संपत्तियों के लिए लोन',
      severity: 'High',
      cost: '₹2,00,000 - ₹5,00,000 lost in interest + depreciation over loan tenure',
      why: 'Car loan for ₹10L @ 10% APR for 5 years = ₹2.7L interest. Car value drops to ₹4L in 5 years. Total loss: ₹2.7L (interest) + ₹6L (depreciation) = ₹8.7L!',
      solution: [
        'NEVER take loan for car, gadgets, vacations (depreciating/consumables)',
        'Only take loan for: Home (appreciates), education (increases income), business (generates cash)',
        'Want car? Save and buy used/cash. Or use public transport + Uber (cheaper)',
        'Calculate TRUE cost: Loan amount + interest + depreciation'
      ],
      realExample: 'Vikram took ₹8L car loan @ 11% for 5 years. EMI ₹17.4K × 60 = ₹10.44L paid. Car now worth ₹3L. Lost ₹7.44L!'
    },
    {
      id: 7,
      mistake: 'No Health Insurance (Medical Bankruptcy Risk)',
      mistakeHindi: 'स्वास्थ्य बीमा नहीं',
      severity: 'Critical',
      cost: 'One hospitalization = ₹2L - ₹10L out of pocket → debt trap',
      why: "Thought "I'm young, healthy, don\"t need insurance." One accident/illness = entire savings + emergency fund wiped out.',
      solution: [
        'Get ₹5L family floater health insurance NOW (costs ₹12-15K/year)',
        'Increase to ₹10L after 30 years old',
        'Top-up with ₹20L super top-up (cheap: ₹5K/year)',
        'Don\'t rely on employer insurance (you lose it if you quit)'
      ],
      realExample: 'Sanjay, 32, no insurance. Appendix surgery + 5 days ICU = ₹3.8L bill. Used entire ₹2L emergency fund + ₹1.8L personal loan @ 16%. Could have avoided with ₹15K/year insurance!'
    },
    {
      id: 8,
      mistake: 'Mixing Goals (Using Goal Money for Other Goals)',
      mistakeHindi: 'लक्ष्यों को मिलाना',
      severity: 'Medium',
      cost: 'Delays goals by 2-5 years, loses compounding benefit',
      why: 'Saving for house down payment (₹10L goal). Saw car on discount. Used ₹3L from house fund for car. Now house delayed by 3 years!',
      solution: [
        'Separate account/SIP for each goal (house, car, vacation, retirement)',
        'Label accounts clearly: "House DP SIP", "Emergency Fund", "Vacation Fund"',
        'NEVER mix money between goals (treat as untouchable)',
        'If goal amount reached, use ONLY for that goal'
      ],
      realExample: 'Rahul saved ₹5L in "child education" fund. Friend offered "great stock tip." Invested ₹3L. Stock crashed 60%. Lost ₹1.8L. Child education delayed!'
    },
    {
      id: 9,
      mistake: 'Ignoring Inflation (Keeping All Money in Savings)',
      mistakeHindi: 'मुद्रास्फीति को नजरअंदाज करना',
      severity: 'High',
      cost: 'Loses 3-4% purchasing power annually = ₹30K loss on ₹10L in 1 year',
      why: 'Savings account gives 3.5% interest. Inflation is 6%. Real return = -2.5% (losing money despite "saving"!).',
      solution: [
        'Keep only 3-6 months expenses in savings (emergency fund)',
        'Rest: Invest in assets that beat inflation (stocks 12%, MF 10%, PPF 7.1%)',
        'Mix: 50% equity (long-term), 30% debt (stable), 20% liquid (emergency)',
        'Review annually: Is your money growing faster than inflation?'
      ],
      realExample: 'Uncle kept ₹50L in FD @ 6% for 10 years. Grew to ₹89.5L. Sounds good? Inflation @ 6% means he needed ₹89.5L to buy same things. Real gain = ₹0!'
    },
    {
      id: 10,
      mistake: 'Following "Hot Tips" Without Research',
      mistakeHindi: 'बिना रिसर्च के निवेश',
      severity: 'High',
      cost: '₹50,000 - ₹2,00,000 lost in bad investments',
      why: "Friend: "Buy XYZ stock, it'll double!" WhatsApp: "Invest in ABC scheme, 20% monthly returns!" → Lost money in scams/bad stocks.",
      solution: [
        'NEVER invest based on tips (friends, family, WhatsApp groups)',
        'Do own research: Check company fundamentals, read balance sheet',
        'If promised returns &gt;15% annually → probably scam',
        'Start with safe: Index funds (Nifty 50), blue-chip stocks',
        'If don\'t understand investment → DON\'T invest'
      ],
      realExample: 'Neha invested ₹2L in "guaranteed 30% returns" scheme her friend recommended. Company shut down after 6 months. Lost entire ₹2L (Ponzi scheme).'
    },
    {
      id: 11,
      mistake: 'Not Planning for Taxes (Surprise ₹50K Tax Bill)',
      mistakeHindi: 'कर योजना नहीं',
      severity: 'Medium',
      cost: '₹20,000 - ₹80,000 extra tax paid due to poor planning',
      why: "Didn't invest in 80C throughout year. March comes → panic → dump ₹1.5L in random tax-saving schemes. Lost opportunity for better returns.",
      solution: [
        'Start 80C investments from April (not March!)',
        'Auto-SIP ₹12,500/month in ELSS (₹1.5L/year 80C done)',
        'Use: PPF (₹12.5K/month), ELSS (₹12.5K SIP), life insurance (₹25K/year)',
        'Plan in advance → better returns + tax saving'
      ],
      realExample: "Karan earned ₹12L/year. Didn't plan 80C. March rush: Invested ₹1.5L in random insurance (bad returns 4%). Could have done ELSS @ 12% returns if planned!"
    },
    {
      id: 12,
      mistake: 'Buying Whole Life/Endowment Insurance (Instead of Term)',
      mistakeHindi: 'गलत बीमा खरीदना',
      severity: 'High',
      cost: '₹5,00,000 - ₹15,00,000 lost over 20 years (vs buying term + investing separately)',
      why: 'Agent sold ₹25L endowment plan (₹50K/year premium). Returns: 5-6% only. If bought ₹1Cr term (₹12K/year) + invested ₹38K in MF @ 12% = ₹3.5Cr in 20 years!',
      solution: [
        'NEVER mix insurance + investment (bad returns on both)',
        'Buy ONLY term insurance (₹1Cr cover = ₹12-15K/year)',
        'Invest rest in mutual funds, SIPs (₹38K/month @ 12%)',
        'Avoid: Endowment, money-back, ULIP (all bad)',
        'Insurance = protection, NOT investment'
      ],
      realExample: 'Anita bought ₹50L ULIP (₹1L/year premium for 20 years). After 20 years: Got ₹32L (6% return). If done ₹50L term (₹18K/year) + ₹82K MF SIP → would have ₹80L!'
    },
    {
      id: 13,
      mistake: 'Not Starting Early (Delaying Investments)',
      mistakeHindi: 'देर से शुरू करना',
      severity: 'High',
      cost: '₹50,00,000 - ₹1,00,00,000 lost compounding gains over 30 years',
      why: "Thought "I'm 25, retirement is 35 years away, I\"ll start at 30." Lost 5 years of compounding = massive wealth loss!',
      solution: [
        'Start investing the DAY you get first salary (even ₹1,000/month)',
        'Every year delayed = 30-40% less wealth at retirement',
        'Start small (₹1K SIP) → increase gradually (₹2K, ₹5K, ₹10K)',
        'Time in market &gt; timing the market'
      ],
      realExample: 'A: Started ₹5K SIP at 25 → At 60 (35 years) = ₹3.5Cr @ 12%. B: Started ₹5K SIP at 30 → At 60 (30 years) = ₹1.76Cr. A has 2× wealth just by starting 5 years earlier!'
    },
    {
      id: 14,
      mistake: 'Keeping All Eggs in One Basket (No Diversification)',
      mistakeHindi: 'विविधीकरण नहीं',
      severity: 'High',
      cost: '₹2,00,000 - ₹10,00,000 lost in single stock/sector crashes',
      why: 'Invested entire ₹5L in ONE stock or ONE sector (e.g., all real estate). Sector crashed → lost 60-80%.',
      solution: [
        'Diversify across: Equity (50%), Debt (30%), Gold (10%), Liquid (10%)',
        'Within equity: Mix large-cap + mid-cap + small-cap',
        'Use index funds (Nifty 50) for automatic diversification',
        'Never invest &gt;10% of portfolio in single stock'
      ],
      realExample: 'Deepak invested ₹8L entirely in real estate stocks (2018). Real estate crashed 2019-2020. Portfolio down 70% (₹5.6L loss). If diversified: Loss would be 15-20% only!'
    },
    {
      id: 15,
      mistake: 'Ignoring Spouse/Family in Financial Planning',
      mistakeHindi: 'परिवार को शामिल नहीं करना',
      severity: 'Medium',
      cost: 'Family conflicts, hidden debts discovered, goals missed',
      why: "Husband manages all money, wife doesn't know bank accounts, investments. Or vice versa. Leads to: conflict, financial abuse risk, family lost if sole manager dies.",
      solution: [
        'Monthly money meeting: 30 mins with spouse to discuss budget, goals',
        'Share all account details, passwords (in sealed envelope)',
        'Both should know: How much we have? Where? How to access?',
        'Joint financial goals: Both should agree on major expenses'
      ],
      realExample: "When Suresh died suddenly, wife Meera didn't know he had ₹15L debt. No will, no account info. Took 2 years legal battle to settle. Family suffered!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="15 Financial Mistakes to Avoid for Indians | MoneyCal Learn"
        description="Learn the top 15 money mistakes Indians make in Hindi & English. Impulse spending, no emergency fund, credit card debt, bad insurance. Real examples & solutions."
        keywords="financial mistakes India, money mistakes Hindi, impulse buying, credit card debt, emergency fund mistakes, bad investments, वित्तीय गलतियाँ, पैसे की गलतियाँ"
        url="/learn/money-management/financial-mistakes-to-avoid-impulse-spending-india"
      />

      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/money-management" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Money Management</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 8 of 8 - Final!</span>
                <Link 
                  to="/learn/money-management"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">Complete Course</span>
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
              <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl shadow-lg">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                  Lesson 8 • 40 Minutes • Beginner • FINAL LESSON
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Top 15 Financial Mistakes to Avoid
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  वित्तीय गलतियाँ जो आपको गरीब बनाती हैं - इनसे बचें!
                </p>
              </div>
            </div>

            {/* Alert */}
            <div className="bg-red-100 border-l-4 border-red-600 rounded-r-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    🚨 These Mistakes Cost Indians ₹10L - ₹50L Over a Lifetime
                  </h3>
                  <p className="text-red-800">
                    Learn from others' expensive mistakes. Each mistake has real cost (in ₹). Avoid them → save lakhs!
                  </p>
                </div>
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
                  'Identify the 15 most expensive financial mistakes Indians make',
                  'Calculate the true ₹ cost of each mistake over lifetime',
                  'Learn practical solutions to avoid or fix each mistake',
                  'Recognize early warning signs before damage compounds',
                  'Build a mistake-proof financial system'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Top 15 Mistakes */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              🚫 Top 15 Financial Mistakes (शीर्ष 15 गलतियाँ)
            </h2>

            <div className="space-y-6">
              {mistakes.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-red-200 hover:border-red-400 transition-all"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-2xl flex-shrink-0">
                          {item.id}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{item.mistake}</h3>
                          <p className="text-white/90">{item.mistakeHindi}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.severity === 'Critical' ? 'bg-red-900 text-white' :
                        item.severity === 'High' ? 'bg-orange-600 text-white' :
                        'bg-yellow-500 text-white'
                      }`}>
                        {item.severity}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    {/* Cost */}
                    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-red-600" />
                        <strong className="text-red-900">💸 Financial Cost:</strong>
                      </div>
                      <p className="text-red-800 font-semibold">{item.cost}</p>
                    </div>

                    {/* Why */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <strong className="text-gray-900 block mb-2">❓ Why People Make This Mistake:</strong>
                      <p className="text-gray-700 text-sm">{item.why}</p>
                    </div>

                    {/* Solution */}
                    <div className="bg-green-50 rounded-lg p-4 mb-4">
                      <strong className="text-green-900 block mb-3">✅ How to Avoid/Fix:</strong>
                      <ul className="space-y-2">
                        {item.solution.map((sol, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{sol}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Real Example */}
                    <button
                      onClick={() => setExpandedMistake(expandedMistake === item.id ? null : item.id)}
                      className="w-full text-left bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-blue-900">📖 Real Indian Example</strong>
                        <span className="text-blue-600 font-semibold text-sm">
                          {expandedMistake === item.id ? 'Hide ▲' : 'Show ▼'}
                        </span>
                      </div>
                    </button>

                    {expandedMistake === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4"
                      >
                        <p className="text-gray-800 italic">
                          <strong className="text-yellow-900">Real Story:</strong> {item.realExample}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Completion Badge */}
          <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 rounded-2xl p-12 text-center text-white shadow-2xl">
              <Award className="w-24 h-24 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">
                🎉 Congratulations!
              </h2>
              <p className="text-2xl mb-6 text-white/90">
                You've Completed Money Management & Budgeting!
              </p>
              <p className="text-xl text-white/80 mb-8">
                आपने पैसे का प्रबंधन और बजट पाठ्यक्रम पूरा कर लिया है!
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-8">
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-4xl font-bold mb-1">8</div>
                    <div className="text-sm text-white/80">Lessons Completed</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-1">6</div>
                    <div className="text-sm text-white/80">Hours Learning</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-1">5,000+</div>
                    <div className="text-sm text-white/80">Lines of Content</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-1">100%</div>
                    <div className="text-sm text-white/80">Mastery</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/learn"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
                >
                  Explore More Categories
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link
                  to="/calculators"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transition-all"
                >
                  Practice with Calculators
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Key Takeaways */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              ✅ Key Takeaways (मुख्य बातें)
            </h2>
            <div className="space-y-4">
              {[
                'Mistake #1: No emergency fund = one crisis away from debt trap. Build 6 months expenses FIRST.',
                'Mistake #2: Impulse buying wastes ₹60K-1.5L/year. Use 24-hour rule for purchases &gt;₹2K.',
                'Mistake #3: Paying only CC minimum = ₹30-50K yearly interest. Always pay FULL balance.',
                'Mistake #4: Not tracking expenses = ₹96K-1.8L leaked annually. Track for 30 days to find leaks.',
                'Mistake #5: Investing before emergency fund = forced to sell at loss. Emergency FIRST, investing SECOND.',
                'Mistake #6: Loans for cars/gadgets = ₹2-5L lost in interest + depreciation. Only loan for appreciating assets.',
                'Mistake #7: No health insurance = medical bankruptcy risk. Get ₹5L family floater NOW (₹12K/year).',
                'Mistake #8: Mixing goals = delays by 2-5 years. Separate SIP/account for each goal.',
                'Mistake #9: Ignoring inflation = losing 3-4% annually. Invest in equity/MF (beat inflation).',
                'Mistake #10: Following hot tips = ₹50K-2L lost. Do own research or use index funds.',
                'Mistake #11: No tax planning = ₹20-80K extra tax. Start 80C from April (not March).',
                'Mistake #12: Wrong insurance (endowment/ULIP) = ₹5-15L lost vs term + MF. Buy ONLY term.',
                'Mistake #13: Delaying investments = ₹50L-1Cr lost compounding. Start TODAY, even ₹1K/month.',
                'Mistake #14: No diversification = 60-80% loss in crashes. Diversify: equity, debt, gold.',
                'Mistake #15: Ignoring family in planning = conflicts, hidden debts. Monthly money meetings!'
              ].map((takeaway, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <span className="text-2xl font-bold text-white/80">{i + 1}.</span>
                  <p className="text-white text-lg">{takeaway}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* What's Next */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                🚀 Continue Your Learning Journey
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Link
                  to="/learn"
                  className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-300 hover:border-purple-500 hover:shadow-xl transition-all group"
                >
                  <BookOpen className="w-12 h-12 text-purple-600 mb-4" />
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    Explore 9 More Categories
                  </h4>
                  <p className="text-gray-600 mb-3">
                    Investing, Taxation, Insurance, Business Finance, and more!
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold">
                    View All Categories
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link
                  to="/news"
                  className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-300 hover:border-red-500 hover:shadow-xl transition-all group"
                >
                  <Activity className="w-12 h-12 text-red-600 mb-4" />
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    Stay Updated with News
                  </h4>
                  <p className="text-gray-600 mb-3">
                    Markets, IPOs, business analysis, and economic trends daily
                  </p>
                  <div className="flex items-center text-red-600 font-semibold">
                    Read Latest News
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Disclaimer */}
          <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-600">
            <p>
              <strong>Disclaimer:</strong> Financial mistakes and their costs are based on average scenarios and may vary. 
              Real examples are illustrative, not specific individuals. Consult a certified financial planner for personalized guidance.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonMistakes;


