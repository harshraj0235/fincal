// src/pages/ExcelTool.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Tag } from 'lucide-react';
import { excelToolBlogPosts } from '../data/exceltooldata';

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the best Excel templates for personal finance in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best Excel templates for personal finance in India include budget planners, daily expense trackers, loan & EMI calculators, investment trackers, and tax planning sheets. These templates help you manage your money, automate savings, and plan for financial goals."
      }
    },
    {
      "@type": "Question",
      "name": "How can I automate my savings in Excel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can automate your savings in Excel by using formulas, conditional formatting, and charts. Set up automatic calculations for monthly savings, use data validation for expense categories, and visualize your progress with graphs. Download our free savings automation template to get started."
      }
    },
    {
      "@type": "Question",
      "name": "Is Excel better than Google Sheets for budgeting in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Excel offers more advanced features and offline access, making it ideal for complex budgeting. Google Sheets is great for collaboration and cloud access. For most Indian users, Excel is preferred for its powerful templates and compatibility with Indian banks and formats."
      }
    }
  ]
};

const ExcelTool: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(excelToolBlogPosts.flatMap(post => post.categories)));

  const filteredPosts = excelToolBlogPosts.filter(post => {
    const matchesSearch =
      searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === null ||
      post.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* SEO Article Section */}
      <article className="prose lg:prose-xl max-w-none mb-12">
        <h1>Best Excel Tools & Templates for Personal Finance in India (2024 Guide)</h1>
        <p><strong>Trending on Google Discover:</strong> Excel is making a huge comeback for Indian personal finance in 2024! From AI-powered templates to classic budget planners, discover why Excel is the #1 tool for money management, savings, and investments in India.</p>
        <h2>Why Excel is Still the #1 Tool for Indian Money Management</h2>
        <ul>
          <li>Customizable for Indian banks, tax rules, and formats</li>
          <li>Works offline and on any device</li>
          <li>Supports advanced formulas, charts, and automation</li>
          <li>Free and easy to download templates</li>
        </ul>
        <h2>Top Trending Excel Templates for 2024</h2>
        <ol>
          <li><strong>Budget Planner:</strong> Track monthly income, expenses, and savings goals</li>
          <li><strong>Daily Expense Tracker:</strong> Record every rupee spent, spot leaks, and control spending</li>
          <li><strong>Loan & EMI Calculator:</strong> Calculate EMIs, compare loans, and plan repayments</li>
          <li><strong>Investment Tracker:</strong> Monitor SIPs, stocks, mutual funds, and gold</li>
          <li><strong>Tax Planning Sheet:</strong> Estimate taxes, optimize deductions, and plan for Section 80C/80D</li>
        </ol>
        <h2>How to Automate Your Savings & Budget in Excel</h2>
        <ol>
          <li>Use <strong>SUM</strong>, <strong>IF</strong>, and <strong>VLOOKUP</strong> formulas for calculations</li>
          <li>Apply <strong>conditional formatting</strong> to highlight overspending</li>
          <li>Create <strong>charts</strong> to visualize savings and expenses</li>
          <li>Set up <strong>data validation</strong> for error-free entries</li>
        </ol>
        <p><strong>Download a free sample:</strong> <a href="/excel-templates/savings-automation-planner.xlsx" download>Excel Savings Automation Template</a></p>
        <h2>Excel vs Google Sheets: Which is Better for Indian Users?</h2>
        <ul>
          <li><strong>Excel:</strong> Best for advanced features, offline use, and compatibility with Indian formats</li>
          <li><strong>Google Sheets:</strong> Best for collaboration and cloud access</li>
        </ul>
        <h2>Download Free Excel Templates (2024 Edition)</h2>
        <ul>
          <li><a href="/excel-templates/monthly-budget-template.xlsx" download>Monthly Budget Planner</a></li>
          <li><a href="/excel-templates/daily-expense-tracker.xlsx" download>Daily Expense Tracker</a></li>
          <li><a href="/excel-templates/loan-emi-calculator.xlsx" download>Loan & EMI Calculator</a></li>
          <li><a href="/excel-templates/investment-tracker.xlsx" download>Investment Tracker</a></li>
          <li><a href="/excel-templates/tax-planning-sheet.xlsx" download>Tax Planning Sheet</a></li>
        </ul>
        <h2>FAQs: Excel for Personal Finance in India</h2>
        <h3>What are the best Excel templates for personal finance in India?</h3>
        <p>The best templates include budget planners, expense trackers, loan calculators, investment trackers, and tax planning sheets. Download them above for free!</p>
        <h3>How can I automate my savings in Excel?</h3>
        <p>Use formulas, conditional formatting, and charts to automate calculations and visualize your progress. Download our free template to get started.</p>
        <h3>Is Excel better than Google Sheets for budgeting in India?</h3>
        <p>Excel is preferred for its advanced features and offline access, while Google Sheets is great for collaboration. Most Indian users choose Excel for personal finance.</p>
        <h2>How to Get Featured on Google Discover with Your Own Excel Tools</h2>
        <ul>
          <li>Write long-form, helpful content with trending keywords</li>
          <li>Use clear headings, lists, and FAQs</li>
          <li>Add structured data (FAQ schema) for SEO</li>
          <li>Update your content regularly with new templates and tips</li>
        </ul>
        <h2>Conclusion</h2>
        <p>Excel is future-proof for Indian money management. Download our free templates, share with friends, and subscribe for more updates!</p>
        {/* FAQ Schema for SEO */}
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </article>

      {/* Existing Search/Filter UI and Blog Grid */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="input"
        />
        <select
          value={selectedCategory ?? ''}
          onChange={e => setSelectedCategory(e.target.value || null)}
          className="input"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map(post => (
          <Link key={post.id} to={`/exceltool/${post.slug}`} className="block bg-white shadow p-4 rounded">
            <img src={post.coverImage} alt={post.title} className="w-full h-40 object-cover rounded mb-3" />
            <div className="text-xs text-gray-500 flex gap-2 mb-2">
              <Calendar className="h-3 w-3" /> {post.date}
              <User className="h-3 w-3" /> {post.author}
            </div>
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <p className="text-sm text-gray-600">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {post.categories.map(cat => (
                <span key={cat} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs flex items-center">
                  <Tag className="h-3 w-3 mr-1" />{cat}
                </span>
              ))}
            </div>
          </Link>
        ))}
        {filteredPosts.length === 0 && (
          <div>No articles found.</div>
        )}
      </div>
    </div>
  );
};

export default ExcelTool;
