import React, { useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

type Txn = { date: string; particulars: string; debit: number; credit: number; balance?: number };

const dateRx = /\b\d{1,2}[-/]\d{1,2}[-/]\d{2,4}\b/;
const amountRx = /(?<![A-Za-z0-9])(?:₹?\s?-?)?\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?(?![A-Za-z0-9])/g;

const parsePassbook = (text: string): Txn[] => {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const out: Txn[] = [];
  for (const line of lines) {
    if (!dateRx.test(line)) continue;
    const dateMatch = line.match(dateRx)?.[0] || '';
    const rest = line.replace(dateMatch, '').trim();
    const nums = Array.from(rest.matchAll(amountRx)).map(m => m[0].replace(/[₹,\s]/g, ''));
    if (nums.length === 0) continue;
    const last = parseFloat(nums[nums.length - 1] || '0') || 0;
    let debit = 0, credit = 0;
    if (/\bDR\b|\bDebit\b/i.test(line)) debit = last; else if (/\bCR\b|\bCredit\b/i.test(line)) credit = last;
    else {
      if (/(-\d| DR\b)/i.test(line)) debit = last; else credit = last;
    }
    const particulars = rest.replace(amountRx, ' ').replace(/\s{2,}/g, ' ').trim();
    out.push({ date: dateMatch, particulars, debit, credit });
  }
  return out;
};

const OldBankPassbookPdfToExcel: React.FC = () => {
  const [txns, setTxns] = useState<Txn[]>([]);
  const [status, setStatus] = useState('Ready');

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
    for (const t of all) rows = rows.concat(parsePassbook(t));
    setTxns(rows);
    setStatus(`Parsed ${rows.length} entries`);
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(txns.length ? txns : [{ date: '', particulars: '', debit: 0, credit: 0 }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Passbook');
    XLSX.writeFile(wb, 'old-passbook.xlsx');
  };

  return (
    <>
      <SEOHelmet
        title="Old Bank Passbook PDF to Excel (Client‑side) | MoneyCal"
        description="Convert legacy passbook PDFs into a simple Excel with Date, Particulars, Debit, Credit, Balance (optional)."
        keywords="old bank passbook pdf to excel converter 2026"
        url="/finance-tools/pdf-converters/old-bank-passbook-pdf-to-excel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Old Passbook → Excel', url: '/finance-tools/pdf-converters/old-bank-passbook-pdf-to-excel' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Old Bank Passbook PDF → Excel',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Old Bank Passbook PDF → Excel</h1>
          <p className="text-gray-700 mb-6">Normalize older passbook layouts into a clean Excel. Private, fast, mobile‑friendly.</p>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">Status: {status}</div>
              <div className="flex items-center gap-3">
                <button onClick={exportExcel} disabled={txns.length===0} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50 hover:bg-indigo-700 transition-colors">Export Excel</button>
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
                id="old-passbook-pdf-input"
              />
              <label htmlFor="old-passbook-pdf-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select Passbook PDF or drag & drop here</div>
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
                      <th className="px-3 py-2 text-left">Particulars</th>
                      <th className="px-3 py-2 text-right">Debit</th>
                      <th className="px-3 py-2 text-right">Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {txns.slice(0, 200).map((r, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2 text-gray-700">{r.date}</td>
                        <td className="px-3 py-2 text-gray-700">{r.particulars}</td>
                        <td className="px-3 py-2 text-right text-gray-700">{r.debit ? r.debit.toLocaleString('en-IN') : ''}</td>
                        <td className="px-3 py-2 text-right text-gray-700">{r.credit ? r.credit.toLocaleString('en-IN') : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-6 prose-headings:font-extrabold prose-a:text-blue-700 hover:prose-a:text-blue-900">
            <h2>Old Bank Passbook PDF to Excel Converter 2026</h2>
            <p>old bank passbook pdf to excel converter 2026; legacy passbook normalizer; client‑side india.</p>
            <h3>Related Tools</h3>
            <ul>
              <li><a href="/finance-tools/pdf-converters/bank-statement-pdf-to-excel">Bank Statement PDF → Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/bank-statement-pdf-to-monthly-summary-excel">Bank Statement → Monthly Summary Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/bank-statement-upi-pdf-to-category-excel">UPI Statement → Category-wise Excel</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default OldBankPassbookPdfToExcel;

