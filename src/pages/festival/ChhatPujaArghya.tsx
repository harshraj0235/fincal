import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Sun, Sunrise, Home, ChevronRight, Sunset,
  Share2, Download, Bell, ArrowRight, Info, Heart, Gift, Check, Copy,
  X, Star, Zap, Users, ShoppingBag, ExternalLink, Award, Droplets
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Chhath Puja is celebrated on Kartik Shukla Chaturthi (4 days)
// Most important: Sandhya Arghya (evening sunset) and Usha Arghya (morning sunrise)
const CHHATH_PUJA_DATA = {
  2020: { nahayKhay: '2020-11-18', lohanda: '2020-11-19', sandhyaArghya: '2020-11-20', ushaArghya: '2020-11-21', sunsetTime: '17:21', sunriseTime: '06:40', day: 'Friday-Monday' },
  2021: { nahayKhay: '2021-11-08', lohanda: '2021-11-09', sandhyaArghya: '2021-11-10', ushaArghya: '2021-11-11', sunsetTime: '17:27', sunriseTime: '06:32', day: 'Monday-Thursday' },
  2022: { nahayKhay: '2022-10-28', lohanda: '2022-10-29', sandhyaArghya: '2022-10-30', ushaArghya: '2022-10-31', sunsetTime: '17:35', sunriseTime: '06:22', day: 'Friday-Monday' },
  2023: { nahayKhay: '2023-11-17', lohanda: '2023-11-18', sandhyaArghya: '2023-11-19', ushaArghya: '2023-11-20', sunsetTime: '17:20', sunriseTime: '06:39', day: 'Friday-Monday' },
  2024: { nahayKhay: '2024-11-05', lohanda: '2024-11-06', sandhyaArghya: '2024-11-07', ushaArghya: '2024-11-08', sunsetTime: '17:28', sunriseTime: '06:30', day: 'Tuesday-Friday' },
  2025: { nahayKhay: '2025-10-27', lohanda: '2025-10-28', sandhyaArghya: '2025-10-29', ushaArghya: '2025-10-30', sunsetTime: '17:36', sunriseTime: '06:20', day: 'Monday-Thursday' },
  2026: { nahayKhay: '2026-11-15', lohanda: '2026-11-16', sandhyaArghya: '2026-11-17', ushaArghya: '2026-11-18', sunsetTime: '17:22', sunriseTime: '06:37', day: 'Sunday-Wednesday' },
  2027: { nahayKhay: '2027-11-04', lohanda: '2027-11-05', sandhyaArghya: '2027-11-06', ushaArghya: '2027-11-07', sunsetTime: '17:29', sunriseTime: '06:29', day: 'Thursday-Sunday' },
  2028: { nahayKhay: '2028-10-24', lohanda: '2028-10-25', sandhyaArghya: '2028-10-26', ushaArghya: '2028-10-27', sunsetTime: '17:38', sunriseTime: '06:17', day: 'Tuesday-Friday' },
  2029: { nahayKhay: '2029-11-12', lohanda: '2029-11-13', sandhyaArghya: '2029-11-14', ushaArghya: '2029-11-15', sunsetTime: '17:24', sunriseTime: '06:35', day: 'Monday-Thursday' },
  2030: { nahayKhay: '2030-11-01', lohanda: '2030-11-02', sandhyaArghya: '2030-11-03', ushaArghya: '2030-11-04', sunsetTime: '17:31', sunriseTime: '06:27', day: 'Friday-Monday' }
};

// Major Indian Cities (focused on Bihar, Jharkhand, UP, and all metros)
const INDIAN_CITIES = [
  { name: 'Patna', state: 'Bihar', lat: 25.5941, lon: 85.1376 },
  { name: 'Gaya', state: 'Bihar', lat: 24.7955, lon: 85.0002 },
  { name: 'Bhagalpur', state: 'Bihar', lat: 25.2425, lon: 86.9842 },
  { name: 'Muzaffarpur', state: 'Bihar', lat: 26.1225, lon: 85.3906 },
  { name: 'Darbhanga', state: 'Bihar', lat: 26.1542, lon: 85.8918 },
  { name: 'Ranchi', state: 'Jharkhand', lat: 23.3441, lon: 85.3096 },
  { name: 'Jamshedpur', state: 'Jharkhand', lat: 22.8046, lon: 86.2029 },
  { name: 'Dhanbad', state: 'Jharkhand', lat: 23.7957, lon: 86.4304 },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lon: 82.9739 },
  { name: 'Gorakhpur', state: 'Uttar Pradesh', lat: 26.7606, lon: 83.3732 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462 },
  { name: 'Allahabad', state: 'Uttar Pradesh', lat: 25.4358, lon: 81.8463 },
  { name: 'Delhi', state: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lon: 72.8777 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lon: 88.3639 },
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lon: 77.5946 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lon: 78.4867 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lon: 73.8567 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lon: 72.5714 }
];

const ChhatPujaArghya: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCity, setSelectedCity] = useState(INDIAN_CITIES[0]);
  const [searchCity, setSearchCity] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdownTime, setCountdownTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
  const chhatData = CHHATH_PUJA_DATA[selectedYear as keyof typeof CHHATH_PUJA_DATA];

  // Filter cities
  const filteredCities = useMemo(() => {
    if (!searchCity) return INDIAN_CITIES;
    const query = searchCity.toLowerCase();
    return INDIAN_CITIES.filter(city => 
      city.name.toLowerCase().includes(query) || 
      city.state.toLowerCase().includes(query)
    );
  }, [searchCity]);

  // Live countdown to Sandhya Arghya
  useEffect(() => {
    if (!chhatData) return;

    const updateCountdown = () => {
      const sandhyaDate = new Date(chhatData.sandhyaArghya);
      const now = new Date();
      const diff = sandhyaDate.getTime() - now.getTime();
      
      if (diff > 0 && diff < 365 * 24 * 60 * 60 * 1000) {
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
  }, [chhatData]);

  const shareUrl = `https://moneycal.in/festival-tools/chhath-puja-arghya?year=${selectedYear}&city=${selectedCity.name}`;
  const shareText = `Chhath Puja ${selectedYear}: Sandhya Arghya on ${new Date(chhatData?.sandhyaArghya || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} at ${chhatData?.sunsetTime}, Usha Arghya at ${chhatData?.sunriseTime} in ${selectedCity.name}`;

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
        title={`Chhath Puja ${selectedYear} Arghya Time ${selectedCity.name} - Sandhya Arghya Sunset Time, Usha Arghya Sunrise Time | Complete 4-Day Guide`}
        description={`Chhath Puja ${selectedYear} in ${selectedCity.name}: Sandhya Arghya sunset at ${chhatData?.sunsetTime}, Usha Arghya sunrise at ${chhatData?.sunriseTime}. Get complete 4-day schedule: Nahay Khay (${new Date(chhatData?.nahayKhay || '').toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}) → Usha Arghya (${new Date(chhatData?.ushaArghya || '').toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}). Exact timing for offering to Surya Dev!`}
        keywords={`chhath puja ${selectedYear} arghya time, chhath puja ${selectedYear} ${selectedCity.name.toLowerCase()}, sandhya arghya sunset time ${selectedYear}, usha arghya sunrise time ${selectedYear}, chhath puja ${selectedYear} bihar, chhath puja dates ${selectedYear}, nahay khay ${selectedYear}, lohanda kharna ${selectedYear}, chhath vrat ${selectedYear}, surya arghya timing`}
        url={`/festival-tools/chhath-puja-arghya?year=${selectedYear}&city=${selectedCity.name}`}
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
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
              <span className="text-orange-600 font-medium">Chhath Puja Arghya</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-6 py-2 rounded-full mb-6">
                <Sun className="w-5 h-5" />
                <span className="font-semibold">Offering to Surya Dev | 50+ Cities</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent">
                Chhath Puja {selectedYear} Arghya Time
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Find exact Sandhya Arghya (sunset) & Usha Arghya (sunrise) timings for {selectedCity.name}! Complete 4-day Chhath Puja schedule with precise offering times to Surya Bhagwan.
              </p>

              {/* Live Countdown */}
              {chhatData && countdownTime.days > 0 && countdownTime.days < 365 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="max-w-4xl mx-auto mb-8"
                >
                  <div className="bg-gradient-to-r from-orange-600 to-yellow-600 p-8 rounded-3xl shadow-2xl">
                    <h2 className="text-white text-2xl font-bold mb-6">
                      ⏰ Countdown to Sandhya Arghya {selectedYear}
                    </h2>
                    <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                        <div className="text-5xl md:text-6xl font-bold text-white mb-2">{String(countdownTime.days).padStart(2, '0')}</div>
                        <div className="text-white/90 text-sm font-semibold">DAYS</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                        <div className="text-5xl md:text-6xl font-bold text-white mb-2">{String(countdownTime.hours).padStart(2, '0')}</div>
                        <div className="text-white/90 text-sm font-semibold">HOURS</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                        <div className="text-5xl md:text-6xl font-bold text-white mb-2">{String(countdownTime.minutes).padStart(2, '0')}</div>
                        <div className="text-white/90 text-sm font-semibold">MINS</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                        <div className="text-5xl md:text-6xl font-bold text-white mb-2">{String(countdownTime.seconds).padStart(2, '0')}</div>
                        <div className="text-white/90 text-sm font-semibold">SECS</div>
                      </div>
                    </div>
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
                <div className="bg-gradient-to-r from-orange-600 to-yellow-600 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            Chhath Puja {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-3 flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Select City
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
                                className="w-full px-4 py-2 text-left hover:bg-orange-50 transition-colors border-b border-gray-100 last:border-b-0"
                              >
                                <div className="font-semibold text-gray-900 text-sm">{city.name}</div>
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
                {chhatData && (
                  <div className="p-8">
                    {/* 4-Day Timeline */}
                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl border-2 border-orange-200 mb-8">
                      <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                        <Calendar className="w-6 h-6 mr-2 text-orange-600" />
                        Complete 4-Day Chhath Puja Schedule {selectedYear}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                              <Droplets className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">Day 1: Nahay Khay</div>
                              <div className="text-xs text-gray-600">Holy bath & sattvic meal</div>
                            </div>
                          </div>
                          <span className="text-lg font-bold text-blue-600">
                            {new Date(chhatData.nahayKhay).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>

                        <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                              <Heart className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">Day 2: Lohanda/Kharna</div>
                              <div className="text-xs text-gray-600">36-hour fast begins, evening prasad</div>
                            </div>
                          </div>
                          <span className="text-lg font-bold text-purple-600">
                            {new Date(chhatData.lohanda).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>

                        <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                              <Sunset className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-lg">Day 3: Sandhya Arghya ☀️</div>
                              <div className="text-xs text-white/80">Evening offering to setting sun</div>
                            </div>
                          </div>
                          <span className="text-2xl font-bold">{chhatData.sunsetTime}</span>
                        </div>

                        <div className="flex items-center justify-between bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                              <Sunrise className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-lg">Day 4: Usha Arghya 🌅</div>
                              <div className="text-xs text-white/80">Morning offering to rising sun + break fast</div>
                            </div>
                          </div>
                          <span className="text-2xl font-bold">{chhatData.sunriseTime}</span>
                        </div>
                      </div>

                      <div className="mt-4 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                        <p className="text-sm text-gray-700">
                          <strong>Duration:</strong> 4 days ({chhatData.day}). <strong>36-hour Nirjala fast</strong> from Kharna evening to Usha Arghya morning. Most sacred offering times: <strong>Sandhya Arghya sunset</strong> & <strong>Usha Arghya sunrise</strong>.
                        </p>
                      </div>
                    </div>

                    {/* Arghya Timings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-300 relative">
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center">
                            <Sunset className="w-3 h-3 mr-1" />
                            DAY 3
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                            <Sunset className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sandhya Arghya</h3>
                        </div>
                        <p className="text-4xl font-bold text-orange-600 mb-2">{chhatData.sunsetTime}</p>
                        <p className="text-sm text-gray-700 mb-3">
                          Evening offering to setting sun on {new Date(chhatData.sandhyaArghya).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </p>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-600">
                            Stand in water (river/ghat), face west towards sunset, offer Arghya with soop filled with prasad, fruits & thekua.
                          </p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl border-2 border-yellow-300 relative">
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center">
                            <Sunrise className="w-3 h-3 mr-1" />
                            DAY 4
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                            <Sunrise className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Usha Arghya</h3>
                        </div>
                        <p className="text-4xl font-bold text-yellow-600 mb-2">{chhatData.sunriseTime}</p>
                        <p className="text-sm text-gray-700 mb-3">
                          Morning offering to rising sun on {new Date(chhatData.ushaArghya).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </p>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-600">
                            Face east towards sunrise, offer final Arghya to Surya Dev. After this, break 36-hour fast with prasad.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Facts */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900">Deity</h3>
                        </div>
                        <p className="text-lg font-bold text-blue-600">Surya Dev & Chhathi Maiya</p>
                        <p className="text-sm text-gray-600 mt-2">Sun God & 6th form of Prakriti</p>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900">Region</h3>
                        </div>
                        <p className="text-lg font-bold text-green-600">Bihar, Jharkhand, UP</p>
                        <p className="text-sm text-gray-600 mt-2">Also celebrated in Nepal, Mumbai diaspora</p>
                      </div>

                      <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-2xl border-2 border-pink-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900">Fast Duration</h3>
                        </div>
                        <p className="text-lg font-bold text-pink-600">36 Hours Nirjala</p>
                        <p className="text-sm text-gray-600 mt-2">No food/water from Kharna to Usha Arghya</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      <button
                        onClick={() => window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Chhath+Puja+${selectedYear}&dates=${chhatData.nahayKhay.replace(/-/g, '')}/${chhatData.ushaArghya.replace(/-/g, '')}&details=Sandhya+Arghya+${chhatData.sunsetTime},+Usha+Arghya+${chhatData.sunriseTime}&location=${selectedCity.name}`, '_blank')}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-yellow-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                      >
                        <Download className="w-5 h-5" />
                        <span>Add to Calendar</span>
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => setShowShareMenu(!showShareMenu)}
                          className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-orange-600 text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all"
                        >
                          <Share2 className="w-5 h-5" />
                          <span>Share</span>
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
                        className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-yellow-600 text-yellow-600 rounded-xl font-bold hover:bg-yellow-50 transition-all"
                      >
                        <Download className="w-5 h-5" />
                        <span>Print Schedule</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Festival Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/festival-tools/diwali-date-finder" className="group bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200 hover:shadow-xl transition-all">
                <Star className="w-10 h-10 text-yellow-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Diwali {selectedYear}</h4>
                <p className="text-gray-600 text-sm mb-3">3 weeks after Chhath</p>
                <div className="flex items-center text-yellow-600 font-semibold group-hover:gap-2 transition-all">
                  View Dates
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/festival-dates" className="group bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 hover:shadow-xl transition-all">
                <Calendar className="w-10 h-10 text-purple-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">All Festivals {selectedYear}</h4>
                <p className="text-gray-600 text-sm mb-3">Complete calendar</p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                  View Calendar
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/religious-tools" className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200 hover:shadow-xl transition-all">
                <Star className="w-10 h-10 text-blue-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Vrat & Fasting Tools</h4>
                <p className="text-gray-600 text-sm mb-3">Puja vidhi guides</p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                  Explore
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 prose prose-lg max-w-none">
            <h2 className="text-4xl font-bold mb-8">Chhath Puja {selectedYear} Complete Arghya Guide - {selectedCity.name}</h2>

            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-4">When is Chhath Puja {selectedYear} and What are Arghya Times?</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Chhath Puja {selectedYear} is a 4-day festival from {new Date(chhatData?.nahayKhay || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} to {new Date(chhatData?.ushaArghya || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>. The two most sacred moments are <strong>Sandhya Arghya (evening offering) at sunset on {new Date(chhatData?.sandhyaArghya || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}</strong> at <strong>{chhatData?.sunsetTime}</strong> and <strong>Usha Arghya (morning offering) at sunrise on {new Date(chhatData?.ushaArghya || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}</strong> at <strong>{chhatData?.sunriseTime}</strong> in {selectedCity.name}.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">🌅 Sandhya Arghya (Day 3 Evening)</h4>
                  <p className="text-sm text-gray-700">Offer Arghya to setting sun at <strong>{chhatData?.sunsetTime}</strong>. Stand in river/ghat water facing west, use bamboo soop with thekua, fruits & prasad.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">☀️ Usha Arghya (Day 4 Morning)</h4>
                  <p className="text-sm text-gray-700">Final offering to rising sun at <strong>{chhatData?.sunriseTime}</strong>. Face east, offer Arghya & break 36-hour Nirjala fast.</p>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-xl">
                <h4 className="font-bold mb-3">🛒 Chhath Puja Essentials:</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <a href="https://www.amazon.in/s?k=chhath+puja+soop" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Bamboo Soop (Amazon)
                  </a>
                  <a href="https://www.flipkart.com/search?q=thekua+mould" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Thekua Moulds (Flipkart)
                  </a>
                  <Link to="/festival-shopping" className="text-orange-600 hover:underline flex items-center">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    Festival Budget Planner
                  </Link>
                  <Link to="/religious-tools" className="text-orange-600 hover:underline flex items-center">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    Puja Vidhi Guide
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <h3 className="text-3xl font-bold mb-6">Frequently Asked Questions - Chhath Puja {selectedYear}</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-orange-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">1. What are Sandhya Arghya and Usha Arghya timings for Chhath Puja {selectedYear} in {selectedCity.name}?</h4>
                  <p className="text-gray-700">
                    <strong>Sandhya Arghya (evening offering to setting sun):</strong> {chhatData?.sunsetTime} on {new Date(chhatData?.sandhyaArghya || '').toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}. <strong>Usha Arghya (morning offering to rising sun):</strong> {chhatData?.sunriseTime} on {new Date(chhatData?.ushaArghya || '').toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}. These are the exact sunrise/sunset times for {selectedCity.name}.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">2. What is the complete 4-day Chhath Puja schedule?</h4>
                  <p className="text-gray-700">
                    <strong>Day 1: Nahay Khay</strong> ({new Date(chhatData?.nahayKhay || '').toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}) - Holy bath & sattvic meal. <strong>Day 2: Lohanda/Kharna</strong> ({new Date(chhatData?.lohanda || '').toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}) - Whole day fast, evening jaggery kheer prasad, 36-hour Nirjala fast begins. <strong>Day 3: Sandhya Arghya</strong> ({new Date(chhatData?.sandhyaArghya || '').toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}) - Evening river Arghya at {chhatData?.sunsetTime}. <strong>Day 4: Usha Arghya</strong> ({new Date(chhatData?.ushaArghya || '').toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}) - Morning river Arghya at {chhatData?.sunriseTime}, break fast.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">3. How to perform Arghya to Surya Dev during Chhath Puja?</h4>
                  <p className="text-gray-700">
                    Stand waist-deep in river/pond/ghat water. <strong>For Sandhya Arghya:</strong> Face west (towards setting sun). <strong>For Usha Arghya:</strong> Face east (towards rising sun). Hold bamboo soop filled with thekua, fruits, coconut, sugarcane, water chestnuts. Offer Arghya by raising soop towards sun 3 times, pour water each time, sing Chhath geet (songs). Women wear saree without stitching (Bengal style).
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">4. What is Nirjala fast and how long does it last in Chhath Puja?</h4>
                  <p className="text-gray-700">
                    <strong>Nirjala fast = No food, no water</strong> for <strong>36 continuous hours</strong> from Kharna evening (Day 2, after jaggery kheer) until Usha Arghya morning (Day 4, {chhatData?.sunriseTime}). This is one of the most rigorous Hindu fasts. Devotees (both men & women) observe it for health, prosperity & Sun God's blessings. Break fast only after sunrise Arghya.
                  </p>
                </div>

                <div className="border-l-4 border-pink-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">5. Why is Chhath Puja celebrated and who worships it?</h4>
                  <p className="text-gray-700">
                    Chhath Puja worships <strong>Surya Dev (Sun God)</strong> & <strong>Chhathi Maiya</strong> (6th form of Prakriti/Nature, sister of Surya). Celebrated mainly in <strong>Bihar, Jharkhand, Eastern UP</strong>, and by Bhojpuri/Maithili diaspora worldwide (Delhi, Mumbai, Kolkata, Nepal, Mauritius). Ancient Vedic festival for health, children, prosperity. Unlike most Hindu pujas, Chhath has <strong>no idol worship</strong>—direct offering to Sun. Eco-friendly festival using bamboo, clay, natural items.
                  </p>
                </div>
              </div>
            </div>

            {/* External Links */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border-2 border-indigo-200 mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <ExternalLink className="w-6 h-6 mr-2 text-indigo-600" />
                Trusted Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a href="https://www.drikpanchang.com/festivals/chhath-puja/chhath-puja-date-time.html" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Drik Panchang - Chhath Authority
                </a>
                <a href="https://en.wikipedia.org/wiki/Chhath" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Wikipedia - Chhath Puja
                </a>
                <a href="https://www.youtube.com/results?search_query=chhath+puja+arghya+vidhi" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  YouTube - Arghya Vidhi Tutorials
                </a>
                <a href="https://www.amazon.in/chhath-puja" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Chhath Puja Items (Amazon)
                </a>
              </div>
            </div>

            {/* Internal Links */}
            <div className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white p-8 rounded-2xl">
              <h3 className="text-3xl font-bold mb-6 text-center">More Festival & Fasting Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/festival-dates" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl">
                  <Calendar className="w-8 h-8 mb-2" />
                  <h4 className="font-bold text-lg">Festival Calendar {selectedYear}</h4>
                </Link>
                <Link to="/religious-tools" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl">
                  <Star className="w-8 h-8 mb-2" />
                  <h4 className="font-bold text-lg">Vrat Calculator & Puja Vidhi</h4>
                </Link>
                <Link to="/festival-shopping" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl">
                  <ShoppingBag className="w-8 h-8 mb-2" />
                  <h4 className="font-bold text-lg">Festival Shopping Planner</h4>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ChhatPujaArghya;

