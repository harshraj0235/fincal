import React, { useState, useMemo } from "react";
import NewsList, { NewsItem } from "../components/NewsList";
import { blogPosts as blogPosts0 } from "../data/blogData";
import { blogPosts as blogPosts1 } from "../data/blogData1";
import { governmentSchemes } from "../data/governmentSchemesData";
import { calculatorCategories } from "../data/calculatorData";

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-100 py-6 px-2 md:px-8 lg:px-32">
      <div className="max-w-3xl mx-auto">
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
  );
};

export default NewsHub; 
