import React, { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';
import { goldTools } from '../data/goldTools';
import ToolArticle from '../components/ToolArticle';
import { Crown, Percent, Scale, Receipt, TrendingUp, PiggyBank, Shield, RefreshCw } from 'lucide-react';

const GoldTools: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'conversion' | 'pricing' | 'investment' | 'etf' | 'sgb' | 'loan'>('all');

  const typeToGroup: Record<string, typeof activeFilter> = {
    purity: 'conversion', karatToPurity: 'conversion', weightConvert: 'conversion', gramToTola: 'conversion', gramToOunce: 'conversion',
    value: 'pricing', jewelleryEstimator: 'pricing', scrapValue: 'pricing', pricePerGram: 'pricing', makingCharges: 'pricing',
    sip: 'investment', goldETFSIP: 'investment', lumpsum: 'investment', returns: 'investment', monthlyGoal: 'investment',
    etfVsPhysical: 'etf',
    sovereignBond: 'sgb', sovereignRedemption: 'sgb',
    loanEmi: 'loan'
  };

  const groupMeta: Record<typeof activeFilter, { label: string; color: string; icon: React.ReactNode }> = {
    all: { label: 'All', color: 'from-amber-500 to-yellow-600', icon: <Crown className="h-4 w-4" /> },
    conversion: { label: 'Conversion & Purity', color: 'from-rose-500 to-pink-600', icon: <Scale className="h-4 w-4" /> },
    pricing: { label: 'Pricing & Invoice', color: 'from-amber-500 to-orange-600', icon: <Receipt className="h-4 w-4" /> },
    investment: { label: 'Investment & Returns', color: 'from-emerald-500 to-green-600', icon: <TrendingUp className="h-4 w-4" /> },
    etf: { label: 'ETF vs Physical', color: 'from-blue-500 to-indigo-600', icon: <Percent className="h-4 w-4" /> },
    sgb: { label: 'Sovereign Gold Bond', color: 'from-violet-500 to-purple-600', icon: <Shield className="h-4 w-4" /> },
    loan: { label: 'Loans', color: 'from-cyan-500 to-sky-600', icon: <PiggyBank className="h-4 w-4" /> },
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return goldTools.filter(t => {
      const inFilter = activeFilter === 'all' ? true : typeToGroup[t.type] === activeFilter;
      const inSearch = !q || t.name.toLowerCase().includes(q) || t.slug.includes(q) || t.description.toLowerCase().includes(q);
      return inFilter && inSearch;
    });
  }, [activeFilter, query]);

  const clearFilters = () => { setQuery(''); setActiveFilter('all'); };

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
            "itemListElement": goldTools.map((t, i) => ({
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

          {/* Search and Filters */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-amber-100 shadow-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search gold tools (e.g., purity, SIP, SGB, jewellery invoice)"
                  className="w-full rounded-xl border border-amber-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 px-4 py-3 text-sm"
                  aria-label="Search gold tools"
                />
              </div>
              <div className="flex items-center justify-between md:justify-end gap-2">
                <button onClick={clearFilters} className="inline-flex items-center px-3 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700">
                  <RefreshCw className="h-4 w-4 mr-1" /> Reset
                </button>
                <div className="text-sm text-gray-600">{filtered.length} results</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {(['all','conversion','pricing','investment','etf','sgb','loan'] as const).map(k => (
                <button
                  key={k}
                  onClick={() => setActiveFilter(k)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border transition-all ${activeFilter===k ? 'text-white border-transparent bg-gradient-to-r '+groupMeta[k].color : 'text-amber-800 border-amber-200 bg-amber-50 hover:bg-amber-100'}`}
                >
                  {groupMeta[k].icon}
                  {groupMeta[k].label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t, index) => (
              <motion.div key={t.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.03 }}>
                <RouterLink to={`/gold-tools/${t.slug}`} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-amber-200 transform hover:-translate-y-2 transition-all block h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors">{t.name}</h3>
                    <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">{groupMeta[typeToGroup[t.type]].label}</span>
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


