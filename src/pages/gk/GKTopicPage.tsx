import React, { useMemo, useState, useCallback } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import { gkCategories } from '../../data/gkData';
import { getQuestionsForTopic } from '../../data/gk';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, RotateCcw, Award, BookOpen, ArrowLeft } from 'lucide-react';

const QUESTIONS_PER_PAGE = 20;

const GKTopicPage: React.FC = () => {
  const { topicSlug } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  const topicData = useMemo(() => {
    for (const c of gkCategories) {
      const t = c.topics.find(x => x.slug === topicSlug);
      if (t) return { category: c, topic: t };
    }
    return null;
  }, [topicSlug]);

  const allMCQs = useMemo(() => topicData ? getQuestionsForTopic(topicData.topic.slug) : [], [topicData]);
  const totalPages = Math.ceil(allMCQs.length / QUESTIONS_PER_PAGE);
  const pageMCQs = allMCQs.slice(currentPage * QUESTIONS_PER_PAGE, (currentPage + 1) * QUESTIONS_PER_PAGE);

  const stats = useMemo(() => {
    let correct = 0, wrong = 0;
    Object.entries(selectedAnswers).forEach(([id, ans]) => {
      const q = allMCQs.find(m => m.id === Number(id));
      if (q) { if (ans === q.answerIndex) correct++; else wrong++; }
    });
    return { correct, wrong, total: allMCQs.length, attempted: Object.keys(selectedAnswers).length };
  }, [selectedAnswers, allMCQs]);

  const handleSelect = useCallback((qId: number, optIdx: number) => {
    if (selectedAnswers[qId] !== undefined) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
    setShowExplanation(prev => ({ ...prev, [qId]: true }));
  }, [selectedAnswers]);

  const resetQuiz = useCallback(() => {
    setSelectedAnswers({});
    setShowExplanation({});
    setCurrentPage(0);
  }, []);

  if (!topicData) return <Navigate to="/gk" replace />;

  const { category, topic } = topicData;
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'GK', url: '/gk' },
    { name: category.name, url: `/gk/category/${category.slug}` },
    { name: topic.name, url: `/gk/${topic.slug}` }
  ];

  const faqData = [
    { question: `${topic.name} में कितने प्रश्न हैं?`, answer: `इस टॉपिक में ${allMCQs.length}+ MCQ प्रश्न हैं जो हिंदी में दिए गए हैं।` },
    { question: 'क्या उत्तर तुरंत दिखते हैं?', answer: 'हाँ, विकल्प चुनते ही सही/गलत उत्तर और व्याख्या तुरंत दिखती है।' },
    { question: 'क्या मैं दोबारा प्रयास कर सकता हूँ?', answer: 'हाँ, "Reset Quiz" बटन से सभी उत्तर रीसेट कर दोबारा प्रयास कर सकते हैं।' }
  ];

  const getOptionStyle = (qId: number, optIdx: number, correctIdx: number) => {
    const selected = selectedAnswers[qId];
    if (selected === undefined) return 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer';
    if (optIdx === correctIdx) return 'border-green-500 bg-green-50 ring-2 ring-green-200';
    if (optIdx === selected && selected !== correctIdx) return 'border-red-500 bg-red-50 ring-2 ring-red-200';
    return 'border-gray-200 opacity-60';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <SEOHelmet
        title={`${topic.name} - ${allMCQs.length}+ MCQs हिंदी में | MoneyCal GK`}
        description={`${topic.description}। ${allMCQs.length}+ MCQ प्रश्न उत्तर सहित। ${category.name} GK हिंदी में। SSC, Railway, Banking, UPSC परीक्षा के लिए उपयोगी।`}
        keywords={`${topic.name} MCQ in Hindi, ${category.name} GK, ${topic.slug} quiz, GK questions answers Hindi, सामान्य ज्ञान प्रश्न उत्तर`}
        url={`/gk/${topic.slug}`}
        type="article"
        breadcrumbs={breadcrumbs}
        faqData={faqData}
        tags={[category.name, topic.name, 'GK', 'MCQ', 'Hindi', 'Quiz']}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to={`/gk/category/${category.slug}`} className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">{category.name}</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-semibold text-green-600">{stats.correct}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="font-semibold text-red-500">{stats.wrong}</span>
            </div>
            <button onClick={resetQuiz} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Reset Quiz">
              <RotateCcw className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link to="/gk" className="hover:text-indigo-600">GK</Link>
            <span>/</span>
            <Link to={`/gk/category/${category.slug}`} className="hover:text-indigo-600">{category.name}</Link>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{topic.name}</h1>
          <p className="text-gray-600">{topic.description}</p>
        </div>

        {/* Stats Bar */}
        <div className={`bg-gradient-to-r ${category.gradient} rounded-2xl p-4 sm:p-5 mb-8 text-white shadow-lg`}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div><div className="text-2xl font-bold">{allMCQs.length}</div><div className="text-xs opacity-80">कुल प्रश्न</div></div>
            <div><div className="text-2xl font-bold">{stats.attempted}</div><div className="text-xs opacity-80">प्रयास किए</div></div>
            <div><div className="text-2xl font-bold">{stats.correct}</div><div className="text-xs opacity-80">सही उत्तर ✓</div></div>
            <div><div className="text-2xl font-bold">{stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0}%</div><div className="text-xs opacity-80">सटीकता</div></div>
          </div>
          {stats.attempted > 0 && (
            <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
              <div className="bg-white h-full rounded-full transition-all duration-500" style={{ width: `${(stats.attempted / allMCQs.length) * 100}%` }} />
            </div>
          )}
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {pageMCQs.map((mcq, idx) => {
            const globalIdx = currentPage * QUESTIONS_PER_PAGE + idx + 1;
            const isAnswered = selectedAnswers[mcq.id] !== undefined;
            const isCorrect = selectedAnswers[mcq.id] === mcq.answerIndex;

            return (
              <article key={mcq.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md" itemScope itemType="https://schema.org/Question">
                <div className="p-5 sm:p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isAnswered ? (isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700') : 'bg-indigo-100 text-indigo-700'}`}>
                      {globalIdx}
                    </span>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 leading-relaxed" itemProp="name">{mcq.question}</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-11" itemProp="suggestedAnswer" itemScope itemType="https://schema.org/Answer">
                    {mcq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelect(mcq.id, oIdx)}
                        disabled={isAnswered}
                        className={`flex items-center gap-3 p-3 sm:p-3.5 rounded-xl border-2 text-left transition-all duration-200 ${getOptionStyle(mcq.id, oIdx, mcq.answerIndex)}`}
                      >
                        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${isAnswered && oIdx === mcq.answerIndex ? 'border-green-500 bg-green-500 text-white' :
                          isAnswered && oIdx === selectedAnswers[mcq.id] && oIdx !== mcq.answerIndex ? 'border-red-500 bg-red-500 text-white' :
                            'border-gray-300 text-gray-600'
                          }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="text-sm sm:text-base text-gray-800">{opt}</span>
                        {isAnswered && oIdx === mcq.answerIndex && <CheckCircle className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" />}
                        {isAnswered && oIdx === selectedAnswers[mcq.id] && oIdx !== mcq.answerIndex && <XCircle className="w-5 h-5 text-red-400 ml-auto flex-shrink-0" />}
                      </button>
                    ))}
                  </div>

                  {showExplanation[mcq.id] && mcq.explanation && (
                    <div className={`mt-4 ml-11 p-3 rounded-xl text-sm ${isCorrect ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-amber-50 border border-amber-200 text-amber-800'}`}>
                      <div className="flex items-center gap-2 font-semibold mb-1">
                        {isCorrect ? <CheckCircle className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                        {isCorrect ? 'सही उत्तर! ✓' : 'व्याख्या:'}
                      </div>
                      <span itemProp="text">{mcq.explanation}</span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Pagination">
            <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0}
              className="p-2.5 rounded-xl border border-gray-200 hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setCurrentPage(i)}
                className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${currentPage === i ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'border border-gray-200 hover:bg-indigo-50 text-gray-700'}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))} disabled={currentPage === totalPages - 1}
              className="p-2.5 rounded-xl border border-gray-200 hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </nav>
        )}

        {/* Completion Card */}
        {stats.attempted === allMCQs.length && allMCQs.length > 0 && (
          <div className="mt-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center shadow-2xl">
            <Award className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">🎉 Quiz Complete!</h3>
            <p className="text-lg opacity-90 mb-4">Score: {stats.correct}/{stats.total} ({Math.round((stats.correct / stats.total) * 100)}%)</p>
            <div className="flex justify-center gap-4">
              <button onClick={resetQuiz} className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:shadow-lg transition-all">
                दोबारा प्रयास करें
              </button>
              <Link to="/gk" className="px-6 py-3 border-2 border-white/50 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
                और Topics देखें
              </Link>
            </div>
          </div>
        )}

        {/* Related Topics */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-indigo-500" /> संबंधित टॉपिक्स (Related Topics)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {category.topics
              .filter(t => t.slug !== topic.slug)
              .slice(0, 4)
              .map((t) => (
                <Link
                  key={t.slug}
                  to={`/gk/${t.slug}`}
                  className="group bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{t.name}</h4>
                      <p className="text-xs text-gray-500">{category.name}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mt-12 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-500" /> अक्सर पूछे जाने वाले प्रश्न (FAQ)
          </h2>
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

export default GKTopicPage;
