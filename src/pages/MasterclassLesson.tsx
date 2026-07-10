import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Star, BookOpen, Target, TrendingUp, ChevronRight, ExternalLink, Zap, Award, ShieldCheck, Building } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { getLessonBySlug, getNextLesson, getPrevLesson, getLessonsByModule, masterclassLessons } from '../data/masterclassData';
import { lessonContent } from '../data/masterclassContent';

const MasterclassLesson: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  if (!slug) return <Navigate to="/series/corporate-wealth-masterclass" replace />;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return <Navigate to="/series/corporate-wealth-masterclass" replace />;

  const content = lessonContent[slug];
  if (!content) return <Navigate to="/series/corporate-wealth-masterclass" replace />;

  const next = getNextLesson(slug);
  const prev = getPrevLesson(slug);
  const moduleLessons = getLessonsByModule(lesson.moduleId);

  const handleQuiz = (idx: number) => {
    setQuizAnswer(idx);
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SEOHelmet
        title={`${lesson.title} | Corporate Wealth Masterclass`}
        description={lesson.subtitle}
        keywords={content.keywords}
        url={`/series/corporate-wealth-masterclass/${slug}`}
      />

      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-[#0a0c10] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className={`absolute -top-1/4 -right-1/4 w-1/2 h-full bg-gradient-to-br ${lesson.color} blur-[120px] rounded-full`} />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Link to="/series/corporate-wealth-masterclass" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Series
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r ${lesson.color} text-white`}>
              Module {String(lesson.moduleId).padStart(2, '0')} · Lesson {lesson.lessonIndex}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">{lesson.title}</h1>
          <p className="text-xl text-slate-400 max-w-2xl font-medium">{lesson.subtitle}</p>
          <div className="flex items-center gap-6 mt-8 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {content.readTime} min read</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {content.difficulty}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 pb-20">
        <div className="grid lg:grid-cols-12 gap-8">
          <article className="lg:col-span-8 space-y-8">

            {/* Key Takeaways */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2"><Zap className="w-5 h-5 text-amber-500" /> Key Takeaways</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {content.keyTakeaways.map((t: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-700">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Main Content Sections */}
            {content.sections.map((sec: any, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 mb-4">{sec.heading}</h2>
                <div className="prose prose-slate max-w-none text-[15px] leading-relaxed">
                  {sec.paragraphs.map((p: string, j: number) => (
                    <p key={j} className="text-slate-600 mb-4 font-medium">{p}</p>
                  ))}
                </div>
                {sec.table && (
                  <div className="overflow-x-auto mt-6 rounded-2xl border border-slate-100">
                    <table className="w-full text-sm font-semibold">
                      <thead className="bg-slate-50 text-[10px] uppercase text-slate-400 tracking-widest font-black">
                        <tr>{sec.table.headers.map((h: string, k: number) => <th key={k} className="px-4 py-3 text-left">{h}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {sec.table.rows.map((row: string[], k: number) => (
                          <tr key={k} className="hover:bg-slate-50">
                            {row.map((cell: string, l: number) => <td key={l} className="px-4 py-3 text-slate-700">{cell}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {sec.tip && (
                  <div className="mt-6 p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                    <p className="text-sm font-bold text-indigo-800 flex items-start gap-2"><Award className="w-5 h-5 shrink-0 mt-0.5 text-indigo-600" /> <span><strong>Pro Tip:</strong> {sec.tip}</span></p>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Interactive Quiz */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-8 text-white shadow-xl">
              <h2 className="text-xl font-black mb-2 flex items-center gap-2"><Target className="w-5 h-5" /> Quick Quiz</h2>
              <p className="text-indigo-100 mb-6 font-medium">{content.quiz.question}</p>
              <div className="space-y-3">
                {content.quiz.options.map((opt: string, i: number) => (
                  <button key={i} onClick={() => handleQuiz(i)}
                    className={`w-full text-left p-4 rounded-2xl font-bold text-sm transition-all ${
                      showResult
                        ? i === content.quiz.correct ? 'bg-emerald-500 text-white' : quizAnswer === i ? 'bg-red-500 text-white' : 'bg-white/10 text-white/70'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                    disabled={showResult}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </button>
                ))}
              </div>
              {showResult && (
                <div className="mt-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <p className="text-sm font-bold">{quizAnswer === content.quiz.correct ? '✅ Correct!' : '❌ Not quite.'} {content.quiz.explanation}</p>
                </div>
              )}
            </motion.div>

            {/* Action Items */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl border-2 border-emerald-200 p-8">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Your Action Items</h2>
              <ol className="space-y-4">
                {content.actionItems.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-4 p-4 bg-emerald-50 rounded-2xl">
                    <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-sm shrink-0">{i + 1}</span>
                    <span className="text-sm font-bold text-slate-700 pt-1">{item}</span>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* External Resources */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8">
              <h2 className="text-lg font-black text-slate-900 mb-4">📚 Further Reading</h2>
              <div className="space-y-2">
                {content.externalLinks.map((link: any, i: number) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                    <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600">{link.label}</span>
                    <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                  </a>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div className="flex justify-between items-center pt-8">
              {prev ? (
                <Link to={`/series/corporate-wealth-masterclass/${prev.slug}`} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> {prev.title.substring(0, 30)}...
                </Link>
              ) : <div />}
              {next ? (
                <Link to={`/series/corporate-wealth-masterclass/${next.slug}`} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-colors">
                  Next: {next.title.substring(0, 25)}... <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link to="/series/corporate-wealth-masterclass" className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-sm">
                  🎉 Series Complete! <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sticky top-20">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Module {String(lesson.moduleId).padStart(2, '0')} Lessons</h3>
              <div className="space-y-2">
                {moduleLessons.map((ml) => (
                  <Link key={ml.slug} to={`/series/corporate-wealth-masterclass/${ml.slug}`}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all text-sm font-bold ${ml.slug === slug ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${ml.slug === slug ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{ml.lessonIndex}</span>
                    {ml.title.substring(0, 35)}{ml.title.length > 35 ? '...' : ''}
                  </Link>
                ))}
              </div>
            </div>

            {/* Internal Links */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Related Tools</h3>
              <div className="space-y-2">
                {content.internalLinks.map((link: any, i: number) => (
                  <Link key={i} to={link.to} className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50 transition-all group">
                    <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600">{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MasterclassLesson;
