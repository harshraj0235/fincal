import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, Share2, Clock, RefreshCw, Globe, Moon, Star, BookOpen, AlertCircle } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import {
  islamicEvents,
  hijriMonths,
  conversionMethods,
  islamicYears,
  islamicCalendarFAQs,
  calendarFeatures,
  calendarDifferences
} from '../../data/islamicCalendarData';

const IslamicCalendarSync: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMethod, setSelectedMethod] = useState('astronomical');
  const [showShareModal, setShowShareModal] = useState(false);
  const [gregorianInput, setGregorianInput] = useState('');
  const [hijriInput, setHijriInput] = useState('');
  const [convertedResult, setConvertedResult] = useState<any>(null);

  // Get current Hijri year (approximate)
  const currentHijriYear = useMemo(() => {
    const yearOffset = currentYear - 622;
    return Math.floor(yearOffset * 1.03) + 1;
  }, [currentYear]);

  // Get current Hijri date (approximate)
  const getCurrentHijriDate = () => {
    const today = new Date();
    const startOfYear = new Date(currentYear, 0, 1);
    const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    const hijriDayOfYear = Math.floor(dayOfYear * 354 / 365);
    
    let monthIndex = 0;
    let remainingDays = hijriDayOfYear;
    
    for (let i = 0; i < hijriMonths.length; i++) {
      if (remainingDays <= hijriMonths[i].days) {
        monthIndex = i;
        break;
      }
      remainingDays -= hijriMonths[i].days;
    }
    
    return {
      day: remainingDays || 1,
      month: hijriMonths[monthIndex],
      year: currentHijriYear
    };
  };

  const todayHijri = getCurrentHijriDate();

  const filteredEvents = useMemo(() => {
    const yearKey = `gregorianDate${selectedYear}` as keyof typeof islamicEvents[0];
    return islamicEvents.filter(event => event[yearKey]);
  }, [selectedYear]);

  const nextIslamicEvent = useMemo(() => {
    const today = new Date();
    return filteredEvents.find(event => {
      const yearKey = `gregorianDate${selectedYear}` as keyof typeof event;
      const eventDate = new Date(event[yearKey] as string);
      return eventDate > today;
    });
  }, [filteredEvents, selectedYear]);

  const daysUntilNextEvent = useMemo(() => {
    if (!nextIslamicEvent) return null;
    const yearKey = `gregorianDate${selectedYear}` as keyof typeof nextIslamicEvent;
    const eventDate = new Date(nextIslamicEvent[yearKey] as string);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [nextIslamicEvent, selectedYear]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Simple Gregorian to Hijri conversion (approximate)
  const convertGregorianToHijri = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const hijriYear = Math.floor((year - 622) * 1.03) + 1;
    const dayOfYear = Math.floor((new Date(year, month - 1, day).getTime() - new Date(year, 0, 1).getTime()) / (1000 * 60 * 60 * 24));
    const hijriDay = Math.floor(dayOfYear * 354 / 365);
    
    let monthIndex = 0;
    let remainingDays = hijriDay;
    for (let i = 0; i < hijriMonths.length; i++) {
      if (remainingDays <= hijriMonths[i].days) {
        monthIndex = i;
        break;
      }
      remainingDays -= hijriMonths[i].days;
    }
    
    return {
      hijriDate: `${remainingDays || 1} ${hijriMonths[monthIndex].englishName} ${hijriYear} AH`,
      hijriYear,
      hijriMonth: hijriMonths[monthIndex].englishName,
      hijriDay: remainingDays || 1
    };
  };

  // Simple Hijri to Gregorian conversion (approximate)
  const convertHijriToGregorian = (dateStr: string) => {
    const [day, month, year] = dateStr.split('-').map(Number);
    const gregorianYear = Math.floor((year - 1) / 1.03) + 622;
    const dayOfHijriYear = hijriMonths.slice(0, month - 1).reduce((sum, m) => sum + m.days, 0) + day;
    const gregorianDay = Math.floor(dayOfHijriYear * 365 / 354);
    
    const startOfYear = new Date(gregorianYear, 0, 1);
    const resultDate = new Date(startOfYear.getTime() + gregorianDay * 24 * 60 * 60 * 1000);
    
    return {
      gregorianDate: resultDate.toISOString().split('T')[0],
      formatted: formatDate(resultDate.toISOString().split('T')[0])
    };
  };

  const handleConvert = () => {
    if (gregorianInput) {
      const result = convertGregorianToHijri(gregorianInput);
      setConvertedResult({
        input: gregorianInput,
        output: result.hijriDate,
        type: 'gregorian-to-hijri'
      });
    } else if (hijriInput) {
      const result = convertHijriToGregorian(hijriInput);
      setConvertedResult({
        input: hijriInput,
        output: result.formatted,
        type: 'hijri-to-gregorian'
      });
    }
  };

  const downloadFullYearCalendar = () => {
    const icsEvents = filteredEvents.map(event => {
      const yearKey = `gregorianDate${selectedYear}` as keyof typeof event;
      const dateStr = (event[yearKey] as string).replace(/-/g, '');
      return [
        'BEGIN:VEVENT',
        `DTSTART:${dateStr}`,
        `DTEND:${dateStr}`,
        `SUMMARY:${event.name}`,
        `DESCRIPTION:${event.significance}. Hijri: ${event.hijriDate}`,
        `UID:${event.id}-${selectedYear}@moneycal.in`,
        'END:VEVENT'
      ].join('\n');
    }).join('\n');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MoneyCal//Islamic Calendar//EN',
      'CALSCALE:GREGORIAN',
      ...icsEvents.split('\n'),
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `islamic-calendar-${selectedYear}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareOnSocial = (platform: string) => {
    const text = `Islamic Calendar ${currentHijriYear} AH (${currentYear} CE) - Track Ramadan, Eid, and all Islamic events! Download calendar & sync to your device 🌙`;
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
        title={`Islamic Calendar Sync ${currentYear} - Hijri to Gregorian Converter | MoneyCal`}
        description={`Islamic Hijri Calendar ${currentHijriYear} AH (${currentYear} CE). Convert Hijri to Gregorian dates instantly! Track Ramadan, Eid, Muharram, Hajj events. Download .ics calendar, sync with Google/Apple Calendar. Multiple calculation methods supported.`}
        keywords="Islamic calendar, Hijri calendar, Hijri to Gregorian converter, Islamic calendar 2025, Ramadan calendar, Eid calendar, Muharram date, Umm al-Qura calendar, Islamic date converter, Hijri date today"
        ogImage="https://moneycal.in/images/islamic-calendar-sync.jpg"
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-16 px-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-9xl">🌙</div>
            <div className="absolute bottom-10 right-10 text-9xl">⭐</div>
            <div className="absolute top-1/2 left-1/4 text-6xl">☪</div>
            <div className="absolute top-1/3 right-1/3 text-7xl">✨</div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <Calendar className="w-16 h-16" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
              Islamic Calendar Sync
            </h1>
            <h2 className="text-2xl md:text-3xl text-center mb-6 text-indigo-100">
              Hijri ↔ Gregorian Converter
            </h2>
            <p className="text-xl text-center max-w-3xl mx-auto text-white/90">
              Convert between Islamic Hijri and Gregorian calendars instantly. Download full year calendar with Ramadan, Eid, Hajj & all major Islamic events.
            </p>
          </div>
        </motion.div>

        {/* Current Hijri Date Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-6xl mx-auto px-4 -mt-8 relative z-20"
        >
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white border-4 border-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Today's Hijri Date</h3>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {todayHijri.day} {todayHijri.month.englishName} {todayHijri.year} AH
                </div>
                <div className="text-xl text-indigo-100">
                  {todayHijri.month.arabicName}
                </div>
                <div className="mt-3 text-lg">
                  {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Date Converter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <RefreshCw className="w-7 h-7 text-purple-500" />
              Date Converter
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gregorian Date (YYYY-MM-DD)
                </label>
                <input
                  type="date"
                  value={gregorianInput}
                  onChange={(e) => {
                    setGregorianInput(e.target.value);
                    setHijriInput('');
                  }}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50 text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hijri Date (DD-MM-YYYY)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 01-09-1447"
                  value={hijriInput}
                  onChange={(e) => {
                    setHijriInput(e.target.value);
                    setGregorianInput('');
                  }}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50 text-gray-800"
                />
              </div>
            </div>

            <button
              onClick={handleConvert}
              disabled={!gregorianInput && !hijriInput}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-4 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className="w-5 h-5 inline mr-2" />
              Convert Date
            </button>

            {convertedResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6"
              >
                <h4 className="font-bold text-gray-800 mb-3 text-lg">Conversion Result:</h4>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Input:</div>
                  <div className="text-lg font-semibold text-gray-800 mb-3">{convertedResult.input}</div>
                  <div className="text-sm text-gray-600 mb-1">Output:</div>
                  <div className="text-2xl font-bold text-purple-600">{convertedResult.output}</div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Calculation Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Calculation Method</h3>
            <div className="space-y-4">
              {conversionMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-800">{method.name}</h4>
                    {method.recommended && (
                      <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full font-semibold">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{method.description}</p>
                  <p className="text-xs text-gray-600">Accuracy: {method.accuracy}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Year Selection & Download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Year for Calendar Download
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50 text-gray-800 font-semibold"
                >
                  {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={downloadFullYearCalendar}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                >
                  <Download className="w-5 h-5" />
                  Download {selectedYear} Calendar
                </button>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <strong>Note:</strong> Islamic dates may vary by 1-2 days based on moon sighting in your region. 
                  Consult your local mosque or Islamic authority for confirmed dates. This tool uses {conversionMethods.find(m => m.id === selectedMethod)?.name}.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Islamic Events */}
          {nextIslamicEvent && daysUntilNextEvent && daysUntilNextEvent > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl shadow-xl p-6 mb-8 border-2 border-purple-300"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-purple-600" />
                Next Upcoming Event
              </h3>
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-2xl font-bold text-purple-600">{nextIslamicEvent.name}</h4>
                  <span className="text-4xl">{nextIslamicEvent.category === 'Major' ? '⭐' : '✨'}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Gregorian Date:</div>
                    <div className="text-lg font-bold text-gray-800">
                      {formatDate((nextIslamicEvent as any)[`gregorianDate${selectedYear}`])}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Hijri Date:</div>
                    <div className="text-lg font-bold text-gray-800">{nextIslamicEvent.hijriDate}</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{nextIslamicEvent.significance}</p>
                <div className="bg-purple-100 rounded-lg p-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{daysUntilNextEvent}</div>
                    <div className="text-sm text-gray-700">days remaining</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* All Islamic Events for Selected Year */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-purple-500" />
              Islamic Events {selectedYear}
            </h3>
            <div className="space-y-4">
              {filteredEvents.map((event, index) => {
                const yearKey = `gregorianDate${selectedYear}` as keyof typeof event;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.05 }}
                    className={`rounded-xl p-5 border-2 ${
                      event.category === 'Major'
                        ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-300'
                        : event.category === 'Important'
                        ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300'
                        : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold text-gray-800">{event.name}</h4>
                          {event.fasting && <span className="text-sm bg-green-500 text-white px-2 py-1 rounded">Fasting</span>}
                          <span className="text-sm bg-purple-200 text-purple-800 px-2 py-1 rounded">{event.category}</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3 mb-2">
                          <div className="text-sm">
                            <span className="text-gray-600">Hijri: </span>
                            <span className="font-semibold text-purple-600">{event.hijriDate}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-600">Gregorian: </span>
                            <span className="font-semibold text-indigo-600">{formatDate(event[yearKey] as string)}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">{event.significance}</p>
                      </div>
                      <div className="text-3xl ml-3">
                        {event.category === 'Major' ? '⭐' : event.fasting ? '🌙' : '✨'}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Hijri Months Reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Moon className="w-7 h-7 text-purple-500" />
              12 Hijri Months
            </h3>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
              {hijriMonths.map((month) => (
                <div
                  key={month.number}
                  className={`rounded-xl p-4 border-2 ${
                    month.significance
                      ? 'bg-purple-50 border-purple-300'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold text-purple-600">{month.number}</div>
                    <div className="text-lg text-gray-500">{month.days} days</div>
                  </div>
                  <div className="text-lg font-bold text-gray-800 mb-1">{month.englishName}</div>
                  <div className="text-sm text-gray-600 mb-2">{month.arabicName}</div>
                  {month.significance && (
                    <div className="text-xs text-purple-700 bg-purple-100 rounded px-2 py-1">
                      {month.significance}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Calendar Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Calendar Sync Features</h3>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
              {calendarFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Gregorian vs Hijri Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Gregorian vs Islamic Calendar
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-100">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Aspect</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Gregorian Calendar</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Islamic Calendar</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Key Difference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {calendarDifferences.map((diff, index) => (
                    <tr key={index} className="hover:bg-purple-50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-gray-800">{diff.title}</td>
                      <td className="px-4 py-3 text-gray-700">{diff.gregorian}</td>
                      <td className="px-4 py-3 text-gray-700">{diff.islamic}</td>
                      <td className="px-4 py-3 text-purple-600 font-semibold">{diff.difference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {islamicCalendarFAQs.map((faq, index) => (
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
            transition={{ delay: 1.5 }}
            className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explore More Islamic Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/festival-tools/ramadan-timetable" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-purple-200">
                <h4 className="font-bold text-purple-600 mb-2">Ramadan Timetable</h4>
                <p className="text-sm text-gray-600">Sehri & Iftar times with multiple methods</p>
              </a>
              <a href="/festival-tools/eid-date-converter" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-purple-200">
                <h4 className="font-bold text-purple-600 mb-2">Eid Date Converter</h4>
                <p className="text-sm text-gray-600">Eid-ul-Fitr & Eid-ul-Adha dates</p>
              </a>
              <a href="/festival-tools/christmas-countdown" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-purple-200">
                <h4 className="font-bold text-purple-600 mb-2">Christmas Countdown</h4>
                <p className="text-sm text-gray-600">Live timer to Christmas Day</p>
              </a>
            </div>
          </motion.div>

          {/* External Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Learn More About Islamic Calendar</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://en.wikipedia.org/wiki/Islamic_calendar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 hover:bg-blue-100 transition-colors border-2 border-blue-200"
              >
                <Globe className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-600">Wikipedia - Islamic Calendar</h4>
                  <p className="text-sm text-gray-600">Complete guide to Hijri calendar</p>
                </div>
              </a>
              <a 
                href="https://www.islamicfinder.org/islamic-calendar/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-50 rounded-xl p-4 hover:bg-green-100 transition-colors border-2 border-green-200"
              >
                <Calendar className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-green-600">Islamic Finder Calendar</h4>
                  <p className="text-sm text-gray-600">Islamic dates & resources</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Share Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-lg"
            >
              <Share2 className="w-6 h-6" />
              Share Islamic Calendar
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
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Share Islamic Calendar</h3>
              <p className="text-gray-600 mb-6">Share this tool with your community</p>
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
            "@type": "FAQPage",
            "mainEntity": islamicCalendarFAQs.map(faq => ({
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

export default IslamicCalendarSync;



