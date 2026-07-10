import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Landmark, Shield, ArrowRight, IndianRupee, Sparkles } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   INVESTMENT COMPARISON WIDGET
   Interactive "SIP vs FD vs PPF" comparison — huge search traffic magnet.
   Users adjust amount & years, see real-time animated bar comparison.
   ═══════════════════════════════════════════════════════════════════════════ */

function formatINR(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
}

function calcSIP(monthly: number, rate: number, years: number): number {
  const r = rate / 100 / 12;
  const n = years * 12;
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

function calcFD(principal: number, rate: number, years: number): number {
  const n = 4; // quarterly compounding
  return principal * Math.pow(1 + rate / 100 / n, n * years);
}

function calcPPF(annual: number, rate: number, years: number): number {
  let balance = 0;
  for (let i = 0; i < years; i++) {
    balance = (balance + annual) * (1 + rate / 100);
  }
  return balance;
}

const investments = [
  { id: 'sip', name: 'SIP (Equity MF)', icon: TrendingUp, rate: 12, color: 'from-violet-500 to-indigo-600', bg: 'bg-violet-50', text: 'text-violet-700', ring: 'ring-violet-200', link: '/calculators/sip-calculator', tag: 'Highest Returns' },
  { id: 'fd', name: 'Fixed Deposit', icon: Landmark, rate: 7.1, color: 'from-blue-500 to-cyan-600', bg: 'bg-blue-50', text: 'text-blue-700', ring: 'ring-blue-200', link: '/calculators/fd-calculator', tag: 'Safest' },
  { id: 'ppf', name: 'PPF (Tax-Free)', icon: Shield, rate: 7.1, color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-200', link: '/calculators/ppf-calculator', tag: 'Tax-Free' },
];

export const InvestmentComparison: React.FC = () => {
  const [amount, setAmount] = useState(10000);
  const [years, setYears] = useState(15);

  const results = useMemo(() => {
    const totalInvested = amount * 12 * years;
    return investments.map(inv => {
      let maturity: number;
      if (inv.id === 'sip') maturity = calcSIP(amount, inv.rate, years);
      else if (inv.id === 'fd') maturity = calcFD(totalInvested, inv.rate, years);
      else maturity = calcPPF(amount * 12, inv.rate, years);
      return { ...inv, maturity, totalInvested, gain: maturity - totalInvested };
    });
  }, [amount, years]);

  const maxMaturity = Math.max(...results.map(r => r.maturity));

  return (
    <section className="py-20 lg:py-28 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-100 to-emerald-100 text-violet-700 text-xs font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4" /> Live Comparison
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
            SIP vs FD vs PPF — Where Does Your Money Grow Fastest?
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Adjust the sliders and watch returns update in real-time. Same monthly investment, dramatically different outcomes.
          </p>
        </div>

        {/* Controls */}
        <div className="max-w-xl mx-auto mb-14 bg-gray-50 rounded-3xl p-8 border border-gray-100">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-gray-700">Monthly Investment</label>
              <span className="text-lg font-black text-violet-600">₹{amount.toLocaleString('en-IN')}/mo</span>
            </div>
            <input
              type="range" min="1000" max="100000" step="1000" value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>₹1,000</span><span>₹1,00,000</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-gray-700">Investment Period</label>
              <span className="text-lg font-black text-violet-600">{years} Years</span>
            </div>
            <input
              type="range" min="1" max="30" step="1" value={years}
              onChange={e => setYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1 Year</span><span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-3 gap-8">
          {results.map((inv, i) => {
            const barPct = (inv.maturity / maxMaturity) * 100;
            const Icon = inv.icon;
            const isWinner = inv.maturity === maxMaturity;
            return (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl border-2 p-8 transition-all hover:shadow-xl ${isWinner ? 'border-violet-300 shadow-lg shadow-violet-100 bg-violet-50/30' : 'border-gray-100 bg-white'}`}
              >
                {isWinner && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-black rounded-full shadow-lg">
                    🏆 WINNER
                  </span>
                )}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${inv.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900">{inv.name}</h3>
                    <span className={`text-xs font-bold ${inv.text} ${inv.bg} px-2 py-0.5 rounded-full`}>{inv.tag} · {inv.rate}% p.a.</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Total Invested</span>
                    <p className="text-lg font-black text-gray-600">{formatINR(inv.totalInvested)}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Maturity Value</span>
                    <p className={`text-2xl font-black ${inv.text}`}>{formatINR(inv.maturity)}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Wealth Gain</span>
                    <p className="text-lg font-black text-emerald-600">+{formatINR(inv.gain)}</p>
                  </div>
                </div>

                {/* Growth Bar */}
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${barPct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                    className={`h-full rounded-full bg-gradient-to-r ${inv.color}`}
                  />
                </div>

                <Link
                  to={inv.link}
                  className={`inline-flex items-center gap-2 text-sm font-bold ${inv.text} hover:underline group`}
                >
                  Open {inv.name.split(' ')[0]} Calculator <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* SEO Text */}
        <div className="mt-14 text-center">
          <p className="text-sm text-gray-400 max-w-3xl mx-auto leading-relaxed">
            <strong>SIP vs FD vs PPF:</strong> Equity SIPs historically deliver 12-15% CAGR over 15+ years, making them the best wealth-builder for long-term goals. Fixed Deposits offer guaranteed 7-7.5% returns but are fully taxable. PPF provides 7.1% tax-free returns with EEE benefits (Exempt-Exempt-Exempt), ideal for conservative investors. For optimal results, financial advisors recommend a mix of all three based on your risk profile and goals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InvestmentComparison;
