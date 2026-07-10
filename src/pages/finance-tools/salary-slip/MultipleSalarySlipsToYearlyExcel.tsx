import React, { useEffect, useMemo, useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';

const MultipleSalarySlipsToYearlyExcel: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready');
  const [summary, setSummary] = useState<Array<{ id: string; fileName: string; month: string; fields: Record<string, string> }>>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<{ done: number; total: number }>({ done: 0, total: 0 });
  const [settings, setSettings] = useState<{ fyStartsInApril: boolean; inferMonthFromFilename: boolean }>({
    fyStartsInApril: true,
    inferMonthFromFilename: true
  });
  const monthIndex: Record<string, number> = { jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11 };
  const monthOptions = useMemo(() => ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('multiYearlySettings');
      if (saved) setSettings(JSON.parse(saved));
    } catch {
      setSettings({ fyStartsInApril: true, inferMonthFromFilename: true });
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('multiYearlySettings', JSON.stringify(settings));
  }, [settings]);

  const guessMonthFromFilename = (name: string): string | null => {
    const m = name.toLowerCase().match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\b/);
    const y = name.match(/\b(20\d{2})\b/);
    if (!m) return null;
    const mon = m[1]!;
    const monCap = mon.charAt(0).toUpperCase() + mon.slice(1,3);
    return y ? `${monCap} ${y[1]}` : monCap;
  };

  const parsePdfTextToFields = (text: string) => {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const fields: Record<string, string> = {};
    lines.forEach(line => {
      const m = line.match(/^([A-Za-z ]+)\s*[:-]\s*(.+)$/);
      if (m) fields[m[1].toLowerCase()] = m[2];
      const parts = line.split(/\s{2,}/);
      if (parts.length === 2) fields[parts[0].toLowerCase()] = parts[1];
    });
    const monthMatch = text.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\b/i);
    const month = monthMatch ? monthMatch[0] : 'Unknown';
    return { month, fields };
  };

  const handleFiles = async (files: FileList) => {
    setIsProcessing(true);
    setProgress({ done: 0, total: files.length });
    setStatus('Reading PDFs...');
    const pdfjsLib = await import('pdfjs-dist');
    try {
      const workerMod: any = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
      // @ts-expect-error pdfjs workerSrc typing
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerMod.default || workerMod;
    } catch (e) {
      // @ts-expect-error pdfjs workerSrc typing
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.624/build/pdf.worker.min.mjs';
    }
    const results: Array<{ id: string; fileName: string; month: string; fields: Record<string, string> }> = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      const loadingTask = pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;
      let pageText = '';
      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);
        const content = await page.getTextContent();
        pageText += content.items.map((i: any) => ('str' in i ? i.str : '')).join('\n') + '\n';
      }
      URL.revokeObjectURL(url);
      const parsed = parsePdfTextToFields(pageText);
      let month = parsed.month;
      if (settings.inferMonthFromFilename) {
        const g = guessMonthFromFilename(file.name);
        if (g) month = month === 'Unknown' ? g : month;
      }
      results.push({ id: `${file.name}-${i}-${Date.now()}`, fileName: file.name, month, fields: parsed.fields });
      setProgress({ done: i + 1, total: files.length });
    }
    setSummary(results);
    setStatus(`Parsed ${results.length} salary slips`);
    setIsProcessing(false);
  };

  const exportWorkbook = () => {
    if (summary.length === 0) return;
    const wb = XLSX.utils.book_new();
    summary.forEach(({ month, fields }) => {
      const rows = Object.entries(fields).map(([k, v]) => [k, v]);
      const ws = XLSX.utils.aoa_to_sheet([['Field', 'Value'], ...rows]);
      XLSX.utils.book_append_sheet(wb, ws, month.substring(0, 31));
    });
    const fyStart = settings.fyStartsInApril ? 3 : 0;
    const indexRows = summary.map(s => {
      const m = s.month.split(/\s+/)[0].slice(0,3).toLowerCase();
      const y = parseInt((s.month.match(/\d{4}/) || ['0'])[0], 10);
      const mi = monthIndex[m] ?? -1;
      const fy = mi >= fyStart ? `${y}-${y+1}` : mi >= 0 ? `${y-1}-${y}` : 'Unknown';
      const net = s.fields['net pay'] || s.fields['net salary'] || s.fields['total'] || '';
      return [s.month, net, fy];
    });
    const indexWs = XLSX.utils.aoa_to_sheet([['Month', 'Net Pay', 'FY'], ...indexRows]);
    XLSX.utils.book_append_sheet(wb, indexWs, 'YearlySummary');
    const fyTotals: Record<string, number> = {};
    indexRows.forEach(r => {
      const fy = r[2] as string;
      const netStr = String(r[1] ?? '').replace(/₹|,/g,'').trim();
      const net = parseFloat(netStr) || 0;
      if (!fyTotals[fy]) fyTotals[fy] = 0;
      fyTotals[fy] += net;
    });
    const fyRows = Object.entries(fyTotals).map(([fy, total]) => [fy, total]);
    const fyWs = XLSX.utils.aoa_to_sheet([['FY','Total Net Pay'], ...fyRows]);
    XLSX.utils.book_append_sheet(wb, fyWs, 'FYTotals');
    XLSX.writeFile(wb, 'yearly-salary-slips.xlsx');
  };

  const exportConsolidated = () => {
    if (summary.length === 0) return;
    const headers = ['Month','Basic','HRA','Allowances','Deductions','Net Pay'];
    const rows = summary.map(s => {
      const f = s.fields;
      const pick = (k: string) => f[k] || '';
      return [
        s.month,
        pick('basic'),
        pick('hra'),
        pick('allowances'),
        pick('deductions'),
        f['net pay'] || f['net salary'] || f['total'] || ''
      ];
    });
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    XLSX.utils.book_append_sheet(wb, ws, 'Consolidated');
    XLSX.writeFile(wb, 'yearly-consolidated.xlsx');
  };

  const copySummaryCsv = async () => {
    if (summary.length === 0) return;
    const head = ['Month','Net Pay'];
    const rows = summary.map(s => [s.month, s.fields['net pay'] || s.fields['net salary'] || s.fields['total'] || '']);
    const csv = [head, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    await navigator.clipboard.writeText(csv);
    setStatus('Copied YearlySummary CSV to clipboard');
  };

  const sortByMonth = () => {
    const sorted = [...summary].sort((a,b) => {
      const ma = a.month.split(/\s+/)[0].slice(0,3).toLowerCase();
      const mb = b.month.split(/\s+/)[0].slice(0,3).toLowerCase();
      const ya = parseInt((a.month.match(/\d{4}/) || ['0'])[0], 10);
      const yb = parseInt((b.month.match(/\d{4}/) || ['0'])[0], 10);
      if (ya !== yb) return ya - yb;
      return (monthIndex[ma] ?? 0) - (monthIndex[mb] ?? 0);
    });
    setSummary(sorted);
  };

  const removeRow = (id: string) => setSummary(prev => prev.filter(r => r.id !== id));

  const faq = [
    { question: 'Can I upload many PDFs at once?', answer: 'Yes. Select multiple files and get one Excel with per-month sheets.' },
    { question: 'Is it private?', answer: 'Yes, 100% client-side. Files are never uploaded.' },
    { question: 'How are fields extracted?', answer: 'Heuristics parse “Field: Value” lines and two-column spacing.' },
    { question: 'Can I edit the Excel?', answer: 'Yes, export is a standard .xlsx file you can edit anywhere.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Multiple Salary Slips PDF to Yearly Excel (Free, No Upload) 2026 | MoneyCal"
        description="Convert multiple salary slip PDFs into a single yearly Excel workbook. 100% client-side, mobile-first, private, and optimized for Indian formats."
        keywords="multiple salary slips pdf to yearly excel converter 2026, payslip to excel india, no upload"
        url="/finance-tools/pdf-converters/multiple-salary-slips-to-yearly-excel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Multiple Slips → Yearly Excel', url: '/finance-tools/pdf-converters/multiple-salary-slips-to-yearly-excel' }
        ]}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Multiple Salary Slips → Yearly Excel Converter',
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Web Browser',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
        }}
        faqData={faq}
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Multiple Salary Slips → Yearly Excel</h1>
          <p className="text-gray-700 mb-6">Fast, private, and mobile-friendly. Merge monthly payslips into a clean yearly workbook.</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">Status:</span> {status}
                  {isProcessing && (
                    <span className="ml-2 text-gray-500">({progress.done}/{progress.total})</span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={exportWorkbook}
                    disabled={summary.length === 0}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50"
                  >
                    Export Yearly Excel
                  </button>
                  <button
                    onClick={exportConsolidated}
                    disabled={summary.length === 0}
                    className="px-3 py-2 rounded-lg bg-violet-600 text-white font-semibold disabled:opacity-50"
                  >
                    Export Consolidated
                  </button>
                  <button
                    onClick={copySummaryCsv}
                    disabled={summary.length === 0}
                    className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border"
                  >
                    Copy Summary CSV
                  </button>
                  <button
                    onClick={sortByMonth}
                    disabled={summary.length === 0}
                    className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border"
                  >
                    Sort by Month
                  </button>
                </div>
              </div>

              <div
                className="mb-4 border-2 border-dashed rounded-xl p-6 text-center bg-indigo-50/40 border-indigo-200"
                onDragOver={(e) => { e.preventDefault(); }}
                onDrop={(e) => {
                  e.preventDefault();
                  const f = e.dataTransfer.files;
                  if (f && f.length) handleFiles(f);
                }}
              >
                <p className="text-gray-700 mb-2 font-semibold">Drop PDFs here</p>
                <p className="text-xs text-gray-500 mb-3">or click to select multiple files</p>
                <label className="inline-block px-4 py-2 rounded-lg bg-white border cursor-pointer text-sm font-medium">
                  <input
                    type="file"
                    accept="application/pdf"
                    multiple
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                    className="hidden"
                  />
                  Choose Files
                </label>
              </div>

              {isProcessing && (
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${progress.total ? (progress.done / progress.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              )}

              {summary.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-700 border-b">
                        <th className="py-2 pr-4">File</th>
                        <th className="py-2 pr-4">Month</th>
                        <th className="py-2 pr-4">Net Pay</th>
                        <th className="py-2 pr-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {summary.map((row) => {
                        const net = row.fields['net pay'] || row.fields['net salary'] || row.fields['total'] || '';
                        const monthPart = row.month.split(/\s+/)[0].slice(0,3);
                        const yearPart = (row.month.match(/\d{4}/) || [''])[0];
                        return (
                          <tr key={row.id} className="border-b">
                            <td className="py-2 pr-4">{row.fileName}</td>
                            <td className="py-2 pr-4">
                              <div className="flex items-center gap-2">
                                <select
                                  className="border rounded px-2 py-1"
                                  value={monthPart}
                                  onChange={(e) => {
                                    const newMon = e.target.value;
                                    setSummary(prev => prev.map(r => r.id === row.id ? { ...r, month: yearPart ? `${newMon} ${yearPart}` : newMon } : r));
                                  }}
                                >
                                  {monthOptions.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                                <input
                                  type="number"
                                  min={2000}
                                  max={2100}
                                  className="w-24 border rounded px-2 py-1"
                                  value={yearPart || ''}
                                  onChange={(e) => {
                                    const y = e.target.value;
                                    setSummary(prev => prev.map(r => r.id === row.id ? { ...r, month: y ? `${monthPart} ${y}` : monthPart } : r));
                                  }}
                                />
                              </div>
                            </td>
                            <td className="py-2 pr-4">{net}</td>
                            <td className="py-2 pr-4">
                              <button
                                onClick={() => removeRow(row.id)}
                                className="px-2 py-1 text-xs rounded border bg-red-50 text-red-700"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Settings</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={settings.fyStartsInApril}
                    onChange={(e) => setSettings(s => ({ ...s, fyStartsInApril: e.target.checked }))}
                  />
                  Financial year starts in April (India)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={settings.inferMonthFromFilename}
                    onChange={(e) => setSettings(s => ({ ...s, inferMonthFromFilename: e.target.checked }))}
                  />
                  Infer month from filename if available
                </label>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Quick Tips</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                  <li>Use consistent filenames like “Jan 2026 Salary.pdf”.</li>
                  <li>Double-check net pay totals in the preview table.</li>
                  <li>Sort by Month before exporting for clean ordering.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-6">
            <h2>Multiple Salary Slips PDF to Yearly Excel — Guide (India 2026)</h2>
            <p>This tool converts many monthly salary slip PDFs into one Excel file with per‑month sheets and a YearlySummary. Everything runs in your browser for privacy and speed. It’s ideal for bank loan paperwork, visa documentation, and annual salary reconciliation.</p>
            <h3>How to Use</h3>
            <ol>
              <li>Click “Choose Files” or drag‑drop multiple PDF payslips.</li>
              <li>Review detected month and net pay in the table. Adjust month/year if needed.</li>
              <li>Click “Sort by Month” for a clean chronological order.</li>
              <li>Export “Yearly Excel” for per‑month sheets or “Consolidated” for a single sheet.</li>
            </ol>
            <h3>What’s Inside the Export</h3>
            <ul>
              <li><strong>Month Sheets:</strong> Each sheet contains detected fields from that payslip.</li>
              <li><strong>YearlySummary:</strong> Month, net pay, and FY grouping with totals.</li>
              <li><strong>FYTotals:</strong> Automatic aggregation by financial year (April–March by default).</li>
              <li><strong>Consolidated (optional):</strong> One sheet with Basic, HRA, Allowances, Deductions, Net Pay for all months.</li>
            </ul>
            <h3>Advanced Features</h3>
            <ul>
              <li>Filename month inference and manual month/year correction.</li>
              <li>One‑click CSV copy of summary for quick sharing.</li>
              <li>Local settings memory (FY start, inference toggle).</li>
              <li>Mobile‑first layout with large tap targets and responsive tables.</li>
            </ul>
            <h3>FAQ</h3>
            <p><strong>Is my data safe?</strong> Yes. Processing is 100% client‑side. No uploads, no sign‑ins.</p>
            <p><strong>Accuracy?</strong> Depends on the slip layout. You can fine‑tune in Excel or use consolidated export for quick checks.</p>
            <p><strong>Which months are supported?</strong> All months. You can correct any detection using the in‑table editor.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultipleSalarySlipsToYearlyExcel;
