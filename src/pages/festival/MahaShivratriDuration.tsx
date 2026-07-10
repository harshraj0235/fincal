import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Moon, Sunrise, Home, ChevronRight, Sunset,
  Share2, Download, Bell, ArrowRight, Info, Heart, Gift, Check, Copy,
  X, Star, Zap, Users, ShoppingBag, ExternalLink, Award, Sparkles
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Maha Shivratri is on Krishna Chaturdashi (14th tithi of Krishna Paksha) of Magha/Phalguna month
// The night is divided into 4 prahars (quarters) for continuous Shiva puja
const MAHA_SHIVRATRI_DATA = {
  2020: { date: '2020-02-21', day: 'Friday', sunset: '18:21', sunrise: '06:52', nightDuration: '12h 31m', prahar1: '18:21 - 21:29', prahar2: '21:29 - 00:37', prahar3: '00:37 - 03:45', prahar4: '03:45 - 06:52' },
  2021: { date: '2021-03-11', day: 'Thursday', sunset: '18:35', sunrise: '06:38', nightDuration: '12h 03m', prahar1: '18:35 - 21:35', prahar2: '21:35 - 00:36', prahar3: '00:36 - 03:37', prahar4: '03:37 - 06:38' },
  2022: { date: '2022-03-01', day: 'Tuesday', sunset: '18:30', sunrise: '06:45', nightDuration: '12h 15m', prahar1: '18:30 - 21:34', prahar2: '21:34 - 00:38', prahar3: '00:38 - 03:41', prahar4: '03:41 - 06:45' },
  2023: { date: '2023-02-18', day: 'Saturday', sunset: '18:19', sunrise: '06:54', nightDuration: '12h 35m', prahar1: '18:19 - 21:28', prahar2: '21:28 - 00:36', prahar3: '00:36 - 03:45', prahar4: '03:45 - 06:54' },
  2024: { date: '2024-03-08', day: 'Friday', sunset: '18:33', sunrise: '06:40', nightDuration: '12h 07m', prahar1: '18:33 - 21:35', prahar2: '21:35 - 00:37', prahar3: '00:37 - 03:38', prahar4: '03:38 - 06:40' },
  2025: { date: '2025-02-26', day: 'Wednesday', sunset: '18:26', sunrise: '06:48', nightDuration: '12h 22m', prahar1: '18:26 - 21:32', prahar2: '21:32 - 00:37', prahar3: '00:37 - 03:43', prahar4: '03:43 - 06:48' },
  2026: { date: '2026-02-15', day: 'Sunday', sunset: '18:17', sunrise: '06:56', nightDuration: '12h 39m', prahar1: '18:17 - 21:27', prahar2: '21:27 - 00:36', prahar3: '00:36 - 03:46', prahar4: '03:46 - 06:56' },
  2027: { date: '2027-03-07', day: 'Sunday', sunset: '18:32', sunrise: '06:42', nightDuration: '12h 10m', prahar1: '18:32 - 21:34', prahar2: '21:34 - 00:36', prahar3: '00:36 - 03:39', prahar4: '03:39 - 06:42' },
  2028: { date: '2028-02-23', day: 'Wednesday', sunset: '18:24', sunrise: '06:50', nightDuration: '12h 26m', prahar1: '18:24 - 21:31', prahar2: '21:31 - 00:37', prahar3: '00:37 - 03:43', prahar4: '03:43 - 06:50' },
  2029: { date: '2029-02-13', day: 'Tuesday', sunset: '18:15', sunrise: '06:58', nightDuration: '12h 43m', prahar1: '18:15 - 21:26', prahar2: '21:26 - 00:36', prahar3: '00:36 - 03:47', prahar4: '03:47 - 06:58' },
  2030: { date: '2030-03-04', day: 'Monday', sunset: '18:29', sunrise: '06:44', nightDuration: '12h 15m', prahar1: '18:29 - 21:33', prahar2: '21:33 - 00:37', prahar3: '00:37 - 03:40', prahar4: '03:40 - 06:44' }
};

// Prahar ritual activities
const PRAHAR_ACTIVITIES = {
  1: {
    name: 'First Prahar (Pratham Prahar)',
    deity: 'Lord Shiva in Rudra Form',
    activities: ['Abhishek with milk', 'Om Namah Shivaya chanting', 'Offer Bel Patra (Bilva leaves)', 'Light dhoop & deep'],
    color: 'from-purple-500 to-indigo-500'
  },
  2: {
    name: 'Second Prahar (Dwitiya Prahar)',
    deity: 'Lord Shiva in Tatpurusha Form',
    activities: ['Abhishek with curd/yogurt', 'Rudra Sukta recitation', 'Offer white flowers', 'Fruits & sweets offering'],
    color: 'from-blue-500 to-cyan-500'
  },
  3: {
    name: 'Third Prahar (Tritiya Prahar)',
    deity: 'Lord Shiva in Aghora Form',
    activities: ['Abhishek with honey', 'Shiva Chalisa reading', 'Offer Datura & Dhatura', 'Dhuni (sacred fire)'],
    color: 'from-indigo-500 to-purple-500'
  },
  4: {
    name: 'Fourth Prahar (Chaturth Prahar)',
    deity: 'Lord Shiva in Vamadeva Form',
    activities: ['Abhishek with ghee', 'Maha Mrityunjaya Mantra', 'Offer fruits & panchamrit', 'Aarti at dawn'],
    color: 'from-orange-500 to-pink-500'
  }
};

// Major Indian Cities
const INDIAN_CITIES = [
  { name: 'Delhi', state: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lon: 72.8777 },
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lon: 77.5946 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lon: 88.3639 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lon: 78.4867 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lon: 73.8567 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lon: 72.5714 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lon: 75.7873 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462 },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lon: 82.9739 },
  { name: 'Haridwar', state: 'Uttarakhand', lat: 29.9457, lon: 78.1642 },
  { name: 'Ujjain', state: 'Madhya Pradesh', lat: 23.1765, lon: 75.7885 },
  { name: 'Somnath', state: 'Gujarat', lat: 20.8880, lon: 70.4013 },
  { name: 'Kedarnath', state: 'Uttarakhand', lat: 30.7346, lon: 79.0669 }
];

const MahaShivratriDuration: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCity, setSelectedCity] = useState(INDIAN_CITIES[0]);
  const [searchCity, setSearchCity] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdownTime, setCountdownTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
  const shivratriData = MAHA_SHIVRATRI_DATA[selectedYear as keyof typeof MAHA_SHIVRATRI_DATA];

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
    if (!shivratriData) return;

    const updateCountdown = () => {
      const shivratriDate = new Date(shivratriData.date);
      const now = new Date();
      const diff = shivratriDate.getTime() - now.getTime();
      
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
  }, [shivratriData]);

  const shareUrl = `/festival-tools/maha-shivratri-duration?year=${selectedYear}&city=${selectedCity.name}`;
  const shareText = `Maha Shivratri ${selectedYear} on ${shivratriData?.day}, ${new Date(shivratriData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}! Night duration: ${shivratriData?.nightDuration} with 4 prahars for continuous Shiva puja in ${selectedCity.name}`;

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
        title={`Maha Shivratri ${selectedYear} Night Duration ${selectedCity.name} - 4 Prahar Timings, Sunset to Sunrise Puja Guide | Om Namah Shivaya`}
        description={`Maha Shivratri ${selectedYear} on ${shivratriData?.day}, ${new Date(shivratriData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} in ${selectedCity.name}. Night duration: ${shivratriData?.nightDuration} (${shivratriData?.sunset} to ${shivratriData?.sunrise}). Complete 4 prahar breakdown with ritual activities for each quarter!`}
        keywords={`maha shivratri ${selectedYear} night duration, maha shivratri ${selectedYear} ${selectedCity.name.toLowerCase()}, shivratri prahar timings ${selectedYear}, maha shivratri puja time ${selectedYear}, shivratri night ${selectedYear}, 4 prahar shivratri, shiva puja timing ${selectedYear}, chaturdashi ${selectedYear}, mahashivratri ${selectedYear} india`}
        url={`/festival-tools/maha-shivratri-duration?year=${selectedYear}&city=${selectedCity.name}`}
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-purple-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-purple-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-dates" className="hover:text-purple-600 transition-colors">
                Festival Dates
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-purple-600 font-medium">Maha Shivratri</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full mb-6">
                <Moon className="w-5 h-5" />
                <span className="font-semibold">Om Namah Shivaya | Night of Lord Shiva</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Maha Shivratri {selectedYear} Night Duration
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Find exact night duration & 4 prahar timings for Maha Shivratri {selectedYear} in {selectedCity.name}! Complete sunset-to-sunrise puja guide for all-night Shiva worship.
              </p>

              {/* Live Countdown */}
              {shivratriData && countdownTime.days > 0 && countdownTime.days < 365 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="max-w-4xl mx-auto mb-8"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-3xl shadow-2xl">
                    <h2 className="text-white text-2xl font-bold mb-6">
                      ⏰ Countdown to Maha Shivratri {selectedYear}
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
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-200">
                {/* Controls */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8">
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
                            Maha Shivratri {year}
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
                                className="w-full px-4 py-2 text-left hover:bg-purple-50 transition-colors border-b border-gray-100 last:border-b-0"
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
                {shivratriData && (
                  <div className="p-8">
                    {/* Main Info */}
                    <div className="text-center mb-8 pb-8 border-b-2 border-purple-100">
                      <div className="inline-flex items-center justify-center mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                          <Moon className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Maha Shivratri {selectedYear}</h2>
                      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        {new Date(shivratriData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                      </div>
                      <div className="text-2xl text-gray-600 font-semibold mb-4">{shivratriData.day}</div>
                      <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">Night Duration: {shivratriData.nightDuration}</span>
                      </div>
                    </div>

                    {/* Night Timeline */}
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border-2 border-purple-200 mb-8">
                      <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                        <Moon className="w-6 h-6 mr-2 text-purple-600" />
                        Complete Night Timeline (Sunset to Sunrise)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                              <Sunset className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">Night Begins (Sunset)</div>
                              <div className="text-xs text-gray-600">Krishna Chaturdashi</div>
                            </div>
                          </div>
                          <span className="text-2xl font-bold text-orange-600">{shivratriData.sunset}</span>
                        </div>

                        <div className="bg-white p-4 rounded-lg flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                              <Sunrise className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">Night Ends (Sunrise)</div>
                              <div className="text-xs text-gray-600">Shukla Pratipada</div>
                            </div>
                          </div>
                          <span className="text-2xl font-bold text-yellow-600">{shivratriData.sunrise}</span>
                        </div>
                      </div>
                    </div>

                    {/* 4 Prahars */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        🔱 Four Prahars (Night Quarters) for Continuous Shiva Puja
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((praharNo) => {
                          const prahar = PRAHAR_ACTIVITIES[praharNo as keyof typeof PRAHAR_ACTIVITIES];
                          const timing = shivratriData[`prahar${praharNo}` as keyof typeof shivratriData] as string;
                          
                          return (
                            <div key={praharNo} className={`bg-gradient-to-br ${prahar.color} p-6 rounded-2xl shadow-lg text-white`}>
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold">{praharNo}</span>
                                  </div>
                                  <h4 className="font-bold text-lg">{prahar.name}</h4>
                                </div>
                              </div>
                              <p className="text-2xl font-bold mb-2">{timing}</p>
                              <p className="text-sm mb-3 opacity-90">🕉️ {prahar.deity}</p>
                              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                <p className="text-xs font-semibold mb-2">Ritual Activities:</p>
                                <ul className="text-xs space-y-1">
                                  {prahar.activities.map((activity, idx) => (
                                    <li key={idx}>• {activity}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      <button
                        onClick={() => window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Maha+Shivratri+${selectedYear}&dates=${shivratriData.date.replace(/-/g, '')}/${shivratriData.date.replace(/-/g, '')}&details=Night+${shivratriData.nightDuration}&location=${selectedCity.name}`, '_blank')}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                      >
                        <Download className="w-5 h-5" />
                        <span>Add to Calendar</span>
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => setShowShareMenu(!showShareMenu)}
                          className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition-all"
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
                        className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all"
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
              <Link to="/festival-tools/janmashtami-fasting" className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200 hover:shadow-xl transition-all">
                <Star className="w-10 h-10 text-blue-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Janmashtami {selectedYear}</h4>
                <p className="text-gray-600 text-sm mb-3">Krishna midnight birth</p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
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

              <Link to="/religious-tools" className="group bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border-2 border-indigo-200 hover:shadow-xl transition-all">
                <Star className="w-10 h-10 text-indigo-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Vrat & Fasting Tools</h4>
                <p className="text-gray-600 text-sm mb-3">Puja vidhi guides</p>
                <div className="flex items-center text-indigo-600 font-semibold group-hover:gap-2 transition-all">
                  Explore
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 prose prose-lg max-w-none">
            <h2 className="text-4xl font-bold mb-8">Maha Shivratri {selectedYear} Complete Night Duration Guide - {selectedCity.name}</h2>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl mb-8">
              <h3 className="text-2xl font-bold mb-4">When is Maha Shivratri {selectedYear} and What is the Night Duration?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>Maha Shivratri {selectedYear} is on {shivratriData?.day}, {new Date(shivratriData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>. The sacred night begins at <strong>sunset ({shivratriData?.sunset})</strong> and ends at <strong>sunrise ({shivratriData?.sunrise})</strong> in {selectedCity.name}, with a total duration of <strong>{shivratriData?.nightDuration}</strong>. This night is divided into <strong>4 equal prahars (quarters)</strong> for continuous worship of Lord Shiva.
              </p>

              <div className="mt-6 bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-xl">
                <h4 className="font-bold mb-3">🔱 Maha Shivratri Essentials:</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <a href="https://www.amazon.in/s?k=rudraksha+mala" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Rudraksha Mala (Amazon)
                  </a>
                  <a href="https://www.flipkart.com/search?q=shiva+idol" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Shiva Idols (Flipkart)
                  </a>
                  <Link to="/festival-shopping" className="text-purple-600 hover:underline flex items-center">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    Festival Budget Planner
                  </Link>
                  <Link to="/religious-tools" className="text-purple-600 hover:underline flex items-center">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    Puja Vidhi Guide
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <h3 className="text-3xl font-bold mb-6">Frequently Asked Questions - Maha Shivratri {selectedYear}</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">1. What is the night duration for Maha Shivratri {selectedYear} in {selectedCity.name}?</h4>
                  <p className="text-gray-700">
                    The night duration for Maha Shivratri {selectedYear} in {selectedCity.name} is <strong>{shivratriData?.nightDuration}</strong>, from <strong>sunset at {shivratriData?.sunset}</strong> to <strong>sunrise at {shivratriData?.sunrise}</strong> next morning. During this sacred night, devotees observe fast and perform continuous Shiva puja through all 4 prahars.
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">2. What are the 4 prahars of Maha Shivratri night and their significance?</h4>
                  <p className="text-gray-700">
                    The Maha Shivratri night is divided into <strong>4 equal prahars (quarters)</strong>: <strong>Prahar 1</strong> ({shivratriData?.prahar1}) - Abhishek with milk, <strong>Prahar 2</strong> ({shivratriData?.prahar2}) - Abhishek with curd, <strong>Prahar 3</strong> ({shivratriData?.prahar3}) - Abhishek with honey, <strong>Prahar 4</strong> ({shivratriData?.prahar4}) - Abhishek with ghee. Each prahar represents one form of Lord Shiva and has specific rituals.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">3. Why is Maha Shivratri celebrated and why is the night important?</h4>
                  <p className="text-gray-700">
                    <strong>Maha Shivratri</strong> celebrates the night when Lord Shiva performed the cosmic Tandava dance and when Shiva-Parvati got married. It's also the night when Shiva saved the world by drinking poison (Halahala) during Samudra Manthan. The <strong>night</strong> is most sacred because Shiva is believed to be most receptive to devotees' prayers during the 4 prahars. All-night vigil (jagaran) with continuous puja brings spiritual merit.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">4. What rituals should be performed during each prahar of Maha Shivratri?</h4>
                  <p className="text-gray-700">
                    <strong>Prahar 1:</strong> Abhishek with milk + Bilva/Bel patra offering + Om Namah Shivaya chanting. <strong>Prahar 2:</strong> Abhishek with curd/yogurt + white flowers + Rudra Sukta. <strong>Prahar 3:</strong> Abhishek with honey + Datura offering + Shiva Chalisa. <strong>Prahar 4:</strong> Abhishek with ghee + Maha Mrityunjaya Mantra + Aarti at dawn. Continuous chanting of "Om Namah Shivaya" throughout the night is highly auspicious.
                  </p>
                </div>

                <div className="border-l-4 border-pink-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">5. Can Maha Shivratri puja be done at home or is temple necessary?</h4>
                  <p className="text-gray-700">
                    <strong>Yes, Maha Shivratri puja can be performed at home</strong> with same devotion. Key requirements: Install Shiva Lingam or photo, maintain cleanliness, observe fast (complete or with fruits/milk), perform Abhishek in each prahar, offer Bilva leaves, chant mantras, and stay awake all night. <strong>Temple visit</strong> is recommended if possible for darshan, but home worship is equally sacred. Many devotees do both—temple darshan + home jagaran with family.
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
                <a href="https://www.drikpanchang.com/festivals/mahashivratri/mahashivratri-date-time.html" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Drik Panchang - Shivratri Authority
                </a>
                <a href="https://en.wikipedia.org/wiki/Maha_Shivaratri" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Wikipedia - Maha Shivratri
                </a>
                <a href="https://www.youtube.com/results?search_query=maha+shivratri+puja+vidhi" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  YouTube - Puja Vidhi Tutorials
                </a>
                <a href="https://www.amazon.in/shivratri" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Shivratri Puja Items (Amazon)
                </a>
              </div>
            </div>

            {/* Internal Links */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-2xl">
              <h3 className="text-3xl font-bold mb-6 text-center">More Festival & Fasting Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/festival-dates" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl">
                  <Calendar className="w-8 h-8 mb-2" />
                  <h4 className="font-bold text-lg">Festival Calendar {selectedYear}</h4>
                </Link>
                <Link to="/religious-tools" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl">
                  <Star className="w-8 h-8 mb-2" />
                  <h4 className="font-bold text-lg">Vrat Calculator & Mantras</h4>
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

export default MahaShivratriDuration;

