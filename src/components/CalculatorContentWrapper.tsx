import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IndianRupee, TrendingUp, HelpCircle, Lightbulb, AlertTriangle, ArrowRight, Newspaper } from 'lucide-react';
import { contentRegistry } from '../cms-content/contentRegistry';
import { getNewsCategoryForCalculator } from '../utils/siloMapper';
import { BannerAd } from './BannerAd';

export interface Example {
  scenario: string;
  inputs: { label: string; value: string }[];
  result: string;
  explanation: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface RelatedCalculator {
  name: string;
  url: string;
  description?: string;
}

export interface CalculatorContentProps {
  title: string;
  description: string;
  benefits: string[];
  howToSteps: { step: string; details: string }[];
  examples: Example[];
  tips: string[];
  mistakes: string[];
  faqs?: FAQ[];
  relatedCalculators?: RelatedCalculator[];
  lastUpdated?: string;
  calculatorId?: string;
}

export const CalculatorContentWrapper: React.FC<CalculatorContentProps> = ({
  title,
  description,
  benefits = [],
  howToSteps = [],
  examples = [],
  tips = [],
  mistakes = [],
  faqs = [],
  relatedCalculators = [],
  lastUpdated = new Date().toISOString().split('T')[0],
  calculatorId
}) => {
  const newsCategory = calculatorId ? getNewsCategoryForCalculator(calculatorId) : undefined;
  const relatedNews = newsCategory 
    ? contentRegistry.filter(a => a.category === newsCategory).slice(0, 3)
    : [];

  const [adPositionVariant, setAdPositionVariant] = useState<number>(1);
  useEffect(() => {
    // Randomize A/B test variant between 1 and 2
    setAdPositionVariant(Math.random() > 0.5 ? 2 : 1);
  }, []);

  return (
    <div className="calculator-content-wrapper bg-white rounded-xl shadow-sm">
      {/* Introduction Section */}
      <section className="mb-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
        <div className="flex items-center gap-3 mb-4">
          <IndianRupee className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">What is {title}?</h2>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
        <div className="mt-4 text-sm text-gray-600">
          <span className="font-semibold">Last Updated:</span> {lastUpdated}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-12 px-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Why Use This Calculator?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits?.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                ✓
              </span>
              <p className="text-gray-800">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Variant 1: After Benefits */}
      {adPositionVariant === 1 && (
        <div className="mb-12 px-8">
          <BannerAd slot="7354124908" format="horizontal" className="my-4" />
        </div>
      )}

      {/* How to Use Section */}
      <section className="mb-12 px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use {title}</h2>
        <div className="space-y-6">
          {howToSteps?.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.step}</h3>
                <p className="text-gray-700">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="mb-12 px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Real-World Examples</h2>
        <div className="space-y-6">
          {examples?.map((example, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Example {idx + 1}: {example.scenario}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {example.inputs?.map((input, inputIdx) => (
                  <div key={inputIdx} className="bg-white p-3 rounded-lg">
                    <span className="text-sm font-semibold text-gray-600">{input.label}:</span>
                    <span className="ml-2 text-gray-900 font-medium">{input.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-green-100 border-2 border-green-400 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-800">Result:</span>
                  <span className="text-xl font-bold text-green-900">{example.result}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Explanation:</strong> {example.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className="mb-12 px-8">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-7 h-7 text-yellow-600" />
          <h2 className="text-2xl font-bold text-gray-900">Pro Tips for Best Results</h2>
        </div>
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <ul className="space-y-3">
            {tips?.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-yellow-400 text-yellow-900 rounded-full flex items-center justify-center text-sm font-bold">
                  💡
                </span>
                <p className="text-gray-800">{tip}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Common Mistakes Section */}
      <section className="mb-12 px-8">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-7 h-7 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900">Common Mistakes to Avoid</h2>
        </div>
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
          <ul className="space-y-3">
            {mistakes?.map((mistake, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  ✕
                </span>
                <p className="text-gray-800">{mistake}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ad Variant 2: Before FAQs */}
      {adPositionVariant === 2 && (
        <div className="mb-12 px-8">
          <BannerAd slot="9384728103" format="auto" className="my-4" />
        </div>
      )}

      {/* FAQs Section */}
      <section className="mb-12 px-8">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-7 h-7 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs?.map((faq, idx) => (
            <div key={idx} className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-xl">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">
                Q{idx + 1}: {faq.question}
              </h3>
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Calculators Section */}
      <section className="mb-8 px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators You Might Need</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedCalculators?.map((calc, idx) => (
            <Link
              key={idx}
              to={calc.url}
              className="block p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-transparent hover:border-blue-400 transition-all duration-200 hover:shadow-lg group"
            >
              <div className="flex items-center justify-between mb-2">
                <IndianRupee className="w-6 h-6 text-blue-600" />
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                {calc.name}
              </h3>
              {calc.description && (
                <p className="text-sm text-gray-600">{calc.description}</p>
              )}
            </Link>
          ))}
        </div>
      </section>
      
      {/* Related News (Semantic Silo) */}
      {relatedNews.length > 0 && (
        <section className="mb-12 px-8 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Newspaper className="w-7 h-7 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Latest {newsCategory} News</h2>
            </div>
            <Link to={`/news/${newsCategory}`} className="text-blue-600 font-bold flex items-center gap-1 hover:underline">
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNews.map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.category}/${article.slug}`}
                className="group flex flex-col bg-slate-50 rounded-2xl overflow-hidden hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-blue-100"
              >
                <div className="h-32 overflow-hidden">
                  <img
                    src={article.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <div className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {article.datePublished}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <section className="px-8 pb-8">
        <div className="bg-gray-100 border-l-4 border-gray-400 p-6 rounded-r-xl">
          <p className="text-sm text-gray-700">
            <strong className="font-semibold">Disclaimer:</strong> This Calculator provides estimates for informational purposes only.
            Results may vary based on individual circumstances. Please consult with a qualified financial advisor before making any
            financial decisions. MoneyCal India is not responsible for any financial decisions made based on Calculator results.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CalculatorContentWrapper;

