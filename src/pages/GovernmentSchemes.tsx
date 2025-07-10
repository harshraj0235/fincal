import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Calendar,
  Filter,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { governmentSchemes, schemeCategories } from '../data/governmentSchemesData';

interface Scheme {
  id: string;
  title: string;
  titleHindi: string;
  excerpt: string;
  excerptHindi: string;
  category: string;
  categoryHindi: string;
  status: string;
  launchDate: string;
  coverImage: string;
  slug: string;
  beneficiaries?: string;
  benefits: string[];
  keywords: string[];
  targetAudience: string[];
}

interface Category {
  id: string;
  name: string;
  nameHindi: string;
}

const statusOptions = [
  { value: 'active', label: 'Active Schemes', labelHindi: 'सक्रिय योजनाएं' },
  { value: 'upcoming', label: 'Upcoming Schemes', labelHindi: 'आगामी योजनाएं' },
  { value: 'past', label: 'Past Schemes', labelHindi: 'पुरानी योजनाएं' },
  { value: 'future', label: 'Future Schemes', labelHindi: 'भविष्य की योजनाएं' },
];

const PAGE_SIZE = 15;

const GovernmentSchemes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const schemes: Scheme[] = Array.isArray(governmentSchemes) ? governmentSchemes : [];
  const categories: Category[] = Array.isArray(schemeCategories) ? schemeCategories : [];

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((cat) => {
      counts[cat.id] = schemes.filter((scheme) => scheme.category === cat.name).length;
    });
    return counts;
  }, [schemes, categories]);

  // Filtered and sorted schemes (descending id)
  const filteredSchemes = useMemo(() => {
    let result = schemes.filter((scheme) => {
      const search = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !search ||
        scheme.title.toLowerCase().includes(search) ||
        scheme.titleHindi.toLowerCase().includes(search) ||
        scheme.excerpt.toLowerCase().includes(search) ||
        scheme.keywords.some((keyword) => keyword.toLowerCase().includes(search));
      const matchesCategory = selectedCategory === null || scheme.category === selectedCategory;
      const matchesStatus = selectedStatus === null || scheme.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });

    result = result.slice().sort((a, b) => {
      const numA = Number(a.id);
      const numB = Number(b.id);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numB - numA;
      }
      return b.id.localeCompare(a.id);
    });

    return result;
  }, [schemes, searchTerm, selectedCategory, selectedStatus]);

  // Pagination logic
  const totalPages = Math.ceil(filteredSchemes.length / PAGE_SIZE);
  const paginatedSchemes = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredSchemes.slice(start, start + PAGE_SIZE);
  }, [filteredSchemes, currentPage]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStatus]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pagination UI (mobile-friendly, sarkariresult.com style)
  const Pagination = () => {
    if (totalPages <= 1) return null;
    const pages: number[] = [];
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pages.push(i);
    }
    if (!pages.includes(1)) pages.unshift(1);
    if (!pages.includes(totalPages)) pages.push(totalPages);
    const uniquePages = Array.from(new Set(pages));
    return (
      <nav className="flex flex-wrap items-center justify-center gap-1 mt-10 mb-6 select-none" aria-label="Pagination">
        <button
          className="flex items-center px-3 py-2 rounded bg-white text-red-700 border border-red-200 hover:bg-red-50 transition disabled:opacity-50"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex flex-nowrap overflow-x-auto gap-1">
          {uniquePages.map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded text-base font-bold ${
                page === currentPage
                  ? 'bg-red-600 text-white shadow'
                  : 'bg-white text-red-700 border border-red-200 hover:bg-red-50'
              } transition`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          className="flex items-center px-3 py-2 rounded bg-white text-red-700 border border-red-200 hover:bg-red-50 transition disabled:opacity-50"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </nav>
    );
  };

  if (!schemes.length) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Error Loading Government Schemes</h1>
          <p className="text-gray-600">No data available. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-red-700 text-white border-b-4 border-black">
        <div className="max-w-5xl mx-auto px-3 py-6">
          <h1 className="text-3xl font-extrabold text-center tracking-widest mb-1" style={{ letterSpacing: '2px' }}>
            SARKARI RESULT STYLE - भारत सरकार की योजनाएं
          </h1>
          <div className="text-center text-white text-lg font-semibold mb-3">
            भारत की सभी सरकारी योजनाएं - Latest Govt. Schemes
          </div>
          {/* Search Bar */}
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="योजना, श्रेणी या कीवर्ड खोजें..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-black font-bold border-2 border-red-700 focus:ring-2 focus:ring-red-300 bg-white placeholder-gray-400 text-lg"
                aria-label="Search Government Schemes"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-red-700 h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="bg-black py-3 px-2 flex flex-wrap gap-2 justify-center border-b-4 border-red-700">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-5 py-2 rounded-full font-extrabold text-base shadow transition-all duration-200 border-2 ${
            selectedCategory === null
              ? 'bg-red-600 text-white border-white'
              : 'bg-white text-black border-red-700 hover:bg-red-100'
          }`}
        >
          सभी श्रेणियां ({schemes.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-5 py-2 rounded-full font-extrabold text-base shadow flex items-center gap-2 border-2 transition-all duration-200 ${
              selectedCategory === cat.name
                ? 'bg-red-600 text-white border-white'
                : 'bg-white text-black border-red-700 hover:bg-red-100'
            }`}
          >
            <Filter className="h-4 w-4" />
            {cat.nameHindi} ({categoryCounts[cat.id] ?? 0})
          </button>
        ))}
      </div>

      {/* Status Filter */}
      <div className="bg-gray-100 text-center py-3 border-b">
        <select
          value={selectedStatus ?? ''}
          onChange={(e) => setSelectedStatus(e.target.value || null)}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 text-base font-bold"
          aria-label="Filter by Status"
        >
          <option value="">सभी स्थिति</option>
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.labelHindi}
            </option>
          ))}
        </select>
      </div>

      {/* Schemes List */}
      <div className="max-w-5xl mx-auto px-2 sm:px-4 py-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedSchemes.map((scheme) => (
            <Link
              key={scheme.id}
              to={`/government-schemes/${scheme.slug}`}
              className="flex flex-col sm:flex-row items-stretch bg-white border-2 border-black hover:border-red-700 hover:shadow-lg transition overflow-hidden rounded-xl group"
              style={{ minHeight: 120 }}
            >
              <div className="flex-shrink-0 w-full sm:w-36 bg-gray-100 flex items-center justify-center border-r-2 border-black">
                <img
                  src={scheme.coverImage}
                  alt={scheme.title}
                  className="w-full h-28 sm:h-36 object-cover group-hover:scale-110 transition-transform duration-200"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        scheme.status === 'active'
                          ? 'bg-green-600 text-white'
                          : scheme.status === 'upcoming'
                          ? 'bg-yellow-500 text-black'
                          : scheme.status === 'past'
                          ? 'bg-gray-800 text-white'
                          : 'bg-purple-700 text-white'
                      }`}
                    >
                      {scheme.status === 'active'
                        ? 'सक्रिय'
                        : scheme.status === 'upcoming'
                        ? 'आगामी'
                        : scheme.status === 'past'
                        ? 'पुरानी'
                        : 'भविष्य'}
                    </span>
                    <span className="flex items-center gap-1 text-red-700 font-semibold">
                      <Calendar className="h-4 w-4" />
                      {new Date(scheme.launchDate).toLocaleDateString('hi-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    <span className="font-bold text-lg text-black group-hover:text-red-700 transition line-clamp-1">{scheme.titleHindi}</span>
                  </div>
                  <div className="text-gray-700 text-sm mb-1 line-clamp-2">{scheme.excerptHindi}</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">{scheme.categoryHindi}</span>
                    {scheme.beneficiaries && (
                      <span className="bg-black text-white px-2 py-1 rounded text-xs">{scheme.beneficiaries}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-end justify-between mt-2">
                  <div className="text-xs text-gray-500">
                    {scheme.benefits.length} लाभ
                  </div>
                  <div className="flex items-center gap-1 text-red-700 font-bold text-sm group-hover:underline">
                    विवरण देखें <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">कोई योजना नहीं मिली</h3>
              <p className="text-gray-500 mb-4">अपने खोज शब्दों को बदलें या सभी श्रेणियां देखें</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                  setSelectedStatus(null);
                }}
                className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors font-bold"
              >
                सभी योजनाएं देखें
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredSchemes.length > 0 && <Pagination />}

        {/* Results Count */}
        {filteredSchemes.length > 0 && (
          <div className="mt-2 text-center text-gray-700 text-sm font-semibold">
            {filteredSchemes.length} में से {paginatedSchemes.length} योजनाएं दिखा रहा है (पृष्ठ {currentPage} / {totalPages})
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernmentSchemes;
