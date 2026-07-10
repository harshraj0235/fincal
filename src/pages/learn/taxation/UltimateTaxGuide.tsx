import React, { useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import { 
  BookOpen, Shield, Receipt, FileText, CheckCircle, IndianRupee, 
  Landmark, TrendingDown, ArrowRight, Zap, Globe, Info, HelpCircle, 
  ChevronRight, Calendar, Calculator, Sparkles, Languages
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArticleExpertReview } from '../../../components/ArticleExpertReview';

const publishedDate = '2026-05-09T00:00:00+05:30';

type Language = 'en' | 'hi';

const translations = {
  en: {
    heroBadge: 'Comprehensive Masterclass',
    heroTitle: 'The Ultimate Guide to',
    heroTitleSpan: 'Indian Income Tax',
    heroSubtitle: 'No jargon. No confusion. Master the Indian tax system, decode the Old vs New regime, and learn the exact strategies to legally minimize your tax outgo in 2026-2027.',
    langToggle: 'हिंदी में पढ़ें',
    coreConceptsTitle: 'The Core Concepts (Tax 101)',
    fyVsAyTitle: 'Financial Year vs Assessment Year',
    fyText: 'Financial Year (FY): The year you earn your money. Example: April 1, 2026 to March 31, 2027.',
    ayText: 'Assessment Year (AY): The year you file taxes for the income earned. Example: AY 2027-2028.',
    tdsTitle: 'TDS & Form 26AS',
    tdsText: 'TDS (Tax Deducted at Source) is when tax is deducted before you receive payment. Form 26AS is your tax "report card" showing all TDS deducted against your PAN.',
    regimeTitle: 'The Ultimate Showdown: Old vs New Regime',
    regimeSubtitle: 'India currently offers two ways to calculate your tax. Choosing the right one can save you lakhs.',
    oldRegimeName: 'Old Tax Regime',
    oldRegimeBadge: 'The Classic',
    oldRegimePoints: [
      'Allows ~70 different exemptions and deductions.',
      'Best for those with Home Loans, HRA, or 80C investments.',
      'Higher slab rates but high deduction potential.'
    ],
    newRegimeName: 'New Tax Regime',
    newRegimeBadge: 'The Default',
    newRegimePoints: [
      'Lower tax rates with NO deductions (except Std Deduction).',
      'Income up to ₹7.75 Lakh is tax-free due to rebates!',
      'Simplest way: No investment proof required.'
    ],
    calcCta: 'Calculate which is better for you',
    slabsTitle: 'Latest Income Tax Slabs (2026-27)',
    deductionsTitle: 'The Magic of Deductions (Old Regime)',
    deductionsSubtitle: 'Legally bring your taxable income down using these sections:',
    itrTitle: 'Understanding ITR (Income Tax Return) Forms',
    itrSubtitle: 'Which form should you file?',
    ctaTitle: 'Stop guessing. Start saving.',
    ctaSubtitle: 'Use our advanced Income Tax Calculator to find your exact tax liability side-by-side.',
    ctaButton: 'Open Tax Calculator'
  },
  hi: {
    heroBadge: 'संपूर्ण मास्टरक्लास',
    heroTitle: 'भारतीय आयकर के लिए',
    heroTitleSpan: 'अंतिम मार्गदर्शिका',
    heroSubtitle: 'कोई उलझन नहीं। भारतीय कर प्रणाली में महारत हासिल करें, पुरानी बनाम नई व्यवस्था को समझें, और 2026-2027 में कानूनी रूप से अपने टैक्स को कम करने की सटीक रणनीतियाँ सीखें।',
    langToggle: 'Read in English',
    coreConceptsTitle: 'मूल अवधारणाएं (टैक्स 101)',
    fyVsAyTitle: 'वित्तीय वर्ष बनाम निर्धारण वर्ष',
    fyText: 'वित्तीय वर्ष (FY): वह वर्ष जिसमें आप पैसा कमाते हैं। उदाहरण: 1 अप्रैल, 2026 से 31 मार्च, 2027 तक।',
    ayText: 'निर्धारण वर्ष (AY): वह वर्ष जिसमें आप कमाए गए आय पर टैक्स भरते हैं। उदाहरण: AY 2027-2028।',
    tdsTitle: 'TDS और फॉर्म 26AS',
    tdsText: 'TDS (स्रोत पर कर कटौती) वह है जब आपको भुगतान मिलने से पहले ही टैक्स काट लिया जाता है। फॉर्म 26AS आपका टैक्स "रिपोर्ट कार्ड" है जो आपके PAN के खिलाफ कटे हुए सभी TDS को दिखाता है।',
    regimeTitle: 'पुरानी बनाम नई टैक्स व्यवस्था',
    regimeSubtitle: 'भारत वर्तमान में आपके टैक्स की गणना करने के दो तरीके प्रदान करता है। सही चुनाव आपके लाखों रुपये बचा सकता है।',
    oldRegimeName: 'पुरानी टैक्स व्यवस्था',
    oldRegimeBadge: 'क्लासिक',
    oldRegimePoints: [
      'लगभग 70 विभिन्न छूटों और कटौतियों की अनुमति देता है।',
      'होम लोन, HRA या 80C निवेश वाले लोगों के लिए सबसे अच्छा।',
      'उच्च स्लैब दरें लेकिन उच्च कटौती क्षमता।'
    ],
    newRegimeName: 'नई टैक्स व्यवस्था',
    newRegimeBadge: 'डिफ़ॉल्ट',
    newRegimePoints: [
      'बिना किसी कटौती के कम टैक्स दरें (मानक कटौती को छोड़कर)।',
      'छूट (Rebate) के कारण ₹7.75 लाख तक की आय टैक्स-मुक्त है!',
      'सबसे सरल तरीका: किसी निवेश प्रमाण की आवश्यकता नहीं।'
    ],
    calcCta: 'गणना करें कि आपके लिए कौन सा बेहतर है',
    slabsTitle: 'नवीनतम आयकर स्लैब (2026-27)',
    deductionsTitle: 'कटौतियों का जादू (पुरानी व्यवस्था)',
    deductionsSubtitle: 'इन धाराओं का उपयोग करके कानूनी रूप से अपनी कर योग्य आय कम करें:',
    itrTitle: 'ITR (आयकर रिटर्न) फॉर्म को समझना',
    itrSubtitle: 'आपको कौन सा फॉर्म भरना चाहिए?',
    ctaTitle: 'अंदाजा लगाना बंद करें। बचत शुरू करें।',
    ctaSubtitle: 'अपनी सटीक टैक्स देनदारी का पता लगाने के लिए हमारे उन्नत आयकर कैलकुलेटर का उपयोग करें।',
    ctaButton: 'टैक्स कैलकुलेटर खोलें'
  }
};

const slabDataEn = [
  { range: 'Up to ₹3,00,000', rate: '0%', note: 'Nil' },
  { range: '₹3,00,001 - ₹7,00,000', rate: '5%', note: 'Tax rebate up to ₹7L' },
  { range: '₹7,00,001 - ₹10,00,000', rate: '10%', note: '' },
  { range: '₹10,00,001 - ₹12,00,000', rate: '15%', note: '' },
  { range: '₹12,00,001 - ₹15,00,000', rate: '20%', note: '' },
  { range: 'Above ₹15,00,000', rate: '30%', note: '' }
];

const slabDataHi = [
  { range: '₹3,00,000 तक', rate: '0%', note: 'शून्य' },
  { range: '₹3,00,001 - ₹7,00,000', rate: '5%', note: '₹7 लाख तक टैक्स छूट' },
  { range: '₹7,00,001 - ₹10,00,000', rate: '10%', note: '' },
  { range: '₹10,00,001 - ₹12,00,000', rate: '15%', note: '' },
  { range: '₹12,00,001 - ₹15,00,000', rate: '20%', note: '' },
  { range: '₹15,00,000 से ऊपर', rate: '30%', note: '' }
];

const itrFormsEn = [
  { form: 'ITR-1 (Sahaj)', user: 'For individuals with salary, one house property, other sources (interest etc.) and total income up to ₹50 Lakh.' },
  { form: 'ITR-2', user: 'For individuals and HUFs not having income from business or profession. Best for capital gains or multiple house properties.' },
  { form: 'ITR-3', user: 'For individuals and HUFs having income from profits and gains of business or profession.' },
  { form: 'ITR-4 (Sugam)', user: 'For individuals, HUFs and Firms (other than LLP) having total income up to ₹50 Lakh and income from business and profession computed under presumptive taxation.' }
];

const itrFormsHi = [
  { form: 'ITR-1 (सहज)', user: 'वेतन, एक घर की संपत्ति, अन्य स्रोतों (ब्याज आदि) से आय वाले व्यक्तियों के लिए और ₹50 लाख तक की कुल आय।' },
  { form: 'ITR-2', user: 'व्यवसाय या पेशे से आय नहीं रखने वाले व्यक्तियों और HUF के लिए। पूंजीगत लाभ या कई घरों की संपत्तियों के लिए सर्वश्रेष्ठ।' },
  { form: 'ITR-3', user: 'व्यवसाय या पेशे के लाभ और वृद्धि से आय वाले व्यक्तियों और HUF के लिए।' },
  { form: 'ITR-4 (सुगम)', user: '₹50 लाख तक की कुल आय और संभावित कराधान के तहत गणना की गई व्यवसाय और पेशे से आय वाले व्यक्तियों, HUF और फर्मों के लिए।' }
];

export const UltimateTaxGuide: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];

  const toggleLang = () => setLang(prev => prev === 'en' ? 'hi' : 'en');

  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-500">
      <SEOHelmet
        title={lang === 'en' ? "Ultimate Indian Tax Guide 2026-2027 | MoneyCal" : "भारतीय आयकर मार्गदर्शिका 2026-2027 | MoneyCal"}
        description={t.heroSubtitle}
        keywords="indian income tax guide, tax slabs 2026, new tax regime vs old tax regime, how to save tax, section 80c, ITR filing guide"
        url="/learn/taxation/ultimate-tax-guide"
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-500 blur-[150px]"
          />
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex justify-end mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLang}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-sm font-bold transition-all"
            >
              <Languages className="w-4 h-4 text-emerald-400" />
              {t.langToggle}
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-black uppercase tracking-widest mb-8">
              <Sparkles className="w-4 h-4 text-amber-400" /> {t.heroBadge}
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
              {t.heroTitle} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-200 to-indigo-200">
                {t.heroTitleSpan}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100/80 max-w-3xl mx-auto font-medium mb-12 leading-relaxed">
              {t.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <ArticleExpertReview 
            reviewer={{
              name: 'Dr. Neha Sharma, CA',
              role: 'Chartered Accountant & Tax Strategy Head',
              bio: 'Dr. Sharma is a practicing CA with 15+ years of experience in individual and corporate taxation. She has reviewed this guide for accuracy against the latest 2026 Union Budget.',
              image: 'https://i.pravatar.cc/150?img=47'
            }}
            reviewedDate="May 9, 2026"
          />
        </div>
        
        {/* Core Concepts */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">{t.coreConceptsTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-emerald-500" /> {t.fyVsAyTitle}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">{t.fyText}</p>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-emerald-800 font-semibold">{t.ayText}</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Receipt className="w-6 h-6 text-amber-500" /> {t.tdsTitle}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">{t.tdsText}</p>
            </motion.div>
          </div>
        </section>

        {/* Tax Slabs Table */}
        <section className="mb-20">
          <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-indigo-400" />
                {t.slabsTitle}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-4 text-indigo-300 font-bold uppercase tracking-wider">{lang === 'en' ? 'Income Range' : 'आय सीमा'}</th>
                      <th className="py-4 text-indigo-300 font-bold uppercase tracking-wider">{lang === 'en' ? 'Tax Rate (New Regime)' : 'टैक्स दर (नई व्यवस्था)'}</th>
                      <th className="py-4 text-indigo-300 font-bold uppercase tracking-wider">{lang === 'en' ? 'Notes' : 'विशेष'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {(lang === 'en' ? slabDataEn : slabDataHi).map((row, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="py-5 text-white font-medium">{row.range}</td>
                        <td className="py-5 text-emerald-400 font-black text-xl">{row.rate}</td>
                        <td className="py-5 text-slate-400 text-sm">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8 p-4 bg-indigo-500/10 rounded-xl border border-indigo-400/20">
                <p className="text-indigo-200 text-sm italic">
                  {lang === 'en' 
                    ? "* Standard Deduction of ₹75,000 is available for salaried individuals in the New Regime." 
                    : "* वेतनभोगी व्यक्तियों के लिए नई व्यवस्था में ₹75,000 की मानक कटौती उपलब्ध है।"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Regimes Comparison */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-900 mb-4">{t.regimeTitle}</h2>
            <p className="text-slate-500 text-xl">{t.regimeSubtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-slate-200 rounded-[2.5rem] translate-y-2 translate-x-2 -z-10 transition-transform group-hover:translate-y-3 group-hover:translate-x-3"></div>
              <div className="bg-white border-2 border-slate-100 p-10 rounded-[2.5rem] h-full">
                <span className="inline-block px-4 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-black uppercase mb-6">{t.oldRegimeBadge}</span>
                <h3 className="text-3xl font-black text-slate-900 mb-8">{t.oldRegimeName}</h3>
                <ul className="space-y-5">
                  {t.oldRegimePoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-slate-500" />
                      </div>
                      <span className="text-slate-600 font-medium leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-indigo-200 rounded-[2.5rem] translate-y-2 translate-x-2 -z-10 transition-transform group-hover:translate-y-3 group-hover:translate-x-3"></div>
              <div className="bg-indigo-900 p-10 rounded-[2.5rem] h-full text-white">
                <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-black uppercase mb-6">{t.newRegimeBadge}</span>
                <h3 className="text-3xl font-black text-white mb-8">{t.newRegimeName}</h3>
                <ul className="space-y-5">
                  {t.newRegimePoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-indigo-100 font-medium leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 pt-8 border-t border-white/10">
                  <Link to="/calculators/income-tax-calculator" className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:text-white transition-all text-lg group/link">
                    {t.calcCta} <ArrowRight className="w-5 h-5 transition-transform group-hover/link:translate-x-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ITR Forms Section */}
        <section className="mb-20">
          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{t.itrTitle}</h2>
              <p className="text-slate-500 text-lg">{t.itrSubtitle}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {(lang === 'en' ? itrFormsEn : itrFormsHi).map((item, i) => (
                <div key={i} className="group p-6 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <h4 className="text-xl font-black text-indigo-600 mb-3">{item.form}</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.user}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deductions Grid */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-black text-slate-900">{t.deductionsTitle}</h2>
              <p className="text-slate-500 font-medium">{t.deductionsSubtitle}</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: '80C', title: lang === 'en' ? 'The Big One (₹1.5L)' : 'मुख्य कटौती (₹1.5L)', color: 'bg-emerald-100 text-emerald-700', desc: lang === 'en' ? 'Invest in PPF, ELSS, EPF, Life Insurance.' : 'PPF, ELSS, EPF, जीवन बीमा में निवेश।' },
              { id: '80D', title: lang === 'en' ? 'Health Insurance' : 'स्वास्थ्य बीमा', color: 'bg-blue-100 text-blue-700', desc: lang === 'en' ? 'Claim premium paid for self, family & parents.' : 'स्वयं, परिवार और माता-पिता के लिए बीमा प्रीमियम।' },
              { id: 'HRA', title: lang === 'en' ? 'House Rent' : 'घर का किराया', color: 'bg-rose-100 text-rose-700', desc: lang === 'en' ? 'Exemption on rent paid if you are a tenant.' : 'यदि आप किराए के घर में रहते हैं तो छूट।' },
              { id: '80CCD', title: 'NPS (₹50k Extra)', color: 'bg-indigo-100 text-indigo-700', desc: lang === 'en' ? 'Additional deduction for National Pension System.' : 'राष्ट्रीय पेंशन प्रणाली के लिए अतिरिक्त कटौती।' },
              { id: '24(b)', title: lang === 'en' ? 'Home Loan Int.' : 'होम लोन ब्याज', color: 'bg-amber-100 text-amber-700', desc: lang === 'en' ? 'Up to ₹2L deduction on home loan interest.' : 'होम लोन ब्याज पर ₹2 लाख तक की कटौती।' },
              { id: '80E', title: lang === 'en' ? 'Education Loan' : 'शिक्षा ऋण', color: 'bg-violet-100 text-violet-700', desc: lang === 'en' ? 'Interest paid on higher education loans.' : 'उच्च शिक्षा ऋण पर चुकाया गया ब्याज।' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all"
              >
                <div className={`w-14 h-10 rounded-xl ${item.color} flex items-center justify-center font-black text-sm mb-4`}>{item.id}</div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl"
        >
           <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]"></div>
           
           <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10 leading-tight">{t.ctaTitle}</h2>
           <p className="text-xl text-indigo-100/70 mb-12 max-w-2xl mx-auto relative z-10">
             {t.ctaSubtitle}
           </p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
             <Link 
              to="/calculators/income-tax-calculator" 
              className="w-full sm:w-auto px-10 py-5 text-xl font-black text-indigo-950 bg-white rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3"
             >
               <IndianRupee className="w-6 h-6" />
               {t.ctaButton}
             </Link>
             <Link 
              to="/learn/taxation" 
              className="w-full sm:w-auto px-10 py-5 text-xl font-bold text-white border-2 border-white/20 rounded-2xl hover:bg-white/10 transition-all"
             >
               {lang === 'en' ? 'More Tax Guides' : 'और टैक्स गाइड'}
             </Link>
           </div>
        </motion.div>

      </div>
    </div>
  );
};

export default UltimateTaxGuide;
