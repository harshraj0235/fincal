import React, { useState, useRef, useEffect } from 'react';
import {
    Download, Image as ImageIcon, Type, Palette,
    Layout, Save, Share2, Sparkles, TrendingUp,
    Shield, Landmark, Calculator, ArrowRight,
    CheckCircle, Zap, RefreshCcw, Camera, IndianRupee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import SEOHelmet from '../../components/SEOHelmet';

/* ─────────────────────────────────────────────────────────────────────────── */
/* Types & Constants                                                            */
/* ─────────────────────────────────────────────────────────────────────────── */

interface PromoTemplate {
    id: string;
    name: string;
    category: 'loan' | 'investment' | 'insurance' | 'custom';
    bgGradient: string;
    icon: React.ElementType;
    defaultTitle: string;
    defaultSubtitle: string;
    defaultCta: string;
    accentColor: string;
}

const TEMPLATES: PromoTemplate[] = [
    {
        id: 'loan-pro',
        name: 'Instant Loan',
        category: 'loan',
        bgGradient: 'from-blue-600 via-indigo-700 to-violet-800',
        icon: Landmark,
        defaultTitle: 'Lower Interest Loans\nStarting at 8.9%*',
        defaultSubtitle: 'Zero Processing Fee | Instant Approval',
        defaultCta: 'Apply Now →',
        accentColor: '#3B82F6'
    },
    {
        id: 'sip-wealth',
        name: 'Wealth Growth',
        category: 'investment',
        bgGradient: 'from-emerald-500 via-teal-600 to-cyan-700',
        icon: TrendingUp,
        defaultTitle: 'Turn ₹5,000/mo into\n₹1.2 Crores*',
        defaultSubtitle: 'The Power of Compounding over 20 Years',
        defaultCta: 'Start SIP Today',
        accentColor: '#10B981'
    },
    {
        id: 'insurance-safe',
        name: 'Family Shield',
        category: 'insurance',
        bgGradient: 'from-rose-500 via-pink-600 to-purple-700',
        icon: Shield,
        defaultTitle: '₹1 Crore Life Cover\nat just ₹15/day*',
        defaultSubtitle: 'Financial Security for your loved ones',
        defaultCta: 'Secure Family Now',
        accentColor: '#F43F5E'
    },
    {
        id: 'custom-modern',
        name: 'Modern Minimal',
        category: 'custom',
        bgGradient: 'from-gray-800 via-gray-900 to-black',
        icon: Sparkles,
        defaultTitle: 'Your Professional\nFinance Header Here',
        defaultSubtitle: 'Add a compelling sub-headline to convert',
        defaultCta: 'Get Started',
        accentColor: '#8B5CF6'
    }
];

const ASPECT_RATIOS = [
    { id: 'sq', name: 'Instagram (1:1)', w: 1080, h: 1080, class: 'aspect-square' },
    { id: 'fb', name: 'Facebook/Twitter (1.91:1)', w: 1200, h: 630, class: 'aspect-[1.91/1]' },
    { id: 'st', name: 'Story (9:16)', w: 1080, h: 1920, class: 'aspect-[9/16]' },
];

/* ─────────────────────────────────────────────────────────────────────────── */
/* Component                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

export const PromoDesigner: React.FC = () => {
    const [template, setTemplate] = useState<PromoTemplate>(TEMPLATES[0]);
    const [title, setTitle] = useState(template.defaultTitle);
    const [subtitle, setSubtitle] = useState(template.defaultSubtitle);
    const [cta, setCta] = useState(template.defaultCta);
    const [ratio, setRatio] = useState(ASPECT_RATIOS[0]);
    const [customBg, setCustomBg] = useState<string | null>(null);
    const [overlayOpacity, setOverlayOpacity] = useState(0.4);
    const [isExporting, setIsExporting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const canvasRef = useRef<HTMLDivElement>(null);

    // Sync title/subtitle when template changes
    useEffect(() => {
        setTitle(template.defaultTitle);
        setSubtitle(template.defaultSubtitle);
        setCta(template.defaultCta);
    }, [template]);

    const handleExport = async () => {
        if (!canvasRef.current) return;
        setIsExporting(true);

        try {
            const canvas = await html2canvas(canvasRef.current, {
                useCORS: true,
                scale: 2, // Higher resolution
                backgroundColor: null,
            });

            const link = document.createElement('a');
            link.download = `moneycal-promo-${Date.now()}.png`;
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
                title="Free Online Promo Designer & Finance Banner Maker | MoneyCal"
                description="Create professional financial promotional banners for SIP, Loans, and Insurance instantly. Custom templates, high-res downloads, and SEO-optimized marketing tools."
                keywords="promo designer online, finance banner maker, loan ad maker, sip poster generator, social media post maker finance, moneycal marketing tools"
                url="/tools/promo-designer"
                type="website"
            />

            <div className="min-h-screen bg-[#F8FAFC] pb-12">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-200">
                                <Camera className="w-6 h-6" />
                            </div>
                            <h1 className="text-xl font-black text-gray-900 tracking-tight">Promo<span className="text-violet-600">Designer</span></h1>
                        </div>

                        <button
                            onClick={handleExport}
                            disabled={isExporting}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${isExporting ? 'bg-gray-100 text-gray-400' : 'bg-gray-900 text-white hover:bg-black hover:shadow-xl active:scale-95'}`}
                        >
                            {isExporting ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                            {isExporting ? 'Exporting...' : 'Download PNG'}
                        </button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 mt-8 lg:mt-12">
                    <div className="grid lg:grid-cols-12 gap-8 items-start">

                        {/* Sidebar Controls */}
                        <div className="lg:col-span-4 space-y-6">

                            {/* Templates */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <Layout className="w-5 h-5 text-violet-600" />
                                    <h2 className="font-bold text-gray-900">Select Template</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {TEMPLATES.map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => setTemplate(t)}
                                            className={`p-3 rounded-2xl text-left transition-all border-2 ${template.id === t.id ? 'border-violet-600 bg-violet-50' : 'border-gray-50 hover:border-gray-200 bg-gray-50'}`}
                                        >
                                            <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${t.bgGradient} mb-2 flex items-center justify-center text-white`}>
                                                <t.icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-xs font-bold text-gray-800">{t.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Text Edit */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <Type className="w-5 h-5 text-blue-600" />
                                    <h2 className="font-bold text-gray-900">Edit Content</h2>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Headline</label>
                                        <textarea
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            rows={2}
                                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Tagline</label>
                                        <input
                                            type="text"
                                            value={subtitle}
                                            onChange={(e) => setSubtitle(e.target.value)}
                                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Call to Action</label>
                                        <input
                                            type="text"
                                            value={cta}
                                            onChange={(e) => setCta(e.target.value)}
                                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Visuals */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <Palette className="w-5 h-5 text-emerald-600" />
                                    <h2 className="font-bold text-gray-900">Visuals & Background</h2>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Custom Background</label>
                                        <div className="flex gap-2">
                                            <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 cursor-pointer hover:border-violet-400 hover:bg-violet-50 transition-all">
                                                <ImageIcon className="w-4 h-4 text-gray-400" />
                                                <span className="text-xs font-bold text-gray-500">Upload Image</span>
                                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                            </label>
                                            {customBg && (
                                                <button
                                                    onClick={() => setCustomBg(null)}
                                                    className="px-3 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all"
                                                >
                                                    <Zap className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {customBg && (
                                        <div>
                                            <label className="flex justify-between text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                                                Overlay Darken
                                                <span>{Math.round(overlayOpacity * 100)}%</span>
                                            </label>
                                            <input
                                                type="range"
                                                min="0" max="0.9" step="0.1"
                                                value={overlayOpacity}
                                                onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                                                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-violet-600"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Aspect Ratio</label>
                                        <div className="flex flex-col gap-2">
                                            {ASPECT_RATIOS.map(r => (
                                                <button
                                                    key={r.id}
                                                    onClick={() => setRatio(r)}
                                                    className={`p-2.5 rounded-xl text-left text-xs font-bold border ${ratio.id === r.id ? 'bg-gray-900 text-white border-black' : 'bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-200'}`}
                                                >
                                                    {r.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Design Preview Workspace */}
                        <div className="lg:col-span-8 sticky top-24">
                            <div className="relative group">
                                {/* Workspace constraints */}
                                <div className="w-full overflow-hidden rounded-[2.5rem] shadow-2xl shadow-gray-200 border-8 border-white bg-gray-100 flex items-center justify-center">

                                    {/* The Actual Designer Shell */}
                                    <div
                                        ref={canvasRef}
                                        className={`w-full ${ratio.class} relative overflow-hidden transition-all duration-500`}
                                        style={{
                                            background: customBg ? `url(${customBg}) center/cover no-repeat` : undefined,
                                            backgroundColor: customBg ? '#000' : undefined
                                        }}
                                    >
                                        {/* Gradient Overlay (if no image) */}
                                        {!customBg && (
                                            <div className={`absolute inset-0 bg-gradient-to-br ${template.bgGradient}`} />
                                        )}

                                        {/* Image Darkening Overlay */}
                                        {customBg && (
                                            <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
                                        )}

                                        {/* Content Layers */}
                                        <div className="absolute inset-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start text-white">

                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                key={template.id}
                                                className="mb-6"
                                            >
                                                <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl">
                                                    <template.icon className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                                                </div>
                                            </motion.div>

                                            <motion.h2
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tighter mb-6 whitespace-pre-line drop-shadow-lg"
                                            >
                                                {title}
                                            </motion.h2>

                                            <motion.p
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 }}
                                                className="text-lg sm:text-xl lg:text-2xl font-bold opacity-90 max-w-xl mb-10 drop-shadow-md"
                                            >
                                                {subtitle}
                                            </motion.p>

                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <div className="flex items-center gap-4 bg-white text-gray-900 px-8 py-4 rounded-2xl font-black text-lg sm:text-xl shadow-2xl hover:scale-105 transition-transform">
                                                    {cta}
                                                    <ArrowRight className="w-6 h-6" />
                                                </div>
                                            </motion.div>

                                            {/* Brand Watermark */}
                                            <div className="absolute bottom-10 right-10 flex items-center gap-2 opacity-50 font-bold tracking-widest uppercase text-xs">
                                                <div className="h-6 w-6 rounded-lg bg-white/20 flex items-center justify-center">
                                                    <IndianRupee className="w-3 h-3" />
                                                </div>
                                                MoneyCal.in
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Toast Success */}
                                <AnimatePresence>
                                    {showSuccess && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20, x: '-50%' }}
                                            animate={{ opacity: 1, y: 0, x: '-50%' }}
                                            exit={{ opacity: 0, y: 20, x: '-50%' }}
                                            className="absolute bottom-8 left-1/2 flex items-center gap-3 bg-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl z-50 whitespace-nowrap"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                            Promo Downloaded Successfully!
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Instructions / Best Practices */}
                            <div className="mt-8 grid sm:grid-cols-2 gap-4">
                                <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100">
                                    <h3 className="flex items-center gap-2 font-black text-blue-900 text-sm mb-2">
                                        <Sparkles className="w-4 h-4 text-blue-500" />
                                        Pro Tip: Headlines
                                    </h3>
                                    <p className="text-xs text-blue-700 leading-relaxed font-semibold">
                                        Keep your headline within 2-3 lines. Use specific numbers like '10%' or '₹5 Lakhs' to grab attention instantly in newsfeeds.
                                    </p>
                                </div>
                                <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100">
                                    <h3 className="flex items-center gap-2 font-black text-emerald-900 text-sm mb-2">
                                        <ImageIcon className="w-4 h-4 text-emerald-500" />
                                        Background Quality
                                    </h3>
                                    <p className="text-xs text-emerald-700 leading-relaxed font-semibold">
                                        Use high-resolution unsplash images. Darker overlays help the white text pop and improve readability across all device types.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* SEO Text Footer */}
                <div className="max-w-4xl mx-auto px-4 mt-20 text-center">
                    <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tighter">Why use MoneyCal Promo Designer?</h2>
                    <div className="grid sm:grid-cols-3 gap-8">
                        <div>
                            <div className="h-12 w-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-6 h-6 text-amber-500" />
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm mb-2">Zero Speed Latency</h3>
                            <p className="text-xs text-gray-500 font-medium">Everything runs in your browser. No server waiting, no login, instant exports.</p>
                        </div>
                        <div>
                            <div className="h-12 w-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm mb-2">High Conversion</h3>
                            <p className="text-xs text-gray-500 font-medium">Templates optimized for financial services and advisor marketing across India.</p>
                        </div>
                        <div>
                            <div className="h-12 w-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4">
                                <Share2 className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm mb-2">Social Ready</h3>
                            <p className="text-xs text-gray-500 font-medium">Precise aspect ratios for Instagram, Facebook, and Twitter marketing campaigns.</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default PromoDesigner;
