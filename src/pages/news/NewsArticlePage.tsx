import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import NewsWidgetRenderer from '../../components/news/NewsWidgetRenderer';
import SEOHelmet from '../../components/SEOHelmet';
import NewsArticleSchema from '../../components/NewsArticleSchema';
import { contentRegistry } from '../../cms-content/contentRegistry';
import { getArticleContent } from '../../cms-content/articleLoader';
import { getPlainArticleContent } from '../../cms-content/plainArticleLoader';
import { NewsGuideTemplate } from '../../components/NewsGuideTemplate';
import { teamProfiles } from '../../data/teamProfiles';
import { newsCategories } from '../../data/newsCategories';
import { formatStaticDate, getCurrentDateISO } from '../../utils/randomCalculators';
import ReadingProgress from '../../components/ReadingProgress';
import BreakingNewsBanner from '../../components/BreakingNewsBanner';
import ArticleToolbar from '../../components/ArticleToolbar';
import TableOfContents from '../../components/TableOfContents';
import { convertMarkdownToHtml } from '../../utils/markdownToHtml';
import { sanitizeTextContent } from '../../utils/contentSanitizer';
import { ArticleExpertReview } from '../../components/ArticleExpertReview';
import { AutoInternalLinks } from '../../components/AutoInternalLinks';
import '../../styles/news-article.css';

// Premium Layout Components
import MasterArticleLayout from '../../components/articles/MasterArticleLayout';
import PremiumHero from '../../components/articles/PremiumHero';
import AISummaryBox from '../../components/articles/AISummaryBox';
import StickyShareBar from '../../components/articles/StickyShareBar';
import TrendingSidebar from '../../components/articles/TrendingSidebar';
import { BannerAd } from '../../components/BannerAd';


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
  imageAlt?: string;
  tags?: string[];
  readTime?: number;
  views?: number;
}

const NewsArticlePage: React.FC = () => {
  const { categorySlug, category: topCategory, slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isBlockedClientLikely = () => {
      if ((navigator as any).globalPrivacyControl === true || navigator.doNotTrack === '1') {
        return true;
      }
      const bait = document.createElement('div');
      bait.className = 'adsbox';
      bait.style.cssText = 'position:absolute;left:-9999px;top:-9999px;height:1px;width:1px;';
      document.body.appendChild(bait);
      const blocked = bait.offsetHeight === 0;
      document.body.removeChild(bait);
      return blocked;
    };

    const host = window.location.hostname;
    const isProductionHost = host === 'moneycal.in' || host.endsWith('.moneycal.in');
    if (isBlockedClientLikely() || !isProductionHost) {
      return;
    }

    const swgScript = document.createElement('script');
    swgScript.src = 'https://news.google.com/swg/js/v1/swg-basic.js';
    swgScript.async = true;
    swgScript.type = 'application/javascript';

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

    if (!document.querySelector('script[src*="swg-basic.js"]')) {
      document.head.appendChild(swgScript);
      swgScript.onload = () => {
        document.head.appendChild(swgInit);
      };
    }

    return () => {
    };
  }, []); // Run once on mount

  useEffect(() => {
    const loadArticle = async () => {
      try {
        // Find article metadata in registry
        const articleMeta = contentRegistry.find(a => a.slug === slug);

        if (!articleMeta) {
          setLoading(false);
          return;
        }

        // Create article object from metadata
        const articleData: Article = {
          id: articleMeta.id,
          slug: articleMeta.slug,
          title: sanitizeTextContent(articleMeta.title),
          content: '',
          category: sanitizeTextContent(articleMeta.category),
          authorId: articleMeta.authorId,
          datePublished: articleMeta.datePublished,
          image: articleMeta.image,
          imageAlt: articleMeta.imageAlt,
          excerpt: articleMeta.excerpt,
          tags: [],
          readTime: 8,
          views: Math.floor(Math.random() * 5000) + 1000,
        };

        setArticle(articleData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading article:', error);
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  // Google News / Discover: news_keywords meta
  useEffect(() => {
    if (!article) return;
    const newsKeywords = (article.tags && article.tags.length > 0)
      ? article.tags.join(', ')
      : [article.title, category?.name || article.category, 'financial news', 'market news', 'India'].slice(0, 8).join(', ');
    let meta = document.querySelector('meta[name="news_keywords"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'news_keywords');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', newsKeywords);
    return () => {
      const m = document.querySelector('meta[name="news_keywords"]');
      if (m) m.remove();
    };
  }, [article]);

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
  const effectiveCategorySlug = categorySlug || topCategory;
  const category = newsCategories.find(cat => cat.slug === effectiveCategorySlug);
  const cmsContent = getArticleContent(article.slug);
  const plainContent = getPlainArticleContent(article.slug);
  const hasContent = Boolean(cmsContent || plainContent?.content || article.content);

  const trendingArticles = contentRegistry
    .filter(item => item.slug !== article.slug)
    .slice(0, 5);

  const publishedDate = article.datePublished;
  const modifiedDate = article.dateModified || article.datePublished;
  const formattedPublishedDate = formatStaticDate(publishedDate);
  const currentDateISO = getCurrentDateISO();

  const authorName = author?.name || 'MoneyCal Team';
  const authorTitle = author?.role || 'Financial Expert';
  const authorBio = author?.bio || 'Financial expert providing in-depth news and analysis.';
  const authorImage = "https://pbs.twimg.com/profile_images/1634415500418588677/uz8L8JKQ_400x400.png";

  const leftSidebar = (
    <div className="flex flex-col gap-8">
      <StickyShareBar 
        url={window.location.href} 
        title={article.title} 
      />
      <div className="sticky top-32 hidden xl:block">
        <BannerAd width={160} height={600} />
      </div>
    </div>
  );

  const rightSidebar = (
    <div className="flex flex-col gap-8">
      <TrendingSidebar 
        trendingItems={trendingArticles.map(ta => ({
          id: ta.id,
          slug: ta.slug,
          title: ta.title,
          category: ta.category
        }))}
        relatedTools={[
          { id: '1', name: 'Market Sentiment', url: '/market-sentiment' },
          { id: '2', name: 'Tax Sentiment', url: '/tax-sentiment' },
        ]}
      />
      <div className="sticky top-32 mt-8 hidden lg:block">
        <BannerAd width={300} height={600} />
      </div>
    </div>
  );

  const hero = (
    <PremiumHero 
      title={article.title}
      excerpt={article.excerpt}
      coverImage={article.image || '/default-news-hero.jpg'}
      authorName={authorName}
      authorImage={authorImage}
      date={formattedPublishedDate}
      readingTime={article.readTime || 8}
      categories={[category?.name || article.category]}
    />
  );

  return (
    <div className="min-h-screen bg-white">
      <ReadingProgress />
      <BreakingNewsBanner />
      <ArticleToolbar articleTitle={article.title} />

      <SEOHelmet
        title={`${article.title} | MoneyCal News`}
        description={article.excerpt || article.title}
        keywords={article.tags?.join(', ') || [article.title, category?.name || article.category, 'financial news', 'India'].join(', ')}
        url={`/news/${effectiveCategorySlug}/${article.slug}`}
        type="article"
        image={article.image}
        articlePublishedTime={article.datePublished}
        articleModifiedTime={modifiedDate}
        author={authorName}
        section={category?.name || article.category}
        tags={article.tags}
        noIndex={!hasContent}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'News', url: '/news' },
          { name: category?.name || article.category, url: `/news/${effectiveCategorySlug}` },
          { name: article.title, url: `/news/${effectiveCategorySlug}/${article.slug}` },
        ]}
      />

      <NewsArticleSchema
        headline={article.title}
        description={article.excerpt || article.title}
        url={`/news/${effectiveCategorySlug}/${article.slug}`}
        image={article.image}
        datePublished={publishedDate}
        dateModified={currentDateISO}
        author={{ name: authorName, image: authorImage }}
        category={article.category}
        keywords={article.tags || []}
      />

      <MasterArticleLayout
        leftSidebar={leftSidebar}
        rightSidebar={rightSidebar}
        hero={hero}
      >
        <div className="mb-12">
          <AISummaryBox 
            summary={article.excerpt || "Latest financial news and market analysis from MoneyCal."}
            points={[
              "Real-time market updates and trends.",
              "Expert analysis of financial regulations.",
              "Actionable insights for Indian investors."
            ]}
          />
        </div>

        <nav className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 mb-16 shadow-sm">
          <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            Key Highlights
          </h2>
          <TableOfContents articleTitle={article.title} />
        </nav>

        <div className="prose prose-slate md:prose-lg lg:prose-xl max-w-none
          prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-16 prose-h2:mb-6
          prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-10 prose-h3:mb-4
          prose-h4:text-lg prose-h4:md:text-xl prose-h4:mt-8 prose-h4:mb-4
          prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6
          prose-li:text-slate-700 prose-li:leading-relaxed prose-li:my-2
          prose-strong:text-slate-900 prose-strong:font-bold
          prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
        ">
          {(() => {
            if (cmsContent) {
              return <NewsGuideTemplate guide={cmsContent} />;
            }

            if (plainContent && plainContent.content) {
              const sanitizedMarkdown = sanitizeTextContent(plainContent.content);
              const htmlContent = convertMarkdownToHtml(sanitizedMarkdown);

              const renderLiquidContent = (html: string) => {
                const parts = html.split(/(\[WIDGET:[\w-]+\])/g);
                return parts.map((part, index) => {
                  const widgetMatch = part.match(/\[WIDGET:([\w-]+)\]/);
                  if (widgetMatch) {
                    return <NewsWidgetRenderer key={index} widgetId={widgetMatch[1]} />;
                  }
                  return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
                });
              };

              return renderLiquidContent(htmlContent);
            }

            return <p>{article.excerpt || 'Reporting in progress...'}</p>;
          })()}

          {/* Expert Review */}
          <div className="mt-20">
            <ArticleExpertReview
              reviewer={{
                name: authorName,
                role: authorTitle,
                bio: authorBio,
                image: authorImage
              }}
              reviewedDate={formattedPublishedDate}
            />
          </div>
          
          <AutoInternalLinks 
            title={article.title} 
            categories={[category?.name || article.category]} 
          />
        </div>

        <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-200 mt-20 text-center">
          <p className="text-xs font-bold text-slate-400 italic">
            Disclaimer: This financial news report is for informational purposes only. Consult experts for individual investment decisions.
          </p>
        </div>

        {/* Cross-promotion SEO block */}
        <div className="bg-slate-50 border-t border-slate-200 py-12 px-4 sm:px-8 mt-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-black text-slate-900 mb-4">Explore More on MoneyCal</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <a href="/blog" className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:border-blue-300 hover:shadow-sm transition-all">
                <span className="text-lg block mb-1">📝</span>
                <span className="text-xs font-bold text-slate-700">All Blog Posts</span>
              </a>
              <a href="/news" className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:border-blue-300 hover:shadow-sm transition-all">
                <span className="text-lg block mb-1">📰</span>
                <span className="text-xs font-bold text-slate-700">Market News</span>
              </a>
              <a href="/learn" className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:border-blue-300 hover:shadow-sm transition-all">
                <span className="text-lg block mb-1">📚</span>
                <span className="text-xs font-bold text-slate-700">Learn Finance</span>
              </a>
              <a href="/calculators" className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:border-blue-300 hover:shadow-sm transition-all">
                <span className="text-lg block mb-1">🧮</span>
                <span className="text-xs font-bold text-slate-700">200+ Calculators</span>
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="/calculators/emi-calculator" className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
                EMI Calculator →
              </a>
              <a href="/calculators/sip-calculator" className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
                SIP Calculator →
              </a>
              <a href="/calculators/income-tax-calculator" className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
                Tax Calculator →
              </a>
            </div>
          </div>
        </div>
      </MasterArticleLayout>
    </div>
  );
};

export default NewsArticlePage;

