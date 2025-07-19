import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OfferProposalTemplateBuilder: React.FC = () => {
  const [form, setForm] = useState({
    client: '',
    product: '',
    price: '',
    terms: '',
    notes: '',
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-purple-900 mb-4">Offer/Proposal Template Builder</h1>
        <div className="space-y-4 mb-6">
          <input className="input w-full" placeholder="Client Name" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} />
          <input className="input w-full" placeholder="Product/Service" value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} />
          <input className="input w-full" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <input className="input w-full" placeholder="Terms" value={form.terms} onChange={e => setForm({ ...form, terms: e.target.value })} />
          <textarea className="input w-full" placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
        </div>
        <div className="mb-4">
          <div className="bg-purple-50 rounded-xl p-6 text-left max-w-md mx-auto shadow-lg">
            <div className="text-lg font-bold text-purple-900 mb-2">Proposal for {form.client || 'Client Name'}</div>
            <div className="mb-1"><span className="font-semibold">Product/Service:</span> {form.product || '-'}</div>
            <div className="mb-1"><span className="font-semibold">Price:</span> {form.price || '-'}</div>
            <div className="mb-1"><span className="font-semibold">Terms:</span> {form.terms || '-'}</div>
            <div className="mb-1"><span className="font-semibold">Notes:</span> {form.notes || '-'}</div>
          </div>
        </div>
        <Link to="/" className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl shadow-md transition-all mt-4">Back to Tool Hub</Link>
      </div>
    </div>
  );
};

export default OfferProposalTemplateBuilder; 