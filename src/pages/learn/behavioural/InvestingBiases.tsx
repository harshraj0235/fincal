import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const InvestingBiases: React.FC = () => (
  <>
    <SEOHelmet title="Investing Biases: Cognitive Errors Herd Mentality Confirmation Bias India 2025 | MoneyCal" description="Overcome biases. Herd mentality (buying because everyone is buying), confirmation bias (only reading news that confirms your view), recency bias, loss aversion, anchoring." keywords="investing biases India, herd mentality, confirmation bias, cognitive errors, loss aversion, निवेश पूर्वाग्रह" url="/learn/behavioural-finance-money-psychology/investing-biases-cognitive-errors-herd-mentality-confirmation-bias-india-2025" />
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/behavioural-finance-money-psychology" className="flex items-center gap-2 text-gray-600 hover:text-green-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 2 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Investing Biases: Cognitive Errors to Avoid!</h1>
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">🧠 Top 7 Investing Biases</h2>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Herd Mentality:</strong> Buying because everyone is buying. 2017 crypto bubble - everyone bought Bitcoin at ₹15L, crashed to ₹2L. Don't follow the crowd!</li>
            <li>• <strong>Confirmation Bias:</strong> Only reading news that confirms your view. If you bought a stock, you ignore bad news. Read opposing views!</li>
            <li>• <strong>Recency Bias:</strong> Believing recent trends will continue forever. Market up 30% this year? Doesn't mean it'll be up next year too!</li>
            <li>• <strong>Loss Aversion:</strong> Fear of loss is 2× stronger than joy of gain. Holding losing stocks hoping for recovery. Cut losses early!</li>
            <li>• <strong>Anchoring:</strong> Stuck on purchase price. "I bought at ₹500, I'll sell only when it reaches ₹500 again." Price doesn't remember what you paid!</li>
            <li>• <strong>Overconfidence:</strong> "I can time the market, I'm smarter." 95% fail at market timing. Be humble!</li>
            <li>• <strong>Availability Bias:</strong> Overestimating likelihood of events you recently heard about. Friend made ₹1L in options? Doesn't mean you will!</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default InvestingBiases;

