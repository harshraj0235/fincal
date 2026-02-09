import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Sun, Sparkles, Home, ChevronRight,
  Share2, Download, Bell, ArrowRight, DollarSign, TrendingUp,
  Gift, Coins, Check, Copy, X
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Dhanteras is 2 days before Diwali
const DHANTERAS_DATA = {
  2020: { date: '2020-11-12', day: 'Thursday', diwaliDate: '2020-11-14', goldMuhurat: '06:42 - 12:30', silverMuhurat: '14:00 - 17:00', sunrise: '06:42', sunset: '17:29' },
  2021: { date: '2021-11-02', day: 'Tuesday', diwaliDate: '2021-11-04', goldMuhurat: '06:31 - 12:15', silverMuhurat: '14:00 - 17:00', sunrise: '06:31', sunset: '17:38' },
  2022: { date: '2022-10-22', day: 'Saturday', diwaliDate: '2022-10-24', goldMuhurat: '06:24 - 12:00', silverMuhurat: '14:00 - 17:00', sunrise: '06:24', sunset: '17:47' },
  2023: { date: '2023-11-10', day: 'Friday', diwaliDate: '2023-11-12', goldMuhurat: '06:40 - 12:25', silverMuhurat: '14:00 - 17:00', sunrise: '06:40', sunset: '17:32' },
  2024: { date: '2024-10-30', day: 'Wednesday', diwaliDate: '2024-11-01', goldMuhurat: '06:29 - 12:10', silverMuhurat: '14:00 - 17:00', sunrise: '06:29', sunset: '17:40' },
  2025: { date: '2025-10-18', day: 'Saturday', diwaliDate: '2025-10-20', goldMuhurat: '06:22 - 12:00', silverMuhurat: '14:00 - 17:00', sunrise: '06:22', sunset: '17:49' },
  2026: { date: '2026-11-06', day: 'Friday', diwaliDate: '2026-11-08', goldMuhurat: '06:37 - 12:20', silverMuhurat: '14:00 - 17:00', sunrise: '06:37', sunset: '17:34' },
  2027: { date: '2027-10-27', day: 'Wednesday', diwaliDate: '2027-10-29', goldMuhurat: '06:27 - 12:05', silverMuhurat: '14:00 - 17:00', sunrise: '06:27', sunset: '17:42' },
  2028: { date: '2028-10-15', day: 'Sunday', diwaliDate: '2028-10-17', goldMuhurat: '06:20 - 11:55', silverMuhurat: '14:00 - 17:00', sunrise: '06:20', sunset: '17:51' },
  2029: { date: '2029-11-03', day: 'Saturday', diwaliDate: '2029-11-05', goldMuhurat: '06:34 - 12:15', silverMuhurat: '14:00 - 17:00', sunrise: '06:34', sunset: '17:36' },
  2030: { date: '2030-10-24', day: 'Thursday', diwaliDate: '2030-10-26', goldMuhurat: '06:25 - 12:02', silverMuhurat: '14:00 - 17:00', sunrise: '06:25', sunset: '17:45' },
  2031: { date: '2031-11-12', day: 'Wednesday', diwaliDate: '2031-11-14', goldMuhurat: '06:42 - 12:25', silverMuhurat: '14:00 - 17:00', sunrise: '06:42', sunset: '17:29' },
  2032: { date: '2032-10-31', day: 'Sunday', diwaliDate: '2032-11-02', goldMuhurat: '06:30 - 12:08', silverMuhurat: '14:00 - 17:00', sunrise: '06:30', sunset: '17:38' },
  2033: { date: '2033-10-21', day: 'Friday', diwaliDate: '2033-10-23', goldMuhurat: '06:23 - 11:58', silverMuhurat: '14:00 - 17:00', sunrise: '06:23', sunset: '17:47' },
  2034: { date: '2034-11-09', day: 'Thursday', diwaliDate: '2034-11-11', goldMuhurat: '06:39 - 12:22', silverMuhurat: '14:00 - 17:00', sunrise: '06:39', sunset: '17:31' },
  2035: { date: '2035-10-29', day: 'Monday', diwaliDate: '2035-10-31', goldMuhurat: '06:28 - 12:06', silverMuhurat: '14:00 - 17:00', sunrise: '06:28', sunset: '17:41' }
};

const DhanterasDateFinder: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdownDays, setCountdownDays] = useState(0);

  const years = Array.from({ length: 16 }, (_, i) => 2020 + i);
  const dhanterasInfo = DHANTERAS_DATA[selectedYear as keyof typeof DHANTERAS_DATA];

  useEffect(() => {
    if (dhanterasInfo) {
      const dhanterasDate = new Date(dhanterasInfo.date);
      const today = new Date();
      const diffTime = dhanterasDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setCountdownDays(diffDays);
    }
  }, [dhanterasInfo]);

  const shareUrl = `https://moneycal.in/festival-tools/dhanteras-date-finder?year=${selectedYear}`;
  const shareText = `Dhanteras ${selectedYear} is on ${dhanterasInfo?.day}, ${new Date(dhanterasInfo?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}! Best gold muhurat: ${dhanterasInfo?.goldMuhurat}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEOHelmet
        title={`Dhanteras ${selectedYear} Date - Gold Purchase Muhurat, Silver Buying Time | Best Dhanteras Shubh Muhurat`}
        description={`Dhanteras ${selectedYear} falls on ${dhanterasInfo?.day}, ${new Date(dhanterasInfo?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}. Get best gold purchase muhurat (${dhanterasInfo?.goldMuhurat}), silver buying time, shubh timing for wealth & prosperity!`}
        keywords={`dhanteras ${selectedYear} date, dhanteras ${selectedYear} gold muhurat, dhanteras ${selectedYear} silver buying time, when is dhanteras ${selectedYear}, dhanteras shubh muhurat ${selectedYear}, gold purchase muhurat dhanteras, dhanteras ${selectedYear} india, best time buy gold dhanteras, dhanteras lakshmi puja time, dhan teras ${selectedYear}`}
        url={`/festival-tools/dhanteras-date-finder?year=${selectedYear}`}
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-yellow-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-yellow-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-dates" className="hover:text-yellow-600 transition-colors">
                Festival Dates
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-yellow-600 font-medium">Dhanteras Date</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-12">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-full mb-6">
                <Coins className="w-5 h-5" />
                <span className="font-semibold">Auspicious Gold & Silver Purchase Timing</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Dhanteras {selectedYear} Date Finder
              </h1>

              <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto">
                Find exact Dhanteras date, best gold purchase muhurat & silver buying shubh timing for wealth & prosperity!
              </p>

              {dhanterasInfo && countdownDays > 0 && countdownDays < 365 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full font-bold text-lg"
                >
                  <Clock className="w-5 h-5" />
                  <span>{countdownDays} days until Dhanteras {selectedYear}!</span>
                </motion.div>
              )}
            </motion.div>

            {/* Main Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-yellow-200">
                {/* Year Selector */}
                <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-8">
                  <div className="max-w-md mx-auto">
                    <label className="block text-white font-semibold mb-3 flex items-center justify-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Select Year
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white font-bold text-lg focus:outline-none focus:border-white backdrop-blur-sm appearance-none cursor-pointer text-center"
                    >
                      {years.map(year => (
                        <option key={year} value={year} className="text-gray-900">
                          Dhanteras {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Results */}
                {dhanterasInfo && (
                  <div className="p-8">
                    {/* Main Date */}
                    <div className="text-center mb-8 pb-8 border-b-2 border-yellow-100">
                      <div className="inline-flex items-center justify-center space-x-3 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Coins className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Dhanteras {selectedYear}</h2>
                      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
                        {new Date(dhanterasInfo.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                      </div>
                      <div className="text-2xl text-gray-600 font-semibold">{dhanterasInfo.day}</div>
                      <p className="mt-4 text-gray-600">2 days before Diwali {selectedYear} ({dhanterasInfo.diwaliDate})</p>
                    </div>

                    {/* Muhurat Timings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                            <Coins className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Gold Purchase Muhurat</h3>
                        </div>
                        <p className="text-3xl font-bold text-yellow-600">{dhanterasInfo.goldMuhurat}</p>
                        <p className="text-sm text-gray-600 mt-2">Most auspicious time for gold</p>
                      </div>

                      <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border-2 border-gray-300">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-gray-500 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Silver Buying Muhurat</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-600">{dhanterasInfo.silverMuhurat}</p>
                        <p className="text-sm text-gray-600 mt-2">Budget-friendly alternative</p>
                      </div>

                      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sunrise</h3>
                        </div>
                        <p className="text-3xl font-bold text-orange-600">{dhanterasInfo.sunrise}</p>
                        <p className="text-sm text-gray-600 mt-2">Morning rituals begin</p>
                      </div>

                      <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sunset</h3>
                        </div>
                        <p className="text-3xl font-bold text-red-600">{dhanterasInfo.sunset}</p>
                        <p className="text-sm text-gray-600 mt-2">Lakshmi puja time</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      <button
                        onClick={() => window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Dhanteras+${selectedYear}&dates=${dhanterasInfo.date.replace(/-/g, '')}/${dhanterasInfo.date.replace(/-/g, '')}&details=Gold+Muhurat:+${dhanterasInfo.goldMuhurat}`, '_blank')}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                      >
                        <Download className="w-5 h-5" />
                        <span>Add to Calendar</span>
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => setShowShareMenu(!showShareMenu)}
                          className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-yellow-600 text-yellow-600 rounded-xl font-bold hover:bg-yellow-50 transition-all"
                        >
                          <Share2 className="w-5 h-5" />
                          <span>Share</span>
                        </button>

                        {showShareMenu && (
                          <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 min-w-[200px]">
                            <button
                              onClick={handleCopyLink}
                              className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 rounded-lg"
                            >
                              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                              </div>
                              <span className="font-semibold">{copied ? 'Copied!' : 'Copy Link'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Gold Investment Tips */}
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                      <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                        <TrendingUp className="w-6 h-6 mr-2 text-yellow-600" />
                        Dhanteras Gold Investment Tips
                      </h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-yellow-600 mr-2">💰</span>
                          <span><strong>Gold Coins/Bars:</strong> Better returns than jewelry (no making charges)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-600 mr-2">💰</span>
                          <span><strong>Digital Gold:</strong> Buy from PayTM Money, PhonePe (starts ₹100)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-600 mr-2">💰</span>
                          <span><strong>Silver Alternative:</strong> Good for budget-conscious buyers</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-600 mr-2">💰</span>
                          <span><strong>Avoid Rahu Kaal:</strong> Check local timings before purchase</span>
                        </li>
                      </ul>
                      <div className="mt-4 flex gap-3">
                        <Link to="/gold-tools" className="text-yellow-600 hover:underline font-semibold flex items-center">
                          <ArrowRight className="w-4 h-4 mr-1" />
                          Gold Investment Calculators
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Related Links */}
            <div className="mt-12 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-6">Related Festival Dates {selectedYear}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/festival-tools/diwali-date-finder" className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-orange-200">
                  <Sparkles className="w-10 h-10 text-orange-600 mb-3" />
                  <h4 className="font-bold text-lg mb-2">Diwali {selectedYear}</h4>
                  <p className="text-gray-600 text-sm">Lakshmi Puja muhurat & timings</p>
                </Link>
                <Link to="/festival-tools/govardhan-puja-finder" className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-green-200">
                  <Gift className="w-10 h-10 text-green-600 mb-3" />
                  <h4 className="font-bold text-lg mb-2">Govardhan Puja {selectedYear}</h4>
                  <p className="text-gray-600 text-sm">Annakut celebration date</p>
                </Link>
                <Link to="/festival-tools/bhai-dooj-date-finder" className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-pink-200">
                  <Gift className="w-10 h-10 text-pink-600 mb-3" />
                  <h4 className="font-bold text-lg mb-2">Bhai Dooj {selectedYear}</h4>
                  <p className="text-gray-600 text-sm">Brother-sister bond day</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">About Dhanteras {selectedYear} - Complete Guide</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                <strong>Dhanteras {selectedYear} falls on {dhanterasInfo?.day}, {new Date(dhanterasInfo?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>, marking the auspicious beginning of the 5-day Diwali festival. Dhanteras, also known as Dhanatrayodashi, is dedicated to Goddess Lakshmi and Lord Dhanvantari (god of Ayurveda).
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Best Gold Purchase Muhurat Dhanteras {selectedYear}</h3>
              <p>
                The most auspicious time to buy gold on Dhanteras {selectedYear} is <strong>{dhanterasInfo?.goldMuhurat}</strong> (morning hours). This timing is calculated based on sunrise, absence of Rahu Kaal, and favorable nakshatra. Purchasing gold, silver, or utensils during this muhurat brings prosperity and wealth throughout the year.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Why Buy Gold on Dhanteras?</h3>
              <p>
                According to Hindu tradition, purchasing gold or silver on Dhanteras invites Goddess Lakshmi's blessings for wealth and prosperity. It's considered 13 times more auspicious than buying on regular days. Even a small purchase (gold coin, silver utensil, or digital gold) fulfills the tradition.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">FAQs - Dhanteras {selectedYear}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-lg">Q: What is the best time to buy gold on Dhanteras {selectedYear}?</h4>
                  <p><strong>A: {dhanterasInfo?.goldMuhurat}</strong> is the most auspicious muhurat for gold purchase on Dhanteras {selectedYear}.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Q: Can I buy silver instead of gold on Dhanteras?</h4>
                  <p><strong>A: Yes!</strong> Silver is an excellent alternative, especially for budget-conscious buyers. Silver muhurat: {dhanterasInfo?.silverMuhurat}.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Q: Is digital gold valid for Dhanteras?</h4>
                  <p><strong>A: Absolutely!</strong> Digital gold from PayTM Money, PhonePe, or Google Pay fulfills Dhanteras tradition and has zero making charges.</p>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                <h3 className="font-bold text-xl mb-4">More Festival Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Link to="/festival-dates" className="text-yellow-600 hover:underline flex items-center">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    All Festival Dates {selectedYear}
                  </Link>
                  <Link to="/festival-finance" className="text-yellow-600 hover:underline flex items-center">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    Festival Budget Calculator
                  </Link>
                  <Link to="/gold-tools" className="text-yellow-600 hover:underline flex items-center">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    Gold Investment Tools
                  </Link>
                  <Link to="/festival-shopping" className="text-yellow-600 hover:underline flex items-center">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    Festival Shopping Planner
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DhanterasDateFinder;

