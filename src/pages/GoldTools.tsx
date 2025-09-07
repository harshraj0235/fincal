import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';
import { goldTools } from '../data/goldTools';
import ToolArticle from '../components/ToolArticle';

const GoldTools: React.FC = () => {
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {goldTools.map((t, index) => (
              <motion.div key={t.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.03 }}>
                <RouterLink to={`/gold-tools/${t.slug}`} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-amber-200 transform hover:-translate-y-2 transition-all block h-full">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors">{t.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t.description}</p>
                  <div className="mt-4 text-amber-700 font-semibold text-sm">Open tool →</div>
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


