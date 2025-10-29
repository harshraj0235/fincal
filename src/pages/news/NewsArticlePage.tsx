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

  // Always show current date
  const formattedDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const updateDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-neutral-50">
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
        datePublished={article.datePublished}
        dateModified={article.dateModified || article.datePublished}
        author={{ name: author?.name || 'MoneyCal Team', image: author?.socialProfiles?.linkedin || '' }}
        category={article.category}
        keywords={article.tags || []}
      />

      {/* Article Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-neutral-600 hover:text-neutral-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to News
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-4">
            <Link to="/news" className="hover:text-primary-600 transition-colors">News</Link>
            <span>/</span>
            <Link to={`/news/${categorySlug}`} className="hover:text-primary-600 transition-colors capitalize">
              {category?.name || categorySlug}
            </Link>
          </div>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-800 rounded-full font-semibold text-sm">
              {category?.name || article.category}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Author Info - Text Link Only */}
          <div className="mb-6 p-5 bg-neutral-900 rounded-xl border-2 border-neutral-700">
            <Link 
              to={`/news/author/${article.authorId}`}
              className="block hover:opacity-90 transition-opacity"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black text-white mb-1">{author?.name || 'MoneyCal Team'}</div>
                  <div className="text-base text-yellow-400 font-bold">{author?.role || 'Financial Writer'}</div>
                  {author?.bio && (
                    <div className="text-sm text-neutral-300 mt-2 font-medium">{author.bio}</div>
                  )}
                </div>
                <ArrowRight className="h-6 w-6 text-yellow-400 flex-shrink-0" />
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-neutral-200">
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-neutral-700 font-medium">
                <Calendar className="h-4 w-4 text-primary-600" />
                <span className="font-semibold">Published:</span> {formattedDate}
              </div>
              <div className="flex items-center gap-2 text-neutral-700 font-medium">
                <Clock className="h-4 w-4 text-primary-600" />
                <span className="font-semibold">Read Time:</span> {article.readTime || 8} min
              </div>
              <div className="flex items-center gap-2 text-neutral-700 font-medium">
                <Eye className="h-4 w-4 text-primary-600" />
                <span className="font-semibold">Views:</span> {(article.views || 0).toLocaleString()}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-neutral-200">
              <div className="text-xs text-neutral-500">
                <span className="font-semibold">Last Updated:</span> {updateDate}
              </div>
            </div>
          </div>

          {/* Social Share */}
          <div className="flex items-center gap-4 pt-6 mt-6 border-t">
            <span className="text-sm font-semibold text-neutral-700 flex items-center">
              <Share2 className="h-4 w-4 mr-2" />
              Share:
            </span>
            <button 
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="p-2 hover:bg-blue-50 rounded-full transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook className="h-5 w-5 text-blue-600" />
            </button>
            <button 
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank')}
              className="p-2 hover:bg-sky-50 rounded-full transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="h-5 w-5 text-sky-500" />
            </button>
            <button 
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="p-2 hover:bg-blue-50 rounded-full transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-blue-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Check if CMS content is available */}
        {(() => {
          const cmsContent = getArticleContent(article.id);
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

        {/* About the Author - Clean Text Link */}
        {author && (
          <div className="mt-12 bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden border-2 border-neutral-700">
            <div className="bg-black px-8 py-5">
              <h3 className="text-3xl font-black text-white flex items-center gap-3">
                <User className="h-8 w-8 text-yellow-400" />
                About the Author
              </h3>
            </div>
            <div className="p-10 bg-neutral-900">
              <Link
                to={`/news/author/${article.authorId}`}
                className="block hover:opacity-90 transition-all"
              >
                <h4 className="text-4xl font-black text-white mb-3 hover:text-yellow-400 transition-colors">{author.name}</h4>
                <p className="text-2xl text-yellow-400 font-black mb-5">{author.role}</p>
                <p className="text-lg text-neutral-300 leading-relaxed mb-6 font-medium">{author.bio}</p>
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-white text-neutral-900 rounded-xl hover:bg-yellow-400 transition-all font-black text-lg shadow-xl uppercase tracking-wide">
                  View All Articles by {author.name.split(' ')[0]}
                  <ArrowRight className="h-6 w-6" />
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Back to News */}
        <div className="mt-12 text-center pb-8">
          <Link 
            to="/news"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-neutral-800 to-neutral-900 text-white rounded-xl hover:from-neutral-900 hover:to-black transition-all font-black text-lg shadow-2xl hover:shadow-3xl uppercase tracking-wide"
          >
            <ArrowLeft className="h-6 w-6" />
            Back to All News
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsArticlePage;

