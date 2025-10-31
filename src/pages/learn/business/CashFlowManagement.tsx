import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const CashFlowManagement: React.FC = () => (
  <>
    <SEOHelmet title="Cash Flow Management: Manage Receivables Payables Working Capital India | MoneyCal" description="Master cash flow. Cash flow statement, managing receivables (30-90 day payment terms), payables optimization, working capital cycle, cash runway." keywords="cash flow management India, receivables, payables, working capital, cash runway, कैश फ्लो प्रबंधन" url="/learn/business-finance-entrepreneurship/cash-flow-management-business-receivables-payables-working-capital-india" />
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/business-finance-entrepreneurship" className="flex items-center gap-2 text-gray-600 hover:text-purple-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 3 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Cash Flow Management: The Lifeline of Business!</h1>
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">💡 Cash Flow = Revenue - Expenses (timing matters!)</h2>
          <p className="mb-4">You can be profitable but still run out of cash! Why? Because customers pay in 30-90 days, but you need to pay salaries/vendors NOW.</p>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Working Capital Cycle:</strong> Days between paying suppliers and receiving customer payments. Shorter = better cash flow.</li>
            <li>• <strong>Cash Runway:</strong> Months you can survive with current cash. Example: ₹10L cash, ₹2L/month burn = 5 months runway.</li>
            <li>• <strong>Manage Receivables:</strong> Give 30-day credit (not 90). Follow up aggressively. Use invoice discounting (get 80% cash instantly).</li>
            <li>• <strong>Manage Payables:</strong> Negotiate 45-60 day payment terms with suppliers. Pay on last day (use their credit as free financing).</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default CashFlowManagement;


