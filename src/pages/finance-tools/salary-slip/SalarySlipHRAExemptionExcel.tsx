import React, { useEffect, useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

type Row = { month: string; basic: number; da: number; hra: number; rent: number; metro: boolean; exempt: number; taxableHRA: number };

const SalarySlipHRAExemptionExcel: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready');
  const [rows, setRows] = useState<Row[]>([]);
  const [defaultRent, setDefaultRent] = useState<number>(0);
  const [defaultMetro, setDefaultMetro] = useState<boolean>(true);

  useEffect(() => {
    const r = localStorage.getItem('hraDefaultRent');
    if (r) { const v = parseFloat(r); if (!isNaN(v)) setDefaultRent(v); }
    const m = localStorage.getItem('hraDefaultMetro');
    if (m === 'true' || m === 'false') setDefaultMetro(m === 'true');
  }, []);
  useEffect(() => { localStorage.setItem('hraDefaultRent', String(defaultRent)); }, [defaultRent]);
  useEffect(() => { localStorage.setItem('hraDefaultMetro', String(defaultMetro)); }, [defaultMetro]);

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

  const detectMonth = (haystack: string) => {
    const m = haystack.toLowerCase().match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\b/);
    return m ? m[1].toUpperCase() : '';
  };

  const parseAmounts = (text: string) => {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const norm = (s: string) => { const n = parseFloat(s.replace(/₹|,/g,'').trim()); return isNaN(n) ? 0 : n; };
    let basic = 0, hra = 0, da = 0;
    lines.forEach(line => {
      const m = line.match(/^([A-Za-z ]+)\s*[:-]\s*(₹?\s*[\d,]+(?:\.\d{1,2})?)$/);
      if (!m) return;
      const k = m[1].toLowerCase();
      const v = norm(m[2]);
      if (k.includes('basic')) basic = Math.max(basic, v);
      else if (k.includes('hra')) hra = Math.max(hra, v);
      else if (k.includes('da')) da = Math.max(da, v);
    });
    return { basic, hra, da };
  };

  const computeHRAExemption = (basic: number, da: number, hra: number, rent: number, metro: boolean) => {
    const salary = basic + da;
    const rentMinus10 = Math.max(0, rent - 0.1 * salary);
    const pct = metro ? 0.5 : 0.4;
    const pctSalary = pct * salary;
    const exempt = Math.max(0, Math.min(hra, rentMinus10, pctSalary));
    const taxableHRA = Math.max(0, hra - exempt);
    return { exempt, taxableHRA };
  };

  const handleFiles = async (files: FileList) => {
    setStatus('Parsing...');
    const out: Row[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const text = await parsePdfToText(f);
      const month = detectMonth(f.name + ' ' + text);
      const { basic, hra, da } = parseAmounts(text);
      const { exempt, taxableHRA } = computeHRAExemption(basic, da, hra, defaultRent, defaultMetro);
      out.push({ month, basic, da, hra, rent: defaultRent, metro: defaultMetro, exempt, taxableHRA });
      setStatus(`Processed ${i+1}/${files.length}`);
    }
    setRows(out);
    setStatus(`Ready: ${out.length} slips`);
  };

  const exportExcel = () => {
    if (rows.length === 0) return;
    const headers = ['Month','Basic','DA','HRA Received','Monthly Rent','Metro City','HRA Exempt','HRA Taxable'];
    const aoa = [headers, ...rows.map(r => [
      r.month, r.basic, r.da, r.hra, r.rent, r.metro ? 'Yes' : 'No', r.exempt, r.taxableHRA
    ])];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    XLSX.utils.book_append_sheet(wb, ws, 'HRAExemption');
    XLSX.writeFile(wb, 'hra-exemption-calculator.xlsx');
  };

  const faq = [
    { question: 'What is HRA exemption?', answer: 'Exempt amount is minimum of: actual HRA received; rent paid minus 10% of salary; 50% of salary (metro) or 40% (non-metro). Salary = Basic + DA (forming part of retirement benefits).' },
    { question: 'Metro vs non-metro?', answer: 'Metro cities (like Mumbai, Delhi, Kolkata, Chennai) apply 50%; others 40%.' },
    { question: 'Where does rent come from?', answer: 'Enter default monthly rent and metro choice; applied to each parsed slip. You can adjust in exported Excel.' },
    { question: 'Is data private?', answer: 'Yes. Everything runs in your browser with no uploads.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Salary Slip HRA PDF to HRA Exemption Excel (Client-side) | MoneyCal"
        description="Upload salary slip PDFs and export an HRA exemption calculator Excel. Computes exempt vs taxable HRA using Indian rules. Private, no upload."
        keywords="salary slip hra pdf to hra exemption excel converter, india 2026"
        url="/finance-tools/pdf-converters/salary-slip-hra-to-exemption-excel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'HRA → Exemption Excel', url: '/finance-tools/pdf-converters/salary-slip-hra-to-exemption-excel' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'HRA Exemption from Salary Slip',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          }
        ]}
        faqData={faq}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Salary Slip with HRA → HRA Exemption Excel</h1>
          <p className="text-gray-700 mb-6">Compute monthly HRA exemption and taxable HRA from payslips using Indian tax rules.</p>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-1">Default Monthly Rent (₹)</div>
                <input type="number" value={defaultRent} onChange={(e)=>setDefaultRent(parseFloat(e.target.value||'0'))} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div className="flex items-end">
                <label className="text-sm text-gray-700 flex items-center gap-2">
                  <input type="checkbox" checked={defaultMetro} onChange={()=>setDefaultMetro(v=>!v)} />
                  Metro city (50% of salary)
                </label>
              </div>
              <div className="flex items-end justify-end text-sm text-gray-600">Status: {status}</div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <button onClick={exportExcel} disabled={rows.length===0} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50">Export Excel</button>
              <button onClick={()=>{setRows([]); setStatus('Ready');}} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border">Clear</button>
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
                id="hra-input"
              />
              <label htmlFor="hra-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select PDFs or drag & drop here</div>
                <div className="text-sm text-gray-600 mt-2">Client-side only • No upload • Fast</div>
              </label>
            </div>
          </div>
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <h2>Free Online HRA Exemption from Salary Slip (India 2026)</h2>
            <p>Upload salary slips and export an Excel that computes HRA exemption per Indian tax rules. The calculation uses Basic + DA as “salary” and applies the minimum of the three criteria: (1) actual HRA received, (2) rent paid minus 10% of salary, and (3) 50% of salary if in a metro city or 40% otherwise. This allows quick determination of exempt and taxable HRA month by month for ITR planning.</p>
            <h3>Inputs And Detection</h3>
            <p>The tool parses Basic, HRA, and DA from text-based PDFs. You provide the monthly rent and whether you live in a metro city. These defaults apply across all uploaded months, and you can fine‑tune values later in Excel.</p>
            <h3>Why This Matters</h3>
            <p>HRA can significantly reduce taxable income for salaried professionals who pay rent. Having a month‑wise breakdown of exempt vs taxable HRA simplifies tax computation, enables evidence for assessments, and helps evaluate rent agreements against tax benefits.</p>
            <h3>Tips</h3>
            <ul>
              <li>Prefer text-based PDFs for accurate parsing.</li>
              <li>Ensure DA is present if your employer counts it for retirement benefits; otherwise basic alone is used for “salary”.</li>
              <li>If rent varies across months, update the exported Excel per month.</li>
            </ul>
            <h3>Target Keywords</h3>
            <p>salary slip hra pdf to hra exemption excel converter; india 2026 hra calculator; client-side salary tax tool; no upload hra excel.</p>
            <h3>Computation Details</h3>
            <p>For each month, the calculator reads Basic and DA values from the payslip and computes “salary” as Basic + DA. It then evaluates three quantities: actual HRA received for the month; rent paid minus 10% of salary; and 50% of salary for metro cities or 40% for non‑metro cities. The exempt portion is the minimum of these three, never below zero. Taxable HRA equals HRA received minus the exempt amount.</p>
            <h3>Worked Examples</h3>
            <p>Example A (Metro): Basic 40,000; DA 10,000; HRA 25,000; Rent 22,000; City Metro. Salary = 50,000. Rent − 10% Salary = 22,000 − 5,000 = 17,000. 50% Salary = 25,000. Exempt is min(25,000; 17,000; 25,000) = 17,000. Taxable HRA = 8,000.</p>
            <p>Example B (Non‑Metro): Basic 30,000; DA 0; HRA 12,000; Rent 10,000; City Non‑Metro. Salary = 30,000. Rent − 10% Salary = 10,000 − 3,000 = 7,000. 40% Salary = 12,000. Exempt is min(12,000; 7,000; 12,000) = 7,000. Taxable HRA = 5,000.</p>
            <h3>Edge Cases</h3>
            <ul>
              <li>If rent is ≤ 10% of salary, the second criterion becomes zero and the exempt amount reduces accordingly.</li>
              <li>If DA is not part of retirement benefits in your organization, treat salary as Basic only when adjusting results in Excel.</li>
              <li>If you received HRA arrears in a month, the exempt amount may spike; consider month‑wise footnotes in the workbook for audit trails.</li>
            </ul>
            <h3>Post‑Export Workflow</h3>
            <p>After exporting, update the Rent column per month if actual rent varied. Add a city column if you moved mid‑year and recalculate using the same formula. You can also insert a running total of exempt HRA to compare against Form 16 values and your ITR computation.</p>
            <h3>Privacy and Accuracy</h3>
            <p>All calculations execute in your browser; no data leaves your device. The logic follows broadly accepted HRA rules. Always validate edge cases against current CBDT notifications or consult a tax professional for scenario‑specific guidance.</p>
          </div>
          {rows.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Preview</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      {['Month','Basic','DA','HRA','Rent','Metro','Exempt','Taxable HRA'].map((h,i)=><th key={i} className="text-left px-3 py-2">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.slice(0, 12).map((r,i)=>(
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2">{r.month}</td>
                        <td className="px-3 py-2">₹ {r.basic.toLocaleString('en-IN')}</td>
                        <td className="px-3 py-2">₹ {r.da.toLocaleString('en-IN')}</td>
                        <td className="px-3 py-2">₹ {r.hra.toLocaleString('en-IN')}</td>
                        <td className="px-3 py-2">₹ {r.rent.toLocaleString('en-IN')}</td>
                        <td className="px-3 py-2">{r.metro ? 'Yes' : 'No'}</td>
                        <td className="px-3 py-2 text-green-700">₹ {r.exempt.toLocaleString('en-IN')}</td>
                        <td className="px-3 py-2 text-red-700">₹ {r.taxableHRA.toLocaleString('en-IN')}</td>
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

export default SalarySlipHRAExemptionExcel;
