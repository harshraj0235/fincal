import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Heart, 
  Car, 
  Home, 
  Plane, 
  Activity, 
  Scale, 
  ArrowRight,
  CheckCircle2,
  FileText,
  HelpCircle,
  Zap
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

const InsuranceHub: React.FC = () => {
  const categories = [
    { title: 'Life Insurance', icon: <Shield className="w-6 h-6" />, link: '/insurance-tools/life-insurance-calculator', desc: 'Secure your family\'s future.' },
    { title: 'Health Insurance', icon: <Heart className="w-6 h-6" />, link: '/insurance-tools/health-insurance-estimator', desc: 'Cover medical emergencies.' },
    { title: 'Car Insurance', icon: <Car className="w-6 h-6" />, link: '/insurance-tools/car-insurance-calculator', desc: 'Protect your vehicle.' },
    { title: 'Term Insurance', icon: <Activity className="w-6 h-6" />, link: '/insurance-tools/term-insurance-planner', desc: 'Pure protection at low cost.' },
    { title: 'Travel Insurance', icon: <Plane className="w-6 h-6" />, link: '/insurance-tools/travel-insurance-selector', desc: 'Safe journeys worldwide.' },
    { title: 'Home Insurance', icon: <Home className="w-6 h-6" />, link: '/insurance-tools/home-insurance-estimator', desc: 'Keep your sanctuary safe.' }
  ];

  const guides = [
    { title: 'Term vs ULIP: Which is better?', slug: 'term-vs-ulip', type: 'Comparison' },
    { title: 'How to Choose Health Insurance?', slug: 'choosing-health-insurance', type: 'Guide' },
    { title: 'Top 10 Rider Benefits in 2025', slug: 'insurance-riders', type: 'Insights' }
  ];

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title="Insurance Hub - Compare, Calculate & Choose | MoneyCal"
        description="Navigate the complex world of insurance with MoneyCal. Compare plans, use our expert calculators, and read detailed comparison guides."
        url="/insurance-hub"
      />

      <div className="min-h-screen bg-slate-50 pb-20">
        {/* Premium Hero */}
        <div className="bg-[#0f172a] text-white pt-32 pb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6 uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  Smart Insurance Planning
                </div>
                <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight leading-tight">
                  Protect What <span className="text-blue-400">Matters</span> Most
                </h1>
                <p className="text-lg text-slate-400 mb-8 max-w-xl">
                  Don't just buy insurance, understand it. We provide expert-reviewed calculators and comparison guides to help you find the perfect coverage.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No Hidden Costs
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Independent Advice
                  </div>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                {categories.slice(0, 4).map((cat, idx) => (
                  <Link 
                    key={idx} 
                    to={cat.link}
                    className="p-6 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-400/50 transition-all group backdrop-blur-sm"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <h3 className="font-bold text-base mb-1">{cat.title}</h3>
                    <p className="text-xs text-slate-500">{cat.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Tools Grid */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <div className="w-2 h-8 bg-blue-500 rounded-full" />
                Insurance Calculators
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {categories.map((cat, idx) => (
                  <Link 
                    key={idx} 
                    to={cat.link}
                    className="flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                        {cat.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{cat.title}</h4>
                        <p className="text-xs text-slate-500">Free Calculator</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>

              {/* Featured Comparison Section */}
              <div className="mt-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] p-8 sm:p-12 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                 <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                       <h3 className="text-3xl font-black mb-4">Direct Comparison Tables</h3>
                       <p className="text-blue-100 mb-8 leading-relaxed">
                         Compare top insurance plans side-by-side. See exclusions, wait periods, and premium estimates across major providers.
                       </p>
                       <Link to="/insurance/compare/term-plans" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-all">
                         Try Comparison Tool <Scale className="w-4 h-4" />
                       </Link>
                    </div>
                    <div className="w-full md:w-64 flex flex-col gap-3">
                       <div className="h-10 bg-white/10 rounded-xl border border-white/20"></div>
                       <div className="h-10 bg-white/10 rounded-xl border border-white/20 opacity-70"></div>
                       <div className="h-10 bg-white/10 rounded-xl border border-white/20 opacity-40"></div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Sidebar Resources */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 text-indigo-800">
                  <FileText className="w-5 h-5 text-blue-500" /> Expert Guides
                </h3>
                <div className="space-y-6">
                  {guides.map((guide, idx) => (
                    <Link key={idx} to={`/insurance/guide/${guide.slug}`} className="block group">
                      <span className="text-[10px] font-bold uppercase text-blue-500 mb-1 block">{guide.type}</span>
                      <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">
                        {guide.title}
                      </h4>
                    </Link>
                  ))}
                </div>
                <button className="w-full mt-8 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  Browse All Guides
                </button>
              </div>

              <div className="bg-indigo-900 rounded-[32px] p-8 text-white">
                <HelpCircle className="w-10 h-10 text-blue-400 mb-6" />
                <h3 className="text-xl font-bold mb-4">Confused about insurance?</h3>
                <p className="text-indigo-200 text-sm mb-6 leading-relaxed">
                  Join 10,000+ users who receive our weekly "Insurance Simplified" newsletter.
                </p>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-400 font-bold transition-all shadow-lg shadow-blue-500/20">
                  Subscribe Now
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default InsuranceHub;
