import React, { useState, useMemo } from 'react';
import { cryptoBlogs } from '../data/crypto';
import SEOHelmet from '../components/SEOHelmet';
import { Link } from 'react-router-dom';
import { Search, Bitcoin, Shield, Zap } from 'lucide-react';
import CryptoPriceConverter from '../components/CryptoPriceConverter';

const CryptoSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(cryptoBlogs.map(a => a.category)));
    return cats;
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return cryptoBlogs.filter(blog => {
      const matchesSearch =
        !searchTerm ||
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory =
        selectedCategory === null || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      <SEOHelmet
        title="Crypto in India: News, Guides, Tools & Regulation (2024)"
        description="Explore the latest crypto news, guides, and tools for Indian investors. Stay updated on regulations, tax, and compliance. Unique insights and calculators for the Indian crypto community."
        keywords="crypto india, cryptocurrency news, crypto regulation india, bitcoin india, crypto tax, crypto tools, blockchain india"
        url="/crypto"
        type="website"
        image="/images/crypto-banner.jpg"
        tags={["crypto india", "bitcoin", "crypto regulation", "crypto tools"]}
      />
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 py-12 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center gap-3">
            <Bitcoin className="inline-block h-10 w-10 text-yellow-300 animate-spin-slow" />
            Crypto in India
          </h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90 font-medium">
            Latest news, guides, and tools for Indian crypto investors. Stay ahead in the world of digital assets!
          </p>
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search crypto articles, tools, or keywords..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Search Crypto"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm ${selectedCategory === null ? 'bg-yellow-400 text-black shadow-lg' : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'}`}
            aria-pressed={selectedCategory === null}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm ${selectedCategory === cat ? 'bg-pink-500 text-white shadow-lg' : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'}`}
              aria-pressed={selectedCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map(blog => (
            <div key={blog.id} className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:border-yellow-400 transition-all">
              <div className="w-full h-48 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-lg mb-4 border-4 border-gray-900 flex items-center justify-center">
                <Bitcoin className="h-16 w-16 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-yellow-300">{blog.title}</h2>
              <p className="text-gray-200 mb-4">{blog.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-pink-400" />
                <span className="text-sm text-pink-300">{blog.category}</span>
                <span className="text-sm text-gray-400 ml-auto">{blog.readTime}</span>
              </div>
              <Link to={`/crypto/${blog.slug}`} className="inline-block mt-2 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-full shadow hover:bg-yellow-300 transition-all">पढ़ें</Link>
            </div>
          ))}
        </div>
        {/* Crypto Tool */}
        <div className="mt-16">
          <h2 className="text-3xl font-extrabold mb-4 flex items-center gap-2">
            <Shield className="h-8 w-8 text-green-400" /> Crypto Price Converter (INR)
          </h2>
          <CryptoPriceConverter />
        </div>
      </div>
    </div>
  );
};

export default CryptoSection; 