import React from 'react';
import { EnhancedCalculator } from '../components/EnhancedCalculator';
import { 
  Calculator, TrendingUp, DollarSign, Calendar, PieChart, 
  Shield, Users, Star, Clock, Smartphone, Monitor, Tablet,
  Info, AlertCircle, CheckCircle, ExternalLink, Target, Building
} from 'lucide-react';

export const BreakEvenCalculator: React.FC = () => {
  const handleCalculate = (values: Record<string, number | string>) => {
    const fixedCosts = values.fixedCosts as number;
    const sellingPrice = values.sellingPrice as number;
    const variableCosts = values.variableCosts as number;
    
    const contributionMargin = sellingPrice - variableCosts;
    const breakEvenUnits = fixedCosts / contributionMargin;
    const breakEvenRevenue = breakEvenUnits * sellingPrice;
    const marginOfSafety = ((sellingPrice - variableCosts) / sellingPrice) * 100;
    
    return [
      {
        label: 'Break Even Units',
        value: breakEvenUnits,
        unit: ' units',
        color: 'primary' as const,
        icon: <Target className="h-4 w-4" />,
        description: 'Units needed to break even'
      },
      {
        label: 'Break Even Revenue',
        value: breakEvenRevenue,
        unit: ' ₹',
        color: 'success' as const,
        icon: <DollarSign className="h-4 w-4" />,
        description: 'Revenue needed to break even'
      },
      {
        label: 'Contribution Margin',
        value: contributionMargin,
        unit: ' ₹',
        color: 'warning' as const,
        icon: <TrendingUp className="h-4 w-4" />,
        description: 'Contribution per unit'
      },
      {
        label: 'Margin of Safety',
        value: marginOfSafety,
        unit: '%',
        color: 'neutral' as const,
        icon: <Shield className="h-4 w-4" />,
        description: 'Safety margin percentage'
      },
      {
        label: 'Fixed Costs',
        value: fixedCosts,
        unit: ' ₹',
        color: 'neutral' as const,
        icon: <Building className="h-4 w-4" />,
        description: 'Total fixed costs'
      },
      {
        label: 'Selling Price',
        value: sellingPrice,
        unit: ' ₹',
        color: 'neutral' as const,
        icon: <Calculator className="h-4 w-4" />,
        description: 'Price per unit'
      }
    ];
  };

  const inputs = [
    {
      id: 'fixedCosts',
      label: 'Fixed Costs',
      type: 'range' as const,
      value: 50000,
      min: 1000,
      max: 1000000,
      step: 1000,
      unit: ' ₹',
      description: 'Total fixed costs for your business',
      tooltip: 'Costs that remain constant regardless of production volume (rent, salaries, etc.)',
      required: true
    },
    {
      id: 'sellingPrice',
      label: 'Selling Price per Unit',
      type: 'range' as const,
      value: 100,
      min: 10,
      max: 10000,
      step: 10,
      unit: ' ₹',
      description: 'Price at which you sell each unit',
      tooltip: 'The price you charge customers for each unit of your product or service',
      required: true
    },
    {
      id: 'variableCosts',
      label: 'Variable Cost per Unit',
      type: 'range' as const,
      value: 60,
      min: 1,
      max: 5000,
      step: 1,
      unit: ' ₹',
      description: 'Cost per unit that varies with production',
      tooltip: 'Costs that change with production volume (materials, labor, etc.)',
      required: true
    }
  ];

  const features = [
    {
      name: 'Instant Calculation',
      description: 'Get break-even results instantly as you adjust values',
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
      description: 'Based on standard break-even analysis formulas',
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      name: 'Free to Use',
      description: 'Completely free calculator with no hidden charges',
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      name: '2025 Updated',
      description: 'Latest business analysis tools for 2025',
      icon: <Clock className="h-5 w-5" />
    }
  ];

  const faqs = [
    {
      question: 'What is break-even analysis?',
      answer: 'Break-even analysis is a financial calculation that determines the point at which your business\'s total revenue equals its total costs. At this point, you neither make a profit nor incur a loss. It helps you understand how many units you need to sell to cover your costs.'
    },
    {
      question: 'What are fixed costs?',
      answer: 'Fixed costs are expenses that remain constant regardless of your production or sales volume. Examples include rent, salaries, insurance, and equipment depreciation. These costs must be paid even if you produce nothing.'
    },
    {
      question: 'What are variable costs?',
      answer: 'Variable costs change directly with your production or sales volume. Examples include raw materials, direct labor, packaging, and shipping costs. These costs increase as you produce more units.'
    },
    {
      question: 'What is contribution margin?',
      answer: 'Contribution margin is the amount of revenue remaining after deducting variable costs. It represents the amount available to cover fixed costs and contribute to profit. Higher contribution margins mean you need fewer sales to break even.'
    },
    {
      question: 'What is margin of safety?',
      answer: 'Margin of safety is the difference between your actual or expected sales and the break-even point. It shows how much sales can drop before you start losing money. A higher margin of safety indicates lower risk.'
    },
    {
      question: 'How can I use break-even analysis for business decisions?',
      answer: 'Break-even analysis helps you set pricing strategies, evaluate new products, plan production levels, and assess business viability. It\'s essential for budgeting, forecasting, and making informed business decisions.'
    },
    {
      question: 'What factors can affect my break-even point?',
      answer: 'Your break-even point can change due to fluctuations in fixed costs, variable costs, selling prices, market conditions, and competition. Regular analysis helps you adapt to changing business conditions.'
    },
    {
      question: 'How accurate is this break-even calculator?',
      answer: 'Our break-even calculator uses standard financial formulas and provides accurate projections. However, actual results may vary due to market conditions, cost fluctuations, and other business factors. Use this as a planning tool.'
    }
  ];

  const relatedCalculators = [
    {
      id: 'profit-margin-calculator',
      name: 'Profit Margin Calculator',
      description: 'Calculate profit margins and pricing',
      url: '/calculators/profit-margin-calculator'
    },
    {
      id: 'business-loan-calculator',
      name: 'Business Loan Calculator',
      description: 'Calculate business loan EMI',
      url: '/calculators/business-loan-calculator'
    },
    {
      id: 'inventory-turnover-calculator',
      name: 'Inventory Turnover Calculator',
      description: 'Calculate inventory turnover ratio',
      url: '/calculators/inventory-turnover-calculator'
    },
    {
      id: 'gst-calculator',
      name: 'GST Calculator',
      description: 'Calculate GST for business',
      url: '/calculators/gst-calculator'
    },
    {
      id: 'tds-calculator',
      name: 'TDS Calculator',
      description: 'Calculate TDS on business payments',
      url: '/calculators/tds-calculator'
    },
    {
      id: 'income-tax-calculator',
      name: 'Income Tax Calculator',
      description: 'Calculate business income tax',
      url: '/calculators/income-tax-calculator'
    }
  ];

  const tips = [
    'Regularly review your break-even analysis as costs and prices change',
    'Consider seasonal variations in your break-even calculations',
    'Include all relevant costs in your analysis for accurate results',
    'Use break-even analysis to evaluate new product launches',
    'Monitor your margin of safety to assess business risk',
    'Consider multiple scenarios in your break-even planning',
    'Factor in market competition when setting prices',
    'Keep detailed records of all costs for accurate calculations'
  ];

  const calculatorData = {
    formula: 'Break-even Units = Fixed Costs / (Selling Price - Variable Cost per Unit)',
    assumptions: [
      'Fixed costs remain constant over the analysis period',
      'Variable costs per unit remain constant',
      'Selling price remains constant',
      'All units produced are sold',
      'No changes in production efficiency'
    ],
    limitations: [
      'Actual costs and prices may fluctuate',
      'Market conditions may affect sales volume',
      'Production efficiency may vary',
      'Seasonal variations not considered',
      'Results are for planning purposes only'
    ],
    lastUpdated: 'January 2025'
  };

  return (
    <EnhancedCalculator
      id="break-even-calculator"
      name="Break Even Calculator"
      description="Calculate your break-even point with our free online break-even calculator. Determine how many units you need to sell to cover your costs and start making a profit."
      category="Business Calculators"
      seoTitle="Break Even Calculator 2025 - Calculate Break Even Point Online | Free Calculator India"
      seoDescription="Calculate your break-even point instantly with our free break-even calculator. Determine units needed to cover costs and start making profit. No registration required. Updated for 2025."
      focusKeyword="break even calculator"
      relatedKeywords={[
        'break even calculator',
        'break even analysis',
        'break even point calculator',
        'business break even calculator',
        'break even calculator India',
        'break even calculator online',
        'free break even calculator',
        'break even calculator 2025'
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