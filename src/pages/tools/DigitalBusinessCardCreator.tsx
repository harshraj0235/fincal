import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DigitalBusinessCardCreator: React.FC = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [social, setSocial] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-cyan-900 mb-4">Digital Business Card Creator</h1>
        <div className="space-y-4 mb-6">
          <input className="input w-full" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input className="input w-full" placeholder="Job Title" value={title} onChange={e => setTitle(e.target.value)} />
          <input className="input w-full" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
          <input className="input w-full" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="input w-full" placeholder="Social Link (LinkedIn, etc.)" value={social} onChange={e => setSocial(e.target.value)} />
        </div>
        <div className="mb-4">
          <div className="inline-block bg-cyan-200 rounded-xl px-6 py-4 shadow-lg text-left w-full max-w-xs">
            <div className="text-lg font-bold text-cyan-900">{name || 'Your Name'}</div>
            <div className="text-sm text-cyan-700">{title || 'Job Title'}</div>
            <div className="text-sm text-cyan-800 mt-2">{phone || 'Phone'}</div>
            <div className="text-sm text-cyan-800">{email || 'Email'}</div>
            <div className="text-xs text-cyan-900 mt-2">{social || 'Social Link'}</div>
          </div>
        </div>
        <Link to="/" className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl shadow-md transition-all mt-4">Back to Tool Hub</Link>
      </div>
    </div>
  );
};

export default DigitalBusinessCardCreator; 
