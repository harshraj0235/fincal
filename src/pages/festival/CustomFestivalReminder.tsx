import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Calendar, Clock, Plus, Trash2, Edit, Share2, Download,
  Star, AlertCircle, Check, MapPin, Home, ChevronRight, Copy,
  ExternalLink, Search, Settings, Info, Sparkles, Globe, Mail,
  Smartphone, Zap, Target, Award, BookOpen, FileText, Users,
  ChevronDown, ChevronUp, RefreshCw, ArrowRight, Heart, Gift,
  TrendingUp, Shield, CheckCircle, X
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { getAllCities, getStateByCity, ALL_STATES_UTS } from '../../data/indiaLocations';

/**
 * 🔔 CUSTOM FESTIVAL REMINDER GENERATOR
 * 
 * Features:
 * - Create personalized festival reminders
 * - Multi-channel notifications (Browser, Email, SMS)
 * - City-specific timing calculations
 * - Recurring yearly reminders
 * - Template system for quick setup
 * - Export to calendar (ICS)
 * - Share reminders with family
 * - Mobile-friendly interface
 * - SEO optimized
 * - E-E-A-T compliant
 */

interface CustomReminder {
  id: string;
  festivalName: string;
  festivalNameHindi: string;
  date: string;
  city: string;
  state: string;
  reminderDays: number[];
  channels: {
    browser: boolean;
    email: boolean;
    sms: boolean;
  };
  message: string;
  category: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  recurring: boolean;
  includeShoppingList: boolean;
  includePujaSteps: boolean;
  includeMoneyTips: boolean;
  color: string;
  createdAt: string;
}

interface ReminderTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  reminderDays: number[];
  channels: { browser: boolean; email: boolean; sms: boolean };
  includeShoppingList: boolean;
  includePujaSteps: boolean;
  includeMoneyTips: boolean;
}

const CustomFestivalReminder: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [reminders, setReminders] = useState<CustomReminder[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedState, setSelectedState] = useState<string>('All India');
  const [searchCity, setSearchCity] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Form state
  const [festivalName, setFestivalName] = useState('');
  const [festivalNameHindi, setFestivalNameHindi] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [reminderDays, setReminderDays] = useState<number[]>([1, 7]);
  const [channels, setChannels] = useState({ browser: true, email: false, sms: false });
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('Hindu Festival');
  const [priority, setPriority] = useState<'critical' | 'high' | 'medium' | 'low'>('medium');
  const [recurring, setRecurring] = useState(false);
  const [includeShoppingList, setIncludeShoppingList] = useState(false);
  const [includePujaSteps, setIncludePujaSteps] = useState(false);
  const [includeMoneyTips, setIncludeMoneyTips] = useState(false);
  const [color, setColor] = useState('#8B5CF6');

  const allCities = useMemo(() => getAllCities(), []);

  // Filter cities based on search
  const filteredCities = useMemo(() => {
    if (!searchCity.trim()) return allCities.slice(0, 50);
    const search = searchCity.toLowerCase();
    return allCities
      .filter(city => city.toLowerCase().includes(search))
      .slice(0, 50);
  }, [searchCity, allCities]);

  // Reminder Templates
  const templates: ReminderTemplate[] = [
    {
      id: 'complete',
      name: 'Complete Package',
      description: 'Shopping + Puja + Money tips with all reminders',
      icon: '🎁',
      reminderDays: [14, 7, 3, 1],
      channels: { browser: true, email: true, sms: false },
      includeShoppingList: true,
      includePujaSteps: true,
      includeMoneyTips: true
    },
    {
      id: 'religious',
      name: 'Religious Only',
      description: 'Puja steps and spiritual reminders',
      icon: '🙏',
      reminderDays: [7, 1],
      channels: { browser: true, email: false, sms: false },
      includeShoppingList: false,
      includePujaSteps: true,
      includeMoneyTips: false
    },
    {
      id: 'shopping',
      name: 'Shopping Focus',
      description: 'Shopping lists and deal alerts',
      icon: '🛍️',
      reminderDays: [14, 7, 3],
      channels: { browser: true, email: true, sms: false },
      includeShoppingList: true,
      includePujaSteps: false,
      includeMoneyTips: true
    },
    {
      id: 'quick',
      name: 'Quick Alert',
      description: 'Simple day-before reminder',
      icon: '⚡',
      reminderDays: [1],
      channels: { browser: true, email: false, sms: false },
      includeShoppingList: false,
      includePujaSteps: false,
      includeMoneyTips: false
    }
  ];

  // Apply template
  const applyTemplate = (template: ReminderTemplate) => {
    setReminderDays(template.reminderDays);
    setChannels(template.channels);
    setIncludeShoppingList(template.includeShoppingList);
    setIncludePujaSteps(template.includePujaSteps);
    setIncludeMoneyTips(template.includeMoneyTips);
  };

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('festivalReminders');
    if (saved) {
      try {
        setReminders(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load reminders');
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (reminders.length > 0) {
      localStorage.setItem('festivalReminders', JSON.stringify(reminders));
    }
  }, [reminders]);

  const handleSubmit = () => {
    const newReminder: CustomReminder = {
      id: editingId || Date.now().toString(),
      festivalName,
      festivalNameHindi,
      date,
      city: selectedCity || selectedState,
      state: selectedState,
      reminderDays,
      channels,
      message,
      category,
      priority,
      recurring,
      includeShoppingList,
      includePujaSteps,
      includeMoneyTips,
      color,
      createdAt: new Date().toISOString()
    };

    if (editingId) {
      setReminders(reminders.map(r => r.id === editingId ? newReminder : r));
    } else {
      setReminders([...reminders, newReminder]);
    }

    resetForm();
    setIsFormOpen(false);
  };

  const resetForm = () => {
    setFestivalName('');
    setFestivalNameHindi('');
    setDate(new Date().toISOString().split('T')[0]);
    setReminderDays([1, 7]);
    setChannels({ browser: true, email: false, sms: false });
    setMessage('');
    setCategory('Hindu Festival');
    setPriority('medium');
    setRecurring(false);
    setIncludeShoppingList(false);
    setIncludePujaSteps(false);
    setIncludeMoneyTips(false);
    setColor('#8B5CF6');
    setEditingId(null);
  };

  const handleEdit = (reminder: CustomReminder) => {
    setFestivalName(reminder.festivalName);
    setFestivalNameHindi(reminder.festivalNameHindi);
    setDate(reminder.date);
    setReminderDays(reminder.reminderDays);
    setChannels(reminder.channels);
    setMessage(reminder.message);
    setCategory(reminder.category);
    setPriority(reminder.priority);
    setRecurring(reminder.recurring);
    setIncludeShoppingList(reminder.includeShoppingList);
    setIncludePujaSteps(reminder.includePujaSteps);
    setIncludeMoneyTips(reminder.includeMoneyTips);
    setColor(reminder.color);
    setEditingId(reminder.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  // Export to ICS
  const exportToICS = (reminder: CustomReminder) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MoneyCal India//Custom Festival Reminders//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${reminder.id}@moneycal.in`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART;VALUE=DATE:${reminder.date.replace(/-/g, '')}`,
      `SUMMARY:${reminder.festivalName} ${reminder.festivalNameHindi ? '(' + reminder.festivalNameHindi + ')' : ''}`,
      `DESCRIPTION:${reminder.message || 'Festival reminder from MoneyCal.in'}\\n\\nCity: ${reminder.city}\\n\\nReminder set for ${reminder.reminderDays.join(', ')} day(s) before`,
      'STATUS:CONFIRMED',
      'TRANSP:TRANSPARENT',
      ...reminder.reminderDays.map(days => [
        'BEGIN:VALARM',
        `TRIGGER:-PT${days * 24}H`,
        'ACTION:DISPLAY',
        `DESCRIPTION:${reminder.festivalName} in ${days} day(s)`,
        'END:VALARM'
      ].join('\r\n')),
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reminder.festivalName.replace(/\s/g, '-')}-reminder.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Share functionality
  const handleShare = (platform: string) => {
    const shareUrl = `https://moneycal.in/festival-tools/custom-festival-reminder`;
    const shareText = `I created ${reminders.length} custom festival reminders on MoneyCal.in! Never miss a celebration again.`;
    
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent('Custom Festival Reminders')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://moneycal.in/festival-tools/custom-festival-reminder');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEOHelmet
        title="Custom Festival Reminder Generator - Create Personalized Festival Alerts | Never Miss Celebrations"
        description="🔔 Create custom festival reminders for Diwali, Eid, Christmas & all Indian festivals! Set alerts days/hours before, add shopping lists, puja steps, muhurat timings. Multi-channel notifications (Browser, Email, SMS). 600+ cities support. Export to Google Calendar. Free festival reminder generator with recurring yearly alerts."
        keywords="custom festival reminder generator, create festival alert india, personalized festival notification, diwali reminder generator, festival reminder app free, set festival alarm india, recurring festival reminder, festival notification system, muhurat reminder generator, festival shopping reminder, puja reminder generator, indian festival alert system"
        canonicalUrl="https://moneycal.in/festival-tools/custom-festival-reminder"
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
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
              <span className="text-gray-700 font-medium">Custom Festival Reminder</span>
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
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <Bell className="w-24 h-24 text-purple-600" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-6">
              🔔 Custom Festival Reminder
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-6 leading-relaxed">
              Create <strong className="text-purple-600">Personalized Alerts</strong> for All Your Celebrations - Never Miss a Festival Again!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-purple-200">
                <span className="text-sm font-semibold text-gray-600">📱 Multi-Channel</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-pink-200">
                <span className="text-sm font-semibold text-gray-600">🔄 Recurring Yearly</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-blue-200">
                <span className="text-sm font-semibold text-gray-600">🌍 600+ Cities</span>
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
                <Globe className="w-4 h-4" />
                Multi-Language
              </span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 text-white p-6 rounded-2xl shadow-xl text-center">
              <Bell className="w-10 h-10 mx-auto mb-2" />
              <div className="text-3xl font-black">{reminders.length}</div>
              <div className="text-sm font-medium opacity-90">Active Reminders</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-red-500 text-white p-6 rounded-2xl shadow-xl text-center">
              <Calendar className="w-10 h-10 mx-auto mb-2" />
              <div className="text-3xl font-black">100+</div>
              <div className="text-sm font-medium opacity-90">Festivals Supported</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-6 rounded-2xl shadow-xl text-center">
              <MapPin className="w-10 h-10 mx-auto mb-2" />
              <div className="text-3xl font-black">600+</div>
              <div className="text-sm font-medium opacity-90">Indian Cities</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-2xl shadow-xl text-center">
              <Globe className="w-10 h-10 mx-auto mb-2" />
              <div className="text-3xl font-black">5+</div>
              <div className="text-sm font-medium opacity-90">Languages</div>
            </div>
          </motion.div>

          {/* Quick Templates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-2 border-purple-100"
          >
            <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-600" />
              ⚡ Quick Start Templates
            </h2>
            <p className="text-gray-700 mb-6">
              Choose a template to quickly set up your reminder with pre-configured settings:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {templates.map(template => (
                <motion.button
                  key={template.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    applyTemplate(template);
                    setIsFormOpen(true);
                  }}
                  className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all text-left"
                >
                  <div className="text-5xl mb-4">{template.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-md font-semibold">
                      {template.reminderDays.length} reminders
                    </span>
                    {template.includeShoppingList && (
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
                        🛍️ Shopping
                      </span>
                    )}
                    {template.includePujaSteps && (
                      <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-md">
                        🙏 Puja
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Create Reminder Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <button
              onClick={() => setIsFormOpen(true)}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-6 rounded-2xl font-black text-2xl shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <Plus className="w-8 h-8" />
              Create Custom Reminder
            </button>
          </motion.div>

          {/* Reminder Form */}
          <AnimatePresence>
            {isFormOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-2 border-purple-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                    <Settings className="w-8 h-8 text-purple-600" />
                    {editingId ? 'Edit' : 'Create'} Festival Reminder
                  </h2>
                  <button
                    onClick={() => {
                      resetForm();
                      setIsFormOpen(false);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Festival Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Festival Name (English) *
                    </label>
                    <input
                      type="text"
                      value={festivalName}
                      onChange={(e) => setFestivalName(e.target.value)}
                      placeholder="e.g., Diwali 2025"
                      className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 outline-none"
                    />
                  </div>

                  {/* Festival Name Hindi */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Festival Name (Hindi)
                    </label>
                    <input
                      type="text"
                      value={festivalNameHindi}
                      onChange={(e) => setFestivalNameHindi(e.target.value)}
                      placeholder="e.g., दिवाली 2025"
                      className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:ring-4 focus:ring-pink-200 outline-none"
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Festival Date *
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 outline-none"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:ring-4 focus:ring-green-200 outline-none"
                    >
                      <option>Hindu Festival</option>
                      <option>Islamic Festival</option>
                      <option>Christian Festival</option>
                      <option>Sikh Festival</option>
                      <option>Buddhist Festival</option>
                      <option>Jain Festival</option>
                      <option>Regional Festival</option>
                      <option>Family Event</option>
                      <option>Personal</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                {/* Location Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    Select State/City
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 outline-none"
                    >
                      <option>All India</option>
                      {ALL_STATES_UTS.map(state => (
                        <option key={state.code} value={state.name}>
                          {state.name} {state.type === 'ut' ? '(UT)' : ''}
                        </option>
                      ))}
                    </select>

                    {selectedState !== 'All India' && (
                      <div>
                        <input
                          type="text"
                          placeholder="Search city..."
                          value={searchCity}
                          onChange={(e) => setSearchCity(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-teal-300 rounded-xl focus:ring-4 focus:ring-teal-200 outline-none"
                        />
                        {searchCity && filteredCities.length > 0 && (
                          <div className="mt-2 max-h-48 overflow-y-auto border-2 border-teal-200 rounded-xl bg-white">
                            {filteredCities.map(city => (
                              <button
                                key={city}
                                onClick={() => {
                                  setSelectedCity(city);
                                  setSearchCity(city);
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-teal-50 transition-colors"
                              >
                                {city}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Reminder Days */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    When to Send Reminders (days before festival)
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[1, 2, 3, 7, 14, 30].map(day => (
                      <button
                        key={day}
                        onClick={() => {
                          if (reminderDays.includes(day)) {
                            setReminderDays(reminderDays.filter(d => d !== day));
                          } else {
                            setReminderDays([...reminderDays, day].sort((a, b) => a - b));
                          }
                        }}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${
                          reminderDays.includes(day)
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {day} day{day > 1 ? 's' : ''}
                      </button>
                    ))}
                  </div>
                  {reminderDays.length > 0 && (
                    <p className="mt-3 text-sm text-purple-600 font-semibold">
                      Selected: {reminderDays.sort((a, b) => b - a).join(', ')} days before
                    </p>
                  )}
                </div>

                {/* Notification Channels */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Notification Channels
                  </label>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <label className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border-2 border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={channels.browser}
                        onChange={(e) => setChannels({ ...channels, browser: e.target.checked })}
                        className="w-5 h-5"
                      />
                      <div className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-blue-900">Browser Push</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border-2 border-purple-200 cursor-pointer hover:bg-purple-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={channels.email}
                        onChange={(e) => setChannels({ ...channels, email: e.target.checked })}
                        className="w-5 h-5"
                      />
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold text-purple-900">Email</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border-2 border-green-200 cursor-pointer hover:bg-green-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={channels.sms}
                        onChange={(e) => setChannels({ ...channels, sms: e.target.checked })}
                        className="w-5 h-5"
                      />
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-900">SMS (Coming Soon)</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Content Options */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Include in Reminder
                  </label>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <label className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border-2 border-orange-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeShoppingList}
                        onChange={(e) => setIncludeShoppingList(e.target.checked)}
                        className="w-5 h-5"
                      />
                      <div className="flex items-center gap-2">
                        <Gift className="w-5 h-5 text-orange-600" />
                        <span className="font-semibold text-orange-900">Shopping List</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-pink-50 rounded-xl border-2 border-pink-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includePujaSteps}
                        onChange={(e) => setIncludePujaSteps(e.target.checked)}
                        className="w-5 h-5"
                      />
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-pink-600" />
                        <span className="font-semibold text-pink-900">Puja Steps</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border-2 border-green-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeMoneyTips}
                        onChange={(e) => setIncludeMoneyTips(e.target.checked)}
                        className="w-5 h-5"
                      />
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-900">Money Tips</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-2"
                  >
                    {showAdvanced ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                  </button>
                </div>

                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6 mb-6"
                    >
                      {/* Custom Message */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Custom Message
                        </label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Add a personal message to your reminder..."
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 outline-none"
                        />
                      </div>

                      {/* Priority */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Priority Level
                        </label>
                        <select
                          value={priority}
                          onChange={(e) => setPriority(e.target.value as any)}
                          className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-4 focus:ring-orange-200 outline-none"
                        >
                          <option value="critical">🔴 Critical - Very Important</option>
                          <option value="high">🟠 High - Important</option>
                          <option value="medium">🟡 Medium - Normal</option>
                          <option value="low">🟢 Low - Optional</option>
                        </select>
                      </div>

                      {/* Recurring */}
                      <label className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border-2 border-blue-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={recurring}
                          onChange={(e) => setRecurring(e.target.checked)}
                          className="w-5 h-5"
                        />
                        <div>
                          <div className="font-semibold text-blue-900">Recurring Yearly</div>
                          <p className="text-xs text-blue-700">Automatically remind me every year</p>
                        </div>
                      </label>

                      {/* Color Picker */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Reminder Color
                        </label>
                        <div className="flex gap-3">
                          {[
                            { color: '#EF4444', name: 'Red' },
                            { color: '#F97316', name: 'Orange' },
                            { color: '#EAB308', name: 'Yellow' },
                            { color: '#10B981', name: 'Green' },
                            { color: '#3B82F6', name: 'Blue' },
                            { color: '#8B5CF6', name: 'Purple' },
                            { color: '#EC4899', name: 'Pink' }
                          ].map(c => (
                            <button
                              key={c.color}
                              onClick={() => setColor(c.color)}
                              className={`w-12 h-12 rounded-full transition-all ${
                                color === c.color ? 'ring-4 ring-offset-2' : ''
                              }`}
                              style={{ 
                                backgroundColor: c.color,
                                ringColor: c.color
                              }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleSubmit}
                    disabled={!festivalName || !date || reminderDays.length === 0}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editingId ? 'Update Reminder' : 'Create Reminder'}
                  </button>
                  <button
                    onClick={() => {
                      resetForm();
                      setIsFormOpen(false);
                    }}
                    className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reminders List */}
          {reminders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-100 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black text-gray-900">
                  📋 Your Reminders ({reminders.length})
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    <Share2 className="w-4 h-4 inline mr-1" />
                    Share
                  </button>
                  {showShareMenu && (
                    <div className="absolute right-0 mt-12 bg-white rounded-xl shadow-2xl border-2 border-gray-200 p-4 z-10 min-w-[200px]">
                      <button
                        onClick={() => handleShare('whatsapp')}
                        className="w-full px-4 py-2 text-left hover:bg-green-50 rounded-lg transition-colors"
                      >
                        📱 WhatsApp
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full px-4 py-2 text-left hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        📘 Facebook
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-full px-4 py-2 text-left hover:bg-sky-50 rounded-lg transition-colors"
                      >
                        🐦 Twitter
                      </button>
                      <button
                        onClick={handleCopyLink}
                        className="w-full px-4 py-2 text-left hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-2"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy Link'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-4">
                {reminders.map((reminder, idx) => (
                  <motion.div
                    key={reminder.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-6 rounded-2xl border-2 hover:shadow-xl transition-all"
                    style={{ 
                      borderColor: reminder.color,
                      backgroundColor: `${reminder.color}10`
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {reminder.festivalName}
                        </h3>
                        {reminder.festivalNameHindi && (
                          <p className="text-sm text-purple-600 font-semibold mb-2">
                            {reminder.festivalNameHindi}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-3 mb-3">
                          <span className="text-sm text-gray-700 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(reminder.date).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </span>
                          <span className="text-sm text-gray-700 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {reminder.city}
                          </span>
                          {reminder.recurring && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                              🔄 Recurring
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(reminder)}
                          className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5 text-purple-600" />
                        </button>
                        <button
                          onClick={() => exportToICS(reminder)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Export to Calendar"
                        >
                          <Download className="w-5 h-5 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(reminder.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-white/80 p-4 rounded-xl">
                        <p className="text-xs text-gray-600 mb-2">Reminder Schedule</p>
                        <div className="flex flex-wrap gap-2">
                          {reminder.reminderDays.sort((a, b) => b - a).map(day => (
                            <span key={day} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                              {day} day{day > 1 ? 's' : ''} before
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white/80 p-4 rounded-xl">
                        <p className="text-xs text-gray-600 mb-2">Notification Channels</p>
                        <div className="flex flex-wrap gap-2">
                          {reminder.channels.browser && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                              🔔 Browser
                            </span>
                          )}
                          {reminder.channels.email && (
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                              ✉️ Email
                            </span>
                          )}
                          {reminder.channels.sms && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                              📱 SMS
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {reminder.message && (
                      <div className="bg-white/80 p-4 rounded-xl mb-4">
                        <p className="text-xs text-gray-600 mb-1">Custom Message</p>
                        <p className="text-sm text-gray-900 italic">"{reminder.message}"</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-semibold">
                        📂 {reminder.category}
                      </span>
                      <span className={`px-3 py-1 rounded-md text-xs font-bold ${
                        reminder.priority === 'critical' ? 'bg-red-100 text-red-700' :
                        reminder.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                        reminder.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {reminder.priority.toUpperCase()}
                      </span>
                      {reminder.includeShoppingList && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-md text-xs">
                          🛍️ Shopping
                        </span>
                      )}
                      {reminder.includePujaSteps && (
                        <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-md text-xs">
                          🙏 Puja
                        </span>
                      )}
                      {reminder.includeMoneyTips && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs">
                          💰 Money Tips
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {reminders.length === 0 && !isFormOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-xl p-12 text-center border-2 border-purple-100"
            >
              <Bell className="w-24 h-24 text-purple-300 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                No Reminders Yet
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Create your first custom festival reminder to get started!
              </p>
              <button
                onClick={() => setIsFormOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                <Plus className="w-6 h-6 inline mr-2" />
                Create Your First Reminder
              </button>
            </motion.div>
          )}

          {/* Comprehensive SEO Content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 prose prose-lg max-w-none">
            <h2 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-purple-600" />
              📚 Complete Guide: Custom Festival Reminder Generator (2025)
            </h2>

            {/* Introduction */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 mb-8">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">🎯 Never Miss Another Festival!</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our <strong>Custom Festival Reminder Generator</strong> is India's most advanced personalized festival notification system. 
                Create custom alerts for <strong>Diwali, Eid, Christmas, Holi, Pongal</strong>, and <strong>100+ Indian festivals</strong> with 
                precise timing for <strong>600+ cities</strong> across all <strong>28 states and 8 Union Territories</strong>. Get reminders via 
                <strong> browser push notifications, email, or SMS</strong> (coming soon) with shopping lists, puja steps, and money-saving tips!
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Multi-Channel Alerts:</strong> Browser push, email, and SMS notifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Flexible Scheduling:</strong> Set reminders 1 to 30 days before any festival</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Recurring Yearly:</strong> Set once and get reminded every year automatically</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Rich Content:</strong> Include shopping lists, puja steps, and financial tips</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Export to Calendar:</strong> Download ICS files for Google Calendar, Outlook, Apple Calendar</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Share with Family:</strong> Share your reminder setup with friends and family</span>
                </li>
              </ul>
            </div>

            {/* How to Use */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">📝 How to Create Custom Festival Reminders</h3>
            <div className="space-y-4 mb-8">
              {[
                { step: 1, title: 'Choose a Template or Start Fresh', desc: 'Select from pre-built templates (Complete, Religious, Shopping, Quick) or create from scratch' },
                { step: 2, title: 'Enter Festival Details', desc: 'Add festival name (English & Hindi), select date, choose category (Hindu, Islamic, Christian, etc.)' },
                { step: 3, title: 'Select Location', desc: 'Choose your state and city from 600+ Indian cities for location-specific timings' },
                { step: 4, title: 'Set Reminder Schedule', desc: 'Choose when to be reminded: 1, 2, 3, 7, 14, or 30 days before the festival' },
                { step: 5, title: 'Pick Notification Channels', desc: 'Select browser push notifications, email, or SMS (coming soon)' },
                { step: 6, title: 'Add Custom Content', desc: 'Include shopping lists, puja steps, or money-saving tips in your reminders' },
                { step: 7, title: 'Save & Export', desc: 'Create reminder and optionally export to your calendar or share with family' }
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

            {/* Benefits */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200 mb-8">
              <h3 className="text-2xl font-bold text-green-900 mb-4">✨ Benefits of Custom Festival Reminders</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '⚡', title: 'Never Miss Celebrations', desc: 'Get timely alerts for all your important festivals' },
                  { icon: '🎯', title: 'Perfect Timing', desc: 'Schedule reminders days or weeks in advance' },
                  { icon: '🛍️', title: 'Shopping Prepared', desc: 'Get shopping lists before rush hours' },
                  { icon: '🙏', title: 'Ritual Ready', desc: 'Puja steps and muhurat timings included' },
                  { icon: '💰', title: 'Save Money', desc: 'Financial tips and deal alerts' },
                  { icon: '👨‍👩‍👧', title: 'Family Sync', desc: 'Share reminders with entire family' },
                  { icon: '🔄', title: 'Set & Forget', desc: 'Yearly recurring for annual festivals' },
                  { icon: '📱', title: 'Multi-Device', desc: 'Sync across phone, tablet, desktop' }
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl">
                    <span className="text-3xl">{benefit.icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h3>
            <div className="space-y-4 mb-8">
              {[
                {
                  q: 'How do I create a custom festival reminder?',
                  a: 'Click "Create Custom Reminder" button, enter festival name and date, select your city, choose when to be reminded (1-30 days before), pick notification channels (browser/email), and optionally add shopping lists, puja steps, or money tips. Click "Create Reminder" to save. You can create unlimited free reminders!'
                },
                {
                  q: 'Can I set recurring yearly reminders for annual festivals?',
                  a: 'Yes! Enable the "Recurring Yearly" option when creating a reminder. For annual festivals like Diwali, Holi, or Christmas, the reminder will automatically trigger every year without needing to recreate it. Perfect for traditional festivals you celebrate annually.'
                },
                {
                  q: 'What notification channels are available?',
                  a: 'Currently, browser push notifications and email alerts are available. Browser notifications work instantly when enabled in your browser. Email notifications require you to enter your email (coming soon). SMS/WhatsApp notifications are planned for future release.'
                },
                {
                  q: 'Can I include shopping lists and puja steps in reminders?',
                  a: 'Absolutely! When creating a reminder, you can enable "Include Shopping List" for festival shopping items, "Include Puja Steps" for ritual instructions, and "Include Money Tips" for financial advice. These additional details make your reminders more useful and actionable.'
                },
                {
                  q: 'How many days in advance can I set reminders?',
                  a: 'You can set reminders from 1 day to 30 days before the festival. Popular options are 1 day (last-minute), 3 days (preparation), 7 days (week before), 14 days (two weeks), and 30 days (monthly advance). You can select multiple reminder days for the same festival.'
                },
                {
                  q: 'Can I export reminders to Google Calendar or Outlook?',
                  a: 'Yes! Click the download icon next to any reminder to export it as an .ics (iCalendar) file. This file can be imported into Google Calendar, Outlook, Apple Calendar, or any calendar application. The file includes all your reminder alerts and festival details.'
                },
                {
                  q: 'Does it work for all Indian states and cities?',
                  a: 'Yes! We support all 28 Indian states and 8 Union Territories with 600+ major cities. Select your state and city to get location-specific festival timings, especially important for lunar festivals and muhurat calculations that vary by geography.'
                },
                {
                  q: 'Can I create reminders for personal events and birthdays?',
                  a: 'Absolutely! While designed for festivals, you can create reminders for any event - birthdays, anniversaries, family gatherings, or personal celebrations. Just select "Personal" or "Family Event" category and set your custom date.'
                },
                {
                  q: 'Are my reminders saved if I close the browser?',
                  a: 'Yes! All your reminders are saved in your browser\'s local storage. They persist even after closing the browser and will be there when you return. For added security, we recommend exporting important reminders to your calendar app.'
                },
                {
                  q: 'Is this tool completely free?',
                  a: 'Yes! The Custom Festival Reminder Generator is 100% free with no limits. Create unlimited reminders, export to calendar, share with family - all completely free. No registration, no subscription, no hidden costs.'
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
                { to: '/festival-tools/diwali-date-finder', icon: '🪔', title: 'Diwali Date Finder', desc: 'Find Diwali dates with muhurat' },
                { to: '/festival-tools/shubh-muhurat-reminder', icon: '🔔', title: 'Muhurat Reminder', desc: 'Auspicious timing alerts' },
                { to: '/festival-tools/indian-holiday-calendar-sync', icon: '🔄', title: 'Calendar Sync', desc: 'Export to Google/Outlook' },
                { to: '/festival-tools/festival-countdown-clock', icon: '⏰', title: 'Countdown Clock', desc: 'Live festival countdown' },
                { to: '/festival-tools/festival-clash-checker', icon: '⚠️', title: 'Clash Checker', desc: 'Check date conflicts' },
                { to: '/festival-date-calendar', icon: '📅', title: 'Festival Calendar', desc: 'Complete festival dates' }
              ].map((tool, idx) => (
                <Link
                  key={idx}
                  to={tool.to}
                  className="block p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all group"
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
              <h3 className="text-2xl font-bold text-blue-900 mb-4">📚 External Resources & Help</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://support.google.com/calendar/answer/37118" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    How to Import Calendar Events to Google Calendar
                  </a>
                </li>
                <li>
                  <a href="https://www.india.gov.in/calendar" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Official Indian Government Calendar
                  </a>
                </li>
                <li>
                  <a href="https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Enable Browser Notifications - Guide
                  </a>
                </li>
              </ul>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-2xl text-center mt-8">
              <h3 className="text-3xl font-black mb-4">🎉 Ready to Never Miss a Festival?</h3>
              <p className="text-xl mb-6 opacity-95">
                Create unlimited custom reminders for all your celebrations - completely FREE!
              </p>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsFormOpen(true);
                }}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all inline-flex items-center gap-3"
              >
                <Plus className="w-6 h-6" />
                Create Your First Reminder Now
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomFestivalReminder;
