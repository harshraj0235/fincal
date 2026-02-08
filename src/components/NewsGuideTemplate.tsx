import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  TrendingUp, 
  AlertCircle, 
  BarChart3, 
  BookOpen, 
  Target,
  CheckCircle,
  ExternalLink,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { getRandomCalculators } from '../utils/randomCalculators';

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
}

export interface ExternalSource {
  name: string;
  url: string;
  credibility: 'official' | 'verified-media' | 'industry-report' | 'academic';
}

interface NewsGuideTemplateProps {
  guide: NewsGuideSection;
}

export const NewsGuideTemplate: React.FC<NewsGuideTemplateProps> = ({ guide }) => {
  // Generate random calculators (memoized to stay consistent during re-renders)
  const randomCalculators = useMemo(() => getRandomCalculators(4), []);
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Featured Image - SEO Optimized for Google Images */}
      {guide.featuredImage && (
        <figure className="mb-8 sm:mb-12 -mx-3 sm:mx-0">
          <div className="relative overflow-hidden rounded-none sm:rounded-2xl shadow-2xl">
            <img
              src={guide.featuredImage.url}
              alt={guide.featuredImage.alt}
              className="w-full h-auto object-cover"
              loading="eager"
              decoding="async"
              itemProp="image"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x630?text=Article+Image';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
          {(guide.featuredImage.caption || guide.featuredImage.credit) && (
            <figcaption className="mt-3 sm:mt-4 px-3 sm:px-0 text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {guide.featuredImage.caption && (
                <span className="block mb-1 text-neutral-700 font-medium">
                  {guide.featuredImage.caption}
                </span>
              )}
              {guide.featuredImage.credit && (
                <span className="text-neutral-500 italic">
                  Photo: {guide.featuredImage.credit}
                </span>
              )}
            </figcaption>
          )}
        </figure>
      )}

      {/* Section 1: What's New - Mobile Optimized */}
      <section className="mb-8 sm:mb-12">
        <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="p-2 sm:p-3 bg-blue-100 rounded-lg flex-shrink-0">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-1 sm:mb-2">What's New</h2>
            <p className="text-xs sm:text-sm text-neutral-600 truncate">Latest Update • {new Date(guide.whatsNew.date).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-6 rounded-r-lg">
          <p className="text-base sm:text-lg text-neutral-800 leading-relaxed">{guide.whatsNew.summary}</p>
          {guide.whatsNew.source && (
            <a 
              href={guide.whatsNew.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Source: {guide.whatsNew.source.name}
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          )}
        </div>
      </section>

      {/* Section 2: Why It Matters */}
      <section className="mb-12">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-3 bg-orange-100 rounded-lg">
            <AlertCircle className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Why It Matters</h2>
          </div>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="text-neutral-800 mb-4">{guide.whyItMatters.significance}</p>
          
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">Impact Areas:</h3>
          <ul className="space-y-2 mb-4">
            {guide.whyItMatters.impact.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>
          
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">Who's Affected:</h3>
          <div className="flex flex-wrap gap-2">
            {guide.whyItMatters.stakeholders.map((stakeholder, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
              >
                {stakeholder}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Key Data & Facts */}
      <section className="mb-12">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <BarChart3 className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Key Data & Facts</h2>
          </div>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
          {guide.keyData.facts.map((fact, index) => (
            <div 
              key={index}
              className={`p-4 ${index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'} border-b border-neutral-200 last:border-b-0`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-neutral-900">{fact.label}</span>
                <span className="text-lg font-bold text-primary-600">{fact.value}</span>
              </div>
              {fact.source && (
                <p className="text-xs text-neutral-500 mt-1">Source: {fact.source}</p>
              )}
            </div>
          ))}
        </div>

        {guide.keyData.statistics && guide.keyData.statistics.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Market Statistics:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guide.keyData.statistics.map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-neutral-600 mb-1">{stat.metric}</p>
                  <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                  {stat.change && (
                    <p className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} {stat.period && `(${stat.period})`}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Section 4: What to Cover */}
      <section className="mb-12">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <BookOpen className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Comprehensive Coverage</h2>
          </div>
        </div>
        
        <div className="space-y-6">
          {guide.coverage.mainTopics.map((topic, index) => (
            <div key={index} className="bg-white border-l-4 border-green-600 p-6 rounded-r-lg shadow-sm">
              <h3 className="text-xl font-bold text-neutral-900 mb-2">{index + 1}. {topic.title}</h3>
              <p className="text-neutral-700 mb-3">{topic.description}</p>
              {topic.subtopics && topic.subtopics.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-neutral-600">
                  {topic.subtopics.map((subtopic, subIndex) => (
                    <li key={subIndex}>{subtopic}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Future Outlook */}
      <section className="mb-12">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <Target className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Future Outlook & What to Watch</h2>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-neutral-900 mb-3">Key Things to Monitor:</h3>
          <ul className="space-y-2 mb-6">
            {guide.outlook.whatToWatch.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 bg-indigo-600 text-white rounded-full text-sm mr-3 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>

          {guide.outlook.upcomingMilestones && guide.outlook.upcomingMilestones.length > 0 && (
            <>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Upcoming Milestones:</h3>
              <div className="space-y-2 mb-6">
                {guide.outlook.upcomingMilestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <span className={`px-3 py-1 rounded text-xs font-bold ${
                      milestone.importance === 'high' ? 'bg-red-100 text-red-800' :
                      milestone.importance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {milestone.importance?.toUpperCase() || 'MEDIUM'}
                    </span>
                    <span className="text-sm font-medium text-neutral-600">{milestone.date}</span>
                    <span className="text-neutral-800">{milestone.event}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <h3 className="text-lg font-semibold text-neutral-900 mb-3">Questions to Consider:</h3>
          <ul className="space-y-2">
            {guide.outlook.questions.map((q, index) => {
              // Handle both string[] and object[] formats
              if (typeof q === 'string') {
                return (
                  <li key={index} className="text-neutral-700 pl-4 border-l-2 border-indigo-300">
                    {q}
                  </li>
                );
              } else {
                return (
                  <li key={index} className="mb-6 pl-4 border-l-2 border-indigo-300">
                    <strong className="text-neutral-900 block mb-2">Q: {q.question}</strong>
                    <span className="text-neutral-700">{q.answer}</span>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </section>

      {/* Section 6: Actionable Takeaway */}
      <section className="mb-12">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <Lightbulb className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Actionable Takeaways</h2>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">For Readers:</h3>
            <ul className="space-y-2">
              {guide.takeaway.forReaders.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {guide.takeaway.forBusinesses && guide.takeaway.forBusinesses.length > 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">For Businesses:</h3>
              <ul className="space-y-2">
                {guide.takeaway.forBusinesses.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {guide.takeaway.forInvestors && guide.takeaway.forInvestors.length > 0 && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">For Investors:</h3>
              <ul className="space-y-2">
                {guide.takeaway.forInvestors.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Internal Links - Smart Calculator Integration - HIGHLY VISIBLE - DYNAMIC */}
      <section className="mb-8 sm:mb-12">
        <div className="bg-black rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border-2 sm:border-4 border-yellow-400">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-neutral-900 px-4 sm:px-8 py-4 sm:py-6">
            <div className="flex items-center gap-2 sm:gap-4 mb-2">
              <Calculator className="h-7 w-7 sm:h-10 sm:w-10 flex-shrink-0" />
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black">Calculate Your Impact</h3>
            </div>
            <p className="text-sm sm:text-base md:text-lg font-bold text-neutral-800">
              Use our free financial calculators to understand how this news affects your finances:
            </p>
          </div>
          <div className="p-4 sm:p-6 md:p-8 bg-neutral-900">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {randomCalculators.map((calcId, index) => (
                <Link
                  key={index}
                  to={`/calculators/${calcId}`}
                  className="flex items-center justify-between p-4 sm:p-5 bg-white rounded-lg sm:rounded-xl hover:bg-yellow-400 active:bg-yellow-500 transition-all border-2 border-neutral-700 hover:border-yellow-400 active:border-yellow-500 group shadow-lg hover:shadow-2xl active:scale-95"
                >
                  <span className="font-black text-neutral-900 text-sm sm:text-base">
                    {calcId?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Calculator'}
                  </span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-900 group-hover:translate-x-2 transition-transform flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section - Legal Compliance - Mobile Optimized */}
      <section className="mb-8 sm:mb-12">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg sm:rounded-r-xl shadow-lg p-4 sm:p-6 md:p-8">
          <h3 className="text-xl sm:text-2xl font-black text-neutral-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
            <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 flex-shrink-0" />
            Disclaimer
          </h3>
          <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-medium">
            This content is for educational purposes only. I am not a certified financial expert or advisor. All information is based on personal experience, research, and knowledge, and should not be considered as professional or legal advice. Please consult with a qualified expert before making any financial decisions. All risks associated with your actions are your own responsibility. If you find any mistakes or inaccuracies, please contact me as soon as possible so I can make corrections. I try my best to comply with all applicable laws in India.
          </p>
        </div>
      </section>

      {/* E-E-A-T Section - Sources Only (Author shown separately) */}
      <section className="mb-12">
        <div className="bg-neutral-100 p-6 rounded-xl">
          {/* Expert Quotes (E-E-A-T Signal) */}
          {guide.eeat.expertQuotes && guide.eeat.expertQuotes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Expert Insights</h3>
              <div className="space-y-4">
                {guide.eeat.expertQuotes.map((quote, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
                    <p className="text-neutral-800 italic mb-2">"{quote.quote}"</p>
                    <p className="text-sm text-neutral-600">
                      — <span className="font-semibold">{quote.expert}</span>, {quote.title}
                      {quote.organization && ` at ${quote.organization}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sources (E-E-A-T Critical) */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Authoritative Sources</h3>
            <div className="space-y-2">
              {guide.eeat.sources.map((source, index) => (
                <a
                  key={index}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-all"
                >
                  <div>
                    <p className="font-medium text-neutral-900">{source.name}</p>
                    <p className="text-xs text-neutral-500">
                      {source.credibility === 'official' && '🏛️ Official Source'}
                      {source.credibility === 'verified-media' && '📰 Verified Media'}
                      {source.credibility === 'industry-report' && '📊 Industry Report'}
                      {source.credibility === 'academic' && '🎓 Academic Research'}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-neutral-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer (Financial Content) */}
          {guide.eeat.disclaimer && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-neutral-700">
                <span className="font-semibold">Disclaimer:</span> {guide.eeat.disclaimer}
              </p>
            </div>
          )}

          {/* Last Updated */}
          <p className="text-xs text-neutral-500 mt-4">
            Last Updated: {new Date(guide.eeat.lastUpdated).toLocaleDateString('en-IN', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </section>
    </div>
  );
};

export default NewsGuideTemplate;




