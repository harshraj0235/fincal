import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Calculator, BookOpen, Newspaper, Globe, 
  ArrowRight, Star, Zap, Shield, Award, Search, ChevronRight,
  Sun, Moon, X, Flame, Menu, Clock, Sparkles, Heart, CheckCircle,
  TrendingDown, DollarSign, Home, PiggyBank, FileText, Target,
  BarChart3, Gift, Building, Umbrella, PartyPopper, HelpCircle,
  Rocket, Bell, Calendar, Tag
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { blogPosts as blogPosts0 } from '../data/blogData';
import { blogPosts as blogPosts1 } from '../data/blogData1';

// Get current date
const getCurrentDate = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    fullDate: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  };
};

// COMPREHENSIVE Search Database - ALL 107 Calculators + More
const buildSearchDatabase = () => {
  const calculators = [
    // Investment (20+)
    { name: 'SIP Calculator', path: '/calculators/sip-calculator', category: 'Investment', emoji: '📈', keywords: 'sip mutual fund systematic' },
    { name: 'PPF Calculator', path: '/calculators/ppf-calculator', category: 'Investment', emoji: '🏦', keywords: 'ppf provident fund' },
    { name: 'FD Calculator', path: '/calculators/compound-interest-calculator', category: 'Investment', emoji: '💰', keywords: 'fixed deposit fd interest' },
    { name: 'CAGR Calculator', path: '/calculators/cagr-calculator', category: 'Investment', emoji: '📊', keywords: 'cagr growth rate' },
    { name: 'Lumpsum Calculator', path: '/calculators/lumpsum-calculator', category: 'Investment', emoji: '💵', keywords: 'lumpsum investment' },
    { name: 'SWP Calculator', path: '/calculators/swp-calculator', category: 'Investment', emoji: '👛', keywords: 'systematic withdrawal' },
    { name: 'Mutual Fund Returns', path: '/calculators/mutual-fund-returns-calculator', category: 'Investment', emoji: '📊', keywords: 'mutual fund returns' },
    { name: 'Asset Allocation Planner', path: '/calculators/asset-allocation-planner', category: 'Investment', emoji: '🎯', keywords: 'asset allocation portfolio' },
    { name: 'XIRR Tracker', path: '/calculators/xirr-tracker', category: 'Investment', emoji: '📈', keywords: 'xirr returns tracking' },
    { name: 'Gold Investment Calculator', path: '/calculators/gold-investment-calculator', category: 'Investment', emoji: '🏆', keywords: 'gold investment' },
    
    // Loan (15+)
    { name: 'EMI Calculator', path: '/calculators/emi-calculator', category: 'Loan', emoji: '🧮', keywords: 'emi loan monthly' },
    { name: 'Home Loan EMI', path: '/calculators/home-loan-calculator', category: 'Loan', emoji: '🏠', keywords: 'home loan housing' },
    { name: 'Personal Loan', path: '/calculators/personal-loan-calculator', category: 'Loan', emoji: '💵', keywords: 'personal loan instant' },
    { name: 'Car Loan', path: '/calculators/car-loan-calculator', category: 'Loan', emoji: '🚗', keywords: 'car auto vehicle loan' },
    { name: 'Loan Comparison', path: '/calculators/loan-comparison-calculator', category: 'Loan', emoji: '📊', keywords: 'compare loans interest' },
    { name: 'Loan Prepayment', path: '/calculators/loan-prepayment-calculator', category: 'Loan', emoji: '💰', keywords: 'prepayment foreclosure' },
    { name: 'Loan Affordability', path: '/loan-tools/loan-affordability', category: 'Loan', emoji: '🎯', keywords: 'affordability eligibility' },
    { name: 'Business Loan', path: '/calculators/business-loan-calculator', category: 'Loan', emoji: '💼', keywords: 'business loan msme' },
    { name: 'Gold Loan EMI', path: '/calculators/gold-loan-emi-calculator', category: 'Loan', emoji: '🏆', keywords: 'gold loan emi' },
    
    // GST (20+)
    { name: 'GST Calculator', path: '/tools/gst-amount-calculator', category: 'GST', emoji: '🧮', keywords: 'gst goods services tax' },
    { name: 'HSN/SAC Finder', path: '/tools/gst-hsn-sac-finder', category: 'GST', emoji: '🔍', keywords: 'hsn sac code finder' },
    { name: 'Reverse GST', path: '/tools/reverse-gst-calculator', category: 'GST', emoji: '🔄', keywords: 'reverse gst backward' },
    { name: 'GST Slab Calculator', path: '/tools/gst-slab-calculator', category: 'GST', emoji: '💹', keywords: 'gst rate slab' },
    { name: 'GSTR-1 Deadline', path: '/tools/gstr-1-deadline-calculator', category: 'GST', emoji: '📅', keywords: 'gstr1 filing deadline' },
    { name: 'GSTR-3B Deadline', path: '/tools/gstr-3b-deadline-calculator', category: 'GST', emoji: '📆', keywords: 'gstr3b return' },
    { name: 'GST Liability', path: '/tools/gst-liability-calculator', category: 'GST', emoji: '💰', keywords: 'gst liability total' },
    { name: 'ITC Eligibility', path: '/tools/itc-eligibility-checker', category: 'GST', emoji: '✅', keywords: 'itc input tax credit' },
    { name: 'Composition Scheme', path: '/tools/composition-scheme-checker', category: 'GST', emoji: '📋', keywords: 'composition scheme eligibility' },
    
    // Tax (15+)
    { name: 'Income Tax Calculator', path: '/tools/income-tax-calculator', category: 'Tax', emoji: '📄', keywords: 'income tax old new regime' },
    { name: 'HRA Calculator', path: '/calculators/hra-calculator', category: 'Tax', emoji: '🏠', keywords: 'hra house rent allowance' },
    { name: 'Capital Gains Tax', path: '/calculators/capital-gains-tax-calculator', category: 'Tax', emoji: '💹', keywords: 'capital gains ltcg stcg' },
    { name: 'TDS Calculator', path: '/calculators/tds-calculator', category: 'Tax', emoji: '💰', keywords: 'tds tax deducted source' },
    { name: '80C Calculator', path: '/calculators/section-80c-calculator', category: 'Tax', emoji: '🏦', keywords: '80c deduction tax saving' },
    { name: '80D Calculator', path: '/calculators/section-80d-calculator', category: 'Tax', emoji: '🛡️', keywords: '80d health insurance' },
    { name: 'Advance Tax', path: '/calculators/advance-tax-calculator', category: 'Tax', emoji: '📅', keywords: 'advance tax quarterly' },
    { name: 'Tax Saving Investment', path: '/calculators/tax-saving-investment-calculator', category: 'Tax', emoji: '💰', keywords: 'tax saving investment' },
    
    // Retirement (10+)
    { name: 'Retirement Calculator', path: '/calculators/retirement-calculator', category: 'Retirement', emoji: '👴', keywords: 'retirement planning corpus' },
    { name: 'NPS Calculator', path: '/calculators/nps-calculator', category: 'Retirement', emoji: '🎯', keywords: 'nps national pension' },
    { name: 'EPF Calculator', path: '/calculators/epf-calculator', category: 'Retirement', emoji: '🏢', keywords: 'epf provident fund' },
    { name: 'Pension Calculator', path: '/calculators/pension-calculator', category: 'Retirement', emoji: '💰', keywords: 'pension monthly' },
    { name: 'Gratuity Calculator', path: '/calculators/gratuity-calculator', category: 'Retirement', emoji: '🎁', keywords: 'gratuity calculation' },
    
    // Insurance (10+)
    { name: 'Life Insurance', path: '/calculators/life-insurance-calculator', category: 'Insurance', emoji: '🛡️', keywords: 'life insurance term cover' },
    { name: 'Health Insurance', path: '/calculators/health-insurance-calculator', category: 'Insurance', emoji: '❤️', keywords: 'health insurance premium' },
    { name: 'Term Insurance', path: '/calculators/term-insurance-calculator', category: 'Insurance', emoji: '🛡️', keywords: 'term insurance pure' },
    
    // Festival Tools (11)
    { name: 'Lunar Eclipse Predictor', path: '/festival-tools/lunar-eclipse-predictor', category: 'Festival', emoji: '🌑', keywords: 'lunar eclipse grahan sutak' },
    { name: 'Auspicious Marriage Days', path: '/festival-tools/auspicious-marriage-days', category: 'Festival', emoji: '💍', keywords: 'marriage wedding muhurat' },
    { name: 'Panchang Today', path: '/festival-tools/panchang-today', category: 'Festival', emoji: '📅', keywords: 'panchang tithi nakshatra' },
    { name: 'Weekly Tithi Finder', path: '/festival-tools/weekly-tithi-finder', category: 'Festival', emoji: '📆', keywords: 'tithi lunar week' },
    { name: 'Moon Phase Festivals', path: '/festival-tools/moon-phase-festivals', category: 'Festival', emoji: '🌙', keywords: 'moon phase purnima' },
    { name: 'Purnima Amavasya', path: '/festival-tools/purnima-amavasya-dates', category: 'Festival', emoji: '🌕', keywords: 'full moon new moon' },
    { name: 'Vrat Calendar', path: '/festival-tools/vrat-upavas-calendar', category: 'Festival', emoji: '🙏', keywords: 'vrat fasting upavas' },
    { name: 'Nakshatra Festival', path: '/festival-tools/nakshatra-festival', category: 'Festival', emoji: '⭐', keywords: 'nakshatra birth star' },
    { name: 'Shubh Muhurat', path: '/festival-tools/shubh-muhurat-reminder', category: 'Festival', emoji: '🔔', keywords: 'muhurat auspicious time' },
    { name: 'Parsi New Year', path: '/festival-tools/parsi-new-year', category: 'Festival', emoji: '🎊', keywords: 'navroz parsi zoroastrian' },
    { name: 'Hindu Panchang Year', path: '/festival-tools/hindu-panchang-year', category: 'Festival', emoji: '📖', keywords: 'hindu calendar year' },
    
    // Learn (40 lessons)
    { name: 'Gold Loans - 10 Lessons', path: '/learn/gold-loans', category: 'Learn', emoji: '🏆', keywords: 'gold loan education lessons' },
    { name: 'Credit Cards - 20 Lessons', path: '/learn/credit-cards', category: 'Learn', emoji: '💳', keywords: 'credit card lessons guide' },
    { name: 'Credit Score - 10 Lessons', path: '/learn/credit-score', category: 'Learn', emoji: '📊', keywords: 'credit score cibil lessons' },
    
    // More Calculators (50+)
    { name: 'Salary Calculator', path: '/calculators/salary-calculator', category: 'Salary', emoji: '💰', keywords: 'salary take home ctc' },
    { name: 'Budget Calculator', path: '/calculators/budget-calculator', category: 'Budget', emoji: '💵', keywords: 'budget planner monthly' },
    { name: 'Currency Converter', path: '/calculators/currency-converter', category: 'Currency', emoji: '🌍', keywords: 'currency exchange forex' },
    { name: 'Inflation Calculator', path: '/calculators/inflation-calculator', category: 'Finance', emoji: '📈', keywords: 'inflation rate future value' },
    { name: 'Break Even Calculator', path: '/calculators/break-even-calculator', category: 'Business', emoji: '🎯', keywords: 'break even analysis' },
    { name: 'Margin Calculator', path: '/calculators/profit-margin-calculator', category: 'Business', emoji: '💹', keywords: 'profit margin markup' },
    { name: 'Discount Calculator', path: '/calculators/discount-calculator', category: 'Shopping', emoji: '🏷️', keywords: 'discount percentage off' },
    { name: 'Net Worth Calculator', path: '/calculators/net-worth-calculator', category: 'Finance', emoji: '💎', keywords: 'net worth assets liabilities' },
    { name: 'Savings Account Calculator', path: '/calculators/savings-account-calculator', category: 'Banking', emoji: '🏦', keywords: 'savings account interest' },
    { name: 'Sukanya Samriddhi', path: '/calculators/sukanya-samriddhi-calculator', category: 'Investment', emoji: '👧', keywords: 'sukanya samriddhi girl child' },
    { name: 'Emergency Fund Calculator', path: '/calculators/emergency-fund-calculator', category: 'Finance', emoji: '🆘', keywords: 'emergency fund savings' },
    { name: 'Human Life Value', path: '/calculators/human-life-value-calculator', category: 'Insurance', emoji: '👤', keywords: 'human life value hlv' },
    { name: 'Property Registration', path: '/calculators/property-registration-calculator', category: 'Property', emoji: '🏘️', keywords: 'property registration stamp duty' },
    { name: 'Rent vs Buy Calculator', path: '/calculators/rent-vs-buy-calculator', category: 'Property', emoji: '🏠', keywords: 'rent buy home property' },
    { name: 'Brokerage Calculator', path: '/calculators/brokerage-calculator', category: 'Trading', emoji: '📊', keywords: 'brokerage charges trading' },
    { name: 'Dividend Yield Calculator', path: '/calculators/dividend-yield-calculator', category: 'Investment', emoji: '💰', keywords: 'dividend yield stock' },
    { name: 'Crypto Tax Estimator', path: '/calculators/crypto-tax-estimator', category: 'Crypto', emoji: '₿', keywords: 'crypto tax bitcoin' },
    { name: 'Step-Up SIP', path: '/calculators/step-up-sip-calculator', category: 'Investment', emoji: '📈', keywords: 'step up sip increase' },
    { name: 'Inflation Adjusted SIP', path: '/calculators/inflation-adjusted-sip-calculator', category: 'Investment', emoji: '📊', keywords: 'inflation adjusted sip' },
    { name: 'Financial Goal Calculator', path: '/calculators/financial-goal-calculator', category: 'Planning', emoji: '🎯', keywords: 'financial goal planning' },
    
    // Blogs
    ...blogPosts0.slice(0, 20).map(post => ({ 
      name: post.title, 
      path: `/blog/${post.slug}`, 
      category: 'Blog', 
      emoji: '📰',
      keywords: post.categories.join(' ')
    })),
    ...blogPosts1.slice(0, 20).map(post => ({ 
      name: post.title, 
      path: `/blog/${post.slug}`, 
      category: 'Blog', 
      emoji: '📰',
      keywords: post.categories.join(' ')
    }))
  ];
  
  return calculators;
};

const HomeInvestopedia: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rotationKey, setRotationKey] = useState(0);
  const navigate = useNavigate();
  const currentDate = getCurrentDate();

  const searchDatabase = useMemo(() => buildSearchDatabase(), []);

  // Auto-refresh random content every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRotationKey(prev => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced search with fuzzy matching
  const searchResults = useMemo(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      return searchDatabase.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.keywords?.toLowerCase().includes(query) ||
        item.path.toLowerCase().includes(query)
      ).slice(0, 15);
    }
    return [];
  }, [searchQuery, searchDatabase]);

  useEffect(() => {
    setShowSearchResults(searchResults.length > 0 && searchQuery.length > 1);
  }, [searchResults, searchQuery]);

  const handleSearchItemClick = (path: string) => {
    navigate(path);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  // Helper function - Get random items from any array
  const getRandomItems = (pool: any[], count: number) => {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  // DYNAMIC Trending Items - Auto-updates with new content from entire codebase
  const allTrendingItems = useMemo(() => [
    // NEW Additions (Mark new tools here)
    { name: 'Salary Calculator', path: '/calculators/salary-calculator', emoji: '💵', tag: 'NEW', desc: 'Complete salary breakdown with CTC' },
    { name: 'Lunar Eclipse 2025', path: '/festival-tools/lunar-eclipse-predictor', emoji: '🌑', tag: 'NEW', desc: '11 eclipse dates with Sutak timings' },
    { name: 'Car Loan EMI', path: '/calculators/car-loan-emi-calculator', emoji: '🚗', tag: 'NEW', desc: 'Auto loan calculator with down payment' },
    { name: 'Property Calculator', path: '/calculators/property-calculator', emoji: '🏘️', tag: 'NEW', desc: 'Stamp duty & registration charges' },
    
    // HOT/Trending (Most popular)
    { name: 'Marriage Muhurat', path: '/festival-tools/auspicious-marriage-days', emoji: '💍', tag: 'HOT', desc: '40+ auspicious wedding dates' },
    { name: 'GST Calculator', path: '/tools/gst-amount-calculator', emoji: '💰', tag: 'HOT', desc: 'Calculate GST inclusive/exclusive' },
    { name: 'Home Loan EMI', path: '/calculators/home-loan-emi-calculator', emoji: '🏠', tag: 'HOT', desc: 'Housing loan EMI calculator' },
    { name: 'Panchang Today', path: '/festival-tools/panchang-today', emoji: '📅', tag: 'HOT', desc: 'Daily tithi & nakshatra' },
    
    // POPULAR (High traffic)
    { name: 'SIP Calculator', path: '/calculators/sip-calculator', emoji: '📈', tag: 'POPULAR', desc: 'Mutual fund SIP returns' },
    { name: 'Income Tax 2025', path: '/tools/income-tax-calculator', emoji: '📄', tag: 'POPULAR', desc: 'Old vs New regime comparison' },
    { name: 'Credit Score Guide', path: '/learn/credit-score', emoji: '📊', tag: 'POPULAR', desc: '10 lessons to boost CIBIL' },
    { name: 'PPF Calculator', path: '/calculators/ppf-calculator', emoji: '🏦', tag: 'POPULAR', desc: 'Retirement planning tool' },
    
    // Calculators
    { name: 'Personal Loan EMI', path: '/calculators/personal-loan-emi-calculator', emoji: '💵', tag: 'TRENDING', desc: 'Instant personal loan calculator' },
    { name: 'Loan Comparison', path: '/calculators/loan-comparison-calculator', emoji: '📊', tag: 'TRENDING', desc: 'Compare multiple loan offers' },
    { name: 'Prepayment Calculator', path: '/calculators/prepayment-calculator', emoji: '💰', tag: 'TRENDING', desc: 'Calculate prepayment savings' },
    
    // Learn Content
    { name: 'Gold Loans', path: '/learn/gold-loans', emoji: '🏆', tag: 'TRENDING', desc: '10 comprehensive lessons' },
    { name: 'Credit Cards', path: '/learn/credit-cards', emoji: '💳', tag: 'TRENDING', desc: '20 detailed lessons' },
    
    // Festival Tools
    { name: 'Vrat Calendar', path: '/festival-tools/vrat-upavas-calendar', emoji: '🙏', tag: 'TRENDING', desc: '50+ fasting dates' },
    { name: 'Shubh Muhurat', path: '/festival-tools/shubh-muhurat-reminder', emoji: '🔔', tag: 'TRENDING', desc: 'Auspicious timing alerts' }
  ], []);

  // Get random trending items - changes on page load
  const trendingItems = useMemo(() => 
    getRandomItems(allTrendingItems, 6), [allTrendingItems]
  );

  // Dynamic category content pools - 7+ items each!
  const categoryPools = useMemo(() => ({
    calculators: [
      { name: 'SIP Calculator', path: '/calculators/sip-calculator', emoji: '📈', desc: 'Calculate SIP returns & wealth', users: '50K+' },
      { name: 'Home Loan EMI', path: '/calculators/home-loan-emi-calculator', emoji: '🏠', desc: 'Housing loan calculator', users: '45K+' },
      { name: 'Personal Loan EMI', path: '/calculators/personal-loan-emi-calculator', emoji: '💵', desc: 'Instant personal loan EMI', users: '42K+' },
      { name: 'Car Loan EMI', path: '/calculators/car-loan-emi-calculator', emoji: '🚗', desc: 'Auto loan calculator', users: '38K+' },
      { name: 'GST Calculator', path: '/tools/gst-amount-calculator', emoji: '💰', desc: 'GST amount calculator', users: '40K+' },
      { name: 'PPF Calculator', path: '/calculators/ppf-calculator', emoji: '🏦', desc: 'Public Provident Fund', users: '35K+' },
      { name: 'Income Tax', path: '/tools/income-tax-calculator', emoji: '📄', desc: 'Tax calculator 2025', users: '38K+' },
      { name: 'EMI Calculator', path: '/calculators/emi-calculator', emoji: '🧮', desc: 'General EMI calculator', users: '42K+' },
      { name: 'FD Calculator', path: '/calculators/compound-interest-calculator', emoji: '💰', desc: 'Fixed deposit calculator', users: '30K+' },
      { name: 'Retirement Planner', path: '/calculators/retirement-calculator', emoji: '👴', desc: 'Retirement corpus planner', users: '25K+' },
      { name: 'Loan Comparison', path: '/calculators/loan-comparison-calculator', emoji: '📊', desc: 'Compare loan offers', users: '28K+' },
      { name: 'Prepayment Calculator', path: '/calculators/prepayment-calculator', emoji: '💰', desc: 'Calculate prepayment savings', users: '22K+' }
    ],
    learning: [
      { name: 'Gold Loans Mastery', path: '/learn/gold-loans', emoji: '🏆', desc: '10 comprehensive lessons', lessons: '10' },
      { name: 'Credit Card Secrets', path: '/learn/credit-cards', emoji: '💳', desc: '20 detailed lessons', lessons: '20' },
      { name: 'Credit Score Guide', path: '/learn/credit-score', emoji: '📊', desc: '10 expert lessons', lessons: '10' },
      { name: 'What is Gold Loan', path: '/learn/gold-loans/what-is-gold-loan', emoji: '🏆', desc: 'Gold loan basics explained', lessons: '1' },
      { name: 'Interest Rates Guide', path: '/learn/gold-loans/interest-rates', emoji: '💰', desc: 'Understand interest rates', lessons: '1' },
      { name: 'Balance Transfer Tips', path: '/learn/credit-cards/balance-transfer', emoji: '🔄', desc: 'Save on interest payments', lessons: '1' },
      { name: 'Improve Credit Score', path: '/learn/credit-score/improve-score', emoji: '📈', desc: 'Boost your CIBIL score', lessons: '1' },
      { name: 'Loan Eligibility', path: '/learn/gold-loans/eligibility-calculator', emoji: '✅', desc: 'Check loan eligibility', lessons: '1' },
      { name: 'Credit Card Types', path: '/learn/credit-cards/types-of-credit-cards', emoji: '💳', desc: 'All credit card types', lessons: '1' }
    ],
    festivals: [
      { name: 'Lunar Eclipse 2025', path: '/festival-tools/lunar-eclipse-predictor', emoji: '🌑', desc: '11 eclipses with sutak timings', events: '11' },
      { name: 'Marriage Muhurat', path: '/festival-tools/auspicious-marriage-days', emoji: '💍', desc: '40+ auspicious wedding dates', events: '40+' },
      { name: 'Daily Panchang', path: '/festival-tools/panchang-today', emoji: '📅', desc: 'Today\'s tithi & nakshatra', events: '365' },
      { name: 'Weekly Tithi Finder', path: '/festival-tools/weekly-tithi-finder', emoji: '📆', desc: '7-day lunar calendar view', events: '52' },
      { name: 'Purnima & Amavasya', path: '/festival-tools/purnima-amavasya-dates', emoji: '🌕', desc: 'Full & new moon dates', events: '24' },
      { name: 'Vrat Calendar', path: '/festival-tools/vrat-upavas-calendar', emoji: '🙏', desc: '50+ Hindu fasting dates', events: '50+' },
      { name: 'Nakshatra Festival', path: '/festival-tools/nakshatra-festival', emoji: '⭐', desc: 'Birth star for festivals', events: '27' },
      { name: 'Shubh Muhurat', path: '/festival-tools/shubh-muhurat-reminder', emoji: '🔔', desc: 'Auspicious timing alerts', events: '100+' },
      { name: 'Hindu Panchang Year', path: '/festival-tools/hindu-panchang-year', emoji: '📖', desc: 'Complete yearly calendar', events: '365' }
    ],
    blogs: [
      ...blogPosts0.slice(0, 10).map(post => ({ 
        name: post.title, 
        path: `/blog/${post.slug}`, 
        emoji: '📰', 
        desc: post.excerpt.slice(0, 55) + '...',
        category: post.categories[0]
      }))
    ]
  }), []);

  // COMPREHENSIVE DATA POOLS - All content from entire codebase
  const allPlatformCategories = useMemo(() => [
    { name: 'Calculators', path: '/calculators', emoji: '🧮', count: '107' },
    { name: 'Learn', path: '/learn', emoji: '📚', count: '40' },
    { name: 'Festival', path: '/festival-tools', emoji: '🎉', count: '11' },
    { name: 'GST', path: '/gst-tools', emoji: '💰', count: '20+' },
    { name: 'Tax', path: '/tax-tools', emoji: '📄', count: '15+' },
    { name: 'Loans', path: '/loan-tools', emoji: '🏠', count: '12+' },
    { name: 'Insurance', path: '/insurance-tools', emoji: '🛡️', count: '8+' },
    { name: 'Corporate', path: '/corporate-finance', emoji: '💼', count: '25+' },
    { name: 'Gold', path: '/gold-tools', emoji: '🏆', count: '10+' },
    { name: 'Finance', path: '/finance-tools', emoji: '💵', count: '30+' },
    { name: 'Personal', path: '/tools', emoji: '👤', count: '15+' },
    { name: 'Religious', path: '/religious-tools', emoji: '🙏', count: '10+' },
    { name: 'Invoicing', path: '/invoicing-tools', emoji: '📋', count: '8+' },
    { name: 'Blog', path: '/blog', emoji: '📰', count: '150+' },
    { name: 'Crypto', path: '/crypto', emoji: '₿', count: '50+' },
    { name: 'Excel Tools', path: '/excel-tools', emoji: '📊', count: '100+' },
    { name: 'Banking', path: '/banking', emoji: '🏦', count: '15+' },
    { name: 'Market', path: '/stock-market', emoji: '📈', count: '20+' },
    { name: 'Schemes', path: '/government-schemes', emoji: '🎁', count: '50+' },
    { name: 'Astro', path: '/astro-finance', emoji: '⭐', count: '12+' },
    { name: 'Retirement', path: '/calculators/retirement-calculator', emoji: '👴', count: '5+' },
    { name: 'Investment', path: '/calculators/sip-calculator', emoji: '💹', count: '20+' },
    { name: 'Property', path: '/calculators/property-calculator', emoji: '🏘️', count: '8+' },
    { name: 'Business', path: '/calculators/business-loan-calculator', emoji: '💼', count: '15+' }
  ], []);

  const allQuickCategories = useMemo(() => [
    { name: 'All Tools', path: '/tools', emoji: '🧰', count: '100+', tag: '' },
    { name: 'Investment', path: '/finance-tools', emoji: '📈', count: '15+', tag: '' },
    { name: 'GST', path: '/gst-tools', emoji: '💰', count: '20+', tag: '' },
    { name: 'Tax', path: '/tax-tools', emoji: '📄', count: '10+', tag: '' },
    { name: 'Loans', path: '/loan-tools', emoji: '🏠', count: '8+', tag: '' },
    { name: 'Festival', path: '/festival-tools', emoji: '🎉', count: '11', tag: 'Hot' },
    { name: 'Learn', path: '/learn', emoji: '🏆', count: '40', tag: 'New' },
    { name: 'Blog', path: '/blog', emoji: '📰', count: '50+', tag: '' },
    { name: 'Gold Tools', path: '/gold-tools', emoji: '🏆', count: '10+', tag: '' },
    { name: 'Insurance', path: '/insurance-tools', emoji: '🛡️', count: '8+', tag: '' },
    { name: 'Corporate', path: '/corporate-finance', emoji: '💼', count: '25+', tag: '' },
    { name: 'Invoicing', path: '/invoicing-tools', emoji: '📋', count: '8+', tag: '' },
    { name: 'Crypto', path: '/crypto', emoji: '₿', count: '50+', tag: 'Hot' },
    { name: 'Excel', path: '/excel-tools', emoji: '📊', count: '100+', tag: '' },
    { name: 'Banking', path: '/banking', emoji: '🏦', count: '15+', tag: '' },
    { name: 'Stock Market', path: '/stock-market', emoji: '📈', count: '20+', tag: '' }
  ], []);

  // COMPREHENSIVE Festival Tools Pool - Auto-grows with new additions
  const allFestivalTools = useMemo(() => [
    { name: 'Parsi New Year', path: '/festival-tools/parsi-new-year', emoji: '🎊', category: 'Festival', tag: '' },
    { name: 'Panchang Today', path: '/festival-tools/panchang-today', emoji: '📅', category: 'Festival', tag: 'Popular' },
    { name: 'Hindu Panchang Year', path: '/festival-tools/hindu-panchang-year', emoji: '📖', category: 'Festival', tag: '' },
    { name: 'Weekly Tithi Finder', path: '/festival-tools/weekly-tithi-finder', emoji: '📆', category: 'Festival', tag: '' },
    { name: 'Moon Phase Festivals', path: '/festival-tools/moon-phase-festivals', emoji: '🌙', category: 'Festival', tag: '' },
    { name: 'Purnima Amavasya', path: '/festival-tools/purnima-amavasya-dates', emoji: '🌕', category: 'Festival', tag: 'Trending' },
    { name: 'Vrat Upavas Calendar', path: '/festival-tools/vrat-upavas-calendar', emoji: '🙏', category: 'Festival', tag: 'Popular' },
    { name: 'Nakshatra Festival', path: '/festival-tools/nakshatra-festival', emoji: '⭐', category: 'Festival', tag: '' },
    { name: 'Shubh Muhurat', path: '/festival-tools/shubh-muhurat-reminder', emoji: '🔔', category: 'Festival', tag: 'Hot' },
    { name: 'Marriage Muhurat', path: '/festival-tools/auspicious-marriage-days', emoji: '💍', category: 'Festival', tag: 'Hot' },
    { name: 'Lunar Eclipse 2025', path: '/festival-tools/lunar-eclipse-predictor', emoji: '🌑', category: 'Festival', tag: 'New' },
    { name: 'Diwali Date Finder', path: '/festival-tools/diwali-date-finder', emoji: '🪔', category: 'Festival', tag: '' },
    { name: 'Holi Date Calculator', path: '/festival-tools/holi-date-calculator', emoji: '🎨', category: 'Festival', tag: '' },
    { name: 'Raksha Bandhan', path: '/festival-tools/raksha-bandhan-muhurat', emoji: '🎀', category: 'Festival', tag: '' },
    { name: 'Navratri Dates', path: '/festival-tools/navratri-dates-finder', emoji: '🪔', category: 'Festival', tag: '' },
    { name: 'Ganesh Chaturthi', path: '/festival-tools/ganesh-chaturthi-countdown', emoji: '🐘', category: 'Festival', tag: '' },
    { name: 'Janmashtami Fasting', path: '/festival-tools/janmashtami-fasting', emoji: '🦚', category: 'Festival', tag: '' },
    { name: 'Dussehra Dates', path: '/festival-tools/dussehra-dates', emoji: '🏹', category: 'Festival', tag: '' },
    { name: 'Chhath Puja', path: '/festival-tools/chhat-puja-arghya', emoji: '☀️', category: 'Festival', tag: '' },
    { name: 'Maha Shivratri', path: '/festival-tools/maha-shivratri-duration', emoji: '🔱', category: 'Festival', tag: '' },
    { name: 'Guru Purnima', path: '/festival-tools/guru-purnima-calendar', emoji: '🙏', category: 'Festival', tag: '' },
    { name: 'Buddha Purnima', path: '/festival-tools/buddha-purnima-converter', emoji: '☸️', category: 'Festival', tag: '' },
    { name: 'Eid Date Converter', path: '/festival-tools/eid-date-converter', emoji: '🌙', category: 'Festival', tag: '' },
    { name: 'Ramadan Timetable', path: '/festival-tools/ramadan-timetable', emoji: '🕌', category: 'Festival', tag: '' },
    { name: 'Christmas Countdown', path: '/festival-tools/christmas-countdown', emoji: '🎄', category: 'Festival', tag: '' },
    { name: 'Pongal Calendar', path: '/festival-tools/pongal-calendar', emoji: '🌾', category: 'Festival', tag: '' },
    { name: 'Onam Date Reminder', path: '/festival-tools/onam-date-reminder', emoji: '🌺', category: 'Festival', tag: '' },
    { name: 'Lohri Sunrise', path: '/festival-tools/lohri-sunrise-sunset', emoji: '🔥', category: 'Festival', tag: '' },
    { name: 'Bihu Date Calendar', path: '/festival-tools/bihu-date-calendar', emoji: '🎶', category: 'Festival', tag: '' }
  ], []);

  // Dynamic content that changes based on rotationKey
  const dynamicPlatformCategories = useMemo(() => 
    getRandomItems(allPlatformCategories, 20), [allPlatformCategories, rotationKey]
  );

  const dynamicQuickCategories = useMemo(() => 
    getRandomItems(allQuickCategories, 8), [allQuickCategories, rotationKey]
  );

  // Dynamic Festival Tools - Shows random selection each time
  const dynamicFestivalTools = useMemo(() => 
    getRandomItems(allFestivalTools, 12), [allFestivalTools] // Show random 12 from 29 tools
  );

  // Dynamic Popular Search Tags - Changes on every page load
  const allPopularTags = useMemo(() => [
    { emoji: '💰', label: 'GST', path: '/gst-tools', searchTerm: 'GST' },
    { emoji: '📈', label: 'SIP', path: '/calculators/sip-calculator', searchTerm: 'SIP' },
    { emoji: '🏠', label: 'EMI', path: '/calculators/emi-calculator', searchTerm: 'EMI' },
    { emoji: '🌑', label: 'Eclipse', path: '/festival-tools/lunar-eclipse-predictor', searchTerm: 'Eclipse' },
    { emoji: '💍', label: 'Marriage', path: '/festival-tools/auspicious-marriage-days', searchTerm: 'Marriage' },
    { emoji: '📊', label: 'Tax', path: '/tax-tools', searchTerm: 'Tax' },
    { emoji: '🏆', label: 'Learn', path: '/learn', searchTerm: 'Learn' },
    { emoji: '💵', label: 'Salary', path: '/calculators/salary-calculator', searchTerm: 'Salary' },
    { emoji: '🏦', label: 'PPF', path: '/calculators/ppf-calculator', searchTerm: 'PPF' },
    { emoji: '📄', label: 'Income Tax', path: '/tools/income-tax-calculator', searchTerm: 'Income Tax' },
    { emoji: '💳', label: 'Credit Card', path: '/learn/credit-cards', searchTerm: 'Credit Card' },
    { emoji: '🏡', label: 'Home Loan', path: '/calculators/home-loan-emi-calculator', searchTerm: 'Home Loan' },
    { emoji: '🚗', label: 'Car Loan', path: '/calculators/car-loan-emi-calculator', searchTerm: 'Car Loan' },
    { emoji: '🎉', label: 'Festival', path: '/festival-tools', searchTerm: 'Festival' },
    { emoji: '📅', label: 'Panchang', path: '/festival-tools/panchang-today', searchTerm: 'Panchang' },
    { emoji: '👴', label: 'Retirement', path: '/calculators/retirement-calculator', searchTerm: 'Retirement' },
    { emoji: '💼', label: 'Business', path: '/calculators/business-loan-calculator', searchTerm: 'Business' },
    { emoji: '🏆', label: 'Gold', path: '/gold-tools', searchTerm: 'Gold' },
    { emoji: '₿', label: 'Crypto', path: '/crypto', searchTerm: 'Crypto' },
    { emoji: '📊', label: 'Excel', path: '/excel-tools', searchTerm: 'Excel' }
  ], []);

  const dynamicPopularTags = useMemo(() => 
    getRandomItems(allPopularTags, 7), [allPopularTags] // Shuffle on every page load
  );

  // All Festival Categories - Comprehensive pool
  const allFestivalCategories = useMemo(() => [
    { name: 'Date & Calendar', path: '/festival-dates', emoji: '📅' },
    { name: 'Planning & Shopping', path: '/festival-shopping', emoji: '🛍️' },
    { name: 'Finance & Money', path: '/festival-finance', emoji: '💰' },
    { name: 'Religious', path: '/religious-tools', emoji: '🙏' },
    { name: 'Fun & Games', path: '/fun-engagement', emoji: '🎮' },
    { name: 'Design', path: '/design-tools', emoji: '🎨' },
    { name: 'Information', path: '/festival-info', emoji: '📖' },
    { name: 'Corporate', path: '/festival-corporate-tools', emoji: '💼' },
    { name: 'Regional', path: '/regional-tools', emoji: '🗺️' },
    { name: 'SEO', path: '/seo-tools', emoji: '📊' }
  ], []);

  const dynamicFestivalCategories = useMemo(() => 
    allFestivalCategories.sort(() => Math.random() - 0.5), [allFestivalCategories] // Shuffle on load
  );

  const dynamicContent = useMemo(() => ({
    calculators: getRandomItems(categoryPools.calculators, 7),
    learning: getRandomItems(categoryPools.learning, 7),
    festivals: getRandomItems(categoryPools.festivals, 7),
    blogs: getRandomItems(categoryPools.blogs, 7)
  }), [categoryPools, rotationKey]);

  const mainSections = [
    { name: language === 'en' ? 'All Tools' : 'सभी', path: '/tools', emoji: '🧰' },
    { name: language === 'en' ? 'Calculators' : 'कैलकुलेटर', path: '/calculators', emoji: '🧮' },
    { name: language === 'en' ? 'Finance' : 'वित्त', path: '/finance-tools', emoji: '💵' },
    { name: language === 'en' ? 'Tax' : 'कर', path: '/tax-tools', emoji: '📄' },
    { name: 'GST', path: '/gst-tools', emoji: '💰' },
    { name: language === 'en' ? 'Corporate' : 'कॉर्पोरेट', path: '/corporate-finance', emoji: '💼' },
    { name: language === 'en' ? 'Insurance' : 'बीमा', path: '/insurance-tools', emoji: '🛡️' },
    { name: language === 'en' ? 'Festival' : 'त्योहार', path: '/festival-tools', emoji: '🎉' },
    { name: language === 'en' ? 'Blog' : 'ब्लॉग', path: '/blog', emoji: '📰' },
    { name: language === 'en' ? 'Education' : 'शिक्षा', path: '/learn', emoji: '🎓' },
    { name: language === 'en' ? 'Help' : 'सहायता', path: '/help-center', emoji: '❓' },
    { name: language === 'en' ? 'Schemes' : 'योजना', path: '/government-schemes', emoji: '🎁' },
    { name: language === 'en' ? 'Astro' : 'ज्योतिष', path: '/astro-finance', emoji: '⭐' }
  ];

  return (
    <>
      <SEOHelmet
        title="MoneyCal India - 100+ Free Financial Calculators & Tools | #1 Platform"
        description="India's most comprehensive financial platform. 100+ free calculators, 40 lessons, 11 festival tools. GST, Tax, SIP, EMI, Eclipse dates. Mobile-friendly."
        keywords="financial calculators India, GST calculator, SIP calculator, EMI calculator, eclipse 2025, marriage muhurat, income tax"
        canonicalUrl="https://moneycal.in"
      />

      <div className={`min-h-screen transition-colors duration-500 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950' 
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}>
        {/* Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute w-96 h-96 rounded-full blur-3xl ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-400/20'}`} style={{ top: '10%', left: '10%' }}></div>
          <div className={`absolute w-96 h-96 rounded-full blur-3xl ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-400/20'}`} style={{ top: '50%', right: '10%' }}></div>
        </div>

        {/* Top Navigation - Floating Style */}
        <nav className={`relative z-50 ${
          theme === 'dark' ? 'bg-slate-900/98' : 'bg-white/98'
        } backdrop-blur-xl sticky top-0 shadow-2xl border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all shadow-xl">
                  <span className="text-white font-black text-2xl">💰</span>
                </div>
                <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  MoneyCal.in
                </span>
              </Link>

              {/* Floating Nav Pills - Desktop */}
              <div className="hidden lg:flex items-center gap-1.5 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl px-2 py-2 rounded-2xl border border-white/10 shadow-2xl">
                {mainSections.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-xs transition-all hover:scale-105 ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:bg-slate-700/70'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{item.emoji}</span>
                    <span className="hidden xl:inline">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2.5">
                {/* Mobile Menu */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-3 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl active:scale-90 transition-all"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Theme */}
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`p-3 rounded-xl transition-all active:scale-90 shadow-xl ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white' 
                      : 'bg-gradient-to-br from-slate-700 to-blue-900 text-white'
                  }`}
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Language */}
                <button
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                  className="px-4 py-3 rounded-xl text-sm font-bold active:scale-90 shadow-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white transition-all"
                >
                  <Globe className="w-4 h-4 inline mr-1" />
                  {language === 'en' ? 'हिंदी' : 'EN'}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`lg:hidden border-t ${theme === 'dark' ? 'border-white/10 bg-slate-800/98' : 'border-gray-200 bg-white/98'}`}
              >
                <div className="px-4 py-4 grid grid-cols-2 gap-2.5">
                  {mainSections.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm active:scale-95 transition-all ${
                        theme === 'dark'
                          ? 'bg-slate-700/60 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero + Search */}
        <section className="relative py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center">
              {/* Title */}
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                {language === 'en' ? 'Money Made Easy 💰' : 'पैसा आसान 💰'}
              </h1>

              <p className={`text-2xl md:text-3xl mb-12 font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {language === 'en' ? '🚀 100+ Tools • 40 Lessons • 11 Festival Tools' : '🚀 100+ टूल्स • 40 पाठ'}
              </p>

              {/* Global Search */}
              <div className="max-w-4xl mx-auto mb-12 relative">
                <div className="relative">
                  <Search className={`absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'en' ? '🔍 Search... GST, SIP, EMI, Eclipse, Marriage' : '🔍 खोजें...'}
                    className={`w-full pl-16 pr-16 py-6 text-xl rounded-3xl border-2 focus:ring-4 outline-none font-semibold shadow-2xl transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-800/90 border-white/20 focus:ring-blue-500/50 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 focus:ring-blue-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => { setSearchQuery(''); setShowSearchResults(false); }}
                      className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-200/30 active:scale-90 transition-all"
                    >
                      <X className="w-6 h-6" />
                      </button>
                  )}
                    </div>

                {/* Popular Tags - Dynamic & Triggers Search */}
                {!searchQuery && (
                  <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                    <span className={`text-sm font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Flame className="w-5 h-5 inline mr-1 text-orange-500 animate-pulse" /> Popular:
                    </span>
                    {dynamicPopularTags.map((tag, i) => (
                      <button
                        key={i}
                        onClick={() => setSearchQuery(tag.searchTerm)}
                        className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                      >
                        <span className="text-lg">{tag.emoji}</span>
                        <span>{tag.label}</span>
                      </button>
                    ))}
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} italic`}>
                      • Click to search • Refresh for new suggestions
                    </span>
                  </div>
                )}

                {/* Search Results - Clear & Clickable */}
                    <AnimatePresence>
                  {showSearchResults && (
                        <motion.div
                      initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute top-full left-0 right-0 mt-4 rounded-3xl shadow-2xl border-2 max-h-[70vh] overflow-y-auto z-50 ${
                        theme === 'dark'
                          ? 'bg-slate-900/98 border-white/20 backdrop-blur-2xl'
                          : 'bg-white/98 border-gray-300 backdrop-blur-2xl'
                      }`}
                    >
                      <div className="p-5">
                        <div className={`px-4 py-3 font-bold mb-3 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          ✨ {searchResults.length} {language === 'en' ? 'Results - Click to open' : 'परिणाम - क्लिक करें'}
                        </div>
                                <div className="space-y-2">
                          {searchResults.map((result, idx) => (
                            <motion.button
                                      key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03 }}
                              onClick={() => handleSearchItemClick(result.path)}
                              className={`w-full flex items-center gap-4 px-5 py-5 text-left rounded-2xl border-2 transition-all active:scale-[0.98] ${
                                theme === 'dark'
                                  ? 'bg-slate-800/80 border-white/10 hover:border-blue-500/70 hover:bg-slate-700/80'
                                  : 'bg-white border-gray-200 hover:border-blue-500 hover:shadow-lg'
                              }`}
                            >
                              <div className="text-4xl flex-shrink-0">{result.emoji}</div>
                              <div className="flex-1 min-w-0">
                                <div className={`font-bold text-lg mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                  {result.name}
                                      </div>
                                <div className="flex items-center gap-2.5">
                                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-bold">
                                    {result.category}
                                  </span>
                                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                                    {result.path}
                                  </span>
                                </div>
                            </div>
                              <ChevronRight className={`w-7 h-7 flex-shrink-0 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                            </motion.button>
                                ))}
                              </div>
                            </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link
                  to="/tools"
                  className="px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 active:scale-95 transition-all"
                >
                  <Calculator className="w-6 h-6 inline mr-2" />
                  {language === 'en' ? 'Explore Tools' : 'टूल्स देखें'}
                </Link>
                <Link
                  to="/learn"
                  className={`px-10 py-5 border-2 rounded-2xl font-bold text-lg shadow-2xl active:scale-95 transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-800/70 border-white/30 text-white'
                      : 'bg-white border-gray-400 text-gray-900'
                  }`}
                >
                  <Rocket className="w-6 h-6 inline mr-2" />
                  {language === 'en' ? 'Start Learning' : 'सीखें'}
                </Link>
                            </div>

              {/* Complete Platform Stats Grid */}
              <div className={`max-w-6xl mx-auto p-8 rounded-3xl border-2 mb-12 ${
                theme === 'dark' ? 'bg-slate-800/40 border-white/10' : 'bg-white/90 border-gray-200 shadow-2xl'
              }`}>
                <div className="text-center mb-8">
                  <h3 className={`text-3xl font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    📁 {language === 'en' ? 'Complete Platform' : 'संपूर्ण मंच'}
                              </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Sparkles className="w-4 h-4 inline mr-1 text-yellow-500 animate-pulse" />
                    {language === 'en' ? 'Content refreshes every 10 seconds' : 'हर 10 सेकंड में नया कंटेंट'}
                              </p>
                            </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {dynamicPlatformCategories.map((item, idx) => (
                    <Link
                  key={idx}
                      to={item.path}
                      className={`p-4 rounded-xl text-center transition-all hover:scale-105 active:scale-95 ${
                        theme === 'dark'
                          ? 'bg-slate-800/60 border border-white/10 hover:border-blue-500/50'
                          : 'bg-white border-2 border-gray-200 hover:border-blue-500 shadow-lg'
                      }`}
                    >
                      <div className="text-4xl mb-2">{item.emoji}</div>
                      <div className={`text-xs font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.name}</div>
                      <div className={`text-[10px] px-2 py-0.5 rounded-full inline-block font-semibold ${theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                        {item.count}
                    </div>
                  </Link>
              ))}
              </div>

                {/* Festival Tool Categories */}
                <div className={`mt-8 p-6 rounded-2xl ${
                  theme === 'dark' ? 'bg-orange-900/20 border-2 border-orange-500/30' : 'bg-orange-50 border-2 border-orange-300'
                }`}>
                  <h4 className={`text-2xl font-black text-center mb-6 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-700'}`}>
                    🎊 {language === 'en' ? 'Festival Tool Categories' : 'त्योहार श्रेणियां'}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {dynamicFestivalCategories.map((cat, i) => (
                <Link
                        key={i}
                        to={cat.path}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 ${
                          theme === 'dark' ? 'bg-slate-700/50 text-orange-300 hover:bg-slate-600/60' : 'bg-white text-orange-700 border-2 border-orange-200 hover:border-orange-400 shadow-md'
                        }`}
                      >
                        <span className="text-2xl">{cat.emoji}</span>
                        <span>{cat.name}</span>
                </Link>
              ))}
              </div>
          </div>
                  </div>
            </div>
          </div>
        </section>

        {/* Categories Quick Links */}
        <section className={`py-12 ${theme === 'dark' ? 'bg-slate-900/70' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                📂 {language === 'en' ? 'Categories' : 'श्रेणियां'}
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <Clock className="w-4 h-4 inline mr-1 text-blue-500 animate-spin" style={{ animationDuration: '10s' }} />
                {language === 'en' ? 'Refreshes every 10 seconds • Random selection' : 'हर 10 सेकंड में बदलता है'}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
              {dynamicQuickCategories.map((cat, idx) => (
                <Link
                  key={idx}
                  to={cat.path}
                  className={`relative p-4 rounded-xl text-center transition-all hover:scale-105 active:scale-95 ${
                    theme === 'dark'
                      ? 'bg-slate-800/60 border border-white/10 hover:border-blue-500/50'
                      : 'bg-white border-2 border-gray-200 hover:border-blue-500 shadow-md'
                  }`}
                >
                  {cat.tag && (
                    <div className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-black ${
                      cat.tag === 'Hot' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}>
                      {cat.tag}
                    </div>
                  )}
                  <div className="text-3xl mb-2">{cat.emoji}</div>
                  <div className={`text-xs font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {cat.name}
                  </div>
                  <div className={`text-[10px] px-2 py-0.5 rounded-full inline-block font-semibold ${
                    theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {cat.count}
                  </div>
                  </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Festival Tools */}
        <section className={`py-16 ${theme === 'dark' ? 'bg-gradient-to-br from-orange-950/30 to-red-950/30' : 'bg-gradient-to-br from-orange-50 to-red-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-black mb-3 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-700'}`}>
                🎊 {language === 'en' ? 'Festival Tools' : 'त्योहार के औजार'}
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-orange-300' : 'text-orange-600'}`}>
                {language === 'en' ? 'Complete festival planning and cultural tools' : 'संपूर्ण त्योहार योजना'}
              </p>
                    </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {dynamicFestivalTools.map((tool, idx) => (
                    <Link
                  key={idx}
                  to={tool.path}
                  className={`relative p-5 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                    theme === 'dark'
                      ? 'bg-slate-800/70 border border-orange-500/30 hover:border-orange-400'
                      : 'bg-white border-2 border-orange-200 hover:border-orange-400 shadow-lg'
                  }`}
                >
                  {tool.tag && (
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                        tool.tag === 'New' ? 'bg-green-500 text-white' :
                        tool.tag === 'Hot' ? 'bg-red-500 text-white' :
                        tool.tag === 'Popular' ? 'bg-blue-500 text-white' :
                        tool.tag === 'Trending' ? 'bg-purple-500 text-white' :
                        'bg-orange-500 text-white'
                      }`}>
                        {tool.tag}
                      </span>
                  </div>
                  )}
                  <div className="text-5xl mb-3">{tool.emoji}</div>
                  <h3 className={`text-sm font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {tool.name}
                  </h3>
                  <span className={`text-[10px] px-2 py-1 rounded-full inline-block font-semibold ${
                    theme === 'dark' ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {tool.category}
                  </span>
                </Link>
              ))}
            </div>
            
            {/* Refresh Note */}
            <div className="text-center mt-8">
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <Sparkles className="w-4 h-4 inline mr-1 text-orange-500 animate-pulse" />
                {language === 'en' ? 'Showing 12 random tools • Refresh to see more' : '12 यादृच्छिक उपकरण • अधिक देखने के लिए रीफ्रेश करें'}
              </p>
            </div>
          </div>
        </section>

        {/* Trending & New */}
        <section className={`py-16 border-y ${theme === 'dark' ? 'border-white/10 bg-slate-900/50' : 'border-gray-200 bg-white/50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className={`text-4xl font-black text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              🔥 {language === 'en' ? 'Trending & New' : 'ट्रेंडिंग और नया'}
              </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingItems.map((item, idx) => (
                    <Link
                  key={idx}
                  to={item.path}
                  className={`relative p-6 rounded-2xl transition-all hover:scale-105 active:scale-95 ${
                    theme === 'dark'
                      ? 'bg-slate-800/70 border-2 border-white/10 hover:border-purple-500/50'
                      : 'bg-white border-2 border-gray-200 hover:border-purple-500 shadow-lg hover:shadow-2xl'
                  }`}
                >
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-black ${
                      item.tag === 'NEW' ? 'bg-green-500 text-white' :
                      item.tag === 'HOT' ? 'bg-red-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {item.tag}
                      </span>
                    </div>
                  <div className="text-6xl mb-4">{item.emoji}</div>
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {item.name}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.desc}
                  </p>
                  <ArrowRight className={`w-6 h-6 mt-3 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Rotating Categories - Refreshes Every 10 Seconds */}
        <section className={`py-16 ${theme === 'dark' ? 'bg-slate-950/50' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-black mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                ✨ {language === 'en' ? 'Discover More' : 'और खोजें'}
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'en' ? 'Content refreshes every 10 seconds • Explore our platform' : 'हर 10 सेकंड में नया कंटेंट'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category 1: Calculators */}
                <motion.div
                key={`calc-${rotationKey}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl p-6 border-2 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30'
                    : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300'
                }`}>
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                    🧮 {language === 'en' ? 'Top Calculators' : 'टॉप कैलकुलेटर'}
                  </h3>
                      </div>
                <div className="space-y-3">
                  {dynamicContent.calculators.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      className={`block p-4 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                        theme === 'dark'
                          ? 'bg-slate-800/60 hover:bg-slate-700/60'
                          : 'bg-white hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-bold text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {item.name}
                          </h4>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.desc}
                          </p>
                          <span className={`text-xs font-semibold mt-1 inline-block ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                            👥 {item.users} users
                      </span>
                      </div>
                    </div>
                  </Link>
              ))}
            </div>
            </motion.div>

              {/* Category 2: Learning */}
                <motion.div
                key={`learn-${rotationKey}`}
                  initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`rounded-2xl p-6 border-2 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30'
                    : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300'
                }`}>
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className={`w-8 h-8 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                    📚 {language === 'en' ? 'Learn Finance' : 'वित्त सीखें'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {dynamicContent.learning.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      className={`block p-4 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                        theme === 'dark'
                          ? 'bg-slate-800/60 hover:bg-slate-700/60'
                          : 'bg-white hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-bold text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {item.name}
                          </h4>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.desc}
                          </p>
                          <span className={`text-xs font-semibold mt-1 inline-block ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                            📖 {item.lessons} lessons
                </span>
                  </div>
                    </div>
                  </Link>
              ))}
            </div>
            </motion.div>

              {/* Category 3: Festival Tools */}
                <motion.div
                key={`festival-${rotationKey}`}
                  initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`rounded-2xl p-6 border-2 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/30'
                    : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-300'
                }`}>
                <div className="flex items-center gap-3 mb-4">
                  <PartyPopper className={`w-8 h-8 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`} />
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>
                    🎉 {language === 'en' ? 'Festival Tools' : 'त्योहार टूल्स'}
                  </h3>
            </div>
                <div className="space-y-3">
                  {dynamicContent.festivals.map((item, idx) => (
              <Link
                      key={idx}
                      to={item.path}
                      className={`block p-4 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                        theme === 'dark'
                          ? 'bg-slate-800/60 hover:bg-slate-700/60'
                          : 'bg-white hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-bold text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {item.name}
                          </h4>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.desc}
                          </p>
                          <span className={`text-xs font-semibold mt-1 inline-block ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                            🎊 {item.events} events
                  </span>
                </div>
                      </div>
                </Link>
              ))}
            </div>
            </motion.div>

              {/* Category 4: Latest Blogs */}
                <motion.div
                key={`blog-${rotationKey}`}
                  initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`rounded-2xl p-6 border-2 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30'
                    : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                }`}>
                <div className="flex items-center gap-3 mb-4">
                  <Newspaper className={`w-8 h-8 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                    📰 {language === 'en' ? 'Latest Articles' : 'नवीनतम लेख'}
                  </h3>
            </div>
                <div className="space-y-3">
                  {dynamicContent.blogs.map((item, idx) => (
              <Link
                      key={idx}
                      to={item.path}
                      className={`block p-4 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                        theme === 'dark'
                          ? 'bg-slate-800/60 hover:bg-slate-700/60'
                          : 'bg-white hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-bold text-sm mb-1 line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {item.name}
                          </h4>
                          <p className={`text-xs line-clamp-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.desc}
                          </p>
                          <span className={`text-xs font-semibold mt-1 inline-block ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                            📂 {item.category}
                          </span>
                        </div>
                      </div>
                </Link>
                  ))}
                          </div>
              </motion.div>
                        </div>
                        
            {/* Refresh Indicator */}
            <div className="text-center mt-8">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                theme === 'dark' ? 'bg-slate-800/60 text-gray-400' : 'bg-white text-gray-600 shadow-md'
              }`}>
                <Sparkles className="w-4 h-4 animate-pulse text-yellow-500" />
                <span className="text-sm font-semibold">
                  {language === 'en' ? 'Content refreshes every 10 seconds' : 'हर 10 सेकंड में नया कंटेंट'}
                          </span>
                        </div>
                      </div>
                    </div>
        </section>

        {/* Trust */}
        <section className={`py-16 ${theme === 'dark' ? 'bg-slate-900/30' : 'bg-gray-50/50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className={`text-4xl font-black text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              🏆 {language === 'en' ? 'Why Trust MoneyCal' : 'क्यों भरोसा करें'}
                </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: CheckCircle, title: 'RBI Compliant', color: 'from-green-500 to-emerald-500' },
                { icon: Shield, title: 'Secure', color: 'from-blue-500 to-cyan-500' },
                { icon: Award, title: 'Expert Verified', color: 'from-purple-500 to-pink-500' },
                { icon: Star, title: '4.9/5 Rating', color: 'from-yellow-500 to-orange-500' }
              ].map((t, i) => (
                <div key={i} className={`p-6 rounded-2xl text-center ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white shadow-lg'}`}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${t.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <t.icon className="w-8 h-8 text-white" />
                        </div>
                  <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.title}</h3>
                      </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              🚀 {language === 'en' ? 'Ready?' : 'तैयार हैं?'}
              </h2>
            <p className="text-2xl text-white/90 mb-8">
              {language === 'en' ? 'Join India\'s #1 Platform' : 'भारत का #1'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tools" className="px-10 py-5 bg-white text-purple-600 rounded-2xl font-black text-xl shadow-2xl active:scale-95">
                {language === 'en' ? 'Start FREE' : 'शुरू करें'}
                </Link>
              <Link to="/learn" className="px-10 py-5 border-2 border-white text-white rounded-2xl font-black text-xl active:scale-95">
                {language === 'en' ? '40 Lessons' : '40 पाठ'}
                </Link>
              </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-6 border-t ${theme === 'dark' ? 'bg-slate-950 border-white/10' : 'bg-gray-100 border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              © {currentDate.year} MoneyCal India. Made with 💙 for India
            </p>
            </div>
        </footer>
      </div>
    </>
  );
};

export default HomeInvestopedia;
