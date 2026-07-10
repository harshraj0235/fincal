import React, { useEffect, useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

type SplitMode = 'auto' | 'spaces' | 'colon';

const Form16PartABPdfToExcel: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready');
  const [rows, setRows] = useState<string[][]>([]);
  const [splitMode, setSplitMode] = useState<SplitMode>('auto');
  const [focusLabels, setFocusLabels] = useState<boolean>(true);

  useEffect(() => {
    const s = localStorage.getItem('f16SplitMode');
    if (s === 'auto' || s === 'spaces' || s === 'colon') setSplitMode(s);
    const f = localStorage.getItem('f16FocusLabels');
    if (f === 'true' || f === 'false') setFocusLabels(f === 'true');
  }, []);
  useEffect(() => { localStorage.setItem('f16SplitMode', splitMode); }, [splitMode]);
  useEffect(() => { localStorage.setItem('f16FocusLabels', String(focusLabels)); }, [focusLabels]);

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
    const pdf = await pdfjsLib.getDocument(url).promise;
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
      const keys = [
        'tan', 'pan of employer', 'pan of employee', 'assessment year', 'previous year', 'gross salary',
        'exemptions', 'u/s 10', 'standard deduction', 'income from salary', 'chapter vi-a', '80c', '80d', '80tta', '80ccd', '80g',
        'total deductions', 'income chargeable', 'tax on total income', 'rebate', 'surcharge', 'cess', 'relief u/s 89', 'net tax payable',
        'total tds', 'tds deposited'
      ];
      out = allRows.filter(r => r.length >= 2 && keys.some(k => r[0].toLowerCase().includes(k)));
    }
    setRows(out);
    setStatus(`Parsed ${out.length} lines`);
  };

  const exportExcel = () => {
    if (rows.length === 0) return;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, 'Form16');
    XLSX.writeFile(wb, 'form16-part-a-b-tax-sheet.xlsx');
  };

  const faq = [
    { question: 'Private?', answer: 'Yes. 100% in-browser. No uploads or accounts.' },
    { question: 'Best split mode?', answer: 'Start with Auto. Switch to Colon for “Label: Value” lines or Spaces for table-like layouts.' },
    { question: 'What fields?', answer: 'TAN, PANs, AY, Gross Salary, Exemptions (u/s 10), Chapter VI-A (80C etc), tax and TDS totals.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Form 16 Part A & B PDF to Excel Tax Sheet (Client-side) | MoneyCal"
        description="Convert Form 16 Part A & B PDF to a structured Excel tax sheet. Private, mobile-friendly. No upload."
        keywords="form 16 part a b pdf to excel converter 2026, india, no upload"
        url="/finance-tools/pdf-converters/form16-part-ab-pdf-to-excel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Form 16 Part A & B → Excel', url: '/finance-tools/pdf-converters/form16-part-ab-pdf-to-excel' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Form 16 Part A & B PDF to Excel',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          }
        ]}
        faqData={faq}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Form 16 Part A & B PDF → Excel Tax Sheet</h1>
          <p className="text-gray-700 mb-6">Extract TAN, PAN, salary components, Chapter VI-A deductions and tax computation into Excel. Client-side only.</p>
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
              <label className="ml-0 md:ml-6 text-sm text-gray-700 flex items-center gap-2">
                <input type="checkbox" checked={focusLabels} onChange={()=>setFocusLabels(v=>!v)} />
                Focus on tax labels
              </label>
              <div className="ml-auto text-sm text-gray-600">Status: {status}</div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <button onClick={exportExcel} disabled={rows.length === 0} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50">Export Excel</button>
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
                id="f16ab-input"
              />
              <label htmlFor="f16ab-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select PDF or drag & drop here</div>
                <div className="text-sm text-gray-600 mt-2">Client-side only • No upload • Fast</div>
              </label>
            </div>
          </div>
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6 prose-headings:font-extrabold prose-a:text-blue-700 hover:prose-a:text-blue-900 prose-ul:list-disc prose-ol:list-decimal">
            <h2>Form 16 Part A & B to Excel Converter (India 2026)</h2>
            <p>This tool converts your Form 16 into a structured Excel sheet that captures identification (TAN, employer PAN, employee PAN, assessment year), income and salary heads, exemptions under section 10, deductions under Chapter VI‑A (including 80C, 80CCD, 80D, 80TTA), computation of tax on total income, health and education cess, relief under section 89, and the TDS totals deposited by the employer. It runs entirely in your browser for maximum privacy and control.</p>
            <h3>How to Use</h3>
            <p>Drop a text‑based (not scanned) Form 16 PDF. Start with Split set to Auto. If your PDF shows lines like “Label: Value”, switch to Colon. If it looks like tables with multiple spaces between columns, try Spaces. Keep “Focus on tax labels” enabled to filter out address blocks, disclaimers, or footers so the exported sheet stays actionable.</p>
            <h3>What Gets Extracted</h3>
            <p>Typical fields parsed include TAN, PAN of employer, PAN of employee, Assessment Year, Previous Year, Gross Salary, Exemptions (u/s 10), Standard Deduction, Income from Salary (after standard deduction and exemptions), Deductions under Chapter VI‑A (80C, 80CCD, 80D, 80TTA and more), Income chargeable under the head salaries, Tax on total income, Rebate (if any), Surcharge (if applicable), Health and Education Cess, Relief u/s 89, Net tax payable, Total TDS, and TDS deposited.</p>
            <h3>Decision Pathways</h3>
            <p>Choose split strategy based on your Form 16’s layout. Colon splitting is most effective when the document uses explicit “Label: Value” formatting. Spaces splitting works when values appear in aligned table columns. Auto tries both heuristics and merges outcomes. If your preview shows duplicated or jumbled lines, switch modes and re‑drop the file.</p>
            <h3>Normalization Tips</h3>
            <p>Values in Indian currency may contain symbols and commas. In Excel, you can standardize numbers by removing commas or converting to numeric cells with your preferred formatting. If an employer uses alternative terminology, you can rename rows in Excel; the data rows remain simple two‑column pairs for easy relabeling.</p>
            <h3>Edge Cases</h3>
            <p>Some employers issue scanned or image‑based PDFs. This tool requires text content to extract. For scans, run OCR first (e.g., using any offline OCR app) and then import the text‑enabled PDF. In rare cases, headings are broken over multiple lines; switching split modes usually yields better alignment.</p>
            <h3>Compliance Context</h3>
            <p>Form 16 summarizes TDS deducted and includes a salary computation snapshot. The sheet this tool produces is not a filing instrument; it is a working file for review, reconciliation, and personal records. Always verify figures with the original Form 16 and Form 26AS or AIS/Traces where applicable.</p>
            <h3>Examples</h3>
            <p>Gross Salary: 9,80,000 becomes a row [Gross Salary, 9,80,000]. Deductions under Chapter VI‑A (80C): 1,50,000 becomes [Chapter VI‑A 80C, 1,50,000]. If the PDF states Income chargeable under the head salaries: 8,20,000, that yields [Income from Salary, 8,20,000].</p>
            <h3>Workflow Recommendations</h3>
            <p>Use this page early in your tax prep to audit employer calculations, compare against your own deductions, and identify gaps (e.g., missing 80C proof or HRA mismatch). Keep the Excel as a reference while filling ITR utilities or when consulting a professional.</p>
            <h3>Privacy & Security</h3>
            <p>Processing is entirely local to your device. Your files never leave your browser. There is no upload, account, or tracking. Close the tab to discard all in‑memory data; only the exported Excel you choose to save remains on your device.</p>
            <h3>Troubleshooting</h3>
            <p>If you see empty results, confirm the PDF is text‑based by copying text from it in a regular PDF viewer. If headings appear but values are missing, try the other split mode. If values contain extra characters, clean them in Excel or use Find & Replace for commas and symbols.</p>
            <h3>Related Tools</h3>
            <ul>
              <li><a href="/finance-tools/pdf-converters/form16-pdf-to-itr-input-excel">Form 16 → ITR Input Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/salary-slip-pdf-to-excel">Salary Slip → Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/salary-slip-pdf-to-csv-transaction">Salary Slip → CSV Transactions</a></li>
            </ul>
          </div>
          {rows.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Preview</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <tbody>
                    {rows.slice(0, 80).map((r, i) => (
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
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-6 prose-headings:font-extrabold prose-a:text-blue-700 hover:prose-a:text-blue-900 prose-ul:list-disc prose-ol:list-decimal">
            <h2>Introduction</h2>
            <p>This page helps convert Form 16 Part A and Part B into a structured Excel for quick review and reconciliation. It mirrors a clear explainer flow: what the tool is, how it works, key features and benefits, and step‑by‑step usage.</p>
            <h2>What Is This Tool?</h2>
            <p>A client‑side Form 16 extractor that reads text from your PDF and maps common labels (TAN, PANs, AY, salary heads, VI‑A deductions, tax computation, TDS) into two‑column Excel rows.</p>
            <h2>How It Works</h2>
            <p>The PDF text is read locally in your browser. Lines are parsed using split strategies (Colon for “Label: Value”, Spaces for table‑like gaps). A focused label filter reduces noise and keeps the export actionable.</p>
            <h2>Features</h2>
            <ul>
              <li>Auto/Colon/Spaces split modes for flexible parsing</li>
              <li>Focus filter for tax‑relevant labels</li>
              <li>Instant XLSX export with clean two‑column rows</li>
              <li>Zero uploads, fully private</li>
            </ul>
            <h2>Benefits</h2>
            <ul>
              <li>Fast reconciliation of employer computation vs self records</li>
              <li>Portable working sheet for ITR preparation</li>
              <li>Easier sharing and archival than a raw PDF</li>
            </ul>
            <h2>How to Use</h2>
            <ol>
              <li>Drop your Form 16 PDF</li>
              <li>Set Split to Auto; switch to Colon/Spaces if needed</li>
              <li>Enable Focus on tax labels for a concise sheet</li>
              <li>Export Excel and verify the fields</li>
            </ol>
            <h2>FAQs</h2>
            <p><strong>Scanned PDFs?</strong> Use OCR first to obtain text. <strong>Mismatch?</strong> Try another split mode or rename labels in Excel.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form16PartABPdfToExcel;
