import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { Calculator, Menu, X, Home, BookOpen, Phone, Info, FileText, Shield } from 'lucide-react';

// Placeholder for calculatorData - You should replace this with your actual data
const calculatorCategories = [
  {
    id: 'loans',
    name: 'Loans',
    calculators: [
      { id: 'personal-loan', name: 'Personal Loan EMI Calculator' },
      { id: 'home-loan', name: 'Home Loan EMI Calculator' },
    ],
  },
  {
    id: 'investments',
    name: 'Investments',
    calculators: [
      { id: 'sip', name: 'SIP Calculator' },
      { id: 'fd', name: 'Fixed Deposit Calculator' },
    ],
  },
];

// Placeholder for ScrollToTop component
// In a real application, this would scroll the window to the top on route changes.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Placeholder components for various pages
const HomePage = () => (
  <div className="p-8 text-center bg-gray-100 rounded-lg shadow-md mx-auto my-12 max-w-2xl">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to FinCalc!</h1>
    <p className="text-lg text-gray-600">Your trusted companion for financial calculations and planning.</p>
    <p className="mt-4 text-gray-600">Explore our calculators and blog posts.</p>
  </div>
);

const CalculatorPage = ({ calculatorId }) => (
  <div className="p-8 text-center bg-white rounded-lg shadow-md mx-auto my-12 max-w-2xl">
    <h2 className="text-3xl font-semibold text-primary-700 mb-4">Calculator: {calculatorId}</h2>
    <p className="text-gray-600">This is a placeholder for the {calculatorId} calculator.</p>
    <p className="mt-4 text-sm text-gray-500">Implement your calculator logic here.</p>
  </div>
);

const Blog = () => (
  <div className="p-8 text-center bg-white rounded-lg shadow-md mx-auto my-12 max-w-2xl">
    <h2 className="text-3xl font-semibold text-primary-700 mb-4">Our Blog</h2>
    <p className="text-gray-600">Welcome to our blog! Find articles on finance, banking, and investments.</p>
  </div>
);

const BlogPost = ({ slug }) => (
  <div className="p-8 bg-white rounded-lg shadow-md mx-auto my-12 max-w-2xl">
    <h2 className="text-3xl font-semibold text-primary-700 mb-4">Blog Post: {slug}</h2>
    <p className="text-gray-700">This is a placeholder for the blog post content.</p>
  </div>
);

const WriteBlog = () => (
  <div className="p-8 text-center bg-white rounded-lg shadow-md mx-auto my-12 max-w-2xl">
    <h2 className="text-3xl font-semibold text-primary-700 mb-4">Write a Blog Post</h2>
    <p className="text-gray-600">This page would contain a form for writing new blog posts.</p>
  </div>
);

const PrivacyPolicy = () => (
  <div className="p-8 bg-white rounded-lg shadow-md mx-auto my-12 max-w-2xl">
    <h2 className="text-3xl font-semibold text-primary-700 mb-4">Privacy Policy</h2>
    <p className="text-gray-700">This is our privacy policy. Your data is safe with us.</p>
    <p className="mt-4 text-gray-700">Detailed legal text would go here.</p>
  </div>
);

const TermsAndConditions = () => (
  <div className="p-8 bg-white rounded-lg shadow-md mx-auto my-12 max-w-2xl">
    <h2 className="text-3xl font-semibold text-primary-700 mb-4">Terms and Conditions</h2>
    <p className="text-gray-700">These are the terms and conditions for using our service.</p>
    <p className="mt-4 text-gray-700">Detailed legal text would go here.</p>
  </div>
);

const AboutUs = () => (
  <div className="p-8 text-center bg-white rounded-lg shadow-md mx-auto my-12 max-w-2xl">
    <h2 className="text-3xl font-semibold text-primary-700 mb-4">About Us</h2>
    <p className="text-gray-600">We are FinCalc, dedicated to providing easy-to-use financial tools.</p>
  </div>
);

const ContactUs = () => (
  <div className="p-8 text-center bg-white rounded-lg shadow-md mx-auto my-12 max-w-2xl">
    <h2 className="text-3xl font-semibold text-primary-700 mb-4">Contact Us</h2>
    <p className="text-gray-600">Feel free to reach out to us with any questions or feedback.</p>
    <p className="mt-4 text-gray-600">Email: info@fincac.com</p>
  </div>
);

const Sitemap = () => (
  <div className="p-8 bg-white rounded-lg shadow-md mx-auto my-12 max-w-2xl">
    <h2 className="text-3xl font-semibold text-primary-700 mb-4">Sitemap</h2>
    <p className="text-gray-700">This page lists all the important pages on our website.</p>
  </div>
);

const SitemapXml = () => (
  <div className="p-8 bg-white rounded-lg shadow-md mx-auto my-12 max-w-2xl">
    <h2 className="text-3xl font-semibold text-primary-700 mb-4">Sitemap XML</h2>
    <p className="text-gray-700">This is the XML sitemap for search engines.</p>
  </div>
);

const BankingKnowledge = () => (
  <div className="p-8 text-center bg-white rounded-lg shadow-md mx-auto my-12 max-w-2xl">
    <h2 className="text-3xl font-semibold text-primary-700 mb-4">Banking Knowledge</h2>
    <p className="text-gray-600">Learn more about banking products and concepts.</p>
  </div>
);

const CategoryPage = ({ categoryId }) => (
  <div className="p-8 text-center bg-white rounded-lg shadow-md mx-auto my-12 max-w-2xl">
    <h2 className="text-3xl font-semibold text-primary-700 mb-4">Category: {categoryId}</h2>
    <p className="text-gray-600">This page would display calculators or articles related to {categoryId}.</p>
  </div>
);

const CreditCardFinder = () => (
  <div className="p-8 text-center bg-white rounded-lg shadow-md mx-auto my-12 max-w-2xl">
    <h2 className="text-3xl font-semibold text-primary-700 mb-4">Credit Card Finder</h2>
    <p className="text-gray-600">Find the best credit card for your needs.</p>
  </div>
);

/**
 * Layout Component
 * Provides the overall structure for the application, including header, navigation, and footer.
 * It uses Tailwind CSS for styling and Lucide React for icons.
 */
const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation links for header and footer
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Calculators', href: '/#categories', icon: Calculator }, // Note: This links to an anchor.
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'About', href: '/about-us', icon: Info },
    { name: 'Contact', href: '/contact-us', icon: Phone },
  ];

  // Footer specific links
  const footerLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-and-conditions' },
    { name: 'Sitemap', href: '/sitemap' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 font-inter"> {/* Added font-inter class */}
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50 rounded-b-lg"> {/* Added rounded corners */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Site Title */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-md">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900">FinCalc</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2"> {/* Reduced spacing for more items */}
              {navigation.map((item) => {
                const Icon = item.icon;
                // Determine active state for navigation links
                const isActive = location.pathname === item.href ||
                  (item.href === '/blog' && location.pathname.startsWith('/blog'));

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors transform hover:scale-105 active:scale-95 ${ // Added transform and scale effects
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-neutral-700 hover:text-primary-600 hover:bg-neutral-100 transition-colors transform hover:scale-110 active:scale-90" // Added transform and scale effects
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white pb-4 rounded-b-lg"> {/* Added rounded corners and padding */}
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href ||
                  (item.href === '/blog' && location.pathname.startsWith('/blog'));

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)} // Close menu on link click
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-neutral-100 ${
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-neutral-700 hover:text-primary-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer Section */}
      <footer className="bg-neutral-900 text-white rounded-t-lg shadow-inner"> {/* Added rounded corners and shadow */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Information in Footer */}
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-md">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">FinCalc</span>
              </Link>
              <p className="text-neutral-400 mb-4 max-w-md text-sm leading-relaxed">
                Your trusted companion for financial calculations and planning. Make informed decisions with our comprehensive suite of calculators designed for Indian users.
              </p>
            </div>

            {/* Quick Links in Footer */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-primary-700 pb-2">Quick Links</h3> {/* Added border */}
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-neutral-400 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links in Footer */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-primary-700 pb-2">Legal</h3> {/* Added border */}
              <ul className="space-y-2">
                {footerLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-neutral-400 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright Information */}
          <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
            <p className="text-neutral-400 text-sm">
              © 2024 FinCalc. All rights reserved. Made with ❤️ for Indian users.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

/**
 * Main App Component
 * This component defines the application's routing using React Router DOM.
 * It wraps all routes within the Layout component for consistent UI.
 */
function App() {
  return (
    // The BrowserRouter component is crucial for enabling routing throughout the application.
    // React components must return a single parent element or a fragment.
    // The script tag for Tailwind CSS should not be rendered as a React child.
    // It's assumed that the hosting environment (Canvas) or your main HTML file
    // will handle the inclusion of necessary global scripts like Tailwind CDN.
    <BrowserRouter>
      <Layout>
        <ScrollToTop /> {/* Ensures page scrolls to top on route change */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Dynamically generated routes for calculators */}
          {calculatorCategories.flatMap(category =>
            category.calculators.map(calculator => (
              <Route
                key={calculator.id}
                path={`/calculators/${calculator.id}`}
                element={<CalculatorPage calculatorId={calculator.id} />}
              />
            ))
          )}
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog/write" element={<WriteBlog />} />
          <Route path="/blog/category/banking" element={<BankingKnowledge />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/sitemap.xml" element={<SitemapXml />} />
          <Route path="/credit-card-finder" element={<CreditCardFinder />} />

          {/* Catch-all route for unmatched paths, redirects to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
