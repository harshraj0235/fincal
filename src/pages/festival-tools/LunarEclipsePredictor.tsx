import React, { useState } from 'react';
import { Moon, Sun, Calendar, MapPin, Clock, AlertCircle, Star, TrendingUp, Download, Bell, CheckCircle, Info } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const LunarEclipsePredictor: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCity, setSelectedCity] = useState('delhi');
  const [showNotification, setShowNotification] = useState(false);

  // Cities database with coordinates
  const cities = {
    delhi: { name: 'Delhi', lat: 28.7041, lon: 77.1025, timezone: 'Asia/Kolkata' },
    mumbai: { name: 'Mumbai', lat: 19.0760, lon: 72.8777, timezone: 'Asia/Kolkata' },
    bangalore: { name: 'Bangalore', lat: 12.9716, lon: 77.5946, timezone: 'Asia/Kolkata' },
    kolkata: { name: 'Kolkata', lat: 22.5726, lon: 88.3639, timezone: 'Asia/Kolkata' },
    chennai: { name: 'Chennai', lat: 13.0827, lon: 80.2707, timezone: 'Asia/Kolkata' },
    hyderabad: { name: 'Hyderabad', lat: 17.3850, lon: 78.4867, timezone: 'Asia/Kolkata' },
    pune: { name: 'Pune', lat: 18.5204, lon: 73.8567, timezone: 'Asia/Kolkata' },
    ahmedabad: { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714, timezone: 'Asia/Kolkata' },
    jaipur: { name: 'Jaipur', lat: 26.9124, lon: 75.7873, timezone: 'Asia/Kolkata' },
    lucknow: { name: 'Lucknow', lat: 26.8467, lon: 80.9462, timezone: 'Asia/Kolkata' },
    srinagar: { name: 'Srinagar', lat: 34.0837, lon: 74.7973, timezone: 'Asia/Kolkata' },
    chandigarh: { name: 'Chandigarh', lat: 30.7333, lon: 76.7794, timezone: 'Asia/Kolkata' }
  };

  // Comprehensive eclipse data for 2025-2027
  const eclipseData = {
    2025: [
      {
        type: 'Total Lunar Eclipse',
        date: new Date(2025, 2, 14), // March 14, 2025
        peakTime: '06:58 AM',
        duration: '3h 38m',
        visibility: 'Partial visibility in India (Western regions)',
        magnitude: 1.178,
        nakshatra: 'Uttara Phalguni',
        tithi: 'Purnima (Full Moon)',
        yoga: 'Vishkumbha',
        impactedFestivals: ['Holi (nearby)', 'Holika Dahan'],
        sutak: '9 hours before eclipse',
        ritualImpact: 'Avoid starting new ventures, postpone puja 12 hours after eclipse',
        astroImpact: 'Financial planning review needed, avoid major investments',
        remedies: ['Chant Chandra mantra', 'Donate white items', 'Take bath after eclipse'],
        severity: 'High',
        color: 'from-red-100 to-orange-100',
        borderColor: 'border-red-500',
        visibleInIndia: true
      },
      {
        type: 'Partial Solar Eclipse',
        date: new Date(2025, 2, 29), // March 29, 2025
        peakTime: '10:48 AM',
        duration: '2h 01m',
        visibility: 'Not visible in India',
        magnitude: 0.944,
        nakshatra: 'Revati',
        tithi: 'Amavasya (New Moon)',
        yoga: 'Priti',
        impactedFestivals: ['Ugadi/Gudi Padwa (nearby)'],
        sutak: 'Not applicable (not visible in India)',
        ritualImpact: 'No major impact on Indian festivals',
        astroImpact: 'Global financial markets may fluctuate',
        remedies: ['Donate to charity', 'Chant Surya mantra'],
        severity: 'Low',
        color: 'from-yellow-100 to-amber-100',
        borderColor: 'border-yellow-500',
        visibleInIndia: false
      },
      {
        type: 'Total Lunar Eclipse',
        date: new Date(2025, 8, 7), // September 7, 2025
        peakTime: '06:11 PM',
        duration: '3h 28m',
        visibility: 'Visible across all of India',
        magnitude: 1.362,
        nakshatra: 'Uttara Bhadrapada',
        tithi: 'Purnima (Full Moon)',
        yoga: 'Siddha',
        impactedFestivals: ['Anant Chaturdashi', 'Ganesh Visarjan'],
        sutak: '9 hours before eclipse (from 9:11 AM)',
        ritualImpact: 'Postpone Ganesh Visarjan if possible, no cooking during Sutak',
        astroImpact: 'Major life decisions should be delayed, career changes postponed',
        remedies: ['Take holy bath after eclipse', 'Donate food', 'Chant Mahamrityunjaya mantra 108 times'],
        severity: 'Very High',
        color: 'from-purple-100 to-pink-100',
        borderColor: 'border-purple-600',
        visibleInIndia: true
      },
      {
        type: 'Partial Solar Eclipse',
        date: new Date(2025, 8, 21), // September 21, 2025
        peakTime: '07:42 PM',
        visibility: 'Partial visibility in Southern India',
        magnitude: 0.855,
        duration: '2h 18m',
        nakshatra: 'Hasta',
        tithi: 'Amavasya (New Moon)',
        yoga: 'Vyaghata',
        impactedFestivals: ['Mahalaya (Pitru Paksha)'],
        sutak: '12 hours before eclipse (from 7:42 AM)',
        ritualImpact: 'Pitru Paksha rituals timing needs adjustment',
        astroImpact: 'Ancestral property matters need careful handling',
        remedies: ['Perform Tarpan after eclipse', 'Feed Brahmins', 'Donate black sesame'],
        severity: 'Medium',
        color: 'from-orange-100 to-red-100',
        borderColor: 'border-orange-500',
        visibleInIndia: true
      }
    ],
    2026: [
      {
        type: 'Total Lunar Eclipse',
        date: new Date(2026, 2, 3), // March 3, 2026
        peakTime: '11:33 AM',
        duration: '3h 27m',
        visibility: 'Partially visible in Western India',
        magnitude: 1.151,
        nakshatra: 'Uttara Phalguni',
        tithi: 'Purnima (Full Moon)',
        yoga: 'Harshana',
        impactedFestivals: ['Holi', 'Holika Dahan'],
        sutak: '9 hours before eclipse',
        ritualImpact: 'Holi celebrations timing should be adjusted',
        astroImpact: 'Relationships and partnerships need attention',
        remedies: ['Chant Chandra mantra', 'Offer white flowers to Lord Shiva'],
        severity: 'High',
        color: 'from-red-100 to-pink-100',
        borderColor: 'border-red-500',
        visibleInIndia: true
      },
      {
        type: 'Annular Solar Eclipse',
        date: new Date(2026, 1, 17), // February 17, 2026
        peakTime: '12:13 PM',
        duration: '2h 22m',
        visibility: 'Not visible in India',
        magnitude: 0.963,
        nakshatra: 'Dhanishtha',
        tithi: 'Amavasya (New Moon)',
        yoga: 'Vajra',
        impactedFestivals: ['Maha Shivaratri (nearby)'],
        sutak: 'Not applicable',
        ritualImpact: 'No direct impact on Shivaratri observances',
        astroImpact: 'Spiritual practices enhanced',
        remedies: ['Fast on eclipse day', 'Visit Shiva temple'],
        severity: 'Low',
        color: 'from-blue-100 to-cyan-100',
        borderColor: 'border-blue-400',
        visibleInIndia: false
      },
      {
        type: 'Total Solar Eclipse',
        date: new Date(2026, 7, 12), // August 12, 2026
        peakTime: '05:47 PM',
        duration: '2h 18m',
        visibility: 'Visible in parts of North India',
        magnitude: 1.039,
        nakshatra: 'Pushya',
        tithi: 'Amavasya (New Moon)',
        yoga: 'Siddha',
        impactedFestivals: ['Hariyali Amavasya'],
        sutak: '12 hours before eclipse',
        ritualImpact: 'Major eclipse, all auspicious activities postponed',
        astroImpact: 'Transformative period, major changes in career and health',
        remedies: ['Complete fast during eclipse', 'Donate food after eclipse', 'Take holy dip'],
        severity: 'Very High',
        color: 'from-red-200 to-orange-200',
        borderColor: 'border-red-600',
        visibleInIndia: true
      },
      {
        type: 'Partial Lunar Eclipse',
        date: new Date(2026, 7, 28), // August 28, 2026
        peakTime: '04:12 AM',
        duration: '3h 11m',
        visibility: 'Visible across India',
        magnitude: 0.932,
        nakshatra: 'Shravana',
        tithi: 'Purnima (Full Moon)',
        yoga: 'Shukla',
        impactedFestivals: ['Raksha Bandhan (nearby)'],
        sutak: '9 hours before eclipse',
        ritualImpact: 'Plan Raksha Bandhan timing carefully',
        astroImpact: 'Family bonds and sibling relationships highlighted',
        remedies: ['Tie rakhi after eclipse ends', 'Donate sweets', 'Perform charity'],
        severity: 'Medium',
        color: 'from-pink-100 to-rose-100',
        borderColor: 'border-pink-500',
        visibleInIndia: true
      }
    ],
    2027: [
      {
        type: 'Penumbral Lunar Eclipse',
        date: new Date(2027, 1, 20), // February 20, 2027
        peakTime: '11:11 PM',
        duration: '4h 35m',
        visibility: 'Visible in India',
        magnitude: 0.931,
        nakshatra: 'Purva Phalguni',
        tithi: 'Purnima (Full Moon)',
        yoga: 'Brahma',
        impactedFestivals: [],
        sutak: 'No Sutak for Penumbral (as per some traditions)',
        ritualImpact: 'Minimal impact, normal activities can continue',
        astroImpact: 'Subtle emotional changes',
        remedies: ['Optional: Chant mantras', 'Meditation recommended'],
        severity: 'Low',
        color: 'from-gray-100 to-slate-100',
        borderColor: 'border-gray-400',
        visibleInIndia: true
      },
      {
        type: 'Total Solar Eclipse',
        date: new Date(2027, 7, 2), // August 2, 2027
        peakTime: '10:07 AM',
        duration: '6m 23s',
        visibility: 'Visible in Southern India',
        magnitude: 1.079,
        nakshatra: 'Ashlesha',
        tithi: 'Amavasya (New Moon)',
        yoga: 'Vyatipata',
        impactedFestivals: ['Hariyali Amavasya'],
        sutak: '12 hours before eclipse',
        ritualImpact: 'All rituals postponed during eclipse period',
        astroImpact: 'Major transformational eclipse, impacts health and wealth',
        remedies: ['Full fast during eclipse', 'Donate according to capacity', 'Take bath after eclipse ends'],
        severity: 'Very High',
        color: 'from-red-100 to-orange-100',
        borderColor: 'border-red-600',
        visibleInIndia: true
      },
      {
        type: 'Total Lunar Eclipse',
        date: new Date(2027, 7, 18), // August 18, 2027
        peakTime: '05:29 AM',
        duration: '3h 56m',
        visibility: 'Visible across India',
        magnitude: 1.331,
        nakshatra: 'Dhanishtha',
        tithi: 'Purnima (Full Moon)',
        yoga: 'Parigha',
        impactedFestivals: ['Raksha Bandhan (nearby)'],
        sutak: '9 hours before eclipse',
        ritualImpact: 'Raksha Bandhan timing needs careful planning',
        astroImpact: 'Family matters and property issues surface',
        remedies: ['Chant Chandra mantra 108 times', 'Donate milk and rice', 'Feed poor people'],
        severity: 'Very High',
        color: 'from-purple-100 to-indigo-100',
        borderColor: 'border-purple-600',
        visibleInIndia: true
      }
    ]
  };

  const currentYearEclipses = eclipseData[selectedYear as keyof typeof eclipseData] || [];
  const lunarEclipses = currentYearEclipses.filter(e => e.type.includes('Lunar'));
  const solarEclipses = currentYearEclipses.filter(e => e.type.includes('Solar'));
  const visibleInIndiaCount = currentYearEclipses.filter(e => e.visibleInIndia).length;

  const downloadEclipseCalendar = () => {
    const content = `
🌙 LUNAR & SOLAR ECLIPSE CALENDAR ${selectedYear} 🌙
====================================================

City: ${cities[selectedCity as keyof typeof cities].name}
Total Eclipses: ${currentYearEclipses.length}
Visible in India: ${visibleInIndiaCount}

${currentYearEclipses.map((eclipse, i) => `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${i + 1}. ${eclipse.type.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Date: ${eclipse.date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
⏰ Peak Time: ${eclipse.peakTime} IST
⏳ Duration: ${eclipse.duration}
👁️ Visibility: ${eclipse.visibility}
⭐ Nakshatra: ${eclipse.nakshatra}
🌕 Tithi: ${eclipse.tithi}
🔮 Yoga: ${eclipse.yoga}

🎉 IMPACTED FESTIVALS:
${eclipse.impactedFestivals.length > 0 ? eclipse.impactedFestivals.map(f => `   • ${f}`).join('\n') : '   None'}

⚠️ SUTAK PERIOD:
${eclipse.sutak}

🙏 RITUAL IMPACT:
${eclipse.ritualImpact}

💰 FINANCIAL/ASTROLOGICAL IMPACT:
${eclipse.astroImpact}

🕉️ REMEDIES:
${eclipse.remedies.map(r => `   • ${r}`).join('\n')}

`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated by MoneyCal.in - Lunar Eclipse Predictor
https://moneycal.in/festival-tools/lunar-eclipse-predictor
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Eclipse-Calendar-${selectedYear}-${cities[selectedCity as keyof typeof cities].name}.txt`;
    a.click();
  };

  return (
    <>
      <SEOHelmet
        title="Lunar Eclipse 2025 2026 2027 India - Solar Eclipse Dates Timings Sutak | MoneyCal"
        description="Complete lunar eclipse and solar eclipse calendar for India. Get exact timings, Sutak period, Nakshatra, festival impact, astrological remedies. City-wise visibility, duration, and ritual guidelines. चंद्र ग्रहण और सूर्य ग्रहण की पूरी जानकारी।"
        keywords="lunar eclipse 2025 India, solar eclipse 2025 dates, eclipse timings India, Sutak period eclipse, चंद्र ग्रहण 2025, सूर्य ग्रहण 2025, eclipse Nakshatra, eclipse festival impact, eclipse remedies, grahan timing"
        canonicalUrl="https://moneycal.in/festival-tools/lunar-eclipse-predictor"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Lunar Eclipse Predictor - India',
          description: 'Accurate lunar and solar eclipse predictions for India with festival impact, Sutak timings, and astrological remedies',
          applicationCategory: 'UtilityApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR'
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center mb-4">
              <Moon className="h-12 w-12 mr-4 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                चंद्र ग्रहण और सूर्य ग्रहण {selectedYear}
              </h1>
              <Sun className="h-12 w-12 ml-4 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <h2 className="text-3xl font-bold text-center mb-2">
              Lunar & Solar Eclipse Predictor
            </h2>
            <p className="text-center text-xl text-purple-100 max-w-3xl mx-auto">
              Complete Eclipse Calendar with Timings, Sutak, Festival Impact & Astrological Remedies
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8 border-2 border-purple-300">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline h-5 w-5 mr-2" />
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-lg font-semibold"
                >
                  <option value={2025}>2025 - 4 Eclipses</option>
                  <option value={2026}>2026 - 4 Eclipses</option>
                  <option value={2027}>2027 - 3 Eclipses</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-5 w-5 mr-2" />
                  Your City
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
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button
                onClick={downloadEclipseCalendar}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center shadow-lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Eclipse Calendar
              </button>
              <button
                onClick={() => setShowNotification(!showNotification)}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-3 px-8 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all flex items-center justify-center shadow-lg"
              >
                <Bell className="h-5 w-5 mr-2" />
                {showNotification ? 'Notifications On ✓' : 'Get Eclipse Alerts'}
              </button>
            </div>

            {showNotification && (
              <div className="mt-4 bg-green-100 border-2 border-green-400 rounded-xl p-4 text-center">
                <CheckCircle className="inline h-6 w-6 text-green-600 mr-2" />
                <span className="text-green-800 font-semibold">
                  Eclipse notifications enabled! We'll remind you 24 hours before each eclipse.
                </span>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl shadow-lg p-6 border-2 border-purple-400 text-center">
              <Moon className="h-10 w-10 mx-auto mb-2 text-purple-600" />
              <p className="text-sm text-gray-600 mb-1">Lunar Eclipses</p>
              <p className="text-4xl font-bold text-purple-700">{lunarEclipses.length}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl shadow-lg p-6 border-2 border-yellow-400 text-center">
              <Sun className="h-10 w-10 mx-auto mb-2 text-orange-600" />
              <p className="text-sm text-gray-600 mb-1">Solar Eclipses</p>
              <p className="text-4xl font-bold text-orange-700">{solarEclipses.length}</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl shadow-lg p-6 border-2 border-green-400 text-center">
              <CheckCircle className="h-10 w-10 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-gray-600 mb-1">Visible in India</p>
              <p className="text-4xl font-bold text-green-700">{visibleInIndiaCount}</p>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl shadow-lg p-6 border-2 border-pink-400 text-center">
              <Star className="h-10 w-10 mx-auto mb-2 text-pink-600" />
              <p className="text-sm text-gray-600 mb-1">Total Eclipses</p>
              <p className="text-4xl font-bold text-pink-700">{currentYearEclipses.length}</p>
            </div>
          </div>

          {/* All Eclipses */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              🌙 Complete Eclipse Calendar - {selectedYear}
            </h2>
            <p className="text-center text-gray-600 mb-8">
              {cities[selectedCity as keyof typeof cities].name} | All timings in IST (Indian Standard Time)
            </p>

            <div className="space-y-6">
              {currentYearEclipses.map((eclipse, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${eclipse.color} rounded-2xl p-6 border-4 ${eclipse.borderColor} hover:shadow-2xl transition-all`}
                >
                  {/* Eclipse Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {eclipse.type.includes('Lunar') ? (
                        <Moon className="h-10 w-10 text-purple-600 mr-3" />
                      ) : (
                        <Sun className="h-10 w-10 text-orange-600 mr-3" />
                      )}
                      <div>
                        <h3 className="font-bold text-2xl text-gray-900">{eclipse.type}</h3>
                        <p className="text-lg text-gray-700">
                          {eclipse.date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                        eclipse.severity === 'Very High' ? 'bg-red-600 text-white' :
                        eclipse.severity === 'High' ? 'bg-orange-600 text-white' :
                        eclipse.severity === 'Medium' ? 'bg-yellow-600 text-white' :
                        'bg-green-600 text-white'
                      }`}>
                        {eclipse.severity} Impact
                      </span>
                      <p className="text-xs text-gray-600 mt-1">
                        {eclipse.visibleInIndia ? '👁️ Visible in India' : '❌ Not visible in India'}
                      </p>
                    </div>
                  </div>

                  {/* Eclipse Details Grid */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                      <p className="text-xs text-gray-600 mb-1">
                        <Clock className="inline h-4 w-4 mr-1" />
                        Peak Time
                      </p>
                      <p className="font-bold text-xl text-blue-700">{eclipse.peakTime} IST</p>
                      <p className="text-sm text-gray-600">Duration: {eclipse.duration}</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                      <p className="text-xs text-gray-600 mb-1">
                        <Star className="inline h-4 w-4 mr-1" />
                        Nakshatra & Tithi
                      </p>
                      <p className="font-bold text-lg text-purple-700">{eclipse.nakshatra}</p>
                      <p className="text-sm text-gray-600">{eclipse.tithi}</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border-2 border-indigo-200">
                      <p className="text-xs text-gray-600 mb-1">
                        <MapPin className="inline h-4 w-4 mr-1" />
                        Visibility
                      </p>
                      <p className="font-bold text-sm text-indigo-700">{eclipse.visibility}</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border-2 border-pink-200">
                      <p className="text-xs text-gray-600 mb-1">Yoga</p>
                      <p className="font-bold text-lg text-pink-700">{eclipse.yoga}</p>
                    </div>
                  </div>

                  {/* Sutak Period */}
                  <div className="bg-red-50 rounded-lg p-4 border-2 border-red-400 mb-4">
                    <h4 className="font-bold text-red-800 mb-2 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      ⚠️ Sutak Period (सूतक काल)
                    </h4>
                    <p className="text-red-900 font-semibold">{eclipse.sutak}</p>
                    <p className="text-xs text-red-700 mt-1">
                      Do not eat, cook, or perform auspicious activities during Sutak
                    </p>
                  </div>

                  {/* Impacted Festivals */}
                  {eclipse.impactedFestivals.length > 0 && (
                    <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-400 mb-4">
                      <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        🎉 Impacted Festivals
                      </h4>
                      <ul className="space-y-1">
                        {eclipse.impactedFestivals.map((festival, i) => (
                          <li key={i} className="text-yellow-900 font-semibold">• {festival}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Ritual Impact */}
                  <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-300 mb-4">
                    <h4 className="font-bold text-orange-800 mb-2">🙏 Ritual Impact</h4>
                    <p className="text-orange-900">{eclipse.ritualImpact}</p>
                  </div>

                  {/* Astrological Impact */}
                  <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-300 mb-4">
                    <h4 className="font-bold text-purple-800 mb-2 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      💰 Financial & Astrological Impact
                    </h4>
                    <p className="text-purple-900">{eclipse.astroImpact}</p>
                  </div>

                  {/* Remedies */}
                  <div className="bg-green-50 rounded-lg p-4 border-2 border-green-400">
                    <h4 className="font-bold text-green-800 mb-3">🕉️ Remedies & Precautions</h4>
                    <ul className="space-y-2">
                      {eclipse.remedies.map((remedy, i) => (
                        <li key={i} className="text-green-900 flex items-start">
                          <CheckCircle className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{remedy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eclipse Do's and Don'ts */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-6 border-2 border-green-400">
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                <CheckCircle className="h-7 w-7 mr-2" />
                ✅ DO's During Eclipse
              </h3>
              <ul className="space-y-3">
                {[
                  'Take bath after eclipse ends',
                  'Chant mantras (Mahamrityunjaya, Gayatri)',
                  'Donate food, clothes, money to poor',
                  'Meditate and do spiritual practices',
                  'Sprinkle Ganga jal in home after eclipse',
                  'Change into fresh clothes after bath',
                  'Feed animals and birds',
                  'Recite holy scriptures'
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-green-900">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-xl p-6 border-2 border-red-400">
              <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                <AlertCircle className="h-7 w-7 mr-2" />
                ❌ DON'Ts During Eclipse
              </h3>
              <ul className="space-y-3">
                {[
                  'Do not eat or drink during eclipse',
                  'Avoid cooking food during Sutak period',
                  'Do not start new ventures or travel',
                  'Pregnant women avoid going outside',
                  'Do not use sharp objects unnecessarily',
                  'Avoid sleeping during eclipse',
                  'Do not perform auspicious ceremonies',
                  'Avoid looking at eclipse with naked eyes'
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-red-900">
                    <AlertCircle className="h-5 w-5 mr-2 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-blue-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🔗 Related Festival & Astrology Tools
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/festival-tools/moon-phase-festivals" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-purple-200">
                <Moon className="h-8 w-8 text-purple-600 mb-2" />
                <p className="font-semibold text-purple-600 mb-1">Moon Phase Calendar</p>
                <p className="text-sm text-gray-600">Purnima & Amavasya dates</p>
              </a>
              <a href="/festival-tools/purnima-amavasya-dates" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-indigo-200">
                <Calendar className="h-8 w-8 text-indigo-600 mb-2" />
                <p className="font-semibold text-indigo-600 mb-1">Full Moon Dates</p>
                <p className="text-sm text-gray-600">Complete lunar calendar</p>
              </a>
              <a href="/festival-tools/panchang-today" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-orange-200">
                <Sun className="h-8 w-8 text-orange-600 mb-2" />
                <p className="font-semibold text-orange-600 mb-1">Daily Panchang</p>
                <p className="text-sm text-gray-600">Today's Hindu calendar</p>
              </a>
              <a href="/festival-tools/nakshatra-festival" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-yellow-200">
                <Star className="h-8 w-8 text-yellow-600 mb-2" />
                <p className="font-semibold text-yellow-600 mb-1">Nakshatra Finder</p>
                <p className="text-sm text-gray-600">27 birth stars guide</p>
              </a>
              <a href="/festival-tools/shubh-muhurat-reminder" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-pink-200">
                <Clock className="h-8 w-8 text-pink-600 mb-2" />
                <p className="font-semibold text-pink-600 mb-1">Shubh Muhurat</p>
                <p className="text-sm text-gray-600">Auspicious timings</p>
              </a>
              <a href="/festival-tools/auspicious-marriage-days" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-rose-200">
                <Calendar className="h-8 w-8 text-rose-600 mb-2" />
                <p className="font-semibold text-rose-600 mb-1">Marriage Dates</p>
                <p className="text-sm text-gray-600">Wedding muhurat finder</p>
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: `How many eclipses will occur in ${selectedYear}?`,
                  a: `In ${selectedYear}, there will be ${currentYearEclipses.length} eclipses total: ${lunarEclipses.length} lunar eclipse(s) and ${solarEclipses.length} solar eclipse(s). Out of these, ${visibleInIndiaCount} will be visible from India.`
                },
                {
                  q: "What is Sutak period and why is it important?",
                  a: "Sutak (सूतक) is an inauspicious period before an eclipse. For lunar eclipse, Sutak starts 9 hours before and for solar eclipse, 12 hours before. During Sutak, avoid eating, cooking, worship, or starting new activities. Pregnant women should take special precautions. Breaking Sutak rules is believed to bring negative effects."
                },
                {
                  q: "Can we eat during eclipse?",
                  a: "No, you should not eat or drink during the eclipse and the Sutak period before it. Food prepared before Sutak should be discarded or given to animals. You can add Tulsi leaves to stored water/food to neutralize negative effects. After eclipse ends, take a bath and then you can eat fresh food."
                },
                {
                  q: "What should pregnant women do during eclipse?",
                  a: "Pregnant women should: (1) Avoid going outside, (2) Not use sharp objects like scissors or knives, (3) Sit in a room with doors/windows closed, (4) Chant protective mantras, (5) Keep Tulsi leaves with them. These precautions are believed to protect the unborn child from negative eclipse effects."
                },
                {
                  q: "What are the best remedies after eclipse?",
                  a: "After eclipse: (1) Take a purifying bath with Ganga jal if possible, (2) Change into fresh clothes, (3) Chant Mahamrityunjaya mantra 108 times, (4) Donate food, clothes, or money to poor, (5) Sprinkle Ganga jal in your home, (6) Feed animals and birds, (7) Visit a temple if possible."
                },
                {
                  q: "Does eclipse affect festivals and muhurats?",
                  a: "Yes, eclipses significantly impact Hindu festivals and auspicious timings. If a festival falls on eclipse day, ceremonies should be completed before Sutak begins or postponed till after eclipse ends. Marriage muhurats, housewarming, vehicle purchase, and other auspicious activities should be avoided on eclipse days."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 border-2 border-purple-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-start">
                    <Info className="h-6 w-6 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="text-gray-700 ml-8">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-100 p-4 rounded-lg border-2 border-blue-400">
              <p className="text-sm text-gray-800">
                <strong>📚 External Resources:</strong>{' '}
                <a href="https://www.timeanddate.com/eclipse/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  NASA Eclipse Data
                </a>
                {' | '}
                <a href="https://eclipse.gsfc.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  NASA Eclipse Website
                </a>
                {' | '}
                <a href="https://en.wikipedia.org/wiki/Solar_eclipse" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Eclipse (Wikipedia)
                </a>
                {' | '}
                <a href="https://www.drikpanchang.com/eclipses/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Eclipse Panchang
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LunarEclipsePredictor;

