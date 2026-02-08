import React, { useMemo, useRef, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { ArrowLeft, GitCompare, Info, AlertTriangle, CheckCircle2, Download, Link as LinkIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type Row = {
  invoiceNo: string;
  gstin: string;
  taxableValue: number;
  taxRate: number;
  taxAmount: number;
};

function parseCsv(input: string): Row[] {
  const rows: Row[] = [];
  const lines = input.trim().split(/\r?\n/);
  if (lines.length === 0) return rows;
  const header = lines[0].split(',').map(h => h.trim().toLowerCase());
  const idx = {
    invoiceNo: header.indexOf('invoiceno'),
    gstin: header.indexOf('gstin'),
    taxableValue: header.indexOf('taxablevalue'),
    taxRate: header.indexOf('taxrate'),
    taxAmount: header.indexOf('taxamount')
  };
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(',');
    if (parts.length < header.length) continue;
    rows.push({
      invoiceNo: (parts[idx.invoiceNo] || '').trim(),
      gstin: (parts[idx.gstin] || '').trim(),
      taxableValue: Number((parts[idx.taxableValue] || '0').trim()) || 0,
      taxRate: Number((parts[idx.taxRate] || '0').trim()) || 0,
      taxAmount: Number((parts[idx.taxAmount] || '0').trim()) || 0,
    });
  }
  return rows;
}

const GSTITCReconciliation: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [purchasesCsv, setPurchasesCsv] = useState<string>('invoiceNo,gstin,taxableValue,taxRate,taxAmount\nINV-1,27ABCDE1234F1Z5,10000,18,1800');
  const [gstr2bCsv, setGstr2bCsv] = useState<string>('invoiceNo,gstin,taxableValue,taxRate,taxAmount\nINV-1,27ABCDE1234F1Z5,10000,18,1800');

  const purchases = useMemo(() => parseCsv(purchasesCsv), [purchasesCsv]);
  const twoB = useMemo(() => parseCsv(gstr2bCsv), [gstr2bCsv]);

  const key = (r: Row) => `${r.gstin}__${r.invoiceNo}`.toLowerCase();

  const reconciliation = useMemo(() => {
    const map2B = new Map<string, Row>();
    for (const r of twoB) map2B.set(key(r), r);

    const matches: Array<{ purchase: Row; twoB: Row }> = [];
    const onlyPurchases: Row[] = [];
    const only2B: Row[] = [];

    for (const p of purchases) {
      const m = map2B.get(key(p));
      if (m) {
        matches.push({ purchase: p, twoB: m });
        map2B.delete(key(p));
      } else {
        onlyPurchases.push(p);
      }
    }
    for (const [, r] of map2B) {
      only2B.push(r);
    }

    const matchedITC = matches.reduce((sum, m) => sum + (Number(m.twoB.taxAmount) || 0), 0);
    const purchasesITC = purchases.reduce((sum, r) => sum + (Number(r.taxAmount) || 0), 0);
    const twoBITC = twoB.reduce((sum, r) => sum + (Number(r.taxAmount) || 0), 0);

    return {
      matches,
      onlyPurchases,
      only2B,
      totals: {
        purchasesITC,
        twoBITC,
        matchedITC,
        variance: purchasesITC - twoBITC
      }
    };
  }, [purchases, twoB]);

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
    pdf.save('gst-itc-reconciliation-report.pdf');
  };

  return (
    <>
      <SEOHelmet
        title="GST ITC Reconciliation Tool - Match Purchases with GSTR-2B | MoneyCal.in"
        description="Paste purchases CSV and GSTR-2B CSV to reconcile ITC. See matched invoices, differences, eligible ITC and variance. Download a PDF report."
        keywords="gst itc reconciliation, gstr-2b match, input tax credit tool, gst itc calculator"
        url="/gst-tools/gst-itc-reconciliation"
        type="website"
        image="/images/gst-itc-reco.jpg"
        tags={["gst", "itc", "reconciliation", "gstr-2b", "india"]}
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-neutral-600 hover:text-neutral-900">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <GitCompare className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">GST ITC Reconciliation</h1>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Reconcile your purchase ITC with GSTR-2B data. Paste CSVs below with columns: invoiceNo, gstin, taxableValue, taxRate, taxAmount.
              View matched entries, missing invoices on either side, and get variance and eligible ITC snapshot.
            </p>
          </div>

          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purchases CSV</label>
                <textarea
                  value={purchasesCsv}
                  onChange={(e) => setPurchasesCsv(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GSTR-2B CSV</label>
                <textarea
                  value={gstr2bCsv}
                  onChange={(e) => setGstr2bCsv(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono text-sm"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-xs text-blue-700">Purchases ITC</div>
                <div className="text-2xl font-bold text-blue-800">₹{reconciliation.totals.purchasesITC.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="text-xs text-emerald-700">GSTR-2B ITC</div>
                <div className="text-2xl font-bold text-emerald-800">₹{reconciliation.totals.twoBITC.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                <div className="text-xs text-amber-700">Matched ITC</div>
                <div className="text-2xl font-bold text-amber-800">₹{reconciliation.totals.matchedITC.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="p-4 rounded-lg border" style={{ background: '#fff7ed', borderColor: reconciliation.totals.variance === 0 ? '#86efac' : '#fca5a5' }}>
                <div className="text-xs" style={{ color: reconciliation.totals.variance === 0 ? '#065f46' : '#991b1b' }}>Variance (Purchases - 2B)</div>
                <div className="text-2xl font-bold flex items-center" style={{ color: reconciliation.totals.variance === 0 ? '#065f46' : '#991b1b' }}>
                  {reconciliation.totals.variance === 0 ? <CheckCircle2 className="h-5 w-5 mr-2" /> : <AlertTriangle className="h-5 w-5 mr-2" />}
                  ₹{reconciliation.totals.variance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {reconciliation.matches.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Matched Invoices</h3>
                <div className="overflow-x-auto border rounded-lg">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left">Invoice</th>
                        <th className="px-3 py-2 text-left">GSTIN</th>
                        <th className="px-3 py-2 text-right">2B Tax Amt</th>
                        <th className="px-3 py-2 text-right">Purchase Tax Amt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reconciliation.matches.map((m, i) => (
                        <tr key={i} className="border-t">
                          <td className="px-3 py-2">{m.purchase.invoiceNo}</td>
                          <td className="px-3 py-2">{m.purchase.gstin}</td>
                          <td className="px-3 py-2 text-right">₹{m.twoB.taxAmount.toLocaleString()}</td>
                          <td className="px-3 py-2 text-right">₹{m.purchase.taxAmount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {reconciliation.onlyPurchases.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">In Purchases but Missing in 2B</h3>
                <div className="overflow-x-auto border rounded-lg">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left">Invoice</th>
                        <th className="px-3 py-2 text-left">GSTIN</th>
                        <th className="px-3 py-2 text-right">Tax Amt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reconciliation.onlyPurchases.map((r, i) => (
                        <tr key={i} className="border-t">
                          <td className="px-3 py-2">{r.invoiceNo}</td>
                          <td className="px-3 py-2">{r.gstin}</td>
                          <td className="px-3 py-2 text-right">₹{r.taxAmount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {reconciliation.only2B.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">In 2B but Missing in Purchases</h3>
                <div className="overflow-x-auto border rounded-lg">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left">Invoice</th>
                        <th className="px-3 py-2 text-left">GSTIN</th>
                        <th className="px-3 py-2 text-right">Tax Amt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reconciliation.only2B.map((r, i) => (
                        <tr key={i} className="border-t">
                          <td className="px-3 py-2">{r.invoiceNo}</td>
                          <td className="px-3 py-2">{r.gstin}</td>
                          <td className="px-3 py-2 text-right">₹{r.taxAmount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Info className="h-4 w-4 mr-2" /> How to use this tool
              </h4>
              <ol className="list-decimal list-inside text-sm text-blue-900 space-y-1">
                <li>Export your purchase register (CSV) and GSTR-2B (CSV) for the same period.</li>
                <li>Ensure headers: invoiceNo, gstin, taxableValue, taxRate, taxAmount.</li>
                <li>Paste both CSVs into the inputs and review matches/mismatches.</li>
                <li>Download a PDF summary for internal records and follow-up.</li>
              </ol>
              <p className="text-xs text-blue-700 mt-2">Disclaimer: This is an indicative reconciliation. For filing, cross-verify with official GST portal data and consult your tax advisor.</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" /> Related GST Tools
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <RouterLink to="/gst-tools/gst-liability-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Liability Calculator</RouterLink>
                <RouterLink to="/gst-tools/gstr-3b-preparation" className="text-blue-600 hover:text-blue-800 underline">GSTR-3B Auto Preparation</RouterLink>
                <RouterLink to="/gst-tools/gst-hsn-sac-finder" className="text-blue-600 hover:text-blue-800 underline">HSN/SAC Finder</RouterLink>
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
            <h2>What is ITC Reconciliation?</h2>
            <p>
              Input Tax Credit (ITC) reconciliation compares the tax credit from your purchase register with what is reflected in GSTR-2B.
              Differences could arise due to vendor non-filing, timing, or data entry discrepancies. Regular reconciliation helps accurate reporting and ITC claims.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GSTITCReconciliation;


