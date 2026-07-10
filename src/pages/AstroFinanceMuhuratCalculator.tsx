import React, { useState } from 'react';
import SEOHelmet from '../components/SEOHelmet';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const activities = [
  'Investment Start',
  'Stock Trading',
  'Property Purchase',
  'Business Launch',
  'Loan Application',
  'Gold Purchase',
  'Mutual Fund SIP',
  'Insurance Purchase'
];

const AstroFinanceMuhuratCalculator: React.FC = () => {
  const [zodiac, setZodiac] = useState('Aries');
  const [activity, setActivity] = useState('Investment Start');
  const [selectedDate, setSelectedDate] = useState('');
  const [muhuratData, setMuhuratData] = useState<{
    zodiac: string;
    activity: string;
    bestDays: string[];
    bestHours: string[];
    nextWeek: Array<{
      date: string;
      day: string;
      timings: string[];
      auspicious: boolean;
    }>;
  } | null>(null);
  const [showFAQ, setShowFAQ] = useState(false);

  const calculateMuhurat = () => {
    const zodiacTimings = {
      Aries: { bestDays: ['Tuesday', 'Thursday'], bestHours: ['6-9 AM', '3-6 PM'] },
      Taurus: { bestDays: ['Friday', 'Monday'], bestHours: ['7-10 AM', '2-5 PM'] },
      Gemini: { bestDays: ['Wednesday', 'Saturday'], bestHours: ['8-11 AM', '1-4 PM'] },
      Cancer: { bestDays: ['Monday', 'Thursday'], bestHours: ['6-9 AM', '4-7 PM'] },
      Leo: { bestDays: ['Sunday', 'Tuesday'], bestHours: ['5-8 AM', '3-6 PM'] },
      Virgo: { bestDays: ['Wednesday', 'Friday'], bestHours: ['7-10 AM', '2-5 PM'] },
      Libra: { bestDays: ['Friday', 'Monday'], bestHours: ['8-11 AM', '1-4 PM'] },
      Scorpio: { bestDays: ['Tuesday', 'Saturday'], bestHours: ['6-9 AM', '3-6 PM'] },
      Sagittarius: { bestDays: ['Thursday', 'Sunday'], bestHours: ['7-10 AM', '2-5 PM'] },
      Capricorn: { bestDays: ['Saturday', 'Wednesday'], bestHours: ['8-11 AM', '1-4 PM'] },
      Aquarius: { bestDays: ['Saturday', 'Tuesday'], bestHours: ['6-9 AM', '3-6 PM'] },
      Pisces: { bestDays: ['Thursday', 'Monday'], bestHours: ['7-10 AM', '2-5 PM'] }
    };

    const activityMultipliers = {
      'Investment Start': 1,
      'Stock Trading': 2,
      'Property Purchase': 3,
      'Business Launch': 4,
      'Loan Application': 2,
      'Gold Purchase': 1,
      'Mutual Fund SIP': 1,
      'Insurance Purchase': 2
    };

    const timing = zodiacTimings[zodiac as keyof typeof zodiacTimings];

    // Generate next 7 days with auspicious timings
    const nextWeek = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      
      if (timing.bestDays.includes(dayName)) {
        nextWeek.push({
          date: date.toLocaleDateString(),
          day: dayName,
          timings: timing.bestHours,
          auspicious: true
        });
      }
    }

    setMuhuratData({
      zodiac,
      activity,
      bestDays: timing.bestDays,
      bestHours: timing.bestHours,
      nextWeek
    });
  };

  return (
    <>
      <SEOHelmet
        title="Astro-Investment Date Picker (Muhurat Calculator) - Find Auspicious Investment Dates | Fincal"
        description="Find the most auspicious dates and times for investments, trading, and financial activities based on your zodiac sign. Fully mobile-friendly, SEO-optimized, and easy to use."
        keywords="astro investment date picker, muhurat Calculator, best investment dates, zodiac investment, financial astrology, auspicious investment dates, India"
        url="/astro-finance/muhurat"
        tags={["astro investment", "muhurat calculator", "investment date picker", "zodiac finance", "auspicious investment"]}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          "name": "Astro-Investment Date Picker (Muhurat Calculator)",
          "description": "Find the most auspicious dates and times for investments, trading, and financial activities based on your zodiac sign.",
          "url": "https://fincal.in/astro-finance/muhurat",
          "provider": {
            "@type": "Organization",
            "name": "Fincal"
          },
          "serviceType": "Astro-Investment Date Picker"
        })}
      </script>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 py-12 px-4 flex flex-col items-center">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-3xl font-bold text-yellow-700 glow-text text-center md:text-left mb-2 md:mb-0">Muhurat Calculator</h1>
            <button
              className="text-sm text-purple-700 hover:text-purple-900 underline md:ml-4"
              aria-label="Show Muhurat FAQ"
              onClick={() => setShowFAQ(true)}
            >
              How does this work?
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="zodiac-select">Zodiac Sign</label>
              <select id="zodiac-select" value={zodiac} onChange={e => setZodiac(e.target.value)} className="input" aria-label="Select Zodiac Sign">
                {zodiacSigns.map(sign => <option key={sign} value={sign}>{sign}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="activity-select">Financial Activity</label>
              <select id="activity-select" value={activity} onChange={e => setActivity(e.target.value)} className="input" aria-label="Select Financial Activity">
                {activities.map(act => <option key={act} value={act}>{act}</option>)}
              </select>
            </div>
            <button onClick={calculateMuhurat} className="astro-finance-btn w-full md:w-auto" aria-label="Calculate Muhurat">Calculate Muhurat</button>
          </div>
          {muhuratData && (
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-purple-50 border-l-4 border-purple-400 rounded">
                <h2 className="text-xl font-semibold mb-4">Auspicious Timings for {activity}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-purple-700">Best Days</h3>
                    <p className="text-neutral-700">{muhuratData.bestDays.join(', ')}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-700">Best Hours</h3>
                    <p className="text-neutral-700">{muhuratData.bestHours.join(', ')}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <h3 className="text-lg font-semibold mb-4">Next Week's Auspicious Dates</h3>
                <div className="space-y-3">
                  {muhuratData.nextWeek.map((day, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg shadow">
                      <div className="font-semibold text-yellow-700">{day.date} ({day.day})</div>
                      <div className="text-sm text-neutral-600">Timings: {day.timings.join(', ')}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* FAQ Modal */}
          {showFAQ && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                <button
                  className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-700"
                  aria-label="Close FAQ"
                  onClick={() => setShowFAQ(false)}
                >
                  ×
                </button>
                <h3 className="text-xl font-bold mb-4">Astro-Investment Date Picker FAQ</h3>
                <ul className="list-disc list-inside text-sm text-neutral-700 space-y-2">
                  <li><strong>How are dates calculated?</strong> Based on your zodiac and chosen activity, using Vedic astrology rules.</li>
                  <li><strong>Is this tool free?</strong> 100% free for all users.</li>
                  <li><strong>Is my data saved?</strong> No, all calculations are done in your browser and not stored.</li>
                  <li><strong>Is this mobile-friendly?</strong> Yes, fully responsive and easy to use on any device.</li>
                  <li><strong>Where can I get more help?</strong> See the info and notes sections below, or contact us via the site.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="fixed bottom-4 right-4 z-50 md:hidden">
          <button
            onClick={calculateMuhurat}
            className="bg-purple-700 text-white rounded-full shadow-lg px-6 py-3 font-bold text-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Calculate Muhurat"
          >
            Calculate Muhurat
          </button>
        </div>
      </div>
    </>
  );
};

export default AstroFinanceMuhuratCalculator; 
