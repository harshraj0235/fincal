import React from 'react';
import { EnhancedCalculator } from '../components/EnhancedCalculator';
import { 
  Calculator, TrendingUp, DollarSign, Calendar, PieChart, 
  Shield, Users, Star, Clock, Smartphone, Monitor, Tablet,
  Info, AlertCircle, CheckCircle, ExternalLink, Target, Receipt
} from 'lucide-react';
import { calculateGST } from '../utils/calculatorUtils';

export const GstCalculator: React.FC = () => {
  const handleCalculate = (values: Record<string, number | string>) => {
    const amount = values.amount as number;
    const gstRate = values.gstRate as number;
    const calculationType = values.calculationType as 'exclusive' | 'inclusive';
    
    const result = calculateGST(amount, gstRate, calculationType);
    const cgst = result.gstAmount / 2;
    const sgst = result.gstAmount / 2;
    
    return [
      {
        label: calculationType === 'exclusive' ? 'Total Amount (with GST)' : 'Base Amount (without GST)',
        value: calculationType === 'exclusive' ? result.totalAmount : result.baseAmount,
        unit: ' ₹',
        color: 'primary' as const,
        icon: <DollarSign className="h-4 w-4" />,
        description: calculationType === 'exclusive' ? 'Amount including GST' : 'Amount excluding GST'
      },
      {
        label: 'GST Amount',
        value: result.gstAmount,
        unit: ' ₹',
        color: 'warning' as const,
        icon: <Receipt className="h-4 w-4" />,
        description: `GST at ${gstRate}% rate`
      },
      {
        label: 'CGST',
        value: cgst,
        unit: ' ₹',
        color: 'neutral' as const,
        icon: <Calculator className="h-4 w-4" />,
        description: 'Central GST (50% of total GST)'
      },
      {
        label: 'SGST',
        value: sgst,
        unit: ' ₹',
        color: 'neutral' as const,
        icon: <Calculator className="h-4 w-4" />,
        description: 'State GST (50% of total GST)'
      },
      {
        label: 'GST Rate',
        value: gstRate,
        unit: '%',
        color: 'neutral' as const,
        icon: <TrendingUp className="h-4 w-4" />,
        description: 'Applicable GST rate'
      },
      {
        label: calculationType === 'exclusive' ? 'Base Amount' : 'Total Amount',
        value: calculationType === 'exclusive' ? amount : result.totalAmount,
        unit: ' ₹',
        color: 'neutral' as const,
        icon: <Target className="h-4 w-4" />,
        description: calculationType === 'exclusive' ? 'Original amount' : 'Amount including GST'
      }
    ];
  };

  const inputs = [
    {
      id: 'calculationType',
      label: 'Calculation Type',
      type: 'select' as const,
      value: 'exclusive',
      options: [
        { value: 'exclusive', label: 'Add GST (Exclusive)' },
        { value: 'inclusive', label: 'Remove GST (Inclusive)' }
      ],
      description: 'Choose whether to add or remove GST',
      tooltip: 'Exclusive: Add GST to base amount. Inclusive: Remove GST from total amount.',
      required: true
    },
    {
      id: 'amount',
      label: 'Amount',
      type: 'range' as const,
      value: 1000,
      min: 0,
      max: 1000000,
      step: 100,
      unit: ' ₹',
      description: 'Enter the amount for GST calculation',
      tooltip: 'The amount on which GST needs to be calculated or removed',
      required: true
    },
    {
      id: 'gstRate',
      label: 'GST Rate',
      type: 'select' as const,
      value: 18,
      options: [
        { value: 0, label: '0% (Nil Rate)' },
        { value: 5, label: '5% (Reduced Rate)' },
        { value: 12, label: '12% (Standard Rate)' },
        { value: 18, label: '18% (Standard Rate)' },
        { value: 28, label: '28% (Luxury Rate)' }
      ],
      description: 'Select the applicable GST rate',
      tooltip: 'Choose the GST rate applicable to your goods or services',
      required: true
    }
  ];

  const features = [
    {
      name: 'Instant Calculation',
      description: 'Get GST results instantly as you adjust values',
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
      description: 'Based on official GST calculation formulas',
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      name: 'Free to Use',
      description: 'Completely free calculator with no hidden charges',
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      name: '2025 Updated',
      description: 'Latest GST rates and calculations for 2025',
      icon: <Clock className="h-5 w-5" />
    }
  ];

  const faqs = [
    {
      question: 'What is GST and how is it calculated?',
      answer: 'GST (Goods and Services Tax) is a comprehensive indirect tax levied on the supply of goods and services in India. It is calculated as a percentage of the taxable value. GST = Taxable Value × GST Rate / 100. The total GST is split equally between CGST (Central GST) and SGST (State GST).'
    },
    {
      question: 'What are the different GST rates in India?',
      answer: 'India has five GST rates: 0% (nil rate for essential items), 5% (reduced rate for basic necessities), 12% and 18% (standard rates for most goods and services), and 28% (luxury rate for premium items). Some items like petroleum products, alcohol, and electricity are outside GST scope.'
    },
    {
      question: 'What is the difference between exclusive and inclusive GST?',
      answer: 'Exclusive GST means the base amount does not include GST, and GST is added on top. Inclusive GST means the total amount already includes GST, and you need to separate the GST component. For example, ₹1000 exclusive + 18% GST = ₹1180, while ₹1180 inclusive contains ₹1000 base + ₹180 GST.'
    },
    {
      question: 'How is CGST and SGST calculated?',
      answer: 'CGST (Central GST) and SGST (State GST) are each calculated as 50% of the total GST amount. For example, if total GST is ₹180 at 18% rate, then CGST = ₹90 and SGST = ₹90. This applies to intra-state supplies. For inter-state supplies, IGST (Integrated GST) is levied at the full rate.'
    },
    {
      question: 'When should I use exclusive vs inclusive GST calculation?',
      answer: 'Use exclusive calculation when you have a base amount and want to add GST to it (common for sellers). Use inclusive calculation when you have a total amount and want to separate the GST component (common for buyers or when analyzing prices).'
    },
    {
      question: 'Are there any exemptions from GST?',
      answer: 'Yes, certain goods and services are exempt from GST, including agricultural products, healthcare services, educational services, and some financial services. The government periodically updates the list of exempt items.'
    },
    {
      question: 'How does GST affect small businesses?',
      answer: 'Businesses with turnover below ₹40 lakhs (₹20 lakhs for special category states) are exempt from GST registration. However, they can voluntarily register to claim input tax credit. Composition scheme is available for businesses with turnover up to ₹1.5 crores.'
    },
    {
      question: 'How accurate is this GST calculator?',
      answer: 'Our GST calculator uses official GST calculation formulas and provides accurate results. However, actual GST liability may vary based on specific business circumstances, exemptions, and input tax credits. Always consult with a tax professional for business decisions.'
    }
  ];

  const relatedCalculators = [
    {
      id: 'gst-seller-calculator',
      name: 'GST Seller Calculator',
      description: 'Calculate GST for sellers and businesses',
      url: '/calculators/gst-seller-calculator'
    },
    {
      id: 'income-tax-calculator',
      name: 'Income Tax Calculator',
      description: 'Calculate income tax for FY 2024-25',
      url: '/calculators/income-tax-calculator'
    },
    {
      id: 'tds-calculator',
      name: 'TDS Calculator',
      description: 'Calculate TDS on various payments',
      url: '/calculators/tds-calculator'
    },
    {
      id: 'profit-margin-calculator',
      name: 'Profit Margin Calculator',
      description: 'Calculate profit margins and pricing',
      url: '/calculators/profit-margin-calculator'
    },
    {
      id: 'break-even-calculator',
      name: 'Break Even Calculator',
      description: 'Calculate break-even point for business',
      url: '/calculators/break-even-calculator'
    },
    {
      id: 'business-loan-calculator',
      name: 'Business Loan Calculator',
      description: 'Calculate business loan EMI',
      url: '/calculators/business-loan-calculator'
    }
  ];

  const tips = [
    'Always verify GST rates for your specific goods or services',
    'Keep proper records of GST collected and paid',
    'File GST returns on time to avoid penalties',
    'Claim input tax credit on business purchases',
    'Use separate accounts for CGST, SGST, and IGST',
    'Verify GST registration numbers of your suppliers',
    'Maintain proper invoices with GST details',
    'Stay updated with latest GST notifications and changes'
  ];

  const calculatorData = {
    formula: 'GST = Taxable Value × GST Rate / 100',
    assumptions: [
      'GST rate remains constant for the calculation period',
      'No exemptions or special rates apply',
      'Equal split between CGST and SGST for intra-state supplies',
      'No input tax credit considerations included'
    ],
    limitations: [
      'Actual GST liability may vary based on business circumstances',
      'Exemptions and special rates not considered',
      'Input tax credit not included in calculations',
      'Results are for planning purposes only'
    ],
    lastUpdated: 'January 2025'
  };

  return (
    <EnhancedCalculator
      id="gst-calculator"
      name="GST Calculator"
      description="Calculate GST (Goods and Services Tax) with our free online GST calculator. Add or remove GST from amounts with accurate calculations for CGST, SGST, and total amounts."
      category="Tax Calculators"
      seoTitle="GST Calculator 2025 - Calculate GST Online | Free GST Calculator India"
      seoDescription="Calculate GST instantly with our free GST calculator. Add or remove GST from amounts, calculate CGST and SGST. No registration required. Updated for 2025 with latest rates."
      focusKeyword="GST calculator"
      relatedKeywords={[
        'GST calculator',
        'GST calculation',
        'CGST calculator',
        'SGST calculator',
        'GST calculator India',
        'GST calculator online',
        'free GST calculator',
        'GST calculator 2025'
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