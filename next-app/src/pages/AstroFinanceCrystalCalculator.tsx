import React, { useState } from 'react';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const AstroFinanceCrystalCalculator: React.FC = () => {
  const [zodiac, setZodiac] = useState('Aries');
  const [birthDate, setBirthDate] = useState('');
  const [roomType, setRoomType] = useState('office');
  const [result, setResult] = useState<{
    crystals: Array<{name: string; benefits: string; placement: string; price: string}>;
    fengShui: Array<{element: string; direction: string; items: string[]; instructions: string}>;
    luckyDirections: string[];
    colorScheme: string[];
    activationRitual: string;
  } | null>(null);

  const calculateCrystalFengShui = () => {
    const crystalData = {
      Aries: {
        crystals: [
          { name: 'Red Jasper', benefits: 'Increases courage and leadership', placement: 'North-East corner of office', price: '₹500 - ₹2,000' },
          { name: 'Carnelian', benefits: 'Boosts confidence and motivation', placement: 'On your desk or work area', price: '₹800 - ₹3,000' },
          { name: 'Ruby', benefits: 'Attracts wealth and success', placement: 'Wear as jewelry or keep in wallet', price: '₹5,000 - ₹50,000' }
        ],
        fengShui: [
          { element: 'Fire', direction: 'South', items: ['Red candles', 'Triangle shapes', 'Bright lights'], instructions: 'Place fire elements in south direction for career success' },
          { element: 'Wood', direction: 'East', items: ['Plants', 'Wooden furniture', 'Green items'], instructions: 'Wood elements in east bring growth and expansion' }
        ],
        luckyDirections: ['South', 'East', 'North-East'],
        colorScheme: ['Red', 'Orange', 'Bright Yellow'],
        activationRitual: 'Light a red candle on Tuesday morning and meditate for 10 minutes while holding your crystal.'
      },
      Taurus: {
        crystals: [
          { name: 'Green Aventurine', benefits: 'Attracts money and abundance', placement: 'South-East corner (wealth area)', price: '₹300 - ₹1,500' },
          { name: 'Rose Quartz', benefits: 'Promotes harmony in business relationships', placement: 'Meeting room or partnership area', price: '₹400 - ₹2,000' },
          { name: 'Diamond', benefits: 'Enhances luxury and high-value transactions', placement: 'Wear as jewelry or keep in safe', price: '₹10,000 - ₹1,00,000' }
        ],
        fengShui: [
          { element: 'Earth', direction: 'Center', items: ['Crystals', 'Square shapes', 'Yellow items'], instructions: 'Earth elements in center bring stability and grounding' },
          { element: 'Metal', direction: 'West', items: ['Metal objects', 'White items', 'Round shapes'], instructions: 'Metal elements in west bring precision and clarity' }
        ],
        luckyDirections: ['Center', 'West', 'South-East'],
        colorScheme: ['Green', 'Brown', 'Pink'],
        activationRitual: 'Place your crystal in a bowl of salt water overnight and charge it in morning sunlight.'
      },
      Gemini: {
        crystals: [
          { name: 'Citrine', benefits: 'Attracts wealth and success', placement: 'South-East corner or cash register', price: '₹600 - ₹3,000' },
          { name: 'Tiger Eye', benefits: 'Enhances communication and networking', placement: 'Phone area or communication center', price: '₹500 - ₹2,500' },
          { name: 'Yellow Sapphire', benefits: 'Boosts intelligence and business acumen', placement: 'Study area or decision-making space', price: '₹8,000 - ₹80,000' }
        ],
        fengShui: [
          { element: 'Air', direction: 'North-West', items: ['Wind chimes', 'White items', 'Metal objects'], instructions: 'Air elements in north-west bring helpful people and networking' },
          { element: 'Metal', direction: 'West', items: ['Metal furniture', 'White crystals', 'Round mirrors'], instructions: 'Metal elements in west bring clarity and precision' }
        ],
        luckyDirections: ['North-West', 'West', 'South-East'],
        colorScheme: ['Yellow', 'White', 'Light Blue'],
        activationRitual: 'Hold your crystal and recite your financial goals three times while facing north-west.'
      },
      Cancer: {
        crystals: [
          { name: 'Pearl', benefits: 'Promotes emotional stability in business', placement: 'North-East corner for wisdom', price: '₹2,000 - ₹10,000' },
          { name: 'Moonstone', benefits: 'Enhances intuition for financial decisions', placement: 'Bedroom or meditation area', price: '₹800 - ₹4,000' },
          { name: 'Opal', benefits: 'Attracts unexpected financial opportunities', placement: 'Wear as jewelry or keep in pocket', price: '₹3,000 - ₹30,000' }
        ],
        fengShui: [
          { element: 'Water', direction: 'North', items: ['Water features', 'Blue items', 'Mirrors'], instructions: 'Water elements in north bring career opportunities' },
          { element: 'Earth', direction: 'Center', items: ['Crystals', 'Square shapes', 'Yellow items'], instructions: 'Earth elements provide emotional stability' }
        ],
        luckyDirections: ['North', 'Center', 'North-East'],
        colorScheme: ['Silver', 'White', 'Light Blue'],
        activationRitual: 'Place your crystal in moonlight overnight and meditate with it in the morning.'
      },
      Leo: {
        crystals: [
          { name: 'Ruby', benefits: 'Attracts fame, fortune, and leadership', placement: 'South direction for fame and recognition', price: '₹15,000 - ₹1,50,000' },
          { name: 'Sunstone', benefits: 'Enhances personal power and charisma', placement: 'Wear as jewelry or keep in office', price: '₹1,200 - ₹6,000' },
          { name: 'Tiger Eye', benefits: 'Protects wealth and enhances courage', placement: 'Entrance area or main door', price: '₹500 - ₹2,500' }
        ],
        fengShui: [
          { element: 'Fire', direction: 'South', items: ['Red candles', 'Triangle shapes', 'Bright lights'], instructions: 'Fire elements in south bring fame and recognition' },
          { element: 'Earth', direction: 'Center', items: ['Crystals', 'Square shapes', 'Yellow items'], instructions: 'Earth elements provide stability and grounding' }
        ],
        luckyDirections: ['South', 'Center', 'North-East'],
        colorScheme: ['Red', 'Gold', 'Orange'],
        activationRitual: 'Light a red candle and hold your crystal while visualizing your success for 15 minutes.'
      },
      Virgo: {
        crystals: [
          { name: 'Green Aventurine', benefits: 'Attracts money and good fortune', placement: 'South-East corner for wealth', price: '₹300 - ₹1,500' },
          { name: 'Jade', benefits: 'Promotes wisdom and careful planning', placement: 'Study area or planning space', price: '₹1,000 - ₹8,000' },
          { name: 'Yellow Sapphire', benefits: 'Enhances analytical skills and precision', placement: 'Work desk or analytical center', price: '₹8,000 - ₹80,000' }
        ],
        fengShui: [
          { element: 'Earth', direction: 'Center', items: ['Crystals', 'Square shapes', 'Yellow items'], instructions: 'Earth elements in center bring stability and precision' },
          { element: 'Metal', direction: 'West', items: ['Metal objects', 'White items', 'Round shapes'], instructions: 'Metal elements in west bring clarity and organization' }
        ],
        luckyDirections: ['Center', 'West', 'South-East'],
        colorScheme: ['Green', 'Yellow', 'Brown'],
        activationRitual: 'Organize your workspace and place your crystal while setting clear intentions.'
      }
    };

    const data = crystalData[zodiac as keyof typeof crystalData];
    if (data) {
      setResult({
        crystals: data.crystals,
        fengShui: data.fengShui,
        luckyDirections: data.luckyDirections,
        colorScheme: data.colorScheme,
        activationRitual: data.activationRitual
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-yellow-700 glow-text">Crystal & Feng Shui Calculator</h1>
          <p className="text-lg text-neutral-600 mb-6">
            Discover the perfect crystals and feng shui arrangements for financial success based on your zodiac sign
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid gap-6 md:grid-cols-3">
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
              <label className="block text-sm font-medium mb-2">Room Type</label>
              <select value={roomType} onChange={e => setRoomType(e.target.value)} className="input w-full">
                <option value="office">Office/Workplace</option>
                <option value="home">Home Office</option>
                <option value="business">Business Premises</option>
                <option value="bedroom">Bedroom</option>
              </select>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <button onClick={calculateCrystalFengShui} className="astro-finance-btn">Calculate Crystal & Feng Shui</button>
          </div>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-center text-yellow-700">
                {zodiac} - Crystal & Feng Shui Recommendations
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">💎 Recommended Crystals</h3>
                  {result.crystals.map((crystal, index) => (
                    <div key={index} className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-lg">
                      <h4 className="font-semibold text-purple-700 mb-2">{crystal.name}</h4>
                      <p className="text-sm text-neutral-700 mb-2">{crystal.benefits}</p>
                      <p className="text-xs text-neutral-600 mb-1"><strong>Placement:</strong> {crystal.placement}</p>
                      <p className="text-xs text-neutral-600"><strong>Price Range:</strong> {crystal.price}</p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-green-700 mb-4">🏮 Feng Shui Elements</h3>
                  {result.fengShui.map((element, index) => (
                    <div key={index} className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
                      <h4 className="font-semibold text-green-700 mb-2">{element.element} - {element.direction}</h4>
                      <p className="text-sm text-neutral-700 mb-2">{element.instructions}</p>
                      <p className="text-xs text-neutral-600"><strong>Items:</strong> {element.items.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-700">🧭 Lucky Directions</h3>
                <div className="grid grid-cols-3 gap-3">
                  {result.luckyDirections.map((direction, index) => (
                    <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <span className="text-blue-700 font-semibold">{direction}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-yellow-700">🎨 Color Scheme</h3>
                <div className="grid grid-cols-3 gap-3">
                  {result.colorScheme.map((color, index) => (
                    <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                      <span className="text-yellow-700 font-semibold">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-red-700">✨ Activation Ritual</h3>
              <p className="text-neutral-700 bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                {result.activationRitual}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AstroFinanceCrystalCalculator; 