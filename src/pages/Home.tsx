import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import { CategorySection } from '../components/CategorySection';

export const Home: React.FC = () => {
  const location = useLocation();
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      const categoryId = location.hash.substring(1);
      const element = categoryRefs.current[categoryId];
      
      if (element) {
        // Scroll to the category with a small delay to ensure rendering is complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-white text-neutral-900 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              India's Most Comprehensive Financial Calculator Suite
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-neutral-600">
              50+ calculators tailored for Indian financial needs - from EMI and taxes to investments and retirement planning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculators/emi-calculator" className="btn bg-[--primary-600] text-white hover:bg-[--primary-700]">
                EMI Calculator
              </Link>
              <Link to="/calculators/sip-calculator" className="btn bg-white text-[--primary-800] border border-[--primary-200] hover:bg-neutral-50">
                SIP Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Calculators */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">Most Popular Calculators</h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Our most used financial tools that help thousands of Indians make better financial decisions every day
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                id: 'emi-calculator',
                name: 'EMI Calculator',
                description: 'Calculate your monthly loan payments',
                icon: <Calculator className="h-6 w-6 text-[--primary-600]" />
              },
              {
                id: 'sip-calculator',
                name: 'SIP Calculator',
                description: 'Plan your investment returns over time',
                icon: <TrendingUp className="h-6 w-6 text-[--primary-600]" />
              },
              {
                id: 'income-tax-calculator',
                name: 'Income Tax Calculator',
                description: 'Estimate your income tax liability',
                icon: <DollarSign className="h-6 w-6 text-[--primary-600]" />
              },
              {
                id: 'ppf-calculator',
                name: 'PPF Calculator',
                description: 'Project your PPF account growth',
                icon: <PieChart className="h-6 w-6 text-[--primary-600]" />
              }
            ].map(calculator => (
              <Link 
                key={calculator.id}
                to={`/calculators/${calculator.id}`} 
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="rounded-full bg-[--primary-50] p-4 mb-4">
                  {calculator.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{calculator.name}</h3>
                <p className="text-neutral-600">{calculator.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Category Section */}
      <CategorySection />
      
      {/* Categories */}
      {calculatorCategories.map((category, index) => (
        <section 
          key={category.id}
          id={category.id}
          ref={el => categoryRefs.current[category.id] = el}
          className="py-12 sm:py-16 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">{category.name}</h2>
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {category.calculators.map(calculator => (
                <Link 
                  key={calculator.id}
                  to={`/calculators/${calculator.id}`} 
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{calculator.name}</h3>
                  <p className="text-neutral-600 mb-4">{calculator.description}</p>
                  <div className="text-[--primary-600] font-medium flex items-center">
                    Use Calculator
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
      
      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-neutral-900">Ready to make informed financial decisions?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-neutral-600">
            Our calculators help you plan loans, investments, taxes, and more with precision and ease.
          </p>
          <Link 
            to="/calculators/financial-goal-calculator" 
            className="btn bg-[--primary-600] text-white hover:bg-[--primary-700] text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3"
          >
            Plan Your Financial Goals
          </Link>
        </div>
      </section>
    </div>
  );
};