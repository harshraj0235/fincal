import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PartyPopper, Search, Filter, Gamepad2, Smile, Camera, Palette,
  Home, ChevronRight, X, Star, TrendingUp, Sparkles, Wand2, Image,
  MessageCircle, Hash, Trophy, Puzzle, Heart, Gift,
  Zap, ArrowRight, Users, Paintbrush, Video, Instagram, Mic,
  Book, GraduationCap, Baby, Award, Target, Layers, Flame
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

interface FunTool {
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

const FunEngagementTools: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Tools', icon: PartyPopper, count: 60 },
    { id: 'games', name: 'Games & Quizzes', icon: Gamepad2, count: 15 },
    { id: 'design', name: 'Design & Create', icon: Palette, count: 12 },
    { id: 'photo-video', name: 'Photo & Video', icon: Camera, count: 10 },
    { id: 'social', name: 'Social Media', icon: Instagram, count: 12 },
    { id: 'ai-tools', name: 'AI Tools', icon: Wand2, count: 8 },
    { id: 'kids', name: 'Kids & Learning', icon: Baby, count: 3 }
  ];

  const funTools: FunTool[] = [
    // Games & Quizzes
    {
      id: 'festival-quiz-generator',
      name: 'Festival Quiz Generator (AI)',
      description: 'AI-powered quiz generator for any festival',
      icon: Gamepad2,
      category: 'games',
      keywords: ['quiz', 'ai', 'festival', 'generator'],
      url: '/fun-engagement/festival-quiz-generator',
      popular: true,
      trending: true
    },
    {
      id: 'firecracker-simulator',
      name: 'Firecracker Simulator Game',
      description: 'Safe virtual firecracker experience with sound effects',
      icon: Sparkles,
      category: 'games',
      keywords: ['firecracker', 'simulator', 'game', 'diwali'],
      url: '/fun-engagement/firecracker-simulator',
      popular: true,
      trending: true
    },
    {
      id: 'diya-lighting-game',
      name: 'Diya Lighting Game',
      description: 'Interactive game to light diyas and lamps',
      icon: Flame,
      category: 'games',
      keywords: ['diya', 'lighting', 'game', 'diwali'],
      url: '/fun-engagement/diya-lighting-game',
      popular: true
    },
    {
      id: 'daily-festival-quiz',
      name: 'Daily Festival Quiz (Win Coins)',
      description: 'Answer daily quizzes and earn virtual coins',
      icon: Trophy,
      category: 'games',
      keywords: ['daily quiz', 'coins', 'win', 'festival'],
      url: '/fun-engagement/daily-festival-quiz',
      trending: true
    },
    {
      id: 'spin-wheel-offers',
      name: 'Spin the Wheel (Festival Offers)',
      description: 'Spin to discover festival deals and surprises',
      icon: Target,
      category: 'games',
      keywords: ['spin wheel', 'offers', 'lucky', 'game'],
      url: '/fun-engagement/spin-wheel-offers'
    },
    {
      id: 'festival-countdown-game',
      name: 'Festival Countdown Game',
      description: 'Interactive countdown with mini-games',
      icon: Zap,
      category: 'games',
      keywords: ['countdown', 'game', 'interactive', 'festival'],
      url: '/fun-engagement/festival-countdown-game'
    },
    {
      id: 'match-mood-festival',
      name: 'Match My Mood to Festival Quiz',
      description: 'Find which festival matches your current mood',
      icon: Smile,
      category: 'games',
      keywords: ['mood', 'match', 'quiz', 'personality'],
      url: '/fun-engagement/match-mood-festival'
    },
    {
      id: 'festival-personality-test',
      name: 'Festival Personality Test',
      description: 'Discover your festival personality type',
      icon: Heart,
      category: 'games',
      keywords: ['personality', 'test', 'quiz', 'festival'],
      url: '/fun-engagement/festival-personality-test'
    },
    {
      id: 'astrology-compatibility-quiz',
      name: 'Astrology Compatibility Quiz',
      description: 'Test zodiac compatibility for festival celebrations',
      icon: Star,
      category: 'games',
      keywords: ['astrology', 'compatibility', 'zodiac', 'quiz'],
      url: '/fun-engagement/astrology-compatibility-quiz'
    },
    {
      id: 'festival-bingo',
      name: 'Festival Bingo Maker',
      description: 'Create custom festival bingo cards',
      icon: Layers,
      category: 'games',
      keywords: ['bingo', 'maker', 'game', 'festival'],
      url: '/fun-engagement/festival-bingo'
    },
    {
      id: 'which-festival-are-you',
      name: 'Which Festival Are You? Quiz',
      description: 'Fun personality quiz to find your festival match',
      icon: Gamepad2,
      category: 'games',
      keywords: ['which festival', 'quiz', 'personality', 'fun'],
      url: '/fun-engagement/which-festival-are-you',
      popular: true
    },
    {
      id: 'festival-jigsaw',
      name: 'Festival Jigsaw Puzzle Game',
      description: 'Solve festival-themed jigsaw puzzles',
      icon: Puzzle,
      category: 'games',
      keywords: ['jigsaw', 'puzzle', 'game', 'festival'],
      url: '/fun-engagement/festival-jigsaw'
    },
    {
      id: 'puja-memory-game',
      name: 'Puja Ritual Memory Game',
      description: 'Memory game with puja items and rituals',
      icon: Gamepad2,
      category: 'games',
      keywords: ['memory', 'game', 'puja', 'ritual'],
      url: '/fun-engagement/puja-memory-game'
    },
    {
      id: 'guess-festival-game',
      name: 'Can You Guess This Festival? Game',
      description: 'Guess the festival from clues and images',
      icon: Trophy,
      category: 'games',
      keywords: ['guess', 'festival', 'game', 'quiz'],
      url: '/fun-engagement/guess-festival-game'
    },
    {
      id: 'design-puja-thali',
      name: 'Design Your Puja Thali Game',
      description: 'Interactive game to arrange puja thali',
      icon: Palette,
      category: 'games',
      keywords: ['design', 'puja thali', 'game', 'interactive'],
      url: '/fun-engagement/design-puja-thali'
    },

    // Design & Create Tools
    {
      id: 'festival-meme-generator',
      name: 'Festival Meme Generator',
      description: 'Create viral festival memes with templates',
      icon: Smile,
      category: 'design',
      keywords: ['meme', 'generator', 'festival', 'funny'],
      url: '/fun-engagement/festival-meme-generator',
      popular: true,
      trending: true
    },
    {
      id: 'rangoli-design-ai',
      name: 'Rangoli Design Generator (AI)',
      description: 'AI-powered rangoli pattern generator',
      icon: Palette,
      category: 'design',
      keywords: ['rangoli', 'ai', 'design', 'pattern'],
      url: '/fun-engagement/rangoli-design-ai',
      popular: true,
      trending: true
    },
    {
      id: 'festival-name-logo',
      name: 'Festival Name Logo Maker',
      description: 'Create personalized festival logos and names',
      icon: Paintbrush,
      category: 'design',
      keywords: ['logo', 'name', 'maker', 'design'],
      url: '/fun-engagement/festival-name-logo'
    },
    {
      id: 'festival-poll-maker',
      name: 'Festival Poll Maker',
      description: 'Create engaging festival polls for social media',
      icon: Users,
      category: 'design',
      keywords: ['poll', 'maker', 'social', 'festival'],
      url: '/fun-engagement/festival-poll-maker'
    },
    {
      id: 'lucky-draw-generator',
      name: 'Lucky Draw Generator',
      description: 'Random lucky draw and raffle generator',
      icon: Gift,
      category: 'design',
      keywords: ['lucky draw', 'raffle', 'random', 'winner'],
      url: '/fun-engagement/lucky-draw-generator'
    },
    {
      id: 'secret-santa-picker',
      name: 'Secret Santa Name Picker',
      description: 'Random name picker for Secret Santa games',
      icon: Gift,
      category: 'design',
      keywords: ['secret santa', 'name picker', 'gift', 'exchange'],
      url: '/fun-engagement/secret-santa-picker'
    },
    {
      id: 'gift-exchange-organizer',
      name: 'Gift Exchange Organizer',
      description: 'Organize group gift exchanges efficiently',
      icon: Users,
      category: 'design',
      keywords: ['gift exchange', 'organizer', 'group', 'festival'],
      url: '/fun-engagement/gift-exchange-organizer'
    },
    {
      id: 'festival-fun-fact',
      name: 'Festival Fun Fact Generator',
      description: 'Random interesting facts about festivals',
      icon: Sparkles,
      category: 'design',
      keywords: ['fun fact', 'trivia', 'festival', 'knowledge'],
      url: '/fun-engagement/festival-fun-fact'
    },
    {
      id: 'greeting-card-ai',
      name: 'Greeting Card AI Designer',
      description: 'AI-designed personalized greeting cards',
      icon: Wand2,
      category: 'design',
      keywords: ['greeting card', 'ai', 'design', 'personalized'],
      url: '/fun-engagement/greeting-card-ai',
      trending: true
    },
    {
      id: 'festival-name-generator',
      name: 'Festival Name Generator',
      description: 'Generate creative names for festival events',
      icon: Sparkles,
      category: 'design',
      keywords: ['name', 'generator', 'event', 'festival'],
      url: '/fun-engagement/festival-name-generator'
    },
    {
      id: 'color-palette-holi',
      name: 'Color Palette Generator (for Holi posts)',
      description: 'Generate vibrant color combinations for Holi',
      icon: Palette,
      category: 'design',
      keywords: ['color', 'palette', 'holi', 'vibrant'],
      url: '/fun-engagement/color-palette-holi'
    },

    // Photo & Video Tools
    {
      id: 'holi-photo-filter',
      name: 'Holi Photo Color Filter',
      description: 'Apply vibrant Holi colors to your photos',
      icon: Camera,
      category: 'photo-video',
      keywords: ['holi', 'photo', 'filter', 'color'],
      url: '/fun-engagement/holi-photo-filter',
      popular: true
    },
    {
      id: 'diwali-selfie-frame',
      name: 'Diwali Selfie Frame',
      description: 'Beautiful Diwali-themed photo frames',
      icon: Camera,
      category: 'photo-video',
      keywords: ['diwali', 'selfie', 'frame', 'photo'],
      url: '/fun-engagement/diwali-selfie-frame',
      popular: true
    },
    {
      id: 'ai-face-paint-holi',
      name: 'AI Face Paint (Holi)',
      description: 'Apply virtual face paint and colors',
      icon: Paintbrush,
      category: 'photo-video',
      keywords: ['ai', 'face paint', 'holi', 'filter'],
      url: '/fun-engagement/ai-face-paint-holi',
      trending: true
    },
    {
      id: 'firework-visualizer',
      name: 'AI Crackers Firework Visualizer',
      description: 'Virtual fireworks display with sound',
      icon: Sparkles,
      category: 'photo-video',
      keywords: ['firework', 'visualizer', 'crackers', 'display'],
      url: '/fun-engagement/firework-visualizer'
    },
    {
      id: 'festival-reels-ideas',
      name: 'Festival Reels Idea Generator',
      description: 'Get creative ideas for Instagram Reels',
      icon: Video,
      category: 'photo-video',
      keywords: ['reels', 'ideas', 'instagram', 'festival'],
      url: '/fun-engagement/festival-reels-ideas',
      trending: true
    },
    {
      id: 'ai-video-caption',
      name: 'AI Festive Video Caption Generator',
      description: 'AI-generated captions for festival videos',
      icon: Video,
      category: 'photo-video',
      keywords: ['ai', 'video', 'caption', 'generator'],
      url: '/fun-engagement/ai-video-caption'
    },
    {
      id: 'voice-greeting-maker',
      name: 'Voice Greeting Maker',
      description: 'Record and share voice festival greetings',
      icon: Mic,
      category: 'photo-video',
      keywords: ['voice', 'greeting', 'audio', 'maker'],
      url: '/fun-engagement/voice-greeting-maker'
    },
    {
      id: '360-fireworks',
      name: '360° Fireworks Simulator',
      description: 'Immersive 360° fireworks experience',
      icon: Sparkles,
      category: 'photo-video',
      keywords: ['360', 'fireworks', 'immersive', 'vr'],
      url: '/fun-engagement/360-fireworks'
    },
    {
      id: 'ar-diya-placement',
      name: 'AR Diya Placement Tool',
      description: 'Place virtual diyas using augmented reality',
      icon: Flame,
      category: 'photo-video',
      keywords: ['ar', 'augmented reality', 'diya', 'placement'],
      url: '/fun-engagement/ar-diya-placement',
      trending: true
    },
    {
      id: 'online-rangoli-competition',
      name: 'Online Rangoli Competition',
      description: 'Compete in virtual rangoli making contest',
      icon: Award,
      category: 'photo-video',
      keywords: ['rangoli', 'competition', 'online', 'contest'],
      url: '/fun-engagement/online-rangoli-competition'
    },

    // Social Media Tools
    {
      id: 'ai-caption-writer',
      name: 'AI Caption Writer for Festival Posts',
      description: 'Generate engaging captions for festival photos',
      icon: MessageCircle,
      category: 'social',
      keywords: ['ai', 'caption', 'writer', 'festival'],
      url: '/fun-engagement/ai-caption-writer',
      popular: true,
      trending: true
    },
    {
      id: 'diwali-hashtag-finder',
      name: 'Diwali Hashtag Finder',
      description: 'Find trending Diwali hashtags for better reach',
      icon: Hash,
      category: 'social',
      keywords: ['diwali', 'hashtag', 'finder', 'trending'],
      url: '/fun-engagement/diwali-hashtag-finder',
      popular: true
    },
    {
      id: 'festival-wishes-writer',
      name: 'Festival Wishes Writer',
      description: 'AI-powered festival wishes and messages',
      icon: MessageCircle,
      category: 'social',
      keywords: ['wishes', 'writer', 'messages', 'festival'],
      url: '/fun-engagement/festival-wishes-writer',
      popular: true
    },
    {
      id: 'story-caption-generator',
      name: 'Festival Story Caption Generator',
      description: 'Create catchy captions for Instagram stories',
      icon: Instagram,
      category: 'social',
      keywords: ['story', 'caption', 'instagram', 'festival'],
      url: '/fun-engagement/story-caption-generator'
    },
    {
      id: 'instagram-post-scheduler',
      name: 'Instagram Post Scheduler (Festivals)',
      description: 'Schedule festival posts in advance',
      icon: Instagram,
      category: 'social',
      keywords: ['instagram', 'scheduler', 'post', 'festival'],
      url: '/fun-engagement/instagram-post-scheduler'
    },
    {
      id: 'hashtag-trend-finder',
      name: 'Festival Hashtag Trend Finder',
      description: 'Discover trending festival hashtags',
      icon: TrendingUp,
      category: 'social',
      keywords: ['hashtag', 'trend', 'finder', 'viral'],
      url: '/fun-engagement/hashtag-trend-finder'
    },
    {
      id: 'festival-meme-library',
      name: 'Festival Meme Library',
      description: 'Browse and download festival meme templates',
      icon: Image,
      category: 'social',
      keywords: ['meme', 'library', 'templates', 'festival'],
      url: '/fun-engagement/festival-meme-library'
    },
    {
      id: 'whatsapp-status-maker',
      name: 'Custom WhatsApp Status Maker',
      description: 'Create custom WhatsApp status for festivals',
      icon: MessageCircle,
      category: 'social',
      keywords: ['whatsapp', 'status', 'maker', 'festival'],
      url: '/fun-engagement/whatsapp-status-maker'
    },
    {
      id: 'virtual-gift-sender',
      name: 'Send a Virtual Gift Tool',
      description: 'Send animated virtual gifts to friends',
      icon: Gift,
      category: 'social',
      keywords: ['virtual', 'gift', 'send', 'animated'],
      url: '/fun-engagement/virtual-gift-sender'
    },
    {
      id: 'festival-fun-fact-widget',
      name: 'Festival Fun Fact Widget',
      description: 'Embeddable widget showing fun facts',
      icon: Sparkles,
      category: 'social',
      keywords: ['widget', 'fun fact', 'embed', 'festival'],
      url: '/fun-engagement/festival-fun-fact-widget'
    },
    {
      id: 'countdown-widget-bloggers',
      name: 'Countdown Widget for Bloggers',
      description: 'Embed festival countdown on your blog',
      icon: Zap,
      category: 'social',
      keywords: ['countdown', 'widget', 'blogger', 'embed'],
      url: '/fun-engagement/countdown-widget-bloggers'
    },

    // AI Tools
    {
      id: 'horoscope-gift-matcher',
      name: 'Horoscope-based Gift Matcher',
      description: 'AI matches gifts based on zodiac signs',
      icon: Wand2,
      category: 'ai-tools',
      keywords: ['horoscope', 'gift', 'ai', 'zodiac'],
      url: '/fun-engagement/horoscope-gift-matcher'
    },
    {
      id: 'horoscope-prediction-festival',
      name: 'Horoscope Prediction for This Festival',
      description: 'Get AI-powered festival horoscope predictions',
      icon: Star,
      category: 'ai-tools',
      keywords: ['horoscope', 'prediction', 'ai', 'festival'],
      url: '/fun-engagement/horoscope-prediction-festival'
    },
    {
      id: 'diwali-mood-test',
      name: 'What\'s Your Diwali Mood? Test',
      description: 'AI analyzes your Diwali celebration mood',
      icon: Smile,
      category: 'ai-tools',
      keywords: ['diwali', 'mood', 'test', 'ai'],
      url: '/fun-engagement/diwali-mood-test'
    },
    {
      id: 'traditional-outfit-recommender',
      name: 'Traditional Outfit Recommender',
      description: 'AI suggests perfect traditional outfits',
      icon: Wand2,
      category: 'ai-tools',
      keywords: ['outfit', 'recommender', 'ai', 'traditional'],
      url: '/fun-engagement/traditional-outfit-recommender'
    },
    {
      id: 'festive-mood-meter',
      name: 'Festive Mood Meter',
      description: 'Measure and track your festive spirit',
      icon: Heart,
      category: 'ai-tools',
      keywords: ['mood', 'meter', 'festive', 'spirit'],
      url: '/fun-engagement/festive-mood-meter'
    },
    {
      id: 'festival-wish-bot',
      name: 'Festival Wish Generator Bot',
      description: 'AI bot generates personalized wishes',
      icon: Wand2,
      category: 'ai-tools',
      keywords: ['wish', 'bot', 'ai', 'generator'],
      url: '/fun-engagement/festival-wish-bot'
    },

    // Kids & Learning
    {
      id: 'cultural-quiz-schools',
      name: 'Cultural Quiz for Schools',
      description: 'Educational quiz about festival culture',
      icon: GraduationCap,
      category: 'kids',
      keywords: ['cultural', 'quiz', 'school', 'education'],
      url: '/fun-engagement/cultural-quiz-schools'
    },
    {
      id: 'kids-festival-quiz',
      name: 'Kids Festival Education Quiz',
      description: 'Fun and educational festival quiz for kids',
      icon: Baby,
      category: 'kids',
      keywords: ['kids', 'education', 'quiz', 'festival'],
      url: '/fun-engagement/kids-festival-quiz'
    },
    {
      id: 'festival-stories-reader',
      name: 'Festival Stories & Legends Reader',
      description: 'Animated stories about festival origins',
      icon: Book,
      category: 'kids',
      keywords: ['stories', 'legends', 'kids', 'festival'],
      url: '/fun-engagement/festival-stories-reader'
    }
  ];

  const filteredTools = useMemo(() => {
    let filtered = funTools;

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

  const popularTools = funTools.filter(tool => tool.popular);
  const trendingTools = funTools.filter(tool => tool.trending);

  return (
    <>
      <SEOHelmet
        title="Festival Fun & Engagement Tools 2025 | Diwali Games, Holi Meme Generator, Quiz"
        description="60+ festival entertainment tools: Diwali games, Holi meme generator, festival quiz, card maker, rangoli designer, selfie frames, AI caption writer. Make festivals fun!"
        keywords="diwali game, holi meme generator, festival quiz, card maker, rangoli design, diwali selfie, festival games, meme maker, ai caption, hashtag finder, greeting card"
        url="/fun-engagement"
        type="website"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Festival Tools', url: '/festival-tools' },
          { name: 'Fun & Engagement', url: '/fun-engagement' }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Festival Fun & Engagement Tools",
          description: "Interactive games, meme generators, quizzes, and creative engagement utilities.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: funTools.length
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-yellow-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-yellow-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-yellow-600 font-medium">Fun & Engagement</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-pink-500/10"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-600 to-pink-600 text-white px-6 py-2 rounded-full mb-6">
                <PartyPopper className="w-5 h-5" />
                <span className="font-semibold">60+ Fun & Entertainment Tools</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">
                Festival Fun & Engagement Tools
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                Make festivals super fun! Play Diwali games, create Holi memes, take festival quizzes, design greeting cards, generate AI captions, and entertain your family with 60+ interactive tools!
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tools... (e.g., Diwali game, Holi meme, quiz)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-all shadow-lg"
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
                  {['Diwali Game', 'Holi Meme', 'Festival Quiz', 'Card Maker'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1 bg-white hover:bg-yellow-50 border border-yellow-200 rounded-full text-sm text-yellow-600 font-medium transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <section className="py-10 bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">How to use</h3>
                <p className="text-gray-700 text-sm">Pick a game or quiz, share with friends, track scores, and post memes or cards.</p>
              </div>
              <div className="border rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
                <p className="text-gray-700 text-sm">Games → family play. Memes → social sharing. Quizzes → group challenges.</p>
              </div>
              <div className="border rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
                <p className="text-gray-700 text-sm">Diwali trivia → score table. Holi meme → Instagram post. Rangoli design → print and color.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 bg-white border-y border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Browse by Category</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-yellow-100 text-yellow-600 rounded-lg"
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
                      ? 'bg-gradient-to-r from-yellow-600 to-pink-600 text-white shadow-lg scale-105'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-yellow-300 hover:shadow-md'
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
                    <Star className="w-6 h-6 text-yellow-600" />
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
                          className="block bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-yellow-500 hover:border-yellow-600 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <tool.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 group-hover:text-yellow-600 transition-colors mb-1">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
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
                  className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
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
                      className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 hover:border-yellow-300 h-full"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <tool.icon className="w-7 h-7 text-white" />
                          </div>
                          {tool.popular && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs font-bold rounded-full">
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

                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                          {tool.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {tool.description}
                        </p>

                        <div className="flex items-center text-yellow-600 font-semibold text-sm group-hover:gap-2 transition-all">
                          Try Now
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Festival Fun & Entertainment Tools</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Use Festival Fun Tools?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Festivals are about joy, celebration, and creating memories. Our fun and engagement tools help you:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">✓</span>
                      Play interactive Diwali games with family
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">✓</span>
                      Create viral Holi memes and funny content
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">✓</span>
                      Take fun festival quizzes and personality tests
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">✓</span>
                      Design beautiful greeting cards with AI
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">✓</span>
                      Generate AI captions for social media posts
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">✓</span>
                      Entertain kids with educational games
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Top Festival Fun Queries</h3>
                  <div className="bg-yellow-50 p-6 rounded-2xl">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center">
                        <Gamepad2 className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="font-semibold">Diwali games for family online</span>
                      </li>
                      <li className="flex items-center">
                        <Smile className="w-5 h-5 text-orange-600 mr-2" />
                        <span className="font-semibold">Holi meme generator free</span>
                      </li>
                      <li className="flex items-center">
                        <Trophy className="w-5 h-5 text-pink-600 mr-2" />
                        <span className="font-semibold">Festival quiz questions and answers</span>
                      </li>
                      <li className="flex items-center">
                        <Palette className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="font-semibold">Greeting card maker online free</span>
                      </li>
                      <li className="flex items-center">
                        <Camera className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-semibold">Diwali selfie frame app</span>
                      </li>
                      <li className="flex items-center">
                        <MessageCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-semibold">AI caption generator for festivals</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Make Festivals More Engaging</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl">
                  <Gamepad2 className="w-10 h-10 text-yellow-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Interactive Games</h4>
                  <p className="text-sm text-gray-700">Play virtual firecracker games, diya lighting, rangoli competitions, and festival quizzes with family and friends.</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-pink-50 p-6 rounded-2xl">
                  <Wand2 className="w-10 h-10 text-orange-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">AI-Powered Tools</h4>
                  <p className="text-sm text-gray-700">Use AI for caption writing, meme generation, greeting card design, and personalized festival content creation.</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl">
                  <Camera className="w-10 h-10 text-pink-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Photo & Video Fun</h4>
                  <p className="text-sm text-gray-700">Apply Holi filters, create selfie frames, make reels, and generate creative content for Instagram and WhatsApp.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Festival Entertainment Categories</h3>
              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Games & Quizzes (15 tools)</h4>
                  <p className="text-gray-700 text-sm">Interactive games, personality tests, trivia quizzes, simulators, memory games, and educational content for all ages.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Design & Create (12 tools)</h4>
                  <p className="text-gray-700 text-sm">Meme generators, logo makers, rangoli designers, card creators, poll makers, and name generators.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Photo & Video (10 tools)</h4>
                  <p className="text-gray-700 text-sm">Photo filters, selfie frames, AR tools, video ideas, firework visualizers, and voice greeting makers.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Social Media (12 tools)</h4>
                  <p className="text-gray-700 text-sm">Caption writers, hashtag finders, wish generators, story tools, schedulers, and WhatsApp status makers.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">AI Tools (8 tools)</h4>
                  <p className="text-gray-700 text-sm">AI-powered gift matching, predictions, mood analysis, outfit recommendations, and content generation.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Kids & Learning (3 tools)</h4>
                  <p className="text-gray-700 text-sm">Educational quizzes, cultural learning tools, and story readers designed specifically for children.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">What are the best Diwali games to play with family?</h4>
                  <p className="text-gray-700 text-sm">Try our Firecracker Simulator Game, Diya Lighting Game, Festival Quiz, Rangoli Design Generator, and Puja Memory Game. All are family-friendly and can be played online without downloads.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">How to create Holi memes quickly?</h4>
                  <p className="text-gray-700 text-sm">Use our Festival Meme Generator with pre-made templates. Simply upload your photo, add text, and download instantly. We also have a Holi Photo Color Filter for adding vibrant colors to pictures.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Are the AI tools really free?</h4>
                  <p className="text-gray-700 text-sm">Yes! All our AI-powered tools including caption writers, greeting card designers, rangoli generators, and wish writers are 100% free with no registration required.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Can kids use these tools safely?</h4>
                  <p className="text-gray-700 text-sm">Absolutely! We have a dedicated Kids & Learning category with age-appropriate quizzes, educational games, and story readers. All content is family-friendly and safe for children.</p>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-yellow-600 to-pink-600 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Start Having Fun This Festival Season!</h3>
                <p className="mb-6 text-white/90">
                  Play games, create memes, take quizzes, and make every festival celebration more entertaining with our 60+ interactive fun tools!
                </p>
                <Link
                  to="/festival-tools"
                  className="inline-flex items-center px-6 py-3 bg-white text-yellow-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
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

export default FunEngagementTools;
