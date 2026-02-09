import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePathnameSafe, useOriginSafe } from '../contexts/PathnameContext';
import {
  ArrowLeft, Calendar, User, Tag, Bookmark,
  Facebook, Twitter, Linkedin, Copy, ChevronRight
} from 'lucide-react';
import { getBlogPostBySlug, getRelatedPosts } from '../data/allBlogData';
import { getAuthorBySlug } from '../data/blogAuthors';
import { astroBlog1 } from '../data/astroBlogs/astroBlog1';
import { astroBlog2 } from '../data/astroBlogs/astroBlog2';
import { astroBlog3 } from '../data/astroBlogs/astroBlog3';
import { astroBlog4 } from '../data/astroBlogs/astroBlog4';
import { astroBlog5 } from '../data/astroBlogs/astroBlog5';
import { astroBlog6 } from '../data/astroBlogs/astroBlog6';
import SEOHelmet from '../components/SEOHelmet';

// Helper functions for astro blogs
const allAstroBlogs = [
  { ...astroBlog1, date: '2024-12-15', readingTime: 8, views: 1250, featured: true, authorTitle: 'Vedic Astrology Specialist' },
  { ...astroBlog2, date: '2024-12-14', readingTime: 6, views: 980, featured: false, authorTitle: 'Vedic Astrology Specialist' },
  { ...astroBlog3, date: '2024-12-13', readingTime: 10, views: 1450, featured: true, authorTitle: 'Vedic Astrology Specialist' },
  { ...astroBlog4, date: '2024-12-12', readingTime: 7, views: 890, featured: false, authorTitle: 'Vedic Astrology Specialist' },
  { ...astroBlog5, date: '2024-12-11', readingTime: 9, views: 1120, featured: true, authorTitle: 'Vedic Astrology Specialist' },
  { ...astroBlog6, date: '2024-12-10', readingTime: 12, views: 1680, featured: true, authorTitle: 'Vedic Astrology Specialist' }
];

const getAstroBlogBySlug = (slug: string) => {
  return allAstroBlogs.find(blog => blog.slug === slug);
};

const getRelatedAstroPosts = (currentSlug: string, limit: number = 3) => {
  return allAstroBlogs
    .filter(blog => blog.slug !== currentSlug)
    .slice(0, limit);
};

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = usePathnameSafe();
  const origin = useOriginSafe();

  // Check if this is an astro finance blog post
  const isAstroBlog = location.includes('/astro-finance/blog/');

  const post = isAstroBlog ? getAstroBlogBySlug(slug || '') : getBlogPostBySlug(slug || '');
  const relatedPosts = isAstroBlog ? getRelatedAstroPosts(slug || '', 3) : getRelatedPosts(slug || '', 4);
  const authorSlug = (post as any)?.authorSlug || 'harsh-raj';
  const author = isAstroBlog ? { name: 'Harsh Raj', slug: 'harsh-raj', role: 'Vedic Astrology Specialist', bio: 'Vedic Astrology Specialist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', sameAs: [] } : getAuthorBySlug(authorSlug);
  const displayAuthor = author || getAuthorBySlug('harsh-raj');
  const lastUpdated = (post as any)?.lastUpdated || post?.date || new Date().toISOString().split('T')[0];
  const dateModified = lastUpdated;

  // Content typing helpers to avoid implicit any and union issues
  type BlogContentSection = {
    type: 'paragraph' | 'heading' | 'subheading' | 'list' | 'image' | 'quote';
    content?: string;
    items?: string[];
    url?: string;
    caption?: string;
    author?: string;
  };

  const astroHtml: string = typeof (post as { content?: unknown })?.content === 'string' ? (post as { content: string }).content : '';
  const sections: BlogContentSection[] = Array.isArray((post as { content?: unknown })?.content) ? ((post as { content: unknown[] }).content as BlogContentSection[]) : [];

  function shareOn(platform: 'facebook' | 'twitter' | 'linkedin') {
    const url = typeof window !== 'undefined' ? window.location.href : `${origin}${location}`;
    const text = post?.title || "Check out this blog on Fincal!";
    let shareUrl = '';
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    }
    if (typeof window !== 'undefined') window.open(shareUrl, '_blank', 'noopener');
  }

  function copyLink() {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  }

  if (!post) {
    // Return 404 status - this helps Google understand it's a real 404, not soft 404
    if (typeof window !== 'undefined') {
      window.document.title = '404 - Blog Post Not Found | MoneyCal';
    }
    return (
      <>
        <SEOHelmet
          title="404 - Blog Post Not Found"
          description="The blog post you're looking for doesn't exist or may have been moved."
          url={location}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">404 - Blog Post Not Found</h1>
          <p className="text-neutral-600 mb-8">The blog post you're looking for doesn't exist or may have been moved.</p>
          <button
            onClick={() => navigate(isAstroBlog ? '/astro-finance' : '/blog')}
            className="btn btn-primary"
          >
            Back to {isAstroBlog ? 'Astro Finance' : 'Blog'}
          </button>
        </div>
      </>
    );
  }

  // Calculate reading time
  const calculateReadingTime = () => {
    if (Array.isArray(post.content)) {
      const wordCount = post.content.reduce((count, section: BlogContentSection) => {
        if (section.type === 'paragraph' || section.type === 'heading' || section.type === 'subheading') {
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
  const wordCount = Array.isArray(post.content) ? post.content.reduce((count, section: BlogContentSection) => {
    if (section.type === 'paragraph' || section.type === 'heading' || section.type === 'subheading') {
      return count + (section.content?.split(' ').length || 0);
    }
    if (section.type === 'list' && section.items) {
      return count + section.items.join(' ').split(' ').length;
    }
    return count;
  }, 0) : 500;

  const searchableKeywords = (post as any)?.searchableKeywords || post.categories || [];
  const keywordsStr = Array.isArray(searchableKeywords) ? searchableKeywords.join(', ') : (post.categories || []).join(', ');

  // Build table of contents from headings (Google-friendly structure)
  const tocEntries: { id: string; text: string; level: 'h2' | 'h3' }[] = [];
  sections.forEach((section: BlogContentSection, idx: number) => {
    if (section.type === 'heading' && section.content) {
      const id = `section-${idx}-${section.content.slice(0, 30).replace(/\s+/g, '-').replace(/[^\w-]/g, '').toLowerCase()}`;
      tocEntries.push({ id, text: section.content, level: 'h2' });
    }
    if (section.type === 'subheading' && section.content) {
      const id = `section-${idx}-${section.content.slice(0, 30).replace(/\s+/g, '-').replace(/[^\w-]/g, '').toLowerCase()}`;
      tocEntries.push({ id, text: section.content, level: 'h3' });
    }
  });

  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.coverImage,
      "author": {
        "@type": "Person",
        "name": displayAuthor?.name || 'MoneyCal Team',
        "url": `https://moneycal.in/author/${displayAuthor?.slug || 'harsh-raj'}`,
        "image": displayAuthor?.image,
        "sameAs": (displayAuthor as any)?.sameAs || []
      },
      "publisher": {
        "@type": "Organization",
        "name": "MoneyCal India",
        "logo": { "@type": "ImageObject", "url": "https://moneycal.in/logo.png" }
      },
      "datePublished": post.date,
      "dateModified": dateModified,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://moneycal.in${isAstroBlog ? '/astro-finance/blog/' : '/blog/'}${post.slug}`
      },
      "wordCount": wordCount,
      "articleBody": post.excerpt,
      "keywords": keywordsStr
    };
  };

  return (
    <>
      <SEOHelmet
        title={post.title}
        description={post.excerpt}
        keywords={keywordsStr}
        image={post.coverImage}
        url={`${isAstroBlog ? '/astro-finance/blog/' : '/blog/'}${post.slug}`}
        author={displayAuthor?.name}
        articleModifiedTime={dateModified}
      />
      {/* Add structured data for rich snippets */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(isAstroBlog ? '/astro-finance' : '/blog')}
            className="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to {isAstroBlog ? 'Astro Finance' : 'Blog'}
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main blog section – reading-optimized layout */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
              {/* Blog header – clear hierarchy for Google */}
              <header className="p-6 sm:p-8 pb-6 border-b border-neutral-100">
                <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold text-neutral-900 mb-4 leading-tight tracking-tight">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center text-sm text-neutral-500 gap-x-6 gap-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1.5 text-neutral-400" />
                    <span className="mr-1.5 font-medium text-neutral-600">By</span>
                    <Link
                      to={`/author/${displayAuthor?.slug || 'harsh-raj'}`}
                      className="hover:text-blue-600 transition-colors font-medium text-neutral-800"
                    >
                      {displayAuthor?.name || 'MoneyCal Team'}
                    </Link>
                  </div>
                  <span><Calendar className="h-4 w-4 inline mr-1 align-middle" />{post.date}</span>
                  <span>{readingTime} min read</span>
                  <span>{wordCount.toLocaleString()} words</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.categories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-100"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {category}
                    </span>
                  ))}
                </div>
                {post.coverImage && (
                  <div className="mt-6 rounded-xl overflow-hidden shadow-md border border-neutral-100">
                    <picture>
                      <source srcSet={post.coverImage.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full aspect-[16/9] object-cover"
                        loading="eager"
                        fetchPriority="high"
                      />
                    </picture>
                  </div>
                )}
              </header>

              <div className="p-6 sm:p-8">
                {/* Key takeaways – summary box (Google + readability) */}
                {post.excerpt && (
                  <section className="blog-post-key-takeaways" aria-label="Key takeaways">
                    <h2 className="text-sm font-semibold text-sky-800 uppercase tracking-wider mb-2">In this article</h2>
                    <p>{post.excerpt}</p>
                  </section>
                )}

                {/* Table of contents – only when we have headings */}
                {!isAstroBlog && tocEntries.length > 0 && (
                  <nav className="blog-post-toc" aria-label="Table of contents">
                    <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-2">Contents</h2>
                    <ul>
                      {tocEntries.map((entry, i) => (
                        <li key={i} className={entry.level === 'h3' ? 'pl-4' : ''}>
                          <a href={`#${entry.id}`} className="block py-0.5 hover:text-blue-700">
                            {entry.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}

                {/* Blog content – prose theme for all posts */}
                <div className="blog-post-prose mt-8 mb-8">
                  {isAstroBlog ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: astroHtml }}
                      className="astro-blog-content blog-post-prose"
                    />
                  ) : (
                    sections.map((section: BlogContentSection, index: number) => {
                      const renderTextWithLinks = (text: string) => {
                        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                        const parts: (string | JSX.Element)[] = [];
                        let lastIndex = 0;
                        let match;
                        while ((match = linkRegex.exec(text)) !== null) {
                          if (match.index > lastIndex) parts.push(text.substring(lastIndex, match.index));
                          parts.push(
                            <Link key={match.index} to={match[2]} className="text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2">
                              {match[1]}
                            </Link>
                          );
                          lastIndex = match.index + match[0].length;
                        }
                        if (lastIndex < text.length) parts.push(text.substring(lastIndex));
                        return parts.length > 0 ? parts : text;
                      };

                      const headingId = (section.type === 'heading' || section.type === 'subheading') && section.content
                        ? `section-${index}-${section.content.slice(0, 30).replace(/\s+/g, '-').replace(/[^\w-]/g, '').toLowerCase()}`
                        : undefined;

                      return (
                        <section key={index}>
                          {section.type === 'paragraph' && <p>{renderTextWithLinks(section.content || '')}</p>}
                          {section.type === 'heading' && (
                            <h2 id={headingId} className="scroll-mt-24">{renderTextWithLinks(section.content || '')}</h2>
                          )}
                          {section.type === 'subheading' && (
                            <h3 id={headingId} className="scroll-mt-24">{renderTextWithLinks(section.content || '')}</h3>
                          )}
                          {section.type === 'list' && (
                            <ul>
                              {(section.items || []).map((item: string, i: number) => (
                                <li key={i}>{renderTextWithLinks(item)}</li>
                              ))}
                            </ul>
                          )}
                          {section.type === 'image' && section.url && (
                            <figure>
                              <picture>
                                <source srcSet={section.url.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                                <img src={section.url} alt={section.caption || ''} className="w-full rounded-lg" loading="lazy" />
                              </picture>
                              {section.caption && <figcaption>{section.caption}</figcaption>}
                            </figure>
                          )}
                          {section.type === 'quote' && (
                            <blockquote>
                              {renderTextWithLinks(section.content || '')}
                              {section.author && <footer className="text-sm text-neutral-500 mt-2">— {section.author}</footer>}
                            </blockquote>
                          )}
                        </section>
                      );
                    })
                  )}
                </div>
                {/* Social Share & Save */}
                <div className="border-t border-neutral-200 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-700 mb-2">Share this article</h3>
                    <div className="flex gap-3">
                    <button
                      aria-label="Share on Facebook"
                      onClick={() => shareOn('facebook')}
                      className="text-neutral-600 hover:text-[#1877F2] transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </button>
                    <button
                      aria-label="Share on Twitter"
                      onClick={() => shareOn('twitter')}
                      className="text-neutral-600 hover:text-[#1DA1F2] transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </button>
                    <button
                      aria-label="Share on LinkedIn"
                      onClick={() => shareOn('linkedin')}
                      className="text-neutral-600 hover:text-[#0A66C2] transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </button>
                    <button
                      aria-label="Copy link"
                      onClick={copyLink}
                      className="text-neutral-600 hover:text-primary-500 transition-colors"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                  </div>
                </div>
                <div>
                  <button className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors">
                    <Bookmark className="h-5 w-5 mr-2" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
                {/* Author box – EEAT */}
                <section
                  className="bg-neutral-50 rounded-xl p-6 my-8 flex flex-col sm:flex-row items-center gap-4 border border-neutral-100"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0 shadow">
                  <img
                    src={displayAuthor?.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'}
                    alt={displayAuthor?.name || 'Author'}
                    className="h-full w-full object-cover"
                    itemProp="image"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-neutral-900 flex items-center gap-2" itemProp="name">
                    <Link 
                      to={`/author/${displayAuthor?.slug || 'harsh-raj'}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {displayAuthor?.name || 'MoneyCal Team'}
                    </Link>
                    {(displayAuthor as any)?.sameAs?.filter(Boolean).map((url: string, i: number) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${displayAuthor?.name} on social`}
                        className="ml-2 hover:opacity-80"
                      >
                        {url.includes('linkedin') ? <Linkedin className="inline h-5 w-5 text-[#0A66C2]" /> : <Twitter className="inline h-5 w-5 text-[#1DA1F2]" />}
                      </a>
                    ))}
                  </h4>
                  <p className="text-sm text-neutral-600" itemProp="jobTitle">{displayAuthor?.role || 'Finance & Content'}</p>
                  <p className="text-neutral-700 mt-1" itemProp="description">{displayAuthor?.bio || ''}</p>
                  <Link 
                    to={`/author/${displayAuthor?.slug || 'harsh-raj'}`}
                    className="inline-flex items-center mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Full Profile <ChevronRight className="w-4 h-4 ml-0.5" />
                  </Link>
                </div>
              </section>

                {/* Internal links – browse by category */}
                {!isAstroBlog && (post.categories || []).length > 0 && (
                  <section className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 my-8">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">ये भी पढ़ें</h3>
                  <p className="text-sm text-neutral-500 mb-3">More in this topic</p>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.slice(0, 5).map((cat: string) => (
                      <Link
                        key={cat}
                        to={`/blog?category=${encodeURIComponent(cat)}`}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-700 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium transition-colors"
                      >
                        {cat} <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    ))}
                  </div>
                </section>
                )}

                {/* References / Sources */}
                <section className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 my-8">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">References and Sources</h3>
                <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                  <li><a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Reserve Bank of India (RBI)</a></li>
                  <li><a href="https://www.sebi.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Securities and Exchange Board of India (SEBI)</a></li>
                  <li><a href="https://www.incometax.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Income Tax Department (India)</a></li>
                  </ul>
                </section>
            </article>
          </div>
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Suggested / Related Articles */}
            <section className="bg-white rounded-xl shadow-md p-6" aria-label="Suggested articles">
              <h3 className="text-xl font-semibold text-neutral-900 mb-1">ये भी पढ़ें</h3>
              <p className="text-sm text-neutral-500 mb-4">Suggested for you</p>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={isAstroBlog ? `/astro-finance/blog/${relatedPost.slug}` : `/blog/${relatedPost.slug}`}
                    className="block group"
                  >
                    <div className="flex items-start">
                      <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 mr-3">
                        <img
                          src={relatedPost.coverImage || (relatedPost as any).featuredImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200'}
                          alt={relatedPost.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-neutral-900 group-hover:text-primary-600 line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1">{relatedPost.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
            {/* Calculators */}
            <section className="bg-[--success-50] rounded-xl p-6 border border-[--success-100]">
              <h3 className="text-xl font-semibold text-[--success-900] mb-4">Government Scheme Calculators</h3>
              <p className="text-sm text-[--success-700] mb-4">
                Use our calculators to plan your investments in government schemes and maximize your returns.
              </p>
              <ul className="space-y-3">
                <li>
                  <Link to="/calculators/sukanya-samriddhi-calculator" className="text-sm text-[--success-800] hover:text-[--success-900] font-medium flex items-center">
                    <span className="h-5 w-5 rounded-full bg-[--success-200] text-[--success-700] flex items-center justify-center flex-shrink-0 mr-2">→</span>
                    Sukanya Samriddhi Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/calculators/nps-calculator" className="text-sm text-[--success-800] hover:text-[--success-900] font-medium flex items-center">
                    <span className="h-5 w-5 rounded-full bg-[--success-200] text-[--success-700] flex items-center justify-center flex-shrink-0 mr-2">→</span>
                    NPS Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/calculators/post-office-schemes-calculator" className="text-sm text-[--success-800] hover:text-[--success-900] font-medium flex items-center">
                    <span className="h-5 w-5 rounded-full bg-[--success-200] text-[--success-700] flex items-center justify-center flex-shrink-0 mr-2">→</span>
                    Post Office Schemes Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/calculators/ppf-calculator" className="text-sm text-[--success-800] hover:text-[--success-900] font-medium flex items-center">
                    <span className="h-5 w-5 rounded-full bg-[--success-200] text-[--success-700] flex items-center justify-center flex-shrink-0 mr-2">→</span>
                    PPF Calculator
                  </Link>
                </li>
              </ul>
            </section>
            {/* Newsletter */}
            <section className="bg-primary-50 rounded-xl p-6 border border-primary-100">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Subscribe to Our Newsletter</h3>
              <p className="text-sm text-primary-700 mb-4">
                Get the latest financial tips and insights delivered straight to your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="input w-full"
                  required
                  aria-label="Your email address"
                />
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                >
                  Subscribe
                </button>
              </form>
            </section>
          </aside>
        </div>
      </div>
      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-900">
          <strong>Disclaimer:</strong> This content is for educational purposes only. I am not a certified financial expert or advisor. All information is based on personal experience, research, and knowledge, and should not be considered as professional or legal advice. Please consult with a qualified expert before making any financial decisions. All risks associated with your actions are your own responsibility. If you find any mistakes or inaccuracies, please contact me as soon as possible so I can make corrections. I try my best to comply with all applicable laws in India.
        </div>
      </div>
    </>
  );
};

export default BlogPost; 
