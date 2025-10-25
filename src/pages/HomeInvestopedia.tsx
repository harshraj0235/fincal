import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, TrendingUp, Calculator, Newspaper, Globe,
  Star, Shield, Award, ChevronRight, Sun, Moon, X, Menu,
  Clock, Sparkles, Heart, CheckCircle, DollarSign, Home,
  FileText, Target, Gift, Building, PartyPopper,
  Rocket, Bell, Calendar, Tag, Box, Briefcase,
  CreditCard, Landmark, Wallet, Receipt,
  LineChart, BarChart, Activity,
  Users, UserCheck, Building2, Car, Palmtree,
  GraduationCap, Trophy, Gem, RefreshCw, Grid,
  BookOpen, ArrowRight, Flame, Zap
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { blogPosts as blogPosts0 } from '../data/blogData';
import { blogPosts as blogPosts1 } from '../data/blogData1';

/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║       🌟 MONEYCAL.IN - WORLD-CLASS HOME PAGE REDESIGN 🌟         ║
 * ║                                                                   ║
 * ║  ✨ Next-Generation Financial Platform Interface                 ║
 * ║  🔍 Ultra-Powerful Global Search Engine                          ║
 * ║  🎨 Modern, Elegant & Intuitive Design                           ║
 * ║  🚀 Lightning-Fast Performance                                   ║
 * ║  📱 Fully Responsive & Mobile-Optimized                          ║
 * ║                                                                   ║
 * ║  Inspired by: Mint, YNAB, NerdWallet, Investopedia              ║
 * ║  Built with: React, TypeScript, Tailwind CSS, Framer Motion     ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

// ═══════════════════════════════════════════════════════════════
// 🎯 COMPREHENSIVE SEARCH DATABASE
// ═══════════════════════════════════════════════════════════════

interface SearchItem {
  id: string;
  name: string;
  nameHindi?: string;
  path: string;
  category: string;
  subcategory?: string;
  emoji: string;
  icon?: any;
  keywords: string;
  description: string;
  tags?: string[];
  priority?: number;
  isNew?: boolean;
  isTrending?: boolean;
  usageCount?: string;
}

const buildComprehensiveSearchDatabase = (): SearchItem[] => {
  const database: SearchItem[] = [
    // ═══ CALCULATORS - INVESTMENT (20+) ═══
    { id: 'sip-calc', name: 'SIP Calculator', path: '/calculators/sip-calculator', category: 'Investment', subcategory: 'Mutual Funds', emoji: '📈', icon: TrendingUp, keywords: 'sip systematic investment plan mutual fund monthly investing', description: 'Calculate SIP returns and wealth creation', tags: ['Popular', 'Investment'], priority: 10, isTrending: true, usageCount: '150K+' },
    { id: 'ppf-calc', name: 'PPF Calculator', path: '/calculators/ppf-calculator', category: 'Investment', subcategory: 'Savings', emoji: '🏦', icon: Landmark, keywords: 'ppf public provident fund retirement tax saving', description: 'Calculate PPF maturity amount', tags: ['Tax Saving'], priority: 9, usageCount: '120K+' },
    { id: 'fd-calc', name: 'Fixed Deposit Calculator', path: '/calculators/compound-interest-calculator', category: 'Investment', subcategory: 'Banking', emoji: '💰', icon: DollarSign, keywords: 'fd fixed deposit bank interest compound', description: 'Calculate FD returns with compounding', tags: ['Banking'], priority: 9, usageCount: '130K+' },
    { id: 'cagr-calc', name: 'CAGR Calculator', path: '/calculators/cagr-calculator', category: 'Investment', emoji: '📊', icon: LineChart, keywords: 'cagr compound annual growth rate returns investment', description: 'Calculate annualized returns', priority: 8, usageCount: '80K+' },
    { id: 'lumpsum-calc', name: 'Lumpsum Calculator', path: '/calculators/lumpsum-calculator', category: 'Investment', emoji: '💵', icon: Wallet, keywords: 'lumpsum one time investment mutual fund', description: 'Calculate one-time investment returns', priority: 8, usageCount: '90K+' },
    { id: 'swp-calc', name: 'SWP Calculator', path: '/calculators/swp-calculator', category: 'Investment', emoji: '👛', icon: Wallet, keywords: 'swp systematic withdrawal plan pension retirement', description: 'Plan systematic withdrawals', priority: 7, usageCount: '50K+' },
    { id: 'mf-returns', name: 'Mutual Fund Returns Calculator', path: '/calculators/mutual-fund-returns-calculator', category: 'Investment', emoji: '📊', icon: BarChart, keywords: 'mutual fund returns calculator investment', description: 'Calculate mutual fund returns', priority: 8, usageCount: '75K+' },
    { id: 'asset-allocation', name: 'Asset Allocation Planner', path: '/calculators/asset-allocation-planner', category: 'Investment', emoji: '🎯', icon: Target, keywords: 'asset allocation portfolio diversification risk', description: 'Plan your investment portfolio', tags: ['Advanced'], priority: 7, usageCount: '45K+' },
    { id: 'xirr-tracker', name: 'XIRR Tracker', path: '/calculators/xirr-tracker', category: 'Investment', emoji: '📈', icon: Activity, keywords: 'xirr irr returns tracking irregular investment', description: 'Track irregular investment returns', tags: ['Advanced'], priority: 7, usageCount: '35K+' },
    { id: 'gold-investment', name: 'Gold Investment Calculator', path: '/calculators/gold-investment-calculator', category: 'Investment', subcategory: 'Gold', emoji: '🏆', icon: Trophy, keywords: 'gold investment digital sovereign bond', description: 'Calculate gold investment returns', priority: 7, usageCount: '60K+' },
    { id: 'step-up-sip', name: 'Step-Up SIP Calculator', path: '/calculators/step-up-sip-calculator', category: 'Investment', emoji: '📈', icon: TrendingUp, keywords: 'step up sip incremental increase annual', description: 'SIP with annual increment', tags: ['Advanced'], priority: 7, usageCount: '40K+' },
    { id: 'sukanya-samriddhi', name: 'Sukanya Samriddhi Calculator', path: '/calculators/sukanya-samriddhi-calculator', category: 'Investment', emoji: '👧', icon: Heart, keywords: 'sukanya samriddhi yojana girl child scheme', description: 'Girl child savings scheme', tags: ['Government'], priority: 8, usageCount: '55K+' },
    { id: 'dividend-yield', name: 'Dividend Yield Calculator', path: '/calculators/dividend-yield-calculator', category: 'Investment', emoji: '💰', icon: DollarSign, keywords: 'dividend yield stock return income', description: 'Calculate dividend returns', priority: 6, usageCount: '30K+' },
    { id: 'inflation-adjusted-sip', name: 'Inflation Adjusted SIP', path: '/calculators/inflation-adjusted-sip-calculator', category: 'Investment', emoji: '📊', icon: TrendingUp, keywords: 'inflation adjusted sip real returns', description: 'SIP with inflation adjustment', tags: ['Advanced'], priority: 6, usageCount: '25K+' },
    
    // ═══ CALCULATORS - LOANS (15+) ═══
    { id: 'emi-calc', name: 'EMI Calculator', path: '/calculators/emi-calculator', category: 'Loan', emoji: '🧮', icon: Calculator, keywords: 'emi equated monthly installment loan calculator', description: 'Calculate loan EMI', tags: ['Popular'], priority: 10, isTrending: true, usageCount: '200K+' },
    { id: 'home-loan', name: 'Home Loan EMI Calculator', path: '/calculators/home-loan-calculator', category: 'Loan', subcategory: 'Property', emoji: '🏠', icon: Home, keywords: 'home loan housing property mortgage emi calculator', description: 'Calculate home loan EMI', tags: ['Popular'], priority: 10, usageCount: '180K+' },
    { id: 'personal-loan', name: 'Personal Loan Calculator', path: '/calculators/personal-loan-calculator', category: 'Loan', emoji: '💵', icon: Wallet, keywords: 'personal loan instant quick emi calculator', description: 'Calculate personal loan EMI', tags: ['Popular'], priority: 9, usageCount: '150K+' },
    { id: 'car-loan', name: 'Car Loan Calculator', path: '/calculators/car-loan-calculator', category: 'Loan', subcategory: 'Vehicle', emoji: '🚗', icon: Car, keywords: 'car loan auto vehicle emi calculator', description: 'Calculate car loan EMI', tags: ['Popular'], priority: 9, usageCount: '140K+' },
    { id: 'loan-comparison', name: 'Loan Comparison Calculator', path: '/calculators/loan-comparison-calculator', category: 'Loan', emoji: '📊', icon: BarChart, keywords: 'loan comparison interest rate bank compare', description: 'Compare multiple loan offers', tags: ['Advanced'], priority: 8, usageCount: '70K+' },
    { id: 'loan-prepayment', name: 'Loan Prepayment Calculator', path: '/calculators/loan-prepayment-calculator', category: 'Loan', emoji: '💰', icon: DollarSign, keywords: 'loan prepayment foreclosure savings calculator', description: 'Calculate prepayment benefits', priority: 8, usageCount: '80K+' },
    { id: 'loan-affordability', name: 'Loan Affordability Calculator', path: '/loan-tools/loan-affordability', category: 'Loan', emoji: '🎯', icon: Target, keywords: 'loan affordability eligibility income calculator', description: 'Check loan eligibility', priority: 7, usageCount: '60K+' },
    { id: 'business-loan', name: 'Business Loan Calculator', path: '/calculators/business-loan-calculator', category: 'Loan', subcategory: 'Business', emoji: '💼', icon: Briefcase, keywords: 'business loan msme sme emi calculator', description: 'Calculate business loan EMI', priority: 7, usageCount: '50K+' },
    { id: 'gold-loan-emi', name: 'Gold Loan EMI Calculator', path: '/calculators/gold-loan-emi-calculator', category: 'Loan', subcategory: 'Gold', emoji: '🏆', icon: Trophy, keywords: 'gold loan emi calculator jewelry', description: 'Calculate gold loan EMI', priority: 7, usageCount: '45K+' },
    { id: 'education-loan', name: 'Education Loan Calculator', path: '/calculators/education-loan-calculator', category: 'Loan', subcategory: 'Education', emoji: '🎓', icon: GraduationCap, keywords: 'education loan student study abroad emi', description: 'Calculate education loan EMI', priority: 7, usageCount: '40K+' },
    
    // ═══ GST TOOLS (20+) ═══
    { id: 'gst-calc', name: 'GST Calculator', path: '/tools/gst-amount-calculator', category: 'GST', emoji: '💰', icon: Calculator, keywords: 'gst goods services tax calculator india', description: 'Calculate GST amount', tags: ['Popular'], priority: 10, isTrending: true, usageCount: '300K+' },
    { id: 'hsn-sac', name: 'HSN/SAC Code Finder', path: '/tools/gst-hsn-sac-finder', category: 'GST', emoji: '🔍', icon: Search, keywords: 'hsn sac code finder gst search', description: 'Find HSN/SAC codes', priority: 9, usageCount: '150K+' },
    { id: 'reverse-gst', name: 'Reverse GST Calculator', path: '/tools/reverse-gst-calculator', category: 'GST', emoji: '🔄', icon: RefreshCw, keywords: 'reverse gst backward calculator exclusive', description: 'Calculate GST backwards', priority: 8, usageCount: '100K+' },
    { id: 'gst-slab', name: 'GST Slab Calculator', path: '/tools/gst-slab-calculator', category: 'GST', emoji: '💹', icon: TrendingUp, keywords: 'gst slab rate finder 5 12 18 28', description: 'Find applicable GST rate', priority: 8, usageCount: '90K+' },
    { id: 'gstr-1-deadline', name: 'GSTR-1 Deadline Calculator', path: '/tools/gstr-1-deadline-calculator', category: 'GST', emoji: '📅', icon: Calendar, keywords: 'gstr 1 deadline filing last date', description: 'Check GSTR-1 deadlines', priority: 7, usageCount: '60K+' },
    { id: 'gstr-3b-deadline', name: 'GSTR-3B Deadline Calculator', path: '/tools/gstr-3b-deadline-calculator', category: 'GST', emoji: '📆', icon: Calendar, keywords: 'gstr 3b deadline filing last date', description: 'Check GSTR-3B deadlines', priority: 7, usageCount: '60K+' },
    { id: 'gst-liability', name: 'GST Liability Calculator', path: '/tools/gst-liability-calculator', category: 'GST', emoji: '💰', icon: DollarSign, keywords: 'gst liability total tax payable', description: 'Calculate total GST liability', priority: 7, usageCount: '50K+' },
    { id: 'itc-eligibility', name: 'ITC Eligibility Checker', path: '/tools/itc-eligibility-checker', category: 'GST', emoji: '✅', icon: CheckCircle, keywords: 'itc input tax credit eligibility gst', description: 'Check ITC eligibility', priority: 7, usageCount: '45K+' },
    { id: 'composition-scheme', name: 'Composition Scheme Checker', path: '/tools/composition-scheme-checker', category: 'GST', emoji: '📋', icon: FileText, keywords: 'composition scheme eligibility gst turnover', description: 'Check composition scheme eligibility', priority: 6, usageCount: '40K+' },
    
    // ═══ TAX CALCULATORS (15+) ═══
    { id: 'income-tax', name: 'Income Tax Calculator 2025', path: '/tools/income-tax-calculator', category: 'Tax', emoji: '📄', icon: FileText, keywords: 'income tax calculator 2025 old new regime comparison', description: 'Calculate income tax', tags: ['Popular', 'New'], priority: 10, isTrending: true, usageCount: '250K+' },
    { id: 'hra-calc', name: 'HRA Calculator', path: '/calculators/hra-calculator', category: 'Tax', emoji: '🏠', icon: Home, keywords: 'hra house rent allowance exemption tax', description: 'Calculate HRA exemption', tags: ['Tax Saving'], priority: 9, usageCount: '120K+' },
    { id: 'capital-gains', name: 'Capital Gains Tax Calculator', path: '/calculators/capital-gains-tax-calculator', category: 'Tax', emoji: '💹', icon: TrendingUp, keywords: 'capital gains tax ltcg stcg stock property', description: 'Calculate capital gains tax', priority: 8, usageCount: '90K+' },
    { id: 'tds-calc', name: 'TDS Calculator', path: '/calculators/tds-calculator', category: 'Tax', emoji: '💰', icon: DollarSign, keywords: 'tds tax deducted source calculator salary', description: 'Calculate TDS amount', priority: 8, usageCount: '100K+' },
    { id: '80c-calc', name: '80C Tax Saving Calculator', path: '/calculators/section-80c-calculator', category: 'Tax', emoji: '🏦', icon: Landmark, keywords: '80c deduction tax saving investment calculator', description: 'Calculate 80C deductions', tags: ['Tax Saving'], priority: 9, usageCount: '110K+' },
    { id: '80d-calc', name: '80D Health Insurance Calculator', path: '/calculators/section-80d-calculator', category: 'Tax', emoji: '🛡️', icon: Shield, keywords: '80d health insurance deduction tax saving', description: 'Calculate 80D benefits', tags: ['Tax Saving'], priority: 8, usageCount: '80K+' },
    { id: 'advance-tax', name: 'Advance Tax Calculator', path: '/calculators/advance-tax-calculator', category: 'Tax', emoji: '📅', icon: Calendar, keywords: 'advance tax quarterly payment due date', description: 'Calculate advance tax', priority: 7, usageCount: '50K+' },
    { id: 'tax-saving-investment', name: 'Tax Saving Investment Calculator', path: '/calculators/tax-saving-investment-calculator', category: 'Tax', emoji: '💰', icon: DollarSign, keywords: 'tax saving investment elss ppf nps', description: 'Plan tax-saving investments', priority: 8, usageCount: '70K+' },
    
    // ═══ RETIREMENT PLANNING (10+) ═══
    { id: 'retirement-calc', name: 'Retirement Calculator', path: '/calculators/retirement-calculator', category: 'Retirement', emoji: '👴', icon: Users, keywords: 'retirement planning corpus calculator pension', description: 'Plan retirement corpus', priority: 8, usageCount: '85K+' },
    { id: 'nps-calc', name: 'NPS Calculator', path: '/calculators/nps-calculator', category: 'Retirement', emoji: '🎯', icon: Target, keywords: 'nps national pension system calculator', description: 'Calculate NPS returns', tags: ['Tax Saving'], priority: 8, usageCount: '70K+' },
    { id: 'epf-calc', name: 'EPF Calculator', path: '/calculators/epf-calculator', category: 'Retirement', emoji: '🏢', icon: Building, keywords: 'epf pf provident fund calculator balance', description: 'Calculate EPF balance', priority: 8, usageCount: '95K+' },
    { id: 'pension-calc', name: 'Pension Calculator', path: '/calculators/pension-calculator', category: 'Retirement', emoji: '💰', icon: DollarSign, keywords: 'pension calculator monthly retirement income', description: 'Calculate pension amount', priority: 7, usageCount: '60K+' },
    { id: 'gratuity-calc', name: 'Gratuity Calculator', path: '/calculators/gratuity-calculator', category: 'Retirement', emoji: '🎁', icon: Gift, keywords: 'gratuity calculator retirement employment', description: 'Calculate gratuity amount', priority: 7, usageCount: '55K+' },
    
    // ═══ INSURANCE CALCULATORS (10+) ═══
    { id: 'life-insurance', name: 'Life Insurance Calculator', path: '/calculators/life-insurance-calculator', category: 'Insurance', emoji: '🛡️', icon: Shield, keywords: 'life insurance term plan cover calculator', description: 'Calculate life cover needed', priority: 8, usageCount: '90K+' },
    { id: 'health-insurance', name: 'Health Insurance Calculator', path: '/calculators/health-insurance-calculator', category: 'Insurance', emoji: '❤️', icon: Heart, keywords: 'health insurance mediclaim premium calculator', description: 'Calculate health cover', priority: 8, usageCount: '85K+' },
    { id: 'term-insurance', name: 'Term Insurance Calculator', path: '/calculators/term-insurance-calculator', category: 'Insurance', emoji: '🛡️', icon: Shield, keywords: 'term insurance pure cover calculator', description: 'Calculate term insurance', priority: 8, usageCount: '80K+' },
    { id: 'human-life-value', name: 'Human Life Value Calculator', path: '/calculators/human-life-value-calculator', category: 'Insurance', emoji: '👤', icon: UserCheck, keywords: 'human life value hlv insurance calculator', description: 'Calculate HLV', priority: 6, usageCount: '40K+' },
    
    // ═══ FESTIVAL TOOLS (30+) ═══
    { id: 'diwali-date', name: 'Diwali Date Finder', path: '/festival-tools/diwali-date-finder', category: 'Festival', subcategory: 'Hindu', emoji: '🪔', icon: Sparkles, keywords: 'diwali date 2025 muhurat lakshmi puja timing', description: 'Find Diwali dates and muhurat', tags: ['Popular'], priority: 10, isTrending: true, usageCount: '120K+' },
    { id: 'lunar-eclipse', name: 'Lunar Eclipse Predictor 2025', path: '/festival-tools/lunar-eclipse-predictor', category: 'Festival', emoji: '🌑', icon: Moon, keywords: 'lunar eclipse 2025 grahan sutak timing dates', description: '11 lunar eclipses with Sutak', tags: ['New'], priority: 9, isNew: true, usageCount: '95K+' },
    { id: 'marriage-muhurat', name: 'Auspicious Marriage Days', path: '/festival-tools/auspicious-marriage-days', category: 'Festival', emoji: '💍', icon: Heart, keywords: 'marriage muhurat wedding auspicious dates 2025', description: '40+ wedding dates', tags: ['Hot'], priority: 10, isTrending: true, usageCount: '110K+' },
    { id: 'panchang-today', name: 'Panchang Today', path: '/festival-tools/panchang-today', category: 'Festival', emoji: '📅', icon: Calendar, keywords: 'panchang today tithi nakshatra muhurat daily', description: 'Daily panchang', tags: ['Popular'], priority: 9, usageCount: '150K+' },
    { id: 'weekly-tithi', name: 'Weekly Tithi Finder', path: '/festival-tools/weekly-tithi-finder', category: 'Festival', emoji: '📆', icon: Calendar, keywords: 'weekly tithi finder lunar calendar 7 days', description: '7-day lunar calendar', priority: 8, usageCount: '70K+' },
    { id: 'purnima-amavasya', name: 'Purnima & Amavasya Dates', path: '/festival-tools/purnima-amavasya-dates', category: 'Festival', emoji: '🌕', icon: Moon, keywords: 'purnima amavasya full new moon dates', description: 'Full & new moon dates', priority: 8, usageCount: '80K+' },
    { id: 'vrat-calendar', name: 'Vrat & Upavas Calendar', path: '/festival-tools/vrat-upavas-calendar', category: 'Festival', emoji: '🙏', icon: Heart, keywords: 'vrat upavas fasting calendar hindu dates', description: '50+ fasting dates', priority: 8, usageCount: '90K+' },
    { id: 'nakshatra-festival', name: 'Nakshatra on Festival', path: '/festival-tools/nakshatra-festival', category: 'Festival', emoji: '⭐', icon: Star, keywords: 'nakshatra festival birth star constellation', description: 'Birth star for festivals', priority: 7, usageCount: '55K+' },
    { id: 'shubh-muhurat', name: 'Shubh Muhurat Reminder', path: '/festival-tools/shubh-muhurat-reminder', category: 'Festival', emoji: '🔔', icon: Bell, keywords: 'shubh muhurat reminder auspicious timing alert', description: 'Auspicious timing alerts', priority: 8, usageCount: '75K+' },
    { id: 'solar-lunar-converter', name: 'Solar/Lunar Calendar Converter', path: '/festival-tools/solar-lunar-converter', category: 'Festival', emoji: '☀️', icon: Sun, keywords: 'solar lunar calendar converter hindu vikram', description: 'Convert between calendars', tags: ['Advanced'], priority: 7, usageCount: '50K+' },
    { id: 'festival-countdown', name: 'Festival Countdown Clock', path: '/festival-tools/festival-countdown-clock', category: 'Festival', emoji: '⏰', icon: Clock, keywords: 'festival countdown timer clock real time', description: 'Live festival countdown', priority: 7, usageCount: '60K+' },
    { id: 'custom-reminder', name: 'Custom Festival Reminder', path: '/festival-tools/custom-festival-reminder', category: 'Festival', emoji: '🔔', icon: Bell, keywords: 'custom festival reminder generator alert', description: 'Create custom reminders', priority: 7, usageCount: '45K+' },
    { id: 'holiday-calendar-sync', name: 'Holiday Calendar Sync', path: '/festival-tools/indian-holiday-calendar-sync', category: 'Festival', emoji: '🔄', icon: RefreshCw, keywords: 'holiday calendar sync google outlook export', description: 'Sync to Google/Outlook', tags: ['New'], priority: 9, isNew: true, usageCount: '70K+' },
    { id: 'public-holiday-finder', name: 'Public Holiday Finder', path: '/festival-tools/public-holiday-finder', category: 'Festival', emoji: '🏖️', icon: Palmtree, keywords: 'public holiday finder state wise bank holiday', description: 'Find state holidays', priority: 8, usageCount: '85K+' },
    
    // ═══ LEARNING PLATFORM (40 lessons) ═══
    { id: 'gold-loans-learn', name: 'Gold Loans - 10 Lessons', path: '/learn/gold-loans', category: 'Learn', subcategory: 'Gold', emoji: '🏆', icon: GraduationCap, keywords: 'gold loan education lessons guide course', description: '10 comprehensive lessons', tags: ['Popular'], priority: 9, usageCount: '50K+' },
    { id: 'credit-cards-learn', name: 'Credit Cards - 20 Lessons', path: '/learn/credit-cards', category: 'Learn', subcategory: 'Banking', emoji: '💳', icon: CreditCard, keywords: 'credit card lessons guide education course', description: '20 detailed lessons', tags: ['Popular'], priority: 9, usageCount: '65K+' },
    { id: 'credit-score-learn', name: 'Credit Score - 10 Lessons', path: '/learn/credit-score', category: 'Learn', emoji: '📊', icon: BarChart, keywords: 'credit score cibil lessons guide improve', description: '10 expert lessons', tags: ['Popular'], priority: 9, usageCount: '55K+' },
    
    // ═══ OTHER CALCULATORS (50+) ═══
    { id: 'salary-calc', name: 'Salary Calculator', path: '/calculators/salary-calculator', category: 'Salary', emoji: '💰', icon: DollarSign, keywords: 'salary calculator take home ctc in hand', description: 'Calculate take-home salary', tags: ['Popular'], priority: 9, usageCount: '140K+' },
    { id: 'budget-calc', name: 'Budget Calculator', path: '/calculators/budget-calculator', category: 'Finance', emoji: '💵', icon: Wallet, keywords: 'budget calculator planner monthly expenses', description: 'Plan monthly budget', priority: 8, usageCount: '70K+' },
    { id: 'currency-converter', name: 'Currency Converter', path: '/calculators/currency-converter', category: 'Finance', emoji: '🌍', icon: Globe, keywords: 'currency converter exchange rate forex', description: 'Convert currencies', priority: 8, usageCount: '100K+' },
    { id: 'inflation-calc', name: 'Inflation Calculator', path: '/calculators/inflation-calculator', category: 'Finance', emoji: '📈', icon: TrendingUp, keywords: 'inflation calculator future value purchasing power', description: 'Calculate inflation impact', priority: 7, usageCount: '50K+' },
    { id: 'break-even', name: 'Break Even Calculator', path: '/calculators/break-even-calculator', category: 'Business', emoji: '🎯', icon: Target, keywords: 'break even analysis calculator business', description: 'Calculate break-even point', priority: 7, usageCount: '40K+' },
    { id: 'profit-margin', name: 'Profit Margin Calculator', path: '/calculators/profit-margin-calculator', category: 'Business', emoji: '💹', icon: TrendingUp, keywords: 'profit margin markup calculator business', description: 'Calculate profit margins', priority: 7, usageCount: '45K+' },
    { id: 'discount-calc', name: 'Discount Calculator', path: '/calculators/discount-calculator', category: 'Shopping', emoji: '🏷️', icon: Tag, keywords: 'discount calculator percentage off sale', description: 'Calculate discounts', priority: 7, usageCount: '80K+' },
    { id: 'net-worth', name: 'Net Worth Calculator', path: '/calculators/net-worth-calculator', category: 'Finance', emoji: '💎', icon: Gem, keywords: 'net worth calculator assets liabilities wealth', description: 'Calculate net worth', priority: 7, usageCount: '50K+' },
    { id: 'emergency-fund', name: 'Emergency Fund Calculator', path: '/calculators/emergency-fund-calculator', category: 'Finance', emoji: '🆘', icon: Shield, keywords: 'emergency fund calculator savings financial security', description: 'Plan emergency corpus', priority: 7, usageCount: '45K+' },
    { id: 'property-registration', name: 'Property Registration Calculator', path: '/calculators/property-registration-calculator', category: 'Property', emoji: '🏘️', icon: Building2, keywords: 'property registration stamp duty charges calculator', description: 'Calculate registration charges', priority: 7, usageCount: '60K+' },
    { id: 'rent-vs-buy', name: 'Rent vs Buy Calculator', path: '/calculators/rent-vs-buy-calculator', category: 'Property', emoji: '🏠', icon: Home, keywords: 'rent vs buy property home calculator', description: 'Rent or buy decision', priority: 7, usageCount: '50K+' },
    { id: 'brokerage-calc', name: 'Brokerage Calculator', path: '/calculators/brokerage-calculator', category: 'Trading', emoji: '📊', icon: BarChart, keywords: 'brokerage charges calculator trading stock', description: 'Calculate trading charges', priority: 6, usageCount: '40K+' },
    { id: 'crypto-tax', name: 'Crypto Tax Calculator', path: '/calculators/crypto-tax-estimator', category: 'Crypto', emoji: '₿', icon: TrendingUp, keywords: 'crypto tax calculator bitcoin cryptocurrency', description: 'Calculate crypto tax', priority: 6, usageCount: '35K+' },
    { id: 'financial-goal', name: 'Financial Goal Calculator', path: '/calculators/financial-goal-calculator', category: 'Planning', emoji: '🎯', icon: Target, keywords: 'financial goal planning calculator target', description: 'Plan financial goals', priority: 7, usageCount: '45K+' },
    
    // ═══ BLOG POSTS (Sample) ═══
    ...blogPosts0.slice(0, 30).map((post, i) => ({
      id: `blog-${i}`,
      name: post.title,
      path: `/blog/${post.slug}`,
      category: 'Blog', 
      subcategory: post.categories[0],
      emoji: '📰',
      icon: Newspaper,
      keywords: `${post.title} ${post.categories.join(' ')} ${post.excerpt}`,
      description: post.excerpt.slice(0, 100),
      tags: post.categories,
      priority: 5
    })),
    
    // ═══ ADDITIONAL ROUTES ═══
    { id: 'all-tools', name: 'All Tools', path: '/tools', category: 'Tools', emoji: '🧰', icon: Box, keywords: 'all tools calculators complete list', description: 'Browse all tools', priority: 8, usageCount: '100K+' },
    { id: 'gst-tools', name: 'GST Tools', path: '/gst-tools', category: 'GST', emoji: '💰', icon: Calculator, keywords: 'gst tools calculators all', description: 'All GST tools', priority: 8, usageCount: '120K+' },
    { id: 'tax-tools', name: 'Tax Tools', path: '/tax-tools', category: 'Tax', emoji: '📄', icon: FileText, keywords: 'tax tools calculators income', description: 'All tax tools', priority: 8, usageCount: '90K+' },
    { id: 'loan-tools', name: 'Loan Tools', path: '/loan-tools', category: 'Loan', emoji: '🏠', icon: Home, keywords: 'loan tools calculators emi', description: 'All loan tools', priority: 8, usageCount: '110K+' },
    { id: 'festival-tools', name: 'Festival Tools', path: '/festival-tools', category: 'Festival', emoji: '🎉', icon: PartyPopper, keywords: 'festival tools panchang muhurat', description: 'All festival tools', priority: 8, usageCount: '130K+' },
    { id: 'blog', name: 'Blog & Articles', path: '/blog', category: 'Blog', emoji: '📰', icon: Newspaper, keywords: 'blog articles news finance', description: 'Financial articles', priority: 7, usageCount: '80K+' },
    { id: 'learn', name: 'Learn Finance', path: '/learn', category: 'Learn', emoji: '🎓', icon: GraduationCap, keywords: 'learn finance education courses lessons', description: 'Free finance courses', tags: ['Popular'], priority: 9, usageCount: '75K+' },
    { id: 'crypto', name: 'Crypto Tools', path: '/crypto', category: 'Crypto', emoji: '₿', icon: TrendingUp, keywords: 'crypto cryptocurrency bitcoin tools', description: 'Crypto tools', priority: 7, usageCount: '60K+' },
    { id: 'excel-tools', name: 'Excel Tools', path: '/excel-tools', category: 'Excel', emoji: '📊', icon: Grid, keywords: 'excel tools templates downloads', description: 'Excel templates', priority: 7, usageCount: '50K+' },
    { id: 'insurance-tools', name: 'Insurance Tools', path: '/insurance-tools', category: 'Insurance', emoji: '🛡️', icon: Shield, keywords: 'insurance tools calculators life health', description: 'Insurance calculators', priority: 7, usageCount: '65K+' }
  ];
  
  return database;
};

// ═══════════════════════════════════════════════════════════════
// 🎨 MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

const HomeInvestopedia: React.FC = () => {
  // ═══ STATE MANAGEMENT ═══
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rotationKey, setRotationKey] = useState(0);
  const navigate = useNavigate();

  // Auto-refresh random content every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRotationKey(prev => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Helper function - Get random items from any array
  const getRandomItems = <T,>(pool: T[], count: number): T[] => {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  // ═══ SEARCH DATABASE ═══
  const searchDatabase = useMemo(() => buildComprehensiveSearchDatabase(), []);

  // ═══ ENHANCED SEARCH WITH SCORING ═══
  const searchResults = useMemo(() => {
    if (searchQuery.trim().length === 0) return [];
    
    const query = searchQuery.toLowerCase().trim();
    const queryWords = query.split(/\s+/);
    
    // Score each item
    const scoredResults = searchDatabase.map(item => {
      let score = 0;
      const itemText = `${item.name} ${item.nameHindi || ''} ${item.keywords} ${item.description} ${item.category} ${item.subcategory || ''} ${item.tags?.join(' ') || ''}`.toLowerCase();
      
      // Exact match in name - highest priority
      if (item.name.toLowerCase() === query) score += 1000;
      
      // Name contains query
      if (item.name.toLowerCase().includes(query)) score += 500;
      
      // Keywords exact match
      if (item.keywords.toLowerCase().includes(query)) score += 300;
      
      // All query words present
      const allWordsPresent = queryWords.every(word => itemText.includes(word));
      if (allWordsPresent) score += 200;
      
      // Category match
      if (item.category.toLowerCase().includes(query)) score += 150;
      
      // Description match
      if (item.description.toLowerCase().includes(query)) score += 100;
      
      // Tags match
      if (item.tags?.some(tag => tag.toLowerCase().includes(query))) score += 100;
      
      // Popular/Trending items boost
      if (item.isTrending) score += 50;
      if (item.isNew) score += 30;
      
      // Priority boost
      score += (item.priority || 0) * 10;
      
      // Partial word matches
      queryWords.forEach(word => {
        if (word.length > 2 && itemText.includes(word)) {
          score += 20;
        }
      });
      
      return { ...item, score };
    });
    
    // Filter out zero scores and sort by score
    return scoredResults
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);
  }, [searchQuery, searchDatabase]);

  useEffect(() => {
    setShowSearchResults(searchResults.length > 0 && searchQuery.length > 0);
  }, [searchResults, searchQuery]);

  const handleSearchItemClick = (path: string) => {
    navigate(path);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  // ═══ CATEGORIES ═══
  const categories = useMemo(() => {
    const catSet = new Set(searchDatabase.map(item => item.category));
    return ['All', ...Array.from(catSet).sort()];
  }, [searchDatabase]);

  const filteredByCategory = useMemo(() => {
    if (selectedCategory === 'All') return searchDatabase;
    return searchDatabase.filter(item => item.category === selectedCategory);
  }, [selectedCategory, searchDatabase]);

  // ═══ POPULAR & TRENDING ═══
  const popularItems = useMemo(() => 
    searchDatabase
      .filter(item => item.isTrending || item.priority >= 9)
      .sort((a, b) => (b.priority || 0) - (a.priority || 0))
      .slice(0, 8),
    [searchDatabase]
  );

  const newItems = useMemo(() => 
    searchDatabase
      .filter(item => item.isNew)
      .slice(0, 6),
    [searchDatabase]
  );

  // ═══ CATEGORY GROUPS ═══
  const categoryGroups = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {};
    searchDatabase.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [searchDatabase]);

  // ═══ DYNAMIC CONTENT POOLS ═══
  const categoryPools = useMemo(() => ({
    calculators: searchDatabase.filter(item => ['Investment', 'Loan', 'Salary', 'Finance'].includes(item.category)).slice(0, 20),
    learning: searchDatabase.filter(item => item.category === 'Learn').slice(0, 10),
    festivals: searchDatabase.filter(item => item.category === 'Festival').slice(0, 20),
    blogs: blogPosts0.slice(0, 20).map(post => ({ 
      name: post.title, 
      path: `/blog/${post.slug}`, 
      emoji: '📰', 
      desc: post.excerpt.slice(0, 80) + '...',
      category: post.categories[0]
    }))
  }), [searchDatabase]);

  // Dynamic rotating content - changes every 10 seconds
  const dynamicContent = useMemo(() => ({
    calculators: getRandomItems(categoryPools.calculators, 8),
    learning: getRandomItems(categoryPools.learning, 6),
    festivals: getRandomItems(categoryPools.festivals, 8),
    blogs: getRandomItems(categoryPools.blogs, 6)
  }), [categoryPools, rotationKey]);

  // Quick access categories
  const quickAccessCategories = useMemo(() => [
    { name: language === 'en' ? 'Calculators' : 'कैलकुलेटर', path: '/calculators', emoji: '🧮', count: '107', color: 'from-blue-500 to-cyan-500' },
    { name: language === 'en' ? 'GST Tools' : 'जीएसटी', path: '/gst-tools', emoji: '💰', count: '20+', color: 'from-green-500 to-emerald-500' },
    { name: language === 'en' ? 'Tax Tools' : 'कर', path: '/tax-tools', emoji: '📄', count: '15+', color: 'from-purple-500 to-pink-500' },
    { name: language === 'en' ? 'Loan Tools' : 'ऋण', path: '/loan-tools', emoji: '🏠', count: '12+', color: 'from-orange-500 to-red-500' },
    { name: language === 'en' ? 'Festival' : 'त्योहार', path: '/festival-tools', emoji: '🎉', count: '30+', color: 'from-yellow-500 to-orange-500' },
    { name: language === 'en' ? 'Learn' : 'सीखें', path: '/learn', emoji: '🎓', count: '40', color: 'from-indigo-500 to-purple-500' },
    { name: language === 'en' ? 'Blog' : 'ब्लॉग', path: '/blog', emoji: '📰', count: '150+', color: 'from-pink-500 to-rose-500' },
    { name: language === 'en' ? 'Insurance' : 'बीमा', path: '/insurance-tools', emoji: '🛡️', count: '8+', color: 'from-teal-500 to-cyan-500' }
  ], [language]);

  // ═══ RENDER ═══
  return (
    <>
      <SEOHelmet
        title="MoneyCal India - Smart Financial Tools & Calculators | #1 Finance Platform 2025"
        description="India's most advanced financial platform with 500+ tools. GST, Income Tax, SIP, EMI Calculators. Festival Tools. Learn Finance. Free & Accurate. 1M+ Users Trust Us."
        keywords="financial calculator india, gst calculator, income tax calculator 2025, sip calculator, emi calculator, home loan calculator, festival tools, panchang, diwali muhurat, credit score"
        canonicalUrl="https://moneycal.in"
      />

      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900'
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}>
        {/* ═══ FLOATING BACKGROUND ELEMENTS ═══ */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className={`absolute w-96 h-96 rounded-full blur-3xl ${
              theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-400/30'
            }`}
            style={{ top: '10%', left: '5%' }}
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className={`absolute w-96 h-96 rounded-full blur-3xl ${
              theme === 'dark' ? 'bg-purple-600/20' : 'bg-purple-400/30'
            }`}
            style={{ top: '40%', right: '5%' }}
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className={`absolute w-96 h-96 rounded-full blur-3xl ${
              theme === 'dark' ? 'bg-pink-600/20' : 'bg-pink-400/30'
            }`}
            style={{ bottom: '10%', left: '20%' }}
          />
        </div>

        {/* ═══ HEADER ═══ */}
        <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${
          theme === 'dark'
            ? 'bg-gray-900/95 border-gray-800'
            : 'bg-white/95 border-gray-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <span className="text-2xl">💰</span>
                </motion.div>
                <div>
                  <h1 className="text-xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    MoneyCal.in
                  </h1>
                  <p className={`text-[10px] font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Smart Finance Tools
                  </p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                {[
                  { name: 'Tools', path: '/tools', icon: Box },
                  { name: 'Calculators', path: '/calculators', icon: Calculator },
                  { name: 'Festival', path: '/festival-tools', icon: PartyPopper },
                  { name: 'Learn', path: '/learn', icon: GraduationCap },
                  { name: 'Blog', path: '/blog', icon: Newspaper }
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Language Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                  className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-1 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  {language === 'en' ? 'हिंदी' : 'EN'}
                </motion.button>

                {/* Theme Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.button>

                {/* Mobile Menu */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`lg:hidden p-2 rounded-lg ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`lg:hidden border-t ${
                  theme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="px-4 py-4 grid grid-cols-2 gap-2">
                  {[
                    { name: 'All Tools', path: '/tools', icon: Box },
                    { name: 'Calculators', path: '/calculators', icon: Calculator },
                    { name: 'GST', path: '/gst-tools', icon: Receipt },
                    { name: 'Tax', path: '/tax-tools', icon: FileText },
                    { name: 'Loans', path: '/loan-tools', icon: Home },
                    { name: 'Festival', path: '/festival-tools', icon: PartyPopper },
                    { name: 'Learn', path: '/learn', icon: GraduationCap },
                    { name: 'Blog', path: '/blog', icon: Newspaper }
                  ].map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2 p-3 rounded-lg text-sm font-semibold ${
                        theme === 'dark'
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* ═══ HERO SECTION ═══ */}
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Main Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-4 ${
                  theme === 'dark'
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-[0_0_20px_rgba(147,51,234,0.3)]'
                }`}>
                  {language === 'en' ? (
                    <>Smart Finance<br/>Made Simple</>
                  ) : (
                    <>स्मार्ट फाइनेंस<br/>आसान बनाया</>
                  )}
                </h1>
                <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                  theme === 'dark' 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300' 
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-purple-700'
                }`}>
                  {language === 'en' 
                    ? '500+ Free Tools • AI-Powered Search • Trusted by 1M+ Indians'
                    : '500+ मुफ्त टूल्स • AI खोज • 1M+ भारतीयों द्वारा विश्वसनीय'
                  }
                </p>
              </motion.div>

              {/* ═══ POWER SEARCH ═══ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-4xl mx-auto mb-12 relative"
              >
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2">
                    <Search className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'en' 
                      ? '🔍 Search anything... EMI, SIP, GST, Diwali, Tax, Loan...'
                      : '🔍 कुछ भी खोजें... EMI, SIP, GST, दिवाली, टैक्स, लोन...'
                    }
                    className={`w-full pl-16 pr-16 py-6 text-lg sm:text-xl rounded-2xl border-2 focus:ring-4 outline-none font-medium shadow-2xl transition-all ${
                      theme === 'dark'
                        ? 'bg-gray-800/90 border-gray-700 focus:border-blue-500 focus:ring-blue-500/30 text-white placeholder-gray-500'
                        : 'bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setShowSearchResults(false);
                      }}
                      className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-200/30"
                    >
                      <X className="w-5 h-5" />
                      </button>
                  )}
                    </div>

                {/* Enhanced Search Results Dropdown */}
                    <AnimatePresence>
                  {showSearchResults && (
                        <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full left-0 right-0 mt-4 rounded-3xl shadow-2xl border-2 max-h-[75vh] overflow-hidden z-50 ${
                        theme === 'dark'
                          ? 'bg-gradient-to-br from-gray-900/98 to-gray-800/98 border-purple-500/30 backdrop-blur-2xl'
                          : 'bg-gradient-to-br from-white/98 to-gray-50/98 border-blue-300/50 backdrop-blur-2xl'
                      }`}
                    >
                      {/* Search Header */}
                      <div className={`sticky top-0 px-6 py-4 border-b ${
                        theme === 'dark'
                          ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30'
                          : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
                            }`}>
                              <Search className={`w-5 h-5 ${
                                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                              }`} />
                        </div>
                            <div>
                              <h3 className={`text-lg font-black ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                                ✨ {searchResults.length} Result{searchResults.length !== 1 ? 's' : ''} Found
                              </h3>
                              <p className={`text-xs ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                Searching across 500+ tools • Click to open
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setSearchQuery('');
                              setShowSearchResults(false);
                            }}
                            className={`p-2 rounded-lg transition-all hover:scale-110 ${
                              theme === 'dark'
                                ? 'bg-gray-800 hover:bg-gray-700 text-gray-400'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                            }`}
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Search Results Grid */}
                      <div className="p-4 overflow-y-auto max-h-[calc(75vh-100px)] custom-scrollbar">
                        <div className="grid gap-3">
                          {searchResults.map((result, idx) => (
                            <motion.button
                              key={result.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.03, duration: 0.2 }}
                              onClick={() => handleSearchItemClick(result.path)}
                              className={`group relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
                                theme === 'dark'
                                  ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20'
                                  : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10'
                              }`}
                            >
                              {/* Hover Gradient Effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:via-blue-500/5 group-hover:to-pink-500/5 transition-all duration-300" />
                              
                              <div className="relative flex items-start gap-4">
                                {/* Icon */}
                                <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110 group-hover:rotate-6 ${
                                  theme === 'dark'
                                    ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50'
                                    : 'bg-gradient-to-br from-purple-100 to-blue-100'
                                }`}>
                                  {result.emoji}
                                </div>

                                {/* Content */}
                              <div className="flex-1 min-w-0">
                                  {/* Title */}
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <h4 className={`font-bold text-lg leading-tight ${
                                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>
                                  {result.name}
                                      {result.nameHindi && (
                                        <span className={`block text-sm font-normal mt-0.5 ${
                                          theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                                        }`}>
                                          {result.nameHindi}
                                        </span>
                                      )}
                                    </h4>
                                    <ChevronRight className={`flex-shrink-0 w-6 h-6 transition-transform group-hover:translate-x-1 ${
                                      theme === 'dark' ? 'text-purple-400' : 'text-blue-600'
                                    }`} />
                                      </div>

                                  {/* Description */}
                                  <p className={`text-sm mb-3 line-clamp-2 ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                  }`}>
                                    {result.description}
                                  </p>

                                  {/* Tags & Meta */}
                                  <div className="flex flex-wrap items-center gap-2">
                                    {/* Category Badge */}
                                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-bold shadow-lg">
                                    {result.category}
                                  </span>

                                    {/* Subcategory */}
                                    {result.subcategory && (
                                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        theme === 'dark'
                                          ? 'bg-gray-700 text-gray-300'
                                          : 'bg-gray-100 text-gray-700 border border-gray-300'
                                      }`}>
                                        {result.subcategory}
                                  </span>
                                    )}

                                    {/* Usage Count */}
                                    {result.usageCount && (
                                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                                        theme === 'dark'
                                          ? 'bg-blue-900/30 text-blue-400'
                                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                                      }`}>
                                        <Users className="w-3 h-3" />
                                        {result.usageCount}
                                      </span>
                                    )}

                                    {/* New Badge */}
                                    {result.isNew && (
                                      <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-bold shadow-lg animate-pulse">
                                        ✨ NEW
                                      </span>
                                    )}

                                    {/* Trending Badge */}
                                    {result.isTrending && (
                                      <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-xs font-bold shadow-lg">
                                        🔥 TRENDING
                                      </span>
                                    )}

                                    {/* Tags */}
                                    {result.tags && result.tags.slice(0, 2).map((tag, i) => (
                                      <span
                        key={i}
                                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                                          theme === 'dark'
                                            ? 'bg-purple-900/30 text-purple-300'
                                            : 'bg-purple-50 text-purple-700'
                                        }`}
                                      >
                                        {tag}
                                      </span>
              ))}
              </div>
          </div>
                  </div>
                            </motion.button>
                          ))}
            </div>

                        {/* No Results Message */}
                        {searchResults.length === 0 && searchQuery.length > 0 && (
                          <div className="text-center py-12">
                            <div className={`text-6xl mb-4 ${
                              theme === 'dark' ? 'opacity-30' : 'opacity-20'
                            }`}>
                              🔍
            </div>
                            <p className={`text-lg font-bold mb-2 ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              No results found for "{searchQuery}"
                            </p>
                            <p className={`text-sm ${
                              theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                            }`}>
                              Try different keywords or browse our categories below
                            </p>
                    </div>
                  )}
                  </div>

                      {/* Search Footer Tip */}
                      <div className={`px-6 py-3 border-t text-center ${
                        theme === 'dark'
                          ? 'bg-gray-900/50 border-gray-700'
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <p className={`text-xs ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                        }`}>
                          💡 <strong>Pro Tip:</strong> Try searching for "EMI", "Tax", "Festival", "GST", or any calculator name
                        </p>
              </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Custom Scrollbar Styles */}
                <style>{`
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-track {
                    background: ${theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.5)'};
                    border-radius: 10px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: ${theme === 'dark' ? 'linear-gradient(to bottom, #8b5cf6, #3b82f6)' : 'linear-gradient(to bottom, #60a5fa, #a78bfa)'};
                    border-radius: 10px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: ${theme === 'dark' ? 'linear-gradient(to bottom, #7c3aed, #2563eb)' : 'linear-gradient(to bottom, #3b82f6, #8b5cf6)'};
                  }
                `}</style>

                {/* Popular Searches */}
                {!searchQuery && (
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <span className={`text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      🔥 Popular:
                  </span>
                    {['EMI', 'SIP', 'GST', 'Income Tax', 'Diwali', 'Home Loan', 'PPF', 'Credit Score'].map((term, i) => (
                      <button
                        key={i}
                        onClick={() => setSearchQuery(term)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                      >
                        {term}
                      </button>
              ))}
            </div>
                )}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <Link
                  to="/tools"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Rocket className="w-5 h-5" />
                  {language === 'en' ? 'Explore 500+ Tools' : '500+ टूल्स देखें'}
                </Link>
                <Link
                  to="/learn"
                  className={`px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 border-2 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                  {language === 'en' ? 'Start Learning' : 'सीखना शुरू करें'}
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              >
                {[
                  { icon: Calculator, label: '500+ Tools', color: 'from-blue-500 to-cyan-500' },
                  { icon: Users, label: '1M+ Users', color: 'from-purple-500 to-pink-500' },
                  { icon: Star, label: '4.9/5 Rating', color: 'from-yellow-500 to-orange-500' },
                  { icon: Shield, label: '100% Secure', color: 'from-green-500 to-emerald-500' }
                ].map((stat, i) => (
                  <div
                        key={i}
                    className={`p-6 rounded-xl ${
                      theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'
                    } backdrop-blur-sm shadow-xl`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <stat.icon className="w-6 h-6 text-white" />
                  </div>
                    <p className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {stat.label}
              </p>
                </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ QUICK ACCESS CATEGORIES ═══ */}
        <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/70'} border-y ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                ⚡ {language === 'en' ? 'Quick Access' : 'त्वरित पहुंच'}
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'en' ? 'Jump to your favorite section' : 'अपने पसंदीदा अनुभाग पर जाएं'}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
              {quickAccessCategories.map((cat, idx) => (
                <Link
                  key={idx}
                  to={cat.path}
                  className={`group p-5 rounded-xl text-center transition-all hover:scale-110 active:scale-95 ${
                    theme === 'dark'
                      ? 'bg-gray-800/70 border-2 border-gray-700 hover:border-purple-500'
                      : 'bg-white border-2 border-gray-200 hover:border-blue-500 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <div className="text-4xl mb-2">{cat.emoji}</div>
                  <div className={`text-xs font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {cat.name}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full inline-block font-bold bg-gradient-to-r ${cat.color} text-white`}>
                    {cat.count}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TRENDING & POPULAR ═══ */}
        <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white/50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                🔥 {language === 'en' ? 'Trending Now' : 'ट्रेंडिंग अभी'}
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'en' ? 'Most popular tools used by 1M+ Indians' : '1M+ भारतीयों द्वारा उपयोग किए जाने वाले सबसे लोकप्रिय टूल'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularItems.map((item, idx) => (
              <motion.div
                  key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                    <Link
                      to={item.path}
                    className={`block p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                        theme === 'dark'
                        ? 'bg-gray-800/50 border-gray-700 hover:border-blue-500'
                        : 'bg-white border-gray-200 hover:border-blue-500 hover:shadow-2xl'
                    }`}
                  >
                    <div className="text-5xl mb-4">{item.emoji}</div>
                    <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {item.name}
                  </h3>
                    <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-bold">
                        {item.category}
                      </span>
                      {item.usageCount && (
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          👥 {item.usageCount}
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
                </div>
        </section>

        {/* ═══ NEW TOOLS ═══ */}
        {newItems.length > 0 && (
          <section className={`py-16 ${theme === 'dark' ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/20' : 'bg-gradient-to-br from-green-50 to-emerald-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-black mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                ✨ {language === 'en' ? 'New Tools' : 'नए टूल्स'}
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`}>
                {language === 'en' ? 'Latest additions to our platform' : 'हमारे प्लेटफॉर्म में नवीनतम जोड़'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {newItems.map((item, idx) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
              <Link
                      to={item.path}
                      className={`block p-6 rounded-xl border-2 transition-all hover:scale-105 relative ${
                        theme === 'dark'
                          ? 'bg-gray-800/50 border-green-500/30 hover:border-green-500'
                          : 'bg-white border-green-200 hover:border-green-500 hover:shadow-2xl'
                      }`}
                >
                  <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
                          NEW
                  </span>
                </div>
                      <div className="text-5xl mb-4">{item.emoji}</div>
                      <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {item.name}
                  </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.description}
                  </p>
                </Link>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* ═══ DYNAMIC ROTATING CONTENT ═══ */}
        <section className={`py-16 ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/20 to-blue-900/20' : 'bg-gradient-to-br from-purple-50 to-blue-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                ✨ {language === 'en' ? 'Discover More Tools' : 'और टूल्स खोजें'}
              </h2>
              <p className={`text-lg flex items-center justify-center gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <Clock className="w-5 h-5 text-purple-500 animate-spin" style={{ animationDuration: '10s' }} />
                {language === 'en' ? 'Content refreshes every 10 seconds' : 'हर 10 सेकंड में बदलता है'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Top Calculators */}
              <motion.div
                key={`calc-${rotationKey}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl p-6 border-2 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30'
                    : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <Calculator className={`w-7 h-7 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                    {language === 'en' ? 'Top Calculators' : 'टॉप कैलकुलेटर'}
                  </h3>
                </div>
                <div className="space-y-2">
                  {dynamicContent.calculators.slice(0, 6).map((item: any, idx: number) => (
                    <Link
                      key={idx}
                      to={item.path}
                      className={`block p-3 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                        theme === 'dark'
                          ? 'bg-gray-800/60 hover:bg-gray-700/60'
                          : 'bg-white hover:shadow-md border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {item.name}
                          </div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.description?.slice(0, 40) || item.category}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Learning Platform */}
              <motion.div
                key={`learn-${rotationKey}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`rounded-2xl p-6 border-2 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30'
                    : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <BookOpen className={`w-7 h-7 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                    {language === 'en' ? 'Learn Finance' : 'वित्त सीखें'}
                  </h3>
                </div>
                <div className="space-y-2">
                  {dynamicContent.learning.map((item: any, idx: number) => (
                    <Link
                      key={idx}
                      to={item.path}
                      className={`block p-3 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                        theme === 'dark'
                          ? 'bg-gray-800/60 hover:bg-gray-700/60'
                          : 'bg-white hover:shadow-md border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {item.name}
                          </div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.description?.slice(0, 40) || item.category}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Festival Tools */}
              <motion.div
                key={`festival-${rotationKey}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`rounded-2xl p-6 border-2 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/30'
                    : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <PartyPopper className={`w-7 h-7 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`} />
                  <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>
                    {language === 'en' ? 'Festival Tools' : 'त्योहार टूल्स'}
                  </h3>
                </div>
                <div className="space-y-2">
                  {dynamicContent.festivals.slice(0, 6).map((item: any, idx: number) => (
                    <Link
                      key={idx}
                      to={item.path}
                      className={`block p-3 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                        theme === 'dark'
                          ? 'bg-gray-800/60 hover:bg-gray-700/60'
                          : 'bg-white hover:shadow-md border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {item.name}
                          </div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.description?.slice(0, 40) || item.category}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Latest Blogs */}
              <motion.div
                key={`blog-${rotationKey}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`rounded-2xl p-6 border-2 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30'
                    : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <Newspaper className={`w-7 h-7 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                  <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                    {language === 'en' ? 'Latest Articles' : 'नवीनतम लेख'}
                  </h3>
                </div>
                <div className="space-y-2">
                  {dynamicContent.blogs.map((item: any, idx: number) => (
                    <Link
                      key={idx}
                      to={item.path}
                      className={`block p-3 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                        theme === 'dark'
                          ? 'bg-gray-800/60 hover:bg-gray-700/60'
                          : 'bg-white hover:shadow-md border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`font-bold text-sm line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {item.name}
                          </div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.category}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Refresh Indicator */}
            <div className="text-center mt-8">
              <div className={`inline-flex items-center gap-2 px-5 py-3 rounded-full ${
                theme === 'dark' ? 'bg-gray-800/60 text-gray-300' : 'bg-white text-gray-700 shadow-lg border-2 border-purple-200'
              }`}>
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                <span className="text-sm font-bold">
                  {language === 'en' ? 'Content auto-refreshes every 10 seconds' : 'हर 10 सेकंड में नया कंटेंट'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ ALL CATEGORIES ═══ */}
        <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900/30' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                📂 {language === 'en' ? 'Explore by Category' : 'श्रेणी के अनुसार देखें'}
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'en' ? 'Browse our comprehensive collection' : 'हमारे व्यापक संग्रह को ब्राउज़ करें'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.keys(categoryGroups).sort().map((category, idx) => {
                const count = categoryGroups[category].length;
                const firstItem = categoryGroups[category][0];
                
                return (
              <Link
                    key={category}
                    to={firstItem?.path.split('/').slice(0, 2).join('/') || '/tools'}
                    className={`p-6 rounded-xl text-center transition-all hover:scale-105 ${
                        theme === 'dark'
                        ? 'bg-gray-800/50 border border-gray-700 hover:border-blue-500'
                        : 'bg-white border-2 border-gray-200 hover:border-blue-500 shadow-lg'
                    }`}
                  >
                    <div className="text-4xl mb-3">{firstItem?.emoji || '📁'}</div>
                    <div className={`text-sm font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {category}
                        </div>
                    <div className={`text-xs px-3 py-1 rounded-full inline-block font-semibold ${
                      theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {count} tools
                      </div>
                </Link>
                );
              })}
                      </div>
                    </div>
        </section>

        {/* ═══ TRUST SECTION ═══ */}
        <section className={`py-16 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                🏆 {language === 'en' ? 'Why Trust MoneyCal.in?' : 'MoneyCal.in पर भरोसा क्यों करें?'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: CheckCircle, title: 'RBI Compliant', desc: 'All calculations verified', color: 'from-green-500 to-emerald-500' },
                { icon: Shield, title: '100% Secure', desc: 'Your data is safe', color: 'from-blue-500 to-cyan-500' },
                { icon: Award, title: 'Expert Verified', desc: 'Certified by CAs', color: 'from-purple-500 to-pink-500' },
                { icon: Star, title: '4.9/5 Rating', desc: '50K+ reviews', color: 'from-yellow-500 to-orange-500' }
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-8 rounded-xl text-center ${
                    theme === 'dark' ? 'bg-gray-800/50' : 'bg-white shadow-xl'
                  }`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className="w-8 h-8 text-white" />
                        </div>
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.desc}
                          </p>
                      </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-64 h-64 bg-white/30 rounded-full blur-3xl top-0 left-0 animate-pulse" />
            <div className="absolute w-64 h-64 bg-white/30 rounded-full blur-3xl bottom-0 right-0 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl">
                🚀 {language === 'en' ? 'Ready to Get Started?' : 'शुरू करने के लिए तैयार हैं?'}
              </h2>
              <p className="text-2xl text-white/95 mb-8 font-bold">
                {language === 'en' 
                  ? 'Join 1 Million+ Indians using India\'s smartest financial platform'
                  : '1 मिलियन+ भारतीयों के साथ भारत के सबसे स्मार्ट फाइनेंशियल प्लेटफॉर्म में शामिल हों'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/tools"
                  className="px-10 py-5 bg-white text-purple-600 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 hover:shadow-3xl transition-all flex items-center justify-center gap-2"
                >
                  <Rocket className="w-6 h-6" />
                  {language === 'en' ? 'Explore All Tools' : 'सभी टूल्स देखें'}
                </Link>
                <Link
                  to="/learn"
                  className="px-10 py-5 border-2 border-white text-white rounded-2xl font-black text-xl hover:bg-white/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-6 h-6" />
                  {language === 'en' ? 'Start Learning Free' : 'मुफ्त सीखना शुरू करें'}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
};

export default HomeInvestopedia;
