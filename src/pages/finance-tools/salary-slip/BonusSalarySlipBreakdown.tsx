import React, { useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

const BonusSalarySlipBreakdown: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready');
  const [breakdown, setBreakdown] = useState<Array<{ label: string; amount: number }>>([]);
  const [mergeSimilar, setMergeSimilar] = useState<boolean>(true);
  const [extraKeywords, setExtraKeywords] = useState<string>('');

  const parseAmounts = (text: string) => {
    const items: Array<{ label: string; amount: number }> = [];
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    lines.forEach(line => {
      const m = line.match(/^([A-Za-z &]+)\s*[:-]?\s*(₹?\s*[\d,]+(?:\.\d{1,2})?)$/);
      if (m) {
        const label = m[1].toLowerCase();
        const amt = parseFloat(m[2].replace(/₹|\s|,/g, ''));
        if (!isNaN(amt)) items.push({ label, amount: amt });
      }
    });
    const userKws = extraKeywords
      .split(',')
      .map(k => k.trim().toLowerCase())
      .filter(Boolean);
    const keywords = ['bonus','performance bonus','diwali bonus','allowance','hra','special allowance','transport','medical','pf','esi','tax','tds','deduction','net pay','gross', ...userKws];
    const filtered = items.filter(i => keywords.some(k => i.label.includes(k)));
    if (!mergeSimilar) return filtered;
    const synonyms: Record<string,string> = {
      'performance bonus':'bonus',
      'festival bonus':'bonus',
      'diwali bonus':'bonus',
      'transport':'conveyance',
      'conveyance allowance':'conveyance',
      'medical allowance':'medical',
      'professional tax':'tax',
      'tds':'tax'
    };
    const norm = (s: string) => {
      const k = Object.keys(synonyms).find(key => s.includes(key));
      if (k) return synonyms[k];
      if (s.includes('special allowance')) return 'special allowance';
      if (s.includes('allowance') && !s.includes('hra')) return 'allowance';
      return s;
    };
    const agg: Record<string, number> = {};
    filtered.forEach(it => {
      const key = norm(it.label);
      agg[key] = (agg[key] || 0) + it.amount;
    });
    return Object.entries(agg).map(([label, amount]) => ({ label, amount }));
  };

  const handleFile = async (file: File) => {
    setStatus('Reading PDF...');
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
    const b = parseAmounts(text);
    setBreakdown(b);
    setStatus(`Detected ${b.length} bonus/allowance/deduction lines`);
  };

  const exportExcel = () => {
    if (breakdown.length === 0) return;
    const aoa = [['Label','Amount'], ...breakdown.map(b => [b.label, b.amount])];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    XLSX.utils.book_append_sheet(wb, ws, 'Breakdown');
    XLSX.writeFile(wb, 'salary-slip-bonus-breakdown.xlsx');
  };

  const copyCsv = async () => {
    if (breakdown.length === 0) return;
    const csv = [['Label','Amount'], ...breakdown.map(b => [b.label, b.amount])].map(r=>r.join(',')).join('\n');
    await navigator.clipboard.writeText(csv);
    setStatus('Copied CSV to clipboard');
  };

  const faq = [
    { question: 'What is detected automatically?', answer: 'Bonus, allowances, deductions and common salary components (HRA, PF, ESI, tax).' },
    { question: 'Accuracy?', answer: 'Depends on formatting. You can adjust in Excel after export.' },
    { question: 'Is this private?', answer: 'Yes. Client-side only; nothing leaves your device.' },
    { question: 'Mobile friendly?', answer: 'Yes. Works well on mobile browsers.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Salary Slip with Bonus → Excel Breakdown (Client-side, Free) | MoneyCal"
        description="Detect bonus, allowances, and deductions from salary slip PDF and export clean Excel breakdown. 100% browser-side processing."
        keywords="salary slip with bonus pdf to excel converter, allowance breakdown, India"
        url="/finance-tools/pdf-converters/bonus-salary-slip-breakdown"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Bonus Breakdown', url: '/finance-tools/pdf-converters/bonus-salary-slip-breakdown' }
        ]}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Salary Slip Bonus/Allowance Breakdown',
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Web Browser',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
        }}
        faqData={faq}
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Salary Slip Bonus → Excel Breakdown</h1>
          <p className="text-gray-700 mb-6">
            Upload a salary slip PDF to auto-detect bonus, allowances, deductions, and export a structured Excel.
          </p>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">Status: {status}</div>
              <button
                onClick={exportExcel}
                disabled={breakdown.length === 0}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50"
              >
                Export Breakdown Excel
              </button>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <label className="text-sm text-gray-700 flex items-center gap-2">
                <input type="checkbox" checked={mergeSimilar} onChange={()=>setMergeSimilar(v=>!v)} />
                Merge similar labels
              </label>
              <input
                value={extraKeywords}
                onChange={(e)=>setExtraKeywords(e.target.value)}
                placeholder="Extra keywords (comma separated)"
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <button onClick={copyCsv} disabled={breakdown.length===0} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border">Copy CSV</button>
              <button
                onClick={() => { setBreakdown([]); setStatus('Ready'); }}
                className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border"
              >
                Clear
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
                id="bonus-input"
              />
              <label htmlFor="bonus-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select PDF or drag & drop here</div>
                <div className="text-sm text-gray-600 mt-2">Client-side only • No upload • Fast</div>
              </label>
            </div>
          </div>
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <h2>Free Online Salary Slip Bonus Breakdown Converter India 2026</h2>
            <p>Use this client-side tool to extract and summarize bonus, allowances, and deduction components from Indian salary slips and export them as a clean Excel sheet. It runs entirely in your browser using modern web technologies, so your files never leave your device. This makes it suitable for HR teams, accountants, payroll processors, and individual employees who want immediate clarity without privacy concerns or sign-ups.</p>
            <h3>What This Tool Detects</h3>
            <p>The detector focuses on common Indian payroll components: bonus types such as performance bonus, festival or Diwali bonus, joining bonus, retention bonus; allowances such as HRA, special allowance, travel or transport, medical; and statutory deductions including PF, ESI, professional tax, and TDS. The extracted items appear in a table and can be exported to Excel for analysis, audit, or record-keeping.</p>
            <h3>Why Convert Bonus Sections To Excel</h3>
            <p>Excel is ideal for consolidating monthly payslips into yearly views, tracking variable pay, and preparing documentation for loan applications or tax filing. With a single click, you can export the detected rows into an .xlsx file and then aggregate multiple months, compute totals, and visualize trends of variable components like bonuses or performance-linked pay.</p>
            <h3>How It Works</h3>
            <p>The tool reads text from your PDF payslip in the browser and applies pattern matching optimized for Indian formats. It looks for labeled lines and amounts, then filters by domain-specific keywords to retain only the bonus, allowance, and deduction sections. No upload or server-side processing is involved; it is instant, private, and dependable on mobile and desktop.</p>
            <h3>Supported Salary Slip Formats</h3>
            <p>It works with most HR and payroll formats used in India: traditional PDF payslips, HRMS exports, and templates commonly used by SMEs. If your payslip uses unconventional labels or combined columns, you can still export the results and adjust labels in Excel. Amounts shown in rupees are parsed with thousands separators and decimals.</p>
            <h3>Accuracy Tips</h3>
            <ul>
              <li>Prefer text-based PDFs instead of scanned images to ensure reliable extraction.</li>
              <li>Keep labels clear, for example, Bonus, Special Allowance, Transport Allowance, PF, ESI, TDS.</li>
              <li>If a line merges multiple items, split it in the source before exporting.</li>
              <li>Verify totals against gross and net pay shown on the payslip.</li>
            </ul>
            <h3>Common Indian Components Explained</h3>
            <p>Bonus represents variable compensation tied to performance, tenure, or festival payouts. Allowances such as HRA and special allowance enhance take-home for housing and general expenses. Statutory deductions include Employee Provident Fund, Employees’ State Insurance, professional tax as per state rules, and tax deducted at source according to income slab and declarations. Understanding these helps compare offers, plan taxes, and maintain accurate records.</p>
            <h3>Use Cases</h3>
            <ul>
              <li>Employees consolidating yearly bonus and allowance figures for ITR planning.</li>
              <li>HR teams preparing audit-ready breakdowns for internal reviews.</li>
              <li>Payroll partners validating variable pay payouts across months.</li>
              <li>Loan applications requiring detailed salary component history.</li>
            </ul>
            <h3>Privacy</h3>
            <p>Processing is entirely local. The page uses browser APIs to read and parse the file. No network requests are made with your PDF content, and no sign-in or backend is required.</p>
            <h3>FAQs</h3>
            <p>Is it free? Yes, it is free to use on web and mobile. Does it support scanned PDFs? Text-based PDFs yield best results; scanned images may require OCR outside the browser. Can I rename labels? Export to Excel and edit headers or labels freely.</p>
            <h3>Keywords That This Page Targets</h3>
            <p>salary slip with bonus pdf to excel converter free online no upload 2026 india; bonus salary breakdown tool; allowance and deduction extractor; client-side payslip converter; mobile-friendly pdf to excel India.</p>
            <h3>Examples</h3>
            <p>Monthly payslip including basic, HRA, special allowance, PF, ESI, professional tax, and performance bonus. The tool shows rows for HRA, special allowance, performance bonus, PF, ESI, professional tax, and TDS. You can export and sum across 12 months to compute total bonus credited in the financial year.</p>
            <h3>Troubleshooting</h3>
            <p>If nothing is detected, check whether the PDF is image-only. If labels differ, adjust in Excel post-export. For multi-page payslips, the tool aggregates text across pages before detection. If rupee symbols are missing, numeric parsing still works with commas and decimals.</p>
            <h3>Mobile Experience</h3>
            <p>The interface is optimized for touch input and small screens. Upload a PDF from downloads or cloud storage, tap Export, and share the Excel file via mail or messaging apps. It is light, fast, and bandwidth-friendly.</p>
          </div>
          {breakdown.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Detected Components</h2>
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-3 py-2 text-left">Label</th>
                    <th className="px-3 py-2 text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {breakdown.map((b, i) => (
                    <tr key={i} className="border-b">
                      <td className="px-3 py-2">{b.label}</td>
                      <td className="px-3 py-2">₹ {b.amount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BonusSalarySlipBreakdown;
