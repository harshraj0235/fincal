import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ChevronRight, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Credit Cards - Learn Finance | MoneyCal India',
  description: 'Learn everything about credit cards with MoneyCal. Free comprehensive guides, calculators, and expert tips for Indian investors.',
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards'
  }
};

const lessons = [
          { slug: 'application-process', name: 'Application Process' },
          { slug: 'balance-transfer', name: 'Balance Transfer' },
          { slug: 'best-credit-cards', name: 'Best Credit Cards' },
          { slug: 'billing-cycle', name: 'Billing Cycle' },
          { slug: 'certificate', name: 'Certificate' },
          { slug: 'choose-best-card', name: 'Choose Best Card' },
          { slug: 'cibil-impact', name: 'Cibil Impact' },
          { slug: 'closure-process', name: 'Closure Process' },
          { slug: 'common-mistakes', name: 'Common Mistakes' },
          { slug: 'credit-limit', name: 'Credit Limit' },
          { slug: 'credit-vs-debit', name: 'Credit Vs Debit' },
          { slug: 'documents-required', name: 'Documents Required' },
          { slug: 'eligibility-criteria', name: 'Eligibility Criteria' },
          { slug: 'emi-on-credit-card', name: 'Emi On Credit Card' },
          { slug: 'fraud-safety', name: 'Fraud Safety' },
          { slug: 'interest-rates-charges', name: 'Interest Rates Charges' },
          { slug: 'minimum-vs-full-payment', name: 'Minimum Vs Full Payment' },
          { slug: 'rewards-cashback', name: 'Rewards Cashback' },
          { slug: 'statement-guide', name: 'Statement Guide' },
          { slug: 'types-of-credit-cards', name: 'Types Of Credit Cards' },
          { slug: 'what-is-credit-card', name: 'What Is Credit Card' }
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Link href="/learn" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
          Back to Learn
        </Link>
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Credit Cards</h1>
          </div>
          <p className="text-gray-600 text-lg mt-2">Comprehensive guides and lessons on credit cards in India.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {lessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/learn/credit-cards/${lesson.slug}`}
              className="group flex items-center justify-between p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform" />
                <span className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">{lesson.name}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
