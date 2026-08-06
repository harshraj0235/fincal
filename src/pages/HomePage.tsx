import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calculator, TrendingUp, BookOpen, Landmark, Newspaper, ChevronRight,
  Sparkles, Search, IndianRupee, BarChart3, Wallet, PiggyBank, CreditCard,
  Building2, GraduationCap, Shield, FileSpreadsheet, Receipt, Gem,
  PartyPopper, Globe2, Gamepad2, Users, Heart, Clock, ArrowRight,
  Star, Zap, Target, Brain, HandCoins, BadgePercent, Scale,
  Briefcase, Home as HomeIcon, Car, Banknote, MessageSquare, Bot,
  Landmark as Bank, LineChart, Mic, DollarSign, LucideIcon,
  CheckCircle2, Lock, Smartphone, Award, ChevronDown, ExternalLink,
  Paintbrush, FileText, Coins, Flame, BookMarked, Layers
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { calculatorCategories } from '../data/calculatorData';
import { discoverMetadata as discoverArticles } from '../data/discover/metadata';

// ─── Animation Variants ───────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

// ─── Data ─────────────────────────────────────────────────
const totalCalculators = calculatorCategories.reduce((s, c) => s + c.calculators.length, 0);

// ── Quick Actions ─────────────────────────────────────────
interface QuickAction {
  id: string; name: string; nameHi: string; path: string;
  icon: LucideIcon; gradient: string; description: string;
}

const quickActions: QuickAction[] = [
  { id: 'emi', name: 'EMI Calculator', nameHi: 'EMI कैलकुलेटर', path: '/calculators/emi-calculator', icon: IndianRupee, gradient: 'from-blue-500 to-cyan-400', description: 'Loan EMI तुरंत जानें' },
  { id: 'sip', name: 'SIP Calculator', nameHi: 'SIP कैलकुलेटर', path: '/calculators/sip-calculator', icon: TrendingUp, gradient: 'from-emerald-500 to-teal-400', description: 'SIP रिटर्न कैलकुलेट करें' },
  { id: 'tax', name: 'Income Tax', nameHi: 'इनकम टैक्स', path: '/calculators/income-tax-calculator', icon: Receipt, gradient: 'from-amber-500 to-orange-400', description: 'Old vs New Regime तुलना' },
  { id: 'gst', name: 'GST Calculator', nameHi: 'GST कैलकुलेटर', path: '/calculators/gst-calculator', icon: BadgePercent, gradient: 'from-purple-500 to-violet-400', description: 'GST गणना एक क्लिक में' },
  { id: 'gold', name: 'Gold Rate', nameHi: 'सोने का भाव', path: '/gold-rate', icon: Gem, gradient: 'from-yellow-500 to-amber-400', description: 'आज का गोल्ड रेट 22K / 24K' },
  { id: 'ai', name: 'AI Finance Chat', nameHi: 'AI चैट', path: '/finance-gpt', icon: Bot, gradient: 'from-violet-600 to-purple-500', description: 'पैसों का कोई भी सवाल पूछें' },
];

// ── Calculator Categories ─────────────────────────────────
interface CalcCategory {
  name: string; nameHi: string; path: string; count: number;
  icon: LucideIcon; gradient: string;
}

const calcCategoriesDisplay: CalcCategory[] = [
  { name: 'Loan & EMI', nameHi: 'लोन और EMI', path: '/calculators?category=loan', count: 0, icon: Banknote, gradient: 'from-blue-600 to-blue-400' },
  { name: 'Investment', nameHi: 'निवेश', path: '/calculators?category=investment', count: 0, icon: TrendingUp, gradient: 'from-emerald-600 to-emerald-400' },
  { name: 'Tax & Income', nameHi: 'टैक्स और आय', path: '/calculators?category=tax', count: 0, icon: Receipt, gradient: 'from-amber-600 to-amber-400' },
  { name: 'Savings & FD', nameHi: 'बचत और FD', path: '/calculators?category=savings', count: 0, icon: PiggyBank, gradient: 'from-pink-600 to-pink-400' },
  { name: 'Business & GST', nameHi: 'बिज़नेस और GST', path: '/calculators?category=business', count: 0, icon: Building2, gradient: 'from-purple-600 to-purple-400' },
  { name: 'Insurance', nameHi: 'बीमा', path: '/calculators?category=insurance', count: 0, icon: Shield, gradient: 'from-teal-600 to-teal-400' },
  { name: 'Gold & Commodity', nameHi: 'सोना और कमोडिटी', path: '/calculators?category=gold', count: 0, icon: Gem, gradient: 'from-yellow-600 to-yellow-400' },
  { name: 'Math & Education', nameHi: 'गणित और शिक्षा', path: '/calculators?category=math', count: 0, icon: GraduationCap, gradient: 'from-indigo-600 to-indigo-400' },
];

// ── Tool Hubs ─────────────────────────────────────────────
interface ToolHub {
  name: string; nameHi: string; path: string; count: string;
  icon: LucideIcon; gradient: string; description: string;
}

const toolHubs: ToolHub[] = [
  { name: 'Finance Tools', nameHi: 'फाइनेंस टूल्स', path: '/finance-tools', count: '25+', icon: Wallet, gradient: 'from-blue-600 to-cyan-500', description: 'SIP, Portfolio, Dividend trackers' },
  { name: 'Tax Tools', nameHi: 'टैक्स टूल्स', path: '/tax-tools', count: '40+', icon: Receipt, gradient: 'from-amber-600 to-yellow-500', description: 'STCG, LTCG, ITR, Regime comparison' },
  { name: 'GST Tools', nameHi: 'GST टूल्स', path: '/gst-tools', count: '20+', icon: BadgePercent, gradient: 'from-emerald-600 to-green-500', description: 'GST calculator, HSN finder' },
  { name: 'Excel Tools', nameHi: 'एक्सेल टूल्स', path: '/excel-tools', count: '50+', icon: FileSpreadsheet, gradient: 'from-green-600 to-emerald-500', description: 'Templates और converters' },
  { name: 'Loan Tools', nameHi: 'लोन टूल्स', path: '/loan-tools', count: '15+', icon: Banknote, gradient: 'from-purple-600 to-violet-500', description: 'EMI, prepayment, amortization' },
  { name: 'Insurance Tools', nameHi: 'बीमा टूल्स', path: '/insurance-tools', count: '8+', icon: Shield, gradient: 'from-sky-600 to-blue-500', description: 'Life, health, car बीमा calculators' },
  { name: 'Gold Tools', nameHi: 'गोल्ड टूल्स', path: '/gold-tools', count: '5+', icon: Gem, gradient: 'from-yellow-600 to-amber-500', description: 'Gold rate, jewellery price' },
  { name: 'Invoicing Tools', nameHi: 'इनवॉइस टूल्स', path: '/invoicing-tools', count: '12+', icon: FileText, gradient: 'from-indigo-600 to-blue-500', description: 'Invoice और payment tracker' },
  { name: 'Festival Tools', nameHi: 'त्यौहार टूल्स', path: '/festival-tools', count: '25+', icon: PartyPopper, gradient: 'from-pink-600 to-rose-500', description: 'पंचांग, तिथि, मुहूर्त' },
  { name: 'Corporate Finance', nameHi: 'कॉर्पोरेट फाइनेंस', path: '/corporate-finance', count: '20+', icon: Building2, gradient: 'from-slate-600 to-gray-500', description: 'Valuation, break-even, capital' },
  { name: 'Bank Tools', nameHi: 'बैंक टूल्स', path: '/bank-tools', count: '10+', icon: Bank, gradient: 'from-teal-600 to-cyan-500', description: 'Cheque, missed call banking' },
  { name: 'Design Tools', nameHi: 'डिज़ाइन टूल्स', path: '/design-creator-tools', count: '15+', icon: Paintbrush, gradient: 'from-fuchsia-600 to-pink-500', description: 'Posters, email signatures' },
];

// ── Learn Categories ──────────────────────────────────────
interface LearnCategory {
  name: string; nameHi: string; path: string; lessons: string;
  icon: LucideIcon; color: string;
}

const learnCategories: LearnCategory[] = [
  { name: 'Loan Basics', nameHi: 'लोन की बेसिक्स', path: '/learn/loans', lessons: '20', icon: Banknote, color: 'text-blue-500' },
  { name: 'Home Loans', nameHi: 'होम लोन', path: '/learn/home-loans', lessons: '20', icon: HomeIcon, color: 'text-sky-500' },
  { name: 'Credit Cards', nameHi: 'क्रेडिट कार्ड', path: '/learn/credit-cards', lessons: '20', icon: CreditCard, color: 'text-purple-500' },
  { name: 'Credit Score', nameHi: 'क्रेडिट स्कोर', path: '/learn/credit-score', lessons: '10', icon: BarChart3, color: 'text-indigo-500' },
  { name: 'Savings & Banking', nameHi: 'बचत और बैंकिंग', path: '/learn/savings-bank-products', lessons: '8', icon: PiggyBank, color: 'text-emerald-500' },
  { name: 'Investing & Wealth', nameHi: 'निवेश और संपत्ति', path: '/learn/investing-wealth', lessons: '10', icon: TrendingUp, color: 'text-green-500' },
  { name: 'Insurance & Retirement', nameHi: 'बीमा और रिटायरमेंट', path: '/learn/insurance-retirement', lessons: '7', icon: Shield, color: 'text-teal-500' },
  { name: 'Taxation', nameHi: 'कर (टैक्स)', path: '/learn/taxation-compliance', lessons: '8', icon: Receipt, color: 'text-amber-500' },
  { name: 'FinTech & Digital', nameHi: 'फिनटेक और डिजिटल', path: '/learn/fintech-digital-payments', lessons: '8', icon: Zap, color: 'text-cyan-500' },
  { name: 'Business Finance', nameHi: 'बिज़नेस फाइनेंस', path: '/learn/business-finance-entrepreneurship', lessons: '7', icon: Briefcase, color: 'text-orange-500' },
  { name: 'Money Management', nameHi: 'पैसा प्रबंधन', path: '/learn/money-management', lessons: '8', icon: Wallet, color: 'text-rose-500' },
  { name: 'Behavioural Finance', nameHi: 'व्यवहारिक वित्त', path: '/learn/behavioural-finance-money-psychology', lessons: '7', icon: Brain, color: 'text-violet-500' },
  { name: 'Gold Loans', nameHi: 'गोल्ड लोन', path: '/learn/gold-loans', lessons: '10', icon: Gem, color: 'text-yellow-500' },
  { name: 'Business Loans', nameHi: 'बिज़नेस लोन', path: '/learn/business-loans', lessons: '10', icon: Building2, color: 'text-slate-500' },
];

// ── Quick Access Groups ───────────────────────────────────
interface QuickLink {
  name: string; path: string;
  icon: LucideIcon; gradient: string; description: string; badge?: string;
}

interface QuickAccessGroup {
  title: string; titleHi: string;
  links: QuickLink[];
}

const quickAccessGroups: QuickAccessGroup[] = [
  {
    title: 'Money & Investment', titleHi: 'पैसा और निवेश',
    links: [
      { name: 'AI Finance Chat', path: '/finance-gpt', icon: Bot, gradient: 'from-violet-600 to-purple-500', description: 'पैसों का कोई भी सवाल पूछें', badge: 'AI' },
      { name: 'Gold Rate Today', path: '/gold-rate', icon: Gem, gradient: 'from-yellow-500 to-amber-400', description: 'आज 22K / 24K सोने का भाव', badge: 'Live' },
      { name: 'Silver Rate Today', path: '/silver-rate', icon: DollarSign, gradient: 'from-slate-400 to-gray-500', description: 'आज चाँदी का भाव', badge: 'Live' },
      { name: 'IPO Dashboard', path: '/ipo', icon: LineChart, gradient: 'from-blue-600 to-indigo-500', description: 'IPO GMP data और status', badge: 'Live' },
      { name: 'Stock Market', path: '/stock-market', icon: BarChart3, gradient: 'from-cyan-600 to-sky-500', description: 'शेयर बाज़ार की जानकारी' },
      { name: 'Crypto Guide', path: '/crypto', icon: Globe2, gradient: 'from-orange-500 to-amber-500', description: 'क्रिप्टो गाइड और न्यूज़' },
    ]
  },
  {
    title: 'Government Schemes', titleHi: 'सरकारी योजनाएं',
    links: [
      { name: 'Govt Schemes Hub', path: '/government-schemes', icon: Landmark, gradient: 'from-green-600 to-emerald-500', description: '50+ सरकारी योजनाएं', badge: '50+' },
      { name: 'Schemes Finder', path: '/schemes-finder', icon: Search, gradient: 'from-teal-500 to-green-400', description: 'योजना खोजें अपने लिए' },
      { name: 'Personal Finance', path: '/personal-finance-management', icon: Heart, gradient: 'from-red-500 to-rose-400', description: 'बजट, खर्च और नेट वर्थ' },
    ]
  },
  {
    title: 'News & Blog', titleHi: 'खबरें और ब्लॉग',
    links: [
      { name: 'Finance News', path: '/news', icon: Newspaper, gradient: 'from-rose-500 to-red-400', description: 'ताज़ा वित्तीय समाचार' },
      { name: 'Finance Blog', path: '/blog', icon: BookOpen, gradient: 'from-emerald-500 to-teal-400', description: '150+ पर्सनल फाइनेंस गाइड' },
      { name: 'Discover', path: '/discover', icon: Sparkles, gradient: 'from-indigo-500 to-violet-400', description: 'ट्रेंडिंग फाइनेंशियल स्टोरीज़' },
      { name: 'Banking Knowledge', path: '/blog/category/banking', icon: Bank, gradient: 'from-sky-500 to-blue-400', description: 'बैंकिंग नॉलेज बेस' },
    ]
  },
  {
    title: 'Fun & Utility', titleHi: 'मनोरंजन और उपयोगी',
    links: [
      { name: 'Finance Games', path: '/games', icon: Gamepad2, gradient: 'from-pink-500 to-fuchsia-400', description: 'खेल-खेल में सीखें फाइनेंस', badge: 'Fun' },
      { name: 'Festival Tools', path: '/festival-tools', icon: PartyPopper, gradient: 'from-orange-500 to-red-400', description: 'त्यौहार, मुहूर्त, तिथि' },
      { name: 'Astro Finance', path: '/astro-finance', icon: Star, gradient: 'from-purple-500 to-pink-400', description: 'राशिफल और वित्तीय भविष्य' },
      { name: 'Design Tools', path: '/design-creator-tools', icon: Paintbrush, gradient: 'from-fuchsia-500 to-pink-400', description: 'पोस्टर, ईमेल सिग्नेचर' },
      { name: 'Resume Builder', path: '/resume-builder', icon: FileText, gradient: 'from-slate-500 to-gray-400', description: 'प्रोफेशनल रिज़्यूमे बनाएं' },
    ]
  },
];

// ── Government Schemes Spotlight ──────────────────────────
const govtSchemes = [
  { name: 'PM किसान सम्मान निधि', path: '/government-schemes/pm-kisan-samman-nidhi', description: 'किसानों को ₹6,000 सालाना', icon: '🌾' },
  { name: 'PM आवास योजना', path: '/government-schemes/pm-awas-yojana', description: 'सबके लिए पक्का मकान', icon: '🏠' },
  { name: 'सुकन्या समृद्धि योजना', path: '/government-schemes/sukanya-samriddhi-yojana', description: 'बेटी की शिक्षा और शादी', icon: '👧' },
  { name: 'PM उज्ज्वला योजना', path: '/government-schemes/pm-ujjwala-yojana', description: 'मुफ़्त LPG गैस कनेक्शन', icon: '🔥' },
  { name: 'अटल पेंशन योजना', path: '/government-schemes/atal-pension-yojana', description: '₹1,000-5,000 मासिक पेंशन', icon: '🧓' },
  { name: 'PM जन धन योजना', path: '/government-schemes/pm-jan-dhan-yojana', description: 'ज़ीरो बैलेंस बैंक खाता', icon: '🏦' },
];

// ── Why MoneyCal Features ─────────────────────────────────
const whyFeatures = [
  { title: '100% Free', titleHi: 'पूरी तरह मुफ़्त', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', description: 'कोई hidden charge नहीं, कोई premium plan नहीं' },
  { title: 'No Login Required', titleHi: 'लॉगिन ज़रूरी नहीं', icon: Lock, color: 'text-blue-500', bg: 'bg-blue-50', description: 'बिना signup के सभी tools यूज़ करें' },
  { title: 'Privacy First', titleHi: 'आपका डेटा सुरक्षित', icon: Shield, color: 'text-purple-500', bg: 'bg-purple-50', description: 'सब कुछ आपके browser में — हम कुछ store नहीं करते' },
  { title: '200+ Tools', titleHi: '200+ टूल्स', icon: Layers, color: 'text-amber-500', bg: 'bg-amber-50', description: 'Calculators, tools, templates — सब एक जगह' },
  { title: 'AI Powered', titleHi: 'AI की ताकत', icon: Bot, color: 'text-violet-500', bg: 'bg-violet-50', description: 'Gemini AI से instant financial answers' },
  { title: 'Made for India', titleHi: 'भारत के लिए बना', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50', description: 'INR, Indian tax slabs, govt schemes — सब भारतीय context में' },
];

// ── FAQ ───────────────────────────────────────────────────
const faqItems = [
  { q: 'MoneyCal क्या है? | What is MoneyCal?', a: 'MoneyCal भारत का #1 free financial platform है जहाँ आपको 200+ calculators (EMI, SIP, Income Tax, GST, PPF, FD, Home Loan), 12 tool hubs, 150+ learning lessons, AI assistant, government schemes finder, और latest finance news — सब कुछ एक जगह मिलता है, बिल्कुल free।' },
  { q: 'क्या MoneyCal पूरी तरह free है?', a: 'हाँ! MoneyCal 100% free है। कोई registration, login या subscription की ज़रूरत नहीं। सभी calculators, tools, learning modules, और AI assistant unlimited बार use कर सकते हैं।' },
  { q: 'EMI Calculator कैसे use करें?', a: 'MoneyCal पर EMI Calculator use करना बहुत आसान है। बस Loan Amount, Interest Rate, और Tenure डालें — तुरंत EMI, total interest, और payment schedule दिखेगी। Home loan, car loan, personal loan — सभी के लिए काम करता है।' },
  { q: 'SIP Calculator क्या करता है?', a: 'SIP Calculator से आप जान सकते हैं कि हर महीने ₹500, ₹1000, ₹5000 या कोई भी amount invest करने पर 5, 10, 20 साल बाद कितना corpus बनेगा। यह mutual fund SIP planning के लिए best tool है।' },
  { q: 'Income Tax Calculator — Old vs New Regime?', a: 'MoneyCal का Income Tax Calculator FY 2025-26 के latest slabs के हिसाब से बना है। इसमें Old Regime और New Regime दोनों में tax compare कर सकते हैं और देख सकते हैं कि कौन सा regime आपके लिए फायदेमंद है।' },
  { q: 'GST Calculator कैसे काम करता है?', a: 'GST Calculator में product/service का amount डालें, GST rate चुनें (5%, 12%, 18%, 28%), और inclusive/exclusive select करें। तुरंत CGST, SGST, IGST breakdown के साथ final amount दिखेगा।' },
  { q: 'क्या मेरा financial data safe है?', a: 'बिल्कुल! MoneyCal पर सब calculations आपके browser में ही होती हैं। हम कोई personal या financial data collect या store नहीं करते। आपकी privacy हमारी top priority है।' },
  { q: 'MoneyCal पर कौन-कौन से tools हैं?', a: 'MoneyCal पर 200+ tools हैं: EMI, SIP, PPF, FD, Income Tax, GST, Home Loan, NPS, Gratuity calculators + Finance Tools, Tax Tools, GST Tools, Excel Tools, Loan Tools, Insurance Tools, Gold Tools, Invoicing Tools, Festival Tools, Corporate Finance Tools, Bank Tools, और Design Tools।' },
  { q: 'सरकारी योजनाएं कहाँ देखें?', a: 'MoneyCal पर 50+ सरकारी योजनाओं की पूरी जानकारी है — PM Kisan, PM Awas, Sukanya Samriddhi, Atal Pension, PMJDY, Ujjwala, Mudra Loan, और बहुत सी। Government Schemes section में जाकर अपनी eligibility और application process देखें।' },
  { q: 'AI Finance Chat क्या है?', a: 'MoneyCal का AI Finance Chat (powered by Gemini AI) से आप Hinglish/Hindi/English में कोई भी financial question पूछ सकते हैं — EMI kitni hogi? Tax kaise bachayein? Best SIP plan kaunsa hai? — और instant, detailed answer मिलेगा।' },
];

// ── Internal Links for SEO ────────────────────────────────
const seoLinks = [
  { label: 'EMI Calculator', path: '/calculators/emi-calculator' },
  { label: 'SIP Calculator', path: '/calculators/sip-calculator' },
  { label: 'Income Tax Calculator', path: '/calculators/income-tax-calculator' },
  { label: 'GST Calculator', path: '/calculators/gst-calculator' },
  { label: 'PPF Calculator', path: '/calculators/ppf-calculator' },
  { label: 'FD Calculator', path: '/calculators/fd-calculator' },
  { label: 'Home Loan Calculator', path: '/calculators/home-loan-calculator' },
  { label: 'NPS Calculator', path: '/calculators/nps-calculator' },
  { label: 'Gratuity Calculator', path: '/calculators/gratuity-calculator' },
  { label: 'Retirement Calculator', path: '/calculators/retirement-calculator' },
  { label: 'CAGR Calculator', path: '/calculators/cagr-calculator' },
  { label: 'Compound Interest', path: '/calculators/compound-interest-calculator' },
  { label: 'Simple Interest', path: '/calculators/simple-interest-calculator' },
  { label: 'Gold Rate Today', path: '/gold-rate' },
  { label: 'Silver Rate Today', path: '/silver-rate' },
  { label: 'Finance Tools', path: '/finance-tools' },
  { label: 'Tax Tools', path: '/tax-tools' },
  { label: 'GST Tools', path: '/gst-tools' },
  { label: 'Excel Tools', path: '/excel-tools' },
  { label: 'Loan Tools', path: '/loan-tools' },
  { label: 'Insurance Tools', path: '/insurance-tools' },
  { label: 'Invoicing Tools', path: '/invoicing-tools' },
  { label: 'Festival Tools', path: '/festival-tools' },
  { label: 'Corporate Finance', path: '/corporate-finance' },
  { label: 'Government Schemes', path: '/government-schemes' },
  { label: 'Finance Blog', path: '/blog' },
  { label: 'Finance News', path: '/news' },
  { label: 'Learn Finance', path: '/learn' },
  { label: 'Discover Stories', path: '/discover' },
  { label: 'Stock Market', path: '/stock-market' },
  { label: 'IPO Dashboard', path: '/ipo' },
  { label: 'Crypto Section', path: '/crypto' },
  { label: 'Finance Games', path: '/games' },
  { label: 'AI Finance Chat', path: '/finance-gpt' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

// ── Section Header ────────────────────────────────────────
const SectionHeader: React.FC<{
  title: string; subtitle: string;
  titleHi?: string;
  link?: string; linkText?: string;
  id?: string;
}> = ({ title, subtitle, titleHi, link, linkText, id }) => (
  <div id={id} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-8">
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
      {titleHi && <p className="text-base text-blue-600 font-semibold mt-0.5">{titleHi}</p>}
      <p className="text-gray-500 mt-1 text-sm sm:text-base">{subtitle}</p>
    </div>
    {link && (
      <Link to={link} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group shrink-0">
        {linkText || 'View All'} <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    )}
  </div>
);

// ═══════════════════════════════════════════════════════════
// HOMEPAGE COMPONENT
// ═══════════════════════════════════════════════════════════
export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  // Build search index
  const searchIndex = useMemo(() => {
    const calcs = calculatorCategories.flatMap(cat =>
      cat.calculators.map(c => ({ name: c.name, path: `/calculators/${c.id}`, type: 'Calculator' }))
    );
    const tools = toolHubs.map(t => ({ name: t.name, path: t.path, type: 'Tool Hub' }));
    const learn = learnCategories.map(l => ({ name: l.name, path: l.path, type: 'Learn' }));
    const access = quickAccessGroups.flatMap(g => g.links.map(l => ({ name: l.name, path: l.path, type: 'Page' })));
    return [...calcs, ...tools, ...learn, ...access];
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return searchIndex.filter(item =>
      item.name.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [searchQuery, searchIndex]);

  const trending = discoverArticles.slice(0, 6);

  return (
    <>
      <SEOHelmet
        title="MoneyCal — भारत का #1 Free Financial Calculator, Tools & Learning Platform 2025-26"
        description="200+ free financial calculators — EMI Calculator, SIP Calculator, Income Tax Calculator, GST Calculator, PPF, FD, Home Loan, NPS। 12 Tool Hubs, 150+ Learning Lessons, AI Assistant, Government Schemes, Finance News। सब कुछ free, बिना login। भारत का सबसे बड़ा finance platform।"
        keywords="EMI calculator, SIP calculator, income tax calculator India, GST calculator online, PPF calculator, FD calculator, home loan calculator, NPS calculator, financial calculator India, free finance tools, sarkari yojana, government schemes India, finance learning Hindi, MoneyCal, money calculator"
        url="/"
        breadcrumbs={[{ name: 'Home', url: '/' }]}
        faqData={faqItems.map(f => ({ question: f.q, answer: f.a }))}
        isFinanceContent={true}
      />

      <div className="min-h-screen bg-white">

        {/* ═══════════════════════════════════════════════════════
            SECTION 1: HERO
        ═══════════════════════════════════════════════════════ */}
        <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 pt-6 pb-14 sm:pt-10 sm:pb-20">
          {/* Animated blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-teal-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full mb-5">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-white/90">India's #1 Free Finance Platform</span>
              </div>

              {/* H1 */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
                भारत का <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">#1 Free</span>{' '}
                Finance Platform
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-blue-100/60 max-w-3xl mx-auto mb-3 leading-relaxed">
                पैसों की हर गिनती, <span className="text-white font-semibold">MoneyCal</span> के साथ
              </p>
              <p className="text-sm sm:text-base text-blue-200/40 max-w-2xl mx-auto mb-7">
                {totalCalculators}+ Calculators · 12 Tool Hubs · 150+ Free Lessons · AI Assistant · Govt Schemes · All Free — No Login
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto mb-8">
                <div className={`relative flex items-center bg-white/10 backdrop-blur-xl border rounded-2xl transition-all duration-300 ${searchFocused ? 'border-blue-400/50 bg-white/15 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'border-white/15 hover:border-white/25'}`}>
                  <Search className="w-5 h-5 text-blue-300/60 ml-5 shrink-0" />
                  <input
                    id="homepage-search"
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                    placeholder="Search calculators, tools, lessons... कुछ भी खोजें"
                    className="flex-1 bg-transparent text-white placeholder:text-blue-200/40 px-4 py-4 text-base focus:outline-none"
                    aria-label="Search calculators and tools"
                  />
                  <Link
                    to="/finance-gpt"
                    className="flex items-center gap-2 mr-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-400 hover:to-teal-300 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                  >
                    <Bot className="w-4 h-4" /> AI से पूछें
                  </Link>
                </div>

                {/* Search Results Dropdown */}
                {searchQuery.trim() && searchResults.length > 0 && searchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                    {searchResults.map((item, i) => (
                      <Link
                        key={i}
                        to={item.path}
                        className="flex items-center justify-between px-5 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0"
                      >
                        <span className="text-sm font-medium text-gray-800">{item.name}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">{item.type}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                {[
                  { label: 'Calculators', value: `${totalCalculators}+`, icon: Calculator },
                  { label: 'Tool Hubs', value: '12', icon: Zap },
                  { label: 'Free Lessons', value: '150+', icon: GraduationCap },
                  { label: 'Users', value: '10L+', icon: Users },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <stat.icon className="w-4 h-4 text-blue-300/60" />
                      <span className="text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</span>
                    </div>
                    <span className="text-xs text-blue-200/50 font-medium uppercase tracking-wider">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 2: QUICK ACTIONS
        ═══════════════════════════════════════════════════════ */}
        <section id="quick-actions" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <SectionHeader
            title="Quick Actions"
            titleHi="सबसे ज़्यादा इस्तेमाल होने वाले टूल्स"
            subtitle="Most popular tools — one click, instant results"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
          >
            {quickActions.map((action, i) => (
              <motion.div key={action.id} custom={i} variants={fadeUp}>
                <Link
                  to={action.path}
                  id={`quick-action-${action.id}`}
                  className="group block p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-blue-600 transition-colors">{action.name}</h3>
                  <p className="text-[11px] text-blue-500 font-medium">{action.nameHi}</p>
                  <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{action.description}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 3: ALL CALCULATOR CATEGORIES
        ═══════════════════════════════════════════════════════ */}
        <section id="calculator-categories" className="bg-gradient-to-b from-gray-50/80 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <SectionHeader
              title={`${totalCalculators}+ Financial Calculators`}
              titleHi="फाइनेंशियल कैलकुलेटर — सभी कैटेगरी"
              subtitle="EMI, SIP, Tax, GST, PPF, FD, Home Loan — every calculator you need"
              link="/calculators"
              linkText={`All ${totalCalculators}+ Calculators`}
            />
            <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 sm:overflow-visible scrollbar-hide">
              {calcCategoriesDisplay.map((cat, i) => (
                <Link
                  key={cat.name}
                  to={cat.path}
                  className="group flex-shrink-0 w-44 sm:w-auto p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                    <cat.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
                  <p className="text-[11px] text-blue-500 font-medium">{cat.nameHi}</p>
                </Link>
              ))}
            </div>
            {/* Popular calculators quick list */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['EMI Calculator', 'SIP Calculator', 'PPF Calculator', 'FD Calculator', 'Income Tax', 'GST Calculator', 'Home Loan', 'NPS Calculator', 'Gratuity', 'CAGR', 'Compound Interest', 'Retirement'].map(name => {
                const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
                return (
                  <Link
                    key={name}
                    to={`/calculators/${slug}${slug.endsWith('-calculator') ? '' : '-calculator'}`}
                    className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-100 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                  >
                    {name}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 4: TOOL HUBS
        ═══════════════════════════════════════════════════════ */}
        <section id="tool-hubs" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <SectionHeader
            title="12 Tool Hubs — 200+ Tools"
            titleHi="12 टूल हब — हर ज़रूरत के लिए"
            subtitle="Specialized tool collections for every financial need"
            link="/tools"
            linkText="All 200+ Tools"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {toolHubs.map((hub, i) => (
              <motion.div key={hub.path} custom={i} variants={fadeUp}>
                <Link
                  to={hub.path}
                  id={`tool-hub-${hub.path.replace(/\//g, '-').slice(1)}`}
                  className="group block p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${hub.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${hub.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        <hub.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">{hub.count} tools</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-blue-600 transition-colors">{hub.name}</h3>
                    <p className="text-[11px] text-blue-500 font-medium mb-1">{hub.nameHi}</p>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{hub.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 5: LEARNING PLATFORM
        ═══════════════════════════════════════════════════════ */}
        <section id="learn-finance" className="bg-gradient-to-b from-gray-50/80 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <SectionHeader
              title="Learn Finance — 150+ Free Lessons"
              titleHi="फाइनेंस सीखें — 14 कोर्स, 150+ फ्री लेसन"
              subtitle="Loans, investing, tax, insurance, FinTech — सब कुछ हिंदी और English में"
              link="/learn"
              linkText="सभी Courses देखें"
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
            >
              {learnCategories.map((cat, i) => (
                <motion.div key={cat.path} custom={i} variants={fadeUp}>
                  <Link
                    to={cat.path}
                    id={`learn-${cat.path.split('/').pop()}`}
                    className="group block p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300"
                  >
                    <cat.icon className={`w-7 h-7 ${cat.color} mb-3 group-hover:scale-110 transition-transform`} />
                    <h3 className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-blue-600 transition-colors leading-snug">{cat.name}</h3>
                    <p className="text-[11px] text-blue-500 font-medium mb-1">{cat.nameHi}</p>
                    <p className="text-[11px] text-gray-400 font-medium">{cat.lessons} lessons</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 6: QUICK ACCESS NAVIGATION
        ═══════════════════════════════════════════════════════ */}
        <section id="quick-access" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <SectionHeader
            title="Quick Access — All Sections"
            titleHi="सभी सेक्शन — एक नज़र में"
            subtitle="News, Blog, Schemes, IPO, Gold Rate, Games & more — one click away"
          />
          <div className="space-y-8">
            {quickAccessGroups.map((group, gi) => (
              <div key={group.title}>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-bold text-gray-800">{group.title}</h3>
                  <span className="text-sm text-blue-500 font-medium">• {group.titleHi}</span>
                </div>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
                >
                  {group.links.map((item, i) => (
                    <motion.div key={item.path} custom={i} variants={fadeUp}>
                      <Link
                        to={item.path}
                        id={`nav-${item.path.replace(/\//g, '-').slice(1)}`}
                        className="group block p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300`} />
                        <div className="relative">
                          <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                              <item.icon className="w-5 h-5 text-white" />
                            </div>
                            {item.badge && (
                              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                item.badge === 'AI' ? 'bg-purple-50 text-purple-600 border border-purple-200' :
                                item.badge === 'Live' ? 'bg-green-50 text-green-600 border border-green-200' :
                                item.badge === 'Fun' ? 'bg-pink-50 text-pink-600 border border-pink-200' :
                                'bg-blue-50 text-blue-600 border border-blue-200'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{item.description}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 7: TRENDING STORIES
        ═══════════════════════════════════════════════════════ */}
        {trending.length > 0 && (
          <section id="trending-stories" className="bg-gradient-to-b from-gray-50/80 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
              <SectionHeader
                title="Trending Stories"
                titleHi="ट्रेंडिंग स्टोरीज़"
                subtitle="Latest financial news and trending articles"
                link="/discover"
                linkText="See All"
              />
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {trending.map((article, i) => (
                  <motion.div key={article.id} custom={i} variants={fadeUp}>
                    <Link
                      to={`/discover/${article.slug}`}
                      className="group block p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300"
                    >
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>
                      {(article as any).snippet && (
                        <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">{(article as any).snippet}</p>
                      )}
                      <div className="flex items-center gap-2 text-[11px] text-gray-400">
                        <Clock className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        <span className="ml-auto inline-flex items-center gap-1 text-blue-500 font-semibold group-hover:gap-1.5 transition-all">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════
            SECTION 8: GOVERNMENT SCHEMES SPOTLIGHT
        ═══════════════════════════════════════════════════════ */}
        <section id="govt-schemes" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <SectionHeader
            title="Popular Government Schemes"
            titleHi="लोकप्रिय सरकारी योजनाएं"
            subtitle="50+ schemes — PM Kisan, Awas, Sukanya, Ujjwala & more"
            link="/government-schemes"
            linkText="सभी 50+ योजनाएं देखें"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          >
            {govtSchemes.map((scheme, i) => (
              <motion.div key={scheme.path} custom={i} variants={fadeUp}>
                <Link
                  to={scheme.path}
                  className="group flex items-start gap-4 p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:shadow-green-500/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                    {scheme.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-green-600 transition-colors">{scheme.name}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{scheme.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 9: WHY MONEYCAL
        ═══════════════════════════════════════════════════════ */}
        <section id="why-moneycal" className="bg-gradient-to-b from-gray-50/80 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Why MoneyCal?</h2>
              <p className="text-blue-600 font-semibold">MoneyCal क्यों चुनें?</p>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">Trusted by 10 lakh+ users across India</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {whyFeatures.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mx-auto mb-3`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-0.5">{feature.title}</h3>
                  <p className="text-[11px] text-blue-500 font-medium mb-1">{feature.titleHi}</p>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 10: AI FINANCE CTA
        ═══════════════════════════════════════════════════════ */}
        <section id="ai-assistant" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 sm:p-12">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal-400/10 rounded-full blur-2xl" />
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            </div>
            <div className="relative flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 mb-4">
                  <Sparkles className="w-4 h-4 text-yellow-300" /> Powered by Gemini AI
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3">
                  AI Financial Assistant
                </h2>
                <p className="text-blue-100/70 text-sm sm:text-base max-w-lg mb-6 leading-relaxed">
                  पूछिए कुछ भी — EMI, SIP, Tax, IPO, Gold Rate. Get instant answers in Hindi/Hinglish with calculator recommendations.
                </p>
                <Link
                  to="/finance-gpt"
                  id="cta-ai-chat"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl shadow-black/20 hover:-translate-y-0.5"
                >
                  <Bot className="w-5 h-5" /> Start Chatting — Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 max-w-sm justify-center lg:justify-end">
                {[
                  '₹50L Home Loan EMI?',
                  '₹10K SIP 20 साल में?',
                  'Old vs New Tax Regime?',
                  'PPF vs FD — कहाँ invest?',
                  'CIBIL Score कैसे बढ़ाएं?',
                  'IPO में apply कैसे करें?',
                ].map((q, i) => (
                  <Link
                    key={i}
                    to="/finance-gpt"
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 rounded-xl text-xs text-white/80 hover:text-white transition-all"
                  >
                    {q}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 11: FAQ — SEO RICH
        ═══════════════════════════════════════════════════════ */}
        <section id="faq" className="bg-gradient-to-b from-gray-50/80 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Frequently Asked Questions</h2>
              <p className="text-blue-600 font-semibold">अक्सर पूछे जाने वाले सवाल</p>
            </div>
            <div className="space-y-3">
              {faqItems.map((faq, i) => (
                <details key={i} id={`faq-${i}`} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-sm sm:text-base font-semibold text-gray-900 select-none">
                    {faq.q}
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-4 text-sm text-gray-500 leading-relaxed -mt-1">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 12: BOTTOM CTA + INTERNAL LINKS
        ═══════════════════════════════════════════════════════ */}
        <section id="footer-cta" className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 py-14 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              अपने पैसों पर Control लें — आज ही शुरू करें
            </h2>
            <p className="text-blue-100/60 text-sm sm:text-base mb-8 max-w-xl mx-auto">
              Start with any calculator, explore tools, or ask the AI assistant. Everything is free, no signup needed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <Link
                to="/calculators"
                id="cta-calculators"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl"
              >
                <Calculator className="w-5 h-5" /> Explore Calculators
              </Link>
              <Link
                to="/finance-gpt"
                id="cta-ai-bottom"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold rounded-xl hover:from-blue-400 hover:to-teal-300 transition-all shadow-xl shadow-blue-500/25"
              >
                <Bot className="w-5 h-5" /> AI से पूछें
              </Link>
              <Link
                to="/learn"
                id="cta-learn"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/15 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
              >
                <GraduationCap className="w-5 h-5" /> सीखना शुरू करें
              </Link>
            </div>

            {/* Internal Links Grid for SEO */}
            <nav aria-label="Site navigation" className="border-t border-white/10 pt-8">
              <h3 className="text-sm font-semibold text-blue-200/50 uppercase tracking-wider mb-4">Quick Links — सभी पेज</h3>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                {seoLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-xs text-blue-200/40 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </section>

      </div>
    </>
  );
};

export default HomePage;
