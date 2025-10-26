import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sun, Moon, Home, ChevronRight, ExternalLink, Star, CheckCircle, AlertCircle, Share2, Sparkles, Info, Users, Heart, Clock, Calculator, Download, Award, TrendingUp, MessageCircle, ThumbsUp, Eye, Timer, Zap, Target, Shield, Scroll, Crown, Flame, Mountain, Flower, TreePine, Bird, Fish, Droplets } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const ChhathPujaMythology: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedStory, setSelectedStory] = useState<'ramayana' | 'mahabharata' | 'draupadi' | 'karna' | 'priyavrata'>('ramayana');

  const mythologicalStories = [
    {
      id: 'ramayana',
      title: 'रामायण से जुड़ी कथा',
      icon: Crown,
      color: 'from-orange-400 to-red-500',
      period: 'त्रेता युग',
      characters: ['भगवान राम', 'माता सीता']
    },
    {
      id: 'mahabharata',
      title: 'महाभारत से जुड़ी कथा',
      icon: Flame,
      color: 'from-blue-400 to-cyan-500',
      period: 'द्वापर युग',
      characters: ['कर्ण', 'सूर्य देव']
    },
    {
      id: 'draupadi',
      title: 'द्रौपदी की कथा',
      icon: Flower,
      color: 'from-purple-400 to-pink-500',
      period: 'द्वापर युग',
      characters: ['द्रौपदी', 'पांडव']
    },
    {
      id: 'karna',
      title: 'कर्ण की सूर्य उपासना',
      icon: Sun,
      color: 'from-yellow-400 to-orange-500',
      period: 'द्वापर युग',
      characters: ['कर्ण', 'सूर्य देव']
    },
    {
      id: 'priyavrata',
      title: 'राजा प्रियव्रत की कथा',
      icon: Mountain,
      color: 'from-green-400 to-teal-500',
      period: 'प्राचीन काल',
      characters: ['राजा प्रियव्रत', 'षष्ठी देवी']
    }
  ];

  const significance = [
    {
      icon: Sun,
      title: 'सूर्य उपासना',
      description: 'प्रत्यक्ष देव की पूजा',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Droplets,
      title: 'प्रकृति का सम्मान',
      description: 'जल और पृथ्वी की पूजा',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'पारिवारिक एकता',
      description: 'परिवार साथ मिलकर मनाता है',
      color: 'from-pink-400 to-rose-500'
    },
    {
      icon: Shield,
      title: 'संतान की रक्षा',
      description: 'छठी मैया संतान को आशीर्वाद',
      color: 'from-green-400 to-teal-500'
    }
  ];

  return (
    <>
      <SEOHelmet
        title={`छठ पूजा की पौराणिक कथा और महत्व ${currentYear}: रामायण, महाभारत से जुड़े रहस्य | Chhath Puja Mythology`}
        description={`छठ पूजा ${currentYear} की पौराणिक कथाएं: रामायण में राम-सीता, महाभारत में कर्ण की सूर्य उपासना, द्रौपदी की कथा, राजा प्रियव्रत, षष्ठी देवी का महत्व। छठ पूजा क्यों मनाते हैं? सूर्य देव और छठी मैया की कहानी। धार्मिक और आध्यात्मिक महत्व।`}
        keywords={`छठ पूजा कथा ${currentYear}, chhath puja mythology, रामायण छठ पूजा, महाभारत कर्ण सूर्य, द्रौपदी कथा, छठी मैया कहानी, सूर्य देव उपासना, षष्ठी देवी, छठ पूजा क्यों मनाते हैं, धार्मिक महत्व, पौराणिक कथा`}
        canonicalUrl={`https://moneycal.in/blog/chhath-puja-mythology-${currentYear}`}
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
              <Link to="/blog" className="text-orange-600 hover:text-orange-800">
                ब्लॉग
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 font-medium">पौराणिक कथा</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full mb-6 font-bold shadow-lg">
              <Scroll className="w-5 h-5" />
              पौराणिक कथा
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 mb-6 leading-tight">
              छठ पूजा की पौराणिक कथा और महत्व
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
              रामायण और महाभारत से जुड़े रहस्य और धार्मिक महत्व
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">छठ पूजा का इतिहास</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                छठ पूजा भारत की सबसे प्राचीन और वैदिक परंपराओं में से एक है। यह पर्व हजारों वर्षों से मनाया जा रहा है और इसका उल्लेख प्राचीन धर्मग्रंथों में भी मिलता है। छठ पूजा का सबसे महत्वपूर्ण पहलू यह है कि इसमें सीधे प्रकृति और सूर्य देव की पूजा होती है, बिना किसी मध्यस्थ के।
              </p>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">वैदिक काल से आज तक</h3>
                <p className="text-gray-700 leading-relaxed">
                  ऋग्वेद में सूर्य देव की स्तुति के मंत्र मिलते हैं। प्राचीन काल में ऋषि-मुनि सूर्योदय और सूर्यास्त के समय सूर्य को अर्घ्य देते थे। यही परंपरा आज छठ पूजा के रूप में जीवित है। यह एकमात्र ऐसा पर्व है जो वैदिक काल से लेकर आज तक लगातार मनाया जा रहा है।
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mythological Stories Selector */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">पौराणिक कथाएं</h2>
            <div className="grid md:grid-cols-5 gap-4 mb-8">
              {mythologicalStories.map((story) => (
                <button
                  key={story.id}
                  onClick={() => setSelectedStory(story.id as any)}
                  className={`p-6 rounded-xl transition-all ${
                    selectedStory === story.id 
                      ? `bg-gradient-to-r ${story.color} text-white shadow-lg` 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <story.icon className="w-12 h-12 mx-auto mb-3" />
                  <div className="font-bold text-sm mb-2">{story.title}</div>
                  <div className="text-xs opacity-75">{story.period}</div>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border-2 border-orange-200"
              >
                {selectedStory === 'ramayana' && (
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <Crown className="w-10 h-10 text-orange-600" />
                      रामायण से जुड़ी कथा
                    </h3>
                    <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                      <p>
                        जब भगवान राम, माता सीता और लक्ष्मण 14 वर्ष के वनवास के बाद अयोध्या लौटे, तो उन्होंने कार्तिक शुक्ल पक्ष की षष्ठी तिथि को सूर्य देव की पूजा की। यह पूजा रावण के वध के बाद शुद्धि और आभार व्यक्त करने के लिए की गई थी।
                      </p>
                      <div className="bg-white rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-3">कथा का विवरण:</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                            <span>राम-सीता ने सरयू नदी के तट पर सूर्य देव को अर्घ्य दिया</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                            <span>यह पूजा विजय के बाद कृतज्ञता व्यक्त करने के लिए थी</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                            <span>तभी से यह परंपरा अयोध्या और उसके आसपास शुरू हुई</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                            <span>बाद में यह पूर्वी भारत में फैल गई</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-orange-100 p-4 rounded-lg">
                        <p className="font-semibold text-orange-900">
                          📖 यह कथा बताती है कि छठ पूजा विजय, शुद्धि और कृतज्ञता का प्रतीक है। भगवान राम ने यह संदेश दिया कि सूर्य देव जीवनदाता हैं और उनका आभार व्यक्त करना चाहिए।
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedStory === 'mahabharata' && (
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <Flame className="w-10 h-10 text-blue-600" />
                      महाभारत से जुड़ी कथा
                    </h3>
                    <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                      <p>
                        महाभारत में पांडवों की कहानी जुड़ी है। जब पांडव अपना राज्य जुए में हार गए और द्रौपदी का चीरहरण हुआ, तब उन्हें 13 वर्ष का वनवास मिला। इस कठिन समय में द्रौपदी ने सूर्य देव की आराधना की और छठ व्रत रखा।
                      </p>
                      <div className="bg-white rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-3">द्रौपदी और छठ पूजा:</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                            <span>द्रौपदी ने कठिन समय में सूर्य देव की शरण ली</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                            <span>छठ व्रत रखकर पांडवों की समस्याओं का समाधान मांगा</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                            <span>सूर्य देव ने प्रसन्न होकर उन्हें शक्ति और साहस दिया</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                            <span>अंत में पांडवों ने अपना राज्य वापस पाया</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-blue-100 p-4 rounded-lg">
                        <p className="font-semibold text-blue-900">
                          📖 यह कथा बताती है कि छठ व्रत से कठिनाइयों का समाधान होता है और सूर्य देव कृपा करते हैं। यह महिला सशक्तिकरण का भी प्रतीक है।
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedStory === 'draupadi' && (
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <Flower className="w-10 h-10 text-purple-600" />
                      द्रौपदी की कथा
                    </h3>
                    <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                      <p>
                        एक अन्य कथा के अनुसार, जब पांडव वनवास में थे और उन्हें भोजन की समस्या हो रही थी, तब भगवान कृष्ण ने द्रौपदी को छठ व्रत रखने की सलाह दी। द्रौपदी ने पूर्ण श्रद्धा से यह व्रत किया।
                      </p>
                      <div className="bg-white rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-3">कैसे हुई समस्या का समाधान:</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                            <span>द्रौपदी ने 4 दिन का कठोर व्रत रखा</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                            <span>सूर्य देव प्रसन्न हुए और अक्षय पात्र का वरदान दिया</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                            <span>इस पात्र से असीमित भोजन मिलने लगा</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                            <span>पांडवों की भोजन समस्या हमेशा के लिए समाप्त हो गई</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-purple-100 p-4 rounded-lg">
                        <p className="font-semibold text-purple-900">
                          📖 यह कथा बताती है कि छठ व्रत से सभी मनोकामनाएं पूर्ण होती हैं। द्रौपदी का विश्वास और समर्पण ही उनकी शक्ति थी।
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedStory === 'karna' && (
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <Sun className="w-10 h-10 text-yellow-600" />
                      कर्ण की सूर्य उपासना
                    </h3>
                    <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                      <p>
                        कर्ण, जो सूर्य पुत्र थे, प्रतिदिन सूर्योदय के समय नदी में खड़े होकर सूर्य देव को अर्घ्य देते थे। यह उनकी दैनिक साधना थी और इसी से उन्हें अपार शक्ति मिलती थी। कर्ण की यह परंपरा आज भी छठ पूजा के रूप में जीवित है।
                      </p>
                      <div className="bg-white rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-3">कर्ण की सूर्य साधना:</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                            <span>कर्ण रोज सुबह गंगा में खड़े होकर सूर्य को अर्घ्य देते थे</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                            <span>इस समय वे किसी की विनती नहीं टाल सकते थे (यही उनकी कमजोरी थी)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                            <span>सूर्य देव उन्हें अपार शक्ति और कवच-कुंडल देते थे</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                            <span>यह परंपरा आज भी अंग प्रदेश (बिहार-झारखंड) में है</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-yellow-100 p-4 rounded-lg">
                        <p className="font-semibold text-yellow-900">
                          📖 कर्ण की कथा बताती है कि सूर्य उपासना से अपार शक्ति मिलती है। छठ पूजा में जल में खड़े होकर अर्घ्य देने की परंपरा कर्ण से ही आई है।
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedStory === 'priyavrata' && (
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <Mountain className="w-10 h-10 text-green-600" />
                      राजा प्रियव्रत की कथा
                    </h3>
                    <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                      <p>
                        यह छठ पूजा की सबसे प्राचीन कथा है। राजा प्रियव्रत और उनकी पत्नी मालिनी को कोई संतान नहीं थी। महर्षि कश्यप ने उन्हें पुत्रेष्टि यज्ञ करने की सलाह दी। यज्ञ के बाद रानी को पुत्र हुआ, लेकिन वह मृत पैदा हुआ।
                      </p>
                      <div className="bg-white rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-3">षष्ठी देवी का चमत्कार:</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                            <span>मृत पुत्र को देखकर राजा-रानी बहुत दुखी हुए</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                            <span>तभी आकाश से एक दिव्य प्रकाश प्रकट हुआ</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                            <span>षष्ठी देवी (छठी मैया) ने प्रकट होकर बालक को जीवन दिया</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                            <span>तभी से षष्ठी देवी को संतान की रक्षिका माना जाता है</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-green-100 p-4 rounded-lg">
                        <p className="font-semibold text-green-900">
                          📖 यह कथा बताती है कि छठी मैया संतान को जीवन और रक्षा देती हैं। इसलिए माता-पिता अपने बच्चों की लंबी उम्र के लिए छठ व्रत रखते हैं।
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Significance Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">छठ पूजा का महत्व</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {significance.map((item, index) => (
                <div key={index} className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl text-white`}>
                  <item.icon className="w-12 h-12 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="opacity-90">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border-2 border-orange-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">क्यों अनोखी है छठ पूजा?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">धार्मिक दृष्टि से:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                      <span>एकमात्र पर्व जहां सीधे सूर्य की पूजा होती है</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                      <span>कोई मूर्ति या मंदिर की जरूरत नहीं</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                      <span>प्रकृति का सीधा संबंध</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                      <span>वैदिक काल से चली आ रही परंपरा</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">सामाजिक दृष्टि से:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                      <span>सभी जाति-धर्म के लोग साथ मिलकर मनाते हैं</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                      <span>अमीर-गरीब का भेद नहीं</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                      <span>पूरा परिवार साथ आता है</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                      <span>सामुदायिक भावना मजबूत होती है</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scientific & Spiritual Significance */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">वैज्ञानिक और आध्यात्मिक महत्व</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-blue-600" />
                  वैज्ञानिक महत्व
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span>सूर्य की किरणों से विटामिन डी मिलता है</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span>36 घंटे का व्रत शरीर की शुद्धि करता है</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span>जल चिकित्सा से त्वचा स्वस्थ होती है</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span>प्रकृति के साथ तालमेल बनता है</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  आध्यात्मिक महत्व
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>आत्म-नियंत्रण और संयम की शक्ति बढ़ती है</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>मन की शुद्धि और शांति मिलती है</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>प्रकृति के प्रति कृतज्ञता भाव जागता है</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>आध्यात्मिक ऊर्जा और विश्वास बढ़ता है</span>
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
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा क्यों मनाते हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा सूर्य देव और छठी मैया (षष्ठी देवी) को समर्पित है। यह पूजा संतान की लंबी उम्र, सुख-समृद्धि और परिवार की रक्षा के लिए की जाती है। पौराणिक कथाओं के अनुसार, राजा प्रियव्रत के मृत पुत्र को छठी मैया ने जीवन दिया था। तभी से यह परंपरा चली आ रही है। यह प्रकृति, सूर्य और जल के प्रति कृतज्ञता व्यक्त करने का पर्व भी है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठी मैया कौन हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठी मैया को षष्ठी देवी भी कहते हैं। वे सूर्य देव की बहन मानी जाती हैं और संतान की रक्षा करने वाली देवी हैं। पौराणिक मान्यता के अनुसार, वे प्रसव के छठे दिन नवजात शिशु और माता की रक्षा करती हैं। वे बच्चों को रोगों से बचाती हैं और उनकी लंबी उम्र का वरदान देती हैं। इसलिए माता-पिता अपने बच्चों के लिए छठ व्रत रखते हैं।
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">रामायण में छठ पूजा का उल्लेख कहाँ है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  रामायण में कहा गया है कि जब भगवान राम, माता सीता और लक्ष्मण 14 वर्ष के वनवास के बाद अयोध्या लौटे, तो उन्होंने कार्तिक शुक्ल पक्ष की षष्ठी को सूर्य देव की पूजा की। यह रावण के वध के बाद शुद्धि और कृतज्ञता व्यक्त करने के लिए था। सरयू नदी के तट पर यह पूजा की गई थी। तभी से यह परंपरा अयोध्या और उसके आसपास के क्षेत्रों में शुरू हुई।
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">महाभारत में छठ पूजा का संबंध क्या है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  महाभारत में दो मुख्य संदर्भ हैं: 1) <strong>कर्ण:</strong> सूर्य पुत्र कर्ण रोज सुबह गंगा में खड़े होकर सूर्य को अर्घ्य देते थे। यह परंपरा आज भी छठ पूजा में है। 2) <strong>द्रौपदी:</strong> पांडवों के वनवास के दौरान द्रौपदी ने सूर्य देव की आराधना की और छठ व्रत रखा। सूर्य देव ने प्रसन्न होकर अक्षय पात्र का वरदान दिया। ये दोनों कथाएं छठ पूजा के महत्व को दर्शाती हैं।
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा कितनी प्राचीन है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा हजारों वर्ष प्राचीन है। ऋग्वेद में सूर्य देव की स्तुति के मंत्र मिलते हैं, जो इस पूजा की वैदिक उत्पत्ति को दर्शाते हैं। रामायण (त्रेता युग) और महाभारत (द्वापर युग) में भी इसका उल्लेख है। इतिहासकारों के अनुसार, यह पूजा 5000-7000 वर्ष पुरानी हो सकती है। यह एकमात्र ऐसा पर्व है जो वैदिक काल से लेकर आज तक लगातार मनाया जा रहा है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा का वैज्ञानिक आधार क्या है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा का मजबूत वैज्ञानिक आधार है: 1) <strong>सूर्य किरणें:</strong> सूर्योदय और सूर्यास्त की किरणें विटामिन डी का सबसे अच्छा स्रोत हैं, 2) <strong>36 घंटे का व्रत:</strong> Intermittent fasting से शरीर की शुद्धि होती है, मेटाबॉलिज्म सुधरता है, 3) <strong>जल चिकित्सा:</strong> जल में खड़े होकर पूजा से रक्त संचार बेहतर होता है, 4) <strong>प्रकृति संपर्क:</strong> प्राकृतिक वातावरण से मानसिक शांति मिलती है। <Link to="/blog/chhath-puja-health-benefits" className="text-blue-600 hover:underline">पूरी जानकारी यहां पढ़ें</Link>।
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border-2 border-indigo-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">क्यों केवल बिहार-झारखंड में ही छठ पूजा प्रसिद्ध है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  छठ पूजा मुख्य रूप से बिहार-झारखंड में इसलिए प्रसिद्ध है क्योंकि: 1) <strong>ऐतिहासिक कारण:</strong> प्राचीन काल में यह क्षेत्र अंग और मगध राज्य था, जहां कर्ण राजा थे, 2) <strong>भौगोलिक कारण:</strong> गंगा और अन्य नदियों की प्रचुरता, 3) <strong>सांस्कृतिक कारण:</strong> पीढ़ियों से यह परंपरा यहां जीवित है। हालांकि, अब यह पूजा दिल्ली, मुंबई, कोलकाता जैसे शहरों में भी बड़े पैमाने पर मनाई जाती है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-2xl border-2 border-teal-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा में सूर्य देव को ही क्यों पूजते हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  सूर्य देव को इसलिए पूजा जाता है क्योंकि: 1) <strong>जीवनदाता:</strong> सूर्य के बिना पृथ्वी पर जीवन संभव नहीं, 2) <strong>प्रत्यक्ष देव:</strong> सूर्य को हम प्रत्यक्ष देख सकते हैं, अन्य देवताओं को नहीं, 3) <strong>ऊर्जा का स्रोत:</strong> सूर्य सभी ऊर्जा का मूल स्रोत है, 4) <strong>वैदिक परंपरा:</strong> ऋग्वेद में सूर्य की महिमा का विस्तार से वर्णन है। छठ पूजा में हम प्रकृति के इस महान शक्ति के प्रति कृतज्ञता व्यक्त करते हैं।
                </p>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl border-2 border-emerald-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा में उगते और डूबते दोनों सूर्य को अर्घ्य क्यों देते हैं?</h3>
                <p className="text-gray-700 leading-relaxed">
                  दोनों सूर्य को अर्घ्य देने का गहरा अर्थ है: <strong>डूबता सूर्य (संध्या अर्घ्य):</strong> जीवन की कठिनाइयों, दुखों और नकारात्मकता को विदा करने का प्रतीक। जैसे सूर्य अस्त होता है, वैसे हमारी समस्याएं भी। <strong>उगता सूर्य (उषा अर्घ्य):</strong> नई शुरुआत, नई उम्मीद और सकारात्मकता का प्रतीक। सूर्योदय के साथ हमारे जीवन में भी नई ऊर्जा। यह जीवन के दो पहलुओं को दर्शाता है।
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-2xl border-2 border-amber-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">छठ पूजा का भविष्य में क्या महत्व है?</h3>
                <p className="text-gray-700 leading-relaxed">
                  भविष्य में छठ पूजा का महत्व और बढ़ेगा क्योंकि: 1) <strong>पर्यावरण संरक्षण:</strong> यह सबसे इको-फ्रेंडली पर्व है, जो प्रकृति संरक्षण का संदेश देता है, 2) <strong>सामाजिक एकता:</strong> यह सभी वर्गों को एक साथ लाता है, 3) <strong>स्वास्थ्य जागरूकता:</strong> आधुनिक विज्ञान भी सूर्य किरणों और व्रत के लाभ मान रहा है, 4) <strong>सांस्कृतिक पहचान:</strong> बिहारी संस्कृति का प्रतीक। यह पर्व विश्व स्तर पर पहचान बना रहा है।
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Articles */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">संबंधित आर्टिकल</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/blog/chhath-puja-rituals-explained" className="group">
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group-hover:scale-105">
                  <Info className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600">विधि समझाएं</h3>
                  <p className="text-sm text-gray-600">सूर्य अर्घ्य का रहस्य</p>
                </div>
              </Link>
              <Link to="/blog/chhath-puja-2025-schedule" className="group">
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group-hover:scale-105">
                  <Clock className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600">पूर्ण कार्यक्रम</h3>
                  <p className="text-sm text-gray-600">4 दिनों की समय सारणी</p>
                </div>
              </Link>
              <Link to="/blog/chhath-puja-health-benefits" className="group">
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group-hover:scale-105">
                  <Heart className="w-8 h-8 text-red-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600">स्वास्थ्य लाभ</h3>
                  <p className="text-sm text-gray-600">वैज्ञानिक फायदे</p>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* External Resources */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-blue-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">बाहरी संदर्भ</h2>
            <div className="space-y-3">
              <a href="https://hi.wikipedia.org/wiki/छठ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                छठ पूजा - विकिपीडिया
              </a>
              <a href="https://www.vedicfeed.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                Vedic Feed - पौराणिक कथाएं
              </a>
              <a href="https://www.indianculture.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <ExternalLink className="w-5 h-5" />
                भारतीय संस्कृति मंत्रालय
              </a>
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">यह लेख उपयोगी लगा?</h3>
            <p className="text-gray-600 mb-6">शेयर करें और दूसरों को ज्ञान दें</p>
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
            <p className="mt-4 text-orange-600 font-bold">🙏 जय छठी मैया! जय सूर्य देव! 🙏</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChhathPujaMythology;

