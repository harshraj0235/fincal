import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DiscountProfitCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [cost, setCost] = useState('');
  const [discount, setDiscount] = useState('');
  const [result, setResult] = useState<{ sellingPrice: number; profitMargin: number } | null>(null);

  const calculate = () => {
    const op = parseFloat(originalPrice);
    const c = parseFloat(cost);
    const d = parseFloat(discount);
    if (isNaN(op) || isNaN(c) || isNaN(d)) return;
    const sellingPrice = op - (op * d) / 100;
    const profitMargin = ((sellingPrice - c) / sellingPrice) * 100;
    setResult({ sellingPrice, profitMargin });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-900 mb-4">Instant Discount & Profit Calculator</h1>
        <div className="space-y-4 mb-6">
          <input type="number" className="input w-full" placeholder="Original Price" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} />
          <input type="number" className="input w-full" placeholder="Cost" value={cost} onChange={e => setCost(e.target.value)} />
          <input type="number" className="input w-full" placeholder="Discount (%)" value={discount} onChange={e => setDiscount(e.target.value)} />
          <button className="btn bg-green-600 text-white w-full hover:bg-green-700 transition-all" onClick={calculate}>Calculate</button>
        </div>
        {result && (
          <div className="mb-4">
            <div className="text-lg text-green-800 font-semibold">Selling Price: ₹{result.sellingPrice.toFixed(2)}</div>
            <div className="text-lg text-blue-800 font-semibold">Profit Margin: {result.profitMargin.toFixed(2)}%</div>
          </div>
        )}
        <Link to="/" className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl shadow-md transition-all mt-4">Back to Tool Hub</Link>
      </div>
    </div>
  );
};

export default DiscountProfitCalculator; 