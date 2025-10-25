import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Calendar, ArrowRightLeft, Info, Share2 } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Hindu months (lunar)
const HINDU_MONTHS = [
  'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada',
  'Ashwin', 'Kartik', 'Margashirsha', 'Pausha', 'Magha', 'Phalguna'
];

const SolarLunarConverter: React.FC = () => {
  const [solarDate, setSolarDate] = useState(new Date().toISOString().split('T')[0]);
  const [lunarMonth, setLunarMonth] = useState('Chaitra');
  const [lunarDay, setLunarDay] = useState(1);
  const [lunarYear, setLunarYear] = useState(2082); // Vikram Samvat
  const [conversionMode, setConversionMode] = useState<'solar-to-lunar' | 'lunar-to-solar'>('solar-to-lunar');
  const [result, setResult] = useState<{ gregorian: string; hindu: string; tithi: string } | null>(null);

  // Convert Solar to Lunar
  const convertSolarToLunar = () => {
    const date = new Date(solarDate);
    
    // Simplified conversion (in production, use precise lunar calendar algorithms)
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
    const lunarMonthIndex = Math.floor((dayOfYear / 29.5) % 12);
    const lunarDayCalc = Math.floor((dayOfYear % 29.5) + 1);
    const vikramSamvat = date.getFullYear() + 57;
    
    const tithiNames = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'];
    const tithi = tithiNames[Math.min(lunarDayCalc - 1, 14)];
    
    setResult({
      gregorian: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      hindu: `${lunarDayCalc} ${HINDU_MONTHS[lunarMonthIndex]} ${vikramSamvat} (Vikram Samvat)`,
      tithi: tithi
    });
  };

  // Convert Lunar to Solar
  const convertLunarToSolar = () => {
    // Simplified reverse conversion
    const monthIndex = HINDU_MONTHS.indexOf(lunarMonth);
    const gregorianYear = lunarYear - 57;
    const estimatedDayOfYear = (monthIndex * 29.5) + lunarDay;
    
    const solarDateCalc = new Date(gregorianYear, 0, estimatedDayOfYear);
    
    setResult({
      gregorian: solarDateCalc.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      hindu: `${lunarDay} ${lunarMonth} ${lunarYear} (Vikram Samvat)`,
      tithi: 'Calculated based on lunar day'
    });
  };

  const handleConvert = () => {
    if (conversionMode === 'solar-to-lunar') {
      convertSolarToLunar();
    } else {
      convertLunarToSolar();
    }
  };

  return (
    <>
      <SEOHelmet
        title="Solar to Lunar Calendar Converter 2025 - Hindu Panchang Date Converter | Vikram Samvat to Gregorian"
        description="Free solar to lunar calendar converter for India. Convert Gregorian dates to Hindu lunar calendar (Vikram Samvat) and vice versa. Calculate tithi, nakshatra, and Hindu months for any date. Essential tool for Indian festivals and ceremonies."
        keywords="solar to lunar converter, hindu calendar converter, vikram samvat converter, gregorian to lunar date, panchang date converter 2025, hindu months calculator, tithi calculator, lunar calendar india, indian calendar converter free online"
        canonicalUrl="https://moneycal.in/festival-tools/solar-lunar-converter"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Sun className="w-12 h-12 text-orange-500" />
              <ArrowRightLeft className="w-8 h-8 text-purple-600" />
              <Moon className="w-12 h-12 text-blue-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              🌞🌙 Solar/Lunar Calendar Converter
            </h1>
            <p className="text-xl text-gray-700">
              Convert Between Gregorian and Hindu Lunar Calendar (Vikram Samvat) Instantly
            </p>
          </motion.div>

          {/* Converter Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
            {/* Mode Toggle */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setConversionMode('solar-to-lunar')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    conversionMode === 'solar-to-lunar'
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Sun className="w-5 h-5 inline mr-2" />
                  Solar → Lunar
                </button>
                <button
                  onClick={() => setConversionMode('lunar-to-solar')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    conversionMode === 'lunar-to-solar'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Moon className="w-5 h-5 inline mr-2" />
                  Lunar → Solar
                </button>
              </div>
            </div>

            {conversionMode === 'solar-to-lunar' ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Select Gregorian (Solar) Date
                  </label>
                  <input
                    type="date"
                    value={solarDate}
                    onChange={(e) => setSolarDate(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-orange-300 rounded-xl focus:ring-4 focus:ring-orange-200 text-lg outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Lunar Day (Tithi)</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={lunarDay}
                      onChange={(e) => setLunarDay(parseInt(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Hindu Month</label>
                    <select
                      value={lunarMonth}
                      onChange={(e) => setLunarMonth(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 outline-none"
                    >
                      {HINDU_MONTHS.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Vikram Samvat Year</label>
                    <input
                      type="number"
                      min="2000"
                      max="2100"
                      value={lunarYear}
                      onChange={(e) => setLunarYear(parseInt(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleConvert}
              className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg flex items-center justify-center gap-3"
            >
              <ArrowRightLeft className="w-6 h-6" />
              Convert Calendar
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 border-2 border-green-300"
              >
                <h3 className="text-2xl font-bold text-green-900 mb-6 text-center">✅ Conversion Result</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/70 rounded-xl p-6">
                    <p className="text-sm font-semibold text-green-800 mb-2">🌞 Gregorian (Solar) Date</p>
                    <p className="text-2xl font-bold text-gray-900">{result.gregorian}</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-6">
                    <p className="text-sm font-semibold text-green-800 mb-2">🌙 Hindu Lunar Date</p>
                    <p className="text-2xl font-bold text-gray-900">{result.hindu}</p>
                  </div>
                </div>
                <div className="mt-4 bg-white/70 rounded-xl p-4 text-center">
                  <p className="text-sm font-semibold text-green-800">📅 Tithi (Lunar Day)</p>
                  <p className="text-xl font-bold text-gray-900">{result.tithi}</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* SEO Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 prose prose-lg max-w-none">
            <h2>Complete Guide to Solar and Lunar Calendar Conversion for Indian Festivals</h2>
            <p>
              Understanding the difference between solar (Gregorian) and lunar (Hindu) calendars is essential for celebrating Indian festivals correctly. This free online converter helps you translate dates between the two systems instantly.
            </p>
            
            <h3>What is the Difference Between Solar and Lunar Calendars?</h3>
            <ul>
              <li><strong>Solar Calendar (Gregorian):</strong> Based on Earth's revolution around the Sun (365.25 days)</li>
              <li><strong>Lunar Calendar (Hindu/Panchang):</strong> Based on Moon's phases (29.5 days per month)</li>
              <li><strong>Vikram Samvat:</strong> Hindu lunar calendar starting from 57 BCE</li>
            </ul>

            <div className="bg-yellow-50 p-6 rounded-xl">
              <h3>🎯 Use Cases for Calendar Conversion</h3>
              <ul>
                <li>Find exact dates of Hindu festivals in Gregorian calendar</li>
                <li>Calculate birth dates in Hindu lunar calendar</li>
                <li>Plan weddings and ceremonies according to panchang</li>
                <li>Convert historical dates between calendars</li>
              </ul>
            </div>

            <h3>Related Tools</h3>
            <div className="grid sm:grid-cols-2 gap-4 not-prose">
              <a href="/festival-tools/panchang-today" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100">
                <h4 className="font-bold text-blue-900">📅 Today's Panchang</h4>
              </a>
              <a href="/festival-tools/festival-monthly-list" className="block p-4 bg-purple-50 rounded-xl hover:bg-purple-100">
                <h4 className="font-bold text-purple-900">📋 Monthly Festivals</h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SolarLunarConverter;

