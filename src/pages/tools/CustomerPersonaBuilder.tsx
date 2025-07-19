import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CustomerPersonaBuilder: React.FC = () => {
  const [persona, setPersona] = useState({
    name: '',
    age: '',
    interests: '',
    motivation: '',
    painPoints: '',
    behavior: '',
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-blue-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-orange-900 mb-4">Customer Persona Builder</h1>
        <div className="space-y-4 mb-6">
          <input className="input w-full" placeholder="Name" value={persona.name} onChange={e => setPersona({ ...persona, name: e.target.value })} />
          <input className="input w-full" placeholder="Age" value={persona.age} onChange={e => setPersona({ ...persona, age: e.target.value })} />
          <input className="input w-full" placeholder="Interests" value={persona.interests} onChange={e => setPersona({ ...persona, interests: e.target.value })} />
          <input className="input w-full" placeholder="Buying Motivation" value={persona.motivation} onChange={e => setPersona({ ...persona, motivation: e.target.value })} />
          <input className="input w-full" placeholder="Pain Points" value={persona.painPoints} onChange={e => setPersona({ ...persona, painPoints: e.target.value })} />
          <input className="input w-full" placeholder="Behavioral Traits" value={persona.behavior} onChange={e => setPersona({ ...persona, behavior: e.target.value })} />
        </div>
        <div className="mb-4">
          <div className="inline-block bg-orange-200 rounded-xl px-6 py-4 shadow-lg text-left w-full max-w-xs">
            <div className="text-lg font-bold text-orange-900">{persona.name || 'Persona Name'}</div>
            <div className="text-sm text-orange-700">Age: {persona.age || '-'}</div>
            <div className="text-sm text-orange-800 mt-2">Interests: {persona.interests || '-'}</div>
            <div className="text-sm text-orange-800">Motivation: {persona.motivation || '-'}</div>
            <div className="text-sm text-orange-800">Pain Points: {persona.painPoints || '-'}</div>
            <div className="text-xs text-orange-900 mt-2">Behavior: {persona.behavior || '-'}</div>
          </div>
        </div>
        <Link to="/" className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl shadow-md transition-all mt-4">Back to Tool Hub</Link>
      </div>
    </div>
  );
};

export default CustomerPersonaBuilder; 