import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Star, Sun, Moon, Home, ChevronRight, ExternalLink, CheckCircle, AlertCircle, Share2, Sparkles, Info, Users, Heart, Clock, Calculator, Download, BookOpen, Award, TrendingUp, MessageCircle, ThumbsUp, Eye, Timer, Zap, Target, Shield, Camera, Map, Compass, Route, Bus, Train, Phone, Hotel, Utensils, ShoppingBag, Droplets, Wind, Trees, Building, Landmark, Church, Pyramid } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { getAllCities, ALL_STATES_UTS, getStateByCity } from '../../data/indiaLocations';

const ChhathPujaBestGhats: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedState, setSelectedState] = useState('बिहार');
  const [selectedGhat, setSelectedGhat] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const ghatsData = {
    'बिहार': [
      {
        id: 'gandhi-ghat-patna',
        name: 'गांधी घाट',
        city: 'पटना',
        rating: 4.8,
        visitors: '5 लाख+',
        facilities: ['पार्किंग', 'शौचालय', 'पेयजल', 'प्रकाश व्यवस्था', 'सुरक्षा', 'मेडिकल'],
        description: 'पटना का सबसे प्रसिद्ध और बड़ा घाट। गंगा नदी के किनारे स्थित यह घाट छठ पूजा के दौरान लाखों श्रद्धालुओं को आकर्षित करता है।',
        bestTime: 'सुबह 5:00 - 7:00, शाम 5:00 - 6:30',
        howToReach: 'पटना जंक्शन से 5 किमी, ऑटो/टैक्सी उपलब्ध',
        nearbyPlaces: ['गोलघर', 'पटना संग्रहालय', 'तख्त श्री पटना साहिब'],
        crowd: 'बहुत ज्यादा',
        image: '🏞️',
        color: 'from-blue-400 to-cyan-500'
      },
      {
        id: 'mahavir-mandir-ghat-patna',
        name: 'महावीर मंदिर घाट',
        city: 'पटना',
        rating: 4.7,
        visitors: '3 लाख+',
        facilities: ['पार्किंग', 'शौचालय', 'पेयजल', 'प्रकाश व्यवस्था', 'सुरक्षा'],
        description: 'महावीर मंदिर के पास स्थित यह घाट धार्मिक महत्व रखता है। शांत और व्यवस्थित वातावरण।',
        bestTime: 'सुबह 5:30 - 7:00, शाम 5:00 - 6:30',
        howToReach: 'पटना जंक्शन से 3 किमी',
        nearbyPlaces: ['महावीर मंदिर', 'गांधी मैदान'],
        crowd: 'ज्यादा',
        image: '⛪',
        color: 'from-orange-400 to-red-500'
      },
      {
        id: 'digha-ghat-patna',
        name: 'दिघा घाट',
        city: 'पटना',
        rating: 4.6,
        visitors: '2 लाख+',
        facilities: ['पार्किंग', 'शौचालय', 'पेयजल', 'प्रकाश व्यवस्था'],
        description: 'पटना के पूर्वी क्षेत्र में स्थित सुंदर घाट। कम भीड़-भाड़ वाला शांत स्थान।',
        bestTime: 'सुबह 5:30 - 7:30, शाम 5:00 - 6:30',
        howToReach: 'दिघा से 2 किमी',
        nearbyPlaces: ['दिघा बाजार', 'कंकड़बाग'],
        crowd: 'मध्यम',
        image: '🌅',
        color: 'from-purple-400 to-pink-500'
      },
      {
        id: 'phalgu-river-ghat-gaya',
        name: 'फल्गु नदी घाट',
        city: 'गया',
        rating: 4.9,
        visitors: '4 लाख+',
        facilities: ['पार्किंग', 'शौचालय', 'पेयजल', 'प्रकाश व्यवस्था', 'सुरक्षा', 'मेडिकल'],
        description: 'गया का सबसे पवित्र घाट। फल्गु नदी के किनारे स्थित, धार्मिक और ऐतिहासिक महत्व।',
        bestTime: 'सुबह 5:00 - 7:00, शाम 5:00 - 6:30',
        howToReach: 'गया जंक्शन से 3 किमी',
        nearbyPlaces: ['महाबोधि मंदिर', 'विष्णुपद मंदिर', 'बोधगया'],
        crowd: 'बहुत ज्यादा',
        image: '🕉️',
        color: 'from-yellow-400 to-orange-500'
      },
      {
        id: 'ganga-ghat-bhagalpur',
        name: 'गंगा घाट',
        city: 'भागलपुर',
        rating: 4.7,
        visitors: '2 लाख+',
        facilities: ['पार्किंग', 'शौचालय', 'पेयजल', 'प्रकाश व्यवस्था', 'सुरक्षा'],
        description: 'भागलपुर का प्रमुख घाट। गंगा की तेज धारा और सुंदर दृश्य।',
        bestTime: 'सुबह 5:30 - 7:00, शाम 5:00 - 6:30',
        howToReach: 'भागलपुर जंक्शन से 4 किमी',
        nearbyPlaces: ['विक्रमशिला विश्वविद्यालय', 'सुल्तानगंज'],
        crowd: 'ज्यादा',
        image: '🏛️',
        color: 'from-green-400 to-teal-500'
      },
      {
        id: 'sonepur-ghat',
        name: 'सोनपुर घाट',
        city: 'सोनपुर',
        rating: 4.5,
        visitors: '1.5 लाख+',
        facilities: ['पार्किंग', 'शौचालय', 'पेयजल', 'प्रकाश व्यवस्था'],
        description: 'गंगा और गंडक नदी के संगम पर स्थित। ऐतिहासिक मेला स्थल।',
        bestTime: 'सुबह 5:30 - 7:30, शाम 5:00 - 6:30',
        howToReach: 'हाजीपुर से 3 किमी',
        nearbyPlaces: ['हरिहर क्षेत्र मंदिर'],
        crowd: 'मध्यम',
        image: '🌊',
        color: 'from-cyan-400 to-blue-500'
      }
    ],
    'झारखंड': [
      {
        id: 'hundru-falls-ranchi',
        name: 'हुंडरू जलप्रपात',
        city: 'रांची',
        rating: 4.8,
        visitors: '3 लाख+',
        facilities: ['पार्किंग', 'शौचालय', 'पेयजल', 'प्रकाश व्यवस्था', 'सुरक्षा'],
        description: 'रांची का प्रसिद्ध जलप्रपात और छठ पूजा स्थल। प्राकृतिक सुंदरता से भरपूर।',
        bestTime: 'सुबह 6:00 - 8:00, शाम 5:00 - 6:30',
        howToReach: 'रांची से 45 किमी, बस/टैक्सी',
        nearbyPlaces: ['जोन्हा फॉल्स', 'रांची हिल'],
        crowd: 'ज्यादा',
        image: '💧',
        color: 'from-blue-400 to-cyan-500'
      },
      {
        id: 'subernarekha-ghat-jamshedpur',
        name: 'स्वर्णरेखा घाट',
        city: 'जमशेदपुर',
        rating: 4.6,
        visitors: '2 लाख+',
        facilities: ['पार्किंग', 'शौचालय', 'पेयजल', 'प्रकाश व्यवस्था'],
        description: 'जमशेदपुर का मुख्य घाट। स्वर्णरेखा नदी के किनारे स्थित।',
        bestTime: 'सुबह 5:30 - 7:00, शाम 5:00 - 6:30',
        howToReach: 'टाटानगर से 5 किमी',
        nearbyPlaces: ['जुबली पार्क', 'टाटा स्टील'],
        crowd: 'मध्यम',
        image: '🏞️',
        color: 'from-green-400 to-teal-500'
      },
      {
        id: 'damodar-ghat-dhanbad',
        name: 'दामोदर घाट',
        city: 'धनबाद',
        rating: 4.5,
        visitors: '1.5 लाख+',
        facilities: ['पार्किंग', 'शौचालय', 'पेयजल'],
        description: 'धनबाद का प्रमुख घाट। दामोदर नदी के किनारे।',
        bestTime: 'सुबह 5:30 - 7:30, शाम 5:00 - 6:30',
        howToReach: 'धनबाद जंक्शन से 6 किमी',
        nearbyPlaces: ['मैथन डैम'],
        crowd: 'कम',
        image: '🌄',
        color: 'from-purple-400 to-pink-500'
      }
    ],
    'उत्तर प्रदेश': [
      {
        id: 'dashashwamedh-ghat-varanasi',
        name: 'दशाश्वमेध घाट',
        city: 'वाराणसी',
        rating: 4.9,
        visitors: '6 लाख+',
        facilities: ['पार्किंग', 'शौचालय', 'पेयजल', 'प्रकाश व्यवस्था', 'सुरक्षा', 'मेडिकल', 'नाव'],
        description: 'वाराणसी का सबसे प्रसिद्ध और पवित्र घाट। गंगा आरती के लिए विश्व प्रसिद्ध।',
        bestTime: 'सुबह 4:30 - 7:00, शाम 5:00 - 6:30',
        howToReach: 'वाराणसी कैंट से 5 किमी',
        nearbyPlaces: ['काशी विश्वनाथ मंदिर', 'संकट मोचन मंदिर'],
        crowd: 'बहुत ज्यादा',
        image: '🕉️',
        color: 'from-orange-400 to-red-500'
      },
      {
        id: 'assi-ghat-varanasi',
        name: 'अस्सी घाट',
        city: 'वाराणसी',
        rating: 4.7,
        visitors: '3 लाख+',
        facilities: ['पार्किंग', 'शौचालय', 'पेयजल', 'प्रकाश व्यवस्था', 'सुरक्षा'],
        description: 'वाराणसी का शांत और कम भीड़ वाला घाट। सुंदर सूर्योदय दृश्य।',
        bestTime: 'सुबह 5:00 - 7:30, शाम 5:00 - 6:30',
        howToReach: 'वाराणसी कैंट से 8 किमी',
        nearbyPlaces: ['बीएचयू', 'तुलसी मानस मंदिर'],
        crowd: 'मध्यम',
        image: '🌅',
        color: 'from-yellow-400 to-orange-500'
      },
      {
        id: 'ganga-ghat-ballia',
        name: 'गंगा घाट',
        city: 'बलिया',
        rating: 4.6,
        visitors: '2 लाख+',
        facilities: ['पार्किंग', 'शौचालय', 'पेयजल', 'प्रकाश व्यवस्था'],
        description: 'पूर्वी उत्तर प्रदेश का महत्वपूर्ण घाट। शांत वातावरण।',
        bestTime: 'सुबह 5:30 - 7:00, शाम 5:00 - 6:30',
        howToReach: 'बलिया जंक्शन से 3 किमी',
        nearbyPlaces: ['सुरहा ताल'],
        crowd: 'कम',
        image: '🏛️',
        color: 'from-green-400 to-teal-500'
      }
    ]
  };

  const states = Object.keys(ghatsData);
  const currentGhats = ghatsData[selectedState as keyof typeof ghatsData] || [];

  return (
    <>
      <SEOHelmet
        title={`छठ पूजा के लिए बेस्ट घाट ${currentYear}: बिहार, झारखंड, यूपी | Best Ghats for Chhath Puja`}
        description={`छठ पूजा ${currentYear} के लिए सर्वश्रेष्ठ घाट: पटना (गांधी घाट, महावीर मंदिर घाट), गया (फल्गु नदी घाट), वाराणसी (दशाश्वमेध घाट), भागलपुर, रांची। सुविधाएं, रेटिंग, कैसे पहुंचें, भीड़ की जानकारी, नजदीकी आकर्षण। बिहार, झारखंड, उत्तर प्रदेश के प्रमुख छठ घाट।`}
        keywords={`छठ पूजा घाट ${currentYear}, best ghats for chhath puja, गांधी घाट पटना, फल्गु नदी घाट गया, दशाश्वमेध घाट वाराणसी, बिहार छठ घाट, झारखंड छठ घाट, यूपी छठ घाट, chhath ghat bihar, famous chhath ghat, सबसे अच्छा छठ घाट`}
        canonicalUrl={`https://moneycal.in/blog/chhath-puja-best-ghats-${currentYear}`}
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
              <span className="text-gray-700 font-medium">बेस्ट घाट</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full mb-6 font-bold shadow-lg">
              <MapPin className="w-5 h-5" />
              प्रमुख घाट
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 mb-6 leading-tight">
              छठ पूजा के बेस्ट घाट
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
              बिहार, झारखंड और उत्तर प्रदेश के सर्वश्रेष्ठ छठ घाट
            </p>
          </motion.div>

          {/* State Selector */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Map className="w-8 h-8 text-blue-600" />
                राज्य चुनें
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              {states.map((state) => (
                <button
                  key={state}
                  onClick={() => setSelectedState(state)}
                  className={`flex-1 p-4 rounded-xl font-bold transition-all ${
                    selectedState === state 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Ghats Display */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{selectedState} के प्रमुख घाट</h2>
            
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-6'}>
              {currentGhats.map((ghat, index) => (
                <motion.div
                  key={ghat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all cursor-pointer"
                  onClick={() => setSelectedGhat(selectedGhat === ghat.id ? null : ghat.id)}
                >
                  <div className={`bg-gradient-to-r ${ghat.color} p-6 text-white`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-5xl mb-2">{ghat.image}</div>
                        <h3 className="text-2xl font-bold mb-1">{ghat.name}</h3>
                        <p className="text-lg opacity-90">{ghat.city}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 bg-white/20 rounded-lg px-3 py-1">
                          <Star className="w-5 h-5 fill-current" />
                          <span className="font-bold">{ghat.rating}</span>
                        </div>
                        <div className="text-sm mt-2 opacity-90">{ghat.visitors} visitors</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed mb-4">{ghat.description}</p>
                    
                    <AnimatePresence>
                      {selectedGhat === ghat.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4"
                        >
                          <div className="bg-blue-50 rounded-xl p-4">
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                              <Clock className="w-5 h-5 text-blue-600" />
                              बेस्ट टाइम
                            </h4>
                            <p className="text-gray-700">{ghat.bestTime}</p>
                          </div>

                          <div className="bg-green-50 rounded-xl p-4">
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                              <Navigation className="w-5 h-5 text-green-600" />
                              कैसे पहुंचें
                            </h4>
                            <p className="text-gray-700">{ghat.howToReach}</p>
                          </div>

                          <div className="bg-purple-50 rounded-xl p-4">
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-purple-600" />
                              सुविधाएं
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {ghat.facilities.map((facility, idx) => (
                                <span key={idx} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-purple-200">
                                  {facility}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="bg-yellow-50 rounded-xl p-4">
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-yellow-600" />
                              नजदीकी स्थान
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {ghat.nearbyPlaces.map((place, idx) => (
                                <span key={idx} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-yellow-200">
                                  {place}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className={`rounded-xl p-4 ${
                            ghat.crowd === 'बहुत ज्यादा' ? 'bg-red-50' :
                            ghat.crowd === 'ज्यादा' ? 'bg-orange-50' :
                            ghat.crowd === 'मध्यम' ? 'bg-yellow-50' : 'bg-green-50'
                          }`}>
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                              <Users className="w-5 h-5" />
                              भीड़ स्तर
                            </h4>
                            <p className="text-gray-700">{ghat.crowd}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      className="mt-4 w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGhat(selectedGhat === ghat.id ? null : ghat.id);
                      }}
                    >
                      {selectedGhat === ghat.id ? 'कम दिखाएं' : 'अधिक जानें'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tips Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-3xl shadow-2xl p-8 mt-12 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">घाट पर जाने के सुझाव</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                <Clock className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">समय</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>सुबह 4-5 बजे पहुंचें (उषा अर्घ्य)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>शाम 4-5 बजे पहुंचें (संध्या अर्घ्य)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>भीड़ से बचने के लिए जल्दी जाएं</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200">
                <Shield className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">सुरक्षा</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>मूल्यवान सामान कम से कम रखें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>बच्चों का ध्यान रखें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>आपातकालीन नंबर साथ रखें</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                <ShoppingBag className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">क्या साथ लाएं</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <span>प्रसाद सामग्री (सूप में सजाकर)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <span>टॉर्च, पानी की बोतल</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <span>दरी या चटाई</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Comprehensive FAQ */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              अक्सर पूछे जाने वाले प्रश्न
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा के लिए सबसे अच्छा घाट कौन सा है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा के लिए सबसे अच्छे घाट: <strong>पटना में गांधी घाट</strong> (सबसे बड़ा और प्रसिद्ध), <strong>गया में फल्गु नदी घाट</strong> (धार्मिक महत्व), <strong>वाराणसी में दशाश्वमेध घाट</strong> (पवित्र स्थान), <strong>भागलपुर में गंगा घाट</strong> (सुंदर दृश्य)। सभी घाट सुविधा-संपन्न हैं और लाखों श्रद्धालुओं को आकर्षित करते हैं। आपकी पसंद स्थान, सुविधाओं और भीड़ पर निर्भर करती है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">घाट पर कितना समय लगता है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  घाट पर समय आपकी तैयारी और भीड़ पर निर्भर करता है। सामान्यतः: <strong>संध्या अर्घ्य:</strong> 2-3 घंटे (शाम 4:00 से 7:00), <strong>उषा अर्घ्य:</strong> 2-3 घंटे (सुबह 4:00 से 7:00)। भीड़ ज्यादा होने पर 3-4 घंटे भी लग सकते हैं। जल्दी पहुंचने पर कम समय लगता है। प्रसाद सजाना, पूजा करना, अर्घ्य देना - सभी में समय लगता है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">घाट पर पार्किंग की सुविधा है क्या?</h3>
                <p className="text-gray-700 leading-relaxed">
                  हां, अधिकांश बड़े घाटों पर पार्किंग की सुविधा है। <strong>गांधी घाट, महावीर मंदिर घाट, दशाश्वमेध घाट</strong> पर बड़ी पार्किंग व्यवस्था है। हालांकि, छठ पूजा के दिन भीड़ बहुत ज्यादा होती है, इसलिए जल्दी पहुंचें या सार्वजनिक परिवहन का उपयोग करें। पार्किंग शुल्क ₹20-100 तक हो सकता है। दूर पार्क करके पैदल जाना भी एक विकल्प है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">घाट पर शौचालय और पेयजल की व्यवस्था है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  हां, सभी मुख्य घाटों पर शौचालय और पेयजल की व्यवस्था होती है। <strong>गांधी घाट, फल्गु नदी घाट, दशाश्वमेध घाट</strong> पर अच्छी सुविधाएं हैं। हालांकि, भीड़ के समय लाइन लग सकती है। सलाह: अपने साथ पानी की बोतल रखें, और जरूरत पड़ने पर पहले ही शौचालय जाएं। कुछ घाटों पर अस्थायी शौचालय भी लगाए जाते हैं।
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">घाट पर सुरक्षा कैसी है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा के दौरान घाटों पर विशेष सुरक्षा व्यवस्था होती है। पुलिस, होमगार्ड, और स्वयंसेवक तैनात रहते हैं। <strong>CCTV निगरानी, लाइफगार्ड, मेडिकल टीम</strong> भी उपलब्ध होती है। फिर भी, सावधानी बरतें: मूल्यवान सामान कम रखें, बच्चों का ध्यान रखें, भीड़ में धक्का-मुक्की से बचें, पानी में सावधानी से उतरें।
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border-2 border-indigo-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा में कम भीड़ वाला घाट कौन सा है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  कम भीड़ वाले घाट: <strong>दिघा घाट (पटना), अस्सी घाट (वाराणसी), बलिया गंगा घाट, धनबाद दामोदर घाट</strong>। ये घाट भी सभी सुविधाओं से युक्त हैं लेकिन कम प्रसिद्ध होने के कारण भीड़ कम होती है। शांत और आध्यात्मिक अनुभव के लिए ये बेहतर विकल्प हैं। जल्दी पहुंचने पर किसी भी घाट पर कम भीड़ मिलती है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-2xl border-2 border-teal-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">घाट के पास होटल कैसे बुक करें?</h3>
                <p className="text-gray-700 leading-relaxed">
                  घाट के पास होटल बुकिंग के लिए: 1) <strong>ऑनलाइन पोर्टल</strong> (MakeMyTrip, Goibibo, OYO) का उपयोग करें, 2) <strong>1-2 महीने पहले</strong> बुक करें, 3) <strong>घाट से दूरी</strong> जरूर देखें (1-2 किमी सबसे अच्छा), 4) <strong>समीक्षाएं</strong> पढ़ें, 5) <strong>कैंसिलेशन पॉलिसी</strong> जांचें, 6) सीधे होटल से भी संपर्क करें। पटना, गया, वाराणसी में अच्छे होटल उपलब्ध हैं।
                </p>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl border-2 border-emerald-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">घाट पर फोटोग्राफी की अनुमति है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  हां, घाट पर फोटोग्राफी की अनुमति है। आप अपने परिवार और पूजा की फोटो ले सकते हैं। <strong>सूर्योदय और सूर्यास्त</strong> के दृश्य बहुत सुंदर होते हैं। ध्यान रखें: दूसरों की निजता का सम्मान करें, बिना अनुमति फोटो न लें, ड्रोन के लिए विशेष अनुमति चाहिए, वीडियोग्राफी भी की जा सकती है। कुछ पवित्र स्थानों पर प्रतिबंध हो सकता है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-2xl border-2 border-rose-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">घाट पर खाने-पीने की व्यवस्था है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  हां, अधिकांश घाटों के पास खाने-पीने की दुकानें होती हैं। <strong>चाय, बिस्कुट, फल, नाश्ता</strong> आसानी से मिलता है। छठ पूजा के दौरान अस्थायी भोजनालय भी लगते हैं। <strong>सात्विक भोजन</strong> की व्यवस्था भी होती है। हालांकि, स्वच्छता का ध्यान रखें। अपने साथ सूखा नाश्ता और पानी रखना बेहतर है। व्रती लोगों के लिए विशेष ध्यान रखा जाता है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-2xl border-2 border-amber-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">घाट पर मेडिकल सुविधा उपलब्ध है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  हां, बड़े घाटों पर मेडिकल सुविधा उपलब्ध होती है। <strong>एम्बुलेंस, डॉक्टर, नर्स, प्राथमिक चिकित्सा</strong> की व्यवस्था होती है। छठ पूजा के दौरान विशेष मेडिकल कैंप भी लगाए जाते हैं। आपातकालीन नंबर (108, 102) साथ रखें। अगर कोई मेडिकल समस्या है तो अपनी दवाइयां साथ रखें। गर्भवती महिलाएं और बुजुर्ग विशेष सावधानी बरतें।
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Articles */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">संबंधित आर्टिकल</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/blog/chhath-puja-travel-guide" className="group">
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group-hover:scale-105">
                  <Navigation className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600">यात्रा गाइड</h3>
                  <p className="text-sm text-gray-600">पूर्ण यात्रा जानकारी</p>
                </div>
              </Link>
              <Link to="/blog/chhath-puja-2025-schedule" className="group">
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group-hover:scale-105">
                  <Clock className="w-8 h-8 text-orange-600 mb-3" />
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
            </div>
          </motion.div>

          {/* External Resources */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-blue-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">बाहरी संदर्भ</h2>
            <div className="space-y-3">
              <a href="https://patna.nic.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                पटना नगर निगम
              </a>
              <a href="https://bihartourism.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                बिहार पर्यटन विभाग
              </a>
              <a href="https://www.uptourism.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                उत्तर प्रदेश पर्यटन
              </a>
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">यह लेख उपयोगी लगा?</h3>
            <p className="text-gray-600 mb-6">शेयर करें और दूसरों को मदद करें</p>
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

export default ChhathPujaBestGhats;

