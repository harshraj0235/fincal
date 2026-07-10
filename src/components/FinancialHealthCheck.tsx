import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Heart, TrendingUp, Shield, Zap, ArrowRight, RotateCcw,
  ChevronRight, Sparkles, Trophy, Target, AlertTriangle, CheckCircle
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   FINANCIAL HEALTH CHECK — Interactive Homepage Widget
   Keeps users engaged 2-5 minutes. Surprise factor: instant personalized score.
   ═══════════════════════════════════════════════════════════════════════════ */

interface Question {
  id: string;
  text: string;
  emoji: string;
  options: { label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 'emergency',
    text: 'How many months of expenses do you have saved as an emergency fund?',
    emoji: '🛡️',
    options: [
      { label: 'No emergency fund', score: 0 },
      { label: '1-2 months', score: 5 },
      { label: '3-6 months', score: 15 },
      { label: '6+ months', score: 20 },
    ],
  },
  {
    id: 'investment',
    text: 'What percentage of your monthly income do you invest (SIP, FD, PPF, etc.)?',
    emoji: '📈',
    options: [
      { label: '0% — I don\'t invest yet', score: 0 },
      { label: '1-10%', score: 5 },
      { label: '10-20%', score: 15 },
      { label: '20%+ — I\'m aggressive!', score: 20 },
    ],
  },
  {
    id: 'insurance',
    text: 'Do you have adequate health and life insurance coverage?',
    emoji: '🏥',
    options: [
      { label: 'No insurance at all', score: 0 },
      { label: 'Only employer-provided', score: 5 },
      { label: 'Personal health OR life', score: 12 },
      { label: 'Both health + term life', score: 20 },
    ],
  },
  {
    id: 'debt',
    text: 'What is your total EMI as a percentage of your monthly income?',
    emoji: '💳',
    options: [
      { label: '50%+ (High debt stress)', score: 0 },
      { label: '30-50%', score: 5 },
      { label: '10-30%', score: 15 },
      { label: 'Below 10% or no EMIs', score: 20 },
    ],
  },
  {
    id: 'taxplan',
    text: 'How do you handle your income tax planning?',
    emoji: '📋',
    options: [
      { label: 'I don\'t plan — TDS handles it', score: 0 },
      { label: 'Last-minute 80C investments', score: 5 },
      { label: 'I plan at the start of the year', score: 15 },
      { label: 'Full optimization (80C + 80D + HRA + NPS)', score: 20 },
    ],
  },
];

function getScoreInfo(score: number) {
  if (score >= 80) return { label: 'Excellent', color: 'text-emerald-600', bg: 'bg-emerald-500', ring: 'ring-emerald-200', gradient: 'from-emerald-500 to-teal-500', emoji: '🏆', advice: 'You\'re a financial rockstar! Keep optimizing with advanced tools.' };
  if (score >= 60) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-500', ring: 'ring-blue-200', gradient: 'from-blue-500 to-indigo-500', emoji: '👍', advice: 'You\'re on a solid path. A few tweaks can take you to the next level.' };
  if (score >= 40) return { label: 'Needs Work', color: 'text-amber-600', bg: 'bg-amber-500', ring: 'ring-amber-200', gradient: 'from-amber-500 to-orange-500', emoji: '⚠️', advice: 'You have a foundation, but there are critical gaps to address.' };
  return { label: 'Critical', color: 'text-rose-600', bg: 'bg-rose-500', ring: 'ring-rose-200', gradient: 'from-rose-500 to-red-500', emoji: '🚨', advice: 'Your finances need urgent attention. Start with the basics below.' };
}

/* ── Animated Counter ── */
function AnimatedCounter({ target, duration = 2000, suffix = '' }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString('en-IN')}{suffix}</span>;
}

/* ── Gauge Ring (SVG) ── */
function ScoreGauge({ score, info }: { score: number; info: ReturnType<typeof getScoreInfo> }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <motion.circle
          cx="80" cy="80" r={radius} fill="none"
          stroke="url(#scoreGradient)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={score >= 60 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444'} />
            <stop offset="100%" stopColor={score >= 60 ? '#06b6d4' : score >= 40 ? '#f97316' : '#dc2626'} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          className={`text-5xl font-black ${info.color}`}
        >
          {score}
        </motion.span>
        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">/ 100</span>
      </div>
    </div>
  );
}

/* ── Main Widget ── */
export const FinancialHealthCheck: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(-1); // -1 = intro screen
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const totalScore = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const info = getScoreInfo(totalScore);

  const handleAnswer = (questionId: string, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(prev => prev + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 400);
    }
  };

  const reset = () => {
    setCurrentQ(-1);
    setAnswers({});
    setShowResult(false);
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-100 rounded-full blur-[120px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-[120px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Animated Stats Bar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { label: 'Calculations Done', value: 5200000, suffix: '+', icon: Zap, color: 'from-violet-500 to-indigo-600' },
            { label: 'Free Tools Available', value: 200, suffix: '+', icon: Target, color: 'from-blue-500 to-cyan-500' },
            { label: 'Happy Users', value: 1800000, suffix: '+', icon: Heart, color: 'from-rose-500 to-pink-500' },
            { label: 'Tax Saved (Est.)', value: 450, suffix: ' Cr+', icon: TrendingUp, color: 'from-emerald-500 to-teal-500' },
          ].map(({ label, value, suffix, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-slate-100 p-6 text-center shadow-sm hover:shadow-lg transition-shadow group"
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">
                <AnimatedCounter target={value} suffix={suffix} />
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Interactive Health Check Card ── */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-100 to-emerald-100 text-violet-700 text-xs font-black uppercase tracking-widest mb-4">
                <Sparkles className="w-4 h-4" /> Interactive · 60 Seconds
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                What's Your Financial Health Score?
              </h2>
              <p className="text-slate-500 text-lg">Answer 5 quick questions. Get an instant, personalized diagnosis.</p>
            </motion.div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden min-h-[380px] relative">
            <AnimatePresence mode="wait">

              {/* Intro Screen */}
              {currentQ === -1 && !showResult && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="p-10 md:p-14 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-violet-200">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">Ready for your Financial Check-up?</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    We'll ask about your savings, investments, insurance, debt, and tax planning. Your data stays 100% on your device — we never store anything.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentQ(0)}
                    className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-violet-300/40 hover:shadow-violet-300/60 transition-all"
                  >
                    Start Free Check-up <ChevronRight className="w-5 h-5" />
                  </motion.button>
                  <p className="text-xs text-slate-400 mt-5 flex items-center justify-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" /> 100% Private · No login required
                  </p>
                </motion.div>
              )}

              {/* Question Screen */}
              {currentQ >= 0 && !showResult && (
                <motion.div
                  key={`q-${currentQ}`}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 md:p-12"
                >
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-sm font-bold text-slate-400">Question {currentQ + 1} of {questions.length}</span>
                    <div className="flex gap-1.5">
                      {questions.map((_, i) => (
                        <div key={i} className={`h-2 w-8 rounded-full transition-colors ${i <= currentQ ? 'bg-violet-500' : 'bg-slate-200'}`} />
                      ))}
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <span className="text-4xl mb-4 block">{questions[currentQ].emoji}</span>
                    <h3 className="text-xl font-black text-slate-900 leading-tight">
                      {questions[currentQ].text}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {questions[currentQ].options.map((option, oi) => (
                      <motion.button
                        key={oi}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(questions[currentQ].id, option.score)}
                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-semibold ${
                          answers[questions[currentQ].id] === option.score
                            ? 'border-violet-500 bg-violet-50 text-violet-700'
                            : 'border-slate-100 hover:border-violet-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Result Screen */}
              {showResult && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 md:p-12 text-center"
                >
                  <ScoreGauge score={totalScore} info={info} />

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h3 className="text-2xl font-black text-slate-900 mt-6 mb-2">
                      {info.emoji} Your Score: <span className={info.color}>{info.label}</span>
                    </h3>
                    <p className="text-slate-500 mb-8 max-w-md mx-auto">{info.advice}</p>

                    {/* Personalized Recommendations */}
                    <div className="space-y-3 text-left mb-8">
                      {totalScore < 80 && answers['emergency'] < 15 && (
                        <Link to="/calculators/fd-calculator" className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100 hover:bg-amber-100 transition-colors group">
                          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                          <span className="text-sm font-bold text-amber-800 flex-1">Build a 6-month emergency fund → Use FD Calculator</span>
                          <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                      {answers['investment'] < 15 && (
                        <Link to="/calculators/sip-calculator" className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors group">
                          <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <span className="text-sm font-bold text-blue-800 flex-1">Start a SIP with just ₹500/month → SIP Calculator</span>
                          <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                      {answers['taxplan'] < 15 && (
                        <Link to="/learn/taxation/ultimate-tax-guide" className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-colors group">
                          <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                          <span className="text-sm font-bold text-indigo-800 flex-1">Optimize your taxes — read the Ultimate Tax Guide</span>
                          <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                      {totalScore >= 80 && (
                        <Link to="/calculators/retirement-calculator" className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 transition-colors group">
                          <Trophy className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          <span className="text-sm font-bold text-emerald-800 flex-1">You're crushing it! Plan your early retirement →</span>
                          <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>

                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" /> Retake Quiz
                    </button>
                  </motion.div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialHealthCheck;
