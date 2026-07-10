import React, { useState, useRef } from 'react';
import {
    Target, Shield,
    ArrowRight, Download, Sparkles,
    RefreshCcw, BrainCircuit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import SEOHelmet from '../../../components/SEOHelmet';

/* ─────────────────────────────────────────────────────────────────────────── */
/* Constants                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

interface Question {
    id: number;
    text: string;
    options: { text: string; score: number }[];
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What is your primary investment goal?",
        options: [
            { text: "Capital Preservation (Keep money safe)", score: 1 },
            { text: "Stable Income (Dividends/Interest)", score: 2 },
            { text: "Wealth Growth (Beating Inflation)", score: 3 },
            { text: "Aggressive Returns (Max Growth)", score: 4 }
        ]
    },
    {
        id: 2,
        text: "If your portfolio dropped 20% in a month, you would:",
        options: [
            { text: "Sell everything immediately", score: 1 },
            { text: "Sell a portion to reduce risk", score: 2 },
            { text: "Do nothing and wait", score: 3 },
            { text: "Buy more while it's cheap", score: 4 }
        ]
    },
    {
        id: 3,
        text: "How long do you plan to keep your money invested?",
        options: [
            { text: "Less than 2 years", score: 1 },
            { text: "2 to 5 years", score: 2 },
            { text: "5 to 10 years", score: 3 },
            { text: "10+ years", score: 4 }
        ]
    },
    {
        id: 4,
        text: "What is your age group?",
        options: [
            { text: "55+", score: 1 },
            { text: "40 - 55", score: 2 },
            { text: "30 - 40", score: 3 },
            { text: "Under 30", score: 4 }
        ]
    }
];

const PROFILES = [
    {
        min: 0, max: 6,
        name: "Conservative",
        color: "#10B981",
        desc: "Safety first. You prefer government bonds, FDs, and highly stable assets.",
        allocation: { Debt: 80, Equity: 15, Gold: 5 }
    },
    {
        min: 7, max: 10,
        name: "Moderate",
        color: "#6366F1",
        desc: "A balanced approach aiming for steady growth with acceptable fluctuations.",
        allocation: { Debt: 50, Equity: 40, Gold: 10 }
    },
    {
        min: 11, max: 13,
        name: "Growth",
        color: "#F59E0B",
        desc: "You seek high returns and can tolerate significant market volatility.",
        allocation: { Debt: 20, Equity: 70, Gold: 10 }
    },
    {
        min: 14, max: 16,
        name: "Aggressive",
        color: "#EF4444",
        desc: "Maximum growth focus. You are comfortable with high-risk equity and small-caps.",
        allocation: { Debt: 5, Equity: 90, Gold: 5 }
    }
];

/* ─────────────────────────────────────────────────────────────────────────── */
/* Component                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

export const InvestmentRiskProfiler: React.FC = () => {
    const [step, setStep] = useState(0); // 0 = Intro, 1-4 = Questions, 5 = Result
    const [answers, setAnswers] = useState<number[]>([]);
    const [isExporting, setIsExporting] = useState(false);


    const resultRef = useRef<HTMLDivElement>(null);

    const handleAnswer = (score: number) => {
        const newAnswers = [...answers, score];
        setAnswers(newAnswers);
        if (step < QUESTIONS.length) {
            setStep(step + 1);
        }
    };

    const totalScore = answers.reduce((a, b) => a + b, 0);
    const profile = PROFILES.find(p => totalScore >= p.min && totalScore <= p.max) || PROFILES[1];

    const handleExport = async () => {
        if (!resultRef.current) return;
        setIsExporting(true);
        try {
            const canvas = await html2canvas(resultRef.current, { scale: 2, useCORS: true });
            const link = document.createElement('a');
            link.download = `moneycal-risk-profile-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

        } finally {
            setIsExporting(false);
        }
    };

    return (
        <>
            <SEOHelmet
                title="Investment Risk Profiler Quiz | Lead Magnet for Financial Advisors"
                description="Find your investment risk profile in 2 minutes. Generate a professional risk tolerance scorecard. Perfect lead generation tool for wealth managers."
                keywords="investment risk profiler, risk tolerance quiz, financial advisor lead magnet, portfolio allocation tool, risk score calculator"
                url="/tools/marketing/investment-risk-profiler"
            />

            <div className="min-h-screen bg-[#FDFCFD] pb-20 font-inter">

                {/* Progress Bar */}
                {step > 0 && step <= QUESTIONS.length && (
                    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-100">
                        <motion.div
                            className="h-full bg-rose-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / QUESTIONS.length) * 100}%` }}
                        />
                    </div>
                )}

                <div className="max-w-4xl mx-auto px-4 pt-20">
                    <AnimatePresence mode="wait">

                        {/* Step 0: Intro */}
                        {step === 0 && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center"
                            >
                                <div className="h-20 w-20 rounded-3xl bg-rose-600 flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-rose-200">
                                    <BrainCircuit className="w-10 h-10" />
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">What's Your <span className="text-rose-600">Investor DNA?</span></h1>
                                <p className="text-gray-500 text-xl font-medium mb-12 max-w-xl mx-auto">Discover the perfect asset allocation for your personality in 60 seconds.</p>
                                <button
                                    onClick={() => setStep(1)}
                                    className="bg-gray-900 text-white px-10 py-5 rounded-[2rem] font-black text-xl hover:bg-black transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto shadow-2xl"
                                >
                                    Start Assessment <ArrowRight className="w-6 h-6" />
                                </button>
                            </motion.div>
                        )}

                        {/* Steps 1-4: Questions */}
                        {step > 0 && step <= QUESTIONS.length && (
                            <motion.div
                                key={`q-${step}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-rose-50"
                            >
                                <span className="text-rose-600 font-black text-sm uppercase tracking-widest mb-4 block">Question {step} of {QUESTIONS.length}</span>
                                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-10 leading-tight">
                                    {QUESTIONS[step - 1].text}
                                </h2>
                                <div className="grid gap-4">
                                    {QUESTIONS[step - 1].options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(opt.score)}
                                            className="w-full p-6 text-left rounded-[1.5rem] bg-gray-50 transition-all hover:bg-rose-50 border-2 border-transparent hover:border-rose-600 group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 shrink-0 rounded-xl bg-white border border-gray-100 flex items-center justify-center font-black text-sm text-gray-400 group-hover:text-rose-600">
                                                    {String.fromCharCode(65 + i)}
                                                </div>
                                                <span className="font-bold text-gray-800 text-lg">{opt.text}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 5: Result */}
                        {step > QUESTIONS.length && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-8"
                            >
                                <div
                                    ref={resultRef}
                                    className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl border border-rose-50 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 blur-[100px] rounded-full -mr-32 -mt-32" />

                                    <div className="relative text-center">
                                        <motion.div
                                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                                            className="h-20 w-20 rounded-3xl bg-gray-50 flex items-center justify-center mx-auto mb-8 border border-gray-100 shadow-sm"
                                        >
                                            <Target className="w-10 h-10" style={{ color: profile.color }} />
                                        </motion.div>

                                        <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] mb-4 text-center">Your Investment Profile</h2>
                                        <h3 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter" style={{ color: profile.color }}>{profile.name}</h3>

                                        <p className="text-gray-500 text-xl font-medium max-w-xl mx-auto mb-16 leading-relaxed">
                                            {profile.desc}
                                        </p>

                                        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                                            {Object.entries(profile.allocation).map(([asset, pct]) => (
                                                <div key={asset} className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{asset}</p>
                                                    <p className="text-3xl font-black text-gray-900">{pct}%</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-16 pt-12 border-t border-gray-50 flex items-center justify-center gap-8">
                                            <div className="flex items-center gap-2">
                                                <Shield className="w-5 h-5 text-gray-300" />
                                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Risk Verified</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Sparkles className="w-5 h-5 text-gray-300" />
                                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest whitespace-nowrap">MoneyCal Analysis • {new Date().getFullYear()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 justify-center">
                                    <button
                                        onClick={handleExport}
                                        className="bg-rose-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-rose-700 transition-all flex items-center justify-center gap-3 shadow-xl"
                                    >
                                        {isExporting ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                                        Download Profile Poster
                                    </button>
                                    <button
                                        onClick={() => { setStep(0); setAnswers([]); }}
                                        className="bg-gray-100 text-gray-600 px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-gray-200 transition-all"
                                    >
                                        Retake Quiz
                                    </button>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

export default InvestmentRiskProfiler;
