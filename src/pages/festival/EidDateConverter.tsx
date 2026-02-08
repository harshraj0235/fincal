import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Download, Share2, Clock, Sunrise, Moon, Star, Sparkles, Globe, Users } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { allEidDates, eidUlFitrDates, eidUlAdhaDates, indianCitiesEid, eidFAQs, hijriMonths, eidTraditions } from '../../data/eidDateData';

const EidDateConverter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedEidType, setSelectedEidType] = useState<'all' | 'Eid-ul-Fitr' | 'Eid-ul-Adha'>('all');
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [showShareModal, setShowShareModal] = useState(false);

  const filteredEidDates = useMemo(() => {
    let dates = allEidDates;
    if (selectedEidType !== 'all') {
      dates = dates.filter(d => d.eidType === selectedEidType);
    }
    return dates.filter(d => d.gregorianYear === selectedYear);
  }, [selectedEidType, selectedYear]);

  const nextEid = useMemo(() => {
    const today = new Date();
    return allEidDates.find(eid => new Date(eid.gregorianDate) > today);
  }, []);

  const cityData = useMemo(() => {
    return indianCitiesEid.find(city => city.city === selectedCity) || indianCitiesEid[0];
  }, [selectedCity]);

  const daysUntilNextEid = useMemo(() => {
    if (!nextEid) return null;
    const today = new Date();
    const eidDate = new Date(nextEid.gregorianDate);
    const diffTime = eidDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [nextEid]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const downloadCalendar = (eidData: typeof allEidDates[0]) => {
    const event = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${eidData.gregorianDate.replace(/-/g, '')}`,
      `DTEND:${eidData.gregorianDate.replace(/-/g, '')}`,
      `SUMMARY:${eidData.eidType} ${eidData.gregorianYear} - ${selectedCity}`,
      `DESCRIPTION:${eidData.significance}. Hijri Date: ${eidData.hijriDate}. ${eidData.moonSightingNote}`,
      `LOCATION:${selectedCity}, India`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([event], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${eidData.eidType.toLowerCase().replace(/ /g, '-')}-${eidData.gregorianYear}-${selectedCity.toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareOnSocial = (platform: string) => {
    const text = nextEid 
      ? `${nextEid.eidType} ${nextEid.gregorianYear} is on ${formatDate(nextEid.gregorianDate)} in ${selectedCity}! 🌙✨ Eid Mubarak! Find exact Hijri-Gregorian conversion on MoneyCal`
      : 'Check Eid dates and Hijri to Gregorian calendar conversion on MoneyCal';
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
        title={`Eid Date Converter ${selectedYear} - Hijri to Gregorian Calendar | ${selectedCity} | MoneyCal`}
        description={`Eid ${selectedYear} dates: Eid-ul-Fitr & Eid-ul-Adha with exact Hijri to Gregorian conversion. Get prayer timings for ${selectedCity}, moon sighting info, Ramadan dates, download calendar & celebrate Eid Mubarak!`}
        keywords="Eid 2025 date India, Eid ul Fitr 2025, Eid ul Adha 2025, Hijri to Gregorian converter, Islamic calendar converter, Eid date calculator, Ramadan 2025, Eid Mubarak, when is Eid, Eid prayer time"
        ogImage="https://moneycal.in/images/eid-date-converter.jpg"
      />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 text-white py-16 px-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-9xl">🌙</div>
            <div className="absolute bottom-10 right-10 text-9xl">☪</div>
            <div className="absolute top-1/2 left-1/4 text-6xl">✨</div>
            <div className="absolute top-1/3 right-1/3 text-7xl">⭐</div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <Moon className="w-16 h-16" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
              Eid Date Converter {selectedYear}
            </h1>
            <h2 className="text-2xl md:text-3xl text-center mb-6 text-green-100">
              Hijri to Gregorian Calendar
            </h2>
            <p className="text-xl text-center max-w-3xl mx-auto text-white/90">
              Find exact Eid-ul-Fitr & Eid-ul-Adha dates in {selectedCity}. Convert Hijri (Islamic) calendar to Gregorian with prayer timings, moon sighting info & Ramadan dates.
            </p>
          </div>
        </motion.div>

        {/* Countdown Section */}
        {nextEid && daysUntilNextEid && daysUntilNextEid > 0 && daysUntilNextEid < 365 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-6xl mx-auto px-4 -mt-8 relative z-20"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-emerald-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Countdown to {nextEid.eidType} {nextEid.gregorianYear}</h3>
                <p className="text-lg text-gray-600 mb-4">{formatDate(nextEid.gregorianDate)}</p>
                <div className="flex justify-center items-center gap-4">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-xl p-6 min-w-[120px]">
                    <div className="text-5xl font-bold">{daysUntilNextEid}</div>
                    <div className="text-lg mt-2">Days</div>
                  </div>
                  <Clock className="w-12 h-12 text-emerald-500" />
                </div>
                <p className="mt-4 text-emerald-600 text-lg font-semibold">
                  {nextEid.hijriDate}
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
            <div className="grid md:grid-cols-3 gap-6">
              {/* Eid Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Star className="w-5 h-5 text-emerald-500" />
                  Select Eid Type
                </label>
                <select
                  value={selectedEidType}
                  onChange={(e) => setSelectedEidType(e.target.value as typeof selectedEidType)}
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50 text-gray-800 font-semibold"
                >
                  <option value="all">All Eid Dates</option>
                  <option value="Eid-ul-Fitr">Eid-ul-Fitr</option>
                  <option value="Eid-ul-Adha">Eid-ul-Adha</option>
                </select>
              </div>

              {/* Year Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-500" />
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50 text-gray-800 font-semibold"
                >
                  {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* City Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                  Select City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50 text-gray-800 font-semibold"
                >
                  {indianCitiesEid.map(city => (
                    <option key={city.city} value={city.city}>
                      {city.city}, {city.state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Eid Dates Display */}
          {filteredEidDates.length > 0 ? (
            <div className="space-y-6">
              {filteredEidDates.map((eid, index) => (
                <motion.div
                  key={`${eid.eidType}-${eid.year}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`bg-gradient-to-br ${
                    eid.eidType === 'Eid-ul-Fitr' 
                      ? 'from-emerald-500 to-teal-600' 
                      : 'from-green-500 to-emerald-600'
                  } rounded-2xl shadow-2xl p-8 text-white`}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Moon className="w-10 h-10" />
                        <h3 className="text-3xl font-bold">{eid.eidType}</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                          <div className="text-sm text-green-100 mb-1">Gregorian Date</div>
                          <div className="text-2xl font-bold">{formatDate(eid.gregorianDate)}</div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                          <div className="text-sm text-green-100 mb-1">Hijri Date</div>
                          <div className="text-2xl font-bold">{eid.hijriDate}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <h4 className="font-semibold mb-2 text-green-100">Significance</h4>
                        <p className="text-sm leading-relaxed">{eid.significance}</p>
                      </div>
                      
                      {eid.ramadanStart && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                          <h4 className="font-semibold mb-1 text-green-100 text-sm">Ramadan Starts</h4>
                          <p className="text-lg">{formatDate(eid.ramadanStart)}</p>
                        </div>
                      )}
                      
                      {eid.dhuAlHijjahStart && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                          <h4 className="font-semibold mb-1 text-green-100 text-sm">Dhu al-Hijjah Starts</h4>
                          <p className="text-lg">{formatDate(eid.dhuAlHijjahStart)}</p>
                        </div>
                      )}

                      <div className="bg-yellow-400/20 backdrop-blur-sm rounded-xl p-3 border-2 border-yellow-300/50">
                        <p className="text-sm">⚠️ {eid.moonSightingNote}</p>
                      </div>

                      <button
                        onClick={() => downloadCalendar(eid)}
                        className="w-full flex items-center justify-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl hover:bg-green-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                      >
                        <Download className="w-5 h-5" />
                        Download Calendar
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <p className="text-gray-600 text-lg">No Eid dates found for {selectedYear} with selected filters.</p>
            </div>
          )}

          {/* City-Specific Prayer Timings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl shadow-xl p-6 mt-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Sunrise className="w-7 h-7 text-emerald-500" />
              Eid Prayer Timings in {selectedCity}, {cityData.state}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-8 h-8 text-emerald-500" />
                  <h4 className="text-xl font-bold text-gray-800">Eid Prayer</h4>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Recommended Time:</span>
                  <span className="text-emerald-600 font-bold text-2xl">{cityData.eidPrayerTime}</span>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Performed after sunrise, typically 15-20 minutes after sunrise
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200">
                <div className="flex items-center gap-3 mb-4">
                  <Sunrise className="w-8 h-8 text-orange-500" />
                  <h4 className="text-xl font-bold text-gray-800">Sunrise</h4>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Approximate Time:</span>
                  <span className="text-orange-600 font-bold text-2xl">{cityData.sunrise}</span>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Eid prayer is performed after sunrise
                </p>
              </div>
            </div>
          </motion.div>

          {/* Hijri Months Reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-6 mt-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Globe className="w-7 h-7 text-emerald-500" />
              Islamic Hijri Calendar - 12 Months
            </h3>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
              {hijriMonths.map((month) => (
                <div
                  key={month.number}
                  className={`rounded-xl p-4 border-2 transition-all ${
                    month.english === 'Ramadan' || month.english === 'Shawwal' || month.english === 'Dhu al-Hijjah'
                      ? 'bg-emerald-50 border-emerald-300 font-semibold'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">{month.number}</div>
                      <div className="text-lg text-gray-800">{month.english}</div>
                    </div>
                    {month.english === 'Ramadan' && <span className="text-2xl">🌙</span>}
                    {month.english === 'Shawwal' && <span className="text-2xl">✨</span>}
                    {month.english === 'Dhu al-Hijjah' && <span className="text-2xl">🕋</span>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Eid Traditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-2xl shadow-xl p-6 mt-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Users className="w-7 h-7 text-emerald-500" />
              Eid Traditions & Celebrations
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {eidTraditions.map((tradition, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border-2 border-emerald-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">🌙</div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">{tradition.title}</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{tradition.description}</p>
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
            transition={{ delay: 1.1 }}
            className="bg-white rounded-2xl shadow-xl p-6 mt-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {eidFAQs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-100 hover:border-emerald-300 transition-colors group"
                >
                  <summary className="font-semibold text-gray-800 cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-emerald-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed pl-4 border-l-4 border-emerald-300">
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
            transition={{ delay: 1.2 }}
            className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl shadow-xl p-6 mt-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explore More Festival Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/festival-tools/buddha-purnima-converter" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-emerald-200">
                <h4 className="font-bold text-emerald-600 mb-2">Buddha Purnima 2025</h4>
                <p className="text-sm text-gray-600">Vaisakha Purnima date converter</p>
              </a>
              <a href="/festival-tools/diwali-date-finder" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-emerald-200">
                <h4 className="font-bold text-emerald-600 mb-2">Diwali 2025 Dates</h4>
                <p className="text-sm text-gray-600">Complete 5-day Diwali schedule</p>
              </a>
              <a href="/religious-tools/puja-vidhi-generator" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-emerald-200">
                <h4 className="font-bold text-emerald-600 mb-2">Puja Vidhi Generator</h4>
                <p className="text-sm text-gray-600">Step-by-step puja procedures</p>
              </a>
            </div>
          </motion.div>

          {/* External Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 mt-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Learn More About Eid & Islamic Calendar</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://en.wikipedia.org/wiki/Eid_al-Fitr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 hover:bg-blue-100 transition-colors border-2 border-blue-200"
              >
                <Globe className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-600">Wikipedia - Eid-ul-Fitr</h4>
                  <p className="text-sm text-gray-600">Complete guide to Eid celebrations</p>
                </div>
              </a>
              <a 
                href="https://en.wikipedia.org/wiki/Islamic_calendar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-50 rounded-xl p-4 hover:bg-green-100 transition-colors border-2 border-green-200"
              >
                <Calendar className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-green-600">Hijri Calendar Info</h4>
                  <p className="text-sm text-gray-600">Understanding Islamic lunar calendar</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Share Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-lg font-semibold"
            >
              <Share2 className="w-6 h-6" />
              Share Eid Dates
            </button>
          </div>
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
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Share Eid Dates</h3>
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

        {/* JSON-LD Structured Data for Event */}
        {nextEid && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": `${nextEid.eidType} ${nextEid.gregorianYear}`,
              "startDate": nextEid.gregorianDate,
              "endDate": nextEid.gregorianDate,
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "eventStatus": "https://schema.org/EventScheduled",
              "location": {
                "@type": "Place",
                "name": selectedCity,
                "address": `${selectedCity}, India`
              },
              "description": nextEid.significance,
              "image": "https://moneycal.in/images/eid-date-converter.jpg"
            })}
          </script>
        )}

        {/* JSON-LD Structured Data for FAQs */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": eidFAQs.map(faq => ({
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

export default EidDateConverter;





