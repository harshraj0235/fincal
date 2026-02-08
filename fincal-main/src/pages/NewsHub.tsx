import React, { useState, useMemo, useEffect } from "react";
import NewsList, { NewsItem } from "../components/NewsList";
import { loadBlogData } from "../data/lazyBlogData";
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
  const [allBlogs, setAllBlogs] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for search and pagination
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  
  // Lazy load blog data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Flatten calculators
        const calculators: NewsItem[] = calculatorCategories.flatMap(cat => cat.calculators.map(calc => ({
          id: String(calc.id),
          title: calc.name,
          summary: calc.description,
          category: cat.name,
          date: "",
          slug: `/calculators/${calc.id}`
        })));

        // Load blog posts lazily
        const { blogPosts0, blogPosts1 } = await loadBlogData();

        // Map blog posts
        const blogs: NewsItem[] = [
          ...(blogPosts0 || []).map((post: any) => ({
            id: String(post.id),
            title: post.title,
            summary: post.excerpt || "",
            category: post.categories?.[0] || "अन्य",
            date: post.date || "",
            slug: `/blog/${post.slug}`
          })),
          ...(blogPosts1 || []).map((post: any) => ({
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

        setAllBlogs(blogs);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter blogs by search
  const filteredBlogs = useMemo(() => {
    if (!allBlogs.length) return [];
    if (!search.trim()) return allBlogs;
    const s = search.trim().toLowerCase();
    return allBlogs.filter(item =>
      item.title.toLowerCase().includes(s) ||
      item.summary.toLowerCase().includes(s) ||
      item.category.toLowerCase().includes(s)
    );
  }, [search, allBlogs]);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const currentItems = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            onChange={e => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
          {isLoading ? (
            <div className="text-center py-8">
              <div className="skeleton w-full h-40 rounded-lg mb-4"></div>
              <div className="skeleton w-full h-40 rounded-lg mb-4"></div>
              <div className="skeleton w-full h-40 rounded-lg"></div>
            </div>
          ) : (
            <NewsList news={currentItems} onNewsClick={handleNewsClick} />
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;
                const isNearActive = Math.abs(page - currentPage) <= 2;

                if (isActive || isNearActive || page === 1 || page === totalPages) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 3 || page === currentPage + 3) {
                  return <span key={page} className="px-2 text-gray-500">...</span>;
                }
                return null;
              })}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsHub; 
