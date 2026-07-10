// Format currency in Indian Rupee format
export const formatCurrency = (amount: number): string => {
  // Format as Indian currency (with commas at thousands, lakhs, crores)
  if (amount < 0) return `-₹${Math.abs(amount).toLocaleString('en-IN')}`;
  return `₹${amount.toLocaleString('en-IN')}`;
};

// Memoization cache for expensive calculations
const calculationCache: Record<string, unknown> = {};

// Calculate EMI (Equated Monthly Installment) with caching
export const calculateEMI = (
  principal: number,
  interestRate: number,
  tenureInMonths: number
): number => {
  const cacheKey = `emi_${principal}_${interestRate}_${tenureInMonths}`;

  const cached = calculationCache[cacheKey];
  if (cached) {
    return cached as number;
  }

  const monthlyRate = interestRate / 12 / 100;
  const result = (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths)) /
    (Math.pow(1 + monthlyRate, tenureInMonths) - 1)
  );

  calculationCache[cacheKey] = result;
  return result;
};

// Calculate loan breakup into principal and interest components with caching
export const calculateLoanBreakup = (
  principal: number,
  interestRate: number,
  tenureInMonths: number
): Array<{ principal: number; interest: number }> => {
  const cacheKey = `breakup_${principal}_${interestRate}_${tenureInMonths}`;

  const cached = calculationCache[cacheKey];
  if (cached) {
    return cached as Array<{ principal: number; interest: number }>;
  }

  const emi = calculateEMI(principal, interestRate, tenureInMonths);
  const yearlyBreakup: Array<{ principal: number; interest: number }> = [];
  let remainingPrincipal = principal;
  const monthlyRate = interestRate / 12 / 100;

  // Calculate yearly breakup
  for (let year = 1; year <= Math.ceil(tenureInMonths / 12); year++) {
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;

    // Calculate for each month in the year
    for (let month = 1; month <= 12; month++) {
      const monthNumber = (year - 1) * 12 + month;
      if (monthNumber > tenureInMonths) break;

      const interestForMonth = remainingPrincipal * monthlyRate;
      const principalForMonth = emi - interestForMonth;

      yearlyPrincipal += principalForMonth;
      yearlyInterest += interestForMonth;
      remainingPrincipal -= principalForMonth;
    }

    yearlyBreakup.push({
      principal: yearlyPrincipal,
      interest: yearlyInterest
    });
  }

  calculationCache[cacheKey] = yearlyBreakup;
  return yearlyBreakup;
};

// Calculate monthly loan breakup into principal and interest components
export const calculateMonthlyLoanBreakup = (
  principal: number,
  interestRate: number,
  tenureInMonths: number
): Array<{ month: number; principal: number; interest: number; balance: number }> => {
  const cacheKey = `monthly_breakup_${principal}_${interestRate}_${tenureInMonths}`;

  const cached = calculationCache[cacheKey];
  if (cached) {
    return cached as Array<{ month: number; principal: number; interest: number; balance: number }>;
  }

  const emi = calculateEMI(principal, interestRate, tenureInMonths);
  const monthlyBreakup: Array<{ month: number; principal: number; interest: number; balance: number }> = [];
  let remainingPrincipal = principal;
  const monthlyRate = interestRate / 12 / 100;

  for (let month = 1; month <= tenureInMonths; month++) {
    const interestForMonth = remainingPrincipal * monthlyRate;
    const principalForMonth = emi - interestForMonth;
    remainingPrincipal -= principalForMonth;

    monthlyBreakup.push({
      month,
      principal: principalForMonth,
      interest: interestForMonth,
      balance: Math.max(0, remainingPrincipal)
    });
  }

  calculationCache[cacheKey] = monthlyBreakup;
  return monthlyBreakup;
};

// Calculate SIP (Systematic Investment Plan) returns with caching, including Step-Up and Inflation adjustment
export const calculateSIPReturns = (
  monthlyInvestment: number,
  expectedReturn: number,
  timePeriodYears: number,
  stepUpRate: number = 0,
  inflationRate: number = 0
): {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
  inflationAdjustedValue: number;
  yearlyBreakup: Array<{ year: number; investment: number; value: number }>;
} => {
  const cacheKey = `sip_${monthlyInvestment}_${expectedReturn}_${timePeriodYears}_${stepUpRate}_${inflationRate}`;

  const cached = calculationCache[cacheKey];
  if (cached) {
    return cached as {
      investedAmount: number;
      estimatedReturns: number;
      totalValue: number;
      inflationAdjustedValue: number;
      yearlyBreakup: Array<{ year: number; investment: number; value: number }>;
    };
  }

  const monthlyRate = expectedReturn / 12 / 100;
  
  let currentMonthlyInvestment = monthlyInvestment;
  let totalValue = 0;
  let investedAmount = 0;
  const yearlyBreakup: Array<{ year: number; investment: number; value: number }> = [];

  for (let year = 1; year <= timePeriodYears; year++) {
    let yearInvestment = 0;
    
    // Process month by month for accurate compounding with step-up
    for (let month = 1; month <= 12; month++) {
      totalValue = (totalValue + currentMonthlyInvestment) * (1 + monthlyRate);
      yearInvestment += currentMonthlyInvestment;
      investedAmount += currentMonthlyInvestment;
    }

    yearlyBreakup.push({
      year,
      investment: investedAmount,
      value: totalValue
    });

    // Apply step-up for the next year
    if (stepUpRate > 0 && year < timePeriodYears) {
      currentMonthlyInvestment = currentMonthlyInvestment * (1 + stepUpRate / 100);
    }
  }

  const estimatedReturns = totalValue - investedAmount;
  
  // Calculate inflation adjusted value (Purchasing Power)
  let inflationAdjustedValue = totalValue;
  if (inflationRate > 0) {
    inflationAdjustedValue = totalValue / Math.pow(1 + inflationRate / 100, timePeriodYears);
  } else {
    inflationAdjustedValue = totalValue; // ensure fallback
  }

  const result = {
    investedAmount,
    estimatedReturns,
    totalValue,
    inflationAdjustedValue,
    yearlyBreakup
  };

  calculationCache[cacheKey] = result;
  return result;
};

// Calculate GST (Goods and Services Tax)
export const calculateGST = (
  amount: number,
  gstRate: number,
  calculationType: 'exclusive' | 'inclusive'
): {
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
} => {
  if (calculationType === 'exclusive') {
    // Add GST to base amount
    const gstAmount = amount * (gstRate / 100);
    const totalAmount = amount + gstAmount;

    return {
      baseAmount: amount,
      gstAmount,
      totalAmount
    };
  } else {
    // Remove GST from inclusive amount
    const baseAmount = amount / (1 + gstRate / 100);
    const gstAmount = amount - baseAmount;

    return {
      baseAmount,
      gstAmount,
      totalAmount: amount
    };
  }
};

// Calculate PPF (Public Provident Fund) returns
export const calculatePPF = (
  investmentAmount: number,
  interestRate: number,
  timePeriodYears: number,
  frequency: 'monthly' | 'yearly' = 'yearly'
): {
  totalInvestment: number;
  totalInterest: number;
  maturityValue: number;
  yearlyBreakup: Array<{ year: number; investment: number; interest: number; balance: number }>;
} => {
  const cacheKey = `ppf_${investmentAmount}_${interestRate}_${timePeriodYears}_${frequency}`;

  const cached = calculationCache[cacheKey];
  if (cached) {
    return cached as {
      totalInvestment: number;
      totalInterest: number;
      maturityValue: number;
      yearlyBreakup: Array<{ year: number; investment: number; interest: number; balance: number }>;
    };
  }

  const yearlyBreakup: Array<{ year: number; investment: number; interest: number; balance: number }> = [];
  let balance = 0;
  let totalInvestment = 0;

  for (let year = 1; year <= timePeriodYears; year++) {
    let yearInterest = 0;
    let yearInvestment = 0;

    if (frequency === 'yearly') {
      // Yearly investment (assumed at start of year/April for max interest)
      balance += investmentAmount;
      yearInvestment = investmentAmount;
      totalInvestment += investmentAmount;

      // Interest is calculated on the minimum balance between 5th and last day
      // For yearly, it's simpler: balance * rate
      yearInterest = balance * (interestRate / 100);
      balance += yearInterest;
    } else {
      // Monthly investment
      for (let month = 1; month <= 12; month++) {
        balance += investmentAmount;
        yearInvestment += investmentAmount;
        totalInvestment += investmentAmount;

        // Simple monthly interest approximation for PPF
        // Actual PPF calculates interest monthly but credits annually
        const monthlyInterest = balance * (interestRate / 100 / 12);
        yearInterest += monthlyInterest;
      }
      balance += yearInterest;
    }

    yearlyBreakup.push({
      year,
      investment: yearInvestment,
      interest: yearInterest,
      balance
    });
  }

  const result = {
    totalInvestment,
    totalInterest: balance - totalInvestment,
    maturityValue: balance,
    yearlyBreakup
  };

  calculationCache[cacheKey] = result;
  return result;
};

// Income Tax Calculator
interface DeductionsType {
  section80C: number;
  section80D: number;
  section80G: number;
  hra: number;
  housingLoanInterest: number;
}

export const calculateIncomeTax = (
  annualIncome: number,
  taxRegime: 'old' | 'new',
  ageCategory: 'below60' | '60to80' | 'above80',
  deductions: DeductionsType,
  selectedFY: '2024-25' | '2025-26' | '2026-27' = '2026-27'
): {
  taxableIncome: number;
  totalDeductions: number;
  taxLiability: number;
  effectiveTaxRate: number;
  taxSlabs: Array<{ label: string; amount: number; rate: number; tax: number }>;
  surcharge: number;
  cess: number;
  totalTax: number;
} => {
  const cacheKey = `tax_${annualIncome}_${taxRegime}_${ageCategory}_${JSON.stringify(deductions)}_${selectedFY}`;

  const cached = calculationCache[cacheKey];
  if (cached) {
    return cached as any;
  }

  // Standard Deduction logic
  const stdDed = (selectedFY === '2026-27' || selectedFY === '2025-26' || selectedFY === '2024-25') 
    ? (taxRegime === 'new' ? 75000 : 50000) 
    : 50000;

  // Calculate total deductions
  let totalDeductions = stdDed;
  if (taxRegime === 'old') {
    totalDeductions += Math.min(deductions.section80C, 150000);
    totalDeductions += Math.min(deductions.section80D, 100000);
    totalDeductions += deductions.section80G;
    totalDeductions += deductions.hra;
    totalDeductions += Math.min(deductions.housingLoanInterest, 200000);
  }

  // Calculate taxable income
  const taxableIncome = Math.max(0, annualIncome - totalDeductions);

  // Define tax slabs
  const taxSlabs: Array<{ label: string; amount: number; rate: number; tax: number }> = [];
  let remainingIncome = taxableIncome;
  let totalTaxLiability = 0;

  if (taxRegime === 'old') {
    // Old regime tax slabs (Static across years for simplicity as they rarely change)
    const exemptionLimit = ageCategory === 'above80' ? 500000 : (ageCategory === '60to80' ? 300000 : 250000);
    
    // Slab 1: Exemption
    const s1 = Math.min(remainingIncome, exemptionLimit);
    taxSlabs.push({ label: `0 - ${exemptionLimit / 100000}L`, amount: s1, rate: 0, tax: 0 });
    remainingIncome -= s1;

    // Slab 2: 5% (up to 5L)
    if (remainingIncome > 0) {
      const s2 = Math.min(remainingIncome, 500000 - exemptionLimit);
      const tax = s2 * 0.05;
      taxSlabs.push({ label: `${exemptionLimit / 100000}L - 5L`, amount: s2, rate: 5, tax });
      totalTaxLiability += tax;
      remainingIncome -= s2;
    }

    // Slab 3: 20% (5 - 10L)
    if (remainingIncome > 0) {
      const s3 = Math.min(remainingIncome, 500000);
      const tax = s3 * 0.2;
      taxSlabs.push({ label: `5L - 10L`, amount: s3, rate: 20, tax });
      totalTaxLiability += tax;
      remainingIncome -= s3;
    }

    // Slab 4: 30% (Above 10L)
    if (remainingIncome > 0) {
      const tax = remainingIncome * 0.3;
      taxSlabs.push({ label: `Above 10L`, amount: remainingIncome, rate: 30, tax });
      totalTaxLiability += tax;
    }
  } else {
    // New Regime
    if (selectedFY === '2026-27') {
      // New Income Tax Act 2025 Slabs
      const slabs = [
        { limit: 400000, rate: 0, label: '0 - 4L' },
        { limit: 400000, rate: 5, label: '4L - 8L' },
        { limit: 400000, rate: 10, label: '8L - 12L' },
        { limit: 400000, rate: 15, label: '12L - 16L' },
        { limit: 400000, rate: 20, label: '16L - 20L' },
        { limit: 400000, rate: 25, label: '20L - 24L' },
        { limit: Infinity, rate: 30, label: 'Above 24L' }
      ];
      slabs.forEach(s => {
        if (remainingIncome > 0) {
          const amt = Math.min(remainingIncome, s.limit);
          const tax = amt * (s.rate / 100);
          taxSlabs.push({ label: s.label, amount: amt, rate: s.rate, tax });
          totalTaxLiability += tax;
          remainingIncome -= amt;
        }
      });
    } else {
      // FY 2024-25 & 2025-26 Slabs
      const slabs = [
        { limit: 300000, rate: 0, label: '0 - 3L' },
        { limit: 300000, rate: 5, label: '3L - 6L' },
        { limit: 300000, rate: 10, label: '6L - 9L' },
        { limit: 300000, rate: 15, label: '9L - 12L' },
        { limit: 300000, rate: 20, label: '12L - 15L' },
        { limit: Infinity, rate: 30, label: 'Above 15L' }
      ];
      // Note: Fixing the logic for slabs above 12L
      slabs.forEach((s, idx) => {
        if (remainingIncome > 0) {
          const limit = (idx === 2) ? 300000 : s.limit; // Manual fix for the array typo
          const amt = Math.min(remainingIncome, limit);
          const tax = amt * (s.rate / 100);
          taxSlabs.push({ label: s.label, amount: amt, rate: s.rate, tax });
          totalTaxLiability += tax;
          remainingIncome -= amt;
        }
      });
    }
  }

  // Rebate u/s 87A
  let taxBeforeCess = totalTaxLiability;
  let rebate87A = 0;
  if (taxRegime === 'new') {
    if (selectedFY === '2026-27' && annualIncome <= 1275000) {
      rebate87A = totalTaxLiability;
      totalTaxLiability = 0; // Effectively nil including standard deduction
    } else if (selectedFY !== '2026-27' && annualIncome <= 775000) {
      rebate87A = totalTaxLiability;
      totalTaxLiability = 0;
    }
  } else if (taxRegime === 'old' && taxableIncome <= 500000) {
    rebate87A = totalTaxLiability;
    totalTaxLiability = 0; // Max rebate ₹12,500
  }

  // Calculate surcharge (High Income) - Optimized for Budget 2024/2026
  let surcharge = 0;
  if (taxableIncome > 5000000) {
    const sRate = taxableIncome > 20000000 ? 0.25 : (taxableIncome > 10000000 ? 0.15 : 0.10);
    surcharge = totalTaxLiability * sRate;
  }

  // Cess (4%)
  const cess = (totalTaxLiability + surcharge) * 0.04;
  const totalTax = totalTaxLiability + surcharge + cess;
  const effectiveTaxRate = annualIncome > 0 ? (totalTax / annualIncome) * 100 : 0;

  const result = {
    taxableIncome,
    totalDeductions,
    taxLiability: totalTaxLiability,
    effectiveTaxRate,
    taxSlabs,
    surcharge,
    cess,
    totalTax,
    breakup: {
      standardDeduction: stdDed,
      totalDeductions: totalDeductions,
      taxBeforeCess: taxBeforeCess,
      rebate87A: rebate87A
    }
  };

  calculationCache[cacheKey] = result;
  return result;
};

// Clear cache when it gets too large
export const clearCalculationCache = () => {
  const cacheSize = Object.keys(calculationCache).length;
  if (cacheSize > 100) {
    for (const key in calculationCache) {
      delete calculationCache[key];
    }
  }
};

/**
 * Calculate the impact of making prepayments on a home loan
 * @returns Saved interest and reduced tenure
 */
export const calculatePrepaymentImpact = (
  principal: number,
  interestRate: number,
  tenureInMonths: number,
  monthlyPrepayment: number = 0,
  oneTimePrepayment: number = 0,
  prepaymentMonth: number = 0
): {
  originalTotalInterest: number;
  newTotalInterest: number;
  interestSaved: number;
  originalTenureMonths: number;
  newTenureMonths: number;
  tenureReducedMonths: number;
} => {
  const emi = calculateEMI(principal, interestRate, tenureInMonths);
  const originalTotalInterest = (emi * tenureInMonths) - principal;

  let remainingPrincipal = principal;
  const monthlyRate = interestRate / 12 / 100;
  let newTotalInterest = 0;
  let monthsCount = 0;

  // Simulate month by month
  while (remainingPrincipal > 0.1 && monthsCount < tenureInMonths + 120) { // Safety cap
    monthsCount++;
    const interestForMonth = remainingPrincipal * monthlyRate;
    newTotalInterest += interestForMonth;

    let principalForMonth = emi - interestForMonth;

    // Add one-time prepayment if this is the target month
    if (monthsCount === prepaymentMonth) {
      principalForMonth += oneTimePrepayment;
    }

    // Add recurring monthly prepayment
    principalForMonth += monthlyPrepayment;

    remainingPrincipal -= principalForMonth;

    if (remainingPrincipal < 0) {
      // Adjustment for the last month
      newTotalInterest += remainingPrincipal * monthlyRate; // Remove extra interest
      remainingPrincipal = 0;
    }
  }

  return {
    originalTotalInterest,
    newTotalInterest,
    interestSaved: Math.max(0, originalTotalInterest - newTotalInterest),
    originalTenureMonths: tenureInMonths,
    newTenureMonths: monthsCount,
    tenureReducedMonths: Math.max(0, tenureInMonths - monthsCount)
  };
};

/**
 * Calculate annual tax savings on home loan interest (Section 24b) and principal (Section 80C)
 */
export const calculateHomeLoanTaxSavings = (
  annualInterest: number,
  annualPrincipal: number,
  taxSlab: number = 0.3 // Default 30%
): {
  interestBenefit: number;
  principalBenefit: number;
  totalAnnualSaving: number;
} => {
  // Section 24b limit is ₹2,00,000 for self-occupied
  const interestDeduction = Math.min(annualInterest, 200000);
  const interestBenefit = interestDeduction * taxSlab;

  // Section 80C limit is ₹1,50,000 (shared with PF, LIC, etc.)
  const principalDeduction = Math.min(annualPrincipal, 150000);
  const principalBenefit = principalDeduction * taxSlab;

  return {
    interestBenefit,
    principalBenefit,
    totalAnnualSaving: interestBenefit + principalBenefit
  };
};
