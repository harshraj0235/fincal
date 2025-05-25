import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    const expanded: Record<string, boolean> = {};
    
    // Auto-expand the category that contains the current calculator
    calculatorCategories.forEach(category => {
      const hasActiveCalculator = category.calculators.some(
        calc => location.pathname === `/calculators/${calc.id}`
      );
      
      if (hasActiveCalculator) {
        expanded[category.id] = true;
      }
    });
    
    return expanded;
  });
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  const handleCalculatorClick = (calculatorId: string) => {
    navigate(`/calculators/${calculatorId}`);
  };
  
  return (
    <div className="h-full bg-white shadow-md py-6 px-4 overflow-y-auto">
      <h3 className="text-lg font-semibold text-neutral-800 mb-4 px-2">Calculators</h3>
      
      <div className="space-y-2">
        {calculatorCategories.map(category => (
          <div key={category.id} className="rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-left text-neutral-700 hover:bg-neutral-100 rounded-lg"
            >
              <span className="font-medium">{category.name}</span>
              {expandedCategories[category.id] ? (
                <ChevronDown className="h-4 w-4 text-neutral-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-neutral-500" />
              )}
            </button>
            
            {expandedCategories[category.id] && (
              <div className="ml-2 mt-1 space-y-1">
                {category.calculators.map(calculator => {
                  const isActive = location.pathname === `/calculators/${calculator.id}`;
                  
                  return (
                    <button
                      key={calculator.id}
                      onClick={() => handleCalculatorClick(calculator.id)}
                      className={`block w-full text-left px-3 py-2 text-sm rounded-lg ${
                        isActive 
                          ? 'bg-primary-50 text-primary-700 font-medium' 
                          : 'text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      {calculator.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};