import React, { useMemo, useRef, useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { ArrowLeft, Calculator, Download, Link as LinkIcon } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { getPdfLibs } from '../../lib/pdfExportClient';

const GSTCalculator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [amount, setAmount] = useState<number>(0);
  const [rate, setRate] = useState<number>(18);

  const result = useMemo(() => {
    const amt = Number(amount) || 0;
    const r = Number(rate) || 0;
    if (amt <= 0 || r < 0) {
      return {
        taxAmount: 0,
        net: 0,
        gross: 0,
      };
    }
    if (mode === 'add') {
      const taxAmount = (amt * r) / 100;
      return { taxAmount, net: amt, gross: amt + taxAmount };
    }
    // remove
    const base = (amt * 100) / (100 + r);
    const taxAmount = amt - base;
    return { taxAmount, net: base, gross: amt };
  }, [amount, rate, mode]);

  const downloadPDF = async () => {
    if (!resultsRef.current) return;
    const { html2canvas, jsPDF } = await getPdfLibs();
    const canvas = await html2canvas(resultsRef.current, { scale: 2, useCORS: true, allowTaint: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    pdf.save('gst-calculation.pdf');
  };

  return (
    <>
      <SEOHelmet
        title="GST Calculator - Add/Remove GST Online | MoneyCal.in"
        description="Quickly add or remove GST from any amount. Calculate GST-inclusive and GST-exclusive prices with tax breakdown."
        keywords="gst calculator, add gst, remove gst, gst inclusive, gst exclusive"
        url="/gst-tools/gst-calculator"
        type="website"
        image="/images/gst-calculator.jpg"
        tags={["gst", "calculator", "tax"]}
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
              <Calculator className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">GST Calculator</h1>
            </div>
            <p className="text-gray-600">Add or remove GST and view tax breakdown. PDF export included.</p>
          </div>
          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                <div className="flex gap-2">
                  <button onClick={() => setMode('add')} className={`px-3 py-2 rounded-lg border ${mode==='add' ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-gray-700 border-gray-300'}`}>Add GST</button>
                  <button onClick={() => setMode('remove')} className={`px-3 py-2 rounded-lg border ${mode==='remove' ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-gray-700 border-gray-300'}`}>Remove GST</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                <input type="number" min={0} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="Enter amount" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GST Rate (%)</label>
                <select value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  {[0, 5, 12, 18, 28].map((r) => (
                    <option key={r} value={r}>{r}%</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                <div className="text-xs text-amber-700">Tax Amount</div>
                <div className="text-2xl font-bold text-amber-800">₹{result.taxAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="text-xs text-emerald-700">Amount (Excl. GST)</div>
                <div className="text-2xl font-bold text-emerald-800">₹{result.net.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-xs text-blue-700">Amount (Incl. GST)</div>
                <div className="text-2xl font-bold text-blue-800">₹{result.gross.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" />
                Related GST Tools
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <RouterLink to="/gst-tools/gst-due-date-tracker" className="text-blue-600 hover:text-blue-800 underline">GST Due Date Tracker</RouterLink>
                <RouterLink to="/gst-tools/gstr-3b-preparation" className="text-blue-600 hover:text-blue-800 underline">GSTR-3B Auto Preparation</RouterLink>
                <RouterLink to="/gst-tools/gst-hsn-sac-finder" className="text-blue-600 hover:text-blue-800 underline">HSN/SAC Code Finder</RouterLink>
                <RouterLink to="/gst-tools/gst-liability-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Liability Calculator</RouterLink>
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

export default GSTCalculator;


