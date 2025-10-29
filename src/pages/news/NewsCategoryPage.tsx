import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { contentRegistry } from '../../cms-content/contentRegistry';
import { newsCategories } from '../../data/newsCategories';
import { teamProfiles } from '../../data/teamProfiles';
import SEOHelmet from '../../components/SEOHelmet';

const NewsCategoryPage: React.FC = () => {
  const { categorySlug } = useParams();

  const category = newsCategories.find(c => c.slug === categorySlug);
  const articles = contentRegistry.filter(article => article.category === categorySlug);

  if (!category) {
    return <Navigate to="/news" replace />;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEOHelmet
        title={`${category.name} News | MoneyCal`}
        description={category.description}
        keywords={`${category.name}, financial news, market analysis`}
        url={`/news/${categorySlug}`}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All News
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            {category.description}
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900">
            {articles.length} Article{articles.length !== 1 ? 's' : ''}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const author = teamProfiles.find(p => p.id === article.authorId);

            return (
              <Link
                key={article.id}
                to={`/news/${article.category}/${article.slug}`}
                className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-2 border border-neutral-200 hover:border-blue-400 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=News';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-black text-xs shadow-lg flex-shrink-0">
                        {author?.name.split(' ').map(n => n[0]).join('') || 'MC'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-white text-xs">{author?.name || 'MoneyCal Team'}</div>
                        <div className="text-[10px] text-yellow-300 font-bold">{author?.role || 'Writer'}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-neutral-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors min-h-[4rem]">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-neutral-700 mb-5 font-bold bg-neutral-50 px-4 py-2 rounded-lg">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-neutral-900">{new Date(article.datePublished).toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-3 w-full justify-center px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-pink-700 transition-all font-black text-base shadow-xl group-hover:shadow-2xl uppercase tracking-wide">
                    <span>Read Full Article</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-neutral-600 mb-4">No articles found in this category yet.</p>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-semibold"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All News
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCategoryPage;

