import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Sun, Moon, Users, Heart, Share2, ChevronRight, Home, ExternalLink, Sparkles, Star, Gift, Info, CheckCircle, AlertCircle, ShoppingCart, Droplets, Flame } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { ALL_STATES_UTS } from '../../data/indiaLocations';

const ChhathPujaPreparationGuide: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Calculate Chhath Puja dates
  const chhathPujaDate = useMemo(() => {
    return new Date(currentYear, 10, 7);
  }, [currentYear]);

  const nahayKhay = new Date(chhathPujaDate);
  nahayKhay.setDate(nahayKhay.getDate() - 3);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('hi-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get Bihar, Jharkhand, UP states
  const celebratingStates = useMemo(() => {
    return ALL_STATES_UTS.filter(s => 
      s.name === 'Bihar' || s.name === 'Jharkhand' || s.name === 'Uttar Pradesh'
    );
  }, []);

  return (
    <>
      <SEOHelmet
        title={`छठ पूजा ${currentYear} की तैयारी कैसे करें: व्रत और पूजा विधि स्टेप-बाय-स्टेप गाइड | Chhath Puja Preparation Complete Guide`}
        description={`छठ पूजा ${currentYear} की संपूर्ण तैयारी गाइड: व्रत की तैयारी, पूजा सामग्री सूची, घाट की सफाई, प्रसाद बनाने की विधि, सूप-दौरा की तैयारी, ${celebratingStates[0]?.cities.length}+ शहरों में खरीदारी की जगहें। नहाय-खाय से उषा अर्घ्य तक हर चरण की विस्तृत जानकारी।`}
        keywords={`छठ पूजा तैयारी ${currentYear}, chhath puja preparation guide, छठ व्रत की तैयारी कैसे करें, छठ पूजा सामग्री लिस्ट, ठेकुआ कैसे बनाएं, छठ के लिए क्या चाहिए, छठ पूजा शॉपिंग लिस्ट, घाट की सफाई, सूप दौरा तैयारी, छठ व्रत नियम`}
        canonicalUrl={`https://moneycal.in/blog/chhath-puja-preparation-guide-${currentYear}`}
      />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        {/* Breadcrumb */}
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
              <span className="text-gray-700 font-medium">छठ पूजा तैयारी गाइड</span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full mb-6 font-bold shadow-lg">
              <Sparkles className="w-5 h-5" />
              छठ पूजा तैयारी विशेष
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 mb-6 leading-tight">
              छठ पूजा {currentYear} की तैयारी कैसे करें
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
              व्रत और पूजा विधि की संपूर्ण स्टेप-बाय-स्टेप गाइड
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-orange-200 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                <div className="text-left">
                  <div className="text-xs text-gray-600">तैयारी शुरू करें</div>
                  <div className="text-sm font-bold text-orange-600">15 दिन पहले से</div>
                </div>
              </div>
              <div className="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-red-200 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-red-600" />
                <div className="text-left">
                  <div className="text-xs text-gray-600">खरीदारी</div>
                  <div className="text-sm font-bold text-red-600">7 दिन पहले</div>
                </div>
              </div>
              <div className="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-pink-200 flex items-center gap-2">
                <Clock className="w-5 h-5 text-pink-600" />
                <div className="text-left">
                  <div className="text-xs text-gray-600">पूजा शुरू</div>
                  <div className="text-sm font-bold text-pink-600">{formatDate(nahayKhay)}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 aspect-video flex items-center justify-center">
              <div className="text-center text-white p-8">
                <ShoppingCart className="w-24 h-24 mx-auto mb-4" />
                <p className="text-2xl font-bold">छठ पूजा की तैयारी</p>
                <p className="text-lg opacity-90">संपूर्ण गाइड {currentYear}</p>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
            
            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border-2 border-orange-200 mb-8">
                <div className="flex items-start gap-4">
                  <Info className="w-12 h-12 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">छठ पूजा की तैयारी क्यों जरूरी है?</h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      छठ पूजा एक अत्यंत पवित्र और कठोर व्रत है जिसमें पूर्ण शुद्धता, स्वच्छता और अनुशासन की आवश्यकता होती है। यह व्रत केवल एक दिन का नहीं बल्कि चार दिनों का होता है, और इसकी तैयारी कम से कम 15 दिन पहले से शुरू कर देनी चाहिए। सही तैयारी से व्रत सफलतापूर्वक पूर्ण होता है और मन को शांति मिलती है।
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      {currentYear} में छठ पूजा {formatDate(nahayKhay)} से शुरू होने वाली है। इसलिए अभी से तैयारी शुरू करना बुद्धिमानी है। इस गाइड में हम आपको बताएंगे कि छठ पूजा की तैयारी कैसे करें, क्या-क्या सामान चाहिए, कहां से खरीदें, और कैसे व्यवस्थित रहें।
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline of Preparation */}
              <h2 className="text-4xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <Calendar className="w-10 h-10 text-orange-600" />
                छठ पूजा तैयारी की टाइमलाइन
              </h2>

              <div className="space-y-6 mb-12">
                {/* 15 Days Before */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl border-2 border-blue-200"
                >
                  <div className="flex items-start gap-6">
                    <div className="bg-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center flex-shrink-0">
                      <div className="text-center">
                        <div className="text-2xl font-black">15</div>
                        <div className="text-xs">दिन पहले</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-gray-900 mb-4">मानसिक और आध्यात्मिक तैयारी</h3>
                      <div className="space-y-3 text-gray-700 text-lg">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                          <span>व्रत लेने का संकल्प लें और परिवार को बताएं</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                          <span>मांस-मदिरा और तामसिक भोजन का त्याग शुरू करें</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                          <span>प्रतिदिन सूर्य नमस्कार और ध्यान करें</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                          <span>घर की सफाई शुरू करें, अनावश्यक सामान हटाएं</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                          <span>व्रत की विधि और नियम पढ़ें और समझें</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 10 Days Before */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200"
                >
                  <div className="flex items-start gap-6">
                    <div className="bg-purple-600 text-white rounded-full w-20 h-20 flex items-center justify-center flex-shrink-0">
                      <div className="text-center">
                        <div className="text-2xl font-black">10</div>
                        <div className="text-xs">दिन पहले</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-gray-900 mb-4">सामान की सूची बनाना</h3>
                      <div className="bg-white rounded-xl p-6 mb-4">
                        <h4 className="font-bold text-purple-900 mb-3 text-lg">पूजा सामग्री की लिस्ट तैयार करें:</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                          <div>
                            <h5 className="font-bold mb-2">फल और सब्जियां:</h5>
                            <ul className="space-y-1 text-sm">
                              <li>• केला - 2 दर्जन</li>
                              <li>• संतरा - 1 दर्जन</li>
                              <li>• सेब - 1 दर्जन</li>
                              <li>• नारियल - 5-6</li>
                              <li>• गन्ना - 10-12 डंडे</li>
                              <li>• अदरक - 250 ग्राम</li>
                              <li>• हल्दी गांठ - 100 ग्राम</li>
                              <li>• नींबू - 1 दर्जन</li>
                              <li>• अनार - 5-6</li>
                              <li>• सिंघाड़ा - 500 ग्राम</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-bold mb-2">अन्य सामग्री:</h5>
                            <ul className="space-y-1 text-sm">
                              <li>• बांस का सूप/दौरा - 2</li>
                              <li>• मिट्टी का दीया - 20-25</li>
                              <li>• घी - 1 किलो</li>
                              <li>• गुड़ - 2 किलो</li>
                              <li>• गेहूं का आटा - 5 किलो</li>
                              <li>• चावल - 2 किलो</li>
                              <li>• दूध - 2 लीटर</li>
                              <li>• धूपबत्ती, अगरबत्ती</li>
                              <li>• कपूर, रोली, चंदन</li>
                              <li>• लाल कपड़ा</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="bg-purple-100 rounded-lg p-4">
                        <p className="text-gray-700 text-sm">
                          <span className="font-bold">सुझाव:</span> इस लिस्ट को प्रिंट करके रखें या मोबाइल में सेव कर लें ताकि खरीदारी करते समय कुछ भूलें नहीं।
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 7 Days Before */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-2xl border-2 border-green-200"
                >
                  <div className="flex items-start gap-6">
                    <div className="bg-green-600 text-white rounded-full w-20 h-20 flex items-center justify-center flex-shrink-0">
                      <div className="text-center">
                        <div className="text-2xl font-black">7</div>
                        <div className="text-xs">दिन पहले</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-gray-900 mb-4">खरीदारी और व्यवस्था</h3>
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl p-6">
                          <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                            <ShoppingCart className="w-6 h-6" />
                            कहां से खरीदें सामान:
                          </h4>
                          <div className="space-y-3 text-gray-700">
                            <div>
                              <span className="font-bold">बिहार में:</span>
                              <p className="text-sm mt-1">पटना - गांधी मैदान, मौर्या लोक, बोरिंग रोड | गया - विष्णुपद मंदिर के पास | भागलपुर - गंगा घाट के पास बाजार</p>
                            </div>
                            <div>
                              <span className="font-bold">झारखंड में:</span>
                              <p className="text-sm mt-1">रांची - मेन रोड, अल्बर्ट एक्का चौक | जमशेदपुर - बिस्टुपुर मार्केट | धनबाद - बैंक मोर</p>
                            </div>
                            <div>
                              <span className="font-bold">दिल्ली-एनसीआर में:</span>
                              <p className="text-sm mt-1">छठ पूजा मार्केट - कालकाजी, लक्ष्मी नगर, द्वारका | बड़े बाजार - चांदनी चौक, लाजपत नगर</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-100 rounded-lg p-4">
                          <h5 className="font-bold text-gray-900 mb-2">खरीदारी के टिप्स:</h5>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li>• सुबह जल्दी बाजार जाएं, भीड़ कम होगी</li>
                            <li>• ताजे फल खरीदें, कच्चे नहीं</li>
                            <li>• गन्ने की जांच करें - छिलका हरा हो</li>
                            <li>• बांस के सूप/दौरा साफ और मजबूत हों</li>
                            <li>• शुद्ध घी और गुड़ ही खरीदें</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 3 Days Before */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-2xl border-2 border-orange-200"
                >
                  <div className="flex items-start gap-6">
                    <div className="bg-orange-600 text-white rounded-full w-20 h-20 flex items-center justify-center flex-shrink-0">
                      <div className="text-center">
                        <div className="text-2xl font-black">3</div>
                        <div className="text-xs">दिन पहले</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-gray-900 mb-4">घर की तैयारी और सफाई</h3>
                      <div className="space-y-3 text-gray-700 text-lg">
                        <div className="flex items-start gap-2">
                          <Droplets className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                          <span>पूरे घर की गहरी सफाई करें - फर्श, दीवार, छत</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Droplets className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                          <span>रसोई को विशेष रूप से साफ करें, बर्तन धोएं</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Droplets className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                          <span>पूजा स्थल को गंगाजल से शुद्ध करें</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Droplets className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                          <span>नए या धुले हुए कपड़े तैयार रखें</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Droplets className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                          <span>प्रसाद बनाने के लिए बर्तन अलग रखें</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 1 Day Before */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gradient-to-r from-red-50 to-pink-50 p-8 rounded-2xl border-2 border-red-200"
                >
                  <div className="flex items-start gap-6">
                    <div className="bg-red-600 text-white rounded-full w-20 h-20 flex items-center justify-center flex-shrink-0">
                      <div className="text-center">
                        <div className="text-2xl font-black">1</div>
                        <div className="text-xs">दिन पहले</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-gray-900 mb-4">अंतिम तैयारी और ठेकुआ बनाना</h3>
                      <div className="bg-white rounded-xl p-6 mb-4">
                        <h4 className="font-bold text-red-900 mb-3 text-lg">ठेकुआ बनाने की तैयारी:</h4>
                        <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                          <li>आटा छान लें और सूखा रखें</li>
                          <li>गुड़ को पिघलाकर चाशनी बना लें</li>
                          <li>घी को पिघला लें और छान लें</li>
                          <li>सौंफ, इलायची पीस लें</li>
                          <li>नारियल कद्दूकस कर लें</li>
                          <li>सभी सामग्री एक साथ रख लें</li>
                        </ol>
                      </div>
                      <div className="bg-red-100 rounded-lg p-4">
                        <p className="text-gray-700">
                          <span className="font-bold">याद रखें:</span> ठेकुआ बनाने में 3-4 घंटे लगते हैं। इसलिए सुबह जल्दी शुरू करें ताकि दोपहर तक तैयार हो जाए।
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Detailed Shopping List */}
              <h2 className="text-4xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <ShoppingCart className="w-10 h-10 text-orange-600" />
                संपूर्ण पूजा सामग्री सूची {currentYear}
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Gift className="w-6 h-6 text-blue-600" />
                    फल और प्रसाद सामग्री
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>केला (पका हुआ)</span>
                      <span className="font-bold text-blue-600">2 दर्जन</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>गन्ना (ताजा)</span>
                      <span className="font-bold text-blue-600">12 डंडे</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>संतरा</span>
                      <span className="font-bold text-blue-600">1 दर्जन</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>सेब (लाल)</span>
                      <span className="font-bold text-blue-600">1 दर्जन</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>नारियल</span>
                      <span className="font-bold text-blue-600">5-6</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>अनार</span>
                      <span className="font-bold text-blue-600">5-6</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>सिंघाड़ा</span>
                      <span className="font-bold text-blue-600">500 ग्राम</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Flame className="w-6 h-6 text-purple-600" />
                    ठेकुआ की सामग्री
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>गेहूं का आटा</span>
                      <span className="font-bold text-purple-600">5 किलो</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>गुड़ (देसी)</span>
                      <span className="font-bold text-purple-600">2 किलो</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>शुद्ध घी</span>
                      <span className="font-bold text-purple-600">1 किलो</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>सौंफ</span>
                      <span className="font-bold text-purple-600">100 ग्राम</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>इलायची</span>
                      <span className="font-bold text-purple-600">50 ग्राम</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>नारियल कद्दूकस</span>
                      <span className="font-bold text-purple-600">200 ग्राम</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>काली मिर्च</span>
                      <span className="font-bold text-purple-600">25 ग्राम</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="w-6 h-6 text-green-600" />
                    पूजन सामग्री
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>मिट्टी के दीये</span>
                      <span className="font-bold text-green-600">25</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>रोली और चंदन</span>
                      <span className="font-bold text-green-600">50 ग्राम</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>धूप-दीप</span>
                      <span className="font-bold text-green-600">1 पैकेट</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>कपूर</span>
                      <span className="font-bold text-green-600">50 ग्राम</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>लाल कपड़ा</span>
                      <span className="font-bold text-green-600">2 मीटर</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>कलावा/मौली</span>
                      <span className="font-bold text-green-600">1 रोल</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>बांस सूप/दौरा</span>
                      <span className="font-bold text-green-600">2</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl border-2 border-orange-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Droplets className="w-6 h-6 text-orange-600" />
                    अन्य जरूरी सामान
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>चावल (अरवा)</span>
                      <span className="font-bold text-orange-600">2 किलो</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>दूध (ताजा)</span>
                      <span className="font-bold text-orange-600">2 लीटर</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>अदरक</span>
                      <span className="font-bold text-orange-600">250 ग्राम</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>हल्दी गांठ</span>
                      <span className="font-bold text-orange-600">100 ग्राम</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>नींबू</span>
                      <span className="font-bold text-orange-600">12</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>बड़ा नींबू</span>
                      <span className="font-bold text-orange-600">3</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                      <span>पान-सुपारी</span>
                      <span className="font-bold text-orange-600">25</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ghat Preparation */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-8 rounded-2xl border-2 border-cyan-200 mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <Droplets className="w-8 h-8 text-cyan-600" />
                  घाट की तैयारी और सफाई
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    छठ पूजा में घाट की सफाई अत्यंत महत्वपूर्ण है। यह न केवल धार्मिक दृष्टि से बल्कि पर्यावरण संरक्षण की दृष्टि से भी जरूरी है।
                  </p>
                  <div className="bg-white rounded-xl p-6">
                    <h4 className="font-bold text-cyan-900 mb-3">घाट सफाई के चरण:</h4>
                    <ol className="space-y-2 list-decimal list-inside">
                      <li>पूजा से 2-3 दिन पहले घाट पर जाएं</li>
                      <li>कचरा, प्लास्टिक, पॉलीथिन हटाएं</li>
                      <li>घाट के सीढ़ियों को साफ करें</li>
                      <li>आस-पास की जगह को स्वच्छ रखें</li>
                      <li>सामुदायिक सफाई में भाग लें</li>
                      <li>पूजा के बाद भी सफाई बनाए रखें</li>
                    </ol>
                  </div>
                  <div className="bg-cyan-100 rounded-lg p-4">
                    <p className="text-sm">
                      <span className="font-bold">महत्वपूर्ण:</span> घाट की सफाई के लिए कई संगठन और सरकारी विभाग काम करते हैं। आप भी स्वयंसेवक के रूप में शामिल हो सकते हैं।
                    </p>
                  </div>
                </div>
              </div>

              {/* Important Tips */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl border-2 border-yellow-200 mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <AlertCircle className="w-8 h-8 text-yellow-600" />
                  महत्वपूर्ण सुझाव और सावधानियां
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-yellow-900 mb-3">क्या करें:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">समय पर तैयारी शुरू करें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">शुद्ध और ताजा सामान खरीदें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">परिवार के सभी सदस्यों को जिम्मेदारी दें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">बजट बनाकर खरीदारी करें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">पर्यावरण का ध्यान रखें</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-red-900 mb-3">क्या न करें:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">आखिरी समय तक इंतजार न करें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">सड़े या खराब फल न खरीदें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">अनावश्यक खर्च न करें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">प्लास्टिक का उपयोग न करें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">घाट पर गंदगी न फैलाएं</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Budget Planning */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200 mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <ShoppingCart className="w-8 h-8 text-purple-600" />
                  बजट प्लानिंग - कितना खर्च होगा?
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    छठ पूजा की तैयारी में खर्च आपके परिवार के आकार और इलाके पर निर्भर करता है। यहां एक अनुमानित बजट दिया गया है:
                  </p>
                  <div className="bg-white rounded-xl p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="font-bold text-gray-900">फल और सब्जियां</span>
                        <span className="font-bold text-purple-600">₹1,500 - ₹2,000</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="font-bold text-gray-900">ठेकुआ सामग्री</span>
                        <span className="font-bold text-purple-600">₹800 - ₹1,200</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="font-bold text-gray-900">पूजन सामग्री</span>
                        <span className="font-bold text-purple-600">₹500 - ₹800</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="font-bold text-gray-900">बांस सूप/दौरा</span>
                        <span className="font-bold text-purple-600">₹200 - ₹400</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="font-bold text-gray-900">अन्य (कपड़े, बर्तन)</span>
                        <span className="font-bold text-purple-600">₹500 - ₹1,000</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t-2 border-purple-300">
                        <span className="font-black text-gray-900 text-lg">कुल खर्च (अनुमानित)</span>
                        <span className="font-black text-purple-600 text-xl">₹3,500 - ₹5,500</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-100 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">नोट:</span> यह अनुमानित खर्च है। आप अपनी सुविधा और श्रद्धा अनुसार कम या ज्यादा खर्च कर सकते हैं। महत्वपूर्ण है शुद्धता और भक्ति भाव।
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Links */}
              <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">संबंधित उपयोगी लिंक्स</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link to="/blog/chhath-puja-2025-schedule" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-lg transition-all group">
                    <Calendar className="w-6 h-6 text-orange-600" />
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-orange-600">छठ पूजा पूर्ण कार्यक्रम</div>
                      <div className="text-sm text-gray-600">तिथियां और मुहूर्त</div>
                    </div>
                  </Link>
                  <Link to="/festival-tools/festival-countdown-clock" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-lg transition-all group">
                    <Clock className="w-6 h-6 text-purple-600" />
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-purple-600">काउंटडाउन टाइमर</div>
                      <div className="text-sm text-gray-600">लाइव गिनती</div>
                    </div>
                  </Link>
                  <Link to="/festival-tools/city-festival-widget" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-lg transition-all group">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-blue-600">शहर-वार त्योहार</div>
                      <div className="text-sm text-gray-600">अपने शहर का कैलेंडर</div>
                    </div>
                  </Link>
                  <Link to="/festival-date-calendar" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-lg transition-all group">
                    <Calendar className="w-6 h-6 text-green-600" />
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-green-600">सभी त्योहार</div>
                      <div className="text-sm text-gray-600">संपूर्ण कैलेंडर</div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* External Links */}
              <div className="bg-blue-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">बाहरी संदर्भ</h2>
                <div className="space-y-3">
                  <a href="https://www.india.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold">
                    <ExternalLink className="w-5 h-5" />
                    भारत सरकार पोर्टल
                  </a>
                  <a href="https://pib.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold">
                    <ExternalLink className="w-5 h-5" />
                    प्रेस सूचना ब्यूरो
                  </a>
                  <a href="https://hi.wikipedia.org/wiki/छठ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold">
                    <ExternalLink className="w-5 h-5" />
                    छठ पूजा - विकिपीडिया
                  </a>
                </div>
              </div>

              {/* Conclusion */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border-2 border-orange-200">
                <h2 className="text-3xl font-black text-gray-900 mb-6">निष्कर्ष</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  छठ पूजा की तैयारी एक लंबी लेकिन आनंददायक प्रक्रिया है। अगर आप समय पर तैयारी शुरू करें और व्यवस्थित रहें, तो व्रत सफलतापूर्वक पूर्ण हो जाता है। याद रखें, छठ पूजा में शुद्धता, स्वच्छता और भक्ति भाव सबसे महत्वपूर्ण है, न कि खर्च की मात्रा।
                </p>
                <p className="text-gray-700 text-lg leading-relaxed font-bold text-center mt-6">
                  आप सभी को छठ पूजा {currentYear} की हार्दिक शुभकामनाएं! 🙏
                </p>
              </div>

              {/* Share Section */}
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">यह गाइड उपयोगी लगी?</h3>
                <p className="text-gray-600 mb-6">इसे शेयर करें और दूसरों की मदद करें</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    WhatsApp
                  </button>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Author & Date */}
          <div className="text-center text-gray-600 mt-8">
            <p>लेखक: MoneyCal.in टीम | प्रकाशित: {new Date().toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="mt-2">अंतिम अपडेट: {new Date().toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChhathPujaPreparationGuide;




