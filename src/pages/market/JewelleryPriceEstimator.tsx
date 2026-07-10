import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator, Diamond, IndianRupee, Percent, AlertCircle } from 'lucide-react';

export default function JewelleryPriceEstimator() {
    const [purity, setPurity] = useState('22K');
    const [weight, setWeight] = useState<number | ''>(10);
    const [goldRate, setGoldRate] = useState<number | ''>(7200); // per gram
    const [makingChargeType, setMakingChargeType] = useState<'percent' | 'flat'>('percent');
    const [makingChargeValue, setMakingChargeValue] = useState<number | ''>(15);
    const [hallmarkCharge, setHallmarkCharge] = useState<number | ''>(45);

    const calcValues = () => {
        const w = Number(weight) || 0;
        const r = Number(goldRate) || 0;
        const mcVal = Number(makingChargeValue) || 0;
        const hc = Number(hallmarkCharge) || 0;

        const baseGoldPrice = w * r;

        let totalMakingCharges = 0;
        if (makingChargeType === 'percent') {
            totalMakingCharges = (baseGoldPrice * mcVal) / 100;
        } else {
            totalMakingCharges = mcVal * w; // Flat rate is usually per gram
        }

        const subTotal = baseGoldPrice + totalMakingCharges + hc;
        const gst = subTotal * 0.03; // 3% GST on jewellery
        const grandTotal = subTotal + gst;

        return {
            baseGoldPrice,
            totalMakingCharges,
            hc,
            subTotal,
            gst,
            grandTotal
        };
    };

    const breakdown = calcValues();

    return (
        <>
            <Helmet>
                <title>Advanced Gold Jewellery Price Estimator & Calculator (2026)</title>
                <meta name="description" content="Calculate the exact final price of your gold jewellery including 3% GST, making charges, and hallmark fees using our advanced interactive estimator tool." />
            </Helmet>

            <div className="min-h-screen bg-slate-50 pt-20 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/50 text-amber-700 font-semibold text-sm mb-6 border border-amber-200">
                            <Diamond className="w-4 h-4" />
                            Advanced Tool
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            Jewellery Price Estimator
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Stop getting overcharged at the jewelry store. Use our transparent calculator to find the exact price breakdown including making charges and GST.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* Calculator Form */}
                        <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-10">
                            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                <Calculator className="w-6 h-6 text-blue-600" />
                                Input Details
                            </h2>

                            <div className="space-y-8">
                                {/* Purity & Weight */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Gold Purity</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['24K', '22K', '18K'].map(p => (
                                                <button
                                                    key={p}
                                                    onClick={() => setPurity(p)}
                                                    className={`py-3 rounded-xl font-bold transition-all border-2 ${purity === p ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-300'}`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Weight (Grams)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={weight}
                                                onChange={e => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
                                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 placeholder-slate-400 font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-lg"
                                                placeholder="e.g. 15.5"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">g</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Rate & Hallmark */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Current Gold Rate (Per Gram)</label>
                                        <div className="relative">
                                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type="number"
                                                value={goldRate}
                                                onChange={e => setGoldRate(e.target.value === '' ? '' : Number(e.target.value))}
                                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-12 pr-4 py-3 placeholder-slate-400 font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-lg"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Hallmark Charges</label>
                                        <div className="relative">
                                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type="number"
                                                value={hallmarkCharge}
                                                onChange={e => setHallmarkCharge(e.target.value === '' ? '' : Number(e.target.value))}
                                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-12 pr-4 py-3 placeholder-slate-400 font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-lg"
                                            />
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2 font-medium">Standard is ₹45 per piece approx.</p>
                                    </div>
                                </div>

                                {/* Making Charges */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-3">Making Charges</label>
                                    <div className="flex bg-slate-100 p-1 rounded-xl mb-4 w-fit">
                                        <button
                                            onClick={() => setMakingChargeType('percent')}
                                            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${makingChargeType === 'percent' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            Percentage (%)
                                        </button>
                                        <button
                                            onClick={() => setMakingChargeType('flat')}
                                            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${makingChargeType === 'flat' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            Per Gram (₹)
                                        </button>
                                    </div>
                                    <div className="relative">
                                        {makingChargeType === 'percent' ? (
                                            <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        ) : (
                                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        )}
                                        <input
                                            type="number"
                                            value={makingChargeValue}
                                            onChange={e => setMakingChargeValue(e.target.value === '' ? '' : Number(e.target.value))}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-12 pr-4 py-3 placeholder-slate-400 font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-lg"
                                            placeholder={makingChargeType === 'percent' ? "e.g. 15%" : "e.g. 350 per gram"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Breakdown Result */}
                        <div className="lg:col-span-5">
                            <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden sticky top-24">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />

                                <div className="p-8 md:p-10 relative z-10">
                                    <h2 className="text-2xl font-black text-white mb-2">Final Estimate</h2>
                                    <p className="text-slate-400 font-medium text-sm mb-8">Transparent breakdown of your jewellery cost</p>

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center text-slate-300">
                                            <span className="font-medium">Pure Gold Value ({purity})</span>
                                            <span className="font-bold text-white tracking-wide">₹{breakdown.baseGoldPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-slate-300">
                                            <span className="font-medium">Making Charges</span>
                                            <span className="font-bold text-white tracking-wide">₹{breakdown.totalMakingCharges.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-slate-300">
                                            <span className="font-medium">Hallmark Fees</span>
                                            <span className="font-bold text-white tracking-wide">₹{breakdown.hc.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                                        </div>

                                        <div className="h-px bg-slate-800 w-full" />

                                        <div className="flex justify-between items-center text-slate-300">
                                            <span className="font-medium">Subtotal</span>
                                            <span className="font-bold text-white tracking-wide">₹{breakdown.subTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-slate-300">
                                            <span className="font-medium">GST (3%)</span>
                                            <span className="font-bold text-red-400 tracking-wide">+ ₹{breakdown.gst.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-amber-500 p-8 relative z-10">
                                    <p className="text-amber-950 font-black text-sm uppercase tracking-widest mb-1">Total Estimated Price</p>
                                    <div className="flex items-baseline gap-1 text-amber-950">
                                        <span className="text-3xl font-black">₹</span>
                                        <span className="text-5xl font-black tracking-tighter">{breakdown.grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-100/50">
                                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-800 font-medium leading-relaxed">
                                    This is an estimate. Actual prices may vary slightly based on the jeweler's rounding methods and exact weight calculations.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
