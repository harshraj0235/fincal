import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, Sun, Home, ChevronRight, Share2, Download,
  ArrowRight, Gift, Mountain, Check, Copy
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Govardhan Puja is 1 day after Diwali
const GOVARDHAN_DATA = {
  2020: { date: '2020-11-15', day: 'Sunday', diwaliDate: '2020-11-14', annakutMuhurat: '06:43 - 08:30', govardhanaPooja: '14:30 - 16:00', sunrise: '06:43', sunset: '17:29' },
  2021: { date: '2021-11-05', day: 'Friday', diwaliDate: '2021-11-04', annakutMuhurat: '06:32 - 08:15', govardhanaPooja: '14:30 - 16:00', sunrise: '06:32', sunset: '17:38' },
  2022: { date: '2022-10-25', day: 'Tuesday', diwaliDate: '2022-10-24', annakutMuhurat: '06:25 - 08:05', govardhanaPooja: '14:30 - 16:00', sunrise: '06:25', sunset: '17:47' },
  2023: { date: '2023-11-13', day: 'Monday', diwaliDate: '2023-11-12', annakutMuhurat: '06:41 - 08:25', govardhanaPooja: '14:30 - 16:00', sunrise: '06:41', sunset: '17:32' },
  2024: { date: '2024-11-02', day: 'Saturday', diwaliDate: '2024-11-01', annakutMuhurat: '06:30 - 08:10', govardhanaPooja: '14:30 - 16:00', sunrise: '06:30', sunset: '17:40' },
  2025: { date: '2025-10-21', day: 'Tuesday', diwaliDate: '2025-10-20', annakutMuhurat: '06:23 - 08:00', govardhanaPooja: '14:30 - 16:00', sunrise: '06:23', sunset: '17:49' },
  2026: { date: '2026-11-09', day: 'Monday', diwaliDate: '2026-11-08', annakutMuhurat: '06:38 - 08:20', govardhanaPooja: '14:30 - 16:00', sunrise: '06:38', sunset: '17:34' },
  2027: { date: '2027-10-30', day: 'Saturday', diwaliDate: '2027-10-29', annakutMuhurat: '06:28 - 08:08', govardhanaPooja: '14:30 - 16:00', sunrise: '06:28', sunset: '17:42' },
  2028: { date: '2028-10-18', day: 'Wednesday', diwaliDate: '2028-10-17', annakutMuhurat: '06:21 - 07:58', govardhanaPooja: '14:30 - 16:00', sunrise: '06:21', sunset: '17:51' },
  2029: { date: '2029-11-06', day: 'Tuesday', diwaliDate: '2029-11-05', annakutMuhurat: '06:35 - 08:17', govardhanaPooja: '14:30 - 16:00', sunrise: '06:35', sunset: '17:36' },
  2030: { date: '2030-10-27', day: 'Sunday', diwaliDate: '2030-10-26', annakutMuhurat: '06:26 - 08:05', govardhanaPooja: '14:30 - 16:00', sunrise: '06:26', sunset: '17:45' },
  2031: { date: '2031-11-15', day: 'Saturday', diwaliDate: '2031-11-14', annakutMuhurat: '06:43 - 08:26', govardhanaPooja: '14:30 - 16:00', sunrise: '06:43', sunset: '17:29' },
  2032: { date: '2032-11-03', day: 'Wednesday', diwaliDate: '2032-11-02', annakutMuhurat: '06:31 - 08:11', govardhanaPooja: '14:30 - 16:00', sunrise: '06:31', sunset: '17:38' },
  2033: { date: '2033-10-24', day: 'Monday', diwaliDate: '2033-10-23', annakutMuhurat: '06:24 - 08:02', govardhanaPooja: '14:30 - 16:00', sunrise: '06:24', sunset: '17:47' },
  2034: { date: '2034-11-12', day: 'Sunday', diwaliDate: '2034-11-11', annakutMuhurat: '06:40 - 08:23', govardhanaPooja: '14:30 - 16:00', sunrise: '06:40', sunset: '17:31' },
  2035: { date: '2035-11-01', day: 'Thursday', diwaliDate: '2035-10-31', annakutMuhurat: '06:29 - 08:09', govardhanaPooja: '14:30 - 16:00', sunrise: '06:29', sunset: '17:41' }
};

const GovardhanPujaFinder: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdownDays, setCountdownDays] = useState(0);

  const years = Array.from({ length: 16 }, (_, i) => 2020 + i);
  const govardhanInfo = GOVARDHAN_DATA[selectedYear as keyof typeof GOVARDHAN_DATA];

  useEffect(() => {
    if (govardhanInfo) {
      const govardhanDate = new Date(govardhanInfo.date);
      const today = new Date();
      const diffTime = govardhanDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setCountdownDays(diffDays);
    }
  }, [govardhanInfo]);

  const shareUrl = `https://moneycal.in/festival-tools/govardhan-puja-finder?year=${selectedYear}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEOHelmet
        title={`Govardhan Puja ${selectedYear} Date - Annakut Muhurat, Krishna Puja Time | Govardhan Parvat Parikrama`}
        description={`Govardhan Puja ${selectedYear} falls on ${govardhanInfo?.day}, ${new Date(govardhanInfo?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}. Get Annakut muhurat (${govardhanInfo?.annakutMuhurat}), Krishna worship time, Govardhan Parvat significance!`}
        keywords={`govardhan puja ${selectedYear} date, govardhan puja ${selectedYear} muhurat, annakut ${selectedYear}, govardhan parvat parikrama, when is govardhan puja ${selectedYear}, govardhan pooja time, annakut celebration ${selectedYear}, govardhan puja rituals, krishna govardhan puja`}
        url={`/festival-tools/govardhan-puja-finder?year=${selectedYear}`}
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-green-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-green-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-dates" className="hover:text-green-600 transition-colors">
                Festival Dates
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-green-600 font-medium">Govardhan Puja</span>
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
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-full mb-6">
                <Mountain className="w-5 h-5" />
                <span className="font-semibold">Annakut Celebration & Krishna Worship</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Govardhan Puja {selectedYear}
              </h1>

              <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto">
                Find exact Govardhan Puja date, Annakut muhurat & Krishna worship timings!
              </p>

              {govardhanInfo && countdownDays > 0 && countdownDays < 365 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-bold text-lg"
                >
                  <Clock className="w-5 h-5" />
                  <span>{countdownDays} days until Govardhan Puja!</span>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-200">
                <div className="bg-gradient-to-r from-green-600 to-teal-600 p-8">
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
                          Govardhan Puja {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {govardhanInfo && (
                  <div className="p-8">
                    <div className="text-center mb-8 pb-8 border-b-2 border-green-100">
                      <div className="inline-flex items-center justify-center space-x-3 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Mountain className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Govardhan Puja {selectedYear}</h2>
                      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                        {new Date(govardhanInfo.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                      </div>
                      <div className="text-2xl text-gray-600 font-semibold">{govardhanInfo.day}</div>
                      <p className="mt-4 text-gray-600">1 day after Diwali {selectedYear} ({govardhanInfo.diwaliDate})</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                            <Gift className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Annakut Muhurat</h3>
                        </div>
                        <p className="text-3xl font-bold text-green-600">{govardhanInfo.annakutMuhurat}</p>
                        <p className="text-sm text-gray-600 mt-2">Food offering time</p>
                      </div>

                      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-2xl border-2 border-teal-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
                            <Mountain className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Govardhan Pooja</h3>
                        </div>
                        <p className="text-3xl font-bold text-teal-600">{govardhanInfo.govardhanaPooja}</p>
                        <p className="text-sm text-gray-600 mt-2">Krishna worship</p>
                      </div>

                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sunrise</h3>
                        </div>
                        <p className="text-3xl font-bold text-orange-600">{govardhanInfo.sunrise}</p>
                        <p className="text-sm text-gray-600 mt-2">Morning rituals</p>
                      </div>

                      <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                            <Sun className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Sunset</h3>
                        </div>
                        <p className="text-3xl font-bold text-red-600">{govardhanInfo.sunset}</p>
                        <p className="text-sm text-gray-600 mt-2">Evening aarti</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      <button
                        onClick={() => window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Govardhan+Puja+${selectedYear}&dates=${govardhanInfo.date.replace(/-/g, '')}/${govardhanInfo.date.replace(/-/g, '')}&details=Annakut+Muhurat:+${govardhanInfo.annakutMuhurat}`, '_blank')}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                      >
                        <Download className="w-5 h-5" />
                        <span>Add to Calendar</span>
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => setShowShareMenu(!showShareMenu)}
                          className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-green-600 text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all"
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

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
                      <h3 className="font-bold text-xl text-gray-900 mb-4">Govardhan Puja Significance</h3>
                      <p className="text-gray-700 mb-4">
                        Govardhan Puja celebrates Lord Krishna lifting Govardhan Hill to protect Vrindavan villagers from Indra's wrath. Annakut (mountain of food) offerings symbolize gratitude for nature's abundance.
                      </p>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">🏔️</span>
                          <span><strong>Govardhan Parvat Parikrama:</strong> Circumambulation brings blessings</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">🍛</span>
                          <span><strong>Annakut Offering:</strong> 56 food items (Chhappan Bhog)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">🐄</span>
                          <span><strong>Gau Puja:</strong> Cow worship for prosperity</span>
                        </li>
                      </ul>
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
                <Link to="/festival-tools/bhai-dooj-date-finder" className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-pink-200">
                  <Gift className="w-10 h-10 text-pink-600 mb-3" />
                  <h4 className="font-bold text-lg mb-2">Bhai Dooj {selectedYear}</h4>
                  <p className="text-gray-600 text-sm">Brother-sister bond</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 prose prose-lg">
            <h2 className="text-3xl font-bold mb-4">Govardhan Puja {selectedYear} - Complete Guide</h2>
            <p className="text-gray-700">
              <strong>Govardhan Puja {selectedYear} is on {govardhanInfo?.day}, {new Date(govardhanInfo?.date || '').toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>, one day after Diwali. This festival commemorates Lord Krishna's divine act of lifting Govardhan Hill.
            </p>
            
            <div className="mt-6 bg-green-50 p-6 rounded-xl">
              <h3 className="font-bold text-xl mb-3">More Festival Tools</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Link to="/festival-dates" className="text-green-600 hover:underline flex items-center">
                  <ArrowRight className="w-4 h-4 mr-1" />
                  All Festival Dates
                </Link>
                <Link to="/religious-tools" className="text-green-600 hover:underline flex items-center">
                  <ArrowRight className="w-4 h-4 mr-1" />
                  Puja Vidhi & Mantras
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GovardhanPujaFinder;

