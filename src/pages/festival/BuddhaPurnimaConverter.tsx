import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Download, Share2, Clock, Sun, Moon, Star, Sparkles, Globe } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { buddhaPurnimaDates, indianCities, buddhaPurnimaFAQs, buddhaTeachings } from '../../data/buddhaPurnimaData';

const BuddhaPurnimaConverter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [showShareModal, setShowShareModal] = useState(false);

  const buddhaPurnimaData = useMemo(() => {
    return buddhaPurnimaDates.find(data => data.year === selectedYear) || buddhaPurnimaDates[0];
  }, [selectedYear]);

  const cityData = useMemo(() => {
    return indianCities.find(city => city.city === selectedCity) || indianCities[0];
  }, [selectedCity]);

  const daysUntilBuddhaPurnima = useMemo(() => {
    const today = new Date();
    const buddhaPurnima = new Date(buddhaPurnimaData.gregorianDate);
    const diffTime = buddhaPurnima.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [buddhaPurnimaData]);

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
    const event = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${buddhaPurnimaData.gregorianDate.replace(/-/g, '')}`,
      `DTEND:${buddhaPurnimaData.gregorianDate.replace(/-/g, '')}`,
      `SUMMARY:Buddha Purnima ${selectedYear} - ${selectedCity}`,
      `DESCRIPTION:Buddha Purnima (Vesak) - Birth, Enlightenment & Mahaparinirvana of Gautama Buddha. Purnima Tithi: ${buddhaPurnimaData.purnimaTithiStart} to ${buddhaPurnimaData.purnimaTithiEnd}`,
      `LOCATION:${selectedCity}, India`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([event], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `buddha-purnima-${selectedYear}-${selectedCity.toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareOnSocial = (platform: string) => {
    const text = `Buddha Purnima ${selectedYear} is on ${formatDate(buddhaPurnimaData.gregorianDate)} in ${selectedCity}! 🙏✨ Find exact timings and calendar conversion on MoneyCal`;
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
        title={`Buddha Purnima ${selectedYear} Date Converter - ${selectedCity} Timings | MoneyCal`}
        description={`Buddha Purnima ${selectedYear} falls on ${formatDate(buddhaPurnimaData.gregorianDate)}. Get exact Vaisakha Purnima timings for ${selectedCity}, convert across Hindu, Bengali, Tamil calendars. Download calendar & plan celebrations.`}
        keywords="Buddha Purnima 2025, Vesak date, Vaisakha Purnima, Buddha Jayanti, Buddhist festival dates, Buddha Purnima calendar converter, Hindu lunar calendar, Buddha Purnima timings India"
        ogImage="https://moneycal.in/images/buddha-purnima-converter.jpg"
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white py-16 px-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-9xl">☸</div>
            <div className="absolute bottom-10 right-10 text-9xl">🪷</div>
            <div className="absolute top-1/2 left-1/4 text-6xl">✨</div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <Sparkles className="w-16 h-16" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
              Buddha Purnima {selectedYear}
            </h1>
            <h2 className="text-2xl md:text-3xl text-center mb-6 text-yellow-100">
              Date & Time Converter
            </h2>
            <p className="text-xl text-center max-w-3xl mx-auto text-white/90">
              Find exact Buddha Purnima (Vesak) date & time in {selectedCity}. Convert across Gregorian, Hindu lunar, and regional Indian calendars.
            </p>
          </div>
        </motion.div>

        {/* Countdown Section */}
        {daysUntilBuddhaPurnima > 0 && daysUntilBuddhaPurnima < 365 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-6xl mx-auto px-4 -mt-8 relative z-20"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-orange-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Countdown to Buddha Purnima {selectedYear}</h3>
                <div className="flex justify-center items-center gap-4">
                  <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-xl p-6 min-w-[120px]">
                    <div className="text-5xl font-bold">{daysUntilBuddhaPurnima}</div>
                    <div className="text-lg mt-2">Days</div>
                  </div>
                  <Clock className="w-12 h-12 text-orange-500" />
                </div>
                <p className="mt-4 text-gray-600 text-lg">
                  {daysUntilBuddhaPurnima === 0 ? 'Today!' : daysUntilBuddhaPurnima === 1 ? 'Tomorrow!' : `${daysUntilBuddhaPurnima} days until Buddha Purnima`}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Selection Controls */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Year Selection */}
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
                  {buddhaPurnimaDates.map(data => (
                    <option key={data.year} value={data.year}>
                      {data.year} - {new Date(data.gregorianDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Selection */}
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
                  {indianCities.map(city => (
                    <option key={city.city} value={city.city}>
                      {city.city}, {city.state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <button
                onClick={downloadCalendar}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Download Calendar (.ics)
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </motion.div>

          {/* Main Date Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-2xl p-8 mb-8 text-white"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">Buddha Purnima {selectedYear}</h3>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-4">
                <div className="text-5xl font-bold mb-2">{formatDate(buddhaPurnimaData.gregorianDate)}</div>
                <div className="text-xl text-yellow-100">{buddhaPurnimaData.hinduMonth}</div>
              </div>
              <p className="text-lg text-yellow-100">{buddhaPurnimaData.significance}</p>
            </div>
          </motion.div>

          {/* Calendar Conversion Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Globe className="w-7 h-7 text-orange-500" />
              Buddha Purnima {selectedYear} - Calendar Conversion
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-orange-100">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Calendar Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Date / Month</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-orange-50 transition-colors">
                    <td className="px-4 py-4 font-semibold text-gray-800">Gregorian Calendar</td>
                    <td className="px-4 py-4 text-orange-600 font-bold text-lg">{formatDate(buddhaPurnimaData.gregorianDate)}</td>
                  </tr>
                  <tr className="hover:bg-orange-50 transition-colors">
                    <td className="px-4 py-4 font-semibold text-gray-800">Hindu Lunar Calendar</td>
                    <td className="px-4 py-4 text-gray-700">{buddhaPurnimaData.hinduMonth}</td>
                  </tr>
                  <tr className="hover:bg-orange-50 transition-colors">
                    <td className="px-4 py-4 font-semibold text-gray-800">Bengali Calendar</td>
                    <td className="px-4 py-4 text-gray-700">{buddhaPurnimaData.bengaliDate}</td>
                  </tr>
                  <tr className="hover:bg-orange-50 transition-colors">
                    <td className="px-4 py-4 font-semibold text-gray-800">Tamil Calendar</td>
                    <td className="px-4 py-4 text-gray-700">{buddhaPurnimaData.tamilDate}</td>
                  </tr>
                  <tr className="hover:bg-orange-50 transition-colors">
                    <td className="px-4 py-4 font-semibold text-gray-800">Malayalam Calendar</td>
                    <td className="px-4 py-4 text-gray-700">{buddhaPurnimaData.malayalamDate}</td>
                  </tr>
                  <tr className="hover:bg-orange-50 transition-colors">
                    <td className="px-4 py-4 font-semibold text-gray-800">Marathi Calendar</td>
                    <td className="px-4 py-4 text-gray-700">{buddhaPurnimaData.marathiDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Local Timings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Clock className="w-7 h-7 text-orange-500" />
              Exact Timings in {selectedCity}, {cityData.state}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-200">
                <div className="flex items-center gap-3 mb-4">
                  <Sun className="w-8 h-8 text-yellow-500" />
                  <h4 className="text-xl font-bold text-gray-800">Sun Timings</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Sunrise:</span>
                    <span className="text-orange-600 font-bold text-lg">{cityData.sunrise}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Sunset:</span>
                    <span className="text-orange-600 font-bold text-lg">{cityData.sunset}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Moon className="w-8 h-8 text-blue-500" />
                  <h4 className="text-xl font-bold text-gray-800">Moon Timings</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Moonrise:</span>
                    <span className="text-blue-600 font-bold text-lg">{cityData.moonrise}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Moonset:</span>
                    <span className="text-blue-600 font-bold text-lg">{cityData.moonset}</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-8 h-8 text-orange-500" />
                  <h4 className="text-xl font-bold text-gray-800">Purnima Tithi Timings</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Tithi Begins:</span>
                    <span className="text-orange-600 font-bold text-lg">{buddhaPurnimaData.purnimaTithiStart}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Tithi Ends:</span>
                    <span className="text-orange-600 font-bold text-lg">{buddhaPurnimaData.purnimaTithiEnd}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Buddha's Teachings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Core Teachings of Buddha</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {buddhaTeachings.map((teaching, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">☸</div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">{teaching.title}</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{teaching.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {buddhaPurnimaFAQs.map((faq, index) => (
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
            transition={{ delay: 1.1 }}
            className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explore More Festival Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/festival-tools/guru-purnima-calendar" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-orange-200">
                <h4 className="font-bold text-orange-600 mb-2">Guru Purnima 2025</h4>
                <p className="text-sm text-gray-600">Honor your teachers on Vyasa Purnima</p>
              </a>
              <a href="/festival-tools/akshaya-tritiya-muhurat" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-orange-200">
                <h4 className="font-bold text-orange-600 mb-2">Akshaya Tritiya 2025</h4>
                <p className="text-sm text-gray-600">Best time to buy gold & invest</p>
              </a>
              <a href="/religious-tools/puja-vidhi-generator" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-orange-200">
                <h4 className="font-bold text-orange-600 mb-2">Puja Vidhi Generator</h4>
                <p className="text-sm text-gray-600">Step-by-step puja procedures</p>
              </a>
            </div>
          </motion.div>

          {/* External Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Learn More About Buddha Purnima</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://en.wikipedia.org/wiki/Vesak" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 hover:bg-blue-100 transition-colors border-2 border-blue-200"
              >
                <Globe className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-600">Wikipedia - Vesak</h4>
                  <p className="text-sm text-gray-600">Comprehensive guide to Buddha Purnima</p>
                </div>
              </a>
              <a 
                href="https://www.india.gov.in/calendar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-50 rounded-xl p-4 hover:bg-green-100 transition-colors border-2 border-green-200"
              >
                <Calendar className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-green-600">India.gov.in Calendar</h4>
                  <p className="text-sm text-gray-600">Official government holidays</p>
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
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Share Buddha Purnima {selectedYear}</h3>
              <p className="text-gray-600 mb-6">Share this on your favorite platform</p>
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
            "name": `Buddha Purnima ${selectedYear}`,
            "startDate": buddhaPurnimaData.gregorianDate,
            "endDate": buddhaPurnimaData.gregorianDate,
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": {
              "@type": "Place",
              "name": selectedCity,
              "address": `${selectedCity}, India`
            },
            "description": buddhaPurnimaData.significance,
            "image": "https://moneycal.in/images/buddha-purnima-converter.jpg"
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": buddhaPurnimaFAQs.map(faq => ({
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

export default BuddhaPurnimaConverter;




