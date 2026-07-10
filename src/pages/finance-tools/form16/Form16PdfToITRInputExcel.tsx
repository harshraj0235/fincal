import React, { useEffect, useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

type SplitMode = 'auto' | 'spaces' | 'colon';

const Form16PdfToITRInputExcel: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready');
  const [rows, setRows] = useState<Record<string, string>>({});
  const [splitMode, setSplitMode] = useState<SplitMode>('auto');

  useEffect(() => {
    const s = localStorage.getItem('f16ITRSplitMode');
    if (s === 'auto' || s === 'spaces' || s === 'colon') setSplitMode(s);
  }, []);
  useEffect(() => { localStorage.setItem('f16ITRSplitMode', splitMode); }, [splitMode]);

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
    const out: Record<string, string> = {};
    const setIf = (k: string, v: string) => { if (!out[k] && v) out[k] = v; };
    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p);
      const content = await page.getTextContent();
      const pageText = content.items.map((i: any) => ('str' in i ? i.str : '')).join('\n');
      const lines = pageText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
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
        const lk = k.toLowerCase();
        if (lk.includes('pan of employee')) setIf('PAN', v);
        if (lk.includes('assessment year')) setIf('AssessmentYear', v);
        if (lk.includes('gross salary')) setIf('GrossSalary', v);
        if (lk.includes('standard deduction')) setIf('StandardDeduction', v);
        if (lk.includes('exemptions') || lk.includes('u/s 10')) setIf('ExemptionsUS10', v);
        if (lk.includes('80c')) setIf('80C', v);
        if (lk.includes('80d')) setIf('80D', v);
        if (lk.includes('80tta')) setIf('80TTA', v);
        if (lk.includes('80ccd')) setIf('80CCD', v);
        if (lk.includes('income chargeable')) setIf('IncomeFromSalary', v);
        if (lk.includes('tax on total income')) setIf('TaxOnTotalIncome', v);
        if (lk.includes('health and education cess')) setIf('Cess', v);
        if (lk.includes('relief u/s 89')) setIf('Relief89', v);
        if (lk.includes('total tds') || lk.includes('tds deposited')) setIf('TotalTDS', v);
      });
    }
    URL.revokeObjectURL(url);
    setRows(out);
    setStatus('Mapped key ITR inputs');
  };

  const exportITRTemplate = () => {
    const headers = ['Field','Value'];
    const mapping: Array<[string,string]> = Object.entries(rows).map(([k,v])=>[k,v]);
    const aoa = [headers, ...mapping];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    XLSX.utils.book_append_sheet(wb, ws, 'ITRInputs');
    XLSX.writeFile(wb, 'form16-to-itr-inputs.xlsx');
  };

  const faq = [
    { question: 'Template goal?', answer: 'Provide a simple ITR input sheet with key fields extracted from Form 16.' },
    { question: 'Editable?', answer: 'Yes. Adjust any value before filing ITR. This is an aid, not a filing tool.' },
    { question: 'Private?', answer: 'Yes. Runs locally in your browser.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Form 16 PDF to ITR Input Excel Template (Client-side) | MoneyCal"
        description="Convert Form 16 PDF into a minimal ITR input Excel template. Private, no upload."
        keywords="form 16 pdf to itr input excel converter free, india 2026"
        url="/finance-tools/pdf-converters/form16-pdf-to-itr-input-excel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Form 16 → ITR Input Excel', url: '/finance-tools/pdf-converters/form16-pdf-to-itr-input-excel' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Form 16 to ITR Input Excel',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          }
        ]}
        faqData={faq}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Form 16 PDF → ITR Input Excel Template</h1>
          <p className="text-gray-700 mb-6">Extract key ITR fields like PAN, Assessment Year, Gross Salary, Standard Deduction, Exemptions, 80C/80D, Income from Salary, tax and TDS totals.</p>
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
              <button onClick={exportITRTemplate} disabled={Object.keys(rows).length===0} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50">Export Template</button>
              <button onClick={()=>{setRows({}); setStatus('Ready');}} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border">Clear</button>
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
                id="f16itr-input"
              />
              <label htmlFor="f16itr-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select PDF or drag & drop here</div>
                <div className="text-sm text-gray-600 mt-2">Client-side only • No upload • Fast</div>
              </label>
            </div>
          </div>
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6 prose-headings:font-extrabold prose-a:text-blue-700 hover:prose-a:text-blue-900 prose-ul:list-disc prose-ol:list-decimal">
            <h2>From Form 16 to a Clean ITR Input Sheet</h2>
            <p>This page builds a simple, human‑readable input sheet for ITR preparation, extracting key labels from your Form 16 and arranging them into two columns: Field and Value. The result is a compact workbook that you can review, edit, and hand off into your preferred ITR utility. The parsing runs locally in your browser for privacy.</p>
            <h3>Why a Minimal Template</h3>
            <p>Many taxpayers do not need the full structure of a Form 16 reflected verbatim. Instead, they benefit from a concise list of the half‑dozen values they must confirm when preparing their return. This includes identification, the effective salary income after standard deduction and exemptions, key Chapter VI‑A deductions like 80C and 80D, and the totals for tax and TDS.</p>
            <h3>Recommended Steps</h3>
            <p>Start by importing your Form 16 and exporting the template. Check PAN and AY first. Verify gross salary, standard deduction, and exemptions u/s 10. Review 80C/80D/80CCD/80TTA deductions. Confirm the income from salary and the tax on total income. Ensure TDS totals match Form 26AS/AIS.</p>
            <h3>Editing and Overrides</h3>
            <p>The template is intentionally plain so you can override any value before filing. If you invested after the Form 16 cut‑off or if Chapter VI‑A proofs were partly unaccounted for, update the values here and carry them into the filing utility. You can also add rows for additional deductions not present in your employer’s computation.</p>
            <h3>Handling Mismatches</h3>
            <p>If employer calculations differ from your own books, keep both figures side by side in Excel for a quick reconciliation. You may add a column for “Source” (Employer vs Self) and one for “Notes”. Once reconciled, use the final column for ITR entries.</p>
            <h3>Troubleshooting Extraction</h3>
            <p>If a field is missing, try switching the split mode. Colon works best for “Label: Value” lines. Spaces works for table‑like layouts. Auto tries both and captures the first matching label per key. For scanned PDFs, run OCR first to enable text selection.</p>
            <h3>Security Posture</h3>
            <p>No transmission occurs; the PDF is read locally and discarded when you close the tab. Only the exported Excel persists at your discretion.</p>
          </div>
          {Object.keys(rows).length > 0 && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Preview</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <tbody>
                    {Object.entries(rows).map(([k,v], i) => (
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2 font-semibold text-gray-900">{k}</td>
                        <td className="px-3 py-2 text-gray-700">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-6 prose-headings:font-extrabold prose-a:text-blue-700 hover:prose-a:text-blue-900 prose-ul:list-disc prose-ol:list-decimal">
            <h2>Introduction</h2>
            <p>Convert a complex Form 16 into a minimal ITR input sheet. The structure mirrors a clear explainer: what the tool is, how it works, benefits, and exact steps.</p>
            <h2>What Is This Tool?</h2>
            <p>A client‑side mapper that pulls essential fields (PAN, AY, Gross Salary, Standard Deduction, u/s 10, 80C/80D/80CCD/80TTA, Income from Salary, Tax, Cess, TDS totals) into a two‑column Excel.</p>
            <h2>How It Works</h2>
            <p>Reads PDF text locally and matches label patterns via split modes. The first match per key is retained for clarity. You can edit values in the exported sheet.</p>
            <h2>Features</h2>
            <ul>
              <li>Auto/Colon/Spaces parsing modes</li>
              <li>Two‑column, human‑readable template</li>
              <li>Local‑only processing</li>
            </ul>
            <h2>Benefits</h2>
            <ul>
              <li>Faster ITR prep with a concise working list</li>
              <li>Easy reconciliation with 26AS/AIS</li>
            </ul>
            <h2>How to Use</h2>
            <ol>
              <li>Drop Form 16</li>
              <li>Use Auto split or try Colon/Spaces</li>
              <li>Export and adjust fields before filing</li>
            </ol>
            <h2>FAQs</h2>
            <p><strong>Missing fields?</strong> Switch split mode or fill manually. <strong>Privacy?</strong> Everything stays in your browser.</p>
            <h2>Related Tools</h2>
            <ul>
              <li><a href="/finance-tools/pdf-converters/form16-part-ab-pdf-to-excel">Form 16 Part A & B → Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/salary-slip-pdf-to-excel">Salary Slip → Excel</a></li>
              <li><a href="/finance-tools/pdf-converters/salary-slip-pdf-to-csv-transaction">Salary Slip → CSV Transactions</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form16PdfToITRInputExcel;
