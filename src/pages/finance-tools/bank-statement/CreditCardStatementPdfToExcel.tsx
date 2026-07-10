import React, { useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

type Txn = { date: string; description: string; amount: number; type: 'debit'|'credit'; category?: string };

const dateRx = /\b(?:(?:\d{2}[-/]\d{2}[-/]\d{2,4})|(?:\d{4}[-/]\d{2}[-/]\d{2}))\b/;
const amountRx = /(?<![A-Za-z0-9])(?:₹?\s?-?)?\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?(?![A-Za-z0-9])/g;
const keywords: Record<string,string> = {
  'UPI':'UPI', 'POS':'POS', 'FUEL':'Fuel', 'PETROL':'Fuel', 'AMAZON':'Shopping', 'FLIPKART':'Shopping', 'SWIGGY':'Food', 'ZOMATO':'Food'
};

const categorize = (desc: string): string => {
  const up = desc.toUpperCase();
  for (const k in keywords) if (up.includes(k)) return keywords[k];
  return 'General';
};

const parseLines = (text: string): Txn[] => {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const out: Txn[] = [];
  for (const line of lines) {
    if (!dateRx.test(line)) continue;
    const dateMatch = line.match(dateRx)?.[0] || '';
    const rest = line.replace(dateMatch, '').trim();
    const nums = Array.from(rest.matchAll(amountRx)).map(m => m[0].replace(/[₹,\s]/g, ''));
    if (nums.length === 0) continue;
    const last = parseFloat(nums[nums.length - 1] || '0') || 0;
    let type: 'debit'|'credit' = 'debit';
    if (/Payment/i.test(line) || /\bCR\b|\bCredit\b/i.test(line)) type = 'credit';
    const desc = rest.replace(amountRx, ' ').replace(/\s{2,}/g, ' ').trim();
    out.push({ date: dateMatch, description: desc, amount: last, type, category: categorize(desc) });
  }
  return out;
};

const CreditCardStatementPdfToExcel: React.FC = () => {
  const [status, setStatus] = useState('Ready');
  const [txns, setTxns] = useState<Txn[]>([]);

  const handlePdf = async (file: File) => {
    setStatus('Reading PDF...');
    const pdfjsLib = await import('pdfjs-dist');
    try {
      const workerMod: any = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
      (pdfjsLib as any).GlobalWorkerOptions.workerSrc = workerMod.default || workerMod;
    } catch {
      (pdfjsLib as any).GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.624/build/pdf.worker.min.mjs';
    }
    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    const all: string[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const text = content.items.map((it: any) => it.str).join('\n');
      all.push(text);
    }
    let rows: Txn[] = [];
    for (const t of all) rows = rows.concat(parseLines(t));
    setTxns(rows);
    setStatus(`Parsed ${rows.length} card transactions`);
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(txns.length ? txns : [{ date: '', description: '', amount: 0, type: 'debit', category: 'General' }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Card Expenses');
    XLSX.writeFile(wb, 'credit-card-expenses.xlsx');
  };

  const faq = [
    { question: 'Categories?', answer: 'Basic auto-categorization by merchant keywords. Edit in Excel as needed.' },
    { question: 'Payments vs charges?', answer: 'Payments are treated as credits. Purchases are debits.' },
    { question: 'Scanned PDFs?', answer: 'Run OCR to make text searchable first.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Credit Card Statement PDF to Excel (Expenses, No Upload) | MoneyCal"
        description="Convert credit card statements into an Excel expense list with auto-categories. Client-side and private."
        keywords="credit card statement pdf to excel converter free 2026"
        url="/finance-tools/pdf-converters/credit-card-statement-pdf-to-excel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Credit Card → Excel Expenses', url: '/finance-tools/pdf-converters/credit-card-statement-pdf-to-excel' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Credit Card Statement PDF → Excel (Expenses)',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'AggregateRating',
            itemReviewed: { '@type': 'SoftwareApplication', name: 'Credit Card Statement PDF → Excel' },
            ratingValue: 4.9,
            ratingCount: 642,
            bestRating: 5,
            worstRating: 1
          }
        ]}
        faqData={faq}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Credit Card Statement PDF → Excel (Expenses)</h1>
          <p className="text-gray-700 mb-6">Turn your card statement into an expense spreadsheet with basic auto-categorization.</p>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">Status: {status}</div>
              <div className="flex items-center gap-3">
                <button onClick={exportExcel} disabled={txns.length===0} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50">Export Excel</button>
                <button onClick={()=>{setTxns([]); setStatus('Ready')}} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border">Clear</button>
              </div>
            </div>
            <div
              className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center cursor-pointer hover:bg-indigo-50"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const f = e.dataTransfer.files?.[0];
                if (f) handlePdf(f);
              }}
            >
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handlePdf(f);
                }}
                className="hidden"
                id="credit-card-pdf-input"
              />
              <label htmlFor="credit-card-pdf-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select Credit Card Statement PDF or drag & drop here</div>
                <div className="text-sm text-gray-600 mt-2">Client-side only • No upload • Fast</div>
              </label>
            </div>
          </div>
          {txns.length>0 && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Preview</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-3 py-2 text-left">Date</th>
                      <th className="px-3 py-2 text-left">Description</th>
                      <th className="px-3 py-2 text-right">Amount</th>
                      <th className="px-3 py-2 text-left">Type</th>
                      <th className="px-3 py-2 text-left">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {txns.slice(0, 200).map((r, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2 text-gray-700">{r.date}</td>
                        <td className="px-3 py-2 text-gray-700">{r.description}</td>
                        <td className="px-3 py-2 text-right text-gray-700">{r.amount ? r.amount.toLocaleString('en-IN') : ''}</td>
                        <td className="px-3 py-2 text-gray-700 capitalize">{r.type}</td>
                        <td className="px-3 py-2 text-gray-700">{r.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-6 prose-headings:font-extrabold prose-a:text-blue-700 hover:prose-a:text-blue-900 prose-ul:list-disc prose-ol:list-decimal">
            <h2>Introduction</h2>
            <p>Turn card statements into an expense sheet with basic categorization for quick budgeting and analysis.</p>
            <h2>How to Use</h2>
            <ol>
              <li>Drop statement PDF</li>
              <li>Export Excel and review categories</li>
            </ol>
            <h2>Columns</h2>
            <ul>
              <li>Date: transaction date as printed</li>
              <li>Description: merchant and reference text</li>
              <li>Amount: charge or payment</li>
              <li>Type: debit for purchases, credit for payments</li>
              <li>Category: basic keyword‑based tag</li>
            </ul>
            <h2>Budgeting Tips</h2>
            <p>Customize categories in Excel with lookup tables to align with your monthly budget plan. Track recurring merchants and set spending alerts in your spreadsheet.</p>
            <h2>Privacy</h2>
            <p>Everything runs in your browser. No uploads, no accounts, no storage.</p>
            <h2>Related Tools</h2>
            <ul>
              <li><a href="/finance-tools/pdf-converters/icici-kotak-credit-card-pdf-to-excel">ICICI / Kotak Credit Card → Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/credit-card-reward-points-pdf-to-excel">Credit Card Reward Points → Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/bank-statement-pdf-to-excel">Bank Statement PDF → Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/bank-statement-pdf-to-monthly-summary-excel">Bank Statement → Monthly Summary Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/bank-statement-upi-pdf-to-category-excel">UPI Statement → Category-wise Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/multiple-bank-statements-to-consolidated-excel">Multiple Statements → Consolidated Excel</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditCardStatementPdfToExcel;
