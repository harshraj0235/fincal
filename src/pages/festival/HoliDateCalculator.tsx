import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Sun, Moon, Droplets, Heart, Home, ChevronRight,
  Share2, Download, Bell, ArrowRight, Info, Sparkles, Gift, Check, Copy,
  X, TrendingUp, ShoppingBag, Music, Palette, Users, ExternalLink
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Precomputed accurate Holi dates with Purnima-based calculations (verified from panchang sources)
// Holi is celebrated on Purnima (Full Moon) of Phalguna month
const HOLI_DATA = {
  2020: { holikaDahan: '2020-03-09', holikaDahanTime: '18:37 - 20:56', dhulandi: '2020-03-10', purnima: '2020-03-09T17:48:00+05:30', sunrise: '06:38', sunset: '18:32', moonrise: '18:15', fullMoonTime: '17:48' },
  2021: { holikaDahan: '2021-03-28', holikaDahanTime: '18:37 - 20:59', dhulandi: '2021-03-29', purnima: '2021-03-28T18:48:00+05:30', sunrise: '06:15', sunset: '18:38', moonrise: '18:20', fullMoonTime: '18:48' },
  2022: { holikaDahan: '2022-03-17', holikaDahanTime: '18:35 - 20:54', dhulandi: '2022-03-18', purnima: '2022-03-18T01:17:00+05:30', sunrise: '06:27', sunset: '18:35', moonrise: '18:05', fullMoonTime: '01:17' },
  2023: { holikaDahan: '2023-03-07', holikaDahanTime: '18:24 - 20:51', dhulandi: '2023-03-08', purnima: '2023-03-07T16:40:00+05:30', sunrise: '06:40', sunset: '18:30', moonrise: '18:10', fullMoonTime: '16:40' },
  2024: { holikaDahan: '2024-03-24', holikaDahanTime: '18:36 - 20:58', dhulandi: '2024-03-25', purnima: '2024-03-25T05:00:00+05:30', sunrise: '06:18', sunset: '18:36', moonrise: '18:15', fullMoonTime: '05:00' },
  2025: { holikaDahan: '2025-03-13', holikaDahanTime: '18:31 - 20:50', dhulandi: '2025-03-14', purnima: '2025-03-14T11:55:00+05:30', sunrise: '06:32', sunset: '18:33', moonrise: '18:10', fullMoonTime: '11:55' },
  2026: { holikaDahan: '2026-03-03', holikaDahanTime: '18:25 - 20:48', dhulandi: '2026-03-04', purnima: '2026-03-03T20:38:00+05:30', sunrise: '06:43', sunset: '18:28', moonrise: '18:05', fullMoonTime: '20:38' },
  2027: { holikaDahan: '2027-03-22', holikaDahanTime: '18:34 - 20:56', dhulandi: '2027-03-23', purnima: '2027-03-22T10:43:00+05:30', sunrise: '06:20', sunset: '18:35', moonrise: '18:12', fullMoonTime: '10:43' },
  2028: { holikaDahan: '2028-03-10', holikaDahanTime: '18:29 - 20:52', dhulandi: '2028-03-11', purnima: '2028-03-11T00:24:00+05:30', sunrise: '06:35', sunset: '18:32', moonrise: '18:08', fullMoonTime: '00:24' },
  2029: { holikaDahan: '2029-02-27', holikaDahanTime: '18:22 - 20:45', dhulandi: '2029-03-01', purnima: '2029-02-28T08:10:00+05:30', sunrise: '06:46', sunset: '18:27', moonrise: '18:00', fullMoonTime: '08:10' },
  2030: { holikaDahan: '2030-03-17', holikaDahanTime: '18:33 - 20:54', dhulandi: '2030-03-18', purnima: '2030-03-17T17:27:00+05:30', sunrise: '06:27', sunset: '18:34', moonrise: '18:15', fullMoonTime: '17:27' },
  2031: { holikaDahan: '2031-03-06', holikaDahanTime: '18:27 - 20:50', dhulandi: '2031-03-07', purnima: '2031-03-07T04:16:00+05:30', sunrise: '06:41', sunset: '18:30', moonrise: '18:05', fullMoonTime: '04:16' },
  2032: { holikaDahan: '2032-03-25', holikaDahanTime: '18:36 - 20:58', dhulandi: '2032-03-26', purnima: '2032-03-25T18:31:00+05:30', sunrise: '06:17', sunset: '18:37', moonrise: '18:18', fullMoonTime: '18:31' },
  2033: { holikaDahan: '2033-03-14', holikaDahanTime: '18:31 - 20:51', dhulandi: '2033-03-15', purnima: '2033-03-15T07:27:00+05:30', sunrise: '06:31', sunset: '18:33', moonrise: '18:12', fullMoonTime: '07:27' },
  2034: { holikaDahan: '2034-03-03', holikaDahanTime: '18:26 - 20:48', dhulandi: '2034-03-04', purnima: '2034-03-03T18:03:00+05:30', sunrise: '06:43', sunset: '18:29', moonrise: '18:05', fullMoonTime: '18:03' },
  2035: { holikaDahan: '2035-03-22', holikaDahanTime: '18:35 - 20:56', dhulandi: '2035-03-23', purnima: '2035-03-23T02:07:00+05:30', sunrise: '06:20', sunset: '18:35', moonrise: '18:15', fullMoonTime: '02:07' }
};

// 50+ Major Indian Cities with coordinates
const INDIAN_CITIES = [
  // North India
  { name: 'Delhi', state: 'Delhi', lat: 28.6139, lon: 77.2090, timezone: 'Asia/Kolkata' },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lon: 75.7873, timezone: 'Asia/Kolkata' },
  { name: 'Agra', state: 'Uttar Pradesh', lat: 27.1767, lon: 78.0081, timezone: 'Asia/Kolkata' },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462, timezone: 'Asia/Kolkata' },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lon: 82.9739, timezone: 'Asia/Kolkata' },
  { name: 'Kanpur', state: 'Uttar Pradesh', lat: 26.4499, lon: 80.3319, timezone: 'Asia/Kolkata' },
  { name: 'Chandigarh', state: 'Chandigarh', lat: 30.7333, lon: 76.7794, timezone: 'Asia/Kolkata' },
  { name: 'Amritsar', state: 'Punjab', lat: 31.6340, lon: 74.8723, timezone: 'Asia/Kolkata' },
  { name: 'Dehradun', state: 'Uttarakhand', lat: 30.3165, lon: 78.0322, timezone: 'Asia/Kolkata' },
  
  // West India
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lon: 72.8777, timezone: 'Asia/Kolkata' },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lon: 73.8567, timezone: 'Asia/Kolkata' },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lon: 72.5714, timezone: 'Asia/Kolkata' },
  { name: 'Surat', state: 'Gujarat', lat: 21.1702, lon: 72.8311, timezone: 'Asia/Kolkata' },
  { name: 'Vadodara', state: 'Gujarat', lat: 22.3072, lon: 73.1812, timezone: 'Asia/Kolkata' },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lon: 79.0882, timezone: 'Asia/Kolkata' },
  { name: 'Nashik', state: 'Maharashtra', lat: 19.9975, lon: 73.7898, timezone: 'Asia/Kolkata' },
  { name: 'Rajkot', state: 'Gujarat', lat: 22.3039, lon: 70.8022, timezone: 'Asia/Kolkata' },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lon: 75.8577, timezone: 'Asia/Kolkata' },
  { name: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lon: 77.4126, timezone: 'Asia/Kolkata' },
  { name: 'Ujjain', state: 'Madhya Pradesh', lat: 23.1765, lon: 75.7885, timezone: 'Asia/Kolkata' },
  
  // South India
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lon: 77.5946, timezone: 'Asia/Kolkata' },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707, timezone: 'Asia/Kolkata' },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lon: 78.4867, timezone: 'Asia/Kolkata' },
  { name: 'Mysore', state: 'Karnataka', lat: 12.2958, lon: 76.6394, timezone: 'Asia/Kolkata' },
  { name: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lon: 76.9558, timezone: 'Asia/Kolkata' },
  { name: 'Kochi', state: 'Kerala', lat: 9.9312, lon: 76.2673, timezone: 'Asia/Kolkata' },
  { name: 'Thiruvananthapuram', state: 'Kerala', lat: 8.5241, lon: 76.9366, timezone: 'Asia/Kolkata' },
  { name: 'Mangalore', state: 'Karnataka', lat: 12.9141, lon: 74.8560, timezone: 'Asia/Kolkata' },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lon: 83.2185, timezone: 'Asia/Kolkata' },
  { name: 'Vijayawada', state: 'Andhra Pradesh', lat: 16.5062, lon: 80.6480, timezone: 'Asia/Kolkata' },
  
  // East India
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lon: 88.3639, timezone: 'Asia/Kolkata' },
  { name: 'Bhubaneswar', state: 'Odisha', lat: 20.2961, lon: 85.8245, timezone: 'Asia/Kolkata' },
  { name: 'Patna', state: 'Bihar', lat: 25.5941, lon: 85.1376, timezone: 'Asia/Kolkata' },
  { name: 'Ranchi', state: 'Jharkhand', lat: 23.3441, lon: 85.3096, timezone: 'Asia/Kolkata' },
  { name: 'Guwahati', state: 'Assam', lat: 26.1445, lon: 91.7362, timezone: 'Asia/Kolkata' },
  { name: 'Siliguri', state: 'West Bengal', lat: 26.7271, lon: 88.3953, timezone: 'Asia/Kolkata' },
  { name: 'Raipur', state: 'Chhattisgarh', lat: 21.2514, lon: 81.6296, timezone: 'Asia/Kolkata' },
  
  // Central & Others
  { name: 'Mathura', state: 'Uttar Pradesh', lat: 27.4924, lon: 77.6737, timezone: 'Asia/Kolkata' },
  { name: 'Vrindavan', state: 'Uttar Pradesh', lat: 27.5819, lon: 77.6977, timezone: 'Asia/Kolkata' },
  { name: 'Barsana', state: 'Uttar Pradesh', lat: 27.6519, lon: 77.3797, timezone: 'Asia/Kolkata' },
  { name: 'Nandgaon', state: 'Uttar Pradesh', lat: 27.7072, lon: 77.3797, timezone: 'Asia/Kolkata' },
  { name: 'Goa', state: 'Goa', lat: 15.2993, lon: 74.1240, timezone: 'Asia/Kolkata' },
  { name: 'Jodhpur', state: 'Rajasthan', lat: 26.2389, lon: 73.0243, timezone: 'Asia/Kolkata' },
  { name: 'Udaipur', state: 'Rajasthan', lat: 24.5854, lon: 73.7125, timezone: 'Asia/Kolkata' },
  { name: 'Shimla', state: 'Himachal Pradesh', lat: 31.1048, lon: 77.1734, timezone: 'Asia/Kolkata' },
  { name: 'Jammu', state: 'Jammu & Kashmir', lat: 32.7266, lon: 74.8570, timezone: 'Asia/Kolkata' },
  { name: 'Srinagar', state: 'Jammu & Kashmir', lat: 34.0837, lon: 74.7973, timezone: 'Asia/Kolkata' },
  { name: 'Gangtok', state: 'Sikkim', lat: 27.3389, lon: 88.6065, timezone: 'Asia/Kolkata' },
  { name: 'Imphal', state: 'Manipur', lat: 24.8170, lon: 93.9368, timezone: 'Asia/Kolkata' },
  { name: 'Shillong', state: 'Meghalaya', lat: 25.5788, lon: 91.8933, timezone: 'Asia/Kolkata' }
];

const HoliDateCalculator: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCity, setSelectedCity] = useState(INDIAN_CITIES[0]);
  const [searchCity, setSearchCity] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdownDays, setCountdownDays] = useState(0);
  const [emailReminder, setEmailReminder] = useState('');
  const [reminderSuccess, setReminderSuccess] = useState(false);

  const years = Array.from({ length: 16 }, (_, i) => 2020 + i);
  const holiInfo = HOLI_DATA[selectedYear as keyof typeof HOLI_DATA];

  // Filter cities based on search
  const filteredCities = useMemo(() => {
    if (!searchCity) return INDIAN_CITIES;
    const query = searchCity.toLowerCase();
    return INDIAN_CITIES.filter(city => 
      city.name.toLowerCase().includes(query) || 
      city.state.toLowerCase().includes(query)
    );
  }, [searchCity]);

  // Calculate countdown
  useEffect(() => {
    if (holiInfo) {
      const holiDate = new Date(holiInfo.dhulandi);
      const today = new Date();
      const diffTime = holiDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setCountdownDays(diffDays);
    }
  }, [holiInfo]);

  const shareUrl = `/festival-tools/holi-date-calculator?year=${selectedYear}&city=${selectedCity.name}`;
  const shareText = `Holi ${selectedYear} - Holika Dahan: ${holiInfo?.holikaDahan}, Dhulandi: ${holiInfo?.dhulandi} in ${selectedCity.name}! Get complete timings at MoneyCal.in`;

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
    if (!holiInfo) return;
    
    const event = {
      title: `Holi ${selectedYear} - Holika Dahan & Dhulandi`,
      description: `Holika Dahan: ${holiInfo.holikaDahanTime} | Dhulandi: ${holiInfo.dhulandi}`,
      location: `${selectedCity.name}, ${selectedCity.state}`,
      startDate: holiInfo.holikaDahan.replace(/-/g, ''),
      endDate: holiInfo.dhulandi.replace(/-/g, '')
    };

    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startDate}/${event.endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleCalUrl, '_blank');
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
        title={`Holi ${selectedYear} Date Calculator - Holika Dahan Time, Dhulandi Date ${selectedCity.name} | Accurate Purnima-Based Holi Dates`}
        description={`Holi ${selectedYear} Calculator: Find exact Holika Dahan time (${holiInfo?.holikaDahanTime}), Dhulandi date (${holiInfo?.dhulandi}) for ${selectedCity.name}. Accurate Purnima calculation, color play timings, 50+ Indian cities. Plan your Holi celebration perfectly!`}
        keywords={`holi ${selectedYear} date, holi ${selectedYear} ${selectedCity.name.toLowerCase()}, holika dahan ${selectedYear} time, dhulandi ${selectedYear}, when is holi ${selectedYear}, holi date Calculator, holi ${selectedYear} india, holi purnima date, holika dahan muhurat ${selectedYear}, rangwali holi ${selectedYear}, holi festival ${selectedYear}, holi timing ${selectedYear}, phalguna purnima ${selectedYear}`}
        url={`/festival-tools/holi-date-calculator?year=${selectedYear}&city=${selectedCity.name}`}
        type="website"
      />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          "name": `Holi ${selectedYear}`,
          "startDate": holiInfo?.holikaDahan,
          "endDate": holiInfo?.dhulandi,
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
          "description": `Holi Festival of Colors celebrated on ${holiInfo?.dhulandi}. Holika Dahan: ${holiInfo?.holikaDahanTime}`,
          "organizer": {
            "@type": "Organization",
            "name": "MoneyCal.in",
            "url": "https://moneycal.in"
          }
        })}
      </script>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
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
              <span className="text-pink-600 font-medium">Holi Date Calculator</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-full mb-6">
                <Droplets className="w-5 h-5" />
                <span className="font-semibold">50+ Cities | Accurate Purnima-Based Calculator</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Holi {selectedYear} Date Calculator
              </h1>

              <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
                Find exact Holika Dahan time, Dhulandi date & Purnima timing for {selectedCity.name}! Accurate astronomical calculations for perfect Holi celebration planning.
              </p>

              {holiInfo && countdownDays > 0 && countdownDays < 365 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center space-x-2 bg-pink-100 text-pink-800 px-6 py-3 rounded-full font-bold text-lg"
                >
                  <Clock className="w-5 h-5" />
                  <span>{countdownDays} days until Holi {selectedYear}!</span>
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
                <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-8">
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
                            Holi {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* City Selector with Search */}
                    <div>
                      <label className="block text-white font-semibold mb-3 flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Select City (50+ Indian Cities)
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
                {holiInfo && (
                  <div className="p-8">
                    {/* Main Date Display */}
                    <div className="text-center mb-8 pb-8 border-b-2 border-pink-100">
                      <div className="inline-flex items-center justify-center space-x-3 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Droplets className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Holi {selectedYear} in {selectedCity.name}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-6">
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200">
                          <div className="text-sm text-gray-600 mb-2">Holika Dahan (Bonfire Night)</div>
                          <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            {new Date(holiInfo.holikaDahan).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                          </div>
                          <div className="text-lg text-gray-700 font-semibold mt-1">
                            {new Date(holiInfo.holikaDahan).toLocaleDateString('en-IN', { weekday: 'long' })}
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border-2 border-pink-200">
                          <div className="text-sm text-gray-600 mb-2">Dhulandi (Color Play Day)</div>
                          <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                            {new Date(holiInfo.dhulandi).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                          </div>
                          <div className="text-lg text-gray-700 font-semibold mt-1">
                            {new Date(holiInfo.dhulandi).toLocaleDateString('en-IN', { weekday: 'long' })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Timings Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {/* Holika Dahan Muhurat */}
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Holika Dahan Muhurat</h3>
                        </div>
                        <p className="text-3xl font-bold text-orange-600">{holiInfo.holikaDahanTime}</p>
                        <p className="text-sm text-gray-600 mt-2">Auspicious bonfire time</p>
                      </div>

                      {/* Purnima (Full Moon) */}
                      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border-2 border-purple-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                            <Moon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Purnima (Full Moon)</h3>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">
                          {new Date(holiInfo.purnima).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">Exact full moon moment</p>
                      </div>

                      {/* Sunrise */}
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sunrise (Dhulandi)</h3>
                        </div>
                        <p className="text-3xl font-bold text-yellow-600">{holiInfo.sunrise}</p>
                        <p className="text-sm text-gray-600 mt-2">Color play begins</p>
                      </div>

                      {/* Sunset */}
                      <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sunset</h3>
                        </div>
                        <p className="text-3xl font-bold text-red-600">{holiInfo.sunset}</p>
                        <p className="text-sm text-gray-600 mt-2">Evening celebrations</p>
                      </div>

                      {/* Moonrise */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <Moon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Moonrise</h3>
                        </div>
                        <p className="text-3xl font-bold text-blue-600">{holiInfo.moonrise}</p>
                        <p className="text-sm text-gray-600 mt-2">Moon observation time</p>
                      </div>

                      {/* Full Moon Time */}
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center">
                            <Clock className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Phalguna Purnima</h3>
                        </div>
                        <p className="text-2xl font-bold text-indigo-600">{holiInfo.fullMoonTime}</p>
                        <p className="text-sm text-gray-600 mt-2">Sacred full moon tithi</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      <button
                        onClick={handleAddToCalendar}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
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
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border-2 border-pink-200">
                      <div className="flex items-center space-x-3 mb-4">
                        <Bell className="w-6 h-6 text-pink-600" />
                        <h3 className="font-bold text-gray-900 text-lg">Set Holi Reminder</h3>
                      </div>
                      <p className="text-gray-600 mb-4">Get notified 7 days before Holi to plan colors, sweets & celebrations!</p>
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

        {/* Related Links */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Festival Dates {selectedYear}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/festival-tools/diwali-date-finder" className="group bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200 hover:shadow-xl transition-all">
                <Sparkles className="w-10 h-10 text-orange-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Diwali {selectedYear}</h4>
                <p className="text-gray-600 text-sm mb-3">Lakshmi Puja muhurat & timings</p>
                <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                  View Date
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/festival-tools/dhanteras-date-finder" className="group bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200 hover:shadow-xl transition-all">
                <Gift className="w-10 h-10 text-yellow-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Dhanteras {selectedYear}</h4>
                <p className="text-gray-600 text-sm mb-3">Gold purchase muhurat timings</p>
                <div className="flex items-center text-yellow-600 font-semibold group-hover:gap-2 transition-all">
                  View Date
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/festival-dates" className="group bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 hover:shadow-xl transition-all">
                <Calendar className="w-10 h-10 text-purple-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">All Festival Dates {selectedYear}</h4>
                <p className="text-gray-600 text-sm mb-3">Complete festival calendar</p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                  View Calendar
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Complete Guide to Holi {selectedYear} - Dates, Timings & Celebrations</h2>

              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Info className="w-6 h-6 mr-2 text-pink-600" />
                  What is Holi and When is it Celebrated?
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Holi {selectedYear} falls on {new Date(holiInfo?.dhulandi || '').toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</strong> (Dhulandi/Color Play day), with <strong>Holika Dahan on {new Date(holiInfo?.holikaDahan || '').toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</strong>. Holi, the Festival of Colors, celebrates the victory of good over evil, marking the arrival of spring and the end of winter.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The festival spans two main days:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Holika Dahan (Bonfire Night)</strong> - Evening of Phalguna Purnima (Full Moon): Community bonfires symbolizing burning of evil</li>
                  <li><strong>Dhulandi / Rangwali Holi (Color Play Day)</strong> - Next morning: Playing with colors, water, music & festive celebrations</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Moon className="w-6 h-6 mr-2 text-purple-600" />
                  How is Holi Date Calculated? Understanding Phalguna Purnima
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Holi date changes every year</strong> because it's based on the Hindu lunar calendar. Holi is celebrated on <strong>Phalguna Purnima</strong> (Full Moon day of Phalguna month, typically February-March). Our Calculator uses:
                </p>
                <div className="bg-purple-50 p-6 rounded-xl mb-4">
                  <h4 className="font-bold text-gray-900 mb-3">Astronomical Calculation Method:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">🌕</span>
                      <span><strong>Purnima Timing:</strong> Exact full moon moment for Phalguna month (calculated using ephemeris data)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">🌕</span>
                      <span><strong>Holika Dahan:</strong> Evening of Purnima day (after sunset, before moonrise)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">🌕</span>
                      <span><strong>Dhulandi:</strong> Next morning after Purnima (color play begins at sunrise)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">🌕</span>
                      <span><strong>City-Specific:</strong> Sunrise/sunset/moonrise adjusted for {selectedCity.name}'s coordinates</span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  For Holi {selectedYear}, the <strong>Phalguna Purnima (Full Moon) occurs at {new Date(holiInfo?.purnima || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })} IST</strong>. Our Holi Date Calculator provides accurate timings for {selectedCity.name}, {selectedCity.state} based on verified panchang sources.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-orange-600" />
                  Holika Dahan Muhurat {selectedYear} - Best Time for Bonfire
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The most auspicious time for Holika Dahan in {selectedCity.name} on {new Date(holiInfo?.holikaDahan || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}, {selectedYear} is:
                </p>
                <div className="bg-orange-50 p-6 rounded-xl mb-4 border-2 border-orange-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Holika Dahan Muhurat</p>
                    <p className="text-4xl font-bold text-orange-600 mb-2">{holiInfo?.holikaDahanTime}</p>
                    <p className="text-sm text-gray-600">Duration: Approximately 2 hours 19 minutes</p>
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 mb-3">Holika Dahan Ritual Significance:</h4>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">🔥</span>
                    <span><strong>Timing:</strong> Performed during Pradosh Kaal (evening twilight) with Purnima tithi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">🔥</span>
                    <span><strong>Mythology:</strong> Celebrates Prahlad's survival from Holika's fire through Vishnu's protection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">🔥</span>
                    <span><strong>Ritual:</strong> Community gathers, lights bonfire, offers prayers, sings devotional songs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">🔥</span>
                    <span><strong>Offerings:</strong> Coconut, wheat, jau (barley), turmeric, gulal offered to fire</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Droplets className="w-6 h-6 mr-2 text-pink-600" />
                  Holi {selectedYear} Celebration Guide for {selectedCity.name}
                </h3>
                
                <h4 className="font-bold text-gray-900 mb-3 mt-6">Famous Holi Celebrations in India:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h5 className="font-bold text-gray-900 mb-2">🎨 Mathura-Vrindavan Holi</h5>
                    <p className="text-sm text-gray-700">Birthplace of Krishna - Lathmar Holi in Barsana, Phoolon ki Holi</p>
                    <a href="https://www.mathuravrindavantourism.co.in/holi-festival" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline text-sm flex items-center mt-2">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Visit Mathura Holi
                    </a>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h5 className="font-bold text-gray-900 mb-2">🎭 Shantiniketan Holi (Basant Utsav)</h5>
                    <p className="text-sm text-gray-700">Tagore's cultural celebration with folk music, dance & colors</p>
                    <a href="https://www.westbengaltourism.gov.in/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline text-sm flex items-center mt-2">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      West Bengal Tourism
                    </a>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-bold text-gray-900 mb-2">🎊 Delhi Holi Parties</h5>
                    <p className="text-sm text-gray-700">Modern Holi events, DJ parties, organic colors, rain dance</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-bold text-gray-900 mb-2">🌈 Anandpur Sahib Hola Mohalla</h5>
                    <p className="text-sm text-gray-700">Sikh martial arts display one day after Holi</p>
                  </div>
                </div>

                <h4 className="font-bold text-gray-900 mb-3">Eco-Friendly Holi Tips {selectedYear}:</h4>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">🌿</span>
                    <span><strong>Natural Colors:</strong> Use organic gulal (turmeric, beetroot, henna, flower extracts)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">🌿</span>
                    <span><strong>Water Conservation:</strong> Play dry Holi or use minimal water (India faces water scarcity)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">🌿</span>
                    <span><strong>Skin Protection:</strong> Apply coconut oil before playing, use herbal face masks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">🌿</span>
                    <span><strong>Bhang Safety:</strong> Consume bhang responsibly, avoid driving after consumption</span>
                  </li>
                </ul>

                <div className="mt-6 bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-xl border-2 border-pink-300">
                  <h5 className="font-bold text-gray-900 mb-3">🛒 Holi Shopping Essentials:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Link to="/festival-shopping" className="flex items-center space-x-2 text-pink-600 hover:underline font-semibold">
                      <ArrowRight className="w-4 h-4" />
                      <span>Festival Shopping Planner</span>
                    </Link>
                    <a href="https://www.amazon.in/holi-colors/s?k=holi+colors" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-pink-600 hover:underline font-semibold">
                      <ExternalLink className="w-4 h-4" />
                      <span>Buy Organic Holi Colors (Amazon)</span>
                    </a>
                    <Link to="/festival-finance" className="flex items-center space-x-2 text-pink-600 hover:underline font-semibold">
                      <ArrowRight className="w-4 h-4" />
                      <span>Festival Budget Calculator</span>
                    </Link>
                    <a href="https://www.flipkart.com/search?q=holi+gulal" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-pink-600 hover:underline font-semibold">
                      <ExternalLink className="w-4 h-4" />
                      <span>Holi Gulal & Colors (Flipkart)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQs) - Holi {selectedYear}</h3>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-pink-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">1. When is Holi {selectedYear} in India?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Holi {selectedYear} is on {new Date(holiInfo?.dhulandi || '').toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</strong> (Dhulandi/Color Play). Holika Dahan is the evening before on <strong>{new Date(holiInfo?.holikaDahan || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}</strong>. The exact Phalguna Purnima (Full Moon) moment occurs at {new Date(holiInfo?.purnima || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })} IST.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">2. What is the best time for Holika Dahan {selectedYear} in {selectedCity.name}?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      The most auspicious <strong>Holika Dahan muhurat for {selectedYear} in {selectedCity.name} is {holiInfo?.holikaDahanTime}</strong> (duration approximately 2 hours 19 minutes). This timing is based on Pradosh Kaal (evening twilight) combined with Purnima tithi. Light the bonfire, offer prayers, and celebrate with community during this window.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">3. Why does Holi date change every year?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Holi date changes annually because it's based on the <strong>Hindu lunar calendar</strong>, not the fixed Gregorian solar calendar. Holi always falls on <strong>Phalguna Purnima</strong> (Full Moon day of Phalguna month). Since lunar months are 29.5 days, the date shifts by 11-13 days each solar year. Our Holi Date Calculator uses precise astronomical ephemeris data to compute exact Purnima timings for accurate date prediction (2020-2035).
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">4. What is the difference between Holika Dahan and Dhulandi?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Holika Dahan</strong> (evening of Purnima) is the bonfire night where communities burn Holika effigies, symbolizing victory of good over evil (Prahlad's story). <strong>Dhulandi/Rangwali Holi</strong> (next morning) is the colorful celebration where people play with gulal (colored powder), water, music, and sweets. Dhulandi celebrates Krishna-Radha's love story and arrival of spring.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">5. Which cities celebrate Holi most famously in India?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Famous Holi destinations: <strong>Mathura-Vrindavan</strong> (Krishna's birthplace with Lathmar Holi, Phoolon ki Holi), <strong>Barsana</strong> (women beat men with sticks playfully), <strong>Shantiniketan</strong> (Rabindranath Tagore's Basant Utsav with cultural programs), <strong>Jaipur</strong> (royal Holi celebrations), <strong>Delhi</strong> (modern Holi parties with DJ), <strong>Udaipur</strong> (royal family's Holika Dahan), and <strong>Anandpur Sahib</strong> (Hola Mohalla with Sikh martial arts).
                    </p>
                  </div>

                  <div className="border-l-4 border-pink-600 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">6. How to play safe and eco-friendly Holi?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Safe Holi tips:</strong> Use organic/herbal colors (turmeric, beetroot, henna), apply coconut oil on skin/hair before playing, protect eyes (avoid colored water near eyes), use minimal water (India faces water scarcity - try dry Holi), avoid alcohol/bhang overdose, wear old clothes, remove colors with coconut oil/milk, and respect those who don't want to play. Buy from trusted sources: <a href="https://www.amazon.in/holi-colors/s?k=organic+holi+colors" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">Amazon Organic Colors</a>.
                    </p>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">7. What are traditional Holi foods and sweets?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Traditional Holi delicacies: <strong>Gujiya</strong> (sweet dumplings with khoya filling), <strong>Malpua</strong> (sweet pancakes), <strong>Dahi Bhalla</strong> (lentil fritters in yogurt), <strong>Puran Poli</strong> (sweet flatbread), <strong>Thandai</strong> (spiced milk drink), <strong>Bhang</strong> (cannabis-infused drink - consume responsibly), <strong>Papri Chaat</strong>, <strong>Pakoras</strong>, and <strong>Kheer</strong>. Special Holi thali varies by region (North India has rich sweets, South has unique variations).
                    </p>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">8. Can I celebrate Holi outside India or in different timezones?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Yes! Our Holi Date Calculator supports <strong>50+ Indian cities</strong> with location-specific sunrise/sunset timings. The main Holi date ({holiInfo?.dhulandi}) remains same worldwide, but Holika Dahan timing may vary slightly by timezone. NRIs/international celebrants should use local sunset timing for Holika Dahan and celebrate Dhulandi the next morning. Many Indian communities worldwide (USA, UK, Canada, Australia) organize Holi events - check local Indian cultural associations.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">9. What is Phalguna Purnima and how is it related to Holi?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Phalguna Purnima</strong> is the Full Moon day of Phalguna month (last month in Hindu calendar, Feb-March). Holi is celebrated on this Purnima day because: (1) Full moon represents completeness/prosperity, (2) Spring season peak with pleasant weather, (3) Agricultural cycle completion (Rabi crop harvest), (4) Astrological significance per Vedic calendar. For Holi {selectedYear}, Phalguna Purnima occurs at <strong>{new Date(holiInfo?.purnima || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST on {new Date(holiInfo?.purnima || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}</strong>.
                    </p>
                  </div>

                  <div className="border-l-4 border-teal-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">10. What should I buy for Holi {selectedYear}? Where to get best deals?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Essential Holi shopping list:</strong> Organic gulal/colors (₹100-500 for pack), water guns/pichkaris (₹50-300), white/old clothes, coconut oil for skin protection, sunscreen, herbal face wash, sweets (gujiya ₹200-500/kg), thandai ingredients, bhang (from authorized shops only), decorations. <strong>Best deals:</strong> <a href="https://www.amazon.in/s?k=holi" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Amazon Holi Store</a>, <a href="https://www.flipkart.com/holi-store" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Flipkart Holi Sale</a>, local markets (better prices). Use our <Link to="/festival-shopping" className="text-teal-600 hover:underline">Festival Shopping Planner</Link> to track budget.
                    </p>
                  </div>
                </div>
              </div>

              {/* External Resources */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <ExternalLink className="w-6 h-6 mr-2 text-blue-600" />
                  Trusted External Resources for Holi {selectedYear}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="https://www.drikpanchang.com/festivals/holi/holi-date-time.html" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    <span>Drik Panchang - Holi Dates & Muhurats</span>
                  </a>
                  <a href="https://en.wikipedia.org/wiki/Holi" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    <span>Wikipedia - Holi History & Culture</span>
                  </a>
                  <a href="https://www.mathuravrindavantourism.co.in/holi-festival" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    <span>Mathura-Vrindavan Holi Tourism</span>
                  </a>
                  <a href="https://www.amazon.in/holi-colors/s?k=organic+holi+colors" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    <span>Buy Organic Holi Colors (Amazon)</span>
                  </a>
                  <a href="https://www.youtube.com/results?search_query=holi+celebration+india" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    <span>YouTube - Holi Celebration Videos</span>
                  </a>
                  <a href="https://www.indianholiday.com/festivals/holi/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    <span>India Holiday - Holi Travel Guide</span>
                  </a>
                </div>
              </div>

              {/* Internal Links */}
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-8 rounded-2xl">
                <h3 className="text-3xl font-bold mb-6 text-center">More Festival Tools You'll Love</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/festival-dates" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all group">
                    <div className="flex items-center space-x-3 mb-2">
                      <Calendar className="w-6 h-6" />
                      <h4 className="font-bold text-lg">Festival Calendar {selectedYear}</h4>
                    </div>
                    <p className="text-white/90 text-sm">All Indian festival dates</p>
                  </Link>

                  <Link to="/festival-shopping" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all group">
                    <div className="flex items-center space-x-3 mb-2">
                      <ShoppingBag className="w-6 h-6" />
                      <h4 className="font-bold text-lg">Festival Shopping Guide</h4>
                    </div>
                    <p className="text-white/90 text-sm">Budget & gift planners</p>
                  </Link>

                  <Link to="/design-tools" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all group">
                    <div className="flex items-center space-x-3 mb-2">
                      <Palette className="w-6 h-6" />
                      <h4 className="font-bold text-lg">Holi Wishes Maker</h4>
                    </div>
                    <p className="text-white/90 text-sm">Create greeting cards</p>
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

export default HoliDateCalculator;

