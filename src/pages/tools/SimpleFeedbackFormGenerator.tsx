import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SimpleFeedbackFormGenerator: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '', '']);

  const handleOptionChange = (idx: number, value: string) => {
    setOptions(options.map((opt, i) => (i === idx ? value : opt)));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-pink-900 mb-4">Simple Feedback Form Generator</h1>
        <div className="space-y-4 mb-6">
          <input className="input w-full" placeholder="Feedback Question" value={question} onChange={e => setQuestion(e.target.value)} />
          {options.map((opt, idx) => (
            <input key={idx} className="input w-full" placeholder={`Option ${idx + 1}`} value={opt} onChange={e => handleOptionChange(idx, e.target.value)} />
          ))}
        </div>
        <div className="mb-4">
          <div className="bg-pink-50 rounded-xl p-6 text-left max-w-md mx-auto shadow-lg">
            <div className="text-lg font-bold text-pink-900 mb-2">{question || 'Your feedback question here'}</div>
            <ul className="space-y-2">
              {options.filter(Boolean).map((opt, idx) => (
                <li key={idx} className="bg-white rounded px-4 py-2 border border-pink-200">{opt}</li>
              ))}
            </ul>
          </div>
        </div>
        <Link to="/" className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl shadow-md transition-all mt-4">Back to Tool Hub</Link>
      </div>
    </div>
  );
};

export default SimpleFeedbackFormGenerator; 
