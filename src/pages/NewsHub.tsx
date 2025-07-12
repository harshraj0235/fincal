import React, { useState, useMemo } from "react";
import NewsList, { NewsItem } from "../components/NewsList";
import { blogPosts as blogPosts0 } from "../data/blogData";
import { blogPosts as blogPosts1 } from "../data/blogData1";
import { governmentSchemes } from "../data/governmentSchemesData";
import { calculatorCategories } from "../data/calculatorData";
import WhatsAppBanner from "../components/WhatsAppBanner";
import AstroFinanceButton from "../components/AstroFinanceButton";
import FinanceChat from "../components/FinanceChat";

function getRandomElements<T>(arr: T[], n: number): T[] {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const NewsHub: React.FC = () => {
  // Flatten calculators
  const calculators: NewsItem[] = calculatorCategories.flatMap(cat => cat.calculators.map(calc => ({
    id: String(calc.id),
    title: calc.name,
    summary: calc.description,
    category: cat.name,
    date: "",
    slug: `/calculators/${calc.id}`
  })));

  // Map blog posts
  const allBlogs: NewsItem[] = [
    ...blogPosts0.map(post => ({
      id: String(post.id),
      title: post.title,
      summary: post.excerpt || "",
      category: post.categories?.[0] || "अन्य",
      date: post.date || "",
      slug: `/blog/${post.slug}`
    })),
    ...blogPosts1.map(post => ({
      id: String(post.id),
      title: post.title,
      summary: post.excerpt || "",
      category: post.categories?.[0] || "अन्य",
      date: post.date || "",
      slug: `/blog/${post.slug}`
    })),
    ...governmentSchemes.map(scheme => ({
      id: String(scheme.id),
      title: scheme.title,
      summary: scheme.seoDescription || "",
      category: scheme.category || "सरकारी योजना",
      date: "",
      slug: `/government-schemes/${scheme.slug}`
    })),
    ...calculators
  ];

  // State for search
  const [search, setSearch] = useState("");

  // Filter blogs by search
  const filteredBlogs = useMemo(() => {
    if (!search.trim()) return getRandomElements(allBlogs, 40);
    const s = search.trim().toLowerCase();
    return allBlogs.filter(item =>
      item.title.toLowerCase().includes(s) ||
      item.summary.toLowerCase().includes(s) ||
      item.category.toLowerCase().includes(s)
    ).slice(0, 40);
  }, [search, allBlogs]);

  // NewsList expects a click handler to open the slug
  const handleNewsClick = (slug: string) => {
    window.open(slug, "_blank");
  };

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Chat Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Ask Your Financial Assistant</h2>
            <FinanceChat />
          </div>
          
          {/* News Section */}
        <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Latest Financial News & Tools</h3>
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg mb-6"
            placeholder="Search blogs/news/calculators..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <NewsList news={filteredBlogs} onNewsClick={handleNewsClick} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsHub; 
