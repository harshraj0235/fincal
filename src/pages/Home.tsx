import React from 'react';
import { Link } from 'react-router-dom';
import { CategorySection } from '../components/CategorySection';
import BlogSuggestions from '../components/BlogSuggestions';
import { calculatorCategories } from '../data/calculatorData';
import { optimizedBlogPosts } from '../data/optimizedBlogPosts';

const featuredCalculators = calculatorCategories.flatMap(cat => cat.calculators).slice(0, 6);
const featuredBlogs = optimizedBlogPosts.slice(0, 3);

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 md:py-20 gap-8">
        <div className="flex-1 z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4 leading-tight drop-shadow-lg">
            Your All-in-One <span className="text-blue-600">Finance</span> & <span className="text-yellow-500">Calculator</span> Hub
          </h1>
          <p className="text-lg md:text-xl text-neutral-700 mb-8 max-w-xl">
            Instantly access 50+ financial calculators, Excel tools, government schemes, and expert blogs. Fast, free, and made for India.
          </p>
          <div className="flex flex-wrap gap-4 mb-6">
            <Link to="/calculators/emi-calculator" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">Try EMI Calculator</Link>
            <Link to="/excel-tools" className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition">Explore Excel Tools</Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center relative">
          <img src="/images/blog-default.webp" alt="Finance Hero" className="w-80 h-80 object-cover rounded-3xl shadow-2xl border-8 border-white" loading="lazy" />
        </div>
      </section>
      {/* Quick Links to Calculators */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6 text-center">Popular Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredCalculators.map(calc => (
            <Link
              key={calc.id}
              to={`/calculators/${calc.id}`}
              className="group bg-white rounded-xl shadow hover:shadow-2xl transition-shadow border border-gray-100 hover:border-blue-200 p-6 flex flex-col items-start hover:-translate-y-1"
            >
              <div className="text-lg font-semibold text-blue-700 group-hover:text-blue-900 mb-2">{calc.name}</div>
              <div className="text-sm text-neutral-600 mb-3 line-clamp-2">{calc.description}</div>
              <span className="mt-auto text-xs text-green-600 font-medium">Try Now →</span>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link to="/calculators/emi-calculator" className="text-blue-600 font-semibold hover:underline">View All Calculators</Link>
        </div>
      </section>
      {/* Blog Highlights */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6 text-center">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBlogs.map(post => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="bg-white rounded-xl shadow hover:shadow-2xl transition-shadow border border-gray-100 hover:border-green-200 p-5 flex flex-col hover:-translate-y-1"
            >
              <img src={post.openGraph.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')} alt={post.title} className="w-full h-40 object-cover rounded-lg mb-4" loading="lazy" />
              <div className="text-lg font-semibold text-green-700 mb-2 line-clamp-2">{post.title}</div>
              <div className="text-sm text-neutral-600 mb-3 line-clamp-3">{post.excerpt}</div>
              <span className="mt-auto text-xs text-blue-600 font-medium">Read More →</span>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link to="/blog" className="text-green-600 font-semibold hover:underline">View All Blogs</Link>
        </div>
      </section>
      {/* Excel Tools & Government Schemes Highlights */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between hover:shadow-2xl transition">
          <h3 className="text-xl font-bold text-blue-700 mb-4">Excel Tools Hub</h3>
          <p className="text-neutral-700 mb-6">Download 100+ ready-to-use Excel templates for finance, business, and productivity. Free, customizable, and easy to use.</p>
          <Link to="/excel-tools" className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition self-start">Browse Excel Tools</Link>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between hover:shadow-2xl transition">
          <h3 className="text-xl font-bold text-green-700 mb-4">Government Schemes</h3>
          <p className="text-neutral-700 mb-6">Explore comprehensive guides and calculators for all major Indian government schemes. Stay informed and maximize your benefits.</p>
          <Link to="/government-schemes" className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition self-start">Explore Schemes</Link>
        </div>
      </section>
      {/* News/Updates or Reels (Optional) */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6 text-center">Finance News & Updates</h2>
        <div className="bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <p className="text-lg text-neutral-700 mb-2">Stay updated with the latest in finance, banking, and investments. Check out our news reel for daily updates!</p>
            <Link to="/news" className="px-5 py-2 bg-yellow-500 text-white rounded-lg font-semibold shadow hover:bg-yellow-600 transition">Go to News Hub</Link>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img src="/images/blog-default.webp" alt="Finance News" className="w-48 h-32 object-cover rounded-xl shadow-lg border-4 border-white" loading="lazy" />
          </div>
        </div>
      </section>
      {/* Categories Navigation */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <CategorySection />
      </section>
      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-700 to-green-700 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-lg font-bold">Moneycal © {new Date().getFullYear()}</div>
          <div className="flex gap-6 text-sm">
            <Link to="/about-us" className="hover:underline">About</Link>
            <Link to="/contact-us" className="hover:underline">Contact</Link>
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:underline">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
