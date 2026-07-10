import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, IndianRupee, Menu, X, ChevronRight } from 'lucide-react';
import { loanCategories } from '../../data/learn/loansLessons';

interface LearnLayoutProps {
  children: ReactNode;
  category: string;
  currentLesson?: string;
  breadcrumb: string[];
}

const LearnLayout: React.FC<LearnLayoutProps> = ({ 
  children, 
  category, 
  currentLesson,
  breadcrumb 
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const categoryData = loanCategories.find(cat => cat.id === category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <Link to="/" className="text-2xl font-bold text-blue-600">
                MoneyCal <span className="text-green-600">Learn</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <Link to="/learn" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <BookOpen className="w-5 h-5" />
                Learn
              </Link>
              <Link to="/calculators" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <IndianRupee className="w-5 h-5" />
                Tools
              </Link>
              <Link to="/blog" reloadDocument className="text-gray-700 hover:text-blue-600">
                Blog
              </Link>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">
              <Home className="w-4 h-4" />
            </Link>
            {breadcrumb.map((crumb, index) => (
              <React.Fragment key={index}>
                <ChevronRight className="w-4 h-4" />
                <span className={index === breadcrumb.length - 1 ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Left Sidebar */}
        <aside className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] 
          w-72 bg-white border-r overflow-y-auto z-30
          transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              {categoryData?.icon} {categoryData?.name}
            </h2>
            <p className="text-sm text-gray-600 mb-6">{categoryData?.description}</p>

            {/* Category Navigation */}
            <nav className="space-y-1">
              {loanCategories.map((cat) => (
                <div key={cat.id} className="mb-4">
                  <Link
                    to={`/learn/${cat.id}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold ${
                      category === cat.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                    <span className="ml-auto text-xs bg-gray-200 px-2 py-0.5 rounded">
                      {cat.lessons.length}
                    </span>
                  </Link>

                  {/* Show lessons if current category and has lessons */}
                  {category === cat.id && cat.id === 'loans' && (
                    <div className="ml-4 mt-2 space-y-1">
                      <Link to="/learn/loans/what-is-loan" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'what-is-loan' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>1. What Is a Loan?</Link>
                      <Link to="/learn/loans/types-of-loans" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'types-of-loans' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>2. Types of Loans</Link>
                      <Link to="/learn/loans/secured-vs-unsecured" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'secured-vs-unsecured' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>3. Secured vs Unsecured</Link>
                      <Link to="/learn/loans/what-is-emi" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'what-is-emi' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>4. What Is EMI?</Link>
                      <Link to="/learn/loans/simple-vs-compound-interest" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'simple-vs-compound-interest' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>5. Simple vs Compound</Link>
                      <Link to="/learn/loans/how-banks-evaluate" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'how-banks-evaluate' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>6. How Banks Evaluate</Link>
                      <Link to="/learn/loans/loan-tenure-explained" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'loan-tenure-explained' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>7. Loan Tenure</Link>
                      <Link to="/learn/loans/fixed-vs-floating-rates" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'fixed-vs-floating-rates' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>8. Fixed vs Floating</Link>
                      <Link to="/learn/loans/understanding-collateral" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'understanding-collateral' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>9. Understanding Collateral</Link>
                      <Link to="/learn/loans/check-eligibility" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'check-eligibility' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>10. Check Eligibility</Link>
                      <Link to="/learn/loans/loan-agreement-guide" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'loan-agreement-guide' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>11. Loan Agreement</Link>
                      <Link to="/learn/loans/co-applicant-benefits" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'co-applicant-benefits' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>12. Co-Applicant Benefits</Link>
                      <Link to="/learn/loans/cibil-score-impact" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'cibil-score-impact' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>13. CIBIL Score Impact</Link>
                      <Link to="/learn/loans/calculate-true-cost" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'calculate-true-cost' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>14. Calculate True Cost</Link>
                      <Link to="/learn/loans/loan-default-consequences" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'loan-default-consequences' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>15. Loan Default</Link>
                      <Link to="/learn/loans/repayment-options" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'repayment-options' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>16. Repayment Options</Link>
                      <Link to="/learn/loans/loan-application-process" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'loan-application-process' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>17. Application Process</Link>
                      <Link to="/learn/loans/compare-loan-offers" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'compare-loan-offers' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>18. Compare Loan Offers</Link>
                      <Link to="/learn/loans/documents-required" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'documents-required' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>19. Documents Required</Link>
                      <Link to="/learn/loans/common-loan-terms" className={`block px-3 py-2 text-sm rounded ${currentLesson === 'common-loan-terms' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>20. Common Loan Terms</Link>
                    </div>
                  )}
                </div>
              ))}

              {/* Quiz & Certificate Links */}
              <div className="mt-6 pt-6 border-t">
                <Link
                  to={`/learn/${category}/quiz`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-purple-700 hover:bg-purple-50"
                >
                  🎯 Take Quiz
                </Link>
                <Link
                  to={`/learn/${category}/certificate`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-green-700 hover:bg-green-50"
                >
                  🎓 Get Certificate
                </Link>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 min-h-screen">
          <div className="max-w-4xl">
            {children}
          </div>
        </main>

        {/* Right Sidebar (Desktop only) */}
        <aside className="hidden xl:block w-64 p-6">
          <div className="sticky top-20">
            <h3 className="font-bold text-gray-800 mb-4">On This Page</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <a href="#introduction" className="block hover:text-blue-600">Introduction</a>
              <a href="#formula" className="block hover:text-blue-600">Formula</a>
              <a href="#example" className="block hover:text-blue-600">Example</a>
              <a href="#calculator" className="block hover:text-blue-600">Calculator</a>
              <a href="#faqs" className="block hover:text-blue-600">FAQs</a>
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <h4 className="font-bold text-green-800 mb-2">🎯 Quick Tools</h4>
              <Link to="/calculators/emi-calculator" className="block text-sm text-green-700 hover:underline">
                EMI Calculator →
              </Link>
              <Link to="/calculators/loan-calculator" className="block text-sm text-green-700 hover:underline">
                Loan Calculator →
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default LearnLayout;

