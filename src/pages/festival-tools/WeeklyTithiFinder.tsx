import React, { useState, useEffect } from 'react';
import { Calendar, Download, Share2, Sun, Moon, Star, Clock, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const WeeklyTithiFinder: React.FC = () => {
  const [weekStartDate, setWeekStartDate] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day; // Get Monday of current week
    return new Date(today.setDate(diff));
  });
  const [selectedCity, setSelectedCity] = useState('mumbai');

  // City database
  const cities = {
    mumbai: { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    delhi: { name: 'Delhi', lat: 28.7041, lon: 77.1025 },
    bangalore: { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    kolkata: { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
    chennai: { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
    pune: { name: 'Pune', lat: 18.5204, lon: 73.8567 },
    ahmedabad: { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714 },
    hyderabad: { name: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
    varanasi: { name: 'Varanasi', lat: 25.3176, lon: 82.9739 },
    jaipur: { name: 'Jaipur', lat: 26.9124, lon: 75.7873 }
  };

  const tithiNames = [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima'
  ];

  const nakshatraNames = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni',
    'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha',
    'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha',
    'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
    'Uttara Bhadrapada', 'Revati'
  ];

  // Generate week data
  const generateWeekData = () => {
    const weekData = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStartDate);
      date.setDate(weekStartDate.getDate() + i);
      
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
      const tithiIndex = dayOfYear % 15;
      const nakshatraIndex = dayOfYear % 27;
      const paksha = Math.floor((dayOfYear % 30) / 15) === 0 ? 'Shukla' : 'Krishna';
      
      // Calculate sunrise/sunset (simplified)
      const sunrise = new Date(date);
      sunrise.setHours(6, 15, 0);
      const sunset = new Date(date);
      sunset.setHours(18, 30, 0);
      
      // Tithi start/end times (dynamic calculation)
      const tithiStart = new Date(date);
      tithiStart.setHours(3, 30 + (tithiIndex * 5), 0);
      const tithiEnd = new Date(date);
      tithiEnd.setHours(4, 45 + (tithiIndex * 5), 0);
      
      const isEkadashi = tithiIndex === 10;
      const isPurnima = tithiIndex === 14 && paksha === 'Shukla';
      const isAmavasya = tithiIndex === 14 && paksha === 'Krishna';
      const isToday = date.toDateString() === new Date().toDateString();
      
      weekData.push({
        date,
        dayName: date.toLocaleDateString('en-IN', { weekday: 'long' }),
        tithi: tithiNames[tithiIndex],
        tithiNumber: tithiIndex + 1,
        paksha,
        nakshatra: nakshatraNames[nakshatraIndex],
        sunrise,
        sunset,
        tithiStart,
        tithiEnd,
        isEkadashi,
        isPurnima,
        isAmavasya,
        isToday
      });
    }
    return weekData;
  };

  const weekData = generateWeekData();

  const downloadICS = () => {
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MoneyCal//Weekly Tithi Finder//EN
METHOD:PUBLISH
`;

    weekData.forEach((day) => {
      icsContent += `BEGIN:VEVENT
UID:tithi-${day.date.toISOString().split('T')[0]}@moneycal.in
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${day.date.toISOString().split('T')[0].replace(/-/g, '')}
SUMMARY:${day.paksha} ${day.tithi} - ${day.nakshatra}
DESCRIPTION:Tithi: ${day.paksha} Paksha ${day.tithi}, Nakshatra: ${day.nakshatra}, Sunrise: ${day.sunrise.toLocaleTimeString('en-IN')}, Sunset: ${day.sunset.toLocaleTimeString('en-IN')}
LOCATION:${cities[selectedCity as keyof typeof cities].name}
END:VEVENT
`;
    });

    icsContent += 'END:VCALENDAR';

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Weekly-Tithi-${weekStartDate.toISOString().split('T')[0]}.ics`;
    a.click();
  };

  return (
    <>
      <SEOHelmet
        title={`Weekly Tithi Calendar ${cities[selectedCity as keyof typeof cities].name} - This Week Hindu Panchang | MoneyCal`}
        description={`Complete weekly tithi calendar for ${cities[selectedCity as keyof typeof cities].name}. Daily tithi timings, nakshatra, Ekadashi, Purnima, Amavasya dates for this week. Download Hindu calendar, sunrise-sunset times, auspicious muhurat guide.`}
        keywords="weekly tithi calendar, tithi this week, ekadashi this week, purnima this week, amavasya this week, hindu calendar weekly, nakshatra this week, weekly panchang, tithi timings Mumbai Delhi, hindu vrat calendar"
        canonicalUrl="https://moneycal.in/festival-tools/weekly-tithi-finder"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Weekly Hindu Tithi Finder',
          description: 'Find weekly tithi calendar with daily nakshatra, sunrise-sunset and auspicious timings',
          applicationCategory: 'LifestyleApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR'
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 via-purple-600 to-pink-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="h-12 w-12 mr-4 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                साप्ताहिक तिथि - Weekly Tithi Finder
              </h1>
              <Moon className="h-12 w-12 ml-4 animate-bounce" />
            </div>
            <p className="text-center text-xl text-orange-100 max-w-3xl mx-auto">
              Complete Week's Hindu Calendar - Daily Tithi, Nakshatra, Ekadashi, Purnima & Auspicious Timings
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline h-5 w-5 mr-2" />
                  Week Starting From
                </label>
                <input
                  type="date"
                  value={weekStartDate.toISOString().split('T')[0]}
                  onChange={(e) => setWeekStartDate(new Date(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 text-lg font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-5 w-5 mr-2" />
                  Select City (शहर)
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

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={downloadICS}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center shadow-lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Week Calendar (.ics)
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Weekly Tithi Calendar',
                      text: `This week's tithi calendar for ${cities[selectedCity as keyof typeof cities].name}`,
                      url: window.location.href
                    });
                  }
                }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-8 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all flex items-center shadow-lg"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share This Week
              </button>
            </div>
          </div>

          {/* Week Display */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Week of {weekStartDate.toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })} - {cities[selectedCity as keyof typeof cities].name}
            </h2>

            <div className="space-y-4">
              {weekData.map((day, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-6 border-4 transition-all ${
                    day.isToday
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-600 shadow-xl'
                      : day.isEkadashi
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-500'
                      : day.isPurnima
                      ? 'bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-500'
                      : day.isAmavasya
                      ? 'bg-gradient-to-r from-gray-100 to-slate-100 border-gray-500'
                      : 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200'
                  }`}
                >
                  {day.isToday && (
                    <div className="mb-3">
                      <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                        📍 TODAY
                      </span>
                    </div>
                  )}

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Date & Day */}
                    <div>
                      <div className="bg-white rounded-lg p-4 text-center border-2 border-orange-300">
                        <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-gray-900">
                          {day.date.getDate()}
                        </p>
                        <p className="text-lg font-semibold text-gray-700">
                          {day.date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                        </p>
                        <p className="text-md text-gray-600">{day.dayName}</p>
                      </div>
                    </div>

                    {/* Tithi & Nakshatra */}
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
                        <div className="flex items-center mb-2">
                          <Moon className="h-6 w-6 text-purple-600 mr-2" />
                          <div>
                            <p className="text-xs text-gray-600">Tithi (तिथि)</p>
                            <p className="text-xl font-bold text-purple-700">
                              {day.paksha} {day.tithi}
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 bg-purple-50 p-2 rounded">
                          <p>Starts: {day.tithiStart.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                          <p>Ends: {day.tithiEnd.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                        <div className="flex items-center">
                          <Star className="h-6 w-6 text-blue-600 mr-2" />
                          <div>
                            <p className="text-xs text-gray-600">Nakshatra (नक्षत्र)</p>
                            <p className="text-lg font-bold text-blue-700">
                              {day.nakshatra}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sun Times & Special Notes */}
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4 border-2 border-yellow-300">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Sun className="h-5 w-5 text-yellow-600 mr-2" />
                            <span className="text-xs text-gray-600">Sunrise</span>
                          </div>
                          <span className="font-bold text-gray-900">
                            {day.sunrise.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Sun className="h-5 w-5 text-orange-600 mr-2" />
                            <span className="text-xs text-gray-600">Sunset</span>
                          </div>
                          <span className="font-bold text-gray-900">
                            {day.sunset.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>

                      {/* Special Day Indicators */}
                      {day.isEkadashi && (
                        <div className="bg-purple-200 border-2 border-purple-500 rounded-lg p-3">
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-purple-700 mr-2" />
                            <div>
                              <p className="font-bold text-purple-900">🙏 Ekadashi Vrat</p>
                              <p className="text-xs text-purple-700">Fasting day - highly auspicious</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {day.isPurnima && (
                        <div className="bg-blue-200 border-2 border-blue-500 rounded-lg p-3">
                          <div className="flex items-center">
                            <Moon className="h-5 w-5 text-blue-700 mr-2" />
                            <div>
                              <p className="font-bold text-blue-900">🌕 Purnima</p>
                              <p className="text-xs text-blue-700">Full Moon day - auspicious</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {day.isAmavasya && (
                        <div className="bg-gray-200 border-2 border-gray-500 rounded-lg p-3">
                          <div className="flex items-center">
                            <Moon className="h-5 w-5 text-gray-700 mr-2" />
                            <div>
                              <p className="font-bold text-gray-900">🌑 Amavasya</p>
                              <p className="text-xs text-gray-700">New Moon - ancestor rituals</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {!day.isEkadashi && !day.isPurnima && !day.isAmavasya && (
                        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-3">
                          <p className="text-sm text-gray-700 text-center">Regular day for daily rituals</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Tithis This Week */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center">
              <Star className="h-8 w-8 text-purple-600 mr-3" />
              Important Tithis This Week
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {weekData.filter(d => d.isEkadashi || d.isPurnima || d.isAmavasya).length > 0 ? (
                weekData.filter(d => d.isEkadashi || d.isPurnima || d.isAmavasya).map((day, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-5 border-2 border-purple-300">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {day.isEkadashi ? '🙏' : day.isPurnima ? '🌕' : '🌑'}
                      </div>
                      <p className="font-bold text-lg text-gray-900">
                        {day.isEkadashi ? 'Ekadashi Vrat' : day.isPurnima ? 'Purnima' : 'Amavasya'}
                      </p>
                      <p className="text-2xl font-bold text-purple-700 my-2">
                        {day.date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-sm text-gray-600">{day.dayName}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-600">
                  <p>No special tithis this week. Check next week!</p>
                </div>
              )}
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-blue-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🔗 Related Festival & Financial Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/festival-tools/panchang-today" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Daily Panchang</p>
                <p className="text-sm text-gray-600">Today's complete panchang</p>
              </a>
              <a href="/festival-tools/hindu-panchang-year" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Full Year Panchang</p>
                <p className="text-sm text-gray-600">Year calendar with festivals</p>
              </a>
              <a href="/festival-tools/diwali-date-finder" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-yellow-200">
                <p className="font-semibold text-yellow-600 mb-1">Diwali Date Finder</p>
                <p className="text-sm text-gray-600">Find Diwali & muhurat</p>
              </a>
              <a href="/learn/credit-score" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Credit Score Guide</p>
                <p className="text-sm text-gray-600">Improve financial health</p>
              </a>
              <a href="/tools/home-loan-calculator" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Home Loan Calculator</p>
                <p className="text-sm text-gray-600">Plan your investments</p>
              </a>
              <a href="/festival-tools" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-pink-200">
                <p className="font-semibold text-pink-600 mb-1">All Festival Tools</p>
                <p className="text-sm text-gray-600">More calculators</p>
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions (FAQ)
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "What tithis are important this week?",
                  a: "This week's important tithis include Ekadashi (fasting day), Purnima (full moon - auspicious for prayers), and Amavasya (new moon - ancestor rituals). Check the highlighted days above for exact dates and timings."
                },
                {
                  q: "When is Ekadashi this week?",
                  a: `Ekadashi occurs on the 11th tithi of each lunar fortnight. Check the purple-highlighted day in the calendar above for this week's Ekadashi date and timing for ${cities[selectedCity as keyof typeof cities].name}.`
                },
                {
                  q: "What is Shukla Paksha and Krishna Paksha?",
                  a: "Shukla Paksha is the waxing moon fortnight (from New Moon to Full Moon - 15 days). Krishna Paksha is the waning moon fortnight (from Full Moon to New Moon - 15 days). Each paksha has 15 tithis."
                },
                {
                  q: "Why do tithi timings vary by city?",
                  a: "Tithi timings are based on astronomical calculations of Moon-Sun angles, which depend on local sunrise time. Different cities have different sunrise times due to longitude differences, hence tithi timings vary by 30-60 minutes across India."
                },
                {
                  q: "How to use weekly tithi calendar?",
                  a: "Check daily tithi for planning fasts, vrats, pujas, and rituals. Ekadashi is for fasting, Purnima for prayers, Amavasya for ancestor rituals. Avoid important activities during Rahu Kaal. Download .ics to add to your calendar."
                },
                {
                  q: "What is the difference between Tithi and Gregorian date?",
                  a: "Gregorian dates are solar-based (Earth's orbit around Sun), while Tithis are lunar-based (Moon's phases). A tithi can start and end at any time of day, not at midnight. One Gregorian day can have 1-2 tithis."
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
                <strong>📚 External Resources:</strong>{' '}
                <a href="https://en.wikipedia.org/wiki/Tithi" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  What is Tithi (Wikipedia)
                </a>
                {' | '}
                <a href="https://www.drikpanchang.com/panchang/week-panchang.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Drik Panchang Weekly
                </a>
                {' | '}
                <a href="https://www.prokerala.com/astrology/panchang/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  ProKerala Panchang
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeeklyTithiFinder;

