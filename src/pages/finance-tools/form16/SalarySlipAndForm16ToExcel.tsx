import React, { useEffect, useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

type SplitMode = 'auto' | 'spaces' | 'colon';

const SalarySlipAndForm16ToExcel: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready');
  const [slipRows, setSlipRows] = useState<string[][]>([]);
  const [f16Rows, setF16Rows] = useState<string[][]>([]);
  const [splitMode, setSplitMode] = useState<SplitMode>('auto');

  useEffect(() => {
    const s = localStorage.getItem('slipF16Split');
    if (s === 'auto' || s === 'spaces' || s === 'colon') setSplitMode(s);
  }, []);
  useEffect(() => { localStorage.setItem('slipF16Split', splitMode); }, [splitMode]);

  const parsePdf = async (file: File) => {
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
    const out: string[][] = [];
    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p);
      const content = await page.getTextContent();
      const text = content.items.map((i: any) => ('str' in i ? i.str : '')).join('\n');
      const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      lines.forEach(line => {
        if (splitMode === 'spaces' || splitMode === 'auto') {
          const cols = line.split(/\s{2,}/).map(c => c.trim()).filter(Boolean);
          if (cols.length > 1) out.push(cols);
        }
        if (splitMode === 'colon' || (splitMode === 'auto' && line.includes(':'))) {
          const m = line.match(/^([^:]+):\s*(.+)$/);
          if (m) out.push([m[1].trim(), m[2].trim()]);
        }
      });
    }
    URL.revokeObjectURL(url);
    return out;
  };

  const handleSlip = async (file: File) => {
    setStatus('Parsing Salary Slip...');
    const r = await parsePdf(file);
    setSlipRows(r);
    setStatus(`Slip rows: ${r.length}`);
  };
  const handleF16 = async (file: File) => {
    setStatus('Parsing Form 16...');
    const r = await parsePdf(file);
    setF16Rows(r);
    setStatus(`Form 16 rows: ${r.length}`);
  };

  const exportCombined = () => {
    if (slipRows.length === 0 && f16Rows.length === 0) return;
    const wb = XLSX.utils.book_new();
    if (slipRows.length > 0) {
      const ws1 = XLSX.utils.aoa_to_sheet(slipRows);
      XLSX.utils.book_append_sheet(wb, ws1, 'SalarySlip');
    }
    if (f16Rows.length > 0) {
      const ws2 = XLSX.utils.aoa_to_sheet(f16Rows);
      XLSX.utils.book_append_sheet(wb, ws2, 'Form16');
    }
    XLSX.writeFile(wb, 'salary-slip-form16-combined.xlsx');
  };

  const faq = [
    { question: 'What does it do?', answer: 'Combines extracted rows from a salary slip PDF and a Form 16 PDF into a single Excel with two sheets.' },
    { question: 'Why useful?', answer: 'Prepare loan or visa documentation, reconcile Form 16 with monthly slips, and share a unified workbook.' },
    { question: 'Private?', answer: 'Yes. All processing runs locally in your browser.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Salary Slip + Form 16 Combined PDF to Excel (Client-side) | MoneyCal"
        description="Combine a salary slip PDF and a Form 16 PDF into a single Excel workbook. Privacy-first."
        keywords="salary slip and form 16 pdf to excel converter, india 2026"
        url="/finance-tools/pdf-converters/salary-slip-plus-form16-to-excel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Salary Slip + Form 16 → Excel', url: '/finance-tools/pdf-converters/salary-slip-plus-form16-to-excel' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Salary Slip + Form 16 Combined to Excel',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          }
        ]}
        faqData={faq}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Salary Slip + Form 16 Combined PDF → Excel</h1>
          <p className="text-gray-700 mb-6">Create a single workbook with separate sheets for Salary Slip and Form 16 extraction.</p>
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
              <button onClick={exportCombined} disabled={slipRows.length===0 && f16Rows.length===0} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50">Export Combined Excel</button>
              <button onClick={()=>{setSlipRows([]); setF16Rows([]); setStatus('Ready');}} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border">Clear</button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center cursor-pointer hover:bg-indigo-50"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const f = e.dataTransfer.files?.[0];
                  if (f) handleSlip(f);
                }}
              >
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleSlip(f);
                  }}
                  className="hidden"
                  id="slip-input"
                />
                <label htmlFor="slip-input" className="block">
                  <div className="text-lg font-semibold text-indigo-700">Select Salary Slip PDF</div>
                  <div className="text-sm text-gray-600 mt-2">Drag here or click to choose</div>
                </label>
              </div>
              <div
                className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center cursor-pointer hover:bg-indigo-50"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const f = e.dataTransfer.files?.[0];
                  if (f) handleF16(f);
                }}
              >
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleF16(f);
                  }}
                  className="hidden"
                  id="f16-input"
                />
                <label htmlFor="f16-input" className="block">
                  <div className="text-lg font-semibold text-indigo-700">Select Form 16 PDF</div>
                  <div className="text-sm text-gray-600 mt-2">Drag here or click to choose</div>
                </label>
              </div>
            </div>
          </div>
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <h2>Unify Salary Slip and Form 16 into One Workbook</h2>
            <p>Many lenders, visa desks, and auditors ask for a consolidated view of monthly salary evidence alongside the official TDS certificate. This page helps create a single Excel file with two sheets: one from your Salary Slip and one from Form 16, extracted locally in your browser.</p>
            <h3>Recommended Workflow</h3>
            <p>Start by loading your most representative monthly salary slip. Then load the matching financial year’s Form 16. Export the combined workbook and, if needed, add a cover sheet in Excel with your contact details, employee ID, and a quick index of included documents.</p>
            <h3>Comparison Ideas</h3>
            <p>Use formulas across the two sheets to cross‑check gross pay vs income from salary, verify HRA treatment, and validate that the TDS deducted on the slip tallies with the Form 16 totals. You can add a third sheet for comments or supporting breakdowns.</p>
            <h3>Formatting Hints</h3>
            <p>After export, apply table styles in Excel, freeze header rows, and use number formats for INR. Rename sheet tabs with dates (e.g., “Slip April” and “Form 16 AY 2025‑26”) for clarity in submissions.</p>
            <h3>Privacy Note</h3>
            <p>The conversion runs entirely on your device. No uploads or accounts are involved.</p>
          </div>
          {(slipRows.length>0 || f16Rows.length>0) && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Preview</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Salary Slip</h3>
                  <div className="overflow-auto">
                    <table className="min-w-full text-sm">
                      <tbody>
                        {slipRows.slice(0, 50).map((r, i) => (
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
                <div>
                  <h3 className="font-semibold mb-2">Form 16</h3>
                  <div className="overflow-auto">
                    <table className="min-w-full text-sm">
                      <tbody>
                        {f16Rows.slice(0, 50).map((r, i) => (
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
              </div>
            </div>
          )}
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-6">
            <h2>Introduction</h2>
            <p>Produce a single workbook with evidence from a salary slip and a Form 16. The flow mirrors a reader‑friendly explainer with definitions, working, features, benefits, and steps.</p>
            <h2>What Is This Tool?</h2>
            <p>A client‑side combiner that extracts rows from each PDF and saves them as two sheets in one Excel.</p>
            <h2>How It Works</h2>
            <p>Both PDFs are parsed locally using the same split strategies. Each sheet keeps the original rows for transparency.</p>
            <h2>Features</h2>
            <ul>
              <li>Two drop‑zones (Slip + Form 16)</li>
              <li>Auto/Colon/Spaces split modes</li>
              <li>Single XLSX with two named sheets</li>
            </ul>
            <h2>Benefits</h2>
            <ul>
              <li>Convenient for submissions and cross‑checks</li>
              <li>Clear evidence trail without formatting loss</li>
            </ul>
            <h2>How to Use</h2>
            <ol>
              <li>Load a monthly salary slip</li>
              <li>Load the matching year’s Form 16</li>
              <li>Export the combined workbook</li>
            </ol>
            <h2>FAQs</h2>
            <p><strong>Different layouts?</strong> Try another split mode. <strong>Privacy?</strong> All processing is local.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalarySlipAndForm16ToExcel;
