import React from 'react';
import { CheckCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const DocumentsRequired: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Documents Required | MoneyCal Learn"
        description="Learn about documents required with comprehensive guide and examples."
        keywords="documents, required"
        canonicalUrl="https://moneycal.in/learn/credit-cards/documents-required"
      />
      
      <LearnLayout
        category="credit-cards"
        currentLesson="documents-required"
        breadcrumb={['Learn', 'Credit Cards', 'Documents Required']}
      >
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Complete Lesson Coming Soon!</h3>
          <p className="text-gray-700">
            This comprehensive lesson about documents required is being finalized. 
            Check back soon for detailed content, examples, and actionable insights!
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents Required</h2>
          <div className="bg-white border-2 border-blue-300 rounded-xl p-6">
            <p className="text-lg text-gray-800">
              Comprehensive content about documents required will be available here soon. This lesson will cover:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Complete understanding of documents required</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Practical examples and real scenarios</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Expert tips and strategies</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Common mistakes to avoid</span>
              </li>
            </ul>
          </div>
        </section>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Continue Learning!</h2>
          <p className="text-blue-100 mb-6">
            Explore more lessons in this category to build your knowledge!
          </p>
          <a
            href="/learn/credit-cards"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            View All Lessons â†’
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default DocumentsRequired;
