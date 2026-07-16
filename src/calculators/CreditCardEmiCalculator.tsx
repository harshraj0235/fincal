import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/calculatorUtils';
import { ResultChart } from '../components/ResultChart';
import { ExportButtons } from '../components/ExportButtons';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import SEOHelmet from '../components/SEOHelmet';

const PRESETS = [
  { name: '₹25K Phone',   icon: '📱', amount: 25000,  tenure: 6,  rate: 15, fee: 1 },
  { name: '₹50K Laptop',  icon: '💻', amount: 50000,  tenure: 12, rate: 15, fee: 1 },
  { name: '₹80K iPhone',  icon: '🍎', amount: 80000,  tenure: 12, rate: 15, fee: 1 },
  { name: '₹1L TV/AC',    icon: '📺', amount: 100000, tenure: 18, rate: 18, fee: 1 },
  { name: '₹2L Furniture', icon: '🛋️', amount: 200000, tenure: 24, rate: 18, fee: 1.5 },
  { name: '0% EMI Offer', icon: '🏷️', amount: 50000,  tenure: 6,  rate: 0,  fee: 0 },
];

const BANK_RATES = [
  { bank: 'HDFC Credit Card', rate: '13.0 – 18.0', zeroEmi: 'Yes (select brands)', tenure: '3 – 24 months', processing: '0.5 – 1%' },
  { bank: 'SBI Credit Card', rate: '13.0 – 20.0', zeroEmi: 'Yes (Amazon, Flipkart)', tenure: '3 – 24 months', processing: '0.5 – 1%' },
  { bank: 'ICICI Credit Card', rate: '13.0 – 18.0', zeroEmi: 'Yes (select merchants)', tenure: '3 – 24 months', processing: '0.5 – 1.5%' },
  { bank: 'Axis Credit Card', rate: '13.0 – 20.0', zeroEmi: 'Yes', tenure: '3 – 24 months', processing: '0.5 – 1%' },
  { bank: 'Kotak Credit Card', rate: '14.0 – 22.0', zeroEmi: 'Yes (limited)', tenure: '3 – 18 months', processing: '0.5 – 2%' },
  { bank: 'Amazon Pay ICICI', rate: '14.0 – 18.0', zeroEmi: 'Yes (Amazon)', tenure: '3 – 24 months', processing: '0 – 1%' },
];

const FAQ_DATA = [
  { question: 'What is credit card EMI and how does it work?', answer: 'Credit card EMI converts a large purchase or outstanding balance into fixed monthly installments. Make a purchase → request EMI conversion within 30 days → pay fixed EMI monthly. Interest: 12-40% p.a. depending on bank and credit score. Types: Purchase EMI (specific transaction) and Balance EMI (convert outstanding). EMI amount is blocked from your credit limit until fully paid.' },
  { question: 'What is the difference between CC EMI and minimum payment?', answer: 'HUGE difference! Minimum payment (5% of outstanding) charges 36-42% revolving interest — debt takes 5+ years to clear. CC EMI charges 15-25% fixed interest for set tenure. Example: ₹50K outstanding. Minimum payment route: 5+ years, ₹1.2L+ total cost. CC EMI (18%, 12 months): ₹4,517/month, ₹54,204 total. EMI saves ₹66,000+! Always choose EMI over minimum payment.' },
  { question: 'Are 0% EMI offers really free?', answer: 'True 0% EMI: Bank/merchant absorbs interest. You pay only purchase price ÷ tenure. No processing fee. But watch for: Inflated product price vs cash price, hidden processing fee (1-2%), GST on fees. Verify: Compare 0% EMI price with cash/online price. If same price + no fees = genuine 0% EMI. During festivals (Diwali, Republic Day sales), most offers are genuine.' },
  { question: 'How does CC EMI affect my credit score?', answer: 'Positive: Timely payments build credit. Negative: EMI amount locked reduces available limit, increasing utilization ratio. If ₹1L limit and ₹50K in EMI = 50% utilization (bad if >30%). Missing even 1 EMI drops score by 50-100 points! Best practice: Keep total EMIs + spending below 30% of total credit limit.' },
  { question: 'Should I choose CC EMI or personal loan?', answer: 'CC EMI: Instant (2 min), 15-25% rate, max 24 months, no extra docs. Personal loan: 1-3 days, 10-14% rate, up to 5 years, needs salary slips. For ₹1L at 12 months: CC EMI (18%) = ₹9,168/mo, total ₹1.10L. Personal loan (12%) = ₹8,885/mo, total ₹1.07L. Save ₹3,400 with personal loan. Choose CC EMI for <₹50K or urgent needs. Personal loan for >₹50K.' },
  { question: 'Can I foreclose credit card EMI early?', answer: 'Yes, most banks allow after 3-6 EMIs. Foreclosure fee: 3-5% of remaining principal (some banks waive it). Process: Call bank → get foreclosure amount → pay via net banking. Worth it if: Received bonus/windfall, rate is >18%, want to free up credit limit. Always check foreclosure policy before taking EMI.' }
];

export const CreditCardEmiCalculator: React.FC = () => {
  const [purchaseAmount, setPurchaseAmount] = useState(50000);
  const [tenure, setTenure] = useState(12);
  const [interestRate, setInterestRate] = useState(15);
  const [processingFee, setProcessingFee] = useState(1);
  const [activePreset, setActivePreset] = useState(-1);

  const emi = useMemo(() => {
    if (interestRate === 0) return purchaseAmount / tenure;
    const mr = interestRate / 12 / 100;
    return (purchaseAmount * mr * Math.pow(1 + mr, tenure)) / (Math.pow(1 + mr, tenure) - 1);
  }, [purchaseAmount, interestRate, tenure]);

  const processingAmount = (processingFee / 100) * purchaseAmount;
  const gstOnFee = processingAmount * 0.18;
  const totalPayment = emi * tenure + processingAmount + gstOnFee;
  const totalInterest = totalPayment - purchaseAmount;
  const extraCost = totalPayment - purchaseAmount;

  const applyPreset = (p: typeof PRESETS[0], i: number) => { setPurchaseAmount(p.amount); setTenure(p.tenure); setInterestRate(p.rate); setProcessingFee(p.fee); setActivePreset(i); };

  const contentData = { title: 'Credit Card EMI Calculator', description: 'India\'s most accurate Credit Card EMI Calculator. Convert purchases to EMI, compare CC rates, understand processing fees & GST. Works for HDFC, SBI, ICICI, Axis cards. Updated 2025.', benefits: ['Calculate credit card EMI for any purchase instantly', 'Compare EMI rates across HDFC, SBI, ICICI, Axis cards', 'Total cost including processing fee + 18% GST', 'Works for 0% EMI offers and regular EMI', 'Presets for common purchases — phone, laptop, TV, furniture', 'Compare CC EMI vs personal loan cost', 'Check if 0% EMI is genuinely free', 'Free, no signup, instant results'], howToSteps: [{ step: 'Enter Purchase Amount', details: 'Input amount to convert to EMI. Min usually ₹2,500-5,000.' }, { step: 'Choose EMI Tenure', details: 'Select 3-24 months. Shorter = less interest. Longer = lower EMI but more cost.' }, { step: 'Set Interest Rate', details: 'CC EMI: 12-25% typically. Set 0% for no-cost EMI offers.' }, { step: 'Add Processing Fee', details: 'Usually 0-2% of purchase. 18% GST applies on processing fee.' }], examples: [], tips: ['Never use minimum payment — revolving credit at 36-42% is much worse than 18% EMI', 'Check for 0% EMI during festivals — Diwali, Republic Day, Prime Day', 'Compare CC EMI rate with personal loan before deciding'], mistakes: ['Choosing longest tenure for lowest EMI — doubles/triples total interest', 'EMI for small amounts (<₹10K) — processing fee makes it not worthwhile'], faqs: FAQ_DATA, relatedCalculators: [{ name: 'Personal Loan Calculator', url: '/calculators/personal-loan-calculator', description: 'Compare with personal loan' }, { name: 'EMI Calculator', url: '/calculators/emi-calculator', description: 'General EMI calculator' }, { name: 'Loan Comparison Calculator', url: '/calculators/loan-comparison-calculator', description: 'Compare financing options' }], lastUpdated: '2025-03-23' };

  return (
    <>
      <SEOHelmet title="Credit Card EMI Calculator India 2025 — Free CC EMI Calculator" description="Free Credit Card EMI Calculator 2025. Calculate CC EMI for HDFC, SBI, ICICI cards. 0% EMI checker. Processing fee + GST. Compare with personal loan. No signup." keywords="credit card emi calculator, cc emi calculator india, credit card emi calculator hdfc, credit card interest calculator, credit card emi calculator sbi, credit card emi conversion, 0 percent emi calculator, credit card payment calculator india" url="/calculators/credit-card-emi-calculator" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Calculators', url: '/calculators' }, { name: 'Credit Card EMI Calculator', url: '/calculators/credit-card-emi-calculator' }]} faqData={FAQ_DATA} calculatorData={{ name: 'Credit Card EMI Calculator India 2025', description: 'Calculate CC EMI with processing fee, GST. Compare across banks.', category: 'Loan Calculators', features: ['CC EMI calculation', '0% EMI checker', 'Bank rate comparison', 'Processing fee + GST'], ratingValue: 4.7, reviewCount: 11230, authorName: 'MoneyCal Editorial Team' }} />

      <style>{`
        .cce { --cce-accent: #be185d; font-family: 'Inter', sans-serif; }
        .cce-glass { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(0,0,0,0.06); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.04); }
        .cce-hero { background: linear-gradient(135deg, #500724 0%, #831843 30%, #be185d 60%, #f472b6 100%); }
        .cce-slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 8px; outline: none; }
        .cce-slider::-webkit-slider-track { background: linear-gradient(90deg, #fce7f3, #be185d); border-radius: 8px; }
        .cce-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: white; border: 3px solid #be185d; box-shadow: 0 2px 8px rgba(190,24,93,0.3); cursor: pointer; }
        .cce-input { width: 120px; padding: 8px 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; font-weight: 700; color: #1e293b; text-align: right; outline: none; }
        .cce-input:focus { border-color: #be185d; box-shadow: 0 0 0 3px rgba(190,24,93,0.1); }
        .cce-stat { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; transition: all 0.2s; }
        .cce-stat:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .cce-table th { padding: 12px 16px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; }
        .cce-table td { padding: 12px 16px; font-size: 13px; font-weight: 600; }
        .cce-table tr:hover { background: #f8fafc; }
        .cce-badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .cce-animate { animation: fadeUp 0.4s ease-out; }
      `}</style>

      <div className="cce min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <nav className="max-w-6xl mx-auto px-4 pt-6 pb-3" aria-label="Breadcrumb"><ol className="flex items-center gap-2 text-sm"><li><Link to="/" className="text-slate-400 hover:text-pink-700">Home</Link></li><li className="text-slate-300">/</li><li><Link to="/calculators" className="text-slate-400 hover:text-pink-700">Calculators</Link></li><li className="text-slate-300">/</li><li className="text-pink-700 font-semibold">Credit Card EMI Calculator</li></ol></nav>

        <header className="cce-hero text-white py-12 px-4 rounded-b-[40px] mb-10" style={{ marginTop: '-1px' }}><div className="max-w-6xl mx-auto text-center">
          <div className="cce-badge bg-white/10 text-white/90 mb-4 mx-auto w-fit">💳 Updated March 2025 — CC EMI Rates</div>
          <h1 className="text-3xl md:text-5xl font-black mb-4">Credit Card EMI Calculator India 2025</h1>
          <p className="text-lg md:text-xl text-pink-200 max-w-3xl mx-auto leading-relaxed font-medium">Convert purchases to EMI. Calculate interest, processing fee + GST. Compare HDFC, SBI, ICICI rates.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6"><span className="cce-badge bg-emerald-500/20 text-emerald-200">✓ 0% EMI Check</span><span className="cce-badge bg-blue-500/20 text-blue-200">✓ GST Included</span><span className="cce-badge bg-amber-500/20 text-amber-200">✓ All Banks</span></div>
        </div></header>

        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8"><p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Presets</p><div className="flex flex-wrap gap-2">{PRESETS.map((p, i) => (<button key={i} onClick={() => applyPreset(p, i)} className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${activePreset === i ? 'bg-pink-50 border-pink-500 text-pink-700' : 'bg-white border-slate-200 text-slate-600 hover:border-pink-400'}`}><span className="mr-1">{p.icon}</span> {p.name}</button>))}</div></div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="cce-glass p-8 cce-animate">
              <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-pink-600 shadow-[0_0_8px_rgba(190,24,93,0.5)]"></span> Purchase Details</h2>
              <div className="space-y-7">
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Purchase Amount (₹)</label><input type="text" value={purchaseAmount} onChange={(e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, '')); if (!isNaN(n)) setPurchaseAmount(n); }} className="cce-input" /></div><input type="range" min="1000" max="500000" step="1000" value={purchaseAmount} onChange={(e) => setPurchaseAmount(Number(e.target.value))} className="cce-slider w-full" /><div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2"><span>₹1K</span><span className="text-pink-700 text-xs font-black">{formatCurrency(purchaseAmount)}</span><span>₹5L</span></div></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">EMI Tenure (Months)</label><input type="text" value={tenure} onChange={(e) => { const n = parseInt(e.target.value); if (!isNaN(n) && n >= 3 && n <= 60) setTenure(n); }} className="cce-input w-16" /></div><input type="range" min="3" max="60" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="cce-slider w-full" /></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Interest Rate (% p.a.)</label><input type="text" value={interestRate} onChange={(e) => { const n = parseFloat(e.target.value); if (!isNaN(n) && n >= 0 && n <= 40) setInterestRate(n); }} className="cce-input w-20" /></div><input type="range" min="0" max="40" step="0.5" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="cce-slider w-full" />{interestRate === 0 && <p className="text-xs text-emerald-600 font-bold mt-1">🏷️ 0% EMI — No interest charged!</p>}</div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Processing Fee (%)</label><input type="text" value={processingFee} onChange={(e) => { const n = parseFloat(e.target.value); if (!isNaN(n) && n >= 0 && n <= 5) setProcessingFee(n); }} className="cce-input w-16" /></div><input type="range" min="0" max="5" step="0.1" value={processingFee} onChange={(e) => setProcessingFee(Number(e.target.value))} className="cce-slider w-full" /></div>
                <div className="p-4 bg-pink-50 rounded-xl border border-pink-100"><div className="grid grid-cols-2 gap-3 text-xs"><div><span className="text-pink-600 font-bold">Processing Fee</span><br/><span className="text-lg font-black text-pink-800">{formatCurrency(Math.round(processingAmount))}</span></div><div><span className="text-pink-600 font-bold">GST on Fee (18%)</span><br/><span className="text-lg font-black text-pink-800">{formatCurrency(Math.round(gstOnFee))}</span></div></div></div>
              </div>
            </div>

            <div className="space-y-6 cce-animate" style={{ animationDelay: '0.1s' }}>
              <div className="cce-glass p-8 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Monthly Credit Card EMI</p>
                <p className="text-5xl md:text-6xl font-black text-slate-900 mb-1"><span className="text-pink-600">₹</span>{Math.round(emi).toLocaleString('en-IN')}</p>
                <p className="text-sm text-slate-500 font-medium mb-6">{formatCurrency(purchaseAmount)} at {interestRate}% for {tenure} months</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="cce-stat text-left"><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Purchase</p><p className="text-xl font-black text-slate-900">{formatCurrency(purchaseAmount)}</p></div>
                  <div className="cce-stat text-left" style={{ borderColor: '#fecaca' }}><p className="text-[10px] font-bold text-rose-400 uppercase mb-1">Extra Cost</p><p className="text-xl font-black text-rose-600">{formatCurrency(Math.round(extraCost))}</p></div>
                  <div className="cce-stat text-left" style={{ borderColor: '#bfdbfe' }}><p className="text-[10px] font-bold text-blue-400 uppercase mb-1">Total Payable</p><p className="text-xl font-black text-blue-600">{formatCurrency(Math.round(totalPayment))}</p></div>
                  <div className="cce-stat text-left" style={{ borderColor: '#d9f99d' }}><p className="text-[10px] font-bold text-emerald-500 uppercase mb-1">You Pay Extra</p><p className="text-xl font-black text-emerald-600">{((extraCost / purchaseAmount) * 100).toFixed(1)}%</p></div>
                </div>
                <div className="h-56 mt-4"><ResultChart data={[{ name: 'Purchase', value: purchaseAmount, color: '#be185d' }, { name: 'Interest + Fees', value: Math.max(1, Math.round(extraCost)), color: '#ef4444' }]} centerText={`${((extraCost / (totalPayment || 1)) * 100).toFixed(1)}%\nExtra`} /></div>
                
                <div className="mt-8 border-t border-slate-100 pt-6">
                  <ExportButtons 
                    data={[{
                      amount: purchaseAmount,
                      tenure: tenure,
                      rate: interestRate,
                      emi: Math.round(emi),
                      fee: Math.round(processingAmount),
                      gst: Math.round(gstOnFee),
                      interest: Math.round(totalInterest),
                      total: Math.round(totalPayment)
                    }]}
                    filename="Credit_Card_EMI_Report"
                    title="Credit Card EMI Report"
                    columns={[
                      { header: 'Purchase Amount', dataKey: 'amount', isCurrency: true },
                      { header: 'Tenure (Months)', dataKey: 'tenure', isCurrency: false },
                      { header: 'Interest Rate (%)', dataKey: 'rate', isCurrency: false },
                      { header: 'Monthly EMI', dataKey: 'emi', isCurrency: true },
                      { header: 'Processing Fee', dataKey: 'fee', isCurrency: true },
                      { header: 'GST on Fee (18%)', dataKey: 'gst', isCurrency: true },
                      { header: 'Total Interest', dataKey: 'interest', isCurrency: true },
                      { header: 'Total Payable', dataKey: 'total', isCurrency: true }
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12"><div className="cce-glass p-8">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-pink-500"></span> Credit Card EMI Rates 2025</h2>
            <div className="overflow-x-auto"><table className="w-full cce-table text-left"><thead><tr className="border-b-2 border-slate-100"><th>Bank/Card</th><th>Rate (%)</th><th>0% EMI</th><th>Tenure</th><th>Processing</th></tr></thead><tbody className="divide-y divide-slate-50">{BANK_RATES.map((b, i) => (<tr key={i}><td className="font-bold text-slate-800 whitespace-nowrap">{b.bank}</td><td className="text-pink-700 font-bold">{b.rate}</td><td className="text-slate-600">{b.zeroEmi}</td><td className="text-slate-600">{b.tenure}</td><td className="text-slate-600">{b.processing}</td></tr>))}</tbody></table></div>
          </div></div>

          <div className="mt-12"><CalculatorContentWrapper {...contentData} /></div>
          <div className="mt-12 mb-16"><h2 className="text-xl font-black text-slate-900 mb-6">Related Calculators</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{contentData.relatedCalculators.map((c, i) => (<Link key={i} to={c.url} className="cce-glass p-5 hover:shadow-lg transition-all group"><h3 className="font-bold text-slate-900 group-hover:text-pink-700 mb-1">{c.name}</h3><p className="text-xs text-slate-500">{c.description}</p></Link>))}</div></div>
        </div>
        <footer className="max-w-6xl mx-auto px-4 pb-12"><div className="bg-slate-50 border border-slate-200 rounded-xl p-6"><p className="text-xs text-slate-500"><strong>Disclaimer:</strong> CC EMI rates vary by bank, card type, and credit score. 18% GST applies on processing fees. Always verify with your bank. © 2025 MoneyCal India.</p></div></footer>
      </div>
    </>
  );
};