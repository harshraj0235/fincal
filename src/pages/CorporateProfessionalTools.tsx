import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase, Search, Filter, Users, Mail, Gift, Calendar, DollarSign,
  Home, ChevronRight, X, Star, TrendingUp, FileText, Award, Building,
  MessageCircle, Clock, Target, Heart,
  PieChart, BarChart3, Sparkles, ArrowRight, Bell,
  Clipboard, CheckCircle, Video, Image, Hash, Linkedin, Smartphone, Mic, Lightbulb
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

interface CorporateTool {
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

const CorporateProfessionalTools: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Tools', icon: Briefcase, count: 45 },
    { id: 'hr-tools', name: 'HR & Templates', icon: FileText, count: 10 },
    { id: 'employee', name: 'Employee Engagement', icon: Users, count: 10 },
    { id: 'communication', name: 'Business Communication', icon: Mail, count: 10 },
    { id: 'finance', name: 'Corporate Finance', icon: DollarSign, count: 7 },
    { id: 'marketing', name: 'Marketing & Branding', icon: TrendingUp, count: 8 }
  ];

  const corporateTools: CorporateTool[] = [
    // HR & Templates
    {
      id: 'corporate-email-generator',
      name: 'Corporate Festival Email Generator',
      description: 'Generate professional festival emails for employees and clients',
      icon: Mail,
      category: 'hr-tools',
      keywords: ['email', 'corporate', 'template', 'professional'],
      url: '/festival-corporate-tools/corporate-email-generator',
      popular: true,
      trending: true
    },
    {
      id: 'hr-greeting-template',
      name: 'HR Festival Greeting Template Tool',
      description: 'Ready-to-use HR greeting templates for all festivals',
      icon: FileText,
      category: 'hr-tools',
      keywords: ['hr', 'template', 'greeting', 'festival'],
      url: '/festival-corporate-tools/hr-greeting-template',
      popular: true,
      trending: true
    },
    {
      id: 'holiday-announcement',
      name: 'Festival Holiday Announcement Generator',
      description: 'Create official holiday announcements for employees',
      icon: Bell,
      category: 'hr-tools',
      keywords: ['holiday', 'announcement', 'official', 'hr'],
      url: '/festival-corporate-tools/holiday-announcement',
      popular: true
    },
    {
      id: 'gift-policy-template',
      name: 'Festival Gift Policy Template Generator',
      description: 'Generate corporate gift policy documents',
      icon: FileText,
      category: 'hr-tools',
      keywords: ['gift policy', 'template', 'hr', 'corporate'],
      url: '/festival-corporate-tools/gift-policy-template'
    },
    {
      id: 'hr-calendar-sync',
      name: 'HR Festival Calendar Sync Tool',
      description: 'Sync festival holidays with company calendar',
      icon: Calendar,
      category: 'hr-tools',
      keywords: ['calendar', 'sync', 'hr', 'holidays'],
      url: '/festival-corporate-tools/hr-calendar-sync'
    },
    {
      id: 'festival-attendance',
      name: 'Festival Attendance Tracker',
      description: 'Track employee attendance during festival season',
      icon: Clipboard,
      category: 'hr-tools',
      keywords: ['attendance', 'tracker', 'hr', 'employee'],
      url: '/festival-corporate-tools/festival-attendance'
    },
    {
      id: 'bulk-poster-hr',
      name: 'Bulk Poster Generator for HR',
      description: 'Generate multiple festival posters for offices',
      icon: Image,
      category: 'hr-tools',
      keywords: ['bulk', 'poster', 'hr', 'generator'],
      url: '/festival-corporate-tools/bulk-poster-hr'
    },
    {
      id: 'employee-survey',
      name: 'Festival Employee Survey Tool',
      description: 'Create surveys for festival preferences',
      icon: Clipboard,
      category: 'hr-tools',
      keywords: ['survey', 'employee', 'festival', 'feedback'],
      url: '/festival-corporate-tools/employee-survey'
    },
    {
      id: 'festival-productivity',
      name: 'Festival Productivity Tracker',
      description: 'Track team productivity during festival season',
      icon: BarChart3,
      category: 'hr-tools',
      keywords: ['productivity', 'tracker', 'hr', 'metrics'],
      url: '/festival-corporate-tools/festival-productivity'
    },
    {
      id: 'how-to-greet-clients',
      name: 'How to Greet Clients Template Tool',
      description: 'Professional client greeting templates',
      icon: FileText,
      category: 'hr-tools',
      keywords: ['client', 'greeting', 'template', 'professional'],
      url: '/festival-corporate-tools/how-to-greet-clients'
    },

    // Employee Engagement
    {
      id: 'festival-bonus-calculator',
      name: 'Festival Bonus Calculator',
      description: 'Calculate employee festival bonus and tax deductions',
      icon: DollarSign,
      category: 'employee',
      keywords: ['bonus', 'calculator', 'festival', 'employee'],
      url: '/festival-corporate-tools/festival-bonus-calculator',
      popular: true,
      trending: true
    },
    {
      id: 'employee-gift-tracker',
      name: 'Employee Gift Tracker',
      description: 'Track gifts distributed to employees',
      icon: Gift,
      category: 'employee',
      keywords: ['gift', 'tracker', 'employee', 'distribution'],
      url: '/festival-corporate-tools/employee-gift-tracker',
      popular: true
    },
    {
      id: 'employee-poll-gifts',
      name: 'Employee Poll for Gifts Tool',
      description: 'Poll employees to choose festival gifts',
      icon: Users,
      category: 'employee',
      keywords: ['poll', 'employee', 'gifts', 'survey'],
      url: '/festival-corporate-tools/employee-poll-gifts'
    },
    {
      id: 'employee-of-month',
      name: 'Employee of the Month (Festival Edition) Generator',
      description: 'Create special festival employee recognition',
      icon: Award,
      category: 'employee',
      keywords: ['employee of month', 'recognition', 'award', 'festival'],
      url: '/festival-corporate-tools/employee-of-month'
    },
    {
      id: 'engagement-ideas',
      name: 'Employee Engagement Ideas Generator',
      description: 'AI-generated festival engagement activities',
      icon: Sparkles,
      category: 'employee',
      keywords: ['engagement', 'ideas', 'activities', 'employee'],
      url: '/festival-corporate-tools/engagement-ideas',
      trending: true
    },
    {
      id: 'employee-bonus-tracker',
      name: 'Employee Festival Bonus Tracker',
      description: 'Track and manage festival bonus distribution',
      icon: CheckCircle,
      category: 'employee',
      keywords: ['bonus', 'tracker', 'distribution', 'employee'],
      url: '/festival-corporate-tools/employee-bonus-tracker'
    },
    {
      id: 'best-gift-ideas-ai',
      name: 'Best Employee Gift Ideas AI Generator',
      description: 'AI suggests perfect employee gifts based on budget',
      icon: Gift,
      category: 'employee',
      keywords: ['gift ideas', 'ai', 'employee', 'suggestions'],
      url: '/festival-corporate-tools/best-gift-ideas-ai',
      popular: true
    },
    {
      id: 'office-potluck-planner',
      name: 'Office Potluck Planner',
      description: 'Plan and organize office festival potlucks',
      icon: Users,
      category: 'employee',
      keywords: ['potluck', 'planner', 'office', 'food'],
      url: '/festival-corporate-tools/office-potluck-planner'
    },
    {
      id: 'reward-points-system',
      name: 'Reward Points System for Office',
      description: 'Gamified reward system for festival season',
      icon: Award,
      category: 'employee',
      keywords: ['reward', 'points', 'gamification', 'office'],
      url: '/festival-corporate-tools/reward-points-system'
    },
    {
      id: 'internal-festival-quiz',
      name: 'Internal Festival Quiz Tool',
      description: 'Create quiz competitions for employees',
      icon: Target,
      category: 'employee',
      keywords: ['quiz', 'internal', 'competition', 'employee'],
      url: '/festival-corporate-tools/internal-festival-quiz'
    },

    // Business Communication
    {
      id: 'corporate-greeting-card',
      name: 'Corporate Greetings Card Maker',
      description: 'Design professional corporate greeting cards',
      icon: Gift,
      category: 'communication',
      keywords: ['corporate', 'greeting card', 'professional', 'maker'],
      url: '/festival-corporate-tools/corporate-greeting-card',
      popular: true
    },
    {
      id: 'festival-slack-message',
      name: 'Festival Slack Message Generator',
      description: 'Generate festive messages for Slack channels',
      icon: MessageCircle,
      category: 'communication',
      keywords: ['slack', 'message', 'generator', 'festival'],
      url: '/festival-corporate-tools/festival-slack-message',
      trending: true
    },
    {
      id: 'company-newsletter',
      name: 'Company Newsletter Festival Template',
      description: 'Newsletter templates for festival updates',
      icon: Mail,
      category: 'communication',
      keywords: ['newsletter', 'template', 'company', 'festival'],
      url: '/festival-corporate-tools/company-newsletter'
    },
    {
      id: 'boss-greeting',
      name: 'Boss Greeting Generator',
      description: 'Professional festival greetings for management',
      icon: Award,
      category: 'communication',
      keywords: ['boss', 'greeting', 'management', 'professional'],
      url: '/festival-corporate-tools/boss-greeting'
    },
    {
      id: 'email-signature',
      name: 'Corporate E-mail Signature Creator',
      description: 'Festival-themed email signatures',
      icon: Mail,
      category: 'communication',
      keywords: ['email signature', 'corporate', 'festival', 'professional'],
      url: '/festival-corporate-tools/email-signature'
    },
    {
      id: 'linkedin-message',
      name: 'Festival Greeting via LinkedIn Message Generator',
      description: 'Professional LinkedIn festival messages',
      icon: Linkedin,
      category: 'communication',
      keywords: ['linkedin', 'message', 'greeting', 'professional'],
      url: '/festival-corporate-tools/linkedin-message',
      popular: true
    },
    {
      id: 'bulk-sms-greeting',
      name: 'Bulk SMS Greeting Tool',
      description: 'Send bulk festival SMS to employees/clients',
      icon: Smartphone,
      category: 'communication',
      keywords: ['bulk sms', 'greeting', 'mass', 'festival'],
      url: '/festival-corporate-tools/bulk-sms-greeting'
    },
    {
      id: 'digital-card-scheduler',
      name: 'Digital Greeting Card Scheduler',
      description: 'Schedule automated greeting card delivery',
      icon: Calendar,
      category: 'communication',
      keywords: ['digital', 'scheduler', 'greeting card', 'automated'],
      url: '/festival-corporate-tools/digital-card-scheduler'
    },
    {
      id: 'ai-corporate-speech',
      name: 'AI Corporate Speech Generator',
      description: 'Generate festival speeches for executives',
      icon: Mic,
      category: 'communication',
      keywords: ['speech', 'ai', 'corporate', 'executive'],
      url: '/festival-corporate-tools/ai-corporate-speech',
      trending: true
    },
    {
      id: 'zoom-background',
      name: 'Zoom Background Generator for Festivals',
      description: 'Professional festival backgrounds for virtual meetings',
      icon: Video,
      category: 'communication',
      keywords: ['zoom', 'background', 'virtual', 'meeting'],
      url: '/festival-corporate-tools/zoom-background'
    },

    // Corporate Finance
    {
      id: 'company-festival-budget',
      name: 'Company Festival Budget Calculator',
      description: 'Calculate complete corporate festival budget',
      icon: DollarSign,
      category: 'finance',
      keywords: ['budget', 'calculator', 'company', 'corporate'],
      url: '/festival-corporate-tools/company-festival-budget',
      popular: true
    },
    {
      id: 'party-expense-splitter',
      name: 'Office Party Expense Splitter',
      description: 'Split office party costs by department',
      icon: PieChart,
      category: 'finance',
      keywords: ['expense', 'splitter', 'party', 'office'],
      url: '/festival-corporate-tools/party-expense-splitter'
    },
    {
      id: 'csr-donation-tracker',
      name: 'Diwali CSR Donation Tracker',
      description: 'Track corporate social responsibility donations',
      icon: Heart,
      category: 'finance',
      keywords: ['csr', 'donation', 'tracker', 'corporate'],
      url: '/festival-corporate-tools/csr-donation-tracker'
    },
    {
      id: 'csr-report-generator',
      name: 'Festival CSR Report Generator',
      description: 'Generate CSR activity reports for festivals',
      icon: FileText,
      category: 'finance',
      keywords: ['csr', 'report', 'generator', 'festival'],
      url: '/festival-corporate-tools/csr-report-generator'
    },
    {
      id: 'business-discount-coupon',
      name: 'Business Discount Coupon Maker',
      description: 'Create discount coupons for festival offers',
      icon: Award,
      category: 'finance',
      keywords: ['discount', 'coupon', 'business', 'offers'],
      url: '/festival-corporate-tools/business-discount-coupon'
    },
    {
      id: 'office-decoration-planner',
      name: 'Office Decoration Planner',
      description: 'Plan and budget office festival decorations',
      icon: Building,
      category: 'finance',
      keywords: ['decoration', 'planner', 'office', 'budget'],
      url: '/festival-corporate-tools/office-decoration-planner'
    },
    {
      id: 'virtual-celebration-planner',
      name: 'Virtual Team Celebration Planner',
      description: 'Plan remote team festival celebrations',
      icon: Video,
      category: 'finance',
      keywords: ['virtual', 'remote', 'celebration', 'planner'],
      url: '/festival-corporate-tools/virtual-celebration-planner'
    },

    // Marketing & Branding
    {
      id: 'business-offer-banner',
      name: 'Business Offer Banner Creator',
      description: 'Create professional festival offer banners',
      icon: Image,
      category: 'marketing',
      keywords: ['offer', 'banner', 'business', 'marketing'],
      url: '/festival-corporate-tools/business-offer-banner',
      trending: true
    },
    {
      id: 'corporate-reel-script',
      name: 'Corporate Festival Reel Script Generator',
      description: 'AI-generated scripts for business festival Reels',
      icon: Video,
      category: 'marketing',
      keywords: ['reel', 'script', 'corporate', 'ai'],
      url: '/festival-corporate-tools/corporate-reel-script',
      trending: true
    },
    {
      id: 'company-festival-logo',
      name: 'Company Festival Logo Maker',
      description: 'Add festival theme to company logo',
      icon: Sparkles,
      category: 'marketing',
      keywords: ['logo', 'company', 'festival', 'branding'],
      url: '/festival-corporate-tools/company-festival-logo',
      popular: true
    },
    {
      id: 'marketing-campaign-ideas',
      name: 'Marketing Campaign Idea Generator',
      description: 'Generate festival marketing campaign concepts',
      icon: Lightbulb,
      category: 'marketing',
      keywords: ['marketing', 'campaign', 'ideas', 'festival'],
      url: '/festival-corporate-tools/marketing-campaign-ideas',
      popular: true
    },
    {
      id: 'social-media-post',
      name: 'Festival Holiday Social Media Post Generator',
      description: 'Create business social media posts for festivals',
      icon: Hash,
      category: 'marketing',
      keywords: ['social media', 'post', 'generator', 'business'],
      url: '/festival-corporate-tools/social-media-post'
    },
    {
      id: 'company-countdown-widget',
      name: 'Company-Wide Countdown Widget',
      description: 'Embeddable countdown for intranet/website',
      icon: Clock,
      category: 'marketing',
      keywords: ['countdown', 'widget', 'company', 'embed'],
      url: '/festival-corporate-tools/company-countdown-widget'
    },
    {
      id: 'branded-greeting',
      name: 'Wish with Your Logo Generator',
      description: 'Add company logo to festival greetings',
      icon: Award,
      category: 'marketing',
      keywords: ['logo', 'branded', 'greeting', 'company'],
      url: '/festival-corporate-tools/branded-greeting'
    },
    {
      id: 'email-header-festival',
      name: 'Festival Email Header Designer',
      description: 'Design festive email campaign headers',
      icon: Mail,
      category: 'marketing',
      keywords: ['email header', 'designer', 'campaign', 'festival'],
      url: '/festival-corporate-tools/email-header-festival'
    }
  ];

  const filteredTools = useMemo(() => {
    let filtered = corporateTools;

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

  const popularTools = corporateTools.filter(tool => tool.popular);
  const trendingTools = corporateTools.filter(tool => tool.trending);

  return (
    <>
      <SEOHelmet
        title="Corporate & Professional Festival Tools 2025 | Corporate Diwali Wishes, Office Gift Ideas, HR Templates"
        description="45+ corporate festival tools: Corporate Diwali wishes generator, office gift ideas, HR templates, employee engagement, bonus Calculator, business greetings. Professional festival solutions!"
        keywords="corporate diwali wishes, office gift ideas, hr templates, corporate greeting card, festival bonus Calculator, employee gifts, business wishes, professional templates, office party planner"
        url="/festival-corporate-tools"
        type="website"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Festival Tools', url: '/festival-tools' },
          { name: 'Corporate & Professional', url: '/festival-corporate-tools' }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Corporate & Professional Festival Tools",
          description: "Business-focused tools and templates for professional festival workflows.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: corporateTools.length
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-slate-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-slate-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-slate-600 font-medium">Corporate & Professional</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-blue-500/10"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-600 to-blue-600 text-white px-6 py-2 rounded-full mb-6">
                <Briefcase className="w-5 h-5" />
                <span className="font-semibold">45+ Corporate & Professional Tools</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-600 via-gray-700 to-blue-600 bg-clip-text text-transparent">
                Corporate & Professional Festival Tools
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                Professional festival solutions for businesses! Corporate Diwali wishes templates, office gift ideas, HR tools, employee engagement, bonus calculators, and 45+ tools for workplace celebrations.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tools... (e.g., corporate wishes, HR template, bonus)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all shadow-lg"
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
                  {['Corporate Wishes', 'Office Gifts', 'HR Templates', 'Bonus Calculator'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-600 font-medium transition-colors"
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
                <p className="text-gray-700 text-sm">Search tools by role or need. Open a template, customize, and share with your team.</p>
              </div>
              <div className="border rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
                <p className="text-gray-700 text-sm">HR → announcements and calendars. Engagement → gifts and activities. Finance → bonus and CSR tracking.</p>
              </div>
              <div className="border rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
                <p className="text-gray-700 text-sm">Corporate Diwali email → send to clients. Bonus calculator → plan payouts. Offer banners → publish on social.</p>
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
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg"
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
                      ? 'bg-gradient-to-r from-slate-600 to-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-slate-300 hover:shadow-md'
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
                    <Star className="w-6 h-6 text-slate-600" />
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
                          className="block bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-slate-500 hover:border-slate-600 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-gray-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <tool.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 group-hover:text-slate-600 transition-colors mb-1">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Trending Tools */}
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
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
                          className="block bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-blue-500 hover:border-blue-600 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <tool.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
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
                  className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
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
                      className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 hover:border-slate-300 h-full"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-slate-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <tool.icon className="w-7 h-7 text-white" />
                          </div>
                          {tool.popular && (
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                              Popular
                            </span>
                          )}
                          {tool.trending && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-slate-600 transition-colors">
                          {tool.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {tool.description}
                        </p>

                        <div className="flex items-center text-slate-600 font-semibold text-sm group-hover:gap-2 transition-all">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Corporate Festival Tools & Solutions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Use Corporate Festival Tools?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Professional festival management tools help businesses celebrate efficiently:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      Generate corporate Diwali wishes instantly
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      Find perfect office gift ideas within budget
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      Use ready-made HR templates for announcements
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      Calculate festival bonus and tax implications
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      Track employee gifts and engagement
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      Create professional business greetings
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Top Corporate Festival Queries</h3>
                  <div className="bg-slate-50 p-6 rounded-2xl">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center">
                        <Mail className="w-5 h-5 text-slate-600 mr-2" />
                        <span className="font-semibold">Corporate Diwali wishes email template</span>
                      </li>
                      <li className="flex items-center">
                        <Gift className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-semibold">Office gift ideas for employees Diwali</span>
                      </li>
                      <li className="flex items-center">
                        <FileText className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="font-semibold">HR festival announcement template</span>
                      </li>
                      <li className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-semibold">Festival bonus Calculator for employees</span>
                      </li>
                      <li className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span className="font-semibold">Employee engagement ideas for Diwali</span>
                      </li>
                      <li className="flex items-center">
                        <Briefcase className="w-5 h-5 text-teal-600 mr-2" />
                        <span className="font-semibold">Professional Diwali greetings for clients</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Corporate Festival Best Practices</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-6 rounded-2xl">
                  <Mail className="w-10 h-10 text-slate-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Professional Communication</h4>
                  <p className="text-sm text-gray-700">Use our email and message generators for consistent, professional festival communications across all channels.</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl">
                  <Gift className="w-10 h-10 text-blue-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Smart Gifting</h4>
                  <p className="text-sm text-gray-700">Track gifts, poll employees for preferences, and use our AI tool to suggest appropriate gifts within budget.</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
                  <Users className="w-10 h-10 text-indigo-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Employee Engagement</h4>
                  <p className="text-sm text-gray-700">Boost morale with quizzes, recognition programs, and virtual celebrations that keep teams connected.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Corporate Festival Tool Categories</h3>
              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">HR & Templates (10 tools)</h4>
                  <p className="text-gray-700 text-sm">Email generators, greeting templates, holiday announcements, gift policies, calendar sync, attendance trackers, and professional templates.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Employee Engagement (10 tools)</h4>
                  <p className="text-gray-700 text-sm">Bonus calculators, gift trackers, employee polls, recognition programs, engagement ideas, gift AI, potluck planners, and reward systems.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Business Communication (10 tools)</h4>
                  <p className="text-gray-700 text-sm">Greeting cards, Slack messages, newsletters, email signatures, LinkedIn messages, SMS tools, speech generators, and Zoom backgrounds.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Corporate Finance (7 tools)</h4>
                  <p className="text-gray-700 text-sm">Budget calculators, expense splitters, CSR trackers, report generators, coupon makers, decoration planners, and celebration budgeters.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Marketing & Branding (8 tools)</h4>
                  <p className="text-gray-700 text-sm">Offer banners, Reel scripts, company logos, campaign idea generators, social posts, countdown widgets, and email headers.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Office Gift Ideas for Festivals</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Popular office gift ideas for Diwali and festivals include: Dry fruit boxes (₹300-800), Personalized diaries (₹200-500), Gift hampers (₹500-1500), Branded merchandise (₹300-1000), Eco-friendly gifts (₹400-800), Electronics accessories (₹500-2000), Traditional sweets (₹300-700), and Gift vouchers (₹500-5000). Use our "Best Employee Gift Ideas AI Generator" to get personalized suggestions based on your budget, company size, and employee preferences.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">How to write corporate Diwali wishes email?</h4>
                  <p className="text-gray-700 text-sm">Use our Corporate Festival Email Generator for professional templates. Include warm wishes, company values, and holiday schedule. Keep it concise yet heartfelt. Our tool provides customizable templates for employees, clients, and stakeholders.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">What are good office gift ideas for Diwali under ₹500?</h4>
                  <p className="text-gray-700 text-sm">Best options include dry fruit boxes, traditional sweets, desk plants, premium chocolates, personalized keychains, and eco-friendly items. Use our Employee Gift Tracker and AI Gift Generator to find budget-appropriate options.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">How to calculate festival bonus for employees?</h4>
                  <p className="text-gray-700 text-sm">Use our Festival Bonus Calculator which factors in basic salary, grade, performance, and company policy. It automatically calculates tax deductions and net take-home bonus amount for each employee.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">What HR templates are needed for festival season?</h4>
                  <p className="text-gray-700 text-sm">Essential HR templates include: Holiday announcements, Gift policy documents, Bonus letters, Festival greeting emails, Leave policy updates, and Office decoration guidelines. All available in our HR Template Tool.</p>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-slate-600 to-blue-600 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Streamline Your Corporate Festival Celebrations!</h3>
                <p className="mb-6 text-white/90">
                  Make office celebrations professional and efficient with our 45+ corporate tools. From HR templates to employee engagement - everything you need!
                </p>
                <Link
                  to="/festival-tools"
                  className="inline-flex items-center px-6 py-3 bg-white text-slate-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
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

export default CorporateProfessionalTools;

