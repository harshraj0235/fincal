import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, TrendingUp, DollarSign, Briefcase, Globe2 } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';


const tools = [
  {
    slug: 'monthly-budget-tracker',
    title: 'Comprehensive Monthly Budget Tracker',
    description: 'Track income, fixed/variable expenses, and savings goals. Visualize your spending with charts.',
    icon: <BarChart2 className="w-8 h-8 text-blue-600" />,
  },
  {
    slug: 'debt-payoff-calculator',
    title: 'Debt Payoff Calculator',
    description: 'Input multiple debts and interest rates. Calculate the fastest payoff using snowball/avalanche strategies.',
    icon: <TrendingUp className="w-8 h-8 text-green-600" />,
  },
  {
    slug: 'investment-portfolio-tracker',
    title: 'Investment Portfolio Tracker',
    description: 'Monitor stocks, mutual funds, and more. Input purchase price, value, dividends, and calculate returns.',
    icon: <DollarSign className="w-8 h-8 text-yellow-600" />,
  },
  {
    slug: 'net-worth-calculator',
    title: 'Net Worth Calculator',
    description: 'List all assets and liabilities to calculate your current net worth. Simple and effective.',
    icon: <Briefcase className="w-8 h-8 text-purple-600" />,
  },
  {
    slug: 'vacation-budget-planner',
    title: 'Vacation Budget Planner',
    description: 'Plan and track trip expenses: flights, accommodation, food, and activities. Stay on budget!',
    icon: <Globe2 className="w-8 h-8 text-pink-600" />,
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Excel Tool Hub - Personal Finance & Budgeting",
  "description": "Explore interactive, export-capable Excel tools for budgeting, debt payoff, investments, net worth, and vacation planning. SEO-optimized, device-friendly, and collaborative.",
  "url": "/excel-tool",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": tools.length,
    "itemListElement": tools.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": tool.title,
        "description": tool.description,
        "url": `/excel-tools/${tool.slug}`,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Microsoft Excel",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" }
      }
    }))
  }
};

const ExcelToolHub: React.FC = () => {
  return (
    <>
      <WhatsAppBanner />
      <SEOHelmet
        title="Excel Tool Hub - Personal Finance & Budgeting | Moneycal.in"
        description="Explore interactive, export-capable Excel tools for budgeting, debt payoff, investments, net worth, and vacation planning. SEO-optimized, device-friendly, and collaborative."
        url="/excel-tool"
        structuredData={structuredData}
        tags={["excel tool", "budget tracker", "debt payoff", "investment tracker", "net worth calculator", "vacation planner"]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-800 mb-6 drop-shadow-lg">Excel Tool Hub</h1>
        <p className="text-lg md:text-xl text-blue-700 text-center mb-10 max-w-2xl">Build, analyze, and export your personal finance data with our interactive, collaborative Excel tools. SEO-optimized, device-friendly, and easy for everyone!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          {tools.map(tool => (
            <div key={tool.slug} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-shadow">
              <div className="mb-4">{tool.icon}</div>
              <h2 className="text-xl font-bold text-blue-900 mb-2 text-center">{tool.title}</h2>
              <p className="text-blue-700 text-center mb-4">{tool.description}</p>
              <Link to={`/excel-tools/${tool.slug}`} className="mt-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors">Open</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExcelToolHub; 
