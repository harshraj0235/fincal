import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Sun,
  Moon,
  Calendar,
  MapPin,
  Download,
  Share2,
  Flower2,
  Wheat,
  Snowflake,
  Music,
  Search,
  Navigation,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Info,
  Star,
  Clock,
  Sparkles,
  Heart,
  Gift,
  Users,
  Flame
} from 'lucide-react';

// Assamese cities with coordinates
const ASSAMESE_CITIES = [
  { name: 'Guwahati', lat: 26.1445, lon: 91.7362, timezone: 'Asia/Kolkata', state: 'Assam' },
  { name: 'Dibrugarh', lat: 27.4728, lon: 94.9120, timezone: 'Asia/Kolkata', state: 'Assam' },
  { name: 'Jorhat', lat: 26.7509, lon: 94.2037, timezone: 'Asia/Kolkata', state: 'Assam' },
  { name: 'Silchar', lat: 24.8333, lon: 92.7789, timezone: 'Asia/Kolkata', state: 'Assam' },
  { name: 'Tezpur', lat: 26.6338, lon: 92.8000, timezone: 'Asia/Kolkata', state: 'Assam' },
  { name: 'Nagaon', lat: 26.3472, lon: 92.6847, timezone: 'Asia/Kolkata', state: 'Assam' },
  { name: 'Tinsukia', lat: 27.4900, lon: 95.3600, timezone: 'Asia/Kolkata', state: 'Assam' },
  { name: 'Sivasagar', lat: 26.9844, lon: 94.6376, timezone: 'Asia/Kolkata', state: 'Assam' },
  { name: 'Barpeta', lat: 26.3239, lon: 91.0050, timezone: 'Asia/Kolkata', state: 'Assam' },
  { name: 'Delhi', lat: 28.6139, lon: 77.2090, timezone: 'Asia/Kolkata', state: 'Delhi' },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777, timezone: 'Asia/Kolkata', state: 'Maharashtra' },
  { name: 'Bangalore', lat: 12.9716, lon: 77.5946, timezone: 'Asia/Kolkata', state: 'Karnataka' },
  { name: 'Kolkata', lat: 22.5726, lon: 88.3639, timezone: 'Asia/Kolkata', state: 'West Bengal' }
];

interface BihuFestival {
  name: string;
  englishName: string;
  assamName: string;
  date: Date;
  duration: number; // days
  color: string;
  icon: React.ReactNode;
  description: string;
  significance: string;
  rituals: string[];
}

// Calculate Bihu dates based on solar calendar
const calculateBihuDates = (year: number): { bohag: Date; kati: Date; magh: Date } => {
  // Bohag Bihu (Rongali Bihu) - Mid-April, coincides with solar new year
  // Typically April 14-15 (Mesha Sankranti)
  const bohag = new Date(year, 3, 14); // April 14
  
  // Kati Bihu (Kongali Bihu) - Mid-October
  // Typically October 17-18
  const kati = new Date(year, 9, 17); // October 17
  
  // Magh Bihu (Bhogali Bihu) - Mid-January
  // Typically January 14-15 (Makar Sankranti)
  const magh = new Date(year, 0, 14); // January 14
  
  return { bohag, kati, magh };
};

const BihuDateCalendar: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState(ASSAMESE_CITIES[0]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'bohag' | 'kati' | 'magh'>('all');

  // Calculate Bihu dates for selected year
  const bihuDates = useMemo(() => {
    return calculateBihuDates(selectedYear);
  }, [selectedYear]);

  // Create festival objects
  const festivals: BihuFestival[] = useMemo(() => {
    return [
      {
        name: 'Bohag Bihu',
        englishName: 'Rongali Bihu (Spring Festival)',
        assamName: 'ব'হাগ বিহু',
        date: bihuDates.bohag,
        duration: 7,
        color: 'from-green-500 to-emerald-600',
        icon: <Flower2 className="w-8 h-8" />,
        description: 'The Assamese New Year celebration marking the arrival of spring and the beginning of the agricultural season.',
        significance: 'Celebrates new beginnings, harvest preparation, and cultural identity',
        rituals: [
          'Goru Bihu - Worship and bathing of cattle',
          'Manuh Bihu - New clothes, traditional games, and feasts',
          'Husori - Group singing and dancing',
          'Bihu dance performances',
          'Traditional Assamese meals with pitha and laru'
        ]
      },
      {
        name: 'Kati Bihu',
        englishName: 'Kongali Bihu (Autumn Festival)',
        assamName: 'কাতি বিহু',
        date: bihuDates.kati,
        duration: 1,
        color: 'from-amber-500 to-orange-600',
        icon: <Wheat className="w-8 h-8" />,
        description: 'The festival of lights observed during the lean season when granaries are empty, praying for a good harvest.',
        significance: 'Lighting lamps for protection of crops and prosperity',
        rituals: [
          'Lighting akash banti (sky lamps) in fields and tulsi plants',
          'Offering prayers at tulsi altar',
          'Community singing and prayers',
          'Simple vegetarian meals',
          'Lighting diyas to ward off evil spirits'
        ]
      },
      {
        name: 'Magh Bihu',
        englishName: 'Bhogali Bihu (Harvest Festival)',
        assamName: 'মাঘ বিহু',
        date: bihuDates.magh,
        duration: 2,
        color: 'from-red-500 to-rose-600',
        icon: <Flame className="w-8 h-8" />,
        description: 'The harvest festival celebrated with feasting and bonfires, marking the end of the harvesting season.',
        significance: 'Thanksgiving for abundant harvest and celebration of food',
        rituals: [
          'Uruka - Community feasts on eve',
          'Meji burning - Bonfire lighting at dawn',
          'Preparation of traditional Assamese delicacies',
          'Games and community gatherings',
          'Distribution of food to neighbors'
        ]
      }
    ];
  }, [bihuDates]);

  // Detect user location
  const detectLocation = () => {
    setIsDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Find nearest city
          let nearestCity = ASSAMESE_CITIES[0];
          let minDistance = Infinity;
          
          ASSAMESE_CITIES.forEach(city => {
            const distance = Math.sqrt(
              Math.pow(city.lat - latitude, 2) + Math.pow(city.lon - longitude, 2)
            );
            if (distance < minDistance) {
              minDistance = distance;
              nearestCity = city;
            }
          });
          
          setSelectedCity(nearestCity);
          setIsDetecting(false);
        },
        (error) => {
          console.error('Location detection error:', error);
          setIsDetecting(false);
          alert('Could not detect location. Please select a city manually.');
        }
      );
    } else {
      setIsDetecting(false);
      alert('Geolocation is not supported by your browser.');
    }
  };

  // Filter cities
  const filteredCities = useMemo(() => {
    if (!searchQuery) return ASSAMESE_CITIES;
    const query = searchQuery.toLowerCase();
    return ASSAMESE_CITIES.filter(city => 
      city.name.toLowerCase().includes(query) || 
      city.state.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Days until next Bihu
  const daysUntilNextBihu = useMemo(() => {
    const today = new Date();
    const allDates = [bihuDates.bohag, bihuDates.kati, bihuDates.magh];
    
    // Find next upcoming Bihu
    const futureDates = allDates
      .map((date, index) => ({ date, festival: festivals[index] }))
      .filter(item => item.date >= today)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    
    if (futureDates.length === 0) {
      // All Bihus passed, show next year's first Bihu
      const nextYearBohag = calculateBihuDates(selectedYear + 1).bohag;
      const diff = nextYearBohag.getTime() - today.getTime();
      return {
        days: Math.ceil(diff / (1000 * 60 * 60 * 24)),
        festival: 'Bohag Bihu ' + (selectedYear + 1)
      };
    }
    
    const next = futureDates[0];
    const diff = next.date.getTime() - today.getTime();
    return {
      days: Math.ceil(diff / (1000 * 60 * 60 * 24)),
      festival: next.festival.name
    };
  }, [bihuDates, festivals, selectedYear]);

  // Generate calendar download
  const downloadCalendar = (festival: BihuFestival) => {
    const startDate = festival.date;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + festival.duration);
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MoneyCal//Bihu Calendar//EN',
      'BEGIN:VEVENT',
      `DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:${festival.name} ${selectedYear}`,
      `DESCRIPTION:${festival.description}`,
      `LOCATION:${selectedCity.name}, ${selectedCity.state}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${festival.name.toLowerCase().replace(' ', '-')}-${selectedYear}-${selectedCity.name.toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Download all Bihu dates
  const downloadAllBihus = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MoneyCal//Bihu Calendar//EN',
      ...festivals.flatMap(festival => {
        const startDate = festival.date;
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + festival.duration);
        return [
          'BEGIN:VEVENT',
          `DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
          `DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
          `SUMMARY:${festival.name} ${selectedYear}`,
          `DESCRIPTION:${festival.description}`,
          `LOCATION:${selectedCity.name}, ${selectedCity.state}`,
          'END:VEVENT'
        ];
      }),
      'END:VCALENDAR'
    ].join('\r\n');
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bihu-calendar-${selectedYear}-${selectedCity.name.toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Share functionality
  const shareResults = () => {
    const shareText = `🎉 Bihu Festival Calendar ${selectedYear} - ${selectedCity.name}\n\n` +
      `🌸 Bohag Bihu: ${bihuDates.bohag.toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}\n` +
      `🌾 Kati Bihu: ${bihuDates.kati.toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}\n` +
      `🔥 Magh Bihu: ${bihuDates.magh.toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}\n\n` +
      `Get your Bihu calendar at ${window.location.href}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Bihu Calendar ${selectedYear} - ${selectedCity.name}`,
        text: shareText,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Details copied to clipboard!');
    }
  };

  const currentFestival = festivals.find(f => {
    const today = new Date();
    const festivalEnd = new Date(f.date);
    festivalEnd.setDate(festivalEnd.getDate() + f.duration);
    return today >= f.date && today <= festivalEnd;
  });

  return (
    <>
      <Helmet>
        <title>Bihu Calendar {selectedYear} - {selectedCity.name} | Bohag Kati Magh Bihu Dates Assam</title>
        <meta name="description" content={`Complete Bihu festival calendar ${selectedYear} for ${selectedCity.name}, Assam. Bohag Bihu: ${bihuDates.bohag.toLocaleDateString()}, Kati Bihu: ${bihuDates.kati.toLocaleDateString()}, Magh Bihu: ${bihuDates.magh.toLocaleDateString()}. Download calendar, rituals, celebrations guide.`} />
        <meta name="keywords" content={`bihu calendar ${selectedYear}, bohag bihu date ${selectedYear}, rongali bihu ${selectedYear}, kati bihu ${selectedYear}, magh bihu ${selectedYear}, bhogali bihu ${selectedYear}, assam bihu festival dates, ${selectedCity.name} bihu ${selectedYear}, bihu celebration dates assam`} />
        <link rel="canonical" href="https://moneycal.in/festival-tools/bihu-date-calendar" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Bihu Festival Calendar ${selectedYear} - ${selectedCity.name} Complete Guide`} />
        <meta property="og:description" content={`All three Bihu festivals: Bohag (${bihuDates.bohag.toLocaleDateString()}), Kati (${bihuDates.kati.toLocaleDateString()}), Magh (${bihuDates.magh.toLocaleDateString()})`} />
        <meta property="og:url" content="https://moneycal.in/festival-tools/bihu-date-calendar" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": `Bihu Festivals ${selectedYear}`,
            "description": "Complete calendar of all three Bihu festivals celebrated in Assam",
            "location": {
              "@type": "Place",
              "name": selectedCity.name,
              "address": {
                "@type": "PostalAddress",
                "addressRegion": selectedCity.state,
                "addressCountry": "IN"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex justify-center mb-4 space-x-4">
              <Flower2 className="w-12 h-12 animate-bounce" />
              <Music className="w-12 h-12 animate-pulse" />
              <Flame className="w-12 h-12 animate-bounce" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              🎉 Bihu Festival Calendar {selectedYear}
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-yellow-100">
              Complete Guide to Bohag, Kati & Magh Bihu Celebrations
            </p>
            
            {currentFestival && (
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border-2 border-white/40">
                <p className="text-lg font-semibold">
                  🎊 {currentFestival.name} is happening now!
                </p>
              </div>
            )}
            
            {!currentFestival && daysUntilNextBihu.days > 0 && (
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border-2 border-white/40">
                <p className="text-lg font-semibold">
                  ⏰ {daysUntilNextBihu.days} days until {daysUntilNextBihu.festival}!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Location & Year Selection */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-green-600" />
              Select Your Location & Year
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {/* City Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Search className="inline w-4 h-4 mr-1" />
                  Search City
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search city..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {searchQuery && (
                    <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {filteredCities.map((city) => (
                        <button
                          key={city.name}
                          onClick={() => {
                            setSelectedCity(city);
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-green-50 border-b border-gray-100 last:border-0"
                        >
                          <div className="font-semibold text-gray-900">{city.name}</div>
                          <div className="text-sm text-gray-600">{city.state}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Year Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {[0, 1, 2, 3, 4].map(offset => {
                    const year = new Date().getFullYear() + offset;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
              </div>

              {/* Auto-detect */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Actions
                </label>
                <button
                  onClick={detectLocation}
                  disabled={isDetecting}
                  className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center font-semibold"
                >
                  <Navigation className={`w-5 h-5 mr-2 ${isDetecting ? 'animate-spin' : ''}`} />
                  {isDetecting ? 'Detecting...' : 'Detect Location'}
                </button>
              </div>
            </div>

            {/* Current Selection */}
            <div className="bg-gradient-to-r from-green-100 to-yellow-100 rounded-lg p-4 border-2 border-green-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Selected:</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedCity.name}, {selectedCity.state} - {selectedYear}</p>
                </div>
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-green-600 to-yellow-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              All Bihu Festivals
            </button>
            <button
              onClick={() => setActiveTab('bohag')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'bohag'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <Flower2 className="inline w-5 h-5 mr-2" />
              Bohag Bihu
            </button>
            <button
              onClick={() => setActiveTab('kati')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'kati'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <Wheat className="inline w-5 h-5 mr-2" />
              Kati Bihu
            </button>
            <button
              onClick={() => setActiveTab('magh')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'magh'
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <Flame className="inline w-5 h-5 mr-2" />
              Magh Bihu
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Festival Cards */}
            {festivals
              .filter(f => activeTab === 'all' || 
                (activeTab === 'bohag' && f.name === 'Bohag Bihu') ||
                (activeTab === 'kati' && f.name === 'Kati Bihu') ||
                (activeTab === 'magh' && f.name === 'Magh Bihu'))
              .map((festival, index) => (
              <div key={festival.name} className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden">
                {/* Festival Header */}
                <div className={`bg-gradient-to-r ${festival.color} text-white p-6`}>
                  <div className="flex items-center justify-between mb-3">
                    {festival.icon}
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                      {festival.duration} {festival.duration === 1 ? 'day' : 'days'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{festival.name}</h3>
                  <p className="text-sm opacity-90">{festival.englishName}</p>
                  <p className="text-lg font-semibold mt-2">{festival.assamName}</p>
                </div>

                {/* Festival Details */}
                <div className="p-6">
                  {/* Date */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-4 border border-gray-200">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 mr-2 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">Festival Date</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                      {festival.date.toLocaleDateString('en-IN', { 
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {festival.date.toLocaleDateString('en-IN', { weekday: 'long' })}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Info className="w-4 h-4 mr-2 text-blue-600" />
                      About
                    </h4>
                    <p className="text-sm text-gray-700">{festival.description}</p>
                  </div>

                  {/* Significance */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-600" />
                      Significance
                    </h4>
                    <p className="text-sm text-gray-700">{festival.significance}</p>
                  </div>

                  {/* Rituals */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-red-600" />
                      Main Rituals
                    </h4>
                    <ul className="space-y-2">
                      {festival.rituals.slice(0, 3).map((ritual, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{ritual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button
                      onClick={() => downloadCalendar(festival)}
                      className={`px-4 py-3 bg-gradient-to-r ${festival.color} text-white rounded-lg hover:shadow-lg transition-all font-semibold text-sm flex items-center justify-center`}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Calendar
                    </button>
                    <button
                      onClick={shareResults}
                      className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-semibold text-sm flex items-center justify-center border border-gray-300"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Download All Section */}
          {activeTab === 'all' && (
            <div className="mt-8 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="text-center">
                <Gift className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-4">Complete Bihu Calendar {selectedYear}</h3>
                <p className="text-xl mb-6 text-pink-100">
                  Download all three Bihu festivals in one calendar file
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={downloadAllBihus}
                    className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-purple-50 transition-all font-bold text-lg shadow-lg flex items-center"
                  >
                    <Download className="w-6 h-6 mr-2" />
                    Download Complete Calendar
                  </button>
                  <button
                    onClick={shareResults}
                    className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-300 transition-all font-bold text-lg shadow-lg flex items-center"
                  >
                    <Share2 className="w-6 h-6 mr-2" />
                    Share with Family
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Visualization */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-blue-600" />
              {selectedYear} Bihu Calendar Timeline
            </h3>
            
            <div className="relative h-32">
              {/* Timeline bar */}
              <div className="absolute top-16 left-0 right-0 h-2 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-full" />
              
              {/* Festival markers */}
              {festivals.map((festival, index) => {
                const month = festival.date.getMonth();
                const position = (month / 12) * 100;
                
                return (
                  <div
                    key={festival.name}
                    className="absolute transform -translate-x-1/2"
                    style={{ left: `${position}%`, top: index % 2 === 0 ? '0' : '4rem' }}
                  >
                    <div className={`bg-gradient-to-r ${festival.color} text-white rounded-lg px-4 py-2 shadow-lg border-2 border-white mb-2`}>
                      <p className="text-xs font-semibold whitespace-nowrap">{festival.name}</p>
                      <p className="text-xs">
                        {festival.date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div className={`w-4 h-4 bg-gradient-to-r ${festival.color} rounded-full mx-auto border-2 border-white shadow-lg`} />
                  </div>
                );
              })}
            </div>
            
            <div className="mt-16 grid grid-cols-12 gap-1 text-xs text-gray-600 text-center">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                <div key={month}>{month}</div>
              ))}
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-12 space-y-8">
            {/* About Bihu */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Music className="w-8 h-8 mr-3 text-green-600" />
                Understanding Bihu Festivals
              </h2>
              
              <div className="prose max-w-none text-gray-700">
                <p className="text-lg mb-4">
                  Bihu is the most important festival of Assam, celebrating the agricultural cycle and marking different seasons of the year. 
                  The three Bihu festivals represent the complete agricultural calendar and are deeply rooted in Assamese culture and traditions.
                </p>

                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                    <Flower2 className="w-12 h-12 text-green-600 mb-3" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Bohag Bihu</h3>
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>Spring Festival</strong> - The most vibrant celebration marking the Assamese New Year and the beginning of sowing season.
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• 7-day celebration</li>
                      <li>• Bihu dance and songs</li>
                      <li>• New clothes and feasts</li>
                      <li>• Cattle worship</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
                    <Wheat className="w-12 h-12 text-amber-600 mb-3" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Kati Bihu</h3>
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>Autumn Festival</strong> - Observed during the lean season when granaries are empty, praying for crop protection.
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• 1-day observance</li>
                      <li>• Lighting sky lamps</li>
                      <li>• Simple vegetarian meals</li>
                      <li>• Prayers for crops</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border-2 border-red-200">
                    <Flame className="w-12 h-12 text-red-600 mb-3" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Magh Bihu</h3>
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>Harvest Festival</strong> - Celebration of harvesting with community feasts, bonfires, and thanksgiving.
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• 2-day celebration</li>
                      <li>• Meji bonfire ceremony</li>
                      <li>• Community feasts</li>
                      <li>• Traditional delicacies</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">🎶 The Cultural Significance</h3>
                <p className="mb-4">
                  Bihu is not just a festival but a way of life for the Assamese people. It embodies the agricultural heritage, 
                  celebrates community bonds, preserves traditional art forms, and reinforces cultural identity. The Bihu dance, 
                  with its vigorous movements and joyful expressions, has become synonymous with Assamese culture worldwide.
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200 my-6">
                  <h4 className="font-semibold text-lg mb-3 text-blue-900 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Traditional Celebrations
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Husori Groups:</strong> Teams of singers and dancers visit homes spreading joy and collecting gifts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Traditional Attire:</strong> Men wear dhoti-gamosa, women adorn mekhela-chador</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Special Foods:</strong> Pitha (rice cakes), laru (sweet balls), fish curry, and curd</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Musical Instruments:</strong> Dhol, pepa, gogona create the signature Bihu rhythm</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ❓ Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    q: "When is Bohag Bihu celebrated in 2026?",
                    a: `Bohag Bihu ${selectedYear} will be celebrated on ${bihuDates.bohag.toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}, marking the Assamese New Year and the arrival of spring.`
                  },
                  {
                    q: "What are the three types of Bihu festivals?",
                    a: "The three Bihu festivals are: Bohag/Rongali Bihu (spring, April), Kati/Kongali Bihu (autumn, October), and Magh/Bhogali Bihu (winter, January). Each represents a different agricultural season."
                  },
                  {
                    q: "How many days is Bihu celebrated?",
                    a: "Bohag Bihu is celebrated for 7 days, Magh Bihu for 2 days, and Kati Bihu is typically a one-day observance. Bohag Bihu is the longest and most elaborate celebration."
                  },
                  {
                    q: "What is the significance of Bihu dance?",
                    a: "Bihu dance is a folk dance performed during Bohag Bihu celebrations. It features vigorous movements, joyful expressions, and rhythmic steps that celebrate youth, fertility, and the arrival of spring."
                  },
                  {
                    q: "What traditional foods are prepared during Bihu?",
                    a: "Traditional Bihu delicacies include various types of pitha (rice cakes like til pitha, ghila pitha), laru (sweet balls made with coconut and sesame), doi (curd), fish curry, and duck meat preparations."
                  },
                  {
                    q: "Why is Kati Bihu called Kongali Bihu?",
                    a: "Kati Bihu is called Kongali (meaning poor) Bihu because it falls during the lean season when farmers' granaries are empty, and they await the harvest. It's observed with prayers for crop protection."
                  },
                  {
                    q: "What is the Meji ceremony in Magh Bihu?",
                    a: "Meji is a bonfire lit at dawn during Magh Bihu. Made from bamboo, hay, and dried leaves, the Meji symbolizes purification and thanksgiving for a successful harvest. People gather around it for community celebrations."
                  },
                  {
                    q: "Can non-Assamese people celebrate Bihu?",
                    a: "Absolutely! Bihu is a cultural celebration that welcomes everyone. Many cultural organizations across India and abroad organize Bihu celebrations where people of all backgrounds participate in the festivities."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-start">
                      <span className="text-green-600 mr-2">Q{index + 1}.</span>
                      {faq.q}
                    </h3>
                    <p className="text-gray-700 ml-8">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Links */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 border-2 border-purple-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 mr-2 text-purple-600" />
                Related Festival Tools
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/festival-tools/pongal-calendar" className="block p-4 bg-white rounded-xl hover:shadow-lg transition-all border-2 border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Pongal Calendar</h4>
                  <p className="text-sm text-gray-600">Tamil harvest festival dates</p>
                </a>

                <a href="/festival-tools/makar-sankranti-tithi" className="block p-4 bg-white rounded-xl hover:shadow-lg transition-all border-2 border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Makar Sankranti</h4>
                  <p className="text-sm text-gray-600">Sankranti timing calculator</p>
                </a>

                <a href="/festival-tools/lohri-sunrise-sunset" className="block p-4 bg-white rounded-xl hover:shadow-lg transition-all border-2 border-orange-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Lohri Calculator</h4>
                  <p className="text-sm text-gray-600">Punjabi harvest festival</p>
                </a>

                <a href="/festival-tools/onam-date-reminder" className="block p-4 bg-white rounded-xl hover:shadow-lg transition-all border-2 border-yellow-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Onam Calendar</h4>
                  <p className="text-sm text-gray-600">Kerala harvest festival</p>
                </a>

                <a href="/festival-tools/dussehra-dates" className="block p-4 bg-white rounded-xl hover:shadow-lg transition-all border-2 border-red-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Dussehra Dates</h4>
                  <p className="text-sm text-gray-600">Vijayadashami calculator</p>
                </a>

                <a href="/festival-tools" className="block p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl hover:shadow-lg transition-all border-2 border-purple-300">
                  <h4 className="font-semibold text-gray-900 mb-2">All Festival Tools</h4>
                  <p className="text-sm text-gray-600">Explore 20+ calculators</p>
                </a>
              </div>
            </div>

            {/* External Links */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ExternalLink className="w-6 h-6 mr-2 text-indigo-600" />
                Learn More About Bihu
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <a 
                  href="https://tourism.assam.gov.in/bihu-festival"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900">Assam Tourism</h4>
                    <p className="text-sm text-gray-600">Official Bihu information</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </a>
                
                <a 
                  href="https://www.drikpanchang.com/festivals/bihu/bihu-date-time.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900">Drik Panchang</h4>
                    <p className="text-sm text-gray-600">Authentic Bihu dates</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </a>

                <a 
                  href="https://www.indianculture.gov.in/festivals/bihu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900">Indian Culture Portal</h4>
                    <p className="text-sm text-gray-600">Cultural heritage</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </a>

                <a 
                  href="https://assaminfo.com/culture/bihu-festival-assam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900">Assam Info</h4>
                    <p className="text-sm text-gray-600">Detailed festival guide</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white py-12 px-4 mt-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              🎊 Celebrate Bihu with Your Community!
            </h2>
            <p className="text-xl mb-6 text-yellow-100">
              Download the complete calendar and share with family and friends
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={downloadAllBihus}
                className="px-8 py-4 bg-white text-green-600 rounded-xl hover:bg-green-50 transition-all font-bold text-lg shadow-lg"
              >
                <Download className="inline w-6 h-6 mr-2" />
                Download Calendar
              </button>
              <button
                onClick={shareResults}
                className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-300 transition-all font-bold text-lg shadow-lg"
              >
                <Share2 className="inline w-6 h-6 mr-2" />
                Share Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BihuDateCalendar;

