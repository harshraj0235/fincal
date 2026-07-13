import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { loadAllBlogData } from '../data/lazyBlogData';
import { astroBlog1 } from '../data/astroBlogs/astroBlog1';
import { astroBlog2 } from '../data/astroBlogs/astroBlog2';
import { astroBlog3 } from '../data/astroBlogs/astroBlog3';
import { astroBlog4 } from '../data/astroBlogs/astroBlog4';
import { astroBlog5 } from '../data/astroBlogs/astroBlog5';
import { astroBlog6 } from '../data/astroBlogs/astroBlog6';
import { teamProfiles } from '../data/teamProfiles';
import SEOHelmet from '../components/SEOHelmet';
import { getFreshDateISO48h } from '../utils/getFreshDate';
import { sanitizeDeepContent, sanitizeTextContent } from '../utils/contentSanitizer';
import { BannerAd } from '../components/BannerAd';
import { Helmet } from 'react-helmet-async';

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
  const [isLoading, setIsLoading] = useState(!isAstroBlog);

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

  if (isLoading) {
    return (
      <div style={{...styles.pageWrapper, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <p style={{marginTop: 15, color: '#64748b'}}>Loading article…</p>
      </div>
    );
  }

  if (!post) {
    if (typeof window !== 'undefined') window.document.title = '404 - Blog Post Not Found | MoneyCal';
    return (
      <>
        <SEOHelmet title="404 - Blog Post Not Found" description="The blog post you're looking for doesn't exist or may have been moved." url={window.location.pathname} />
        <div style={{...styles.pageWrapper, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem'}}>
          <h1 style={styles.h1}>404 - Blog Post Not Found</h1>
          <p style={{color: '#64748b', marginBottom: '2rem'}}>The blog post you're looking for doesn't exist or may have been moved.</p>
          <button 
            onClick={() => navigate(isAstroBlog ? '/astro-finance' : '/blog')} 
            style={{padding: '10px 20px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600}}
          >
            Back to {isAstroBlog ? 'Astro Finance' : 'Blog'}
          </button>
        </div>
      </>
    );
  }

  const wordCount = Array.isArray(post.content) ? post.content.reduce((count: number, section: any) => {
    if (section.type === 'paragraph' || section.type === 'heading' || section.type === 'subheading' || section.type === 'subsubheading' || section.type === 'minorheading') {
      return count + (section.content?.split(' ').length || 0);
    }
    if (section.type === 'list' && section.items) {
      return count + section.items.join(' ').split(' ').length;
    }
    return count;
  }, 0) : 500;

  const baseUrl = 'https://moneycal.in';
  const authorName = post.author || 'MoneyCal Team';
  const postPath = isAstroBlog ? '/astro-finance/blog/' : '/blog/';
  const canonicalUrl = `${baseUrl}${postPath}${post.slug}`;
  const freshDateISO = getFreshDateISO48h();
  
  const relatedArticles = allPosts
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  const resolvedKeywords = Array.isArray(post.keywords) ? post.keywords : (Array.isArray(post.categories) ? post.categories : []);

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
        "url": `${baseUrl}/about-us`
      },
      "publisher": {
        "@type": "Organization",
        "name": "MoneyCal",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`
        }
      },
      "datePublished": post.date,
      "dateModified": freshDateISO,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "wordCount": wordCount,
      "articleBody": post.excerpt || post.title
    };
  };

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
        parts.push(<Link key={match.index} to={match[2]} style={styles.a}>{match[1]}</Link>);
      } else if (match[3] && match[4]) {
        const isExternal = match[3].startsWith('http');
        if (isExternal) {
          parts.push(<a key={match.index} href={match[3]} target="_blank" rel="noopener noreferrer" style={styles.a}>{match[4]}</a>);
        } else {
          parts.push(<Link key={match.index} to={match[3]} style={styles.a}>{match[4]}</Link>);
        }
      } else if (match[5]) {
        parts.push(<strong key={match.index} style={{fontWeight: 800, color: '#0f172a'}}>{match[5]}</strong>);
      }
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < safeText.length) parts.push(safeText.substring(lastIndex));
    return parts.length > 0 ? parts : safeText;
  };

  const contentValue = post && typeof post === 'object' ? (post as { content?: unknown }).content : undefined;
  const astroHtml: string = typeof contentValue === 'string' ? contentValue : '';
  const sections: any[] = Array.isArray(contentValue) ? contentValue : [];

  return (
    <>
      <SEOHelmet
        title={`${post.title} - MoneyCal`}
        description={post.excerpt}
        image={post.coverImage}
        url={canonicalUrl}
        keywords={resolvedKeywords.join(', ')}
        author={authorName}
        articlePublishedTime={post.date}
        articleModifiedTime={freshDateISO}
        wordCount={wordCount}
        isFinanceContent={true}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData())}
        </script>
      </Helmet>

      <style>{`
        .discover-ad-sidebar {
          display: none;
          width: 300px;
        }
        @media (min-width: 1100px) {
          .discover-ad-sidebar {
            display: block;
            position: sticky;
            top: 80px;
            height: 600px;
          }
        }
      `}</style>

      <div style={styles.pageWrapper}>


        <div style={styles.layout}>
          <aside className="discover-ad-sidebar">
            <BannerAd format="auto" height={600} width={300} />
          </aside>

          <main style={styles.container}>
            <article>
              <img
                src={post.coverImage || '/default-blog-hero.jpg'}
                alt={post.title}
                style={styles.heroImg}
                fetchPriority="high"
              />
              <div style={styles.articleContent}>
                <h1 style={styles.h1}>{post.title}</h1>
                <div style={styles.meta}>
                  By <strong>{authorName}</strong> • {post.date && !isNaN(new Date(post.date).getTime()) 
                    ? new Date(post.date).toLocaleDateString('hi-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : ''}
                </div>

                <div style={styles.contentBody}>
                  {isAstroBlog ? (
                    <div dangerouslySetInnerHTML={{ __html: astroHtml }} />
                  ) : (
                    sections.map((section: any, index: number) => {
                      const showAd = section.type === 'paragraph' && index > 0 && index % 4 === 0;
                      
                      let content = null;
                      if (section.type === 'paragraph') {
                        content = <p style={styles.p}>{renderTextWithLinks(section.content || '')}</p>;
                      } else if (section.type === 'heading') {
                        content = <h2 style={styles.h2}>{renderTextWithLinks(section.content || '')}</h2>;
                      } else if (section.type === 'subheading') {
                        content = <h3 style={styles.h3}>{renderTextWithLinks(section.content || '')}</h3>;
                      } else if (section.type === 'subsubheading' || section.type === 'minorheading') {
                        content = <h4 style={styles.h4}>{renderTextWithLinks(section.content || '')}</h4>;
                      } else if (section.type === 'list') {
                        content = (
                          <ul style={styles.ul}>
                            {(section.items || []).map((item: string, i: number) => (
                              <li key={i} style={{marginBottom: '8px', marginLeft: '20px', listStyleType: 'disc'}}>
                                {renderTextWithLinks(item)}
                              </li>
                            ))}
                          </ul>
                        );
                      } else if (section.type === 'image' && section.url) {
                        content = <img src={section.url} alt={section.caption || ''} style={styles.contentImg} loading="lazy" />;
                      } else {
                        content = <p style={styles.p}>{renderTextWithLinks(section.content || '')}</p>;
                      }

                      return (
                        <React.Fragment key={index}>
                          {content}
                          {showAd && (
                            <div style={styles.inArticleAd}>
                              <BannerAd format="fluid" lazy={true} />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })
                  )}

                  {/* Pros & Cons Section */}
                  {post.prosCons && (
                    <div style={{display: 'flex', gap: '20px', margin: '40px 0', flexWrap: 'wrap'}}>
                      <div style={{flex: '1 1 300px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '24px'}}>
                        <h3 style={{...styles.h3, marginTop: 0, color: '#166534'}}>✓ फायदे (Pros)</h3>
                        <ul style={{padding: 0, listStyle: 'none'}}>
                          {post.prosCons.pros.map((str: string, i: number) => (
                            <li key={i} style={{marginBottom: '10px', color: '#14532d'}}>• {str}</li>
                          ))}
                        </ul>
                      </div>
                      <div style={{flex: '1 1 300px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '24px'}}>
                        <h3 style={{...styles.h3, marginTop: 0, color: '#991b1b'}}>✗ कमियां (Cons)</h3>
                        <ul style={{padding: 0, listStyle: 'none'}}>
                          {post.prosCons.cons.map((str: string, i: number) => (
                            <li key={i} style={{marginBottom: '10px', color: '#7f1d1d'}}>• {str}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {relatedArticles.length > 0 && (
                  <div style={styles.recommendations}>
                    <h3 style={styles.recoHeading}>Read Next</h3>
                    <div style={styles.gridReco}>
                      {relatedArticles.map(related => (
                        <a
                          key={related.slug}
                          href={`/blog/${related.slug}`}
                          style={styles.recoCard}
                        >
                          <img
                            src={related.coverImage}
                            alt={related.title}
                            style={styles.recoCardImg}
                            loading="lazy"
                          />
                          <h4 style={styles.recoCardTitle}>{related.title}</h4>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          </main>

          <aside className="discover-ad-sidebar">
            <BannerAd format="auto" height={600} width={300} />
          </aside>
        </div>


      </div>
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  pageWrapper: { fontFamily: "'Inter', system-ui, sans-serif", backgroundColor: '#f8fafc', color: '#334155', lineHeight: 1.6, minHeight: '100vh', margin: 0, padding: 0 },
  navbar: { background: '#fff', padding: '15px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 },
  logo: { fontSize: '1.25rem', fontWeight: 800, color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' },
  logoIcon: { width: '28px', height: '28px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '6px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' },
  navLinks: { display: 'flex', gap: '20px' },
  navLink: { textDecoration: 'none', color: '#334155', fontWeight: 500, fontSize: '0.95rem' },
  layout: { display: 'flex', justifyContent: 'center', maxWidth: 1400, margin: '0 auto', padding: '20px 10px', gap: 20 },
  inArticleAd: { margin: '24px 0', textAlign: 'center' as const },
  container: { flex: 1, maxWidth: 800, background: '#ffffff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
  heroImg: { width: '100%', aspectRatio: '16/9', objectFit: 'cover' as const, display: 'block' },
  articleContent: { padding: 30 },
  h1: { fontSize: '2rem', color: '#0f172a', margin: '0 0 15px 0', lineHeight: 1.3, fontWeight: 800 },
  meta: { color: '#64748b', fontSize: '0.9rem', marginBottom: 20 },
  h2: { fontSize: '1.5rem', color: '#0f172a', margin: '30px 0 15px', fontWeight: 800 },
  h3: { fontSize: '1.25rem', color: '#0f172a', margin: '25px 0 10px', fontWeight: 700 },
  h4: { fontSize: '1.1rem', color: '#0f172a', margin: '20px 0 10px', fontWeight: 700 },
  p: { marginBottom: 20, fontSize: '1.1rem' },
  ul: { marginBottom: 20, fontSize: '1.1rem' },
  a: { color: '#2563eb', textDecoration: 'none', fontWeight: 600 },
  contentImg: { width: '100%', borderRadius: 8, margin: '20px 0' },
  recommendations: { borderTop: '1px solid #e2e8f0', marginTop: 40, paddingTop: 30 },
  recoHeading: { marginTop: 0, fontSize: '1.25rem', color: '#0f172a', fontWeight: 800 },
  gridReco: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 15 },
  recoCard: { background: '#f8fafc', borderRadius: 8, overflow: 'hidden', textDecoration: 'none', color: 'inherit', border: '1px solid #e2e8f0', transition: 'transform 0.2s' },
  recoCardImg: { width: '100%', aspectRatio: '16/9', objectFit: 'cover' as const },
  recoCardTitle: { padding: 12, margin: 0, fontSize: '0.95rem', lineHeight: 1.4, color: '#0f172a', fontWeight: 600 },
  footer: { textAlign: 'center' as const, padding: 30, color: '#64748b', fontSize: '0.9rem', borderTop: '1px solid #e2e8f0', background: '#fff', marginTop: 40 },
  footerLinks: { marginBottom: 15 },
  footerLink: { color: '#64748b', margin: '0 10px', textDecoration: 'none' }
};

export default BlogPost;
