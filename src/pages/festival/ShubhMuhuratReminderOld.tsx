import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, Clock, Star, Sun, Moon, Download, Share2, Plus, Trash2 } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface Muhurat {
  id: string;
  name: string;
  date: string;
  time: string;
  type: 'wedding' | 'business' | 'housewarming' | 'vehicle' | 'general';
  nakshatra: string;
  tithi: string;
}

const ShubhMuhuratReminder: React.FC = () => {
  const [reminders, setReminders] = useState<Muhurat[]>([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [eventTime, setEventTime] = useState('10:00');
  const [eventType, setEventType] = useState<Muhurat['type']>('general');
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  // Predefined auspicious muhurats for 2025
  const predefinedMuhurats = [
    {
      name: 'Akshaya Tritiya 2025',
      date: '2025-04-21',
      time: '06:00-12:00',
      type: 'general' as const,
      nakshatra: 'Rohini',
      tithi: 'Tritiya'
    },
    {
      name: 'Diwali Lakshmi Puja 2025',
      date: '2025-10-20',
      time: '18:00-20:00',
      type: 'general' as const,
      nakshatra: 'Swati',
      tithi: 'Amavasya'
    },
    {
      name: 'Gudi Padwa 2025',
      date: '2025-03-30',
      time: '06:00-09:00',
      type: 'business' as const,
      nakshatra: 'Ashwini',
      tithi: 'Pratipada'
    },
    {
      name: 'Vijaya Dashami 2025',
      date: '2025-10-02',
      time: '10:00-12:00',
      type: 'vehicle' as const,
      nakshatra: 'Punarvasu',
      tithi: 'Dashami'
    }
  ];

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        setNotificationEnabled(permission === 'granted');
      });
    } else if ('Notification' in window) {
      setNotificationEnabled(Notification.permission === 'granted');
    }

    // Load saved reminders from localStorage
    const saved = localStorage.getItem('muhuratReminders');
    if (saved) {
      setReminders(JSON.parse(saved));
    }
  }, []);

  const addReminder = () => {
    if (!eventName || !eventDate || !eventTime) {
      alert('Please fill all fields');
      return;
    }

    const newReminder: Muhurat = {
      id: Date.now().toString(),
      name: eventName,
      date: eventDate,
      time: eventTime,
      type: eventType,
      nakshatra: 'Calculated',
      tithi: 'Based on date'
    };

    const updated = [...reminders, newReminder];
    setReminders(updated);
    localStorage.setItem('muhuratReminders', JSON.stringify(updated));

    // Set browser notification
    if (notificationEnabled) {
      scheduleNotification(newReminder);
    }

    // Reset form
    setEventName('');
    setEventDate(new Date().toISOString().split('T')[0]);
    setEventTime('10:00');
  };

  const deleteReminder = (id: string) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    localStorage.setItem('muhuratReminders', JSON.stringify(updated));
  };

  const scheduleNotification = (muhurat: Muhurat) => {
    const eventDateTime = new Date(`${muhurat.date}T${muhurat.time}`);
    const now = new Date();
    const timeDiff = eventDateTime.getTime() - now.getTime();

    if (timeDiff > 0 && timeDiff < 24 * 60 * 60 * 1000) { // Within 24 hours
      setTimeout(() => {
        if (notificationEnabled) {
          new Notification('🔔 Shubh Muhurat Reminder', {
            body: `${muhurat.name} at ${muhurat.time}`,
            icon: '/android-chrome-192x192.png'
          });
        }
      }, timeDiff);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'wedding': return 'bg-pink-100 text-pink-800 border-pink-300';
      case 'business': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'housewarming': return 'bg-green-100 text-green-800 border-green-300';
      case 'vehicle': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <>
      <SEOHelmet
        title="Shubh Muhurat Reminder 2025 - Free Auspicious Timing Alerts for Hindu Festivals & Ceremonies India"
        description="Never miss an auspicious muhurat! Get free reminders for shubh muhurat timings in 2025. Set alerts for weddings, festivals, housewarming, vehicle purchase & business ventures. Based on Vedic astrology panchang."
        keywords="shubh muhurat reminder, auspicious timing alerts 2025, muhurat notification india, vedic astrology reminders, festival muhurat calendar, wedding muhurat alert, hindu ceremony timings, panchang notifications, free muhurat app india"
        canonicalUrl="https://moneycal.in/festival-tools/shubh-muhurat-reminder"
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Bell className="w-16 h-16 text-orange-600 mx-auto mb-4 animate-bounce" />
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              🔔 Shubh Muhurat Reminder Bot
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Never Miss an Auspicious Moment - Get Instant Alerts for Shubh Muhurats in 2025
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Add Reminder Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                ➕ Create Custom Muhurat Reminder
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Name
                  </label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="e.g., House Warming Ceremony"
                    className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-4 focus:ring-orange-200 outline-none"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-4 focus:ring-orange-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-4 focus:ring-orange-200 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as Muhurat['type'])}
                    className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-4 focus:ring-orange-200 outline-none"
                  >
                    <option value="general">General Ceremony</option>
                    <option value="wedding">Wedding/Marriage</option>
                    <option value="business">Business Opening</option>
                    <option value="housewarming">Housewarming (Griha Pravesh)</option>
                    <option value="vehicle">Vehicle Purchase</option>
                  </select>
                </div>

                <button
                  onClick={addReminder}
                  className="w-full bg-gradient-to-r from-orange-600 to-pink-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-6 h-6" />
                  Set Reminder
                </button>

                {!notificationEnabled && (
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
                    <p className="text-sm text-yellow-800">
                      💡 Enable browser notifications to receive alerts for your muhurats
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* My Reminders */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🔔 My Muhurat Reminders ({reminders.length})
              </h2>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {reminders.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Bell className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>No reminders set yet</p>
                    <p className="text-sm">Create your first muhurat reminder!</p>
                  </div>
                ) : (
                  reminders.map((reminder) => (
                    <motion.div
                      key={reminder.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl border-2 ${getTypeColor(reminder.type)}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-1">{reminder.name}</h4>
                          <p className="text-sm mb-2">
                            📅 {new Date(reminder.date).toLocaleDateString('en-IN')} at {reminder.time}
                          </p>
                          <span className="text-xs font-semibold px-3 py-1 bg-white rounded-full">
                            {reminder.type.toUpperCase()}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteReminder(reminder.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Predefined Auspicious Muhurats for 2025 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-white rounded-2xl shadow-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ⭐ Major Auspicious Muhurats in 2025 - Pre-loaded Festival Timings
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {predefinedMuhurats.map((muhurat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200"
                >
                  <h3 className="text-xl font-bold text-orange-900 mb-2">{muhurat.name}</h3>
                  <div className="space-y-2 text-sm text-orange-800">
                    <p>📅 Date: <span className="font-semibold">{new Date(muhurat.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
                    <p>🕐 Time: <span className="font-semibold">{muhurat.time}</span></p>
                    <p>⭐ Nakshatra: <span className="font-semibold">{muhurat.nakshatra}</span></p>
                    <p>🌙 Tithi: <span className="font-semibold">{muhurat.tithi}</span></p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* SEO Content */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Complete Guide to Shubh Muhurat - Auspicious Timings in Hindu Tradition
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">What is Shubh Muhurat?</h3>
                <p>
                  <strong>Shubh Muhurat</strong> refers to the most auspicious time periods in Hindu tradition for conducting important life events and ceremonies. Based on <strong>Vedic astrology (Jyotish)</strong>, muhurat selection considers planetary positions, nakshatras (birth stars), tithis (lunar days), and other astrological factors to ensure success and blessings.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">Why Use Muhurat Reminders in 2025?</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Never miss auspicious timings</strong> for important life events</li>
                  <li><strong>Plan weddings, business openings, and ceremonies</strong> at the most favorable times</li>
                  <li><strong>Receive timely alerts</strong> for upcoming festivals and muhurats</li>
                  <li><strong>Traditional wisdom meets modern technology</strong> with browser notifications</li>
                  <li><strong>Free tool</strong> accessible anytime, anywhere on mobile and desktop</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">Types of Muhurats for Different Occasions</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Vivah Muhurat (Marriage):</strong> Most important muhurat for weddings and engagement ceremonies</li>
                  <li><strong>Griha Pravesh Muhurat:</strong> Auspicious time for housewarming and entering new home</li>
                  <li><strong>Vehicle Purchase Muhurat:</strong> Best timing for buying cars, bikes, or any vehicle</li>
                  <li><strong>Business Opening Muhurat:</strong> Ideal time to start new business ventures</li>
                  <li><strong>Namkaran Muhurat:</strong> Baby naming ceremony timing</li>
                  <li><strong>Upanayana Muhurat:</strong> Sacred thread ceremony</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">🎯 How to Use This Muhurat Reminder Tool</h3>
                <ol className="list-decimal pl-6 space-y-2 text-blue-800">
                  <li>Enter your event name and select date & time</li>
                  <li>Choose event type (wedding, business, housewarming, etc.)</li>
                  <li>Click "Set Reminder" to save in your browser</li>
                  <li>Enable browser notifications to receive timely alerts</li>
                  <li>Browse pre-loaded major festival muhurats for 2025</li>
                </ol>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">Related Festival & Panchang Tools</h3>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <a href="/festival-tools/panchang-today" className="block p-4 bg-purple-50 rounded-xl hover:bg-purple-100">
                    <h4 className="font-bold text-purple-900">📅 Today's Panchang</h4>
                    <p className="text-sm text-purple-700">Complete daily Hindu panchang</p>
                  </a>
                  <a href="/festival-tools/auspicious-marriage-days" className="block p-4 bg-pink-50 rounded-xl hover:bg-pink-100">
                    <h4 className="font-bold text-pink-900">💍 Marriage Muhurats</h4>
                    <p className="text-sm text-pink-700">40+ auspicious wedding dates 2025</p>
                  </a>
                  <a href="/festival-tools/nakshatra-festival" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100">
                    <h4 className="font-bold text-blue-900">⭐ Nakshatra Calculator</h4>
                    <p className="text-sm text-blue-700">Find birth star for any date</p>
                  </a>
                  <a href="/festival-tools/lunar-eclipse-predictor" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100">
                    <h4 className="font-bold text-gray-900">🌑 Eclipse Predictor</h4>
                    <p className="text-sm text-gray-700">Check eclipse dates & sutak kaal</p>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">Trusted External Resources</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <a href="https://www.drikpanchang.com/muhurat/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Drik Panchang - Comprehensive Muhurat Guide
                    </a>
                  </li>
                  <li>
                    <a href="https://www.prokerala.com/astrology/muhurat/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      ProKerala - Auspicious Muhurat Calculator
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShubhMuhuratReminder;

