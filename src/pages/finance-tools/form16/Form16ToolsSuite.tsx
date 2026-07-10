import React from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../../components/SEOHelmet';

const tools = [
  {
    title: 'Form 16 Part A & B → Excel',
    url: '/finance-tools/pdf-converters/form16-part-ab-pdf-to-excel',
    description: 'Extract TAN, PAN, AY, salary heads, deductions and tax into a clean two‑column Excel.'
  },
  {
    title: 'Form 16 → ITR Input Excel',
    url: '/finance-tools/pdf-converters/form16-pdf-to-itr-input-excel',
    description: 'Map only the essentials for ITR: PAN, AY, income from salary, VI‑A, tax, cess, TDS.'
  },
  {
    title: 'Form 16 Multi‑Year → Tax History',
    url: '/finance-tools/pdf-converters/form16-multiple-years-to-tax-history',
    description: 'Drop multiple years to compile year‑over‑year income, deductions, tax, and TDS.'
  },
  {
    title: 'Salary Slip + Form 16 → Combined Excel',
    url: '/finance-tools/pdf-converters/salary-slip-plus-form16-to-excel',
    description: 'Create a single workbook with separate sheets from a slip and a Form 16.'
  },
  {
    title: 'Excel Salary Data → PDF Payslip',
    url: '/finance-tools/pdf-converters/excel-salary-data-to-payslip-pdf',
    description: 'Render each Excel row into a standardized payslip PDF locally.'
  }
];

const Form16ToolsSuite: React.FC = () => {
  const faq = [
    { question: 'Private processing?', answer: 'Yes. All parsing and generation run in your browser, with no uploads.' },
    { question: 'Scanned PDFs?', answer: 'Use OCR first to obtain selectable text before parsing.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Form 16 Tools Suite | MoneyCal"
        description="Explore client‑side Form 16 and salary tools: extract to Excel, ITR input templates, multi‑year histories, combined sheets, and payslip PDFs."
        keywords="Form 16 tools suite, Part A & B to Excel, ITR input, multi-year tax history, salary slip pdf"
        url="/finance-tools/pdf-converters/form16-suite"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Form 16 Tools Suite', url: '/finance-tools/pdf-converters/form16-suite' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Form 16 Tools Suite',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: tools.length,
              itemListElement: tools.map((t, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `https://moneycal.in${t.url}`,
                name: t.title
              }))
            }
          }
        ]}
        faqData={faq}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Form 16 Tools Suite</h1>
          <p className="text-gray-700 mb-8">Client‑side utilities for extracting, mapping, and generating documents from Form 16 and salary data.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((t) => (
              <Link key={t.url} to={t.url} className="block bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="text-lg font-semibold text-gray-900">{t.title}</div>
                <div className="text-sm text-gray-600 mt-2">{t.description}</div>
                <div className="mt-4 inline-block px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold">Open</div>
              </Link>
            ))}
          </div>
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-8">
            <h2>Introduction</h2>
            <p>This suite organizes the most common Form 16 tasks into focused tools. Each tool keeps a simple, consistent flow: what the tool is, how it works, key features, benefits, and exact steps.</p>
            <h2>How It Works</h2>
            <p>All parsing and generation happen locally using browser libraries for PDF text extraction, Excel I/O, and PDF rendering. No documents leave your device.</p>
            <h2>Benefits</h2>
            <ul>
              <li>Fast, private, and mobile‑friendly</li>
              <li>Actionable exports for ITR prep and reconciliation</li>
              <li>Flexible parsing modes for varied PDFs</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form16ToolsSuite;
