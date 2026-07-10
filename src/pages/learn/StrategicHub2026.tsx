import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, Shield, Zap, TrendingUp, Search, ArrowRight, Star, 
  Target, Calculator, BookOpen, AlertTriangle, Briefcase, 
  Globe, Smartphone, CheckCircle2, Award, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import AuthorityDashboard from '../../components/silos/AuthorityDashboard';

// Import all silos to show them in the hub
const silos = [
  {
    id: 'msme-subsidies',
    name: 'MSME & Business Subsidies',
    icon: <Briefcase className="w-8 h-8" />,
    description: 'PMEGP, Mudra, and local state subsidies for 2026.',
    color: 'from-blue-600 to-cyan-600',
    route: '/msme-subsidies/pmegp-margin-money-subsidy-guide-2026'
  },
  {
    id: 'land-records',
    name: 'Digital Land Records',
    icon: <Globe className="w-8 h-8" />,
    description: 'Verify titles, maps, and ownership across all 28 states.',
    color: 'from-emerald-600 to-teal-600',
    route: '/land-records/bhu-naksha-digital-land-records-verification-2026'
  },
  {
    id: 'taxation-2026',
    name: 'Tax Optimization 2026',
    icon: <Target className="w-8 h-8" />,
    description: 'Master the new SGB taxation and AI-powered audit flags.',
    color: 'from-orange-600 to-red-600',
    route: '/taxation-2026/sgb-taxation-rules-capital-gains-2026'
  },
  {
    id: 'scam-diagnostics',
    name: 'Scam Defense Hub',
    icon: <Shield className="w-8 h-8" />,
    description: 'Identify UPI, Deepfake, and Digital Arrest scams instantly.',
    color: 'from-red-600 to-rose-600',
    route: '/scam-diagnostics/upi-refund-scam-protection-diagnosis-2026'
  },
  {
    id: 'youth-banking',
    name: 'Youth Financial Launchpad',
    icon: <Smartphone className="w-8 h-8" />,
    description: 'Credit score building and zero-fee banking for Gen Z.',
    color: 'from-purple-600 to-indigo-600',
    route: '/youth-banking/gen-z-credit-score-building-strategies-2026'
  },
  {
    id: 'trading-terminals',
    name: 'Next-Gen Trading',
    icon: <Zap className="w-8 h-8" />,
    description: 'AI algorithmic trading and risk management for retail.',
    color: 'from-blue-700 to-indigo-800',
    route: '/trading-terminals/algo-trading-risk-management-retail-2026'
  },
  {
    id: 'macro-trends',
    name: 'Macro Synthesis',
    icon: <TrendingUp className="w-8 h-8" />,
    description: 'Indian demographic shifts and investment opportunities.',
    color: 'from-slate-700 to-slate-900',
    route: '/macro-trends/india-demographic-dividend-investment-2026'
  },
  {
    id: 'insurance-niche',
    name: 'Niche Insurance',
    icon: <Award className="w-8 h-8" />,
    description: 'Parametric and cyber insurance for the modern economy.',
    color: 'from-teal-700 to-emerald-800',
    route: '/insurance-niche/parametric-weather-insurance-india-2026'
  }
];

const StrategicHub2026: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHelmet 
        title="2026 Strategic Financial Hub | MoneyCal AI-Proof Wealth Strategies"
        description="Navigate the 2026 Indian financial landscape with AI-proof strategies for MSME, Tax, Banking, and Scam Defense. 150+ interactive lessons and tools."
        keywords="2026 finance, AI-proof strategy, MSME subsidies 2026, tax optimization 2026, scam prevention, youth banking, MoneyCal strategic hub"
        url="/2026-financial-strategy"
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-slate-900 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-[100px] animate-pulse delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              THE FUTURE IS HERE
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
              2026 Strategic <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Financial Hub
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Equipping 1 Billion Indians with AI-proof wealth strategies, 
              interactive diagnostics, and localized financial intelligence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#silos" className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
                Explore Silos
              </a>
              <Link to="/calculators" className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-700 transition-all">
                Interactive Tools
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Strategic Pillars Grid */}
      <section id="silos" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Strategic Pillars</h2>
            <p className="text-lg text-slate-600">Specialized content silos designed for the next era of Indian finance.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {silos.map((silo, index) => (
              <motion.div
                key={silo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to={silo.route} className="block h-full">
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-100 hover:border-blue-400 h-full flex flex-col">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${silo.color} text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      {silo.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{silo.name}</h3>
                    <p className="text-slate-600 mb-6 flex-1">{silo.description}</p>
                    <div className="flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
                      Access Silo <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Authority Tracking / Proof of Work */}
      <section className="py-24 bg-slate-100 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Shield className="w-32 h-32" />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
            Strategic Authority Tracking
          </h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-sm font-bold text-blue-600 mb-2">VERIFIED CONTENT</p>
              <h4 className="text-xl font-bold mb-4">Human-First, AI-Bypass Strategy</h4>
              <p className="text-slate-600">
                All strategies on this hub are synthesized from localized Indian government data, 
                real-time market sentiment, and verified financial frameworks. We prioritize 
                interactive utility over generic information.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Content Items', value: '150+' },
                { label: 'Interactive Tools', value: '12+' },
                { label: 'Verified Sources', value: '50+' },
                { label: 'Update Frequency', value: 'Daily' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Authority Dashboard */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <AuthorityDashboard />
        </div>
      </section>

      {/* CTA: Join the Movement */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Stay Ahead of the Curve</h2>
          <p className="text-xl text-slate-600 mb-10">
            The financial landscape of 2026 rewards the informed. 
            Use our interactive diagnostic tools to secure your future today.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/learn" className="text-lg font-bold text-slate-900 hover:text-blue-600 flex items-center gap-2 transition-colors">
              <BookOpen className="w-6 h-6" /> Back to Learn Hub
            </Link>
            <Link to="/calculators" className="text-lg font-bold text-slate-900 hover:text-blue-600 flex items-center gap-2 transition-colors">
              <Calculator className="w-6 h-6" /> View All Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StrategicHub2026;
