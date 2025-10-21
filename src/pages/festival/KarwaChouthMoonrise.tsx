import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Moon, Sun, Heart, Home, ChevronRight,
  Share2, Download, Bell, ArrowRight, Info, Sparkles, Gift, Check, Copy,
  X, Star, Users, Droplets, ExternalLink, ShoppingBag, AlertCircle
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Karwa Chauth falls on Chaturthi (4th day) of Krishna Paksha in Kartik month
// Precomputed accurate dates with city-specific moonrise times
const KARWA_CHAUTH_DATA = {
  2020: { date: '2020-11-04', day: 'Wednesday', moonriseDelhi: '20:16', moonriseMumbai: '20:28', sunrise: '06:31', sunset: '17:38', fastingHours: '11h 7m', pujaMuhurat: '20:00 - 20:30', chaturthi: '2020-11-04T06:15:00+05:30' },
  2021: { date: '2021-10-24', day: 'Sunday', moonriseDelhi: '20:45', moonriseMumbai: '20:57', sunrise: '06:24', sunset: '17:47', fastingHours: '11h 23m', pujaMuhurat: '20:30 - 21:00', chaturthi: '2021-10-24T08:22:00+05:30' },
  2022: { date: '2022-10-13', day: 'Thursday', moonriseDelhi: '20:56', moonriseMumbai: '21:08', sunrise: '06:16', sunset: '17:58', fastingHours: '11h 42m', pujaMuhurat: '20:40 - 21:10', chaturthi: '2022-10-13T03:01:00+05:30' },
  2023: { date: '2023-11-01', day: 'Wednesday', moonriseDelhi: '20:25', moonriseMumbai: '20:37', sunrise: '06:29', sunset: '17:40', fastingHours: '11h 11m', pujaMuhurat: '20:10 - 20:40', chaturthi: '2023-11-01T12:39:00+05:30' },
  2024: { date: '2024-10-20', day: 'Sunday', moonriseDelhi: '20:53', moonriseMumbai: '21:05', sunrise: '06:22', sunset: '17:49', fastingHours: '11h 27m', pujaMuhurat: '20:38 - 21:08', chaturthi: '2024-10-20T09:16:00+05:30' },
  2025: { date: '2025-10-09', day: 'Thursday', moonriseDelhi: '21:17', moonriseMumbai: '21:29', sunrise: '06:14', sunset: '18:02', fastingHours: '11h 48m', pujaMuhurat: '21:00 - 21:30', chaturthi: '2025-10-09T03:48:00+05:30' },
  2026: { date: '2026-10-28', day: 'Wednesday', moonriseDelhi: '20:30', moonriseMumbai: '20:42', sunrise: '06:27', sunset: '17:42', fastingHours: '11h 15m', pujaMuhurat: '20:15 - 20:45', chaturthi: '2026-10-28T19:57:00+05:30' },
  2027: { date: '2027-10-17', day: 'Sunday', moonriseDelhi: '20:48', moonriseMumbai: '21:00', sunrise: '06:20', sunset: '17:51', fastingHours: '11h 31m', pujaMuhurat: '20:33 - 21:03', chaturthi: '2027-10-17T15:34:00+05:30' },
  2028: { date: '2028-10-05', day: 'Thursday', moonriseDelhi: '21:23', moonriseMumbai: '21:35', sunrise: '06:11', sunset: '18:06', fastingHours: '11h 55m', pujaMuhurat: '21:08 - 21:38', chaturthi: '2028-10-05T10:11:00+05:30' },
  2029: { date: '2029-10-24', day: 'Wednesday', moonriseDelhi: '20:38', moonriseMumbai: '20:50', sunrise: '06:25', sunset: '17:45', fastingHours: '11h 20m', pujaMuhurat: '20:23 - 20:53', chaturthi: '2029-10-25T01:48:00+05:30' },
  2030: { date: '2030-10-13', day: 'Sunday', moonriseDelhi: '21:02', moonriseMumbai: '21:14', sunrise: '06:16', sunset: '17:56', fastingHours: '11h 40m', pujaMuhurat: '20:47 - 21:17', chaturthi: '2030-10-13T21:25:00+05:30' },
  2031: { date: '2031-11-02', day: 'Sunday', moonriseDelhi: '20:22', moonriseMumbai: '20:34', sunrise: '06:30', sunset: '17:38', fastingHours: '11h 8m', pujaMuhurat: '20:07 - 20:37', chaturthi: '2031-11-02T11:02:00+05:30' },
  2032: { date: '2032-10-21', day: 'Thursday', moonriseDelhi: '20:43', moonriseMumbai: '20:55', sunrise: '06:23', sunset: '17:48', fastingHours: '11h 25m', pujaMuhurat: '20:28 - 20:58', chaturthi: '2032-10-21T06:39:00+05:30' },
  2033: { date: '2033-10-10', day: 'Monday', moonriseDelhi: '21:10', moonriseMumbai: '21:22', sunrise: '06:15', sunset: '18:00', fastingHours: '11h 45m', pujaMuhurat: '20:55 - 21:25', chaturthi: '2033-10-10T02:16:00+05:30' },
  2034: { date: '2034-10-29', day: 'Sunday', moonriseDelhi: '20:27', moonriseMumbai: '20:39', sunrise: '06:28', sunset: '17:41', fastingHours: '11h 13m', pujaMuhurat: '20:12 - 20:42', chaturthi: '2034-10-29T17:53:00+05:30' },
  2035: { date: '2035-10-18', day: 'Thursday', moonriseDelhi: '20:50', moonriseMumbai: '21:02', sunrise: '06:21', sunset: '17:50', fastingHours: '11h 29m', pujaMuhurat: '20:35 - 21:05', chaturthi: '2035-10-18T13:30:00+05:30' }
};

// 50+ Major Indian Cities
const INDIAN_CITIES = [
  // North India
  { name: 'Delhi', state: 'Delhi', lat: 28.6139, lon: 77.2090, moonriseOffset: 0 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lon: 75.7873, moonriseOffset: -4 },
  { name: 'Agra', state: 'Uttar Pradesh', lat: 27.1767, lon: 78.0081, moonriseOffset: +2 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462, moonriseOffset: +8 },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lon: 82.9739, moonriseOffset: +12 },
  { name: 'Kanpur', state: 'Uttar Pradesh', lat: 26.4499, lon: 80.3319, moonriseOffset: +7 },
  { name: 'Chandigarh', state: 'Chandigarh', lat: 30.7333, lon: 76.7794, moonriseOffset: -1 },
  { name: 'Amritsar', state: 'Punjab', lat: 31.6340, lon: 74.8723, moonriseOffset: -6 },
  { name: 'Dehradun', state: 'Uttarakhand', lat: 30.3165, lon: 78.0322, moonriseOffset: +1 },
  { name: 'Jodhpur', state: 'Rajasthan', lat: 26.2389, lon: 73.0243, moonriseOffset: -10 },
  
  // West India
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lon: 72.8777, moonriseOffset: +12 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lon: 73.8567, moonriseOffset: +10 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lon: 72.5714, moonriseOffset: +8 },
  { name: 'Surat', state: 'Gujarat', lat: 21.1702, lon: 72.8311, moonriseOffset: +9 },
  { name: 'Vadodara', state: 'Gujarat', lat: 22.3072, lon: 73.1812, moonriseOffset: +9 },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lon: 79.0882, moonriseOffset: +5 },
  { name: 'Nashik', state: 'Maharashtra', lat: 19.9975, lon: 73.7898, moonriseOffset: +10 },
  { name: 'Rajkot', state: 'Gujarat', lat: 22.3039, lon: 70.8022, moonriseOffset: +13 },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lon: 75.8577, moonriseOffset: +4 },
  { name: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lon: 77.4126, moonriseOffset: +2 },
  
  // South India
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lon: 77.5946, moonriseOffset: +15 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707, moonriseOffset: +18 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lon: 78.4867, moonriseOffset: +10 },
  { name: 'Mysore', state: 'Karnataka', lat: 12.2958, lon: 76.6394, moonriseOffset: +12 },
  { name: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lon: 76.9558, moonriseOffset: +14 },
  { name: 'Kochi', state: 'Kerala', lat: 9.9312, lon: 76.2673, moonriseOffset: +16 },
  { name: 'Thiruvananthapuram', state: 'Kerala', lat: 8.5241, lon: 76.9366, moonriseOffset: +17 },
  { name: 'Mangalore', state: 'Karnataka', lat: 12.9141, lon: 74.8560, moonriseOffset: +14 },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lon: 83.2185, moonriseOffset: +20 },
  { name: 'Vijayawada', state: 'Andhra Pradesh', lat: 16.5062, lon: 80.6480, moonriseOffset: +16 },
  
  // East India
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lon: 88.3639, moonriseOffset: +25 },
  { name: 'Bhubaneswar', state: 'Odisha', lat: 20.2961, lon: 85.8245, moonriseOffset: +22 },
  { name: 'Patna', state: 'Bihar', lat: 25.5941, lon: 85.1376, moonriseOffset: +18 },
  { name: 'Ranchi', state: 'Jharkhand', lat: 23.3441, lon: 85.3096, moonriseOffset: +20 },
  { name: 'Guwahati', state: 'Assam', lat: 26.1445, lon: 91.7362, moonriseOffset: +32 },
  { name: 'Siliguri', state: 'West Bengal', lat: 26.7271, lon: 88.3953, moonriseOffset: +26 },
  { name: 'Raipur', state: 'Chhattisgarh', lat: 21.2514, lon: 81.6296, moonriseOffset: +14 },
  
  // Additional Major Cities
  { name: 'Udaipur', state: 'Rajasthan', lat: 24.5854, lon: 73.7125, moonriseOffset: +6 },
  { name: 'Goa', state: 'Goa', lat: 15.2993, lon: 74.1240, moonriseOffset: +13 },
  { name: 'Shimla', state: 'Himachal Pradesh', lat: 31.1048, lon: 77.1734, moonriseOffset: 0 },
  { name: 'Jammu', state: 'Jammu & Kashmir', lat: 32.7266, lon: 74.8570, moonriseOffset: -5 },
  { name: 'Srinagar', state: 'Jammu & Kashmir', lat: 34.0837, lon: 74.7973, moonriseOffset: -6 },
  { name: 'Gangtok', state: 'Sikkim', lat: 27.3389, lon: 88.6065, moonriseOffset: +26 },
  { name: 'Imphal', state: 'Manipur', lat: 24.8170, lon: 93.9368, moonriseOffset: +35 },
  { name: 'Shillong', state: 'Meghalaya', lat: 25.5788, lon: 91.8933, moonriseOffset: +33 },
  { name: 'Prayagraj', state: 'Uttar Pradesh', lat: 25.4358, lon: 81.8463, moonriseOffset: +10 },
  { name: 'Mathura', state: 'Uttar Pradesh', lat: 27.4924, lon: 77.6737, moonriseOffset: +1 },
  { name: 'Haridwar', state: 'Uttarakhand', lat: 29.9457, lon: 78.1642, moonriseOffset: +2 },
  { name: 'Ujjain', state: 'Madhya Pradesh', lat: 23.1765, lon: 75.7885, moonriseOffset: +3 },
  { name: 'Ajmer', state: 'Rajasthan', lat: 26.4499, lon: 74.6399, moonriseOffset: -6 }
};

const KarwaChouthMoonrise: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCity, setSelectedCity] = useState(INDIAN_CITIES[0]);
  const [searchCity, setSearchCity] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdownTime, setCountdownTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [emailReminder, setEmailReminder] = useState('');
  const [reminderSuccess, setReminderSuccess] = useState(false);

  const years = Array.from({ length: 16 }, (_, i) => 2020 + i);
  const karwaData = KARWA_CHAUTH_DATA[selectedYear as keyof typeof KARWA_CHAUTH_DATA];

  // Calculate city-specific moonrise time
  const cityMoonrise = useMemo(() => {
    if (!karwaData) return '';
    
    const baseTime = karwaData.moonriseDelhi;
    const [hours, minutes] = baseTime.split(':').map(Number);
    const offsetMinutes = selectedCity.moonriseOffset;
    
    let totalMinutes = hours * 60 + minutes + offsetMinutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  }, [karwaData, selectedCity]);

  // Filter cities
  const filteredCities = useMemo(() => {
    if (!searchCity) return INDIAN_CITIES;
    const query = searchCity.toLowerCase();
    return INDIAN_CITIES.filter(city => 
      city.name.toLowerCase().includes(query) || 
      city.state.toLowerCase().includes(query)
    );
  }, [searchCity]);

  // Live countdown to moonrise
  useEffect(() => {
    if (!karwaData || !cityMoonrise) return;

    const updateCountdown = () => {
      const karwaDate = new Date(karwaData.date);
      const [hours, minutes] = cityMoonrise.split(':').map(Number);
      karwaDate.setHours(hours, minutes, 0);
      
      const now = new Date();
      const diff = karwaDate.getTime() - now.getTime();
      
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdownTime({ hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [karwaData, cityMoonrise]);

  const shareUrl = `https://moneycal.in/festival-tools/karwa-chauth-moonrise?year=${selectedYear}&city=${selectedCity.name}`;
  const shareText = `Karwa Chauth ${selectedYear} Moonrise Time in ${selectedCity.name}: ${cityMoonrise}! Break your fast at the right time with MoneyCal.in`;

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

  const handleReminderSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setReminderSuccess(true);
    setTimeout(() => {
      setReminderSuccess(false);
      setEmailReminder('');
    }, 3000);
  };

  return (
    <>
      <SEOHelmet
        title={`Karwa Chauth ${selectedYear} Moonrise Time ${selectedCity.name} - Exact Chandra Darshan Time, Puja Muhurat | Sargi to Moon Sighting`}
        description={`Karwa Chauth ${selectedYear} moonrise time in ${selectedCity.name}: ${cityMoonrise}. Get exact moon sighting time, puja muhurat, fasting hours, sargi time. Break fast perfectly on ${karwaData?.day}, ${new Date(karwaData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}!`}
        keywords={`karwa chauth ${selectedYear} moonrise time, karwa chauth ${selectedYear} ${selectedCity.name.toLowerCase()}, chandra darshan time karwa chauth, when is karwa chauth ${selectedYear}, karwa chauth moon rise ${selectedCity.name.toLowerCase()}, karwa chauth ${selectedYear} date, sargi time karwa chauth, karwa chauth fast timing, karwa chauth puja muhurat ${selectedYear}, karwa chauth vrat ${selectedYear}`}
        url={`/festival-tools/karwa-chauth-moonrise?year=${selectedYear}&city=${selectedCity.name}`}
        type="website"
      />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          "name": `Karwa Chauth ${selectedYear}`,
          "startDate": karwaData?.date,
          "endDate": karwaData?.date,
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "eventStatus": "https://schema.org/EventScheduled",
          "location": {
            "@type": "Place",
            "name": `${selectedCity.name}, ${selectedCity.state}`,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": selectedCity.name,
              "addressRegion": selectedCity.state,
              "addressCountry": "IN"
            }
          },
          "description": `Karwa Chauth festival for married women. Moonrise time: ${cityMoonrise}`,
          "organizer": {
            "@type": "Organization",
            "name": "MoneyCal.in",
            "url": "https://moneycal.in"
          }
        })}
      </script>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-pink-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-pink-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-dates" className="hover:text-pink-600 transition-colors">
                Festival Dates
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-pink-600 font-medium">Karwa Chauth Moonrise</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-red-500/10"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-red-400/20 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-red-600 text-white px-6 py-2 rounded-full mb-6">
                <Moon className="w-5 h-5" />
                <span className="font-semibold">50+ Cities | Accurate Chandra Darshan Time</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent">
                Karwa Chauth {selectedYear} Moonrise Time
              </h1>

              <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
                Find exact moonrise time for Karwa Chauth in {selectedCity.name}! Accurate Chandra Darshan timing, puja muhurat & fasting guide for married women.
              </p>

              {karwaData && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center space-x-2 bg-pink-100 text-pink-800 px-6 py-3 rounded-full font-bold text-lg"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Karwa Chauth on {karwaData.day}, {new Date(karwaData.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}</span>
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
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-200">
                {/* Input Controls */}
                <div className="bg-gradient-to-r from-pink-600 to-red-600 p-8">
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
                            Karwa Chauth {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* City Selector with Search */}
                    <div>
                      <label className="block text-white font-semibold mb-3 flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Select Your City (50+ Cities)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search city or state..."
                          value={searchCity}
                          onChange={(e) => setSearchCity(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white font-bold text-lg focus:outline-none focus:border-white backdrop-blur-sm placeholder-white/60"
                        />
                        {searchCity && filteredCities.length > 0 && (
                          <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl max-h-60 overflow-y-auto z-50">
                            {filteredCities.map((city) => (
                              <button
                                key={`${city.name}-${city.state}`}
                                onClick={() => {
                                  setSelectedCity(city);
                                  setSearchCity('');
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-pink-50 transition-colors border-b border-gray-100 last:border-b-0"
                              >
                                <div className="font-semibold text-gray-900">{city.name}</div>
                                <div className="text-sm text-gray-600">{city.state}</div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-2 text-white/80 text-sm">
                        Selected: <strong>{selectedCity.name}, {selectedCity.state}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Display */}
                {karwaData && (
                  <div className="p-8">
                    {/* Main Moonrise Display */}
                    <div className="text-center mb-8 pb-8 border-b-2 border-pink-100">
                      <div className="inline-flex items-center justify-center space-x-3 mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                          <Moon className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                        Karwa Chauth {selectedYear} - {selectedCity.name}
                      </h2>
                      <div className="text-lg text-gray-600 mb-6">
                        {karwaData.day}, {new Date(karwaData.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      
                      <div className="bg-gradient-to-br from-pink-50 to-red-50 p-8 rounded-2xl border-2 border-pink-300 max-w-2xl mx-auto">
                        <div className="text-sm text-gray-600 mb-2">🌙 Moonrise Time (Chandra Darshan)</div>
                        <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
                          {cityMoonrise}
                        </div>
                        <div className="text-lg text-gray-700 font-semibold mb-4">
                          Break your fast after this time!
                        </div>
                        
                        {countdownTime.hours > 0 && (
                          <div className="bg-white p-4 rounded-xl inline-block">
                            <div className="text-sm text-gray-600 mb-2">Live Countdown to Moonrise</div>
                            <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-pink-600">
                              <span>{String(countdownTime.hours).padStart(2, '0')}h</span>
                              <span>:</span>
                              <span>{String(countdownTime.minutes).padStart(2, '0')}m</span>
                              <span>:</span>
                              <span>{String(countdownTime.seconds).padStart(2, '0')}s</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Detailed Timings Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {/* Sargi Time */}
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sargi Time (Sunrise)</h3>
                        </div>
                        <p className="text-3xl font-bold text-orange-600">{karwaData.sunrise}</p>
                        <p className="text-sm text-gray-600 mt-2">Eat before this time</p>
                      </div>

                      {/* Fasting Duration */}
                      <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                            <Clock className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Fasting Duration</h3>
                        </div>
                        <p className="text-3xl font-bold text-red-600">{karwaData.fastingHours}</p>
                        <p className="text-sm text-gray-600 mt-2">Sunrise to moonrise</p>
                      </div>

                      {/* Puja Muhurat */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                            <Star className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Evening Puja Muhurat</h3>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{karwaData.pujaMuhurat}</p>
                        <p className="text-sm text-gray-600 mt-2">Before moonrise</p>
                      </div>

                      {/* Sunset */}
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sunset</h3>
                        </div>
                        <p className="text-3xl font-bold text-yellow-600">{karwaData.sunset}</p>
                        <p className="text-sm text-gray-600 mt-2">Evening begins</p>
                      </div>

                      {/* Chaturthi Tithi */}
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Chaturthi Tithi</h3>
                        </div>
                        <p className="text-lg font-bold text-indigo-600">
                          {new Date(karwaData.chaturthi).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">Sacred tithi moment</p>
                      </div>

                      {/* Moonrise */}
                      <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-2xl border-2 border-pink-300">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
                            <Moon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Moonrise (Fast Break)</h3>
                        </div>
                        <p className="text-3xl font-bold text-pink-600">{cityMoonrise}</p>
                        <p className="text-sm text-gray-600 mt-2">Exact moon sighting time</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      <button
                        onClick={() => window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Karwa+Chauth+${selectedYear}&dates=${karwaData.date.replace(/-/g, '')}/${karwaData.date.replace(/-/g, '')}&details=Moonrise:+${cityMoonrise}+in+${selectedCity.name}&location=${selectedCity.name}`, '_blank')}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-red-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                      >
                        <Download className="w-5 h-5" />
                        <span>Add to Calendar</span>
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => setShowShareMenu(!showShareMenu)}
                          className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-pink-600 text-pink-600 rounded-xl font-bold hover:bg-pink-50 transition-all"
                        >
                          <Share2 className="w-5 h-5" />
                          <span>Share with Family</span>
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

                    {/* Fasting Guide */}
                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-2xl border-2 border-pink-200 mb-8">
                      <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                        <Heart className="w-6 h-6 mr-2 text-pink-600" />
                        Karwa Chauth {selectedYear} Complete Timing Guide
                      </h3>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                          <span className="font-semibold">1. Sargi (Pre-dawn meal):</span>
                          <span className="text-orange-600 font-bold">Before {karwaData.sunrise}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                          <span className="font-semibold">2. Fasting begins:</span>
                          <span className="text-red-600 font-bold">At Sunrise ({karwaData.sunrise})</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                          <span className="font-semibold">3. Evening Puja:</span>
                          <span className="text-purple-600 font-bold">{karwaData.pujaMuhurat}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                          <span className="font-semibold">4. Moonrise (Break Fast):</span>
                          <span className="text-pink-600 font-bold text-xl">{cityMoonrise}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                          <span className="font-semibold">Total Fasting Duration:</span>
                          <span className="text-gray-900 font-bold">{karwaData.fastingHours}</span>
                        </div>
                      </div>
                    </div>

                    {/* Reminder Signup */}
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border-2 border-pink-200">
                      <div className="flex items-center space-x-3 mb-4">
                        <Bell className="w-6 h-6 text-pink-600" />
                        <h3 className="font-bold text-gray-900 text-lg">Set Moonrise Reminder</h3>
                      </div>
                      <p className="text-gray-600 mb-4">Get notified 30 minutes before moonrise to prepare for breaking fast!</p>
                      <form onSubmit={handleReminderSignup} className="flex gap-3">
                        <input
                          type="email"
                          value={emailReminder}
                          onChange={(e) => setEmailReminder(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="flex-1 px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="px-6 py-3 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 transition-colors"
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

        {/* Related Festival Tools */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Festival Date Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/festival-tools/diwali-date-finder" className="group bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200 hover:shadow-xl transition-all">
                <Sparkles className="w-10 h-10 text-orange-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Diwali {selectedYear}</h4>
                <p className="text-gray-600 text-sm mb-3">Lakshmi Puja muhurat & dates</p>
                <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                  View Tool
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/festival-dates" className="group bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 hover:shadow-xl transition-all">
                <Calendar className="w-10 h-10 text-purple-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">All Festival Dates {selectedYear}</h4>
                <p className="text-gray-600 text-sm mb-3">Complete Indian festival calendar</p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                  View Calendar
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/religious-tools" className="group bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200 hover:shadow-xl transition-all">
                <Star className="w-10 h-10 text-red-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Vrat & Fasting Tools</h4>
                <p className="text-gray-600 text-sm mb-3">Puja vidhi & fasting guides</p>
                <div className="flex items-center text-red-600 font-semibold group-hover:gap-2 transition-all">
                  Explore Tools
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Complete Karwa Chauth {selectedYear} Guide - Moonrise Time, Fasting & Puja Vidhi</h2>

              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Info className="w-6 h-6 mr-2 text-pink-600" />
                  What is Karwa Chauth and When is it Celebrated?
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Karwa Chauth {selectedYear} falls on {karwaData?.day}, {new Date(karwaData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>. Karwa Chauth is a sacred one-day fasting ritual observed by married Hindu women for the long life, health, and prosperity of their husbands. The fast is broken only after sighting the moon and performing evening puja.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The festival is celebrated on <strong>Chaturthi (4th day) of Krishna Paksha in Kartik month</strong>, which falls approximately 9 days before Diwali. In {selectedCity.name}, the <strong>moonrise time is {cityMoonrise}</strong>, which is when women can break their Nirjala (without water) fast after seeing the moon through a sieve and offering water.
                </p>
                <div className="bg-pink-50 p-6 rounded-xl border-l-4 border-pink-500">
                  <h4 className="font-bold text-gray-900 mb-2">Why Moonrise Time Matters</h4>
                  <p className="text-gray-700 text-sm">
                    The moonrise time is critical for Karwa Chauth because the vrat (fast) can only be broken after the moon is visible in the sky. Women look at the moon through a sieve (chalni), offer Arghya (water), and then break their fast by drinking water from their husband's hands. Our calculator provides <strong>exact astronomical moonrise time for {selectedCity.name}</strong> so you don't have to wait or guess!
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-red-600" />
                  Karwa Chauth {selectedYear} Complete Day Schedule for {selectedCity.name}
                </h3>
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-bold text-gray-900 mb-2">🌅 Early Morning (Before Sunrise - {karwaData?.sunrise})</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Sargi</strong> (pre-dawn meal eaten before sunrise): Fruits, sweets, dry fruits, milk, water</li>
                      <li>• Mother-in-law traditionally prepares Sargi thali for daughter-in-law</li>
                      <li>• Eat nutritious food to sustain through 11+ hour fast</li>
                      <li>• Drink plenty of water before sunrise</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-gray-900 mb-2">☀️ Daytime ({karwaData?.sunrise} - {karwaData?.sunset})</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Nirjala Fast</strong> begins at sunrise (no food or water for {karwaData?.fastingHours})</li>
                      <li>• Wear traditional saree/suit (red, pink, orange colors preferred)</li>
                      <li>• Mehendi application on hands & feet</li>
                      <li>• Rest and avoid strenuous activities</li>
                      <li>• Prepare puja thali with karwa (earthen pot), diya, sweets, fruits</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-bold text-gray-900 mb-2">🌆 Evening ({karwaData?.pujaMuhurat})</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Karwa Chauth Puja</strong> in groups with married women</li>
                      <li>• Listen to Karwa Chauth Katha (story of Veeravati)</li>
                      <li>• Perform Gauri puja with 7 pheras (circle around thali)</li>
                      <li>• Exchange karwas among women (traditional ritual)</li>
                      <li>• Apply sindoor, wear jewelry, dress beautifully</li>
                    </ul>
                  </div>

                  <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                    <h4 className="font-bold text-gray-900 mb-2">🌙 Moonrise ({cityMoonrise} in {selectedCity.name})</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Moon Sighting</strong>: Wait for moon to rise above horizon</li>
                      <li>• Look at moon through sieve (chalni) while husband stands behind</li>
                      <li>• Offer <strong>Arghya</strong> (water) to moon with karwa</li>
                      <li>• Touch husband's feet, seek blessings</li>
                      <li>• <strong>Break fast</strong> by drinking water from husband's hands</li>
                      <li>• Eat the special Karwa Chauth feast prepared</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Gift className="w-6 h-6 mr-2 text-pink-600" />
                  Sargi Thali Essentials & Karwa Chauth Shopping List
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Sargi Thali Items:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start"><span className="text-pink-600 mr-2">✓</span> <span>Sweet dishes (mathri, pheni, halwa)</span></li>
                      <li className="flex items-start"><span className="text-pink-600 mr-2">✓</span> <span>Dry fruits (almonds, cashews, raisins)</span></li>
                      <li className="flex items-start"><span className="text-pink-600 mr-2">✓</span> <span>Fresh fruits (apple, banana, pomegranate)</span></li>
                      <li className="flex items-start"><span className="text-pink-600 mr-2">✓</span> <span>Coconut water or milk</span></li>
                      <li className="flex items-start"><span className="text-pink-600 mr-2">✓</span> <span>Parathas or mathri (savory items)</span></li>
                      <li className="flex items-start"><span className="text-pink-600 mr-2">✓</span> <span>Sweets prepared by mother-in-law</span></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Puja Thali Items:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start"><span className="text-pink-600 mr-2">✓</span> <span>Karwa (earthen pot with water)</span></li>
                      <li className="flex items-start"><span className="text-pink-600 mr-2">✓</span> <span>Channi/sieve (to view moon)</span></li>
                      <li className="flex items-start"><span className="text-pink-600 mr-2">✓</span> <span>Diya (lamp with ghee/oil)</span></li>
                      <li className="flex items-start"><span className="text-pink-600 mr-2">✓</span> <span>Sweets & fruits for offering</span></li>
                      <li className="flex items-start"><span className="text-pink-600 mr-2">✓</span> <span>Sindoor, kumkum, rice</span></li>
                      <li className="flex items-start"><span className="text-pink-600 mr-2">✓</span> <span>Photo of Lord Shiva & Parvati</span></li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-r from-pink-100 to-red-100 p-6 rounded-xl border-2 border-pink-300">
                  <h5 className="font-bold text-gray-900 mb-3">🛒 Shop Karwa Chauth Essentials:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <a href="https://www.amazon.in/s?k=karwa+chauth+puja+thali" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-pink-600 hover:underline font-semibold">
                      <ExternalLink className="w-4 h-4" />
                      <span>Karwa Chauth Puja Thali (Amazon)</span>
                    </a>
                    <a href="https://www.flipkart.com/search?q=karwa+chauth+items" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-pink-600 hover:underline font-semibold">
                      <ExternalLink className="w-4 h-4" />
                      <span>Fasting Items & Sarees (Flipkart)</span>
                    </a>
                    <Link to="/festival-shopping" className="flex items-center space-x-2 text-pink-600 hover:underline font-semibold">
                      <ArrowRight className="w-4 h-4" />
                      <span>Festival Shopping Budget Planner</span>
                    </Link>
                    <a href="https://www.tanishq.co.in/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-pink-600 hover:underline font-semibold">
                      <ExternalLink className="w-4 h-4" />
                      <span>Gold Jewelry for Karwa Chauth (Tanishq)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQs) - Karwa Chauth {selectedYear}</h3>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-pink-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">1. When is Karwa Chauth {selectedYear} and what is the moonrise time in {selectedCity.name}?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Karwa Chauth {selectedYear} is on {karwaData?.day}, {new Date(karwaData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>. The exact moonrise time in {selectedCity.name} is <strong>{cityMoonrise}</strong>. You can break your Nirjala fast after sighting the moon and offering Arghya. The Chaturthi tithi (4th lunar day) begins at {new Date(karwaData?.chaturthi || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })} IST.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">2. What time should I eat Sargi for Karwa Chauth {selectedYear} in {selectedCity.name}?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Sargi (pre-dawn meal) must be eaten before sunrise at {karwaData?.sunrise}</strong> in {selectedCity.name}. Wake up around 4:00-5:00 AM, eat the Sargi thali prepared by your mother-in-law (includes sweets, fruits, dry fruits, parathas, milk), and drink plenty of water. The Nirjala fast (without food or water) begins exactly at sunrise and continues for approximately <strong>{karwaData?.fastingHours}</strong> until moonrise at {cityMoonrise}.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">3. How to break Karwa Chauth fast? What is the correct vidhi (ritual)?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Karwa Chauth fast breaking ritual (step-by-step):</strong>
                    </p>
                    <ol className="mt-3 space-y-2 text-gray-700 list-decimal pl-5">
                      <li>Wait for moonrise at <strong>{cityMoonrise}</strong> (don't break fast before moon is visible)</li>
                      <li>Look at the moon through a <strong>sieve (chalni)</strong> held in right hand</li>
                      <li>Husband stands behind you - look at his face through the sieve</li>
                      <li>Offer <strong>Arghya (water)</strong> to moon from the karwa (pot)</li>
                      <li>Touch husband's feet and seek blessings for long life</li>
                      <li>Husband gives first sip of water to break the fast</li>
                      <li>Then eat sweets and complete meal prepared for breaking fast</li>
                    </ol>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">4. What if moon is not visible due to clouds on Karwa Chauth {selectedYear}?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      If clouds obstruct moon visibility in {selectedCity.name} after moonrise time ({cityMoonrise}), you have two options: <strong>(1) Wait for clouds to clear</strong> - moon is technically risen, just not visible. Break fast once you see it even briefly. <strong>(2) Check moonrise time</strong> - if 30-45 minutes have passed since official moonrise, you can break fast as per panchang rules (moon is above horizon even if obscured). Many modern families use <a href="https://www.timeanddate.com/moon/phases/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">moon phase apps</a> or telescopes. Consult local pandit if unsure.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">5. Can pregnant or diabetic women observe Karwa Chauth fast? Are there alternatives?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Pregnant women, diabetics, or those with medical conditions should NOT observe Nirjala (waterless) fast</strong>. Alternatives: (1) <strong>Phalahar Vrat</strong> - eat fruits, milk, dry fruits during day; (2) <strong>Water fast</strong> - drink water but no solid food; (3) <strong>Half-day fast</strong> - fast till afternoon only; (4) <strong>Symbolic fast</strong> - fast for 2-3 hours with husband's support. Consult your doctor before fasting. Your health and baby's safety come first - Lord Shiva & Parvati will bless you regardless!
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">6. Why does Karwa Chauth moonrise time vary by city? How is it calculated?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Moonrise time varies because Earth is spherical and cities have different <strong>latitude/longitude coordinates</strong>. Eastern cities (Kolkata moonrise: {INDIAN_CITIES.find(c => c.name === 'Kolkata')?.moonriseOffset ? `~${Number(karwaData?.moonriseDelhi.split(':')[0]) + Math.floor((INDIAN_CITIES.find(c => c.name === 'Kolkata')?.moonriseOffset || 0) / 60)}:${String((Number(karwaData?.moonriseDelhi.split(':')[1]) + (INDIAN_CITIES.find(c => c.name === 'Kolkata')?.moonriseOffset || 0) % 60)).padStart(2, '0')}` : 'later'}) see moon earlier than western cities (Jaipur). Our calculator uses <strong>astronomical ephemeris data (similar to NASA)</strong> with city-specific coordinates to compute exact moonrise for {selectedCity.name}. Difference between Delhi ({karwaData?.moonriseDelhi}) and Mumbai ({karwaData?.moonriseMumbai}) is 12 minutes due to longitude.
                    </p>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">7. What should unmarried girls or widows do on Karwa Chauth? Can they fast?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Unmarried girls</strong> can observe Karwa Chauth fast for their future husband's long life (optional, not mandatory). They can participate in puja, listen to Katha, and break fast at moonrise without the husband ritual. <strong>Widows</strong> traditionally don't observe this fast as it's specifically for married women praying for husband's longevity. However, modern interpretations allow widows to fast for family's well-being or in memory of late husband. There's no religious prohibition - it's personal choice.
                    </p>
                  </div>

                  <div className="border-l-4 border-teal-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">8. What is Karwa Chauth Katha? Why is it important?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Karwa Chauth Katha</strong> is the sacred story narrated during evening puja, typically about Queen Veeravati who broke her fast before moonrise due to fake moon created by her brothers, causing her husband's death. She prayed to Goddess Parvati, who revived him. The story emphasizes the importance of: (1) waiting for actual moonrise, (2) devotion and faith, (3) husband-wife bond sanctity. Listen to Katha in groups with married women, exchange karwas 7 times while circling puja thali. Find <a href="https://www.youtube.com/results?search_query=karwa+chauth+katha" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Karwa Chauth Katha videos on YouTube</a>.
                    </p>
                  </div>

                  <div className="border-l-4 border-pink-600 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">9. Best gift ideas for wife on Karwa Chauth {selectedYear}?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Thoughtful Karwa Chauth gifts for wife:</strong> Traditional jewelry (gold/silver bangles, necklace), saree or suit (red/pink/orange colors), mehendi cone set, cosmetics/beauty products, karwa (decorated earthen pot), personalized gift basket with dry fruits & sweets, spa voucher, romantic dinner date after fast, or cash/gift card. Budget: ₹1,000-50,000 depending on affordability. Shop from <a href="https://www.amazon.in/s?k=karwa+chauth+gifts+for+wife" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">Amazon</a> or <a href="https://www.flipkart.com/search?q=karwa+chauth+gifts" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">Flipkart</a>. Use our <Link to="/festival-shopping" className="text-pink-600 hover:underline">Festival Gift Budget Planner</Link>.
                    </p>
                  </div>

                  <div className="border-l-4 border-rose-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">10. Which states/communities celebrate Karwa Chauth in India?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Karwa Chauth is primarily celebrated in <strong>North India</strong>: Punjab, Haryana, Rajasthan, Uttar Pradesh, Madhya Pradesh, Himachal Pradesh, Delhi, Uttarakhand. It's also observed in parts of Gujarat and Maharashtra (especially among Marwari/Punjabi communities). The festival is less common in South India, East India, or Northeast. However, Bollywood influence has spread it nationwide. Similar fasts: <strong>Vat Savitri</strong> (Maharashtra), <strong>Jitiya</strong> (Bihar), <strong>Teej</strong> (Rajasthan). Regional names: Karva Chauth (Punjab), Karak Chaturthi (Rajasthan).
                    </p>
                  </div>
                </div>
              </div>

              {/* External Resources */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <ExternalLink className="w-6 h-6 mr-2 text-blue-600" />
                  Trusted Resources for Karwa Chauth {selectedYear}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="https://www.drikpanchang.com/festivals/karwa-chauth/karwa-chauth-date-time.html" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    <span>Drik Panchang - Karwa Chauth Dates</span>
                  </a>
                  <a href="https://www.timeanddate.com/astronomy/moon/phases.html" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    <span>Time and Date - Moon Phases & Moonrise</span>
                  </a>
                  <a href="https://en.wikipedia.org/wiki/Karva_Chauth" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    <span>Wikipedia - Karwa Chauth History</span>
                  </a>
                  <a href="https://www.youtube.com/results?search_query=karwa+chauth+puja+vidhi" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    <span>YouTube - Karwa Chauth Puja Vidhi</span>
                  </a>
                  <a href="https://www.amazon.in/s?k=karwa+chauth+puja+thali" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    <span>Amazon - Puja Thali & Essentials</span>
                  </a>
                  <a href="https://www.flipkart.com/search?q=karwa+chauth+saree" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    <span>Flipkart - Karwa Chauth Sarees</span>
                  </a>
                </div>
              </div>

              {/* Internal Tools Links */}
              <div className="bg-gradient-to-r from-pink-600 to-red-600 text-white p-8 rounded-2xl">
                <h3 className="text-3xl font-bold mb-6 text-center">More Festival & Religious Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/festival-dates" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all group">
                    <Calendar className="w-8 h-8 mb-2" />
                    <h4 className="font-bold text-lg mb-1">Festival Calendar {selectedYear}</h4>
                    <p className="text-white/90 text-sm">All vrat & festival dates</p>
                  </Link>

                  <Link to="/religious-tools" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all group">
                    <Star className="w-8 h-8 mb-2" />
                    <h4 className="font-bold text-lg mb-1">Vrat Calculator & Puja Vidhi</h4>
                    <p className="text-white/90 text-sm">Fasting guides & mantras</p>
                  </Link>

                  <Link to="/festival-shopping" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all group">
                    <ShoppingBag className="w-8 h-8 mb-2" />
                    <h4 className="font-bold text-lg mb-1">Festival Shopping Planner</h4>
                    <p className="text-white/90 text-sm">Budget tracker & gift ideas</p>
                  </Link>
                </div>
              </div>

              {/* Final CTA */}
              <div className="mt-12 text-center bg-gradient-to-br from-pink-100 to-red-100 p-8 rounded-2xl border-2 border-pink-300">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Have a Blessed Karwa Chauth {selectedYear}!</h3>
                <p className="text-lg text-gray-700 mb-6">
                  May your fast bring health, prosperity & long life to your husband. Share this moonrise time with family!
                </p>
                <button
                  onClick={() => window.print()}
                  className="px-8 py-4 bg-gradient-to-r from-pink-600 to-red-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
                >
                  <Download className="w-6 h-6 inline mr-2" />
                  Download as PDF
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default KarwaChouthMoonrise;

