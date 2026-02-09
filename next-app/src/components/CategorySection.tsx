import React from 'react';
import { Link } from 'react-router-dom';
import { calculatorCategories } from '../data/calculatorData';
import { ChevronRight } from 'lucide-react';

export const CategorySection: React.FC = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-8 text-center">
          Browse by Category
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculatorCategories.map(category => (
            <div key={category.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <Link to={`/#${category.id}`} className="block">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3 hover:text-primary-600 transition-colors">{category.name}</h3>
              </Link>
              <p className="text-neutral-600 mb-4 text-sm">{category.description}</p>
              
              <div className="space-y-2 mb-4">
                {category.calculators.slice(0, 3).map(calculator => (
                  <Link 
                    key={calculator.id}
                    to={`/calculators/${calculator.id}`}
                    className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 text-primary-500" />
                    <span className="text-sm">{calculator.name}</span>
                  </Link>
                ))}
              </div>
              
              {category.calculators.length > 3 && (
                <Link 
                  to={`/#${category.id}`}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  View all {category.calculators.length} calculators
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};