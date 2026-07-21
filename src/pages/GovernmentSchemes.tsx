import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  Newspaper,
  Briefcase,
  Landmark,
  Home,
  Heart,
  GraduationCap,
  Tractor,
  Users,
  Grid,
  Filter,
  X,
  CheckCircle,
  Clock,
  TrendingUp,
  BookOpen,
  Award,
  Building2,
  Wallet,
  MoreHorizontal
} from 'lucide-react';
import { loadGovSchemesData } from '../data/lazyGovSchemesData';
import { teamProfiles } from '../data/teamProfiles';
import WhatsAppBanner from '../components/WhatsAppBanner';

import SEOHelmet from '../components/SEOHelmet';
import { ResponsiveAd } from '../components/BannerAd';

interface Scheme {
  id: string;
  title: string;
  titleHindi: string;
  excerpt: string;
  excerptHindi: string;
  category: string;
  categoryHindi: string;
  status: string;
  launchDate?: string;
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
  { value: 'active', label: 'Active', labelHindi: 'सक्रिय', color: 'emerald' },
  { value: 'upcoming', label: 'Upcoming', labelHindi: 'आगामी', color: 'amber' },
  { value: 'past', label: 'Past', labelHindi: 'पुरानी', color: 'gray' },
  { value: 'future', label: 'Future', labelHindi: 'भविष्य', color: 'blue' },
];

const getCategoryIcon = (category: string, size = 'w-5 h-5') => {
  const normCat = category.toLowerCase();
  if (normCat.includes('hous') || normCat.includes('आवास')) return <Home className={size} />;
  if (normCat.includes('health') || normCat.includes('स्वास्थ्य') || normCat.includes('insurance') || normCat.includes('medical')) return <Heart className={size} />;
  if (normCat.includes('agri') || normCat.includes('farm') || normCat.includes('kisan') || normCat.includes('कृषि')) return <Tractor className={size} />;
  if (normCat.includes('edu') || normCat.includes('scholar') || normCat.includes('student') || normCat.includes('शिक्षा') || normCat.includes('skill')) return <GraduationCap className={size} />;
  if (normCat.includes('business') || normCat.includes('msme') || normCat.includes('loan') || normCat.includes('व्यापार') || normCat.includes('employ') || normCat.includes('job')) return <Briefcase className={size} />;
  if (normCat.includes('women') || normCat.includes('महिला')) return <Award className={size} />;
  if (normCat.includes('youth') || normCat.includes('युवा')) return <TrendingUp className={size} />;
  if (normCat.includes('senior') || normCat.includes('वरिष्ठ')) return <Users className={size} />;
  if (normCat.includes('rural') || normCat.includes('ग्रामीण')) return <Home className={size} />;
  if (normCat.includes('urban') || normCat.includes('शहरी')) return <Building2 className={size} />;
  if (normCat.includes('financial') || normCat.includes('वित्तीय')) return <Wallet className={size} />;
  if (normCat.includes('social') || normCat.includes('pension') || normCat.includes('सामाजिक')) return <Users className={size} />;
  return <Landmark className={size} />;
};

const getCategoryGradient = (category: string): string => {
  const normCat = category.toLowerCase();
  if (normCat.includes('agri') || normCat.includes('farm') || normCat.includes('kisan')) return 'from-emerald-500 to-green-600';
  if (normCat.includes('edu') || normCat.includes('skill') || normCat.includes('scholar')) return 'from-blue-500 to-indigo-600';
  if (normCat.includes('health') || normCat.includes('medical')) return 'from-rose-500 to-pink-600';
  if (normCat.includes('employ') || normCat.includes('job')) return 'from-amber-500 to-orange-600';
  if (normCat.includes('women')) return 'from-purple-500 to-fuchsia-600';
  if (normCat.includes('youth') || normCat.includes('student')) return 'from-cyan-500 to-teal-600';
  if (normCat.includes('senior')) return 'from-slate-500 to-gray-600';
  if (normCat.includes('rural')) return 'from-lime-500 to-green-600';
  if (normCat.includes('urban')) return 'from-violet-500 to-purple-600';
  if (normCat.includes('financial')) return 'from-sky-500 to-blue-600';
  return 'from-indigo-500 to-blue-600';
};

const getCategoryBg = (category: string): string => {
  const normCat = category.toLowerCase();
  if (normCat.includes('agri') || normCat.includes('farm') || normCat.includes('kisan')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (normCat.includes('edu') || normCat.includes('skill') || normCat.includes('scholar')) return 'bg-blue-50 text-blue-700 border-blue-200';
  if (normCat.includes('health') || normCat.includes('medical')) return 'bg-rose-50 text-rose-700 border-rose-200';
  if (normCat.includes('employ') || normCat.includes('job')) return 'bg-amber-50 text-amber-700 border-amber-200';
  if (normCat.includes('women')) return 'bg-purple-50 text-purple-700 border-purple-200';
  if (normCat.includes('youth') || normCat.includes('student')) return 'bg-cyan-50 text-cyan-700 border-cyan-200';
  if (normCat.includes('senior')) return 'bg-slate-50 text-slate-700 border-slate-200';
  if (normCat.includes('rural')) return 'bg-lime-50 text-lime-700 border-lime-200';
  if (normCat.includes('urban')) return 'bg-violet-50 text-violet-700 border-violet-200';
  if (normCat.includes('financial')) return 'bg-sky-50 text-sky-700 border-sky-200';
  return 'bg-indigo-50 text-indigo-700 border-indigo-200';
};

const getStatusStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return { dot: 'bg-emerald-500', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Active' };
    case 'upcoming':
      return { dot: 'bg-amber-500', bg: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Upcoming' };
    case 'past':
      return { dot: 'bg-gray-400', bg: 'bg-gray-50 text-gray-600 border-gray-200', label: 'Past' };
    case 'future':
      return { dot: 'bg-blue-500', bg: 'bg-blue-50 text-blue-700 border-blue-200', label: 'Future' };
    default:
      return { dot: 'bg-gray-400', bg: 'bg-gray-50 text-gray-600 border-gray-200', label: status || 'N/A' };
  }
};

const PAGE_SIZE = 15;
const baseUrl = 'https://moneycal.in';

export const GovernmentSchemes: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || '';
  const statusFromUrl = searchParams.get('status') || '';
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl || null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(statusFromUrl || null);
  const [currentPage, setCurrentPage] = useState(1);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadGovSchemesData();
      setSchemes(data.schemes);
      setCategories(data.categories);
      setLoading(false);
    };
    fetchData();
  }, []);

  const reviewedDate = '2026-06-30';
  const editorialTeam = teamProfiles.length > 0
    ? teamProfiles.slice(0, 3).map(({ id, name, role }) => ({ id, name, role }))
    : [
      { id: 'editorial-desk', name: 'MoneyCal Editorial Desk', role: 'Content Review' }
    ];

  useEffect(() => {
    if (categoryFromUrl && categories.some(c => c.name === categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl, categories.length]);
  useEffect(() => {
    if (statusFromUrl && statusOptions.some(o => o.value === statusFromUrl)) {
      setSelectedStatus(statusFromUrl);
    }
  }, [statusFromUrl]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((cat) => {
      counts[cat.id] = schemes.filter((s) => s.category === cat.name).length;
    });
    return counts;
  }, [schemes, categories]);

  const activeCount = useMemo(() => schemes.filter(s => s.status === 'active').length, [schemes]);

  const filteredSchemes = useMemo(() => {
    let result = schemes.filter((scheme) => {
      const search = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !search ||
        scheme.title.toLowerCase().includes(search) ||
        scheme.titleHindi.toLowerCase().includes(search) ||
        scheme.excerpt.toLowerCase().includes(search) ||
        scheme.keywords.some((k) => k.toLowerCase().includes(search));
      const matchesCategory = selectedCategory === null || scheme.category === selectedCategory;
      const matchesStatus = selectedStatus === null || scheme.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
    result = result.slice().sort((a, b) => {
      const numA = Number(a.id);
      const numB = Number(b.id);
      if (!isNaN(numA) && !isNaN(numB)) return numB - numA;
      return b.id.localeCompare(a.id);
    });
    return result;
  }, [schemes, searchTerm, selectedCategory, selectedStatus]);

  const totalPages = Math.ceil(filteredSchemes.length / PAGE_SIZE);
  const paginatedSchemes = useMemo(() => {
    if (showAll) return filteredSchemes;
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredSchemes.slice(start, start + PAGE_SIZE);
  }, [filteredSchemes, currentPage, showAll]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStatus]);

  useEffect(() => {
    const next = new URLSearchParams();
    if (searchTerm.trim()) next.set('q', searchTerm.trim());
    if (selectedCategory) next.set('category', selectedCategory);
    if (selectedStatus) next.set('status', selectedStatus);
    if (next.toString() !== searchParams.toString()) {
      setSearchParams(next, { replace: true });
    }
  }, [searchTerm, selectedCategory, selectedStatus]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setCategory = (cat: string | null) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const setStatus = (status: string | null) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const clearAllFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedStatus(null);
    setCurrentPage(1);
  }, []);

  const hasActiveFilters = searchTerm || selectedCategory || selectedStatus;

  // Generate page numbers for pagination
  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | '...')[] = [1];
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin" style={{ borderTopColor: '#6366f1' }}></div>
          <Landmark className="w-6 h-6 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-gray-600 font-semibold mt-6 text-lg">Loading Government Schemes...</p>
        <p className="text-gray-400 text-sm mt-1">सरकारी योजनाएं लोड हो रही हैं...</p>
      </div>
    );
  }

  if (!schemes.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Government Schemes</h1>
          <p className="text-gray-600">No data available. Please try again later.</p>
        </div>
      </div>
    );
  }

  const listForSchema = paginatedSchemes.slice(0, 10).map((s, i) => ({
    '@type': 'ListItem' as const,
    position: i + 1,
    name: s.title,
    url: `${baseUrl}/government-schemes/${s.slug}`,
  }));

  return (
    <>
      <WhatsAppBanner />
      <SEOHelmet
        title="200+ Government Schemes India 2026 - सरकारी योजनाएं | MoneyCal"
        description="Browse 200+ Government schemes of India 2026. PM Kisan, PM Awas, MUDRA, Stand Up India and more. Eligibility, benefits, application process in Hindi and English."
        keywords="government schemes India 2026, सरकारी योजनाएं, PM schemes, Sarkari Yojana, government schemes 2026"
        url={selectedCategory || selectedStatus || searchTerm ? `/government-schemes?${searchParams.toString()}` : '/government-schemes'}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Government Schemes India 2026 | MoneyCal',
            description: 'Complete list of 200+ Indian government schemes with eligibility and benefits.',
            url: `${baseUrl}/government-schemes`,
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: filteredSchemes.length,
              itemListElement: listForSchema,
            },
            publisher: { '@type': 'Organization', name: 'MoneyCal India', url: baseUrl },
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white" role="main" id="government-schemes-main">

        {/* ═══════════════════════════════════════════════════════════════════
            PREMIUM HERO SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden pt-24 pb-20" style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4338ca 60%, #6366f1 100%)'
        }}>
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-400/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
            <div className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-white/20"></div>
            <div className="absolute top-40 right-1/3 w-1.5 h-1.5 rounded-full bg-white/15"></div>
            <div className="absolute bottom-20 left-1/3 w-1 h-1 rounded-full bg-white/25"></div>
            {/* Grid pattern */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold tracking-wider uppercase">
                <Landmark className="w-3.5 h-3.5" />
                Sarkari Yojana — Government Schemes Directory
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
              Government{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">Schemes</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6C50 2 150 2 198 6" stroke="rgba(251,191,36,0.5)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="text-center text-indigo-200/80 text-lg sm:text-xl max-w-2xl mx-auto mb-8 font-medium">
              भारत सरकार की {schemes.length}+ योजनाएं — eligibility, benefits, application process
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-10">
              {[
                { num: schemes.length + '+', label: 'Total Schemes', sub: 'कुल योजनाएं' },
                { num: activeCount + '', label: 'Active Now', sub: 'सक्रिय योजनाएं' },
                { num: categories.length + '', label: 'Categories', sub: 'श्रेणियां' },
              ].map((stat, i) => (
                <div key={i} className="text-center px-6 py-3">
                  <div className="text-3xl sm:text-4xl font-black text-white mb-1">{stat.num}</div>
                  <div className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">{stat.label}</div>
                  <div className="text-[10px] text-indigo-300/60 mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative flex items-center bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/20 transition-all duration-300 focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-indigo-500/20">
                <div className="pl-5 pr-3 text-gray-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  id="scheme-search"
                  type="search"
                  placeholder="Search scheme name, category, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none text-gray-900 placeholder-gray-400 focus:ring-0 text-base py-4 outline-none font-medium"
                  aria-label="Search government schemes"
                  autoComplete="off"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="pr-2 pl-2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all mx-2 hidden sm:flex items-center gap-2 whitespace-nowrap">
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500 font-medium">
            <ol className="flex flex-wrap items-center gap-2 uppercase tracking-wider text-xs">
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link></li>
              <li aria-hidden="true"> / </li>
              <li className="text-gray-900 font-bold" aria-current="page">Government Schemes</li>
            </ol>
          </nav>

          <div className="w-full flex justify-center mb-8">
            <ResponsiveAd />
          </div>

          {/* FEATURED: Schemes Finder */}
          <div className="mb-10 bg-white rounded-2xl shadow-md border border-indigo-100 overflow-hidden hover:shadow-lg transition-shadow relative">
            <div className="absolute top-0 right-0 bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider z-10">
              Free Tool
            </div>
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-indigo-50 to-blue-50 p-6 flex flex-col justify-center items-center text-indigo-600 border-b md:border-b-0 md:border-r border-indigo-100">
                <CheckCircle className="w-16 h-16 mb-3 opacity-80" />
                <span className="text-sm font-bold uppercase tracking-widest text-indigo-500">Eligibility Checker</span>
              </div>
              <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Govt Scheme Eligibility Checker</h2>
                <p className="text-gray-600 mb-6">
                  Not sure which government schemes you qualify for? Answer 5 simple questions about your age, income, and occupation to instantly find out your eligibility and get direct apply links.
                </p>
                <div>
                  <Link to="/schemes-finder" className="inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-sm">
                    Check Your Eligibility <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              CATEGORY EXPLORER CARDS
          ═══════════════════════════════════════════════════════════════ */}
          <section className="mb-10" aria-label="Browse by category">
            <div className="flex items-center justify-between mb-5 px-1">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-indigo-600" />
                Browse by Category
              </h2>
              {selectedCategory !== null && (
                <button
                  onClick={() => setCategory(null)}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Clear Filter
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {/* All Schemes card */}
              <button
                onClick={() => setCategory(null)}
                className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 text-center ${
                  selectedCategory === null
                    ? 'border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-100'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-all ${
                  selectedCategory === null
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                }`}>
                  <Grid className="w-5 h-5" />
                </div>
                <span className={`font-bold text-sm ${selectedCategory === null ? 'text-indigo-700' : 'text-gray-700'}`}>
                  All Schemes
                </span>
                <span className={`text-xs font-semibold mt-0.5 ${selectedCategory === null ? 'text-indigo-500' : 'text-gray-400'}`}>
                  {schemes.length}
                </span>
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.name)}
                  className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 text-center ${
                    selectedCategory === cat.name
                      ? 'border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-100'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-all ${
                    selectedCategory === cat.name
                      ? `bg-gradient-to-br ${getCategoryGradient(cat.name)} text-white`
                      : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                  }`}>
                    {getCategoryIcon(cat.name)}
                  </div>
                  <span className={`font-bold text-xs leading-tight ${selectedCategory === cat.name ? 'text-indigo-700' : 'text-gray-700'}`}>
                    {cat.name}
                  </span>
                  <span className={`text-[10px] text-gray-400 mt-0.5 leading-tight`}>
                    {cat.nameHindi}
                  </span>
                  <span className={`text-xs font-bold mt-1 ${selectedCategory === cat.name ? 'text-indigo-500' : 'text-gray-400'}`}>
                    {categoryCounts[cat.id] || 0}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════
              FILTERS & RESULTS BAR
          ═══════════════════════════════════════════════════════════════ */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={selectedStatus ?? ''}
                  onChange={(e) => setStatus(e.target.value || null)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none cursor-pointer"
                  aria-label="Filter by status"
                >
                  <option value="">All Status</option>
                  {statusOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label} — {o.labelHindi}</option>
                  ))}
                </select>
              </div>

              {/* Active Filters Tags */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2">
                  {selectedCategory && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
                      {selectedCategory}
                      <button onClick={() => setCategory(null)} className="hover:text-indigo-900"><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  {selectedStatus && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                      {statusOptions.find(o => o.value === selectedStatus)?.label}
                      <button onClick={() => setStatus(null)} className="hover:text-emerald-900"><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  {searchTerm && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-xs font-semibold">
                      "{searchTerm}"
                      <button onClick={() => setSearchTerm('')} className="hover:text-gray-900"><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-500 font-medium">
              Showing <span className="font-bold text-gray-900">{filteredSchemes.length}</span> scheme{filteredSchemes.length !== 1 ? 's' : ''}
              {!showAll && totalPages > 1 && (
                <span className="text-gray-400"> · Page {currentPage} of {totalPages}</span>
              )}
            </p>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              SCHEME CARDS GRID
          ═══════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedSchemes.map((scheme) => {
              const statusStyle = getStatusStyle(scheme.status);
              return (
                <article
                  key={scheme.id}
                  className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all duration-500 flex flex-col"
                >
                  {/* Top accent bar */}
                  <div className={`h-1 bg-gradient-to-r ${getCategoryGradient(scheme.category)}`} />

                  <div className="p-5 flex-grow flex flex-col">
                    {/* Header: Category + Status */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${getCategoryBg(scheme.category)}`}>
                        {getCategoryIcon(scheme.category, 'w-3.5 h-3.5')}
                        <span className="truncate max-w-[120px]">{scheme.category}</span>
                      </span>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${statusStyle.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                        {statusStyle.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                      <Link to={`/government-schemes/${scheme.slug}`} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {scheme.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-gray-400 font-medium mb-3 line-clamp-1">{scheme.titleHindi}</p>

                    {/* Excerpt */}
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
                      {scheme.excerpt}
                    </p>

                    {/* Benefits Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {scheme.benefits.slice(0, 3).map((benefit, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-50 border border-gray-100 text-[10px] font-medium text-gray-500 truncate max-w-[180px]"
                        >
                          <CheckCircle className="w-2.5 h-2.5 text-emerald-500 flex-shrink-0" />
                          <span className="truncate">{benefit.length > 35 ? benefit.slice(0, 35) + '…' : benefit}</span>
                        </span>
                      ))}
                      {scheme.benefits.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-50 border border-gray-100 text-[10px] font-medium text-gray-400">
                          +{scheme.benefits.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Footer: Beneficiaries + CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      {scheme.beneficiaries ? (
                        <span className="text-[10px] font-medium text-gray-400 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {scheme.beneficiaries}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="relative z-10 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                        Read Article
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* No results */}
          {filteredSchemes.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 mt-4">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No schemes found</h3>
              <p className="text-gray-500 mb-6 text-sm">Try different keywords or clear your filters</p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              PAGINATION
          ═══════════════════════════════════════════════════════════════ */}
          {filteredSchemes.length > 0 && (
            <div className="flex flex-col items-center gap-6 mt-12 mb-8">
              {/* Show All / Paginated toggle */}
              <button
                type="button"
                onClick={() => {
                  setShowAll(!showAll);
                  setCurrentPage(1);
                }}
                className="px-6 py-2.5 rounded-xl font-bold bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-indigo-300 transition-all shadow-sm flex items-center gap-2"
              >
                <Grid className="w-4 h-4 text-indigo-600" />
                {showAll ? 'Show Paginated' : `Show All ${filteredSchemes.length} Schemes`}
              </button>

              {/* Page Numbers */}
              {!showAll && totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                      currentPage === 1
                        ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600'
                    }`}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {getPageNumbers().map((page, idx) =>
                    page === '...' ? (
                      <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center text-gray-400">
                        <MoreHorizontal className="w-4 h-4" />
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-10 h-10 rounded-xl border text-sm font-bold transition-all ${
                          currentPage === page
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600'
                        }`}
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                      currentPage === totalPages
                        ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600'
                    }`}
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              EDITORIAL DESK
          ═══════════════════════════════════════════════════════════════ */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mt-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  Editorial Desk
                </h2>
                <p className="text-sm text-gray-600">
                  Scheme coverage reviewed by the MoneyCal editorial team. Last reviewed: {reviewedDate}.
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm">
                  <Link to="/editorial-policy" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">Editorial policy</Link>
                  <Link to="/about-us" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">About MoneyCal</Link>
                  <Link to="/contact-us" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">Contact</Link>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {editorialTeam.map((member) => (
                  <div key={member.id} className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                    <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default GovernmentSchemes;
