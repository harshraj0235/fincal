import React, { useMemo, useRef, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { ArrowLeft, Zap, TrendingUp, DollarSign, BarChart3, Download, IndianRupee, Link } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type ScenarioInputs = {
  baseRevenue: number; // ₹ Cr
  baseEBITMargin: number; // %
  revenueGrowthLow: number; // %
  revenueGrowthBase: number; // %
  revenueGrowthHigh: number; // %
  ebitMarginLow: number; // %
  ebitMarginBase: number; // %
  ebitMarginHigh: number; // %
  taxRate: number; // %
  capexPercentSales: number; // % of sales
  workingCapitalPercentSales: number; // % of sales
  years: number;
  discountRate: number; // %
};

type ScenarioResult = {
  label: 'Optimistic' | 'Base' | 'Pessimistic';
  revenue: number[];
  ebit: number[];
  nopat: number[];
  freeCashFlow: number[];
  npv: number;
};

const toCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value * 1_00_00_000); // Cr to ₹
};

const ScenarioAnalysisSimulator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);

  const [inputs, setInputs] = useState<ScenarioInputs>({
    baseRevenue: 500, // ₹ Cr
    baseEBITMargin: 15,
    revenueGrowthLow: 5,
    revenueGrowthBase: 10,
    revenueGrowthHigh: 15,
    ebitMarginLow: 12,
    ebitMarginBase: 15,
    ebitMarginHigh: 18,
    taxRate: 25,
    capexPercentSales: 4,
    workingCapitalPercentSales: 10,
    years: 5,
    discountRate: 12
  });

  const handle = (field: keyof ScenarioInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const computeScenario = (label: ScenarioResult['label'], growthPct: number, marginPct: number): ScenarioResult => {
    const years = Math.max(1, Math.min(15, Math.round(inputs.years)));
    const tax = inputs.taxRate / 100;
    const capexPct = inputs.capexPercentSales / 100;
    const wcPct = inputs.workingCapitalPercentSales / 100;
    const discount = inputs.discountRate / 100;

    const revenue: number[] = [];
    const ebit: number[] = [];
    const nopat: number[] = [];
    const fcf: number[] = [];

    let sales = inputs.baseRevenue; // Cr
    let lastWC = sales * wcPct;

    for (let t = 1; t <= years; t += 1) {
      sales = sales * (1 + growthPct / 100);
      const ebitT = sales * (marginPct / 100);
      const nopatT = ebitT * (1 - tax);
      const capex = sales * capexPct;
      const wc = sales * wcPct;
      const deltaWC = wc - lastWC;
      const fcfT = nopatT - capex - deltaWC;

      revenue.push(sales);
      ebit.push(ebitT);
      nopat.push(nopatT);
      fcf.push(fcfT);
      lastWC = wc;
    }

    const npv = fcf.reduce((acc, cash, idx) => acc + cash / Math.pow(1 + discount, idx + 1), 0);

    return { label, revenue, ebit, nopat, freeCashFlow: fcf, npv };
  };

  const results = useMemo(() => {
    return [
      computeScenario('Pessimistic', inputs.revenueGrowthLow, inputs.ebitMarginLow),
      computeScenario('Base', inputs.revenueGrowthBase, inputs.ebitMarginBase),
      computeScenario('Optimistic', inputs.revenueGrowthHigh, inputs.ebitMarginHigh)
    ];
  }, [inputs]);

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
    pdf.save('scenario-analysis-simulator.pdf');
  };

  return (
    <>
      <SEOHelmet
        title="Corporate Scenario Analysis Simulator - Multi-Scenario FCF & NPV | MoneyCal.in"
        description="Simulate optimistic, base, and pessimistic scenarios for revenue growth and margins. Compute multi-year FCF and NPV to guide corporate decisions."
        keywords="scenario analysis simulator, corporate finance scenario tool, FCF NPV simulator"
        url="/corporate-finance/scenario-analysis-simulator"
        type="website"
        image="/images/scenario-analysis-simulator.jpg"
        tags={["scenario analysis", "NPV", "free cash flow", "corporate finance"]}
      />

      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <button onClick={() => navigate(-1)} className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </button>
          </div>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Zap className="h-16 w-16 text-amber-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Scenario Analysis Simulator</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Model optimistic, base, and pessimistic business scenarios. Evaluate revenue growth, margins, cash flows, and NPV to support strategic planning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <IndianRupee className="h-6 w-6 text-amber-600 mr-2" />
                Inputs
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Base Revenue (₹ Cr)</label>
                    <input type="number" value={inputs.baseRevenue} onChange={(e) => handle('baseRevenue', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Base EBIT Margin (%)</label>
                    <input type="number" step="0.1" value={inputs.baseEBITMargin} onChange={(e) => handle('baseEBITMargin', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rev Growth Low (%)</label>
                    <input type="number" step="0.1" value={inputs.revenueGrowthLow} onChange={(e) => handle('revenueGrowthLow', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rev Growth Base (%)</label>
                    <input type="number" step="0.1" value={inputs.revenueGrowthBase} onChange={(e) => handle('revenueGrowthBase', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rev Growth High (%)</label>
                    <input type="number" step="0.1" value={inputs.revenueGrowthHigh} onChange={(e) => handle('revenueGrowthHigh', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">EBIT Margin Low (%)</label>
                    <input type="number" step="0.1" value={inputs.ebitMarginLow} onChange={(e) => handle('ebitMarginLow', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">EBIT Margin Base (%)</label>
                    <input type="number" step="0.1" value={inputs.ebitMarginBase} onChange={(e) => handle('ebitMarginBase', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">EBIT Margin High (%)</label>
                    <input type="number" step="0.1" value={inputs.ebitMarginHigh} onChange={(e) => handle('ebitMarginHigh', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                    <input type="number" step="0.1" value={inputs.taxRate} onChange={(e) => handle('taxRate', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Capex (% of Sales)</label>
                    <input type="number" step="0.1" value={inputs.capexPercentSales} onChange={(e) => handle('capexPercentSales', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Working Capital (% of Sales)</label>
                    <input type="number" step="0.1" value={inputs.workingCapitalPercentSales} onChange={(e) => handle('workingCapitalPercentSales', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years</label>
                    <input type="number" min={1} max={15} value={inputs.years} onChange={(e) => handle('years', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount Rate (%)</label>
                    <input type="number" step="0.1" value={inputs.discountRate} onChange={(e) => handle('discountRate', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                </div>
              </div>
            </div>

            <div ref={resultsRef} className="space-y-6">
              <div className="bg-gradient-to-br from-amber-600 to-yellow-600 rounded-xl p-8 text-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <TrendingUp className="h-6 w-6 mr-2" />
                    Scenario Summary (NPV)
                  </h2>
                  <button onClick={downloadPDF} className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {results.map((r) => (
                    <div key={r.label} className="text-center p-4 bg-white/20 rounded-lg">
                      <div className="text-2xl font-bold">{toCurrency(r.npv)}</div>
                      <div className="text-amber-100">{r.label} NPV</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 text-amber-600 mr-2" />
                  Base Scenario Detail (Year {1} → {inputs.years})
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Revenue</span>
                    <span className="font-semibold text-amber-600">{toCurrency(results[1].revenue[results[1].revenue.length - 1])}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">EBIT</span>
                    <span className="font-semibold text-amber-600">{toCurrency(results[1].ebit[results[1].ebit.length - 1])}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">FCF (last year)</span>
                    <span className="font-semibold text-amber-600">{toCurrency(results[1].freeCashFlow[results[1].freeCashFlow.length - 1])}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  Recommendations
                </h3>
                <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
                  <li>If optimistic NPV strongly exceeds base, consider growth investments to capture upside.</li>
                  <li>Stress-test liquidity for pessimistic FCF years; build buffers via working capital efficiency.</li>
                  <li>Use scenario-weighted NPV for budgeting; revisit quarterly with updated assumptions.</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Corporate Finance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/corporate-finance/business-valuation-calculator" className="text-amber-700 hover:text-amber-900 underline">Business Valuation Calculator</RouterLink>
                  <RouterLink to="/corporate-finance/cost-capital-benchmarking" className="text-amber-700 hover:text-amber-900 underline">Cost of Capital Benchmarking</RouterLink>
                  <RouterLink to="/corporate-finance/capital-structure-analyzer" className="text-amber-700 hover:text-amber-900 underline">Capital Structure Analyzer</RouterLink>
                  <RouterLink to="/corporate-finance/dividend-policy-impact-tool" className="text-amber-700 hover:text-amber-900 underline">Dividend Policy Impact Tool</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScenarioAnalysisSimulator;


