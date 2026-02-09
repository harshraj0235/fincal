import React, { useMemo, useRef, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { ArrowLeft, ShieldCheck, Info, Download, Link as LinkIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type BusinessType = 'trader_or_manufacturer' | 'restaurant' | 'service_provider';
type StateCategory = 'normal' | 'special_category';

interface EligibilityResult {
  isEligible: boolean;
  thresholdLimitInLakhs: number; // display-friendly value
  applicableRatePercent: number;
  notes: string[];
}

const GSTCompositionEligibility: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);

  const [annualTurnoverInLakhs, setAnnualTurnoverInLakhs] = useState<number>(25);
  const [businessType, setBusinessType] = useState<BusinessType>('trader_or_manufacturer');
  const [stateCategory, setStateCategory] = useState<StateCategory>('normal');
  const [suppliesNature, setSuppliesNature] = useState<'intra_state_only' | 'inter_state_present'>('intra_state_only');
  const [suppliesIncludesEcommerce, setSuppliesIncludesEcommerce] = useState<boolean>(false);
  const [suppliesOfExemptGoods, setSuppliesOfExemptGoods] = useState<boolean>(false);

  const result: EligibilityResult = useMemo(() => {
    // Thresholds (simplified, commonly used across most states)
    const thresholdMap: Record<BusinessType, { normal: number; special_category: number; rate: number }> = {
      trader_or_manufacturer: { normal: 150, special_category: 75, rate: 1 }, // 1% (0.5% + 0.5%)
      restaurant: { normal: 150, special_category: 75, rate: 5 }, // 5%
      service_provider: { normal: 50, special_category: 50, rate: 6 } // 6% (3% + 3%)
    };

    const thresholds = thresholdMap[businessType];
    const limit = stateCategory === 'normal' ? thresholds.normal : thresholds.special_category;

    const disqualifyingReasons: string[] = [];
    if (suppliesNature === 'inter_state_present') {
      disqualifyingReasons.push('Inter-state outward supplies not permitted under composition scheme.');
    }
    if (suppliesIncludesEcommerce) {
      disqualifyingReasons.push('Supplies through e-commerce operators are not eligible for composition scheme.');
    }
    if (suppliesOfExemptGoods) {
      disqualifyingReasons.push('Supplies of non-taxable/exempt goods disqualify composition eligibility.');
    }

    const exceedsTurnover = annualTurnoverInLakhs > limit;
    if (exceedsTurnover) {
      disqualifyingReasons.push(`Turnover exceeds threshold limit of ₹${limit} lakh for selected category.`);
    }

    return {
      isEligible: disqualifyingReasons.length === 0,
      thresholdLimitInLakhs: limit,
      applicableRatePercent: thresholds.rate,
      notes: disqualifyingReasons
    };
  }, [annualTurnoverInLakhs, businessType, stateCategory, suppliesNature, suppliesIncludesEcommerce, suppliesOfExemptGoods]);

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
    pdf.save('gst-composition-eligibility-report.pdf');
  };

  return (
    <>
      <SEOHelmet
        title="GST Composition Scheme Eligibility Checker | MoneyCal.in"
        description="Check eligibility for GST Composition Scheme instantly. Learn thresholds, applicable tax rates (1%, 5%, 6%), and conditions. Download a PDF report."
        keywords="gst composition eligibility, composition scheme calculator, gst composition limit, gst service provider 6%, restaurant 5% composition, trader manufacturer 1%"
        url="/gst-tools/gst-composition-eligibility"
        type="website"
        image="/images/gst-composition.jpg"
        tags={["gst", "composition", "eligibility", "threshold", "india"]}
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
              <ShieldCheck className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">GST Composition Eligibility Checker</h1>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Instantly check if your business is eligible for the GST Composition Scheme based on turnover, business type, and supply conditions.
              Get applicable tax rates and compliance notes. Export a PDF report for your records.
            </p>
          </div>

          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Turnover (₹ lakh)</label>
                <input
                  type="number"
                  min={0}
                  value={annualTurnoverInLakhs}
                  onChange={(e) => setAnnualTurnoverInLakhs(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Example: 25"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="trader_or_manufacturer">Trader / Manufacturer</option>
                  <option value="restaurant">Restaurant (not serving alcohol)</option>
                  <option value="service_provider">Service Provider</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State Category</label>
                <select
                  value={stateCategory}
                  onChange={(e) => setStateCategory(e.target.value as StateCategory)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="normal">Normal States (limit up to ₹150 lakh)</option>
                  <option value="special_category">Special Category States (limit up to ₹75 lakh)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nature of Outward Supplies</label>
                <select
                  value={suppliesNature}
                  onChange={(e) => setSuppliesNature(e.target.value as 'intra_state_only' | 'inter_state_present')}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="intra_state_only">Intra-state supplies only</option>
                  <option value="inter_state_present">Includes inter-state supplies</option>
                </select>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-700 bg-amber-50 p-3 rounded-lg border border-amber-100">
                  <input type="checkbox" className="h-4 w-4" checked={suppliesIncludesEcommerce} onChange={(e) => setSuppliesIncludesEcommerce(e.target.checked)} />
                  Sell via e-commerce operators
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 bg-amber-50 p-3 rounded-lg border border-amber-100">
                  <input type="checkbox" className="h-4 w-4" checked={suppliesOfExemptGoods} onChange={(e) => setSuppliesOfExemptGoods(e.target.checked)} />
                  Supply exempt/non-taxable goods
                </label>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="text-xs text-emerald-700">Eligibility</div>
                <div className={`text-2xl font-bold ${result.isEligible ? 'text-emerald-800' : 'text-red-700'}`}>{result.isEligible ? 'Eligible' : 'Not Eligible'}</div>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-xs text-blue-700">Threshold Limit</div>
                <div className="text-2xl font-bold text-blue-800">₹{result.thresholdLimitInLakhs.toLocaleString()} Lakh</div>
              </div>
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                <div className="text-xs text-amber-700">Applicable Rate</div>
                <div className="text-2xl font-bold text-amber-800">{result.applicableRatePercent}%</div>
              </div>
            </div>

            {!result.isEligible && result.notes.length > 0 && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-2" /> Why not eligible?
                </h4>
                <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
                  {result.notes.map((n, i) => (<li key={i}>{n}</li>))}
                </ul>
              </div>
            )}

            {result.isEligible && (
              <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-900 mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-2" /> Next steps if you opt for composition
                </h4>
                <ul className="list-disc list-inside text-sm text-emerald-800 space-y-1">
                  <li>Pay tax at a fixed rate on turnover (as above). No ITC allowed.</li>
                  <li>Issue bill of supply (not tax invoice). Mention “composition taxable person”.</li>
                  <li>File CMP-08 quarterly and GSTR-4 annually; display signboard at place of business.</li>
                </ul>
              </div>
            )}

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">How to use this tool</h4>
              <ol className="list-decimal list-inside text-sm text-blue-900 space-y-1">
                <li>Enter your annual turnover in ₹ lakh (FY basis).</li>
                <li>Select your business type to apply the right rate and threshold.</li>
                <li>Choose your state category and nature of outward supplies.</li>
                <li>Tick if you sell via e-commerce operators or supply exempt items.</li>
                <li>View instant eligibility and download a PDF for records.</li>
              </ol>
              <p className="text-xs text-blue-700 mt-2">Disclaimer: Thresholds/rates are simplified. Please confirm with the latest CBIC/State notifications or your tax advisor.</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" /> Related GST Tools
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <RouterLink to="/gst-tools/gst-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Calculator</RouterLink>
                <RouterLink to="/gst-tools/gst-liability-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Liability Calculator</RouterLink>
                <RouterLink to="/gst-tools/gst-penalty-interest-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Penalty & Interest</RouterLink>
                <RouterLink to="/gst-tools/gst-hsn-sac-finder" className="text-blue-600 hover:text-blue-800 underline">HSN/SAC Code Finder</RouterLink>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button onClick={downloadPDF} className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </button>
          </div>

          <div className="mt-10 prose prose-amber max-w-none">
            <h2>What is the GST Composition Scheme?</h2>
            <p>
              The GST Composition Scheme is a simplified tax regime for small businesses with limited turnover.
              Eligible taxpayers pay tax at a fixed rate on turnover and face fewer compliance requirements.
              However, they cannot collect tax from customers or claim input tax credit (ITC).
            </p>
            <h3>Who can opt in?</h3>
            <ul>
              <li>Traders/manufacturers up to ₹1.5 crore (₹75 lakh in special category states).</li>
              <li>Restaurants (not serving alcohol) up to ₹1.5 crore.</li>
              <li>Service providers up to ₹50 lakh under the composition-like scheme (6%).</li>
            </ul>
            <h3>Who cannot opt in?</h3>
            <ul>
              <li>Businesses making inter-state outward supplies.</li>
              <li>Suppliers through e-commerce operators.</li>
              <li>Suppliers of non-taxable/exempt goods.</li>
            </ul>
            <p className="text-sm text-gray-600">Note: This is a general guide. Always verify the latest notifications.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GSTCompositionEligibility;


