import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Sun, Moon, Sparkles, Home, ChevronRight,
  Share2, Download, Bell, ArrowRight, Info, Heart, Gift, Check, Copy,
  X, Star, Users, Music, Palette, ExternalLink, ShoppingBag, Zap
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Navratri occurs twice yearly - Chaitra (Spring) and Sharad (Autumn)
// Celebrated for 9 days from Pratipada (1st day) to Navami (9th day) of Shukla Paksha
const NAVRATRI_DATA = {
  2020: {
    chaitra: { start: '2020-03-25', end: '2020-04-02', ramaNavami: '2020-04-02', ghatasthapana: '05:51 - 10:14', pratipada: '2020-03-25T08:23:00+05:30' },
    sharad: { start: '2020-10-17', end: '2020-10-25', dussehra: '2020-10-26', ghatasthapana: '06:23 - 07:43', pratipada: '2020-10-17T06:57:00+05:30' }
  },
  2021: {
    chaitra: { start: '2021-04-13', end: '2021-04-21', ramaNavami: '2021-04-21', ghatasthapana: '06:10 - 10:35', pratipada: '2021-04-13T02:27:00+05:30' },
    sharad: { start: '2021-10-07', end: '2021-10-15', dussehra: '2021-10-15', ghatasthapana: '06:20 - 07:40', pratipada: '2021-10-07T11:45:00+05:30' }
  },
  2022: {
    chaitra: { start: '2022-04-02', end: '2022-04-10', ramaNavami: '2022-04-10', ghatasthapana: '06:17 - 10:42', pratipada: '2022-04-02T13:23:00+05:30' },
    sharad: { start: '2022-09-26', end: '2022-10-04', dussehra: '2022-10-05', ghatasthapana: '06:27 - 07:47', pratipada: '2022-09-26T06:03:00+05:30' }
  },
  2023: {
    chaitra: { start: '2023-03-22', end: '2023-03-30', ramaNavami: '2023-03-30', ghatasthapana: '06:24 - 10:49', pratipada: '2023-03-22T09:20:00+05:30' },
    sharad: { start: '2023-10-15', end: '2023-10-23', dussehra: '2023-10-24', ghatasthapana: '06:25 - 07:45', pratipada: '2023-10-15T17:44:00+05:30' }
  },
  2024: {
    chaitra: { start: '2024-04-09', end: '2024-04-17', ramaNavami: '2024-04-17', ghatasthapana: '06:03 - 10:28', pratipada: '2024-04-09T11:50:00+05:30' },
    sharad: { start: '2024-10-03', end: '2024-10-11', dussehra: '2024-10-12', ghatasthapana: '06:28 - 07:48', pratipada: '2024-10-03T18:32:00+05:30' }
  },
  2025: {
    chaitra: { start: '2025-03-30', end: '2025-04-07', ramaNavami: '2025-04-06', ghatasthapana: '06:14 - 10:39', pratipada: '2025-03-30T00:00:00+05:30' },
    sharad: { start: '2025-09-22', end: '2025-09-30', dussehra: '2025-10-01', ghatasthapana: '06:32 - 07:52', pratipada: '2025-09-22T23:13:00+05:30' }
  },
  2026: {
    chaitra: { start: '2026-03-19', end: '2026-03-27', ramaNavami: '2026-03-27', ghatasthapana: '06:26 - 10:51', pratipada: '2026-03-19T17:01:00+05:30' },
    sharad: { start: '2026-10-12', end: '2026-10-20', dussehra: '2026-10-21', ghatasthapana: '06:24 - 07:44', pratipada: '2026-10-12T05:31:00+05:30' }
  },
  2027: {
    chaitra: { start: '2027-04-08', end: '2027-04-16', ramaNavami: '2027-04-15', ghatasthapana: '06:05 - 10:30', pratipada: '2027-04-08T05:13:00+05:30' },
    sharad: { start: '2027-10-02', end: '2027-10-10', dussehra: '2027-10-10', ghatasthapana: '06:29 - 07:49', pratipada: '2027-10-02T15:20:00+05:30' }
  },
  2028: {
    chaitra: { start: '2028-03-26', end: '2028-04-03', ramaNavami: '2028-04-03', ghatasthapana: '06:18 - 10:43', pratipada: '2028-03-26T12:23:00+05:30' },
    sharad: { start: '2028-09-20', end: '2028-09-28', dussehra: '2028-09-29', ghatasthapana: '06:34 - 07:54', pratipada: '2028-09-20T22:47:00+05:30' }
  },
  2029: {
    chaitra: { start: '2029-04-14', end: '2029-04-22', ramaNavami: '2029-04-21', ghatasthapana: '05:58 - 10:23', pratipada: '2029-04-14T21:33:00+05:30' },
    sharad: { start: '2029-10-09', end: '2029-10-17', dussehra: '2029-10-18', ghatasthapana: '06:26 - 07:46', pratipada: '2029-10-09T07:03:00+05:30' }
  },
  2030: {
    chaitra: { start: '2030-04-04', end: '2030-04-12', ramaNavami: '2030-04-11', ghatasthapana: '06:11 - 10:36', pratipada: '2030-04-04T06:43:00+05:30' },
    sharad: { start: '2030-09-28', end: '2030-10-06', dussehra: '2030-10-07', ghatasthapana: '06:30 - 07:50', pratipada: '2030-09-28T16:31:00+05:30' }
  }
};

// 9 Colors of Navratri (widely accepted tradition)
const NAVRATRI_COLORS = {
  1: { color: 'White', hex: '#FFFFFF', meaning: 'Peace & purity - Goddess Shailputri', outfit: 'White saree, white kurta' },
  2: { color: 'Red', hex: '#DC2626', meaning: 'Energy & passion - Goddess Brahmacharini', outfit: 'Red saree, red lehenga' },
  3: { color: 'Royal Blue', hex: '#1E40AF', meaning: 'Strength & courage - Goddess Chandraghanta', outfit: 'Blue saree, blue suit' },
  4: { color: 'Yellow', hex: '#EAB308', meaning: 'Happiness & brightness - Goddess Kushmanda', outfit: 'Yellow saree, yellow dress' },
  5: { color: 'Green', hex: '#16A34A', meaning: 'Growth & harmony - Goddess Skandamata', outfit: 'Green saree, green outfit' },
  6: { color: 'Grey', hex: '#6B7280', meaning: 'Balance & stability - Goddess Katyayani', outfit: 'Grey saree, silver outfit' },
  7: { color: 'Orange', hex: '#EA580C', meaning: 'Enthusiasm & warmth - Goddess Kalaratri', outfit: 'Orange saree, orange lehenga' },
  8: { color: 'Peacock Green', hex: '#059669', meaning: 'Uniqueness & beauty - Goddess Mahagauri', outfit: 'Peacock green saree' },
  9: { color: 'Pink', hex: '#EC4899', meaning: 'Hope & new beginnings - Goddess Siddhidatri', outfit: 'Pink saree, pink dress' }
};

const INDIAN_CITIES = [
  { name: 'Delhi', state: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lon: 72.8777 },
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lon: 77.5946 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lon: 88.3639 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lon: 72.5714 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lon: 73.8567 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lon: 75.7873 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lon: 78.4867 },
  { name: 'Vadodara', state: 'Gujarat', lat: 22.3072, lon: 73.1812 },
  { name: 'Surat', state: 'Gujarat', lat: 21.1702, lon: 72.8311 },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lon: 75.8577 },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lon: 79.0882 },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lon: 82.9739 }
];

const NavratriDatesFinder: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [navratriType, setNavratriType] = useState<'chaitra' | 'sharad'>('sharad');
  const [selectedCity, setSelectedCity] = useState(INDIAN_CITIES[0]);
  const [searchCity, setSearchCity] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdownTime, setCountdownTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
  const navratriData = NAVRATRI_DATA[selectedYear as keyof typeof NAVRATRI_DATA]?.[navratriType];

  // Generate 9 days array
  const nineDays = useMemo(() => {
    if (!navratriData) return [];
    const startDate = new Date(navratriData.start);
    return Array.from({ length: 9 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return {
        dayNumber: i + 1,
        date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' }),
        weekday: date.toLocaleDateString('en-IN', { weekday: 'long' }),
        ...NAVRATRI_COLORS[i + 1 as keyof typeof NAVRATRI_COLORS]
      };
    });
  }, [navratriData]);

  // Filter cities
  const filteredCities = useMemo(() => {
    if (!searchCity) return INDIAN_CITIES;
    const query = searchCity.toLowerCase();
    return INDIAN_CITIES.filter(city => 
      city.name.toLowerCase().includes(query) || 
      city.state.toLowerCase().includes(query)
    );
  }, [searchCity]);

  // Live countdown
  useEffect(() => {
    if (!navratriData) return;

    const updateCountdown = () => {
      const startDate = new Date(navratriData.start);
      const now = new Date();
      const diff = startDate.getTime() - now.getTime();
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdownTime({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [navratriData]);

  const shareUrl = `https://moneycal.in/festival-tools/navratri-dates?year=${selectedYear}&type=${navratriType}&city=${selectedCity.name}`;
  const shareText = `${navratriType === 'chaitra' ? 'Chaitra' : 'Sharad'} Navratri ${selectedYear}: ${new Date(navratriData?.start || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} - ${new Date(navratriData?.end || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} | 9 Days Color Calendar`;

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);
    
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEOHelmet
        title={`${navratriType === 'chaitra' ? 'Chaitra' : 'Sharad'} Navratri ${selectedYear} Dates ${selectedCity.name} - 9 Days Color Calendar, Ghatasthapana Muhurat | Start & End Date`}
        description={`${navratriType === 'chaitra' ? 'Chaitra' : 'Sharad'} Navratri ${selectedYear} dates: ${new Date(navratriData?.start || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} to ${new Date(navratriData?.end || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} in ${selectedCity.name}. Get 9-day color calendar, Ghatasthapana muhurat, day-wise goddess names, ${navratriType === 'sharad' ? 'Dussehra' : 'Rama Navami'} date!`}
        keywords={`navratri ${selectedYear} dates, ${navratriType} navratri ${selectedYear}, navratri start date ${selectedYear}, navratri end date ${selectedYear}, navratri colours ${selectedYear}, 9 days navratri colors, ghatasthapana muhurat ${selectedYear}, navratri ${selectedYear} ${selectedCity.name.toLowerCase()}, navratri color calendar, when is navratri ${selectedYear}, durga puja ${selectedYear} dates, dussehra ${selectedYear}`}
        url={`/festival-tools/navratri-dates?year=${selectedYear}&type=${navratriType}&city=${selectedCity.name}`}
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-orange-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-orange-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-dates" className="hover:text-orange-600 transition-colors">
                Festival Dates
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-orange-600 font-medium">Navratri Dates</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-pink-500/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-pink-600 text-white px-6 py-2 rounded-full mb-6">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">9-Day Color Calendar | Chaitra & Sharad Navratri</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                Navratri {selectedYear} Dates & Color Calendar
              </h1>

              <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto">
                Find exact start & end dates, 9-day color calendar, Ghatasthapana muhurat for both Chaitra & Sharad Navratri!
              </p>

              {navratriData && countdownTime.days > 0 && countdownTime.days < 365 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center space-x-4 bg-orange-100 text-orange-800 px-8 py-4 rounded-2xl font-bold text-lg"
                >
                  <Clock className="w-6 h-6" />
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl">{countdownTime.days}</span>
                    <span className="text-sm">days</span>
                    <span className="text-2xl">:</span>
                    <span className="text-3xl">{String(countdownTime.hours).padStart(2, '0')}</span>
                    <span className="text-sm">hrs</span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Main Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-200">
                {/* Controls */}
                <div className="bg-gradient-to-r from-orange-600 to-red-600 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-3 flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Select Year
                      </label>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white font-bold text-lg focus:outline-none focus:border-white backdrop-blur-sm appearance-none cursor-pointer"
                      >
                        {years.map(year => (
                          <option key={year} value={year} className="text-gray-900">
                            Navratri {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-3 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Navratri Type
                      </label>
                      <select
                        value={navratriType}
                        onChange={(e) => setNavratriType(e.target.value as 'chaitra' | 'sharad')}
                        className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white font-bold text-lg focus:outline-none focus:border-white backdrop-blur-sm appearance-none cursor-pointer"
                      >
                        <option value="sharad" className="text-gray-900">Sharad Navratri (Oct)</option>
                        <option value="chaitra" className="text-gray-900">Chaitra Navratri (Mar-Apr)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-3 flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        City
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search city..."
                          value={searchCity}
                          onChange={(e) => setSearchCity(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white font-bold text-lg focus:outline-none focus:border-white backdrop-blur-sm placeholder-white/60"
                        />
                        {searchCity && filteredCities.length > 0 && (
                          <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl max-h-48 overflow-y-auto z-50">
                            {filteredCities.map((city) => (
                              <button
                                key={`${city.name}-${city.state}`}
                                onClick={() => {
                                  setSelectedCity(city);
                                  setSearchCity('');
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-orange-50 transition-colors border-b border-gray-100 last:border-b-0 text-sm"
                              >
                                <div className="font-semibold text-gray-900">{city.name}</div>
                                <div className="text-xs text-gray-600">{city.state}</div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-2 text-white/80 text-xs">
                        {selectedCity.name}, {selectedCity.state}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results */}
                {navratriData && (
                  <div className="p-8">
                    {/* Main Info */}
                    <div className="text-center mb-8 pb-8 border-b-2 border-orange-100">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {navratriType === 'chaitra' ? 'Chaitra' : 'Sharad'} Navratri {selectedYear}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
                          <div className="text-sm text-gray-600 mb-2">Start Date (Pratipada)</div>
                          <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            {new Date(navratriData.start).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                          </div>
                          <div className="text-lg text-gray-700 font-semibold mt-1">
                            {new Date(navratriData.start).toLocaleDateString('en-IN', { weekday: 'long' })}
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200">
                          <div className="text-sm text-gray-600 mb-2">End Date (Navami)</div>
                          <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                            {new Date(navratriData.end).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                          </div>
                          <div className="text-lg text-gray-700 font-semibold mt-1">
                            {new Date(navratriData.end).toLocaleDateString('en-IN', { weekday: 'long' })}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                          <Star className="w-4 h-4" />
                          <span className="font-semibold">
                            {navratriType === 'sharad' ? `Dussehra: ${new Date(navratriData.dussehra).toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}` : `Rama Navami: ${new Date(navratriData.ramaNavami).toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Ghatasthapana Muhurat */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200 mb-8">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 text-xl">Ghatasthapana Shubh Muhurat</h3>
                      </div>
                      <p className="text-4xl font-bold text-orange-600 mb-2">{navratriData.ghatasthapana}</p>
                      <p className="text-gray-700">
                        Auspicious time to establish Kalash (pot) and begin Navratri puja on {new Date(navratriData.start).toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}
                      </p>
                    </div>

                    {/* 9 Days Color Calendar */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        🎨 9 Days Navratri Color Calendar {selectedYear}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {nineDays.map((day, index) => (
                          <motion.div
                            key={day.dayNumber}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white p-6 rounded-2xl shadow-lg border-2 hover:shadow-xl transition-all"
                            style={{ borderColor: day.hex }}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-lg font-bold text-gray-900">Day {day.dayNumber}</span>
                              <div 
                                className="w-10 h-10 rounded-full border-2 border-gray-200 shadow-md"
                                style={{ backgroundColor: day.hex }}
                              ></div>
                            </div>
                            <div className="text-sm text-gray-600 mb-2">{day.date}</div>
                            <div className="text-xs text-gray-500 mb-3">{day.weekday}</div>
                            <div className="font-bold text-gray-900 mb-2" style={{ color: day.hex }}>
                              {day.color}
                            </div>
                            <p className="text-xs text-gray-700 mb-2">{day.meaning}</p>
                            <p className="text-xs text-gray-600 italic">{day.outfit}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      <button
                        onClick={() => window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${navratriType === 'chaitra' ? 'Chaitra' : 'Sharad'}+Navratri+${selectedYear}&dates=${navratriData.start.replace(/-/g, '')}/${navratriData.end.replace(/-/g, '')}&details=Ghatasthapana+${navratriData.ghatasthapana}&location=${selectedCity.name}`, '_blank')}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                      >
                        <Download className="w-5 h-5" />
                        <span>Add 9 Days to Calendar</span>
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => setShowShareMenu(!showShareMenu)}
                          className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-orange-600 text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all"
                        >
                          <Share2 className="w-5 h-5" />
                          <span>Share Color Calendar</span>
                        </button>

                        <AnimatePresence>
                          {showShareMenu && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 min-w-[200px]"
                            >
                              <button
                                onClick={() => handleShare('whatsapp')}
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-green-50 rounded-lg"
                              >
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                  <Share2 className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-semibold">WhatsApp</span>
                              </button>
                              <button
                                onClick={handleCopyLink}
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 rounded-lg"
                              >
                                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                  {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                                </div>
                                <span className="font-semibold">{copied ? 'Copied!' : 'Copy Link'}</span>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <button
                        onClick={() => window.print()}
                        className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-pink-600 text-pink-600 rounded-xl font-bold hover:bg-pink-50 transition-all"
                      >
                        <Download className="w-5 h-5" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-4xl font-bold mb-8">{navratriType === 'chaitra' ? 'Chaitra' : 'Sharad'} Navratri {selectedYear} Complete Guide</h2>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl mb-8">
                <h3 className="text-2xl font-bold mb-4">What is {navratriType === 'chaitra' ? 'Chaitra' : 'Sharad'} Navratri?</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>{navratriType === 'chaitra' ? 'Chaitra' : 'Sharad'} Navratri {selectedYear} starts on {new Date(navratriData?.start || '').toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} and ends on {new Date(navratriData?.end || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}</strong>. Navratri ("nine nights") is a Hindu festival dedicated to worshipping Goddess Durga in her nine forms (Navadurga). The festival celebrates the victory of good over evil.
                </p>
                <p className="text-gray-700">
                  {navratriType === 'sharad' ? 
                    'Sharad Navratri (also called Maha Navratri) is celebrated in autumn (September-October) with grandeur across India - Durga Puja in Bengal, Garba/Dandiya in Gujarat, and Ramlila in North India. It culminates in Vijayadashami/Dussehra.' :
                    'Chaitra Navratri is celebrated in spring (March-April) and ends with Rama Navami, Lord Rama\'s birthday. It\'s observed with fasting, puja, and devotional singing.'}
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-3xl font-bold mb-6">9 Days Navratri Color Significance</h3>
                <div className="space-y-4">
                  {Object.entries(NAVRATRI_COLORS).map(([day, colorInfo]) => (
                    <div key={day} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50">
                      <div 
                        className="w-16 h-16 rounded-full flex-shrink-0 shadow-lg border-4 border-white flex items-center justify-center text-white font-bold text-xl"
                        style={{ backgroundColor: colorInfo.hex }}
                      >
                        {day}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 mb-1">{colorInfo.color}</h4>
                        <p className="text-sm text-gray-700 mb-1">{colorInfo.meaning}</p>
                        <p className="text-xs text-gray-600 italic">Wear: {colorInfo.outfit}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-xl">
                  <h4 className="font-bold mb-3">🛒 Shop Navratri Outfits by Color:</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <a href="https://www.amazon.in/s?k=navratri+dress" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline flex items-center">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Navratri Lehengas (Amazon)
                    </a>
                    <a href="https://www.flipkart.com/search?q=garba+dress" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline flex items-center">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Garba Outfits (Flipkart)
                    </a>
                    <Link to="/festival-shopping" className="text-orange-600 hover:underline flex items-center">
                      <ArrowRight className="w-4 h-4 mr-1" />
                      Festival Shopping Planner
                    </Link>
                    <Link to="/design-tools" className="text-orange-600 hover:underline flex items-center">
                      <ArrowRight className="w-4 h-4 mr-1" />
                      Navratri Wishes Maker
                    </Link>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-3xl font-bold mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-6">
                    <h4 className="font-bold text-xl mb-2">1. When is {navratriType === 'chaitra' ? 'Chaitra' : 'Sharad'} Navratri {selectedYear}?</h4>
                    <p className="text-gray-700">
                      <strong>{navratriType === 'chaitra' ? 'Chaitra' : 'Sharad'} Navratri {selectedYear} starts on {new Date(navratriData?.start || '').toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })} and ends on {new Date(navratriData?.end || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}</strong>. The 9-day festival begins with Ghatasthapana on Day 1 and concludes with {navratriType === 'sharad' ? 'Maha Navami followed by Vijayadashami/Dussehra' : 'Rama Navami'}.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="font-bold text-xl mb-2">2. What are the 9 colors of Navratri and their significance?</h4>
                    <p className="text-gray-700">
                      The 9 Navratri colors for {selectedYear} are: Day 1-White (peace), Day 2-Red (energy), Day 3-Royal Blue (strength), Day 4-Yellow (happiness), Day 5-Green (growth), Day 6-Grey (balance), Day 7-Orange (enthusiasm), Day 8-Peacock Green (beauty), Day 9-Pink (hope). Each color represents one of the nine forms of Goddess Durga.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="font-bold text-xl mb-2">3. What is Ghatasthapana and when should it be done?</h4>
                    <p className="text-gray-700">
                      Ghatasthapana (establishing sacred pot/kalash) marks the beginning of Navratri. For {selectedYear}, the shubh muhurat is <strong>{navratriData?.ghatasthapana} in {selectedCity.name}</strong>. Place kalash with water, mango leaves, coconut, and sow barley seeds. This ritual invokes Goddess Durga's presence for the 9-day worship.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="font-bold text-xl mb-2">4. Difference between Chaitra and Sharad Navratri?</h4>
                    <p className="text-gray-700">
                      <strong>Sharad Navratri</strong> (autumn, Sep-Oct) is more widely celebrated with Durga Puja, Garba, Dandiya, and ends with Dussehra. <strong>Chaitra Navratri</strong> (spring, Mar-Apr) is observed with fasting and ends with Rama Navami. Both honor Goddess Durga for 9 days starting from Pratipada (1st day of Shukla Paksha).
                    </p>
                  </div>

                  <div className="border-l-4 border-pink-500 pl-6">
                    <h4 className="font-bold text-xl mb-2">5. Can I wear different colors than the traditional Navratri color calendar?</h4>
                    <p className="text-gray-700">
                      Yes! The color calendar is a popular modern tradition, not a religious requirement. Regional variations exist (Gujarat vs Bengal vs South India). You can wear any color respectfully. The tradition helps community coordination for Garba/Dandiya events. Focus on devotion - Goddess Durga blesses all sincere worshippers regardless of outfit color!
                    </p>
                  </div>
                </div>
              </div>

              {/* External Links */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200 mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <ExternalLink className="w-6 h-6 mr-2 text-blue-600" />
                  Trusted Resources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <a href="https://www.drikpanchang.com/navratri/info/navratri.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Drik Panchang - Navratri Authority
                  </a>
                  <a href="https://en.wikipedia.org/wiki/Navaratri" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Wikipedia - Navratri History
                  </a>
                  <a href="https://www.amazon.in/navratri-dress" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Navratri Outfits (Amazon)
                  </a>
                  <a href="https://www.youtube.com/results?search_query=navratri+garba" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Garba Dance Tutorials (YouTube)
                  </a>
                </div>
              </div>

              {/* Internal Links */}
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8 rounded-2xl">
                <h3 className="text-3xl font-bold mb-6 text-center">More Festival Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/festival-dates" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl">
                    <Calendar className="w-8 h-8 mb-2" />
                    <h4 className="font-bold text-lg">Festival Calendar {selectedYear}</h4>
                  </Link>
                  <Link to="/religious-tools" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl">
                    <Star className="w-8 h-8 mb-2" />
                    <h4 className="font-bold text-lg">Puja Vidhi & Mantras</h4>
                  </Link>
                  <Link to="/festival-shopping" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl">
                    <ShoppingBag className="w-8 h-8 mb-2" />
                    <h4 className="font-bold text-lg">Festival Shopping Guide</h4>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default NavratriDatesFinder;

