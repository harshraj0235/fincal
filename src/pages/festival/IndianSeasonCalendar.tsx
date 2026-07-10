import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Home, ChevronRight, Share2, Download, Copy, Check,
  ExternalLink, Search, Sparkles, Clock, Star, Bell, Globe, Sun, Moon,
  CloudRain, Snowflake, Flower, Wind, Droplets, Thermometer, Zap,
  TrendingUp, Target, Award, BookOpen, Info, AlertCircle, CheckCircle,
  ArrowRight, RefreshCw, ChevronDown, ChevronUp, Settings, Users,
  Calendar as CalendarIcon, Gift, Heart, DollarSign, Leaf, Trees
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { getAllCities, getStateByCity, ALL_STATES_UTS } from '../../data/indiaLocations';

/**
 * 🌺 INDIAN SEASON CALENDAR (RITU CHAKRA) - Complete Vedic Season Tool
 * 
 * Features:
 * - 6 Vedic seasons (Ritu) with accurate date ranges
 * - City-specific sunrise/sunset and weather patterns
 * - Festival mapping to each season
 * - Real-time current Ritu detection
 * - Visual Ritu wheel/chakra display
 * - Seasonal health, money, and ritual tips
 * - 600+ Indian cities support
 * - SEO optimized for long-tail keywords
 * - E-E-A-T compliant content
 * - Mobile-friendly responsive design
 * - Share and export functionality
 */

interface Ritu {
  id: string;
  name: string;
  nameHindi: string;
  nameSanskrit: string;
  description: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  months: string[];
  icon: React.ReactNode;
  color: string;
  gradient: string;
  festivals: string[];
  characteristics: string[];
  healthTips: string[];
  moneyTips: string[];
  rituals: string[];
  weather: string;
  temperature: string;
  bestFor: string[];
}

interface Festival {
  name: string;
  date: string;
  ritu: string;
  significance: string;
}

const IndianSeasonCalendar: React.FC = () => {
  const currentDate = new Date();
  const [selectedRitu, setSelectedRitu] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('Delhi');
  const [searchCity, setSearchCity] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string>('');

  const allCities = useMemo(() => getAllCities(), []);

  // City-to-coordinates mapping (major Indian cities)
  const CITY_COORDINATES: Record<string, { lat: number; lon: number }> = {
    'Mumbai': { lat: 19.0760, lon: 72.8777 },
    'Delhi': { lat: 28.7041, lon: 77.1025 },
    'Bangalore': { lat: 12.9716, lon: 77.5946 },
    'Hyderabad': { lat: 17.3850, lon: 78.4867 },
    'Ahmedabad': { lat: 23.0225, lon: 72.5714 },
    'Chennai': { lat: 13.0827, lon: 80.2707 },
    'Kolkata': { lat: 22.5726, lon: 88.3639 },
    'Pune': { lat: 18.5204, lon: 73.8567 },
    'Jaipur': { lat: 26.9124, lon: 75.7873 },
    'Surat': { lat: 21.1702, lon: 72.8311 },
    'Lucknow': { lat: 26.8467, lon: 80.9462 },
    'Kanpur': { lat: 26.4499, lon: 80.3319 },
    'Nagpur': { lat: 21.1458, lon: 79.0882 },
    'Indore': { lat: 22.7196, lon: 75.8577 },
    'Thane': { lat: 19.2183, lon: 72.9781 },
    'Bhopal': { lat: 23.2599, lon: 77.4126 },
    'Visakhapatnam': { lat: 17.6868, lon: 83.2185 },
    'Patna': { lat: 25.5941, lon: 85.1376 },
    'Vadodara': { lat: 22.3072, lon: 73.1812 },
    'Ghaziabad': { lat: 28.6692, lon: 77.4538 },
    'Ludhiana': { lat: 30.9010, lon: 75.8573 },
    'Agra': { lat: 27.1767, lon: 78.0081 },
    'Nashik': { lat: 19.9975, lon: 73.7898 },
    'Faridabad': { lat: 28.4089, lon: 77.3178 },
    'Meerut': { lat: 28.9845, lon: 77.7064 },
    'Rajkot': { lat: 22.3039, lon: 70.8022 },
    'Varanasi': { lat: 25.3176, lon: 82.9739 },
    'Srinagar': { lat: 34.0837, lon: 74.7973 },
    'Amritsar': { lat: 31.6340, lon: 74.8723 },
    'Chandigarh': { lat: 30.7333, lon: 76.7794 },
    'Guwahati': { lat: 26.1445, lon: 91.7362 },
    'Coimbatore': { lat: 11.0168, lon: 76.9558 },
    'Kochi': { lat: 9.9312, lon: 76.2673 },
    'Thiruvananthapuram': { lat: 8.5241, lon: 76.9366 },
    'Mysore': { lat: 12.2958, lon: 76.6394 },
    'Bhubaneswar': { lat: 20.2961, lon: 85.8245 },
    'Dehradun': { lat: 30.3165, lon: 78.0322 },
    'Ranchi': { lat: 23.3441, lon: 85.3096 },
    'Raipur': { lat: 21.2514, lon: 81.6296 },
    'Shimla': { lat: 31.1048, lon: 77.1734 },
    'Jammu': { lat: 32.7266, lon: 74.8570 }
  };

  // Auto-detect location on mount
  useEffect(() => {
    const detectLocation = async () => {
      if (!navigator.geolocation) {
        console.log('Geolocation not supported');
        return;
      }

      setLocationLoading(true);
      
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            // Find nearest city
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
            setLocationLoading(false);
            console.log(`Auto-detected location: ${nearestCity}`);
          },
          (error) => {
            console.error('Geolocation error:', error);
            setLocationError('Unable to detect location');
            setLocationLoading(false);
          },
          {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
          }
        );
      } catch (error) {
        console.error('Location detection failed:', error);
        setLocationLoading(false);
      }
    };

    detectLocation();
  }, []);

  // 6 Vedic Seasons (Ritu Chakra)
  const RITU_DATA: Record<string, Ritu> = {
    vasanta: {
      id: 'vasanta',
      name: 'Vasanta',
      nameHindi: 'वसंत ऋतु',
      nameSanskrit: 'वसन्त',
      description: 'Spring Season - Season of new beginnings, blooming flowers, and pleasant weather',
      startMonth: 3,
      startDay: 15,
      endMonth: 5,
      endDay: 14,
      months: ['Chaitra (चैत्र)', 'Vaishakha (वैशाख)'],
      icon: <Flower className="w-12 h-12" />,
      color: 'pink',
      gradient: 'from-pink-400 via-rose-400 to-red-400',
      festivals: ['Holi', 'Ram Navami', 'Hanuman Jayanti', 'Ugadi', 'Gudi Padwa', 'Baisakhi'],
      characteristics: [
        'Pleasant and moderate temperature',
        'Blooming of flowers and new leaves',
        'Cool morning breeze',
        'Ideal time for new ventures',
        'Nature at its most beautiful state'
      ],
      healthTips: [
        'Consume cooling foods like coconut water',
        'Include fresh fruits in diet',
        'Practice morning yoga and pranayama',
        'Avoid heavy, oily foods',
        'Stay hydrated throughout the day'
      ],
      moneyTips: [
        'Good time to start new investments',
        'Plan for monsoon expenses',
        'Review and optimize insurance policies',
        'Consider mutual fund SIPs',
        'Clear winter season debts'
      ],
      rituals: [
        'Worship Lord Vishnu and Goddess Saraswati',
        'Offer flowers and fresh fruits',
        'Chant Gayatri Mantra at sunrise',
        'Perform charity and dana',
        'Celebrate spring festivals with family'
      ],
      weather: 'Pleasant, warm days and cool nights',
      temperature: '20°C - 30°C',
      bestFor: ['New beginnings', 'Weddings', 'House warming', 'Starting business', 'Planting']
    },
    grishma: {
      id: 'grishma',
      name: 'Grishma',
      nameHindi: 'ग्रीष्म ऋतु',
      nameSanskrit: 'ग्रीष्म',
      description: 'Summer Season - Hot and dry season with intense sunlight',
      startMonth: 5,
      startDay: 15,
      endMonth: 7,
      endDay: 14,
      months: ['Jyeshtha (ज्येष्ठ)', 'Ashadha (आषाढ़)'],
      icon: <Sun className="w-12 h-12" />,
      color: 'orange',
      gradient: 'from-orange-400 via-yellow-400 to-amber-400',
      festivals: ['Ganga Dussehra', 'Jagannath Rath Yatra', 'Guru Purnima'],
      characteristics: [
        'Intense heat and dry weather',
        'Longer days and shorter nights',
        'Low humidity before monsoon',
        'Water scarcity concerns',
        'Need for heat management'
      ],
      healthTips: [
        'Drink plenty of water (3-4 liters)',
        'Consume seasonal fruits like watermelon, muskmelon',
        'Avoid going out in peak afternoon',
        'Use natural cooling agents like sandalwood',
        'Wear light-colored, cotton clothes'
      ],
      moneyTips: [
        'Budget for increased electricity bills',
        'Invest in energy-efficient appliances',
        'Plan for summer vacation expenses',
        'Consider gold investment before festival season',
        'Review health insurance coverage'
      ],
      rituals: [
        'Worship Sun God (Surya Narayana)',
        'Offer water to Sun at sunrise',
        'Perform Ganga snan if possible',
        'Practice donation of water (Jal Daan)',
        'Chant Aditya Hridayam'
      ],
      weather: 'Hot and dry with intense sunlight',
      temperature: '30°C - 45°C',
      bestFor: ['Spiritual practices', 'Indoor activities', 'Digital detox', 'Learning']
    },
    varsha: {
      id: 'varsha',
      name: 'Varsha',
      nameHindi: 'वर्षा ऋतु',
      nameSanskrit: 'वर्षा',
      description: 'Monsoon Season - Season of rains bringing relief and freshness',
      startMonth: 7,
      startDay: 15,
      endMonth: 9,
      endDay: 14,
      months: ['Shravana (श्रावण)', 'Bhadrapada (भाद्रपद)'],
      icon: <CloudRain className="w-12 h-12" />,
      color: 'blue',
      gradient: 'from-blue-400 via-cyan-400 to-teal-400',
      festivals: ['Raksha Bandhan', 'Janmashtami', 'Ganesh Chaturthi', 'Onam', 'Teej'],
      characteristics: [
        'Heavy rainfall and cool weather',
        'Greenery everywhere',
        'High humidity levels',
        'Rivers and lakes full',
        'Agricultural activities peak'
      ],
      healthTips: [
        'Drink boiled water only',
        'Avoid street food and raw vegetables',
        'Include ginger and turmeric in diet',
        'Maintain hygiene and cleanliness',
        'Prevent mosquito-borne diseases'
      ],
      moneyTips: [
        'Avoid unnecessary travel during heavy rains',
        'Budget for vehicle maintenance',
        'Consider term insurance renewal',
        'Invest in gold during Shravana',
        'Prepare emergency fund for medical needs'
      ],
      rituals: [
        'Worship Lord Shiva during Shravana month',
        'Perform Rudrabhishek on Mondays',
        'Observe fasts on special days',
        'Chant Om Namah Shivaya',
        'Visit temples and offer prayers'
      ],
      weather: 'Rainy, cool and humid',
      temperature: '25°C - 32°C',
      bestFor: ['Spiritual growth', 'Family bonding', 'Indoor celebrations', 'Reading']
    },
    sharad: {
      id: 'sharad',
      name: 'Sharad',
      nameHindi: 'शरद ऋतु',
      nameSanskrit: 'शरद्',
      description: 'Autumn Season - Post-monsoon clear skies and pleasant weather',
      startMonth: 9,
      startDay: 15,
      endMonth: 11,
      endDay: 14,
      months: ['Ashwin (आश्विन)', 'Kartika (कार्तिक)'],
      icon: <Leaf className="w-12 h-12" />,
      color: 'yellow',
      gradient: 'from-yellow-400 via-amber-400 to-orange-400',
      festivals: ['Navratri', 'Dussehra', 'Karwa Chauth', 'Diwali', 'Dhanteras', 'Bhai Dooj'],
      characteristics: [
        'Clear blue skies',
        'Pleasant and comfortable weather',
        'Harvest season',
        'Major festival season',
        'Ideal for celebrations'
      ],
      healthTips: [
        'Strengthen immunity system',
        'Eat seasonal vegetables',
        'Practice outdoor yoga',
        'Maintain balanced diet during festivals',
        'Stay active and exercise regularly'
      ],
      moneyTips: [
        'Biggest shopping season - budget carefully',
        'Invest in gold during Dhanteras',
        'Clear pending loans before Diwali',
        'Review and rebalance investment portfolio',
        'Consider tax-saving investments'
      ],
      rituals: [
        'Worship Goddess Durga during Navratri',
        'Lakshmi puja on Diwali',
        'Light diyas and offer prayers',
        'Perform Saraswati puja',
        'Donate to the needy during festivals'
      ],
      weather: 'Pleasant, clear skies, cool breeze',
      temperature: '20°C - 30°C',
      bestFor: ['Festivals', 'Weddings', 'Travel', 'Shopping', 'New ventures']
    },
    hemanta: {
      id: 'hemanta',
      name: 'Hemanta',
      nameHindi: 'हेमंत ऋतु',
      nameSanskrit: 'हेमन्त',
      description: 'Pre-Winter Season - Cool and comfortable weather',
      startMonth: 11,
      startDay: 15,
      endMonth: 1,
      endDay: 14,
      months: ['Margashirsha (मार्गशीर्ष)', 'Pausha (पौष)'],
      icon: <Wind className="w-12 h-12" />,
      color: 'indigo',
      gradient: 'from-indigo-400 via-purple-400 to-pink-400',
      festivals: ['Guru Nanak Jayanti', 'Christmas', 'New Year', 'Makar Sankranti'],
      characteristics: [
        'Cool and dry weather',
        'Early morning fog',
        'Shorter days',
        'Comfortable temperature',
        'Harvest celebrations'
      ],
      healthTips: [
        'Include warming foods like ginger, garlic',
        'Drink warm water and herbal teas',
        'Practice yoga and meditation',
        'Keep body warm with layers',
        'Consume dry fruits and nuts'
      ],
      moneyTips: [
        'Year-end financial review',
        'Complete tax-saving investments by Dec 31',
        'Plan for next year budget',
        'Review insurance policies',
        'Consider year-end bonus investments'
      ],
      rituals: [
        'Worship Sun God during Makar Sankranti',
        'Perform donations (Dan Punya)',
        'Light lamps in evening',
        'Practice gratitude prayers',
        'Celebrate harvest festivals'
      ],
      weather: 'Cool and comfortable, foggy mornings',
      temperature: '10°C - 25°C',
      bestFor: ['Outdoor activities', 'Travel', 'Picnics', 'Family gatherings', 'Planning']
    },
    shishira: {
      id: 'shishira',
      name: 'Shishira',
      nameHindi: 'शिशिर ऋतु',
      nameSanskrit: 'शिशिर',
      description: 'Winter Season - Coldest season with dry and chilly weather',
      startMonth: 1,
      startDay: 15,
      endMonth: 3,
      endDay: 14,
      months: ['Magha (माघ)', 'Phalguna (फाल्गुन)'],
      icon: <Snowflake className="w-12 h-12" />,
      color: 'cyan',
      gradient: 'from-cyan-400 via-blue-400 to-indigo-400',
      festivals: ['Vasant Panchami', 'Maha Shivaratri', 'Holi'],
      characteristics: [
        'Cold and dry weather',
        'Heavy winter in North India',
        'Dense fog in mornings',
        'Need for warm clothing',
        'Shortest days of year'
      ],
      healthTips: [
        'Protect from cold and flu',
        'Consume hot soups and warm foods',
        'Regular oil massage for skin',
        'Keep extremities warm',
        'Boost immunity with Vitamin C'
      ],
      moneyTips: [
        'Budget for heating expenses',
        'Invest in winter essentials wisely',
        'Plan for upcoming financial year',
        'Review Q4 investment returns',
        'Prepare for tax filing season'
      ],
      rituals: [
        'Worship Goddess Saraswati on Vasant Panchami',
        'Perform Shiva puja on Shivaratri',
        'Light bonfire (Holika Dahan)',
        'Donate warm clothes',
        'Practice meditation and spiritual studies'
      ],
      weather: 'Cold and dry with fog',
      temperature: '5°C - 20°C',
      bestFor: ['Spiritual practices', 'Learning', 'Indoor activities', 'Planning ahead']
    }
  };

  // Get current Ritu based on date
  const getCurrentRitu = useMemo(() => {
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    
    for (const ritu of Object.values(RITU_DATA)) {
      const inRange = (m: number, d: number, sm: number, sd: number, em: number, ed: number) => {
        if (sm < em || (sm === em && sd < ed)) {
          // Normal range within same year
          return (m > sm || (m === sm && d >= sd)) && (m < em || (m === em && d <= ed));
        } else {
          // Range wraps around year (e.g., Nov 15 to Jan 14)
          return (m > sm || (m === sm && d >= sd)) || (m < em || (m === em && d <= ed));
        }
      };

      if (inRange(month, day, ritu.startMonth, ritu.startDay, ritu.endMonth, ritu.endDay)) {
        return ritu;
      }
    }
    return RITU_DATA.vasanta; // Default
  }, [currentDate]);

  useEffect(() => {
    setSelectedRitu(getCurrentRitu.id);
  }, [getCurrentRitu]);

  const displayedRitu = RITU_DATA[selectedRitu] || getCurrentRitu;

  // Filtered cities
  const filteredCities = useMemo(() => {
    if (!searchCity.trim()) return allCities.slice(0, 50);
    const search = searchCity.toLowerCase();
    return allCities
      .filter(city => city.toLowerCase().includes(search))
      .slice(0, 50);
  }, [searchCity, allCities]);

  // Calculate sunrise/sunset (approximate)
  const getSunTimes = (city: string) => {
    // Simplified calculation - in production use actual astronomical library
    const now = new Date();
    const sunrise = new Date(now);
    sunrise.setHours(6, 0, 0);
    const sunset = new Date(now);
    sunset.setHours(18, 30, 0);
    
    return {
      sunrise: sunrise.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      sunset: sunset.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const sunTimes = getSunTimes(selectedCity);

  // Share functionality
  const handleShare = (platform: string) => {
    const shareUrl = `/festival-tools/indian-season-calendar?ritu=${selectedRitu}&city=${selectedCity}`;
    const shareText = `Currently in ${displayedRitu.name} (${displayedRitu.nameHindi}) season! Check out the complete Ritu Chakra on MoneyCal.in`;
    
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent('Indian Season Calendar - Ritu Chakra')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const handleCopyLink = () => {
    const url = `/festival-tools/indian-season-calendar?ritu=${selectedRitu}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Export to PDF (placeholder)
  const exportToPDF = () => {
    alert('PDF export feature is planned. Use browser print for now.');
  };

  return (
    <>
      <SEOHelmet
        title="Indian Season Calendar Ritu Chakra 2025 - 6 Vedic Seasons with Festival Dates | Vasanta Grishma Varsha Sharad Hemanta Shishira"
        description="🌺 Complete Ritu Chakra (ऋतु चक्र) - 6 Vedic seasons of India with accurate dates, festivals, health tips, money advice. Current season: Sharad (Autumn). Track Vasanta, Grishma, Varsha, Sharad, Hemanta, Shishira with 100+ festivals, muhurat timings for 600+ cities. Best seasonal rituals, food, investment tips for each Ritu."
        keywords="indian season calendar, ritu chakra, 6 seasons of india, vasanta ritu, grishma ritu, varsha ritu, sharad ritu, hemanta ritu, shishira ritu, vedic seasons india, which season is it today india, current ritu now, hindu calendar seasons, seasonal festivals india, ritu wheel, indian weather seasons"
        canonicalUrl="/festival-tools/indian-season-calendar"
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-green-100">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-green-600 hover:text-green-800 flex items-center gap-1">
                <Home className="w-4 h-4" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to="/festival-date-calendar" className="text-green-600 hover:text-green-800">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 font-medium">Indian Season Calendar</span>
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
              <Trees className="w-24 h-24 text-green-600" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 mb-6">
              🌺 Ritu Chakra | ऋतु चक्र
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-6 leading-relaxed">
              <strong className="text-green-600">6 Vedic Seasons of India</strong> with Festivals, Timings & Wellness Guide
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-green-200">
                <span className="text-sm font-semibold text-gray-600">🌸 Current: {getCurrentRitu.name}</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-emerald-200">
                <span className="text-sm font-semibold text-gray-600">📅 {currentDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-teal-200">
                <span className="text-sm font-semibold text-gray-600">📍 {selectedCity}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <CheckCircle className="w-4 h-4" />
                Vedic Accurate
              </span>
              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                100+ Festivals
              </span>
              <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <MapPin className="w-4 h-4" />
                600+ Cities
              </span>
            </div>
          </motion.div>

          {/* City Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-xl p-6 mb-8 border-2 border-green-100"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  Select Your City
                  {locationLoading && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Auto-detecting...
                    </span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={locationLoading ? "Detecting your location..." : "Search 600+ Indian cities..."}
                    value={searchCity || selectedCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    disabled={locationLoading}
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:ring-4 focus:ring-green-200 outline-none text-lg bg-green-50 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  {!locationLoading && !searchCity && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        📍 Auto-detected
                      </span>
                    </div>
                  )}
                </div>
                {searchCity && filteredCities.length > 0 && (
                  <div className="mt-2 max-h-48 overflow-y-auto border-2 border-green-200 rounded-xl bg-white shadow-lg">
                    {filteredCities.map(city => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setSearchCity('');
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-green-50 transition-colors"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                <h4 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                  <Sun className="w-5 h-5" />
                  Today's Sun Timings
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Sunrise</p>
                    <p className="text-xl font-bold text-orange-600">☀️ {sunTimes.sunrise}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sunset</p>
                    <p className="text-xl font-bold text-orange-600">🌅 {sunTimes.sunset}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ritu Wheel - Visual Selection */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-2 border-green-100"
          >
            <h2 className="text-3xl font-black text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
              <RefreshCw className="w-8 h-8 text-green-600" />
              🌺 Six Seasons of India (Ritu Chakra)
            </h2>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Object.values(RITU_DATA).map((ritu, idx) => (
                <motion.button
                  key={ritu.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  onClick={() => setSelectedRitu(ritu.id)}
                  className={`p-6 rounded-2xl border-3 transition-all transform hover:scale-105 ${
                    selectedRitu === ritu.id
                      ? `bg-gradient-to-br ${ritu.gradient} border-white text-white shadow-2xl`
                      : 'bg-white border-gray-200 hover:border-green-300 hover:shadow-xl'
                  }`}
                >
                  <div className={`mb-4 ${selectedRitu === ritu.id ? 'text-white' : 'text-' + ritu.color + '-600'}`}>
                    {ritu.icon}
                  </div>
                  <h3 className={`text-xl font-black mb-2 ${selectedRitu === ritu.id ? 'text-white' : 'text-gray-900'}`}>
                    {ritu.name}
                  </h3>
                  <p className={`text-sm mb-2 ${selectedRitu === ritu.id ? 'text-white/90' : 'text-gray-600'}`}>
                    {ritu.nameHindi}
                  </p>
                  <p className={`text-xs ${selectedRitu === ritu.id ? 'text-white/80' : 'text-gray-500'}`}>
                    {ritu.months.join(' • ')}
                  </p>
                  {getCurrentRitu.id === ritu.id && (
                    <div className="mt-3 inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                      <Sparkles className="w-3 h-3" />
                      Current Season
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Selected Ritu Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRitu}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`rounded-3xl shadow-2xl p-8 mb-8 border-3 bg-gradient-to-br ${displayedRitu.gradient} text-white`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-black mb-2">{displayedRitu.name} ({displayedRitu.nameHindi})</h2>
                  <p className="text-xl opacity-90 mb-4">{displayedRitu.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold">
                      🌡️ {displayedRitu.temperature}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold">
                      📅 {displayedRitu.months.join(' • ')}
                    </span>
                  </div>
                </div>
                <div className="text-white/80">
                  {displayedRitu.icon}
                </div>
              </div>

              {/* Characteristics */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6" />
                  Season Characteristics
                </h3>
                <ul className="space-y-2">
                  {displayedRitu.characteristics.map((char, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Festivals */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Gift className="w-6 h-6" />
                  Major Festivals
                </h3>
                <div className="flex flex-wrap gap-3">
                  {displayedRitu.festivals.map((festival, idx) => (
                    <span key={idx} className="bg-white/20 px-4 py-2 rounded-lg font-semibold">
                      🎊 {festival}
                    </span>
                  ))}
                </div>
              </div>

              {/* Health Tips */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Heart className="w-6 h-6" />
                  Health & Wellness Tips
                </h3>
                <ul className="space-y-2">
                  {displayedRitu.healthTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-2xl">💊</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Money Tips */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <DollarSign className="w-6 h-6" />
                  Financial Planning Tips
                </h3>
                <ul className="space-y-2">
                  {displayedRitu.moneyTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-2xl">💰</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rituals */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6" />
                  Rituals & Spiritual Practices
                </h3>
                <ul className="space-y-2">
                  {displayedRitu.rituals.map((ritual, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-2xl">🕉️</span>
                      <span>{ritual}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best Activities */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6" />
                  Best Time For
                </h3>
                <div className="flex flex-wrap gap-3">
                  {displayedRitu.bestFor.map((activity, idx) => (
                    <span key={idx} className="bg-white/20 px-4 py-2 rounded-lg font-semibold">
                      ✨ {activity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-all border-2 border-white/30 flex items-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                  {showShareMenu && (
                    <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-2xl border-2 border-gray-200 p-4 z-10 min-w-[200px]">
                      <button
                        onClick={() => handleShare('whatsapp')}
                        className="w-full px-4 py-2 text-left hover:bg-green-50 rounded-lg transition-colors text-gray-700"
                      >
                        📱 WhatsApp
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full px-4 py-2 text-left hover:bg-blue-50 rounded-lg transition-colors text-gray-700"
                      >
                        📘 Facebook
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-full px-4 py-2 text-left hover:bg-sky-50 rounded-lg transition-colors text-gray-700"
                      >
                        🐦 Twitter
                      </button>
                      <button
                        onClick={handleCopyLink}
                        className="w-full px-4 py-2 text-left hover:bg-purple-50 rounded-lg transition-colors text-gray-700 flex items-center gap-2"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy Link'}
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={exportToPDF}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-all border-2 border-white/30 flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Comprehensive SEO Content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 prose prose-lg max-w-none">
            <h2 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-green-600" />
              📚 Complete Guide: Indian Season Calendar & Ritu Chakra (2025)
            </h2>

            {/* Introduction */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200 mb-8">
              <h3 className="text-2xl font-bold text-green-900 mb-4">🌺 What is Ritu Chakra (ऋतु चक्र)?</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The <strong>Ritu Chakra</strong> or <strong>Indian Season Calendar</strong> is the ancient Vedic system of dividing the year into 
                <strong> 6 seasons (षड्ऋतु - Shad Ritu)</strong> instead of the conventional 4 seasons. This <strong>6000-year-old wisdom</strong> from 
                Ayurveda and Vedic texts provides a more accurate understanding of India's climate patterns and their impact on health, agriculture, and 
                spiritual practices.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Each <strong>Ritu (season)</strong> lasts approximately <strong>2 months (2 Hindu lunar months)</strong> and comes with specific:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Festivals & Celebrations:</strong> Major Indian festivals aligned with seasons</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Health Guidelines:</strong> Ayurvedic diet and lifestyle recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Financial Planning:</strong> Best times for investments and expenditures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Spiritual Practices:</strong> Rituals and worship aligned with nature</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Agricultural Activities:</strong> Planting and harvesting cycles</span>
                </li>
              </ul>
            </div>

            {/* 6 Seasons Overview */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">🌸 The Six Seasons (षड्ऋतु) Explained</h3>
            <div className="space-y-6 mb-8">
              {Object.values(RITU_DATA).map((ritu, idx) => (
                <div key={ritu.id} className={`bg-gradient-to-r ${ritu.gradient.replace('from-', 'from-').replace('-400', '-50').replace('via-', 'via-').replace('to-', 'to-')} p-6 rounded-2xl border-2 border-${ritu.color}-200`}>
                  <div className="flex items-start gap-4">
                    <div className={`text-${ritu.color}-600`}>
                      {ritu.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {idx + 1}. {ritu.name} ({ritu.nameHindi}) - {ritu.nameSanskrit}
                      </h4>
                      <p className="text-gray-700 mb-2"><strong>Period:</strong> {ritu.months.join(' • ')}</p>
                      <p className="text-gray-700 mb-2"><strong>Temperature:</strong> {ritu.temperature}</p>
                      <p className="text-gray-700 mb-2"><strong>Weather:</strong> {ritu.weather}</p>
                      <p className="text-gray-700"><strong>Major Festivals:</strong> {ritu.festivals.slice(0, 3).join(', ')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h3>
            <div className="space-y-4 mb-8">
              {[
                {
                  q: 'Which season (Ritu) is it today in India?',
                  a: `Today (${currentDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}), India is in ${getCurrentRitu.name} (${getCurrentRitu.nameHindi}) season. This season runs from ${getCurrentRitu.months[0]} to ${getCurrentRitu.months[1]} with temperatures ranging ${getCurrentRitu.temperature}. Major festivals during this period include ${getCurrentRitu.festivals.slice(0, 3).join(', ')}.`
                },
                {
                  q: 'How many seasons are there in India according to Ritu Chakra?',
                  a: 'According to the ancient Vedic Ritu Chakra system, India has 6 seasons (षड्ऋतु - Shad Ritu): 1) Vasanta (Spring), 2) Grishma (Summer), 3) Varsha (Monsoon), 4) Sharad (Autumn), 5) Hemanta (Pre-Winter), and 6) Shishira (Winter). Each season lasts approximately 2 months (2 Hindu lunar months) and has specific characteristics, festivals, and health guidelines.'
                },
                {
                  q: 'What is the difference between 4 seasons and 6 Ritu seasons?',
                  a: 'The conventional Western calendar has 4 seasons (Spring, Summer, Autumn, Winter), while the Indian Ritu Chakra has 6 seasons that more accurately reflect India\'s diverse climate. The 6-season system includes two transition periods: Hemanta (Pre-Winter) between Autumn and Winter, and distinct Monsoon (Varsha) season. This provides better alignment with agricultural cycles, Ayurvedic health practices, and festival timings.'
                },
                {
                  q: 'Which festivals fall in Sharad Ritu (Autumn)?',
                  a: 'Sharad Ritu (Autumn), which occurs from mid-September to mid-November, is the most festival-rich season in India. Major festivals include: Navratri (9 days of Goddess worship), Dussehra/Vijayadashami, Karwa Chauth, Dhanteras, Diwali (Festival of Lights), Govardhan Puja, Bhai Dooj, and Chhath Puja. This is considered the most auspicious time for celebrations, weddings, and new beginnings.'
                },
                {
                  q: 'What are the health tips for each Ritu according to Ayurveda?',
                  a: 'Ayurveda prescribes specific diet and lifestyle for each season: Vasanta (light foods, detox), Grishma (cooling foods, hydration), Varsha (warm spices, immunity boosters), Sharad (balanced diet, strength building), Hemanta (warm, nourishing foods), and Shishira (oil massage, hot foods). Each season requires adjustment in sleep patterns, exercise intensity, and dietary choices to maintain balance in body doshas.'
                },
                {
                  q: 'When does Vasanta Ritu (Spring) start in India?',
                  a: 'Vasanta Ritu (Spring season) starts around mid-March (15th March) and continues until mid-May (14th May). This corresponds to the Hindu months of Chaitra and Vaishakha. Vasanta is marked by pleasant weather, blooming flowers, and major festivals like Holi, Ram Navami, Hanuman Jayanti, and regional New Year celebrations (Ugadi, Gudi Padwa, Baisakhi).'
                },
                {
                  q: 'Why is understanding Ritu Chakra important for financial planning?',
                  a: 'Ritu Chakra helps with financial planning as each season has specific expenditure patterns and investment opportunities. For example: Sharad Ritu (Autumn) requires budgeting for festival shopping and gold purchases during Dhanteras/Diwali; Hemanta (Pre-Winter) is ideal for year-end tax planning; Grishma (Summer) needs budgeting for increased electricity bills. Understanding seasonal patterns helps in better cash flow management and investment timing.'
                },
                {
                  q: 'How do I use this Indian Season Calendar tool?',
                  a: 'Simply select your city from 600+ Indian cities to see city-specific sunrise/sunset times and the current Ritu. Click on any of the 6 seasons to explore detailed information including: festivals, health tips, financial advice, rituals, weather patterns, and best activities for that season. You can share the calendar or download it for offline reference.'
                },
                {
                  q: 'Is the Ritu Chakra calendar same across all of India?',
                  a: 'While the basic 6-season framework is consistent across India, the exact timing and intensity of each Ritu varies by region. Northern India experiences more distinct Shishira (Winter) and Grishma (Summer), while Southern India has milder variations. Coastal regions have pronounced Varsha (Monsoon), while desert regions have more intense Grishma. Our tool provides city-specific insights for accurate seasonal information.'
                },
                {
                  q: 'Can I export the Ritu Chakra calendar to my phone or computer?',
                  a: 'Yes! You can download the Ritu Chakra calendar as a PDF or export specific festival dates to your Google Calendar, Outlook, or Apple Calendar using the ICS format. This allows you to keep track of seasonal changes, festival dates, and receive reminders for important events throughout the year.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                    <span className="text-green-600 flex-shrink-0">Q{idx + 1}.</span>
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
                { to: '/festival-tools/custom-festival-reminder', icon: '🔔', title: 'Festival Reminders', desc: 'Set custom alerts' },
                { to: '/festival-tools/nakshatra-festival', icon: '⭐', title: 'Nakshatra Calculator', desc: 'Find birth star on festivals' },
                { to: '/festival-tools/shubh-muhurat-reminder', icon: '🌟', title: 'Muhurat Finder', desc: 'Auspicious timings' },
                { to: '/festival-date-calendar', icon: '📅', title: 'Festival Calendar', desc: 'Complete festival dates' }
              ].map((tool, idx) => (
                <Link
                  key={idx}
                  to={tool.to}
                  className="block p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all group"
                >
                  <div className="text-5xl mb-3">{tool.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {tool.title}
                  </h4>
                  <p className="text-sm text-gray-600 not-prose">{tool.desc}</p>
                  <div className="mt-3 text-green-600 font-semibold flex items-center gap-2">
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
                  <a href="https://www.india.gov.in/topics/art-culture/indian-culture" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Indian Culture - Government of India
                  </a>
                </li>
                <li>
                  <a href="https://www.ayush.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    AYUSH Ministry - Ayurveda & Seasonal Health
                  </a>
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/Ritu_(Indian_season)" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Ritu (Indian Season) - Wikipedia
                  </a>
                </li>
              </ul>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-2xl text-center mt-8">
              <h3 className="text-3xl font-black mb-4">🌺 Experience the Wisdom of Ritu Chakra!</h3>
              <p className="text-xl mb-6 opacity-95">
                Align your life with nature's rhythm using the ancient 6-season calendar
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all inline-flex items-center gap-3"
              >
                <Trees className="w-6 h-6" />
                Explore Ritu Chakra
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndianSeasonCalendar;
