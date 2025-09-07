import React, { useMemo, useRef, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { findFestivalTool, FestivalToolConfig } from '../../data/festivalTools';
import { ArrowLeft, Link as LinkIcon, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

const BudgetTool: React.FC<{ tool: FestivalToolConfig }> = ({ tool }) => {
  const [items, setItems] = useState(tool.defaultItems || []);
  const update = (idx: number, patch: any) => setItems(prev => prev.map((r, i) => i === idx ? { ...r, ...patch } : r));
  const add = () => setItems(prev => [...prev, { name: '', qty: 1, price: 0 }]);
  const remove = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx));
  const total = useMemo(() => items.reduce((s, it) => s + (Number(it.qty || 0) * Number(it.price || 0)), 0), [items]);
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
      <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded bg-blue-50 border">Energy: {kwh.toFixed(2)} kWh</div>
        <div className="p-4 rounded bg-amber-50 border">Cost: ₹{cost.toFixed(2)}</div>
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

          <div className="mt-10 prose prose-rose max-w-none">
            <h2>How to use this tool</h2>
            <p>Enter your details and customize the inputs to get instant results. Save or share the PDF report with your family or team.</p>
            <h3>Why this helps</h3>
            <ul>
              <li>Plan better and avoid overspending</li>
              <li>Quickly estimate electricity, travel, or donation values</li>
              <li>SEO-friendly content for discoverability</li>
            </ul>
            <h2>Frequently Asked Questions</h2>
            <h3>Is this tool free?</h3>
            <p>Yes, all festival tools on MoneyCal.in are free and require no login.</p>
            <h3>Can I share the results with family?</h3>
            <p>Use the PDF export to share your plans on WhatsApp or email.</p>
            <h3>Do you store my data?</h3>
            <p>No. Calculations happen on your device; we do not store your entries.</p>
            <h3>Will this work on mobile?</h3>
            <p>Yes. The UI is mobile‑friendly and optimized for small screens.</p>
            <h3>Where can I find more tools?</h3>
            <p>Explore <RouterLink to="/festival-tools" className="text-rose-700 underline">Festival Tools</RouterLink>, <RouterLink to="/gst-tools" className="text-rose-700 underline">GST Tools</RouterLink>, <RouterLink to="/finance-tools" className="text-rose-700 underline">Finance Tools</RouterLink>, and <RouterLink to="/corporate-finance" className="text-rose-700 underline">Corporate Finance</RouterLink>.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FestivalToolPage;


