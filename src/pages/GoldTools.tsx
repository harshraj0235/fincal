import React, { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';
import { goldTools, GoldToolType } from '../data/goldTools';
import ToolArticle from '../components/ToolArticle';

const GoldTools: React.FC = () => {
  // Filters
  const [query, setQuery] = useState('');
  const [activeTypes, setActiveTypes] = useState<GoldToolType[]>([]);
  const [sortBy, setSortBy] = useState<'az' | 'za'>('az');

  const allTypes = useMemo(() => Array.from(new Set(goldTools.map(t => t.type))), []);
  const filteredTools = useMemo(() => {
    let list = goldTools.filter(t => {
      const q = query.trim().toLowerCase();
      const matchesQuery = q.length === 0 || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
      const matchesType = activeTypes.length === 0 || activeTypes.includes(t.type);
      return matchesQuery && matchesType;
    });
    list = list.sort((a, b) => sortBy === 'az' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    return list;
  }, [query, activeTypes, sortBy]);

  const toggleType = (type: GoldToolType) => {
    setActiveTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const clearFilters = () => { setQuery(''); setActiveTypes([]); setSortBy('az'); };

  return (
    <>
      <SEOHelmet
        title="Gold Tools Hub – Purity, SIP, SGB, Value & More | MoneyCal.in"
        description="Free gold calculators for purity conversion, weight conversion, value estimation, SIP and lumpsum returns, SGB interest, jewellery invoice (making charges + GST), and more."
        keywords="gold calculator india, gold sip, sovereign gold bond interest, gold purity karat to fineness, gold value calculator, jewellery making charges gst, gold etf vs physical"
        url="/gold-tools"
        type="website"
        image="/android-chrome-512x512.png"
        tags={["gold", "jewellery", "SGB", "ETF", "SIP"]}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Gold Tools', url: '/gold-tools' }
        ]}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": filteredTools.map((t, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": t.name,
              "url": `https://moneycal.in/gold-tools/${t.slug}`
            }))
          }
        ]}
      />
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Gold Tools Hub</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">Calculate purity, convert weights, estimate value, compare ETF vs physical, compute SGB interest, and plan SIP/lumpsum investments in gold.</p>
          </div>

          {/* Filters & Search */}
          <div className="bg-white/80 backdrop-blur-md border border-amber-100 rounded-2xl p-4 mb-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div>
                <label className="block text-sm font-semibold text-amber-800 mb-1">Search tools</label>
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or feature..." className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-800 mb-1">Filter by type</label>
                <div className="flex flex-wrap gap-2">
                  {allTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleType(t)}
                      className={`px-3 py-1 rounded-full border text-sm ${activeTypes.includes(t) ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-50'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-800 mb-1">Sort</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'az' | 'za')} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400">
                  <option value="az">A → Z</option>
                  <option value="za">Z → A</option>
                </select>
              </div>
            </div>
            {(query || activeTypes.length > 0 || sortBy !== 'az') && (
              <div className="mt-3 text-right">
                <button onClick={clearFilters} className="text-sm text-amber-700 underline">Clear filters</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((t, index) => (
              <motion.div key={t.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.03 }}>
                <RouterLink to={`/gold-tools/${t.slug}`} className="group bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-amber-100 hover:border-amber-300 transform hover:-translate-y-2 transition-all block h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors">{t.name}</h3>
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 border border-amber-200">{t.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{t.description}</p>
                  <div className="mt-4 inline-flex items-center text-amber-700 font-semibold text-sm">Open tool →</div>
                </RouterLink>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <ToolArticle
              title="Gold Tools Hub"
              context={{
                name: 'Gold Tools',
                category: 'Gold Tools',
                keywords: [
                  'gold purity calculator india',
                  'gold value calculator per gram',
                  'gold sip calculator',
                  'sovereign gold bond interest calculator',
                  'gold etf vs physical calculator',
                  'gold jewellery making charges gst invoice'
                ]
              }}
              links={[
                { href: '/gold-tools/gold-purity-calculator', label: 'Gold Purity Calculator' },
                { href: '/gold-tools/gold-value-estimator', label: 'Gold Value Estimator' },
                { href: '/gold-tools/gold-sip-calculator', label: 'Gold SIP Calculator' }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GoldTools;


