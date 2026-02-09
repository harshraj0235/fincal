import React, { useState } from 'react';

const COINS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'tether', symbol: 'USDT', name: 'Tether' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
];

const CryptoPriceConverter: React.FC = () => {
  const [coin, setCoin] = useState(COINS[0].id);
  const [amount, setAmount] = useState(1);
  const [inr, setInr] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPrice = async () => {
    setLoading(true);
    setError('');
    setInr('');
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=inr`
      );
      const data = await res.json();
      if (data[coin] && data[coin].inr) {
        setInr((data[coin].inr * amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' }));
      } else {
        setError('Price not available.');
      }
    } catch (e) {
      setError('Failed to fetch price.');
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-700 max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4 text-yellow-300 flex items-center gap-2">
        Convert Crypto to INR
      </h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <select
            className="bg-gray-800 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={coin}
            onChange={e => setCoin(e.target.value)}
          >
            {COINS.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.symbol})</option>
            ))}
          </select>
          <input
            type="number"
            min={0}
            step={0.0001}
            className="bg-gray-800 text-white rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            placeholder="Amount"
          />
          <button
            className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition-all"
            onClick={fetchPrice}
            disabled={loading}
          >
            Convert
          </button>
        </div>
        {loading && <div className="text-pink-400 mt-2">Loading...</div>}
        {error && <div className="text-red-400 mt-2">{error}</div>}
        {inr && !loading && !error && (
          <div className="text-2xl font-bold text-green-400 mt-4">
            {amount} {COINS.find(c => c.id === coin)?.symbol} = {inr}
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoPriceConverter; 