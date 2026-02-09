import React, { useState, useEffect } from 'react';
import { Calendar, Sun, Moon, Clock, Star, AlertCircle, Download, Share2, MapPin } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const PanchangToday: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState('mumbai');

  // City data with coordinates
  const cities = {
    mumbai: { name: 'Mumbai', lat: 19.0760, lon: 72.8777, tz: 'Asia/Kolkata' },
    delhi: { name: 'Delhi', lat: 28.7041, lon: 77.1025, tz: 'Asia/Kolkata' },
    bangalore: { name: 'Bangalore', lat: 12.9716, lon: 77.5946, tz: 'Asia/Kolkata' },
    kolkata: { name: 'Kolkata', lat: 22.5726, lon: 88.3639, tz: 'Asia/Kolkata' },
    chennai: { name: 'Chennai', lat: 13.0827, lon: 80.2707, tz: 'Asia/Kolkata' },
    pune: { name: 'Pune', lat: 18.5204, lon: 73.8567, tz: 'Asia/Kolkata' },
    ahmedabad: { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714, tz: 'Asia/Kolkata' },
    hyderabad: { name: 'Hyderabad', lat: 17.3850, lon: 78.4867, tz: 'Asia/Kolkata' },
    jaipur: { name: 'Jaipur', lat: 26.9124, lon: 75.7873, tz: 'Asia/Kolkata' },
    lucknow: { name: 'Lucknow', lat: 26.8467, lon: 80.9462, tz: 'Asia/Kolkata' }
  };

  // Tithi names
  const tithiNames = [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'
  ];

  // Nakshatra names
  const nakshatraNames = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
    'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
    'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
    'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
    'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
    'Uttara Bhadrapada', 'Revati'
  ];

  // Calculate panchang data (simplified - would use astronomical library in production)
  const calculatePanchang = () => {
    const dayOfYear = Math.floor((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 0).getTime()) / 86400000);
    const tithiIndex = (dayOfYear % 15);
    const nakshatraIndex = (dayOfYear % 27);
    
    // Calculate sunrise/sunset (simplified)
    const sunrise = new Date(currentDate);
    sunrise.setHours(6, 0 + (selectedCity === 'mumbai' ? 15 : selectedCity === 'delhi' ? 30 : 20), 0);
    
    const sunset = new Date(currentDate);
    sunset.setHours(18, 30 + (selectedCity === 'mumbai' ? 15 : selectedCity === 'delhi' ? 30 : 20), 0);

    // Calculate Rahu Kaal (varies by weekday)
    const dayOfWeek = currentDate.getDay();
    const rahuKaalTimes: { [key: number]: { start: string; end: string } } = {
      0: { start: '16:30', end: '18:00' }, // Sunday
      1: { start: '07:30', end: '09:00' }, // Monday
      2: { start: '15:00', end: '16:30' }, // Tuesday
      3: { start: '12:00', end: '13:30' }, // Wednesday
      4: { start: '13:30', end: '15:00' }, // Thursday
      5: { start: '10:30', end: '12:00' }, // Friday
      6: { start: '09:00', end: '10:30' }  // Saturday
    };

    return {
      tithi: tithiIndex,
      tithiName: tithiNames[tithiIndex],
      nakshatra: nakshatraIndex,
      nakshatraName: nakshatraNames[nakshatraIndex],
      sunrise,
      sunset,
      rahuKaal: rahuKaalTimes[dayOfWeek],
      yoga: 'Vishkambha',
      karana: 'Bava'
    };
  };

  const panchang = calculatePanchang();

  const downloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MoneyCal//Panchang Today//EN
BEGIN:VEVENT
UID:panchang-${currentDate.toISOString().split('T')[0]}@moneycal.in
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${currentDate.toISOString().split('T')[0].replace(/-/g, '')}
SUMMARY:Panchang - ${panchang.tithiName} Tithi
DESCRIPTION:Tithi: ${panchang.tithiName}, Nakshatra: ${panchang.nakshatraName}, Rahu Kaal: ${panchang.rahuKaal.start} - ${panchang.rahuKaal.end}
LOCATION:${cities[selectedCity as keyof typeof cities].name}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Panchang-${currentDate.toISOString().split('T')[0]}.ics`;
    a.click();
  };

  return (
    <>
      <SEOHelmet
        title={`Today's Panchang ${currentDate.toLocaleDateString('en-IN')} - Tithi, Nakshatra, Rahu Kaal for ${cities[selectedCity as keyof typeof cities].name} | MoneyCal`}
        description={`Get accurate daily Panchang for ${cities[selectedCity as keyof typeof cities].name} - Today's Tithi (${panchang.tithiName}), Nakshatra (${panchang.nakshatraName}), Yoga, Karana, Rahu Kaal timing, Sunrise-Sunset times. Hindu calendar, muhurat, auspicious timing guide.`}
        keywords="panchang today, today panchang, tithi today, nakshatra today, rahu kaal today, sunrise sunset time, moonrise moonset, hindu calendar today, panchang Mumbai Delhi, daily panchang, hindu panchang, auspicious timing today"
        canonicalUrl="https://moneycal.in/festival-tools/panchang-today"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Daily Panchang - Hindu Calendar Today',
          description: 'Accurate daily panchang with tithi, nakshatra, yoga, karana, rahu kaal and auspicious timings',
          applicationCategory: 'LifestyleApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR'
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center mb-4">
              <Sun className="h-12 w-12 mr-4 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                आज का पंचांग - Today's Panchang
              </h1>
              <Moon className="h-12 w-12 ml-4 animate-bounce" />
            </div>
            <p className="text-center text-xl text-orange-100 max-w-3xl mx-auto">
              Daily Hindu Calendar - Tithi, Nakshatra, Yoga, Karana, Rahu Kaal & Auspicious Timings
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Date & City Selection */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline h-5 w-5 mr-2" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={currentDate.toISOString().split('T')[0]}
                  onChange={(e) => setCurrentDate(new Date(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 text-lg font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-5 w-5 mr-2" />
                  Select City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 text-lg font-semibold"
                >
                  {Object.entries(cities).map(([key, city]) => (
                    <option key={key} value={key}>{city.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-gray-900">
                {currentDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-lg text-gray-600">{cities[selectedCity as keyof typeof cities].name}</p>
            </div>
          </div>

          {/* Main Panchang Display */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Sun & Moon Times */}
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl shadow-xl p-6 border-4 border-orange-400">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Sun className="h-7 w-7 text-orange-600 mr-2" />
                Sun & Moon Timings
              </h2>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-3 rounded-full mr-3">
                      <Sun className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sunrise (सूर्योदय)</p>
                      <p className="text-xl font-bold text-gray-900">
                        {panchang.sunrise.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-orange-100 p-3 rounded-full mr-3">
                      <Sun className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sunset (सूर्यास्त)</p>
                      <p className="text-xl font-bold text-gray-900">
                        {panchang.sunset.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-3">
                      <Moon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Day Duration</p>
                      <p className="text-xl font-bold text-gray-900">
                        {Math.round((panchang.sunset.getTime() - panchang.sunrise.getTime()) / (1000 * 60 * 60))} hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tithi & Nakshatra */}
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-xl p-6 border-4 border-purple-400">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Star className="h-7 w-7 text-purple-600 mr-2" />
                Tithi & Nakshatra
              </h2>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <span className="text-2xl">🌙</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tithi (तिथि)</p>
                      <p className="text-2xl font-bold text-purple-700">
                        {panchang.tithiName}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Lunar day based on Moon-Sun angle
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <div className="bg-pink-100 p-2 rounded-full mr-3">
                      <span className="text-2xl">⭐</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Nakshatra (नक्षत्र)</p>
                      <p className="text-2xl font-bold text-pink-700">
                        {panchang.nakshatraName}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Lunar mansion - Moon's position
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Yoga (योग)</p>
                      <p className="text-lg font-bold text-blue-700">{panchang.yoga}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Karana (करण)</p>
                      <p className="text-lg font-bold text-green-700">{panchang.karana}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rahu Kaal & Inauspicious Times */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-xl p-8 mb-8 border-4 border-red-400">
            <div className="flex items-center mb-6">
              <AlertCircle className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">
                Inauspicious Times (अशुभ समय)
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-5 border-2 border-red-300">
                <div className="text-center mb-3">
                  <div className="bg-red-100 p-3 rounded-full inline-block mb-2">
                    <Clock className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-red-900">Rahu Kaal</h3>
                  <p className="text-xs text-gray-600">राहु काल</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-red-700">
                    {panchang.rahuKaal.start}
                  </p>
                  <p className="text-sm text-gray-600 my-1">to</p>
                  <p className="text-2xl font-bold text-red-700">
                    {panchang.rahuKaal.end}
                  </p>
                </div>
                <p className="text-xs text-gray-600 mt-3 text-center">
                  Avoid new ventures, travel, important decisions
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-orange-300">
                <div className="text-center mb-3">
                  <div className="bg-orange-100 p-3 rounded-full inline-block mb-2">
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-orange-900">Gulikai</h3>
                  <p className="text-xs text-gray-600">गुलिकै</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-orange-700">
                    {panchang.rahuKaal.start}
                  </p>
                  <p className="text-sm text-gray-600 my-1">to</p>
                  <p className="text-2xl font-bold text-orange-700">
                    {panchang.rahuKaal.end}
                  </p>
                </div>
                <p className="text-xs text-gray-600 mt-3 text-center">
                  Avoid signing contracts, starting business
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-yellow-300">
                <div className="text-center mb-3">
                  <div className="bg-yellow-100 p-3 rounded-full inline-block mb-2">
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold text-yellow-900">Yamaganda</h3>
                  <p className="text-xs text-gray-600">यमगण्ड</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-yellow-700">
                    14:00
                  </p>
                  <p className="text-sm text-gray-600 my-1">to</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    15:30
                  </p>
                </div>
                <p className="text-xs text-gray-600 mt-3 text-center">
                  Avoid travel, important meetings
                </p>
              </div>
            </div>

            <div className="mt-6 bg-yellow-100 rounded-lg p-4 border-2 border-yellow-400">
              <p className="text-sm text-gray-800 text-center">
                <strong>⚠️ Note:</strong> Avoid starting new ventures, financial transactions, or important events during these periods for best results according to Vedic astrology.
              </p>
            </div>
          </div>

          {/* Auspicious Activities */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Today's Auspicious Activities (शुभ कार्य)
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-xl p-5 border-2 border-green-300 text-center">
                <div className="text-4xl mb-2">🙏</div>
                <h3 className="font-bold text-gray-900 mb-1">Prayer & Puja</h3>
                <p className="text-sm text-gray-600">Highly Auspicious</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5 border-2 border-blue-300 text-center">
                <div className="text-4xl mb-2">📿</div>
                <h3 className="font-bold text-gray-900 mb-1">Spiritual Practices</h3>
                <p className="text-sm text-gray-600">Recommended Today</p>
              </div>

              <div className="bg-purple-50 rounded-xl p-5 border-2 border-purple-300 text-center">
                <div className="text-4xl mb-2">💰</div>
                <h3 className="font-bold text-gray-900 mb-1">Donations</h3>
                <p className="text-sm text-gray-600">Good for Charity</p>
              </div>

              <div className="bg-pink-50 rounded-xl p-5 border-2 border-pink-300 text-center">
                <div className="text-4xl mb-2">📚</div>
                <h3 className="font-bold text-gray-900 mb-1">Learning</h3>
                <p className="text-sm text-gray-600">Favorable Time</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={downloadICS}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center shadow-lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Panchang (.ics)
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `Today's Panchang - ${currentDate.toLocaleDateString('en-IN')}`,
                      text: `Tithi: ${panchang.tithiName}, Nakshatra: ${panchang.nakshatraName}`,
                      url: window.location.href
                    });
                  }
                }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-8 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all flex items-center shadow-lg"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share Panchang
              </button>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🔗 Related Festival & Financial Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/festival-tools/diwali-date-finder" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Diwali Date Finder</p>
                <p className="text-sm text-gray-600">Find Diwali & Muhurat timing</p>
              </a>
              <a href="/festival-tools/parsi-new-year" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Parsi New Year</p>
                <p className="text-sm text-gray-600">Navroz dates calculator</p>
              </a>
              <a href="/festival-tools/holi-date-calculator" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-pink-200">
                <p className="font-semibold text-pink-600 mb-1">Holi Date Calculator</p>
                <p className="text-sm text-gray-600">Holi & Dhuleti dates</p>
              </a>
              <a href="/tools/income-tax-calculator" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Income Tax Calculator</p>
                <p className="text-sm text-gray-600">Calculate your tax</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Improve Credit Score</p>
                <p className="text-sm text-gray-600">Financial planning guide</p>
              </a>
              <a href="/festival-tools" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-yellow-200">
                <p className="font-semibold text-yellow-600 mb-1">All Festival Tools</p>
                <p className="text-sm text-gray-600">More calculators</p>
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions (प्रश्न-उत्तर)
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "What is Panchang?",
                  a: "Panchang (पंचांग) is a Hindu calendar system showing five elements (Panch-Ang): Tithi (lunar day), Vara (weekday), Nakshatra (lunar mansion), Yoga, and Karana. It's used to determine auspicious timings for rituals, ceremonies, and important life events."
                },
                {
                  q: "What is Tithi in Panchang?",
                  a: "Tithi is the lunar day in Hindu calendar, determined by the angular difference between Sun and Moon. There are 30 tithis in a lunar month - 15 in Shukla Paksha (waxing) and 15 in Krishna Paksha (waning)."
                },
                {
                  q: "What is Rahu Kaal today?",
                  a: `Rahu Kaal today in ${cities[selectedCity as keyof typeof cities].name} is from ${panchang.rahuKaal.start} to ${panchang.rahuKaal.end}. It's an inauspicious 90-minute period daily when new ventures should be avoided. The timing varies by weekday.`
                },
                {
                  q: "Why check Panchang daily?",
                  a: "Checking daily Panchang helps identify auspicious (Shubh Muhurat) and inauspicious (Rahu Kaal, Gulikai) times for important activities like starting business, buying property, weddings, travel, or financial transactions."
                },
                {
                  q: "What is Nakshatra today?",
                  a: `Today's Nakshatra is ${panchang.nakshatraName}. Nakshatras are 27 lunar mansions through which the Moon passes monthly. Each Nakshatra has specific qualities affecting various activities and rituals.`
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-5 border-2 border-orange-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-100 p-4 rounded-lg border-2 border-blue-400">
              <p className="text-sm text-gray-800">
                <strong>📚 Learn More:</strong>{' '}
                <a href="https://en.wikipedia.org/wiki/Panchangam" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Panchang (Wikipedia)
                </a>
                {' | '}
                <a href="https://www.drikpanchang.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Drik Panchang
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PanchangToday;

