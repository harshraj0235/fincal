import React, { useMemo, useRef, useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { ArrowLeft, AlertTriangle, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Simplified assumptions (adjust if rules change):
// Interest: 18% p.a. for delayed tax payment -> (tax * 18% * days/365)
// Late fee: Rs 50 per day (Rs 25 CGST + Rs 25 SGST), capped at Rs 5,000 (example cap)

const GSTPenaltyInterestCalculator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [delayDays, setDelayDays] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(18);

  const result = useMemo(() => {
    const t = Math.max(0, Number(taxAmount) || 0);
    const d = Math.max(0, Number(delayDays) || 0);
    const r = Math.max(0, Number(interestRate) || 0);
    const interest = (t * (r / 100) * (d / 365));
    const lateFeePerDay = 50; // simplified
    const lateFeeCap = 5000;
    const lateFee = Math.min(lateFeeCap, d * lateFeePerDay);
    const total = interest + lateFee;
    return { interest, lateFee, total };
  }, [taxAmount, delayDays, interestRate]);

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
    pdf.save('gst-penalty-interest.pdf');
  };

  return (
    <>
      <SEOHelmet
        title="GST Penalty & Interest Calculator | MoneyCal.in"
        description="Calculate GST interest for delayed payment and late fee with caps. SEO-friendly tool with PDF export."
        keywords="gst interest calculator, gst late fee, gst penalty tool"
        url="/gst-tools/gst-penalty-interest-calculator"
        type="website"
        image="/images/gst-tools.jpg"
        tags={["gst", "interest", "late fee", "penalty"]}
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
              <AlertTriangle className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">GST Penalty & Interest Calculator</h1>
            </div>
            <p className="text-gray-600">Estimate interest for delay and late fees. Always verify current rates on the GST portal.</p>
          </div>
          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax Amount (₹)</label>
                <input type="number" min={0} value={taxAmount} onChange={(e) => setTaxAmount(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delay (days)</label>
                <input type="number" min={0} value={delayDays} onChange={(e) => setDelayDays(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (% p.a.)</label>
                <select value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  {[12, 15, 18, 24].map((r) => <option key={r} value={r}>{r}%</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                <div className="text-xs text-amber-700">Interest</div>
                <div className="text-2xl font-bold text-amber-800">₹{result.interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                <div className="text-xs text-red-700">Late Fee</div>
                <div className="text-2xl font-bold text-red-800">₹{result.lateFee.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-xs text-blue-700">Total</div>
                <div className="text-2xl font-bold text-blue-800">₹{result.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
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

export default GSTPenaltyInterestCalculator;
