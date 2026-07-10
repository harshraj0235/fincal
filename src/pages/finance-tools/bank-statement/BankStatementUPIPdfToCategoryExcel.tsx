import React, { useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

type Txn = { date: string; description: string; debit: number; credit: number; category: string };

const dateRx = /\b(?:(?:\d{2}[-/]\d{2}[-/]\d{2,4})|(?:\d{4}[-/]\d{2}[-/]\d{2}))\b/;
const amountRx = /(?<![A-Za-z0-9])(?:₹?\s?-?)?\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?(?![A-Za-z0-9])/g;

const categorize = (desc: string) => {
  const d = desc.toUpperCase();
  if (/UPI/.test(d)) return 'UPI';
  if (/IMPS/.test(d)) return 'IMPS';
  if (/NEFT/.test(d)) return 'NEFT';
  if (/(POS|CARD|ECOM)/.test(d)) return 'Card/POS';
  if (/ATM/.test(d)) return 'ATM';
  if (/(CHG|FEE|GST|CHARGES)/.test(d)) return 'Charges';
  if (/INT|INTEREST/.test(d)) return 'Interest';
  if (/REVERSAL|REFUND/.test(d)) return 'Reversal/Refund';
  return 'Other';
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
    const desc = rest.replace(amountRx, ' ').replace(/\s{2,}/g, ' ').trim();
    const last = parseFloat(nums[nums.length - 1] || '0') || 0;
    let debit = 0, credit = 0;
    if (/\bDR\b|\bDEBIT\b/i.test(line)) debit = last; else if (/\bCR\b|\bCREDIT\b/i.test(line)) credit = last;
    else {
      if (/(-\d| DR\b)/i.test(line)) debit = last; else credit = last;
    }
    const category = categorize(desc);
    out.push({ date: dateMatch, description: desc, debit, credit, category });
  }
  return out;
};

const BankStatementUPIPdfToCategoryExcel: React.FC = () => {
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
    setStatus(`Parsed ${rows.length} transactions`);
  };

  const exportExcel = () => {
    const ws1 = XLSX.utils.json_to_sheet(txns.length ? txns : [{ date: '', description: '', debit: 0, credit: 0, category: '' }]);
    const summaryMap: Record<string, { debit: number; credit: number; count: number }> = {};
    txns.forEach(t => {
      summaryMap[t.category] = summaryMap[t.category] || { debit: 0, credit: 0, count: 0 };
      summaryMap[t.category].debit += t.debit || 0;
      summaryMap[t.category].credit += t.credit || 0;
      summaryMap[t.category].count += 1;
    });
    const summary = Object.entries(summaryMap).map(([category, v]) => ({
      Category: category,
      Debit: v.debit,
      Credit: v.credit,
      Net: v.credit - v.debit,
      Count: v.count
    }));
    const ws2 = XLSX.utils.json_to_sheet(summary);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, 'Transactions');
    XLSX.utils.book_append_sheet(wb, ws2, 'CategorySummary');
    XLSX.writeFile(wb, 'upi-category-transactions.xlsx');
  };

  const faq = [
    { question: 'What categories are used?', answer: 'UPI, NEFT, IMPS, Card/POS, ATM, Charges, Interest, Reversal/Refund, Other.' },
    { question: 'Privacy?', answer: 'All processing is done locally in your browser. No uploads.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Bank Statement with UPI PDF to Category-wise Excel (Client‑side) | MoneyCal"
        description="Convert bank statement PDF to Excel with category tagging for UPI, NEFT, IMPS, POS, charges and more."
        keywords="bank statement upi pdf to category excel converter, india 2026"
        url="/finance-tools/pdf-converters/bank-statement-upi-pdf-to-category-excel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'UPI Statement → Category Excel', url: '/finance-tools/pdf-converters/bank-statement-upi-pdf-to-category-excel' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'UPI/Statement PDF → Category Excel',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          }
        ]}
        faqData={faq}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">UPI / Statement PDF → Category-wise Excel</h1>
          <p className="text-gray-700 mb-6">Auto-tag UPI and other modes into categories and export Excel with a CategorySummary sheet.</p>
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
                id="upi-pdf-category-input"
              />
              <label htmlFor="upi-pdf-category-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select Statement PDF or drag & drop here</div>
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
                      <th className="px-3 py-2 text-left">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {txns.slice(0, 200).map((r, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2 text-gray-700">{r.date}</td>
                        <td className="px-3 py-2 text-gray-700">{r.description}</td>
                        <td className="px-3 py-2 text-right text-gray-700">{r.debit ? r.debit.toLocaleString('en-IN') : ''}</td>
                        <td className="px-3 py-2 text-right text-gray-700">{r.credit ? r.credit.toLocaleString('en-IN') : ''}</td>
                        <td className="px-3 py-2 text-gray-700">{r.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-6 prose-headings:font-extrabold prose-a:text-blue-700 hover:prose-a:text-blue-900">
            <h2>Bank Statement with UPI PDF to Category-wise Excel</h2>
            <p>bank statement upi pdf to category excel converter; auto tag UPI, NEFT, IMPS, POS, charges; client‑side india 2026.</p>
            <h3>Sheets</h3>
            <ul>
              <li>Transactions: Date, Description, Debit, Credit, Category</li>
              <li>CategorySummary: totals by category and net</li>
            </ul>
            <h3>Related Tools</h3>
            <ul>
              <li><a href="/finance-tools/pdf-converters/bank-statement-pdf-to-excel">Bank Statement PDF → Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/bank-statement-pdf-to-monthly-summary-excel">Bank Statement → Monthly Summary Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/multiple-bank-statements-to-consolidated-excel">Multiple Statements → Consolidated Excel</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankStatementUPIPdfToCategoryExcel;

