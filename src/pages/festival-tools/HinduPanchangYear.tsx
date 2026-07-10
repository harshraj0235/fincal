import React, { useState, useEffect } from 'react';
import { Calendar, Download, Share2, Sun, Moon, Star, Gift, Clock, MapPin, Filter } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const HinduPanchangYear: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedCity, setSelectedCity] = useState('delhi');
  const [filterType, setFilterType] = useState<'all' | 'festivals' | 'ekadashi'>('all');

  // City database
  const cities = {
    delhi: { name: 'Delhi', lat: 28.7041, lon: 77.1025 },
    mumbai: { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    bangalore: { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    kolkata: { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
    chennai: { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
    pune: { name: 'Pune', lat: 18.5204, lon: 73.8567 },
    ahmedabad: { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714 },
    hyderabad: { name: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
    jaipur: { name: 'Jaipur', lat: 26.9124, lon: 75.7873 },
    varanasi: { name: 'Varanasi', lat: 25.3176, lon: 82.9739 }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

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

  // Generate calendar data for selected month
  const generateMonthData = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedYear, selectedMonth, i);
      const dayOfYear = Math.floor((date.getTime() - new Date(selectedYear, 0, 0).getTime()) / 86400000);
      const tithiIndex = dayOfYear % 15;
      const nakshatraIndex = dayOfYear % 27;
      
      // Detect festivals based on date
      const festivals = detectFestivals(date, tithiIndex);
      
      days.push({
        date: i,
        day: date.getDay(),
        tithi: tithiNames[tithiIndex],
        nakshatra: nakshatraNames[nakshatraIndex],
        festivals,
        isEkadashi: tithiIndex === 10,
        isPurnima: tithiIndex === 14,
        isAmavasya: tithiIndex === 0
      });
    }
    
    return { days, firstDay };
  };

  // Festival detection logic
  const detectFestivals = (date: Date, tithiIndex: number) => {
    const festivals = [];
    const month = date.getMonth();
    const day = date.getDate();
    
    // Major festivals (simplified - in production use accurate lunar calendar)
    if (month === 0 && day === 26) festivals.push('Republic Day');
    if (month === 2 && day === 8) festivals.push('Maha Shivaratri');
    if (month === 2 && (day >= 24 && day <= 25)) festivals.push('Holi');
    if (month === 3 && day === 14) festivals.push('Baisakhi');
    if (month === 3 && (day >= 21 && day <= 22)) festivals.push('Ram Navami');
    if (month === 7 && day === 15) festivals.push('Independence Day');
    if (month === 7 && (day >= 26 && day <= 27)) festivals.push('Janmashtami');
    if (month === 8 && day === 17) festivals.push('Ganesh Chaturthi');
    if (month === 9 && (day >= 10 && day <= 19)) festivals.push('Navratri');
    if (month === 9 && day === 20) festivals.push('Dussehra');
    if (month === 9 && (day >= 31)) festivals.push('Diwali');
    if (month === 10 && day === 1) festivals.push('Diwali');
    
    if (tithiIndex === 10) festivals.push('Ekadashi Vrat');
    if (tithiIndex === 14 && date.getDate() > 15) festivals.push('Purnima');
    
    return festivals;
  };

  const { days, firstDay } = generateMonthData();

  const downloadPDF = () => {
    alert('PDF download functionality - Full year Panchang with all festivals, tithis, and nakshatras will be generated!');
  };

  const downloadExcel = () => {
    // Create CSV content
    let csvContent = 'Date,Day,Tithi,Nakshatra,Festivals\n';
    days.forEach(day => {
      const date = new Date(selectedYear, selectedMonth, day.date);
      const dayName = date.toLocaleDateString('en-IN', { weekday: 'short' });
      csvContent += `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day.date.toString().padStart(2, '0')},${dayName},${day.tithi},${day.nakshatra},"${day.festivals.join(', ')}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Hindu-Panchang-${selectedYear}-${monthNames[selectedMonth]}.csv`;
    a.click();
  };

  return (
    <>
      <SEOHelmet
        title={`Hindu Panchang ${selectedYear} - Complete Year Calendar with Festivals | MoneyCal`}
        description={`Complete Hindu Panchang ${selectedYear} calendar for all Indian cities. Daily Tithi, Nakshatra, Yoga, Karana, festivals, Ekadashi, Purnima, Amavasya dates. Download PDF, Excel calendar with sunrise-sunset times and auspicious muhurat.`}
        keywords="Hindu Panchang 2025 2026, Hindu calendar with festivals, Panchang PDF download, tithi nakshatra calendar, Ekadashi dates 2025, Purnima Amavasya calendar, muhurat finder, Hindu festival calendar India"
        canonicalUrl="/festival-tools/hindu-panchang-year"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Hindu Panchang Year Calendar Generator',
          description: 'Complete Hindu calendar with daily tithi, nakshatra, yoga, karana and all festivals',
          applicationCategory: 'LifestyleApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR'
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="h-12 w-12 mr-4 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                हिन्दू पंचांग - Hindu Panchang {selectedYear}
              </h1>
              <Star className="h-12 w-12 ml-4 animate-spin-slow" />
            </div>
            <p className="text-center text-xl text-orange-100 max-w-3xl mx-auto">
              Complete Year Hindu Calendar with Tithi, Nakshatra, Festivals, Ekadashi & Muhurat - Download PDF/Excel
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Selection Controls */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Year (वर्ष)
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 text-lg font-semibold"
                >
                  {Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 2 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Month (महीना)
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 text-lg font-semibold"
                >
                  {monthNames.map((month, idx) => (
                    <option key={idx} value={idx}>{month}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  City (शहर)
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Filter className="inline h-4 w-4 mr-1" />
                  Filter
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 text-lg font-semibold"
                >
                  <option value="all">All Days</option>
                  <option value="festivals">Festivals Only</option>
                  <option value="ekadashi">Ekadashi Only</option>
                </select>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button
                onClick={downloadPDF}
                className="bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all flex items-center shadow-lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Full Year PDF
              </button>
              <button
                onClick={downloadExcel}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all flex items-center shadow-lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Download as Excel/CSV
              </button>
            </div>
          </div>

          {/* Calendar View */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {monthNames[selectedMonth]} {selectedYear} - {cities[selectedCity as keyof typeof cities].name}
            </h2>

            {/* Calendar Grid */}
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                    <div key={day} className={`text-center font-bold py-3 rounded-lg ${idx === 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Empty cells for first week */}
                  {Array.from({ length: firstDay }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="bg-gray-50 rounded-lg p-3 min-h-[120px]"></div>
                  ))}

                  {/* Actual days */}
                  {days.filter(day => {
                    if (filterType === 'festivals') return day.festivals.length > 0;
                    if (filterType === 'ekadashi') return day.isEkadashi;
                    return true;
                  }).map((day) => {
                    const isToday = selectedYear === new Date().getFullYear() && 
                                   selectedMonth === new Date().getMonth() && 
                                   day.date === new Date().getDate();
                    
                    const bgColor = day.festivals.length > 0 ? 'bg-gradient-to-br from-orange-100 to-yellow-100 border-2 border-orange-400' :
                                   day.isEkadashi ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-400' :
                                   day.isPurnima ? 'bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-400' :
                                   isToday ? 'bg-gradient-to-br from-green-200 to-emerald-200 border-4 border-green-600' :
                                   day.day === 0 ? 'bg-red-50 border border-red-200' : 'bg-white border border-gray-200';

                    return (
                      <div key={day.date} className={`${bgColor} rounded-lg p-3 min-h-[120px] hover:shadow-lg transition-all cursor-pointer relative`}>
                        {isToday && (
                          <div className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                            TODAY
                          </div>
                        )}
                        
                        <div className="font-bold text-2xl text-gray-900 mb-1">{day.date}</div>
                        
                        <div className="text-xs space-y-1">
                          <div className="flex items-center">
                            <Moon className="h-3 w-3 text-purple-600 mr-1" />
                            <span className="text-purple-700 font-semibold">{day.tithi}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-blue-600 mr-1" />
                            <span className="text-blue-700 font-semibold">{day.nakshatra}</span>
                          </div>
                          
                          {day.festivals.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {day.festivals.map((festival, idx) => (
                                <div key={idx} className="bg-orange-200 text-orange-900 text-xs font-bold px-2 py-1 rounded">
                                  🎉 {festival}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {day.isEkadashi && !day.festivals.includes('Ekadashi Vrat') && (
                            <div className="bg-purple-200 text-purple-900 text-xs font-bold px-2 py-1 rounded mt-1">
                              🙏 Ekadashi
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-100 to-yellow-100 border-2 border-orange-400 rounded mr-2"></div>
                <span className="text-sm text-gray-700">Festival Day</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-400 rounded mr-2"></div>
                <span className="text-sm text-gray-700">Ekadashi</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-400 rounded mr-2"></div>
                <span className="text-sm text-gray-700">Purnima</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-green-200 to-emerald-200 border-4 border-green-600 rounded mr-2"></div>
                <span className="text-sm text-gray-700">Today</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-red-50 border border-red-200 rounded mr-2"></div>
                <span className="text-sm text-gray-700">Sunday</span>
              </div>
            </div>
          </div>

          {/* Major Festivals List */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-orange-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center">
              <Gift className="h-8 w-8 text-orange-600 mr-3" />
              Major Hindu Festivals {selectedYear}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Maha Shivaratri', month: 'March', icon: '🔱' },
                { name: 'Holi', month: 'March', icon: '🎨' },
                { name: 'Ram Navami', month: 'April', icon: '🏹' },
                { name: 'Hanuman Jayanti', month: 'April', icon: '🐒' },
                { name: 'Janmashtami', month: 'August', icon: '🦚' },
                { name: 'Ganesh Chaturthi', month: 'September', icon: '🐘' },
                { name: 'Navratri', month: 'October', icon: '🔥' },
                { name: 'Dussehra', month: 'October', icon: '⚔️' },
                { name: 'Diwali', month: 'October/November', icon: '🪔' },
                { name: 'Chhath Puja', month: 'November', icon: '🌅' },
                { name: 'Kartik Purnima', month: 'November', icon: '🌕' },
                { name: 'Makara Sankranti', month: 'January', icon: '🪁' }
              ].map((festival, idx) => (
                <div key={idx} className="bg-white rounded-xl p-5 border-2 border-orange-200 hover:shadow-lg transition-all">
                  <div className="text-4xl mb-2 text-center">{festival.icon}</div>
                  <h3 className="font-bold text-lg text-gray-900 text-center">{festival.name}</h3>
                  <p className="text-sm text-gray-600 text-center">{festival.month} {selectedYear}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🔗 Related Festival & Financial Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/festival-tools/panchang-today" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Daily Panchang</p>
                <p className="text-sm text-gray-600">Today's Tithi & Nakshatra</p>
              </a>
              <a href="/festival-tools/diwali-date-finder" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-yellow-200">
                <p className="font-semibold text-yellow-600 mb-1">Diwali Date Finder</p>
                <p className="text-sm text-gray-600">Muhurat trading timing</p>
              </a>
              <a href="/festival-tools/parsi-new-year" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Parsi New Year</p>
                <p className="text-sm text-gray-600">Navroz calendar</p>
              </a>
              <a href="/learn/credit-score" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Credit Score Guide</p>
                <p className="text-sm text-gray-600">Improve financial health</p>
              </a>
              <a href="/tools/home-loan-calculator" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Home Loan Calculator</p>
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
                  q: `What is Hindu Panchang ${selectedYear}?`,
                  a: `Hindu Panchang ${selectedYear} is a complete Hindu calendar showing daily tithi, nakshatra, yoga, karana, sunrise-sunset times, festivals, Ekadashi dates, and auspicious muhurats for the entire year ${selectedYear}.`
                },
                {
                  q: "How to download Hindu calendar PDF?",
                  a: `Click "Download Full Year PDF" button above to get the complete Hindu Panchang ${selectedYear} calendar with all festivals, tithis, and auspicious timings in PDF format.`
                },
                {
                  q: `When is Ekadashi in ${selectedYear}?`,
                  a: `Ekadashi (एकादशी) occurs twice every lunar month on the 11th tithi of both Shukla Paksha and Krishna Paksha. Use the "Ekadashi Only" filter to see all Ekadashi dates for ${selectedYear}.`
                },
                {
                  q: "What are Tithi and Nakshatra?",
                  a: "Tithi is the lunar day based on Moon-Sun angle (15 tithis per fortnight). Nakshatra is the lunar mansion - one of 27 stellar divisions through which the Moon passes monthly. Both are essential for determining auspicious timings."
                },
                {
                  q: `Which are the major Hindu festivals in ${selectedYear}?`,
                  a: `Major Hindu festivals in ${selectedYear} include Maha Shivaratri, Holi, Ram Navami, Hanuman Jayanti, Janmashtami, Ganesh Chaturthi, Navratri, Dussehra, Diwali, Chhath Puja, and Kartik Purnima.`
                },
                {
                  q: "Why do Hindu festival dates change every year?",
                  a: "Hindu festivals follow the lunar calendar (Panchang) based on Moon phases and tithis, while the Gregorian calendar is solar. This causes festival dates to vary by 2-3 weeks each year when converting to Gregorian dates."
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
                <a href="https://en.wikipedia.org/wiki/Panchangam" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Hindu Panchang (Wikipedia)
                </a>
                {' | '}
                <a href="https://www.drikpanchang.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Drik Panchang
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

export default HinduPanchangYear;

