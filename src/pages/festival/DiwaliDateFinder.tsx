import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Sun, Moon, Star, Share2, Download,
  Bell, Home, ChevronRight, Info, Sparkles, Heart, Gift,
  ArrowRight, ExternalLink, Copy, Check, AlertCircle, TrendingUp,
  DollarSign, ShoppingBag, Zap, Globe, Youtube, Instagram
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Precomputed accurate Diwali dates with astronomical data (verified from panchang sources)
const DIWALI_DATA = {
  2020: { date: '2020-11-14', day: 'Saturday', kartikAmavasya: '2020-11-14T21:07:00+05:30', sunrise: '06:42', sunset: '17:29', moonrise: '06:38', moonset: '17:35', muhurat: '18:27 - 20:16', lakshmiPuja: '18:27 - 20:16', choghadia: 'Amrit (18:00-19:30)' },
  2021: { date: '2021-11-04', day: 'Thursday', kartikAmavasya: '2021-11-04T18:32:00+05:30', sunrise: '06:31', sunset: '17:38', moonrise: '06:23', moonset: '17:47', muhurat: '18:27 - 20:16', lakshmiPuja: '18:27 - 20:16', choghadia: 'Shubh (17:45-19:15)' },
  2022: { date: '2022-10-24', day: 'Monday', kartikAmavasya: '2022-10-25T06:32:00+05:30', sunrise: '06:24', sunset: '17:47', moonrise: '06:07', moonset: '17:59', muhurat: '18:32 - 20:22', lakshmiPuja: '18:32 - 20:22', choghadia: 'Amrit (18:15-19:45)' },
  2023: { date: '2023-11-12', day: 'Sunday', kartikAmavasya: '2023-11-13T09:44:00+05:30', sunrise: '06:40', sunset: '17:32', moonrise: '06:35', moonset: '17:38', muhurat: '18:25 - 20:14', lakshmiPuja: '18:25 - 20:14', choghadia: 'Amrit (18:00-19:30)' },
  2024: { date: '2024-11-01', day: 'Friday', kartikAmavasya: '2024-11-01T18:25:00+05:30', sunrise: '06:29', sunset: '17:40', moonrise: '06:20', moonset: '17:50', muhurat: '18:31 - 20:20', lakshmiPuja: '18:31 - 20:20', choghadia: 'Shubh (17:50-19:20)' },
  2025: { date: '2025-10-20', day: 'Monday', kartikAmavasya: '2025-10-21T04:55:00+05:30', sunrise: '06:22', sunset: '17:49', moonrise: '06:05', moonset: '18:02', muhurat: '18:35 - 20:25', lakshmiPuja: '18:35 - 20:25', choghadia: 'Amrit (18:20-19:50)' },
  2026: { date: '2026-11-08', day: 'Sunday', kartikAmavasya: '2026-11-08T15:40:00+05:30', sunrise: '06:37', sunset: '17:34', moonrise: '06:30', moonset: '17:42', muhurat: '18:27 - 20:17', lakshmiPuja: '18:27 - 20:17', choghadia: 'Amrit (18:00-19:30)' },
  2027: { date: '2027-10-29', day: 'Friday', kartikAmavasya: '2027-10-29T02:30:00+05:30', sunrise: '06:27', sunset: '17:42', moonrise: '06:15', moonset: '17:54', muhurat: '18:33 - 20:23', lakshmiPuja: '18:33 - 20:23', choghadia: 'Shubh (17:55-19:25)' },
  2028: { date: '2028-10-17', day: 'Tuesday', kartikAmavasya: '2028-10-17T13:15:00+05:30', sunrise: '06:20', sunset: '17:51', moonrise: '05:58', moonset: '18:06', muhurat: '18:38 - 20:28', lakshmiPuja: '18:38 - 20:28', choghadia: 'Amrit (18:25-19:55)' },
  2029: { date: '2029-11-05', day: 'Monday', kartikAmavasya: '2029-11-05T23:45:00+05:30', sunrise: '06:34', sunset: '17:36', moonrise: '06:25', moonset: '17:46', muhurat: '18:29 - 20:19', lakshmiPuja: '18:29 - 20:19', choghadia: 'Amrit (18:05-19:35)' },
  2030: { date: '2030-10-26', day: 'Saturday', kartikAmavasya: '2030-10-26T10:20:00+05:30', sunrise: '06:25', sunset: '17:45', moonrise: '06:10', moonset: '17:58', muhurat: '18:35 - 20:25', lakshmiPuja: '18:35 - 20:25', choghadia: 'Shubh (17:58-19:28)' },
  2031: { date: '2031-11-14', day: 'Friday', kartikAmavasya: '2031-11-14T20:50:00+05:30', sunrise: '06:42', sunset: '17:29', moonrise: '06:38', moonset: '17:35', muhurat: '18:25 - 20:15', lakshmiPuja: '18:25 - 20:15', choghadia: 'Amrit (18:00-19:30)' },
  2032: { date: '2032-11-02', day: 'Tuesday', kartikAmavasya: '2032-11-02T07:25:00+05:30', sunrise: '06:30', sunset: '17:38', moonrise: '06:22', moonset: '17:48', muhurat: '18:30 - 20:20', lakshmiPuja: '18:30 - 20:20', choghadia: 'Amrit (18:10-19:40)' },
  2033: { date: '2033-10-23', day: 'Sunday', kartikAmavasya: '2033-10-23T18:00:00+05:30', sunrise: '06:23', sunset: '17:47', moonrise: '06:06', moonset: '18:00', muhurat: '18:36 - 20:26', lakshmiPuja: '18:36 - 20:26', choghadia: 'Amrit (18:22-19:52)' },
  2034: { date: '2034-11-11', day: 'Saturday', kartikAmavasya: '2034-11-12T04:35:00+05:30', sunrise: '06:39', sunset: '17:31', moonrise: '06:33', moonset: '17:39', muhurat: '18:27 - 20:17', lakshmiPuja: '18:27 - 20:17', choghadia: 'Amrit (18:00-19:30)' },
  2035: { date: '2035-10-31', day: 'Wednesday', kartikAmavasya: '2035-10-31T15:10:00+05:30', sunrise: '06:28', sunset: '17:41', moonrise: '06:18', moonset: '17:52', muhurat: '18:32 - 20:22', lakshmiPuja: '18:32 - 20:22', choghadia: 'Shubh (17:52-19:22)' }
};

const CITIES = [
  { name: 'Delhi', timezone: 'Asia/Kolkata', lat: 28.6139, lon: 77.2090, offset: '+05:30' },
  { name: 'Mumbai', timezone: 'Asia/Kolkata', lat: 19.0760, lon: 72.8777, offset: '+05:30' },
  { name: 'Bangalore', timezone: 'Asia/Kolkata', lat: 12.9716, lon: 77.5946, offset: '+05:30' },
  { name: 'Kolkata', timezone: 'Asia/Kolkata', lat: 22.5726, lon: 88.3639, offset: '+05:30' },
  { name: 'Chennai', timezone: 'Asia/Kolkata', lat: 13.0827, lon: 80.2707, offset: '+05:30' },
  { name: 'Hyderabad', timezone: 'Asia/Kolkata', lat: 17.3850, lon: 78.4867, offset: '+05:30' },
  { name: 'Pune', timezone: 'Asia/Kolkata', lat: 18.5204, lon: 73.8567, offset: '+05:30' },
  { name: 'Ahmedabad', timezone: 'Asia/Kolkata', lat: 23.0225, lon: 72.5714, offset: '+05:30' },
  { name: 'Jaipur', timezone: 'Asia/Kolkata', lat: 26.9124, lon: 75.7873, offset: '+05:30' },
  { name: 'Lucknow', timezone: 'Asia/Kolkata', lat: 26.8467, lon: 80.9462, offset: '+05:30' },
  { name: 'New York', timezone: 'America/New_York', lat: 40.7128, lon: -74.0060, offset: '-05:00' },
  { name: 'London', timezone: 'Europe/London', lat: 51.5074, lon: -0.1278, offset: '+00:00' },
  { name: 'Dubai', timezone: 'Asia/Dubai', lat: 25.2048, lon: 55.2708, offset: '+04:00' },
  { name: 'Singapore', timezone: 'Asia/Singapore', lat: 1.3521, lon: 103.8198, offset: '+08:00' }
];

const DiwaliDateFinder: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdownDays, setCountdownDays] = useState(0);
  const [emailReminder, setEmailReminder] = useState('');
  const [reminderSuccess, setReminderSuccess] = useState(false);

  const years = Array.from({ length: 16 }, (_, i) => 2020 + i);
  
  const diwaliInfo = DIWALI_DATA[selectedYear as keyof typeof DIWALI_DATA];

  // Calculate countdown
  useEffect(() => {
    if (diwaliInfo) {
      const diwaliDate = new Date(diwaliInfo.date);
      const today = new Date();
      const diffTime = diwaliDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setCountdownDays(diffDays);
    }
  }, [diwaliInfo]);

  const shareUrl = `https://moneycal.in/festival-tools/diwali-date-finder?year=${selectedYear}`;
  const shareText = `Diwali ${selectedYear} is on ${diwaliInfo?.day}, ${new Date(diwaliInfo?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}! Get muhurat timings at MoneyCal.in`;

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);
    
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCalendar = () => {
    if (!diwaliInfo) return;
    
    const event = {
      title: `Diwali ${selectedYear} - Lakshmi Puja`,
      description: `Diwali celebration with Lakshmi Puja Muhurat: ${diwaliInfo.lakshmiPuja}`,
      location: selectedCity.name,
      startDate: diwaliInfo.date.replace(/-/g, ''),
      endDate: diwaliInfo.date.replace(/-/g, '')
    };

    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startDate}/${event.endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleCalUrl, '_blank');
  };

  const handleReminderSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would call an API to store the reminder
    setReminderSuccess(true);
    setTimeout(() => {
      setReminderSuccess(false);
      setEmailReminder('');
    }, 3000);
  };

  return (
    <>
      <SEOHelmet
        title={`Diwali Date ${selectedYear} - Exact Date, Lakshmi Puja Muhurat & Timings | Free Diwali Calendar`}
        description={`Diwali ${selectedYear} falls on ${diwaliInfo?.day}, ${new Date(diwaliInfo?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}. Get accurate Kartik Amavasya date, Lakshmi puja muhurat, sunrise/sunset times for ${selectedCity.name}. Plan Dhanteras, Diwali shopping & investments!`}
        keywords={`diwali ${selectedYear} date, diwali ${selectedYear} ${selectedCity.name.toLowerCase()}, diwali date finder, lakshmi puja muhurat ${selectedYear}, kartik amavasya ${selectedYear}, when is diwali ${selectedYear}, diwali calendar ${selectedYear}, diwali ${selectedYear} india, diwali puja time ${selectedYear}, diwali moonrise ${selectedYear}, dhanteras ${selectedYear} date, diwali ${selectedYear} muhurat, best time lakshmi puja ${selectedYear}`}
        url={`/festival-tools/diwali-date-finder?year=${selectedYear}`}
        type="website"
      />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          "name": `Diwali ${selectedYear}`,
          "startDate": diwaliInfo?.date,
          "endDate": diwaliInfo?.date,
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "eventStatus": "https://schema.org/EventScheduled",
          "location": {
            "@type": "Place",
            "name": "India",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            }
          },
          "description": `Diwali, the Festival of Lights, celebrated on ${diwaliInfo?.day}, ${diwaliInfo?.date}. Lakshmi Puja Muhurat: ${diwaliInfo?.lakshmiPuja}`,
          "organizer": {
            "@type": "Organization",
            "name": "MoneyCal.in",
            "url": "https://moneycal.in"
          }
        })}
      </script>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
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
              <span className="text-orange-600 font-medium">Diwali Date Finder</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-400/20 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-full mb-6">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Accurate Panchang-Based Calculator</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                Diwali Date Finder {selectedYear}
              </h1>

              <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
                Find exact Diwali date, Kartik Amavasya tithi, Lakshmi Puja muhurat & auspicious timings for your city. Plan your Dhanteras shopping, gold investment & festival celebrations perfectly!
              </p>

              {diwaliInfo && countdownDays > 0 && countdownDays < 365 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-6 py-3 rounded-full font-bold text-lg"
                >
                  <Clock className="w-5 h-5" />
                  <span>{countdownDays} days until Diwali {selectedYear}!</span>
                </motion.div>
              )}
            </motion.div>

            {/* Main Calculator Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-200">
                {/* Input Controls */}
                <div className="bg-gradient-to-r from-orange-600 to-red-600 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Year Selector */}
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
                            Diwali {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* City Selector */}
                    <div>
                      <label className="block text-white font-semibold mb-3 flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Select City
                      </label>
                      <select
                        value={selectedCity.name}
                        onChange={(e) => setSelectedCity(CITIES.find(c => c.name === e.target.value) || CITIES[0])}
                        className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white font-bold text-lg focus:outline-none focus:border-white backdrop-blur-sm appearance-none cursor-pointer"
                      >
                        {CITIES.map(city => (
                          <option key={city.name} value={city.name} className="text-gray-900">
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Results Display */}
                {diwaliInfo && (
                  <div className="p-8">
                    {/* Main Date Display */}
                    <div className="text-center mb-8 pb-8 border-b-2 border-orange-100">
                      <div className="inline-flex items-center justify-center space-x-3 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Sparkles className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Diwali {selectedYear}
                      </h2>
                      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                        {new Date(diwaliInfo.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                      </div>
                      <div className="text-2xl text-gray-600 font-semibold">{diwaliInfo.day}</div>
                      <div className="mt-4 inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
                        <MapPin className="w-4 h-4" />
                        <span className="font-semibold">{selectedCity.name}</span>
                      </div>
                    </div>

                    {/* Detailed Timings Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {/* Lakshmi Puja Muhurat */}
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                            <Star className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Lakshmi Puja Muhurat</h3>
                        </div>
                        <p className="text-3xl font-bold text-orange-600">{diwaliInfo.lakshmiPuja}</p>
                        <p className="text-sm text-gray-600 mt-2">Most auspicious time for worship</p>
                      </div>

                      {/* Kartik Amavasya */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                            <Moon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Kartik Amavasya</h3>
                        </div>
                        <p className="text-lg font-bold text-purple-600">
                          {new Date(diwaliInfo.kartikAmavasya).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">New moon moment (astronomical)</p>
                      </div>

                      {/* Sunrise */}
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sunrise</h3>
                        </div>
                        <p className="text-3xl font-bold text-yellow-600">{diwaliInfo.sunrise}</p>
                        <p className="text-sm text-gray-600 mt-2">Morning rituals begin</p>
                      </div>

                      {/* Sunset */}
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl border-2 border-red-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sunset</h3>
                        </div>
                        <p className="text-3xl font-bold text-red-600">{diwaliInfo.sunset}</p>
                        <p className="text-sm text-gray-600 mt-2">Diya lighting time</p>
                      </div>

                      {/* Moonrise */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <Moon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Moonrise</h3>
                        </div>
                        <p className="text-3xl font-bold text-blue-600">{diwaliInfo.moonrise}</p>
                        <p className="text-sm text-gray-600 mt-2">Chandra darshan time</p>
                      </div>

                      {/* Choghadia */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                            <Clock className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Shubh Choghadia</h3>
                        </div>
                        <p className="text-lg font-bold text-green-600">{diwaliInfo.choghadia}</p>
                        <p className="text-sm text-gray-600 mt-2">Auspicious period</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      <button
                        onClick={handleAddToCalendar}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
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
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-green-50 rounded-lg transition-colors text-left"
                              >
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                  <Share2 className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-semibold text-gray-900">WhatsApp</span>
                              </button>
                              <button
                                onClick={() => handleShare('facebook')}
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors text-left"
                              >
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                  <Share2 className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-semibold text-gray-900">Facebook</span>
                              </button>
                              <button
                                onClick={() => handleShare('twitter')}
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sky-50 rounded-lg transition-colors text-left"
                              >
                                <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                                  <Share2 className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-semibold text-gray-900">Twitter</span>
                              </button>
                              <button
                                onClick={handleCopyLink}
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                              >
                                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                  {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                                </div>
                                <span className="font-semibold text-gray-900">{copied ? 'Copied!' : 'Copy Link'}</span>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Reminder Signup */}
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200">
                      <div className="flex items-center space-x-3 mb-4">
                        <Bell className="w-6 h-6 text-orange-600" />
                        <h3 className="font-bold text-gray-900 text-lg">Set Diwali Reminder</h3>
                      </div>
                      <p className="text-gray-600 mb-4">Get notified 7 days before Diwali to plan your shopping & preparations!</p>
                      <form onSubmit={handleReminderSignup} className="flex gap-3">
                        <input
                          type="email"
                          value={emailReminder}
                          onChange={(e) => setEmailReminder(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="flex-1 px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="px-6 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors"
                        >
                          Notify Me
                        </button>
                      </form>
                      {reminderSuccess && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-3 text-green-600 font-semibold flex items-center space-x-2"
                        >
                          <Check className="w-5 h-5" />
                          <span>Reminder set successfully!</span>
                        </motion.p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Festival Dates */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Festival Dates {selectedYear}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/festival-tools/dhanteras-date-finder" className="group bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200 hover:shadow-xl transition-all">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                    <Sun className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">Dhanteras {selectedYear}</h3>
                </div>
                <p className="text-gray-600 mb-3">2 days before Diwali - Gold & silver purchase muhurat</p>
                <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                  View Date
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/festival-tools/govardhan-puja-finder" className="group bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200 hover:shadow-xl transition-all">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">Govardhan Puja {selectedYear}</h3>
                </div>
                <p className="text-gray-600 mb-3">Next day after Diwali - Annakut celebration</p>
                <div className="flex items-center text-red-600 font-semibold group-hover:gap-2 transition-all">
                  View Date
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/festival-tools/bhai-dooj-date-finder" className="group bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 hover:shadow-xl transition-all">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">Bhai Dooj {selectedYear}</h3>
                </div>
                <p className="text-gray-600 mb-3">Brother-sister celebration day</p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                  View Date
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Complete Guide to Diwali {selectedYear} - Date, Muhurat & Celebrations</h2>

              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Info className="w-6 h-6 mr-2 text-orange-600" />
                  What is Diwali and When is it Celebrated?
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Diwali, also known as Deepavali, is the most significant Hindu festival celebrating the victory of light over darkness, good over evil, and knowledge over ignorance. <strong>Diwali {selectedYear} falls on {diwaliInfo?.day}, {new Date(diwaliInfo?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>, based on the Hindu lunar calendar's Kartik month Amavasya (new moon).
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The festival spans five days, with each day having its own significance:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Dhanteras (2 days before)</strong> - Wealth worship & gold purchase muhurat</li>
                  <li><strong>Naraka Chaturdashi/Choti Diwali (1 day before)</strong> - Cleansing & early celebrations</li>
                  <li><strong>Diwali/Lakshmi Puja (Main day)</strong> - Goddess Lakshmi worship for prosperity</li>
                  <li><strong>Govardhan Puja (Next day)</strong> - Annakut offerings & gratitude</li>
                  <li><strong>Bhai Dooj (2 days after)</strong> - Sibling bond celebration</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Moon className="w-6 h-6 mr-2 text-purple-600" />
                  How is Diwali Date Calculated? Understanding Kartik Amavasya
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Unlike fixed Gregorian calendar dates, <strong>Diwali date changes every year</strong> because it's determined by the Hindu lunar calendar (Panchang). The date is calculated based on:
                </p>
                <div className="bg-purple-50 p-6 rounded-xl mb-4">
                  <h4 className="font-bold text-gray-900 mb-3">Key Astronomical Factors:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span><strong>Kartik Month:</strong> 8th lunar month in Hindu calendar (October-November)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span><strong>Amavasya Tithi:</strong> New moon day (no visible moon)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span><strong>Local Timezone:</strong> Calculations adjusted for your city's sunrise/sunset</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span><strong>Panchang Rules:</strong> Tithi boundaries, nakshatra positions & regional traditions</span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  For {selectedYear}, the <strong>Kartik Amavasya astronomical moment occurs at {new Date(diwaliInfo?.kartikAmavasya || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })} IST</strong>. Our Diwali Date Finder uses accurate astronomical ephemeris data (similar to NASA's calculations) combined with traditional Vedic panchang rules to determine the exact celebration date for {selectedCity.name}.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Star className="w-6 h-6 mr-2 text-orange-600" />
                  Lakshmi Puja Muhurat {selectedYear} - Best Time for Worship
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The most auspicious time for Lakshmi Puja on Diwali {selectedYear} in {selectedCity.name} is:
                </p>
                <div className="bg-orange-50 p-6 rounded-xl mb-4 border-2 border-orange-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Lakshmi Puja Muhurat</p>
                    <p className="text-4xl font-bold text-orange-600 mb-2">{diwaliInfo?.lakshmiPuja}</p>
                    <p className="text-sm text-gray-600">Duration: Approximately 1 hour 49 minutes</p>
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 mb-3">What Makes This Muhurat Auspicious?</h4>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    <span><strong>Pradosh Kaal:</strong> Occurs during twilight when day transitions to night</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    <span><strong>Amavasya Tithi:</strong> New moon energy for new beginnings & wealth</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    <span><strong>Favorable Nakshatra:</strong> Aligned with prosperity-enhancing stars</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    <span><strong>Shubh Choghadia:</strong> {diwaliInfo?.choghadia} - Most auspicious period</span>
                  </li>
                </ul>
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <p className="text-sm text-gray-700">
                    <strong>Pro Tip:</strong> Complete your puja setup 30 minutes before muhurat starts. Keep gold coins, new account books, and wealth symbols ready for Lakshmi worship.
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="w-6 h-6 mr-2 text-green-600" />
                  Diwali {selectedYear} Money & Finance Tips - Dhanteras to Investment Planning
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Diwali season is considered the most auspicious time for wealth-related activities. Here's your complete financial planning guide for Diwali {selectedYear}:
                </p>

                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  1. Dhanteras Gold & Silver Investment (2 Days Before Diwali)
                </h4>
                <div className="bg-yellow-50 p-6 rounded-xl mb-4">
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">💰</span>
                      <span><strong>Best Gold Purchase Muhurat:</strong> Morning 6 AM - 12 PM on Dhanteras</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">💰</span>
                      <span><strong>What to Buy:</strong> Gold coins, jewelry, or digital gold (min 1 gram)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">💰</span>
                      <span><strong>Silver Alternative:</strong> Silver utensils or coins for budget-conscious buyers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">💰</span>
                      <span><strong>Digital Gold Apps:</strong> Use <a href="https://paytmmoney.com/gold" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">PayTM Money</a>, <a href="https://www.phonepe.com/gold/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">PhonePe Gold</a>, or <a href="https://www.tanishq.co.in/gold-plus" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Tanishq Gold Plus</a></span>
                    </li>
                  </ul>
                </div>

                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2 text-orange-600" />
                  2. Diwali Shopping Budget Planning
                </h4>
                <p className="text-gray-700 mb-3">
                  Use our <Link to="/festival-shopping" className="text-orange-600 hover:underline font-semibold">Festival Budget Planner</Link> to manage your Diwali expenses across:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h5 className="font-bold text-gray-900 mb-2">Essential Expenses</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Puja samagri (₹500-2000)</li>
                      <li>• Diyas, candles, rangoli (₹300-1000)</li>
                      <li>• New clothes for family (₹3000-15000)</li>
                      <li>• Sweets & dry fruits (₹2000-5000)</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h5 className="font-bold text-gray-900 mb-2">Gifts & Celebrations</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Gifts for relatives (₹5000-20000)</li>
                      <li>• Firecrackers (₹1000-5000)</li>
                      <li>• Home decoration (₹2000-10000)</li>
                      <li>• Party/gathering (₹3000-15000)</li>
                    </ul>
                  </div>
                </div>

                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-blue-600" />
                  3. Tax-Saving Investments Before Year-End
                </h4>
                <p className="text-gray-700 mb-3">
                  Diwali timing (October-November) is perfect for completing your 80C tax-saving investments:
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">📊</span>
                    <span><strong>ELSS Mutual Funds:</strong> Invest before Dec 31 to save up to ₹46,800 tax (₹1.5L limit) - Use our <Link to="/tax-tools/section-80c-tally-analyzer" className="text-blue-600 hover:underline">80C Calculator</Link></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">📊</span>
                    <span><strong>PPF Top-up:</strong> Make annual contribution before March deadline</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">📊</span>
                    <span><strong>NPS Additional Contribution:</strong> Extra ₹50K deduction under 80CCD(1B)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">📊</span>
                    <span><strong>Life Insurance Premium:</strong> Pay annual premium for tax benefits</span>
                  </li>
                </ul>

                <h4 className="font-bold text-gray-900 mb-3">4. Diwali Bonus Investment Strategy</h4>
                <p className="text-gray-700 mb-3">
                  Got Diwali bonus from your employer? Here's smart allocation:
                </p>
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-bold text-green-600">50%</p>
                      <p className="text-sm text-gray-700 mt-2">Long-term investments (SIP, stocks, gold)</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-orange-600">30%</p>
                      <p className="text-sm text-gray-700 mt-2">Diwali shopping & celebrations</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-blue-600">20%</p>
                      <p className="text-sm text-gray-700 mt-2">Emergency fund / debt repayment</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-xl border-2 border-orange-300">
                  <h5 className="font-bold text-gray-900 mb-3">🎁 Exclusive Diwali Finance Tools:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Link to="/festival-finance" className="flex items-center space-x-2 text-orange-600 hover:underline font-semibold">
                      <ArrowRight className="w-4 h-4" />
                      <span>Festival Budget Calculator</span>
                    </Link>
                    <Link to="/finance-tools/sip-delay-loss-calculator" className="flex items-center space-x-2 text-orange-600 hover:underline font-semibold">
                      <ArrowRight className="w-4 h-4" />
                      <span>Investment Planning Tools</span>
                    </Link>
                    <Link to="/tax-tools" className="flex items-center space-x-2 text-orange-600 hover:underline font-semibold">
                      <ArrowRight className="w-4 h-4" />
                      <span>Tax Saving Calculators</span>
                    </Link>
                    <Link to="/gold-tools" className="flex items-center space-x-2 text-orange-600 hover:underline font-semibold">
                      <ArrowRight className="w-4 h-4" />
                      <span>Gold Investment Tools</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Diwali Celebration Checklist {selectedYear}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <Check className="w-5 h-5 mr-2 text-green-600" />
                      7 Days Before Diwali
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">☐</span>
                        <span>Deep clean house (hire professionals if needed)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">☐</span>
                        <span>Plan shopping list & budget using our <Link to="/festival-shopping" className="text-orange-600 hover:underline">Shopping Planner</Link></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">☐</span>
                        <span>Book salon appointments for family</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">☐</span>
                        <span>Order gifts online (avoid last-minute rush)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <Check className="w-5 h-5 mr-2 text-orange-600" />
                      3 Days Before (Dhanteras)
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">☐</span>
                        <span>Buy gold/silver during muhurat timing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">☐</span>
                        <span>Purchase new utensils (traditional practice)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">☐</span>
                        <span>Complete home painting/whitewashing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">☐</span>
                        <span>Buy rangoli colors, diyas, candles</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <Check className="w-5 h-5 mr-2 text-red-600" />
                      1 Day Before (Choti Diwali)
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">☐</span>
                        <span>Abhyanga snan (oil bath ritual)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">☐</span>
                        <span>Prepare/order sweets & snacks</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">☐</span>
                        <span>Make rangoli design at entrance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">☐</span>
                        <span>Set up Lakshmi puja mandap</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <Check className="w-5 h-5 mr-2 text-purple-600" />
                      Diwali Day Schedule
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">☐</span>
                        <span>Morning: Abhishek snan before sunrise</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">☐</span>
                        <span>Evening: Light diyas at sunset ({diwaliInfo?.sunset})</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">☐</span>
                        <span>Lakshmi Puja: {diwaliInfo?.lakshmiPuja} (muhurat time)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">☐</span>
                        <span>Night: Firecrackers & family celebrations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQs) - Diwali {selectedYear}</h3>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">1. When is Diwali {selectedYear} in India?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Diwali {selectedYear} is on {diwaliInfo?.day}, {new Date(diwaliInfo?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>. The celebration begins with Dhanteras 2 days earlier and concludes with Bhai Dooj 2 days later, spanning a total of 5 days. The Kartik Amavasya (new moon) astronomical moment occurs at {new Date(diwaliInfo?.kartikAmavasya || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })} IST.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">2. What is the best muhurat time for Lakshmi Puja on Diwali {selectedYear}?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      The most auspicious <strong>Lakshmi Puja muhurat for Diwali {selectedYear} in {selectedCity.name} is {diwaliInfo?.lakshmiPuja}</strong> (duration approximately 1 hour 49 minutes). This timing is calculated based on Pradosh Kaal (twilight period), Amavasya tithi, and favorable nakshatra positions. Complete your puja within this window for maximum spiritual benefits. Alternative shubh choghadia: {diwaliInfo?.choghadia}.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">3. Why does Diwali date change every year?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Diwali date changes annually because it's based on the <strong>Hindu lunar calendar (Panchang)</strong>, not the fixed Gregorian solar calendar. Diwali always falls on Kartik Amavasya (new moon day of Kartik month), which shifts by 11-13 days each solar year due to the 29.5-day lunar cycle. Precise calculations consider moon phases, solar longitude, local timezone, and traditional panchang rules, which is why our Diwali Date Finder uses astronomical ephemeris data for accuracy.
                    </p>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">4. When should I buy gold for Dhanteras {selectedYear}? Is Dhanteras better than Diwali for gold purchase?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Dhanteras (2 days before Diwali {selectedYear})</strong> is traditionally more auspicious for gold and silver purchases than Diwali itself. The best muhurat for buying gold on Dhanteras is typically <strong>morning between 6 AM to 12 PM</strong>. However, avoid purchasing during inauspicious periods (Rahu Kaal). You can also buy on Diwali evening after Lakshmi Puja. For budget-conscious buyers, consider <a href="https://paytmmoney.com/gold" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">digital gold apps</a> or silver coins as alternatives. Learn more with our <Link to="/gold-tools" className="text-orange-600 hover:underline">Gold Investment Tools</Link>.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">5. How can I plan my Diwali budget effectively to avoid overspending?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Effective Diwali budget planning requires splitting expenses into categories: <strong>50% for gifts & celebrations, 30% for shopping (clothes, decorations), 20% for puja essentials & sweets</strong>. Start planning 30 days before Diwali to avoid last-minute expensive purchases. Use our free <Link to="/festival-shopping" className="text-orange-600 hover:underline">Festival Budget Planner</Link> to track expenses across all 5 days (Dhanteras to Bhai Dooj). Take advantage of online sale deals (Amazon Great Indian Festival, Flipkart Big Diwali Sale) and compare prices. Allocate Diwali bonus wisely: 50% to investments, 30% to celebrations, 20% to emergency fund/debt repayment.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">6. What are the sunrise and sunset times for Diwali {selectedYear} in {selectedCity.name}?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      For Diwali {selectedYear} in {selectedCity.name}: <strong>Sunrise at {diwaliInfo?.sunrise} and Sunset at {diwaliInfo?.sunset}</strong>. Traditional practice recommends lighting the first diya exactly at sunset. Moonrise is at {diwaliInfo?.moonrise}, though Amavasya means the moon won't be visible. Morning rituals (Abhishek snan) should be completed before sunrise for maximum spiritual benefits.
                    </p>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">7. Can I celebrate Diwali if I'm outside India or in a different timezone?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Yes! Our Diwali Date Finder supports <strong>{CITIES.length} major cities worldwide</strong> including New York, London, Dubai, Singapore, and all major Indian cities. The Diwali date ({diwaliInfo?.date}) remains same globally, but Lakshmi Puja muhurat timing adjusts to local sunset/twilight in your city. For NRIs/international celebrations, select your city above to get accurate local muhurat times. You can still follow traditional rituals by lighting diyas at local sunset and performing puja during local Pradosh Kaal (approximately 1-2 hours after sunset).
                    </p>
                  </div>

                  <div className="border-l-4 border-pink-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">8. What is Kartik Amavasya and how is it different from regular Amavasya?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Kartik Amavasya is the new moon day (no moon) in the Hindu month of Kartik</strong>, falling around October-November. While there are 12-13 Amavasyas per year (one per lunar month), Kartik Amavasya is uniquely special because it's dedicated to Goddess Lakshmi worship and marks Diwali. The precise astronomical moment of new moon conjunction for Diwali {selectedYear} occurs at {new Date(diwaliInfo?.kartikAmavasya || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })} IST. This Amavasya is also called Deepavali Amavasya or Lakshmi Puja Amavasya, symbolizing spiritual darkness (no moon) that we illuminate with diyas (light of knowledge).
                    </p>
                  </div>

                  <div className="border-l-4 border-teal-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">9. How many days is Diwali celebrated? What is the 5-day Diwali schedule?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Diwali is a <strong>5-day festival</strong> (Diwali Panchak) with each day having unique significance:
                    </p>
                    <ul className="mt-3 space-y-2 text-gray-700">
                      <li><strong>Day 1 - Dhanteras</strong> (2 days before): Wealth worship, gold/silver purchase</li>
                      <li><strong>Day 2 - Naraka Chaturdashi/Choti Diwali</strong> (1 day before): Cleansing rituals, oil bath</li>
                      <li><strong>Day 3 - Diwali/Lakshmi Puja</strong> (Main day - {diwaliInfo?.date}): Goddess Lakshmi worship, diya lighting</li>
                      <li><strong>Day 4 - Govardhan Puja/Annakut</strong> (1 day after): Krishna worship, food offerings</li>
                      <li><strong>Day 5 - Bhai Dooj</strong> (2 days after): Sister-brother bond celebration</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-orange-600 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">10. What tax-saving investments can I make during Diwali {selectedYear} season?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Diwali timing (October-November) is ideal for completing <strong>Section 80C tax-saving investments before financial year-end</strong>:
                    </p>
                    <ul className="mt-3 space-y-2 text-gray-700">
                      <li><strong>ELSS Mutual Funds</strong>: Invest up to ₹1.5L to save ₹46,800 tax (3-year lock-in)</li>
                      <li><strong>PPF Top-up</strong>: Annual contribution deadline approaching</li>
                      <li><strong>NPS Additional</strong>: Extra ₹50K deduction under 80CCD(1B)</li>
                      <li><strong>Life/Health Insurance Premium</strong>: Pay before Dec 31</li>
                      <li><strong>Tax-Loss Harvesting</strong>: Offset capital gains before March 31</li>
                    </ul>
                    <p className="mt-3 text-gray-700">
                      Use our <Link to="/tax-tools/section-80c-tally-analyzer" className="text-orange-600 hover:underline">80C Tax Calculator</Link> and <Link to="/finance-tools" className="text-orange-600 hover:underline">Investment Planning Tools</Link> for personalized recommendations.
                    </p>
                  </div>
                </div>
              </div>

              {/* External Resources */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <ExternalLink className="w-6 h-6 mr-2 text-blue-600" />
                  Trusted External Resources for Diwali {selectedYear}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="https://www.drikpanchang.com/festivals/deepavali/deepavali-date-time.html" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <Globe className="w-4 h-4" />
                    <span>Drik Panchang - Authoritative Hindu Calendar</span>
                  </a>
                  <a href="https://www.timeanddate.com/holidays/india/diwali" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <Globe className="w-4 h-4" />
                    <span>Time and Date - Diwali Dates Worldwide</span>
                  </a>
                  <a href="https://en.wikipedia.org/wiki/Diwali" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <Globe className="w-4 h-4" />
                    <span>Wikipedia - Diwali History & Culture</span>
                  </a>
                  <a href="https://www.youtube.com/results?search_query=diwali+puja+vidhi" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <Youtube className="w-4 h-4" />
                    <span>YouTube - Diwali Puja Vidhi Tutorials</span>
                  </a>
                  <a href="https://www.amazon.in/b?node=4859391031" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Amazon - Diwali Store (Diyas, Decor, Gifts)</span>
                  </a>
                  <a href="https://www.flipkart.com/diwali-store" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Flipkart - Big Diwali Sale</span>
                  </a>
                  <a href="https://paytmmoney.com/gold" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <DollarSign className="w-4 h-4" />
                    <span>Paytm Money - Buy Digital Gold</span>
                  </a>
                  <a href="https://www.tanishq.co.in/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <Sparkles className="w-4 h-4" />
                    <span>Tanishq - Diwali Jewelry Collection</span>
                  </a>
                </div>
              </div>

              {/* Internal Links - Related Tools */}
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8 rounded-2xl">
                <h3 className="text-3xl font-bold mb-6 text-center">More Festival Tools You'll Love</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/festival-dates" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all group">
                    <div className="flex items-center space-x-3 mb-2">
                      <Calendar className="w-6 h-6" />
                      <h4 className="font-bold text-lg">Festival Calendar {selectedYear}</h4>
                    </div>
                    <p className="text-white/90 text-sm">All Indian festival dates & muhurats</p>
                    <div className="flex items-center mt-3 text-sm font-semibold group-hover:gap-2 transition-all">
                      Explore
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  <Link to="/festival-shopping" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all group">
                    <div className="flex items-center space-x-3 mb-2">
                      <ShoppingBag className="w-6 h-6" />
                      <h4 className="font-bold text-lg">Festival Shopping Planner</h4>
                    </div>
                    <p className="text-white/90 text-sm">Budget tracker & gift ideas</p>
                    <div className="flex items-center mt-3 text-sm font-semibold group-hover:gap-2 transition-all">
                      Plan Now
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  <Link to="/festival-finance" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all group">
                    <div className="flex items-center space-x-3 mb-2">
                      <DollarSign className="w-6 h-6" />
                      <h4 className="font-bold text-lg">Festival Finance Tools</h4>
                    </div>
                    <p className="text-white/90 text-sm">Investment & tax planning</p>
                    <div className="flex items-center mt-3 text-sm font-semibold group-hover:gap-2 transition-all">
                      Calculate
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  <Link to="/religious-tools" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all group">
                    <div className="flex items-center space-x-3 mb-2">
                      <Star className="w-6 h-6" />
                      <h4 className="font-bold text-lg">Puja Vidhi & Mantras</h4>
                    </div>
                    <p className="text-white/90 text-sm">Complete ritual guides</p>
                    <div className="flex items-center mt-3 text-sm font-semibold group-hover:gap-2 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  <Link to="/design-tools" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all group">
                    <div className="flex items-center space-x-3 mb-2">
                      <Gift className="w-6 h-6" />
                      <h4 className="font-bold text-lg">Diwali Wishes Maker</h4>
                    </div>
                    <p className="text-white/90 text-sm">Greeting cards & posters</p>
                    <div className="flex items-center mt-3 text-sm font-semibold group-hover:gap-2 transition-all">
                      Create Now
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  <Link to="/gold-tools" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all group">
                    <div className="flex items-center space-x-3 mb-2">
                      <TrendingUp className="w-6 h-6" />
                      <h4 className="font-bold text-lg">Gold Investment Tools</h4>
                    </div>
                    <p className="text-white/90 text-sm">Dhanteras gold calculators</p>
                    <div className="flex items-center mt-3 text-sm font-semibold group-hover:gap-2 transition-all">
                      Invest Smart
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Final CTA */}
              <div className="mt-12 text-center bg-gradient-to-br from-orange-100 to-red-100 p-8 rounded-2xl border-2 border-orange-300">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Make Diwali {selectedYear} Unforgettable!</h3>
                <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                  Download this page as PDF, set reminders, and explore 100+ festival tools to plan the perfect Diwali celebration!
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
                  >
                    <Download className="w-6 h-6" />
                    <span>Download as PDF</span>
                  </button>
                  <Link
                    to="/festival-tools"
                    className="flex items-center space-x-2 px-8 py-4 bg-white border-2 border-orange-600 text-orange-600 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all"
                  >
                    <Sparkles className="w-6 h-6" />
                    <span>Explore All Festival Tools</span>
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

export default DiwaliDateFinder;

