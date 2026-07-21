import React, { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gift, Sparkles, PartyPopper, Calendar } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';

import { festivalList, FestivalToolType } from '../data/festivalTools';
import ToolArticle from '../components/ToolArticle';

const FestivalTools: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeTypes, setActiveTypes] = useState<FestivalToolType[]>([]);
  const [sortBy, setSortBy] = useState<'az' | 'za'>('az');

  const allTypes = useMemo(() => Array.from(new Set(festivalList.flatMap(f => f.tools.map(t => t.type)))), []);
  const filteredFestivals = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = festivalList.filter(f => {
      const matchesQuery = q.length === 0 || f.name.toLowerCase().includes(q) || f.tools.some(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
      const matchesType = activeTypes.length === 0 || f.tools.some(t => activeTypes.includes(t.type));
      return matchesQuery && matchesType;
    });
    list = list.sort((a, b) => sortBy === 'az' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    return list;
  }, [query, activeTypes, sortBy]);

  const toggleType = (type: FestivalToolType) => {
    setActiveTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const clearFilters = () => { setQuery(''); setActiveTypes([]); setSortBy('az'); };
  return (
    <>
      <SEOHelmet
        title="Festival Tools Hub – Budget, Travel, Electricity & More | MoneyCal.in"
        description="Explore festival-wise tools for Diwali, Holi, Navratri, Eid, Christmas, Onam and more. Plan budgets, calculate electricity and travel costs, fasting hours, Zakat, and download PDF reports."
        keywords="festival tools india, diwali budget Calculator, fasting hours, zakat Calculator, travel cost, electricity cost"
        url="/festival-tools"
        type="website"
        image="/images/festival-tools.jpg"
        tags={["festival", "india", "budget", "travel", "electricity", "fasting", "zakat"]}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Festival Tools', url: '/festival-tools' }
        ]}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": filteredFestivals.flatMap(f => f.tools.map((t, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": `${f.name} – ${t.name}`,
              "url": `/festival-tools/${f.slug}/${t.slug}`
            })))
          }
        ]}
      />
      <WhatsAppBanner />
      <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-3">
              <PartyPopper className="h-12 w-12 text-rose-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Festival Tools Hub</h1>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto">Plan budgets, travel, electricity, fasting hours, donations and more across India’s biggest festivals. Each tool includes SEO content, internal links, and PDF export.</p>
          </div>

          {/* Filters & Search */}
          <div className="bg-white/80 backdrop-blur-md border border-rose-100 rounded-2xl p-4 mb-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div>
                <label className="block text-sm font-semibold text-rose-800 mb-1">Search festivals/tools</label>
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by festival or tool..." className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-rose-800 mb-1">Filter by tool type</label>
                <div className="flex flex-wrap gap-2">
                  {allTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleType(t)}
                      className={`px-3 py-1 rounded-full border text-sm ${activeTypes.includes(t) ? 'bg-rose-600 text-white border-rose-600' : 'bg-white text-rose-700 border-rose-300 hover:bg-rose-50'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-rose-800 mb-1">Sort</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'az' | 'za')} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400">
                  <option value="az">A → Z</option>
                  <option value="za">Z → A</option>
                </select>
              </div>
            </div>
            {(query || activeTypes.length > 0 || sortBy !== 'az') && (
              <div className="mt-3 text-right">
                <button onClick={clearFilters} className="text-sm text-rose-700 underline">Clear filters</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFestivals.map((f, index) => (
              <motion.div key={f.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.03 }}>
                <RouterLink to={`/festival-tools/${f.slug}`} className="group bg-gradient-to-br from-white to-rose-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-rose-100 hover:border-rose-200 transform hover:-translate-y-2 transition-all block h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-rose-100 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <Gift className="h-6 w-6 text-rose-700" />
                    </div>
                    <Sparkles className="h-5 w-5 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-rose-700 transition-colors">{f.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{f.blurb}</p>
                  <div className="mt-3 text-xs text-rose-700">{f.tools.length} tools</div>
                  <div className="mt-4 inline-flex items-center text-rose-700 font-semibold text-sm">
                    <Calendar className="h-4 w-4 mr-1" /> View festival tools →
                  </div>
                </RouterLink>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <ToolArticle
              title="Festival Tools Hub"
              context={{
                name: 'Festival Tools',
                category: 'Festival Tools',
                keywords: [
                  'festival budget calculator',
                  'diwali lights electricity cost',
                  'navratri fasting planner',
                  'pandal hopping travel cost',
                  'eid zakat calculator',
                  'christmas decoration lighting cost'
                ]
              }}
              links={[
                { href: '/festival-tools/diwali/diwali-budget-calculator', label: 'Diwali Budget Calculator' },
                { href: '/festival-tools/durga-puja/pandal-hopping-travel-cost', label: 'Pandal Travel Cost Estimator' },
                { href: '/festival-tools/navratri/navratri-fasting-meal-planner', label: 'Navratri Fasting Meal Planner' }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FestivalTools;


