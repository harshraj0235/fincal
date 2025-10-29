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
              <article
                key={article.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=News';
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-neutral-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(article.datePublished).toLocaleDateString('en-IN')}</span>
                    </div>
                    {author && (
                      <>
                        <span>•</span>
                        <span>{author.name}</span>
                      </>
                    )}
                  </div>
                  <Link
                    to={`/news/${article.category}/${article.slug}`}
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-semibold group"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
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

