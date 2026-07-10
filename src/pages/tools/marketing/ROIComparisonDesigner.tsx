import React, { useState, useRef } from 'react';
import {
    BarChart3, TrendingUp, DollarSign, PieChart,
    ArrowRight, Download, Camera, Sparkles,
    CheckCircle, RefreshCcw, Landmark, Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import SEOHelmet from '../../../components/SEOHelmet';

/* ─────────────────────────────────────────────────────────────────────────── */
/* Constants                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

interface Asset {
    id: string;
    name: string;
    defaultRate: number;
    color: string;
    icon: React.ElementType;
}

const ASSETS: Asset[] = [
    { id: 'sip', name: 'Equity SIP', defaultRate: 12, color: '#10B981', icon: TrendingUp },
    { id: 'fd', name: 'Fixed Deposit', defaultRate: 7, color: '#6366F1', icon: Landmark },
    { id: 'gold', name: 'Gold', defaultRate: 9, color: '#F59E0B', icon: Coins },
    { id: 'property', name: 'Real Estate', defaultRate: 8, color: '#EC4899', icon: DollarSign },
];

/* ─────────────────────────────────────────────────────────────────────────── */
/* Component                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

export const ROIComparisonDesigner: React.FC = () => {
    const [amount, setAmount] = useState(1000000);
    const [years, setYears] = useState(10);
    const [rates, setRates] = useState<Record<string, number>>({
        sip: 12, fd: 7, gold: 9, property: 8
    });

    const [isExporting, setIsExporting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const canvasRef = useRef<HTMLDivElement>(null);

    const calculateFutureValue = (rate: number) => {
        return Math.round(amount * Math.pow(1 + rate / 100, years));
    };

    const results = ASSETS.map(asset => ({
        ...asset,
        value: calculateFutureValue(rates[asset.id] || asset.defaultRate)
    })).sort((a, b) => b.value - a.value);

    const maxValue = results[0].value;

    const handleExport = async () => {
        if (!canvasRef.current) return;
        setIsExporting(true);
        try {
            const canvas = await html2canvas(canvasRef.current, { scale: 2, useCORS: true });
            const link = document.createElement('a');
            link.download = `moneycal-roi-comparison-${Date.now()}.png`;
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
                title="Asset ROI Comparison Designer | Financial Asset Battle Visualizer"
                description="Compare returns from SIP, FD, Gold, and Real Estate visually. Generate professional investment comparison graphics. Free tool for wealth managers."
                keywords="roi comparison tool, sip vs fd vs gold, investment return visualizer, asset class comparison, wealth advisor marketing"
                url="/tools/marketing/roi-comparison-designer"
            />

            <div className="min-h-screen bg-[#FAFAFA] pb-20">
                <div className="bg-white border-b border-slate-100 py-12 px-4 shadow-sm">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Investment <span className="text-indigo-600">Battleground</span></h1>
                            <p className="text-slate-500 font-medium italic">Visualize how different asset classes perform over time.</p>
                        </motion.div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 mt-12">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">

                        {/* Controls */}
                        <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 space-y-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block">Investment Amount (₹)</label>
                                    <input
                                        type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))}
                                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black outline-none focus:ring-2 focus:ring-indigo-100"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block">Tenure (Years)</label>
                                    <div className="flex gap-2">
                                        {[5, 10, 15, 20].map(y => (
                                            <button
                                                key={y} onClick={() => setYears(y)}
                                                className={`flex-1 p-3 rounded-xl text-xs font-black ${years === y ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-500'}`}
                                            >
                                                {y}Y
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-50">
                                    <label className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4 block">Expected Returns (%)</label>
                                    <div className="space-y-4">
                                        {ASSETS.map(asset => (
                                            <div key={asset.id} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: asset.color }} />
                                                    <span className="text-xs font-bold text-slate-600">{asset.name}</span>
                                                </div>
                                                <input
                                                    type="number" value={rates[asset.id]}
                                                    onChange={(e) => setRates({ ...rates, [asset.id]: parseFloat(e.target.value) })}
                                                    className="w-16 p-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-black text-right"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleExport}
                                disabled={isExporting}
                                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl"
                            >
                                {isExporting ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                                Export Comparison Poster
                            </button>
                        </div>

                        {/* Poster Canvas */}
                        <div className="lg:col-span-8">
                            <div
                                ref={canvasRef}
                                className="w-full aspect-video bg-white relative overflow-hidden rounded-[2.5rem] p-12 shadow-2xl flex flex-col items-center justify-center"
                            >
                                <div className="absolute inset-0 bg-slate-50" />
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent" />

                                <div className="relative w-full h-full flex flex-col">
                                    <div className="flex justify-between items-start mb-12">
                                        <div>
                                            <h2 className="text-3xl font-black text-slate-900 leading-tight">Investment Growth<br />over {years} Years</h2>
                                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2 px-2 border-l-2 border-indigo-500">Wealth Comparison Visual</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Initial Amount</p>
                                            <p className="text-2xl font-black text-slate-800">₹{(amount / 100000).toFixed(0)} Lakhs</p>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-6 flex flex-col justify-center">
                                        {results.map(asset => (
                                            <div key={asset.id} className="relative group">
                                                <div className="flex justify-between items-end mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <asset.icon className="w-4 h-4" style={{ color: asset.color }} />
                                                        <span className="text-xs font-black text-slate-800 tracking-tight">{asset.name} ({rates[asset.id]}%)</span>
                                                    </div>
                                                    <span className="text-sm font-black text-slate-900">₹{(asset.value / 100000).toFixed(1)}L</span>
                                                </div>
                                                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(asset.value / maxValue) * 100}%` }}
                                                        className="h-full rounded-full shadow-inner"
                                                        style={{ backgroundColor: asset.color }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-12 flex justify-between items-end">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                                                <Sparkles className="w-4 h-4" />
                                            </div>
                                            <p className="font-black text-[10px] uppercase tracking-widest text-slate-400">Powered by MoneyCal.in</p>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-300 italic max-w-[200px] text-right">
                                            *Indicative values based on constant returns. Past performance is not a guarantee of future results.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Hint */}
                            <div className="mt-8 flex items-center gap-4 p-4 rounded-2xl bg-amber-50 text-amber-700 border border-amber-100">
                                <BarChart3 className="w-6 h-6 shrink-0" />
                                <p className="text-xs font-bold leading-relaxed">
                                    Use this visual to show clients why <strong>Equity (SIP)</strong> is the king of long-term wealth creation compared to traditional assets. Double-tap amount to edit quickly.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ROIComparisonDesigner;
