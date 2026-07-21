import React, { useMemo, useRef, useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';

import { ArrowLeft, Calendar, Download, Link as LinkIcon } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type FilingType = 'GSTR-1' | 'GSTR-3B' | 'GSTR-9' | 'CMP-08';

const filingRules: Record<FilingType, { dueDay: number; freq: 'monthly' | 'quarterly' | 'annual' }[]> = {
  'GSTR-1': [
    { dueDay: 11, freq: 'monthly' },
    { dueDay: 13, freq: 'quarterly' },
  ],
  'GSTR-3B': [
    { dueDay: 20, freq: 'monthly' },
    { dueDay: 22, freq: 'monthly' },
    { dueDay: 24, freq: 'monthly' },
  ],
  'GSTR-9': [
    { dueDay: 31, freq: 'annual' },
  ],
  'CMP-08': [
    { dueDay: 18, freq: 'quarterly' },
  ],
};

function getNextDueDate(today: Date, dueDay: number): Date {
  const due = new Date(today.getFullYear(), today.getMonth(), dueDay);
  if (due <= today) {
    return new Date(today.getFullYear(), today.getMonth() + 1, dueDay);
  }
  return due;
}

const GSTDueDateTracker: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [stateCode, setStateCode] = useState<string>('MH');
  const [turnoverCr, setTurnoverCr] = useState<number>(1.2);
  const [filingType, setFilingType] = useState<FilingType>('GSTR-3B');

  const schedule = useMemo(() => {
    const today = new Date();
    const rules = filingRules[filingType];
    const nextDates = rules.map((r) => ({ dueDay: r.dueDay, date: getNextDueDate(today, r.dueDay), freq: r.freq }));
    return nextDates.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [filingType]);

  const recommendation = useMemo(() => {
    if (filingType === 'GSTR-1') {
      return turnoverCr <= 1.5 ? 'Quarterly (QRMP) recommended' : 'Monthly filing required';
    }
    if (filingType === 'GSTR-3B') {
      return turnoverCr <= 5 ? 'QRMP scheme eligible (pay monthly, file quarterly)' : 'Monthly 3B filing required';
    }
    if (filingType === 'CMP-08') {
      return 'Quarterly payment for composition taxpayers';
    }
    return 'Annual return (for regular taxpayers)';
  }, [filingType, turnoverCr]);

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
    pdf.save('gst-due-date-tracker.pdf');
  };

  return (
    <>
      <SEOHelmet
        title="GST Return Filing Due Date Tracker | MoneyCal.in"
        description="Track GST return due dates (GSTR-1, 3B, 9, CMP-08) with QRMP eligibility suggestions. Download schedule as PDF."
        keywords="gst due date tracker, gstr-3b due date, gstr-1 due date, qrmp"
        url="/gst-tools/gst-due-date-tracker"
        type="website"
        image="/images/gst-tools.jpg"
        tags={["gst", "due date", "gstr-3b", "gstr-1", "qrmp"]}
      />
      <WhatsAppBanner />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-neutral-600 hover:text-neutral-900">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </button>
          </div>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">GST Return Filing Due Date Tracker</h1>
            </div>
            <p className="text-gray-600">Select filing type and turnover to see the next due date and schedule.</p>
          </div>
          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <select value={stateCode} onChange={(e) => setStateCode(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  {['MH','DL','KA','GJ','RJ','TN','UP','WB'].map((st) => <option key={st} value={st}>{st}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Turnover (₹ Cr)</label>
                <input type="number" min={0} step={0.01} value={turnoverCr} onChange={(e) => setTurnoverCr(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filing Type</label>
                <select value={filingType} onChange={(e) => setFilingType(e.target.value as FilingType)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  {(['GSTR-1','GSTR-3B','GSTR-9','CMP-08'] as FilingType[]).map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>

            <div className="mb-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
              <div className="text-sm text-blue-800">Recommendation</div>
              <div className="text-lg font-semibold text-blue-900">{recommendation}</div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 border-b">Filing</th>
                    <th className="px-4 py-2 border-b">Frequency</th>
                    <th className="px-4 py-2 border-b">Due Day</th>
                    <th className="px-4 py-2 border-b">Next Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row, idx) => (
                    <tr key={idx} className="odd:bg-white even:bg-gray-50">
                      <td className="px-4 py-2 border-b">{filingType}</td>
                      <td className="px-4 py-2 border-b capitalize">{row.freq}</td>
                      <td className="px-4 py-2 border-b">{row.dueDay}</td>
                      <td className="px-4 py-2 border-b">{row.date.toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" />
                Related GST Tools
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <RouterLink to="/gst-tools/gst-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Calculator</RouterLink>
                <RouterLink to="/gst-tools/gst-penalty-interest-calculator" className="text-blue-600 hover:text-blue-800 underline">Penalty & Interest Calculator</RouterLink>
                <RouterLink to="/gst-tools/gstr-3b-preparation" className="text-blue-600 hover:text-blue-800 underline">GSTR-3B Auto Preparation</RouterLink>
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

export default GSTDueDateTracker;


