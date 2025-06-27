import React, { useState } from 'react';

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 py-12 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-yellow-700 glow-text text-center">Muhurat Calculator</h1>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Zodiac Sign</label>
            <select value={zodiac} onChange={e => setZodiac(e.target.value)} className="input">
              {zodiacSigns.map(sign => <option key={sign} value={sign}>{sign}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Financial Activity</label>
            <select value={activity} onChange={e => setActivity(e.target.value)} className="input">
              {activities.map(act => <option key={act} value={act}>{act}</option>)}
            </select>
          </div>
          <button onClick={calculateMuhurat} className="astro-finance-btn w-full">Calculate Muhurat</button>
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
      </div>
    </div>
  );
};

export default AstroFinanceMuhuratCalculator; 