import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Star, ChevronRight } from 'lucide-react';

export const DailyHoroscope: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<string>('');
  const [selectedZodiac, setSelectedZodiac] = useState<string | null>(null);
  
  useEffect(() => {
    // Set current date
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(today.toLocaleDateString('en-US', options));
  }, []);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/astro-finance-insights')} 
          className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Astro-Finance Hub</span>
        </button>
      </div>
      
      {/* Hero Section */}
      <section className="cosmic-bg text-white py-12 md:py-16 star-bg rounded-2xl mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Daily Financial Horoscope</h1>
            <p className="text-lg mb-6 text-purple-100">Discover how cosmic energies may influence your financial decisions today</p>
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm">
              <span className="text-white/80">Today's Date:</span>
              <span className="text-white font-medium ml-2" id="current-date">{currentDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Zodiac Selection */}
      <section className="py-12 bg-white rounded-xl shadow-md mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Select Your Zodiac Sign</h2>
            
            <div className="zodiac-grid mb-8">
              <button 
                onClick={() => setSelectedZodiac('aries')}
                className={`zodiac-item ${selectedZodiac === 'aries' ? 'ring-2 ring-purple-500' : ''}`}
              >
                <div className="text-3xl mb-2">♈</div>
                <span className="font-medium text-neutral-900">Aries</span>
                <span className="text-xs text-neutral-500">Mar 21 - Apr 19</span>
              </button>
              <button 
                onClick={() => setSelectedZodiac('taurus')}
                className={`zodiac-item ${selectedZodiac === 'taurus' ? 'ring-2 ring-purple-500' : ''}`}
              >
                <div className="text-3xl mb-2">♉</div>
                <span className="font-medium text-neutral-900">Taurus</span>
                <span className="text-xs text-neutral-500">Apr 20 - May 20</span>
              </button>
              <button 
                onClick={() => setSelectedZodiac('gemini')}
                className={`zodiac-item ${selectedZodiac === 'gemini' ? 'ring-2 ring-purple-500' : ''}`}
              >
                <div className="text-3xl mb-2">♊</div>
                <span className="font-medium text-neutral-900">Gemini</span>
                <span className="text-xs text-neutral-500">May 21 - Jun 20</span>
              </button>
              <button 
                onClick={() => setSelectedZodiac('cancer')}
                className={`zodiac-item ${selectedZodiac === 'cancer' ? 'ring-2 ring-purple-500' : ''}`}
              >
                <div className="text-3xl mb-2">♋</div>
                <span className="font-medium text-neutral-900">Cancer</span>
                <span className="text-xs text-neutral-500">Jun 21 - Jul 22</span>
              </button>
              <button 
                onClick={() => setSelectedZodiac('leo')}
                className={`zodiac-item ${selectedZodiac === 'leo' ? 'ring-2 ring-purple-500' : ''}`}
              >
                <div className="text-3xl mb-2">♌</div>
                <span className="font-medium text-neutral-900">Leo</span>
                <span className="text-xs text-neutral-500">Jul 23 - Aug 22</span>
              </button>
              <button 
                onClick={() => setSelectedZodiac('virgo')}
                className={`zodiac-item ${selectedZodiac === 'virgo' ? 'ring-2 ring-purple-500' : ''}`}
              >
                <div className="text-3xl mb-2">♍</div>
                <span className="font-medium text-neutral-900">Virgo</span>
                <span className="text-xs text-neutral-500">Aug 23 - Sep 22</span>
              </button>
              <button 
                onClick={() => setSelectedZodiac('libra')}
                className={`zodiac-item ${selectedZodiac === 'libra' ? 'ring-2 ring-purple-500' : ''}`}
              >
                <div className="text-3xl mb-2">♎</div>
                <span className="font-medium text-neutral-900">Libra</span>
                <span className="text-xs text-neutral-500">Sep 23 - Oct 22</span>
              </button>
              <button 
                onClick={() => setSelectedZodiac('scorpio')}
                className={`zodiac-item ${selectedZodiac === 'scorpio' ? 'ring-2 ring-purple-500' : ''}`}
              >
                <div className="text-3xl mb-2">♏</div>
                <span className="font-medium text-neutral-900">Scorpio</span>
                <span className="text-xs text-neutral-500">Oct 23 - Nov 21</span>
              </button>
              <button 
                onClick={() => setSelectedZodiac('sagittarius')}
                className={`zodiac-item ${selectedZodiac === 'sagittarius' ? 'ring-2 ring-purple-500' : ''}`}
              >
                <div className="text-3xl mb-2">♐</div>
                <span className="font-medium text-neutral-900">Sagittarius</span>
                <span className="text-xs text-neutral-500">Nov 22 - Dec 21</span>
              </button>
              <button 
                onClick={() => setSelectedZodiac('capricorn')}
                className={`zodiac-item ${selectedZodiac === 'capricorn' ? 'ring-2 ring-purple-500' : ''}`}
              >
                <div className="text-3xl mb-2">♑</div>
                <span className="font-medium text-neutral-900">Capricorn</span>
                <span className="text-xs text-neutral-500">Dec 22 - Jan 19</span>
              </button>
              <button 
                onClick={() => setSelectedZodiac('aquarius')}
                className={`zodiac-item ${selectedZodiac === 'aquarius' ? 'ring-2 ring-purple-500' : ''}`}
              >
                <div className="text-3xl mb-2">♒</div>
                <span className="font-medium text-neutral-900">Aquarius</span>
                <span className="text-xs text-neutral-500">Jan 20 - Feb 18</span>
              </button>
              <button 
                onClick={() => setSelectedZodiac('pisces')}
                className={`zodiac-item ${selectedZodiac === 'pisces' ? 'ring-2 ring-purple-500' : ''}`}
              >
                <div className="text-3xl mb-2">♓</div>
                <span className="font-medium text-neutral-900">Pisces</span>
                <span className="text-xs text-neutral-500">Feb 19 - Mar 20</span>
              </button>
            </div>
            
            {selectedZodiac && (
              <div className="text-center">
                <a 
                  href={`/astro-finance-insights/daily-horoscope/${selectedZodiac}`}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors inline-flex items-center"
                >
                  View {selectedZodiac.charAt(0).toUpperCase() + selectedZodiac.slice(1)} Horoscope
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            )}
            
            <div className="text-center mt-8">
              <p className="text-neutral-600 mb-6">Looking for a longer-term financial outlook?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/astro-finance-insights/weekly-horoscope" className="bg-white border border-purple-200 text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                  Weekly Horoscope
                </a>
                <a href="/astro-finance-insights/monthly-horoscope" className="bg-white border border-purple-200 text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                  Monthly Horoscope
                </a>
                <a href="/astro-finance-insights/yearly-horoscope" className="bg-white border border-purple-200 text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                  Yearly Horoscope
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Horoscope */}
      <section className="py-12 bg-gray-50 rounded-xl mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Today's Featured Financial Horoscope</h2>
            
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="bg-purple-50 rounded-xl p-6 text-center">
                    <div className="text-5xl mb-4">♌</div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">Leo</h3>
                    <p className="text-sm text-neutral-500">July 23 - August 22</p>
                    <div className="mt-4 pt-4 border-t border-purple-100">
                      <p className="text-sm text-purple-700 font-medium">Today's Financial Rating</p>
                      <div className="flex justify-center mt-2">
                        <span className="text-yellow-500">★★★★</span><span className="text-gray-300">★</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">Today's Financial Outlook</h3>
                  <p className="text-neutral-600 mb-4">
                    With Mercury forming a favorable aspect to Jupiter, today is excellent for financial planning and investment research. Your analytical abilities are heightened, making it a good time to review your portfolio or explore new investment opportunities.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 rounded-lg p-3">
                      <h4 className="font-medium text-green-800 mb-1">Favorable For</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Long-term investments</li>
                        <li>• Financial planning</li>
                        <li>• Networking with mentors</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3">
                      <h4 className="font-medium text-red-800 mb-1">Avoid Today</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Impulsive purchases</li>
                        <li>• Lending money to friends</li>
                        <li>• High-risk trading</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-purple-50 rounded-lg px-4 py-2 text-sm">
                      <span className="font-medium text-purple-700">Lucky Number:</span> 8
                    </div>
                    <div className="bg-purple-50 rounded-lg px-4 py-2 text-sm">
                      <span className="font-medium text-purple-700">Lucky Color:</span> Gold
                    </div>
                    <div className="bg-purple-50 rounded-lg px-4 py-2 text-sm">
                      <span className="font-medium text-purple-700">Favorable Time:</span> 2-4 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-8 bg-white rounded-xl shadow-md">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    The financial horoscopes provided are for entertainment and cultural interest only. Financial decisions should always be based on sound financial principles, thorough research, and professional advice when needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DailyHoroscope;