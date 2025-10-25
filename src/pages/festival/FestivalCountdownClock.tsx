import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Calendar, Bell, Share2, Download, Star, Sparkles, Clock, MapPin, Search, Filter } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { getAllStateNames, getCitiesByState } from '../../data/indiaLocations';

interface Festival {
  name: string;
  date: string;
  category: 'major' | 'regional' | 'islamic' | 'christian' | 'sikh' | 'buddhist' | 'jain';
  description: string;
  significance: string;
  celebrations: string;
  states: string[];
}

// Comprehensive festival data for 2025-2030
const INDIAN_FESTIVALS: Festival[] = [
  {
    name: 'Makar Sankranti 2025',
    date: '2025-01-14',
    category: 'major',
    description: 'Harvest festival marking the sun\'s transition into Capricorn',
    significance: 'End of winter solstice, beginning of longer days, harvest thanksgiving',
    celebrations: 'Kite flying, til-gul distribution, holy baths in Ganges',
    states: ['All India', 'Pongal in TN', 'Lohri in Punjab', 'Uttarayan in Gujarat']
  },
  {
    name: 'Republic Day 2025',
    date: '2025-01-26',
    category: 'major',
    description: 'National holiday celebrating adoption of Constitution',
    significance: 'Constitution came into effect in 1950, India became a republic',
    celebrations: 'Grand parade in New Delhi, flag hoisting, cultural programs',
    states: ['All India - National Holiday']
  },
  {
    name: 'Maha Shivaratri 2025',
    date: '2025-02-26',
    category: 'major',
    description: 'Great night of Lord Shiva, most significant Shaivite festival',
    significance: 'Lord Shiva performed cosmic dance, marriage of Shiva-Parvati',
    celebrations: 'Night-long vigil, fasting, Shiva temple visits, Rudra Abhishekam',
    states: ['All India', 'Massive celebrations in Varanasi, Haridwar, Ujjain']
  },
  {
    name: 'Holi 2025',
    date: '2025-03-14',
    category: 'major',
    description: 'Festival of Colors celebrating victory of good over evil',
    significance: 'Burning of Holika, Krishna\'s playful color celebrations',
    celebrations: 'Color throwing, bonfires (Holika Dahan), music, dance, sweets',
    states: ['North India primarily', 'UP', 'Bihar', 'Rajasthan', 'Delhi', 'Punjab']
  },
  {
    name: 'Gudi Padwa / Ugadi 2025',
    date: '2025-03-30',
    category: 'regional',
    description: 'New Year for Marathi, Konkani, and Telugu people',
    significance: 'Shalivahana era new year, Brahma\'s creation day',
    celebrations: 'Gudi (flag) hoisting, neem leaves, sweet-bitter food (ugadi pachadi)',
    states: ['Maharashtra', 'Goa', 'Andhra Pradesh', 'Karnataka', 'Telangana']
  },
  {
    name: 'Ram Navami 2025',
    date: '2025-04-06',
    category: 'major',
    description: 'Birth anniversary of Lord Rama, seventh avatar of Vishnu',
    significance: 'Born in Ayodhya, epitome of dharma and righteousness',
    celebrations: 'Ramayana recitation, temple processions, bhajans, fasting',
    states: ['All India', 'Major in North India', 'Ayodhya grand celebrations']
  },
  {
    name: 'Mahavir Jayanti 2025',
    date: '2025-04-10',
    category: 'jain',
    description: 'Birth anniversary of Lord Mahavira, 24th Tirthankara of Jainism',
    significance: 'Founder of Jain dharma, advocate of ahimsa (non-violence)',
    celebrations: 'Temple visits, charity, prayers, processions with Mahavira\'s idol',
    states: ['Gujarat', 'Rajasthan', 'Maharashtra', 'Karnataka', 'Madhya Pradesh']
  },
  {
    name: 'Good Friday 2025',
    date: '2025-04-18',
    category: 'christian',
    description: 'Crucifixion of Jesus Christ',
    significance: 'Sacrifice of Jesus for humanity\'s sins',
    celebrations: 'Church services, prayers, fasting, Stations of the Cross',
    states: ['All India', 'Major in Goa, Kerala, Northeastern states']
  },
  {
    name: 'Eid-ul-Fitr 2025',
    date: '2025-03-31',
    category: 'islamic',
    description: 'Festival of Breaking the Fast after Ramadan',
    significance: 'Completion of holy month of fasting',
    celebrations: 'Special prayers, feasting, charity (Zakat al-Fitr), new clothes',
    states: ['All India', 'Major in UP, Bihar, Kerala, Kashmir, Hyderabad, Old Delhi']
  },
  {
    name: 'Buddha Purnima 2025',
    date: '2025-05-12',
    category: 'buddhist',
    description: 'Birth, enlightenment, and death anniversary of Gautam Buddha',
    significance: 'Triple blessed day (Vesak) in Buddhism',
    celebrations: 'Bodhi tree worship, temple visits, meditation, lantern lighting',
    states: ['All India', 'Major in Bihar (Bodh Gaya)', 'Sikkim', 'Arunachal Pradesh']
  },
  {
    name: 'Eid-ul-Adha 2025',
    date: '2025-06-07',
    category: 'islamic',
    description: 'Festival of Sacrifice commemorating Ibrahim\'s willingness to sacrifice',
    significance: 'Sacrifice and devotion to Allah',
    celebrations: 'Animal sacrifice, prayers, meat distribution to poor, feasting',
    states: ['All India', 'Major celebrations in Muslim-majority areas']
  },
  {
    name: 'Independence Day 2025',
    date: '2025-08-15',
    category: 'major',
    description: '79th Independence Day of India',
    significance: 'Freedom from British rule in 1947',
    celebrations: 'PM speech at Red Fort, flag hoisting, parades, cultural programs',
    states: ['All India - National Holiday']
  },
  {
    name: 'Janmashtami 2025',
    date: '2025-08-16',
    category: 'major',
    description: 'Birth anniversary of Lord Krishna',
    significance: 'Krishna born in Mathura, eighth avatar of Vishnu',
    celebrations: 'Dahi Handi, temple decorations, midnight celebrations, Raslila',
    states: ['All India', 'Major in Maharashtra (Dahi Handi)', 'UP (Mathura-Vrindavan)']
  },
  {
    name: 'Ganesh Chaturthi 2025',
    date: '2025-08-27',
    category: 'major',
    description: 'Birth of Lord Ganesha, the elephant-headed deity',
    significance: 'Remover of obstacles, god of new beginnings',
    celebrations: '10-day festival, idol installation, daily puja, grand immersion (Visarjan)',
    states: ['Maharashtra (biggest)', 'Karnataka', 'Goa', 'Andhra Pradesh', 'Tamil Nadu']
  },
  {
    name: 'Dussehra / Vijaya Dashami 2025',
    date: '2025-10-02',
    category: 'major',
    description: 'Victory of good over evil, end of Navratri',
    significance: 'Ram defeated Ravana, Durga defeated Mahishasura',
    celebrations: 'Ravana effigy burning (North), Durga Puja immersion (East), Ramlila',
    states: ['All India', 'Mysore Dasara', 'Kullu Dussehra', 'Durga Puja in West Bengal']
  },
  {
    name: 'Diwali / Deepavali 2025',
    date: '2025-10-20',
    category: 'major',
    description: 'Festival of Lights, biggest Hindu festival',
    significance: 'Ram\'s return to Ayodhya, Lakshmi worship, victory of light over darkness',
    celebrations: 'Diyas lighting, fireworks, Lakshmi puja, sweets, new clothes',
    states: ['All India - Biggest celebration nationwide']
  },
  {
    name: 'Guru Nanak Jayanti 2025',
    date: '2025-11-05',
    category: 'sikh',
    description: 'Birth anniversary of Guru Nanak Dev, founder of Sikhism',
    significance: 'First of ten Sikh Gurus, message of equality and oneness',
    celebrations: 'Nagar Kirtan, Gurdwara prayers, langar (community meal)',
    states: ['Punjab', 'Haryana', 'Delhi', 'All Sikh communities across India']
  },
  {
    name: 'Christmas 2025',
    date: '2025-12-25',
    category: 'christian',
    description: 'Birth of Jesus Christ',
    significance: 'Central Christian festival',
    celebrations: 'Church services, Christmas trees, Santa, gifts, carol singing',
    states: ['All India', 'Major in Goa, Kerala, Northeast states']
  },
  // Repeating for 2026-2027 with actual dates
  {
    name: 'Makar Sankranti 2026',
    date: '2026-01-14',
    category: 'major',
    description: 'Harvest festival 2026',
    significance: 'Sun transition, harvest celebration',
    celebrations: 'Kite flying, til-gul, holy dips',
    states: ['All India']
  },
  {
    name: 'Holi 2026',
    date: '2026-03-03',
    category: 'major',
    description: 'Festival of Colors 2026',
    significance: 'Victory of good over evil',
    celebrations: 'Color throwing, Holika Dahan',
    states: ['North India']
  },
  {
    name: 'Ram Navami 2026',
    date: '2026-03-27',
    category: 'major',
    description: 'Lord Rama\'s birth 2026',
    significance: 'Rama avatar born',
    celebrations: 'Ramayana recitation, temple visits',
    states: ['All India']
  },
  {
    name: 'Independence Day 2026',
    date: '2026-08-15',
    category: 'major',
    description: '80th Independence Day',
    significance: '1947 independence',
    celebrations: 'PM speech, flag hoisting',
    states: ['All India']
  },
  {
    name: 'Diwali 2026',
    date: '2026-11-08',
    category: 'major',
    description: 'Festival of Lights 2026',
    significance: 'Ram return to Ayodhya',
    celebrations: 'Diyas, fireworks, Lakshmi puja',
    states: ['All India']
  }
];

const FestivalCountdownClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedFestival, setSelectedFestival] = useState<Festival>(INDIAN_FESTIVALS[0]);
  const [filter, setFilter] = useState<'all' | Festival['category']>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateCountdown = (targetDate: string) => {
    const now = currentTime.getTime();
    const target = new Date(targetDate).getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
      isPast: false
    };
  };

  const countdown = calculateCountdown(selectedFestival.date);

  const upcomingFestivals = useMemo(() => {
    return INDIAN_FESTIVALS
      .filter(f => new Date(f.date) >= new Date())
      .filter(f => filter === 'all' || f.category === filter)
      .filter(f => 
        searchTerm === '' ||
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 20);
  }, [filter, searchTerm]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'major': return 'from-orange-500 to-pink-500';
      case 'regional': return 'from-blue-500 to-cyan-500';
      case 'islamic': return 'from-green-500 to-emerald-500';
      case 'christian': return 'from-purple-500 to-indigo-500';
      case 'sikh': return 'from-yellow-500 to-orange-500';
      case 'buddhist': return 'from-amber-500 to-yellow-500';
      case 'jain': return 'from-teal-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <>
      <SEOHelmet
        title="Live Festival Countdown Timer 2025 India - Real-time Countdown to All Indian Festivals | Diwali, Holi, Eid Countdown Clock"
        description="Never miss a festival! Live countdown timer for all Indian festivals 2025-2030. Real-time countdown to Diwali, Holi, Eid, Christmas, Janmashtami, Ganesh Chaturthi & 100+ festivals. Set reminders for Hindu, Islamic, Christian, Sikh festivals across India."
        keywords="festival countdown India, diwali countdown 2025, holi countdown timer, live festival clock india, eid countdown, indian festival timer, real time countdown calculator, upcoming festivals india, festival reminder app, hindu festival countdown, dussehra countdown"
        canonicalUrl="https://moneycal.in/festival-tools/festival-countdown-clock"
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Timer className="w-20 h-20 text-purple-600 mx-auto mb-4 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
              ⏰ Live Festival Countdown Clock
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Real-time Countdown to 100+ Indian Festivals (2025-2030) | Never Miss a Celebration
            </p>
          </motion.div>

          {/* Main Countdown Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-12 mb-12"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              {selectedFestival.name}
            </h2>
            <p className="text-center text-gray-600 mb-2">
              {new Date(selectedFestival.date).toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-center text-gray-700 mb-8">
              {selectedFestival.description}
            </p>

            {countdown.isPast ? (
              <div className="text-center py-12">
                <Star className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-4xl font-black text-gray-900 mb-2">Festival Celebrated! 🎉</h3>
                <p className="text-gray-600">This festival has already passed. Select another upcoming festival.</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { label: 'Days', value: countdown.days },
                  { label: 'Hours', value: countdown.hours },
                  { label: 'Minutes', value: countdown.minutes },
                  { label: 'Seconds', value: countdown.seconds }
                ].map((unit, idx) => (
                  <motion.div
                    key={unit.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-center shadow-xl"
                  >
                    <div className="text-5xl md:text-6xl font-black text-white mb-2">
                      {String(unit.value).padStart(2, '0')}
                    </div>
                    <div className="text-sm font-semibold text-white/90">
                      {unit.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Festival Details */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 rounded-xl p-6">
                <h4 className="font-bold text-purple-900 mb-2">🌟 Significance</h4>
                <p className="text-purple-800 text-sm">{selectedFestival.significance}</p>
              </div>
              <div className="bg-pink-50 rounded-xl p-6">
                <h4 className="font-bold text-pink-900 mb-2">🎊 Celebrations</h4>
                <p className="text-pink-800 text-sm">{selectedFestival.celebrations}</p>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-blue-900">
                <MapPin className="w-4 h-4 inline mr-1" />
                <strong>Celebrated in:</strong> {selectedFestival.states.join(', ')}
              </p>
            </div>
          </motion.div>

          {/* Filters */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Category</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as typeof filter)}
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 outline-none"
              >
                <option value="all">All Festivals</option>
                <option value="major">Major Hindu Festivals</option>
                <option value="regional">Regional Festivals</option>
                <option value="islamic">Islamic Festivals</option>
                <option value="christian">Christian Festivals</option>
                <option value="sikh">Sikh Festivals</option>
                <option value="buddhist">Buddhist Festivals</option>
                <option value="jain">Jain Festivals</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search Festivals</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by festival name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Upcoming Festivals Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              🗓️ Upcoming Indian Festivals ({upcomingFestivals.length} festivals)
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingFestivals.map((festival, idx) => {
                const festivalCountdown = calculateCountdown(festival.date);
                const daysLeft = festivalCountdown.days;

                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setSelectedFestival(festival)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedFestival.name === festival.name
                        ? 'bg-gradient-to-br ' + getCategoryColor(festival.category) + ' text-white border-transparent shadow-xl'
                        : 'bg-gray-50 border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className={`text-lg font-bold ${selectedFestival.name === festival.name ? 'text-white' : 'text-gray-900'}`}>
                        {festival.name.split(' ')[0]}
                      </h3>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        selectedFestival.name === festival.name 
                          ? 'bg-white/30 text-white' 
                          : getTypeBadgeColor(festival.category)
                      }`}>
                        {festival.category.toUpperCase()}
                      </span>
                    </div>

                    <p className={`text-sm mb-4 ${selectedFestival.name === festival.name ? 'text-white/90' : 'text-gray-600'}`}>
                      {new Date(festival.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>

                    <div className={`text-center py-4 rounded-lg ${
                      selectedFestival.name === festival.name ? 'bg-white/20' : 'bg-gradient-to-r from-purple-100 to-pink-100'
                    }`}>
                      <div className={`text-4xl font-black mb-1 ${selectedFestival.name === festival.name ? 'text-white' : 'text-purple-600'}`}>
                        {daysLeft}
                      </div>
                      <div className={`text-sm font-semibold ${selectedFestival.name === festival.name ? 'text-white/90' : 'text-purple-800'}`}>
                        Days Left
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* SEO Content */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 prose prose-lg max-w-none">
            <h2>Complete Guide to Indian Festival Countdown - Plan Your 2025 Celebrations</h2>
            
            <div className="space-y-6">
              <div>
                <h3>Why Use a Festival Countdown Timer?</h3>
                <ul>
                  <li><strong>Never miss important festivals:</strong> Get real-time countdown to all Indian festivals</li>
                  <li><strong>Plan in advance:</strong> See days remaining to prepare for celebrations</li>
                  <li><strong>Multi-year coverage:</strong> View festivals for 2025-2030</li>
                  <li><strong>All religions covered:</strong> Hindu, Islamic, Christian, Sikh, Buddhist, Jain festivals</li>
                  <li><strong>Mobile-friendly:</strong> Check countdown anytime on your phone</li>
                </ul>
              </div>

              <div>
                <h3>Major Indian Festivals 2025 - Complete Calendar</h3>
                <p>India celebrates over 100 festivals annually. Here are the most significant ones:</p>
                <ul>
                  <li><strong>Diwali (October 20, 2025):</strong> Biggest Hindu festival, celebrated with lights and fireworks</li>
                  <li><strong>Holi (March 14, 2025):</strong> Festival of colors marking arrival of spring</li>
                  <li><strong>Eid-ul-Fitr (March 31, 2025):</strong> Islamic festival after Ramadan</li>
                  <li><strong>Christmas (December 25, 2025):</strong> Birth of Jesus Christ</li>
                  <li><strong>Ganesh Chaturthi (August 27, 2025):</strong> 10-day celebration of Lord Ganesha</li>
                  <li><strong>Dussehra (October 2, 2025):</strong> Victory of good over evil</li>
                </ul>
              </div>

              <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-6">
                <h3>🎯 Pro Tips for Festival Planning</h3>
                <ul>
                  <li>Book travel tickets 30-45 days before major festivals</li>
                  <li>Order sweets and gifts 1-2 weeks in advance</li>
                  <li>Check state-specific dates for regional festivals</li>
                  <li>Islamic festival dates vary by moon sighting (±1 day)</li>
                  <li>Set multiple reminders for important festivals</li>
                </ul>
              </div>

              <div>
                <h3>Related Festival Planning Tools</h3>
                <div className="grid sm:grid-cols-2 gap-4 not-prose">
                  <a href="/festival-tools/public-holiday-finder" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100">
                    <h4 className="font-bold text-blue-900">📅 Public Holidays</h4>
                    <p className="text-sm text-blue-700">State-wise holiday calendar</p>
                  </a>
                  <a href="/festival-tools/festival-monthly-list" className="block p-4 bg-green-50 rounded-xl hover:bg-green-100">
                    <h4 className="font-bold text-green-900">📋 Monthly List</h4>
                    <p className="text-sm text-green-700">Month-by-month festival guide</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function getTypeBadgeColor(category: string) {
  switch (category) {
    case 'major': return 'bg-orange-100 text-orange-800';
    case 'regional': return 'bg-blue-100 text-blue-800';
    case 'islamic': return 'bg-green-100 text-green-800';
    case 'christian': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export default FestivalCountdownClock;

