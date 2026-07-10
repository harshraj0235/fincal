import React, { useState, useRef, useEffect } from 'react';
import {
    Layout, Sparkles, Calculator,
    CheckCircle, RefreshCcw, Camera,
    Star, Target, Trophy, Download, Type, Palette, Image as ImageIcon, IndianRupee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import SEOHelmet from '../../../components/SEOHelmet';

/* ─────────────────────────────────────────────────────────────────────────── */
/* Types & Constants                                                            */
/* ─────────────────────────────────────────────────────────────────────────── */

interface PosterTemplate {
    id: string;
    name: string;
    bgGradient: string;
    icon: React.ElementType;
    defaultTitle: string;
    defaultAmount: string;
    defaultDate: string;
    accentColor: string;
}

const TEMPLATES: PosterTemplate[] = [
    {
        id: 'retirement',
        name: 'Dream Retirement',
        bgGradient: 'from-orange-500 via-red-600 to-rose-700',
        icon: Target,
        defaultTitle: 'My Dream Retirement Fund',
        defaultAmount: '₹5,00,00,000',
        defaultDate: 'Target: 2045',
        accentColor: '#F97316'
    },
    {
        id: 'education',
        name: 'Child Education',
        bgGradient: 'from-blue-500 via-indigo-600 to-violet-700',
        icon: Star,
        defaultTitle: 'Higher Education Fund\nfor My Daughter',
        defaultAmount: '₹75,00,000',
        defaultDate: 'Target: 2038',
        accentColor: '#6366F1'
    },
    {
        id: 'luxury',
        name: 'Luxury Home',
        bgGradient: 'from-teal-500 via-emerald-600 to-green-700',
        icon: Trophy,
        defaultTitle: 'My Forever Home',
        defaultAmount: '₹2,50,00,000',
        defaultDate: 'Target: 2030',
        accentColor: '#10B981'
    },
    {
        id: 'wealth',
        name: 'Financial Freedom',
        bgGradient: 'from-gray-800 via-gray-900 to-black',
        icon: Sparkles,
        defaultTitle: 'Millionaire Goal',
        defaultAmount: '₹10,00,00,000',
        defaultDate: 'Achieving by 2050',
        accentColor: '#8B5CF6'
    }
];

const ASPECT_RATIOS = [
    { id: 'sq', name: 'Square (1:1)', w: 1080, h: 1080, class: 'aspect-square' },
    { id: 'st', name: 'Story (9:16)', w: 1080, h: 1920, class: 'aspect-[9/16]' },
];

/* ─────────────────────────────────────────────────────────────────────────── */
/* Component                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

export const PosterMaker: React.FC = () => {
    const [template, setTemplate] = useState<PosterTemplate>(TEMPLATES[0]);
    const [title, setTitle] = useState(template.defaultTitle);
    const [amount, setAmount] = useState(template.defaultAmount);
    const [date, setDate] = useState(template.defaultDate);
    const [ratio, setRatio] = useState(ASPECT_RATIOS[0]);
    const [customBg, setCustomBg] = useState<string | null>(null);
    const [overlayOpacity] = useState(0.3);
    const [isExporting, setIsExporting] = useState(false);


    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTitle(template.defaultTitle);
        setAmount(template.defaultAmount);
        setDate(template.defaultDate);
    }, [template]);

    const handleExport = async () => {
        if (!canvasRef.current) return;
        setIsExporting(true);

        try {
            const canvas = await html2canvas(canvasRef.current, {
                useCORS: true,
                scale: 2,
                backgroundColor: null,
            });

            const link = document.createElement('a');
            link.download = `moneycal-goal-poster-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            console.error('Export failed:', err);
        } finally {
            setIsExporting(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (prev) => setCustomBg(prev.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <SEOHelmet
                title="Financial Goal Poster Maker | Create Motivation Banners Online"
                description="Design professional financial goal posters for retirement, education, and house goals. FREE high-res downloads. Best tool for financial visualization & motivation."
                keywords="financial goal poster maker, goal banner creator, money motivation poster, retirement goal visualizer, child education planning poster"
                url="/tools/marketing/poster-maker"
            />

            <div className="min-h-screen bg-[#FDFCFD] pb-12">
                {/* Header */}
                <div className="bg-white border-b border-rose-100 sticky top-0 z-30">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-rose-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-rose-200">
                                <Camera className="w-6 h-6" />
                            </div>
                            <h1 className="text-xl font-black text-gray-900">Goal<span className="text-rose-600">Poster</span></h1>
                        </div>

                        <button
                            onClick={handleExport}
                            disabled={isExporting}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${isExporting ? 'bg-gray-100 text-gray-400' : 'bg-rose-600 text-white hover:bg-rose-700 hover:shadow-xl'}`}
                        >
                            {isExporting ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                            {isExporting ? 'Generating...' : 'Download HD'}
                        </button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 mt-8 lg:mt-12">
                    <div className="grid lg:grid-cols-12 gap-8 items-start">

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-6">

                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-50">
                                <div className="flex items-center gap-2 mb-4 text-rose-600">
                                    <Layout className="w-5 h-5" />
                                    <h2 className="font-bold text-gray-900">Goal Type</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {TEMPLATES.map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => setTemplate(t)}
                                            className={`p-3 rounded-2xl text-left transition-all border-2 ${template.id === t.id ? 'border-rose-600 bg-rose-50' : 'border-gray-50 bg-gray-50'}`}
                                        >
                                            <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${t.bgGradient} mb-2 flex items-center justify-center text-white`}>
                                                <t.icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-xs font-bold text-gray-800">{t.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-50">
                                <div className="flex items-center gap-2 mb-4 text-blue-600">
                                    <Type className="w-5 h-5" />
                                    <h2 className="font-bold text-gray-900">Personalize</h2>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-black text-gray-400 uppercase mb-2 block">Poster Heading</label>
                                        <textarea
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            rows={2}
                                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-100 outline-none text-sm font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-black text-gray-400 uppercase mb-2 block">Target Amount</label>
                                        <input
                                            type="text"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-100 outline-none text-sm font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-black text-gray-400 uppercase mb-2 block">Deadline/Subtext</label>
                                        <input
                                            type="text"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-100 outline-none text-sm font-bold"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-50">
                                <div className="flex items-center gap-2 mb-4 text-emerald-600">
                                    <Palette className="w-5 h-5" />
                                    <h2 className="font-bold text-gray-900">Background</h2>
                                </div>
                                <div className="space-y-4">
                                    <label className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 cursor-pointer hover:bg-rose-50 transition-all">
                                        <ImageIcon className="w-4 h-4 text-gray-400" />
                                        <span className="text-xs font-bold text-gray-500">Upload Motivation Image</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                    <div>
                                        <label className="text-xs font-black text-gray-400 uppercase mb-2 block">Aspect Ratio</label>
                                        <div className="flex gap-2">
                                            {ASPECT_RATIOS.map(r => (
                                                <button
                                                    key={r.id}
                                                    onClick={() => setRatio(r)}
                                                    className={`flex-1 p-2 rounded-xl text-xs font-bold border ${ratio.id === r.id ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-600'}`}
                                                >
                                                    {r.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Display */}
                        <div className="lg:col-span-8 flex justify-center">
                            <div
                                ref={canvasRef}
                                className={`w-full max-w-lg ${ratio.class} relative overflow-hidden rounded-[3rem] shadow-2xl bg-black`}
                            >
                                {/* Background */}
                                {customBg ? (
                                    <div className="absolute inset-0 bg-center bg-cover no-repeat" style={{ backgroundImage: `url(${customBg})` }} />
                                ) : (
                                    <div className={`absolute inset-0 bg-gradient-to-br ${template.bgGradient}`} />
                                )}

                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />

                                {/* Content */}
                                <div className="absolute inset-0 p-12 flex flex-col items-center justify-center text-center text-white">
                                    <motion.div
                                        key={template.id}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="mb-8"
                                    >
                                        <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                                            <template.icon className="w-12 h-12" />
                                        </div>
                                    </motion.div>

                                    <motion.h2
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="text-4xl font-black mb-6 whitespace-pre-line tracking-tight drop-shadow-xl"
                                    >
                                        {title}
                                    </motion.h2>

                                    <div className="w-16 h-1 bg-white/50 rounded-full mb-8" />

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <p className="text-sm font-black uppercase tracking-[0.3em] opacity-70 mb-2">TARGET CORPUS</p>
                                        <p className="text-6xl font-black text-white drop-shadow-2xl">{amount}</p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="mt-12 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 font-black text-lg"
                                    >
                                        {date}
                                    </motion.div>

                                    {/* Branding */}
                                    <div className="absolute bottom-12 flex items-center gap-2 font-black text-[10px] tracking-[0.2em] uppercase opacity-40">
                                        <IndianRupee className="w-3 h-3" />
                                        MoneyCal Goal Mastery
                                    </div>
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
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black shadow-2xl z-50 flex items-center gap-3 border border-white/10"
                    >
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                        Download Started! Stay Motivated.
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default PosterMaker;
