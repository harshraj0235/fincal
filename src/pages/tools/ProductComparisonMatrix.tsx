import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const defaultProducts = [
  { name: '', price: '', features: ['', '', '', '', ''] },
  { name: '', price: '', features: ['', '', '', '', ''] },
  { name: '', price: '', features: ['', '', '', '', ''] },
];

const ProductComparisonMatrix: React.FC = () => {
  const [products, setProducts] = useState(defaultProducts);
  const [highlightDiffs, setHighlightDiffs] = useState(false);

  const handleChange = (i: number, field: string, value: string, featureIdx?: number) => {
    setProducts(prev => prev.map((p, idx) => {
      if (idx !== i) return p;
      if (field === 'features' && featureIdx !== undefined) {
        const newFeatures = [...p.features];
        newFeatures[featureIdx] = value;
        return { ...p, features: newFeatures };
      }
      return { ...p, [field]: value };
    }));
  };

  // Find which features differ
  const featureDiffs = (idx: number) => {
    const values = products.map(p => p.features[idx]);
    return new Set(values).size > 1;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl w-full text-center">
        <h1 className="text-2xl font-bold text-purple-900 mb-4">Product Comparison Matrix</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {products.map((product, i) => (
            <div key={i} className="flex-1 bg-purple-50 rounded-xl p-4">
              <input className="input w-full mb-2" placeholder={`Product ${i+1} Name`} value={product.name} onChange={e => handleChange(i, 'name', e.target.value)} />
              <input className="input w-full mb-2" placeholder="Price" type="number" value={product.price} onChange={e => handleChange(i, 'price', e.target.value)} />
              {product.features.map((f, j) => (
                <input key={j} className="input w-full mb-1" placeholder={`Feature ${j+1}`} value={f} onChange={e => handleChange(i, 'features', e.target.value, j)} />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <input type="checkbox" id="highlightDiffs" checked={highlightDiffs} onChange={e => setHighlightDiffs(e.target.checked)} />
          <label htmlFor="highlightDiffs" className="text-sm text-purple-700">Highlight Differences</label>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-purple-200 rounded-xl">
            <thead>
              <tr className="bg-purple-100">
                <th className="p-2">Feature</th>
                {products.map((p, i) => (
                  <th key={i} className="p-2">{p.name || `Product ${i+1}`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 font-semibold">Price</td>
                {products.map((p, i) => (
                  <td key={i} className="p-2">{p.price}</td>
                ))}
              </tr>
              {[0,1,2,3,4].map(idx => (
                <tr key={idx} className={highlightDiffs && featureDiffs(idx) ? 'bg-yellow-100' : ''}>
                  <td className="p-2 font-semibold">Feature {idx+1}</td>
                  {products.map((p, i) => (
                    <td key={i} className="p-2">{p.features[idx]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/" className="btn bg-purple-600 text-white hover:bg-purple-700 px-6 py-2 rounded-xl shadow-md transition-all mt-6">Back to Tool Hub</Link>
      </div>
    </div>
  );
};

export default ProductComparisonMatrix; 