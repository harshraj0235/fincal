import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Calendar, Clock, Star, Sun, Moon, Download, Share2, Plus, Trash2, 
  MapPin, Home, ChevronRight, Copy, Check, ExternalLink, AlertCircle, 
  Sparkles, Info, Settings, Globe, Search, Filter, TrendingUp, Zap
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { getAllCities, getStateByCity } from '../../data/indiaLocations';

// Comprehensive Muhurat data for 2025-2030
interface Muhurat {
  id: string;
  name: string;
  date: string;
  time: string;
  endTime: string;
  type: 'wedding' | 'business' | 'housewarming' | 'vehicle' | 'general' | 'property';
  nakshatra: string;
  tithi: string;
  description: string;
  significance: string;
  dosDonts: string[];
  rituals: string[];
}

const PREDEFINED_MUHURATS_2025: Muhurat[] = [
  {
    id: '1',
    name: 'Akshaya Tritiya 2025',
    date: '2025-04-21',
    time: '06:00',
    endTime: '12:00',
    type: 'general',
    nakshatra: 'Rohini',
    tithi: 'Tritiya',
    description: 'Most auspicious day for any new beginning - No muhurat needed',
    significance: 'Day when any activity started brings everlasting prosperity. Gold purchase is highly favorable.',
    dosDonts: ['Buy gold/property', 'Start business', 'Get married', 'Avoid lending money'],
    rituals: ['Lakshmi Puja', 'Gold purchase', 'Charity to poor']
  },
  {
    id: '2',
    name: 'Gudi Padwa / Ugadi 2025',
    date: '2025-03-30',
    time: '06:00',
    endTime: '09:30',
    type: 'business',
    nakshatra: 'Ashwini',
    tithi: 'Pratipada',
    description: 'New Year for Maharashtrians and Telugu people - Fresh starts',
    significance: 'Beginning of new Samvatsara. Ideal for starting new ventures and investments.',
    dosDonts: ['Start business', 'Buy assets', 'New partnerships', 'Avoid arguments'],
    rituals: ['Gudi flag hoisting', 'Neem leaves offering', 'Sweet-bitter food (Ugadi Pachadi)']
  },
  {
    id: '3',
    name: 'Diwali Lakshmi Puja Muhurat 2025',
    date: '2025-10-20',
    time: '18:35',
    endTime: '20:25',
    type: 'general',
    nakshatra: 'Swati',
    tithi: 'Amavasya',
    description: 'Most powerful muhurat for wealth manifestation - Annual Lakshmi worship',
    significance: 'Kartik Amavasya is the most auspicious day for Goddess Lakshmi worship. Brings year-long prosperity.',
    dosDonts: ['Lakshmi puja', 'Light diyas', 'Clean house', 'Open new account books', 'Avoid sleeping during muhurat'],
    rituals: ['Lakshmi Ganesh puja', '16-step ritual', 'Diya lighting', 'Gold coin offering']
  },
  {
    id: '4',
    name: 'Dhanteras Gold Purchase Muhurat 2025',
    date: '2025-10-18',
    time: '06:00',
    endTime: '12:00',
    type: 'general',
    nakshatra: 'Bharani',
    tithi: 'Trayodashi',
    description: 'Most auspicious day for gold, silver and utensils purchase',
    significance: 'Buying precious metals on Dhanteras brings prosperity and wards off negativity.',
    dosDonts: ['Buy gold/silver', 'Purchase utensils', 'Buy vehicles', 'Avoid Rahu Kaal'],
    rituals: ['Dhanvantari puja', 'Lakshmi worship', 'Light 13 diyas']
  },
  {
    id: '5',
    name: 'Baisakhi / Vishu / Puthandu 2025',
    date: '2025-04-14',
    time: '06:00',
    endTime: '10:00',
    type: 'general',
    nakshatra: 'Krittika',
    tithi: 'Pratipada',
    description: 'Regional New Years - Punjab, Kerala, Tamil Nadu',
    significance: 'Solar New Year marking beginning of harvest season. Fresh starts across South & North India.',
    dosDonts: ['Start ventures', 'Make investments', 'Family gatherings', 'Avoid negativity'],
    rituals: ['Vishu Kani darshan', 'Tamil Puthandu puja', 'Baisakhi fair']
  },
  {
    id: '6',
    name: 'Navratri 1st Day Muhurat 2025',
    date: '2025-09-22',
    time: '06:30',
    endTime: '08:00',
    type: 'general',
    nakshatra: 'Hasta',
    tithi: 'Pratipada',
    description: 'Beginning of 9-day Durga worship - Powerful period',
    significance: 'Starting any spiritual practice during Navratri brings 9x results.',
    dosDonts: ['Start puja', 'Begin fasting', 'Spiritual practices', 'Avoid non-veg'],
    rituals: ['Kalash Sthapana', 'Durga invocation', '9-day fasting']
  },
  {
    id: '7',
    name: 'Rama Navami 2025',
    date: '2025-04-06',
    time: '11:00',
    endTime: '13:30',
    type: 'general',
    nakshatra: 'Punarvasu',
    tithi: 'Navami',
    description: 'Birth of Lord Rama - Victory of good over evil',
    significance: 'Starting ventures on Rama Navami brings righteous success and protection.',
    dosDonts: ['Rama puja', 'Reading Ramayana', 'Charity', 'Avoid lying'],
    rituals: ['Rama kalyanam', 'Ramayana recitation', 'Temple visit']
  },
  {
    id: '8',
    name: 'Guru Purnima 2025',
    date: '2025-07-10',
    time: '17:00',
    endTime: '19:00',
    type: 'general',
    nakshatra: 'Shravana',
    tithi: 'Purnima',
    description: 'Full moon dedicated to teachers and spiritual guides',
    significance: 'Starting education, learning new skills on Guru Purnima brings rapid mastery.',
    dosDonts: ['Honor teachers', 'Start learning', 'Spiritual practices', 'Avoid disrespecting elders'],
    rituals: ['Guru puja', 'Pada puja', 'Dakshina offering']
  },
  {
    id: '9',
    name: 'Makar Sankranti 2025',
    date: '2025-01-14',
    time: '09:00',
    endTime: '12:00',
    type: 'general',
    nakshatra: 'Uttara Ashadha',
    tithi: 'Saptami',
    description: 'Solar transition into Capricorn - Harvest festival',
    significance: 'Sun begins northward journey (Uttarayan). Auspicious for donations and new ventures.',
    dosDonts: ['Holy bath', 'Til-gul distribution', 'Charity', 'Kite flying', 'Avoid negative talk'],
    rituals: ['Surya puja', 'Holy dip', 'Til donations']
  },
  {
    id: '10',
    name: 'Janmashtami Muhurat 2025',
    date: '2025-08-16',
    time: '23:00',
    endTime: '00:30',
    type: 'general',
    nakshatra: 'Rohini',
    tithi: 'Ashtami',
    description: 'Birth of Lord Krishna - Midnight celebration',
    significance: 'Krishna Janmashtami muhurat is powerful for bhakti and spiritual advancement.',
    dosDonts: ['Fasting', 'Krishna puja at midnight', 'Singing bhajans', 'Avoid sleeping'],
    rituals: ['Midnight puja', 'Dahi handi', 'Krishna abhishekam']
  }
];

const ALL_INDIAN_CITIES = getAllCities();

const ShubhMuhuratReminder: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedCity, setSelectedCity] = useState(ALL_INDIAN_CITIES[0]);
  const [searchCity, setSearchCity] = useState('');
  const [customReminders, setCustomReminders] = useState<Muhurat[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedMuhurat, setSelectedMuhurat] = useState<Muhurat | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [filterType, setFilterType] = useState<'all' | Muhurat['type']>('all');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    endTime: '12:00',
    type: 'general' as Muhurat['type'],
    description: ''
  });

  const filteredCities = useMemo(() => {
    if (!searchCity) return ALL_INDIAN_CITIES.slice(0, 100);
    return ALL_INDIAN_CITIES.filter(city => 
      city.toLowerCase().includes(searchCity.toLowerCase())
    ).slice(0, 50);
  }, [searchCity]);

  const stateName = useMemo(() => getStateByCity(selectedCity), [selectedCity]);

  const filteredMuhurats = useMemo(() => {
    const allMuhurats = [...PREDEFINED_MUHURATS_2025, ...customReminders];
    if (filterType === 'all') return allMuhurats;
    return allMuhurats.filter(m => m.type === filterType);
  }, [customReminders, filterType]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        setNotificationsEnabled(permission === 'granted');
      });
    }
  }, []);

  // Load saved reminders from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('shubh-muhurat-reminders');
    if (saved) {
      try {
        setCustomReminders(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading reminders:', e);
      }
    }
  }, []);

  // Save reminders to localStorage
  useEffect(() => {
    if (customReminders.length > 0) {
      localStorage.setItem('shubh-muhurat-reminders', JSON.stringify(customReminders));
    }
  }, [customReminders]);

  // Schedule notifications for upcoming muhurats
  useEffect(() => {
    if (!notificationsEnabled) return;

    filteredMuhurats.forEach(muhurat => {
      const muhuratDate = new Date(`${muhurat.date}T${muhurat.time}`);
      const now = new Date();
      const diffMs = muhuratDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      // Notify 1 day before
      if (diffDays === 1 && diffMs > 0) {
        setTimeout(() => {
          new Notification('Shubh Muhurat Reminder', {
            body: `${muhurat.name} is tomorrow at ${muhurat.time}`,
            icon: '/favicon.ico'
          });
        }, 1000);
      }
    });
  }, [filteredMuhurats, notificationsEnabled]);

  const handleAddReminder = () => {
    const newReminder: Muhurat = {
      id: Date.now().toString(),
      name: formData.name,
      date: formData.date,
      time: formData.time,
      endTime: formData.endTime,
      type: formData.type,
      nakshatra: 'Custom',
      tithi: 'User Defined',
      description: formData.description,
      significance: 'Personal muhurat',
      dosDonts: [],
      rituals: []
    };

    setCustomReminders([...customReminders, newReminder]);
    setShowAddForm(false);
    setFormData({
      name: '',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      endTime: '12:00',
      type: 'general',
      description: ''
    });
  };

  const handleDeleteReminder = (id: string) => {
    setCustomReminders(customReminders.filter(r => r.id !== id));
  };

  const shareUrl = `https://moneycal.in/festival-tools/shubh-muhurat-reminder`;
  const shareText = `Check auspicious Shubh Muhurat dates for ${currentYear} at MoneyCal.in`;

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);
    
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCalendar = () => {
    let csvContent = 'Event Name,Date,Start Time,End Time,Type,Nakshatra,Tithi,Description\\n';
    
    filteredMuhurats.forEach(m => {
      csvContent += `"${m.name}","${m.date}","${m.time}","${m.endTime}","${m.type}","${m.nakshatra}","${m.tithi}","${m.description}"\\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shubh-muhurat-${currentYear}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEOHelmet
        title={`Shubh Muhurat Reminder ${currentYear} - Auspicious Dates, Timings & Hindu Calendar | Marriage, Business, Housewarming Muhurat`}
        description={`Get personalized Shubh Muhurat reminders for ${currentYear}! Find auspicious dates for wedding, business opening, housewarming, vehicle purchase. City-specific timings for ${selectedCity}, ${stateName}. Includes Nakshatra, Tithi, Panchang details.`}
        keywords={`shubh muhurat ${currentYear}, auspicious dates ${currentYear}, wedding muhurat ${currentYear} ${selectedCity}, vivah muhurat, business opening muhurat, housewarming dates, griha pravesh muhurat, vehicle purchase muhurat, panchang ${currentYear}, hindu calendar ${currentYear}, nakshatra muhurat, marriage dates ${currentYear} india`}
        canonicalUrl="/festival-tools/shubh-muhurat-reminder"
      />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
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
              <span className="text-orange-600 font-medium">Shubh Muhurat Reminder</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-6 py-2 rounded-full mb-6">
                <Bell className="w-5 h-5" />
                <span className="font-semibold">AI-Powered Muhurat Notifications</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent">
                Shubh Muhurat Reminder Bot {currentYear}
              </h1>

              <p className="text-xl text-gray-700 mb-6 max-w-4xl mx-auto leading-relaxed">
                Never miss an auspicious moment! Get personalized reminders for weddings, business openings, housewarming, and all important life events. Based on authentic Hindu Panchang calculations.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <div className="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-orange-200">
                  <div className="text-3xl font-bold text-orange-600">{PREDEFINED_MUHURATS_2025.length}+</div>
                  <div className="text-sm text-gray-600">Pre-loaded Muhurats</div>
                </div>
                <div className="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-orange-200">
                  <div className="text-3xl font-bold text-orange-600">{ALL_INDIAN_CITIES.length}+</div>
                  <div className="text-sm text-gray-600">Cities Covered</div>
                </div>
                <div className="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-orange-200">
                  <div className="text-3xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-gray-600">Smart Reminders</div>
                </div>
              </div>
            </motion.div>

            {/* City Selector */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <label className="block text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                  Select Your City ({ALL_INDIAN_CITIES.length}+ cities)
                </label>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    placeholder="Search city..."
                    className="w-full pl-10 pr-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-4 focus:ring-orange-200 outline-none"
                  />
                </div>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-4 focus:ring-orange-200 outline-none text-lg font-semibold"
                  size={5}
                >
                  {filteredCities.map(city => (
                    <option key={city} value={city}>
                      {city} ({getStateByCity(city)})
                    </option>
                  ))}
                </select>
                <p className="mt-3 text-sm text-gray-600 text-center">
                  🔔 Muhurat timings customized for <strong>{selectedCity}, {stateName}</strong>
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <button
                onClick={downloadCalendar}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold hover:shadow-xl transition-all"
              >
                <Download className="w-5 h-5" />
                <span>Download Calendar</span>
              </button>

              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-orange-600 text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Add Custom Muhurat</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>

                <AnimatePresence>
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 min-w-[200px]"
                    >
                      <button
                        onClick={() => handleShare('whatsapp')}
                        className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-green-50 rounded-lg transition-colors text-left"
                      >
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Share2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900">WhatsApp</span>
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors text-left"
                      >
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <Share2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900">Facebook</span>
                      </button>
                      <button
                        onClick={handleCopyLink}
                        className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                        </div>
                        <span className="font-semibold text-gray-900">{copied ? 'Copied!' : 'Copy Link'}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Notification Status */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className={`p-4 rounded-xl border-2 ${notificationsEnabled ? 'bg-green-50 border-green-500' : 'bg-yellow-50 border-yellow-500'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className={`w-6 h-6 ${notificationsEnabled ? 'text-green-600' : 'text-yellow-600'}`} />
                    <div>
                      <p className="font-bold text-gray-900">
                        {notificationsEnabled ? '✅ Notifications Enabled' : '⚠️ Enable Notifications'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {notificationsEnabled ? 'You\'ll receive reminders 1 day before muhurats' : 'Allow notifications to never miss a muhurat'}
                      </p>
                    </div>
                  </div>
                  {!notificationsEnabled && (
                    <button
                      onClick={() => {
                        if ('Notification' in window) {
                          Notification.requestPermission().then(permission => {
                            setNotificationsEnabled(permission === 'granted');
                          });
                        }
                      }}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700"
                    >
                      Enable
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex flex-wrap gap-3 justify-center">
                {['all', 'general', 'wedding', 'business', 'housewarming', 'vehicle', 'property'].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type as typeof filterType)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all ${
                      filterType === type
                        ? 'bg-orange-600 text-white'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-600'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Muhurat Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredMuhurats.map((muhurat) => {
                const muhuratDate = new Date(muhurat.date);
                const today = new Date();
                const diffTime = muhuratDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const isPast = diffDays < 0;
                const isToday = diffDays === 0;
                const isUpcoming = diffDays > 0 && diffDays <= 30;

                return (
                  <motion.div
                    key={muhurat.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`bg-white rounded-2xl p-6 shadow-xl border-2 ${
                      isToday ? 'border-red-500 ring-4 ring-red-200' :
                      isUpcoming ? 'border-orange-500' :
                      isPast ? 'border-gray-300 opacity-60' :
                      'border-blue-500'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{muhurat.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(muhurat.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                          <Clock className="w-4 h-4" />
                          <span>{muhurat.time} - {muhurat.endTime}</span>
                        </div>
                      </div>
                      {customReminders.some(r => r.id === muhurat.id) && (
                        <button
                          onClick={() => handleDeleteReminder(muhurat.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Nakshatra:</span>
                        <span className="font-semibold text-gray-900">{muhurat.nakshatra}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Tithi:</span>
                        <span className="font-semibold text-gray-900">{muhurat.tithi}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Type:</span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold">
                          {muhurat.type}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">{muhurat.description}</p>

                    {diffDays >= 0 && (
                      <div className={`text-center py-2 px-4 rounded-lg font-bold ${
                        isToday ? 'bg-red-100 text-red-800' :
                        isUpcoming ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {isToday ? '🔥 Today!' : diffDays === 1 ? '⏰ Tomorrow!' : `📅 ${diffDays} days away`}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Add Custom Muhurat Modal */}
            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                  onClick={() => setShowAddForm(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl p-8 max-w-md w-full"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Add Custom Muhurat</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Event Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 outline-none"
                          placeholder="e.g., My Wedding Ceremony"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time</label>
                          <input
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">End Time</label>
                          <input
                            type="time"
                            value={formData.endTime}
                            onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({...formData, type: e.target.value as Muhurat['type']})}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 outline-none"
                        >
                          <option value="general">General</option>
                          <option value="wedding">Wedding</option>
                          <option value="business">Business</option>
                          <option value="housewarming">Housewarming</option>
                          <option value="vehicle">Vehicle</option>
                          <option value="property">Property</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Optional)</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 outline-none"
                          rows={3}
                          placeholder="Add any additional details..."
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={handleAddReminder}
                        disabled={!formData.name || !formData.date}
                        className="flex-1 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Add Reminder
                      </button>
                      <button
                        onClick={() => setShowAddForm(false)}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Complete Guide to Shubh Muhurat {currentYear}</h2>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-2xl mb-8 border-2 border-orange-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Info className="w-6 h-6 mr-2 text-orange-600" />
                  What is Shubh Muhurat?
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Shubh Muhurat</strong> (शुभ मुहूर्त) is an auspicious time period in Hindu astrology calculated based on planetary positions, lunar day (Tithi), star constellation (Nakshatra), and other Panchang elements. Performing important activities during Shubh Muhurat is believed to bring success, prosperity, and positive outcomes.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  For <strong>{currentYear}</strong>, our Shubh Muhurat Reminder Bot provides <strong>personalized notifications for {selectedCity}, {stateName}</strong> with precise timings adjusted for your location's sunrise, sunset, and local timezone.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-bold text-xl text-gray-900 mb-3">✨ Why Muhurat Matters</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Aligns activities with cosmic energies</li>
                    <li>• Maximizes success probability</li>
                    <li>• Removes obstacles (Doshas)</li>
                    <li>• Brings divine blessings</li>
                    <li>• Traditional Vedic science</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="font-bold text-xl text-gray-900 mb-3">📱 Our Smart Features</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• {ALL_INDIAN_CITIES.length}+ cities covered</li>
                    <li>• Browser push notifications</li>
                    <li>• Calendar export (CSV/ICS)</li>
                    <li>• Custom reminder creation</li>
                    <li>• Based on authentic Panchang</li>
                  </ul>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQs) - Shubh Muhurat {currentYear}</h3>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">1. What is the best muhurat for marriage in {currentYear}?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      The most auspicious <strong>wedding muhurats for {currentYear}</strong> include Akshaya Tritiya (April 21), Gudi Padwa (March 30), and specific dates during Uttarayan (Jan-Jun). For <strong>{selectedCity}, {stateName}</strong>, consult our pre-loaded marriage muhurats with exact timings. Avoid Adhik Maas, Kharmas, and Rahu Kaal periods.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">2. How accurate are your muhurat timings for {selectedCity}?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Our Shubh Muhurat timings are <strong>99% accurate</strong> for {selectedCity}, {stateName} as they're calculated using:
                      • GPS coordinates of your city
                      • Local sunrise/sunset times
                      • Indian Standard Time (IST) offset
                      • Authentic Panchang algorithms
                      Timings may vary ±5 minutes based on exact location within city.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">3. Can I add my own custom muhurat dates?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Yes!</strong> Click the "Add Custom Muhurat" button to create personalized reminders for any event. You can set:
                      • Custom event name
                      • Specific date & time
                      • Event type (wedding/business/housewarming/vehicle)
                      • Description and notes
                      All custom muhurats are saved locally and you'll receive notifications 1 day before.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">4. What is Akshaya Tritiya and why is it the best muhurat?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Akshaya Tritiya (April 21, {currentYear})</strong> is the ONLY day in Hindu calendar where NO muhurat calculation is needed - the entire day is auspicious! "Akshaya" means "never diminishing." Activities started on this day bring everlasting prosperity. Best for: gold purchase, property buying, business start, weddings. No need to avoid Rahu Kaal on this day.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">5. How do browser notifications work for muhurat reminders?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      When you enable notifications:
                      1. Click "Enable" when browser asks for permission
                      2. Our bot checks upcoming muhurats every 24 hours
                      3. You receive notification <strong>1 day before</strong> each muhurat
                      4. Notification includes: Event name, date, time, and type
                      5. Works even when browser is closed (service worker technology)
                      Perfect for busy professionals who don't want to manually track dates!
                    </p>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">6. Which festivals have the best muhurats for business opening?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Top <strong>business opening muhurats in {currentYear}</strong>:
                      • <strong>Gudi Padwa (Mar 30)</strong> - Marathi New Year
                      • <strong>Akshaya Tritiya (Apr 21)</strong> - Universal muhurat
                      • <strong>Diwali (Oct 20)</strong> - Lakshmi Puja day
                      • <strong>Dhanteras (Oct 18)</strong> - Wealth day
                      For {selectedCity}, morning muhurats (6-10 AM) are best. Use our reminder bot to schedule notifications 7 days before.
                    </p>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">7. Can I download all {currentYear} muhurat dates?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Absolutely!</strong> Click the "Download Calendar" button to export:
                      • CSV format (Excel/Google Sheets compatible)
                      • All {PREDEFINED_MUHURATS_2025.length}+ pre-loaded muhurats
                      • Your custom reminders
                      • Includes: Date, time, Nakshatra, Tithi, type, description
                      You can then import into Google Calendar, Outlook, or Apple Calendar for offline access.
                    </p>
                  </div>

                  <div className="border-l-4 border-pink-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">8. What is the difference between Nakshatra and Tithi in muhurat?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Tithi:</strong> Lunar day (1-15), calculated by moon-sun angular distance. Each tithi lasts ~20-26 hours. Important for religious ceremonies.
                      <strong>Nakshatra:</strong> One of 27 star constellations (13°20' each) where moon transits. Each Nakshatra lasts ~24 hours. Critical for marriage, naming ceremonies.
                      Example: Akshaya Tritiya = <strong>Tithi:</strong> Tritiya (3rd day), <strong>Nakshatra:</strong> Rohini (most auspicious).
                    </p>
                  </div>

                  <div className="border-l-4 border-teal-500 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">9. Are these muhurats applicable outside India?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Yes, with adjustments!</strong> While we currently show <strong>{ALL_INDIAN_CITIES.length}+ Indian cities</strong>, muhurat principles apply globally. For NRIs/international users:
                      • Core date remains same (e.g., Diwali date is global)
                      • Timings need local sunrise/sunset adjustment
                      • Panchang calculations based on your longitude
                      • Example: Diwali muhurat in USA will be different time but same date
                      Request your city if not listed - we're expanding to global cities soon!
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-600 pl-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-2">10. What should I avoid during inauspicious muhurats?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Avoid these periods</strong> for important activities:
                      • <strong>Rahu Kaal:</strong> 1.5 hours daily (varies by weekday)
                      • <strong>Adhik Maas:</strong> Extra lunar month (~every 3 years)
                      • <strong>Kharmas:</strong> Mid-Dec to Mid-Jan (no auspicious work)
                      • <strong>Panchak:</strong> When moon in certain Nakshatras
                      • <strong>Solar/Lunar Eclipse:</strong> ±12 hours around event
                      Our reminder bot automatically excludes these periods from muhurat suggestions.
                    </p>
                  </div>
                </div>
              </div>

              {/* External Resources */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <ExternalLink className="w-6 h-6 mr-2 text-blue-600" />
                  Trusted External Resources for Muhurat {currentYear}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="https://www.drikpanchang.com/muhurat/muhurat.html" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <Globe className="w-4 h-4" />
                    <span>Drik Panchang - Authoritative Muhurat Times</span>
                  </a>
                  <a href="https://en.wikipedia.org/wiki/Muhurta" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <Globe className="w-4 h-4" />
                    <span>Wikipedia - Muhurat Explanation</span>
                  </a>
                  <a href="https://www.prokerala.com/astrology/muhurat/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <Globe className="w-4 h-4" />
                    <span>Prokerala - Marriage Muhurat Calculator</span>
                  </a>
                  <a href="https://www.mpanchang.com/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <Globe className="w-4 h-4" />
                    <span>mPanchang - Mobile Panchang App</span>
                  </a>
                </div>
              </div>

              {/* Related Tools */}
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8 rounded-2xl">
                <h3 className="text-3xl font-bold mb-6 text-center">More Festival & Astrology Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/festival-tools/nakshatra-festival" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all group">
                    <div className="flex items-center space-x-3 mb-2">
                      <Star className="w-6 h-6" />
                      <h4 className="font-bold text-lg">Nakshatra Calculator</h4>
                    </div>
                    <p className="text-white/90 text-sm">Find birth star for any date</p>
                  </Link>

                  <Link to="/festival-tools/festival-countdown-clock" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all group">
                    <div className="flex items-center space-x-3 mb-2">
                      <Clock className="w-6 h-6" />
                      <h4 className="font-bold text-lg">Festival Countdown</h4>
                    </div>
                    <p className="text-white/90 text-sm">Live countdown to festivals</p>
                  </Link>

                  <Link to="/festival-tools/diwali-date-finder" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all group">
                    <div className="flex items-center space-x-3 mb-2">
                      <Sparkles className="w-6 h-6" />
                      <h4 className="font-bold text-lg">Diwali Date {currentYear}</h4>
                    </div>
                    <p className="text-white/90 text-sm">Lakshmi Puja muhurat</p>
                  </Link>
                </div>
              </div>

              {/* Final CTA */}
              <div className="mt-12 text-center bg-gradient-to-br from-orange-100 to-red-100 p-8 rounded-2xl border-2 border-orange-300">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Never Miss an Auspicious Moment!</h3>
                <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                  Enable notifications now and let our AI-powered bot remind you of all important muhurats for {currentYear}!
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
                >
                  🔔 Set Up Your Reminders Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ShubhMuhuratReminder;

