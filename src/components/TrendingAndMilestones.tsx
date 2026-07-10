import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, TrendingUp, ArrowRight, Flame, Clock, Users } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   TRENDING QUERIES — "People Also Search" section
   Targets long-tail keywords. Each chip links to a relevant calculator.
   ═══════════════════════════════════════════════════════════════════════════ */

const trendingQueries = [
  { q: 'EMI for ₹50 lakh home loan at 8.5%', link: '/calculators/home-loan-calculator', hot: true },
  { q: 'SIP ₹5000 per month for 20 years', link: '/calculators/sip-calculator', hot: true },
  { q: 'Income tax on ₹12 lakh salary 2026', link: '/calculators/income-tax-calculator', hot: true },
  { q: 'PPF maturity after 15 years', link: '/calculators/ppf-calculator', hot: false },
  { q: 'Car loan EMI for ₹8 lakh', link: '/calculators/car-loan-calculator', hot: false },
  { q: 'GST on ₹1 lakh invoice at 18%', link: '/calculators/gst-calculator', hot: false },
  { q: 'FD interest rates 2026 comparison', link: '/calculators/fd-calculator', hot: true },
  { q: 'Old vs New tax regime calculator', link: '/calculators/income-tax-calculator', hot: true },
  { q: 'Mutual fund returns 10 years India', link: '/calculators/mutual-fund-returns-calculator', hot: false },
  { q: 'NPS pension at 60 calculator', link: '/calculators/nps-calculator', hot: false },
  { q: 'Step up SIP ₹10000 with 10% increase', link: '/calculators/step-up-sip-calculator', hot: false },
  { q: 'Stamp duty charges Maharashtra 2026', link: '/calculators/stamp-duty-calculator', hot: false },
  { q: 'Retirement corpus for ₹50000 monthly', link: '/calculators/retirement-calculator', hot: true },
  { q: 'Personal loan EMI ₹3 lakh at 12%', link: '/calculators/personal-loan-calculator', hot: false },
  { q: 'Sukanya Samriddhi maturity value', link: '/calculators/sukanya-samriddhi-calculator', hot: false },
  { q: 'Compound interest on ₹1 lakh 5 years', link: '/calculators/compound-interest-calculator', hot: false },
];

const milestones = [
  { amount: '₹1 Lakh', sip: '₹2,700/mo × 3 yrs', icon: '🌱', color: 'from-emerald-400 to-emerald-600', desc: 'Your first big savings milestone' },
  { amount: '₹10 Lakh', sip: '₹5,000/mo × 10 yrs', icon: '🚀', color: 'from-blue-400 to-blue-600', desc: 'Emergency fund + car down payment' },
  { amount: '₹50 Lakh', sip: '₹8,000/mo × 18 yrs', icon: '🏠', color: 'from-violet-400 to-violet-600', desc: 'House down payment ready' },
  { amount: '₹1 Crore', sip: '₹5,000/mo × 25 yrs', icon: '🏆', color: 'from-amber-400 to-amber-600', desc: 'The Crorepati Club at 12% CAGR' },
  { amount: '₹5 Crore', sip: '₹15,000/mo × 25 yrs', icon: '👑', color: 'from-rose-400 to-rose-600', desc: 'Early retirement territory' },
];

export const TrendingAndMilestones: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleQueries = showAll ? trendingQueries : trendingQueries.slice(0, 8);

  return (
    <>
      {/* Trending Queries */}
      <section className="py-20 lg:py-24 bg-slate-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">Trending Financial Searches</h2>
              <p className="text-sm text-gray-500">What Indians are calculating right now</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {visibleQueries.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  to={item.link}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl border text-sm font-semibold transition-all hover:scale-105 hover:shadow-md active:scale-95 ${
                    item.hot
                      ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 text-orange-800 hover:border-orange-300'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-blue-200 hover:text-blue-700'
                  }`}
                >
                  <Search className="w-3.5 h-3.5 opacity-40" />
                  {item.q}
                  {item.hot && <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-black">HOT</span>}
                </Link>
              </motion.div>
            ))}
          </div>

          {!showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-violet-600 hover:text-violet-800 transition-colors"
            >
              Show all {trendingQueries.length} trending queries <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </section>

      {/* Money Milestones */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
              🎯 Money Milestones — How Much SIP Do You Need?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              From your first ₹1 Lakh to the ₹5 Crore club. See exactly how much monthly SIP gets you there at 12% equity returns.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className="relative bg-white rounded-3xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-xl transition-all group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {m.icon}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">{m.amount}</h3>
                <p className="text-xs font-bold text-violet-600 bg-violet-50 rounded-full px-3 py-1 inline-block mb-3">{m.sip}</p>
                <p className="text-xs text-gray-400">{m.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/calculators/sip-calculator"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-violet-300/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Calculate Your Milestone <TrendingUp className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrendingAndMilestones;
