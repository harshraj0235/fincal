import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Download, Share2, Clock, Sun, Sunrise, Star, Sparkles } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { 
  makarSankrantiDates, 
  cityMakarData, 
  regionalCelebrations, 
  sankrantiRituals, 
  makarSankrantiFAQs,
  sankrantiFood 
} from '../../data/makarSankrantiData';

const MakarSankrantiTithi: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [showShareModal, setShowShareModal] = useState(false);

  const sankrantiData = useMemo(() => {
    return makarSankrantiDates.find(d => d.year === selectedYear) || makarSankrantiDates[0];
  }, [selectedYear]);

  const cityData = useMemo(() => {
    return cityMakarData.find(c => c.city === selectedCity) || cityMakarData[0];
  }, [selectedCity]);

  const daysUntilSankranti = useMemo(() => {
    const today = new Date();
    const sankrantiDate = new Date(sankrantiData.gregorianDate);
    const diffTime = sankrantiDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [sankrantiData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const downloadCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MoneyCal//Makar Sankranti//EN',
      'BEGIN:VEVENT',
      `DTSTART:${sankrantiData.gregorianDate.replace(/-/g, '')}`,
      `DTEND:${sankrantiData.gregorianDate.replace(/-/g, '')}`,
      `SUMMARY:Makar Sankranti ${selectedYear} - ${selectedCity}`,
      `DESCRIPTION:Sun enters Capricorn (Makara). Sankranti Time: ${sankrantiData.sankrantiTime}. Punya Kaal: ${sankrantiData.punyaKaalStart} to ${sankrantiData.punyaKaalEnd}. ${sankrantiData.significance}`,
      `LOCATION:${selectedCity}, India`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `makar-sankranti-${selectedYear}-${selectedCity.toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareOnSocial = (platform: string) => {
    const text = `🌾 Makar Sankranti ${selectedYear} in ${selectedCity}! Sankranti Time: ${sankrantiData.sankrantiTime}, Punya Kaal: ${sankrantiData.punyaKaalStart}-${sankrantiData.punyaKaalEnd}. Get exact timings on MoneyCal! ☀️`;
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
        title={`Makar Sankranti ${selectedYear} Tithi Time - ${selectedCity} Punya Kaal | MoneyCal`}
        description={`Makar Sankranti ${selectedYear} exact tithi time for ${selectedCity}: ${sankrantiData.sankrantiTime}. Get Punya Kaal timing (${sankrantiData.punyaKaalStart} - ${sankrantiData.punyaKaalEnd}), sunrise, sunset, regional celebrations, til-gud rituals. Download calendar & celebrate harvest festival!`}
        keywords="Makar Sankranti 2025 time, Sankranti tithi, Punya Kaal time, Makar Sankranti Delhi, Uttarayan Gujarat, Pongal, Lohri date, Magh Bihu, til gud, kite flying, Makar Sankranti rituals"
        ogImage="https://moneycal.in/images/makar-sankranti-tithi.jpg"
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 text-white py-16 px-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-9xl">☀️</div>
            <div className="absolute bottom-10 right-10 text-9xl">🪁</div>
            <div className="absolute top-1/2 left-1/4 text-6xl">🌾</div>
            <div className="absolute top-1/3 right-1/3 text-7xl">✨</div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="flex justify-center mb-6"
            >
              <Sun className="w-16 h-16" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
              ☀️ Makar Sankranti {selectedYear} ☀️
            </h1>
            <h2 className="text-2xl md:text-3xl text-center mb-6 text-yellow-100">
              Exact Tithi Time & Punya Kaal
            </h2>
            <p className="text-xl text-center max-w-3xl mx-auto text-white/90">
              Get precise Makar Sankranti tithi time for {selectedCity} when Sun enters Capricorn (270°). Find Punya Kaal, sunrise, sunset & regional celebration details.
            </p>
          </div>
        </motion.div>

        {/* Countdown Section */}
        {daysUntilSankranti > 0 && daysUntilSankranti < 365 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-6xl mx-auto px-4 -mt-8 relative z-20"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-orange-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Countdown to Makar Sankranti {selectedYear}</h3>
                <div className="flex justify-center items-center gap-4">
                  <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-xl p-6 min-w-[120px]">
                    <div className="text-5xl font-bold">{daysUntilSankranti}</div>
                    <div className="text-lg mt-2">Days</div>
                  </div>
                  <Clock className="w-12 h-12 text-orange-500" />
                </div>
                <p className="mt-4 text-gray-600 text-lg">
                  {formatDate(sankrantiData.gregorianDate)}
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
                  <Calendar className="w-5 h-5 text-orange-500" />
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-50 text-gray-800 font-semibold"
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
                  <MapPin className="w-5 h-5 text-orange-500" />
                  Select City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-50 text-gray-800 font-semibold"
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
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <Download className="w-5 h-5" />
                Download Calendar
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </motion.div>

          {/* Main Sankranti Timing Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl shadow-2xl p-8 mb-8 text-white"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-6">Makar Sankranti {selectedYear} - {selectedCity}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <Sun className="w-10 h-10 mx-auto mb-3" />
                  <div className="text-sm text-yellow-100 mb-2">Sankranti Time</div>
                  <div className="text-3xl font-bold">{sankrantiData.sankrantiTime}</div>
                  <div className="text-xs mt-2">Sun enters Makara (270°)</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <Star className="w-10 h-10 mx-auto mb-3" />
                  <div className="text-sm text-yellow-100 mb-2">Punya Kaal</div>
                  <div className="text-2xl font-bold">{sankrantiData.punyaKaalStart}</div>
                  <div className="text-lg">to</div>
                  <div className="text-2xl font-bold">{sankrantiData.punyaKaalEnd}</div>
                  <div className="text-xs mt-2">Most auspicious period</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <Sunrise className="w-10 h-10 mx-auto mb-3" />
                  <div className="text-sm text-yellow-100 mb-2">Sunrise & Sunset</div>
                  <div className="text-lg font-bold">↑ {sankrantiData.sunrise}</div>
                  <div className="text-lg font-bold">↓ {sankrantiData.sunset}</div>
                  <div className="text-xs mt-2">Ritual timing reference</div>
                </div>
              </div>
              <div className="mt-6 bg-yellow-500/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm">{sankrantiData.significance}</p>
                <p className="text-xs mt-2 text-yellow-100">✨ {sankrantiData.ritualTiming}</p>
              </div>
            </div>
          </motion.div>

          {/* Regional Celebrations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Regional Names & Celebrations Across India</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {regionalCelebrations.map((region, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-gray-800">{region.name}</h4>
                    <span className="text-sm bg-orange-500 text-white px-3 py-1 rounded-full font-semibold">
                      {region.state}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">{region.celebration}</p>
                  <div className="bg-yellow-100 rounded-lg p-3">
                    <div className="text-xs font-semibold text-yellow-900 mb-1">Special Foods:</div>
                    <div className="text-sm text-yellow-800">{region.specialFood}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sankranti Rituals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Makar Sankranti Rituals</h3>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
              {sankrantiRituals.map((ritual, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-3">{ritual.icon}</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{ritual.title}</h4>
                  <p className="text-gray-700 text-sm mb-2 leading-relaxed">{ritual.description}</p>
                  <div className="text-xs bg-orange-200 text-orange-900 px-2 py-1 rounded inline-block">
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
            transition={{ delay: 1.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Traditional Sankranti Foods</h3>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
              {sankrantiFood.map((food, index) => (
                <div key={index} className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border-2 border-yellow-200">
                  <h4 className="font-bold text-gray-800 mb-2">{food.name}</h4>
                  <p className="text-sm text-gray-700 mb-2">{food.description}</p>
                  <span className="text-xs bg-yellow-200 text-yellow-900 px-2 py-1 rounded">{food.region}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {makarSankrantiFAQs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-orange-50 rounded-xl p-4 border-2 border-orange-100 hover:border-orange-300 transition-colors group"
                >
                  <summary className="font-semibold text-gray-800 cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed pl-4 border-l-4 border-orange-300">
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
            transition={{ delay: 1.7 }}
            className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explore More Festival Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/festival-tools/pongal-calendar" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-orange-200">
                <h4 className="font-bold text-orange-600 mb-2">Pongal Calendar (Tamil)</h4>
                <p className="text-sm text-gray-600">4-day Thai Pongal celebration</p>
              </a>
              <a href="/festival-tools/onam-date-reminder" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-orange-200">
                <h4 className="font-bold text-orange-600 mb-2">Onam Calendar (Kerala)</h4>
                <p className="text-sm text-gray-600">10-day Thiruvonam celebration</p>
              </a>
              <a href="/festival-tools/diwali-date-finder" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-orange-200">
                <h4 className="font-bold text-orange-600 mb-2">Diwali 2025</h4>
                <p className="text-sm text-gray-600">5-day festival of lights</p>
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
              <h3 className="text-2xl font-bold text-gray-800 mb-4">☀️ Share Makar Sankranti</h3>
              <p className="text-gray-600 mb-6">Share the auspicious timing!</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => shareOnSocial('facebook')} className="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold">Facebook</button>
                <button onClick={() => shareOnSocial('twitter')} className="bg-sky-500 text-white px-4 py-3 rounded-xl hover:bg-sky-600 transition-colors font-semibold">Twitter</button>
                <button onClick={() => shareOnSocial('whatsapp')} className="bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold">WhatsApp</button>
                <button onClick={() => shareOnSocial('telegram')} className="bg-blue-500 text-white px-4 py-3 rounded-xl hover:bg-blue-600 transition-colors font-semibold">Telegram</button>
              </div>
              <button onClick={() => setShowShareModal(false)} className="mt-4 w-full bg-gray-200 text-gray-800 px-4 py-3 rounded-xl hover:bg-gray-300 transition-colors font-semibold">Close</button>
            </motion.div>
          </div>
        )}

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": `Makar Sankranti ${selectedYear}`,
            "startDate": sankrantiData.gregorianDate,
            "endDate": sankrantiData.gregorianDate,
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": { "@type": "Place", "name": selectedCity, "address": `${selectedCity}, India` },
            "description": sankrantiData.significance,
            "image": "https://moneycal.in/images/makar-sankranti-tithi.jpg"
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": makarSankrantiFAQs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
            }))
          })}
        </script>
      </div>
    </>
  );
};

export default MakarSankrantiTithi;




