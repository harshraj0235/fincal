import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Calculator, Menu, X, ChevronRight } from 'lucide-react';
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
                <Calculator className="w-5 h-5" />
                Tools
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-blue-600">
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

                  {/* Show lessons if current category */}
                  {category === cat.id && cat.lessons.length > 0 && (
                    <div className="ml-4 mt-2 space-y-1">
                      {cat.lessons.map((lesson) => (
                        <Link
                          key={lesson.id}
                          to={`/learn/${cat.id}/${lesson.slug}`}
                          className={`block px-3 py-2 text-sm rounded ${
                            currentLesson === lesson.slug
                              ? 'bg-green-100 text-green-700 font-semibold'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {lesson.order}. {lesson.title.split(':')[0].substring(0, 40)}...
                        </Link>
                      ))}
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

