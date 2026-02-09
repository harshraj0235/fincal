import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Search, Filter, Book, History, Globe, Map, Music,
  Home, ChevronRight, X, Star, TrendingUp, Sparkles, Award,
  Library, GraduationCap, Heart, Users, MapPin, Calendar, FileText,
  Image, Video, Mic, ArrowRight, Lightbulb, Landmark, Languages,
  Scroll, Clock, Target, Compass, Flame, Gift, Camera, Film
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

interface InfoTool {
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

const FestivalInformationHistory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Tools', icon: BookOpen, count: 55 },
    { id: 'history', name: 'History & Origins', icon: History, count: 12 },
    { id: 'cultural', name: 'Cultural Insights', icon: Globe, count: 10 },
    { id: 'regional', name: 'Regional Traditions', icon: MapPin, count: 10 },
    { id: 'learning', name: 'Learning & Quiz', icon: GraduationCap, count: 8 },
    { id: 'multimedia', name: 'Audio & Video', icon: Video, count: 8 },
    { id: 'reference', name: 'Reference Library', icon: Library, count: 7 }
  ];

  const infoTools: InfoTool[] = [
    // History & Origins
    {
      id: 'why-we-celebrate',
      name: 'Why We Celebrate AI Explainer Tool',
      description: 'AI explains the origin and significance of any festival',
      icon: Lightbulb,
      category: 'history',
      keywords: ['why diwali', 'origin', 'significance', 'celebrated'],
      url: '/festival-info/why-we-celebrate',
      popular: true,
      trending: true
    },
    {
      id: 'festival-origin-timeline',
      name: 'Festival Origin Timeline Generator',
      description: 'Visual timeline showing festival evolution through ages',
      icon: History,
      category: 'history',
      keywords: ['timeline', 'origin', 'history', 'evolution'],
      url: '/festival-info/festival-origin-timeline',
      popular: true
    },
    {
      id: 'mythology-modern-compare',
      name: 'Mythology to Modern Celebration Compare Tool',
      description: 'Compare ancient mythology with modern celebrations',
      icon: Book,
      category: 'history',
      keywords: ['mythology', 'modern', 'compare', 'ancient'],
      url: '/festival-info/mythology-modern-compare',
      popular: true
    },
    {
      id: 'festival-history-encyclopedia',
      name: 'Indian Festival History Encyclopedia',
      description: 'Comprehensive encyclopedia of all Indian festivals',
      icon: Library,
      category: 'history',
      keywords: ['encyclopedia', 'history', 'comprehensive', 'all festivals'],
      url: '/festival-info/festival-history-encyclopedia',
      popular: true,
      trending: true
    },
    {
      id: 'festival-through-centuries',
      name: 'Festival Through Centuries Timeline',
      description: 'How festivals evolved from ancient to modern times',
      icon: Clock,
      category: 'history',
      keywords: ['centuries', 'timeline', 'evolution', 'ancient'],
      url: '/festival-info/festival-through-centuries'
    },
    {
      id: 'ancient-calendar-converter',
      name: 'Ancient Calendar Converter',
      description: 'Convert between ancient Indian calendar systems',
      icon: Calendar,
      category: 'history',
      keywords: ['ancient', 'calendar', 'converter', 'vikram samvat'],
      url: '/festival-info/ancient-calendar-converter'
    },
    {
      id: 'dhanteras-investment-history',
      name: 'History of Dhanteras Investment Patterns',
      description: 'Historical data on Dhanteras gold/silver buying trends',
      icon: TrendingUp,
      category: 'history',
      keywords: ['dhanteras', 'investment', 'history', 'gold'],
      url: '/festival-info/dhanteras-investment-history'
    },
    {
      id: 'ancient-timekeeping',
      name: 'Ancient Indian Timekeeping Tool',
      description: 'Learn ancient Indian time measurement systems',
      icon: Clock,
      category: 'history',
      keywords: ['ancient', 'timekeeping', 'measurement', 'indian'],
      url: '/festival-info/ancient-timekeeping'
    },
    {
      id: 'calendar-changes-timeline',
      name: 'Timeline of Indian Calendar Changes',
      description: 'Historical changes in Indian calendar systems',
      icon: History,
      category: 'history',
      keywords: ['calendar', 'changes', 'timeline', 'history'],
      url: '/festival-info/calendar-changes-timeline'
    },
    {
      id: 'old-festival-photos',
      name: 'Old Photos of Festivals Gallery',
      description: 'Historical photo gallery of vintage festival celebrations',
      icon: Camera,
      category: 'history',
      keywords: ['old photos', 'vintage', 'gallery', 'historical'],
      url: '/festival-info/old-festival-photos'
    },
    {
      id: 'old-vs-new-expense',
      name: 'Old vs New Celebration Expense Analyzer',
      description: 'Compare festival expenses across decades',
      icon: TrendingUp,
      category: 'history',
      keywords: ['old', 'new', 'expense', 'compare'],
      url: '/festival-info/old-vs-new-expense'
    },
    {
      id: 'past-future-predictor',
      name: 'Past vs Future Festival Predictor',
      description: 'Predict how festivals will be celebrated in future',
      icon: Sparkles,
      category: 'history',
      keywords: ['future', 'predictor', 'trends', 'evolution'],
      url: '/festival-info/past-future-predictor'
    },

    // Cultural Insights
    {
      id: 'state-festival-finder',
      name: 'Indian States Festival Finder',
      description: 'Find unique festivals celebrated in each state',
      icon: MapPin,
      category: 'cultural',
      keywords: ['states', 'regional', 'finder', 'unique'],
      url: '/festival-info/state-festival-finder',
      popular: true
    },
    {
      id: 'regional-festival-info',
      name: 'Regional Festival Information Tool',
      description: 'Detailed information about regional festivals',
      icon: Globe,
      category: 'cultural',
      keywords: ['regional', 'information', 'local', 'state'],
      url: '/festival-info/regional-festival-info'
    },
    {
      id: 'festival-by-religion',
      name: 'Festival Significance by Religion',
      description: 'Understand festivals across different religions',
      icon: Heart,
      category: 'cultural',
      keywords: ['religion', 'significance', 'hindu', 'muslim', 'christian'],
      url: '/festival-info/festival-by-religion'
    },
    {
      id: 'how-state-celebrates',
      name: 'How Each State Celebrates Explorer',
      description: 'Explore state-wise celebration differences',
      icon: Map,
      category: 'cultural',
      keywords: ['state', 'celebrates', 'regional', 'differences'],
      url: '/festival-info/how-state-celebrates',
      trending: true
    },
    {
      id: 'folk-dance-finder',
      name: 'Folk Dance Finder by Festival',
      description: 'Discover traditional dances for each festival',
      icon: Users,
      category: 'cultural',
      keywords: ['folk dance', 'traditional', 'garba', 'bhangra'],
      url: '/festival-info/folk-dance-finder'
    },
    {
      id: 'traditional-food-recipes',
      name: 'Traditional Food Recipe Finder',
      description: 'Find authentic festival recipes by region',
      icon: Gift,
      category: 'cultural',
      keywords: ['food', 'recipe', 'traditional', 'authentic'],
      url: '/festival-info/traditional-food-recipes',
      popular: true
    },
    {
      id: 'festival-symbol-meaning',
      name: 'Festival Symbol Meaning Tool',
      description: 'Understand the meaning behind festival symbols',
      icon: Star,
      category: 'cultural',
      keywords: ['symbol', 'meaning', 'significance', 'festival'],
      url: '/festival-info/festival-symbol-meaning'
    },
    {
      id: 'regional-dress-finder',
      name: 'Regional Dress Finder',
      description: 'Find traditional dress for each festival by region',
      icon: Users,
      category: 'cultural',
      keywords: ['dress', 'traditional', 'regional', 'outfit'],
      url: '/festival-info/regional-dress-finder'
    },
    {
      id: 'cultural-impact-analyzer',
      name: 'Cultural Impact Analyzer',
      description: 'Analyze cultural impact of festivals on society',
      icon: TrendingUp,
      category: 'cultural',
      keywords: ['cultural', 'impact', 'society', 'analysis'],
      url: '/festival-info/cultural-impact-analyzer'
    },
    {
      id: 'folk-art-finder',
      name: 'Folk Art Finder (Warli, Madhubani)',
      description: 'Discover folk art forms associated with festivals',
      icon: Image,
      category: 'cultural',
      keywords: ['folk art', 'warli', 'madhubani', 'traditional'],
      url: '/festival-info/folk-art-finder'
    },

    // Regional Traditions
    {
      id: 'festival-comparison',
      name: 'Festival Comparison Tool (Holi vs Bihu)',
      description: 'Compare similarities and differences between festivals',
      icon: Target,
      category: 'regional',
      keywords: ['compare', 'holi', 'bihu', 'similarities'],
      url: '/festival-info/festival-comparison'
    },
    {
      id: 'celebrated-abroad',
      name: 'How It\'s Celebrated Abroad Tool',
      description: 'See how Indian festivals are celebrated worldwide',
      icon: Globe,
      category: 'regional',
      keywords: ['abroad', 'global', 'international', 'world'],
      url: '/festival-info/celebrated-abroad'
    },
    {
      id: 'ritual-customs-library',
      name: 'Rituals & Customs Library',
      description: 'Comprehensive library of festival rituals',
      icon: Library,
      category: 'regional',
      keywords: ['rituals', 'customs', 'library', 'traditions'],
      url: '/festival-info/ritual-customs-library',
      popular: true
    },
    {
      id: 'ancient-ritual-decoder',
      name: 'Ancient Festival Ritual Decoder',
      description: 'Decode and understand ancient festival rituals',
      icon: Scroll,
      category: 'regional',
      keywords: ['ancient', 'ritual', 'decode', 'meaning'],
      url: '/festival-info/ancient-ritual-decoder'
    },
    {
      id: 'god-goddess-association',
      name: 'God-Goddess Association Tool',
      description: 'Find which deity is associated with each festival',
      icon: Flame,
      category: 'regional',
      keywords: ['god', 'goddess', 'deity', 'association'],
      url: '/festival-info/god-goddess-association'
    },
    {
      id: 'temple-festival-map',
      name: 'Temple Connected to Festival Map',
      description: 'Map of famous temples for specific festivals',
      icon: Landmark,
      category: 'regional',
      keywords: ['temple', 'map', 'festival', 'famous'],
      url: '/festival-info/temple-festival-map'
    },
    {
      id: 'festival-by-month-map',
      name: 'Indian Festivals by Month Map Visualizer',
      description: 'Interactive map showing festivals month-wise',
      icon: Map,
      category: 'regional',
      keywords: ['month', 'map', 'visualizer', 'calendar'],
      url: '/festival-info/festival-by-month-map',
      trending: true
    },
    {
      id: 'interactive-india-map',
      name: 'Interactive India Festival Map',
      description: 'Click on any state to see its festivals',
      icon: Map,
      category: 'regional',
      keywords: ['interactive', 'india', 'map', 'state'],
      url: '/festival-info/interactive-india-map',
      popular: true
    },
    {
      id: 'seasonal-festivals-calendar',
      name: 'Indian Seasonal Festivals Visual Calendar',
      description: 'Visual calendar showing festivals by season',
      icon: Calendar,
      category: 'regional',
      keywords: ['seasonal', 'calendar', 'visual', 'ritu'],
      url: '/festival-info/seasonal-festivals-calendar'
    },
    {
      id: 'festival-of-my-region',
      name: 'Festival of My Region Blog Creator',
      description: 'Create blog posts about your regional festivals',
      icon: FileText,
      category: 'regional',
      keywords: ['region', 'blog', 'creator', 'local'],
      url: '/festival-info/festival-of-my-region'
    },

    // Learning & Quiz
    {
      id: 'festival-history-quiz',
      name: 'Festival History Quiz Generator',
      description: 'Educational quiz on festival history and origins',
      icon: GraduationCap,
      category: 'learning',
      keywords: ['quiz', 'history', 'education', 'learning'],
      url: '/festival-info/festival-history-quiz',
      popular: true
    },
    {
      id: 'identify-festival-clue',
      name: 'Quiz: Identify the Festival by Clue',
      description: 'Guess the festival from cultural clues',
      icon: Target,
      category: 'learning',
      keywords: ['identify', 'quiz', 'clue', 'guess'],
      url: '/festival-info/identify-festival-clue'
    },
    {
      id: 'cultural-heritage-quiz',
      name: 'Cultural Heritage Quiz',
      description: 'Test your knowledge of Indian cultural heritage',
      icon: Award,
      category: 'learning',
      keywords: ['cultural', 'heritage', 'quiz', 'knowledge'],
      url: '/festival-info/cultural-heritage-quiz'
    },
    {
      id: 'folklore-quiz',
      name: 'Folklore-based Quiz Tool',
      description: 'Quiz on Indian folklore and festival stories',
      icon: Book,
      category: 'learning',
      keywords: ['folklore', 'quiz', 'stories', 'legends'],
      url: '/festival-info/folklore-quiz'
    },
    {
      id: 'ritual-meaning-interpreter',
      name: 'Ritual Meaning AI Interpreter',
      description: 'AI explains the meaning behind rituals',
      icon: Sparkles,
      category: 'learning',
      keywords: ['ritual', 'meaning', 'ai', 'interpreter'],
      url: '/festival-info/ritual-meaning-interpreter',
      trending: true
    },
    {
      id: 'language-origin-explorer',
      name: 'Language Origin Explorer',
      description: 'Explore etymology of festival names',
      icon: Languages,
      category: 'learning',
      keywords: ['language', 'origin', 'etymology', 'names'],
      url: '/festival-info/language-origin-explorer'
    },
    {
      id: 'language-festival-names',
      name: 'Language-wise Festival Name Finder',
      description: 'Find festival names in different Indian languages',
      icon: Languages,
      category: 'learning',
      keywords: ['language', 'names', 'multilingual', 'indian'],
      url: '/festival-info/language-festival-names'
    },
    {
      id: 'what-happens-audio-guide',
      name: 'Audio Guide: What Happens During This Festival?',
      description: 'Audio explanation of festival celebrations',
      icon: Mic,
      category: 'learning',
      keywords: ['audio', 'guide', 'explanation', 'festival'],
      url: '/festival-info/what-happens-audio-guide'
    },

    // Multimedia (Audio & Video)
    {
      id: 'audio-story-teller',
      name: 'Audio Story Teller (Festival Edition)',
      description: 'Listen to festival stories and legends',
      icon: Mic,
      category: 'multimedia',
      keywords: ['audio', 'story', 'teller', 'narration'],
      url: '/festival-info/audio-story-teller',
      popular: true
    },
    {
      id: 'festival-documentary',
      name: 'Festival Documentary Library',
      description: 'Curated collection of festival documentaries',
      icon: Film,
      category: 'multimedia',
      keywords: ['documentary', 'video', 'library', 'film'],
      url: '/festival-info/festival-documentary'
    },
    {
      id: 'video-script-generator',
      name: 'Video Script Generator (Festival History)',
      description: 'Generate scripts for festival history videos',
      icon: FileText,
      category: 'multimedia',
      keywords: ['video', 'script', 'generator', 'youtube'],
      url: '/festival-info/video-script-generator'
    },
    {
      id: 'ai-video-narration',
      name: 'AI Video Narration (History Summarizer)',
      description: 'AI creates narrated history summaries',
      icon: Video,
      category: 'multimedia',
      keywords: ['ai', 'narration', 'video', 'summary'],
      url: '/festival-info/ai-video-narration',
      trending: true
    },
    {
      id: 'epic-story-generator',
      name: 'Epic Story Generator (Mahabharata, Ramayana)',
      description: 'Generate stories from Indian epics',
      icon: Book,
      category: 'multimedia',
      keywords: ['epic', 'mahabharata', 'ramayana', 'story'],
      url: '/festival-info/epic-story-generator'
    },
    {
      id: 'folk-song-database',
      name: 'Folk Song & Bhajan Database',
      description: 'Searchable database of traditional songs',
      icon: Music,
      category: 'multimedia',
      keywords: ['folk song', 'bhajan', 'database', 'music'],
      url: '/festival-info/folk-song-database'
    },
    {
      id: 'temple-festival-finder',
      name: 'Temple Festival Finder',
      description: 'Find festivals celebrated at famous temples',
      icon: Landmark,
      category: 'multimedia',
      keywords: ['temple', 'festival', 'finder', 'famous'],
      url: '/festival-info/temple-festival-finder'
    },
    {
      id: 'custom-article-generator',
      name: 'Custom Festival Article Generator',
      description: 'AI generates informative festival articles',
      icon: FileText,
      category: 'multimedia',
      keywords: ['article', 'generator', 'ai', 'content'],
      url: '/festival-info/custom-article-generator'
    },

    // Reference Library
    {
      id: 'festival-quotes-proverbs',
      name: 'Festival Quotes & Proverbs Finder',
      description: 'Collection of festival quotes and sayings',
      icon: Book,
      category: 'reference',
      keywords: ['quotes', 'proverbs', 'sayings', 'collection'],
      url: '/festival-info/festival-quotes-proverbs'
    },
    {
      id: 'festival-fun-facts',
      name: 'Festival Fun Fact Generator',
      description: 'Interesting and lesser-known festival facts',
      icon: Lightbulb,
      category: 'reference',
      keywords: ['fun facts', 'interesting', 'trivia', 'knowledge'],
      url: '/festival-info/festival-fun-facts',
      popular: true
    },
    {
      id: 'religious-text-reference',
      name: 'Religious Text Reference Finder',
      description: 'Find festival references in religious texts',
      icon: Scroll,
      category: 'reference',
      keywords: ['religious', 'text', 'reference', 'scripture'],
      url: '/festival-info/religious-text-reference'
    },
    {
      id: 'festival-literature',
      name: 'Festival Literature Finder',
      description: 'Poems, stories, and literature about festivals',
      icon: Library,
      category: 'reference',
      keywords: ['literature', 'poems', 'stories', 'books'],
      url: '/festival-info/festival-literature'
    },
    {
      id: 'state-public-holidays',
      name: 'State-specific Public Holiday List',
      description: 'Complete list of state-wise public holidays',
      icon: Calendar,
      category: 'reference',
      keywords: ['public holiday', 'state', 'list', 'official'],
      url: '/festival-info/state-public-holidays'
    },
    {
      id: 'calendar-history-visualizer',
      name: 'Indian Calendar History Visualizer',
      description: 'Visual representation of calendar evolution',
      icon: History,
      category: 'reference',
      keywords: ['calendar', 'history', 'visualizer', 'evolution'],
      url: '/festival-info/calendar-history-visualizer'
    },
    {
      id: 'global-comparison',
      name: 'Global Comparison: Diwali vs Christmas',
      description: 'Compare Indian and Western festival traditions',
      icon: Globe,
      category: 'reference',
      keywords: ['global', 'comparison', 'diwali', 'christmas'],
      url: '/festival-info/global-comparison'
    }
  ];

  const filteredTools = useMemo(() => {
    let filtered = infoTools;

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

  const popularTools = infoTools.filter(tool => tool.popular);
  const trendingTools = infoTools.filter(tool => tool.trending);

  return (
    <>
      <SEOHelmet
        title="Festival Information & History Tools 2025 | Why Diwali is Celebrated, Holi Story, Festival History India"
        description="55+ festival knowledge tools: Why Diwali is celebrated, Holi story origin, festival history India, cultural insights, regional traditions. Learn about Indian festivals!"
        keywords="why diwali is celebrated, holi story, festival history india, indian festival origin, cultural significance, mythology stories, regional festivals, traditional celebrations"
        url="/festival-info"
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-amber-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-amber-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-amber-600 font-medium">Festival Information & History</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-full mb-6">
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">55+ Information & History Tools</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Festival Information & History Tools
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover why Diwali is celebrated, learn Holi story origins, explore festival history of India, and gain deep cultural insights with 55+ educational tools and resources!
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search... (e.g., why Diwali, Holi story, festival history)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all shadow-lg"
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
                  {['Why Diwali', 'Holi Story', 'Festival History', 'Regional Traditions'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1 bg-white hover:bg-amber-50 border border-amber-200 rounded-full text-sm text-amber-600 font-medium transition-colors"
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
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-amber-100 text-amber-600 rounded-lg"
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
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg scale-105'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-amber-300 hover:shadow-md'
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
                    <Star className="w-6 h-6 text-amber-600" />
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
                          className="block bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-amber-500 hover:border-amber-600 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <tool.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors mb-1">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
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
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
                  className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
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
                      className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 hover:border-amber-300 h-full"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <tool.icon className="w-7 h-7 text-white" />
                          </div>
                          {tool.popular && (
                            <span className="px-2 py-1 bg-amber-100 text-amber-600 text-xs font-bold rounded-full">
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

                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                          {tool.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {tool.description}
                        </p>

                        <div className="flex items-center text-amber-600 font-semibold text-sm group-hover:gap-2 transition-all">
                          Learn More
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Indian Festival Information & History</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Learn Festival History?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding the origins and cultural significance of festivals enriches celebrations:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">✓</span>
                      Learn why Diwali is celebrated and its mythological origins
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">✓</span>
                      Discover the complete Holi story from mythology
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">✓</span>
                      Explore comprehensive festival history of India
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">✓</span>
                      Understand regional variations in celebrations
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">✓</span>
                      Teach children about cultural heritage
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">✓</span>
                      Compare festivals across religions and regions
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Top Festival History Queries</h3>
                  <div className="bg-amber-50 p-6 rounded-2xl">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center">
                        <Lightbulb className="w-5 h-5 text-amber-600 mr-2" />
                        <span className="font-semibold">Why is Diwali celebrated in India?</span>
                      </li>
                      <li className="flex items-center">
                        <Book className="w-5 h-5 text-orange-600 mr-2" />
                        <span className="font-semibold">What is the story behind Holi?</span>
                      </li>
                      <li className="flex items-center">
                        <History className="w-5 h-5 text-red-600 mr-2" />
                        <span className="font-semibold">History of festivals in India</span>
                      </li>
                      <li className="flex items-center">
                        <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-semibold">Regional festivals of India</span>
                      </li>
                      <li className="flex items-center">
                        <Star className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="font-semibold">Significance of Navratri celebration</span>
                      </li>
                      <li className="flex items-center">
                        <Globe className="w-5 h-5 text-teal-600 mr-2" />
                        <span className="font-semibold">How festivals differ by state</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Indian Festival Traditions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl">
                  <History className="w-10 h-10 text-amber-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Historical Origins</h4>
                  <p className="text-sm text-gray-700">Most Indian festivals have roots in ancient mythology, astronomical events, or agricultural cycles spanning thousands of years.</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl">
                  <Globe className="w-10 h-10 text-orange-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Cultural Diversity</h4>
                  <p className="text-sm text-gray-700">India's 28 states celebrate festivals differently, reflecting rich cultural diversity and regional traditions.</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl">
                  <Book className="w-10 h-10 text-red-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Religious Significance</h4>
                  <p className="text-sm text-gray-700">Festivals mark important events from epics like Ramayana and Mahabharata, honoring deities and spiritual teachings.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Festival Knowledge Categories</h3>
              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">History & Origins (12 tools)</h4>
                  <p className="text-gray-700 text-sm">Why we celebrate, origin timelines, mythology comparisons, encyclopedias, evolution stories, and historical patterns.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Cultural Insights (10 tools)</h4>
                  <p className="text-gray-700 text-sm">State festival finders, regional information, religious significance, celebration styles, folk dances, food recipes, symbols, and cultural impact.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Regional Traditions (10 tools)</h4>
                  <p className="text-gray-700 text-sm">Festival comparisons, global celebrations, rituals library, deity associations, temple maps, monthly visualizers, and interactive India maps.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Learning & Quiz (8 tools)</h4>
                  <p className="text-gray-700 text-sm">History quizzes, identification games, cultural heritage tests, folklore quizzes, ritual interpreters, and language explorers.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Audio & Video (8 tools)</h4>
                  <p className="text-gray-700 text-sm">Audio storytellers, documentaries, video scripts, AI narration, epic generators, folk song databases, and temple finders.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Reference Library (7 tools)</h4>
                  <p className="text-gray-700 text-sm">Quotes, fun facts, religious texts, literature, public holidays, calendar visualizers, and global comparisons.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why is Diwali Celebrated?</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Diwali, the Festival of Lights, is celebrated to mark Lord Rama's return to Ayodhya after 14 years of exile and his victory over the demon king Ravana. The festival also honors Goddess Lakshmi, the deity of wealth and prosperity. People light diyas (oil lamps) to symbolize the victory of light over darkness and good over evil. Different regions have variations: In South India, it marks Lord Krishna's victory over Narakasura, while in Gujarat, it's the New Year. Use our "Why We Celebrate" AI Explainer for detailed stories of all festivals.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Why is Diwali celebrated in India?</h4>
                  <p className="text-gray-700 text-sm">Diwali celebrates Lord Rama's return to Ayodhya after defeating Ravana, symbolizing the victory of light over darkness. It's also associated with Goddess Lakshmi's worship for prosperity. Use our "Why We Celebrate" tool for complete mythological stories.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">What is the story behind Holi festival?</h4>
                  <p className="text-gray-700 text-sm">Holi celebrates the burning of demoness Holika and the triumph of devotee Prahlad. It also marks Lord Krishna's playful color celebrations with Radha and gopis. Our Mythology to Modern tool explains the complete story.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">How many festivals are celebrated in India?</h4>
                  <p className="text-gray-700 text-sm">India celebrates 100+ major festivals across religions and regions. Use our Indian Festival History Encyclopedia to explore all festivals with detailed origins, significance, and celebration methods.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">How do festivals vary across Indian states?</h4>
                  <p className="text-gray-700 text-sm">Each state has unique celebration styles. For example, Diwali in Bengal is Kali Puja, in Maharashtra it's Lakshmi Puja. Use our "How Each State Celebrates" Explorer to discover regional differences.</p>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-amber-600 to-orange-600 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Start Your Festival Knowledge Journey Today!</h3>
                <p className="mb-6 text-white/90">
                  Explore rich history, cultural insights, regional traditions, and fascinating stories behind Indian festivals with our 55+ comprehensive educational tools!
                </p>
                <Link
                  to="/festival-tools"
                  className="inline-flex items-center px-6 py-3 bg-white text-amber-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
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

export default FestivalInformationHistory;

