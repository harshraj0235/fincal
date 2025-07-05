import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, Search, Star, TrendingUp, FileSpreadsheet, LayoutGrid, List, Wand2 } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { excelTools, getExcelToolsByCategory } from '../data/excelToolsData';

const ExcelToolsPage: React.FC = () => {
  const [filteredTools, setFilteredTools] = useState(excelTools);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Personal Finance', 'Business & Accounting', 'Investment & Wealth Management', 'Tax & Compliance', 'Loan & Credit', 'Real Estate & Property'];

  useEffect(() => {
    let filtered = excelTools;
    if (selectedCategory !== 'All') {
      filtered = getExcelToolsByCategory(selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(tool =>
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    filtered.sort((a, b) => a.title.localeCompare(b.title));
    setFilteredTools(filtered);
  }, [selectedCategory, searchQuery]);

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "100 Free Excel Tools & Templates - FinanceGurus",
    "description": "Download 100+ free Excel tools and templates for personal finance, business, investment, tax, and more. All tools are SEO optimized and designed for low-competition keywords.",
    "url": "https://moneycal.in/excel-tools",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": excelTools.length,
      "itemListElement": excelTools.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": tool.title,
          "description": tool.description,
          "url": `https://moneycal.in/excel-tools/${tool.slug}`,
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Microsoft Excel",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
          }
        }
      }))
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <SEOHelmet
        title="100 Free Excel Tools & Templates - Download Financial Calculators | FinanceGurus"
        description="Download 100+ free Excel tools and templates for personal finance, business accounting, investment tracking, tax calculation, and more. All tools optimized for low-competition keywords and designed to rank #1 on Google."
        keywords="free excel tools, excel templates download, financial calculator excel, business excel templates, investment tracker excel, tax calculator excel, loan calculator excel, budget template excel"
        url="/excel-tools"
        structuredData={structuredData}
        tags={["excel tools", "financial templates", "business calculators", "investment trackers", "tax calculators"]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="relative">
          {/* Animated Hero Section with SVG Illustration */}
          <section className="relative bg-gradient-to-br from-blue-800 to-blue-500 text-white py-20 shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none animate-pulse opacity-20">
              {/* Custom SVG background illustration */}
              <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#38bdf8" fillOpacity="0.3" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
              </svg>
            </div>
            <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg animate-fade-in">
                <span className="inline-block bg-gradient-to-r from-yellow-300 via-green-300 to-blue-400 bg-clip-text text-transparent">100+ Free Excel Tools</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90 animate-fade-in delay-200">
                Build, customize, and download Excel sheets for every need. <span className="font-semibold">SEO-optimized, device-friendly, and easy for everyone!</span>
              </p>
              {/* Onboarding Tooltip */}
              <div className="inline-flex items-center gap-2 bg-white/90 text-blue-900 px-5 py-3 rounded-full shadow-lg mb-6 animate-bounce" role="status" aria-live="polite">
                <svg className="w-6 h-6 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                <span>New! Try the <Link to="/excel-tool-builder" className="underline font-bold hover:text-blue-700">Excel Tool Builder</Link> to create your own sheet in minutes.</span>
              </div>
              <Link
                to="/excel-tool-builder"
                className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-xl shadow-xl hover:bg-yellow-300 transition-colors text-2xl focus:ring-2 focus:ring-yellow-300 animate-fade-in delay-300"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" /><path d="M7 9l5-5 5 5" /><path d="M12 4v12" /></svg>
                Start Building
              </Link>
            </div>
          </section>
          {/* Persistent Floating CTA for Builder */}
          <Link
            to="/excel-tool-builder"
            className="fixed z-50 bottom-6 right-6 bg-gradient-to-br from-yellow-400 to-green-400 text-blue-900 font-bold px-6 py-3 rounded-full shadow-2xl border-4 border-white hover:scale-105 transition-transform text-lg flex items-center gap-2 focus:ring-2 focus:ring-yellow-300"
            aria-label="Open Excel Tool Builder"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" /><path d="M7 9l5-5 5 5" /><path d="M12 4v12" /></svg>
            Excel Tool Builder
          </Link>
        </div>

        {/* Sticky Search/Filter Bar */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-blue-100 shadow-sm py-3">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search Excel tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                aria-label="Search Excel tools"
              />
            </div>
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-colors whitespace-nowrap ${selectedCategory === category ? 'bg-blue-600 text-white shadow' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
            {/* View Mode Toggle */}
            <div className="flex gap-2 items-center">
              <button
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tools Grid/List */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-blue-700 font-medium">
                Showing {filteredTools.length} of {excelTools.length} Excel tools
              </p>
              <Link
                to="/excel-tool-builder"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-400"
              >
                <Wand2 className="w-5 h-5" /> Build Your Own Excel Tool
              </Link>
            </div>
            {/* Grid or List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool, idx) => (
                  <div key={tool.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-blue-100 flex flex-col">
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        {idx < 3 && <span className="bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Trending</span>}
                        {tool.estimatedTraffic === 'High' && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1"><Star className="w-3 h-3" /> Popular</span>}
                      </div>
                      <h3 className="text-lg font-semibold text-blue-900 line-clamp-2 mb-2">
                        {tool.title}
                      </h3>
                      <p className="text-blue-700 text-sm mb-4 line-clamp-3">
                        {tool.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tool.difficulty)}`}>{tool.difficulty}</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">{tool.category}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tool.keywords.slice(0, 2).map((keyword, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{keyword}</span>
                        ))}
                        {tool.keywords.length > 2 && <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">+{tool.keywords.length - 2} more</span>}
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <a
                          href={tool.downloadLink}
                          download
                          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" /> Download
                        </a>
                        <Link
                          to={
                            tool.slug === 'freelancer-invoice-generator'
                              ? '/excel-tools/freelancer-invoice-generator'
                              : tool.slug === 'employee-attendance-salary-sheet'
                              ? '/excel-tools/employee-attendance-salary-sheet'
                              : `/excel-tools/${tool.slug}`
                          }
                          className="px-4 py-2 border border-blue-200 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors duration-200"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredTools.map((tool, idx) => (
                  <div key={tool.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-blue-100 flex flex-col md:flex-row items-center">
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        {idx < 3 && <span className="bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Trending</span>}
                        {tool.estimatedTraffic === 'High' && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1"><Star className="w-3 h-3" /> Popular</span>}
                      </div>
                      <h3 className="text-lg font-semibold text-blue-900 line-clamp-2 mb-2">
                        {tool.title}
                      </h3>
                      <p className="text-blue-700 text-sm mb-4 line-clamp-3">
                        {tool.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tool.difficulty)}`}>{tool.difficulty}</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">{tool.category}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tool.keywords.slice(0, 2).map((keyword, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{keyword}</span>
                        ))}
                        {tool.keywords.length > 2 && <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">+{tool.keywords.length - 2} more</span>}
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <a
                          href={tool.downloadLink}
                          download
                          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" /> Download
                        </a>
                        <Link
                          to={
                            tool.slug === 'freelancer-invoice-generator'
                              ? '/excel-tools/freelancer-invoice-generator'
                              : tool.slug === 'employee-attendance-salary-sheet'
                              ? '/excel-tools/employee-attendance-salary-sheet'
                              : `/excel-tools/${tool.slug}`
                          }
                          className="px-4 py-2 border border-blue-200 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors duration-200"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* No Results */}
            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <FileSpreadsheet className="w-16 h-16 text-blue-200 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-blue-900 mb-2">No Excel tools found</h3>
                <p className="text-blue-700">Try adjusting your search criteria or browse all categories.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ExcelToolsPage;
