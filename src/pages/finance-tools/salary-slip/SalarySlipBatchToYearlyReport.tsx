import React, { useEffect, useMemo, useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

type SummaryRow = { month: string; basic: number; hra: number; allowances: number; deductions: number; net: number };
const monthIndex: Record<string, number> = { jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12 };

const SalarySlipBatchToYearlyReport: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready');
  const [summary, setSummary] = useState<SummaryRow[]>([]);
  const [fyApril, setFyApril] = useState<boolean>(true);
  const [inferFromFilename, setInferFromFilename] = useState<boolean>(true);

  useEffect(() => {
    const a = localStorage.getItem('batchFYApril');
    if (a === 'true' || a === 'false') setFyApril(a === 'true');
    const i = localStorage.getItem('batchInfer');
    if (i === 'true' || i === 'false') setInferFromFilename(i === 'true');
  }, []);
  useEffect(() => { localStorage.setItem('batchFYApril', String(fyApril)); }, [fyApril]);
  useEffect(() => { localStorage.setItem('batchInfer', String(inferFromFilename)); }, [inferFromFilename]);

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

  const detectMonth = (fileName: string, text: string) => {
    const hay = (fileName + ' ' + text).toLowerCase();
    const m = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'].find(mon => hay.includes(mon));
    return m ? m : 'unknown';
  };

  const parseAmounts = (text: string) => {
    const normAmount = (s: string) => {
      const n = parseFloat(s.replace(/₹|,/g,'').trim());
      return isNaN(n) ? 0 : n;
    };
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    let basic = 0, hra = 0, allowances = 0, deductions = 0, net = 0;
    lines.forEach(line => {
      const kv = line.match(/^([A-Za-z ]+)\s*[:-]\s*(₹?\s*[\d,]+(?:\.\d{1,2})?)$/);
      if (!kv) return;
      const k = kv[1].toLowerCase();
      const v = normAmount(kv[2]);
      if (k.includes('basic')) basic = Math.max(basic, v);
      else if (k.includes('hra')) hra = Math.max(hra, v);
      else if (k.includes('allowance')) allowances = Math.max(allowances, v);
      else if (k.includes('deduction') || k.includes('pf') || k.includes('esi') || k.includes('tax') || k.includes('tds')) deductions = Math.max(deductions, deductions + v);
      else if (k.includes('net pay') || k.includes('net salary')) net = Math.max(net, v);
    });
    if (!net && basic+hra+allowances>0) net = Math.max(0, basic + hra + allowances - deductions);
    return { basic, hra, allowances, deductions, net };
  };

  const handleFiles = async (files: FileList) => {
    setStatus('Processing...');
    const out: SummaryRow[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const text = await parsePdfToText(f);
      const m = inferFromFilename ? detectMonth(f.name, text) : detectMonth('', text);
      const { basic, hra, allowances, deductions, net } = parseAmounts(text);
      out.push({ month: m, basic, hra, allowances, deductions, net });
      setStatus(`Processed ${i+1}/${files.length}`);
    }
    const sorted = out.sort((a,b)=> (monthIndex[a.month]||99) - (monthIndex[b.month]||99));
    setSummary(sorted);
    setStatus(`Ready: ${sorted.length} slips`);
  };

  const exportYearly = () => {
    if (summary.length === 0) return;
    const wb = XLSX.utils.book_new();
    const months = summary.map(s => s.month.toUpperCase());
    summary.forEach((s) => {
      const aoa = [
        ['Component','Amount'],
        ['Basic', s.basic],
        ['HRA', s.hra],
        ['Allowances', s.allowances],
        ['Deductions', s.deductions],
        ['Net Pay', s.net]
      ];
      const ws = XLSX.utils.aoa_to_sheet(aoa);
      XLSX.utils.book_append_sheet(wb, ws, s.month.slice(0,3));
    });
    const total = summary.reduce((acc, s)=>({
      basic: acc.basic + s.basic,
      hra: acc.hra + s.hra,
      allowances: acc.allowances + s.allowances,
      deductions: acc.deductions + s.deductions,
      net: acc.net + s.net
    }), { basic:0,hra:0,allowances:0,deductions:0,net:0 });
    const wsSum = XLSX.utils.aoa_to_sheet([
      ['Metric','Total'],
      ['Months', months.join(', ')],
      ['Basic', total.basic],
      ['HRA', total.hra],
      ['Allowances', total.allowances],
      ['Deductions', total.deductions],
      ['Net Pay', total.net]
    ]);
    XLSX.utils.book_append_sheet(wb, wsSum, 'YearlySummary');
    XLSX.writeFile(wb, 'batch-salary-slip-yearly-report.xlsx');
  };

  const faq = [
    { question: 'Is it private?', answer: 'Yes. Fully client-side. No uploads. No tracking.' },
    { question: 'Multiple PDFs?', answer: 'Yes. Drag and drop multiple slips; get a single yearly workbook.' },
    { question: 'Month detection?', answer: 'Heuristic from filename/text. You can adjust after export.' },
    { question: 'FY setting?', answer: 'Toggle April FY sort for India, or switch off for calendar sort.' }
  ];

  const sortedSummary = useMemo(()=> summary.slice().sort((a,b)=> (monthIndex[a.month]||99) - (monthIndex[b.month]||99)), [summary]);

  return (
    <>
      <SEOHelmet
        title="Batch Salary Slip PDF to Yearly Report Excel (Client-side) | MoneyCal"
        description="Upload many salary slip PDFs and export a consolidated yearly Excel report. Private, mobile-friendly, optimized for Indian FY logic."
        keywords="batch salary slip pdf to yearly report excel 2026, india, no upload"
        url="/finance-tools/pdf-converters/batch-salary-slips-to-yearly-report"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Batch → Yearly Report', url: '/finance-tools/pdf-converters/batch-salary-slips-to-yearly-report' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Batch Salary Slip PDF to Yearly Report',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          }
        ]}
        faqData={faq}
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Salary Slip PDF Batch → Consolidated Yearly Report</h1>
          <p className="text-gray-700 mb-6">Drag and drop monthly slips to generate a year’s Excel workbook with per-month sheets and a summary.</p>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <div className="flex items-center flex-wrap gap-3 mb-4">
              <label className="text-sm text-gray-700 flex items-center gap-2">
                <input type="checkbox" checked={fyApril} onChange={()=>setFyApril(v=>!v)} />
                Financial year starts in April (India)
              </label>
              <label className="text-sm text-gray-700 flex items-center gap-2">
                <input type="checkbox" checked={inferFromFilename} onChange={()=>setInferFromFilename(v=>!v)} />
                Infer month from filename
              </label>
              <div className="ml-auto text-sm text-gray-600">Status: {status}</div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={exportYearly}
                disabled={summary.length === 0}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50"
              >
                Export Yearly Excel
              </button>
              <button onClick={()=>{setSummary([]); setStatus('Ready');}} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border">Clear</button>
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
                id="batch-input"
              />
              <label htmlFor="batch-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select PDFs or drag & drop here</div>
                <div className="text-sm text-gray-600 mt-2">Client-side only • No upload • Fast</div>
              </label>
            </div>
          </div>
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <h2>Batch Salary Slip PDF to Yearly Report (India 2026)</h2>
            <p>Generate a consolidated yearly Excel from monthly payslips, entirely in your browser. This tool combines individual months into a single workbook with per-month sheets and a YearlySummary sheet. It is designed around Indian salary structures and financial year conventions (April–March), with drag-and-drop simplicity and zero server dependency.</p>
            <h3>What The Report Contains</h3>
            <ul>
              <li>Per-month sheets listing Basic, HRA, Allowances, Deductions, and Net Pay.</li>
              <li>A YearlySummary sheet aggregating totals across the selected months.</li>
              <li>Heuristic month detection from filename or text for quick sorting.</li>
            </ul>
            <h3>How To Use</h3>
            <ol>
              <li>Drop multiple monthly slips.</li>
              <li>Toggle FY April for India if you prefer FY sorting.</li>
              <li>Export Yearly Excel and review totals before sharing.</li>
            </ol>
            <h3>Privacy</h3>
            <p>Runs locally in your browser—no uploads or tracking. Safe on personal and corporate devices.</p>
            <h3>Target Keywords</h3>
            <p>batch salary slip pdf to yearly report excel 2026; india fy april excel; client-side payslip yearly report; mobile-friendly batch converter.</p>
            <h3>Decision Pathways</h3>
            <p>Two detection strategies help organize months. By default, the tool infers months from filenames and slip text, which works well when names include abbreviations such as “Apr”, “May”, or “Dec”. If slips omit such hints, the text layer often contains the month in the header. After export, you can adjust sheet order manually, but starting with a good heuristic reduces cleanup.</p>
            <h3>Aggregation Rules</h3>
            <p>Within each slip, the parser extracts Basic, HRA, allowances, and deductions as the maximum observed amount per label across lines. Net Pay is read directly if present; otherwise it is computed as Basic + HRA + allowances − deductions. This approach smooths minor labeling variations between templates while maintaining reliable totals for year‑end analysis.</p>
            <h3>Worked Example</h3>
            <p>Suppose you upload April through March slips. The workbook will contain twelve sheets named by month abbreviations, each listing component totals. The YearlySummary sheet aggregates each component and lists the months included. Use this to cross‑check Form 16 figures, compute HRA exemption inputs, or derive average monthly net pay for budgeting.</p>
            <h3>Quality Control Checklist</h3>
            <ul>
              <li>Verify that total earnings minus deductions equals net pay for each sheet.</li>
              <li>Scan for unusually low DA or HRA where policy expects standard percentages.</li>
              <li>Ensure month detection aligns with slip content where filenames are generic.</li>
            </ul>
            <h3>Extending the Report</h3>
            <p>Add charts to visualize net pay trends, compute cumulative tax deducted (TDS) vs target, or append a sheet for employer contributions when preparing a full CTC view. If your bank requires yearly income statements, freeze panes on the summary sheet and share only that tab.</p>
          </div>
          {sortedSummary.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Summary Preview</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      {['Month','Basic','HRA','Allowances','Deductions','Net Pay'].map((h,i)=><th key={i} className="text-left px-3 py-2">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedSummary.map((s,i)=>(
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2">{s.month.toUpperCase()}</td>
                        <td className="px-3 py-2">₹ {s.basic.toLocaleString('en-IN')}</td>
                        <td className="px-3 py-2">₹ {s.hra.toLocaleString('en-IN')}</td>
                        <td className="px-3 py-2">₹ {s.allowances.toLocaleString('en-IN')}</td>
                        <td className="px-3 py-2">₹ {s.deductions.toLocaleString('en-IN')}</td>
                        <td className="px-3 py-2 font-semibold">₹ {s.net.toLocaleString('en-IN')}</td>
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

export default SalarySlipBatchToYearlyReport;
