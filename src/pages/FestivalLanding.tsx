import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';
import { findFestival } from '../data/festivalTools';
import { Gift, Sparkles } from 'lucide-react';
import ToolArticle from '../components/ToolArticle';

const FestivalLanding: React.FC = () => {
  const { festivalSlug } = useParams();
  const fest = festivalSlug ? findFestival(festivalSlug) : undefined;

  if (!fest) {
    const path = festivalSlug ? `/festival-tools/${festivalSlug}` : '/festival-tools';
    return (
      <>
        <SEOHelmet
          title="Festival not found | MoneyCal.in"
          description="This festival or tool page was not found. Browse Festival Tools for Diwali, Holi, and more."
          url={`https://moneycal.in${path}`}
          noIndex={true}
          noFollow={true}
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">Festival not found</div>
            <RouterLink to="/festival-tools" className="text-rose-700 underline">Back to Festival Tools</RouterLink>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHelmet
        title={`${fest.name} Tools – Budget, Travel, Electricity & More | MoneyCal.in`}
        description={fest.blurb}
        keywords={fest.keywords.join(', ')}
        url={`https://moneycal.in/festival-tools/${fest.slug}`}
        type="website"
        image="/images/festival-tools.jpg"
        tags={[fest.slug, 'festival', 'tools']}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Festival Tools', url: '/festival-tools' },
          { name: fest.name, url: `/festival-tools/${fest.slug}` }
        ]}
      />
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-fuchsia-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-3">
              <Gift className="h-12 w-12 text-rose-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{fest.name} – Tools</h1>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto">{fest.blurb}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fest.tools.map((t, index) => (
              <motion.div key={t.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.03 }}>
                <RouterLink to={`/festival-tools/${fest.slug}/${t.slug}`} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-fuchsia-200 transform hover:-translate-y-2 transition-all block h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-fuchsia-100 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <Sparkles className="h-6 w-6 text-fuchsia-700" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-fuchsia-700 transition-colors">{t.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t.description}</p>
                  <div className="mt-4 text-fuchsia-700 font-semibold text-sm">Open tool →</div>
                </RouterLink>
              </motion.div>
            ))}
          </div>

          <div className="prose prose-rose max-w-none mt-12">
            <ToolArticle
              title={`${fest.name} Tools`}
              context={{ name: `${fest.name} Tools`, category: 'Festival Tools', keywords: fest.keywords }}
              links={[
                { href: '/festival-tools', label: 'Festival Tools Hub' },
                { href: '/gold-tools', label: 'Gold Tools' },
                { href: '/finance-tools', label: 'Finance Tools' }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FestivalLanding;


