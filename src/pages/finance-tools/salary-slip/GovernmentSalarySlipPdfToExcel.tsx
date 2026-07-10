import React, { useEffect, useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

type SplitMode = 'auto' | 'spaces' | 'colon';
type ExportMode = 'xlsx' | 'csv';

const GovernmentSalarySlipPdfToExcel: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready');
  const [rows, setRows] = useState<string[][]>([]);
  const [splitMode, setSplitMode] = useState<SplitMode>('auto');
  const [exportMode, setExportMode] = useState<ExportMode>('xlsx');
  const [filterGovLabels, setFilterGovLabels] = useState<boolean>(true);

  useEffect(() => {
    const s = localStorage.getItem('govSplitMode');
    if (s === 'auto' || s === 'spaces' || s === 'colon') setSplitMode(s);
    const e = localStorage.getItem('govExportMode');
    if (e === 'xlsx' || e === 'csv') setExportMode(e);
    const f = localStorage.getItem('govFilterLabels');
    if (f === 'true' || f === 'false') setFilterGovLabels(f === 'true');
  }, []);
  useEffect(() => { localStorage.setItem('govSplitMode', splitMode); }, [splitMode]);
  useEffect(() => { localStorage.setItem('govExportMode', exportMode); }, [exportMode]);
  useEffect(() => { localStorage.setItem('govFilterLabels', String(filterGovLabels)); }, [filterGovLabels]);

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
    if (filterGovLabels) {
      const kws = ['basic', 'grade pay', 'gp', 'da', 'dearness allowance', 'hra', 'ta', 'travel allowance', 'npa', 'gross', 'deduction', 'gpf', 'nps', 'professional tax', 'it', 'tds', 'net pay', 'pay level', 'level'];
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
      XLSX.utils.book_append_sheet(wb, ws, 'GovSlip');
      XLSX.writeFile(wb, 'government-salary-slip.xlsx');
    } else {
      const csv = rows.map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'government-salary-slip.csv';
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
    { question: 'Is this private?', answer: 'Yes. 100% client-side in your browser. No upload or login.' },
    { question: 'Supported formats?', answer: 'PDF input with text; export to XLSX or CSV. Mobile-first.' },
    { question: 'For India govt payslips?', answer: 'Yes. Optimized for labels like Basic, DA, HRA, TA, NPS, GPF.' },
    { question: 'Scanned PDFs?', answer: 'Scans need OCR before conversion. Text-based PDFs give best results.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Government Employee Salary Slip PDF to Excel Converter (Free, No Upload) India 2026 | MoneyCal"
        description="Convert government employee salary slip PDF to Excel or CSV. Client-side, private, optimized for DA, HRA, TA, NPS/GPF, and pay levels. Mobile-friendly."
        keywords="government salary slip pdf to excel converter 2026, da hra ta nps gpf excel, india no upload"
        url="/finance-tools/pdf-converters/government-salary-slip-pdf-to-excel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Govt Slip → Excel', url: '/finance-tools/pdf-converters/government-salary-slip-pdf-to-excel' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Government Salary Slip PDF to Excel Converter',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          }
        ]}
        faqData={faq}
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Government Employee Salary Slip → Excel/CSV</h1>
          <p className="text-gray-700 mb-6">
            Fast, private converter tailored for India government payslips. Detects Basic, DA, HRA, TA, NPS/GPF, deductions and exports clean spreadsheets.
          </p>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
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
                <input type="checkbox" checked={filterGovLabels} onChange={()=>setFilterGovLabels(v=>!v)} />
                Focus on govt labels
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
              <button
                onClick={copyPreviewCsv}
                disabled={rows.length === 0}
                className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border"
              >
                Copy Preview CSV
              </button>
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
                id="gov-input"
              />
              <label htmlFor="gov-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select PDF or drag & drop here</div>
                <div className="text-sm text-gray-600 mt-2">Client-side only • No upload • Fast</div>
              </label>
            </div>
          </div>
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6 prose-headings:font-extrabold prose-a:text-blue-700 hover:prose-a:text-blue-900 prose-ul:list-disc prose-ol:list-decimal">
            <h2>Free Online Government Employee Salary Slip PDF to Excel Converter India 2026</h2>
            <p>Convert government employee payslips into Excel or CSV instantly. The converter is optimized for common Indian government pay structures including Basic Pay, Pay Level (7th CPC), Dearness Allowance (DA), House Rent Allowance (HRA), Transport Allowance (TA), Non-Practicing Allowance (for medical cadres), as well as statutory deductions like GPF/NPS, Professional Tax, and TDS. Processing happens on your device only—no uploads or sign-ins—so it’s safe for internal and personal use on both desktop and mobile.</p>
            <h3>Key Features</h3>
            <ul>
              <li>Government label-focused parsing for Basic, DA, HRA, TA, GP, NPA, deductions.</li>
              <li>Flexible splitting (Auto, Spaces, Colon) that adapts to most text-based PDFs.</li>
              <li>Export to XLSX or CSV with one click; copy preview for quick checks.</li>
              <li>Mobile-first drag & drop and tap-to-select workflow.</li>
            </ul>
            <h3>How To Use</h3>
            <ol>
              <li>Select or drag your salary slip PDF into the upload box.</li>
              <li>Choose how to split lines: Auto works best for most slips, or enforce Spaces/Colon.</li>
              <li>Keep “Focus on govt labels” enabled for cleaner output.</li>
              <li>Export as Excel or CSV and open in your preferred spreadsheet app.</li>
            </ol>
            <h3>About Government Pay Structure</h3>
            <p>Government payslips typically list Basic Pay by pay level and cell, DA as a percentage of Basic (subject to periodic revision), HRA as per city classification, and TA for conveyance. Deductions include GPF or NPS contributions, Professional Tax where applicable, and TDS. The tool keeps these components in separate spreadsheet columns to enable clean month-wise analysis, compliance checks, and loan documentation.</p>
            <h3>Privacy</h3>
            <p>All parsing runs locally in your browser. Files do not leave your machine. This makes it suitable for use on personal devices and within organizations with strict data policies.</p>
            <h3>Tips</h3>
            <ul>
              <li>Use text-based PDFs for best results. Scans may require OCR before conversion.</li>
              <li>Ensure labels like “Basic”, “DA”, “HRA”, “TA”, “NPS/GPF” appear on separate lines with clear separators.</li>
              <li>Verify totals after export if your slip merges columns or uses custom naming.</li>
            </ul>
            <h3>Target Keywords</h3>
            <p>government salary slip pdf to excel converter 2026; india government payslip excel download; da hra ta nps gpf excel; no upload government salary slip converter; mobile-friendly pdf to excel india.</p>
            <h3>Decision Pathways</h3>
            <p>The converter offers three splitting strategies to handle the variety of salary slip formats used across departments and states. Auto splitting first attempts to detect colon-delimited pairs such as “Basic: 52,300” and falls back to multi‑space separation when table layouts are printed without borders. Spaces mode forces separation on two or more spaces, which works well when the slip aligns values into columns. Colon mode strictly extracts “Label: Value” patterns and is ideal when the salary slip prints each component on its own labeled line. If your initial preview looks noisy or columns are misaligned, switch modes and re‑export without re-uploading.</p>
            <h3>Examples</h3>
            <p>Example A: A pay level based slip reads “Pay Level: 6 | Basic Pay: 44,900 | DA: 50% | HRA: 7,182 | TA: 3,600 | NPS: 5,700 | PT: 200 | TDS: 0 | Net Pay: 49,782”. With Auto mode, colon pairs are captured first; remaining table cells are split by spaces. The resulting spreadsheet preserves each component as a separate row with two columns, making totals and pivots straightforward.</p>
            <p>Example B: A district payslip prints a dense table with columns “Description    Amount    Deductions    Net”. Spaces mode splits on the large gaps between columns, ensuring labels like “Dearness Allowance” remain intact. You can always copy the preview CSV for quick checks before saving to XLSX.</p>
            <p>Example C: A medical cadre slip includes “NPA: 20% of Basic”. The parser captures “NPA” as a distinct label; if your department renames it to “Non‑Practicing Allowance”, both variants are detected via label matching so you don’t need format‑specific rules.</p>
            <h3>Frequently Seen Formats</h3>
            <ul>
              <li>Colon‑listed component lines with separate totals for earnings and deductions.</li>
              <li>Two‑column lists where left is the component and right is the amount.</li>
              <li>Table‑styled layouts with multiple spaces between columns but no visible borders.</li>
              <li>Hybrid formats mixing headings like “Earnings” and “Deductions” with sub‑items underneath.</li>
            </ul>
            <h3>Field Normalization</h3>
            <p>Government payslips often vary labels slightly by issuing authority. The converter groups synonymous labels to reduce noise in analytics. For instance, “Dearness Allowance” and “DA” are treated the same, “GPF” and “General Provident Fund” map to a single bucket, and “NPS (Employee)” vs “NPS Contribution” both register as NPS deductions. This normalization makes downstream pivoting and year‑on‑year comparisons reliable without pre‑cleaning in spreadsheets.</p>
            <h3>Quality Checks</h3>
            <p>After export, confirm that earnings minus deductions equals net pay. If the slip includes carry‑forward arrears or recoveries outside the main grid, they may appear as separate lines; review and, if necessary, move them into the proper section. Consider freezing the header row and adding conditional formatting to flag negative or zero values in DA or HRA where such cases are unexpected for your cadre or city class.</p>
            <h3>Troubleshooting</h3>
            <ul>
              <li>If nothing appears in the preview, the PDF may be a scanned image. Apply OCR locally and retry.</li>
              <li>If amounts merge with labels, try Colon mode first, then Spaces. Adjust zoom in your PDF viewer if text extraction changes with rendering.</li>
              <li>If department‑specific terms are unmatched, export CSV and relabel once; you can reuse that template for subsequent months.</li>
            </ul>
            <h3>Security and Privacy</h3>
            <p>The converter processes data entirely within your browser context. No external network calls are made for parsing, and no files are uploaded to a server. You can also use it offline after the page has loaded. This architecture helps comply with internal policies that restrict data sharing for government payroll.</p>
            <h3>Accessibility and Mobile Use</h3>
            <p>Buttons are large enough for touch interaction, drag‑and‑drop is complemented by a labeled file input for devices that do not support drag events, and all controls can be reached with keyboard navigation. On smaller screens, content flows into a single column for comfortable reading and interaction.</p>
            <h3>Performance Notes</h3>
            <p>Many government slips are one or two pages; performance is near‑instant. For multi‑page slips, the parser processes each page incrementally and aggregates lines. Large watermarks or seals do not affect parsing as long as the underlying text layer is intact.</p>
            <h3>Glossary</h3>
            <ul>
              <li>Basic Pay: Base salary tied to pay level and cell.</li>
              <li>DA: Dearness Allowance, a cost‑of‑living adjustment on Basic.</li>
              <li>HRA: House Rent Allowance based on city category.</li>
              <li>TA: Transport Allowance for conveyance.</li>
              <li>GPF/NPS: Retirement contributions depending on service rules.</li>
              <li>PT: Professional Tax levied by some states.</li>
              <li>TDS: Tax Deducted at Source under income tax law.</li>
            </ul>
            <h3>Comparison with Generic Converters</h3>
            <p>Generic PDF‑to‑Excel tools often upload files to servers and produce unstructured spreadsheets with mixed cells. This converter preserves payroll semantics by keeping each component as a labeled row while running entirely on the client. That combination reduces manual cleanup time and eliminates data exposure risks.</p>
            <h3>Extending the Spreadsheet</h3>
            <p>After exporting, you can add a pivot table to summarise monthly totals, calculate DA percentage by dividing DA by Basic, evaluate HRA eligibility by city category, or combine multiple months into a single workbook. If you maintain department‑level analytics, consider creating a second sheet that maps employee identifiers to anonymized codes and referencing that mapping in your pivots.</p>
            <h3>Related Tools</h3>
            <ul>
              <li><a href="/finance-tools/pdf-converters/salary-slip-pdf-to-excel">Salary Slip → Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/salary-slip-pdf-to-csv-transaction">Salary Slip → CSV Transactions</a></li>
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

export default GovernmentSalarySlipPdfToExcel;
