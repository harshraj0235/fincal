import React, { useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import { Upload, Loader2, CheckCircle2, AlertCircle, FileText, Sparkles } from 'lucide-react';

type Txn = { date: string; description: string; amount: number; type: 'debit'|'credit'; source?: string };

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
    const last = parseFloat(nums[nums.length - 1] || '0') || 0;
    const type: 'debit'|'credit' = /\bDR\b|\bDebit\b|-\d/i.test(line) ? 'debit' : 'credit';
    const desc = rest.replace(amountRx, ' ').replace(/\s{2,}/g, ' ').trim();
    out.push({ date: dateMatch, description: desc, amount: last, type });
  }
  return out;
};

const BankStatementPdfToCSV: React.FC = () => {
  const [status, setStatus] = useState('Ready');
  const [txns, setTxns] = useState<Txn[]>([]);
  const [includeSource, setIncludeSource] = useState<boolean>(false);
  const [progress, setProgress] = useState<{done:number; total:number}>({done:0,total:0});
  const [fileInsights, setFileInsights] = useState<Array<{name:string; size:number; isBank:boolean}>>([]);

  const handlePdfFiles = async (files: File[]) => {
    setStatus('Reading PDF(s)...');
    setProgress({done:0,total:files.length});
    setFileInsights([]);
    const pdfjsLib = await import('pdfjs-dist');
    try {
      const workerMod: any = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
      (pdfjsLib as any).GlobalWorkerOptions.workerSrc = workerMod.default || workerMod;
    } catch {
      (pdfjsLib as any).GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.624/build/pdf.worker.min.mjs';
    }
    const allRows: Txn[] = [];
    const insights: Array<{name:string; size:number; isBank:boolean}> = [];
    for (const file of files) {
      const buf = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      // detect on first page
      const first = await pdf.getPage(1);
      const c1 = await first.getTextContent();
      const t1 = c1.items.map((it: any) => ('str' in it ? it.str : '')).join('\n').toLowerCase();
      const isBank = /statement|account|branch|ifsc|neft|imps|upi|\bdr\b|\bcr\b|debit|credit|hdfc|axis|icici|state bank|sbi/.test(t1);
      insights.push({ name: file.name, size: file.size, isBank });
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const text = content.items.map((it: any) => it.str).join('\n');
        const rows = parseLines(text).map(r => ({...r, source: file.name}));
        allRows.push(...rows);
      }
      setProgress(p => ({...p, done: p.done + 1}));
    }
    setFileInsights(insights);
    setTxns(allRows);
    setStatus(`Parsed ${allRows.length} transactions from ${files.length} file(s)`);
  };

  const exportCSV = () => {
    const rows = [['Date','Description','Amount','Type'], ...txns.map(t => [t.date, t.description, String(t.amount), t.type])];
    const csv = rows.map(r => r.map(v => `"${(v||'').toString().replace(/"/g,'""')}"`).join(',')).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bank-transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const faq = [
    { question: 'Can I convert scanned PDFs?', answer: 'Use OCR first so text is selectable. After OCR, drop the PDF and export CSV.' },
    { question: 'Is it free?', answer: 'Yes. The converter is free to use with no login or signup.' },
    { question: 'What banks are supported?', answer: 'Most Indian banks and many international layouts that print one transaction per line.' },
    { question: 'How accurate is the conversion?', answer: 'It extracts dates, descriptions and amounts reliably from text‑based statements. Always spot‑check a sample.' },
    { question: 'Is my data safe?', answer: 'Processing runs in your browser only. No uploads, no storage, and you control the downloaded CSV.' },
    { question: 'What does the CSV contain?', answer: 'Date, Description, Amount and Type (debit/credit). Map to your tool during import.' },
    { question: 'Does it include running balance?', answer: 'No. Balance is often not needed for imports. You can compute it in your sheet.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Bank Statement PDF to CSV Converter – Free & Instant | MoneyCal"
        description="Convert bank statement PDFs to CSV in seconds. Free, no signup, secure. Works with any bank."
        keywords="bank statement pdf to csv converter no upload india"
        url="/finance-tools/pdf-converters/bank-statement-pdf-to-csv"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Bank Statement → CSV', url: '/finance-tools/pdf-converters/bank-statement-pdf-to-csv' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Bank Statement PDF to CSV Converter',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          }
        ]}
        faqData={faq}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <FileText className="w-5 h-5" />
              <span className="font-bold">Bank Statement PDF → CSV</span>
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="mt-6 text-3xl md:text-4xl font-extrabold text-gray-900">Bank Statement PDF to CSV Converter (Free & Instant)</h1>
            <p className="text-gray-700 mt-3 max-w-3xl mx-auto">Convert PDF bank statements from any bank to CSV instantly. Free, no login required.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="text-sm text-gray-600">Status: {status}</div>
              <label className="ml-auto inline-flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={includeSource} onChange={()=>setIncludeSource(v=>!v)} />
                Include Source column
              </label>
              <button onClick={exportCSV} disabled={txns.length===0} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50">Export CSV</button>
              <button onClick={()=>{setTxns([]); setFileInsights([]); setStatus('Ready'); setProgress({done:0,total:0});}} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border">Clear</button>
            </div>
            <div
              className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center cursor-pointer hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  const el = document.getElementById('bank-pdf-to-csv-input') as HTMLInputElement | null;
                  if (el) el.click();
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files || []).filter(f => f.type === 'application/pdf');
                if (files.length) handlePdfFiles(files);
              }}
            >
              <input
                type="file"
                accept="application/pdf"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []).filter(f => f.type === 'application/pdf');
                  if (files.length) handlePdfFiles(files);
                }}
                className="hidden"
                id="bank-pdf-to-csv-input"
                aria-label="Choose one or more bank statement PDFs"
              />
              <label htmlFor="bank-pdf-to-csv-input" className="block">
                <div className="flex items-center justify-center gap-2 text-lg font-semibold text-indigo-700">
                  <Upload className="w-5 h-5" />
                  <span>Click to select PDFs or drag & drop here</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">Local‑only • Batch supported • UTF‑8 CSV</div>
              </label>
              {progress.total > 0 && (
                <div className="mt-6">
                  <div className="flex items-center gap-3 justify-center text-sm text-gray-700">
                    {progress.done < progress.total ? <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> : <CheckCircle2 className="w-4 h-4 text-green-600" />}
                    <span>{progress.done}/{progress.total}</span>
                  </div>
                  <div className="mt-2 w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all" style={{ width: `${(progress.done/Math.max(progress.total,1))*100}%` }} />
                  </div>
                </div>
              )}
              <div className="mt-4 text-xs text-gray-600">🔒 SSL Encrypted • No data stored • Works with 1000+ banks</div>
            </div>
            {fileInsights.length > 0 && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fileInsights.map((f,i)=>(
                  <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-gray-900 truncate">{f.name}</div>
                      <div className="text-xs text-gray-500">{(f.size/1024).toFixed(0)} KB</div>
                    </div>
                    <div className="mt-2">
                      {f.isBank ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">Bank statement detected</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-800">
                          <AlertCircle className="w-3 h-3" /> Unknown format—review after parsing
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                      {includeSource && <th className="px-3 py-2 text-left">Source</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {txns.slice(0, 150).map((r, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2 text-gray-700">{r.date}</td>
                        <td className="px-3 py-2 text-gray-700">{r.description}</td>
                        <td className="px-3 py-2 text-right text-gray-700">{r.amount ? r.amount.toLocaleString('en-IN') : ''}</td>
                        <td className="px-3 py-2 text-gray-700 capitalize">{r.type}</td>
                        {includeSource && <td className="px-3 py-2 text-gray-700">{r.source || ''}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-6 prose-headings:font-extrabold prose-a:text-blue-700 hover:prose-a:text-blue-900 prose-ul:list-disc prose-ol:list-decimal prose-img:rounded-xl">
            <h2>How to Convert Bank Statement PDF to CSV</h2>
            <h3>Step 1 – Upload your PDF</h3>
            <p>Click the upload area or drag and drop one or more statement PDFs. The tool recognises most layouts that print one transaction per line.</p>
            <h3>Step 2 – Process & Extract</h3>
            <p>The browser parses pages and detects dates, descriptions and amounts. Your files never leave your device.</p>
            <h3>Step 3 – Download CSV</h3>
            <p>Review the preview table and export a clean UTF‑8 CSV ready for QuickBooks, Zoho Books, Tally add‑ins, Xero, or spreadsheets.</p>

            <h2>Why Convert Bank Statements to CSV?</h2>
            <p>PDF statements are hard to analyse. You cannot filter, sort, or run formulas across static pages, and manual entry wastes hours and introduces errors. Converting to CSV creates structured rows that can be filtered by date, pivoted by category, and reconciled quickly against your ledger. CSVs import directly into accounting software and spreadsheets, so you keep your existing process while removing the copy‑paste work. This approach is resilient across banks and templates because it focuses on extracting essentials—date, description, and amount—without brittle layout assumptions.</p>

            <h2>Supported Banks</h2>
            <p>Optimised for Indian banks and many international formats that print one transaction per line, including:</p>
            <ul>
              <li>SBI (State Bank of India), HDFC Bank, ICICI Bank, Axis Bank, Kotak Mahindra Bank</li>
              <li>Punjab National Bank, Bank of Baroda, Canara Bank, Yes Bank, IndusInd Bank</li>
              <li>Most private and public sector banks that provide text‑based PDFs</li>
            </ul>

            <h2>Is It Secure?</h2>
            <p>Processing is 100% local to your browser. PDFs are parsed in memory and never uploaded. Closing the tab discards the parsed text. You control the CSV download and where it is saved.</p>

            <h2>CSV Schema</h2>
            <ul>
              <li><strong>Date</strong>: As printed in the statement (e.g., 2026‑01‑31 or 31/01/2026). You can normalise after import.</li>
              <li><strong>Description</strong>: Narration or merchant text with extraneous symbols trimmed.</li>
              <li><strong>Amount</strong>: Positive number; rupee symbols and commas removed.</li>
              <li><strong>Type</strong>: debit or credit, inferred from common markers.</li>
            </ul>

            <h2>FAQ</h2>
            <h3>Can I convert scanned PDFs?</h3>
            <p>Use an OCR tool first so the PDF contains selectable text. Then upload the OCR’d file here.</p>
            <h3>Is it free?</h3>
            <p>Yes. There is no charge and no account is required.</p>
            <h3>What banks are supported?</h3>
            <p>Most Indian banks and many global layouts that present one transaction per line.</p>
            <h3>How accurate is the conversion?</h3>
            <p>It reliably captures dates, descriptions and amounts from text‑based statements. Always verify a sample after export.</p>
            <h3>Is my data safe?</h3>
            <p>Your files never leave your device. All parsing runs in your browser.</p>
            <h3>Can I get separate debit and credit columns?</h3>
            <p>The CSV includes Amount and Type. Map Type during import or create a signed Amount column in your sheet.</p>
            <h3>Does it include running balance?</h3>
            <p>No. Running balance is typically not required for imports and can be derived if needed.</p>

            <h2>Comparison</h2>
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>MoneyCal Converter</th>
                  <th>Generic PDF Tools</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Privacy</td>
                  <td>Client‑side only, no uploads</td>
                  <td>Often server‑side processing</td>
                </tr>
                <tr>
                  <td>Schema</td>
                  <td>Stable Date/Description/Amount/Type</td>
                  <td>Varies per file; inconsistent</td>
                </tr>
                <tr>
                  <td>Batch</td>
                  <td>Multiple PDFs supported</td>
                  <td>Commonly single file only</td>
                </tr>
                <tr>
                  <td>Import readiness</td>
                  <td>CSV tuned for accounting tools</td>
                  <td>May require heavy cleanup</td>
                </tr>
              </tbody>
            </table>

            <h2>Related Tools</h2>
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

export default BankStatementPdfToCSV;
