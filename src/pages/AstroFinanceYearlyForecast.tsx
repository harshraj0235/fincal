import React, { useState } from 'react';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const AstroFinanceYearlyForecast: React.FC = () => {
  const [selectedZodiac, setSelectedZodiac] = useState('Aries');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [forecast, setForecast] = useState<any>(null);

  const yearlyForecasts = {
    Aries: {
      overall: {
        theme: 'Year of Bold Leadership',
        summary: '2025 brings exceptional opportunities for Aries to lead in financial matters. Your natural courage and initiative will be rewarded with significant growth.',
        luckyNumbers: [1, 9, 18, 27],
        luckyColors: ['Red', 'Orange'],
        bestMonths: ['March', 'July', 'November'],
        challengingMonths: ['September', 'December']
      },
      months: {
        January: {
          theme: 'New Beginnings',
          finance: 'Excellent time to start new investments. Consider aggressive growth strategies.',
          career: 'Leadership opportunities arise. Take charge of new projects.',
          advice: 'Be bold but calculated. Your energy will attract success.',
          luckyDay: 15
        },
        February: {
          theme: 'Strategic Planning',
          finance: 'Focus on long-term planning. Review and restructure existing investments.',
          career: 'Time to negotiate better terms and conditions.',
          advice: 'Patience will pay off. Don\'t rush into decisions.',
          luckyDay: 8
        },
        March: {
          theme: 'Peak Performance',
          finance: 'One of your best months for financial gains. High-risk investments may pay off.',
          career: 'Recognition and promotions likely. Your efforts are noticed.',
          advice: 'Capitalize on opportunities. Your confidence will attract success.',
          luckyDay: 21
        },
        April: {
          theme: 'Expansion',
          finance: 'Good time for international investments and expanding business.',
          career: 'New partnerships and collaborations bring growth.',
          advice: 'Think globally. Your adventurous spirit leads to success.',
          luckyDay: 12
        },
        May: {
          theme: 'Communication',
          finance: 'Networking brings financial opportunities. Focus on communication skills.',
          career: 'Presentations and negotiations go well.',
          advice: 'Your words have power. Use them wisely.',
          luckyDay: 5
        },
        June: {
          theme: 'Innovation',
          finance: 'Technology investments and innovative approaches bring success.',
          career: 'Creative solutions are appreciated. Think outside the box.',
          advice: 'Embrace new technologies and methods.',
          luckyDay: 18
        },
        July: {
          theme: 'Peak Success',
          finance: 'Another excellent month for financial gains. High returns possible.',
          career: 'Major achievements and recognition.',
          advice: 'Your leadership shines. Take calculated risks.',
          luckyDay: 23
        },
        August: {
          theme: 'Transformation',
          finance: 'Time to transform your financial approach. Consider new strategies.',
          career: 'Career changes or major shifts bring growth.',
          advice: 'Embrace change. Transformation leads to success.',
          luckyDay: 7
        },
        September: {
          theme: 'Challenges',
          finance: 'Be cautious with investments. Focus on stability over growth.',
          career: 'Patience needed. Avoid conflicts and power struggles.',
          advice: 'Stay grounded. Don\'t make impulsive decisions.',
          luckyDay: 14
        },
        October: {
          theme: 'Recovery',
          finance: 'Financial situation improves. Focus on rebuilding and recovery.',
          career: 'New opportunities arise after challenges.',
          advice: 'Learn from past experiences. Growth comes from challenges.',
          luckyDay: 29
        },
        November: {
          theme: 'Peak Opportunities',
          finance: 'Excellent month for all types of investments and financial gains.',
          career: 'Major career breakthroughs and achievements.',
          advice: 'Your natural leadership brings exceptional success.',
          luckyDay: 11
        },
        December: {
          theme: 'Reflection',
          finance: 'Review and consolidate gains. Plan for the next year.',
          career: 'Time to reflect on achievements and plan future goals.',
          advice: 'Celebrate successes and prepare for new challenges.',
          luckyDay: 25
        }
      }
    },
    Taurus: {
      overall: {
        theme: 'Year of Steady Growth',
        summary: '2025 brings stable and consistent financial growth for Taurus. Your patience and discipline will be rewarded with long-term success.',
        luckyNumbers: [2, 6, 11, 15],
        luckyColors: ['Green', 'Brown'],
        bestMonths: ['May', 'October', 'December'],
        challengingMonths: ['March', 'August']
      },
      months: {
        January: {
          theme: 'Foundation Building',
          finance: 'Focus on building solid financial foundations. Conservative investments work well.',
          career: 'Steady progress in career. Focus on skill development.',
          advice: 'Patience and persistence bring long-term success.',
          luckyDay: 6
        },
        February: {
          theme: 'Value Creation',
          finance: 'Good time for property investments and value-based purchases.',
          career: 'Your worth is recognized. Negotiate for better compensation.',
          advice: 'Focus on creating lasting value in everything you do.',
          luckyDay: 19
        },
        March: {
          theme: 'Challenges',
          finance: 'Be cautious with new investments. Stick to proven strategies.',
          career: 'Avoid conflicts and power struggles. Stay focused on goals.',
          advice: 'Your stability helps you overcome challenges.',
          luckyDay: 8
        },
        April: {
          theme: 'Growth',
          finance: 'Financial situation improves. Consider expanding existing investments.',
          career: 'New opportunities arise. Your reliability is valued.',
          advice: 'Your consistent approach brings steady growth.',
          luckyDay: 22
        },
        May: {
          theme: 'Peak Success',
          finance: 'Excellent month for all financial activities. High returns possible.',
          career: 'Major achievements and recognition for your hard work.',
          advice: 'Your patience and discipline pay off handsomely.',
          luckyDay: 15
        },
        June: {
          theme: 'Stability',
          finance: 'Focus on maintaining and consolidating gains.',
          career: 'Steady progress continues. Build on previous successes.',
          advice: 'Your stable approach brings consistent results.',
          luckyDay: 3
        },
        July: {
          theme: 'Expansion',
          finance: 'Good time to expand investments and explore new opportunities.',
          career: 'Growth opportunities arise. Your experience is valued.',
          advice: 'Expand carefully and methodically.',
          luckyDay: 17
        },
        August: {
          theme: 'Challenges',
          finance: 'Be cautious with new ventures. Focus on protecting existing assets.',
          career: 'Avoid unnecessary risks. Stick to proven methods.',
          advice: 'Your stability helps you weather challenges.',
          luckyDay: 9
        },
        September: {
          theme: 'Recovery',
          finance: 'Financial situation stabilizes. Focus on rebuilding.',
          career: 'New opportunities arise after challenges.',
          advice: 'Your resilience brings recovery and growth.',
          luckyDay: 26
        },
        October: {
          theme: 'Peak Opportunities',
          finance: 'Excellent month for financial gains and new investments.',
          career: 'Major career breakthroughs and achievements.',
          advice: 'Your steady approach brings exceptional success.',
          luckyDay: 12
        },
        November: {
          theme: 'Consolidation',
          finance: 'Focus on consolidating gains and planning for the future.',
          career: 'Build on previous successes and plan next steps.',
          advice: 'Your methodical approach ensures lasting success.',
          luckyDay: 7
        },
        December: {
          theme: 'Peak Success',
          finance: 'Another excellent month for financial activities and gains.',
          career: 'Year ends with major achievements and recognition.',
          advice: 'Your patience and discipline bring year-end success.',
          luckyDay: 21
        }
      }
    }
  };

  const generateForecast = () => {
    const zodiacData = yearlyForecasts[selectedZodiac as keyof typeof yearlyForecasts];
    if (zodiacData) {
      setForecast({
        overall: zodiacData.overall,
        monthly: zodiacData.months[selectedMonth as keyof typeof zodiacData.months]
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-yellow-700 glow-text">2025 Financial Yearly Forecast</h1>
          <p className="text-lg text-neutral-600 mb-6">
            Get your comprehensive 2025 financial forecast with monthly breakdowns and detailed predictions
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">Your Zodiac Sign</label>
              <select 
                value={selectedZodiac} 
                onChange={e => setSelectedZodiac(e.target.value)} 
                className="input w-full"
              >
                {zodiacSigns.map(sign => <option key={sign} value={sign}>{sign}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Select Month</label>
              <select 
                value={selectedMonth} 
                onChange={e => setSelectedMonth(e.target.value)} 
                className="input w-full"
              >
                {months.map(month => <option key={month} value={month}>{month}</option>)}
              </select>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <button onClick={generateForecast} className="astro-finance-btn">Get 2025 Forecast</button>
          </div>
        </div>

        {forecast && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-center text-yellow-700">
                {selectedZodiac} - 2025 Financial Forecast
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 rounded-lg">
                    <h3 className="font-semibold text-purple-700 mb-2">🎯 Year Theme</h3>
                    <p className="text-neutral-700">{forecast.overall.theme}</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
                    <h3 className="font-semibold text-green-700 mb-2">📈 Summary</h3>
                    <p className="text-neutral-700">{forecast.overall.summary}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                      <h4 className="font-semibold text-yellow-700 mb-2">🔢 Lucky Numbers</h4>
                      <p className="text-sm">{forecast.overall.luckyNumbers.join(', ')}</p>
                    </div>
                    
                    <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                      <h4 className="font-semibold text-red-700 mb-2">🎨 Lucky Colors</h4>
                      <p className="text-sm">{forecast.overall.luckyColors.join(', ')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                    <h3 className="font-semibold text-blue-700 mb-2">📅 {selectedMonth} Focus</h3>
                    <p className="text-neutral-700">{forecast.monthly.theme}</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
                    <h3 className="font-semibold text-green-700 mb-2">💰 Finance</h3>
                    <p className="text-neutral-700">{forecast.monthly.finance}</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-lg">
                    <h3 className="font-semibold text-purple-700 mb-2">💼 Career</h3>
                    <p className="text-neutral-700">{forecast.monthly.career}</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                    <h3 className="font-semibold text-yellow-700 mb-2">💡 Advice</h3>
                    <p className="text-neutral-700">{forecast.monthly.advice}</p>
                  </div>
                  
                  <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                    <h3 className="font-semibold text-red-700 mb-2">🍀 Lucky Day</h3>
                    <p className="text-2xl font-bold text-red-600">{forecast.monthly.luckyDay}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">📊 2025 Overview</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">✅ Best Months</h4>
                  <p className="text-neutral-700">{forecast.overall.bestMonths.join(', ')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">⚠️ Challenging Months</h4>
                  <p className="text-neutral-700">{forecast.overall.challengingMonths.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AstroFinanceYearlyForecast; 