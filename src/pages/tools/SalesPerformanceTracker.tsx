import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SalesPerformanceTracker: React.FC = () => {
  const [sales, setSales] = useState<number[]>([]);
  const [input, setInput] = useState('');
  const [goal, setGoal] = useState('');

  const addSale = () => {
    const val = parseFloat(input);
    if (!isNaN(val)) setSales([...sales, val]);
    setInput('');
  };

  const total = sales.reduce((a, b) => a + b, 0);
  const goalNum = parseFloat(goal) || 0;
  const progress = goalNum ? Math.min(100, Math.round((total / goalNum) * 100)) : 0;

  const exportCSV = () => {
    const csv = 'Sale\n' + sales.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sales.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-green-900 mb-4">Sales Performance Tracker</h1>
        <div className="flex gap-2 mb-4">
          <input className="input flex-1" placeholder="Add sale (amount)" value={input} onChange={e => setInput(e.target.value)} />
          <button className="btn bg-green-600 text-white px-4" onClick={addSale}>Add</button>
        </div>
        <div className="mb-4">
          <input className="input w-full" placeholder="Set sales goal" value={goal} onChange={e => setGoal(e.target.value)} />
        </div>
        <div className="mb-4">
          <div className="w-full bg-green-200 rounded-full h-3 mb-2">
            <div className="bg-green-600 h-3 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="text-xs text-green-700">Progress: {progress}% ({total} / {goalNum || 'Goal'})</div>
        </div>
        <div className="mb-4">
          <button className="btn bg-blue-600 text-white px-4 mr-2" onClick={exportCSV}>Export CSV</button>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold text-green-800 mb-2">Sales History</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {sales.map((s, i) => (
              <span key={i} className="bg-green-100 text-green-800 rounded px-3 py-1 text-sm">{s}</span>
            ))}
          </div>
        </div>
        <Link to="/" className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl shadow-md transition-all mt-4">Back to Tool Hub</Link>
      </div>
    </div>
  );
};

export default SalesPerformanceTracker; 