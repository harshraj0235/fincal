import React, { useState, useRef } from 'react';
import {
    TrendingDown, TrendingUp, AlertCircle, Clock,
    ArrowRight, Download, Share2, Sparkles,
    Calculator, Percent, Calendar, Camera,
    CheckCircle, RefreshCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import SEOHelmet from '../../../components/SEOHelmet';

/* ─────────────────────────────────────────────────────────────────────────── */
/* Logic Function                                                              */
/* ─────────────────────────────────────────────────────────────────────────── */

const calculateSIP = (p: number, r: number, n: number) => {
    const i = r / 100 / 12;
    return Math.round(p * (((Math.pow(1 + i, n) - 1) / i) * (1 + i)));
};

/* ─────────────────────────────────────────────────────────────────────────── */
/* Component                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

export const SIPDelayVisualizer: React.FC = () => {
    const [monthlySIP, setMonthlySIP] = useState(10000);
    const [returnRate, setReturnRate] = useState(12);
    const [tenureYears, setTenureYears] = useState(20);
    const [delayMonths, setDelayMonths] = useState(12);

    const [isExporting, setIsExporting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const bannerRef = useRef<HTMLDivElement>(null);

    // Calculations
    const totalMonths = tenureYears * 12;
    const targetValue = calculateSIP(monthlySIP, returnRate, totalMonths);

    const delayedMonths = totalMonths - delayMonths;
    const delayedValue = calculateSIP(monthlySIP, returnRate, delayedMonths);

    const wealthLost = targetValue - delayedValue;
    const lossPercentage = (wealthLost / targetValue) * 100;

    const handleExport = async () => {
        if (!bannerRef.current) return;
        setIsExporting(true);
        try {
            const canvas = await html2canvas(bannerRef.current, { scale: 2, useCORS: true });
            const link = document.createElement('a');
            link.download = `moneycal-sip-delay-loss-${Date.now()}.png`;
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
                title="SIP Delay Cost Calculator | Visual Marketing Tool for Advisors"
                description="Visualize the massive wealth loss caused by delaying your SIP. Create compelling 'Cost of Delay' banners for clients. High-impact financial marketing tool."
                keywords="sip delay calculator, cost of delay sip, wealth loss calculator, financial advisor lead magnet, sip marketing tool"
                url="/tools/marketing/sip-delay-visualizer"
            />

            <div className="min-h-screen bg-white pb-20">
                <div className="bg-slate-900 py-16 text-center text-white px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-6 border border-amber-500/30">
                            <Clock className="w-4 h-4" />
                            The Cost of Waiting
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">Don't Let Time <span className="text-amber-500">Steal Your Wealth</span></h1>
                        <p className="text-slate-400 text-lg sm:text-xl font-medium">A delay of just {delayMonths} months could cost you lakhs in the long run.</p>
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto px-4 -mt-8">
                    <div className="grid lg:grid-cols-12 gap-8 items-start">

                        {/* Input Controls */}
                        <div className="lg:col-span-4 bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 space-y-8">
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="text-sm font-black text-slate-800 uppercase tracking-tight">Monthly SIP Amount</label>
                                        <span className="text-indigo-600 font-black">₹{monthlySIP.toLocaleString('en-IN')}</span>
                                    </div>
                                    <input
                                        type="range" min="1000" max="100000" step="1000"
                                        value={monthlySIP} onChange={(e) => setMonthlySIP(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="text-sm font-black text-slate-800 uppercase tracking-tight">Delay Period</label>
                                        <span className="text-amber-600 font-black">{delayMonths} Months</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="60" step="1"
                                        value={delayMonths} onChange={(e) => setDelayMonths(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Tenure (Years)</label>
                                        <input
                                            type="number" value={tenureYears}
                                            onChange={(e) => setTenureYears(parseInt(e.target.value))}
                                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Returns (%)</label>
                                        <input
                                            type="number" value={returnRate}
                                            onChange={(e) => setReturnRate(parseInt(e.target.value))}
                                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-50">
                                <button
                                    onClick={handleExport}
                                    disabled={isExporting}
                                    className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white p-5 rounded-2xl font-black hover:bg-black transition-all hover:shadow-2xl active:scale-[0.98]"
                                >
                                    {isExporting ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                                    {isExporting ? 'Generating Poster...' : 'Download Marketing Poster'}
                                </button>
                            </div>
                        </div>

                        {/* Visualizer / Banner */}
                        <div className="lg:col-span-8">
                            <div
                                ref={bannerRef}
                                className="w-full aspect-[16/9] relative overflow-hidden rounded-[2.5rem] bg-white border-[12px] border-slate-50 shadow-xl flex flex-col"
                            >
                                {/* Visual Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent" />

                                {/* Content */}
                                <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="mb-8"
                                    >
                                        <div className="bg-amber-500 text-slate-900 px-6 py-2 rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-amber-500/20">
                                            Wealth Lost to Delay
                                        </div>
                                    </motion.div>

                                    <motion.h2
                                        key={wealthLost}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="text-6xl sm:text-8xl font-black text-white mb-4 tracking-tighter"
                                    >
                                        ₹{wealthLost.toLocaleString('en-IN')}
                                    </motion.h2>

                                    <p className="text-amber-400 text-xl font-black mb-10 tracking-wide uppercase">
                                        Cost of delaying your SIP by {delayMonths} months
                                    </p>

                                    <div className="grid grid-cols-2 gap-8 w-full max-w-2xl px-8 py-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
                                        <div>
                                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">If You Start NOW</p>
                                            <p className="text-2xl font-black text-white">₹{targetValue.toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="border-l border-white/10">
                                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Delayed Start</p>
                                            <p className="text-2xl font-black text-slate-300">₹{delayedValue.toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>

                                    <div className="mt-12 flex items-center gap-2 text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">
                                        <Sparkles className="w-3 h-3" />
                                        Visualized by MoneyCal.in
                                    </div>
                                </div>
                            </div>

                            {/* Stats Summary */}
                            <div className="mt-8 grid sm:grid-cols-3 gap-4">
                                <div className="p-6 bg-slate-50 rounded-3xl">
                                    <p className="text-xs font-black text-slate-400 uppercase mb-1">Loss %</p>
                                    <p className="text-2xl font-black text-rose-600">{lossPercentage.toFixed(1)}%</p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-3xl">
                                    <p className="text-xs font-black text-slate-400 uppercase mb-1">SIP Amount</p>
                                    <p className="text-2xl font-black text-slate-800">₹{monthlySIP}/mo</p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-3xl">
                                    <p className="text-xs font-black text-slate-400 uppercase mb-1">Total Period</p>
                                    <p className="text-2xl font-black text-slate-800">{tenureYears} Years</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-2xl z-50 flex items-center gap-3"
                    >
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                        Marketing Poster Saved!
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SIPDelayVisualizer;
