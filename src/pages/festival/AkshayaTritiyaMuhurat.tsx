import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Sun, Sunrise, Home, ChevronRight, Sunset,
  Share2, Download, Bell, ArrowRight, Info, Heart, Gift, Check, Copy,
  X, Star, Zap, Users, ShoppingBag, ExternalLink, Award, TrendingUp,
  Coins, DollarSign, Sparkles, Target, BookOpen, AlertCircle
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { 
  generateAkshayaTritiyaFAQSchema, 
  generateAkshayaTritiyaEventSchema,
  generateHowToSchema,
  generateBreadcrumbSchema,
  HISTORICAL_GOLD_PRICES,
  HINDI_TRANSLATIONS
} from '../../data/akshayaTritiyaSchema';

// Akshaya Tritiya falls on Tritiya (3rd day) of Shukla Paksha in Vaishakha month (April-May)
// The entire day is considered auspicious - no muhurat needed for gold/investment
const AKSHAYA_TRITIYA_DATA = {
  2020: { date: '2020-04-26', day: 'Sunday', sunrise: '05:46', sunset: '18:56', abhijitStart: '11:51', abhijitEnd: '12:39', rahuStart: '16:24', rahuEnd: '17:56', nakshatra: 'Rohini', tithi: 'Tritiya' },
  2021: { date: '2021-05-14', day: 'Friday', sunrise: '05:26', sunset: '19:11', abhijitStart: '11:49', abhijitEnd: '12:37', rahuStart: '10:36', rahuEnd: '12:08', nakshatra: 'Krittika', tithi: 'Tritiya' },
  2022: { date: '2022-05-03', day: 'Tuesday', sunrise: '05:37', sunset: '19:02', abhijitStart: '11:50', abhijitEnd: '12:39', rahuStart: '08:32', rahuEnd: '10:05', nakshatra: 'Rohini', tithi: 'Tritiya' },
  2023: { date: '2023-04-22', day: 'Saturday', sunrise: '05:49', sunset: '18:54', abhijitStart: '11:52', abhijitEnd: '12:40', rahuStart: '09:07', rahuEnd: '10:38', nakshatra: 'Rohini', tithi: 'Tritiya' },
  2024: { date: '2024-05-10', day: 'Friday', sunrise: '05:29', sunset: '19:08', abhijitStart: '11:49', abhijitEnd: '12:38', rahuStart: '10:36', rahuEnd: '12:09', nakshatra: 'Krittika', tithi: 'Tritiya' },
  2025: { date: '2025-04-30', day: 'Wednesday', sunrise: '05:40', sunset: '18:59', abhijitStart: '11:50', abhijitEnd: '12:39', rahuStart: '12:05', rahuEnd: '13:37', nakshatra: 'Rohini', tithi: 'Tritiya' },
  2026: { date: '2026-04-19', day: 'Sunday', sunrise: '05:51', sunset: '18:52', abhijitStart: '11:52', abhijitEnd: '12:40', rahuStart: '16:22', rahuEnd: '17:52', nakshatra: 'Rohini', tithi: 'Tritiya' },
  2027: { date: '2027-05-09', day: 'Sunday', sunrise: '05:30', sunset: '19:07', abhijitStart: '11:49', abhijitEnd: '12:38', rahuStart: '16:26', rahuEnd: '17:59', nakshatra: 'Krittika', tithi: 'Tritiya' },
  2028: { date: '2028-04-26', day: 'Wednesday', sunrise: '05:43', sunset: '18:57', abhijitStart: '11:50', abhijitEnd: '12:39', rahuStart: '12:04', rahuEnd: '13:36', nakshatra: 'Rohini', tithi: 'Tritiya' },
  2029: { date: '2029-04-16', day: 'Monday', sunrise: '05:53', sunset: '18:50', abhijitStart: '11:52', abhijitEnd: '12:40', rahuStart: '07:27', rahuEnd: '08:58', nakshatra: 'Rohini', tithi: 'Tritiya' },
  2030: { date: '2030-05-06', day: 'Monday', sunrise: '05:33', sunset: '19:04', abhijitStart: '11:49', abhijitEnd: '12:38', rahuStart: '07:27', rahuEnd: '09:01', nakshatra: 'Krittika', tithi: 'Tritiya' }
};

// Major Indian Cities with complete data
const INDIAN_CITIES = [
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lon: 72.8777 },
  { name: 'Delhi', state: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lon: 77.5946 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lon: 88.3639 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lon: 78.4867 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lon: 73.8567 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lon: 72.5714 },
  { name: 'Surat', state: 'Gujarat', lat: 21.1702, lon: 72.8311 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lon: 75.7873 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462 },
  { name: 'Kanpur', state: 'Uttar Pradesh', lat: 26.4499, lon: 80.3319 },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lon: 79.0882 },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lon: 75.8577 },
  { name: 'Thane', state: 'Maharashtra', lat: 19.2183, lon: 72.9781 },
  { name: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lon: 77.4126 },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lon: 83.2185 },
  { name: 'Pimpri-Chinchwad', state: 'Maharashtra', lat: 18.6298, lon: 73.7997 },
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
  { name: 'Srinagar', state: 'Jammu and Kashmir', lat: 34.0837, lon: 74.7973 },
  { name: 'Aurangabad', state: 'Maharashtra', lat: 19.8762, lon: 75.3433 }
];

// Auspicious activities for Akshaya Tritiya
const AUSPICIOUS_ACTIVITIES = [
  {
    icon: Coins,
    title: 'Buy Gold & Silver',
    description: 'Purchase precious metals for lasting prosperity. Even small amounts bring blessings.',
    color: 'from-yellow-500 to-amber-500',
    timing: 'Entire day auspicious'
  },
  {
    icon: TrendingUp,
    title: 'Start Investments',
    description: 'Begin SIP, mutual funds, stocks or FD. Investments made today multiply with divine blessings.',
    color: 'from-green-500 to-emerald-500',
    timing: 'Morning hours best'
  },
  {
    icon: DollarSign,
    title: 'Business Ventures',
    description: 'Launch new business, sign partnerships, or open office/shop for eternal success.',
    color: 'from-blue-500 to-cyan-500',
    timing: 'Abhijit Muhurat ideal'
  },
  {
    icon: Heart,
    title: 'Charity & Donations',
    description: 'Donate food, clothes, money to needy. Charity today brings infinite returns.',
    color: 'from-pink-500 to-rose-500',
    timing: 'Any time of day'
  },
  {
    icon: Gift,
    title: 'Property Purchase',
    description: 'Buy land, house, or vehicle. Property purchased today brings eternal wealth.',
    color: 'from-purple-500 to-indigo-500',
    timing: 'After sunrise'
  },
  {
    icon: BookOpen,
    title: 'Education & Learning',
    description: 'Start new course, buy books, or begin studies for knowledge that never diminishes.',
    color: 'from-orange-500 to-red-500',
    timing: 'Morning preferred'
  }
];

const AkshayaTritiyaMuhurat: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCity, setSelectedCity] = useState(INDIAN_CITIES[0]);
  const [searchCity, setSearchCity] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdownTime, setCountdownTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
  const akshayaData = AKSHAYA_TRITIYA_DATA[selectedYear as keyof typeof AKSHAYA_TRITIYA_DATA];

  // Filter cities
  const filteredCities = useMemo(() => {
    if (!searchCity) return INDIAN_CITIES;
    const query = searchCity.toLowerCase();
    return INDIAN_CITIES.filter(city => 
      city.name.toLowerCase().includes(query) || 
      city.state.toLowerCase().includes(query)
    );
  }, [searchCity]);

  // Live countdown to Akshaya Tritiya
  useEffect(() => {
    if (!akshayaData) return;

    const updateCountdown = () => {
      const akshayaDate = new Date(akshayaData.date);
      const now = new Date();
      const diff = akshayaDate.getTime() - now.getTime();
      
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
  }, [akshayaData]);

  const shareUrl = `https://moneycal.in/festival-tools/akshaya-tritiya-muhurat?year=${selectedYear}&city=${selectedCity.name}`;
  const shareText = `Akshaya Tritiya ${selectedYear} on ${new Date(akshayaData?.date || '').toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })} (${akshayaData?.day}). Best time to buy gold: ${akshayaData?.abhijitStart}-${akshayaData?.abhijitEnd} in ${selectedCity.name}. Entire day auspicious! 🪙✨`;

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

  // Generate structured data schemas
  const faqSchema = useMemo(() => akshayaData ? generateAkshayaTritiyaFAQSchema({
    year: selectedYear,
    date: new Date(akshayaData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    city: selectedCity.name,
    abhijitStart: akshayaData.abhijitStart,
    abhijitEnd: akshayaData.abhijitEnd,
    rahuStart: akshayaData.rahuStart,
    rahuEnd: akshayaData.rahuEnd
  }) : null, [akshayaData, selectedYear, selectedCity]);

  const eventSchema = useMemo(() => akshayaData ? generateAkshayaTritiyaEventSchema({
    year: selectedYear,
    date: akshayaData.date,
    city: selectedCity.name,
    abhijitStart: akshayaData.abhijitStart,
    abhijitEnd: akshayaData.abhijitEnd,
    rahuStart: akshayaData.rahuStart,
    rahuEnd: akshayaData.rahuEnd
  }) : null, [akshayaData, selectedYear, selectedCity]);

  const howToSchema = useMemo(() => generateHowToSchema(), []);
  const breadcrumbSchema = useMemo(() => generateBreadcrumbSchema(selectedCity.name), [selectedCity]);

  return (
    <>
      <SEOHelmet
        title={`Akshaya Tritiya ${selectedYear} Muhurat ${selectedCity.name} - Best Time to Buy Gold, Silver, Start Investments | Complete Shubh Muhurat Guide`}
        description={`Akshaya Tritiya ${selectedYear} on ${new Date(akshayaData?.date || '').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', weekday: 'long' })} in ${selectedCity.name}. Abhijit Muhurat: ${akshayaData?.abhijitStart}-${akshayaData?.abhijitEnd}. Best time to buy gold, silver, start investments, business! Entire day auspicious - no muhurat needed. Complete guide for ${selectedYear}.`}
        keywords={`akshaya tritiya ${selectedYear} muhurat, akshaya tritiya ${selectedYear} ${selectedCity.name.toLowerCase()}, akshaya tritiya gold buying time ${selectedYear}, best time to buy gold akshaya tritiya, akshaya tritiya ${selectedYear} date, akshaya tritiya investment muhurat, abhijit muhurat akshaya tritiya, akshaya tritiya business start time, akshaya tritiya ${selectedYear} india, akshaya tritiya shubh muhurat ${selectedYear}`}
        url={`/festival-tools/akshaya-tritiya-muhurat?year=${selectedYear}&city=${selectedCity.name}`}
        type="website"
      />
      
      {/* JSON-LD Structured Data for Rich Results */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {eventSchema && (
        <script type="application/ld+json">
          {JSON.stringify(eventSchema)}
        </script>
      )}
      <script type="application/ld+json">
        {JSON.stringify(howToSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600 flex-wrap">
              <Link to="/" className="hover:text-yellow-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-yellow-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-dates" className="hover:text-yellow-600 transition-colors">
                Festival Dates
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-yellow-600 font-medium">Akshaya Tritiya Muhurat</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-full mb-6">
                <Coins className="w-5 h-5" />
                <span className="font-semibold">Day of Eternal Prosperity | No Muhurat Needed</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                Akshaya Tritiya {selectedYear} Shubh Muhurat
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Find exact Shubh Muhurat for gold buying, investments & business in {selectedCity.name}! The entire day is auspicious - perfect for starting anything new with divine blessings.
              </p>

              {/* Live Countdown */}
              {akshayaData && countdownTime.days > 0 && countdownTime.days < 365 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="max-w-4xl mx-auto mb-8"
                >
                  <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-8 rounded-3xl shadow-2xl">
                    <h2 className="text-white text-2xl font-bold mb-6">
                      ⏰ Countdown to Akshaya Tritiya {selectedYear}
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
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-yellow-200">
                {/* Controls */}
                <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-8">
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
                            Akshaya Tritiya {year}
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
                                className="w-full px-4 py-2 text-left hover:bg-yellow-50 transition-colors border-b border-gray-100 last:border-b-0"
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
                {akshayaData && (
                  <div className="p-8">
                    {/* Main Date Card */}
                    <div className="text-center mb-8 pb-8 border-b-2 border-yellow-100">
                      <div className="inline-flex items-center justify-center mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                          <Coins className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Akshaya Tritiya {selectedYear}</h2>
                      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
                        {new Date(akshayaData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                      </div>
                      <div className="text-2xl text-gray-600 font-semibold mb-4">{akshayaData.day}</div>
                      <div className="flex flex-wrap items-center justify-center gap-4">
                        <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
                          <Star className="w-4 h-4" />
                          <span className="font-semibold">Tithi: {akshayaData.tithi}</span>
                        </div>
                        <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
                          <Sparkles className="w-4 h-4" />
                          <span className="font-semibold">Nakshatra: {akshayaData.nakshatra}</span>
                        </div>
                      </div>
                    </div>

                    {/* Special Notice */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-300 mb-8">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 mb-2">✨ Entire Day is Auspicious!</h3>
                          <p className="text-gray-700 leading-relaxed">
                            <strong>Akshaya Tritiya is one of the rare Hindu festivals where NO MUHURAT is needed!</strong> Unlike other days, you can buy gold, start business, make investments, or perform any auspicious activity <strong>at ANY time</strong> from sunrise to sunset. Every moment is blessed with divine prosperity.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Muhurat Timings */}
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl border-2 border-yellow-200 mb-8">
                      <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                        <Clock className="w-6 h-6 mr-2 text-yellow-600" />
                        Best Muhurat Timings for {selectedCity.name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                              <Sunrise className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">Sunrise</div>
                              <div className="text-xs text-gray-600">Day begins</div>
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-orange-600">{akshayaData.sunrise}</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                              <Sunset className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">Sunset</div>
                              <div className="text-xs text-gray-600">Day ends</div>
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-red-600">{akshayaData.sunset}</p>
                        </div>
                      </div>
                    </div>

                    {/* Abhijit Muhurat & Rahu Kaal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-300">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                            <Target className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Abhijit Muhurat ⭐</h3>
                        </div>
                        <p className="text-3xl font-bold text-green-600 mb-2">
                          {akshayaData.abhijitStart} - {akshayaData.abhijitEnd}
                        </p>
                        <p className="text-sm text-gray-700 mb-3">
                          Most auspicious time window - perfect for major purchases like gold, property, or starting business ventures.
                        </p>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-600 font-semibold">
                            ✅ Best for: Gold buying, investment start, business launch, property purchase
                          </p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border-2 border-red-300">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                            <X className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Rahu Kaal ⚠️</h3>
                        </div>
                        <p className="text-3xl font-bold text-red-600 mb-2">
                          {akshayaData.rahuStart} - {akshayaData.rahuEnd}
                        </p>
                        <p className="text-sm text-gray-700 mb-3">
                          Inauspicious period. While Akshaya Tritiya is powerful, avoid major financial transactions during Rahu Kaal for best results.
                        </p>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-600 font-semibold">
                            ❌ Avoid: Starting new ventures, signing contracts, major purchases during this window
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Auspicious Activities */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        🪙 Auspicious Activities on Akshaya Tritiya {selectedYear}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {AUSPICIOUS_ACTIVITIES.map((activity, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-gradient-to-br ${activity.color} p-6 rounded-2xl shadow-lg text-white`}
                          >
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                <activity.icon className="w-6 h-6 text-white" />
                              </div>
                              <h4 className="font-bold text-lg">{activity.title}</h4>
                            </div>
                            <p className="text-sm mb-3 opacity-90">{activity.description}</p>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                              <p className="text-xs font-semibold">⏰ {activity.timing}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      <button
                        onClick={() => window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akshaya+Tritiya+${selectedYear}&dates=${akshayaData.date.replace(/-/g, '')}/${akshayaData.date.replace(/-/g, '')}&details=Best+time+for+gold+buying:+${akshayaData.abhijitStart}-${akshayaData.abhijitEnd}&location=${selectedCity.name}`, '_blank')}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                      >
                        <Download className="w-5 h-5" />
                        <span>Add to Calendar</span>
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => setShowShareMenu(!showShareMenu)}
                          className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-yellow-600 text-yellow-600 rounded-xl font-bold hover:bg-yellow-50 transition-all"
                        >
                          <Share2 className="w-5 h-5" />
                          <span>Share Muhurat</span>
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
                                onClick={() => handleShare('facebook')}
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-blue-50 rounded-lg"
                              >
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                  <Share2 className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-semibold">Facebook</span>
                              </button>
                              <button
                                onClick={() => handleShare('twitter')}
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sky-50 rounded-lg"
                              >
                                <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                                  <Share2 className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-semibold">Twitter</span>
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
                        <span>Print Muhurat</span>
                      </button>
                    </div>

                    {/* Gold Buying Tips */}
                    <div className="bg-gradient-to-r from-yellow-100 to-amber-100 p-6 rounded-2xl border-2 border-yellow-400 mb-8">
                      <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                        <Coins className="w-6 h-6 mr-2 text-yellow-600" />
                        🪙 Gold Buying Tips for Akshaya Tritiya {selectedYear}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-bold text-gray-900 mb-2">✅ Do's</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Buy gold coins or jewelry from certified jewelers</li>
                            <li>• Check gold purity (hallmark certification)</li>
                            <li>• Compare making charges across shops</li>
                            <li>• Buy digital gold if physical not possible</li>
                            <li>• Keep purchase receipt for warranty</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-bold text-gray-900 mb-2">❌ Don'ts</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Avoid buying from unverified sellers</li>
                            <li>• Don't ignore GST and making charges</li>
                            <li>• Avoid buying during Rahu Kaal time</li>
                            <li>• Don't make emotional purchase decisions</li>
                            <li>• Avoid loans for gold purchase if possible</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Investment Links */}
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-2xl border-2 border-green-400">
                      <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                        <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                        💰 Start Your Investment Journey
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <a href="https://www.tanishq.co.in/" target="_blank" rel="noopener noreferrer" className="bg-white p-3 rounded-lg hover:shadow-md transition-all text-center">
                          <ExternalLink className="w-5 h-5 mx-auto mb-1 text-yellow-600" />
                          <span className="text-xs font-semibold">Tanishq Gold</span>
                        </a>
                        <a href="https://www.caratlane.com/" target="_blank" rel="noopener noreferrer" className="bg-white p-3 rounded-lg hover:shadow-md transition-all text-center">
                          <ExternalLink className="w-5 h-5 mx-auto mb-1 text-yellow-600" />
                          <span className="text-xs font-semibold">CaratLane</span>
                        </a>
                        <a href="https://www.zerodha.com/" target="_blank" rel="noopener noreferrer" className="bg-white p-3 rounded-lg hover:shadow-md transition-all text-center">
                          <ExternalLink className="w-5 h-5 mx-auto mb-1 text-green-600" />
                          <span className="text-xs font-semibold">Zerodha</span>
                        </a>
                        <a href="https://www.groww.in/" target="_blank" rel="noopener noreferrer" className="bg-white p-3 rounded-lg hover:shadow-md transition-all text-center">
                          <ExternalLink className="w-5 h-5 mx-auto mb-1 text-green-600" />
                          <span className="text-xs font-semibold">Groww</span>
                        </a>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Festival & Finance Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/calculators/gold-calculator" className="group bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl border-2 border-yellow-200 hover:shadow-xl transition-all">
                <Coins className="w-10 h-10 text-yellow-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Gold Calculator</h4>
                <p className="text-gray-600 text-sm mb-3">Calculate gold value by weight</p>
                <div className="flex items-center text-yellow-600 font-semibold group-hover:gap-2 transition-all">
                  Calculate Now
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/calculators/sip-calculator" className="group bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200 hover:shadow-xl transition-all">
                <TrendingUp className="w-10 h-10 text-green-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">SIP Calculator</h4>
                <p className="text-gray-600 text-sm mb-3">Plan your investments</p>
                <div className="flex items-center text-green-600 font-semibold group-hover:gap-2 transition-all">
                  Start Planning
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

        {/* SEO Content Section */}
        <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 prose prose-lg max-w-none">
            <h2 className="text-4xl font-bold mb-8">Akshaya Tritiya {selectedYear} Complete Muhurat Guide - {selectedCity.name}</h2>

            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-4">When is Akshaya Tritiya {selectedYear} and Why is it Special?</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Akshaya Tritiya {selectedYear} falls on {new Date(akshayaData?.date || '').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong> in {selectedCity.name}. The word "Akshaya" means "eternal" or "never diminishing" in Sanskrit, making this one of the most auspicious days in the Hindu calendar for starting new ventures, making investments, and purchasing gold or property.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>What makes Akshaya Tritiya unique?</strong> Unlike most Hindu festivals that require specific muhurat timings, <strong>the ENTIRE day from sunrise ({akshayaData?.sunrise}) to sunset ({akshayaData?.sunset}) is considered auspicious</strong>. You don't need to consult a priest or wait for a specific time - any moment during the day is perfect for starting something new!
              </p>

              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl mb-6">
                <h4 className="font-bold mb-3 text-lg">🌟 Key Highlights for {selectedYear}:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-3 rounded-lg">
                    <strong>📅 Date:</strong> {new Date(akshayaData?.date || '').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <strong>⭐ Tithi:</strong> {akshayaData?.tithi} (Shukla Paksha, Vaishakha)
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <strong>🌙 Nakshatra:</strong> {akshayaData?.nakshatra}
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <strong>⏰ Best Muhurat:</strong> {akshayaData?.abhijitStart} - {akshayaData?.abhijitEnd}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2 flex items-center">
                    <Sunrise className="w-5 h-5 mr-2 text-orange-600" />
                    Sunrise in {selectedCity.name}
                  </h4>
                  <p className="text-3xl font-bold text-orange-600 mb-2">{akshayaData?.sunrise}</p>
                  <p className="text-sm text-gray-700">Auspicious time begins</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2 flex items-center">
                    <Sunset className="w-5 h-5 mr-2 text-red-600" />
                    Sunset in {selectedCity.name}
                  </h4>
                  <p className="text-3xl font-bold text-red-600 mb-2">{akshayaData?.sunset}</p>
                  <p className="text-sm text-gray-700">Auspicious time ends</p>
                </div>
              </div>
            </div>

            {/* Shopping Links */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-2xl mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <ShoppingBag className="w-6 h-6 mr-2 text-yellow-600" />
                🛒 Best Places to Buy Gold on Akshaya Tritiya {selectedYear}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-3">Physical Gold Jewelers:</h4>
                  <div className="space-y-2">
                    <a href="https://www.tanishq.co.in/" target="_blank" rel="noopener noreferrer" className="flex items-center text-yellow-700 hover:underline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Tanishq - Trusted Gold Jewelry
                    </a>
                    <a href="https://www.caratlane.com/" target="_blank" rel="noopener noreferrer" className="flex items-center text-yellow-700 hover:underline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      CaratLane - Online Jewelry Store
                    </a>
                    <a href="https://www.malabargroup.com/" target="_blank" rel="noopener noreferrer" className="flex items-center text-yellow-700 hover:underline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Malabar Gold & Diamonds
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-3">Digital Gold Platforms:</h4>
                  <div className="space-y-2">
                    <a href="https://www.paytm.com/digital-gold" target="_blank" rel="noopener noreferrer" className="flex items-center text-yellow-700 hover:underline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Paytm Digital Gold
                    </a>
                    <a href="https://www.phonepe.com/" target="_blank" rel="noopener noreferrer" className="flex items-center text-yellow-700 hover:underline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      PhonePe Gold
                    </a>
                    <a href="https://www.googlepay.com/" target="_blank" rel="noopener noreferrer" className="flex items-center text-yellow-700 hover:underline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Google Pay Gold
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Historical Gold Price Trends */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl border-2 border-amber-200 mb-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-amber-600" />
                📈 Historical Gold Prices on Akshaya Tritiya (₹ per 10g)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-amber-100">
                      <th className="p-3 font-bold border-b-2 border-amber-300">Year</th>
                      <th className="p-3 font-bold border-b-2 border-amber-300">24K Gold</th>
                      <th className="p-3 font-bold border-b-2 border-amber-300">22K Gold</th>
                      <th className="p-3 font-bold border-b-2 border-amber-300">YoY Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HISTORICAL_GOLD_PRICES.map((data) => (
                      <tr key={data.year} className={`${data.year === selectedYear ? 'bg-amber-200 font-bold' : 'bg-white'} hover:bg-amber-50 transition-colors`}>
                        <td className="p-3 border-b border-amber-200">{data.year}</td>
                        <td className="p-3 border-b border-amber-200">₹{data.price24k.toLocaleString()}</td>
                        <td className="p-3 border-b border-amber-200">₹{data.price22k.toLocaleString()}</td>
                        <td className="p-3 border-b border-amber-200">
                          <span className={`inline-flex items-center ${data.growth > 10 ? 'text-green-600' : 'text-blue-600'}`}>
                            <TrendingUp className="w-4 h-4 mr-1" />
                            +{data.growth}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-4 italic">
                * Prices are approximate and vary by city and jeweler. Gold purchased on Akshaya Tritiya historically shows strong long-term appreciation.
              </p>
            </div>

            {/* Comparison: Akshaya Tritiya vs Other Auspicious Days */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 border-2 border-purple-200">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Star className="w-6 h-6 mr-2 text-purple-600" />
                ⚖️ Akshaya Tritiya vs Other Auspicious Days for Gold Buying
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-purple-100">
                      <th className="p-3 font-bold border-b-2 border-purple-300">Feature</th>
                      <th className="p-3 font-bold border-b-2 border-purple-300">Akshaya Tritiya</th>
                      <th className="p-3 font-bold border-b-2 border-purple-300">Dhanteras</th>
                      <th className="p-3 font-bold border-b-2 border-purple-300">Regular Day</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white hover:bg-purple-50">
                      <td className="p-3 border-b border-purple-200 font-semibold">Muhurat Required?</td>
                      <td className="p-3 border-b border-purple-200">
                        <span className="text-green-600 font-bold">❌ No - Entire day auspicious!</span>
                      </td>
                      <td className="p-3 border-b border-purple-200">
                        <span className="text-orange-600">✅ Yes - Specific timings needed</span>
                      </td>
                      <td className="p-3 border-b border-purple-200">
                        <span className="text-red-600">✅ Yes - Must consult pandit</span>
                      </td>
                    </tr>
                    <tr className="bg-purple-50 hover:bg-purple-100">
                      <td className="p-3 border-b border-purple-200 font-semibold">Spiritual Significance</td>
                      <td className="p-3 border-b border-purple-200">⭐⭐⭐⭐⭐ "Never Diminishing"</td>
                      <td className="p-3 border-b border-purple-200">⭐⭐⭐⭐ Wealth Goddess worship</td>
                      <td className="p-3 border-b border-purple-200">⭐⭐ Depends on nakshatra</td>
                    </tr>
                    <tr className="bg-white hover:bg-purple-50">
                      <td className="p-3 border-b border-purple-200 font-semibold">Gold Prices</td>
                      <td className="p-3 border-b border-purple-200">📈 Often elevated due to demand</td>
                      <td className="p-3 border-b border-purple-200">📈 Peak festival season</td>
                      <td className="p-3 border-b border-purple-200">➡️ Market rates</td>
                    </tr>
                    <tr className="bg-purple-50 hover:bg-purple-100">
                      <td className="p-3 border-b border-purple-200 font-semibold">Activities Permitted</td>
                      <td className="p-3 border-b border-purple-200">✅ Gold, investments, business, property, charity - ALL</td>
                      <td className="p-3 border-b border-purple-200">✅ Gold, silver, utensils, vehicles</td>
                      <td className="p-3 border-b border-purple-200">✅ Depends on personal horoscope</td>
                    </tr>
                    <tr className="bg-white hover:bg-purple-50">
                      <td className="p-3 border-b border-purple-200 font-semibold">Crowd at Jewelers</td>
                      <td className="p-3 border-b border-purple-200">👥👥👥👥 Very High</td>
                      <td className="p-3 border-b border-purple-200">👥👥👥👥👥 Extremely High</td>
                      <td className="p-3 border-b border-purple-200">👥 Normal</td>
                    </tr>
                    <tr className="bg-purple-50 hover:bg-purple-100">
                      <td className="p-3 border-b border-purple-200 font-semibold">Best For</td>
                      <td className="p-3 border-b border-purple-200 font-bold text-green-700">
                        🏆 Investments, starting new ventures, eternal wealth
                      </td>
                      <td className="p-3 border-b border-purple-200">
                        Goddess Lakshmi blessings, traditional gold
                      </td>
                      <td className="p-3 border-b border-purple-200">
                        Planned purchases, better negotiation
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Video Tutorial Section */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-2xl border-2 border-red-200 mb-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Star className="w-6 h-6 mr-2 text-red-600" />
                📺 Akshaya Tritiya {selectedYear} - Complete Video Guide
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <div className="aspect-video bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg mb-3 flex items-center justify-center">
                    <div className="text-center">
                      <ExternalLink className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-700">Gold Buying Guide Video</p>
                    </div>
                  </div>
                  <h4 className="font-bold mb-2">How to Buy Gold on Akshaya Tritiya</h4>
                  <p className="text-sm text-gray-600 mb-3">Complete guide with tips on purity checking, making charges, and certification</p>
                  <a href="https://www.youtube.com/results?search_query=akshaya+tritiya+gold+buying+guide" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline flex items-center text-sm font-semibold">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Watch on YouTube
                  </a>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg mb-3 flex items-center justify-center">
                    <div className="text-center">
                      <ExternalLink className="w-12 h-12 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-700">Puja Vidhi Tutorial</p>
                    </div>
                  </div>
                  <h4 className="font-bold mb-2">Akshaya Tritiya Puja at Home</h4>
                  <p className="text-sm text-gray-600 mb-3">Step-by-step Lakshmi puja vidhi, mantras, and offerings for prosperity</p>
                  <a href="https://www.youtube.com/results?search_query=akshaya+tritiya+puja+vidhi" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline flex items-center text-sm font-semibold">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </div>

            {/* Hindi Translation Section */}
            <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-8 rounded-2xl border-2 border-orange-300 mb-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-orange-600" />
                🇮🇳 हिंदी में अक्षय तृतीया {selectedYear} (Hindi)
              </h3>
              <div className="bg-white p-6 rounded-xl mb-4">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {HINDI_TRANSLATIONS.akshayaTritiya} {selectedYear} - {selectedCity.name}
                </h4>
                <div className="space-y-3 text-gray-700">
                  <p><strong>📅 तिथि:</strong> {new Date(akshayaData?.date || '').toLocaleDateString('hi-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                  <p><strong>🌅 सूर्योदय:</strong> {akshayaData?.sunrise} ({HINDI_TRANSLATIONS.sunrise})</p>
                  <p><strong>🌇 सूर्यास्त:</strong> {akshayaData?.sunset} ({HINDI_TRANSLATIONS.sunset})</p>
                  <p><strong>⭐ अभिजीत मुहूर्त:</strong> {akshayaData?.abhijitStart} - {akshayaData?.abhijitEnd}</p>
                  <p><strong>⚠️ राहु काल:</strong> {akshayaData?.rahuStart} - {akshayaData?.rahuEnd}</p>
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-orange-500">
                <p className="text-gray-700 leading-relaxed">
                  <strong>अक्षय तृतीया</strong> को सोना खरीदने, नया व्यवसाय शुरू करने, संपत्ति खरीदने और निवेश करने के लिए सबसे शुभ दिन माना जाता है। 
                  इस दिन खरीदा गया सोना और किया गया निवेश कभी नहीं घटता - यह हमेशा बढ़ता रहता है। 
                  पूरा दिन शुभ है, कोई विशेष मुहूर्त देखने की जरूरत नहीं।
                </p>
              </div>
            </div>

            {/* Visual Infographic Section */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 border-2 border-blue-200">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Info className="w-6 h-6 mr-2 text-blue-600" />
                📊 Akshaya Tritiya {selectedYear} - Quick Visual Guide
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl border-2 border-yellow-200">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coins className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-center text-lg mb-3">What to Buy?</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ Gold coins (1g, 5g, 10g)</li>
                    <li>✅ Gold jewelry</li>
                    <li>✅ Digital gold</li>
                    <li>✅ Silver items</li>
                    <li>✅ Gold ETFs</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                  <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-center text-lg mb-3">Best Timing</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>⏰ Abhijit: {akshayaData?.abhijitStart}-{akshayaData?.abhijitEnd}</li>
                    <li>🌅 After Sunrise: {akshayaData?.sunrise}</li>
                    <li>🕐 Morning 9AM-12PM</li>
                    <li>❌ Avoid: {akshayaData?.rahuStart}-{akshayaData?.rahuEnd}</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                  <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-center text-lg mb-3">Rituals</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>🛁 Early morning bath</li>
                    <li>🙏 Lakshmi-Ganesha puja</li>
                    <li>🪔 Light diya</li>
                    <li>🎵 Chant mantras</li>
                    <li>💝 Donate to needy</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* FAQs Section */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <h3 className="text-3xl font-bold mb-6">Frequently Asked Questions - Akshaya Tritiya {selectedYear}</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-yellow-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">1. What is the best time to buy gold on Akshaya Tritiya {selectedYear}?</h4>
                  <p className="text-gray-700">
                    <strong>The entire day from sunrise ({akshayaData?.sunrise}) to sunset ({akshayaData?.sunset}) is auspicious on Akshaya Tritiya!</strong> You don't need a specific muhurat. However, <strong>Abhijit Muhurat ({akshayaData?.abhijitStart} - {akshayaData?.abhijitEnd})</strong> is considered the most powerful time window. Avoid <strong>Rahu Kaal ({akshayaData?.rahuStart} - {akshayaData?.rahuEnd})</strong> for best results.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">2. Why is Akshaya Tritiya considered auspicious for gold buying?</h4>
                  <p className="text-gray-700">
                    <strong>Akshaya means "never diminishing" or "eternal"</strong>. According to Hindu mythology, <strong>Lord Kuber (God of Wealth) and Goddess Lakshmi (Goddess of Prosperity) bless every purchase made on this day</strong>. Gold bought on Akshaya Tritiya is believed to multiply wealth and bring eternal prosperity. This day marks the beginning of Treta Yuga when Lord Vishnu took his Parshurama avatar. It's also when Lord Krishna's childhood friend Sudama visited him and received eternal wealth.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">3. What other investments can I start on Akshaya Tritiya {selectedYear}?</h4>
                  <p className="text-gray-700">
                    <strong>Beyond gold, Akshaya Tritiya is perfect for:</strong> Starting Systematic Investment Plans (SIP) in mutual funds, buying stocks or equities, opening Fixed Deposits or Recurring Deposits, investing in real estate or property, purchasing silver or other precious metals, buying digital gold, starting a new business venture, opening a new bank account for savings, and making charitable donations. <strong>All financial activities get the blessing of eternal growth on this day!</strong>
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">4. Do I need to do any puja or rituals before buying gold on Akshaya Tritiya?</h4>
                  <p className="text-gray-700">
                    <strong>No mandatory rituals are required</strong>, but traditional families prefer to: Take a bath early morning, wear clean traditional clothes, offer prayers to Lord Ganesha and Goddess Lakshmi at home, light a diya (lamp) before shopping, chant "Om Shreem Mahalakshmiyei Namah" 108 times, and donate to the needy. <strong>However, the day itself is so auspicious that simply purchasing gold with a pure heart and positive intention brings blessings.</strong>
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">5. What is the significance of the Tritiya Tithi and Nakshatra on Akshaya Tritiya {selectedYear}?</h4>
                  <p className="text-gray-700">
                    <strong>Tritiya ({akshayaData?.tithi}) is the third day (tithi) of Shukla Paksha (waxing moon) in the Vaishakha month</strong> (April-May). When Tritiya combines with <strong>{akshayaData?.nakshatra} Nakshatra</strong>, it creates a highly auspicious planetary alignment. <strong>{akshayaData?.nakshatra} is considered one of the most favorable nakshatras</strong> for material prosperity and wealth accumulation. This rare combination happens once a year and is why Akshaya Tritiya {selectedYear} is such a powerful day for wealth creation.
                  </p>
                </div>

                <div className="border-l-4 border-pink-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">6. Is digital gold purchase on Akshaya Tritiya as auspicious as physical gold?</h4>
                  <p className="text-gray-700">
                    <strong>Yes! Digital gold purchased on Akshaya Tritiya carries the same spiritual and auspicious benefits as physical gold.</strong> Apps like Paytm, PhonePe, and Google Pay allow you to buy gold starting from ₹1. Digital gold is 24K pure, has no making charges, can be converted to physical gold later, is stored securely in vaults, and is perfect for small investors or those who cannot visit jewelry stores. <strong>The blessings of the day apply to the intention and act of investing, not the format!</strong>
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">7. What activities should be avoided on Akshaya Tritiya?</h4>
                  <p className="text-gray-700">
                    While Akshaya Tritiya is highly auspicious, it's best to <strong>avoid during Rahu Kaal ({akshayaData?.rahuStart} - {akshayaData?.rahuEnd})</strong> in {selectedCity.name}. Also avoid: starting major activities during Rahu Kaal, borrowing money or taking loans (day is for wealth creation, not debt), selling existing gold or property (day is for accumulation), engaging in negative thoughts or conflicts, and making impulsive purchases without research. <strong>Focus on positive, growth-oriented activities that align with the day's eternal prosperity energy.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* External Resources */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border-2 border-indigo-200 mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <ExternalLink className="w-6 h-6 mr-2 text-indigo-600" />
                Trusted Resources & References
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a href="https://www.drikpanchang.com/festivals/akshaya-tritiya/akshaya-tritiya-date-time.html" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Drik Panchang - Akshaya Tritiya Authority
                </a>
                <a href="https://en.wikipedia.org/wiki/Akshaya_Tritiya" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Wikipedia - Akshaya Tritiya History
                </a>
                <a href="https://www.bseindia.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  BSE - Bombay Stock Exchange
                </a>
                <a href="https://www.goldprice.org/gold-price-india.html" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Today's Gold Rate in India
                </a>
              </div>
            </div>

            {/* Internal Tool Links */}
            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-8 rounded-2xl">
              <h3 className="text-3xl font-bold mb-6 text-center">More Festival & Finance Tools on MoneyCal</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/calculators/gold-calculator" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-all">
                  <Coins className="w-8 h-8 mb-2" />
                  <h4 className="font-bold text-lg">Gold Price Calculator</h4>
                  <p className="text-sm opacity-90">Calculate gold value by weight & purity</p>
                </Link>
                <Link to="/calculators/sip-calculator" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-all">
                  <TrendingUp className="w-8 h-8 mb-2" />
                  <h4 className="font-bold text-lg">SIP Calculator</h4>
                  <p className="text-sm opacity-90">Plan your systematic investments</p>
                </Link>
                <Link to="/calculators/investment-calculator" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-all">
                  <DollarSign className="w-8 h-8 mb-2" />
                  <h4 className="font-bold text-lg">Investment Calculator</h4>
                  <p className="text-sm opacity-90">Calculate investment returns</p>
                </Link>
                <Link to="/festival-dates" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-all">
                  <Calendar className="w-8 h-8 mb-2" />
                  <h4 className="font-bold text-lg">Festival Calendar {selectedYear}</h4>
                  <p className="text-sm opacity-90">All Hindu festival dates</p>
                </Link>
                <Link to="/festival-tools/diwali-date-finder" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-all">
                  <Star className="w-8 h-8 mb-2" />
                  <h4 className="font-bold text-lg">Diwali Muhurat {selectedYear}</h4>
                  <p className="text-sm opacity-90">Lakshmi puja timings</p>
                </Link>
                <Link to="/religious-tools" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-all">
                  <BookOpen className="w-8 h-8 mb-2" />
                  <h4 className="font-bold text-lg">All Religious Tools</h4>
                  <p className="text-sm opacity-90">Puja, muhurat & vrat calculators</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AkshayaTritiyaMuhurat;

