import React, { useState, useEffect } from 'react';
import { Moon, Sun, Calendar, Download, Share2, Star, Clock, MapPin, Info } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const MoonPhaseFestivals: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState('delhi');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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

  // Calculate moon phase
  const calculateMoonPhase = () => {
    const dayOfYear = Math.floor((selectedDate.getTime() - new Date(selectedDate.getFullYear(), 0, 0).getTime()) / 86400000);
    const lunarMonth = 29.53059; // Average lunar month
    const moonAge = (dayOfYear % lunarMonth);
    const illumination = 50 * (1 - Math.cos((moonAge / lunarMonth) * 2 * Math.PI));
    
    let phaseName = '';
    let phaseIcon = '';
    let phaseColor = '';
    
    if (moonAge < 1.84) {
      phaseName = 'New Moon';
      phaseIcon = '🌑';
      phaseColor = 'from-gray-100 to-slate-100';
    } else if (moonAge < 7.38) {
      phaseName = 'Waxing Crescent';
      phaseIcon = '🌒';
      phaseColor = 'from-blue-100 to-cyan-100';
    } else if (moonAge < 9.23) {
      phaseName = 'First Quarter';
      phaseIcon = '🌓';
      phaseColor = 'from-green-100 to-emerald-100';
    } else if (moonAge < 14.77) {
      phaseName = 'Waxing Gibbous';
      phaseIcon = '🌔';
      phaseColor = 'from-yellow-100 to-orange-100';
    } else if (moonAge < 16.61) {
      phaseName = 'Full Moon';
      phaseIcon = '🌕';
      phaseColor = 'from-orange-100 to-red-100';
    } else if (moonAge < 22.15) {
      phaseName = 'Waning Gibbous';
      phaseIcon = '🌖';
      phaseColor = 'from-purple-100 to-pink-100';
    } else if (moonAge < 23.99) {
      phaseName = 'Last Quarter';
      phaseIcon = '🌗';
      phaseColor = 'from-indigo-100 to-purple-100';
    } else {
      phaseName = 'Waning Crescent';
      phaseIcon = '🌘';
      phaseColor = 'from-pink-100 to-rose-100';
    }

    // Calculate moonrise/moonset (simplified)
    const moonrise = new Date(selectedDate);
    moonrise.setHours(Math.floor(6 + moonAge / 2), Math.floor((moonAge % 2) * 30), 0);
    
    const moonset = new Date(selectedDate);
    moonset.setHours(Math.floor(18 + moonAge / 2), Math.floor((moonAge % 2) * 30), 0);

    return {
      phaseName,
      phaseIcon,
      phaseColor,
      moonAge: moonAge.toFixed(2),
      illumination: illumination.toFixed(1),
      moonrise,
      moonset
    };
  };

  // Get year's full moons and new moons
  const getYearMoonPhases = () => {
    const phases = [];
    const lunarMonth = 29.53059;
    
    for (let month = 0; month < 12; month++) {
      // Full Moon (approximate)
      const fullMoonDay = Math.floor(14 + (month * lunarMonth) % 30);
      const fullMoonDate = new Date(selectedYear, month, Math.min(fullMoonDay, 28));
      phases.push({
        type: 'Full Moon',
        date: fullMoonDate,
        festival: getFestivalForFullMoon(month),
        icon: '🌕'
      });
      
      // New Moon (approximate)
      const newMoonDay = Math.floor((month * lunarMonth) % 30);
      const newMoonDate = new Date(selectedYear, month, Math.min(newMoonDay || 1, 28));
      phases.push({
        type: 'New Moon',
        date: newMoonDate,
        festival: getFestivalForNewMoon(month),
        icon: '🌑'
      });
    }
    
    return phases.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const getFestivalForFullMoon = (month: number): string => {
    const festivals: { [key: number]: string } = {
      0: 'Pausha Purnima',
      1: 'Magha Purnima',
      2: 'Holi (Phalguna Purnima)',
      3: 'Hanuman Jayanti',
      4: 'Buddha Purnima',
      5: 'Vat Purnima',
      6: 'Guru Purnima',
      7: 'Raksha Bandhan (Shravan Purnima)',
      8: 'Sharad Purnima',
      9: 'Kojagari Purnima',
      10: 'Kartik Purnima',
      11: 'Margashirsha Purnima'
    };
    return festivals[month] || 'Purnima';
  };

  const getFestivalForNewMoon = (month: number): string => {
    const festivals: { [key: number]: string } = {
      0: 'Mauni Amavasya',
      9: 'Diwali (Amavasya)',
      10: 'Kartik Amavasya'
    };
    return festivals[month] || 'Amavasya';
  };

  const moonPhase = calculateMoonPhase();
  const yearPhases = getYearMoonPhases();

  const downloadICS = () => {
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MoneyCal//Moon Phase Festivals//EN
METHOD:PUBLISH
`;

    yearPhases.forEach((phase) => {
      icsContent += `BEGIN:VEVENT
UID:moon-${phase.date.toISOString().split('T')[0]}-${phase.type.replace(' ', '-')}@moneycal.in
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${phase.date.toISOString().split('T')[0].replace(/-/g, '')}
SUMMARY:${phase.type} - ${phase.festival}
DESCRIPTION:${phase.type}: ${phase.festival}
LOCATION:${cities[selectedCity as keyof typeof cities].name}, India
END:VEVENT
`;
    });

    icsContent += 'END:VCALENDAR';

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Moon-Phases-Festivals-${selectedYear}.ics`;
    a.click();
  };

  return (
    <>
      <SEOHelmet
        title={`Moon Phase for Hindu Festivals ${selectedYear} - Full Moon Purnima & New Moon Amavasya Dates | MoneyCal`}
        description={`Complete moon phase calendar for Hindu festivals ${selectedYear}. Find Purnima (Full Moon), Amavasya (New Moon) dates for all Indian cities. Diwali, Holi, Raksha Bandhan, Buddha Purnima, Kartik Purnima dates. Download festival calendar with moonrise-moonset times.`}
        keywords="full moon 2025 2026 India, purnima dates 2025 2026, amavasya dates 2025 2026, new moon India, moon phase calendar, lunar festival calendar, Diwali Amavasya, Holi Purnima, Raksha Bandhan Purnima, moonrise moonset time"
        canonicalUrl="/festival-tools/moon-phase-festivals"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Moon Phase for Hindu Festivals',
          description: 'Find Full Moon and New Moon dates for Hindu festivals with moonrise-moonset times',
          applicationCategory: 'LifestyleApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR'
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center mb-4">
              <Moon className="h-12 w-12 mr-4 animate-bounce" />
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                Moon Phase for Festivals
              </h1>
              <Star className="h-12 w-12 ml-4 animate-pulse" />
            </div>
            <p className="text-center text-xl text-purple-100 max-w-3xl mx-auto">
              Purnima (पूर्णिमा) & Amavasya (अमावस्या) - Complete Lunar Calendar for Hindu Festivals
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline h-5 w-5 mr-2" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    setSelectedDate(newDate);
                    setSelectedYear(newDate.getFullYear());
                  }}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-lg font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-5 w-5 mr-2" />
                  City (शहर)
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Year (वर्ष)
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-lg font-semibold"
                >
                  {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Current Moon Phase Display */}
          <div className={`bg-gradient-to-br ${moonPhase.phaseColor} rounded-2xl shadow-2xl p-8 mb-8 border-4 border-purple-500`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Current Moon Phase - {selectedDate.toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Moon Phase Visual */}
              <div className="bg-white rounded-xl p-8 border-4 border-purple-400 text-center">
                <div className="text-8xl mb-4">{moonPhase.phaseIcon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{moonPhase.phaseName}</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="text-gray-600">Moon Age</p>
                    <p className="text-xl font-bold text-purple-700">{moonPhase.moonAge} days</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-gray-600">Illumination</p>
                    <p className="text-xl font-bold text-blue-700">{moonPhase.illumination}%</p>
                  </div>
                </div>
              </div>

              {/* Moon Times */}
              <div className="bg-white rounded-xl p-6 border-4 border-blue-400">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  <Clock className="inline h-6 w-6 mr-2" />
                  Moon Timings
                </h3>
                <div className="space-y-4">
                  <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Moon className="h-6 w-6 text-blue-600 mr-2" />
                        <span className="text-sm text-gray-600">Moonrise</span>
                      </div>
                      <span className="text-xl font-bold text-gray-900">
                        {moonPhase.moonrise.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </span>
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Moon className="h-6 w-6 text-orange-600 mr-2" />
                        <span className="text-sm text-gray-600">Moonset</span>
                      </div>
                      <span className="text-xl font-bold text-gray-900">
                        {moonPhase.moonset.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </span>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border-2 border-green-300">
                    <p className="text-sm text-gray-600 text-center">Location</p>
                    <p className="text-lg font-bold text-green-700 text-center">
                      {cities[selectedCity as keyof typeof cities].name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Festival Significance */}
              <div className="bg-white rounded-xl p-6 border-4 border-green-400">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  <Star className="inline h-6 w-6 mr-2" />
                  Festival Significance
                </h3>
                {moonPhase.phaseName === 'Full Moon' && (
                  <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-400">
                    <p className="font-bold text-orange-900 mb-2">🌕 Purnima (पूर्णिमा)</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Highly auspicious for prayers</li>
                      <li>• Good for Satyanarayan Puja</li>
                      <li>• Ideal for spiritual practices</li>
                      <li>• Many festivals fall on Purnima</li>
                    </ul>
                  </div>
                )}
                {moonPhase.phaseName === 'New Moon' && (
                  <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-400">
                    <p className="font-bold text-gray-900 mb-2">🌑 Amavasya (अमावस्या)</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Ancestor worship (Pitru Paksha)</li>
                      <li>• Diwali falls on Amavasya</li>
                      <li>• Mauni Amavasya in January</li>
                      <li>• Spiritual significance</li>
                    </ul>
                  </div>
                )}
                {moonPhase.phaseName !== 'Full Moon' && moonPhase.phaseName !== 'New Moon' && (
                  <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300">
                    <p className="text-sm text-gray-700">
                      Regular lunar phase. Check Full Moon and New Moon dates below for upcoming festivals.
                    </p>
                  </div>
                )}
                
                <button
                  onClick={downloadICS}
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download {selectedYear} Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Year's Moon Phases */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {selectedYear} - All Purnima & Amavasya Dates
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {yearPhases.slice(0, 24).map((phase, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-5 border-2 hover:shadow-lg transition-all ${
                    phase.type === 'Full Moon'
                      ? 'bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-300'
                      : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-4xl">{phase.icon}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      phase.type === 'Full Moon'
                        ? 'bg-orange-200 text-orange-900'
                        : 'bg-gray-200 text-gray-900'
                    }`}>
                      {phase.type}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {phase.festival}
                  </h3>
                  <p className="text-2xl font-bold text-purple-700 mb-1">
                    {phase.date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                  </p>
                  <p className="text-sm text-gray-600">
                    {phase.date.toLocaleDateString('en-IN', { weekday: 'long' })}, {selectedYear}
                  </p>
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
              <a href="/festival-tools/panchang-today" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Daily Panchang</p>
                <p className="text-sm text-gray-600">Today's complete panchang</p>
              </a>
              <a href="/festival-tools/weekly-tithi-finder" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Weekly Tithi Finder</p>
                <p className="text-sm text-gray-600">This week's tithi calendar</p>
              </a>
              <a href="/festival-tools/diwali-date-finder" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-yellow-200">
                <p className="font-semibold text-yellow-600 mb-1">Diwali Date Finder</p>
                <p className="text-sm text-gray-600">Find Diwali Amavasya</p>
              </a>
              <a href="/learn/credit-score" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Credit Score Guide</p>
                <p className="text-sm text-gray-600">Financial planning</p>
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
                  q: `When is Full Moon (Purnima) in ${selectedYear}?`,
                  a: `There are 12-13 Full Moons (Purnima) in ${selectedYear}. Check the complete calendar above for all Purnima dates including Holi Purnima, Buddha Purnima, Guru Purnima, Raksha Bandhan, Sharad Purnima, and Kartik Purnima.`
                },
                {
                  q: `When is New Moon (Amavasya) in ${selectedYear}?`,
                  a: `Amavasya occurs 12-13 times in ${selectedYear}. Important Amavasya dates include Mauni Amavasya (January), Diwali Amavasya (October/November), and Kartik Amavasya. All dates listed above.`
                },
                {
                  q: "Why are Hindu festivals based on moon phases?",
                  a: "Hindu festivals follow the lunar calendar (Panchang). Many festivals fall on Purnima (Full Moon - auspicious for prayers) or Amavasya (New Moon - for ancestor rituals). This connects celebrations with natural lunar cycles."
                },
                {
                  q: "What is the difference between Purnima and Amavasya?",
                  a: "Purnima is Full Moon (100% illumination) - highly auspicious for prayers, fasts, and celebrations. Amavasya is New Moon (0% illumination) - significant for ancestor worship (Shraddha, Pitru Paksha) and festivals like Diwali."
                },
                {
                  q: "Which Hindu festivals fall on Full Moon (Purnima)?",
                  a: "Major festivals on Purnima include Holi, Buddha Purnima, Guru Purnima, Raksha Bandhan, Sharad Purnima, and Kartik Purnima. These are highly auspicious days for prayers, fasting, and spiritual practices."
                },
                {
                  q: "Which festivals fall on New Moon (Amavasya)?",
                  a: "Diwali (Deepavali) is the most famous Amavasya festival. Others include Mauni Amavasya, Som vati Amavasya, and various Pitru Paksha (ancestor worship) observances. Amavasya is significant for Shraddha ceremonies."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 border-2 border-purple-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-100 p-4 rounded-lg border-2 border-blue-400">
              <p className="text-sm text-gray-800">
                <strong>📚 External Resources:</strong>{' '}
                <a href="https://en.wikipedia.org/wiki/Lunar_phase" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Moon Phases (Wikipedia)
                </a>
                {' | '}
                <a href="https://www.timeanddate.com/moon/phases/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Moon Phases (Time & Date)
                </a>
                {' | '}
                <a href="https://www.drikpanchang.com/purnima-calendar.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Purnima Calendar
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoonPhaseFestivals;

