import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, Sun, Home, ChevronRight, Share2, Download,
  ArrowRight, Gift, Heart, Check, Copy
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Bhai Dooj is 2 days after Diwali
const BHAI_DOOJ_DATA = {
  2020: { date: '2020-11-16', day: 'Monday', diwaliDate: '2020-11-14', tikaMuhurat: '13:10 - 15:22', aparahna: '13:10 - 15:22', sunrise: '06:44', sunset: '17:29' },
  2021: { date: '2021-11-06', day: 'Saturday', diwaliDate: '2021-11-04', tikaMuhurat: '13:12 - 15:24', aparahna: '13:12 - 15:24', sunrise: '06:33', sunset: '17:38' },
  2022: { date: '2022-10-26', day: 'Wednesday', diwaliDate: '2022-10-24', tikaMuhurat: '13:16 - 15:30', aparahna: '13:16 - 15:30', sunrise: '06:26', sunset: '17:47' },
  2023: { date: '2023-11-14', day: 'Tuesday', diwaliDate: '2023-11-12', tikaMuhurat: '13:10 - 15:21', aparahna: '13:10 - 15:21', sunrise: '06:42', sunset: '17:32' },
  2024: { date: '2024-11-03', day: 'Sunday', diwaliDate: '2024-11-01', tikaMuhurat: '13:13 - 15:26', aparahna: '13:13 - 15:26', sunrise: '06:31', sunset: '17:40' },
  2025: { date: '2025-10-22', day: 'Wednesday', diwaliDate: '2025-10-20', tikaMuhurat: '13:18 - 15:32', aparahna: '13:18 - 15:32', sunrise: '06:24', sunset: '17:49' },
  2026: { date: '2026-11-10', day: 'Tuesday', diwaliDate: '2026-11-08', tikaMuhurat: '13:11 - 15:22', aparahna: '13:11 - 15:22', sunrise: '06:39', sunset: '17:34' },
  2027: { date: '2027-10-31', day: 'Sunday', diwaliDate: '2027-10-29', tikaMuhurat: '13:15 - 15:28', aparahna: '13:15 - 15:28', sunrise: '06:29', sunset: '17:42' },
  2028: { date: '2028-10-19', day: 'Thursday', diwaliDate: '2028-10-17', tikaMuhurat: '13:19 - 15:34', aparahna: '13:19 - 15:34', sunrise: '06:22', sunset: '17:51' },
  2029: { date: '2029-11-07', day: 'Wednesday', diwaliDate: '2029-11-05', tikaMuhurat: '13:12 - 15:24', aparahna: '13:12 - 15:24', sunrise: '06:36', sunset: '17:36' },
  2030: { date: '2030-10-28', day: 'Monday', diwaliDate: '2030-10-26', tikaMuhurat: '13:16 - 15:29', aparahna: '13:16 - 15:29', sunrise: '06:27', sunset: '17:45' },
  2031: { date: '2031-11-16', day: 'Sunday', diwaliDate: '2031-11-14', tikaMuhurat: '13:10 - 15:21', aparahna: '13:10 - 15:21', sunrise: '06:44', sunset: '17:29' },
  2032: { date: '2032-11-04', day: 'Thursday', diwaliDate: '2032-11-02', tikaMuhurat: '13:13 - 15:25', aparahna: '13:13 - 15:25', sunrise: '06:32', sunset: '17:38' },
  2033: { date: '2033-10-25', day: 'Tuesday', diwaliDate: '2033-10-23', tikaMuhurat: '13:17 - 15:31', aparahna: '13:17 - 15:31', sunrise: '06:25', sunset: '17:47' },
  2034: { date: '2034-11-13', day: 'Monday', diwaliDate: '2034-11-11', tikaMuhurat: '13:11 - 15:22', aparahna: '13:11 - 15:22', sunrise: '06:41', sunset: '17:31' },
  2035: { date: '2035-11-02', day: 'Friday', diwaliDate: '2035-10-31', tikaMuhurat: '13:14 - 15:27', aparahna: '13:14 - 15:27', sunrise: '06:30', sunset: '17:41' }
};

const BhaiDoojDateFinder: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdownDays, setCountdownDays] = useState(0);

  const years = Array.from({ length: 16 }, (_, i) => 2020 + i);
  const bhaiDoojInfo = BHAI_DOOJ_DATA[selectedYear as keyof typeof BHAI_DOOJ_DATA];

  useEffect(() => {
    if (bhaiDoojInfo) {
      const bhaiDoojDate = new Date(bhaiDoojInfo.date);
      const today = new Date();
      const diffTime = bhaiDoojDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setCountdownDays(diffDays);
    }
  }, [bhaiDoojInfo]);

  const shareUrl = `/festival-tools/bhai-dooj-date-finder?year=${selectedYear}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEOHelmet
        title={`Bhai Dooj ${selectedYear} Date - Tikka Muhurat, Brother Sister Celebration Time | Yama Dwitiya`}
        description={`Bhai Dooj ${selectedYear} falls on ${bhaiDoojInfo?.day}, ${new Date(bhaiDoojInfo?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}. Get tikka muhurat (${bhaiDoojInfo?.tikaMuhurat}), Aparahna time, gift ideas for brother-sister celebration!`}
        keywords={`bhai dooj ${selectedYear} date, bhai dooj ${selectedYear} muhurat, tikka time bhai dooj, when is bhai dooj ${selectedYear}, yama dwitiya ${selectedYear}, bhai dooj gifts, bhai tika ${selectedYear}, brother sister day india, bhai phota ${selectedYear}, bhau beej ${selectedYear}`}
        url={`/festival-tools/bhai-dooj-date-finder?year=${selectedYear}`}
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-pink-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-pink-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-dates" className="hover:text-pink-600 transition-colors">
                Festival Dates
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-pink-600 font-medium">Bhai Dooj Date</span>
            </div>
          </div>
        </div>

        <section className="relative py-12">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-red-600 text-white px-6 py-2 rounded-full mb-6">
                <Heart className="w-5 h-5" />
                <span className="font-semibold">Brother-Sister Bond Celebration</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent">
                Bhai Dooj {selectedYear} Date
              </h1>

              <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto">
                Find exact Bhai Dooj date, tikka muhurat & auspicious timing for brother-sister celebration!
              </p>

              {bhaiDoojInfo && countdownDays > 0 && countdownDays < 365 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center space-x-2 bg-pink-100 text-pink-800 px-6 py-3 rounded-full font-bold text-lg"
                >
                  <Clock className="w-5 h-5" />
                  <span>{countdownDays} days until Bhai Dooj!</span>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-200">
                <div className="bg-gradient-to-r from-pink-600 to-red-600 p-8">
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
                          Bhai Dooj {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {bhaiDoojInfo && (
                  <div className="p-8">
                    <div className="text-center mb-8 pb-8 border-b-2 border-pink-100">
                      <div className="inline-flex items-center justify-center space-x-3 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Heart className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Bhai Dooj {selectedYear}</h2>
                      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
                        {new Date(bhaiDoojInfo.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                      </div>
                      <div className="text-2xl text-gray-600 font-semibold">{bhaiDoojInfo.day}</div>
                      <p className="mt-4 text-gray-600">2 days after Diwali {selectedYear} ({bhaiDoojInfo.diwaliDate})</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-2xl border-2 border-pink-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Tikka Muhurat</h3>
                        </div>
                        <p className="text-3xl font-bold text-pink-600">{bhaiDoojInfo.tikaMuhurat}</p>
                        <p className="text-sm text-gray-600 mt-2">Most auspicious time</p>
                      </div>

                      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl border-2 border-red-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                            <Clock className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Aparahna Time</h3>
                        </div>
                        <p className="text-3xl font-bold text-red-600">{bhaiDoojInfo.aparahna}</p>
                        <p className="text-sm text-gray-600 mt-2">Afternoon period</p>
                      </div>

                      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl border-2 border-orange-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sunrise</h3>
                        </div>
                        <p className="text-3xl font-bold text-orange-600">{bhaiDoojInfo.sunrise}</p>
                        <p className="text-sm text-gray-600 mt-2">Morning rituals</p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sunset</h3>
                        </div>
                        <p className="text-3xl font-bold text-purple-600">{bhaiDoojInfo.sunset}</p>
                        <p className="text-sm text-gray-600 mt-2">Evening prayers</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      <button
                        onClick={() => window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Bhai+Dooj+${selectedYear}&dates=${bhaiDoojInfo.date.replace(/-/g, '')}/${bhaiDoojInfo.date.replace(/-/g, '')}&details=Tikka+Muhurat:+${bhaiDoojInfo.tikaMuhurat}`, '_blank')}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-red-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                      >
                        <Download className="w-5 h-5" />
                        <span>Add to Calendar</span>
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => setShowShareMenu(!showShareMenu)}
                          className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-pink-600 text-pink-600 rounded-xl font-bold hover:bg-pink-50 transition-all"
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

                    <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-2xl border-2 border-pink-200">
                      <h3 className="font-bold text-xl text-gray-900 mb-4">Bhai Dooj Gift Ideas {selectedYear}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">For Brothers:</h4>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Sweets & Dry Fruits</li>
                            <li>• Personalized Gifts</li>
                            <li>• Gadgets & Accessories</li>
                            <li>• Clothing & Watches</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">For Sisters:</h4>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Jewelry & Accessories</li>
                            <li>• Sarees & Dress Materials</li>
                            <li>• Beauty Products</li>
                            <li>• Gift Cards & Cash</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Link to="/festival-shopping" className="text-pink-600 hover:underline font-semibold flex items-center">
                          <ArrowRight className="w-4 h-4 mr-1" />
                          Festival Gift Ideas & Shopping Planner
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <div className="mt-12 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-6">Related Festival Dates {selectedYear}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/festival-tools/dhanteras-date-finder" className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-yellow-200">
                  <Gift className="w-10 h-10 text-yellow-600 mb-3" />
                  <h4 className="font-bold text-lg mb-2">Dhanteras {selectedYear}</h4>
                  <p className="text-gray-600 text-sm">Gold purchase muhurat</p>
                </Link>
                <Link to="/festival-tools/diwali-date-finder" className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-orange-200">
                  <Gift className="w-10 h-10 text-orange-600 mb-3" />
                  <h4 className="font-bold text-lg mb-2">Diwali {selectedYear}</h4>
                  <p className="text-gray-600 text-sm">Lakshmi Puja muhurat</p>
                </Link>
                <Link to="/festival-tools/govardhan-puja-finder" className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-green-200">
                  <Gift className="w-10 h-10 text-green-600 mb-3" />
                  <h4 className="font-bold text-lg mb-2">Govardhan Puja {selectedYear}</h4>
                  <p className="text-gray-600 text-sm">Annakut celebration</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 prose prose-lg">
            <h2 className="text-3xl font-bold mb-4">Bhai Dooj {selectedYear} - Complete Guide</h2>
            <p className="text-gray-700">
              <strong>Bhai Dooj {selectedYear} is on {bhaiDoojInfo?.day}, {new Date(bhaiDoojInfo?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>, two days after Diwali. Also known as Yama Dwitiya, Bhai Tika, or Bhau Beej, this festival celebrates the sacred bond between brothers and sisters.
            </p>

            <h3 className="text-2xl font-bold mt-6 mb-3">Bhai Dooj Tikka Muhurat {selectedYear}</h3>
            <p className="text-gray-700">
              The most auspicious time for applying tikka is <strong>{bhaiDoojInfo?.tikaMuhurat}</strong> (Aparahna period). Sisters apply tilak on brother's forehead and pray for their long life and prosperity, while brothers give gifts and promise protection.
            </p>

            <div className="mt-6 bg-pink-50 p-6 rounded-xl">
              <h3 className="font-bold text-xl mb-3">More Festival Tools</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Link to="/festival-dates" className="text-pink-600 hover:underline flex items-center">
                  <ArrowRight className="w-4 h-4 mr-1" />
                  All Festival Dates
                </Link>
                <Link to="/festival-shopping" className="text-pink-600 hover:underline flex items-center">
                  <ArrowRight className="w-4 h-4 mr-1" />
                  Gift Ideas & Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BhaiDoojDateFinder;

