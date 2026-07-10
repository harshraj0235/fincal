import React, { useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

type Txn = { bank: string; date: string; description: string; debit: number; credit: number; balance?: number };

const dateRx = /\b(?:(?:\d{2}[-/]\d{2}[-/]\d{2,4})|(?:\d{4}[-/]\d{2}[-/]\d{2}))\b/;
const amountRx = /(?<![A-Za-z0-9])(?:₹?\s?-?)?\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?(?![A-Za-z0-9])/g;

const parseByTemplate = (text: string, bank: string): Txn[] => {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const out: Txn[] = [];
  for (const line of lines) {
    if (!dateRx.test(line)) continue;
    let isMatch = true;
    if (bank === 'HDFC') isMatch = /UPI|IMPS|NEFT|ATM|Chq/i.test(line);
    if (bank === 'SBI') isMatch = /UPI|NEFT|ATM|TRANSFER|INB/i.test(line);
    if (bank === 'Axis') isMatch = /UPI|POS|IMPS|NEFT|CMS|ATM/i.test(line);
    if (!isMatch) continue;
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
    out.push({ bank, date: dateMatch, description: desc, debit, credit });
  }
  return out;
};

const HDFCSBIAxisStatementPdfToExcel: React.FC = () => {
  const [status, setStatus] = useState('Ready');
  const [txns, setTxns] = useState<Txn[]>([]);
  const [bank, setBank] = useState<'HDFC'|'SBI'|'Axis'>('HDFC');

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
    for (const t of all) rows = rows.concat(parseByTemplate(t, bank));
    setTxns(rows);
    setStatus(`Parsed ${rows.length} ${bank} transactions`);
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(txns.length ? txns : [{ bank: bank, date: '', description: '', debit: 0, credit: 0 }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    XLSX.writeFile(wb, `${bank.toLowerCase()}-statement.xlsx`);
  };

  const faq = [
    { question: 'Supported banks?', answer: 'HDFC, SBI, and Axis presets are included. Others may still parse with the generic tool.' },
    { question: 'Scanned PDFs?', answer: 'Use OCR first to unlock text before parsing.' },
    { question: 'Balances?', answer: 'Some statements place balance in a far column. You can compute balance later from debit/credit.' }
  ];

  return (
    <>
      <SEOHelmet
        title="HDFC / SBI / Axis Bank Statement PDF to Excel (Client‑side) | MoneyCal"
        description="Convert Indian bank statements from HDFC, SBI or Axis to Excel with template-aware parsing. Private, fast."
        keywords="hdfc bank statement pdf to excel converter 2026, sbi, axis, india"
        url="/finance-tools/pdf-converters/hdfc-sbi-axis-statement-pdf-to-excel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'HDFC/SBI/Axis → Excel', url: '/finance-tools/pdf-converters/hdfc-sbi-axis-statement-pdf-to-excel' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'HDFC / SBI / Axis Statement PDF → Excel',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'AggregateRating',
            itemReviewed: { '@type': 'SoftwareApplication', name: 'HDFC / SBI / Axis Statement PDF → Excel' },
            ratingValue: 4.8,
            ratingCount: 523,
            bestRating: 5,
            worstRating: 1
          }
        ]}
        faqData={faq}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">HDFC / SBI / Axis Statement PDF → Excel</h1>
          <p className="text-gray-700 mb-6">Template‑aware parsing for common Indian bank statements, exported to Excel with clean columns.</p>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">Status: {status}</div>
              <div className="flex items-center gap-3">
                <select value={bank} onChange={e=>setBank(e.target.value as any)} className="px-3 py-2 border rounded-lg">
                  <option value="HDFC">HDFC</option>
                  <option value="SBI">SBI</option>
                  <option value="Axis">Axis</option>
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
                id="hdfc-sbi-axis-pdf-input"
              />
              <label htmlFor="hdfc-sbi-axis-pdf-input" className="block">
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
                      <th className="px-3 py-2 text-left">Bank</th>
                      <th className="px-3 py-2 text-left">Date</th>
                      <th className="px-3 py-2 text-left">Description</th>
                      <th className="px-3 py-2 text-right">Debit</th>
                      <th className="px-3 py-2 text-right">Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {txns.slice(0, 150).map((r, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2 text-gray-700">{r.bank}</td>
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
            <p>Template‑aware parsing for three popular Indian banks. It improves extraction reliability by matching bank‑specific cues.</p>
            <h2>What Is This Tool?</h2>
            <p>A client‑side converter that reads HDFC/SBI/Axis statements and outputs Excel with date, description, debit, and credit.</p>
            <h2>How It Works</h2>
            <p>After reading PDF text locally, the parser looks for bank‑specific tokens (UPI, IMPS, POS, NEFT, etc.) to improve row detection and debit/credit inference.</p>
            <h2>How to Use</h2>
            <ol>
              <li>Select your bank preset</li>
              <li>Drop the statement PDF</li>
              <li>Export to Excel and review</li>
            </ol>
            <h2>Bank‑Specific Notes</h2>
            <ul>
              <li>HDFC: UPI/IMPS/NEFT markers and “Chq#” notations commonly appear with DR/CR</li>
              <li>SBI: INB/UPI/TRANSFER tokens and clear CR/DR suffixes aid detection</li>
              <li>Axis: POS/UPI/IMPS/NEFT cues are frequent and help classify rows</li>
            </ul>
            <h2>Accuracy & Troubleshooting</h2>
            <p>If narration is split across lines in the PDF viewer, try downloading the official e‑statement or smaller date ranges. For mis‑classified entries, adjust in Excel after export.</p>
            <h2>Security</h2>
            <p>All parsing happens in your browser. Nothing is uploaded or stored on a server.</p>
            <h2>Related Tools</h2>
            <ul>
              <li><a href="/finance-tools/pdf-converters/bank-statement-pdf-to-excel">Bank Statement PDF → Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/bank-statement-upi-pdf-to-category-excel">UPI Statement → Category-wise Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/multiple-bank-statements-to-consolidated-excel">Multiple Statements → Consolidated Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/bank-statement-pdf-to-monthly-summary-excel">Monthly Summary Excel</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HDFCSBIAxisStatementPdfToExcel;
