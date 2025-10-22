import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Download, Share2, Clock, Sunrise, Sunset, Moon, Star, AlertCircle, Info } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import {
  ramadanDates,
  calculationMethods,
  indianCitiesPrayer,
  ramadanFAQs,
  ramadanIbadah,
  ramadanHealthTips,
  importantNights
} from '../../data/ramadanTimetableData';

const RamadanTimetable: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [selectedMethod, setSelectedMethod] = useState('MWL');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showMethodComparison, setShowMethodComparison] = useState(false);

  const ramadanData = useMemo(() => {
    return ramadanDates.find(d => d.gregorianYear === selectedYear) || ramadanDates[0];
  }, [selectedYear]);

  const cityData = useMemo(() => {
    return indianCitiesPrayer.find(city => city.city === selectedCity) || indianCitiesPrayer[0];
  }, [selectedCity]);

  const methodData = useMemo(() => {
    return calculationMethods.find(m => m.id === selectedMethod) || calculationMethods[0];
  }, [selectedMethod]);

  const daysUntilRamadan = useMemo(() => {
    const today = new Date();
    const ramadanStart = new Date(ramadanData.ramadanStart);
    const diffTime = ramadanStart.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [ramadanData]);

  const isRamadan = useMemo(() => {
    const today = new Date();
    const start = new Date(ramadanData.ramadanStart);
    const end = new Date(ramadanData.ramadanEnd);
    return today >= start && today <= end;
  }, [ramadanData]);

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
    // Create .ics file content
    const icsEvents = [];
    const startDate = new Date(ramadanData.ramadanStart);
    
    // Generate 30 days of Ramadan
    for (let day = 0; day < 30; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + day);
      const dateStr = currentDate.toISOString().split('T')[0].replace(/-/g, '');
      
      // Sehri event
      icsEvents.push([
        'BEGIN:VEVENT',
        `DTSTART:${dateStr}T${cityData.sehriTime.replace(':', '').slice(0, 4)}00`,
        `SUMMARY:Sehri/Imsak - Ramadan Day ${day + 1}`,
        `DESCRIPTION:Stop eating time before Fajr prayer in ${selectedCity}. Method: ${methodData.name}`,
        `LOCATION:${selectedCity}, ${cityData.state}`,
        'END:VEVENT'
      ].join('\n'));
      
      // Iftar event
      icsEvents.push([
        'BEGIN:VEVENT',
        `DTSTART:${dateStr}T${cityData.iftarTime.replace(':', '').slice(0, 4)}00`,
        `SUMMARY:Iftar - Ramadan Day ${day + 1}`,
        `DESCRIPTION:Break fast at Maghrib time in ${selectedCity}. Method: ${methodData.name}`,
        `LOCATION:${selectedCity}, ${cityData.state}`,
        'END:VEVENT'
      ].join('\n'));
    }

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MoneyCal//Ramadan Timetable//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      ...icsEvents,
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ramadan-${selectedYear}-${selectedCity.toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareOnSocial = (platform: string) => {
    const text = `Ramadan ${selectedYear} Timetable for ${selectedCity}! Sehri: ${cityData.sehriTime}, Iftar: ${cityData.iftarTime}. Get your city's accurate timings on MoneyCal 🌙`;
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
        title={`Ramadan ${selectedYear} Timetable - Sehri & Iftar Times ${selectedCity} | MoneyCal`}
        description={`Ramadan ${selectedYear} Sehri and Iftar times for ${selectedCity}. Accurate prayer timings with multiple calculation methods (MWL, ISNA, Karachi, Umm al-Qura). Download calendar, compare methods & get health tips. ${formatDate(ramadanData.ramadanStart)}`}
        keywords="Ramadan 2025 timetable, Sehri time India, Iftar time India, Ramadan prayer times, Imsak time, Fajr Maghrib timings, Islamic prayer calculator, Ramadan calendar download, Sehr Iftar 2025"
        ogImage="https://moneycal.in/images/ramadan-timetable.jpg"
      />

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 text-white py-16 px-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-9xl">🌙</div>
            <div className="absolute bottom-10 right-10 text-9xl">⭐</div>
            <div className="absolute top-1/2 left-1/4 text-6xl">✨</div>
            <div className="absolute top-1/3 right-1/3 text-7xl">🕌</div>
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
              Ramadan {selectedYear} Timetable
            </h1>
            <h2 className="text-2xl md:text-3xl text-center mb-6 text-green-100">
              Sehri (Imsak) & Iftar Times - {selectedCity}
            </h2>
            <p className="text-xl text-center max-w-3xl mx-auto text-white/90">
              Accurate prayer times with multiple calculation methods. Download full month calendar, compare methods & plan your Ramadan worship.
            </p>
          </div>
        </motion.div>

        {/* Countdown/Status Section */}
        {(daysUntilRamadan > 0 && daysUntilRamadan < 365) || isRamadan ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-6xl mx-auto px-4 -mt-8 relative z-20"
          >
            <div className={`rounded-2xl shadow-2xl p-8 border-4 ${isRamadan ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white border-green-300' : 'bg-white border-teal-200'}`}>
              <div className="text-center">
                {isRamadan ? (
                  <>
                    <h3 className="text-3xl font-bold mb-4">🌙 Ramadan Mubarak! 🌙</h3>
                    <p className="text-xl mb-4">Ramadan {ramadanData.year} AH is here!</p>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto">
                      <div className="text-lg mb-2">Today's Timings in {selectedCity}</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm opacity-90">Sehri (Imsak)</div>
                          <div className="text-3xl font-bold">{cityData.sehriTime}</div>
                        </div>
                        <div>
                          <div className="text-sm opacity-90">Iftar (Maghrib)</div>
                          <div className="text-3xl font-bold">{cityData.iftarTime}</div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Countdown to Ramadan {selectedYear}</h3>
                    <div className="flex justify-center items-center gap-4">
                      <div className="bg-gradient-to-br from-teal-500 to-emerald-500 text-white rounded-xl p-6 min-w-[120px]">
                        <div className="text-5xl font-bold">{daysUntilRamadan}</div>
                        <div className="text-lg mt-2">Days</div>
                      </div>
                      <Clock className="w-12 h-12 text-teal-500" />
                    </div>
                    <p className="mt-4 text-gray-600 text-lg">
                      Ramadan starts on {formatDate(ramadanData.ramadanStart)}
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ) : null}

        {/* Selection Controls */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Year Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-500" />
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-teal-50 text-gray-800 font-semibold"
                >
                  {ramadanDates.map(d => (
                    <option key={d.gregorianYear} value={d.gregorianYear}>
                      {d.gregorianYear} ({d.year} AH)
                    </option>
                  ))}
                </select>
              </div>

              {/* City Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-500" />
                  Select City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-teal-50 text-gray-800 font-semibold"
                >
                  {indianCitiesPrayer.map(city => (
                    <option key={city.city} value={city.city}>
                      {city.city}, {city.state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Method Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Star className="w-5 h-5 text-teal-500" />
                  Calculation Method
                </label>
                <select
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-teal-50 text-gray-800 font-semibold"
                >
                  {calculationMethods.filter(m => m.popular).map(method => (
                    <option key={method.id} value={method.id}>
                      {method.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Method Info */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">{methodData.name}</h4>
                  <p className="text-sm text-blue-800">{methodData.description}</p>
                  <p className="text-xs text-blue-700 mt-1">Region: {methodData.region} | Fajr: {methodData.fajrAngle}° | Isha: {methodData.ishaAngle > 0 ? `${methodData.ishaAngle}°` : '90 min after Maghrib'}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={downloadCalendar}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <Download className="w-5 h-5" />
                Download Full Month Calendar
              </button>
              <button
                onClick={() => setShowMethodComparison(!showMethodComparison)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <AlertCircle className="w-5 h-5" />
                Compare Methods
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </motion.div>

          {/* Method Comparison */}
          {showMethodComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white rounded-2xl shadow-xl p-6 mb-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Calculation Method Comparison for {selectedCity}</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-teal-100">
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Method</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Fajr Angle</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Isha Angle</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Region</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {calculationMethods.filter(m => m.popular).map((method) => (
                      <tr key={method.id} className={`hover:bg-teal-50 transition-colors ${method.id === selectedMethod ? 'bg-teal-100 font-semibold' : ''}`}>
                        <td className="px-4 py-3 text-gray-800">{method.name}</td>
                        <td className="px-4 py-3 text-gray-700">{method.fajrAngle}°</td>
                        <td className="px-4 py-3 text-gray-700">{method.ishaAngle > 0 ? `${method.ishaAngle}°` : '90 min after'}</td>
                        <td className="px-4 py-3 text-gray-700">{method.region}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                <p className="text-sm text-yellow-900">
                  <strong>Note:</strong> Different calculation methods produce slightly different prayer times (typically 5-15 minutes difference). 
                  Consult your local mosque for their preferred method. Times shown are estimates based on astronomical calculations.
                </p>
              </div>
            </motion.div>
          )}

          {/* Ramadan Date Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-2xl p-8 mb-8 text-white"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-6">Ramadan {selectedYear} ({ramadanData.year} AH)</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <Sunrise className="w-10 h-10 mx-auto mb-3" />
                  <div className="text-sm text-green-100 mb-2">Ramadan Begins</div>
                  <div className="text-xl font-bold">{formatDate(ramadanData.ramadanStart)}</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <Sunset className="w-10 h-10 mx-auto mb-3" />
                  <div className="text-sm text-green-100 mb-2">Ramadan Ends</div>
                  <div className="text-xl font-bold">{formatDate(ramadanData.ramadanEnd)}</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <Star className="w-10 h-10 mx-auto mb-3" />
                  <div className="text-sm text-green-100 mb-2">Eid-ul-Fitr</div>
                  <div className="text-xl font-bold">{formatDate(ramadanData.eidUlFitr)}</div>
                </div>
              </div>
              <div className="mt-6 bg-yellow-400/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm">⚠️ {ramadanData.moonSightingNote}</p>
              </div>
            </div>
          </motion.div>

          {/* Today's Timings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Clock className="w-7 h-7 text-teal-500" />
              Prayer Times in {selectedCity} - {methodData.name}
            </h3>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border-2 border-indigo-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-gray-800">Sehri (Imsak)</h4>
                  <Sunrise className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-3xl font-bold text-indigo-600">{cityData.sehriTime}</div>
                <p className="text-xs text-gray-600 mt-2">Stop eating before Fajr</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 border-2 border-orange-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-gray-800">Iftar (Maghrib)</h4>
                  <Sunset className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-orange-600">{cityData.iftarTime}</div>
                <p className="text-xs text-gray-600 mt-2">Break fast at sunset</p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-5 border-2 border-teal-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-gray-800">Taraweeh</h4>
                  <Moon className="w-6 h-6 text-teal-600" />
                </div>
                <div className="text-xl font-bold text-teal-600">After Isha</div>
                <p className="text-xs text-gray-600 mt-2">Special Ramadan prayer</p>
              </div>
            </div>
          </motion.div>

          {/* Acts of Worship */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Ramadan Acts of Worship</h3>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
              {ramadanIbadah.map((ibadah, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 border-2 border-teal-200 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-3">{ibadah.icon}</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{ibadah.title}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{ibadah.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Important Nights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
              <Star className="w-7 h-7 text-yellow-500" />
              Important Nights in Ramadan
            </h3>
            <div className="space-y-4">
              {importantNights.map((night, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">✨</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-bold text-gray-800">{night.name}</h4>
                        <span className="text-sm font-semibold text-purple-600">{night.night}</span>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{night.description}</p>
                      <div className="bg-purple-100 rounded-lg px-3 py-2 text-xs text-purple-800 font-medium">
                        {night.significance}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Health Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Health Tips for Fasting</h3>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
              {ramadanHealthTips.map((tip, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4 border-2 border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-800 text-sm">{tip.title}</h4>
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">{tip.category}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{tip.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {ramadanFAQs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-teal-50 rounded-xl p-4 border-2 border-teal-100 hover:border-teal-300 transition-colors group"
                >
                  <summary className="font-semibold text-gray-800 cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-teal-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed pl-4 border-l-4 border-teal-300">
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
            className="bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explore More Festival Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/festival-tools/eid-date-converter" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-teal-200">
                <h4 className="font-bold text-teal-600 mb-2">Eid Date Converter</h4>
                <p className="text-sm text-gray-600">Hijri to Gregorian calendar</p>
              </a>
              <a href="/festival-tools/buddha-purnima-converter" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-teal-200">
                <h4 className="font-bold text-teal-600 mb-2">Buddha Purnima 2025</h4>
                <p className="text-sm text-gray-600">Vaisakha Purnima dates</p>
              </a>
              <a href="/festival-tools/diwali-date-finder" className="bg-white rounded-xl p-4 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-teal-200">
                <h4 className="font-bold text-teal-600 mb-2">Diwali 2025</h4>
                <p className="text-sm text-gray-600">5-day Diwali schedule</p>
              </a>
            </div>
          </motion.div>

          {/* External Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Learn More About Ramadan</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://en.wikipedia.org/wiki/Ramadan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 hover:bg-blue-100 transition-colors border-2 border-blue-200"
              >
                <Moon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-600">Wikipedia - Ramadan</h4>
                  <p className="text-sm text-gray-600">Complete guide to fasting & worship</p>
                </div>
              </a>
              <a 
                href="https://www.aladhan.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-50 rounded-xl p-4 hover:bg-green-100 transition-colors border-2 border-green-200"
              >
                <Clock className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-green-600">Al Adhan Prayer Times</h4>
                  <p className="text-sm text-gray-600">Accurate Islamic prayer timings</p>
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
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Share Ramadan Timetable</h3>
              <p className="text-gray-600 mb-6">Share {selectedCity} timings on your favorite platform</p>
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

        {/* JSON-LD Structured Data for FAQs */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": ramadanFAQs.map(faq => ({
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

export default RamadanTimetable;



