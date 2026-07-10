import React, { useEffect, useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

const OldSalarySlipToNewExcel: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready');
  const [normalized, setNormalized] = useState<Array<Record<string, string>>>([]);
  const [customMap, setCustomMap] = useState<Array<{ from: string; to: string }>>([]);
  const [mapFrom, setMapFrom] = useState<string>('');
  const [mapTo, setMapTo] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('oldToNewCustomMap');
    if (saved) {
      try {
        setCustomMap(JSON.parse(saved));
      } catch {
        setCustomMap([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('oldToNewCustomMap', JSON.stringify(customMap));
  }, [customMap]);

  const normalizeFields = (fields: Record<string, string>) => {
    const map: Record<string, string> = {
      'employee name': 'employeeName',
      'name': 'employeeName',
      'emp id': 'employeeId',
      'employee id': 'employeeId',
      'designation': 'designation',
      'month': 'month',
      'basic': 'basic',
      'hra': 'hra',
      'allowances': 'allowances',
      'deductions': 'deductions',
      'net pay': 'netPay',
      'net salary': 'netPay',
      'total': 'netPay'
    };
    const out: Record<string, string> = { employeeName: '', employeeId: '', designation: '', month: '', basic: '', hra: '', allowances: '', deductions: '', netPay: '' };
    Object.entries(fields).forEach(([k, v]) => {
      const cm = customMap.find(m => m.from.toLowerCase() === k.toLowerCase());
      const key = cm ? cm.to : map[k.toLowerCase()];
      if (key) out[key] = v;
    });
    return out;
  };

  const parsePdfToFields = async (file: File) => {
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
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const fields: Record<string, string> = {};
    lines.forEach(line => {
      const m = line.match(/^([A-Za-z ]+)\s*[:-]\s*(.+)$/);
      if (m) fields[m[1].toLowerCase()] = m[2];
      const parts = line.split(/\s{2,}/);
      if (parts.length === 2) fields[parts[0].toLowerCase()] = parts[1];
    });
    return normalizeFields(fields);
  };

  const handleFiles = async (files: FileList) => {
    setStatus('Normalizing...');
    const out: Array<Record<string, string>> = [];
    for (let i = 0; i < files.length; i++) {
      out.push(await parsePdfToFields(files[i]));
    }
    setNormalized(out);
    setStatus(`Normalized ${out.length} slips`);
  };

  const exportExcel = () => {
    if (normalized.length === 0) return;
    const headers = ['employeeName','employeeId','designation','month','basic','hra','allowances','deductions','netPay'];
    const aoa = [headers, ...normalized.map(n => headers.map(h => n[h] || ''))];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    XLSX.utils.book_append_sheet(wb, ws, 'Normalized');
    XLSX.writeFile(wb, 'normalized-salary-slips.xlsx');
  };

  const copyCsv = async () => {
    if (normalized.length === 0) return;
    const headers = ['employeeName','employeeId','designation','month','basic','hra','allowances','deductions','netPay'];
    const csv = [headers, ...normalized.map(n => headers.map(h => n[h] || ''))]
      .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    await navigator.clipboard.writeText(csv);
    setStatus('Copied preview CSV to clipboard');
  };

  const faq = [
    { question: 'What does “normalize” mean?', answer: 'Maps old fields to a consistent modern template ready for analysis.' },
    { question: 'Is it private?', answer: 'Yes. Parsing happens in your browser. No upload or backend.' },
    { question: 'Multiple files?', answer: 'Yes. Select many PDF slips and export one normalized Excel sheet.' },
    { question: 'Mobile friendly?', answer: 'Yes, mobile-first UI optimized for Android/iOS.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Old Salary Slip PDF to New Excel Format (Private, No Upload) | MoneyCal"
        description="Normalize older salary slip formats into a modern Excel template. 100% client-side, mobile-first, and ready for financial analysis."
        keywords="old salary slip pdf to excel converter 2026 india, normalize payslip to excel"
        url="/finance-tools/pdf-converters/old-salary-slip-to-new-excel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Old → New Excel', url: '/finance-tools/pdf-converters/old-salary-slip-to-new-excel' }
        ]}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Old Salary Slip → New Excel Converter',
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Web Browser',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
        }}
        faqData={faq}
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Old Salary Slip → New Excel Format</h1>
          <p className="text-gray-700 mb-6">
            Upload older-format payslips to map fields into a standardized Excel template for clean analytics and reporting.
          </p>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">Status: {status}</div>
              <button
                onClick={exportExcel}
                disabled={normalized.length === 0}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50"
              >
                Export Normalized Excel
              </button>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <button onClick={copyCsv} disabled={normalized.length===0} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border">Copy Preview CSV</button>
              <button
                onClick={() => { setNormalized([]); setStatus('Ready'); }}
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
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
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
                id="old-new-input"
              />
              <label htmlFor="old-new-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select PDFs or drag & drop here</div>
                <div className="text-sm text-gray-600 mt-2">Client-side only • No upload • Fast</div>
              </label>
            </div>
          </div>
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <h2>Free Online Old Salary Slip PDF to New Excel Converter India 2026</h2>
            <p>This converter standardizes legacy payslip formats into a modern Excel template suitable for analytics, audits, and loan documentation. It processes files entirely on your device, ensuring privacy and compliance. The normalized sheet includes employee identity, month, core earnings and deductions, and a canonical net pay field to simplify downstream reporting.</p>
            <h3>Why Normalize Legacy Payslips</h3>
            <p>Older payslip templates vary widely in labels, ordering, and structure. Normalization produces consistent columns across months and employers, enabling clean pivots, year-end reconciliation, and easy proof of income. It prevents errors from manual copy and paste and makes aggregation across multiple PDFs predictable.</p>
            <h3>Field Mapping</h3>
            <p>The tool maps common legacy labels to a stable schema: employee name, employee ID, designation, month, basic, HRA, allowances, deductions, and net pay. If your slip uses alternate naming (for example, Gross Pay as Net Pay in the older format), you can quickly correct values once exported into Excel.</p>
            <h3>Usage</h3>
            <ul>
              <li>Select multiple PDF payslips in one go to build a single normalized workbook.</li>
              <li>Export immediately and open in Excel, Google Sheets, or any compatible viewer.</li>
              <li>Use filters and pivot tables to summarize monthly totals and trends.</li>
              <li>Attach the sheet as supporting documentation for loans, visas, or tax filings.</li>
            </ul>
            <h3>Supported Formats</h3>
            <p>Works with most Indian SME and HRMS-generated PDFs. It recognizes key-value lines and two-column rows separated by adequate spacing. For image-only scans, results may be limited without OCR; prefer text-based PDFs for best extraction quality.</p>
            <h3>Tips For Best Results</h3>
            <ul>
              <li>Ensure the month is present and clearly labeled so time-series analysis remains accurate.</li>
              <li>Keep employee name and ID consistent across months to avoid duplicate identities.</li>
              <li>Review net pay totals after export to confirm they match your payslip.</li>
              <li>For unusual layouts, adjust labels in Excel after export.</li>
            </ul>
            <h3>Privacy And Performance</h3>
            <p>The tool is optimized for mobile and desktop, using local parsing to avoid uploads or sign-in. Processing of multiple PDFs is fast and memory-efficient, suitable for monthly payroll packs.</p>
            <h3>Keywords Targeted</h3>
            <p>old salary slip pdf to excel converter 2026 india; normalize payslip to excel; client-side salary slip converter; mobile-friendly payroll template standardizer; legacy payslip mapping India.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <div className="text-lg font-semibold mb-3 text-gray-900">Custom Field Mapping</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input value={mapFrom} onChange={(e)=>setMapFrom(e.target.value)} placeholder="Legacy label (e.g., Emp Name)" className="border rounded-lg px-3 py-2" />
              <input value={mapTo} onChange={(e)=>setMapTo(e.target.value)} placeholder="New field (e.g., employeeName)" className="border rounded-lg px-3 py-2" />
              <button
                onClick={()=>{
                  if (!mapFrom.trim() || !mapTo.trim()) return;
                  setCustomMap(prev => [...prev.filter(m=>m.from.toLowerCase()!==mapFrom.trim().toLowerCase()), {from: mapFrom.trim(), to: mapTo.trim()}]);
                  setMapFrom(''); setMapTo('');
                }}
                className="px-4 py-2 rounded-lg bg-gray-100 border"
              >
                Add/Update Mapping
              </button>
            </div>
            <div className="mt-3">
              <button
                onClick={() => setCustomMap([])}
                className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border"
              >
                Reset Mappings
              </button>
            </div>
            {customMap.length>0 && (
              <div className="mt-3 overflow-auto">
                <table className="min-w-full text-sm">
                  <thead><tr className="border-b"><th className="text-left px-2 py-1">From</th><th className="text-left px-2 py-1">To</th><th></th></tr></thead>
                  <tbody>
                    {customMap.map((m,i)=>(
                      <tr key={i} className="border-b">
                        <td className="px-2 py-1">{m.from}</td>
                        <td className="px-2 py-1">{m.to}</td>
                        <td className="px-2 py-1">
                          <button onClick={()=>setCustomMap(prev=>prev.filter((_,idx)=>idx!==i))} className="text-red-600">Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {normalized.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Preview (first 5)</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      {['Employee','ID','Role','Month','Basic','HRA','Allowances','Deductions','Net Pay'].map((h, i) => (
                        <th key={i} className="px-3 py-2 text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {normalized.slice(0, 5).map((n, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2">{n.employeeName}</td>
                        <td className="px-3 py-2">{n.employeeId}</td>
                        <td className="px-3 py-2">{n.designation}</td>
                        <td className="px-3 py-2">{n.month}</td>
                        <td className="px-3 py-2">{n.basic}</td>
                        <td className="px-3 py-2">{n.hra}</td>
                        <td className="px-3 py-2">{n.allowances}</td>
                        <td className="px-3 py-2">{n.deductions}</td>
                        <td className="px-3 py-2">{n.netPay}</td>
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

export default OldSalarySlipToNewExcel;
