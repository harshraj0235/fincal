import React, { useEffect, useMemo, useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

type YearRow = { year: string; gross: number; deductions: number; income: number; tax: number; tds: number };
type SplitMode = 'auto' | 'spaces' | 'colon';

const Form16MultipleYearsToTaxHistory: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready');
  const [data, setData] = useState<YearRow[]>([]);
  const [splitMode, setSplitMode] = useState<SplitMode>('auto');

  useEffect(() => {
    const s = localStorage.getItem('f16YearsSplit');
    if (s === 'auto' || s === 'spaces' || s === 'colon') setSplitMode(s);
  }, []);
  useEffect(() => { localStorage.setItem('f16YearsSplit', splitMode); }, [splitMode]);

  const parseFile = async (file: File) => {
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
    let gross = 0, deductions = 0, income = 0, tax = 0, tds = 0;
    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p);
      const content = await page.getTextContent();
      const text = content.items.map((i: any) => ('str' in i ? i.str : '')).join('\n');
      const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      lines.forEach(line => {
        let k = '', v = '';
        if (splitMode !== 'spaces') {
          const m = line.match(/^([^:]+):\s*(.+)$/);
          if (m) { k = m[1].trim(); v = m[2].trim(); }
        }
        if (!k && splitMode !== 'colon') {
          const cols = line.split(/\s{2,}/).map(c => c.trim()).filter(Boolean);
          if (cols.length === 2) { k = cols[0]; v = cols[1]; }
        }
        if (!k) return;
        const num = parseFloat(v.replace(/₹|,/g,''));
        if (isNaN(num)) return;
        const lk = k.toLowerCase();
        if (lk.includes('gross salary')) gross = Math.max(gross, num);
        else if (lk.includes('chapter vi-a') || lk.includes('deductions')) deductions = Math.max(deductions, num);
        else if (lk.includes('income chargeable') || lk.includes('income from salary')) income = Math.max(income, num);
        else if (lk.includes('tax on total income')) tax = Math.max(tax, num);
        else if (lk.includes('total tds') || lk.includes('tds deposited')) tds = Math.max(tds, num);
      });
    }
    URL.revokeObjectURL(url);
    const y = (file.name.match(/\b(20\d{2})\b/g) || []).slice(-1)[0] || '';
    return { year: y, gross, deductions, income, tax, tds } as YearRow;
  };

  const handleFiles = async (files: FileList) => {
    setStatus('Processing...');
    const out: YearRow[] = [];
    for (let i = 0; i < files.length; i++) {
      const r = await parseFile(files[i]);
      out.push(r);
      setStatus(`Processed ${i+1}/${files.length}`);
    }
    setData(out);
    setStatus(`Ready: ${out.length} files`);
  };

  const exportHistory = () => {
    if (data.length === 0) return;
    const headers = ['Year','Gross Salary','Deductions (VI-A)','Income from Salary','Tax on Total Income','Total TDS'];
    const aoa = [headers, ...data.map(d => [d.year, d.gross, d.deductions, d.income, d.tax, d.tds])];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    XLSX.utils.book_append_sheet(wb, ws, 'TaxHistory');
    XLSX.writeFile(wb, 'form16-tax-history.xlsx');
  };

  const sorted = useMemo(()=> data.slice().sort((a,b)=> (a.year>b.year?1:-1)), [data]);

  const faq = [
    { question: 'Multiple years?', answer: 'Yes. Drop multiple Form 16 PDFs to build a single tax history Excel.' },
    { question: 'Year detection?', answer: 'Heuristic from filename (e.g., 2024, 2025). You can adjust in Excel.' },
    { question: 'Private?', answer: 'Yes. The entire workflow runs in your browser.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Form 16 Multiple Years PDF to Tax History Excel | MoneyCal"
        description="Upload multiple Form 16 PDFs and export a consolidated tax history Excel across years. Client-side, private."
        keywords="form 16 multiple years pdf to excel history 2026, tax history, india"
        url="/finance-tools/pdf-converters/form16-multiple-years-to-tax-history"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Form 16 Multi-year → Tax History', url: '/finance-tools/pdf-converters/form16-multiple-years-to-tax-history' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Form 16 Multi-year to Tax History',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          }
        ]}
        faqData={faq}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Form 16 Multiple Years PDF → Tax History Excel</h1>
          <p className="text-gray-700 mb-6">Build a consolidated view of gross salary, deductions, income from salary, tax and TDS across years.</p>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="text-sm font-semibold text-gray-700">Split</div>
              <label className="text-sm text-gray-700 flex items-center gap-1">
                <input type="radio" checked={splitMode==='auto'} onChange={() => setSplitMode('auto')} />
                Auto
              </label>
              <label className="text-sm text-gray-700 flex items-center gap-1">
                <input type="radio" checked={splitMode==='spaces'} onChange={() => setSplitMode('spaces')} />
                Spaces
              </label>
              <label className="text-sm text-gray-700 flex items-center gap-1">
                <input type="radio" checked={splitMode==='colon'} onChange={() => setSplitMode('colon')} />
                Colon
              </label>
              <div className="ml-auto text-sm text-gray-600">Status: {status}</div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <button onClick={exportHistory} disabled={data.length===0} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50">Export History</button>
              <button onClick={()=>{setData([]); setStatus('Ready');}} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border">Clear</button>
            </div>
            <div
              className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center cursor-pointer hover:bg-indigo-50"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files.length>0) {
                  handleFiles(e.dataTransfer.files as unknown as FileList);
                }
              }}
            >
              <input
                type="file"
                accept="application/pdf"
                multiple
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
                id="f16-years-input"
              />
              <label htmlFor="f16-years-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select PDFs or drag & drop here</div>
                <div className="text-sm text-gray-600 mt-2">Client-side only • No upload • Fast</div>
              </label>
            </div>
          </div>
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <h2>Build a Multi‑Year Tax History from Form 16 PDFs</h2>
            <p>Use this tool to assemble a single workbook that tracks your salary journey across years. By dropping multiple Form 16 PDFs, you can quickly compare gross salary growth, Chapter VI‑A deductions, income from salary, tax on total income, and TDS totals in one sheet. Everything runs locally in your browser.</p>
            <h3>When to Use</h3>
            <p>Ideal for planning, loan documentation, and year‑over‑year tax comparisons. It also helps identify anomalies like sudden swings in deductions or TDS variance relative to tax due.</p>
            <h3>Data Model</h3>
            <p>Each row captures Year, Gross Salary, Deductions (VI‑A), Income from Salary, Tax on Total Income, and Total TDS. The year is inferred from the filename as a last‑resort heuristic; you may edit the year inside Excel to match AY or FY as per your preference.</p>
            <h3>Best Practices</h3>
            <p>Use consistent file naming with the year embedded (e.g., employee_form16_2025.pdf). If your Form 16 uses tables extensively, switch Split to Spaces. For “Label: Value” layouts, use Colon. Review the preview table for sanity before export.</p>
            <h3>Analysis Ideas</h3>
            <p>Once exported, add a column for “Effective Tax Rate” (Tax/Income), plot deductions over time, or compute the delta in gross salary year‑on‑year. This turns a static document into a planning dashboard you can revisit each season.</p>
            <h3>Privacy & Safety</h3>
            <p>All parsing occurs on your device. No data leaves your browser unless you choose to export the Excel file.</p>
          </div>
          {sorted.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Preview</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      {['Year','Gross','Deductions (VI-A)','Income','Tax','TDS'].map((h,i)=><th key={i} className="text-left px-3 py-2">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((r,i)=>(
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2">{r.year}</td>
                        <td className="px-3 py-2">₹ {r.gross.toLocaleString('en-IN')}</td>
                        <td className="px-3 py-2">₹ {r.deductions.toLocaleString('en-IN')}</td>
                        <td className="px-3 py-2">₹ {r.income.toLocaleString('en-IN')}</td>
                        <td className="px-3 py-2">₹ {r.tax.toLocaleString('en-IN')}</td>
                        <td className="px-3 py-2">₹ {r.tds.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-6">
            <h2>Introduction</h2>
            <p>Create a multi‑year tax history from multiple Form 16 PDFs. This follows a clear structure: definition, working, features, benefits, and steps.</p>
            <h2>What Is This Tool?</h2>
            <p>A client‑side summarizer that records Year, Gross, VI‑A deductions, Income from Salary, Tax, and TDS in one Excel.</p>
            <h2>How It Works</h2>
            <p>Each PDF is parsed locally, key amounts are detected by label matching, and the latest figure is retained per metric. Year is inferred from filename and editable.</p>
            <h2>Features</h2>
            <ul>
              <li>Batch drop multiple PDFs</li>
              <li>Auto/Colon/Spaces split modes</li>
              <li>Editable month/year and exports</li>
            </ul>
            <h2>Benefits</h2>
            <ul>
              <li>Quick year‑over‑year comparisons</li>
              <li>Better planning and anomaly detection</li>
            </ul>
            <h2>How to Use</h2>
            <ol>
              <li>Drop all Form 16 PDFs</li>
              <li>Pick the best split mode</li>
              <li>Export Tax History and refine in Excel</li>
            </ol>
            <h2>FAQs</h2>
            <p><strong>Wrong year?</strong> Edit in Excel. <strong>Scans?</strong> OCR first to enable text parsing.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form16MultipleYearsToTaxHistory;
