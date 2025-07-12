import React, { useState } from 'react';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const AstroFinanceHoroscope: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [zodiac, setZodiac] = useState('Aries');
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: Generate a mock horoscope result
    setResult(`Your 2025 financial horoscope for ${zodiac} (DOB: ${birthDate}):\nExpect new opportunities in investments and savings. Favorable periods in Q2 and Q4. Lucky numbers: 3, 7, 21.`);
  };

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 py-12 px-4 flex flex-col items-center">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-yellow-700 glow-text text-center">Personalized Financial Horoscope</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Birth Date</label>
              <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} required className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Zodiac Sign</label>
              <select value={zodiac} onChange={e => setZodiac(e.target.value)} className="input">
                {zodiacSigns.map(sign => <option key={sign} value={sign}>{sign}</option>)}
              </select>
            </div>
            <button type="submit" className="astro-finance-btn w-full">Get My Horoscope</button>
          </form>
          {result && (
            <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <pre className="whitespace-pre-wrap text-neutral-800">{result}</pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AstroFinanceHoroscope; 