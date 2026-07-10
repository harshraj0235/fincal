import React, { useState } from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { Star, Calendar, TrendingUp, Moon, Sun, Zap, Shield, Target } from 'lucide-react';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const zodiacSigns = [
  { name: 'Aries', element: 'Fire', ruler: 'Mars', traits: 'Bold, Energetic, Risk-taker' },
  { name: 'Taurus', element: 'Earth', ruler: 'Venus', traits: 'Patient, Practical, Value-conscious' },
  { name: 'Gemini', element: 'Air', ruler: 'Mercury', traits: 'Adaptable, Curious, Quick-thinking' },
  { name: 'Cancer', element: 'Water', ruler: 'Moon', traits: 'Intuitive, Protective, Security-focused' },
  { name: 'Leo', element: 'Fire', ruler: 'Sun', traits: 'Confident, Generous, Leadership-oriented' },
  { name: 'Virgo', element: 'Earth', ruler: 'Mercury', traits: 'Analytical, Detail-oriented, Efficient' },
  { name: 'Libra', element: 'Air', ruler: 'Venus', traits: 'Balanced, Diplomatic, Partnership-focused' },
  { name: 'Scorpio', element: 'Water', ruler: 'Pluto', traits: 'Intense, Strategic, Research-oriented' },
  { name: 'Sagittarius', element: 'Fire', ruler: 'Jupiter', traits: 'Optimistic, Adventurous, Growth-focused' },
  { name: 'Capricorn', element: 'Earth', ruler: 'Saturn', traits: 'Ambitious, Disciplined, Long-term planner' },
  { name: 'Aquarius', element: 'Air', ruler: 'Uranus', traits: 'Innovative, Independent, Future-focused' },
  { name: 'Pisces', element: 'Water', ruler: 'Neptune', traits: 'Intuitive, Compassionate, Creative' }
];

const AstroFinanceHoroscope: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [zodiac, setZodiac] = useState('Aries');
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedZodiac = zodiacSigns.find(z => z.name === zodiac);
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    
    // Generate personalized financial insights based on zodiac
    const insights = generateFinancialInsights(zodiac, month, selectedZodiac);
    setResult(insights);
  };

  const generateFinancialInsights = (sign: string, month: number, zodiacInfo: any) => {
    const baseInsights = {
      'Aries': {
        investment: 'High-risk, high-reward investments align with your bold nature. Consider aggressive growth funds.',
        timing: 'Best investment periods: March-April, September-October',
        advice: 'Channel your energy into research and due diligence before making investment decisions.'
      },
      'Taurus': {
        investment: 'Stable, long-term investments suit your patient nature. Focus on blue-chip stocks and real estate.',
        timing: 'Best investment periods: April-May, October-November',
        advice: 'Your practical approach serves you well in building wealth steadily.'
      },
      'Gemini': {
        investment: 'Diversified portfolio approach matches your adaptable nature. Consider multiple asset classes.',
        timing: 'Best investment periods: May-June, November-December',
        advice: 'Use your curiosity to stay informed about market trends and opportunities.'
      },
      'Cancer': {
        investment: 'Security-focused investments align with your protective nature. Consider bonds and stable funds.',
        timing: 'Best investment periods: June-July, December-January',
        advice: 'Trust your intuition but balance it with thorough research.'
      },
      'Leo': {
        investment: 'Leadership in investment decisions suits your confident nature. Consider being an early adopter.',
        timing: 'Best investment periods: July-August, January-February',
        advice: 'Your generosity can extend to socially responsible investments.'
      },
      'Virgo': {
        investment: 'Analytical approach to investments serves you well. Focus on detailed research and analysis.',
        timing: 'Best investment periods: August-September, February-March',
        advice: 'Your attention to detail helps identify undervalued opportunities.'
      },
      'Libra': {
        investment: 'Balanced portfolio approach matches your diplomatic nature. Consider index funds.',
        timing: 'Best investment periods: September-October, March-April',
        advice: 'Seek professional advice to maintain balance in your investment decisions.'
      },
      'Scorpio': {
        investment: 'Strategic, research-intensive investments align with your intense nature. Consider emerging markets.',
        timing: 'Best investment periods: October-November, April-May',
        advice: 'Your strategic thinking helps identify hidden opportunities.'
      },
      'Sagittarius': {
        investment: 'Growth-oriented investments suit your optimistic nature. Consider international markets.',
        timing: 'Best investment periods: November-December, May-June',
        advice: 'Your adventurous spirit can lead to innovative investment opportunities.'
      },
      'Capricorn': {
        investment: 'Long-term, disciplined investment approach matches your ambitious nature. Consider retirement planning.',
        timing: 'Best investment periods: December-January, June-July',
        advice: 'Your discipline helps maintain consistent investment habits.'
      },
      'Aquarius': {
        investment: 'Innovative, future-focused investments align with your independent nature. Consider technology sector.',
        timing: 'Best investment periods: January-February, July-August',
        advice: 'Your innovative thinking can identify emerging trends early.'
      },
      'Pisces': {
        investment: 'Intuitive, creative investment approach suits your compassionate nature. Consider impact investing.',
        timing: 'Best investment periods: February-March, August-September',
        advice: 'Trust your intuition but ensure its backed by solid research.'
      }
    };

    const insight = baseInsights[sign as keyof typeof baseInsights];
    return `Your 2025 Financial Horoscope for ${sign} (${zodiacInfo.element} Element, Ruled by ${zodiacInfo.ruler})

🎯 Investment Style: ${insight.investment}

📅 Optimal Timing: ${insight.timing}

💡 Financial Advice: ${insight.advice}

🌟 Lucky Numbers: ${generateLuckyNumbers(sign)}
💰 Lucky Colors: ${generateLuckyColors(sign)}
📈 Best Investment Sectors: ${generateInvestmentSectors(sign)}

Remember: This is for entertainment and educational purposes. Always consult with qualified financial advisors for investment decisions.`;
  };

  const generateLuckyNumbers = (sign: string) => {
    const numbers = {
      'Aries': '1, 9, 17, 21',
      'Taurus': '2, 6, 15, 24',
      'Gemini': '3, 7, 12, 18',
      'Cancer': '2, 7, 11, 16',
      'Leo': '1, 4, 10, 22',
      'Virgo': '5, 14, 15, 23',
      'Libra': '6, 7, 15, 24',
      'Scorpio': '8, 11, 18, 22',
      'Sagittarius': '3, 9, 12, 21',
      'Capricorn': '4, 8, 13, 17',
      'Aquarius': '4, 7, 11, 22',
      'Pisces': '3, 7, 12, 16'
    };
    return numbers[sign as keyof typeof numbers] || '1, 7, 11, 22';
  };

  const generateLuckyColors = (sign: string) => {
    const colors = {
      'Aries': 'Red, Orange',
      'Taurus': 'Green, Pink',
      'Gemini': 'Yellow, Light Blue',
      'Cancer': 'Silver, White',
      'Leo': 'Gold, Orange',
      'Virgo': 'Green, Brown',
      'Libra': 'Pink, Light Blue',
      'Scorpio': 'Deep Red, Black',
      'Sagittarius': 'Purple, Blue',
      'Capricorn': 'Brown, Black',
      'Aquarius': 'Electric Blue, Silver',
      'Pisces': 'Sea Green, Purple'
    };
    return colors[sign as keyof typeof colors] || 'Blue, Green';
  };

  const generateInvestmentSectors = (sign: string) => {
    const sectors = {
      'Aries': 'Technology, Sports, Energy',
      'Taurus': 'Real Estate, Agriculture, Luxury Goods',
      'Gemini': 'Media, Communication, Transportation',
      'Cancer': 'Healthcare, Real Estate, Food & Beverage',
      'Leo': 'Entertainment, Luxury, Leadership Training',
      'Virgo': 'Healthcare, Technology, Consulting',
      'Libra': 'Fashion, Beauty, Legal Services',
      'Scorpio': 'Research, Insurance, Deep Tech',
      'Sagittarius': 'Travel, Education, International Markets',
      'Capricorn': 'Infrastructure, Banking, Traditional Industries',
      'Aquarius': 'Technology, Innovation, Social Impact',
      'Pisces': 'Creative Arts, Healthcare, Environmental'
    };
    return sectors[sign as keyof typeof sectors] || 'Technology, Healthcare';
  };

  return (
    <>
      <SEOHelmet
        title="Astro Finance Horoscope - Zodiac-Based Financial Guidance | MoneyCal.in"
        description="Discover how your zodiac sign influences financial decisions. Get personalized investment insights, lucky numbers, and financial guidance based on astrological principles."
        keywords="astro finance, zodiac financial guidance, investment horoscope, financial astrology, money astrology, zodiac investment advice"
        url="/astro-finance-horoscope"
        type="website"
        image="/images/astro-finance.jpg"
        tags={["astrology", "finance", "zodiac", "investment guidance", "financial planning"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Star className="h-12 w-12 text-purple-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Astro Finance Horoscope
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how celestial influences can guide your financial decisions. Get personalized investment insights 
              based on your zodiac sign and astrological principles.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Horoscope Calculator */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Moon className="h-6 w-6 mr-2 text-purple-600" />
                Your Financial Horoscope
              </h2>
              
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Birth Date
                  </label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
            </div>
                
            <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Zap className="h-4 w-4 inline mr-1" />
                    Zodiac Sign
                  </label>
                  <select
                    value={zodiac}
                    onChange={(e) => setZodiac(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {zodiacSigns.map((sign) => (
                      <option key={sign.name} value={sign.name}>
                        {sign.name} ({sign.element})
                      </option>
                    ))}
              </select>
            </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Generate Financial Horoscope
                </button>
          </form>
              
          {result && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-3">Your Financial Insights</h3>
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">{result}</pre>
            </div>
          )}
            </div>

            {/* Educational Content */}
            <div className="space-y-6">
              {/* Zodiac Elements Guide */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Sun className="h-5 w-5 mr-2 text-orange-600" />
                  Zodiac Elements & Finance
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-gray-800">Fire Signs (Aries, Leo, Sagittarius)</h4>
                    <p className="text-sm text-gray-600">Bold, risk-taking investors who prefer high-growth opportunities and innovative ventures.</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-800">Earth Signs (Taurus, Virgo, Capricorn)</h4>
                    <p className="text-sm text-gray-600">Practical, patient investors who prefer stable, long-term investments and tangible assets.</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800">Air Signs (Gemini, Libra, Aquarius)</h4>
                    <p className="text-sm text-gray-600">Intellectual, adaptable investors who prefer diversified portfolios and innovative sectors.</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-800">Water Signs (Cancer, Scorpio, Pisces)</h4>
                    <p className="text-sm text-gray-600">Intuitive, security-focused investors who prefer safe havens and emotionally satisfying investments.</p>
                  </div>
                </div>
              </div>

              {/* Financial Planning Tips */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-600" />
                  Astro-Financial Planning Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <Shield className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Use your zodiac traits to identify your natural investment strengths</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Align investment timing with your zodiac's favorable periods</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Balance astrological insights with fundamental financial analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Calendar className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Consider lunar phases for timing major financial decisions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
            <p className="text-yellow-700 text-sm">
              This astro-financial guidance is provided for entertainment and educational purposes only. 
              Astrological insights should not be the sole basis for financial decisions. Always consult with 
              qualified financial advisors, conduct thorough research, and consider your personal financial 
              situation before making any investment decisions. Past astrological patterns do not guarantee 
              future financial outcomes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AstroFinanceHoroscope; 
