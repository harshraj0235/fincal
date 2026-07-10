import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Clock, CheckCircle, TrendingUp, ChevronRight } from 'lucide-react';
import { fetchIpoData } from '../../services/ipoApi';
import { IpoDetails, IpoResponse } from '../../types/ipo';
import SEOHelmet from '../../components/SEOHelmet';
import { ResponsiveAd } from '../../components/BannerAd';

const IpoHub: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'open' | 'upcoming' | 'closed'>('all');
    const [subTab, setSubTab] = useState<'all' | 'mainboard' | 'sme'>('all');
    const [ipoData, setIpoData] = useState<IpoResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await fetchIpoData();
                setIpoData(data);
            } catch (error) {
                console.error("Failed to fetch IPO data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const getActiveData = (): IpoDetails[] => {
        if (!ipoData) return [];
        let data: IpoDetails[];
        if (activeTab === 'all') {
            data = [...ipoData.open, ...ipoData.upcoming, ...ipoData.closed];
        } else {
            data = ipoData[activeTab];
        }

        if (subTab !== 'all') {
            data = data.filter(ipo => ipo.type.toLowerCase() === subTab.toLowerCase());
        }
        return data;
    };

    const tabs = [
        { id: 'all', label: 'सभी (All)', icon: <Activity className="w-5 h-5" />, count: (ipoData?.open.length || 0) + (ipoData?.upcoming.length || 0) + (ipoData?.closed.length || 0) },
        { id: 'open', label: 'ओपन IPO', icon: <Activity className="w-5 h-5" />, count: ipoData?.open.length || 0 },
        { id: 'upcoming', label: 'आने वाले IPO', icon: <Clock className="w-5 h-5" />, count: ipoData?.upcoming.length || 0 },
        { id: 'closed', label: 'बंद / GMP', icon: <CheckCircle className="w-5 h-5" />, count: ipoData?.closed.length || 0 }
    ] as const;

    const subTabs = [
        { id: 'all', label: 'सभी (All)' },
        { id: 'mainboard', label: 'मेनबोर्ड (Mainboard)' },
        { id: 'sme', label: 'SME IPO' }
    ] as const;

    const faqItems = [
        {
            question: "IPO क्या होता है? (What is an IPO?)",
            answer: "एक IPO (Initial Public Offering) वह प्रक्रिया है जिसके द्वारा एक निजी कंपनी पहली बार जनता को अपने शेयर पेश करती है और शेयर बाज़ार में लिस्ट होती है।"
        },
        {
            question: "ग्रे मार्केट प्रीमियम (GMP) क्या है?",
            answer: "GMP वह अतिरिक्त राशि है जिस पर IPO के शेयर आधिकारिक रूप से शेयर बाज़ार में लिस्ट होने से पहले अनौपचारिक बाज़ार (Grey Market) में ट्रेड किए जाते हैं।"
        },
        {
            question: "SME IPO और Mainboard IPO में क्या अंतर है?",
            answer: "Mainboard IPO बड़ी कंपनियों के लिए होते हैं जिनका नेट वर्थ अधिक होता है, जबकि SME IPO छोटी और मध्यम श्रेणी की कंपनियों के लिए होते हैं जिनकी लिस्टिंग BSE SME या NSE Emerge पर होती है।"
        }
    ];

    return (
        <>
            <SEOHelmet
                title="Live IPO Dashboard India - Hindi Review, GMP & Allotment | MoneyCal"
                description="भारतीय शेयर बाज़ार के सभी लाइव IPO ट्रैक करें। मेनबोर्ड और SME IPO की विस्तृत जानकारी, आज का GMP और अलॉटमेंट स्टेटस हिंदी में।"
                keywords="IPO India, live IPO hindi, stock market ipo, IPO GMP today, SME ipo list hindi"
                url="/ipo"
                faqData={faqItems}
                breadcrumbs={[
                    { name: 'होम', url: '/' },
                    { name: 'IPO डैशबोर्ड', url: '/ipo' }
                ]}
            />

            <div className="min-h-screen bg-[#F8FAFC]">
                {/* Header Hero */}
                <div className="bg-white border-b border-slate-200 pt-24 pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide uppercase mb-4">
                                    <TrendingUp className="w-4 h-4" />
                                    लाइव मार्केट अपडेट
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                    IPO डैशबोर्ड (IPO Hunt)
                                </h1>
                                <p className="text-lg text-slate-600 mt-3 max-w-2xl">
                                    भारतीय बाज़ार के हर मेनबोर्ड और SME IPO का विस्तृत विश्लेषण। GMP टुडे, सब्सक्रिप्शन रेट और कंपनी के फाइनेंशियल की पूरी जानकारी हिंदी में।
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 w-full border-t border-slate-100 pt-6">
                            <ResponsiveAd slot="ipo-hub-hero-bottom" />
                        </div>

                        {/* Main Tabs */}
                        <div className="flex flex-wrap gap-2 mt-10">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === tab.id
                                        ? 'bg-slate-900 text-white shadow-lg'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                        }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                    <span className={`ml-2 px-2 py-0.5 rounded-md text-xs ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Sub Tabs (Categories) */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 border-t border-slate-100 pt-8">
                            <div className="flex flex-wrap gap-4">
                                {subTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setSubTab(tab.id)}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${subTab === tab.id
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="flex flex-wrap gap-3">
                                <Link 
                                    to="/ipo/list/mainboard-ipo-list" reloadDocument 
                                    className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 transition-colors"
                                >
                                    View Mainboard List →
                                </Link>
                                <Link 
                                    to="/ipo/list/sme-ipo-list" reloadDocument 
                                    className="text-xs font-bold text-purple-600 hover:text-purple-800 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100 transition-colors"
                                >
                                    View SME IPO List →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                {getActiveData().length === 0 ? (
                                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                                        <Activity className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">कोई {activeTab} IPO नहीं मिला</h3>
                                        <p className="text-slate-500">मार्केट अपडेट के लिए बाद में दोबारा जांचें।</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {getActiveData().map((ipo) => (
                                            <Link
                                                key={ipo.id}
                                                to={`/ipo/${ipo.slug}`}
                                                className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500 group-hover:via-emerald-400 group-hover:to-blue-500 transition-all duration-500 opacity-0 group-hover:opacity-100" />

                                                <div className="flex justify-between items-start mb-6">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md ${ipo.type === 'Mainboard' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                                                                }`}>
                                                                {ipo.type === 'Mainboard' ? 'मेनबोर्ड' : 'SME'}
                                                            </span>
                                                            {activeTab === 'open' && (
                                                                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md bg-emerald-50 text-emerald-700 flex items-center gap-1">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                                    लाइव
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                                                            {ipo.name}
                                                        </h3>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                                    <div className="bg-slate-50 rounded-xl p-3">
                                                        <div className="text-slate-500 font-medium mb-1 flex items-center gap-1">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            बंद होने की तिथि
                                                        </div>
                                                        <div className="font-bold text-slate-900">{ipo.closeDate}</div>
                                                    </div>
                                                    <div className="bg-slate-50 rounded-xl p-3">
                                                        <div className="text-slate-500 font-medium mb-1">इश्यू साइज</div>
                                                        <div className="font-bold text-slate-900">{ipo.issueSize}</div>
                                                    </div>
                                                    <div className="bg-slate-50 rounded-xl p-3">
                                                        <div className="text-slate-500 font-medium mb-1">प्राइस बैंड</div>
                                                        <div className="font-bold text-slate-900">{ipo.priceBand}</div>
                                                    </div>
                                                    <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                                                        <div className="text-emerald-700 font-medium mb-1 flex items-center gap-1">
                                                            <TrendingUp className="w-3.5 h-3.5" />
                                                            आज का GMP
                                                        </div>
                                                        <div className="font-black text-emerald-800 flex items-center gap-1">
                                                            ₹{ipo.expectedGmp} <span className="text-xs">({ipo.expectedGmpPercentage}%)</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {activeTab === 'open' && (
                                                    <div className="mb-6">
                                                        <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                                                            <span>कुल सब्सक्रिप्शन</span>
                                                            <span className={ipo.subscriptionStatus.total > 1 ? 'text-emerald-600 font-black' : 'text-slate-700 font-black'}>
                                                                {ipo.subscriptionStatus.total}x
                                                            </span>
                                                        </div>
                                                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                                            <div
                                                                className={`h-2 rounded-full ${ipo.subscriptionStatus.total > 1 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                                                                style={{ width: `${Math.min((ipo.subscriptionStatus.total / 10) * 100, 100)}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-blue-600">
                                                    <span>पूरा विश्लेषण देखें</span>
                                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                        <ChevronRight className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                <div className="mt-10">
                                    <ResponsiveAd slot="ipo-hub-list-bottom" />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </>
    );
};

export default IpoHub;
