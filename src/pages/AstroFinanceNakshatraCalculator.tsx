import React, { useState } from 'react';

const nakshatras = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

const AstroFinanceNakshatraCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [nakshatra, setNakshatra] = useState('Ashwini');
  const [result, setResult] = useState<{
    nakshatra: string;
    rulingPlanet: string;
    financialStrengths: string[];
    careerPaths: string[];
    investmentAdvice: string;
    luckyElements: string[];
  } | null>(null);

  const calculateNakshatra = () => {
    const nakshatraData = {
      Ashwini: {
        rulingPlanet: 'Ketu',
        financialStrengths: ['Quick decision making', 'Innovative thinking', 'Risk-taking ability'],
        careerPaths: ['Entrepreneurship', 'Technology', 'Healthcare'],
        investmentAdvice: 'Focus on high-growth sectors and innovative startups',
        luckyElements: ['Fire', 'Red', 'Tuesday']
      },
      Bharani: {
        rulingPlanet: 'Venus',
        financialStrengths: ['Artistic talents', 'Luxury appreciation', 'Relationship building'],
        careerPaths: ['Fashion', 'Real Estate', 'Entertainment'],
        investmentAdvice: 'Invest in luxury goods, real estate, and creative industries',
        luckyElements: ['Earth', 'White', 'Friday']
      },
      Krittika: {
        rulingPlanet: 'Sun',
        financialStrengths: ['Leadership qualities', 'Determination', 'Authority'],
        careerPaths: ['Government', 'Management', 'Politics'],
        investmentAdvice: 'Focus on government bonds and stable blue-chip stocks',
        luckyElements: ['Fire', 'Orange', 'Sunday']
      },
      Rohini: {
        rulingPlanet: 'Moon',
        financialStrengths: ['Emotional intelligence', 'Creativity', 'Nurturing nature'],
        careerPaths: ['Agriculture', 'Food Industry', 'Healthcare'],
        investmentAdvice: 'Invest in agricultural commodities and healthcare stocks',
        luckyElements: ['Water', 'White', 'Monday']
      },
      Mrigashira: {
        rulingPlanet: 'Mars',
        financialStrengths: ['Analytical skills', 'Research abilities', 'Curiosity'],
        careerPaths: ['Research', 'Journalism', 'Education'],
        investmentAdvice: 'Focus on research-based companies and educational institutions',
        luckyElements: ['Fire', 'Red', 'Tuesday']
      },
      Ardra: {
        rulingPlanet: 'Rahu',
        financialStrengths: ['Transformation skills', 'Adaptability', 'Intensity'],
        careerPaths: ['Technology', 'Consulting', 'Change Management'],
        investmentAdvice: 'Invest in disruptive technologies and transformation companies',
        luckyElements: ['Air', 'Blue', 'Saturday']
      },
      Punarvasu: {
        rulingPlanet: 'Jupiter',
        financialStrengths: ['Wisdom', 'Teaching abilities', 'Optimism'],
        careerPaths: ['Education', 'Consulting', 'Spiritual Business'],
        investmentAdvice: 'Focus on educational institutions and knowledge-based companies',
        luckyElements: ['Ether', 'Yellow', 'Thursday']
      },
      Pushya: {
        rulingPlanet: 'Saturn',
        financialStrengths: ['Discipline', 'Patience', 'Hard work'],
        careerPaths: ['Manufacturing', 'Construction', 'Agriculture'],
        investmentAdvice: 'Invest in infrastructure and manufacturing sectors',
        luckyElements: ['Earth', 'Black', 'Saturday']
      },
      Ashlesha: {
        rulingPlanet: 'Mercury',
        financialStrengths: ['Intelligence', 'Communication', 'Adaptability'],
        careerPaths: ['Communication', 'Marketing', 'Sales'],
        investmentAdvice: 'Focus on communication and marketing companies',
        luckyElements: ['Earth', 'Green', 'Wednesday']
      },
      Magha: {
        rulingPlanet: 'Ketu',
        financialStrengths: ['Royal qualities', 'Leadership', 'Authority'],
        careerPaths: ['Politics', 'Government', 'Large Corporations'],
        investmentAdvice: 'Invest in government securities and large-cap stocks',
        luckyElements: ['Fire', 'Red', 'Tuesday']
      },
      'Purva Phalguni': {
        rulingPlanet: 'Venus',
        financialStrengths: ['Creativity', 'Romance', 'Artistic talents'],
        careerPaths: ['Arts', 'Entertainment', 'Fashion'],
        investmentAdvice: 'Focus on entertainment and creative industries',
        luckyElements: ['Earth', 'Pink', 'Friday']
      },
      'Uttara Phalguni': {
        rulingPlanet: 'Sun',
        financialStrengths: ['Leadership', 'Charity', 'Social work'],
        careerPaths: ['Social Work', 'Healthcare', 'Education'],
        investmentAdvice: 'Invest in healthcare and social impact companies',
        luckyElements: ['Fire', 'Orange', 'Sunday']
      },
      Hasta: {
        rulingPlanet: 'Moon',
        financialStrengths: ['Skillful hands', 'Craftsmanship', 'Precision'],
        careerPaths: ['Crafts', 'Surgery', 'Fine Arts'],
        investmentAdvice: 'Focus on precision engineering and healthcare equipment',
        luckyElements: ['Water', 'White', 'Monday']
      },
      Chitra: {
        rulingPlanet: 'Mars',
        financialStrengths: ['Artistic skills', 'Design abilities', 'Creativity'],
        careerPaths: ['Design', 'Architecture', 'Fashion'],
        investmentAdvice: 'Invest in design and creative technology companies',
        luckyElements: ['Fire', 'Red', 'Tuesday']
      },
      Swati: {
        rulingPlanet: 'Rahu',
        financialStrengths: ['Independence', 'Freedom', 'Innovation'],
        careerPaths: ['Technology', 'Startups', 'Consulting'],
        investmentAdvice: 'Focus on innovative startups and technology companies',
        luckyElements: ['Air', 'Blue', 'Saturday']
      },
      Vishakha: {
        rulingPlanet: 'Jupiter',
        financialStrengths: ['Determination', 'Success orientation', 'Leadership'],
        careerPaths: ['Business', 'Management', 'Politics'],
        investmentAdvice: 'Invest in well-established companies with strong leadership',
        luckyElements: ['Ether', 'Yellow', 'Thursday']
      },
      Anuradha: {
        rulingPlanet: 'Saturn',
        financialStrengths: ['Discipline', 'Organization', 'Planning'],
        careerPaths: ['Project Management', 'Administration', 'Finance'],
        investmentAdvice: 'Focus on well-organized companies with strong systems',
        luckyElements: ['Earth', 'Black', 'Saturday']
      },
      Jyeshtha: {
        rulingPlanet: 'Mercury',
        financialStrengths: ['Intelligence', 'Strategy', 'Communication'],
        careerPaths: ['Strategy', 'Consulting', 'Research'],
        investmentAdvice: 'Invest in strategic consulting and research companies',
        luckyElements: ['Earth', 'Green', 'Wednesday']
      },
      Mula: {
        rulingPlanet: 'Ketu',
        financialStrengths: ['Deep research', 'Transformation', 'Root cause analysis'],
        careerPaths: ['Research', 'Investigation', 'Deep Analysis'],
        investmentAdvice: 'Focus on research-based and investigative companies',
        luckyElements: ['Fire', 'Red', 'Tuesday']
      },
      'Purva Ashadha': {
        rulingPlanet: 'Venus',
        financialStrengths: ['Invincibility', 'Success', 'Victory'],
        careerPaths: ['Sports', 'Competitive Business', 'Leadership'],
        investmentAdvice: 'Invest in competitive and winning companies',
        luckyElements: ['Earth', 'Pink', 'Friday']
      },
      'Uttara Ashadha': {
        rulingPlanet: 'Sun',
        financialStrengths: ['Universal success', 'Leadership', 'Authority'],
        careerPaths: ['Politics', 'Government', 'Large Organizations'],
        investmentAdvice: 'Focus on government and large institutional investments',
        luckyElements: ['Fire', 'Orange', 'Sunday']
      },
      Shravana: {
        rulingPlanet: 'Moon',
        financialStrengths: ['Learning', 'Listening', 'Knowledge'],
        careerPaths: ['Education', 'Training', 'Communication'],
        investmentAdvice: 'Invest in educational and communication companies',
        luckyElements: ['Water', 'White', 'Monday']
      },
      Dhanishta: {
        rulingPlanet: 'Mars',
        financialStrengths: ['Wealth creation', 'Musical talents', 'Innovation'],
        careerPaths: ['Music', 'Entertainment', 'Technology'],
        investmentAdvice: 'Focus on entertainment and innovative technology companies',
        luckyElements: ['Fire', 'Red', 'Tuesday']
      },
      Shatabhisha: {
        rulingPlanet: 'Rahu',
        financialStrengths: ['Healing abilities', 'Innovation', 'Transformation'],
        careerPaths: ['Healthcare', 'Technology', 'Alternative Medicine'],
        investmentAdvice: 'Invest in healthcare technology and alternative medicine',
        luckyElements: ['Air', 'Blue', 'Saturday']
      },
      'Purva Bhadrapada': {
        rulingPlanet: 'Jupiter',
        financialStrengths: ['Spiritual wisdom', 'Teaching', 'Guidance'],
        careerPaths: ['Spiritual Business', 'Teaching', 'Counseling'],
        investmentAdvice: 'Focus on spiritual and educational investments',
        luckyElements: ['Ether', 'Yellow', 'Thursday']
      },
      'Uttara Bhadrapada': {
        rulingPlanet: 'Saturn',
        financialStrengths: ['Discipline', 'Spirituality', 'Service'],
        careerPaths: ['Social Service', 'Healthcare', 'Spiritual Business'],
        investmentAdvice: 'Invest in social impact and healthcare companies',
        luckyElements: ['Earth', 'Black', 'Saturday']
      },
      Revati: {
        rulingPlanet: 'Mercury',
        financialStrengths: ['Nurturing', 'Compassion', 'Care'],
        careerPaths: ['Healthcare', 'Nursing', 'Childcare'],
        investmentAdvice: 'Focus on healthcare and caregiving companies',
        luckyElements: ['Earth', 'Green', 'Wednesday']
      }
    };

    const data = nakshatraData[nakshatra as keyof typeof nakshatraData];
    setResult({
      nakshatra,
      rulingPlanet: data.rulingPlanet,
      financialStrengths: data.financialStrengths,
      careerPaths: data.careerPaths,
      investmentAdvice: data.investmentAdvice,
      luckyElements: data.luckyElements
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-yellow-700 glow-text text-center">Nakshatra Financial Calculator</h1>
        <p className="text-center text-neutral-600 mb-8">
          Discover your financial destiny based on your birth star (Nakshatra) in Vedic astrology
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
            <label className="block text-sm font-medium mb-2">Nakshatra (Birth Star)</label>
            <select value={nakshatra} onChange={e => setNakshatra(e.target.value)} className="input w-full">
              {nakshatras.map(star => <option key={star} value={star}>{star}</option>)}
            </select>
          </div>
          <button onClick={calculateNakshatra} className="astro-finance-btn w-full">Calculate Financial Destiny</button>
        </div>
        
        {result && (
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-purple-700">Your Nakshatra: {result.nakshatra}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="font-semibold text-purple-600 mb-2">Ruling Planet</h3>
                  <p className="text-lg font-bold">{result.rulingPlanet}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="font-semibold text-blue-600 mb-2">Lucky Elements</h3>
                  <p className="text-sm">{result.luckyElements.join(', ')}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-green-50 border-l-4 border-green-400 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-green-700">Financial Strengths</h3>
              <ul className="space-y-2">
                {result.financialStrengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span className="text-neutral-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-yellow-700">Recommended Career Paths</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {result.careerPaths.map((career, index) => (
                  <div key={index} className="p-3 bg-white rounded-lg shadow text-center">
                    <span className="text-yellow-700 font-medium">{career}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-blue-700">Investment Advice</h3>
              <p className="text-neutral-700">{result.investmentAdvice}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AstroFinanceNakshatraCalculator; 
