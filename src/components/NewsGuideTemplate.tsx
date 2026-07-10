import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  TrendingUp,
  AlertCircle,
  BarChart3,
  BookOpen,
  Target,
  Lightbulb,
  CheckCircle,
  ExternalLink,
  IndianRupee,
  User,
  Calendar,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { getRandomCalculators } from '../utils/randomCalculators';
import { sanitizeDeepContent } from '../utils/contentSanitizer';
import NewsWidgetRenderer from './news/NewsWidgetRenderer';

/**
 * NewsGuideTemplate Component
 * Structured template for news articles following best practices
 * 7-Section Format: Headline → What's New → Why It Matters → Key Data → Coverage → Outlook → Takeaway
 * Fully E-E-A-T compliant with author attribution, sources, and expertise signals
 */

export interface NewsGuideSection {
  headline: string;
  subheadline?: string;

  // Featured Image (SEO optimized)
  featuredImage?: {
    url: string;
    alt: string;
    caption?: string;
    credit?: string;
  };

  // Section 1: What's New (Latest Update)
  whatsNew: {
    summary: string;
    date: string;
    source?: ExternalSource;
  };

  // Section 2: Why It Matters
  whyItMatters: {
    significance: string;
    impact: string[];
    stakeholders: string[];
  };

  // Section 3: Key Data & Facts
  keyData: {
    facts: KeyFact[];
    statistics?: DataPoint[];
  };

  // Section 4: What to Cover
  coverage: {
    mainTopics: CoverageTopic[];
  };

  // Section 5: Future Outlook
  outlook: {
    whatToWatch: string[];
    upcomingMilestones?: Milestone[];
    questions: string[] | { question: string; answer: string }[];
  };

  // Section 6: Actionable Takeaway
  takeaway: {
    forReaders: string[];
    forBusinesses?: string[];
    forInvestors?: string[];
  };

  // SEO Enhancements
  faq?: {
    question: string;
    answer: string;
  }[];
  review?: {
    rating: number;
    count: number;
    bestRating: number;
  };
  breadcrumbs?: {
    name: string;
    path: string;
  }[];

  // E-E-A-T Compliance
  eeat: {
    author: Author;
    expertQuotes?: ExpertQuote[];
    sources: ExternalSource[];
    lastUpdated: string;
    disclaimer?: string;
  };

  // Internal Linking (Auto-suggested from codebase)
  internalLinks: {
    calculators: string[]; // Calculator IDs
    relatedArticles?: string[]; // Article IDs
    tools?: string[]; // Tool IDs
  };
}

export interface KeyFact {
  label: string;
  value: string;
  source?: string;
}

export interface DataPoint {
  metric: string;
  value: string;
  change?: string;
  period?: string;
}

export interface CoverageTopic {
  title: string;
  description: string;
  subtopics?: string[];
}

export interface Milestone {
  date: string;
  event: string;
  importance: 'high' | 'medium' | 'low';
}

export interface Author {
  name: string;
  title: string;
  bio: string;
  credentials?: string[];
  image?: string;
}

export interface ExpertQuote {
  quote: string;
  expert: string;
  title: string;
  organization?: string;
  source?: string;
}

export interface ExternalSource {
  name: string;
  url: string;
  credibility: 'official' | 'verified-media' | 'industry-report' | 'academic';
}

export interface NewsGuideTemplateProps {
  guide: NewsGuideSection;
}

export const NewsGuideTemplate: React.FC<NewsGuideTemplateProps> = ({ guide }) => {
  // Generate random calculators (memoized to stay consistent during re-renders)
  const randomCalculators = useMemo(() => getRandomCalculators(4), []);
  const cleanGuide = useMemo(() => sanitizeDeepContent(guide), [guide]);

  const renderLiquidContent = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\[WIDGET:[\w-]+\]|\[PRO-TIP:.*?\]|\[WARNING:.*?\]|####.*?[\n\r]|#####.*?[\n\r])/g);
    return parts.map((part, index) => {
      const widgetMatch = part.match(/\[WIDGET:([\w-]+)\]/);
      if (widgetMatch) {
        return <NewsWidgetRenderer key={index} widgetId={widgetMatch[1]} />;
      }
      
      const proTipMatch = part.match(/\[PRO-TIP:(.*?)\]/);
      if (proTipMatch) {
        return (
          <div key={index} className="my-10 p-8 bg-gradient-to-br from-emerald-50 to-white border-l-8 border-emerald-500 rounded-r-[2.5rem] shadow-md relative overflow-hidden group/tip">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/tip:opacity-20 transition-opacity">
              <Lightbulb className="w-20 h-20 text-emerald-500 rotate-12 group-hover/tip:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex items-center gap-2 mb-4 text-emerald-700 font-black uppercase tracking-[0.2em] text-[10px] bg-emerald-100/50 w-fit px-3 py-1 rounded-full">
              <CheckCircle2 className="w-4 h-4 animate-pulse" /> MoneyCal Pro-Tip
            </div>
            <p className="text-emerald-900 font-bold leading-[1.8] text-xl news-serif italic relative z-10">{proTipMatch[1]}</p>
          </div>
        );
      }

      const warningMatch = part.match(/\[WARNING:(.*?)\]/);
      if (warningMatch) {
        return (
          <div key={index} className="my-10 p-8 bg-gradient-to-br from-rose-50 to-white border-l-8 border-rose-500 rounded-r-[2.5rem] shadow-md relative overflow-hidden group/warning">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/warning:opacity-20 transition-opacity">
              <AlertTriangle className="w-20 h-20 text-rose-500 -rotate-12 group-hover/warning:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex items-center gap-2 mb-4 text-rose-700 font-black uppercase tracking-[0.2em] text-[10px] bg-rose-100/50 w-fit px-3 py-1 rounded-full">
              <AlertTriangle className="w-4 h-4 animate-bounce" /> Critical Warning
            </div>
            <p className="text-rose-900 font-bold leading-[1.8] text-xl relative z-10">{warningMatch[1]}</p>
          </div>
        );
      }

      const h5Match = part.match(/^#####\s*(.*)$/m);
      if (h5Match) {
        return <h5 key={index} className="text-lg font-black text-slate-800 uppercase tracking-wider mb-4 mt-6">{h5Match[1]}</h5>;
      }

      const h4Match = part.match(/^####\s*(.*)$/m);
      if (h4Match) {
        return (
          <h4 key={index} className="text-xl font-black text-slate-900 mb-4 mt-8 flex items-center">
            <div className="w-1.5 h-6 bg-slate-200 mr-3 rounded-full border-l-2 border-slate-400 shrink-0" />
            {h4Match[1]}
          </h4>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="article-content text-slate-900 leading-relaxed">

      {/* Section 1: What's New */}
      <section id="whats-new" className="mb-12 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group/section">
        <div className="absolute top-0 left-0 w-2 h-0 group-hover/section:h-full bg-blue-600 transition-all duration-500"></div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-50 rounded-xl group-hover/section:scale-110 transition-transform">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase text-xs tracking-[0.2em]">What's New</h2>
        </div>
        <p className="text-2xl text-slate-800 leading-[1.6] news-serif font-semibold mb-8" itemProp="description">
          {renderLiquidContent(cleanGuide.whatsNew.summary)}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm pt-6 border-t border-slate-50">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Calendar className="h-4 w-4" />
            <span>Updated: {new Date(cleanGuide.whatsNew.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          </div>
          {cleanGuide.whatsNew.source && (
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">|</span>
              <a href={cleanGuide.whatsNew.source.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 font-bold hover:underline">
                {cleanGuide.whatsNew.source.name}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Why It Matters */}
      <section id="why-it-matters" className="mb-12 group/section">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-orange-50 rounded-xl group-hover/section:scale-110 transition-transform">
            <AlertCircle className="h-6 w-6 text-orange-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase text-xs tracking-[0.2em]">Why It Matters</h2>
        </div>

        <div className="bg-gradient-to-br from-orange-50/50 to-white p-10 rounded-[2.5rem] border border-orange-100 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <AlertCircle className="w-24 h-24 text-orange-600" />
          </div>
          <p className="text-2xl text-slate-800 leading-[1.6] news-serif font-medium italic relative z-10">
            {renderLiquidContent(cleanGuide.whyItMatters.significance)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
              Core Impact
            </h3>
            <ul className="space-y-4">
              {cleanGuide.whyItMatters.impact.map((item, index) => (
                <li key={index} className="flex items-start gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group/item">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform" />
                  <span className="text-slate-700 font-medium leading-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
              Key Stakeholders
            </h3>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {cleanGuide.whyItMatters.stakeholders.map((stakeholder, index) => (
                  <span key={index} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold border border-slate-100 hover:bg-orange-50 hover:border-orange-200 transition-colors">
                    {stakeholder}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Key Data & Facts */}
      <section id="key-data" className="mb-12 group/section">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-purple-50 rounded-xl group-hover/section:scale-110 transition-transform">
            <BarChart3 className="h-6 w-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase text-xs tracking-[0.2em]">Key Data & Facts</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {cleanGuide.keyData.facts.map((fact, index) => (
            <div key={index} className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-purple-200 transition-all hover:-translate-y-1 group/card">
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{fact.label}</div>
              <div className="text-2xl font-black text-purple-700 group-hover/card:scale-105 transition-transform origin-left">{fact.value}</div>
              {fact.source && <div className="text-[10px] font-bold text-slate-400 mt-2 uppercase">Source: {fact.source}</div>}
            </div>
          ))}
        </div>

        {cleanGuide.keyData.statistics && cleanGuide.keyData.statistics.length > 0 && (
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl group/pulse">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-3xl rounded-full -mr-32 -mt-32 group-hover/pulse:scale-150 transition-transform duration-1000"></div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-purple-400 mb-8 border-b border-white/10 pb-4">Market Pulse</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {cleanGuide.keyData.statistics.map((stat, index) => (
                <div key={index} className="relative z-10 transition-transform hover:scale-105">
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">{stat.metric}</p>
                  <p className="text-3xl font-black text-white mb-2">{stat.value}</p>
                  {stat.change && (
                    <div className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black shadow-sm ${stat.change.startsWith('+') ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                      }`}>
                      {stat.change} {stat.period && <span className="opacity-70 ml-1">({stat.period})</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Section 4: Deep Dive Coverage */}
      <section id="deep-dive" className="mb-12 group/section">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-emerald-50 rounded-xl group-hover/section:scale-110 transition-transform">
            <BookOpen className="h-6 w-6 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase text-xs tracking-[0.2em]">Deep Dive</h2>
        </div>

        <div className="space-y-8">
          {cleanGuide.coverage.mainTopics.map((topic, index) => (
            <div key={index} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative group overflow-hidden hover:border-emerald-200 transition-all" itemProp="hasPart" itemScope itemType="https://schema.org/HasPart">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center group-hover:rotate-12 transition-transform">0{index + 1}</span>
                  <h3 className="text-xl font-black text-slate-900 leading-tight" itemProp="name">{topic.title}</h3>
                </div>
                <div className="text-lg text-slate-700 leading-[1.8] news-serif font-medium mb-4" itemProp="description">
                  {renderLiquidContent(topic.description)}
                </div>
                {topic.subtopics && topic.subtopics.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4">
                    {topic.subtopics.map((sub: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-xs font-bold border border-slate-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                        {sub}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Future Outlook */}
      <section id="outlook" className="mb-12 group/section">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-indigo-50 rounded-xl group-hover/section:scale-110 transition-transform">
            <Target className="h-6 w-6 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase text-xs tracking-[0.2em]">Future Outlook</h2>
        </div>

        <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 border-b border-slate-200 pb-4">Key Indicators to Watch</h3>
              <ul className="space-y-6">
                {cleanGuide.outlook.whatToWatch.map((item, index) => (
                  <li key={index} className="flex items-start gap-4 group/li">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2.5 flex-shrink-0 group-hover/li:scale-150 transition-transform"></div>
                    <p className="text-slate-800 font-bold leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {cleanGuide.outlook.upcomingMilestones && cleanGuide.outlook.upcomingMilestones.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 border-b border-slate-200 pb-4">Timeline</h3>
                  <div className="space-y-4">
                    {cleanGuide.outlook.upcomingMilestones.map((milestone, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className={`w-3 h-3 rounded-full mt-1.5 ring-4 ring-offset-2 ${milestone.importance === 'high' ? 'bg-rose-500 ring-rose-50' : 'bg-amber-500 ring-amber-50'}`}></div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{milestone.date}</p>
                          <p className="text-sm font-bold text-slate-800">{milestone.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div id="faq" className="mt-12 pt-10 border-t border-slate-200">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 items-center flex gap-2">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {cleanGuide.outlook.questions.map((q, index) => (
                <div key={index} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-100 transition-all">
                  {typeof q === 'string' ? (
                    <div className="p-8 text-slate-700 italic font-medium">"{q}"</div>
                  ) : (
                    <details className="group">
                      <summary className="list-none cursor-pointer p-8 flex items-center justify-between">
                        <span className="font-black text-slate-900 text-lg leading-tight pr-8">{q.question}</span>
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-open:bg-indigo-600 group-open:rotate-180 transition-all">
                          <ChevronDown className="w-5 h-5 text-slate-400 group-open:text-white" />
                        </div>
                      </summary>
                      <div className="px-8 pb-8 pt-2">
                        <div className="p-6 bg-indigo-50/30 rounded-2xl border border-indigo-50 leading-loose text-[1.05rem] news-serif text-slate-700">
                          {q.answer}
                        </div>
                      </div>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Actionable Takeaway */}
      <section className="mb-12 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-emerald-50 rounded-xl">
            <Lightbulb className="h-6 w-6 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase text-xs tracking-[0.2em]">Key Takeaways</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-center gap-2 mb-6 text-emerald-600">
              <User className="h-5 w-5" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em]">For Readers</h3>
            </div>
            <ul className="space-y-4">
              {cleanGuide.takeaway.forReaders.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-bold text-slate-700 leading-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {cleanGuide.takeaway.forBusinesses && cleanGuide.takeaway.forBusinesses.length > 0 && (
            <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center gap-2 mb-6 text-blue-600">
                <Target className="h-5 w-5" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em]">For Businesses</h3>
              </div>
              <ul className="space-y-4">
                {cleanGuide.takeaway.forBusinesses.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-bold text-slate-700 leading-normal">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {cleanGuide.takeaway.forInvestors && cleanGuide.takeaway.forInvestors.length > 0 && (
            <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center gap-2 mb-6 text-orange-600">
                <TrendingUp className="h-5 w-5" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em]">For Investors</h3>
              </div>
              <ul className="space-y-4">
                {cleanGuide.takeaway.forInvestors.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-bold text-slate-700 leading-normal">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Premium Calculator CTA */}
      <section className="mb-12">
        <div className="bg-slate-950 rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl relative group">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent)] pointer-events-none"></div>
          <div className="p-10 md:p-14 relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-500/20">
                <IndianRupee className="h-4 w-4" />
                Financial Intelligence
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Impact</span>
              </h3>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
                How does this news change your financial trajectory? Use our precision calculators to get instant insights.
              </p>
            </div>
            <div className="w-full md:w-80 grid gap-3">
              {randomCalculators.map((calcId, index) => (
                <Link
                  key={index}
                  to={`/calculators/${calcId}`}
                  className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-blue-500/30 transition-all group/calc active:scale-95"
                >
                  <span className="font-bold text-white text-sm tracking-tight group-hover/calc:text-blue-400 transition-colors uppercase text-[10px] tracking-widest">
                    {calcId?.split('-').join(' ')}
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-600 group-hover/calc:text-blue-400 group-hover/calc:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mb-12 bg-slate-50 border-l-4 border-slate-900 p-6 rounded-r-3xl">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Disclaimer</h3>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          This content is for educational purposes only. I am not a certified financial expert or advisor. All information is based on personal experience, research, and knowledge, and should not be considered as professional or legal advice. Please consult with a qualified expert before making any financial decisions. All risks associated with your actions are your own responsibility.
        </p>
      </section>

      {/* E-E-A-T Footnote */}
      <section className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between gap-6 items-start">
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Verification Sources</h3>
          <div className="flex flex-wrap gap-4">
            {cleanGuide.eeat.sources.map((source, index) => (
              <a key={index} href={source.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors bg-white px-3 py-2 rounded-lg border border-slate-100">
                {source.name}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Last Validated</p>
          <p className="text-sm font-bold text-slate-900">{new Date(cleanGuide.eeat.lastUpdated).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
        </div>
      </section>
    </div>
  );
};

export default NewsGuideTemplate;




