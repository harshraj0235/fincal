import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency, calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';
import { 
  Sliders, PieChart as PieChartIcon, Calendar, Info, ExternalLink, 
  TrendingUp, DollarSign, Percent, Calculator as CalcIcon, Home,
  Car, CreditCard, Building, Briefcase, Award, Target, Sparkles,
  Download, Share2, BookOpen, CheckCircle2, AlertCircle, ArrowRight,
  ChevronDown, ChevronUp, BarChart3, LineChart, Clock, Zap, Shield
} from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { BarChart } from '../components/BarChart';
import WhyChooseUs from '../components/WhyChooseUs';

export const EmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [yearlyBreakup, setYearlyBreakup] = useState<any[]>([]);
  
  // Advanced features
  const [loanType, setLoanType] = useState<'home' | 'car' | 'personal' | 'business'>('home');
  const [activeTab, setActiveTab] = useState<'calculator' | 'guide' | 'comparison'>('calculator');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  
  // Manual input states
  const [manualLoanAmount, setManualLoanAmount] = useState<string>(loanAmount.toString());
  const [manualInterestRate, setManualInterestRate] = useState<string>(interestRate.toString());
  const [manualLoanTenure, setManualLoanTenure] = useState<string>(loanTenure.toString());

  useEffect(() => {
    const result = calculateEMI(loanAmount, interestRate, loanTenure);
    const breakup = calculateLoanBreakup(loanAmount, interestRate, loanTenure);
    setEmi(result);
    setTotalInterest(loanAmount * (interestRate / 100) * loanTenure);
    setTotalPayment(loanAmount + (loanAmount * (interestRate / 100) * loanTenure));
    setYearlyBreakup(breakup);
    
    // More accurate calculation
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;
    const accurateEMI = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    const accurateTotalPayment = accurateEMI * months;
    const accurateTotalInterest = accurateTotalPayment - loanAmount;
    
    setEmi(accurateEMI);
    setTotalInterest(accurateTotalInterest);
    setTotalPayment(accurateTotalPayment);
  }, [loanAmount, interestRate, loanTenure]);

  useEffect(() => {
    setManualLoanAmount(loanAmount.toString());
    setManualInterestRate(interestRate.toString());
    setManualLoanTenure(loanTenure.toString());
  }, [loanAmount, interestRate, loanTenure]);

  const handleManualLoanAmountChange = (value: string) => {
    setManualLoanAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 10000 && numValue <= 100000000) {
      setLoanAmount(numValue);
    }
  };

  const handleManualInterestRateChange = (value: string) => {
    setManualInterestRate(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 25) {
      setInterestRate(numValue);
    }
  };

  const handleManualLoanTenureChange = (value: string) => {
    setManualLoanTenure(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 30) {
      setLoanTenure(numValue);
    }
  };

  const loanTypePresets = {
    home: { amount: 5000000, rate: 8.5, tenure: 20, icon: Home, color: 'from-blue-500 to-indigo-600' },
    car: { amount: 800000, rate: 9.5, tenure: 7, icon: Car, color: 'from-green-500 to-emerald-600' },
    personal: { amount: 300000, rate: 12, tenure: 5, icon: CreditCard, color: 'from-purple-500 to-pink-600' },
    business: { amount: 2000000, rate: 11, tenure: 10, icon: Briefcase, color: 'from-orange-500 to-red-600' }
  };

  const applyPreset = (type: 'home' | 'car' | 'personal' | 'business') => {
    const preset = loanTypePresets[type];
    setLoanType(type);
    setLoanAmount(preset.amount);
    setInterestRate(preset.rate);
    setLoanTenure(preset.tenure);
  };

  const handleDownload = () => {
    alert('Download feature - Generate detailed EMI schedule PDF with amortization table');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'EMI Calculator Results',
        text: `EMI: ${formatCurrency(emi)}/month for loan of ${formatCurrency(loanAmount)} at ${interestRate}% for ${loanTenure} years`,
        url: window.location.href
      });
    }
  };

  const faqs = [
    {
      question: "How to calculate EMI for home loan, car loan, personal loan in India 2025?",
      answer: `<strong>EMI Calculation Formula:</strong><br/><br/>
      EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]<br/><br/>
      Where:<br/>
      • <strong>P</strong> = Principal loan amount (₹)<br/>
      • <strong>R</strong> = Monthly interest rate (Annual rate ÷ 12 ÷ 100)<br/>
      • <strong>N</strong> = Loan tenure in months<br/><br/>
      <strong>Example Calculation:</strong><br/>
      Loan Amount: ₹10,00,000<br/>
      Interest Rate: 8.5% per annum<br/>
      Tenure: 20 years (240 months)<br/><br/>
      Monthly Rate (R) = 8.5 ÷ 12 ÷ 100 = 0.00708<br/>
      EMI = [10,00,000 × 0.00708 × (1.00708)^240] / [(1.00708)^240 - 1]<br/>
      <strong>EMI = ₹8,678</strong><br/><br/>
      <strong>Use Our Calculator Above:</strong> Just enter your loan details and get instant results with complete breakup!<br/><br/>
      <strong>Different Loan Types:</strong><br/>
      • <strong>Home Loan:</strong> 8.5-9.5% interest, 5-30 years tenure - Use <a href="/calculators/home-loan-calculator" class="text-blue-600 underline">Home Loan Calculator</a><br/>
      • <strong>Car Loan:</strong> 8.5-11% interest, 3-7 years - Use <a href="/calculators/car-loan-calculator" class="text-blue-600 underline">Car Loan Calculator</a><br/>
      • <strong>Personal Loan:</strong> 10.5-24% interest, 1-5 years - Use <a href="/calculators/personal-loan-calculator" class="text-blue-600 underline">Personal Loan Calculator</a>`,
      keywords: "EMI calculation formula, how to calculate EMI, EMI calculator India, home loan EMI, car loan EMI 2025"
    },
    {
      question: "What is the EMI for ₹10 lakh, ₹20 lakh, and ₹50 lakh home loan?",
      answer: `<strong>EMI Breakup for Different Loan Amounts (@ 8.5% for 20 years):</strong><br/><br/>
      <strong>₹10 Lakh Loan:</strong><br/>
      • EMI: ₹8,678/month<br/>
      • Total Interest: ₹10,82,720<br/>
      • Total Payment: ₹20,82,720<br/><br/>
      <strong>₹20 Lakh Loan:</strong><br/>
      • EMI: ₹17,356/month<br/>
      • Total Interest: ₹21,65,440<br/>
      • Total Payment: ₹41,65,440<br/><br/>
      <strong>₹50 Lakh Loan:</strong><br/>
      • EMI: ₹43,390/month<br/>
      • Total Interest: ₹54,13,600<br/>
      • Total Payment: ₹1,04,13,600<br/><br/>
      <strong>💡 Key Insights:</strong><br/>
      • Doubling loan amount = doubles EMI<br/>
      • Interest can be more than principal for long tenures!<br/>
      • Lower interest rate by even 0.5% = significant savings<br/><br/>
      <strong>Compare Rates:</strong> Use our <a href="/calculators/loan-comparison-calculator" class="text-blue-600 underline">Loan Comparison Calculator</a> to compare offers from different banks.<br/><br/>
      <strong>Current Home Loan Rates (Oct 2025):</strong><br/>
      • SBI: 8.50% - 9.65%<br/>
      • HDFC: 8.60% - 9.50%<br/>
      • ICICI: 8.75% - 9.50%<br/>
      • Axis: 8.75% - 9.40%<br/>
      Check latest: <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">RBI Website <ExternalLink class="w-3 h-3 inline" /></a>`,
      keywords: "10 lakh loan EMI, 20 lakh EMI, 50 lakh home loan EMI, loan amount EMI calculator"
    },
    {
      question: "How to reduce EMI burden? Tips to pay less interest on loans",
      answer: `<strong>10 Proven Ways to Reduce Your EMI & Save Interest:</strong><br/><br/>
      <strong>1. Make Lump Sum Prepayments:</strong><br/>
      • Pay bonus/extra income towards principal<br/>
      • Reduces outstanding amount<br/>
      • Example: ₹1L prepayment saves ₹2-3L in interest<br/>
      • Use: <a href="/calculators/loan-prepayment-calculator" class="text-blue-600 underline">Prepayment Calculator</a><br/><br/>
      <strong>2. Increase EMI Amount:</strong><br/>
      • Pay ₹1,000-2,000 more monthly<br/>
      • Reduces tenure significantly<br/>
      • Example: ₹10K EMI → ₹12K = Save 5+ years<br/><br/>
      <strong>3. Choose Shorter Tenure:</strong><br/>
      • 15 years instead of 20 = lower total interest<br/>
      • Higher monthly EMI but massive savings<br/>
      • Example: ₹50L @ 8.5% → 15yrs = ₹49L interest vs 20yrs = ₹54L<br/><br/>
      <strong>4. Negotiate Better Rate:</strong><br/>
      • Compare 3-4 banks before deciding<br/>
      • Good credit score = lower rates<br/>
      • Even 0.25% reduction = ₹1-2L savings<br/><br/>
      <strong>5. Balance Transfer:</strong><br/>
      • Switch to lower interest rate lender<br/>
      • Check processing fees vs savings<br/>
      • Use: <a href="/calculators/loan-refinance-calculator" class="text-blue-600 underline">Refinance Calculator</a><br/><br/>
      <strong>6. Part-Prepay Regularly:</strong><br/>
      • Annual prepayment of ₹50K-1L<br/>
      • Reduces principal faster<br/>
      • Choose "reduce tenure" option (not EMI)<br/><br/>
      <strong>7. Increase EMI with Income:</strong><br/>
      • Get salary hike? Increase EMI proportionally<br/>
      • Clear loan faster without feeling pinch<br/><br/>
      <strong>8. Avoid Missing EMIs:</strong><br/>
      • Penalty charges (₹500-1,000)<br/>
      • Credit score impact<br/>
      • Set auto-debit for peace of mind<br/><br/>
      <strong>9. Claim Tax Benefits:</strong><br/>
      • Home loan: ₹2L interest (24b) + ₹1.5L principal (80C)<br/>
      • Reduces effective cost<br/>
      • Use: <a href="/calculators/income-tax-calculator" class="text-blue-600 underline">Tax Calculator</a><br/><br/>
      <strong>10. Round-Up EMI:</strong><br/>
      • EMI ₹8,678 → Pay ₹9,000<br/>
      • Extra ₹322/month = ₹3,864/year to principal<br/>
      • Reduces tenure by 1-2 years<br/><br/>
      <strong>💰 Potential Savings:</strong> Following these tips can save ₹5-15 lakhs in interest over loan tenure!`,
      keywords: "how to reduce EMI, lower EMI amount, reduce loan interest, EMI prepayment benefits, save on home loan"
    },
    {
      question: "EMI vs flat rate interest - Which is better? Complete comparison",
      answer: `<strong>Reducing Balance (EMI) vs Flat Rate Interest:</strong><br/><br/>
      <strong>EMI (Reducing Balance Method):</strong><br/>
      • Interest calculated on outstanding principal<br/>
      • Principal reduces each month → Interest reduces<br/>
      • Used by: All banks for home, car, personal loans<br/>
      • Example: ₹10L @ 9% for 5 years = ₹20,758 EMI<br/>
      • Total Interest: ₹2,45,480<br/><br/>
      <strong>Flat Rate Interest:</strong><br/>
      • Interest on FULL loan amount throughout<br/>
      • Principal doesn't reduce for interest calculation<br/>
      • Used by: Some NBFCs, personal loans<br/>
      • Example: ₹10L @ 9% flat for 5 years = ₹23,333 EMI<br/>
      • Total Interest: ₹4,50,000<br/><br/>
      <strong>Comparison:</strong><br/>
      Same ₹10L loan, 9%, 5 years:<br/>
      • EMI Method: ₹2.45L interest (BETTER ✅)<br/>
      • Flat Rate: ₹4.50L interest (AVOID ❌)<br/>
      • Difference: ₹2.05L more in flat rate!<br/><br/>
      <strong>Red Flags:</strong><br/>
      • If lender says "9% flat rate", actual effective rate is ~16-17%<br/>
      • Always ask for "reducing balance EMI"<br/>
      • Compare APR (Annual Percentage Rate) not just advertised rate<br/><br/>
      <strong>Why Banks Use EMI Method:</strong><br/>
      • Fair to borrower (interest only on outstanding)<br/>
      • Standard globally<br/>
      • RBI mandated for most loans<br/><br/>
      <strong>When Flat Rate is Used:</strong><br/>
      • Small consumer loans (₹10K-50K)<br/>
      • Short-term credit (3-6 months)<br/>
      • Gold loans (some lenders)<br/><br/>
      Always use EMI method for large/long-term loans!`,
      keywords: "EMI vs flat rate, reducing balance vs flat rate, flat interest rate meaning, which is better EMI or flat"
    },
    {
      question: "What is the ideal EMI to income ratio? How much EMI is safe?",
      answer: `<strong>Safe EMI to Income Ratio Guidelines (2025):</strong><br/><br/>
      <strong>Golden Rule:</strong> Total EMIs should NOT exceed <strong>40-50%</strong> of your monthly take-home income.<br/><br/>
      <strong>Detailed Guidelines:</strong><br/><br/>
      <strong>Conservative (30-35%):</strong><br/>
      • For risk-averse individuals<br/>
      • Leaves room for emergencies<br/>
      • Example: ₹80K salary → Max ₹28K EMI<br/>
      • Recommended for: First-time borrowers, single income families<br/><br/>
      <strong>Moderate (35-45%):</strong><br/>
      • Standard for most people<br/>
      • Balanced approach<br/>
      • Example: ₹1L salary → Max ₹45K EMI<br/>
      • Suitable for: Dual income, stable job<br/><br/>
      <strong>Aggressive (45-50%):</strong><br/>
      • Maximum safe limit<br/>
      • Only if very stable income<br/>
      • Example: ₹1.5L salary → Max ₹75K EMI<br/>
      • Risky for: Variable income, freelancers<br/><br/>
      <strong>⚠️ Danger Zone (50%+):</strong><br/>
      • High default risk<br/>
      • Banks may reject loan<br/>
      • Financial stress likely<br/><br/>
      <strong>How Banks Calculate:</strong><br/>
      Banks use FOIR (Fixed Obligations to Income Ratio):<br/>
      • Include: All EMIs, rent, credit card dues<br/>
      • Banks allow: 40-60% FOIR max<br/>
      • Your limit: Keep below 50% for safety<br/><br/>
      <strong>Example Calculation:</strong><br/>
      Monthly Income: ₹1,00,000<br/>
      Existing EMIs: ₹15,000 (car loan)<br/>
      Safe new EMI: ₹40,000 - ₹15,000 = ₹25,000<br/><br/>
      Use our <a href="/calculators/loan-affordability-calculator" class="text-blue-600 underline">Loan Affordability Calculator</a> to check your borrowing capacity!`,
      keywords: "EMI to income ratio, how much EMI is safe, loan affordability, FOIR calculation, safe EMI limit"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -mx-4 -my-4 md:-mx-8 md:-my-8">
      {/* Premium Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16 md:py-20 px-4 md:px-8"
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
              <CalcIcon className="w-16 h-16" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            EMI Calculator 2025-2026 | Loan EMI Calculator India<br/>
            <span className="text-yellow-300">Free Online Tool - Home, Car, Personal Loan</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto mb-8 leading-relaxed">
            Calculate EMI for any loan instantly. Get detailed breakup of principal, interest, and payment schedule. 
            Compare loan offers, plan your budget, and make informed borrowing decisions.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              <Share2 className="w-4 h-4 mr-2" /> Share Results
            </motion.button>
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/30 transition-all"
            >
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Loan Type Presets */}
      <div className="w-full px-4 md:px-8 -mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Quick Loan Type Presets</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(loanTypePresets).map(([type, preset]) => (
                <motion.button
                  key={type}
                  onClick={() => applyPreset(type as any)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-xl font-semibold transition-all ${
                    loanType === type
                      ? `bg-gradient-to-br ${preset.color} text-white shadow-xl`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <preset.icon className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-sm capitalize">{type} Loan</div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="w-full px-4 md:px-8 mt-6">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-2 flex flex-wrap gap-2">
          {[
            { id: 'calculator', label: 'EMI Calculator', icon: CalcIcon },
            { id: 'guide', label: 'How to Use', icon: BookOpen },
            { id: 'comparison', label: 'Loan Comparison', icon: BarChart3 }
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

      <div className="w-full px-4 md:px-8 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'calculator' && (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-8"
              >
                {/* Left Column - Inputs (3/5) */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Input Controls */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-8"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-6">
                      <Sliders className="w-6 h-6 mr-2 text-blue-600" />
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
                            <span className="text-lg font-bold text-blue-700">
                              {formatCurrency(loanAmount)}
                            </span>
                            <input
                              type="number"
                              value={manualLoanAmount}
                              onChange={(e) => handleManualLoanAmountChange(e.target.value)}
                              className="w-32 px-3 py-2 text-sm border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              min="10000"
                              max="100000000"
                              step="10000"
                            />
                          </div>
                        </div>
                        <input
                          type="range"
                          min="10000"
                          max="10000000"
                          step="10000"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value))}
                          className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((loanAmount - 10000) / (10000000 - 10000)) * 100}%, #e0e7ff ${((loanAmount - 10000) / (10000000 - 10000)) * 100}%, #e0e7ff 100%)`
                          }}
                        />
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                          <span>₹10,000</span>
                          <span>₹1 Crore</span>
                        </div>
                      </div>

                      {/* Interest Rate */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-sm font-bold text-gray-800 flex items-center">
                            <Percent className="w-5 h-5 mr-1 text-orange-600" />
                            Interest Rate (% per annum)
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-orange-700">
                              {interestRate.toFixed(2)}%
                            </span>
                            <input
                              type="number"
                              value={manualInterestRate}
                              onChange={(e) => handleManualInterestRateChange(e.target.value)}
                              className="w-24 px-3 py-2 text-sm border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                              min="1"
                              max="25"
                              step="0.1"
                            />
                          </div>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="25"
                          step="0.1"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #f97316 0%, #f97316 ${((interestRate - 1) / (25 - 1)) * 100}%, #fed7aa ${((interestRate - 1) / (25 - 1)) * 100}%, #fed7aa 100%)`
                          }}
                        />
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                          <span>1%</span>
                          <span className="text-green-600 font-semibold">Typical: 8-12%</span>
                          <span>25%</span>
                        </div>
                      </div>

                      {/* Loan Tenure */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-sm font-bold text-gray-800 flex items-center">
                            <Calendar className="w-5 h-5 mr-1 text-purple-600" />
                            Loan Tenure (Years)
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-purple-700">
                              {loanTenure} years
                            </span>
                            <input
                              type="number"
                              value={manualLoanTenure}
                              onChange={(e) => handleManualLoanTenureChange(e.target.value)}
                              className="w-24 px-3 py-2 text-sm border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                              min="1"
                              max="30"
                              step="1"
                            />
                          </div>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="30"
                          step="1"
                          value={loanTenure}
                          onChange={(e) => setLoanTenure(Number(e.target.value))}
                          className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${((loanTenure - 1) / (30 - 1)) * 100}%, #f3e8ff ${((loanTenure - 1) / (30 - 1)) * 100}%, #f3e8ff 100%)`
                          }}
                        />
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                          <span>1 Year</span>
                          <span>30 Years</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Info Card */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 bg-blue-50 rounded-2xl border-l-4 border-blue-500"
                  >
                    <div className="flex items-start">
                      <Info className="h-6 w-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-base text-blue-900 font-medium">
                          💡 <strong>Pro Tip:</strong> EMI of <span className="font-bold">{formatCurrency(emi)}</span>/month 
                          for {loanTenure} years means total payment of <span className="font-bold">{formatCurrency(totalPayment)}</span>. 
                          You'll pay <span className="font-bold text-red-700">{formatCurrency(totalInterest)}</span> as interest!
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Amortization Schedule */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl shadow-xl p-6"
                  >
                    <h3 className="text-xl font-bold text-gray-900 flex items-center mb-4">
                      <BarChart3 className="w-6 h-6 mr-2 text-purple-600" />
                      Year-wise Payment Schedule
                    </h3>
                    <div className="overflow-auto max-h-96 rounded-lg border border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-blue-50 to-purple-50 sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase">Year</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase">Principal</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase">Interest</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase">Balance</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                          {yearlyBreakup.map((year, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                              <td className="px-4 py-3 text-sm font-semibold text-blue-700">{year.year}</td>
                              <td className="px-4 py-3 text-sm text-green-700 font-medium">{formatCurrency(year.principal)}</td>
                              <td className="px-4 py-3 text-sm text-red-700 font-medium">{formatCurrency(year.interest)}</td>
                              <td className="px-4 py-3 text-sm font-bold text-purple-700">{formatCurrency(year.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column - Results (2/5) */}
                <div className="lg:col-span-2 space-y-6">
                  {/* EMI Result Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white text-center relative overflow-hidden"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"
                    ></motion.div>
                    
                    <div className="relative z-10">
                      <CalcIcon className="w-12 h-12 mx-auto mb-4 opacity-90" />
                      <h3 className="text-lg font-semibold mb-2 opacity-90">Monthly EMI</h3>
                      <motion.p
                        key={emi}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        className="text-5xl font-extrabold mb-2"
                      >
                        {formatCurrency(emi)}
                      </motion.p>
                      <p className="text-sm opacity-80">Pay this amount every month</p>
                    </div>
                  </motion.div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 font-medium">Principal Amount</span>
                        <DollarSign className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-3xl font-bold text-blue-700">{formatCurrency(loanAmount)}</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 font-medium">Total Interest</span>
                        <TrendingUp className="w-5 h-5 text-red-600" />
                      </div>
                      <p className="text-3xl font-bold text-red-700">{formatCurrency(totalInterest)}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {((totalInterest / loanAmount) * 100).toFixed(1)}% of principal
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg p-6 text-white"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium opacity-90">Total Payment</span>
                        <Award className="w-5 h-5" />
                      </div>
                      <p className="text-3xl font-bold">{formatCurrency(totalPayment)}</p>
                      <p className="text-sm opacity-80 mt-1">
                        {(loanTenure * 12).toFixed(0)} monthly installments
                      </p>
                    </motion.div>
                  </div>

                  {/* Pie Chart */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl p-6"
                  >
                    <h3 className="text-lg font-bold text-gray-900 flex items-center mb-4">
                      <PieChartIcon className="w-5 h-5 mr-2 text-blue-600" />
                      Payment Breakup
                    </h3>
                    <div className="h-64">
                      <ResultChart
                        data={[
                          { name: 'Principal', value: loanAmount, color: '#3b82f6' },
                          { name: 'Interest', value: totalInterest, color: '#ef4444' }
                        ]}
                        centerText={`${formatCurrency(totalPayment)}\nTotal`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-600">Principal</span>
                        </div>
                        <p className="text-lg font-bold text-blue-700">
                          {((loanAmount / totalPayment) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-600">Interest</span>
                        </div>
                        <p className="text-lg font-bold text-red-700">
                          {((totalInterest / totalPayment) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === 'guide' && (
              <motion.div
                key="guide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-2xl p-10"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
                  <BookOpen className="w-10 h-10 mr-4 text-blue-600" />
                  Complete EMI Calculator Guide - How to Use (2025)
                </h2>

                {/* Step by step guide content here - keeping it concise for now */}
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Detailed usage guide with examples will be rendered here...
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'comparison' && (
              <motion.div
                key="comparison"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-2xl p-10"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Loan Comparison - EMI Analysis
                </h2>
                <p className="text-lg text-gray-700">
                  Comparison tools and analysis will be rendered here...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Why Choose Us */}
          <WhyChooseUs />

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 flex items-center mb-6">
              <Info className="w-8 h-8 mr-3 text-blue-600" />
              EMI Calculator FAQs - Complete Guide 2025
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-start justify-between bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 transition-colors"
                  >
                    <div className="flex items-start flex-1 pr-4">
                      <span className="bg-blue-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        {index + 1}
                      </span>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">{faq.question}</h3>
                    </div>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-6 bg-white">
                          <div
                            className="prose max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                          <div className="mt-4 flex flex-wrap gap-2">
                            {faq.keywords.split(', ').map((keyword, kidx) => (
                              <span key={kidx} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
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

          {/* Related Tools */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Loan Calculators</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { name: 'Home Loan EMI', url: '/calculators/home-loan-calculator', desc: 'Specialized home loan calculator' },
                { name: 'Car Loan EMI', url: '/calculators/car-loan-calculator', desc: 'Calculate car loan EMI' },
                { name: 'Personal Loan', url: '/calculators/personal-loan-calculator', desc: 'Personal loan calculator' },
                { name: 'Loan Prepayment', url: '/calculators/loan-prepayment-calculator', desc: 'Calculate prepayment savings' }
              ].map((tool, index) => (
                <motion.a
                  key={index}
                  href={`https://moneycal.in${tool.url}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-5 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all"
                >
                  <h4 className="font-bold text-gray-900 mb-2">{tool.name}</h4>
                  <p className="text-sm text-gray-600">{tool.desc}</p>
                  <ArrowRight className="w-5 h-5 text-blue-600 mt-2" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;
