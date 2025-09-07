import React, { useMemo, useState, useRef } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { findGoldTool } from '../../data/goldTools';
import { ArrowLeft, Download, Link as LinkIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BarChart } from '../../components/BarChart';
import { ResultChart } from '../../components/ResultChart';
import ToolArticle from '../../components/ToolArticle';

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

const JewelleryEstimator: React.FC = () => {
  const [weight, setWeight] = useState<number>(10);
  const [purityPct, setPurityPct] = useState<number>(91.6);
  const [basePricePerGram, setBasePricePerGram] = useState<number>(6500);
  const [makingPct, setMakingPct] = useState<number>(8);
  const [wastagePct, setWastagePct] = useState<number>(2);
  const [gstPct, setGstPct] = useState<number>(3);
  const pureGrams = useMemo(() => (weight * purityPct) / 100, [weight, purityPct]);
  const metalValue = useMemo(() => pureGrams * basePricePerGram, [pureGrams, basePricePerGram]);
  const makingValue = useMemo(() => (metalValue * makingPct) / 100, [metalValue, makingPct]);
  const wastageValue = useMemo(() => (metalValue * wastagePct) / 100, [metalValue, wastagePct]);
  const subTotal = useMemo(() => metalValue + makingValue + wastageValue, [metalValue, makingValue, wastageValue]);
  const gstValue = useMemo(() => (subTotal * gstPct) / 100, [subTotal, gstPct]);
  const totalInvoice = useMemo(() => subTotal + gstValue, [subTotal, gstValue]);
  const chartData = [
    { name: 'Metal', value: metalValue, color: '#facc15' },
    { name: 'Making', value: makingValue, color: '#fb923c' },
    { name: 'Wastage', value: wastageValue, color: '#f43f5e' },
    { name: 'GST', value: gstValue, color: '#60a5fa' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Weight (g)</label>
          <input type="number" min={0} value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Purity (%)</label>
          <input type="number" min={0} max={100} step={0.1} value={purityPct} onChange={(e) => setPurityPct(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Base Price/Gram (₹)</label>
          <input type="number" min={0} value={basePricePerGram} onChange={(e) => setBasePricePerGram(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Making (% of metal)</label>
          <input type="number" min={0} step={0.1} value={makingPct} onChange={(e) => setMakingPct(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Wastage (% of metal)</label>
          <input type="number" min={0} step={0.1} value={wastagePct} onChange={(e) => setWastagePct(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">GST (%)</label>
          <input type="number" min={0} step={0.1} value={gstPct} onChange={(e) => setGstPct(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="p-4 rounded bg-emerald-50 border col-span-2">Total Invoice: ₹{totalInvoice.toFixed(2)}</div>
      </div>
      <div className="h-64">
        <ResultChart data={chartData} centerText={`TOTAL\n₹${Math.round(totalInvoice).toLocaleString()}`} />
      </div>
    </div>
  );
};

const ScrapResaleEstimator: React.FC = () => {
  const [weight, setWeight] = useState<number>(10);
  const [purityPct, setPurityPct] = useState<number>(91.6);
  const [pricePerGram, setPricePerGram] = useState<number>(6400);
  const [deductionPct, setDeductionPct] = useState<number>(5);
  const pureGrams = useMemo(() => (weight * purityPct) / 100, [weight, purityPct]);
  const baseValue = useMemo(() => pureGrams * pricePerGram, [pureGrams, pricePerGram]);
  const deductionValue = useMemo(() => (baseValue * deductionPct) / 100, [baseValue, deductionPct]);
  const netResale = useMemo(() => baseValue - deductionValue, [baseValue, deductionValue]);
  const chartData = [
    { name: 'Base', value: baseValue, color: '#60a5fa' },
    { name: 'Deduction', value: deductionValue, color: '#f43f5e' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="grid grid-cols-2 gap-4">
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
        <div>
          <label className="block text-sm font-medium mb-1">Deduction (%)</label>
          <input type="number" min={0} step={0.1} value={deductionPct} onChange={(e) => setDeductionPct(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="p-4 rounded bg-amber-50 border col-span-2">Estimated Resale: ₹{netResale.toFixed(2)}</div>
      </div>
      <div className="h-64">
        <ResultChart data={chartData} centerText={`NET\n₹${Math.round(netResale).toLocaleString()}`} />
      </div>
    </div>
  );
};

const MonthlyGoalTool: React.FC = () => {
  const [targetAmount, setTargetAmount] = useState<number>(200000);
  const [years, setYears] = useState<number>(5);
  const [rate, setRate] = useState<number>(10);
  const periods = years * 12;
  const i = rate / 100 / 12;
  const sipNeeded = useMemo(() => {
    if (i === 0) return targetAmount / periods;
    return targetAmount / (((Math.pow(1 + i, periods) - 1) / i) * (1 + i));
  }, [targetAmount, i, periods]);
  const chartData = [
    { name: 'Target', value: targetAmount, color: '#22c55e' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Target Amount (₹)</label>
          <input type="number" min={0} value={targetAmount} onChange={(e) => setTargetAmount(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years</label>
          <input type="number" min={1} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Return (% p.a.)</label>
          <input type="number" min={0} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="p-4 rounded bg-blue-50 border col-span-3">Required Monthly Savings (₹): {sipNeeded.toFixed(2)}</div>
      </div>
      <div className="h-64">
        <ResultChart data={chartData} centerText={`SIP\n₹${Math.round(sipNeeded).toLocaleString()}/mo`} />
      </div>
    </div>
  );
};

const MeltLossEstimator: React.FC = () => {
  const [weight, setWeight] = useState<number>(20);
  const [meltLossPct, setMeltLossPct] = useState<number>(3);
  const [pricePerGram, setPricePerGram] = useState<number>(6500);
  const netWeight = useMemo(() => weight * (1 - meltLossPct / 100), [weight, meltLossPct]);
  const netValue = useMemo(() => netWeight * pricePerGram, [netWeight, pricePerGram]);
  const chartData = [
    { name: 'Loss', value: weight - netWeight, color: '#f43f5e' },
    { name: 'Net', value: netWeight, color: '#22c55e' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Weight (g)</label>
          <input type="number" min={0} value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Melt Loss (%)</label>
          <input type="number" min={0} step={0.1} value={meltLossPct} onChange={(e) => setMeltLossPct(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price/Gram (₹)</label>
          <input type="number" min={0} value={pricePerGram} onChange={(e) => setPricePerGram(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="p-4 rounded bg-amber-50 border col-span-3">Net Weight: {netWeight.toFixed(2)} g | Net Value: ₹{netValue.toFixed(2)}</div>
      </div>
      <div className="h-64">
        <ResultChart data={chartData} centerText={`NET\n${netWeight.toFixed(2)}g`} />
      </div>
    </div>
  );
};

const PricePerGramTool: React.FC = () => {
  const [rate10g, setRate10g] = useState<number>(65000);
  const perGram = useMemo(() => rate10g / 10, [rate10g]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Price for 10g (₹)</label>
        <input type="number" min={0} value={rate10g} onChange={(e) => setRate10g(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="p-4 rounded bg-blue-50 border">Price per Gram: ₹{perGram.toFixed(2)}</div>
      <div className="p-4 rounded bg-emerald-50 border">Handy Tip: Multiply by weight (in grams) for quick estimates.</div>
    </div>
  );
};

const CAGRTool: React.FC = () => {
  const [buy, setBuy] = useState<number>(45000);
  const [sell, setSell] = useState<number>(65000);
  const [years, setYears] = useState<number>(3);
  const totalReturnPct = useMemo(() => ((sell - buy) / buy) * 100, [buy, sell]);
  const cagr = useMemo(() => (Math.pow(sell / buy, 1 / years) - 1) * 100, [buy, sell, years]);
  const chartData = [
    { name: 'Buy', value: buy, color: '#60a5fa' },
    { name: 'Sell', value: sell, color: '#22c55e' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Buy Price (₹/10g)</label>
          <input type="number" min={0} value={buy} onChange={(e) => setBuy(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sell Price (₹/10g)</label>
          <input type="number" min={0} value={sell} onChange={(e) => setSell(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years</label>
          <input type="number" min={0.1} step={0.1} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="p-4 rounded bg-amber-50 border col-span-3">Total Return: {totalReturnPct.toFixed(2)}% | CAGR: {cagr.toFixed(2)}%</div>
      </div>
      <div className="h-64">
        <BarChart data={chartData.map(d => ({ name: d.name, value: d.value }))} xKey="name" yKey="value" color="#60a5fa" xLabel="" yLabel="₹ per 10g" />
      </div>
    </div>
  );
};

const SGBRedemptionTool: React.FC = () => {
  const [units, setUnits] = useState<number>(10);
  const [redemptionPrice, setRedemptionPrice] = useState<number>(6500);
  const [interestRate, setInterestRate] = useState<number>(2.5);
  const [faceValue, setFaceValue] = useState<number>(6000);
  const years = 8;
  const annualInterest = useMemo(() => units * faceValue * (interestRate / 100), [units, faceValue, interestRate]);
  const totalInterest = useMemo(() => annualInterest * years, [annualInterest]);
  const redemptionAmount = useMemo(() => units * redemptionPrice, [units, redemptionPrice]);
  const chartData = [
    { name: 'Redemption', value: redemptionAmount, color: '#22c55e' },
    { name: 'Total Interest', value: totalInterest, color: '#f59e0b' }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Units</label>
          <input type="number" min={0} value={units} onChange={(e) => setUnits(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Redemption Price (₹/unit)</label>
          <input type="number" min={0} value={redemptionPrice} onChange={(e) => setRedemptionPrice(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Face Value (₹/unit)</label>
          <input type="number" min={0} value={faceValue} onChange={(e) => setFaceValue(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interest Rate (% p.a.)</label>
          <input type="number" min={0} step={0.1} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="p-4 rounded bg-blue-50 border col-span-2">Maturity: ₹{(redemptionAmount + totalInterest).toFixed(2)} (Principal + Interest)</div>
      </div>
      <div className="h-64">
        <ResultChart data={chartData} centerText={`MATURITY\n₹${Math.round(redemptionAmount + totalInterest).toLocaleString()}`} />
      </div>
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

const SIPTool: React.FC<{ includeExpenseRatio?: boolean }> = ({ includeExpenseRatio = false }) => {
  const [monthly, setMonthly] = useState<number>(5000);
  const [years, setYears] = useState<number>(5);
  const [rate, setRate] = useState<number>(10);
  const [expenseRatio, setExpenseRatio] = useState<number>(0.6);
  const periods = years * 12;
  const effectiveRate = includeExpenseRatio ? Math.max(0, rate - expenseRatio) : rate;
  const i = effectiveRate / 100 / 12;
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
        {includeExpenseRatio && (
          <div>
            <label className="block text-sm font-medium mb-1">Expense Ratio (% p.a.)</label>
            <input type="number" min={0} step={0.01} value={expenseRatio} onChange={(e) => setExpenseRatio(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
          </div>
        )}
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
        <BarChart data={data.map(d => ({ name: d.label, value: d.value }))} xKey="name" yKey="value" color={(d: { name: string }) => d.name === 'ETF Cost' ? '#60a5fa' : '#fb923c'} xLabel="Type" yLabel="Total Cost (₹)" />
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
        calculatorData={{
          name: tool.name,
          description: tool.description,
          category: 'Gold Tools',
          features: (
            tool.type === 'purity' || tool.type === 'karatToPurity' ? ['Karat to fineness', 'Purity %', 'Pure grams'] :
            tool.type === 'weightConvert' || tool.type === 'gramToTola' || tool.type === 'gramToOunce' ? ['Gram to tola', 'Gram to troy ounce', 'Reverse conversion'] :
            tool.type === 'value' ? ['Pure grams', 'Value by price/gram', 'Instant estimate'] :
            tool.type === 'makingCharges' || tool.type === 'jewelleryEstimator' ? ['Making charges', 'Wastage', 'GST invoice'] :
            tool.type === 'sip' || tool.type === 'goldETFSIP' ? ['Monthly SIP', 'Future value', 'ETF expense ratio'] :
            tool.type === 'lumpsum' ? ['Future value', 'Annualized return', 'Scenario compare'] :
            tool.type === 'etfVsPhysical' ? ['ETF expense', 'Making + wastage', 'Storage cost'] :
            tool.type === 'sovereignBond' || tool.type === 'sovereignRedemption' ? ['Annual interest', 'Maturity value', 'Fixed tenure'] :
            tool.type === 'returns' ? ['Total return %', 'CAGR %', 'Buy vs sell chart'] :
            tool.type === 'loanEmi' ? ['EMI', 'Total interest', 'Tenure compare'] :
            tool.type === 'scrapValue' ? ['Resale base', 'Deduction %', 'Net value'] :
            tool.type === 'monthlyGoal' ? ['Target amount', 'Required SIP', 'Future value'] :
            tool.type === 'meltLoss' ? ['Melt loss %', 'Net weight', 'Net value'] :
            tool.type === 'pricePerGram' ? ['10g to per gram', 'Quick estimate', 'Fast pricing'] :
            ['Gold calculator']
          )
        }}
        faqData={[
          { question: `How do I use the ${tool.name}?`, answer: 'Enter the values in the inputs at the top, review the instant results and charts below, and export a PDF to share.' },
          { question: 'Is this tool free?', answer: 'Yes, all gold tools are free, mobile-friendly, and require no login.' },
          { question: 'Are values exact?', answer: 'These are intelligent estimates for planning purposes. Verify final numbers with your jeweller or advisor.' },
          { question: 'Can I share results?', answer: 'Yes. Use the Download PDF button to save or share your calculation.' }
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
            {tool.type === 'value' && <ValueEstimator />}
            {tool.type === 'jewelleryEstimator' && <JewelleryEstimator />}
            {tool.type === 'scrapValue' && <ScrapResaleEstimator />}
            {tool.type === 'pricePerGram' && <PricePerGramTool />}
            {(tool.type === 'weightConvert' || tool.type === 'gramToTola' || tool.type === 'gramToOunce') && <WeightConverter />}
            {tool.type === 'sip' && <SIPTool />}
            {tool.type === 'goldETFSIP' && <SIPTool includeExpenseRatio />}
            {tool.type === 'lumpsum' && <LumpsumTool />}
            {tool.type === 'returns' && <CAGRTool />}
            {tool.type === 'etfVsPhysical' && <ETFComparison />}
            {tool.type === 'sovereignBond' && <SGBInterestTool />}
            {tool.type === 'sovereignRedemption' && <SGBRedemptionTool />}
            {tool.type === 'loanEmi' && <LoanEMITool />}
            {tool.type === 'monthlyGoal' && <MonthlyGoalTool />}
            {tool.type === 'meltLoss' && <MeltLossEstimator />}

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
          <div className="mt-10">
            <ToolArticle
              title={tool.name}
              context={{ name: tool.name, category: 'Gold Tools', keywords: ['gold purity calculator india', 'gold sip calculator', 'gold value per gram today india', 'sovereign gold bond interest calculator', 'gold etf vs physical calculator', 'gold loan emi calculator'] }}
              links={[
                { href: '/gold-tools', label: 'Gold Tools Hub' },
                { href: '/finance-tools/asset-allocation-tool', label: 'Asset Allocation Tool' },
                { href: '/tax-tools', label: 'Tax Tools' }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GoldToolPage;


