import React, { useState, useEffect, useMemo } from 'react';
import { formatCurrency, calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';
import { 
  Sliders, 
  Calculator, 
  PieChart as PieChartIcon, 
  Calendar, 
  TrendingDown,
  Download,
  Share2,
  Lightbulb,
  BookOpen,
  ExternalLink,
  RefreshCw,
  ArrowRight,
  DollarSign,
  Percent,
  Clock,
  Info,
  CheckCircle2
} from 'lucide-react';
import { Pie, Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js';
import { Helmet } from 'react-helmet-async';
import { getPdfLibs } from '../lib/pdfExportClient';
import { getXlsx } from '../lib/clientOnlyLibs';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

interface AmortizationRow {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

interface LoanComparison {
  id: number;
  name: string;
  amount: number;
  rate: number;
  tenure: number;
}

export const LoanCalculator: React.FC = () => {
  // Main loan inputs
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Prepayment options
  const [prepaymentAmount, setPrepaymentAmount] = useState<number>(0);
  const [prepaymentMonth, setPrepaymentMonth] = useState<number>(12);
  const [prepaymentType, setPrepaymentType] = useState<'reduce-tenure' | 'reduce-emi'>('reduce-tenure');

  // Loan comparison
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [comparisonLoans, setComparisonLoans] = useState<LoanComparison[]>([
    { id: 1, name: 'Current Loan', amount: 1000000, rate: 9.5, tenure: 20 },
    { id: 2, name: 'Alternative Offer', amount: 1000000, rate: 8.5, tenure: 20 }
  ]);

  // UI states
  const [showAmortization, setShowAmortization] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'prepayment' | 'comparison'>('basic');
  const [exportLoading, setExportLoading] = useState<boolean>(false);

  // Calculated values
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);

  // Calculate EMI and schedule
  useEffect(() => {
    const tenureInMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
    const calculatedEmi = calculateEMI(loanAmount, interestRate, tenureInMonths);
    const totalAmount = calculatedEmi * tenureInMonths;
    const interestAmount = totalAmount - loanAmount;

    setEmi(calculatedEmi);
    setTotalInterest(interestAmount);
    setTotalPayment(totalAmount);

    // Generate amortization schedule
    const schedule: AmortizationRow[] = [];
    let balance = loanAmount;
    const monthlyRate = interestRate / 12 / 100;

    for (let month = 1; month <= tenureInMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = calculatedEmi - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month,
        emi: calculatedEmi,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }

    setAmortizationSchedule(schedule);
  }, [loanAmount, interestRate, loanTenure, tenureType]);

  // Calculate prepayment impact
  const prepaymentImpact = useMemo(() => {
    if (prepaymentAmount === 0) return null;

    const tenureInMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
    const monthlyRate = interestRate / 12 / 100;

    // Calculate balance at prepayment month
    let balance = loanAmount;
    for (let i = 0; i < prepaymentMonth; i++) {
      const interest = balance * monthlyRate;
      const principal = emi - interest;
      balance -= principal;
    }

    // Apply prepayment
    const newBalance = balance - prepaymentAmount;
    
    if (prepaymentType === 'reduce-tenure') {
      // Calculate new tenure with same EMI
      const remainingMonths = Math.ceil(
        Math.log(emi / (emi - newBalance * monthlyRate)) / Math.log(1 + monthlyRate)
      );
      const newTotalTenure = prepaymentMonth + remainingMonths;
      const tenureSaved = tenureInMonths - newTotalTenure;
      const interestSaved = (emi * tenureInMonths) - loanAmount - 
                           ((emi * prepaymentMonth) + (emi * remainingMonths) - loanAmount);

      return {
        type: 'tenure',
        tenureSaved,
        interestSaved,
        newTenure: newTotalTenure,
        newEmi: emi
      };
    } else {
      // Calculate new EMI with same tenure
      const remainingMonths = tenureInMonths - prepaymentMonth;
      const newEmi = (newBalance * monthlyRate * Math.pow(1 + monthlyRate, remainingMonths)) /
                    (Math.pow(1 + monthlyRate, remainingMonths) - 1);
      const emiReduction = emi - newEmi;
      const interestSaved = (emi - newEmi) * remainingMonths;

      return {
        type: 'emi',
        emiReduction,
        interestSaved,
        newEmi,
        newTenure: tenureInMonths
      };
    }
  }, [loanAmount, interestRate, loanTenure, tenureType, emi, prepaymentAmount, prepaymentMonth, prepaymentType]);

  // AI-powered insights
  const insights = useMemo(() => {
    const tips: string[] = [];
    const tenureInMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
    const interestPercentage = (totalInterest / loanAmount) * 100;

    if (interestRate > 10) {
      const savedInterest = totalPayment - (calculateEMI(loanAmount, interestRate - 1, tenureInMonths) * tenureInMonths);
      tips.push(`💡 Your interest rate is ${interestRate}%. Reducing it by just 1% could save you ${formatCurrency(savedInterest)} over the loan period. Consider negotiating with your lender.`);
    }

    if (tenureInMonths > 180) {
      const shorterTenureMonths = tenureInMonths - 60;
      const shorterEmi = calculateEMI(loanAmount, interestRate, shorterTenureMonths);
      const shorterTotal = shorterEmi * shorterTenureMonths;
      const savings = totalPayment - shorterTotal;
      tips.push(`⏱️ Consider reducing your tenure by 5 years. While your EMI will increase to ${formatCurrency(shorterEmi)}, you'll save ${formatCurrency(savings)} in interest.`);
    }

    if (interestPercentage > 50) {
      tips.push(`💰 You'll pay ${interestPercentage.toFixed(0)}% of the loan amount as interest! Making prepayments can significantly reduce this burden.`);
    }

    const prepayAmount = Math.round(loanAmount * 0.1);
    tips.push(`🎯 Smart Tip: If you prepay ${formatCurrency(prepayAmount)} after 12 months, you could save approximately ${formatCurrency(prepayAmount * 0.15)} in interest.`);

    return tips;
  }, [loanAmount, interestRate, loanTenure, tenureType, totalInterest, totalPayment]);

  // Chart data
  const pieChartData = {
    labels: ['Principal Amount', 'Total Interest'],
    datasets: [{
      data: [loanAmount, totalInterest],
      backgroundColor: ['#3b82f6', '#f59e0b'],
      borderColor: ['#2563eb', '#d97706'],
      borderWidth: 2
    }]
  };

  const lineChartData = {
    labels: amortizationSchedule
      .filter((_, index) => index % Math.ceil(amortizationSchedule.length / 20) === 0)
      .map(row => `Month ${row.month}`),
    datasets: [
      {
        label: 'Outstanding Balance',
        data: amortizationSchedule
          .filter((_, index) => index % Math.ceil(amortizationSchedule.length / 20) === 0)
          .map(row => row.balance),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Principal Paid',
        data: amortizationSchedule
          .filter((_, index) => index % Math.ceil(amortizationSchedule.length / 20) === 0)
          .map((_, index) => {
            const actualIndex = index * Math.ceil(amortizationSchedule.length / 20);
            return loanAmount - amortizationSchedule[actualIndex].balance;
          }),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  // Export functions
  const exportToPDF = async () => {
    setExportLoading(true);
    try {
      const { html2canvas, jsPDF } = await getPdfLibs();
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      // Title
      pdf.setFontSize(20);
      pdf.setTextColor(37, 99, 235);
      pdf.text('Loan Calculation Report', pageWidth / 2, 20, { align: 'center' });
      
      // Loan Details
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Loan Amount: ${formatCurrency(loanAmount)}`, 20, 40);
      pdf.text(`Interest Rate: ${interestRate}% p.a.`, 20, 48);
      pdf.text(`Loan Tenure: ${loanTenure} ${tenureType}`, 20, 56);
      pdf.text(`Monthly EMI: ${formatCurrency(emi)}`, 20, 64);
      pdf.text(`Total Interest: ${formatCurrency(totalInterest)}`, 20, 72);
      pdf.text(`Total Payment: ${formatCurrency(totalPayment)}`, 20, 80);

      // Capture charts
      const chartsElement = document.getElementById('loan-charts');
      if (chartsElement) {
        const canvas = await html2canvas(chartsElement);
        const imgData = canvas.toDataURL('image/png');
        pdf.addPage();
        pdf.text('Visual Analysis', pageWidth / 2, 20, { align: 'center' });
        pdf.addImage(imgData, 'PNG', 10, 30, pageWidth - 20, 100);
      }

      // Amortization schedule (first 12 months)
      pdf.addPage();
      pdf.setFontSize(14);
      pdf.text('Amortization Schedule (First Year)', pageWidth / 2, 20, { align: 'center' });
      pdf.setFontSize(10);
      
      let y = 35;
      pdf.text('Month', 20, y);
      pdf.text('EMI', 60, y);
      pdf.text('Principal', 100, y);
      pdf.text('Interest', 140, y);
      pdf.text('Balance', 175, y);
      
      amortizationSchedule.slice(0, 12).forEach((row, index) => {
        y += 8;
        pdf.text(`${row.month}`, 20, y);
        pdf.text(`${formatCurrency(row.emi)}`, 60, y);
        pdf.text(`${formatCurrency(row.principal)}`, 100, y);
        pdf.text(`${formatCurrency(row.interest)}`, 140, y);
        pdf.text(`${formatCurrency(row.balance)}`, 175, y);
      });

      pdf.save('loan-calculation-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  const exportToExcel = async () => {
    setExportLoading(true);
    try {
      const XLSX = await getXlsx();
      // Prepare data
      const summaryData = [
        ['Loan Calculator Report', ''],
        ['', ''],
        ['Loan Details', ''],
        ['Loan Amount', loanAmount],
        ['Interest Rate', `${interestRate}%`],
        ['Loan Tenure', `${loanTenure} ${tenureType}`],
        ['Monthly EMI', emi],
        ['Total Interest', totalInterest],
        ['Total Payment', totalPayment],
        ['', ''],
        ['Amortization Schedule', '']
      ];

      const scheduleData = amortizationSchedule.map(row => ({
        Month: row.month,
        EMI: Math.round(row.emi),
        Principal: Math.round(row.principal),
        Interest: Math.round(row.interest),
        Balance: Math.round(row.balance)
      }));

      // Create workbook
      const wb = XLSX.utils.book_new();
      
      // Summary sheet
      const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');
      
      // Schedule sheet
      const wsSchedule = XLSX.utils.json_to_sheet(scheduleData);
      XLSX.utils.book_append_sheet(wb, wsSchedule, 'Amortization Schedule');

      // Export
      XLSX.writeFile(wb, 'loan-calculation.xlsx');
    } catch (error) {
      console.error('Error generating Excel:', error);
      alert('Error generating Excel file. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  const shareResults = () => {
    const shareText = `Loan Calculator Results:\nLoan: ${formatCurrency(loanAmount)}\nEMI: ${formatCurrency(emi)}\nTotal Interest: ${formatCurrency(totalInterest)}\n\nCalculate yours at ${window.location.href}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Loan Calculator Results',
        text: shareText,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Results copied to clipboard!');
    }
  };

  const resetCalculator = () => {
    setLoanAmount(1000000);
    setInterestRate(9.5);
    setLoanTenure(20);
    setTenureType('years');
    setPrepaymentAmount(0);
    setPrepaymentMonth(12);
    setActiveTab('basic');
    setShowAmortization(false);
  };

  return (
    <>
      <Helmet>
        <title>Advanced Loan Calculator 2024 - EMI, Interest and Prepayment Calculator India | MoneyCal</title>
        <meta name="description" content="Best loan calculator in India 2024. Calculate EMI, total interest, prepayment savings for home loans, personal loans, car loans. Compare loan offers, download amortization schedule PDF/Excel. Get AI-powered financial insights." />
        <meta name="keywords" content="loan calculator india, emi calculator, home loan calculator, personal loan calculator, loan prepayment calculator, loan comparison tool, amortization schedule, best loan calculator 2024, loan emi calculator with prepayment" />
        <link rel="canonical" href="https://moneycal.in/calculators/loan-calculator" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Advanced Loan Calculator 2024 - Calculate EMI, Interest & Savings | MoneyCal" />
        <meta property="og:description" content="India's most advanced loan calculator with EMI calculation, prepayment planning, loan comparison & AI insights. Export to PDF/Excel. Free & easy to use!" />
        <meta property="og:url" content="https://moneycal.in/calculators/loan-calculator" />
        <meta property="og:image" content="https://moneycal.in/loan-calculator-og.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Advanced Loan Calculator 2024 - EMI & Prepayment Calculator" />
        <meta name="twitter:description" content="Calculate loan EMI, interest, prepayment savings. Compare loans, get AI insights & download reports. Best loan calculator in India!" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Advanced Loan Calculator",
            "description": "Calculate loan EMI, interest, prepayment savings and compare loan offers",
            "url": "https://moneycal.in/calculators/loan-calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            }
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🏦 Advanced Loan Calculator 2024
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            India's most intelligent loan calculator. Calculate EMI, compare loans, plan prepayments, 
            and get AI-powered insights to save thousands on your loan.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              ✓ EMI Calculator
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              ✓ Prepayment Planner
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              ✓ Loan Comparison
            </span>
            <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              ✓ AI Insights
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'basic'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Calculator className="inline w-5 h-5 mr-2" />
            Basic Calculator
          </button>
          <button
            onClick={() => setActiveTab('prepayment')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'prepayment'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <TrendingDown className="inline w-5 h-5 mr-2" />
            Prepayment Planner
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'comparison'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <RefreshCw className="inline w-5 h-5 mr-2" />
            Compare Loans
          </button>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Panel - Inputs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Sliders className="w-6 h-6 mr-2 text-blue-600" />
                Loan Details
              </h2>

              {activeTab === 'basic' && (
                <div className="space-y-6">
                  {/* Loan Amount */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 mr-1" />
                      Loan Amount
                    </label>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="range"
                      min="10000"
                      max="10000000"
                      step="10000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹10K</span>
                      <span className="font-medium text-blue-600">{formatCurrency(loanAmount)}</span>
                      <span>₹1Cr</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Percent className="w-4 h-4 mr-1" />
                      Interest Rate (% per annum)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="range"
                      min="5"
                      max="20"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5%</span>
                      <span className="font-medium text-blue-600">{interestRate}%</span>
                      <span>20%</span>
                    </div>
                  </div>

                  {/* Loan Tenure */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4 mr-1" />
                      Loan Tenure
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(Number(e.target.value))}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <select
                        value={tenureType}
                        onChange={(e) => setTenureType(e.target.value as 'years' | 'months')}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="years">Years</option>
                        <option value="months">Months</option>
                      </select>
                    </div>
                    <input
                      type="range"
                      min={tenureType === 'years' ? 1 : 12}
                      max={tenureType === 'years' ? 30 : 360}
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(Number(e.target.value))}
                      className="w-full mt-2"
                    />
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      Loan Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'prepayment' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-800">
                      <Info className="inline w-4 h-4 mr-1" />
                      Prepayment can significantly reduce your loan burden. Use this calculator to see the impact.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prepayment Amount
                    </label>
                    <input
                      type="number"
                      value={prepaymentAmount}
                      onChange={(e) => setPrepaymentAmount(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="range"
                      min="0"
                      max={loanAmount * 0.5}
                      step="1000"
                      value={prepaymentAmount}
                      onChange={(e) => setPrepaymentAmount(Number(e.target.value))}
                      className="w-full mt-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prepayment After (Months)
                    </label>
                    <input
                      type="number"
                      value={prepaymentMonth}
                      onChange={(e) => setPrepaymentMonth(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prepayment Strategy
                    </label>
                    <select
                      value={prepaymentType}
                      onChange={(e) => setPrepaymentType(e.target.value as 'reduce-tenure' | 'reduce-emi')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="reduce-tenure">Reduce Loan Tenure</option>
                      <option value="reduce-emi">Reduce EMI Amount</option>
                    </select>
                  </div>

                  {prepaymentImpact && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2">
                        <CheckCircle2 className="inline w-5 h-5 mr-1" />
                        Prepayment Impact
                      </h3>
                      {prepaymentImpact.type === 'tenure' ? (
                        <>
                          <p className="text-sm text-green-700">
                            • Tenure reduced by <strong>{Math.round(prepaymentImpact.tenureSaved)} months</strong>
                          </p>
                          <p className="text-sm text-green-700">
                            • Interest saved: <strong>{formatCurrency(prepaymentImpact.interestSaved)}</strong>
                          </p>
                          <p className="text-sm text-green-700">
                            • New total tenure: <strong>{Math.round(prepaymentImpact.newTenure)} months</strong>
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-green-700">
                            • EMI reduced by <strong>{formatCurrency(prepaymentImpact.emiReduction)}</strong>
                          </p>
                          <p className="text-sm text-green-700">
                            • New EMI: <strong>{formatCurrency(prepaymentImpact.newEmi)}</strong>
                          </p>
                          <p className="text-sm text-green-700">
                            • Interest saved: <strong>{formatCurrency(prepaymentImpact.interestSaved)}</strong>
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'comparison' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Compare up to 3 loan offers side by side to find the best deal.
                  </p>
                  {comparisonLoans.map((loan, index) => (
                    <div key={loan.id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">{loan.name}</h3>
                      <div className="space-y-2 text-sm">
                        <p>Amount: {formatCurrency(loan.amount)}</p>
                        <p>Rate: {loan.rate}% p.a.</p>
                        <p>Tenure: {loan.tenure} years</p>
                        <p className="font-semibold text-blue-600">
                          EMI: {formatCurrency(calculateEMI(loan.amount, loan.rate, loan.tenure * 12))}
                        </p>
                      </div>
                    </div>
                  ))}
                  {comparisonLoans.length < 3 && (
                    <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
                      + Add Loan to Compare
                    </button>
                  )}
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={resetCalculator}
                  className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Calculator
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Export & Share</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={exportToPDF}
                  disabled={exportLoading}
                  className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center disabled:opacity-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </button>
                <button
                  onClick={exportToExcel}
                  disabled={exportLoading}
                  className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center disabled:opacity-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Excel
                </button>
                <button
                  onClick={shareResults}
                  className="col-span-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Results
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Results Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-100 text-sm">Monthly EMI</span>
                  <Calculator className="w-5 h-5 text-blue-200" />
                </div>
                <p className="text-3xl font-bold">{formatCurrency(emi)}</p>
                <p className="text-blue-100 text-sm mt-1">per month</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-orange-100 text-sm">Total Interest</span>
                  <TrendingDown className="w-5 h-5 text-orange-200" />
                </div>
                <p className="text-3xl font-bold">{formatCurrency(totalInterest)}</p>
                <p className="text-orange-100 text-sm mt-1">
                  {((totalInterest / loanAmount) * 100).toFixed(1)}% of principal
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-100 text-sm">Total Payment</span>
                  <DollarSign className="w-5 h-5 text-purple-200" />
                </div>
                <p className="text-3xl font-bold">{formatCurrency(totalPayment)}</p>
                <p className="text-purple-100 text-sm mt-1">
                  over {tenureType === 'years' ? loanTenure : Math.round(loanTenure / 12)} years
                </p>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-6 border border-yellow-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2 text-yellow-600" />
                AI-Powered Smart Insights
              </h3>
              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-2 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts */}
            <div id="loan-charts" className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <PieChartIcon className="w-6 h-6 mr-2 text-blue-600" />
                Visual Analysis
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">
                    Payment Breakdown
                  </h4>
                  <Pie 
                    data={pieChartData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">
                    Loan Repayment Progress
                  </h4>
                  <Line 
                    data={lineChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: function(value) {
                              return '₹' + (Number(value) / 100000).toFixed(0) + 'L';
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Amortization Schedule */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-blue-600" />
                  Amortization Schedule
                </h3>
                <button
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  {showAmortization ? 'Hide' : 'Show'} Full Schedule
                </button>
              </div>
              
              {showAmortization && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Month</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">EMI</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">Principal</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">Interest</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {amortizationSchedule.slice(0, 12).map((row) => (
                        <tr key={row.month} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-900">{row.month}</td>
                          <td className="px-4 py-3 text-right text-gray-900">{formatCurrency(row.emi)}</td>
                          <td className="px-4 py-3 text-right text-green-600">{formatCurrency(row.principal)}</td>
                          <td className="px-4 py-3 text-right text-orange-600">{formatCurrency(row.interest)}</td>
                          <td className="px-4 py-3 text-right text-gray-900">{formatCurrency(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {amortizationSchedule.length > 12 && (
                    <p className="text-center text-sm text-gray-500 mt-4">
                      Showing first 12 months. Export to view full schedule.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="mt-16 space-y-8">
          {/* How EMI is Calculated */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
              Understanding Your Loan: Complete Guide
            </h2>

            <div className="prose max-w-none">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">📊 How is EMI Calculated?</h3>
              <p className="text-gray-700 mb-4">
                EMI (Equated Monthly Installment) is calculated using the following formula:
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                <code className="text-lg">
                  EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]
                </code>
                <div className="mt-3 text-sm text-gray-700">
                  <p>Where:</p>
                  <ul className="list-disc ml-6 mt-2">
                    <li><strong>P</strong> = Principal loan amount</li>
                    <li><strong>R</strong> = Monthly interest rate (Annual Rate / 12 / 100)</li>
                    <li><strong>N</strong> = Number of monthly installments</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">🔄 Reducing vs Flat Interest Rate</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">✅ Reducing Balance (Better)</h4>
                  <p className="text-sm text-gray-700">
                    Interest is calculated on the outstanding loan balance, which reduces with each payment. 
                    This is the most common and beneficial method for borrowers.
                  </p>
                </div>
                <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">⚠️ Flat Rate</h4>
                  <p className="text-sm text-gray-700">
                    Interest is calculated on the original principal throughout the loan tenure. 
                    This results in higher interest payments compared to reducing balance.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">💰 Smart Strategies to Save on Your Loan</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Make Prepayments</h4>
                      <p className="text-sm text-gray-600">Even small prepayments can save lakhs in interest</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Choose Shorter Tenure</h4>
                      <p className="text-sm text-gray-600">Higher EMI but significantly lower total interest</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Negotiate Interest Rates</h4>
                      <p className="text-sm text-gray-600">Even 0.5% reduction saves thousands</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Balance Transfer</h4>
                      <p className="text-sm text-gray-600">Switch to lenders offering better rates</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Maintain Good CIBIL Score</h4>
                      <p className="text-sm text-gray-600">750+ score gets you the best rates</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Compare Multiple Offers</h4>
                      <p className="text-sm text-gray-600">Shop around for the best deal</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">🏦 Types of Loans in India</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Home Loans</h4>
                  <p className="text-sm text-gray-600">
                    Interest rates: 8.5% - 10.5% | Tenure: Up to 30 years | 
                    Tax benefits under Section 80C and 24(b)
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Personal Loans</h4>
                  <p className="text-sm text-gray-600">
                    Interest rates: 10.5% - 24% | Tenure: Up to 5 years | 
                    No collateral required but higher interest rates
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Car Loans</h4>
                  <p className="text-sm text-gray-600">
                    Interest rates: 8.5% - 14% | Tenure: Up to 7 years | 
                    Vehicle acts as collateral
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Education Loans</h4>
                  <p className="text-sm text-gray-600">
                    Interest rates: 7.5% - 15% | Tenure: Up to 15 years | 
                    Tax benefits under Section 80E
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ❓ Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  q: "What is EMI and how is it calculated?",
                  a: "EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. It is calculated using the formula: EMI = [P × R × (1+R)^N] / [(1+R)^N – 1], where P is principal, R is monthly interest rate, and N is number of months."
                },
                {
                  q: "Should I choose reducing balance or flat rate interest?",
                  a: "Always choose reducing balance interest. In this method, interest is calculated on the outstanding principal, which decreases with each payment. Flat rate calculates interest on the original principal throughout, resulting in significantly higher interest payments."
                },
                {
                  q: "How much can I save by prepaying my loan?",
                  a: "Prepayments can save you substantial amounts. For example, on a ₹10 lakh loan at 10% for 20 years, prepaying ₹1 lakh in the first year can save you approximately ₹1.5-2 lakhs in interest and reduce tenure by 2-3 years. Use our prepayment calculator above to see your exact savings."
                },
                {
                  q: "What is a good CIBIL score for getting the best loan rates?",
                  a: "A CIBIL score of 750 or above is considered excellent and qualifies you for the best interest rates. Scores between 700-749 are good, 650-699 are fair, and below 650 may result in loan rejection or very high interest rates."
                },
                {
                  q: "Should I reduce tenure or EMI when making prepayments?",
                  a: "Generally, reducing tenure is more beneficial as it saves more interest over time. However, if you need better cash flow or have other high-interest debts, reducing EMI might be better. Our calculator shows impact of both options."
                },
                {
                  q: "What is the difference between fixed and floating interest rates?",
                  a: "Fixed rates remain constant throughout the loan tenure, providing payment certainty. Floating rates change with market conditions (linked to repo rate). Floating rates are typically 1-2% lower initially but can increase. Most experts recommend floating for long-term loans like home loans."
                },
                {
                  q: "How does loan tenure affect total interest paid?",
                  a: "Longer tenure means lower EMI but significantly higher total interest. For example, on a ₹10 lakh loan at 10%: 10 years = ₹5.86 lakh interest, 15 years = ₹9.30 lakh interest, 20 years = ₹12.97 lakh interest. Choose the shortest tenure you can afford."
                },
                {
                  q: "Can I claim tax benefits on my loan?",
                  a: "Yes, for home loans: Up to ₹1.5 lakh on principal under Section 80C and up to ₹2 lakh on interest under Section 24(b). Education loans offer unlimited interest deduction under Section 80E. Personal and car loans do not offer tax benefits."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Links */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              🔗 Related Financial Tools & Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/home-loan-calculator" className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200">
                <h3 className="font-semibold text-blue-600 mb-2">Home Loan Calculator</h3>
                <p className="text-sm text-gray-600">Calculate home loan EMI with tax benefits</p>
              </a>
              <a href="/calculators/personal-loan-calculator" className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200">
                <h3 className="font-semibold text-purple-600 mb-2">Personal Loan Calculator</h3>
                <p className="text-sm text-gray-600">Quick personal loan EMI calculations</p>
              </a>
              <a href="/calculators/car-loan-calculator" className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200">
                <h3 className="font-semibold text-green-600 mb-2">Car Loan Calculator</h3>
                <p className="text-sm text-gray-600">Vehicle loan EMI & affordability</p>
              </a>
              <a href="/loan-tools/prepayment-calculator" className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200">
                <h3 className="font-semibold text-orange-600 mb-2">Prepayment Calculator</h3>
                <p className="text-sm text-gray-600">Calculate prepayment savings</p>
              </a>
              <a href="/loan-tools/loan-affordability" className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200">
                <h3 className="font-semibold text-pink-600 mb-2">Loan Affordability</h3>
                <p className="text-sm text-gray-600">How much loan can you afford?</p>
              </a>
              <a href="/calculators/cibil-score-calculator" className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200">
                <h3 className="font-semibold text-indigo-600 mb-2">CIBIL Score Guide</h3>
                <p className="text-sm text-gray-600">Improve your credit score</p>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">📚 Learn More:</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <a href="/learn/loans" className="flex items-center text-blue-600 hover:text-blue-700">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Complete Guide to Loans in India
                </a>
                <a href="/learn/home-loans" className="flex items-center text-blue-600 hover:text-blue-700">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Home Loan Mastery Course (Free)
                </a>
              </div>
            </div>
          </div>

          {/* External Links */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              🌐 Useful External Resources
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://www.rbi.org.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">Reserve Bank of India</h3>
                  <p className="text-sm text-gray-600">Official RBI repo rates & policies</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </a>
              
              <a 
                href="https://www.cibil.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">CIBIL</h3>
                  <p className="text-sm text-gray-600">Check your credit score</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </a>
              
              <a 
                href="https://www.incometax.gov.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">Income Tax India</h3>
                  <p className="text-sm text-gray-600">Tax benefits on loans</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </a>
              
              <a 
                href="https://www.bankbazaar.com/home-loan/emi-calculator.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">BankBazaar</h3>
                  <p className="text-sm text-gray-600">Compare loan offers from banks</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanCalculator;

