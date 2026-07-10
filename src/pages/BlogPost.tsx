import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Loader2,
  Target,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { loadAllBlogData } from '../data/lazyBlogData';
import { astroBlog1 } from '../data/astroBlogs/astroBlog1';
import { astroBlog2 } from '../data/astroBlogs/astroBlog2';
import { astroBlog3 } from '../data/astroBlogs/astroBlog3';
import { astroBlog4 } from '../data/astroBlogs/astroBlog4';
import { astroBlog5 } from '../data/astroBlogs/astroBlog5';
import { astroBlog6 } from '../data/astroBlogs/astroBlog6';
import { teamProfiles } from '../data/teamProfiles';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';
import SEOHelmet from '../components/SEOHelmet';
import TableOfContents from '../components/TableOfContents';
import { getFreshDateISO48h } from '../utils/getFreshDate';
import { sanitizeDeepContent, sanitizeTextContent } from '../utils/contentSanitizer';
import { ArticleExpertReview } from '../components/ArticleExpertReview';
import { AutoInternalLinks } from '../components/AutoInternalLinks';
import AlsoRead from '../components/AlsoRead';
import AdInArticle from '../components/ads/AdInArticle';
import { BannerAd } from '../components/BannerAd';

// Premium Layout Components
import MasterArticleLayout from '../components/articles/MasterArticleLayout';
import PremiumHero from '../components/articles/PremiumHero';
import AISummaryBox from '../components/articles/AISummaryBox';
import StickyShareBar from '../components/articles/StickyShareBar';
import TrendingSidebar from '../components/articles/TrendingSidebar';

const AUTHOR_IMAGE = "https://pbs.twimg.com/profile_images/1634415500418588677/uz8L8JKQ_400x400.png";

// Helper functions for astro blogs
const allAstroBlogs = [
  { ...astroBlog1, date: '2024-12-15', readingTime: 8, views: 1250, featured: true, authorTitle: 'Vedic Astrology Specialist' },
  { ...astroBlog2, date: '2024-12-14', readingTime: 6, views: 980, featured: false, authorTitle: 'Vedic Astrology Specialist' },
  { ...astroBlog3, date: '2024-12-13', readingTime: 10, views: 1450, featured: true, authorTitle: 'Vedic Astrology Specialist' },
  { ...astroBlog4, date: '2024-12-12', readingTime: 7, views: 890, featured: false, authorTitle: 'Vedic Astrology Specialist' },
  { ...astroBlog5, date: '2024-12-11', readingTime: 9, views: 1120, featured: true, authorTitle: 'Vedic Astrology Specialist' },
  { ...astroBlog6, date: '2024-12-10', readingTime: 12, views: 1680, featured: true, authorTitle: 'Vedic Astrology Specialist' }
];


export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = window.location.pathname;
  const isAstroBlog = location.includes('/astro-finance/blog/');

  const [post, setPost] = useState<any>(null);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(!isAstroBlog); // astro blogs are synchronous

  useEffect(() => {
    if (isAstroBlog) {
      const found = allAstroBlogs.find(blog => blog.slug === (slug || ''));
      setPost(found ? sanitizeDeepContent(found) : null);
      return;
    }
    let active = true;
    setIsLoading(true);
    loadAllBlogData()
      .then(posts => {
        if (!active) return;
        setAllPosts(posts);
        const normalized = (slug || '').trim().toLowerCase();
        const found = posts.find((p: any) => (p.slug || '').trim().toLowerCase() === normalized);
        setPost(found ? sanitizeDeepContent(found) : null);
      })
      .catch(err => { console.error('BlogPost load error:', err); if (active) setPost(null); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [slug, isAstroBlog]);

  // Content typing helpers to avoid implicit any and union issues
  type BlogContentSection = {
    type: 'paragraph' | 'heading' | 'subheading' | 'subsubheading' | 'minorheading' | 'list' | 'image' | 'quote';
    content?: string;
    items?: string[];
    url?: string;
    caption?: string;
    author?: string;
  };

  const contentValue = post && typeof post === 'object' ? (post as { content?: unknown }).content : undefined;
  const astroHtml: string = typeof contentValue === 'string' ? contentValue : '';
  const sections: BlogContentSection[] = Array.isArray(contentValue) ? (contentValue as BlogContentSection[]) : [];


  // Show loading spinner while data loads
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 text-primary-600 animate-spin" />
        <p className="text-gray-500 text-sm font-medium">Loading article…</p>
      </div>
    );
  }

  if (!post) {
    if (typeof window !== 'undefined') window.document.title = '404 - Blog Post Not Found | MoneyCal';
    return (
      <>
        <SEOHelmet title="404 - Blog Post Not Found" description="The blog post you're looking for doesn't exist or may have been moved." url={window.location.pathname} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">404 - Blog Post Not Found</h1>
          <p className="text-neutral-600 mb-8">The blog post you're looking for doesn't exist or may have been moved.</p>
          <button onClick={() => navigate(isAstroBlog ? '/astro-finance' : '/blog')} className="btn btn-primary">
            Back to {isAstroBlog ? 'Astro Finance' : 'Blog'}
          </button>
        </div>
      </>
    );
  }

  // Calculate reading time
  const calculateReadingTime = () => {
    if (Array.isArray(post.content)) {
      const wordCount = post.content.reduce((count: number, section: BlogContentSection) => {
        if (section.type === 'paragraph' || section.type === 'heading' || section.type === 'subheading' || section.type === 'subsubheading' || section.type === 'minorheading') {
          return count + (section.content?.split(' ').length || 0);
        }
        if (section.type === 'list' && section.items) {
          return count + section.items.join(' ').split(' ').length;
        }
        return count;
      }, 0);
      return Math.ceil(wordCount / 200); // Average reading speed
    }
    return 5;
  };

  const readingTime = calculateReadingTime();
  const wordCount = Array.isArray(post.content) ? post.content.reduce((count: number, section: BlogContentSection) => {
    if (section.type === 'paragraph' || section.type === 'heading' || section.type === 'subheading' || section.type === 'subsubheading' || section.type === 'minorheading') {
      return count + (section.content?.split(' ').length || 0);
    }
    if (section.type === 'list' && section.items) {
      return count + section.items.join(' ').split(' ').length;
    }
    return count;
  }, 0) : 500;

  const baseUrl = 'https://moneycal.in';
  const authorProfile = teamProfiles.find((profile) => profile.id === 'harsh-raj') || teamProfiles[0];
  const authorName = authorProfile?.name || 'MoneyCal Editorial Team';
  const authorTitle = authorProfile?.role || 'MoneyCal Editorial Team';
  const authorBio = authorProfile?.bio || 'MoneyCal editorial team provides finance guides and tools for Indian users.';
  const authorLinks = Object.values(authorProfile?.socialProfiles || {}).filter(Boolean) as string[];
  const postPath = isAstroBlog ? '/astro-finance/blog/' : '/blog/';
  const canonicalUrl = `${baseUrl}${postPath}${post.slug}`;
  const freshDateISO = getFreshDateISO48h();

  // Slugify for heading IDs (Backlinko: jump links + clear structure for Google/AI). Append index for uniqueness.
  const slugifyHeading = (text: string, index: number) => {
    if (!text) return `section-${index}`;
    const base = text
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .toLowerCase() || `section`;
    return `${base}-${index}`;
  };

  const resolvedKeywords = (() => {
    const rawKeywords = (post as { keywords?: unknown }).keywords;
    if (Array.isArray(rawKeywords)) {
      return rawKeywords.filter((keyword) => typeof keyword === 'string' && keyword.trim().length > 0);
    }
    const seoKeywords = (post as { seoKeywords?: unknown }).seoKeywords;
    if (typeof seoKeywords === 'string' && seoKeywords.trim().length > 0) {
      return seoKeywords
        .split(',')
        .map((keyword) => keyword.trim())
        .filter(Boolean);
    }
    return Array.isArray(post.categories) ? post.categories : [];
  })();

  // Generate structured data for SEO (Backlinko: schema helps Google + AI visibility)
  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.coverImage,
      "author": {
        "@type": "Person",
        "name": authorName,
        "url": `${baseUrl}/author/harsh-raj`,
        "sameAs": authorLinks
      },
      "publisher": {
        "@type": "Organization",
        "name": "MoneyCal India",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`,
          "width": 600,
          "height": 60
        },
        "sameAs": [
          "https://www.facebook.com/moneycal",
          "https://twitter.com/moneycal",
          "https://www.linkedin.com/company/moneycal"
        ]
      },
      "datePublished": post.date,
      "dateModified": freshDateISO,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "wordCount": wordCount,
      "articleBody": post.excerpt || post.title,
      "keywords": resolvedKeywords.length ? resolvedKeywords.join(', ') : (post.categories || []).join(', '),
      "inLanguage": "en-IN",
      "isAccessibleForFree": "true"
    };
  };
  const firstCategory = post.categories?.[0] || 'Blog';

  const leftSidebar = (
    <div className="flex flex-col gap-8">
      <StickyShareBar
        url={canonicalUrl}
        title={post.title}
      />
      <div className="sticky top-32 hidden xl:block">
        <BannerAd width={160} height={600} />
      </div>
    </div>
  );

  // Dynamic related calculators based on post categories
  const getRelatedCalculators = () => {
    const cats = (post.categories || []).map((c: string) => c.toLowerCase());
    const allTools = [
      { id: 'emi', name: 'EMI Calculator', url: '/calculators/emi-calculator', cats: ['finance', 'banking', 'loan', 'real estate'] },
      { id: 'sip', name: 'SIP Calculator', url: '/calculators/sip-calculator', cats: ['investment', 'mutual fund', 'finance'] },
      { id: 'tax', name: 'Income Tax Calculator', url: '/calculators/income-tax-calculator', cats: ['tax', 'finance', 'salary'] },
      { id: 'gst', name: 'GST Calculator', url: '/calculators/gst-calculator', cats: ['tax', 'business', 'gst'] },
      { id: 'ppf', name: 'PPF Calculator', url: '/calculators/ppf-calculator', cats: ['investment', 'tax', 'saving'] },
      { id: 'fd', name: 'FD Calculator', url: '/calculators/fd-calculator', cats: ['banking', 'investment', 'saving'] },
      { id: 'home', name: 'Home Loan Calculator', url: '/calculators/home-loan-calculator', cats: ['real estate', 'loan', 'banking'] },
      { id: 'nps', name: 'NPS Calculator', url: '/calculators/nps-calculator', cats: ['investment', 'tax', 'retirement'] },
      { id: 'mf', name: 'Mutual Fund Returns', url: '/calculators/mutual-fund-returns-calculator', cats: ['investment', 'mutual fund'] },
      { id: 'rd', name: 'RD Calculator', url: '/calculators/rd-calculator', cats: ['banking', 'saving'] },
    ];
    const matched = allTools.filter(t => t.cats.some(tc => cats.some((pc: string) => pc.includes(tc) || tc.includes(pc))));
    return (matched.length >= 3 ? matched : allTools).slice(0, 5);
  };

  const rightSidebar = (
    <div className="flex flex-col gap-8">
      <TrendingSidebar
        trendingItems={allPosts
          .filter(p => p.slug !== slug)
          .slice(0, 5)
          .map(p => ({
            id: p.slug,
            slug: p.slug,
            title: p.title,
            category: p.categories?.[0] || 'Finance'
          }))
        }
        relatedTools={getRelatedCalculators().map(t => ({ id: t.id, name: t.name, url: t.url }))}
      />
      <div className="sticky top-32 mt-8 hidden lg:block">
        <BannerAd width={300} height={600} />
      </div>
    </div>
  );

  const hero = (
    <PremiumHero
      title={post.title}
      excerpt={post.excerpt}
      coverImage={post.coverImage || '/default-blog-hero.jpg'}
      authorName={authorName}
      authorImage={AUTHOR_IMAGE}
      date={post.date}
      readingTime={readingTime}
      categories={post.categories || []}
    />
  );

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
        url={`${isAstroBlog ? '/astro-finance/blog/' : '/blog/'}${post.slug}`}
        keywords={resolvedKeywords.length ? resolvedKeywords.join(', ') : post.categories.join(', ')}
        author={authorName}
        articlePublishedTime={post.date}
        articleModifiedTime={freshDateISO}
        wordCount={wordCount}
        isFinanceContent={true}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isAstroBlog ? 'Astro Finance' : 'Blog', url: isAstroBlog ? '/astro-finance' : '/blog' },
          ...(firstCategory && firstCategory !== 'Blog' ? [{ name: firstCategory, url: `/blog?category=${encodeURIComponent(firstCategory)}` }] : []),
          { name: post.title, url: `${isAstroBlog ? '/astro-finance/blog/' : '/blog/'}${post.slug}` },
        ]}
        faqData={(post as { faqSchema?: Array<{ question: string; answer: string }> }).faqSchema}
        tags={resolvedKeywords.length > 0 ? resolvedKeywords : post.categories}
      />
      {/* Add structured data for rich snippets */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>

      <MasterArticleLayout
        leftSidebar={leftSidebar}
        rightSidebar={rightSidebar}
        hero={hero}
      >
        <div className="mb-12">
          <AISummaryBox
            summary={post.expertVerdict?.summary || post.excerpt || "Comprehensive financial guide and analysis for 2026."}
            points={post.keyTakeaways || [
              "Verified human expertise in Indian finance.",
              "Optimized for 2026 search generative experience.",
              "Fact-checked regulatory and tax data."
            ]}
          />
        </div>

        {/* Table of Contents - Premium Inline Style */}
        <nav className="bg-white border border-gray-100 rounded-2xl p-8 mb-16 shadow-sm" aria-label="Table of Contents">
          <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
            इस आर्टिकल में (Quick Navigation)
          </h2>
          <TableOfContents
            articleTitle={post.title}
            className="!p-0 !bg-transparent !border-0 !shadow-none !m-0"
          />
        </nav>

        <div className="prose prose-gray md:prose-lg lg:prose-xl max-w-none
          prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-16 prose-h2:mb-6
          prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-10 prose-h3:mb-4
          prose-h4:text-lg prose-h4:md:text-xl prose-h4:mt-8 prose-h4:mb-4
          prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
          prose-li:text-gray-600 prose-li:leading-relaxed prose-li:my-2
          prose-strong:text-gray-900 prose-strong:font-bold
          prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
        ">
          {isAstroBlog ? (
            <div dangerouslySetInnerHTML={{ __html: astroHtml }} className="astro-blog-content" />
          ) : (
            sections.map((section: any, index: number) => {
              const renderTextWithLinks = (text: string) => {
                const safeText = sanitizeTextContent(text || '');
                const combinedRegex = /(?:\[([^\]]+)\]\(([^)]+)\))|(?:<a\s+[^>]*href=['"]([^'"]+)['"][^>]*>([^<]+)<\/a>)|(?:<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>)/gi;
                const parts: (string | JSX.Element)[] = [];
                let lastIndex = 0;
                let match;

                while ((match = combinedRegex.exec(safeText)) !== null) {
                  if (match.index > lastIndex) {
                    parts.push(safeText.substring(lastIndex, match.index));
                  }
                  if (match[1] && match[2]) {
                    parts.push(<Link key={match.index} to={match[2]} className="text-blue-600 font-black hover:underline">{match[1]}</Link>);
                  } else if (match[3] && match[4]) {
                    const isExternal = match[3].startsWith('http');
                    if (isExternal) {
                      parts.push(<a key={match.index} href={match[3]} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-black hover:underline">{match[4]}</a>);
                    } else {
                      parts.push(<Link key={match.index} to={match[3]} className="text-blue-600 font-black hover:underline">{match[4]}</Link>);
                    }
                  } else if (match[5]) {
                    parts.push(<strong key={match.index} className="font-black text-gray-900">{match[5]}</strong>);
                  }
                  lastIndex = match.index + match[0].length;
                }
                if (lastIndex < safeText.length) parts.push(safeText.substring(lastIndex));
                return parts.length > 0 ? parts : safeText;
              };

              return (
                <div key={index}>
                  {index === Math.floor(sections.length / 2) && (
                    <AutoInternalLinks 
                      keywords={resolvedKeywords} 
                      categories={post.categories} 
                      title={post.title} 
                    />
                  )}
                  {index === Math.floor(sections.length / 2) && (
                    <div className="my-8 flex justify-center w-full clear-both">
                      {index % 8 === 0 ? (
                        <BannerAd width={300} height={250} />
                      ) : (
                        <AdInArticle className="my-8" />
                      )}
                    </div>
                  )}
                  {/* Ad placements: Every 4 paragraphs starting from index 2 */}
                  {index > 0 && index % 4 === 0 && (
                    <div className="my-10 flex justify-center w-full clear-both">
                      {index % 8 === 0 ? (
                        <BannerAd width={300} height={250} />
                      ) : (
                        <AdInArticle className="my-8" />
                      )}
                    </div>
                  )}
                  {section.type === 'paragraph' && <p>{renderTextWithLinks(section.content || '')}</p>}
                  {section.type === 'heading' && (
                    <h2 id={slugifyHeading(section.content || '', index)}>
                      {renderTextWithLinks(section.content || '')}
                    </h2>
                  )}
                  {section.type === 'subheading' && (
                    <h3 id={slugifyHeading(section.content || '', index)}>
                      {renderTextWithLinks(section.content || '')}
                    </h3>
                  )}
                  {section.type === 'subsubheading' && (
                    <h4 id={slugifyHeading(section.content || '', index)}>
                      {renderTextWithLinks(section.content || '')}
                    </h4>
                  )}
                  {section.type === 'minorheading' && (
                    <h5 id={slugifyHeading(section.content || '', index)} className="font-bold text-gray-800 uppercase tracking-wider text-sm mb-4">
                      {renderTextWithLinks(section.content || '')}
                    </h5>
                  )}
                  {section.type === 'list' && (
                    <ul className="list-disc pl-6 my-6 space-y-2 marker:text-blue-500">
                      {(section.items || []).map((item: string, i: number) => (
                        <li key={i} className="pl-2">
                          <span className="text-slate-700 leading-relaxed">{renderTextWithLinks(item)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.type === 'image' && section.url && (
                    <figure className="my-16 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50">
                      <img src={section.url} alt={section.caption || ''} className="w-full" />
                      {section.caption && <figcaption className="p-8 text-center text-xs font-black text-slate-400 uppercase tracking-widest bg-white border-t border-slate-50">{section.caption}</figcaption>}
                    </figure>
                  )}
                  {section.type === 'quote' && (
                    <blockquote className="bg-slate-900 rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden my-20 shadow-2xl">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px]" />
                      <div className="relative z-10 text-3xl font-black italic leading-relaxed text-slate-100 mb-10">
                        "{renderTextWithLinks(section.content || '')}"
                      </div>
                      {section.author && (
                        <div className="flex items-center gap-4">
                          <div className="h-0.5 w-8 bg-blue-500 rounded-full" />
                          <div className="text-blue-400 font-black uppercase text-xs tracking-widest">— {section.author}</div>
                        </div>
                      )}
                    </blockquote>
                  )}
                </div>
              );
            })
          )}

          {/* Pros & Cons Section */}
          {post.prosCons && (
            <div className="not-prose grid md:grid-cols-2 gap-6 my-20">
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-[2.5rem] p-8 shadow-sm">
                <h3 className="text-emerald-900 font-black text-xl mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  फायदे (Key Pros)
                </h3>
                <ul className="space-y-4">
                  {post.prosCons.pros.map((str: string, i: number) => (
                    <li key={i} className="flex gap-3 text-base text-emerald-900 font-semibold leading-relaxed">
                      <span className="text-emerald-500 shrink-0 mt-1">✓</span> {str}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-rose-50/50 border border-rose-200 rounded-[2.5rem] p-8 shadow-sm">
                <h3 className="text-rose-900 font-black text-xl mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                  </div>
                  कमियां (Potential Cons)
                </h3>
                <ul className="space-y-4">
                  {post.prosCons.cons.map((weak: string, i: number) => (
                    <li key={i} className="flex gap-3 text-base text-rose-900 font-semibold leading-relaxed">
                      <span className="text-rose-500 shrink-0 mt-1">✗</span> {weak}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-24 mb-16">
            <ArticleExpertReview
              reviewer={{
                name: authorName,
                role: authorTitle,
                bio: authorBio,
                image: AUTHOR_IMAGE
              }}
              reviewedDate={post.date}
            />
          </div>

          {/* Expert Bio / Recommendation */}
          <AlsoRead
            items={allPosts
              .filter(p => p.slug !== slug && (p.categories || []).some((c: string) => (post.categories || []).includes(c)))
              .slice(0, 3)
              .map(p => ({ title: p.title, link: `/blog/${p.slug}` }))
            }
          />
        </div>

        <div className="bg-white border-t border-slate-100 py-16 px-4 text-center mt-20">
          <div className="inline-block p-6 rounded-3xl bg-amber-50/50 border border-amber-100 text-xs font-bold text-amber-900/60 leading-relaxed italic">
            Disclaimer: This content is for educational purposes only. I am not a certified financial expert. Please consult with a qualified professional before making any financial decisions.
          </div>
        </div>

        {/* Cross-promotion SEO block */}
        <div className="bg-slate-50 border-t border-slate-200 py-12 px-4 sm:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-black text-slate-900 mb-4">Explore More on MoneyCal</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link to="/blog" reloadDocument className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:border-blue-300 hover:shadow-sm transition-all">
                <span className="text-lg block mb-1">📝</span>
                <span className="text-xs font-bold text-slate-700">All Blog Posts</span>
              </Link>
              <Link to="/news" reloadDocument className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:border-blue-300 hover:shadow-sm transition-all">
                <span className="text-lg block mb-1">📰</span>
                <span className="text-xs font-bold text-slate-700">Market News</span>
              </Link>
              <Link to="/learn" className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:border-blue-300 hover:shadow-sm transition-all">
                <span className="text-lg block mb-1">📚</span>
                <span className="text-xs font-bold text-slate-700">Learn Finance</span>
              </Link>
              <Link to="/calculators" className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:border-blue-300 hover:shadow-sm transition-all">
                <span className="text-lg block mb-1">🧮</span>
                <span className="text-xs font-bold text-slate-700">200+ Calculators</span>
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {getRelatedCalculators().map(calc => (
                <Link key={calc.id} to={calc.url} className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
                  {calc.name} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </MasterArticleLayout>
    </>
  );
};

export default BlogPost;
