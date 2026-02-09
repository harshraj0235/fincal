import React, { useState } from 'react';

const zodiacTips: Record<string, { tips: string; luckyNumbers: number[] }> = {
  Aries: { tips: 'Focus on aggressive growth funds and SIPs. Best months: March, July.', luckyNumbers: [1, 9, 18] },
  Taurus: { tips: 'Stable investments in gold and real estate. Best months: May, October.', luckyNumbers: [2, 6, 11] },
  Gemini: { tips: 'Diversify with mutual funds and short-term deposits. Best months: June, September.', luckyNumbers: [5, 14, 23] },
  Cancer: { tips: 'Prioritize savings and insurance. Best months: July, November.', luckyNumbers: [7, 16, 25] },
  Leo: { tips: 'Consider stocks and leadership in business. Best months: August, December.', luckyNumbers: [1, 10, 19] },
  Virgo: { tips: 'Systematic planning in SIPs and FDs. Best months: September, January.', luckyNumbers: [3, 8, 17] },
  Libra: { tips: 'Balance between equity and debt. Best months: October, February.', luckyNumbers: [6, 15, 24] },
  Scorpio: { tips: 'Look for hidden opportunities in new sectors. Best months: November, March.', luckyNumbers: [9, 18, 27] },
  Sagittarius: { tips: 'Long-term investments and travel funds. Best months: December, April.', luckyNumbers: [3, 12, 21] },
  Capricorn: { tips: 'Safe investments in PPF and bonds. Best months: January, May.', luckyNumbers: [8, 17, 26] },
  Aquarius: { tips: 'Innovative investments in tech and startups. Best months: February, June.', luckyNumbers: [4, 13, 22] },
  Pisces: { tips: 'Charity and spiritual investments. Best months: March, July.', luckyNumbers: [7, 12, 20] },
};

const zodiacSigns = Object.keys(zodiacTips);

const AstroFinanceZodiacTips: React.FC = () => {
  const [selected, setSelected] = useState('Aries');

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 py-12 px-4 flex flex-col items-center">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-yellow-700 glow-text text-center">Zodiac-Based Investment Tips</h1>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Select Zodiac Sign</label>
          <select value={selected} onChange={e => setSelected(e.target.value)} className="input w-full">
            {zodiacSigns.map(sign => <option key={sign} value={sign}>{sign}</option>)}
          </select>
        </div>
        <div className="p-6 bg-purple-50 border-l-4 border-purple-400 rounded">
          <h2 className="text-xl font-semibold mb-2">Investment Tips for {selected}</h2>
          <p className="mb-2 text-neutral-700">{zodiacTips[selected].tips}</p>
          <div className="text-neutral-800">Lucky Numbers: <span className="font-bold">{zodiacTips[selected].luckyNumbers.join(', ')}</span></div>
        </div>
      </div>
    </div>
  );
};

export default AstroFinanceZodiacTips; 