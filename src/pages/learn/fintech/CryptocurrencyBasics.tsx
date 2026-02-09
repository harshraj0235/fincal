import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Award, CheckCircle, AlertTriangle,
  Target, HelpCircle, TrendingUp, Shield, Zap
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const CryptocurrencyBasics: React.FC = () => {
  const faqData = [
    {
      question: "What is cryptocurrency and how does it work?",
      answer: "Cryptocurrency = Digital money using cryptography (encryption). Runs on blockchain (decentralized public ledger). No government/bank control. You own directly via digital wallet. Bitcoin (2009) = first crypto. Now 20,000+ cryptocurrencies exist! Volatile, speculative, high-risk investment."
    },
    {
      question: "Is cryptocurrency legal in India 2025?",
      answer: "YES! Legal to buy/sell/hold BUT not legal tender (shops not required to accept). 30% tax on gains + 1% TDS. RBI doesn't regulate. Government's stance: Regulate but don't ban. Can trade on WazirX, CoinDCX (Indian exchanges). Supreme Court lifted RBI ban (2020). Legal but risky!"
    },
    {
      question: "What is blockchain technology?",
      answer: "Blockchain = Chain of blocks (digital ledger) recording all transactions. Distributed (copies on 1000s computers worldwide), immutable (cannot edit), transparent (public). Like Google Sheet that: (1) Everyone can view, (2) No one can delete, (3) Updates in real-time. Bitcoin, Ethereum run on blockchain. Revolutionary beyond crypto!"
    },
    {
      question: "Bitcoin vs Ethereum: key differences?",
      answer: "Bitcoin: Digital gold, store of value, limited supply (21 million max), price ₹35L+ (Nov 2025). Use: Investment/hedge. Ethereum: Smart contract platform, apps run on it (DeFi, NFTs), unlimited supply, price ₹2.5L+. Use: Technology/apps. Bitcoin = simpler. Ethereum = complex but more utility."
    },
    {
      question: "How much tax on cryptocurrency in India?",
      answer: "30% flat tax on gains + 1% TDS on every sale (Budget 2022 VDA rules). Example: Bought Bitcoin ₹5L, sold ₹8L → ₹3L profit → Tax ₹90,000 (30%). Loss in Bitcoin CANNOT offset gain in Ethereum. No benefit of holding long-term (30% always!). Very tax-inefficient!"
    },
    {
      question: "Where to buy cryptocurrency in India?",
      answer: "Trusted exchanges: (1) WazirX (Binance partner, largest in India), (2) CoinDCX (unicorn, wide coin selection), (3) CoinSwitch (user-friendly). Avoid: Unverified exchanges, WhatsApp groups, Telegram pump-dump. KYC needed: Aadhaar, PAN. Min investment: ₹100. Start small!"
    },
    {
      question: "What are cryptocurrency risks?",
      answer: "10 risks: (1) Extreme volatility (50% crash common), (2) No regulation (no SEBI/RBI protection), (3) Exchange hacks (lose all coins), (4) Lost password = lost money (no reset!), (5) Scams (Ponzi, fake coins), (6) Govt can ban, (7) 30% tax (very high!), (8) No passive income, (9) Environmental concerns, (10) Technological obsolescence. HIGH RISK!"
    },
    {
      question: "Should I invest in cryptocurrency?",
      answer: "Only if: (1) Age under 40, (2) High risk appetite, (3) Have emergency fund + diversified portfolio, (4) Understand technology, (5) Can afford 100% loss. Allocation: Max 1-5% of portfolio (₹10L portfolio → Max ₹50K in crypto). NOT for: Retirement savings, emergency fund, children's education. Speculative only!"
    },
    {
      question: "How to store cryptocurrency safely?",
      answer: "3 options: (1) Exchange wallet (WazirX): Easy but risky if exchange hacked. (2) Software wallet (Trust Wallet, MetaMask): You control, safer. (3) Hardware wallet (Ledger, Trezor): Most secure (₹5-10K cost). For large amounts (above ₹1L): Use hardware wallet. Never share: Private key, seed phrase (12-24 words)."
    },
    {
      question: "Can I earn passive income from crypto?",
      answer: "Risky options: (1) Staking: Lock coins, earn 5-15% (but price can fall 50%!), (2) Lending: Lend USDT, earn 10-12% (platform risk), (3) Mining: Needs equipment ₹5L+, electricity ₹20K/month (not profitable in India). Better: Bank FD (7% safe) than crypto staking (risky 10%)!"
    },
    {
      question: "What happened to crypto in India in 2024-25?",
      answer: "Mixed! (1) Govt didn't ban (positive), (2) But 30% tax + 1% TDS = trading volume down 70%, (3) Many Indians moved to foreign exchanges (Binance), (4) WazirX hack ₹2,000 Cr (July 2024) = trust issues, (5) Bitcoin hit all-time high $100K globally (Nov 2024). India: Regulate but cautious approach."
    },
    {
      question: "Is crypto the future of money?",
      answer: "Debatable! Pros: Decentralized, borderless, programmable money, financial inclusion. Cons: Volatile, slow transactions, high fees, environmental cost. Realistic future: (1) Blockchain tech = YES (banks adopting!), (2) Bitcoin as investment = Maybe, (3) Replace UPI/cash = NO (UPI too good!). India: Focus on digital rupee (CBDC) not private crypto."
    },
    {
      question: "How to report cryptocurrency in ITR?",
      answer: "New schedule VDA in ITR-2: (1) Show all crypto sales (date, coin, buy/sell price), (2) Calculate gain/loss per transaction, (3) Total gains taxed at 30%, (4) Losses cannot offset (show separately). Also: 1% TDS shown in Form 26AS. File by July 31. Penalty if not reported: 50% of tax + interest!"
    },
    {
      question: "Can NRI invest in cryptocurrency from India?",
      answer: "Complex! NRI can: (1) Buy crypto on Indian exchanges (WazirX) using NRO account, (2) But repatriation unclear (RBI hasn't clarified), (3) Tax: 30% in India + may be taxed in resident country. Better for NRI: Trade on foreign exchanges (Binance, Coinbase) in USD - clearer regulations!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Cryptocurrency & Blockchain Basics 2025: Bitcoin, Ethereum | Is Crypto Legal in India? 30% Tax | MoneyCal"
        description="Understand cryptocurrency in India: What is crypto, how blockchain works, Bitcoin vs Ethereum, crypto trading on WazirX/CoinDCX, 30% tax on crypto gains, 1% TDS, VDA rules 2022, legal status, risks & safety tips. Should you invest? Scams to avoid. Hindi + English"
        keywords="cryptocurrency India 2025, blockchain basics, Bitcoin Ethereum difference, is crypto legal India, 30% crypto tax, VDA rules, WazirX CoinDCX, crypto risks, क्रिप्टोकरेंसी भारत"
        url="/learn/fintech-digital-payments/cryptocurrency-blockchain-basics-bitcoin-ethereum-india-legal-guide-2025"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to FinTech</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-orange-600 font-semibold">Lesson 8 of 8 - FINAL!</span>
                <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  <span className="hidden sm:inline">Back to Hub</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-orange-600 uppercase tracking-wide">Lesson 8 • 50 Minutes • Advanced • FINAL</div>
                <h1 className="text-4xl font-bold text-gray-900">Cryptocurrency Basics 2025</h1>
                <p className="text-xl text-gray-600 mt-1">Bitcoin, Ethereum, Blockchain - Legal in India?</p>
              </div>
            </div>

            <div className="bg-red-100 border-l-4 border-red-500 p-6 rounded-r-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-red-900">HIGH RISK WARNING!</strong>
                  <p className="text-red-900 mt-2">Crypto is extremely volatile (can lose 50-90% value). Only invest money you can afford to lose completely. Not for beginners or retirement savings!</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-blue-600" />
                ❓ Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Q{index + 1}: {faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Category Complete */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-white shadow-2xl text-center">
            <Award className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-4xl font-bold mb-4">🎉 FinTech Category Complete!</h3>
            <p className="text-2xl mb-8">You've mastered all 8 digital payment lessons!</p>
            <Link to="/learn" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Explore More Categories
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptocurrencyBasics;