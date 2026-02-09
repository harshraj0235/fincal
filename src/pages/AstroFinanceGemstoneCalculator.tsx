import React, { useState } from 'react';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const AstroFinanceGemstoneCalculator: React.FC = () => {
  const [zodiac, setZodiac] = useState('Aries');
  const [birthDate, setBirthDate] = useState('');
  const [financialGoal, setFinancialGoal] = useState('wealth');
  const [result, setResult] = useState<{
    primaryGemstone: string;
    secondaryGemstone: string;
    wearingInstructions: string;
    benefits: string[];
    bestDays: string[];
    priceRange: string;
  } | null>(null);

  const calculateGemstone = () => {
    const gemstoneData = {
      Aries: {
        primary: 'Red Coral (Moonga)',
        secondary: 'Ruby',
        instructions: 'Wear on ring finger of right hand on Tuesday morning',
        benefits: ['Increases courage and leadership', 'Boosts business success', 'Enhances decision-making'],
        bestDays: ['Tuesday', 'Sunday'],
        priceRange: '₹5,000 - ₹50,000'
      },
      Taurus: {
        primary: 'Diamond',
        secondary: 'White Sapphire',
        instructions: 'Wear on ring finger of right hand on Friday morning',
        benefits: ['Attracts luxury and wealth', 'Stabilizes finances', 'Improves relationships'],
        bestDays: ['Friday', 'Monday'],
        priceRange: '₹10,000 - ₹1,00,000'
      },
      Gemini: {
        primary: 'Emerald',
        secondary: 'Green Jade',
        instructions: 'Wear on little finger of right hand on Wednesday morning',
        benefits: ['Enhances communication skills', 'Boosts trading success', 'Improves networking'],
        bestDays: ['Wednesday', 'Saturday'],
        priceRange: '₹8,000 - ₹80,000'
      },
      Cancer: {
        primary: 'Pearl',
        secondary: 'Moonstone',
        instructions: 'Wear on ring finger of right hand on Monday morning',
        benefits: ['Increases emotional stability', 'Attracts family wealth', 'Improves intuition'],
        bestDays: ['Monday', 'Thursday'],
        priceRange: '₹3,000 - ₹30,000'
      },
      Leo: {
        primary: 'Ruby',
        secondary: 'Red Garnet',
        instructions: 'Wear on ring finger of right hand on Sunday morning',
        benefits: ['Enhances leadership qualities', 'Attracts fame and fortune', 'Boosts confidence'],
        bestDays: ['Sunday', 'Tuesday'],
        priceRange: '₹15,000 - ₹1,50,000'
      },
      Virgo: {
        primary: 'Yellow Sapphire',
        secondary: 'Citrine',
        instructions: 'Wear on index finger of right hand on Thursday morning',
        benefits: ['Improves analytical skills', 'Attracts business opportunities', 'Enhances precision'],
        bestDays: ['Thursday', 'Wednesday'],
        priceRange: '₹12,000 - ₹1,20,000'
      },
      Libra: {
        primary: 'Opal',
        secondary: 'Rose Quartz',
        instructions: 'Wear on ring finger of right hand on Friday morning',
        benefits: ['Improves balance in life', 'Attracts harmony and wealth', 'Enhances diplomacy'],
        bestDays: ['Friday', 'Monday'],
        priceRange: '₹6,000 - ₹60,000'
      },
      Scorpio: {
        primary: 'Blue Sapphire',
        secondary: 'Lapis Lazuli',
        instructions: 'Wear on middle finger of right hand on Saturday morning',
        benefits: ['Increases determination', 'Attracts hidden opportunities', 'Enhances psychic abilities'],
        bestDays: ['Saturday', 'Tuesday'],
        priceRange: '₹20,000 - ₹2,00,000'
      },
      Sagittarius: {
        primary: 'Yellow Sapphire',
        secondary: 'Topaz',
        instructions: 'Wear on index finger of right hand on Thursday morning',
        benefits: ['Increases wisdom and knowledge', 'Attracts foreign opportunities', 'Enhances optimism'],
        bestDays: ['Thursday', 'Sunday'],
        priceRange: '₹12,000 - ₹1,20,000'
      },
      Capricorn: {
        primary: 'Blue Sapphire',
        secondary: 'Onyx',
        instructions: 'Wear on middle finger of right hand on Saturday morning',
        benefits: ['Increases discipline and patience', 'Attracts long-term wealth', 'Enhances career growth'],
        bestDays: ['Saturday', 'Wednesday'],
        priceRange: '₹20,000 - ₹2,00,000'
      },
      Aquarius: {
        primary: 'Amethyst',
        secondary: 'Aquamarine',
        instructions: 'Wear on little finger of right hand on Saturday morning',
        benefits: ['Increases innovation and creativity', 'Attracts unique opportunities', 'Enhances humanitarian work'],
        bestDays: ['Saturday', 'Wednesday'],
        priceRange: '₹4,000 - ₹40,000'
      },
      Pisces: {
        primary: 'Aquamarine',
        secondary: 'Pearl',
        instructions: 'Wear on little finger of right hand on Thursday morning',
        benefits: ['Increases intuition and spirituality', 'Attracts artistic success', 'Enhances compassion'],
        bestDays: ['Thursday', 'Monday'],
        priceRange: '₹5,000 - ₹50,000'
      }
    };

    const data = gemstoneData[zodiac as keyof typeof gemstoneData];
    setResult({
      primaryGemstone: data.primary,
      secondaryGemstone: data.secondary,
      wearingInstructions: data.instructions,
      benefits: data.benefits,
      bestDays: data.bestDays,
      priceRange: data.priceRange
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-yellow-700 glow-text text-center">Gemstone Calculator for Financial Success</h1>
        <p className="text-center text-neutral-600 mb-8">
          Discover the perfect gemstone to enhance your financial prosperity based on your zodiac sign
        </p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Zodiac Sign</label>
            <select value={zodiac} onChange={e => setZodiac(e.target.value)} className="input w-full">
              {zodiacSigns.map(sign => <option key={sign} value={sign}>{sign}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Birth Date</label>
            <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="input w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Financial Goal</label>
            <select value={financialGoal} onChange={e => setFinancialGoal(e.target.value)} className="input w-full">
              <option value="wealth">Wealth Accumulation</option>
              <option value="business">Business Success</option>
              <option value="career">Career Growth</option>
              <option value="investment">Investment Success</option>
            </select>
          </div>
          <button onClick={calculateGemstone} className="astro-finance-btn w-full">Find My Gemstone</button>
        </div>
        
        {result && (
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-purple-700">Your Recommended Gemstones</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="font-semibold text-purple-600 mb-2">Primary Gemstone</h3>
                  <p className="text-lg font-bold">{result.primaryGemstone}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="font-semibold text-blue-600 mb-2">Secondary Gemstone</h3>
                  <p className="text-lg font-bold">{result.secondaryGemstone}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-yellow-700">Wearing Instructions</h3>
              <p className="text-neutral-700 mb-4">{result.wearingInstructions}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-yellow-700 mb-2">Best Days to Wear</h4>
                  <p className="text-neutral-700">{result.bestDays.join(', ')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-700 mb-2">Price Range</h4>
                  <p className="text-neutral-700">{result.priceRange}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-green-50 border-l-4 border-green-400 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-green-700">Financial Benefits</h3>
              <ul className="space-y-2">
                {result.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span className="text-neutral-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AstroFinanceGemstoneCalculator; 