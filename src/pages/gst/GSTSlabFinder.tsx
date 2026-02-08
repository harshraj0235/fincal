import React, { useMemo, useRef, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { ArrowLeft, Layers, Search, Info, Download, Link as LinkIcon } from 'lucide-react';
import { getPdfLibs } from '../../lib/pdfExportClient';

type SupplyKind = 'goods' | 'services';

interface SlabRule {
  label: string;
  kind: SupplyKind;
  rate: 0 | 5 | 12 | 18 | 28;
  keywords: string[]; // simple keyword matching
}

const SLAB_RULES: SlabRule[] = [
  { label: 'Unbranded food grains', kind: 'goods', rate: 0, keywords: ['rice', 'wheat', 'dal', 'pulses', 'atta'] },
  { label: 'Milk and curd (unbranded)', kind: 'goods', rate: 0, keywords: ['milk', 'curd', 'dahi'] },
  { label: 'Railway tickets (AC)', kind: 'services', rate: 5, keywords: ['train', 'railway ticket'] },
  { label: 'Restaurant (non-AC, no alcohol)', kind: 'services', rate: 5, keywords: ['restaurant', 'dine', 'food service'] },
  { label: 'Packaged food items', kind: 'goods', rate: 12, keywords: ['packaged food', 'instant noodles', 'corn flakes'] },
  { label: 'Mobile phones and accessories', kind: 'goods', rate: 12, keywords: ['mobile', 'phone', 'earbuds', 'charger'] },
  { label: 'Professional services', kind: 'services', rate: 18, keywords: ['consulting', 'software', 'design', 'marketing'] },
  { label: 'Electronics and appliances', kind: 'goods', rate: 18, keywords: ['tv', 'refrigerator', 'washing machine', 'laptop'] },
  { label: 'Luxury cars', kind: 'goods', rate: 28, keywords: ['car', 'luxury', 'suv'] },
  { label: 'Aerated drinks', kind: 'goods', rate: 28, keywords: ['cola', 'soft drink', 'aerated'] },
];

const COMMON_RATES: Array<0 | 5 | 12 | 18 | 28> = [0, 5, 12, 18, 28];

const GSTSlabFinder: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState<string>('');
  const [kind, setKind] = useState<SupplyKind>('goods');
  const [overrideRate, setOverrideRate] = useState<0 | 5 | 12 | 18 | 28 | ''>('');
  const [igst, setIgst] = useState<boolean>(false);

  const bestMatch = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    const candidates = SLAB_RULES.filter(r => r.kind === kind);
    for (const r of candidates) {
      if (r.keywords.some(k => q.includes(k))) {
        return r;
      }
    }
    return null;
  }, [query, kind]);

  const effectiveRate = useMemo(() => {
    if (overrideRate !== '') return overrideRate;
    if (bestMatch) return bestMatch.rate;
    return 18; // default mid-rate when unknown
  }, [overrideRate, bestMatch]);

  const breakdown = useMemo(() => {
    const rate = Number(effectiveRate) as 0 | 5 | 12 | 18 | 28;
    if (igst) {
      return { rate, igst: rate, cgst: 0, sgst: 0 };
    }
    return { rate, igst: 0, cgst: rate / 2, sgst: rate / 2 };
  }, [effectiveRate, igst]);

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
    pdf.save('gst-slab-finder-report.pdf');
  };

  return (
    <>
      <SEOHelmet
        title="GST Slab Finder - Tax Rate for Products & Services | MoneyCal.in"
        description="Find the correct GST slab (0%, 5%, 12%, 18%, 28%) for your product or service. Search by keyword, view CGST/SGST or IGST split, and download a PDF."
        keywords="gst slab finder, gst tax rate, gst rate product, gst service rate, cgst sgst igst"
        url="/gst-tools/gst-slab-finder"
        type="website"
        image="/images/gst-slab.jpg"
        tags={["gst", "rate", "slab", "hsn", "service"]}
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
              <Layers className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">GST Slab Finder</h1>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Search for your product/service and get the indicative GST slab. You can override the rate if you already know it.
              For precise HSN/SAC and notifications, use our HSN/SAC Finder and consult official sources.
            </p>
          </div>

          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Product/Service</label>
                <div className="relative">
                  <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., mobile phone, restaurant, software"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kind</label>
                <select value={kind} onChange={(e) => setKind(e.target.value as SupplyKind)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  <option value="goods">Goods</option>
                  <option value="services">Services</option>
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                <div className="text-xs text-amber-700">Suggested Rate</div>
                <div className="text-2xl font-bold text-amber-800">{bestMatch ? `${bestMatch.rate}%` : '—'}</div>
                {bestMatch && <div className="text-xs text-amber-700 mt-1">Matched: {bestMatch.label}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Override Rate (optional)</label>
                <select value={overrideRate} onChange={(e) => setOverrideRate((e.target.value === '' ? '' : Number(e.target.value)) as any)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  <option value="">Auto</option>
                  {COMMON_RATES.map(r => (
                    <option key={r} value={r}>{r}%</option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700 bg-amber-50 p-3 rounded-lg border border-amber-100 h-[42px] md:h-auto mt-6 md:mt-0">
                <input type="checkbox" className="h-4 w-4" checked={igst} onChange={(e) => setIgst(e.target.checked)} />
                Apply IGST (inter-state/export scenarios)
              </label>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-xs text-blue-700">Effective Rate</div>
                <div className="text-2xl font-bold text-blue-800">{breakdown.rate}%</div>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="text-xs text-emerald-700">CGST</div>
                <div className="text-2xl font-bold text-emerald-800">{breakdown.cgst}%</div>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                <div className="text-xs text-purple-700">SGST</div>
                <div className="text-2xl font-bold text-purple-800">{breakdown.sgst}%</div>
              </div>
              <div className="p-4 rounded-lg bg-rose-50 border border-rose-100">
                <div className="text-xs text-rose-700">IGST</div>
                <div className="text-2xl font-bold text-rose-800">{breakdown.igst}%</div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Info className="h-4 w-4 mr-2" /> How to use this tool
              </h4>
              <ol className="list-decimal list-inside text-sm text-blue-900 space-y-1">
                <li>Search your product/service using common names.</li>
                <li>Select the kind (Goods or Services) to narrow down results.</li>
                <li>Review the suggested rate or override it if you already know the slab.</li>
                <li>Toggle IGST if inter-state or import/export applies.</li>
                <li>Download a PDF for documentation or sharing purposes.</li>
              </ol>
              <p className="text-xs text-blue-700 mt-2">Disclaimer: This is indicative. For exact HSN/SAC and notifications, refer CBIC/State GST portals or consult your tax advisor.</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" /> Related GST Tools
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <RouterLink to="/gst-tools/gst-hsn-sac-finder" className="text-blue-600 hover:text-blue-800 underline">HSN/SAC Code Finder</RouterLink>
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

          <div className="mt-10 prose prose-amber max-w-none">
            <h2>About GST Slabs in India</h2>
            <p>
              Goods and Services Tax (GST) is levied at multiple slab rates: 0%, 5%, 12%, 18%, and 28%, depending on the nature of the supply.
              Certain goods/services may also attract cess in addition to the slab rate. Rates and coverage are subject to periodic changes by the GST Council.
            </p>
            <h3>Tips</h3>
            <ul>
              <li>Identify the correct HSN (for goods) or SAC (for services) to confirm the exact rate.</li>
              <li>Check exemptions and special notifications applicable to your product/service.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default GSTSlabFinder;


