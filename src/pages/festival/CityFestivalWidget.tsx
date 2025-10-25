import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Code, Download, Eye, Settings, Search } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { getAllCities, getStateByCity, ALL_STATES_UTS } from '../../data/indiaLocations';

// Major National Festivals applicable to all cities
const NATIONAL_FESTIVALS = [
  { date: '2025-01-26', name: 'Republic Day', description: 'National holiday' },
  { date: '2025-08-15', name: 'Independence Day', description: 'National holiday' },
  { date: '2025-10-02', name: 'Gandhi Jayanti', description: 'Birth of Mahatma Gandhi' },
  { date: '2025-10-20', name: 'Diwali', description: 'Festival of Lights' },
  { date: '2025-12-25', name: 'Christmas', description: 'Birth of Jesus Christ' }
];

// Get state-specific major festivals dynamically
const getStateFestivals = (cityName: string) => {
  const stateName = getStateByCity(cityName);
  if (!stateName) return NATIONAL_FESTIVALS;
  
  const state = ALL_STATES_UTS.find(s => s.name === stateName);
  if (!state || !state.majorFestivals) return NATIONAL_FESTIVALS;
  
  // Map state festivals to dates (simplified for demo)
  const festivalMap: Record<string, { date: string; description: string }> = {
    'Ugadi': { date: '2025-03-30', description: 'Telugu/Kannada New Year' },
    'Sankranti': { date: '2025-01-14', description: 'Harvest festival' },
    'Pongal': { date: '2025-01-14', description: '4-day harvest festival' },
    'Onam': { date: '2025-09-05', description: 'Kerala harvest festival' },
    'Durga Puja': { date: '2025-09-28', description: 'Biggest festival in Bengal' },
    'Navratri': { date: '2025-09-22', description: '9 nights of dance' },
    'Baisakhi': { date: '2025-04-13', description: 'Punjabi New Year & harvest' },
    'Ganesh Chaturthi': { date: '2025-08-27', description: 'Birth of Ganesha' },
    'Gudi Padwa': { date: '2025-03-31', description: 'Marathi New Year' },
    'Bihu': { date: '2025-04-14', description: 'Assamese New Year' },
    'Pohela Boishakh': { date: '2025-04-14', description: 'Bengali New Year' },
    'Vishu': { date: '2025-04-14', description: 'Malayalam New Year' }
  };
  
  const stateFestivals = state.majorFestivals
    .map(festName => {
      const festData = festivalMap[festName];
      return festData ? { date: festData.date, name: festName, description: festData.description } : null;
    })
    .filter(Boolean) as { date: string; name: string; description: string }[];
  
  // Combine with national festivals and sort by date
  const allFestivals = [...NATIONAL_FESTIVALS, ...stateFestivals];
  return allFestivals.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const INDIAN_CITIES = getAllCities();

const CityFestivalWidget: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState(INDIAN_CITIES[0]);
  const [searchCity, setSearchCity] = useState('');
  const [widgetTheme, setWidgetTheme] = useState<'light' | 'dark'>('light');
  const [widgetSize, setWidgetSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [showCode, setShowCode] = useState(false);

  const filteredCities = useMemo(() => {
    if (!searchCity) return INDIAN_CITIES.slice(0, 100); // Show first 100
    return INDIAN_CITIES.filter(city => 
      city.toLowerCase().includes(searchCity.toLowerCase())
    ).slice(0, 50);
  }, [searchCity]);

  const cityFestivals = useMemo(() => getStateFestivals(selectedCity), [selectedCity]);

  const widgetCode = `<!-- MoneyCal Festival Widget for ${selectedCity} -->
<iframe 
  src="https://moneycal.in/widgets/city-festival?city=${selectedCity}&theme=${widgetTheme}&size=${widgetSize}"
  width="${widgetSize === 'small' ? '300' : widgetSize === 'medium' ? '400' : '500'}"
  height="${widgetSize === 'small' ? '400' : widgetSize === 'medium' ? '500' : '600'}"
  frameborder="0"
  scrolling="auto"
  title="Festival Calendar for ${selectedCity}"
></iframe>`;

  const downloadWidget = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${selectedCity} Festival Calendar Widget</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: ${widgetTheme === 'light' ? '#f3f4f6' : '#1f2937'}; }
    .widget { background: ${widgetTheme === 'light' ? 'white' : '#374151'}; border-radius: 12px; padding: 20px; max-width: 500px; margin: 0 auto; }
    h2 { color: ${widgetTheme === 'light' ? '#1f2937' : '#f3f4f6'}; margin-bottom: 20px; }
    .festival { padding: 15px; margin-bottom: 10px; border-radius: 8px; background: ${widgetTheme === 'light' ? '#eff6ff' : '#1e40af'}; }
    .date { font-weight: bold; color: #2563eb; }
    .name { font-size: 18px; font-weight: bold; color: ${widgetTheme === 'light' ? '#1f2937' : '#f3f4f6'}; }
    .desc { color: ${widgetTheme === 'light' ? '#6b7280' : '#d1d5db'}; font-size: 14px; }
  </style>
</head>
<body>
  <div class="widget">
    <h2>🎊 ${selectedCity} Festivals 2025</h2>
    ${cityFestivals.map(f => `
    <div class="festival">
      <div class="date">${new Date(f.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</div>
      <div class="name">${f.name}</div>
      <div class="desc">${f.description}</div>
    </div>`).join('')}
    <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #6b7280;">
      Powered by <a href="https://moneycal.in" style="color: #2563eb;">MoneyCal.in</a>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCity}-festival-widget.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEOHelmet
        title="City-wise Festival Calendar Widget India - Embed Mumbai Delhi Bangalore Festival Calendar | Free Festival Widget Generator"
        description="Create embeddable festival calendar widgets for any Indian city! Generate custom festival widgets for Mumbai, Delhi, Bangalore, Chennai, Kolkata & 100+ cities. Free HTML code to embed on websites, blogs. Responsive, customizable city-specific festival calendars."
        keywords="city festival widget india, embed festival calendar, mumbai festival widget, delhi event calendar embed, bangalore festival widget generator, customizable city festival calendar, indian city events widget, html festival calendar code"
        canonicalUrl="https://moneycal.in/festival-tools/city-festival-widget"
      />

      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <MapPin className="w-20 h-20 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
              🏙️ City-wise Festival Calendar Widget Generator
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Create & Embed Beautiful Festival Calendars for Any Indian City on Your Website
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Widget Configurator */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6 text-blue-600" />
                Configure Your Widget
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select City ({INDIAN_CITIES.length}+ cities)</label>
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      placeholder="Search city..."
                      className="w-full pl-10 pr-4 py-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                  </div>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 outline-none text-lg"
                    size={5}
                  >
                    {filteredCities.map(city => (
                      <option key={city} value={city}>{city} ({getStateByCity(city)})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Theme</label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setWidgetTheme('light')}
                      className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                        widgetTheme === 'light'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ☀️ Light
                    </button>
                    <button
                      onClick={() => setWidgetTheme('dark')}
                      className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                        widgetTheme === 'dark'
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      🌙 Dark
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Widget Size</label>
                  <div className="flex gap-3">
                    {['small', 'medium', 'large'].map(size => (
                      <button
                        key={size}
                        onClick={() => setWidgetSize(size as typeof widgetSize)}
                        className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                          widgetSize === size
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowCode(!showCode)}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
                >
                  <Code className="w-6 h-6" />
                  {showCode ? 'Hide' : 'Show'} Embed Code
                </button>

                {showCode && (
                  <div className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto">
                    <pre className="text-sm"><code>{widgetCode}</code></pre>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(widgetCode);
                        alert('Code copied to clipboard!');
                      }}
                      className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700"
                    >
                      📋 Copy Code
                    </button>
                  </div>
                )}

                <button
                  onClick={downloadWidget}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download Widget HTML
                </button>
              </div>
            </motion.div>

            {/* Live Preview */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Eye className="w-6 h-6 text-purple-600" />
                Live Preview
              </h2>

              <div className={`rounded-xl p-6 ${widgetTheme === 'light' ? 'bg-gray-50' : 'bg-gray-800'} ${
                widgetSize === 'small' ? 'max-w-sm' :
                widgetSize === 'medium' ? 'max-w-md' :
                'max-w-lg'
              } mx-auto`}>
                <h3 className={`text-2xl font-bold mb-4 ${widgetTheme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  🎊 {selectedCity} Festivals 2025
                </h3>
                <div className="space-y-3">
                  {cityFestivals.map((festival, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg ${widgetTheme === 'light' ? 'bg-blue-100' : 'bg-blue-900'}`}
                    >
                      <div className={`text-sm font-bold ${widgetTheme === 'light' ? 'text-blue-600' : 'text-blue-300'}`}>
                        {new Date(festival.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className={`text-lg font-bold ${widgetTheme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {festival.name}
                      </div>
                      <div className={`text-sm ${widgetTheme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        {festival.description}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`text-center mt-4 text-xs ${widgetTheme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  Powered by MoneyCal.in
                </div>
              </div>
            </motion.div>
          </div>

          {/* SEO Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 prose prose-lg max-w-none">
            <h2>Complete Guide to City-wise Festival Calendar Widgets for Indian Cities</h2>
            <p>
              Embed beautiful, responsive festival calendars for any Indian city on your website, blog, or application. Perfect for travel sites, event planners, and community portals.
            </p>

            <h3>Features of City Festival Widget</h3>
            <ul>
              <li><strong>100+ Indian cities supported:</strong> Mumbai, Delhi, Bangalore, Chennai, Kolkata & more</li>
              <li><strong>Customizable themes:</strong> Light and dark modes</li>
              <li><strong>Responsive sizes:</strong> Small, medium, large widgets</li>
              <li><strong>Easy embedding:</strong> Simple HTML iframe code</li>
              <li><strong>Auto-updating:</strong> Festivals update automatically</li>
              <li><strong>Mobile-friendly:</strong> Works on all devices</li>
            </ul>

            <h3>How to Embed Festival Widget on Your Website</h3>
            <ol>
              <li>Select your city from the dropdown</li>
              <li>Choose theme (light/dark) and size</li>
              <li>Click "Show Embed Code" to get HTML</li>
              <li>Copy the iframe code</li>
              <li>Paste into your website HTML</li>
              <li>Widget appears with live festival data!</li>
            </ol>

            <div className="bg-purple-50 p-6 rounded-xl">
              <h3>💡 Use Cases</h3>
              <ul>
                <li>Travel websites showing local festivals</li>
                <li>Hotel booking sites with event calendars</li>
                <li>Community portals for cities</li>
                <li>Event planning websites</li>
                <li>Tourism boards and guides</li>
              </ul>
            </div>

            <h3>Related Tools</h3>
            <div className="grid sm:grid-cols-2 gap-4 not-prose">
              <a href="/festival-tools/public-holiday-finder" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100">
                <h4 className="font-bold text-blue-900">📅 Holiday Finder</h4>
              </a>
              <a href="/festival-tools/festival-monthly-list" className="block p-4 bg-green-50 rounded-xl hover:bg-green-100">
                <h4 className="font-bold text-green-900">📋 Monthly List</h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CityFestivalWidget;

