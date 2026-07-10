import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, Share2, Clock, Info, Globe, Cross, Heart } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import {
  easterDates,
  holyWeekDays,
  easterTraditions,
  easterFAQs,
  easterCalculationExplanation
} from '../../data/easterDateData';

const EasterDateTool: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedEasterType, setSelectedEasterType] = useState<'western' | 'orthodox'>('western');

  const easterData = useMemo(() => {
    return easterDates.find(d => d.year === selectedYear) || easterDates[0];
  }, [selectedYear]);

  const daysUntilEaster = useMemo(() => {
    const today = new Date();
    const easterDate = new Date(easterData.westernEaster);
    const diffTime = easterDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [easterData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const downloadCalendar = (type: 'easter' | 'goodfriday' | 'holyweek') => {
    let events = [];

    if (type === 'holyweek') {
      events = [
        { date: easterData.westernMaundyThursday, title: 'Maundy Thursday', desc: 'The Last Supper' },
        { date: easterData.westernGoodFriday, title: 'Good Friday', desc: 'Crucifixion of Jesus Christ' },
        { date: easterData.westernHolySaturday, title: 'Holy Saturday', desc: 'Jesus in the tomb' },
        { date: easterData.westernEaster, title: 'Easter Sunday', desc: 'Resurrection of Jesus Christ' },
        { date: easterData.westernEasterMonday, title: 'Easter Monday', desc: 'Day after Easter' }
      ];
    } else if (type === 'goodfriday') {
      events = [{ date: easterData.westernGoodFriday, title: 'Good Friday', desc: 'Crucifixion of Jesus Christ' }];
    } else {
      events = [{ date: easterData.westernEaster, title: 'Easter Sunday', desc: 'Resurrection of Jesus Christ' }];
    }

    const icsEvents = events.map(e => [
      'BEGIN:VEVENT',
      `DTSTART:${e.date.replace(/-/g, '')}`,
      `DTEND:${e.date.replace(/-/g, '')}`,
      `SUMMARY:${e.title} ${selectedYear}`,
      `DESCRIPTION:${e.desc}`,
      'LOCATION:Worldwide',
      'END:VEVENT'
    ].join('\n')).join('\n');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MoneyCal//Easter Tool//EN',
      icsEvents,
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${type}-${selectedYear}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareOnSocial = (platform: string) => {
    const text = `Easter ${selectedYear} is on ${formatDate(easterData.westernEaster)} and Good Friday is on ${formatDate(easterData.westernGoodFriday)}! ✝️🌸 Get your calendar on MoneyCal`;
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
        title={`Easter ${selectedYear} Date & Good Friday ${selectedYear} - When is Easter This Year? | MoneyCal`}
        description={`Easter ${selectedYear} falls on ${formatDate(easterData.westernEaster)}. Good Friday ${selectedYear} is ${formatDate(easterData.westernGoodFriday)}. Get Western & Orthodox Easter dates, download Holy Week calendar, learn why Easter changes every year.`}
        keywords="Easter 2025 date, Good Friday 2025, when is Easter this year, Easter Sunday date, Orthodox Easter, Holy Week calendar, Easter date Calculator, movable feast, Paschal full moon"
        ogImage="/images/easter-date-tool.jpg"
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white py-16 px-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-9xl">✝️</div>
            <div className="absolute bottom-10 right-10 text-9xl">🌸</div>
            <div className="absolute top-1/2 left-1/4 text-6xl">🐰</div>
            <div className="absolute top-1/3 right-1/3 text-7xl">🥚</div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="flex justify-center mb-6"
            >
              <Cross className="w-16 h-16" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
              Easter {selectedYear} Date Tool
            </h1>
            <h2 className="text-2xl md:text-3xl text-center mb-6 text-pink-100">
              Easter Sunday & Good Friday Dates
            </h2>
            <p className="text-xl text-center max-w-3xl mx-auto text-white/90">
              Find exact Easter and Good Friday dates for any year. Includes Western (Gregorian) and Orthodox (Julian) Easter with Holy Week calendar download.
            </p>
          </div>
        </motion.div>

        {/* Countdown Section */}
        {daysUntilEaster > 0 && daysUntilEaster < 365 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-6xl mx-auto px-4 -mt-8 relative z-20"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-purple-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Countdown to Easter {selectedYear}</h3>
                <div className="flex justify-center items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-6 min-w-[120px]">
                    <div className="text-5xl font-bold">{daysUntilEaster}</div>
                    <div className="text-lg mt-2">Days</div>
                  </div>
                  <Clock className="w-12 h-12 text-purple-500" />
                </div>
                <p className="mt-4 text-gray-600 text-lg">
                  {daysUntilEaster === 1 ? 'Easter is tomorrow!' : `${daysUntilEaster} days until Easter Sunday`}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Year & Type Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50 text-gray-800 font-semibold"
                >
                  {easterDates.map(d => (
                    <option key={d.year} value={d.year}>
                      {d.year} - {new Date(d.westernEaster).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-500" />
                  Easter Type
                </label>
                <select
                  value={selectedEasterType}
                  onChange={(e) => setSelectedEasterType(e.target.value as 'western' | 'orthodox')}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50 text-gray-800 font-semibold"
                >
                  <option value="western">Western (Gregorian) Easter</option>
                  <option value="orthodox">Orthodox (Julian) Easter</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => downloadCalendar('easter')}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <Download className="w-5 h-5" />
                Download Easter Calendar
              </button>
              <button
                onClick={() => downloadCalendar('goodfriday')}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <Download className="w-5 h-5" />
                Download Good Friday
              </button>
              <button
                onClick={() => downloadCalendar('holyweek')}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <Download className="w-5 h-5" />
                Download Holy Week
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-rose-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </motion.div>

          {/* Main Easter Dates Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            {/* Western Easter */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-2xl p-8 text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
                  <Cross className="w-7 h-7" />
                  Western Easter {selectedYear}
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5">
                    <div className="text-sm text-pink-100 mb-2">Easter Sunday</div>
                    <div className="text-3xl font-bold">{formatDate(easterData.westernEaster)}</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5">
                    <div className="text-sm text-pink-100 mb-2">Good Friday</div>
                    <div className="text-2xl font-bold">{formatDate(easterData.westernGoodFriday)}</div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-pink-100">
                  Used by Catholic, Protestant, and Anglican churches
                </div>
              </div>
            </div>

            {/* Orthodox Easter */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
                  <Cross className="w-7 h-7" />
                  Orthodox Easter {selectedYear}
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5">
                    <div className="text-sm text-blue-100 mb-2">Easter Sunday</div>
                    <div className="text-3xl font-bold">{formatDate(easterData.orthodoxEaster)}</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5">
                    <div className="text-sm text-blue-100 mb-2">Good Friday</div>
                    <div className="text-2xl font-bold">{formatDate(easterData.orthodoxGoodFriday)}</div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-blue-100">
                  Used by Eastern Orthodox and Oriental Orthodox churches
                </div>
              </div>
            </div>
          </motion.div>

          {/* Date Difference Notice */}
          {easterData.daysDifference > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6 mb-8"
            >
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-yellow-900 mb-2">Western vs Orthodox Easter {selectedYear}</h4>
                  <p className="text-yellow-800">
                    This year, Orthodox Easter falls <strong>{easterData.daysDifference} days after</strong> Western Easter. 
                    This difference occurs because Orthodox churches use the Julian calendar for Easter calculation, 
                    while Western churches use the Gregorian calendar.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Holy Week Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Holy Week {selectedYear} - Complete Timeline</h3>
            <div className="space-y-4">
              {holyWeekDays.map((day, index) => {
                let dateToShow = '';
                if (day.name === 'Maundy Thursday') dateToShow = easterData.westernMaundyThursday;
                else if (day.name === 'Good Friday') dateToShow = easterData.westernGoodFriday;
                else if (day.name === 'Holy Saturday') dateToShow = easterData.westernHolySaturday;
                else if (day.name === 'Easter Sunday') dateToShow = easterData.westernEaster;
                else if (day.name === 'Easter Monday') dateToShow = easterData.westernEasterMonday;
                else if (day.name === 'Palm Sunday') {
                  const palmSunday = new Date(easterData.westernEaster);
                  palmSunday.setDate(palmSunday.getDate() - 7);
                  dateToShow = palmSunday.toISOString().split('T')[0];
                }

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{day.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xl font-bold text-gray-800">{day.name}</h4>
                          <span className="text-sm font-semibold text-purple-600">
                            {formatDate(dateToShow)}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm mb-1">{day.description}</p>
                        <p className="text-xs text-gray-600 italic">{day.observance}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* How Easter is Calculated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
              <Info className="w-7 h-7 text-purple-500" />
              {easterCalculationExplanation.title}
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 mb-6">
              <p className="text-lg text-gray-800 mb-4 font-semibold">{easterCalculationExplanation.summary}</p>
              <div className="space-y-3">
                {easterCalculationExplanation.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
              <p className="text-sm text-purple-900">
                <strong>Historical Note:</strong> {easterCalculationExplanation.note}
              </p>
            </div>
          </motion.div>

          {/* Easter Traditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Easter Traditions & Celebrations</h3>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
              {easterTraditions.map((tradition, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border-2 border-pink-200 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-3">{tradition.icon}</div>
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
            transition={{ delay: 1.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {easterFAQs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-purple-50 rounded-xl p-4 border-2 border-purple-100 hover:border-purple-300 transition-colors group"
                >
                  <summary className="font-semibold text-gray-800 cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-purple-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed pl-4 border-l-4 border-purple-300">
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
            transition={{ delay: 1.4 }}
            className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explore More Festival Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/festival-tools/christmas-countdown" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-purple-200">
                <h4 className="font-bold text-purple-600 mb-2">Christmas Countdown</h4>
                <p className="text-sm text-gray-600">Live timer to Christmas Day</p>
              </a>
              <a href="/festival-tools/diwali-date-finder" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-purple-200">
                <h4 className="font-bold text-purple-600 mb-2">Diwali 2025</h4>
                <p className="text-sm text-gray-600">5-day Diwali schedule</p>
              </a>
              <a href="/festival-tools/eid-date-converter" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-purple-200">
                <h4 className="font-bold text-purple-600 mb-2">Eid Date Converter</h4>
                <p className="text-sm text-gray-600">Hijri to Gregorian calendar</p>
              </a>
            </div>
          </motion.div>

          {/* External Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Learn More About Easter</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://en.wikipedia.org/wiki/Easter" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-purple-50 rounded-xl p-4 hover:bg-purple-100 transition-colors border-2 border-purple-200"
              >
                <Globe className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-purple-600">Wikipedia - Easter</h4>
                  <p className="text-sm text-gray-600">Complete Easter history & traditions</p>
                </div>
              </a>
              <a 
                href="https://www.britannica.com/topic/Easter-holiday" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-pink-50 rounded-xl p-4 hover:bg-pink-100 transition-colors border-2 border-pink-200"
              >
                <Heart className="w-6 h-6 text-pink-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-pink-600">Britannica - Easter</h4>
                  <p className="text-sm text-gray-600">Easter significance & observance</p>
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
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Share Easter Dates</h3>
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
            "name": `Easter ${selectedYear}`,
            "startDate": easterData.westernEaster,
            "endDate": easterData.westernEaster,
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": {
              "@type": "Place",
              "name": "Worldwide",
              "address": "Worldwide"
            },
            "description": easterData.significance,
            "image": "/images/easter-date-tool.jpg"
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": easterFAQs.map(faq => ({
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

export default EasterDateTool;





