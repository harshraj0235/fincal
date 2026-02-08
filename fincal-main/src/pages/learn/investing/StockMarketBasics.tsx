import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, ArrowRight, ArrowLeft, TrendingUp, TrendingDown, DollarSign,
  CheckCircle, XCircle, Target, AlertTriangle, Lightbulb, Award, 
  BarChart3, PieChart, Activity, Zap, Shield, Smartphone, CreditCard
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

/**
 * LESSON 1: Stock Market Basics - Complete Beginner Guide
 * Category: Investing & Wealth Creation
 * Duration: 50 minutes
 * Difficulty: Beginner
 * 
 * Learning Objectives:
 * 1. Understand what stock market is and how it works in India
 * 2. Learn about NSE, BSE, Nifty 50, Sensex
 * 3. Master demat account opening process
 * 4. Make your first stock purchase (step-by-step)
 * 5. Understand basic stock market terminology
 */

const StockMarketBasics: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(10000);
  const [growthRate, setGrowthRate] = useState<number>(12);
  const [years, setYears] = useState<number>(10);
  const [calculated, setCalculated] = useState(false);

  const futureValue = investmentAmount * Math.pow(1 + growthRate / 100, years);
  const totalReturns = futureValue - investmentAmount;

  return (
    <>
      <SEOHelmet
        title="Stock Market Basics for Beginners: NSE, BSE, Demat Account India | MoneyCal Learn"
        description="Complete stock market guide in Hindi & English. Learn NSE vs BSE, how to open demat account, buy first stock, trading hours. Real Indian examples."
        keywords="stock market India for beginners, demat account kaise khole, NSE BSE difference, buy shares India, stock trading basics Hindi, शेयर बाजार की बुनियादी बातें"
        url="/learn/investing-wealth/stock-market-basics-shares-nse-bse-demat-india"
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Investing & Wealth</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 1 of 10</span>
                <Link 
                  to="/learn/investing-wealth/mutual-funds-complete-guide-sip-nav-expense-ratio-india"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                  Lesson 1 • 50 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Stock Market Basics for Indians
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  शेयर बाजार की बुनियादी बातें - शुरुआती गाइड
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
                  'Understand what stock market is and how buying shares makes you part-owner of companies',
                  'Learn about NSE, BSE, Nifty 50, Sensex - India\'s stock exchanges and indices',
                  'Master the demat account opening process (online, 24 hours approval)',
                  'Make your first stock purchase step-by-step with real screenshots',
                  'Understand basic terminology: Bull market, Bear market, IPO, Dividend'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Section 1: What is Stock Market? */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-purple-600" />
              1. What is Stock Market? (शेयर बाजार क्या है?)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The <strong>stock market</strong> is a marketplace where <strong>shares (ownership pieces) of publicly listed companies</strong> 
                are bought and sold. When you buy 1 share of Reliance, you become a <strong>part-owner</strong> of that company!
              </p>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-purple-300">
                <h4 className="text-xl font-bold text-purple-900 mb-4">📌 Simple Example: Reliance Industries</h4>
                <div className="bg-white rounded-lg p-5">
                  <p className="text-gray-700 mb-3">
                    Reliance has <strong>674 crore (6.74 billion) total shares</strong>. Current market price: ₹2,500/share.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span>If you buy <strong>10 shares</strong>:</span>
                      <strong>Cost = ₹25,000</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Your ownership:</span>
                      <strong>10 ÷ 674 crore = 0.0000001%</strong>
                    </div>
                    <div className="flex justify-between py-2 bg-green-100 px-3 rounded-lg">
                      <span>If share price rises to ₹3,000:</span>
                      <strong className="text-green-700">Your 10 shares = ₹30,000 (₹5K profit!)</strong>
                    </div>
                    <div className="flex justify-between py-2 bg-red-100 px-3 rounded-lg">
                      <span>If share price falls to ₹2,000:</span>
                      <strong className="text-red-700">Your 10 shares = ₹20,000 (₹5K loss!)</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-300">
                <h4 className="text-xl font-bold text-blue-900 mb-4">💰 How Do You Make Money in Stocks?</h4>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                    <strong className="text-green-700 block mb-2">1. Capital Appreciation (Price Goes Up)</strong>
                    <p className="text-sm text-gray-700">
                      Buy Infosys @ ₹1,500 → Hold 3 years → Sell @ ₹2,000 = ₹500/share profit (33% gain)
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                    <strong className="text-blue-700 block mb-2">2. Dividends (Company Shares Profits)</strong>
                    <p className="text-sm text-gray-700">
                      Own 100 TCS shares. Company announces ₹50/share dividend. You get ₹5,000 directly to bank!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 2: NSE vs BSE */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Activity className="w-8 h-8 text-blue-600" />
              2. NSE vs BSE: India's 2 Stock Exchanges
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                India has <strong>2 main stock exchanges</strong> where shares are traded electronically. 
                Think of them as shopping malls where companies' shares are sold.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                      N
                    </div>
                    <h4 className="text-xl font-bold text-blue-900">NSE (National Stock Exchange)</h4>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between py-2 border-b">
                      <span>Founded:</span>
                      <strong>1992 (32 years old)</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Index:</span>
                      <strong>Nifty 50 (Top 50 companies)</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Trading Volume:</span>
                      <strong>Higher (more liquid)</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Listed Companies:</span>
                      <strong>2,000+</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Trading Hours:</span>
                      <strong>9:15 AM - 3:30 PM</strong>
                    </div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg mt-4">
                    <strong className="text-blue-900 block mb-1">💡 Fun Fact:</strong>
                    <p className="text-xs text-blue-800">
                      NSE is the world's largest derivative exchange by number of contracts traded!
                    </p>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-xl">
                      B
                    </div>
                    <h4 className="text-xl font-bold text-orange-900">BSE (Bombay Stock Exchange)</h4>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between py-2 border-b">
                      <span>Founded:</span>
                      <strong>1875 (149 years old!)</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Index:</span>
                      <strong>Sensex (Top 30 companies)</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Trading Volume:</span>
                      <strong>Lower than NSE</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Listed Companies:</span>
                      <strong>5,000+ (more than NSE)</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Trading Hours:</span>
                      <strong>9:15 AM - 3:30 PM</strong>
                    </div>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg mt-4">
                    <strong className="text-orange-900 block mb-1">💡 Fun Fact:</strong>
                    <p className="text-xs text-orange-800">
                      BSE is Asia's oldest stock exchange! Older than NYSE (started 1817).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg">
                <strong className="text-yellow-900">❓ Which One Should You Use?</strong>
                <p className="text-sm text-gray-700 mt-2">
                  <strong>Both!</strong> Most stocks are listed on both NSE and BSE. When you buy through broker (Zerodha, Groww), 
                  they automatically route order to exchange with better price. You don't need to choose manually.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 3: Nifty 50 & Sensex */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <PieChart className="w-8 h-8 text-green-600" />
              3. Nifty 50 & Sensex: India's Market Indices (इंडेक्स क्या है?)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>Index</strong> is like a "basket" of top companies. It shows overall market health. 
                When news says "Sensex up 500 points," it means top 30 companies went up on average.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-300">
                  <h4 className="text-xl font-bold text-blue-900 mb-4">📊 Nifty 50 (NSE)</h4>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between"><span>Companies:</span><strong>Top 50 by market cap</strong></div>
                      <div className="flex justify-between"><span>Base Value:</span><strong>1,000 (1995)</strong></div>
                      <div className="flex justify-between"><span>Current:</span><strong>~22,000 (2025)</strong></div>
                      <div className="flex justify-between"><span>Returns:</span><strong>12% average (20 years)</strong></div>
                    </div>
                  </div>
                  <strong className="text-blue-800 block mb-2">Top 10 Companies in Nifty:</strong>
                  <div className="text-xs space-y-1">
                    {['1. Reliance Industries', '2. TCS', '3. HDFC Bank', '4. Infosys', '5. ICICI Bank', '6. Hindustan Unilever', '7. ITC', '8. Bharti Airtel', '9. State Bank of India', '10. Bajaj Finance'].map((company, i) => (
                      <div key={i} className="text-gray-700">{company}</div>
                    ))}
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-300">
                  <h4 className="text-xl font-bold text-orange-900 mb-4">📈 Sensex (BSE)</h4>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between"><span>Companies:</span><strong>Top 30 by market cap</strong></div>
                      <div className="flex justify-between"><span>Base Value:</span><strong>100 (1979)</strong></div>
                      <div className="flex justify-between"><span>Current:</span><strong>~73,000 (2025)</strong></div>
                      <div className="flex justify-between"><span>Returns:</span><strong>~11.5% average (20 years)</strong></div>
                    </div>
                  </div>
                  <strong className="text-orange-800 block mb-2">Sensex vs Nifty:</strong>
                  <p className="text-xs text-gray-700">
                    Sensex has 30 companies (more concentrated), Nifty has 50 (more diversified). 
                    Both move similarly 90% of the time. Nifty is more popular for investing.
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-300">
                <h4 className="text-xl font-bold text-green-900 mb-4">🎯 Why Indices Matter for You:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Benchmark:</strong> If your portfolio gave 8% but Nifty gave 15% → you underperformed market!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Index Investing:</strong> You can directly invest in Nifty 50 via Index Funds/ETFs (easier than picking stocks)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Market Mood:</strong> Nifty up = market positive. Nifty down = market negative.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Section 4: Opening Demat Account */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Smartphone className="w-8 h-8 text-indigo-600" />
              4. How to Open Demat Account (डीमैट खाता कैसे खोलें?)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>Demat Account</strong> (Dematerialized Account) is like a <strong>bank account for stocks</strong>. 
                Just like you keep money in bank, you keep shares in demat account.
              </p>

              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-6 mb-6">
                <h4 className="text-xl font-bold mb-4">🏆 Best Brokers for Beginners (2025)</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: 'Zerodha', users: '1.4 Crore', brokerage: '₹0 for delivery', features: 'Kite app (best UI), educational content' },
                    { name: 'Groww', users: '1.2 Crore', brokerage: '₹0 for delivery', features: 'Simplest UI, perfect for beginners' },
                    { name: 'Upstox', users: '1 Crore', brokerage: '₹0 for delivery', features: 'Low AMC (₹150/year)' },
                    { name: 'Angel One', users: '2 Crore', brokerage: '₹20/order', features: 'Free demat, research reports' }
                  ].map((broker, i) => (
                    <div key={i} className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                      <strong className="text-lg block mb-1">{broker.name}</strong>
                      <div className="text-sm space-y-1 text-white/90">
                        <div>Users: {broker.users}</div>
                        <div>Brokerage: {broker.brokerage}</div>
                        <div className="text-xs">{broker.features}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
                <h4 className="text-xl font-bold text-green-900 mb-5">✅ 5-Step Account Opening (All Online, 24 Hours)</h4>
                
                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: 'Choose Broker & Start Application',
                      actions: [
                        'Go to Zerodha.com or Groww.in',
                        'Click "Open Account" (free)',
                        'Enter mobile number, get OTP',
                        'Fill basic details: Name, email, DOB'
                      ]
                    },
                    {
                      step: 2,
                      title: 'Upload Documents (5 Minutes)',
                      actions: [
                        '📄 PAN Card (mandatory for trading)',
                        '📄 Aadhaar Card (for KYC)',
                        '🏦 Bank Statement (last 6 months) or Cancelled Cheque',
                        '📸 Selfie/Photo',
                        '✍️ Signature (upload scanned or use finger on phone)'
                      ]
                    },
                    {
                      step: 3,
                      title: 'Video KYC (10 Minutes)',
                      actions: [
                        'Schedule video call with broker representative',
                        'Show PAN + Aadhaar to camera (verification)',
                        'Answer basic questions: Name, DOB, address',
                        'Get instant confirmation on video call'
                      ]
                    },
                    {
                      step: 4,
                      title: 'Sign Agreement (E-Sign with Aadhaar)',
                      actions: [
                        'Broker sends account opening agreement',
                        'E-sign using Aadhaar OTP (legally valid)',
                        'Takes 2 minutes, fully online',
                        'No physical visit to office needed!'
                      ]
                    },
                    {
                      step: 5,
                      title: 'Account Activated & Start Trading',
                      actions: [
                        'Get Demat Account Number (DP ID + Client ID) via email',
                        'Download broker app (Kite for Zerodha, Groww app)',
                        'Add money to trading account (UPI, Net Banking)',
                        'Start buying stocks! Minimum: ₹1 (yes, you can buy fractions on some platforms)'
                      ]
                    }
                  ].map((item) => (
                    <div key={item.step} className="bg-white rounded-lg p-5 border-l-4 border-green-500">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h5 className="text-lg font-bold text-green-900">{item.title}</h5>
                        </div>
                      </div>
                      <ul className="ml-13 space-y-1 text-sm text-gray-700">
                        {item.actions.map((action, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-600">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mt-6">
                <h4 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  ⚠️ Common Mistakes to Avoid
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    'DON\'T use free "trading tips" services (99% are scams)',
                    'DON\'T give your trading password to anyone (not even broker)',
                    'DON\'T start with F&O (Futures & Options) - lose 90% of capital fast',
                    'DON\'T invest money you need in next 3 years (stocks are volatile)',
                    'DON\'T buy stocks on "hot tips" from WhatsApp groups (pump and dump scams)'
                  ].map((mistake, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Section 5: Making First Stock Purchase */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-orange-600" />
              5. Buy Your First Stock: Step-by-Step (पहला शेयर कैसे खरीदें?)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Let's buy <strong>1 share of Infosys</strong> (safe, blue-chip company) as your first investment. Current price: ~₹1,800/share.
              </p>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-300">
                <h4 className="text-xl font-bold text-orange-900 mb-5">📱 Step-by-Step on Groww App:</h4>
                
                <div className="space-y-4">
                  {[
                    { step: 1, action: 'Open Groww App & Login', detail: 'Use your registered mobile number + PIN/Biometric' },
                    { step: 2, action: 'Click "Stocks" Tab at Bottom', detail: 'You\'ll see Nifty 50, Sensex, and trending stocks' },
                    { step: 3, action: 'Search "Infosys" in Search Bar', detail: 'Or search any company: Reliance, TCS, HDFC Bank' },
                    { step: 4, action: 'Click on Infosys Stock', detail: 'You\'ll see current price, today\'s high/low, 52-week range' },
                    { step: 5, action: 'Click Green "BUY" Button', detail: 'New screen opens with order form' },
                    { step: 6, action: 'Enter Quantity: 1 Share', detail: 'App shows total amount: ₹1,800 (approx)' },
                    { step: 7, action: 'Choose Order Type: "Market"', detail: 'Market = buy at current price immediately. (For beginners, always use Market)' },
                    { step: 8, action: 'Review & Click "BUY"', detail: 'Confirm purchase. Money deducted from trading account.' },
                    { step: 9, action: 'Order Executed!', detail: 'Share appears in your "Holdings" within seconds. You\'re now part-owner of Infosys!' }
                  ].map((item) => (
                    <div key={item.step} className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <strong className="text-orange-900 block mb-1">{item.action}</strong>
                          <p className="text-xs text-gray-600">{item.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
                <strong className="text-blue-900">💡 Pro Tips for First Purchase:</strong>
                <ul className="mt-3 space-y-1 text-sm text-gray-700">
                  <li>• Start small: Buy 1-5 shares (₹1,000-₹5,000 worth) to learn</li>
                  <li>• Choose safe companies: Reliance, TCS, Infosys, HDFC Bank (won't go zero overnight)</li>
                  <li>• Use "Market" order for first few trades (simplest, executes immediately)</li>
                  <li>• Don't check price every hour! Stocks fluctuate daily. Think long-term (5+ years)</li>
                  <li>• Avoid penny stocks (&lt;₹50) initially (high risk, manipulation common)</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Section 6: Basic Stock Market Terminology */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              6. Essential Stock Market Terms (ज़रूरी शब्दावली)
            </h2>

            <div className="prose max-w-none">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { term: 'Bull Market 🐂', meaning: 'Prices rising, investors optimistic, making money' },
                  { term: 'Bear Market 🐻', meaning: 'Prices falling 20%+, investors scared, losing money' },
                  { term: 'IPO', meaning: 'Initial Public Offering - company selling shares for first time' },
                  { term: 'Dividend', meaning: 'Company sharing profits with shareholders (₹ per share)' },
                  { term: 'Market Cap', meaning: 'Company total value = Share Price × Total Shares' },
                  { term: 'P/E Ratio', meaning: 'Price to Earnings. Low P/E = potentially undervalued' },
                  { term: 'Trading Account', meaning: 'Where your money sits (to buy shares)' },
                  { term: 'Demat Account', meaning: 'Where your shares sit (after buying)' },
                  { term: 'Circuit Breaker', meaning: 'Trading halted if stock moves ±10% or ±20% in 1 day' },
                  { term: 'Blue-Chip Stocks', meaning: 'Large, stable companies (Reliance, TCS, Infosys)' },
                  { term: 'Penny Stocks', meaning: 'Very cheap stocks &lt;₹50 (risky, avoid initially)' },
                  { term: 'Volume', meaning: 'How many shares traded today (high = liquid, easy to buy/sell)' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <strong className="text-blue-900 block mb-1">{item.term}</strong>
                    <p className="text-xs text-gray-700">{item.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Interactive Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🧮 Stock Investment Growth Calculator
            </h2>

            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Calculate Your Potential Returns</h3>
              
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <label className="block text-sm font-bold mb-2">Investment Amount (₹):</label>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg text-gray-900 font-bold"
                    placeholder="10000"
                  />
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <label className="block text-sm font-bold mb-2">Expected Growth (% p.a.):</label>
                  <input
                    type="number"
                    value={growthRate}
                    onChange={(e) => setGrowthRate(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg text-gray-900 font-bold"
                    placeholder="12"
                  />
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <label className="block text-sm font-bold mb-2">Investment Period (Years):</label>
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg text-gray-900 font-bold"
                    placeholder="10"
                  />
                </div>
              </div>

              <button
                onClick={() => setCalculated(true)}
                className="w-full px-6 py-3 bg-white text-purple-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all mb-4"
              >
                Calculate Returns
              </button>

              {calculated && (
                <div className="bg-white rounded-lg p-6 text-gray-900">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span>Initial Investment:</span>
                      <strong>₹{investmentAmount.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Growth Rate:</span>
                      <strong>{growthRate}% per year</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Investment Period:</span>
                      <strong>{years} years</strong>
                    </div>
                    <div className="flex justify-between py-3 bg-green-100 px-4 rounded-lg">
                      <strong className="text-green-900">Future Value:</strong>
                      <strong className="text-2xl text-green-700">₹{futureValue.toFixed(0).toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between py-3 bg-blue-100 px-4 rounded-lg">
                      <strong className="text-blue-900">Total Returns:</strong>
                      <strong className="text-2xl text-blue-700">₹{totalReturns.toFixed(0).toLocaleString()}</strong>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-4 italic">
                    💡 Historical average: Nifty 50 has given 12% average returns over past 20 years. 
                    Past performance doesn't guarantee future returns.
                  </p>
                </div>
              )}
            </div>
          </motion.section>

          {/* Key Takeaways */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              ✅ Key Takeaways (मुख्य बातें)
            </h2>
            <div className="space-y-4">
              {[
                'Stock market = buy ownership in companies. 1 share of Reliance = you\'re part-owner!',
                'India has 2 exchanges: NSE (Nifty 50) & BSE (Sensex). Both work similarly.',
                'Nifty 50 = top 50 companies basket. Sensex = top 30. Track overall market health.',
                'Demat account = bank account for stocks. Open online in 24 hours (Zerodha, Groww).',
                'Documents needed: PAN (mandatory), Aadhaar, Bank proof, Selfie. Video KYC = 10 mins.',
                'First stock: Buy 1-5 shares of safe companies (Reliance, TCS, Infosys) to learn.',
                'Trading hours: 9:15 AM - 3:30 PM (Mon-Fri). Stock prices update every second.',
                'Money making: (1) Price goes up = capital gain, (2) Company pays dividend = cash to you.',
                'Avoid: F&O trading initially, penny stocks, WhatsApp tips, daily trading (90% lose money).',
                'Long-term mindset: Stocks are volatile short-term. Need 5+ years to benefit from 12% average returns.'
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
              🧮 Practice with Free Calculators (मुफ्त कैलकुलेटर)
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'SIP Calculator', link: '/calculators/sip-calculator', icon: '📈', desc: 'Calculate SIP returns' },
                { name: 'Stock Return Calculator', link: '/calculators/stock-return-calculator', icon: '💰', desc: 'Calculate stock profits' },
                { name: 'Brokerage Calculator', link: '/calculators/brokerage-calculator', icon: '💳', desc: 'Calculate trading costs' }
              ].map((calc, i) => (
                <Link
                  key={i}
                  to={calc.link}
                  className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-purple-500 hover:shadow-2xl transition-all group"
                >
                  <div className="text-4xl mb-3">{calc.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {calc.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">{calc.desc}</p>
                  <div className="flex items-center text-purple-600 font-semibold text-sm">
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
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">
                🎓 Ready for the Next Lesson?
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Now that you understand stocks, learn about Mutual Funds - the easier way to invest without picking individual stocks!
              </p>
              <Link
                to="/learn/investing-wealth/mutual-funds-complete-guide-sip-nav-expense-ratio-india"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                Next: Mutual Funds Complete Guide
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </motion.section>

          {/* Disclaimer */}
          <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-600">
            <p>
              <strong>Disclaimer:</strong> Stock market investing involves risk. Past performance (12% average) doesn't guarantee future returns. 
              Market can fall 30-50% in crashes. Only invest money you don't need for 5+ years. This is educational content, not investment advice. 
              Consult a SEBI registered investment advisor before investing.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockMarketBasics;
