import React, { useState, useRef } from 'react';
import {
    GraduationCap, Info, Camera,
    RefreshCcw, School, Heart
} from 'lucide-react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import SEOHelmet from '../../../components/SEOHelmet';

/* ─────────────────────────────────────────────────────────────────────────── */
/* Constants                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

const COURSES = [
    { name: "Engineering (India)", currentCost: 1500000, color: "bg-blue-600" },
    { name: "Medical (India)", currentCost: 5000000, color: "bg-rose-600" },
    { name: "MBA (India)", currentCost: 2500000, color: "bg-amber-600" },
    { name: "Overseas Education", currentCost: 8000000, color: "bg-indigo-600" },
];

/* ─────────────────────────────────────────────────────────────────────────── */
/* Component                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

export const EducationCostVisualizer: React.FC = () => {
    const [course, setCourse] = useState(COURSES[0]);
    const [childAge, setChildAge] = useState(3);
    const [inflationRate, setInflationRate] = useState(10);

    const [isExporting, setIsExporting] = useState(false);

    const canvasRef = useRef<HTMLDivElement>(null);

    const yearsToHigherEd = 18 - childAge;
    const futureCost = Math.round(course.currentCost * Math.pow(1 + inflationRate / 100, yearsToHigherEd));
    const sipNeeded = Math.round((futureCost * (0.12 / 12)) / (Math.pow(1 + 0.12 / 12, yearsToHigherEd * 12) - 1));

    const handleExport = async () => {
        if (!canvasRef.current) return;
        setIsExporting(true);
        try {
            const canvas = await html2canvas(canvasRef.current, { scale: 2, useCORS: true });
            const link = document.createElement('a');
            link.download = `moneycal-education-cost-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

        } finally {
            setIsExporting(false);
        }
    };

    return (
        <>
            <SEOHelmet
                title="Future Education Cost Visualizer | Indian Education Inflation Tool"
                description="Calculate the future cost of higher education in India and abroad. Generate professional education planning banners for parents. Best lead magnet for child plan advisors."
                keywords="future education cost calculator india, mba cost inflation, medical course future price, education planning visualizer, child sip calculator banner"
                url="/tools/marketing/education-cost-visualizer"
            />

            <div className="min-h-screen bg-slate-50 pb-20">
                <div className="bg-indigo-900 pt-16 pb-32 px-4 shadow-xl text-center text-white">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-flex items-center gap-2 bg-white/10 text-indigo-300 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-6 border border-white/10">
                            <GraduationCap className="w-4 h-4" /> Secure Your Child's Future
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Education <span className="text-indigo-400">Cost Visualizer</span></h1>
                        <p className="text-indigo-200/60 max-w-xl mx-auto font-medium text-lg italic">"Education inflation in India is 10-12%. Are you prepared?"</p>
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto px-4 -mt-20">
                    <div className="grid lg:grid-cols-12 gap-12">

                        {/* Inputs */}
                        <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 flex flex-col gap-8">
                            <div>
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 block">Target Course</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {COURSES.map(c => (
                                        <button
                                            key={c.name}
                                            onClick={() => setCourse(c)}
                                            className={`p-4 rounded-xl text-left transition-all border-2 ${course.name === c.name ? 'border-indigo-600 bg-indigo-50' : 'bg-slate-50 border-transparent hover:bg-slate-100'}`}
                                        >
                                            <span className={`font-black text-sm ${course.name === c.name ? 'text-indigo-900' : 'text-slate-600'}`}>{c.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Child Age</label>
                                    <input
                                        type="number" min="0" max="15" value={childAge}
                                        onChange={(e) => setChildAge(parseInt(e.target.value))}
                                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black outline-none focus:ring-2 focus:ring-indigo-100"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Inflation (%)</label>
                                    <input
                                        type="number" min="5" max="15" value={inflationRate}
                                        onChange={(e) => setInflationRate(parseInt(e.target.value))}
                                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black outline-none focus:ring-2 focus:ring-indigo-100"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleExport}
                                disabled={isExporting}
                                className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all"
                            >
                                {isExporting ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                                Download Marketing Poster
                            </button>
                        </div>

                        {/* Rendering Canvas */}
                        <div className="lg:col-span-8">
                            <div
                                ref={canvasRef}
                                className="w-full aspect-video bg-white relative overflow-hidden rounded-[3rem] p-12 shadow-2xl border-[12px] border-white flex flex-col items-center justify-center text-center"
                            >
                                <div className="absolute inset-0 bg-slate-900" />
                                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[80px] rounded-full -mr-40 -mt-40" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full -ml-32 -mb-32" />

                                <div className="relative z-10 flex flex-col items-center">
                                    <motion.div
                                        initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                                        className="h-16 w-16 rounded-2xl bg-indigo-600 flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/20"
                                    >
                                        <School className="w-10 h-10 text-white" />
                                    </motion.div>

                                    <h2 className="text-indigo-400 font-black text-sm uppercase tracking-[0.3em] mb-4">Estimated Future Cost</h2>
                                    <motion.h3
                                        key={futureCost}
                                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                        className="text-7xl sm:text-8xl font-black text-white mb-6 drop-shadow-2xl"
                                    >
                                        ₹{(futureCost / 10000000).toFixed(2)} Cr
                                    </motion.h3>

                                    <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/10 mb-10">
                                        <p className="text-indigo-200/70 text-sm font-bold uppercase tracking-widest border-r border-white/10 pr-4">Course: {course.name}</p>
                                        <p className="text-white text-lg font-black pl-4">In {yearsToHigherEd} Years</p>
                                    </div>

                                    <p className="text-indigo-200/40 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                                        <Info className="w-3 h-3" /> Assumes {inflationRate}% Education Inflation • MoneyCal Analysis
                                    </p >
                                </div >

                                {/* SIP Note */}
                                < div className="absolute bottom-8 right-8 text-right opacity-30" >
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Estimated Monthly SIP To Achieve This</p>
                                    <p className="text-2xl font-black text-white">₹{sipNeeded.toLocaleString('en-IN')}</p>
                                </div >
                            </div >

                            {/* Tips */}
                            < div className="mt-8 flex items-start gap-4 p-6 rounded-3xl bg-indigo-50 border border-indigo-100 shadow-sm" >
                                <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                                    <Heart className="w-6 h-6" />
                                </div>
                                <p className="text-sm font-medium text-indigo-900 leading-relaxed">
                                    <span className="font-black">Parent's Strategy:</span> Share this on your LinkedIn or Parent Groups. It highlights the invisible predator of "Inflation" and drives high engagement for Child Plans & Education SIPs.
                                </p>
                            </div >
                        </div >

                    </div >
                </div >
            </div >
        </>
    );
};

export default EducationCostVisualizer;
