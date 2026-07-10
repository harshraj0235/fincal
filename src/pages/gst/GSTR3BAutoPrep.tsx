import React, { useMemo, useRef, useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { ArrowLeft, FileSpreadsheet, Upload, Download, Link as LinkIcon } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type InvoiceType = 'sales' | 'purchase';
interface InvoiceRow {
  type: InvoiceType;
  taxable: number;
  igst: number;
  cgst: number;
  sgst: number;
}

function parseCSV(text: string): InvoiceRow[] {
  const rows = text.trim().split(/\r?\n/);
  const out: InvoiceRow[] = [];
  for (const row of rows.slice(1)) {
    const cols = row.split(',');
    if (cols.length < 6) continue;
    out.push({
      type: cols[0].trim() as InvoiceType,
      taxable: Number(cols[1]) || 0,
      igst: Number(cols[2]) || 0,
      cgst: Number(cols[3]) || 0,
      sgst: Number(cols[4]) || 0,
    });
  }
  return out;
}

const GSTR3BAutoPrep: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<InvoiceRow[]>([]);

  const summary = useMemo(() => {
    const s = rows.filter(r => r.type === 'sales');
    const p = rows.filter(r => r.type === 'purchase');
    const salesTaxable = s.reduce((a, b) => a + b.taxable, 0);
    const outputIGST = s.reduce((a, b) => a + b.igst, 0);
    const outputCGST = s.reduce((a, b) => a + b.cgst, 0);
    const outputSGST = s.reduce((a, b) => a + b.sgst, 0);
    const purchaseTaxable = p.reduce((a, b) => a + b.taxable, 0);
    const itcIGST = p.reduce((a, b) => a + b.igst, 0);
    const itcCGST = p.reduce((a, b) => a + b.cgst, 0);
    const itcSGST = p.reduce((a, b) => a + b.sgst, 0);
    return { salesTaxable, outputIGST, outputCGST, outputSGST, purchaseTaxable, itcIGST, itcCGST, itcSGST };
  }, [rows]);

  const handleFile = async (file?: File) => {
    if (!file) return;
    const text = await file.text();
    setRows(parseCSV(text));
  };

  const downloadPDF = async () => {
    if (!resultsRef.current) return;
    const canvas = await html2canvas(resultsRef.current, { scale: 2, useCORS: true, allowTaint: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; const pageHeight = 295; const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight; let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) { position = heightLeft - imgHeight; pdf.addPage(); pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight); heightLeft -= pageHeight; }
    pdf.save('gstr3b-summary.pdf');
  };

  return (
    <>
      <SEOHelmet
        title="GSTR-3B Auto Preparation Tool | MoneyCal.in"
        description="Upload sales and purchase CSV to auto-prepare GSTR-3B summary. Output tax, eligible ITC, and net liability with PDF export."
        keywords="gstr-3b Calculator, gst return preparation, itc, output tax"
        url="/gst-tools/gstr-3b-preparation"
        type="website"
        image="/images/gst-tools.jpg"
        tags={["gst", "gstr-3b", "itc", "output tax"]}
      />
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-neutral-600 hover:text-neutral-900">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </button>
          </div>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <FileSpreadsheet className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">GSTR-3B Auto Preparation</h1>
            </div>
            <p className="text-gray-600">Upload CSV of sales and purchases to auto-generate summary.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload CSV</label>
            <div className="flex items-center gap-4">
              <input type="file" accept=".csv" onChange={(e) => handleFile(e.target.files?.[0])} />
              <a href="data:text/csv;charset=utf-8,type, taxable, igst, cgst, sgst%0Asales,100000,0,9000,9000%0Apurchase,50000,0,4500,4500" download="gstr3b_template.csv" className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                <Upload className="h-4 w-4 mr-2" /> Download CSV Template
              </a>
            </div>
          </div>
          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-xs text-blue-700">Sales Taxable</div>
                <div className="text-xl font-bold text-blue-900">₹{summary.salesTaxable.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                <div className="text-xs text-amber-700">Output Tax</div>
                <div className="text-sm text-amber-800">IGST ₹{summary.outputIGST.toLocaleString()} | CGST ₹{summary.outputCGST.toLocaleString()} | SGST ₹{summary.outputSGST.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="text-xs text-emerald-700">Eligible ITC</div>
                <div className="text-sm text-emerald-800">IGST ₹{summary.itcIGST.toLocaleString()} | CGST ₹{summary.itcCGST.toLocaleString()} | SGST ₹{summary.itcSGST.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                <div className="text-xs text-red-700">Net Liability (IGST+CGST+SGST)</div>
                <div className="text-xl font-bold text-red-900">₹{Math.max(0, (summary.outputIGST+summary.outputCGST+summary.outputSGST) - (summary.itcIGST+summary.itcCGST+summary.itcSGST)).toLocaleString()}</div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" />
                Related GST Tools
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <RouterLink to="/gst-tools/gst-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Calculator</RouterLink>
                <RouterLink to="/gst-tools/gst-penalty-interest-calculator" className="text-blue-600 hover:text-blue-800 underline">Penalty & Interest</RouterLink>
                <RouterLink to="/gst-tools/gst-liability-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Liability</RouterLink>
                <RouterLink to="/gst-tools/gst-hsn-sac-finder" className="text-blue-600 hover:text-blue-800 underline">HSN/SAC Finder</RouterLink>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={downloadPDF} className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GSTR3BAutoPrep;


