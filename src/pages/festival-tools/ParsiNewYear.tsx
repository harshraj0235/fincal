import React, { useState, useEffect } from 'react';
import { Calendar, Download, Share2, Info, Sparkles, Sun, Moon, Star, Gift } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const ParsiNewYear: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCalendar, setSelectedCalendar] = useState<'fasli' | 'shahenshahi' | 'qadimi'>('fasli');
  const [selectedCity, setSelectedCity] = useState('mumbai');

  // Parsi New Year date calculations
  const getNavrozDates = (year: number) => {
    return {
      fasli: {
        date: new Date(year, 2, 21), // March 21 (Vernal Equinox / Nowruz)
        name: 'Nowruz (Fasli Navroz)',
        description: 'Aligned with vernal equinox - Spring celebration'
      },
      shahenshahi: {
        date: new Date(year, 7, 16), // August 16 (Jamshedi Navroz)
        name: 'Jamshedi Navroz (Shahenshahi)',
        description: 'Traditional Parsi calendar - Most celebrated in India'
      },
      qadimi: {
        date: new Date(year, 7, 17), // August 17 (Qadimi Navroz)
        name: 'Navroz (Qadimi Calendar)',
        description: 'Qadimi/Kadmi calendar variation'
      }
    };
  };

  const navrozDates = getNavrozDates(selectedYear);
  const selectedDate = navrozDates[selectedCalendar];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysUntil = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntil = getDaysUntil(selectedDate.date);

  const downloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MoneyCal//Parsi New Year//EN
BEGIN:VEVENT
UID:navroz-${selectedYear}-${selectedCalendar}@moneycal.in
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${selectedDate.date.toISOString().split('T')[0].replace(/-/g, '')}
SUMMARY:${selectedDate.name}
DESCRIPTION:${selectedDate.description}
LOCATION:India
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Parsi-New-Year-${selectedYear}-${selectedCalendar}.ics`;
    a.click();
  };

  return (
    <>
      <SEOHelmet
        title={`Parsi New Year (Navroz) ${selectedYear} Date - Jamshedi Navroz Calendar | MoneyCal`}
        description={`Find Parsi New Year (Navroz) ${selectedYear} dates for Fasli, Shahenshahi, and Qadimi calendars. Jamshedi Navroz celebration dates, traditions, muhurat times and free calendar download for Mumbai, Pune, Surat.`}
        keywords="Parsi New Year 2025, Navroz 2025 date, Jamshedi Navroz 2025, Parsi calendar 2025, Nowruz India, Zoroastrian New Year, Fasli calendar, Shahenshahi calendar, Qadimi calendar, Parsi New Year Mumbai"
        canonicalUrl={`/festival-tools/parsi-new-year`}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Parsi New Year (Navroz) Date Finder',
          description: 'Find Parsi New Year dates for Fasli, Shahenshahi, and Qadimi calendars',
          applicationCategory: 'LifestyleApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR'
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-12 w-12 mr-4 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                Parsi New Year (Navroz) Finder
              </h1>
              <Sparkles className="h-12 w-12 ml-4 animate-pulse" />
            </div>
            <p className="text-center text-xl text-orange-100 max-w-3xl mx-auto">
              Find Jamshedi Navroz & Nowruz dates for Fasli, Shahenshahi & Qadimi calendars. 
              Download calendar, plan celebrations! 🎉
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Main Calculator Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Year Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg font-semibold"
                >
                  {Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 1 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Calendar Type Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Calendar Type
                </label>
                <select
                  value={selectedCalendar}
                  onChange={(e) => setSelectedCalendar(e.target.value as any)}
                  className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg font-semibold"
                >
                  <option value="fasli">Fasli (Nowruz - March)</option>
                  <option value="shahenshahi">Shahenshahi (Jamshedi - August)</option>
                  <option value="qadimi">Qadimi/Kadmi (August)</option>
                </select>
              </div>

              {/* City Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg font-semibold"
                >
                  <option value="mumbai">Mumbai</option>
                  <option value="pune">Pune</option>
                  <option value="surat">Surat</option>
                  <option value="ahmedabad">Ahmedabad</option>
                  <option value="delhi">Delhi</option>
                </select>
              </div>
            </div>

            {/* Result Display */}
            <div className="bg-gradient-to-br from-orange-100 via-yellow-100 to-pink-100 rounded-2xl p-8 border-4 border-orange-400">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                  <Sun className="h-16 w-16 text-orange-600 mr-3 animate-spin-slow" />
                  <h2 className="text-4xl font-bold text-gray-900">{selectedDate.name}</h2>
                  <Moon className="h-16 w-16 text-blue-600 ml-3" />
                </div>
                
                <div className="bg-white rounded-xl p-6 border-4 border-orange-500 inline-block mb-4">
                  <Calendar className="h-12 w-12 text-orange-600 mx-auto mb-2" />
                  <p className="text-5xl font-bold text-orange-700 mb-2">
                    {selectedDate.date.getDate()}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedDate.date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </p>
                  <p className="text-lg text-gray-600 mt-2">
                    {selectedDate.date.toLocaleDateString('en-IN', { weekday: 'long' })}
                  </p>
                </div>

                <p className="text-xl text-gray-700 mb-4">{selectedDate.description}</p>

                {daysUntil > 0 && (
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl p-4 inline-block">
                    <p className="text-lg font-bold">
                      {daysUntil} days until {selectedDate.name}! 🎉
                    </p>
                  </div>
                )}

                {daysUntil === 0 && (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-4 inline-block animate-bounce">
                    <p className="text-xl font-bold">
                      🎊 Happy Navroz! Today is {selectedDate.name}! 🎊
                    </p>
                  </div>
                )}

                {daysUntil < 0 && (
                  <div className="bg-gray-200 text-gray-700 rounded-xl p-4 inline-block">
                    <p className="text-lg">
                      {selectedDate.name} was {Math.abs(daysUntil)} days ago
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={downloadICS}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center shadow-lg"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Calendar (.ics)
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: `${selectedDate.name} ${selectedYear}`,
                        text: `${selectedDate.name} falls on ${formatDate(selectedDate.date)}`,
                        url: window.location.href
                      });
                    }
                  }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-8 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all flex items-center shadow-lg"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Comparison */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              All {selectedYear} Navroz Dates Comparison
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Fasli */}
              <div className={`rounded-xl p-6 border-4 cursor-pointer transition-all ${selectedCalendar === 'fasli' ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-500 shadow-xl scale-105' : 'bg-gray-50 border-gray-300 hover:border-green-400'}`}
                onClick={() => setSelectedCalendar('fasli')}
              >
                <div className="text-center">
                  <Sun className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Fasli Nowruz</h3>
                  <div className="bg-white rounded-lg p-4 mb-3">
                    <p className="text-3xl font-bold text-green-700">
                      {navrozDates.fasli.date.getDate()}
                    </p>
                    <p className="text-lg text-gray-700">
                      {navrozDates.fasli.date.toLocaleDateString('en-IN', { month: 'long' })}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">Vernal Equinox - Spring celebration</p>
                </div>
              </div>

              {/* Shahenshahi */}
              <div className={`rounded-xl p-6 border-4 cursor-pointer transition-all ${selectedCalendar === 'shahenshahi' ? 'bg-gradient-to-br from-orange-100 to-red-100 border-orange-500 shadow-xl scale-105' : 'bg-gray-50 border-gray-300 hover:border-orange-400'}`}
                onClick={() => setSelectedCalendar('shahenshahi')}
              >
                <div className="text-center">
                  <Star className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Shahenshahi</h3>
                  <div className="bg-white rounded-lg p-4 mb-3">
                    <p className="text-3xl font-bold text-orange-700">
                      {navrozDates.shahenshahi.date.getDate()}
                    </p>
                    <p className="text-lg text-gray-700">
                      {navrozDates.shahenshahi.date.toLocaleDateString('en-IN', { month: 'long' })}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">Most celebrated by Parsis in India</p>
                </div>
              </div>

              {/* Qadimi */}
              <div className={`rounded-xl p-6 border-4 cursor-pointer transition-all ${selectedCalendar === 'qadimi' ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-500 shadow-xl scale-105' : 'bg-gray-50 border-gray-300 hover:border-purple-400'}`}
                onClick={() => setSelectedCalendar('qadimi')}
              >
                <div className="text-center">
                  <Moon className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Qadimi/Kadmi</h3>
                  <div className="bg-white rounded-lg p-4 mb-3">
                    <p className="text-3xl font-bold text-purple-700">
                      {navrozDates.qadimi.date.getDate()}
                    </p>
                    <p className="text-lg text-gray-700">
                      {navrozDates.qadimi.date.toLocaleDateString('en-IN', { month: 'long' })}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">Qadimi calendar variation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Traditions & Celebrations */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-orange-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center">
              <Gift className="h-8 w-8 text-orange-600 mr-3" />
              Navroz Traditions & Celebrations
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-5 border-2 border-orange-300">
                <div className="text-4xl mb-3 text-center">🍽️</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">Parsi Bhonu</h3>
                <p className="text-sm text-gray-600 text-center">
                  Traditional feast with Dhansak, Patra ni Machhi, Sali Boti, Lagan nu Custard
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-green-300">
                <div className="text-4xl mb-3 text-center">🏛️</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">Fire Temple Visit</h3>
                <p className="text-sm text-gray-600 text-center">
                  Pray at Agiary, offer sandalwood, attend Jashan ceremony
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-blue-300">
                <div className="text-4xl mb-3 text-center">👕</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">New Clothes</h3>
                <p className="text-sm text-gray-600 text-center">
                  Wear new traditional attire, dagli, sari, kusti ceremony
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-purple-300">
                <div className="text-4xl mb-3 text-center">🌸</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">Haft-Seen Table</h3>
                <p className="text-sm text-gray-600 text-center">
                  Seven items starting with 'S' - Sabzeh, Samanu, Senjed, Seer, Somāq, Serkeh, Sonbol
                </p>
              </div>
            </div>
          </div>

          {/* Why Dates Differ - Educational Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center mb-6">
              <Info className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">
                Why Do Parsi New Year Dates Differ?
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded">
                <h3 className="font-bold text-lg text-green-900 mb-2">🌱 Fasli Calendar (March 21)</h3>
                <p className="text-gray-700">
                  <strong>Fasli</strong> means "seasonal" - this calendar is aligned with the vernal equinox (first day of spring). 
                  It always falls on or around <strong>March 20-21</strong>, same as Iranian Nowruz. This is the astronomically accurate Zoroastrian New Year.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Celebrated by:</strong> Iranians, some Parsi communities, Fasli followers worldwide
                </p>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded">
                <h3 className="font-bold text-lg text-orange-900 mb-2">🏛️ Shahenshahi Calendar (August 16)</h3>
                <p className="text-gray-700">
                  <strong>Shahenshahi</strong> (also called Shenshai) is the traditional Parsi calendar used in India. 
                  Due to lack of leap year adjustments over centuries, it has drifted and now falls in <strong>mid-August</strong>. 
                  This is called <strong>Jamshedi Navroz</strong> - most widely celebrated by Indian Parsis.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Celebrated by:</strong> Majority of Parsis in Mumbai, Pune, Gujarat
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded">
                <h3 className="font-bold text-lg text-purple-900 mb-2">🌙 Qadimi Calendar (August 17)</h3>
                <p className="text-gray-700">
                  <strong>Qadimi</strong> (or Kadmi) is another variant calendar followed by some Parsi communities. 
                  It's one day after Shahenshahi, usually <strong>August 17</strong>.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Celebrated by:</strong> Some Parsi families, smaller communities
                </p>
              </div>

              <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-400">
                <p className="text-sm text-gray-800">
                  <strong>📚 Learn More:</strong> <a href="https://en.wikipedia.org/wiki/Zoroastrian_calendar" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Zoroastrian Calendar (Wikipedia)</a> | 
                  <a href="https://www.britannica.com/topic/Nowruz" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">Nowruz Festival (Britannica)</a>
                </p>
              </div>
            </div>
          </div>

          {/* Internal Links - Related Tools */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🔗 Related Festival & Financial Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/festival-tools/diwali-muhurat" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Diwali Muhurat Trading</p>
                <p className="text-sm text-gray-600">Auspicious timing for investments</p>
              </a>
              <a href="/festival-tools/holi-calculator" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-pink-200">
                <p className="font-semibold text-pink-600 mb-1">Holi Date Calculator</p>
                <p className="text-sm text-gray-600">Find Holi & Dhuleti dates</p>
              </a>
              <a href="/tools/income-tax-calculator" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Income Tax Calculator</p>
                <p className="text-sm text-gray-600">Plan tax for new financial year</p>
              </a>
              <a href="/learn/credit-cards" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Credit Card Guide</p>
                <p className="text-sm text-gray-600">Learn smart card usage</p>
              </a>
              <a href="/tools/home-loan-calculator" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Home Loan Calculator</p>
                <p className="text-sm text-gray-600">Plan your dream home</p>
              </a>
              <a href="/festival-tools" className="bg-white p-5 rounded-xl hover:shadow-lg transition-all border-2 border-yellow-200">
                <p className="font-semibold text-yellow-600 mb-1">All Festival Tools</p>
                <p className="text-sm text-gray-600">More festival calculators</p>
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "When is Parsi New Year 2025?",
                  a: "Parsi New Year (Jamshedi Navroz - Shahenshahi calendar) is on August 16, 2025. Fasli Nowruz is on March 21, 2025."
                },
                {
                  q: "Why is Navroz celebrated twice?",
                  a: "Different Zoroastrian calendars are followed. Fasli aligns with spring equinox (March), while Shahenshahi (traditional Parsi calendar) has drifted to August due to historical lack of leap year adjustments."
                },
                {
                  q: "What is Jamshedi Navroz?",
                  a: "Jamshedi Navroz is the Parsi New Year celebrated according to the Shahenshahi calendar, typically in mid-August. It's named after the legendary King Jamshid and is the most widely celebrated by Indian Parsis."
                },
                {
                  q: "Which Navroz should I celebrate?",
                  a: "It depends on your family tradition! Most Indian Parsis celebrate Jamshedi Navroz (Shahenshahi - August). Some also celebrate Fasli Nowruz (March). You can celebrate both!"
                },
                {
                  q: "What are Parsi New Year traditions?",
                  a: "Traditions include visiting Fire Temples (Agiary), wearing new clothes, preparing Parsi Bhonu (traditional feast), decorating with flowers, prayers, and spending time with family."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-5 border-2 border-blue-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParsiNewYear;

