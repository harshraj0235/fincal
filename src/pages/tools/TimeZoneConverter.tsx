import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const cities = [
  { name: 'New York', tz: 'America/New_York' },
  { name: 'London', tz: 'Europe/London' },
  { name: 'Delhi', tz: 'Asia/Kolkata' },
  { name: 'Tokyo', tz: 'Asia/Tokyo' },
  { name: 'Sydney', tz: 'Australia/Sydney' },
  { name: 'Dubai', tz: 'Asia/Dubai' },
  { name: 'Singapore', tz: 'Asia/Singapore' },
  { name: 'San Francisco', tz: 'America/Los_Angeles' },
];

function getTime(tz: string) {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: tz });
}

const businessHours = { start: 9, end: 18 }; // 9am-6pm

const TimeZoneConverter: React.FC = () => {
  const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [selected, setSelected] = useState([userTz, '', '']);

  const handleSelect = (idx: number, tz: string) => {
    setSelected(prev => prev.map((v, i) => (i === idx ? tz : v)));
  };

  const getHour = (tz: string) => parseInt(new Date().toLocaleTimeString('en-US', { hour: '2-digit', hour12: false, timeZone: tz }));
  const allInBusiness = selected.filter(Boolean).every(tz => {
    const h = getHour(tz);
    return h >= businessHours.start && h < businessHours.end;
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">Time Zone Converter</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {[0,1,2].map(i => (
            <select key={i} className="input w-full" value={selected[i]} onChange={e => handleSelect(i, e.target.value)}>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.tz} value={city.tz}>{city.name}</option>
              ))}
            </select>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {selected.filter(Boolean).map((tz) => {
            const city = cities.find(c => c.tz === tz);
            return (
              <div key={tz} className="bg-blue-50 rounded-xl p-4">
                <div className="font-semibold text-blue-900">{city ? city.name : tz}</div>
                <div className="text-2xl text-blue-700 font-bold">{getTime(tz)}</div>
                <div className="text-xs text-blue-600">{businessHours.start}:00 - {businessHours.end}:00</div>
              </div>
            );
          })}
        </div>
        {selected.filter(Boolean).length > 1 && (
          <div className={`mb-4 font-semibold ${allInBusiness ? 'text-green-700' : 'text-red-600'}`}>{allInBusiness ? 'All in business hours!' : 'Not all in business hours'}</div>
        )}
        <Link to="/" className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl shadow-md transition-all mt-4">Back to Tool Hub</Link>
      </div>
    </div>
  );
};

export default TimeZoneConverter; 
