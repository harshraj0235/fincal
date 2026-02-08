import React, { useMemo, useRef, useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { ArrowLeft, Search, Download, Link as LinkIcon } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { getPdfLibs } from '../../lib/pdfExportClient';

interface Code { kind: 'HSN' | 'SAC'; code: string; name: string; rate: number; }

const sample: Code[] = [
  { kind: 'HSN', code: '1006', name: 'Rice', rate: 5 },
  { kind: 'HSN', code: '2710', name: 'Petroleum oils', rate: 18 },
  { kind: 'HSN', code: '2106', name: 'Food preparations', rate: 12 },
  { kind: 'SAC', code: '9983', name: 'Other professional services', rate: 18 },
  { kind: 'SAC', code: '9965', name: 'Restaurant services', rate: 5 }
];

const GSTHSNSACFinder: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'ALL'|'HSN'|'SAC'>('ALL');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sample.filter(item => {
      if (type !== 'ALL' && item.kind !== type) return false;
      if (!q) return true;
      return item.name.toLowerCase().includes(q) || item.code.includes(q);
    });
  }, [query, type]);

  const downloadPDF = async () => {
    if (!resultsRef.current) return;
    const { html2canvas, jsPDF } = await getPdfLibs();
    const canvas = await html2canvas(resultsRef.current, { scale: 2, useCORS: true, allowTaint: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; const pageHeight = 295; const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight; let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) { position = heightLeft - imgHeight; pdf.addPage(); pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight); heightLeft -= pageHeight; }
    pdf.save('gst-hsn-sac-results.pdf');
  };

  return (
    <>
      <SEOHelmet
        title="GST HSN/SAC Code Finder | MoneyCal.in"
        description="Find correct HSN and SAC codes with indicative GST rates. Search by product/service name or code and export results as PDF."
        keywords="hsn code finder, sac code, gst rate, gst hsn"
        url="/gst-tools/gst-hsn-sac-finder"
        type="website"
        image="/images/gst-tools.jpg"
        tags={["gst", "hsn", "sac", "rate"]}
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
              <Search className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">GST HSN/SAC Code Finder</h1>
            </div>
            <p className="text-gray-600">Search HSN/SAC codes and indicative GST rates. Data is sample; integrate API or dataset for production.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product/Service or Code</label>
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g., Restaurant, 1006, Rice" className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  <option value="ALL">All</option>
                  <option value="HSN">HSN</option>
                  <option value="SAC">SAC</option>
                </select>
              </div>
            </div>
          </div>
          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 border-b">Type</th>
                    <th className="px-4 py-2 border-b">Code</th>
                    <th className="px-4 py-2 border-b">Description</th>
                    <th className="px-4 py-2 border-b">GST Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, idx) => (
                    <tr key={idx} className="odd:bg-white even:bg-gray-50">
                      <td className="px-4 py-2 border-b">{row.kind}</td>
                      <td className="px-4 py-2 border-b font-mono">{row.code}</td>
                      <td className="px-4 py-2 border-b">{row.name}</td>
                      <td className="px-4 py-2 border-b">{row.rate}%</td>
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
                <RouterLink to="/gst-tools/gst-slab-finder" className="text-blue-600 hover:text-blue-800 underline">GST Slab Finder</RouterLink>
                <RouterLink to="/gst-tools/gst-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Calculator</RouterLink>
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

export default GSTHSNSACFinder;


