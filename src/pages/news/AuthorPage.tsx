import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, ArrowRight, ArrowLeft, User, Briefcase, BookOpen } from 'lucide-react';
import { contentRegistry } from '../../cms-content/contentRegistry';
import { teamProfiles } from '../../data/teamProfiles';
import SEOHelmet from '../../components/SEOHelmet';

const AuthorPage: React.FC = () => {
  const { authorId } = useParams();

  const author = teamProfiles.find(p => p.id === authorId);
  const authorArticles = contentRegistry.filter(article => article.authorId === authorId);

  if (!author) {
    return <Navigate to="/news" replace />;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEOHelmet
        title={`${author.name} - Author Profile | MoneyCal`}
        description={`Read all articles by ${author.name}, ${author.role} at MoneyCal. ${author.bio}`}
        keywords={`${author.name}, financial writer, market analyst, author`}
        url={`/news/author/${authorId}`}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All News
          </Link>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Author Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center text-white font-bold text-5xl border-4 border-white/30 shadow-2xl flex-shrink-0">
              {author.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            {/* Author Info */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{author.name}</h1>
              <div className="flex items-center gap-2 text-xl text-blue-100 mb-4">
                <Briefcase className="h-5 w-5" />
                <span>{author.role}</span>
              </div>
              <p className="text-lg text-blue-50 max-w-3xl mb-6">
                {author.bio}
              </p>
              <div className="flex items-center gap-6 text-blue-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span className="font-semibold">{authorArticles.length} Article{authorArticles.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles by Author */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">
            Articles by {author.name}
          </h2>
          <p className="text-neutral-600">
            {authorArticles.length} article{authorArticles.length !== 1 ? 's' : ''} published
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authorArticles.map((article) => (
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
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-semibold capitalize">
                    {article.category.replace('-', ' ')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-neutral-600 mb-4">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(article.datePublished).toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <Link
                  to={`/news/${article.category}/${article.slug}`}
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-semibold group"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {authorArticles.length === 0 && (
          <div className="text-center py-20">
            <User className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
            <p className="text-xl text-neutral-600 mb-4">No articles published yet.</p>
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

export default AuthorPage;

