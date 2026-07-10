import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getFinancePostBySlug } from '../data/financePosts';
import SEOHelmet from '../components/SEOHelmet';
import MasterArticleLayout from '../components/articles/MasterArticleLayout';
import PremiumHero from '../components/articles/PremiumHero';
import AISummaryBox from '../components/articles/AISummaryBox';
import StickyShareBar from '../components/articles/StickyShareBar';
import TrendingSidebar from '../components/articles/TrendingSidebar';
import { teamProfiles } from '../data/teamProfiles';

const FinancePostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const post = getFinancePostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The finance blog post you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate reading time (average 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;

  // Structured data for SEO
  const postStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.content.substring(0, 160) + "...",
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author || "Anonymous"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Moneycal",
      "url": "https://moneycal.in"
    },
    "datePublished": post.createdAt,
    "dateModified": post.createdAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `/finance/${post.slug}`
    }
  };



  const authorInfo = teamProfiles.find(p => p.name === post.author) || teamProfiles[0] || { name: post.author || 'MoneyCal Expert', role: 'Finance Analyst', image: '/authors/default.jpg' };

  const hero = (
    <PremiumHero 
      title={post.title}
      excerpt={post.content.substring(0, 160) + "..."}
      coverImage={post.image || '/default-finance-hero.jpg'}
      categories={[post.category || 'Finance']}
      authorName={authorInfo.name}
      authorImage={authorInfo.image || '/authors/default.jpg'}
      date={formatDate(post.createdAt)}
      readingTime={5}
    />
  );

  const leftSidebar = <StickyShareBar title={post.title} url={window.location.href} />;
  const rightSidebar = <TrendingSidebar trendingItems={[]} />;

  const aiSummary = {
    title: "Quick Financial Takeaway",
    points: [
      "Key insights from verified financial experts.",
      "Actionable intelligence for Indian market 2026.",
      "Human-vetted data for high-stakes decisions."
    ]
  };

  return (
    <>
      <SEOHelmet
        title={`${post.title} - Moneycal Finance Blog`}
        description={post.content.substring(0, 160) + "..."}
        keywords={`finance, ${post.category?.toLowerCase()}, personal finance, investment, moneycal`}
        url={`/finance/${post.slug}`}
        structuredData={postStructuredData}
        tags={[post.category || "Finance", "Personal Finance", "Investment"]}
      />

      <MasterArticleLayout
        hero={hero}
        leftSidebar={leftSidebar}
        rightSidebar={rightSidebar}
      >
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
              <li><Link to="/" className="hover:text-blue-600 font-medium">Home</Link></li>
              <li>/</li>
              <li><span className="text-slate-900 font-bold">{post.category}</span></li>
            </ol>
          </nav>

          <article className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-p:leading-[1.8] prose-p:text-slate-600 prose-img:rounded-3xl prose-blockquote:rounded-2xl prose-blockquote:bg-slate-50 prose-blockquote:border-blue-500 prose-p:mb-12 prose-h2:mb-12 prose-h3:mb-12 prose-h4:mb-12 prose-h5:mb-12">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>

            {/* Video */}
            {post.video && (
              <div className="mt-12 p-1 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative aspect-video">
                  <video
                    controls
                    className="w-full h-full object-cover"
                    poster={post.image}
                  >
                    <source src={post.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}

            {/* External Link */}
            {post.link && (
              <div className="mt-12 p-8 bg-blue-50 rounded-3xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mt-0">Deep Dive Resource</h3>
                  <p className="text-slate-600 text-sm mb-0">Explore additional verified data from our official partners.</p>
                </div>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 inline-flex items-center gap-2"
                >
                  Visit Resource
                </a>
              </div>
            )}
          </article>

          {/* Footer Meta */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Last Verified: {formatDate(post.createdAt)}
            </div>
            <Link
              to="/"
              className="px-6 py-2 rounded-xl bg-slate-100 text-slate-600 text-sm font-bold hover:bg-slate-200 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </MasterArticleLayout>
    </>
  );
};

export default FinancePostPage; 
