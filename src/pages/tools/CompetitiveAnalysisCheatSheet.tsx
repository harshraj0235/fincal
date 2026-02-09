import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Competitor {
  name: string;
  price: string;
  features: string;
  strengths: string;
  weaknesses: string;
}

const CompetitiveAnalysisCheatSheet: React.FC = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [form, setForm] = useState<Competitor>({ name: '', price: '', features: '', strengths: '', weaknesses: '' });

  const addCompetitor = () => {
    if (!form.name.trim()) return;
    setCompetitors([...competitors, form]);
    setForm({ name: '', price: '', features: '', strengths: '', weaknesses: '' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-blue-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-2xl font-bold text-yellow-900 mb-4">Competitive Analysis Cheat Sheet</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input className="input w-full" placeholder="Competitor Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="input w-full" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <input className="input w-full md:col-span-2" placeholder="Features (comma separated)" value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} />
          <input className="input w-full" placeholder="Strengths" value={form.strengths} onChange={e => setForm({ ...form, strengths: e.target.value })} />
          <input className="input w-full" placeholder="Weaknesses" value={form.weaknesses} onChange={e => setForm({ ...form, weaknesses: e.target.value })} />
        </div>
        <button className="btn bg-yellow-600 text-white px-6 py-2 rounded-xl shadow-md transition-all mb-6" onClick={addCompetitor}>Add Competitor</button>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border border-yellow-200 rounded-xl">
            <thead>
              <tr className="bg-yellow-100">
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Features</th>
                <th className="p-2">Strengths</th>
                <th className="p-2">Weaknesses</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c, i) => (
                <tr key={i} className="bg-yellow-50">
                  <td className="p-2 font-semibold">{c.name}</td>
                  <td className="p-2">{c.price}</td>
                  <td className="p-2">{c.features}</td>
                  <td className="p-2">{c.strengths}</td>
                  <td className="p-2">{c.weaknesses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/" className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl shadow-md transition-all mt-4">Back to Tool Hub</Link>
      </div>
    </div>
  );
};

export default CompetitiveAnalysisCheatSheet; 