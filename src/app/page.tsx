import React from 'react';
import Link from "next/link";
import {
  Calculator, TrendingUp, BookOpen, Landmark, Newspaper,
  ChevronRight, Zap, Shield, BarChart3, PiggyBank,
  CreditCard, Building2, GraduationCap, IndianRupee, Sparkles,
  FileSpreadsheet, Receipt, Briefcase, Heart,
  Globe2, Award, Users, CheckCircle2, ArrowRight,
  Star, Clock, Search, Gem, Banknote,
  LineChart, Home as HomeIcon, Car, Coins
} from 'lucide-react';
import { Metadata } from 'next';

// ───────────────────────────────────────────────────────────────────────
// SEO Data
// ───────────────────────────────────────────────────────────────────────
const PAGE_TITLE = 'MoneyCal — Free SIP Calculator, EMI Calculator, Income Tax Calculator India 2025-26 | 200+ Financial Tools';
const PAGE_DESCRIPTION = 'MoneyCal is India\'s #1 free financial calculator & AI assistant. Use SIP calculator, EMI calculator, income tax calculator 2025-26, gold rate today, IPO GMP, mutual fund returns, PPF, NPS, FD calculator & 200+ tools. Free forever, no login required.';
const PAGE_KEYWORDS = 'SIP calculator, EMI calculator, income tax calculator 2025-26, mutual fund calculator, gold rate today, silver rate today, IPO GMP 2026, PPF calculator, NPS calculator, home loan EMI calculator, car loan EMI calculator, FD calculator, RD calculator, gratuity calculator, HRA calculator, lumpsum calculator, CAGR calculator, step up SIP calculator, retirement planning calculator, SWP calculator, loan prepayment calculator, TDS calculator, GST calculator, financial calculator India, MoneyCal, free financial tools India, sarkari yojana, government schemes 2026, financial literacy India, AI financial assistant, एसआईपी कैलकुलेटर, ईएमआई कैलकुलेटर, इनकम टैक्स कैलकुलेटर, गोल्ड रेट आज, म्यूचुअल फंड कैलकुलेटर, होम लोन कैलकुलेटर';

import { discoverMetadata } from '@/data/discover/metadata';
const trendingArticles = discoverMetadata.slice(0, 3);

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: PAGE_KEYWORDS,
  alternates: {
    canonical: 'https://moneycal.in/',
  }
};

const FAQ_ITEMS = [
  { question: 'MoneyCal क्या है?', answer: 'MoneyCal भारत का #1 free AI-powered financial platform है। यहाँ 200+ calculators (SIP, EMI, Income Tax, PPF, NPS, FD, etc.), financial tools, learning courses, और AI assistant — सब कुछ एक ही जगह मिलता है। पूरी तरह free, no login required।' },
  { question: 'SIP Calculator कैसे use करें?', answer: 'MoneyCal का SIP Calculator use करना बहुत आसान है — बस monthly investment amount, expected return rate, और investment period डालें। Calculator आपको total invested amount, estimated returns, और final corpus दिखाएगा। Step-up SIP option भी available है।' },
  { question: 'EMI Calculator से Home Loan की EMI कैसे calculate करें?', answer: 'EMI Calculator में Loan Amount, Interest Rate (annual), और Loan Tenure (years/months) enter करें। Calculator instantly आपकी monthly EMI, total interest payable, और total payment amount दिखाएगा। Home, Car, Personal — किसी भी loan type के लिए काम करता है।' },
  { question: 'Income Tax Calculator 2025-26 कैसे काम करता है?', answer: 'अपनी annual salary, HRA, other income, और deductions (80C, 80D, etc.) enter करें। Calculator Old vs New Tax Regime दोनों में tax compare करके बताएगा कि कौन सा regime आपके लिए बेहतर है। Budget 2025-26 के latest slabs के according updated है।' },
  { question: 'क्या MoneyCal पूरी तरह free है?', answer: 'हाँ, MoneyCal 100% free है! सभी 200+ calculators, tools, AI assistant, learning courses, और resources बिना कोई registration या payment के use कर सकते हैं। कोई hidden charges नहीं हैं।' },
  { question: 'Gold Rate Today कैसे check करें?', answer: 'MoneyCal पर Gold Rate Today page पर जाएं — यहाँ 22K और 24K gold rates, सभी major cities के rates, historical price charts, और gold investment calculator मिलेगा। Silver rates भी available हैं।' },
  { question: 'IPO GMP 2026 कैसे track करें?', answer: 'MoneyCal के IPO Dashboard पर current और upcoming IPOs, Grey Market Premium (GMP), allotment status, listing date, और lot size की जानकारी real-time मिलती है। IPO reviews और analysis भी available है।' },
  { question: 'MoneyCal AI Assistant कैसे काम करता है?', answer: 'MoneyCal का AI Assistant Gemini AI से powered है। आप Hindi, English, या Hinglish में कोई भी financial सवाल पूछ सकते हैं — EMI, SIP, Tax, IPO, Gold, Schemes — और AI आपको detailed, accurate answer देगा with relevant calculator links।' },
  { question: 'Mutual Fund Returns कैसे calculate करें?', answer: 'MoneyCal पर Mutual Fund Calculator, CAGR Calculator, XIRR Calculator, और SIP vs Lumpsum Analyzer जैसे tools available हैं। Simply अपना investment amount और duration enter करें — expected और actual returns दोनों calculate कर सकते हैं।' },
  { question: 'Government Schemes 2026 की जानकारी कहाँ मिलेगी?', answer: 'MoneyCal पर 50+ government schemes की detailed information available है — PM Kisan, Ayushman Bharat, Sukanya Samriddhi, Atal Pension Yojana, Mudra Loan, और बहुत कुछ। Eligibility, application process, और benefits सब मिलेगा।' },
];

// ── Popular Calculators with rich descriptions ──
const POPULAR_CALCULATORS = [
  { id: 'sip-calculator', name: 'SIP Calculator', desc: 'Calculate mutual fund SIP returns, wealth growth & step-up SIP', icon: TrendingUp, color: 'from-emerald-500 to-teal-600', searches: '4.5L+/mo' },
  { id: 'emi-calculator', name: 'EMI Calculator', desc: 'Home loan, car loan, personal loan EMI & interest breakdown', icon: IndianRupee, color: 'from-blue-500 to-indigo-600', searches: '3.5L+/mo' },
  { id: 'income-tax-calculator', name: 'Income Tax Calculator', desc: 'Old vs New Regime comparison, tax saving tips FY 2025-26', icon: Landmark, color: 'from-red-500 to-rose-600', searches: '2L+/mo' },
  { id: 'mutual-fund-returns-calculator', name: 'Mutual Fund Calculator', desc: 'Calculate expected returns, CAGR & compare fund performance', icon: BarChart3, color: 'from-purple-500 to-violet-600', searches: '1.5L+/mo' },
  { id: 'ppf-calculator', name: 'PPF Calculator', desc: 'Public Provident Fund maturity amount & yearly interest', icon: PiggyBank, color: 'from-amber-500 to-orange-600', searches: '1L+/mo' },
  { id: 'fd-calculator', name: 'FD Calculator', desc: 'Fixed Deposit maturity, interest payout & compare bank rates', icon: Banknote, color: 'from-green-500 to-emerald-600', searches: '90K+/mo' },
  { id: 'home-loan-calculator', name: 'Home Loan Calculator', desc: 'EMI, eligibility, prepayment benefits & amortization schedule', icon: HomeIcon, color: 'from-sky-500 to-blue-600', searches: '80K+/mo' },
  { id: 'gst-calculator', name: 'GST Calculator', desc: 'GST inclusive/exclusive, IGST, CGST, SGST calculation', icon: Receipt, color: 'from-pink-500 to-fuchsia-600', searches: '70K+/mo' },
  { id: 'nps-calculator', name: 'NPS Calculator', desc: 'National Pension Scheme returns, tax benefits & annuity', icon: Shield, color: 'from-indigo-500 to-blue-600', searches: '60K+/mo' },
  { id: 'retirement-calculator', name: 'Retirement Calculator', desc: 'Plan retirement corpus, monthly income & inflation adjusted', icon: Award, color: 'from-teal-500 to-cyan-600', searches: '50K+/mo' },
  { id: 'rd-calculator', name: 'RD Calculator', desc: 'Recurring Deposit maturity amount & monthly contribution', icon: Coins, color: 'from-lime-500 to-green-600', searches: '45K+/mo' },
  { id: 'car-loan-calculator', name: 'Car Loan Calculator', desc: 'Auto loan EMI, down payment planning & loan comparison', icon: Car, color: 'from-orange-500 to-red-600', searches: '40K+/mo' },
];

// ── Tool Hub Categories ──
const TOOL_HUBS = [
  { name: 'Finance Tools', path: '/finance-tools', count: '25+', icon: LineChart, desc: 'SIP analysis, portfolio tools, XIRR calculator', color: 'from-blue-500/10 to-indigo-500/10', border: 'border-blue-200', iconColor: 'text-blue-600' },
  { name: 'Tax Tools', path: '/tax-tools', count: '40+', icon: Landmark, desc: 'Income tax, TDS, HRA, 80C deductions', color: 'from-red-500/10 to-rose-500/10', border: 'border-red-200', iconColor: 'text-red-600' },
  { name: 'GST Tools', path: '/gst-tools', count: '20+', icon: Receipt, desc: 'GST calculator, GSTR filing, HSN lookup', color: 'from-purple-500/10 to-violet-500/10', border: 'border-purple-200', iconColor: 'text-purple-600' },
  { name: 'Excel Tools', path: '/excel-tools-page', count: '50+', icon: FileSpreadsheet, desc: 'Financial templates, reports & trackers', color: 'from-green-500/10 to-emerald-500/10', border: 'border-green-200', iconColor: 'text-green-600' },
  { name: 'Loan Tools', path: '/loan-tools', count: '15+', icon: CreditCard, desc: 'EMI planner, prepayment, comparison tools', color: 'from-amber-500/10 to-orange-500/10', border: 'border-amber-200', iconColor: 'text-amber-600' },
  { name: 'Insurance Tools', path: '/insurance-tools', count: '8+', icon: Shield, desc: 'Term, health & vehicle insurance tools', color: 'from-teal-500/10 to-cyan-500/10', border: 'border-teal-200', iconColor: 'text-teal-600' },
  { name: 'Bank Tools', path: '/bank-tools', count: '10+', icon: Building2, desc: 'Missed call banking, IFSC, account tools', color: 'from-sky-500/10 to-blue-500/10', border: 'border-sky-200', iconColor: 'text-sky-600' },
  { name: 'Gold Tools', path: '/gold-tools', count: '5+', icon: Gem, desc: 'Gold rate, purity checker, investment calc', color: 'from-yellow-500/10 to-amber-500/10', border: 'border-yellow-200', iconColor: 'text-yellow-600' },
  { name: 'Invoicing Tools', path: '/invoice-generator-business', count: '12+', icon: Briefcase, desc: 'Invoice generator, receivables tracker', color: 'from-indigo-500/10 to-purple-500/10', border: 'border-indigo-200', iconColor: 'text-indigo-600' },
  { name: 'Corporate Tools', path: '/corporate-finance', count: '20+', icon: Building2, desc: 'Business finance, valuation, analysis', color: 'from-slate-500/10 to-gray-500/10', border: 'border-slate-200', iconColor: 'text-slate-600' },
  { name: 'Festival Tools', path: '/festival-tools', count: '25+', icon: Star, desc: 'Panchang, muhurat, festival calendar', color: 'from-pink-500/10 to-rose-500/10', border: 'border-pink-200', iconColor: 'text-pink-600' },
  { name: 'All Tools', path: '/tools', count: '200+', icon: Zap, desc: 'Browse every tool on MoneyCal', color: 'from-violet-500/10 to-fuchsia-500/10', border: 'border-violet-200', iconColor: 'text-violet-600' },
];

// ── Learn Tracks ──
const LEARN_TRACKS = [
  { name: 'Loan Basics', path: '/learn/loans', lessons: '20', icon: '🏦', desc: 'EMI, interest rates, eligibility & more' },
  { name: 'Home Loans', path: '/learn/home-loans', lessons: '20', icon: '🏠', desc: 'Home loan complete guide A to Z' },
  { name: 'Personal Loans', path: '/learn/personal-loans', lessons: '20', icon: '💳', desc: 'Personal loan tips & strategies' },
  { name: 'Vehicle Loans', path: '/learn/vehicle-loans', lessons: '15', icon: '🚗', desc: 'Car & bike loan smart guide' },
  { name: 'Education Loans', path: '/learn/education-loans', lessons: '10', icon: '🎓', desc: 'Study loan India & abroad' },
  { name: 'Business Loans', path: '/learn/business-loans', lessons: '15', icon: '💼', desc: 'MSME, Mudra & startup loans' },
  { name: 'Gold Loans', path: '/learn/gold-loans', lessons: '10', icon: '🥇', desc: 'Gold loan complete guide' },
  { name: 'Credit Cards', path: '/learn/credit-cards', lessons: '20', icon: '💎', desc: 'Credit card mastery course' },
  { name: 'Investing', path: '/learn/investing', lessons: '10', icon: '📈', desc: 'Stocks, mutual funds, SIP' },
  { name: 'Taxation', path: '/learn/taxation', lessons: '8', icon: '📋', desc: 'Income tax, ITR, TDS guide' },
  { name: 'Insurance', path: '/learn/insurance', lessons: '7', icon: '🛡️', desc: 'Term, health & retirement' },
  { name: 'Money Management', path: '/learn/money-management', lessons: '8', icon: '💰', desc: 'Budgeting, saving, planning' },
];

// ── Market Rate Cards ──
const MARKET_CARDS = [
  { name: 'Gold Rate Today', path: '/gold-rate', icon: '🥇', desc: '22K & 24K gold prices, city-wise rates, price history', color: 'from-yellow-500 to-amber-600' },
  { name: 'Silver Rate Today', path: '/silver-rate', icon: '🪙', desc: 'Live silver prices, historical charts & investment calc', color: 'from-slate-400 to-gray-600' },
  { name: 'IPO Dashboard 2026', path: '/ipo', icon: '📊', desc: 'Current & upcoming IPOs, GMP, allotment, listing dates', color: 'from-blue-500 to-indigo-600' },
  { name: 'Stock Market', path: '/stock-market', icon: '📈', desc: 'Nifty 50, Sensex, stock screener & market analysis', color: 'from-emerald-500 to-teal-600' },
  { name: 'Crypto Market', path: '/crypto', icon: '₿', desc: 'Bitcoin, Ethereum prices, Indian crypto guide', color: 'from-orange-500 to-red-600' },
  { name: 'Market Rates Hub', path: '/market', icon: '🏦', desc: 'All market rates, commodity prices & forex', color: 'from-purple-500 to-violet-600' },
];

// ── Structured Data ──
const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MoneyCal',
  alternateName: 'MoneyCal.in',
  url: 'https://moneycal.in',
  description: PAGE_DESCRIPTION,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://moneycal.in/finance-gpt?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MoneyCal',
  url: 'https://moneycal.in',
  logo: 'https://moneycal.in/logo.png',
  description: 'India\'s #1 free financial calculator platform with 200+ tools',
  sameAs: [
    'https://twitter.com/moneycal_in',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: 'https://moneycal.in/contact-us',
  },
};

// ───────────────────────────────────────────────────────────────────────
// Home Component
// ───────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans antialiased text-gray-900 selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      <div className="min-h-screen bg-gradient-to-b from-[#fafbff] via-white to-[#f0f4ff]">

        {/* ════════════════════════════════════════════════════════════════
            SECTION 1 — HERO
        ════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden pt-10 sm:pt-16 pb-14 sm:pb-20 px-4">
          {/* Background decorations */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-100/40 via-transparent to-transparent rounded-full pointer-events-none" />
          <div className="absolute top-20 right-0 w-72 h-72 bg-gradient-to-br from-teal-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-40 left-0 w-64 h-64 bg-gradient-to-br from-purple-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200/60 rounded-full mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-blue-700 tracking-wide">INDIA'S #1 FREE FINANCIAL PLATFORM</span>
            </div>

            {/* H1 — Primary SEO heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-5 tracking-tight">
              Free <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500">SIP Calculator</span>,{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500">EMI Calculator</span>{' '}
              <span className="hidden sm:inline">&</span>
              <br className="sm:hidden" />
              <span className="sm:hidden">&</span>{' '}
              200+ Financial Tools
            </h1>

            {/* Sub-heading */}
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Income Tax Calculator 2025-26, Mutual Fund Returns, PPF, NPS, FD Calculator, Gold Rate Today, IPO GMP —{' '}
              <strong className="text-gray-800">सब कुछ एक जगह, 100% Free</strong>। AI-powered answers in Hindi & English।
            </p>

            {/* AI Assistant CTA */}
            <Link
              href="/finance-gpt"
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 hover:from-blue-700 hover:via-indigo-700 hover:to-teal-600 text-white rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 text-base sm:text-lg font-semibold"
            >
              <Search className="w-5 h-5" />
              <span>AI से कोई भी Financial सवाल पूछें</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8">
              {[
                { icon: Calculator, label: '200+ Tools' },
                { icon: Users, label: '10L+ Users' },
                { icon: Shield, label: '100% Free' },
                { icon: Sparkles, label: 'AI Powered' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-sm text-gray-500">
                  <badge.icon className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 2 — POPULAR CALCULATORS
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 px-4" id="calculators">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Popular Financial Calculators
                </h2>
                <p className="text-sm sm:text-base text-gray-500 mt-1.5">SIP, EMI, Tax, PPF, NPS — India's most-used free calculators</p>
              </div>
              <Link href="/calculators" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors">
                All Calculators <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {POPULAR_CALCULATORS.map((calc) => (
                <Link
                  key={calc.id}
                  href={`/calculators/${calc.id}`}
                  className="group relative flex items-start gap-3.5 p-4 bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50/50 border border-gray-200/80 hover:border-blue-300 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${calc.color} flex items-center justify-center shadow-md`}>
                    <calc.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{calc.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">{calc.desc}</p>
                    <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <TrendingUp className="w-3 h-3" /> {calc.searches}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 shrink-0 mt-1 transition-colors" />
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center sm:hidden">
              <Link href="/calculators" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-xl transition-colors">
                View All 200+ Calculators <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 3 — TOOLS HUB
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-white to-gray-50/80" id="tools">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Financial Tools & Resources Hub
              </h2>
              <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-xl mx-auto">
                Tax tools, GST tools, Excel templates, bank tools, insurance & more — browse by category
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {TOOL_HUBS.map((hub) => (
                <Link
                  key={hub.path}
                  href={hub.path}
                  className={`group relative p-4 bg-gradient-to-br ${hub.color} border ${hub.border} rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <hub.icon className={`w-5 h-5 ${hub.iconColor}`} />
                    <span className="text-xs font-bold text-gray-400 bg-white/80 px-2 py-0.5 rounded-full">{hub.count}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{hub.name}</h3>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">{hub.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 4 — MARKET RATES
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 px-4" id="market-rates">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Live Market Rates & IPO Dashboard
              </h2>
              <p className="text-sm sm:text-base text-gray-500 mt-2">
                Gold rate today, silver rate, IPO GMP 2026, stock market, crypto — all in one place
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MARKET_CARDS.map((card) => (
                <Link
                  key={card.path}
                  href={card.path}
                  className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200/80 hover:border-transparent shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{card.icon}</span>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-white transition-colors">{card.name}</h3>
                    <p className="text-sm text-gray-500 group-hover:text-white/80 mt-1.5 transition-colors">{card.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 5 — LEARN PLATFORM
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-gray-50/80 to-white" id="learn">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Learn Financial Literacy — Free Courses
                </h2>
                <p className="text-sm sm:text-base text-gray-500 mt-1.5">150+ lessons on loans, investing, tax, insurance & more</p>
              </div>
              <Link href="/learn" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors">
                All Courses <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {LEARN_TRACKS.map((track) => (
                <Link
                  key={track.path}
                  href={track.path}
                  className="group p-4 bg-white border border-gray-200/80 hover:border-blue-300 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="text-2xl mb-2">{track.icon}</div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{track.name}</h3>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">{track.desc}</p>
                  <div className="flex items-center gap-1.5 mt-3">
                    <BookOpen className="w-3 h-3 text-blue-500" />
                    <span className="text-[10px] font-bold text-blue-600">{track.lessons} Lessons</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center sm:hidden">
              <Link href="/learn" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-xl transition-colors">
                Explore All Courses <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 6 — TRENDING / DISCOVER / BLOG
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 px-4" id="discover">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Trending Finance Stories & Guides
                </h2>
                <p className="text-sm sm:text-base text-gray-500 mt-1.5">Latest from Discover, Blog & News</p>
              </div>
              <Link href="/discover" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors">
                All Stories <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {trendingArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/discover/${article.slug}`}
                  className="group p-4 bg-white border border-gray-200/80 hover:border-blue-300 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full text-[10px] font-bold text-blue-700">
                      <TrendingUp className="w-3 h-3" /> TRENDING
                    </span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.date ? new Date(article.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-blue-700 line-clamp-2 transition-colors leading-snug">{article.title}</h3>
                  {article.snippet && (
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">{article.snippet}</p>
                  )}
                </Link>
              ))}
            </div>

            {/* Quick Navigation Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              {[
                { label: 'Discover', path: '/discover', icon: TrendingUp },
                { label: 'Blog', path: '/blog', icon: BookOpen },
                { label: 'News', path: '/news', icon: Newspaper },
                { label: 'Govt Schemes', path: '/government-schemes', icon: Landmark },
                { label: 'Crypto', path: '/crypto', icon: Globe2 },
              ].map(nav => (
                <Link
                  key={nav.path}
                  href={nav.path}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-blue-300 rounded-xl text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 shadow-sm hover:shadow transition-all"
                >
                  <nav.icon className="w-4 h-4" />
                  {nav.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 7 — GOVERNMENT SCHEMES
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-white to-amber-50/30" id="government-schemes">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Government Schemes 2026 — सरकारी योजना
                </h2>
                <p className="text-sm sm:text-base text-gray-500 mt-1.5">PM Kisan, Ayushman Bharat, Sukanya Samriddhi & 50+ schemes</p>
              </div>
              <Link href="/government-schemes" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors">
                All Schemes <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'PM Kisan Samman Nidhi', desc: '₹6,000/year direct benefit transfer for farmers. Check eligibility & apply online', path: '/government-schemes/pm-kisan-status-check-2026-by-aadhaar', icon: '🌾' },
                { name: 'Ayushman Bharat Yojana', desc: '₹5 lakh health insurance for BPL families. Hospital list, card & benefits', path: '/government-schemes/ayushman-bharat-health-insurance-2025', icon: '🏥' },
                { name: 'Sukanya Samriddhi Yojana', desc: 'Best savings scheme for girl child. Current interest rate 8.2%, tax free returns', path: '/calculators/sukanya-samriddhi-calculator', icon: '👧' },
                { name: 'PM Awas Yojana', desc: 'Affordable housing subsidy up to ₹2.67 lakh. Urban & rural scheme details', path: '/government-schemes/pradhan-mantri-awas-yojana-urban-2025', icon: '🏠' },
                { name: 'Atal Pension Yojana', desc: '₹1,000 to ₹5,000 monthly pension after 60. Government guaranteed pension scheme', path: '/government-schemes/pmjjby-pmsby-atal-pension-grassroots-enrollment-simplified-2025', icon: '🧓' },
                { name: 'PM Mudra Loan Yojana', desc: 'Collateral-free loans up to ₹10 lakh for small businesses & startups', path: '/government-schemes/mudra-loan-calculator-moneycal-complete-guide-2025', icon: '💼' },
              ].map(scheme => (
                <Link
                  key={scheme.path}
                  href={scheme.path}
                  className="group flex items-start gap-3.5 p-4 bg-white border border-gray-200/80 hover:border-amber-300 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-2xl mt-0.5">{scheme.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-amber-700 transition-colors">{scheme.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{scheme.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link href="/government-schemes" className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-5 py-2.5 rounded-xl transition-colors border border-amber-200">
                Browse All 50+ Government Schemes <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 8 — AI ASSISTANT CTA (Mid-page)
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 p-8 sm:p-12 shadow-2xl shadow-blue-500/20">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full mb-5">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span className="text-xs font-bold text-white tracking-wide">AI-POWERED FINANCIAL ASSISTANT</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4">
                  पैसों की बात, <span className="text-yellow-300">MoneyCal AI</span> के साथ
                </h2>
                <p className="text-base sm:text-lg text-white/80 max-w-lg mx-auto mb-8 leading-relaxed">
                  EMI कितनी होगी? SIP में कितना बनेगा? Tax कैसे बचाएं? — कोई भी सवाल पूछिए, AI तुरंत जवाब देगा।
                </p>
                <Link
                  href="/finance-gpt"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 text-blue-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 text-lg font-bold"
                >
                  <Search className="w-5 h-5" />
                  <span>MoneyCal AI से पूछें — Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-xs text-white/50 mt-4">No login required • Unlimited questions • Hindi & English</p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 9 — FAQ (SEO-critical)
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-white to-gray-50/80" id="faq">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                अक्सर पूछे जाने वाले सवाल (FAQ)
              </h2>
              <p className="text-sm sm:text-base text-gray-500 mt-2">Frequently Asked Questions about MoneyCal & Financial Calculators</p>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((faq, idx) => (
                <details key={idx} className="group bg-white border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-4 sm:p-5 text-sm sm:text-base font-semibold text-gray-900 hover:text-blue-700 transition-colors list-none">
                    <span className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold shrink-0">
                        Q{idx + 1}
                      </span>
                      {faq.question}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform duration-200 shrink-0 ml-2" />
                  </summary>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                    <div className="pl-10 text-sm text-gray-600 leading-relaxed border-l-2 border-blue-100 ml-0.5">
                      {faq.answer}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 10 — WHY CHOOSE MONEYCAL (E-E-A-T)
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 px-4" id="why-moneycal">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Why 10 Lakh+ Indians Trust MoneyCal
              </h2>
              <p className="text-sm sm:text-base text-gray-500 mt-2">India's most trusted free financial calculator platform</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: CheckCircle2, title: '100% Accurate', desc: 'Bank-grade formulas verified by financial experts. Same results as your bank.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { icon: Shield, title: 'Privacy First', desc: 'All calculations run in your browser. We never store your financial data.', color: 'text-blue-600', bg: 'bg-blue-50' },
                { icon: Sparkles, title: 'AI-Powered', desc: 'Gemini AI answers your finance questions in Hindi & English instantly.', color: 'text-purple-600', bg: 'bg-purple-50' },
                { icon: Heart, title: 'Free Forever', desc: 'No registration, no premium plans, no hidden charges. 200+ tools, always free.', color: 'text-rose-600', bg: 'bg-rose-50' },
              ].map(item => (
                <div key={item.title} className="p-5 bg-white border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${item.bg} rounded-2xl mb-4`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* E-E-A-T Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              {[
                { label: 'About Us', path: '/about-us' },
                { label: 'Editorial Policy', path: '/editorial-policy' },
                { label: 'Privacy Policy', path: '/privacy-policy' },
                { label: 'Terms of Service', path: '/terms-of-service' },
                { label: 'Disclaimer', path: '/disclaimer' },
                { label: 'Contact Us', path: '/contact-us' },
              ].map(link => (
                <Link key={link.path} href={link.path} className="text-xs font-medium text-gray-500 hover:text-blue-600 hover:underline transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 11 — COMPREHENSIVE SITE NAVIGATION (SEO link equity)
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-gray-50/80 to-gray-100/50 border-t border-gray-200/60" id="explore">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-center">
              Explore MoneyCal — Complete Site Navigation
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {/* Calculators */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" /> Calculators
                </h3>
                <ul className="space-y-1.5">
                  {[
                    { name: 'EMI Calculator', path: '/calculators/emi-calculator' },
                    { name: 'SIP Calculator', path: '/calculators/sip-calculator' },
                    { name: 'Income Tax', path: '/calculators/income-tax-calculator' },
                    { name: 'PPF Calculator', path: '/calculators/ppf-calculator' },
                    { name: 'FD Calculator', path: '/calculators/fd-calculator' },
                    { name: 'NPS Calculator', path: '/calculators/nps-calculator' },
                    { name: 'Home Loan', path: '/calculators/home-loan-calculator' },
                    { name: 'GST Calculator', path: '/calculators/gst-calculator' },
                    { name: 'All Calculators', path: '/calculators' },
                  ].map(l => (
                    <li key={l.path}><Link href={l.path} className="text-xs text-gray-600 hover:text-blue-600 transition-colors">{l.name}</Link></li>
                  ))}
                </ul>
              </div>

              {/* Tools */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Tools
                </h3>
                <ul className="space-y-1.5">
                  {[
                    { name: 'Finance Tools', path: '/finance-tools' },
                    { name: 'Tax Tools', path: '/tax-tools' },
                    { name: 'GST Tools', path: '/gst-tools' },
                    { name: 'Excel Tools', path: '/excel-tools-page' },
                    { name: 'Loan Tools', path: '/loan-tools' },
                    { name: 'Bank Tools', path: '/bank-tools' },
                    { name: 'Insurance Tools', path: '/insurance-tools' },
                    { name: 'Corporate Tools', path: '/corporate-finance' },
                    { name: 'All Tools', path: '/tools' },
                  ].map(l => (
                    <li key={l.path}><Link href={l.path} className="text-xs text-gray-600 hover:text-blue-600 transition-colors">{l.name}</Link></li>
                  ))}
                </ul>
              </div>

              {/* Learn */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> Learn
                </h3>
                <ul className="space-y-1.5">
                  {[
                    { name: 'Loan Basics', path: '/learn/loans' },
                    { name: 'Home Loans', path: '/learn/home-loans' },
                    { name: 'Personal Loans', path: '/learn/personal-loans' },
                    { name: 'Investing', path: '/learn/investing' },
                    { name: 'Taxation', path: '/learn/taxation' },
                    { name: 'Credit Cards', path: '/learn/credit-cards' },
                    { name: 'Insurance', path: '/learn/insurance' },
                    { name: 'Money Management', path: '/learn/money-management' },
                    { name: 'All Courses', path: '/learn' },
                  ].map(l => (
                    <li key={l.path}><Link href={l.path} className="text-xs text-gray-600 hover:text-blue-600 transition-colors">{l.name}</Link></li>
                  ))}
                </ul>
              </div>

              {/* Market & Resources */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5" /> Market & Resources
                </h3>
                <ul className="space-y-1.5">
                  {[
                    { name: 'Gold Rate Today', path: '/gold-rate' },
                    { name: 'Silver Rate Today', path: '/silver-rate' },
                    { name: 'IPO Dashboard', path: '/ipo' },
                    { name: 'Stock Market', path: '/stock-market' },
                    { name: 'Crypto Market', path: '/crypto' },
                    { name: 'Govt Schemes', path: '/government-schemes' },
                    { name: 'Astro Finance', path: '/astro-finance' },
                    { name: 'Festival Tools', path: '/festival-tools' },
                    { name: 'Market Rates', path: '/market' },
                  ].map(l => (
                    <li key={l.path}><Link href={l.path} className="text-xs text-gray-600 hover:text-blue-600 transition-colors">{l.name}</Link></li>
                  ))}
                </ul>
              </div>

              {/* Content & More */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Content & More
                </h3>
                <ul className="space-y-1.5">
                  {[
                    { name: 'Discover', path: '/discover' },
                    { name: 'Blog', path: '/blog' },
                    { name: 'News', path: '/news' },
                    { name: 'AI Assistant', path: '/finance-gpt' },
                    { name: 'Personal Finance', path: '/personal-finance-management' },
                    { name: 'Invoicing Tools', path: '/invoice-generator-business' },
                    { name: 'Resume Builder', path: '/resume-builder' },
                    { name: 'Help Center', path: '/help-center' },
                    { name: 'Sitemap', path: '/sitemap' },
                  ].map(l => (
                    <li key={l.path}><Link href={l.path} className="text-xs text-gray-600 hover:text-blue-600 transition-colors">{l.name}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
