import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tag, ArrowLeft, TrendingUp } from 'lucide-react';
import { seoBlogPosts } from '../data/seo-blog-posts';
import { BlogPost as BlogPostType } from '../data/blogs/types';
import AdvancedSEO from '../components/AdvancedSEO';
import AdInArticle from '../components/ads/AdInArticle';
import { BannerAd } from '../components/BannerAd';

// Premium Layout Components
import MasterArticleLayout from '../components/articles/MasterArticleLayout';
import PremiumHero from '../components/articles/PremiumHero';
import AISummaryBox from '../components/articles/AISummaryBox';
import StickyShareBar from '../components/articles/StickyShareBar';
import TrendingSidebar from '../components/articles/TrendingSidebar';
import RelatedCalculatorWidget from '../components/articles/RelatedCalculatorWidget';
import { teamProfiles } from '../data/teamProfiles';

const SEOBlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    if (slug) {
      const foundPost = seoBlogPosts.find(p => p.slug === slug);
      setPost(foundPost || null);

      if (foundPost) {
        // Find related posts based on categories
        const related = seoBlogPosts
          .filter(p => p.id !== foundPost.id && p.categories.some(cat => foundPost.categories.includes(cat)))
          .slice(0, 3);
        setRelatedPosts(related);
      }
    }
  }, [slug]);

  const trendingItems = useMemo(() => {
    return seoBlogPosts
      .filter(p => p.slug !== slug)
      .slice(0, 5)
      .map(p => ({
        id: p.id.toString(),
        slug: p.slug,
        title: p.title,
        category: p.categories[0] || 'Finance'
      }));
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog" reloadDocument
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }


  const renderContent = (content: any) => {
    switch (content.type) {
      case 'heading':
        return (
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
            {content.content}
          </h2>
        );
      case 'paragraph':
        return (
          <p className="text-gray-700 leading-relaxed mb-4">
            {content.content}
          </p>
        );
      case 'list':
        return (
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            {content.items.map((item: string, index: number) => (
              <li key={index} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.metaDescription,
      "image": post.coverImage,
      "author": {
        "@type": "Person",
        "name": post.author,
        "jobTitle": post.authorTitle,
        "image": post.authorImage,
        "description": post.authorBio,
        "url": "https://moneycal.in/author/harsh-raj"
      },
      "publisher": {
        "@type": "Organization",
        "name": "MoneyCal India",
        "url": "https://moneycal.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://moneycal.in/logo.png",
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
      "dateModified": post.lastModified || post.date,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://moneycal.in/blog/${post.slug}`
      },
      "keywords": post.keywords.join(", "),
      "articleSection": post.categories.join(", "),
      "inLanguage": "en-IN",
      "isAccessibleForFree": "true",
      "wordCount": post.content.reduce((count: number, item: any) => {
        if (item.type === 'paragraph') {
          const text = item.content ?? '';
          return count + text.split(' ').length;
        }
        if (item.type === 'list') {
          const listText = Array.isArray(item.items) ? item.items.join(' ') : '';
          return count + listText.split(' ').length;
        }
        return count;
      }, 0)
    };
  };


  const authorProfile = useMemo(() => {
    const profile = teamProfiles.find(p => p.name === post.author);
    return {
      name: profile?.name || post.author,
      role: profile?.role || post.authorTitle || 'Financial Expert',
      image: profile?.image || post.authorImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      bio: profile?.bio || post.authorBio || "Expert financial educator and analyst.",
      gradient: "from-blue-600 to-indigo-600"
    };
  }, [post.author, post.authorTitle, post.authorImage, post.authorBio]);

  return (
    <>
      <AdvancedSEO
        pageType="blog"
        title={post.title}
        description={post.metaDescription}
        url={`/blog/${post.slug}`}
        keywords={post.keywords.join(', ')}
        structuredData={generateStructuredData()}
      />

      <MasterArticleLayout
        hero={
          <PremiumHero
            categories={post.categories}
            title={post.title}
            authorName={authorProfile.name}
            authorImage={authorProfile.image}
            date={post.date}
            modifiedDate={post.lastModified}
            coverImage={post.coverImage}
            readingTime={post.readingTime || 15}
          />
        }
        leftSidebar={
          <div className="flex flex-col gap-8">
            <StickyShareBar url={window.location.href} title={post.title} />
            <div className="sticky top-32 hidden xl:block">
              <BannerAd width={160} height={600} />
            </div>
          </div>
        }
        rightSidebar={
          <div className="flex flex-col gap-8">
            <TrendingSidebar trendingItems={trendingItems} />
            <div className="sticky top-32 mt-8 hidden lg:block">
              <BannerAd width={300} height={600} />
            </div>
          </div>
        }
      >
        <AISummaryBox
          summary={post.excerpt || `This comprehensive guide explores ${post.title}, providing expert insights and actionable strategies for Indian financial success in 2026.`}
          points={[
            "In-depth analysis of latest financial trends",
            "Expert commentary on market dynamics",
            "Strategic roadmap for wealth creation",
            "Practical steps for immediate implementation"
          ]}
        />

        <div className="prose prose-gray prose-lg max-w-none 
          prose-headings:font-black prose-headings:tracking-tight prose-headings:text-gray-900
          prose-h2:text-3xl prose-h2:mb-12 prose-h3:mb-12 prose-h4:mb-12 prose-h5:mb-12
          prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-12
          prose-a:text-blue-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:font-bold prose-blockquote:text-gray-800
          prose-img:rounded-2xl prose-img:shadow-md">
          {post.content.map((content, index) => (
            <React.Fragment key={index}>
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
              {index === 2 && (
                <RelatedCalculatorWidget 
                  postKeywords={post.keywords} 
                  postCategory={post.categories[0] || 'Finance'} 
                />
              )}
              <div>
                {renderContent(content)}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Keywords */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
            <Tag className="w-4 h-4" /> Editorial Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {post.keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold border border-gray-100 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        {post.faqSchema && post.faqSchema.length > 0 && (
          <div className="mt-16 pt-16 border-t border-gray-100">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-10">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {post.faqSchema.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:border-blue-100 transition-all">
                  <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 pt-20 border-t border-gray-100">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Expand Your Knowledge</h3>
              <Link to="/blog" reloadDocument className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                View All Guides <TrendingUp className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-video mb-4 bg-gradient-to-br from-blue-500 to-purple-600">
                    <img
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="flex gap-2 mb-3">
                    {relatedPost.categories.slice(0, 1).map((category) => (
                      <span
                        key={category}
                        className="text-[10px] font-black text-blue-600 uppercase tracking-widest"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <h4 className="font-black text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {relatedPost.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 bg-slate-950 rounded-[3rem] p-10 md:p-14 text-center relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent)] pointer-events-none"></div>
          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-6 leading-tight relative z-10">Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Master Your Finances?</span></h3>
          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl mx-auto mb-10 relative z-10">
            Join thousands of smart investors using our precision calculators and expert insights to build lasting wealth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              to="/calculators"
              className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Explore Calculators
            </Link>
            <Link
              to="/comprehensive-finance-hub"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Finance Hub
            </Link>
          </div>
        </div>
      </MasterArticleLayout>
    </>
  );
};

export default SEOBlogPost;
