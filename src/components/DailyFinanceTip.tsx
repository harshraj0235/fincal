import React, { useState, useEffect } from 'react';
import { Lightbulb, TrendingUp, Shield, Landmark, Receipt, Wallet, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════════════
   DAILY FINANCE TIP — Auto-rotating banner that increases dwell time
   Shows a new tip every 8 seconds. Links to relevant tools.
   ═══════════════════════════════════════════════════════════════════════════ */

const tips = [
  { text: '💡 Did you know? Investing ₹5,000/month in SIP at 12% return can grow to ₹1.12 Crore in 25 years!', link: '/calculators/sip-calculator', cta: 'Try SIP Calculator', color: 'from-violet-600 to-indigo-600' },
  { text: '🏠 Home Loan Tip: Making just 1 extra EMI per year can reduce your 20-year loan by 3+ years.', link: '/calculators/home-loan-calculator', cta: 'Home Loan Calculator', color: 'from-blue-600 to-cyan-600' },
  { text: '📋 Tax Saving: Section 80C + 80D + NPS can save you up to ₹2.5 Lakh in taxes every year!', link: '/learn/taxation/ultimate-tax-guide', cta: 'Read Tax Guide', color: 'from-emerald-600 to-teal-600' },
  { text: '⚡ New Regime Alert: Income up to ₹7.75 Lakh is completely TAX FREE under the New Tax Regime 2026!', link: '/calculators/income-tax-calculator', cta: 'Calculate Tax', color: 'from-amber-600 to-orange-600' },
  { text: '🏦 FD vs SIP: A ₹10L FD at 7% gives ₹7L interest in 10 years. The same in SIP at 12% gives ₹13L+!', link: '/calculators/fd-calculator', cta: 'Compare Returns', color: 'from-rose-600 to-pink-600' },
  { text: '💳 Credit Score: A CIBIL score above 750 can save you 1-2% on loan interest — that\'s lakhs over time!', link: '/learn/credit-score', cta: 'Learn More', color: 'from-indigo-600 to-purple-600' },
  { text: '🛡️ Emergency Fund Rule: Keep 6 months of expenses liquid. Use FD or Liquid Funds for safety.', link: '/calculators/fd-calculator', cta: 'Plan Emergency Fund', color: 'from-teal-600 to-emerald-600' },
];

export const DailyFinanceTip: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  if (dismissed) return null;

  const tip = tips[currentTip];

  return (
    <div className={`relative bg-gradient-to-r ${tip.color} overflow-hidden transition-colors duration-700`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTip}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex items-center justify-center gap-4 text-sm sm:text-base"
          >
            <span className="text-white/90 font-medium hidden sm:inline">{tip.text}</span>
            <span className="text-white/90 font-medium sm:hidden">{tip.text.substring(0, 60)}...</span>
            <Link
              to={tip.link}
              className="flex-shrink-0 px-4 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-black rounded-full backdrop-blur-sm border border-white/20 transition-all hover:scale-105"
            >
              {tip.cta} →
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
          {tips.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentTip(i)}
              className={`h-1.5 rounded-full transition-all ${i === currentTip ? 'w-6 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-white/50 hover:text-white transition-colors flex-shrink-0"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DailyFinanceTip;
