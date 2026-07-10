import React from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import { gkCategories, getTotalQuestionCount } from '../../data/gkData';
import { BookOpen, ArrowRight, Award, Users, Target } from 'lucide-react';

const GKHub: React.FC = () => {
  const totalQ = getTotalQuestionCount();
  const totalTopics = gkCategories.reduce((s, c) => s + c.topics.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <SEOHelmet
        title="GK MCQ Quiz हिंदी में — 5000+ प्रश्न उत्तर | MoneyCal"
        description={`सामान्य ज्ञान (GK) के ${totalQ}+ MCQ प्रश्न उत्तर हिंदी में। ${gkCategories.length} कैटेगरी, ${totalTopics} टॉपिक्स। SSC, Railway, Banking, UPSC, School GK, India GK, Science GK सभी विषय।`}
        keywords="GK in Hindi, GK MCQ, General Knowledge Quiz, सामान्य ज्ञान, Best GK, India GK, SSC GK, Railway GK, Banking GK, UPSC GK, Science GK, History GK, Geography GK"
        url="/gk"
        type="website"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 pt-20 lg:pt-24 pb-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTMwVjBoLTEydjRoMTJ6TTI0IDI0aDEydi0ySDI0djJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-sm font-medium mb-6">
              <Award className="w-4 h-4" /> {totalQ.toLocaleString()}+ MCQ Questions
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              सामान्य ज्ञान <span className="text-yellow-300">MCQ Quiz</span>
            </h1>
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto mb-8">
              हर टॉपिक में 200+ MCQ प्रश्न — उत्तर और व्याख्या के साथ। SSC, Railway, Banking, UPSC और स्कूल परीक्षाओं के लिए।
            </p>
            <div className="flex justify-center gap-6 sm:gap-10">
              <div className="text-center">
                <div className="text-3xl font-bold">{gkCategories.length}</div>
                <div className="text-xs opacity-80 mt-1">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{totalTopics}</div>
                <div className="text-xs opacity-80 mt-1">Topics</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{totalQ.toLocaleString()}+</div>
                <div className="text-xs opacity-80 mt-1">Questions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gkCategories.map(cat => (
            <div key={cat.slug} className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`bg-gradient-to-r ${cat.gradient} p-5 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <div>
                      <h2 className="text-lg font-bold">{cat.name}</h2>
                      <p className="text-xs opacity-80">{cat.topics.length} Topics</p>
                    </div>
                  </div>
                  <Link to={`/gk/category/${cat.slug}`}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-600 mb-4">{cat.description}</p>
                <div className="space-y-2">
                  {cat.topics.slice(0, 4).map(t => (
                    <Link key={t.slug} to={`/gk/${cat.slug}/${t.slug}`}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50 transition-colors group/link">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-gray-800 group-hover/link:text-indigo-700">{t.name}</span>
                      </div>
                      <span className="text-xs font-medium text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">{t.questionCount}+ MCQs</span>
                    </Link>
                  ))}
                  {cat.topics.length > 4 && (
                    <Link to={`/gk/category/${cat.slug}`} className="block text-center text-sm text-indigo-600 font-medium py-2 hover:underline">
                      +{cat.topics.length - 4} और Topics देखें →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: <Target className="w-8 h-8 text-indigo-500" />, title: 'Instant Feedback', desc: 'विकल्प चुनते ही सही/गलत उत्तर तुरंत दिखता है' },
            { icon: <Award className="w-8 h-8 text-amber-500" />, title: 'Score Tracking', desc: 'आपका स्कोर और सटीकता रियल-टाइम ट्रैक होती है' },
            { icon: <Users className="w-8 h-8 text-green-500" />, title: 'Hindi + English', desc: 'सभी प्रश्न हिंदी में, SSC/Railway/Banking परीक्षा उपयोगी' },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm">
              <div className="flex justify-center mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GKHub;
