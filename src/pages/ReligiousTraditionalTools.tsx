import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Church, Search, Filter, Flame, Book, Bell, Clock, MapPin,
  Home, ChevronRight, X, Star, TrendingUp, Sparkles, Sun, Moon,
  Calendar, Music, Heart, Navigation, Calculator, Users, Gift,
  Volume2, Timer, CheckCircle, FileText, ArrowRight, Compass,
  CloudRain, Sunrise, Sunset, Globe, Award, PlayCircle, Map
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

interface ReligiousTool {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  keywords: string[];
  url: string;
  popular?: boolean;
  trending?: boolean;
}

const ReligiousTraditionalTools: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Tools', icon: Church, count: 50 },
    { id: 'puja', name: 'Puja & Rituals', icon: Flame, count: 12 },
    { id: 'mantra', name: 'Mantra & Chants', icon: Book, count: 8 },
    { id: 'vrat', name: 'Vrat & Fasting', icon: Clock, count: 7 },
    { id: 'temple', name: 'Temple & Darshan', icon: MapPin, count: 8 },
    { id: 'astrology', name: 'Astrology & Vastu', icon: Star, count: 7 },
    { id: 'devotional', name: 'Devotional Content', icon: Music, count: 8 }
  ];

  const religiousTools: ReligiousTool[] = [
    // Puja & Rituals Tools
    {
      id: 'puja-vidhi-generator',
      name: 'Puja Vidhi Generator',
      description: 'Step-by-step puja procedure for any festival or deity',
      icon: Book,
      category: 'puja',
      keywords: ['puja vidhi', 'procedure', 'ritual', 'steps'],
      url: '/religious-tools/puja-vidhi-generator',
      popular: true,
      trending: true
    },
    {
      id: 'puja-samagri-price',
      name: 'Puja Samagri Price Estimator',
      description: 'Estimate complete puja samagri cost with checklist',
      icon: Calculator,
      category: 'puja',
      keywords: ['puja samagri', 'price', 'cost', 'items'],
      url: '/religious-tools/puja-samagri-price',
      popular: true
    },
    {
      id: 'puja-step-checklist',
      name: 'Puja Step-by-Step Checklist',
      description: 'Interactive checklist for performing puja correctly',
      icon: CheckCircle,
      category: 'puja',
      keywords: ['puja', 'checklist', 'steps', 'guide'],
      url: '/religious-tools/puja-step-checklist',
      popular: true
    },
    {
      id: 'vastu-dosha-fixer',
      name: 'Vastu Dosha Festival Fixer',
      description: 'Fix vastu doshas before festival celebrations',
      icon: Compass,
      category: 'puja',
      keywords: ['vastu', 'dosha', 'fix', 'festival'],
      url: '/religious-tools/vastu-dosha-fixer'
    },
    {
      id: 'direction-finder-prayer',
      name: 'Direction Finder for Prayer Setup',
      description: 'Find exact direction for deity placement and prayers',
      icon: Navigation,
      category: 'puja',
      keywords: ['direction', 'prayer', 'deity', 'compass'],
      url: '/religious-tools/direction-finder-prayer'
    },
    {
      id: 'kalash-setup-designer',
      name: 'Kalash Setup Designer',
      description: 'Visual guide for proper kalash arrangement',
      icon: Sparkles,
      category: 'puja',
      keywords: ['kalash', 'setup', 'design', 'arrangement'],
      url: '/religious-tools/kalash-setup-designer'
    },
    {
      id: 'ghee-diya-quantity',
      name: 'Ghee Diya Quantity Estimator',
      description: 'Calculate ghee and diya quantity for puja',
      icon: Flame,
      category: 'puja',
      keywords: ['ghee', 'diya', 'quantity', 'lamp'],
      url: '/religious-tools/ghee-diya-quantity'
    },
    {
      id: 'yajna-samagri-generator',
      name: 'Custom Yajna Samagri List Generator',
      description: 'Generate complete yajna samagri list by type',
      icon: Flame,
      category: 'puja',
      keywords: ['yajna', 'havan', 'samagri', 'list'],
      url: '/religious-tools/yajna-samagri-generator'
    },
    {
      id: 'griha-pravesh-muhurat',
      name: 'Griha Pravesh Shubh Muhurat Finder',
      description: 'Find auspicious time for house warming ceremony',
      icon: Home,
      category: 'puja',
      keywords: ['griha pravesh', 'house warming', 'muhurat', 'auspicious'],
      url: '/religious-tools/griha-pravesh-muhurat'
    },
    {
      id: 'vastu-diwali-home',
      name: 'Vastu for Home Setup on Diwali',
      description: 'Vastu tips for Diwali home arrangement',
      icon: Compass,
      category: 'puja',
      keywords: ['vastu', 'diwali', 'home', 'arrangement'],
      url: '/religious-tools/vastu-diwali-home'
    },
    {
      id: 'how-to-perform-puja',
      name: 'How to Perform Puja Visual Tool',
      description: 'Visual step-by-step guide with images',
      icon: PlayCircle,
      category: 'puja',
      keywords: ['how to', 'puja', 'visual', 'guide'],
      url: '/religious-tools/how-to-perform-puja',
      trending: true
    },
    {
      id: 'virtual-puja-generator',
      name: 'Virtual Puja Generator',
      description: 'Perform virtual puja with interactive features',
      icon: Sparkles,
      category: 'puja',
      keywords: ['virtual', 'puja', 'online', 'interactive'],
      url: '/religious-tools/virtual-puja-generator'
    },

    // Mantra & Chants Tools
    {
      id: 'mantra-aarti-library',
      name: 'Festival Mantra & Aarti Library',
      description: 'Complete collection of mantras and aartis for all festivals',
      icon: Book,
      category: 'mantra',
      keywords: ['mantra', 'aarti', 'library', 'collection'],
      url: '/religious-tools/mantra-aarti-library',
      popular: true,
      trending: true
    },
    {
      id: 'mantra-chant-counter',
      name: 'Mantra Chant Counter App',
      description: 'Digital counter for mantra repetitions (108, 1008)',
      icon: Calculator,
      category: 'mantra',
      keywords: ['mantra', 'counter', 'japa', 'repetition'],
      url: '/religious-tools/mantra-chant-counter',
      popular: true
    },
    {
      id: '108-names-counter',
      name: '108 Names Counter Tool',
      description: 'Count and track 108 names recitation',
      icon: Star,
      category: 'mantra',
      keywords: ['108 names', 'ashtottara', 'counter', 'recitation'],
      url: '/religious-tools/108-names-counter'
    },
    {
      id: 'mantra-repetition-timer',
      name: 'Mantra Repetition Timer',
      description: 'Timer for timed mantra chanting sessions',
      icon: Timer,
      category: 'mantra',
      keywords: ['mantra', 'timer', 'chanting', 'japa'],
      url: '/religious-tools/mantra-repetition-timer'
    },
    {
      id: 'sanskrit-transliteration',
      name: 'Sanskrit Chant Transliteration Tool',
      description: 'Convert Sanskrit mantras to English/Hindi script',
      icon: Globe,
      category: 'mantra',
      keywords: ['sanskrit', 'transliteration', 'convert', 'script'],
      url: '/religious-tools/sanskrit-transliteration'
    },
    {
      id: 'custom-festival-poster-mantra',
      name: 'Custom Festival Poster with Mantra',
      description: 'Create posters with mantras and deity images',
      icon: Sparkles,
      category: 'mantra',
      keywords: ['poster', 'mantra', 'design', 'festival'],
      url: '/religious-tools/custom-festival-poster-mantra'
    },
    {
      id: 'audio-aarti-player',
      name: 'Audio Aarti Player',
      description: 'Play aartis with lyrics and auto-scroll',
      icon: Volume2,
      category: 'mantra',
      keywords: ['aarti', 'audio', 'player', 'lyrics'],
      url: '/religious-tools/audio-aarti-player'
    },
    {
      id: 'audio-arti-reminder',
      name: 'Audio Arti Time Reminder',
      description: 'Set reminders for daily aarti timings',
      icon: Bell,
      category: 'mantra',
      keywords: ['aarti', 'reminder', 'time', 'alert'],
      url: '/religious-tools/audio-arti-reminder'
    },

    // Vrat & Fasting Tools
    {
      id: 'fasting-reminder',
      name: 'Fasting Reminder Applet',
      description: 'Get reminders for upcoming vrat and fasting days',
      icon: Bell,
      category: 'vrat',
      keywords: ['fasting', 'reminder', 'vrat', 'alert'],
      url: '/religious-tools/fasting-reminder',
      popular: true
    },
    {
      id: 'vrat-duration-calculator',
      name: 'Vrat Duration Calculator',
      description: 'Calculate exact fasting duration from sunrise to moonrise',
      icon: Clock,
      category: 'vrat',
      keywords: ['vrat', 'duration', 'calculator', 'fasting hours'],
      url: '/religious-tools/vrat-duration-calculator',
      popular: true,
      trending: true
    },
    {
      id: 'vrat-upvas-tracker',
      name: 'Vrat Upvas Count Tracker',
      description: 'Track all vrats performed throughout the year',
      icon: Calendar,
      category: 'vrat',
      keywords: ['vrat', 'tracker', 'count', 'calendar'],
      url: '/religious-tools/vrat-upvas-tracker'
    },
    {
      id: 'which-god-worship-today',
      name: 'Which God to Worship Today Tool',
      description: 'Daily deity recommendation based on weekday and tithi',
      icon: Star,
      category: 'vrat',
      keywords: ['god', 'deity', 'worship', 'today'],
      url: '/religious-tools/which-god-worship-today',
      trending: true
    },
    {
      id: 'vrat-tithi-calendar',
      name: 'Vrat Tithi Calendar',
      description: 'Complete calendar of all vrat and upvas tithis',
      icon: Calendar,
      category: 'vrat',
      keywords: ['vrat', 'tithi', 'calendar', 'fasting'],
      url: '/religious-tools/vrat-tithi-calendar'
    },
    {
      id: 'vrat-parana-time',
      name: 'Vrat Parana Time Calculator',
      description: 'Calculate exact time to break fast (parana)',
      icon: Sunset,
      category: 'vrat',
      keywords: ['parana', 'break fast', 'time', 'calculator'],
      url: '/religious-tools/vrat-parana-time'
    },
    {
      id: 'who-should-fast',
      name: 'Who Should Fast Today Tool',
      description: 'Find if you should observe fast based on tithi',
      icon: Users,
      category: 'vrat',
      keywords: ['fast', 'today', 'should', 'observe'],
      url: '/religious-tools/who-should-fast'
    },

    // Temple & Darshan Tools
    {
      id: 'temple-darshan-queue',
      name: 'Temple Darshan Queue Predictor',
      description: 'Predict waiting time at popular temples',
      icon: Users,
      category: 'temple',
      keywords: ['temple', 'queue', 'waiting', 'darshan'],
      url: '/religious-tools/temple-darshan-queue',
      popular: true
    },
    {
      id: 'mandir-finder',
      name: 'Mandir Finder',
      description: 'Find nearby temples with timings and directions',
      icon: MapPin,
      category: 'temple',
      keywords: ['mandir', 'temple', 'finder', 'nearby'],
      url: '/religious-tools/mandir-finder',
      popular: true
    },
    {
      id: 'temple-timings-map',
      name: 'Temple Timings Map',
      description: 'Interactive map with temple opening/closing times',
      icon: Map,
      category: 'temple',
      keywords: ['temple', 'timings', 'map', 'hours'],
      url: '/religious-tools/temple-timings-map'
    },
    {
      id: 'temple-donation-estimator',
      name: 'Temple Donation Estimator',
      description: 'Calculate donation amounts with tax benefits',
      icon: Gift,
      category: 'temple',
      keywords: ['temple', 'donation', 'estimate', 'tax'],
      url: '/religious-tools/temple-donation-estimator'
    },
    {
      id: 'temple-donation-receipt',
      name: 'Temple Donation Receipt Generator',
      description: 'Generate donation receipts for tax filing',
      icon: FileText,
      category: 'temple',
      keywords: ['donation', 'receipt', 'tax', 'temple'],
      url: '/religious-tools/temple-donation-receipt'
    },
    {
      id: 'temple-route-planner',
      name: 'Temple Route Planner',
      description: 'Plan multi-temple pilgrimage routes',
      icon: Map,
      category: 'temple',
      keywords: ['temple', 'route', 'planner', 'pilgrimage'],
      url: '/religious-tools/temple-route-planner'
    },
    {
      id: 'pilgrimage-expense',
      name: 'Pilgrimage Expense Estimator',
      description: 'Calculate complete pilgrimage trip costs',
      icon: Calculator,
      category: 'temple',
      keywords: ['pilgrimage', 'expense', 'cost', 'trip'],
      url: '/religious-tools/pilgrimage-expense'
    },
    {
      id: 'virtual-temple-darshan',
      name: 'Virtual Temple Darshan Tool',
      description: 'Take virtual darshan of famous temples',
      icon: Globe,
      category: 'temple',
      keywords: ['virtual', 'darshan', 'online', 'temple'],
      url: '/religious-tools/virtual-temple-darshan',
      trending: true
    },
    {
      id: 'temple-crowd-predictor',
      name: 'Temple Crowdsourced Queue Predictor',
      description: 'Real-time crowd updates from users',
      icon: Users,
      category: 'temple',
      keywords: ['crowd', 'queue', 'predictor', 'live'],
      url: '/religious-tools/temple-crowd-predictor'
    },

    // Astrology & Vastu Tools
    {
      id: 'nakshatra-rashi-compatibility',
      name: 'Nakshatra & Rashi Compatibility Tool',
      description: 'Check compatibility for muhurat and ceremonies',
      icon: Star,
      category: 'astrology',
      keywords: ['nakshatra', 'rashi', 'compatibility', 'match'],
      url: '/religious-tools/nakshatra-rashi-compatibility'
    },
    {
      id: 'daily-panchang-widget',
      name: 'Daily Panchang Widget Embedder',
      description: 'Embed daily panchang on your website/app',
      icon: Calendar,
      category: 'astrology',
      keywords: ['panchang', 'widget', 'daily', 'embed'],
      url: '/religious-tools/daily-panchang-widget',
      popular: true
    },
    {
      id: 'horoscope-festival-recommendation',
      name: 'Horoscope + Festival Recommendation Tool',
      description: 'Get festival recommendations based on horoscope',
      icon: Star,
      category: 'astrology',
      keywords: ['horoscope', 'festival', 'recommendation', 'zodiac'],
      url: '/religious-tools/horoscope-festival-recommendation'
    },
    {
      id: 'kundali-festival-compatibility',
      name: 'Kundali + Festival Compatibility Tool',
      description: 'Check festival compatibility with your kundali',
      icon: Star,
      category: 'astrology',
      keywords: ['kundali', 'compatibility', 'festival', 'birth chart'],
      url: '/religious-tools/kundali-festival-compatibility'
    },
    {
      id: 'astrology-donation',
      name: 'Astrology-based Donation Tool',
      description: 'Suggest donations based on planetary positions',
      icon: Gift,
      category: 'astrology',
      keywords: ['astrology', 'donation', 'planets', 'remedy'],
      url: '/religious-tools/astrology-donation'
    },
    {
      id: 'sunrise-sunset-city',
      name: 'Sunrise/Sunset by City',
      description: 'Get exact sunrise and sunset times for your city',
      icon: Sun,
      category: 'astrology',
      keywords: ['sunrise', 'sunset', 'city', 'timing'],
      url: '/religious-tools/sunrise-sunset-city',
      popular: true
    },
    {
      id: 'charity-calculator',
      name: 'Charity Calculator',
      description: 'Calculate optimal charity amount for festivals',
      icon: Heart,
      category: 'astrology',
      keywords: ['charity', 'donation', 'calculator', 'daan'],
      url: '/religious-tools/charity-calculator'
    },

    // Devotional Content Tools
    {
      id: 'bhajan-playlist-generator',
      name: 'Bhajan Playlist Generator',
      description: 'Create custom bhajan playlists for festivals',
      icon: Music,
      category: 'devotional',
      keywords: ['bhajan', 'playlist', 'music', 'devotional'],
      url: '/religious-tools/bhajan-playlist-generator',
      popular: true
    },
    {
      id: 'personalized-bhajan-playlist',
      name: 'Personalized Bhajan Playlist',
      description: 'AI-curated bhajan playlist based on preferences',
      icon: Music,
      category: 'devotional',
      keywords: ['personalized', 'bhajan', 'ai', 'custom'],
      url: '/religious-tools/personalized-bhajan-playlist',
      trending: true
    },
    {
      id: 'devotional-song-downloader',
      name: 'Devotional Song Downloader',
      description: 'Download devotional songs for offline listening',
      icon: Volume2,
      category: 'devotional',
      keywords: ['devotional', 'song', 'download', 'offline'],
      url: '/religious-tools/devotional-song-downloader'
    },
    {
      id: 'aarti-timer-app',
      name: 'Aarti Timer App',
      description: 'Set timers for morning and evening aarti',
      icon: Timer,
      category: 'devotional',
      keywords: ['aarti', 'timer', 'alarm', 'reminder'],
      url: '/religious-tools/aarti-timer-app'
    },
    {
      id: 'katha-summary-generator',
      name: 'Katha Summary Generator',
      description: 'Get summaries of religious kathas and stories',
      icon: Book,
      category: 'devotional',
      keywords: ['katha', 'story', 'summary', 'religious'],
      url: '/religious-tools/katha-summary-generator'
    },
    {
      id: 'religious-holiday-tracker',
      name: 'Religious Holiday Tracker',
      description: 'Track all religious holidays and observances',
      icon: Calendar,
      category: 'devotional',
      keywords: ['religious', 'holiday', 'tracker', 'calendar'],
      url: '/religious-tools/religious-holiday-tracker'
    },
    {
      id: 'pandit-booking-estimator',
      name: 'Pandit Booking Estimator',
      description: 'Estimate costs for booking pandit/priest',
      icon: Users,
      category: 'devotional',
      keywords: ['pandit', 'priest', 'booking', 'cost'],
      url: '/religious-tools/pandit-booking-estimator'
    }
  ];

  const filteredTools = useMemo(() => {
    let filtered = religiousTools;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const popularTools = religiousTools.filter(tool => tool.popular);
  const trendingTools = religiousTools.filter(tool => tool.trending);

  return (
    <>
      <SEOHelmet
        title="Religious & Traditional Tools 2025 | Puja Vidhi, Mantra List, Vrat Calculator"
        description="Complete puja vidhi guides, mantra & aarti library, vrat calculator, temple finder, fasting reminders. 50+ Hindu religious tools for festivals, rituals, and traditions."
        keywords="puja vidhi, mantra list, vrat calculator, aarti collection, temple finder, fasting calculator, sunrise sunset, puja samagri, vastu tips, nakshatra rashi, bhajan playlist"
        url="/religious-tools"
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-purple-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-purple-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-purple-600 font-medium">Religious & Traditional</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-orange-500/10"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-orange-600 text-white px-6 py-2 rounded-full mb-6">
                <Church className="w-5 h-5" />
                <span className="font-semibold">50+ Religious & Traditional Tools</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Religious & Traditional Tools
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                Complete puja vidhi guides, mantra & aarti library, vrat calculator, temple finder, and 50+ Hindu religious tools for authentic festival celebrations and spiritual practices.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tools... (e.g., puja vidhi, mantra, vrat calculator)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all shadow-lg"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  <span className="text-sm text-gray-600">Popular:</span>
                  {['Puja Vidhi', 'Mantra List', 'Vrat Calculator', 'Temple Finder'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1 bg-white hover:bg-purple-50 border border-purple-200 rounded-full text-sm text-purple-600 font-medium transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 bg-white border-y border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Browse by Category</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>

            <div className={`flex flex-wrap gap-3 ${!showFilters ? 'hidden lg:flex' : ''}`}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-orange-600 text-white shadow-lg scale-105'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Popular & Trending Section */}
        {selectedCategory === 'all' && !searchQuery && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Popular Tools */}
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <Star className="w-6 h-6 text-purple-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Most Popular</h2>
                  </div>
                  <div className="space-y-4">
                    {popularTools.map((tool, index) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={tool.url}
                          className="block bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-purple-500 hover:border-purple-600 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <tool.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Trending Tools */}
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
                  </div>
                  <div className="space-y-4">
                    {trendingTools.map((tool, index) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={tool.url}
                          className="block bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-orange-500 hover:border-orange-600 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <tool.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-1">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All Tools Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {searchQuery ? `Search Results (${filteredTools.length})` : 
                 selectedCategory !== 'all' ? `${categories.find(c => c.id === selectedCategory)?.name} (${filteredTools.length})` :
                 `All Tools (${filteredTools.length})`}
              </h2>
            </div>

            {filteredTools.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">No tools found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={tool.url}
                      className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 hover:border-purple-300 h-full"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <tool.icon className="w-7 h-7 text-white" />
                          </div>
                          {tool.popular && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-bold rounded-full">
                              Popular
                            </span>
                          )}
                          {tool.trending && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                          {tool.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {tool.description}
                        </p>

                        <div className="flex items-center text-purple-600 font-semibold text-sm group-hover:gap-2 transition-all">
                          Use Tool
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Hindu Religious & Traditional Tools</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Use Religious Tools?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Traditional Hindu rituals require precise knowledge and timing. Our religious tools help you:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      Get step-by-step puja vidhi for any festival
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      Access complete mantra and aarti library
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      Calculate vrat duration and parana time
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      Find nearby temples with timings
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      Get daily panchang and muhurat information
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      Track all vrats and religious observances
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Top Religious Queries</h3>
                  <div className="bg-purple-50 p-6 rounded-2xl">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center">
                        <Book className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="font-semibold">Lakshmi puja vidhi in Hindi</span>
                      </li>
                      <li className="flex items-center">
                        <Music className="w-5 h-5 text-pink-600 mr-2" />
                        <span className="font-semibold">Ganesh aarti lyrics with meaning</span>
                      </li>
                      <li className="flex items-center">
                        <Clock className="w-5 h-5 text-orange-600 mr-2" />
                        <span className="font-semibold">Karwa Chauth vrat time calculator</span>
                      </li>
                      <li className="flex items-center">
                        <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-semibold">Nearest Hanuman temple near me</span>
                      </li>
                      <li className="flex items-center">
                        <Sun className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="font-semibold">Sunrise sunset time for puja</span>
                      </li>
                      <li className="flex items-center">
                        <Star className="w-5 h-5 text-teal-600 mr-2" />
                        <span className="font-semibold">Which god to worship on Monday</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Hindu Puja Rituals</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Hindu puja is a devotional worship ritual performed to honor deities. The basic puja vidhi includes Dhyana (meditation), Avahana (invocation), Asana (offering seat), Padya (washing feet), Arghya (offering water), Achamana (sipping water), Snana (bathing), Vastra (clothing), Yajnopavita (sacred thread), Gandha (fragrance), Pushpa (flowers), Dhupa (incense), Dipa (lamp), Naivedya (food offering), Tambula (betel), Dakshina (donation), Namaskara (prostration), and Visarjana (farewell).
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Religious Tool Categories</h3>
              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Puja & Rituals (12 tools)</h4>
                  <p className="text-gray-700 text-sm">Puja vidhi generators, samagri checklists, vastu guides, direction finders, kalash designers, and ritual step-by-step tools.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Mantra & Chants (8 tools)</h4>
                  <p className="text-gray-700 text-sm">Mantra library, aarti collection, chant counters, transliteration tools, and audio players with lyrics.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Vrat & Fasting (7 tools)</h4>
                  <p className="text-gray-700 text-sm">Vrat calculators, fasting reminders, parana time finders, upvas trackers, and daily deity recommendations.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Temple & Darshan (9 tools)</h4>
                  <p className="text-gray-700 text-sm">Temple finders, queue predictors, donation calculators, route planners, virtual darshan, and pilgrimage expense tools.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Astrology & Vastu (7 tools)</h4>
                  <p className="text-gray-700 text-sm">Nakshatra compatibility, panchang widgets, horoscope tools, kundali matchers, and sunrise/sunset calculators.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Devotional Content (8 tools)</h4>
                  <p className="text-gray-700 text-sm">Bhajan playlists, katha summaries, aarti timers, holiday trackers, and pandit booking estimators.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Perform Traditional Puja</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                <li><strong>Preparation:</strong> Clean the puja area, arrange samagri, and wear clean clothes.</li>
                <li><strong>Sankalp:</strong> Take a vow stating the purpose and deity of worship.</li>
                <li><strong>Avahana:</strong> Invoke the deity with mantras and request their presence.</li>
                <li><strong>Offerings:</strong> Offer flowers, incense, lamp, and naivedya (food).</li>
                <li><strong>Mantra Chanting:</strong> Recite appropriate mantras (use our Mantra Library).</li>
                <li><strong>Aarti:</strong> Perform aarti with proper procedure (use our Aarti Player).</li>
                <li><strong>Pradakshina:</strong> Circumambulate the deity (if applicable).</li>
                <li><strong>Visarjana:</strong> Bid farewell to the deity respectfully.</li>
              </ol>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">What is puja vidhi?</h4>
                  <p className="text-gray-700 text-sm">Puja vidhi is the prescribed procedure for performing worship. It varies by deity, festival, and regional tradition. Our Puja Vidhi Generator provides authentic step-by-step instructions for any occasion.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">How do I calculate vrat duration?</h4>
                  <p className="text-gray-700 text-sm">Vrat duration is calculated from sunrise to sunset or moonrise depending on the vrat type. Use our Vrat Duration Calculator by entering your city to get exact timings based on astronomical data.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Where can I find authentic mantras?</h4>
                  <p className="text-gray-700 text-sm">Our Mantra & Aarti Library contains authentic mantras from Vedic scriptures with Sanskrit text, transliteration, and meanings. All mantras are verified for accuracy.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">What puja samagri do I need?</h4>
                  <p className="text-gray-700 text-sm">Essential puja samagri includes kumkum, haldi, rice, flowers, incense, lamp, ghee, camphor, fruits, and sweets. Use our Puja Samagri Checklist for complete festival-specific lists.</p>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-purple-600 to-orange-600 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Start Your Spiritual Journey Today!</h3>
                <p className="mb-6 text-white/90">
                  Perform authentic pujas, learn mantras, observe vrats correctly, and deepen your spiritual practice with our 50+ comprehensive religious tools!
                </p>
                <Link
                  to="/festival-tools"
                  className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Explore All Festival Tools
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ReligiousTraditionalTools;

