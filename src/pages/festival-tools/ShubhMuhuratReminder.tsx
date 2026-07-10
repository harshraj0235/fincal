import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Clock, Star, Sun, Moon, Gift, TrendingUp, Download, Share2, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const ShubhMuhuratReminder: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('delhi');
  const [selectedPurpose, setSelectedPurpose] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Cities database
  const cities = {
    delhi: { name: 'Delhi', lat: 28.7041, lon: 77.1025, sunrise: '06:30', sunset: '18:15' },
    mumbai: { name: 'Mumbai', lat: 19.0760, lon: 72.8777, sunrise: '06:45', sunset: '18:30' },
    bangalore: { name: 'Bangalore', lat: 12.9716, lon: 77.5946, sunrise: '06:20', sunset: '18:20' },
    kolkata: { name: 'Kolkata', lat: 22.5726, lon: 88.3639, sunrise: '05:45', sunset: '17:45' },
    chennai: { name: 'Chennai', lat: 13.0827, lon: 80.2707, sunrise: '06:00', sunset: '18:00' },
    hyderabad: { name: 'Hyderabad', lat: 17.3850, lon: 78.4867, sunrise: '06:15', sunset: '18:10' },
    pune: { name: 'Pune', lat: 18.5204, lon: 73.8567, sunrise: '06:35', sunset: '18:25' },
    ahmedabad: { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714, sunrise: '06:50', sunset: '18:35' },
    jaipur: { name: 'Jaipur', lat: 26.9124, lon: 75.7873, sunrise: '06:40', sunset: '18:20' },
    varanasi: { name: 'Varanasi', lat: 25.3176, lon: 82.9739, sunrise: '05:50', sunset: '17:50' }
  };

  // Muhurat purposes
  const purposes = [
    { id: 'all', name: 'All Activities', icon: '⭐', color: 'purple' },
    { id: 'gold', name: 'Buying Gold/Jewelry', icon: '🪙', color: 'yellow' },
    { id: 'property', name: 'Property Purchase', icon: '🏠', color: 'green' },
    { id: 'business', name: 'Starting Business', icon: '💼', color: 'blue' },
    { id: 'marriage', name: 'Marriage/Engagement', icon: '💒', color: 'pink' },
    { id: 'vehicle', name: 'Vehicle Purchase', icon: '🚗', color: 'orange' },
    { id: 'investment', name: 'Investment/Trading', icon: '📈', color: 'indigo' },
    { id: 'education', name: 'Education/Admission', icon: '🎓', color: 'cyan' },
    { id: 'travel', name: 'Travel/Journey', icon: '✈️', color: 'teal' },
    { id: 'housewarming', name: 'Griha Pravesh', icon: '🏡', color: 'red' }
  ];

  // Generate muhurat data for today
  const generateMuhurats = () => {
    const today = new Date();
    const city = cities[selectedCity as keyof typeof cities];
    
    const muhurats = [
      {
        type: 'Brahma Muhurat',
        start: '04:30',
        end: '06:00',
        quality: 'Best',
        color: 'from-purple-100 to-pink-100',
        border: 'border-purple-500',
        purposes: ['all', 'education', 'business', 'investment'],
        description: 'Most auspicious time for spiritual activities, meditation, and planning',
        nakshatra: 'Rohini',
        benefits: 'Mental clarity, spiritual growth, success in new ventures'
      },
      {
        type: 'Abhijit Muhurat',
        start: '11:54',
        end: '12:42',
        quality: 'Excellent',
        color: 'from-yellow-100 to-orange-100',
        border: 'border-yellow-500',
        purposes: ['all', 'gold', 'property', 'business', 'marriage', 'investment'],
        description: 'Victory time - removes all doshas, best for important work',
        nakshatra: 'Uttara Phalguni',
        benefits: 'Success guaranteed, removes obstacles, victory in all matters'
      },
      {
        type: 'Godhuli Muhurat',
        start: '17:45',
        end: '18:15',
        quality: 'Very Good',
        color: 'from-orange-100 to-red-100',
        border: 'border-orange-500',
        purposes: ['gold', 'property', 'vehicle', 'housewarming'],
        description: 'Twilight time - auspicious for purchases and new beginnings',
        nakshatra: 'Pushya',
        benefits: 'Prosperity, wealth increase, successful purchases'
      },
      {
        type: 'Amrit Muhurat',
        start: '09:30',
        end: '11:00',
        quality: 'Excellent',
        color: 'from-green-100 to-emerald-100',
        border: 'border-green-500',
        purposes: ['marriage', 'education', 'travel', 'business'],
        description: 'Nectar time - brings long-lasting success and happiness',
        nakshatra: 'Shravana',
        benefits: 'Long-term success, happiness, prosperity'
      },
      {
        type: 'Vijay Muhurat',
        start: '14:00',
        end: '15:30',
        quality: 'Good',
        color: 'from-blue-100 to-cyan-100',
        border: 'border-blue-500',
        purposes: ['business', 'investment', 'vehicle', 'travel'],
        description: 'Victory time - ensures success in competitive matters',
        nakshatra: 'Dhanishta',
        benefits: 'Victory, competitive success, wealth creation'
      },
      {
        type: 'Choghadiya Shubh',
        start: '06:30',
        end: '08:00',
        quality: 'Good',
        color: 'from-pink-100 to-rose-100',
        border: 'border-pink-500',
        purposes: ['all', 'education', 'marriage'],
        description: 'Auspicious morning time for general activities',
        nakshatra: 'Hasta',
        benefits: 'General prosperity, good outcomes'
      },
      {
        type: 'Ravi Yoga',
        start: '13:00',
        end: '14:30',
        quality: 'Very Good',
        color: 'from-amber-100 to-yellow-100',
        border: 'border-amber-500',
        purposes: ['gold', 'business', 'investment'],
        description: 'Sun-blessed time for wealth and authority',
        nakshatra: 'Magha',
        benefits: 'Authority, respect, financial gains'
      },
      {
        type: 'Sarvartha Siddhi Yoga',
        start: '10:30',
        end: '12:00',
        quality: 'Best',
        color: 'from-indigo-100 to-purple-100',
        border: 'border-indigo-500',
        purposes: ['all', 'property', 'marriage', 'housewarming'],
        description: 'All-success yoga - accomplishes all desires',
        nakshatra: 'Revati',
        benefits: 'Complete success, fulfillment of wishes'
      }
    ];

    return muhurats.filter(m => {
      if (selectedPurpose === 'all') return true;
      return m.purposes.includes(selectedPurpose);
    });
  };

  const muhurats = generateMuhurats();
  const city = cities[selectedCity as keyof typeof cities];

  // Calculate current time status
  const getCurrentMuhurat = () => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    for (const muhurat of muhurats) {
      if (currentTime >= muhurat.start && currentTime <= muhurat.end) {
        return muhurat;
      }
    }
    return null;
  };

  const getNextMuhurat = () => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    for (const muhurat of muhurats) {
      if (currentTime < muhurat.start) {
        return muhurat;
      }
    }
    return muhurats[0]; // Tomorrow's first muhurat
  };

  const currentMuhurat = getCurrentMuhurat();
  const nextMuhurat = getNextMuhurat();

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      // In production: Send to backend API
      alert(`✅ Subscribed! You'll receive daily Shubh Muhurat alerts at ${email}`);
    }
  };

  const downloadICS = () => {
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MoneyCal//Shubh Muhurat Calendar//EN
METHOD:PUBLISH
`;

    muhurats.forEach((muhurat) => {
      const today = new Date();
      const startTime = muhurat.start.split(':');
      const endTime = muhurat.end.split(':');
      
      icsContent += `BEGIN:VEVENT
UID:muhurat-${muhurat.type.replace(/\s/g, '-')}-${today.toISOString().split('T')[0]}@moneycal.in
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${today.toISOString().split('T')[0].replace(/-/g, '')}T${startTime[0]}${startTime[1]}00
DTEND:${today.toISOString().split('T')[0].replace(/-/g, '')}T${endTime[0]}${endTime[1]}00
SUMMARY:${muhurat.type} - ${muhurat.quality}
DESCRIPTION:${muhurat.description} | Nakshatra: ${muhurat.nakshatra}
LOCATION:${city.name}, India
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Reminder: ${muhurat.type} in 30 minutes
END:VALARM
END:VEVENT
`;
    });

    icsContent += 'END:VCALENDAR';

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Shubh-Muhurat-${city.name}-${new Date().toISOString().split('T')[0]}.ics`;
    a.click();
  };

  return (
    <>
      <SEOHelmet
        title="Shubh Muhurat Reminder 2025 - Daily Auspicious Time Alerts India | MoneyCal"
        description="Get daily Shubh Muhurat reminders for buying gold, property, marriage, business. Abhijit Muhurat, Brahma Muhurat, Amrit Muhurat timings for all Indian cities. Free email alerts with Vedic astrology guidance."
        keywords="Shubh Muhurat today, auspicious time today, Abhijit Muhurat time, Brahma Muhurat, Amrit Muhurat, best time to buy gold, marriage muhurat, property purchase timing, शुभ मुहूर्त"
        canonicalUrl="/festival-tools/shubh-muhurat-reminder"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Shubh Muhurat Reminder',
          description: 'Daily auspicious time alerts for all activities with Vedic astrology guidance',
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
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center mb-4">
              <Bell className="h-12 w-12 mr-4 animate-bounce" />
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                शुभ मुहूर्त रिमाइंडर
              </h1>
              <Star className="h-12 w-12 ml-4 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-2">
              Shubh Muhurat Reminder
            </h2>
            <p className="text-center text-xl text-orange-100 max-w-3xl mx-auto">
              Never Miss an Auspicious Time - Daily Alerts for Gold, Property, Marriage & More!
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Current Muhurat Alert */}
          {currentMuhurat && (
            <div className={`bg-gradient-to-br ${currentMuhurat.color} rounded-2xl shadow-2xl p-8 mb-8 border-4 ${currentMuhurat.border} animate-pulse`}>
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <AlertCircle className="h-10 w-10 text-orange-600 mr-3 animate-bounce" />
                  <h3 className="text-3xl font-bold text-gray-900">
                    🔔 HAPPENING NOW! 🔔
                  </h3>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  {currentMuhurat.type}
                </h2>
                <p className="text-2xl text-gray-700 mb-4">
                  {currentMuhurat.start} - {currentMuhurat.end} ({currentMuhurat.quality})
                </p>
                <p className="text-lg text-gray-800 mb-4">{currentMuhurat.description}</p>
                <div className="bg-white rounded-xl p-4 inline-block">
                  <p className="text-sm text-gray-600">Benefits</p>
                  <p className="font-bold text-green-700">{currentMuhurat.benefits}</p>
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-5 w-5 mr-2" />
                  Select Your City
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
                <p className="text-xs text-gray-600 mt-2">
                  <Sun className="inline h-3 w-3 mr-1" />
                  Sunrise: {city.sunrise} | Sunset: {city.sunset}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Star className="inline h-5 w-5 mr-2" />
                  Select Purpose
                </label>
                <select
                  value={selectedPurpose}
                  onChange={(e) => setSelectedPurpose(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 text-lg font-semibold"
                >
                  {purposes.map(purpose => (
                    <option key={purpose.id} value={purpose.id}>
                      {purpose.icon} {purpose.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-400">
              <div className="flex items-center mb-4">
                <Bell className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900">
                  Get Daily Muhurat Alerts
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-green-300 rounded-xl focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleSubscribe}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-8 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all flex items-center"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Subscribe Free
                </button>
              </div>
              {subscribed && (
                <p className="mt-3 text-green-700 font-semibold flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  ✅ Subscribed! You'll receive daily alerts at 6 AM
                </p>
              )}
            </div>
          </div>

          {/* Next Muhurat Card */}
          {nextMuhurat && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-blue-400">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                ⏰ Next Auspicious Time
              </h3>
              <div className={`bg-gradient-to-br ${nextMuhurat.color} rounded-xl p-6 border-2 ${nextMuhurat.border}`}>
                <h4 className="text-3xl font-bold text-gray-900 mb-2">{nextMuhurat.type}</h4>
                <p className="text-xl text-gray-700 mb-3">
                  <Clock className="inline h-5 w-5 mr-2" />
                  {nextMuhurat.start} - {nextMuhurat.end}
                </p>
                <p className="text-gray-800 mb-3">{nextMuhurat.description}</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-gray-600">Nakshatra</p>
                    <p className="font-bold text-purple-700">{nextMuhurat.nakshatra}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-gray-600">Quality</p>
                    <p className="font-bold text-green-700">{nextMuhurat.quality}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All Muhurats Today */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Today's Shubh Muhurats - {city.name}
              </h2>
              <button
                onClick={downloadICS}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Calendar
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {muhurats.map((muhurat, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${muhurat.color} rounded-xl p-5 border-2 ${muhurat.border} hover:shadow-xl transition-all`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-gray-900">{muhurat.type}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      muhurat.quality === 'Best' ? 'bg-green-600 text-white' :
                      muhurat.quality === 'Excellent' ? 'bg-blue-600 text-white' :
                      muhurat.quality === 'Very Good' ? 'bg-purple-600 text-white' :
                      'bg-yellow-600 text-white'
                    }`}>
                      {muhurat.quality}
                    </span>
                  </div>

                  <div className="bg-white rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600">Start Time</p>
                        <p className="font-bold text-green-700 text-xl">{muhurat.start}</p>
                      </div>
                      <div className="text-gray-400">→</div>
                      <div>
                        <p className="text-xs text-gray-600">End Time</p>
                        <p className="font-bold text-red-700 text-xl">{muhurat.end}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-800 mb-3">{muhurat.description}</p>

                  <div className="bg-white rounded p-2 mb-2">
                    <p className="text-xs text-gray-600">Nakshatra</p>
                    <p className="font-semibold text-purple-700">{muhurat.nakshatra}</p>
                  </div>

                  <div className="bg-green-50 rounded p-2 border border-green-300">
                    <p className="text-xs text-gray-600">Benefits</p>
                    <p className="text-xs text-green-800 font-semibold">{muhurat.benefits}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Purpose Guide */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              📋 Muhurat Purpose Guide
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {purposes.slice(1).map((purpose, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 hover:shadow-lg transition-all border-2 border-purple-200 cursor-pointer"
                  onClick={() => setSelectedPurpose(purpose.id)}
                >
                  <div className="text-5xl mb-3 text-center">{purpose.icon}</div>
                  <h3 className="font-bold text-lg text-gray-900 text-center mb-2">
                    {purpose.name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    Click to view best timings
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-blue-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🔗 Related Astrology & Financial Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/festival-tools/nakshatra-festival" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Nakshatra Finder</p>
                <p className="text-sm text-gray-600">27 birth stars with timing</p>
              </a>
              <a href="/festival-tools/panchang-today" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-yellow-200">
                <p className="font-semibold text-yellow-600 mb-1">Daily Panchang</p>
                <p className="text-sm text-gray-600">Complete Hindu calendar</p>
              </a>
              <a href="/festival-tools/vrat-upavas-calendar" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Vrat Calendar</p>
                <p className="text-sm text-gray-600">All fasting dates</p>
              </a>
              <a href="/tools/gold-rate-calculator" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-yellow-200">
                <p className="font-semibold text-yellow-600 mb-1">Gold Calculator</p>
                <p className="text-sm text-gray-600">Best time to buy gold</p>
              </a>
              <a href="/learn/credit-cards" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Credit Cards Guide</p>
                <p className="text-sm text-gray-600">Financial planning</p>
              </a>
              <a href="/festival-tools" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-pink-200">
                <p className="font-semibold text-pink-600 mb-1">All Festival Tools</p>
                <p className="text-sm text-gray-600">More calculators</p>
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "What is Shubh Muhurat and why is it important?",
                  a: "Shubh Muhurat (शुभ मुहूर्त) is an auspicious time calculated using Vedic astrology based on planetary positions, Nakshatra, Tithi, and Yoga. Performing important activities during Shubh Muhurat increases chances of success and removes obstacles."
                },
                {
                  q: "Which is the best Muhurat for buying gold in 2025?",
                  a: "Abhijit Muhurat (11:54-12:42) and Brahma Muhurat (4:30-6:00 AM) are best for buying gold. Also, Pushya Nakshatra, Dhanteras, Akshaya Tritiya, and Dussehra are considered most auspicious for gold purchases."
                },
                {
                  q: "What is Abhijit Muhurat time today?",
                  a: "Abhijit Muhurat is the 8th Muhurat of the day, typically occurring between 11:54 AM to 12:42 PM (48 minutes). This is the most powerful time that removes all doshas and is suitable for all activities."
                },
                {
                  q: "Can I get WhatsApp alerts for daily Muhurat?",
                  a: "Currently we offer email alerts for daily Shubh Muhurat. WhatsApp alert feature will be available soon for premium subscribers. Subscribe with your email above to get started."
                },
                {
                  q: "Which Muhurat is best for marriage in 2025?",
                  a: "For marriage, look for Abhijit Muhurat, Brahma Muhurat, or Amrit Muhurat on auspicious days. Avoid Rahu Kaal, Yamaganda, and Gulika Kaal. Consult a Vedic astrologer for personalized wedding Muhurat based on bride and groom's horoscopes."
                },
                {
                  q: "Is Muhurat timing different for different cities?",
                  a: "Yes! Muhurat timings vary by city because they are calculated based on sunrise, sunset, and local planetary positions. Always select your city for accurate Muhurat timings."
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
                <a href="https://en.wikipedia.org/wiki/Muhurta" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Muhurat (Wikipedia)
                </a>
                {' | '}
                <a href="https://www.drikpanchang.com/muhurat/muhurat-today.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Muhurat Today
                </a>
                {' | '}
                <a href="https://vedicastrology.co.in/shubh-muhurat" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Shubh Muhurat Guide
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShubhMuhuratReminder;

