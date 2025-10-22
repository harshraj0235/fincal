import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, Share2, Clock, Gift, Sparkles, Heart, Star } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const ChristmasCountdown: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPast, setIsPast] = useState(false);

  const christmasDate = useMemo(() => {
    return new Date(selectedYear, 11, 25, 0, 0, 0); // December 25
  }, [selectedYear]);

  // Update countdown every second
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = christmasDate.getTime() - now.getTime();

      if (diff <= 0) {
        setIsPast(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsPast(false);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [christmasDate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const downloadCalendar = () => {
    const event = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MoneyCal//Christmas Countdown//EN',
      'BEGIN:VEVENT',
      `DTSTART:${selectedYear}1225`,
      `DTEND:${selectedYear}1226`,
      `SUMMARY:Christmas Day ${selectedYear}`,
      `DESCRIPTION:Merry Christmas! Celebrate the birth of Jesus Christ with family and loved ones.`,
      'LOCATION:Worldwide',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([event], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `christmas-${selectedYear}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareOnSocial = (platform: string) => {
    const text = `🎄 Christmas ${selectedYear} is in ${timeLeft.days} days! Join me in counting down to the most wonderful time of the year! 🎅✨`;
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

  const christmasTraditions = [
    {
      title: 'Christmas Tree',
      description: 'Decorate an evergreen tree with lights, ornaments, and a star on top symbolizing the Star of Bethlehem.',
      icon: '🎄'
    },
    {
      title: 'Gift Exchange',
      description: 'Exchange gifts with family and friends, commemorating the gifts brought by the Three Wise Men to baby Jesus.',
      icon: '🎁'
    },
    {
      title: 'Christmas Carols',
      description: 'Sing traditional songs like "Silent Night" and "Jingle Bells" spreading joy and festive spirit.',
      icon: '🎵'
    },
    {
      title: 'Midnight Mass',
      description: 'Attend church services on Christmas Eve to celebrate the birth of Jesus Christ with prayers and hymns.',
      icon: '⛪'
    },
    {
      title: 'Christmas Dinner',
      description: 'Enjoy a festive meal with turkey, ham, plum cake, cookies, and traditional dishes with loved ones.',
      icon: '🍽️'
    },
    {
      title: 'Santa Claus',
      description: 'Children eagerly await Santa\'s visit, leaving cookies and milk, hoping to find presents under the tree.',
      icon: '🎅'
    }
  ];

  const christmasFAQs = [
    {
      question: 'When is Christmas 2025?',
      answer: 'Christmas is always celebrated on December 25th. Christmas 2025 falls on Thursday, December 25, 2025.'
    },
    {
      question: 'Why is Christmas celebrated on December 25?',
      answer: 'December 25 was chosen by early Christians in the 4th century to celebrate the birth of Jesus Christ, though the exact date is not known historically.'
    },
    {
      question: 'Is Christmas a public holiday in India?',
      answer: 'Yes, Christmas is a gazetted public holiday in India. Government offices, schools, and many businesses remain closed on December 25.'
    },
    {
      question: 'How many days until Christmas?',
      answer: 'Use our Christmas Countdown tool to see exactly how many days, hours, minutes, and seconds remain until Christmas Day!'
    },
    {
      question: 'What is the meaning of Christmas?',
      answer: 'Christmas celebrates the birth of Jesus Christ, the central figure of Christianity. It\'s a time of joy, giving, family gatherings, and spreading love and kindness.'
    },
    {
      question: 'How do people celebrate Christmas?',
      answer: 'Christmas is celebrated with church services, decorating Christmas trees, exchanging gifts, singing carols, festive meals, and spending time with family and friends.'
    }
  ];

  return (
    <>
      <SEOHelmet
        title={`Christmas ${selectedYear} Countdown Timer - Days Until Christmas | MoneyCal`}
        description={`Christmas ${selectedYear} countdown! ${timeLeft.days} days until December 25. Live timer showing days, hours, minutes & seconds until Christmas Day. Download calendar, share with friends & celebrate!`}
        keywords="Christmas 2025 countdown, days until Christmas, Christmas timer, Christmas countdown clock, when is Christmas, Christmas date, December 25, Christmas celebration, Xmas countdown"
        ogImage="https://moneycal.in/images/christmas-countdown.jpg"
      />

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-green-50 to-red-50">
        {/* Animated Snowflakes Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white text-2xl"
              initial={{ y: -20, x: Math.random() * window.innerWidth }}
              animate={{
                y: window.innerHeight + 20,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              ❄️
            </motion.div>
          ))}
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 via-green-600 to-red-600 text-white py-16 px-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 text-9xl">🎄</div>
            <div className="absolute bottom-10 right-10 text-9xl">🎅</div>
            <div className="absolute top-1/2 left-1/4 text-6xl">⭐</div>
            <div className="absolute top-1/3 right-1/3 text-7xl">🎁</div>
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

            <h1 className="text-5xl md:text-7xl font-bold text-center mb-4">
              🎄 Christmas {selectedYear} 🎄
            </h1>
            <h2 className="text-2xl md:text-3xl text-center mb-6 text-green-100">
              Countdown Timer
            </h2>
            <p className="text-xl text-center max-w-3xl mx-auto text-white/90">
              The most wonderful time of the year is coming! Join millions counting down to Christmas Day with our live timer.
            </p>
          </div>
        </motion.div>

        {/* Main Countdown */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-20 -mt-16"
          >
            {isPast ? (
              <div className="bg-gradient-to-br from-green-500 to-red-600 rounded-3xl shadow-2xl p-12 text-white text-center border-4 border-white">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <h3 className="text-5xl font-bold mb-4">🎅 Merry Christmas! 🎄</h3>
                  <p className="text-2xl mb-6">Christmas {selectedYear} has arrived!</p>
                  <p className="text-xl">Wishing you joy, peace, and love on this special day!</p>
                </motion.div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-red-200">
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    Countdown to Christmas {selectedYear}
                  </h3>
                  <p className="text-lg text-gray-600">{formatDate(christmasDate)}</p>
                </div>

                {/* Countdown Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { value: timeLeft.days, label: 'Days', color: 'from-red-500 to-red-600' },
                    { value: timeLeft.hours, label: 'Hours', color: 'from-green-500 to-green-600' },
                    { value: timeLeft.minutes, label: 'Minutes', color: 'from-red-500 to-pink-600' },
                    { value: timeLeft.seconds, label: 'Seconds', color: 'from-green-500 to-teal-600' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 text-white shadow-lg`}
                    >
                      <div className="text-5xl md:text-6xl font-bold mb-2">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xl font-semibold">{item.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-red-500 via-green-500 to-red-500 h-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((365 - timeLeft.days) / 365) * 100}%`
                      }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <p className="text-center text-gray-600 mt-2 text-sm">
                    {Math.round(((365 - timeLeft.days) / 365) * 100)}% of the year complete
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={downloadCalendar}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                  >
                    <Download className="w-5 h-5" />
                    Add to Calendar
                  </button>
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Year Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6 mt-8"
          >
            <label className="block text-center text-lg font-semibold text-gray-700 mb-3">
              Select Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full max-w-md mx-auto block px-4 py-3 border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-red-50 text-gray-800 font-semibold text-center"
            >
              {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(year => (
                <option key={year} value={year}>
                  Christmas {year}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Christmas Traditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-6 mt-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
              <Gift className="w-7 h-7 text-red-500" />
              Christmas Traditions & Celebrations
            </h3>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
              {christmasTraditions.map((tradition, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-gradient-to-br from-red-50 to-green-50 rounded-xl p-6 border-2 border-red-200 hover:shadow-lg transition-shadow"
                >
                  <div className="text-5xl mb-3">{tradition.icon}</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{tradition.title}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{tradition.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-2xl shadow-xl p-6 mt-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {christmasFAQs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-red-50 rounded-xl p-4 border-2 border-red-100 hover:border-red-300 transition-colors group"
                >
                  <summary className="font-semibold text-gray-800 cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-red-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed pl-4 border-l-4 border-red-300">
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
            transition={{ delay: 1.0 }}
            className="bg-gradient-to-br from-red-100 to-green-100 rounded-2xl shadow-xl p-6 mt-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explore More Festival Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/festival-tools/diwali-date-finder" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-red-200">
                <h4 className="font-bold text-red-600 mb-2">Diwali 2025</h4>
                <p className="text-sm text-gray-600">Complete 5-day Diwali schedule</p>
              </a>
              <a href="/festival-tools/eid-date-converter" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-red-200">
                <h4 className="font-bold text-red-600 mb-2">Eid Date Converter</h4>
                <p className="text-sm text-gray-600">Hijri to Gregorian calendar</p>
              </a>
              <a href="/festival-tools/ramadan-timetable" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-red-200">
                <h4 className="font-bold text-red-600 mb-2">Ramadan Timetable</h4>
                <p className="text-sm text-gray-600">Sehri & Iftar times</p>
              </a>
            </div>
          </motion.div>

          {/* External Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-white rounded-2xl shadow-xl p-6 mt-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Learn More About Christmas</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://en.wikipedia.org/wiki/Christmas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-50 rounded-xl p-4 hover:bg-green-100 transition-colors border-2 border-green-200"
              >
                <Star className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-green-600">Wikipedia - Christmas</h4>
                  <p className="text-sm text-gray-600">History & traditions</p>
                </div>
              </a>
              <a 
                href="https://www.britannica.com/topic/Christmas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-red-50 rounded-xl p-4 hover:bg-red-100 transition-colors border-2 border-red-200"
              >
                <Heart className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-red-600">Britannica - Christmas</h4>
                  <p className="text-sm text-gray-600">Complete guide</p>
                </div>
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
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🎄 Share Christmas Countdown</h3>
              <p className="text-gray-600 mb-6">Spread the festive joy with your friends!</p>
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
            "name": `Christmas ${selectedYear}`,
            "startDate": `${selectedYear}-12-25`,
            "endDate": `${selectedYear}-12-25`,
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": {
              "@type": "Place",
              "name": "Worldwide",
              "address": "Worldwide"
            },
            "description": "Christmas Day celebrates the birth of Jesus Christ. A time of joy, giving, and family gatherings.",
            "image": "https://moneycal.in/images/christmas-countdown.jpg"
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": christmasFAQs.map(faq => ({
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

export default ChristmasCountdown;




