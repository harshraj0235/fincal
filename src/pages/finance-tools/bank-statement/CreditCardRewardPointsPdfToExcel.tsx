import React, { useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

type Reward = { date: string; description: string; amount?: number; points: number };

const dateRx = /\b(?:(?:\d{2}[-/]\d{2}[-/]\d{2,4})|(?:\d{4}[-/]\d{2}[-/]\d{2}))\b/;
const amountRx = /(?<![A-Za-z0-9])(?:₹?\s?-?)?\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?(?![A-Za-z0-9])/g;
const pointsRx = /\b(\d{1,6})\s?(?:RP|Pts|Points)\b/i;

const parsePoints = (text: string): Reward[] => {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const out: Reward[] = [];
  for (const line of lines) {
    if (!dateRx.test(line)) continue;
    if (!pointsRx.test(line)) continue;
    const dateMatch = line.match(dateRx)?.[0] || '';
    const pts = parseInt(pointsRx.exec(line)?.[1] || '0', 10) || 0;
    const rest = line.replace(dateMatch, '').trim();
    const nums = Array.from(rest.matchAll(amountRx)).map(m => m[0].replace(/[₹,\s]/g, ''));
    const amount = nums.length ? parseFloat(nums[nums.length - 1] || '0') || undefined : undefined;
    const description = rest.replace(amountRx, ' ').replace(pointsRx, ' ').replace(/\s{2,}/g, ' ').trim();
    out.push({ date: dateMatch, description, amount, points: pts });
  }
  return out;
};

const CreditCardRewardPointsPdfToExcel: React.FC = () => {
  const [status, setStatus] = useState('Ready');
  const [rows, setRows] = useState<Reward[]>([]);

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
    let result: Reward[] = [];
    for (const t of all) result = result.concat(parsePoints(t));
    setRows(result);
    setStatus(`Parsed ${result.length} point entries`);
  };

  const exportExcel = () => {
    const ws1 = XLSX.utils.json_to_sheet(rows.length ? rows : [{ date: '', description: '', amount: undefined, points: 0 }]);
    // Summary by month
    const byMonth: Record<string, number> = {};
    rows.forEach(r => {
      const m = (r.date.match(/\d{4}[-/]\d{2}/)?.[0]) || r.date;
      byMonth[m] = (byMonth[m] || 0) + (r.points || 0);
    });
    const ws2 = XLSX.utils.json_to_sheet(Object.entries(byMonth).map(([Month, Points]) => ({ Month, Points })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, 'RewardPoints');
    XLSX.utils.book_append_sheet(wb, ws2, 'MonthlyPoints');
    XLSX.writeFile(wb, 'credit-card-reward-points.xlsx');
  };

  return (
    <>
      <SEOHelmet
        title="Credit Card Reward Points PDF to Excel Tracker (Client‑side) | MoneyCal"
        description="Extract reward points entries from credit card statements and export an Excel tracker with monthly totals."
        keywords="credit card reward points pdf to excel converter, india"
        url="/finance-tools/pdf-converters/credit-card-reward-points-pdf-to-excel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Credit Card Reward Points → Excel', url: '/finance-tools/pdf-converters/credit-card-reward-points-pdf-to-excel' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Credit Card Reward Points PDF → Excel Tracker</h1>
          <p className="text-gray-700 mb-6">Build a points tracker from your statement PDFs. Client‑side only.</p>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">Status: {status}</div>
              <div className="flex items-center gap-3">
                <button onClick={exportExcel} disabled={rows.length===0} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50 hover:bg-indigo-700 transition-colors">Export Excel</button>
                <button onClick={()=>{setRows([]); setStatus('Ready')}} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border">Clear</button>
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
                id="reward-points-pdf-input"
              />
              <label htmlFor="reward-points-pdf-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select Card Statement PDF or drag & drop here</div>
                <div className="text-sm text-gray-600 mt-2">Client-side only • No upload • Fast</div>
              </label>
            </div>
          </div>
          {rows.length>0 && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Preview</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-3 py-2 text-left">Date</th>
                      <th className="px-3 py-2 text-left">Description</th>
                      <th className="px-3 py-2 text-right">Amount</th>
                      <th className="px-3 py-2 text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.slice(0, 200).map((r, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2 text-gray-700">{r.date}</td>
                        <td className="px-3 py-2 text-gray-700">{r.description}</td>
                        <td className="px-3 py-2 text-right text-gray-700">{typeof r.amount === 'number' ? r.amount.toLocaleString('en-IN') : ''}</td>
                        <td className="px-3 py-2 text-right text-gray-700">{r.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-6 prose-headings:font-extrabold prose-a:text-blue-700 hover:prose-a:text-blue-900">
            <h2>Credit Card Reward Points PDF to Excel Converter</h2>
            <p>credit card reward points pdf to excel converter; monthly tracker; client‑side india.</p>
            <h3>Related Tools</h3>
            <ul>
              <li><a href="/finance-tools/pdf-converters/icici-kotak-credit-card-pdf-to-excel">ICICI / Kotak Credit Card → Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/credit-card-statement-pdf-to-excel">Credit Card Statement → Excel (Expenses)</a></li>
              <li><a href="/finance-tools/pdf-converters/bank-statement-pdf-to-monthly-summary-excel">Bank Statement → Monthly Summary Excel</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditCardRewardPointsPdfToExcel;

