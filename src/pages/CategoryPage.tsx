import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';

// Define types to match your data structure
type CalculatorType = {
  id: string;
  name: string;
  description: string;
};

type CategoryType = {
  id: string;
  name: string;
  description: string;
  calculators: CalculatorType[];
};

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const category: CategoryType | undefined = calculatorCategories.find(
    (cat: CategoryType) => cat.id === categoryId
  );

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back</span>
          </button>
        </div>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Category Not Found</h2>
          <p className="text-lg text-neutral-600 mb-8">
            The calculator category you're looking for doesn't exist or may have been moved.
          </p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
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

      <div className="mb-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">{category.name}</h1>
        <p className="text-lg text-neutral-600">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.calculators && category.calculators.length > 0 ? (
          category.calculators.map((calculator) => (
            <Link
              key={calculator.id}
              to={`/calculators/${calculator.id}`}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start mb-4">
                <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors">
                  <Calculator className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {calculator.name}
                  </h3>
                </div>
              </div>
              <p className="text-neutral-600 mb-4 text-sm">{calculator.description}</p>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-neutral-500">No calculators found in this category.</div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
