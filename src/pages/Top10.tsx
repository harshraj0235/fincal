import React from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import { ArrowRight, TrendingUp, IndianRupee, BookOpen, Star } from 'lucide-react';

const Top10: React.FC = () => {
  const top10Lists = [
    {
      title: 'Top 10 Government Schemes 2025',
      description: 'Discover the most beneficial government schemes for financial growth and security.',
      link: '/government-schemes',
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      title: 'Top 10 Financial Calculators',
      description: 'Essential calculators every Indian should use for financial planning.',
      link: '/calculators',
      icon: <IndianRupee className="h-6 w-6" />
    },
    {
      title: 'Top 10 Investment Options',
      description: 'Best investment opportunities for different risk profiles and goals.',
      link: '/blog/investment-guides',
      icon: <Star className="h-6 w-6" />
    },
    {
      title: 'Top 10 Financial Education Resources',
      description: 'Comprehensive guides and tools for financial literacy.',
      link: '/financial-education',
      icon: <BookOpen className="h-6 w-6" />
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Top 10 Lists - MoneyCal.in | Best Financial Resources & Tools"
        description="Discover our curated top 10 lists of government schemes, calculators, investment options, and financial education resources for better money management in India."
        keywords={['top 10 financial tools', 'best government schemes', 'top calculators', 'financial resources India', 'money management']}
        url="/top-10"
        image="/images/top-10-financial-resources.jpg"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Top 10 Lists
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Curated collections of the best financial resources, tools, and opportunities for Indians
            </p>
          </div>

          {/* Top 10 Lists Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {top10Lists.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      <span>Explore Now</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">More Top 10 Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IndianRupee className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Financial Calculators</h3>
                <p className="text-gray-600 text-sm">Comprehensive suite of calculators for all your financial needs</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Investment Tools</h3>
                <p className="text-gray-600 text-sm">Advanced tools for investment planning and analysis</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Educational Content</h3>
                <p className="text-gray-600 text-sm">Learn with our comprehensive financial education resources</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Top10;
