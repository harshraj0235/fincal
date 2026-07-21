import React, { useMemo, useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronUp } from 'lucide-react';
import { loadGovSchemesData } from '../data/lazyGovSchemesData';
import { teamProfiles } from '../data/teamProfiles';
import { getCurrentDateISO, formatLatestUpdate } from '../utils/randomCalculators';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';

import AlsoRead from '../components/AlsoRead';
import MasterArticleLayout from '../components/articles/MasterArticleLayout';
import PremiumHero from '../components/articles/PremiumHero';
import AISummaryBox from '../components/articles/AISummaryBox';
import StickyShareBar from '../components/articles/StickyShareBar';
import TrendingSidebar from '../components/articles/TrendingSidebar';

interface TocItem {
  idx: number;
  text: string | undefined;
  type: 'heading' | 'subheading';
}

function hashCode(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h = h & h;
  }
  return Math.abs(h);
}

/** Pick a stable author per scheme (existing team) for SEO and attribution */
function getAuthorForSlug(slug: string) {
  if (!teamProfiles.length) return { name: 'Harsh Raj', role: 'Software Engineer', bio: 'MoneyCal India team.' };
  const idx = hashCode(slug) % teamProfiles.length;
  const p = teamProfiles[idx];
  return { name: p.name, role: p.role, bio: p.bio || 'MoneyCal India team.', linkedin: p.socialProfiles?.linkedin, twitter: p.socialProfiles?.twitter };
}

const baseUrl = 'https://moneycal.in';

const GovernmentSchemePost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState<any>(null);
  const [relatedSchemes, setRelatedSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const author = useMemo(() => getAuthorForSlug(slug || ''), [slug]);
  const freshDateISO = getCurrentDateISO();
  const freshDateDisplay = formatLatestUpdate();
  const [showHelpPill, setShowHelpPill] = useState<boolean>(false);
  const [kishorLoanAmount, setKishorLoanAmount] = useState<number>((window as any).__kishorLoanAmount ?? 200000);
  const [kishorTenure, setKishorTenure] = useState<number>((window as any).__kishorTenure ?? 48);
  const [kishorRate, setKishorRate] = useState<number>((window as any).__kishorRate ?? 10);

  useEffect(() => {
    const fetchData = async () => {
      const { schemes } = await loadGovSchemesData();
      const currentScheme = schemes.find(s => s.slug === slug);
      setScheme(currentScheme);

      if (currentScheme) {
        // Simple related schemes logic: same category
        const related = schemes
          .filter(s => s.slug !== slug && s.category === currentScheme.category)
          .slice(0, 3);
        setRelatedSchemes(related);
      }
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  // Table of Contents
  const toc = useMemo(() => {
    if (!scheme || !scheme.content) return [];
    return (scheme.content as any[])
      .map((section: any, idx: number) => {
        if (section.type === 'heading' || section.type === 'subheading') {
          return { idx, text: section.content, type: section.type } as TocItem;
        }
        return null;
      })
      .filter((item: any): item is TocItem => item !== null);
  }, [scheme]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setShowHelpPill(y > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // handleCopyLink and shareUrls are used via other mechanisms or are legacy

  // shareUrls is unused
  // const shareUrls = useMemo(() => {
  //   const url = encodeURIComponent(window.location.href);
  //   const text = encodeURIComponent(scheme?.title ?? '');
  //   return {
  //     whatsapp: `https://wa.me/?text=${text}%20${url}`,
  //     twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
  //     facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  //     linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`,
  //   };
  // }, [scheme]);

  // handleCopyLink and shareUrls are used via other mechanisms or are legacy

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium">Loading Scheme Details...</p>
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="text-center py-20 bg-gray-50 min-h-screen pt-40">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Scheme Not Found</h1>
        <button onClick={() => navigate('/government-schemes')} className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
          Back to Schemes
        </button>
      </div>
    );
  }

  const canonicalUrl = `${baseUrl}/government-schemes/${scheme.slug}`;
  const publishDate = scheme.launchDate || scheme.lastUpdated || freshDateISO;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: scheme.title,
    description: scheme.seoDescription,
    image: scheme.coverImage,
    datePublished: publishDate,
    dateModified: freshDateISO,
    author: { '@type': 'Person', name: author.name },
    publisher: { '@type': 'Organization', name: 'MoneyCal India', url: baseUrl, logo: { '@type': 'ImageObject', url: `${baseUrl}/android-chrome-512x512.jpg` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    articleSection: scheme.category,
    keywords: scheme.keywords?.slice(0, 10).join(', ') || scheme.category,
  };

  const hero = (
    <PremiumHero 
      title={scheme.titleHindi}
      excerpt={scheme.excerptHindi}
      coverImage={scheme.coverImage || '/default-scheme-hero.jpg'}
      categories={[scheme.categoryHindi || scheme.category]}
      authorName={author.name}
      authorImage={`/authors/${author.name.toLowerCase().replace(' ', '-')}.jpg`}
      date={freshDateDisplay}
      readingTime={10}
    />
  );

  const leftSidebar = <StickyShareBar title={scheme.titleHindi} url={window.location.href} />;
  const rightSidebar = (
    <TrendingSidebar 
      trendingItems={relatedSchemes.map(s => ({
        id: s.slug,
        slug: s.slug,
        title: s.titleHindi || s.title,
        category: s.categoryHindi || s.category
      }))}
    />
  );

  const aiSummary = {
    title: "योजना का मुख्य सारांश (AI Quick Take)",
    points: scheme.faqSchema?.slice(0, 3).map((f: any) => f.answer) || [
      "सरकारी योजनाओं की सटीक और ताज़ा जानकारी।",
      "पात्रता और आवेदन प्रक्रिया की पूरी मार्गदर्शिका।",
      "सीधे आधिकारिक पोर्टल्स के लिंक्स।"
    ]
  };

  return (
    <>
      <WhatsAppBanner />
      <SEOHelmet
        title={scheme.seoTitle}
        description={scheme.seoDescription}
        keywords={scheme.keywords?.join(', ')}
        url={`/government-schemes/${scheme.slug}`}
        type="article"
        image={scheme.coverImage}
        articlePublishedTime={publishDate}
        articleModifiedTime={freshDateISO}
        author={author.name}
        section={scheme.category}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Government Schemes', url: '/government-schemes' },
          { name: scheme.categoryHindi || scheme.category, url: `/government-schemes?category=${encodeURIComponent(scheme.category)}` },
          { name: scheme.titleHindi || scheme.title, url: `/government-schemes/${scheme.slug}` },
        ]}
        faqData={scheme.faqSchema?.length ? scheme.faqSchema.map((f: any) => ({ question: f.question, answer: f.answer })) : undefined}
        isFinanceContent={true}
        wordCount={(() => {
          const text = (scheme.content || []).map((s: any) => typeof s.content === 'string' ? s.content : (Array.isArray((s as any).items) ? (s as any).items.join(' ') : '')).join(' ');
          return text.split(/\s+/).filter(Boolean).length;
        })()}
        authorExpertise={['Government Schemes', 'Agriculture & Farmers Welfare', 'Financial Tools']}
        authorCredentials={['India Policy Research', 'Finance Content Editorial']}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <MasterArticleLayout
        hero={hero}
        leftSidebar={leftSidebar}
        rightSidebar={rightSidebar}
      >
        {/* Quick Help / AI Summary */}
        <div className="mb-12">
          <AISummaryBox 
            summary={aiSummary.title}
            points={aiSummary.points}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-10 mb-10 overflow-hidden">
          {/* Breadcrumb - Internal */}
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-8 pb-6 border-b border-slate-50">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
              <ChevronRight className="h-3 w-3" />
              <li><Link to="/government-schemes" reloadDocument className="hover:text-blue-600">Schemes</Link></li>
              <ChevronRight className="h-3 w-3" />
              <li className="font-medium text-slate-900 truncate max-w-[150px]">{scheme.titleHindi}</li>
            </ol>
          </nav>

          {(slug === 'calculate-mudra-kishor-loan-repayments-moneycal') && (
            <div className="mb-12 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div className="text-xl font-bold text-slate-900 border-l-4 border-blue-500 pl-4">Quick EMI Preview</div>
                <div className="text-sm text-slate-500">Instant Calculator</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-2 block">Loan Amount (₹)</label>
                  <input
                    type="number"
                    min={50000}
                    max={500000}
                    value={kishorLoanAmount}
                    onChange={(e) => {
                      const nextValue = Number(e.target.value);
                      (window as any).__kishorLoanAmount = nextValue;
                      setKishorLoanAmount(nextValue);
                    }}
                    className="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-2 block">Tenure (months)</label>
                  <input
                    type="number"
                    min={12}
                    max={84}
                    value={kishorTenure}
                    onChange={(e) => {
                      const nextValue = Number(e.target.value);
                      (window as any).__kishorTenure = nextValue;
                      setKishorTenure(nextValue);
                    }}
                    className="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-2 block">Rate: {kishorRate.toFixed(1)}%</label>
                  <input
                    type="range"
                    min={8.5}
                    max={12}
                    step={0.1}
                    value={kishorRate}
                    onChange={(e) => {
                      const nextValue = Number(e.target.value);
                      (window as any).__kishorRate = nextValue;
                      setKishorRate(nextValue);
                    }}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-4"
                  />
                </div>
              </div>
              <KishorEMIPanel amount={kishorLoanAmount} tenure={kishorTenure} rate={kishorRate} />
            </div>
          )}

          {(slug === 'mahila-samman-savings-benefit-moneycal-planner') && (
            <div className="mb-12 bg-pink-50/30 p-6 sm:p-8 rounded-3xl border border-pink-100">
              <div className="flex items-center justify-between mb-6">
                <div className="text-xl font-bold text-pink-900 border-l-4 border-pink-500 pl-4">Mahila Samman Calculator</div>
                <div className="text-sm text-pink-600">Estimate Maturity</div>
              </div>
              <MahilaCalculator />
            </div>
          )}

          {/* Table of Contents */}
          {toc.length > 2 && (
            <div className="mb-12 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100">
              <div className="font-bold mb-6 text-slate-900 text-lg sm:text-xl">मुख्य विषय:</div>
              <ul className="grid sm:grid-cols-2 gap-4">
                {toc.map(item => item && (
                  <li key={item.idx}>
                    <a
                      href={`#section-${item.idx}`}
                      className="text-slate-600 hover:text-blue-600 text-sm flex items-center gap-3 transition-colors py-2 px-3 hover:bg-white rounded-lg group"
                      onClick={e => {
                        e.preventDefault();
                        const el = document.getElementById(`section-${item.idx}`);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        {item.idx + 1}
                      </div>
                      <span className="font-medium">{item.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Blog Content Rendering */}
          <article className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-h2:mb-12 prose-h3:mb-12 prose-h4:mb-12 prose-h5:mb-12 prose-p:leading-[1.8] prose-p:text-slate-600 prose-p:mb-12 prose-img:rounded-3xl prose-blockquote:rounded-2xl prose-blockquote:bg-slate-50 prose-blockquote:border-blue-500">
            {scheme.content && scheme.content.map((section: any, idx: number) => {
              switch (section.type) {
                case 'heading':
                  return <h2 id={`section-${idx}`} key={idx} className="scroll-mt-24">{section.content}</h2>;
                case 'subheading':
                  return <h3 id={`section-${idx}`} key={idx} className="scroll-mt-24">{section.content}</h3>;
                case 'paragraph':
                  return <p key={idx}>{section.content}</p>;
                case 'highlight':
                  return (
                    <div key={idx} className="my-10 rounded-3xl border-2 border-slate-100 bg-slate-50 p-8 shadow-sm">
                      <div className="font-black text-slate-900 text-xl mb-4">{section.content}</div>
                      {section.items && (
                        <ul className="grid sm:grid-cols-2 gap-3">
                          {section.items.map((item: any, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-slate-600 list-none font-medium">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                case 'list':
                  return (
                    <ul key={idx} className="my-8">
                      {section.items?.map((item: any, i: number) => <li key={i}>{item}</li>)}
                    </ul>
                  );
                case 'image':
                  return (
                    <figure key={idx} className="my-12">
                      <img src={section.url} alt={section.caption || ''} className="w-full shadow-2xl" loading="lazy" />
                      {section.caption && <figcaption className="text-center text-sm text-slate-500 mt-4 italic font-medium">{section.caption}</figcaption>}
                    </figure>
                  );
                case 'quote':
                  return (
                    <blockquote key={idx} className="p-8 my-10 font-bold text-slate-800 text-xl italic leading-relaxed">
                      “{section.content}”
                      {section.author && <div className="text-sm text-blue-600 mt-4 not-italic font-black uppercase tracking-wider">— {section.author}</div>}
                    </blockquote>
                  );
                case 'table':
                  return (
                    <div key={idx} className="overflow-x-auto my-12 p-1 bg-slate-100 rounded-2xl border border-slate-200">
                      <table className="min-w-full m-0">
                        <thead>
                          <tr className="bg-slate-800 text-white border-none">
                            {section.tableData?.headers.map((header: any, i: number) => (
                              <th key={i} className="px-6 py-4 text-left font-black tracking-wider border-none first:rounded-tl-2xl last:rounded-tr-2xl">{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {section.tableData?.rows.map((row: any, i: number) => (
                            <tr key={i} className="border-b border-slate-100 last:border-none hover:bg-slate-50 transition-colors">
                              {row.map((cell: any, j: number) => (
                                <td key={j} className="px-6 py-4 text-slate-600 font-medium">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </article>
        </div>

        {/* FAQ Section */}
        {scheme.faqSchema && scheme.faqSchema.length > 0 && (
          <div id="faq" className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-10 mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-8 pb-6 border-b border-slate-50">अक्सर पूछे जाने वाले सवाल (FAQs)</h2>
            <div className="space-y-8">
              {scheme.faqSchema.map((faq: any, idx: number) => (
                <div key={idx} className="group">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-10">
          <AlsoRead
            items={relatedSchemes
              .slice(0, 3)
              .map(s => ({
                title: s.titleHindi || s.title,
                link: `/government-schemes/${s.slug}`
              }))
            }
          />
        </div>

        {/* Related Schemes */}
        {relatedSchemes.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-500 rounded-full" />
              संबंधित योजनाएं
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedSchemes.map(relatedScheme => (
                <Link
                  key={relatedScheme.id}
                  to={`/government-schemes/${relatedScheme.slug}`}
                  className="group bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={relatedScheme.coverImage} alt={relatedScheme.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4">
                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${relatedScheme.status === 'active' ? 'bg-green-500 text-white' :
                        relatedScheme.status === 'upcoming' ? 'bg-blue-500 text-white' :
                          'bg-slate-500 text-white'
                        }`}>
                        {relatedScheme.status === 'active' ? 'सक्रिय' :
                          relatedScheme.status === 'upcoming' ? 'आगामी' : 'पुरानी'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-slate-900 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                      {relatedScheme.titleHindi}
                    </h3>
                    <div className="mt-auto text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {relatedScheme.categoryHindi}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mb-10 bg-slate-900 rounded-3xl p-8 text-white/70 text-sm border border-white/5 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-blue-500 rounded-full" />
            <span className="font-black text-white uppercase tracking-widest text-xs">Aesthetically Verified Disclaimer</span>
          </div>
          <p className="leading-relaxed">
            <b>Disclaimer:</b> This content is for educational purposes only. I am not a certified financial expert or advisor. All information is based on personal experience, research, and knowledge, and should not be considered as professional or legal advice. Please consult with a qualified expert before making any financial decisions. All risks associated with your actions are your own responsibility. If you find any mistakes or inaccuracies, please contact me as soon as possible so I can make corrections.
          </p>
        </div>
      </MasterArticleLayout>

      <div className={`fixed bottom-8 right-8 flex flex-col items-end gap-3 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${showHelpPill ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        {scheme.faqSchema && scheme.faqSchema.length > 0 && (
          <a
            href="#faq"
            className="px-8 py-3 rounded-full shadow-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-black transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Need Help?
          </a>
        )}
        <button
          aria-label="Back to Top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 rounded-full shadow-2xl bg-slate-900 border border-white/10 text-white flex items-center justify-center transition-all hover:bg-slate-800 hover:scale-105 active:scale-95 group"
        >
          <ChevronUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </>
  );
};

function KishorEMIPanel({ amount, tenure, rate }: { amount: number; tenure: number; rate: number }) {
  const r = rate / 1200;
  const pow = Math.pow(1 + r, tenure);
  const emi = r === 0 ? amount / tenure : (amount * r * pow) / (pow - 1);
  const total = emi * tenure;
  const interest = Math.max(0, total - amount);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <div className="p-4 rounded bg-green-50 border">
          <div className="text-sm text-gray-600">Monthly EMI</div>
          <div className="text-xl font-bold text-green-800">₹{Math.round(emi).toLocaleString()}</div>
        </div>
        <div className="p-4 rounded bg-green-50 border">
          <div className="text-sm text-gray-600">Total Interest</div>
          <div className="text-xl font-bold text-green-800">₹{Math.round(interest).toLocaleString()}</div>
        </div>
        <div className="p-4 rounded bg-green-50 border">
          <div className="text-sm text-gray-600">Total Payment</div>
          <div className="text-xl font-bold text-green-800">₹{Math.round(total).toLocaleString()}</div>
        </div>
      </div>
      <div className="mt-4">
        <button
          className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white text-sm"
          onClick={() => {
            const doc = new jsPDF();
            doc.setFontSize(14);
            doc.text('MUDRA Kishor Loan EMI Summary', 14, 18);
            doc.setFontSize(11);
            doc.text(`Loan Amount: ₹${Math.round(amount).toLocaleString()}`, 14, 30);
            doc.text(`Tenure: ${tenure} months`, 14, 38);
            doc.text(`Interest Rate: ${rate.toFixed(2)}% p.a.`, 14, 46);
            doc.text(`Monthly EMI: ₹${Math.round(emi).toLocaleString()}`, 14, 58);
            doc.text(`Total Interest: ₹${Math.round(interest).toLocaleString()}`, 14, 66);
            doc.text(`Total Payment: ₹${Math.round(total).toLocaleString()}`, 14, 74);
            doc.save('mudra-kishor-emi-summary.pdf');
          }}
        >
          Download PDF
        </button>
      </div>
    </>
  );
}

function MahilaCalculator() {
  const [amount, setAmount] = useState<number>(100000);
  const [rate, setRate] = useState<number>(7.5);
  const [years, setYears] = useState<number>(2);
  const interest = amount * (rate / 100) * years;
  const maturity = amount + interest;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Deposit Amount (₹)</label>
          <input type="number" min={1000} max={200000} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Interest Rate (% p.a.)</label>
          <input type="range" min={6} max={9} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-2 w-full" />
          <div className="text-sm text-gray-600 mt-1">{rate.toFixed(1)}%</div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Tenure (years)</label>
          <input type="number" min={1} max={3} value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded bg-pink-50 border">
          <div className="text-sm text-gray-600">Total Interest</div>
          <div className="text-xl font-bold text-pink-800">₹{Math.round(interest).toLocaleString()}</div>
        </div>
        <div className="p-4 rounded bg-pink-50 border">
          <div className="text-sm text-gray-600">Maturity Value</div>
          <div className="text-xl font-bold text-pink-800">₹{Math.round(maturity).toLocaleString()}</div>
        </div>
        <div className="p-4 rounded bg-pink-50 border">
          <div className="text-sm text-gray-600">Effective Annual Return</div>
          <div className="text-xl font-bold text-pink-800">{rate.toFixed(2)}%</div>
        </div>
      </div>
      <div>
        <button
          className="px-4 py-2 rounded bg-pink-600 hover:bg-pink-700 text-white text-sm"
          onClick={() => {
            const doc = new jsPDF();
            doc.setFontSize(14);
            doc.text('Mahila Samman Savings Maturity Summary', 14, 18);
            doc.setFontSize(11);
            doc.text(`Deposit Amount: ₹${Math.round(amount).toLocaleString()}`, 14, 30);
            doc.text(`Interest Rate: ${rate.toFixed(2)}% p.a.`, 14, 38);
            doc.text(`Tenure: ${years} years`, 14, 46);
            doc.text(`Total Interest: ₹${Math.round(interest).toLocaleString()}`, 14, 58);
            doc.text(`Maturity Value: ₹${Math.round(maturity).toLocaleString()}`, 14, 66);
            doc.save('mahila-samman-maturity-summary.pdf');
          }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default GovernmentSchemePost;
