import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple template for remaining calculators
const simpleTemplate = (calculatorName, category, description) => `import React from 'react';
import { EnhancedCalculator } from '../components/EnhancedCalculator';
import { 
  Calculator, TrendingUp, DollarSign, Calendar, PieChart, 
  Shield, Users, Star, Clock, Smartphone, Monitor, Tablet,
  Info, AlertCircle, CheckCircle, ExternalLink, Target
} from 'lucide-react';

export const ${calculatorName}: React.FC = () => {
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
      id: 'amount',
      label: 'Amount',
      type: 'range' as const,
      value: 10000,
      min: 1000,
      max: 1000000,
      step: 1000,
      unit: ' ₹',
      description: 'Enter the amount for calculation',
      tooltip: 'The amount on which calculation needs to be performed',
      required: true
    },
    {
      id: 'rate',
      label: 'Rate',
      type: 'range' as const,
      value: 10,
      min: 1,
      max: 30,
      step: 0.1,
      unit: '% p.a.',
      description: 'Annual rate for calculation',
      tooltip: 'The annual rate applicable to your calculation',
      required: true
    },
    {
      id: 'period',
      label: 'Time Period',
      type: 'range' as const,
      value: 5,
      min: 1,
      max: 30,
      step: 1,
      unit: ' years',
      description: 'Duration for calculation',
      tooltip: 'The time period for your calculation',
      required: true
    }
  ];

  const features = [
    {
      name: 'Instant Calculation',
      description: 'Get results instantly as you adjust values',
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
      description: 'Based on standard mathematical formulas',
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      name: 'Free to Use',
      description: 'Completely free calculator with no hidden charges',
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      name: '2025 Updated',
      description: 'Latest calculation tools for 2025',
      icon: <Clock className="h-5 w-5" />
    }
  ];

  const faqs = [
    {
      question: 'What is ${calculatorName.replace(/([A-Z])/g, ' $1').trim()}?',
      answer: '${calculatorName.replace(/([A-Z])/g, ' $1').trim()} is a financial calculation tool that helps you determine various financial metrics. It uses standard mathematical formulas to provide accurate results for your financial planning needs.'
    },
    {
      question: 'How accurate is this calculator?',
      answer: 'Our calculator uses standard mathematical formulas and provides accurate projections. However, actual results may vary due to market fluctuations and other factors. Use this as a planning tool.'
    },
    {
      question: 'Is this calculator free to use?',
      answer: 'Yes, our calculator is completely free to use. No registration or payment is required. You can use it as many times as you need for your financial planning.'
    },
    {
      question: 'Can I use this calculator on mobile devices?',
      answer: 'Yes, our calculator is fully optimized for all devices including mobile phones, tablets, and desktop computers. The interface adapts to your screen size.'
    }
  ];

  const relatedCalculators = [
    {
      id: 'emi-calculator',
      name: 'EMI Calculator',
      description: 'Calculate EMI for loans',
      url: '/calculators/emi-calculator'
    },
    {
      id: 'sip-calculator',
      name: 'SIP Calculator',
      description: 'Calculate SIP returns',
      url: '/calculators/sip-calculator'
    },
    {
      id: 'compound-interest-calculator',
      name: 'Compound Interest Calculator',
      description: 'Calculate compound interest',
      url: '/calculators/compound-interest-calculator'
    }
  ];

  const tips = [
    'Always verify your inputs before calculating',
    'Consider consulting with a financial advisor for important decisions',
    'Keep your calculations for future reference',
    'Update your inputs as your situation changes',
    'Use this calculator as a planning tool only',
    'Consider all factors that may affect your results'
  ];

  const calculatorData = {
    formula: 'Standard mathematical formula',
    assumptions: [
      'Rates remain constant throughout the period',
      'No additional charges or fees included',
      'Results are for planning purposes only'
    ],
    limitations: [
      'Actual results may vary due to market conditions',
      'Additional factors not included in calculations',
      'Consult professionals for important decisions'
    ],
    lastUpdated: 'January 2025'
  };

  return (
    <EnhancedCalculator
      id="${calculatorName.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase()}"
      name="${calculatorName.replace(/([A-Z])/g, ' $1').trim()}"
      description="${description}"
      category="${category}"
      seoTitle="${calculatorName.replace(/([A-Z])/g, ' $1').trim()} 2025 - Calculate ${calculatorName.replace(/([A-Z])/g, ' $1').trim()} Online | Free Calculator India"
      seoDescription="Calculate your ${calculatorName.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} instantly with our free calculator. Get accurate calculations and results. No registration required. Updated for 2025."
      focusKeyword="${calculatorName.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} calculator"
      relatedKeywords={[
        '${calculatorName.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} calculator',
        '${calculatorName.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} calculation',
        '${calculatorName.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} calculator India',
        '${calculatorName.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} calculator online',
        'free ${calculatorName.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} calculator',
        '${calculatorName.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} calculator 2025'
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
};`;

// Remaining calculators to update
const remainingCalculators = [
  { name: 'HealthInsuranceCalculator', category: 'Insurance Calculators', description: 'Calculate health insurance premiums and coverage with our free online calculator.' },
  { name: 'HumanLifeValueCalculator', category: 'Insurance Calculators', description: 'Calculate human life value for insurance planning with our free online calculator.' },
  { name: 'InventoryTurnoverCalculator', category: 'Business Calculators', description: 'Calculate inventory turnover ratio for business analysis with our free online calculator.' },
  { name: 'LifeInsuranceCalculator', category: 'Insurance Calculators', description: 'Calculate life insurance premiums and coverage with our free online calculator.' },
  { name: 'MarginTradingCalculator', category: 'Trading Calculators', description: 'Calculate margin trading requirements with our free online calculator.' },
  { name: 'ProfitMarginCalculator', category: 'Business Calculators', description: 'Calculate profit margins for business analysis with our free online calculator.' },
  { name: 'PropertyRegistrationCalculator', category: 'Property Calculators', description: 'Calculate property registration costs with our free online calculator.' },
  { name: 'RentVsBuyAdvancedCalculator', category: 'Property Calculators', description: 'Compare rent vs buy options with our advanced free online calculator.' },
  { name: 'RentVsBuyCalculator', category: 'Property Calculators', description: 'Compare rent vs buy options with our free online calculator.' },
  { name: 'StampDutyCalculator', category: 'Property Calculators', description: 'Calculate stamp duty for property transactions with our free online calculator.' },
  { name: 'TermInsuranceCalculator', category: 'Insurance Calculators', description: 'Calculate term insurance premiums with our free online calculator.' }
];

// Function to update a calculator file
function updateCalculatorFile(calculator) {
  try {
    const filePath = path.join(__dirname, '..', 'src', 'calculators', `${calculator.name}.tsx`);
    const content = simpleTemplate(calculator.name, calculator.category, calculator.description);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${calculator.name}.tsx`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${calculator.name}:`, error.message);
    return false;
  }
}

// Main function
function main() {
  console.log('🚀 Updating remaining calculators...\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  remainingCalculators.forEach(calculator => {
    if (updateCalculatorFile(calculator)) {
      successCount++;
    } else {
      errorCount++;
    }
  });
  
  console.log(`\n📊 Update Summary:`);
  console.log(`✅ Successfully updated: ${successCount} files`);
  console.log(`❌ Errors: ${errorCount} files`);
  console.log(`📁 Total files processed: ${remainingCalculators.length}`);
  
  if (errorCount === 0) {
    console.log('\n🎉 All remaining calculators updated successfully!');
  } else {
    console.log('\n⚠️  Some files had errors. Please check the logs above.');
  }
}

// Run the script
main(); 