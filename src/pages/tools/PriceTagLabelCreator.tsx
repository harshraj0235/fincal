import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PriceTagLabelCreator: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');

  const discountedPrice = price && discount ? (parseFloat(price) - (parseFloat(price) * parseFloat(discount) / 100)).toFixed(2) : '';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-pink-900 mb-4">Price Tag/Label Creator</h1>
        <div className="space-y-4 mb-6">
          <input type="text" className="input w-full" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} />
          <input type="number" className="input w-full" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
          <input type="number" className="input w-full" placeholder="Discount (%)" value={discount} onChange={e => setDiscount(e.target.value)} />
        </div>
        <div className="mb-4">
          <div className="inline-block bg-pink-200 rounded-xl px-6 py-4 shadow-lg text-left">
            <div className="text-lg font-bold text-pink-900">{name || 'Product Name'}</div>
            <div className="text-2xl font-bold text-pink-700">₹{discountedPrice || price || '0.00'}</div>
            {discount && <div className="text-sm text-pink-600 line-through">₹{price}</div>}
            {discount && <div className="text-xs text-pink-800 font-semibold">{discount}% OFF</div>}
          </div>
        </div>
        <Link to="/" className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl shadow-md transition-all mt-4">Back to Tool Hub</Link>
      </div>
    </div>
  );
};

export default PriceTagLabelCreator; 