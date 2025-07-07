import React, { useState } from "react";

// SEO and Schema imports
import SEOHelmet from "../components/SEOHelmet";

const faqs = [
  {
    q: "What is a Green Energy Investment Calculator?",
    a: "It estimates returns, subsidies, and tax benefits for investments in renewable energy like solar or wind in India."
  },
  {
    q: "What subsidies are available for green energy in India?",
    a: "Subsidies vary by state and type of renewable energy. Central and state governments offer capital and generation-based incentives."
  },
  {
    q: "How are tax benefits calculated?",
    a: "Investors can claim accelerated depreciation and other tax incentives as per Indian tax laws."
  },
  {
    q: "What types of renewable energy can I invest in?",
    a: "Common options include solar, wind, biomass, and small hydro projects."
  },
  {
    q: "How does this calculator help?",
    a: "It provides an estimate of your returns, payback period, and environmental impact, helping you make informed investment decisions."
  }
];

const schemaData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Green Energy Investment Calculator India",
  "description": "Estimates returns on renewable energy investments in India, factoring in subsidies and tax benefits.",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "url": "https://yourdomain.com/calculators/green-energy-investment-calculator",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "featureList": [
    "Estimates returns on renewable energy investments",
    "Calculates subsidies and tax benefits",
    "Supports solar, wind, and other renewables",
    "Shows payback period and CO2 savings"
  ]
};

const states = [
  "Andhra Pradesh", "Delhi", "Gujarat", "Karnataka", "Maharashtra", "Rajasthan", "Tamil Nadu", "Uttar Pradesh", "West Bengal"
];

const energyTypes = ["Solar", "Wind", "Biomass", "Small Hydro"];

function calculateReturns({
  amount,
  years,
  type,
  state,
  subsidy,
  taxBenefit
}: {
  amount: number;
  years: number;
  type: string;
  state: string;
  subsidy: number;
  taxBenefit: number;
}) {
  // Example logic: customize as per real data
  const baseReturnRate = type === "Solar" ? 0.13 : 0.11;
  const grossReturn = amount * Math.pow(1 + baseReturnRate, years);
  const totalSubsidy = amount * (subsidy / 100);
  const totalTaxBenefit = amount * (taxBenefit / 100);
  const netReturn = grossReturn + totalSubsidy + totalTaxBenefit;
  const payback = Math.ceil(amount / ((grossReturn - amount) / years + totalSubsidy / years + totalTaxBenefit / years));
  const co2Saved = amount * 0.8 * years; // Example: 0.8 tons/year per lakh
  return { grossReturn, totalSubsidy, totalTaxBenefit, netReturn, payback, co2Saved };
}

const GreenEnergyInvestmentCalculator: React.FC = () => {
  const [amount, setAmount] = useState(100000);
  const [years, setYears] = useState(10);
  const [type, setType] = useState("Solar");
  const [state, setState] = useState(states[0]);
  const [subsidy, setSubsidy] = useState(20); // %
  const [taxBenefit, setTaxBenefit] = useState(10); // %
  const [result, setResult] = useState<any>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(
      calculateReturns({ amount, years, type, state, subsidy, taxBenefit })
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg mt-6 mb-8">
      <SEOHelmet
        title="Green Energy Investment Calculator India | Returns, Subsidies, Tax Benefits"
        description="Estimate your returns, subsidies, and tax benefits for green energy investments in India. Calculate payback period, CO2 savings, and more."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <h1 className="text-3xl font-bold text-green-700 mb-2 text-center">Green Energy Investment Calculator India</h1>
      <p className="text-gray-700 mb-4 text-center">
        Estimate your returns, subsidies, and tax benefits for investing in renewable energy (solar, wind, etc.) in India. Make informed decisions and contribute to a greener future!
      </p>
      <form onSubmit={handleCalculate} className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Investment Amount (INR)</label>
          <input
            type="number"
            min={10000}
            step={1000}
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            className="mt-1 block w-full rounded border-gray-300 focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Investment Duration (years)</label>
          <input
            type="number"
            min={1}
            max={30}
            value={years}
            onChange={e => setYears(Number(e.target.value))}
            className="mt-1 block w-full rounded border-gray-300 focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type of Renewable Energy</label>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 focus:border-green-500 focus:ring-green-500"
          >
            {energyTypes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <select
            value={state}
            onChange={e => setState(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 focus:border-green-500 focus:ring-green-500"
          >
            {states.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estimated Subsidy (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            value={subsidy}
            onChange={e => setSubsidy(Number(e.target.value))}
            className="mt-1 block w-full rounded border-gray-300 focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estimated Tax Benefit (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            value={taxBenefit}
            onChange={e => setTaxBenefit(Number(e.target.value))}
            className="mt-1 block w-full rounded border-gray-300 focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>
        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow mt-2 w-full md:w-auto"
          >
            Calculate
          </button>
        </div>
      </form>
      {result && (
        <div className="mt-6 bg-green-50 p-4 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Results</h2>
          <ul className="text-gray-800 space-y-1">
            <li><strong>Gross Return:</strong> ₹{result.grossReturn.toLocaleString(undefined, { maximumFractionDigits: 0 })}</li>
            <li><strong>Total Subsidy:</strong> ₹{result.totalSubsidy.toLocaleString(undefined, { maximumFractionDigits: 0 })}</li>
            <li><strong>Total Tax Benefit:</strong> ₹{result.totalTaxBenefit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</li>
            <li><strong>Net Return:</strong> ₹{result.netReturn.toLocaleString(undefined, { maximumFractionDigits: 0 })}</li>
            <li><strong>Estimated Payback Period:</strong> {result.payback} years</li>
            <li><strong>CO₂ Saved:</strong> {result.co2Saved.toLocaleString(undefined, { maximumFractionDigits: 1 })} tons</li>
          </ul>
        </div>
      )}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-green-700 mb-4">About Green Energy Investment in India</h2>
        <p className="text-gray-700 mb-2">
          Green energy investments in India are rapidly growing, supported by government subsidies, tax incentives, and a strong push for sustainability. By investing in solar, wind, or other renewables, you not only earn attractive returns but also contribute to a cleaner environment. Use this calculator to estimate your potential returns, payback period, and environmental impact. Stay updated with the latest policies and incentives for maximum benefits.
        </p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Calculate returns for solar, wind, biomass, and hydro projects</li>
          <li>Factor in state and central subsidies</li>
          <li>Estimate tax benefits under Indian tax laws</li>
          <li>See your environmental impact (CO₂ saved)</li>
        </ul>
      </section>
      <section className="mt-8" id="faq">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border-l-4 border-green-500 p-4 rounded shadow">
              <h3 className="font-semibold text-green-800">Q: {faq.q}</h3>
              <p className="text-gray-700">A: {faq.a}</p>
            </div>
          ))}
        </div>
        {/* FAQPage Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": { "@type": "Answer", "text": faq.a }
            }))
          })
        }} />
      </section>
    </div>
  );
};

export default GreenEnergyInvestmentCalculator; 