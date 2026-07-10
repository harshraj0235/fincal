import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { cryptoBlogs } from '../data/crypto';
import SEOHelmet from '../components/SEOHelmet';
import { ShieldCheck, TrendingUp, ArrowLeft } from 'lucide-react';

// Premium Layout Components
import MasterArticleLayout from '../components/articles/MasterArticleLayout';
import PremiumHero from '../components/articles/PremiumHero';
import AISummaryBox from '../components/articles/AISummaryBox';
import StickyShareBar from '../components/articles/StickyShareBar';
import TrendingSidebar from '../components/articles/TrendingSidebar';

const renderContent = (content: any[]) => {
  return content.map((block, idx) => {
    switch (block.type) {
      case 'heading':
        return <h2 key={idx} className="text-3xl font-black text-slate-900 mb-8 mt-16 flex items-center group">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          {block.text}
        </h2>;
      case 'subheading':
        return <h3 key={idx} className="text-2xl font-black text-slate-900 mb-6 mt-12 flex items-center">
          <div className="w-2 h-8 bg-blue-600/20 mr-4 rounded-full border-l-4 border-blue-600 shrink-0" />
          {block.text}
        </h3>;
      case 'subsubheading':
        return <h4 key={idx} className="text-xl font-black text-slate-900 mb-4 mt-8 flex items-center">
          <div className="w-1.5 h-6 bg-slate-200 mr-3 rounded-full border-l-2 border-slate-400 shrink-0" />
          {block.text}
        </h4>;
      case 'minorheading':
        return <h5 key={idx} className="text-lg font-black text-slate-800 uppercase tracking-wider mb-4 mt-6">
          {block.text}
        </h5>;
      case 'paragraph':
        return <p key={idx} className="text-slate-700 leading-loose mb-10 text-lg">{block.text}</p>;
      case 'list':
        return <li key={idx} className="text-slate-700 leading-relaxed text-lg mb-4">{block.text}</li>;
      default:
        return null;
    }
  });
};

const CryptoArticlePost: React.FC = () => {
  const { slug } = useParams();
  const blog = cryptoBlogs.find(b => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
        <SEOHelmet
          title="Blog Not Found"
          description="The requested crypto blog could not be found."
          noIndex={true}
        />
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
        <Link to="/crypto" className="text-yellow-400 hover:underline flex items-center gap-2"><ArrowLeft /> Back to Crypto</Link>
      </div>
    );
  }

  const leftSidebar = (
    <StickyShareBar 
      url={window.location.href} 
      title={blog.title} 
    />
  );

  const rightSidebar = (
    <TrendingSidebar 
      trendingItems={cryptoBlogs
        .filter(b => b.slug !== slug)
        .slice(0, 5)
        .map(b => ({
          id: b.slug,
          slug: b.slug,
          title: b.title,
          category: 'Crypto'
        }))}
      relatedTools={[
        { id: '1', name: 'Scam Diagnostic', url: '/scam-check' },
        { id: '2', name: 'Sentiment Dashboard', url: '/market-sentiment' },
      ]}
    />
  );

  const hero = (
    <PremiumHero 
      title={blog.title}
      excerpt={blog.description}
      coverImage={blog.coverImage || 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80'}
      authorName={blog.author}
      authorImage={blog.authorImage || "https://pbs.twimg.com/profile_images/1634415500418588677/uz8L8JKQ_400x400.png"}
      date={new Date(blog.publishedDate).toLocaleDateString()}
      readingTime={parseInt(blog.readTime) || 5}
      categories={['Crypto Insight', ...blog.tags.slice(0, 1)]}
    />
  );

  return (
    <div className="min-h-screen bg-white">
      <SEOHelmet
        title={blog.title}
        description={blog.metaDescription}
        keywords={blog.keywords?.join(', ')}
        url={`/crypto/${blog.slug}`}
        type="article"
        tags={blog.tags}
      />

      <MasterArticleLayout
        leftSidebar={leftSidebar}
        rightSidebar={rightSidebar}
        hero={hero}
      >
        <div className="mb-12">
          <AISummaryBox 
            summary={blog.description}
            points={[
              "Web3 and Blockchain technical analysis.",
              "Market sentiment and risk assessment.",
              "Strategic financial implications for Indian investors."
            ]}
          />
        </div>

        <div className="prose prose-slate prose-lg max-w-none
          prose-headings:font-black prose-headings:tracking-tight
          prose-h2:text-3xl prose-h2:sm:text-4xl prose-h2:mt-20 prose-h2:mb-12 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-6 prose-h2:font-black
          prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-12 prose-h3:font-black
          prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-12 prose-h4:font-black
          prose-h5:text-lg prose-h5:mt-6 prose-h5:mb-12 prose-h5:font-black
          prose-p:text-slate-700 prose-p:leading-loose prose-p:mb-12 prose-p:text-lg
          prose-li:text-slate-700 prose-li:leading-relaxed prose-li:text-lg
          prose-strong:text-slate-900 prose-strong:font-black
          prose-a:text-blue-600 prose-a:font-black prose-a:no-underline hover:prose-a:underline
        ">
          <div className="bg-slate-50 border-l-4 border-blue-600 p-8 rounded-r-2xl mb-12 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-1">Crypto Risk Notice</h3>
              <p className="text-sm text-slate-500">Virtual digital assets are highly volatile. This analysis is for educational purposes and does not constitute financial advice.</p>
            </div>
          </div>

          {blog.content.map((block, idx) => {
            if (block.type === 'list') {
              return (
                <ul key={idx} className="list-disc pl-6 mb-8 space-y-3">
                  {renderContent([block])}
                </ul>
              );
            }
            return renderContent([block]);
          })}
        </div>

        {/* Tags Section */}
        <div className="mt-16 pt-12 border-t border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Tagged In
          </h3>
          <div className="flex flex-wrap gap-3">
            {blog.tags.map((tag, i) => (
              <span key={i} className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl cursor-default transition-colors border border-slate-200">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Crypto Articles - Modern Minimal Style */}
        <div className="mt-20 pt-16 border-t border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 mb-10">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cryptoBlogs
              .filter(b => b.slug !== slug)
              .slice(0, 4)
              .map(relatedBlog => (
                <Link
                  key={relatedBlog.slug}
                  to={`/crypto/${relatedBlog.slug}`}
                  className="group block space-y-4"
                >
                  <div className="aspect-[16/9] bg-slate-100 rounded-3xl overflow-hidden relative">
                    <img 
                      src={relatedBlog.coverImage || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80'} 
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Web3 Pulse</span>
                    <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                      {relatedBlog.title}
                    </h4>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </MasterArticleLayout>
    </div>
  );
};

export default CryptoArticlePost; 
