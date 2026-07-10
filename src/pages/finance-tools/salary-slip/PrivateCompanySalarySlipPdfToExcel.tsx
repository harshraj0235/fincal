import React, { useEffect, useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

type SplitMode = 'auto' | 'spaces' | 'colon';
type ExportMode = 'xlsx' | 'csv';

const PrivateCompanySalarySlipPdfToExcel: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready');
  const [rows, setRows] = useState<string[][]>([]);
  const [splitMode, setSplitMode] = useState<SplitMode>('auto');
  const [exportMode, setExportMode] = useState<ExportMode>('xlsx');
  const [focusLabels, setFocusLabels] = useState<boolean>(true);

  useEffect(() => {
    const s = localStorage.getItem('privateSplitMode');
    if (s === 'auto' || s === 'spaces' || s === 'colon') setSplitMode(s);
    const e = localStorage.getItem('privateExportMode');
    if (e === 'xlsx' || e === 'csv') setExportMode(e);
    const f = localStorage.getItem('privateFocusLabels');
    if (f === 'true' || f === 'false') setFocusLabels(f === 'true');
  }, []);
  useEffect(() => { localStorage.setItem('privateSplitMode', splitMode); }, [splitMode]);
  useEffect(() => { localStorage.setItem('privateExportMode', exportMode); }, [exportMode]);
  useEffect(() => { localStorage.setItem('privateFocusLabels', String(focusLabels)); }, [focusLabels]);

  const handleFile = async (file: File) => {
    setStatus('Reading PDF');
    const url = URL.createObjectURL(file);
    const pdfjsLib = await import('pdfjs-dist');
    try {
      const workerMod: any = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
      // @ts-expect-error pdfjs workerSrc typing
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerMod.default || workerMod;
    } catch (e) {
      // @ts-expect-error pdfjs workerSrc typing
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.624/build/pdf.worker.min.mjs';
    }
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;
    const allRows: string[][] = [];
    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p);
      const content = await page.getTextContent();
      const pageText = content.items.map((i: any) => ('str' in i ? i.str : '')).join('\n');
      const lines = pageText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      lines.forEach(line => {
        if (splitMode === 'spaces' || splitMode === 'auto') {
          const cols = line.split(/\s{2,}/).map(c => c.trim()).filter(Boolean);
          if (cols.length > 1) allRows.push(cols);
        }
        if (splitMode === 'colon' || (splitMode === 'auto' && line.includes(':'))) {
          const m = line.match(/^([^:]+):\s*(.+)$/);
          if (m) allRows.push([m[1].trim(), m[2].trim()]);
        }
      });
    }
    URL.revokeObjectURL(url);
    let out = allRows;
    if (focusLabels) {
      const kws = ['basic', 'hra', 'special allowance', 'allowance', 'variable', 'bonus', 'gratuity', 'lta', 'medical', 'pf', 'esi', 'pt', 'tds', 'net pay', 'ctc', 'gross'];
      out = allRows.filter(r => r.length >= 2 && kws.some(k => r[0].toLowerCase().includes(k)));
    }
    setRows(out);
    setStatus(`Parsed ${out.length} lines`);
  };

  const exportFile = () => {
    if (rows.length === 0) return;
    if (exportMode === 'xlsx') {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, 'PrivateSlip');
      XLSX.writeFile(wb, 'private-company-salary-slip.xlsx');
    } else {
      const csv = rows.map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'private-company-salary-slip.csv';
      a.click();
      URL.revokeObjectURL(a.href);
    }
  };

  const copyPreviewCsv = async () => {
    if (rows.length === 0) return;
    const csv = rows.map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(',')).join('\n');
    await navigator.clipboard.writeText(csv);
    setStatus('Copied preview CSV to clipboard');
  };

  const faq = [
    { question: 'Is this private?', answer: 'Yes. Everything runs locally in your browser. No upload.' },
    { question: 'XLSX or CSV?', answer: 'Choose export format via the Export toggle. Both are supported.' },
    { question: 'Optimized for private sector?', answer: 'Yes. Focus on Basic, HRA, Special Allowance, Variable, Bonus, PF/ESI, PT, TDS.' },
    { question: 'Scans?', answer: 'Prefer text-based PDFs. Scans may need OCR. The tool does not upload.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Private Company Salary Slip PDF to Excel (No Upload) | MoneyCal"
        description="Convert private company salary slip PDF to Excel/CSV. Client-side, fast, mobile-friendly. Optimized for CTC breakdowns, variable pay, PF/ESI, TDS."
        keywords="private company salary slip pdf to excel converter no upload, india 2026, salary slip csv"
        url="/finance-tools/pdf-converters/private-company-salary-slip-pdf-to-excel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Private Slip → Excel', url: '/finance-tools/pdf-converters/private-company-salary-slip-pdf-to-excel' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Private Company Salary Slip PDF to Excel Converter',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          }
        ]}
        faqData={faq}
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Private Company Salary Slip → Excel/CSV</h1>
          <p className="text-gray-700 mb-6">
            Convert private-sector payslips into clean spreadsheets. Detects Basic, HRA, Special Allowance, Variable/Bonus, PF/ESI/PT/TDS, and Net Pay.
          </p>
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
              <div className="ml-0 md:ml-6 text-sm font-semibold text-gray-700">Export</div>
              <label className="text-sm text-gray-700 flex items-center gap-1">
                <input type="radio" checked={exportMode==='xlsx'} onChange={() => setExportMode('xlsx')} />
                XLSX
              </label>
              <label className="text-sm text-gray-700 flex items-center gap-1">
                <input type="radio" checked={exportMode==='csv'} onChange={() => setExportMode('csv')} />
                CSV
              </label>
              <label className="ml-0 md:ml-6 text-sm text-gray-700 flex items-center gap-2">
                <input type="checkbox" checked={focusLabels} onChange={()=>setFocusLabels(v=>!v)} />
                Focus on common labels
              </label>
              <div className="ml-auto text-sm text-gray-600">Status: {status}</div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={exportFile}
                disabled={rows.length === 0}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50"
              >
                Export
              </button>
              <button onClick={copyPreviewCsv} disabled={rows.length===0} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border">Copy Preview CSV</button>
              <button onClick={()=>{setRows([]); setStatus('Ready');}} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border">Clear</button>
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
                id="private-input"
              />
              <label htmlFor="private-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select PDF or drag & drop here</div>
                <div className="text-sm text-gray-600 mt-2">Client-side only • No upload • Fast</div>
              </label>
            </div>
          </div>
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6 prose-headings:font-extrabold prose-a:text-blue-700 hover:prose-a:text-blue-900 prose-ul:list-disc prose-ol:list-decimal">
            <h2>Private Company Salary Slip PDF to Excel Converter (Free, No Upload) India 2026</h2>
            <p>Convert private-sector payslips into structured Excel or CSV with a single click. The tool is tuned for Indian layouts and recognizes common components like Basic, HRA, Special Allowance, Variable Pay or Bonus, Provident Fund, ESI, Professional Tax, TDS, CTC, Gross, and Net Pay. It runs entirely in your browser—no uploads, no accounts—making it safe for personal or corporate use on mobile and desktop.</p>
            <h3>Why Convert To Excel</h3>
            <p>Excel enables quick analysis across months: compute totals for allowances and deductions, track variable payouts, build pivots for taxes, and attach a consolidated workbook for loans or visa documentation. CSV export is ideal for downstream automation and import into ERP or accounting systems.</p>
            <h3>How To Use</h3>
            <ol>
              <li>Drop your PDF or choose a file from device storage.</li>
              <li>Select split mode: Auto usually works; use Spaces or Colon for rigid layouts.</li>
              <li>Keep “Focus on common labels” enabled to filter noise.</li>
              <li>Export as XLSX or CSV and use in Excel, Google Sheets, or ERP pipelines.</li>
            </ol>
            <h3>Supported Components</h3>
            <ul>
              <li>Earnings: Basic, HRA, Special Allowance, Variable/Bonus, LTA, Medical.</li>
              <li>Deductions: PF, ESI, PT, TDS, other deductions.</li>
              <li>Totals: Gross, CTC hints (if printed), Net Pay.</li>
            </ul>
            <h3>Privacy</h3>
            <p>All text extraction and processing happen locally. No document leaves your device. This architecture is more private than typical online converters that upload documents to a server.</p>
            <h3>Target Keywords</h3>
            <p>private company salary slip pdf to excel converter no upload; salary slip csv converter india 2026; client-side payslip converter; mobile-friendly pdf to excel india.</p>
            <h3>Decision Pathways</h3>
            <p>Private sector payslips vary widely in labeling and table formats. Start with Auto splitting to capture both colon pairs such as “Basic: 45,000” and multi‑space tables that list “Component    Amount”. If totals or columns look merged, switch to Spaces to force column boundaries. When your HR format prints each component as “Label: Value” on separate lines, Colon mode produces the cleanest two‑column output.</p>
            <h3>Real‑World Patterns</h3>
            <p>CTC‑driven payslips often show Gross and Net while omitting a formal “CTC” line; some include employer contributions (EPF/ESI) in a separate section. The converter focuses on employee earnings and deductions relevant for take‑home and tax computations, while leaving Gross and Net intact for reconciliation. If your slip lists “Special Allowance” multiple times per project, keep “Focus on common labels” enabled to group them; you can later consolidate rows in Excel as needed.</p>
            <h3>Examples</h3>
            <p>Example A: “Basic 38,000  HRA 19,000  Special Allowance 8,000  Variable 6,500  PF 4,560  PT 200  TDS 0  Net Pay 56,240”. With Spaces mode, each pair splits correctly into rows. You can pivot by label to see quarterly totals for Variable and reconcile PF against statutory percentages.</p>
            <p>Example B: “Earnings: Basic: 50,000; HRA: 25,000; Special Allowance: 10,000. Deductions: PF: 6,000; ESI: 0; PT: 200; TDS: 1,500.” Colon mode transforms these into tidy rows. Keeping “Focus on common labels” enabled filters out decorative headings while preserving earnings and deductions.</p>
            <h3>Normalization and Cleaning</h3>
            <p>Labels like “Special Allowance”, “Flexi Benefit”, “Other Allowance”, and “Supplementary Allowance” often represent the same bucket for analytics. Similarly, “PF”, “EPF”, and “Employees’ Provident Fund” can refer to the same deduction. The converter intentionally preserves original labels in the first column; once exported, create a small mapping table in Excel to unify them for charts and compliance checks.</p>
            <h3>Troubleshooting</h3>
            <ul>
              <li>If amounts join with labels, enforce Colon mode. If the slip uses tables without colons, Spaces works best.</li>
              <li>If the preview shows many short lines, disable “Focus on common labels” temporarily to capture all rows, then re‑enable once you confirm fields.</li>
              <li>Scanned documents require OCR before parsing. After OCR, prefer colonized formats for better fidelity.</li>
            </ul>
            <h3>Security and Compliance</h3>
            <p>Everything runs on your device. This makes the tool suitable for confidential compensation documents and eliminates vendor data retention concerns. You can also operate offline after the page loads, useful during audits or while traveling.</p>
            <h3>Post‑Export Ideas</h3>
            <p>Create a pivot that summarizes Variable/Bonus by quarter, track TDS trends across months, or compute PF as a percentage of Basic to validate payroll. For CTC views, maintain a separate sheet listing employer contributions and link them with LOOKUPs to the month index you export from this tool.</p>
            <h3>Related Tools</h3>
            <ul>
              <li><a href="/finance-tools/pdf-converters/salary-slip-pdf-to-excel">Salary Slip → Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/salary-slip-pdf-to-csv-transaction">Salary Slip → CSV Transactions</a></li>
              <li><a href="/finance-tools/pdf-converters/government-salary-slip-pdf-to-excel">Government Salary Slip → Excel/CSV</a></li>
              <li><a href="/finance-tools/pdf-converters/form16-part-ab-pdf-to-excel">Form 16 Part A & B → Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/form16-pdf-to-itr-input-excel">Form 16 → ITR Input Excel</a></li>
            </ul>
          </div>
          {rows.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Preview</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <tbody>
                    {rows.slice(0, 60).map((r, i) => (
                      <tr key={i} className="border-b">
                        {r.map((c, j) => (
                          <td key={j} className="px-3 py-2 text-gray-700">{c}</td>
                        ))}
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

export default PrivateCompanySalarySlipPdfToExcel;
