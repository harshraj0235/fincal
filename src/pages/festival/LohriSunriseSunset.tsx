import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Sun,
  Sunrise,
  Sunset,
  Clock,
  MapPin,
  Calendar,
  Download,
  Share2,
  Flame,
  Info,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Search,
  Sparkles,
  Star
} from 'lucide-react';

const INDIAN_CITIES = [
  { name: 'Delhi', lat: 28.6139, lon: 77.2090, state: 'Delhi', sunrise: '07:10', sunset: '17:56', civilDusk: '18:20' },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777, state: 'Maharashtra', sunrise: '07:15', sunset: '18:25', civilDusk: '18:48' },
  { name: 'Chandigarh', lat: 30.7333, lon: 76.7794, state: 'Punjab', sunrise: '07:20', sunset: '17:45', civilDusk: '18:10' },
  { name: 'Amritsar', lat: 31.6340, lon: 74.8723, state: 'Punjab', sunrise: '07:25', sunset: '17:40', civilDusk: '18:05' },
  { name: 'Ludhiana', lat: 30.9010, lon: 75.8573, state: 'Punjab', sunrise: '07:22', sunset: '17:42', civilDusk: '18:07' },
  { name: 'Bangalore', lat: 12.9716, lon: 77.5946, state: 'Karnataka', sunrise: '06:45', sunset: '18:15', civilDusk: '18:38' },
  { name: 'Kolkata', lat: 22.5726, lon: 88.3639, state: 'West Bengal', sunrise: '06:20', sunset: '17:30', civilDusk: '17:55' },
  { name: 'Chennai', lat: 13.0827, lon: 80.2707, state: 'Tamil Nadu', sunrise: '06:35', sunset: '18:10', civilDusk: '18:33' }
];

const LohriSunriseSunset: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState(INDIAN_CITIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const currentYear = new Date().getFullYear();
  const lohriDate = new Date(currentYear, 0, 13);

  const filteredCities = useMemo(() => {
    if (!searchQuery) return INDIAN_CITIES;
    const query = searchQuery.toLowerCase();
    return INDIAN_CITIES.filter(city => 
      city.name.toLowerCase().includes(query) || 
      city.state.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const downloadCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MoneyCal//Lohri//EN',
      'BEGIN:VEVENT',
      `DTSTART:${lohriDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${lohriDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:Lohri ${currentYear} - ${selectedCity.name}`,
      `DESCRIPTION:Lohri bonfire celebration. Sunset: ${selectedCity.sunset}`,
      `LOCATION:${selectedCity.name}, ${selectedCity.state}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lohri-${currentYear}-${selectedCity.name.toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareResults = () => {
    const shareText = `🔥 Lohri ${currentYear} - ${selectedCity.name}\n\n🌅 Sunrise: ${selectedCity.sunrise}\n🌇 Sunset: ${selectedCity.sunset}\n🔥 Bonfire Time: ${selectedCity.sunset}\n\nCalculate yours at ${window.location.href}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Lohri ${currentYear} - ${selectedCity.name}`,
        text: shareText,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Details copied to clipboard!');
    }
  };

  const daysUntilLohri = Math.ceil((lohriDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <>
      <Helmet>
        <title>{`Lohri ${currentYear} Sunrise Sunset Time ${selectedCity.name} | Bonfire Timing Calculator India`}</title>
        <meta name="description" content={`Lohri ${currentYear} sunrise sunset time for ${selectedCity.name}. Sunrise: ${selectedCity.sunrise}, Sunset: ${selectedCity.sunset}. Best bonfire time and celebration guide. Download calendar.`} />
        <meta name="keywords" content={`lohri sunrise time ${currentYear}, lohri sunset time ${selectedCity.name}, lohri bonfire timing ${currentYear}, lohri date ${currentYear}, when to light lohri bonfire, lohri celebration time india`} />
        <link rel="canonical" href="https://moneycal.in/festival-tools/lohri-sunrise-sunset" />
        <meta property="og:title" content={`Lohri ${currentYear} - ${selectedCity.name} Bonfire Timing`} />
        <meta property="og:description" content={`Lohri bonfire in ${selectedCity.name}: Sunset ${selectedCity.sunset}. Download calendar and celebrate!`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        <div className="bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <Flame className="w-16 h-16 animate-bounce mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              🔥 Lohri {currentYear} Sunrise & Sunset Calculator
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-orange-100">
              Perfect Bonfire Timing for Your City
            </p>
            {daysUntilLohri > 0 && (
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border-2 border-white/40">
                <p className="text-lg font-semibold">⏰ {daysUntilLohri} days until Lohri!</p>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-orange-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-orange-600" />
              Select Your City
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="inline w-4 h-4 mr-1" />
                Search City
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredCities.map(city => (
                <button
                  key={city.name}
                  onClick={() => {
                    setSelectedCity(city);
                    setSearchQuery('');
                  }}
                  className={`p-4 rounded-lg transition-all text-left ${
                    selectedCity.name === city.name
                      ? 'bg-orange-100 border-2 border-orange-400 font-semibold'
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{city.name}</div>
                  <div className="text-xs text-gray-600">{city.state}</div>
                </button>
              ))}
            </div>

            <div className="mt-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-4 border-2 border-orange-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Selected:</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedCity.name}, {selectedCity.state}</p>
                </div>
                <Sparkles className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
              <Sunrise className="w-10 h-10 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Sunrise</h3>
              <p className="text-4xl font-bold">{selectedCity.sunrise}</p>
              <p className="text-sm mt-2 opacity-90">Morning begins</p>
            </div>

            <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
              <Sun className="w-10 h-10 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Solar Noon</h3>
              <p className="text-4xl font-bold">12:30 PM</p>
              <p className="text-sm mt-2 opacity-90">Sun at peak</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
              <Sunset className="w-10 h-10 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Sunset</h3>
              <p className="text-4xl font-bold">{selectedCity.sunset}</p>
              <p className="text-sm mt-2 opacity-90">Evening begins</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500 rounded-2xl shadow-2xl p-8 text-white border-4 border-yellow-400 mb-8">
            <div className="flex items-center mb-4">
              <Flame className="w-12 h-12 mr-3 animate-pulse" />
              <div>
                <h3 className="text-3xl font-bold">🔥 Perfect Bonfire Timing</h3>
                <p className="text-lg text-yellow-100">Best time to light the Lohri bonfire</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/40">
                <p className="text-sm font-semibold mb-2">🌅 Start Bonfire At</p>
                <p className="text-4xl font-bold">{selectedCity.sunset}</p>
                <p className="text-sm mt-2 text-yellow-100">Right after sunset</p>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/40">
                <p className="text-sm font-semibold mb-2">⏰ Celebration Duration</p>
                <p className="text-4xl font-bold">2 Hours</p>
                <p className="text-sm mt-2 text-yellow-100">Until {selectedCity.civilDusk}</p>
              </div>
            </div>

            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div className="flex items-start">
                <Star className="w-5 h-5 mr-2 flex-shrink-0 mt-1 text-yellow-300" />
                <p className="text-sm text-yellow-50">
                  The optimal time to light the bonfire is right at sunset ({selectedCity.sunset}). 
                  The sky becomes fully dark by {selectedCity.civilDusk}, creating perfect ambiance!
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <button
                onClick={downloadCalendar}
                className="px-6 py-4 bg-white text-orange-600 rounded-xl hover:bg-orange-50 transition-all font-semibold flex items-center justify-center shadow-lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Add to Calendar
              </button>
              <button
                onClick={shareResults}
                className="px-6 py-4 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-300 transition-all font-semibold flex items-center justify-center shadow-lg"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share with Family
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-blue-600" />
                Day Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Sunrise Time</span>
                  <span className="font-bold text-blue-600">{selectedCity.sunrise}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Sunset Time</span>
                  <span className="font-bold text-purple-600">{selectedCity.sunset}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                  <span className="text-gray-700">Civil Dusk</span>
                  <span className="font-bold text-indigo-600">{selectedCity.civilDusk}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Day Length</span>
                  <span className="font-bold text-green-600">~10 hours</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl shadow-lg p-6 border-2 border-orange-300">
              <div className="flex items-center mb-4">
                <Info className="w-6 h-6 mr-2 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-900">About Lohri</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-700">
                <p><strong>Date:</strong> {lohriDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>Significance:</strong> Lohri marks the end of winter and celebrates the winter crop harvest. It is primarily celebrated in Punjab and northern India.</p>
                <p><strong>Tradition:</strong> People gather around bonfires, throw sesame seeds and jaggery into the fire, and perform folk dances like Gidda and Bhangra.</p>
                <p className="bg-white/60 rounded-lg p-3 border border-orange-200">
                  <strong className="text-orange-700">🔥 Bonfire Safety:</strong><br/>
                  Keep water nearby, supervise children, and follow local fire safety regulations.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {[
                {
                  q: "When is the best time to light the Lohri bonfire?",
                  a: `The best time is right at sunset (${selectedCity.sunset} in ${selectedCity.name}). This timing aligns with tradition and provides perfect ambiance as darkness falls.`
                },
                {
                  q: "Why is Lohri celebrated on January 13?",
                  a: "Lohri coincides with Makar Sankranti, marking the sun's transition into Capricorn. It signifies the end of winter solstice and celebrates the winter harvest."
                },
                {
                  q: "What is civil twilight?",
                  a: `Civil twilight ends at ${selectedCity.civilDusk} in ${selectedCity.name}, when the sky becomes fully dark. This creates perfect atmosphere for bonfire celebrations.`
                },
                {
                  q: "Can I celebrate Lohri if it is cloudy?",
                  a: "Yes! The timing stays the same regardless of weather. The celebration is about community, harvest, and tradition."
                },
                {
                  q: "What offerings are thrown in the Lohri bonfire?",
                  a: "Traditional offerings include sesame seeds (til), jaggery (gur), peanuts, popcorn, and rewri representing prosperity and gratitude."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 border-2 border-purple-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <ArrowRight className="w-6 h-6 mr-2 text-purple-600" />
              Related Festival Tools
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/festival-tools/makar-sankranti-tithi" className="block p-4 bg-white rounded-xl hover:shadow-lg transition-all border-2 border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">Makar Sankranti</h4>
                <p className="text-sm text-gray-600">Sankranti timing calculator</p>
              </a>

              <a href="/festival-tools/pongal-calendar" className="block p-4 bg-white rounded-xl hover:shadow-lg transition-all border-2 border-yellow-200">
                <h4 className="font-semibold text-gray-900 mb-2">Pongal Calendar</h4>
                <p className="text-sm text-gray-600">Tamil harvest festival</p>
              </a>

              <a href="/festival-tools" className="block p-4 bg-white rounded-xl hover:shadow-lg transition-all border-2 border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2">All Festival Tools</h4>
                <p className="text-sm text-gray-600">Explore 20+ calculators</p>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <ExternalLink className="w-6 h-6 mr-2 text-indigo-600" />
              Learn More About Lohri
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <a href="https://www.drikpanchang.com/festivals/lohri/lohri-date-time.html" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 transition-all">
                <div>
                  <h4 className="font-semibold text-gray-900">Drik Panchang</h4>
                  <p className="text-sm text-gray-600">Lohri dates and timing</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </a>
              
              <a href="https://www.indianculture.gov.in/festivals/lohri" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 transition-all">
                <div>
                  <h4 className="font-semibold text-gray-900">Indian Culture Portal</h4>
                  <p className="text-sm text-gray-600">Festival information</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12 px-4 mt-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">🎉 Make This Lohri Special!</h2>
            <p className="text-xl mb-6 text-orange-100">Share with family and friends</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={shareResults} className="px-8 py-4 bg-white text-orange-600 rounded-xl hover:bg-orange-50 transition-all font-bold text-lg shadow-lg">
                <Share2 className="inline w-6 h-6 mr-2" />
                Share Now
              </button>
              <button onClick={downloadCalendar} className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-300 transition-all font-bold text-lg shadow-lg">
                <Download className="inline w-6 h-6 mr-2" />
                Save to Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LohriSunriseSunset;
