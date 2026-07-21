import React, { useMemo, useRef, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';

import { ArrowLeft, Repeat, Info, Download, Link as LinkIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type SupplyType = 'goods' | 'services';

interface RateRule {
  display: string;
  ratePercent: number;
}

const GOODS_RULES: RateRule[] = [
  { display: 'Cashew nuts (not shelled or peeled)', ratePercent: 5 },
  { display: 'Tobacco leaves', ratePercent: 5 },
  { display: 'Silk yarn', ratePercent: 5 },
  { display: 'Lenses for spectacles', ratePercent: 12 },
  { display: 'Cement', ratePercent: 28 },
  { display: 'Other notified goods', ratePercent: 18 }
];

const SERVICE_RULES: RateRule[] = [
  { display: 'GTA (Goods Transport Agency)', ratePercent: 5 },
  { display: 'Legal services by advocate/firm', ratePercent: 18 },
  { display: 'Sponsorship services', ratePercent: 18 },
  { display: 'Security services (body corporate)', ratePercent: 18 },
  { display: 'Director services', ratePercent: 18 },
  { display: 'Other notified services', ratePercent: 18 }
];

const GSTRCMCalculator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);

  const [supplyType, setSupplyType] = useState<SupplyType>('services');
  const [ruleIndex, setRuleIndex] = useState<number>(0);
  const [taxableValue, setTaxableValue] = useState<number>(100000);
  const [igstApplicable, setIgstApplicable] = useState<boolean>(false);

  const rules = supplyType === 'goods' ? GOODS_RULES : SERVICE_RULES;

  const result = useMemo(() => {
    const base = Number(taxableValue) || 0;
    const rate = rules[ruleIndex]?.ratePercent ?? 18;
    const tax = (base * rate) / 100;
    if (igstApplicable) {
      return { rate, igst: tax, cgst: 0, sgst: 0, total: tax };
    }
    const half = tax / 2;
    return { rate, igst: 0, cgst: half, sgst: half, total: tax };
  }, [taxableValue, ruleIndex, rules, igstApplicable]);

  const downloadPDF = async () => {
    if (!resultsRef.current) return;
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
    pdf.save('gst-rcm-liability-report.pdf');
  };

  return (
    <>
      <SEOHelmet
        title="GST Reverse Charge (RCM) Calculator | MoneyCal.in"
        description="Calculate GST liability under Reverse Charge Mechanism (RCM) for notified goods and services. Split CGST/SGST or IGST and export PDF."
        keywords="gst rcm Calculator, reverse charge gst, gta rcm, security service rcm, legal services rcm, sponsorship rcm"
        url="/gst-tools/gst-rcm-calculator"
        type="website"
        image="/images/gst-rcm.jpg"
        tags={["gst", "rcm", "reverse charge", "gta", "india"]}
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-neutral-600 hover:text-neutral-900">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Repeat className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">GST RCM Calculator</h1>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Compute GST payable under Reverse Charge for common notified supplies.
              Select supply type and rule, enter taxable value, and get CGST/SGST/IGST split instantly.
            </p>
          </div>

          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supply Type</label>
                <select
                  value={supplyType}
                  onChange={(e) => { setSupplyType(e.target.value as SupplyType); setRuleIndex(0); }}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="services">Services (GTA, Legal, Security, etc.)</option>
                  <option value="goods">Goods (cashew, tobacco leaves, etc.)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notified Category</label>
                <select
                  value={ruleIndex}
                  onChange={(e) => setRuleIndex(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  {rules.map((r, i) => (
                    <option key={i} value={i}>{r.display} – {r.ratePercent}%</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Taxable Value (₹)</label>
                <input
                  type="number"
                  min={0}
                  value={taxableValue}
                  onChange={(e) => setTaxableValue(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter taxable value"
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input id="igst" type="checkbox" className="h-4 w-4" checked={igstApplicable} onChange={(e) => setIgstApplicable(e.target.checked)} />
                <label htmlFor="igst" className="text-sm text-gray-700">Apply IGST (inter-state or import)</label>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                <div className="text-xs text-amber-700">Rate</div>
                <div className="text-2xl font-bold text-amber-800">{result.rate}%</div>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-xs text-blue-700">CGST</div>
                <div className="text-2xl font-bold text-blue-800">₹{result.cgst.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="text-xs text-emerald-700">SGST</div>
                <div className="text-2xl font-bold text-emerald-800">₹{result.sgst.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                <div className="text-xs text-purple-700">IGST</div>
                <div className="text-2xl font-bold text-purple-800">₹{result.igst.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="text-xs text-gray-700">Total RCM Liability</div>
              <div className="text-2xl font-bold text-gray-900">₹{result.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Info className="h-4 w-4 mr-2" /> Notes
              </h4>
              <ul className="list-disc list-inside text-sm text-blue-900 space-y-1">
                <li>Under RCM, recipient pays tax and may claim ITC if eligible.</li>
                <li>Rates/category list is illustrative. Verify with current CBIC notifications.</li>
                <li>If IGST is checked, CGST/SGST become zero and full tax is IGST.</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" /> Related GST Tools
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <RouterLink to="/gst-tools/gst-liability-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Liability Calculator</RouterLink>
                <RouterLink to="/gst-tools/gst-penalty-interest-calculator" className="text-blue-600 hover:text-blue-800 underline">Penalty & Interest</RouterLink>
                <RouterLink to="/gst-tools/gst-hsn-sac-finder" className="text-blue-600 hover:text-blue-800 underline">HSN/SAC Finder</RouterLink>
                <RouterLink to="/gst-tools/gst-composition-eligibility" className="text-blue-600 hover:text-blue-800 underline">Composition Eligibility</RouterLink>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button onClick={downloadPDF} className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </button>
          </div>

          <div className="mt-10 prose prose-amber max-w-none">
            <h2>What is Reverse Charge Mechanism (RCM)?</h2>
            <p>
              Under RCM, the liability to pay GST shifts from the supplier to the recipient for notified goods and services.
              The recipient pays tax in cash and may be eligible to claim ITC subject to conditions.
            </p>
            <h3>Common RCM Scenarios</h3>
            <ul>
              <li>GTA services where recipient pays 5% on freight.</li>
              <li>Legal services by an advocate/firm to a business entity.</li>
              <li>Security services supplied by a non-body corporate to a registered person.</li>
            </ul>
            <p className="text-sm text-gray-600">Disclaimer: This tool provides an estimate. Please refer to the latest GST notifications and consult your tax advisor.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GSTRCMCalculator;


