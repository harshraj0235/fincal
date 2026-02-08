import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { CreditCard, Calendar, ArrowRight, Info, ExternalLink } from 'lucide-react';

const PROVIDERS = [
  { key: 'custom', name: 'Custom', url: '' },
  { key: 'zestmoney', name: 'ZestMoney', url: 'https://www.zestmoney.in/' },
  { key: 'simpl', name: 'Simpl', url: 'https://getsimpl.com/' },
  { key: 'lazypay', name: 'LazyPay', url: 'https://www.lazypay.in/' },
  { key: 'flipkart', name: 'Flipkart Pay Later', url: 'https://www.flipkart.com/' },
  { key: 'amazon', name: 'Amazon Pay Later', url: 'https://www.amazon.in/' },
];

const CITIES = ['Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Kolkata', 'Other'];

export const BnplCalculator: React.FC = () => {
  // Core state
  const [purchaseAmount, setPurchaseAmount] = useState(10000);
  const [tenure, setTenure] = useState(3);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [processingFee, setProcessingFee] = useState(0);
  const [latePaymentFee, setLatePaymentFee] = useState(500);
  const [provider, setProvider] = useState<'custom' | 'zestmoney' | 'simpl' | 'lazypay' | 'flipkart' | 'amazon'>('custom');
  // Advanced input
  const [salary, setSalary] = useState(40000);
  const [creditScore, setCreditScore] = useState(700);
  const [city, setCity] = useState(CITIES[0]);

  // Calculated
  const [installmentAmount, setInstallmentAmount] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalFees, setTotalFees] = useState(0);
  const [apr, setApr] = useState(0);
  const [installmentDates, setInstallmentDates] = useState<string[]>([]);
  const [eligibility, setEligibility] = useState<string>('');

  // Provider presets
  useEffect(() => {
    if (provider !== 'custom') {
      switch (provider) {
        case 'zestmoney':
          setInterestRate(24);
          setProcessingFee(2);
          setTenure(3);
          setDownPayment(0);
          break;
        case 'simpl':
          setInterestRate(0);
          setProcessingFee(0);
          setTenure(1);
          setDownPayment(0);
          break;
        case 'lazypay':
          setInterestRate(0);
          setProcessingFee(0);
          setTenure(1);
          setDownPayment(0);
          break;
        case 'flipkart':
          setInterestRate(14);
          setProcessingFee(1.5);
          setTenure(3);
          setDownPayment(0);
          break;
        case 'amazon':
          setInterestRate(18);
          setProcessingFee(1.2);
          setTenure(6);
          setDownPayment(0);
          break;
      }
    }
  }, [provider]);

  // Installment calculation
  useEffect(() => {
    const processingFeeAmount = (purchaseAmount * processingFee) / 100;
    const loanAmount = purchaseAmount - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    let installment = 0;
    if (interestRate === 0) {
      installment = loanAmount / tenure;
    } else {
      installment =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
        (Math.pow(1 + monthlyRate, tenure) - 1);
    }
    const totalPay = installment * tenure + downPayment + processingFeeAmount;
    const totalInt = totalPay - purchaseAmount - processingFeeAmount;
    setInstallmentAmount(installment);
    setTotalPayable(totalPay);
    setTotalInterest(totalInt);
    setTotalFees(processingFeeAmount);
    setApr((totalInt / loanAmount) * (12 / tenure) * 100);

    // Payment schedule
    const dates: string[] = [];
    const currentDate = new Date();
    for (let i = 1; i <= tenure; i++) {
      const date = new Date(currentDate);
      date.setMonth(currentDate.getMonth() + i);
      dates.push(
        date.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      );
    }
    setInstallmentDates(dates);
  }, [purchaseAmount, tenure, downPayment, interestRate, processingFee]);

  // Eligibility logic (very basic simulation)
  useEffect(() => {
    if (creditScore < 600) setEligibility('Low: Most BNPL providers may reject.');
    else if (salary < 15000) setEligibility('Low: Income below ₹15,000/month makes approval unlikely.');
    else if (creditScore > 800 && salary > 50000)
      setEligibility('Excellent: Instant approvals likely on most platforms.');
    else setEligibility('Good: Likely eligible for most BNPL offers.');
  }, [salary, creditScore]);

  // Comparison to Credit Card EMI (India market rates)
  const ccEmiRate = 18;
  const ccEmi = ((purchaseAmount - downPayment) * (ccEmiRate / 12 / 100) * Math.pow(1 + ccEmiRate / 12 / 100, tenure)) /
    (Math.pow(1 + ccEmiRate / 12 / 100, tenure) - 1);

  // ---- SEO JSON-LD FAQ & Rich Snippet ----
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What is a BNPL calculator?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text':
            'A BNPL (Buy Now, Pay Later) calculator helps you estimate your monthly installments, total payable amount, and interest for BNPL schemes offered by Indian fintech companies.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Which BNPL providers are popular in India?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text':
            'Popular BNPL providers in India include ZestMoney, Simpl, LazyPay, Flipkart Pay Later, and Amazon Pay Later.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Is BNPL better than credit card EMI?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text':
            'BNPL can be cheaper than credit card EMI for short tenures and zero-interest offers, but always check the processing fees and late payment charges.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Does BNPL affect my CIBIL score?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text':
            'Yes, missed payments or defaults on BNPL can negatively impact your credit score. Make sure to pay your installments on time.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How is the BNPL installment calculated?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text':
            'The BNPL installment is calculated based on purchase amount, tenure, interest rate, processing fees, and any down payment. This calculator uses the standard EMI formula for interest-bearing plans.',
        },
      },
    ],
  };

  // ---- Main Render ----
  return (
    <main className="max-w-5xl mx-auto px-2 py-8" itemScope itemType="https://schema.org/FinancialProduct">
      {/* SEO is handled globally by SEOHelmet via CalculatorPage */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* End SEO */}

      <h1 className="text-3xl font-bold mb-2" itemProp="name">
        BNPL Calculator India <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-base ml-2">2024</span>
      </h1>
      <p className="mb-4 text-lg text-neutral-700" itemProp="description">
        Free Buy Now Pay Later (BNPL) EMI calculator for Indian shoppers. Calculate installments, compare with credit card EMI, check eligibility, and more. <strong>Updated as per <a href="https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12361" rel="noopener noreferrer" target="_blank" className="text-blue-700 underline">RBI guidelines</a>.</strong>
      </p>
      {/* Internal Links */}
      <div className="mb-6 flex gap-4 flex-wrap text-sm">
        <a href="/" className="text-blue-600 underline">🏠 Home</a>
        <a href="/calculators/EmiCalculator" className="text-blue-600 underline">📊 EMI Calculator</a>
        <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center gap-1">
          RBI <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* User Inputs */}
      <section className="bg-white p-6 shadow rounded-lg mb-8" aria-label="BNPL Calculator Form">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Core Inputs */}
          <div>
            <label className="block font-medium mb-1">BNPL Provider</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {PROVIDERS.map((prov) => (
                <button
                  key={prov.key}
                  type="button"
                  aria-label={prov.name}
                  className={`px-3 py-1 rounded border ${provider === prov.key ? 'bg-blue-100 border-blue-400 font-bold' : 'bg-neutral-50 border-neutral-300'}`}
                  onClick={() => setProvider(prov.key as any)}
                >
                  {prov.name}
                </button>
              ))}
            </div>
            <label className="block mb-1">Purchase Amount (₹)</label>
            <input
              type="number"
              min={1000}
              max={200000}
              step={500}
              value={purchaseAmount}
              onChange={e => setPurchaseAmount(Number(e.target.value))}
              className="w-full border rounded p-2 mb-4"
              required
              inputMode="numeric"
            />
            <label className="block mb-1">Tenure (Months)</label>
            <input
              type="number"
              min={1}
              max={24}
              value={tenure}
              onChange={e => setTenure(Number(e.target.value))}
              className="w-full border rounded p-2 mb-4"
              required
              inputMode="numeric"
            />
            <label className="block mb-1">Down Payment (₹)</label>
            <input
              type="number"
              min={0}
              max={purchaseAmount * 0.6}
              step={500}
              value={downPayment}
              onChange={e => setDownPayment(Number(e.target.value))}
              className="w-full border rounded p-2 mb-4"
              inputMode="numeric"
            />
          </div>
          {/* Advanced Inputs */}
          <div>
            <label className="block mb-1">Interest Rate (% p.a.)</label>
            <input
              type="number"
              min={0}
              max={36}
              step={0.1}
              value={interestRate}
              onChange={e => setInterestRate(Number(e.target.value))}
              className="w-full border rounded p-2 mb-4"
              inputMode="decimal"
            />
            <label className="block mb-1">Processing Fee (%)</label>
            <input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={processingFee}
              onChange={e => setProcessingFee(Number(e.target.value))}
              className="w-full border rounded p-2 mb-4"
              inputMode="decimal"
            />
            <label className="block mb-1">Late Payment Fee (₹)</label>
            <input
              type="number"
              min={0}
              max={3000}
              step={100}
              value={latePaymentFee}
              onChange={e => setLatePaymentFee(Number(e.target.value))}
              className="w-full border rounded p-2 mb-4"
              inputMode="numeric"
            />
            {/* User Data */}
            <label className="block mb-1">Your Monthly Salary (₹)</label>
            <input
              type="number"
              min={5000}
              max={500000}
              step={1000}
              value={salary}
              onChange={e => setSalary(Number(e.target.value))}
              className="w-full border rounded p-2 mb-4"
              inputMode="numeric"
            />
            <label className="block mb-1">Your CIBIL/Credit Score</label>
            <input
              type="number"
              min={300}
              max={900}
              value={creditScore}
              onChange={e => setCreditScore(Number(e.target.value))}
              className="w-full border rounded p-2 mb-4"
              inputMode="numeric"
            />
            <label className="block mb-1">Your City</label>
            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </form>
        {/* Eligibility */}
        <div className="mt-2 text-sm flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-500" />
          <span className="font-semibold">Eligibility: </span>
          <span>{eligibility}</span>
        </div>
      </section>

      {/* --- Output --- */}
      <section className="mb-8 grid md:grid-cols-2 gap-6">
        {/* Payment Summary */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 mb-6" aria-label="Payment Summary">
          <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" /> BNPL Payment Summary
          </h2>
          <div className="mb-2 text-lg">
            <strong>Installment:</strong> {formatCurrency(installmentAmount)} x {tenure} months
          </div>
          <div>Total Payable: <span className="font-bold">{formatCurrency(totalPayable)}</span></div>
          <div>Processing Fee: {formatCurrency(totalFees)}</div>
          <div>Total Interest: {formatCurrency(totalInterest)}</div>
          <div>Effective APR: <span className="font-bold">{apr.toFixed(2)}%</span></div>
          {interestRate === 0 && <div className="text-green-700 mt-2">No interest! Check for hidden fees.</div>}
        </div>
        {/* Payment Schedule */}
        <div className="bg-white rounded-lg p-6 border border-neutral-100" aria-label="Payment Schedule">
          <h2 className="font-semibold text-xl mb-4 flex items-center gap-2"><Calendar className="w-5 h-5" /> Payment Schedule</h2>
          {downPayment > 0 && (
            <div className="mb-2">Down Payment: <span className="font-bold">{formatCurrency(downPayment)}</span> (due now)</div>
          )}
          <ul className="list-decimal ml-4">
            {installmentDates.map((date, i) => (
              <li key={i} className="mb-1 flex justify-between">
                <span>Installment {i + 1}: <span className="text-neutral-700">{date}</span></span>
                <span>{formatCurrency(installmentAmount)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Market Comparison (Credit Card EMI) */}
      <section className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-8">
        <h3 className="font-semibold text-lg">Credit Card EMI Comparison</h3>
        <div>
          Typical credit card EMI ({ccEmiRate}% p.a.): <strong>{formatCurrency(ccEmi)} x {tenure} months</strong>
        </div>
        <div>
          BNPL {interestRate > 0 ? `(${interestRate}% p.a.)` : '(No interest)'}: <strong>{formatCurrency(installmentAmount)} x {tenure} months</strong>
        </div>
        <p className="text-sm text-neutral-700 mt-2">
          <a href="https://www.paisabazaar.com/credit-card/emi-conversion/" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">Learn more about Credit Card EMI</a>
        </p>
      </section>

      {/* Info & External Providers */}
      <section className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-neutral-100">
          <h2 className="font-semibold text-lg mb-2">Popular BNPL Providers in India</h2>
          <ul className="space-y-2 text-sm">
            {PROVIDERS.filter(x => x.key !== 'custom').map((prov) => (
              <li key={prov.key}>
                <a href={prov.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                  {prov.name} <ExternalLink className="w-3 h-3 inline" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg p-6 border border-neutral-100">
          <h2 className="font-semibold text-lg mb-2">BNPL Safety Tips</h2>
          <ul className="list-disc ml-4 text-sm">
            <li>Always pay on time to avoid late fees ({formatCurrency(latePaymentFee)}/missed payment).</li>
            <li>Read the <a href="https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12361" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">RBI BNPL guidelines</a>.</li>
            <li>Compare BNPL with credit card EMI before choosing.</li>
            <li>Ensure your provider reports to CIBIL/credit bureaus.</li>
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#f8f9fb] rounded-lg p-6 mb-8" id="bnpl-faq" aria-label="BNPL Calculator FAQs">
        <h2 className="font-semibold text-2xl mb-4">Frequently Asked Questions – BNPL Calculator</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-bold">What is Buy Now Pay Later (BNPL)?</dt>
            <dd>
              BNPL lets you purchase products now and pay for them later, often in interest-free or low-interest installments. It's popular among Indian shoppers for both online and offline purchases.
            </dd>
          </div>
          <div>
            <dt className="font-bold">Are BNPL schemes safe in India?</dt>
            <dd>
              RBI has issued <a href="https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12361" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">guidelines</a> to protect users. Always check the provider's terms and your eligibility.
            </dd>
          </div>
          <div>
            <dt className="font-bold">Does using BNPL impact my CIBIL score?</dt>
            <dd>Yes, delayed or missed payments can affect your credit score.</dd>
          </div>
          <div>
            <dt className="font-bold">What is the difference between BNPL and EMI on credit cards?</dt>
            <dd>
              BNPL may offer zero-interest for short tenures, but credit card EMI often has higher interest. Always compare, as shown above.
            </dd>
          </div>
          <div>
            <dt className="font-bold">How to use this BNPL calculator?</dt>
            <dd>
              Enter the loan details, select a provider, and see your EMI, total payable, and payment schedule instantly.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
};

export default BnplCalculator;
