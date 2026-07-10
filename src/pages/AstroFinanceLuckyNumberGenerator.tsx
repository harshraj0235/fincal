import React, { useState } from 'react';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const AstroFinanceLuckyNumberGenerator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [zodiac, setZodiac] = useState('Aries');
  const [purpose, setPurpose] = useState('investment');
  const [luckyNumbers, setLuckyNumbers] = useState<number[]>([]);

  const generateLuckyNumbers = () => {
    const baseNumbers = {
      Aries: [1, 9, 18, 27],
      Taurus: [2, 6, 11, 15],
      Gemini: [5, 14, 23, 32],
      Cancer: [7, 16, 25, 34],
      Leo: [1, 10, 19, 28],
      Virgo: [3, 8, 17, 26],
      Libra: [6, 15, 24, 33],
      Scorpio: [9, 18, 27, 36],
      Sagittarius: [3, 12, 21, 30],
      Capricorn: [8, 17, 26, 35],
      Aquarius: [4, 13, 22, 31],
      Pisces: [7, 12, 20, 29]
    };

    const purposeMultipliers = {
      investment: 1,
      'stock-picking': 2,
      'mutual-fund': 3,
      'real-estate': 4,
      'gold-investment': 5,
      'business-decision': 6
    };

    const base = baseNumbers[zodiac as keyof typeof baseNumbers] || [1, 2, 3, 4];
    const multiplier = purposeMultipliers[purpose as keyof typeof purposeMultipliers] || 1;
    
    const generated = base.map(num => {
      const adjusted = (num * multiplier) % 100;
      return adjusted === 0 ? 1 : adjusted;
    });

    setLuckyNumbers(generated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 py-12 px-4 flex flex-col items-center">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-yellow-700 glow-text text-center">Lucky Number Generator</h1>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Birth Date</label>
            <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Zodiac Sign</label>
            <select value={zodiac} onChange={e => setZodiac(e.target.value)} className="input">
              {zodiacSigns.map(sign => <option key={sign} value={sign}>{sign}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Purpose</label>
            <select value={purpose} onChange={e => setPurpose(e.target.value)} className="input">
              <option value="investment">General Investment</option>
              <option value="stock-picking">Stock Picking</option>
              <option value="mutual-fund">Mutual Fund Selection</option>
              <option value="real-estate">Real Estate</option>
              <option value="gold-investment">Gold Investment</option>
              <option value="business-decision">Business Decision</option>
            </select>
          </div>
          <button onClick={generateLuckyNumbers} className="astro-finance-btn w-full">Generate Lucky Numbers</button>
        </div>
        {luckyNumbers.length > 0 && (
          <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <h2 className="text-xl font-semibold mb-4">Your Lucky Numbers for {purpose.replace('-', ' ')}</h2>
            <div className="grid grid-cols-2 gap-4">
              {luckyNumbers.map((num, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-3xl font-bold text-yellow-600">{num}</div>
                  <div className="text-sm text-neutral-600">Lucky #{index + 1}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-neutral-700">
              Use these numbers for investment amounts, dates, or as guidance for financial decisions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AstroFinanceLuckyNumberGenerator; 
