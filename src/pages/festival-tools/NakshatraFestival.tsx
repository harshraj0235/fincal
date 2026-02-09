import React, { useState, useEffect } from 'react';
import { Calendar, Star, Moon, Sun, Gift, TrendingUp, Download, Share2, MapPin, Clock } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const NakshatraFestival: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState('delhi');
  
  // Nakshatra data with comprehensive information
  const nakshatras = [
    { name: 'Ashwini', lord: 'Ketu', rashi: 'Aries', start: 0, color: 'from-red-100 to-orange-100', deity: 'Ashwini Kumaras', financial: 'Quick investments, start new ventures', ritual: 'Health prayers, vehicle puja', symbol: '🐎', nature: 'Quick, healing, dynamic' },
    { name: 'Bharani', lord: 'Venus', rashi: 'Aries', start: 13.33, color: 'from-pink-100 to-rose-100', deity: 'Yama', financial: 'Wealth accumulation, property deals', ritual: 'Ancestral worship, charity', symbol: '🌸', nature: 'Creation, nourishment, discipline' },
    { name: 'Krittika', lord: 'Sun', rashi: 'Aries/Taurus', start: 26.67, color: 'from-yellow-100 to-orange-100', deity: 'Agni', financial: 'Gold purchase, fire insurance', ritual: 'Fire rituals, courage prayers', symbol: '🔥', nature: 'Sharp, purifying, transforming' },
    { name: 'Rohini', lord: 'Moon', rashi: 'Taurus', start: 40, color: 'from-green-100 to-emerald-100', deity: 'Brahma', financial: 'Best for all transactions, prosperity', ritual: 'Fertility prayers, creative work', symbol: '🌺', nature: 'Growth, beauty, abundance' },
    { name: 'Mrigashira', lord: 'Mars', rashi: 'Taurus/Gemini', start: 53.33, color: 'from-blue-100 to-cyan-100', deity: 'Soma', financial: 'Research investments, travel planning', ritual: 'Quest prayers, knowledge seeking', symbol: '🦌', nature: 'Searching, curious, gentle' },
    { name: 'Ardra', lord: 'Rahu', rashi: 'Gemini', start: 66.67, color: 'from-gray-100 to-slate-100', deity: 'Rudra', financial: 'Avoid major decisions, consolidate', ritual: 'Storm prayers, transformation', symbol: '💧', nature: 'Destructive change, renewal' },
    { name: 'Punarvasu', lord: 'Jupiter', rashi: 'Gemini/Cancer', start: 80, color: 'from-yellow-100 to-lime-100', deity: 'Aditi', financial: 'Recovery, restart investments', ritual: 'Renewal prayers, home blessings', symbol: '🏹', nature: 'Return, restoration, safety' },
    { name: 'Pushya', lord: 'Saturn', rashi: 'Cancer', start: 93.33, color: 'from-blue-100 to-indigo-100', deity: 'Brihaspati', financial: 'Most auspicious for all dealings', ritual: 'Nourishment prayers, charity', symbol: '🌼', nature: 'Nourishing, auspicious, spiritual' },
    { name: 'Ashlesha', lord: 'Mercury', rashi: 'Cancer', start: 106.67, color: 'from-purple-100 to-violet-100', deity: 'Nagas', financial: 'Secret deals, hidden investments', ritual: 'Snake worship, kundalini yoga', symbol: '🐍', nature: 'Mystical, coiled, secretive' },
    { name: 'Magha', lord: 'Ketu', rashi: 'Leo', start: 120, color: 'from-orange-100 to-amber-100', deity: 'Pitris', financial: 'Royal purchases, inheritance', ritual: 'Ancestral rites, throne ceremonies', symbol: '👑', nature: 'Royal, majestic, traditional' },
    { name: 'Purva Phalguni', lord: 'Venus', rashi: 'Leo', start: 133.33, color: 'from-pink-100 to-fuchsia-100', deity: 'Bhaga', financial: 'Luxury purchases, entertainment', ritual: 'Marriage, pleasure, rest', symbol: '🛏️', nature: 'Enjoyment, creativity, relaxation' },
    { name: 'Uttara Phalguni', lord: 'Sun', rashi: 'Leo/Virgo', start: 146.67, color: 'from-yellow-100 to-gold-100', deity: 'Aryaman', financial: 'Contracts, partnerships, agreements', ritual: 'Marriage, contracts, unions', symbol: '🤝', nature: 'Partnership, support, generosity' },
    { name: 'Hasta', lord: 'Moon', rashi: 'Virgo', start: 160, color: 'from-green-100 to-teal-100', deity: 'Savitar', financial: 'Skill-based investments, handicrafts', ritual: 'Craft prayers, skill development', symbol: '✋', nature: 'Skillful, precise, clever' },
    { name: 'Chitra', lord: 'Mars', rashi: 'Virgo/Libra', start: 173.33, color: 'from-red-100 to-rose-100', deity: 'Tvashtar', financial: 'Art purchases, design investments', ritual: 'Beauty prayers, creative work', symbol: '💎', nature: 'Beautiful, bright, artistic' },
    { name: 'Swati', lord: 'Rahu', rashi: 'Libra', start: 186.67, color: 'from-cyan-100 to-sky-100', deity: 'Vayu', financial: 'Independent ventures, trading', ritual: 'Wind prayers, freedom seeking', symbol: '🌬️', nature: 'Independent, flexible, moving' },
    { name: 'Vishakha', lord: 'Jupiter', rashi: 'Libra/Scorpio', start: 200, color: 'from-purple-100 to-indigo-100', deity: 'Indragni', financial: 'Goal-oriented investments', ritual: 'Achievement prayers, determination', symbol: '🎯', nature: 'Focused, determined, achieving' },
    { name: 'Anuradha', lord: 'Saturn', rashi: 'Scorpio', start: 213.33, color: 'from-blue-100 to-purple-100', deity: 'Mitra', financial: 'Friendship ventures, networking', ritual: 'Friendship prayers, devotion', symbol: '🌟', nature: 'Devotional, friendly, balanced' },
    { name: 'Jyeshtha', lord: 'Mercury', rashi: 'Scorpio', start: 226.67, color: 'from-red-100 to-orange-100', deity: 'Indra', financial: 'Leadership positions, authority', ritual: 'Power prayers, protection', symbol: '☂️', nature: 'Senior, protective, powerful' },
    { name: 'Mula', lord: 'Ketu', rashi: 'Sagittarius', start: 240, color: 'from-brown-100 to-amber-100', deity: 'Nirriti', financial: 'Root investments, foundational', ritual: 'Destruction of old, new beginnings', symbol: '🌿', nature: 'Root, foundational, transforming' },
    { name: 'Purva Ashadha', lord: 'Venus', rashi: 'Sagittarius', start: 253.33, color: 'from-yellow-100 to-amber-100', deity: 'Apas', financial: 'Victory ventures, conquering goals', ritual: 'Victory prayers, invincibility', symbol: '🏆', nature: 'Invincible, victorious, purifying' },
    { name: 'Uttara Ashadha', lord: 'Sun', rashi: 'Sagittarius/Capricorn', start: 266.67, color: 'from-orange-100 to-red-100', deity: 'Vishvadevas', financial: 'Final victory, permanent gains', ritual: 'Universal prayers, dharma', symbol: '🐘', nature: 'Universal, final victory, enduring' },
    { name: 'Shravana', lord: 'Moon', rashi: 'Capricorn', start: 280, color: 'from-blue-100 to-cyan-100', deity: 'Vishnu', financial: 'Learning investments, education', ritual: 'Listening, learning, knowledge', symbol: '👂', nature: 'Listening, learning, connecting' },
    { name: 'Dhanishta', lord: 'Mars', rashi: 'Capricorn/Aquarius', start: 293.33, color: 'from-green-100 to-emerald-100', deity: 'Vasus', financial: 'Wealth creation, abundance', ritual: 'Wealth prayers, music, rhythm', symbol: '🥁', nature: 'Wealthy, symphonic, abundant' },
    { name: 'Shatabhisha', lord: 'Rahu', rashi: 'Aquarius', start: 306.67, color: 'from-cyan-100 to-teal-100', deity: 'Varuna', financial: 'Healing ventures, alternative', ritual: 'Healing prayers, secrecy', symbol: '⭐', nature: 'Healing, hundred physicians, secretive' },
    { name: 'Purva Bhadrapada', lord: 'Jupiter', rashi: 'Aquarius/Pisces', start: 320, color: 'from-purple-100 to-pink-100', deity: 'Aja Ekapada', financial: 'Spiritual investments, charity', ritual: 'Fire prayers, transformation', symbol: '⚡', nature: 'Fierce, burning, transforming' },
    { name: 'Uttara Bhadrapada', lord: 'Saturn', rashi: 'Pisces', start: 333.33, color: 'from-indigo-100 to-blue-100', deity: 'Ahir Budhnya', financial: 'Deep wisdom investments', ritual: 'Depth prayers, serpent wisdom', symbol: '🐉', nature: 'Depth, wisdom, foundation' },
    { name: 'Revati', lord: 'Mercury', rashi: 'Pisces', start: 346.67, color: 'from-pink-100 to-purple-100', deity: 'Pushan', financial: 'Journey investments, completion', ritual: 'Nourishment, journey prayers', symbol: '🐟', nature: 'Nourishing, completion, journey' }
  ];

  // Major Indian festivals
  const festivals = [
    { name: 'Diwali', month: 10, day: 20, year: 2025, type: 'Major' },
    { name: 'Holi', month: 3, day: 14, year: 2025, type: 'Major' },
    { name: 'Navratri Start', month: 9, day: 22, year: 2025, type: 'Major' },
    { name: 'Raksha Bandhan', month: 8, day: 9, year: 2025, type: 'Major' },
    { name: 'Janmashtami', month: 8, day: 16, year: 2025, type: 'Major' },
    { name: 'Ganesh Chaturthi', month: 8, day: 27, year: 2025, type: 'Major' },
    { name: 'Makar Sankranti', month: 1, day: 14, year: 2025, type: 'Major' },
    { name: 'Maha Shivaratri', month: 2, day: 26, year: 2025, type: 'Major' },
    { name: 'Ram Navami', month: 4, day: 6, year: 2025, type: 'Major' },
    { name: 'Dussehra', month: 10, day: 2, year: 2025, type: 'Major' },
    { name: 'Karva Chauth', month: 10, day: 13, year: 2025, type: 'Major' },
    { name: 'Chhath Puja', month: 11, day: 7, year: 2025, type: 'Major' }
  ];

  // Cities with lat/lon
  const cities = {
    delhi: { name: 'Delhi', lat: 28.7041, lon: 77.1025, tz: 'Asia/Kolkata' },
    mumbai: { name: 'Mumbai', lat: 19.0760, lon: 72.8777, tz: 'Asia/Kolkata' },
    bangalore: { name: 'Bangalore', lat: 12.9716, lon: 77.5946, tz: 'Asia/Kolkata' },
    kolkata: { name: 'Kolkata', lat: 22.5726, lon: 88.3639, tz: 'Asia/Kolkata' },
    chennai: { name: 'Chennai', lat: 13.0827, lon: 80.2707, tz: 'Asia/Kolkata' },
    hyderabad: { name: 'Hyderabad', lat: 17.3850, lon: 78.4867, tz: 'Asia/Kolkata' },
    pune: { name: 'Pune', lat: 18.5204, lon: 73.8567, tz: 'Asia/Kolkata' },
    ahmedabad: { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714, tz: 'Asia/Kolkata' },
    jaipur: { name: 'Jaipur', lat: 26.9124, lon: 75.7873, tz: 'Asia/Kolkata' },
    varanasi: { name: 'Varanasi', lat: 25.3176, lon: 82.9739, tz: 'Asia/Kolkata' }
  };

  // Calculate Nakshatra (simplified lunar-based calculation)
  const calculateNakshatra = (date: Date) => {
    // Simplified calculation: lunar cycle is ~29.53 days
    // This is approximate - real calculation needs Swiss Ephemeris
    const baseDate = new Date(2000, 0, 6); // Known new moon
    const diffTime = date.getTime() - baseDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    const lunarAge = diffDays % 29.53;
    const moonLongitude = (lunarAge / 29.53) * 360;
    
    const nakshatraIndex = Math.floor(moonLongitude / (360 / 27));
    return nakshatras[nakshatraIndex];
  };

  const currentNakshatra = calculateNakshatra(selectedDate);

  // Check if selected date is a festival
  const matchingFestival = festivals.find(f => {
    const festivalDate = new Date(f.year, f.month - 1, f.day);
    return festivalDate.toDateString() === selectedDate.toDateString();
  });

  // Get upcoming festivals
  const upcomingFestivals = festivals
    .filter(f => {
      const festivalDate = new Date(f.year, f.month - 1, f.day);
      return festivalDate >= new Date();
    })
    .sort((a, b) => {
      const dateA = new Date(a.year, a.month - 1, a.day);
      const dateB = new Date(b.year, b.month - 1, b.day);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 6);

  const downloadReport = () => {
    const report = `
🌟 NAKSHATRA FESTIVAL REPORT 🌟
====================================

Date: ${selectedDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
City: ${cities[selectedCity as keyof typeof cities].name}
${matchingFestival ? `Festival: ${matchingFestival.name}` : ''}

NAKSHATRA: ${currentNakshatra.name} ${currentNakshatra.symbol}
====================================
Lord: ${currentNakshatra.lord}
Rashi: ${currentNakshatra.rashi}
Deity: ${currentNakshatra.deity}
Nature: ${currentNakshatra.nature}

💰 FINANCIAL GUIDANCE:
${currentNakshatra.financial}

🙏 RITUAL RECOMMENDATIONS:
${currentNakshatra.ritual}

Generated by MoneyCal.in
https://moneycal.in/festival-tools/nakshatra-festival
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Nakshatra-Report-${selectedDate.toISOString().split('T')[0]}.txt`;
    a.click();
  };

  return (
    <>
      <SEOHelmet
        title="Nakshatra Festival Finder 2025 - Birth Star on Festival Dates India | MoneyCal"
        description="Find Nakshatra (birth star) on any Indian festival date. Get auspicious timing for Diwali, Holi, Navratri with financial guidance, rituals, muhurat based on 27 Nakshatras. Complete Vedic astrology for festival planning."
        keywords="Nakshatra festival, birth star festival date, Diwali Nakshatra 2025, Nakshatra today, festival astrology, auspicious nakshatra, vedic astrology festival, festival muhurat, Rohini Nakshatra, Pushya Nakshatra"
        canonicalUrl="https://moneycal.in/festival-tools/nakshatra-festival"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Nakshatra Festival Finder',
          description: 'Find birth star (Nakshatra) on any festival date with auspicious timing and financial guidance',
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
              <Star className="h-12 w-12 mr-4 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                नक्षत्र त्योहार खोजक
              </h1>
              <Moon className="h-12 w-12 ml-4 animate-bounce" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-2">
              Nakshatra Festival Finder
            </h2>
            <p className="text-center text-xl text-purple-100 max-w-3xl mx-auto">
              Find Your Birth Star on Any Festival Date - Get Auspicious Timing & Financial Guidance
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Main Calculator */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline h-5 w-5 mr-2" />
                  Select Festival / Date
                </label>
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-lg font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-5 w-5 mr-2" />
                  Select City
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
            </div>

            {/* Result Card */}
            <div className={`bg-gradient-to-br ${currentNakshatra.color} rounded-2xl p-8 border-4 border-purple-500 shadow-xl mb-6`}>
              {matchingFestival && (
                <div className="mb-4 bg-yellow-100 border-2 border-yellow-500 rounded-lg p-4">
                  <p className="text-center font-bold text-xl text-yellow-900 flex items-center justify-center">
                    <Gift className="h-6 w-6 mr-2" />
                    🎉 Festival: {matchingFestival.name} 🎉
                  </p>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="text-8xl mb-4">{currentNakshatra.symbol}</div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  {currentNakshatra.name} Nakshatra
                </h2>
                <p className="text-xl text-gray-700">
                  {selectedDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 border-2 border-purple-300">
                  <p className="text-sm text-gray-600 mb-1">Ruling Lord</p>
                  <p className="text-2xl font-bold text-purple-700">{currentNakshatra.lord}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border-2 border-purple-300">
                  <p className="text-sm text-gray-600 mb-1">Rashi (Zodiac)</p>
                  <p className="text-2xl font-bold text-purple-700">{currentNakshatra.rashi}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border-2 border-purple-300">
                  <p className="text-sm text-gray-600 mb-1">Presiding Deity</p>
                  <p className="text-2xl font-bold text-purple-700">{currentNakshatra.deity}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border-2 border-purple-300">
                  <p className="text-sm text-gray-600 mb-1">Nature</p>
                  <p className="text-lg font-semibold text-purple-700">{currentNakshatra.nature}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 rounded-xl p-5 border-2 border-green-500">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                    <h3 className="text-xl font-bold text-green-900">💰 Financial Guidance</h3>
                  </div>
                  <p className="text-gray-800">{currentNakshatra.financial}</p>
                </div>

                <div className="bg-orange-50 rounded-xl p-5 border-2 border-orange-500">
                  <div className="flex items-center mb-2">
                    <Sun className="h-6 w-6 text-orange-600 mr-2" />
                    <h3 className="text-xl font-bold text-orange-900">🙏 Ritual Recommendations</h3>
                  </div>
                  <p className="text-gray-800">{currentNakshatra.ritual}</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <button
                  onClick={downloadReport}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center shadow-lg"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Report
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: `${currentNakshatra.name} Nakshatra on ${selectedDate.toLocaleDateString('en-IN')}`,
                        text: `Find your birth star and auspicious timing for festivals!`,
                        url: window.location.href
                      });
                    }
                  }}
                  className="bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold py-3 px-8 rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all flex items-center shadow-lg"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share Result
                </button>
              </div>
            </div>
          </div>

          {/* All 27 Nakshatras Reference */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              🌟 Complete 27 Nakshatras Reference Guide
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nakshatras.map((nakshatra, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${nakshatra.color} rounded-xl p-4 border-2 ${currentNakshatra.name === nakshatra.name ? 'border-purple-600 ring-4 ring-purple-300' : 'border-gray-300'} hover:shadow-lg transition-all cursor-pointer`}
                  onClick={() => {
                    // Calculate approximate date for this nakshatra
                    const daysOffset = (idx * 29.53) / 27;
                    const newDate = new Date();
                    newDate.setDate(newDate.getDate() + daysOffset - 15);
                    setSelectedDate(newDate);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-4xl">{nakshatra.symbol}</div>
                    <span className="text-sm font-bold text-purple-700">#{idx + 1}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{nakshatra.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{nakshatra.lord} • {nakshatra.rashi}</p>
                  <p className="text-xs text-gray-700">{nakshatra.nature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Festivals */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-orange-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              🎊 Upcoming Major Festivals & Their Nakshatras
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingFestivals.map((festival, idx) => {
                const festivalDate = new Date(festival.year, festival.month - 1, festival.day);
                const festivalNakshatra = calculateNakshatra(festivalDate);
                return (
                  <div key={idx} className="bg-white rounded-xl p-5 border-2 border-orange-400 hover:shadow-lg transition-all">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{festival.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {festivalDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-300">
                      <p className="text-xs text-gray-600 mb-1">Nakshatra</p>
                      <p className="font-bold text-purple-700">
                        {festivalNakshatra.symbol} {festivalNakshatra.name}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{festivalNakshatra.lord}</p>
                    </div>
                    <button
                      onClick={() => setSelectedDate(festivalDate)}
                      className="w-full mt-3 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-all text-sm font-semibold"
                    >
                      View Details
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-blue-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🔗 Related Festival & Astrology Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/festival-tools/panchang-today" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-yellow-200">
                <p className="font-semibold text-yellow-600 mb-1">Daily Panchang</p>
                <p className="text-sm text-gray-600">Today's complete panchang</p>
              </a>
              <a href="/festival-tools/weekly-tithi-finder" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Weekly Tithi</p>
                <p className="text-sm text-gray-600">This week's lunar calendar</p>
              </a>
              <a href="/festival-tools/vrat-upavas-calendar" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Vrat Calendar</p>
                <p className="text-sm text-gray-600">All fasting dates</p>
              </a>
              <a href="/festival-tools/purnima-amavasya-dates" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Purnima & Amavasya</p>
                <p className="text-sm text-gray-600">Full & new moon dates</p>
              </a>
              <a href="/learn/gold-loans" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Gold Loans Guide</p>
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
                  q: "What is Nakshatra and why is it important for festivals?",
                  a: "Nakshatra (नक्षत्र) is a birth star or lunar mansion in Vedic astrology. There are 27 Nakshatras dividing the 360° zodiac. Each Nakshatra has unique energy affecting auspicious timing for festivals, rituals, and financial decisions."
                },
                {
                  q: "Which is the most auspicious Nakshatra for investments?",
                  a: "Rohini and Pushya are considered the most auspicious Nakshatras for all financial transactions, property purchases, and starting new ventures. Uttara Phalguni is excellent for contracts and partnerships."
                },
                {
                  q: "How do I find Nakshatra on Diwali 2025?",
                  a: "Use our Nakshatra Festival Finder tool above. Select Diwali 2025 date (October 20, 2025) and your city. The tool will show the Nakshatra with financial guidance and ritual recommendations specific to that day."
                },
                {
                  q: "Can Nakshatra affect my financial decisions?",
                  a: "According to Vedic astrology, yes. Each Nakshatra has ruling lords and energies. For example, Shravana (ruled by Moon) favors learning investments, Dhanishta (ruled by Mars) favors wealth creation, Rohini favors all prosperity activities."
                },
                {
                  q: "Which Nakshatras should I avoid for major purchases?",
                  a: "Ardra (stormy, transformation) and Mula (destructive, root) Nakshatras are generally avoided for major financial decisions or purchases. Instead, wait for auspicious Nakshatras like Rohini, Pushya, or Uttara Phalguni."
                },
                {
                  q: "Is this Nakshatra calculation accurate?",
                  a: "Our tool provides a simplified Nakshatra calculation based on lunar cycles. For precise calculations, consult a professional Vedic astrologer or use tools based on Swiss Ephemeris data with exact latitude, longitude, and time."
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
                <a href="https://en.wikipedia.org/wiki/Nakshatra" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Nakshatra (Wikipedia)
                </a>
                {' | '}
                <a href="https://www.drikpanchang.com/nakshatra/nakshatra-list.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  27 Nakshatras Guide
                </a>
                {' | '}
                <a href="https://vedicastrology.co.in/nakshatra" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Vedic Astrology Nakshatras
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NakshatraFestival;

