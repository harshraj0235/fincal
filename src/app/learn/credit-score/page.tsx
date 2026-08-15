import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ChevronRight, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Credit Score - Learn Finance | MoneyCal India',
  description: 'Learn everything about credit score with MoneyCal. Free comprehensive guides, calculators, and expert tips for Indian investors.',
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-score'
  }
};

const lessons = [
          { slug: 'build-from-scratch', name: 'Build From Scratch' },
          { slug: 'check-score-free', name: 'Check Score Free' },
          { slug: 'common-mistakes', name: 'Common Mistakes' },
          { slug: 'dispute-errors', name: 'Dispute Errors' },
          { slug: 'how-calculated', name: 'How Calculated' },
          { slug: 'improve-score', name: 'Improve Score' },
          { slug: 'loan-approval', name: 'Loan Approval' },
          { slug: 'score-ranges', name: 'Score Ranges' },
          { slug: 'score-vs-report', name: 'Score Vs Report' },
          { slug: 'what-is-credit-score', name: 'What Is Credit Score' }
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Credit Score</h1>
          </div>
          <p className="text-gray-600 text-lg mt-2">Comprehensive guides and lessons on credit score in India.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {lessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/learn/credit-score/${lesson.slug}`}
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
