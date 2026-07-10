import React, { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import { gkCategories } from '../../data/gkData';
import { BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';

const GKCategoryPage: React.FC = () => {
  const { categorySlug } = useParams();
  const category = gkCategories.find(c => c.slug === categorySlug);

  const itemListData = useMemo(() => {
    if (!category) return undefined;
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": category.topics.map((t, idx) => ({
        "@type": "ListItem", "position": idx + 1, "name": t.name,
        "item": `/gk/${t.slug}`
      }))
    };
  }, [category]);

  if (!category) return <Navigate to="/gk" replace />;

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'GK', url: '/gk' },
    { name: category.name, url: `/gk/category/${category.slug}` }
  ];

  const totalQuestions = category.topics.reduce((s, t) => s + t.questionCount, 0);

  const faqData = [
    { question: `${category.name} में कितने GK Topics हैं?`, answer: `इस कैटेगरी में ${category.topics.length} टॉपिक्स और ${totalQuestions}+ MCQ प्रश्न हैं।` },
    { question: 'क्या प्रश्न हिंदी में हैं?', answer: 'हाँ, सभी MCQs हिंदी में हैं। SSC, Railway, Banking, UPSC परीक्षा के लिए उपयोगी।' },
    { question: 'क्या उत्तर तुरंत मिलता है?', answer: 'हाँ, विकल्प चुनते ही सही/गलत और व्याख्या तुरंत दिखती है।' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <SEOHelmet
        title={`${category.name} GK Quiz — ${totalQuestions}+ MCQs हिंदी में | MoneyCal`}
        description={`${category.description}। ${category.topics.length} Topics में ${totalQuestions}+ MCQ प्रश्न उत्तर हिंदी में। तुरंत सही/गलत feedback और व्याख्या।`}
        keywords={`${category.name} GK in Hindi, ${category.slug} MCQ quiz, GK questions answers, सामान्य ज्ञान प्रश्नोत्तरी`}
        url={`/gk/category/${category.slug}`}
        type="website"
        breadcrumbs={breadcrumbs}
        faqData={faqData}
        structuredData={itemListData}
      />

      {/* Category Banner */}
      <section className={`bg-gradient-to-r ${category.gradient} pt-20 lg:pt-24 pb-12`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/gk" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> सभी Categories
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-1">{category.name} GK</h1>
              <p className="text-white/80">{category.description}</p>
            </div>
          </div>
          <div className="flex gap-6 mt-6">
            <div className="text-center text-white">
              <div className="text-2xl font-bold">{category.topics.length}</div>
              <div className="text-xs opacity-80">Topics</div>
            </div>
            <div className="text-center text-white">
              <div className="text-2xl font-bold">{totalQuestions}+</div>
              <div className="text-xs opacity-80">MCQ Questions</div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 pb-16">
        {/* Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {category.topics.map((t, idx) => (
            <Link key={t.slug} to={`/gk/${category.slug}/${t.slug}`}
              className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${category.gradient} flex items-center justify-center text-white text-sm font-bold`}>
                    {idx + 1}
                  </div>
                  <span className="text-xs font-medium text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">{t.questionCount}+ MCQs</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors">{t.name}</h2>
              <p className="text-sm text-gray-600">{t.description}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-indigo-600 font-medium">
                <BookOpen className="w-4 h-4" />
                <span>प्रश्न हल करें →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Study Tips */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📝 Study Tips</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">•</span>रोज़ 20 MCQs हल करें और गलत उत्तरों का नोट रखें</li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">•</span>सप्ताह में एक दिन सिर्फ revision करें</li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">•</span>टाइम्ड क्विज़ से स्पीड और accuracy बढ़ाएं</li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">•</span>परीक्षा के लिए महत्वपूर्ण टॉपिक्स पहले कवर करें</li>
          </ul>
        </div>

        {/* FAQ */}
        <section id="faq" className="mt-8 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">❓ FAQ</h2>
          <div className="space-y-4">
            {faqData.map((f, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-3 last:border-0">
                <p className="font-medium text-gray-900">{f.question}</p>
                <p className="text-gray-600 mt-1 text-sm">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default GKCategoryPage;
