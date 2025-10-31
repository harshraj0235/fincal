import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const ValueVsGrowth: React.FC = () => (
  <>
    <SEOHelmet title="Value vs Growth Investing: Warren Buffett Strategy India | MoneyCal" description="Learn value investing vs growth investing. Which works in India? Buffett principles applied." keywords="value investing India, growth investing, Warren Buffett, stock picking strategy, वैल्यू निवेश" url="/learn/investing-wealth/value-investing-vs-growth-investing-warren-buffett-strategy-india" />
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-green-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 8 of 10</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Value vs Growth Investing</h1>
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">📈 Two Philosophies</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="bg-white/20 p-4 rounded-lg">
              <strong className="block mb-2">Value Investing (Buffett)</strong>
              <ul className="space-y-1">
                <li>• Buy undervalued good companies</li>
                <li>• Hold 10-20 years</li>
                <li>• Focus: P/E, book value, dividends</li>
              </ul>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <strong className="block mb-2">Growth Investing</strong>
              <ul className="space-y-1">
                <li>• Buy high-growth companies</li>
                <li>• Hold 3-7 years</li>
                <li>• Focus: Revenue growth, market share</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ValueVsGrowth;



