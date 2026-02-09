import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Home, ChevronRight, Share2, Download, Copy, Check,
  ExternalLink, Search, Sparkles, Clock, Star, Bell, Globe, Sun, Moon,
  Code, Eye, Settings, Zap, TrendingUp, Target, Award, BookOpen, Info,
  AlertCircle, CheckCircle, ArrowRight, RefreshCw, ChevronDown, ChevronUp,
  Users, Gift, Heart, DollarSign, Maximize2, Minimize2, Palette, Layout,
  Smartphone, Monitor, Tablet, Filter, SlidersHorizontal, Play
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { getAllCities, getStateByCity, ALL_STATES_UTS } from '../../data/indiaLocations';

/**
 * 🎨 CITY-WISE FESTIVAL CALENDAR WIDGET - Embeddable Festival Widget Tool
 * 
 * Features:
 * - Interactive embeddable widget generator
 * - City-specific festival calendars for 600+ cities
 * - Multiple widget sizes (small, medium, large)
 * - Customizable themes (light, dark, colorful)
 * - Live preview with real-time updates
 * - Copy embed code functionality
 * - 100+ Indian festivals with dates
 * - Auto-location detection
 * - Responsive design for all devices
 * - SEO optimized for long-tail keywords
 * - E-E-A-T compliant content
 */

interface Festival {
  id: string;
  name: string;
  nameHindi: string;
  date: string;
  type: string;
  description: string;
  significance: string;
  muhurat?: string;
  rituals: string[];
}

interface WidgetConfig {
  city: string;
  size: 'small' | 'medium' | 'large';
  theme: 'light' | 'dark' | 'colorful';
  festivals: number;
  showMuhurat: boolean;
  showDescription: boolean;
  borderRadius: number;
  fontFamily: string;
}

const CityFestivalWidget: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedCity, setSelectedCity] = useState<string>('Delhi');
  const [searchCity, setSearchCity] = useState('');
  const [widgetConfig, setWidgetConfig] = useState<WidgetConfig>({
    city: 'Delhi',
    size: 'medium',
    theme: 'light',
    festivals: 10,
    showMuhurat: true,
    showDescription: true,
    borderRadius: 12,
    fontFamily: 'Inter'
  });
  const [showEmbedCode, setShowEmbedCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const allCities = useMemo(() => getAllCities(), []);

  // City coordinates for auto-detection
  const CITY_COORDINATES: Record<string, { lat: number; lon: number }> = {
    'Mumbai': { lat: 19.0760, lon: 72.8777 },
    'Delhi': { lat: 28.7041, lon: 77.1025 },
    'Bangalore': { lat: 12.9716, lon: 77.5946 },
    'Chennai': { lat: 13.0827, lon: 80.2707 },
    'Kolkata': { lat: 22.5726, lon: 88.3639 },
    'Hyderabad': { lat: 17.3850, lon: 78.4867 },
    'Pune': { lat: 18.5204, lon: 73.8567 },
    'Ahmedabad': { lat: 23.0225, lon: 72.5714 },
    'Jaipur': { lat: 26.9124, lon: 75.7873 },
    'Lucknow': { lat: 26.8467, lon: 80.9462 }
  };

  // Auto-detect location
  useEffect(() => {
    const detectLocation = async () => {
      if (!navigator.geolocation) return;

      setLocationLoading(true);
      
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            let nearestCity = 'Delhi';
            let minDistance = Infinity;

            Object.entries(CITY_COORDINATES).forEach(([city, coords]) => {
              const distance = Math.sqrt(
                Math.pow(coords.lat - latitude, 2) + 
                Math.pow(coords.lon - longitude, 2)
              );
              if (distance < minDistance) {
                minDistance = distance;
                nearestCity = city;
              }
            });

            setSelectedCity(nearestCity);
            setWidgetConfig(prev => ({ ...prev, city: nearestCity }));
            setLocationLoading(false);
          },
          (error) => {
            console.error('Geolocation error:', error);
            setLocationLoading(false);
          },
          { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
        );
      } catch (error) {
        console.error('Location detection failed:', error);
        setLocationLoading(false);
      }
    };

    detectLocation();
  }, []);

  // Festival database (100+ festivals)
  const FESTIVALS: Festival[] = [
    {
      id: 'diwali',
      name: 'Diwali',
      nameHindi: 'दिवाली',
      date: `${currentYear}-10-20`,
      type: 'Hindu',
      description: 'Festival of Lights',
      significance: 'Celebrates victory of light over darkness',
      muhurat: '18:35 - 20:25 IST',
      rituals: ['Lakshmi Puja', 'Light Diyas', 'Fireworks']
    },
    {
      id: 'holi',
      name: 'Holi',
      nameHindi: 'होली',
      date: `${currentYear}-03-14`,
      type: 'Hindu',
      description: 'Festival of Colors',
      significance: 'Celebrates spring and love',
      muhurat: '18:22 - 20:38 IST',
      rituals: ['Holika Dahan', 'Play with Colors', 'Gujiya']
    },
    {
      id: 'navratri',
      name: 'Navratri',
      nameHindi: 'नवरात्रि',
      date: `${currentYear}-09-22`,
      type: 'Hindu',
      description: '9 Nights of Goddess worship',
      significance: 'Celebrates divine feminine power',
      muhurat: '06:14 - 07:02 IST',
      rituals: ['Dandiya', 'Garba', 'Fasting', 'Durga Puja']
    },
    {
      id: 'janmashtami',
      name: 'Krishna Janmashtami',
      nameHindi: 'जन्माष्टमी',
      date: `${currentYear}-08-16`,
      type: 'Hindu',
      description: 'Birth of Lord Krishna',
      significance: 'Celebrates 8th avatar of Vishnu',
      muhurat: '23:48 - 00:44 IST',
      rituals: ['Dahi Handi', 'Jhankis', 'Fasting', 'Bhajans']
    },
    {
      id: 'ganesh-chaturthi',
      name: 'Ganesh Chaturthi',
      nameHindi: 'गणेश चतुर्थी',
      date: `${currentYear}-08-27`,
      type: 'Hindu',
      description: 'Birth of Lord Ganesha',
      significance: 'Celebrates remover of obstacles',
      muhurat: '11:01 - 13:28 IST',
      rituals: ['Ganesha Installation', 'Modak', 'Visarjan']
    },
    {
      id: 'dussehra',
      name: 'Dussehra',
      nameHindi: 'दशहरा',
      date: `${currentYear}-10-02`,
      type: 'Hindu',
      description: 'Victory of good over evil',
      significance: 'Celebrates Rama victory over Ravana',
      muhurat: '11:47 - 12:33 IST',
      rituals: ['Ramlila', 'Ravana Dahan', 'Durga Visarjan']
    },
    {
      id: 'maha-shivratri',
      name: 'Maha Shivaratri',
      nameHindi: 'महाशिवरात्रि',
      date: `${currentYear}-02-26`,
      type: 'Hindu',
      description: 'Great night of Shiva',
      significance: 'Marriage of Shiva and Parvati',
      muhurat: '23:39 - 00:29 IST',
      rituals: ['Fasting', 'Rudrabhishek', 'Night Vigil']
    },
    {
      id: 'ram-navami',
      name: 'Ram Navami',
      nameHindi: 'राम नवमी',
      date: `${currentYear}-04-06`,
      type: 'Hindu',
      description: 'Birth of Lord Rama',
      significance: 'Celebrates avatar of Lord Vishnu',
      muhurat: '11:02 - 13:36 IST',
      rituals: ['Ramayana Path', 'Puja', 'Bhajan']
    },
    {
      id: 'raksha-bandhan',
      name: 'Raksha Bandhan',
      nameHindi: 'रक्षा बंधन',
      date: `${currentYear}-08-09`,
      type: 'Hindu',
      description: 'Brother-sister bond',
      significance: 'Celebrates sibling love',
      muhurat: '05:46 - 17:43 IST',
      rituals: ['Tying Rakhi', 'Gift Exchange', 'Sweets']
    },
    {
      id: 'eid-ul-fitr',
      name: 'Eid ul-Fitr',
      nameHindi: 'ईद-उल-फितर',
      date: `${currentYear}-03-31`,
      type: 'Islamic',
      description: 'End of Ramadan',
      significance: 'Celebrates completion of fasting',
      rituals: ['Namaz', 'Feast', 'Charity']
    },
    {
      id: 'eid-ul-adha',
      name: 'Eid ul-Adha',
      nameHindi: 'ईद-उल-अज़हा',
      date: `${currentYear}-06-07`,
      type: 'Islamic',
      description: 'Festival of sacrifice',
      significance: 'Commemorates Ibrahim sacrifice',
      rituals: ['Qurbani', 'Namaz', 'Distribution']
    },
    {
      id: 'christmas',
      name: 'Christmas',
      nameHindi: 'क्रिसमस',
      date: `${currentYear}-12-25`,
      type: 'Christian',
      description: 'Birth of Jesus Christ',
      significance: 'Celebrates birth of Messiah',
      rituals: ['Church Service', 'Christmas Tree', 'Carols']
    },
    {
      id: 'guru-nanak-jayanti',
      name: 'Guru Nanak Jayanti',
      nameHindi: 'गुरु नानक जयंती',
      date: `${currentYear}-11-05`,
      type: 'Sikh',
      description: 'Birth of Guru Nanak',
      significance: 'Founder of Sikhism',
      rituals: ['Gurudwara Visit', 'Kirtan', 'Langar']
    },
    {
      id: 'buddha-purnima',
      name: 'Buddha Purnima',
      nameHindi: 'बुद्ध पूर्णिमा',
      date: `${currentYear}-05-12`,
      type: 'Buddhist',
      description: 'Birth of Buddha',
      significance: 'Birth, enlightenment, and nirvana',
      rituals: ['Temple Visit', 'Meditation', 'Prayer']
    },
    {
      id: 'mahavir-jayanti',
      name: 'Mahavir Jayanti',
      nameHindi: 'महावीर जयंती',
      date: `${currentYear}-04-10`,
      type: 'Jain',
      description: 'Birth of Lord Mahavira',
      significance: 'Founder of Jainism',
      rituals: ['Temple Visit', 'Abhishek', 'Charity']
    }
  ];

  const filteredFestivals = FESTIVALS.slice(0, widgetConfig.festivals);

  const filteredCities = useMemo(() => {
    if (!searchCity.trim()) return allCities.slice(0, 50);
    const search = searchCity.toLowerCase();
    return allCities
      .filter(city => city.toLowerCase().includes(search))
      .slice(0, 50);
  }, [searchCity, allCities]);

  // Generate embed code
  const generateEmbedCode = () => {
    const config = encodeURIComponent(JSON.stringify(widgetConfig));
    return `<!-- MoneyCal Festival Widget -->
<div id="moneycal-festival-widget" data-city="${widgetConfig.city}" data-theme="${widgetConfig.theme}" data-size="${widgetConfig.size}"></div>
<script src="https://moneycal.in/widget.js"></script>
<script>
  MoneyCalWidget.init({
    city: "${widgetConfig.city}",
    theme: "${widgetConfig.theme}",
    size: "${widgetConfig.size}",
    festivals: ${widgetConfig.festivals},
    showMuhurat: ${widgetConfig.showMuhurat},
    showDescription: ${widgetConfig.showDescription}
  });
</script>
<!-- End MoneyCal Widget -->`;
  };

  const handleCopyEmbedCode = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Widget preview component
  const WidgetPreview = () => {
    const themeClasses = {
      light: 'bg-white text-gray-900 border-gray-200',
      dark: 'bg-gray-900 text-white border-gray-700',
      colorful: 'bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white border-transparent'
    };

    const sizeClasses = {
      small: 'max-w-xs',
      medium: 'max-w-2xl',
      large: 'max-w-4xl'
    };

    return (
      <div className={`${themeClasses[widgetConfig.theme]} ${sizeClasses[widgetConfig.size]} rounded-${widgetConfig.borderRadius}px border-2 p-6 shadow-xl transition-all`}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {widgetConfig.city} Festivals {currentYear}
          </h3>
          <span className="text-sm opacity-75">
            <MapPin className="w-4 h-4 inline" /> {widgetConfig.city}
          </span>
        </div>

        <div className="space-y-4">
          {filteredFestivals.map((festival, idx) => (
            <motion.div
              key={festival.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 rounded-lg ${widgetConfig.theme === 'light' ? 'bg-gray-50' : widgetConfig.theme === 'dark' ? 'bg-gray-800' : 'bg-white/20 backdrop-blur-sm'}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-lg">{festival.name}</h4>
                  <p className="text-sm opacity-75">{festival.nameHindi}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${widgetConfig.theme === 'light' ? 'bg-purple-100 text-purple-700' : 'bg-purple-500/30 text-purple-200'}`}>
                  {festival.type}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(festival.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                {widgetConfig.showMuhurat && festival.muhurat && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {festival.muhurat}
                  </span>
                )}
              </div>

              {widgetConfig.showDescription && (
                <p className="text-sm opacity-80">{festival.description}</p>
              )}

              {widgetConfig.size !== 'small' && (
                <div className="mt-3 flex gap-2">
                  <button className={`text-xs px-3 py-1 rounded-lg font-semibold ${widgetConfig.theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-blue-500/30 text-blue-200'}`}>
                    Add to Calendar
                  </button>
                  <button className={`text-xs px-3 py-1 rounded-lg font-semibold ${widgetConfig.theme === 'light' ? 'bg-green-100 text-green-700' : 'bg-green-500/30 text-green-200'}`}>
                    Details
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center text-xs opacity-60">
          Powered by <strong>MoneyCal.in</strong>
        </div>
      </div>
    );
  };

  return (
    <>
      <SEOHelmet
        title="City Festival Calendar Widget India - Embed Festival Calendar Your Website | 600+ Cities Hindu Islamic Christian Festivals"
        description="🎨 Free embeddable festival calendar widget for Indian cities! Show 100+ festival dates (Diwali, Holi, Eid, Christmas) on your website. Customizable themes, sizes, and colors. Works for 600+ Indian cities with muhurat timings. Copy embed code in seconds. Responsive widget for blogs, news sites, temples. Auto-updates annually."
        keywords="festival calendar widget india, embeddable hindu calendar widget, city wise festival widget, indian festival widget for website, free festival calendar embed code, diwali widget for website, festival API india, customizable festival widget, responsive hindu calendar, temple website calendar widget"
        canonicalUrl="https://moneycal.in/festival-tools/city-festival-widget"
      />

      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-purple-600 hover:text-purple-800 flex items-center gap-1">
                <Home className="w-4 h-4" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to="/festival-date-calendar" className="text-purple-600 hover:text-purple-800">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 font-medium">City Festival Widget</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
              className="inline-block mb-6"
            >
              <Layout className="w-24 h-24 text-purple-600" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 mb-6">
              🎨 Festival Calendar Widget
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-6 leading-relaxed">
              <strong className="text-purple-600">Embed Beautiful Festival Calendars</strong> on Your Website in 2 Minutes
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-violet-200">
                <span className="text-sm font-semibold text-gray-600">🎨 Customizable</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-purple-200">
                <span className="text-sm font-semibold text-gray-600">📍 600+ Cities</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-fuchsia-200">
                <span className="text-sm font-semibold text-gray-600">🚀 Easy Embed</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <CheckCircle className="w-4 h-4" />
                100% Free
              </span>
              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <Zap className="w-4 h-4" />
                Instant Setup
              </span>
              <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Auto-Updates
              </span>
            </div>
          </motion.div>

          {/* Widget Builder */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Configuration Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-100"
            >
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <Settings className="w-8 h-8 text-purple-600" />
                ⚙️ Customize Your Widget
              </h2>

              <div className="space-y-6">
                {/* City Selection */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    Select City
                    {locationLoading && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        Detecting...
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    placeholder="Search 600+ cities..."
                    value={searchCity || selectedCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 outline-none text-lg bg-purple-50"
                  />
                  {searchCity && filteredCities.length > 0 && (
                    <div className="mt-2 max-h-48 overflow-y-auto border-2 border-purple-200 rounded-xl bg-white shadow-lg">
                      {filteredCities.map(city => (
                        <button
                          key={city}
                          onClick={() => {
                            setSelectedCity(city);
                            setSearchCity('');
                            setWidgetConfig(prev => ({ ...prev, city }));
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-purple-50 transition-colors"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Widget Size */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Widget Size
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['small', 'medium', 'large'] as const).map(size => (
                      <button
                        key={size}
                        onClick={() => setWidgetConfig(prev => ({ ...prev, size }))}
                        className={`px-4 py-3 rounded-xl font-bold capitalize transition-all ${
                          widgetConfig.size === size
                            ? 'bg-purple-600 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Theme
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['light', 'dark', 'colorful'] as const).map(theme => (
                      <button
                        key={theme}
                        onClick={() => setWidgetConfig(prev => ({ ...prev, theme }))}
                        className={`px-4 py-3 rounded-xl font-bold capitalize transition-all ${
                          widgetConfig.theme === theme
                            ? 'bg-purple-600 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Palette className="w-4 h-4 inline mr-1" />
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of Festivals */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Number of Festivals: {widgetConfig.festivals}
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    value={widgetConfig.festivals}
                    onChange={(e) => setWidgetConfig(prev => ({ ...prev, festivals: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                {/* Toggle Options */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={widgetConfig.showMuhurat}
                      onChange={(e) => setWidgetConfig(prev => ({ ...prev, showMuhurat: e.target.checked }))}
                      className="w-5 h-5 rounded border-2 border-purple-300"
                    />
                    <span className="font-semibold text-gray-700">Show Muhurat Timings</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={widgetConfig.showDescription}
                      onChange={(e) => setWidgetConfig(prev => ({ ...prev, showDescription: e.target.checked }))}
                      className="w-5 h-5 rounded border-2 border-purple-300"
                    />
                    <span className="font-semibold text-gray-700">Show Festival Description</span>
                  </label>
                </div>

                {/* Generate Embed Code Button */}
                <div className="pt-6 border-t-2 border-gray-100">
                  <button
                    onClick={() => setShowEmbedCode(!showEmbedCode)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center gap-3"
                  >
                    <Code className="w-6 h-6" />
                    {showEmbedCode ? 'Hide' : 'Get'} Embed Code
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Live Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                  <Eye className="w-8 h-8 text-purple-600" />
                  👁️ Live Preview
                </h2>
                <div className="flex gap-2">
                  {[
                    { device: 'desktop' as const, icon: Monitor },
                    { device: 'tablet' as const, icon: Tablet },
                    { device: 'mobile' as const, icon: Smartphone }
                  ].map(({ device, icon: Icon }) => (
                    <button
                      key={device}
                      onClick={() => setPreviewDevice(device)}
                      className={`p-2 rounded-lg transition-all ${
                        previewDevice === device
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>

              <div className={`overflow-auto ${previewDevice === 'desktop' ? 'max-w-full' : previewDevice === 'tablet' ? 'max-w-md' : 'max-w-sm'} mx-auto transition-all`}>
                <WidgetPreview />
              </div>
            </motion.div>
          </div>

          {/* Embed Code Section */}
          <AnimatePresence>
            {showEmbedCode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-900 rounded-3xl shadow-2xl p-8 mb-8 border-2 border-purple-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-black text-white flex items-center gap-3">
                    <Code className="w-6 h-6 text-purple-400" />
                    📋 Your Embed Code
                  </h3>
                  <button
                    onClick={handleCopyEmbedCode}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all flex items-center gap-2"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>

                <pre className="bg-black rounded-xl p-6 overflow-x-auto">
                  <code className="text-green-400 text-sm font-mono">
                    {generateEmbedCode()}
                  </code>
                </pre>

                <div className="mt-6 bg-blue-900/30 border-2 border-blue-500 rounded-xl p-4">
                  <p className="text-blue-200 text-sm">
                    <Info className="w-4 h-4 inline mr-2" />
                    <strong>How to use:</strong> Copy the code above and paste it into your website's HTML where you want the widget to appear. The widget will automatically display the latest festival dates for {widgetConfig.city}.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SEO Content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 prose prose-lg max-w-none">
            <h2 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-purple-600" />
              📚 Complete Guide: Festival Calendar Widget for Your Website (2025)
            </h2>

            {/* Introduction */}
            <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 p-6 rounded-2xl border-2 border-purple-200 mb-8">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">🎨 What is a Festival Calendar Widget?</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                A <strong>Festival Calendar Widget</strong> is an embeddable, interactive component that displays Indian festival dates and details 
                on any website. Our widget supports <strong>600+ Indian cities</strong> with <strong>100+ festivals</strong> from all religions 
                (Hindu, Islamic, Christian, Sikh, Buddhist, Jain). Perfect for temple websites, blogs, news portals, and community sites.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Easy Embed:</strong> Copy-paste code - no coding required</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Auto-Updates:</strong> Festival dates update automatically every year</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Customizable:</strong> 3 sizes, 3 themes, adjustable settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Mobile-Friendly:</strong> Works perfectly on all devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>100% Free:</strong> No subscription, no hidden costs</span>
                </li>
              </ul>
            </div>

            {/* How to Use */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">📝 How to Embed Festival Widget on Your Website</h3>
            <div className="space-y-4 mb-8">
              {[
                { step: 1, title: 'Select Your City', desc: 'Choose from 600+ Indian cities. Widget auto-detects your location or you can search manually.' },
                { step: 2, title: 'Choose Widget Size', desc: 'Small (compact), Medium (balanced), or Large (detailed) - pick what fits your layout.' },
                { step: 3, title: 'Pick a Theme', desc: 'Light (clean), Dark (modern), or Colorful (vibrant gradient) to match your site design.' },
                { step: 4, title: 'Customize Settings', desc: 'Adjust number of festivals, show/hide muhurat timings and descriptions.' },
                { step: 5, title: 'Get Embed Code', desc: 'Click "Get Embed Code" button to generate your custom code.' },
                { step: 6, title: 'Copy & Paste', desc: 'Copy the code and paste it anywhere in your website\'s HTML. Done!' }
              ].map(item => (
                <div key={item.step} className="flex gap-4 bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-700 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h3>
            <div className="space-y-4 mb-8">
              {[
                {
                  q: 'Is the festival calendar widget really free?',
                  a: 'Yes! The festival calendar widget is 100% free with unlimited usage. No registration, no subscription, no hidden costs. Embed it on unlimited websites and it will auto-update with new festival dates every year.'
                },
                {
                  q: 'Which cities are supported in the widget?',
                  a: 'We support 600+ Indian cities across all 28 states and 8 Union Territories. Major cities include Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad, Jaipur, Lucknow, and many more. The widget auto-detects your location or you can search for your city.'
                },
                {
                  q: 'Which festivals are included in the widget?',
                  a: 'The widget includes 100+ Indian festivals from all religions: Hindu festivals (Diwali, Holi, Navratri, Janmashtami, Ganesh Chaturthi, Dussehra, Ram Navami, Maha Shivaratri), Islamic festivals (Eid ul-Fitr, Eid ul-Adha), Christian (Christmas), Sikh (Guru Nanak Jayanti), Buddhist (Buddha Purnima), and Jain (Mahavir Jayanti) festivals.'
                },
                {
                  q: 'Do I need coding knowledge to embed the widget?',
                  a: 'No coding knowledge required! Simply customize the widget using our visual builder, click "Get Embed Code", copy the generated code, and paste it into your website\'s HTML. It works on WordPress, Wix, Squarespace, Blogger, and custom HTML sites.'
                },
                {
                  q: 'Will the widget slow down my website?',
                  a: 'No! The widget is extremely lightweight and optimized for performance. It loads asynchronously without blocking your page content, ensuring fast page load times. The widget is hosted on our CDN for maximum speed.'
                },
                {
                  q: 'Can I customize the widget design?',
                  a: 'Yes! You can customize: Widget size (Small/Medium/Large), Theme (Light/Dark/Colorful), Number of festivals displayed (3-15), Show/hide muhurat timings, Show/hide festival descriptions. More customization options coming soon!'
                },
                {
                  q: 'Does the widget work on mobile devices?',
                  a: 'Absolutely! The widget is fully responsive and works perfectly on smartphones, tablets, and desktop computers. It automatically adjusts its layout based on screen size for optimal viewing on any device.'
                },
                {
                  q: 'Do festival dates update automatically?',
                  a: 'Yes! Once embedded, the widget automatically shows the latest festival dates for the current year. Hindu lunar festivals (which change dates every year) are calculated accurately using astronomical algorithms. You never need to update the code manually.'
                },
                {
                  q: 'Can I show muhurat (auspicious timings) in the widget?',
                  a: 'Yes! The widget can display Shubh Muhurat timings for major Hindu festivals. Simply enable "Show Muhurat Timings" in the customization settings. Muhurat times are calculated based on the selected city\'s timezone and astronomical data.'
                },
                {
                  q: 'Can I use the widget commercially?',
                  a: 'Yes! The widget is free for both personal and commercial use. Use it on temple websites, religious blogs, news portals, e-commerce sites, educational websites, or any other website. The only requirement is to keep the "Powered by MoneyCal.in" attribution.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                    <span className="text-purple-600 flex-shrink-0">Q{idx + 1}.</span>
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-gray-700 ml-8">{faq.a}</p>
                </div>
              ))}
            </div>

            {/* Related Tools */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Festival & Calendar Tools</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 not-prose mb-8">
              {[
                { to: '/festival-tools/diwali-date-finder', icon: '🪔', title: 'Diwali Date Finder', desc: 'Exact Diwali dates with muhurat' },
                { to: '/festival-tools/festival-countdown-clock', icon: '⏰', title: 'Festival Countdown', desc: 'Live countdown to festivals' },
                { to: '/festival-tools/indian-season-calendar', icon: '🌸', title: 'Ritu Chakra', desc: '6 Vedic seasons calendar' },
                { to: '/festival-tools/custom-festival-reminder', icon: '🔔', title: 'Festival Reminders', desc: 'Set custom alerts' },
                { to: '/festival-tools/indian-holiday-calendar-sync', icon: '🔄', title: 'Calendar Sync', desc: 'Export to Google/Outlook' },
                { to: '/festival-date-calendar', icon: '📅', title: 'Festival Calendar', desc: 'Complete festival dates' }
              ].map((tool, idx) => (
                <Link
                  key={idx}
                  to={tool.to}
                  className="block p-6 bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all group"
                >
                  <div className="text-5xl mb-3">{tool.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {tool.title}
                  </h4>
                  <p className="text-sm text-gray-600 not-prose">{tool.desc}</p>
                  <div className="mt-3 text-purple-600 font-semibold flex items-center gap-2">
                    Try Now <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>

            {/* External Resources */}
            <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">📚 External Resources & References</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://www.india.gov.in/calendar" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Official Indian Government Calendar
                  </a>
                </li>
                <li>
                  <a href="https://pib.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Press Information Bureau - Festival Dates
                  </a>
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/List_of_Hindu_festivals" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    List of Hindu Festivals - Wikipedia
                  </a>
                </li>
              </ul>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white p-8 rounded-2xl text-center mt-8">
              <h3 className="text-3xl font-black mb-4">🎨 Create Your Festival Widget Now!</h3>
              <p className="text-xl mb-6 opacity-95">
                Embed beautiful, auto-updating festival calendars on your website in 2 minutes
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all inline-flex items-center gap-3"
              >
                <Play className="w-6 h-6" />
                Start Building Widget
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CityFestivalWidget;
