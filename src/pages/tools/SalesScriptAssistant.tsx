import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const steps = [
  { key: 'opening', label: 'Opening', suggestion: 'Start with a friendly greeting and introduce yourself.' },
  { key: 'objection', label: 'Objection Handling', suggestion: 'Address common concerns or objections.' },
  { key: 'closing', label: 'Closing', suggestion: 'Summarize benefits and ask for the sale or next step.' },
];

const SalesScriptAssistant: React.FC = () => {
  const [script, setScript] = useState({ opening: '', objection: '', closing: '' });

  const completed = Object.values(script).filter(Boolean).length;
  const confidence = Math.round((completed / steps.length) * 100);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-pink-900 mb-4">Sales Script Assistant</h1>
        <div className="mb-4">
          <div className="w-full bg-pink-200 rounded-full h-3 mb-2">
            <div className="bg-pink-600 h-3 rounded-full transition-all" style={{ width: `${confidence}%` }}></div>
          </div>
          <div className="text-xs text-pink-700">Confidence Meter: {confidence}%</div>
        </div>
        <div className="space-y-6 mb-6 text-left">
          {steps.map(step => (
            <div key={step.key} className="bg-pink-50 rounded-xl p-4">
              <div className="font-semibold text-pink-900 mb-1">{step.label}</div>
              <div className="text-xs text-pink-700 mb-2">Suggestion: {step.suggestion}</div>
              <textarea className="input w-full" rows={2} placeholder={step.suggestion} value={script[step.key as keyof typeof script]} onChange={e => setScript({ ...script, [step.key]: e.target.value })} />
            </div>
          ))}
        </div>
        <Link to="/" className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl shadow-md transition-all mt-4">Back to Tool Hub</Link>
      </div>
    </div>
  );
};

export default SalesScriptAssistant; 
