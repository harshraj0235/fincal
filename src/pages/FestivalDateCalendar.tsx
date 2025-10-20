import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, Search, Filter, Clock, Moon, Sun, Star, Sparkles,
  Bell, Gift, Flame, Heart, MapPin, Globe, TrendingUp, Zap,
  ArrowRight, ChevronRight, X, Home, CalendarDays, Timer,
  CalendarCheck, Sunrise, Sunset, CalendarClock, CalendarRange
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

interface FestivalTool {
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

const FestivalDateCalendar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Tools', icon: Calendar, count: 45 },
    { id: 'hindu', name: 'Hindu Festivals', icon: Flame, count: 15 },
    { id: 'islamic', name: 'Islamic Festivals', icon: Moon, count: 5 },
    { id: 'christian', name: 'Christian Festivals', icon: Star, count: 3 },
    { id: 'regional', name: 'Regional Festivals', icon: MapPin, count: 8 },
    { id: 'panchang', name: 'Panchang & Tithi', icon: Sun, count: 10 },
    { id: 'tools', name: 'Calendar Tools', icon: CalendarDays, count: 4 }
  ];

  const festivalTools: FestivalTool[] = [
    // Hindu Festivals - Popular
    {
      id: 'diwali-date-finder',
      name: 'Diwali Date Finder',
      description: 'Find Diwali dates for 2025, 2026 with Lakshmi Puja muhurat times',
      icon: Flame,
      category: 'hindu',
      keywords: ['diwali', '2025', '2026', 'lakshmi puja', 'deepavali'],
      url: '/festival-tools/diwali-date-finder',
      popular: true,
      trending: true
    },
    {
      id: 'holi-date-calculator',
      name: 'Holi Date Calculator',
      description: 'Calculate Holi, Dhulandi, and Holika Dahan dates with timings',
      icon: Heart,
      category: 'hindu',
      keywords: ['holi', '2025', '2026', 'dhulandi', 'holika dahan'],
      url: '/festival-tools/holi-date-calculator',
      popular: true,
      trending: true
    },
    {
      id: 'karwa-chauth-moonrise',
      name: 'Karwa Chauth Moonrise Time',
      description: 'Get exact moonrise time for Karwa Chauth fasting by city',
      icon: Moon,
      category: 'hindu',
      keywords: ['karwa chauth', 'moonrise', 'fasting', 'vrat'],
      url: '/festival-tools/karwa-chauth-moonrise',
      popular: true
    },
    {
      id: 'raksha-bandhan-muhurat',
      name: 'Raksha Bandhan Muhurat Finder',
      description: 'Find auspicious muhurat times for tying Rakhi',
      icon: Gift,
      category: 'hindu',
      keywords: ['raksha bandhan', 'muhurat', 'rakhi', 'bhadra'],
      url: '/festival-tools/raksha-bandhan-muhurat',
      popular: true
    },
    {
      id: 'navratri-dates',
      name: 'Navratri Start & End Date Finder',
      description: 'Get dates for Chaitra & Sharad Navratri with color calendar',
      icon: Star,
      category: 'hindu',
      keywords: ['navratri', 'durga puja', '9 colors', 'garba'],
      url: '/festival-tools/navratri-dates',
      popular: true
    },
    {
      id: 'ganesh-chaturthi-countdown',
      name: 'Ganesh Chaturthi Countdown',
      description: 'Countdown to Ganpati festival with installation timing',
      icon: Sparkles,
      category: 'hindu',
      keywords: ['ganesh chaturthi', 'ganpati', 'vinayaka'],
      url: '/festival-tools/ganesh-chaturthi-countdown'
    },
    {
      id: 'janmashtami-fasting',
      name: 'Janmashtami Fasting Time Calculator',
      description: 'Calculate fasting duration and midnight birth time',
      icon: Clock,
      category: 'hindu',
      keywords: ['janmashtami', 'krishna', 'fasting', 'midnight'],
      url: '/festival-tools/janmashtami-fasting'
    },
    {
      id: 'maha-shivratri-duration',
      name: 'Maha Shivratri Night Duration',
      description: 'Calculate four prahars of night for Shiva puja',
      icon: Moon,
      category: 'hindu',
      keywords: ['shivratri', 'prahar', 'night vigil', 'shiva'],
      url: '/festival-tools/maha-shivratri-duration'
    },
    {
      id: 'guru-purnima-calendar',
      name: 'Guru Purnima Calendar Tool',
      description: 'Find Guru Purnima date with purnima tithi timings',
      icon: Sun,
      category: 'hindu',
      keywords: ['guru purnima', 'ashada purnima', 'guru'],
      url: '/festival-tools/guru-purnima-calendar'
    },
    {
      id: 'akshaya-tritiya-muhurat',
      name: 'Akshaya Tritiya Shubh Muhurat',
      description: 'Get auspicious timings for gold buying and investments',
      icon: Zap,
      category: 'hindu',
      keywords: ['akshaya tritiya', 'gold buying', 'akha teej'],
      url: '/festival-tools/akshaya-tritiya-muhurat'
    },
    {
      id: 'dussehra-dates',
      name: 'Dussehra Date & Puja Timing',
      description: 'Find Vijayadashami dates with Ravan Dahan muhurat',
      icon: Flame,
      category: 'hindu',
      keywords: ['dussehra', 'vijayadashami', 'ravan dahan'],
      url: '/festival-tools/dussehra-dates'
    },
    {
      id: 'chhath-puja-arghya',
      name: 'Chhath Puja Arghya Time',
      description: 'Get sunrise/sunset times for Arghya to Sun God',
      icon: Sun,
      category: 'hindu',
      keywords: ['chhath puja', 'arghya', 'sunrise', 'sunset'],
      url: '/festival-tools/chhath-puja-arghya'
    },
    {
      id: 'buddha-purnima-converter',
      name: 'Buddha Purnima Date Converter',
      description: 'Convert Buddha Purnima dates across calendars',
      icon: Star,
      category: 'hindu',
      keywords: ['buddha purnima', 'vesak', 'buddha jayanti'],
      url: '/festival-tools/buddha-purnima-converter'
    },

    // Islamic Festivals
    {
      id: 'eid-date-converter',
      name: 'Eid Date Converter',
      description: 'Convert Hijri to Gregorian calendar for Eid dates',
      icon: Moon,
      category: 'islamic',
      keywords: ['eid', 'hijri', 'islamic calendar', 'ramadan'],
      url: '/festival-tools/eid-date-converter',
      popular: true
    },
    {
      id: 'ramadan-timetable',
      name: 'Ramadan Sehri/Iftar Timetable',
      description: 'Get daily Sehri and Iftar times for your city',
      icon: Clock,
      category: 'islamic',
      keywords: ['ramadan', 'sehri', 'iftar', 'fasting'],
      url: '/festival-tools/ramadan-timetable',
      popular: true
    },
    {
      id: 'islamic-calendar-sync',
      name: 'Islamic Calendar Sync Tool',
      description: 'Sync Islamic dates with Gregorian calendar',
      icon: CalendarDays,
      category: 'islamic',
      keywords: ['hijri', 'islamic calendar', 'muharram'],
      url: '/festival-tools/islamic-calendar-sync'
    },

    // Christian Festivals
    {
      id: 'christmas-countdown',
      name: 'Christmas Countdown Timer',
      description: 'Countdown to Christmas Day with animated timer',
      icon: Gift,
      category: 'christian',
      keywords: ['christmas', '2025', 'countdown', 'xmas'],
      url: '/festival-tools/christmas-countdown',
      popular: true
    },
    {
      id: 'easter-date-tool',
      name: 'Good Friday & Easter Date Tool',
      description: 'Calculate Easter Sunday and Good Friday dates',
      icon: Star,
      category: 'christian',
      keywords: ['easter', 'good friday', 'lent', 'resurrection'],
      url: '/festival-tools/easter-date-tool'
    },

    // Regional Festivals
    {
      id: 'makar-sankranti-tithi',
      name: 'Makar Sankranti Tithi Converter',
      description: 'Find Sankranti time and punya kaal muhurat',
      icon: Sun,
      category: 'regional',
      keywords: ['sankranti', 'pongal', 'lohri', 'uttarayan'],
      url: '/festival-tools/makar-sankranti-tithi',
      popular: true
    },
    {
      id: 'pongal-calendar',
      name: 'Pongal Calendar with Tamil Panchangam',
      description: 'Get 4-day Pongal dates with Tamil calendar details',
      icon: Flame,
      category: 'regional',
      keywords: ['pongal', 'tamil', 'panchangam', 'makara sankranti'],
      url: '/festival-tools/pongal-calendar',
      popular: true
    },
    {
      id: 'onam-date-reminder',
      name: 'Onam Date Reminder',
      description: 'Get Thiruvonam dates and 10-day celebration calendar',
      icon: Heart,
      category: 'regional',
      keywords: ['onam', 'thiruvonam', 'kerala', 'chingam'],
      url: '/festival-tools/onam-date-reminder'
    },
    {
      id: 'lohri-sunrise-sunset',
      name: 'Lohri Sunrise & Sunset Calculator',
      description: 'Calculate sunrise/sunset for bonfire timing',
      icon: Sunrise,
      category: 'regional',
      keywords: ['lohri', 'punjab', 'bonfire', 'harvest'],
      url: '/festival-tools/lohri-sunrise-sunset'
    },
    {
      id: 'bihu-date-calendar',
      name: 'Bihu Date Calendar',
      description: 'Find dates for Bohag, Kati, and Magh Bihu',
      icon: CalendarDays,
      category: 'regional',
      keywords: ['bihu', 'assam', 'rongali', 'harvest'],
      url: '/festival-tools/bihu-date-calendar'
    },
    {
      id: 'parsi-new-year',
      name: 'Parsi New Year Calendar',
      description: 'Navroz date finder with Zoroastrian calendar',
      icon: Star,
      category: 'regional',
      keywords: ['navroz', 'parsi', 'zoroastrian', 'new year'],
      url: '/festival-tools/parsi-new-year'
    },

    // Panchang & Tithi Tools
    {
      id: 'panchang-today',
      name: 'Panchang Today Widget',
      description: 'Daily panchang with tithi, nakshatra, yoga, karana',
      icon: Sun,
      category: 'panchang',
      keywords: ['panchang', 'tithi', 'nakshatra', 'today'],
      url: '/festival-tools/panchang-today',
      trending: true
    },
    {
      id: 'weekly-tithi-finder',
      name: 'Weekly Hindu Tithi Finder',
      description: 'Get week-long tithi calendar with timings',
      icon: CalendarRange,
      category: 'panchang',
      keywords: ['tithi', 'panchang', 'weekly', 'calendar'],
      url: '/festival-tools/weekly-tithi-finder'
    },
    {
      id: 'moon-phase-festivals',
      name: 'Moon Phase for Festivals',
      description: 'Track lunar phases for festival celebrations',
      icon: Moon,
      category: 'panchang',
      keywords: ['moon phase', 'lunar', 'purnima', 'amavasya'],
      url: '/festival-tools/moon-phase-festivals'
    },
    {
      id: 'purnima-amavasya-dates',
      name: 'Purnima & Amavasya Dates',
      description: 'Complete list of full moon and new moon dates',
      icon: Moon,
      category: 'panchang',
      keywords: ['purnima', 'amavasya', 'full moon', 'new moon'],
      url: '/festival-tools/purnima-amavasya-dates'
    },
    {
      id: 'hindu-panchang-year',
      name: 'Hindu Panchang Year Generator',
      description: 'Generate complete yearly panchang with all festivals',
      icon: CalendarDays,
      category: 'panchang',
      keywords: ['panchang', 'yearly', 'hindu calendar', 'vikram samvat'],
      url: '/festival-tools/hindu-panchang-year'
    },
    {
      id: 'vrat-upavas-calendar',
      name: 'Vrat Upavas Calendar',
      description: 'All Hindu fasting dates and vrat rules',
      icon: Clock,
      category: 'panchang',
      keywords: ['vrat', 'upavas', 'fasting', 'ekadashi'],
      url: '/festival-tools/vrat-upavas-calendar'
    },
    {
      id: 'nakshatra-festival',
      name: 'Nakshatra on Festival Tool',
      description: 'Find birth star for any festival date',
      icon: Star,
      category: 'panchang',
      keywords: ['nakshatra', 'birth star', 'constellation'],
      url: '/festival-tools/nakshatra-festival'
    },
    {
      id: 'shubh-muhurat-reminder',
      name: 'Shubh Muhurat Reminder Bot',
      description: 'Get alerts for auspicious timings',
      icon: Bell,
      category: 'panchang',
      keywords: ['muhurat', 'auspicious', 'reminder', 'alert'],
      url: '/festival-tools/shubh-muhurat-reminder'
    },
    {
      id: 'auspicious-marriage-days',
      name: 'Auspicious Days for Marriage',
      description: 'Find best dates for wedding ceremonies',
      icon: Heart,
      category: 'panchang',
      keywords: ['marriage', 'wedding', 'vivah', 'muhurat'],
      url: '/festival-tools/auspicious-marriage-days'
    },
    {
      id: 'lunar-eclipse-predictor',
      name: 'Lunar Eclipse Festival Predictor',
      description: 'Check eclipse impact on festival dates',
      icon: Moon,
      category: 'panchang',
      keywords: ['eclipse', 'grahan', 'lunar', 'sutak'],
      url: '/festival-tools/lunar-eclipse-predictor'
    },

    // Calendar Tools
    {
      id: 'solar-lunar-converter',
      name: 'Solar/Lunar Calendar Converter',
      description: 'Convert between solar and lunar calendar systems',
      icon: Sun,
      category: 'tools',
      keywords: ['converter', 'solar', 'lunar', 'calendar'],
      url: '/festival-tools/solar-lunar-converter'
    },
    {
      id: 'festival-countdown-clock',
      name: 'Festival Countdown Clock',
      description: 'Live countdown to any Indian festival',
      icon: Timer,
      category: 'tools',
      keywords: ['countdown', 'timer', 'clock', 'festival'],
      url: '/festival-tools/festival-countdown-clock'
    },
    {
      id: 'custom-festival-reminder',
      name: 'Custom Festival Reminder Generator',
      description: 'Create personalized festival alerts and reminders',
      icon: Bell,
      category: 'tools',
      keywords: ['reminder', 'alert', 'notification', 'custom'],
      url: '/festival-tools/custom-festival-reminder'
    },
    {
      id: 'indian-holiday-calendar-sync',
      name: 'Indian Holiday Calendar Sync',
      description: 'Sync festivals to Google/Outlook calendar',
      icon: CalendarCheck,
      category: 'tools',
      keywords: ['sync', 'google calendar', 'outlook', 'export'],
      url: '/festival-tools/indian-holiday-calendar-sync'
    },
    {
      id: 'public-holiday-finder',
      name: 'Public Holiday Region-wise Finder',
      description: 'Find state-wise public holidays and bank holidays',
      icon: MapPin,
      category: 'tools',
      keywords: ['public holiday', 'bank holiday', 'state', 'regional'],
      url: '/festival-tools/public-holiday-finder'
    },
    {
      id: 'festival-clash-checker',
      name: 'Festival Clash Checker',
      description: 'Check multiple festival dates for planning',
      icon: CalendarClock,
      category: 'tools',
      keywords: ['clash', 'multiple', 'planning', 'dates'],
      url: '/festival-tools/festival-clash-checker'
    },
    {
      id: 'indian-season-calendar',
      name: 'Indian Season Calendar Tool',
      description: 'Ritu chakra with seasonal festivals',
      icon: Globe,
      category: 'tools',
      keywords: ['season', 'ritu', 'vasant', 'sharad'],
      url: '/festival-tools/indian-season-calendar'
    },
    {
      id: 'festival-monthly-list',
      name: 'Festival Monthly List Generator',
      description: 'Get month-wise festival calendar',
      icon: CalendarRange,
      category: 'tools',
      keywords: ['monthly', 'list', 'calendar', 'festivals'],
      url: '/festival-tools/festival-monthly-list'
    },
    {
      id: 'city-festival-widget',
      name: 'City-wise Festival Calendar Widget',
      description: 'Embed festival calendar for your city',
      icon: MapPin,
      category: 'tools',
      keywords: ['city', 'widget', 'embed', 'local'],
      url: '/festival-tools/city-festival-widget'
    }
  ];

  const filteredTools = useMemo(() => {
    let filtered = festivalTools;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory, festivalTools]);

  const popularTools = festivalTools.filter(tool => tool.popular);
  const trendingTools = festivalTools.filter(tool => tool.trending);

  return (
    <>
      <SEOHelmet
        title="Festival Date & Calendar Tools 2025-2026 | Indian Festival Dates Calculator"
        description="Find dates for Diwali 2025, Holi 2026, Karwa Chauth moonrise time, Eid dates, Christmas countdown, and 45+ Indian festival calendar tools. Get muhurat, tithi, and panchang information."
        keywords="festival dates 2025, diwali date 2025, holi date 2026, karwa chauth moonrise time, eid date converter, indian festival calendar, hindu panchang, muhurat finder, festival countdown, tithi calculator"
        url="/festival-tools/date-calendar"
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-orange-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-orange-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-orange-600 font-medium">Festival Date & Calendar</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-pink-500/10"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-pink-600 text-white px-6 py-2 rounded-full mb-6">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">45+ Festival Calendar Tools</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Festival Date & Calendar Tools
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                Find exact dates for all Indian festivals including Diwali 2025, Holi 2026, Karwa Chauth moonrise time, Eid dates, and more. Get muhurat timings, panchang, and tithi information instantly.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search festivals... (e.g., Diwali 2025, Holi, Karwa Chauth)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all shadow-lg"
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
                  {['Diwali 2025', 'Holi 2026', 'Karwa Chauth', 'Eid Dates'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1 bg-white hover:bg-orange-50 border border-orange-200 rounded-full text-sm text-orange-600 font-medium transition-colors"
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
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-lg"
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
                      ? 'bg-gradient-to-r from-orange-600 to-pink-600 text-white shadow-lg scale-105'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-300 hover:shadow-md'
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
                    <Star className="w-6 h-6 text-orange-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Most Popular</h2>
                  </div>
                  <div className="space-y-4">
                    {popularTools.slice(0, 5).map((tool, index) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, x: -20 }}
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

                {/* Trending Tools */}
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="w-6 h-6 text-pink-600" />
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
                          className="block bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-pink-500 hover:border-pink-600 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <tool.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 group-hover:text-pink-600 transition-colors mb-1">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
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
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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
                      className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 hover:border-orange-300 h-full"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <tool.icon className="w-7 h-7 text-white" />
                          </div>
                          {tool.popular && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full">
                              Popular
                            </span>
                          )}
                          {tool.trending && (
                            <span className="px-2 py-1 bg-pink-100 text-pink-600 text-xs font-bold rounded-full flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                          {tool.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {tool.description}
                        </p>

                        <div className="flex items-center text-orange-600 font-semibold text-sm group-hover:gap-2 transition-all">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Indian Festival Dates & Calendar Tools</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Use Festival Calendar Tools?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Indian festivals follow the lunar calendar (Panchang), making it challenging to predict exact dates years in advance. Our festival calendar tools help you:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      Find exact festival dates for 2025, 2026, and beyond
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      Get muhurat timings for rituals and ceremonies
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      Calculate moonrise/sunset times for fasting
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      Access tithi, nakshatra, and yoga information
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      Plan celebrations and book tickets in advance
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Most Searched Festival Dates</h3>
                  <div className="bg-orange-50 p-6 rounded-2xl">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center justify-between">
                        <span className="font-semibold">Diwali 2025</span>
                        <span className="text-orange-600">October 20, 2025</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="font-semibold">Holi 2026</span>
                        <span className="text-orange-600">March 3, 2026</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="font-semibold">Karwa Chauth 2025</span>
                        <span className="text-orange-600">October 1, 2025</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="font-semibold">Eid-ul-Fitr 2025</span>
                        <span className="text-orange-600">March 30, 2025</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="font-semibold">Raksha Bandhan 2025</span>
                        <span className="text-orange-600">August 9, 2025</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="font-semibold">Navratri 2025</span>
                        <span className="text-orange-600">September 22, 2025</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Hindu Panchang & Tithi</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                The Hindu Panchang is a traditional Hindu calendar system that combines solar and lunar calculations. It consists of five elements (Panch Ang): Tithi (lunar day), Vara (weekday), Nakshatra (constellation), Yoga (auspicious period), and Karana (half of tithi). Festival dates are determined by tithi rather than Gregorian calendar dates, which is why they change every year.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Popular Festival Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-orange-50 to-pink-50 p-6 rounded-2xl">
                  <Flame className="w-10 h-10 text-orange-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Hindu Festivals</h4>
                  <p className="text-sm text-gray-700">Diwali, Holi, Navratri, Dussehra, Janmashtami, Ganesh Chaturthi, and more with muhurat timings.</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
                  <Moon className="w-10 h-10 text-blue-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Islamic Festivals</h4>
                  <p className="text-sm text-gray-700">Eid-ul-Fitr, Eid-ul-Adha, Ramadan, Muharram with Hijri calendar conversion tools.</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-2xl">
                  <MapPin className="w-10 h-10 text-green-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Regional Festivals</h4>
                  <p className="text-sm text-gray-700">Pongal, Onam, Bihu, Lohri, Baisakhi with local timing and traditions.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Use Our Festival Date Tools</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                <li><strong>Search or Browse:</strong> Use the search bar to find specific festivals or browse by category.</li>
                <li><strong>Select Your Tool:</strong> Click on any festival tool to access detailed date information.</li>
                <li><strong>Enter Your Location:</strong> For accurate moonrise/sunrise times, enter your city.</li>
                <li><strong>Get Personalized Results:</strong> View dates, timings, muhurat, and panchang details specific to your region.</li>
                <li><strong>Set Reminders:</strong> Use our reminder tools to get notified before important festivals.</li>
                <li><strong>Export to Calendar:</strong> Sync festival dates to your Google or Outlook calendar.</li>
              </ol>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Why do festival dates change every year?</h4>
                  <p className="text-gray-700 text-sm">Most Indian festivals are based on the lunar calendar (Panchang), which doesn't align with the Gregorian solar calendar. The moon's position determines tithi, which in turn determines the festival date.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">What is muhurat and why is it important?</h4>
                  <p className="text-gray-700 text-sm">Muhurat is an auspicious time period for performing rituals. It's calculated based on planetary positions, nakshatra, and tithi. Performing ceremonies during shubh muhurat is believed to bring positive results.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">How accurate are the festival dates provided?</h4>
                  <p className="text-gray-700 text-sm">Our tools use authentic Panchang calculations and astronomical data to provide highly accurate festival dates and timings. However, local variations may exist based on regional traditions.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Can I get reminders for upcoming festivals?</h4>
                  <p className="text-gray-700 text-sm">Yes! Use our Custom Festival Reminder Generator to set personalized alerts. You can also sync our calendar to Google Calendar or Outlook for automatic reminders.</p>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-orange-600 to-pink-600 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Start Planning Your Festivals Today!</h3>
                <p className="mb-6 text-white/90">
                  Never miss an important festival or auspicious time. Use our 45+ tools to plan celebrations, book tickets, and stay connected with your traditions.
                </p>
                <Link
                  to="/festival-tools"
                  className="inline-flex items-center px-6 py-3 bg-white text-orange-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
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

export default FestivalDateCalendar;

