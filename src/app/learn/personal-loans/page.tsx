import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ChevronRight, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Personal Loans - Learn Finance | MoneyCal India',
  description: 'Learn everything about personal loans with MoneyCal. Free comprehensive guides, calculators, and expert tips for Indian investors.',
  alternates: {
    canonical: 'https://moneycal.in/learn/personal-loans'
  }
};

const lessons = [
          { slug: 'application-process', name: 'Application Process' },
          { slug: 'cibilscore-impact', name: 'Cibilscore Impact' },
          { slug: 'debt-consolidation', name: 'Debt Consolidation' },
          { slug: 'documents-required', name: 'Documents Required' },
          { slug: 'improving-approval-chances', name: 'Improving Approval Chances' },
          { slug: 'instant-loan-apps', name: 'Instant Loan Apps' },
          { slug: 'interest-rates-explained', name: 'Interest Rates Explained' },
          { slug: 'loan-closure-process', name: 'Loan Closure Process' },
          { slug: 'loan-comparison-tools', name: 'Loan Comparison Tools' },
          { slug: 'loan-fraud-protection', name: 'Loan Fraud Protection' },
          { slug: 'loan-myths-debunked', name: 'Loan Myths Debunked' },
          { slug: 'loan-refinancing', name: 'Loan Refinancing' },
          { slug: 'loan-rejection-reasons', name: 'Loan Rejection Reasons' },
          { slug: 'personal-loan-eligibility', name: 'Personal Loan Eligibility' },
          { slug: 'prepayment-options', name: 'Prepayment Options' },
          { slug: 'processing-fees', name: 'Processing Fees' },
          { slug: 'repayment-strategies', name: 'Repayment Strategies' },
          { slug: 'secured-vs-unsecured', name: 'Secured Vs Unsecured' },
          { slug: 'types-of-personal-loans', name: 'Types Of Personal Loans' },
          { slug: 'what-is-personal-loan', name: 'What Is Personal Loan' }
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Personal Loans</h1>
          </div>
          <p className="text-gray-600 text-lg mt-2">Comprehensive guides and lessons on personal loans in India.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {lessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/learn/personal-loans/${lesson.slug}`}
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
