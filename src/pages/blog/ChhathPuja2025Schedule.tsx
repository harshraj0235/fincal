import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Sun, Moon, Users, Heart, Share2, ChevronRight, Home, ExternalLink, Sparkles, Star, Gift, Info, CheckCircle, AlertCircle } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { getAllCities, ALL_STATES_UTS } from '../../data/indiaLocations';

const ChhathPuja2025Schedule: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
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
      ...(biharState?.cities || []).slice(0, 10),
      ...(jharkhandState?.cities || []).slice(0, 5),
      ...(upState?.cities || []).slice(0, 5)
    ];
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('hi-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <SEOHelmet
        title={`छठ पूजा ${currentYear} पूर्ण कार्यक्रम: नहाय-खाय, खरना, संध्या अर्घ्य, उषा अर्घ्य तिथियां और समय | Chhath Puja Complete Schedule`}
        description={`छठ पूजा ${currentYear} की संपूर्ण जानकारी: नहाय-खाय ${formatDate(nahayKhay)}, खरना ${formatDate(kharna)}, संध्या अर्घ्य ${formatDate(sandhyaArghya)}, उषा अर्घ्य ${formatDate(ushaArghya)}। बिहार, झारखंड, यूपी के ${chhathCities.length}+ शहरों में छठ पूजा का समय, व्रत विधि, प्रसाद सूची, घाट की जानकारी।`}
        keywords={`छठ पूजा ${currentYear}, chhath puja ${currentYear}, नहाय खाय ${currentYear}, खरना ${currentYear}, संध्या अर्घ्य ${currentYear}, उषा अर्घ्य ${currentYear}, छठ पूजा तिथि, छठ पूजा कैलेंडर, बिहार छठ पूजा, झारखंड छठ पूजा, छठ व्रत विधि, सूर्य षष्ठी, छठी मईया पूजा`}
        canonicalUrl={`https://moneycal.in/blog/chhath-puja-${currentYear}-schedule`}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
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
              <span className="text-gray-700 font-medium">छठ पूजा {currentYear}</span>
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
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-6 py-2 rounded-full mb-6 font-bold">
              <Sun className="w-5 h-5" />
              छठ पूजा विशेष {currentYear}
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 mb-6 leading-tight">
              छठ पूजा {currentYear} पूर्ण कार्यक्रम और तिथियां
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
              नहाय-खाय से उषा अर्घ्य तक संपूर्ण व्रत विधि, मुहूर्त और परंपराएं
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-orange-200">
                <div className="text-sm text-gray-600 mb-1">नहाय-खाय</div>
                <div className="text-lg font-bold text-orange-600">{formatDate(nahayKhay)}</div>
              </div>
              <div className="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-red-200">
                <div className="text-sm text-gray-600 mb-1">खरना</div>
                <div className="text-lg font-bold text-red-600">{formatDate(kharna)}</div>
              </div>
              <div className="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-pink-200">
                <div className="text-sm text-gray-600 mb-1">संध्या अर्घ्य</div>
                <div className="text-lg font-bold text-pink-600">{formatDate(sandhyaArghya)}</div>
              </div>
              <div className="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-purple-200">
                <div className="text-sm text-gray-600 mb-1">उषा अर्घ्य</div>
                <div className="text-lg font-bold text-purple-600">{formatDate(ushaArghya)}</div>
              </div>
            </div>
          </motion.div>

          {/* Featured Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 aspect-video flex items-center justify-center">
              <div className="text-center text-white p-8">
                <Sun className="w-24 h-24 mx-auto mb-4" />
                <p className="text-2xl font-bold">छठ पूजा {currentYear}</p>
                <p className="text-lg opacity-90">सूर्य षष्ठी महापर्व</p>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
            
            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-2xl border-2 border-orange-200 mb-8">
                <div className="flex items-start gap-4">
                  <Sparkles className="w-12 h-12 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">छठ पूजा क्या है? सूर्य षष्ठी महापर्व की महिमा</h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      छठ पूजा, जिसे सूर्य षष्ठी या डाला छठ के नाम से भी जाना जाता है, भारत का सबसे पवित्र और प्राचीन वैदिक पर्व है। यह त्योहार मुख्य रूप से बिहार, झारखंड, पूर्वी उत्तर प्रदेश और नेपाल के मिथिला क्षेत्र में अत्यंत धूमधाम से मनाया जाता है। {currentYear} में यह महापर्व कार्तिक मास की शुक्ल पक्ष की षष्ठी तिथि को मनाया जा रहा है।
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      छठ पूजा का सबसे बड़ा महत्व यह है कि इसमें सीधे सूर्य देव और छठी मैया (षष्ठी देवी) की आराधना की जाती है। यह एकमात्र ऐसा वैदिक पर्व है जिसमें अस्त होते और उगते दोनों सूर्य को अर्घ्य दिया जाता है। व्रती 36 घंटे का कठोर निर्जला व्रत रखते हैं और नदी या तालाब के घाट पर खड़े होकर सूर्य को जल अर्पित करते हैं।
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      इस साल {currentYear} में छठ पूजा की शुरुआत {formatDate(nahayKhay)} से होगी और {formatDate(ushaArghya)} को उषा अर्घ्य के साथ समापन होगा। देश भर में लाखों श्रद्धालु इस व्रत को रखेंगे और अपने परिवार की सुख-समृद्धि के लिए सूर्य देव और छठी मैया से प्रार्थना करेंगे।
                    </p>
                  </div>
                </div>
              </div>

              {/* Complete Schedule */}
              <h2 className="text-4xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <Calendar className="w-10 h-10 text-orange-600" />
                छठ पूजा {currentYear} - चार दिवसीय कार्यक्रम
              </h2>

              <div className="space-y-6 mb-12">
                {/* Day 1 - Nahay Khay */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl border-2 border-blue-200"
                >
                  <div className="flex items-start gap-6">
                    <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 text-2xl font-black">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-gray-900 mb-3">पहला दिन: नहाय-खाय (स्नान और भोजन)</h3>
                      <div className="bg-white rounded-xl p-4 mb-4 inline-block">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <span className="text-lg font-bold text-blue-600">{formatDate(nahayKhay)}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        छठ पूजा का पहला दिन नहाय-खाय के नाम से जाना जाता है। इस दिन व्रती सुबह पवित्र नदी, तालाब या घाट पर स्नान करते हैं और घर की पूर्ण स्वच्छता करते हैं। स्नान के बाद शुद्ध शाकाहारी भोजन ग्रहण किया जाता है।
                      </p>
                      <div className="bg-blue-100 rounded-xl p-6">
                        <h4 className="font-bold text-blue-900 mb-3 text-lg">नहाय-खाय के मुख्य कार्य:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">सुबह पवित्र जल में स्नान करना</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">घर की संपूर्ण सफाई और शुद्धिकरण</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">सात्विक भोजन बनाना (चना दाल, कद्दू की सब्जी, चावल)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">लौकी की सब्जी और अरवा चावल का प्रसाद</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">पूजा की तैयारी शुरू करना</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Day 2 - Kharna */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200"
                >
                  <div className="flex items-start gap-6">
                    <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 text-2xl font-black">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-gray-900 mb-3">दूसरा दिन: खरना (निर्जला उपवास और प्रसाद)</h3>
                      <div className="bg-white rounded-xl p-4 mb-4 inline-block">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-purple-600" />
                          <span className="text-lg font-bold text-purple-600">{formatDate(kharna)}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        खरना छठ पूजा का सबसे महत्वपूर्ण दिन माना जाता है। इस दिन व्रती पूरे दिन निर्जला व्रत रखते हैं - यानी बिना जल पीए उपवास करते हैं। शाम को सूर्यास्त के बाद गुड़ की खीर, रोटी और फल का प्रसाद बनाकर पूजा की जाती है।
                      </p>
                      <div className="bg-purple-100 rounded-xl p-6 mb-4">
                        <h4 className="font-bold text-purple-900 mb-3 text-lg">खरना प्रसाद की सामग्री:</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white rounded-lg p-4">
                            <h5 className="font-bold text-gray-900 mb-2">मुख्य प्रसाद:</h5>
                            <ul className="space-y-1 text-gray-700">
                              <li>• गुड़ की खीर (चावल + गुड़ + दूध)</li>
                              <li>• पूरी या रोटी</li>
                              <li>• केला और अन्य फल</li>
                              <li>• चाय (अदरक वाली)</li>
                            </ul>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <h5 className="font-bold text-gray-900 mb-2">खरना का समय:</h5>
                            <ul className="space-y-1 text-gray-700">
                              <li>• सूर्यास्त के बाद पूजा</li>
                              <li>• शाम 6:00 से 7:00 बजे के बीच</li>
                              <li>• पूजा के बाद ही प्रसाद ग्रहण करें</li>
                              <li>• परिवार के सभी सदस्य प्रसाद लें</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                          <p className="text-gray-700">
                            <span className="font-bold">महत्वपूर्ण:</span> खरना के बाद 36 घंटे का निर्जला व्रत शुरू हो जाता है जो उषा अर्घ्य तक चलता है। इस दौरान व्रती न कुछ खाते हैं, न पानी पीते हैं।
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Day 3 - Sandhya Arghya */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border-2 border-orange-200"
                >
                  <div className="flex items-start gap-6">
                    <div className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 text-2xl font-black">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-gray-900 mb-3">तीसरा दिन: संध्या अर्घ्य (डूबते सूर्य को अर्घ्य)</h3>
                      <div className="bg-white rounded-xl p-4 mb-4 inline-block">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-orange-600" />
                          <span className="text-lg font-bold text-orange-600">{formatDate(sandhyaArghya)}</span>
                          <Sun className="w-5 h-5 text-orange-600 ml-2" />
                          <span className="text-sm text-gray-600">सूर्यास्त समय</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        संध्या अर्घ्य छठ पूजा का सबसे भव्य और दर्शनीय दिन है। इस दिन शाम को डूबते हुए सूर्य को अर्घ्य दिया जाता है। लाखों श्रद्धालु घाटों पर एकत्र होकर सूर्य भगवान को जल अर्पित करते हैं। यह दृश्य अत्यंत मनमोहक और आध्यात्मिक होता है।
                      </p>
                      <div className="bg-orange-100 rounded-xl p-6 mb-4">
                        <h4 className="font-bold text-orange-900 mb-3 text-lg">संध्या अर्घ्य की तैयारी:</h4>
                        <div className="space-y-4">
                          <div className="bg-white rounded-lg p-4">
                            <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                              <Gift className="w-5 h-5 text-orange-600" />
                              दौरा/सूप में रखी जाने वाली सामग्री:
                            </h5>
                            <div className="grid md:grid-cols-2 gap-2 text-gray-700">
                              <div>• ठेकुआ (मुख्य प्रसाद)</div>
                              <div>• गन्ना (ऊख)</div>
                              <div>• नारियल</div>
                              <div>• केला</div>
                              <div>• संतरा</div>
                              <div>• सेब</div>
                              <div>• अदरक</div>
                              <div>• हल्दी गांठ</div>
                              <div>• नींबू</div>
                              <div>• सिंघाड़ा</div>
                              <div>• अनार</div>
                              <div>• बड़ा नींबू</div>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <h5 className="font-bold text-gray-900 mb-2">घाट पर पहुंचने का समय:</h5>
                            <ul className="space-y-1 text-gray-700">
                              <li>• सूर्यास्त से 1-2 घंटे पहले घाट पहुंचें</li>
                              <li>• शाम 4:00 से 5:00 बजे के बीच</li>
                              <li>• घाट की भीड़ से बचने के लिए जल्दी जाएं</li>
                              <li>• पूजा सामग्री साथ रखें</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="bg-red-50 rounded-xl p-6">
                        <h4 className="font-bold text-red-900 mb-3 text-lg flex items-center gap-2">
                          <Sun className="w-6 h-6" />
                          संध्या अर्घ्य विधि:
                        </h4>
                        <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                          <li>घाट पर पानी में कमर तक खड़े होकर अर्घ्य दें</li>
                          <li>सूर्य की ओर मुंह करके दोनों हाथों से जल अर्पित करें</li>
                          <li>सूप या दौरा में रखा प्रसाद सूर्य को अर्पण करें</li>
                          <li>पूरे परिवार के साथ छठी मैया के गीत गाएं</li>
                          <li>सूर्यास्त के बाद घर लौटें</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Day 4 - Usha Arghya */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-r from-pink-50 to-yellow-50 p-8 rounded-2xl border-2 border-pink-200"
                >
                  <div className="flex items-start gap-6">
                    <div className="bg-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 text-2xl font-black">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-gray-900 mb-3">चौथा दिन: उषा अर्घ्य (उगते सूर्य को अर्घ्य)</h3>
                      <div className="bg-white rounded-xl p-4 mb-4 inline-block">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-pink-600" />
                          <span className="text-lg font-bold text-pink-600">{formatDate(ushaArghya)}</span>
                          <Sun className="w-5 h-5 text-yellow-600 ml-2" />
                          <span className="text-sm text-gray-600">सूर्योदय समय</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        उषा अर्घ्य छठ पूजा का अंतिम और पवित्रतम दिन है। सुबह अंधेरे में ही व्रती घाट पर पहुंच जाते हैं और उगते हुए सूर्य की प्रतीक्षा करते हैं। जैसे ही सूर्य उदय होता है, उन्हें अर्घ्य दिया जाता है। यह क्षण अत्यंत भावुक और पवित्र होता है।
                      </p>
                      <div className="bg-pink-100 rounded-xl p-6 mb-4">
                        <h4 className="font-bold text-pink-900 mb-3 text-lg">उषा अर्घ्य की विशेषताएं:</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <Moon className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
                            <div>
                              <span className="font-bold text-gray-900 block mb-1">रात्रि तैयारी:</span>
                              <span className="text-gray-700">पिछली रात से ही घाट पर पहुंचना शुरू कर दें। कई परिवार रात भर घाट पर ही रहते हैं।</span>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <Sun className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                            <div>
                              <span className="font-bold text-gray-900 block mb-1">सूर्योदय का समय:</span>
                              <span className="text-gray-700">सुबह 6:00 से 6:30 बजे के बीच (शहर अनुसार बदल सकता है)</span>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <Heart className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                            <div>
                              <span className="font-bold text-gray-900 block mb-1">व्रत पूर्णता:</span>
                              <span className="text-gray-700">उषा अर्घ्य के बाद प्रसाद ग्रहण करके व्रत पूर्ण होता है। 36 घंटे के निर्जला व्रत की समाप्ति।</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-bold text-green-900 mb-2">व्रत समापन विधि:</p>
                            <p className="text-gray-700 mb-2">
                              उषा अर्घ्य देने के बाद छठी मैया से आशीर्वाद लेकर व्रती घर लौटते हैं। घर पर प्रसाद वितरण होता है और सभी परिवार के सदस्य और पड़ोसी प्रसाद ग्रहण करते हैं।
                            </p>
                            <p className="text-gray-700">
                              इसके बाद व्रती पहले जल पीकर और फिर प्रसाद खाकर अपना व्रत खोलते हैं। यह क्षण पूरे परिवार के लिए खुशी और संतोष का होता है।
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* City-wise Timings */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border-2 border-blue-200 mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-blue-600" />
                  प्रमुख शहरों में छठ पूजा का समय {currentYear}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {chhathCities.slice(0, 12).map((city, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <h3 className="font-bold text-gray-900">{city}</h3>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span>सूर्योदय:</span>
                          <span className="font-semibold">06:15 AM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>सूर्यास्त:</span>
                          <span className="font-semibold">05:30 PM</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  समय स्थानीय परिस्थितियों के अनुसार 10-15 मिनट भिन्न हो सकता है
                </p>
              </div>

              {/* Prasad Recipes */}
              <div className="mb-12">
                <h2 className="text-4xl font-black text-gray-900 mb-8 flex items-center gap-3">
                  <Gift className="w-10 h-10 text-orange-600" />
                  छठ पूजा के पारंपरिक प्रसाद
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl border-2 border-orange-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">ठेकुआ (मुख्य प्रसाद)</h3>
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-900 mb-2">सामग्री:</h4>
                      <ul className="text-gray-700 space-y-1">
                        <li>• गेहूं का आटा - 500 ग्राम</li>
                        <li>• गुड़ - 250 ग्राम</li>
                        <li>• घी - 200 ग्राम</li>
                        <li>• सौंफ - 2 चम्मच</li>
                        <li>• इलायची पाउडर - 1 चम्मच</li>
                        <li>• नारियल कद्दूकस - 100 ग्राम</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">विधि:</h4>
                      <ol className="text-gray-700 space-y-2 text-sm list-decimal list-inside">
                        <li>गुड़ को पानी में पकाकर चाशनी बना लें</li>
                        <li>आटे में घी, चाशनी और सभी मसाले मिलाएं</li>
                        <li>आटा गूंथकर 2-3 घंटे रखें</li>
                        <li>छोटे-छोटे टुकड़े काटकर आकार दें</li>
                        <li>मध्यम आंच पर घी में सुनहरा होने तक तलें</li>
                      </ol>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">गुड़ की खीर</h3>
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-900 mb-2">सामग्री:</h4>
                      <ul className="text-gray-700 space-y-1">
                        <li>• चावल - 200 ग्राम</li>
                        <li>• दूध - 1 लीटर</li>
                        <li>• गुड़ - 250 ग्राम</li>
                        <li>• इलायची - 4-5</li>
                        <li>• काजू, किशमिश</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">विधि:</h4>
                      <ol className="text-gray-700 space-y-2 text-sm list-decimal list-inside">
                        <li>चावल को अच्छे से धो लें</li>
                        <li>दूध में चावल डालकर पकाएं</li>
                        <li>जब चावल गल जाएं तो गुड़ डालें</li>
                        <li>इलायची पाउडर मिलाएं</li>
                        <li>काजू-किशमिश से सजाएं</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Tips */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-2xl border-2 border-red-200 mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                  छठ पूजा के महत्वपूर्ण नियम और सावधानियां
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-red-900 mb-3">करने योग्य बातें:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">पूर्ण शुद्धता और स्वच्छता बनाए रखें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">प्रसाद में शुद्ध घी और गुड़ का प्रयोग करें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">घाट पर पहुंचने के लिए समय पर निकलें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">छोटे बच्चों और बुजुर्गों का विशेष ध्यान रखें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">पर्यावरण की रक्षा करें, प्लास्टिक का प्रयोग न करें</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-red-900 mb-3">न करें ये गलतियां:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">व्रत के दौरान मांस-मदिरा का सेवन न करें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">लहसुन-प्याज का प्रयोग न करें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">घाट पर गंदगी न फैलाएं</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">पूजा सामग्री नदी में न बहाएं</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">व्रत के दौरान क्रोध या कठोर वचन न बोलें</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-2xl border-2 border-green-200 mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <Star className="w-8 h-8 text-green-600" />
                  छठ व्रत के लाभ और महत्व
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    छठ पूजा केवल एक धार्मिक अनुष्ठान नहीं है, बल्कि यह एक संपूर्ण आध्यात्मिक और वैज्ञानिक प्रक्रिया है। इस व्रत के अनेक लाभ हैं:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-6">
                      <h3 className="font-bold text-green-900 mb-3">आध्यात्मिक लाभ:</h3>
                      <ul className="space-y-2">
                        <li>• मन की शांति और आत्मिक शुद्धि</li>
                        <li>• सूर्य देव का आशीर्वाद</li>
                        <li>• पारिवारिक सुख-समृद्धि</li>
                        <li>• संतान सुख की प्राप्ति</li>
                        <li>• रोग निवारण</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-6">
                      <h3 className="font-bold text-green-900 mb-3">स्वास्थ्य लाभ:</h3>
                      <ul className="space-y-2">
                        <li>• शरीर की शुद्धि (डिटॉक्सिफिकेशन)</li>
                        <li>• पाचन तंत्र में सुधार</li>
                        <li>• रोग प्रतिरोधक क्षमता बढ़ती है</li>
                        <li>• मानसिक एकाग्रता में वृद्धि</li>
                        <li>• सूर्य की किरणों से विटामिन डी</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Links */}
              <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">संबंधित उपयोगी लिंक्स</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link to="/festival-tools/diwali-date-finder" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-lg transition-all group">
                    <Calendar className="w-6 h-6 text-orange-600" />
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-orange-600">दिवाली तिथि खोजें</div>
                      <div className="text-sm text-gray-600">सटीक मुहूर्त के साथ</div>
                    </div>
                  </Link>
                  <Link to="/festival-tools/festival-countdown-clock" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-lg transition-all group">
                    <Clock className="w-6 h-6 text-purple-600" />
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-purple-600">त्योहार काउंटडाउन</div>
                      <div className="text-sm text-gray-600">लाइव काउंटडाउन टाइमर</div>
                    </div>
                  </Link>
                  <Link to="/festival-tools/indian-season-calendar" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-lg transition-all group">
                    <Sun className="w-6 h-6 text-yellow-600" />
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-yellow-600">ऋतु चक्र कैलेंडर</div>
                      <div className="text-sm text-gray-600">6 भारतीय ऋतुएं</div>
                    </div>
                  </Link>
                  <Link to="/festival-date-calendar" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-lg transition-all group">
                    <Calendar className="w-6 h-6 text-green-600" />
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-green-600">संपूर्ण त्योहार कैलेंडर</div>
                      <div className="text-sm text-gray-600">सभी भारतीय त्योहार</div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* External Links */}
              <div className="bg-blue-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">बाहरी संदर्भ और जानकारी</h2>
                <div className="space-y-3">
                  <a href="https://www.india.gov.in/calendar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold">
                    <ExternalLink className="w-5 h-5" />
                    भारत सरकार आधिकारिक कैलेंडर
                  </a>
                  <a href="https://hi.wikipedia.org/wiki/छठ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold">
                    <ExternalLink className="w-5 h-5" />
                    छठ पूजा - विकिपीडिया
                  </a>
                  <a href="https://pib.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold">
                    <ExternalLink className="w-5 h-5" />
                    प्रेस सूचना ब्यूरो - त्योहार समाचार
                  </a>
                </div>
              </div>

              {/* Conclusion */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-2xl border-2 border-orange-200">
                <h2 className="text-3xl font-black text-gray-900 mb-6">निष्कर्ष</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  छठ पूजा {currentYear} का यह पावन पर्व {formatDate(nahayKhay)} से शुरू होकर {formatDate(ushaArghya)} को संपन्न होगा। यह केवल एक धार्मिक अनुष्ठान नहीं, बल्कि हमारी संस्कृति, परंपरा और पर्यावरण के प्रति प्रेम का प्रतीक है। छठ पूजा में पूर्ण शुद्धता, अनुशासन और प्रकृति के साथ सामंजस्य का संदेश निहित है।
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  इस व्रत को करने वाले सभी श्रद्धालुओं को हमारी शुभकामनाएं। आपका छठ पूजा मंगलमय हो और सूर्य देव तथा छठी मैया आपके परिवार को सुख, समृद्धि और आरोग्य का आशीर्वाद दें।
                </p>
                <p className="text-gray-700 text-lg leading-relaxed font-bold text-center mt-6">
                  जय छठी मैया! 🙏 सूर्य देव की जय! ☀️
                </p>
              </div>

              {/* Share Section */}
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">यह जानकारी उपयोगी लगी?</h3>
                <p className="text-gray-600 mb-6">इसे अपने परिवार और दोस्तों के साथ शेयर करें</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    WhatsApp पर शेयर करें
                  </button>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Facebook पर शेयर करें
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

export default ChhathPuja2025Schedule;

