import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Wallet, 
  Building, 
  ChevronRight, 
  PlayCircle, 
  CheckCircle2, 
  Star,
  ArrowRight,
  Target,
  BarChart3,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

import { getLessonsByModule } from '../data/masterclassData';

const modules = [
  { id: 1, title: "The Corporate Survival Kit", subtitle: "Mastering the basics of salary structure and tax saving.", icon: Building, color: "from-blue-600 to-indigo-600" },
  { id: 2, title: "Building the Financial War Chest", subtitle: "Protecting your future before growing it.", icon: ShieldCheck, color: "from-emerald-600 to-teal-600" },
  { id: 3, title: "The Compounding Engine", subtitle: "Turning your salary into a wealth-generating machine.", icon: TrendingUp, color: "from-violet-600 to-purple-600" },
  { id: 4, title: "Goal-Based Lifestyle Design", subtitle: "Investing for what matters to you.", icon: Target, color: "from-rose-600 to-pink-600" },
  { id: 5, title: "The Advanced Wealth Tier", subtitle: "For those ready to go beyond the basics.", icon: Award, color: "from-amber-600 to-orange-600" },
];

export const CorporateMasterclass: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <SEOHelmet 
        title="Corporate Wealth Masterclass | Save & Invest Like a Pro"
        description="A complete series for corporate employees in India. Learn how to save tax, build an emergency fund, and invest in mutual funds for long-term wealth."
        keywords="corporate wealth management, salary investment guide india, tax saving for employees, sip masterclass, personal finance for engineers, money saving tips corporate, financial planning for salaried employees, how to save tax on 15 lpa salary, best investment options for corporate employees in india, early retirement planning india, corporate survival kit, wealth creation strategies 2026"
      />
      
      {/* Structured Data for Course & FAQ */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "Corporate Wealth Masterclass",
          "description": "A complete 5-part series for corporate employees in India. Learn how to save tax, build an emergency fund, and invest in mutual funds for long-term wealth.",
          "provider": {
            "@type": "Organization",
            "name": "MoneyCal",
            "sameAs": "https://moneycal.in"
          },
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "online",
            "courseWorkload": "PT5H"
          }
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Who is this masterclass for?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "This series is specifically designed for salaried corporate employees in India, especially IT professionals, managers, and executives looking to optimize their taxes, build wealth, and achieve financial independence."
              }
            },
            {
              "@type": "Question",
              "name": "Is this masterclass free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! All 5 modules and 20 lessons of the Corporate Wealth Masterclass are 100% free with no login required."
              }
            },
            {
              "@type": "Question",
              "name": "Does it cover the new tax regime for FY 2026-27?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. The lessons include strategies for both the Old and New Tax Regimes, including the latest ₹75,000 standard deduction under the new regime."
              }
            }
          ]
        })}
      </script>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0a0c10] text-white">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-full bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-full bg-blue-600/20 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-black mb-8 backdrop-blur-md"
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            ELITE SERIES: THE CORPORATE WEALTH MASTERCLASS
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.05] tracking-tight"
          >
            Master Your Money.<br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Own Your Future.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
          >
            The ultimate 5-part series designed specifically for Indian corporate professionals. 
            From your first paycheck to a multi-crore retirement corpus.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <div className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-3xl border border-white/10 backdrop-blur-xl">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Series Status</p>
                <p className="text-sm font-bold text-white uppercase tracking-tight">Free Access</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-3xl border border-white/10 backdrop-blur-xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target</p>
                <p className="text-sm font-bold text-white uppercase tracking-tight">₹10 Cr+ Corpus</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- MODULES GRID --- */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 pb-32">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {modules.map((mod, idx) => (
              <motion.div 
                key={mod.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white rounded-[40px] border border-slate-200 overflow-hidden hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left Highlight */}
                  <div className={`md:w-2 bg-gradient-to-b ${mod.color}`} />
                  
                  <div className="p-10 flex-1">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                          <mod.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Module 0{mod.id}</p>
                          <h3 className="text-2xl font-black text-slate-900 leading-none">{mod.title}</h3>
                        </div>
                      </div>
                      <span className="bg-slate-50 px-4 py-1.5 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">
                        {getLessonsByModule(mod.id).length} LESSONS
                      </span>
                    </div>

                    <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                      {mod.subtitle}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      {getLessonsByModule(mod.id).map((lesson) => (
                        <Link key={lesson.slug} to={`/series/corporate-wealth-masterclass/${lesson.slug}`} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group/lesson">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-slate-400 border border-slate-100 group-hover/lesson:bg-indigo-600 group-hover/lesson:text-white group-hover/lesson:border-indigo-600 transition-all">
                            {lesson.lessonIndex}
                          </div>
                          <span className="text-sm font-bold text-slate-700 group-hover/lesson:text-indigo-700 transition-colors">
                            {lesson.title}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-10 pt-10 border-t border-slate-100 flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                          </div>
                        ))}
                        <div className="px-3 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-500">
                          +12.4K OTHERS
                        </div>
                      </div>
                      <Link to={`/series/corporate-wealth-masterclass/${getLessonsByModule(mod.id)[0]?.slug}`} className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest group/btn hover:text-indigo-800 transition-colors">
                        Start Module <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            {/* Action Card */}
            <div className="bg-indigo-600 rounded-[40px] p-10 text-white shadow-2xl shadow-indigo-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Zap className="w-32 h-32" />
              </div>
              <h4 className="text-2xl font-black mb-4 relative z-10">Why this series?</h4>
              <p className="text-indigo-100 font-medium mb-8 leading-relaxed text-sm relative z-10">
                Most corporate employees earn well but stay poor because of poor tax planning and lack of investment discipline. This series is designed to break that cycle.
              </p>
              <ul className="space-y-4 mb-10 relative z-10">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
                  <span className="text-sm font-bold">100% India-Specific Strategies</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
                  <span className="text-sm font-bold">Latest Budget 2026 Compliant</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
                  <span className="text-sm font-bold">Actionable Checklists</span>
                </li>
              </ul>
              <button className="w-full py-5 bg-white text-indigo-600 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-colors shadow-lg">
                Download Free Roadmap
              </button>
            </div>

            {/* Quick Links Card */}
            <div className="bg-white rounded-[40px] border border-slate-200 p-8">
              <h4 className="text-lg font-black text-slate-900 mb-6">Essential Tools</h4>
              <div className="space-y-3">
                {[
                  { name: "SIP Compounding Tool", to: "/calculators/sip-calculator", icon: TrendingUp },
                  { name: "Old vs New Tax Compare", to: "/calculators/income-tax-calculator", icon: Receipt },
                  { name: "Goal-Based Planner", to: "/calculators/retirement-calculator", icon: Target },
                  { name: "Mutual Fund Returns", to: "/calculators/mutual-fund-returns-calculator", icon: BarChart3 }
                ].map(tool => (
                  <Link 
                    key={tool.name}
                    to={tool.to}
                    className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                        <tool.icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{tool.name}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-500 font-medium">Everything you need to know about the Corporate Wealth Masterclass.</p>
          </div>
          
          <div className="space-y-6">
            {[
              { q: "Who is this masterclass for?", a: "This series is specifically designed for salaried corporate employees in India, especially IT professionals, managers, and executives looking to optimize their taxes, build wealth, and achieve financial independence." },
              { q: "Is this masterclass free?", a: "Yes! All 5 modules and 20 lessons of the Corporate Wealth Masterclass are 100% free with no login required." },
              { q: "Does it cover the new tax regime for FY 2026-27?", a: "Absolutely. The lessons include strategies for both the Old and New Tax Regimes, including the latest ₹75,000 standard deduction under the new regime." },
              { q: "Do I need prior finance knowledge?", a: "Not at all. We start from the absolute basics like reading your CTC and salary slip (Module 1) and gradually move to advanced concepts like International Investing and Estate Planning (Module 5)." }
            ].map((faq, i) => (
              <div key={i} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-indigo-100 transition-colors">
                <h3 className="text-lg font-black text-slate-900 mb-3 flex items-start gap-3">
                  <span className="text-indigo-500">Q.</span> {faq.q}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed ml-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="bg-slate-900 py-32 text-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-5">
           <Building className="w-full h-full scale-150 rotate-12 text-white" />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
            Ready to Build Your<br />
            <span className="text-indigo-400">Financial Fortress?</span>
          </h2>
          <p className="text-slate-400 text-lg font-medium mb-12 max-w-2xl mx-auto">
            Don't let your appraisal go to waste. Start Module 1 today and take control of your financial destiny.
          </p>
          <Link 
            to="/calculators"
            className="inline-flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all"
          >
            Explore All Free Tools <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

// Subcomponent for easier icon importing
function Receipt(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 17.5v-11" />
    </svg>
  );
}

export default CorporateMasterclass;
