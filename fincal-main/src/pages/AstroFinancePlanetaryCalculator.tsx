import React, { useState } from 'react';

const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

const AstroFinancePlanetaryCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [selectedPlanet, setSelectedPlanet] = useState('Jupiter');
  const [financialActivity, setFinancialActivity] = useState('investment');
  const [result, setResult] = useState<{
    planet: string;
    currentPosition: string;
    financialInfluence: string;
    recommendations: string[];
    bestTiming: string;
    remedies: string[];
  } | null>(null);

  const calculatePlanetaryInfluence = () => {
    const planetaryData = {
      Sun: {
        currentPosition: 'Strong in Leo (July-August)',
        financialInfluence: 'Represents authority, government, and father. Strong Sun brings leadership opportunities and government-related financial gains.',
        recommendations: [
          'Invest in government securities and bonds',
          'Focus on leadership positions in business',
          'Consider real estate investments',
          'Avoid investments during Sun transit periods'
        ],
        bestTiming: 'Sunday mornings, especially during Leo season',
        remedies: [
          'Wear ruby gemstone',
          'Chant Surya Mantra daily',
          'Donate wheat and jaggery on Sundays',
          'Fast on Sundays'
        ]
      },
      Moon: {
        currentPosition: 'Strong in Cancer (June-July)',
        financialInfluence: 'Represents emotions, mother, and mind. Strong Moon brings emotional stability and intuitive financial decisions.',
        recommendations: [
          'Invest in healthcare and pharmaceutical companies',
          'Consider water-related businesses',
          'Focus on emotional intelligence in business',
          'Avoid impulsive financial decisions during full moon'
        ],
        bestTiming: 'Monday evenings, especially during Cancer season',
        remedies: [
          'Wear pearl gemstone',
          'Chant Chandra Mantra daily',
          'Donate white items on Mondays',
          'Meditate during moonrise'
        ]
      },
      Mars: {
        currentPosition: 'Strong in Aries (March-April)',
        financialInfluence: 'Represents courage, energy, and brother. Strong Mars brings aggressive investment opportunities and technological gains.',
        recommendations: [
          'Invest in technology and defense sectors',
          'Consider sports and fitness businesses',
          'Focus on high-energy ventures',
          'Avoid conflicts in business partnerships'
        ],
        bestTiming: 'Tuesday mornings, especially during Aries season',
        remedies: [
          'Wear red coral gemstone',
          'Chant Mangal Mantra daily',
          'Donate red items on Tuesdays',
          'Practice physical exercise regularly'
        ]
      },
      Mercury: {
        currentPosition: 'Strong in Gemini (May-June)',
        financialInfluence: 'Represents communication, intelligence, and business. Strong Mercury brings excellent communication skills and business opportunities.',
        recommendations: [
          'Invest in communication and media companies',
          'Consider education and publishing businesses',
          'Focus on networking and partnerships',
          'Avoid hasty decisions during Mercury retrograde'
        ],
        bestTiming: 'Wednesday mornings, especially during Gemini season',
        remedies: [
          'Wear emerald gemstone',
          'Chant Budh Mantra daily',
          'Donate green items on Wednesdays',
          'Practice writing and communication skills'
        ]
      },
      Jupiter: {
        currentPosition: 'Strong in Sagittarius (November-December)',
        financialInfluence: 'Represents wisdom, guru, and children. Strong Jupiter brings knowledge-based wealth and educational opportunities.',
        recommendations: [
          'Invest in education and knowledge-based companies',
          'Consider spiritual and religious businesses',
          'Focus on teaching and consulting',
          'Avoid over-optimism in investments'
        ],
        bestTiming: 'Thursday mornings, especially during Sagittarius season',
        remedies: [
          'Wear yellow sapphire gemstone',
          'Chant Guru Mantra daily',
          'Donate yellow items on Thursdays',
          'Study and gain knowledge regularly'
        ]
      },
      Venus: {
        currentPosition: 'Strong in Taurus (April-May)',
        financialInfluence: 'Represents luxury, beauty, and relationships. Strong Venus brings artistic talents and luxury-related financial gains.',
        recommendations: [
          'Invest in luxury and beauty companies',
          'Consider art and entertainment businesses',
          'Focus on relationship-based business',
          'Avoid excessive spending on luxuries'
        ],
        bestTiming: 'Friday evenings, especially during Taurus season',
        remedies: [
          'Wear diamond or white sapphire gemstone',
          'Chant Shukra Mantra daily',
          'Donate white items on Fridays',
          'Practice arts and music'
        ]
      },
      Saturn: {
        currentPosition: 'Strong in Capricorn (December-January)',
        financialInfluence: 'Represents discipline, hard work, and delays. Strong Saturn brings long-term wealth through patience and discipline.',
        recommendations: [
          'Invest in infrastructure and construction',
          'Consider long-term investment plans',
          'Focus on systematic and disciplined approach',
          'Avoid shortcuts in business'
        ],
        bestTiming: 'Saturday evenings, especially during Capricorn season',
        remedies: [
          'Wear blue sapphire gemstone',
          'Chant Shani Mantra daily',
          'Donate black items on Saturdays',
          'Practice patience and discipline'
        ]
      },
      Rahu: {
        currentPosition: 'Strong in Aquarius (January-February)',
        financialInfluence: 'Represents innovation, technology, and foreign connections. Strong Rahu brings unconventional opportunities and foreign investments.',
        recommendations: [
          'Invest in innovative and technology companies',
          'Consider foreign investments and partnerships',
          'Focus on unconventional business ideas',
          'Avoid illegal or unethical investments'
        ],
        bestTiming: 'Saturday evenings, especially during Aquarius season',
        remedies: [
          'Wear hessonite garnet gemstone',
          'Chant Rahu Mantra daily',
          'Donate dark blue items on Saturdays',
          'Practice meditation and spiritual activities'
        ]
      },
      Ketu: {
        currentPosition: 'Strong in Scorpio (October-November)',
        financialInfluence: 'Represents spirituality, research, and hidden knowledge. Strong Ketu brings spiritual wealth and research-based opportunities.',
        recommendations: [
          'Invest in research and development companies',
          'Consider spiritual and alternative medicine businesses',
          'Focus on research and investigation',
          'Avoid investments based on rumors'
        ],
        bestTiming: 'Tuesday evenings, especially during Scorpio season',
        remedies: [
          'Wear cat\'s eye gemstone',
          'Chant Ketu Mantra daily',
          'Donate multicolored items on Tuesdays',
          'Practice spiritual and meditation activities'
        ]
      }
    };

    const data = planetaryData[selectedPlanet as keyof typeof planetaryData];
    setResult({
      planet: selectedPlanet,
      currentPosition: data.currentPosition,
      financialInfluence: data.financialInfluence,
      recommendations: data.recommendations,
      bestTiming: data.bestTiming,
      remedies: data.remedies
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-yellow-700 glow-text text-center">Planetary Financial Calculator</h1>
        <p className="text-center text-neutral-600 mb-8">
          Understand how planetary positions influence your financial decisions and timing
        </p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Birth Date</label>
            <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="input w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Birth Time</label>
            <input type="time" value={birthTime} onChange={e => setBirthTime(e.target.value)} className="input w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Planet to Analyze</label>
            <select value={selectedPlanet} onChange={e => setSelectedPlanet(e.target.value)} className="input w-full">
              {planets.map(planet => <option key={planet} value={planet}>{planet}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Financial Activity</label>
            <select value={financialActivity} onChange={e => setFinancialActivity(e.target.value)} className="input w-full">
              <option value="investment">Investment</option>
              <option value="business">Business</option>
              <option value="career">Career</option>
              <option value="property">Property</option>
            </select>
          </div>
          <button onClick={calculatePlanetaryInfluence} className="astro-finance-btn w-full">Analyze Planetary Influence</button>
        </div>
        
        {result && (
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-purple-700">{result.planet} - Planetary Analysis</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="font-semibold text-purple-600 mb-2">Current Position</h3>
                  <p className="text-sm">{result.currentPosition}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="font-semibold text-blue-600 mb-2">Best Timing</h3>
                  <p className="text-sm">{result.bestTiming}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-green-50 border-l-4 border-green-400 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-green-700">Financial Influence</h3>
              <p className="text-neutral-700 mb-4">{result.financialInfluence}</p>
            </div>
            
            <div className="p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-yellow-700">Financial Recommendations</h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-600 mr-2 mt-1">•</span>
                    <span className="text-neutral-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-blue-700">Remedies & Strengthening</h3>
              <ul className="space-y-2">
                {result.remedies.map((remedy, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">✓</span>
                    <span className="text-neutral-700">{remedy}</span>
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

export default AstroFinancePlanetaryCalculator; 