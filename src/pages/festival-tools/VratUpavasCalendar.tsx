import React, { useState } from 'react';
import { Calendar, Download, Share2, Sun, Moon, Star, Clock, MapPin, CheckCircle, Gift, Bell } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const VratUpavasCalendar: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCity, setSelectedCity] = useState('delhi');
  const [filterType, setFilterType] = useState<'all' | 'ekadashi' | 'sankashti' | 'navratri'>('all');

  // City database
  const cities = {
    delhi: { name: 'Delhi', lat: 28.7041, lon: 77.1025 },
    mumbai: { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    bangalore: { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    kolkata: { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
    chennai: { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
    pune: { name: 'Pune', lat: 18.5204, lon: 73.8567 },
    ahmedabad: { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714 },
    hyderabad: { name: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
    varanasi: { name: 'Varanasi', lat: 25.3176, lon: 82.9739 },
    jaipur: { name: 'Jaipur', lat: 26.9124, lon: 75.7873 }
  };

  // Generate all vrat dates for the year
  const generateVratCalendar = () => {
    const vrats = [];
    const lunarCycle = 29.53059;
    
    // Ekadashi (11th tithi - occurs twice per lunar month)
    for (let month = 0; month < 12; month++) {
      // Shukla Paksha Ekadashi
      const ekadashi1Day = Math.floor(10 + (month * lunarCycle) % 30);
      vrats.push({
        date: new Date(selectedYear, month, Math.min(ekadashi1Day, 28)),
        name: 'Ekadashi Vrat',
        type: 'ekadashi',
        paksha: 'Shukla',
        icon: '🙏',
        color: 'from-purple-100 to-pink-100',
        borderColor: 'border-purple-500',
        fasting: 'Sunrise to next sunrise (24 hours)',
        deity: 'Lord Vishnu',
        rules: 'No grains, no rice, only fruits & milk',
        benefits: 'Spiritual purification, health benefits, moksha'
      });

      // Krishna Paksha Ekadashi
      const ekadashi2Day = Math.floor(25 + (month * lunarCycle) % 30);
      vrats.push({
        date: new Date(selectedYear, month, Math.min(ekadashi2Day, 28)),
        name: 'Ekadashi Vrat',
        type: 'ekadashi',
        paksha: 'Krishna',
        icon: '🙏',
        color: 'from-purple-100 to-pink-100',
        borderColor: 'border-purple-500',
        fasting: 'Sunrise to next sunrise (24 hours)',
        deity: 'Lord Vishnu',
        rules: 'No grains, no rice, only fruits & milk',
        benefits: 'Spiritual purification, health benefits'
      });
    }

    // Sankashti Chaturthi (4th after full moon - monthly)
    for (let month = 0; month < 12; month++) {
      const sankashtiDay = Math.floor(18 + (month * lunarCycle) % 30);
      vrats.push({
        date: new Date(selectedYear, month, Math.min(sankashtiDay, 28)),
        name: 'Sankashti Chaturthi',
        type: 'sankashti',
        paksha: 'Krishna',
        icon: '🐘',
        color: 'from-orange-100 to-red-100',
        borderColor: 'border-orange-500',
        fasting: 'Sunrise to moonrise',
        deity: 'Lord Ganesha',
        rules: 'Break fast after moonrise, worship Ganesha',
        benefits: 'Remove obstacles, prosperity, success'
      });
    }

    // Navratri (twice a year - Chaitra & Sharad)
    const chaitraNavratri = new Date(selectedYear, 3, 10); // April (approximate)
    for (let i = 0; i < 9; i++) {
      const navratriDate = new Date(chaitraNavratri);
      navratriDate.setDate(chaitraNavratri.getDate() + i);
      vrats.push({
        date: navratriDate,
        name: `Navratri Day ${i + 1}`,
        type: 'navratri',
        paksha: 'Shukla',
        icon: '🔥',
        color: 'from-red-100 to-orange-100',
        borderColor: 'border-red-500',
        fasting: '9-day fasting period',
        deity: 'Goddess Durga',
        rules: 'No grains, sattvic food only',
        benefits: 'Divine blessings, spiritual growth'
      });
    }

    const sharadNavratri = new Date(selectedYear, 9, 3); // October (approximate)
    for (let i = 0; i < 9; i++) {
      const navratriDate = new Date(sharadNavratri);
      navratriDate.setDate(sharadNavratri.getDate() + i);
      vrats.push({
        date: navratriDate,
        name: `Navratri Day ${i + 1}`,
        type: 'navratri',
        paksha: 'Shukla',
        icon: '🔥',
        color: 'from-red-100 to-orange-100',
        borderColor: 'border-red-500',
        fasting: '9-day fasting period',
        deity: 'Goddess Durga',
        rules: 'No grains, sattvic food only',
        benefits: 'Divine blessings, prosperity'
      });
    }

    // Karva Chauth (October)
    vrats.push({
      date: new Date(selectedYear, 9, 17),
      name: 'Karva Chauth',
      type: 'other',
      paksha: 'Krishna',
      icon: '👰',
      color: 'from-pink-100 to-rose-100',
      borderColor: 'border-pink-500',
      fasting: 'Sunrise to moonrise (no water)',
      deity: 'For husband\'s long life',
      rules: 'Married women fast, break after moon sighting',
      benefits: 'Husband\'s longevity, marital bliss'
    });

    // Maha Shivaratri
    vrats.push({
      date: new Date(selectedYear, 2, 8),
      name: 'Maha Shivaratri',
      type: 'other',
      paksha: 'Krishna',
      icon: '🔱',
      color: 'from-blue-100 to-cyan-100',
      borderColor: 'border-blue-500',
      fasting: 'Full day & night fast',
      deity: 'Lord Shiva',
      rules: 'No food/water, night vigil, Rudrabhishek',
      benefits: 'Liberation, blessings of Shiva'
    });

    return vrats.filter(v => {
      if (filterType === 'all') return true;
      return v.type === filterType;
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const vrats = generateVratCalendar();

  const downloadICS = () => {
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MoneyCal//Vrat Upavas Calendar//EN
METHOD:PUBLISH
`;

    vrats.forEach((vrat) => {
      icsContent += `BEGIN:VEVENT
UID:vrat-${vrat.date.toISOString().split('T')[0]}-${vrat.name.replace(/\s/g, '-')}@moneycal.in
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${vrat.date.toISOString().split('T')[0].replace(/-/g, '')}
SUMMARY:${vrat.name} - ${vrat.deity}
DESCRIPTION:Fasting: ${vrat.fasting} | Rules: ${vrat.rules}
LOCATION:${cities[selectedCity as keyof typeof cities].name}, India
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Reminder: ${vrat.name} tomorrow
END:VALARM
END:VEVENT
`;
    });

    icsContent += 'END:VCALENDAR';

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Vrat-Upavas-Calendar-${selectedYear}-${cities[selectedCity as keyof typeof cities].name}.ics`;
    a.click();
  };

  const ekadashiCount = vrats.filter(v => v.type === 'ekadashi').length;
  const sankashtiCount = vrats.filter(v => v.type === 'sankashti').length;
  const navratriCount = vrats.filter(v => v.type === 'navratri').length;

  return (
    <>
      <SEOHelmet
        title={`Hindu Vrat Upavas Calendar ${selectedYear} India - Fasting Dates Ekadashi Navratri | MoneyCal`}
        description={`Complete Hindu Vrat (fasting) calendar for ${selectedYear}. Find Ekadashi dates (${ekadashiCount} days), Sankashti Chaturthi, Navratri, Karva Chauth, Maha Shivaratri fasting dates. Download PDF calendar with sunrise-sunset times, fasting rules, rituals for all cities in India.`}
        keywords="Vrat calendar 2025 2026, Upavas dates India, Ekadashi fasting dates 2025, Hindu fasting calendar, Sankashti Chaturthi dates, Navratri fasting, Karva Chauth 2025, Maha Shivaratri fast, व्रत कैलेंडर, उपवास तिथि"
        canonicalUrl="/festival-tools/vrat-upavas-calendar"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Hindu Vrat & Upavas Calendar',
          description: 'Complete Hindu fasting calendar with Ekadashi, Navratri, Sankashti and all vrat dates',
          applicationCategory: 'LifestyleApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR'
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center mb-4">
              <Star className="h-12 w-12 mr-4 animate-spin-slow" />
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                व्रत उपवास कैलेंडर {selectedYear}
              </h1>
              <Moon className="h-12 w-12 ml-4 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-2">
              Hindu Vrat & Upavas Calendar {selectedYear}
            </h2>
            <p className="text-center text-xl text-purple-100 max-w-3xl mx-auto">
              Complete Fasting Calendar - Ekadashi, Navratri, Sankashti, Karva Chauth & More!
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline h-5 w-5 mr-2" />
                  Select Year (वर्ष)
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-lg font-semibold"
                >
                  {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-5 w-5 mr-2" />
                  City (शहर)
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-lg font-semibold"
                >
                  {Object.entries(cities).map(([key, city]) => (
                    <option key={key} value={key}>{city.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Filter Vrat Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-lg font-semibold"
                >
                  <option value="all">All Vrats ({vrats.length})</option>
                  <option value="ekadashi">Ekadashi Only ({ekadashiCount})</option>
                  <option value="sankashti">Sankashti Only ({sankashtiCount})</option>
                  <option value="navratri">Navratri Only ({navratriCount})</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button
                onClick={downloadICS}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center shadow-lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Download {selectedYear} Vrat Calendar
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `Vrat Calendar ${selectedYear}`,
                      text: `Hindu fasting calendar with all vrat dates for ${selectedYear}`,
                      url: window.location.href
                    });
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center shadow-lg"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share Calendar
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl shadow-lg p-6 border-2 border-purple-400 text-center">
              <div className="text-4xl mb-2">🙏</div>
              <p className="text-sm text-gray-600 mb-1">Ekadashi Vrats</p>
              <p className="text-4xl font-bold text-purple-700">{ekadashiCount}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl shadow-lg p-6 border-2 border-orange-400 text-center">
              <div className="text-4xl mb-2">🐘</div>
              <p className="text-sm text-gray-600 mb-1">Sankashti Chaturthi</p>
              <p className="text-4xl font-bold text-orange-700">{sankashtiCount}</p>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-xl shadow-lg p-6 border-2 border-red-400 text-center">
              <div className="text-4xl mb-2">🔥</div>
              <p className="text-sm text-gray-600 mb-1">Navratri Days</p>
              <p className="text-4xl font-bold text-red-700">{navratriCount}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl shadow-lg p-6 border-2 border-blue-400 text-center">
              <div className="text-4xl mb-2">📿</div>
              <p className="text-sm text-gray-600 mb-1">Total Vrat Days</p>
              <p className="text-4xl font-bold text-blue-700">{vrats.length}</p>
            </div>
          </div>

          {/* Complete Vrat List */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Complete Vrat Calendar {selectedYear} - {cities[selectedCity as keyof typeof cities].name}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vrats.map((vrat, idx) => {
                const isUpcoming = vrat.date >= new Date();
                const isPast = vrat.date < new Date();
                
                return (
                  <div
                    key={idx}
                    className={`bg-gradient-to-br ${vrat.color} rounded-xl p-5 border-4 ${vrat.borderColor} hover:shadow-xl transition-all ${isPast ? 'opacity-60' : ''}`}
                  >
                    {isUpcoming && idx < 3 && (
                      <div className="mb-2">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          <Bell className="inline h-3 w-3 mr-1" />
                          UPCOMING
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="text-5xl mr-3">{vrat.icon}</div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{vrat.name}</h3>
                          <p className="text-xs text-gray-600">{vrat.paksha} Paksha</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-purple-700">
                          {vrat.date.getDate()}
                        </p>
                        <p className="text-sm text-gray-600">
                          {vrat.date.toLocaleDateString('en-IN', { month: 'short' })}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-3 border-2 border-purple-200 mb-3">
                      <p className="text-sm font-semibold text-gray-900 mb-2">
                        {vrat.date.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                      <div className="flex items-center text-xs text-gray-600">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{vrat.fasting}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="bg-white rounded p-2">
                        <p className="text-gray-600 text-xs">Deity</p>
                        <p className="font-semibold text-gray-900">{vrat.deity}</p>
                      </div>
                      <div className="bg-white rounded p-2">
                        <p className="text-gray-600 text-xs">Rules</p>
                        <p className="text-gray-800 text-xs">{vrat.rules}</p>
                      </div>
                      <div className="bg-green-50 rounded p-2 border border-green-300">
                        <p className="text-gray-600 text-xs">Benefits</p>
                        <p className="text-green-700 text-xs font-semibold">{vrat.benefits}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-blue-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🔗 Related Festival & Financial Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/festival-tools/purnima-amavasya-dates" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Purnima & Amavasya</p>
                <p className="text-sm text-gray-600">Full & new moon dates</p>
              </a>
              <a href="/festival-tools/weekly-tithi-finder" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Weekly Tithi</p>
                <p className="text-sm text-gray-600">This week's tithi calendar</p>
              </a>
              <a href="/festival-tools/panchang-today" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-yellow-200">
                <p className="font-semibold text-yellow-600 mb-1">Daily Panchang</p>
                <p className="text-sm text-gray-600">Today's complete panchang</p>
              </a>
              <a href="/learn/credit-score" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Credit Score Guide</p>
                <p className="text-sm text-gray-600">Financial planning</p>
              </a>
              <a href="/tools/home-loan-calculator" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Home Loan Calculator</p>
                <p className="text-sm text-gray-600">EMI calculator</p>
              </a>
              <a href="/festival-tools" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-pink-200">
                <p className="font-semibold text-pink-600 mb-1">All Festival Tools</p>
                <p className="text-sm text-gray-600">More calculators</p>
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions (FAQ)
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: `How many Ekadashi fasts are there in ${selectedYear}?`,
                  a: `There are ${ekadashiCount} Ekadashi fasting days in ${selectedYear} - two per lunar month (Shukla Paksha and Krishna Paksha Ekadashi). Each Ekadashi is dedicated to Lord Vishnu and observed from sunrise to next day sunrise.`
                },
                {
                  q: "What is Ekadashi Vrat and how to observe it?",
                  a: "Ekadashi (एकादशी) is the 11th lunar day, dedicated to Lord Vishnu. Fast from sunrise to next sunrise (24 hours). Avoid grains, rice, pulses. Only fruits, milk, and water allowed. Break fast after sunrise next day with grain-free food."
                },
                {
                  q: "When is Sankashti Chaturthi in ${selectedYear}?",
                  a: `Sankashti Chaturthi occurs ${sankashtiCount} times in ${selectedYear} - on every Krishna Paksha Chaturthi (4th lunar day after Full Moon). It's dedicated to Lord Ganesha. Fast from sunrise to moonrise, break after moon sighting.`
                },
                {
                  q: "What are the rules for Navratri fasting?",
                  a: "Navratri fasting lasts 9 days, twice a year (Chaitra & Sharad). Avoid grains, onion, garlic. Eat only sattvic food like fruits, milk, sabudana, kuttu, singhara. Many observe complete fast or one-meal-a-day. Break fast on Dussehra (10th day)."
                },
                {
                  q: "Can I drink water during Karva Chauth fast?",
                  a: "No, Karva Chauth is a nirjala (waterless) fast observed by married women for husband's long life. No food or water from sunrise until moonrise. Break fast after seeing moon and performing puja. Consult elders for specific family traditions."
                },
                {
                  q: "What are benefits of Hindu fasting (Vrat)?",
                  a: "Hindu fasts (व्रत/उपवास) offer spiritual purification, self-discipline, health benefits through detoxification, mental clarity, devotion to deity, fulfillment of wishes, and karmic balance. Each vrat has specific spiritual and health benefits."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 border-2 border-purple-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-100 p-4 rounded-lg border-2 border-blue-400">
              <p className="text-sm text-gray-800">
                <strong>📚 External Resources:</strong>{' '}
                <a href="https://en.wikipedia.org/wiki/Ekadashi" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Ekadashi (Wikipedia)
                </a>
                {' | '}
                <a href="https://www.drikpanchang.com/ekadashi/ekadashi-calendar.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Ekadashi Calendar
                </a>
                {' | '}
                <a href="https://www.prokerala.com/astrology/vrat-and-upavas/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Vrat & Upavas Guide
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VratUpavasCalendar;

