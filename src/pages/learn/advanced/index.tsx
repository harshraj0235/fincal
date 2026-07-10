import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Target } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';
import { advancedFinanceLessons } from '../../../data/learn/advancedFinanceLessons';

const AdvancedSpecialisedFinanceHub: React.FC = () => {
  return (
    <>
      <SEOHelmet 
        title="Advanced Topics & Specialised Finance Guide for Indians | MoneyCal Learn" 
        description="Master real estate investment, commodities trading (MCX/NCDEX), global investing (US stocks), derivatives (F&O), cryptocurrency, alternative investments (AIF/PMS), estate planning in Hindi & English." 
        keywords="real estate investment India, commodities trading MCX, global investing US stocks, derivatives F&O, cryptocurrency Bitcoin, alternative investments AIF PMS, estate planning, उन्नत वित्त विषय" 
        url="/learn/advanced-specialised-finance"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Learn', url: '/learn' },
          { name: 'Advanced Topics', url: '/learn/advanced-specialised-finance' }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Advanced Topics & Specialised Finance",
          description: "Advanced finance education hub with lessons on real estate, commodities, global markets, derivatives, crypto, and alternatives.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: advancedFinanceLessons.length
          }
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn" className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    <span className="text-gray-900">MoneyCal</span>{' '}
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Learn
                    </span>
                  </h1>
                  <p className="text-xs text-gray-600">Advanced & Specialised Finance</p>
                </div>
              </Link>
              <div className="flex items-center gap-4">
                <Link to="/learn" className="text-gray-600 hover:text-purple-600 font-semibold">
                  ← All Categories
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-6xl mb-6">⚡</div>
              <h2 className="text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Advanced Topics & Specialised Finance
                </span>
              </h2>
              <p className="text-2xl text-gray-600 mb-4">उन्नत विषय और विशेष वित्त</p>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Real estate, commodities, derivatives, cryptocurrency, and global investing
              </p>

              <div className="flex gap-6 justify-center mb-12">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-purple-600">7</div>
                  <div className="text-sm text-gray-600">Lessons</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-pink-600">7h</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-rose-600">Advanced</div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-orange-600">FREE</div>
                  <div className="text-sm text-gray-600">Forever</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto mb-10">
          <div className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">How to use</h3>
            <p className="text-gray-700 text-sm">Start with real estate, learn risk management, explore F&O basics, and diversify with global and alternative assets.</p>
          </div>
          <div className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
            <p className="text-gray-700 text-sm">Assess risk → choose asset class → define position sizing → set stop-loss → review performance.</p>
          </div>
          <div className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
            <p className="text-gray-700 text-sm">Build REIT+SGB mix. Hedge portfolio with options. Use LRS for US index funds.</p>
          </div>
        </div>
        {/* All Lessons Grid */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">All Lessons</h3>

          <div className="grid md:grid-cols-2 gap-6">
            {advancedFinanceLessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                to={`/learn/advanced-specialised-finance/${lesson.slug}`}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-400 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-purple-600 uppercase">{lesson.difficulty}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {lesson.duration}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{lesson.description}</p>
                <p className="text-sm text-purple-700 font-semibold mb-4">🇮🇳 {lesson.titleHindi}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {lesson.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">Start Learning →</span>
                  <div className="w-8 h-8 rounded-full bg-purple-100 group-hover:bg-purple-400 flex items-center justify-center transition-colors">
                    <ArrowLeft className="w-4 h-4 text-purple-600 group-hover:text-white rotate-180" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl p-8 shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">⚠️ Advanced Content - High Risk, High Reward!</h2>
            <p className="text-gray-600 mb-6">
              These lessons cover <strong>advanced investment strategies</strong> with higher risk. Start with <strong>Real Estate Investment</strong> for tangible asset diversification, or explore <strong>Derivatives (F&O)</strong> for leveraged trading. Only for experienced investors!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/learn/advanced-specialised-finance/real-estate-investment-india-residential-commercial-reits-property-guide-2025"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Start with Real Estate
              </Link>
              <Link
                to="/learn/advanced-specialised-finance/derivatives-trading-futures-options-nifty-bank-nifty-hedging-india-2025"
                className="px-6 py-3 bg-white border-2 border-purple-500 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all"
              >
                Explore Derivatives F&O
              </Link>
            </div>
          </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdvancedSpecialisedFinanceHub;



