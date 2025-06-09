import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { CategorySection } from '../components/CategorySection';
import { calculatorCategories } from '../data/calculatorData';

export const Home: React.FC = () => {
  // Structured data for homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FinCalc India",
    "url": "https://moneycal.in/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://moneycal.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "description": "Comprehensive financial calculators for Indian users - EMI, SIP, PPF, Income Tax, Loan Comparison and more."
  };

  return (
    <>
      <SEOHead 
        title="Indian Financial Calculators | EMI, SIP, PPF, Income Tax & More | FinCalc India"
        description="Comprehensive financial calculators for Indian users - EMI, SIP, PPF, Income Tax, Loan Comparison and more. Make informed financial decisions with accurate calculations tailored for Indian financial products."
        canonicalUrl="/"
        keywords="financial calculator, EMI calculator, SIP calculator, PPF calculator, income tax calculator, loan calculator, India, financial planning, investment calculator"
        structuredData={structuredData}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Make Smarter Financial Decisions</h1>
              <p className="text-xl mb-8">Accurate calculators tailored for Indian financial products and tax rules</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/calculators/income-tax-calculator" className="btn bg-white text-primary-700 hover:bg-neutral-100">
                  Income Tax Calculator
                </Link>
                <Link to="/calculators/emi-calculator" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10">
                  EMI Calculator
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Financial planning with calculators and charts"
                className="rounded-lg shadow-lg"
                width="600"
                height="400"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Calculators */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-8 text-center">
            Popular Calculators
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/calculators/emi-calculator" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">EMI Calculator</h3>
              <p className="text-neutral-600 mb-4">Calculate your monthly loan installments and total interest payable</p>
              <span className="text-primary-600 font-medium">Calculate Now →</span>
            </Link>
            
            <Link to="/calculators/sip-calculator" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">SIP Calculator</h3>
              <p className="text-neutral-600 mb-4">Plan your investments and see how your money grows over time</p>
              <span className="text-primary-600 font-medium">Calculate Now →</span>
            </Link>
            
            <Link to="/calculators/income-tax-calculator" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Income Tax Calculator</h3>
              <p className="text-neutral-600 mb-4">Estimate your income tax liability under both old and new tax regimes</p>
              <span className="text-primary-600 font-medium">Calculate Now →</span>
            </Link>
            
            <Link to="/calculators/ppf-calculator" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">PPF Calculator</h3>
              <p className="text-neutral-600 mb-4">Calculate returns on your Public Provident Fund investments</p>
              <span className="text-primary-600 font-medium">Calculate Now →</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <CategorySection />
      
      {/* All Categories with Calculators */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-12 text-center">
            All Financial Calculators
          </h2>
          
          <div className="space-y-16">
            {calculatorCategories.map(category => (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
                  {category.name}
                </h3>
                <p className="text-neutral-600 mb-6">{category.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.calculators.map(calculator => (
                    <Link 
                      key={calculator.id} 
                      to={`/calculators/${calculator.id}`}
                      className="p-4 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all"
                    >
                      <h4 className="font-medium text-neutral-900 hover:text-primary-600 transition-colors">
                        {calculator.name}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Government Schemes Section */}
      <section className="py-16 bg-success-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-success-900 mb-8 text-center">
            Government Scheme Calculators
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link to="/calculators/sukanya-samriddhi-calculator" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Sukanya Samriddhi</h3>
              <p className="text-neutral-600 mb-4">Calculate returns on investments for your girl child's future</p>
              <span className="text-success-600 font-medium">Calculate Now →</span>
            </Link>
            
            <Link to="/calculators/ppf-calculator" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">PPF Calculator</h3>
              <p className="text-neutral-600 mb-4">Plan your Public Provident Fund investments and returns</p>
              <span className="text-success-600 font-medium">Calculate Now →</span>
            </Link>
            
            <Link to="/calculators/nps-calculator" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">NPS Calculator</h3>
              <p className="text-neutral-600 mb-4">Estimate your National Pension System returns and benefits</p>
              <span className="text-success-600 font-medium">Calculate Now →</span>
            </Link>
            
            <Link to="/calculators/post-office-schemes-calculator" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Post Office Schemes</h3>
              <p className="text-neutral-600 mb-4">Calculate returns on various post office savings schemes</p>
              <span className="text-success-600 font-medium">Calculate Now →</span>
            </Link>
          </div>
          
          <div className="text-center">
            <Link to="/blog/category/government-schemes" className="btn bg-success-600 text-white hover:bg-success-700">
              Explore Government Scheme Guides
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-4">
            Need Financial Guidance?
          </h2>
          <p className="text-lg text-primary-700 mb-8 max-w-3xl mx-auto">
            Explore our Financial Navigator for comprehensive guides on banking, investments, loans, and more.
          </p>
          <a 
            href="/financial-navigator.html" 
            target="_blank"
            className="btn bg-primary-600 text-white hover:bg-primary-700"
          >
            Explore Financial Navigator
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;