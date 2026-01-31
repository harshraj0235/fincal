import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import AuthorProfile from '../components/AuthorProfile';
import SEOHelmet from '../components/SEOHelmet';
import { getAuthorBySlug } from '../data/blogAuthors';
import { getPostsByAuthorSlug } from '../data/allBlogData';

const AuthorProfilePage: React.FC = () => {
  const { authorSlug } = useParams<{ authorSlug: string }>();
  const author = authorSlug ? getAuthorBySlug(authorSlug) : undefined;
  const posts = authorSlug ? getPostsByAuthorSlug(authorSlug) : [];

  if (!authorSlug || !author) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <>
      <SEOHelmet
        title={`${author.name} - Author Profile | ${author.role} | MoneyCal.in`}
        description={author.bio}
        keywords={`${author.name}, author profile, ${author.role}, finance, MoneyCal, financial blog`}
        ogTitle={`${author.name} - Author Profile`}
        ogDescription={author.bio}
        ogImage={author.image}
        canonicalUrl={`/author/${author.slug}`}
      />
      <AuthorProfile author={author} isFullPage={true} />

      {posts.length > 0 && (
        <div className="container mx-auto px-4 max-w-4xl mt-10 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Articles by {author.name}</h2>
          <ul className="space-y-4">
            {posts.map((post: any) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {(post.readingTime || 5)} min read
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 flex-shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              View all blog articles
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthorProfilePage;
