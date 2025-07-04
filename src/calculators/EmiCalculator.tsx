import React from 'react';
import { EnhancedCalculator } from '../components/EnhancedCalculator';
import { 
  Calculator, TrendingUp, DollarSign, Calendar, PieChart, 
  Shield, Users, Star, Clock, Smartphone, Monitor, Tablet,
  Info, AlertCircle, CheckCircle, ExternalLink
} from 'lucide-react';
import { calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';

export const EmiCalculator: React.FC = () => {
  const handleCalculate = (values: Record<string, number | string>) => {
    const loanAmount = values.loanAmount as number;
    const interestRate = values.interestRate as number;
    const loanTenure = values.loanTenure as number;
    const tenureType = values.tenureType as 'years' | 'months';
    
    const tenureInMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
    const calculatedEmi = calculateEMI(loanAmount, interestRate, tenureInMonths);
    const totalAmount = calculatedEmi * tenureInMonths;
    const interestAmount = totalAmount - loanAmount;
    const breakup = calculateLoanBreakup(loanAmount, interestRate, tenureInMonths);
    
    return [
      {
        label: 'Monthly EMI',
        value: calculatedEmi,
        unit: ' ₹',
        color: 'primary' as const,
        icon: <DollarSign className="h-4 w-4" />,
        description: 'Your monthly loan payment'
      },
      {
        label: 'Total Interest',
        value: interestAmount,
        unit: ' ₹',
        color: 'warning' as const,
        icon: <TrendingUp className="h-4 w-4" />,
        description: 'Total interest over loan tenure'
      },
      {
        label: 'Total Payment',
        value: totalAmount,
        unit: ' ₹',
        color: 'success' as const,
        icon: <Calculator className="h-4 w-4" />,
        description: 'Principal + Interest amount'
      },
      {
        label: 'Interest Rate',
        value: interestRate,
        unit: '% p.a.',
        color: 'neutral' as const,
        icon: <TrendingUp className="h-4 w-4" />,
        description: 'Annual interest rate'
      },
      {
        label: 'Loan Tenure',
        value: `${loanTenure} ${tenureType}`,
        color: 'neutral' as const,
        icon: <Calendar className="h-4 w-4" />,
        description: 'Total loan duration'
      },
      {
        label: 'Principal Amount',
        value: loanAmount,
        unit: ' ₹',
        color: 'neutral' as const,
        icon: <DollarSign className="h-4 w-4" />,
        description: 'Original loan amount'
      }
    ];
  };

  const inputs = [
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'range' as const,
      value: 1000000,
      min: 10000,
      max: 10000000,
      step: 10000,
      unit: ' ₹',
      description: 'Enter the principal loan amount you want to borrow',
      tooltip: 'The total amount you want to borrow from the bank or financial institution',
      required: true
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      type: 'range' as const,
      value: 8.5,
      min: 5,
      max: 20,
      step: 0.05,
      unit: '% p.a.',
      description: 'Annual interest rate charged by the lender',
      tooltip: 'The annual percentage rate (APR) charged on your loan',
      required: true
    },
    {
      id: 'loanTenure',
      label: 'Loan Tenure',
      type: 'range' as const,
      value: 20,
      min: 1,
      max: 30,
      step: 1,
      unit: ' years',
      description: 'Duration of the loan in years',
      tooltip: 'The total time period over which you will repay the loan',
      required: true
    },
    {
      id: 'tenureType',
      label: 'Tenure Type',
      type: 'select' as const,
      value: 'years',
      options: [
        { value: 'years', label: 'Years' },
        { value: 'months', label: 'Months' }
      ],
      description: 'Choose between years or months for loan tenure',
      required: true
    }
  ];

  const features = [
    {
      name: 'Instant Calculation',
      description: 'Get EMI results instantly as you adjust values',
      icon: <Calculator className="h-5 w-5" />
    },
    {
      name: 'Mobile Optimized',
      description: 'Works perfectly on all devices and screen sizes',
      icon: <Smartphone className="h-5 w-5" />
    },
    {
      name: 'No Registration',
      description: 'Use our calculator without any sign-up required',
      icon: <Users className="h-5 w-5" />
    },
    {
      name: 'Accurate Results',
      description: 'Based on standard EMI calculation formulas',
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      name: 'Free to Use',
      description: 'Completely free calculator with no hidden charges',
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      name: '2025 Updated',
      description: 'Latest rates and calculations for 2025',
      icon: <Clock className="h-5 w-5" />
    }
  ];

  const faqs = [
    {
      question: 'What is EMI and how is it calculated?',
      answer: 'EMI (Equated Monthly Installment) is the fixed monthly payment you make towards your loan. It includes both principal and interest components. The EMI is calculated using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is the principal amount, r is the monthly interest rate, and n is the total number of months.'
    },
    {
      question: 'How does the interest rate affect my EMI?',
      answer: 'Higher interest rates result in higher EMIs and total interest payments. Even a small difference in interest rate can significantly impact your total loan cost over the long term. It\'s important to compare rates from different lenders before choosing a loan.'
    },
    {
      question: 'What is the difference between reducing balance and flat rate interest?',
      answer: 'In reducing balance method, interest is calculated on the outstanding principal amount, which decreases with each EMI payment. In flat rate method, interest is calculated on the original principal amount throughout the loan tenure. Most banks use reducing balance method as it\'s more beneficial for borrowers.'
    },
    {
      question: 'Can I prepay my loan to reduce EMI burden?',
      answer: 'Yes, most lenders allow partial or full prepayment of loans. Prepaying reduces the outstanding principal, which can either reduce your EMI amount or shorten the loan tenure. However, some lenders may charge prepayment penalties, so check with your bank first.'
    },
    {
      question: 'What factors should I consider before taking a loan?',
      answer: 'Consider your monthly income, existing financial obligations, loan amount, interest rate, tenure, processing fees, and prepayment charges. Ensure your EMI doesn\'t exceed 40-50% of your monthly income to maintain financial stability.'
    },
    {
      question: 'How accurate is this EMI calculator?',
      answer: 'Our EMI calculator uses standard mathematical formulas and provides accurate results. However, actual loan terms may vary based on your credit score, income, employment type, and lender policies. Always verify calculations with your bank before proceeding.'
    }
  ];

  const relatedCalculators = [
    {
      id: 'home-loan-calculator',
      name: 'Home Loan Calculator',
      description: 'Calculate home loan EMI with property details',
      url: '/calculators/home-loan-calculator'
    },
    {
      id: 'personal-loan-calculator',
      name: 'Personal Loan Calculator',
      description: 'Calculate personal loan EMI and eligibility',
      url: '/calculators/personal-loan-calculator'
    },
    {
      id: 'car-loan-calculator',
      name: 'Car Loan Calculator',
      description: 'Calculate car loan EMI with down payment',
      url: '/calculators/car-loan-calculator'
    },
    {
      id: 'loan-comparison-calculator',
      name: 'Loan Comparison Calculator',
      description: 'Compare different loan offers side by side',
      url: '/calculators/loan-comparison-calculator'
    },
    {
      id: 'loan-affordability-calculator',
      name: 'Loan Affordability Calculator',
      description: 'Check how much loan you can afford',
      url: '/calculators/loan-affordability-calculator'
    },
    {
      id: 'loan-prepayment-calculator',
      name: 'Loan Prepayment Calculator',
      description: 'Calculate savings from loan prepayment',
      url: '/calculators/loan-prepayment-calculator'
    }
  ];

  const tips = [
    'Always compare interest rates from multiple lenders before choosing a loan',
    'Consider the total cost of the loan, not just the EMI amount',
    'A longer tenure means lower EMI but higher total interest payment',
    'Check for prepayment charges and foreclosure fees before taking a loan',
    'Maintain a good credit score to get better interest rates',
    'Consider your future financial commitments before taking a loan',
    'Read all loan documents carefully before signing',
    'Keep some emergency funds aside before taking on loan obligations'
  ];

  const calculatorData = {
    formula: 'EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)',
    assumptions: [
      'Interest rate remains constant throughout the loan tenure',
      'No prepayment or foreclosure charges are included',
      'Processing fees and other charges are not included',
      'EMI payments are made on time every month'
    ],
    limitations: [
      'Actual loan terms may vary based on credit score and lender policies',
      'Interest rates may change during the loan tenure',
      'Additional charges like processing fees are not included',
      'Results are for planning purposes only'
    ],
    lastUpdated: 'January 2025'
  };

  return (
    <EnhancedCalculator
      id="emi-calculator"
      name="EMI Calculator"
      description="Calculate your Equated Monthly Installment (EMI) for any loan with our free online EMI calculator. Get instant results for home loans, personal loans, car loans, and more."
      category="Loan Calculators"
      seoTitle="EMI Calculator 2025 - Calculate Loan EMI Online | Free EMI Calculator India"
      seoDescription="Calculate your loan EMI instantly with our free EMI calculator. Get accurate EMI calculations for home loans, personal loans, car loans, and business loans. No registration required. Updated for 2025."
      focusKeyword="EMI calculator"
      relatedKeywords={[
        'loan EMI calculator',
        'home loan EMI calculator',
        'personal loan EMI calculator',
        'car loan EMI calculator',
        'EMI calculation formula',
        'loan EMI calculator India',
        'EMI calculator online',
        'free EMI calculator'
      ]}
      inputs={inputs}
      onCalculate={handleCalculate}
      features={features}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      tips={tips}
      calculatorData={calculatorData}
    />
  );
};