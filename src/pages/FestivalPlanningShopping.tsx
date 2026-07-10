import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag, Search, Filter, Gift, Sparkles, Tag, Bell,
  Home, ChevronRight, X, TrendingUp, Star, DollarSign,
  CreditCard, Calculator, Palette, Percent, ShoppingCart,
  Package, Heart, Users, Camera, MessageCircle, Mail,
  MapPin, TrendingDown, Clock, Target, Lightbulb, ArrowRight, IndianRupee } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

interface ShoppingTool {
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

const FestivalPlanningShopping: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Tools', icon: ShoppingBag, count: 50 },
    { id: 'budget', name: 'Budget & Planning', icon: IndianRupee, count: 8 },
    { id: 'shopping', name: 'Shopping & Deals', icon: ShoppingCart, count: 12 },
    { id: 'gifts', name: 'Gifts & Cards', icon: Gift, count: 10 },
    { id: 'decoration', name: 'Decoration & Design', icon: Palette, count: 7 },
    { id: 'offers', name: 'Offers & Cashback', icon: Percent, count: 9 },
    { id: 'tracking', name: 'Price Tracking', icon: TrendingDown, count: 4 }
  ];

  const shoppingTools: ShoppingTool[] = [
    // Budget & Planning Tools
    {
      id: 'festival-budget-planner',
      name: 'Festival Budget Planner',
      description: 'Plan complete festival budget across gifts, shopping, food, and decoration',
      icon: IndianRupee,
      category: 'budget',
      keywords: ['budget', 'planner', 'expense', 'diwali budget'],
      url: '/festival-tools/festival-budget-planner',
      popular: true,
      trending: true
    },
    {
      id: 'diwali-expense-tracker',
      name: 'Diwali Expense Tracker',
      description: 'Track all Diwali expenses with category-wise breakdown and analytics',
      icon: DollarSign,
      category: 'budget',
      keywords: ['diwali', 'expense', 'tracker', 'spending'],
      url: '/festival-tools/diwali-expense-tracker',
      popular: true
    },
    {
      id: 'festival-emi-calculator',
      name: 'Festival EMI Calculator',
      description: 'Calculate EMI for festival shopping loans and credit card purchases',
      icon: CreditCard,
      category: 'budget',
      keywords: ['emi', 'loan', 'credit card', 'festival shopping'],
      url: '/festival-tools/festival-emi-calculator',
      popular: true
    },
    {
      id: 'gifting-budget-splitter',
      name: 'Gifting Budget Splitter',
      description: 'Split gift budget across family, friends, and colleagues',
      icon: Users,
      category: 'budget',
      keywords: ['gift budget', 'split', 'family', 'friends'],
      url: '/festival-tools/gifting-budget-splitter'
    },
    {
      id: 'diwali-bonus-calculator',
      name: 'Diwali Bonus Salary Calculator',
      description: 'Calculate take-home bonus after tax deductions for festival shopping',
      icon: DollarSign,
      category: 'budget',
      keywords: ['bonus', 'salary', 'diwali', 'tax'],
      url: '/festival-tools/diwali-bonus-calculator'
    },
    {
      id: 'emi-friendly-budget',
      name: 'EMI-Friendly Shopping Budget Tool',
      description: 'Plan festival shopping within EMI affordability limits',
      icon: IndianRupee,
      category: 'budget',
      keywords: ['emi', 'affordability', 'budget', 'shopping'],
      url: '/festival-tools/emi-friendly-budget'
    },
    {
      id: 'festival-expense-splitter',
      name: 'Festival Expense Splitter with Friends',
      description: 'Split party and celebration costs among friends',
      icon: Users,
      category: 'budget',
      keywords: ['expense split', 'friends', 'party', 'group'],
      url: '/festival-tools/festival-expense-splitter'
    },
    {
      id: 'wedding-season-planner',
      name: 'Wedding Season Shopping Planner',
      description: 'Plan wedding season gift and outfit shopping budget',
      icon: Heart,
      category: 'budget',
      keywords: ['wedding', 'season', 'shopping', 'gifts'],
      url: '/festival-tools/wedding-season-planner'
    },

    // Shopping & Deals Tools
    {
      id: 'holi-color-shopping',
      name: 'Holi Color Shopping List Generator',
      description: 'Generate complete shopping list for Holi colors, water balloons, and snacks',
      icon: ShoppingCart,
      category: 'shopping',
      keywords: ['holi', 'colors', 'shopping list', 'water balloons'],
      url: '/festival-tools/holi-color-shopping',
      popular: true,
      trending: true
    },
    {
      id: 'puja-samagri-checklist',
      name: 'Puja Samagri Checklist Generator',
      description: 'Complete checklist of puja items for any festival with prices',
      icon: Package,
      category: 'shopping',
      keywords: ['puja', 'samagri', 'checklist', 'items'],
      url: '/festival-tools/puja-samagri-checklist',
      popular: true
    },
    {
      id: 'firecracker-cost-calculator',
      name: 'Firecracker Cost Calculator',
      description: 'Calculate total firecracker budget with safety recommendations',
      icon: Sparkles,
      category: 'shopping',
      keywords: ['firecracker', 'crackers', 'diwali', 'cost'],
      url: '/festival-tools/firecracker-cost-calculator'
    },
    {
      id: 'festival-price-comparison',
      name: 'Festival Price Comparison Tool',
      description: 'Compare prices across Amazon, Flipkart, and local stores',
      icon: Tag,
      category: 'shopping',
      keywords: ['price comparison', 'amazon', 'flipkart', 'best price'],
      url: '/festival-tools/festival-price-comparison',
      popular: true
    },
    {
      id: 'amazon-deal-finder',
      name: 'Best Amazon Festival Deal Finder',
      description: 'Find best Amazon Great Indian Festival deals and offers',
      icon: ShoppingBag,
      category: 'shopping',
      keywords: ['amazon', 'deals', 'offers', 'great indian festival'],
      url: '/festival-tools/amazon-deal-finder',
      trending: true
    },
    {
      id: 'local-sweet-shop',
      name: 'Local Sweet Shop Finder',
      description: 'Find nearby sweet shops with ratings and festival special menu',
      icon: MapPin,
      category: 'shopping',
      keywords: ['sweet shop', 'local', 'mithai', 'nearby'],
      url: '/festival-tools/local-sweet-shop'
    },
    {
      id: 'festival-grocery-list',
      name: 'Festival Grocery List Tool',
      description: 'Smart grocery list for festival cooking and preparations',
      icon: ShoppingCart,
      category: 'shopping',
      keywords: ['grocery', 'list', 'shopping', 'festival'],
      url: '/festival-tools/festival-grocery-list'
    },
    {
      id: 'saree-offers-finder',
      name: 'Best Saree Offers Finder',
      description: 'Find best saree and ethnic wear deals for festivals',
      icon: Tag,
      category: 'shopping',
      keywords: ['saree', 'ethnic wear', 'offers', 'deals'],
      url: '/festival-tools/saree-offers-finder'
    },
    {
      id: 'bulk-gift-estimator',
      name: 'Bulk Gift Price Estimator',
      description: 'Estimate cost for bulk corporate gifts and party favors',
      icon: Package,
      category: 'shopping',
      keywords: ['bulk', 'corporate gifts', 'wholesale', 'price'],
      url: '/festival-tools/bulk-gift-estimator'
    },
    {
      id: 'local-handicraft-locator',
      name: 'Local Handicraft Store Locator',
      description: 'Find local handicraft and traditional item stores',
      icon: MapPin,
      category: 'shopping',
      keywords: ['handicraft', 'local', 'traditional', 'store'],
      url: '/festival-tools/local-handicraft-locator'
    },
    {
      id: 'clothing-color-theme',
      name: 'Clothing Color Theme Picker',
      description: 'Pick perfect color combinations for festival outfits',
      icon: Palette,
      category: 'shopping',
      keywords: ['clothing', 'color', 'theme', 'outfit'],
      url: '/festival-tools/clothing-color-theme'
    },
    {
      id: 'festival-mega-sale-tracker',
      name: 'Festival Mega Sale Tracker',
      description: 'Track all major e-commerce festival sales in one place',
      icon: TrendingUp,
      category: 'shopping',
      keywords: ['sale', 'tracker', 'ecommerce', 'mega sale'],
      url: '/festival-tools/festival-mega-sale-tracker'
    },

    // Gifts & Cards Tools
    {
      id: 'rakhi-gift-finder',
      name: 'Rakhi Gift Finder',
      description: 'Find perfect Rakhi gifts based on age, relation, and budget',
      icon: Gift,
      category: 'gifts',
      keywords: ['rakhi', 'gift', 'brother', 'sister'],
      url: '/festival-tools/rakhi-gift-finder',
      popular: true
    },
    {
      id: 'gift-combo-maker',
      name: 'Festival Gift Combo Maker',
      description: 'Create attractive gift combos within budget',
      icon: Package,
      category: 'gifts',
      keywords: ['gift combo', 'hamper', 'festival', 'basket'],
      url: '/festival-tools/gift-combo-maker',
      popular: true
    },
    {
      id: 'return-gift-generator',
      name: 'Return Gift Idea Generator',
      description: 'Creative return gift ideas for parties and gatherings',
      icon: Gift,
      category: 'gifts',
      keywords: ['return gift', 'party', 'ideas', 'guests'],
      url: '/festival-tools/return-gift-generator'
    },
    {
      id: 'personalized-card-creator',
      name: 'Personalized Greeting Card Creator',
      description: 'Design custom festival greeting cards with your photos',
      icon: Camera,
      category: 'gifts',
      keywords: ['greeting card', 'personalized', 'custom', 'design'],
      url: '/festival-tools/personalized-card-creator'
    },
    {
      id: 'invitation-card-generator',
      name: 'Invitation Card Generator',
      description: 'Create beautiful festival party invitation cards',
      icon: Mail,
      category: 'gifts',
      keywords: ['invitation', 'card', 'party', 'festival'],
      url: '/festival-tools/invitation-card-generator'
    },
    {
      id: 'whatsapp-status-generator',
      name: 'WhatsApp Festival Status Generator',
      description: 'Create festive WhatsApp status with quotes and images',
      icon: MessageCircle,
      category: 'gifts',
      keywords: ['whatsapp', 'status', 'festival', 'quotes'],
      url: '/festival-tools/whatsapp-status-generator'
    },
    {
      id: 'gift-zodiac-suggestor',
      name: 'Gift by Zodiac Sign Suggestor',
      description: 'Suggest gifts based on recipient\'s zodiac sign',
      icon: Star,
      category: 'gifts',
      keywords: ['zodiac', 'astrology', 'gift', 'horoscope'],
      url: '/festival-tools/gift-zodiac-suggestor'
    },
    {
      id: 'photo-frame-maker',
      name: 'Personalized Photo Frame Maker',
      description: 'Create custom photo frames for festival gifts',
      icon: Camera,
      category: 'gifts',
      keywords: ['photo frame', 'personalized', 'custom', 'picture'],
      url: '/festival-tools/photo-frame-maker'
    },
    {
      id: 'egift-card-maker',
      name: 'Custom E-Gift Card Maker',
      description: 'Design and send digital gift cards for festivals',
      icon: CreditCard,
      category: 'gifts',
      keywords: ['gift card', 'digital', 'egift', 'voucher'],
      url: '/festival-tools/egift-card-maker'
    },
    {
      id: 'group-gift-organizer',
      name: 'Group Gift Organizer',
      description: 'Organize group gifts with contribution tracking',
      icon: Users,
      category: 'gifts',
      keywords: ['group gift', 'organize', 'contribution', 'collective'],
      url: '/festival-tools/group-gift-organizer'
    },

    // Decoration & Design Tools
    {
      id: 'festival-decoration-planner',
      name: 'Festival Decoration Planner',
      description: 'Plan home decoration with theme, budget, and shopping list',
      icon: Palette,
      category: 'decoration',
      keywords: ['decoration', 'diwali decor', 'home', 'planning'],
      url: '/festival-tools/festival-decoration-planner',
      popular: true
    },
    {
      id: 'lighting-layout-designer',
      name: 'Diwali Lighting Layout Designer',
      description: 'Design lighting arrangement for home with 3D preview',
      icon: Lightbulb,
      category: 'decoration',
      keywords: ['lighting', 'diwali', 'design', 'layout'],
      url: '/festival-tools/lighting-layout-designer',
      trending: true
    },
    {
      id: 'lantern-diy-guide',
      name: 'Lantern DIY Guide Tool',
      description: 'Step-by-step guide to make DIY lanterns and decorations',
      icon: Sparkles,
      category: 'decoration',
      keywords: ['diy', 'lantern', 'craft', 'handmade'],
      url: '/festival-tools/lantern-diy-guide'
    },
    {
      id: 'home-cleaning-planner',
      name: 'Festival Home Cleaning Planner',
      description: 'Room-by-room cleaning checklist for festival preparations',
      icon: Home,
      category: 'decoration',
      keywords: ['cleaning', 'checklist', 'home', 'preparation'],
      url: '/festival-tools/home-cleaning-planner'
    },
    {
      id: 'puja-thali-visualizer',
      name: 'Puja Thali Setup Visualizer',
      description: 'Visualize and design traditional puja thali arrangement',
      icon: Palette,
      category: 'decoration',
      keywords: ['puja thali', 'design', 'arrangement', 'setup'],
      url: '/festival-tools/puja-thali-visualizer'
    },
    {
      id: 'festival-poster-maker',
      name: 'Festival Poster Maker',
      description: 'Create stunning festival posters for social media',
      icon: Camera,
      category: 'decoration',
      keywords: ['poster', 'social media', 'design', 'festival'],
      url: '/festival-tools/festival-poster-maker'
    },
    {
      id: 'decoration-cost-estimator',
      name: 'Festival Decoration Cost Estimator',
      description: 'Estimate total decoration cost with item-wise breakdown',
      icon: IndianRupee,
      category: 'decoration',
      keywords: ['decoration', 'cost', 'estimate', 'budget'],
      url: '/festival-tools/decoration-cost-estimator'
    },

    // Offers & Cashback Tools
    {
      id: 'diwali-offer-aggregator',
      name: 'Diwali Offer Aggregator',
      description: 'All Diwali offers from banks, e-commerce, and retailers in one place',
      icon: Percent,
      category: 'offers',
      keywords: ['diwali offers', 'deals', 'aggregator', 'all offers'],
      url: '/festival-tools/diwali-offer-aggregator',
      popular: true,
      trending: true
    },
    {
      id: 'discount-notifier',
      name: 'Festival Product Discount Notifier',
      description: 'Get alerts when products you want go on discount',
      icon: Bell,
      category: 'offers',
      keywords: ['discount', 'notifier', 'alert', 'price drop'],
      url: '/festival-tools/discount-notifier'
    },
    {
      id: 'shopping-coupon-collector',
      name: 'Festival Shopping Coupon Collector',
      description: 'Collect and organize all festival shopping coupons',
      icon: Tag,
      category: 'offers',
      keywords: ['coupon', 'promo code', 'discount code', 'collector'],
      url: '/festival-tools/shopping-coupon-collector'
    },
    {
      id: 'best-deal-brand',
      name: 'Best Deal by Brand Tool',
      description: 'Find best deals sorted by your favorite brands',
      icon: TrendingUp,
      category: 'offers',
      keywords: ['brand', 'deals', 'best offer', 'brand-wise'],
      url: '/festival-tools/best-deal-brand'
    },
    {
      id: 'cashback-finder',
      name: 'Cashback Finder for Festival Shopping',
      description: 'Find maximum cashback offers across all payment methods',
      icon: DollarSign,
      category: 'offers',
      keywords: ['cashback', 'offers', 'payment', 'rewards'],
      url: '/festival-tools/cashback-finder',
      popular: true
    },
    {
      id: 'best-credit-card-offers',
      name: 'Best Credit Card for Festival Offers',
      description: 'Compare credit card offers for festival shopping',
      icon: CreditCard,
      category: 'offers',
      keywords: ['credit card', 'offers', 'comparison', 'best card'],
      url: '/festival-tools/best-credit-card-offers'
    },
    {
      id: 'cashback-tracker',
      name: 'Cashback Tracker',
      description: 'Track all cashback earned during festival shopping',
      icon: DollarSign,
      category: 'offers',
      keywords: ['cashback', 'tracker', 'rewards', 'earnings'],
      url: '/festival-tools/cashback-tracker'
    },
    {
      id: 'offer-expiry-reminder',
      name: 'Offer Expiry Reminder Tool',
      description: 'Get reminders before festival offers expire',
      icon: Clock,
      category: 'offers',
      keywords: ['offer', 'expiry', 'reminder', 'deadline'],
      url: '/festival-tools/offer-expiry-reminder'
    },
    {
      id: 'brand-offer-hub',
      name: 'Brand-specific Festival Offer Hub',
      description: 'All offers from specific brands in one dashboard',
      icon: Target,
      category: 'offers',
      keywords: ['brand', 'offers', 'hub', 'specific'],
      url: '/festival-tools/brand-offer-hub'
    },

    // Price Tracking Tools
    {
      id: 'dhanteras-gold-tracker',
      name: 'Dhanteras Gold Price Tracker',
      description: 'Track real-time gold prices for Dhanteras shopping',
      icon: TrendingDown,
      category: 'tracking',
      keywords: ['gold', 'price', 'dhanteras', 'tracker'],
      url: '/festival-tools/dhanteras-gold-tracker',
      popular: true,
      trending: true
    },
    {
      id: 'price-trend-analyzer',
      name: 'Price Trend Analyzer',
      description: 'Analyze historical price trends for smart festival shopping',
      icon: TrendingDown,
      category: 'tracking',
      keywords: ['price trend', 'analysis', 'history', 'chart'],
      url: '/festival-tools/price-trend-analyzer'
    },
    {
      id: 'gadget-price-alert',
      name: 'Price Drop Alert for Festival Gadgets',
      description: 'Track and get alerts for electronics and gadget price drops',
      icon: Bell,
      category: 'tracking',
      keywords: ['gadget', 'electronics', 'price drop', 'alert'],
      url: '/festival-tools/gadget-price-alert'
    },
    {
      id: 'personalized-gift-chatbot',
      name: 'Personalized Gift Idea Chatbot',
      description: 'AI chatbot suggests personalized gifts based on preferences',
      icon: MessageCircle,
      category: 'gifts',
      keywords: ['ai', 'chatbot', 'gift ideas', 'personalized'],
      url: '/festival-tools/personalized-gift-chatbot',
      trending: true
    }
  ];

  const filteredTools = useMemo(() => {
    let filtered = shoppingTools;

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

  const popularTools = shoppingTools.filter(tool => tool.popular);
  const trendingTools = shoppingTools.filter(tool => tool.trending);

  return (
    <>
      <SEOHelmet
        title="Festival Planning & Shopping Tools 2025 | Diwali Gift Ideas, Holi Decor, Budget Planner"
        description="Plan festival shopping with 50+ tools: Diwali gift ideas, Holi decoration planner, festival budget Calculator, best deals finder, cashback tracker. Find gifts, offers, and save money!"
        keywords="diwali gift ideas, holi decoration, festival shopping planner, festival budget planner, diwali offers, festival deals, rakhi gifts, puja samagri, diwali bonus Calculator, amazon festival sale"
        url="/festival-shopping"
        type="website"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Festival Tools', url: '/festival-tools' },
          { name: 'Festival Shopping', url: '/festival-shopping' }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Festival Planning & Shopping Tools",
          description: "Shopping planners, gift finders, decor tools, and budget calculators.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: shoppingTools.length
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-pink-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-pink-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-pink-600 font-medium">Festival Shopping</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-full mb-6">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-semibold">50+ Festival Shopping Tools</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Festival Planning & Shopping Tools
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                Smart tools for festival shopping! Find Diwali gift ideas, Holi decoration planners, budget calculators, best deals, cashback offers, and save money on every festival celebration.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tools... (e.g., Diwali gifts, budget planner, deals)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all shadow-lg"
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
                  {['Diwali Gifts', 'Budget Planner', 'Holi Decor', 'Best Deals'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1 bg-white hover:bg-pink-50 border border-pink-200 rounded-full text-sm text-pink-600 font-medium transition-colors"
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
                <p className="text-gray-700 text-sm">Start with a budget planner, shortlist gifts by person and price, then track deals and cashback.</p>
              </div>
              <div className="border rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
                <p className="text-gray-700 text-sm">Gifts → recipient and budget. Decor → festival theme. Savings → offers, coupons, and cashback.</p>
              </div>
              <div className="border rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
                <p className="text-gray-700 text-sm">Diwali gifts under ₹1000 → compare options. Holi decor → buy list. Best deals → track and checkout.</p>
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
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-lg"
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
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-pink-300 hover:shadow-md'
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
                    <Star className="w-6 h-6 text-pink-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Most Popular</h2>
                  </div>
                  <div className="space-y-4">
                    {popularTools.slice(0, 6).map((tool, index) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, x: -20 }}
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

                {/* Trending Tools */}
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
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
                          className="block bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-purple-500 hover:border-purple-600 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
                  className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
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
                      className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 hover:border-pink-300 h-full"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <tool.icon className="w-7 h-7 text-white" />
                          </div>
                          {tool.popular && (
                            <span className="px-2 py-1 bg-pink-100 text-pink-600 text-xs font-bold rounded-full">
                              Popular
                            </span>
                          )}
                          {tool.trending && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-bold rounded-full flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                          {tool.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {tool.description}
                        </p>

                        <div className="flex items-center text-pink-600 font-semibold text-sm group-hover:gap-2 transition-all">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Festival Planning & Shopping</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Use Festival Shopping Tools?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Festival shopping can be overwhelming and expensive. Our smart planning tools help you:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">✓</span>
                      Plan complete festival budget and track expenses
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">✓</span>
                      Find best Diwali gift ideas within your budget
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">✓</span>
                      Discover Holi decoration ideas and DIY guides
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">✓</span>
                      Compare prices and find best festival deals
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">✓</span>
                      Track cashback and maximize savings
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">✓</span>
                      Create personalized cards and invitations
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Top Festival Shopping Queries</h3>
                  <div className="bg-pink-50 p-6 rounded-2xl">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center">
                        <ShoppingBag className="w-5 h-5 text-pink-600 mr-2" />
                        <span className="font-semibold">Diwali gift ideas under ₹500</span>
                      </li>
                      <li className="flex items-center">
                        <Palette className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="font-semibold">Holi decoration ideas for home</span>
                      </li>
                      <li className="flex items-center">
                        <IndianRupee className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-semibold">Festival budget planner Excel</span>
                      </li>
                      <li className="flex items-center">
                        <Tag className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-semibold">Amazon Great Indian Festival deals</span>
                      </li>
                      <li className="flex items-center">
                        <Gift className="w-5 h-5 text-orange-600 mr-2" />
                        <span className="font-semibold">Rakhi gifts for brother under ₹1000</span>
                      </li>
                      <li className="flex items-center">
                        <DollarSign className="w-5 h-5 text-teal-600 mr-2" />
                        <span className="font-semibold">Best cashback offers for festival shopping</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Festival Shopping Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl">
                  <IndianRupee className="w-10 h-10 text-pink-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Plan Your Budget</h4>
                  <p className="text-sm text-gray-700">Set a realistic budget and track expenses category-wise to avoid overspending during festivals.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl">
                  <Tag className="w-10 h-10 text-purple-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Hunt for Deals</h4>
                  <p className="text-sm text-gray-700">Compare prices across platforms and use cashback offers to maximize savings on festival shopping.</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-6 rounded-2xl">
                  <Gift className="w-10 h-10 text-blue-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Smart Gifting</h4>
                  <p className="text-sm text-gray-700">Use our gift finders to discover thoughtful, budget-friendly gifts that suit every relationship.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Festival Shopping Categories</h3>
              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Budget & Planning (8 tools)</h4>
                  <p className="text-gray-700 text-sm">Festival Budget Planner, Expense Tracker, EMI Calculator, Gifting Budget Splitter, Bonus Calculator, and more financial planning tools.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Shopping & Deals (12 tools)</h4>
                  <p className="text-gray-700 text-sm">Price comparison, deal finders, shopping lists for Holi colors, puja samagri, groceries, local store locators, and bulk purchase estimators.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Gifts & Cards (10 tools)</h4>
                  <p className="text-gray-700 text-sm">Gift finders, combo makers, personalized cards, invitations, WhatsApp status, zodiac gift suggestions, photo frames, and group gift organizers.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Decoration & Design (7 tools)</h4>
                  <p className="text-gray-700 text-sm">Decoration planners, lighting designers, DIY guides, cleaning checklists, puja thali visualizers, poster makers, and cost estimators.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Offers & Cashback (9 tools)</h4>
                  <p className="text-gray-700 text-sm">Offer aggregators, discount notifiers, coupon collectors, cashback finders, credit card comparisons, and offer expiry reminders.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Price Tracking (4 tools)</h4>
                  <p className="text-gray-700 text-sm">Gold price tracker for Dhanteras, price trend analyzers, gadget price alerts, and personalized gift chatbot with AI recommendations.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">How can I save money on festival shopping?</h4>
                  <p className="text-gray-700 text-sm">Use our budget planner to set limits, compare prices across platforms, track cashback offers, buy in bulk where possible, and shop during early bird sales for maximum discounts.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">What are the best Diwali gift ideas under ₹1000?</h4>
                  <p className="text-gray-700 text-sm">Popular options include dry fruit boxes, personalized photo frames, traditional puja items, decorative diyas, ethnic wear accessories, smart home gadgets, and gift hampers. Use our Gift Finder tool for personalized suggestions.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">How to plan Holi decoration on a budget?</h4>
                  <p className="text-gray-700 text-sm">Use our Decoration Planner to create a budget-friendly setup with DIY elements, reusable items, and smart shopping. Focus on colorful fabrics, homemade rangoli, and natural decorations.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Which credit card offers best festival cashback?</h4>
                  <p className="text-gray-700 text-sm">Use our Credit Card Comparison tool to find cards with maximum festival cashback. Top cards offer 5-10% cashback on specific categories during festival seasons.</p>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-pink-600 to-purple-600 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Start Planning Your Festival Shopping Today!</h3>
                <p className="mb-6 text-white/90">
                  Save money, find perfect gifts, discover best deals, and make every festival celebration memorable with our 50+ smart planning tools!
                </p>
                <Link
                  to="/festival-tools"
                  className="inline-flex items-center px-6 py-3 bg-white text-pink-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
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

export default FestivalPlanningShopping;

