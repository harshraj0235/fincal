import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Moon, Sunrise, Home, ChevronRight, Sunset,
  Share2, Download, Bell, ArrowRight, Info, Heart, Gift, Check, Copy,
  X, Star, Zap, Users, ShoppingBag, ExternalLink, Award, BookOpen
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Guru Purnima is celebrated on Purnima (full moon) of Ashadha month (June-July)
// Day to honor spiritual teachers and gurus
const GURU_PURNIMA_DATA = {
  2020: { date: '2020-07-05', day: 'Sunday', purnimaStart: '2020-07-05T08:33:00+05:30', purnimaEnd: '2020-07-06T05:20:00+05:30', sunrise: '05:29', sunset: '19:21', moonrise: '19:35' },
  2021: { date: '2021-07-24', day: 'Saturday', purnimaStart: '2021-07-24T10:00:00+05:30', purnimaEnd: '2021-07-25T08:07:00+05:30', sunrise: '05:42', sunset: '19:20', moonrise: '19:32' },
  2022: { date: '2022-07-13', day: 'Wednesday', purnimaStart: '2022-07-13T16:03:00+05:30', purnimaEnd: '2022-07-14T16:32:00+05:30', sunrise: '05:37', sunset: '19:24', moonrise: '19:38' },
  2023: { date: '2023-07-03', day: 'Monday', purnimaStart: '2023-07-03T08:21:00+05:30', purnimaEnd: '2023-07-04T05:08:00+05:30', sunrise: '05:30', sunset: '19:27', moonrise: '19:41' },
  2024: { date: '2024-07-21', day: 'Sunday', purnimaStart: '2024-07-21T10:45:00+05:30', purnimaEnd: '2024-07-22T10:14:00+05:30', sunrise: '05:43', sunset: '19:23', moonrise: '19:37' },
  2025: { date: '2025-07-10', day: 'Thursday', purnimaStart: '2025-07-10T19:07:00+05:30', purnimaEnd: '2025-07-11T20:02:00+05:30', sunrise: '05:35', sunset: '19:26', moonrise: '19:40' },
  2026: { date: '2026-06-30', day: 'Tuesday', purnimaStart: '2026-06-30T04:26:00+05:30', purnimaEnd: '2026-07-01T02:28:00+05:30', sunrise: '05:28', sunset: '19:28', moonrise: '19:42' },
  2027: { date: '2027-07-19', day: 'Monday', purnimaStart: '2027-07-19T13:52:00+05:30', purnimaEnd: '2027-07-20T13:43:00+05:30', sunrise: '05:44', sunset: '19:24', moonrise: '19:38' },
  2028: { date: '2028-07-07', day: 'Friday', purnimaStart: '2028-07-07T23:13:00+05:30', purnimaEnd: '2028-07-08T23:50:00+05:30', sunrise: '05:32', sunset: '19:27', moonrise: '19:41' },
  2029: { date: '2029-06-27', day: 'Wednesday', purnimaStart: '2029-06-27T09:19:00+05:30', purnimaEnd: '2029-06-28T08:48:00+05:30', sunrise: '05:27', sunset: '19:28', moonrise: '19:42' },
  2030: { date: '2030-07-16', day: 'Tuesday', purnimaStart: '2030-07-16T19:25:00+05:30', purnimaEnd: '2030-07-17T20:31:00+05:30', sunrise: '05:42', sunset: '19:25', moonrise: '19:39' }
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
  { name: 'Rishikesh', state: 'Uttarakhand', lat: 30.0869, lon: 78.2676 },
  { name: 'Shirdi', state: 'Maharashtra', lat: 19.7645, lon: 74.4777 },
  { name: 'Tirupati', state: 'Andhra Pradesh', lat: 13.6288, lon: 79.4192 }
];

const GuruPurnimaCalendar: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCity, setSelectedCity] = useState(INDIAN_CITIES[0]);
  const [searchCity, setSearchCity] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdownTime, setCountdownTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
  const guruData = GURU_PURNIMA_DATA[selectedYear as keyof typeof GURU_PURNIMA_DATA];

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
    if (!guruData) return;

    const updateCountdown = () => {
      const guruDate = new Date(guruData.date);
      const now = new Date();
      const diff = guruDate.getTime() - now.getTime();
      
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
  }, [guruData]);

  const shareUrl = `/festival-tools/guru-purnima-calendar?year=${selectedYear}&city=${selectedCity.name}`;
  const shareText = `Guru Purnima ${selectedYear} on ${guruData?.day}, ${new Date(guruData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}! Purnima tithi: ${new Date(guruData?.purnimaStart || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} in ${selectedCity.name}`;

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
        title={`Guru Purnima ${selectedYear} Date ${selectedCity.name} - Purnima Tithi Timing, Puja Muhurat, Ashadha Full Moon | Complete Calendar`}
        description={`Guru Purnima ${selectedYear} on ${guruData?.day}, ${new Date(guruData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} in ${selectedCity.name}. Purnima tithi starts at ${new Date(guruData?.purnimaStart || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}. Complete guide to honor spiritual teachers with puja timings, fasting, and rituals!`}
        keywords={`guru purnima ${selectedYear} date, guru purnima ${selectedYear} ${selectedCity.name.toLowerCase()}, ashadha purnima ${selectedYear}, guru purnima puja time ${selectedYear}, guru purnima tithi ${selectedYear}, vyasa purnima ${selectedYear}, guru purnima calendar ${selectedYear}, guru purnima ${selectedYear} india`}
        url={`/festival-tools/guru-purnima-calendar?year=${selectedYear}&city=${selectedCity.name}`}
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
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
              <span className="text-orange-600 font-medium">Guru Purnima</span>
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
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">Honoring Spiritual Teachers | Vyasa Purnima</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent">
                Guru Purnima {selectedYear} Calendar
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Find exact Guru Purnima date & Purnima tithi timings for {selectedCity.name}! Complete guide to honor your gurus with puja muhurat, fasting, and spiritual observances.
              </p>

              {/* Live Countdown */}
              {guruData && countdownTime.days > 0 && countdownTime.days < 365 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="max-w-4xl mx-auto mb-8"
                >
                  <div className="bg-gradient-to-r from-orange-600 to-yellow-600 p-8 rounded-3xl shadow-2xl">
                    <h2 className="text-white text-2xl font-bold mb-6">
                      ⏰ Countdown to Guru Purnima {selectedYear}
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
                            Guru Purnima {year}
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
                {guruData && (
                  <div className="p-8">
                    {/* Main Info */}
                    <div className="text-center mb-8 pb-8 border-b-2 border-orange-100">
                      <div className="inline-flex items-center justify-center mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                          <Moon className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Guru Purnima {selectedYear}</h2>
                      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                        {new Date(guruData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                      </div>
                      <div className="text-2xl text-gray-600 font-semibold mb-4">{guruData.day}</div>
                      <p className="text-gray-600">Ashadha Purnima (Full Moon of Ashadha Month)</p>
                    </div>

                    {/* Purnima Tithi Details */}
                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl border-2 border-orange-200 mb-8">
                      <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                        <Moon className="w-6 h-6 mr-2 text-orange-600" />
                        Purnima Tithi (Full Moon) Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                              <Clock className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">Tithi Begins</div>
                              <div className="text-xs text-gray-600">Purnima starts</div>
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-green-600">
                            {new Date(guruData.purnimaStart).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(guruData.purnimaStart).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                              <Clock className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">Tithi Ends</div>
                              <div className="text-xs text-gray-600">Purnima concludes</div>
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-red-600">
                            {new Date(guruData.purnimaEnd).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(guruData.purnimaEnd).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                        <p className="text-sm text-gray-700">
                          <strong>Best Puja Time:</strong> Morning hours after sunrise during Purnima tithi. Ideal to perform Guru Puja between <strong>{guruData.sunrise} - 12:00 PM</strong>.
                        </p>
                      </div>
                    </div>

                    {/* Sun & Moon Timings */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                            <Sunrise className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900">Sunrise</h3>
                        </div>
                        <p className="text-3xl font-bold text-yellow-600">{guruData.sunrise}</p>
                        <p className="text-sm text-gray-600 mt-2">Morning puja time</p>
                      </div>

                      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                            <Sunset className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900">Sunset</h3>
                        </div>
                        <p className="text-3xl font-bold text-orange-600">{guruData.sunset}</p>
                        <p className="text-sm text-gray-600 mt-2">Evening rituals</p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <Moon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900">Moonrise</h3>
                        </div>
                        <p className="text-3xl font-bold text-blue-600">{guruData.moonrise}</p>
                        <p className="text-sm text-gray-600 mt-2">Full moon visible</p>
                      </div>
                    </div>

                    {/* Guru Purnima Observances */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 mb-8">
                      <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                        <BookOpen className="w-6 h-6 mr-2 text-purple-600" />
                        How to Observe Guru Purnima
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-bold text-purple-600 mb-2">🙏 Spiritual Practices</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Visit your guru or teacher</li>
                            <li>• Offer flowers, fruits & dakshina</li>
                            <li>• Seek blessings & teachings</li>
                            <li>• Read spiritual texts (Bhagavad Gita, Vedas)</li>
                          </ul>
                        </div>

                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-bold text-pink-600 mb-2">📿 Puja Rituals</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Light lamp before guru's photo</li>
                            <li>• Offer sandalwood paste & flowers</li>
                            <li>• Chant Guru Mantra: "Om Gurave Namah"</li>
                            <li>• Practice meditation & yoga</li>
                          </ul>
                        </div>

                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-bold text-blue-600 mb-2">🌾 Fasting (Optional)</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Observe full day fast (sunrise to moonrise)</li>
                            <li>• Or fruit/milk diet only</li>
                            <li>• Break fast after moonrise</li>
                            <li>• Sattvic food recommended</li>
                          </ul>
                        </div>

                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-bold text-green-600 mb-2">📚 Learning & Teaching</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Attend spiritual discourses (satsang)</li>
                            <li>• Share knowledge with others</li>
                            <li>• Donate to educational causes</li>
                            <li>• Express gratitude to all teachers</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      <button
                        onClick={() => window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Guru+Purnima+${selectedYear}&dates=${guruData.date.replace(/-/g, '')}/${guruData.date.replace(/-/g, '')}&details=Purnima+Tithi+${new Date(guruData.purnimaStart).toLocaleTimeString('en-IN')}&location=${selectedCity.name}`, '_blank')}
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
              <Link to="/festival-dates" className="group bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 hover:shadow-xl transition-all">
                <Calendar className="w-10 h-10 text-purple-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">All Festivals {selectedYear}</h4>
                <p className="text-gray-600 text-sm mb-3">Complete calendar</p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                  View Calendar
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/religious-tools" className="group bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl border-2 border-orange-200 hover:shadow-xl transition-all">
                <Star className="w-10 h-10 text-orange-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Religious Tools</h4>
                <p className="text-gray-600 text-sm mb-3">Puja vidhi & mantras</p>
                <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                  Explore
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/festival-shopping" className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200 hover:shadow-xl transition-all">
                <ShoppingBag className="w-10 h-10 text-blue-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Festival Shopping</h4>
                <p className="text-gray-600 text-sm mb-3">Budget planner</p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                  Plan Budget
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 prose prose-lg max-w-none">
            <h2 className="text-4xl font-bold mb-8">Guru Purnima {selectedYear} Complete Guide - {selectedCity.name}</h2>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl mb-8">
              <h3 className="text-2xl font-bold mb-4">When is Guru Purnima {selectedYear}?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>Guru Purnima {selectedYear} is on {guruData?.day}, {new Date(guruData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>. The Purnima tithi (full moon) begins at <strong>{new Date(guruData?.purnimaStart || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</strong> and ends at <strong>{new Date(guruData?.purnimaEnd || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</strong> in {selectedCity.name}. This sacred day honors spiritual teachers (gurus) and is also known as <strong>Vyasa Purnima</strong>, celebrating sage Vyasa who compiled the Vedas.
              </p>

              <div className="mt-6 bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl">
                <h4 className="font-bold mb-3">📚 Guru Purnima Essentials:</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <a href="https://www.amazon.in/s?k=spiritual+books" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Spiritual Books (Amazon)
                  </a>
                  <a href="https://www.flipkart.com/search?q=meditation+mat" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Meditation Mats (Flipkart)
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
              <h3 className="text-3xl font-bold mb-6">Frequently Asked Questions - Guru Purnima {selectedYear}</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-orange-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">1. When is Guru Purnima {selectedYear} and what time is Purnima tithi?</h4>
                  <p className="text-gray-700">
                    Guru Purnima {selectedYear} is on <strong>{guruData?.day}, {new Date(guruData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}</strong>. The Purnima tithi begins at <strong>{new Date(guruData?.purnimaStart || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</strong> and ends at <strong>{new Date(guruData?.purnimaEnd || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</strong> in {selectedCity.name}. Best puja time is morning hours after sunrise during Purnima tithi.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">2. What is Guru Purnima and why is it celebrated?</h4>
                  <p className="text-gray-700">
                    <strong>Guru Purnima</strong> is the full moon day (Purnima) in the month of Ashadha when we honor our spiritual teachers and gurus. It's also called <strong>Vyasa Purnima</strong> after sage Ved Vyasa who compiled the Vedas. This day celebrates the guru-disciple tradition, expresses gratitude to teachers, and seeks blessings for spiritual growth. Celebrated by Hindus, Buddhists, and Jains across India.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">3. How should I observe Guru Purnima? What rituals to perform?</h4>
                  <p className="text-gray-700">
                    <strong>Observe Guru Purnima by:</strong> Visit your guru/teacher and offer flowers, fruits, dakshina. Perform <strong>Guru Puja</strong>—light lamp, offer sandalwood & flowers before guru's photo, chant "Om Gurave Namah". Read spiritual texts (Bhagavad Gita, Vedas). Practice meditation & yoga. Attend satsang (spiritual discourse). Optional full-day fast from sunrise to moonrise. Express gratitude to all teachers in your life (parents, school teachers, mentors).
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">4. Is fasting mandatory on Guru Purnima?</h4>
                  <p className="text-gray-700">
                    <strong>No, fasting is not mandatory</strong> on Guru Purnima but is considered spiritually beneficial. If you choose to fast: Observe full-day fast (no food/water) from sunrise to moonrise, or follow fruit/milk diet only. Break fast after moonrise (around <strong>{guruData?.moonrise}</strong>). Sattvic (pure vegetarian) food recommended. The emphasis is on spiritual practice, learning, and honoring teachers rather than strict fasting rules.
                  </p>
                </div>

                <div className="border-l-4 border-pink-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">5. What is the significance of full moon (Purnima) for Guru Purnima?</h4>
                  <p className="text-gray-700">
                    The <strong>full moon (Purnima) symbolizes completeness and enlightenment</strong>. Just as the moon is fully illuminated by the sun, the disciple's mind is illuminated by the guru's wisdom. Ashadha Purnima is considered especially auspicious as it falls during the monsoon season (retreat time for spiritual practice). The <strong>full moon's gravitational pull</strong> is believed to enhance meditation depth and spiritual receptivity, making it ideal for honoring gurus.
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
                <a href="https://www.drikpanchang.com/festivals/guru-purnima/guru-purnima-date-time.html" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Drik Panchang - Guru Purnima Authority
                </a>
                <a href="https://en.wikipedia.org/wiki/Guru_Purnima" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Wikipedia - Guru Purnima
                </a>
                <a href="https://www.youtube.com/results?search_query=guru+purnima+puja+vidhi" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  YouTube - Puja Vidhi Tutorials
                </a>
                <a href="https://www.amazon.in/spiritual-books" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Spiritual Books (Amazon)
                </a>
              </div>
            </div>

            {/* Internal Links */}
            <div className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white p-8 rounded-2xl">
              <h3 className="text-3xl font-bold mb-6 text-center">More Festival & Spiritual Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/festival-dates" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl">
                  <Calendar className="w-8 h-8 mb-2" />
                  <h4 className="font-bold text-lg">Festival Calendar {selectedYear}</h4>
                </Link>
                <Link to="/religious-tools" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl">
                  <Star className="w-8 h-8 mb-2" />
                  <h4 className="font-bold text-lg">Religious Tools & Mantras</h4>
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

export default GuruPurnimaCalendar;

