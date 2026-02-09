import React, { useMemo, useRef, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { ArrowLeft, BarChart3, Info, Download, Link as LinkIcon } from 'lucide-react';
import { getPdfLibs } from '../../lib/pdfExportClient';

const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

type BusinessNature = 'goods' | 'services';

const GSTTurnoverTracker: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [nature, setNature] = useState<BusinessNature>('goods');
  const [stateCategory, setStateCategory] = useState<'normal' | 'special'>('normal');
  const [monthly, setMonthly] = useState<number[]>(Array(12).fill(0));

  const thresholds = useMemo(() => {
    // Typical thresholds: goods 40L (normal) / 20L (special), services 20L (both)
    const goods = stateCategory === 'normal' ? 40 : 20;
    const services = 20;
    const limitLakh = nature === 'goods' ? goods : services;
    return { limitLakh };
  }, [nature, stateCategory]);

  const totals = useMemo(() => {
    const annual = monthly.reduce((a, b) => a + (Number(b) || 0), 0);
    const eligible = annual >= thresholds.limitLakh * 100000;
    const remaining = Math.max(0, thresholds.limitLakh * 100000 - annual);
    return { annual, eligible, remaining };
  }, [monthly, thresholds]);

  const setMonth = (idx: number, value: number) => setMonthly(prev => prev.map((v, i) => (i === idx ? value : v)));

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
    pdf.save('gst-annual-turnover-tracker.pdf');
  };

  return (
    <>
      <SEOHelmet
        title="GST Annual Turnover Tracker & Registration Eligibility | MoneyCal.in"
        description="Track monthly sales to compute annual turnover and check GST registration eligibility threshold based on business nature and state category. Download PDF."
        keywords="gst turnover tracker, gst registration eligibility, annual turnover calculator, goods threshold 40 lakh, services 20 lakh"
        url="/gst-tools/gst-turnover-tracker"
        type="website"
        image="/images/gst-turnover.jpg"
        tags={["gst", "turnover", "registration", "threshold"]}
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
              <BarChart3 className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">GST Annual Turnover Tracker</h1>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Enter monthly sales to compute your annual turnover and check whether GST registration is required.
            </p>
          </div>

          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Nature</label>
                <select value={nature} onChange={(e) => setNature(e.target.value as BusinessNature)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  <option value="goods">Goods</option>
                  <option value="services">Services</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State Category</label>
                <select value={stateCategory} onChange={(e) => setStateCategory(e.target.value as 'normal' | 'special')} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  <option value="normal">Normal States</option>
                  <option value="special">Special Category States</option>
                </select>
              </div>
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                <div className="text-xs text-amber-700">Threshold Limit</div>
                <div className="text-2xl font-bold text-amber-800">₹{thresholds.limitLakh.toLocaleString()} Lakh</div>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {MONTHS.map((m) => (
                      <th key={m} className="px-3 py-2 text-center">{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {MONTHS.map((m, idx) => (
                      <td key={m} className="px-2 py-2">
                        <input type="number" min={0} value={monthly[idx]} onChange={(e) => setMonth(idx, Number(e.target.value))} className="w-28 text-right border rounded px-2 py-1" />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-xs text-blue-700">Annual Turnover</div>
                <div className="text-2xl font-bold text-blue-800">₹{totals.annual.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="text-xs text-emerald-700">Registration Required</div>
                <div className={`text-2xl font-bold ${totals.eligible ? 'text-emerald-800' : 'text-gray-800'}`}>{totals.eligible ? 'Yes' : 'Not Yet'}</div>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                <div className="text-xs text-purple-700">Remaining to Threshold</div>
                <div className="text-2xl font-bold text-purple-800">₹{totals.remaining.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Info className="h-4 w-4 mr-2" /> How to use this tool
              </h4>
              <ol className="list-decimal list-inside text-sm text-blue-900 space-y-1">
                <li>Select business nature (Goods/Services) and your state category.</li>
                <li>Enter monthly sales (FY basis). We'll compute annual turnover.</li>
                <li>Check if GST registration is required based on thresholds.</li>
                <li>Download a PDF snapshot for internal tracking.</li>
              </ol>
              <p className="text-xs text-blue-700 mt-2">Disclaimer: Thresholds are indicative. Verify with the latest GST notifications for your state.</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" /> Related GST Tools
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <RouterLink to="/gst-tools/gst-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Calculator</RouterLink>
                <RouterLink to="/gst-tools/gst-liability-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Liability Calculator</RouterLink>
                <RouterLink to="/gst-tools/gst-composition-eligibility" className="text-blue-600 hover:text-blue-800 underline">Composition Eligibility</RouterLink>
                <RouterLink to="/gst-tools/gstr-3b-preparation" className="text-blue-600 hover:text-blue-800 underline">GSTR‑3B Auto Preparation</RouterLink>
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

export default GSTTurnoverTracker;


