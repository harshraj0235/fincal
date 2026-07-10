import React, { useState, useRef } from 'react';
import {
    Target, Shield, TrendingUp, AlertCircle,
    ArrowRight, Download, Camera, Sparkles,
    CheckCircle, RefreshCcw, Landmark, Coffee,
    Home, HeartPulse, UserCheck, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import SEOHelmet from '../../../components/SEOHelmet';

/* ─────────────────────────────────────────────────────────────────────────── */
/* Component                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

export const RetirementScorecard: React.FC = () => {
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [monthlyExpense, setMonthlyExpense] = useState(50000);
    const [currentCorpus, setCurrentCorpus] = useState(500000);

    const [isExporting, setIsExporting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const canvasRef = useRef<HTMLDivElement>(null);

    // Simple Logic
    const lifeExpectancy = 85;
    const inflation = 0.06;
    const expectedReturn = 0.10;

    const yearsToRetire = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;

    const monthlyExpenseAtRetirement = Math.round(monthlyExpense * Math.pow(1 + inflation, yearsToRetire));
    const targetCorpus = Math.round(monthlyExpenseAtRetirement * 12 * 25); // 4% rule equivalent

    const handleExport = async () => {
        if (!canvasRef.current) return;
        setIsExporting(true);
        try {
            const canvas = await html2canvas(canvasRef.current, { scale: 2, useCORS: true });
            const link = document.createElement('a');
            link.download = `moneycal-retirement-scorecard-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <>
            <SEOHelmet
                title="Retirement Lifestyle Scorecard | Visual Retirement Planner"
                description="Visualize your retirement readiness. Create professional retirement corpus gap reports. Best tool for financial planners and retirement advisors."
                keywords="retirement readiness score, retirement corpus calculator india, financial planning scorecard, retirement income visualizer, advisor lead magnet"
                url="/tools/marketing/retirement-scorecard"
            />

            <div className="min-h-screen bg-[#F8FAFC] pb-20">

                <div className="bg-slate-900 pt-16 pb-32 px-4 shadow-xl text-center">
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-flex items-center gap-2 bg-rose-500/10 text-rose-400 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-6 border border-rose-500/20">
                            <Coffee className="w-4 h-4" /> The Lifestyle Scorecard
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Retirement <span className="text-rose-500">Readiness</span></h1>
                        <p className="text-slate-400 max-w-xl mx-auto font-medium text-lg italic">"Will your savings last your lifetime? Let's check your score."</p>
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto px-4 -mt-20">
                    <div className="grid lg:grid-cols-12 gap-12">

                        {/* Sidebar Inputs */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 flex flex-col gap-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Current Age</label>
                                        <input
                                            type="number" value={currentAge} onChange={(e) => setCurrentAge(parseInt(e.target.value))}
                                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black outline-none focus:ring-2 focus:ring-rose-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Retire at</label>
                                        <input
                                            type="number" value={retirementAge} onChange={(e) => setRetirementAge(parseInt(e.target.value))}
                                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black outline-none focus:ring-2 focus:ring-rose-100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-3">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Monthly Lifestyle Expense</label>
                                        <span className="text-slate-900 font-black">₹{monthlyExpense.toLocaleString('en-IN')}</span>
                                    </div>
                                    <input
                                        type="range" min="10000" max="500000" step="5000"
                                        value={monthlyExpense} onChange={(e) => setMonthlyExpense(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-rose-500"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Current Savings (₹)</label>
                                    <input
                                        type="number" value={currentCorpus} onChange={(e) => setCurrentCorpus(parseInt(e.target.value))}
                                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black outline-none focus:ring-2 focus:ring-rose-100"
                                    />
                                </div>

                                <button
                                    onClick={handleExport}
                                    disabled={isExporting}
                                    className="w-full py-5 bg-rose-600 text-white rounded-2xl font-black hover:bg-rose-700 shadow-xl shadow-rose-100 transition-all flex items-center justify-center gap-3"
                                >
                                    {isExporting ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                                    Download HD Scorecard
                                </button>
                            </div>
                        </div>

                        {/* Rendering Area */}
                        <div className="lg:col-span-8 flex flex-col items-center">
                            <div
                                ref={canvasRef}
                                className="w-full aspect-[4/3] bg-white relative overflow-hidden rounded-[3rem] p-16 shadow-2xl border-[16px] border-white text-center"
                            >
                                <div className="absolute inset-0 bg-slate-50" />
                                <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/5 blur-[80px] rounded-full -mr-40 -mt-40" />

                                <div className="relative h-full flex flex-col items-center justify-between">
                                    <div className="flex flex-col items-center">
                                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="h-16 w-16 mb-6 rounded-2xl bg-slate-900 flex items-center justify-center text-white">
                                            <Target className="w-8 h-8" />
                                        </motion.div>
                                        <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Your Retirement Target</h2>
                                        <div className="h-1 w-16 bg-rose-600 rounded-full" />
                                    </div>

                                    <div className="space-y-4">
                                        <motion.p
                                            key={targetCorpus}
                                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                            className="text-7xl md:text-8xl font-black text-slate-900 tracking-tighter"
                                        >
                                            ₹{(targetCorpus / 10000000).toFixed(2)} Cr
                                        </motion.p>
                                        <p className="text-rose-600 font-black text-xl uppercase tracking-widest italic opacity-80">
                                            Goal for {retirementAge} Years Age
                                        </p>
                                    </div>

                                    <div className="w-full max-w-2xl grid grid-cols-3 gap-6">
                                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Monthly Need</p>
                                            <p className="text-lg font-black text-slate-800">₹{(monthlyExpenseAtRetirement / 100000).toFixed(1)}L</p>
                                        </div>
                                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                                            <div className="absolute inset-0 bg-emerald-50 opacity-30" />
                                            <div className="relative">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                                <p className="text-lg font-black text-emerald-600 flex items-center justify-center gap-1"><ShieldCheck className="w-4 h-4" /> Ready</p>
                                            </div>
                                        </div>
                                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Left</p>
                                            <p className="text-lg font-black text-slate-800">{yearsToRetire} Years</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-slate-300">
                                        <UserCheck className="w-3 h-3" />
                                        MoneyCal Certified Projection • {new Date().getFullYear()}
                                    </div>
                                </div>
                            </div>

                            {/* Social Strategy */}
                            <div className="mt-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm max-w-2xl flex items-start gap-4">
                                <div className="h-10 w-10 shrink-0 bg-rose-50 flex items-center justify-center text-rose-600 rounded-xl">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                                    <span className="font-black text-rose-600">Growth Strategy:</span> Retirement Planning is the most under-served niche in Indian finance. Use this visual to highlight the <span className="underline decoration-rose-300 decoration-2 italic">Inflation Reality</span> and attract high-ticket HNI leads.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default RetirementScorecard;
