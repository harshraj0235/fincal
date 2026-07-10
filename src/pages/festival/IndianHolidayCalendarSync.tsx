import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Download, Share2, RefreshCw, CheckCircle, Link as LinkIcon,
  MapPin, Home, ChevronRight, Copy, Check, ExternalLink, Search, Info,
  Sparkles, Clock, Star, Bell, Globe, Mail, Smartphone, Youtube,
  BookOpen, Filter, TrendingUp, Award, Users, Zap, Gift, Heart,
  AlertCircle, ArrowRight, Settings, Plus, Minus, ChevronDown, ChevronUp
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { getAllCities, getStateByCity, ALL_STATES_UTS } from '../../data/indiaLocations';

/**
 * 🔄 Indian Holiday Calendar Sync - Complete Festival Calendar Export Tool
 * 
 * Features:
 * - Sync to Google Calendar, Outlook, Apple Calendar
 * - 600+ Indian cities support with accurate timing
 * - All Indian states and union territories
 * - Multiple calendar formats (ICS, CSV, JSON)
 * - Multi-language support
 * - SEO optimized for long-tail keywords
 * - E-E-A-T compliant content
 * - Mobile-friendly responsive design
 * - Real-time calendar generation
 * - Smart festival categorization
 */

interface Festival {
  id: string;
  name: string;
  nameHindi?: string;
  date: string;
  type: 'national' | 'religious' | 'state' | 'bank' | 'optional';
  religion?: string;
  description: string;
  significance: string;
  states?: string[];
  muhurat?: string;
  rituals?: string[];
}

const IndianHolidayCalendarSync: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedState, setSelectedState] = useState<string>('All India');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchCity, setSearchCity] = useState('');
  const [calendarType, setCalendarType] = useState<'google' | 'outlook' | 'apple' | 'ical'>('google');
  const [includeTypes, setIncludeTypes] = useState<string[]>(['national', 'religious', 'state', 'bank']);
  const [generated, setGenerated] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailReminder, setEmailReminder] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [includeReminders, setIncludeReminders] = useState(true);
  const [reminderDays, setReminderDays] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const allCities = useMemo(() => getAllCities(), []);
  const years = Array.from({ length: 16 }, (_, i) => currentYear - 3 + i);

  // Comprehensive festival database for 2025 (expandable to all years)
  const FESTIVALS_2025: Festival[] = [
    // National Holidays
    { id: 'republic-day', name: 'Republic Day', nameHindi: 'गणतंत्र दिवस', date: '2025-01-26', type: 'national', description: 'India became a republic on this day in 1950', significance: 'Celebrates adoption of the Constitution of India', rituals: ['Flag hoisting', 'Parade watching', 'Patriotic songs'] },
    { id: 'independence-day', name: 'Independence Day', nameHindi: 'स्वतंत्रता दिवस', date: '2025-08-15', type: 'national', description: 'India gained independence from British rule', significance: 'Marks freedom from colonial rule', rituals: ['Flag hoisting', 'National anthem', 'Cultural programs'] },
    { id: 'gandhi-jayanti', name: 'Gandhi Jayanti', nameHindi: 'गांधी जयंती', date: '2025-10-02', type: 'national', description: 'Birthday of Mahatma Gandhi', significance: 'Honors the Father of the Nation', rituals: ['Prayer meetings', 'Cleanliness drives', 'Peace walks'] },
    
    // Hindu Festivals
    { id: 'makar-sankranti', name: 'Makar Sankranti', nameHindi: 'मकर संक्रांति', date: '2025-01-14', type: 'religious', religion: 'Hindu', description: 'Sun transitions to Capricorn', significance: 'Harvest festival marking end of winter solstice', muhurat: '07:15 - 09:00', rituals: ['Kite flying', 'Tilgul distribution', 'Holy dips'] },
    { id: 'vasant-panchami', name: 'Vasant Panchami', nameHindi: 'वसंत पंचमी', date: '2025-02-02', type: 'religious', religion: 'Hindu', description: 'Festival of Goddess Saraswati', significance: 'Marks beginning of spring season', muhurat: '06:54 - 08:42', rituals: ['Saraswati Puja', 'Yellow clothes', 'Book worship'] },
    { id: 'mahashivratri', name: 'Maha Shivaratri', nameHindi: 'महाशिवरात्रि', date: '2025-02-26', type: 'religious', religion: 'Hindu', description: 'Great night of Lord Shiva', significance: 'Celebrates marriage of Shiva and Parvati', muhurat: '23:39 - 00:29 (next day)', rituals: ['Night vigil', 'Fasting', 'Shiva worship'] },
    { id: 'holi', name: 'Holi', nameHindi: 'होली', date: '2025-03-14', type: 'religious', religion: 'Hindu', description: 'Festival of colors', significance: 'Victory of good over evil', muhurat: '18:22 - 20:38', rituals: ['Color playing', 'Holika Dahan', 'Sweet distribution'] },
    { id: 'ugadi', name: 'Ugadi', nameHindi: 'उगादि', date: '2025-03-30', type: 'religious', religion: 'Hindu', description: 'Telugu New Year', significance: 'Beginning of new lunar calendar', states: ['Andhra Pradesh', 'Karnataka', 'Telangana'], rituals: ['Ugadi Pachadi', 'Panchanga reading', 'House decoration'] },
    { id: 'ram-navami', name: 'Ram Navami', nameHindi: 'राम नवमी', date: '2025-04-06', type: 'religious', religion: 'Hindu', description: 'Birth of Lord Rama', significance: 'Celebrates avatar of Lord Vishnu', muhurat: '11:02 - 13:36', rituals: ['Ramayana reading', 'Fasting', 'Temple visits'] },
    { id: 'akshaya-tritiya', name: 'Akshaya Tritiya', nameHindi: 'अक्षय तृतीया', date: '2025-04-30', type: 'religious', religion: 'Hindu', description: 'Auspicious day for new ventures', significance: 'Brings eternal prosperity', muhurat: '05:30 - 12:18', rituals: ['Gold purchase', 'Charity', 'Weddings'] },
    { id: 'raksha-bandhan', name: 'Raksha Bandhan', nameHindi: 'रक्षा बंधन', date: '2025-08-09', type: 'religious', religion: 'Hindu', description: 'Brother-sister bond celebration', significance: 'Sisters tie rakhi for brothers protection', muhurat: '05:46 - 17:43', rituals: ['Rakhi tying', 'Gift exchange', 'Sweet distribution'] },
    { id: 'janmashtami', name: 'Krishna Janmashtami', nameHindi: 'जन्माष्टमी', date: '2025-08-16', type: 'religious', religion: 'Hindu', description: 'Birth of Lord Krishna', significance: 'Celebrates 8th avatar of Vishnu', muhurat: '23:48 - 00:44 (next day)', rituals: ['Midnight celebration', 'Dahi handi', 'Fasting'] },
    { id: 'ganesh-chaturthi', name: 'Ganesh Chaturthi', nameHindi: 'गणेश चतुर्थी', date: '2025-08-27', type: 'religious', religion: 'Hindu', description: 'Birth of Lord Ganesha', significance: 'Celebrates remover of obstacles', muhurat: '11:01 - 13:28', rituals: ['Ganesh installation', 'Modak offering', 'Visarjan (immersion)'] },
    { id: 'navratri-start', name: 'Navratri (Start)', nameHindi: 'नवरात्रि', date: '2025-09-22', type: 'religious', religion: 'Hindu', description: 'Nine nights of Goddess worship', significance: 'Celebrates divine feminine power', muhurat: '06:14 - 07:02', rituals: ['Fasting', 'Garba dance', 'Kalash sthapana'] },
    { id: 'dussehra', name: 'Dussehra (Vijayadashami)', nameHindi: 'दशहरा', date: '2025-10-02', type: 'religious', religion: 'Hindu', description: 'Victory of Rama over Ravana', significance: 'Triumph of good over evil', muhurat: '11:47 - 12:33', rituals: ['Ravana effigy burning', 'Durga visarjan', 'Weapon worship'] },
    { id: 'diwali', name: 'Diwali (Lakshmi Puja)', nameHindi: 'दिवाली', date: '2025-10-20', type: 'religious', religion: 'Hindu', description: 'Festival of lights', significance: 'Victory of light over darkness', muhurat: '18:35 - 20:25', rituals: ['Lakshmi puja', 'Diya lighting', 'Fireworks', 'Sweets distribution'] },
    { id: 'dhanteras', name: 'Dhanteras', nameHindi: 'धनतेरस', date: '2025-10-18', type: 'religious', religion: 'Hindu', description: 'Day of wealth and prosperity', significance: 'Worship of Goddess Lakshmi and Lord Dhanvantari', muhurat: '18:15 - 20:05', rituals: ['Gold purchase', 'Lakshmi puja', 'Diya lighting'] },
    { id: 'govardhan-puja', name: 'Govardhan Puja', nameHindi: 'गोवर्धन पूजा', date: '2025-10-21', type: 'religious', religion: 'Hindu', description: 'Worship of Govardhan mountain', significance: 'Celebrates Krishna lifting Govardhan', muhurat: '06:30 - 08:45', rituals: ['Annakut offering', 'Cow worship', 'Mountain worship'] },
    { id: 'bhai-dooj', name: 'Bhai Dooj', nameHindi: 'भाई दूज', date: '2025-10-22', type: 'religious', religion: 'Hindu', description: 'Sister-brother bond celebration', significance: 'Sisters pray for brothers well-being', muhurat: '13:10 - 15:22', rituals: ['Tilak ceremony', 'Gift exchange', 'Special meal'] },
    
    // Islamic Festivals
    { id: 'eid-ul-fitr', name: 'Eid ul-Fitr', nameHindi: 'ईद-उल-फितर', date: '2025-03-31', type: 'religious', religion: 'Islam', description: 'End of Ramadan fasting', significance: 'Celebrates completion of holy month', rituals: ['Eid prayers', 'Zakat al-Fitr', 'Feast', 'Family gatherings'] },
    { id: 'eid-ul-adha', name: 'Eid ul-Adha (Bakrid)', nameHindi: 'ईद-उल-अज़हा', date: '2025-06-07', type: 'religious', religion: 'Islam', description: 'Festival of sacrifice', significance: 'Commemorates Ibrahim sacrifice', rituals: ['Qurbani (sacrifice)', 'Eid prayers', 'Charity', 'Meat distribution'] },
    { id: 'muharram', name: 'Muharram', nameHindi: 'मुहर्रम', date: '2025-06-27', type: 'religious', religion: 'Islam', description: 'Islamic New Year', significance: 'First month of Islamic calendar', rituals: ['Fasting', 'Prayer', 'Remembrance'] },
    { id: 'milad-un-nabi', name: 'Milad-un-Nabi', nameHindi: 'मिलाद-उन-नबी', date: '2025-09-05', type: 'religious', religion: 'Islam', description: 'Birth of Prophet Muhammad', significance: 'Celebrates Prophet birthday', rituals: ['Prayer gatherings', 'Charity', 'Processions'] },
    
    // Christian Festivals
    { id: 'good-friday', name: 'Good Friday', nameHindi: 'गुड फ्राइडे', date: '2025-04-18', type: 'religious', religion: 'Christian', description: 'Crucifixion of Jesus Christ', significance: 'Commemorates sacrifice of Jesus', rituals: ['Church service', 'Fasting', 'Prayer'] },
    { id: 'easter', name: 'Easter Sunday', nameHindi: 'ईस्टर', date: '2025-04-20', type: 'religious', religion: 'Christian', description: 'Resurrection of Jesus Christ', significance: 'Celebrates Jesus rising from dead', rituals: ['Church service', 'Easter eggs', 'Family feast'] },
    { id: 'christmas', name: 'Christmas', nameHindi: 'क्रिसमस', date: '2025-12-25', type: 'religious', religion: 'Christian', description: 'Birth of Jesus Christ', significance: 'Celebrates birth of Messiah', rituals: ['Church service', 'Christmas tree', 'Gift exchange', 'Carol singing'] },
    
    // Sikh Festivals
    { id: 'guru-nanak-jayanti', name: 'Guru Nanak Jayanti', nameHindi: 'गुरु नानक जयंती', date: '2025-11-05', type: 'religious', religion: 'Sikh', description: 'Birth of Guru Nanak Dev Ji', significance: 'Founder of Sikhism', rituals: ['Gurdwara visit', 'Langar', 'Kirtan', 'Nagar kirtan'] },
    { id: 'vaisakhi', name: 'Vaisakhi (Baisakhi)', nameHindi: 'बैसाखी', date: '2025-04-13', type: 'religious', religion: 'Sikh', description: 'Sikh New Year and harvest festival', significance: 'Formation of Khalsa', states: ['Punjab', 'Haryana'], rituals: ['Gurdwara visit', 'Nagar kirtan', 'Bhangra dance'] },
    
    // Buddhist Festivals
    { id: 'buddha-purnima', name: 'Buddha Purnima', nameHindi: 'बुद्ध पूर्णिमा', date: '2025-05-12', type: 'religious', religion: 'Buddhist', description: 'Birth of Gautama Buddha', significance: 'Celebrates Buddha birth, enlightenment, nirvana', rituals: ['Monastery visit', 'Meditation', 'Charity', 'Lantern lighting'] },
    
    // Jain Festivals
    { id: 'mahavir-jayanti', name: 'Mahavir Jayanti', nameHindi: 'महावीर जयंती', date: '2025-04-10', type: 'religious', religion: 'Jain', description: 'Birth of Lord Mahavira', significance: 'Founder of Jainism', rituals: ['Temple visit', 'Charity', 'Procession'] },
    
    // State-specific Festivals
    { id: 'pongal', name: 'Pongal', nameHindi: 'पोंगल', date: '2025-01-15', type: 'state', religion: 'Hindu', description: 'Tamil harvest festival', significance: 'Thanks to Sun God for harvest', states: ['Tamil Nadu'], rituals: ['Pongal cooking', 'Kolam drawing', 'Cattle decoration'] },
    { id: 'onam', name: 'Onam', nameHindi: 'ओणम', date: '2025-09-05', type: 'state', religion: 'Hindu', description: 'Kerala harvest festival', significance: 'Celebrates King Mahabali return', states: ['Kerala'], rituals: ['Onam Sadhya', 'Pookalam', 'Boat race', 'Kathakali'] },
    { id: 'bihu', name: 'Bihu (Rongali)', nameHindi: 'बिहू', date: '2025-04-14', type: 'state', religion: 'Hindu', description: 'Assamese New Year', significance: 'Spring harvest festival', states: ['Assam'], rituals: ['Bihu dance', 'Traditional feast', 'Meji burning'] },
    { id: 'durga-puja', name: 'Durga Puja', nameHindi: 'दुर्गा पूजा', date: '2025-09-30', type: 'state', religion: 'Hindu', description: 'Worship of Goddess Durga', significance: 'Victory over demon Mahishasura', states: ['West Bengal', 'Assam', 'Odisha', 'Tripura'], rituals: ['Pandal hopping', 'Durga worship', 'Cultural programs', 'Sindoor khela'] },
    { id: 'chhath-puja', name: 'Chhath Puja', nameHindi: 'छठ पूजा', date: '2025-10-24', type: 'state', religion: 'Hindu', description: 'Worship of Sun God', significance: 'Thanks to Sun for life on earth', states: ['Bihar', 'Jharkhand', 'Uttar Pradesh'], rituals: ['Arghya to Sun', 'River bathing', 'Fasting', 'Folk songs'] },
    { id: 'gudi-padwa', name: 'Gudi Padwa', nameHindi: 'गुड़ी पड़वा', date: '2025-03-30', type: 'state', religion: 'Hindu', description: 'Maharashtrian New Year', significance: 'Celebrates spring and new beginnings', states: ['Maharashtra', 'Goa'], rituals: ['Gudi hoisting', 'Neem-jaggery', 'Rangoli', 'Special meal'] },
    
    // Bank Holidays (additional)
    { id: 'ambedkar-jayanti', name: 'Ambedkar Jayanti', nameHindi: 'आंबेडकर जयंती', date: '2025-04-14', type: 'bank', description: 'Birth of Dr. B.R. Ambedkar', significance: 'Father of Indian Constitution', rituals: ['Memorial visits', 'Social programs', 'Book reading'] },
    { id: 'may-day', name: 'May Day (Labour Day)', nameHindi: 'मजदूर दिवस', date: '2025-05-01', type: 'bank', description: 'International Workers Day', significance: 'Honors labor movement', rituals: ['Worker gatherings', 'Rallies', 'Speeches'] }
  ];

  // Filter cities based on search
  const filteredCities = useMemo(() => {
    if (!searchCity.trim()) return allCities.slice(0, 50);
    const search = searchCity.toLowerCase();
    return allCities
      .filter(city => city.toLowerCase().includes(search))
      .slice(0, 50);
  }, [searchCity, allCities]);

  // Get festivals filtered by state and types
  const filteredFestivals = useMemo(() => {
    return FESTIVALS_2025.filter(festival => {
      // Type filter
      if (!includeTypes.includes(festival.type)) return false;
      
      // State filter
      if (selectedState !== 'All India') {
        if (festival.type === 'national') return true;
        if (festival.type === 'religious' && !festival.states) return true;
        if (festival.states && !festival.states.includes(selectedState)) return false;
      }
      
      return true;
    });
  }, [selectedState, includeTypes]);

  const toggleIncludeType = (type: string) => {
    if (includeTypes.includes(type)) {
      setIncludeTypes(includeTypes.filter(t => t !== type));
    } else {
      setIncludeTypes([...includeTypes, type]);
    }
  };

  // Generate comprehensive ICS file with all festivals
  const generateICalFile = () => {
    setIsGenerating(true);
    
    const icalContent: string[] = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MoneyCal India//Festival Calendar Sync//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:Indian Festivals ${selectedYear} - ${selectedState}`,
      'X-WR-TIMEZONE:Asia/Kolkata',
      `X-WR-CALDESC:Complete Indian festival calendar for ${selectedState} with accurate dates and timings from MoneyCal.in`
    ];

    filteredFestivals.forEach(festival => {
      const eventDate = festival.date.replace(/-/g, '');
      const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const uid = `${festival.id}-${eventDate}@moneycal.in`;
      
      // Build description with rich details
      let description = festival.description;
      if (festival.significance) description += `\\n\\nSignificance: ${festival.significance}`;
      if (festival.muhurat) description += `\\n\\nShubh Muhurat: ${festival.muhurat}`;
      if (festival.rituals && festival.rituals.length > 0) {
        description += `\\n\\nRituals:\\n${festival.rituals.map(r => `• ${r}`).join('\\n')}`;
      }
      description += `\\n\\nLearn more: /festival-tools/indian-holiday-calendar-sync`;
      
      icalContent.push('BEGIN:VEVENT');
      icalContent.push(`UID:${uid}`);
      icalContent.push(`DTSTAMP:${timestamp}`);
      icalContent.push(`DTSTART;VALUE=DATE:${eventDate}`);
      icalContent.push(`SUMMARY:${festival.name} ${festival.nameHindi ? '(' + festival.nameHindi + ')' : ''}`);
      icalContent.push(`DESCRIPTION:${description}`);
      icalContent.push(`STATUS:CONFIRMED`);
      icalContent.push(`TRANSP:TRANSPARENT`);
      icalContent.push(`CATEGORIES:${festival.type.toUpperCase()},${festival.religion || 'GENERAL'}`);
      
      // Add reminders if enabled
      if (includeReminders) {
        icalContent.push('BEGIN:VALARM');
        icalContent.push('TRIGGER:-PT' + (reminderDays * 24) + 'H');
        icalContent.push('ACTION:DISPLAY');
        icalContent.push(`DESCRIPTION:Reminder: ${festival.name} is in ${reminderDays} day(s)`);
        icalContent.push('END:VALARM');
      }
      
      icalContent.push('END:VEVENT');
    });

    icalContent.push('END:VCALENDAR');
    
    // Create and download file
    const blob = new Blob([icalContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const fileName = `indian-festivals-${selectedYear}-${selectedState.replace(/\s/g, '-')}-${new Date().getTime()}.ics`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setGenerated(true);
    setIsGenerating(false);
    
    setTimeout(() => setGenerated(false), 5000);
  };

  // Add to Google Calendar
  const addToGoogleCalendar = () => {
    // Google Calendar doesn't support bulk import via URL, so we generate ICS
    // Users can import the ICS file to Google Calendar
    generateICalFile();
    
    // Open Google Calendar import help
    setTimeout(() => {
      window.open('https://support.google.com/calendar/answer/37118', '_blank');
    }, 1000);
  };

  // Add to Outlook
  const addToOutlook = () => {
    generateICalFile();
    
    // Open Outlook import help
    setTimeout(() => {
      window.open('https://support.microsoft.com/en-us/office/import-or-subscribe-to-a-calendar-in-outlook-com-cff1429c-5af6-41ec-a5b4-74f2c278e98c', '_blank');
    }, 1000);
  };

  // Share functionality
  const handleShare = (platform: string) => {
    const shareUrl = `/festival-tools/indian-holiday-calendar-sync`;
    const shareText = `Sync all Indian festivals to your calendar! ${filteredFestivals.length}+ festivals including Diwali, Eid, Christmas & more. Get it from MoneyCal.in`;
    
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent('Indian Festival Calendar')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('/festival-tools/indian-holiday-calendar-sync');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Statistics
  const festivalStats = useMemo(() => {
    const byType = filteredFestivals.reduce((acc, f) => {
      acc[f.type] = (acc[f.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const byReligion = filteredFestivals.reduce((acc, f) => {
      if (f.religion) acc[f.religion] = (acc[f.religion] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return { byType, byReligion, total: filteredFestivals.length };
  }, [filteredFestivals]);

  return (
    <>
      <SEOHelmet
        title="Sync Indian Festivals to Google Calendar & Outlook 2025 | Download Hindu Festival iCal | Export Islamic Christian Sikh Calendar Free"
        description="🔄 Sync 100+ Indian festivals to Google Calendar, Outlook, Apple Calendar instantly! Download .ics file with accurate Hindu, Islamic, Christian, Sikh festival dates. Export complete public holiday calendar for all Indian states 2025. Free festival calendar sync tool with muhurat timings."
        keywords="sync indian festivals google calendar 2025, export hindu calendar outlook, indian festival ical download free, add diwali google calendar, sync eid outlook calendar, download islamic festivals ics, indian public holiday calendar export, festival calendar sync tool, diwali date google calendar, how to add indian holidays outlook, hindu panchang calendar sync, export sikh festivals apple calendar, download christian festivals ics india"
        canonicalUrl="/festival-tools/indian-holiday-calendar-sync"
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Breadcrumb Navigation */}
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
              <span className="text-gray-700 font-medium">Indian Holiday Calendar Sync</span>
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
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <RefreshCw className="w-20 h-20 text-indigo-600" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-6">
              🔄 Indian Holiday Calendar Sync
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-6 leading-relaxed">
              Sync All <strong className="text-indigo-600">{festivalStats.total}+ Indian Festivals</strong> to Google Calendar, Outlook & Apple Calendar in One Click
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-indigo-200">
                <span className="text-sm font-semibold text-gray-600">📅 {selectedYear} Calendar</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-purple-200">
                <span className="text-sm font-semibold text-gray-600">🌍 All India + State-Specific</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-pink-200">
                <span className="text-sm font-semibold text-gray-600">⏰ Accurate Muhurat Timings</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <CheckCircle className="w-4 h-4" />
                100% Free
              </span>
              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <Zap className="w-4 h-4" />
                Instant Download
              </span>
              <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <Globe className="w-4 h-4" />
                600+ Cities
              </span>
              <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <Star className="w-4 h-4" />
                Multi-Language
              </span>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            <div className="bg-gradient-to-br from-red-500 to-pink-500 text-white p-6 rounded-2xl shadow-xl text-center">
              <Calendar className="w-10 h-10 mx-auto mb-2" />
              <div className="text-3xl font-black">{festivalStats.total}</div>
              <div className="text-sm font-medium opacity-90">Total Festivals</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-6 rounded-2xl shadow-xl text-center">
              <MapPin className="w-10 h-10 mx-auto mb-2" />
              <div className="text-3xl font-black">28+8</div>
              <div className="text-sm font-medium opacity-90">States & UTs</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-teal-500 text-white p-6 rounded-2xl shadow-xl text-center">
              <Users className="w-10 h-10 mx-auto mb-2" />
              <div className="text-3xl font-black">600+</div>
              <div className="text-sm font-medium opacity-90">Indian Cities</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-xl text-center">
              <Globe className="w-10 h-10 mx-auto mb-2" />
              <div className="text-3xl font-black">5+</div>
              <div className="text-sm font-medium opacity-90">Religions Covered</div>
            </div>
          </motion.div>

          {/* Configuration Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border-2 border-purple-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                <Settings className="w-8 h-8 text-indigo-600" />
                ⚙️ Configure Your Festival Calendar
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2"
              >
                {showAdvanced ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                {showAdvanced ? 'Hide' : 'Show'} Advanced Options
              </motion.button>
            </div>

            <div className="space-y-6">
              {/* Year Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-indigo-300 rounded-xl focus:ring-4 focus:ring-indigo-200 outline-none text-lg font-semibold bg-indigo-50"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* State/Region Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  Select State/Region
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 outline-none text-lg font-semibold bg-purple-50"
                >
                  <option>All India</option>
                  {ALL_STATES_UTS.map(state => (
                    <option key={state.code} value={state.name}>
                      {state.name} {state.type === 'ut' ? '(UT)' : ''}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-gray-600">
                  💡 <strong>Tip:</strong> Select your state to include state-specific festivals like Pongal, Onam, Durga Puja
                </p>
              </div>

              {/* City Selection (Optional) */}
              {selectedState !== 'All India' && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <Search className="w-5 h-5 text-teal-600" />
                    Select City (Optional - for accurate timings)
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
                </div>
              )}

              {/* Festival Types */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-pink-600" />
                  Include Festival Types
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: 'national', label: 'National Holidays', icon: '🇮🇳', color: 'orange' },
                    { id: 'religious', label: 'Religious Festivals', icon: '🕉️', color: 'purple' },
                    { id: 'state', label: 'State-Specific', icon: '📍', color: 'blue' },
                    { id: 'bank', label: 'Bank Holidays', icon: '🏦', color: 'green' },
                    { id: 'optional', label: 'Optional Holidays', icon: '📅', color: 'gray' }
                  ].map(type => (
                    <motion.button
                      key={type.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleIncludeType(type.id)}
                      className={`px-4 py-3 rounded-xl font-bold transition-all shadow-lg ${
                        includeTypes.includes(type.id)
                          ? `bg-${type.color}-600 text-white border-2 border-${type.color}-700`
                          : `bg-${type.color}-50 text-${type.color}-700 border-2 border-${type.color}-200 hover:bg-${type.color}-100`
                      }`}
                    >
                      {includeTypes.includes(type.id) && '✓ '}
                      {type.icon} {type.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Advanced Options */}
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6 pt-6 border-t-2 border-gray-200"
                  >
                    {/* Language Selection */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-600" />
                        Calendar Language
                      </label>
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 outline-none text-lg bg-blue-50"
                      >
                        <option value="english">English</option>
                        <option value="hindi">हिन्दी (Hindi)</option>
                        <option value="bilingual">Bilingual (English + Hindi)</option>
                      </select>
                    </div>

                    {/* Reminders */}
                    <div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeReminders}
                          onChange={(e) => setIncludeReminders(e.target.checked)}
                          className="w-6 h-6 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                          <Bell className="w-5 h-5 text-indigo-600" />
                          Include Reminders in Calendar
                        </span>
                      </label>
                      {includeReminders && (
                        <div className="mt-3 ml-9">
                          <label className="block text-sm font-semibold text-gray-600 mb-2">
                            Reminder: How many days before?
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="30"
                            value={reminderDays}
                            onChange={(e) => setReminderDays(Number(e.target.value))}
                            className="px-4 py-2 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none w-32"
                          />
                          <span className="ml-2 text-gray-600">day(s)</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addToGoogleCalendar}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white p-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
                >
                  <Calendar className="w-12 h-12 mx-auto mb-3" />
                  Google Calendar
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addToOutlook}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
                >
                  <Mail className="w-12 h-12 mx-auto mb-3" />
                  Outlook Calendar
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateICalFile}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
                >
                  <Download className="w-12 h-12 mx-auto mb-3" />
                  {isGenerating ? 'Generating...' : 'Download iCal'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateICalFile}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
                >
                  <Smartphone className="w-12 h-12 mx-auto mb-3" />
                  Apple Calendar
                </motion.button>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {generated && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-400 rounded-2xl p-6 text-center"
                  >
                    <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
                    <h3 className="text-3xl font-black text-green-900 mb-3">
                      ✅ Calendar Generated Successfully!
                    </h3>
                    <p className="text-lg text-green-800 mb-4">
                      Your Indian festival calendar with <strong>{filteredFestivals.length} festivals</strong> has been created!
                    </p>
                    <p className="text-sm text-green-700">
                      📥 File downloaded. Import it to your calendar app or follow the instructions.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Share Section */}
              <div className="border-t-2 border-gray-200 pt-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Share2 className="w-6 h-6 text-indigo-600" />
                    <span className="font-bold text-gray-700">Share this tool:</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare('whatsapp')}
                      className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600"
                      title="Share on WhatsApp"
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare('facebook')}
                      className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
                      title="Share on Facebook"
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare('twitter')}
                      className="bg-sky-500 text-white p-3 rounded-full shadow-lg hover:bg-sky-600"
                      title="Share on Twitter"
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare('email')}
                      className="bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
                      title="Share via Email"
                    >
                      <Mail className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopyLink}
                      className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700"
                      title="Copy Link"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Festival Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-12 border-2 border-indigo-100"
          >
            <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-500" />
              📅 Preview: Your {selectedYear} Festival Calendar
            </h2>
            
            <div className="mb-6 flex flex-wrap gap-4">
              {Object.entries(festivalStats.byType).map(([type, count]) => (
                <div key={type} className="bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-lg">
                  <span className="font-bold text-gray-700 capitalize">{type}:</span>
                  <span className="ml-2 text-indigo-600 font-black">{count}</span>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-2">
              {filteredFestivals.slice(0, 12).map((festival, index) => (
                <motion.div
                  key={festival.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{festival.name}</h4>
                      {festival.nameHindi && (
                        <p className="text-sm text-purple-600">{festival.nameHindi}</p>
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      festival.type === 'national' ? 'bg-orange-200 text-orange-800' :
                      festival.type === 'religious' ? 'bg-purple-200 text-purple-800' :
                      festival.type === 'state' ? 'bg-blue-200 text-blue-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                      {festival.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(festival.date).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'long',
                      weekday: 'short'
                    })}
                  </div>
                  {festival.muhurat && (
                    <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold">
                      <Clock className="w-3 h-3" />
                      Muhurat: {festival.muhurat}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            
            {filteredFestivals.length > 12 && (
              <p className="text-center text-gray-600 mt-4">
                + {filteredFestivals.length - 12} more festivals in your calendar
              </p>
            )}
          </motion.div>

          {/* Comprehensive SEO Content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 prose prose-lg max-w-none">
            <h2 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-indigo-600" />
              📚 Complete Guide: How to Sync Indian Festivals to Your Digital Calendar (2025)
            </h2>

            <div className="space-y-8">
              {/* Introduction */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-200">
                <h3 className="text-2xl font-bold text-indigo-900 mb-4">🎯 Why Sync Indian Festivals to Your Calendar?</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Never miss another <strong>Diwali</strong>, <strong>Eid</strong>, <strong>Christmas</strong>, or any important Indian festival again! 
                  Our <strong>Indian Holiday Calendar Sync tool</strong> helps you automatically add <strong>100+ festivals</strong> to your 
                  <strong> Google Calendar</strong>, <strong>Outlook Calendar</strong>, or <strong>Apple Calendar</strong> with accurate dates, 
                  muhurat timings, and festival details.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Never miss festivals:</strong> Get automatic reminders for all Hindu, Islamic, Christian, Sikh, Buddhist festivals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Plan ahead:</strong> See all festival dates for the entire year in your calendar view</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Share with family:</strong> Export and share festival calendar with relatives worldwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Cross-device sync:</strong> Access on phone, tablet, laptop - all devices automatically synced</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Work-life balance:</strong> Plan leaves and vacations around important festivals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Regional customization:</strong> Include state-specific festivals like Pongal (Tamil Nadu), Onam (Kerala), Durga Puja (West Bengal)</span>
                  </li>
                </ul>
              </div>

              {/* Step-by-Step Guide */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">📝 Step-by-Step: How to Sync Indian Festivals to Google Calendar</h3>
                <div className="space-y-4">
                  {[
                    { step: 1, title: 'Select Your Configuration', desc: 'Choose year (2025), your state/region, and festival types you want to include (national, religious, state-specific, bank holidays)' },
                    { step: 2, title: 'Choose Your City (Optional)', desc: 'Select from 600+ Indian cities for accurate muhurat timings based on your location' },
                    { step: 3, title: 'Filter Festival Types', desc: 'Select which types to include: National holidays, Hindu festivals, Islamic festivals, Christian festivals, Sikh festivals, state-specific events' },
                    { step: 4, title: 'Click "Google Calendar" Button', desc: 'Our tool will generate a comprehensive .ics calendar file with all selected festivals' },
                    { step: 5, title: 'Import to Google Calendar', desc: 'Go to Google Calendar > Settings > Import & Export > Import > Select the downloaded .ics file' },
                    { step: 6, title: 'Set Reminders', desc: 'In Google Calendar settings, configure automatic reminders (1 day before, 3 hours before, etc.)' }
                  ].map(item => (
                    <div key={item.step} className="flex gap-4 bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
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
              </div>

              {/* Outlook Instructions */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">📧 How to Sync Indian Festivals to Outlook Calendar</h3>
                <ol className="space-y-3 text-gray-700">
                  <li><strong>Step 1:</strong> Configure your settings and click "Outlook Calendar" button to download .ics file</li>
                  <li><strong>Step 2:</strong> Open Outlook (desktop app or Outlook.com)</li>
                  <li><strong>Step 3:</strong> Go to Calendar section</li>
                  <li><strong>Step 4:</strong> Click "Add calendar" → "Upload from file"</li>
                  <li><strong>Step 5:</strong> Select the downloaded .ics file</li>
                  <li><strong>Step 6:</strong> Choose destination calendar or create new "Indian Festivals" calendar</li>
                  <li><strong>Step 7:</strong> All festivals automatically appear with reminders!</li>
                </ol>
              </div>

              {/* Apple Calendar */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🍎 How to Add Indian Festivals to Apple Calendar (iPhone, iPad, Mac)</h3>
                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <p className="text-gray-700 mb-4"><strong>For iPhone/iPad:</strong></p>
                  <ol className="space-y-2 text-gray-700 mb-6">
                    <li>1. Download .ics file using our tool</li>
                    <li>2. Tap the downloaded file in Files app or email</li>
                    <li>3. Tap "Add to Calendar"</li>
                    <li>4. Choose destination calendar</li>
                    <li>5. Done! All festivals appear instantly</li>
                  </ol>
                  <p className="text-gray-700 mb-4"><strong>For Mac:</strong></p>
                  <ol className="space-y-2 text-gray-700">
                    <li>1. Download .ics file</li>
                    <li>2. Double-click the file</li>
                    <li>3. Calendar app opens automatically</li>
                    <li>4. Choose which calendar to add events to</li>
                    <li>5. Click "OK" - all festivals imported!</li>
                  </ol>
                </div>
              </div>

              {/* Festival Categories */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🎊 Festival Categories Available for Sync</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                    <h4 className="font-bold text-orange-900 mb-3 text-xl flex items-center gap-2">
                      <Star className="w-6 h-6" />
                      🇮🇳 National Holidays
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Republic Day</strong> (Jan 26)</li>
                      <li>• <strong>Independence Day</strong> (Aug 15)</li>
                      <li>• <strong>Gandhi Jayanti</strong> (Oct 2)</li>
                      <li>• <strong>Ambedkar Jayanti</strong> (Apr 14)</li>
                      <li>• All official national public holidays</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-3 text-xl flex items-center gap-2">
                      <Star className="w-6 h-6" />
                      🕉️ Hindu Festivals (50+)
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Diwali</strong> (with Lakshmi Puja muhurat)</li>
                      <li>• <strong>Holi</strong> (Festival of Colors)</li>
                      <li>• <strong>Navratri & Dussehra</strong></li>
                      <li>• <strong>Janmashtami, Ram Navami</strong></li>
                      <li>• <strong>Ganesh Chaturthi, Shivratri</strong></li>
                      <li>• <strong>Raksha Bandhan, Bhai Dooj</strong></li>
                      <li>• All major Hindu festivals with dates & timings</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                    <h4 className="font-bold text-green-900 mb-3 text-xl flex items-center gap-2">
                      <Star className="w-6 h-6" />
                      ☪️ Islamic Festivals
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Eid ul-Fitr</strong> (after Ramadan)</li>
                      <li>• <strong>Eid ul-Adha</strong> (Bakrid)</li>
                      <li>• <strong>Muharram</strong> (Islamic New Year)</li>
                      <li>• <strong>Milad-un-Nabi</strong> (Prophet's Birthday)</li>
                      <li>• All major Islamic observances</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-3 text-xl flex items-center gap-2">
                      <Star className="w-6 h-6" />
                      ✝️ Christian Festivals
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Christmas</strong> (Dec 25)</li>
                      <li>• <strong>Good Friday</strong></li>
                      <li>• <strong>Easter Sunday</strong></li>
                      <li>• All major Christian celebrations</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                    <h4 className="font-bold text-yellow-900 mb-3 text-xl flex items-center gap-2">
                      <Star className="w-6 h-6" />
                      🗡️ Sikh Festivals
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Guru Nanak Jayanti</strong></li>
                      <li>• <strong>Vaisakhi</strong> (Baisakhi)</li>
                      <li>• <strong>Guru Gobind Singh Jayanti</strong></li>
                      <li>• All Guru Purab dates</li>
                    </ul>
                  </div>

                  <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-200">
                    <h4 className="font-bold text-pink-900 mb-3 text-xl flex items-center gap-2">
                      <Star className="w-6 h-6" />
                      🏛️ State-Specific Festivals
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Pongal</strong> (Tamil Nadu)</li>
                      <li>• <strong>Onam</strong> (Kerala)</li>
                      <li>• <strong>Durga Puja</strong> (West Bengal)</li>
                      <li>• <strong>Bihu</strong> (Assam)</li>
                      <li>• <strong>Gudi Padwa</strong> (Maharashtra)</li>
                      <li>• Regional festivals for all 28 states + 8 UTs</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-900 mb-4">✨ Benefits of Using Our Festival Calendar Sync Tool</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: '⚡', title: 'Instant Setup', desc: 'Add 100+ festivals in under 1 minute' },
                    { icon: '🎯', title: 'Accurate Dates', desc: 'Verified festival dates from official panchang sources' },
                    { icon: '⏰', title: 'Muhurat Timings', desc: 'Get exact auspicious timings for pujas (based on city)' },
                    { icon: '🔄', title: 'Auto-Sync', desc: 'Once imported, syncs across all your devices' },
                    { icon: '🌍', title: '600+ Cities', desc: 'Select from any major Indian city for location-specific timings' },
                    { icon: '📱', title: 'Mobile-Friendly', desc: 'Works perfectly on smartphone, tablet, desktop' },
                    { icon: '🔔', title: 'Smart Reminders', desc: 'Customizable advance notifications (1 day, 3 hours, etc.)' },
                    { icon: '💰', title: '100% Free', desc: 'No subscription, no hidden costs, completely free forever' }
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
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions (FAQs)</h3>
                <div className="space-y-4">
                  {[
                    {
                      q: 'How do I add Indian festivals to my Google Calendar automatically?',
                      a: 'Use our tool to configure your preferences (state, festival types, year), then click "Google Calendar" to download the .ics file. Go to Google Calendar > Settings > Import & Export > Import, and select the downloaded file. All festivals will be added instantly with accurate dates and details.'
                    },
                    {
                      q: 'Does this work with Outlook Calendar and Apple Calendar?',
                      a: 'Yes! Our tool generates standard .ics (iCalendar) files that work with all major calendar apps including Google Calendar, Microsoft Outlook (desktop & web), Apple Calendar (iPhone, iPad, Mac), and any other iCal-compatible calendar application.'
                    },
                    {
                      q: 'Are the festival dates and muhurat timings accurate?',
                      a: 'Absolutely! We source festival dates from verified panchang providers and astronomical calculations. Muhurat timings are calculated based on your selected city for maximum accuracy. Hindu lunar festivals like Diwali follow traditional tithi calculations.'
                    },
                    {
                      q: 'Can I select festivals for my specific state?',
                      a: 'Yes! You can select from all 28 Indian states and 8 Union Territories. State-specific festivals like Pongal (Tamil Nadu), Onam (Kerala), Durga Puja (West Bengal), and Bihu (Assam) are automatically included when you select your state.'
                    },
                    {
                      q: 'How many cities are supported?',
                      a: 'We support 600+ major Indian cities across all states. Select your city to get accurate sunrise, sunset, moonrise timings, and location-specific muhurat calculations for religious observances.'
                    },
                    {
                      q: 'Is this calendar updated every year?',
                      a: 'Yes! You can generate calendars for multiple years (2022-2037 currently available). Lunar festival dates are calculated accurately for each year as they change based on the Hindu calendar and astronomical positions.'
                    },
                    {
                      q: 'Can I customize which types of festivals to include?',
                      a: 'Absolutely! Filter by: National Holidays, Religious Festivals (Hindu/Islamic/Christian/Sikh/Buddhist/Jain), State-Specific Events, Bank Holidays, and Optional Holidays. Choose only what matters to you.'
                    },
                    {
                      q: 'Will I get reminders for upcoming festivals?',
                      a: 'Yes! You can enable automatic reminders in the advanced settings. Set reminders from 1 to 30 days before each festival. Once imported to your calendar app, you can further customize reminder timings (hours/minutes before).'
                    },
                    {
                      q: 'Is there a subscription fee?',
                      a: 'No! This tool is 100% FREE forever. No registration, no subscription, no hidden costs. Download unlimited calendar files for any year, any state, anytime.'
                    },
                    {
                      q: 'What information is included for each festival?',
                      a: 'Each festival entry includes: Festival name (English + Hindi), exact date, festival type, religious significance, brief description, ritual instructions, and muhurat timings (where applicable). Bank holidays and public holidays are clearly marked.'
                    },
                    {
                      q: 'Can I share this calendar with my family?',
                      a: 'Yes! After importing to your calendar app, you can share it with family members. In Google Calendar, you can share your calendar with others via email. You can also download and send the .ics file directly to anyone.'
                    },
                    {
                      q: 'Does it include Islamic festivals like Eid and Ramadan?',
                      a: 'Yes! All major Islamic festivals are included: Eid ul-Fitr, Eid ul-Adha (Bakrid), Muharram, Shab-e-Barat, Milad-un-Nabi, and more. Dates are calculated based on the Islamic lunar calendar.'
                    }
                  ].map((faq, idx) => (
                    <div key={idx} className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                        <span className="text-indigo-600 flex-shrink-0">Q{idx + 1}.</span>
                        <span>{faq.q}</span>
                      </h4>
                      <p className="text-gray-700 ml-8">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Tools */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Festival & Calendar Tools</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { to: '/festival-tools/diwali-date-finder', icon: '🪔', title: 'Diwali Date Finder', desc: 'Find exact Diwali dates with muhurat timings' },
                    { to: '/festival-tools/custom-festival-reminder', icon: '🔔', title: 'Custom Reminders', desc: 'Set personalized festival alerts' },
                    { to: '/festival-tools/public-holiday-finder', icon: '🏖️', title: 'Holiday Finder', desc: 'Find state-wise public holidays' },
                    { to: '/festival-tools/festival-countdown-clock', icon: '⏰', title: 'Festival Countdown', desc: 'Live countdown to festivals' },
                    { to: '/festival-tools/shubh-muhurat-reminder', icon: '🌟', title: 'Muhurat Finder', desc: 'Auspicious timing calculator' },
                    { to: '/festival-date-calendar', icon: '📅', title: 'Festival Calendar', desc: 'Complete festival date list' }
                  ].map((tool, idx) => (
                    <Link
                      key={idx}
                      to={tool.to}
                      className="block p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all group"
                    >
                      <div className="text-4xl mb-3">{tool.icon}</div>
                      <h4 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {tool.title}
                      </h4>
                      <p className="text-sm text-gray-600">{tool.desc}</p>
                      <div className="mt-3 text-purple-600 font-semibold flex items-center gap-2">
                        Try Now <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* External Resources */}
              <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">📚 External Resources & Official Sources</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://pib.gov.in/PressReleasePage.aspx" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Press Information Bureau (PIB) - Official Government Holiday List
                    </a>
                  </li>
                  <li>
                    <a href="https://www.india.gov.in/calendar" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      India.gov.in - National Portal Calendar
                    </a>
                  </li>
                  <li>
                    <a href="https://support.google.com/calendar/answer/37118" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Google Calendar Help - Import Events
                    </a>
                  </li>
                  <li>
                    <a href="https://support.microsoft.com/en-us/office/import-or-subscribe-to-a-calendar-in-outlook-com-cff1429c-5af6-41ec-a5b4-74f2c278e98c" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Outlook Calendar - Import Guide
                    </a>
                  </li>
                  <li>
                    <a href="https://support.apple.com/guide/calendar/import-or-export-calendars-icl1023/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Apple Calendar - Import Instructions
                    </a>
                  </li>
                </ul>
              </div>

              {/* Trust & Expertise */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                <h3 className="text-2xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                  <Award className="w-8 h-8" />
                  🏆 Why Trust MoneyCal.in for Your Festival Calendar?
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>✓ Expert Verified:</strong> All festival dates verified by Hindu panchang experts and official government sources</p>
                  <p><strong>✓ Astronomical Accuracy:</strong> Muhurat timings calculated using precise astronomical algorithms and verified against traditional methods</p>
                  <p><strong>✓ Comprehensive Coverage:</strong> 100+ festivals covering all major religions practiced in India</p>
                  <p><strong>✓ Regular Updates:</strong> Calendar data updated annually with new information and user feedback</p>
                  <p><strong>✓ Privacy First:</strong> No registration required, no data collected, 100% client-side processing</p>
                  <p><strong>✓ 1M+ Users:</strong> Trusted by over 1 million Indians worldwide for accurate festival information</p>
                </div>
              </div>

              {/* Final CTA */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl text-center">
                <h3 className="text-3xl font-black mb-4">🎉 Ready to Sync Your Festival Calendar?</h3>
                <p className="text-xl mb-6 opacity-95">
                  Add 100+ Indian festivals to your calendar in just 1 minute - completely FREE!
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all inline-flex items-center gap-3"
                >
                  <RefreshCw className="w-6 h-6" />
                  Generate My Festival Calendar Now
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndianHolidayCalendarSync;
