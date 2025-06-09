import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Moon, Calendar, Calculator, Clock, Gem, Hash, Users, ChevronRight } from 'lucide-react';

export const AstroFinanceInsights: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back</span>
        </button>
      </div>
      
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Astro-Finance Insights Hub</h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          Explore the intersection of astrology and finance with our comprehensive Astro-Finance tools. Discover financial horoscopes, numerology insights, and auspicious timing for financial decisions.
        </p>
      </div>
      
      {/* Hero Section */}
      <div className="cosmic-bg rounded-2xl p-8 md:p-12 mb-16 text-white star-bg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 glow-text">Where Astrology Meets Finance</h2>
            <p className="text-lg mb-6">
              Our Astro-Finance Insights Hub offers a unique perspective where traditional astrological wisdom meets modern financial planning. Discover how cosmic influences might align with your financial decisions and life path.
            </p>
            <p className="text-lg mb-8">
              While we emphasize that financial decisions should always be based on sound financial principles, many in India also consider astrological insights as a complementary perspective.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm">Daily Finance Horoscopes</span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm">Zodiac Compatibility</span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm">Lucky Numbers</span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm">Auspicious Timing</span>
            </div>
            <a 
              href="/astro-finance-insights/daily-horoscope" 
              className="inline-flex items-center bg-white text-purple-800 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors"
            >
              View Today's Financial Horoscope
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-16 -left-16 w-32 h-32 bg-purple-400 rounded-full opacity-20 float"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-indigo-300 rounded-full opacity-20 float-delay-1"></div>
              <div className="cosmic-card p-8 rounded-2xl">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">♌</div>
                  <h3 className="text-2xl font-bold">Leo</h3>
                  <p className="text-sm opacity-80">July 23 - August 22</p>
                </div>
                <p className="mb-6">
                  Today's financial outlook is promising. Jupiter's influence brings opportunities for growth in investments. Consider reviewing your portfolio and making strategic adjustments.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-xs opacity-70">Lucky Number</p>
                    <p className="text-xl font-bold">8</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-xs opacity-70">Favorable Time</p>
                    <p className="text-xl font-bold">2-4 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Tools Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Explore Our Astro-Finance Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Daily Horoscope */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all">
            <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Star className="h-20 w-20 text-white opacity-20" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-purple-900 to-transparent">
                <h3 className="text-xl font-semibold text-white">Daily Financial Horoscope</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-neutral-600 mb-4">
                Get daily financial predictions and guidance based on your zodiac sign. Updated daily with cosmic insights for your money matters.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs">Zodiac</span>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs">Daily</span>
                </div>
                <a 
                  href="/astro-finance-insights/daily-horoscope" 
                  className="text-purple-600 hover:text-purple-800 font-medium flex items-center text-sm"
                >
                  View Horoscope
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Moon Sign Calculator */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all">
            <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Moon className="h-20 w-20 text-white opacity-20" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-blue-900 to-transparent">
                <h3 className="text-xl font-semibold text-white">Moon Sign Calculator</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-neutral-600 mb-4">
                Find your Vedic Moon Sign (Janma Rashi) and discover its influence on your financial tendencies, strengths, and challenges.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">Vedic</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">Personality</span>
                </div>
                <a 
                  href="/astro-finance-insights/moon-sign-calculator" 
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm"
                >
                  Calculate Now
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Muhurat Finder */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all">
            <div className="h-48 bg-gradient-to-br from-green-500 to-green-700 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Clock className="h-20 w-20 text-white opacity-20" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-green-900 to-transparent">
                <h3 className="text-xl font-semibold text-white">Muhurat Finder</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-neutral-600 mb-4">
                Find auspicious times for important financial decisions like investments, business launches, and major purchases.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">Timing</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">Panchang</span>
                </div>
                <a 
                  href="/astro-finance-insights/muhurat-finder" 
                  className="text-green-600 hover:text-green-800 font-medium flex items-center text-sm"
                >
                  Find Muhurat
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Numerology */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all">
            <div className="h-48 bg-gradient-to-br from-pink-500 to-pink-700 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Hash className="h-20 w-20 text-white opacity-20" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-pink-900 to-transparent">
                <h3 className="text-xl font-semibold text-white">Numerology Calculator</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-neutral-600 mb-4">
                Discover your life path number and its financial implications. Learn about lucky numbers for investments and financial decisions.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-pink-100 text-pink-800 rounded-full text-xs">Numbers</span>
                  <span className="px-2 py-0.5 bg-pink-100 text-pink-800 rounded-full text-xs">Destiny</span>
                </div>
                <a 
                  href="/astro-finance-insights/numerology" 
                  className="text-pink-600 hover:text-pink-800 font-medium flex items-center text-sm"
                >
                  Calculate Numbers
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Gemstone Finder */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all">
            <div className="h-48 bg-gradient-to-br from-amber-500 to-amber-700 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Gem className="h-20 w-20 text-white opacity-20" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-amber-900 to-transparent">
                <h3 className="text-xl font-semibold text-white">Gemstone Finder</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-neutral-600 mb-4">
                Find the right gemstones based on your birth chart that may enhance financial prosperity and remove obstacles in your financial path.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs">Gemstones</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs">Prosperity</span>
                </div>
                <a 
                  href="/astro-finance-insights/gemstone-finder" 
                  className="text-amber-600 hover:text-amber-800 font-medium flex items-center text-sm"
                >
                  Find Gemstones
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Zodiac Compatibility */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all">
            <div className="h-48 bg-gradient-to-br from-indigo-500 to-indigo-700 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="h-20 w-20 text-white opacity-20" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-indigo-900 to-transparent">
                <h3 className="text-xl font-semibold text-white">Zodiac Compatibility</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-neutral-600 mb-4">
                Check financial compatibility between different zodiac signs for business partnerships, investments, and financial planning.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs">Relationships</span>
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs">Business</span>
                </div>
                <a 
                  href="/astro-finance-insights/zodiac-compatibility" 
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center text-sm"
                >
                  Check Compatibility
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Zodiac Financial Traits */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Financial Traits by Zodiac Sign</h2>
        
        <div className="zodiac-grid mb-8">
          <a href="/astro-finance-insights/zodiac-traits/aries" className="zodiac-item">
            <div className="text-3xl mb-2">♈</div>
            <span className="font-medium text-neutral-900">Aries</span>
            <span className="text-xs text-neutral-500">Mar 21 - Apr 19</span>
          </a>
          <a href="/astro-finance-insights/zodiac-traits/taurus" className="zodiac-item">
            <div className="text-3xl mb-2">♉</div>
            <span className="font-medium text-neutral-900">Taurus</span>
            <span className="text-xs text-neutral-500">Apr 20 - May 20</span>
          </a>
          <a href="/astro-finance-insights/zodiac-traits/gemini" className="zodiac-item">
            <div className="text-3xl mb-2">♊</div>
            <span className="font-medium text-neutral-900">Gemini</span>
            <span className="text-xs text-neutral-500">May 21 - Jun 20</span>
          </a>
          <a href="/astro-finance-insights/zodiac-traits/cancer" className="zodiac-item">
            <div className="text-3xl mb-2">♋</div>
            <span className="font-medium text-neutral-900">Cancer</span>
            <span className="text-xs text-neutral-500">Jun 21 - Jul 22</span>
          </a>
          <a href="/astro-finance-insights/zodiac-traits/leo" className="zodiac-item">
            <div className="text-3xl mb-2">♌</div>
            <span className="font-medium text-neutral-900">Leo</span>
            <span className="text-xs text-neutral-500">Jul 23 - Aug 22</span>
          </a>
          <a href="/astro-finance-insights/zodiac-traits/virgo" className="zodiac-item">
            <div className="text-3xl mb-2">♍</div>
            <span className="font-medium text-neutral-900">Virgo</span>
            <span className="text-xs text-neutral-500">Aug 23 - Sep 22</span>
          </a>
          <a href="/astro-finance-insights/zodiac-traits/libra" className="zodiac-item">
            <div className="text-3xl mb-2">♎</div>
            <span className="font-medium text-neutral-900">Libra</span>
            <span className="text-xs text-neutral-500">Sep 23 - Oct 22</span>
          </a>
          <a href="/astro-finance-insights/zodiac-traits/scorpio" className="zodiac-item">
            <div className="text-3xl mb-2">♏</div>
            <span className="font-medium text-neutral-900">Scorpio</span>
            <span className="text-xs text-neutral-500">Oct 23 - Nov 21</span>
          </a>
          <a href="/astro-finance-insights/zodiac-traits/sagittarius" className="zodiac-item">
            <div className="text-3xl mb-2">♐</div>
            <span className="font-medium text-neutral-900">Sagittarius</span>
            <span className="text-xs text-neutral-500">Nov 22 - Dec 21</span>
          </a>
          <a href="/astro-finance-insights/zodiac-traits/capricorn" className="zodiac-item">
            <div className="text-3xl mb-2">♑</div>
            <span className="font-medium text-neutral-900">Capricorn</span>
            <span className="text-xs text-neutral-500">Dec 22 - Jan 19</span>
          </a>
          <a href="/astro-finance-insights/zodiac-traits/aquarius" className="zodiac-item">
            <div className="text-3xl mb-2">♒</div>
            <span className="font-medium text-neutral-900">Aquarius</span>
            <span className="text-xs text-neutral-500">Jan 20 - Feb 18</span>
          </a>
          <a href="/astro-finance-insights/zodiac-traits/pisces" className="zodiac-item">
            <div className="text-3xl mb-2">♓</div>
            <span className="font-medium text-neutral-900">Pisces</span>
            <span className="text-xs text-neutral-500">Feb 19 - Mar 20</span>
          </a>
        </div>
        
        <div className="text-center">
          <a 
            href="/astro-finance-insights/zodiac-traits" 
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
          >
            View Detailed Financial Traits for All Zodiac Signs
            <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
      
      {/* Numerology Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Financial Numerology</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="number-card bg-white rounded-xl shadow-md p-6" data-number="1">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Life Path 1</h3>
            <p className="text-neutral-600 mb-4">
              Natural leaders and entrepreneurs. Tend to be innovative with money and take calculated risks. Good at creating wealth through independent ventures.
            </p>
            <a 
              href="/astro-finance-insights/numerology/life-path-1" 
              className="text-purple-600 hover:text-purple-800 font-medium flex items-center text-sm"
            >
              Read More
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="number-card bg-white rounded-xl shadow-md p-6" data-number="2">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Life Path 2</h3>
            <p className="text-neutral-600 mb-4">
              Cooperative and diplomatic with finances. Excel in partnerships and collaborative investments. Patient with long-term financial growth.
            </p>
            <a 
              href="/astro-finance-insights/numerology/life-path-2" 
              className="text-purple-600 hover:text-purple-800 font-medium flex items-center text-sm"
            >
              Read More
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="number-card bg-white rounded-xl shadow-md p-6" data-number="3">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Life Path 3</h3>
            <p className="text-neutral-600 mb-4">
              Creative with financial solutions. May earn through artistic or communication-based ventures. Need to guard against impulsive spending.
            </p>
            <a 
              href="/astro-finance-insights/numerology/life-path-3" 
              className="text-purple-600 hover:text-purple-800 font-medium flex items-center text-sm"
            >
              Read More
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
        
        <div className="text-center">
          <a 
            href="/astro-finance-insights/numerology/all-life-paths" 
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
          >
            Explore All Life Path Numbers and Their Financial Implications
            <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
      
      {/* Gemstones Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Gemstones for Financial Prosperity</h2>
        
        <div className="gemstone-grid mb-8">
          <a href="/astro-finance-insights/gemstones/yellow-sapphire" className="gemstone-item">
            <div className="text-3xl mb-2">💎</div>
            <span className="font-medium text-neutral-900">Yellow Sapphire</span>
            <span className="text-xs text-neutral-500">Jupiter</span>
          </a>
          <a href="/astro-finance-insights/gemstones/emerald" className="gemstone-item">
            <div className="text-3xl mb-2">💎</div>
            <span className="font-medium text-neutral-900">Emerald</span>
            <span className="text-xs text-neutral-500">Mercury</span>
          </a>
          <a href="/astro-finance-insights/gemstones/ruby" className="gemstone-item">
            <div className="text-3xl mb-2">💎</div>
            <span className="font-medium text-neutral-900">Ruby</span>
            <span className="text-xs text-neutral-500">Sun</span>
          </a>
          <a href="/astro-finance-insights/gemstones/pearl" className="gemstone-item">
            <div className="text-3xl mb-2">💎</div>
            <span className="font-medium text-neutral-900">Pearl</span>
            <span className="text-xs text-neutral-500">Moon</span>
          </a>
          <a href="/astro-finance-insights/gemstones/red-coral" className="gemstone-item">
            <div className="text-3xl mb-2">💎</div>
            <span className="font-medium text-neutral-900">Red Coral</span>
            <span className="text-xs text-neutral-500">Mars</span>
          </a>
          <a href="/astro-finance-insights/gemstones/diamond" className="gemstone-item">
            <div className="text-3xl mb-2">💎</div>
            <span className="font-medium text-neutral-900">Diamond</span>
            <span className="text-xs text-neutral-500">Venus</span>
          </a>
        </div>
        
        <div className="text-center">
          <a 
            href="/astro-finance-insights/gemstones/financial-prosperity" 
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
          >
            View All Gemstones for Financial Prosperity
            <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
      
      {/* Muhurat Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Auspicious Timings (Muhurat) for Financial Activities</h2>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">Today's Auspicious Timings</h3>
          
          <table className="w-full muhurat-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Auspicious Time</th>
                <th>Ruling Planet</th>
                <th>Significance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>New Investments</td>
                <td>10:30 AM - 12:00 PM</td>
                <td>Jupiter</td>
                <td>Growth and expansion of wealth</td>
              </tr>
              <tr>
                <td>Signing Contracts</td>
                <td>2:15 PM - 3:45 PM</td>
                <td>Mercury</td>
                <td>Clear communication and favorable terms</td>
              </tr>
              <tr>
                <td>Property Purchase</td>
                <td>9:00 AM - 10:15 AM</td>
                <td>Venus</td>
                <td>Value appreciation and harmony</td>
              </tr>
              <tr>
                <td>Starting Business</td>
                <td>8:15 AM - 9:30 AM</td>
                <td>Sun</td>
                <td>Leadership and success</td>
              </tr>
            </tbody>
          </table>
          
          <div className="text-center mt-6">
            <a 
              href="/astro-finance-insights/muhurat-finder" 
              className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
            >
              Find Auspicious Times for Other Dates
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Nakshatra Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Nakshatras and Financial Decisions</h2>
        
        <div className="nakshatra-list mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Ashwini</h3>
            <p className="text-neutral-600 mb-3">
              Ruled by Ketu. Favorable for quick investments with short-term gains. Good for starting new financial ventures.
            </p>
            <a 
              href="/astro-finance-insights/nakshatra/ashwini" 
              className="text-purple-600 hover:text-purple-800 font-medium flex items-center text-sm"
            >
              Read More
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Bharani</h3>
            <p className="text-neutral-600 mb-3">
              Ruled by Venus. Good for luxury investments and assets that appreciate over time. Favorable for real estate.
            </p>
            <a 
              href="/astro-finance-insights/nakshatra/bharani" 
              className="text-purple-600 hover:text-purple-800 font-medium flex items-center text-sm"
            >
              Read More
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Krittika</h3>
            <p className="text-neutral-600 mb-3">
              Ruled by Sun. Excellent for gold investments and government bonds. Brings clarity to financial decisions.
            </p>
            <a 
              href="/astro-finance-insights/nakshatra/krittika" 
              className="text-purple-600 hover:text-purple-800 font-medium flex items-center text-sm"
            >
              Read More
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
        
        <div className="text-center">
          <a 
            href="/astro-finance-insights/nakshatra/view-all" 
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
          >
            Explore All 27 Nakshatras and Their Financial Influences
            <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
      
      {/* Stock Market Astrology */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Stock Market Astrology</h2>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">Astrological Market Outlook</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-neutral-900 mb-3">Planetary Influences</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-red-700 text-xs">♂️</span>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800">Mars in Aries</p>
                    <p className="text-sm text-neutral-600">Increased volatility expected in technology and energy sectors</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-yellow-700 text-xs">♃</span>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800">Jupiter in Taurus</p>
                    <p className="text-sm text-neutral-600">Favorable for banking, real estate, and consumer goods</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-gray-700 text-xs">♄</span>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800">Saturn in Aquarius</p>
                    <p className="text-sm text-neutral-600">Challenges for traditional industries, opportunities in innovation</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-neutral-900 mb-3">Market Cycles</h4>
              <p className="text-neutral-600 mb-4">
                Astrological market cycles suggest a potential correction in the next lunar month, followed by a strong recovery phase as Jupiter forms a trine with Pluto.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <h5 className="font-medium text-purple-900 mb-2">Key Dates to Watch</h5>
                <ul className="space-y-2 text-sm text-purple-800">
                  <li><strong>July 13-15:</strong> Potential market volatility during Mercury retrograde</li>
                  <li><strong>August 22:</strong> Favorable aspect for financial sector as Venus enters Libra</li>
                  <li><strong>September 7:</strong> Full moon in Pisces may bring clarity to market direction</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="/astro-finance-insights/stock-market/detailed-outlook" 
              className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
            >
              View Detailed Market Outlook
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
        
        <div className="text-center">
          <a 
            href="/astro-finance-insights/stock-market/cycles" 
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
          >
            Learn About Astrological Market Cycles
            <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-16">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-yellow-800">Important Disclaimer</h3>
            <div className="mt-2 text-yellow-700">
              <p>
                The astrological insights provided on this website are for entertainment and cultural interest only. Financial decisions should always be based on sound financial principles, thorough research, and professional advice when needed.
              </p>
              <p className="mt-2">
                While many people find value in considering astrological perspectives as part of their decision-making process, we encourage you to use these insights as complementary information rather than the sole basis for financial choices.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <details className="group bg-white rounded-xl shadow-sm">
            <summary className="flex justify-between items-center cursor-pointer p-6">
              <h3 className="text-lg font-medium text-neutral-900">How can astrology help with financial decisions?</h3>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-6 pt-0 text-neutral-600">
              <p>
                Astrology can provide complementary insights into timing, personal tendencies, and potential opportunities or challenges. Many people use it as one of several factors to consider when making financial decisions. For example, understanding your zodiac sign's approach to money management might help you recognize and work with your natural tendencies, while awareness of auspicious timings might help you plan the execution of already-decided financial moves.
              </p>
              <p className="mt-3">
                However, it's important to remember that astrology should not replace fundamental financial principles, research, or professional advice. It works best as a supplementary perspective rather than the primary decision-making tool.
              </p>
            </div>
          </details>
          
          <details className="group bg-white rounded-xl shadow-sm">
            <summary className="flex justify-between items-center cursor-pointer p-6">
              <h3 className="text-lg font-medium text-neutral-900">What is a financial horoscope?</h3>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-6 pt-0 text-neutral-600">
              <p>
                A financial horoscope is an astrological forecast that focuses specifically on financial matters. It analyzes the positions of planets and their aspects to provide insights into potential financial opportunities, challenges, and optimal timing for money-related decisions. These horoscopes are typically customized based on your zodiac sign and sometimes your specific birth chart.
              </p>
              <p className="mt-3">
                Financial horoscopes may cover areas such as:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Favorable periods for investments or major purchases</li>
                <li>Potential challenges in financial matters</li>
                <li>Career opportunities that may affect income</li>
                <li>General money flow and financial energy</li>
              </ul>
            </div>
          </details>
          
          <details className="group bg-white rounded-xl shadow-sm">
            <summary className="flex justify-between items-center cursor-pointer p-6">
              <h3 className="text-lg font-medium text-neutral-900">What are muhurats and how do they relate to finance?</h3>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-6 pt-0 text-neutral-600">
              <p>
                Muhurats (or muhurtas) are auspicious time periods calculated according to Vedic astrology. They are considered favorable moments to initiate important activities for optimal results. In financial contexts, muhurats are often consulted for:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Starting a new business</li>
                <li>Making significant investments</li>
                <li>Purchasing property or valuable assets</li>
                <li>Signing important financial contracts</li>
                <li>Opening new bank accounts or financial instruments</li>
              </ul>
              <p className="mt-3">
                Muhurats are determined by analyzing various astrological factors including the positions of planets, lunar day (tithi), weekday, and nakshatra (lunar mansion). The goal is to begin activities when cosmic energies are most supportive of the intended outcome.
              </p>
            </div>
          </details>
          
          <details className="group bg-white rounded-xl shadow-sm">
            <summary className="flex justify-between items-center cursor-pointer p-6">
              <h3 className="text-lg font-medium text-neutral-900">How accurate are financial predictions based on astrology?</h3>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-6 pt-0 text-neutral-600">
              <p>
                The accuracy of astrological financial predictions is subjective and varies widely based on individual experiences. While many people find value and patterns that align with astrological insights, these predictions should not be considered deterministic or guaranteed.
              </p>
              <p className="mt-3">
                Several factors affect how relevant astrological insights might be:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>The skill and experience of the astrologer</li>
                <li>The complexity and detail of the analysis (general sun sign horoscopes vs. detailed birth chart analysis)</li>
                <li>Individual differences in how planetary energies manifest</li>
                <li>The role of free will and personal choices</li>
              </ul>
              <p className="mt-3">
                It's best to approach astrological financial insights as one of many tools in your decision-making process, rather than as definitive predictions. Always combine astrological perspectives with sound financial principles, research, and professional advice when making important financial decisions.
              </p>
            </div>
          </details>
          
          <details className="group bg-white rounded-xl shadow-sm">
            <summary className="flex justify-between items-center cursor-pointer p-6">
              <h3 className="text-lg font-medium text-neutral-900">How can I use numerology for financial planning?</h3>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-6 pt-0 text-neutral-600">
              <p>
                Numerology can be used as a complementary tool in financial planning by helping you understand your natural tendencies with money and identifying potentially favorable timing for financial activities. Here are some ways to apply numerology to financial planning:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Life Path Number:</strong> Understand your inherent financial strengths and challenges</li>
                <li><strong>Personal Year Number:</strong> Identify the general energy of the current year for financial activities</li>
                <li><strong>Lucky Numbers:</strong> Consider these for dates to make important financial decisions</li>
                <li><strong>Name Numbers:</strong> For naming businesses or financial ventures</li>
              </ul>
              <p className="mt-3">
                For example, if you're a Life Path 8 (often associated with business acumen and material success), you might leverage your natural abilities in wealth building and management. If you're in a Personal Year 9 (completion and letting go), it might be a better time to settle debts or conclude investments rather than starting new ones.
              </p>
              <p className="mt-3">
                As with astrology, numerology should be used as one of several tools rather than the sole basis for financial decisions.
              </p>
            </div>
          </details>
        </div>
      </div>
      
      {/* Related Tools */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Related Financial Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/calculators/sip-calculator" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Calculator className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">SIP Calculator</h3>
            </div>
            <p className="text-sm text-neutral-600 mb-3">Calculate returns on your systematic investment plans with our powerful SIP calculator.</p>
            <span className="text-sm text-blue-600 font-medium">Calculate Returns</span>
          </a>
          
          <a href="/calculators/gold-investment-calculator" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <Calculator className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Gold Investment Calculator</h3>
            </div>
            <p className="text-sm text-neutral-600 mb-3">Calculate returns on gold investments including physical gold, digital gold, and Sovereign Gold Bonds.</p>
            <span className="text-sm text-amber-600 font-medium">Calculate Returns</span>
          </a>
          
          <a href="/calculators/retirement-calculator" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Calculator className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Retirement Calculator</h3>
            </div>
            <p className="text-sm text-neutral-600 mb-3">Plan your retirement corpus and monthly investments needed to achieve your retirement goals.</p>
            <span className="text-sm text-green-600 font-medium">Plan Retirement</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AstroFinanceInsights;