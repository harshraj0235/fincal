const fs = require('fs');
const path = require('path');

const LEARN_DIR = path.join(__dirname, '..', 'src', 'app', 'learn');

// Map: directory name -> display name
const categories = {
  'personal-loans': 'Personal Loans',
  'home-loans': 'Home Loans',
  'credit-score': 'Credit Score',
  'credit-cards': 'Credit Cards',
  'education-loans': 'Education Loans',
  'investing': 'Investing & Wealth',
  'savings-bank': 'Savings Bank',
  'insurance': 'Insurance & Retirement',
  'taxation': 'Taxation',
  'gold-loans': 'Gold Loans',
  'vehicle-loans': 'Vehicle Loans',
  'business-loans': 'Business Loans',
  'money-management': 'Money Management',
  'advanced': 'Advanced Finance',
  'behavioural': 'Behavioural Finance',
  'fintech': 'FinTech & Digital Payments',
  'business': 'Business Finance',
  'loans': 'Loan Basics',
};

let created = 0;

for (const [dirName, displayName] of Object.entries(categories)) {
  const dirPath = path.join(LEARN_DIR, dirName);
  if (!fs.existsSync(dirPath)) {
    console.log(`SKIP: ${dirName} directory does not exist`);
    continue;
  }

  const pagePath = path.join(dirPath, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    console.log(`SKIP: ${dirName}/page.tsx already exists`);
    continue;
  }

  // Get all sub-directories (lessons)
  const lessons = fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name);

  const lessonLinks = lessons.map(slug => {
    const name = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return `          { slug: '${slug}', name: '${name.replace(/'/g, "\\'")}' }`;
  }).join(',\n');

  const pageContent = `import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ChevronRight, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: '${displayName} - Learn Finance | MoneyCal India',
  description: 'Learn everything about ${displayName.toLowerCase()} with MoneyCal. Free comprehensive guides, calculators, and expert tips for Indian investors.',
  alternates: {
    canonical: 'https://moneycal.in/learn/${dirName}'
  }
};

const lessons = [
${lessonLinks}
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">${displayName}</h1>
          </div>
          <p className="text-gray-600 text-lg mt-2">Comprehensive guides and lessons on ${displayName.toLowerCase()} in India.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {lessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={\`/learn/${dirName}/\${lesson.slug}\`}
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
`;

  fs.writeFileSync(pagePath, pageContent);
  console.log(`CREATED: ${dirName}/page.tsx (${lessons.length} lessons)`);
  created++;
}

console.log(`\nCreated ${created} index pages.`);
