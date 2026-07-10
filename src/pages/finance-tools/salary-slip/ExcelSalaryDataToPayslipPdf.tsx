import React, { useRef, useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type Rec = { name: string; month: string; basic: number; hra: number; allowances: number; deductions: number; net: number };

const ExcelSalaryDataToPayslipPdf: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready');
  const [records, setRecords] = useState<Rec[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const slipRef = useRef<HTMLDivElement>(null);

  const handleExcel = async (file: File) => {
    setStatus('Reading Excel...');
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, { type: 'array' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const json: any[] = XLSX.utils.sheet_to_json(ws, { defval: '' });
    const out: Rec[] = json.map((row) => {
      const n = String(row['Name'] || row['Employee'] || row['Employee Name'] || '').trim();
      const m = String(row['Month'] || row['Period'] || '').trim();
      const num = (v: any) => {
        const t = String(v ?? '').replace(/₹|,/g,'').trim();
        const f = parseFloat(t);
        return isNaN(f) ? 0 : f;
      };
      const basic = num(row['Basic']);
      const hra = num(row['HRA']);
      const allowances = num(row['Allowances'] || row['Other Allowances'] || row['Special Allowance']);
      const deductions = num(row['Deductions'] || row['PF'] || 0) + num(row['TDS'] || 0) + num(row['ESI'] || 0);
      const net = num(row['Net Pay'] || (basic + hra + allowances - deductions));
      return { name: n, month: m, basic, hra, allowances, deductions, net };
    }).filter(r => r.name || r.month);
    setRecords(out);
    setCurrentIndex(0);
    setStatus(`Loaded ${out.length} rows`);
  };

  const exportPDF = async () => {
    if (!slipRef.current || records.length === 0) return;
    setStatus('Rendering PDF...');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
    for (let i = 0; i < records.length; i++) {
      setCurrentIndex(i);
      await new Promise(r => setTimeout(r, 150));
      const canvas = await html2canvas(slipRef.current, { scale: 2, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdfWidth = 210;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight, '', 'FAST');
    }
    pdf.save('payslips.pdf');
    setStatus('Exported payslips.pdf');
  };

  const faq = [
    { question: 'Input format?', answer: 'An Excel with columns like Name, Month, Basic, HRA, Allowances, Deductions/PF/TDS/ESI, Net Pay.' },
    { question: 'Private?', answer: 'Yes. Everything is rendered locally in your browser.' },
    { question: 'Multiple employees?', answer: 'Yes. Each row becomes a separate page in the generated PDF.' }
  ];

  const rec = records[currentIndex];

  return (
    <>
      <SEOHelmet
        title="Excel Salary Data to PDF Payslip Generator (Client-side) | MoneyCal"
        description="Upload an Excel with salary data and generate standardized PDF payslips. Private, mobile-friendly."
        keywords="excel salary data to pdf payslip converter 2026, india, no upload"
        url="/finance-tools/pdf-converters/excel-salary-data-to-payslip-pdf"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Excel → PDF Payslip', url: '/finance-tools/pdf-converters/excel-salary-data-to-payslip-pdf' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Excel Salary → PDF Payslip',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          }
        ]}
        faqData={faq}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Excel Salary Data → PDF Payslip Generator</h1>
          <p className="text-gray-700 mb-6">Each Excel row becomes a standardized payslip page with earnings and deductions.</p>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">Status: {status}</div>
              <div className="flex items-center gap-3">
                <button onClick={exportPDF} disabled={records.length===0} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50">Export PDF</button>
                <button onClick={()=>{setRecords([]); setStatus('Ready');}} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border">Clear</button>
              </div>
            </div>
            <div
              className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center cursor-pointer hover:bg-indigo-50"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const f = e.dataTransfer.files?.[0];
                if (f) handleExcel(f);
              }}
            >
              <input
                type="file"
                accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleExcel(f);
                }}
                className="hidden"
                id="excel-to-pdf-input"
              />
              <label htmlFor="excel-to-pdf-input" className="block">
                <div className="text-lg font-semibold text-indigo-700">Click to select Excel or drag & drop here</div>
                <div className="text-sm text-gray-600 mt-2">Client-side only • No upload • Fast</div>
              </label>
            </div>
          </div>
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <h2>Turn Excel Rows into Professional PDF Payslips</h2>
            <p>This generator takes a simple Excel and produces neatly formatted A4 payslips, one per row, entirely in your browser. It’s useful for startups, contractors, or small firms that maintain payroll in Excel and need consistent PDF outputs for employees or submissions.</p>
            <h3>Input Columns</h3>
            <p>Include columns like Name, Month, Basic, HRA, Allowances, Deductions (or PF/TDS/ESI), and Net Pay. Extra columns are ignored. If Net Pay is missing, it is computed as Basic + HRA + Allowances − Deductions.</p>
            <h3>Design and Layout</h3>
            <p>The preview reflects the template used for rendering. You can adjust fonts and spacing by editing the component later to match your brand. The exported PDF uses A4 portrait size with crisp rasterization for clarity on all devices.</p>
            <h3>Batch Export</h3>
            <p>Every row in the uploaded sheet becomes a page in the final PDF. Use the navigation controls to preview any slip before exporting the entire set.</p>
            <h3>Tips</h3>
            <p>Format currency columns in your Excel for consistency. Use full month names (e.g., “April 2026”) for clean slip headers. If you track Earnings and Deductions as separate columns, keep Net Pay to save time revising totals.</p>
            <h3>Privacy</h3>
            <p>No upload. The PDF is produced locally and saved to your device only when you click Export.</p>
          </div>
          <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <h2>Introduction</h2>
            <p>Create private payslips from your Excel data with a predictable, standardized layout.</p>
            <h2>What Is This Tool?</h2>
            <p>A client‑side renderer that converts each Excel row into a single A4 payslip page.</p>
            <h2>How It Works</h2>
            <p>Data is read locally, a slip is rendered in the browser, then captured into a PDF page. Each row renders sequentially.</p>
            <h2>Features</h2>
            <ul>
              <li>Drag‑drop Excel and quick parsing</li>
              <li>Standardized slip template</li>
              <li>Multi‑page PDF export</li>
            </ul>
            <h2>Benefits</h2>
            <ul>
              <li>Fast, consistent documents for teams and filings</li>
              <li>Zero server dependency preserves privacy</li>
            </ul>
            <h2>How to Use</h2>
            <ol>
              <li>Drop an .xlsx with Name, Month, amounts</li>
              <li>Preview any slip with Prev/Next</li>
              <li>Export PDF to download all pages</li>
            </ol>
            <h2>FAQs</h2>
            <p><strong>Wrong numbers?</strong> Fix the Excel and re‑import. <strong>Branding?</strong> Adjust the component layout to include a logo and colors.</p>
          </div>
          {rec && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-gray-700">Preview slip {currentIndex+1} of {records.length}</div>
                <div className="flex items-center gap-2">
                  <button disabled={currentIndex<=0} onClick={()=>setCurrentIndex(i=>Math.max(0,i-1))} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border disabled:opacity-50">Prev</button>
                  <button disabled={currentIndex>=records.length-1} onClick={()=>setCurrentIndex(i=>Math.min(records.length-1,i+1))} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border disabled:opacity-50">Next</button>
                </div>
              </div>
              <div ref={slipRef} className="mx-auto w-full max-w-[794px] border rounded-xl p-6 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xl font-bold text-gray-900">Payslip</div>
                  <div className="text-gray-700">{rec.month}</div>
                </div>
                <div className="mb-4">
                  <div className="font-semibold text-gray-900">{rec.name}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="font-semibold mb-2">Earnings</div>
                    <div className="flex justify-between py-1"><span>Basic</span><span>₹ {rec.basic.toLocaleString('en-IN')}</span></div>
                    <div className="flex justify-between py-1"><span>HRA</span><span>₹ {rec.hra.toLocaleString('en-IN')}</span></div>
                    <div className="flex justify-between py-1"><span>Allowances</span><span>₹ {rec.allowances.toLocaleString('en-IN')}</span></div>
                  </div>
                  <div>
                    <div className="font-semibold mb-2">Deductions</div>
                    <div className="flex justify-between py-1"><span>Deductions</span><span>₹ {rec.deductions.toLocaleString('en-IN')}</span></div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end text-lg font-bold text-gray-900">
                  <span className="mr-2">Net Pay</span>
                  <span>₹ {rec.net.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExcelSalaryDataToPayslipPdf;
