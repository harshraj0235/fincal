import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BookOpen, 
  Calculator, 
  Users, 
  Award, 
  Play,
  ChevronRight,
  Search,
  Grid,
  List,
  Star,
  Clock,
  Target,
  Zap,
  Shield,
  Brain,
  BarChart3,
  DollarSign,
  PieChart,
  LineChart
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const StockMarket: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const courseLevels = [
    {
      id: 'stock-market-basics',
      title: 'स्टॉक मार्केट बेसिक्स',
      englishTitle: 'Stock Market Basics',
      description: 'शेयर मार्केट की बुनियादी जानकारी और शुरुआती अवधारणाएं',
      lessons: 5,
      duration: '2 घंटे',
      level: 'शुरुआती',
      color: 'from-blue-500 to-blue-700',
      icon: <BookOpen className="h-8 w-8 text-white" />,
      topics: [
        'शेयर मार्केट क्या है?',
        'मुख्य बाजार प्रतिभागी',
        'डीमैट और ट्रेडिंग अकाउंट',
        'आईपीओ क्या है?',
        'बुनियादी शेयर मार्केट शब्दावली'
      ]
    },
    {
      id: 'core-market-concepts',
      title: 'मुख्य बाजार अवधारणाएं',
      englishTitle: 'Core Market Concepts',
      description: 'बुल और बेयर मार्केट, मार्केट कैप, डिविडेंड और सेक्टर',
      lessons: 5,
      duration: '3 घंटे',
      level: 'मध्यम',
      color: 'from-green-500 to-green-700',
      icon: <TrendingUp className="h-8 w-8 text-white" />,
      topics: [
        'बुल और बेयर मार्केट',
        'मार्केट कैपिटलाइजेशन',
        'डिविडेंड और उनके प्रकार',
        'सेक्टर और इंडेक्स',
        'आर्थिक चक्र और बाजार प्रभाव'
      ]
    },
    {
      id: 'fundamental-analysis',
      title: 'फंडामेंटल एनालिसिस',
      englishTitle: 'Fundamental Analysis',
      description: 'कंपनी के वित्तीय स्वास्थ्य का विश्लेषण और मूल्यांकन',
      lessons: 6,
      duration: '4 घंटे',
      level: 'उन्नत',
      color: 'from-purple-500 to-purple-700',
      icon: <BarChart3 className="h-8 w-8 text-white" />,
      topics: [
        'फंडामेंटल एनालिसिस क्या है?',
        'ईपीएस और पी/ई रेशियो',
        'रिटर्न ऑन इक्विटी (ROE)',
        'बैलेंस शीट समझना',
        'महत्वपूर्ण वित्तीय अनुपात',
        'कंपनी मूल्यांकन'
      ]
    },
    {
      id: 'technical-analysis',
      title: 'टेक्निकल एनालिसिस',
      englishTitle: 'Technical Analysis',
      description: 'चार्ट पैटर्न, इंडिकेटर्स और मूल्य आंदोलन का विश्लेषण',
      lessons: 5,
      duration: '4 घंटे',
      level: 'उन्नत',
      color: 'from-orange-500 to-orange-700',
      icon: <LineChart className="h-8 w-8 text-white" />,
      topics: [
        'टेक्निकल एनालिसिस क्या है?',
        'कैंडलस्टिक चार्ट',
        'सपोर्ट और रेजिस्टेंस',
        'लोकप्रिय टेक्निकल इंडिकेटर्स',
        'वॉल्यूम एनालिसिस'
      ]
    },
    {
      id: 'advanced-trading',
      title: 'उन्नत ट्रेडिंग रणनीतियां',
      englishTitle: 'Advanced Trading Strategies',
      description: 'स्विंग ट्रेडिंग, डे ट्रेडिंग और रिस्क मैनेजमेंट',
      lessons: 5,
      duration: '5 घंटे',
      level: 'विशेषज्ञ',
      color: 'from-red-500 to-red-700',
      icon: <Zap className="h-8 w-8 text-white" />,
      topics: [
        'स्विंग ट्रेडिंग',
        'डे ट्रेडिंग बेसिक्स',
        'ऑप्शन और फ्यूचर्स',
        'चार्ट पैटर्न',
        'रिस्क मैनेजमेंट तकनीकें'
      ]
    },
    {
      id: 'tools-practical',
      title: 'टूल्स और प्रैक्टिकल एप्लिकेशन',
      englishTitle: 'Tools & Practical Application',
      description: 'व्यावहारिक टूल्स, पेपर ट्रेडिंग और मार्केट न्यूज',
      lessons: 5,
      duration: '3 घंटे',
      level: 'मध्यम',
      color: 'from-indigo-500 to-indigo-700',
      icon: <Calculator className="h-8 w-8 text-white" />,
      topics: [
        'स्टॉक स्क्रीनर का उपयोग',
        'ट्रेडिंग प्लेटफॉर्म',
        'इन्वेस्टमेंट कैलकुलेटर्स',
        'पेपर ट्रेडिंग',
        'मार्केट न्यूज पढ़ना'
      ]
    },
    {
      id: 'case-studies-psychology',
      title: 'केस स्टडीज और मार्केट साइकोलॉजी',
      englishTitle: 'Case Studies & Market Psychology',
      description: 'वास्तविक केस स्टडीज और व्यवहारिक वित्त',
      lessons: 4,
      duration: '3 घंटे',
      level: 'विशेषज्ञ',
      color: 'from-pink-500 to-pink-700',
      icon: <Brain className="h-8 w-8 text-white" />,
      topics: [
        'प्रसिद्ध स्टॉक मार्केट केस स्टडीज',
        'बिहेवियरल फाइनेंस बेसिक्स',
        'ट्रेडिंग में भावनात्मक अनुशासन',
        'ट्रेडिंग माइंडसेट विकसित करना'
      ]
    }
  ];

  const tools = [
    {
      id: 'sip-calculator',
      title: 'SIP कैलकुलेटर',
      description: 'सिस्टेमैटिक इन्वेस्टमेंट प्लान के लिए रिटर्न की गणना',
      icon: <Calculator className="h-6 w-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'cagr-calculator',
      title: 'CAGR कैलकुलेटर',
      description: 'कंपाउंड एनुअल ग्रोथ रेट की गणना',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'pe-ratio-calculator',
      title: 'P/E रेशियो कैलकुलेटर',
      description: 'प्राइस-टू-अर्निंग रेशियो की गणना',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'intrinsic-value-calculator',
      title: 'इंट्रिन्सिक वैल्यू कैलकुलेटर',
      description: 'स्टॉक की आंतरिक मूल्य की गणना',
      icon: <Target className="h-6 w-6" />,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'xirr-calculator',
      title: 'XIRR कैलकुलेटर',
      description: 'अनियमित निवेश के लिए रिटर्न की गणना',
      icon: <PieChart className="h-6 w-6" />,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'stock-screener',
      title: 'स्टॉक स्क्रीनर',
      description: 'अपनी रणनीति के अनुसार स्टॉक फ़िल्टर करें',
      icon: <Search className="h-6 w-6" />,
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const filteredLevels = courseLevels.filter(level =>
    level.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    level.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    level.englishTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title="स्टॉक मार्केट कोर्स - शेयर मार्केट सीखें | MoneyCal.in"
        description="भारत का सबसे व्यापक स्टॉक मार्केट कोर्स। शुरुआती से विशेषज्ञ स्तर तक शेयर मार्केट सीखें। फ्री टूल्स, कैलकुलेटर्स और प्रैक्टिकल गाइड के साथ।"
        keywords="स्टॉक मार्केट कोर्स, शेयर मार्केट सीखें, ट्रेडिंग कोर्स, इन्वेस्टमेंट गाइड, स्टॉक मार्केट बेसिक्स, टेक्निकल एनालिसिस, फंडामेंटल एनालिसिस"
        url="/stock-market"
        structuredData={{}}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-white text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              MoneyCal Varsity
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              स्टॉक मार्केट कोर्स
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              भारत का सबसे व्यापक स्टॉक मार्केट शिक्षा प्लेटफॉर्म। शुरुआती से विशेषज्ञ स्तर तक, 
              सभी कुछ हिंदी में सीखें और अपने निवेश ज्ञान को बढ़ाएं।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="#courses"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
              >
                <Play className="h-5 w-5 mr-2" />
                कोर्स शुरू करें
              </Link>
              <Link
                to="#tools"
                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:border-green-500 hover:text-green-600 transition-all"
              >
                <Calculator className="h-5 w-5 mr-2" />
                टूल्स देखें
              </Link>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">7</div>
              <div className="text-gray-600">कोर्स लेवल</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">39</div>
              <div className="text-gray-600">लेसन</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24</div>
              <div className="text-gray-600">घंटे कंटेंट</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600">फ्री</div>
            </div>
          </motion.div>

          {/* Search and View Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-4 mb-8"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="कोर्स या टॉपिक खोजें..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Course Levels */}
          <motion.div
            id="courses"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">कोर्स लेवल्स</h2>
              <p className="text-lg text-gray-600">शुरुआती से विशेषज्ञ स्तर तक स्टेप-बाय-स्टेप सीखें</p>
            </div>
            
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-6'
            }`}>
              {filteredLevels.map((level, index) => (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${level.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center mr-4 shadow-lg`}>
                        {level.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{level.title}</h3>
                        <p className="text-sm text-gray-500">{level.englishTitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{level.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {level.level}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {level.duration}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {level.topics.slice(0, 3).map((topic, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <ChevronRight className="h-4 w-4 mr-2 text-green-500" />
                          {topic}
                        </div>
                      ))}
                      {level.topics.length > 3 && (
                        <div className="text-sm text-gray-500">
                          +{level.topics.length - 3} और टॉपिक्स
                        </div>
                      )}
                    </div>
                    
                    <Link
                      to={`/stock-market/${level.id}`}
                      className="inline-flex items-center w-full justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all group"
                    >
                      कोर्स शुरू करें
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tools Section */}
          <motion.div
            id="tools"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">फ्री टूल्स</h2>
              <p className="text-lg text-gray-600">स्टॉक मार्केट एनालिसिस के लिए उपयोगी कैलकुलेटर्स और टूल्स</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
                >
                  <Link to={`/calculators/${tool.id}`} className="block group">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {tool.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">{tool.title}</h3>
                    <p className="text-gray-600 text-sm">{tool.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">विशेषताएं</h2>
              <p className="text-lg text-gray-600">हमारे स्टॉक मार्केट प्लेटफॉर्म की मुख्य विशेषताएं</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">व्यापक कोर्स</h3>
                <p className="text-gray-600 text-sm">7 लेवल में 39 लेसन के साथ पूर्ण शिक्षा</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">फ्री टूल्स</h3>
                <p className="text-gray-600 text-sm">6 उपयोगी कैलकुलेटर्स और एनालिसिस टूल्स</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">सर्टिफिकेट</h3>
                <p className="text-gray-600 text-sm">कोर्स पूरा करने पर फ्री सर्टिफिकेट</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">कम्युनिटी</h3>
                <p className="text-gray-600 text-sm">अन्य निवेशकों के साथ चर्चा और सीखें</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-green-600 to-blue-700 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">आज ही शुरू करें</h2>
            <p className="text-xl mb-8 text-green-100">
              स्टॉक मार्केट की दुनिया में अपनी यात्रा शुरू करें और अपने वित्तीय लक्ष्यों को प्राप्त करें
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="#courses"
                className="inline-flex items-center px-8 py-4 bg-white text-green-600 rounded-2xl font-semibold hover:bg-gray-100 transition-all"
              >
                <Play className="h-5 w-5 mr-2" />
                कोर्स शुरू करें
              </Link>
              <Link
                to="#tools"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-2xl font-semibold hover:bg-white hover:text-green-600 transition-all"
              >
                <Calculator className="h-5 w-5 mr-2" />
                टूल्स देखें
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default StockMarket;
