import React, { useState, useRef } from 'react';
import {
    User, Mail, Phone, Globe, Linkedin,
    MapPin, Download, Copy, CheckCircle,
    Layout, Palette, Eye, Briefcase,
    ExternalLink, Smartphone, Sparkles, Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import SEOHelmet from '../../../components/SEOHelmet';

/* ─────────────────────────────────────────────────────────────────────────── */
/* Types & Templates                                                          */
/* ─────────────────────────────────────────────────────────────────────────── */

interface SignatureData {
    name: string;
    role: string;
    company: string;
    phone: string;
    email: string;
    website: string;
    linkedin: string;
    address: string;
    photo: string | null;
}

const TEMPLATES = [
    { id: 'modern', name: 'Modern Minimal' },
    { id: 'corporate', name: 'Elite Corporate' },
    { id: 'compact', name: 'Compact Card' }
];

/* ─────────────────────────────────────────────────────────────────────────── */
/* Component                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

export const EmailSignatureGenerator: React.FC = () => {
    const [data, setData] = useState<SignatureData>({
        name: 'Harsh Raj',
        role: 'Financial Wealth Advisor',
        company: 'Capital Matrix Investments',
        phone: '+91 98765 43210',
        email: 'contact@capitalmatrix.com',
        website: 'www.capitalmatrix.com',
        linkedin: 'linkedin.com/in/harshraj',
        address: 'Andheri West, Mumbai, India',
        photo: null
    });

    const [activeTemplate, setActiveTemplate] = useState('modern');
    const [accentColor, setAccentColor] = useState('#1e40af'); // blue-800
    const [copying, setCopying] = useState(false);
    const [exporting, setExporting] = useState(false);
    const sigRef = useRef<HTMLDivElement>(null);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (prev) => setData({ ...data, photo: prev.target?.result as string });
            reader.readAsDataURL(file);
        }
    };

    const handleCopy = async () => {
        if (!sigRef.current) return;
        setCopying(true);

        // In a real environment, we'd use a clipboard API for HTML
        // Here we'll just simulate the UX
        setTimeout(() => setCopying(false), 2000);
    };

    const handleDownload = async () => {
        if (!sigRef.current) return;
        setExporting(true);
        try {
            const canvas = await html2canvas(sigRef.current, { backgroundColor: null, scale: 3 });
            const link = document.createElement('a');
            link.download = `email-signature-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } finally {
            setExporting(false);
        }
    };

    return (
        <>
            <SEOHelmet
                title="Free Professional Email Signature Generator for Financial Advisors"
                description="Create premium, high-impact email signatures for financial advisors, real estate agents, and bankers. Free HD downloads and HTML ready templates."
                keywords="email signature generator, professional email signature financial advisor, free email signature maker, branded signature online"
                url="/tools/marketing/email-signature-generator"
            />

            <div className="min-h-screen bg-slate-50 pb-20">
                <div className="bg-white border-b border-slate-200 py-8 px-4">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-indigo-600 mb-2">
                                <Sparkles className="w-5 h-5" />
                                <span className="font-black text-xs uppercase tracking-widest">Brand Your Emails</span>
                            </div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Email <span className="text-indigo-600">Signature</span> Generator</h1>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleDownload}
                                disabled={exporting}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg"
                            >
                                {exporting ? <Layout className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                                Download Image
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 mt-12">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">

                        {/* Editor Sidebar */}
                        <div className="lg:col-span-5 space-y-8">

                            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100">
                                <div className="flex items-center gap-2 mb-6 text-slate-800">
                                    <User className="w-5 h-5 text-indigo-600" />
                                    <h2 className="font-black uppercase tracking-tight">Personal Details</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <label className="relative block h-16 w-16 bg-slate-100 rounded-2xl overflow-hidden cursor-pointer hover:bg-slate-200 transition-all border-2 border-dashed border-slate-300">
                                                {data.photo ? <img src={data.photo} className="h-full w-full object-cover" /> : <Camera className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400" />}
                                                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                                            </label>
                                            <p className="text-[10px] text-center font-bold text-slate-400 mt-1 uppercase">Photo</p>
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <input
                                                placeholder="Full Name" value={data.name} onChange={e => setData({ ...data, name: e.target.value })}
                                                className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold focus:ring-2 focus:ring-indigo-100 outline-none"
                                            />
                                            <input
                                                placeholder="Job Title" value={data.role} onChange={e => setData({ ...data, role: e.target.value })}
                                                className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold focus:ring-2 focus:ring-indigo-100 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            placeholder="Company" value={data.company} onChange={e => setData({ ...data, company: e.target.value })}
                                            className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold outline-none"
                                        />
                                        <input
                                            placeholder="Phone" value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })}
                                            className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold outline-none"
                                        />
                                    </div>
                                    <input
                                        placeholder="Email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })}
                                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold outline-none"
                                    />
                                    <input
                                        placeholder="Website" value={data.website} onChange={e => setData({ ...data, website: e.target.value })}
                                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold outline-none"
                                    />
                                    <textarea
                                        placeholder="Address" value={data.address} onChange={e => setData({ ...data, address: e.target.value })}
                                        rows={2}
                                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold outline-none"
                                    />
                                </div>
                            </div>

                            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100">
                                <div className="flex items-center gap-2 mb-6 text-slate-800">
                                    <Palette className="w-5 h-5 text-indigo-600" />
                                    <h2 className="font-black uppercase tracking-tight">Customization</h2>
                                </div>

                                <div className="flex flex-wrap gap-3 mb-6">
                                    {['#1e40af', '#b91c1c', '#15803d', '#7e22ce', '#0f172a'].map(c => (
                                        <button
                                            key={c} onClick={() => setAccentColor(c)}
                                            className="h-10 w-10 rounded-full border-4 border-white shadow-sm"
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                    <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="h-10 w-10 border-0 p-0 bg-transparent cursor-pointer" />
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    {TEMPLATES.map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => setActiveTemplate(t.id)}
                                            className={`p-3 rounded-xl text-xs font-black transition-all ${activeTemplate === t.id ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                                        >
                                            {t.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Preview Area */}
                        <div className="lg:col-span-7 flex flex-col">
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-center gap-2 font-black text-slate-400 text-xs uppercase tracking-widest">
                                    <Eye className="w-4 h-4" /> Live Preview
                                </div>
                            </div>

                            <div className="bg-white rounded-[2.5rem] p-12 shadow-2xl border border-slate-100 min-h-[400px] flex items-center justify-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: accentColor }} />

                                <div ref={sigRef} className="bg-white p-8 rounded-lg shadow-sm border border-slate-50">
                                    {/* TEMPLATE: MODERN */}
                                    {activeTemplate === 'modern' && (
                                        <div className="flex gap-8 items-center min-w-[450px]">
                                            {data.photo && (
                                                <div className="h-24 w-24 rounded-full overflow-hidden border-2" style={{ borderColor: accentColor }}>
                                                    <img src={data.photo} className="h-full w-full object-cover" />
                                                </div>
                                            )}
                                            <div className="border-l-2 pl-8" style={{ borderColor: accentColor }}>
                                                <h3 className="text-2xl font-black text-slate-900 leading-tight">{data.name}</h3>
                                                <p className="font-bold text-slate-500 text-sm mb-4" style={{ color: accentColor }}>{data.role}</p>

                                                <div className="grid grid-cols-1 gap-2 text-xs font-bold text-slate-600">
                                                    <div className="flex items-center gap-2">
                                                        <Briefcase className="w-3 h-3 opacity-40" /> <span>{data.company}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Smartphone className="w-3 h-3 opacity-40" /> <span>{data.phone}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="w-3 h-3 opacity-40" /> <span>{data.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Globe className="w-3 h-3 opacity-40" /> <span>{data.website}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* TEMPLATE: CORPORATE */}
                                    {activeTemplate === 'corporate' && (
                                        <div className="min-w-[450px]">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="h-10 w-1 bg-slate-900" style={{ backgroundColor: accentColor }} />
                                                <div>
                                                    <h3 className="text-xl font-black text-slate-900">{data.name}</h3>
                                                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: accentColor }}>{data.role}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold text-slate-600 border-t border-slate-100 pt-4">
                                                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {data.phone}</span>
                                                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {data.email}</span>
                                                <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {data.website}</span>
                                                <span className="flex items-center gap-1 text-slate-400 font-medium">{data.address}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* TEMPLATE: COMPACT */}
                                    {activeTemplate === 'compact' && (
                                        <div className="max-w-sm">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="h-16 w-16 bg-slate-900 flex items-center justify-center text-white font-black text-xl rounded-2xl" style={{ backgroundColor: accentColor }}>
                                                    {data.photo ? <img src={data.photo} className="h-full w-full object-cover rounded-2xl" /> : data.name.charAt(0)}
                                                </div>
                                                <div className="pt-1">
                                                    <h3 className="text-lg font-black text-slate-900 leading-none mb-1">{data.name}</h3>
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-2">{data.role}</p>
                                                    <div className="flex gap-2">
                                                        <Linkedin className="w-4 h-4 text-white p-1 rounded-md" style={{ backgroundColor: accentColor }} />
                                                        <Mail className="w-4 h-4 text-white p-1 rounded-md" style={{ backgroundColor: accentColor }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-[10px] font-black text-slate-600 border-t border-slate-100 pt-3 flex justify-between">
                                                <span>{data.company}</span>
                                                <span className="opacity-40">{data.website}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tips */}
                            <div className="mt-8 bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100">
                                <h4 className="font-black text-indigo-900 text-sm mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" /> Pro Branding Tip
                                </h4>
                                <p className="text-xs font-bold text-indigo-700 leading-relaxed">
                                    Use your brand's primary color as the accent color to maintain consistency.
                                    Adding a photo increases trust by <span className="underline">48%</span> in financial services.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmailSignatureGenerator;
