import React, { useState } from 'react';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const AstroFinanceCompatibilityCalculator: React.FC = () => {
  const [sign1, setSign1] = useState('Aries');
  const [sign2, setSign2] = useState('Taurus');
  const [relationshipType, setRelationshipType] = useState('business');
  const [result, setResult] = useState<{
    compatibility: number;
    strengths: string[];
    challenges: string[];
    advice: string;
    bestAreas: string[];
    warningAreas: string[];
  } | null>(null);

  const compatibilityMatrix = {
    Aries: {
      Aries: { score: 75, strengths: ['Dynamic leadership', 'High energy', 'Quick decisions'], challenges: ['Ego conflicts', 'Impatience'], advice: 'Great for high-risk ventures but need to balance egos' },
      Taurus: { score: 60, strengths: ['Aries brings energy', 'Taurus provides stability'], challenges: ['Different paces', 'Risk tolerance'], advice: 'Aries should slow down, Taurus should be more flexible' },
      Gemini: { score: 85, strengths: ['Excellent communication', 'Innovative ideas', 'Fast execution'], challenges: ['Lack of focus', 'Inconsistency'], advice: 'Perfect for creative projects and networking' },
      Cancer: { score: 50, strengths: ['Aries motivates Cancer', 'Cancer provides emotional support'], challenges: ['Different emotional needs', 'Communication styles'], advice: 'Aries needs patience, Cancer needs courage' },
      Leo: { score: 90, strengths: ['Natural leadership', 'High ambition', 'Mutual respect'], challenges: ['Ego competition', 'Dominance issues'], advice: 'Excellent for high-profile ventures and leadership roles' },
      Virgo: { score: 65, strengths: ['Aries brings action', 'Virgo provides planning'], challenges: ['Different approaches', 'Detail vs big picture'], advice: 'Aries should plan more, Virgo should act faster' },
      Libra: { score: 70, strengths: ['Aries takes action', 'Libra provides balance'], challenges: ['Decision-making styles', 'Risk tolerance'], advice: 'Good balance of action and diplomacy' },
      Scorpio: { score: 80, strengths: ['Intense focus', 'Strategic thinking', 'Determination'], challenges: ['Power struggles', 'Trust issues'], advice: 'Excellent for strategic investments and research' },
      Sagittarius: { score: 95, strengths: ['Adventure spirit', 'Optimism', 'Growth mindset'], challenges: ['Lack of detail focus', 'Over-optimism'], advice: 'Perfect for expansion and international ventures' },
      Capricorn: { score: 55, strengths: ['Aries brings energy', 'Capricorn provides discipline'], challenges: ['Different timelines', 'Risk approaches'], advice: 'Aries should be patient, Capricorn should be bold' },
      Aquarius: { score: 85, strengths: ['Innovation', 'Future thinking', 'Independence'], challenges: ['Stubbornness', 'Communication gaps'], advice: 'Excellent for tech ventures and innovation' },
      Pisces: { score: 45, strengths: ['Aries motivates Pisces', 'Pisces provides intuition'], challenges: ['Different realities', 'Practical vs spiritual'], advice: 'Aries should be gentle, Pisces should be practical' }
    },
    Taurus: {
      Aries: { score: 60, strengths: ['Taurus provides stability', 'Aries brings energy'], challenges: ['Different paces', 'Risk tolerance'], advice: 'Taurus should be flexible, Aries should be patient' },
      Taurus: { score: 85, strengths: ['Shared values', 'Stability', 'Long-term thinking'], challenges: ['Stubbornness', 'Resistance to change'], advice: 'Excellent for stable, long-term investments' },
      Gemini: { score: 50, strengths: ['Taurus provides grounding', 'Gemini brings variety'], challenges: ['Different communication styles', 'Stability vs change'], advice: 'Taurus should be open, Gemini should be consistent' },
      Cancer: { score: 90, strengths: ['Emotional security', 'Family values', 'Nurturing approach'], challenges: ['Over-caution', 'Emotional decisions'], advice: 'Perfect for family businesses and secure investments' },
      Leo: { score: 70, strengths: ['Taurus provides resources', 'Leo brings charisma'], challenges: ['Different spending habits', 'Luxury vs practicality'], advice: 'Good for luxury markets and high-end ventures' },
      Virgo: { score: 95, strengths: ['Shared earth element', 'Practical approach', 'Attention to detail'], challenges: ['Over-analysis', 'Perfectionism'], advice: 'Excellent for systematic investments and planning' },
      Libra: { score: 80, strengths: ['Aesthetic appreciation', 'Balance', 'Social skills'], challenges: ['Indecision', 'Different priorities'], advice: 'Great for creative businesses and partnerships' },
      Scorpio: { score: 75, strengths: ['Intensity', 'Financial acumen', 'Determination'], challenges: ['Power struggles', 'Trust issues'], advice: 'Good for high-stakes investments and research' },
      Sagittarius: { score: 55, strengths: ['Taurus provides security', 'Sagittarius brings expansion'], challenges: ['Different risk tolerance', 'Stability vs adventure'], advice: 'Taurus should be adventurous, Sagittarius should be careful' },
      Capricorn: { score: 90, strengths: ['Shared earth element', 'Discipline', 'Long-term vision'], challenges: ['Workaholic tendencies', 'Rigidity'], advice: 'Excellent for traditional businesses and investments' },
      Aquarius: { score: 45, strengths: ['Taurus provides grounding', 'Aquarius brings innovation'], challenges: ['Different values', 'Traditional vs modern'], advice: 'Taurus should be open to change, Aquarius should be practical' },
      Pisces: { score: 80, strengths: ['Emotional connection', 'Intuition', 'Creativity'], challenges: ['Practical vs spiritual', 'Different realities'], advice: 'Good for creative ventures and spiritual businesses' }
    }
  };

  const calculateCompatibility = () => {
    // Simplified calculation - in real app, you'd have full matrix
    const baseScore = Math.floor(Math.random() * 40) + 60; // 60-100 range
    
    const relationshipMultipliers = {
      business: 1.0,
      investment: 1.1,
      partnership: 0.9,
      family: 1.2
    };
    
    const multiplier = relationshipMultipliers[relationshipType as keyof typeof relationshipMultipliers] || 1.0;
    const finalScore = Math.min(100, Math.round(baseScore * multiplier));
    
    const strengths = [
      'Complementary skills and approaches',
      'Shared financial goals and values',
      'Good communication and understanding',
      'Balanced risk tolerance levels'
    ];
    
    const challenges = [
      'Different decision-making styles',
      'Varying levels of patience',
      'Communication gaps in financial matters',
      'Different approaches to risk'
    ];
    
    const advice = `For ${relationshipType} relationships, focus on open communication and finding common ground in financial decisions. Regular check-ins and clear expectations will help maintain harmony.`;
    
    const bestAreas = [
      'Long-term investment planning',
      'Risk assessment and management',
      'Business strategy development',
      'Financial goal setting'
    ];
    
    const warningAreas = [
      'Impulsive financial decisions',
      'Lack of communication about money',
      'Different spending priorities',
      'Unclear financial boundaries'
    ];
    
    setResult({
      compatibility: finalScore,
      strengths,
      challenges,
      advice,
      bestAreas,
      warningAreas
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-yellow-700 glow-text">Financial Compatibility Calculator</h1>
          <p className="text-lg text-neutral-600 mb-6">
            Discover how well your zodiac signs work together in financial matters, business partnerships, and investments
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium mb-2">Your Zodiac Sign</label>
              <select value={sign1} onChange={e => setSign1(e.target.value)} className="input w-full">
                {zodiacSigns.map(sign => <option key={sign} value={sign}>{sign}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Partner's Zodiac Sign</label>
              <select value={sign2} onChange={e => setSign2(e.target.value)} className="input w-full">
                {zodiacSigns.map(sign => <option key={sign} value={sign}>{sign}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Relationship Type</label>
              <select value={relationshipType} onChange={e => setRelationshipType(e.target.value)} className="input w-full">
                <option value="business">Business Partnership</option>
                <option value="investment">Investment Partners</option>
                <option value="partnership">General Partnership</option>
                <option value="family">Family Business</option>
              </select>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <button onClick={calculateCompatibility} className="astro-finance-btn">Calculate Compatibility</button>
          </div>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-4 text-yellow-700">
                  {sign1} + {sign2} Compatibility
                </h2>
                <div className="inline-block">
                  <div className="text-4xl font-bold text-purple-600 mb-2">{result.compatibility}%</div>
                  <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-purple-600 rounded-full transition-all duration-1000"
                      style={{ width: `${result.compatibility}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-700">💪 Strengths</h3>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <span className="text-neutral-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-red-700">⚠️ Challenges</h3>
                <ul className="space-y-2">
                  {result.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-600 mr-2 mt-1">•</span>
                      <span className="text-neutral-700">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">💡 Advice</h3>
              <p className="text-neutral-700 mb-4">{result.advice}</p>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">✅ Best Areas</h4>
                  <ul className="space-y-1">
                    {result.bestAreas.map((area, index) => (
                      <li key={index} className="text-sm text-neutral-700">• {area}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-700 mb-3">🚨 Warning Areas</h4>
                  <ul className="space-y-1">
                    {result.warningAreas.map((area, index) => (
                      <li key={index} className="text-sm text-neutral-700">• {area}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AstroFinanceCompatibilityCalculator; 
