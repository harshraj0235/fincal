import React, { useState } from 'react';
import {
    Copy, CheckCircle,
    Users, Award, Sparkles,
    MessageCircle,
    TrendingUp, ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import SEOHelmet from '../../../components/SEOHelmet';

/* ─────────────────────────────────────────────────────────────────────────── */
/* Constants                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

interface MessageTemplate {
    id: string;
    name: string;
    text: (clientName: string, advisorName: string, service: string) => string;
}

const TEMPLATES: MessageTemplate[] = [
    {
        id: 'gratitude',
        name: 'Gratitude & Request',
        text: (c, a, s) => `Hi ${c}, hope you're doing great! 🙏 It’s been a pleasure helping you with your ${s}. If you know anyone looking for expert financial guidance, I’d love to help them too. You can share my contact or this link. Thanks! – ${a}`
    },
    {
        id: 'valuable',
        name: 'Value Focused',
        text: (c, a, s) => `Greetings ${c}! 👋 I'm expanding my ${s} practice and only taking on a few new clients this month. Since you've seen the value we create, if you have a friend who would benefit from a plan like yours, please do connect us. Best, ${a}`
    },
    {
        id: 'specific',
        name: 'Specific Goal',
        text: (c, a, s) => `Hi ${c}, I've just helped a few families secure their ${s} goals 🎯. If you have any friends who are worried about their future planning, feel free to refer them to me for a free audit. Appreciate your trust! – ${a}`
    }
];

/* ─────────────────────────────────────────────────────────────────────────── */
/* Component                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

export const ReferralMessageBuilder: React.FC = () => {
    const [clientName, setClientName] = useState('Valued Client');
    const [advisorName, setAdvisorName] = useState('Your Advisor');
    const [service, setService] = useState('SIP Planning');
    const [activeTemplate, setActiveTemplate] = useState(TEMPLATES[0]);

    const [copied, setCopied] = useState(false);


    const finalMessage = activeTemplate.text(clientName, advisorName, service);

    const handleCopy = () => {
        navigator.clipboard.writeText(finalMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleWhatsApp = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(finalMessage)}`;
        window.open(url, '_blank');
    };

    return (
        <>
            <SEOHelmet
                title="Referral Message & Link Builder for Financial Advisors"
                description="Craft professional WhatsApp referral messages for your clients. Boost your financial advisory business with high-conversion referral templates."
                keywords="financial advisor referral message, whatsapp marketing for agents, referral link builder, client referral request template, financial marketing tool"
                url="/tools/marketing/referral-message-builder"
            />

            <div className="min-h-screen bg-[#FDFCFD] pb-20">

                <div className="bg-white border-b border-gray-100 py-12 px-4 shadow-sm">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                            <div className="h-16 w-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-emerald-100">
                                <Users className="w-8 h-8" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Referral <span className="text-emerald-600">Growth</span> Builder</h1>
                            <p className="text-gray-500 font-medium text-lg">Turn happy clients into your best marketing engine.</p>
                        </motion.div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 mt-12">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">

                        {/* Inputs */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-50">
                                <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <Award className="w-4 h-4 text-emerald-600" /> Client Details
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 mb-2 block">Client Name</label>
                                        <input
                                            value={clientName} onChange={e => setClientName(e.target.value)}
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-black outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 mb-2 block">Your Name (Signature)</label>
                                        <input
                                            value={advisorName} onChange={e => setAdvisorName(e.target.value)}
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-black outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 mb-2 block">Core Service Mentioned</label>
                                        <select
                                            value={service} onChange={e => setService(e.target.value)}
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-black outline-none focus:ring-2 focus:ring-emerald-100 appearance-none"
                                        >
                                            <option>Financial Planning</option>
                                            <option>SIP Planning</option>
                                            <option>Retirement Strategy</option>
                                            <option>Tax Saving</option>
                                            <option>Investment Review</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-50">
                                <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Select Tone</h2>
                                <div className="space-y-3">
                                    {TEMPLATES.map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => setActiveTemplate(t)}
                                            className={`w-full p-4 rounded-2xl text-left font-black text-sm border-2 transition-all ${activeTemplate.id === t.id ? 'bg-emerald-50 border-emerald-600 text-emerald-900' : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'}`}
                                        >
                                            {t.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Preview & Action */}
                        <div className="lg:col-span-8 space-y-8">
                            <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border border-gray-50 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8">
                                    <Sparkles className="w-8 h-8 text-emerald-100" />
                                </div>

                                <h3 className="text-xs font-black text-gray-300 uppercase tracking-[0.4em] mb-10 text-center">Message Preview</h3>

                                <div className="bg-emerald-50/50 p-8 md:p-12 rounded-[2.5rem] border-2 border-dashed border-emerald-100 relative min-h-[300px] flex items-center justify-center">
                                    <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed text-center">
                                        {finalMessage}
                                    </p>
                                </div>

                                <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
                                    <button
                                        onClick={handleCopy}
                                        className="flex-1 bg-gray-900 text-white p-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 transition-all hover:bg-black active:scale-95"
                                    >
                                        {copied ? <CheckCircle className="w-6 h-6 text-emerald-400" /> : <Copy className="w-6 h-6" />}
                                        {copied ? 'Copied Successfully' : 'Copy Message'}
                                    </button>
                                    <button
                                        onClick={handleWhatsApp}
                                        className="flex-1 bg-emerald-600 text-white p-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 transition-all hover:bg-emerald-700 active:scale-95 shadow-xl shadow-emerald-100"
                                    >
                                        <MessageCircle className="w-6 h-6 fill-white" />
                                        Send via WhatsApp
                                    </button>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-gray-50">
                                    <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-black text-gray-900 mb-2">Social Proof Effect</h4>
                                    <p className="text-sm font-medium text-gray-500 leading-relaxed">
                                        Clients are 83% more likely to refer you if you have just delivered a successful review or a positive return statement. Use this then!
                                    </p>
                                </div>
                                <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-gray-50">
                                    <div className="h-10 w-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-4">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-black text-gray-900 mb-2">Trusted Network</h4>
                                    <p className="text-sm font-medium text-gray-500 leading-relaxed">
                                        A warm referral from a friend has a 30% higher conversion rate than any cold digital lead. One message can change your quarter.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ReferralMessageBuilder;
