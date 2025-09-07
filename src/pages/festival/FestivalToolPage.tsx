import React, { useMemo, useRef, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { findFestivalTool, FestivalToolConfig } from '../../data/festivalTools';
import { ArrowLeft, Link as LinkIcon, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResultChart } from '../../components/ResultChart';
import { BarChart } from '../../components/BarChart';
import ToolArticle from '../../components/ToolArticle';

function buildSoftwareAppJsonLd(title: string, url: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": title,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "url": url,
    "description": description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "category": "Free"
    }
  };
}

function buildFaqJsonLd(qa: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": qa.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a }
    }))
  };
}

type BudgetItem = { name: string; qty?: number; price?: number; note?: string };

const BudgetTool: React.FC<{ tool: FestivalToolConfig }> = ({ tool }) => {
  const [items, setItems] = useState<BudgetItem[]>(tool.defaultItems || []);
  const update = (idx: number, patch: Partial<BudgetItem>) => setItems(prev => prev.map((r, i) => i === idx ? { ...r, ...patch } : r));
  const add = () => setItems(prev => [...prev, { name: '', qty: 1, price: 0 }]);
  const remove = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx));
  const total = useMemo(() => items.reduce((s, it) => s + (Number(it.qty || 0) * Number(it.price || 0)), 0), [items]);
  const chartData = useMemo(() => items.filter(it => (Number(it.qty) * Number(it.price)) > 0).map((it, i) => ({ name: it.name || `Item ${i + 1}`, value: Number(it.qty) * Number(it.price), color: ['#f43f5e', '#fb923c', '#22c55e', '#60a5fa', '#a78bfa', '#f59e0b', '#34d399'][i % 7] })), [items]);
  return (
    <div>
      <div className="overflow-x-auto border rounded-lg mb-4">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">Item</th>
              <th className="px-3 py-2 text-right">Qty</th>
              <th className="px-3 py-2 text-right">Price (₹)</th>
              <th className="px-3 py-2 text-right">Amount (₹)</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((r, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-3 py-2"><input className="w-full border rounded px-2 py-1" value={r.name} onChange={(e) => update(idx, { name: e.target.value })} /></td>
                <td className="px-3 py-2 text-right"><input type="number" min={0} className="w-24 text-right border rounded px-2 py-1" value={r.qty || 0} onChange={(e) => update(idx, { qty: Number(e.target.value) })} /></td>
                <td className="px-3 py-2 text-right"><input type="number" min={0} className="w-28 text-right border rounded px-2 py-1" value={r.price || 0} onChange={(e) => update(idx, { price: Number(e.target.value) })} /></td>
                <td className="px-3 py-2 text-right">₹{((Number(r.qty || 0) * Number(r.price || 0)) || 0).toLocaleString()}</td>
                <td className="px-3 py-2 text-right">{items.length > 1 && (<button onClick={() => remove(idx)} className="text-red-600 hover:text-red-800">Remove</button>)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center">
        <button onClick={add} className="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Add Item</button>
        <div className="text-lg font-bold">Total: ₹{total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
      </div>
      {chartData.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-white rounded-lg border p-4">
            <ResultChart data={chartData} centerText={`TOTAL\n₹${Math.round(total).toLocaleString()}`} />
          </div>
          <div className="h-64 bg-white rounded-lg border p-4">
            <BarChart data={chartData.map(d => ({ name: d.name, value: d.value }))} xKey="name" yKey="value" color="#f43f5e" xLabel="Item" yLabel="Amount (₹)" />
          </div>
        </div>
      )}
    </div>
  );
};

const ElectricityTool: React.FC = () => {
  const [watt, setWatt] = useState<number>(10);
  const [count, setCount] = useState<number>(20);
  const [hoursPerDay, setHoursPerDay] = useState<number>(5);
  const [days, setDays] = useState<number>(7);
  const [ratePerUnit, setRatePerUnit] = useState<number>(10);
  const kwh = useMemo(() => (watt * count * hoursPerDay * days) / 1000, [watt, count, hoursPerDay, days]);
  const cost = useMemo(() => kwh * ratePerUnit, [kwh, ratePerUnit]);
  const perDayCost = useMemo(() => (watt * count * hoursPerDay) / 1000 * ratePerUnit, [watt, count, hoursPerDay, ratePerUnit]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Watt per light</label>
        <input type="number" min={0} value={watt} onChange={(e) => setWatt(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Count</label>
        <input type="number" min={0} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Hours/Day</label>
        <input type="number" min={0} value={hoursPerDay} onChange={(e) => setHoursPerDay(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Days</label>
        <input type="number" min={0} value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Rate/Unit (₹)</label>
        <input type="number" min={0} value={ratePerUnit} onChange={(e) => setRatePerUnit(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded bg-blue-50 border">Energy: {kwh.toFixed(2)} kWh</div>
        <div className="p-4 rounded bg-amber-50 border">Total Cost: ₹{cost.toFixed(2)}</div>
        <div className="p-4 rounded bg-emerald-50 border">Per Day Cost: ₹{perDayCost.toFixed(2)}</div>
      </div>
      <div className="md:col-span-5 h-64 bg-white rounded-lg border p-4">
        <BarChart data={[{ name: 'Per day', value: perDayCost }, { name: 'Total', value: cost }]} xKey="name" yKey="value" color="#f59e0b" xLabel="Period" yLabel="Cost (₹)" />
      </div>
    </div>
  );
};

const FastingDurationTool: React.FC = () => {
  const [sunrise, setSunrise] = useState<string>('06:00');
  const [moonrise, setMoonrise] = useState<string>('19:30');
  const minutes = useMemo(() => {
    const [sh, sm] = sunrise.split(':').map(Number);
    const [mh, mm] = moonrise.split(':').map(Number);
    return (mh * 60 + mm) - (sh * 60 + sm);
  }, [sunrise, moonrise]);
  const hrs = Math.max(0, Math.floor(minutes / 60));
  const mins = Math.max(0, minutes % 60);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Sunrise</label>
        <input type="time" value={sunrise} onChange={(e) => setSunrise(e.target.value)} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Moonrise</label>
        <input type="time" value={moonrise} onChange={(e) => setMoonrise(e.target.value)} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="p-4 rounded bg-emerald-50 border">Fasting Duration: {hrs}h {mins}m</div>
    </div>
  );
};

const ZakatTool: React.FC = () => {
  const [assets, setAssets] = useState<number>(200000);
  const [liabilities, setLiabilities] = useState<number>(50000);
  const base = useMemo(() => Math.max(0, assets - liabilities), [assets, liabilities]);
  const zakat = useMemo(() => base * 0.025, [base]);
  const chartData = [
    { name: 'Base', value: base, color: '#60a5fa' },
    { name: 'Zakat (2.5%)', value: zakat, color: '#22c55e' }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Assets (₹)</label>
        <input type="number" min={0} value={assets} onChange={(e) => setAssets(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Liabilities (₹)</label>
        <input type="number" min={0} value={liabilities} onChange={(e) => setLiabilities(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="p-4 rounded bg-amber-50 border">Zakat (2.5%): ₹{zakat.toFixed(2)}</div>
      <div className="md:col-span-3 h-64 bg-white rounded-lg border p-4">
        <ResultChart data={chartData} centerText={`ZAKAT\n₹${Math.round(zakat).toLocaleString()}`} />
      </div>
    </div>
  );
};

const TravelTool: React.FC = () => {
  const [distanceKm, setDistanceKm] = useState<number>(50);
  const [mileageKmPerLitre, setMileageKmPerLitre] = useState<number>(15);
  const [fuelPricePerLitre, setFuelPricePerLitre] = useState<number>(105);
  const [tollCharges, setTollCharges] = useState<number>(0);
  const [persons, setPersons] = useState<number>(2);

  const fuelLitres = useMemo(() => (distanceKm > 0 && mileageKmPerLitre > 0) ? distanceKm / mileageKmPerLitre : 0, [distanceKm, mileageKmPerLitre]);
  const fuelCost = useMemo(() => fuelLitres * fuelPricePerLitre, [fuelLitres, fuelPricePerLitre]);
  const totalCost = useMemo(() => fuelCost + (Number(tollCharges) || 0), [fuelCost, tollCharges]);
  const perHead = useMemo(() => persons > 0 ? totalCost / persons : totalCost, [totalCost, persons]);
  const chartData = [
    { name: 'Fuel', value: fuelCost, color: '#60a5fa' },
    { name: 'Tolls', value: Number(tollCharges) || 0, color: '#f43f5e' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Distance (km)</label>
        <input type="number" min={0} value={distanceKm} onChange={(e) => setDistanceKm(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Mileage (km/l)</label>
        <input type="number" min={0} value={mileageKmPerLitre} onChange={(e) => setMileageKmPerLitre(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Fuel Price (₹/l)</label>
        <input type="number" min={0} value={fuelPricePerLitre} onChange={(e) => setFuelPricePerLitre(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Tolls (₹)</label>
        <input type="number" min={0} value={tollCharges} onChange={(e) => setTollCharges(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Persons</label>
        <input type="number" min={1} value={persons} onChange={(e) => setPersons(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded bg-blue-50 border">Fuel Needed: {fuelLitres.toFixed(2)} l</div>
        <div className="p-4 rounded bg-amber-50 border">Total Cost: ₹{totalCost.toFixed(2)}</div>
        <div className="p-4 rounded bg-emerald-50 border">Per Head: ₹{perHead.toFixed(2)}</div>
      </div>
      <div className="md:col-span-5 h-64 bg-white rounded-lg border p-4">
        <ResultChart data={chartData} centerText={`TOTAL\n₹${Math.round(totalCost).toLocaleString()}`} />
      </div>
    </div>
  );
};

const ChecklistTool: React.FC<{ initial?: string[] }> = ({ initial }) => {
  const [items, setItems] = useState<string[]>(initial && initial.length ? initial : ['']);
  const update = (idx: number, value: string) => setItems(prev => prev.map((v, i) => i === idx ? value : v));
  const add = () => setItems(prev => [...prev, '']);
  const remove = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx));
  return (
    <div>
      <div className="space-y-2">
        {items.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <input className="flex-1 border rounded px-2 py-1" value={v} onChange={(e) => update(i, e.target.value)} placeholder={`Item ${i + 1}`} />
            {items.length > 1 && (
              <button onClick={() => remove(i)} className="text-red-600 hover:text-red-800 text-sm">Remove</button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3">
        <button onClick={add} className="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Add Item</button>
      </div>
    </div>
  );
};

const CompareTool: React.FC = () => {
  const [aLabel, setALabel] = useState<string>('Organic');
  const [bLabel, setBLabel] = useState<string>('Synthetic');
  const [aValue, setAValue] = useState<number>(70);
  const [bValue, setBValue] = useState<number>(50);
  const data = [
    { name: aLabel, value: aValue, color: '#22c55e' },
    { name: bLabel, value: bValue, color: '#f59e0b' }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">A Label</label>
          <input className="w-full border rounded px-2 py-1" value={aLabel} onChange={(e) => setALabel(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">B Label</label>
          <input className="w-full border rounded px-2 py-1" value={bLabel} onChange={(e) => setBLabel(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">A Score</label>
          <input type="number" className="w-full border rounded px-2 py-1" value={aValue} onChange={(e) => setAValue(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">B Score</label>
          <input type="number" className="w-full border rounded px-2 py-1" value={bValue} onChange={(e) => setBValue(Number(e.target.value))} />
        </div>
      </div>
      <div className="h-64">
        <BarChart data={data.map(d => ({ name: d.name, value: d.value }))} xKey="name" yKey="value" color="#22c55e" xLabel="" yLabel="Score" />
      </div>
    </div>
  );
};

const LengthTool: React.FC = () => {
  const [meters, setMeters] = useState<number>(500);
  const [rollMeters, setRollMeters] = useState<number>(100);
  const rollsNeeded = useMemo(() => (rollMeters > 0 ? Math.ceil(meters / rollMeters) : 0), [meters, rollMeters]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">String Length (m)</label>
        <input type="number" min={0} value={meters} onChange={(e) => setMeters(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Per Roll (m)</label>
        <input type="number" min={1} value={rollMeters} onChange={(e) => setRollMeters(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="p-4 rounded bg-amber-50 border">Rolls Needed: {rollsNeeded}</div>
    </div>
  );
};

const MarginTool: React.FC = () => {
  const [cost, setCost] = useState<number>(10);
  const [sell, setSell] = useState<number>(15);
  const profit = useMemo(() => Math.max(0, sell - cost), [sell, cost]);
  const marginPct = useMemo(() => (sell > 0 ? (profit / sell) * 100 : 0), [profit, sell]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Cost Price (₹)</label>
        <input type="number" min={0} value={cost} onChange={(e) => setCost(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Selling Price (₹)</label>
        <input type="number" min={0} value={sell} onChange={(e) => setSell(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="p-4 rounded bg-blue-50 border">Profit: ₹{profit.toFixed(2)}</div>
      <div className="p-4 rounded bg-emerald-50 border">Margin: {marginPct.toFixed(2)}%</div>
    </div>
  );
};

const HowManyTool: React.FC = () => {
  const [budget, setBudget] = useState<number>(500);
  const [pricePerUnit, setPricePerUnit] = useState<number>(25);
  const count = useMemo(() => (pricePerUnit > 0 ? Math.floor(budget / pricePerUnit) : 0), [budget, pricePerUnit]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Budget (₹)</label>
        <input type="number" min={0} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Price per unit (₹)</label>
        <input type="number" min={0} value={pricePerUnit} onChange={(e) => setPricePerUnit(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="p-4 rounded bg-amber-50 border">You can buy: {count}</div>
    </div>
  );
};

const LuckyColorTool: React.FC = () => {
  const [date, setDate] = useState<string>('2025-01-26');
  const color = useMemo(() => {
    const d = new Date(date);
    const day = d.getDay();
    return ['Green', 'Red', 'Blue', 'Yellow', 'White', 'Black', 'Purple'][day];
  }, [date]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="p-4 rounded bg-emerald-50 border">Lucky Color: {color}</div>
    </div>
  );
};

const SymptomCheckerTool: React.FC = () => {
  const [sneeze, setSneeze] = useState<boolean>(false);
  const [rash, setRash] = useState<boolean>(false);
  const [itch, setItch] = useState<boolean>(false);
  const score = Number(sneeze) + Number(rash) + Number(itch);
  const severity = score === 0 ? 'None' : score === 1 ? 'Mild' : score === 2 ? 'Moderate' : 'Severe';
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <label className="inline-flex items-center gap-2"><input type="checkbox" checked={sneeze} onChange={(e) => setSneeze(e.target.checked)} /> Sneezing</label>
      <label className="inline-flex items-center gap-2"><input type="checkbox" checked={rash} onChange={(e) => setRash(e.target.checked)} /> Rash</label>
      <label className="inline-flex items-center gap-2"><input type="checkbox" checked={itch} onChange={(e) => setItch(e.target.checked)} /> Itching</label>
      <div className="p-4 rounded bg-amber-50 border">Severity: {severity}</div>
    </div>
  );
};

const CaptionGeneratorTool: React.FC = () => {
  const ideas = [
    'Let the colors speak louder than words!',
    'Rang barse, dil tarse!',
    'Safe, colorful, and happy Holi!',
    'Uttarayan vibes: fly high!'
  ];
  const [caption, setCaption] = useState<string>(ideas[0]);
  const randomize = () => setCaption(ideas[Math.floor(Math.random() * ideas.length)]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
      <button onClick={randomize} className="px-3 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 w-max">Randomize</button>
      <div className="p-4 rounded border bg-white">{caption}</div>
    </div>
  );
};

const UsageTool: React.FC = () => {
  const [buckets, setBuckets] = useState<number>(5);
  const [litrePerBucket, setLitrePerBucket] = useState<number>(15);
  const [balloons, setBalloons] = useState<number>(50);
  const perBalloon = 0.05; // litres
  const total = useMemo(() => buckets * litrePerBucket + balloons * perBalloon, [buckets, litrePerBucket, balloons]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Buckets</label>
        <input type="number" min={0} value={buckets} onChange={(e) => setBuckets(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Litres per bucket</label>
        <input type="number" min={0} value={litrePerBucket} onChange={(e) => setLitrePerBucket(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Balloons</label>
        <input type="number" min={0} value={balloons} onChange={(e) => setBalloons(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="p-4 rounded bg-emerald-50 border">Total Water: {total.toFixed(2)} L</div>
    </div>
  );
};

const ScoreTrackerTool: React.FC = () => {
  const [scores, setScores] = useState<Array<{ name: string; score: number }>>([
    { name: 'Team A', score: 0 },
    { name: 'Team B', score: 0 }
  ]);
  const addTeam = () => setScores(prev => [...prev, { name: `Team ${String.fromCharCode(65 + prev.length)}`, score: 0 }]);
  const update = (idx: number, patch: Partial<{ name: string; score: number }>) => setScores(prev => prev.map((t, i) => i === idx ? { ...t, ...patch } : t));
  return (
    <div className="space-y-2">
      {scores.map((t, i) => (
        <div key={i} className="flex items-center gap-2">
          <input className="border rounded px-2 py-1" value={t.name} onChange={(e) => update(i, { name: e.target.value })} />
          <input type="number" className="border rounded px-2 py-1 w-24" value={t.score} onChange={(e) => update(i, { score: Number(e.target.value) })} />
        </div>
      ))}
      <button onClick={addTeam} className="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Add Team</button>
    </div>
  );
};

const DiscountTool: React.FC = () => {
  const [mrp, setMrp] = useState<number>(20000);
  const [salePct, setSalePct] = useState<number>(20);
  const [couponAmt, setCouponAmt] = useState<number>(500);
  const [bankPct, setBankPct] = useState<number>(10);
  const [bankCap, setBankCap] = useState<number>(1500);
  const saleOff = useMemo(() => (mrp * salePct) / 100, [mrp, salePct]);
  const afterSale = useMemo(() => Math.max(0, mrp - saleOff), [mrp, saleOff]);
  const afterCoupon = useMemo(() => Math.max(0, afterSale - couponAmt), [afterSale, couponAmt]);
  const bankOffRaw = useMemo(() => (afterCoupon * bankPct) / 100, [afterCoupon, bankPct]);
  const bankOff = useMemo(() => Math.min(bankOffRaw, bankCap), [bankOffRaw, bankCap]);
  const finalPrice = useMemo(() => Math.max(0, afterCoupon - bankOff), [afterCoupon, bankOff]);
  const totalSavings = useMemo(() => mrp - finalPrice, [mrp, finalPrice]);
  const chartData = [
    { name: 'Sale', value: saleOff, color: '#f59e0b' },
    { name: 'Coupon', value: couponAmt, color: '#22c55e' },
    { name: 'Bank', value: bankOff, color: '#60a5fa' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">MRP (₹)</label>
          <input type="number" min={0} value={mrp} onChange={(e) => setMrp(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sale Discount (%)</label>
          <input type="number" min={0} max={100} step={0.1} value={salePct} onChange={(e) => setSalePct(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Coupon Amount (₹)</label>
          <input type="number" min={0} value={couponAmt} onChange={(e) => setCouponAmt(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bank Discount (%)</label>
          <input type="number" min={0} max={100} step={0.1} value={bankPct} onChange={(e) => setBankPct(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bank Discount Cap (₹)</label>
          <input type="number" min={0} value={bankCap} onChange={(e) => setBankCap(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="p-4 rounded bg-emerald-50 border col-span-2">Final Price: ₹{finalPrice.toFixed(2)} | Total Savings: ₹{totalSavings.toFixed(2)}</div>
      </div>
      <div className="h-64">
        <ResultChart data={chartData} centerText={`SAVE\n₹${Math.round(totalSavings).toLocaleString()}`} />
      </div>
    </div>
  );
};

const EMITool: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(30000);
  const [rate, setRate] = useState<number>(14);
  const [months, setMonths] = useState<number>(12);
  const i = rate / 100 / 12;
  const emi = useMemo(() => (i === 0 ? principal / months : principal * i * Math.pow(1 + i, months) / (Math.pow(1 + i, months) - 1)), [principal, i, months]);
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
          <label className="block text-sm font-medium mb-1">Amount (₹)</label>
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
        <div className="p-4 rounded bg-blue-50 border col-span-3">EMI: ₹{emi.toFixed(2)} | Interest: ₹{interest.toFixed(2)}</div>
      </div>
      <div className="h-64">
        <ResultChart data={chartData} centerText={`EMI\n₹${Math.round(emi).toLocaleString()}`} />
      </div>
    </div>
  );
};

const MakingChargesTool: React.FC = () => {
  const [weight, setWeight] = useState<number>(10);
  const [purityPct, setPurityPct] = useState<number>(91.6);
  const [pricePerGram, setPricePerGram] = useState<number>(6500);
  const [makingPct, setMakingPct] = useState<number>(8);
  const [wastagePct, setWastagePct] = useState<number>(2);
  const [gstPct, setGstPct] = useState<number>(3);
  const pureGrams = useMemo(() => (weight * purityPct) / 100, [weight, purityPct]);
  const metalValue = useMemo(() => pureGrams * pricePerGram, [pureGrams, pricePerGram]);
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
          <label className="block text-sm font-medium mb-1">Price/Gram (₹)</label>
          <input type="number" min={0} value={pricePerGram} onChange={(e) => setPricePerGram(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Making (%)</label>
          <input type="number" min={0} step={0.1} value={makingPct} onChange={(e) => setMakingPct(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Wastage (%)</label>
          <input type="number" min={0} step={0.1} value={wastagePct} onChange={(e) => setWastagePct(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">GST (%)</label>
          <input type="number" min={0} step={0.1} value={gstPct} onChange={(e) => setGstPct(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="p-4 rounded bg-emerald-50 border col-span-2">Invoice: ₹{totalInvoice.toFixed(2)}</div>
      </div>
      <div className="h-64">
        <ResultChart data={chartData} centerText={`TOTAL\n₹${Math.round(totalInvoice).toLocaleString()}`} />
      </div>
    </div>
  );
};

const PriceDropTool: React.FC = () => {
  const [prevPrice, setPrevPrice] = useState<number>(2500);
  const [currentPrice, setCurrentPrice] = useState<number>(1999);
  const drop = useMemo(() => Math.max(0, prevPrice - currentPrice), [prevPrice, currentPrice]);
  const dropPct = useMemo(() => (prevPrice > 0 ? (drop / prevPrice) * 100 : 0), [drop, prevPrice]);
  const chartData = [
    { name: 'Prev', value: prevPrice, color: '#60a5fa' },
    { name: 'Now', value: currentPrice, color: '#22c55e' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Previous Price (₹)</label>
          <input type="number" min={0} value={prevPrice} onChange={(e) => setPrevPrice(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Price (₹)</label>
          <input type="number" min={0} value={currentPrice} onChange={(e) => setCurrentPrice(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="p-4 rounded bg-amber-50 border col-span-2">Drop: ₹{drop.toFixed(2)} ({dropPct.toFixed(2)}%)</div>
      </div>
      <div className="h-64">
        <BarChart data={chartData.map(d => ({ name: d.name, value: d.value }))} xKey="name" yKey="value" color="#60a5fa" xLabel="" yLabel="₹" />
      </div>
    </div>
  );
};

const CashbackTool: React.FC = () => {
  const [amount, setAmount] = useState<number>(10000);
  const [cashbackPct, setCashbackPct] = useState<number>(5);
  const [cap, setCap] = useState<number>(1000);
  const cbRaw = useMemo(() => (amount * cashbackPct) / 100, [amount, cashbackPct]);
  const cb = useMemo(() => Math.min(cbRaw, cap), [cbRaw, cap]);
  const effective = useMemo(() => amount - cb, [amount, cb]);
  const chartData = [
    { name: 'Cashback', value: cb, color: '#22c55e' },
    { name: 'Net Pay', value: effective, color: '#f59e0b' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Amount (₹)</label>
          <input type="number" min={0} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cashback (%)</label>
          <input type="number" min={0} step={0.1} value={cashbackPct} onChange={(e) => setCashbackPct(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cap (₹)</label>
          <input type="number" min={0} value={cap} onChange={(e) => setCap(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
      </div>
      <div className="h-64">
        <ResultChart data={chartData} centerText={`CB\n₹${Math.round(cb).toLocaleString()}`} />
      </div>
    </div>
  );
};

const MonthlyGoalTool: React.FC = () => {
  const [targetAmount, setTargetAmount] = useState<number>(50000);
  const [years, setYears] = useState<number>(1);
  const [rate, setRate] = useState<number>(8);
  const periods = years * 12;
  const i = rate / 100 / 12;
  const sipNeeded = useMemo(() => (i === 0 ? targetAmount / periods : targetAmount / (((Math.pow(1 + i, periods) - 1) / i) * (1 + i))), [targetAmount, i, periods]);
  const chartData = [
    { name: 'Target', value: targetAmount, color: '#22c55e' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Target (₹)</label>
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
        <div className="p-4 rounded bg-blue-50 border col-span-3">Required Monthly Savings: ₹{sipNeeded.toFixed(2)}</div>
      </div>
      <div className="h-64">
        <ResultChart data={chartData} centerText={`SIP\n₹${Math.round(sipNeeded).toLocaleString()}/mo`} />
      </div>
    </div>
  );
};

const QuantityEstimatorTool: React.FC = () => {
  const [guests, setGuests] = useState<number>(20);
  const [sweetsPerPerson, setSweetsPerPerson] = useState<number>(2);
  const [bufferPct, setBufferPct] = useState<number>(10);
  const baseQty = useMemo(() => guests * sweetsPerPerson, [guests, sweetsPerPerson]);
  const totalQty = useMemo(() => Math.ceil(baseQty * (1 + bufferPct / 100)), [baseQty, bufferPct]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Guests</label>
        <input type="number" min={0} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Sweets per guest</label>
        <input type="number" min={0} value={sweetsPerPerson} onChange={(e) => setSweetsPerPerson(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Buffer (%)</label>
        <input type="number" min={0} value={bufferPct} onChange={(e) => setBufferPct(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="p-4 rounded bg-amber-50 border">Total Sweets: {totalQty}</div>
    </div>
  );
};

const DonationSplitterTool: React.FC = () => {
  const [items] = useState<BudgetItem[]>([
    { name: 'Education', qty: 1, price: 2000 },
    { name: 'Food Kits', qty: 1, price: 1500 },
    { name: 'Community', qty: 1, price: 1000 },
  ]);
  const total = useMemo(() => items.reduce((s, it) => s + (Number(it.qty || 0) * Number(it.price || 0)), 0), [items]);
  const data = items.map((it, i) => ({ name: it.name, value: (Number(it.qty || 0) * Number(it.price || 0)), color: ['#60a5fa', '#f97316', '#22c55e', '#a78bfa'][i % 4] }));
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BudgetTool tool={{ slug: 'donation', name: 'Donation', type: 'budget', description: 'Donation Plan' }} />
      <div className="h-64">
        <ResultChart data={data} centerText={`TOTAL\n₹${Math.round(total).toLocaleString()}`} />
      </div>
    </div>
  );
};

const CalorieTool: React.FC = () => {
  const [ladoo, setLadoo] = useState<number>(10);
  const [barfi, setBarfi] = useState<number>(8);
  const [kajuKatli, setKajuKatli] = useState<number>(12);
  const cal = useMemo(() => ladoo * 125 + barfi * 117 + kajuKatli * 95, [ladoo, barfi, kajuKatli]);
  const data = [
    { name: 'Ladoo', value: ladoo * 125, color: '#f59e0b' },
    { name: 'Barfi', value: barfi * 117, color: '#22c55e' },
    { name: 'Kaju Katli', value: kajuKatli * 95, color: '#60a5fa' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Ladoo (pcs)</label>
          <input type="number" min={0} value={ladoo} onChange={(e) => setLadoo(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Barfi (pcs)</label>
          <input type="number" min={0} value={barfi} onChange={(e) => setBarfi(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Kaju Katli (pcs)</label>
          <input type="number" min={0} value={kajuKatli} onChange={(e) => setKajuKatli(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="p-4 rounded bg-amber-50 border col-span-3">Total Calories: {cal.toLocaleString()} kcal</div>
      </div>
      <div className="h-64">
        <ResultChart data={data} centerText={`${cal.toLocaleString()}\nkcal`} />
      </div>
    </div>
  );
};

const WishCardTool: React.FC = () => {
  const [name, setName] = useState<string>('Family');
  const [message, setMessage] = useState<string>('Wishing you a Happy Diwali filled with joy and prosperity!');
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">To (name)</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border rounded px-2 py-1" rows={4} />
        </div>
      </div>
      <div className="bg-gradient-to-br from-yellow-100 via-white to-amber-100 border rounded-xl p-6">
        <div className="text-center">
          <div className="text-2xl font-extrabold text-amber-700">Happy Diwali</div>
          <div className="mt-2 text-gray-700">Dear {name},</div>
          <div className="mt-2 text-gray-800">{message}</div>
          <div className="mt-4 text-sm text-amber-800">— MoneyCal.in</div>
        </div>
      </div>
    </div>
  );
};

const ValueMetalTool: React.FC = () => {
  const [metal, setMetal] = useState<string>('Gold');
  const [weight, setWeight] = useState<number>(10);
  const [purityPct, setPurityPct] = useState<number>(91.6);
  const [pricePerGram, setPricePerGram] = useState<number>(6500);
  const pureGrams = useMemo(() => (weight * purityPct) / 100, [weight, purityPct]);
  const value = useMemo(() => pureGrams * pricePerGram, [pureGrams, pricePerGram]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Metal</label>
        <select value={metal} onChange={(e) => setMetal(e.target.value)} className="w-full border rounded px-2 py-1">
          <option>Gold</option>
          <option>Silver</option>
        </select>
      </div>
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
      <div className="md:col-span-4 p-4 rounded bg-emerald-50 border">Estimated {metal} Value: ₹{value.toFixed(2)}</div>
    </div>
  );
};

const MuhuratTool: React.FC = () => {
  const [city, setCity] = useState<string>('Mumbai');
  const [date, setDate] = useState<string>('2025-10-20');
  const [start, setStart] = useState<string>('18:30');
  const [end, setEnd] = useState<string>('20:00');
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">City</label>
        <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Start</label>
        <input type="time" value={start} onChange={(e) => setStart(e.target.value)} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">End</label>
        <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="md:col-span-4 p-4 rounded bg-yellow-50 border">Suggested Muhurat for Lakshmi Puja in {city} on {date}: {start} – {end}. Please verify with your local panchang.</div>
    </div>
  );
};

const FestivalToolPage: React.FC = () => {
  const { festivalSlug, toolSlug } = useParams();
  const found = festivalSlug && toolSlug ? findFestivalTool(festivalSlug, toolSlug) : undefined;
  const resultsRef = useRef<HTMLDivElement>(null);

  if (!found) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold">Tool not found</div>
          <RouterLink to="/festival-tools" className="text-rose-700 underline">Back to Festival Tools</RouterLink>
        </div>
      </div>
    );
  }

  const { festival, tool } = found;

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
    pdf.save(`${festival.slug}-${tool.slug}.pdf`);
  };

  return (
    <>
      <SEOHelmet
        title={`${tool.seo?.title || tool.name} | ${festival.name} | MoneyCal.in`}
        description={tool.seo?.description || tool.description}
        keywords={(tool.seo?.keywords || [festival.slug, tool.slug, 'festival tool']).join(', ')}
        url={`/festival-tools/${festival.slug}/${tool.slug}`}
        type="website"
        image="/images/festival-tools.jpg"
        tags={[festival.slug, tool.slug]}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Festival Tools', url: '/festival-tools' },
          { name: festival.name, url: `/festival-tools/${festival.slug}` },
          { name: tool.name, url: `/festival-tools/${festival.slug}/${tool.slug}` }
        ]}
      />
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            [
              buildSoftwareAppJsonLd(
                `${tool.name} | ${festival.name}`,
                `${window.location.origin}/festival-tools/${festival.slug}/${tool.slug}`,
                tool.description
              ),
              buildFaqJsonLd([
                { q: `How do I use the ${tool.name}?`, a: 'Enter the requested details in the inputs, review the instant results, and export a PDF for record keeping.' },
                { q: `Is the ${tool.name} free?`, a: 'Yes, this tool is completely free to use on MoneyCal.in and works on mobile and desktop.' },
                { q: 'Can I download the results?', a: 'Yes. Click the Download PDF button to save or share your results.' },
                { q: 'Are the results accurate for my city?', a: 'These tools provide intelligent estimates. For legal or accounting needs, consult your advisor.' },
                { q: 'Will more festival tools be added?', a: 'Yes. We regularly publish new festival tools and improvements based on user requests.' }
              ])
            ],
            null,
            2
          )
        }}
      />
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-white to-rose-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <RouterLink to={`/festival-tools/${festival.slug}`} className="flex items-center text-neutral-600 hover:text-neutral-900">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to {festival.name}
            </RouterLink>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{tool.name}</h1>
            <p className="text-gray-600">{tool.description}</p>
          </div>

          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            {tool.type === 'budget' && <BudgetTool tool={tool} />}
            {tool.type === 'electricity' && <ElectricityTool />}
            {tool.type === 'fastingDuration' && <FastingDurationTool />}
            {tool.type === 'zakat' && <ZakatTool />}
            {tool.type === 'travel' && <TravelTool />}
            {tool.type === 'discount' && <DiscountTool />}
            {tool.type === 'emi' && <EMITool />}
            {tool.type === 'makingCharges' && <MakingChargesTool />}
            {tool.type === 'priceDrop' && <PriceDropTool />}
            {tool.type === 'cashback' && <CashbackTool />}
            {tool.type === 'monthlyGoal' && <MonthlyGoalTool />}
            {tool.type === 'quantity' && <QuantityEstimatorTool />}
            {tool.type === 'donation' && <DonationSplitterTool />}
            {tool.type === 'calorie' && <CalorieTool />}
            {tool.type === 'wishCard' && <WishCardTool />}
            {tool.type === 'valueMetal' && <ValueMetalTool />}
            {tool.type === 'muhurat' && <MuhuratTool />}
            {tool.type === 'checklist' && <ChecklistTool />}
            {tool.type === 'compare' && <CompareTool />}
            {tool.type === 'length' && <LengthTool />}
            {tool.type === 'margin' && <MarginTool />}
            {tool.type === 'howMany' && <HowManyTool />}
            {tool.type === 'luckyColor' && <LuckyColorTool />}
            {tool.type === 'symptom' && <SymptomCheckerTool />}
            {tool.type === 'caption' && <CaptionGeneratorTool />}
            {tool.type === 'usage' && <UsageTool />}
            {tool.type === 'score' && <ScoreTrackerTool />}
            {tool.type === 'match' && <CompareTool />}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" /> Related Links
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <RouterLink to="/festival-tools" className="text-blue-600 hover:text-blue-800 underline">All Festival Tools</RouterLink>
                <RouterLink to="/gst-tools/gst-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Calculator</RouterLink>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button onClick={downloadPDF} className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700">
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </button>
          </div>

          <div className="mt-10">
            <ToolArticle
              title={`${tool.name} for ${festival.name}`}
              context={{ name: tool.name, category: 'Festival Tools', keywords: ['festival budget calculator india', 'diwali lights electricity cost', 'navratri fasting meal planner', 'pandal hopping travel cost estimator', 'eid zakat calculator', 'christmas decoration lighting cost'] }}
              links={[
                { href: '/festival-tools', label: 'Festival Tools Hub' },
                { href: '/gold-tools', label: 'Gold Tools' },
                { href: '/finance-tools', label: 'Finance Tools' }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FestivalToolPage;


