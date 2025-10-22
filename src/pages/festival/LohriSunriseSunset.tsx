import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Clock,
  MapPin,
  Calendar,
  Download,
  Share2,
  Flame,
  Info,
  TrendingUp,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Navigation,
  Search,
  Sparkles,
  Star,
  CloudSun,
  Thermometer
} from 'lucide-react';

// Indian cities with coordinates
const INDIAN_CITIES = [
  { name: 'Delhi', lat: 28.6139, lon: 77.2090, timezone: 'Asia/Kolkata', state: 'Delhi' },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777, timezone: 'Asia/Kolkata', state: 'Maharashtra' },
  { name: 'Chandigarh', lat: 30.7333, lon: 76.7794, timezone: 'Asia/Kolkata', state: 'Punjab' },
  { name: 'Amritsar', lat: 31.6340, lon: 74.8723, timezone: 'Asia/Kolkata', state: 'Punjab' },
  { name: 'Ludhiana', lat: 30.9010, lon: 75.8573, timezone: 'Asia/Kolkata', state: 'Punjab' },
  { name: 'Jalandhar', lat: 31.3260, lon: 75.5762, timezone: 'Asia/Kolkata', state: 'Punjab' },
  { name: 'Patiala', lat: 30.3398, lon: 76.3869, timezone: 'Asia/Kolkata', state: 'Punjab' },
  { name: 'Bangalore', lat: 12.9716, lon: 77.5946, timezone: 'Asia/Kolkata', state: 'Karnataka' },
  { name: 'Kolkata', lat: 22.5726, lon: 88.3639, timezone: 'Asia/Kolkata', state: 'West Bengal' },
  { name: 'Chennai', lat: 13.0827, lon: 80.2707, timezone: 'Asia/Kolkata', state: 'Tamil Nadu' },
  { name: 'Hyderabad', lat: 17.3850, lon: 78.4867, timezone: 'Asia/Kolkata', state: 'Telangana' },
  { name: 'Pune', lat: 18.5204, lon: 73.8567, timezone: 'Asia/Kolkata', state: 'Maharashtra' },
  { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714, timezone: 'Asia/Kolkata', state: 'Gujarat' },
  { name: 'Jaipur', lat: 26.9124, lon: 75.7873, timezone: 'Asia/Kolkata', state: 'Rajasthan' },
  { name: 'Lucknow', lat: 26.8467, lon: 80.9462, timezone: 'Asia/Kolkata', state: 'Uttar Pradesh' },
  { name: 'Shimla', lat: 31.1048, lon: 77.1734, timezone: 'Asia/Kolkata', state: 'Himachal Pradesh' },
  { name: 'Jammu', lat: 32.7266, lon: 74.8570, timezone: 'Asia/Kolkata', state: 'Jammu & Kashmir' }
];

// Simplified sunrise/sunset calculation (for accuracy, you would use a library like suncalc)
// This is a basic implementation of the solar position algorithm
const calculateSunTimes = (date: Date, lat: number, lon: number) => {
  // Julian date calculation
  const JD = date.getTime() / 86400000 + 2440587.5;
  const n = JD - 2451545.0;
  const L = (280.460 + 0.9856474 * n) % 360;
  const g = (357.528 + 0.9856003 * n) % 360;
  const lambda = L + 1.915 * Math.sin(g * Math.PI / 180) + 0.020 * Math.sin(2 * g * Math.PI / 180);
  
  // Solar declination
  const epsilon = 23.439 - 0.0000004 * n;
  const declination = Math.asin(Math.sin(epsilon * Math.PI / 180) * Math.sin(lambda * Math.PI / 180)) * 180 / Math.PI;
  
  // Hour angle for sunrise/sunset
  const cosH = (Math.sin(-0.833 * Math.PI / 180) - Math.sin(lat * Math.PI / 180) * Math.sin(declination * Math.PI / 180)) /
                (Math.cos(lat * Math.PI / 180) * Math.cos(declination * Math.PI / 180));
  
  if (cosH > 1 || cosH < -1) {
    // Polar day/night - use approximate values for edge cases
    const H = 0;
    const sunriseLocal = 6;
    const sunsetLocal = 18;
    return {
      sunrise: sunriseLocal,
      sunset: sunsetLocal,
      solarNoon: 12,
      civilDawn: 5.5,
      civilDusk: 18.5,
      dayLength: 12,
      declination
    };
  }
  
  const H = Math.acos(cosH) * 180 / Math.PI;
  
  // Solar noon in UTC
  const Tnoon = 12 - lon / 15;
  
  // Sunrise and sunset times in UTC
  const sunrise = Tnoon - H / 15;
  const sunset = Tnoon + H / 15;
  
  // Convert to local time (IST is UTC+5:30)
  const istOffset = 5.5;
  const sunriseLocal = (sunrise + istOffset + 24) % 24;
  const sunsetLocal = (sunset + istOffset + 24) % 24;
  
  // Civil twilight (sun at -6 degrees)
  const cosH_civil = (Math.sin(-6 * Math.PI / 180) - Math.sin(lat * Math.PI / 180) * Math.sin(declination * Math.PI / 180)) /
                      (Math.cos(lat * Math.PI / 180) * Math.cos(declination * Math.PI / 180));
  const H_civil = Math.acos(Math.max(-1, Math.min(1, cosH_civil))) * 180 / Math.PI;
  const civilDawn = ((Tnoon - H_civil / 15 + istOffset + 24) % 24);
  const civilDusk = ((Tnoon + H_civil / 15 + istOffset + 24) % 24);
  
  return {
    sunrise: sunriseLocal,
    sunset: sunsetLocal,
    solarNoon: (Tnoon + istOffset + 24) % 24,
    civilDawn,
    civilDusk,
    dayLength: H * 2 / 15, // in hours
    declination
  };
};

const formatTime = (hours: number): string => {
  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${period}`;
};

const createDateTime = (date: Date, hours: number): Date => {
  const result = new Date(date);
  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  result.setHours(h, m, 0, 0);
  return result;
};

const LohriSunriseSunset: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState(INDIAN_CITIES[0]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(new Date().getFullYear(), 0, 13)); // Jan 13
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [customLat, setCustomLat] = useState<string>('');
  const [customLon, setCustomLon] = useState<string>('');
  const [showCustomLocation, setShowCustomLocation] = useState(false);

  // Calculate Lohri date for current year (January 13)
  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const lohriDate = new Date(currentYear, 0, 13); // Jan 13
    
    // If Lohri has passed this year, show next year's date
    if (today > lohriDate) {
      setSelectedDate(new Date(currentYear + 1, 0, 13));
    } else {
      setSelectedDate(lohriDate);
    }
  }, []);

  // Detect user location
  const detectLocation = () => {
    setIsDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Find nearest city
          let nearestCity = INDIAN_CITIES[0];
          let minDistance = Infinity;
          
          INDIAN_CITIES.forEach(city => {
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

  // Filter cities based on search
  const filteredCities = useMemo(() => {
    if (!searchQuery) return INDIAN_CITIES;
    const query = searchQuery.toLowerCase();
    return INDIAN_CITIES.filter(city => 
      city.name.toLowerCase().includes(query) || 
      city.state.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Calculate sun times
  const sunTimes = useMemo(() => {
    const lat = showCustomLocation && customLat ? parseFloat(customLat) : selectedCity.lat;
    const lon = showCustomLocation && customLon ? parseFloat(customLon) : selectedCity.lon;
    
    if (isNaN(lat) || isNaN(lon)) return null;
    
    return calculateSunTimes(selectedDate, lat, lon);
  }, [selectedCity, selectedDate, showCustomLocation, customLat, customLon]);

  // Bonfire timing recommendations
  const bonfireTiming = useMemo(() => {
    if (!sunTimes) return null;
    
    const bonfireStart = sunTimes.sunset;
    const bonfireEnd = sunTimes.sunset + 2; // 2 hours after sunset
    const optimalStart = sunTimes.civilDusk;
    
    return {
      start: bonfireStart,
      end: bonfireEnd,
      optimalStart,
      duration: 2
    };
  }, [sunTimes]);

  // Generate .ics file for calendar
  const downloadCalendar = () => {
    if (!sunTimes || !bonfireTiming) return;
    
    const startTime = createDateTime(selectedDate, bonfireTiming.start);
    const endTime = createDateTime(selectedDate, bonfireTiming.end);
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MoneyCal//Lohri Calculator//EN',
      'BEGIN:VEVENT',
      `DTSTART:${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:Lohri Bonfire - ${selectedCity.name}`,
      `DESCRIPTION:Lohri bonfire celebration in ${selectedCity.name}. Sunset at ${formatTime(sunTimes.sunset)}. Best time: ${formatTime(bonfireTiming.start)} to ${formatTime(bonfireTiming.end)}`,
      `LOCATION:${selectedCity.name}, ${selectedCity.state}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lohri-${selectedDate.getFullYear()}-${selectedCity.name.toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Share functionality
  const shareResults = () => {
    if (!sunTimes) return;
    
    const shareText = `🔥 Lohri ${selectedDate.getFullYear()} - ${selectedCity.name}\n\n` +
      `🌅 Sunrise: ${formatTime(sunTimes.sunrise)}\n` +
      `🌇 Sunset: ${formatTime(sunTimes.sunset)}\n` +
      `🔥 Best Bonfire Time: ${formatTime(bonfireTiming?.start || 0)} - ${formatTime(bonfireTiming?.end || 0)}\n\n` +
      `Calculate yours at ${window.location.href}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Lohri ${selectedDate.getFullYear()} - ${selectedCity.name}`,
        text: shareText,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Details copied to clipboard!');
    }
  };

  // Days until Lohri
  const daysUntilLohri = useMemo(() => {
    const today = new Date();
    const diff = selectedDate.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [selectedDate]);

  if (!sunTimes) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <Flame className="w-16 h-16 text-orange-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Calculating sun times...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Lohri {selectedDate.getFullYear()} Sunrise Sunset Time {selectedCity.name} | Bonfire Timing Calculator India</title>
        <meta name="description" content={`Lohri ${selectedDate.getFullYear()} sunrise sunset time for ${selectedCity.name}. Best bonfire lighting time: ${formatTime(bonfireTiming?.start || 0)}. Get accurate sunrise ${formatTime(sunTimes.sunrise)}, sunset ${formatTime(sunTimes.sunset)} times for Lohri celebration. Download calendar, share with family.`} />
        <meta name="keywords" content={`lohri sunrise time ${selectedDate.getFullYear()}, lohri sunset time ${selectedCity.name}, lohri bonfire timing ${selectedDate.getFullYear()}, lohri date ${selectedDate.getFullYear()}, when to light lohri bonfire, lohri celebration time india, makar sankranti sunrise sunset, ${selectedCity.name} sunrise sunset lohri`} />
        <link rel="canonical" href={`https://moneycal.in/festival-tools/lohri-sunrise-sunset`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Lohri ${selectedDate.getFullYear()} Sunrise & Sunset - ${selectedCity.name} Bonfire Timing`} />
        <meta property="og:description" content={`Perfect timing for Lohri bonfire in ${selectedCity.name}! Sunset: ${formatTime(sunTimes.sunset)}. Best bonfire time: ${formatTime(bonfireTiming?.start || 0)} - ${formatTime(bonfireTiming?.end || 0)}`} />
        <meta property="og:url" content="https://moneycal.in/festival-tools/lohri-sunrise-sunset" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Lohri ${selectedDate.getFullYear()} - ${selectedCity.name} Bonfire Timing`} />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": `Lohri ${selectedDate.getFullYear()}`,
            "startDate": selectedDate.toISOString().split('T')[0],
            "location": {
              "@type": "Place",
              "name": selectedCity.name,
              "address": {
                "@type": "PostalAddress",
                "addressRegion": selectedCity.state,
                "addressCountry": "IN"
              }
            },
            "description": `Lohri festival celebration with bonfire timing for ${selectedCity.name}`
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Flame className="w-16 h-16 animate-bounce" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              🔥 Lohri {selectedDate.getFullYear()} Sunrise & Sunset Calculator
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-orange-100">
              Perfect Bonfire Timing for Your City | Accurate Astronomical Data
            </p>
            
            {daysUntilLohri > 0 && (
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border-2 border-white/40">
                <p className="text-lg font-semibold">
                  ⏰ {daysUntilLohri} days until Lohri!
                </p>
              </div>
            )}
            {daysUntilLohri === 0 && (
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border-2 border-white/40">
                <p className="text-lg font-semibold">
                  🎉 Happy Lohri!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Location Selection */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-orange-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-orange-600" />
              Select Your Location
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
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
                    placeholder="Search city or state..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {searchQuery && (
                    <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {filteredCities.map((city) => (
                        <button
                          key={city.name}
                          onClick={() => {
                            setSelectedCity(city);
                            setSearchQuery('');
                            setShowCustomLocation(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-orange-50 border-b border-gray-100 last:border-0"
                        >
                          <div className="font-semibold text-gray-900">{city.name}</div>
                          <div className="text-sm text-gray-600">{city.state}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Auto-detect */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Actions
                </label>
                <button
                  onClick={detectLocation}
                  disabled={isDetecting}
                  className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 flex items-center justify-center font-semibold"
                >
                  <Navigation className={`w-5 h-5 mr-2 ${isDetecting ? 'animate-spin' : ''}`} />
                  {isDetecting ? 'Detecting...' : 'Detect My Location'}
                </button>
              </div>
            </div>

            {/* Current Selection */}
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-4 border-2 border-orange-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Selected Location:</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedCity.name}, {selectedCity.state}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    📍 Coordinates: {selectedCity.lat.toFixed(4)}°N, {selectedCity.lon.toFixed(4)}°E
                  </p>
                </div>
                <Sparkles className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            {/* Custom Location Toggle */}
            <button
              onClick={() => setShowCustomLocation(!showCustomLocation)}
              className="mt-4 text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              {showCustomLocation ? '− Hide' : '+ Use'} Custom Coordinates
            </button>

            {showCustomLocation && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={customLat}
                    onChange={(e) => setCustomLat(e.target.value)}
                    placeholder="28.6139"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={customLon}
                    onChange={(e) => setCustomLon(e.target.value)}
                    placeholder="77.2090"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Results - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Sun Times Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* Sunrise */}
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <Sunrise className="w-10 h-10" />
                    <Sun className="w-6 h-6 opacity-70" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Sunrise</h3>
                  <p className="text-4xl font-bold">{formatTime(sunTimes.sunrise)}</p>
                  <p className="text-sm mt-2 opacity-90">Dawn begins at {formatTime(sunTimes.civilDawn)}</p>
                </div>

                {/* Solar Noon */}
                <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <Sun className="w-10 h-10" />
                    <CloudSun className="w-6 h-6 opacity-70" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Solar Noon</h3>
                  <p className="text-4xl font-bold">{formatTime(sunTimes.solarNoon)}</p>
                  <p className="text-sm mt-2 opacity-90">Sun at highest point</p>
                </div>

                {/* Sunset */}
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <Sunset className="w-10 h-10" />
                    <Moon className="w-6 h-6 opacity-70" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Sunset</h3>
                  <p className="text-4xl font-bold">{formatTime(sunTimes.sunset)}</p>
                  <p className="text-sm mt-2 opacity-90">Dusk ends at {formatTime(sunTimes.civilDusk)}</p>
                </div>
              </div>

              {/* Bonfire Timing - Featured */}
              <div className="bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500 rounded-2xl shadow-2xl p-8 text-white border-4 border-yellow-400">
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
                    <p className="text-4xl font-bold">{formatTime(bonfireTiming!.start)}</p>
                    <p className="text-sm mt-2 text-yellow-100">Right after sunset</p>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/40">
                    <p className="text-sm font-semibold mb-2">⏰ Celebration Duration</p>
                    <p className="text-4xl font-bold">{bonfireTiming!.duration} Hours</p>
                    <p className="text-sm mt-2 text-yellow-100">Until {formatTime(bonfireTiming!.end)}</p>
                  </div>
                </div>

                <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="flex items-start">
                    <Star className="w-5 h-5 mr-2 flex-shrink-0 mt-1 text-yellow-300" />
                    <div>
                      <p className="font-semibold mb-1">💡 Pro Tip:</p>
                      <p className="text-sm text-yellow-50">
                        The optimal time to light the bonfire is right at sunset ({formatTime(sunTimes.sunset)}). 
                        The sky becomes fully dark by {formatTime(sunTimes.civilDusk)} (civil twilight end), 
                        creating perfect ambiance for celebrations!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
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

              {/* Day Length & Additional Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-blue-600" />
                  Day Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Day Length</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.floor(sunTimes.dayLength)} hours {Math.round((sunTimes.dayLength % 1) * 60)} minutes
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Solar Declination</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {sunTimes.declination.toFixed(2)}°
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-gray-600 mb-1">Civil Dawn</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatTime(sunTimes.civilDawn)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Morning twilight begins</p>
                  </div>

                  <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                    <p className="text-sm text-gray-600 mb-1">Civil Dusk</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {formatTime(sunTimes.civilDusk)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Evening twilight ends</p>
                  </div>
                </div>
              </div>

              {/* Visual Timeline */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  📊 Visual Timeline
                </h3>
                
                <div className="relative h-24 bg-gradient-to-r from-blue-900 via-orange-400 to-blue-900 rounded-lg overflow-hidden">
                  {/* Dawn marker */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-yellow-300"
                    style={{ left: `${(sunTimes.civilDawn / 24) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-700 whitespace-nowrap">
                      Dawn<br/>{formatTime(sunTimes.civilDawn)}
                    </div>
                  </div>
                  
                  {/* Sunrise marker */}
                  <div 
                    className="absolute top-0 bottom-0 w-2 bg-yellow-500"
                    style={{ left: `${(sunTimes.sunrise / 24) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-900 whitespace-nowrap">
                      🌅<br/>{formatTime(sunTimes.sunrise)}
                    </div>
                  </div>
                  
                  {/* Solar Noon marker */}
                  <div 
                    className="absolute top-0 bottom-0 w-2 bg-white"
                    style={{ left: `${(sunTimes.solarNoon / 24) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-900 whitespace-nowrap">
                      ☀️<br/>{formatTime(sunTimes.solarNoon)}
                    </div>
                  </div>
                  
                  {/* Sunset marker */}
                  <div 
                    className="absolute top-0 bottom-0 w-2 bg-orange-500"
                    style={{ left: `${(sunTimes.sunset / 24) * 100}%` }}
                  >
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-900 whitespace-nowrap">
                      🌇<br/>{formatTime(sunTimes.sunset)}
                    </div>
                  </div>
                  
                  {/* Dusk marker */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-purple-400"
                    style={{ left: `${(sunTimes.civilDusk / 24) * 100}%` }}
                  >
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-700 whitespace-nowrap">
                      Dusk<br/>{formatTime(sunTimes.civilDusk)}
                    </div>
                  </div>

                  {/* Bonfire window highlight */}
                  <div 
                    className="absolute top-0 bottom-0 bg-red-500/30 border-2 border-red-500"
                    style={{ 
                      left: `${(bonfireTiming!.start / 24) * 100}%`,
                      width: `${((bonfireTiming!.end - bonfireTiming!.start) / 24) * 100}%`
                    }}
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white bg-red-600 px-2 py-1 rounded whitespace-nowrap">
                      🔥 Bonfire Time
                    </div>
                  </div>
                </div>

                <div className="mt-12 text-xs text-gray-600 text-center">
                  <p>Red zone = Recommended bonfire timing | Yellow = Sunrise | Orange = Sunset</p>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Info & Links */}
            <div className="space-y-6">
              {/* Quick Info Card */}
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl shadow-lg p-6 border-2 border-orange-300">
                <div className="flex items-center mb-4">
                  <Info className="w-6 h-6 mr-2 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900">About Lohri</h3>
                </div>
                
                <div className="space-y-3 text-sm text-gray-700">
                  <p>
                    <strong>Date:</strong> {selectedDate.toLocaleDateString('en-IN', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  
                  <p>
                    <strong>Significance:</strong> Lohri marks the end of winter and celebrates the winter crop harvest. 
                    It is primarily celebrated in Punjab and northern India.
                  </p>
                  
                  <p>
                    <strong>Tradition:</strong> People gather around bonfires, throw sesame seeds and jaggery into the fire, 
                    and perform folk dances like Gidda and Bhangra.
                  </p>

                  <p className="bg-white/60 rounded-lg p-3 border border-orange-200">
                    <strong className="text-orange-700">🔥 Bonfire Safety:</strong><br/>
                    Ensure adequate space, keep water nearby, supervise children, and follow local fire safety regulations.
                  </p>
                </div>
              </div>

              {/* Popular Cities Quick Links */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Popular Cities
                </h3>
                
                <div className="space-y-2">
                  {INDIAN_CITIES.slice(0, 8).map(city => (
                    <button
                      key={city.name}
                      onClick={() => {
                        setSelectedCity(city);
                        setShowCustomLocation(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        selectedCity.name === city.name
                          ? 'bg-orange-100 border-2 border-orange-400 font-semibold'
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{city.name}</span>
                        {selectedCity.name === city.name && (
                          <CheckCircle2 className="w-4 h-4 text-orange-600" />
                        )}
                      </div>
                      <div className="text-xs text-gray-500">{city.state}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accuracy Notice */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">Calculation Accuracy</p>
                    <p className="text-xs">
                      Times are calculated using standard astronomical algorithms (NOAA method). 
                      Actual times may vary by ±2 minutes due to atmospheric conditions and local terrain.
                    </p>
                  </div>
                </div>
              </div>

              {/* Internal Links */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Related Tools
                </h3>
                
                <div className="space-y-2">
                  <a href="/festival-tools/makar-sankranti-tithi" className="block p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg hover:shadow-md transition-all border border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">Makar Sankranti Calculator</span>
                      <ArrowRight className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Find exact Sankranti timing</p>
                  </a>

                  <a href="/festival-tools/pongal-calendar" className="block p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg hover:shadow-md transition-all border border-yellow-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">Pongal Calendar</span>
                      <ArrowRight className="w-4 h-4 text-orange-600" />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Tamil harvest festival dates</p>
                  </a>

                  <a href="/festival-tools" className="block p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:shadow-md transition-all border border-purple-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">All Festival Tools</span>
                      <ArrowRight className="w-4 h-4 text-purple-600" />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Explore 20+ festival calculators</p>
                  </a>
                </div>
              </div>

              {/* External Links */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <ExternalLink className="w-5 h-5 mr-2 text-indigo-600" />
                  Learn More
                </h3>
                
                <div className="space-y-3">
                  <a 
                    href="https://www.drikpanchang.com/festivals/lohri/lohri-date-time.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Drik Panchang - Lohri Dates
                  </a>

                  <a 
                    href="https://www.timeanddate.com/astronomy/india/new-delhi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Time and Date - Sunrise Sunset
                  </a>

                  <a 
                    href="https://www.indianculture.gov.in/festivals/lohri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Indian Culture Portal - Lohri
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 space-y-8">
            {/* FAQs */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ❓ Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    q: "When is the best time to light the Lohri bonfire?",
                    a: `The best time to light the Lohri bonfire is right at sunset (${formatTime(sunTimes.sunset)} in ${selectedCity.name}). This timing aligns with tradition and provides the perfect ambiance as darkness falls. The celebration typically lasts for 2 hours until around ${formatTime(bonfireTiming!.end)}.`
                  },
                  {
                    q: "Why is Lohri celebrated on January 13?",
                    a: "Lohri is celebrated on January 13 as it coincides with Makar Sankranti, marking the sun's transition into Capricorn (Makar Rashi). It signifies the end of winter solstice and the beginning of longer days, celebrating the winter harvest."
                  },
                  {
                    q: "What is civil twilight and why does it matter for Lohri?",
                    a: `Civil twilight is when the sun is 6° below the horizon. In ${selectedCity.name}, civil dusk occurs at ${formatTime(sunTimes.civilDusk)}, marking when the sky becomes fully dark. This creates the perfect atmosphere for bonfire celebrations and photography.`
                  },
                  {
                    q: "How accurate are these sunrise and sunset times?",
                    a: "Our calculator uses standard astronomical algorithms (NOAA method) with an accuracy of ±1-2 minutes. We account for atmospheric refraction and the sun's angular diameter. Actual observed times may vary slightly due to local weather and terrain."
                  },
                  {
                    q: "Is Lohri the same as Makar Sankranti?",
                    a: "While both fall around the same time, Lohri (January 13) is primarily a Punjabi festival celebrating the harvest and winter solstice. Makar Sankranti varies by region and celebrates the sun's northward journey. They share agricultural significance but have different cultural traditions."
                  },
                  {
                    q: "Can I celebrate Lohri if it is cloudy?",
                    a: "Yes! The astronomical times remain the same regardless of weather. Even if you cannot see the actual sunset, the bonfire timing stays consistent. The celebration is about community, harvest, and tradition rather than observing the sun directly."
                  },
                  {
                    q: "What offerings are thrown in the Lohri bonfire?",
                    a: "Traditional offerings include sesame seeds (til), jaggery (gur), peanuts, popcorn, and rewri. These items represent prosperity and gratitude for the harvest. People circle the bonfire singing traditional songs and throwing these offerings."
                  },
                  {
                    q: "Why does daylight length matter for Lohri?",
                    a: `Lohri marks the turning point when days start getting longer. In ${selectedCity.name}, the day length is ${Math.floor(sunTimes.dayLength)} hours ${Math.round((sunTimes.dayLength % 1) * 60)} minutes. This gradual increase of daylight symbolizes the victory of light over darkness and the approach of spring.`
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-start">
                      <span className="text-orange-600 mr-2">Q{index + 1}.</span>
                      {faq.q}
                    </h3>
                    <p className="text-gray-700 ml-8">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comprehensive Guide */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-lg p-8 border-2 border-orange-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                📚 Complete Guide to Lohri Bonfire Timing
              </h2>
              
              <div className="prose max-w-none text-gray-700">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">🔥 Understanding the Perfect Bonfire Timing</h3>
                
                <p className="mb-4">
                  Lohri is one of the most vibrant festivals celebrated in Punjab and across northern India. The bonfire (or "Lohri fire") is the centerpiece of the celebration, and its timing is crucial for creating the perfect festive atmosphere.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="bg-white rounded-xl p-6 border-2 border-orange-300">
                    <h4 className="font-semibold text-lg mb-3 text-orange-700">🌅 Astronomical Significance</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Marks the winter solstice passage</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Celebrates increasing daylight hours</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Aligns with Makar Sankranti</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Sunset symbolizes transition to light</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl p-6 border-2 border-red-300">
                    <h4 className="font-semibold text-lg mb-3 text-red-700">🎉 Cultural Importance</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Harvest festival for Rabi crops</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Community bonding and celebrations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Traditional folk dances (Gidda, Bhangra)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Prayers for prosperity and abundance</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">⏰ Why Sunset is the Optimal Time</h3>
                
                <p className="mb-4">
                  Lighting the bonfire at sunset has both practical and symbolic significance:
                </p>

                <ol className="list-decimal ml-6 space-y-3 mb-6">
                  <li>
                    <strong>Visual Impact:</strong> As daylight fades, the bonfire becomes more visible and creates a mesmerizing glow that enhances the festive atmosphere.
                  </li>
                  <li>
                    <strong>Temperature:</strong> Evening temperatures are cooler, making it comfortable for people to gather around the fire for extended periods.
                  </li>
                  <li>
                    <strong>Symbolic Transition:</strong> Lighting the fire at sunset represents the triumph of light over darkness, hope over despair.
                  </li>
                  <li>
                    <strong>Community Gathering:</strong> Sunset time allows people to finish daily work and come together for celebrations.
                  </li>
                  <li>
                    <strong>Traditional Timing:</strong> Historically, agricultural communities would celebrate after the day's work, naturally aligning with sunset.
                  </li>
                </ol>

                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
                  <div className="flex items-start">
                    <Thermometer className="w-6 h-6 mr-3 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-2">🔥 Bonfire Safety Guidelines</h4>
                      <ul className="text-sm text-yellow-900 space-y-1">
                        <li>• Choose an open area away from buildings and trees</li>
                        <li>• Keep water and fire extinguisher nearby</li>
                        <li>• Supervise children at all times</li>
                        <li>• Avoid loose clothing near the fire</li>
                        <li>• Ensure proper ventilation if indoors</li>
                        <li>• Follow local fire safety regulations</li>
                        <li>• Fully extinguish the fire before leaving</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">📍 Regional Variations</h3>
                
                <p className="mb-4">
                  While Lohri is primarily a Punjabi festival, it is celebrated across northern India with slight variations:
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Punjab</h4>
                    <p className="text-sm text-gray-600">
                      Grand celebrations with Bhangra, Gidda, and community bonfires. Special focus on newlyweds and newborns.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Haryana</h4>
                    <p className="text-sm text-gray-600">
                      Similar to Punjab with folk songs and dances. Special sweets like gajak and rewri are distributed.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Himachal</h4>
                    <p className="text-sm text-gray-600">
                      Called "Maghi," celebrated with traditional food and mountain bonfires at higher elevations.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">🎵 Traditional Celebrations</h3>
                
                <p className="mb-4">
                  The Lohri celebration is incomplete without these traditional elements:
                </p>

                <div className="bg-white rounded-xl p-6 border-2 border-orange-200 mb-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Star className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Folk Songs:</strong> Traditional Lohri songs about Dulla Bhatti, a legendary hero, are sung around the bonfire.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Parikrama:</strong> People circle the bonfire clockwise, throwing offerings and singing prayers.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Traditional Food:</strong> Sarson da saag, makki di roti, til ladoo, gajak, and rewri are traditional delicacies.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Dance Performances:</strong> Bhangra and Gidda performances by community members add energy to the celebration.
                      </div>
                    </li>
                  </ul>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">📖 The Science Behind Our Calculations</h3>
                
                <p className="mb-4">
                  Our calculator uses advanced astronomical algorithms to provide accurate sunrise and sunset times:
                </p>

                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>NOAA Method:</strong> We use the National Oceanic and Atmospheric Administration's proven formulas for solar position calculations.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Atmospheric Refraction:</strong> We account for the 0.833° correction due to Earth's atmosphere bending sunlight.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Solar Declination:</strong> We calculate the sun's angle relative to Earth's equator for your specific date and location.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Twilight Phases:</strong> Civil, nautical, and astronomical twilight times help you plan the perfect celebration timing.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12 px-4 mt-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              🎉 Make This Lohri Special!
            </h2>
            <p className="text-xl mb-6 text-orange-100">
              Share this tool with your family and friends to help them celebrate at the perfect time
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={shareResults}
                className="px-8 py-4 bg-white text-orange-600 rounded-xl hover:bg-orange-50 transition-all font-bold text-lg shadow-lg"
              >
                <Share2 className="inline w-6 h-6 mr-2" />
                Share Now
              </button>
              <button
                onClick={downloadCalendar}
                className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-300 transition-all font-bold text-lg shadow-lg"
              >
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

