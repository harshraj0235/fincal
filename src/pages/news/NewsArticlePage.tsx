import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Eye, 
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import NewsArticleSchema from '../../components/NewsArticleSchema';
import { newsCategories } from '../../data/newsCategories';

const NewsArticlePage: React.FC = () => {
  const { categorySlug, articleId } = useParams();
  const navigate = useNavigate();

  // Mock article data - replace with actual fetch from CMS/database
  const article = {
    headline: 'Sample News Article - Connect to Your CMS',
    subheadline: 'This is a placeholder article template',
    excerpt: 'Replace this with actual article data from your database or headless CMS',
    content: [
      { type: 'paragraph', content: 'This is your news article template. Connect it to your content management system (WordPress, Contentful, Strapi, etc.) or database to display real articles.' },
      { type: 'heading', content: 'Key Highlights', level: 2 },
      { type: 'list', content: ['Point 1: Sample highlight', 'Point 2: Another key point', 'Point 3: Important update'] },
      { type: 'paragraph', content: 'Continue with more detailed content here...' }
    ],
    category: 'Markets',
    subcategory: 'India Markets',
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: { name: 'MoneyCal Editorial Team', image: '/images/default-avatar.png' },
    featuredImage: 'https://via.placeholder.com/1200x600',
    imageAlt: 'Finance news illustration',
    readTime: 5,
    views: 1250,
    trending: true,
    tags: ['finance', 'india', 'markets'],
    relatedCalculators: ['emi-calculator', 'sip-calculator'],
    relatedArticles: ['article-1', 'article-2', 'article-3']
  };

  const category = newsCategories.find(cat => cat.slug === categorySlug);

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEOHelmet
        title={`${article.headline} | MoneyCal News`}
        description={article.excerpt}
        keywords={article.tags.join(', ')}
        url={`/news/${categorySlug}/${articleId}`}
        type="article"
        image={article.featuredImage}
        articlePublishedTime={article.datePublished}
        articleModifiedTime={article.dateModified}
        author={article.author.name}
        section={article.category}
        tags={article.tags}
      />

      <NewsArticleSchema
        headline={article.headline}
        description={article.excerpt}
        url={`/news/${categorySlug}/${articleId}`}
        image={article.featuredImage}
        datePublished={article.datePublished}
        dateModified={article.dateModified}
        author={article.author}
        category={article.category}
        keywords={article.tags}
      />

      {/* Article Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-neutral-600 hover:text-neutral-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-4">
            <Link to="/news" className="hover:text-primary-600">News</Link>
            <span>/</span>
            <Link to={`/news/${categorySlug}`} className="hover:text-primary-600">
              {category?.name || categorySlug}
            </Link>
          </div>

          {/* Category Badge */}
          <div className="mb-4">
            <span className={`inline-block px-4 py-2 bg-${category?.color || 'blue'}-100 text-${category?.color || 'blue'}-800 rounded-full font-semibold`}>
              {article.subcategory || article.category}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            {article.headline}
          </h1>

          {article.subheadline && (
            <h2 className="text-xl text-neutral-600 mb-6">{article.subheadline}</h2>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-neutral-600 mb-6">
            <div className="flex items-center gap-2">
              <img 
                src={article.author.image} 
                alt={article.author.name}
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium">{article.author.name}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(article.datePublished).toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {article.readTime} min read
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              {article.views.toLocaleString()} views
            </div>
          </div>

          {/* Social Share */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <span className="text-sm font-semibold text-neutral-700 flex items-center">
              <Share2 className="h-4 w-4 mr-2" />
              Share:
            </span>
            <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
              <Facebook className="h-5 w-5 text-blue-600" />
            </button>
            <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
              <Twitter className="h-5 w-5 text-sky-500" />
            </button>
            <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
              <Linkedin className="h-5 w-5 text-blue-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Image */}
        <div className="mb-8 rounded-xl overflow-hidden">
          <img 
            src={article.featuredImage} 
            alt={article.imageAlt}
            className="w-full"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          {article.content.map((block, index) => {
            switch (block.type) {
              case 'heading':
                const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
                return <HeadingTag key={index} className="font-bold text-neutral-900 mt-8 mb-4">{block.content}</HeadingTag>;
              
              case 'paragraph':
                return <p key={index} className="text-neutral-700 mb-4 leading-relaxed">{block.content}</p>;
              
              case 'list':
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-neutral-700">
                    {(block.content as string[]).map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                );
              
              default:
                return null;
            }
          })}
        </div>

        {/* Related Calculators */}
        {article.relatedCalculators && article.relatedCalculators.length > 0 && (
          <div className="mt-12 p-6 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border-l-4 border-primary-600">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">📊 Related Financial Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {article.relatedCalculators.map(calcId => (
                <Link
                  key={calcId}
                  to={`/calculators/${calcId}`}
                  className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-all"
                >
                  <span className="font-semibold text-neutral-800">
                    {calcId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary-600" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">📰 Read Next</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {article.relatedArticles.map(artId => (
                <div key={artId} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
                  <h4 className="font-bold text-neutral-900 mb-2 line-clamp-2">
                    Related Article Title {artId}
                  </h4>
                  <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                    Brief description of related article...
                  </p>
                  <Link 
                    to={`/news/${categorySlug}/${artId}`}
                    className="text-primary-600 hover:text-primary-800 font-medium text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsArticlePage;

