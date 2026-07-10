import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const QRCodeGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  const generateQR = () => {
    if (!input.trim()) return;
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(input)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">QR Code Generator</h1>
        <div className="space-y-4 mb-6">
          <input className="input w-full" placeholder="Enter URL or text" value={input} onChange={e => setInput(e.target.value)} />
          <button className="btn bg-gray-600 text-white w-full hover:bg-gray-700 transition-all" onClick={generateQR}>Generate QR Code</button>
        </div>
        {qrUrl && (
          <div className="mb-4 flex flex-col items-center">
            <img src={qrUrl} alt="QR Code" className="mx-auto rounded-lg border border-gray-200" width={200} height={200} />
            <a href={qrUrl} download="qrcode.png" className="text-blue-600 text-xs mt-2">Download QR</a>
          </div>
        )}
        <Link to="/" className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl shadow-md transition-all mt-4">Back to Tool Hub</Link>
      </div>
    </div>
  );
};

export default QRCodeGenerator; 
