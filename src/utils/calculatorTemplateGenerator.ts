import { 
  Calculator, TrendingUp, DollarSign, Calendar, PieChart, 
  Shield, Users, Star, Clock, Smartphone, Monitor, Tablet,
  Info, AlertCircle, CheckCircle, ExternalLink, Target, Zap,
  Home, Car, CreditCard, Building, PiggyBank, ChartLineUp,
  Gift, Heart, GraduationCap, Plane, Briefcase, ShoppingCart
} from 'lucide-react';

export interface CalculatorTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
  relatedKeywords: string[];
  inputs: Array<{
    id: string;
    label: string;
    type: 'range' | 'number' | 'select' | 'toggle';
    value: number | string;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    options?: Array<{ value: string; label: string }>;
    description?: string;
    tooltip?: string;
    required?: boolean;
  }>;
  features: Array<{
    name: string;
    description: string;
    icon: React.ReactNode;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedCalculators: Array<{
    id: string;
    name: string;
    description: string;
    url: string;
  }>;
  tips: string[];
  calculatorData: {
    formula?: string;
    assumptions?: string[];
    limitations?: string[];
    lastUpdated?: string;
  };
  icon: React.ReactNode;
}

export const calculatorTemplates: Record<string, CalculatorTemplate> = {
  'home-loan-calculator': {
    id: 'home-loan-calculator',
    name: 'Home Loan Calculator',
    description: 'Calculate your home loan EMI, interest, and total payment with our comprehensive home loan calculator. Plan your dream home purchase with accurate calculations.',
    category: 'Loan Calculators',
    seoTitle: 'Home Loan Calculator 2025 - Calculate Home Loan EMI Online | Free Calculator India',
    seoDescription: 'Calculate your home loan EMI instantly with our free home loan calculator. Get accurate EMI calculations, interest rates, and payment schedules. No registration required. Updated for 2025.',
    focusKeyword: 'home loan calculator',
    relatedKeywords: [
      'home loan EMI calculator',
      'housing loan calculator',
      'property loan calculator',
      'home loan EMI calculation',
      'home loan calculator India',
      'home loan calculator online',
      'free home loan calculator'
    ],
    inputs: [
      {
        id: 'loanAmount',
        label: 'Loan Amount',
        type: 'range',
        value: 5000000,
        min: 100000,
        max: 10000000,
        step: 100000,
        unit: ' ₹',
        description: 'Total loan amount you want to borrow',
        tooltip: 'The principal amount you want to borrow for your home purchase',
        required: true
      },
      {
        id: 'interestRate',
        label: 'Interest Rate',
        type: 'range',
        value: 8.5,
        min: 5,
        max: 15,
        step: 0.05,
        unit: '% p.a.',
        description: 'Annual interest rate on your home loan',
        tooltip: 'The interest rate charged by the bank or financial institution',
        required: true
      },
      {
        id: 'loanTenure',
        label: 'Loan Tenure',
        type: 'range',
        value: 20,
        min: 5,
        max: 30,
        step: 1,
        unit: ' years',
        description: 'Duration of your home loan',
        tooltip: 'The number of years you will take to repay the loan',
        required: true
      },
      {
        id: 'downPayment',
        label: 'Down Payment',
        type: 'range',
        value: 20,
        min: 10,
        max: 50,
        step: 5,
        unit: '%',
        description: 'Percentage of property value as down payment',
        tooltip: 'The percentage of property value you will pay upfront',
        required: true
      }
    ],
    features: [
      {
        name: 'Instant Calculation',
        description: 'Get home loan EMI results instantly',
        icon: <Calculator className="h-5 w-5" />
      },
      {
        name: 'Mobile Optimized',
        description: 'Works perfectly on all devices',
        icon: <Smartphone className="h-5 w-5" />
      },
      {
        name: 'No Registration',
        description: 'Use without any sign-up required',
        icon: <Users className="h-5 w-5" />
      },
      {
        name: 'Accurate Results',
        description: 'Based on standard loan formulas',
        icon: <CheckCircle className="h-5 w-5" />
      },
      {
        name: 'Free to Use',
        description: 'Completely free with no charges',
        icon: <DollarSign className="h-5 w-5" />
      },
      {
        name: '2025 Updated',
        description: 'Latest rates for 2025',
        icon: <Clock className="h-5 w-5" />
      }
    ],
    faqs: [
      {
        question: 'What is a home loan EMI?',
        answer: 'Home loan EMI (Equated Monthly Installment) is the fixed monthly payment you make towards your home loan. It includes both principal and interest components, calculated using the reducing balance method.'
      },
      {
        question: 'How much down payment is required for a home loan?',
        answer: 'Typically, banks require 10-20% of the property value as down payment. However, this can vary based on your income, credit score, and the bank\'s policies. Higher down payments usually result in lower EMIs.'
      },
      {
        question: 'What factors affect home loan interest rates?',
        answer: 'Home loan interest rates depend on your credit score, income, employment type, property location, loan amount, and tenure. Government schemes and bank policies also influence the rates.'
      },
      {
        question: 'Can I prepay my home loan?',
        answer: 'Yes, most banks allow partial or full prepayment of home loans. However, some may charge prepayment penalties, especially in the first few years. Check with your bank for specific terms.'
      }
    ],
    relatedCalculators: [
      {
        id: 'emi-calculator',
        name: 'EMI Calculator',
        description: 'Calculate EMI for any type of loan',
        url: '/calculators/emi-calculator'
      },
      {
        id: 'loan-affordability-calculator',
        name: 'Loan Affordability Calculator',
        description: 'Check how much loan you can afford',
        url: '/calculators/loan-affordability-calculator'
      },
      {
        id: 'loan-comparison-calculator',
        name: 'Loan Comparison Calculator',
        description: 'Compare different loan offers',
        url: '/calculators/loan-comparison-calculator'
      }
    ],
    tips: [
      'Compare interest rates from multiple banks before choosing',
      'Consider the total cost, not just the EMI amount',
      'Check for prepayment charges and foreclosure fees',
      'Maintain a good credit score for better rates',
      'Consider your future financial commitments',
      'Read all loan documents carefully before signing'
    ],
    calculatorData: {
      formula: 'EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)',
      assumptions: [
        'Interest rate remains constant throughout the loan tenure',
        'No prepayment or foreclosure charges included',
        'Processing fees and other charges not included',
        'EMI payments are made on time every month'
      ],
      limitations: [
        'Actual loan terms may vary based on credit score and policies',
        'Interest rates may change during the loan tenure',
        'Additional charges like processing fees not included',
        'Results are for planning purposes only'
      ],
      lastUpdated: 'January 2025'
    },
    icon: <Home className="h-6 w-6" />
  },

  'personal-loan-calculator': {
    id: 'personal-loan-calculator',
    name: 'Personal Loan Calculator',
    description: 'Calculate your personal loan EMI and total interest with our free personal loan calculator. Plan your personal loan with accurate calculations.',
    category: 'Loan Calculators',
    seoTitle: 'Personal Loan Calculator 2025 - Calculate Personal Loan EMI Online | Free Calculator India',
    seoDescription: 'Calculate your personal loan EMI instantly with our free personal loan calculator. Get accurate EMI calculations and interest rates. No registration required. Updated for 2025.',
    focusKeyword: 'personal loan calculator',
    relatedKeywords: [
      'personal loan EMI calculator',
      'personal loan EMI calculation',
      'personal loan calculator India',
      'personal loan calculator online',
      'free personal loan calculator'
    ],
    inputs: [
      {
        id: 'loanAmount',
        label: 'Loan Amount',
        type: 'range',
        value: 500000,
        min: 10000,
        max: 5000000,
        step: 10000,
        unit: ' ₹',
        description: 'Personal loan amount you want to borrow',
        tooltip: 'The amount you want to borrow for personal expenses',
        required: true
      },
      {
        id: 'interestRate',
        label: 'Interest Rate',
        type: 'range',
        value: 12,
        min: 8,
        max: 25,
        step: 0.1,
        unit: '% p.a.',
        description: 'Annual interest rate on personal loan',
        tooltip: 'The interest rate charged by the bank or NBFC',
        required: true
      },
      {
        id: 'loanTenure',
        label: 'Loan Tenure',
        type: 'range',
        value: 5,
        min: 1,
        max: 7,
        step: 1,
        unit: ' years',
        description: 'Duration of your personal loan',
        tooltip: 'The number of years to repay the personal loan',
        required: true
      }
    ],
    features: [
      {
        name: 'Instant Calculation',
        description: 'Get personal loan EMI results instantly',
        icon: <Calculator className="h-5 w-5" />
      },
      {
        name: 'Mobile Optimized',
        description: 'Works perfectly on all devices',
        icon: <Smartphone className="h-5 w-5" />
      },
      {
        name: 'No Registration',
        description: 'Use without any sign-up required',
        icon: <Users className="h-5 w-5" />
      },
      {
        name: 'Accurate Results',
        description: 'Based on standard loan formulas',
        icon: <CheckCircle className="h-5 w-5" />
      },
      {
        name: 'Free to Use',
        description: 'Completely free with no charges',
        icon: <DollarSign className="h-5 w-5" />
      },
      {
        name: '2025 Updated',
        description: 'Latest rates for 2025',
        icon: <Clock className="h-5 w-5" />
      }
    ],
    faqs: [
      {
        question: 'What is a personal loan?',
        answer: 'A personal loan is an unsecured loan that you can use for any personal purpose like medical expenses, education, home renovation, wedding, or debt consolidation. No collateral is required.'
      },
      {
        question: 'What is the maximum amount I can borrow?',
        answer: 'The maximum personal loan amount depends on your income, credit score, employment type, and the lender\'s policies. Usually, it ranges from ₹10,000 to ₹50,00,000.'
      },
      {
        question: 'What is the typical interest rate for personal loans?',
        answer: 'Personal loan interest rates typically range from 8% to 25% per annum, depending on your credit score, income, employment type, and the lender. Better credit scores get lower rates.'
      },
      {
        question: 'How long does it take to get a personal loan approved?',
        answer: 'Personal loan approval usually takes 1-7 days, depending on the lender and your documentation. Some lenders offer instant approval for pre-approved customers.'
      }
    ],
    relatedCalculators: [
      {
        id: 'emi-calculator',
        name: 'EMI Calculator',
        description: 'Calculate EMI for any type of loan',
        url: '/calculators/emi-calculator'
      },
      {
        id: 'loan-affordability-calculator',
        name: 'Loan Affordability Calculator',
        description: 'Check how much loan you can afford',
        url: '/calculators/loan-affordability-calculator'
      },
      {
        id: 'credit-card-emi-calculator',
        name: 'Credit Card EMI Calculator',
        description: 'Calculate credit card EMI',
        url: '/calculators/credit-card-emi-calculator'
      }
    ],
    tips: [
      'Compare interest rates from multiple lenders',
      'Check your credit score before applying',
      'Consider the total cost, not just the EMI',
      'Read all terms and conditions carefully',
      'Ensure you can afford the monthly payments',
      'Avoid taking multiple personal loans simultaneously'
    ],
    calculatorData: {
      formula: 'EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)',
      assumptions: [
        'Interest rate remains constant throughout the loan tenure',
        'No prepayment or foreclosure charges included',
        'Processing fees and other charges not included',
        'EMI payments are made on time every month'
      ],
      limitations: [
        'Actual loan terms may vary based on credit score and policies',
        'Interest rates may change during the loan tenure',
        'Additional charges like processing fees not included',
        'Results are for planning purposes only'
      ],
      lastUpdated: 'January 2025'
    },
    icon: <CreditCard className="h-6 w-6" />
  },

  'car-loan-calculator': {
    id: 'car-loan-calculator',
    name: 'Car Loan Calculator',
    description: 'Calculate your car loan EMI and total interest with our free car loan calculator. Plan your car purchase with accurate calculations.',
    category: 'Loan Calculators',
    seoTitle: 'Car Loan Calculator 2025 - Calculate Car Loan EMI Online | Free Calculator India',
    seoDescription: 'Calculate your car loan EMI instantly with our free car loan calculator. Get accurate EMI calculations and interest rates. No registration required. Updated for 2025.',
    focusKeyword: 'car loan calculator',
    relatedKeywords: [
      'car loan EMI calculator',
      'auto loan calculator',
      'vehicle loan calculator',
      'car loan EMI calculation',
      'car loan calculator India',
      'car loan calculator online',
      'free car loan calculator'
    ],
    inputs: [
      {
        id: 'carPrice',
        label: 'Car Price',
        type: 'range',
        value: 800000,
        min: 200000,
        max: 5000000,
        step: 10000,
        unit: ' ₹',
        description: 'Total price of the car you want to buy',
        tooltip: 'The ex-showroom price of the car including taxes',
        required: true
      },
      {
        id: 'downPayment',
        label: 'Down Payment',
        type: 'range',
        value: 20,
        min: 10,
        max: 50,
        step: 5,
        unit: '%',
        description: 'Percentage of car price as down payment',
        tooltip: 'The percentage of car price you will pay upfront',
        required: true
      },
      {
        id: 'interestRate',
        label: 'Interest Rate',
        type: 'range',
        value: 9.5,
        min: 6,
        max: 18,
        step: 0.1,
        unit: '% p.a.',
        description: 'Annual interest rate on car loan',
        tooltip: 'The interest rate charged by the bank or NBFC',
        required: true
      },
      {
        id: 'loanTenure',
        label: 'Loan Tenure',
        type: 'range',
        value: 5,
        min: 1,
        max: 8,
        step: 1,
        unit: ' years',
        description: 'Duration of your car loan',
        tooltip: 'The number of years to repay the car loan',
        required: true
      }
    ],
    features: [
      {
        name: 'Instant Calculation',
        description: 'Get car loan EMI results instantly',
        icon: <Calculator className="h-5 w-5" />
      },
      {
        name: 'Mobile Optimized',
        description: 'Works perfectly on all devices',
        icon: <Smartphone className="h-5 w-5" />
      },
      {
        name: 'No Registration',
        description: 'Use without any sign-up required',
        icon: <Users className="h-5 w-5" />
      },
      {
        name: 'Accurate Results',
        description: 'Based on standard loan formulas',
        icon: <CheckCircle className="h-5 w-5" />
      },
      {
        name: 'Free to Use',
        description: 'Completely free with no charges',
        icon: <DollarSign className="h-5 w-5" />
      },
      {
        name: '2025 Updated',
        description: 'Latest rates for 2025',
        icon: <Clock className="h-5 w-5" />
      }
    ],
    faqs: [
      {
        question: 'What is a car loan?',
        answer: 'A car loan is a secured loan specifically designed for purchasing a car. The car itself serves as collateral for the loan, which typically results in lower interest rates compared to personal loans.'
      },
      {
        question: 'How much down payment is required for a car loan?',
        answer: 'Most banks require 10-20% of the car price as down payment. However, some lenders may offer 100% financing for certain car models or customers with excellent credit scores.'
      },
      {
        question: 'What is the typical interest rate for car loans?',
        answer: 'Car loan interest rates typically range from 6% to 18% per annum, depending on your credit score, income, car model, and the lender. New cars usually get better rates than used cars.'
      },
      {
        question: 'Can I prepay my car loan?',
        answer: 'Yes, most banks allow prepayment of car loans. However, some may charge prepayment penalties, especially in the first year. Check with your lender for specific terms.'
      }
    ],
    relatedCalculators: [
      {
        id: 'emi-calculator',
        name: 'EMI Calculator',
        description: 'Calculate EMI for any type of loan',
        url: '/calculators/emi-calculator'
      },
      {
        id: 'loan-affordability-calculator',
        name: 'Loan Affordability Calculator',
        description: 'Check how much loan you can afford',
        url: '/calculators/loan-affordability-calculator'
      },
      {
        id: 'loan-comparison-calculator',
        name: 'Loan Comparison Calculator',
        description: 'Compare different loan offers',
        url: '/calculators/loan-comparison-calculator'
      }
    ],
    tips: [
      'Compare interest rates from multiple lenders',
      'Consider the total cost including insurance and maintenance',
      'Check for prepayment charges and foreclosure fees',
      'Maintain a good credit score for better rates',
      'Consider your monthly budget before taking the loan',
      'Read all loan documents carefully before signing'
    ],
    calculatorData: {
      formula: 'EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)',
      assumptions: [
        'Interest rate remains constant throughout the loan tenure',
        'No prepayment or foreclosure charges included',
        'Processing fees and other charges not included',
        'EMI payments are made on time every month'
      ],
      limitations: [
        'Actual loan terms may vary based on credit score and policies',
        'Interest rates may change during the loan tenure',
        'Additional charges like processing fees not included',
        'Results are for planning purposes only'
      ],
      lastUpdated: 'January 2025'
    },
    icon: <Car className="h-6 w-6" />
  }
};

export const getCalculatorTemplate = (calculatorId: string): CalculatorTemplate | null => {
  return calculatorTemplates[calculatorId] || null;
};

export const getAllCalculatorTemplates = (): CalculatorTemplate[] => {
  return Object.values(calculatorTemplates);
}; 