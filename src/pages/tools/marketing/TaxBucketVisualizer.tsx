import React, { useState, useRef } from 'react';
import {
    ShieldCheck, Calculator, ArrowRight,
    Camera,
    RefreshCcw, Sparkles, Receipt,
    Building2
} from 'lucide-react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import SEOHelmet from '../../../components/SEOHelmet';

/* ─────────────────────────────────────────────────────────────────────────── */
/* Constants                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

interface TaxBucket {
    id: string;
    name: string;
    limit: number;
    color: string;
    description: string;
    items: string[];
}

const TAX_BUCKETS: TaxBucket[] = [
    {
        id: '80c',
        name: 'Section 80C',
        limit: 150000,
        color: '#818cf8', // indigo-400
        description: 'Investments in ELSS, PPF, LIC, EPF, etc.',
        items: ['ELSS Funds', 'PPF', 'Life Insurance', 'EPF', 'Home Loan Principal']
    },
    {
        id: '80d',
        name: 'Section 80D',
        limit: 25000,
        color: '#f87171', // red-400
        description: 'Medical Insurance premiums for self and family.',
        items: ['Health Insurance', 'Preventive Checkup']
    },
    {
        id: 'nps',
        name: 'NPS (80CCD)',
        limit: 50000,
        color: '#fbbf24', // amber-400
        description: 'Additional deduction for National Pension System.',
        items: ['Tier 1 NPS Contribution']
    }
];

/* ─────────────────────────────────────────────────────────────────────────── */
/* Component                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

export const TaxBucketVisualizer: React.FC = () => {
    const [invested, setInvested] = useState<Record<string, number>>({
        '80c': 80000,
        '80d': 12000,
        'nps': 0
    });

    const [isExporting, setIsExporting] = useState(false);

    const canvasRef = useRef<HTMLDivElement>(null);

    const totalPossibleSavings = Math.round((150000 + 25000 + 50000) * 0.3); // Assuming 30% slab

    const handleExport = async () => {
        if (!canvasRef.current) return;
        setIsExporting(true);
        try {
            const canvas = await html2canvas(canvasRef.current, { scale: 2, useCORS: true });
            const link = document.createElement('a');
            link.download = `moneycal-tax-buckets-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

        } finally {
            setIsExporting(false);
        }
    };

    return (
        <>
            <SEOHelmet
                title="Tax Saving Bucket Visualizer | Interactive Tax Planning Tool"
                description="Visualize your tax-saving progress across 80C, 80D, and NPS. Generate professional tax planning summaries for clients. Best tool for chartered accountants and tax advisors."
                keywords="tax saving calculator india, section 80c bucket, 80d health insurance tax, nps tax benefit visualizer, tax planner lead magnet"
                url="/tools/marketing/tax-bucket-visualizer"
            />

            <div className="min-h-screen bg-[#F8FAFC] pb-20">
                {/* Hero Section */}
                <div className="bg-slate-900 pt-16 pb-32 px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-6 border border-indigo-500/20">
                            <Receipt className="w-4 h-4" /> Save More Income Tax
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight">Fill Your <span className="text-indigo-400">Tax Buckets</span></h1>
                        <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                            Don't leave money on the table. Visualize how much more you can save under Section 80C, 80D, and NPS.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto px-4 -mt-20">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">

                        {/* Inputs */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100">
                                <h2 className="font-black text-slate-800 uppercase tracking-tight mb-8 flex items-center gap-2">
                                    <Calculator className="w-5 h-5 text-indigo-600" /> Enter Investments
                                </h2>

                                <div className="space-y-8">
                                    {TAX_BUCKETS.map(bucket => (
                                        <div key={bucket.id}>
                                            <div className="flex justify-between items-center mb-3">
                                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{bucket.name}</label>
                                                <span className="text-slate-900 font-black">₹{invested[bucket.id].toLocaleString('en-IN')}</span>
                                            </div>
                                            <input
                                                type="range" min="0" max={bucket.limit} step="1000"
                                                value={invested[bucket.id]} onChange={(e) => setInvested({ ...invested, [bucket.id]: parseInt(e.target.value) })}
                                                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                            />
                                            <p className="text-[10px] font-bold text-slate-400 mt-2">Max Limit: ₹{(bucket.limit / 1000).toFixed(0)}k</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 pt-8 border-t border-slate-50">
                                    <button
                                        onClick={handleExport}
                                        disabled={isExporting}
                                        className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                                    >
                                        {isExporting ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                                        {isExporting ? 'Exporting...' : 'Export Tax Summary'}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
                                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                                    <Sparkles className="w-6 h-6 text-indigo-400" />
                                </div>
                                <h3 className="text-xl font-black mb-2 italic">Pro Advisor Tip</h3>
                                <p className="text-indigo-200/60 text-sm font-medium leading-relaxed mb-6">
                                    Use this visualizer to show clients their 'Empty Buckets'. It creates a psychological urge to invest and fill the gaps before March 31st.
                                </p>
                                <div className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-widest">
                                    Action Required <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        {/* Visualization Canvas */}
                        <div className="lg:col-span-8">
                            <div
                                ref={canvasRef}
                                className="w-full aspect-[4/3] bg-white relative overflow-hidden rounded-[3rem] p-16 shadow-2xl border-[16px] border-white flex flex-col items-center justify-center"
                            >
                                <div className="absolute inset-0 bg-slate-50" />
                                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full -mr-48 -mt-48" />

                                <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
                                    <motion.div
                                        initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                                        className="mb-12"
                                    >
                                        <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Your Tax-Saving Dashboard</h2>
                                        <div className="h-1.5 w-24 bg-indigo-600 rounded-full mx-auto" />
                                    </motion.div>

                                    <div className="grid grid-cols-3 gap-12 w-full max-w-3xl mb-16">
                                        {TAX_BUCKETS.map(bucket => {
                                            const progress = (invested[bucket.id] / bucket.limit) * 100;
                                            const remaining = bucket.limit - invested[bucket.id];
                                            return (
                                                <div key={bucket.id} className="flex flex-col items-center">
                                                    {/* Bucket Visual */}
                                                    <div className="w-full h-48 bg-slate-200/50 rounded-b-3xl relative overflow-hidden border-x-2 border-b-2 border-slate-100 flex flex-col justify-end group">
                                                        <motion.div
                                                            initial={{ height: 0 }}
                                                            animate={{ height: `${progress}%` }}
                                                            className="w-full shadow-inner relative"
                                                            style={{ backgroundColor: bucket.color }}
                                                        >
                                                            <div className="absolute top-0 left-0 w-full h-2 bg-white/20" />
                                                        </motion.div>
                                                    </div>
                                                    <div className="mt-6 text-center">
                                                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-tighter mb-1">{bucket.name}</h4>
                                                        <p className="text-[10px] font-black" style={{ color: bucket.color }}>
                                                            {remaining > 0 ? `Short by ₹${(remaining / 1000).toFixed(0)}k` : '✓ COMPLETED'}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="bg-white px-10 py-6 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-8">
                                        <div className="text-left">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Potential Yearly Savings</p>
                                            <p className="text-3xl font-black text-indigo-600">₹{totalPossibleSavings.toLocaleString('en-IN')}*</p>
                                        </div>
                                        <div className="h-10 w-[2px] bg-slate-100" />
                                        <div className="text-left">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Status</p>
                                            <p className="text-xl font-black text-emerald-600 flex items-center gap-2">
                                                <ShieldCheck className="w-5 h-5" /> Optimized
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-16 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-slate-300">
                                        <Building2 className="w-3 h-3" />
                                        MoneyCal Wealth Lab • Tax Section 2024-25
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default TaxBucketVisualizer;
