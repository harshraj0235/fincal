import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Sun, Sparkles, Home, ChevronRight,
  Share2, Download, Bell, ArrowRight, Info, Heart, Gift, Check, Copy,
  X, Star, Zap, Users, ShoppingBag, ExternalLink, Award, Flame
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Dussehra/Vijayadashami is 10th day (Dashami) after Navratri, celebrating victory of good over evil
// Falls on Dashami tithi of Ashwin/Ashvin Shukla Paksha
const DUSSEHRA_DATA = {
  2020: { date: '2020-10-25', day: 'Sunday', dashamiStart: '2020-10-25T08:02:00+05:30', ravanDahan: '17:48 - 19:15', vijayMuhurat: '14:06 - 14:52', sunrise: '06:28', sunset: '17:48', aparahna: '13:34 - 15:46', navratriStart: '2020-10-17' },
  2021: { date: '2021-10-15', day: 'Friday', dashamiStart: '2021-10-15T06:54:00+05:30', ravanDahan: '17:44 - 19:11', vijayMuhurat: '14:03 - 14:49', sunrise: '06:22', sunset: '17:44', aparahna: '13:31 - 15:43', navratriStart: '2021-10-07' },
  2022: { date: '2022-10-05', day: 'Wednesday', dashamiStart: '2022-10-05T10:58:00+05:30', ravanDahan: '17:52 - 19:19', vijayMuhurat: '14:07 - 14:53', sunrise: '06:14', sunset: '17:52', aparahna: '13:25 - 15:37', navratriStart: '2022-09-26' },
  2023: { date: '2023-10-24', day: 'Tuesday', dashamiStart: '2023-10-24T11:44:00+05:30', ravanDahan: '17:39 - 19:06', vijayMuhurat: '14:00 - 14:46', sunrise: '06:27', sunset: '17:39', aparahna: '13:36 - 15:48', navratriStart: '2023-10-15' },
  2024: { date: '2024-10-12', day: 'Saturday', dashamiStart: '2024-10-12T14:58:00+05:30', ravanDahan: '17:46 - 19:13', vijayMuhurat: '14:04 - 14:50', sunrise: '06:20', sunset: '17:46', aparahna: '13:30 - 15:42', navratriStart: '2024-10-03' },
  2025: { date: '2025-10-01', day: 'Wednesday', dashamiStart: '2025-10-01T22:58:00+05:30', ravanDahan: '17:56 - 19:23', vijayMuhurat: '14:10 - 14:56', sunrise: '06:11', sunset: '17:56', aparahna: '13:22 - 15:34', navratriStart: '2025-09-22' },
  2026: { date: '2026-10-21', day: 'Wednesday', dashamiStart: '2026-10-21T03:38:00+05:30', ravanDahan: '17:41 - 19:08', vijayMuhurat: '14:01 - 14:47', sunrise: '06:25', sunset: '17:41', aparahna: '13:35 - 15:47', navratriStart: '2026-10-12' },
  2027: { date: '2027-10-10', day: 'Sunday', dashamiStart: '2027-10-10T07:48:00+05:30', ravanDahan: '17:49 - 19:16', vijayMuhurat: '14:06 - 14:52', sunrise: '06:17', sunset: '17:49', aparahna: '13:28 - 15:40', navratriStart: '2027-10-02' },
  2028: { date: '2028-09-29', day: 'Friday', dashamiStart: '2028-09-29T16:28:00+05:30', ravanDahan: '17:59 - 19:26', vijayMuhurat: '14:13 - 14:59', sunrise: '06:09', sunset: '17:59', aparahna: '13:20 - 15:32', navratriStart: '2028-09-20' },
  2029: { date: '2029-10-18', day: 'Thursday', dashamiStart: '2029-10-18T00:38:00+05:30', ravanDahan: '17:43 - 19:10', vijayMuhurat: '14:02 - 14:48', sunrise: '06:24', sunset: '17:43', aparahna: '13:34 - 15:46', navratriStart: '2029-10-09' },
  2030: { date: '2030-10-07', day: 'Monday', dashamiStart: '2030-10-07T09:18:00+05:30', ravanDahan: '17:51 - 19:18', vijayMuhurat: '14:08 - 14:54', sunrise: '06:15', sunset: '17:51', aparahna: '13:27 - 15:39', navratriStart: '2030-09-28' }
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
  { name: 'Surat', state: 'Gujarat', lat: 21.1702, lon: 72.8311 },
  { name: 'Kanpur', state: 'Uttar Pradesh', lat: 26.4499, lon: 80.3319 },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lon: 79.0882 },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lon: 75.8577 },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lon: 82.9739 },
  { name: 'Mysore', state: 'Karnataka', lat: 12.2958, lon: 76.6394 },
  { name: 'Kullu', state: 'Himachal Pradesh', lat: 31.9578, lon: 77.1095 }
];

const DussehraDates: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCity, setSelectedCity] = useState(INDIAN_CITIES[0]);
  const [searchCity, setSearchCity] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdownTime, setCountdownTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
  const dussehraData = DUSSEHRA_DATA[selectedYear as keyof typeof DUSSEHRA_DATA];

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
    if (!dussehraData) return;

    const updateCountdown = () => {
      const dussehraDate = new Date(dussehraData.date);
      const now = new Date();
      const diff = dussehraDate.getTime() - now.getTime();
      
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
  }, [dussehraData]);

  const shareUrl = `https://moneycal.in/festival-tools/dussehra-dates?year=${selectedYear}&city=${selectedCity.name}`;
  const shareText = `Dussehra ${selectedYear} on ${dussehraData?.day}, ${new Date(dussehraData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}! Ravan Dahan muhurat: ${dussehraData?.ravanDahan} in ${selectedCity.name}`;

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
        title={`Dussehra ${selectedYear} Date ${selectedCity.name} - Ravan Dahan Muhurat, Vijayadashami Timing, Aparahna Puja Time | Victory Day`}
        description={`Dussehra ${selectedYear} (Vijayadashami) on ${dussehraData?.day}, ${new Date(dussehraData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} in ${selectedCity.name}. Ravan Dahan muhurat: ${dussehraData?.ravanDahan}, Vijay Muhurat: ${dussehraData?.vijayMuhurat}. Get complete 10-day Navratri to Dussehra guide!`}
        keywords={`dussehra ${selectedYear} date, dussehra ${selectedYear} ${selectedCity.name.toLowerCase()}, vijayadashami ${selectedYear}, ravan dahan muhurat ${selectedYear}, when is dussehra ${selectedYear}, dussehra ${selectedYear} india, vijay dashami timing, aparahna muhurat dussehra, dasara ${selectedYear}, dashami tithi ${selectedYear}, dussehra puja time ${selectedCity.name.toLowerCase()}`}
        url={`/festival-tools/dussehra-dates?year=${selectedYear}&city=${selectedCity.name}`}
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-red-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-red-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-dates" className="hover:text-red-600 transition-colors">
                Festival Dates
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-red-600 font-medium">Dussehra Dates</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-full mb-6">
                <Award className="w-5 h-5" />
                <span className="font-semibold">Victory of Good Over Evil | 50+ Cities</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Dussehra {selectedYear} Date & Muhurat
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Find exact Vijayadashami date, Ravan Dahan muhurat & Vijay Muhurat timing for {selectedCity.name}! Complete 10-day Navratri to Dussehra celebration guide.
              </p>

              {/* Live Countdown */}
              {dussehraData && countdownTime.days > 0 && countdownTime.days < 365 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="max-w-4xl mx-auto mb-8"
                >
                  <div className="bg-gradient-to-r from-red-600 to-orange-600 p-8 rounded-3xl shadow-2xl">
                    <h2 className="text-white text-2xl font-bold mb-6">
                      ⏰ Countdown to Dussehra {selectedYear}
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
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-200">
                {/* Controls */}
                <div className="bg-gradient-to-r from-red-600 to-orange-600 p-8">
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
                            Dussehra {year}
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
                                className="w-full px-4 py-2 text-left hover:bg-red-50 transition-colors border-b border-gray-100 last:border-b-0"
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
                {dussehraData && (
                  <div className="p-8">
                    {/* Main Date */}
                    <div className="text-center mb-8 pb-8 border-b-2 border-red-100">
                      <div className="inline-flex items-center justify-center mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                          <Award className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Dussehra (Vijayadashami) {selectedYear}</h2>
                      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
                        {new Date(dussehraData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                      </div>
                      <div className="text-2xl text-gray-600 font-semibold mb-4">{dussehraData.day}</div>
                      <p className="text-gray-600">10th day after Navratri (Sharad Navratri: {new Date(dussehraData.navratriStart).toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} - {new Date(dussehraData.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })})</p>
                    </div>

                    {/* Muhurat Timings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl border-2 border-red-300 relative">
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center">
                            <Flame className="w-3 h-3 mr-1" />
                            MAIN EVENT
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                            <Flame className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Ravan Dahan Muhurat</h3>
                        </div>
                        <p className="text-3xl font-bold text-red-600 mb-2">{dussehraData.ravanDahan}</p>
                        <p className="text-sm text-gray-700">
                          Most auspicious time to burn Ravana effigy. Symbolizes victory of Lord Rama over evil.
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Vijay Muhurat</h3>
                        </div>
                        <p className="text-3xl font-bold text-green-600 mb-2">{dussehraData.vijayMuhurat}</p>
                        <p className="text-sm text-gray-700">
                          Victory muhurat - auspicious for new beginnings, starting ventures.
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                            <Star className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Aparahna Muhurat</h3>
                        </div>
                        <p className="text-3xl font-bold text-purple-600 mb-2">{dussehraData.aparahna}</p>
                        <p className="text-sm text-gray-700">
                          Afternoon favorable period for Vijayadashami puja.
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border-2 border-indigo-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Dashami Tithi Start</h3>
                        </div>
                        <p className="text-2xl font-bold text-indigo-600">
                          {new Date(dussehraData.dashamiStart).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">10th lunar day begins</p>
                      </div>

                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sunrise</h3>
                        </div>
                        <p className="text-3xl font-bold text-yellow-600">{dussehraData.sunrise}</p>
                        <p className="text-sm text-gray-600 mt-2">Morning puja time</p>
                      </div>

                      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sunset</h3>
                        </div>
                        <p className="text-3xl font-bold text-orange-600">{dussehraData.sunset}</p>
                        <p className="text-sm text-gray-600 mt-2">Ravan Dahan begins</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      <button
                        onClick={() => window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Dussehra+${selectedYear}&dates=${dussehraData.date.replace(/-/g, '')}/${dussehraData.date.replace(/-/g, '')}&details=Ravan+Dahan+${dussehraData.ravanDahan}&location=${selectedCity.name}`, '_blank')}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                      >
                        <Download className="w-5 h-5" />
                        <span>Add to Calendar</span>
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => setShowShareMenu(!showShareMenu)}
                          className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-red-600 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all"
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
                        className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-orange-600 text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all"
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

        {/* Related Tools */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Festival Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/festival-tools/navratri-dates" className="group bg-gradient-to-br from-orange-50 to-pink-50 p-6 rounded-2xl border-2 border-orange-200 hover:shadow-xl transition-all">
                <Sparkles className="w-10 h-10 text-orange-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Navratri {selectedYear}</h4>
                <p className="text-gray-600 text-sm mb-3">9-day color calendar & dates</p>
                <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                  View Dates
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/festival-tools/diwali-date-finder" className="group bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200 hover:shadow-xl transition-all">
                <Sparkles className="w-10 h-10 text-yellow-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Diwali {selectedYear}</h4>
                <p className="text-gray-600 text-sm mb-3">Lakshmi Puja muhurat</p>
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
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 prose prose-lg max-w-none">
            <h2 className="text-4xl font-bold mb-8">Dussehra {selectedYear} Complete Guide - {selectedCity.name}</h2>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl mb-8">
              <h3 className="text-2xl font-bold mb-4">When is Dussehra {selectedYear}?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>Dussehra {selectedYear} (Vijayadashami) is on {dussehraData?.day}, {new Date(dussehraData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>. Dussehra marks the victory of Lord Rama over demon king Ravana and Goddess Durga over Mahishasura. It's celebrated on the 10th day (Dashami tithi) after 9-day Sharad Navratri. Ravan Dahan muhurat in {selectedCity.name}: <strong>{dussehraData?.ravanDahan}</strong>.
              </p>

              <div className="mt-6 bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-xl">
                <h4 className="font-bold mb-3">🔥 Dussehra Celebrations & Shopping:</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <a href="https://www.amazon.in/s?k=dussehra+decorations" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Dussehra Decorations (Amazon)
                  </a>
                  <a href="https://www.flipkart.com/search?q=ramlila+costumes" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Ramlila Costumes (Flipkart)
                  </a>
                  <Link to="/festival-shopping" className="text-red-600 hover:underline flex items-center">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    Festival Budget Planner
                  </Link>
                  <Link to="/festival-dates" className="text-red-600 hover:underline flex items-center">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    Complete Festival Calendar
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <h3 className="text-3xl font-bold mb-6">Frequently Asked Questions - Dussehra {selectedYear}</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">1. When is Dussehra {selectedYear} and what is the Ravan Dahan muhurat?</h4>
                  <p className="text-gray-700">
                    Dussehra {selectedYear} is on <strong>{dussehraData?.day}, {new Date(dussehraData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}</strong>. The best Ravan Dahan muhurat in {selectedCity.name} is <strong>{dussehraData?.ravanDahan}</strong>. This is when community Ravan effigies are burned symbolizing victory of good over evil.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">2. What is Vijay Muhurat and why is it auspicious?</h4>
                  <p className="text-gray-700">
                    <strong>Vijay Muhurat ({dussehraData?.vijayMuhurat})</strong> is the most auspicious period on Vijayadashami for starting new ventures, buying vehicles, launching businesses. It's when Goddess Durga's victory energy is strongest. Traditionally used for Shamicheme_name puja (worshipping weapons/tools).
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">3. Difference between Navratri and Dussehra?</h4>
                  <p className="text-gray-700">
                    <strong>Navratri</strong> is 9-day celebration of Goddess Durga (starts {new Date(dussehraData?.navratriStart || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}). <strong>Dussehra/Vijayadashami</strong> is the 10th day finale celebrating Durga's victory over Mahishasura and Rama's victory over Ravana. Navratri → worship, Dussehra → victory celebration.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">4. Why is Ravan effigy burned on Dussehra?</h4>
                  <p className="text-gray-700">
                    Burning <strong>Ravan, Meghnath, and Kumbhakarna effigies</strong> symbolizes destruction of evil (ego, lust, anger). It represents Lord Rama's victory after rescuing Sita. Community gathers, enjoys Ramlila performances, and burns 50-100 ft tall effigies filled with firecrackers during Ravan Dahan muhurat.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">5. Regional Dussehra celebrations - North vs South vs East India?</h4>
                  <p className="text-gray-700">
                    <strong>North India</strong>: Ramlila performances + Ravan Dahan. <strong>West (Gujarat)</strong>: Garba/Dandiya during Navratri, Dussehra finale. <strong>East (Bengal)</strong>: Durga Puja climax with Vijaya Dashami immersion. <strong>South (Mysore)</strong>: Mysore Dasara with royal processions. <strong>Kullu (Himachal)</strong>: Week-long fair with deity processions.
                  </p>
                </div>
              </div>
            </div>

            {/* External Resources */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border-2 border-indigo-200 mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <ExternalLink className="w-6 h-6 mr-2 text-indigo-600" />
                Trusted Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a href="https://www.drikpanchang.com/festivals/dussehra/dussehra-date-time.html" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Drik Panchang - Dussehra Authority
                </a>
                <a href="https://en.wikipedia.org/wiki/Vijayadashami" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Wikipedia - Vijayadashami
                </a>
                <a href="https://www.youtube.com/results?search_query=ravan+dahan" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  YouTube - Ravan Dahan Videos
                </a>
                <a href="https://www.amazon.in/dussehra" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Dussehra Shopping (Amazon)
                </a>
              </div>
            </div>

            {/* Internal Links */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-8 rounded-2xl">
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
                  <h4 className="font-bold text-lg">Festival Shopping</h4>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DussehraDates;

