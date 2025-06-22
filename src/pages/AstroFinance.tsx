import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import { Star, Moon, Sun, TrendingUp, DollarSign, Calendar, Download, ChevronDown, ChevronUp, Calculator } from 'lucide-react';

interface ZodiacSign {
  name: string;
  element: string;
  dates: string;
  luckyNumbers: number[];
  luckyColors: string[];
  financialStrengths: string[];
  financialChallenges: string[];
  investmentAdvice: string;
  bestInvestmentPeriods: string[];
  moneyMindset: string;
}

const zodiacSigns: ZodiacSign[] = [
  {
    name: 'Aries',
    element: 'Fire',
    dates: 'March 21 - April 19',
    luckyNumbers: [1, 9, 17, 21],
    luckyColors: ['Red', 'Orange', 'Yellow'],
    financialStrengths: ['Risk-taking ability', 'Quick decision making', 'Entrepreneurial spirit'],
    financialChallenges: ['Impulsive spending', 'Overconfidence in investments'],
    investmentAdvice: 'Focus on high-growth stocks and entrepreneurial ventures. Your natural leadership qualities make you excellent at spotting emerging trends.',
    bestInvestmentPeriods: ['March-April', 'July-August', 'November-December'],
    moneyMindset: 'Bold and aggressive - you prefer high-risk, high-reward opportunities'
  },
  {
    name: 'Taurus',
    element: 'Earth',
    dates: 'April 20 - May 20',
    luckyNumbers: [2, 6, 15, 24],
    luckyColors: ['Green', 'Pink', 'Light Blue'],
    financialStrengths: ['Patience in investments', 'Value-oriented approach', 'Long-term planning'],
    financialChallenges: ['Resistance to change', 'Overly conservative approach'],
    investmentAdvice: 'Real estate and stable dividend-paying stocks are your forte. Your patience allows you to build wealth steadily over time.',
    bestInvestmentPeriods: ['April-May', 'August-September', 'December-January'],
    moneyMindset: 'Practical and patient - you prefer stable, long-term investments'
  },
  {
    name: 'Gemini',
    element: 'Air',
    dates: 'May 21 - June 20',
    luckyNumbers: [3, 7, 12, 21],
    luckyColors: ['Yellow', 'Light Green', 'Orange'],
    financialStrengths: ['Versatility in investments', 'Quick learning ability', 'Networking skills'],
    financialChallenges: ['Scattered focus', 'Impulsive decisions'],
    investmentAdvice: 'Diversify your portfolio across different sectors. Your adaptability makes you good at trading and short-term investments.',
    bestInvestmentPeriods: ['May-June', 'September-October', 'January-February'],
    moneyMindset: 'Curious and adaptable - you enjoy learning about new investment opportunities'
  },
  {
    name: 'Cancer',
    element: 'Water',
    dates: 'June 21 - July 22',
    luckyNumbers: [2, 7, 11, 16],
    luckyColors: ['Silver', 'White', 'Pale Blue'],
    financialStrengths: ['Intuitive decision making', 'Family-oriented planning', 'Emotional intelligence'],
    financialChallenges: ['Emotional spending', 'Over-cautious approach'],
    investmentAdvice: 'Focus on family-oriented investments and real estate. Your intuition often guides you to make the right financial decisions.',
    bestInvestmentPeriods: ['June-July', 'October-November', 'February-March'],
    moneyMindset: 'Nurturing and protective - you prioritize family security in financial decisions'
  },
  {
    name: 'Leo',
    element: 'Fire',
    dates: 'July 23 - August 22',
    luckyNumbers: [1, 4, 10, 22],
    luckyColors: ['Gold', 'Orange', 'Red'],
    financialStrengths: ['Natural leadership', 'Confidence in decisions', 'Generous nature'],
    financialChallenges: ['Overspending on luxury', 'Ego-driven investments'],
    investmentAdvice: 'Invest in luxury brands, entertainment, and leadership positions. Your charisma can help you excel in networking for business opportunities.',
    bestInvestmentPeriods: ['July-August', 'November-December', 'March-April'],
    moneyMindset: 'Confident and generous - you enjoy luxury and are willing to invest in quality'
  },
  {
    name: 'Virgo',
    element: 'Earth',
    dates: 'August 23 - September 22',
    luckyNumbers: [5, 14, 15, 23],
    luckyColors: ['Green', 'Brown', 'Navy Blue'],
    financialStrengths: ['Analytical thinking', 'Attention to detail', 'Practical approach'],
    financialChallenges: ['Over-analysis paralysis', 'Perfectionism'],
    investmentAdvice: 'Focus on healthcare, technology, and service-oriented businesses. Your analytical skills help you identify undervalued opportunities.',
    bestInvestmentPeriods: ['August-September', 'December-January', 'April-May'],
    moneyMindset: 'Analytical and practical - you research thoroughly before making financial decisions'
  },
  {
    name: 'Libra',
    element: 'Air',
    dates: 'September 23 - October 22',
    luckyNumbers: [6, 15, 24, 33],
    luckyColors: ['Pink', 'Light Blue', 'Lavender'],
    financialStrengths: ['Balanced approach', 'Diplomatic skills', 'Aesthetic sense'],
    financialChallenges: ['Indecisiveness', 'People-pleasing spending'],
    investmentAdvice: 'Invest in art, fashion, and partnership-based businesses. Your sense of balance helps you maintain diversified portfolios.',
    bestInvestmentPeriods: ['September-October', 'January-February', 'May-June'],
    moneyMindset: 'Balanced and diplomatic - you seek harmony in financial decisions'
  },
  {
    name: 'Scorpio',
    element: 'Water',
    dates: 'October 23 - November 21',
    luckyNumbers: [4, 8, 11, 22],
    luckyColors: ['Deep Red', 'Black', 'Dark Blue'],
    financialStrengths: ['Intense focus', 'Research skills', 'Transformative thinking'],
    financialChallenges: ['Secretive nature', 'All-or-nothing approach'],
    investmentAdvice: 'Focus on research-intensive investments, technology, and transformation industries. Your intensity helps you uncover hidden opportunities.',
    bestInvestmentPeriods: ['October-November', 'February-March', 'June-July'],
    moneyMindset: 'Intense and focused - you prefer deep research and transformative investments'
  },
  {
    name: 'Sagittarius',
    element: 'Fire',
    dates: 'November 22 - December 21',
    luckyNumbers: [3, 9, 12, 21],
    luckyColors: ['Purple', 'Blue', 'Red'],
    financialStrengths: ['Optimistic outlook', 'International perspective', 'Risk tolerance'],
    financialChallenges: ['Over-optimism', 'Lack of follow-through'],
    investmentAdvice: 'Invest in international markets, travel, education, and publishing. Your optimistic nature helps you see opportunities others miss.',
    bestInvestmentPeriods: ['November-December', 'March-April', 'July-August'],
    moneyMindset: 'Optimistic and adventurous - you\'re willing to take calculated risks for growth',
  },
  {
    name: 'Capricorn',
    element: 'Earth',
    dates: 'December 22 - January 19',
    luckyNumbers: [4, 8, 13, 17],
    luckyColors: ['Black', 'Brown', 'Dark Green'],
    financialStrengths: ['Discipline', 'Long-term planning', 'Practical wisdom'],
    financialChallenges: ['Overly conservative', 'Workaholic tendencies'],
    investmentAdvice: 'Focus on traditional investments, real estate, and established businesses. Your discipline ensures steady wealth accumulation.',
    bestInvestmentPeriods: ['December-January', 'April-May', 'August-September'],
    moneyMindset: 'Disciplined and ambitious - you build wealth through consistent, long-term planning'
  },
  {
    name: 'Aquarius',
    element: 'Air',
    dates: 'January 20 - February 18',
    luckyNumbers: [4, 7, 11, 22],
    luckyColors: ['Electric Blue', 'Turquoise', 'Silver'],
    financialStrengths: ['Innovative thinking', 'Humanitarian approach', 'Future-oriented vision'],
    financialChallenges: ['Detached from money', 'Unconventional approach'],
    investmentAdvice: 'Invest in technology, renewable energy, and social impact ventures. Your innovative thinking helps you identify future trends.',
    bestInvestmentPeriods: ['January-February', 'May-June', 'September-October'],
    moneyMindset: 'Innovative and humanitarian - you prefer investments that create positive change'
  },
  {
    name: 'Pisces',
    element: 'Water',
    dates: 'February 19 - March 20',
    luckyNumbers: [3, 7, 12, 16],
    luckyColors: ['Sea Green', 'Purple', 'Pink'],
    financialStrengths: ['Intuitive insights', 'Creative thinking', 'Compassionate approach'],
    financialChallenges: ['Escapist tendencies', 'Emotional decision making'],
    investmentAdvice: 'Focus on creative industries, healthcare, and spiritual wellness. Your intuition often guides you to make the right financial choices.',
    bestInvestmentPeriods: ['February-March', 'June-July', 'October-November'],
    moneyMindset: 'Intuitive and compassionate - you prefer investments that align with your values'
  }
];

const planetaryInfluences = [
  {
    planet: 'Jupiter',
    influence: 'Expansion and growth',
    financialImpact: 'Favorable for investments, business expansion, and wealth accumulation',
    bestPeriods: 'When Jupiter is in fire signs (Aries, Leo, Sagittarius)',
    advice: 'Focus on long-term investments and business growth during Jupiter transits'
  },
  {
    planet: 'Venus',
    influence: 'Values and luxury',
    financialImpact: 'Good for luxury purchases, art investments, and relationship-based business',
    bestPeriods: 'When Venus is in earth signs (Taurus, Virgo, Capricorn)',
    advice: 'Consider investments in luxury goods, real estate, and beauty industries'
  },
  {
    planet: 'Mercury',
    influence: 'Communication and trade',
    financialImpact: 'Excellent for trading, communication-based business, and short-term investments',
    bestPeriods: 'When Mercury is in air signs (Gemini, Libra, Aquarius)',
    advice: 'Focus on trading, technology investments, and communication businesses'
  },
  {
    planet: 'Saturn',
    influence: 'Discipline and structure',
    financialImpact: 'Good for long-term planning, debt management, and conservative investments',
    bestPeriods: 'When Saturn is in earth signs (Taurus, Virgo, Capricorn)',
    advice: 'Focus on debt reduction, long-term investments, and building financial foundations'
  },
  {
    planet: 'Mars',
    influence: 'Energy and action',
    financialImpact: 'Favorable for aggressive investments, sports-related business, and risk-taking',
    bestPeriods: 'When Mars is in fire signs (Aries, Leo, Sagittarius)',
    advice: 'Consider high-risk investments and entrepreneurial ventures'
  }
];

export const AstroFinance: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<string>('Aries');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const selectedZodiac = zodiacSigns.find(sign => sign.name === selectedSign);

  const faqs = [
    {
      question: "Can astrology really predict financial success?",
      answer: "While astrology doesn't guarantee financial success, it can provide insights into your natural money mindset, strengths, and challenges. Combined with practical financial planning, astrological guidance can help you make more informed decisions aligned with your personality traits."
    },
    {
      question: "How do planetary transits affect investment decisions?",
      answer: "Planetary transits can influence market sentiment and individual decision-making patterns. For example, Jupiter transits often coincide with market optimism, while Saturn transits may bring more conservative approaches. However, always combine astrological insights with fundamental and technical analysis."
    },
    {
      question: "Which zodiac signs are naturally good with money?",
      answer: "Each sign has unique financial strengths. Earth signs (Taurus, Virgo, Capricorn) are naturally practical and disciplined with money. Fire signs (Aries, Leo, Sagittarius) are risk-takers who can spot opportunities. Air signs (Gemini, Libra, Aquarius) are analytical and adaptable. Water signs (Cancer, Scorpio, Pisces) are intuitive and value-oriented."
    },
    {
      question: "How can I use my lucky numbers in financial planning?",
      answer: "Lucky numbers can be used as a guide for investment amounts, choosing investment dates, or setting financial goals. However, they should complement, not replace, sound financial planning principles and risk management strategies."
    },
    {
      question: "Is there a best time to start investments based on astrology?",
      answer: "Yes, certain planetary alignments and zodiac periods can be more favorable for starting new investments. For example, new moon phases are good for new beginnings, while full moon phases are better for reviewing and adjusting existing investments."
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Astro Finance: Align Your Wealth with the Stars | 2025 Financial Horoscope"
        description="Discover how astrology influences financial decisions. Get personalized 2025 financial horoscopes, investment timing based on planetary transits, and practical money management tips for each zodiac sign."
        keywords="astro finance, financial horoscope 2025, zodiac money advice, astrology investment timing, planetary transits finance, lucky numbers investment, moon phases money, financial astrology India"
        image="https://images.pexels.com/photos/7947662/pexels-photo-7947662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        url="/astro-finance"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-20 right-20 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-purple-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-yellow-500 mr-3" />
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                  Astro Finance
                </h1>
                <Star className="h-8 w-8 text-yellow-500 ml-3" />
              </div>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto">
                Align Your Wealth with the Stars: Personalized Financial Guidance Based on Your Zodiac Sign
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="#zodiac-guide" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
                >
                  Get Your Financial Horoscope
                </Link>
                <Link 
                  to="#planetary-guide" 
                  className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-lg border border-purple-200"
                >
                  Planetary Investment Guide
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
                <div className="text-gray-600">Zodiac Signs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
                <div className="text-gray-600">Major Planets</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">365</div>
                <div className="text-gray-600">Daily Insights</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">2025</div>
                <div className="text-gray-600">Financial Forecast</div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Astro Finance Section */}
        <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What is Astro Finance?
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto">
                Astro Finance combines ancient astrological wisdom with modern financial planning to help you make better money decisions. 
                By understanding your zodiac sign's natural money mindset and planetary influences, you can align your financial strategy 
                with cosmic energies for optimal results.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Zodiac-Based Guidance</h3>
                <p className="text-gray-600 text-center">
                  Discover your natural money personality based on your zodiac sign. Learn your financial strengths, challenges, and optimal investment strategies.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Planetary Timing</h3>
                <p className="text-gray-600 text-center">
                  Understand how planetary movements affect financial markets and your personal investment decisions. Time your investments with cosmic cycles.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Calculator className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Practical Tools</h3>
                <p className="text-gray-600 text-center">
                  Access Excel templates and calculators that combine astrological insights with practical financial planning for real results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Zodiac Financial Guide */}
        <section id="zodiac-guide" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                2025 Financial Horoscope by Zodiac Sign
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Discover your personalized financial guidance for 2025. Each zodiac sign has unique money traits and investment opportunities.
              </p>
            </div>

            {/* Zodiac Sign Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
              {zodiacSigns.map((sign) => (
                <button
                  key={sign.name}
                  onClick={() => setSelectedSign(sign.name)}
                  className={`p-4 rounded-lg text-center transition-all ${
                    selectedSign === sign.name
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <div className="font-semibold">{sign.name}</div>
                  <div className="text-sm opacity-75">{sign.dates.split(' ')[0]}</div>
                </button>
              ))}
            </div>

            {/* Selected Sign Details */}
            {selectedZodiac && (
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 shadow-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {selectedZodiac.name} Financial Profile
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Element: {selectedZodiac.element}</h4>
                        <p className="text-gray-600">Dates: {selectedZodiac.dates}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Lucky Numbers</h4>
                        <div className="flex gap-2">
                          {selectedZodiac.luckyNumbers.map((num) => (
                            <span key={num} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                              {num}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Lucky Colors</h4>
                        <div className="flex gap-2">
                          {selectedZodiac.luckyColors.map((color) => (
                            <span key={color} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Money Mindset</h4>
                    <p className="text-gray-600 mb-4">{selectedZodiac.moneyMindset}</p>
                    
                    <h4 className="font-semibold text-gray-800 mb-2">Investment Advice</h4>
                    <p className="text-gray-600 mb-4">{selectedZodiac.investmentAdvice}</p>
                    
                    <h4 className="font-semibold text-gray-800 mb-2">Best Investment Periods</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedZodiac.bestInvestmentPeriods.map((period) => (
                        <span key={period} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {period}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Financial Strengths</h4>
                    <ul className="space-y-1">
                      {selectedZodiac.financialStrengths.map((strength) => (
                        <li key={strength} className="text-gray-600 flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Financial Challenges</h4>
                    <ul className="space-y-1">
                      {selectedZodiac.financialChallenges.map((challenge) => (
                        <li key={challenge} className="text-gray-600 flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Planetary Influences Section */}
        <section id="planetary-guide" className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Planetary Influences on Financial Markets
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Understand how planetary movements affect investment opportunities and market sentiment. 
                Time your financial decisions with cosmic cycles for better results.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planetaryInfluences.map((planet) => (
                <div key={planet.planet} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{planet.planet}</h3>
                      <p className="text-sm text-gray-600">{planet.influence}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">Financial Impact</h4>
                      <p className="text-gray-600 text-sm">{planet.financialImpact}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">Best Periods</h4>
                      <p className="text-gray-600 text-sm">{planet.bestPeriods}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">Investment Advice</h4>
                      <p className="text-gray-600 text-sm">{planet.advice}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Moon Phases and Money Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Moon Phases and Money Management
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Harness the power of lunar cycles for better financial planning and decision-making.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl text-center">
                <Moon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">New Moon</h3>
                <p className="text-gray-700 text-sm">
                  Perfect time to start new investments, set financial goals, and begin new money habits.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl text-center">
                <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Waxing Moon</h3>
                <p className="text-gray-700 text-sm">
                  Ideal for growing investments, expanding business, and increasing income streams.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-xl text-center">
                <Sun className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Full Moon</h3>
                <p className="text-gray-700 text-sm">
                  Time to review investments, collect returns, and make important financial decisions.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-xl text-center">
                <DollarSign className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Waning Moon</h3>
                <p className="text-gray-700 text-sm">
                  Focus on debt reduction, cutting expenses, and consolidating financial resources.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Downloadable Tools Section */}
        <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Astro Finance Tools & Templates
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Download practical Excel templates that combine astrological insights with financial planning.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Download className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Astro Investment Tracker</h3>
                <p className="text-gray-600 mb-4">
                  Track your investments based on zodiac periods and planetary transits. Includes lucky number calculations and timing recommendations.
                </p>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  Download Template
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Lunar Financial Calendar</h3>
                <p className="text-gray-600 mb-4">
                  Plan your financial activities around moon phases. Includes best days for investments, debt payments, and financial planning.
                </p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Download Template
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Calculator className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Zodiac Budget Planner</h3>
                <p className="text-gray-600 mb-4">
                  Personalized budget template based on your zodiac sign's money personality. Includes spending categories aligned with your natural tendencies.
                </p>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Download Template
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-700">
                Common questions about combining astrology with financial planning
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    {expandedFAQ === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Your Astro Finance Journey Today
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Combine cosmic wisdom with practical financial planning for better results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/calculators/emi-calculator" 
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all"
              >
                Try Our EMI Calculator
              </Link>
              <Link 
                to="/calculators/sip-calculator" 
                className="bg-purple-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-900 transition-all"
              >
                Plan Your Investments
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}; 