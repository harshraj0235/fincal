import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Languages, Search, Filter, Globe, Map, MapPin, Music, Calendar,
  Home, ChevronRight, X, Star, TrendingUp, MessageCircle, Book,
  Mic, FileText, Image, Gift, ShoppingBag, Heart, Video, Volume2,
  Award, Sparkles, Users, Camera, Hash, ArrowRight, Clock, Utensils,
  Landmark, DollarSign, Palette, Navigation, TrendingDown, Smartphone
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

interface RegionalTool {
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

const RegionalLanguageTools: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Tools', icon: Languages, count: 60 },
    { id: 'language-specific', name: 'Language Tools', icon: Globe, count: 15 },
    { id: 'regional-calendar', name: 'Regional Calendars', icon: Calendar, count: 10 },
    { id: 'local-finder', name: 'Local Finders', icon: MapPin, count: 12 },
    { id: 'content-creator', name: 'Content Creation', icon: FileText, count: 10 },
    { id: 'cultural', name: 'Cultural Resources', icon: Music, count: 8 },
    { id: 'translator', name: 'Translation Tools', icon: Languages, count: 5 }
  ];

  const regionalTools: RegionalTool[] = [
    // Language-Specific Tools
    {
      id: 'hindi-wishes',
      name: 'Hindi Festival Wishes Generator',
      description: 'Generate authentic Hindi festival wishes and greetings',
      icon: MessageCircle,
      category: 'language-specific',
      keywords: ['hindi', 'wishes', 'greetings', 'diwali'],
      url: '/regional-tools/hindi-wishes',
      popular: true,
      trending: true
    },
    {
      id: 'tamil-date-finder',
      name: 'Tamil Festival Date Finder',
      description: 'Find festival dates with Tamil calendar integration',
      icon: Calendar,
      category: 'language-specific',
      keywords: ['tamil', 'dates', 'calendar', 'pongal'],
      url: '/regional-tools/tamil-date-finder',
      popular: true,
      trending: true
    },
    {
      id: 'telugu-panchangam',
      name: 'Telugu Panchangam Tool',
      description: 'Complete Telugu panchangam with festival dates',
      icon: Book,
      category: 'language-specific',
      keywords: ['telugu', 'panchangam', 'calendar', 'dates'],
      url: '/regional-tools/telugu-panchangam',
      popular: true,
      trending: true
    },
    {
      id: 'malayalam-calendar',
      name: 'Malayalam Calendar Sync Tool',
      description: 'Sync Malayalam calendar with Gregorian dates',
      icon: Calendar,
      category: 'language-specific',
      keywords: ['malayalam', 'calendar', 'onam', 'sync'],
      url: '/regional-tools/malayalam-calendar',
      popular: true
    },
    {
      id: 'marathi-greeting-card',
      name: 'Marathi Festival Greeting Card Maker',
      description: 'Create beautiful Marathi festival greeting cards',
      icon: Gift,
      category: 'language-specific',
      keywords: ['marathi', 'greeting', 'card', 'diwali'],
      url: '/regional-tools/marathi-greeting-card',
      popular: true,
      trending: true
    },
    {
      id: 'bengali-countdown',
      name: 'Bengali Festival Countdown',
      description: 'Countdown to Durga Puja and Bengali festivals',
      icon: Clock,
      category: 'language-specific',
      keywords: ['bengali', 'countdown', 'durga puja', 'bengal'],
      url: '/regional-tools/bengali-countdown'
    },
    {
      id: 'gujarati-tithi',
      name: 'Gujarati Tithi Finder',
      description: 'Find Gujarati tithi and festival dates',
      icon: Calendar,
      category: 'language-specific',
      keywords: ['gujarati', 'tithi', 'dates', 'navratri'],
      url: '/regional-tools/gujarati-tithi'
    },
    {
      id: 'kannada-poster',
      name: 'Kannada Festival Poster Generator',
      description: 'Design festival posters in Kannada language',
      icon: Image,
      category: 'language-specific',
      keywords: ['kannada', 'poster', 'generator', 'festival'],
      url: '/regional-tools/kannada-poster'
    },
    {
      id: 'punjabi-gurpurab',
      name: 'Punjabi Gurpurab Date Finder',
      description: 'Find Sikh festival dates with Punjabi calendar',
      icon: Calendar,
      category: 'language-specific',
      keywords: ['punjabi', 'gurpurab', 'sikh', 'dates'],
      url: '/regional-tools/punjabi-gurpurab'
    },
    {
      id: 'assamese-bihu',
      name: 'Assamese Bihu Calendar Tool',
      description: 'Complete Bihu festival calendar for Assam',
      icon: Calendar,
      category: 'language-specific',
      keywords: ['assamese', 'bihu', 'calendar', 'assam'],
      url: '/regional-tools/assamese-bihu'
    },
    {
      id: 'odia-festival-list',
      name: 'Odia Festival List Generator',
      description: 'Comprehensive Odia festival list and dates',
      icon: Book,
      category: 'language-specific',
      keywords: ['odia', 'oriya', 'festival', 'list'],
      url: '/regional-tools/odia-festival-list'
    },
    {
      id: 'urdu-eid-converter',
      name: 'Urdu Eid Date Converter',
      description: 'Convert Hijri to Gregorian in Urdu',
      icon: Calendar,
      category: 'language-specific',
      keywords: ['urdu', 'eid', 'hijri', 'converter'],
      url: '/regional-tools/urdu-eid-converter'
    },
    {
      id: 'sanskrit-mantra-audio',
      name: 'Sanskrit Mantra Audio Library',
      description: 'Authentic Sanskrit mantras with audio',
      icon: Volume2,
      category: 'language-specific',
      keywords: ['sanskrit', 'mantra', 'audio', 'vedic'],
      url: '/regional-tools/sanskrit-mantra-audio',
      popular: true
    },
    {
      id: 'hindi-voice-greeting',
      name: 'Hindi Voice Greeting Generator',
      description: 'Generate voice greetings in Hindi',
      icon: Mic,
      category: 'language-specific',
      keywords: ['hindi', 'voice', 'greeting', 'audio'],
      url: '/regional-tools/hindi-voice-greeting'
    },
    {
      id: 'tamil-text-to-speech',
      name: 'Tamil Text-to-Speech Festival Wishes',
      description: 'Convert Tamil text wishes to speech',
      icon: Volume2,
      category: 'language-specific',
      keywords: ['tamil', 'text to speech', 'tts', 'audio'],
      url: '/regional-tools/tamil-text-to-speech'
    },

    // Regional Calendar Tools
    {
      id: 'festival-names-language',
      name: 'Festival Names in My Language Tool',
      description: 'Get festival names in any Indian language',
      icon: Languages,
      category: 'regional-calendar',
      keywords: ['names', 'language', 'multilingual', 'festival'],
      url: '/regional-tools/festival-names-language',
      popular: true
    },
    {
      id: 'city-holiday-list',
      name: 'City-wise Festival Holiday List',
      description: 'State and city-specific holiday calendar',
      icon: MapPin,
      category: 'regional-calendar',
      keywords: ['city', 'holiday', 'list', 'state'],
      url: '/regional-tools/city-holiday-list',
      trending: true
    },
    {
      id: 'local-calendar-embed',
      name: 'Local Festival Calendar Embed',
      description: 'Embeddable regional festival calendar',
      icon: Calendar,
      category: 'regional-calendar',
      keywords: ['calendar', 'embed', 'local', 'widget'],
      url: '/regional-tools/local-calendar-embed'
    },
    {
      id: 'festival-map-language',
      name: 'Custom Festival Map by Language',
      description: 'Interactive festival map in your language',
      icon: Map,
      category: 'regional-calendar',
      keywords: ['map', 'language', 'custom', 'festival'],
      url: '/regional-tools/festival-map-language'
    },
    {
      id: 'city-public-holiday',
      name: 'City-Wise Public Holiday Calendar',
      description: 'Complete public holiday list by city',
      icon: Calendar,
      category: 'regional-calendar',
      keywords: ['public holiday', 'city', 'calendar', 'list'],
      url: '/regional-tools/city-public-holiday'
    },
    {
      id: 'state-tourism-map',
      name: 'State-wise Tourism Festival Map',
      description: 'Tourism festivals mapped by state',
      icon: Map,
      category: 'regional-calendar',
      keywords: ['tourism', 'festival', 'state', 'map'],
      url: '/regional-tools/state-tourism-map'
    },
    {
      id: 'local-fair-map',
      name: 'Local Fair Map Explorer',
      description: 'Find local fairs and melas near you',
      icon: MapPin,
      category: 'regional-calendar',
      keywords: ['fair', 'mela', 'local', 'map'],
      url: '/regional-tools/local-fair-map'
    },
    {
      id: 'festival-near-me',
      name: 'Festival Near Me Tool',
      description: 'Discover festivals happening near your location',
      icon: Navigation,
      category: 'regional-calendar',
      keywords: ['near me', 'local', 'festival', 'location'],
      url: '/regional-tools/festival-near-me',
      trending: true
    },
    {
      id: 'local-event-finder',
      name: 'Local Event Finder',
      description: 'Find local festival events and celebrations',
      icon: MapPin,
      category: 'regional-calendar',
      keywords: ['local', 'event', 'finder', 'celebration'],
      url: '/regional-tools/local-event-finder'
    },
    {
      id: 'how-region-celebrates',
      name: 'How My Region Celebrates Blog Generator',
      description: 'Generate blog about regional celebrations',
      icon: FileText,
      category: 'regional-calendar',
      keywords: ['region', 'celebrates', 'blog', 'generator'],
      url: '/regional-tools/how-region-celebrates'
    },

    // Local Finder Tools
    {
      id: 'local-temple-finder',
      name: 'Local Temple Finder',
      description: 'Find temples near you with festival schedules',
      icon: Landmark,
      category: 'local-finder',
      keywords: ['temple', 'local', 'finder', 'nearby'],
      url: '/regional-tools/local-temple-finder',
      popular: true
    },
    {
      id: 'local-sweet-finder',
      name: 'Local Sweet Finder',
      description: 'Find local sweet shops for festival shopping',
      icon: MapPin,
      category: 'local-finder',
      keywords: ['sweet', 'local', 'shop', 'finder'],
      url: '/regional-tools/local-sweet-finder'
    },
    {
      id: 'local-business-offers',
      name: 'Local Business Offer Finder',
      description: 'Discover festival offers from local businesses',
      icon: ShoppingBag,
      category: 'local-finder',
      keywords: ['local', 'business', 'offers', 'deals'],
      url: '/regional-tools/local-business-offers'
    },
    {
      id: 'state-gift-finder',
      name: 'State-Specific Gift Finder',
      description: 'Find traditional gifts specific to your state',
      icon: Gift,
      category: 'local-finder',
      keywords: ['state', 'gift', 'traditional', 'regional'],
      url: '/regional-tools/state-gift-finder'
    },
    {
      id: 'local-puja-seller',
      name: 'Local Puja Item Seller Finder',
      description: 'Find nearby puja samagri sellers',
      icon: MapPin,
      category: 'local-finder',
      keywords: ['puja', 'seller', 'local', 'samagri'],
      url: '/regional-tools/local-puja-seller'
    },
    {
      id: 'local-shopping-deals',
      name: 'Local Shopping Deal Finder',
      description: 'Find best local festival shopping deals',
      icon: ShoppingBag,
      category: 'local-finder',
      keywords: ['shopping', 'deals', 'local', 'festival'],
      url: '/regional-tools/local-shopping-deals'
    },
    {
      id: 'local-transport-fare',
      name: 'Local Transport Fare Estimator',
      description: 'Estimate local transport costs for festivals',
      icon: Navigation,
      category: 'local-finder',
      keywords: ['transport', 'fare', 'local', 'cost'],
      url: '/regional-tools/local-transport-fare'
    },
    {
      id: 'state-gold-price',
      name: 'State-wise Gold Price Tracker',
      description: 'Track gold prices by state for Dhanteras',
      icon: TrendingDown,
      category: 'local-finder',
      keywords: ['gold', 'price', 'state', 'tracker'],
      url: '/regional-tools/state-gold-price',
      trending: true
    },
    {
      id: 'state-emi-offers',
      name: 'State-wise EMI Offers Finder',
      description: 'Find regional EMI offers for festival shopping',
      icon: DollarSign,
      category: 'local-finder',
      keywords: ['emi', 'offers', 'state', 'regional'],
      url: '/regional-tools/state-emi-offers'
    },
    {
      id: 'city-festival-expense',
      name: 'City-based Festival Expense Estimator',
      description: 'Estimate festival costs based on your city',
      icon: DollarSign,
      category: 'local-finder',
      keywords: ['city', 'expense', 'estimator', 'cost'],
      url: '/regional-tools/city-festival-expense'
    },
    {
      id: 'folk-dance-finder',
      name: 'Folk Dance Finder',
      description: 'Find regional folk dances for festivals',
      icon: Users,
      category: 'local-finder',
      keywords: ['folk dance', 'regional', 'traditional', 'finder'],
      url: '/regional-tools/folk-dance-finder'
    },
    {
      id: 'local-recipe-suggestion',
      name: 'Custom Local Recipe Suggestion',
      description: 'Get authentic local festival recipes',
      icon: Utensils,
      category: 'local-finder',
      keywords: ['recipe', 'local', 'food', 'traditional'],
      url: '/regional-tools/local-recipe-suggestion'
    },

    // Content Creation Tools
    {
      id: 'regional-hashtag',
      name: 'Regional Hashtag Generator',
      description: 'Generate trending regional language hashtags',
      icon: Hash,
      category: 'content-creator',
      keywords: ['hashtag', 'regional', 'trending', 'social'],
      url: '/regional-tools/regional-hashtag',
      popular: true
    },
    {
      id: 'language-poster',
      name: 'Language-based Poster Maker',
      description: 'Create posters in any Indian language',
      icon: Image,
      category: 'content-creator',
      keywords: ['poster', 'language', 'maker', 'multilingual'],
      url: '/regional-tools/language-poster',
      popular: true
    },
    {
      id: 'regional-greeting-video',
      name: 'Language-Specific Greeting Video Maker',
      description: 'Create video greetings in regional languages',
      icon: Video,
      category: 'content-creator',
      keywords: ['video', 'greeting', 'language', 'regional'],
      url: '/regional-tools/regional-greeting-video',
      trending: true
    },
    {
      id: 'diwali-20-languages',
      name: 'Say Happy Diwali in 20 Languages Tool',
      description: 'Learn Diwali greetings in 20 Indian languages',
      icon: Languages,
      category: 'content-creator',
      keywords: ['diwali', '20 languages', 'multilingual', 'greetings'],
      url: '/regional-tools/diwali-20-languages',
      popular: true,
      trending: true
    },
    {
      id: 'ai-voiceover-regional',
      name: 'AI Voice-over in Regional Language',
      description: 'AI-generated voice-overs in Indian languages',
      icon: Mic,
      category: 'content-creator',
      keywords: ['ai', 'voiceover', 'regional', 'language'],
      url: '/regional-tools/ai-voiceover-regional',
      trending: true
    },
    {
      id: 'local-ad-poster',
      name: 'Local Business Ad Poster Generator',
      description: 'Create local language business posters',
      icon: Image,
      category: 'content-creator',
      keywords: ['business', 'ad', 'poster', 'local'],
      url: '/regional-tools/local-ad-poster'
    },
    {
      id: 'local-event-poster',
      name: 'Local Event Poster Generator',
      description: 'Design posters for local festival events',
      icon: Image,
      category: 'content-creator',
      keywords: ['event', 'poster', 'local', 'generator'],
      url: '/regional-tools/local-event-poster'
    },
    {
      id: 'regional-quiz',
      name: 'Regional Festival Quiz Generator',
      description: 'Create quizzes about regional festivals',
      icon: Award,
      category: 'content-creator',
      keywords: ['quiz', 'regional', 'festival', 'generator'],
      url: '/regional-tools/regional-quiz'
    },
    {
      id: 'state-hashtag-trend',
      name: 'Festival Hashtag Trend by State',
      description: 'Trending festival hashtags by state',
      icon: TrendingUp,
      category: 'content-creator',
      keywords: ['hashtag', 'trend', 'state', 'regional'],
      url: '/regional-tools/state-hashtag-trend'
    },
    {
      id: 'celebrity-wishes-database',
      name: 'Regional Celebrity Festival Wishes Database',
      description: 'Collection of celebrity festival wishes',
      icon: Star,
      category: 'content-creator',
      keywords: ['celebrity', 'wishes', 'database', 'regional'],
      url: '/regional-tools/celebrity-wishes-database'
    },

    // Cultural Resources
    {
      id: 'regional-recipe',
      name: 'Regional Recipe Finder',
      description: 'Find authentic regional festival recipes',
      icon: Utensils,
      category: 'cultural',
      keywords: ['recipe', 'regional', 'food', 'festival'],
      url: '/regional-tools/regional-recipe',
      popular: true
    },
    {
      id: 'regional-folk-song',
      name: 'Regional Folk Song Finder',
      description: 'Discover traditional folk songs by region',
      icon: Music,
      category: 'cultural',
      keywords: ['folk song', 'regional', 'music', 'traditional'],
      url: '/regional-tools/regional-folk-song'
    },
    {
      id: 'regional-dress-visualizer',
      name: 'Regional Dress Visualizer',
      description: 'Visualize traditional dress by region',
      icon: Users,
      category: 'cultural',
      keywords: ['dress', 'visualizer', 'regional', 'traditional'],
      url: '/regional-tools/regional-dress-visualizer'
    },
    {
      id: 'regional-photo-gallery',
      name: 'Regional Festival Photo Gallery',
      description: 'Browse festival photos from different regions',
      icon: Camera,
      category: 'cultural',
      keywords: ['photo', 'gallery', 'regional', 'festival'],
      url: '/regional-tools/regional-photo-gallery'
    },
    {
      id: 'folk-art-color-scheme',
      name: 'Folk Art Color Scheme Generator',
      description: 'Generate color palettes from folk art styles',
      icon: Palette,
      category: 'cultural',
      keywords: ['folk art', 'color', 'palette', 'scheme'],
      url: '/regional-tools/folk-art-color-scheme'
    },
    {
      id: 'regional-playlist',
      name: 'Regional Playlist Generator',
      description: 'Create playlist of regional festival songs',
      icon: Music,
      category: 'cultural',
      keywords: ['playlist', 'regional', 'songs', 'music'],
      url: '/regional-tools/regional-playlist'
    },
    {
      id: 'regional-cuisine-pairing',
      name: 'Regional Cuisine Festival Pairing',
      description: 'Pair festivals with regional cuisines',
      icon: Utensils,
      category: 'cultural',
      keywords: ['cuisine', 'pairing', 'regional', 'food'],
      url: '/regional-tools/regional-cuisine-pairing'
    },
    {
      id: 'regional-astrology',
      name: 'Regional Astrology Compatibility Tool',
      description: 'Astrology tools based on regional traditions',
      icon: Star,
      category: 'cultural',
      keywords: ['astrology', 'regional', 'compatibility', 'horoscope'],
      url: '/regional-tools/regional-astrology'
    },

    // Translation Tools
    {
      id: 'festival-greetings-translator',
      name: 'Festival Greetings Translator',
      description: 'Translate greetings across Indian languages',
      icon: Languages,
      category: 'translator',
      keywords: ['translator', 'greetings', 'multilingual', 'festival'],
      url: '/regional-tools/festival-greetings-translator',
      popular: true,
      trending: true
    },
    {
      id: 'cultural-dialect-translator',
      name: 'Cultural Dialect Translator',
      description: 'Translate between regional dialects',
      icon: Globe,
      category: 'translator',
      keywords: ['dialect', 'translator', 'regional', 'language'],
      url: '/regional-tools/cultural-dialect-translator'
    },
    {
      id: 'audio-pronunciation',
      name: 'Indian Languages Audio Pronunciation Tool',
      description: 'Learn correct pronunciation of festival terms',
      icon: Volume2,
      category: 'translator',
      keywords: ['pronunciation', 'audio', 'language', 'learn'],
      url: '/regional-tools/audio-pronunciation'
    },
    {
      id: 'multi-language-greeting',
      name: 'Multi-language Greeting Translator',
      description: 'Translate one greeting to multiple languages',
      icon: Languages,
      category: 'translator',
      keywords: ['multilingual', 'translator', 'greeting', 'languages'],
      url: '/regional-tools/multi-language-greeting'
    },
    {
      id: 'region-horoscope',
      name: 'Region-specific Horoscope',
      description: 'Horoscope in your regional language',
      icon: Star,
      category: 'translator',
      keywords: ['horoscope', 'regional', 'language', 'astrology'],
      url: '/regional-tools/region-horoscope'
    }
  ];

  const filteredTools = useMemo(() => {
    let filtered = regionalTools;

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

  const popularTools = regionalTools.filter(tool => tool.popular);
  const trendingTools = regionalTools.filter(tool => tool.trending);

  return (
    <>
      <SEOHelmet
        title="Regional & Language Festival Tools 2025 | Telugu Dates, Tamil Calendar, Marathi Greetings, Onam Wishes Malayalam"
        description="60+ regional & multilingual festival tools: Telugu festival dates, Tamil calendar, Marathi greetings, Onam wishes in Malayalam, Hindi wishes, regional translators. Celebrate in your language!"
        keywords="telugu festival dates, tamil calendar, marathi greetings, onam wishes in malayalam, hindi festival wishes, bengali durga puja, gujarati navratri, punjabi gurpurab, kannada festival"
        url="/regional-tools"
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-teal-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-teal-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-teal-600 font-medium">Regional & Language</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-2 rounded-full mb-6">
                <Languages className="w-5 h-5" />
                <span className="font-semibold">60+ Regional & Language Tools</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Regional & Language Festival Tools
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                Celebrate festivals in your language! Telugu festival dates, Tamil calendar, Marathi greetings, Onam wishes in Malayalam, and 60+ tools for authentic regional celebrations across India!
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search... (e.g., Tamil calendar, Telugu dates, Marathi wishes)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all shadow-lg"
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
                  {['Telugu Dates', 'Tamil Calendar', 'Marathi Greetings', 'Malayalam Wishes'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1 bg-white hover:bg-teal-50 border border-teal-200 rounded-full text-sm text-teal-600 font-medium transition-colors"
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
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-teal-100 text-teal-600 rounded-lg"
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
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg scale-105'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-teal-300 hover:shadow-md'
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
                    <Star className="w-6 h-6 text-teal-600" />
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
                          className="block bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-teal-500 hover:border-teal-600 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <tool.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-1">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Trending Tools */}
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="w-6 h-6 text-cyan-600" />
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
                          className="block bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-cyan-500 hover:border-cyan-600 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <tool.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 group-hover:text-cyan-600 transition-colors mb-1">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
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
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
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
                      className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 hover:border-teal-300 h-full"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <tool.icon className="w-7 h-7 text-white" />
                          </div>
                          {tool.popular && (
                            <span className="px-2 py-1 bg-teal-100 text-teal-600 text-xs font-bold rounded-full">
                              Popular
                            </span>
                          )}
                          {tool.trending && (
                            <span className="px-2 py-1 bg-cyan-100 text-cyan-600 text-xs font-bold rounded-full flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                          {tool.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {tool.description}
                        </p>

                        <div className="flex items-center text-teal-600 font-semibold text-sm group-hover:gap-2 transition-all">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Regional & Multilingual Festival Tools</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Use Regional Language Tools?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    India's linguistic diversity makes regional tools essential for authentic celebrations:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      Find Telugu festival dates with panchangam
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      Access Tamil calendar for Pongal dates
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      Create Marathi greetings for Gudi Padwa
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      Send Onam wishes in authentic Malayalam
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      Translate festival greetings to any Indian language
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      Discover local festivals and traditions
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Top Regional Festival Queries</h3>
                  <div className="bg-teal-50 p-6 rounded-2xl">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center">
                        <Calendar className="w-5 h-5 text-teal-600 mr-2" />
                        <span className="font-semibold">Telugu festival dates 2025</span>
                      </li>
                      <li className="flex items-center">
                        <Book className="w-5 h-5 text-cyan-600 mr-2" />
                        <span className="font-semibold">Tamil calendar with festival dates</span>
                      </li>
                      <li className="flex items-center">
                        <MessageCircle className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-semibold">Marathi Diwali greetings messages</span>
                      </li>
                      <li className="flex items-center">
                        <Heart className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="font-semibold">Onam wishes in Malayalam language</span>
                      </li>
                      <li className="flex items-center">
                        <Globe className="w-5 h-5 text-orange-600 mr-2" />
                        <span className="font-semibold">Festival greetings in all Indian languages</span>
                      </li>
                      <li className="flex items-center">
                        <MapPin className="w-5 h-5 text-pink-600 mr-2" />
                        <span className="font-semibold">Local festivals near me</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Indian Languages & Regional Diversity</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-2xl">
                  <Languages className="w-10 h-10 text-teal-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">22 Official Languages</h4>
                  <p className="text-sm text-gray-700">India has 22 official languages and 19,500+ dialects. Our tools support major languages including Hindi, Tamil, Telugu, Marathi, Bengali, and more.</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-2xl">
                  <MapPin className="w-10 h-10 text-cyan-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">28 States, Unique Traditions</h4>
                  <p className="text-sm text-gray-700">Each state celebrates festivals differently. Same festival like Diwali has different names and rituals: Deepavali (Tamil Nadu), Kali Puja (Bengal).</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
                  <Globe className="w-10 h-10 text-blue-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Cultural Authenticity</h4>
                  <p className="text-sm text-gray-700">Celebrate in your mother tongue with authentic regional calendar systems like Tamil Panchangam, Telugu Panchang, and Malayalam Calendar.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Regional Festival Tool Categories</h3>
              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Language-Specific Tools (15 tools)</h4>
                  <p className="text-gray-700 text-sm">Hindi, Tamil, Telugu, Malayalam, Marathi, Bengali, Gujarati, Kannada, Punjabi, Assamese, Odia, Urdu, Sanskrit wishes, calendars, and generators.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Regional Calendars (10 tools)</h4>
                  <p className="text-gray-700 text-sm">Festival names translator, city holiday lists, calendar embeds, festival maps, public holiday calendars, and regional blog creators.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Local Finders (12 tools)</h4>
                  <p className="text-gray-700 text-sm">Temple finders, sweet shops, business offers, gift finders, puja sellers, shopping deals, gold prices, EMI offers, and expense estimators.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Content Creation (10 tools)</h4>
                  <p className="text-gray-700 text-sm">Regional hashtags, posters, videos, AI voice-overs, business ads, event posters, quizzes, celebrity wishes, and trend trackers.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Cultural Resources (8 tools)</h4>
                  <p className="text-gray-700 text-sm">Regional recipes, folk songs, dress visualizers, photo galleries, color schemes, playlists, cuisine pairings, and astrology tools.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Translation Tools (5 tools)</h4>
                  <p className="text-gray-700 text-sm">Greetings translator, dialect translator, pronunciation guides, multi-language tools, and regional horoscopes.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Popular Regional Festivals by State</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong className="text-gray-900">Tamil Nadu:</strong> Pongal, Tamil New Year, Thaipusam
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong className="text-gray-900">Kerala:</strong> Onam, Vishu, Thrissur Pooram
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong className="text-gray-900">West Bengal:</strong> Durga Puja, Kali Puja, Poila Boishakh
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong className="text-gray-900">Maharashtra:</strong> Gudi Padwa, Ganesh Chaturthi, Gokul Ashtami
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong className="text-gray-900">Gujarat:</strong> Navratri, Uttarayan, Gujarati New Year
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong className="text-gray-900">Punjab:</strong> Baisakhi, Lohri, Gurpurab
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong className="text-gray-900">Assam:</strong> Bihu (Rongali, Kati, Magh)
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong className="text-gray-900">Andhra Pradesh/Telangana:</strong> Ugadi, Sankranti, Bonalu
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">How to find Telugu festival dates 2025?</h4>
                  <p className="text-gray-700 text-sm">Use our Telugu Panchangam Tool which provides authentic festival dates based on Telugu calendar system. It includes Ugadi, Sankranti, and all major Telugu festivals with muhurat timings.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Where to get Tamil calendar with festival dates?</h4>
                  <p className="text-gray-700 text-sm">Our Tamil Festival Date Finder provides comprehensive Tamil calendar (Tamil Panchangam) with all festivals like Pongal, Tamil New Year, and regional celebrations with exact dates and timings.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">How to write Marathi festival greetings?</h4>
                  <p className="text-gray-700 text-sm">Use our Marathi Festival Greeting Card Maker which has pre-written authentic Marathi wishes. You can also use our Festival Greetings Translator to convert any greeting to Marathi.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Where to find Onam wishes in Malayalam?</h4>
                  <p className="text-gray-700 text-sm">Our Malayalam Calendar Sync Tool includes authentic Onam wishes in Malayalam language. We also have "Say Happy Diwali in 20 Languages" tool that covers Malayalam and other regional languages.</p>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Celebrate Festivals in Your Mother Tongue!</h3>
                <p className="mb-6 text-white/90">
                  Access 60+ regional and multilingual tools for authentic festival celebrations. From Telugu panchangam to Tamil calendar, Marathi wishes to Malayalam greetings - we have it all!
                </p>
                <Link
                  to="/festival-tools"
                  className="inline-flex items-center px-6 py-3 bg-white text-teal-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
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

export default RegionalLanguageTools;

