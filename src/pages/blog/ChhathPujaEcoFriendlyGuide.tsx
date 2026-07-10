import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Recycle, Sun, Moon, Home, ChevronRight, ExternalLink, Star, CheckCircle, AlertCircle, Share2, Sparkles, Info, Users, Heart, Clock, MapPin, IndianRupee, Download, BookOpen, Award, TrendingUp, MessageCircle, ThumbsUp, Eye, Timer, Zap, Target, Shield, Droplets, Wind, TreePine, Flower, Globe, Package, ShoppingBag, Trash2, RefreshCw, Battery, Lightbulb, Sprout } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { getAllCities, ALL_STATES_UTS } from '../../data/indiaLocations';

const ChhathPujaEcoFriendlyGuide: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedTip, setSelectedTip] = useState('biodegradable');
  const [ecoScore, setEcoScore] = useState(0);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const ecoTips = [
    {
      id: 'biodegradable',
      title: 'बायोडिग्रेडेबल सामग्री',
      icon: Leaf,
      color: 'from-green-400 to-teal-500',
      description: 'प्राकृतिक और विघटित होने वाली सामग्री का उपयोग',
      score: 25
    },
    {
      id: 'waste-management',
      title: 'कचरा प्रबंधन',
      icon: Trash2,
      color: 'from-blue-400 to-cyan-500',
      description: 'घाट की सफाई और कचरा निपटान',
      score: 25
    },
    {
      id: 'water-conservation',
      title: 'जल संरक्षण',
      icon: Droplets,
      color: 'from-cyan-400 to-blue-500',
      description: 'नदी और जल स्रोतों की सुरक्षा',
      score: 20
    },
    {
      id: 'natural-decoration',
      title: 'प्राकृतिक सजावट',
      icon: Flower,
      color: 'from-pink-400 to-rose-500',
      description: 'ऑर्गेनिक फूल और प्राकृतिक रंगोली',
      score: 15
    },
    {
      id: 'energy-saving',
      title: 'ऊर्जा बचत',
      icon: Lightbulb,
      color: 'from-yellow-400 to-orange-500',
      description: 'LED दीये और सौर ऊर्जा',
      score: 15
    }
  ];

  const ecoCheckList = [
    { id: 'bamboo-basket', text: 'बांस का सूप/टोकरी उपयोग करें', category: 'biodegradable' },
    { id: 'clay-diya', text: 'मिट्टी के दीये का उपयोग करें', category: 'biodegradable' },
    { id: 'natural-colors', text: 'प्राकृतिक रंगोली सामग्री', category: 'natural-decoration' },
    { id: 'no-plastic', text: 'प्लास्टिक का उपयोग न करें', category: 'waste-management' },
    { id: 'reusable-bags', text: 'कपड़े के थैले उपयोग करें', category: 'waste-management' },
    { id: 'clean-ghat', text: 'घाट की सफाई करें', category: 'waste-management' },
    { id: 'water-mindful', text: 'जल का सोच-समझकर उपयोग', category: 'water-conservation' },
    { id: 'natural-flowers', text: 'स्थानीय मौसमी फूल', category: 'natural-decoration' },
    { id: 'led-lights', text: 'LED दीये का उपयोग', category: 'energy-saving' },
    { id: 'solar-lamp', text: 'सौर ऊर्जा दीपक', category: 'energy-saving' }
  ];

  useEffect(() => {
    const score = checkedItems.length * 10;
    setEcoScore(Math.min(score, 100));
  }, [checkedItems]);

  const toggleCheckItem = (id: string) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter(item => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  return (
    <>
      <SEOHelmet
        title={`इको-फ्रेंडली छठ पूजा ${currentYear}: पर्यावरण के अनुकूल छठ पूजा कैसे मनाएं | Eco-Friendly Chhath Puja Guide`}
        description={`छठ पूजा ${currentYear} को पर्यावरण के अनुकूल तरीके से मनाएं। बायोडिग्रेडेबल सामग्री, कचरा प्रबंधन, जल संरक्षण, प्राकृतिक सजावट, ऊर्जा बचत। छठ पूजा को सबसे इको-फ्रेंडली त्योहार क्यों माना जाता है? घाट सफाई, प्लास्टिक मुक्त छठ, हरित छठ पूजा।`}
        keywords={`इको-फ्रेंडली छठ पूजा ${currentYear}, eco-friendly chhath puja, पर्यावरण अनुकूल छठ, green chhath puja, बायोडिग्रेडेबल सामग्री, प्लास्टिक मुक्त छठ, घाट सफाई, जल संरक्षण, हरित पर्व, sustainable celebration, नदी संरक्षण, waste management`}
        canonicalUrl={`/blog/chhath-puja-eco-friendly-guide-${currentYear}`}
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50">
        <div className="bg-white/80 backdrop-blur-sm border-b border-green-100">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-green-600 hover:text-green-800 flex items-center gap-1">
                <Home className="w-4 h-4" />
                होम
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to="/blog" reloadDocument className="text-green-600 hover:text-green-800">
                ब्लॉग
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 font-medium">इको-फ्रेंडली छठ पूजा</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-full mb-6 font-bold shadow-lg">
              <Leaf className="w-5 h-5" />
              पर्यावरण के अनुकूल
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 mb-6 leading-tight">
              इको-फ्रेंडली छठ पूजा गाइड
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
              प्रकृति का सम्मान करते हुए पर्यावरण के अनुकूल छठ पूजा मनाएं
            </p>
          </motion.div>

          {/* Eco Score Dashboard */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">आपका इको स्कोर</h2>
              <div className="relative w-48 h-48 mx-auto">
                <svg className="transform -rotate-90 w-48 h-48">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 80}`}
                    strokeDashoffset={`${2 * Math.PI * 80 * (1 - ecoScore / 100)}`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-5xl font-black text-green-600">{ecoScore}</div>
                  <div className="text-sm text-gray-600">/ 100</div>
                </div>
              </div>
              <p className="text-gray-600 mt-4">
                {ecoScore < 30 && "शुरुआत अच्छी है! अधिक इको-फ्रेंडली विकल्प चुनें"}
                {ecoScore >= 30 && ecoScore < 70 && "बहुत अच्छा! आप सही रास्ते पर हैं"}
                {ecoScore >= 70 && "शानदार! आप पर्यावरण चैंपियन हैं 🌱"}
              </p>
            </div>
          </motion.div>

          {/* Interactive Eco Tips */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">इको-फ्रेंडली टिप्स</h2>
            <div className="grid md:grid-cols-5 gap-4 mb-8">
              {ecoTips.map((tip) => (
                <button
                  key={tip.id}
                  onClick={() => setSelectedTip(tip.id)}
                  className={`p-4 rounded-xl transition-all ${
                    selectedTip === tip.id 
                      ? `bg-gradient-to-r ${tip.color} text-white shadow-lg` 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <tip.icon className="w-10 h-10 mx-auto mb-2" />
                  <div className="font-bold text-sm text-center">{tip.title}</div>
                </button>
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTip}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-2xl border-2 border-green-200"
              >
                {ecoTips.map(tip => (
                  tip.id === selectedTip && (
                    <div key={tip.id}>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <tip.icon className="w-8 h-8 text-green-600" />
                        {tip.title}
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        {tip.description}
                      </p>
                      
                      {/* Specific tips based on category */}
                      {tip.id === 'biodegradable' && (
                        <div className="space-y-4">
                          <div className="bg-white rounded-xl p-6">
                            <h4 className="font-bold text-gray-900 mb-3">बायोडिग्रेडेबल सामग्री क्यों जरूरी है?</h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                <span>प्लास्टिक और पॉलीथीन नदी में जमा होते हैं</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                <span>बांस, मिट्टी, पत्ते प्राकृतिक रूप से विघटित होते हैं</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                <span>जल जीवन को नुकसान नहीं पहुंचता</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                <span>परंपरागत तरीके पर्यावरण के अनुकूल थे</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-white rounded-xl p-6">
                            <h4 className="font-bold text-gray-900 mb-3">क्या उपयोग करें:</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle className="w-5 h-5" />
                                <span>बांस का सूप</span>
                              </div>
                              <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle className="w-5 h-5" />
                                <span>मिट्टी के दीये</span>
                              </div>
                              <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle className="w-5 h-5" />
                                <span>केले के पत्ते</span>
                              </div>
                              <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle className="w-5 h-5" />
                                <span>कपड़े के थैले</span>
                              </div>
                              <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle className="w-5 h-5" />
                                <span>पत्तों की रंगोली</span>
                              </div>
                              <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle className="w-5 h-5" />
                                <span>जूट की रस्सी</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {tip.id === 'waste-management' && (
                        <div className="space-y-4">
                          <div className="bg-white rounded-xl p-6">
                            <h4 className="font-bold text-gray-900 mb-3">घाट सफाई का महत्व:</h4>
                            <p className="text-gray-700 mb-3">
                              छठ पूजा के बाद घाट की सफाई अत्यंत महत्वपूर्ण है। हर वर्ष लाखों लोग घाट पर आते हैं, और अगर सफाई नहीं की गई तो नदी प्रदूषित हो जाती है।
                            </p>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                <span>पूजा के तुरंत बाद अपना कचरा साफ करें</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                <span>प्लास्टिक, पॉलीथीन अलग डब्बे में डालें</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                <span>फूल, पत्ते कम्पोस्ट में डालें</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                <span>सामूहिक सफाई अभियान में शामिल हों</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {tip.id === 'water-conservation' && (
                        <div className="space-y-4">
                          <div className="bg-white rounded-xl p-6">
                            <h4 className="font-bold text-gray-900 mb-3">जल संरक्षण कैसे करें:</h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start gap-2">
                                <Droplets className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                <span>अनावश्यक जल बर्बाद न करें</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Droplets className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                <span>नदी में साबुन, शैंपू न डालें</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Droplets className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                <span>घाट के पास रासायनिक पदार्थ न फैलाएं</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Droplets className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                <span>नदी जल की पवित्रता बनाए रखें</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {tip.id === 'natural-decoration' && (
                        <div className="space-y-4">
                          <div className="bg-white rounded-xl p-6">
                            <h4 className="font-bold text-gray-900 mb-3">प्राकृतिक सजावट विकल्प:</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-pink-50 p-4 rounded-lg">
                                <Flower className="w-8 h-8 text-pink-600 mb-2" />
                                <h5 className="font-bold text-gray-900 mb-2">फूल और पत्ते</h5>
                                <p className="text-sm text-gray-700">स्थानीय मौसमी फूल, गेंदा, गुलाब, पत्तियां</p>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg">
                                <Sprout className="w-8 h-8 text-green-600 mb-2" />
                                <h5 className="font-bold text-gray-900 mb-2">प्राकृतिक रंगोली</h5>
                                <p className="text-sm text-gray-700">हल्दी, कुमकुम, चावल का आटा, फूलों की पंखुड़ियां</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {tip.id === 'energy-saving' && (
                        <div className="space-y-4">
                          <div className="bg-white rounded-xl p-6">
                            <h4 className="font-bold text-gray-900 mb-3">ऊर्जा बचत के उपाय:</h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start gap-2">
                                <Lightbulb className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                                <span>LED दीये का उपयोग करें (70% कम बिजली)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Sun className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                                <span>सौर ऊर्जा लैंप का उपयोग करें</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Battery className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                                <span>रिचार्जेबल बैटरी का उपयोग करें</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Leaf className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                                <span>प्राकृतिक रोशनी का अधिकतम उपयोग</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Interactive Checklist */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">इको-फ्रेंडली चेकलिस्ट</h2>
            <p className="text-center text-gray-600 mb-6">इन विकल्पों को चुनकर अपना इको स्कोर बढ़ाएं</p>
            <div className="grid md:grid-cols-2 gap-4">
              {ecoCheckList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheckItem(item.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    checkedItems.includes(item.id)
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {checkedItems.includes(item.id) ? (
                      <CheckCircle className="w-6 h-6 flex-shrink-0" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-current rounded-full flex-shrink-0" />
                    )}
                    <span className="font-medium">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Why Chhath Puja is Eco-Friendly */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">छठ पूजा सबसे इको-फ्रेंडली पर्व क्यों है?</h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sun className="w-6 h-6 text-orange-600" />
                  प्रकृति की पूजा
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा में सूर्य और प्रकृति की सीधी पूजा होती है। यह त्योहार हमें सिखाता है कि प्रकृति हमारा पोषक है और हमें उसका सम्मान करना चाहिए। किसी मूर्ति या मंदिर की जरूरत नहीं - सीधे प्रकृति से जुड़ाव।
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-blue-600" />
                  जल का महत्व
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  नदी में खड़े होकर पूजा करना जल के महत्व को दर्शाता है। यह हमें याद दिलाता है कि जल ही जीवन है। परंपरागत रूप से नदियों को पवित्र माना जाता था और उनकी सफाई पर विशेष ध्यान दिया जाता था।
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-green-600" />
                  प्राकृतिक सामग्री
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  परंपरागत छठ पूजा में केवल प्राकृतिक सामग्री का उपयोग होता है - बांस का सूप, मिट्टी के दीये, केले के पत्ते, गुड़, आटा। कोई रसायन, प्लास्टिक या कृत्रिम चीज नहीं। यह पूरी तरह बायोडिग्रेडेबल त्योहार है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-purple-600" />
                  सामुदायिक सफाई
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा से पहले और बाद में घाट की सामूहिक सफाई की परंपरा है। यह सामाजिक जिम्मेदारी और पर्यावरण के प्रति जागरूकता को दर्शाता है। समुदाय मिलकर नदी और घाट की देखभाल करता है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-rose-50 to-red-50 p-6 rounded-2xl border-2 border-rose-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-600" />
                  सादगी और शुद्धता
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा में दिखावे की कोई जगह नहीं। सादगी और शुद्धता ही इसका सार है। कोई भव्य सजावट नहीं, कोई महंगे उपहार नहीं - बस प्रकृति के प्रति श्रद्धा और भक्ति। यह मितव्ययता और sustainability का संदेश देता है।
                </p>
              </div>
            </div>
          </motion.div>

          {/* Practical Tips */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">व्यावहारिक सुझाव</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200">
                <Package className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">खरीदारी</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>स्थानीय बाजार से खरीदें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>कपड़े के थैले लाएं</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>बल्क में खरीदें, पैकेजिंग कम करें</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                <Recycle className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">पुनर्चक्रण</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>पुराने सूप/दीये पुनः उपयोग करें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>कपड़े की रस्सी/झंडे बनाएं</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>फूल-पत्ते कम्पोस्ट में डालें</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                <Globe className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">जागरूकता</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <span>दूसरों को शिक्षित करें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <span>सोशल मीडिया पर शेयर करें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <span>सफाई अभियान में शामिल हों</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Comprehensive FAQ Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
              <MessageCircle className="w-8 h-8 text-green-600" />
              अक्सर पूछे जाने वाले प्रश्न
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा को इको-फ्रेंडली कैसे मनाएं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा को इको-फ्रेंडली मनाने के लिए: 1) बायोडिग्रेडेबल सामग्री का उपयोग करें (बांस, मिट्टी, पत्ते), 2) प्लास्टिक और पॉलीथीन से बचें, 3) घाट की सफाई करें, 4) नदी में कचरा न फैलाएं, 5) प्राकृतिक सजावट उपयोग करें, 6) LED या सौर ऊर्जा दीपक का उपयोग करें, 7) दूसरों को जागरूक करें।
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">प्लास्टिक मुक्त छठ पूजा कैसे मनाएं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  प्लास्टिक मुक्त छठ पूजा के लिए: 1) कपड़े के थैले लाएं, 2) बांस का सूप उपयोग करें, 3) मिट्टी के दीये लाएं, 4) केले के पत्ते में प्रसाद रखें, 5) जूट की रस्सी उपयोग करें, 6) प्लास्टिक की बोतल की जगह तांबे/स्टील के बर्तन, 7) खरीदारी में प्लास्टिक न लें।
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">घाट की सफाई क्यों जरूरी है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  घाट की सफाई अत्यंत जरूरी है क्योंकि: 1) लाखों लोग घाट पर आते हैं, 2) कचरा जमा होने से नदी प्रदूषित होती है, 3) जल जीवन को नुकसान पहुंचता है, 4) अगले वर्ष के लिए घाट साफ रहे, 5) सामाजिक जिम्मेदारी, 6) प्रकृति का सम्मान, 7) भविष्य की पीढ़ियों के लिए।
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा में बायोडिग्रेडेबल सामग्री क्या है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  बायोडिग्रेडेबल सामग्री वो है जो प्राकृतिक रूप से विघटित हो जाती है। छठ पूजा में: बांस का सूप, मिट्टी के दीये, केले के पत्ते, फूल-पत्तियां, कपड़े, जूट की रस्सी, गुड़, आटा, चावल - ये सभी बायोडिग्रेडेबल हैं। ये पर्यावरण को नुकसान नहीं पहुंचाते।
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा सबसे इको-फ्रेंडली पर्व क्यों है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा सबसे इको-फ्रेंडली पर्व है क्योंकि: 1) प्रकृति की सीधी पूजा होती है, 2) केवल प्राकृतिक सामग्री का उपयोग, 3) कोई मूर्ति या मंदिर नहीं, 4) सादगी और शुद्धता, 5) जल का सम्मान, 6) सामुदायिक सफाई, 7) पारंपरिक तरीके पर्यावरण के अनुकूल। इसमें कोई रसायन या कृत्रिम चीज नहीं है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border-2 border-indigo-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">नदी संरक्षण में हम कैसे योगदान दें?</h3>
                <p className="text-gray-700 leading-relaxed">
                  नदी संरक्षण में योगदान: 1) कचरा नदी में न फैलाएं, 2) साबुन/शैंपू न डालें, 3) प्लास्टिक न फेंकें, 4) घाट की सफाई करें, 5) सफाई अभियान में शामिल हों, 6) दूसरों को जागरूक करें, 7) वृक्षारोपण करें, 8) जल बर्बाद न करें, 9) नदी किनारे निर्माण रोकें, 10) सरकारी योजनाओं में सहयोग।
                </p>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-2xl border-2 border-teal-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">LED दीये क्यों बेहतर हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  LED दीये बेहतर हैं क्योंकि: 1) 70-80% कम बिजली खपत, 2) लंबे समय तक चलते हैं, 3) गर्मी कम उत्पन्न होती है, 4) सुरक्षित (आग का खतरा नहीं), 5) चमकीले और सुंदर, 6) रिचार्जेबल विकल्प उपलब्ध, 7) पर्यावरण के अनुकूल। हालांकि, पारंपरिक मिट्टी के दीये भी बहुत अच्छे हैं क्योंकि वे बायोडिग्रेडेबल हैं।
                </p>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl border-2 border-emerald-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">प्राकृतिक सजावट कैसे करें?</h3>
                <p className="text-gray-700 leading-relaxed">
                  प्राकृतिक सजावट के लिए: 1) स्थानीय मौसमी फूल उपयोग करें (गेंदा, गुलाब), 2) पत्तियों से रंगोली बनाएं, 3) हल्दी, कुमकुम, चावल के आटे से रंगोली, 4) फूलों की माला, 5) बांस की सजावट, 6) मिट्टी के दीये, 7) केले के पत्ते, 8) जूट की रस्सी से झंडे। कृत्रिम फूल, प्लास्टिक सजावट से बचें।
                </p>
              </div>

              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-2xl border-2 border-rose-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">क्या हम घर पर इको-फ्रेंडली छठ पूजा कर सकते हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  हां, घर पर इको-फ्रेंडली छठ पूजा कर सकते हैं: 1) बालकनी/छत पर मिनी घाट बनाएं, 2) बड़े बर्तन में पानी रखें, 3) बायोडिग्रेडेबल सामग्री उपयोग करें, 4) LED दीये लगाएं, 5) प्राकृतिक सजावट करें, 6) पूजा के बाद सफाई करें, 7) पानी पौधों में डालें। सबसे जरूरी भक्ति भाव है, स्थान नहीं।
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-2xl border-2 border-amber-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">इको-फ्रेंडली छठ पूजा के लिए बजट कितना चाहिए?</h3>
                <p className="text-gray-700 leading-relaxed">
                  इको-फ्रेंडली छठ पूजा का बजट सामान्य से कम या बराबर होता है: बांस का सूप ₹50-200, मिट्टी के दीये ₹20-50, फूल-पत्ते ₹100-300, कपड़े के थैले ₹50-100 (एक बार, बार-बार उपयोग), प्राकृतिक सजावट ₹100-300। कुल: ₹500-1500। प्लास्टिक से भी सस्ता और पर्यावरण के अनुकूल!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Articles */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">संबंधित आर्टिकल</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/blog/chhath-puja-2025-schedule" reloadDocument className="group">
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group-hover:scale-105">
                  <Clock className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600">पूर्ण कार्यक्रम</h3>
                  <p className="text-sm text-gray-600">4 दिनों की समय सारणी</p>
                </div>
              </Link>
              <Link to="/blog/chhath-puja-preparation-guide" reloadDocument className="group">
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group-hover:scale-105">
                  <BookOpen className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600">तैयारी गाइड</h3>
                  <p className="text-sm text-gray-600">15 दिन पहले से</p>
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-blue-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">बाहरी संदर्भ</h2>
            <div className="space-y-3">
              <a href="https://www.moef.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                पर्यावरण मंत्रालय, भारत सरकार
              </a>
              <a href="https://nmcg.nic.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                राष्ट्रीय स्वच्छ गंगा मिशन
              </a>
              <a href="https://swachhbharat.mygov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                स्वच्छ भारत अभियान
              </a>
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">यह लेख उपयोगी लगा?</h3>
            <p className="text-gray-600 mb-6">शेयर करें और दूसरों को जागरूक करें 🌱</p>
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
            <p className="mt-4 text-green-600 font-bold">🌱 हरित छठ पूजा - स्वच्छ पर्यावरण 🌱</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChhathPujaEcoFriendlyGuide;




