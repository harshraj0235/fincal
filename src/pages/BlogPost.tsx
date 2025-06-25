import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Facebook, Twitter, Linkedin, Search } from 'lucide-react';
import { getBlogPostBySlug } from '../data/allBlogData';
import { blogPosts as oldPosts } from '../data/blogData';
import { blogPosts as newPosts } from '../data/blogData1';

const allBlogPosts = [...oldPosts, ...newPosts];

// Category icon mapping for visual navigation
const categoryIcons: Record<string, JSX.Element> = {
  'Investing': <Tag className="h-4 w-4 mr-1 text-blue-600" />,
  'Tax': <Tag className="h-4 w-4 mr-1 text-green-600" />,
  'Personal Finance': <Tag className="h-4 w-4 mr-1 text-orange-600" />,
  'Government Schemes': <Tag className="h-4 w-4 mr-1 text-purple-600" />,
};

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getBlogPostBySlug(slug || '');
  console.log('DEBUG: BlogPost slug:', slug, 'Found post:', post);

  // Get unique categories for the sticky bar
  const categories = Array.from(
    new Set(allBlogPosts.flatMap(p => p.categories))
  );

  // Search state for the sticky bar
  const [searchTerm, setSearchTerm] = React.useState('');

  // Featured posts (top 3 by date or popularity)
  const featuredPosts = allBlogPosts.slice(0, 3);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Blog Post Not Found</h1>
        <p className="text-neutral-600 mb-8">The blog post you're looking for doesn't exist or may have been moved.</p>
        <button 
          onClick={() => navigate('/blog')}
          className="btn btn-primary"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  // Handle category chip click: navigate to blog with filter
  const handleCategoryClick = (category: string) => {
    navigate(`/blog?category=${encodeURIComponent(category)}`);
  };

  // Handle search submit: navigate to blog with search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/blog');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-neutral-50">
      {/* Sidebar for tablet/desktop */}
      <aside className="hidden md:block w-64 flex-shrink-0 border-r border-neutral-200 bg-white/95 backdrop-blur-md sticky top-0 h-screen z-10">
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`flex items-center w-full px-3 py-2 rounded-lg text-left font-medium transition-colors ${post.categories.includes(category) ? 'bg-primary-100 text-primary-700' : 'text-neutral-700 hover:bg-neutral-100'}`}
                >
                  {categoryIcons[category] || <Tag className="h-4 w-4 mr-2 text-gray-400" />} {category}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <h3 className="text-md font-semibold mb-2">Featured Posts</h3>
            <ul className="space-y-2">
              {featuredPosts.map(fp => (
                <li key={fp.id}>
                  <Link to={`/blog/${fp.slug}`} className="block text-primary-700 hover:underline">
                    {fp.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Sticky Category Bar & Search */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100 mb-4">
          <div className="overflow-x-auto scrollbar-hide py-1">
            <div className="flex gap-2 sm:gap-3 px-1 w-max min-w-full">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-4 sm:h-5 w-4 sm:w-5" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10 pr-3 py-2 sm:py-3 rounded-full text-sm sm:text-base bg-white border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-300 shadow-sm min-w-[120px] sm:min-w-[180px]"
                    aria-label="Search Blog Articles"
                  />
                </div>
              </form>
              <button
                onClick={() => navigate('/blog')}
                className="flex items-center px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap transition-all duration-200 border shadow-sm bg-primary-600 text-white"
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`flex items-center px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap transition-all duration-200 border shadow-sm ${post.categories.includes(category) ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-200'}`}
                >
                  {categoryIcons[category] || <Tag className="h-4 sm:h-5 w-4 sm:w-5 mr-1 text-gray-400" />} {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-12 w-full">
          <div className="mb-6">
            <button 
              onClick={() => navigate('/blog')} 
              className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to Blog</span>
            </button>
          </div>
          <article>
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 sm:mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center text-xs sm:text-sm text-neutral-500 mb-4 sm:mb-6 gap-x-4 gap-y-2">
                <div className="flex items-center">
                  <User className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2 sm:mt-0">
                  {post.categories.map(category => (
                    <span 
                      key={category} 
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl overflow-hidden mb-6">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-auto max-h-56 sm:max-h-96 object-cover"
                />
              </div>
            </div>
            <div className="prose prose-sm sm:prose-lg max-w-none">
              {post.content.map((section, index) => (
                <div key={index} className="mb-6 sm:mb-8">
                  {section.type === 'paragraph' && <p>{section.content}</p>}
                  {section.type === 'heading' && <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">{section.content}</h2>}
                  {section.type === 'subheading' && <h3 className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">{section.content}</h3>}
                  {section.type === 'list' && (
                    <ul className="list-disc pl-5 sm:pl-6 space-y-1 sm:space-y-2">
                      {section.items?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.type === 'image' && (
                    <figure className="my-4 sm:my-6">
                      <img 
                        src={section.url} 
                        alt={section.caption || ''} 
                        className="w-full rounded-lg"
                      />
                      {section.caption && (
                        <figcaption className="text-xs sm:text-sm text-neutral-500 text-center mt-1 sm:mt-2">
                          {section.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                  {section.type === 'quote' && (
                    <blockquote className="border-l-4 border-primary-500 pl-3 sm:pl-4 py-2 my-4 sm:my-6 text-neutral-700 italic">
                      {section.content}
                      {section.author && (
                        <footer className="text-xs sm:text-sm text-neutral-500 mt-1 sm:mt-2">— {section.author}</footer>
                      )}
                    </blockquote>
                  )}
                </div>
              ))}
            </div>
            {/* Floating share buttons on desktop */}
            <div className="hidden md:flex flex-col gap-3 fixed right-8 top-1/3 z-40">
              <button className="text-neutral-600 hover:text-[#1877F2] p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="text-neutral-600 hover:text-[#1DA1F2] p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="text-neutral-600 hover:text-[#0A66C2] p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
                <Linkedin className="h-5 w-5" />
              </button>
            </div>
            {/* Inline share buttons on mobile */}
            <div className="md:hidden border-t border-b border-neutral-200 py-4 my-6 flex flex-col gap-3">
              <div>
                <h4 className="text-xs font-medium text-neutral-700 mb-1">Share this article</h4>
                <div className="flex space-x-3">
                  <button className="text-neutral-600 hover:text-[#1877F2] p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
                    <Facebook className="h-4 w-4" />
                  </button>
                  <button className="text-neutral-600 hover:text-[#1DA1F2] p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
                    <Twitter className="h-4 w-4" />
                  </button>
                  <button className="text-neutral-600 hover:text-[#0A66C2] p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
