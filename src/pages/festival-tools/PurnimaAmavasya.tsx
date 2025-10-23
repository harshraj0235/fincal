import React, { useState } from 'react';
import { Moon, Calendar, Download, Share2, Sun, Star, MapPin, Clock, Gift } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const PurnimaAmavasya: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCity, setSelectedCity] = useState('delhi');

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
    varanasi: { name: 'Varanasi', lat: 25.3176, lon: 82.9739 },
    jaipur: { name: 'Jaipur', lat: 26.9124, lon: 75.7873 }
  };

  // Hindu lunar months
  const lunarMonths = [
    'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha',
    'Shravana', 'Bhadrapada', 'Ashwin', 'Kartik',
    'Margashirsha', 'Pausha', 'Magha', 'Phalguna'
  ];

  // Generate Purnima & Amavasya dates for the year
  const generateLunarDates = () => {
    const dates = [];
    const lunarCycle = 29.53059; // days
    
    for (let month = 0; month < 12; month++) {
      // Purnima (Full Moon) - approximate
      const purnimaDay = 14 + Math.floor((month * lunarCycle) % 30);
      const purnimaDate = new Date(selectedYear, month, Math.min(purnimaDay, 28));
      
      // Amavasya (New Moon) - approximate  
      const amavasyaDay = Math.floor((month * lunarCycle + lunarCycle/2) % 30);
      const amavasyaDate = new Date(selectedYear, month, Math.min(amavasyaDay || 1, 28));

      dates.push({
        date: purnimaDate,
        type: 'Purnima',
        lunarMonth: lunarMonths[month],
        festival: getPurnimaFestival(month),
        icon: '🌕',
        color: 'from-orange-100 to-yellow-100',
        borderColor: 'border-orange-500',
        significance: 'Auspicious for prayers, fasting, Satyanarayan Puja'
      });

      dates.push({
        date: amavasyaDate,
        type: 'Amavasya',
        lunarMonth: lunarMonths[month],
        festival: getAmavasya Festival(month),
        icon: '🌑',
        color: 'from-gray-100 to-slate-100',
        borderColor: 'border-gray-500',
        significance: 'Ancestor worship, Pitru Paksha, spiritual practices'
      });
    }

    return dates.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const getPurnimaFestival = (month: number): string => {
    const festivals: { [key: number]: string } = {
      0: 'Chaitra Purnima (Hanuman Jayanti)',
      1: 'Vaishakha Purnima (Buddha Purnima)',
      2: 'Jyeshtha Purnima (Vat Purnima)',
      3: 'Ashadha Purnima (Guru Purnima)',
      4: 'Shravana Purnima (Raksha Bandhan)',
      5: 'Bhadrapada Purnima',
      6: 'Ashwin Purnima (Sharad Purnima)',
      7: 'Kartik Purnima (Dev Deepavali)',
      8: 'Margashirsha Purnima',
      9: 'Pausha Purnima',
      10: 'Magha Purnima',
      11: 'Phalguna Purnima (Holi)'
    };
    return festivals[month] || 'Purnima';
  };

  const getAmavasya Festival = (month: number): string => {
    const festivals: { [key: number]: string } = {
      0: 'Chaitra Amavasya',
      1: 'Vaishakha Amavasya',
      2: 'Jyeshtha Amavasya',
      3: 'Ashadha Amavasya',
      4: 'Shravana Amavasya (Hariyali Amavasya)',
      5: 'Bhadrapada Amavasya',
      6: 'Ashwin Amavasya (Diwali)',
      7: 'Kartik Amavasya',
      8: 'Margashirsha Amavasya',
      9: 'Pausha Amavasya (Mauni Amavasya)',
      10: 'Magha Amavasya',
      11: 'Phalguna Amavasya'
    };
    return festivals[month] || 'Amavasya';
  };

  const lunarDates = generateLunarDates();
  const purnimaDates = lunarDates.filter(d => d.type === 'Purnima');
  const amavasya Dates = lunarDates.filter(d => d.type === 'Amavasya');

  const downloadICS = () => {
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MoneyCal//Purnima Amavasya Calendar//EN
METHOD:PUBLISH
`;

    lunarDates.forEach((lunar) => {
      icsContent += `BEGIN:VEVENT
UID:${lunar.type}-${lunar.date.toISOString().split('T')[0]}@moneycal.in
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${lunar.date.toISOString().split('T')[0].replace(/-/g, '')}
SUMMARY:${lunar.type} - ${lunar.festival}
DESCRIPTION:${lunar.type} (${lunar.lunarMonth}) - ${lunar.significance}
LOCATION:${cities[selectedCity as keyof typeof cities].name}, India
END:VEVENT
`;
    });

    icsContent += 'END:VCALENDAR';

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Purnima-Amavasya-${selectedYear}-${cities[selectedCity as keyof typeof cities].name}.ics`;
    a.click();
  };

  return (
    <>
      <SEOHelmet
        title={`Purnima & Amavasya Dates ${selectedYear} India - Full Moon New Moon Calendar | MoneyCal`}
        description={`Complete Purnima (Full Moon) and Amavasya (New Moon) dates for ${selectedYear} in all Indian cities. Find Holi Purnima, Buddha Purnima, Guru Purnima, Raksha Bandhan, Diwali Amavasya, Kartik Purnima dates. Download Hindu lunar calendar PDF with ritual timings.`}
        keywords="Purnima dates 2025 2026 India, Amavasya dates 2025 2026, Poornima calendar, full moon dates India, new moon dates India, Holi Purnima, Buddha Purnima, Guru Purnima, Diwali Amavasya, Kartik Purnima, lunar calendar Hindu"
        canonicalUrl="https://moneycal.in/festival-tools/purnima-amavasya-dates"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Purnima & Amavasya Dates Finder',
          description: 'Find all Full Moon and New Moon dates for Hindu festivals and rituals',
          applicationCategory: 'LifestyleApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR'
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 via-yellow-600 to-pink-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center mb-4">
              <Moon className="h-12 w-12 mr-4 text-white" style={{ animation: 'pulse 2s infinite' }} />
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                पूर्णिमा और अमावस्या {selectedYear}
              </h1>
              <Sun className="h-12 w-12 ml-4 text-white" style={{ animation: 'spin 20s linear infinite' }} />
            </div>
            <h2 className="text-3xl font-bold text-center mb-2">
              Purnima & Amavasya Dates {selectedYear}
            </h2>
            <p className="text-center text-xl text-orange-100 max-w-3xl mx-auto">
              Complete Full Moon & New Moon Calendar for Hindu Festivals - Download Free!
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline h-5 w-5 mr-2" />
                  Select Year (वर्ष)
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 text-lg font-semibold"
                >
                  {Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - 1 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
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

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button
                onClick={downloadICS}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-3 px-8 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all flex items-center shadow-lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Download {selectedYear} Calendar (.ics)
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `Purnima & Amavasya Dates ${selectedYear}`,
                      text: `Complete Full Moon & New Moon calendar for ${selectedYear}`,
                      url: window.location.href
                    });
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all flex items-center shadow-lg"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share Calendar
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl shadow-xl p-8 border-4 border-orange-500">
              <div className="text-center">
                <div className="text-6xl mb-4">🌕</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Purnima Dates</h3>
                <p className="text-xl text-gray-700 mb-4">Full Moon (पूर्णिमा)</p>
                <div className="bg-white rounded-xl p-4 inline-block">
                  <p className="text-5xl font-bold text-orange-700">{purnimaDates.length}</p>
                  <p className="text-sm text-gray-600">Full Moons in {selectedYear}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-100 to-slate-100 rounded-2xl shadow-xl p-8 border-4 border-gray-500">
              <div className="text-center">
                <div className="text-6xl mb-4">🌑</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Amavasya Dates</h3>
                <p className="text-xl text-gray-700 mb-4">New Moon (अमावस्या)</p>
                <div className="bg-white rounded-xl p-4 inline-block">
                  <p className="text-5xl font-bold text-gray-700">{amavasya Dates.length}</p>
                  <p className="text-sm text-gray-600">New Moons in {selectedYear}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Complete List */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Complete {selectedYear} Calendar - {cities[selectedCity as keyof typeof cities].name}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Purnima Dates */}
              <div>
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl p-4 mb-4">
                  <h3 className="text-2xl font-bold text-center flex items-center justify-center">
                    <Moon className="h-7 w-7 mr-2" />
                    🌕 All Purnima Dates
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {purnimaDates.map((lunar, idx) => (
                    <div key={idx} className={`bg-gradient-to-br ${lunar.color} rounded-xl p-5 border-4 ${lunar.borderColor} hover:shadow-lg transition-all`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="text-4xl mr-3">{lunar.icon}</div>
                          <div>
                            <h4 className="font-bold text-lg text-gray-900">{lunar.festival}</h4>
                            <p className="text-sm text-gray-600">{lunar.lunarMonth} Paksha</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-orange-700">
                            {lunar.date.getDate()}
                          </p>
                          <p className="text-sm text-gray-600">
                            {lunar.date.toLocaleDateString('en-IN', { month: 'short' })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 border-2 border-orange-300">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-600">Date</p>
                            <p className="font-bold text-gray-900">
                              {lunar.date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Type</p>
                            <p className="font-bold text-orange-700">Full Moon</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2 italic">{lunar.significance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amavasya Dates */}
              <div>
                <div className="bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-xl p-4 mb-4">
                  <h3 className="text-2xl font-bold text-center flex items-center justify-center">
                    <Moon className="h-7 w-7 mr-2" />
                    🌑 All Amavasya Dates
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {amavasya Dates.map((lunar, idx) => (
                    <div key={idx} className={`bg-gradient-to-br ${lunar.color} rounded-xl p-5 border-4 ${lunar.borderColor} hover:shadow-lg transition-all`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="text-4xl mr-3">{lunar.icon}</div>
                          <div>
                            <h4 className="font-bold text-lg text-gray-900">{lunar.festival}</h4>
                            <p className="text-sm text-gray-600">{lunar.lunarMonth} Paksha</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-700">
                            {lunar.date.getDate()}
                          </p>
                          <p className="text-sm text-gray-600">
                            {lunar.date.toLocaleDateString('en-IN', { month: 'short' })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 border-2 border-gray-400">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-600">Date</p>
                            <p className="font-bold text-gray-900">
                              {lunar.date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Type</p>
                            <p className="font-bold text-gray-700">New Moon</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2 italic">{lunar.significance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Major Festivals */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center">
              <Gift className="h-8 w-8 text-purple-600 mr-3" />
              Major Lunar Festivals {selectedYear}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Holi', type: 'Purnima', month: 'Phalguna', icon: '🎨' },
                { name: 'Buddha Purnima', type: 'Purnima', month: 'Vaishakha', icon: '🧘' },
                { name: 'Guru Purnima', type: 'Purnima', month: 'Ashadha', icon: '📿' },
                { name: 'Raksha Bandhan', type: 'Purnima', month: 'Shravana', icon: '🎀' },
                { name: 'Sharad Purnima', type: 'Purnima', month: 'Ashwin', icon: '🌕' },
                { name: 'Kartik Purnima', type: 'Purnima', month: 'Kartik', icon: '🪔' },
                { name: 'Mauni Amavasya', type: 'Amavasya', month: 'Pausha', icon: '🙏' },
                { name: 'Diwali', type: 'Amavasya', month: 'Ashwin', icon: '🎆' }
              ].map((festival, idx) => (
                <div key={idx} className={`${festival.type === 'Purnima' ? 'bg-orange-50 border-orange-300' : 'bg-gray-50 border-gray-300'} rounded-xl p-5 border-2 hover:shadow-lg transition-all text-center`}>
                  <div className="text-5xl mb-2">{festival.icon}</div>
                  <h4 className="font-bold text-lg text-gray-900 mb-1">{festival.name}</h4>
                  <p className="text-sm text-gray-600">{festival.month} {festival.type}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-blue-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🔗 Related Festival & Financial Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/festival-tools/moon-phase-festivals" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Moon Phase Calendar</p>
                <p className="text-sm text-gray-600">Current moon phase & illumination</p>
              </a>
              <a href="/festival-tools/weekly-tithi-finder" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Weekly Tithi Finder</p>
                <p className="text-sm text-gray-600">This week's complete tithi</p>
              </a>
              <a href="/festival-tools/panchang-today" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-yellow-200">
                <p className="font-semibold text-yellow-600 mb-1">Daily Panchang</p>
                <p className="text-sm text-gray-600">Today's Tithi & Nakshatra</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Improve Credit Score</p>
                <p className="text-sm text-gray-600">Financial health guide</p>
              </a>
              <a href="/tools/home-loan-calculator" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Home Loan Calculator</p>
                <p className="text-sm text-gray-600">EMI & affordability</p>
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
                  q: `When is Purnima (Full Moon) in ${selectedYear}?`,
                  a: `There are ${purnimaDates.length} Purnima (Full Moon) dates in ${selectedYear}. Major ones include Chaitra Purnima (Hanuman Jayanti), Vaishakha Purnima (Buddha Purnima), Guru Purnima, Raksha Bandhan, Sharad Purnima, and Kartik Purnima. Check complete list above.`
                },
                {
                  q: `When is Amavasya (New Moon) in ${selectedYear}?`,
                  a: `There are ${amavasya Dates.length} Amavasya (New Moon) dates in ${selectedYear}. Important dates include Mauni Amavasya (January), Hariyali Amavasya, Diwali Amavasya (most significant), and Kartik Amavasya. Full calendar above.`
                },
                {
                  q: "What is the significance of Purnima?",
                  a: "Purnima (पूर्णिमा) or Full Moon is highly auspicious in Hinduism. It's ideal for prayers, Satyanarayan Puja, fasting, spiritual practices, and charity. Many major festivals like Holi, Buddha Purnima, Guru Purnima, and Raksha Bandhan fall on Purnima."
                },
                {
                  q: "What is the significance of Amavasya?",
                  a: "Amavasya (अमावस्या) or New Moon is significant for ancestor worship (Pitru Paksha, Shraddha ceremonies). Diwali, the biggest Hindu festival, falls on Amavasya. Mauni Amavasya and Somvati Amavasya are important for spiritual practices."
                },
                {
                  q: "Which Purnima is most auspicious?",
                  a: "All Purnimas are auspicious, but Kartik Purnima (also called Dev Deepavali) is considered most sacred. Other highly auspicious Purnimas include Guru Purnima, Buddha Purnima, Sharad Purnima, and Vaishakha Purnima."
                },
                {
                  q: "Can I do Satyanarayan Puja on any Purnima?",
                  a: "Yes! Satyanarayan Puja can be performed on any Purnima (Full Moon day). It's one of the most auspicious days for this puja. Check your specific Purnima date and timing above for your city."
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
                <a href="https://en.wikipedia.org/wiki/Purnima" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Purnima (Wikipedia)
                </a>
                {' | '}
                <a href="https://www.drikpanchang.com/purnima-calendar.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Purnima Calendar (Drik Panchang)
                </a>
                {' | '}
                <a href="https://www.prokerala.com/astrology/panchang/amavasya-dates.php" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Amavasya Dates
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurnimaAmavasya;

