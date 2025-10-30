import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  ArrowRight,
  Calendar, 
  Clock, 
  Eye, 
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  User
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import NewsArticleSchema from '../../components/NewsArticleSchema';
import { contentRegistry } from '../../cms-content/contentRegistry';
import { getArticleContent } from '../../cms-content/articleLoader';
import { NewsGuideTemplate } from '../../components/NewsGuideTemplate';
import { teamProfiles } from '../../data/teamProfiles';
import { newsCategories } from '../../data/newsCategories';
import { formatStaticDate, formatStaticShortDate, formatLatestUpdate, getCurrentDateISO } from '../../utils/randomCalculators';
import ReadingProgress from '../../components/ReadingProgress';
import BreakingNewsBanner from '../../components/BreakingNewsBanner';
import ArticleToolbar from '../../components/ArticleToolbar';
import EnhancedSocialShare from '../../components/EnhancedSocialShare';
import TrendingNewsSidebar from '../../components/TrendingNewsSidebar';
import NewsletterSubscribe from '../../components/NewsletterSubscribe';

interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  subCategory?: string;
  authorId: string;
  datePublished: string;
  dateModified?: string;
  image: string;
  tags?: string[];
  readTime?: number;
  views?: number;
}

const NewsArticlePage: React.FC = () => {
  const { categorySlug, articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  // Google News Subscribe with Google (SWG) - Auto-loads for all news articles
  useEffect(() => {
    // Load SWG Basic script
    const swgScript = document.createElement('script');
    swgScript.src = 'https://news.google.com/swg/js/v1/swg-basic.js';
    swgScript.async = true;
    swgScript.type = 'application/javascript';
    
    // Initialize SWG after script loads
    const swgInit = document.createElement('script');
    swgInit.innerHTML = `
      (self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
        basicSubscriptions.init({
          type: "NewsArticle",
          isPartOfType: ["Product"],
          isPartOfProductId: "CAowupDCDA:openaccess",
          clientOptions: { theme: "light", lang: "en" },
        });
      });
    `;
    
    // Only add if not already present
    if (!document.querySelector('script[src*="swg-basic.js"]')) {
      document.head.appendChild(swgScript);
      swgScript.onload = () => {
        document.head.appendChild(swgInit);
      };
    }
    
    // Cleanup on unmount
    return () => {
      // Keep scripts for other news article navigations (SPA behavior)
    };
  }, []); // Run once on mount

  useEffect(() => {
    const loadArticle = async () => {
      try {
        // Find article metadata in registry
        const articleMeta = contentRegistry.find(a => a.slug === articleId);
        
        if (!articleMeta) {
          setLoading(false);
          return;
        }

        // Create article object from metadata
        // CMS content will be loaded separately via getArticleContent
        const articleData: Article = {
          id: articleMeta.id,
          slug: articleMeta.slug,
          title: articleMeta.title,
          content: '', // Content comes from CMS via getArticleContent
          category: articleMeta.category,
          authorId: articleMeta.authorId,
          datePublished: articleMeta.datePublished,
          image: articleMeta.image,
          tags: [],
          readTime: 8,
          views: Math.floor(Math.random() * 5000) + 1000, // Simulated views
        };
        
        setArticle(articleData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading article:', error);
        setLoading(false);
      }
    };

    loadArticle();
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return <Navigate to="/news" replace />;
  }

  const author = teamProfiles.find(p => p.id === article.authorId);
  const category = newsCategories.find(cat => cat.slug === categorySlug);

  // Static date from article metadata
  const publishedDate = article.datePublished;
  const modifiedDate = article.dateModified || article.datePublished;
  
  // Format static dates for display
  const formattedPublishedDate = formatStaticDate(publishedDate);
  const formattedModifiedDate = formatStaticDate(modifiedDate);
  
  // Dynamic "Latest Update" timestamp
  const latestUpdate = formatLatestUpdate();
  
  // Current date ISO for schema (always fresh)
  const currentDateISO = getCurrentDateISO();

  return (
    <div className="min-h-screen bg-neutral-50 pt-16 lg:pt-20">
      {/* Reading Progress Bar */}
      <ReadingProgress />
      
      {/* Breaking News Banner */}
      <BreakingNewsBanner />
      
      {/* Article Toolbar (Font Size, Print, Bookmark) */}
      <ArticleToolbar articleTitle={article.title} />
      
      <SEOHelmet
        title={`${article.title} | MoneyCal News`}
        description={article.excerpt || article.title}
        keywords={article.tags?.join(', ') || 'lenskart, ipo, eyewear, india'}
        url={`/news/${categorySlug}/${articleId}`}
        type="article"
        image={article.image}
        articlePublishedTime={article.datePublished}
        articleModifiedTime={article.dateModified || article.datePublished}
        author={author?.name || 'MoneyCal Team'}
        section={article.category}
        tags={article.tags}
      />

      <NewsArticleSchema
        headline={article.title}
        description={article.excerpt || article.title}
        url={`/news/${categorySlug}/${articleId}`}
        image={article.image}
        datePublished={publishedDate}
        dateModified={currentDateISO}
        author={{ name: author?.name || 'MoneyCal Team', image: author?.socialProfiles?.linkedin || '' }}
        category={article.category}
        keywords={article.tags || []}
      />

      {/* Article Header - Mobile Responsive */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 rounded-lg mb-3 sm:mb-4 transition-all text-sm sm:text-base active:scale-95 touch-manipulation -ml-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {/* Category Badge */}
          <div className="mb-3 sm:mb-4">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-blue-50 text-blue-700 rounded-full font-semibold text-xs sm:text-sm uppercase tracking-wide">
              {category?.name || article.category}
            </span>
          </div>

          {/* Headline - Mobile Optimized */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Author Info - Mobile Friendly */}
          <div className="mb-4 sm:mb-6">
            <Link 
              to={`/news/author/${article.authorId}`}
              className="inline-flex items-center gap-2 text-base sm:text-lg md:text-xl font-medium text-neutral-700 hover:text-blue-700 transition-colors group"
            >
              <span className="text-neutral-600">Written by</span>
              <span className="font-bold text-blue-700 underline decoration-2 underline-offset-2 group-hover:decoration-4">
                {author?.name || 'MoneyCal Team'}
              </span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Article Metadata - Published, Modified, Latest Update */}
          <div className="bg-neutral-50 rounded-lg p-3 sm:p-4 border border-neutral-200 space-y-3">
            {/* Primary metadata row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-700">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                <span className="font-medium">
                  <strong className="text-neutral-900">Published:</strong> {formattedPublishedDate}
                </span>
              </div>
              <span className="text-neutral-300">•</span>
              <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-700">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                <span className="font-medium">{article.readTime || 8} min read</span>
              </div>
              <span className="text-neutral-300">•</span>
              <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-700">
                <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                <span className="font-medium">{(article.views || 0).toLocaleString()} views</span>
              </div>
            </div>
            
            {/* Latest Update row (dynamic) */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm border-t border-neutral-200 pt-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full font-semibold">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Latest Update • {latestUpdate}</span>
              </div>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-600">
                <strong className="text-neutral-900">Last Modified:</strong> {formattedModifiedDate}
              </span>
            </div>
          </div>

          {/* Social Share - Mobile Optimized */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t">
            <span className="text-xs sm:text-sm font-semibold text-neutral-700 flex items-center">
              <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Share:
            </span>
            <button 
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="p-2 hover:bg-blue-50 rounded-full transition-colors active:scale-95"
              aria-label="Share on Facebook"
            >
              <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            </button>
            <button 
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank')}
              className="p-2 hover:bg-sky-50 rounded-full transition-colors active:scale-95"
              aria-label="Share on Twitter"
            >
              <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500" />
            </button>
            <button 
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="p-2 hover:bg-blue-50 rounded-full transition-colors active:scale-95"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Article Content - Mobile Optimized */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Check if CMS content is available */}
        {(() => {
          const cmsContent = getArticleContent(article.slug);
          if (cmsContent) {
            return <NewsGuideTemplate guide={cmsContent} />;
          }
          
          // Fallback to placeholder content if no CMS content
          return (
            <div className="prose prose-lg max-w-none">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
                <p className="text-lg font-semibold text-yellow-900 mb-2">📝 Article Content Coming Soon</p>
                <p className="text-neutral-700">
                  This article is currently being prepared. Check back soon for the full content!
                </p>
              </div>
              {article.content && (
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              )}
              
              {/* Disclaimer for non-CMS articles */}
              <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl shadow-lg p-8">
                <h3 className="text-2xl font-black text-neutral-900 mb-4">⚠️ Disclaimer</h3>
                <p className="text-base text-neutral-800 leading-relaxed font-medium">
                  This content is for educational purposes only. I am not a certified financial expert or advisor. All information is based on personal experience, research, and knowledge, and should not be considered as professional or legal advice. Please consult with a qualified expert before making any financial decisions. All risks associated with your actions are your own responsibility. If you find any mistakes or inaccuracies, please contact me as soon as possible so I can make corrections. I try my best to comply with all applicable laws in India.
                </p>
              </div>
            </div>
          );
        })()}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t">
            <span className="text-sm font-semibold text-neutral-700 mr-2">Tags:</span>
            {article.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* About the Author - Mobile Responsive */}
        {author && (
          <div className="mt-8 sm:mt-12 bg-neutral-900 rounded-lg sm:rounded-2xl shadow-xl overflow-hidden border-2 border-neutral-700">
            <div className="bg-black px-4 sm:px-8 py-3 sm:py-5">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white flex items-center gap-2 sm:gap-3">
                <User className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-yellow-400" />
                About the Author
              </h3>
            </div>
            <div className="p-6 sm:p-8 md:p-10 bg-neutral-900">
              <Link
                to={`/news/author/${article.authorId}`}
                className="block hover:opacity-90 transition-all active:scale-95"
              >
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 sm:mb-3 hover:text-yellow-400 transition-colors">{author.name}</h4>
                <p className="text-lg sm:text-xl md:text-2xl text-yellow-400 font-black mb-3 sm:mb-5">{author.role}</p>
                <p className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed mb-4 sm:mb-6 font-medium">{author.bio}</p>
                <div className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-neutral-900 rounded-lg sm:rounded-xl hover:bg-yellow-400 transition-all font-bold sm:font-black text-sm sm:text-base md:text-lg shadow-xl uppercase tracking-wide active:scale-95">
                  View All Articles
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Related Articles Section - Smart Topic + Latest Algorithm */}
        <div className="mt-16 sm:mt-20 border-t-2 border-neutral-200 pt-10 sm:pt-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 mb-6 sm:mb-10 flex items-center gap-3">
            <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
            Related Articles
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contentRegistry
              .filter(a => a.id !== article.id)
              .map(a => {
                // Smart relevance algorithm: topic similarity + recency
                let relevanceScore = 0;
                
                // Same category bonus (high priority)
                if (a.category === article.category) relevanceScore += 10;
                
                // Title keyword overlap (topic relevance)
                const currentTitleWords = article.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
                const relatedTitleWords = a.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
                const commonWords = currentTitleWords.filter(w => relatedTitleWords.includes(w));
                relevanceScore += commonWords.length * 3;
                
                // Recency bonus (prefer latest articles)
                const daysSincePublished = (new Date().getTime() - new Date(a.datePublished).getTime()) / (1000 * 60 * 60 * 24);
                if (daysSincePublished < 7) relevanceScore += 5;
                else if (daysSincePublished < 30) relevanceScore += 2;
                
                return { ...a, relevanceScore };
              })
              .sort((a, b) => b.relevanceScore - a.relevanceScore)
              .slice(0, 4)
              .map((relatedArticle) => {
                const relatedAuthor = teamProfiles.find(p => p.id === relatedArticle.authorId);
                const categoryInfo = newsCategories.find(c => c.id === relatedArticle.category);
                
                return (
                  <Link
                    key={relatedArticle.id}
                    to={`/news/${relatedArticle.category}/${relatedArticle.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
                  >
                    {/* Image */}
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <img
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold text-neutral-900 shadow-lg">
                          {categoryInfo?.icon && <categoryInfo.icon className="h-3.5 w-3.5" />}
                          {categoryInfo?.name || relatedArticle.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 sm:p-5">
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
                        {relatedArticle.title}
                      </h3>
                      
                      {/* Author & Date */}
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                            {relatedAuthor?.name.split(' ').map(n => n[0]).join('') || 'A'}
                          </div>
                          <span className="font-medium truncate">{relatedAuthor?.name || 'MoneyCal'}</span>
                        </div>
                        <span className="text-neutral-400">•</span>
                        <time className="font-medium whitespace-nowrap">
                          {formatStaticShortDate(relatedArticle.datePublished)}
                        </time>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>

        {/* Back to News - Mobile Optimized */}
        <div className="mt-8 sm:mt-12 text-center pb-6 sm:pb-8">
          <Link 
            to="/news"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-5 bg-gradient-to-r from-neutral-800 to-neutral-900 text-white rounded-lg sm:rounded-xl hover:from-neutral-900 hover:to-black active:from-black active:to-neutral-800 transition-all font-black text-sm sm:text-base md:text-lg shadow-2xl hover:shadow-3xl active:scale-95 uppercase tracking-wide"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            Back to All News
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsArticlePage;

