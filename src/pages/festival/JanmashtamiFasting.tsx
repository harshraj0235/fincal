import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Sun, Moon, Sparkles, Home, ChevronRight,
  Share2, Download, Bell, ArrowRight, Info, Heart, Gift, Check, Copy,
  X, Star, Zap, Users, ShoppingBag, ExternalLink, Award, Music
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Janmashtami falls on Krishna Paksha Ashtami (8th day) of Bhadrapada month
// Lord Krishna born at midnight during Rohini Nakshatra
const JANMASHTAMI_DATA = {
  2020: { date: '2020-08-11', day: 'Tuesday', ashtamiStart: '2020-08-11T19:22:00+05:30', fastingStart: '19:22', midnightBirth: '00:00', fastingEnd: '06:34', sunrise: '06:14', sunset: '19:03', rohiniStart: '22:45', parana: '06:34', nishithaKaal: '23:47 - 00:35' },
  2021: { date: '2021-08-30', day: 'Monday', ashtamiStart: '2021-08-30T15:23:00+05:30', fastingStart: '15:23', midnightBirth: '00:00', fastingEnd: '05:58', sunrise: '05:58', sunset: '18:58', rohiniStart: '20:12', parana: '05:58', nishithaKaal: '23:43 - 00:28' },
  2022: { date: '2022-08-18', day: 'Thursday', ashtamiStart: '2022-08-18T22:57:00+05:30', fastingStart: '22:57', midnightBirth: '00:00', fastingEnd: '06:08', sunrise: '06:08', sunset: '18:50', rohiniStart: '18:30', parana: '06:08', nishithaKaal: '23:46 - 00:31' },
  2023: { date: '2023-09-06', day: 'Wednesday', ashtamiStart: '2023-09-06T21:46:00+05:30', fastingStart: '21:46', midnightBirth: '00:00', fastingEnd: '06:18', sunrise: '06:18', sunset: '18:38', rohiniStart: '16:42', parana: '06:18', nishithaKaal: '23:43 - 00:26' },
  2024: { date: '2024-08-26', day: 'Monday', ashtamiStart: '2024-08-26T03:01:00+05:30', fastingStart: '18:53', midnightBirth: '00:00', fastingEnd: '06:04', sunrise: '06:04', sunset: '18:53', rohiniStart: '12:25', parana: '06:04', nishithaKaal: '23:44 - 00:28' },
  2025: { date: '2025-08-15', day: 'Friday', ashtamiStart: '2025-08-15T14:43:00+05:30', fastingStart: '18:47', midnightBirth: '00:00', fastingEnd: '06:11', sunrise: '06:11', sunset: '18:47', rohiniStart: '08:52', parana: '06:11', nishithaKaal: '23:45 - 00:30' },
  2026: { date: '2026-09-04', day: 'Friday', ashtamiStart: '2026-09-04T10:38:00+05:30', fastingStart: '18:38', midnightBirth: '00:00', fastingEnd: '06:19', sunrise: '06:19', sunset: '18:38', rohiniStart: '05:15', parana: '06:19', nishithaKaal: '23:42 - 00:25' },
  2027: { date: '2027-08-24', day: 'Tuesday', ashtamiStart: '2027-08-24T21:27:00+05:30', fastingStart: '21:27', midnightBirth: '00:00', fastingEnd: '06:04', sunrise: '06:04', sunset: '18:53', rohiniStart: '01:42', parana: '06:04', nishithaKaal: '23:44 - 00:28' },
  2028: { date: '2028-08-12', day: 'Saturday', ashtamiStart: '2028-08-12T08:13:00+05:30', fastingStart: '18:43', midnightBirth: '00:00', fastingEnd: '06:13', sunrise: '06:13', sunset: '18:43', rohiniStart: '22:09', parana: '06:13', nishithaKaal: '23:46 - 00:31' },
  2029: { date: '2029-09-01', day: 'Saturday', ashtamiStart: '2029-09-01T19:04:00+05:30', fastingStart: '19:04', midnightBirth: '00:00', fastingEnd: '06:21', sunrise: '06:21', sunset: '18:41', rohiniStart: '18:36', parana: '06:21', nishithaKaal: '23:42 - 00:25' },
  2030: { date: '2030-08-22', day: 'Thursday', ashtamiStart: '2030-08-22T05:50:00+05:30', fastingStart: '18:49', midnightBirth: '00:00', fastingEnd: '06:06', sunrise: '06:06', sunset: '18:49', rohiniStart: '15:03', parana: '06:06', nishithaKaal: '23:44 - 00:28' }
};

// Major Indian Cities
const INDIAN_CITIES = [
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lon: 72.8777 },
  { name: 'Delhi', state: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { name: 'Mathura', state: 'Uttar Pradesh', lat: 27.4924, lon: 77.6737 },
  { name: 'Vrindavan', state: 'Uttar Pradesh', lat: 27.5819, lon: 77.6977 },
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lon: 77.5946 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lon: 78.4867 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lon: 88.3639 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lon: 73.8567 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lon: 72.5714 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lon: 75.7873 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462 },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lon: 82.9739 },
  { name: 'Dwarka', state: 'Gujarat', lat: 22.2442, lon: 68.9685 },
  { name: 'Puri', state: 'Odisha', lat: 19.8135, lon: 85.8312 }
];

const JanmashtamiFasting: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCity, setSelectedCity] = useState(INDIAN_CITIES[0]);
  const [searchCity, setSearchCity] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdownTime, setCountdownTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
  const janmaData = JANMASHTAMI_DATA[selectedYear as keyof typeof JANMASHTAMI_DATA];

  // Filter cities
  const filteredCities = useMemo(() => {
    if (!searchCity) return INDIAN_CITIES;
    const query = searchCity.toLowerCase();
    return INDIAN_CITIES.filter(city => 
      city.name.toLowerCase().includes(query) || 
      city.state.toLowerCase().includes(query)
    );
  }, [searchCity]);

  // Live countdown to midnight birth
  useEffect(() => {
    if (!janmaData) return;

    const updateCountdown = () => {
      const janmaDate = new Date(janmaData.date);
      janmaDate.setHours(0, 0, 0, 0); // Midnight
      janmaDate.setDate(janmaDate.getDate() + 1); // Next day midnight
      
      const now = new Date();
      const diff = janmaDate.getTime() - now.getTime();
      
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
  }, [janmaData]);

  const shareUrl = `/festival-tools/janmashtami-fasting?year=${selectedYear}&city=${selectedCity.name}`;
  const shareText = `Krishna Janmashtami ${selectedYear} on ${janmaData?.day}, ${new Date(janmaData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}! Fasting time: ${janmaData?.fastingStart} to ${janmaData?.fastingEnd} | Midnight birth at 00:00`;

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
        title={`Janmashtami ${selectedYear} Fasting Time ${selectedCity.name} - Krishna Birth Midnight Time, Parana Time, Nishitha Kaal | Complete Vrat Guide`}
        description={`Krishna Janmashtami ${selectedYear} on ${janmaData?.day}, ${new Date(janmaData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} in ${selectedCity.name}. Fasting start: ${janmaData?.fastingStart}, Midnight birth: 00:00, Parana: ${janmaData?.fastingEnd}. Get Nishitha Kaal, Rohini Nakshatra, complete fasting guide!`}
        keywords={`janmashtami ${selectedYear} fasting time, janmashtami ${selectedYear} ${selectedCity.name.toLowerCase()}, krishna janmashtami ${selectedYear}, krishna birth time midnight, janmashtami vrat timing, parana time janmashtami ${selectedYear}, nishitha kaal janmashtami, rohini nakshatra janmashtami, when is janmashtami ${selectedYear}, janmashtami fasting rules, ashtami tithi ${selectedYear}`}
        url={`/festival-tools/janmashtami-fasting?year=${selectedYear}&city=${selectedCity.name}`}
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-blue-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-dates" className="hover:text-blue-600 transition-colors">
                Festival Dates
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-blue-600 font-medium">Janmashtami Fasting</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full mb-6">
                <Star className="w-5 h-5" />
                <span className="font-semibold">Hare Krishna! Midnight Birth Countdown</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Janmashtami {selectedYear} Fasting Time
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Find exact fasting times, midnight Krishna birth moment & Parana time for {selectedCity.name}! Complete Nishitha Kaal & Rohini Nakshatra guide.
              </p>

              {/* Live Countdown to Midnight */}
              {janmaData && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="max-w-4xl mx-auto mb-8"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-3xl shadow-2xl">
                    <h2 className="text-white text-2xl font-bold mb-6">
                      ⏰ Countdown to Krishna's Midnight Birth
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
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-200">
                {/* Controls */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
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
                            Janmashtami {year}
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
                                className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
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
                {janmaData && (
                  <div className="p-8">
                    {/* Main Date */}
                    <div className="text-center mb-8 pb-8 border-b-2 border-blue-100">
                      <div className="inline-flex items-center justify-center mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                          <Star className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Krishna Janmashtami {selectedYear}</h2>
                      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        {new Date(janmaData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                      </div>
                      <div className="text-2xl text-gray-600 font-semibold mb-4">{janmaData.day}</div>
                      <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                        <MapPin className="w-4 h-4" />
                        <span className="font-semibold">{selectedCity.name}, {selectedCity.state}</span>
                      </div>
                    </div>

                    {/* Fasting Timeline */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200 mb-8">
                      <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                        <Clock className="w-6 h-6 mr-2 text-blue-600" />
                        Complete Janmashtami Fasting Timeline
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                              <Sun className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">1. Fasting Begins</div>
                              <div className="text-xs text-gray-600">Evening of {new Date(janmaData.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</div>
                            </div>
                          </div>
                          <span className="text-2xl font-bold text-orange-600">{janmaData.fastingStart}</span>
                        </div>

                        <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                              <Moon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">2. Nishitha Kaal Puja</div>
                              <div className="text-xs text-gray-600">Most auspicious midnight period</div>
                            </div>
                          </div>
                          <span className="text-xl font-bold text-purple-600">{janmaData.nishithaKaal}</span>
                        </div>

                        <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                              <Star className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-lg">3. Krishna's Midnight Birth 🎂</div>
                              <div className="text-xs text-white/80">Sacred moment - Perform aarti</div>
                            </div>
                          </div>
                          <span className="text-3xl font-bold">00:00</span>
                        </div>

                        <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                              <Sun className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">4. Parana (Break Fast)</div>
                              <div className="text-xs text-gray-600">Next morning after sunrise</div>
                            </div>
                          </div>
                          <span className="text-2xl font-bold text-green-600">{janmaData.parana}</span>
                        </div>
                      </div>

                      <div className="mt-4 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                        <p className="text-sm text-gray-700">
                          <strong>Total Fasting Duration:</strong> Approximately 11-13 hours (Evening to next morning). No food or water during this period.
                        </p>
                      </div>
                    </div>

                    {/* Detailed Timings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border-2 border-purple-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                            <Moon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Ashtami Tithi Start</h3>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">
                          {new Date(janmaData.ashtamiStart).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">8th lunar day begins</p>
                      </div>

                      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border-2 border-indigo-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center">
                            <Star className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Rohini Nakshatra</h3>
                        </div>
                        <p className="text-2xl font-bold text-indigo-600">{janmaData.rohiniStart}</p>
                        <p className="text-sm text-gray-600 mt-2">Krishna's birth star</p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-300 relative">
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                            SACRED
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Nishitha Kaal</h3>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{janmaData.nishithaKaal}</p>
                        <p className="text-sm text-gray-600 mt-2">Midnight puja period</p>
                      </div>

                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sunrise</h3>
                        </div>
                        <p className="text-3xl font-bold text-yellow-600">{janmaData.sunrise}</p>
                        <p className="text-sm text-gray-600 mt-2">Morning rituals</p>
                      </div>

                      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl border-2 border-red-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sunset</h3>
                        </div>
                        <p className="text-3xl font-bold text-red-600">{janmaData.sunset}</p>
                        <p className="text-sm text-gray-600 mt-2">Fasting begins</p>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                            <Gift className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Parana (Break Fast)</h3>
                        </div>
                        <p className="text-3xl font-bold text-green-600">{janmaData.parana}</p>
                        <p className="text-sm text-gray-600 mt-2">Next morning</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      <button
                        onClick={() => window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Krishna+Janmashtami+${selectedYear}&dates=${janmaData.date.replace(/-/g, '')}/${janmaData.date.replace(/-/g, '')}&details=Nishitha+Kaal+${janmaData.nishithaKaal}&location=${selectedCity.name}`, '_blank')}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                      >
                        <Download className="w-5 h-5" />
                        <span>Add to Calendar</span>
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => setShowShareMenu(!showShareMenu)}
                          className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all"
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
              <Link to="/festival-tools/raksha-bandhan-muhurat" className="group bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200 hover:shadow-xl transition-all">
                <Heart className="w-10 h-10 text-orange-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Raksha Bandhan {selectedYear}</h4>
                <p className="text-gray-600 text-sm mb-3">Rakhi tying muhurat</p>
                <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                  View Tool
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
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 prose prose-lg max-w-none">
            <h2 className="text-4xl font-bold mb-8">Janmashtami {selectedYear} Complete Fasting Guide - {selectedCity.name}</h2>

            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-4">When is Janmashtami {selectedYear} and What Time to Fast?</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Krishna Janmashtami {selectedYear} is on {janmaData?.day}, {new Date(janmaData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>. Fasting begins at <strong>{janmaData?.fastingStart} (sunset)</strong> and ends at <strong>{janmaData?.parana} next morning (sunrise)</strong> in {selectedCity.name}. The sacred midnight birth of Lord Krishna occurs at <strong>00:00 (midnight)</strong> during Nishitha Kaal ({janmaData?.nishithaKaal}), when devotees perform special aarti and break their fast.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">🌙 Nishitha Kaal (Sacred Midnight)</h4>
                  <p className="text-sm text-gray-700"><strong>{janmaData?.nishithaKaal}</strong> - Most auspicious period when Lord Krishna was born. Perform midnight puja, aarti, and bhajans during this time.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">⭐ Rohini Nakshatra Time</h4>
                  <p className="text-sm text-gray-700"><strong>Starts at {janmaData?.rohiniStart}</strong> - Krishna was born under Rohini nakshatra. Most auspicious for puja.</p>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl">
                <h4 className="font-bold mb-3">🛒 Janmashtami Essentials:</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <a href="https://www.amazon.in/s?k=krishna+idol" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Krishna Idols (Amazon)
                  </a>
                  <a href="https://www.flipkart.com/search?q=janmashtami+decoration" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Decorations (Flipkart)
                  </a>
                  <Link to="/festival-shopping" className="text-blue-600 hover:underline flex items-center">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    Festival Budget Planner
                  </Link>
                  <Link to="/religious-tools" className="text-blue-600 hover:underline flex items-center">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    Puja Vidhi Guide
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <h3 className="text-3xl font-bold mb-6">Frequently Asked Questions - Janmashtami {selectedYear}</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">1. What time should I start fasting for Janmashtami {selectedYear} in {selectedCity.name}?</h4>
                  <p className="text-gray-700">
                    Begin fasting at <strong>{janmaData?.fastingStart} (sunset)</strong> on {janmaData?.day}, {new Date(janmaData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}. The Ashtami tithi begins at {new Date(janmaData?.ashtamiStart || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}. Complete Nirjala fast (no food/water) until midnight or next morning.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">2. What is Nishitha Kaal and why is it important for Janmashtami?</h4>
                  <p className="text-gray-700">
                    <strong>Nishitha Kaal ({janmaData?.nishithaKaal})</strong> is the sacred midnight period when Lord Krishna was born in Mathura prison. This is the most auspicious time to perform Krishna puja, aarti, sing bhajans, and break your fast. Devotees stay awake until midnight to witness the divine birth moment at 00:00.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">3. When can I break Janmashtami fast (Parana time)?</h4>
                  <p className="text-gray-700">
                    You can break your Janmashtami fast after <strong>midnight puja at 00:00</strong> or wait until <strong>Parana time at {janmaData?.parana} (next morning sunrise)</strong> in {selectedCity.name}. Traditional practice: break fast with panchamrit (milk, curd, ghee, honey, sugar) after midnight aarti.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">4. What is Rohini Nakshatra and its significance for Krishna Janmashtami?</h4>
                  <p className="text-gray-700">
                    <strong>Rohini is the birth star (nakshatra) of Lord Krishna</strong>. Krishna was born when Rohini nakshatra was prevailing. For Janmashtami {selectedYear}, Rohini nakshatra begins at <strong>{janmaData?.rohiniStart}</strong>. Performing puja during Rohini + Ashtami tithi combination is extremely auspicious.
                  </p>
                </div>

                <div className="border-l-4 border-pink-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">5. What offerings should be made to Lord Krishna on Janmashtami?</h4>
                  <p className="text-gray-700">
                    Traditional offerings (prasad) for Krishna: <strong>Panchamrit</strong> (5 nectars), <strong>Makhan-Mishri</strong> (butter-sugar), <strong>56 Bhog</strong> (56 food items), milk, curd, fruits, tulsi leaves, yellow flowers, sandalwood. Favorite sweet: <strong>Peda</strong> and butter-based items. Avoid onion/garlic during fasting.
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
                <a href="https://www.drikpanchang.com/festivals/janmashtami/janmashtami-date-time.html" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Drik Panchang - Janmashtami Authority
                </a>
                <a href="https://en.wikipedia.org/wiki/Krishna_Janmashtami" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Wikipedia - Janmashtami History
                </a>
                <a href="https://www.youtube.com/results?search_query=janmashtami+puja+vidhi" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  YouTube - Puja Vidhi Tutorials
                </a>
                <a href="https://www.amazon.in/krishna-idol" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Krishna Idols & Decorations
                </a>
              </div>
            </div>

            {/* Internal Links */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl">
              <h3 className="text-3xl font-bold mb-6 text-center">More Festival & Fasting Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/festival-dates" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl">
                  <Calendar className="w-8 h-8 mb-2" />
                  <h4 className="font-bold text-lg">Festival Calendar {selectedYear}</h4>
                </Link>
                <Link to="/religious-tools" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl">
                  <Star className="w-8 h-8 mb-2" />
                  <h4 className="font-bold text-lg">Vrat Calculator</h4>
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

export default JanmashtamiFasting;

