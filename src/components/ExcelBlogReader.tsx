import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, Share2, BookOpen, Tag } from 'lucide-react';
import SEOHelmet from './SEOHelmet';

interface BlogContent {
  type: 'heading' | 'paragraph' | 'list' | 'image' | 'quote';
  content?: string;
  items?: string[];
  src?: string;
  alt?: string;
}

interface ExcelBlog {
  id: number;
  slug: string;
  title: string;
  author: string;
  authorTitle: string;
  authorImage: string;
  authorBio: string;
  metaDescription: string;
  excerpt: string;
  categories: string[];
  keywords: string[];
  date: string;
  coverImage: string;
  content: BlogContent[];
  featuredImage: string;
  videoUrl?: string;
  publishedDate: string;
  lastModified: string;
  readingTime: number;
  structuredData: any;
  faqSchema: Array<{ question: string; answer: string }>;
  openGraph: any;
  discoverOptimized: any;
}

interface ExcelBlogReaderProps {
  blog: ExcelBlog;
}

const ExcelBlogReader: React.FC<ExcelBlogReaderProps> = ({ blog }) => {
  const renderContent = (content: BlogContent, index: number) => {
    switch (content.type) {
      case 'heading':
        return (
          <h2 key={index} className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            {content.content}
          </h2>
        );
      case 'paragraph':
        return (
          <p key={index} className="text-lg text-gray-700 leading-relaxed mb-6">
            {content.content}
          </p>
        );
      case 'list':
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-lg text-gray-700">
            {content.items?.map((item, itemIndex) => (
              <li key={itemIndex} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        );
      case 'image':
        return (
          <div key={index} className="my-8">
            <img 
              src={content.src} 
              alt={content.alt || 'Blog image'} 
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        );
      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-blue-500 pl-6 my-8 italic text-xl text-gray-700 bg-blue-50 p-6 rounded-r-xl">
            "{content.content}"
          </blockquote>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SEOHelmet
        title={blog.title}
        description={blog.metaDescription}
        keywords={blog.keywords.join(', ')}
        url={`/excel-tools/blog/${blog.slug}`}
        structuredData={blog.structuredData}
        tags={blog.categories}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link
              to="/excel-tools"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Excel Tools
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  {blog.categories.map((category, index) => (
                    <span key={index} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      {category}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {blog.title}
                </h1>
                
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  {blog.excerpt}
                </p>
                
                <div className="flex items-center gap-6 text-blue-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readingTime} min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blog.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title}
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Article Content */}
              <article className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                  {/* Author Info */}
                  <div className="flex items-center gap-4 mb-8 p-6 bg-gray-50 rounded-xl">
                    <img 
                      src={blog.authorImage} 
                      alt={blog.author}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">{blog.author}</h3>
                      <p className="text-gray-600">{blog.authorTitle}</p>
                      <p className="text-sm text-gray-500 mt-1">{blog.authorBio}</p>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="prose prose-lg max-w-none">
                    {blog.content.map((content, index) => renderContent(content, index))}
                  </div>

                  {/* FAQ Section */}
                  {blog.faqSchema && blog.faqSchema.length > 0 && (
                    <div className="mt-12">
                      <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
                      <div className="space-y-6">
                        {blog.faqSchema.map((faq, index) => (
                          <div key={index} className="bg-gray-50 rounded-xl p-6">
                            <h3 className="font-bold text-gray-900 mb-3">{faq.question}</h3>
                            <p className="text-gray-700">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Keywords */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="w-5 h-5 text-gray-500" />
                      <span className="font-semibold text-gray-900">Keywords:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {blog.keywords.map((keyword, index) => (
                        <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* Author Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">About the Author</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={blog.authorImage} 
                      alt={blog.author}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{blog.author}</h4>
                      <p className="text-sm text-gray-600">{blog.authorTitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{blog.authorBio}</p>
                </div>

                {/* Related Tools */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Related Excel Tools</h3>
                  <div className="space-y-3">
                    <Link 
                      to="/excel-tools"
                      className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <div className="font-medium text-blue-900">Excel Tool Builder</div>
                      <div className="text-sm text-blue-600">Create custom Excel tools</div>
                    </Link>
                    <Link 
                      to="/excel-tools"
                      className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <div className="font-medium text-green-900">Financial Calculators</div>
                      <div className="text-sm text-green-600">Budget and investment tools</div>
                    </Link>
                    <Link 
                      to="/excel-tools"
                      className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <div className="font-medium text-purple-900">Business Templates</div>
                      <div className="text-sm text-purple-600">Professional business tools</div>
                    </Link>
                  </div>
                </div>

                {/* Share */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Share This Article</h3>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Share
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ExcelBlogReader;
