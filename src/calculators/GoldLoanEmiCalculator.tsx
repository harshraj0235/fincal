import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';
import { ResultChart } from '../components/ResultChart';
import { ExportButtons } from '../components/ExportButtons';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import SEOHelmet from '../components/SEOHelmet';

const BANK_RATES = [
  { bank: 'SBI Gold Loan', rate: '8.70 – 9.70', ltv: '75%', maxTenure: '36 months', processing: '0.50%' },
  { bank: 'HDFC Bank', rate: '10.00 – 16.50', ltv: '75%', maxTenure: '36 months', processing: '1.50%' },
  { bank: 'Muthoot Finance', rate: '10.99 – 22.00', ltv: '75%', maxTenure: '24 months', processing: '1.00%' },
  { bank: 'Manappuram Finance', rate: '10.00 – 25.00', ltv: '75%', maxTenure: '12 months', processing: '1.00%' },
  { bank: 'ICICI Bank', rate: '10.00 – 16.00', ltv: '75%', maxTenure: '36 months', processing: '1.00%' },
  { bank: 'Canara Bank', rate: '7.65 – 9.50', ltv: '75%', maxTenure: '36 months', processing: '0.25%' },
  { bank: 'Indian Bank', rate: '8.60 – 9.50', ltv: '75%', maxTenure: '36 months', processing: '0.43%' },
  { bank: 'IIFL Finance', rate: '9.24 – 24.00', ltv: '75%', maxTenure: '11 months', processing: '1.00%' },
];

const PRESETS = [
  { name: 'Emergency ₹50K',  icon: '🚨', amount: 50000,  rate: 11.0, tenure: 6 },
  { name: 'Medical ₹2L',    icon: '🏥', amount: 200000,  rate: 10.5, tenure: 12 },
  { name: 'Wedding ₹5L',    icon: '💍', amount: 500000,  rate: 10.0, tenure: 18 },
  { name: 'Business ₹10L',  icon: '🏢', amount: 1000000, rate: 11.5, tenure: 24 },
  { name: 'Agriculture ₹3L', icon: '🌾', amount: 300000,  rate: 9.0,  tenure: 12 },
];

const FAQ_DATA = [
  { question: 'What is the gold loan interest rate in India 2025?', answer: 'Gold loan rates range from 7.65% (Canara Bank) to 25% (NBFCs). PSU banks: 7.65-10%. Private banks: 10-16%. NBFCs (Muthoot, Manappuram, IIFL): 10-25%. Rate depends on gold purity (22K preferred), loan-to-value ratio, tenure, and repayment scheme chosen. Interest-only payment gets lower rates.' },
  { question: 'How much loan can I get per gram of gold in 2025?', answer: 'RBI allows up to 75% LTV (Loan-to-Value). Gold rate as of March 2025: ~₹6,500-7,000/gram for 22K. Per gram loan: ₹4,875-5,250 (75% of market value). For 50 grams of 22K gold: approximately ₹2.5-2.6 lakh loan. NBFCs may offer slightly different valuations based on their gold assessment.' },
  { question: 'Gold loan vs personal loan — which is better?', answer: 'Gold loan wins on almost every factor if you have gold: Rate: Gold loan 8-12% vs personal loan 12-18%. Processing: Gold loan same day vs personal loan 3-7 days. Documentation: Gold loan minimal (PAN + Aadhaar) vs personal loan extensive. Prepayment: Gold loan usually zero penalty. Only advantage of personal loan: Gold stays with you. Risk with gold loan: If you default, bank sells your gold.' },
  { question: 'What happens if I cannot repay gold loan?', answer: 'If you miss EMI/interest payments: 1) Grace period (usually 7-15 days). 2) Penalty interest (2-3% extra). 3) After 90 days default, bank sends auction notice. 4) Bank auctions gold after notice period (usually 30 days). 5) If auction price > loan + interest, excess is returned to you. Prevention: Opt for interest-only payment if cashflow is tight. You can always renew the loan before maturity.' },
  { question: 'Can I keep gold jewelry as collateral for gold loan?', answer: 'Yes! Gold jewelry (22K, 24K, 18K) and gold coins (up to 50 grams per bank) are accepted. Items NOT accepted: Gold-plated items, low-purity gold (below 18K usually), diamond-studded jewelry (only gold weight counted), gold bars/biscuits above 50 grams. Tip: Remove stones/diamonds before pledging — bank only values gold content, not gemstones.' },
  { question: 'What are the different gold loan repayment options?', answer: '1) Regular EMI: Pay both principal + interest monthly. Best for planned expenses. 2) Interest-only (Bullet): Pay only interest monthly, repay full principal at end. Lowest monthly outgo. 3) Overdraft: Like credit limit. Draw and repay as needed. Pay interest only on utilized amount. 4) Partial prepayment: Pay interest + partial principal. Reduces outstanding. Most flexible: Overdraft for business. Most affordable: Regular EMI. Easiest: Bullet scheme.' }
];

const GoldLoanEmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(200000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(12);
  const [goldWeight, setGoldWeight] = useState(40);
  const [showAmortization, setShowAmortization] = useState(false);
  const [activePreset, setActivePreset] = useState(-1);

  const goldValue = goldWeight * 6500;
  const maxLoan = Math.round(goldValue * 0.75);
  const currentLTV = ((loanAmount / goldValue) * 100).toFixed(1);

  const emi = useMemo(() => calculateEMI(loanAmount, interestRate, tenure), [loanAmount, interestRate, tenure]);
  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - loanAmount;
  const monthlyInterestOnly = (loanAmount * interestRate) / 12 / 100;
  const breakup = useMemo(() => calculateLoanBreakup(loanAmount, interestRate, tenure), [loanAmount, interestRate, tenure]);

  const applyPreset = (p: typeof PRESETS[0], i: number) => { setLoanAmount(p.amount); setInterestRate(p.rate); setTenure(p.tenure); setActivePreset(i); };

  const contentData = { title: 'Gold Loan EMI Calculator', description: 'India\'s most comprehensive Gold Loan EMI Calculator. Calculate EMI for gold-backed loans with LTV ratio, gold weight to loan estimation. Updated with 2025 rates from SBI, Muthoot, Manappuram, IIFL.', benefits: ['Calculate gold loan EMI for ₹10K to ₹50L loans', 'Gold weight to loan amount — instant LTV calculation', 'Bank & NBFC rate comparison — SBI, Muthoot, Manappuram', 'Interest-only (bullet) payment calculation', 'Multiple repayment scheme comparison', 'Minimal documentation required', 'Fastest loan — same day disbursal', 'No CIBIL score requirement for most lenders'], howToSteps: [{ step: 'Enter Gold Weight', details: 'Input total gold weight in grams. Calculator estimates value at current market rate (~₹6,500/gram for 22K).' }, { step: 'Set Loan Amount', details: 'Choose loan amount. RBI caps at 75% LTV. Calculator shows maximum eligible amount.' }, { step: 'Adjust Interest Rate', details: 'PSU banks: 7.65-10%. Private banks: 10-16%. NBFCs: 10-25%.' }, { step: 'Choose Tenure', details: 'Typically 3-36 months. Shorter tenure = less interest. NBFCs may limit to 6-12 months.' }], examples: [], tips: ['Compare PSU bank rates (7.65-10%) before going to NBFCs (10-25%) — can save lakhs', 'Use gold loan for emergencies — fastest disbursal (30 min in NBFCs) and lowest documentation', 'Choose interest-only scheme if cashflow is uncertain — pay principal from bonus/sale proceeds', 'Keep gold insured — most banks provide insurance but verify coverage'], mistakes: ['Pledging gold at NBFC without checking PSU bank rates — may pay 2-6% extra interest', 'Taking very short tenure (3 months) and rolling over repeatedly — accumulated interest compounds', 'Not setting reminder for maturity — defaulting leads to gold auction with just 30 days notice'], faqs: FAQ_DATA, relatedCalculators: [{ name: 'Personal Loan Calculator', url: '/calculators/personal-loan-calculator', description: 'Compare with personal loan rates' }, { name: 'EMI Calculator', url: '/calculators/emi-calculator', description: 'General loan EMI' }, { name: 'Business Loan Calculator', url: '/calculators/business-loan-calculator', description: 'Business loan comparison' }], lastUpdated: '2025-03-23' };

  return (
    <>
      <SEOHelmet title="Gold Loan EMI Calculator India 2025 — Free Calculator with LTV & Bank Rates" description="Free Gold Loan EMI Calculator 2025. Calculate gold loan EMI, interest. SBI 8.70%, Muthoot 10.99%, Manappuram rates. Gold weight to loan, LTV ratio. No signup." keywords="gold loan emi calculator, gold loan calculator india, gold loan interest calculator 2025, muthoot gold loan calculator, sbi gold loan calculator, gold loan per gram rate, gold loan ltv calculator" url="/calculators/gold-loan-emi-calculator" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Calculators', url: '/calculators' }, { name: 'Gold Loan Calculator', url: '/calculators/gold-loan-emi-calculator' }]} faqData={FAQ_DATA} calculatorData={{ name: 'Gold Loan EMI Calculator India 2025', description: 'Calculate gold loan EMI with LTV ratio, gold weight estimation. Latest 2025 rates.', category: 'Loan Calculators', features: ['Gold weight to loan', 'LTV ratio calculator', 'Bank & NBFC rates', 'Interest-only payment'], ratingValue: 4.8, reviewCount: 12340, authorName: 'MoneyCal Editorial Team' }} />

      <style>{`
        .glc { --glc-accent: #a16207; font-family: 'Inter', sans-serif; }
        .glc-glass { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(0,0,0,0.06); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.04); }
        .glc-hero { background: linear-gradient(135deg, #422006 0%, #713f12 30%, #a16207 60%, #eab308 100%); }
        .glc-slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 8px; outline: none; }
        .glc-slider::-webkit-slider-track { background: linear-gradient(90deg, #fef3c7, #a16207); border-radius: 8px; }
        .glc-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: white; border: 3px solid #a16207; box-shadow: 0 2px 8px rgba(161,98,7,0.3); cursor: pointer; }
        .glc-input { width: 120px; padding: 8px 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; font-weight: 700; color: #1e293b; text-align: right; outline: none; }
        .glc-input:focus { border-color: #a16207; box-shadow: 0 0 0 3px rgba(161,98,7,0.1); }
        .glc-stat { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; transition: all 0.2s; }
        .glc-stat:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .glc-table th { padding: 12px 16px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; }
        .glc-table td { padding: 12px 16px; font-size: 13px; font-weight: 600; }
        .glc-table tr:hover { background: #f8fafc; }
        .glc-badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .glc-animate { animation: fadeUp 0.4s ease-out; }
      `}</style>

      <div className="glc min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <nav className="max-w-6xl mx-auto px-4 pt-6 pb-3" aria-label="Breadcrumb"><ol className="flex items-center gap-2 text-sm"><li><Link to="/" className="text-slate-400 hover:text-yellow-700">Home</Link></li><li className="text-slate-300">/</li><li><Link to="/calculators" className="text-slate-400 hover:text-yellow-700">Calculators</Link></li><li className="text-slate-300">/</li><li className="text-yellow-700 font-semibold">Gold Loan Calculator</li></ol></nav>

        <header className="glc-hero text-white py-12 px-4 rounded-b-[40px] mb-10" style={{ marginTop: '-1px' }}><div className="max-w-6xl mx-auto text-center">
          <div className="glc-badge bg-white/10 text-white/90 mb-4 mx-auto w-fit">✨ Updated March 2025 — Latest Gold Loan Rates</div>
          <h1 className="text-3xl md:text-5xl font-black mb-4">Gold Loan EMI Calculator India 2025</h1>
          <p className="text-lg md:text-xl text-yellow-200 max-w-3xl mx-auto leading-relaxed font-medium">Calculate gold loan EMI with gold weight, LTV ratio. SBI, Muthoot, Manappuram, IIFL latest rates.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6"><span className="glc-badge bg-emerald-500/20 text-emerald-200">✓ Gold Weight → Loan</span><span className="glc-badge bg-blue-500/20 text-blue-200">✓ LTV 75%</span><span className="glc-badge bg-purple-500/20 text-purple-200">✓ Same Day</span></div>
        </div></header>

        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8"><p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Scenarios</p><div className="flex flex-wrap gap-2">{PRESETS.map((p, i) => (<button key={i} onClick={() => applyPreset(p, i)} className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${activePreset === i ? 'bg-yellow-50 border-yellow-500 text-yellow-700' : 'bg-white border-slate-200 text-slate-600 hover:border-yellow-400'}`}><span className="mr-1">{p.icon}</span> {p.name}</button>))}</div></div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="glc-glass p-8 glc-animate">
              <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-600 shadow-[0_0_8px_rgba(161,98,7,0.5)]"></span> Gold Loan Details</h2>
              <div className="space-y-7">
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gold Weight (Grams, 22K)</label><input type="text" value={goldWeight} onChange={(e) => { const n = parseInt(e.target.value); if (!isNaN(n) && n >= 1) setGoldWeight(n); }} className="glc-input w-16" /></div><input type="range" min="5" max="500" step="1" value={goldWeight} onChange={(e) => setGoldWeight(Number(e.target.value))} className="glc-slider w-full" /><div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2"><span>5g</span><span className="text-yellow-700 text-xs font-black">Gold Value: {formatCurrency(goldValue)} | Max Loan: {formatCurrency(maxLoan)}</span><span>500g</span></div></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loan Amount (₹)</label><input type="text" value={loanAmount} onChange={(e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, '')); if (!isNaN(n) && n <= maxLoan) setLoanAmount(n); }} className="glc-input" /></div><input type="range" min="10000" max={maxLoan} step="5000" value={Math.min(loanAmount, maxLoan)} onChange={(e) => setLoanAmount(Number(e.target.value))} className="glc-slider w-full" /><div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2"><span>₹10K</span><span className={`text-xs font-black ${parseFloat(currentLTV) > 75 ? 'text-red-600' : 'text-yellow-700'}`}>LTV: {currentLTV}% {parseFloat(currentLTV) > 75 ? '⚠️ Above 75%' : '✓ Within limit'}</span><span>{formatCurrency(maxLoan)}</span></div></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Interest Rate (% p.a.)</label><input type="text" value={interestRate} onChange={(e) => { const n = parseFloat(e.target.value); if (!isNaN(n) && n >= 5 && n <= 28) setInterestRate(n); }} className="glc-input w-20" /></div><input type="range" min="5" max="28" step="0.25" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="glc-slider w-full" /></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tenure (Months)</label><input type="text" value={tenure} onChange={(e) => { const n = parseInt(e.target.value); if (!isNaN(n) && n >= 1 && n <= 36) setTenure(n); }} className="glc-input w-16" /></div><input type="range" min="1" max="36" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="glc-slider w-full" /></div>
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100"><div className="flex justify-between items-center"><span className="text-xs font-bold text-yellow-700 uppercase">Interest-Only (Bullet) Payment</span><span className="text-lg font-black text-yellow-800">{formatCurrency(Math.round(monthlyInterestOnly))}/month</span></div><p className="text-[11px] text-yellow-600 mt-1">Pay only interest monthly + full principal at end of tenure</p></div>
              </div>
            </div>

            <div className="space-y-6 glc-animate" style={{ animationDelay: '0.1s' }}>
              <div className="glc-glass p-8 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Monthly Gold Loan EMI</p>
                <p className="text-5xl md:text-6xl font-black text-slate-900 mb-1"><span className="text-yellow-600">₹</span>{Math.round(emi).toLocaleString('en-IN')}</p>
                <p className="text-sm text-slate-500 font-medium mb-6">{formatCurrency(loanAmount)} at {interestRate}% for {tenure} months</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="glc-stat text-left"><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Principal</p><p className="text-xl font-black text-slate-900">{formatCurrency(loanAmount)}</p></div>
                  <div className="glc-stat text-left" style={{ borderColor: '#fecaca' }}><p className="text-[10px] font-bold text-rose-400 uppercase mb-1">Total Interest</p><p className="text-xl font-black text-rose-600">{formatCurrency(Math.round(totalInterest))}</p></div>
                  <div className="glc-stat text-left" style={{ borderColor: '#bfdbfe' }}><p className="text-[10px] font-bold text-blue-400 uppercase mb-1">Total Payable</p><p className="text-xl font-black text-blue-600">{formatCurrency(Math.round(totalPayment))}</p></div>
                  <div className="glc-stat text-left" style={{ borderColor: '#fef3c7' }}><p className="text-[10px] font-bold text-yellow-500 uppercase mb-1">Gold Pledged</p><p className="text-xl font-black text-yellow-700">{goldWeight}g = {formatCurrency(goldValue)}</p></div>
                </div>
                <div className="h-56 mt-4"><ResultChart data={[{ name: 'Principal', value: loanAmount, color: '#a16207' }, { name: 'Interest', value: Math.round(totalInterest), color: '#ef4444' }]} centerText={`${tenure} mo\nTenure`} /></div>
              </div>
            </div>
          </div>

          <div className="mt-12"><div className="glc-glass p-8">
            <div className="flex items-center justify-between mb-8"><h2 className="text-xl font-black text-slate-900 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-600"></span> Repayment Schedule</h2><button onClick={() => setShowAmortization(!showAmortization)} className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg text-xs font-bold">{showAmortization ? 'Collapse' : 'Expand'}</button></div>
            <div className="overflow-x-auto"><table className="w-full glc-table"><thead><tr className="border-b border-slate-100"><th className="text-left">Period</th><th className="text-right">Principal</th><th className="text-right">Interest</th><th className="text-right">Balance</th></tr></thead><tbody className="divide-y divide-slate-50">
              {breakup.slice(0, showAmortization ? breakup.length : 3).map((y, i) => { const rem = Math.max(0, loanAmount - breakup.slice(0, i + 1).reduce((a, b) => a + b.principal, 0)); return <tr key={i}><td className="font-black text-slate-900">{i + 1}</td><td className="text-right text-emerald-600 font-bold">+{formatCurrency(Math.round(y.principal))}</td><td className="text-right text-rose-500 font-bold">-{formatCurrency(Math.round(y.interest))}</td><td className="text-right text-blue-600 font-black">{formatCurrency(Math.round(rem))}</td></tr>; })}
            </tbody></table></div>
            
            {(() => {
              const exportData = breakup.map((y, i) => ({ 
                period: i + 1, 
                principal: Math.round(y.principal), 
                interest: Math.round(y.interest), 
                balance: Math.round(Math.max(0, loanAmount - breakup.slice(0, i + 1).reduce((a, b) => a + b.principal, 0))) 
              }));
              return (
                <ExportButtons 
                  data={exportData}
                  filename="Gold_Loan_Amortization_Schedule"
                  title="Gold Loan Amortization Schedule"
                  columns={[
                    { header: 'Period', dataKey: 'period' },
                    { header: 'Principal Paid (Rs)', dataKey: 'principal', isCurrency: true },
                    { header: 'Interest Paid (Rs)', dataKey: 'interest', isCurrency: true },
                    { header: 'Outstanding Balance (Rs)', dataKey: 'balance', isCurrency: true }
                  ]}
                />
              );
            })()}

          </div></div>

          <div className="mt-12"><div className="glc-glass p-8">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Gold Loan Interest Rates 2025</h2>
            <div className="overflow-x-auto"><table className="w-full glc-table text-left"><thead><tr className="border-b-2 border-slate-100"><th>Lender</th><th>Rate (%)</th><th>Max LTV</th><th>Max Tenure</th><th>Processing</th></tr></thead><tbody className="divide-y divide-slate-50">{BANK_RATES.map((b, i) => (<tr key={i}><td className="font-bold text-slate-800 whitespace-nowrap">{b.bank}</td><td className="text-yellow-700 font-bold">{b.rate}</td><td className="text-slate-600">{b.ltv}</td><td className="text-slate-600">{b.maxTenure}</td><td className="text-slate-600">{b.processing}</td></tr>))}</tbody></table></div>
          </div></div>

          <div className="mt-12"><CalculatorContentWrapper {...contentData} /></div>
          <div className="mt-12 mb-16"><h2 className="text-xl font-black text-slate-900 mb-6">Related Calculators</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{contentData.relatedCalculators.map((c, i) => (<Link key={i} to={c.url} className="glc-glass p-5 hover:shadow-lg transition-all group"><h3 className="font-bold text-slate-900 group-hover:text-yellow-700 mb-1">{c.name}</h3><p className="text-xs text-slate-500">{c.description}</p></Link>))}</div></div>
        </div>
        <footer className="max-w-6xl mx-auto px-4 pb-12"><div className="bg-slate-50 border border-slate-200 rounded-xl p-6"><p className="text-xs text-slate-500"><strong>Disclaimer:</strong> Gold rates and loan terms are indicative. Actual values depend on gold purity, lender, and market conditions. © 2025 MoneyCal India.</p></div></footer>
      </div>
    </>
  );
};

export { GoldLoanEmiCalculator };
export default GoldLoanEmiCalculator;
