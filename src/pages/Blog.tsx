import React, { useState, useEffect } from 'react';
import { formatCurrency, calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';
import { Sliders, PieChart, Calendar, Info, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

// ...[SEO and injectSchema functions unchanged]...

export const EmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [breakup, setBreakup] = useState<{ principal: number; interest: number }[]>([]);

  // Manual input states
  const [manualLoanAmount, setManualLoanAmount] = useState<string>(loanAmount.toString());
  const [manualInterestRate, setManualInterestRate] = useState<string>(interestRate.toString());
  const [manualLoanTenure, setManualLoanTenure] = useState<string>(loanTenure.toString());
  const [prepayment, setPrepayment] = useState<number>(0);
  const [showProsCons, setShowProsCons] = useState<boolean>(false);

  // Pagination state for yearly breakup
  const POSTS_PER_PAGE = 15;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    injectSchema();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // reset on new calculation
    let tenureInMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
    let adjustedLoanAmount = loanAmount;
    if (prepayment > 0 && prepayment < loanAmount) {
      adjustedLoanAmount = loanAmount - prepayment;
    }
    const calculatedEmi = calculateEMI(adjustedLoanAmount, interestRate, tenureInMonths);
    const totalAmount = calculatedEmi * tenureInMonths + (loanAmount - adjustedLoanAmount);
    const interestAmount = totalAmount - loanAmount;

    setEmi(calculatedEmi);
    setTotalInterest(interestAmount);
    setTotalPayment(totalAmount);
    setBreakup(calculateLoanBreakup(adjustedLoanAmount, interestRate, tenureInMonths));
  }, [loanAmount, interestRate, loanTenure, tenureType, prepayment]);

  // Manual input handlers
  const handleManualLoanAmountChange = (value: string) => {
    setManualLoanAmount(value);
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(numValue) && numValue >= 10000 && numValue <= 10000000) {
      setLoanAmount(numValue);
    }
  };
  const handleManualInterestRateChange = (value: string) => {
    setManualInterestRate(value);
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(numValue) && numValue >= 5 && numValue <= 20) {
      setInterestRate(numValue);
    }
  };
  const handleManualLoanTenureChange = (value: string) => {
    setManualLoanTenure(value);
    const numValue = parseInt(value.replace(/[^0-9]/g, ''));
    if (!isNaN(numValue)) {
      const min = tenureType === 'years' ? 1 : 1;
      const max = tenureType === 'years' ? 30 : 360;
      if (numValue >= min && numValue <= max) {
        setLoanTenure(numValue);
      }
    }
  };
  useEffect(() => {
    setManualLoanAmount(loanAmount.toString());
    setManualInterestRate(interestRate.toString());
    setManualLoanTenure(loanTenure.toString());
  }, [loanAmount, interestRate, loanTenure]);

  // Pagination logic
  const totalPages = Math.ceil(breakup.length / POSTS_PER_PAGE);
  const paginatedBreakup = breakup.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  // UI for pagination (mobile-first, touch friendly, unique style)
  const PaginationControls = () => (
    <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
      <button
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className={`rounded-full p-2 bg-neutral-100 hover:bg-primary-100 transition-all focus:outline-none ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 rounded-full font-semibold text-xs
              ${currentPage === i + 1 ? 'bg-primary-600 text-white shadow' : 'bg-neutral-100 text-neutral-700'}
              hover:bg-primary-100 transition-all`}
            aria-label={`Go to page ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className={`rounded-full p-2 bg-neutral-100 hover:bg-primary-100 transition-all focus:outline-none ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  // ...[emiProsCons and SEO unchanged]...

  return (
    <>
      <SEO />
      <div className="mx-auto max-w-5xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-8" itemScope itemType="https://schema.org/FinancialProduct">
        <h1 className="sr-only" itemProp="name">
          EMI Calculator India 2025 - Home, Car, Personal Loan, Chart, FAQ, Prepayment
        </h1>
        <meta itemProp="description" content="India's #1 EMI calculator for home, car, personal loans. Accurate, instant results, prepayment, full breakup, chart, FAQ, pros and cons, and RBI links. EEAT, Google SEO, and 2025 compliant." />
        {/* ...inputs and summary unchanged... */}

        {/* Right Side - Charts and Table */}
        <div className="space-y-6">
          {/* ...chart unchanged... */}
          {/* Yearly Breakup with Pagination */}
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary-600" />
              Yearly EMI Breakup
            </h2>
            <div className="mt-4 overflow-auto max-h-72 rounded-lg border border-neutral-200">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Year</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Principal Paid (₹)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Interest Paid (₹)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Outstanding (₹)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {paginatedBreakup.map((year, index) => {
                    // index is relative to page, so get actual year index
                    const actualIndex = (currentPage - 1) * POSTS_PER_PAGE + index;
                    const yearlyPrincipal = year.principal;
                    const yearlyInterest = year.interest;
                    const remainingBalance = Math.max(0, loanAmount - breakup.slice(0, actualIndex + 1).reduce((a, b) => a + b.principal, 0));
                    return (
                      <tr key={actualIndex} className={actualIndex % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                        <td className="px-4 py-2 text-sm text-neutral-900">{actualIndex + 1}</td>
                        <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(yearlyPrincipal)}</td>
                        <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(yearlyInterest)}</td>
                        <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(remainingBalance)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls - show only if more than 15 years */}
            {breakup.length > POSTS_PER_PAGE && <PaginationControls />}
            <div className="text-xs text-neutral-500 mt-2">
              <b>Note:</b> Year-wise breakup is an approximation. For month-wise schedule, use our <a href="https://fincal.in/loan-amortization-schedule" target="_blank" rel="noopener noreferrer" className="underline text-primary-700">Loan Amortization Calculator</a>.
            </div>
          </div>
          {/* ...FAQ unchanged... */}
        </div>
      </div>
    </>
  );
};
