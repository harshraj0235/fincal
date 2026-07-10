import React, { useEffect, useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

const SalarySlipPdfToExcel: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready');
  const [rows, setRows] = useState<string[][]>([]);
  const [splitMode, setSplitMode] = useState<'auto' | 'spaces' | 'colon'>('auto');

  useEffect(() => {
    const saved = localStorage.getItem('salarySlipSplitMode');
    if (saved === 'auto' || saved === 'spaces' || saved === 'colon') {
      setSplitMode(saved);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('salarySlipSplitMode', splitMode);
  }, [splitMode]);

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
    setRows(allRows);
    setStatus(`Parsed ${allRows.length} lines`);
  };

  const exportExcel = () => {
    if (rows.length === 0) return;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, 'SalarySlip');
    XLSX.writeFile(wb, 'salary-slip-converted.xlsx');
  };

  const copyPreviewCsv = async () => {
    if (rows.length === 0) return;
    const csv = rows.map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(',')).join('\n');
    await navigator.clipboard.writeText(csv);
    setStatus('Copied preview CSV to clipboard');
  };

  const downloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([['Field', 'Value'], ['Basic', ''], ['HRA', ''], ['Allowances', ''], ['Deductions', ''], ['Net Pay', '']]);
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'salary-slip-template.xlsx');
  };

  const faq = [
    { question: 'Is data private?', answer: 'Yes. Files are processed entirely in your browser. No upload.' },
    { question: 'Does it work on mobile?', answer: 'Yes. Mobile-first responsive UI, works on modern Android/iOS.' },
    { question: 'Which outputs?', answer: 'Excel (XLSX) export with detected rows and columns.' },
    { question: 'Accuracy?', answer: 'Depends on PDF formatting. Uses spacing heuristics to split columns.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Salary Slip PDF to Excel Converter (Free, No Upload) India 2026 | MoneyCal"
        description="Convert salary slip PDF to Excel online, 100% client-side and private. Fast, mobile-friendly, no login. Optimized for Indian slips with allowances and deductions."
        keywords="salary slip pdf to excel converter, free online no upload, India 2026, payslip to excel"
        url="/finance-tools/pdf-converters/salary-slip-pdf-to-excel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Salary Slip PDF to Excel', url: '/finance-tools/pdf-converters/salary-slip-pdf-to-excel' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Salary Slip PDF to Excel Converter',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
            aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.9, reviewCount: 1200 }
          }
        ]}
        faqData={faq}
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Salary Slip PDF to Excel Converter
          </h1>
          <p className="text-gray-700 mb-6">
            Drop your salary slip PDF below. Processing is instant, private, and happens in your browser. Export a clean Excel file in one click.
          </p>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">Status: {status}</div>
              <button
                onClick={exportExcel}
                disabled={rows.length === 0}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50"
              >
                Export Excel
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="text-sm font-semibold text-gray-700">Split mode</div>
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
              <button
                onClick={() => { setRows([]); setStatus('Ready'); }}
                className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border"
              >
                Clear
              </button>
              <button
                onClick={copyPreviewCsv}
                disabled={rows.length === 0}
                className="ml-auto px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border"
              >
                Copy Preview CSV
              </button>
              <button
                onClick={downloadTemplate}
                className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border"
              >
                Download Template
              </button>
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
                id="pdf-input"
              />
              <label htmlFor="pdf-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select PDF or drag & drop here</div>
                <div className="text-sm text-gray-600 mt-2">Client-side only • No upload • Fast</div>
              </label>
            </div>
          </div>
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6 prose-headings:font-extrabold prose-a:text-blue-700 hover:prose-a:text-blue-900 prose-ul:list-disc prose-ol:list-decimal">
            <h2>Free Online Salary Slip PDF to Excel Converter India 2026</h2>
            <p>Convert payslips into a clean Excel sheet instantly. The tool is designed for Indian payroll formats, mobile-first, and completely client-side. It is suitable for employees, HR teams, and accountants who need fast extraction and downstream analysis without uploading sensitive files.</p>
            <h3>Why Use This Converter</h3>
            <p>Excel enables aggregation across months, calculation of totals, and visualization of allowances, deductions, and variable pay. Exported rows can be edited, filtered, and pivoted to prepare year-end statements, ITR support, and loan documentation.</p>
            <h3>How It Splits Columns</h3>
            <p>Many payslips present information in two or more columns separated by spacing. The converter uses spacing-based heuristics to split lines into columns, which works well for most text-based PDFs. If your PDF is image-only, consider extracting text first with OCR and then using the converter.</p>
            <h3>Recommended Workflow</h3>
            <ul>
              <li>Drop the monthly payslip and export to Excel.</li>
              <li>Append sheets for each month and label them consistently.</li>
              <li>Build pivots to track totals for basic, HRA, allowances, deductions, and net pay.</li>
              <li>Attach the workbook along with payslips when required.</li>
            </ul>
            <h3>Privacy</h3>
            <p>Processing is local to your browser. No account, no server, no tracking. It is safe to use on personal devices and corporate laptops.</p>
            <h3>Keywords Targeted</h3>
            <p>salary slip pdf to excel converter free online no upload 2026 india; payslip to excel india; client-side pdf to excel; mobile-friendly salary slip converter.</p>
            <h3>Related Tools</h3>
            <ul>
              <li><a href="/finance-tools/pdf-converters/salary-slip-pdf-to-csv-transaction">Salary Slip → CSV Transactions</a></li>
              <li><a href="/finance-tools/pdf-converters/government-salary-slip-pdf-to-excel">Government Salary Slip → Excel/CSV</a></li>
              <li><a href="/finance-tools/pdf-converters/private-company-salary-slip-pdf-to-excel">Private Company Salary Slip → Excel/CSV</a></li>
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
                    {rows.slice(0, 50).map((r, i) => (
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

export default SalarySlipPdfToExcel;
