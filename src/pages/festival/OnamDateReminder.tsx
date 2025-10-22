import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Download, Share2, Clock, Flower2, Utensils, Crown } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { onamDates, onamDayNames, keralaCities, onamTraditions, onamDishes, onamFAQs } from '../../data/onamDateData';

const OnamDateReminder: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCity, setSelectedCity] = useState('Kochi');
  const [showShareModal, setShowShareModal] = useState(false);

  const onamData = useMemo(() => {
    return onamDates.find(d => d.year === selectedYear) || onamDates[0];
  }, [selectedYear]);

  const cityData = useMemo(() => {
    return keralaCities.find(c => c.city === selectedCity) || keralaCities[0];
  }, [selectedCity]);

  const daysUntilOnam = useMemo(() => {
    const today = new Date();
    const thiruvonamDate = new Date(onamData.thiruvonamDate);
    const diffTime = thiruvonamDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [onamData]);

  // Calculate 10-day dates
  const onamCalendar = useMemo(() => {
    const atham = new Date(onamData.athamDate);
    return onamDayNames.map((day, index) => {
      const date = new Date(atham);
      date.setDate(atham.getDate() + index);
      return {
        ...day,
        date,
        dateString: date.toISOString().split('T')[0]
      };
    });
  }, [onamData]);

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const downloadCalendar = () => {
    const events = onamCalendar.map(day => [
      'BEGIN:VEVENT',
      `DTSTART:${day.dateString.replace(/-/g, '')}`,
      `DTEND:${day.dateString.replace(/-/g, '')}`,
      `SUMMARY:Onam Day ${day.day}: ${day.name} - ${selectedCity}`,
      `DESCRIPTION:${day.activity}. Nakshatra: ${day.nakshatra}. Pookalam: ${day.pookalamTheme}`,
      `LOCATION:${selectedCity}, Kerala`,
      'END:VEVENT'
    ].join('\n')).join('\n');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MoneyCal//Onam Calendar//EN',
      events,
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `onam-${selectedYear}-${selectedCity.toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareOnSocial = (platform: string) => {
    const text = `🌺 Onam ${selectedYear} in ${selectedCity}! Thiruvonam on ${formatDate(onamData.thiruvonamDate)}. Get complete 10-day calendar on MoneyCal! ഓണാശംസകൾ! 🎉`;
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
        title={`Onam ${selectedYear} Date - Thiruvonam ${selectedCity} | 10-Day Calendar | MoneyCal`}
        description={`Onam ${selectedYear} in ${selectedCity}: Thiruvonam on ${formatDate(onamData.thiruvonamDate)}. Complete 10-day calendar from Atham to Thiruvonam with Pookalam themes, Onasadya menu, nakshatra timings, sunrise times. Download calendar & celebrate Kerala's harvest festival!`}
        keywords="Onam 2025 date, Thiruvonam 2025, Onam calendar Kerala, Atham date, Pookalam designs, Onasadya menu, Malayalam Chingam month, Onam 10 days, Onam Kochi, Onam traditions"
        ogImage="https://moneycal.in/images/onam-date-reminder.jpg"
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-16 px-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-9xl">🌺</div>
            <div className="absolute bottom-10 right-10 text-9xl">👑</div>
            <div className="absolute top-1/2 left-1/4 text-6xl">🌼</div>
            <div className="absolute top-1/3 right-1/3 text-7xl">🚣</div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="flex justify-center mb-6"
            >
              <Flower2 className="w-16 h-16" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
              🌺 Onam {selectedYear} 🌺
            </h1>
            <h2 className="text-2xl md:text-3xl text-center mb-2 text-emerald-100">
              10-Day Festival Calendar
            </h2>
            <h3 className="text-xl text-center mb-6 text-green-100">
              ഓണാശംസകൾ! (Onam Ashamsakal!)
            </h3>
            <p className="text-xl text-center max-w-3xl mx-auto text-white/90">
              Complete 10-day Onam calendar for {selectedCity}: Atham to Thiruvonam with Pookalam themes, nakshatra timings, Onasadya menu & cultural celebrations.
            </p>
          </div>
        </motion.div>

        {/* Countdown Section */}
        {daysUntilOnam > 0 && daysUntilOnam < 365 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-6xl mx-auto px-4 -mt-8 relative z-20"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-green-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Countdown to Thiruvonam {selectedYear}</h3>
                <div className="flex justify-center items-center gap-4">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl p-6 min-w-[120px]">
                    <div className="text-5xl font-bold">{daysUntilOnam}</div>
                    <div className="text-lg mt-2">Days</div>
                  </div>
                  <Crown className="w-12 h-12 text-green-500" />
                </div>
                <p className="mt-4 text-gray-600 text-lg">
                  {formatDate(onamData.thiruvonamDate)}
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
                  <Calendar className="w-5 h-5 text-green-500" />
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-green-50 text-gray-800 font-semibold"
                >
                  {onamDates.map(d => (
                    <option key={d.year} value={d.year}>
                      {d.year} ({d.malayalamYear} ME)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-500" />
                  Select City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-green-50 text-gray-800 font-semibold"
                >
                  {keralaCities.map(city => (
                    <option key={city.city} value={city.city}>
                      {city.city}, {city.state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={downloadCalendar}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <Download className="w-5 h-5" />
                Download 10-Day Calendar
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </motion.div>

          {/* 10-Day Onam Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
              <Flower2 className="w-7 h-7 text-green-500" />
              10 Days of Onam {selectedYear}
            </h3>
            <div className="space-y-4">
              {onamCalendar.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className={`rounded-xl p-5 border-2 ${
                    day.day === 10
                      ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300 shadow-lg'
                      : day.day === 1
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                      : 'bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="text-4xl mb-2">{day.icon}</div>
                      <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        {day.day}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">{day.name}</h4>
                          <div className="text-lg text-green-700">{day.malayalamName}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Nakshatra:</div>
                          <div className="font-semibold text-green-600">{day.nakshatra}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {formatDate(day.date)}
                      </div>
                      <p className="text-gray-700 mb-2">{day.activity}</p>
                      <div className="bg-green-100 rounded-lg px-3 py-2 text-sm">
                        <strong>Pookalam Theme:</strong> {day.pookalamTheme}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Onam Traditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Onam Traditions & Celebrations</h3>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
              {onamTraditions.map((tradition, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-3">{tradition.icon}</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{tradition.title}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{tradition.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Onasadya Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
              <Utensils className="w-7 h-7 text-green-500" />
              Onasadya Special Dishes
            </h3>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
              {onamDishes.map((dish, index) => (
                <div key={index} className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-4 border-2 border-teal-200">
                  <h4 className="font-bold text-gray-800 mb-1">{dish.name}</h4>
                  <p className="text-sm text-gray-700 mb-2">{dish.description}</p>
                  <span className="text-xs bg-green-200 text-green-900 px-2 py-1 rounded">{dish.category}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-gray-800">
                <strong>Complete Onasadya:</strong> Rice, Parippu, Sambar, Rasam, Avial, Thoran, Olan, Kaalan, Erissery, Pulissery, Pachadi, Kichadi, Koottucurry, Moru, Pickle, Chips, Pappadam, Banana, 3 types of Payasam, Ada Pradhaman
              </p>
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {onamFAQs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-green-50 rounded-xl p-4 border-2 border-green-100 hover:border-green-300 transition-colors group"
                >
                  <summary className="font-semibold text-gray-800 cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-green-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed pl-4 border-l-4 border-green-300">
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
            transition={{ delay: 1.8 }}
            className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explore More Festival Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/festival-tools/pongal-calendar" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-green-200">
                <h4 className="font-bold text-green-600 mb-2">Pongal Calendar</h4>
                <p className="text-sm text-gray-600">4-day Tamil harvest festival</p>
              </a>
              <a href="/festival-tools/diwali-date-finder" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-green-200">
                <h4 className="font-bold text-green-600 mb-2">Diwali 2025</h4>
                <p className="text-sm text-gray-600">5-day festival of lights</p>
              </a>
              <a href="/festival-tools/buddha-purnima-converter" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-green-200">
                <h4 className="font-bold text-green-600 mb-2">Buddha Purnima</h4>
                <p className="text-sm text-gray-600">Vaisakha Purnima dates</p>
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
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🌺 Share Onam Calendar</h3>
              <p className="text-gray-600 mb-6">Share the festive joy!</p>
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
            "name": `Onam ${selectedYear}`,
            "startDate": onamData.athamDate,
            "endDate": onamData.thiruvonamDate,
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": { "@type": "Place", "name": "Kerala, India", "address": "Kerala, India" },
            "description": "10-day Malayalam harvest festival celebrating King Mahabali's annual visit",
            "image": "https://moneycal.in/images/onam-date-reminder.jpg"
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": onamFAQs.map(faq => ({
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

export default OnamDateReminder;




