import React, { useState, useRef } from 'react';
import {
    Calendar,
    Camera, Sparkles,
    CheckCircle, RefreshCcw, TrendingUp, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import SEOHelmet from '../../../components/SEOHelmet';

/* ─────────────────────────────────────────────────────────────────────────── */
/* Logic Functions                                                            */
/* ─────────────────────────────────────────────────────────────────────────── */

const calculateAmortization = (principal: number, annualRate: number, tenureYears: number, extraMonthly: number = 0) => {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = tenureYears * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);

    let balance = principal;
    let totalInterest = 0;
    let months = 0;
    const effectiveMonthlyPayment = emi + extraMonthly;

    while (balance > 0 && months < 600) { // Safety cap
        const interest = balance * monthlyRate;
        const principalPaid = Math.min(balance, effectiveMonthlyPayment - interest);
        totalInterest += interest;
        balance -= principalPaid;
        months++;
    }
    return { totalInterest, months };
};

/* ─────────────────────────────────────────────────────────────────────────── */
/* Component                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

export const LoanSavingsVisualizer: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState(5000000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [tenure, setTenure] = useState(20);
    const [extraPayment, setExtraPayment] = useState(5000);

    const [isExporting, setIsExporting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const bannerRef = useRef<HTMLDivElement>(null);

    // original
    const original = calculateAmortization(loanAmount, interestRate, tenure, 0);
    // revised
    const revised = calculateAmortization(loanAmount, interestRate, tenure, extraPayment);

    const interestSaved = Math.round(original.totalInterest - revised.totalInterest);
    const timeSavedMonths = original.months - revised.months;
    const timeSavedYears = (timeSavedMonths / 12).toFixed(1);

    const handleExport = async () => {
        if (!bannerRef.current) return;
        setIsExporting(true);
        try {
            const canvas = await html2canvas(bannerRef.current, { scale: 2, useCORS: true });
            const link = document.createElement('a');
            link.download = `moneycal-loan-savings-${Date.now()}.png`;
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
                title="Loan Interest Savings Visualizer | Marketing Tool for Bankers"
                description="Show clients how much they can save by increasing EMIs. Generate professional interest savings banners. Free lead magnet for loan agents and banks."
                keywords="loan interest savings calculator, emi increase savings, part payment visualizer, loan agent marketing tool, bank lead magnet"
                url="/tools/marketing/loan-savings-visualizer"
            />

            <div className="min-h-screen bg-emerald-50/30 pb-20">
                <div className="bg-emerald-900 py-16 text-center text-white px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/10 text-emerald-400 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-6 border border-white/10">
                            <Shield className="w-4 h-4" />
                            Smart Debt Management
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">Save Lakhs in <span className="text-emerald-400">Loan Interest</span></h1>
                        <p className="text-emerald-200/70 text-lg font-medium italic">"Small increases in EMI lead to massive savings over time."</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 -mt-8">
                    <div className="grid lg:grid-cols-12 gap-8 items-start">

                        {/* Sidebar */}
                        <div className="lg:col-span-4 bg-white rounded-3xl shadow-xl border border-emerald-100 p-8 space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Loan Amount (₹)</label>
                                    <input
                                        type="number" value={loanAmount} onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                                        className="w-full p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl font-black outline-none focus:ring-2 focus:ring-emerald-200"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Rate (%)</label>
                                        <input
                                            type="number" value={interestRate} step="0.1" onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                                            className="w-full p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl font-black outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Tenure (Yrs)</label>
                                        <input
                                            type="number" value={tenure} onChange={(e) => setTenure(parseInt(e.target.value))}
                                            className="w-full p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl font-black outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <label className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-2 block">Extra Monthly EMI (₹)</label>
                                    <input
                                        type="range" min="1000" max="50000" step="1000"
                                        value={extraPayment} onChange={(e) => setExtraPayment(parseInt(e.target.value))}
                                        className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                                    />
                                    <div className="flex justify-between mt-2 font-black text-emerald-600 text-sm italic">
                                        <span>₹1,000</span>
                                        <span>₹{extraPayment.toLocaleString('en-IN')}</span>
                                        <span>₹50,000</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleExport}
                                disabled={isExporting}
                                className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-2"
                            >
                                {isExporting ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                                Download Savings Poster
                            </button>
                        </div>

                        {/* Poster Canvas */}
                        <div className="lg:col-span-8 flex flex-col items-center">
                            <div
                                ref={bannerRef}
                                className="w-full aspect-video bg-white relative overflow-hidden rounded-[2.5rem] border-[12px] border-white shadow-2xl flex flex-col items-center justify-center text-center p-12"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-800" />
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />

                                <div className="relative z-10 flex flex-col items-center">
                                    <motion.div
                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        className="h-20 w-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 border border-white/30"
                                    >
                                        <Sparkles className="w-10 h-10 text-emerald-200" />
                                    </motion.div>

                                    <h2 className="text-white text-3xl font-black uppercase tracking-[0.2em] mb-4 opacity-80">You Could Save</h2>

                                    <motion.h2
                                        key={interestSaved}
                                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                        className="text-7xl sm:text-8xl font-black text-white mb-6 drop-shadow-2xl"
                                    >
                                        ₹{interestSaved.toLocaleString('en-IN')}
                                    </motion.h2>

                                    <div className="flex items-center gap-3 bg-emerald-400/20 text-emerald-100 px-6 py-3 rounded-2xl border border-white/10 font-black text-xl mb-10">
                                        <Calendar className="w-6 h-6" />
                                        Reduced Tenure by {timeSavedYears} Years
                                    </div>

                                    <p className="text-white/60 font-bold max-w-lg leading-relaxed text-sm italic">
                                        By simply adding ₹{extraPayment.toLocaleString('en-IN')} to your monthly EMI of a ₹{(loanAmount / 100000).toFixed(0)} Lakh loan at {interestRate}% for {tenure} years.
                                    </p>

                                    <div className="absolute bottom-0 flex items-center gap-2 text-white/30 text-[10px] uppercase font-black tracking-widest">
                                        Empowered by MoneyCal.in
                                    </div>
                                </div>
                            </div>

                            {/* Pro Tip */}
                            <div className="mt-8 bg-white p-6 rounded-3xl border border-emerald-100 w-full max-w-2xl flex items-start gap-4 shadow-sm">
                                <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <p className="text-sm font-medium text-emerald-800 leading-relaxed">
                                    <span className="font-black text-emerald-600">Advisor Strategy:</span> Share this poster on WhatsApp Status to show clients how a small discipline can save huge interest costs. Perfect for refinancing leads!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-full font-black shadow-2xl z-50 flex items-center gap-2"
                    >
                        <CheckCircle className="w-5 h-5" /> Poster Downloaded!
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default LoanSavingsVisualizer;
