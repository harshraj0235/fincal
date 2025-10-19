import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency, calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';
import { 
  Sliders, Calculator, TrendingUp, Info, ExternalLink, DollarSign, 
  Calendar, Percent, Award, Download, Share2, BookOpen, CheckCircle2,
  Target, Sparkles, Home, Car, Briefcase, GraduationCap, Building2,
  ChevronDown, ChevronUp, BarChart3, PieChart as PieChartIcon, LineChart,
  Zap, ArrowRight, Clock, AlertCircle, FileText, RefreshCw
} from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { BarChart } from '../components/BarChart';
import WhyChooseUs from '../components/WhyChooseUs';

const EmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [prepayment, setPrepayment] = useState<number>(0);
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [breakup, setBreakup] = useState<{ principal: number; interest: number; balance: number; year: number }[]>([]);
  
  // Advanced features
  const [activeTab, setActiveTab] = useState<'calculator' | 'guide' | 'comparison'>('calculator');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [loanType, setLoanType] = useState<'home' | 'car' | 'personal' | 'business'>('home');
  const [showAmortization, setShowAmortization] = useState<boolean>(false);
  
  // Manual input states
  const [manualLoanAmount, setManualLoanAmount] = useState<string>(loanAmount.toString());
  const [manualInterestRate, setManualInterestRate] = useState<string>(interestRate.toString());
  const [manualTenure, setManualTenure] = useState<string>(loanTenure.toString());
  const [manualPrepayment, setManualPrepayment] = useState<string>(prepayment.toString());

  // Calculate EMI and breakup
  useEffect(() => {
    const tenureMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
    const emiResult = calculateEMI(loanAmount, interestRate, tenureMonths);
    
    setEmi(emiResult);
    const calculatedTotalPayment = emiResult * tenureMonths;
    const calculatedTotalInterest = calculatedTotalPayment - loanAmount;
    setTotalInterest(calculatedTotalInterest);
    setTotalPayment(calculatedTotalPayment);
    
    // Generate year-wise breakup
    const yearlyBreakup: { principal: number; interest: number; balance: number; year: number }[] = [];
    let balance = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    
    for (let year = 1; year <= Math.ceil(tenureMonths / 12); year++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      const endMonth = Math.min(year * 12, tenureMonths);
      const startMonth = (year - 1) * 12 + 1;
      
      for (let month = startMonth; month <= endMonth; month++) {
        const interest = balance * monthlyRate;
        const principal = emiResult - interest;
        yearPrincipal += principal;
        yearInterest += interest;
        balance -= principal;
      }
      
      yearlyBreakup.push({
        year,
        principal: yearPrincipal,
        interest: yearInterest,
        balance: Math.max(0, balance)
      });
    }
    
    setBreakup(yearlyBreakup);
  }, [loanAmount, interestRate, loanTenure, tenureType, prepayment]);

  // Update manual inputs when sliders change
  useEffect(() => {
    setManualLoanAmount(loanAmount.toString());
    setManualInterestRate(interestRate.toString());
    setManualTenure(loanTenure.toString());
    setManualPrepayment(prepayment.toString());
  }, [loanAmount, interestRate, loanTenure, prepayment]);

  // Handle manual input changes
  const handleManualLoanAmount = (value: string) => {
    setManualLoanAmount(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 100000 && num <= 50000000) setLoanAmount(num);
  };

  const handleManualInterestRate = (value: string) => {
    setManualInterestRate(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 5 && num <= 20) setInterestRate(num);
  };

  const handleManualTenure = (value: string) => {
    setManualTenure(value);
    const num = parseInt(value);
    if (!isNaN(num)) {
      if (tenureType === 'years' && num >= 1 && num <= 30) setLoanTenure(num);
      if (tenureType === 'months' && num >= 12 && num <= 360) setLoanTenure(num);
    }
  };

  const handleManualPrepayment = (value: string) => {
    setManualPrepayment(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0 && num <= loanAmount) setPrepayment(num);
  };

  // Loan type presets
  const loanTypePresets = {
    home: { amount: 2500000, rate: 8.5, tenure: 20, icon: Home, color: 'from-blue-500 to-indigo-600', name: 'Home Loan' },
    car: { amount: 800000, rate: 9.5, tenure: 7, icon: Car, color: 'from-green-500 to-emerald-600', name: 'Car Loan' },
    personal: { amount: 300000, rate: 11.5, tenure: 5, icon: Briefcase, color: 'from-purple-500 to-pink-600', name: 'Personal Loan' },
    business: { amount: 1500000, rate: 10.5, tenure: 10, icon: Building2, color: 'from-orange-500 to-red-600', name: 'Business Loan' }
  };

  const applyPreset = (type: 'home' | 'car' | 'personal' | 'business') => {
    const preset = loanTypePresets[type];
    setLoanType(type);
    setLoanAmount(preset.amount);
    setInterestRate(preset.rate);
    setLoanTenure(preset.tenure);
    setTenureType('years');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My EMI Calculation',
        text: `Loan: ${formatCurrency(loanAmount)}, EMI: ${formatCurrency(emi)}/month for ${loanTenure} ${tenureType}`,
        url: window.location.href
      });
    }
  };

  const faqs = [
    {
      question: "How to calculate EMI for home loan, car loan, or personal loan in India 2025?",
      answer: `<strong>EMI Calculation Formula:</strong><br/><br/>
      <strong>EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]</strong><br/><br/>
      Where:<br/>
      • P = Principal loan amount<br/>
      • R = Monthly interest rate (Annual rate ÷ 12 ÷ 100)<br/>
      • N = Loan tenure in months<br/><br/>
      <strong>Example: Home Loan</strong><br/>
      • Loan amount: ₹25,00,000<br/>
      • Interest rate: 8.5% per annum<br/>
      • Tenure: 20 years (240 months)<br/>
      • Monthly EMI: ₹21,611<br/>
      • Total interest: ₹26,86,640<br/>
      • Total payment: ₹51,86,640<br/><br/>
      Use our calculator above for instant calculations! Compare with <a href="/calculators/home-loan-calculator" class="text-blue-600 underline">Home Loan Calculator</a> for detailed analysis.`,
      keywords: "EMI calculation formula, how to calculate EMI, EMI calculator India 2025, home loan EMI"
    },
    {
      question: "What is the current home loan interest rate in India for 2025?",
      answer: `<strong>Latest Home Loan Interest Rates (October 2025):</strong><br/><br/>
      <strong>Major Banks:</strong><br/>
      • <strong>SBI:</strong> 8.50% - 9.65% p.a.<br/>
      • <strong>HDFC Bank:</strong> 8.60% - 9.50% p.a.<br/>
      • <strong>ICICI Bank:</strong> 8.75% - 9.50% p.a.<br/>
      • <strong>Axis Bank:</strong> 8.75% - 9.65% p.a.<br/>
      • <strong>Kotak Mahindra:</strong> 8.70% - 9.40% p.a.<br/>
      • <strong>Bank of Baroda:</strong> 8.40% - 9.35% p.a.<br/><br/>
      <strong>Factors Affecting Rate:</strong><br/>
      • Credit score (750+: lowest rates)<br/>
      • Loan-to-value ratio (lower LTV = lower rate)<br/>
      • Income stability and employment type<br/>
      • Existing relationship with bank<br/>
      • Property location and type<br/><br/>
      <strong>Pro Tip:</strong> Even 0.5% rate difference saves lakhs over 20 years! Use our <a href="/calculators/loan-comparison-calculator" class="text-blue-600 underline">Loan Comparison Tool</a> to compare offers.`,
      keywords: "home loan interest rate 2025, SBI home loan rate, HDFC housing loan interest"
    },
    {
      question: "How to reduce EMI amount? Can I prepay my loan to save interest?",
      answer: `<strong>5 Proven Ways to Reduce EMI:</strong><br/><br/>
      <strong>1. Make Prepayments (Most Effective):</strong><br/>
      • Prepay ₹1 lakh on ₹25L loan = Save ₹3-4 lakhs in interest<br/>
      • Prepay annually using bonus or extra income<br/>
      • Choose "reduce tenure" option (saves more than "reduce EMI")<br/>
      • Most banks allow prepayment without penalty now<br/><br/>
      <strong>2. Increase Tenure (Reduces Monthly EMI):</strong><br/>
      • 15 years → 20 years: EMI reduces by ~₹3,000-4,000<br/>
      • ⚠️ But total interest increases significantly<br/>
      • Only do this if monthly cashflow is tight<br/><br/>
      <strong>3. Negotiate Lower Interest Rate:</strong><br/>
      • Compare rates across banks<br/>
      • Use competitor's quote to negotiate<br/>
      • Improve credit score to 750+ for better rates<br/>
      • 0.5% reduction = ₹1,000-2,000 monthly saving<br/><br/>
      <strong>4. Transfer Loan (Balance Transfer):</strong><br/>
      • Move to bank offering lower rates<br/>
      • Processing fee: 0.5-1% of outstanding<br/>
      • Worth it if rate difference > 1%<br/>
      • Use <a href="/calculators/loan-refinance-calculator" class="text-blue-600 underline">Loan Refinance Calculator</a><br/><br/>
      <strong>5. Pay Extra Every Month:</strong><br/>
      • Even ₹5,000 extra/month reduces tenure by 3-5 years<br/>
      • Saves 30-40% of total interest<br/><br/>
      Calculate savings: <a href="/calculators/loan-prepayment-calculator" class="text-blue-600 underline">Prepayment Calculator</a>`,
      keywords: "how to reduce EMI, loan prepayment benefits, reduce home loan EMI, save interest on loan"
    },
    {
      question: "EMI vs Lump Sum Payment: Which is better for car/personal loan?",
      answer: `<strong>EMI vs Lump Sum Comparison:</strong><br/><br/>
      <strong>EMI (Equated Monthly Installment):</strong><br/>
      ✅ <strong>Advantages:</strong><br/>
      • Manageable monthly payments<br/>
      • Preserves savings/emergency fund<br/>
      • Can invest surplus in mutual funds/FD<br/>
      • Helps build credit score<br/>
      • Tax benefits (home loan)<br/><br/>
      ❌ <strong>Disadvantages:</strong><br/>
      • Pay interest (8-12% annually)<br/>
      • Total cost higher<br/>
      • Long-term financial commitment<br/><br/>
      <strong>Lump Sum Payment:</strong><br/>
      ✅ <strong>Advantages:</strong><br/>
      • Zero interest paid<br/>
      • No debt burden<br/>
      • Complete ownership immediately<br/><br/>
      ❌ <strong>Disadvantages:</strong><br/>
      • Depletes savings completely<br/>
      • No emergency buffer<br/>
      • Missed investment opportunities<br/>
      • No tax benefits<br/><br/>
      <strong>Recommendation:</strong><br/>
      • <strong>Home Loan:</strong> Always take EMI (tax benefits + leverage)<br/>
      • <strong>Car Loan:</strong> Take EMI if interest < 10%, else consider lump sum<br/>
      • <strong>Personal Loan:</strong> Avoid if possible, or take for emergency only<br/><br/>
      <strong>Smart Strategy:</strong> Take EMI, invest the saved amount in mutual funds. 
      If SIP returns 12% and loan rate is 8.5%, you profit 3.5%!<br/><br/>
      Compare: <a href="/calculators/sip-calculator" class="text-blue-600 underline">SIP Calculator</a>`,
      keywords: "EMI vs lump sum, should I take loan or pay cash, car loan vs cash payment"
    },
    {
      question: "What is the maximum EMI to income ratio? How much loan can I afford?",
      answer: `<strong>EMI to Income Ratio Guidelines:</strong><br/><br/>
      <strong>Banks' Eligibility Criteria:</strong><br/>
      • <strong>Maximum EMI:</strong> 50-60% of monthly income<br/>
      • <strong>Recommended EMI:</strong> 35-40% of income (safe limit)<br/>
      • <strong>Conservative:</strong> 25-30% for financial comfort<br/><br/>
      <strong>Example:</strong><br/>
      Monthly Income: ₹1,00,000<br/>
      • Maximum EMI: ₹50,000-60,000 (banks approve)<br/>
      • Recommended: ₹35,000-40,000 (financial advisors suggest)<br/>
      • Safe limit: ₹25,000-30,000 (leaves buffer for emergencies)<br/><br/>
      <strong>FOIR (Fixed Obligation to Income Ratio):</strong><br/>
      Banks calculate: (All EMIs + Rent) ÷ Income<br/>
      • FOIR should be < 50% for approval<br/>
      • Include existing loans, credit cards, rent<br/><br/>
      <strong>How Much Loan Can You Get?</strong><br/>
      Income: ₹1 lakh/month, Safe EMI: ₹40,000<br/>
      • At 8.5% for 20 years: ₹46.26 lakhs<br/>
      • At 9% for 20 years: ₹44.55 lakhs<br/>
      • At 10% for 20 years: ₹41.26 lakhs<br/><br/>
      Calculate your affordability: <a href="/calculators/loan-affordability-calculator" class="text-blue-600 underline">Loan Affordability Calculator</a><br/><br/>
      <strong>Official Source:</strong> Check RBI guidelines at <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">RBI Official Site <ExternalLink class="w-3 h-3 inline" /></a>`,
      keywords: "EMI to income ratio, how much loan can I afford, maximum EMI calculation, FOIR calculator"
    },
    {
      question: "Home loan tax benefits 2025: Section 80C and 24(b) explained",
      answer: `<strong>Complete Tax Benefits on Home Loan:</strong><br/><br/>
      <strong>Section 24(b) - Interest Deduction:</strong><br/>
      • <strong>Self-occupied property:</strong> Up to ₹2,00,000 per year<br/>
      • <strong>Let-out property:</strong> No limit on interest deduction<br/>
      • Available from first EMI payment<br/>
      • Deducted from "Income from House Property"<br/><br/>
      <strong>Section 80C - Principal Repayment:</strong><br/>
      • Deduction: Up to ₹1,50,000 per year<br/>
      • Only after possession certificate received<br/>
      • Shared with other 80C investments (PPF, ELSS, etc.)<br/><br/>
      <strong>Section 80EEA - Additional Deduction (First-time Buyers):</strong><br/>
      • Extra ₹1,50,000 on interest (beyond 24(b)'s ₹2L)<br/>
      • Property value: Up to ₹45 lakhs<br/>
      • Sanctioned between April 2019 - March 2022<br/>
      • Stamp duty value ≤ ₹45 lakhs<br/><br/>
      <strong>Example Calculation:</strong><br/>
      Loan: ₹25 lakhs, Interest paid: ₹2,10,000/year, Principal: ₹80,000/year<br/>
      • Section 24(b): ₹2,00,000 deduction<br/>
      • Section 80C: ₹80,000 deduction<br/>
      • Total deduction: ₹2,80,000<br/>
      • Tax saved (30% bracket): ₹84,000 per year!<br/><br/>
      Calculate your savings: <a href="/calculators/income-tax-calculator" class="text-blue-600 underline">Income Tax Calculator</a> | 
      <a href="/calculators/section-80c-calculator" class="text-blue-600 underline">Section 80C Calculator</a>`,
      keywords: "home loan tax benefits 2025, Section 24b deduction, Section 80C home loan, housing loan tax saving"
    },
    {
      question: "Fixed vs Floating interest rate: Which EMI type should I choose?",
      answer: `<strong>Fixed vs Floating Rate Comparison:</strong><br/><br/>
      <strong>Fixed Interest Rate:</strong><br/>
      ✅ <strong>Advantages:</strong><br/>
      • EMI remains constant throughout tenure<br/>
      • Easy budgeting and planning<br/>
      • Protection from rate hikes<br/>
      • Peace of mind<br/><br/>
      ❌ <strong>Disadvantages:</strong><br/>
      • Usually 0.5-1% higher than floating<br/>
      • Can't benefit if rates fall<br/>
      • Higher total interest cost<br/><br/>
      <strong>Floating/Variable Interest Rate:</strong><br/>
      ✅ <strong>Advantages:</strong><br/>
      • Lower initial rates (0.5-1% less)<br/>
      • Benefit when RBI reduces repo rate<br/>
      • Lower total interest in falling rate scenario<br/><br/>
      ❌ <strong>Disadvantages:</strong><br/>
      • EMI can increase if rates rise<br/>
      • Unpredictable monthly outflow<br/>
      • Budgeting uncertainty<br/><br/>
      <strong>Current Market Scenario (October 2025):</strong><br/>
      • RBI repo rate: 6.50%<br/>
      • Expected trend: Stable to slightly decreasing<br/>
      • Recommendation: <strong>Floating rate</strong> (rates unlikely to rise significantly)<br/><br/>
      <strong>Best Strategy:</strong><br/>
      • Start with floating rate<br/>
      • Convert to fixed if rates expected to rise sharply<br/>
      • Review every 2-3 years<br/><br/>
      <strong>Who Should Choose Fixed:</strong><br/>
      • Risk-averse borrowers<br/>
      • Tight monthly budgets<br/>
      • Long tenure loans (25-30 years)<br/><br/>
      <strong>Who Should Choose Floating:</strong><br/>
      • Can handle EMI fluctuations<br/>
      • Want to save on interest<br/>
      • Believe rates will fall/stabilize<br/><br/>
      Check latest rates: <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">RBI Website <ExternalLink class="w-3 h-3 inline" /></a>`,
      keywords: "fixed vs floating interest rate, which loan type is better, home loan fixed or floating"
    },
    {
      question: "Step-by-step guide: How to use EMI calculator for accurate loan planning?",
      answer: `<strong>Complete EMI Calculator Usage Guide:</strong><br/><br/>
      <strong>Step 1: Choose Loan Type (Quick Presets)</strong><br/>
      Click one of the preset buttons:<br/>
      • 🏠 <strong>Home Loan:</strong> ₹25L, 8.5%, 20 years<br/>
      • 🚗 <strong>Car Loan:</strong> ₹8L, 9.5%, 7 years<br/>
      • 💼 <strong>Personal Loan:</strong> ₹3L, 11.5%, 5 years<br/>
      • 🏢 <strong>Business Loan:</strong> ₹15L, 10.5%, 10 years<br/><br/>
      Or manually enter your values below.<br/><br/>
      <strong>Step 2: Enter Loan Amount</strong><br/>
      • Use slider or type exact amount<br/>
      • Minimum: ₹1 lakh<br/>
      • Maximum: ₹5 crores<br/>
      • Tip: Enter the loan amount AFTER down payment<br/>
      • Example: ₹50L property - ₹10L down payment = ₹40L loan<br/><br/>
      <strong>Step 3: Set Interest Rate</strong><br/>
      • Check current bank rates (8.5-10% typical for home loans)<br/>
      • Personal loans: 10-16%<br/>
      • Car loans: 8-11%<br/>
      • Use exact rate from bank's offer letter<br/><br/>
      <strong>Step 4: Choose Tenure</strong><br/>
      • Select Years or Months from dropdown<br/>
      • Home loans: 15-30 years typical<br/>
      • Car loans: 5-7 years<br/>
      • Personal loans: 1-5 years<br/>
      • Longer tenure = Lower EMI but Higher total interest<br/><br/>
      <strong>Step 5: Add Prepayment (Optional)</strong><br/>
      • Enter any lump sum payment you plan to make<br/>
      • See how it reduces interest and tenure<br/><br/>
      <strong>Step 6: View Results</strong><br/>
      • Monthly EMI amount<br/>
      • Total interest payable<br/>
      • Total payment over loan life<br/>
      • Interactive pie chart (principal vs interest)<br/>
      • Year-wise amortization schedule<br/><br/>
      <strong>Step 7: Download or Share</strong><br/>
      • Download PDF report<br/>
      • Share results with family/advisor<br/><br/>
      For specialized calculations:<br/>
      • <a href="/calculators/home-loan-calculator" class="text-blue-600 underline">Home Loan Calculator</a><br/>
      • <a href="/calculators/car-loan-calculator" class="text-blue-600 underline">Car Loan Calculator</a><br/>
      • <a href="/calculators/personal-loan-calculator" class="text-blue-600 underline">Personal Loan Calculator</a>`,
      keywords: "how to use EMI calculator, EMI calculator guide, step by step EMI calculation"
    },
    {
      question: "What is amortization schedule? How does principal and interest change over time?",
      answer: `<strong>Understanding Loan Amortization:</strong><br/><br/>
      <strong>What is Amortization?</strong><br/>
      Amortization is the process of gradually paying off a loan through regular EMI payments. 
      Each EMI has two components: principal and interest. The proportion changes over time.<br/><br/>
      <strong>Early Years (First 5-7 years):</strong><br/>
      • <strong>Interest portion:</strong> 70-80% of EMI<br/>
      • <strong>Principal portion:</strong> 20-30% of EMI<br/>
      • Example: EMI ₹21,611 → Interest ₹17,000, Principal ₹4,600<br/>
      • You're mostly paying interest, loan reduces slowly<br/><br/>
      <strong>Middle Years (8-15 years):</strong><br/>
      • <strong>Interest:</strong> 50% of EMI<br/>
      • <strong>Principal:</strong> 50% of EMI<br/>
      • Equal split between interest and principal<br/><br/>
      <strong>Later Years (16-20 years):</strong><br/>
      • <strong>Interest:</strong> 20-30% of EMI<br/>
      • <strong>Principal:</strong> 70-80% of EMI<br/>
      • Example: EMI ₹21,611 → Interest ₹4,000, Principal ₹17,600<br/>
      • Loan reduces quickly<br/><br/>
      <strong>Why This Happens:</strong><br/>
      Interest is calculated on outstanding balance. As balance reduces, interest reduces, 
      but EMI stays same. So principal portion automatically increases.<br/><br/>
      <strong>Key Insight for Prepayment:</strong><br/>
      Prepaying in early years saves MORE interest because:<br/>
      • Outstanding balance is higher<br/>
      • More interest is being charged<br/>
      • Reducing principal early has compounding effect<br/><br/>
      <strong>Example:</strong><br/>
      Prepay ₹1L in Year 1: Saves ₹3-4 lakhs in interest<br/>
      Prepay ₹1L in Year 15: Saves ₹50,000-1 lakh only<br/><br/>
      View detailed schedule in our calculator's amortization table above!`,
      keywords: "amortization schedule explained, principal vs interest in EMI, how EMI breakup changes"
    },
    {
      question: "Best banks for lowest EMI in India 2025: Compare rates",
      answer: `<strong>Lowest EMI Banks - October 2025 Comparison:</strong><br/><br/>
      <strong>Home Loans (Lowest Rates):</strong><br/>
      1. <strong>Bank of Baroda:</strong> 8.40% onwards (lowest)<br/>
      2. <strong>SBI:</strong> 8.50% onwards<br/>
      3. <strong>HDFC:</strong> 8.60% onwards<br/>
      4. <strong>PNB:</strong> 8.65% onwards<br/>
      5. <strong>ICICI:</strong> 8.75% onwards<br/><br/>
      <strong>For ₹25 Lakh, 20 Years:</strong><br/>
      • 8.40%: EMI ₹21,436 (Bank of Baroda) - Lowest!<br/>
      • 8.50%: EMI ₹21,611 (SBI)<br/>
      • 8.75%: EMI ₹21,964 (ICICI)<br/>
      • Difference: ₹528/month = ₹1.26 lakhs over 20 years<br/><br/>
      <strong>Car Loans (Lowest Rates):</strong><br/>
      1. <strong>SBI:</strong> 8.75% - 9.70%<br/>
      2. <strong>HDFC Bank:</strong> 9.00% - 10.50%<br/>
      3. <strong>ICICI:</strong> 9.50% - 11.00%<br/>
      4. <strong>Dealer financing:</strong> 9.00% - 12.00%<br/><br/>
      <strong>Personal Loans (Lowest Rates):</strong><br/>
      1. <strong>HDFC:</strong> 10.50% - 21.00%<br/>
      2. <strong>SBI:</strong> 11.15% - 14.00%<br/>
      3. <strong>ICICI:</strong> 10.75% - 19.00%<br/>
      4. <strong>Kotak:</strong> 10.99% - 22.00%<br/><br/>
      <strong>How to Get Lowest Rate:</strong><br/>
      • Maintain credit score 750+<br/>
      • Existing customer relationship<br/>
      • Salary account with the bank<br/>
      • Higher down payment (lower LTV)<br/>
      • Stable employment (2+ years)<br/><br/>
      <strong>Pro Tips:</strong><br/>
      • Negotiate with multiple banks<br/>
      • Use competitor's quote for bargaining<br/>
      • Check for processing fee waivers<br/>
      • Look for special festive offers<br/><br/>
      Compare multiple offers: <a href="/calculators/loan-comparison-calculator" class="text-blue-600 underline">Loan Comparison Calculator</a>`,
      keywords: "lowest EMI bank India, best home loan rates 2025, which bank offers lowest interest"
    }
  ];

  const currentPreset = loanTypePresets[loanType];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -mx-4 -my-4 md:-mx-8 md:-my-8">
      {/* Premium Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16 md:py-20 px-4 md:px-8"
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
              <Calculator className="w-20 h-20" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            EMI Calculator 2025 - Free Loan EMI Calculator India
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto mb-8 leading-relaxed">
            Calculate loan EMI for home, car, personal, and business loans. Instant results with amortization schedule, 
            interest breakup, and prepayment calculator. Free online EMI calculator with latest interest rates.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              <span>100% Accurate</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              <span>All Loan Types</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              <span>Instant Results</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-700 rounded-full font-bold text-lg hover:shadow-2xl transition-all"
            >
              <Share2 className="w-5 h-5 mr-2" /> Share Results
            </motion.button>
            <motion.a
              href="https://www.rbi.org.in/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all"
            >
              RBI Official Site <ExternalLink className="w-5 h-5 ml-2" />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Loan Type Selection */}
      <div className="w-full px-4 md:px-8 -mt-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Choose Loan Type (Quick Presets)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(loanTypePresets).map(([key, preset]) => (
              <motion.button
                key={key}
                onClick={() => applyPreset(key as any)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`p-6 rounded-2xl font-bold transition-all flex flex-col items-center gap-3 ${
                  loanType === key
                    ? `bg-gradient-to-br ${preset.color} text-white shadow-xl`
                    : 'bg-gray-100 text-gray-700 hover:shadow-lg'
                }`}
              >
                <preset.icon className="w-10 h-10" />
                <span>{preset.name}</span>
                {loanType === key && <CheckCircle2 className="w-5 h-5" />}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="w-full px-4 md:px-8 mt-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-2 flex flex-wrap gap-2">
          {[
            { id: 'calculator', label: 'EMI Calculator', icon: Calculator },
            { id: 'guide', label: 'How to Use', icon: BookOpen },
            { id: 'comparison', label: 'Comparison', icon: BarChart3 }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 min-w-[140px] py-4 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-lg ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="w-6 h-6" />
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="w-full px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Left Column - Inputs */}
              <div className="space-y-6">
                {/* Input Controls */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-blue-100"
                >
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-6">
                    <Sliders className="w-7 h-7 mr-3 text-blue-600" />
                    Loan Details
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Loan Amount */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-bold text-gray-800 flex items-center">
                          <DollarSign className="w-5 h-5 mr-1 text-green-600" />
                          Loan Amount (₹)
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-blue-700">
                            {formatCurrency(loanAmount)}
                          </span>
                          <input 
                            type="number"
                            value={manualLoanAmount}
                            onChange={(e) => handleManualLoanAmount(e.target.value)}
                            className="w-32 px-3 py-2 text-sm border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            min="100000"
                            max="50000000"
                            step="100000"
                          />
                        </div>
                      </div>
                      <input 
                        type="range" 
                        min="100000" 
                        max="50000000" 
                        step="100000" 
                        value={loanAmount} 
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((loanAmount - 100000) / (50000000 - 100000)) * 100}%, #dbeafe ${((loanAmount - 100000) / (50000000 - 100000)) * 100}%, #dbeafe 100%)`
                        }}
                      />
                      <div className="flex justify-between mt-2 text-xs text-gray-600">
                        <span>₹1L</span>
                        <span>₹5Cr</span>
                      </div>
                    </div>
                    
                    {/* Interest Rate */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-bold text-gray-800 flex items-center">
                          <Percent className="w-5 h-5 mr-1 text-green-600" />
                          Interest Rate (% p.a.)
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-green-700">
                            {interestRate.toFixed(2)}%
                          </span>
                          <input 
                            type="number"
                            value={manualInterestRate}
                            onChange={(e) => handleManualInterestRate(e.target.value)}
                            className="w-24 px-3 py-2 text-sm border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                            min="5"
                            max="20"
                            step="0.1"
                          />
                        </div>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="20" 
                        step="0.1" 
                        value={interestRate} 
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-green-200 to-emerald-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #22c55e 0%, #22c55e ${((interestRate - 5) / (20 - 5)) * 100}%, #dcfce7 ${((interestRate - 5) / (20 - 5)) * 100}%, #dcfce7 100%)`
                        }}
                      />
                      <div className="flex justify-between mt-2 text-xs text-gray-600">
                        <span>5%</span>
                        <span className="text-green-600 font-bold">Current: {interestRate}%</span>
                        <span>20%</span>
                      </div>
                    </div>
                    
                    {/* Tenure */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-bold text-gray-800 flex items-center">
                          <Calendar className="w-5 h-5 mr-1 text-purple-600" />
                          Loan Tenure
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-purple-700">
                            {loanTenure} {tenureType}
                          </span>
                          <input 
                            type="number"
                            value={manualTenure}
                            onChange={(e) => handleManualTenure(e.target.value)}
                            className="w-20 px-3 py-2 text-sm border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                            min={tenureType === 'years' ? "1" : "12"}
                            max={tenureType === 'years' ? "30" : "360"}
                          />
                          <select
                            value={tenureType}
                            onChange={(e) => setTenureType(e.target.value as any)}
                            className="px-3 py-2 text-sm border-2 border-purple-200 rounded-lg focus:border-purple-500 transition-all"
                          >
                            <option value="years">Years</option>
                            <option value="months">Months</option>
                          </select>
                        </div>
                      </div>
                      <input 
                        type="range" 
                        min={tenureType === 'years' ? "1" : "12"}
                        max={tenureType === 'years' ? "30" : "360"}
                        step={tenureType === 'years' ? "1" : "12"}
                        value={loanTenure} 
                        onChange={(e) => setLoanTenure(Number(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${((loanTenure - (tenureType === 'years' ? 1 : 12)) / ((tenureType === 'years' ? 30 : 360) - (tenureType === 'years' ? 1 : 12))) * 100}%, #f3e8ff ${((loanTenure - (tenureType === 'years' ? 1 : 12)) / ((tenureType === 'years' ? 30 : 360) - (tenureType === 'years' ? 1 : 12))) * 100}%, #f3e8ff 100%)`
                        }}
                      />
                      <div className="flex justify-between mt-2 text-xs text-gray-600">
                        <span>{tenureType === 'years' ? '1 Year' : '1 Year'}</span>
                        <span>{tenureType === 'years' ? '30 Years' : '30 Years'}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Results Summary */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden"
                >
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                  ></motion.div>

                  <h3 className="text-2xl font-bold mb-6 flex items-center relative z-10">
                    <Award className="w-7 h-7 mr-2" />
                    Your EMI Summary
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4 relative z-10">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-6 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm opacity-90">Monthly EMI</p>
                        <Calculator className="w-5 h-5 opacity-70" />
                      </div>
                      <p className="text-4xl font-extrabold">{formatCurrency(emi)}</p>
                      <p className="text-sm opacity-80 mt-1">Pay this amount every month</p>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="p-5 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm opacity-90">Principal</p>
                          <DollarSign className="w-5 h-5 opacity-70" />
                        </div>
                        <p className="text-2xl font-bold">{formatCurrency(loanAmount)}</p>
                      </motion.div>

                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="p-5 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm opacity-90">Total Interest</p>
                          <TrendingUp className="w-5 h-5 opacity-70" />
                        </div>
                        <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
                      </motion.div>
                    </div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl border-2 border-white/50 shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-orange-900">Total Payment</p>
                        <Target className="w-6 h-6 text-orange-900" />
                      </div>
                      <p className="text-4xl font-extrabold text-orange-900">{formatCurrency(totalPayment)}</p>
                      <div className="flex items-center mt-3 text-orange-900 text-sm font-semibold">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Principal + Interest
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-6 flex gap-3 relative z-10">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-3 bg-white text-blue-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                    >
                      <Download className="w-5 h-5" />
                      Download PDF
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAmortization(!showAmortization)}
                      className="flex-1 py-3 bg-white/20 backdrop-blur-sm rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/30 transition-all"
                    >
                      <FileText className="w-5 h-5" />
                      {showAmortization ? 'Hide' : 'Show'} Schedule
                    </motion.button>
                  </div>
                </motion.div>

                {/* Info Box */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-l-4 border-blue-500"
                >
                  <div className="flex items-start">
                    <Info className="h-6 w-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-900 font-bold mb-2">
                        💡 Your {currentPreset.name} EMI Breakdown
                      </p>
                      <p className="text-sm text-blue-800">
                        For a loan of <span className="font-bold">{formatCurrency(loanAmount)}</span> at{' '}
                        <span className="font-bold">{interestRate}% interest</span> for{' '}
                        <span className="font-bold">{loanTenure} {tenureType}</span>, you'll pay{' '}
                        <span className="font-bold text-green-700">{formatCurrency(emi)}/month</span>.{' '}
                        Total interest: <span className="font-bold text-red-700">{formatCurrency(totalInterest)}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Right Column - Charts & Analysis */}
              <div className="space-y-6">
                {/* Pie Chart */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-purple-100"
                >
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4">
                    <PieChartIcon className="w-7 h-7 mr-3 text-purple-600" />
                    Payment Breakup
                  </h2>
                  <div className="h-80">
                    <ResultChart 
                      data={[
                        { name: 'Principal Amount', value: loanAmount, color: '#3b82f6' },
                        { name: 'Total Interest', value: totalInterest, color: '#ef4444' }
                      ]}
                      centerText={`${formatCurrency(totalPayment)}\nTotal Payment`}
                    />
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-700">Principal</span>
                      </div>
                      <p className="text-xl font-bold text-blue-700">
                        {((loanAmount / totalPayment) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-700">Interest</span>
                      </div>
                      <p className="text-xl font-bold text-red-700">
                        {((totalInterest / totalPayment) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Bar Chart - Year wise breakup */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-indigo-100"
                >
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4">
                    <LineChart className="w-7 h-7 mr-3 text-indigo-600" />
                    Outstanding Balance
                  </h2>
                  <div className="h-80">
                    <BarChart 
                      data={breakup.filter((_, index) => index % Math.ceil(breakup.length / 10) === 0 || index === breakup.length - 1)}
                      xKey="year"
                      yKey="balance"
                      color="#6366f1"
                      xLabel="Year"
                      yLabel="Balance (₹)"
                      formatY={(value) => formatCurrency(value)}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    📉 Your loan balance decreases over time as you pay EMI
                  </p>
                </motion.div>

                {/* Amortization Table */}
                <AnimatePresence>
                  {showAmortization && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-100"
                    >
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4">
                        <FileText className="w-7 h-7 mr-3 text-gray-700" />
                        Year-wise Amortization Schedule
                      </h2>
                      <div className="overflow-auto max-h-96 rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gradient-to-r from-blue-50 to-purple-50 sticky top-0">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase">Year</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase">Principal Paid</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase">Interest Paid</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase">Balance</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-100">
                            {breakup.map((item, index) => (
                              <motion.tr 
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.02 }}
                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                              >
                                <td className="px-4 py-3 text-sm font-bold text-blue-700">{item.year}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(item.principal)}</td>
                                <td className="px-4 py-3 text-sm text-red-600 font-medium">{formatCurrency(item.interest)}</td>
                                <td className="px-4 py-3 text-sm font-bold text-purple-700">{formatCurrency(item.balance)}</td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {activeTab === 'guide' && (
            <motion.div
              key="guide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-2xl shadow-2xl p-10"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
                <BookOpen className="w-10 h-10 mr-4 text-blue-600" />
                Complete EMI Calculator Guide 2025
              </h2>

              <div className="space-y-8">
                {[
                  {
                    step: 1,
                    title: 'Choose Your Loan Type',
                    content: 'Select from Home, Car, Personal, or Business loan presets. Each preset auto-fills typical loan amounts, interest rates, and tenure for that loan type. You can customize any value after selecting.',
                    tip: 'Home loans have lowest rates (8-9%), Personal loans highest (10-16%)',
                    color: 'blue'
                  },
                  {
                    step: 2,
                    title: 'Enter Loan Amount',
                    content: 'Input the exact loan amount you need. For home loans, this is property cost minus down payment. Banks typically finance 75-90% of property value.',
                    tip: '20% down payment recommended to avoid higher interest rates and insurance costs',
                    color: 'green'
                  },
                  {
                    step: 3,
                    title: 'Set Interest Rate',
                    content: 'Enter the interest rate offered by your bank. Check your loan offer letter or bank website for exact rate. Rates vary based on credit score, relationship, and loan type.',
                    tip: 'Compare rates across 3-4 banks before finalizing. Even 0.5% difference = lakhs in savings',
                    color: 'purple'
                  },
                  {
                    step: 4,
                    title: 'Choose Tenure',
                    content: 'Select loan duration in years or months. Longer tenure = lower EMI but higher total interest. Shorter tenure = higher EMI but massive interest savings.',
                    tip: 'Most people choose 15-20 years for home loans, 5-7 years for car loans',
                    color: 'pink'
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`border-l-4 border-${step.color}-500 pl-6 py-2`}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                      <span className={`bg-gradient-to-br from-${step.color}-500 to-${step.color}-700 text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 text-lg`}>
                        {step.step}
                      </span>
                      {step.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-3">{step.content}</p>
                    <div className={`bg-${step.color}-50 p-4 rounded-lg`}>
                      <p className="text-sm text-gray-800">
                        <strong>💡 Pro Tip:</strong> {step.tip}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-2xl shadow-2xl p-10"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
                <BarChart3 className="w-10 h-10 mr-4 text-purple-600" />
                Loan Types Comparison - India 2025
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-100 to-pink-100">
                      <th className="px-4 py-3 text-left text-sm font-bold text-purple-900">Features</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-purple-900">Home Loan</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-purple-900">Car Loan</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-purple-900">Personal Loan</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-purple-900">Business Loan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">Interest Rate</td>
                      <td className="px-4 py-3 text-center text-green-700 font-bold">8.5-9.5%</td>
                      <td className="px-4 py-3 text-center">8.75-11%</td>
                      <td className="px-4 py-3 text-center text-red-700">10-16%</td>
                      <td className="px-4 py-3 text-center">9-13%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">Typical Amount</td>
                      <td className="px-4 py-3 text-center">₹10L - ₹5Cr</td>
                      <td className="px-4 py-3 text-center">₹3L - ₹20L</td>
                      <td className="px-4 py-3 text-center">₹50K - ₹40L</td>
                      <td className="px-4 py-3 text-center">₹5L - ₹50L</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">Tenure</td>
                      <td className="px-4 py-3 text-center">Up to 30 years</td>
                      <td className="px-4 py-3 text-center">5-7 years</td>
                      <td className="px-4 py-3 text-center">1-5 years</td>
                      <td className="px-4 py-3 text-center">5-15 years</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">Processing Fee</td>
                      <td className="px-4 py-3 text-center">0.25-0.50%</td>
                      <td className="px-4 py-3 text-center">2-3%</td>
                      <td className="px-4 py-3 text-center">1-3%</td>
                      <td className="px-4 py-3 text-center">1-2%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">Collateral</td>
                      <td className="px-4 py-3 text-center text-green-700">Property</td>
                      <td className="px-4 py-3 text-center text-green-700">Vehicle</td>
                      <td className="px-4 py-3 text-center text-red-700">Usually None</td>
                      <td className="px-4 py-3 text-center">Property/Assets</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">Tax Benefits</td>
                      <td className="px-4 py-3 text-center text-green-700 font-bold">Yes (80C, 24b)</td>
                      <td className="px-4 py-3 text-center text-red-700">No</td>
                      <td className="px-4 py-3 text-center text-red-700">No</td>
                      <td className="px-4 py-3 text-center text-green-700">Yes (Business)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">Prepayment</td>
                      <td className="px-4 py-3 text-center text-green-700">Usually Free</td>
                      <td className="px-4 py-3 text-center">2-5% penalty</td>
                      <td className="px-4 py-3 text-center">2-6% penalty</td>
                      <td className="px-4 py-3 text-center">Varies</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(loanTypePresets).map(([key, preset]) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.03 }}
                    className={`p-6 bg-gradient-to-br ${preset.color} text-white rounded-xl`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold flex items-center">
                        <preset.icon className="w-8 h-8 mr-3" />
                        {preset.name}
                      </h3>
                      <button
                        onClick={() => applyPreset(key as any)}
                        className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition-all"
                      >
                        Try This
                      </button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Typical Amount:</span>
                        <span className="font-bold">{formatCurrency(preset.amount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest Rate:</span>
                        <span className="font-bold">{preset.rate}% p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tenure:</span>
                        <span className="font-bold">{preset.tenure} years</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Comprehensive FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl shadow-2xl p-10 border-2 border-gray-100"
        >
          <h2 className="text-4xl font-bold text-gray-900 flex items-center mb-8">
            <Info className="w-10 h-10 mr-4 text-blue-600" />
            EMI Calculator FAQs - Complete Guide 2025
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between bg-gray-50 hover:bg-blue-50 transition-colors"
                >
                  <h3 className="font-bold text-gray-900 pr-4 text-lg">{faq.question}</h3>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 py-6 bg-white">
                        <div 
                          className="prose max-w-none text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: faq.answer }} 
                        />
                        <div className="mt-4 flex flex-wrap gap-2">
                          {faq.keywords.split(', ').map((keyword, kidx) => (
                            <span key={kidx} className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Related Calculators */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Sparkles className="w-8 h-8 mr-3 text-blue-600" />
            Related Loan Calculators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Home Loan Calculator', url: '/calculators/home-loan-calculator', desc: 'Calculate home loan EMI with tax benefits' },
              { name: 'Car Loan Calculator', url: '/calculators/car-loan-calculator', desc: 'Calculate car loan EMI and total cost' },
              { name: 'Personal Loan', url: '/calculators/personal-loan-calculator', desc: 'Quick personal loan EMI calculator' },
              { name: 'Loan Prepayment', url: '/calculators/loan-prepayment-calculator', desc: 'Calculate prepayment savings' },
              { name: 'Loan Comparison', url: '/calculators/loan-comparison-calculator', desc: 'Compare multiple loan offers' },
              { name: 'Loan Refinance', url: '/calculators/loan-refinance-calculator', desc: 'Should you refinance your loan?' },
              { name: 'Loan Affordability', url: '/calculators/loan-affordability-calculator', desc: 'How much loan can you afford?' },
              { name: 'Business Loan', url: '/calculators/business-loan-calculator', desc: 'Business loan EMI calculator' }
            ].map((tool, index) => (
              <motion.a
                key={index}
                href={`https://moneycal.in${tool.url}`}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all"
              >
                <div className="font-bold text-gray-900 mb-2 flex items-center justify-between">
                  {tool.name}
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-sm text-gray-600">{tool.desc}</div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Official Resources */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 bg-white rounded-xl p-6 border-l-4 border-blue-600"
        >
          <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
            <ExternalLink className="w-6 h-6 mr-2 text-blue-700" />
            Official Resources for Loan Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://www.rbi.org.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-700 hover:underline font-medium"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              RBI - Reserve Bank of India
            </a>
            <a
              href="https://www.bankbazaar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-700 hover:underline font-medium"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              BankBazaar - Compare Loans
            </a>
            <a
              href="https://www.paisabazaar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-700 hover:underline font-medium"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              PaisaBazaar - Loan Rates
            </a>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;
export { EmiCalculator };
