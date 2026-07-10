import React, { useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

type Txn = { source: string; date: string; description: string; debit: number; credit: number };

const dateRx = /\b(?:(?:\d{2}[-/]\d{2}[-/]\d{2,4})|(?:\d{4}[-/]\d{2}[-/]\d{2}))\b/;
const amountRx = /(?<![A-Za-z0-9])(?:₹?\s?-?)?\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?(?![A-Za-z0-9])/g;

const parseLines = (text: string, source: string): Txn[] => {
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
    else { if (/(-\d| DR\b)/i.test(line)) debit = last; else credit = last; }
    out.push({ source, date: dateMatch, description: desc, debit, credit });
  }
  return out;
};

const MultipleBankStatementsToConsolidatedExcel: React.FC = () => {
  const [status, setStatus] = useState('Ready');
  const [txns, setTxns] = useState<Txn[]>([]);

  const handlePdfs = async (files: FileList) => {
    const pdfjsLib = await import('pdfjs-dist');
    try {
      const workerMod: any = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
      (pdfjsLib as any).GlobalWorkerOptions.workerSrc = workerMod.default || workerMod;
    } catch {
      (pdfjsLib as any).GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.624/build/pdf.worker.min.mjs';
    }
    const allRows: Txn[] = [];
    setStatus(`Reading ${files.length} PDFs...`);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const buf = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      const pages: string[] = [];
      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);
        const content = await page.getTextContent();
        pages.push(content.items.map((it: any) => it.str).join('\n'));
      }
      for (const t of pages) {
        allRows.push(...parseLines(t, file.name));
      }
    }
    setTxns(allRows);
    setStatus(`Parsed ${allRows.length} total transactions`);
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(txns.length ? txns : [{ source: '', date: '', description: '', debit: 0, credit: 0 }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Consolidated');
    XLSX.writeFile(wb, 'consolidated-bank-statements.xlsx');
  };

  const faq = [
    { question: 'Multiple months/banks?', answer: 'Yes. Drop all PDFs; the Source column keeps file provenance for filtering.' },
    { question: 'Scanned PDFs?', answer: 'Run OCR to make them searchable, then re-upload.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Multiple Bank Statements PDF to Consolidated Excel (Client‑side) | MoneyCal"
        description="Drop multiple bank statements and export a consolidated Excel with all transactions. Private and fast."
        keywords="multiple bank statements pdf to excel converter"
        url="/finance-tools/pdf-converters/multiple-bank-statements-to-consolidated-excel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Multiple Statements → Consolidated Excel', url: '/finance-tools/pdf-converters/multiple-bank-statements-to-consolidated-excel' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Multiple Statements PDF → Consolidated Excel',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          }
        ]}
        faqData={faq}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Multiple Bank Statements → Consolidated Excel</h1>
          <p className="text-gray-700 mb-6">Batch process statements to create a single workbook with all transactions and source filenames.</p>
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
                const files = e.dataTransfer.files;
                if (files && files.length) handlePdfs(files);
              }}
            >
              <input
                type="file"
                accept="application/pdf"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length) handlePdfs(files);
                }}
                className="hidden"
                id="multi-bank-pdf-input"
              />
              <label htmlFor="multi-bank-pdf-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select multiple PDFs or drag & drop here</div>
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
                      <th className="px-3 py-2 text-left">Source</th>
                      <th className="px-3 py-2 text-left">Date</th>
                      <th className="px-3 py-2 text-left">Description</th>
                      <th className="px-3 py-2 text-right">Debit</th>
                      <th className="px-3 py-2 text-right">Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {txns.slice(0, 200).map((r, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2 text-gray-700">{r.source}</td>
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
            <p>Build a consolidated transaction workbook from multiple bank statement PDFs in one go. Ideal for reconciliation and tax season.</p>
            <h2>How to Use</h2>
            <ol>
              <li>Select or drop all PDFs</li>
              <li>Review preview rows and export Excel</li>
              <li>Filter by Source in Excel to analyze by account or month</li>
            </ol>
            <h2>Best Practices</h2>
            <ul>
              <li>Group statements by client or account in labeled folders</li>
              <li>Export separate tabs by month after consolidation for reporting</li>
              <li>Keep raw PDFs for audit trails</li>
            </ul>
            <h2>Scanned PDFs</h2>
            <p>Use OCR to convert scans into searchable PDFs before consolidation to improve detection accuracy.</p>
            <h2>Related Tools</h2>
            <ul>
              <li><a href="/finance-tools/pdf-converters/bank-statement-pdf-to-excel">Bank Statement PDF → Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/bank-statement-upi-pdf-to-category-excel">UPI Statement → Category-wise Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/bank-statement-pdf-to-monthly-summary-excel">Monthly Summary Excel</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultipleBankStatementsToConsolidatedExcel;
