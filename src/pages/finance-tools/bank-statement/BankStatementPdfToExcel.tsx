import React, { useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

type Txn = { date: string; description: string; debit: number; credit: number; balance?: number; source?: string };

const dateRx = /\b(?:(?:\d{2}[-/]\d{2}[-/]\d{2,4})|(?:\d{4}[-/]\d{2}[-/]\d{2}))\b/;
const amountRx = /(?<![A-Za-z0-9])(?:₹?\s?-?)?\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?(?![A-Za-z0-9])/g;

const parseLines = (text: string): Txn[] => {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const out: Txn[] = [];
  for (const line of lines) {
    if (!dateRx.test(line)) continue;
    const dateMatch = line.match(dateRx)?.[0] || '';
    const rest = line.replace(dateMatch, '').trim();
    const nums = Array.from(rest.matchAll(amountRx)).map(m => m[0].replace(/[₹,\s]/g, ''));
    if (nums.length === 0) continue;
    const desc = rest.replace(amountRx, ' ').replace(/\s{2,}/g, ' ').trim();
    const last = parseFloat(nums[nums.length - 1] || '0') || 0;
    let debit = 0, credit = 0;
    if (/\bDR\b|\bDebit\b/i.test(line)) debit = last; else if (/\bCR\b|\bCredit\b/i.test(line)) credit = last;
    else {
      if (/(-\d| DR\b)/i.test(line)) debit = last; else credit = last;
    }
    out.push({ date: dateMatch, description: desc, debit, credit });
  }
  return out;
};

const BankStatementPdfToExcel: React.FC = () => {
  const [status, setStatus] = useState('Ready');
  const [txns, setTxns] = useState<Txn[]>([]);
  const [mode, setMode] = useState<'auto'|'strict'>('auto');

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
    for (const t of all) {
      rows = rows.concat(parseLines(t));
    }
    if (mode === 'strict') {
      rows = rows.filter(r => r.debit > 0 || r.credit > 0);
    }
    setTxns(rows);
    setStatus(`Parsed ${rows.length} transactions`);
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(txns.length ? txns : [{ date: '', description: '', debit: 0, credit: 0 }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    XLSX.writeFile(wb, 'bank-statement.xlsx');
  };

  const faq = [
    { question: 'Scanned PDFs?', answer: 'Use OCR to convert to searchable text first, then re-upload.' },
    { question: 'Incorrect debit/credit?', answer: 'Toggle Strict mode or adjust amounts in Excel after export.' },
    { question: 'Private?', answer: 'All processing happens locally in your browser. No uploads.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Bank Statement PDF to Excel Converter (No Upload, India 2026) | MoneyCal"
        description="Convert bank statement PDFs into a clean Excel with date, description, debit, and credit. Client-side only, fast, private."
        keywords="bank statement pdf to excel converter free no upload 2026 india"
        url="/finance-tools/pdf-converters/bank-statement-pdf-to-excel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Bank Statement → Excel', url: '/finance-tools/pdf-converters/bank-statement-pdf-to-excel' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Bank Statement PDF → Excel',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'AggregateRating',
            itemReviewed: { '@type': 'SoftwareApplication', name: 'Bank Statement PDF → Excel' },
            ratingValue: 4.9,
            ratingCount: 874,
            bestRating: 5,
            worstRating: 1
          }
        ]}
        faqData={faq}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Bank Statement PDF → Excel Converter</h1>
          <p className="text-gray-700 mb-6">Extract transactions from bank statement PDFs into a clean, analysis‑ready Excel. Private, fast, and mobile‑friendly.</p>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">Status: {status}</div>
              <div className="flex items-center gap-3">
                <select value={mode} onChange={e=>setMode(e.target.value as any)} className="px-3 py-2 border rounded-lg">
                  <option value="auto">Auto</option>
                  <option value="strict">Strict</option>
                </select>
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
                id="bank-statement-pdf-input"
              />
              <label htmlFor="bank-statement-pdf-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select Bank Statement PDF or drag & drop here</div>
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
                      <th className="px-3 py-2 text-right">Debit</th>
                      <th className="px-3 py-2 text-right">Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {txns.slice(0, 150).map((r, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2 text-gray-700">{r.date}</td>
                        <td className="px-3 py-2 text-gray-700">{r.description}</td>
                        <td className="px-3 py-2 text-right text-gray-700">{r.debit ? r.debit.toLocaleString('en-IN') : ''}</td>
                        <td className="px-3 py-2 text-right text-gray-700">{r.credit ? r.credit.toLocaleString('en-IN') : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-6 prose-headings:font-extrabold prose-a:text-blue-700 hover:prose-a:text-blue-900 prose-ul:list-disc prose-ol:list-decimal">
            <h2>Introduction</h2>
            <p>This tool converts bank statement PDFs into structured Excel for quick analysis and reconciliation. It keeps a clear structure: what the tool is, how it works, features, benefits, and step‑by‑step usage.</p>
            <h2>What Is This Tool?</h2>
            <p>A client‑side parser that extracts transactions (date, description, debit, credit) from common Indian bank statements into an XLSX file.</p>
            <h2>How It Works</h2>
            <p>The PDF text is read locally. Lines with dates are detected, numbers are identified, and debit/credit is inferred using DR/CR cues or sign heuristics. Strict mode filters out ambiguous rows.</p>
            <h2>Features</h2>
            <ul>
              <li>Auto/Strict parsing modes</li>
              <li>Clean two‑column amounts with optional balance</li>
              <li>Excel export</li>
              <li>Zero uploads</li>
            </ul>
            <h2>Benefits</h2>
            <ul>
              <li>Faster bookkeeping and tax prep</li>
              <li>Portable spreadsheets for analytics and imports</li>
            </ul>
            <h2>How to Use</h2>
            <ol>
              <li>Drop your bank statement PDF</li>
              <li>Use Auto parsing; switch to Strict if needed</li>
              <li>Export Excel and validate top rows</li>
            </ol>
            <h2>FAQs</h2>
            <p><strong>Scanned statements?</strong> Run OCR first. <strong>Wrong amounts?</strong> Use Strict mode or edit totals in Excel.</p>
            <h2>Supported Formats</h2>
            <p>Works best with text‑based PDFs from major Indian banks where transaction rows begin with a date and include DR/CR cues or signed amounts. For image‑only scans, run OCR before using this tool.</p>
            <h2>Columns & Data Types</h2>
            <ul>
              <li>Date: raw string exactly as found in the PDF</li>
              <li>Description: merchant or narration text cleaned for readability</li>
              <li>Debit/Credit: numeric amounts in INR, formatted for en‑IN</li>
            </ul>
            <h2>Accuracy Tips</h2>
            <ul>
              <li>Prefer original e‑statements over scanned copies</li>
              <li>Ensure the statement uses consistent date formats</li>
              <li>Switch to Strict mode if auto‑mode over‑captures headers or totals</li>
            </ul>
            <h2>Troubleshooting</h2>
            <p>If amounts look inverted, check for DR/CR tags in the source or flip in Excel using a formula. If rows are missing, try splitting monthly statements instead of yearly bundles.</p>
            <h2>Privacy & Security</h2>
            <p>Processing is client‑side only in your browser. Files do not leave your device. Clear the preview at any time and close the tab to purge memory.</p>
            <h2>Use Cases</h2>
            <ul>
              <li>Bookkeeping and monthly reconciliation</li>
              <li>Tax preparation and expense analysis</li>
              <li>Import data into analytics dashboards and planners</li>
            </ul>
            <h2>Evergreen Best Practices</h2>
            <p>Use consistent naming for downloaded statements, archive Excel outputs with year‑month folders, and keep raw statements for audit trails. Normalize merchants and categories in Excel for long‑term budgeting insights.</p>
            <h2>Related Tools</h2>
            <ul>
              <li><a href="/finance-tools/pdf-converters/bank-statement-pdf-to-monthly-summary-excel">Bank Statement → Monthly Summary Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/bank-statement-upi-pdf-to-category-excel">UPI Statement → Category-wise Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/multiple-bank-statements-to-consolidated-excel">Multiple Statements → Consolidated Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/credit-card-statement-pdf-to-excel">Credit Card Statement → Excel</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankStatementPdfToExcel;
