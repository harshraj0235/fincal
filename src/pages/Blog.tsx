
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, Tag, Filter, X } from 'lucide-react';
import { blogPosts as oldPosts } from '../data/blogData';
import { blogPosts as newPosts } from '../data/blogData1';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const allBlogPosts = [...oldPosts, ...newPosts];

export const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique categories
  const categories = Array.from(
    new Set(allBlogPosts.flatMap(post => post.categories))
  );

  // Filter posts based on search and category
  const filteredPosts = allBlogPosts.filter(post => {
    const matchesSearch = searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === null ||
      post.categories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setIsFilterOpen(false);
            }}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedCategory === null 
                ? 'bg-blue-100 text-blue-800 font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setIsFilterOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === category 
                  ? 'bg-blue-100 text-blue-800 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Government Schemes</h3>
          <p className="text-sm text-blue-700 mb-3">
            Explore comprehensive guides on government financial schemes.
          </p>
          <Link 
            to="/blog/category/government-schemes" 
            className="text-sm font-medium text-blue-700 hover:text-blue-800 flex items-center gap-1"
          >
            View all guides
            <ArrowRight className="h-3 w-3" />
          </Link>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-green-900 mb-2">Write for Us</h3>
          <p className="text-sm text-green-700 mb-3">
            Share your financial expertise with our community.
          </p>
          <Link 
            to="/blog/write" 
            className="text-sm font-medium text-green-700 hover:text-green-800 flex items-center gap-1"
          >
            Learn more
            <ArrowRight className="h-3 w-3" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Finance Blog</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert insights, tips, and guides to help you make better financial decisions
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Mobile Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Mobile Filter Toggle */}
            <div className="sm:hidden">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                    {selectedCategory && (
                      <Badge variant="secondary" className="ml-2">
                        {selectedCategory}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center justify-between">
                      Filters
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setIsFilterOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          {/* Active Filters */}
          {(selectedCategory || searchTerm) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCategory && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <FilterContent />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {filteredPosts.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-lg text-gray-600 mb-4">No articles found matching your criteria.</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory(null);
                    }}
                    variant="outline"
                  >
                    Clear filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                  {filteredPosts.map(post => (
                    <Link 
                      key={post.id} 
                      to={`/blog/${post.slug}`}
                      className="group"
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                        <div className="h-48 overflow-hidden rounded-t-lg">
                          <img 
                            src={post.coverImage} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <CardContent className="p-5">
                          <div className="flex items-center text-xs text-gray-500 mb-3">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{post.date}</span>
                            <span className="mx-2">•</span>
                            <User className="h-3 w-3 mr-1" />
                            <span>{post.author}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.excerpt}</p>
                          <div className="flex flex-wrap gap-2">
                            {post.categories.slice(0, 2).map(category => (
                              <Badge key={category} variant="secondary" className="text-xs">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* Government Schemes Section */}
                <Card className="bg-green-50 border-green-200 mb-12">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-green-900 mb-4">Government Scheme Guides</h2>
                    <p className="text-green-700 mb-6">
                      Comprehensive guides to help you understand and maximize benefits from various government financial schemes in India.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {[
                        {
                          title: "Sukanya Samriddhi Yojana: Complete Guide",
                          description: "Everything you need to know about SSY - eligibility, benefits, tax advantages, and how to maximize returns.",
                          link: "/blog/sukanya-samriddhi-yojana-guide"
                        },
                        {
                          title: "National Pension System: Tier 1 vs Tier 2",
                          description: "Detailed comparison of NPS Tier 1 and Tier 2 accounts - features, benefits, tax implications, and investment strategies.",
                          link: "/blog/nps-tier1-vs-tier2-comparison"
                        },
                        {
                          title: "Post Office Savings Schemes: Which One is Right for You?",
                          description: "Compare KVP, NSC, SCSS, MIS, and other post office schemes to find the best option for your financial goals.",
                          link: "/blog/post-office-savings-schemes-comparison"
                        },
                        {
                          title: "PM Vaya Vandana Yojana: Pension Scheme for Senior Citizens",
                          description: "A detailed look at PMVVY - benefits, eligibility, comparison with other senior citizen schemes, and application process.",
                          link: "/blog/pm-vaya-vandana-yojana-guide"
                        }
                      ].map((scheme, index) => (
                        <Card key={index} className="bg-white">
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2">{scheme.title}</h3>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{scheme.description}</p>
                            <Link to={scheme.link} className="text-xs text-green-600 font-medium hover:underline">
                              Read More →
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="text-center">
                      <Link 
                        to="/blog/category/government-schemes"
                        className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
                      >
                        View all government scheme guides
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Pagination */}
                <div className="flex justify-center">
                  <nav className="inline-flex rounded-lg shadow-sm" aria-label="Pagination">
                    <Button variant="outline" className="rounded-r-none">
                      Previous
                    </Button>
                    <Button variant="outline" className="rounded-none border-l-0 bg-blue-50 text-blue-600">
                      1
                    </Button>
                    <Button variant="outline" className="rounded-none border-l-0">
                      2
                    </Button>
                    <Button variant="outline" className="rounded-none border-l-0">
                      3
                    </Button>
                    <Button variant="outline" className="rounded-l-none border-l-0">
                      Next
                    </Button>
                  </nav>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
