import React, { useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';

type Txn = { month: string; label: string; amount: number; type: 'earning' | 'deduction' | 'net' };

const SalarySlipPdfToCSVTransactions: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready');
  const [txns, setTxns] = useState<Txn[]>([]);

  const parsePdfToText = async (file: File) => {
    const pdfjsLib = await import('pdfjs-dist');
    try {
      const workerMod: any = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
      // @ts-expect-error pdfjs workerSrc typing
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerMod.default || workerMod;
    } catch (e) {
      // @ts-expect-error pdfjs workerSrc typing
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.624/build/pdf.worker.min.mjs';
    }
    const url = URL.createObjectURL(file);
    const pdf = await pdfjsLib.getDocument(url).promise;
    let text = '';
    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p);
      const content = await page.getTextContent();
      text += content.items.map((i: any) => ('str' in i ? i.str : '')).join('\n') + '\n';
    }
    URL.revokeObjectURL(url);
    return text;
  };

  const detectMonth = (s: string) => {
    const m = s.toLowerCase().match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\b/);
    return m ? m[1].toUpperCase() : '';
  };

  const handleFile = async (file: File) => {
    setStatus('Reading PDF...');
    const text = await parsePdfToText(file);
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const month = detectMonth(file.name + ' ' + text);
    const out: Txn[] = [];
    const normAmt = (s: string) => {
      const n = parseFloat(s.replace(/₹|,/g, '').trim());
      return isNaN(n) ? 0 : n;
    };
    lines.forEach(line => {
      const m = line.match(/^([A-Za-z &]+)\s*[:-]?\s*(₹?\s*[\d,]+(?:\.\d{1,2})?)$/);
      if (!m) return;
      const label = m[1].trim();
      const amt = normAmt(m[2]);
      const lk = label.toLowerCase();
      let type: Txn['type'] = 'earning';
      if (lk.includes('deduct') || lk.includes('pf') || lk.includes('esi') || lk.includes('tax') || lk.includes('tds') || lk.includes('pt')) type = 'deduction';
      if (lk.includes('net pay') || lk.includes('net salary')) type = 'net';
      out.push({ month, label, amount: amt, type });
    });
    setTxns(out);
    setStatus(`Detected ${out.length} lines`);
  };

  const downloadCSV = () => {
    if (txns.length === 0) return;
    const header = ['Month','Label','Amount','Type'];
    const rows = txns.map(t => [t.month, t.label, String(t.amount), t.type]);
    const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'salary-slip-transactions.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const copyCSV = async () => {
    if (txns.length === 0) return;
    const header = ['Month','Label','Amount','Type'];
    const rows = txns.map(t => [t.month, t.label, String(t.amount), t.type]);
    const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    await navigator.clipboard.writeText(csv);
    setStatus('Copied CSV to clipboard');
  };

  const faq = [
    { question: 'What format?', answer: 'CSV with columns: Month, Label, Amount, Type (earning/deduction/net).' },
    { question: 'Private?', answer: 'Yes. Parsing runs in-browser. No upload, no tracking.' },
    { question: 'Scans?', answer: 'Works best with text-based PDFs. Scans require OCR outside the browser.' },
    { question: 'Mobile?', answer: 'Yes. Mobile-first UI with drag & drop and tap-to-select.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Salary Slip PDF to CSV Transaction Format (Free, Client-side) | MoneyCal"
        description="Convert salary slip PDF to CSV transactions for analytics and imports. Private, mobile-first, no upload."
        keywords="salary slip pdf to csv converter free online, india 2026, transactions"
        url="/finance-tools/pdf-converters/salary-slip-pdf-to-csv-transaction"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'PDF → CSV Transactions', url: '/finance-tools/pdf-converters/salary-slip-pdf-to-csv-transaction' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Salary Slip PDF to CSV Transactions',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          }
        ]}
        faqData={faq}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Salary Slip PDF → CSV Transaction Format</h1>
          <p className="text-gray-700 mb-6">Generate a tidy CSV of earnings, deductions, and net pay with month tag for analytics and imports.</p>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">Status: {status}</div>
              <div className="flex items-center gap-3">
                <button onClick={downloadCSV} disabled={txns.length===0} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50">Download CSV</button>
                <button onClick={copyCSV} disabled={txns.length===0} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border">Copy CSV</button>
                <button onClick={()=>{setTxns([]); setStatus('Ready');}} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border">Clear</button>
              </div>
            </div>
            <div
              className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center cursor-pointer hover:bg-indigo-50"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const f = e.dataTransfer.files?.[0];
                if (f) handleFile(f);
              }}
            >
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
                className="hidden"
                id="csv-txn-input"
              />
              <label htmlFor="csv-txn-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select PDF or drag & drop here</div>
                <div className="text-sm text-gray-600 mt-2">Client-side only • No upload • Fast</div>
              </label>
            </div>
          </div>
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6 prose-headings:font-extrabold prose-a:text-blue-700 hover:prose-a:text-blue-900 prose-ul:list-disc prose-ol:list-decimal">
            <h2>Free Online Salary Slip PDF to CSV Transaction Converter (India 2026)</h2>
            <p>Extract salary components into a CSV table suitable for analytics, audit, and integrations. It outputs four columns—Month, Label, Amount, Type—so you can feed downstream dashboards or tax prep utilities. This page is tuned for Indian payslip terminology and runs entirely in your browser for privacy.</p>
            <h3>Use Cases</h3>
            <ul>
              <li>Import into accounting or BI tools to visualize monthly earnings and deductions.</li>
              <li>Create pivot tables to compute totals across the financial year.</li>
              <li>Attach CSV alongside PDF payslips for loan processing.</li>
            </ul>
            <h3>Tips</h3>
            <ul>
              <li>Prefer text PDFs; scans need OCR first.</li>
              <li>Ensure clear labels: Basic, HRA, Special Allowance, PF, ESI, PT, TDS, Net Pay.</li>
              <li>Use filename months (e.g., 2026-07 payslip.pdf) for robust month detection.</li>
            </ul>
            <h3>Target Keywords</h3>
            <p>salary slip pdf to csv converter free online; india 2026 csv transactions; client-side payslip converter; mobile-first pdf to csv.</p>
            <h3>Schema</h3>
            <p>The CSV schema is minimal and analytics‑ready: Month (short name like APR or JUN if detected), Label (the payroll component text), Amount (numeric, rupee symbols and commas stripped), and Type (earning, deduction, or net). This uniform structure simplifies import into spreadsheets, BI tools, and custom pipelines.</p>
            <h3>Normalization Strategy</h3>
            <p>The converter keeps source labels intact to preserve semantics across employers. Build a small mapping table to collapse synonyms like “Special Allowance” and “Flexi Basket” or “PF” and “EPF”. This keeps the raw extract faithful while enabling consistent reporting layers on top.</p>
            <h3>Examples</h3>
            <p>Example A: Lines parsed as “Basic: 42,000”, “HRA: 21,000”, “PF: 5,040”, “TDS: 1,200”, “Net Pay: 55,760” result in five CSV rows with appropriate types. Pivot by Type to separate earnings vs deductions quickly.</p>
            <p>Example B: A slip that prints “Allowances – Medical 1,250; LTA 2,000; Special 7,500” yields three earning rows. Use label filters to isolate benefit categories for audit.</p>
            <h3>Troubleshooting</h3>
            <ul>
              <li>If amounts fail to parse, ensure the PDF is text‑based and commas are standard numerals, not images.</li>
              <li>If month remains blank, rename files with month tokens or add a Month column manually after export.</li>
              <li>If the slip uses unusual separators, pre‑process with OCR that preserves “Label: Value” patterns.</li>
            </ul>
            <h3>Downstream Integrations</h3>
            <p>Load the CSV into Google Sheets and build monthly dashboards, import into Power BI or Looker Studio for visuals, or pipe into custom scripts that compare payroll against bank credits. Because the schema is narrow and consistent, repeated uploads append cleanly to a historical dataset.</p>
            <h3>Related Tools</h3>
            <ul>
              <li><a href="/finance-tools/pdf-converters/salary-slip-pdf-to-excel">Salary Slip → Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/government-salary-slip-pdf-to-excel">Government Salary Slip → Excel/CSV</a></li>
              <li><a href="/finance-tools/pdf-converters/private-company-salary-slip-pdf-to-excel">Private Company Salary Slip → Excel/CSV</a></li>
              <li><a href="/finance-tools/pdf-converters/form16-part-ab-pdf-to-excel">Form 16 Part A & B → Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/form16-pdf-to-itr-input-excel">Form 16 → ITR Input Excel</a></li>
            </ul>
          </div>
          {txns.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Preview</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      {['Month','Label','Amount','Type'].map((h,i)=><th key={i} className="text-left px-3 py-2">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {txns.slice(0, 80).map((t,i)=>(
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2">{t.month}</td>
                        <td className="px-3 py-2">{t.label}</td>
                        <td className="px-3 py-2">₹ {t.amount.toLocaleString('en-IN')}</td>
                        <td className="px-3 py-2">{t.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SalarySlipPdfToCSVTransactions;
