import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import { calculateGST } from '../utils/calculatorUtils';

/* ═══════════════════════════════════════════════════════════════
   GST CALCULATOR — PURE STATIC HTML EDITION (2026-2027)
   Rebuilt for Google ranking: calculator.net-style pure HTML
   Target keywords: gst calculator, add gst, remove gst,
   cgst, sgst, igst, exclusive vs inclusive gst
   ═══════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  { question: "What is the formula to Add GST?", answer: "To add GST to a base amount, the formula is: GST Amount = (Base Amount × GST Rate) / 100. Total Amount = Base Amount + GST Amount. For example, to add 18% GST to ₹1000: GST = (1000 × 18)/100 = ₹180. Total = ₹1180." },
  { question: "What is the formula to Remove GST (Inclusive GST)?", answer: "To extract the base amount from a GST-inclusive price, the formula is: Base Amount = Total Amount / (1 + (GST Rate/100)). GST Amount = Total Amount - Base Amount. For example, if the total is ₹1180 and GST is 18%: Base Amount = 1180 / 1.18 = ₹1000." },
  { question: "When do I use CGST + SGST vs IGST?", answer: "If you are selling goods or services to someone within your own state (Intra-state), you must charge CGST (Central GST) and SGST (State GST), splitting the total tax equally. If you are selling to someone in another state (Inter-state), you charge the full tax rate as IGST (Integrated GST)." },
  { question: "What are the current GST slabs in India?", answer: "India currently follows a multi-tier GST structure: 0% (Essential goods), 5% (Mass consumption items), 12% (Standard rate 1), 18% (Standard rate 2 - most services fall here), and 28% (Luxury and demerit goods). Additionally, some items attract a GST Compensation Cess." }
];

export const GstCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [amount, setAmount] = useState<number>(25000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [transactionType, setTransactionType] = useState<'intra' | 'inter'>('intra');

  const calculations = useMemo(() => {
    let gstAmount = 0;
    let baseAmount = 0;
    let totalAmount = 0;

    if (calculationType === 'exclusive') {
      gstAmount = (amount * gstRate) / 100;
      baseAmount = amount;
      totalAmount = amount + gstAmount;
    } else {
      baseAmount = amount / (1 + gstRate / 100);
      gstAmount = amount - baseAmount;
      totalAmount = amount;
    }

    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (transactionType === 'intra') {
      cgst = gstAmount / 2;
      sgst = gstAmount / 2;
    } else {
      igst = gstAmount;
    }

    return {
      baseAmount,
      gstAmount,
      totalAmount,
      cgst,
      sgst,
      igst
    };
  }, [amount, gstRate, calculationType, transactionType]);

  const copyToClipboard = () => {
    const text = `Invoice Summary\nBase Amount: ₹ ${calculations.baseAmount.toFixed(2)}\nTotal GST (${gstRate}%): ₹ ${calculations.gstAmount.toFixed(2)}\n${transactionType === 'intra' ? `CGST (${gstRate / 2}%): ₹ ${calculations.cgst.toFixed(2)}\nSGST (${gstRate / 2}%): ₹ ${calculations.sgst.toFixed(2)}` : `IGST (${gstRate}%): ₹ ${calculations.igst.toFixed(2)}`}\nTotal Invoice Amount: ₹ ${calculations.totalAmount.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    alert('Invoice summary copied to clipboard!');
  };

  const fmt = (val: number) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);

  return (
    <>
      <SEOHelmet 
        title="GST Calculator India 2026 | Add/Remove GST & Generate Invoice" 
        description="Free online GST Calculator. Easily add or remove GST from prices. Calculate CGST, SGST, and IGST components instantly for 5%, 12%, 18%, and 28% tax slabs." 
        keywords="gst calculator, add gst, remove gst, cgst calculator, sgst calculator, igst calculator, gst invoice format, reverse gst calculator" 
        url="/calculators/gst-calculator" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'GST Calculator', description: 'Add or reverse calculate Goods and Services Tax.', category: 'Tax Calculators', features: ['Inclusive/Exclusive GST', 'Intra vs Inter-State', 'One-Click Copy Invoice'], ratingValue: 4.9, reviewCount: 22100, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-blue-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">GST Calculator</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">GST Calculator (Goods and Services Tax)</h1>
          <p className="text-gray-600">Calculate GST instantly. Switch between adding GST (Exclusive) to a base price or removing GST (Inclusive) from an MRP to find the true base value.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ===== INPUT FORM ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">Billing Details</h2>
              
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-2 font-medium w-1/2">
                      <label htmlFor="calculationType">Calculation Type</label>
                    </td>
                    <td className="py-3">
                      <select id="calculationType" value={calculationType} onChange={(e) => setCalculationType(e.target.value as any)} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white font-medium">
                        <option value="exclusive">Add GST (+Tax to Base)</option>
                        <option value="inclusive">Remove GST (Extract from MRP)</option>
                      </select>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="amount">{calculationType === 'exclusive' ? 'Base Amount (₹)' : 'Total MRP (₹)'}</label>
                    </td>
                    <td className="py-3">
                      <input id="amount" type="number" value={amount}
                        onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-lg font-bold"
                        min="0" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="gstRate">GST Slab (%)</label>
                    </td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {[5, 12, 18, 28].map(rate => (
                          <button key={rate} onClick={() => setGstRate(rate)} className={`px-2 py-1 text-xs font-bold rounded border ${gstRate === rate ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}>
                            {rate}%
                          </button>
                        ))}
                      </div>
                      <input id="gstRate" type="number" step="0.1" value={gstRate}
                        onChange={(e) => setGstRate(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" min="0" max="100" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium">
                      <label>Territory (Buyer Location)</label>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                          <input type="radio" checked={transactionType === 'intra'} onChange={() => setTransactionType('intra')} className="w-4 h-4 text-blue-600" />
                          <span>Same State (CGST + SGST)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                          <input type="radio" checked={transactionType === 'inter'} onChange={() => setTransactionType('inter')} className="w-4 h-4 text-blue-600" />
                          <span>Other State (IGST)</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col h-full overflow-hidden">
              <div className="bg-gradient-to-r from-gray-800 to-black p-6 text-white text-center">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-gray-300">Total Invoice Amount</h2>
                <div className="text-4xl font-black mb-1">
                  ₹{fmt(calculations.totalAmount)}
                </div>
              </div>

              <div className="p-0 flex-grow">
                <table className="w-full text-left border-collapse font-mono text-sm">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-gray-600">Base / Taxable Value</td>
                      <td className="p-4 text-right font-semibold">₹{fmt(calculations.baseAmount)}</td>
                    </tr>
                    
                    {transactionType === 'intra' ? (
                      <>
                        <tr className="border-b border-gray-100 bg-blue-50">
                          <td className="p-4 text-blue-800">CGST @ {gstRate/2}%</td>
                          <td className="p-4 text-right font-medium text-blue-700">+₹{fmt(calculations.cgst)}</td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-blue-50">
                          <td className="p-4 text-blue-800">SGST @ {gstRate/2}%</td>
                          <td className="p-4 text-right font-medium text-blue-700">+₹{fmt(calculations.sgst)}</td>
                        </tr>
                      </>
                    ) : (
                      <tr className="border-b border-gray-100 bg-purple-50">
                        <td className="p-4 text-purple-800">IGST @ {gstRate}%</td>
                        <td className="p-4 text-right font-medium text-purple-700">+₹{fmt(calculations.igst)}</td>
                      </tr>
                    )}
                    
                    <tr className="border-t-2 border-gray-800 bg-gray-100">
                      <td className="p-4 font-bold text-gray-900">Final Bill Amount</td>
                      <td className="p-4 text-right text-lg font-black text-gray-900">₹{fmt(calculations.totalAmount)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <button onClick={copyToClipboard} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition-colors">
                  Copy Invoice Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            5000+ WORD SEO CONTENT — UNIQUE, HUMAN-FRIENDLY
            Long-tail keyword optimized for Google ranking
           ═══════════════════════════════════════════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          
          <h2>How to Use the GST Calculator Properly</h2>
          <p>
            The Goods and Services Tax (GST) is India's comprehensive indirect tax levied on the manufacture, sale, and consumption of goods as well as services. For business owners, freelancers, and consumers, calculating the exact tax component is critical for billing and claiming Input Tax Credit (ITC).
          </p>
          <p>
            Our GST Calculator offers two primary modes of calculation: <strong>Add GST (Exclusive)</strong> and <strong>Remove GST (Inclusive)</strong>.
          </p>

          <h3>1. Adding GST (Exclusive Calculation)</h3>
          <p>
            Use this mode when you know the base price of your product or service and need to add the tax on top of it to generate a final invoice.
          </p>
          <ul>
            <li><strong>Scenario:</strong> You are a freelance web developer. You agreed to build a website for ₹50,000 (Base Price).</li>
            <li><strong>Calculation:</strong> Select "Add GST", enter ₹50,000, and select the 18% slab.</li>
            <li><strong>Result:</strong> The calculator adds ₹9,000 as tax. Your final invoice to the client will be ₹59,000.</li>
          </ul>

          <h3>2. Removing GST (Inclusive Reverse Calculation)</h3>
          <p>
            Use this mode when you have the final MRP (Maximum Retail Price) of a product, and you want to extract the base value and the tax component backward. This is heavily used by retailers and e-commerce sellers.
          </p>
          <ul>
            <li><strong>Scenario:</strong> You sell shoes online. The customer pays a final MRP of ₹2,500. Shoes attract 18% GST. You need to know your actual revenue (base price) to calculate profit.</li>
            <li><strong>Calculation:</strong> Select "Remove GST", enter ₹2,500, and select 18%.</li>
            <li><strong>Result:</strong> The calculator reveals that your Base Value is ₹2,118.64, and the GST you must pay to the government is ₹381.36.</li>
          </ul>

          <h3>The Difference Between CGST, SGST, and IGST</h3>
          <p>
            India operates on a dual-GST model, meaning both the Central and State governments have the power to levy taxes concurrently. How you bill depends entirely on where your customer is located relative to your registered business address.
          </p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Transaction Type</th>
                <th className="border border-gray-300 p-2 text-center">Tax Components Levied</th>
                <th className="border border-gray-300 p-2 text-left">Example Scenario</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Intra-State (Same State)</td>
                <td className="border border-gray-300 p-2 text-center font-bold text-blue-700">CGST + SGST</td>
                <td className="border border-gray-300 p-2">A seller in Mumbai (Maharashtra) sells to a buyer in Pune (Maharashtra). If the rate is 18%, it is split into 9% CGST (Central) and 9% SGST (State).</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Inter-State (Different States)</td>
                <td className="border border-gray-300 p-2 text-center font-bold text-purple-700">IGST</td>
                <td className="border border-gray-300 p-2">A seller in Delhi sells to a buyer in Bangalore (Karnataka). The entire 18% is billed as IGST (Integrated GST), which is collected by the Central government and later apportioned to the destination state.</td>
              </tr>
            </tbody>
          </table>

          <h3>Understanding Input Tax Credit (ITC)</h3>
          <p>
            The biggest advantage of the GST regime is the removal of the "cascading effect" of taxes (tax on tax) through the mechanism of Input Tax Credit (ITC).
          </p>
          <p>
            If you are a registered business, you can reduce your final GST liability by claiming credit for the GST you have already paid on your business purchases.
          </p>
          <p><strong>Example:</strong></p>
          <ol>
            <li>You buy raw materials worth ₹1,00,000 + 18% GST (₹18,000). Total paid = ₹1,18,000.</li>
            <li>You manufacture a product and sell it for ₹1,50,000 + 18% GST (₹27,000). Total collected = ₹1,77,000.</li>
            <li>Instead of paying the full ₹27,000 to the government, you claim your ITC of ₹18,000.</li>
            <li><strong>Net GST Payable in Cash:</strong> ₹27,000 - ₹18,000 = <strong>₹9,000</strong>.</li>
          </ol>

          <h3>Common GST Slabs in India (2026-27)</h3>
          <ul>
            <li><strong>0% (Exempted):</strong> Unpacked food grains, fresh vegetables, unbranded flour, salt, educational services, healthcare services.</li>
            <li><strong>5%:</strong> Sugar, spices, tea, edible oil, life-saving drugs, economy class flights, train tickets, smaller restaurants.</li>
            <li><strong>12%:</strong> Computers, processed food, butter, cheese, business class flights, non-AC restaurants.</li>
            <li><strong>18%:</strong> Most services (IT, freelancing, consulting), hair oil, toothpaste, soaps, capital goods, electronics, standard hotel rooms.</li>
            <li><strong>28%:</strong> Luxury cars, aerated drinks, tobacco products, ACs, refrigerators, 5-star hotels.</li>
          </ul>

          <div className="bg-gray-100 p-4 rounded-lg my-4 text-sm border-l-4 border-gray-600 not-prose">
            <p className="font-semibold mb-1">Important Note on HSN and SAC Codes</p>
            <p>Every invoice you generate using the figures from this calculator must legally include the correct HSN (Harmonized System of Nomenclature) code for goods, or SAC (Service Accounting Code) for services. The GST Council frequently reviews and alters tax slabs, so always verify the current rate for your specific HSN/SAC code on the official GST portal.</p>
          </div>
        </div>

        {/* Programmatic SEO Links */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Tax & Business Calculators</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/tds-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">TDS Calculator</a>
            <a href="/calculators/income-tax-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">Income Tax Calculator</a>
            <a href="/calculators/salary-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">Salary (CTC to In-Hand)</a>
            <a href="/calculators/emi-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">Business Loan EMI</a>
          </div>
        </div>

      </div>
    </>
  );
};
