// src/pages/ExcelTool.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, Download, Calculator, FileText } from 'lucide-react';
import { excelToolBlogPosts } from '../data/exceltooldata';

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to create a monthly budget in Excel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To create a monthly budget in Excel, start with income tracking, categorize expenses, use SUM and IF functions for calculations, add conditional formatting for overspending alerts, and create charts for visualization. Download our free monthly budget template to get started."
      }
    },
    {
      "@type": "Question",
      "name": "What are the best Excel functions for budgeting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best Excel functions for budgeting include SUM for totals, IF for conditional calculations, VLOOKUP for data lookup, SUMIF for category totals, and PMT for loan calculations. These functions help automate your budget and reduce manual errors."
      }
    },
    {
      "@type": "Question",
      "name": "How to calculate EMI in Excel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use the PMT function: =PMT(rate/12, nper*12, pv). For example, =PMT(8.5%/12, 20*12, 2500000) calculates EMI for a 25 lakh loan at 8.5% for 20 years. Download our EMI calculator template for easy calculations."
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
        <h1>Complete Excel Guide for Personal Finance in India (2024)</h1>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">🎯 What You'll Learn</h2>
          <ul className="space-y-2 text-blue-800">
            <li>• How to create monthly budgets and track daily expenses</li>
            <li>• Family budget planning with free Excel templates</li>
            <li>• Essential Excel functions for Indian personal finance</li>
            <li>• Loan EMI calculations and comparison tools</li>
            <li>• Financial goal setting and tracking methods</li>
          </ul>
        </div>

        <h2>How to Use Excel for Monthly Budgeting: A Beginner's Guide</h2>
        <p>Creating a monthly budget in Excel is the foundation of financial success. Unlike basic budgeting apps, Excel offers unlimited customization and powerful automation features that can transform your financial planning.</p>
        
        <h3>Step 1: Set Up Your Budget Structure</h3>
        <p>Start by creating a new Excel workbook with multiple worksheets:</p>
        <ul>
          <li><strong>Monthly Budget:</strong> Main budget overview with categories</li>
          <li><strong>Income Tracker:</strong> All income sources and dates</li>
          <li><strong>Daily Expenses:</strong> Detailed expense logging</li>
          <li><strong>Financial Goals:</strong> Savings and investment targets</li>
        </ul>

        <h3>Step 2: Create Income Tracking System</h3>
        <p>Use the SUMIF function to automatically calculate total monthly income:</p>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <code>=SUMIF(B:B,"Salary",C:C)</code> - Sums all salary income<br/>
          <code>=SUM(C:C)</code> - Total income from all sources
        </div>

        <h3>Step 3: Categorize Your Expenses</h3>
        <p>Create comprehensive expense categories for Indian households:</p>
        <ul>
          <li><strong>Housing:</strong> Rent, EMI, utilities, maintenance</li>
          <li><strong>Transportation:</strong> Fuel, public transport, vehicle costs</li>
          <li><strong>Food & Dining:</strong> Groceries, dining out, food delivery</li>
          <li><strong>Healthcare:</strong> Insurance, medicines, doctor visits</li>
          <li><strong>Education:</strong> School fees, books, courses</li>
          <li><strong>Entertainment:</strong> Movies, subscriptions, hobbies</li>
        </ul>

        <div className="bg-green-50 p-6 rounded-lg my-6">
          <h4 className="text-lg font-semibold text-green-800 mb-2">💡 Pro Tip</h4>
          <p className="text-green-700">Use conditional formatting to highlight overspending. Set rules to turn cells red when expenses exceed 90% of budget.</p>
        </div>

        <h2>5 Simple Excel Templates to Track Your Daily Expenses</h2>
        <p>Daily expense tracking is crucial for understanding spending patterns and identifying areas for improvement. Here are five essential templates every Indian household needs:</p>

        <h3>1. Basic Daily Expense Tracker</h3>
        <p>Simple template with columns for date, category, amount, and notes. Perfect for beginners who want to start tracking expenses immediately.</p>
        <div className="flex gap-4 my-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </button>
        </div>

        <h3>2. Category-Based Expense Tracker</h3>
        <p>Advanced template with predefined categories, automatic totals, and spending analysis. Includes charts to visualize spending patterns.</p>

        <h3>3. Family Expense Tracker</h3>
        <p>Multi-user template for joint families. Track expenses by family member and generate individual spending reports.</p>

        <h3>4. Business Expense Tracker</h3>
        <p>For freelancers and small business owners. Includes GST calculations, tax categories, and business vs personal expense separation.</p>

        <h3>5. Investment Expense Tracker</h3>
        <p>Track mutual fund investments, SIPs, stock purchases, and calculate returns. Includes portfolio analysis features.</p>

        <h2>Creating a Family Budget Planner in Excel (with Free Template)</h2>
        <p>Indian families face unique financial challenges that require specialized budgeting approaches. Our family budget planner addresses these specific needs:</p>

        <h3>Joint Family Budget Features</h3>
        <ul>
          <li><strong>Multiple Income Sources:</strong> Track income from each family member</li>
          <li><strong>Shared Expenses:</strong> Household expenses divided by family members</li>
          <li><strong>Individual Budgets:</strong> Personal spending limits for each member</li>
          <li><strong>Savings Goals:</strong> Family and individual savings targets</li>
        </ul>

        <h3>Traditional Ceremonies Planning</h3>
        <p>Include dedicated sections for:</p>
        <ul>
          <li>Wedding expenses and timeline planning</li>
          <li>Festival and celebration budgets</li>
          <li>Religious ceremony costs</li>
          <li>Guest list management with per-person costs</li>
        </ul>

        <div className="bg-yellow-50 p-6 rounded-lg my-6">
          <h4 className="text-lg font-semibold text-yellow-800 mb-2">🎯 Family Budget Template</h4>
          <p className="text-yellow-700 mb-4">Download our comprehensive family budget planner designed specifically for Indian families.</p>
          <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download Family Budget Template
          </button>
        </div>

        <h2>Top Excel Functions Every Budget-Conscious Indian Should Know</h2>
        <p>Master these essential Excel functions to automate your financial calculations and save hours of manual work:</p>

        <h3>1. SUM Function</h3>
        <p>The foundation of all financial calculations:</p>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <code>=SUM(B2:B50)</code> - Adds all values in range B2 to B50<br/>
          <code>=SUM(B2:B50,C2:C50)</code> - Adds values from multiple ranges
        </div>

        <h3>2. IF Function</h3>
        <p>Create conditional calculations for your budget:</p>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <code>=IF(B2&gt;C2,"Overspent","Within Budget")</code> - Shows status based on spending<br/>
          <code>=IF(B2&gt;10000,B2*0.1,B2*0.05)</code> - Different calculations based on amount
        </div>

        <h3>3. VLOOKUP Function</h3>
        <p>Look up values from other tables (perfect for category mapping):</p>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <code>=VLOOKUP(A2,CategoryTable,2,FALSE)</code> - Finds category for expense description
        </div>

        <h3>4. SUMIF Function</h3>
        <p>Sum values based on specific criteria:</p>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <code>=SUMIF(B:B,"Groceries",C:C)</code> - Sums all grocery expenses<br/>
          <code>=SUMIF(A:A,"&gt;="&DATE(2024,1,1),C:C)</code> - Sums expenses from 2024 onwards
        </div>

        <h3>5. PMT Function</h3>
        <p>Calculate loan EMIs and payment schedules:</p>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <code>=PMT(8.5%/12,20*12,2500000)</code> - Monthly EMI for 25 lakh loan at 8.5% for 20 years
        </div>

        <h2>How to Set and Track Financial Goals Using Excel</h2>
        <p>Transform your dreams into achievable financial goals with systematic tracking and planning:</p>

        <h3>Short-term Goals (1-2 years)</h3>
        <ul>
          <li><strong>Emergency Fund:</strong> 6 months of expenses</li>
          <li><strong>Vacation Fund:</strong> Family trips and holidays</li>
          <li><strong>Gadget Fund:</strong> Electronics and appliances</li>
        </ul>

        <h3>Medium-term Goals (3-5 years)</h3>
        <ul>
          <li><strong>Down Payment:</strong> Home or vehicle purchase</li>
          <li><strong>Education Fund:</strong> Children's higher education</li>
          <li><strong>Business Investment:</strong> Startup or expansion capital</li>
        </ul>

        <h3>Long-term Goals (5+ years)</h3>
        <ul>
          <li><strong>Retirement Fund:</strong> NPS, PPF, mutual funds</li>
          <li><strong>Children's Marriage:</strong> Traditional ceremonies and celebrations</li>
          <li><strong>Property Investment:</strong> Real estate portfolio</li>
        </ul>

        <div className="bg-purple-50 p-6 rounded-lg my-6">
          <h4 className="text-lg font-semibold text-purple-800 mb-2">📊 Goal Tracking Template</h4>
          <p className="text-purple-700 mb-4">Download our financial goals tracker with progress visualization and milestone alerts.</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download Goals Tracker
          </button>
        </div>

        <h2>Loan & EMI Calculators</h2>
        <p>Make informed loan decisions with our comprehensive Excel-based calculators and comparison tools:</p>

        <h3>Step-by-Step Guide to Calculating Your Home Loan EMI in Excel</h3>
        <p>Understanding your home loan EMI is crucial for financial planning. Here's how to calculate it accurately:</p>

        <h4>Basic EMI Calculation</h4>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <code>=PMT(rate/12, nper*12, pv)</code><br/>
          Where:<br/>
          • rate = Annual interest rate (e.g., 8.5%)<br/>
          • nper = Loan tenure in years (e.g., 20)<br/>
          • pv = Principal amount (e.g., 2500000)
        </div>

        <h4>Complete EMI Calculator Template</h4>
        <p>Our template includes:</p>
        <ul>
          <li>EMI calculation for different loan amounts</li>
          <li>Interest vs principal breakdown</li>
          <li>Prepayment impact analysis</li>
          <li>Total interest paid calculation</li>
        </ul>

        <div className="flex gap-4 my-4">
          <Link to="/calculators/emi-calculator" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <Calculator className="h-4 w-4 mr-2" />
            Use EMI Calculator
          </Link>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download EMI Template
          </button>
        </div>

        <h3>Comparing Home Loan Offers: Excel Sheet Tips for Indian Banks</h3>
        <p>Compare loan offers from different banks to find the best deal:</p>

        <h4>Comparison Factors</h4>
        <ul>
          <li><strong>Interest Rate:</strong> Fixed vs floating rates</li>
          <li><strong>Processing Fees:</strong> One-time charges</li>
          <li><strong>Prepayment Charges:</strong> Early repayment penalties</li>
          <li><strong>Loan-to-Value Ratio:</strong> Maximum loan amount</li>
          <li><strong>Documentation Requirements:</strong> Ease of approval</li>
        </ul>

        <h4>Comparison Template Features</h4>
        <ul>
          <li>Side-by-side comparison of 5 banks</li>
          <li>Total cost calculation including fees</li>
          <li>Monthly payment comparison</li>
          <li>Break-even analysis</li>
        </ul>

        <h3>How to Plan for Early Loan Repayment Using Excel Tools</h3>
        <p>Strategically plan your loan prepayment to save thousands in interest:</p>

        <h4>Prepayment Strategies</h4>
        <ul>
          <li><strong>Lump Sum Prepayment:</strong> Use bonuses or windfalls</li>
          <li><strong>EMI Increase:</strong> Gradually increase monthly payments</li>
          <li><strong>Tenure Reduction:</strong> Keep EMI same, reduce tenure</li>
          <li><strong>Hybrid Approach:</strong> Combine multiple strategies</li>
        </ul>

        <div className="bg-orange-50 p-6 rounded-lg my-6">
          <h4 className="text-lg font-semibold text-orange-800 mb-2">💰 Prepayment Calculator</h4>
          <p className="text-orange-700 mb-4">Calculate how much you can save with early loan repayment.</p>
          <Link to="/calculators/loan-prepayment-calculator" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Prepayment Savings
          </Link>
        </div>

        <h3>Understanding the Impact of Interest Rate Changes with Excel</h3>
        <p>Monitor how RBI rate changes affect your loan payments:</p>

        <h4>Rate Change Analysis</h4>
        <ul>
          <li>EMI impact for different rate scenarios</li>
          <li>Total interest cost comparison</li>
          <li>Refinancing break-even analysis</li>
          <li>Rate change alerts and notifications</li>
        </ul>

        <h3>Excel vs Online EMI Calculators: Which is More Accurate?</h3>
        <p>While online calculators are convenient, Excel offers several advantages:</p>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">✅ Excel Advantages</h4>
            <ul className="text-green-700 text-sm">
              <li>Customizable calculations</li>
              <li>Multiple scenario analysis</li>
              <li>Data export and sharing</li>
              <li>Offline access</li>
              <li>Integration with other financial data</li>
            </ul>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">❌ Online Calculator Limitations</h4>
            <ul className="text-red-700 text-sm">
              <li>Limited customization</li>
              <li>No data persistence</li>
              <li>Internet dependency</li>
              <li>Basic calculations only</li>
              <li>No integration capabilities</li>
            </ul>
          </div>
        </div>

        <h2>Advanced Excel Techniques for Financial Planning</h2>
        <p>Take your financial planning to the next level with these advanced Excel techniques:</p>

        <h3>Pivot Tables for Expense Analysis</h3>
        <p>Create dynamic reports to analyze your spending patterns:</p>
        <ul>
          <li>Monthly spending trends</li>
          <li>Category-wise expense breakdown</li>
          <li>Year-over-year comparisons</li>
          <li>Seasonal spending patterns</li>
        </ul>

        <h3>Data Validation for Error Prevention</h3>
        <p>Ensure data accuracy with validation rules:</p>
        <ul>
          <li>Dropdown lists for categories</li>
          <li>Date validation for transactions</li>
          <li>Amount range validation</li>
          <li>Duplicate entry prevention</li>
        </ul>

        <h3>Conditional Formatting for Visual Alerts</h3>
        <p>Use color coding to highlight important information:</p>
        <ul>
          <li>Red for overspending</li>
          <li>Green for under budget</li>
          <li>Yellow for approaching limits</li>
          <li>Blue for savings goals</li>
        </ul>

        <h2>Free Excel Templates Download Center</h2>
        <p>Download all our Excel templates for free and start your financial planning journey:</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          <div className="bg-white border rounded-lg p-6 shadow-md">
            <h4 className="font-semibold mb-2">Monthly Budget Template</h4>
            <p className="text-sm text-gray-600 mb-4">Complete monthly budgeting with categories and charts</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
          </div>

          <div className="bg-white border rounded-lg p-6 shadow-md">
            <h4 className="font-semibold mb-2">Daily Expense Tracker</h4>
            <p className="text-sm text-gray-600 mb-4">Track every expense with category analysis</p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
          </div>

          <div className="bg-white border rounded-lg p-6 shadow-md">
            <h4 className="font-semibold mb-2">Family Budget Planner</h4>
            <p className="text-sm text-gray-600 mb-4">Multi-user budget for Indian families</p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
          </div>

          <div className="bg-white border rounded-lg p-6 shadow-md">
            <h4 className="font-semibold mb-2">EMI Calculator</h4>
            <p className="text-sm text-gray-600 mb-4">Loan EMI calculation with comparison</p>
            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
          </div>

          <div className="bg-white border rounded-lg p-6 shadow-md">
            <h4 className="font-semibold mb-2">Financial Goals Tracker</h4>
            <p className="text-sm text-gray-600 mb-4">Set and track multiple financial goals</p>
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
          </div>

          <div className="bg-white border rounded-lg p-6 shadow-md">
            <h4 className="font-semibold mb-2">Investment Tracker</h4>
            <p className="text-sm text-gray-600 mb-4">Track mutual funds, stocks, and SIPs</p>
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
          </div>
        </div>

        <h2>Related Calculators and Tools</h2>
        <p>Explore our comprehensive collection of financial calculators:</p>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <Link to="/calculators/emi-calculator" className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors">
            <h4 className="font-semibold text-blue-800 mb-2">EMI Calculator</h4>
            <p className="text-blue-700 text-sm">Calculate loan EMIs for home, car, and personal loans</p>
          </Link>

          <Link to="/calculators/sip-calculator" className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors">
            <h4 className="font-semibold text-green-800 mb-2">SIP Calculator</h4>
            <p className="text-green-700 text-sm">Plan your mutual fund investments with SIP</p>
          </Link>

          <Link to="/calculators/income-tax-calculator" className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors">
            <h4 className="font-semibold text-purple-800 mb-2">Income Tax Calculator</h4>
            <p className="text-purple-700 text-sm">Calculate your income tax liability for FY 2024-25</p>
          </Link>

          <Link to="/calculators/loan-prepayment-calculator" className="bg-orange-50 p-4 rounded-lg hover:bg-orange-100 transition-colors">
            <h4 className="font-semibold text-orange-800 mb-2">Loan Prepayment Calculator</h4>
            <p className="text-orange-700 text-sm">Calculate savings from early loan repayment</p>
          </Link>
        </div>

        <h2>Conclusion</h2>
        <p>Excel remains the most powerful tool for personal finance management in India. With the right templates and functions, you can automate your budgeting, track expenses, plan loans, and achieve your financial goals efficiently.</p>

        <div className="bg-gray-50 p-6 rounded-lg my-6">
          <h3 className="text-lg font-semibold mb-4">Ready to Start?</h3>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Download All Templates
            </button>
            <Link to="/calculators/emi-calculator" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center">
              <Calculator className="h-4 w-4 mr-2" />
              Try EMI Calculator
            </Link>
            <Link to="/blog" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Read More Articles
            </Link>
          </div>
        </div>

        {/* FAQ Schema for SEO */}
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </article>

      {/* Existing Search/Filter UI and Blog Grid */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Excel Tool Articles</h2>
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
    </div>
  );
};

export default ExcelTool;
