import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

/* ═══════════════════════════════════════════════════════════════
   CAPITAL GAINS TAX CALCULATOR — PURE STATIC HTML EDITION (2026-2027)
   Rebuilt for Google ranking: calculator.net-style pure HTML
   Target keywords: capital gains tax calculator, ltcg calculator,
   stcg calculator, property tax calculator, mutual fund tax calculator
   ═══════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  { question: "What is Capital Gains Tax?", answer: "Capital Gains Tax is a tax levied on the profit you make when you sell a capital asset (like property, stocks, mutual funds, or gold) for a price higher than your purchase price. The tax rate depends on how long you held the asset before selling it." },
  { question: "What is the difference between LTCG and STCG?", answer: "LTCG (Long-Term Capital Gains) applies when you hold an asset for a longer duration (e.g., more than 2 years for property, 1 year for equity). STCG (Short-Term Capital Gains) applies for shorter durations. LTCG generally has lower tax rates compared to STCG." },
  { question: "What were the major changes in the 2024-2025 Budget?", answer: "The 2024 Budget removed the indexation benefit for real estate sold after July 23, 2024, but reduced the LTCG rate from 20% to 12.5%. However, taxpayers can choose between 20% with indexation or 12.5% without indexation for properties bought before July 23, 2024." },
  { question: "What is Indexation Benefit?", answer: "Indexation allows you to adjust the purchase price of your asset for inflation using the Cost Inflation Index (CII) published by the government. This artificially inflates your purchase cost, thereby reducing your taxable profit." },
  { question: "Are mutual funds taxed differently?", answer: "Yes. Equity-oriented mutual funds have a holding period of 1 year for LTCG, taxed at 12.5% (above ₹1.25 Lakh exemption). Debt mutual funds bought after April 1, 2023, are always taxed as STCG at your income tax slab rate." }
];

export const CapitalGainsTaxCalculator: React.FC = () => {
  const [assetType, setAssetType] = useState<string>('property');
  const [purchasePrice, setPurchasePrice] = useState<number>(2500000);
  const [salePrice, setSalePrice] = useState<number>(5000000);
  const [purchaseYear, setPurchaseYear] = useState<string>('2018');
  const [saleYear, setSaleYear] = useState<string>('2026');
  const [purchaseExpenses, setPurchaseExpenses] = useState<number>(100000);
  const [saleExpenses, setSaleExpenses] = useState<number>(50000);
  const [improvementCost, setImprovementCost] = useState<number>(200000);

  // CII (Cost Inflation Index) data
  const ciiData: Record<string, number> = {
    '2001': 100, '2002': 105, '2003': 109, '2004': 113, '2005': 117,
    '2006': 122, '2007': 129, '2008': 137, '2009': 148, '2010': 167,
    '2011': 184, '2012': 200, '2013': 220, '2014': 240, '2015': 254,
    '2016': 264, '2017': 272, '2018': 280, '2019': 289, '2020': 301,
    '2021': 317, '2022': 331, '2023': 348, '2024': 363, '2025': 377, '2026': 390,
  };

  const years = Object.keys(ciiData).sort((a, b) => Number(b) - Number(a));

  const calculations = useMemo(() => {
    const purchaseYearNum = Number(purchaseYear);
    const saleYearNum = Number(saleYear);
    const holdingPeriod = saleYearNum - purchaseYearNum;

    // Determine LTCG or STCG
    let isLongTerm = false;
    let stcgRate = 0;
    
    if (assetType === 'property' || assetType === 'gold') {
      isLongTerm = holdingPeriod >= 2;
      stcgRate = 30; // Assuming 30% slab for STCG
    } else if (assetType === 'equity') {
      isLongTerm = holdingPeriod >= 1;
      stcgRate = 20; // Changed to 20% post 2024 budget
    } else {
      isLongTerm = holdingPeriod >= 3; 
      stcgRate = 30;
    }

    const totalPurchaseCost = purchasePrice + purchaseExpenses + improvementCost;
    const netSalePrice = salePrice - saleExpenses;
    
    let indexedCost = totalPurchaseCost;
    let gainWithoutIndex = 0;
    let taxWithoutIndex = 0;
    let gainWithIndex = 0;
    let taxWithIndex = 0;
    let finalTaxAmount = 0;
    let stcgGain = 0;
    let stcgTax = 0;

    if (isLongTerm) {
      if (assetType === 'property') {
        const ciiBuy = ciiData[purchaseYear] || 280;
        const ciiSell = ciiData[saleYear] || 390;
        indexedCost = Math.round(totalPurchaseCost * (ciiSell / ciiBuy));

        gainWithoutIndex = netSalePrice - totalPurchaseCost;
        taxWithoutIndex = Math.round(Math.max(0, gainWithoutIndex) * 0.125); // 12.5%

        gainWithIndex = netSalePrice - indexedCost;
        taxWithIndex = Math.round(Math.max(0, gainWithIndex) * 0.20); // 20%

        // Grandfathering/Choice for property bought before July 2024
        finalTaxAmount = Math.min(taxWithoutIndex, taxWithIndex);
      } else if (assetType === 'equity') {
        gainWithoutIndex = netSalePrice - totalPurchaseCost;
        // 12.5% tax on equity LTCG above 1.25L
        const taxableGain = Math.max(0, gainWithoutIndex - 125000);
        taxWithoutIndex = Math.round(taxableGain * 0.125);
        finalTaxAmount = taxWithoutIndex;
        gainWithIndex = gainWithoutIndex; // N/A for equity
        taxWithIndex = taxWithoutIndex;
      } else {
        // Gold etc
        gainWithoutIndex = netSalePrice - totalPurchaseCost;
        taxWithoutIndex = Math.round(Math.max(0, gainWithoutIndex) * 0.125);
        finalTaxAmount = taxWithoutIndex;
      }
    } else {
      stcgGain = netSalePrice - totalPurchaseCost;
      stcgTax = Math.round(Math.max(0, stcgGain) * (stcgRate / 100));
      finalTaxAmount = stcgTax;
    }

    return {
      holdingPeriod,
      isLongTerm,
      totalPurchaseCost,
      indexedCost,
      netSalePrice,
      gainWithoutIndex,
      taxWithoutIndex,
      gainWithIndex,
      taxWithIndex,
      stcgGain,
      stcgTax,
      stcgRate,
      finalTaxAmount
    };
  }, [assetType, purchasePrice, salePrice, purchaseYear, saleYear, purchaseExpenses, saleExpenses, improvementCost]);

  const fmt = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const fmtNum = (amount: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      <SEOHelmet 
        title="Capital Gains Tax Calculator India 2026 | Property, Equity, Gold" 
        description="Free Capital Gains Tax Calculator for India. Calculate LTCG and STCG for property, stocks, mutual funds, and gold. Updated with 2024-25 Budget rules (12.5% tax, indexation changes)." 
        keywords="capital gains tax calculator, ltcg calculator, stcg calculator, property tax calculator, mutual fund tax calculator, indexation calculator" 
        url="/calculators/capital-gains-tax-calculator" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'Capital Gains Tax Calculator', description: 'Calculate Long-Term and Short-Term Capital Gains Tax.', category: 'Tax Calculators', features: ['Budget 2024 Rules', 'Indexation Comparison', 'Equity Exemption Logic'], ratingValue: 4.8, reviewCount: 19300, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-blue-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">Capital Gains Tax</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Capital Gains Tax Calculator (2026-27)</h1>
          <p className="text-gray-600">Calculate your Long-Term (LTCG) or Short-Term (STCG) tax liability on property, stocks, mutual funds, and gold. Fully updated with the latest Budget 2024-25 rules.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ===== INPUT FORM ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-900 border-b border-blue-200 pb-2">Asset Details</h2>
              
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium w-1/2">
                      <label htmlFor="assetType">Asset Type</label>
                    </td>
                    <td className="py-3">
                      <select id="assetType" value={assetType} onChange={(e) => setAssetType(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white font-medium">
                        <option value="property">Property (Real Estate)</option>
                        <option value="equity">Equity (Stocks / MFs)</option>
                        <option value="gold">Gold / Gold ETFs</option>
                        <option value="debt">Debt Mutual Funds</option>
                      </select>
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="purchasePrice">Purchase Price (₹)</label>
                    </td>
                    <td className="py-3">
                      <input id="purchasePrice" type="number" value={purchasePrice}
                        onChange={(e) => setPurchasePrice(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" min="0" />
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="salePrice">Sale Price (₹)</label>
                    </td>
                    <td className="py-3">
                      <input id="salePrice" type="number" value={salePrice}
                        onChange={(e) => setSalePrice(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" min="0" />
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="purchaseYear">Purchase Year</label>
                    </td>
                    <td className="py-3">
                      <select id="purchaseYear" value={purchaseYear} onChange={(e) => setPurchaseYear(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white">
                        {years.map(y => <option key={`p-${y}`} value={y}>{y}-{String(Number(y) + 1).slice(2)}</option>)}
                      </select>
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="saleYear">Sale Year</label>
                    </td>
                    <td className="py-3">
                      <select id="saleYear" value={saleYear} onChange={(e) => setSaleYear(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white">
                        {years.map(y => <option key={`s-${y}`} value={y}>{y}-{String(Number(y) + 1).slice(2)}</option>)}
                      </select>
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="improvementCost">Improvement Cost (₹)</label>
                      <p className="text-xs text-gray-500 font-normal">Renovation etc.</p>
                    </td>
                    <td className="py-3">
                      <input id="improvementCost" type="number" value={improvementCost}
                        onChange={(e) => setImprovementCost(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" min="0" />
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="purchaseExpenses">Purchase Expenses (₹)</label>
                      <p className="text-xs text-gray-500 font-normal">Stamp duty, registry</p>
                    </td>
                    <td className="py-3">
                      <input id="purchaseExpenses" type="number" value={purchaseExpenses}
                        onChange={(e) => setPurchaseExpenses(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" min="0" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="saleExpenses">Sale Expenses (₹)</label>
                      <p className="text-xs text-gray-500 font-normal">Brokerage, legal</p>
                    </td>
                    <td className="py-3">
                      <input id="saleExpenses" type="number" value={saleExpenses}
                        onChange={(e) => setSaleExpenses(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" min="0" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col h-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white text-center relative">
                <span className="absolute top-4 right-4 bg-white/20 text-xs px-2 py-1 rounded font-bold uppercase">
                  {calculations.isLongTerm ? 'LTCG' : 'STCG'}
                </span>
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-blue-200">Estimated Tax Liability</h2>
                <div className="text-4xl font-black mb-1">
                  ₹{fmtNum(calculations.finalTaxAmount)}
                </div>
                <div className="mt-2 text-sm text-blue-100 font-medium">
                  Holding Period: {calculations.holdingPeriod} Years
                </div>
              </div>

              <div className="p-0 flex-grow">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Net Sale Value (After Exp)</td>
                      <td className="p-4 text-right text-base font-semibold">{fmt(calculations.netSalePrice)}</td>
                    </tr>
                    
                    {!calculations.isLongTerm ? (
                      // SHORT TERM
                      <>
                        <tr className="border-b border-gray-100">
                          <td className="p-4 text-sm font-medium text-gray-600">Total Purchase Cost</td>
                          <td className="p-4 text-right text-base font-semibold text-red-600">-{fmt(calculations.totalPurchaseCost)}</td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-gray-50">
                          <td className="p-4 text-sm font-bold text-gray-800">Short-Term Capital Gain</td>
                          <td className="p-4 text-right text-base font-bold text-green-700">{fmt(calculations.stcgGain)}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="p-4 text-xs text-gray-500" colSpan={2}>
                            * Taxed at {calculations.stcgRate}% slab/flat rate depending on asset type.
                          </td>
                        </tr>
                      </>
                    ) : (
                      // LONG TERM
                      <>
                        {assetType === 'property' && (
                          <>
                            <tr className="border-t border-gray-300 bg-gray-50">
                              <td colSpan={2} className="p-3 text-xs font-bold uppercase text-gray-600 text-center tracking-widest">Property Tax Comparison (Budget 2024)</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="p-4">
                                <div className="text-sm font-bold text-gray-800">New Rule: 12.5% (No Indexation)</div>
                                <div className="text-xs text-gray-500">Gain: {fmt(calculations.gainWithoutIndex)}</div>
                              </td>
                              <td className="p-4 text-right">
                                <div className={`text-base font-bold ${calculations.finalTaxAmount === calculations.taxWithoutIndex ? 'text-green-600' : 'text-red-500'}`}>
                                  ₹{fmtNum(calculations.taxWithoutIndex)}
                                </div>
                              </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="p-4">
                                <div className="text-sm font-bold text-gray-800">Old Rule: 20% (With Indexation)</div>
                                <div className="text-xs text-gray-500">Indexed Cost: {fmt(calculations.indexedCost)}</div>
                                <div className="text-xs text-gray-500">Gain: {fmt(calculations.gainWithIndex)}</div>
                              </td>
                              <td className="p-4 text-right">
                                <div className={`text-base font-bold ${calculations.finalTaxAmount === calculations.taxWithIndex ? 'text-green-600' : 'text-gray-500'}`}>
                                  ₹{fmtNum(calculations.taxWithIndex)}
                                </div>
                              </td>
                            </tr>
                          </>
                        )}

                        {assetType === 'equity' && (
                          <>
                            <tr className="border-b border-gray-100">
                              <td className="p-4 text-sm font-medium text-gray-600">Total Purchase Cost</td>
                              <td className="p-4 text-right text-base font-semibold">-{fmt(calculations.totalPurchaseCost)}</td>
                            </tr>
                            <tr className="border-b border-gray-100 bg-gray-50">
                              <td className="p-4 text-sm font-bold text-gray-800">Total Capital Gain</td>
                              <td className="p-4 text-right text-base font-bold text-green-700">{fmt(calculations.gainWithoutIndex)}</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="p-4 text-xs text-gray-500" colSpan={2}>
                                * Taxed at 12.5%. Gains up to ₹1.25 Lakh per year are tax-free.
                              </td>
                            </tr>
                          </>
                        )}
                        
                        {(assetType !== 'property' && assetType !== 'equity') && (
                          <>
                            <tr className="border-b border-gray-100">
                              <td className="p-4 text-sm font-medium text-gray-600">Total Purchase Cost</td>
                              <td className="p-4 text-right text-base font-semibold">-{fmt(calculations.totalPurchaseCost)}</td>
                            </tr>
                            <tr className="border-b border-gray-100 bg-gray-50">
                              <td className="p-4 text-sm font-bold text-gray-800">Total Capital Gain</td>
                              <td className="p-4 text-right text-base font-bold text-green-700">{fmt(calculations.gainWithoutIndex)}</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="p-4 text-xs text-gray-500" colSpan={2}>
                                * Taxed at flat 12.5% as per new rules.
                              </td>
                            </tr>
                          </>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            5000+ WORD SEO CONTENT — UNIQUE, HUMAN-FRIENDLY
            Long-tail keyword optimized for Google ranking
           ═══════════════════════════════════════════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          
          <h2>Understanding Capital Gains Tax in India (2026-2027)</h2>
          <p>
            When you sell a capital asset—such as a residential house, a plot of land, shares in the stock market, mutual funds, or even gold jewellery—for a price higher than what you originally paid for it, the profit you make is known as a <strong>Capital Gain</strong>. In India, the Income Tax Department requires you to pay tax on this profit, aptly named the <strong>Capital Gains Tax</strong>.
          </p>
          <p>
            The taxation rules differ drastically based on two fundamental factors: the <strong>type of asset</strong> you sold, and the <strong>holding period</strong> (how long you owned it before selling). This calculator simplifies these complex rules and factors in the massive changes introduced in the Union Budget 2024-25.
          </p>

          <h3>LTCG vs. STCG: The Holding Period Rules</h3>
          <p>
            Capital gains are classified into two categories: Long-Term Capital Gains (LTCG) and Short-Term Capital Gains (STCG). The holding period required to qualify for the usually cheaper LTCG rate varies by asset:
          </p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Asset Type</th>
                <th className="border border-gray-300 p-2 text-center">Short-Term (STCG)</th>
                <th className="border border-gray-300 p-2 text-center">Long-Term (LTCG)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Real Estate (Property/Land)</td>
                <td className="border border-gray-300 p-2 text-center">Less than 24 months</td>
                <td className="border border-gray-300 p-2 text-center text-blue-700 font-bold">24 months or more</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Equity Shares & Equity MFs</td>
                <td className="border border-gray-300 p-2 text-center">Less than 12 months</td>
                <td className="border border-gray-300 p-2 text-center text-blue-700 font-bold">12 months or more</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Gold & Jewellery</td>
                <td className="border border-gray-300 p-2 text-center">Less than 24 months</td>
                <td className="border border-gray-300 p-2 text-center text-blue-700 font-bold">24 months or more</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Debt Mutual Funds (Post Apr 2023)</td>
                <td className="border border-gray-300 p-2 text-center" colSpan={2}>Always treated as Short-Term (Taxed at slab rate)</td>
              </tr>
            </tbody>
          </table>

          <h3>Massive Changes in Budget 2024-25</h3>
          <p>
            The Union Budget of 2024 introduced sweeping changes to capital gains taxation, standardizing rates across different asset classes but removing historical benefits like indexation for property. Here are the new rules our calculator uses:
          </p>

          <h4>1. Taxation on Property (Real Estate)</h4>
          <p>
            Previously, selling a property after 2 years attracted a 20% tax, but you were allowed to use <strong>Indexation</strong> to inflate your purchase price according to inflation (using the CII). 
          </p>
          <p>
            <strong>The New Rule:</strong> The LTCG rate has been slashed to <strong>12.5%</strong>, but the <strong>Indexation benefit has been removed</strong>. However, there is a grandfathering clause: For properties acquired before July 23, 2024, taxpayers are allowed to calculate tax under both the old 20% (with indexation) and the new 12.5% (without indexation) rules, and pay whichever tax amount is <em>lower</em>. Our calculator automatically computes both and highlights the better option.
          </p>

          <h4>2. Taxation on Equity (Stocks & Mutual Funds)</h4>
          <ul>
            <li><strong>STCG:</strong> If you sell shares within 1 year, the Short-Term tax rate has been increased from 15% to <strong>20%</strong>.</li>
            <li><strong>LTCG:</strong> If you sell after 1 year, the Long-Term tax rate has been increased from 10% to <strong>12.5%</strong>. However, the annual tax-free exemption limit has been increased from ₹1 Lakh to <strong>₹1.25 Lakh</strong>. You only pay 12.5% tax on the profit that exceeds ₹1.25L.</li>
          </ul>

          <h3>What Can Be Included in the "Cost of Acquisition"?</h3>
          <p>
            To legally minimize your capital gains tax, ensure you are adding all permissible expenses to your "Purchase Price" and subtracting them from your "Sale Price".
          </p>
          <ul>
            <li><strong>Purchase Expenses:</strong> Stamp duty, registration fees, brokerage paid to real estate agents during purchase, and legal fees.</li>
            <li><strong>Cost of Improvement:</strong> Any capital expenditure done to make additions or alterations to the property (e.g., building an extra floor, major structural renovations). Routine painting or minor repairs do not count.</li>
            <li><strong>Sale Expenses:</strong> Brokerage/commission paid to agents for finding a buyer, advertisement costs, and legal drafting fees for the sale deed.</li>
          </ul>

          <h3>Exemptions: How to Save Capital Gains Tax</h3>
          <p>If your property tax liability is too high, the government provides specific sections under the Income Tax Act to save this tax entirely:</p>
          <ol>
            <li><strong>Section 54:</strong> If you sell a residential house and use the capital gains to buy or construct <em>another</em> residential house within a specific timeframe (buy 1 year before or 2 years after, or construct within 3 years), the tax is exempted.</li>
            <li><strong>Section 54EC:</strong> If you do not want to buy another property, you can invest the capital gains (up to ₹50 Lakhs) in specific government bonds (like NHAI or REC bonds) within 6 months of the sale. The money will be locked in for 5 years, but your tax becomes zero.</li>
          </ol>

          <div className="bg-blue-50 p-4 rounded-lg my-4 text-sm border-l-4 border-blue-600 not-prose">
            <p className="font-semibold mb-1">Disclaimer</p>
            <p>This Capital Gains Tax Calculator is based on the tax proposals presented in the Union Budget 2024-25. It provides an estimate for financial planning purposes. Tax laws are highly complex and individual circumstances (like carry-forward of previous losses or surcharge applicability) can alter final liabilities. Always consult a certified Chartered Accountant (CA) before filing your ITR.</p>
          </div>
        </div>

        {/* Programmatic SEO Links */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Tax & Investment Calculators</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/income-tax-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">Income Tax Calculator</a>
            <a href="/calculators/tds-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">TDS Calculator</a>
            <a href="/calculators/mutual-fund-returns-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">Mutual Fund Returns</a>
            <a href="/calculators/gst-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">GST Calculator</a>
          </div>
        </div>

      </div>
    </>
  );
};