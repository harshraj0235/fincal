import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, IndianRupee, FileText, Search, Filter, Newspaper, GraduationCap, Building2, Table, Zap, Coins, LayoutGrid, Target } from 'lucide-react';
import { loadBlogData } from '../data/lazyBlogData';
import { loadGovSchemesData } from '../data/lazyGovSchemesData';
import { loadCryptoData } from '../data/lazyCryptoData';
import { calculatorCategories } from '../data/calculatorData';
import { gkCategories } from '../data/gkData';
import { excelTools } from '../data/excelToolsData';
import { excelToolBlogPosts } from '../data/exceltooldata';
import { festivalList } from '../data/festivalTools';
import { goldTools } from '../data/goldTools';
import { investingLessons } from '../data/learn/investingLessons';
import { taxationLessons } from '../data/learn/taxationLessons';
import { fintechLessons } from '../data/learn/fintechLessons';
import { moneyManagementLessons } from '../data/learn/moneyManagementLessons';
import { savingsBankLessons } from '../data/learn/savingsBankLessons';
import { insuranceRetirementLessons } from '../data/learn/insuranceRetirementLessons';
import { businessFinanceLessons } from '../data/learn/businessFinanceLessons';
import { advancedFinanceLessons } from '../data/learn/advancedFinanceLessons';
import { behaviouralFinanceLessons } from '../data/learn/behaviouralFinanceLessons';
import { loanBasicsLessons, homeLoansLessons, personalLoansLessons } from '../data/learn/loansLessons';
import { contentRegistry } from '../cms-content/contentRegistry';
import { allIpoData } from '../services/ipoApi';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';
import SEOHelmet from '../components/SEOHelmet';

export const Sitemap: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogs, setBlogs] = useState<any[]>([]);
  const [schemes, setSchemes] = useState<any[]>([]);
  const [crypto, setCrypto] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [blogData, schemeData, cryptoData] = await Promise.all([
          loadBlogData(),
          loadGovSchemesData(),
          loadCryptoData()
        ]);
        setBlogs(blogData);
        setSchemes(schemeData.schemes);
        setCrypto(cryptoData);
      } catch (error) {
        console.error("Error loading sitemap data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // Create a comprehensive list of all pages for search
  const allPages = useMemo(() => {
    const pages = [
      // Main Pages
      { title: 'Home', url: '/', category: 'main' },
      { title: 'Blog', url: '/blog', category: 'main' },
      { title: 'About Us', url: '/about-us', category: 'main' },
      { title: 'Contact Us', url: '/contact-us', category: 'main' },
      { title: 'Privacy Policy', url: '/privacy-policy', category: 'main' },
      { title: 'Terms and Conditions', url: '/terms-and-conditions', category: 'main' },
      { title: 'Disclaimer', url: '/disclaimer', category: 'main' },
      { title: 'Cookie Policy', url: '/cookie-policy', category: 'main' },
      { title: 'Editorial Policy', url: '/editorial-policy', category: 'main' },
      { title: 'Sitemap', url: '/sitemap', category: 'main' },

      // Blog Posts
      ...blogs.map(post => ({
        title: post.title,
        url: `/blog/${post.slug}`,
        category: 'blog'
      })),

      // SEO Finance Blog Posts
      { title: 'Finance Blog Hub', url: '/finance-blog', category: 'blog' },
      // Note: seoBlogPosts are now included in blogs via lazyBlogData loader if unified
      // If they are separate in lazyLoader, we would handle them here.
      // For now, let's keep it as is if they are still separate.


      // Finance & Banking Tools
      { title: 'Bank IFSC/MICR Finder', url: '/calculators/bank-ifsc-finder', category: 'finance' },
      { title: 'UPI Failure Troubleshooter', url: '/calculators/upi-failure-troubleshooter', category: 'finance' },
      { title: 'ATM Locator', url: '/calculators/atm-locator', category: 'finance' },
      { title: 'Bank Holiday Calendar', url: '/calculators/bank-holiday-calendar', category: 'finance' },
      { title: 'Best Interest Rates', url: '/calculators/interest-rates-comparison', category: 'finance' },
      { title: 'Banking Knowledge', url: '/calculators/banking-knowledge', category: 'finance' },

      // Loan Tools
      { title: 'Loan Tools Hub', url: '/loan-tools', category: 'loan' },
      { title: 'EMI Calculator (Reducing Balance)', url: '/loan-tools/emi-calculator', category: 'loan' },
      { title: 'Flat Rate Loan EMI Calculator', url: '/loan-tools/flat-rate-calculator', category: 'loan' },
      { title: 'Extra Payment Impact Calculator', url: '/loan-tools/prepayment-calculator', category: 'loan' },
      { title: 'Debt Snowball vs Avalanche Simulator', url: '/loan-tools/debt-strategies', category: 'loan' },
      { title: 'Loan Refinancing Calculator', url: '/loan-tools/refinancing-calculator', category: 'loan' },
      { title: 'Loan Affordability Calculator', url: '/loan-tools/loan-affordability', category: 'loan' },
      { title: 'Debt Consolidation Calculator', url: '/loan-tools/debt-consolidation', category: 'loan' },
      { title: 'Amortization Schedule Viewer', url: '/loan-tools/amortization-schedule', category: 'loan' },

      // New Platform Features
      { title: 'Comprehensive Finance Hub', url: '/comprehensive-finance-hub', category: 'platform' },
      { title: 'Market Analysis & Trends', url: '/market-analysis', category: 'platform' },

      // Government Schemes
      ...schemes.map(scheme => ({
        title: scheme.title,
        url: `/government-schemes/${scheme.slug}`,
        category: 'schemes'
      })),

      // Crypto Articles
      ...crypto.map(article => ({
        title: article.title,
        url: `/crypto/${article.slug}`,
        category: 'crypto'
      })),

      // News Articles
      ...contentRegistry.map(post => ({
        title: post.title,
        url: `/news/${post.slug}`,
        category: 'news'
      })),

      // GK Section
      { title: 'GK Section Hub', url: '/gk', category: 'gk' },
      ...gkCategories.flatMap(category => [
        { title: `${category.name} GK Category`, url: `/gk/${category.slug}`, category: 'gk' },
        ...category.topics.map(topic => ({
          title: `${topic.name} GK Topic`,
          url: `/gk/${category.slug}/${topic.slug}`,
          category: 'gk'
        }))
      ]),

      // Excel Tools
      ...excelTools.map(tool => ({
        title: tool.title,
        url: `/excel-tools/${tool.slug}`,
        category: 'excel'
      })),

      // IPO Articles
      ...allIpoData.map(ipo => ({
        title: `${ipo.name} IPO Review & GMP`,
        url: `/ipo/${ipo.slug}`,
        category: 'ipo'
      })),

      // Festival Tools
      { title: 'Festival Tools Hub', url: '/festival-tools', category: 'festival' },
      ...festivalList.flatMap(fest => [
        { title: `${fest.name} Festival Tools`, url: `/festival-tools/${fest.slug}`, category: 'festival' },
        ...fest.tools.map(tool => ({
          title: `${fest.name} ${tool.name}`,
          url: `/festival-tools/${fest.slug}/${tool.slug}`,
          category: 'festival'
        }))
      ]),

      // Gold Tools
      { title: 'Gold Tools Hub', url: '/gold-tools', category: 'gold' },
      ...goldTools.map(tool => ({
        title: tool.name,
        url: `/gold-tools/${tool.slug}`,
        category: 'gold'
      })),

      // Excel Tool Blog Posts
      ...excelToolBlogPosts.map(post => ({
        title: post.title,
        url: `/excel-tools/${post.slug}`,
        category: 'excel'
      })),

      // Learning Lessons
      ...investingLessons.map(lesson => ({ title: lesson.title, url: `/learn/investing-wealth/${lesson.slug}`, category: 'learning' })),
      ...taxationLessons.map(lesson => ({ title: lesson.title, url: `/learn/taxation-compliance/${lesson.slug}`, category: 'learning' })),
      ...fintechLessons.map(lesson => ({ title: lesson.title, url: `/learn/fintech-digital-payments/${lesson.slug}`, category: 'learning' })),
      ...moneyManagementLessons.map(lesson => ({ title: lesson.title, url: `/learn/money-management/${lesson.slug}`, category: 'learning' })),
      ...savingsBankLessons.map(lesson => ({ title: lesson.title, url: `/learn/savings-bank-products/${lesson.slug}`, category: 'learning' })),
      ...insuranceRetirementLessons.map(lesson => ({ title: lesson.title, url: `/learn/insurance-retirement/${lesson.slug}`, category: 'learning' })),
      ...businessFinanceLessons.map(lesson => ({ title: lesson.title, url: `/learn/business-finance-entrepreneurship/${lesson.slug}`, category: 'learning' })),
      ...advancedFinanceLessons.map(lesson => ({ title: lesson.title, url: `/learn/advanced-specialised-finance/${lesson.slug}`, category: 'learning' })),
      ...behaviouralFinanceLessons.map(lesson => ({ title: lesson.title, url: `/learn/behavioural-finance-money-psychology/${lesson.slug}`, category: 'learning' })),
      ...loanBasicsLessons.map(lesson => ({ title: lesson.title, url: `/learn/loans/${lesson.slug}`, category: 'learning' })),
      ...homeLoansLessons.map(lesson => ({ title: lesson.title, url: `/learn/home-loans/${lesson.slug}`, category: 'learning' })),
      ...personalLoansLessons.map(lesson => ({ title: lesson.title, url: `/learn/personal-loans/${lesson.slug}`, category: 'learning' })),

      // Calculator Categories
      ...calculatorCategories.flatMap(category =>
        category.calculators.map(calculator => ({
          title: calculator.name,
          url: `/calculators/${calculator.id}`,
          category: 'calculator'
        }))
      ),

      // Specialized Finance & PDF Tools
      { title: 'PDF & Document Tools Hub', url: '/finance-tools/pdf-converters', category: 'finance' },
      { title: 'Salary Slip PDF to Excel Converter', url: '/finance-tools/pdf-converters/salary-slip-pdf-to-excel', category: 'finance' },
      { title: 'Bank Statement PDF to Excel Converter', url: '/finance-tools/pdf-converters/bank-statement-pdf-to-excel', category: 'finance' },
      { title: 'Credit Card Statement PDF to Excel', url: '/finance-tools/pdf-converters/credit-card-statement-pdf-to-excel', category: 'finance' },
      { title: 'Form 16 Tax Tools Suite', url: '/finance-tools/pdf-converters/form16-suite', category: 'finance' },
      { title: 'SIP Delay Cost Calculator', url: '/finance-tools/sip-delay-loss-calculator', category: 'finance' },
      { title: 'SIP Step-up Planner', url: '/finance-tools/sip-step-up-planner', category: 'finance' },
      { title: 'Lumpsum vs SIP Analyzer', url: '/finance-tools/lumpsum-vs-sip-analyzer', category: 'finance' },
      { title: 'Real vs Nominal Return Calculator', url: '/finance-tools/real-vs-nominal-return-calculator', category: 'finance' },
      { title: 'FD vs Mutual Fund Return Tool', url: '/finance-tools/fd-vs-mutual-fund-return-tool', category: 'finance' },
      { title: 'Stock CAGR Calculator', url: '/finance-tools/stock-cagr-calculator', category: 'finance' },
      { title: 'Portfolio Diversification Visualizer', url: '/finance-tools/portfolio-diversification-visualizer', category: 'finance' },
      { title: 'Dividend Tracker & Analyzer', url: '/finance-tools/dividend-tracker', category: 'finance' },
      { title: 'XIRR Calculator for Investments', url: '/finance-tools/xirr-calculator', category: 'finance' },
      { title: 'MF Expense Ratio Estimator', url: '/finance-tools/mutual-fund-expense-ratio-estimator', category: 'finance' },
      { title: 'Nifty vs Sensex Performance Tracker', url: '/finance-tools/nifty-vs-sensex-performance-tracker', category: 'finance' },
      { title: 'Stock Analysis Tool', url: '/tools/stock-analyzer', category: 'finance' },
      { title: 'Mutual Fund Deep Analyzer', url: '/tools/mutual-fund-analyzer', category: 'finance' },
      { title: 'Investment Goal Planner', url: '/tools/investment-goal-planner', category: 'finance' },
      { title: 'Compound Interest Master Calculator', url: '/tools/compound-interest-calculator', category: 'finance' },
      { title: 'Monthly Budget Planner', url: '/tools/monthly-budget-planner', category: 'finance' },
      { title: 'Corporate Finance Hub', url: '/corporate-finance', category: 'corporate' },
      { title: 'Business Valuation Calculator', url: '/corporate-finance/business-valuation-calculator', category: 'corporate' },
      { title: 'Loan Amortization Generator (Advanced)', url: '/corporate-finance/loan-amortization-generator', category: 'corporate' },
      { title: 'M&A Synergy Estimator', url: '/corporate-finance/ma-synergy-estimator', category: 'corporate' },
      { title: 'Working Capital Optimizer', url: '/corporate-finance/working-capital-optimizer', category: 'corporate' },
      { title: 'Capital Structure Analyzer', url: '/corporate-finance/capital-structure-analyzer', category: 'corporate' },
      { title: 'Break-Even Calculator', url: '/corporate-finance/break-even-calculator', category: 'corporate' },
      { title: 'Dividend Policy Impact Tool', url: '/corporate-finance/dividend-policy-impact-tool', category: 'corporate' },
      { title: 'FX Exposure Risk Calculator', url: '/corporate-finance/fx-exposure-risk-calculator', category: 'corporate' },
      { title: 'Cost of Capital Benchmarking', url: '/corporate-finance/cost-capital-benchmarking', category: 'corporate' },
      { title: 'Scenario Analysis Simulator', url: '/corporate-finance/scenario-analysis-simulator', category: 'corporate' },
      { title: 'GST Tools Hub', url: '/gst-tools', category: 'gst' },
      { title: 'GST Calculator', url: '/gst-tools/gst-calculator', category: 'gst' },
      { title: 'GST Due Date Tracker', url: '/gst-tools/gst-due-date-tracker', category: 'gst' },
      { title: 'GSTR-3B Preparation Tool', url: '/gst-tools/gstr-3b-preparation', category: 'gst' },
      { title: 'GST HSN/SAC Finder', url: '/gst-tools/gst-hsn-sac-finder', category: 'gst' },
      { title: 'GST Slab Finder', url: '/gst-tools/gst-slab-finder', category: 'gst' },
      { title: 'GST Liability Calculator', url: '/gst-tools/gst-liability-calculator', category: 'gst' },
      { title: 'GST Penalty & Interest Calculator', url: '/gst-tools/gst-penalty-interest-calculator', category: 'gst' },
      { title: 'GST RCM Calculator', url: '/gst-tools/gst-rcm-calculator', category: 'gst' },
      { title: 'GST Composition Eligibility', url: '/gst-tools/gst-composition-eligibility', category: 'gst' }
    ];

    return pages;
  }, [blogs, schemes, crypto, allIpoData]);

  // Filter pages based on search term and category
  const filteredPages = useMemo(() => {
    let filtered = allPages;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(page => page.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(page =>
        page.title.toLowerCase().includes(term) ||
        page.url.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [allPages, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[--primary-500] mx-auto mb-4"></div>
          <p className="text-neutral-400">Loading Sitemap...</p>
        </div>
      </div>
    );
  }

  const categories = [
    { value: 'all', label: 'All Pages' },
    { value: 'main', label: 'Main Pages' },
    { value: 'blog', label: 'Blog Posts' },
    { value: 'finance', label: 'Finance Tools' },
    { value: 'loan', label: 'Loan Tools' },
    { value: 'calculator', label: 'Calculators' },
    { value: 'schemes', label: 'Government Schemes' },
    { value: 'crypto', label: 'Crypto' },
    { value: 'news', label: 'News' },
    { value: 'gk', label: 'General Knowledge' },
    { value: 'excel', label: 'Excel Tools' },
    { value: 'ipo', label: 'IPO Reviews' },
    { value: 'festival', label: 'Festival Tools' },
    { value: 'gold', label: 'Gold Tools' },
    { value: 'corporate', label: 'Corporate Finance' },
    { value: 'gst', label: 'GST Tools' }
  ];

  return (
    <>
      <SEOHelmet
        title="Sitemap - All Pages & Resources | MoneyCal India"
        description="Browse the complete site index: calculators, loan tools, finance utilities, and learning guides organized for discovery."
        url="/sitemap"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Sitemap', url: '/sitemap' }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Sitemap - MoneyCal India",
          description: "Site-wide index of calculators, tools, blog posts, and resources.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: allPages.length
          }
        }}
      />
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back</span>
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Sitemap</h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-8">
            A complete overview of all pages and resources available on MoneyCal India
          </p>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search pages, tools, or calculators..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-[--primary-500] focus:border-transparent transition-all"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-[--primary-500] focus:border-transparent transition-all appearance-none bg-white min-w-[180px]"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 text-sm text-neutral-600">
                {searchTerm || selectedCategory !== 'all' ? (
                  <span>
                    Showing {filteredPages.length} of {allPages.length} pages
                    {searchTerm && ` matching "${searchTerm}"`}
                    {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
                  </span>
                ) : (
                  <span>All {allPages.length} pages available</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {(searchTerm || selectedCategory !== 'all') && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Search Results</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              {filteredPages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPages.map((page, index) => (
                    <Link
                      key={`${page.url}-${index}`}
                      to={page.url}
                      className="block p-4 border border-neutral-200 rounded-lg hover:border-[--primary-300] hover:bg-[--primary-50] transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-neutral-900 group-hover:text-[--primary-700] transition-colors mb-1">
                            {page.title}
                          </h3>
                          <p className="text-sm text-neutral-500 font-mono">
                            {page.url}
                          </p>
                          <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-neutral-100 text-neutral-600 rounded-full">
                            {categories.find(c => c.value === page.category)?.label}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">No results found</h3>
                  <p className="text-neutral-600">
                    Try adjusting your search terms or category filter
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Traditional Sitemap Layout (shown when no search/filter) */}
        {!searchTerm && selectedCategory === 'all' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Main Pages */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <IndianRupee className="h-5 w-5 mr-2 text-[--primary-600]" />
                  Main Pages
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" reloadDocument className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/about-us" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact-us" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms-and-conditions" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Terms and Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/disclaimer" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Disclaimer
                    </Link>
                  </li>
                  <li>
                    <Link to="/cookie-policy" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/editorial-policy" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Editorial Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/sitemap" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Sitemap
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Blog */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-[--primary-600]" />
                  Blog
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/blog" reloadDocument className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      All Blog Posts
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog/write" reloadDocument className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Write for Us
                    </Link>
                  </li>
                  {blogs.map((post: any) => (
                    <li key={post.id}>
                      <Link to={`/blog/${post.slug}`} className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Finance & Banking Tools */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <IndianRupee className="h-5 w-5 mr-2 text-[--primary-600]" />
                  Finance & Banking Tools
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/bank-ifsc-finder" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Bank IFSC/MICR Finder
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/upi-failure-troubleshooter" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      UPI Failure Troubleshooter
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/atm-locator" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      ATM Locator
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/bank-holiday-calendar" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Bank Holiday Calendar
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/interest-rates-comparison" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Best Interest Rates
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/banking-knowledge" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Banking Knowledge
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Loan Tools */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <IndianRupee className="h-5 w-5 mr-2 text-[--primary-600]" />
                  Loan Tools
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/loan-tools" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Loan Tools Hub
                    </Link>
                  </li>
                  <li>
                    <Link to="/loan-tools/emi-calculator" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      EMI Calculator (Reducing Balance)
                    </Link>
                  </li>
                  <li>
                    <Link to="/loan-tools/flat-rate-calculator" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Flat Rate Loan EMI Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/loan-tools/prepayment-calculator" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Extra Payment Impact Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/loan-tools/debt-strategies" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Debt Snowball vs Avalanche Simulator
                    </Link>
                  </li>
                  <li>
                    <Link to="/loan-tools/refinancing-calculator" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Loan Refinancing Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/loan-tools/loan-affordability" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Loan Affordability Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/loan-tools/debt-consolidation" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Debt Consolidation Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/loan-tools/amortization-schedule" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Amortization Schedule Viewer
                    </Link>
                  </li>
                </ul>
              </div>

              {/* News & Crypto */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <Newspaper className="h-5 w-5 mr-2 text-[--primary-600]" />
                  News & Crypto
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/crypto" className="font-semibold text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Crypto Knowledge Hub
                    </Link>
                  </li>
                  {crypto.map((article: any) => (
                    <li key={article.id}>
                      <Link to={`/crypto/${article.slug}`} className="text-neutral-700 hover:text-[--primary-600] transition-colors text-sm">
                        {article.title}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-2">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Latest News</span>
                  </li>
                  {contentRegistry.map(post => (
                    <li key={post.id}>
                      <Link to={`/news/${post.slug}`} className="text-neutral-700 hover:text-[--primary-600] transition-colors text-sm">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Government Schemes */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-[--primary-600]" />
                  Government Schemes
                </h2>
                <ul className="space-y-2">
                  {schemes.map((scheme: any) => (
                    <li key={scheme.id}>
                      <Link to={`/government-schemes/${scheme.slug}`} className="text-neutral-700 hover:text-[--primary-600] transition-colors text-sm">
                        {scheme.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* General Knowledge */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-[--primary-600]" />
                  General Knowledge (GK)
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/gk" className="text-neutral-700 font-semibold hover:text-[--primary-600] transition-colors">
                      GK Section Hub
                    </Link>
                  </li>
                  {gkCategories.map(category => (
                    <li key={category.slug} className="mb-4">
                      <Link to={`/gk/${category.slug}`} className="text-neutral-700 font-bold hover:text-[--primary-600] transition-colors text-sm block mb-2">
                        {category.name}
                      </Link>
                      <ul className="pl-4 space-y-1 border-l border-neutral-100">
                        {category.topics.map(topic => (
                          <li key={topic.slug}>
                            <Link to={`/gk/${category.slug}/${topic.slug}`} className="text-neutral-500 hover:text-[--primary-600] transition-colors text-xs">
                              {topic.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excel Tools */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <Table className="h-5 w-5 mr-2 text-[--primary-600]" />
                  Excel Tools
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/excel-tools" className="font-semibold text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Excel Tools & Templates
                    </Link>
                  </li>
                  {excelTools.map(tool => (
                    <li key={tool.id}>
                      <Link to={`/excel-tools/${tool.slug}`} className="text-neutral-700 hover:text-[--primary-600] transition-colors text-sm">
                        {tool.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Festival Tools */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-[--primary-600]" />
                  Festival Tools
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/festival-tools" className="font-semibold text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Festival Tools Hub
                    </Link>
                  </li>
                  {festivalList.map(fest => (
                    <li key={fest.slug}>
                      <Link to={`/festival-tools/${fest.slug}`} className="text-neutral-700 hover:text-[--primary-600] transition-colors text-sm">
                        {fest.name} Tools
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gold Tools */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <Coins className="h-5 w-5 mr-2 text-[--primary-600]" />
                  Gold Tools
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/gold-tools" className="font-semibold text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Gold Price Tools Hub
                    </Link>
                  </li>
                  {goldTools.map(tool => (
                    <li key={tool.slug}>
                      <Link to={`/gold-tools/${tool.slug}`} className="text-neutral-700 hover:text-[--primary-600] transition-colors text-sm">
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* GST & Invoicing */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <LayoutGrid className="h-5 w-5 mr-2 text-[--primary-600]" />
                  GST & Invoicing
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/gst-tools" className="font-semibold text-neutral-700 hover:text-[--primary-600] transition-colors">
                      GST Tools Hub
                    </Link>
                  </li>
                  <li>
                    <Link to="/invoicing-receivables" className="font-semibold text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Invoicing Hub
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/gst-calculator" className="text-neutral-700 hover:text-[--primary-600] transition-colors text-sm">
                      GST Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/hsn-sac-finder" className="text-neutral-700 hover:text-[--primary-600] transition-colors text-sm">
                      HSN/SAC Code Finder
                    </Link>
                  </li>
                  <li>
                    <Link to="/invoicing-tools/custom-generator" className="text-neutral-700 hover:text-[--primary-600] transition-colors text-sm">
                      Professional Invoice Generator
                    </Link>
                  </li>
                </ul>
              </div>

              {/* IPO Reviews */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-[--primary-600]" />
                  IPO Reviews & GMP
                </h2>
                <ul className="space-y-2">
                  {allIpoData.map(ipo => (
                    <li key={ipo.id}>
                      <Link to={`/ipo/${ipo.slug}`} className="text-neutral-700 hover:text-[--primary-600] transition-colors text-sm">
                        {ipo.name} IPO GMP & Review
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning Hubs */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-[--primary-600]" />
                  Learning Center
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/learn" className="font-semibold text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Learning Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/learn/home-loans" className="text-neutral-700 hover:text-[--primary-600] transition-colors text-sm">
                      Home Loan Academy
                    </Link>
                  </li>
                  <li>
                    <Link to="/learn/personal-loans" className="text-neutral-700 hover:text-[--primary-600] transition-colors text-sm">
                      Personal Loan Guide
                    </Link>
                  </li>
                  <li>
                    <Link to="/learn/investing-wealth" className="text-neutral-700 hover:text-[--primary-600] transition-colors text-sm">
                      Investing & Wealth Hub
                    </Link>
                  </li>
                  <li>
                    <Link to="/learn/taxation-compliance" className="text-neutral-700 hover:text-[--primary-600] transition-colors text-sm">
                      Taxation & Compliance
                    </Link>
                  </li>
                  <li>
                    <Link to="/learn/fintech-digital-payments" className="text-neutral-700 hover:text-[--primary-600] transition-colors text-sm">
                      Digital Payments & Fintech
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Platform Features */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <LayoutGrid className="h-5 w-5 mr-2 text-[--primary-600]" />
                  Tools & Resources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <Link to="/comprehensive-finance-hub" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                    Comprehensive Finance Hub
                  </Link>
                  <Link to="/market-analysis" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                    Market Analysis & Trends
                  </Link>
                  <Link to="/finance-tools/pdf-converters" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                    PDF & Document Tools
                  </Link>
                  <Link to="/finance-tools/salary-slip/pdf-to-excel" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                    Salary Slip Analyzers
                  </Link>
                  <Link to="/finance-tools/bank-statement/pdf-to-excel" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                    Bank Statement Converters
                  </Link>
                  <Link to="/astro-finance" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                    AstroFinance Portal
                  </Link>
                </div>
              </div>
            </div>

            {/* Calculator Categories */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Calculator Categories</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {calculatorCategories.map(category => (
                  <div key={category.id}>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                      {category.name}
                    </h3>
                    <ul className="space-y-2">
                      {category.calculators.map(calculator => (
                        <li key={calculator.id}>
                          <Link to={`/calculators/${calculator.id}`} className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                            {calculator.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Blog Categories */}
            <div>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Blog Categories</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {['Government Schemes', 'Investment', 'Tax Planning', 'Retirement Planning', 'Financial Inclusion', 'Banking'].map(category => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                      {category}
                    </h3>
                    <Link to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`} className="text-[--primary-600] hover:text-[--primary-800] transition-colors">
                      View all articles
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )
        }
      </div >
    </>
  );
};

export default Sitemap;
