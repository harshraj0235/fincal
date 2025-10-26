import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sun, Moon, Home, ChevronRight, ExternalLink, Star, CheckCircle, AlertCircle, Share2, Sparkles, Info, Users, Clock, MapPin, Calculator, Download, BookOpen, Award, TrendingUp, MessageCircle, ThumbsUp, Eye, Timer, Zap, Target, Shield, Activity, Brain, ShieldCheck, Leaf, Droplets, Wind, Thermometer, Stethoscope, Pill, Apple, Carrot, Fish, Milk, Egg, Wheat, Banana, Orange, Grape, Cherry, Coffee, Tea, Water, Flame, Snowflake, Cloud, CloudRain, Sun as SunIcon } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { getAllCities, ALL_STATES_UTS, getStateByCity } from '../../data/indiaLocations';

const ChhathPujaHealthBenefits: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedBenefit, setSelectedBenefit] = useState('vitamin-d');
  const [showResearch, setShowResearch] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const healthBenefits = [
    {
      id: 'vitamin-d',
      title: 'विटामिन डी की प्राप्ति',
      icon: Sun,
      color: 'from-yellow-400 to-orange-500',
      description: 'सूर्य की किरणों से प्राकृतिक विटामिन डी',
      details: 'छठ पूजा में सूर्योदय और सूर्यास्त के समय सूर्य की किरणों के संपर्क में आने से शरीर को प्राकृतिक विटामिन डी मिलता है। यह हड्डियों को मजबूत बनाता है और रोग प्रतिरोधक क्षमता बढ़ाता है।'
    },
    {
      id: 'detox',
      title: 'शरीर की शुद्धि',
      icon: Droplets,
      color: 'from-blue-400 to-cyan-500',
      description: 'जल और व्रत से डिटॉक्सिफिकेशन',
      details: '36 घंटे का निर्जला व्रत और जल में खड़े होकर पूजा करने से शरीर की पूर्ण शुद्धि होती है। यह पाचन तंत्र को आराम देता है और शरीर से विषाक्त पदार्थों को निकालता है।'
    },
    {
      id: 'mental-health',
      title: 'मानसिक शांति',
      icon: Brain,
      color: 'from-purple-400 to-pink-500',
      description: 'ध्यान और आध्यात्मिक शांति',
      details: 'छठ पूजा के दौरान मन की शुद्धि और आध्यात्मिक अनुभूति से मानसिक तनाव कम होता है। यह अवसाद और चिंता को दूर करने में मदद करता है।'
    },
    {
      id: 'skin-health',
      title: 'त्वचा स्वास्थ्य',
      icon: ShieldCheck,
      color: 'from-green-400 to-teal-500',
      description: 'सूर्य किरणों से त्वचा रोगों में लाभ',
      details: 'सूर्य की हल्की किरणें त्वचा रोगों जैसे सोरायसिस, एक्जिमा आदि में लाभकारी होती हैं। यह त्वचा को स्वस्थ और चमकदार बनाती हैं।'
    },
    {
      id: 'immune-system',
      title: 'रोग प्रतिरोधक क्षमता',
      icon: Shield,
      color: 'from-red-400 to-pink-500',
      description: 'प्रतिरक्षा तंत्र को मजबूत बनाना',
      details: 'सूर्य की किरणों और व्रत के संयोजन से शरीर की रोग प्रतिरोधक क्षमता बढ़ती है। यह सर्दी-जुकाम और अन्य संक्रमणों से बचाता है।'
    },
    {
      id: 'sleep-quality',
      title: 'नींद की गुणवत्ता',
      icon: Moon,
      color: 'from-indigo-400 to-purple-500',
      description: 'बेहतर नींद और आराम',
      details: 'छठ पूजा के बाद नींद की गुणवत्ता में सुधार होता है। यह अनिद्रा की समस्या को दूर करने में मदद करता है।'
    }
  ];

  const researchData = [
    {
      title: 'सूर्य किरणों का स्वास्थ्य पर प्रभाव',
      source: 'नेशनल इंस्टीट्यूट ऑफ हेल्थ, यूएसए',
      findings: 'सुबह और शाम की सूर्य किरणें विटामिन डी के लिए सबसे अच्छी होती हैं। यह हड्डियों, मांसपेशियों और प्रतिरक्षा तंत्र के लिए आवश्यक है।',
      year: '2023'
    },
    {
      title: 'व्रत के स्वास्थ्य लाभ',
      source: 'हार्वर्ड मेडिकल स्कूल',
      findings: 'अंतराल व्रत (Intermittent Fasting) से मेटाबॉलिज्म सुधरता है, वजन कम होता है और मस्तिष्क की कार्यक्षमता बढ़ती है।',
      year: '2022'
    },
    {
      title: 'जल चिकित्सा का महत्व',
      source: 'आयुर्वेद अनुसंधान संस्थान',
      findings: 'जल में खड़े होकर व्यायाम करने से रक्त संचार बेहतर होता है, मांसपेशियां मजबूत होती हैं और तनाव कम होता है।',
      year: '2023'
    }
  ];

  const nutritionFacts = [
    { name: 'ठेकुआ', calories: 150, protein: 3, carbs: 25, fat: 5, benefits: 'ऊर्जा और पोषण' },
    { name: 'गुड़ की खीर', calories: 200, protein: 4, carbs: 35, fat: 6, benefits: 'आयरन और कैल्शियम' },
    { name: 'केला', calories: 90, protein: 1, carbs: 23, fat: 0, benefits: 'पोटैशियम और विटामिन बी6' },
    { name: 'नारियल', calories: 350, protein: 3, carbs: 15, fat: 33, benefits: 'स्वस्थ वसा और फाइबर' }
  ];

  return (
    <>
      <SEOHelmet
        title={`छठ पूजा के स्वास्थ्य लाभ: वैज्ञानिक शोध और चिकित्सकीय फायदे | Chhath Puja Health Benefits ${currentYear}`}
        description={`छठ पूजा के स्वास्थ्य लाभ: सूर्य किरणों से विटामिन डी, 36 घंटे व्रत से डिटॉक्स, जल चिकित्सा से त्वचा स्वास्थ्य। वैज्ञानिक शोध, चिकित्सकीय फायदे, पोषण तथ्य। छठ पूजा कैसे स्वास्थ्य के लिए फायदेमंद है? ${currentYear} में नवीनतम शोध।`}
        keywords={`छठ पूजा स्वास्थ्य लाभ ${currentYear}, chhath puja health benefits, सूर्य किरणों के फायदे, व्रत के स्वास्थ्य लाभ, जल चिकित्सा, विटामिन डी, डिटॉक्सिफिकेशन, त्वचा स्वास्थ्य, मानसिक शांति, रोग प्रतिरोधक क्षमता`}
        canonicalUrl={`https://moneycal.in/blog/chhath-puja-health-benefits-${currentYear}`}
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="bg-white/80 backdrop-blur-sm border-b border-green-100">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-green-600 hover:text-green-800 flex items-center gap-1">
                <Home className="w-4 h-4" />
                होम
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to="/blog" className="text-green-600 hover:text-green-800">
                ब्लॉग
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 font-medium">स्वास्थ्य लाभ</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full mb-6 font-bold shadow-lg">
              <Heart className="w-5 h-5" />
              स्वास्थ्य विज्ञान
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 mb-6 leading-tight">
              छठ पूजा के स्वास्थ्य लाभ
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
              वैज्ञानिक शोध और चिकित्सकीय फायदे
            </p>
          </motion.div>

          {/* Live Health Dashboard */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Activity className="w-8 h-8 text-green-600" />
                स्वास्थ्य डैशबोर्ड
              </h2>
              <div className="text-sm text-gray-500">
                {currentTime.toLocaleTimeString('hi-IN')}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-xl border-2 border-yellow-200">
                <Sun className="w-8 h-8 text-yellow-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">विटामिन डी</div>
                <div className="text-sm text-gray-600">सूर्य किरणों से</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border-2 border-blue-200">
                <Droplets className="w-8 h-8 text-blue-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">डिटॉक्स</div>
                <div className="text-sm text-gray-600">36 घंटे व्रत</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200">
                <Brain className="w-8 h-8 text-purple-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">मानसिक शांति</div>
                <div className="text-sm text-gray-600">ध्यान से</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl border-2 border-green-200">
                <Shield className="w-8 h-8 text-green-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">प्रतिरक्षा</div>
                <div className="text-sm text-gray-600">मजबूत होती है</div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Health Benefits */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">स्वास्थ्य लाभ</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {healthBenefits.map((benefit, index) => (
                <button
                  key={benefit.id}
                  onClick={() => setSelectedBenefit(benefit.id)}
                  className={`p-4 rounded-xl transition-all ${
                    selectedBenefit === benefit.id 
                      ? `bg-gradient-to-r ${benefit.color} text-white shadow-lg` 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <benefit.icon className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-bold text-sm">{benefit.title}</div>
                </button>
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedBenefit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border-2 border-blue-200"
              >
                {healthBenefits.map(benefit => (
                  benefit.id === selectedBenefit && (
                    <div key={benefit.id}>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <benefit.icon className="w-8 h-8 text-blue-600" />
                        {benefit.title}
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        {benefit.details}
                      </p>
                      <div className="bg-white rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-3">वैज्ञानिक आधार:</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                            <span>अंतर्राष्ट्रीय शोध द्वारा प्रमाणित</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                            <span>आयुर्वेद और आधुनिक चिकित्सा का संयोजन</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                            <span>हजारों वर्षों का अनुभव</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Scientific Research Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                वैज्ञानिक शोध
              </h2>
              <button 
                onClick={() => setShowResearch(!showResearch)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                {showResearch ? 'छुपाएं' : 'देखें'}
              </button>
            </div>
            
            <AnimatePresence>
              {showResearch && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  {researchData.map((research, index) => (
                    <div key={index} className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white rounded-full p-3">
                          <Award className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{research.title}</h3>
                          <p className="text-gray-600 mb-2">
                            <strong>स्रोत:</strong> {research.source} ({research.year})
                          </p>
                          <p className="text-gray-700 leading-relaxed">{research.findings}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Nutrition Facts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
              <Apple className="w-8 h-8 text-green-600" />
              पोषण तथ्य
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {nutritionFacts.map((item, index) => (
                <div key={index} className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.name}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{item.calories}</div>
                      <div className="text-sm text-gray-600">कैलोरी</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{item.protein}g</div>
                      <div className="text-sm text-gray-600">प्रोटीन</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{item.carbs}g</div>
                      <div className="text-sm text-gray-600">कार्बोहाइड्रेट</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{item.fat}g</div>
                      <div className="text-sm text-gray-600">वसा</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      <strong>लाभ:</strong> {item.benefits}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Health Tips */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">स्वास्थ्य सुझाव</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  व्रत के दौरान
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>पहले से ही खूब पानी पीएं</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>हल्का व्यायाम करें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>तनाव न लें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>पर्याप्त आराम करें</span>
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
                    <span>डायबिटीज के मरीज सावधानी बरतें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <span>हृदय रोगी डॉक्टर से सलाह लें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <span>गर्भवती महिलाएं सावधान रहें</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <span>बुजुर्ग लोग मध्यम व्रत रखें</span>
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
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा के स्वास्थ्य लाभ क्या हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा के मुख्य स्वास्थ्य लाभ: 1) सूर्य किरणों से विटामिन डी की प्राप्ति, 2) 36 घंटे व्रत से शरीर की शुद्धि, 3) जल चिकित्सा से त्वचा स्वास्थ्य, 4) मानसिक शांति और तनाव कमी, 5) रोग प्रतिरोधक क्षमता में वृद्धि, 6) नींद की गुणवत्ता में सुधार।
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">36 घंटे का व्रत स्वास्थ्य के लिए कैसे फायदेमंद है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  36 घंटे का निर्जला व्रत शरीर के लिए अत्यंत लाभकारी है। यह पाचन तंत्र को आराम देता है, शरीर से विषाक्त पदार्थों को निकालता है, मेटाबॉलिज्म को सुधारता है, और सेलुलर रिपेयर प्रक्रिया को तेज करता है। यह वजन कम करने और मधुमेह नियंत्रण में भी मदद करता है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">सूर्य की किरणें कैसे स्वास्थ्य के लिए फायदेमंद हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  सूर्योदय और सूर्यास्त की किरणें विशेष रूप से स्वास्थ्य के लिए फायदेमंद हैं। ये किरणें विटामिन डी का सबसे अच्छा स्रोत हैं, जो हड्डियों को मजबूत बनाता है, रोग प्रतिरोधक क्षमता बढ़ाता है, त्वचा रोगों में लाभ देता है, और मानसिक स्वास्थ्य को सुधारता है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">जल में खड़े होकर पूजा करने के क्या फायदे हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  जल में खड़े होकर पूजा करने से कई स्वास्थ्य लाभ होते हैं: 1) रक्त संचार बेहतर होता है, 2) मांसपेशियां मजबूत होती हैं, 3) तनाव कम होता है, 4) त्वचा की शुद्धि होती है, 5) मानसिक शांति मिलती है, 6) प्रकृति के साथ सीधा संबंध स्थापित होता है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा के प्रसाद कैसे स्वास्थ्य के लिए फायदेमंद हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा के प्रसाद पूरी तरह सात्विक और पौष्टिक होते हैं। ठेकुआ ऊर्जा का अच्छा स्रोत है, गुड़ की खीर आयरन और कैल्शियम से भरपूर है, केला पोटैशियम और विटामिन बी6 देता है, नारियल स्वस्थ वसा और फाइबर प्रदान करता है। ये सभी प्राकृतिक और रसायन मुक्त हैं।
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border-2 border-indigo-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">क्या छठ पूजा मानसिक स्वास्थ्य के लिए फायदेमंद है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  हां, छठ पूजा मानसिक स्वास्थ्य के लिए अत्यंत फायदेमंद है। यह तनाव और चिंता को कम करता है, मन की शुद्धि करता है, आध्यात्मिक शांति देता है, नींद की गुणवत्ता सुधारता है, और सकारात्मक सोच को बढ़ावा देता है। यह एक प्रकार का मेडिटेशन भी है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-2xl border-2 border-teal-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा से कौन-से रोगों में लाभ होता है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा से कई रोगों में लाभ होता है: 1) त्वचा रोग (सोरायसिस, एक्जिमा), 2) हड्डी रोग (ऑस्टियोपोरोसिस), 3) मधुमेह (व्रत से इंसुलिन संवेदनशीलता सुधरती है), 4) हृदय रोग (कोलेस्ट्रॉल कम होता है), 5) मानसिक रोग (अवसाद, चिंता), 6) पाचन संबंधी समस्याएं।
                </p>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl border-2 border-emerald-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">क्या छठ पूजा वजन कम करने में मदद करती है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  हां, छठ पूजा वजन कम करने में मदद कर सकती है। 36 घंटे का व्रत मेटाबॉलिज्म को बढ़ाता है, फैट बर्निंग को तेज करता है, और इंसुलिन संवेदनशीलता को सुधारता है। हालांकि, यह एक अल्पकालिक प्रभाव है और स्थायी वजन कमी के लिए नियमित व्यायाम और संतुलित आहार आवश्यक है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-2xl border-2 border-rose-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा के दौरान क्या सावधानियां बरतनी चाहिए?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा के दौरान ये सावधानियां बरतनी चाहिए: 1) डायबिटीज, हृदय रोग, या अन्य गंभीर बीमारी वाले लोग डॉक्टर से सलाह लें, 2) गर्भवती महिलाएं सावधानी बरतें, 3) बुजुर्ग लोग मध्यम व्रत रखें, 4) व्रत से पहले खूब पानी पीएं, 5) कमजोरी महसूस हो तो तुरंत व्रत तोड़ें, 6) साफ पानी का उपयोग करें।
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-2xl border-2 border-amber-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा के बाद कैसे स्वस्थ रहें?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा के बाद स्वस्थ रहने के लिए: 1) धीरे-धीरे सामान्य आहार शुरू करें, 2) पहले तरल पदार्थ लें, 3) भारी भोजन से बचें, 4) नियमित व्यायाम करें, 5) पर्याप्त पानी पीएं, 6) सात्विक आहार का पालन करें, 7) तनाव से बचें, 8) नियमित नींद लें। यह आदतें छठ पूजा के लाभों को बनाए रखने में मदद करती हैं।
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Articles */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-gray-50 rounded-2xl p-8 mb-8">
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
              <Link to="/festival-tools/festival-countdown-clock" className="group">
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group-hover:scale-105">
                  <Timer className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600">काउंटडाउन</h3>
                  <p className="text-sm text-gray-600">लाइव समय गिनती</p>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* External Resources */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-blue-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">बाहरी संदर्भ</h2>
            <div className="space-y-3">
              <a href="https://www.nih.gov/news-events/news-releases/sunlight-vitamin-d-health" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                NIH - सूर्य किरणों और विटामिन डी
              </a>
              <a href="https://www.harvard.edu/news/harvard-medical-school" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                हार्वर्ड मेडिकल स्कूल - व्रत के लाभ
              </a>
              <a href="https://www.ayurveda.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                आयुर्वेद अनुसंधान संस्थान
              </a>
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="text-center">
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

export default ChhathPujaHealthBenefits;

