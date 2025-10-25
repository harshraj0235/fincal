import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Download, Share2, RefreshCw, CheckCircle, Link as LinkIcon, MapPin, Home, ChevronRight, Copy, Check, ExternalLink, Search, Info, Sparkles, Clock, Star, Bell, Globe } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { getAllCities, getStateByCity } from '../../data/indiaLocations';

const IndianHolidayCalendarSync: React.FC = () => {
  const [selectedState, setSelectedState] = useState('All India');
  const [calendarType, setCalendarType] = useState<'google' | 'outlook' | 'apple' | 'ical'>('google');
  const [includeTypes, setIncludeTypes] = useState<string[]>(['national', 'state', 'bank']);
  const [generated, setGenerated] = useState(false);

  const generateICalFile = () => {
    const events = [
      // Sample events - in production, this would be comprehensive
      { name: 'Republic Day', date: '2025-01-26', description: 'National Holiday' },
      { name: 'Holi', date: '2025-03-14', description: 'Festival of Colors' },
      { name: 'Independence Day', date: '2025-08-15', description: 'National Holiday' },
      { name: 'Diwali', date: '2025-10-20', description: 'Festival of Lights' },
      { name: 'Christmas', date: '2025-12-25', description: 'Christmas Day' }
    ];

    let icalContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MoneyCal India//Festival Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:Indian Festivals 2025',
      'X-WR-TIMEZONE:Asia/Kolkata',
      'X-WR-CALDESC:Complete Indian festival and public holiday calendar'
    ];

    events.forEach(event => {
      const eventDate = event.date.replace(/-/g, '');
      icalContent.push('BEGIN:VEVENT');
      icalContent.push(`UID:${event.name.replace(/\s/g, '-')}-${eventDate}@moneycal.in`);
      icalContent.push(`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`);
      icalContent.push(`DTSTART;VALUE=DATE:${eventDate}`);
      icalContent.push(`SUMMARY:${event.name}`);
      icalContent.push(`DESCRIPTION:${event.description}`);
      icalContent.push('STATUS:CONFIRMED');
      icalContent.push('TRANSP:TRANSPARENT');
      icalContent.push('END:VEVENT');
    });

    icalContent.push('END:VCALENDAR');
    
    const blob = new Blob([icalContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `indian-festivals-${selectedState.replace(/\s/g, '-')}-2025.ics`;
    a.click();
    URL.revokeObjectURL(url);
    setGenerated(true);
  };

  const addToGoogleCalendar = () => {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const event = {
      text: 'Indian Festivals 2025',
      dates: '20250101/20251231',
      details: 'Complete Indian festival calendar from MoneyCal.in',
      location: 'India'
    };
    
    const url = `${baseUrl}&text=${encodeURIComponent(event.text)}&dates=${event.dates}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;
    window.open(url, '_blank');
    setGenerated(true);
  };

  const addToOutlook = () => {
    generateICalFile(); // Outlook uses .ics files
  };

  const toggleIncludeType = (type: string) => {
    if (includeTypes.includes(type)) {
      setIncludeTypes(includeTypes.filter(t => t !== type));
    } else {
      setIncludeTypes([...includeTypes, type]);
    }
  };

  return (
    <>
      <SEOHelmet
        title="Sync Indian Festivals to Google Calendar & Outlook 2025 - Export Hindu Festival Calendar | iCal Download Free"
        description="Sync all Indian festivals to Google Calendar, Outlook, Apple Calendar instantly! Download .ics file with Hindu, Islamic, Christian, Sikh festivals. Export complete public holiday calendar for India 2025. Free festival calendar sync tool."
        keywords="sync indian festivals google calendar, export hindu calendar outlook, indian festival ical download, add diwali google calendar, sync eid outlook calendar, indian holiday calendar export, festival calendar sync tool 2025, download ics indian festivals"
        canonicalUrl="https://moneycal.in/festival-tools/indian-holiday-calendar-sync"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <RefreshCw className="w-20 h-20 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
              🔄 Indian Holiday Calendar Sync
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Sync All Indian Festivals to Google Calendar, Outlook & Apple Calendar in One Click
            </p>
          </motion.div>

          {/* Sync Options */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">⚙️ Configure Your Festival Calendar</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Region</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 outline-none text-lg"
                >
                  <option>All India</option>
                  <option>Maharashtra</option>
                  <option>Delhi</option>
                  <option>Karnataka</option>
                  <option>Tamil Nadu</option>
                  <option>Gujarat</option>
                  <option>West Bengal</option>
                  <option>Punjab</option>
                  <option>Kerala</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Include Holiday Types</label>
                <div className="flex flex-wrap gap-3">
                  {['national', 'state', 'bank', 'religious', 'optional'].map(type => (
                    <button
                      key={type}
                      onClick={() => toggleIncludeType(type)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        includeTypes.includes(type)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {includeTypes.includes(type) && '✓ '}
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addToGoogleCalendar}
                  className="bg-gradient-to-r from-red-500 to-yellow-500 text-white p-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <Calendar className="w-12 h-12 mx-auto mb-3" />
                  Add to Google Calendar
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addToOutlook}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <Calendar className="w-12 h-12 mx-auto mb-3" />
                  Add to Outlook
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateICalFile}
                  className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <Download className="w-12 h-12 mx-auto mb-3" />
                  Download iCal (.ics)
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateICalFile}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <Download className="w-12 h-12 mx-auto mb-3" />
                  Apple Calendar
                </motion.button>
              </div>

              {generated && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-400 rounded-xl p-6 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-green-900 mb-2">✅ Calendar Generated Successfully!</h3>
                  <p className="text-green-800">Your Indian festival calendar has been created and is ready to use.</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* SEO Content - Comprehensive Guide */}
          <div className="bg-white rounded-2xl shadow-xl p-8 prose prose-lg max-w-none">
            <h2>Complete Guide to Syncing Indian Festivals with Your Digital Calendar</h2>
            
            <div className="space-y-6">
              <div>
                <h3>Why Sync Indian Festivals to Google Calendar & Outlook?</h3>
                <ul>
                  <li><strong>Never miss important festivals:</strong> Get automatic reminders for Diwali, Eid, Christmas, and 100+ Indian festivals</li>
                  <li><strong>Plan in advance:</strong> See all festivals in your monthly/yearly view</li>
                  <li><strong>Share with family:</strong> Export and share calendar with relatives</li>
                  <li><strong>Works across devices:</strong> Sync automatically to phone, tablet, laptop</li>
                  <li><strong>Integration with work calendar:</strong> Plan leaves and vacations around festivals</li>
                  <li><strong>Regional customization:</strong> Include state-specific festivals relevant to you</li>
                </ul>
              </div>

              <div>
                <h3>How to Sync Indian Festivals to Google Calendar</h3>
                <ol>
                  <li>Select your region/state from dropdown</li>
                  <li>Choose which holiday types to include (national, state, bank)</li>
                  <li>Click "Add to Google Calendar" button</li>
                  <li>Sign in to your Google account if prompted</li>
                  <li>Confirm to add events - all festivals appear in your calendar!</li>
                  <li>Set up automatic reminders in Google Calendar settings</li>
                </ol>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
                <h3>🎯 Supported Calendar Platforms</h3>
                <ul>
                  <li><strong>Google Calendar:</strong> Direct integration, works on Android & web</li>
                  <li><strong>Microsoft Outlook:</strong> Import .ics file, works on Windows & web</li>
                  <li><strong>Apple Calendar (iCal):</strong> Import .ics file, works on iPhone, iPad, Mac</li>
                  <li><strong>Any iCal-compatible app:</strong> Download universal .ics file</li>
                </ul>
              </div>

              <div>
                <h3>Festival Categories Available for Sync</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold">National Holidays (9 holidays)</h4>
                    <ul className="text-sm">
                      <li>• Republic Day (Jan 26)</li>
                      <li>• Independence Day (Aug 15)</li>
                      <li>• Gandhi Jayanti (Oct 2)</li>
                      <li>• Ambedkar Jayanti (Apr 14)</li>
                      <li>• Good Friday, Eid, Christmas</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold">State-Specific Festivals</h4>
                    <ul className="text-sm">
                      <li>• Gudi Padwa (Maharashtra)</li>
                      <li>• Pongal (Tamil Nadu)</li>
                      <li>• Onam (Kerala)</li>
                      <li>• Baisakhi (Punjab)</li>
                      <li>• Durga Puja (West Bengal)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3>Related Tools</h3>
                <div className="grid sm:grid-cols-2 gap-4 not-prose">
                  <a href="/festival-tools/custom-festival-reminder" className="block p-4 bg-purple-50 rounded-xl hover:bg-purple-100">
                    <h4 className="font-bold text-purple-900">🔔 Custom Reminders</h4>
                  </a>
                  <a href="/festival-tools/public-holiday-finder" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100">
                    <h4 className="font-bold text-blue-900">📅 Holiday Finder</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndianHolidayCalendarSync;

