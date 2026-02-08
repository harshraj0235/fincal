// Format currency in Indian Rupee format
export const formatCurrency = (amount: number): string => {
  // Format as Indian currency (with commas at thousands, lakhs, crores)
  if (amount < 0) return `-₹${Math.abs(amount).toLocaleString('en-IN')}`;
  return `₹${amount.toLocaleString('en-IN')}`;
};

// Memoization cache for expensive calculations
const calculationCache: Record<string, any> = {};

// Calculate EMI (Equated Monthly Installment) with caching
export const calculateEMI = (
  principal: number,
  interestRate: number,
  tenureInMonths: number
): number => {
  const cacheKey = `emi_${principal}_${interestRate}_${tenureInMonths}`;
  
  if (calculationCache[cacheKey]) {
    return calculationCache[cacheKey];
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
): Array<{principal: number; interest: number}> => {
  const cacheKey = `breakup_${principal}_${interestRate}_${tenureInMonths}`;
  
  if (calculationCache[cacheKey]) {
    return calculationCache[cacheKey];
  }
  
  const emi = calculateEMI(principal, interestRate, tenureInMonths);
  const yearlyBreakup: Array<{principal: number; interest: number}> = [];
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

// Calculate SIP (Systematic Investment Plan) returns with caching
export const calculateSIPReturns = (
  monthlyInvestment: number,
  expectedReturn: number,
  timePeriodYears: number
): {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
  yearlyBreakup: Array<{year: number; investment: number; value: number}>;
} => {
  const cacheKey = `sip_${monthlyInvestment}_${expectedReturn}_${timePeriodYears}`;
  
  if (calculationCache[cacheKey]) {
    return calculationCache[cacheKey];
  }
  
  const monthlyRate = expectedReturn / 12 / 100;
  const months = timePeriodYears * 12;
  
  // Formula: FV = P × ((1 + r)^n - 1) / r × (1 + r)
  const totalValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const investedAmount = monthlyInvestment * months;
  const estimatedReturns = totalValue - investedAmount;
  
  // Calculate yearly breakup
  const yearlyBreakup: Array<{year: number; investment: number; value: number}> = [];
  
  for (let year = 1; year <= timePeriodYears; year++) {
    const monthsCompleted = year * 12;
    const investmentToDate = monthlyInvestment * monthsCompleted;
    const valueAtThisPoint = monthlyInvestment * ((Math.pow(1 + monthlyRate, monthsCompleted) - 1) / monthlyRate) * (1 + monthlyRate);
    
    yearlyBreakup.push({
      year,
      investment: investmentToDate,
      value: valueAtThisPoint
    });
  }
  
  const result = {
    investedAmount,
    estimatedReturns,
    totalValue,
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
  yearlyInvestment: number,
  interestRate: number,
  timePeriodYears: number
): {
  totalInvestment: number;
  totalInterest: number;
  maturityValue: number;
  yearlyBreakup: Array<{year: number; investment: number; interest: number; balance: number}>;
} => {
  const cacheKey = `ppf_${yearlyInvestment}_${interestRate}_${timePeriodYears}`;
  
  if (calculationCache[cacheKey]) {
    return calculationCache[cacheKey];
  }
  
  const yearlyBreakup: Array<{year: number; investment: number; interest: number; balance: number}> = [];
  let balance = 0;
  
  for (let year = 1; year <= timePeriodYears; year++) {
    balance += yearlyInvestment;
    const interestForYear = balance * (interestRate / 100);
    balance += interestForYear;
    
    yearlyBreakup.push({
      year,
      investment: yearlyInvestment,
      interest: interestForYear,
      balance
    });
  }
  
  const totalInvestment = yearlyInvestment * timePeriodYears;
  const maturityValue = balance;
  const totalInterest = maturityValue - totalInvestment;
  
  const result = {
    totalInvestment,
    totalInterest,
    maturityValue,
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
  deductions: DeductionsType
): {
  taxableIncome: number;
  totalDeductions: number;
  taxLiability: number;
  effectiveTaxRate: number;
  taxSlabs: Array<{label: string; amount: number; rate: number; tax: number}>;
  surcharge: number;
  cess: number;
  totalTax: number;
} => {
  const cacheKey = `tax_${annualIncome}_${taxRegime}_${ageCategory}_${JSON.stringify(deductions)}`;
  
  if (calculationCache[cacheKey]) {
    return calculationCache[cacheKey];
  }
  
  // Calculate total deductions (applicable only for old regime)
  const totalDeductions = taxRegime === 'old' 
    ? Math.min(deductions.section80C, 150000) +
      Math.min(deductions.section80D, 100000) +
      deductions.section80G +
      deductions.hra +
      Math.min(deductions.housingLoanInterest, 200000)
    : 0;
  
  // Calculate taxable income
  const taxableIncome = Math.max(0, annualIncome - totalDeductions);
  
  // Define tax slabs based on regime and age
  let taxSlabs: Array<{label: string; amount: number; rate: number; tax: number}> = [];
  let remainingIncome = taxableIncome;
  let totalTaxLiability = 0;
  
  if (taxRegime === 'old') {
    // Old regime tax slabs
    if (ageCategory === 'below60') {
      if (remainingIncome > 0) {
        const slabAmount = Math.min(remainingIncome, 250000);
        taxSlabs.push({
          label: '0 - 2.5L',
          amount: slabAmount,
          rate: 0,
          tax: 0
        });
        remainingIncome -= slabAmount;
        totalTaxLiability += 0;
      }
      
      if (remainingIncome > 0) {
        const slabAmount = Math.min(remainingIncome, 250000);
        taxSlabs.push({
          label: '2.5L - 5L',
          amount: slabAmount,
          rate: 5,
          tax: slabAmount * 0.05
        });
        remainingIncome -= slabAmount;
        totalTaxLiability += slabAmount * 0.05;
      }
      
      if (remainingIncome > 0) {
        const slabAmount = Math.min(remainingIncome, 500000);
        taxSlabs.push({
          label: '5L - 10L',
          amount: slabAmount,
          rate: 20,
          tax: slabAmount * 0.2
        });
        remainingIncome -= slabAmount;
        totalTaxLiability += slabAmount * 0.2;
      }
      
      if (remainingIncome > 0) {
        taxSlabs.push({
          label: 'Above 10L',
          amount: remainingIncome,
          rate: 30,
          tax: remainingIncome * 0.3
        });
        totalTaxLiability += remainingIncome * 0.3;
      }
    } else if (ageCategory === '60to80') {
      // Tax slabs for senior citizens (60-80 years)
      if (remainingIncome > 0) {
        const slabAmount = Math.min(remainingIncome, 300000);
        taxSlabs.push({
          label: '0 - 3L',
          amount: slabAmount,
          rate: 0,
          tax: 0
        });
        remainingIncome -= slabAmount;
        totalTaxLiability += 0;
      }
      
      if (remainingIncome > 0) {
        const slabAmount = Math.min(remainingIncome, 200000);
        taxSlabs.push({
          label: '3L - 5L',
          amount: slabAmount,
          rate: 5,
          tax: slabAmount * 0.05
        });
        remainingIncome -= slabAmount;
        totalTaxLiability += slabAmount * 0.05;
      }
      
      if (remainingIncome > 0) {
        const slabAmount = Math.min(remainingIncome, 500000);
        taxSlabs.push({
          label: '5L - 10L',
          amount: slabAmount,
          rate: 20,
          tax: slabAmount * 0.2
        });
        remainingIncome -= slabAmount;
        totalTaxLiability += slabAmount * 0.2;
      }
      
      if (remainingIncome > 0) {
        taxSlabs.push({
          label: 'Above 10L',
          amount: remainingIncome,
          rate: 30,
          tax: remainingIncome * 0.3
        });
        totalTaxLiability += remainingIncome * 0.3;
      }
    } else {
      // Tax slabs for super senior citizens (above 80 years)
      if (remainingIncome > 0) {
        const slabAmount = Math.min(remainingIncome, 500000);
        taxSlabs.push({
          label: '0 - 5L',
          amount: slabAmount,
          rate: 0,
          tax: 0
        });
        remainingIncome -= slabAmount;
        totalTaxLiability += 0;
      }
      
      if (remainingIncome > 0) {
        const slabAmount = Math.min(remainingIncome, 500000);
        taxSlabs.push({
          label: '5L - 10L',
          amount: slabAmount,
          rate: 20,
          tax: slabAmount * 0.2
        });
        remainingIncome -= slabAmount;
        totalTaxLiability += slabAmount * 0.2;
      }
      
      if (remainingIncome > 0) {
        taxSlabs.push({
          label: 'Above 10L',
          amount: remainingIncome,
          rate: 30,
          tax: remainingIncome * 0.3
        });
        totalTaxLiability += remainingIncome * 0.3;
      }
    }
  } else {
    // New regime tax slabs (FY 2023-24)
    if (remainingIncome > 0) {
      const slabAmount = Math.min(remainingIncome, 300000);
      taxSlabs.push({
        label: '0 - 3L',
        amount: slabAmount,
        rate: 0,
        tax: 0
      });
      remainingIncome -= slabAmount;
      totalTaxLiability += 0;
    }
    
    if (remainingIncome > 0) {
      const slabAmount = Math.min(remainingIncome, 300000);
      taxSlabs.push({
        label: '3L - 6L',
        amount: slabAmount,
        rate: 5,
        tax: slabAmount * 0.05
      });
      remainingIncome -= slabAmount;
      totalTaxLiability += slabAmount * 0.05;
    }
    
    if (remainingIncome > 0) {
      const slabAmount = Math.min(remainingIncome, 300000);
      taxSlabs.push({
        label: '6L - 9L',
        amount: slabAmount,
        rate: 10,
        tax: slabAmount * 0.1
      });
      remainingIncome -= slabAmount;
      totalTaxLiability += slabAmount * 0.1;
    }
    
    if (remainingIncome > 0) {
      const slabAmount = Math.min(remainingIncome, 300000);
      taxSlabs.push({
        label: '9L - 12L',
        amount: slabAmount,
        rate: 15,
        tax: slabAmount * 0.15
      });
      remainingIncome -= slabAmount;
      totalTaxLiability += slabAmount * 0.15;
    }
    
    if (remainingIncome > 0) {
      const slabAmount = Math.min(remainingIncome, 300000);
      taxSlabs.push({
        label: '12L - 15L',
        amount: slabAmount,
        rate: 20,
        tax: slabAmount * 0.2
      });
      remainingIncome -= slabAmount;
      totalTaxLiability += slabAmount * 0.2;
    }
    
    if (remainingIncome > 0) {
      taxSlabs.push({
        label: 'Above 15L',
        amount: remainingIncome,
        rate: 30,
        tax: remainingIncome * 0.3
      });
      totalTaxLiability += remainingIncome * 0.3;
    }
  }
  
  // Calculate surcharge (if applicable)
  let surcharge = 0;
  if (taxableIncome > 10000000) {
    if (taxableIncome > 50000000) {
      surcharge = totalTaxLiability * 0.37; // 37% surcharge for income > 5 crore
    } else if (taxableIncome > 20000000) {
      surcharge = totalTaxLiability * 0.25; // 25% surcharge for income > 2 crore
    } else if (taxableIncome > 10000000) {
      surcharge = totalTaxLiability * 0.15; // 15% surcharge for income > 1 crore
    }
  }
  
  // Calculate health and education cess (4%)
  const cess = (totalTaxLiability + surcharge) * 0.04;
  
  // Calculate total tax
  const totalTax = totalTaxLiability + surcharge + cess;
  
  // Calculate effective tax rate
  const effectiveTaxRate = (totalTax / annualIncome) * 100;
  
  const result = {
    taxableIncome,
    totalDeductions,
    taxLiability: totalTaxLiability,
    effectiveTaxRate,
    taxSlabs,
    surcharge,
    cess,
    totalTax
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