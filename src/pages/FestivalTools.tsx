import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gift, Sparkles, PartyPopper, Calendar } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';
import { festivalList } from '../data/festivalTools';

const FestivalTools: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Festival Tools Hub – Budget, Travel, Electricity & More | MoneyCal.in"
        description="Explore festival-wise tools for Diwali, Holi, Navratri, Eid, Christmas, Onam and more. Plan budgets, calculate electricity and travel costs, fasting hours, Zakat, and download PDF reports."
        keywords="festival tools india, diwali budget calculator, fasting hours, zakat calculator, travel cost, electricity cost"
        url="/festival-tools"
        type="website"
        image="/images/festival-tools.jpg"
        tags={["festival", "india", "budget", "travel", "electricity", "fasting", "zakat"]}
      />
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-3">
              <PartyPopper className="h-12 w-12 text-rose-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Festival Tools Hub</h1>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto">Plan budgets, travel, electricity, fasting hours, donations and more across India’s biggest festivals. Each tool includes SEO content, internal links, and PDF export.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {festivalList.map((f, index) => (
              <motion.div key={f.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.03 }}>
                <RouterLink to={`/festival-tools/${f.slug}`} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-rose-200 transform hover:-translate-y-2 transition-all block h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-rose-100 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <Gift className="h-6 w-6 text-rose-700" />
                    </div>
                    <Sparkles className="h-5 w-5 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-rose-700 transition-colors">{f.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{f.blurb}</p>
                  <div className="mt-4 inline-flex items-center text-rose-700 font-semibold text-sm">
                    <Calendar className="h-4 w-4 mr-1" /> View festival tools →
                  </div>
                </RouterLink>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FestivalTools;


