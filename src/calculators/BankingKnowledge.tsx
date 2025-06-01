import React, { useState } from 'react';

import { Book, Search, FileText, Shield, CreditCard, Smartphone, ExternalLink } from 'lucide-react';



interface Article {

  id: string;

  title: string;

  category: string;

  excerpt: string;

  readTime: string;

  date: string;

  image?: string;

}



export const BankingKnowledge: React.FC = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  

  // Sample articles data

  const articles: Article[] = [

    {

      id: 'understanding-upi',

      title: 'Understanding UPI: A Complete Guide to India\'s Payment Revolution',

      category: 'Digital Payments',

      excerpt: 'Learn everything about Unified Payments Interface (UPI), how it works, its benefits, and how to use it securely for your daily transactions.',

      readTime: '8 min read',

      date: 'June 15, 2025',

      image: 'https://images.pexels.com/photos/6347729/pexels-photo-6347729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

    },

    {

      id: 'netbanking-security',

      title: 'Net Banking Security: Essential Practices to Protect Your Money',

      category: 'Banking Security',

      excerpt: 'Discover the best practices for keeping your net banking accounts secure, including password management, two-factor authentication, and recognizing phishing attempts.',

      readTime: '6 min read',

      date: 'June 10, 2025',

      image: 'https://images.pexels.com/photos/5926389/pexels-photo-5926389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

    },

    {

      id: 'credit-score-improvement',

      title: 'How to Improve Your Credit Score: A Step-by-Step Guide',

      category: 'Credit Management',

      excerpt: 'Learn practical strategies to boost your credit score, understand what factors affect it, and how to maintain a healthy credit profile for better loan terms.',

      readTime: '10 min read',

      date: 'June 5, 2025',

      image: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

    },

    {

      id: 'banking-charges-explained',

      title: 'Banking Charges Explained: Understanding Fees and How to Minimize Them',

      category: 'Banking Basics',

      excerpt: 'A comprehensive guide to various bank charges including account maintenance, transaction fees, ATM charges, and strategies to reduce or eliminate them.',

      readTime: '7 min read',

      date: 'May 28, 2025',

      image: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

    },

    {

      id: 'mobile-banking-apps',

      title: 'Top Mobile Banking Apps in India: Features Comparison',

      category: 'Digital Banking',

      excerpt: 'Compare the features, user experience, and security aspects of the most popular mobile banking applications in India to find the best one for your needs.',

      readTime: '9 min read',

      date: 'May 20, 2025',

      image: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

    },

    {

      id: 'neft-rtgs-imps',

      title: 'NEFT, RTGS, IMPS: Choosing the Right Fund Transfer Method',

      category: 'Digital Payments',

      excerpt: 'Understand the differences between various electronic fund transfer systems in India, their transaction limits, processing times, and charges.',

      readTime: '5 min read',

      date: 'May 15, 2025',

      image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

    },

    {

      id: 'banking-frauds-prevention',

      title: 'Common Banking Frauds and How to Protect Yourself',

      category: 'Banking Security',

      excerpt: 'Learn about prevalent banking scams in India, including phishing, vishing, SIM swapping, and UPI frauds, along with practical prevention measures.',

      readTime: '8 min read',

      date: 'May 8, 2025',

      image: 'https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

    },

    {

      id: 'savings-account-types',

      title: 'Types of Savings Accounts: Which One is Right for You?',

      category: 'Banking Basics',

      excerpt: 'Explore different types of savings accounts offered by Indian banks, their features, benefits, and how to choose the one that best fits your financial needs.',

      readTime: '6 min read',

      date: 'May 1, 2025',

      image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

    }

  ];

  

  // Get unique categories

  const categories = Array.from(new Set(articles.map(article => article.category)));

  

  // Filter articles based on search and category

  const filteredArticles = articles.filter(article => {

    const matchesSearch = searchQuery === '' || 

      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||

      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      

    const matchesCategory = selectedCategory === null || 

      article.category === selectedCategory;

      

    return matchesSearch && matchesCategory;

  });

  

  return (

    <div className="max-w-4xl mx-auto">

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Banking Knowledge Center</h2>

        <p className="text-neutral-600">

          Access comprehensive guides on banking services, digital payments, financial security, and best practices. Stay informed about the latest trends and developments in the banking sector.

        </p>

      </div>



      {/* Search and Filters */}

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">

        <div className="flex flex-col md:flex-row gap-4">

          <div className="flex-grow">

            <div className="relative">

              <input

                type="text"

                placeholder="Search articles..."

                value={searchQuery}

                onChange={(e) => setSearchQuery(e.target.value)}

                className="input pl-10"

              />

              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

                <Search className="h-5 w-5 text-neutral-400" />

              </div>

            </div>

          </div>

          

          <div>

            <select

              value={selectedCategory || ''}

              onChange={(e) => setSelectedCategory(e.target.value || null)}

              className="input"

            >

              <option value="">All Categories</option>

              {categories.map(category => (

                <option key={category} value={category}>{category}</option>

              ))}

            </select>

          </div>

        </div>

      </div>



      {/* Featured Article */}

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">

        <div className="md:flex">

          <div className="md:flex-shrink-0 md:w-2/5">

            <img 

              src="https://images.pexels.com/photos/6347729/pexels-photo-6347729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 

              alt="UPI Payment" 

              className="h-48 md:h-full w-full object-cover"

            />

          </div>

          <div className="p-6 md:w-3/5">

            <div className="uppercase tracking-wide text-sm text-[--primary-600] font-semibold">Featured Article</div>

            <a href="#" className="block mt-1 text-xl font-semibold text-neutral-900 hover:text-[--primary-600]">

              Understanding UPI: A Complete Guide to India's Payment Revolution

            </a>

            <p className="mt-2 text-neutral-600">

              Learn everything about Unified Payments Interface (UPI), how it works, its benefits, and how to use it securely for your daily transactions. Discover tips for troubleshooting common UPI issues and maximizing this powerful payment tool.

            </p>

            <div className="mt-4 flex items-center">

              <div className="flex items-center text-sm text-neutral-500">

                <Book className="h-4 w-4 mr-1" />

                <span>8 min read</span>

              </div>

              <span className="mx-2 text-neutral-300">|</span>

              <div className="text-sm text-neutral-500">June 15, 2025</div>

            </div>

            <div className="mt-4">

              <a href="#" className="inline-flex items-center text-[--primary-600] hover:text-[--primary-800]">

                Read Full Article

                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>

                </svg>

              </a>

            </div>

          </div>

        </div>

      </div>



      {/* Category Highlights */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-lg shadow-md p-6">

          <div className="flex items-center mb-4">

            <div className="rounded-full bg-[--primary-100] p-3 mr-3">

              <Smartphone className="h-5 w-5 text-[--primary-600]" />

            </div>

            <h3 className="text-lg font-semibold text-neutral-900">Digital Banking</h3>

          </div>

          <p className="text-sm text-neutral-600 mb-4">

            Guides on mobile banking, UPI, net banking, and other digital financial services.

          </p>

          <a href="#" className="text-[--primary-600] hover:text-[--primary-800] text-sm font-medium flex items-center">

            View Articles

            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>

            </svg>

          </a>

        </div>

        

        <div className="bg-white rounded-lg shadow-md p-6">

          <div className="flex items-center mb-4">

            <div className="rounded-full bg-[--error-100] p-3 mr-3">

              <Shield className="h-5 w-5 text-[--error-600]" />

            </div>

            <h3 className="text-lg font-semibold text-neutral-900">Banking Security</h3>

          </div>

          <p className="text-sm text-neutral-600 mb-4">

            Learn how to protect your accounts from fraud and keep your financial information secure.

          </p>

          <a href="#" className="text-[--primary-600] hover:text-[--primary-800] text-sm font-medium flex items-center">

            View Articles

            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>

            </svg>

          </a>

        </div>

        

        <div className="bg-white rounded-lg shadow-md p-6">

          <div className="flex items-center mb-4">

            <div className="rounded-full bg-[--success-100] p-3 mr-3">

              <FileText className="h-5 w-5 text-[--success-600]" />

            </div>

            <h3 className="text-lg font-semibold text-neutral-900">Banking Basics</h3>

          </div>

          <p className="text-sm text-neutral-600 mb-4">

            Fundamental concepts about banking services, account types, and financial products.

          </p>

          <a href="#" className="text-[--primary-600] hover:text-[--primary-800] text-sm font-medium flex items-center">

            View Articles

            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>

            </svg>

          </a>

        </div>

      </div>



      {/* Articles List */}

      <div className="mb-8">

        <h3 className="text-xl font-semibold text-neutral-900 mb-6">

          {selectedCategory 

            ? `${selectedCategory} Articles` 

            : searchQuery 

              ? `Search Results for "${searchQuery}"` 

              : 'Latest Articles'

          }

        </h3>

        

        {filteredArticles.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {filteredArticles.map(article => (

              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">

                {article.image && (

                  <div className="h-48 overflow-hidden">

                    <img 

                      src={article.image} 

                      alt={article.title} 

                      className="w-full h-full object-cover transition-transform hover:scale-105"

                    />

                  </div>

                )}

                <div className="p-5">

                  <div className="flex items-center mb-2">

                    <span className="text-xs font-medium text-[--primary-600] bg-[--primary-50] px-2 py-0.5 rounded-full">

                      {article.category}

                    </span>

                    <span className="mx-2 text-neutral-300">•</span>

                    <span className="text-xs text-neutral-500">{article.readTime}</span>

                  </div>

                  <a href="#" className="block mb-2 text-lg font-semibold text-neutral-900 hover:text-[--primary-600]">

                    {article.title}

                  </a>

                  <p className="text-sm text-neutral-600 mb-4 line-clamp-2">

                    {article.excerpt}

                  </p>

                  <div className="flex justify-between items-center">

                    <span className="text-xs text-neutral-500">{article.date}</span>

                    <a href="#" className="text-sm text-[--primary-600] hover:text-[--primary-800] font-medium flex items-center">

                      Read More

                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>

                      </svg>

                    </a>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="text-center py-12 bg-neutral-50 rounded-lg">

            <FileText className="h-12 w-12 text-neutral-400 mx-auto mb-3" />

            <p className="text-neutral-600">No articles found matching your criteria.</p>

            <button 

              onClick={() => {

                setSearchQuery('');

                setSelectedCategory(null);

              }}

              className="mt-4 text-[--primary-600] hover:text-[--primary-800] font-medium"

            >

              Clear filters

            </button>

          </div>

        )}

      </div>



      {/* External Resources */}

      <div className="bg-[--accent-50] rounded-lg p-6">

        <h3 className="text-lg font-semibold text-[--accent-900] mb-4">Useful Banking Resources</h3>

        

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <a 

            href="https://www.rbi.org.in" 

            target="_blank" 

            rel="noopener noreferrer"

            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-start"

          >

            <div className="rounded-full bg-[--accent-100] p-2 mr-3">

              <ExternalLink className="h-4 w-4 text-[--accent-600]" />

            </div>

            <div>

              <h4 className="font-medium text-[--accent-800] mb-1">Reserve Bank of India</h4>

              <p className="text-xs text-[--accent-600]">Official website of India's central banking institution</p>

            </div>

          </a>

          

          <a 

            href="https://www.npci.org.in" 

            target="_blank" 

            rel="noopener noreferrer"

            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-start"

          >

            <div className="rounded-full bg-[--accent-100] p-2 mr-3">

              <ExternalLink className="h-4 w-4 text-[--accent-600]" />

            </div>

            <div>

              <h4 className="font-medium text-[--accent-800] mb-1">National Payments Corporation of India</h4>

              <p className="text-xs text-[--accent-600]">Organization operating retail payments and settlement systems</p>

            </div>

          </a>

          

          <a 

            href="https://www.cibil.com" 

            target="_blank" 

            rel="noopener noreferrer"

            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-start"

          >

            <div className="rounded-full bg-[--accent-100] p-2 mr-3">

              <ExternalLink className="h-4 w-4 text-[--accent-600]" />

            </div>

            <div>

              <h4 className="font-medium text-[--accent-800] mb-1">CIBIL</h4>

              <p className="text-xs text-[--accent-600]">India's first credit information company</p>

            </div>

          </a>

          

          <a 

            href="https://www.bankingombudsman.rbi.org.in" 

            target="_blank" 

            rel="noopener noreferrer"

            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-start"

          >

            <div className="rounded-full bg-[--accent-100] p-2 mr-3">

              <ExternalLink className="h-4 w-4 text-[--accent-600]" />

            </div>

            <div>

              <h4 className="font-medium text-[--accent-800] mb-1">Banking Ombudsman</h4>

              <p className="text-xs text-[--accent-600]">Grievance redressal mechanism for bank customers</p>

            </div>

          </a>

        </div>

      </div>

    </div>

  );

};



export default BankingKnowledge;
