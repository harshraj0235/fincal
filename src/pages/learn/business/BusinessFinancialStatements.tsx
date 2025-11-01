import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Award } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const BusinessFinancialStatements: React.FC = () => (
  <>
    <SEOHelmet title="Business Financial Statements: Profit Loss Balance Sheet Cash Flow India Guide | MoneyCal" description="Understand financials. P&L statement (revenue, expenses, net profit), balance sheet (assets, liabilities, equity), cash flow statement, financial ratios." keywords="financial statements India, P&L statement, balance sheet, cash flow statement, financial ratios, वित्तीय विवरण" url="/learn/business-finance-entrepreneurship/business-financial-statements-profit-loss-balance-sheet-cash-flow-india-guide" />
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/business-finance-entrepreneurship" className="flex items-center gap-2 text-gray-600 hover:text-yellow-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 7 of 7 - FINAL!</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Financial Statements: Read Your Business Health!</h1>
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">📊 3 Key Financial Statements</h2>
          <ul className="space-y-2 text-sm">
            <li>• <strong>P&L (Profit & Loss):</strong> Revenue - Expenses = Net Profit. Shows profitability over period (monthly/yearly).</li>
            <li>• <strong>Balance Sheet:</strong> Assets = Liabilities + Equity. Snapshot of what you own vs owe at a point in time.</li>
            <li>• <strong>Cash Flow Statement:</strong> Cash In - Cash Out = Net Cash Flow. Shows actual money movement (not just paper profit).</li>
          </ul>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">🎉 Business Finance & Entrepreneurship Category Complete!</h2>
          <p className="text-xl mb-6">You've mastered all 7 lessons on building & scaling a business in India!</p>
          <Link to="/learn" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
            Explore More Categories <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default BusinessFinancialStatements;





