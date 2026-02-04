import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Share2, BookOpen, Clock, TrendingUp } from 'lucide-react';
import { seoBlogPosts } from '../data/seo-blog-posts';
import { BlogPost } from '../data/blogs/types';
import AdvancedSEO from '../components/AdvancedSEO';
import ReadingProgressBar from '../components/ReadingProgressBar';

type TocItem = {
  id: string;
  text: string;
  level: 'heading' | 'subheading';
};

const truncateText = (text: string, maxLength: number) => {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, Math.max(0, maxLength - 3)).trim()}...`;
};

const extractSummaryPoints = (content: BlogPost['content'], limit: number) => {
  const listPoints: string[] = [];
  content.forEach((section) => {
    if (section.type === 'list' && section.items?.length) {
      listPoints.push(...section.items);
    }
  });

  if (listPoints.length > 0) {
    return listPoints.slice(0, limit).map(item => truncateText(item, 160));
  }

  const paragraphPoints = content
    .filter(section => section.type === 'paragraph' && section.content)
    .map(section => section.content as string);

  return paragraphPoints.slice(0, limit).map(item => truncateText(item, 160));
};

const countWords = (content: BlogPost['content']) => {
  return content.reduce((count, item) => {
    if (item.type === 'paragraph' && item.content) {
      return count + item.content.split(' ').length;
    }
    if (item.type === 'list' && item.items) {
      return count + item.items.join(' ').split(' ').length;
    }
    return count;
  }, 0);
};

const SEOBlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

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

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const wordCount = countWords(post.content);
  const readingTime = Math.max(3, Math.ceil(wordCount / 200));

  const tocItems = post.content
    .map((section, index) => {
      if (section.type === 'heading' || section.type === 'subheading') {
        const text = section.content?.trim();
        if (!text) return null;
        return { id: `section-${index}`, text, level: section.type } as TocItem;
      }
      return null;
    })
    .filter((item): item is TocItem => item !== null);

  const summaryPoints = extractSummaryPoints(post.content, 4);

  const renderContent = (content: any, index: number) => {
    switch (content.type) {
      case 'heading':
        return (
          <h2
            id={`section-${index}`}
            className="text-2xl font-bold text-gray-900 mt-8 mb-4 first:mt-0 scroll-mt-24"
          >
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
      case 'subheading':
        return (
          <h3
            id={`section-${index}`}
            className="text-xl font-semibold text-gray-900 mt-6 mb-3 scroll-mt-24"
          >
            {content.content}
          </h3>
        );
      default:
        return null;
    }
  };

  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.metaDescription,
      "image": post.coverImage,
      "author": {
        "@type": "Person",
        "name": post.author,
        "jobTitle": post.authorTitle,
        "image": post.authorImage,
        "description": post.authorBio
      },
      "publisher": {
        "@type": "Organization",
        "name": "MoneyCal India",
        "logo": {
          "@type": "ImageObject",
          "url": "https://moneycal.in/logo.png"
        }
      },
      "datePublished": post.date,
      "dateModified": post.date,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://moneycal.in/blog/${post.slug}`
      },
      "keywords": post.keywords.join(", "),
      "articleSection": post.categories.join(", "),
      "wordCount": wordCount
    };
  };

  return (
    <>
      <ReadingProgressBar targetId="seo-article" />
      <AdvancedSEO
        title={post.title}
        description={post.metaDescription}
        keywords={post.keywords.join(', ')}
        structuredData={generateStructuredData()}
      />

      <div className="min-h-screen bg-slate-50/60">
        {/* Navigation */}
        <div className="bg-white shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              to="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Article Header */}
          <article id="seo-article" className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/70 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                {post.title}
              </h1>
              <p className="text-blue-50 mt-3 max-w-3xl">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-100 mt-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{wordCount.toLocaleString()} words</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid gap-4 lg:grid-cols-2 mb-8">
                {summaryPoints.length > 0 && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Key takeaways</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      {summaryPoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {tocItems.length > 1 && (
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">On this page</p>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {tocItems.map((item) => (
                        <li key={item.id} className={item.level === 'subheading' ? 'ml-3' : ''}>
                          <a href={`#${item.id}`} className="hover:text-blue-600 transition-colors">
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Author Bio */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{post.author}</h3>
                    <p className="text-blue-600 font-medium mb-2">{post.authorTitle}</p>
                    <p className="text-gray-600">{post.authorBio}</p>
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 font-medium">Share this guide:</span>
                  <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Trending</span>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-slate prose-lg lg:prose-xl max-w-none">
                {post.content.map((content, index) => (
                  <div key={index}>
                    {renderContent(content, index)}
                  </div>
                ))}
              </div>

              {/* Keywords */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* FAQ Section */}
          {post.faqSchema && post.faqSchema.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {post.faqSchema.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Finance Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-blue-500 to-purple-600">
                      <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-xl font-bold mb-1">📊</div>
                          <div className="text-xs opacity-90">Finance Guide</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {relatedPost.categories.slice(0, 2).map((category) => (
                          <span
                            key={category}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Take Control of Your Finances?</h3>
            <p className="text-lg mb-6 opacity-90">
              Use our comprehensive financial calculators and tools to plan your investments and achieve your financial goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/calculators"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Explore Calculators
              </Link>
              <Link
                to="/comprehensive-finance-hub"
                className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Finance Hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SEOBlogPost;
