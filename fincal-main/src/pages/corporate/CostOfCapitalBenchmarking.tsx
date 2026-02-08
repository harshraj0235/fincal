import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { ArrowLeft, Percent, Building, BarChart3, Download, Calculator, TrendingUp, Link } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type IndustryBenchmark = {
  id: string;
  name: string;
  typicalBeta: number;
  typicalDebtToEquity: number; // ratio
  typicalCostOfDebt: number; // %
  typicalTaxRate: number; // %
  typicalEquityRiskPremium: number; // %
  notes: string;
};

const INDUSTRY_BENCHMARKS: IndustryBenchmark[] = [
  { id: 'technology', name: 'Technology', typicalBeta: 1.20, typicalDebtToEquity: 0.25, typicalCostOfDebt: 8.0, typicalTaxRate: 25.0, typicalEquityRiskPremium: 7.5, notes: 'High growth, moderate leverage' },
  { id: 'manufacturing', name: 'Manufacturing', typicalBeta: 0.95, typicalDebtToEquity: 0.60, typicalCostOfDebt: 9.0, typicalTaxRate: 25.0, typicalEquityRiskPremium: 7.0, notes: 'Stable cash flows, higher leverage' },
  { id: 'healthcare', name: 'Healthcare', typicalBeta: 0.90, typicalDebtToEquity: 0.40, typicalCostOfDebt: 8.5, typicalTaxRate: 25.0, typicalEquityRiskPremium: 6.8, notes: 'Defensive sector, moderate leverage' },
  { id: 'financials', name: 'Financial Services', typicalBeta: 1.10, typicalDebtToEquity: 1.50, typicalCostOfDebt: 7.5, typicalTaxRate: 25.0, typicalEquityRiskPremium: 7.2, notes: 'Regulated, leverage varies widely' },
  { id: 'utilities', name: 'Utilities', typicalBeta: 0.70, typicalDebtToEquity: 0.80, typicalCostOfDebt: 7.0, typicalTaxRate: 25.0, typicalEquityRiskPremium: 6.0, notes: 'Stable cash flows, high dividends' },
  { id: 'consumer', name: 'Consumer Goods', typicalBeta: 0.85, typicalDebtToEquity: 0.50, typicalCostOfDebt: 8.2, typicalTaxRate: 25.0, typicalEquityRiskPremium: 6.5, notes: 'Balanced risk profile' },
  { id: 'energy', name: 'Energy', typicalBeta: 1.30, typicalDebtToEquity: 0.70, typicalCostOfDebt: 9.5, typicalTaxRate: 25.0, typicalEquityRiskPremium: 8.0, notes: 'Commodity-linked volatility' }
];

const DEFAULT_RISK_FREE = 6.5; // % (approx India long-term)

const toPct = (value: number) => `${value.toFixed(2)}%`;

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const CostOfCapitalBenchmarking: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);

  const [inputs, setInputs] = useState({
    companyName: '',
    industryId: 'technology',
    riskFreeRate: DEFAULT_RISK_FREE, // %
    equityRiskPremium: 7.5, // %
    beta: 1.2,
    costOfDebt: 8.5, // %
    taxRate: 25, // %
    targetDebtWeight: 30, // % of capital structure
    targetEquityWeight: 70 // % of capital structure
  });

  const selectedIndustry = useMemo(
    () => INDUSTRY_BENCHMARKS.find(i => i.id === inputs.industryId) || INDUSTRY_BENCHMARKS[0],
    [inputs.industryId]
  );

  useEffect(() => {
    // Auto-suggest defaults from industry
    setInputs(prev => ({
      ...prev,
      beta: selectedIndustry.typicalBeta,
      equityRiskPremium: selectedIndustry.typicalEquityRiskPremium,
      costOfDebt: selectedIndustry.typicalCostOfDebt,
      taxRate: selectedIndustry.typicalTaxRate,
      // Convert D/E to weights: D/E -> D = x, E = 1 -> D% = x/(1+x)
      targetDebtWeight: Math.round((selectedIndustry.typicalDebtToEquity / (1 + selectedIndustry.typicalDebtToEquity)) * 100),
      targetEquityWeight: 100 - Math.round((selectedIndustry.typicalDebtToEquity / (1 + selectedIndustry.typicalDebtToEquity)) * 100)
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs.industryId]);

  const handleChange = (field: string, value: number | string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const computed = useMemo(() => {
    const rf = inputs.riskFreeRate / 100;
    const erp = inputs.equityRiskPremium / 100;
    const beta = inputs.beta;
    const kd = inputs.costOfDebt / 100;
    const t = inputs.taxRate / 100;
    const wd = clamp(inputs.targetDebtWeight, 0, 100) / 100;
    const we = clamp(inputs.targetEquityWeight, 0, 100) / 100;

    const ke = rf + beta * erp; // CAPM
    const wacc = we * ke + wd * kd * (1 - t);

    const benchmarkWacc = (() => {
      const i = selectedIndustry;
      const keB = (DEFAULT_RISK_FREE / 100) + i.typicalBeta * (i.typicalEquityRiskPremium / 100);
      const wdB = i.typicalDebtToEquity / (1 + i.typicalDebtToEquity);
      const weB = 1 - wdB;
      const kdB = i.typicalCostOfDebt / 100;
      const tB = i.typicalTaxRate / 100;
      return weB * keB + wdB * kdB * (1 - tB);
    })();

    return {
      ke,
      kd,
      wacc,
      weights: { debt: wd, equity: we },
      benchmark: {
        wacc: benchmarkWacc,
        premiumVsBenchmark: (wacc - benchmarkWacc)
      }
    };
  }, [inputs, selectedIndustry]);

  const downloadPDF = async () => {
    if (!resultsRef.current) return;
    try {
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
      pdf.save('cost-of-capital-benchmarking.pdf');
    } catch (e) {
      console.error('PDF error', e);
    }
  };

  return (
    <>
      <SEOHelmet
        title="Cost of Capital Benchmarking - WACC Calculator for Industries | MoneyCal.in"
        description="Benchmark your company WACC against industry norms. Calculate cost of equity via CAPM, after-tax cost of debt, and optimal capital structure."
        keywords="WACC calculator India, cost of capital benchmarking, CAPM beta India, industry WACC"
        url="/corporate-finance/cost-capital-benchmarking"
        type="website"
        image="/images/cost-of-capital-benchmarking.jpg"
        tags={["WACC", "cost of capital", "CAPM", "corporate finance"]}
      />

      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <button onClick={() => navigate(-1)} className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </button>
          </div>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Percent className="h-16 w-16 text-emerald-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Cost of Capital Benchmarking</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Compute and benchmark your company WACC against Indian industry averages. Adjust CAPM inputs, capital structure, and tax to assess competitiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="h-6 w-6 text-emerald-600 mr-2" />
                Inputs
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={inputs.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    placeholder="Enter company name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select
                    value={inputs.industryId}
                    onChange={(e) => handleChange('industryId', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    {INDUSTRY_BENCHMARKS.map(i => (
                      <option key={i.id} value={i.id}>{i.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Risk-free Rate (%)</label>
                    <input type="number" step="0.1" value={inputs.riskFreeRate} onChange={(e) => handleChange('riskFreeRate', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Equity Risk Premium (%)</label>
                    <input type="number" step="0.1" value={inputs.equityRiskPremium} onChange={(e) => handleChange('equityRiskPremium', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Beta</label>
                    <input type="number" step="0.01" value={inputs.beta} onChange={(e) => handleChange('beta', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pre-tax Cost of Debt (%)</label>
                    <input type="number" step="0.1" value={inputs.costOfDebt} onChange={(e) => handleChange('costOfDebt', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                    <input type="number" step="0.1" value={inputs.taxRate} onChange={(e) => handleChange('taxRate', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Capital Structure Weights (%)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Debt Weight</label>
                      <input type="number" step="0.1" min={0} max={100} value={inputs.targetDebtWeight} onChange={(e) => handleChange('targetDebtWeight', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Equity Weight</label>
                      <input type="number" step="0.1" min={0} max={100} value={inputs.targetEquityWeight} onChange={(e) => handleChange('targetEquityWeight', parseFloat(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Tip: Weights should add up to 100%.</p>
                </div>
              </div>
            </div>

            <div ref={resultsRef} className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-600 to-blue-600 rounded-xl p-8 text-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <Building className="h-6 w-6 mr-2" />
                    WACC Summary
                  </h2>
                  <button onClick={downloadPDF} className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">{toPct(computed.wacc * 100)}</div>
                    <div className="text-emerald-100">WACC</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">{toPct(computed.ke * 100)}</div>
                    <div className="text-emerald-100">Cost of Equity (CAPM)</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">{toPct(computed.kd * 100)}</div>
                    <div className="text-emerald-100">Pre-tax Cost of Debt</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">E {Math.round(computed.weights.equity * 100)}% / D {Math.round(computed.weights.debt * 100)}%</div>
                    <div className="text-emerald-100">Capital Structure</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 text-emerald-600 mr-2" />
                  Benchmark Comparison ({selectedIndustry.name})
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Industry WACC (approx)</span>
                    <span className="font-semibold text-emerald-600">{toPct(computed.benchmark.wacc * 100)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Your WACC vs Benchmark</span>
                    <span className={`font-semibold ${computed.benchmark.premiumVsBenchmark <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {computed.benchmark.premiumVsBenchmark >= 0 ? '+' : ''}{toPct(computed.benchmark.premiumVsBenchmark * 100)}
                    </span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="text-sm text-gray-700">
                      {computed.benchmark.premiumVsBenchmark <= 0 ? (
                        <>Your cost of capital is at or below industry benchmark, indicating competitive financing terms.</>
                      ) : (
                        <>Your cost of capital is above industry benchmark. Consider optimizing capital structure or reducing risk to lower WACC.</>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Note: Benchmarks are indicative and may vary by market conditions, firm size, and credit quality.</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                  Recommendations
                </h3>
                <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
                  <li>Evaluate leverage: adjust debt/equity mix to achieve a lower WACC while maintaining target credit profile.</li>
                  <li>Revisit growth vs risk: lower beta through diversification or stable revenue streams to reduce cost of equity.</li>
                  <li>Refinance debt: if market rates decline, negotiate better cost of debt to reduce after-tax financing cost.</li>
                  <li>Tax optimization: ensure interest tax shields are efficiently utilized within regulatory limits.</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Corporate Finance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/corporate-finance/capital-structure-analyzer" className="text-emerald-700 hover:text-emerald-900 underline">Capital Structure Analyzer</RouterLink>
                  <RouterLink to="/corporate-finance/business-valuation-calculator" className="text-emerald-700 hover:text-emerald-900 underline">Business Valuation Calculator</RouterLink>
                  <RouterLink to="/corporate-finance/fx-exposure-risk-calculator" className="text-emerald-700 hover:text-emerald-900 underline">FX Exposure Risk Calculator</RouterLink>
                  <RouterLink to="/corporate-finance/dividend-policy-impact-tool" className="text-emerald-700 hover:text-emerald-900 underline">Dividend Policy Impact Tool</RouterLink>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What is WACC and Why It Matters</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                The Weighted Average Cost of Capital (WACC) represents a firm’s blended cost of financing from both equity and debt sources. It is used as the discount rate for valuation models and as a hurdle rate for investment decisions.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cost of Equity (CAPM): Risk-free rate + Beta × Equity Risk Premium</li>
                <li>After-tax Cost of Debt: Pre-tax Cost of Debt × (1 − Tax Rate)</li>
                <li>WACC: Weight of Equity × Cost of Equity + Weight of Debt × After-tax Cost of Debt</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CostOfCapitalBenchmarking;


