import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { discoverArticles } from '../data/discover/index';
import { DiscoverArticle, DiscoverArticleSection } from '../data/discover/types';
import { BannerAd } from '../components/BannerAd';

/**
 * DiscoverArticlePage
 * 
 * Renders a Discover article using React from the data in src/data/discover/.
 * This is the SPA fallback for client-side navigation.
 * For crawlers and direct visits, the static HTML files in public/discover/ are served by Netlify.
 */
const DiscoverArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article: DiscoverArticle | undefined = discoverArticles.find(a => a.slug === slug);

  if (!article) {
    return <Navigate to="/404" replace />;
  }

  // Get up to 3 related articles for recommendations (exclude current)
  const relatedArticles = discoverArticles
    .filter(a => a.slug !== slug)
    .slice(0, 3);

  const canonicalUrl = `https://moneycal.in/discover/${article.slug}/`;
  const coverUrl = `https://moneycal.in${article.coverImage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": [coverUrl],
    "datePublished": (article.date && !isNaN(new Date(article.date).getTime()) ? new Date(article.date) : new Date()).toISOString(),
    "dateModified": new Date().toISOString(), // Auto-Freshness Engine: Always bump modified date to today
    "author": [{
      "@type": "Person",
      "name": article.author,
      "url": "https://moneycal.in/about-us"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "MoneyCal",
      "logo": {
        "@type": "ImageObject",
        "url": "https://moneycal.in/logo.png"
      }
    },
    "description": article.snippet,
    ...(article.entities && article.entities.length > 0 && {
      "about": article.entities.map(e => ({
        "@type": "Thing",
        "name": e.name,
        "sameAs": e.url
      }))
    })
  };

  return (
    <>
      <Helmet>
        <title>{article.title} - MoneyCal</title>
        <meta name="description" content={article.snippet} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:locale" content="hi_IN" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.snippet} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={coverUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={coverUrl} />

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
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
        {/* Navbar mimicking the static HTML version */}
        <nav style={styles.navbar}>
          <a href="/" style={styles.logo}>
            <div style={styles.logoIcon}>₹</div> MoneyCal.in
          </a>
          <div style={styles.navLinks}>
            <a href="/discover" style={styles.navLink}>Discover Hub</a>
            <a href="/ipo" style={styles.navLink}>IPO Dashboard</a>
          </div>
        </nav>

        <div style={styles.layout}>
          {/* Left Ad Sidebar */}
          <aside className="discover-ad-sidebar">
            <BannerAd format="auto" height={600} width={300} />
          </aside>

          {/* Main Content */}
          <main style={styles.container}>
            <article>
              <img
                src={article.coverImage}
                alt={article.title}
                style={styles.heroImg}
                fetchPriority="high"
              />
              <div style={styles.articleContent}>
                <h1 style={styles.h1}>{article.title}</h1>
                <div style={styles.meta}>
                  By <strong>{article.author}</strong> • Published:{' '}
                  {article.date && !isNaN(new Date(article.date).getTime()) 
                    ? new Date(article.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : ''}
                  <span style={styles.freshnessTag}>
                    🟢 Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div style={styles.contentBody}>
                  {(() => {
                    const tocHeaders = article.sections.filter((s: DiscoverArticleSection) => s.type === 'h2');
                    let hasInjectedToc = false;

                    return article.sections.map((section: DiscoverArticleSection, idx: number) => {
                      const el = renderSection(section, idx);

                      if (!hasInjectedToc && section.type === 'p') {
                        hasInjectedToc = true;
                        return (
                          <React.Fragment key={`toc-frag-${idx}`}>
                            {el}
                            {tocHeaders.length > 0 && (
                              <div style={styles.tocContainer}>
                                <div style={styles.tocHeader}>Table of Contents</div>
                                <ul style={styles.tocList}>
                                  {tocHeaders.map((h2, i) => {
                                    const id = h2.content.replace(/<[^>]+>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                    return (
                                      <li key={i} style={styles.tocItem}>
                                        <a href={`#${id}`} style={styles.tocLink} dangerouslySetInnerHTML={{ __html: h2.content }} />
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}
                          </React.Fragment>
                        );
                      }
                      return el;
                    });
                  })()}
                </div>

                {/* Recommendations */}
                {relatedArticles.length > 0 && (
                  <div style={styles.recommendations}>
                    <h3 style={styles.recoHeading}>Read Next</h3>
                    <div style={styles.gridReco}>
                      {relatedArticles.map(related => (
                        <a
                          key={related.slug}
                          href={`/discover/${related.slug}/`}
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

          {/* Right Ad Sidebar */}
          <aside className="discover-ad-sidebar">
            <BannerAd format="auto" height={600} width={300} />
          </aside>
        </div>

        <footer style={styles.footer}>
          <div style={styles.footerLinks}>
            <a href="/about-us" style={styles.footerLink}>About Us</a>
            <a href="/contact-us" style={styles.footerLink}>Contact</a>
            <a href="/privacy-policy" style={styles.footerLink}>Privacy Policy</a>
            <a href="/terms-and-conditions" style={styles.footerLink}>Terms</a>
          </div>
          <p>© {new Date().getFullYear()} MoneyCal.in - All Rights Reserved.</p>
        </footer>
      </div>
    </>
  );
};

function renderSection(section: DiscoverArticleSection, idx: number) {
  // Wrap paragraphs with simulated in-article ads every 2 paragraphs 
  // (In React we just show placeholders to match static UI)
  const showAd = section.type === 'p' && idx % 2 === 0;

  let content = null;
  switch (section.type) {
    case 'h2':
      const id = section.content.replace(/<[^>]+>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      content = <h2 id={id} key={idx} style={styles.h2} dangerouslySetInnerHTML={{ __html: section.content }} />;
      break;
    case 'h3':
      content = <h3 key={idx} style={styles.h3} dangerouslySetInnerHTML={{ __html: section.content }} />;
      break;
    case 'p':
      content = <p key={idx} style={styles.p} dangerouslySetInnerHTML={{ __html: section.content }} />;
      break;
    case 'ul':
      content = <div key={idx} style={styles.ul} dangerouslySetInnerHTML={{ __html: section.content }} />;
      break;
    case 'callout':
      content = <div key={idx} style={styles.callout} dangerouslySetInnerHTML={{ __html: section.content }} />;
      break;
    case 'image':
      content = <img key={idx} src={section.content} alt={section.alt || 'Visual context related to the article'} style={styles.contentImg} loading="lazy" />;
      break;
    case 'quiz':
      content = <DiscoverQuiz key={idx} dataString={section.content} />;
      break;
    default:
      content = <p key={idx} dangerouslySetInnerHTML={{ __html: section.content }} />;
  }

  return (
    <React.Fragment key={idx}>
      {content}
      {showAd && (
        <div style={styles.inArticleAd}>
          <BannerAd format="fluid" lazy={true} />
        </div>
      )}
    </React.Fragment>
  );
}

const DiscoverQuiz: React.FC<{ dataString: string }> = ({ dataString }) => {
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  
  let quizData;
  try {
    quizData = JSON.parse(dataString);
  } catch (e) {
    return null;
  }

  const { question, options, correctAnswerIndex, explanation } = quizData;

  return (
    <div style={styles.quizContainer}>
      <h3 style={styles.quizQuestion}>🤔 Quiz Time: {question}</h3>
      <div style={styles.quizOptions}>
        {options.map((opt: string, i: number) => {
          let btnStyle = { ...styles.quizBtn };
          if (selectedOpt !== null) {
            if (i === correctAnswerIndex) {
              btnStyle = { ...btnStyle, ...styles.quizBtnCorrect };
            } else if (i === selectedOpt) {
              btnStyle = { ...btnStyle, ...styles.quizBtnWrong };
            } else {
              btnStyle = { ...btnStyle, opacity: 0.7 };
            }
          }

          return (
            <button 
              key={i} 
              onClick={() => selectedOpt === null && setSelectedOpt(i)}
              style={btnStyle}
              disabled={selectedOpt !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {selectedOpt !== null && (
        <div style={selectedOpt === correctAnswerIndex ? styles.quizFeedbackSuccess : styles.quizFeedbackError}>
          <strong>{selectedOpt === correctAnswerIndex ? '✅ Correct!' : '❌ Incorrect!'}</strong> {explanation}
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  pageWrapper: {
    fontFamily: "'Inter', system-ui, sans-serif",
    backgroundColor: '#f8fafc',
    color: '#334155',
    lineHeight: 1.6,
    minHeight: '100vh',
    margin: 0,
    padding: 0,
  },
  navbar: {
    background: '#fff',
    padding: '15px 20px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 800,
    color: '#2563eb',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoIcon: {
    width: '28px',
    height: '28px',
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    borderRadius: '6px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#334155',
    fontWeight: 500,
    fontSize: '0.95rem',
  },
  layout: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: 1400,
    margin: '0 auto',
    padding: '20px 10px',
    gap: 20,
  },
  adLabel: {
    fontSize: 10,
    color: '#9ca3af',
    textAlign: 'center' as const,
    display: 'block',
    marginBottom: 4,
  },
  adPlaceholder: {
    width: '300px',
    height: '600px',
    background: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#94a3b8',
    border: '1px dashed #cbd5e1',
    borderRadius: 8,
  },
  inArticleAd: {
    margin: '24px 0',
    textAlign: 'center' as const,
  },
  adPlaceholderInline: {
    width: '100%',
    height: '250px',
    background: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#94a3b8',
    border: '1px dashed #cbd5e1',
    borderRadius: 8,
  },
  container: {
    flex: 1,
    maxWidth: 800,
    background: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  heroImg: {
    width: '100%',
    aspectRatio: '16/9',
    objectFit: 'cover' as const,
    display: 'block',
  },
  articleContent: {
    padding: 30,
  },
  h1: {
    fontSize: '2rem',
    color: '#0f172a',
    margin: '0 0 15px 0',
    lineHeight: 1.3,
    fontWeight: 800,
  },
  meta: {
    color: '#64748b',
    fontSize: '0.9rem',
    marginBottom: 20,
  },
  contentBody: {},
  h2: {
    fontSize: '24px',
    fontWeight: '700',
    marginTop: '30px',
    marginBottom: '15px',
    color: '#000',
    scrollMarginTop: '100px',
  },
  h3: {
    fontSize: '20px',
    fontWeight: '700',
    marginTop: '25px',
    marginBottom: '10px',
    color: '#333',
  },
  p: {
    fontSize: '17px',
    lineHeight: '1.7',
    marginBottom: '20px',
    color: '#444',
  },
  tocContainer: {
    backgroundColor: '#f8f9fa',
    borderLeft: '4px solid #0056b3',
    padding: '20px',
    marginBottom: '30px',
    borderRadius: '0 8px 8px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  tocHeader: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  tocList: {
    listStyleType: 'none',
    paddingLeft: '0',
    margin: '0',
  },
  tocItem: {
    marginBottom: '10px',
    position: 'relative' as const,
    paddingLeft: '15px',
  },
  tocLink: {
    color: '#0056b3',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'color 0.2s ease',
  },
  freshnessTag: {
    display: 'inline-block',
    marginLeft: '10px',
    padding: '4px 8px',
    backgroundColor: '#e6f4ea',
    color: '#137333',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: 'bold',
  },
  ul: {
    fontSize: '17px',
    lineHeight: '1.7',
    marginBottom: '20px',
    color: '#444',
    paddingLeft: '20px',
  },
  callout: {
    backgroundColor: '#e6f2ff',
    padding: '15px 20px',
    borderLeft: '4px solid #0056b3',
    marginBottom: '20px',
    borderRadius: '4px',
    fontSize: '16px',
    color: '#333',
  },
  contentImg: {
    width: '100%',
    borderRadius: 8,
    margin: '20px 0',
  },
  recommendations: {
    borderTop: '1px solid #e2e8f0',
    marginTop: 40,
    paddingTop: 30,
  },
  recoHeading: {
    marginTop: 0,
    fontSize: '1.25rem',
    color: '#0f172a',
  },
  gridReco: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 15,
  },
  recoCard: {
    background: '#f8fafc',
    borderRadius: 8,
    overflow: 'hidden',
    textDecoration: 'none',
    color: 'inherit',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s',
  },
  recoCardImg: {
    width: '100%',
    aspectRatio: '16/9',
    objectFit: 'cover' as const,
  },
  recoCardTitle: {
    padding: 12,
    margin: 0,
    fontSize: '0.95rem',
    lineHeight: 1.4,
    color: '#0f172a',
    fontWeight: 600,
  },
  footer: {
    textAlign: 'center' as const,
    padding: 30,
    color: '#64748b',
    fontSize: '0.9rem',
    borderTop: '1px solid #e2e8f0',
    background: '#fff',
    marginTop: 40,
  },
  footerLinks: {
    marginBottom: 15,
  },
  footerLink: {
    color: '#64748b',
    margin: '0 10px',
    textDecoration: 'none',
  },
  quizContainer: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '24px',
    margin: '30px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  quizQuestion: {
    fontSize: '1.25rem',
    color: '#0f172a',
    margin: '0 0 20px 0',
    fontWeight: 700,
  },
  quizOptions: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  quizBtn: {
    padding: '14px 20px',
    background: '#fff',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    color: '#334155',
    cursor: 'pointer',
    textAlign: 'left' as const,
    fontWeight: 500,
    transition: 'all 0.2s',
  },
  quizBtnCorrect: {
    background: '#dcfce7',
    borderColor: '#22c55e',
    color: '#166534',
  },
  quizBtnWrong: {
    background: '#fee2e2',
    borderColor: '#ef4444',
    color: '#991b1b',
  },
  quizFeedbackSuccess: {
    marginTop: '20px',
    padding: '16px',
    background: '#f0fdf4',
    borderLeft: '4px solid #22c55e',
    color: '#15803d',
    borderRadius: '0 8px 8px 0',
    fontSize: '1rem',
  },
  quizFeedbackError: {
    marginTop: '20px',
    padding: '16px',
    background: '#fef2f2',
    borderLeft: '4px solid #ef4444',
    color: '#b91c1c',
    borderRadius: '0 8px 8px 0',
    fontSize: '1rem',
  },
};

export default DiscoverArticlePage;
