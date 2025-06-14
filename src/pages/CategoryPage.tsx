import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, TrendingUp, Clock, Star, BookOpen, Share2, Calculator } from 'lucide-react';
import { getCategoryBySlug, getPostsByCategory, blogCategories, BlogCategory } from '../data/blogData';
import { calculatorCategories } from '../data/calculatorData';

type CategoryType = 'blog' | 'calculator';

export const CategoryPage: React.FC<{ type: CategoryType }> = ({ type }) => {
  const { categoryId, categorySlug } = useParams<{ categoryId?: string; categorySlug?: string }>();
  const navigate = useNavigate();
  
  // Get category based on type
  let category;
  let items = [];
  let relatedCategories = [];
  
  if (type === 'blog') {
    category = getCategoryBySlug(categorySlug || '');
    items = getPostsByCategory(categorySlug || '');
    relatedCategories = blogCategories
      .filter(cat => cat.id !== category?.id && cat.parentCategory === category?.parentCategory)
      .slice(0, 6);
  } else {
    category = calculatorCategories.find(cat => cat.id === categoryId);
    items = category?.calculators || [];
  }

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
            The {type} category you're looking for doesn't exist or may have been moved.
          </p>
          <button 
            onClick={() => navigate(type === 'blog' ? '/blog' : '/')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            {type === 'blog' ? 'Back to Blog' : 'Go to Home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs for blog */}
      {type === 'blog' && (
        <div className="mb-8">
          <nav className="flex items-center text-sm text-neutral-600">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-primary-600">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-900">{category.name}</span>
          </nav>
        </div>
      )}
      
      {/* Back button for calculators */}
      {type === 'calculator' && (
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back</span>
          </button>
        </div>
      )}
      
      {/* Category Header */}
      <div className={`${type === 'blog' ? 'text-center mb-16' : 'mb-12'}`}>
        {type === 'blog' && (
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${category.color.replace('text-', 'bg-').replace('-800', '-100')} mb-6`}>
            <span className="text-3xl">{category.icon}</span>
          </div>
        )}
        <h1 className={`${type === 'blog' ? 'text-4xl sm:text-5xl' : 'text-3xl'} font-bold text-neutral-900 mb-4`}>
          {category.name}
        </h1>
        <p className={`${type === 'blog' ? 'text-xl max-w-3xl mx-auto' : 'text-lg'} text-neutral-600 mb-8`}>
          {category.description}
        </p>
        
        {/* Blog category stats */}
        {type === 'blog' && (
          <div className="flex justify-center space-x-8 text-sm text-neutral-600">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1 text-primary-600" />
              <span>{items.length} Articles</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-500" />
              <span>Expert Insights</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              <span>Updated Regularly</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Featured Article (blog only) */}
      {type === 'blog' && (items as any[]).find((item: any) => item.featured) && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8 flex items-center">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            Featured Article
          </h2>
          
          {(() => {
            const featuredPost = (items as any[]).find((post: any) => post.featured)!;
            return (
              <Link to={`/blog/${featuredPost.slug}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-neutral-100">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="h-64 lg:h-auto overflow-hidden">
                      <img 
                        src={featuredPost.coverImage} 
                        alt={featuredPost.title} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center text-sm text-neutral-500 mb-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{featuredPost.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{featuredPost.readTime}</span>
                        <span className="mx-2">•</span>
                        <User className="h-4 w-4 mr-1" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">
                        {featuredPost.title}
                      </h3>
                      <p className="text-neutral-600 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featuredPost.categories.slice(0, 3).map((cat: string) => (
                          <span 
                            key={cat} 
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      <span className="text-primary-600 font-semibold flex items-center">
                        Read Full Article
                        <ArrowLeft className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })()}
        </section>
      )}
      
      {/* Items List */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-neutral-900">
            {type === 'blog' ? `All ${category.name} Articles` : `All ${category.name} Calculators`}
          </h2>
          <div className="text-neutral-600">
            {items.length} {type === 'blog' ? 'article' : 'calculator'}{items.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-16 bg-neutral-50 rounded-xl">
            <div className="mb-4">
              {type === 'blog' ? (
                <BookOpen className="h-16 w-16 text-neutral-300 mx-auto" />
              ) : (
                <Calculator className="h-16 w-16 text-neutral-300 mx-auto" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              No {type === 'blog' ? 'articles' : 'calculators'} yet
            </h3>
            <p className="text-neutral-600 mb-6">
              {type === 'blog' 
                ? "We're working on adding more content to this category. Check back soon!"
                : "We're working on adding more calculators to this category. Check back soon!"}
            </p>
            <Link 
              to={type === 'blog' ? "/blog" : "/"}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              {type === 'blog' ? "Browse All Articles" : "Browse All Calculators"}
            </Link>
          </div>
        ) : (
          <div className={`grid grid-cols-1 ${type === 'blog' ? 'md:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-6`}>
            {items.map((item: any) => (
              <Link 
                key={item.id} 
                to={`/${type === 'blog' ? 'blog' : 'calculators'}/${type === 'blog' ? item.slug : item.id}`} 
                className="group"
              >
                {type === 'blog' ? (
                  <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-neutral-100">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={item.coverImage} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                      />
                      {item.trending && (
                        <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          TRENDING
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-xs text-neutral-500 mb-3">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{item.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{item.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600 mb-4 line-clamp-3 text-sm">{item.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {item.authorImage && (
                            <div className="h-6 w-6 rounded-full bg-neutral-300 overflow-hidden mr-2">
                              <img 
                                src={item.authorImage} 
                                alt={item.author} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <span className="text-sm text-neutral-700">{item.author}</span>
                        </div>
                        <span className="text-primary-600 font-medium text-sm flex items-center">
                          Read More
                          <ArrowLeft className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </article>
                ) : (
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group">
                    <div className="flex items-start mb-4">
                      <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors">
                        <Calculator className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                          {item.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-neutral-600 mb-4 text-sm">{item.description}</p>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
      
      {/* Related Categories (blog only) */}
      {type === 'blog' && relatedCategories.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8">Related Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {relatedCategories.map(relatedCategory => (
              <Link 
                key={relatedCategory.id}
                to={`/blog/category/${relatedCategory.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center border border-neutral-100">
                  <div className={`h-12 w-12 rounded-xl ${relatedCategory.color.replace('text-', 'bg-').replace('-800', '-100')} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <span className="text-xl">{relatedCategory.icon}</span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 text-sm group-hover:text-primary-600 transition-colors mb-1">
                    {relatedCategory.name}
                  </h3>
                  <p className="text-xs text-neutral-500">{relatedCategory.postCount} articles</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {/* Newsletter CTA (blog only) */}
      {type === 'blog' && (
        <section className="mt-20 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated on {category.name}</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Get the latest articles and insights about {category.name.toLowerCase()} delivered to your inbox.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white"
            />
            <button 
              type="submit"
              className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-primary-200 mt-4">
            Join thousands of readers • Unsubscribe anytime
          </p>
        </section>
      )}
    </div>
  );
};

export default CategoryPage;
