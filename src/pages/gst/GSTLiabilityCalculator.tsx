import React, { useMemo, useRef, useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { ArrowLeft, Scale, Download, Link as LinkIcon, Info } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type SupplyType = 'intra' | 'inter';

const GSTLiabilityCalculator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);

  const [salesTaxable, setSalesTaxable] = useState<number>(0);
  const [outputRate, setOutputRate] = useState<number>(18);
  const [supplyType, setSupplyType] = useState<SupplyType>('intra');

  const [itcIGST, setItcIGST] = useState<number>(0);
  const [itcCGST, setItcCGST] = useState<number>(0);
  const [itcSGST, setItcSGST] = useState<number>(0);

  const output = useMemo(() => {
    const taxable = Number(salesTaxable) || 0;
    const rate = Number(outputRate) || 0;
    const outputTax = (taxable * rate) / 100;

    let outputIGST = 0;
    let outputCGST = 0;
    let outputSGST = 0;

    if (supplyType === 'inter') {
      outputIGST = outputTax;
    } else {
      outputCGST = outputTax / 2;
      outputSGST = outputTax / 2;
    }

    // Basic ITC utilization sequence approximation:
    // IGST ITC -> IGST, then CGST, then SGST.
    // CGST ITC -> CGST, then IGST.
    // SGST ITC -> SGST, then IGST.
    let remOutIGST = outputIGST;
    let remOutCGST = outputCGST;
    let remOutSGST = outputSGST;

    let remItcIGST = Number(itcIGST) || 0;
    let remItcCGST = Number(itcCGST) || 0;
    let remItcSGST = Number(itcSGST) || 0;

    const use = (available: number, needed: number) => Math.min(Math.max(0, available), Math.max(0, needed));

    let used = use(remItcIGST, remOutIGST);
    remItcIGST -= used;
    remOutIGST -= used;

    used = use(remItcIGST, remOutCGST);
    remItcIGST -= used;
    remOutCGST -= used;

    used = use(remItcIGST, remOutSGST);
    remItcIGST -= used;
    remOutSGST -= used;

    used = use(remItcCGST, remOutCGST);
    remItcCGST -= used;
    remOutCGST -= used;

    used = use(remItcCGST, remOutIGST);
    remItcCGST -= used;
    remOutIGST -= used;

    used = use(remItcSGST, remOutSGST);
    remItcSGST -= used;
    remOutSGST -= used;

    used = use(remItcSGST, remOutIGST);
    remItcSGST -= used;
    remOutIGST -= used;

    const netPayable = remOutIGST + remOutCGST + remOutSGST;
    const totalITC = (Number(itcIGST) || 0) + (Number(itcCGST) || 0) + (Number(itcSGST) || 0);

    return {
      outputTax,
      totalITC,
      outputIGST,
      outputCGST,
      outputSGST,
      payableIGST: Math.max(0, remOutIGST),
      payableCGST: Math.max(0, remOutCGST),
      payableSGST: Math.max(0, remOutSGST),
      netPayable: Math.max(0, netPayable),
    };
  }, [salesTaxable, outputRate, supplyType, itcIGST, itcCGST, itcSGST]);

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
    pdf.save('gst-liability-calculator-report.pdf');
  };

  return (
    <>
      <SEOHelmet
        title="GST Liability Calculator India 2026 | Output Tax vs ITC | MoneyCal"
        description="GST liability calculator to compute output tax, ITC adjustment (IGST/CGST/SGST), and net payable with intra-state vs inter-state split."
        keywords="gst liability calculator india, gst output tax and itc calculator, igst cgst sgst payable calculator, gstr 3b tax liability calculator, gst net payable calculator for business"
        url="/tools/gst-liability-calculator"
        type="website"
        image="/images/gst-tools.jpg"
        tags={['gst', 'liability', 'itc', 'gstr-3b', 'tax payable']}
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
              <Scale className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">GST Liability Calculator</h1>
            </div>
            <p className="text-gray-600">
              Compare output GST and eligible ITC to estimate net payable before filing.
            </p>
          </div>

          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Taxable Sales Value (INR)</label>
                <input type="number" min={0} value={salesTaxable} onChange={(e) => setSalesTaxable(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Output GST Rate (%)</label>
                <select value={outputRate} onChange={(e) => setOutputRate(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  {[0, 5, 12, 18, 28].map((r) => (
                    <option key={r} value={r}>
                      {r}%
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supply Type</label>
                <select value={supplyType} onChange={(e) => setSupplyType(e.target.value as SupplyType)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  <option value="intra">Intra-state (CGST + SGST)</option>
                  <option value="inter">Inter-state (IGST)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ITC IGST (INR)</label>
                <input type="number" min={0} value={itcIGST} onChange={(e) => setItcIGST(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ITC CGST (INR)</label>
                <input type="number" min={0} value={itcCGST} onChange={(e) => setItcCGST(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ITC SGST (INR)</label>
                <input type="number" min={0} value={itcSGST} onChange={(e) => setItcSGST(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                <div className="text-xs text-amber-700">Output Tax</div>
                <div className="text-2xl font-bold text-amber-800">₹{output.outputTax.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="text-xs text-emerald-700">Total ITC</div>
                <div className="text-2xl font-bold text-emerald-800">₹{output.totalITC.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                <div className="text-xs text-red-700">Net GST Payable</div>
                <div className="text-2xl font-bold text-red-800">₹{output.netPayable.toLocaleString()}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-xs text-blue-700">Payable IGST</div>
                <div className="text-xl font-bold text-blue-900">₹{output.payableIGST.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100">
                <div className="text-xs text-indigo-700">Payable CGST</div>
                <div className="text-xl font-bold text-indigo-900">₹{output.payableCGST.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                <div className="text-xs text-purple-700">Payable SGST</div>
                <div className="text-xl font-bold text-purple-900">₹{output.payableSGST.toLocaleString()}</div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Info className="h-4 w-4 mr-2" /> How to use this GST liability tool
              </h4>
              <ol className="list-decimal list-inside text-sm text-blue-900 space-y-1">
                <li>Enter taxable sales for the period and choose GST rate.</li>
                <li>Select intra-state or inter-state supply type.</li>
                <li>Enter eligible ITC under IGST, CGST, and SGST.</li>
                <li>Review net payable and tax-head split before return preparation.</li>
              </ol>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" />
                Related GST Tools
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <RouterLink to="/tools/gst-rate-impact-analyzer" className="text-blue-600 hover:text-blue-800 underline">GST Rate Impact Analyzer</RouterLink>
                <RouterLink to="/tools/gst-turnover-tracker" className="text-blue-600 hover:text-blue-800 underline">GST Annual Turnover Tracker</RouterLink>
                <RouterLink to="/tools/gst-eway-distance-calculator" className="text-blue-600 hover:text-blue-800 underline">GST E-Way Bill Distance Calculator</RouterLink>
                <RouterLink to="/tools/gst-einvoice-qr-validator" className="text-blue-600 hover:text-blue-800 underline">GST E-Invoice QR Validator</RouterLink>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button onClick={downloadPDF} className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </button>
          </div>

          <section className="mt-10 bg-white rounded-xl border border-gray-200 shadow-sm p-6 prose prose-amber max-w-none">
            <h2>GST Liability Calculator India: Practical Guide for Businesses</h2>
            <p>
              A GST liability calculator is useful when you want a clear estimate of how much tax
              you may need to pay after adjusting eligible input tax credit. Many businesses only
              track output tax and miss ITC impact, which causes confusion during filing. This tool
              helps you view output GST, ITC, and net payable in one place so your return planning
              is more accurate.
            </p>
            <p>
              In real business operations, liability planning is not only about one percentage rate.
              It also depends on supply type (intra-state or inter-state), availability of ITC, and
              month-end reconciliation quality. If these are not aligned, finance teams may either
              overpay temporarily or face mismatch stress during compliance checks. A structured
              pre-filing estimate reduces these operational surprises.
            </p>
            <h3>What this calculator solves</h3>
            <p>
              This page is designed for search intent like <strong>GST liability calculator India</strong>,
              <strong> output tax minus ITC calculator</strong>, and <strong>GSTR-3B liability estimator</strong>.
              It supports both intra-state and inter-state logic. For intra-state, output tax is
              shown as CGST and SGST split; for inter-state, IGST output is shown. ITC entries are
              then applied to estimate payable tax heads and final net tax.
            </p>
            <h3>Best-use workflow before return filing</h3>
            <p>
              First, collect period-wise taxable sales value from your accounting system. Second,
              map your dominant output rate for the specific calculation scenario. Third, take
              eligible ITC values after invoice-level checks and blocked-credit review. Fourth, run
              this calculator and compare with your books before filing. This workflow is simple,
              repeatable, and improves month-end control.
            </p>
            <p>
              If your business has multiple GST rates and product categories, run separate
              calculations per segment and then combine totals. That approach gives better clarity
              than force-fitting everything into one blended percentage. It also helps management
              understand which business line is creating higher tax outflow.
            </p>
            <h3>Compliance note</h3>
            <p>
              This tool is for planning and decision support. Final tax liability depends on
              statutory rules, return tables, and portal validations. Always reconcile with
              accounting records and official return forms. For broader GST operations, use related
              tools for turnover monitoring, rate impact analysis, e-way planning, and invoice data
              checks.
            </p>
            <h3>Why businesses still overpay despite having ITC</h3>
            <p>
              A frequent operational issue in growing businesses is that ITC exists in purchase data
              but does not get translated into confident month-end liability planning. The reason is
              usually process fragmentation. Sales data is with one team, purchase validation with
              another, and return filing with a third. By the time final numbers are reconciled,
              teams either rush toward conservative overpayment or delay decision until filing
              pressure increases. A structured calculator view helps unify these moving parts early.
            </p>
            <p>
              Another issue is that many teams track only total GST without tax-head clarity. In
              practice, IGST, CGST, and SGST buckets matter for utilization and visibility. Even
              when your final net payable appears manageable, tax-head imbalance can create confusion
              if you are not reviewing the split. This tool intentionally shows payable split after
              ITC application so finance leads can communicate clearly to management.
            </p>
            <h3>How to build a monthly GST liability control routine</h3>
            <p>
              Step 1: Freeze sales register for the period and identify taxable value by dominant
              slabs. Step 2: Classify supplies as intra-state and inter-state to understand head
              impact. Step 3: Capture purchase register and mark eligible vs blocked credits. Step
              4: Reconcile internal books with return-supporting reports. Step 5: Run this tool as a
              planning snapshot and compare it against your return draft. Step 6: Document reasons
              for variance and track them monthly. Over 3 to 6 cycles, this creates a predictable
              compliance rhythm and reduces surprises.
            </p>
            <p>
              If your business has multiple registrations or states, replicate this process per GSTIN
              instead of combining everything into one number. Entity-wise discipline is important
              for both compliance and management reporting. It also helps you identify where process
              leakage is happening, such as delayed vendor invoices, incorrect tax rates, or
              recurring credit mismatches in specific branches.
            </p>
            <h3>Using this page for pricing and cash-flow planning</h3>
            <p>
              GST liability is not only a compliance figure; it is also a cash-flow variable. If your
              expected payable rises due to rate mix or seasonal sales, treasury planning must adapt
              in advance. If ITC utilization improves through better vendor discipline, the same
              turnover can result in better working-capital comfort. This tool helps business owners
              and controllers test such scenarios quickly before final payment date.
            </p>
            <p>
              A practical use case is festival-season planning. Sales spikes can increase output tax,
              while input-side credits may lag due to billing timelines. By running conservative and
              optimistic scenarios in this calculator, teams can forecast payable range and reserve
              funds accordingly. This prevents last-minute cash stress and improves vendor payment
              discipline.
            </p>
            <h3>Common mistakes this calculator helps prevent</h3>
            <p>
              First, assuming all purchase-side tax is immediately eligible ITC. Second, ignoring
              supply type while estimating tax-head effect. Third, relying only on accounting ERP
              total and skipping independent month-end check. Fourth, accepting unexplained large
              variance between planning and filing numbers without root-cause review. Fifth, treating
              liability estimation as a once-per-quarter task instead of monthly governance.
            </p>
            <p>
              Avoiding these mistakes improves decision quality, reduces stress in filing windows,
              and creates stronger audit readiness. It also improves leadership confidence because
              finance communication becomes evidence-based and consistent month after month.
            </p>
            <h3>Long-tail intent coverage for search users</h3>
            <p>
              This page is intentionally designed for users searching with detailed phrases like
              <strong> GST liability calculator with ITC adjustment India</strong>, <strong>IGST CGST
              SGST payable calculator</strong>, <strong>output tax minus input credit tool</strong>,
              <strong> GSTR-3B liability estimate before filing</strong>, and <strong>monthly GST
              payable calculator for small business</strong>. These are high-intent queries where
              users need practical, not generic, guidance.
            </p>
            <p>
              If your goal is better compliance performance and lower filing stress, combine this
              page with the linked tools on this site for rate impact analysis, turnover threshold
              checks, e-way validity planning, and e-invoice payload quality checks. Together, these
              tools create a stronger operational GST stack than standalone one-off calculators.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default GSTLiabilityCalculator;

