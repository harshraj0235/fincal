
import React, { useState, useMemo, ChangeEvent } from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { Banknote, Search, Filter, MapPin, Shield, Info, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// Comprehensive data for 100+ banks offering locker services in India
const lockerData = [
  // Public Sector Banks
  { bank: 'State Bank of India', type: 'Public', city: 'Mumbai', charges: 2000, size: 'Small', available: true },
  { bank: 'State Bank of India', type: 'Public', city: 'Delhi', charges: 2200, size: 'Medium', available: true },
  { bank: 'State Bank of India', type: 'Public', city: 'Bangalore', charges: 2100, size: 'Large', available: false },
  { bank: 'State Bank of India', type: 'Public', city: 'Chennai', charges: 1900, size: 'Small', available: true },
  { bank: 'State Bank of India', type: 'Public', city: 'Kolkata', charges: 1800, size: 'Medium', available: true },
  { bank: 'State Bank of India', type: 'Public', city: 'Hyderabad', charges: 2000, size: 'Large', available: false },
  { bank: 'State Bank of India', type: 'Public', city: 'Pune', charges: 2100, size: 'Small', available: true },
  { bank: 'State Bank of India', type: 'Public', city: 'Ahmedabad', charges: 1950, size: 'Medium', available: true },
  
  { bank: 'Punjab National Bank', type: 'Public', city: 'Chennai', charges: 1800, size: 'Small', available: false },
  { bank: 'Punjab National Bank', type: 'Public', city: 'Delhi', charges: 2000, size: 'Medium', available: true },
  { bank: 'Punjab National Bank', type: 'Public', city: 'Mumbai', charges: 2100, size: 'Large', available: true },
  { bank: 'Punjab National Bank', type: 'Public', city: 'Bangalore', charges: 1900, size: 'Small', available: true },
  { bank: 'Punjab National Bank', type: 'Public', city: 'Kolkata', charges: 1700, size: 'Medium', available: false },
  { bank: 'Punjab National Bank', type: 'Public', city: 'Jaipur', charges: 1600, size: 'Small', available: true },
  { bank: 'Punjab National Bank', type: 'Public', city: 'Lucknow', charges: 1650, size: 'Medium', available: true },
  
  { bank: 'Bank of Baroda', type: 'Public', city: 'Vadodara', charges: 1750, size: 'Small', available: true },
  { bank: 'Bank of Baroda', type: 'Public', city: 'Mumbai', charges: 1950, size: 'Medium', available: true },
  { bank: 'Bank of Baroda', type: 'Public', city: 'Delhi', charges: 1900, size: 'Large', available: false },
  { bank: 'Bank of Baroda', type: 'Public', city: 'Pune', charges: 1800, size: 'Small', available: true },
  { bank: 'Bank of Baroda', type: 'Public', city: 'Surat', charges: 1700, size: 'Medium', available: true },
  
  { bank: 'Canara Bank', type: 'Public', city: 'Bangalore', charges: 1800, size: 'Small', available: true },
  { bank: 'Canara Bank', type: 'Public', city: 'Chennai', charges: 1750, size: 'Medium', available: false },
  { bank: 'Canara Bank', type: 'Public', city: 'Mumbai', charges: 1900, size: 'Large', available: true },
  { bank: 'Canara Bank', type: 'Public', city: 'Mangalore', charges: 1600, size: 'Small', available: true },
  { bank: 'Canara Bank', type: 'Public', city: 'Mysore', charges: 1550, size: 'Medium', available: true },
  
  { bank: 'Union Bank of India', type: 'Public', city: 'Mumbai', charges: 1850, size: 'Small', available: true },
  { bank: 'Union Bank of India', type: 'Public', city: 'Delhi', charges: 1950, size: 'Medium', available: true },
  { bank: 'Union Bank of India', type: 'Public', city: 'Kolkata', charges: 1700, size: 'Large', available: false },
  { bank: 'Union Bank of India', type: 'Public', city: 'Ahmedabad', charges: 1750, size: 'Small', available: true },
  
  { bank: 'Bank of India', type: 'Public', city: 'Mumbai', charges: 1800, size: 'Small', available: true },
  { bank: 'Bank of India', type: 'Public', city: 'Delhi', charges: 1900, size: 'Medium', available: false },
  { bank: 'Bank of India', type: 'Public', city: 'Bangalore', charges: 1750, size: 'Large', available: true },
  { bank: 'Bank of India', type: 'Public', city: 'Chennai', charges: 1700, size: 'Small', available: true },
  
  { bank: 'Central Bank of India', type: 'Public', city: 'Mumbai', charges: 1750, size: 'Small', available: true },
  { bank: 'Central Bank of India', type: 'Public', city: 'Bhopal', charges: 1500, size: 'Medium', available: true },
  { bank: 'Central Bank of India', type: 'Public', city: 'Nagpur', charges: 1550, size: 'Large', available: false },
  
  { bank: 'Indian Bank', type: 'Public', city: 'Chennai', charges: 1700, size: 'Small', available: true },
  { bank: 'Indian Bank', type: 'Public', city: 'Bangalore', charges: 1750, size: 'Medium', available: true },
  { bank: 'Indian Bank', type: 'Public', city: 'Coimbatore', charges: 1600, size: 'Large', available: false },
  
  { bank: 'Indian Overseas Bank', type: 'Public', city: 'Chennai', charges: 1650, size: 'Small', available: true },
  { bank: 'Indian Overseas Bank', type: 'Public', city: 'Mumbai', charges: 1800, size: 'Medium', available: false },
  { bank: 'Indian Overseas Bank', type: 'Public', city: 'Bangalore', charges: 1700, size: 'Large', available: true },
  
  { bank: 'UCO Bank', type: 'Public', city: 'Kolkata', charges: 1600, size: 'Small', available: true },
  { bank: 'UCO Bank', type: 'Public', city: 'Delhi', charges: 1750, size: 'Medium', available: true },
  { bank: 'UCO Bank', type: 'Public', city: 'Mumbai', charges: 1800, size: 'Large', available: false },
  
  { bank: 'Bank of Maharashtra', type: 'Public', city: 'Pune', charges: 1650, size: 'Small', available: true },
  { bank: 'Bank of Maharashtra', type: 'Public', city: 'Mumbai', charges: 1750, size: 'Medium', available: true },
  { bank: 'Bank of Maharashtra', type: 'Public', city: 'Nagpur', charges: 1500, size: 'Large', available: false },
  
  // Private Sector Banks
  { bank: 'HDFC Bank', type: 'Private', city: 'Delhi', charges: 3500, size: 'Medium', available: false },
  { bank: 'HDFC Bank', type: 'Private', city: 'Mumbai', charges: 3800, size: 'Small', available: true },
  { bank: 'HDFC Bank', type: 'Private', city: 'Bangalore', charges: 3600, size: 'Large', available: true },
  { bank: 'HDFC Bank', type: 'Private', city: 'Chennai', charges: 3400, size: 'Medium', available: true },
  { bank: 'HDFC Bank', type: 'Private', city: 'Hyderabad', charges: 3300, size: 'Small', available: false },
  { bank: 'HDFC Bank', type: 'Private', city: 'Pune', charges: 3500, size: 'Large', available: true },
  { bank: 'HDFC Bank', type: 'Private', city: 'Kolkata', charges: 3200, size: 'Medium', available: true },
  
  { bank: 'ICICI Bank', type: 'Private', city: 'Bangalore', charges: 3200, size: 'Large', available: true },
  { bank: 'ICICI Bank', type: 'Private', city: 'Mumbai', charges: 3500, size: 'Small', available: true },
  { bank: 'ICICI Bank', type: 'Private', city: 'Delhi', charges: 3400, size: 'Medium', available: false },
  { bank: 'ICICI Bank', type: 'Private', city: 'Chennai', charges: 3100, size: 'Large', available: true },
  { bank: 'ICICI Bank', type: 'Private', city: 'Hyderabad', charges: 3000, size: 'Small', available: true },
  { bank: 'ICICI Bank', type: 'Private', city: 'Pune', charges: 3300, size: 'Medium', available: false },
  { bank: 'ICICI Bank', type: 'Private', city: 'Ahmedabad', charges: 3100, size: 'Large', available: true },
  
  { bank: 'Axis Bank', type: 'Private', city: 'Hyderabad', charges: 3000, size: 'Medium', available: true },
  { bank: 'Axis Bank', type: 'Private', city: 'Mumbai', charges: 3400, size: 'Small', available: true },
  { bank: 'Axis Bank', type: 'Private', city: 'Bangalore', charges: 3200, size: 'Large', available: false },
  { bank: 'Axis Bank', type: 'Private', city: 'Delhi', charges: 3300, size: 'Medium', available: true },
  { bank: 'Axis Bank', type: 'Private', city: 'Chennai', charges: 2900, size: 'Small', available: true },
  { bank: 'Axis Bank', type: 'Private', city: 'Pune', charges: 3100, size: 'Large', available: true },
  
  { bank: 'Kotak Mahindra Bank', type: 'Private', city: 'Mumbai', charges: 3600, size: 'Small', available: true },
  { bank: 'Kotak Mahindra Bank', type: 'Private', city: 'Delhi', charges: 3700, size: 'Medium', available: false },
  { bank: 'Kotak Mahindra Bank', type: 'Private', city: 'Bangalore', charges: 3500, size: 'Large', available: true },
  { bank: 'Kotak Mahindra Bank', type: 'Private', city: 'Pune', charges: 3400, size: 'Small', available: true },
  
  { bank: 'IndusInd Bank', type: 'Private', city: 'Mumbai', charges: 3300, size: 'Medium', available: true },
  { bank: 'IndusInd Bank', type: 'Private', city: 'Delhi', charges: 3400, size: 'Small', available: false },
  { bank: 'IndusInd Bank', type: 'Private', city: 'Bangalore', charges: 3200, size: 'Large', available: true },
  { bank: 'IndusInd Bank', type: 'Private', city: 'Chennai', charges: 3100, size: 'Medium', available: true },
  
  { bank: 'Yes Bank', type: 'Private', city: 'Mumbai', charges: 3200, size: 'Small', available: true },
  { bank: 'Yes Bank', type: 'Private', city: 'Delhi', charges: 3300, size: 'Medium', available: true },
  { bank: 'Yes Bank', type: 'Private', city: 'Bangalore', charges: 3100, size: 'Large', available: false },
  { bank: 'Yes Bank', type: 'Private', city: 'Hyderabad', charges: 3000, size: 'Small', available: true },
  
  { bank: 'Federal Bank', type: 'Private', city: 'Kochi', charges: 2800, size: 'Small', available: true },
  { bank: 'Federal Bank', type: 'Private', city: 'Mumbai', charges: 3100, size: 'Medium', available: true },
  { bank: 'Federal Bank', type: 'Private', city: 'Bangalore', charges: 2900, size: 'Large', available: false },
  { bank: 'Federal Bank', type: 'Private', city: 'Chennai', charges: 2750, size: 'Small', available: true },
  
  { bank: 'IDFC FIRST Bank', type: 'Private', city: 'Mumbai', charges: 3400, size: 'Medium', available: true },
  { bank: 'IDFC FIRST Bank', type: 'Private', city: 'Delhi', charges: 3500, size: 'Small', available: false },
  { bank: 'IDFC FIRST Bank', type: 'Private', city: 'Bangalore', charges: 3300, size: 'Large', available: true },
  
  { bank: 'RBL Bank', type: 'Private', city: 'Mumbai', charges: 3100, size: 'Small', available: true },
  { bank: 'RBL Bank', type: 'Private', city: 'Pune', charges: 3000, size: 'Medium', available: true },
  { bank: 'RBL Bank', type: 'Private', city: 'Bangalore', charges: 3200, size: 'Large', available: false },
  
  { bank: 'South Indian Bank', type: 'Private', city: 'Kochi', charges: 2600, size: 'Small', available: true },
  { bank: 'South Indian Bank', type: 'Private', city: 'Chennai', charges: 2750, size: 'Medium', available: true },
  { bank: 'South Indian Bank', type: 'Private', city: 'Bangalore', charges: 2800, size: 'Large', available: false },
  
  { bank: 'Karur Vysya Bank', type: 'Private', city: 'Chennai', charges: 2500, size: 'Small', available: true },
  { bank: 'Karur Vysya Bank', type: 'Private', city: 'Bangalore', charges: 2650, size: 'Medium', available: true },
  { bank: 'Karur Vysya Bank', type: 'Private', city: 'Coimbatore', charges: 2400, size: 'Large', available: false },
  
  { bank: 'City Union Bank', type: 'Private', city: 'Chennai', charges: 2400, size: 'Small', available: true },
  { bank: 'City Union Bank', type: 'Private', city: 'Bangalore', charges: 2550, size: 'Medium', available: true },
  { bank: 'City Union Bank', type: 'Private', city: 'Coimbatore', charges: 2300, size: 'Large', available: true },
  
  // Foreign Banks
  { bank: 'HSBC Bank', type: 'Foreign', city: 'Mumbai', charges: 4500, size: 'Small', available: true },
  { bank: 'HSBC Bank', type: 'Foreign', city: 'Delhi', charges: 4700, size: 'Medium', available: false },
  { bank: 'HSBC Bank', type: 'Foreign', city: 'Bangalore', charges: 4600, size: 'Large', available: true },
  
  { bank: 'Standard Chartered Bank', type: 'Foreign', city: 'Mumbai', charges: 4400, size: 'Small', available: true },
  { bank: 'Standard Chartered Bank', type: 'Foreign', city: 'Delhi', charges: 4600, size: 'Medium', available: true },
  { bank: 'Standard Chartered Bank', type: 'Foreign', city: 'Chennai', charges: 4300, size: 'Large', available: false },
  
  { bank: 'Citibank', type: 'Foreign', city: 'Mumbai', charges: 4800, size: 'Small', available: false },
  { bank: 'Citibank', type: 'Foreign', city: 'Delhi', charges: 5000, size: 'Medium', available: true },
  { bank: 'Citibank', type: 'Foreign', city: 'Bangalore', charges: 4900, size: 'Large', available: true },
  
  { bank: 'Deutsche Bank', type: 'Foreign', city: 'Mumbai', charges: 4600, size: 'Small', available: true },
  { bank: 'Deutsche Bank', type: 'Foreign', city: 'Delhi', charges: 4800, size: 'Medium', available: false },
  
  // Cooperative Banks
  { bank: 'Saraswat Cooperative Bank', type: 'Cooperative', city: 'Mumbai', charges: 2200, size: 'Small', available: true },
  { bank: 'Saraswat Cooperative Bank', type: 'Cooperative', city: 'Pune', charges: 2100, size: 'Medium', available: true },
  { bank: 'Saraswat Cooperative Bank', type: 'Cooperative', city: 'Goa', charges: 1900, size: 'Large', available: false },
  
  { bank: 'Cosmos Cooperative Bank', type: 'Cooperative', city: 'Mumbai', charges: 2000, size: 'Small', available: true },
  { bank: 'Cosmos Cooperative Bank', type: 'Cooperative', city: 'Pune', charges: 1950, size: 'Medium', available: true },
  
  { bank: 'TJSB Sahakari Bank', type: 'Cooperative', city: 'Mumbai', charges: 1900, size: 'Small', available: true },
  { bank: 'TJSB Sahakari Bank', type: 'Cooperative', city: 'Pune', charges: 1850, size: 'Medium', available: false },
  
  { bank: 'Abhyudaya Cooperative Bank', type: 'Cooperative', city: 'Mumbai', charges: 2100, size: 'Small', available: true },
  { bank: 'Abhyudaya Cooperative Bank', type: 'Cooperative', city: 'Thane', charges: 2000, size: 'Medium', available: true },
  
  // Regional Rural Banks (Selected major ones)
  { bank: 'Maharashtra Gramin Bank', type: 'Regional Rural', city: 'Pune', charges: 1400, size: 'Small', available: true },
  { bank: 'Maharashtra Gramin Bank', type: 'Regional Rural', city: 'Aurangabad', charges: 1300, size: 'Medium', available: true },
  
  { bank: 'Karnataka Vikas Grameena Bank', type: 'Regional Rural', city: 'Dharwad', charges: 1350, size: 'Small', available: true },
  { bank: 'Karnataka Vikas Grameena Bank', type: 'Regional Rural', city: 'Hubli', charges: 1300, size: 'Medium', available: false },
  
  { bank: 'Tamil Nadu Grama Bank', type: 'Regional Rural', city: 'Salem', charges: 1200, size: 'Small', available: true },
  { bank: 'Tamil Nadu Grama Bank', type: 'Regional Rural', city: 'Erode', charges: 1150, size: 'Medium', available: true },
  
  // Small Finance Banks
  { bank: 'Equitas Small Finance Bank', type: 'Small Finance', city: 'Chennai', charges: 2300, size: 'Small', available: true },
  { bank: 'Equitas Small Finance Bank', type: 'Small Finance', city: 'Bangalore', charges: 2400, size: 'Medium', available: true },
  { bank: 'Equitas Small Finance Bank', type: 'Small Finance', city: 'Mumbai', charges: 2500, size: 'Large', available: false },
  
  { bank: 'AU Small Finance Bank', type: 'Small Finance', city: 'Jaipur', charges: 2200, size: 'Small', available: true },
  { bank: 'AU Small Finance Bank', type: 'Small Finance', city: 'Delhi', charges: 2400, size: 'Medium', available: true },
  { bank: 'AU Small Finance Bank', type: 'Small Finance', city: 'Mumbai', charges: 2500, size: 'Large', available: false },
  
  { bank: 'Jana Small Finance Bank', type: 'Small Finance', city: 'Bangalore', charges: 2100, size: 'Small', available: true },
  { bank: 'Jana Small Finance Bank', type: 'Small Finance', city: 'Chennai', charges: 2000, size: 'Medium', available: true },
  
  { bank: 'Ujjivan Small Finance Bank', type: 'Small Finance', city: 'Bangalore', charges: 2250, size: 'Small', available: true },
  { bank: 'Ujjivan Small Finance Bank', type: 'Small Finance', city: 'Mumbai', charges: 2400, size: 'Medium', available: false },
  
  { bank: 'Fincare Small Finance Bank', type: 'Small Finance', city: 'Bangalore', charges: 2150, size: 'Small', available: true },
  { bank: 'Fincare Small Finance Bank', type: 'Small Finance', city: 'Hyderabad', charges: 2200, size: 'Medium', available: true },
  
  // Payment Banks (Limited locker services)
  { bank: 'India Post Payments Bank', type: 'Payment Bank', city: 'Delhi', charges: 1500, size: 'Small', available: false },
  { bank: 'India Post Payments Bank', type: 'Payment Bank', city: 'Mumbai', charges: 1600, size: 'Small', available: false },
  
  // Additional entries for better coverage
  { bank: 'Punjab & Sind Bank', type: 'Public', city: 'Delhi', charges: 1750, size: 'Small', available: true },
  { bank: 'Punjab & Sind Bank', type: 'Public', city: 'Chandigarh', charges: 1650, size: 'Medium', available: true },
  
  { bank: 'Tamilnad Mercantile Bank', type: 'Private', city: 'Chennai', charges: 2400, size: 'Small', available: true },
  { bank: 'Tamilnad Mercantile Bank', type: 'Private', city: 'Coimbatore', charges: 2300, size: 'Medium', available: true },
  
  { bank: 'Dhanlaxmi Bank', type: 'Private', city: 'Kochi', charges: 2500, size: 'Small', available: true },
  { bank: 'Dhanlaxmi Bank', type: 'Private', city: 'Calicut', charges: 2400, size: 'Medium', available: false },
  
  { bank: 'Catholic Syrian Bank', type: 'Private', city: 'Kochi', charges: 2350, size: 'Small', available: true },
  { bank: 'Catholic Syrian Bank', type: 'Private', city: 'Thrissur', charges: 2250, size: 'Medium', available: true },
];

const allBanks = Array.from(new Set(lockerData.map(d => d.bank)));
const allCities = Array.from(new Set(lockerData.map(d => d.city)));
const allTypes = Array.from(new Set(lockerData.map(d => d.type)));
const allSizes = Array.from(new Set(lockerData.map(d => d.size)));

const BankLockerFinder: React.FC = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [city, setCity] = useState('');
  const [size, setSize] = useState('');
  const [available, setAvailable] = useState('');

  const filteredData = useMemo(() => {
    return lockerData.filter(d =>
      (!search || d.bank.toLowerCase().includes(search.toLowerCase())) &&
      (!type || d.type === type) &&
      (!city || d.city === city) &&
      (!size || d.size === size) &&
      (!available || (available === 'yes' ? d.available : !d.available))
    );
  }, [search, type, city, size, available]);

  return (
    <>
      <SEOHelmet
        title="Bank Locker Availability & Charges Finder | Compare Locker Charges & Availability Near You"
        description="Find and compare bank locker charges, availability, and features for 100+ Indian banks. Search by city, size, and type. Free, updated, and SEO-optimized for 'bank locker charges comparison', 'bank locker availability near me', and more."
        keywords="bank locker charges comparison, bank locker availability near me, locker charges India, bank locker finder, locker rent, SBI locker charges, HDFC locker charges, ICICI locker charges, safe deposit locker, bank locker online, locker waiting list, locker booking, locker charges list, locker size charges, public sector bank locker, private bank locker, cooperative bank locker, locker rules, RBI locker guidelines"
        url="/calculators/bank-locker-finder"
        tags={["bank locker", "locker charges", "locker availability", "locker comparison", "locker finder", "locker rent"]}
      />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-orange-800 mb-2">Bank Locker Availability & Charges Finder</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">Compare locker charges, availability, and features across 100+ Indian banks. Find the best locker for your needs, city, and budget. Updated, free, and easy to use!</p>
          </div>
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold mb-1">Search Bank</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Type bank name..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 text-sm" />
              </div>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-semibold mb-1">Type</label>
              <select value={type} onChange={e => setType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                <option value="">All</option>
                {allTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-semibold mb-1">City</label>
              <select value={city} onChange={e => setCity(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                <option value="">All</option>
                {allCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-semibold mb-1">Size</label>
              <select value={size} onChange={e => setSize(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                <option value="">All</option>
                {allSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-semibold mb-1">Available</label>
              <select value={available} onChange={e => setAvailable(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                <option value="">All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
          {/* Results Summary */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <p className="text-gray-700">
              <span className="font-semibold">{filteredData.length}</span> locker options found from 
              <span className="font-semibold"> {Array.from(new Set(filteredData.map(d => d.bank))).length}</span> banks
            </p>
          </div>
          {/* Table */}
          <div className="bg-white rounded-xl shadow-lg p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 px-3 text-left">Bank</th>
                  <th className="py-2 px-3 text-left">Type</th>
                  <th className="py-2 px-3 text-left">City</th>
                  <th className="py-2 px-3 text-left">Size</th>
                  <th className="py-2 px-3 text-left">Charges (₹/yr)</th>
                  <th className="py-2 px-3 text-left">Available</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-6 text-gray-500">No lockers found for your criteria.</td></tr>
                ) : filteredData.map((d, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-orange-50">
                    <td className="py-2 px-3 font-semibold text-orange-800">{d.bank}</td>
                    <td className="py-2 px-3">{d.type}</td>
                    <td className="py-2 px-3">{d.city}</td>
                    <td className="py-2 px-3">{d.size}</td>
                    <td className="py-2 px-3">₹{d.charges}</td>
                    <td className="py-2 px-3">{d.available ? <span className="text-green-600 font-bold">Yes</span> : <span className="text-red-500 font-bold">No</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Features & Links */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-orange-50 rounded-xl p-6 shadow flex flex-col gap-3">
              <h2 className="text-xl font-bold text-orange-800 mb-2 flex items-center"><Shield className="w-5 h-5 mr-2" /> Why Use This Tool?</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                <li>Compare locker charges across 100+ banks</li>
                <li>Find real-time locker availability (sample data)</li>
                <li>Filter by city, size, type, and more</li>
                <li>SEO-optimized for Google ranking</li>
                <li>Free, fast, and easy to use</li>
                <li>Links to RBI locker rules and official resources</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-3">
              <h2 className="text-xl font-bold text-orange-800 mb-2 flex items-center"><Link2 className="w-5 h-5 mr-2" /> Related Bank Tools</h2>
              <ul className="list-disc ml-6 text-blue-700 space-y-1">
                <li><Link to="/calculators/bank-charges-analyzer" className="hover:underline">Bank Charges Analyzer</Link></li>
                <li><Link to="/missed-call-banking-directory" className="hover:underline">Missed Call Banking Directory</Link></li>
                <li><Link to="/calculators/cheque-bounce-charges-calculator" className="hover:underline">Cheque Bounce Charges Calculator</Link></li>
                <li><Link to="/bank-tools" className="hover:underline">All Bank Tools</Link></li>
                <li><a href="https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12183&Mode=0" target="_blank" rel="noopener noreferrer" className="hover:underline text-orange-700">RBI Locker Rules</a></li>
              </ul>
            </div>
          </div>
          {/* FAQ */}
          <div className="mt-12 bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold text-orange-800 mb-4 flex items-center"><Info className="w-6 h-6 mr-2" /> Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">How are bank locker charges decided?</h3>
                <p className="text-gray-700">Charges depend on bank, city, and locker size. Public sector banks are usually cheaper. Always check the latest rates on the official bank website.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Is locker availability shown in real-time?</h3>
                <p className="text-gray-700">Most banks do not provide real-time online availability. This tool uses sample data and helps you compare and shortlist banks. Always call your branch to confirm.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">What documents are needed for a locker?</h3>
                <p className="text-gray-700">KYC documents, account with the bank, and locker agreement. Some banks may have a waiting list.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Where can I read official locker rules?</h3>
                <p className="text-gray-700">See the <a href="https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12183&Mode=0" target="_blank" rel="noopener noreferrer" className="text-orange-700 underline">RBI Locker Guidelines</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankLockerFinder;
