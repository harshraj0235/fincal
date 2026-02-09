import React, { useMemo, useRef, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { ArrowLeft, Route as RouteIcon, Info, Download, Link as LinkIcon } from 'lucide-react';
import { getPdfLibs } from '../../lib/pdfExportClient';

const PIN_LAT_LONG: Record<string, { lat: number; lon: number }> = {
  '400001': { lat: 18.942, lon: 72.835 }, // Mumbai GPO approx
  '110001': { lat: 28.632, lon: 77.219 }, // New Delhi GPO approx
  '560001': { lat: 12.976, lon: 77.603 }, // Bengaluru GPO approx
  '600001': { lat: 13.085, lon: 80.271 }, // Chennai GPO approx
  '700001': { lat: 22.573, lon: 88.363 }, // Kolkata GPO approx
};

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function ewayValidity(distanceKm: number, isOverDimensional: boolean): number {
  // Govt rule (typical): 1 day for up to 200 km, plus 1 day for every additional 200 km. ODC gets extra day.
  const baseDays = Math.ceil(distanceKm / 200);
  return baseDays + (isOverDimensional ? 1 : 0);
}

const GSTEWayDistanceCalculator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [fromPin, setFromPin] = useState<string>('400001');
  const [toPin, setToPin] = useState<string>('110001');
  const [odc, setOdc] = useState<boolean>(false);

  const computation = useMemo(() => {
    const a = PIN_LAT_LONG[fromPin];
    const b = PIN_LAT_LONG[toPin];
    if (!a || !b) return { distance: 0, validityDays: 0 };
    const d = haversine(a.lat, a.lon, b.lat, b.lon);
    const validityDays = ewayValidity(d, odc);
    return { distance: d, validityDays };
  }, [fromPin, toPin, odc]);

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
    pdf.save('gst-eway-distance-validity.pdf');
  };

  return (
    <>
      <SEOHelmet
        title="GST E-Way Bill Distance & Validity Calculator | MoneyCal.in"
        description="Estimate distance between PIN codes and e-way bill validity days (including ODC). Download a PDF report."
        keywords="gst eway distance calculator, e way bill validity, odc validity, pin code distance"
        url="/gst-tools/gst-eway-distance-calculator"
        type="website"
        image="/images/gst-eway.jpg"
        tags={["gst", "eway", "distance", "validity"]}
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
              <RouteIcon className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">E-Way Bill Distance & Validity</h1>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Select source and destination PIN codes to estimate distance and the e-way bill validity days. Toggle ODC if applicable.
            </p>
          </div>

          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From PIN</label>
                <select value={fromPin} onChange={(e) => setFromPin(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  {Object.keys(PIN_LAT_LONG).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To PIN</label>
                <select value={toPin} onChange={(e) => setToPin(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  {Object.keys(PIN_LAT_LONG).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700 bg-amber-50 p-3 rounded-lg border border-amber-100">
                <input type="checkbox" className="h-4 w-4" checked={odc} onChange={(e) => setOdc(e.target.checked)} />
                Over-dimensional cargo (ODC)
              </label>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-xs text-blue-700">Estimated Distance</div>
                <div className="text-2xl font-bold text-blue-800">{computation.distance.toFixed(1)} km</div>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="text-xs text-emerald-700">E-Way Bill Validity</div>
                <div className="text-2xl font-bold text-emerald-800">{computation.validityDays} day(s)</div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Info className="h-4 w-4 mr-2" /> How to use this tool
              </h4>
              <ol className="list-decimal list-inside text-sm text-blue-900 space-y-1">
                <li>Choose the source and destination PIN codes from the list.</li>
                <li>Enable ODC if the shipment is over-dimensional.</li>
                <li>View estimated distance and validity days and download a PDF.</li>
              </ol>
              <p className="text-xs text-blue-700 mt-2">Note: This is an approximate distance using sample coordinates. For exact routing, use logistics APIs or mapping services.</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" /> Related GST Tools
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <RouterLink to="/gst-tools/gst-invoice-generator" className="text-blue-600 hover:text-blue-800 underline">GST Invoice Generator</RouterLink>
                <RouterLink to="/gst-tools/gst-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Calculator</RouterLink>
                <RouterLink to="/gst-tools/gst-liability-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Liability Calculator</RouterLink>
                <RouterLink to="/gst-tools/gst-rcm-calculator" className="text-blue-600 hover:text-blue-800 underline">GST RCM Calculator</RouterLink>
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

export default GSTEWayDistanceCalculator;


