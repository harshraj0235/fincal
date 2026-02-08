import React, { useMemo, useRef, useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { ArrowLeft, Scale, Download, Link as LinkIcon } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const GSTLiabilityCalculator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [salesTaxable, setSalesTaxable] = useState<number>(0);
  const [outputRate, setOutputRate] = useState<number>(18);
  const [itcIGST, setItcIGST] = useState<number>(0);
  const [itcCGST, setItcCGST] = useState<number>(0);
  const [itcSGST, setItcSGST] = useState<number>(0);

  const output = useMemo(() => {
    const taxable = Number(salesTaxable) || 0;
    const r = Number(outputRate) || 0;
    const outputTax = (taxable * r) / 100;
    const totalITC = (Number(itcIGST)||0) + (Number(itcCGST)||0) + (Number(itcSGST)||0);
    const netPayable = Math.max(0, outputTax - totalITC);
    return { outputTax, totalITC, netPayable };
  }, [salesTaxable, outputRate, itcIGST, itcCGST, itcSGST]);

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
    pdf.save('gst-liability.pdf');
  };

  return (
    <>
      <SEOHelmet
        title="GST Input vs Output Tax Liability Calculator | MoneyCal.in"
        description="Compute GST output tax, adjust Input Tax Credit (IGST/CGST/SGST), and find net payable. PDF export ready."
        keywords="gst liability calculator, itc adjustment, output tax, gst payable"
        url="/gst-tools/gst-liability-calculator"
        type="website"
        image="/images/gst-tools.jpg"
        tags={["gst", "liability", "itc", "output tax"]}
      />
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-neutral-600 hover:text-neutral-900">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </button>
          </div>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Scale className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">GST Liability Calculator</h1>
            </div>
            <p className="text-gray-600">Enter output GST details and eligible ITC to get net payable.</p>
          </div>
          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sales Taxable Value (₹)</label>
                <input type="number" min={0} value={salesTaxable} onChange={(e) => setSalesTaxable(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Output Tax Rate (%)</label>
                <select value={outputRate} onChange={(e) => setOutputRate(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  {[0,5,12,18,28].map((r) => <option key={r} value={r}>{r}%</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ITC IGST (₹)</label>
                <input type="number" min={0} value={itcIGST} onChange={(e) => setItcIGST(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ITC CGST (₹)</label>
                <input type="number" min={0} value={itcCGST} onChange={(e) => setItcCGST(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ITC SGST (₹)</label>
                <input type="number" min={0} value={itcSGST} onChange={(e) => setItcSGST(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                <div className="text-xs text-amber-700">Output Tax</div>
                <div className="text-2xl font-bold text-amber-800">₹{output.outputTax.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="text-xs text-emerald-700">Total ITC</div>
                <div className="text-2xl font-bold text-emerald-800">₹{output.totalITC.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                <div className="text-xs text-red-700">Net Payable</div>
                <div className="text-2xl font-bold text-red-800">₹{output.netPayable.toLocaleString()}</div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" />
                Related GST Tools
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <RouterLink to="/gst-tools/gst-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Calculator</RouterLink>
                <RouterLink to="/gst-tools/gstr-3b-preparation" className="text-blue-600 hover:text-blue-800 underline">GSTR-3B Auto Preparation</RouterLink>
                <RouterLink to="/gst-tools/gst-penalty-interest-calculator" className="text-blue-600 hover:text-blue-800 underline">Penalty & Interest</RouterLink>
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

export default GSTLiabilityCalculator;


