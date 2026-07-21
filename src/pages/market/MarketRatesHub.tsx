import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';

import { ResponsiveAd } from '../../components/BannerAd';
import { INDIAN_CITIES } from '../../data/market/marketData';
import { fetchLiveRates, CityRates } from '../../services/marketApi';
import { MapPin, TrendingUp, ChevronRight, ShieldCheck, Globe, Clock, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const MarketRatesHub: React.FC = () => {
    const [cityRates, setCityRates] = useState<Record<string, CityRates>>({});

    useEffect(() => {
        const loadInitialRates = async () => {
            const initialCities = INDIAN_CITIES.slice(0, 6);
            const results = await Promise.all(
                initialCities.map(city => fetchLiveRates(city.id))
            );
            const newRates: Record<string, CityRates> = {};
            results.forEach((rate, index) => {
                newRates[initialCities[index].id] = rate;
            });
            setCityRates(newRates);
        };
        loadInitialRates();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50/50">
            <SEOHelmet
                title="Gold & Silver Rates Today India – Live 24K, 22K Prices | MoneyCal"
                description="Check live gold and silver rates for Mumbai, Delhi, Bangalore and all major Indian cities. Updated every 30 minutes with 24K, 22K, 18K gold and silver per kg prices."
                keywords="gold rate today, silver rate india, 24k gold price, 22k gold rate mumbai, live gold prices delhi, gold price chart india"
                url="/gold-rate"
                type="website"
            />

            <WhatsAppBanner />

            {/* Premium Hero Section */}
            <div className="bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 pt-16 pb-32 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-xl">
                            Gold & Silver Rates Today
                        </h1>
                        <p className="text-white/90 text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                            भारत के सभी प्रमुख शहरों के实时 सोने और चांदी के रेट। 24K, 22K और 18K की शुद्धता के साथ सटीक और भरोसेमंद जानकारी।
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20 flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-white" />
                                <span className="text-white font-bold">100% Secure & Verified</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20 flex items-center gap-3">
                                <Clock className="w-6 h-6 text-white" />
                                <span className="text-white font-bold">Live Updates (30 min)</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* City Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-20 relative z-20">
                <div className="w-full flex justify-center mb-8">
                    <ResponsiveAd />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {INDIAN_CITIES.map((city, index) => {
                        const rates = cityRates[city.id];
                        return (
                            <motion.div
                                key={city.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <RouterLink
                                    to={`/${city.slug}`}
                                    className="group block bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-amber-200 transition-all transform hover:-translate-y-2"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                                <MapPin className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-gray-900">{city.name}</h3>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{city.state}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-black text-amber-500 uppercase tracking-widest mb-1">Today's Rate</p>
                                            <div className="flex items-center text-emerald-500 font-black text-sm">
                                                <TrendingUp className="w-4 h-4 mr-1" />
                                                Live
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-gray-50 rounded-2xl p-4 group-hover:bg-amber-50/50 transition-colors">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">24K Gold (1g)</p>
                                            <p className="text-lg font-black text-gray-900">
                                                {rates ? `₹${rates.gold24k.price.toLocaleString('en-IN')}` : 'Loading...'}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 rounded-2xl p-4 group-hover:bg-blue-50/50 transition-colors">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">Silver (1kg)</p>
                                            <p className="text-lg font-black text-gray-900">
                                                {rates ? `₹${rates.silver.price.toLocaleString('en-IN')}` : 'Loading...'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-amber-600 font-bold text-sm">
                                        <span>View Detailed Stats</span>
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </RouterLink>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Benefits / FAQ Teaser Section */}
                <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
                            हमारा डेटा सटीक और <span className="text-amber-500 underline decoration-yellow-500/30">भरोसेमंद</span> क्यों है?
                        </h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-1">Global & Local Aggregation</h4>
                                    <p className="text-gray-500">हम अंतरराष्ट्रीय बुलियन मार्केट और भारत के स्थानीय सराफा बाजार से डेटा संकलित करते हैं।</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                                    <RefreshCw className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-1">Real-time Updates</h4>
                                    <p className="text-gray-500">हर 30 मिनट में कीमतें अपडेट की जाती हैं ताकि आप हमेशा सटीक बाजार भाव से अवगत रहें।</p>
                                </div>
                            </div>
                        </div>
                        <RouterLink to="/gold-tools" className="mt-10 inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-3xl font-black hover:bg-black transition-all transform hover:scale-105 shadow-xl">
                            Explore Gold Calculators →
                        </RouterLink>
                    </div>
                    <div className="bg-white rounded-3xl p-4 shadow-2xl rotate-2">
                        <img src="https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=800" alt="Gold Investment" className="rounded-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketRatesHub;
