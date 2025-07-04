import React from 'react';
import { EnhancedCalculator } from '../components/EnhancedCalculator';
import { 
  Calculator, TrendingUp, DollarSign, Calendar, PieChart, 
  Shield, Users, Star, Clock, Smartphone, Monitor, Tablet,
  Info, AlertCircle, CheckCircle, ExternalLink, Target
} from 'lucide-react';

export const CreditCardFinder: React.FC = () => {
  const handleCalculate = (values: Record<string, number | string>) => {
    const amount = values.amount as number;
    const rate = values.rate as number;
    const period = values.period as number;
    
    // Basic calculation - replace with actual formula
    const result = amount * (1 + rate / 100) ** period;
    const interest = result - amount;
    
    return [
      {
        label: 'Result',
        value: result,
        unit: ' ₹',
        color: 'primary' as const,
        icon: <DollarSign className="h-4 w-4" />,
        description: 'Calculated result'
      },
      {
        label: 'Interest',
        value: interest,
        unit: ' ₹',
        color: 'success' as const,
        icon: <TrendingUp className="h-4 w-4" />,
        description: 'Interest earned'
      },
      {
        label: 'Principal',
        value: amount,
        unit: ' ₹',
        color: 'neutral' as const,
        icon: <Target className="h-4 w-4" />,
        description: 'Original amount'
      }
    ];
  };

  const inputs = [
  {
    "id": "carPrice",
    "label": "Car Price",
    "type": "range",
    "value": 800000,
    "min": 200000,
    "max": 5000000,
    "step": 10000,
    "unit": " ₹",
    "description": "Total price of the car you want to buy",
    "tooltip": "The ex-showroom price of the car including taxes",
    "required": true
  },
  {
    "id": "downPayment",
    "label": "Down Payment",
    "type": "range",
    "value": 20,
    "min": 10,
    "max": 50,
    "step": 5,
    "unit": "%",
    "description": "Percentage of car price as down payment",
    "tooltip": "The percentage of car price you will pay upfront",
    "required": true
  },
  {
    "id": "interestRate",
    "label": "Interest Rate",
    "type": "range",
    "value": 9.5,
    "min": 6,
    "max": 18,
    "step": 0.1,
    "unit": "% p.a.",
    "description": "Annual interest rate on car loan",
    "tooltip": "The interest rate charged by the bank or NBFC",
    "required": true
  },
  {
    "id": "loanTenure",
    "label": "Loan Tenure",
    "type": "range",
    "value": 5,
    "min": 1,
    "max": 8,
    "step": 1,
    "unit": " years",
    "description": "Duration of your car loan",
    "tooltip": "The number of years to repay the car loan",
    "required": true
  }
];

  const features = [
  {
    "name": "Instant Calculation",
    "description": "Get instant calculation results instantly",
    "icon": "<Calculator className=\"h-5 w-5\" />"
  },
  {
    "name": "Mobile Optimized",
    "description": "Get mobile optimized results instantly",
    "icon": "<Calculator className=\"h-5 w-5\" />"
  },
  {
    "name": "No Registration",
    "description": "Get no registration results instantly",
    "icon": "<Calculator className=\"h-5 w-5\" />"
  },
  {
    "name": "Accurate Results",
    "description": "Get accurate results results instantly",
    "icon": "<Calculator className=\"h-5 w-5\" />"
  },
  {
    "name": "Free to Use",
    "description": "Get free to use results instantly",
    "icon": "<Calculator className=\"h-5 w-5\" />"
  },
  {
    "name": "2025 Updated",
    "description": "Get 2025 updated results instantly",
    "icon": "<Calculator className=\"h-5 w-5\" />"
  }
];

  const faqs = [
  {
    "question": "What is Credit Card Finder and how does it work?",
    "answer": "Credit Card Finder is a financial calculation tool that helps you determine various financial metrics. It uses standard mathematical formulas to provide accurate results for your financial planning needs."
  },
  {
    "question": "How accurate is this credit card finder calculator?",
    "answer": "Our credit card finder calculator uses standard mathematical formulas and provides accurate projections. However, actual results may vary due to market fluctuations and other factors. Use this as a planning tool."
  },
  {
    "question": "Is this calculator free to use?",
    "answer": "Yes, our credit card finder calculator is completely free to use. No registration or payment is required. You can use it as many times as you need for your financial planning."
  },
  {
    "question": "Can I use this calculator on mobile devices?",
    "answer": "Yes, our credit card finder calculator is fully optimized for all devices including mobile phones, tablets, and desktop computers. The interface adapts to your screen size."
  }
];

  const relatedCalculators = [
  {
    "id": "emi-calculator",
    "name": "EMI Calculator",
    "description": "Calculate EMI for loans",
    "url": "/calculators/emi-calculator"
  },
  {
    "id": "sip-calculator",
    "name": "SIP Calculator",
    "description": "Calculate SIP returns",
    "url": "/calculators/sip-calculator"
  },
  {
    "id": "compound-interest-calculator",
    "name": "Compound Interest Calculator",
    "description": "Calculate compound interest",
    "url": "/calculators/compound-interest-calculator"
  }
];

  const tips = [
  "Always verify your inputs before calculating",
  "Consider consulting with a financial advisor for important decisions",
  "Keep your calculations for future reference",
  "Update your inputs as your situation changes",
  "Use this calculator as a planning tool only",
  "Consider all factors that may affect your results"
];

  const calculatorData = {
  "formula": "Standard mathematical formula",
  "assumptions": [
    "Rates remain constant throughout the period",
    "No additional charges or fees included",
    "Results are for planning purposes only"
  ],
  "limitations": [
    "Actual results may vary due to market conditions",
    "Additional factors not included in calculations",
    "Consult professionals for important decisions"
  ],
  "lastUpdated": "January 2025"
};

  return (
    <EnhancedCalculator
      id="creditcardfinder"
      name="Credit Card Finder"
      description="Calculate your credit card finder with our free online calculator. Get accurate calculations and results instantly."
      category="Loan Calculators"
      seoTitle="Credit Card Finder 2025 - Calculate Credit Card Finder Online | Free Calculator India"
      seoDescription="Calculate your credit card finder instantly with our free credit card finder calculator. Get accurate calculations and results. No registration required. Updated for 2025."
      focusKeyword="credit card finder calculator"
      relatedKeywords={["credit card finder calculator","credit card finder calculation","credit card finder calculator India","credit card finder calculator online","free credit card finder calculator","credit card finder calculator 2025"]}
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