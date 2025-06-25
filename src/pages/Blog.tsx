import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { blogPosts as oldPosts } from '../data/blogData';
import { blogPosts as newPosts } from '../data/blogData1';

const allBlogPosts = [...oldPosts, ...newPosts];

// Icon color by category for visual fun
const categoryColors: Record<string, string> = {
  Investing: "text-blue-600",
  Tax: "text-green-600",
  "Personal Finance": "text-orange-600",
  "Government Schemes": "text-purple-600",
};

export const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Unique categories (sorted, 'All' first)
  const categories = [
    "All",
    ...Array.from(new Set(allBlogPosts.flatMap(post => post.categories))).sort()
  ];

  // Filtering
  const filteredPosts = allBlogPosts.filter(post => {
    const matchesSearch =
      searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || selectedCategory === "All" || post.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Top AppBar (sticky, with search) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur shadow-sm pb-2">
        <div className="max-w-3xl mx-auto px-4 pt-4">
          <h1 className="text-xl font-bold text-neutral-900 mb-2 text-center">Finance Blog</h1>
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white shadow"
              aria-label="Search Blog Articles"
            />
          </div>
        </div>
        {/* Scrollable Categories Bar */}
        <nav className="w-full overflow-x-auto scrollbar-hide py-1 px-2 flex gap-2 md:gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === "All" ? null : category)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium transition-colors whitespace-nowrap
                ${selectedCategory === category || (!selectedCategory && category === "All")
                  ? "bg-primary-600 text-white border-primary-700"
                  : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"}
              `}
            >
              <Tag className={`h-4 w-4 ${categoryColors[category] || "text-neutral-400"}`} />
              {category}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-2 pb-20 mt-2">
        {/* No posts found */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12 bg-neutral-50 rounded-lg mt-8">
            <p className="text-lg text-neutral-600">No articles found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
              }}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {filteredPosts.map(post => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow flex flex-col h-full border border-neutral-100"
            >
              <div className="h-44 overflow-hidden border-b border-neutral-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-neutral-500 mb-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <User className="h-3 w-3 mr-1" />
                  <span>{post.author}</span>
                </div>
                <h3 className="text-base font-semibold text-neutral-900 mb-1 line-clamp-2">{post.title}</h3>
                <p className="text-neutral-600 text-sm mb-2 line-clamp-3">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {post.categories.slice(0, 2).map(category => (
                    <span
                      key={category}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800`}
                    >
                      <Tag className={`h-3 w-3 mr-1 ${categoryColors[category] || "text-neutral-400"}`} />
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Special section for Government Schemes */}
        <section className="mt-10 bg-[#f5f7fd] rounded-xl p-5 border border-[#dee6f9]">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="h-5 w-5 text-purple-700" />
            <h2 className="text-lg font-semibold text-purple-900">Government Scheme Guides</h2>
          </div>
          <p className="text-sm text-purple-700 mb-3">
            Explore comprehensive guides on Indian government financial schemes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <Link to="/blog/sukanya-samriddhi-yojana-guide" className="block bg-white rounded-lg p-4 shadow hover:shadow-md">
              <div className="font-semibold text-neutral-900 mb-1">Sukanya Samriddhi Yojana: Complete Guide</div>
              <p className="text-xs text-neutral-600 mb-1">Eligibility, benefits, tax, and more for SSY.</p>
              <span className="text-xs text-purple-700 font-medium">Read More &rarr;</span>
            </Link>
            <Link to="/blog/nps-tier1-vs-tier2-comparison" className="block bg-white rounded-lg p-4 shadow hover:shadow-md">
              <div className="font-semibold text-neutral-900 mb-1">National Pension System: Tier 1 vs Tier 2</div>
              <p className="text-xs text-neutral-600 mb-1">Comparison, tax benefits, account details.</p>
              <span className="text-xs text-purple-700 font-medium">Read More &rarr;</span>
            </Link>
          </div>
          <div className="text-center">
            <Link
              to="/blog/category/government-schemes"
              className="inline-flex items-center text-purple-700 hover:text-purple-900 font-medium"
            >
              View all government guides
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
