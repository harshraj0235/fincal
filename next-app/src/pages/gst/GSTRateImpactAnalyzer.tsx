import React, { useMemo, useRef, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { ArrowLeft, TrendingUp, Info, Download, Link as LinkIcon } from 'lucide-react';
import { getPdfLibs } from '../../lib/pdfExportClient';

const GSTRateImpactAnalyzer: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [basePrice, setBasePrice] = useState<number>(1000);
  const [oldRate, setOldRate] = useState<number>(12);
  const [newRate, setNewRate] = useState<number>(18);
  const [marginPercent, setMarginPercent] = useState<number>(15);

  const analysis = useMemo(() => {
    const bp = Number(basePrice) || 0;
    const oldTax = (bp * (Number(oldRate) || 0)) / 100;
    const newTax = (bp * (Number(newRate) || 0)) / 100;
    const oldPriceToCustomer = bp + oldTax;
    const newPriceToCustomer = bp + newTax;
    const priceImpact = newPriceToCustomer - oldPriceToCustomer;
    const marginValueOld = (oldPriceToCustomer * (Number(marginPercent) || 0)) / 100;
    const marginValueNew = (newPriceToCustomer * (Number(marginPercent) || 0)) / 100;
    const marginImpact = marginValueNew - marginValueOld;
    return { oldTax, newTax, oldPriceToCustomer, newPriceToCustomer, priceImpact, marginValueOld, marginValueNew, marginImpact };
  }, [basePrice, oldRate, newRate, marginPercent]);

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
    pdf.save('gst-rate-impact-analyzer.pdf');
  };

  return (
    <>
      <SEOHelmet
        title="GST Rate Change Impact Analyzer | MoneyCal.in"
        description="Analyze impact of GST rate change on final price and margins. Compare old vs new tax, customer price, and margin impact. Download PDF report."
        keywords="gst rate change impact, gst price impact, gst margin impact, analyzer"
        url="/gst-tools/gst-rate-impact-analyzer"
        type="website"
        image="/images/gst-rate-impact.jpg"
        tags={["gst", "rate", "impact", "margin"]}
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
              <TrendingUp className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">GST Rate Impact Analyzer</h1>
            </div>
            <p className="text-gray-600">See how changing GST rate affects customer price and margins.</p>
          </div>

          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (Excl. GST)</label>
                <input type="number" min={0} value={basePrice} onChange={(e) => setBasePrice(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Old GST Rate (%)</label>
                <select value={oldRate} onChange={(e) => setOldRate(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  {[0, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New GST Rate (%)</label>
                <select value={newRate} onChange={(e) => setNewRate(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  {[0, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Margin (%)</label>
                <input type="number" min={0} value={marginPercent} onChange={(e) => setMarginPercent(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-xs text-blue-700">Old Price (Incl. GST)</div>
                <div className="text-2xl font-bold text-blue-800">₹{analysis.oldPriceToCustomer.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="text-xs text-emerald-700">New Price (Incl. GST)</div>
                <div className="text-2xl font-bold text-emerald-800">₹{analysis.newPriceToCustomer.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                <div className="text-xs text-amber-700">Price Impact</div>
                <div className={`text-2xl font-bold ${analysis.priceImpact >= 0 ? 'text-amber-800' : 'text-emerald-800'}`}>₹{analysis.priceImpact.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                <div className="text-xs text-purple-700">Old GST Amount</div>
                <div className="text-2xl font-bold text-purple-800">₹{analysis.oldTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="p-4 rounded-lg bg-rose-50 border border-rose-100">
                <div className="text-xs text-rose-700">New GST Amount</div>
                <div className="text-2xl font-bold text-rose-800">₹{analysis.newTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="text-xs text-gray-700">Margin Impact</div>
                <div className={`text-2xl font-bold ${analysis.marginImpact >= 0 ? 'text-gray-900' : 'text-emerald-800'}`}>₹{analysis.marginImpact.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Info className="h-4 w-4 mr-2" /> How to use this tool
              </h4>
              <ol className="list-decimal list-inside text-sm text-blue-900 space-y-1">
                <li>Enter base price exclusive of GST.</li>
                <li>Select previous (old) GST rate and the new rate.</li>
                <li>Enter your margin percentage to see profitability impact.</li>
                <li>Download a PDF for stakeholder communication.</li>
              </ol>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" /> Related GST Tools
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <RouterLink to="/gst-tools/gst-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Calculator</RouterLink>
                <RouterLink to="/gst-tools/gst-slab-finder" className="text-blue-600 hover:text-blue-800 underline">GST Slab Finder</RouterLink>
                <RouterLink to="/gst-tools/gst-liability-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Liability Calculator</RouterLink>
                <RouterLink to="/gst-tools/gst-invoice-generator" className="text-blue-600 hover:text-blue-800 underline">GST Invoice Generator</RouterLink>
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

export default GSTRateImpactAnalyzer;


