const fs = require('fs');
const path = require('path');

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
  const loanKeywords = ['loan', 'emi', 'mortgage', 'credit', 'debt'];
  const investmentKeywords = ['sip', 'investment', 'mutual', 'fund', 'return', 'interest', 'compound'];
  const taxKeywords = ['tax', 'gst', 'tds', 'income', 'deduction'];
  
  const lowerFilename = filename.toLowerCase();
  
  if (loanKeywords.some(keyword => lowerFilename.includes(keyword))) {
    return 'loan';
  } else if (investmentKeywords.some(keyword => lowerFilename.includes(keyword))) {
    return 'investment';
  } else if (taxKeywords.some(keyword => lowerFilename.includes(keyword))) {
    return 'tax';
  }
  
  return 'investment'; // default
}

// Function to generate basic inputs
function generateBasicInputs(calculatorType) {
  const baseInputs = [
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
  
  return baseInputs;
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

  const inputs = ${JSON.stringify(generateBasicInputs(calculatorType), null, 2)};

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
if (require.main === module) {
  main();
}

module.exports = {
  generateEnhancedCalculator,
  updateCalculatorFile,
  getCalculatorFiles,
  needsUpdate
}; 