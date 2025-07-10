import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Calendar,
  Users,
  TrendingUp,
  BookOpen,
  Filter,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { governmentSchemes, schemeCategories } from '../data/governmentSchemesData';

// Type definitions for schemes and categories (adjust if needed)
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
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Defensive data checks (improve production robustness)
  const schemes: Scheme[] = Array.isArray(governmentSchemes)
    ? governmentSchemes
    : [];
  const categories: Category[] = Array.isArray(schemeCategories)
    ? schemeCategories
    : [];

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((cat) => {
      counts[cat.id] = schemes.filter((scheme) => scheme.category === cat.name)
        .length;
    });
    return counts;
  }, [schemes, categories]);

  // Filtered and sorted schemes
  const filteredSchemes = useMemo(() => {
    let result = schemes.filter((scheme) => {
      const search = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !search ||
        scheme.title.toLowerCase().includes(search) ||
        scheme.titleHindi.toLowerCase().includes(search) ||
        scheme.excerpt.toLowerCase().includes(search) ||
        scheme.keywords.some((keyword) =>
          keyword.toLowerCase().includes(search)
        );

      const matchesCategory =
        selectedCategory === null || scheme.category === selectedCategory;

      const matchesStatus =
        selectedStatus === null || scheme.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Descending order by id (assuming id is numeric or can be sorted as string)
    result = result.slice().sort((a, b) => {
      // If id is numeric, use Number(a.id)
      // If id is string but sortable, use localeCompare
      // Let's try numeric first, fallback to string compare
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

  // Handle page change
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page when filters/search change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStatus]);

  // Error fallback UI if no data
  if (!schemes.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Government Schemes
          </h1>
          <p className="text-gray-600">
            No data available. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Pagination buttons (mobile friendly)
  const Pagination = () => {
    if (totalPages <= 1) return null;

    // Show up to 3 pages before and after current, and always first/last
    const pages: number[] = [];
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pages.push(i);
    }
    if (!pages.includes(1)) pages.unshift(1);
    if (!pages.includes(totalPages)) pages.push(totalPages);

    // Remove duplicates, keep order
    const uniquePages = Array.from(new Set(pages));

    return (
      <nav
        className="flex flex-wrap items-center justify-center gap-2 mt-10 mb-6"
        aria-label="Pagination"
      >
        <button
          className="flex items-center px-3 py-2 rounded-lg bg-white text-green-700 border border-green-200 hover:bg-green-50 transition disabled:opacity-50"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex flex-nowrap overflow-x-auto gap-2">
          {uniquePages.map((page, idx) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                page === currentPage
                  ? 'bg-green-600 text-white shadow'
                  : 'bg-white text-green-700 border border-green-200 hover:bg-green-50'
              } transition`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          className="flex items-center px-3 py-2 rounded-lg bg-white text-green-700 border border-green-200 hover:bg-green-50 transition disabled:opacity-50"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </nav>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              भारत सरकार की योजनाएं
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              सभी सरकारी योजनाओं की पूरी जानकारी - आवेदन से लेकर लाभ तक
            </p>
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="योजना, श्रेणी या कीवर्ड खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300"
                  aria-label="Search Government Schemes"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-gray-900">कुल योजनाएं</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {schemes.length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-900">श्रेणियां</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{categories.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-gray-900">सक्रिय योजनाएं</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {schemes.filter((s) => s.status === 'active').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <span className="font-semibold text-gray-900">2025 योजनाएं</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">100+</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">योजनाएं ब्राउज़ करें</h2>
            <div className="flex items-center gap-4">
              <select
                value={selectedStatus ?? ''}
                onChange={(e) => setSelectedStatus(e.target.value || null)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
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
          </div>
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm ${selectedCategory === null ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
              aria-pressed={selectedCategory === null}
            >
              सभी श्रेणियां ({schemes.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 text-sm ${selectedCategory === cat.name ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
                aria-pressed={selectedCategory === cat.name}
              >
                <Filter className="h-4 w-4" />
                {cat.nameHindi} ({categoryCounts[cat.id] ?? 0})
              </button>
            ))}
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedSchemes.map((scheme) => (
            <Link
              key={scheme.id}
              to={`/government-schemes/${scheme.slug}`}
              className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative">
                <img
                  src={scheme.coverImage}
                  alt={scheme.title}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      scheme.status === 'active'
                        ? 'bg-green-500 text-white'
                        : scheme.status === 'upcoming'
                        ? 'bg-blue-500 text-white'
                        : scheme.status === 'past'
                        ? 'bg-gray-500 text-white'
                        : 'bg-purple-500 text-white'
                    }`}
                  >
                    {scheme.status === 'active'
                      ? 'सक्रिय'
                      : scheme.status === 'upcoming'
                      ? 'आगामी'
                      : scheme.status === 'past'
                      ? 'पुरानी'
                      : 'भविष्य'}
                  </div>
                </div>
                <div className="absolute bottom-3 right-3">
                  <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                    {scheme.beneficiaries || 'लाखों लाभार्थी'}
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Calendar className="h-3 w-3" />
                  {new Date(scheme.launchDate).toLocaleDateString('hi-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                  {scheme.titleHindi}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {scheme.excerptHindi}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                    {scheme.categoryHindi}
                  </span>
                  {scheme.targetAudience.slice(0, 1).map((audience) => (
                    <span
                      key={audience}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {scheme.benefits.length} लाभ
                  </div>
                  <div className="flex items-center gap-1 text-green-600 font-medium text-sm">
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">कोई योजना नहीं मिली</h3>
              <p className="text-gray-500 mb-4">अपने खोज शब्दों को बदलें या सभी श्रेणियां देखें</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                  setSelectedStatus(null);
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
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
          <div className="mt-2 text-center text-gray-500 text-sm">
            {filteredSchemes.length} में से {paginatedSchemes.length} योजनाएं दिखा रहा है (पृष्ठ {currentPage} / {totalPages})
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernmentSchemes;
