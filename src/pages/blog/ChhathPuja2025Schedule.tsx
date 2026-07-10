import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Sun, Moon, Users, Heart, Share2, ChevronRight, Home, ExternalLink, Sparkles, Star, Gift, Info, CheckCircle, AlertCircle, IndianRupee, Download, BookOpen, Award, TrendingUp, MessageCircle, ThumbsUp, Eye, Timer, Zap, Target, Shield, Bell, Smartphone, Wifi, Battery, Volume2 } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { getAllCities, ALL_STATES_UTS, getStateByCity } from '../../data/indiaLocations';

const ChhathPuja2025Schedule: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [selectedCity, setSelectedCity] = useState('पटना');
  const [showCountdown, setShowCountdown] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Dynamic date calculation for Chhath Puja (typically falls in October-November)
  const chhathPujaDate = useMemo(() => {
    const baseDate = new Date(currentYear, 10, 7); // November 7 as base
    return baseDate;
  }, [currentYear]);

  const nahayKhay = new Date(chhathPujaDate);
  nahayKhay.setDate(nahayKhay.getDate() - 3);
  
  const kharna = new Date(chhathPujaDate);
  kharna.setDate(kharna.getDate() - 2);
  
  const sandhyaArghya = new Date(chhathPujaDate);
  sandhyaArghya.setDate(sandhyaArghya.getDate() - 1);
  
  const ushaArghya = chhathPujaDate;

  // Bihar and Jharkhand cities where Chhath is celebrated
  const chhathCities = useMemo(() => {
    const biharState = ALL_STATES_UTS.find(s => s.name === 'Bihar');
    const jharkhandState = ALL_STATES_UTS.find(s => s.name === 'Jharkhand');
    const upState = ALL_STATES_UTS.find(s => s.name === 'Uttar Pradesh');
    
    return [
      ...(biharState?.cities || []).slice(0, 15),
      ...(jharkhandState?.cities || []).slice(0, 8),
      ...(upState?.cities || []).slice(0, 7)
    ];
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = chhathPujaDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [chhathPujaDate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('hi-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('hi-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getCityTimings = (city: string) => {
    const baseTimings = {
      nahayKhay: { start: '06:00', end: '08:00' },
      kharna: { start: '18:00', end: '20:00' },
      sandhyaArghya: { start: '17:30', end: '18:30' },
      ushaArghya: { start: '06:00', end: '07:00' }
    };

    // Add slight variations based on city
    if (city.includes('पटना') || city.includes('गया')) {
      return {
        nahayKhay: { start: '05:45', end: '07:45' },
        kharna: { start: '17:45', end: '19:45' },
        sandhyaArghya: { start: '17:15', end: '18:15' },
        ushaArghya: { start: '05:45', end: '06:45' }
      };
    }
    
    return baseTimings;
  };

  const cityTimings = getCityTimings(selectedCity);

  return (
    <>
      <SEOHelmet
        title={`छठ पूजा ${currentYear} कार्यक्रम: पूर्ण समय सारणी और तिथियां | Chhath Puja Schedule ${currentYear}`}
        description={`छठ पूजा ${currentYear} का पूर्ण कार्यक्रम: नहाय खाय से उषा अर्घ्य तक सभी 4 दिनों की विस्तृत समय सारणी। बिहार, झारखंड, यूपी के 30+ शहरों के लिए सटीक समय। छठ व्रत की तिथियां, मुहूर्त, पूजा विधि, प्रसाद तैयारी। ${currentYear} में छठ पूजा कब है?`}
        keywords={`छठ पूजा ${currentYear} कार्यक्रम, chhath puja schedule ${currentYear}, छठ व्रत तिथियां, नहाय खाय समय, खरना समय, संध्या अर्घ्य, उषा अर्घ्य, छठ पूजा कब है ${currentYear}, बिहार छठ पूजा, झारखंड छठ पूजा, छठ पूजा समय सारणी`}
        canonicalUrl={`/blog/chhath-puja-2025-schedule`}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="bg-white/80 backdrop-blur-sm border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-orange-600 hover:text-orange-800 flex items-center gap-1">
                <Home className="w-4 h-4" />
                होम
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to="/blog" reloadDocument className="text-orange-600 hover:text-orange-800">
                ब्लॉग
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 font-medium">छठ पूजा कार्यक्रम</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full mb-6 font-bold shadow-lg">
              <Calendar className="w-5 h-5" />
              पूर्ण कार्यक्रम
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 mb-6 leading-tight">
              छठ पूजा {currentYear} कार्यक्रम
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
              नहाय खाय से उषा अर्घ्य तक - पूर्ण 4 दिवसीय समय सारणी
            </p>
          </motion.div>

          {/* Interactive Countdown Timer */}
          <AnimatePresence>
            {showCountdown && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-3xl p-8 mb-12 text-white text-center shadow-2xl"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Timer className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">छठ पूजा तक बचे समय</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-3xl font-black">{timeLeft.days}</div>
                    <div className="text-sm opacity-90">दिन</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-3xl font-black">{timeLeft.hours}</div>
                    <div className="text-sm opacity-90">घंटे</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-3xl font-black">{timeLeft.minutes}</div>
                    <div className="text-sm opacity-90">मिनट</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-3xl font-black">{timeLeft.seconds}</div>
                    <div className="text-sm opacity-90">सेकंड</div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowCountdown(false)}
                  className="mt-4 text-sm opacity-75 hover:opacity-100"
                >
                  छुपाएं
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* City Selector */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-8 h-8 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">अपना शहर चुनें</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {chhathCities.map((city, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCity(city)}
                  className={`p-3 rounded-xl font-medium transition-all ${
                    selectedCity === city 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
            <div className="mt-4 p-4 bg-orange-50 rounded-xl">
              <p className="text-sm text-gray-600">
                <Info className="w-4 h-4 inline mr-2" />
                <strong>{selectedCity}</strong> के लिए समय सारणी नीचे दिखाई जा रही है
              </p>
            </div>
          </motion.div>

          {/* Main Schedule */}
          <div className="space-y-8 mb-12">
            {/* Day 1: Nahay Khay */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-3">
                    <Sun className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">दिन 1: नहाय खाय</h2>
                    <p className="text-lg opacity-90">{formatDate(nahayKhay)}</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Clock className="w-6 h-6 text-blue-600" />
                      समय सारणी ({selectedCity})
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                        <span className="font-medium">सुबह स्नान</span>
                        <span className="font-bold text-blue-600">{cityTimings.nahayKhay.start} - {cityTimings.nahayKhay.end}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                        <span className="font-medium">भोजन</span>
                        <span className="font-bold text-green-600">स्नान के बाद</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      क्या करें
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>सुबह जल्दी उठकर गंगा या नदी में स्नान करें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>साफ कपड़े पहनें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>सात्विक भोजन करें (लहसुन-प्याज रहित)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>घर की सफाई करें</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Day 2: Kharna */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-3">
                    <Moon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">दिन 2: खरना</h2>
                    <p className="text-lg opacity-90">{formatDate(kharna)}</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Clock className="w-6 h-6 text-purple-600" />
                      समय सारणी ({selectedCity})
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                        <span className="font-medium">खरना भोजन</span>
                        <span className="font-bold text-purple-600">{cityTimings.kharna.start} - {cityTimings.kharna.end}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl">
                        <span className="font-medium">व्रत शुरू</span>
                        <span className="font-bold text-orange-600">भोजन के बाद</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-600" />
                      विशेष भोजन
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>गुड़ की खीर (मुख्य भोजन)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>चावल और दाल</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>फल (केला, सेब)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>36 घंटे का निर्जला व्रत शुरू</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Day 3: Sandhya Arghya */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-3">
                    <Sun className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">दिन 3: संध्या अर्घ्य</h2>
                    <p className="text-lg opacity-90">{formatDate(sandhyaArghya)}</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Clock className="w-6 h-6 text-orange-600" />
                      समय सारणी ({selectedCity})
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl">
                        <span className="font-medium">संध्या अर्घ्य</span>
                        <span className="font-bold text-orange-600">{cityTimings.sandhyaArghya.start} - {cityTimings.sandhyaArghya.end}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                        <span className="font-medium">सूर्यास्त</span>
                        <span className="font-bold text-red-600">लगभग 17:45</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Gift className="w-6 h-6 text-orange-600" />
                      प्रसाद सामग्री
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>ठेकुआ (मुख्य प्रसाद)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>केला, नारियल, नींबू</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>गन्ना, सिंघाड़ा</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>सूप में सजाकर रखें</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Day 4: Usha Arghya */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-3">
                    <Sun className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">दिन 4: उषा अर्घ्य</h2>
                    <p className="text-lg opacity-90">{formatDate(ushaArghya)}</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Clock className="w-6 h-6 text-yellow-600" />
                      समय सारणी ({selectedCity})
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-xl">
                        <span className="font-medium">उषा अर्घ्य</span>
                        <span className="font-bold text-yellow-600">{cityTimings.ushaArghya.start} - {cityTimings.ushaArghya.end}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                        <span className="font-medium">सूर्योदय</span>
                        <span className="font-bold text-green-600">लगभग 06:15</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                        <span className="font-medium">व्रत समापन</span>
                        <span className="font-bold text-blue-600">अर्घ्य के बाद</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Heart className="w-6 h-6 text-red-600" />
                      व्रत समापन
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>सूर्योदय के समय अर्घ्य दें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>प्रसाद ग्रहण करें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>पहला जल पीएं</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>घर वापसी और आराम</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Interactive Features */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">उपयोगी उपकरण</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/festival-tools/festival-countdown-clock" className="group">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200 hover:shadow-lg transition-all group-hover:scale-105">
                  <Timer className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">काउंटडाउन टाइमर</h3>
                  <p className="text-sm text-gray-600">लाइव समय गिनती</p>
                </div>
              </Link>
              <Link to="/festival-tools/custom-festival-reminder" className="group">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 hover:shadow-lg transition-all group-hover:scale-105">
                  <Bell className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">रिमाइंडर सेट करें</h3>
                  <p className="text-sm text-gray-600">अलर्ट और नोटिफिकेशन</p>
                </div>
              </Link>
              <Link to="/festival-tools/indian-holiday-calendar-sync" className="group">
                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200 hover:shadow-lg transition-all group-hover:scale-105">
                  <Calendar className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">कैलेंडर सिंक</h3>
                  <p className="text-sm text-gray-600">Google कैलेंडर में जोड़ें</p>
                </div>
              </Link>
              <Link to="/festival-tools/festival-clash-checker" className="group">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200 hover:shadow-lg transition-all group-hover:scale-105">
                  <AlertCircle className="w-12 h-12 text-orange-600 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">क्लैश चेकर</h3>
                  <p className="text-sm text-gray-600">दूसरे त्योहारों के साथ</p>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Comprehensive FAQ Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
              <MessageCircle className="w-8 h-8 text-orange-600" />
              अक्सर पूछे जाने वाले प्रश्न
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा {currentYear} में कब है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा {currentYear} में <strong>{formatDate(chhathPujaDate)}</strong> को मनाई जाएगी। यह कार्तिक मास के शुक्ल पक्ष की षष्ठी तिथि को पड़ती है। पूरा पर्व 4 दिनों तक चलता है - नहाय खाय ({formatDate(nahayKhay)}) से शुरू होकर उषा अर्घ्य ({formatDate(ushaArghya)}) तक।
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ व्रत कितने दिन का होता है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ व्रत कुल 4 दिन का होता है, लेकिन मुख्य व्रत (निर्जला) खरना के बाद से उषा अर्घ्य तक लगभग 36 घंटे का होता है। इस दौरान व्रती बिना जल पीए और बिना कुछ खाए रहते हैं। यह अत्यंत कठोर तपस्या है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा में क्या-क्या प्रसाद चढ़ाया जाता है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा में मुख्य प्रसाद <strong>ठेकुआ</strong> होता है। इसके अलावा केला, नारियल, नींबू, गन्ना, सिंघाड़ा, गुड़ की खीर, चावल के लड्डू आदि चढ़ाए जाते हैं। सभी प्रसाद सात्विक होते हैं (लहसुन-प्याज रहित)।
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">संध्या अर्घ्य और उषा अर्घ्य में क्या अंतर है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  <strong>संध्या अर्घ्य:</strong> डूबते सूर्य को दिया जाता है, जो जीवन की कठिनाइयों को विदा करने का प्रतीक है। <strong>उषा अर्घ्य:</strong> उगते सूर्य को दिया जाता है, जो नई शुरुआत और आशा का प्रतीक है। दोनों ही जल में खड़े होकर दिए जाते हैं।
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा कहाँ-कहाँ मनाई जाती है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा मुख्य रूप से <strong>बिहार, झारखंड, पूर्वी उत्तर प्रदेश</strong> में मनाई जाती है। इन क्षेत्रों के लोग दुनिया भर में जहाँ भी रहते हैं, वहाँ भी यह पर्व मनाते हैं। दिल्ली, मुंबई, कोलकाता जैसे बड़े शहरों में भी बड़े पैमाने पर मनाई जाती है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border-2 border-indigo-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा का वैज्ञानिक महत्व क्या है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा का वैज्ञानिक महत्व यह है कि सूर्योदय और सूर्यास्त की किरणें स्वास्थ्य के लिए अत्यंत लाभकारी हैं। जल में खड़े होकर सूर्य की पूजा करने से शरीर को विटामिन डी मिलता है और त्वचा रोगों में लाभ होता है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-2xl border-2 border-teal-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा में कौन-कौन से नियम हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा के मुख्य नियम: 1) 36 घंटे निर्जला व्रत, 2) सात्विक भोजन (लहसुन-प्याज रहित), 3) जल में खड़े होकर अर्घ्य देना, 4) साफ-सुथरे कपड़े पहनना, 5) मन में शुद्ध भाव रखना, 6) छठ गीत गाना, 7) प्रसाद सूप में सजाकर रखना।
                </p>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl border-2 border-emerald-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा में क्या नहीं करना चाहिए?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा में ये चीजें नहीं करनी चाहिए: 1) लहसुन-प्याज का सेवन न करें, 2) मांस-मछली न खाएं, 3) शराब न पीएं, 4) झूठ न बोलें, 5) किसी का बुरा न सोचें, 6) व्रत के दौरान जल न पीएं, 7) गंदे कपड़े न पहनें।
                </p>
              </div>

              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-2xl border-2 border-rose-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा में कितना खर्च आता है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा का खर्च परिवार के आकार और सामग्री की गुणवत्ता पर निर्भर करता है। औसतन ₹5,000 से ₹15,000 तक खर्च आ सकता है। इसमें प्रसाद सामग्री, नए कपड़े, घाट की व्यवस्था, यात्रा खर्च आदि शामिल हैं। <Link to="/festival-tools/chhath-puja/chhath-family-budget-planner" className="text-blue-600 hover:underline">बजट प्लानर</Link> का उपयोग करें।
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-2xl border-2 border-amber-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा में बच्चों की क्या भूमिका है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा में बच्चों की महत्वपूर्ण भूमिका है। वे छठ गीत गाते हैं, प्रसाद सजाने में मदद करते हैं, और परिवार के साथ घाट जाते हैं। यह उन्हें संस्कृति और परंपरा से जोड़ता है। कई परिवारों में बच्चे भी छोटा व्रत रखते हैं।
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Articles */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">संबंधित आर्टिकल</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/blog/chhath-puja-preparation-guide" reloadDocument className="group">
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group-hover:scale-105">
                  <BookOpen className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600">तैयारी गाइड</h3>
                  <p className="text-sm text-gray-600">15 दिन पहले से तैयारी</p>
                </div>
              </Link>
              <Link to="/blog/chhath-puja-prasad-recipes" reloadDocument className="group">
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group-hover:scale-105">
                  <Star className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600">प्रसाद रेसिपी</h3>
                  <p className="text-sm text-gray-600">ठेकुआ और खीर बनाना</p>
                </div>
              </Link>
              <Link to="/blog/chhath-puja-rituals-explained" reloadDocument className="group">
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group-hover:scale-105">
                  <Info className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600">विधि समझाएं</h3>
                  <p className="text-sm text-gray-600">सूर्य अर्घ्य का रहस्य</p>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* External Resources */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="bg-blue-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">बाहरी संदर्भ</h2>
            <div className="space-y-3">
              <a href="https://hi.wikipedia.org/wiki/छठ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                छठ पूजा - विकिपीडिया
              </a>
              <a href="https://www.india.gov.in/calendar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                भारत सरकार कैलेंडर
              </a>
              <a href="https://pib.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                प्रेस सूचना ब्यूरो
              </a>
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">यह लेख उपयोगी लगा?</h3>
            <p className="text-gray-600 mb-6">शेयर करें और दूसरों को जानकारी दें</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                WhatsApp
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Facebook
              </button>
              <button className="px-6 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-900 transition-all flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Twitter
              </button>
            </div>
          </motion.div>

          <div className="text-center text-gray-600 mt-8">
            <p>लेखक: MoneyCal.in टीम | प्रकाशित: {new Date().toLocaleDateString('hi-IN')}</p>
            <p className="mt-2">अंतिम अपडेट: {new Date().toLocaleDateString('hi-IN', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChhathPuja2025Schedule;
