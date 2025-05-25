import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const WriteBlog: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/blog')} 
          className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Blog</span>
        </button>
      </div>
      
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">Write for Our Finance Blog</h1>
        <p className="text-lg text-neutral-600">
          Share your financial expertise with our community
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Submission Guidelines</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">What We're Looking For</h3>
            <p className="text-neutral-600">
              We publish articles that provide valuable insights, practical advice, and expert analysis on personal finance, investing, taxation, retirement planning, and other financial topics relevant to Indian readers.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Article Requirements</h3>
            <ul className="list-disc pl-5 space-y-2 text-neutral-600">
              <li>Original content that hasn't been published elsewhere</li>
              <li>1,000-2,000 words in length</li>
              <li>Well-researched with accurate information and data</li>
              <li>Clear, concise, and engaging writing style</li>
              <li>Practical takeaways that readers can apply</li>
              <li>Proper citations for any statistics or research mentioned</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Popular Topics</h3>
            <ul className="list-disc pl-5 space-y-2 text-neutral-600">
              <li>Investment strategies for different life stages</li>
              <li>Tax planning and optimization</li>
              <li>Retirement planning in the Indian context</li>
              <li>Personal finance management and budgeting</li>
              <li>Understanding financial products and services</li>
              <li>Financial technology and its impact</li>
              <li>Market analysis and economic trends</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Submission Process</h3>
            <ol className="list-decimal pl-5 space-y-2 text-neutral-600">
              <li>Fill out the submission form below with your article idea</li>
              <li>Our editorial team will review your proposal</li>
              <li>If approved, you'll be invited to submit your full article</li>
              <li>Our editors will work with you to refine the content</li>
              <li>Once finalized, your article will be published on our blog</li>
            </ol>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Benefits of Contributing</h3>
            <ul className="list-disc pl-5 space-y-2 text-neutral-600">
              <li>Showcase your expertise to a large audience of finance enthusiasts</li>
              <li>Author bio with your photo and credentials</li>
              <li>Backlinks to your website or social profiles</li>
              <li>Potential for recurring contributor opportunities</li>
              <li>Networking with other finance professionals</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Submit Your Proposal</h2>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="input"
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="input"
                placeholder="Your email address"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="profession" className="block text-sm font-medium text-neutral-700 mb-1">
              Profession/Title
            </label>
            <input
              type="text"
              id="profession"
              className="input"
              placeholder="e.g., Financial Advisor, Investment Analyst"
            />
          </div>
          
          <div>
            <label htmlFor="article-title" className="block text-sm font-medium text-neutral-700 mb-1">
              Proposed Article Title
            </label>
            <input
              type="text"
              id="article-title"
              className="input"
              placeholder="Your article title"
            />
          </div>
          
          <div>
            <label htmlFor="article-summary" className="block text-sm font-medium text-neutral-700 mb-1">
              Article Summary
            </label>
            <textarea
              id="article-summary"
              rows={4}
              className="input"
              placeholder="Provide a brief summary of your proposed article (200-300 words)"
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="article-category" className="block text-sm font-medium text-neutral-700 mb-1">
              Article Category
            </label>
            <select
              id="article-category"
              className="input"
            >
              <option value="">Select a category</option>
              <option value="investing">Investing</option>
              <option value="personal-finance">Personal Finance</option>
              <option value="tax-planning">Tax Planning</option>
              <option value="retirement">Retirement Planning</option>
              <option value="insurance">Insurance</option>
              <option value="market-analysis">Market Analysis</option>
              <option value="fintech">Financial Technology</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="writing-samples" className="block text-sm font-medium text-neutral-700 mb-1">
              Previous Writing Samples (Optional)
            </label>
            <input
              type="text"
              id="writing-samples"
              className="input"
              placeholder="Links to your published articles or blog posts"
            />
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="btn btn-primary w-full md:w-auto"
            >
              Submit Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteBlog;