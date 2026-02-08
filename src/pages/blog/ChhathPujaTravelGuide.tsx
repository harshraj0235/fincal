import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plane, Train, Car, Home, ChevronRight, ExternalLink, Star, CheckCircle, AlertCircle, Share2, Sparkles, Info, Users, Heart, Clock, Calculator, Download, BookOpen, Award, TrendingUp, MessageCircle, ThumbsUp, Eye, Timer, Zap, Target, Shield, Navigation, Camera, Wifi, Battery, Volume2, Smartphone, CreditCard, Wallet, Hotel, Utensils, ShoppingBag, Gift, Phone, Mail, Globe, Map, Compass, Route, Bus, Ship, Bicycle, Motorcycle, Truck, Van, Taxi, Uber, Ola } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { getAllCities, ALL_STATES_UTS, getStateByCity } from '../../data/indiaLocations';

const ChhathPujaTravelGuide: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedCity, setSelectedCity] = useState('पटना');
  const [selectedTransport, setSelectedTransport] = useState('train');
  const [showBudget, setShowBudget] = useState(false);
  const [travelDates, setTravelDates] = useState({
    departure: '',
    return: ''
  });

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

  const transportOptions = [
    { id: 'train', name: 'ट्रेन', icon: Train, color: 'from-blue-500 to-cyan-500', cost: '₹500-2000' },
    { id: 'bus', name: 'बस', icon: Bus, color: 'from-green-500 to-teal-500', cost: '₹300-1500' },
    { id: 'flight', name: 'हवाई जहाज', icon: Plane, color: 'from-purple-500 to-pink-500', cost: '₹2000-8000' },
    { id: 'car', name: 'कार', icon: Car, color: 'from-orange-500 to-red-500', cost: '₹1000-3000' }
  ];

  const getCityInfo = (city: string) => {
    const cityData = {
      'पटना': {
        ghats: ['गांधी घाट', 'महात्मा गांधी सेतु घाट', 'दिघा घाट', 'कुर्जी घाट'],
        hotels: ['होटल मौर्या', 'होटल चाणक्या', 'होटल पटलिपुत्र', 'होटल गंगा'],
        budget: { low: 2000, medium: 5000, high: 10000 },
        attractions: ['गोलघर', 'पटना संग्रहालय', 'तख्त श्री पटना साहिब', 'बुद्ध स्मृति पार्क']
      },
      'गया': {
        ghats: ['फल्गु नदी घाट', 'विश्राम घाट', 'मंगला घाट'],
        hotels: ['होटल बुद्धा', 'होटल गया', 'होटल सिद्धार्थ'],
        budget: { low: 1500, medium: 4000, high: 8000 },
        attractions: ['महाबोधि मंदिर', 'बोधगया', 'विश्राम घाट', 'बराबर गुफाएं']
      },
      'भागलपुर': {
        ghats: ['गंगा घाट', 'सबलपुर घाट', 'बरारी घाट'],
        hotels: ['होटल भागलपुर', 'होटल गंगा', 'होटल सबलपुर'],
        budget: { low: 1800, medium: 4500, high: 9000 },
        attractions: ['विक्रमशिला विश्वविद्यालय', 'कहलगांव', 'सुल्तानगंज']
      }
    };
    return cityData[city as keyof typeof cityData] || cityData['पटना'];
  };

  const cityInfo = getCityInfo(selectedCity);

  const budgetCalculator = {
    train: { base: 500, perKm: 2 },
    bus: { base: 300, perKm: 1.5 },
    flight: { base: 2000, perKm: 8 },
    car: { base: 1000, perKm: 5 }
  };

  return (
    <>
      <SEOHelmet
        title={`छठ पूजा यात्रा गाइड ${currentYear}: पटना, गया, भागलपुर घाट और होटल | Chhath Puja Travel Guide`}
        description={`छठ पूजा ${currentYear} यात्रा गाइड: बिहार, झारखंड, यूपी के प्रमुख शहरों में छठ पूजा मनाने के लिए पूरी यात्रा जानकारी। घाट, होटल, यात्रा खर्च, बजट प्लानिंग, स्थानीय आकर्षण। पटना, गया, भागलपुर, रांची, वाराणसी में छठ पूजा कहाँ मनाएं?`}
        keywords={`छठ पूजा यात्रा गाइड ${currentYear}, chhath puja travel guide, पटना छठ पूजा, गया छठ पूजा, भागलपुर छठ पूजा, बिहार यात्रा, छठ पूजा घाट, छठ पूजा होटल, छठ पूजा बजट, यात्रा खर्च, स्थानीय आकर्षण`}
        canonicalUrl={`https://moneycal.in/blog/chhath-puja-travel-guide-${currentYear}`}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                <Home className="w-4 h-4" />
                होम
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to="/blog" className="text-blue-600 hover:text-blue-800">
                ब्लॉग
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 font-medium">यात्रा गाइड</span>
            </div>
          </div>
          </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full mb-6 font-bold shadow-lg">
              <MapPin className="w-5 h-5" />
              यात्रा गाइड
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 mb-6 leading-tight">
              छठ पूजा यात्रा गाइड
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
              बिहार, झारखंड, यूपी के प्रमुख शहरों में छठ पूजा मनाने की पूरी जानकारी
            </p>
          </motion.div>

          {/* Interactive City Selector */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">गंतव्य शहर चुनें</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {chhathCities.map((city, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCity(city)}
                  className={`p-3 rounded-xl font-medium transition-all ${
                    selectedCity === city 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </motion.div>

          {/* City Information */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{selectedCity} में छठ पूजा</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Famous Ghats */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  प्रसिद्ध घाट
                </h3>
                <ul className="space-y-2">
                  {cityInfo.ghats.map((ghat, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>{ghat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hotels */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Hotel className="w-6 h-6 text-green-600" />
                  होटल
                </h3>
                <ul className="space-y-2">
                  {cityInfo.hotels.map((hotel, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>{hotel}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Budget Information */}
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Wallet className="w-6 h-6 text-purple-600" />
                बजट अनुमान (प्रति व्यक्ति)
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">₹{cityInfo.budget.low}</div>
                  <div className="text-sm text-gray-600">कम बजट</div>
                </div>
                <div className="text-center bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">₹{cityInfo.budget.medium}</div>
                  <div className="text-sm text-gray-600">मध्यम बजट</div>
                </div>
                <div className="text-center bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">₹{cityInfo.budget.high}</div>
                  <div className="text-sm text-gray-600">उच्च बजट</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Transport Options */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">यात्रा के साधन</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {transportOptions.map((transport) => (
                <button
                  key={transport.id}
                  onClick={() => setSelectedTransport(transport.id)}
                  className={`p-6 rounded-2xl transition-all ${
                    selectedTransport === transport.id 
                      ? `bg-gradient-to-r ${transport.color} text-white shadow-lg` 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <transport.icon className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{transport.name}</h3>
                  <p className="text-sm opacity-90">{transport.cost}</p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Travel Tips */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">यात्रा सुझाव</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  यात्रा से पहले
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>होटल बुकिंग पहले से करें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>ट्रेन/बस टिकट पहले से बुक करें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>मौसम की जानकारी लें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>आवश्यक दवाइयां साथ ले जाएं</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>स्थानीय भाषा की जानकारी लें</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                  सावधानियां
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <span>भीड़-भाड़ में सावधान रहें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <span>मूल्यवान सामान सुरक्षित रखें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <span>साफ पानी का उपयोग करें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <span>स्थानीय नियमों का पालन करें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <span>आपातकालीन नंबर साथ रखें</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Local Attractions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">स्थानीय आकर्षण</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {cityInfo.attractions.map((attraction, index) => (
                <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                  <div className="flex items-center gap-3">
                    <Camera className="w-8 h-8 text-yellow-600" />
                    <h3 className="text-xl font-bold text-gray-900">{attraction}</h3>
                  </div>
                  <p className="text-gray-700 mt-2">
                    छठ पूजा के दौरान यह स्थान भी देखने योग्य है। स्थानीय संस्कृति और इतिहास को समझने के लिए यहां जरूर जाएं।
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Budget Calculator */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-blue-600" />
                यात्रा बजट कैलकुलेटर
              </h2>
              <button 
                onClick={() => setShowBudget(!showBudget)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                {showBudget ? 'छुपाएं' : 'देखें'}
              </button>
            </div>
            
            <AnimatePresence>
              {showBudget && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">प्रस्थान तिथि</label>
                      <input
                        type="date"
                        value={travelDates.departure}
                        onChange={(e) => setTravelDates({...travelDates, departure: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">वापसी तिथि</label>
                      <input
                        type="date"
                        value={travelDates.return}
                        onChange={(e) => setTravelDates({...travelDates, return: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">अनुमानित खर्च</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">₹{budgetCalculator[selectedTransport as keyof typeof budgetCalculator].base}</div>
                        <div className="text-sm text-gray-600">यात्रा</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">₹{cityInfo.budget.medium}</div>
                        <div className="text-sm text-gray-600">आवास</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">₹1000</div>
                        <div className="text-sm text-gray-600">भोजन</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">₹500</div>
                        <div className="text-sm text-gray-600">अन्य</div>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        कुल: ₹{budgetCalculator[selectedTransport as keyof typeof budgetCalculator].base + cityInfo.budget.medium + 1500}
                      </div>
                      <div className="text-sm text-gray-600">प्रति व्यक्ति</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Comprehensive FAQ Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              अक्सर पूछे जाने वाले प्रश्न
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा के लिए कौन से शहर सबसे अच्छे हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा के लिए सबसे अच्छे शहर: <strong>पटना</strong> (गांधी घाट, महात्मा गांधी सेतु घाट), <strong>गया</strong> (फल्गु नदी घाट), <strong>भागलपुर</strong> (गंगा घाट), <strong>रांची</strong> (हुंडरू जलप्रपात), <strong>वाराणसी</strong> (गंगा घाट)। ये सभी शहर प्रसिद्ध घाट और अच्छी सुविधाएं प्रदान करते हैं।
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा के दौरान होटल बुकिंग कैसे करें?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा के दौरान होटल बुकिंग के लिए: 1) कम से कम 1-2 महीने पहले बुकिंग करें, 2) ऑनलाइन पोर्टल (MakeMyTrip, Goibibo) का उपयोग करें, 3) सीधे होटल से संपर्क करें, 4) घाट के नजदीक होटल चुनें, 5) कैंसिलेशन पॉलिसी जरूर पढ़ें, 6) समीक्षाएं जरूर देखें।
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा यात्रा का सबसे अच्छा समय क्या है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा यात्रा का सबसे अच्छा समय: <strong>अक्टूबर-नवंबर</strong> का महीना। मौसम सुहावना होता है, न तो ज्यादा गर्मी और न ही ज्यादा सर्दी। यह समय यात्रा के लिए आदर्श है। हालांकि, भीड़-भाड़ ज्यादा होती है, इसलिए पहले से योजना बनाएं।
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा यात्रा में कितना खर्च आता है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा यात्रा का खर्च यात्रा के साधन और आवास के प्रकार पर निर्भर करता है। <strong>कम बजट:</strong> ₹2000-3000 प्रति व्यक्ति, <strong>मध्यम बजट:</strong> ₹5000-8000 प्रति व्यक्ति, <strong>उच्च बजट:</strong> ₹10000+ प्रति व्यक्ति। इसमें यात्रा, आवास, भोजन और अन्य खर्च शामिल हैं।
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा यात्रा में क्या सावधानियां बरतनी चाहिए?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा यात्रा में सावधानियां: 1) भीड़-भाड़ में सावधान रहें, 2) मूल्यवान सामान सुरक्षित रखें, 3) साफ पानी का उपयोग करें, 4) स्थानीय नियमों का पालन करें, 5) आपातकालीन नंबर साथ रखें, 6) मौसम की जानकारी लें, 7) आवश्यक दवाइयां साथ ले जाएं।
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border-2 border-indigo-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा के दौरान कौन से घाट सबसे अच्छे हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा के लिए सबसे अच्छे घाट: <strong>पटना:</strong> गांधी घाट, महात्मा गांधी सेतु घाट, <strong>गया:</strong> फल्गु नदी घाट, <strong>भागलपुर:</strong> गंगा घाट, <strong>वाराणसी:</strong> दशाश्वमेध घाट, अस्सी घाट। ये घाट सुविधाजनक, साफ-सुथरे और सुरक्षित हैं।
                </p>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-2xl border-2 border-teal-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा यात्रा में कौन से सामान साथ ले जाने चाहिए?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा यात्रा में जरूरी सामान: 1) आरामदायक कपड़े, 2) चप्पल/जूते, 3) टॉर्च, 4) पानी की बोतल, 5) दवाइयां, 6) मोबाइल चार्जर, 7) पावर बैंक, 8) कैमरा, 9) छाता, 10) साबुन/शैंपू, 11) तौलिया, 12) पहचान पत्र, 13) नकदी, 14) स्थानीय नक्शा।
                </p>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl border-2 border-emerald-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा यात्रा में स्थानीय भोजन कहाँ मिलता है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा यात्रा में स्थानीय भोजन: <strong>पटना:</strong> बिहारी थाली, लिट्टी-चोखा, <strong>गया:</strong> मालपुआ, खाजा, <strong>भागलपुर:</strong> तिलकुट, लड्डू। ये व्यंजन स्थानीय रेस्तरां, होटल और सड़क किनारे मिलते हैं। सात्विक भोजन की व्यवस्था भी होती है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-2xl border-2 border-rose-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा यात्रा में कैसे पहुंचें?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा यात्रा में पहुंचने के तरीके: <strong>ट्रेन:</strong> सबसे सुविधाजनक और सस्ता, <strong>बस:</strong> राज्य परिवहन और निजी बसें, <strong>हवाई जहाज:</strong> तेज लेकिन महंगा, <strong>कार:</strong> आरामदायक लेकिन थकाने वाला। ट्रेन सबसे लोकप्रिय विकल्प है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-2xl border-2 border-amber-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा यात्रा में कौन से स्थानीय आकर्षण देखने योग्य हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा यात्रा में देखने योग्य स्थान: <strong>पटना:</strong> गोलघर, पटना संग्रहालय, <strong>गया:</strong> महाबोधि मंदिर, बोधगया, <strong>भागलपुर:</strong> विक्रमशिला विश्वविद्यालय, <strong>रांची:</strong> हुंडरू जलप्रपात, <strong>वाराणसी:</strong> काशी विश्वनाथ मंदिर। ये स्थान सांस्कृतिक और धार्मिक महत्व रखते हैं।
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Articles */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">संबंधित आर्टिकल</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/blog/chhath-puja-2025-schedule" className="group">
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group-hover:scale-105">
                  <Calendar className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600">पूर्ण कार्यक्रम</h3>
                  <p className="text-sm text-gray-600">4 दिनों की समय सारणी</p>
                </div>
              </Link>
              <Link to="/blog/chhath-puja-preparation-guide" className="group">
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group-hover:scale-105">
                  <BookOpen className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600">तैयारी गाइड</h3>
                  <p className="text-sm text-gray-600">15 दिन पहले से</p>
                </div>
              </Link>
              <Link to="/festival-tools/chhath-puja/chhath-family-budget-planner" className="group">
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group-hover:scale-105">
                  <Calculator className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600">बजट प्लानर</h3>
                  <p className="text-sm text-gray-600">यात्रा खर्च कैलकुलेटर</p>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* External Resources */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="bg-blue-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">बाहरी संदर्भ</h2>
            <div className="space-y-3">
              <a href="https://www.irctc.co.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                IRCTC - ट्रेन टिकट बुकिंग
              </a>
              <a href="https://www.makemytrip.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                MakeMyTrip - होटल बुकिंग
              </a>
              <a href="https://www.bihartourism.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                बिहार पर्यटन विभाग
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

export default ChhathPujaTravelGuide;



