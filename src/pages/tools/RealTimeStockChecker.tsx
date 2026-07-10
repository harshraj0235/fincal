import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const mockStock = [
  { name: 'Product A', quantity: 12 },
  { name: 'Product B', quantity: 0 },
  { name: 'Product C', quantity: 5 },
];

const RealTimeStockChecker: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ name: string; quantity: number } | null>(null);

  const checkStock = () => {
    const found = mockStock.find(p => p.name.toLowerCase() === query.toLowerCase());
    setResult(found || { name: query, quantity: Math.floor(Math.random() * 20) });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-blue-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-yellow-900 mb-4">Real-time Stock Checker</h1>
        <div className="space-y-4 mb-6">
          <input type="text" className="input w-full" placeholder="Product Name or Barcode" value={query} onChange={e => setQuery(e.target.value)} />
          <button className="btn bg-yellow-600 text-white w-full hover:bg-yellow-700 transition-all" onClick={checkStock}>Check Stock</button>
        </div>
        {result && (
          <div className="mb-4">
            <div className="text-lg text-yellow-800 font-semibold">{result.name}</div>
            <div className={result.quantity > 0 ? 'text-green-700 font-semibold' : 'text-red-600 font-semibold'}>
              {result.quantity > 0 ? `In Stock: ${result.quantity}` : 'Out of Stock'}
            </div>
          </div>
        )}
        <Link to="/" className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl shadow-md transition-all mt-4">Back to Tool Hub</Link>
      </div>
    </div>
  );
};

export default RealTimeStockChecker; 
