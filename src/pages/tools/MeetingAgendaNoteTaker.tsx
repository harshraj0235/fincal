import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface AgendaItem {
  title: string;
  notes: string;
  followUp: string;
  expanded: boolean;
}

const MeetingAgendaNoteTaker: React.FC = () => {
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [newTitle, setNewTitle] = useState('');

  const addAgenda = () => {
    if (!newTitle.trim()) return;
    setAgenda([...agenda, { title: newTitle, notes: '', followUp: '', expanded: false }]);
    setNewTitle('');
  };

  const updateAgenda = (idx: number, field: keyof AgendaItem, value: string) => {
    setAgenda(agenda.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const toggleExpand = (idx: number) => {
    setAgenda(agenda.map((item, i) => i === idx ? { ...item, expanded: !item.expanded } : item));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-indigo-900 mb-4">Meeting Agenda & Note Taker</h1>
        <div className="flex gap-2 mb-4">
          <input className="input flex-1" placeholder="Add agenda item" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
          <button className="btn bg-indigo-600 text-white px-4" onClick={addAgenda}>Add</button>
        </div>
        <div className="space-y-4 text-left">
          {agenda.map((item, idx) => (
            <div key={idx} className="bg-indigo-50 rounded-xl p-4">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(idx)}>
                <span className="font-semibold text-indigo-900">{item.title}</span>
                <span className="text-indigo-600">{item.expanded ? '▲' : '▼'}</span>
              </div>
              {item.expanded && (
                <div className="mt-2 space-y-2">
                  <textarea className="input w-full" rows={2} placeholder="Notes" value={item.notes} onChange={e => updateAgenda(idx, 'notes', e.target.value)} />
                  <input className="input w-full" placeholder="Follow-up action" value={item.followUp} onChange={e => updateAgenda(idx, 'followUp', e.target.value)} />
                </div>
              )}
            </div>
          ))}
        </div>
        <Link to="/" className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl shadow-md transition-all mt-6">Back to Tool Hub</Link>
      </div>
    </div>
  );
};

export default MeetingAgendaNoteTaker; 
