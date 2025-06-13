import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { TrendingUp, Search, Menu, X } from 'lucide-react';

/**
 * Header Component
 * Renders the application's header, including the logo, desktop navigation,
 * search button, and mobile menu toggle.
 *
 * @param {boolean} mobileMenuOpen - State indicating if the mobile menu is open.
 * @param {function} setMobileMenuOpen - Function to toggle the mobile menu state.
 */
const Header = ({ mobileMenuOpen, setMobileMenuOpen }) => (
  <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo and Site Title */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              FinanceGurus
            </h1>
            <p className="text-xs text-slate-600 -mt-1">India's Top Finance Influencers</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
            Home
          </Link>
          <Link to="/top-10" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
            Top 10
          </Link>
          <Link to="/categories" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
            Categories
          </Link>
          <Link to="/about" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
            About
          </Link>
        </nav>

        {/* Search and Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <button className="hidden sm:flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors rounded-md">
            <Search className="h-4 w-4 text-slate-600" />
            <span className="text-sm text-slate-600">Search</span>
          </button>

          <button
            className="md:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">{mobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-slate-200 py-4">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-slate-700 hover:text-blue-600 font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/top-10" className="text-slate-700 hover:text-blue-600 font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Top 10
            </Link>
            <Link to="/categories" className="text-slate-700 hover:text-blue-600 font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Categories
            </Link>
            <Link to="/about" className="text-slate-700 hover:text-blue-600 font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
          </nav>
        </div>
      )}
    </div>
  </header>
);

/**
 * Footer Component
 * Displays copyright information, quick links, and category links.
 */
const Footer = () => (
  <footer className="bg-slate-900 text-white mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">FinanceGurus</h3>
          </div>
          <p className="text-slate-400 mb-4 leading-relaxed">
            Your comprehensive directory of India's top 100 finance influencers.
            Discover expert insights, investment strategies, and financial wisdom
            from the most trusted voices in Indian finance.
          </p>
          <p className="text-sm text-slate-500">
            © 2024 FinanceGurus Directory. Built for financial education and literacy.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/top-10" className="hover:text-white transition-colors">Top 10</Link></li>
            <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
          </ul>
        </div>

        {/* Categories Section */}
        <div>
          <h4 className="font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/category/fintech" className="hover:text-white transition-colors">Fintech Leaders</Link></li>
            <li><Link to="/category/investors" className="hover:text-white transition-colors">Investment Experts</Link></li>
            <li><Link to="/category/educators" className="hover:text-white transition-colors">Finance Educators</Link></li>
            <li><Link to="/category/entrepreneurs" className="hover:text-white transition-colors">Entrepreneurs</Link></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

/**
 * Sidebar Component (Placeholder)
 * This component will display navigation links specific to non-homepage routes.
 * Its content can be expanded as needed.
 */
const Sidebar = () => {
  return (
    <div className="p-6 bg-white border-r border-slate-200 h-full">
      <nav className="space-y-4">
        <h3 className="font-semibold text-lg text-slate-800 mb-4">Dashboard</h3>
        <Link to="/dashboard/overview" className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 transition-colors rounded-md">
          <span>Overview</span>
        </Link>
        <Link to="/dashboard/profile" className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 transition-colors rounded-md">
          <span>Profile</span>
        </Link>
        <Link to="/dashboard/settings" className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 transition-colors rounded-md">
          <span>Settings</span>
        </Link>
        {/* Add more sidebar links as needed */}
      </nav>
    </div>
  );
};

/**
 * Layout Component
 * Provides a consistent structure for the application, including a header,
 * conditional sidebar, main content area, and footer.
 * It also manages mobile menu state and handles route changes.
 *
 * @param {React.ReactNode} children - The content to be rendered within the main layout.
 */
interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close mobile menu when the route changes
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Render the Header component, passing mobile menu state and setter */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main content area, including sidebar and children */}
      <main className="flex-grow flex">
        {/* Conditional Sidebar rendering */}
        {!isHomePage && (
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar />
          </div>
        )}
        {/* Children content area with Suspense for lazy loading */}
        <div className={`flex-grow ${isHomePage ? '' : 'p-6'}`}>
          <Suspense fallback={<div className="flex justify-center items-center h-64 text-slate-600">Loading...</div>}>
            {children}
          </Suspense>
        </div>
      </main>

      {/* Render the Footer component */}
      <Footer />
    </div>
  );
};

// Dummy Components for demonstration purposes
const HomePage = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-800 mb-4">Welcome to FinanceGurus!</h2>
    <p className="text-slate-700">Explore India's top finance influencers.</p>
  </div>
);
const Top10Page = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-800 mb-4">Top 10 Influencers</h2>
    <p className="text-slate-700">Discover the best in the finance world.</p>
  </div>
);
const CategoriesPage = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-800 mb-4">Categories</h2>
    <p className="text-slate-700">Browse influencers by category.</p>
  </div>
);
const AboutPage = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-800 mb-4">About Us</h2>
    <p className="text-slate-700">Learn more about FinanceGurus.</p>
  </div>
);
const DashboardOverview = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-800 mb-4">Dashboard Overview</h2>
    <p className="text-slate-700">Your personalized financial insights.</p>
  </div>
);
const DashboardProfile = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-800 mb-4">Profile</h2>
    <p className="text-slate-700">Manage your profile settings.</p>
  </div>
);
const DashboardSettings = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-800 mb-4">Settings</h2>
    <p className="text-slate-700">Configure your application settings.</p>
  </div>
);
const CategoryFintech = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-800 mb-4">Fintech Leaders</h2>
    <p className="text-slate-700">Influencers in the financial technology space.</p>
  </div>
);
const CategoryInvestors = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-800 mb-4">Investment Experts</h2>
    <p className="text-slate-700">Experts in investment strategies.</p>
  </div>
);
const CategoryEducators = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-800 mb-4">Finance Educators</h2>
    <p className="text-slate-700">Educators providing financial literacy.</p>
  </div>
);
const CategoryEntrepreneurs = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-800 mb-4">Entrepreneurs</h2>
    <p className="text-slate-700">Influencers who are also successful entrepreneurs.</p>
  </div>
);


/**
 * Main application component.
 * Sets up the React Router and renders the Layout component with routes.
 */
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/top-10" element={<Top10Page />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard/overview" element={<DashboardOverview />} />
          <Route path="/dashboard/profile" element={<DashboardProfile />} />
          <Route path="/dashboard/settings" element={<DashboardSettings />} />
          <Route path="/category/fintech" element={<CategoryFintech />} />
          <Route path="/category/investors" element={<CategoryInvestors />} />
          <Route path="/category/educators" element={<CategoryEducators />} />
          <Route path="/category/entrepreneurs" element={<CategoryEntrepreneurs />} />
          {/* Add more routes here as needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
