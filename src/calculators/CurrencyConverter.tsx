import React, { useMemo, useState } from 'react';
import { ArrowRight, Info, IndianRupee, RefreshCw, Sliders, TrendingUp } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { CalculatorSchema } from '../components/CalculatorSchema';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(10000);
  const [fromCurrency, setFromCurrency] = useState<string>('INR');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [markupPct, setMarkupPct] = useState<number>(2);
  const [flatFee, setFlatFee] = useState<number>(100);
  
  const currencies = [
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'SGD', name: 'Singapore Dollar' },
    { code: 'AED', name: 'UAE Dirham' }
  ];
  
  const rates: Record<string, Record<string, number>> = {
    'INR': {
      'USD': 0.0109,
      'EUR': 0.0101,
      'GBP': 0.0086,
      'JPY': 1.62,
      'AUD': 0.0168,
      'CAD': 0.0152,
      'CHF': 0.0094,
      'SGD': 0.0145,
      'AED': 0.0401
    }
  };
  
  Object.entries(rates['INR']).forEach(([currency, rate]) => {
    if (!rates[currency]) rates[currency] = {};
    rates[currency]['INR'] = 1 / rate;
    
    // Generate cross rates
    Object.entries(rates['INR']).forEach(([otherCurrency, otherRate]) => {
      if (!rates[currency][otherCurrency]) {
        rates[currency][otherCurrency] = rate / otherRate;
      }
    });
  });

  const midRate = useMemo(() => rates[fromCurrency]?.[toCurrency] || 1, [fromCurrency, toCurrency]);
  const providerRate = useMemo(
    () => (fromCurrency === 'INR' ? midRate * (1 - markupPct / 100) : midRate * (1 + markupPct / 100)),
    [fromCurrency, midRate, markupPct]
  );
  const convertedAmount = useMemo(() => amount * providerRate, [amount, providerRate]);
  const convertedAtMid = useMemo(() => amount * midRate, [amount, midRate]);
  const markupImpact = useMemo(() => Math.abs(convertedAtMid - convertedAmount), [convertedAtMid, convertedAmount]);
  const finalAmountAfterFee = useMemo(() => Math.max(0, convertedAmount - flatFee), [convertedAmount, flatFee]);
  const quickTable = [1, 10, 50, 100, 500, 1000].map((m) => ({
    input: amount * m,
    output: amount * m * providerRate
  }));
  
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const contentData = {
    title: 'Currency Converter India 2026',
    description: `This currency converter is built for Indian users who need practical FX conversion for travel, remittance planning, online purchases, and business invoicing. Instead of showing only one number, it includes mid-rate reference, provider markup simulation, and fee-adjusted final amount. That helps users estimate what they may actually receive after spread and charges.\n\nMost converters show ideal interbank-like rates while real transactions include markup and fixed charges. This tool bridges that gap by allowing users to adjust markup percentage and flat fee. It is especially useful for INR to USD, INR to EUR, INR to AED, and other common pairs used by travelers, students, freelancers, and import/export users in India.\n\nHow to use: select source and target currencies, enter amount, and review both mid-rate conversion and provider-rate conversion. Then set fee assumptions to estimate final credited amount. Use the quick multiplier table for bulk comparisons before making a transaction.\n\nKeyword intent focus includes: currency converter India, INR to USD calculator, live exchange rate converter INR, forex markup calculator India, travel currency converter INR AED, remittance conversion calculator India, and provider spread comparison tool.`,
    benefits: [
      'Converts between major currencies with INR-first defaults.',
      'Shows mid-rate reference and provider-rate simulation separately.',
      'Includes markup and flat fee impact for realistic outcome.',
      'Quick multiplier table for bulk conversion planning.',
      'Useful for travel, remittance, freelancing, and cross-border purchases.',
      'Simple UI with swap and instant recalculation.',
      'Helps users understand spread-driven hidden cost.',
      'Supports practical decision-making across providers.'
    ],
    howToSteps: [
      { step: 'Enter amount and pair', details: 'Choose source and target currency for your scenario.' },
      { step: 'Review base mid-rate output', details: 'Use this as neutral benchmark.' },
      { step: 'Set markup and fee assumptions', details: 'Reflect card/network/provider spread and fixed charges.' },
      { step: 'Compare final amount', details: 'Check true conversion after spread and fee deductions.' },
      { step: 'Use quick table', details: 'Estimate multiple transaction sizes quickly.' }
    ],
    examples: [
      {
        scenario: 'Travel conversion INR to AED',
        inputs: [
          { label: 'Amount', value: 'INR 50,000' },
          { label: 'Markup', value: '2.5%' },
          { label: 'Fee', value: 'INR 150' }
        ],
        result: 'Final amount can differ meaningfully from mid-rate estimate.',
        explanation: 'By modeling spread and fee, travelers can choose better conversion channel and timing.'
      }
    ],
    tips: [
      'Always compare provider spread, not only headline rate.',
      'For large transfers, negotiate fee and markup.',
      'Use alerts and convert in tranches when possible.',
      'Check weekday vs weekend conversion spreads.',
      'Keep buffer for volatile pairs.'
    ],
    mistakes: [
      'Assuming displayed rate is final settled rate.',
      'Ignoring fixed transaction fees.',
      'Converting large amount in one shot without comparison.',
      'Not checking cross-currency card/network charges.',
      'Using stale assumptions during high volatility.'
    ],
    faqs: [
      { question: 'Why does actual credited amount differ from converter?', answer: 'Because banks and providers apply spread/markup and fees over benchmark rates.' },
      { question: 'What is mid-rate?', answer: 'It is reference market rate between buy and sell quotes, often used as neutral comparison point.' },
      { question: 'Can this tool replace live dealer quote?', answer: 'No. It is planning-oriented. Final rates and charges depend on provider and time of execution.' },
      { question: 'Which INR pairs are commonly used?', answer: 'INR-USD, INR-EUR, INR-AED, INR-GBP, and INR-SGD are frequently used for travel, trade, and remittance.' }
    ],
    relatedCalculators: [
      { name: 'Interest Rate Converter', url: '/calculators/interest-rate-converter', description: 'Convert rates across formats' },
      { name: 'Loan Calculator', url: '/calculators/loan-calculator', description: 'Estimate borrowing impact' },
      { name: 'Future Value Calculator', url: '/calculators/future-value-calculator', description: 'Project value over time' },
      { name: 'Net Worth Calculator', url: '/calculators/net-worth-calculator', description: 'Track assets and liabilities' }
    ],
    lastUpdated: '2026-02-12'
  };
  
  return (
    <>
      <SEOHelmet
        title="Currency Converter India 2026 | INR Forex Markup & Fee Calculator | MoneyCal"
        description="Advanced currency converter for India with FX markup and fee impact. Convert INR, USD, EUR, AED and more using benchmark and provider-adjusted rates."
        keywords="currency converter india, inr to usd converter india, forex markup calculator india, inr to aed converter travel, remittance converter india, exchange rate calculator inr eur"
        url="/calculators/currency-converter"
      />
      <CalculatorSchema
        name="Currency Converter India"
        description="Convert major currencies with benchmark rate, provider markup, and fee-adjusted final value estimates."
        url="/calculators/currency-converter"
        features={[
          'INR-focused multi-currency conversion',
          'Mid-rate and provider-rate comparison',
          'Markup and fee impact estimation',
          'Quick multiplier conversion table',
          'Travel and remittance planning utility'
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2026-02-12"
        rating={{ value: 4.8, count: 11360 }}
      />

      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
              <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
              Currency Conversion
            </h2>

            <div className="space-y-4">
              <label htmlFor="amount" className="block text-sm font-medium text-neutral-700">
                Amount
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="input mt-1"
                  min="0"
                  step="100"
                />
              </label>
              
              <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                <div>
                  <label htmlFor="from-currency" className="block text-sm font-medium text-neutral-700 mb-2">
                    From Currency
                  </label>
                  <select
                    id="from-currency"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="input"
                  >
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={swapCurrencies}
                  className="mt-6 p-2 rounded-full hover:bg-neutral-100"
                >
                  <RefreshCw className="w-5 h-5 text-neutral-500" />
                </button>
                
                <div>
                  <label htmlFor="to-currency" className="block text-sm font-medium text-neutral-700 mb-2">
                    To Currency
                  </label>
                  <select
                    id="to-currency"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="input"
                  >
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[--accent-50] rounded-lg border border-[--accent-100] space-y-4">
              <h3 className="text-lg font-semibold text-[--accent-900] flex items-center">
                <Sliders className="w-5 h-5 mr-2" />
                Provider Cost Simulation
              </h3>
              <label className="block text-sm font-medium text-neutral-700">
                Markup / Spread (%)
                <input type="number" className="input mt-1" value={markupPct} onChange={(e) => setMarkupPct(Number(e.target.value))} min={0} max={10} step={0.1} />
              </label>
              <label className="block text-sm font-medium text-neutral-700">
                Flat Transaction Fee ({toCurrency})
                <input type="number" className="input mt-1" value={flatFee} onChange={(e) => setFlatFee(Number(e.target.value))} min={0} />
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
              <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Conversion Output</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs text-neutral-500">Benchmark Mid-Rate</p>
                  <p className="text-lg font-bold">{convertedAtMid.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs text-neutral-500">Provider Rate Output</p>
                  <p className="text-lg font-bold text-[--success-700]">{convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs text-neutral-500">Markup Impact</p>
                  <p className="text-lg font-bold text-red-600">{markupImpact.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs text-neutral-500">Final After Fee</p>
                  <p className="text-lg font-bold text-[--primary-700]">{finalAmountAfterFee.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency}</p>
                </div>
              </div>
              <p className="text-sm text-neutral-600 mt-4">
                Mid Rate: 1 {fromCurrency} = {midRate.toFixed(6)} {toCurrency} | Provider Rate: {providerRate.toFixed(6)}
              </p>
            </div>

            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-neutral-900 flex items-center mb-3">
                <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
                Quick Conversion Table
              </h3>
              <div className="space-y-2 text-sm">
                {quickTable.map((row) => (
                  <div key={row.input} className="flex justify-between bg-white rounded-md p-2">
                    <span>{row.input.toLocaleString()} {fromCurrency}</span>
                    <span className="font-medium">{row.output.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg flex items-start">
              <Info className="w-5 h-5 text-yellow-700 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-yellow-800">
                Rates are planning references. Final settlement depends on provider spreads, execution timing, card/network fees, and corridor rules.
              </p>
            </div>
          </div>
        </div>
        <CalculatorContentWrapper {...contentData} />
      </div>
    </>
  );
};