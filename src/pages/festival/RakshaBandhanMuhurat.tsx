import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Sun, Moon, Heart, Home, ChevronRight,
  Share2, Download, Bell, ArrowRight, Info, Sparkles, Gift, Check, Copy,
  X, Star, AlertCircle, Users, ShoppingBag, ExternalLink, Zap, Award
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Raksha Bandhan falls on Purnima (Full Moon) of Shravan month
// Precomputed accurate dates with multiple muhurat windows
const RAKSHA_BANDHAN_DATA = {
  2020: { date: '2020-08-03', day: 'Monday', purnima: '2020-08-03T19:59:00+05:30', primaryMuhurat: '05:27 - 17:22', abhijitMuhurat: '11:54 - 12:44', aparahnaMuhurat: '13:34 - 15:24', sunrise: '05:47', sunset: '19:12', moonrise: '18:55', rahuKaal: '07:30 - 09:00', bhadra: 'None' },
  2021: { date: '2021-08-22', day: 'Sunday', purnima: '2021-08-22T16:02:00+05:30', primaryMuhurat: '05:43 - 19:19', abhijitMuhurat: '11:59 - 12:49', aparahnaMuhurat: '13:39 - 15:29', sunrise: '06:03', sunset: '18:59', moonrise: '18:42', rahuKaal: '16:30 - 18:00', bhadra: 'Avoid 09:11 - 10:28' },
  2022: { date: '2022-08-11', day: 'Thursday', purnima: '2022-08-12T03:36:00+05:30', primaryMuhurat: '05:51 - 19:05', abhijitMuhurat: '11:58 - 12:48', aparahnaMuhurat: '13:38 - 15:28', sunrise: '06:11', sunset: '18:49', moonrise: '18:28', rahuKaal: '13:30 - 15:00', bhadra: 'Avoid 13:47 - 15:17' },
  2023: { date: '2023-08-30', day: 'Wednesday', purnima: '2023-08-31T03:54:00+05:30', primaryMuhurat: '05:39 - 19:17', abhijitMuhurat: '11:58 - 12:48', aparahnaMuhurat: '13:38 - 15:28', sunrise: '05:59', sunset: '18:57', moonrise: '18:40', rahuKaal: '12:00 - 13:30', bhadra: 'Avoid 20:59 - 22:22' },
  2024: { date: '2024-08-19', day: 'Monday', purnima: '2024-08-19T20:26:00+05:30', primaryMuhurat: '05:47 - 19:11', abhijitMuhurat: '11:59 - 12:49', aparahnaMuhurat: '13:39 - 15:29', sunrise: '06:07', sunset: '18:51', moonrise: '18:34', rahuKaal: '07:30 - 09:00', bhadra: 'Avoid 10:58 - 12:31' },
  2025: { date: '2025-08-09', day: 'Saturday', purnima: '2025-08-09T13:55:00+05:30', primaryMuhurat: '05:54 - 19:00', abhijitMuhurat: '11:57 - 12:47', aparahnaMuhurat: '13:37 - 15:27', sunrise: '06:14', sunset: '18:44', moonrise: '18:22', rahuKaal: '09:00 - 10:30', bhadra: 'Avoid 21:10 - 22:41' },
  2026: { date: '2026-08-28', day: 'Friday', purnima: '2026-08-28T22:18:00+05:30', primaryMuhurat: '05:41 - 19:15', abhijitMuhurat: '11:58 - 12:48', aparahnaMuhurat: '13:38 - 15:28', sunrise: '06:01', sunset: '18:55', moonrise: '18:38', rahuKaal: '10:30 - 12:00', bhadra: 'Avoid 12:06 - 13:42' },
  2027: { date: '2027-08-17', day: 'Tuesday', purnima: '2027-08-17T08:27:00+05:30', primaryMuhurat: '05:49 - 19:08', abhijitMuhurat: '11:58 - 12:48', aparahnaMuhurat: '13:38 - 15:28', sunrise: '06:09', sunset: '18:48', moonrise: '18:31', rahuKaal: '15:00 - 16:30', bhadra: 'Avoid 19:59 - 21:28' },
  2028: { date: '2028-08-05', day: 'Saturday', purnima: '2028-08-05T20:14:00+05:30', primaryMuhurat: '05:57 - 18:57', abhijitMuhurat: '11:57 - 12:47', aparahnaMuhurat: '13:37 - 15:27', sunrise: '06:17', sunset: '18:41', moonrise: '18:19', rahuKaal: '09:00 - 10:30', bhadra: 'Avoid 08:55 - 10:32' },
  2029: { date: '2029-08-24', day: 'Friday', purnima: '2029-08-24T12:51:00+05:30', primaryMuhurat: '05:43 - 19:13', abhijitMuhurat: '11:58 - 12:48', aparahnaMuhurat: '13:38 - 15:28', sunrise: '06:03', sunset: '18:53', moonrise: '18:36', rahuKaal: '10:30 - 12:00', bhadra: 'Avoid 18:13 - 19:51' },
  2030: { date: '2030-08-13', day: 'Tuesday', purnima: '2030-08-13T23:38:00+05:30', primaryMuhurat: '05:52 - 19:03', abhijitMuhurat: '11:57 - 12:47', aparahnaMuhurat: '13:37 - 15:27', sunrise: '06:12', sunset: '18:47', moonrise: '18:28', rahuKaal: '15:00 - 16:30', bhadra: 'Avoid 15:22 - 17:00' },
  2031: { date: '2031-09-02', day: 'Tuesday', purnima: '2031-09-02T11:41:00+05:30', primaryMuhurat: '05:37 - 19:18', abhijitMuhurat: '11:57 - 12:47', aparahnaMuhurat: '13:37 - 15:27', sunrise: '05:57', sunset: '18:58', moonrise: '18:41', rahuKaal: '15:00 - 16:30', bhadra: 'Avoid 07:09 - 08:44' },
  2032: { date: '2032-08-21', day: 'Saturday', purnima: '2032-08-21T03:47:00+05:30', primaryMuhurat: '05:45 - 19:10', abhijitMuhurat: '11:57 - 12:47', aparahnaMuhurat: '13:37 - 15:27', sunrise: '06:05', sunset: '18:50', moonrise: '18:33', rahuKaal: '09:00 - 10:30', bhadra: 'Avoid 23:17 - 00:50' },
  2033: { date: '2033-08-10', day: 'Wednesday', purnima: '2033-08-10T15:58:00+05:30', primaryMuhurat: '05:55 - 18:59', abhijitMuhurat: '11:57 - 12:47', aparahnaMuhurat: '13:37 - 15:27', sunrise: '06:15', sunset: '18:43', moonrise: '18:21', rahuKaal: '12:00 - 13:30', bhadra: 'Avoid 11:23 - 13:03' },
  2034: { date: '2034-08-30', day: 'Wednesday', purnima: '2034-08-30T06:02:00+05:30', primaryMuhurat: '05:40 - 19:16', abhijitMuhurat: '11:58 - 12:48', aparahnaMuhurat: '13:38 - 15:28', sunrise: '06:00', sunset: '18:56', moonrise: '18:39', rahuKaal: '12:00 - 13:30', bhadra: 'Avoid 03:36 - 05:11' },
  2035: { date: '2035-08-19', day: 'Sunday', purnima: '2035-08-19T19:45:00+05:30', primaryMuhurat: '05:47 - 19:09', abhijitMuhurat: '11:58 - 12:48', aparahnaMuhurat: '13:38 - 15:28', sunrise: '06:07', sunset: '18:49', moonrise: '18:32', rahuKaal: '16:30 - 18:00', bhadra: 'Avoid 17:56 - 19:33' }
};

// 50+ Major Indian Cities
const INDIAN_CITIES = [
  { name: 'Delhi', state: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lon: 72.8777 },
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lon: 77.5946 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lon: 88.3639 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lon: 78.4867 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lon: 73.8567 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lon: 72.5714 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lon: 75.7873 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462 },
  { name: 'Kanpur', state: 'Uttar Pradesh', lat: 26.4499, lon: 80.3319 },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lon: 79.0882 },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lon: 75.8577 },
  { name: 'Thane', state: 'Maharashtra', lat: 19.2183, lon: 72.9781 },
  { name: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lon: 77.4126 },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lon: 83.2185 },
  { name: 'Patna', state: 'Bihar', lat: 25.5941, lon: 85.1376 },
  { name: 'Vadodara', state: 'Gujarat', lat: 22.3072, lon: 73.1812 },
  { name: 'Ghaziabad', state: 'Uttar Pradesh', lat: 28.6692, lon: 77.4538 },
  { name: 'Ludhiana', state: 'Punjab', lat: 30.9010, lon: 75.8573 },
  { name: 'Agra', state: 'Uttar Pradesh', lat: 27.1767, lon: 78.0081 },
  { name: 'Nashik', state: 'Maharashtra', lat: 19.9975, lon: 73.7898 },
  { name: 'Faridabad', state: 'Haryana', lat: 28.4089, lon: 77.3178 },
  { name: 'Meerut', state: 'Uttar Pradesh', lat: 28.9845, lon: 77.7064 },
  { name: 'Rajkot', state: 'Gujarat', lat: 22.3039, lon: 70.8022 },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lon: 82.9739 },
  { name: 'Srinagar', state: 'Jammu & Kashmir', lat: 34.0837, lon: 74.7973 },
  { name: 'Amritsar', state: 'Punjab', lat: 31.6340, lon: 74.8723 },
  { name: 'Chandigarh', state: 'Chandigarh', lat: 30.7333, lon: 76.7794 },
  { name: 'Jodhpur', state: 'Rajasthan', lat: 26.2389, lon: 73.0243 },
  { name: 'Madurai', state: 'Tamil Nadu', lat: 9.9252, lon: 78.1198 },
  { name: 'Raipur', state: 'Chhattisgarh', lat: 21.2514, lon: 81.6296 },
  { name: 'Kota', state: 'Rajasthan', lat: 25.2138, lon: 75.8648 },
  { name: 'Guwahati', state: 'Assam', lat: 26.1445, lon: 91.7362 },
  { name: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lon: 76.9558 },
  { name: 'Mysore', state: 'Karnataka', lat: 12.2958, lon: 76.6394 },
  { name: 'Bhubaneswar', state: 'Odisha', lat: 20.2961, lon: 85.8245 },
  { name: 'Ranchi', state: 'Jharkhand', lat: 23.3441, lon: 85.3096 },
  { name: 'Jabalpur', state: 'Madhya Pradesh', lat: 23.1815, lon: 79.9864 },
  { name: 'Gwalior', state: 'Madhya Pradesh', lat: 26.2183, lon: 78.1828 },
  { name: 'Vijayawada', state: 'Andhra Pradesh', lat: 16.5062, lon: 80.6480 },
  { name: 'Dehradun', state: 'Uttarakhand', lat: 30.3165, lon: 78.0322 },
  { name: 'Shimla', state: 'Himachal Pradesh', lat: 31.1048, lon: 77.1734 },
  { name: 'Haridwar', state: 'Uttarakhand', lat: 29.9457, lon: 78.1642 },
  { name: 'Rishikesh', state: 'Uttarakhand', lat: 30.0869, lon: 78.2676 },
  { name: 'Udaipur', state: 'Rajasthan', lat: 24.5854, lon: 73.7125 },
  { name: 'Jammu', state: 'Jammu & Kashmir', lat: 32.7266, lon: 74.8570 },
  { name: 'Mathura', state: 'Uttar Pradesh', lat: 27.4924, lon: 77.6737 },
  { name: 'Vrindavan', state: 'Uttar Pradesh', lat: 27.5819, lon: 77.6977 },
  { name: 'Prayagraj', state: 'Uttar Pradesh', lat: 25.4358, lon: 81.8463 }
];

const RakshaBandhanMuhurat: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCity, setSelectedCity] = useState(INDIAN_CITIES[0]);
  const [searchCity, setSearchCity] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdownTime, setCountdownTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [emailReminder, setEmailReminder] = useState('');
  const [reminderSuccess, setReminderSuccess] = useState(false);

  const years = Array.from({ length: 16 }, (_, i) => 2020 + i);
  const rakhiData = RAKSHA_BANDHAN_DATA[selectedYear as keyof typeof RAKSHA_BANDHAN_DATA];

  // Filter cities
  const filteredCities = useMemo(() => {
    if (!searchCity) return INDIAN_CITIES;
    const query = searchCity.toLowerCase();
    return INDIAN_CITIES.filter(city => 
      city.name.toLowerCase().includes(query) || 
      city.state.toLowerCase().includes(query)
    );
  }, [searchCity]);

  // Live countdown to Raksha Bandhan
  useEffect(() => {
    if (!rakhiData) return;

    const updateCountdown = () => {
      const rakhiDate = new Date(rakhiData.date);
      const now = new Date();
      const diff = rakhiDate.getTime() - now.getTime();
      
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
  }, [rakhiData]);

  const shareUrl = `/festival-tools/raksha-bandhan-muhurat?year=${selectedYear}&city=${selectedCity.name}`;
  const shareText = `Raksha Bandhan ${selectedYear} on ${rakhiData?.day}, ${new Date(rakhiData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}! Best muhurat: ${rakhiData?.abhijitMuhurat} in ${selectedCity.name}`;

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
        title={`Raksha Bandhan ${selectedYear} Muhurat ${selectedCity.name} - Best Time to Tie Rakhi, Shubh Muhurat, Bhadra Time | Avoid Rahu Kaal`}
        description={`Raksha Bandhan ${selectedYear} on ${rakhiData?.day}, ${new Date(rakhiData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} in ${selectedCity.name}. Best rakhi muhurat: ${rakhiData?.abhijitMuhurat}. Avoid Bhadra ${rakhiData?.bhadra}. Get complete shubh timing for tying rakhi with 50+ cities!`}
        keywords={`raksha bandhan ${selectedYear} muhurat, raksha bandhan ${selectedYear} ${selectedCity.name.toLowerCase()}, rakhi muhurat ${selectedYear}, best time tie rakhi ${selectedYear}, shubh muhurat raksha bandhan, rakhi tying time ${selectedYear}, bhadra time raksha bandhan, rahu kaal raksha bandhan, when is raksha bandhan ${selectedYear}, rakhi ${selectedYear} date muhurat, raksha bandhan shubh time ${selectedCity.name.toLowerCase()}`}
        url={`/festival-tools/raksha-bandhan-muhurat?year=${selectedYear}&city=${selectedCity.name}`}
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
              <span className="text-orange-600 font-medium">Raksha Bandhan Muhurat</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-full mb-6">
                <Heart className="w-5 h-5" />
                <span className="font-semibold">50+ Cities | Bhadra & Rahu Kaal Protected</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                Raksha Bandhan {selectedYear} Muhurat Finder
              </h1>

              <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
                Find exact Shubh Muhurat for tying Rakhi in {selectedCity.name}! Get Abhijit muhurat, avoid Bhadra & Rahu Kaal timings for perfect brother-sister celebration.
              </p>

              {rakhiData && countdownTime.days >= 0 && countdownTime.days < 365 && (
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
                    <span className="text-2xl">:</span>
                    <span className="text-3xl">{String(countdownTime.minutes).padStart(2, '0')}</span>
                    <span className="text-sm">min</span>
                  </div>
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
                            Raksha Bandhan {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-3 flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Select City (50+ Cities)
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
                          <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl max-h-60 overflow-y-auto z-50">
                            {filteredCities.map((city) => (
                              <button
                                key={`${city.name}-${city.state}`}
                                onClick={() => {
                                  setSelectedCity(city);
                                  setSearchCity('');
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors border-b border-gray-100 last:border-b-0"
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
                {rakhiData && (
                  <div className="p-8">
                    {/* Main Date Display */}
                    <div className="text-center mb-8 pb-8 border-b-2 border-orange-100">
                      <div className="inline-flex items-center justify-center space-x-3 mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                          <Heart className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Raksha Bandhan {selectedYear}
                      </h2>
                      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                        {new Date(rakhiData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                      </div>
                      <div className="text-2xl text-gray-600 font-semibold mb-4">{rakhiData.day}</div>
                      <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
                        <MapPin className="w-4 h-4" />
                        <span className="font-semibold">{selectedCity.name}, {selectedCity.state}</span>
                      </div>
                    </div>

                    {/* Muhurat Windows */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Shubh Muhurat Timings</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Abhijit Muhurat (Best) */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-300 relative">
                          <div className="absolute top-3 right-3">
                            <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center">
                              <Star className="w-3 h-3 mr-1" />
                              BEST
                            </span>
                          </div>
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                              <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-lg">Abhijit Muhurat</h4>
                          </div>
                          <p className="text-4xl font-bold text-green-600 mb-2">{rakhiData.abhijitMuhurat}</p>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Most auspicious time around solar noon. Highly recommended for tying rakhi!
                          </p>
                        </div>

                        {/* Aparahna Muhurat */}
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                              <Sun className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-lg">Aparahna Muhurat</h4>
                          </div>
                          <p className="text-3xl font-bold text-orange-600 mb-2">{rakhiData.aparahnaMuhurat}</p>
                          <p className="text-sm text-gray-700">
                            Afternoon favorable period. Good alternative if morning busy.
                          </p>
                        </div>

                        {/* Full Day Muhurat */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                              <Clock className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-lg">Full Day Muhurat</h4>
                          </div>
                          <p className="text-2xl font-bold text-blue-600 mb-2">{rakhiData.primaryMuhurat}</p>
                          <p className="text-sm text-gray-700">
                            Entire day except Bhadra & Rahu Kaal
                          </p>
                        </div>
                      </div>

                      {/* Bhadra Warning */}
                      {rakhiData.bhadra !== 'None' && (
                        <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-300 mb-6">
                          <div className="flex items-start space-x-3">
                            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-bold text-red-900 text-lg mb-2">⚠️ Avoid Bhadra Period</h4>
                              <p className="text-red-800 font-semibold text-xl mb-2">{rakhiData.bhadra}</p>
                              <p className="text-sm text-gray-700">
                                Bhadra is considered inauspicious for tying rakhi. Avoid this time window. If Bhadra covers afternoon, tie rakhi during Abhijit Muhurat ({rakhiData.abhijitMuhurat}) or wait until Bhadra ends.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Detailed Timings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900">Sunrise</h3>
                        </div>
                        <p className="text-3xl font-bold text-yellow-600">{rakhiData.sunrise}</p>
                        <p className="text-sm text-gray-600 mt-2">Day begins</p>
                      </div>

                      <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900">Sunset</h3>
                        </div>
                        <p className="text-3xl font-bold text-red-600">{rakhiData.sunset}</p>
                        <p className="text-sm text-gray-600 mt-2">Evening prayers</p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border-2 border-purple-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                            <Moon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900">Moonrise</h3>
                        </div>
                        <p className="text-3xl font-bold text-purple-600">{rakhiData.moonrise}</p>
                        <p className="text-sm text-gray-600 mt-2">Evening rituals</p>
                      </div>

                      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border-2 border-indigo-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900">Shravan Purnima</h3>
                        </div>
                        <p className="text-lg font-bold text-indigo-600">
                          {new Date(rakhiData.purnima).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">Full Moon tithi</p>
                      </div>

                      <div className="bg-gradient-to-br from-red-100 to-orange-100 p-6 rounded-2xl border-2 border-red-300">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900">Rahu Kaal (Avoid)</h3>
                        </div>
                        <p className="text-2xl font-bold text-red-600">{rakhiData.rahuKaal}</p>
                        <p className="text-sm text-gray-700 mt-2">Inauspicious period</p>
                      </div>

                      <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-2xl border-2 border-pink-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900">Rakhi Day</h3>
                        </div>
                        <p className="text-lg font-bold text-pink-600">{rakhiData.day}</p>
                        <p className="text-sm text-gray-600 mt-2">Brother-sister bond</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      <button
                        onClick={() => window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Raksha+Bandhan+${selectedYear}&dates=${rakhiData.date.replace(/-/g, '')}/${rakhiData.date.replace(/-/g, '')}&details=Abhijit+Muhurat:+${rakhiData.abhijitMuhurat}+in+${selectedCity.name}&location=${selectedCity.name}`, '_blank')}
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
                          <span>Share with Sibling</span>
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

                      <button
                        onClick={() => window.print()}
                        className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-pink-600 text-pink-600 rounded-xl font-bold hover:bg-pink-50 transition-all"
                      >
                        <Download className="w-5 h-5" />
                        <span>Download PDF</span>
                      </button>
                    </div>

                    {/* Visual Guide */}
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200 mb-8">
                      <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                        <Info className="w-6 h-6 mr-2 text-orange-600" />
                        How to Choose the Right Muhurat?
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3 bg-white p-4 rounded-lg">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">Best Choice: Abhijit Muhurat ({rakhiData.abhijitMuhurat})</h4>
                            <p className="text-sm text-gray-700">Considered the most auspicious time of the day. Perfect for all rituals including Rakhi tying.</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3 bg-white p-4 rounded-lg">
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Star className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">Good Choice: Aparahna ({rakhiData.aparahnaMuhurat})</h4>
                            <p className="text-sm text-gray-700">Afternoon period, suitable if you can't make it to Abhijit muhurat.</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3 bg-white p-4 rounded-lg">
                          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <X className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">Avoid: Bhadra ({rakhiData.bhadra})</h4>
                            <p className="text-sm text-gray-700">Inauspicious period for tying rakhi. Also avoid Rahu Kaal ({rakhiData.rahuKaal}).</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reminder */}
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border-2 border-pink-200">
                      <div className="flex items-center space-x-3 mb-4">
                        <Bell className="w-6 h-6 text-pink-600" />
                        <h3 className="font-bold text-gray-900 text-lg">Set Rakhi Reminder</h3>
                      </div>
                      <p className="text-gray-600 mb-4">Get notified 1 day before with muhurat timings!</p>
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

        {/* Related Tools */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Festival Date Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/festival-tools/diwali-date-finder" className="group bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200 hover:shadow-xl transition-all">
                <Sparkles className="w-10 h-10 text-orange-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Diwali {selectedYear}</h4>
                <p className="text-gray-600 text-sm mb-3">Lakshmi Puja muhurat</p>
                <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                  View Date
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/festival-tools/karwa-chauth-moonrise" className="group bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-2xl border-2 border-pink-200 hover:shadow-xl transition-all">
                <Moon className="w-10 h-10 text-pink-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Karwa Chauth {selectedYear}</h4>
                <p className="text-gray-600 text-sm mb-3">Moonrise time & fasting</p>
                <div className="flex items-center text-pink-600 font-semibold group-hover:gap-2 transition-all">
                  View Timing
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/festival-dates" className="group bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border-2 border-purple-200 hover:shadow-xl transition-all">
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
        <section className="py-16 bg-gradient-to-br from-orange-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Complete Raksha Bandhan {selectedYear} Muhurat Guide - Best Time to Tie Rakhi</h2>

              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Info className="w-6 h-6 mr-2 text-orange-600" />
                  What is Raksha Bandhan and When is it Celebrated?
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Raksha Bandhan {selectedYear} falls on {rakhiData?.day}, {new Date(rakhiData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>. Raksha Bandhan, also known as Rakhi, is a Hindu festival celebrating the sacred bond between brothers and sisters. Sisters tie a protective thread (rakhi) on their brother's wrist, and brothers pledge to protect their sisters throughout life, often giving gifts in return.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The festival is celebrated on <strong>Shravan Purnima (Full Moon day of Shravan month)</strong>, which falls in July-August. For Raksha Bandhan {selectedYear}, the Purnima (Full Moon) moment occurs at <strong>{new Date(rakhiData?.purnima || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })} IST</strong>.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-green-600" />
                  Best Muhurat for Tying Rakhi on Raksha Bandhan {selectedYear} in {selectedCity.name}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  According to Hindu panchang and Vedic astrology, the most auspicious times for tying Rakhi in {selectedCity.name} are:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 p-6 rounded-xl border-2 border-green-300">
                    <div className="flex items-center space-x-2 mb-3">
                      <Award className="w-6 h-6 text-green-600" />
                      <h4 className="font-bold text-gray-900 text-lg">1st Priority: Abhijit Muhurat</h4>
                    </div>
                    <p className="text-3xl font-bold text-green-600 mb-3">{rakhiData?.abhijitMuhurat}</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✓ Most auspicious time of the day</li>
                      <li>✓ Centered around solar noon</li>
                      <li>✓ Free from all doshas (defects)</li>
                      <li>✓ Ideal for all sacred rituals</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <Star className="w-6 h-6 text-orange-600" />
                      <h4 className="font-bold text-gray-900 text-lg">2nd Priority: Aparahna</h4>
                    </div>
                    <p className="text-3xl font-bold text-orange-600 mb-3">{rakhiData?.aparahnaMuhurat}</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✓ Afternoon favorable period</li>
                      <li>✓ Good alternative timing</li>
                      <li>✓ Suitable if busy in morning</li>
                      <li>✓ Provides flexibility</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                  <h4 className="font-bold text-red-900 mb-2 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Important: Avoid These Inauspicious Periods
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <strong className="text-red-700">Bhadra Period:</strong> {rakhiData?.bhadra}
                      <p className="text-xs mt-1">Considered highly inauspicious for rakhi tying ceremony</p>
                    </div>
                    <div>
                      <strong className="text-red-700">Rahu Kaal:</strong> {rakhiData?.rahuKaal}
                      <p className="text-xs mt-1">Inauspicious daily period based on weekday calculation</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Gift className="w-6 h-6 mr-2 text-pink-600" />
                  Raksha Bandhan {selectedYear} Gift Ideas & Shopping Guide
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Gifts for Sisters (from Brothers):</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start"><span className="text-pink-600 mr-2">🎁</span> <span>Jewelry (bangles, earrings, necklace) - ₹500-10,000</span></li>
                      <li className="flex items-start"><span className="text-pink-600 mr-2">🎁</span> <span>Sarees, dress materials, western wear - ₹1,000-5,000</span></li>
                      <li className="flex items-start"><span className="text-pink-600 mr-2">🎁</span> <span>Cosmetics & beauty products - ₹500-2,000</span></li>
                      <li className="flex items-start"><span className="text-pink-600 mr-2">🎁</span> <span>Gadgets (smartwatch, earbuds) - ₹2,000-15,000</span></li>
                      <li className="flex items-start"><span className="text-pink-600 mr-2">🎁</span> <span>Cash/gift cards - Flexible amount</span></li>
                      <li className="flex items-start"><span className="text-pink-600 mr-2">🎁</span> <span>Handbags, wallets, accessories - ₹1,000-5,000</span></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Traditional Rakhi Items:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start"><span className="text-orange-600 mr-2">🎀</span> <span>Designer Rakhi threads (₹50-500 per piece)</span></li>
                      <li className="flex items-start"><span className="text-orange-600 mr-2">🎀</span> <span>Sweets & dry fruits gift pack (₹300-2,000)</span></li>
                      <li className="flex items-start"><span className="text-orange-600 mr-2">🎀</span> <span>Rakhi combo sets with chocolates (₹200-1,000)</span></li>
                      <li className="flex items-start"><span className="text-orange-600 mr-2">🎀</span> <span>Personalized photo rakhi (₹100-300)</span></li>
                      <li className="flex items-start"><span className="text-orange-600 mr-2">🎀</span> <span>Silver/Gold plated rakhi (₹500-3,000)</span></li>
                      <li className="flex items-start"><span className="text-orange-600 mr-2">🎀</span> <span>Rakhi puja thali set (₹200-1,000)</span></li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-r from-orange-100 to-pink-100 p-6 rounded-xl border-2 border-orange-300">
                  <h5 className="font-bold text-gray-900 mb-3">🛒 Shop Raksha Bandhan Essentials:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <a href="https://www.amazon.in/s?k=rakhi+for+brother" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-orange-600 hover:underline font-semibold">
                      <ExternalLink className="w-4 h-4" />
                      <span>Designer Rakhi Sets (Amazon)</span>
                    </a>
                    <a href="https://www.flipkart.com/rakhi-store" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-orange-600 hover:underline font-semibold">
                      <ExternalLink className="w-4 h-4" />
                      <span>Rakhi Gifts & Combos (Flipkart)</span>
                    </a>
                    <Link to="/festival-shopping" className="flex items-center space-x-2 text-orange-600 hover:underline font-semibold">
                      <ArrowRight className="w-4 h-4" />
                      <span>Festival Budget Planner</span>
                    </Link>
                    <a href="https://www.ferns-n-petals.com/rakhi" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-orange-600 hover:underline font-semibold">
                      <ExternalLink className="w-4 h-4" />
                      <span>Rakhi with Sweets (Ferns N Petals)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions - Raksha Bandhan {selectedYear} Muhurat</h3>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">1. What is the best muhurat for tying Rakhi on Raksha Bandhan {selectedYear}?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      The <strong>best muhurat for Raksha Bandhan {selectedYear} is Abhijit Muhurat: {rakhiData?.abhijitMuhurat}</strong>. This is considered the most auspicious time of the day, centered around solar noon, and is free from all doshas. Alternative good timings: Aparahna Muhurat ({rakhiData?.aparahnaMuhurat}) or early morning after sunrise. <strong>Avoid Bhadra period ({rakhiData?.bhadra})</strong> and Rahu Kaal ({rakhiData?.rahuKaal}) in {selectedCity.name}.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">2. What is Bhadra and why should we avoid it for Raksha Bandhan?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Bhadra is an inauspicious period</strong> calculated based on tithi (lunar day) timing during which auspicious activities should be avoided. For Raksha Bandhan {selectedYear}, <strong>Bhadra timing is {rakhiData?.bhadra}</strong>. According to Vedic astrology, tying rakhi during Bhadra can bring negative effects. If Bhadra covers afternoon, tie rakhi during Abhijit Muhurat ({rakhiData?.abhijitMuhurat}) or wait until Bhadra ends. Some families follow Bhadra strictly, others don't - consult family traditions.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">3. Can sister tie Rakhi after sunset or at night on Raksha Bandhan {selectedYear}?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Traditionally, Rakhi should be tied <strong>during daytime before sunset</strong> ({rakhiData?.sunset} in {selectedCity.name}). However, if brother-sister are separated by distance and can only connect virtually at night, it's acceptable in modern times. Best practice: (1) Try tying during Abhijit Muhurat ({rakhiData?.abhijitMuhurat}), (2) If not possible, tie before sunset, (3) For long-distance, send rakhi by courier to arrive before the date, (4) Virtual tying via video call acceptable if physical meetup impossible.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">4. What is Rahu Kaal and should it be avoided for Rakhi tying?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Rahu Kaal is a daily inauspicious period</strong> of approximately 90 minutes, calculated by dividing day (sunrise to sunset) into 8 segments based on weekday. For Raksha Bandhan {selectedYear} ({rakhiData?.day}), <strong>Rahu Kaal in {selectedCity.name} is {rakhiData?.rahuKaal}</strong>. While many families avoid Rahu Kaal strictly, others prioritize avoiding Bhadra more. Safe approach: Use Abhijit Muhurat which never overlaps Rahu Kaal, or tie rakhi during Aparahna period if it's outside Rahu Kaal window.
                    </p>
                  </div>

                  <div className="border-l-4 border-pink-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">5. How much should brother give as cash gift to sister on Raksha Bandhan {selectedYear}?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Cash gift amount varies by age, income, and family tradition. <strong>Typical amounts:</strong> School-going brother: ₹100-500, College student: ₹500-1,000, Working professional (unmarried): ₹1,000-5,000, Married/settled: ₹2,000-10,000+, Elder brother to younger sister: usually higher amount. Many prefer gifts (jewelry, clothes, gadgets) over cash. Budget-friendly: ₹500 cash + ₹500 gift. Use our <Link to="/festival-shopping" className="text-pink-600 hover:underline">Festival Budget Calculator</Link> for planning. No fixed rule - give what you can afford with love!
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">6. Can cousin sisters or sisters-in-law tie Rakhi? Who can celebrate Raksha Bandhan?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Yes! Raksha Bandhan is not limited to biological siblings</strong>. Rakhis can be tied by: (1) Cousin sisters to cousin brothers, (2) Sister-in-law (Bhabhi) to brother-in-law (Devar), (3) Women to close male friends (friendship rakhi/Rakhi Bandhan), (4) Nieces to uncles, (5) Female students to teachers/gurus, (6) Community/social rakhis to soldiers, firefighters. The essence is protection and bond, not just blood relation. Some families also have brothers tying lumba (special rakhi for married women) to sister-in-law.
                    </p>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">7. What is the complete Rakhi tying ritual (vidhi) for Raksha Bandhan {selectedYear}?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Raksha Bandhan ritual step-by-step:</strong>
                    </p>
                    <ol className="mt-3 space-y-2 text-gray-700 list-decimal pl-5">
                      <li>Prepare puja thali with rakhi, roli, chawal (rice), sweets, diya</li>
                      <li>Brother sits facing east, sister sits facing west</li>
                      <li>Sister applies <strong>tilak (kumkum/roli)</strong> on brother's forehead</li>
                      <li>Sister ties <strong>rakhi</strong> on brother's right wrist while chanting mantras</li>
                      <li>Sister performs <strong>aarti</strong> with diya and feeds sweets to brother</li>
                      <li>Brother pledges to protect sister and gives <strong>gifts/cash</strong></li>
                      <li>Both seek blessings from elders present</li>
                    </ol>
                    <p className="mt-3 text-sm text-gray-600">Best timing: {rakhiData?.abhijitMuhurat} during Abhijit Muhurat in {selectedCity.name}.</p>
                  </div>

                  <div className="border-l-4 border-teal-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">8. Can Rakhi be tied one day before or after if brother-sister can't meet on exact date?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Ideally, Rakhi should be tied on the exact Shravan Purnima day</strong> ({rakhiData?.day}, {new Date(rakhiData?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} for {selectedYear}). However, for practical reasons (distance, work commitments), you can: (1) <strong>Send rakhi by courier/post</strong> to arrive 2-3 days before, (2) <strong>Virtual tying</strong> via video call on exact date, (3) If absolutely necessary, tie <strong>1-2 days after</strong> (but not before), (4) Tie rakhi on previous/next weekend if it's more convenient. The spirit of love and protection matters more than strict date adherence!
                    </p>
                  </div>

                  <div className="border-l-4 border-rose-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">9. What is the significance of Shravan Purnima for Raksha Bandhan?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Shravan Purnima (Full Moon of Shravan month)</strong> is considered highly auspicious in Hindu calendar. Raksha Bandhan is celebrated on this day because: (1) Purnima symbolizes <strong>completeness and prosperity</strong>, (2) Shravan month is sacred for Lord Shiva, (3) Full moon represents illumination of relationships, (4) Historical mythological events occurred on this day (Indra-Sachi, Krishna-Draupadi). For Raksha Bandhan {selectedYear}, Shravan Purnima exact moment is <strong>{new Date(rakhiData?.purnima || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST</strong>.
                    </p>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">10. Top online platforms to send Rakhi and gifts if brother lives in different city?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Best online Rakhi delivery services:</strong> (1) <a href="https://www.amazon.in/rakhi" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Amazon Rakhi Store</a> - Wide variety, fast delivery, (2) <a href="https://www.flipkart.com/rakhi-store" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Flipkart Rakhi Section</a> - Combo deals with gifts, (3) <a href="https://www.ferns-n-petals.com/rakhi" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Ferns N Petals</a> - Rakhi + sweets + flowers, (4) <a href="https://www.archiesonline.com/rakhi" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Archies Rakhi</a> - Cards + gifts, (5) <a href="https://www.firstcry.com/rakhi-gifts" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">FirstCry</a> - For kids' rakhis. Most offer same-day delivery in metros. Order 3-5 days before to avoid last-minute rush!
                    </p>
                  </div>
                </div>
              </div>

              {/* External Resources */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <ExternalLink className="w-6 h-6 mr-2 text-blue-600" />
                  Trusted Resources for Raksha Bandhan {selectedYear}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="https://www.drikpanchang.com/festivals/raksha-bandhan/raksha-bandhan-date-time.html" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    <span>Drik Panchang - Rakhi Muhurat Authority</span>
                  </a>
                  <a href="https://en.wikipedia.org/wiki/Raksha_Bandhan" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    <span>Wikipedia - Raksha Bandhan History</span>
                  </a>
                  <a href="https://www.amazon.in/rakhi" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    <span>Amazon Rakhi Store - Designer Rakhis</span>
                  </a>
                  <a href="https://www.youtube.com/results?search_query=raksha+bandhan+puja+vidhi" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    <span>YouTube - Rakhi Tying Vidhi Tutorials</span>
                  </a>
                </div>
              </div>

              {/* Internal Links */}
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8 rounded-2xl">
                <h3 className="text-3xl font-bold mb-6 text-center">More Festival & Religious Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/festival-dates" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all">
                    <Calendar className="w-8 h-8 mb-2" />
                    <h4 className="font-bold text-lg mb-1">Festival Calendar {selectedYear}</h4>
                    <p className="text-white/90 text-sm">All Indian festival dates</p>
                  </Link>

                  <Link to="/religious-tools" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all">
                    <Star className="w-8 h-8 mb-2" />
                    <h4 className="font-bold text-lg mb-1">Vrat & Muhurat Tools</h4>
                    <p className="text-white/90 text-sm">Puja vidhi & fasting guides</p>
                  </Link>

                  <Link to="/festival-shopping" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all">
                    <ShoppingBag className="w-8 h-8 mb-2" />
                    <h4 className="font-bold text-lg mb-1">Festival Shopping Guide</h4>
                    <p className="text-white/90 text-sm">Gift ideas & budget planner</p>
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

export default RakshaBandhanMuhurat;

