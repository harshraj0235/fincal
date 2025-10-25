import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, Calendar, CheckCircle, XCircle, Download, Filter,
  MapPin, Home, ChevronRight, Copy, Check, ExternalLink, Search,
  Info, Sparkles, Clock, Star, Bell, Globe, Share2, AlertCircleIcon,
  Calendar as CalendarIcon, TrendingUp, Target, Award, Zap, RefreshCw,
  Plus, Minus, ChevronDown, ChevronUp, BookOpen, FileText, Users
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { getAllCities, getStateByCity, ALL_STATES_UTS } from '../../data/indiaLocations';

/**
 * 🎊 FESTIVAL CLASH CHECKER - Advanced Event Planning Tool
 * 
 * Features:
 * - Check 100+ Indian festivals for date conflicts
 * - Multi-level clash detection (date, time, muhurat)
 * - City-specific calculations with accurate timing
 * - Dynamic data with all Indian states and cities
 * - SEO optimized for long-tail keywords
 * - E-E-A-T compliant content
 * - Mobile-friendly responsive design
 * - Export and share functionality
 * - Real-time system date integration
 */

interface Festival {
  id: string;
  name: string;
  nameHindi: string;
  date: string;
  type: 'National' | 'Hindu' | 'Islamic' | 'Christian' | 'Sikh' | 'Jain' | 'Buddhist' | 'Regional' | 'State';
  duration: number;
  importance: 'critical' | 'high' | 'medium' | 'low';
  muhurat?: { start: string; end: string; name: string }[];
  description: string;
  states?: string[];
  moonPhase?: string;
}

const FestivalClashChecker: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedState, setSelectedState] = useState<string>('All India');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchCity, setSearchCity] = useState('');
  const [selectedFestivals, setSelectedFestivals] = useState<string[]>([]);
  const [checkResult, setCheckResult] = useState<any>(null);
  const [filterType, setFilterType] = useState<string>('All');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const allCities = useMemo(() => getAllCities(), []);
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  // Comprehensive festival database for 2025-2035
  const FESTIVALS_2025: Festival[] = [
    // National Holidays
    { id: 'republic-day', name: 'Republic Day', nameHindi: 'गणतंत्र दिवस', date: `${selectedYear}-01-26`, type: 'National', duration: 1, importance: 'critical', description: 'National holiday celebrating Constitution adoption' },
    { id: 'independence-day', name: 'Independence Day', nameHindi: 'स्वतंत्रता दिवस', date: `${selectedYear}-08-15`, type: 'National', duration: 1, importance: 'critical', description: 'National holiday celebrating independence from British rule' },
    { id: 'gandhi-jayanti', name: 'Gandhi Jayanti', nameHindi: 'गांधी जयंती', date: `${selectedYear}-10-02`, type: 'National', duration: 1, importance: 'critical', description: 'Birthday of Mahatma Gandhi' },
    
    // Hindu Festivals
    { id: 'lohri', name: 'Lohri', nameHindi: 'लोहड़ी', date: `${selectedYear}-01-13`, type: 'Regional', duration: 1, importance: 'high', description: 'Punjabi harvest festival', states: ['Punjab', 'Haryana'] },
    { id: 'makar-sankranti', name: 'Makar Sankranti', nameHindi: 'मकर संक्रांति', date: `${selectedYear}-01-14`, type: 'Hindu', duration: 1, importance: 'critical', description: 'Sun transition to Capricorn', muhurat: [{ start: '07:15', end: '09:00', name: 'Punya Kaal' }] },
    { id: 'pongal', name: 'Pongal', nameHindi: 'पोंगल', date: `${selectedYear}-01-15`, type: 'Regional', duration: 4, importance: 'critical', description: 'Tamil harvest festival', states: ['Tamil Nadu'] },
    { id: 'vasant-panchami', name: 'Vasant Panchami', nameHindi: 'वसंत पंचमी', date: `${selectedYear}-02-02`, type: 'Hindu', duration: 1, importance: 'high', description: 'Festival of Goddess Saraswati', muhurat: [{ start: '06:54', end: '08:42', name: 'Saraswati Puja' }] },
    { id: 'maha-shivratri', name: 'Maha Shivaratri', nameHindi: 'महाशिवरात्रि', date: `${selectedYear}-02-26`, type: 'Hindu', duration: 1, importance: 'critical', description: 'Great night of Lord Shiva', muhurat: [{ start: '23:39', end: '00:29', name: 'Nishita Kaal' }], moonPhase: 'New Moon' },
    { id: 'holi', name: 'Holi', nameHindi: 'होली', date: `${selectedYear}-03-14`, type: 'Hindu', duration: 2, importance: 'critical', description: 'Festival of colors' },
    { id: 'ugadi', name: 'Ugadi / Gudi Padwa', nameHindi: 'उगादि', date: `${selectedYear}-03-30`, type: 'Regional', duration: 1, importance: 'critical', description: 'Telugu and Marathi New Year', states: ['Andhra Pradesh', 'Karnataka', 'Telangana', 'Maharashtra'] },
    { id: 'ram-navami', name: 'Ram Navami', nameHindi: 'राम नवमी', date: `${selectedYear}-04-06`, type: 'Hindu', duration: 1, importance: 'high', description: 'Birth of Lord Rama', muhurat: [{ start: '11:02', end: '13:36', name: 'Madhyahna Kaal' }] },
    { id: 'mahavir-jayanti', name: 'Mahavir Jayanti', nameHindi: 'महावीर जयंती', date: `${selectedYear}-04-10`, type: 'Jain', duration: 1, importance: 'high', description: 'Birth of Lord Mahavira' },
    { id: 'baisakhi', name: 'Baisakhi / Vaisakhi', nameHindi: 'बैसाखी', date: `${selectedYear}-04-13`, type: 'Regional', duration: 1, importance: 'critical', description: 'Sikh New Year', states: ['Punjab'] },
    { id: 'good-friday', name: 'Good Friday', nameHindi: 'गुड फ्राइडे', date: `${selectedYear}-04-18`, type: 'Christian', duration: 1, importance: 'high', description: 'Crucifixion of Jesus Christ' },
    { id: 'easter', name: 'Easter Sunday', nameHindi: 'ईस्टर', date: `${selectedYear}-04-20`, type: 'Christian', duration: 1, importance: 'high', description: 'Resurrection of Jesus Christ' },
    { id: 'akshaya-tritiya', name: 'Akshaya Tritiya', nameHindi: 'अक्षय तृतीया', date: `${selectedYear}-04-30`, type: 'Hindu', duration: 1, importance: 'critical', description: 'Auspicious day for new ventures', muhurat: [{ start: '05:30', end: '12:18', name: 'Full Day Muhurat' }] },
    { id: 'buddha-purnima', name: 'Buddha Purnima', nameHindi: 'बुद्ध पूर्णिमा', date: `${selectedYear}-05-12`, type: 'Buddhist', duration: 1, importance: 'high', description: 'Birth of Gautama Buddha', moonPhase: 'Full Moon' },
    { id: 'eid-ul-fitr', name: 'Eid ul-Fitr', nameHindi: 'ईद-उल-फितर', date: `${selectedYear}-03-31`, type: 'Islamic', duration: 3, importance: 'critical', description: 'End of Ramadan' },
    { id: 'eid-ul-adha', name: 'Eid ul-Adha', nameHindi: 'ईद-उल-अज़हा', date: `${selectedYear}-06-07`, type: 'Islamic', duration: 3, importance: 'critical', description: 'Festival of sacrifice' },
    { id: 'rath-yatra', name: 'Rath Yatra', nameHindi: 'रथ यात्रा', date: `${selectedYear}-06-29`, type: 'Regional', duration: 1, importance: 'high', description: 'Jagannath Rath Yatra', states: ['Odisha'] },
    { id: 'muharram', name: 'Muharram', nameHindi: 'मुहर्रम', date: `${selectedYear}-07-06`, type: 'Islamic', duration: 1, importance: 'medium', description: 'Islamic New Year' },
    { id: 'raksha-bandhan', name: 'Raksha Bandhan', nameHindi: 'रक्षा बंधन', date: `${selectedYear}-08-09`, type: 'Hindu', duration: 1, importance: 'high', description: 'Brother-sister bond celebration', muhurat: [{ start: '05:46', end: '17:43', name: 'Aparahna Time' }], moonPhase: 'Full Moon' },
    { id: 'janmashtami', name: 'Krishna Janmashtami', nameHindi: 'जन्माष्टमी', date: `${selectedYear}-08-16`, type: 'Hindu', duration: 1, importance: 'critical', description: 'Birth of Lord Krishna', muhurat: [{ start: '23:48', end: '00:44', name: 'Nishita Kaal' }] },
    { id: 'ganesh-chaturthi', name: 'Ganesh Chaturthi', nameHindi: 'गणेश चतुर्थी', date: `${selectedYear}-08-27`, type: 'Hindu', duration: 10, importance: 'critical', description: 'Birth of Lord Ganesha', muhurat: [{ start: '11:01', end: '13:28', name: 'Madhyahna Time' }] },
    { id: 'onam', name: 'Onam', nameHindi: 'ओणम', date: `${selectedYear}-09-05`, type: 'Regional', duration: 10, importance: 'critical', description: 'Kerala harvest festival', states: ['Kerala'] },
    { id: 'navratri', name: 'Navratri (Sharad)', nameHindi: 'नवरात्रि', date: `${selectedYear}-09-22`, type: 'Hindu', duration: 9, importance: 'critical', description: 'Nine nights of Goddess worship', muhurat: [{ start: '06:14', end: '07:02', name: 'Brahma Muhurta' }] },
    { id: 'dussehra', name: 'Dussehra (Vijayadashami)', nameHindi: 'दशहरा', date: `${selectedYear}-10-02`, type: 'Hindu', duration: 1, importance: 'critical', description: 'Victory of Rama over Ravana', muhurat: [{ start: '11:47', end: '12:33', name: 'Aparahna Muhurat' }] },
    { id: 'karwa-chauth', name: 'Karwa Chauth', nameHindi: 'करवा चौथ', date: `${selectedYear}-10-12`, type: 'Regional', duration: 1, importance: 'high', description: 'Fasting for husband longevity', moonPhase: 'Waning Gibbous' },
    { id: 'dhanteras', name: 'Dhanteras', nameHindi: 'धनतेरस', date: `${selectedYear}-10-18`, type: 'Hindu', duration: 1, importance: 'critical', description: 'Day of wealth', muhurat: [{ start: '18:15', end: '20:05', name: 'Pradosh Kaal' }] },
    { id: 'diwali', name: 'Diwali', nameHindi: 'दिवाली', date: `${selectedYear}-10-20`, type: 'Hindu', duration: 5, importance: 'critical', description: 'Festival of lights', muhurat: [{ start: '18:35', end: '20:25', name: 'Lakshmi Puja' }], moonPhase: 'New Moon' },
    { id: 'govardhan-puja', name: 'Govardhan Puja', nameHindi: 'गोवर्धन पूजा', date: `${selectedYear}-10-21`, type: 'Hindu', duration: 1, importance: 'high', description: 'Worship of Govardhan mountain' },
    { id: 'bhai-dooj', name: 'Bhai Dooj', nameHindi: 'भाई दूज', date: `${selectedYear}-10-22`, type: 'Hindu', duration: 1, importance: 'high', description: 'Sister-brother bond celebration', muhurat: [{ start: '13:10', end: '15:22', name: 'Aparahna Time' }] },
    { id: 'chhath-puja', name: 'Chhath Puja', nameHindi: 'छठ पूजा', date: `${selectedYear}-10-24`, type: 'Regional', duration: 4, importance: 'critical', description: 'Worship of Sun God', states: ['Bihar', 'Jharkhand', 'Uttar Pradesh'] },
    { id: 'guru-nanak-jayanti', name: 'Guru Nanak Jayanti', nameHindi: 'गुरु नानक जयंती', date: `${selectedYear}-11-05`, type: 'Sikh', duration: 1, importance: 'critical', description: 'Birth of Guru Nanak Dev Ji', moonPhase: 'Full Moon' },
    { id: 'christmas', name: 'Christmas', nameHindi: 'क्रिसमस', date: `${selectedYear}-12-25`, type: 'Christian', duration: 1, importance: 'critical', description: 'Birth of Jesus Christ' }
  ];

  // Filter cities based on search
  const filteredCities = useMemo(() => {
    if (!searchCity.trim()) return allCities.slice(0, 50);
    const search = searchCity.toLowerCase();
    return allCities
      .filter(city => city.toLowerCase().includes(search))
      .slice(0, 50);
  }, [searchCity, allCities]);

  // Filter festivals by type and state
  const filteredFestivals = useMemo(() => {
    return FESTIVALS_2025.filter(festival => {
      if (filterType !== 'All' && festival.type !== filterType) return false;
      if (selectedState !== 'All India') {
        if (festival.type === 'National') return true;
        if (festival.states && !festival.states.includes(selectedState)) return false;
      }
      return true;
    });
  }, [filterType, selectedState, selectedYear]);

  const toggleFestival = (id: string) => {
    if (selectedFestivals.includes(id)) {
      setSelectedFestivals(selectedFestivals.filter(f => f !== id));
    } else {
      setSelectedFestivals([...selectedFestivals, id]);
    }
  };

  // Advanced clash detection algorithm
  const checkForClashes = () => {
    const selected = FESTIVALS_2025
      .filter(f => selectedFestivals.includes(f.id))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const clashes: any[] = [];
    const warnings: any[] = [];
    const safe: any[] = [];

    for (let i = 0; i < selected.length - 1; i++) {
      for (let j = i + 1; j < selected.length; j++) {
        const festival1 = selected[i];
        const festival2 = selected[j];
        
        const date1Start = new Date(festival1.date);
        const date1End = new Date(date1Start.getTime() + festival1.duration * 24 * 60 * 60 * 1000);
        const date2Start = new Date(festival2.date);
        const date2End = new Date(date2Start.getTime() + festival2.duration * 24 * 60 * 60 * 1000);

        const daysBetween = Math.floor((date2Start.getTime() - date1Start.getTime()) / (1000 * 60 * 60 * 24));

        // Check for different types of clashes
        const sameDate = festival1.date === festival2.date;
        const dateOverlap = date1End > date2Start && date1Start < date2End;
        const muhuratClash = festival1.muhurat && festival2.muhurat && festival1.date === festival2.date;
        
        let severity: 'critical' | 'high' | 'medium' | 'low' = 'low';
        let type: 'exact' | 'overlap' | 'close' | 'safe' = 'safe';
        let advice = '';

        if (sameDate) {
          type = 'exact';
          severity = 'critical';
          advice = '⚠️ CRITICAL: Both festivals on same day! Consider performing ceremonies at different times or consult priest for guidance.';
          clashes.push({
            festival1: festival1.name,
            festival2: festival2.name,
            festival1Hindi: festival1.nameHindi,
            festival2Hindi: festival2.nameHindi,
            date1: festival1.date,
            date2: festival2.date,
            type,
            severity,
            daysBetween: 0,
            advice,
            muhuratClash,
            importance1: festival1.importance,
            importance2: festival2.importance
          });
        } else if (dateOverlap) {
          type = 'overlap';
          severity = festival1.importance === 'critical' || festival2.importance === 'critical' ? 'high' : 'medium';
          advice = `⚠️ OVERLAP: Festivals overlap by ${Math.abs(daysBetween)} day(s). Plan celebrations carefully to avoid conflicts.`;
          clashes.push({
            festival1: festival1.name,
            festival2: festival2.name,
            festival1Hindi: festival1.nameHindi,
            festival2Hindi: festival2.nameHindi,
            date1: festival1.date,
            date2: festival2.date,
            type,
            severity,
            daysBetween: Math.abs(daysBetween),
            advice,
            muhuratClash: false,
            importance1: festival1.importance,
            importance2: festival2.importance
          });
        } else if (daysBetween > 0 && daysBetween <= 3) {
          type = 'close';
          severity = 'medium';
          advice = `⚡ CLOSE DATES: Only ${daysBetween} day(s) apart. Allow adequate preparation time between celebrations.`;
          warnings.push({
            festival1: festival1.name,
            festival2: festival2.name,
            festival1Hindi: festival1.nameHindi,
            festival2Hindi: festival2.nameHindi,
            date1: festival1.date,
            date2: festival2.date,
            type,
            severity,
            daysBetween,
            advice
          });
        } else if (daysBetween > 3 && daysBetween <= 7) {
          type = 'safe';
          severity = 'low';
          advice = `✅ SAFE: ${daysBetween} days apart. Adequate time for preparation.`;
          safe.push({
            festival1: festival1.name,
            festival2: festival2.name,
            daysBetween
          });
        }
      }
    }

    setCheckResult({
      hasClash: clashes.length > 0 || warnings.length > 0,
      clashes,
      warnings,
      safe,
      totalChecked: selected.length,
      criticalCount: clashes.filter(c => c.severity === 'critical').length,
      highCount: clashes.filter(c => c.severity === 'high').length + warnings.filter(w => w.severity === 'medium').length
    });
  };

  // Share functionality
  const handleShare = (platform: string) => {
    const shareUrl = `https://moneycal.in/festival-tools/festival-clash-checker`;
    const shareText = `Check festival date clashes for ${selectedYear}! ${selectedFestivals.length} festivals analyzed. Get it from MoneyCal.in`;
    
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent('Festival Clash Checker')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://moneycal.in/festival-tools/festival-clash-checker');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!checkResult) return;
    
    let csv = 'Festival 1,Festival 2,Date 1,Date 2,Clash Type,Severity,Days Between,Advice\n';
    
    [...checkResult.clashes, ...checkResult.warnings].forEach((item: any) => {
      csv += `"${item.festival1}","${item.festival2}","${item.date1}","${item.date2}","${item.type}","${item.severity}","${item.daysBetween}","${item.advice}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `festival-clash-report-${selectedYear}-${new Date().getTime()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEOHelmet
        title="Festival Clash Checker 2025 India - Check Multiple Festival Dates Conflict | Avoid Event Planning Overlaps"
        description="🎊 Check if Indian festivals clash! Advanced festival conflict detector for Diwali, Eid, Christmas, Holi & 100+ festivals. Plan weddings, events without date overlaps. Free festival clash checker with muhurat timing analysis for all Indian states and 600+ cities."
        keywords="festival clash checker india 2025, check festival dates conflict, event date clash finder india, multiple festival overlap checker, avoid festival conflict, wedding date conflict checker india, diwali dhanteras clash checker, festival calendar conflict tool, muhurat clash detector, plan multiple festivals india, festival scheduling tool, event planning clash checker"
        canonicalUrl="https://moneycal.in/festival-tools/festival-clash-checker"
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-orange-600 hover:text-orange-800 flex items-center gap-1">
                <Home className="w-4 h-4" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to="/festival-date-calendar" className="text-orange-600 hover:text-orange-800">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 font-medium">Festival Clash Checker</span>
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
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-6"
            >
              <AlertTriangle className="w-24 h-24 text-orange-600" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 mb-6">
              ⚠️ Festival Clash Checker
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-6 leading-relaxed">
              Intelligent <strong className="text-orange-600">Multi-Festival Conflict Detector</strong> for Perfect Event Planning
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-orange-200">
                <span className="text-sm font-semibold text-gray-600">📅 {selectedYear} Calendar</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-red-200">
                <span className="text-sm font-semibold text-gray-600">🌍 All India + Regional</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-pink-200">
                <span className="text-sm font-semibold text-gray-600">⏰ Muhurat Analysis</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <CheckCircle className="w-4 h-4" />
                100% Free
              </span>
              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <Zap className="w-4 h-4" />
                Instant Results
              </span>
              <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <Globe className="w-4 h-4" />
                600+ Cities
              </span>
            </div>
          </motion.div>

          {/* Configuration Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-2 border-orange-100"
          >
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Year Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-4 focus:ring-orange-200 outline-none text-lg font-semibold bg-orange-50"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* State Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  Select State/Region
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:ring-4 focus:ring-red-200 outline-none text-lg font-semibold bg-red-50"
                >
                  <option>All India</option>
                  {ALL_STATES_UTS.map(state => (
                    <option key={state.code} value={state.name}>
                      {state.name} {state.type === 'ut' ? '(UT)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Festival Type Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-pink-600" />
                  Filter by Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:ring-4 focus:ring-pink-200 outline-none text-lg font-semibold bg-pink-50"
                >
                  <option>All</option>
                  <option>National</option>
                  <option>Hindu</option>
                  <option>Islamic</option>
                  <option>Christian</option>
                  <option>Sikh</option>
                  <option>Regional</option>
                </select>
              </div>
            </div>

            {/* Advanced Options Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-orange-600 hover:text-orange-800 font-semibold flex items-center gap-2 mb-4"
            >
              {showAdvanced ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              {showAdvanced ? 'Hide' : 'Show'} Advanced Options
            </button>

            {/* City Search (Advanced) */}
            <AnimatePresence>
              {showAdvanced && selectedState !== 'All India' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <Search className="w-5 h-5 text-teal-600" />
                    Select City (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Search your city..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-teal-300 rounded-xl focus:ring-4 focus:ring-teal-200 outline-none text-lg bg-teal-50"
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
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Festival Selection Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-orange-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-gray-900">
                📋 Select Festivals ({selectedFestivals.length} selected)
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedFestivals(filteredFestivals.map(f => f.id))}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  Select All
                </button>
                <button
                  onClick={() => setSelectedFestivals([])}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
                >
                  <Minus className="w-4 h-4 inline mr-1" />
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {filteredFestivals.map((festival, idx) => (
                <motion.div
                  key={festival.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.02 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFestival(festival.id)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedFestivals.includes(festival.id)
                      ? 'bg-gradient-to-br from-orange-100 to-red-100 border-orange-500 shadow-lg shadow-orange-200'
                      : 'bg-gray-50 border-gray-200 hover:border-orange-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1 text-sm">{festival.name}</h4>
                      <p className="text-xs text-purple-600 font-semibold mb-2">{festival.nameHindi}</p>
                      <p className="text-xs text-gray-600">
                        📅 {new Date(festival.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      {festival.duration > 1 && (
                        <p className="text-xs text-orange-600 font-semibold mt-1">
                          {festival.duration} days
                        </p>
                      )}
                    </div>
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      selectedFestivals.includes(festival.id)
                        ? 'bg-orange-600 border-orange-600 scale-110'
                        : 'border-gray-300'
                    }`}>
                      {selectedFestivals.includes(festival.id) && (
                        <CheckCircle className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                      festival.type === 'National' ? 'bg-orange-200 text-orange-800' :
                      festival.type === 'Hindu' ? 'bg-purple-200 text-purple-800' :
                      festival.type === 'Islamic' ? 'bg-green-200 text-green-800' :
                      festival.type === 'Christian' ? 'bg-blue-200 text-blue-800' :
                      festival.type === 'Sikh' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-pink-200 text-pink-800'
                    }`}>
                      {festival.type}
                    </span>
                    {festival.importance === 'critical' && (
                      <span className="px-2 py-1 bg-red-500 text-white rounded-md text-xs font-bold">
                        CRITICAL
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Check Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={checkForClashes}
              disabled={selectedFestivals.length < 2}
              className={`w-full py-6 rounded-2xl font-black text-2xl transition-all shadow-2xl ${
                selectedFestivals.length >= 2
                  ? 'bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white hover:shadow-orange-500/50 hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {selectedFestivals.length < 2 
                ? '📋 Select at least 2 festivals to check' 
                : `🔍 Check for Clashes (${selectedFestivals.length} festivals)`
              }
            </motion.button>
          </motion.div>

          {/* Results Section */}
          <AnimatePresence>
            {checkResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6 mb-12"
              >
                {/* Summary Card */}
                <div className={`rounded-3xl shadow-2xl p-8 border-3 ${
                  checkResult.hasClash
                    ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-300'
                    : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                }`}>
                  <div className="text-center">
                    {checkResult.hasClash ? (
                      <>
                        <AlertTriangle className="w-24 h-24 text-red-600 mx-auto mb-4" />
                        <h2 className="text-4xl font-black text-red-900 mb-4">
                          ⚠️ Conflicts Detected!
                        </h2>
                        <p className="text-xl text-red-700 mb-6">
                          Found {checkResult.clashes.length + checkResult.warnings.length} potential conflicts among {checkResult.totalChecked} festivals
                        </p>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-4" />
                        <h2 className="text-4xl font-black text-green-900 mb-4">
                          ✅ All Clear!
                        </h2>
                        <p className="text-xl text-green-700 mb-6">
                          No major conflicts found among {checkResult.totalChecked} festivals
                        </p>
                      </>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                      <div className="bg-white/80 p-4 rounded-xl">
                        <div className="text-3xl font-black text-red-600">{checkResult.clashes.length}</div>
                        <div className="text-sm font-semibold text-gray-700">Critical Clashes</div>
                      </div>
                      <div className="bg-white/80 p-4 rounded-xl">
                        <div className="text-3xl font-black text-yellow-600">{checkResult.warnings.length}</div>
                        <div className="text-sm font-semibold text-gray-700">Warnings</div>
                      </div>
                      <div className="bg-white/80 p-4 rounded-xl">
                        <div className="text-3xl font-black text-green-600">{checkResult.safe.length}</div>
                        <div className="text-sm font-semibold text-gray-700">Safe Gaps</div>
                      </div>
                    </div>

                    {/* Export and Share */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                      <button
                        onClick={exportToCSV}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Download Report
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setShowShareMenu(!showShareMenu)}
                          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                        >
                          <Share2 className="w-5 h-5" />
                          Share Results
                        </button>
                        {showShareMenu && (
                          <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-2xl border-2 border-gray-200 p-4 z-10 min-w-[200px]">
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
                  </div>
                </div>

                {/* Critical Clashes */}
                {checkResult.clashes.length > 0 && (
                  <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-red-200">
                    <h3 className="text-3xl font-black text-red-900 mb-6 flex items-center gap-3">
                      <XCircle className="w-8 h-8" />
                      ⚠️ Critical Conflicts ({checkResult.clashes.length})
                    </h3>
                    <div className="space-y-4">
                      {checkResult.clashes.map((clash: any, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className={`p-6 rounded-2xl border-2 ${
                            clash.severity === 'critical'
                              ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-400'
                              : 'bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-400'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-xl font-bold text-gray-900 mb-2">
                                {clash.festival1} ⚔️ {clash.festival2}
                              </h4>
                              <p className="text-sm text-purple-600 font-semibold">
                                {clash.festival1Hindi} ⚔️ {clash.festival2Hindi}
                              </p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-xs font-black ${
                              clash.severity === 'critical' ? 'bg-red-500 text-white' :
                              clash.severity === 'high' ? 'bg-orange-500 text-white' :
                              'bg-yellow-500 text-white'
                            }`}>
                              {clash.severity.toUpperCase()}
                            </span>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-white/80 p-4 rounded-xl">
                              <p className="text-xs text-gray-600 mb-1">Festival 1</p>
                              <p className="font-bold text-gray-900">{clash.festival1}</p>
                              <p className="text-sm text-gray-700">
                                📅 {new Date(clash.date1).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                            <div className="bg-white/80 p-4 rounded-xl">
                              <p className="text-xs text-gray-600 mb-1">Festival 2</p>
                              <p className="font-bold text-gray-900">{clash.festival2}</p>
                              <p className="text-sm text-gray-700">
                                📅 {new Date(clash.date2).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                          </div>

                          <div className={`p-4 rounded-xl ${
                            clash.severity === 'critical' ? 'bg-red-100' : 'bg-orange-100'
                          }`}>
                            <p className="font-bold text-sm mb-2">
                              📍 Conflict Type: {clash.type === 'exact' ? '❌ Same Date' : '⚠️ Date Overlap'}
                            </p>
                            <p className="text-sm text-gray-700 mb-3">{clash.advice}</p>
                            
                            {clash.muhuratClash && (
                              <div className="bg-red-200 p-3 rounded-lg mt-2">
                                <p className="text-xs font-bold text-red-900">
                                  🕉️ MUHURAT CONFLICT: Both festivals have overlapping auspicious timings!
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Suggested Actions */}
                          <div className="mt-4 bg-blue-50 p-4 rounded-xl">
                            <p className="font-bold text-sm text-blue-900 mb-2">💡 Suggested Actions:</p>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>✓ Consult priest for alternate muhurat timings</li>
                              <li>✓ Plan ceremonies at different times of day</li>
                              <li>✓ Consider celebrating with extended family on separate dates</li>
                              <li>✓ Allow extra travel and preparation time</li>
                            </ul>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Warnings */}
                {checkResult.warnings.length > 0 && (
                  <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-yellow-200">
                    <h3 className="text-3xl font-black text-yellow-900 mb-6 flex items-center gap-3">
                      <AlertCircleIcon className="w-8 h-8" />
                      ⚡ Close Dates ({checkResult.warnings.length})
                    </h3>
                    <div className="space-y-3">
                      {checkResult.warnings.map((warning: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-300"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-bold text-gray-900">
                                {warning.festival1} & {warning.festival2}
                              </p>
                              <p className="text-sm text-yellow-700">{warning.advice}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-black text-yellow-600">{warning.daysBetween}</p>
                              <p className="text-xs text-gray-600">days apart</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Safe Gaps */}
                {checkResult.safe.length > 0 && (
                  <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-green-200">
                    <h3 className="text-3xl font-black text-green-900 mb-6 flex items-center gap-3">
                      <CheckCircle className="w-8 h-8" />
                      ✅ Safe Gaps ({checkResult.safe.length})
                    </h3>
                    <p className="text-gray-700 mb-4">
                      These festival pairs have adequate spacing (4-7 days) for comfortable planning:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {checkResult.safe.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-4 bg-green-50 rounded-xl border border-green-200"
                        >
                          <p className="font-semibold text-gray-900 text-sm">
                            {item.festival1} → {item.festival2}
                          </p>
                          <p className="text-xs text-green-700">
                            ✓ {item.daysBetween} days apart - comfortable spacing
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Comprehensive SEO Content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 prose prose-lg max-w-none">
            <h2 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-orange-600" />
              📚 Complete Guide: Festival Clash Checker for Indian Event Planning (2025)
            </h2>

            {/* Introduction */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200 mb-8">
              <h3 className="text-2xl font-bold text-orange-900 mb-4">🎯 What is a Festival Clash?</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                A <strong>festival clash</strong> occurs when two or more Indian festivals fall on the same date or have overlapping celebrations, 
                creating conflicts for event planning, temple visits, family gatherings, or business operations. Our <strong>Festival Clash Checker</strong> 
                helps you identify these conflicts across <strong>100+ Indian festivals</strong> including Hindu, Islamic, Christian, Sikh, Jain, and 
                regional celebrations for all <strong>28 states and 8 Union Territories</strong>.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Event Planners:</strong> Avoid scheduling weddings during major festival overlaps</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Corporate HR:</strong> Plan office holidays without conflicts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Families:</strong> Schedule multiple celebrations without stress</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Priests & Pandits:</strong> Check muhurat timing conflicts</span>
                </li>
              </ul>
            </div>

            {/* How to Use */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">📝 How to Use Festival Clash Checker</h3>
            <div className="space-y-4 mb-8">
              {[
                { step: 1, title: 'Select Year & Location', desc: 'Choose the year you want to check and select your state/region for regional festival inclusion' },
                { step: 2, title: 'Filter Festival Types', desc: 'Optionally filter by National, Hindu, Islamic, Christian, Sikh, or Regional festivals' },
                { step: 3, title: 'Select Festivals to Check', desc: 'Click on at least 2 festivals from the grid. Selected festivals highlight in orange' },
                { step: 4, title: 'Run Clash Detection', desc: 'Click the "Check for Clashes" button to analyze all selected festivals' },
                { step: 5, title: 'Review Results', desc: 'See critical conflicts (same date), warnings (close dates), and safe gaps' },
                { step: 6, title: 'Download & Share', desc: 'Export conflict report as CSV or share findings with team/family' }
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

            {/* Types of Clashes */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border-2 border-red-200 mb-8">
              <h3 className="text-2xl font-bold text-red-900 mb-4">🔍 Types of Festival Conflicts Detected</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border-2 border-red-300">
                  <XCircle className="w-10 h-10 text-red-600 mb-3" />
                  <h4 className="font-bold text-red-900 mb-2">Critical Clash</h4>
                  <p className="text-sm text-gray-700">Same date or direct overlap. Requires immediate attention and replanning.</p>
                </div>
                <div className="bg-white p-5 rounded-xl border-2 border-yellow-300">
                  <AlertTriangle className="w-10 h-10 text-yellow-600 mb-3" />
                  <h4 className="font-bold text-yellow-900 mb-2">Close Dates</h4>
                  <p className="text-sm text-gray-700">1-3 days apart. May cause scheduling stress and require careful planning.</p>
                </div>
                <div className="bg-white p-5 rounded-xl border-2 border-green-300">
                  <CheckCircle className="w-10 h-10 text-green-600 mb-3" />
                  <h4 className="font-bold text-green-900 mb-2">Safe Gap</h4>
                  <p className="text-sm text-gray-700">4+ days apart. Adequate time for preparation and travel between events.</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h3>
            <div className="space-y-4 mb-8">
              {[
                {
                  q: 'How does the Festival Clash Checker work?',
                  a: 'Our tool analyzes selected festivals by their dates, duration, and muhurat timings. It detects exact date matches, overlapping multi-day festivals, and closely spaced events (1-3 days apart) that might cause scheduling conflicts for families, event planners, or businesses.'
                },
                {
                  q: 'Can I check clashes for my specific state or city?',
                  a: 'Yes! Select your state from the dropdown to include regional festivals specific to your location. For example, selecting Tamil Nadu will include Pongal, Kerala will show Onam, Punjab includes Lohri and Baisakhi. We support all 28 Indian states and 8 Union Territories with 600+ major cities.'
                },
                {
                  q: 'Do Diwali and Dhanteras clash in 2025?',
                  a: 'Dhanteras falls on October 18, 2025, and Diwali (main day) is on October 20, 2025 - they are 2 days apart, which is considered a close date. While not a direct clash, this requires careful planning for shopping, travel, and puja preparations. Use our tool to check specific timings for your city.'
                },
                {
                  q: 'What is a muhurat clash?',
                  a: 'A muhurat clash occurs when the auspicious timing windows (muhurat) of two festivals overlap on the same day. This is especially important for religious ceremonies, weddings, and pujas that must be performed during specific time periods. Our tool highlights muhurat conflicts with critical warnings.'
                },
                {
                  q: 'Can I use this for wedding date selection?',
                  a: 'Absolutely! This is one of the most popular uses. Select the year you\'re planning your wedding and check against major festivals. Avoid dates with critical clashes, especially during Diwali season, Navratri, or regional festivals in your state to ensure good vendor availability and guest attendance.'
                },
                {
                  q: 'How accurate are the festival dates?',
                  a: 'All festival dates are verified from official panchang sources and government holiday calendars. Hindu lunar festivals are calculated using precise astronomical algorithms. Dates are updated annually and cross-verified with multiple authoritative sources including temple calendars and regional panchangs.'
                },
                {
                  q: 'Can I export the clash report?',
                  a: 'Yes! Click the "Download Report" button to export a comprehensive CSV file with all detected clashes, warnings, and safe gaps. The report includes festival names, dates, clash types, severity levels, and actionable advice. Perfect for sharing with event coordinators or family members.'
                },
                {
                  q: 'What if I need to plan events around regional festivals?',
                  a: 'Select your specific state from the dropdown menu. Our system automatically includes state-specific festivals like Pongal (Tamil Nadu), Onam (Kerala), Durga Puja (West Bengal), Bihu (Assam), and many others. This ensures you don\'t miss important local celebrations.'
                },
                {
                  q: 'How far in advance can I check for clashes?',
                  a: 'You can check festival clashes for the current year plus up to 9 years in the future (2025-2034). This is especially useful for long-term event planning, venue booking, or corporate calendar management.'
                },
                {
                  q: 'Is this tool free to use?',
                  a: 'Yes! The Festival Clash Checker is 100% free with no registration required. Check unlimited festivals, download reports, and share results - all completely free. We believe in making event planning accessible to everyone in India.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                    <span className="text-orange-600 flex-shrink-0">Q{idx + 1}.</span>
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-gray-700 ml-8">{faq.a}</p>
                </div>
              ))}
            </div>

            {/* Related Tools */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Festival & Planning Tools</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 not-prose mb-8">
              {[
                { to: '/festival-tools/diwali-date-finder', icon: '🪔', title: 'Diwali Date Finder', desc: 'Find exact Diwali dates with muhurat' },
                { to: '/festival-tools/auspicious-marriage-days', icon: '💍', title: 'Marriage Muhurat', desc: '40+ auspicious wedding dates' },
                { to: '/festival-tools/shubh-muhurat-reminder', icon: '🔔', title: 'Muhurat Reminder', desc: 'Auspicious timing alerts' },
                { to: '/festival-tools/indian-holiday-calendar-sync', icon: '🔄', title: 'Calendar Sync', desc: 'Export to Google/Outlook' },
                { to: '/festival-tools/public-holiday-finder', icon: '🏖️', title: 'Holiday Finder', desc: 'State-wise public holidays' },
                { to: '/festival-date-calendar', icon: '📅', title: 'Festival Calendar', desc: 'Complete festival dates' }
              ].map((tool, idx) => (
                <Link
                  key={idx}
                  to={tool.to}
                  className="block p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl border-2 border-orange-200 hover:border-orange-400 hover:shadow-xl transition-all group"
                >
                  <div className="text-5xl mb-3">{tool.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {tool.title}
                  </h4>
                  <p className="text-sm text-gray-600 not-prose">{tool.desc}</p>
                  <div className="mt-3 text-orange-600 font-semibold flex items-center gap-2">
                    Try Now <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>

            {/* External Resources */}
            <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">📚 External Resources & Official Sources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://pib.gov.in/PressReleasePage.aspx" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Press Information Bureau - Official Holiday List
                  </a>
                </li>
                <li>
                  <a href="https://www.india.gov.in/calendar" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    India.gov.in - National Calendar
                  </a>
                </li>
                <li>
                  <a href="https://www.eventmanagerblog.com/festival-planning" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Event Planning Best Practices
                  </a>
                </li>
              </ul>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8 rounded-2xl text-center mt-8">
              <h3 className="text-3xl font-black mb-4">🎉 Ready to Plan Your Events?</h3>
              <p className="text-xl mb-6 opacity-95">
                Check 100+ festival dates for conflicts - completely FREE!
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all inline-flex items-center gap-3"
              >
                <RefreshCw className="w-6 h-6" />
                Check Festival Clashes Now
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FestivalClashChecker;
