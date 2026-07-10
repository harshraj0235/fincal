import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Droplets, Sun, Moon, Home, ChevronRight, ExternalLink, Star, CheckCircle, AlertCircle, Share2, Sparkles, Info, Users, Heart, Clock, IndianRupee, Download, BookOpen, Award, TrendingUp, MessageCircle, ThumbsUp, Eye, Timer, Zap, Target, Shield, Utensils, Coffee, Milk, Carrot, Fish, Egg, Wheat, Banana, Orange, Grape, Cherry, Leaf, Battery, Activity, Brain, Stethoscope } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const ChhathPujaFastingTips: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [fastingDay, setFastingDay] = useState<'nahay-khay' | 'kharna' | 'nirjala' | 'parana'>('nirjala');
  const [waterIntake, setWaterIntake] = useState(0);
  const [showDietPlan, setShowDietPlan] = useState(false);

  const fastingPhases = [
    {
      id: 'nahay-khay',
      name: 'नहाय खाय',
      duration: '1 दिन',
      icon: Utensils,
      color: 'from-blue-400 to-cyan-500',
      description: 'पहले दिन सात्विक भोजन',
      difficulty: 'आसान'
    },
    {
      id: 'kharna',
      name: 'खरना',
      duration: '1 दिन',
      icon: Coffee,
      color: 'from-purple-400 to-pink-500',
      description: 'गुड़ की खीर और फल',
      difficulty: 'मध्यम'
    },
    {
      id: 'nirjala',
      name: 'निर्जला व्रत',
      duration: '36 घंटे',
      icon: Droplets,
      color: 'from-orange-400 to-red-500',
      description: 'बिना जल के व्रत',
      difficulty: 'कठिन'
    },
    {
      id: 'parana',
      name: 'पारण',
      duration: '1 दिन',
      icon: Apple,
      color: 'from-green-400 to-teal-500',
      description: 'व्रत समापन',
      difficulty: 'आसान'
    }
  ];

  const dietPlan = {
    'nahay-khay': {
      breakfast: ['दलिया', 'फल', 'दूध', 'सूखे मेवे'],
      lunch: ['चावल', 'दाल', 'सब्जी (बिना लहसुन-प्याज)', 'रोटी'],
      dinner: ['खिचड़ी', 'दही', 'फल'],
      avoid: ['लहसुन', 'प्याज', 'मांस', 'अंडे', 'शराब'],
      waterIntake: '8-10 गिलास'
    },
    'kharna': {
      evening: ['गुड़ की खीर', 'चावल', 'केला', 'अन्य फल', 'रोटी'],
      avoid: ['सभी प्रकार का भोजन (खरना के बाद)', 'जल (36 घंटे निर्जला शुरू)'],
      waterIntake: 'खरना से पहले खूब पानी पीएं'
    },
    'nirjala': {
      rules: ['कोई भोजन नहीं', 'कोई जल नहीं', '36 घंटे व्रत', 'केवल ध्यान और प्रार्थना'],
      tips: ['आराम करें', 'भारी काम न करें', 'छाया में रहें', 'मानसिक शक्ति बढ़ाएं']
    },
    'parana': {
      first: ['थोड़ा पानी', 'प्रसाद (ठेकुआ, फल)', 'हल्का भोजन'],
      avoid: ['भारी भोजन तुरंत न लें', 'तला-भुना खाना', 'ज्यादा मीठा'],
      waterIntake: 'धीरे-धीरे पानी पीएं'
    }
  };

  const healthTips = [
    {
      icon: Droplets,
      title: 'पर्याप्त जल',
      description: 'व्रत से पहले खूब पानी पीएं',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Apple,
      title: 'पौष्टिक आहार',
      description: 'नहाय खाय में पोषक तत्व लें',
      color: 'from-green-400 to-teal-500'
    },
    {
      icon: Battery,
      title: 'ऊर्जा संरक्षण',
      description: 'भारी काम से बचें',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Heart,
      title: 'आराम करें',
      description: 'पर्याप्त नींद और विश्राम',
      color: 'from-pink-400 to-rose-500'
    }
  ];

  return (
    <>
      <SEOHelmet
        title={`छठ पूजा फास्टिंग टिप्स ${currentYear}: 36 घंटे निर्जला व्रत कैसे रखें | Chhath Puja Fasting Guide`}
        description={`छठ पूजा ${currentYear} व्रत गाइड: नहाय खाय, खरना, 36 घंटे निर्जला व्रत के नियम। क्या खाएं, क्या न खाएं, स्वास्थ्य सुझाव, पानी कब पीएं, व्रत तोड़ने की विधि। डायबिटीज, हृदय रोगी, गर्भवती महिलाओं के लिए विशेष सुझाव। पूर्ण डाइट प्लान।`}
        keywords={`छठ व्रत टिप्स ${currentYear}, chhath puja fasting tips, निर्जला व्रत कैसे रखें, खरना क्या खाएं, नहाय खाय भोजन, छठ व्रत नियम, 36 घंटे व्रत, व्रत के फायदे, fasting guide hindi, सात्विक भोजन, छठ पूजा डाइट प्लान`}
        canonicalUrl={`/blog/chhath-puja-fasting-tips-${currentYear}`}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
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
              <span className="text-gray-700 font-medium">फास्टिंग टिप्स</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full mb-6 font-bold shadow-lg">
              <Apple className="w-5 h-5" />
              फास्टिंग गाइड
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 mb-6 leading-tight">
              छठ पूजा फास्टिंग टिप्स
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
              36 घंटे निर्जला व्रत की पूर्ण गाइड - क्या खाएं, क्या न खाएं
            </p>
          </motion.div>

          {/* Water Intake Tracker */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                <Droplets className="w-8 h-8 text-blue-600" />
                पानी ट्रैकर (व्रत से पहले)
              </h2>
              <p className="text-gray-600 mb-6">व्रत से पहले पर्याप्त पानी पीना बहुत जरूरी है</p>
              
              <div className="relative w-48 h-48 mx-auto mb-6">
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
                    stroke="url(#waterGradient)"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 80}`}
                    strokeDashoffset={`${2 * Math.PI * 80 * (1 - waterIntake / 10)}`}
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-black text-blue-600">{waterIntake}</div>
                  <div className="text-sm text-gray-600">/ 10 गिलास</div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setWaterIntake(Math.max(0, waterIntake - 1))}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl font-bold transition-all"
                  disabled={waterIntake === 0}
                >
                  -
                </button>
                <button
                  onClick={() => setWaterIntake(Math.min(10, waterIntake + 1))}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                  disabled={waterIntake === 10}
                >
                  +
                </button>
              </div>
              
              {waterIntake === 10 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-50 rounded-xl border-2 border-green-200"
                >
                  <p className="text-green-700 font-bold">बहुत अच्छा! आप व्रत के लिए तैयार हैं 💧</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Fasting Phases */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">व्रत के चरण</h2>
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {fastingPhases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => setFastingDay(phase.id as any)}
                  className={`p-6 rounded-xl transition-all ${
                    fastingDay === phase.id 
                      ? `bg-gradient-to-r ${phase.color} text-white shadow-lg` 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <phase.icon className="w-12 h-12 mx-auto mb-3" />
                  <div className="font-bold text-lg mb-1">{phase.name}</div>
                  <div className="text-sm opacity-90">{phase.duration}</div>
                  <div className="text-xs mt-2 opacity-75">{phase.difficulty}</div>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={fastingDay}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border-2 border-orange-200"
              >
                {fastingDay === 'nahay-khay' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">नहाय खाय - पहले दिन का भोजन</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-white rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Sun className="w-6 h-6 text-orange-600" />
                          सुबह (नाश्ता)
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          {dietPlan['nahay-khay'].breakfast.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Sun className="w-6 h-6 text-yellow-600" />
                          दोपहर (भोजन)
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          {dietPlan['nahay-khay'].lunch.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Moon className="w-6 h-6 text-purple-600" />
                          रात (भोजन)
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          {dietPlan['nahay-khay'].dinner.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-red-50 rounded-xl border-2 border-red-200">
                      <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        क्या न खाएं:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {dietPlan['nahay-khay'].avoid.map((item, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-red-200">
                            ❌ {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {fastingDay === 'kharna' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">खरना - दूसरे दिन की शाम</h3>
                    <div className="bg-white rounded-xl p-6 mb-6">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Moon className="w-6 h-6 text-purple-600" />
                        शाम का भोजन (5:00 - 7:00 PM)
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-bold text-gray-800 mb-3">मुख्य भोजन:</h5>
                          <ul className="space-y-2 text-gray-700">
                            {dietPlan['kharna'].evening.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <h5 className="font-bold text-gray-800 mb-2">महत्वपूर्ण:</h5>
                          <p className="text-gray-700 text-sm mb-2">
                            खरना के बाद 36 घंटे का निर्जला व्रत शुरू हो जाता है। इसलिए:
                          </p>
                          <ul className="space-y-1 text-gray-700 text-sm">
                            <li>✓ पेट भरकर खाएं</li>
                            <li>✓ खूब पानी पीएं</li>
                            <li>✓ हल्का और पाचक भोजन लें</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
                      <h4 className="font-bold text-orange-900 mb-2">खरना के बाद:</h4>
                      <p className="text-gray-700">
                        खरना के बाद अगले 36 घंटे तक <strong>कोई भोजन या जल नहीं</strong>। यह सबसे कठिन समय है। मानसिक रूप से तैयार रहें और आराम करें।
                      </p>
                    </div>
                  </div>
                )}

                {fastingDay === 'nirjala' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">निर्जला व्रत - 36 घंटे</h3>
                    <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200 mb-6">
                      <h4 className="font-bold text-red-900 mb-4 text-xl">सबसे महत्वपूर्ण नियम:</h4>
                      <ul className="space-y-3 text-gray-700">
                        {dietPlan['nirjala'].rules.map((rule, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                            <span className="font-medium">{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-4">इस दौरान क्या करें:</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {dietPlan['nirjala'].tips.map((tip, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                            <span className="text-gray-700">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                      <h4 className="font-bold text-green-900 mb-2">याद रखें:</h4>
                      <p className="text-gray-700">
                        यह व्रत केवल शारीरिक नहीं, बल्कि आध्यात्मिक भी है। मन को शांत रखें, सूर्य देव का ध्यान करें, और विश्वास रखें। हजारों वर्षों से लोग यह व्रत रख रहे हैं।
                      </p>
                    </div>
                  </div>
                )}

                {fastingDay === 'parana' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">पारण - व्रत समापन</h3>
                    <div className="bg-white rounded-xl p-6 mb-6">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Sun className="w-6 h-6 text-yellow-600" />
                        उषा अर्घ्य के बाद (सुबह 6:00 - 7:00)
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h5 className="font-bold text-gray-800 mb-3">पहले क्या लें:</h5>
                          <ul className="space-y-2 text-gray-700">
                            {dietPlan['parana'].first.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h5 className="font-bold text-gray-800 mb-2">महत्वपूर्ण सुझाव:</h5>
                          <ul className="space-y-2 text-gray-700 text-sm">
                            <li>• पहले थोड़ा पानी पीएं, धीरे-धीरे</li>
                            <li>• प्रसाद ग्रहण करें</li>
                            <li>• 1-2 घंटे बाद हल्का भोजन लें</li>
                            <li>• दोपहर में सामान्य भोजन कर सकते हैं</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200">
                      <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        इनसे बचें:
                      </h4>
                      <ul className="space-y-1 text-gray-700">
                        {dietPlan['parana'].avoid.map((item, idx) => (
                          <li key={idx}>❌ {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Health Tips */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">स्वास्थ्य सुझाव</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {healthTips.map((tip, index) => (
                <div key={index} className={`bg-gradient-to-br ${tip.color} p-6 rounded-2xl text-white`}>
                  <tip.icon className="w-12 h-12 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{tip.title}</h3>
                  <p className="opacity-90">{tip.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Special Conditions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">विशेष परिस्थितियां</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border-2 border-red-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Stethoscope className="w-6 h-6 text-red-600" />
                  डायबिटीज के मरीज
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <span>डॉक्टर से सलाह लें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <span>मध्यम व्रत रखें (पानी पी सकते हैं)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <span>शुगर लेवल नियमित जांचें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <span>दवाइयां समय पर लें</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-purple-600" />
                  गर्भवती महिलाएं
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>निर्जला व्रत न रखें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>हल्का व्रत या केवल सात्विक भोजन लें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>पानी जरूर पीएं</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>भारी काम से बचें</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-600" />
                  हृदय रोगी
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span>कार्डियोलॉजिस्ट से अनुमति लें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span>पूर्ण निर्जला व्रत न रखें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span>दवाइयों का समय न भूलें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span>आराम करें, तनाव न लें</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-green-600" />
                  बुजुर्ग लोग
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>मध्यम व्रत रखें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>पानी जरूर पीएं</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>परिवार के साथ रहें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>भावना महत्वपूर्ण है, कठोरता नहीं</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Comprehensive FAQ */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
              <MessageCircle className="w-8 h-8 text-orange-600" />
              अक्सर पूछे जाने वाले प्रश्न
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा में 36 घंटे का व्रत कैसे रखें?</h3>
                <p className="text-gray-700 leading-relaxed">
                  36 घंटे का निर्जला व्रत रखने के लिए: 1) <strong>खरना में पेट भरकर खाएं</strong> और खूब पानी पीएं, 2) <strong>मानसिक रूप से तैयार</strong> रहें, 3) <strong>भारी काम न करें</strong>, आराम करें, 4) <strong>धूप से बचें</strong>, छाया में रहें, 5) <strong>ध्यान और प्रार्थना</strong> करें, मन को व्यस्त रखें, 6) <strong>परिवार के साथ रहें</strong>, अकेले न रहें, 7) <strong>विश्वास रखें</strong> - हजारों साल से लोग यह व्रत रख रहे हैं। कमजोरी महसूस हो तो तुरंत व्रत तोड़ें।
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा में खरना में क्या खाना चाहिए?</h3>
                <p className="text-gray-700 leading-relaxed">
                  खरना में मुख्य भोजन: <strong>गुड़ की खीर (सबसे जरूरी), चावल, रोटी, केला, सेब, अन्य फल</strong>। गुड़ की खीर ऊर्जा देती है और पाचन में आसान है। इसके बाद 36 घंटे कुछ नहीं खाना/पीना है, इसलिए पेट भरकर खाएं लेकिन ज्यादा भारी खाना न लें। <strong>खूब पानी पीएं</strong> (8-10 गिलास)। तला-भुना, मसालेदार खाना न लें। सादा और सात्विक भोजन लें।
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ व्रत में क्या नहीं खाना चाहिए?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ व्रत में इन चीजों से बचें: <strong>लहसुन, प्याज</strong> (पूरे व्रत काल में), <strong>मांस, मछली, अंडे</strong> (नॉन-वेज), <strong>शराब, तंबाकू</strong>, <strong>तला-भुना भोजन</strong> (पकौड़ी, समोसा), <strong>ज्यादा मसालेदार खाना</strong>, <strong>बाहर का खाना</strong>, <strong>पैकेज्ड फूड</strong>। केवल <strong>सात्विक और घर का बना भोजन</strong> लें। व्रत के दौरान शुद्धता बहुत जरूरी है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ व्रत तोड़ने की विधि क्या है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ व्रत (पारण) तोड़ने की विधि: 1) <strong>उषा अर्घ्य के बाद</strong> (सुबह 6-7 बजे), 2) <strong>पहले थोड़ा पानी पीएं</strong>, धीरे-धीरे, 3) <strong>छठ प्रसाद लें</strong> (ठेकुआ, फल), 4) <strong>गुड़ का पानी या शरबत</strong> पीएं, 5) <strong>1-2 घंटे बाद हल्का भोजन</strong> लें, 6) <strong>दोपहर में सामान्य भोजन</strong>। एकदम से भारी खाना न लें, पेट खराब हो सकता है। धीरे-धीरे सामान्य आहार शुरू करें।
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">क्या छठ व्रत में दूध पी सकते हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  <strong>निर्जला व्रत के दौरान (36 घंटे) कुछ भी नहीं पी सकते</strong> - न पानी, न दूध, कुछ नहीं। हालांकि, <strong>नहाय खाय और खरना में दूध पी सकते हैं</strong>। नहाय खाय में सुबह दूध, दलिया ले सकते हैं। खरना में गुड़ की खीर में दूध होता है। <strong>पारण के बाद</strong> भी दूध पी सकते हैं। लेकिन निर्जला व्रत का मतलब है - कोई तरल पदार्थ नहीं।
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ व्रत में पानी पीने का सही समय क्या है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  पानी पीने का समय: <strong>नहाय खाय (पहले दिन):</strong> पूरे दिन पानी पी सकते हैं, <strong>खरना से पहले:</strong> खूब पानी पीएं (8-10 गिलास), <strong>खरना के बाद से उषा अर्घ्य तक (36 घंटे):</strong> बिल्कुल पानी नहीं, <strong>उषा अर्घ्य के बाद:</strong> धीरे-धीरे पानी पीना शुरू करें। निर्जला व्रत से पहले जितना हो सके पानी पीएं, यह बहुत जरूरी है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border-2 border-indigo-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ व्रत में कमजोरी महसूस हो तो क्या करें?</h3>
                <p className="text-gray-700 leading-relaxed">
                  अगर कमजोरी महसूस हो: 1) <strong>तुरंत बैठ जाएं या लेट जाएं</strong>, 2) <strong>ठंडी जगह पर जाएं</strong>, 3) <strong>परिवार को बताएं</strong>, 4) <strong>अगर ज्यादा कमजोरी हो तो व्रत तोड़ दें</strong> - थोड़ा पानी या शक्कर का पानी पीएं, 5) <strong>डॉक्टर से संपर्क करें</strong> अगर जरूरत हो। याद रखें: भक्ति भाव सबसे महत्वपूर्ण है, न कि कठोरता। स्वास्थ्य पहले आता है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-2xl border-2 border-teal-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ व्रत के स्वास्थ्य लाभ क्या हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ व्रत के स्वास्थ्य लाभ: 1) <strong>शरीर की शुद्धि</strong> (डिटॉक्सिफिकेशन), 2) <strong>पाचन तंत्र को आराम</strong>, 3) <strong>मेटाबॉलिज्म सुधरता है</strong>, 4) <strong>मानसिक शांति</strong> और आत्मविश्वास बढ़ता है, 5) <strong>सूर्य किरणों से विटामिन डी</strong>, 6) <strong>आत्म-नियंत्रण</strong> की शक्ति बढ़ती है, 7) <strong>तनाव कम</strong> होता है। हालांकि, सही तरीके से व्रत रखना जरूरी है। <Link to="/blog/chhath-puja-health-benefits" reloadDocument className="text-blue-600 hover:underline">पूरी जानकारी यहां पढ़ें</Link>।
                </p>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl border-2 border-emerald-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">पहली बार छठ व्रत रख रहे हैं, क्या सुझाव हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  पहली बार छठ व्रत रखने वालों के लिए: 1) <strong>मानसिक रूप से तैयार</strong> हों, यह कठिन है लेकिन संभव है, 2) <strong>खरना में खूब खाएं और पानी पीएं</strong>, 3) <strong>परिवार के साथ रहें</strong>, अनुभवी लोगों से सीखें, 4) <strong>आराम करें</strong>, भारी काम न करें, 5) <strong>सकारात्मक सोचें</strong>, डरें नहीं, 6) <strong>किसी बीमारी हो तो पहले डॉक्टर से पूछें</strong>, 7) <strong>भक्ति भाव रखें</strong> - यह सबसे जरूरी है। हजारों लोग पहली बार रखते हैं और सफल होते हैं।
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-2xl border-2 border-amber-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ व्रत के दौरान क्या काम कर सकते हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ व्रत के दौरान: <strong>हल्के काम कर सकते हैं</strong> - घर के छोटे काम, ऑफिस का हल्का काम, पूजा की तैयारी। लेकिन <strong>इनसे बचें:</strong> भारी शारीरिक श्रम, ज्यादा चलना-फिरना, धूप में काम, तनाव वाला काम, लंबे समय तक खड़े रहना। <strong>सबसे अच्छा है:</strong> आराम करें, ध्यान करें, छठ गीत सुनें, परिवार के साथ समय बिताएं, पूजा की तैयारी में मदद करें। ऊर्जा बचाएं।
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Articles */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">संबंधित आर्टिकल</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/blog/chhath-puja-preparation-guide" reloadDocument className="group">
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group-hover:scale-105">
                  <BookOpen className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600">तैयारी गाइड</h3>
                  <p className="text-sm text-gray-600">15 दिन पहले से शुरू करें</p>
                </div>
              </Link>
              <Link to="/blog/chhath-puja-prasad-recipes" reloadDocument className="group">
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group-hover:scale-105">
                  <Star className="w-8 h-8 text-yellow-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-yellow-600">प्रसाद रेसिपी</h3>
                  <p className="text-sm text-gray-600">ठेकुआ, खीर बनाएं</p>
                </div>
              </Link>
              <Link to="/blog/chhath-puja-health-benefits" reloadDocument className="group">
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group-hover:scale-105">
                  <Heart className="w-8 h-8 text-red-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600">स्वास्थ्य लाभ</h3>
                  <p className="text-sm text-gray-600">व्रत के फायदे जानें</p>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* External Resources */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-blue-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">बाहरी संदर्भ</h2>
            <div className="space-y-3">
              <a href="https://www.who.int/health-topics/nutrition" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                WHO - Nutrition Guidelines
              </a>
              <a href="https://www.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                NCBI - Fasting Research
              </a>
              <a href="https://www.ayush.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                आयुष मंत्रालय
              </a>
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">यह लेख उपयोगी लगा?</h3>
            <p className="text-gray-600 mb-6">शेयर करें और दूसरों को स्वस्थ व्रत रखने में मदद करें</p>
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
            <p className="mt-4 text-orange-600 font-bold">🙏 स्वस्थ रहें, सुरक्षित व्रत रखें 🙏</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChhathPujaFastingTips;




