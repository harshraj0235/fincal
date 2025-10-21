import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Download, Share2, Sunrise, Sunset, Star, Sparkles } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { makarSankrantiDates, cityMakarData, regionalCelebrations, sankrantiRituals, makarSankrantiFAQs, sankrantiFood } from '../../data/makarSankrantiData';

const PongalCalendar: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [showShareModal, setShowShareModal] = useState(false);

  const sankrantiData = useMemo(() => {
    return makarSankrantiDates.find(d => d.year === selectedYear) || makarSankrantiDates[0];
  }, [selectedYear]);

  const cityData = useMemo(() => {
    return cityMakarData.find(c => c.city === selectedCity) || cityMakarData[0];
  }, [selectedCity]);

  const daysUntilPongal = useMemo(() => {
    const today = new Date();
    const pongalDate = new Date(sankrantiData.gregorianDate);
    const diffTime = pongalDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [sankrantiData]);

  // Calculate 4-day Pongal dates
  const pongalDays = useMemo(() => {
    const thaiPongal = new Date(sankrantiData.gregorianDate);
    const bhogi = new Date(thaiPongal);
    bhogi.setDate(bhogi.getDate() - 1);
    const mattuPongal = new Date(thaiPongal);
    mattuPongal.setDate(mattuPongal.getDate() + 1);
    const kaanumPongal = new Date(thaiPongal);
    kaanumPongal.setDate(kaanumPongal.getDate() + 2);

    return [
      {
        name: 'Bhogi',
        tamilName: 'போகி',
        date: bhogi,
        description: 'Day 1: Discard old items, clean house, light bonfire to mark new beginnings',
        color: 'from-red-500 to-orange-600',
        icon: '🔥',
        rituals: ['Clean and declutter house', 'Light Bhogi Mantalu (bonfire)', 'Discard old possessions', 'Decorate with kolam']
      },
      {
        name: 'Thai Pongal',
        tamilName: 'தை பொங்கல்',
        date: thaiPongal,
        description: 'Day 2: Main Pongal day - Cook sweet rice (Pongal) in new earthen pot, offer to Sun God',
        color: 'from-yellow-500 to-amber-600',
        icon: '🌾',
        rituals: ['Cook Pongal in new pot', 'Offer to Surya Bhagwan', 'Decorate home with sugarcane', 'Wear new clothes']
      },
      {
        name: 'Mattu Pongal',
        tamilName: 'மாட்டு பொங்கல்',
        date: mattuPongal,
        description: 'Day 3: Cattle appreciation day - Worship and decorate cows and bulls',
        color: 'from-green-500 to-emerald-600',
        icon: '🐄',
        rituals: ['Decorate cattle with flowers', 'Feed special food to animals', 'Jallikattu events', 'Thank animals for farming help']
      },
      {
        name: 'Kaanum Pongal',
        tamilName: 'காணும் பொங்கல்',
        date: kaanumPongal,
        description: 'Day 4: Family day - Visit relatives, exchange greetings, outdoor picnics',
        color: 'from-blue-500 to-indigo-600',
        icon: '👨‍👩‍👧‍👦',
        rituals: ['Visit relatives and friends', 'Exchange gifts and sweets', 'Outdoor activities', 'Family picnics']
      }
    ];
  }, [sankrantiData]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const downloadCalendar = () => {
    const events = pongalDays.map(day => [
      'BEGIN:VEVENT',
      `DTSTART:${day.date.toISOString().split('T')[0].replace(/-/g, '')}`,
      `DTEND:${day.date.toISOString().split('T')[0].replace(/-/g, '')}`,
      `SUMMARY:${day.name} ${selectedYear} - ${selectedCity}`,
      `DESCRIPTION:${day.description}`,
      `LOCATION:${selectedCity}, ${cityData.state}`,
      'END:VEVENT'
    ].join('\n')).join('\n');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MoneyCal//Pongal Calendar//EN',
      events,
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pongal-${selectedYear}-${selectedCity.toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareOnSocial = (platform: string) => {
    const text = `🌾 Pongal ${selectedYear} in ${selectedCity}! Thai Pongal: ${formatDate(pongalDays[1].date)}. Complete 4-day calendar on MoneyCal! பொங்கலோ பொங்கல்! 🎉`;
    const url = window.location.href;
    
    const shareUrls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <>
      <SEOHelmet
        title={`Pongal ${selectedYear} Calendar - Thai Pongal Date ${selectedCity} | 4-Day Celebration | MoneyCal`}
        description={`Pongal ${selectedYear} in ${selectedCity}: Thai Pongal on ${formatDate(pongalDays[1].date)}. Get exact Makar Sankranti time, Punya Kaal, complete 4-day calendar (Bhogi, Thai Pongal, Mattu Pongal, Kaanum Pongal), sunrise times, Tamil Panchangam, regional celebrations, kolam ideas, recipes. Download calendar & celebrate harvest festival!`}
        keywords="Pongal 2025 date, Thai Pongal 2025, Pongal calendar, Makar Sankranti Tamil Nadu, Bhogi date, Mattu Pongal, Kaanum Pongal, Pongal Tamil Panchangam, Pongal Chennai, Uttarayan Gujarat"
        ogImage="https://moneycal.in/images/pongal-calendar.jpg"
      />

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 text-white py-16 px-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-9xl">🌾</div>
            <div className="absolute bottom-10 right-10 text-9xl">🎍</div>
            <div className="absolute top-1/2 left-1/4 text-6xl">🪔</div>
            <div className="absolute top-1/3 right-1/3 text-7xl">☀️</div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="flex justify-center mb-6"
            >
              <Sparkles className="w-16 h-16" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
              🌾 Pongal {selectedYear} 🌾
            </h1>
            <h2 className="text-2xl md:text-3xl text-center mb-2 text-amber-100">
              Tamil Harvest Festival Calendar
            </h2>
            <h3 className="text-xl text-center mb-6 text-yellow-100">
              பொங்கலோ பொங்கல்! (Pongalo Pongal!)
            </h3>
            <p className="text-xl text-center max-w-3xl mx-auto text-white/90">
              Complete 4-day Pongal calendar for {selectedCity}: Bhogi, Thai Pongal, Mattu Pongal & Kaanum Pongal with exact Makar Sankranti time, Punya Kaal & sunrise timings.
            </p>
          </div>
        </motion.div>

        {/* Countdown Section */}
        {daysUntilPongal > 0 && daysUntilPongal < 365 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-6xl mx-auto px-4 -mt-8 relative z-20"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-yellow-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Countdown to Thai Pongal {selectedYear}</h3>
                <div className="flex justify-center items-center gap-4">
                  <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-xl p-6 min-w-[120px]">
                    <div className="text-5xl font-bold">{daysUntilPongal}</div>
                    <div className="text-lg mt-2">Days</div>
                  </div>
                  <Star className="w-12 h-12 text-yellow-500" />
                </div>
                <p className="mt-4 text-gray-600 text-lg">
                  Thai Pongal on {formatDate(pongalDays[1].date)}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Selection Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-yellow-600" />
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50 text-gray-800 font-semibold"
                >
                  {makarSankrantiDates.map(d => (
                    <option key={d.year} value={d.year}>
                      {d.year} - {new Date(d.gregorianDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-yellow-600" />
                  Select City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50 text-gray-800 font-semibold"
                >
                  {cityMakarData.map(city => (
                    <option key={city.city} value={city.city}>
                      {city.city}, {city.state} - {city.regionalName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={downloadCalendar}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <Download className="w-5 h-5" />
                Download 4-Day Calendar
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </motion.div>

          {/* Sankranti Timing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-2xl p-8 mb-8 text-white"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-6">Makar Sankranti {selectedYear} - {selectedCity}</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5">
                  <Sunrise className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-sm text-amber-100 mb-1">Sankranti Time</div>
                  <div className="text-2xl font-bold">{cityData.sankrantiTime}</div>
                  <div className="text-xs mt-1">Sun enters Capricorn (270°)</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5">
                  <Star className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-sm text-amber-100 mb-1">Punya Kaal</div>
                  <div className="text-xl font-bold">{cityData.punyaKaal}</div>
                  <div className="text-xs mt-1">Most auspicious time</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5">
                  <Sunrise className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-sm text-amber-100 mb-1">Sunrise</div>
                  <div className="text-2xl font-bold">{cityData.sunrise}</div>
                  <div className="text-xs mt-1">Ritual timing reference</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4-Day Pongal Calendar */}
          <div className="space-y-6 mb-8">
            {pongalDays.map((day, index) => (
              <motion.div
                key={day.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`bg-gradient-to-br ${day.color} rounded-2xl shadow-xl p-8 text-white`}
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="text-6xl">{day.icon}</div>
                    <div>
                      <div className="text-sm text-white/80">Day {index + 1}</div>
                      <h3 className="text-3xl font-bold">{day.name}</h3>
                      <div className="text-xl text-white/90">{day.tamilName}</div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5 mb-4">
                      <div className="text-lg font-semibold mb-3">{formatDate(day.date)}</div>
                      <p className="text-white/90">{day.description}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <h4 className="font-semibold mb-2 text-sm">Rituals & Observances:</h4>
                      <ul className="space-y-1">
                        {day.rituals.map((ritual, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-white/70">•</span>
                            <span>{ritual}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Regional Celebrations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Regional Celebrations Across India</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {regionalCelebrations.map((region, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-gray-800">{region.name}</h4>
                    <span className="text-sm bg-yellow-500 text-white px-3 py-1 rounded-full font-semibold">
                      {region.state}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">{region.celebration}</p>
                  <div className="bg-orange-100 rounded-lg p-3">
                    <div className="text-xs font-semibold text-orange-900 mb-1">Special Foods:</div>
                    <div className="text-sm text-orange-800">{region.specialFood}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pongal Rituals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Pongal Rituals & Traditions</h3>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
              {sankrantiRituals.map((ritual, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-3">{ritual.icon}</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{ritual.title}</h4>
                  <p className="text-gray-700 text-sm mb-2 leading-relaxed">{ritual.description}</p>
                  <div className="text-xs bg-yellow-200 text-yellow-900 px-2 py-1 rounded inline-block">
                    {ritual.timing}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Traditional Foods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Traditional Pongal Foods</h3>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
              {sankrantiFood.map((food, index) => (
                <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border-2 border-orange-200">
                  <h4 className="font-bold text-gray-800 mb-2">{food.name}</h4>
                  <p className="text-sm text-gray-700 mb-2">{food.description}</p>
                  <span className="text-xs bg-orange-200 text-orange-900 px-2 py-1 rounded">{food.region}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {makarSankrantiFAQs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-100 hover:border-yellow-300 transition-colors group"
                >
                  <summary className="font-semibold text-gray-800 cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-yellow-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed pl-4 border-l-4 border-yellow-300">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </motion.div>

          {/* Internal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9 }}
            className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explore More Festival Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/festival-tools/diwali-date-finder" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-yellow-200">
                <h4 className="font-bold text-yellow-600 mb-2">Diwali 2025</h4>
                <p className="text-sm text-gray-600">5-day Diwali schedule</p>
              </a>
              <a href="/festival-tools/buddha-purnima-converter" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-yellow-200">
                <h4 className="font-bold text-yellow-600 mb-2">Buddha Purnima</h4>
                <p className="text-sm text-gray-600">Vaisakha Purnima dates</p>
              </a>
              <a href="/festival-tools/eid-date-converter" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-yellow-200">
                <h4 className="font-bold text-yellow-600 mb-2">Eid Date Converter</h4>
                <p className="text-sm text-gray-600">Hijri to Gregorian calendar</p>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🌾 Share Pongal Calendar</h3>
              <p className="text-gray-600 mb-6">Share the festive joy with your loved ones!</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => shareOnSocial('facebook')}
                  className="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                >
                  Facebook
                </button>
                <button
                  onClick={() => shareOnSocial('twitter')}
                  className="bg-sky-500 text-white px-4 py-3 rounded-xl hover:bg-sky-600 transition-colors font-semibold"
                >
                  Twitter
                </button>
                <button
                  onClick={() => shareOnSocial('whatsapp')}
                  className="bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => shareOnSocial('telegram')}
                  className="bg-blue-500 text-white px-4 py-3 rounded-xl hover:bg-blue-600 transition-colors font-semibold"
                >
                  Telegram
                </button>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="mt-4 w-full bg-gray-200 text-gray-800 px-4 py-3 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": `Pongal ${selectedYear}`,
            "startDate": pongalDays[0].date.toISOString().split('T')[0],
            "endDate": pongalDays[3].date.toISOString().split('T')[0],
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": {
              "@type": "Place",
              "name": selectedCity,
              "address": `${selectedCity}, India`
            },
            "description": "4-day Tamil harvest festival celebrating the sun god and new harvest",
            "image": "https://moneycal.in/images/pongal-calendar.jpg"
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": makarSankrantiFAQs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </div>
    </>
  );
};

export default PongalCalendar;

