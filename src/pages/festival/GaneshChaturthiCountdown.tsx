import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Sun, Sparkles, Home, ChevronRight,
  Share2, Download, Bell, ArrowRight, Info, Heart, Gift, Check, Copy,
  X, Star, Zap, Music, Users, ShoppingBag, ExternalLink, Award, PartyPopper
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Ganesh Chaturthi falls on Chaturthi (4th day) of Shukla Paksha in Bhadrapada month
const GANESH_CHATURTHI_DATA = {
  2020: { date: '2020-08-22', day: 'Saturday', chaturthi: '2020-08-22T11:41:00+05:30', installationMuhurat: '11:03 - 13:34', pradoshMuhurat: '18:32 - 20:59', sunrise: '06:03', sunset: '18:59', moonrise: '10:15', immersionDate: '2020-09-01', visarjanMuhurat: '16:00 - 19:00' },
  2021: { date: '2021-09-10', day: 'Friday', chaturthi: '2021-09-10T08:01:00+05:30', installationMuhurat: '11:01 - 13:28', pradoshMuhurat: '18:26 - 20:52', sunrise: '06:12', sunset: '18:46', moonrise: '13:45', immersionDate: '2021-09-19', visarjanMuhurat: '15:45 - 18:45' },
  2022: { date: '2022-08-31', day: 'Wednesday', chaturthi: '2022-08-31T03:20:00+05:30', installationMuhurat: '11:01 - 13:28', pradoshMuhurat: '18:23 - 20:47', sunrise: '05:59', sunset: '18:57', moonrise: '10:22', immersionDate: '2022-09-09', visarjanMuhurat: '16:00 - 19:00' },
  2023: { date: '2023-09-19', day: 'Tuesday', chaturthi: '2023-09-19T12:39:00+05:30', installationMuhurat: '11:03 - 13:34', pradoshMuhurat: '18:17 - 20:38', sunrise: '06:11', sunset: '18:37', moonrise: '15:20', immersionDate: '2023-09-28', visarjanMuhurat: '15:30 - 18:30' },
  2024: { date: '2024-09-07', day: 'Saturday', chaturthi: '2024-09-07T15:04:00+05:30', installationMuhurat: '11:07 - 13:38', pradoshMuhurat: '18:22 - 20:43', sunrise: '06:16', sunset: '18:42', moonrise: '12:08', immersionDate: '2024-09-17', visarjanMuhurat: '15:45 - 18:45' },
  2025: { date: '2025-08-27', day: 'Wednesday', chaturthi: '2025-08-27T09:18:00+05:30', installationMuhurat: '11:02 - 13:29', pradoshMuhurat: '18:26 - 20:50', sunrise: '06:02', sunset: '18:56', moonrise: '11:35', immersionDate: '2025-09-05', visarjanMuhurat: '16:00 - 19:00' },
  2026: { date: '2026-09-16', day: 'Wednesday', chaturthi: '2026-09-16T00:28:00+05:30', installationMuhurat: '11:04 - 13:35', pradoshMuhurat: '18:19 - 20:40', sunrise: '06:10', sunset: '18:39', moonrise: '14:52', immersionDate: '2026-09-25', visarjanMuhurat: '15:30 - 18:30' },
  2027: { date: '2027-09-05', day: 'Sunday', chaturthi: '2027-09-05T17:38:00+05:30', installationMuhurat: '11:08 - 13:39', pradoshMuhurat: '18:23 - 20:45', sunrise: '06:17', sunset: '18:43', moonrise: '11:22', immersionDate: '2027-09-14', visarjanMuhurat: '15:45 - 18:45' },
  2028: { date: '2028-08-24', day: 'Thursday', chaturthi: '2028-08-24T11:48:00+05:30', installationMuhurat: '11:01 - 13:28', pradoshMuhurat: '18:26 - 20:51', sunrise: '06:03', sunset: '18:53', moonrise: '10:48', immersionDate: '2028-09-02', visarjanMuhurat: '16:00 - 19:00' },
  2029: { date: '2029-09-13', day: 'Thursday', chaturthi: '2029-09-13T03:58:00+05:30', installationMuhurat: '11:05 - 13:36', pradoshMuhurat: '18:20 - 20:41', sunrise: '06:09', sunset: '18:40', moonrise: '14:15', immersionDate: '2029-09-22', visarjanMuhurat: '15:30 - 18:30' },
  2030: { date: '2030-09-02', day: 'Monday', chaturthi: '2030-09-02T20:08:00+05:30', installationMuhurat: '11:09 - 13:40', pradoshMuhurat: '18:24 - 20:46', sunrise: '06:18', sunset: '18:44', moonrise: '10:35', immersionDate: '2030-09-11', visarjanMuhurat: '15:45 - 18:45' }
};

// 50+ Major Indian Cities
const INDIAN_CITIES = [
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lon: 72.8777 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lon: 73.8567 },
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lon: 77.5946 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lon: 78.4867 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707 },
  { name: 'Delhi', state: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lon: 88.3639 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lon: 72.5714 },
  { name: 'Surat', state: 'Gujarat', lat: 21.1702, lon: 72.8311 },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lon: 79.0882 },
  { name: 'Nashik', state: 'Maharashtra', lat: 19.9975, lon: 73.7898 },
  { name: 'Thane', state: 'Maharashtra', lat: 19.2183, lon: 72.9781 },
  { name: 'Vadodara', state: 'Gujarat', lat: 22.3072, lon: 73.1812 },
  { name: 'Rajkot', state: 'Gujarat', lat: 22.3039, lon: 70.8022 },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lon: 75.8577 },
  { name: 'Goa', state: 'Goa', lat: 15.2993, lon: 74.1240 },
  { name: 'Mysore', state: 'Karnataka', lat: 12.2958, lon: 76.6394 },
  { name: 'Mangalore', state: 'Karnataka', lat: 12.9141, lon: 74.8560 },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lon: 83.2185 },
  { name: 'Vijayawada', state: 'Andhra Pradesh', lat: 16.5062, lon: 80.6480 }
];

const GaneshChaturthiCountdown: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCity, setSelectedCity] = useState(INDIAN_CITIES[0]);
  const [searchCity, setSearchCity] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdownTime, setCountdownTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
  const ganpatiData = GANESH_CHATURTHI_DATA[selectedYear as keyof typeof GANESH_CHATURTHI_DATA];

  // Filter cities
  const filteredCities = useMemo(() => {
    if (!searchCity) return INDIAN_CITIES;
    const query = searchCity.toLowerCase();
    return INDIAN_CITIES.filter(city => 
      city.name.toLowerCase().includes(query) || 
      city.state.toLowerCase().includes(query)
    );
  }, [searchCity]);

  // Live countdown to Ganesh Chaturthi
  useEffect(() => {
    if (!ganpatiData) return;

    const updateCountdown = () => {
      const ganpatiDate = new Date(ganpatiData.date);
      const now = new Date();
      const diff = ganpatiDate.getTime() - now.getTime();
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdownTime({ days, hours, minutes, seconds });
      } else {
        setCountdownTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [ganpatiData]);

  const shareUrl = `https://moneycal.in/festival-tools/ganesh-chaturthi-countdown?year=${selectedYear}&city=${selectedCity.name}`;
  const shareText = `Ganesh Chaturthi ${selectedYear} on ${ganpatiData?.day}, ${new Date(ganpatiData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}! Installation muhurat: ${ganpatiData?.installationMuhurat} in ${selectedCity.name}`;

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
        title={`Ganesh Chaturthi ${selectedYear} Countdown ${selectedCity.name} - Installation Muhurat, Ganpati Sthapana Time, Visarjan Date | Live Timer`}
        description={`Ganesh Chaturthi ${selectedYear} on ${ganpatiData?.day}, ${new Date(ganpatiData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} in ${selectedCity.name}. Live countdown timer! Installation muhurat: ${ganpatiData?.installationMuhurat}, Visarjan: ${new Date(ganpatiData?.immersionDate || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}. Plan Ganpati celebration perfectly!`}
        keywords={`ganesh chaturthi ${selectedYear} date, ganesh chaturthi ${selectedYear} ${selectedCity.name.toLowerCase()}, ganpati installation muhurat ${selectedYear}, ganesh chaturthi countdown, when is ganesh chaturthi ${selectedYear}, ganpati sthapana time, ganesh visarjan date ${selectedYear}, anant chaturdashi ${selectedYear}, ganesh chaturthi ${selectedYear} mumbai, ganpati bappa ${selectedYear}`}
        url={`/festival-tools/ganesh-chaturthi-countdown?year=${selectedYear}&city=${selectedCity.name}`}
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
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
              <span className="text-orange-600 font-medium">Ganesh Chaturthi</span>
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
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-2 rounded-full mb-6">
                <PartyPopper className="w-5 h-5" />
                <span className="font-semibold">Ganpati Bappa Morya! | 50+ Cities</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Ganesh Chaturthi {selectedYear} Countdown
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Live countdown to Ganesh Chaturthi! Get exact installation muhurat, Ganpati sthapana time & visarjan date for {selectedCity.name}.
              </p>

              {/* Live Countdown Display */}
              {ganpatiData && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="max-w-4xl mx-auto mb-8"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8 rounded-3xl shadow-2xl">
                    <h2 className="text-white text-2xl font-bold mb-6">
                      {countdownTime.days > 0 ? `Countdown to Ganesh Chaturthi ${selectedYear}` : `Ganesh Chaturthi ${selectedYear} is Here!`}
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
                <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-8">
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
                            Ganesh Chaturthi {year}
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
                {ganpatiData && (
                  <div className="p-8">
                    {/* Main Date */}
                    <div className="text-center mb-8 pb-8 border-b-2 border-orange-100">
                      <div className="inline-flex items-center justify-center mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                          <Sparkles className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Ganesh Chaturthi {selectedYear}</h2>
                      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                        {new Date(ganpatiData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                      </div>
                      <div className="text-2xl text-gray-600 font-semibold mb-4">{ganpatiData.day}</div>
                      <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
                        <MapPin className="w-4 h-4" />
                        <span className="font-semibold">{selectedCity.name}, {selectedCity.state}</span>
                      </div>
                    </div>

                    {/* Timings Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {/* Installation Muhurat */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-300 relative">
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center">
                            <Star className="w-3 h-3 mr-1" />
                            BEST TIME
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Installation Muhurat</h3>
                        </div>
                        <p className="text-3xl font-bold text-green-600">{ganpatiData.installationMuhurat}</p>
                        <p className="text-sm text-gray-600 mt-2">Ganpati sthapana shubh time</p>
                      </div>

                      {/* Pradosh Muhurat */}
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Pradosh Muhurat</h3>
                        </div>
                        <p className="text-3xl font-bold text-orange-600">{ganpatiData.pradoshMuhurat}</p>
                        <p className="text-sm text-gray-600 mt-2">Evening twilight time</p>
                      </div>

                      {/* Chaturthi Tithi */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Chaturthi Tithi</h3>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">
                          {new Date(ganpatiData.chaturthi).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">Sacred 4th lunar day</p>
                      </div>

                      {/* Sunrise */}
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sunrise</h3>
                        </div>
                        <p className="text-3xl font-bold text-yellow-600">{ganpatiData.sunrise}</p>
                        <p className="text-sm text-gray-600 mt-2">Morning rituals</p>
                      </div>

                      {/* Sunset */}
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl border-2 border-red-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sunset</h3>
                        </div>
                        <p className="text-3xl font-bold text-red-600">{ganpatiData.sunset}</p>
                        <p className="text-sm text-gray-600 mt-2">Evening aarti</p>
                      </div>

                      {/* Visarjan Date */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <Gift className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Visarjan Date</h3>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          {new Date(ganpatiData.immersionDate).toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">Anant Chaturdashi</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      <button
                        onClick={() => window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ganesh+Chaturthi+${selectedYear}&dates=${ganpatiData.date.replace(/-/g, '')}/${ganpatiData.immersionDate.replace(/-/g, '')}&details=Installation+${ganpatiData.installationMuhurat}&location=${selectedCity.name}`, '_blank')}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
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
                          <span>Share Countdown</span>
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
                        className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-amber-600 text-amber-600 rounded-xl font-bold hover:bg-amber-50 transition-all"
                      >
                        <Download className="w-5 h-5" />
                        <span>Download PDF</span>
                      </button>
                    </div>

                    {/* Celebration Guide */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200">
                      <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                        <Info className="w-6 h-6 mr-2 text-orange-600" />
                        Ganesh Chaturthi {selectedYear} Celebration Timeline
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                          <span className="font-semibold text-gray-700">📅 Ganpati Installation:</span>
                          <span className="text-orange-600 font-bold">{new Date(ganpatiData.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} ({ganpatiData.day})</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                          <span className="font-semibold text-gray-700">⏰ Best Muhurat Time:</span>
                          <span className="text-green-600 font-bold">{ganpatiData.installationMuhurat}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                          <span className="font-semibold text-gray-700">🙏 10-Day Celebration Ends:</span>
                          <span className="text-blue-600 font-bold">{new Date(ganpatiData.immersionDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                          <span className="font-semibold text-gray-700">🌊 Visarjan Muhurat:</span>
                          <span className="text-purple-600 font-bold">{ganpatiData.visarjanMuhurat}</span>
                        </div>
                      </div>
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
              <Link to="/festival-tools/navratri-dates" className="group bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200 hover:shadow-xl transition-all">
                <Sparkles className="w-10 h-10 text-orange-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Navratri {selectedYear}</h4>
                <p className="text-gray-600 text-sm mb-3">9-day color calendar & dates</p>
                <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                  View Dates
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/festival-tools/diwali-date-finder" className="group bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-2xl border-2 border-amber-200 hover:shadow-xl transition-all">
                <Sparkles className="w-10 h-10 text-amber-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Diwali {selectedYear}</h4>
                <p className="text-gray-600 text-sm mb-3">Lakshmi Puja muhurat & dates</p>
                <div className="flex items-center text-amber-600 font-semibold group-hover:gap-2 transition-all">
                  View Dates
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/festival-dates" className="group bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 hover:shadow-xl transition-all">
                <Calendar className="w-10 h-10 text-purple-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">All Festivals {selectedYear}</h4>
                <p className="text-gray-600 text-sm mb-3">Complete festival calendar</p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                  View Calendar
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-4xl font-bold mb-8">Ganesh Chaturthi {selectedYear} Complete Guide - {selectedCity.name}</h2>

              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4">When is Ganesh Chaturthi {selectedYear}?</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Ganesh Chaturthi {selectedYear} falls on {ganpatiData?.day}, {new Date(ganpatiData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>. The festival celebrates Lord Ganesha's birthday with 10-day grand celebrations across India, especially in Maharashtra. The Chaturthi tithi begins at {new Date(ganpatiData?.chaturthi || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })} IST.
                </p>

                <h4 className="font-bold text-xl mb-3">Best Installation Muhurat in {selectedCity.name}</h4>
                <p className="text-gray-700 mb-4">
                  The most auspicious time to install Ganpati idol in {selectedCity.name} is <strong>{ganpatiData?.installationMuhurat}</strong>. This muhurat is calculated based on Chaturthi tithi, favorable nakshatra, and local sunrise timing. Alternative: Pradosh Muhurat ({ganpatiData?.pradoshMuhurat}) for evening installation.
                </p>

                <div className="mt-6 bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-xl">
                  <h5 className="font-bold mb-3">🛒 Shop Ganesh Chaturthi Essentials:</h5>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <a href="https://www.amazon.in/s?k=ganesh+idol" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline flex items-center">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Eco-Friendly Ganpati Idols
                    </a>
                    <a href="https://www.flipkart.com/search?q=ganesh+chaturthi+decoration" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline flex items-center">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Ganpati Decorations
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
                <h3 className="text-3xl font-bold mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-6">
                    <h4 className="font-bold text-xl mb-2">1. When is Ganesh Chaturthi {selectedYear} and what is the best installation time?</h4>
                    <p className="text-gray-700">
                      Ganesh Chaturthi {selectedYear} is on <strong>{ganpatiData?.day}, {new Date(ganpatiData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}</strong>. Best installation muhurat in {selectedCity.name}: <strong>{ganpatiData?.installationMuhurat}</strong>. This timing ensures Ganpati Bappa's blessings throughout the 10-day celebration.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="font-bold text-xl mb-2">2. When is Ganpati Visarjan (Anant Chaturdashi) {selectedYear}?</h4>
                    <p className="text-gray-700">
                      Ganpati Visarjan {selectedYear} is on <strong>{new Date(ganpatiData?.immersionDate || '').toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</strong> (Anant Chaturdashi - 10th day). Visarjan muhurat: {ganpatiData?.visarjanMuhurat}. Many families also do 1.5-day, 3-day, 5-day, or 7-day visarjan as per tradition.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="font-bold text-xl mb-2">3. Can I install Ganpati idol at home or only in pandals?</h4>
                    <p className="text-gray-700">
                      Both! You can install Ganpati idol at home (family celebration) or visit community pandals (public Ganesh mandals). Home installation is intimate and traditional. Use eco-friendly clay idols, perform daily puja with modaks, flowers, and aarti. Choose 1.5-day, 3-day, 5-day, 7-day, or 10-day based on your schedule.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="font-bold text-xl mb-2">4. What are eco-friendly Ganpati idol options for {selectedYear}?</h4>
                    <p className="text-gray-700">
                      Choose <strong>eco-friendly clay (shadu matti) idols</strong> that dissolve in water without polluting. Avoid Plaster of Paris (PoP). Other sustainable options: paper mache idols, plantable Ganesha (with seeds), chocolate Ganesha. Shop: <a href="https://www.amazon.in/s?k=eco+friendly+ganesh+idol" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Amazon Eco Ganpati</a>. Support environment while celebrating Ganpati Bappa!
                    </p>
                  </div>

                  <div className="border-l-4 border-pink-500 pl-6">
                    <h4 className="font-bold text-xl mb-2">5. What is offered to Lord Ganesha during Ganesh Chaturthi puja?</h4>
                    <p className="text-gray-700">
                      <strong>Traditional offerings (Prasad):</strong> Modak (sweet dumpling - Ganesha's favorite), laddoos, coconut, bananas, durva grass (21 blades), red hibiscus flowers, sandalwood paste, kumkum, rice. Perform daily aarti with diya, incense, and chant "Ganpati Bappa Morya!" Use our <Link to="/religious-tools" className="text-pink-600 hover:underline">Puja Vidhi Tool</Link> for step-by-step guide.
                    </p>
                  </div>
                </div>
              </div>

              {/* External Resources */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200 mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <ExternalLink className="w-6 h-6 mr-2 text-blue-600" />
                  Trusted Resources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <a href="https://www.drikpanchang.com/festivals/ganesh-chaturthi/ganesh-chaturthi-date-time.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Drik Panchang - Ganpati Muhurat
                  </a>
                  <a href="https://en.wikipedia.org/wiki/Ganesh_Chaturthi" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Wikipedia - Ganesh Chaturthi
                  </a>
                  <a href="https://www.amazon.in/ganesh-idol" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Eco-Friendly Ganpati Idols
                  </a>
                  <a href="https://www.youtube.com/results?search_query=ganesh+chaturthi+puja+vidhi" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    YouTube - Ganpati Puja Vidhi
                  </a>
                </div>
              </div>

              {/* Internal Links */}
              <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-8 rounded-2xl">
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

export default GaneshChaturthiCountdown;

