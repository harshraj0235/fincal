import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowLeft, DollarSign, Calendar, Download, Building,
  BarChart3, FileText, TrendingUp, Info, PieChart, Info as InfoIcon,
  Share2, Calculator, CheckCircle2,
  Clock, Save, ArrowRight, Sliders
} from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Legend,
  BarChart, Bar
} from 'recharts';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import CalculatorSchema from '../../components/CalculatorSchema';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Types
interface AmortizationRow {
  period: number;
  date: string;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  cumulativeInterest: number;
  prepayment: number;
}

export const LoanAmortizationGenerator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);

  // State
  const [inputs, setInputs] = useState({
    loanAmount: 5000000,
    interestRate: 8.5,
    loanTenure: 15, // Years
    repaymentFrequency: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
    gracePeriod: 0,
    processingFee: 0.5,
    prepaymentAmount: 0,
    prepaymentFrequency: 'none', // none, monthly, yearly
    prepaymentType: 'reduce_tenure' // reduce_tenure, reduce_emi
  });

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalInterest: 0,
    totalAmount: 0,
    interestSaved: 0,
    tenureReduced: 0,
    amortizationSchedule: [] as AmortizationRow[],
    summary: {
      principalAmount: 0,
      totalInterest: 0,
      totalPayments: 0,
      effectiveRate: 0,
      processingFee: 0,
      actualTenureMonths: 0
    }
  });

  const [activeTab, setActiveTab] = useState<'summary' | 'schedule' | 'charts'>('summary');

  const repaymentFrequencies = [
    { value: 'monthly', label: 'Monthly', periodsPerYear: 12 },
    { value: 'quarterly', label: 'Quarterly', periodsPerYear: 4 },
    { value: 'semi-annually', label: 'Semi-Annually', periodsPerYear: 2 },
    { value: 'annually', label: 'Annually', periodsPerYear: 1 }
  ];

  const prepaymentFrequencies = [
    { value: 'none', label: 'No Prepayment' },
    { value: 'monthly', label: 'Monthly Extra' },
    { value: 'yearly', label: 'Yearly Extra' },
    { value: 'one_time', label: 'One-time Payment (Month 12)' }
  ];

  // Calculation Logic
  const calculateAmortization = () => {
    const {
      loanAmount,
      interestRate,
      loanTenure,
      repaymentFrequency,
      startDate,
      gracePeriod,
      processingFee,
      prepaymentAmount,
      prepaymentFrequency
    } = inputs;

    const freqConfig = repaymentFrequencies.find(f => f.value === repaymentFrequency) || repaymentFrequencies[0];
    const periodsPerYear = freqConfig.periodsPerYear;
    const initialTenureMonths = loanTenure * 12;
    const totalPeriods = loanTenure * periodsPerYear;
    const periodicRate = interestRate / 100 / periodsPerYear;
    const processingFeeAmount = (loanAmount * processingFee) / 100;

    // Calculate standard EMI (no prepayment scenario for comparison)
    const standardPeriodicPayment = loanAmount * (periodicRate * Math.pow(1 + periodicRate, totalPeriods)) /
      (Math.pow(1 + periodicRate, totalPeriods) - 1);

    const schedule: AmortizationRow[] = [];
    let outstandingBalance = loanAmount;
    let cumulativeInterest = 0;
    const currentDate = new Date(startDate);
    let totalNormalInterest = 0;

    // Comparison baseline (Total interest without prepayments)
    let tempBalance = loanAmount;
    for (let p = 1; p <= totalPeriods; p++) {
      const int = tempBalance * periodicRate;
      const prin = standardPeriodicPayment - int;
      totalNormalInterest += int;
      tempBalance -= prin;
    }

    // Actual Calculation with Prepayments
    let actualPeriods = 0;
    for (let period = 1; period <= totalPeriods && outstandingBalance > 0.01; period++) {
      actualPeriods = period;
      const interestPayment = outstandingBalance * periodicRate;
      let principalPayment = period <= gracePeriod ? 0 : standardPeriodicPayment - interestPayment;

      // Handle last payment
      if (principalPayment > outstandingBalance) {
        principalPayment = outstandingBalance;
      }

      // Add Prepayments
      let extraPayment = 0;
      if (prepaymentAmount > 0) {
        if (prepaymentFrequency === 'monthly') {
          extraPayment = prepaymentAmount;
        } else if (prepaymentFrequency === 'yearly' && period % periodsPerYear === 0) {
          extraPayment = prepaymentAmount;
        } else if (prepaymentFrequency === 'one_time' && period === periodsPerYear) {
          extraPayment = prepaymentAmount;
        }
      }

      // Cap extra payment at outstanding balance
      if (extraPayment > (outstandingBalance - principalPayment)) {
        extraPayment = Math.max(0, outstandingBalance - principalPayment);
      }

      const totalPrincipal = principalPayment + extraPayment;
      const newBalance = Math.max(0, outstandingBalance - totalPrincipal);
      cumulativeInterest += interestPayment;

      schedule.push({
        period,
        date: new Date(currentDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
        payment: principalPayment + interestPayment + extraPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: newBalance,
        cumulativeInterest,
        prepayment: extraPayment
      });

      outstandingBalance = newBalance;

      // Update Date
      if (repaymentFrequency === 'monthly') currentDate.setMonth(currentDate.getMonth() + 1);
      else if (repaymentFrequency === 'quarterly') currentDate.setMonth(currentDate.getMonth() + 3);
      else if (repaymentFrequency === 'semi-annually') currentDate.setMonth(currentDate.getMonth() + 6);
      else currentDate.setFullYear(currentDate.getFullYear() + 1);
    }

    const totalInterestPaid = schedule.reduce((sum, row) => sum + row.interest, 0);
    const tenureReducedMonths = initialTenureMonths - (actualPeriods * (12 / periodsPerYear));

    setResults({
      monthlyPayment: standardPeriodicPayment,
      totalInterest: totalInterestPaid,
      totalAmount: loanAmount + totalInterestPaid + processingFeeAmount,
      interestSaved: Math.max(0, totalNormalInterest - totalInterestPaid),
      tenureReduced: Math.max(0, tenureReducedMonths),
      amortizationSchedule: schedule,
      summary: {
        principalAmount: loanAmount,
        totalInterest: totalInterestPaid,
        totalPayments: loanAmount + totalInterestPaid + processingFeeAmount,
        effectiveRate: (Math.pow(1 + periodicRate, periodsPerYear) - 1) * 100,
        processingFee: processingFeeAmount,
        actualTenureMonths: actualPeriods * (12 / periodsPerYear)
      }
    });
  };

  useEffect(() => {
    calculateAmortization();
  }, [inputs]);

  // UI Helpers
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const shareTool = () => {
    const url = new URL(window.location.href);
    Object.entries(inputs).forEach(([key, value]) => url.searchParams.set(key, String(value)));
    navigator.clipboard.writeText(url.href);
    alert('Link copied to clipboard!');
  };

  const exportToExcel = () => {
    const csvRows = [
      ['Loan Amortization Schedule'],
      ['Loan Amount', formatCurrency(inputs.loanAmount)],
      ['Interest Rate', `${inputs.interestRate}%`],
      ['Tenure', `${inputs.loanTenure} Years`],
      [''],
      ['Period', 'Date', 'Payment', 'Principal', 'Interest', 'Prepayment', 'Balance', 'Cumulative Interest'],
      ...results.amortizationSchedule.map(row => [
        row.period,
        row.date,
        row.payment.toFixed(0),
        row.principal.toFixed(0),
        row.interest.toFixed(0),
        row.prepayment.toFixed(0),
        row.balance.toFixed(0),
        row.cumulativeInterest.toFixed(0)
      ])
    ];

    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `loan_amortization_schedule_${new Date().getTime()}.csv`;
    link.click();
  };

  const downloadPDF = async () => {
    if (!resultsRef.current) return;
    const canvas = await html2canvas(resultsRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Loan_Amortization_Summary.pdf');
  };

  // Content Sections for SEO
  const faqData = [
    {
      question: "What is a Loan Amortization Schedule?",
      answer: "A loan amortization schedule is a complete table showing every payment on an amortizing loan (typically a mortgage or car loan) over time. Each payment consists of both principal and interest, and the table breaks down exactly how much of each goes toward your debt and how your balance reduces."
    },
    {
      question: "How is Loan Amortization calculated in India?",
      answer: "In India, most banks use the 'reducing balance' method. The interest is calculated on the outstanding principal at the end of each period. As you pay back the principal, the interest component decreases, and the principal repayment component increases within the fixed EMI."
    },
    {
      question: "Can prepayments save substantial interest?",
      answer: "Yes, definitely! Since interest is calculated on the remaining balance, paying extra principal early in the loan tenure significantly reduces the base for future interest calculations. This leads to massive savings and shortens the overall loan tenure."
    },
    {
      question: "What is a grace period or moratorium?",
      answer: "A grace period (or moratorium) is a time during the loan tenure where the borrower is not required to make full EMI payments. Some loans offer 'interest-only' grace periods where you pay only the interest, while others offer a full holiday. However, interest usually still accrues during these periods."
    }
  ];

  const chartData = useMemo(() => {
    // Sample every 12 periods for the chart to keep it clean
    return results.amortizationSchedule
      .filter((_, i) => i === 0 || i % 12 === 11 || i === results.amortizationSchedule.length - 1)
      .map(row => ({
        name: row.date,
        balance: Math.round(row.balance),
        interest: Math.round(row.cumulativeInterest),
        principal: Math.round(inputs.loanAmount - row.balance)
      }));
  }, [results.amortizationSchedule, inputs.loanAmount]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SEOHelmet
        title="Loan Amortization Schedule Generator India - Free EMI Table & Interest Saver Tool"
        description="Detailed loan amortization schedule generator for India. Calculate principal vs interest, tenure reduction with prepayments, and download Excel/PDF reports. Best for home, personal, and business loans."
        url="/corporate-finance/loan-amortization-generator"
        keywords="loan amortization schedule india, emi schedule generator, principal interest breakdown, loan repayment table excel, business loan amortization"
      />
      <CalculatorSchema
        name="Loan Amortization Generator"
        description="A comprehensive tool to generate loan amortization schedules with prepayment impact analysis and visual charts."
        url="/corporate-finance/loan-amortization-generator"
        features={[
          "Detailed principal vs interest breakdown",
          "Prepayment impact simulator",
          "PDF and Excel report downloads",
          "Interactive visualization charts",
          "Supports monthly, quarterly, and annual frequencies"
        ]}
        faqData={faqData}
      />

      <WhatsAppBanner />
      <AstroFinanceButton />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-600 pt-12 pb-24 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-10">
          <Calculator size={400} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-emerald-100 hover:text-white mb-8 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Corporate Finance
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Loan Amortization <span className="text-teal-200">Generator</span>
              </h1>
              <p className="text-xl text-emerald-50/90 max-w-2xl leading-relaxed">
                Master your debt with our premium repayment optimizer. Visualize interest savings,
                simulate prepayments, and generate audit-ready schedules in seconds.
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={shareTool} className="flex items-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl transition-all shadow-lg active:scale-95">
                <Share2 className="h-5 w-5 mr-2" />
                Share Result
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Inputs Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 sticky top-8">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                  <Sliders className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Configure Loan</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Principal (₹)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                    <input
                      type="number"
                      value={inputs.loanAmount}
                      onChange={(e) => setInputs({ ...inputs, loanAmount: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Interest (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.interestRate}
                      onChange={(e) => setInputs({ ...inputs, interestRate: Number(e.target.value) })}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Tenure (Yrs)</label>
                    <input
                      type="number"
                      value={inputs.loanTenure}
                      onChange={(e) => setInputs({ ...inputs, loanTenure: Number(e.target.value) })}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Repayment Frequency</label>
                  <select
                    value={inputs.repaymentFrequency}
                    onChange={(e) => setInputs({ ...inputs, repaymentFrequency: e.target.value })}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
                  >
                    {repaymentFrequencies.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                  </select>
                </div>

                <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100">
                  <h3 className="text-sm font-bold text-emerald-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Extra Prepayments (Saver)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-emerald-600 mb-1">Extra Amount (₹)</label>
                      <input
                        type="number"
                        value={inputs.prepaymentAmount}
                        onChange={(e) => setInputs({ ...inputs, prepaymentAmount: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-emerald-600 mb-1">Frequency</label>
                      <select
                        value={inputs.prepaymentFrequency}
                        onChange={(e) => setInputs({ ...inputs, prepaymentFrequency: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none cursor-pointer"
                      >
                        {prepaymentFrequencies.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Grace Period (Mo)</label>
                    <input
                      type="number"
                      value={inputs.gracePeriod}
                      onChange={(e) => setInputs({ ...inputs, gracePeriod: Number(e.target.value) })}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Fees (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={inputs.processingFee}
                      onChange={(e) => setInputs({ ...inputs, processingFee: Number(e.target.value) })}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8 space-y-8">

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 overflow-hidden relative group transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Clock className="h-5 w-5" /></div>
                  <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">Recurring EMI</h3>
                </div>
                <p className="text-3xl font-black text-slate-900 mb-1">{formatCurrency(results.monthlyPayment)}</p>
                <p className="text-xs text-slate-400 font-medium">Standard Periodic Installment</p>
                <div className="absolute -bottom-4 -right-4 text-blue-50/50 group-hover:scale-110 transition-transform"><Calendar size={100} /></div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 overflow-hidden relative group transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><TrendingUp className="h-5 w-5" /></div>
                  <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">Interest Saved</h3>
                </div>
                <p className="text-3xl font-black text-emerald-600 mb-1">{formatCurrency(results.interestSaved)}</p>
                <p className="text-xs text-emerald-500 font-bold">Via Extra Prepayments</p>
                <div className="absolute -bottom-4 -right-4 text-emerald-50/50 group-hover:scale-110 transition-transform"><Save size={100} /></div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 overflow-hidden relative group transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><CheckCircle2 className="h-5 w-5" /></div>
                  <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">Tenure Saved</h3>
                </div>
                <p className="text-3xl font-black text-slate-900 mb-1">
                  {Math.floor(results.tenureReduced / 12)}y {Math.round(results.tenureReduced % 12)}m
                </p>
                <p className="text-xs text-slate-400 font-medium">Repayment Shortened By</p>
                <div className="absolute -bottom-4 -right-4 text-amber-50/50 group-hover:scale-110 transition-transform"><Clock size={100} /></div>
              </div>
            </div>

            {/* Main Tabs Container */}
            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
              <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 gap-2">
                {[
                  { id: 'summary', icon: PieChart, label: 'Analytics' },
                  { id: 'charts', icon: BarChart3, label: 'Visual Trends' },
                  { id: 'schedule', icon: FileText, label: 'Repayment Schedule' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-bold transition-all ${activeTab === tab.id
                        ? 'bg-white text-emerald-600 shadow-sm border border-slate-200'
                        : 'text-slate-500 hover:bg-slate-100'
                      }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {activeTab === 'summary' && (
                  <div ref={resultsRef} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="h-[300px]">
                        <h4 className="text-sm font-bold text-slate-600 mb-6 uppercase tracking-widest text-center">Loan Composition</h4>
                        <ResponsiveContainer width="100%" height="100%">
                          <RePieChart>
                            <Pie
                              data={[
                                { name: 'Principal', value: inputs.loanAmount },
                                { name: 'Interest', value: results.totalInterest },
                                { name: 'Charges', value: results.summary.processingFee }
                              ]}
                              cx="50%" cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              <Cell fill="#10B981" />
                              <Cell fill="#F59E0B" />
                              <Cell fill="#6366F1" />
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            <Legend verticalAlign="bottom" height={36} />
                          </RePieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-slate-600 mb-4 uppercase tracking-widest">Financial Summary</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="text-slate-500 font-medium">Principal Amount</span>
                            <span className="font-bold text-slate-900">{formatCurrency(inputs.loanAmount)}</span>
                          </div>
                          <div className="flex justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="text-slate-500 font-medium">Interest Payable</span>
                            <span className="font-bold text-slate-900">{formatCurrency(results.totalInterest)}</span>
                          </div>
                          <div className="flex justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="text-slate-500 font-medium">Processing Fee</span>
                            <span className="font-bold text-slate-900">{formatCurrency(results.summary.processingFee)}</span>
                          </div>
                          <div className="flex justify-between p-4 bg-emerald-600 text-white rounded-2xl shadow-lg border border-emerald-500">
                            <span className="font-bold">Total Cost of Loan</span>
                            <span className="font-black text-xl">{formatCurrency(results.totalAmount)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100 justify-center md:justify-end">
                      <button onClick={downloadPDF} className="flex items-center px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md">
                        <Download className="h-4 w-4 mr-2" /> Download Report
                      </button>
                      <button onClick={exportToExcel} className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-md">
                        <FileText className="h-4 w-4 mr-2" /> Export to Excel
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'charts' && (
                  <div className="space-y-12">
                    <div className="h-[400px]">
                      <h4 className="text-sm font-bold text-slate-600 mb-6 uppercase tracking-widest flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-emerald-500" /> Repayment Progress Over Time
                      </h4>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis dataKey="name" fontSize={12} tickMargin={10} axisLine={false} tickLine={false} />
                          <YAxis fontSize={12} tickMargin={10} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 100000}L`} />
                          <Tooltip
                            formatter={(value: number) => formatCurrency(value)}
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Area type="monotone" dataKey="balance" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorBal)" name="Remaining Balance" />
                          <Area type="monotone" dataKey="interest" stroke="#F59E0B" strokeWidth={2} fillOpacity={0} name="Interest Accrued" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="h-[300px]">
                      <h4 className="text-sm font-bold text-slate-600 mb-6 uppercase tracking-widest flex items-center gap-2">
                        Principal vs Interest
                      </h4>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} />
                          <YAxis fontSize={12} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 100000}L`} />
                          <Tooltip formatter={(v: number) => formatCurrency(v)} />
                          <Bar dataKey="principal" fill="#10B981" radius={[4, 4, 0, 0]} name="Principal Paid" />
                          <Bar dataKey="interest" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Interest Paid" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {activeTab === 'schedule' && (
                  <div className="overflow-x-auto rounded-2xl border border-slate-100">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase">Period</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase">Month</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">EMI (Total)</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Principal</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right text-emerald-600">Extra</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Interest</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.amortizationSchedule.slice(0, 100).map((row) => (
                          <tr key={row.period} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 text-sm font-bold text-slate-900">{row.period}</td>
                            <td className="p-4 text-sm font-medium text-slate-600">{row.date}</td>
                            <td className="p-4 text-sm font-bold text-slate-900 text-right">{formatCurrency(row.payment)}</td>
                            <td className="p-4 text-sm font-medium text-slate-600 text-right">{formatCurrency(row.principal)}</td>
                            <td className="p-4 text-sm font-bold text-emerald-600 text-right">{row.prepayment > 0 ? formatCurrency(row.prepayment) : '-'}</td>
                            <td className="p-4 text-sm font-medium text-amber-600 text-right">{formatCurrency(row.interest)}</td>
                            <td className="p-4 text-sm font-bold text-slate-900 text-right">{formatCurrency(row.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {results.amortizationSchedule.length > 100 && (
                      <div className="p-8 text-center bg-slate-50/50">
                        <p className="text-slate-500 font-medium italic">Showing first 100 months. Download کامل schedule via PDF or Excel for detailed analysis.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section (SEO Optimized 1500+ Words) */}
        <div className="mt-20 space-y-24">
          {/* Main Expert Bio/Guide Header */}
          <section className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-xl border border-slate-100 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold uppercase tracking-widest">Expert Financial Guide</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Maximum Debt Optimization: The Ultimate Guide to Loan Amortization in India
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Navigating the landscape of home loans, personal loans, or business finance in India requires more than just an EMI calculator.
                Our Loan Amortization Generator is designed to provide forensic-level transparency into your debt structure, helping you
                extract maximum value from every rupee paid.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-slate-700 bg-slate-50 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Reducing Balance Method
                </div>
                <div className="flex items-center gap-2 text-slate-700 bg-slate-50 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Prepayment Simulation
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-emerald-50 rounded-3xl p-8 border border-emerald-100 italic text-emerald-800 text-center relative overflow-hidden">
              <div className="relative z-10 font-medium">
                "Your bank's amortization schedule is not just a table; it's a financial roadmap. By understanding how interest accrues, you gain the power to disrupt it."
              </div>
              <div className="mt-4 font-bold">- MoneyCal Research Team</div>
              <InfoIcon className="absolute -bottom-6 -right-6 text-emerald-100 h-32 w-32" />
            </div>
          </section>

          {/* Deep Dive Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-12">
              <section id="what-is-amortization" className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 border-l-8 border-emerald-500 pl-6">What is Loan Amortization? (A Deep Dive)</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Amortization is an accounting technique used to periodically lower the book value of a loan or an intangible asset over a set period.
                  In the context of a loan, amortization focuses on spreading out loan payments over time. When you make a payment on a loan—whether it's representing a home loan (Home Loan),
                  car loan (Vehicle Loan), or a personal loan—the payment is applied to both the interest (the cost of borrowing) and the principal (the amount you actually borrowed).
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  In India, most retail loans operate on a <strong>reducing balance basis</strong>. This means that as you pay down the principal, the amount of interest you owe decreases.
                  Early in the loan tenure, a significant portion of your EMI goes toward paying off interest. As time progresses, the scale tips, and a larger share of your payment
                  is dedicated to principal reduction. This is why prepayments are exponentially more effective when made in the early years of a loan.
                </p>
              </section>

              <section id="how-to-use" className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 border-l-8 border-teal-500 pl-6">How to Use the Amortization Generator Effectively</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our tool is built for both casual borrowers and financial analysts. To get the most accurate results for the Indian market, follow these steps:
                </p>
                <ul className="space-y-4">
                  {[
                    { title: "Input the 'Real' Principal", desc: "Don't just enter the loan amount. Enter the amount you will actually owe after the down payment." },
                    { title: "Annual Interest Rate", desc: "Most Indian banks quote annual interest rates (e.g., 8.5% p.a.). Our calculator automatically splits this for monthly or quarterly periods." },
                    { title: "Simulate Moratoriums", desc: "If you're taking a student loan or a business loan with a grace period, use the 'Grace Period' slider to see the impact on total interest." },
                    { title: "The Prepayment Strategy", desc: "This is the most critical feature. Enter extra payments (like your year-end bonus) to see exactly how many years you can shave off your home loan." }
                  ].map((item, i) => (
                    <li key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4 transition-all hover:border-emerald-200">
                      <div className="h-8 w-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">{i + 1}</div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-slate-600">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section id="why-it-matters" className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 border-l-8 border-blue-500 pl-6">Why an Amortization Table is Vital for Indian Borrowers</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  In the Indian financial ecosystem, where interest rates for home loans often hover between 8% to 10%, a 20-year loan can result in you paying back <strong>nearly double</strong> the amount you borrowed.
                  Transparency is your best defense against high debt costs. By visualizing the amortization schedule, you can:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-900 text-white rounded-[2rem] space-y-4">
                    <h4 className="text-emerald-400 font-bold flex items-center gap-2"><ArrowRight /> Tax Planning</h4>
                    <p className="text-slate-300 text-sm">Under Section 24(b) of the Income Tax Act, you can claim deductions on interest payments up to ₹2 Lakh. Our table helps you identify exactly how much interest you'll pay in each financial year to maximize your tax refund.</p>
                  </div>
                  <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 space-y-4">
                    <h4 className="text-emerald-800 font-bold flex items-center gap-2"><ArrowRight /> Balance Transfer Decisions</h4>
                    <p className="text-slate-700 text-sm">If you're considering a Home Loan Balance Transfer, you need to know your exact outstanding principal. Our generator provides this figure for any month in the future, allowing you to weigh the costs of shifting banks.</p>
                  </div>
                </div>
              </section>

              <section className="bg-emerald-900 rounded-[3rem] p-10 md:p-16 text-white text-center space-y-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                  <div className="grid grid-cols-12 gap-2 h-full w-full">
                    {Array(48).fill(0).map((_, i) => <div key={i} className="border border-white/20 rounded-full" />)}
                  </div>
                </div>
                <h2 className="text-3xl md:text-5xl font-black">Ready to Save Millions in Interest?</h2>
                <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                  The smartest borrowers don't just pay their EMIs; they attack their debt.
                  Start simulating prepayments now and see your freedom date move closer.
                </p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-white text-emerald-900 px-8 py-4 rounded-2xl font-black hover:bg-emerald-50 transition-all shadow-xl active:scale-95">
                    Start Calculating Now
                  </button>
                </div>
              </section>
            </div>

            {/* Sidebar Sticky Content */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 sticky top-12">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <InfoIcon className="h-5 w-5 text-emerald-500" />
                  Quick Facts
                </h3>
                <div className="space-y-6">
                  <div className="pb-6 border-b border-slate-100">
                    <h4 className="text-sm font-bold text-emerald-600 uppercase mb-2">Home Loan Mastery</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Did you know that paying <strong>one extra EMI per year</strong> can reduce a 20-year home loan by nearly 5 years? Use our generator to verify this for your specific rate.
                    </p>
                  </div>
                  <div className="pb-6 border-b border-slate-100">
                    <h4 className="text-sm font-bold text-amber-600 uppercase mb-2">Business Cash Flow</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Corporate loans often have monthly or quarterly repayments. Adjust the frequency to see how it impacts the total interest burden on your company's books.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-blue-600 uppercase mb-2">Tax Savings (SEC 80C)</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The principal component of your home loan repayment is eligible for deduction under Section 80C. Use the 'Schedule' tab to find your annual principal paid.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
                <h3 className="text-lg font-bold text-emerald-900 mb-4">Related Calculations</h3>
                <ul className="space-y-3">
                  <li><RouterLink to="/loan-tools/emi-calculator" className="text-emerald-700 hover:underline flex items-center gap-2 text-sm font-bold"><ArrowRight size={14} /> EMI Calculator India</RouterLink></li>
                  <li><RouterLink to="/loan-tools/prepayment-calculator" className="text-emerald-700 hover:underline flex items-center gap-2 text-sm font-bold"><ArrowRight size={14} /> Prepayment Impact Tool</RouterLink></li>
                  <li><RouterLink to="/corporate-finance/business-valuation-calculator" className="text-emerald-700 hover:underline flex items-center gap-2 text-sm font-bold"><ArrowRight size={14} /> Business Valuation</RouterLink></li>
                  <li><RouterLink to="/loan-tools/loan-affordability" className="text-emerald-700 hover:underline flex items-center gap-2 text-sm font-bold"><ArrowRight size={14} /> Loan Affordability Tool</RouterLink></li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section with JSON-LD Schema integration */}
          <section className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-500">Everything you need to know about loan repayment schedules in India.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqData.map((faq, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] shadow-md border border-slate-50 transition-all hover:shadow-lg">
                  <h3 className="text-lg font-black text-slate-900 mb-4 flex items-start gap-3">
                    <span className="p-1 px-2.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs">Q</span>
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Final Educational Content Piece */}
          <section className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-8">
            <h2 className="text-2xl font-black text-slate-900">Comparing Different Amortization Structures</h2>
            <p>
              While the traditional monthly installment (EMI) is standard, certain business loans and agriculture loans in India follow quarterly or half-yearly amortization.
              The mathematical difference lies in the compounding frequency. Higher frequency payments (like semi-monthly) reduce the average principal balance more frequently,
              leading to slightly lower interest over long durations. Our tool supports these advanced configurations to ensure accuracy for MSME and corporate borrowers.
            </p>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-2">Key Audit Tip for Businesses:</h4>
              <p className="text-sm">
                Ensure that the processing fees and other charges are amortized over the loan life on your balance sheet for accurate tax reporting. While our calculator shows
                the cash flow impact, work with your CA to ensure GAAP/IFRS compliance for significant corporate debts.
              </p>
            </div>
            <p>
              In conclusion, a loan amortization generator is more than just a summary of payments—it is a strategic asset for anyone serious about wealth accumulation.
              By identifying the high-interest periods of your loan and strategically prepaying, you can divert thousands, if not lakhs, of rupees from bank profits back into your own investments.
              MoneyCal is committed to providing these professional-grade tools for free, empowering every Indian borrower with the data they need to prosper.
            </p>
            <p className="text-sm italic font-medium pt-8 border-t border-slate-100 text-slate-400">
              Disclaimer: Calculations provided are for educational and planning purposes only. Actual bank schedules may vary based on holiday calendars, 365/366 day year conventions, and floating rate revisions.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoanAmortizationGenerator;
