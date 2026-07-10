import React, { useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

type Txn = { date: string; description: string; amount: number; type: 'purchase'|'fee'|'payment'|'refund'|'other' };

const dateRx = /\b(?:(?:\d{2}[-/]\d{2}[-/]\d{2,4})|(?:\d{4}[-/]\d{2}[-/]\d{2}))\b/;
const amountRx = /(?<![A-Za-z0-9])(?:₹?\s?-?)?\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?(?![A-Za-z0-9])/g;

const inferType = (line: string, desc: string, amt: number): Txn['type'] => {
  if (/payment|bill\s*payment|total\s*payment|paid/i.test(line)) return 'payment';
  if (/refund|reversal|charge\s*reversal/i.test(line)) return 'refund';
  if (/annual\s*fee|late\s*fee|gst|finance\s*charge|charge\s+\/?fee/i.test(line)) return 'fee';
  if (/purchase|pos|ecom|upi|online|swipe|merchant|amazon|flipkart|myntra|zomato|swiggy|fuel/i.test(desc)) return 'purchase';
  return amt < 0 ? 'payment' : 'other';
};

const parseCreditCardLines = (text: string): Txn[] => {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const out: Txn[] = [];
  for (const line of lines) {
    if (!dateRx.test(line)) continue;
    const dateMatch = line.match(dateRx)?.[0] || '';
    const rest = line.replace(dateMatch, '').trim();
    const nums = Array.from(rest.matchAll(amountRx)).map(m => m[0].replace(/[₹,\s]/g, ''));
    if (nums.length === 0) continue;
    const last = parseFloat(nums[nums.length - 1] || '0') || 0;
    const desc = rest.replace(amountRx, ' ').replace(/\s{2,}/g, ' ').trim();
    const t = inferType(line, desc, last);
    out.push({ date: dateMatch, description: desc, amount: last, type: t });
  }
  return out;
};

const ICICIKotakCreditCardPdfToExcel: React.FC = () => {
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
    for (const t of all) rows = rows.concat(parseCreditCardLines(t));
    setTxns(rows);
    setStatus(`Parsed ${rows.length} credit card transactions`);
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(txns.length ? txns : [{ date: '', description: '', amount: 0, type: 'purchase' }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'CardTxns');
    XLSX.writeFile(wb, 'icici-kotak-credit-card.xlsx');
  };

  const faq = [
    { question: 'Banks supported?', answer: 'Optimized for ICICI and Kotak e-statements; other cards may work with similar layout.' },
    { question: 'Scanned PDFs?', answer: 'Run OCR to make text selectable, then re-upload.' },
  ];

  return (
    <>
      <SEOHelmet
        title="ICICI / Kotak Credit Card Statement PDF to Excel (Client‑side) | MoneyCal"
        description="Convert ICICI or Kotak credit card PDF statements to Excel. Fast, private, client‑side parsing."
        keywords="icici credit card statement pdf to excel converter, kotak credit card pdf to excel, india 2026"
        url="/finance-tools/pdf-converters/icici-kotak-credit-card-pdf-to-excel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'ICICI/Kotak Card → Excel', url: '/finance-tools/pdf-converters/icici-kotak-credit-card-pdf-to-excel' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'ICICI / Kotak Credit Card PDF → Excel',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          }
        ]}
        faqData={faq}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            ICICI / Kotak Credit Card PDF → Excel Converter
          </h1>
          <p className="text-gray-700 mb-6">
            Extract credit card transactions (purchases, payments, fees, refunds) to Excel. Client‑side only, no uploads.
          </p>
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
                id="icici-kotak-card-pdf-input"
              />
              <label htmlFor="icici-kotak-card-pdf-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select Card Statement PDF or drag & drop here</div>
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
                    </tr>
                  </thead>
                  <tbody>
                    {txns.slice(0, 200).map((r, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2 text-gray-700">{r.date}</td>
                        <td className="px-3 py-2 text-gray-700">{r.description}</td>
                        <td className="px-3 py-2 text-right text-gray-700">{r.amount ? r.amount.toLocaleString('en-IN') : ''}</td>
                        <td className="px-3 py-2 text-gray-700 capitalize">{r.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-6 prose-headings:font-extrabold prose-a:text-blue-700 hover:prose-a:text-blue-900">
            <h2>Free ICICI / Kotak Credit Card PDF to Excel Converter</h2>
            <p>icici credit card statement pdf to excel converter; kotak credit card statement to excel; client‑side card statement converter india 2026.</p>
            <h3>How It Works</h3>
            <p>Reads text locally, detects date‑led rows, extracts final numeric as amount, and classifies type by narration cues like payment, fee, or purchase.</p>
            <h3>Tips</h3>
            <ul>
              <li>Prefer official e‑statements for best extraction quality.</li>
              <li>For scans, run OCR and re‑upload.</li>
              <li>Validate fees and payments after export.</li>
            </ul>
            <h3>Related Tools</h3>
            <ul>
              <li><a href="/finance-tools/pdf-converters/credit-card-statement-pdf-to-excel">Credit Card Statement → Excel (Expenses)</a></li>
              <li><a href="/finance-tools/pdf-converters/credit-card-reward-points-pdf-to-excel">Credit Card Reward Points → Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/bank-statement-pdf-to-monthly-summary-excel">Bank Statement → Monthly Summary Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/bank-statement-pdf-to-excel">Bank Statement PDF → Excel</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ICICIKotakCreditCardPdfToExcel;

