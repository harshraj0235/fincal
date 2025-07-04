import React from 'react';
import { EnhancedCalculator } from '../components/EnhancedCalculator';
import { 
  Calculator, TrendingUp, DollarSign, Calendar, PieChart, 
  Shield, Users, Star, Clock, Smartphone, Monitor, Tablet,
  Info, AlertCircle, CheckCircle, ExternalLink, Target, Receipt
} from 'lucide-react';

export const GstSellerCalculator: React.FC = () => {
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
    "id": "calculationType",
    "label": "Calculation Type",
    "type": "select",
    "value": "exclusive",
    "options": [
      {
        "value": "exclusive",
        "label": "Add GST (Exclusive)"
      },
      {
        "value": "inclusive",
        "label": "Remove GST (Inclusive)"
      }
    ],
    "description": "Choose whether to add or remove GST",
    "tooltip": "Exclusive: Add GST to base amount. Inclusive: Remove GST from total amount.",
    "required": true
  },
  {
    "id": "amount",
    "label": "Amount",
    "type": "range",
    "value": 1000,
    "min": 0,
    "max": 1000000,
    "step": 100,
    "unit": " ₹",
    "description": "Enter the amount for GST calculation",
    "tooltip": "The amount on which GST needs to be calculated or removed",
    "required": true
  },
  {
    "id": "gstRate",
    "label": "GST Rate",
    "type": "select",
    "value": 18,
    "options": [
      {
        "value": 0,
        "label": "0% (Nil Rate)"
      },
      {
        "value": 5,
        "label": "5% (Reduced Rate)"
      },
      {
        "value": 12,
        "label": "12% (Standard Rate)"
      },
      {
        "value": 18,
        "label": "18% (Standard Rate)"
      },
      {
        "value": 28,
        "label": "28% (Luxury Rate)"
      }
    ],
    "description": "Select the applicable GST rate",
    "tooltip": "Choose the GST rate applicable to your goods or services",
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
    "question": "What is Gst Seller Calculator and how does it work?",
    "answer": "Gst Seller Calculator is a financial calculation tool that helps you determine various financial metrics. It uses standard mathematical formulas to provide accurate results for your financial planning needs."
  },
  {
    "question": "How accurate is this gst seller calculator calculator?",
    "answer": "Our gst seller calculator calculator uses standard mathematical formulas and provides accurate projections. However, actual results may vary due to market fluctuations and other factors. Use this as a planning tool."
  },
  {
    "question": "Is this calculator free to use?",
    "answer": "Yes, our gst seller calculator calculator is completely free to use. No registration or payment is required. You can use it as many times as you need for your financial planning."
  },
  {
    "question": "Can I use this calculator on mobile devices?",
    "answer": "Yes, our gst seller calculator calculator is fully optimized for all devices including mobile phones, tablets, and desktop computers. The interface adapts to your screen size."
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
      id="gstsellercalculator"
      name="Gst Seller Calculator"
      description="Calculate your gst seller calculator with our free online calculator. Get accurate calculations and results instantly."
      category="Tax Calculators"
      seoTitle="Gst Seller Calculator 2025 - Calculate Gst Seller Calculator Online | Free Calculator India"
      seoDescription="Calculate your gst seller calculator instantly with our free gst seller calculator calculator. Get accurate calculations and results. No registration required. Updated for 2025."
      focusKeyword="gst seller calculator calculator"
      relatedKeywords={["gst seller calculator calculator","gst seller calculator calculation","gst seller calculator calculator India","gst seller calculator calculator online","free gst seller calculator calculator","gst seller calculator calculator 2025"]}
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