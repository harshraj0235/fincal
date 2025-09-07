import React, { useMemo, useState, useRef } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { findGoldTool, GoldToolConfig } from '../../data/goldTools';
import { ArrowLeft, Download, Link as LinkIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BarChart } from '../../components/BarChart';
import { ResultChart } from '../../components/ResultChart';

const PurityTool: React.FC = () => {
  const [karat, setKarat] = useState<number>(22);
  const purity = useMemo(() => (karat / 24) * 100, [karat]);
  const fineness = useMemo(() => Math.round((purity / 100) * 1000), [purity]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Karat (K)</label>
        <input type="number" min={1} max={24} value={karat} onChange={(e) => setKarat(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="p-4 rounded bg-amber-50 border">Purity: {purity.toFixed(2)}%</div>
      <div className="p-4 rounded bg-yellow-50 border">Fineness: {fineness}</div>
    </div>
  );
};

const ValueEstimator: React.FC = () => {
  const [weight, setWeight] = useState<number>(10);
  const [purityPct, setPurityPct] = useState<number>(91.6);
  const [pricePerGram, setPricePerGram] = useState<number>(6500);
  const pureGrams = useMemo(() => (weight * purityPct) / 100, [weight, purityPct]);
  const value = useMemo(() => pureGrams * pricePerGram, [pureGrams, pricePerGram]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Weight (g)</label>
        <input type="number" min={0} value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Purity (%)</label>
        <input type="number" min={0} max={100} step={0.1} value={purityPct} onChange={(e) => setPurityPct(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Price/Gram (₹)</label>
        <input type="number" min={0} value={pricePerGram} onChange={(e) => setPricePerGram(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="p-4 rounded bg-emerald-50 border">Estimated Value: ₹{value.toFixed(2)}</div>
    </div>
  );
};

const WeightConverter: React.FC = () => {
  const [grams, setGrams] = useState<number>(10);
  const tola = useMemo(() => grams / 11.6638, [grams]);
  const ounce = useMemo(() => grams / 31.1035, [grams]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Weight (grams)</label>
        <input type="number" min={0} value={grams} onChange={(e) => setGrams(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="p-4 rounded bg-yellow-50 border">Tola: {tola.toFixed(4)}</div>
      <div className="p-4 rounded bg-amber-50 border">Troy Ounce: {ounce.toFixed(4)}</div>
    </div>
  );
};

const SIPTool: React.FC = () => {
  const [monthly, setMonthly] = useState<number>(5000);
  const [years, setYears] = useState<number>(5);
  const [rate, setRate] = useState<number>(10);
  const periods = years * 12;
  const i = rate / 100 / 12;
  const fv = useMemo(() => monthly * ((Math.pow(1 + i, periods) - 1) / i) * (1 + i), [monthly, i, periods]);
  const invested = useMemo(() => monthly * periods, [monthly, periods]);
  const gain = useMemo(() => Math.max(0, fv - invested), [fv, invested]);
  const chartData = [
    { name: 'Invested', value: invested, color: '#fb923c' },
    { name: 'Gains', value: gain, color: '#22c55e' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Invest (₹)</label>
          <input type="number" min={0} value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years</label>
          <input type="number" min={1} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Return (% p.a.)</label>
          <input type="number" min={0} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="p-4 rounded bg-emerald-50 border col-span-2">Future Value: ₹{fv.toFixed(2)}</div>
      </div>
      <div className="h-64">
        <ResultChart data={chartData} centerText={`FV\n₹${Math.round(fv).toLocaleString()}`} />
      </div>
    </div>
  );
};

const LumpsumTool: React.FC = () => {
  const [amount, setAmount] = useState<number>(100000);
  const [years, setYears] = useState<number>(5);
  const [rate, setRate] = useState<number>(10);
  const fv = useMemo(() => amount * Math.pow(1 + rate / 100, years), [amount, years, rate]);
  const chartData = [
    { name: 'Principal', value: amount, color: '#60a5fa' },
    { name: 'Growth', value: Math.max(0, fv - amount), color: '#22c55e' }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Invest (₹)</label>
          <input type="number" min={0} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years</label>
          <input type="number" min={1} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Return (% p.a.)</label>
          <input type="number" min={0} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
      </div>
      <div className="h-64">
        <ResultChart data={chartData} centerText={`FV\n₹${Math.round(fv).toLocaleString()}`} />
      </div>
    </div>
  );
};

const ETFComparison: React.FC = () => {
  const [etfExpense, setEtfExpense] = useState<number>(0.6);
  const [physicalMaking, setPhysicalMaking] = useState<number>(7.5);
  const [physicalWastage, setPhysicalWastage] = useState<number>(2);
  const [storageYearly, setStorageYearly] = useState<number>(0.5);
  const [years, setYears] = useState<number>(5);
  const principal = 100000;
  const etfCost = useMemo(() => principal * (etfExpense / 100) * years, [etfExpense, years]);
  const physicalCost = useMemo(() => principal * ((physicalMaking + physicalWastage) / 100) + principal * (storageYearly / 100) * years, [physicalMaking, physicalWastage, storageYearly, years]);
  const data = [
    { label: 'ETF Cost', value: Math.round(etfCost) },
    { label: 'Physical Cost', value: Math.round(physicalCost) },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="md:col-span-2 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">ETF Expense Ratio (% p.a.)</label>
          <input type="number" min={0} step={0.01} value={etfExpense} onChange={(e) => setEtfExpense(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years</label>
          <input type="number" min={1} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Making Charges (%)</label>
          <input type="number" min={0} step={0.1} value={physicalMaking} onChange={(e) => setPhysicalMaking(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Wastage (%)</label>
          <input type="number" min={0} step={0.1} value={physicalWastage} onChange={(e) => setPhysicalWastage(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Storage (% p.a.)</label>
          <input type="number" min={0} step={0.1} value={storageYearly} onChange={(e) => setStorageYearly(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
      </div>
      <div className="md:col-span-3 h-72">
        <BarChart data={data.map(d => ({ name: d.label, value: d.value }))} xKey="name" yKey="value" color={(d: any) => d.name === 'ETF Cost' ? '#60a5fa' : '#fb923c'} xLabel="Type" yLabel="Total Cost (₹)" />
      </div>
    </div>
  );
};

const SGBInterestTool: React.FC = () => {
  const [units, setUnits] = useState<number>(10);
  const [faceValue, setFaceValue] = useState<number>(6000);
  const [rate, setRate] = useState<number>(2.5); // % p.a.
  const [years, setYears] = useState<number>(8);
  const annual = useMemo(() => units * faceValue * (rate / 100), [units, faceValue, rate]);
  const series = useMemo(() => Array.from({ length: years }, (_, i) => ({ year: `Y${i + 1}`, interest: annual })), [years, annual]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="md:col-span-2 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Units</label>
          <input type="number" min={0} value={units} onChange={(e) => setUnits(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Face Value (₹)</label>
          <input type="number" min={0} value={faceValue} onChange={(e) => setFaceValue(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interest Rate (% p.a.)</label>
          <input type="number" min={0} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years</label>
          <input type="number" min={1} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="p-4 rounded bg-emerald-50 border col-span-2">Annual Interest: ₹{annual.toFixed(2)}</div>
      </div>
      <div className="md:col-span-3 h-72">
        <BarChart data={series.map(s => ({ name: s.year, value: s.interest }))} xKey="name" yKey="value" color="#22c55e" xLabel="Year" yLabel="Interest (₹)" />
      </div>
    </div>
  );
};

const LoanEMITool: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(200000);
  const [rate, setRate] = useState<number>(12);
  const [months, setMonths] = useState<number>(24);
  const i = rate / 100 / 12;
  const emi = useMemo(() => {
    if (i === 0) return principal / months;
    return principal * i * Math.pow(1 + i, months) / (Math.pow(1 + i, months) - 1);
  }, [principal, i, months]);
  const total = useMemo(() => emi * months, [emi, months]);
  const interest = useMemo(() => total - principal, [total, principal]);
  const chartData = [
    { name: 'Principal', value: principal, color: '#60a5fa' },
    { name: 'Interest', value: interest, color: '#f97316' }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Loan Amount (₹)</label>
          <input type="number" min={0} value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rate (% p.a.)</label>
          <input type="number" min={0} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tenure (months)</label>
          <input type="number" min={1} value={months} onChange={(e) => setMonths(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="p-4 rounded bg-blue-50 border col-span-3">EMI: ₹{emi.toFixed(2)} | Total Interest: ₹{interest.toFixed(2)}</div>
      </div>
      <div className="h-64">
        <ResultChart data={chartData} centerText={`EMI\n₹${Math.round(emi).toLocaleString()}`} />
      </div>
    </div>
  );
};

const GoldToolPage: React.FC = () => {
  const { toolSlug } = useParams();
  const tool = toolSlug ? findGoldTool(toolSlug) : undefined;
  const resultsRef = useRef<HTMLDivElement>(null);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold">Tool not found</div>
          <RouterLink to="/gold-tools" className="text-amber-700 underline">Back to Gold Tools</RouterLink>
        </div>
      </div>
    );
  }

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
    pdf.save(`${tool.slug}.pdf`);
  };

  return (
    <>
      <SEOHelmet
        title={`${tool.seo?.title || tool.name} | Gold Tools | MoneyCal.in`}
        description={tool.seo?.description || tool.description}
        keywords={(tool.seo?.keywords || [tool.slug, 'gold tools', 'india']).join(', ')}
        url={`/gold-tools/${tool.slug}`}
        type="website"
        image="/android-chrome-512x512.png"
        tags={[tool.slug, 'gold']}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Gold Tools', url: '/gold-tools' },
          { name: tool.name, url: `/gold-tools/${tool.slug}` },
        ]}
      />
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <RouterLink to={`/gold-tools`} className="flex items-center text-neutral-600 hover:text-neutral-900">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Gold Tools
            </RouterLink>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{tool.name}</h1>
            <p className="text-gray-600">{tool.description}</p>
          </div>

          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            {(tool.type === 'purity' || tool.type === 'karatToPurity') && <PurityTool />}
            {(tool.type === 'value' || tool.type === 'jewelleryEstimator' || tool.type === 'scrapValue' || tool.type === 'pricePerGram') && <ValueEstimator />}
            {(tool.type === 'weightConvert' || tool.type === 'gramToTola' || tool.type === 'gramToOunce') && <WeightConverter />}
            {(tool.type === 'sip' || tool.type === 'goldETFSIP') && <SIPTool />}
            {(tool.type === 'lumpsum' || tool.type === 'returns') && <LumpsumTool />}
            {tool.type === 'etfVsPhysical' && <ETFComparison />}
            {(tool.type === 'sovereignBond' || tool.type === 'sovereignRedemption') && <SGBInterestTool />}
            {tool.type === 'loanEmi' && <LoanEMITool />}

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-amber-900 mb-2 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" /> Related Links
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <RouterLink to="/gold-tools" className="text-amber-700 hover:text-amber-800 underline">All Gold Tools</RouterLink>
                <RouterLink to="/finance-tools/asset-allocation-tool" className="text-amber-700 hover:text-amber-800 underline">Asset Allocation Tool</RouterLink>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button onClick={downloadPDF} className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </button>
          </div>
          {/* Long-form SEO content */}
          <div className="mt-10 prose prose-amber max-w-none">
            <h2>About this {tool.name}</h2>
            <p>
              Use this advanced {tool.name.toLowerCase()} to plan your gold purchases and investments with confidence. It combines clear inputs, instant results, and visual charts so you can understand costs, returns, and trade-offs in seconds. Whether you are comparing ETF expense ratios to physical gold making charges, estimating Sovereign Gold Bond interest, or planning a long-term SIP, this tool gives you the clarity you need to decide quickly and smartly.
            </p>
            <h3>How to use</h3>
            <ol>
              <li>Fill the input fields with your numbers like weight, purity, price per gram, or investment horizon.</li>
              <li>Review the smart breakdown and charts for contribution versus gains, cost comparison, or annual interest streams.</li>
              <li>Export a branded PDF summary to share with your family, jeweller, or financial advisor.</li>
            </ol>
            <h3>When to use this calculator</h3>
            <p>
              This tool is perfect when you are: (a) buying jewellery and want to estimate the invoice including making charges and GST; (b) converting between grams, tola and troy ounces for pricing; (c) choosing between Gold ETF and physical gold; (d) planning a gold SIP or a lumpsum investment; or (e) evaluating SGB interest over 8 years. Long-tail use cases include “how to calculate gold purity from karat in India,” “best way to compare gold etf vs physical making charges,” and “Sovereign Gold Bond interest calculation example”.
            </p>
            <h3>Pro tips to save more</h3>
            <ul>
              <li>Compare making charges and wastage across stores; even a 2% difference can be meaningful on high-ticket jewellery.</li>
              <li>For long horizons, consider SGBs for interest plus potential price appreciation and tax benefits on redemption.</li>
              <li>Use ETFs for transparent pricing and lower spreads if you do not need physical delivery.</li>
            </ul>
            <h3>Frequently asked questions</h3>
            <p><strong>Is this {tool.name.toLowerCase()} free?</strong> Yes, it is completely free, mobile-friendly, and requires no login.</p>
            <p><strong>Can I download results?</strong> Click “Download PDF” to save or share your calculation.</p>
            <p><strong>Is GST included?</strong> The making charges + GST estimator includes the standard GST for jewellery invoices.</p>
            <h3>Related tools and guides</h3>
            <ul>
              <li><RouterLink to="/gold-tools" className="text-amber-700 underline">Gold Tools Hub</RouterLink> – discover all gold calculators in one place</li>
              <li><RouterLink to="/finance-tools/asset-allocation-tool" className="text-amber-700 underline">Asset Allocation Tool</RouterLink> – balance gold with equity and debt</li>
              <li><RouterLink to="/tax-tools" className="text-amber-700 underline">Tax Tools</RouterLink> – plan capital gains and redemption tax</li>
            </ul>
            <h3>Disclaimer</h3>
            <p>
              Values are estimates and for educational purposes. For purchase decisions or tax advice, consult a qualified professional.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoldToolPage;


