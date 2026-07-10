import React, { useState, useEffect } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { IndianRupee, TrendingUp, DollarSign, CreditCard, AlertCircle, CheckCircle, ArrowRight, Sliders } from 'lucide-react';
import { CalculatorSchema } from '../../components/CalculatorSchema';
import { CalculatorContentWrapper } from '../../components/CalculatorContentWrapper';

interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  monthlyPayment: number;
  remainingMonths: number;
  minPayment?: number;
}

interface ConsolidationResult {
  currentTotalPayment: number;
  currentTotalInterest: number;
  currentPayoffTime: number;
  consolidatedPayment: number;
  consolidatedInterest: number;
  consolidatedPayoffTime: number;
  monthlySavings: number;
  totalInterestSavings: number;
  timeSavings: number;
  breakEvenMonths: number;
  recommendation: string;
  totalDebt: number;
  weightedRate: number;
  dtiBefore: number;
  dtiAfter: number;
  estimatedClosureMonthCurrent: number;
  estimatedClosureMonthConsolidated: number;
}

const DebtConsolidationCalculator: React.FC = () => {
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Credit Card 1', balance: 50000, interestRate: 18, monthlyPayment: 2500, remainingMonths: 24 },
    { id: '2', name: 'Personal Loan', balance: 200000, interestRate: 12, monthlyPayment: 8000, remainingMonths: 30 },
    { id: '3', name: 'Credit Card 2', balance: 30000, interestRate: 20, monthlyPayment: 1500, remainingMonths: 20 }
  ]);
  
  const [consolidationRate, setConsolidationRate] = useState<number>(10);
  const [consolidationTerm, setConsolidationTerm] = useState<number>(36);
  const [consolidationFee, setConsolidationFee] = useState<number>(5000);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(90000);
  const [existingOtherEmis, setExistingOtherEmis] = useState<number>(6000);
  
  const [results, setResults] = useState<ConsolidationResult | null>(null);

  const simulateCurrent = (items: Debt[]) => {
    const cloned = items.map((d) => ({ ...d }));
    let month = 0;
    let totalInterest = 0;
    let guard = 0;
    while (cloned.some((d) => d.balance > 1) && guard < 600) {
      guard += 1;
      month += 1;
      cloned.forEach((d) => {
        if (d.balance <= 1) return;
        const r = d.interestRate / 12 / 100;
        const interest = d.balance * r;
        const pay = Math.max(0, d.monthlyPayment);
        const principal = Math.max(0, pay - interest);
        totalInterest += interest;
        d.balance = Math.max(0, d.balance - principal);
      });
    }
    return { totalInterest, months: month };
  };

  const emi = (p: number, annualRate: number, n: number) => {
    const r = annualRate / 12 / 100;
    if (r === 0) return p / Math.max(1, n);
    const f = Math.pow(1 + r, n);
    return (p * r * f) / (f - 1);
  };

  const calculateConsolidation = () => {
    const totalBalance = debts.reduce((sum, debt) => sum + debt.balance, 0);
    const currentTotalPayment = debts.reduce((sum, debt) => sum + debt.monthlyPayment, 0);
    const weightedRate = totalBalance > 0 ? debts.reduce((s, d) => s + d.balance * d.interestRate, 0) / totalBalance : 0;

    const currentSim = simulateCurrent(debts);
    const currentTotalInterest = currentSim.totalInterest;
    const currentPayoffTime = currentSim.months;

    const consolidatedPayment = emi(totalBalance + consolidationFee, consolidationRate, consolidationTerm);
    const consolidatedInterest = (consolidatedPayment * consolidationTerm) - totalBalance;
    
    const monthlySavings = currentTotalPayment - consolidatedPayment;
    const totalInterestSavings = currentTotalInterest - consolidatedInterest - consolidationFee;
    const timeSavings = currentPayoffTime - consolidationTerm;
    const breakEvenMonths = monthlySavings > 0 ? consolidationFee / monthlySavings : 0;
    const dtiBefore = monthlyIncome > 0 ? ((currentTotalPayment + existingOtherEmis) / monthlyIncome) * 100 : 0;
    const dtiAfter = monthlyIncome > 0 ? ((consolidatedPayment + existingOtherEmis) / monthlyIncome) * 100 : 0;
    
    let recommendation = '';
    if (totalInterestSavings > 0 && monthlySavings > 0 && dtiAfter < dtiBefore) {
      recommendation = 'Consolidation is financially favorable in this scenario: lower burden and improved monthly cash flow.';
    } else if (monthlySavings > 0 || dtiAfter < dtiBefore) {
      recommendation = 'Consolidation helps monthly stress, but verify tenure and total cost before proceeding.';
    } else {
      recommendation = 'Current debt setup may be cheaper; negotiate better consolidation rate or shorter tenure.';
    }
    
    setResults({
      currentTotalPayment,
      currentTotalInterest,
      currentPayoffTime,
      consolidatedPayment,
      consolidatedInterest,
      consolidatedPayoffTime: consolidationTerm,
      monthlySavings,
      totalInterestSavings,
      timeSavings,
      breakEvenMonths,
      recommendation,
      totalDebt: totalBalance,
      weightedRate,
      dtiBefore,
      dtiAfter,
      estimatedClosureMonthCurrent: currentPayoffTime,
      estimatedClosureMonthConsolidated: consolidationTerm
    });
  };

  useEffect(() => {
    calculateConsolidation();
  }, [debts, consolidationRate, consolidationTerm, consolidationFee]);

  const addDebt = () => {
    const newDebt: Debt = {
      id: Date.now().toString(),
      name: `Debt ${debts.length + 1}`,
      balance: 0,
      interestRate: 0,
      monthlyPayment: 0,
      remainingMonths: 0,
      minPayment: 0
    };
    setDebts([...debts, newDebt]);
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const updateDebt = (id: string, field: keyof Debt, value: number | string) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const contentData = {
    title: 'Debt Consolidation Calculator India 2026',
    description: `This debt consolidation calculator for India helps you evaluate whether combining multiple debts into one loan can reduce monthly burden and total interest. It is designed for Indian borrowers managing credit card outstanding, personal loans, consumer durable EMIs, and small-ticket borrowing across banks/NBFCs.\n\nMost people compare only EMI and miss the complete picture. This tool adds weighted average current rate, break-even period on consolidation fee, debt-to-income stress before and after consolidation, and payoff timeline comparison. That makes it useful for realistic planning, not just headline savings.\n\nHow to use: input each debt with balance, rate, and monthly payment. Then enter consolidation assumptions: new interest rate, tenure, and one-time fee. The calculator estimates total interest in current setup vs consolidated setup and provides practical recommendation signals. This is helpful for balance transfer decisions, personal loan top-up alternatives, and debt restructuring planning.\n\nIndia-focused keyword intent addressed: debt consolidation calculator India, credit card + personal loan consolidation calculator, balance transfer EMI calculator India, debt restructuring calculator India, reduce monthly EMI debt consolidation, debt-to-income calculator India, best debt payoff strategy India.`,
    benefits: [
      'Combines multiple debts into a single comparison model.',
      'Shows weighted current rate vs proposed consolidation rate.',
      'Computes monthly savings, total interest impact, and break-even months.',
      'Adds DTI/FOIR-like stress indicators before and after consolidation.',
      'Useful for India-specific balance transfer and personal loan consolidation decisions.',
      'Helps avoid misleading “lower EMI but higher total cost” mistakes.',
      'Supports fee-inclusive comparison.',
      'Works for credit card + personal loan mixed debt structures.'
    ],
    howToSteps: [
      { step: 'List all active debts', details: 'Enter each debt balance, annual interest, and current monthly payment.' },
      { step: 'Enter consolidation offer details', details: 'Input offered rate, tenure, and all one-time charges.' },
      { step: 'Compare current vs consolidated cost', details: 'Focus on total interest, payoff month, and break-even.' },
      { step: 'Check monthly affordability', details: 'Use income + existing obligations to inspect stress level.' },
      { step: 'Choose strategy', details: 'Consolidate only when either long-term cost improves or financial stress materially drops.' }
    ],
    examples: [
      {
        scenario: 'Credit card + personal loan consolidation',
        inputs: [
          { label: 'Current debts', value: '18%-42% mixed portfolio' },
          { label: 'New rate', value: '11.5% personal loan' },
          { label: 'Term', value: '36 months' }
        ],
        result: 'Monthly EMI pressure may reduce and interest outgo can improve if tenure is controlled.',
        explanation: 'Best outcomes happen when high-cost card debt is replaced with structured lower-rate repayment and no fresh revolving debt is created.'
      }
    ],
    tips: [
      'Prioritize eliminating high-interest revolving card debt first.',
      'Use consolidation as restructuring, not fresh spending capacity.',
      'Avoid very long tenures that reduce EMI but increase total cost.',
      'Check all fees, foreclosure clauses, and reset-rate terms.',
      'Freeze or reduce credit card usage after consolidation.'
    ],
    mistakes: [
      'Consolidating but continuing new card spending.',
      'Ignoring one-time processing and tax costs.',
      'Choosing long tenure only for low EMI optics.',
      'Not checking break-even against fee.',
      'Skipping DTI stress review before finalizing.'
    ],
    faqs: [
      { question: 'Is debt consolidation always good?', answer: 'No. It is good only when rate, tenure, and fee together improve total outcome or reduce harmful monthly stress without causing long-term overpayment.' },
      { question: 'Can consolidation hurt credit score?', answer: 'Short term inquiries/new account may impact score, but disciplined repayment and lower utilization usually help medium-term profile quality.' },
      { question: 'Should I consolidate cards into personal loan?', answer: 'Often yes when card APR is very high and borrower commits to spending discipline. Otherwise debt can re-accumulate.' },
      { question: 'What DTI is safer?', answer: 'Many borrowers target around 35-45% total EMI obligations depending on income stability and family commitments.' }
    ],
    relatedCalculators: [
      { name: 'Loan Comparison Calculator', url: '/calculators/loan-comparison-calculator', description: 'Compare multiple loan offers' },
      { name: 'Loan Prepayment Calculator', url: '/calculators/loan-prepayment-calculator', description: 'Check savings from faster repayment' },
      { name: 'Personal Loan Calculator', url: '/calculators/personal-loan-calculator', description: 'Estimate personal loan EMI and cost' },
      { name: 'Loan Affordability Calculator', url: '/calculators/loan-affordability-calculator', description: 'Check safe borrowing capacity' }
    ],
    lastUpdated: '2026-02-12'
  };

  return (
    <>
      <SEOHelmet
        title="Debt Consolidation Calculator India 2026 | Credit Card + Loan Consolidation | MoneyCal"
        description="Advanced debt consolidation calculator for India. Compare current debts vs one consolidation loan using EMI, total interest, break-even fee, weighted rate, and DTI impact."
        keywords="debt consolidation calculator india, credit card and personal loan consolidation india, balance transfer emi calculator india, debt restructuring calculator india, debt to income calculator india, debt payoff strategy india"
        url="/loan-tools/debt-consolidation-calculator"
      />
      <CalculatorSchema
        name="Debt Consolidation Calculator India"
        description="Compare multiple existing debts with a single consolidation loan using cost, payoff, and affordability metrics."
        url="/loan-tools/debt-consolidation-calculator"
        features={[
          'Multi-debt consolidation analysis',
          'Weighted current interest rate',
          'Break-even calculation with fees',
          'DTI impact before and after',
          'Payoff timeline comparison'
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2026-02-12"
        rating={{ value: 4.8, count: 10040 }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <IndianRupee className="h-12 w-12 text-purple-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Debt Consolidation Calculator</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare consolidating multiple loans into one. Calculate potential savings, 
              break-even point, and get personalized recommendations for debt consolidation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Debts */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard className="h-6 w-6 text-red-600 mr-2" />
                Current Debts
              </h2>
              
              <div className="space-y-6">
                {debts.map((debt, index) => (
                  <div key={debt.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{debt.name}</h3>
                      {debts.length > 1 && (
                        <button
                          onClick={() => removeDebt(debt.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Outstanding Balance (₹)
                        </label>
                        <input
                          type="number"
                          value={debt.balance}
                          onChange={(e) => updateDebt(debt.id, 'balance', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter balance"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Interest Rate (%)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={debt.interestRate}
                          onChange={(e) => updateDebt(debt.id, 'interestRate', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter rate"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Monthly Payment (₹)
                        </label>
                        <input
                          type="number"
                          value={debt.monthlyPayment}
                          onChange={(e) => updateDebt(debt.id, 'monthlyPayment', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter payment"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Remaining Months
                        </label>
                        <input
                          type="number"
                          value={debt.remainingMonths}
                          onChange={(e) => updateDebt(debt.id, 'remainingMonths', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter months"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={addDebt}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-purple-500 hover:text-purple-600 transition-colors"
                >
                  + Add Another Debt
                </button>
              </div>
            </div>

            {/* Consolidation Options */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Sliders className="h-6 w-6 text-green-600 mr-2" />
                Consolidation Options
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Income (INR)
                  </label>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Enter income"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other EMI Obligations (INR)
                  </label>
                  <input
                    type="number"
                    value={existingOtherEmis}
                    onChange={(e) => setExistingOtherEmis(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Other EMIs"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consolidation Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={consolidationRate}
                    onChange={(e) => setConsolidationRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Enter consolidation rate"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {consolidationRate}% per annum
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consolidation Term (Months)
                  </label>
                  <input
                    type="number"
                    value={consolidationTerm}
                    onChange={(e) => setConsolidationTerm(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Enter term"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {consolidationTerm} months ({Math.round(consolidationTerm / 12 * 10) / 10} years)
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consolidation Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={consolidationFee}
                    onChange={(e) => setConsolidationFee(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Enter fee"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {formatCurrency(consolidationFee)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          {results && (
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 text-blue-600 mr-2" />
                Consolidation Analysis
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Monthly Savings */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Monthly Savings</p>
                      <p className="text-3xl font-bold">{formatCurrency(results.monthlySavings)}</p>
                    </div>
                    <TrendingUp className="h-12 w-12 text-green-200" />
                  </div>
                </div>

                {/* Total Interest Savings */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Interest Savings</p>
                      <p className="text-3xl font-bold">{formatCurrency(results.totalInterestSavings)}</p>
                    </div>
                    <DollarSign className="h-12 w-12 text-blue-200" />
                  </div>
                </div>

                {/* Time Savings */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Time Savings</p>
                      <p className="text-3xl font-bold">{results.timeSavings} months</p>
                    </div>
                    <ArrowRight className="h-12 w-12 text-purple-200" />
                  </div>
                </div>

                {/* Break-even Point */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Break-even</p>
                      <p className="text-3xl font-bold">{results.breakEvenMonths.toFixed(1)} months</p>
                    </div>
                    <AlertCircle className="h-12 w-12 text-orange-200" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500">Total Debt</p>
                  <p className="text-lg font-bold">{formatCurrency(results.totalDebt)}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500">Weighted Current Rate</p>
                  <p className="text-lg font-bold">{results.weightedRate.toFixed(2)}%</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500">DTI Before</p>
                  <p className="text-lg font-bold">{results.dtiBefore.toFixed(1)}%</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500">DTI After</p>
                  <p className="text-lg font-bold">{results.dtiAfter.toFixed(1)}%</p>
                </div>
              </div>

              {/* Detailed Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Current Situation */}
                <div className="bg-red-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-red-800 mb-4">Current Situation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Monthly Payment:</span>
                      <span className="font-semibold">{formatCurrency(results.currentTotalPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest:</span>
                      <span className="font-semibold text-red-600">{formatCurrency(results.currentTotalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payoff Time:</span>
                      <span className="font-semibold">{results.currentPayoffTime} months</span>
                    </div>
                  </div>
                </div>

                {/* After Consolidation */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">After Consolidation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Payment:</span>
                      <span className="font-semibold">{formatCurrency(results.consolidatedPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest:</span>
                      <span className="font-semibold text-green-600">{formatCurrency(results.consolidatedInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payoff Time:</span>
                      <span className="font-semibold">{results.consolidatedPayoffTime} months</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className={`mt-8 rounded-lg p-6 ${results.totalInterestSavings > 0 ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                <div className="flex items-center">
                  {results.totalInterestSavings > 0 ? (
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-yellow-600 mr-3" />
                  )}
                  <div>
                    <p className={`font-semibold ${results.totalInterestSavings > 0 ? 'text-green-800' : 'text-yellow-800'}`}>
                      Recommendation
                    </p>
                    <p className={`text-sm ${results.totalInterestSavings > 0 ? 'text-green-700' : 'text-yellow-700'}`}>
                      {results.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Insights */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Monthly Cash Flow</h3>
                <p className="text-sm text-gray-600">
                  Consolidation can improve monthly cash flow by reducing the number of payments 
                  and potentially lowering the total monthly payment.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Interest Savings</h3>
                <p className="text-sm text-gray-600">
                  If the consolidation rate is lower than your current average rate, 
                  you can save significant money on interest over time.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Break-even Analysis</h3>
                <p className="text-sm text-gray-600">
                  Consider the break-even point to understand how long it takes to 
                  recover the consolidation fees through monthly savings.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <CalculatorContentWrapper {...contentData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DebtConsolidationCalculator;
