import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Calendar, Clock, Plus, Trash2, Edit, Share2, Download, Star, AlertCircle, Check } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface CustomReminder {
  id: string;
  festivalName: string;
  date: string;
  time: string;
  reminderDays: number[];
  notificationType: 'browser' | 'email' | 'both';
  message: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  recurring: boolean;
  color: string;
}

const FESTIVAL_CATEGORIES = [
  'Hindu Festival', 'Islamic Festival', 'Christian Festival', 'Sikh Festival', 
  'Buddhist Festival', 'Jain Festival', 'Regional Festival', 'Family Event',
  'Personal Birthday', 'Anniversary', 'Cultural Event', 'Other'
];

const REMINDER_COLORS = [
  { name: 'Red', value: '#EF4444', bg: 'bg-red-500' },
  { name: 'Orange', value: '#F97316', bg: 'bg-orange-500' },
  { name: 'Yellow', value: '#EAB308', bg: 'bg-yellow-500' },
  { name: 'Green', value: '#10B981', bg: 'bg-green-500' },
  { name: 'Blue', value: '#3B82F6', bg: 'bg-blue-500' },
  { name: 'Purple', value: '#8B5CF6', bg: 'bg-purple-500' },
  { name: 'Pink', value: '#EC4899', bg: 'bg-pink-500' }
];

const CustomFestivalReminder: React.FC = () => {
  const [reminders, setReminders] = useState<CustomReminder[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [festivalName, setFestivalName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('09:00');
  const [reminderDays, setReminderDays] = useState<number[]>([1, 7]);
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('Hindu Festival');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [recurring, setRecurring] = useState(false);
  const [color, setColor] = useState('#3B82F6');
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  useEffect(() => {
    // Load reminders from localStorage
    const saved = localStorage.getItem('customFestivalReminders');
    if (saved) {
      setReminders(JSON.parse(saved));
    }

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        setNotificationEnabled(permission === 'granted');
      });
    } else if ('Notification' in window) {
      setNotificationEnabled(Notification.permission === 'granted');
    }

    // Check for due reminders every minute
    const checkInterval = setInterval(checkReminders, 60000);
    return () => clearInterval(checkInterval);
  }, [reminders]);

  const checkReminders = () => {
    const now = new Date();
    reminders.forEach(reminder => {
      const festivalDate = new Date(reminder.date);
      const daysDiff = Math.ceil((festivalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      if (reminder.reminderDays.includes(daysDiff) && notificationEnabled) {
        sendNotification(reminder, daysDiff);
      }
    });
  };

  const sendNotification = (reminder: CustomReminder, daysLeft: number) => {
    if (!notificationEnabled) return;
    
    new Notification(`🔔 ${reminder.festivalName} Reminder`, {
      body: `${daysLeft} days left! ${reminder.message || 'Don\'t forget to prepare!'}`,
      icon: '/android-chrome-192x192.png',
      badge: '/favicon-32x32.png',
      tag: reminder.id
    });
  };

  const saveReminder = () => {
    if (!festivalName || !date) {
      alert('Please fill in festival name and date');
      return;
    }

    const newReminder: CustomReminder = {
      id: editingId || Date.now().toString(),
      festivalName,
      date,
      time,
      reminderDays,
      notificationType: 'browser',
      message,
      category,
      priority,
      recurring,
      color
    };

    let updated: CustomReminder[];
    if (editingId) {
      updated = reminders.map(r => r.id === editingId ? newReminder : r);
    } else {
      updated = [...reminders, newReminder];
    }

    setReminders(updated);
    localStorage.setItem('customFestivalReminders', JSON.stringify(updated));
    resetForm();
  };

  const deleteReminder = (id: string) => {
    if (confirm('Delete this reminder?')) {
      const updated = reminders.filter(r => r.id !== id);
      setReminders(updated);
      localStorage.setItem('customFestivalReminders', JSON.stringify(updated));
    }
  };

  const editReminder = (reminder: CustomReminder) => {
    setEditingId(reminder.id);
    setFestivalName(reminder.festivalName);
    setDate(reminder.date);
    setTime(reminder.time);
    setReminderDays(reminder.reminderDays);
    setMessage(reminder.message);
    setCategory(reminder.category);
    setPriority(reminder.priority);
    setRecurring(reminder.recurring);
    setColor(reminder.color);
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFestivalName('');
    setDate(new Date().toISOString().split('T')[0]);
    setTime('09:00');
    setReminderDays([1, 7]);
    setMessage('');
    setCategory('Hindu Festival');
    setPriority('medium');
    setRecurring(false);
    setColor('#3B82F6');
    setIsFormOpen(false);
  };

  const toggleReminderDay = (day: number) => {
    if (reminderDays.includes(day)) {
      setReminderDays(reminderDays.filter(d => d !== day));
    } else {
      setReminderDays([...reminderDays, day].sort((a, b) => b - a));
    }
  };

  const exportReminders = () => {
    const csvContent = [
      ['Festival', 'Date', 'Time', 'Category', 'Priority', 'Reminder Days', 'Message'].join(','),
      ...reminders.map(r => [
        `"${r.festivalName}"`,
        r.date,
        r.time,
        r.category,
        r.priority,
        r.reminderDays.join(';'),
        `"${r.message}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-festival-reminders.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const upcomingReminders = useMemo(() => {
    return reminders
      .filter(r => new Date(r.date) >= new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 10);
  }, [reminders]);

  const pastReminders = reminders.filter(r => new Date(r.date) < new Date());

  return (
    <>
      <SEOHelmet
        title="Custom Festival Reminder Generator 2025 - Create Personalized Festival Alerts & Notifications India | Free Reminder App"
        description="Create custom reminders for any Indian festival! Set personalized alerts for Hindu, Islamic, Christian, Sikh festivals. Browser notifications, email reminders, recurring events. Never miss Diwali, Eid, Christmas, Holi, or family celebrations. Free festival reminder generator."
        keywords="custom festival reminder, personalized festival alerts, indian festival notification app, create festival reminder, diwali reminder, eid reminder, christmas reminder, hindu festival alerts, recurring festival reminders free, festival notification generator india"
        canonicalUrl="https://moneycal.in/festival-tools/custom-festival-reminder"
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Bell className="w-20 h-20 text-purple-600 mx-auto mb-4 animate-bounce" />
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
              🔔 Custom Festival Reminder Generator
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Create Personalized Alerts for Every Indian Festival, Birthday & Special Occasion
            </p>
            <p className="text-gray-600 mt-2">
              Never Miss a Festival Again - Set Smart Reminders for Diwali, Eid, Christmas & 100+ Celebrations
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Bell className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-black text-gray-900">{reminders.length}</div>
              <p className="text-sm text-gray-600">Total Reminders</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-black text-gray-900">{upcomingReminders.length}</div>
              <p className="text-sm text-gray-600">Upcoming</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Star className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-black text-gray-900">{reminders.filter(r => r.priority === 'high').length}</div>
              <p className="text-sm text-gray-600">High Priority</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Check className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-black text-gray-900">{pastReminders.length}</div>
              <p className="text-sm text-gray-600">Celebrated</p>
            </motion.div>
          </div>

          {/* Create Reminder Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-xl flex items-center gap-3 mx-auto"
            >
              <Plus className="w-6 h-6" />
              Create New Festival Reminder
            </button>
          </div>

          {/* Notification Status */}
          {!notificationEnabled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 mb-8 max-w-3xl mx-auto"
            >
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-yellow-900 mb-2">Enable Notifications for Timely Alerts</h3>
                  <p className="text-yellow-800 mb-3">
                    Allow browser notifications to receive reminders for your festivals and special occasions.
                  </p>
                  <button
                    onClick={() => {
                      Notification.requestPermission().then(permission => {
                        setNotificationEnabled(permission === 'granted');
                      });
                    }}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-semibold"
                  >
                    Enable Notifications
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Reminder Form Modal */}
            <AnimatePresence>
              {isFormOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="lg:col-span-2 bg-white rounded-2xl shadow-2xl p-8"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingId ? '✏️ Edit Reminder' : '➕ Create New Reminder'}
                    </h2>
                    <button
                      onClick={resetForm}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Festival/Event Name *
                      </label>
                      <input
                        type="text"
                        value={festivalName}
                        onChange={(e) => setFestivalName(e.target.value)}
                        placeholder="e.g., Diwali, Eid, Grandma's Birthday"
                        className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 outline-none"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 outline-none"
                      >
                        {FESTIVAL_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Remind Me (Select Days Before Event)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[1, 3, 7, 14, 30, 60, 90].map(day => (
                          <button
                            key={day}
                            onClick={() => toggleReminderDay(day)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                              reminderDays.includes(day)
                                ? 'bg-purple-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {day} {day === 1 ? 'day' : 'days'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Custom Message (Optional)
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Add a personal note for this reminder..."
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 outline-none"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                        <select
                          value={priority}
                          onChange={(e) => setPriority(e.target.value as typeof priority)}
                          className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 outline-none"
                        >
                          <option value="high">High Priority 🔴</option>
                          <option value="medium">Medium Priority 🟡</option>
                          <option value="low">Low Priority 🟢</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Color Tag</label>
                        <div className="flex gap-2">
                          {REMINDER_COLORS.map(c => (
                            <button
                              key={c.value}
                              onClick={() => setColor(c.value)}
                              className={`w-10 h-10 rounded-lg ${c.bg} ${
                                color === c.value ? 'ring-4 ring-offset-2 ring-gray-400' : ''
                              }`}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                      <input
                        type="checkbox"
                        id="recurring"
                        checked={recurring}
                        onChange={(e) => setRecurring(e.target.checked)}
                        className="w-5 h-5 text-purple-600"
                      />
                      <label htmlFor="recurring" className="text-sm font-semibold text-purple-900">
                        🔄 Recurring yearly (repeat this reminder every year)
                      </label>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={saveReminder}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all"
                      >
                        {editingId ? '💾 Update Reminder' : '➕ Save Reminder'}
                      </button>
                      <button
                        onClick={resetForm}
                        className="px-6 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* My Reminders List */}
            <div className={`${isFormOpen ? 'lg:col-span-1' : 'lg:col-span-3'}`}>
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    📋 My Festival Reminders ({reminders.length})
                  </h2>
                  {reminders.length > 0 && (
                    <button
                      onClick={exportReminders}
                      className="text-sm bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 font-semibold flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </button>
                  )}
                </div>

                {reminders.length === 0 ? (
                  <div className="text-center py-16">
                    <Calendar className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-400 mb-2">No Reminders Yet</h3>
                    <p className="text-gray-500 mb-6">Create your first custom festival reminder!</p>
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700"
                    >
                      Get Started
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {upcomingReminders.map((reminder, idx) => {
                      const daysLeft = Math.ceil((new Date(reminder.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                      const priorityColors = {
                        high: 'border-red-400 bg-red-50',
                        medium: 'border-yellow-400 bg-yellow-50',
                        low: 'border-green-400 bg-green-50'
                      };

                      return (
                        <motion.div
                          key={reminder.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`p-6 rounded-xl border-2 ${priorityColors[reminder.priority]}`}
                          style={{ borderLeftWidth: '6px', borderLeftColor: reminder.color }}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {reminder.festivalName}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">
                                📅 {new Date(reminder.date).toLocaleDateString('en-IN', { 
                                  weekday: 'long', 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })} at {reminder.time}
                              </p>
                              <p className="text-sm text-gray-700 mb-3">{reminder.message}</p>
                              <div className="flex flex-wrap gap-2">
                                <span className="text-xs px-3 py-1 bg-white rounded-full font-semibold border">
                                  {reminder.category}
                                </span>
                                <span className={`text-xs px-3 py-1 rounded-full font-bold text-white ${
                                  reminder.priority === 'high' ? 'bg-red-500' :
                                  reminder.priority === 'medium' ? 'bg-yellow-500' :
                                  'bg-green-500'
                                }`}>
                                  {reminder.priority.toUpperCase()}
                                </span>
                                {reminder.recurring && (
                                  <span className="text-xs px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-semibold">
                                    🔄 Recurring
                                  </span>
                                )}
                                <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                                  ⏰ {daysLeft} days left
                                </span>
                              </div>
                              <div className="mt-2 text-xs text-gray-500">
                                Reminders: {reminder.reminderDays.sort((a,b) => b-a).map(d => `${d}d`).join(', ')} before
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => editReminder(reminder)}
                                className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-5 h-5 text-blue-600" />
                              </button>
                              <button
                                onClick={() => deleteReminder(reminder.id)}
                                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-5 h-5 text-red-600" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Complete Guide to Custom Festival Reminders - Never Miss Indian Festivals & Special Occasions
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Why Use Custom Festival Reminder Generator?</h3>
                <p>
                  India celebrates over <strong>100 major festivals</strong> annually across different religions and regions. With our <strong>Custom Festival Reminder Generator</strong>, you can create personalized alerts for every occasion that matters to you - from Diwali and Eid to family birthdays and regional celebrations.
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Never miss important festivals:</strong> Set reminders days or weeks in advance</li>
                  <li><strong>Personalize everything:</strong> Custom messages, colors, priorities for each reminder</li>
                  <li><strong>Multi-religion support:</strong> Hindu, Islamic, Christian, Sikh, Buddhist, Jain festivals</li>
                  <li><strong>Recurring reminders:</strong> Set once, repeat every year automatically</li>
                  <li><strong>Smart notifications:</strong> Browser alerts at perfect timing</li>
                  <li><strong>Family-friendly:</strong> Add birthdays, anniversaries, and personal events</li>
                  <li><strong>Export & share:</strong> Download CSV, share with family</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">How to Create Perfect Festival Reminders in 2025</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li><strong>Click "Create New Festival Reminder"</strong> to open the reminder form</li>
                  <li><strong>Enter festival name</strong> (e.g., "Diwali 2025", "Eid-ul-Fitr", "Mom's Birthday")</li>
                  <li><strong>Select date and time</strong> of the event</li>
                  <li><strong>Choose reminder days</strong> - get notified 1, 7, 14, 30, or 90 days before</li>
                  <li><strong>Set priority</strong> (High/Medium/Low) for importance</li>
                  <li><strong>Pick a color tag</strong> for visual organization</li>
                  <li><strong>Add custom message</strong> with personal notes or shopping lists</li>
                  <li><strong>Enable recurring</strong> for yearly festivals</li>
                  <li><strong>Save and relax</strong> - browser will notify you at perfect time!</li>
                </ol>
              </div>

              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-900 mb-3">💡 Pro Tips for Festival Planning</h3>
                <ul className="list-disc pl-6 space-y-2 text-green-800">
                  <li><strong>Set multiple reminders:</strong> 30 days (booking travel), 7 days (shopping), 1 day (final prep)</li>
                  <li><strong>Use high priority for major festivals:</strong> Diwali, Eid, Christmas deserve red alerts!</li>
                  <li><strong>Color code by category:</strong> Purple for Hindu, Green for Islamic, Red for family events</li>
                  <li><strong>Add detailed messages:</strong> Include shopping lists, travel plans, recipe reminders</li>
                  <li><strong>Enable recurring for annual festivals:</strong> Set once, works every year!</li>
                  <li><strong>Export and backup:</strong> Download CSV to keep records safe</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">Major Indian Festivals to Set Reminders For</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg text-purple-900 mb-2">🕉️ Hindu Festivals</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Diwali - Festival of Lights (October 20, 2025)</li>
                      <li>• Holi - Festival of Colors (March 14, 2025)</li>
                      <li>• Dussehra / Navratri (October 2, 2025)</li>
                      <li>• Janmashtami (August 16, 2025)</li>
                      <li>• Ganesh Chaturthi (August 27, 2025)</li>
                      <li>• Ram Navami (April 6, 2025)</li>
                      <li>• Maha Shivaratri (February 26, 2025)</li>
                      <li>• Raksha Bandhan, Karwa Chauth, Makar Sankranti</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-green-900 mb-2">☪️ Islamic Festivals</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Eid-ul-Fitr - End of Ramadan (March 31, 2025*)</li>
                      <li>• Eid-ul-Adha / Bakrid (June 7, 2025*)</li>
                      <li>• Muharram / Ashura</li>
                      <li>• Milad-un-Nabi (Prophet's birthday)</li>
                      <li>• Shab-e-Barat</li>
                      <li>• Shab-e-Qadr</li>
                      <li className="text-xs italic">*Subject to moon sighting, may vary ±1 day</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-blue-900 mb-2">✝️ Christian Festivals</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Christmas - December 25</li>
                      <li>• Good Friday - April 18, 2025</li>
                      <li>• Easter Sunday - April 20, 2025</li>
                      <li>• All Saints' Day</li>
                      <li>• Feast of Epiphany</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-orange-900 mb-2">🙏 Sikh & Other Festivals</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Guru Nanak Jayanti (November 5, 2025)</li>
                      <li>• Baisakhi (April 13, 2025)</li>
                      <li>• Buddha Purnima (May 12, 2025)</li>
                      <li>• Mahavir Jayanti (April 10, 2025)</li>
                      <li>• Lohri, Guru Gobind Singh Jayanti</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">Related Festival Planning Tools</h3>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <a href="/festival-tools/festival-countdown-clock" className="block p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                    <h4 className="font-bold text-purple-900">⏰ Festival Countdown</h4>
                    <p className="text-sm text-purple-700">Live countdown to 100+ festivals</p>
                  </a>
                  <a href="/festival-tools/public-holiday-finder" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                    <h4 className="font-bold text-blue-900">📅 Public Holidays</h4>
                    <p className="text-sm text-blue-700">State-wise holiday calendar</p>
                  </a>
                  <a href="/festival-tools/shubh-muhurat-reminder" className="block p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
                    <h4 className="font-bold text-orange-900">🔔 Muhurat Reminder</h4>
                    <p className="text-sm text-orange-700">Auspicious timing alerts</p>
                  </a>
                  <a href="/festival-tools/festival-monthly-list" className="block p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <h4 className="font-bold text-green-900">📋 Monthly Festival List</h4>
                    <p className="text-sm text-green-700">Month-by-month festival guide</p>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-lg">How do I receive festival reminder notifications?</h4>
                    <p>Click "Enable Notifications" when prompted by your browser. Our tool will send you browser push notifications at the scheduled times before your festivals.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Can I set reminders for Islamic festivals that depend on moon sighting?</h4>
                    <p>Yes! You can create reminders for Eid and other Islamic festivals. Since dates may vary by ±1 day based on moon sighting, we recommend setting reminders 2-3 days in advance.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Will my reminders work every year automatically?</h4>
                    <p>Yes! Enable the "Recurring yearly" option when creating a reminder, and it will automatically remind you every year for festivals like Diwali, Christmas, and birthdays.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Can I export my festival reminders?</h4>
                    <p>Absolutely! Click the "Export CSV" button to download all your reminders. You can import this into Google Calendar, Outlook, or keep it as a backup.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">External Resources</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <a href="https://www.india.gov.in/calendar" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      India.gov.in - Official Festival Calendar
                    </a>
                  </li>
                  <li>
                    <a href="https://www.drikpanchang.com/festivals/festivals-calendar.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Drik Panchang - Hindu Festival Calendar
                    </a>
                  </li>
                  <li>
                    <a href="https://en.wikipedia.org/wiki/List_of_festivals_in_India" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Wikipedia - Complete List of Indian Festivals
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

export default CustomFestivalReminder;

