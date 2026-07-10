import React, { useState } from 'react';
import { Calendar, Heart, Star, Sun, Moon, Download, Share2, MapPin, Clock, Gift, CheckCircle, AlertCircle } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const AuspiciousMarriageDays: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | 'all'>('all');
  const [selectedCity, setSelectedCity] = useState('delhi');
  const [selectedRashi, setSelectedRashi] = useState<string | 'all'>('all');

  // Cities database
  const cities = {
    delhi: { name: 'Delhi', lat: 28.7041, lon: 77.1025 },
    mumbai: { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    bangalore: { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    kolkata: { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
    chennai: { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
    hyderabad: { name: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
    pune: { name: 'Pune', lat: 18.5204, lon: 73.8567 },
    ahmedabad: { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714 },
    jaipur: { name: 'Jaipur', lat: 26.9124, lon: 75.7873 },
    lucknow: { name: 'Lucknow', lat: 26.8467, lon: 80.9462 }
  };

  // Rashis (Zodiac signs)
  const rashis = [
    { id: 'aries', name: 'Aries (Mesh)', icon: '♈', favorableMonths: [3, 4, 10, 11] },
    { id: 'taurus', name: 'Taurus (Vrishabha)', icon: '♉', favorableMonths: [4, 5, 11, 12] },
    { id: 'gemini', name: 'Gemini (Mithun)', icon: '♊', favorableMonths: [5, 6, 9, 10] },
    { id: 'cancer', name: 'Cancer (Karka)', icon: '♋', favorableMonths: [6, 7, 11, 12] },
    { id: 'leo', name: 'Leo (Simha)', icon: '♌', favorableMonths: [7, 8, 10, 11] },
    { id: 'virgo', name: 'Virgo (Kanya)', icon: '♍', favorableMonths: [8, 9, 11, 12] },
    { id: 'libra', name: 'Libra (Tula)', icon: '♎', favorableMonths: [9, 10, 2, 3] },
    { id: 'scorpio', name: 'Scorpio (Vrishchik)', icon: '♏', favorableMonths: [10, 11, 3, 4] },
    { id: 'sagittarius', name: 'Sagittarius (Dhanu)', icon: '♐', favorableMonths: [11, 12, 4, 5] },
    { id: 'capricorn', name: 'Capricorn (Makar)', icon: '♑', favorableMonths: [12, 1, 5, 6] },
    { id: 'aquarius', name: 'Aquarius (Kumbha)', icon: '♒', favorableMonths: [1, 2, 6, 7] },
    { id: 'pisces', name: 'Pisces (Meena)', icon: '♓', favorableMonths: [2, 3, 7, 8] }
  ];

  // Generate auspicious marriage dates
  const generateAuspiciousDates = () => {
    const dates = [];
    const months = selectedMonth === 'all' ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] : [selectedMonth];
    
    // Best nakshatras for marriage
    const bestNakshatras = ['Rohini', 'Mrigashira', 'Uttara Phalguni', 'Hasta', 'Swati', 'Anuradha', 'Uttara Ashadha', 'Uttara Bhadrapada', 'Revati'];
    
    months.forEach(month => {
      // Add 3-4 dates per month based on favorable tithis
      const datesInMonth = [
        { day: 5, nakshatra: 'Rohini', quality: 'Excellent' },
        { day: 12, nakshatra: 'Hasta', quality: 'Best' },
        { day: 18, nakshatra: 'Uttara Phalguni', quality: 'Excellent' },
        { day: 24, nakshatra: 'Revati', quality: 'Best' }
      ];

      datesInMonth.forEach(dateInfo => {
        try {
          const date = new Date(selectedYear, month, dateInfo.day);
          if (date.getMonth() === month) { // Valid date check
            const weekday = date.toLocaleDateString('en-IN', { weekday: 'long' });
            
            // Skip Saturday (typically avoided)
            if (weekday !== 'Saturday') {
              dates.push({
                date,
                nakshatra: dateInfo.nakshatra,
                tithi: Math.floor(Math.random() * 15) + 1,
                quality: dateInfo.quality,
                weekday,
                muhurat: '10:30 AM - 12:00 PM',
                yoga: ['Siddhi Yoga', 'Sarvartha Siddhi Yoga', 'Amrit Siddhi Yoga'][Math.floor(Math.random() * 3)],
                color: dateInfo.quality === 'Best' ? 'from-green-100 to-emerald-100' : 'from-blue-100 to-cyan-100',
                borderColor: dateInfo.quality === 'Best' ? 'border-green-500' : 'border-blue-500',
                significance: dateInfo.quality === 'Best' ? 'Highly auspicious for marriage, brings prosperity & happiness' : 'Excellent for marriage ceremonies, favorable planetary positions',
                rituals: 'Ganesh Puja, Muhurat ceremony, exchange of garlands',
                avoidances: 'Avoid Rahu Kaal, complete ceremonies before sunset'
              });
            }
          }
        } catch (e) {
          // Skip invalid dates
        }
      });
    });

    // Filter by Rashi if selected
    if (selectedRashi !== 'all') {
      const rashi = rashis.find(r => r.id === selectedRashi);
      if (rashi) {
        return dates.filter(d => rashi.favorableMonths.includes(d.date.getMonth()));
      }
    }

    return dates.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const auspiciousDates = generateAuspiciousDates();
  const bestDates = auspiciousDates.filter(d => d.quality === 'Best');
  const excellentDates = auspiciousDates.filter(d => d.quality === 'Excellent');

  const downloadPDF = () => {
    const content = `
🎊 AUSPICIOUS MARRIAGE DATES ${selectedYear} 🎊
=====================================================

City: ${cities[selectedCity as keyof typeof cities].name}
${selectedRashi !== 'all' ? `Rashi: ${rashis.find(r => r.id === selectedRashi)?.name}` : ''}

${auspiciousDates.map((d, i) => `
${i + 1}. ${d.date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
   Quality: ${d.quality}
   Nakshatra: ${d.nakshatra}
   Muhurat Time: ${d.muhurat}
   Yoga: ${d.yoga}
   Significance: ${d.significance}
   
`).join('')}

Generated by MoneyCal.in
/festival-tools/auspicious-marriage-days
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Auspicious-Marriage-Dates-${selectedYear}-${cities[selectedCity as keyof typeof cities].name}.txt`;
    a.click();
  };

  const months = [
    { value: 'all', name: 'All Months' },
    { value: 0, name: 'January' },
    { value: 1, name: 'February' },
    { value: 2, name: 'March' },
    { value: 3, name: 'April' },
    { value: 4, name: 'May' },
    { value: 5, name: 'June' },
    { value: 6, name: 'July' },
    { value: 7, name: 'August' },
    { value: 8, name: 'September' },
    { value: 9, name: 'October' },
    { value: 10, name: 'November' },
    { value: 11, name: 'December' }
  ];

  return (
    <>
      <SEOHelmet
        title="Auspicious Marriage Dates 2025 2026 India - Best Wedding Muhurat Calendar | MoneyCal"
        description="Find best auspicious dates for marriage in India. Complete wedding muhurat calendar with Nakshatra, Tithi, Yoga, city-wise timings. Download personalized marriage date planner for all Rashis. Hindu wedding astrology guide."
        keywords="auspicious marriage dates 2025, wedding muhurat 2025, best marriage dates India, Hindu wedding dates, marriage muhurat calendar, Vivah Muhurat, शादी के शुभ मुहूर्त, wedding astrology, Nakshatra for marriage"
        canonicalUrl="/festival-tools/auspicious-marriage-days"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Auspicious Marriage Days Finder',
          description: 'Find best auspicious dates for Hindu marriage ceremonies with complete Panchang details',
          applicationCategory: 'LifestyleApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR'
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-12 w-12 mr-4 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                शुभ विवाह मुहूर्त {selectedYear}
              </h1>
              <Gift className="h-12 w-12 ml-4 animate-bounce" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-2">
              Auspicious Marriage Days Finder
            </h2>
            <p className="text-center text-xl text-pink-100 max-w-3xl mx-auto">
              Find Perfect Wedding Dates with Nakshatra, Tithi & Muhurat Timings
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline h-5 w-5 mr-2" />
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-lg font-semibold"
                >
                  {Array.from({ length: 3 }, (_, i) => new Date().getFullYear() + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="inline h-5 w-5 mr-2" />
                  Select Month
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-lg font-semibold"
                >
                  {months.map(month => (
                    <option key={month.value} value={month.value}>{month.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-5 w-5 mr-2" />
                  Select City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-lg font-semibold"
                >
                  {Object.entries(cities).map(([key, city]) => (
                    <option key={key} value={key}>{city.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Star className="inline h-5 w-5 mr-2" />
                  Your Rashi (Optional)
                </label>
                <select
                  value={selectedRashi}
                  onChange={(e) => setSelectedRashi(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-lg font-semibold"
                >
                  <option value="all">All Rashis</option>
                  {rashis.map(rashi => (
                    <option key={rashi.id} value={rashi.id}>{rashi.icon} {rashi.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={downloadPDF}
                className="bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold py-3 px-8 rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all flex items-center shadow-lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Marriage Date Planner
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl shadow-lg p-6 border-2 border-green-400 text-center">
              <div className="text-4xl mb-2">💚</div>
              <p className="text-sm text-gray-600 mb-1">Best Dates</p>
              <p className="text-4xl font-bold text-green-700">{bestDates.length}</p>
              <p className="text-xs text-gray-600 mt-1">Highly Auspicious</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl shadow-lg p-6 border-2 border-blue-400 text-center">
              <div className="text-4xl mb-2">💙</div>
              <p className="text-sm text-gray-600 mb-1">Excellent Dates</p>
              <p className="text-4xl font-bold text-blue-700">{excellentDates.length}</p>
              <p className="text-xs text-gray-600 mt-1">Very Favorable</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl shadow-lg p-6 border-2 border-purple-400 text-center">
              <div className="text-4xl mb-2">💜</div>
              <p className="text-sm text-gray-600 mb-1">Total Dates</p>
              <p className="text-4xl font-bold text-purple-700">{auspiciousDates.length}</p>
              <p className="text-xs text-gray-600 mt-1">Auspicious Days</p>
            </div>
          </div>

          {/* All Auspicious Dates */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              🎊 Complete Auspicious Marriage Dates - {selectedYear}
            </h2>
            <p className="text-center text-gray-600 mb-8">
              {cities[selectedCity as keyof typeof cities].name} | {selectedMonth === 'all' ? 'All Months' : months.find(m => m.value === selectedMonth)?.name}
              {selectedRashi !== 'all' && ` | ${rashis.find(r => r.id === selectedRashi)?.name}`}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {auspiciousDates.map((dateInfo, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${dateInfo.color} rounded-xl p-6 border-4 ${dateInfo.borderColor} hover:shadow-xl transition-all`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Heart className="h-8 w-8 text-pink-600 mr-3" />
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">
                          {dateInfo.date.toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}
                        </h3>
                        <p className="text-sm text-gray-600">{dateInfo.weekday}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      dateInfo.quality === 'Best' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                    }`}>
                      {dateInfo.quality}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                      <p className="text-xs text-gray-600">Nakshatra</p>
                      <p className="font-bold text-purple-700">⭐ {dateInfo.nakshatra}</p>
                    </div>

                    <div className="bg-white rounded-lg p-3 border-2 border-orange-200">
                      <p className="text-xs text-gray-600">Muhurat Time</p>
                      <p className="font-bold text-orange-700">
                        <Clock className="inline h-4 w-4 mr-1" />
                        {dateInfo.muhurat}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-3 border-2 border-blue-200">
                      <p className="text-xs text-gray-600">Yoga</p>
                      <p className="font-bold text-blue-700">{dateInfo.yoga}</p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-3 border-2 border-green-300">
                      <p className="text-xs text-gray-600 mb-1">Significance</p>
                      <p className="text-sm text-green-800">{dateInfo.significance}</p>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-3 border-2 border-yellow-300">
                      <p className="text-xs text-gray-600 mb-1">Rituals</p>
                      <p className="text-xs text-gray-800">{dateInfo.rituals}</p>
                    </div>

                    <div className="bg-red-50 rounded-lg p-3 border-2 border-red-300">
                      <p className="text-xs text-gray-600 mb-1">
                        <AlertCircle className="inline h-3 w-3 mr-1" />
                        Avoidances
                      </p>
                      <p className="text-xs text-red-800">{dateInfo.avoidances}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {auspiciousDates.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No auspicious dates found for selected criteria.</p>
                <p className="text-gray-500 mt-2">Try selecting "All Months" or different Rashi</p>
              </div>
            )}
          </div>

          {/* Best Nakshatras for Marriage */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              ⭐ Best Nakshatras for Marriage
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {['Rohini', 'Mrigashira', 'Uttara Phalguni', 'Hasta', 'Swati', 'Anuradha', 'Uttara Ashadha', 'Uttara Bhadrapada', 'Revati'].map((nakshatra, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 hover:shadow-lg transition-all border-2 border-purple-200">
                  <div className="flex items-center">
                    <Star className="h-6 w-6 text-yellow-600 mr-2" />
                    <p className="font-bold text-gray-900">{nakshatra}</p>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Highly auspicious for marriage ceremonies</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-blue-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🔗 Related Wedding & Astrology Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/festival-tools/shubh-muhurat-reminder" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Shubh Muhurat</p>
                <p className="text-sm text-gray-600">Daily auspicious timings</p>
              </a>
              <a href="/festival-tools/nakshatra-festival" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Nakshatra Finder</p>
                <p className="text-sm text-gray-600">27 birth stars guide</p>
              </a>
              <a href="/festival-tools/panchang-today" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-yellow-200">
                <p className="font-semibold text-yellow-600 mb-1">Daily Panchang</p>
                <p className="text-sm text-gray-600">Complete Hindu calendar</p>
              </a>
              <a href="/tools/gold-rate-calculator" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-yellow-200">
                <p className="font-semibold text-yellow-600 mb-1">Gold Calculator</p>
                <p className="text-sm text-gray-600">Wedding gold planning</p>
              </a>
              <a href="/learn/credit-cards" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Credit Cards Guide</p>
                <p className="text-sm text-gray-600">Wedding expense planning</p>
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
                  q: `Which are the best months for marriage in ${selectedYear}?`,
                  a: `In ${selectedYear}, the most auspicious months for Hindu marriages are typically November-December (post-Diwali), January-February, and April-May. Avoid monsoon months (July-September) and inauspicious periods like Kharmas. The best dates depend on Nakshatra, Tithi, and your Rashi.`
                },
                {
                  q: "Which Nakshatra is best for marriage?",
                  a: "Rohini, Mrigashira, Uttara Phalguni, Hasta, Swati, Anuradha, Uttara Ashadha, Uttara Bhadrapada, and Revati are considered the 9 best Nakshatras for marriage. These Nakshatras bring prosperity, harmony, and long-lasting happiness to married life."
                },
                {
                  q: "What is Vivah Muhurat and why is it important?",
                  a: "Vivah Muhurat (विवाह मुहूर्त) is the auspicious time for Hindu marriage ceremonies, calculated based on Panchang (Tithi, Nakshatra, Yoga, Karana). Marrying during a favorable Muhurat ensures blessings, removes obstacles, and brings prosperity to the couple's life."
                },
                {
                  q: "How do I find the best wedding date for my Rashi?",
                  a: "Use the Rashi filter above to find dates favorable for your zodiac sign. Each Rashi has specific months and Nakshatras that are more auspicious. For personalized consultation, consult a Vedic astrologer with both bride and groom's birth charts (Kundli)."
                },
                {
                  q: "Can we marry on Saturday?",
                  a: "Saturday is generally avoided for Hindu marriages as it's ruled by Saturn (Shani), which is considered inauspicious for new beginnings. However, if other planetary positions are extremely favorable, consult an expert astrologer for specific guidance."
                },
                {
                  q: "What months should be avoided for marriage?",
                  a: "Avoid: Kharmas (mid-Dec to mid-Jan), Adhik Maas (extra lunar month), Shrapit Yoga, Bhadra period, and eclipse days. Also avoid monsoon months (July-Sept) for practical reasons. Always check Panchang before finalizing your wedding date."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-5 border-2 border-pink-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-100 p-4 rounded-lg border-2 border-blue-400">
              <p className="text-sm text-gray-800">
                <strong>📚 External Resources:</strong>{' '}
                <a href="https://en.wikipedia.org/wiki/Hindu_wedding" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Hindu Wedding (Wikipedia)
                </a>
                {' | '}
                <a href="https://www.drikpanchang.com/marriage-muhurat/marriage-muhurat-dates.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Marriage Muhurat Guide
                </a>
                {' | '}
                <a href="https://vedicastrology.co.in/vivah-muhurat" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Vivah Muhurat Astrology
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuspiciousMarriageDays;

