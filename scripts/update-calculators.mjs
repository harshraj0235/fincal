import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Calculator templates for different types
const calculatorTemplates = {
  'loan': {
    imports: `import React from 'react';
import { EnhancedCalculator } from '../components/EnhancedCalculator';
import { 
  Calculator, TrendingUp, DollarSign, Calendar, PieChart, 
  Shield, Users, Star, Clock, Smartphone, Monitor, Tablet,
  Info, AlertCircle, CheckCircle, ExternalLink, Target
} from 'lucide-react';`,
    category: 'Loan Calculators',
    features: [
      'Instant Calculation',
      'Mobile Optimized', 
      'No Registration',
      'Accurate Results',
      'Free to Use',
      '2025 Updated'
    ]
  },
  'investment': {
    imports: `import React from 'react';
import { EnhancedCalculator } from '../components/EnhancedCalculator';
import { 
  Calculator, TrendingUp, DollarSign, Calendar, PieChart, 
  Shield, Users, Star, Clock, Smartphone, Monitor, Tablet,
  Info, AlertCircle, CheckCircle, ExternalLink, Target, Zap
} from 'lucide-react';`,
    category: 'Investment Calculators',
    features: [
      'Instant Calculation',
      'Mobile Optimized',
      'No Registration', 
      'Accurate Results',
      'Free to Use',
      '2025 Updated'
    ]
  },
  'tax': {
    imports: `import React from 'react';
import { EnhancedCalculator } from '../components/EnhancedCalculator';
import { 
  Calculator, TrendingUp, DollarSign, Calendar, PieChart, 
  Shield, Users, Star, Clock, Smartphone, Monitor, Tablet,
  Info, AlertCircle, CheckCircle, ExternalLink, Target, Receipt
} from 'lucide-react';`,
    category: 'Tax Calculators',
    features: [
      'Instant Calculation',
      'Mobile Optimized',
      'No Registration',
      'Accurate Results', 
      'Free to Use',
      '2025 Updated'
    ]
  }
};

// Function to generate calculator name from filename
function generateCalculatorName(filename) {
  return filename
    .replace('.tsx', '')
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Function to generate SEO title
function generateSeoTitle(name) {
  return `${name} 2025 - Calculate ${name} Online | Free Calculator India`;
}

// Function to generate SEO description
function generateSeoDescription(name) {
  return `Calculate your ${name.toLowerCase()} instantly with our free ${name.toLowerCase()} calculator. Get accurate calculations and results. No registration required. Updated for 2025.`;
}

// Function to generate focus keyword
function generateFocusKeyword(name) {
  return `${name.toLowerCase()} calculator`;
}

// Function to generate related keywords
function generateRelatedKeywords(name) {
  const baseName = name.toLowerCase();
  return [
    `${baseName} calculator`,
    `${baseName} calculation`,
    `${baseName} calculator India`,
    `${baseName} calculator online`,
    `free ${baseName} calculator`,
    `${baseName} calculator 2025`
  ];
}

// Function to determine calculator type
function getCalculatorType(filename) {
  const loanKeywords = ['loan', 'emi', 'mortgage', 'credit', 'debt', 'prepayment', 'refinance'];
  const investmentKeywords = ['sip', 'investment', 'mutual', 'fund', 'return', 'interest', 'compound', 'nps', 'ppf', 'fd', 'rd'];
  const taxKeywords = ['tax', 'gst', 'tds', 'income', 'deduction', 'capital', 'gains'];
  const businessKeywords = ['business', 'profit', 'margin', 'break', 'even', 'inventory', 'turnover'];
  const insuranceKeywords = ['insurance', 'life', 'health', 'term', 'premium'];
  const propertyKeywords = ['property', 'rent', 'buy', 'stamp', 'duty', 'registration'];
  
  const lowerFilename = filename.toLowerCase();
  
  if (loanKeywords.some(keyword => lowerFilename.includes(keyword))) {
    return 'loan';
  } else if (investmentKeywords.some(keyword => lowerFilename.includes(keyword))) {
    return 'investment';
  } else if (taxKeywords.some(keyword => lowerFilename.includes(keyword))) {
    return 'tax';
  } else if (businessKeywords.some(keyword => lowerFilename.includes(keyword))) {
    return 'business';
  } else if (insuranceKeywords.some(keyword => lowerFilename.includes(keyword))) {
    return 'insurance';
  } else if (propertyKeywords.some(keyword => lowerFilename.includes(keyword))) {
    return 'property';
  }
  
  return 'investment'; // default
}

// Function to generate specific inputs based on calculator type
function generateSpecificInputs(calculatorType, filename) {
  const lowerFilename = filename.toLowerCase();
  
  // Loan calculators
  if (calculatorType === 'loan') {
    if (lowerFilename.includes('home')) {
      return [
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
      ];
    } else if (lowerFilename.includes('personal')) {
      return [
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
      ];
    } else if (lowerFilename.includes('car')) {
      return [
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
      ];
    }
  }
  
  // Investment calculators
  if (calculatorType === 'investment') {
    if (lowerFilename.includes('sip')) {
      return [
        {
          id: 'monthlyInvestment',
          label: 'Monthly Investment',
          type: 'range',
          value: 5000,
          min: 500,
          max: 100000,
          step: 500,
          unit: ' ₹',
          description: 'Amount you will invest every month',
          tooltip: 'The fixed amount you plan to invest in SIP every month',
          required: true
        },
        {
          id: 'expectedReturn',
          label: 'Expected Annual Return',
          type: 'range',
          value: 12,
          min: 1,
          max: 30,
          step: 0.1,
          unit: '% p.a.',
          description: 'Expected annual return on your investment',
          tooltip: 'The annual return rate you expect from your investment',
          required: true
        },
        {
          id: 'timePeriod',
          label: 'Investment Period',
          type: 'range',
          value: 10,
          min: 1,
          max: 30,
          step: 1,
          unit: ' years',
          description: 'Duration for which you will invest',
          tooltip: 'The number of years you plan to continue your SIP',
          required: true
        }
      ];
    } else if (lowerFilename.includes('compound')) {
      return [
        {
          id: 'principal',
          label: 'Initial Investment (Principal)',
          type: 'range',
          value: 10000,
          min: 1000,
          max: 1000000,
          step: 1000,
          unit: ' ₹',
          description: 'The starting amount you want to invest',
          tooltip: 'The initial amount of money you invest',
          required: true
        },
        {
          id: 'rate',
          label: 'Annual Interest Rate',
          type: 'range',
          value: 8,
          min: 1,
          max: 20,
          step: 0.1,
          unit: '% p.a.',
          description: 'Annual interest rate your investment will earn',
          tooltip: 'The percentage rate your investment will earn annually',
          required: true
        },
        {
          id: 'time',
          label: 'Investment Period',
          type: 'range',
          value: 10,
          min: 1,
          max: 30,
          step: 1,
          unit: ' years',
          description: 'Number of years you will keep your money invested',
          tooltip: 'The longer you invest, the more powerful compound interest becomes',
          required: true
        },
        {
          id: 'compoundingFrequency',
          label: 'Compounding Frequency',
          type: 'select',
          value: 12,
          options: [
            { value: 1, label: 'Annually (1 time/year)' },
            { value: 2, label: 'Semi-Annually (2 times/year)' },
            { value: 4, label: 'Quarterly (4 times/year)' },
            { value: 12, label: 'Monthly (12 times/year)' },
            { value: 365, label: 'Daily (365 times/year)' }
          ],
          description: 'How often interest is added to your principal',
          tooltip: 'More frequent compounding means faster growth',
          required: true
        }
      ];
    }
  }
  
  // Tax calculators
  if (calculatorType === 'tax') {
    if (lowerFilename.includes('gst')) {
      return [
        {
          id: 'calculationType',
          label: 'Calculation Type',
          type: 'select',
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
          type: 'range',
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
          type: 'select',
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
    }
  }
  
  // Default inputs for other calculators
  return [
    {
      id: 'amount',
      label: 'Amount',
      type: 'range',
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
      type: 'range',
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
      type: 'range',
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
}

// Function to generate basic features
function generateBasicFeatures(template) {
  return template.features.map(feature => ({
    name: feature,
    description: `Get ${feature.toLowerCase()} results instantly`,
    icon: `<Calculator className="h-5 w-5" />`
  }));
}

// Function to generate basic FAQs
function generateBasicFaqs(name) {
  return [
    {
      question: `What is ${name} and how does it work?`,
      answer: `${name} is a financial calculation tool that helps you determine various financial metrics. It uses standard mathematical formulas to provide accurate results for your financial planning needs.`
    },
    {
      question: `How accurate is this ${name.toLowerCase()} calculator?`,
      answer: `Our ${name.toLowerCase()} calculator uses standard mathematical formulas and provides accurate projections. However, actual results may vary due to market fluctuations and other factors. Use this as a planning tool.`
    },
    {
      question: `Is this calculator free to use?`,
      answer: `Yes, our ${name.toLowerCase()} calculator is completely free to use. No registration or payment is required. You can use it as many times as you need for your financial planning.`
    },
    {
      question: `Can I use this calculator on mobile devices?`,
      answer: `Yes, our ${name.toLowerCase()} calculator is fully optimized for all devices including mobile phones, tablets, and desktop computers. The interface adapts to your screen size.`
    }
  ];
}

// Function to generate basic related calculators
function generateBasicRelatedCalculators(name) {
  const commonCalculators = [
    { id: 'emi-calculator', name: 'EMI Calculator', description: 'Calculate EMI for loans' },
    { id: 'sip-calculator', name: 'SIP Calculator', description: 'Calculate SIP returns' },
    { id: 'compound-interest-calculator', name: 'Compound Interest Calculator', description: 'Calculate compound interest' },
    { id: 'gst-calculator', name: 'GST Calculator', description: 'Calculate GST' },
    { id: 'income-tax-calculator', name: 'Income Tax Calculator', description: 'Calculate income tax' }
  ];
  
  return commonCalculators.slice(0, 3).map(calc => ({
    ...calc,
    url: `/calculators/${calc.id}`
  }));
}

// Function to generate basic tips
function generateBasicTips() {
  return [
    'Always verify your inputs before calculating',
    'Consider consulting with a financial advisor for important decisions',
    'Keep your calculations for future reference',
    'Update your inputs as your situation changes',
    'Use this calculator as a planning tool only',
    'Consider all factors that may affect your results'
  ];
}

// Function to generate calculator data
function generateCalculatorData() {
  return {
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
}

// Function to generate basic calculation function
function generateBasicCalculation() {
  return `  const handleCalculate = (values: Record<string, number | string>) => {
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
  };`;
}

// Function to generate enhanced calculator component
function generateEnhancedCalculator(filename) {
  const calculatorName = generateCalculatorName(filename);
  const calculatorType = getCalculatorType(filename);
  const template = calculatorTemplates[calculatorType];
  
  const content = `${template.imports}

export const ${filename.replace('.tsx', '')}: React.FC = () => {
${generateBasicCalculation()}

  const inputs = ${JSON.stringify(generateSpecificInputs(calculatorType, filename), null, 2)};

  const features = ${JSON.stringify(generateBasicFeatures(template), null, 2)};

  const faqs = ${JSON.stringify(generateBasicFaqs(calculatorName), null, 2)};

  const relatedCalculators = ${JSON.stringify(generateBasicRelatedCalculators(calculatorName), null, 2)};

  const tips = ${JSON.stringify(generateBasicTips(), null, 2)};

  const calculatorData = ${JSON.stringify(generateCalculatorData(), null, 2)};

  return (
    <EnhancedCalculator
      id="${filename.replace('.tsx', '').toLowerCase()}"
      name="${calculatorName}"
      description="Calculate your ${calculatorName.toLowerCase()} with our free online calculator. Get accurate calculations and results instantly."
      category="${template.category}"
      seoTitle="${generateSeoTitle(calculatorName)}"
      seoDescription="${generateSeoDescription(calculatorName)}"
      focusKeyword="${generateFocusKeyword(calculatorName)}"
      relatedKeywords={${JSON.stringify(generateRelatedKeywords(calculatorName))}}
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

  return content;
}

// Function to update a single calculator file
function updateCalculatorFile(filePath) {
  try {
    const filename = path.basename(filePath);
    const content = generateEnhancedCalculator(filename);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${filename}`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Function to get all calculator files
function getCalculatorFiles() {
  const calculatorsDir = path.join(__dirname, '..', 'src', 'calculators');
  const files = fs.readdirSync(calculatorsDir);
  return files.filter(file => file.endsWith('.tsx')).map(file => path.join(calculatorsDir, file));
}

// Function to check if file needs updating
function needsUpdate(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return !content.includes('EnhancedCalculator');
  } catch (error) {
    return true;
  }
}

// Main function
function main() {
  console.log('🚀 Starting calculator updates...\n');
  
  const calculatorFiles = getCalculatorFiles();
  const filesToUpdate = calculatorFiles.filter(needsUpdate);
  
  console.log(`Found ${calculatorFiles.length} calculator files`);
  console.log(`${filesToUpdate.length} files need updating\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  filesToUpdate.forEach(filePath => {
    if (updateCalculatorFile(filePath)) {
      successCount++;
    } else {
      errorCount++;
    }
  });
  
  console.log(`\n📊 Update Summary:`);
  console.log(`✅ Successfully updated: ${successCount} files`);
  console.log(`❌ Errors: ${errorCount} files`);
  console.log(`📁 Total files processed: ${filesToUpdate.length}`);
  
  if (errorCount === 0) {
    console.log('\n🎉 All calculators updated successfully!');
  } else {
    console.log('\n⚠️  Some files had errors. Please check the logs above.');
  }
}

// Run the script
main(); 