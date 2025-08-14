import React, { useState, useEffect } from 'react';
import { BlogPost } from '../data/blogs/types';
import { blogs } from '../data/blogs';

interface FinanceNewsSectionProps {
  maxPosts?: number;
  showFeatured?: boolean;
}

const FinanceNewsSection: React.FC<FinanceNewsSectionProps> = ({ 
  maxPosts = 6, 
  showFeatured = true 
}) => {
  const [latestBlogs, setLatestBlogs] = useState<BlogPost[]>([]);
  const [featuredBlog, setFeaturedBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = () => {
      try {
        // Sort blogs by date (newest first)
        const sortedBlogs = [...blogs].sort((a, b) => 
          new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
        );

        // Set featured blog (most recent)
        if (showFeatured && sortedBlogs.length > 0) {
          setFeaturedBlog(sortedBlogs[0]);
        }

        // Set latest blogs (excluding featured)
        const latest = showFeatured ? sortedBlogs.slice(1, maxPosts + 1) : sortedBlogs.slice(0, maxPosts);
        setLatestBlogs(latest);
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [maxPosts, showFeatured]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Finance': 'bg-blue-100 text-blue-800',
      'Investment': 'bg-green-100 text-green-800',
      'Banking': 'bg-purple-100 text-purple-800',
      'Economy': 'bg-orange-100 text-orange-800',
      'Markets': 'bg-red-100 text-red-800',
      'Personal Finance': 'bg-indigo-100 text-indigo-800',
      'Insurance': 'bg-teal-100 text-teal-800',
      'Taxation': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading latest finance news...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Finance News & Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest financial trends, market analysis, and expert insights 
            to make informed investment decisions
          </p>
        </div>

        {/* Featured Blog */}
        {showFeatured && featuredBlog && (
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredBlog.coverImage} 
                    alt={featuredBlog.title}
                    className="w-full h-64 md:h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
                    }}
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    {featuredBlog.categories.slice(0, 2).map((category, index) => (
                      <span 
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm font-medium mr-2 ${getCategoryColor(category)}`}
                      >
                        {category}
                      </span>
                    ))}
                    <span className="text-sm text-gray-500 ml-auto">
                      {formatDate(featuredBlog.publishedDate)}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-3">
                    {featuredBlog.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-4">
                    {featuredBlog.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={featuredBlog.authorImage} 
                        alt={featuredBlog.author}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{featuredBlog.author}</p>
                        <p className="text-sm text-gray-500">{featuredBlog.authorTitle}</p>
                      </div>
                    </div>
                    
                    <a 
                      href={`/blog/${featuredBlog.slug}`}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Latest Blogs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((blog) => (
            <article 
              key={blog.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
                  }}
                />
                <div className="absolute top-4 left-4">
                  {blog.categories.slice(0, 1).map((category, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(category)}`}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{formatDate(blog.publishedDate)}</span>
                  <span className="mx-2">•</span>
                  <span>{blog.readingTime} min read</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={blog.authorImage} 
                      alt={blog.author}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-sm font-medium text-gray-900">{blog.author}</span>
                  </div>
                  
                  <a 
                    href={`/blog/${blog.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a 
            href="/blog"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            View All Finance Articles
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinanceNewsSection;
