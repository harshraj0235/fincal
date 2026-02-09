import React, { useState } from 'react';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const AstroFinanceDailyHoroscope: React.FC = () => {
  const [selectedZodiac, setSelectedZodiac] = useState('Aries');
  const [currentDate] = useState(new Date().toLocaleDateString());

  const dailyHoroscopes = {
    Aries: {
      general: 'Today is excellent for taking financial risks and starting new investments.',
      money: 'Unexpected income may come from old investments or forgotten sources.',
      career: 'Leadership opportunities in financial matters will present themselves.',
      advice: 'Focus on aggressive growth strategies and don\'t hesitate to make bold moves.',
      luckyNumber: 9,
      luckyColor: 'Red'
    },
    Taurus: {
      general: 'Stability in finances today. Focus on long-term planning and secure investments.',
      money: 'Good day for property investments and real estate deals.',
      career: 'Steady progress in career with potential for salary increase.',
      advice: 'Avoid impulsive spending and stick to your budget plan.',
      luckyNumber: 6,
      luckyColor: 'Green'
    },
    Gemini: {
      general: 'Communication skills will help in financial negotiations today.',
      money: 'Income from multiple sources possible through networking.',
      career: 'New business partnerships and collaborations are favorable.',
      advice: 'Use your communication skills to negotiate better deals.',
      luckyNumber: 5,
      luckyColor: 'Yellow'
    },
    Cancer: {
      general: 'Emotional intelligence will guide your financial decisions today.',
      money: 'Family-related financial matters need attention.',
      career: 'Home-based business opportunities may arise.',
      advice: 'Trust your intuition in financial matters but verify facts.',
      luckyNumber: 2,
      luckyColor: 'Silver'
    },
    Leo: {
      general: 'Leadership in financial matters will bring recognition and rewards.',
      money: 'High-profile investments and luxury purchases are favorable.',
      career: 'Promotion or recognition in career is likely.',
      advice: 'Show confidence in financial decisions and take calculated risks.',
      luckyNumber: 1,
      luckyColor: 'Gold'
    },
    Virgo: {
      general: 'Attention to detail will help in financial planning and analysis.',
      money: 'Good day for systematic investments and budget planning.',
      career: 'Analytical skills will be recognized in workplace.',
      advice: 'Focus on organized approach to financial matters.',
      luckyNumber: 5,
      luckyColor: 'Brown'
    },
    Libra: {
      general: 'Balance in financial decisions will lead to harmony and success.',
      money: 'Partnership investments and joint ventures are favorable.',
      career: 'Diplomatic approach will help in career advancement.',
      advice: 'Seek balance between risk and security in investments.',
      luckyNumber: 6,
      luckyColor: 'Pink'
    },
    Scorpio: {
      general: 'Intense focus on financial goals will bring hidden opportunities.',
      money: 'Research-based investments and investigation will pay off.',
      career: 'Strategic planning will lead to career advancement.',
      advice: 'Trust your instincts but do thorough research before investing.',
      luckyNumber: 9,
      luckyColor: 'Maroon'
    },
    Sagittarius: {
      general: 'Optimistic approach to finances will attract opportunities.',
      money: 'Foreign investments and travel-related income possible.',
      career: 'International opportunities may arise in career.',
      advice: 'Think big and consider global investment opportunities.',
      luckyNumber: 3,
      luckyColor: 'Purple'
    },
    Capricorn: {
      general: 'Disciplined approach to finances will bring long-term success.',
      money: 'Traditional investments and government securities are favorable.',
      career: 'Hard work will be recognized and rewarded.',
      advice: 'Focus on systematic and disciplined investment approach.',
      luckyNumber: 8,
      luckyColor: 'Black'
    },
    Aquarius: {
      general: 'Innovative thinking will lead to unique financial opportunities.',
      money: 'Technology investments and unconventional income sources.',
      career: 'Creative solutions will be appreciated in workplace.',
      advice: 'Embrace new technologies and innovative investment ideas.',
      luckyNumber: 4,
      luckyColor: 'Blue'
    },
    Pisces: {
      general: 'Intuitive approach to finances will guide you to success.',
      money: 'Spiritual or artistic investments may bring returns.',
      career: 'Creative talents will be recognized and monetized.',
      advice: 'Trust your intuition but maintain practical approach.',
      luckyNumber: 7,
      luckyColor: 'Sea Green'
    }
  };

  const horoscope = dailyHoroscopes[selectedZodiac as keyof typeof dailyHoroscopes];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-yellow-700 glow-text">Daily Financial Horoscope</h1>
          <p className="text-lg text-neutral-600 mb-6">Your daily financial forecast for {currentDate}</p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Your Zodiac Sign</label>
            <select 
              value={selectedZodiac} 
              onChange={e => setSelectedZodiac(e.target.value)} 
              className="input max-w-xs mx-auto"
            >
              {zodiacSigns.map(sign => <option key={sign} value={sign}>{sign}</option>)}
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {zodiacSigns.map(sign => {
            const signHoroscope = dailyHoroscopes[sign as keyof typeof dailyHoroscopes];
            const isSelected = sign === selectedZodiac;
            
            return (
              <div 
                key={sign}
                className={`cosmic-card p-6 rounded-xl shadow-lg cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-yellow-400 scale-105' : 'hover:scale-102'
                }`}
                onClick={() => setSelectedZodiac(sign)}
              >
                <h3 className="text-xl font-semibold mb-3 text-center">{sign}</h3>
                <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                  {signHoroscope.general}
                </p>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-yellow-600">Lucky: {signHoroscope.luckyNumber}</span>
                  <span className="text-purple-600">Color: {signHoroscope.luckyColor}</span>
                </div>
              </div>
            );
          })}
        </div>

        {horoscope && (
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-yellow-700">
              {selectedZodiac} - Detailed Financial Horoscope
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
                  <h3 className="font-semibold text-green-700 mb-2">💰 Money & Income</h3>
                  <p className="text-neutral-700">{horoscope.money}</p>
                </div>
                
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                  <h3 className="font-semibold text-blue-700 mb-2">💼 Career & Business</h3>
                  <p className="text-neutral-700">{horoscope.career}</p>
                </div>
                
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-lg">
                  <h3 className="font-semibold text-purple-700 mb-2">💡 Financial Advice</h3>
                  <p className="text-neutral-700">{horoscope.advice}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                  <h3 className="font-semibold text-yellow-700 mb-2">🎯 General Outlook</h3>
                  <p className="text-neutral-700">{horoscope.general}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                    <h3 className="font-semibold text-red-700 mb-2">🔢 Lucky Number</h3>
                    <p className="text-2xl font-bold text-red-600">{horoscope.luckyNumber}</p>
                  </div>
                  
                  <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-lg">
                    <h3 className="font-semibold text-indigo-700 mb-2">🎨 Lucky Color</h3>
                    <p className="text-lg font-semibold text-indigo-600">{horoscope.luckyColor}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AstroFinanceDailyHoroscope; 