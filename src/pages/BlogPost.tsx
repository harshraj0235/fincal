import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Bookmark, Facebook, Twitter, Linkedin, Search } from 'lucide-react';
import { getBlogPostBySlug, getRelatedPosts } from '../data/allBlogData';
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
  const relatedPosts = getRelatedPosts(slug || '', 3);

  // Get unique categories for the sticky bar
  const categories = Array.from(
    new Set(allBlogPosts.flatMap(p => p.categories))
  );

  // Search state for the sticky bar
  const [searchTerm, setSearchTerm] = React.useState('');

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
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {/* Sticky Category Bar & Search */}
      <div className="sticky top-[48px] z-[20] bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100 mb-4">
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
                className="flex items-center px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap transition-all duration-200 border shadow-sm bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-200"
              >
                {categoryIcons[category] || <Tag className="h-4 sm:h-5 w-4 sm:w-5 mr-1 text-gray-400" />} {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/blog')} 
            className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Blog</span>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
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
              <div className="border-t border-b border-neutral-200 py-4 sm:py-6 my-6 sm:my-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-neutral-700 mb-1 sm:mb-2">Share this article</h4>
                    <div className="flex space-x-3 sm:space-x-4">
                      <button className="text-neutral-600 hover:text-[#1877F2] p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
                        <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      <button className="text-neutral-600 hover:text-[#1DA1F2] p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
                        <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      <button className="text-neutral-600 hover:text-[#0A66C2] p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
                        <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <button className="flex items-center text-neutral-700 hover:text-primary-600">
                      <Bookmark className="h-5 w-5 mr-2" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-neutral-50 rounded-xl p-6 mb-8">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-neutral-300 overflow-hidden mr-4">
                    <img 
                      src={post.authorImage || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                      alt={post.author} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900">{post.author}</h4>
                    <p className="text-sm text-neutral-600">{post.authorTitle || "Financial Expert"}</p>
                  </div>
                </div>
                <p className="text-neutral-700">
                  {post.authorBio || "Financial expert with years of experience in the industry. Passionate about helping people make informed financial decisions."}
                </p>
              </div>
            </article>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map(relatedPost => (
                    <Link 
                      key={relatedPost.id} 
                      to={`/blog/${relatedPost.slug}`}
                      className="block group"
                    >
                      <div className="flex items-start">
                        <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 mr-3">
                          <img 
                            src={relatedPost.coverImage} 
                            alt={relatedPost.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-neutral-900 group-hover:text-primary-600 line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-neutral-500 mt-1">{relatedPost.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="bg-[--success-50] rounded-xl p-6 border border-[--success-100] mb-8">
                <h3 className="text-xl font-semibold text-[--success-900] mb-4">Government Scheme Calculators</h3>
                <p className="text-sm text-[--success-700] mb-4">
                  Use our calculators to plan your investments in government schemes and maximize your returns.
                </p>
                <ul className="space-y-3">
                  <li>
                    <Link to="/calculators/sukanya-samriddhi-calculator" className="text-sm text-[--success-800] hover:text-[--success-900] font-medium flex items-center">
                      <span className="h-5 w-5 rounded-full bg-[--success-200] text-[--success-700] flex items-center justify-center flex-shrink-0 mr-2">→</span>
                      Sukanya Samriddhi Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/nps-calculator" className="text-sm text-[--success-800] hover:text-[--success-900] font-medium flex items-center">
                      <span className="h-5 w-5 rounded-full bg-[--success-200] text-[--success-700] flex items-center justify-center flex-shrink-0 mr-2">→</span>
                      NPS Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/post-office-schemes-calculator" className="text-sm text-[--success-800] hover:text-[--success-900] font-medium flex items-center">
                      <span className="h-5 w-5 rounded-full bg-[--success-200] text-[--success-700] flex items-center justify-center flex-shrink-0 mr-2">→</span>
                      Post Office Schemes Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/ppf-calculator" className="text-sm text-[--success-800] hover:text-[--success-900] font-medium flex items-center">
                      <span className="h-5 w-5 rounded-full bg-[--success-200] text-[--success-700] flex items-center justify-center flex-shrink-0 mr-2">→</span>
                      PPF Calculator
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
                <h3 className="text-xl font-semibold text-primary-900 mb-4">Subscribe to Our Newsletter</h3>
                <p className="text-sm text-primary-700 mb-4">
                  Get the latest financial tips and insights delivered straight to your inbox.
                </p>
                <form className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="input w-full"
                  />
                  <button 
                    type="submit"
                    className="btn btn-primary w-full"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
