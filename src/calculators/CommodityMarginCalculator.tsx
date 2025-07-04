import React from 'react';
import { EnhancedCalculator } from '../components/EnhancedCalculator';
import { 
  Calculator, TrendingUp, DollarSign, Calendar, PieChart, 
  Shield, Users, Star, Clock, Smartphone, Monitor, Tablet,
  Info, AlertCircle, CheckCircle, ExternalLink, Target, Zap
} from 'lucide-react';

export const CommodityMarginCalculator: React.FC = () => {
  const handleCalculate = (values: Record<string, number | string>) => {
    const selectedCommodity = values.selectedCommodity as string;
    const lots = values.lots as number;
    const price = values.price as number;
    const marginPercentage = values.marginPercentage as number;
    
    const commodities: Record<string, { lotSize: number }> = {
      gold: { lotSize: 10 },
      silver: { lotSize: 30 },
      crudeoil: { lotSize: 100 },
      copper: { lotSize: 2500 }
    };
    
    const commodity = commodities[selectedCommodity];
    const contractValue = price * commodity.lotSize * lots;
    const requiredMargin = contractValue * (marginPercentage / 100);
    const leverage = contractValue / requiredMargin;
    const exposureValue = contractValue;
    
    return [
      {
        label: 'Required Margin',
        value: requiredMargin,
        unit: ' ₹',
        color: 'primary' as const,
        icon: <Shield className="h-4 w-4" />,
        description: 'Margin amount required'
      },
      {
        label: 'Exposure Value',
        value: exposureValue,
        unit: ' ₹',
        color: 'success' as const,
        icon: <DollarSign className="h-4 w-4" />,
        description: 'Total contract value'
      },
      {
        label: 'Leverage',
        value: leverage,
        unit: 'x',
        color: 'warning' as const,
        icon: <TrendingUp className="h-4 w-4" />,
        description: 'Leverage ratio'
      },
      {
        label: 'Contract Value',
        value: contractValue,
        unit: ' ₹',
        color: 'neutral' as const,
        icon: <Calculator className="h-4 w-4" />,
        description: 'Total contract value'
      },
      {
        label: 'Lot Size',
        value: commodity.lotSize,
        unit: ' units',
        color: 'neutral' as const,
        icon: <Target className="h-4 w-4" />,
        description: 'Units per lot'
      },
      {
        label: 'Margin %',
        value: marginPercentage,
        unit: '%',
        color: 'neutral' as const,
        icon: <PieChart className="h-4 w-4" />,
        description: 'Margin percentage'
      }
    ];
  };

  const inputs = [
    {
      id: 'selectedCommodity',
      label: 'Select Commodity',
      type: 'select' as const,
      value: 'gold',
      options: [
        { value: 'gold', label: 'Gold' },
        { value: 'silver', label: 'Silver' },
        { value: 'crudeoil', label: 'Crude Oil' },
        { value: 'copper', label: 'Copper' }
      ],
      description: 'Choose the commodity for margin calculation',
      tooltip: 'Select the commodity you want to trade',
      required: true
    },
    {
      id: 'lots',
      label: 'Number of Lots',
      type: 'range' as const,
      value: 1,
      min: 1,
      max: 10,
      step: 1,
      unit: ' lots',
      description: 'Number of lots you want to trade',
      tooltip: 'A lot is the standard trading unit for commodities',
      required: true
    },
    {
      id: 'price',
      label: 'Price per Unit',
      type: 'range' as const,
      value: 60000,
      min: 1000,
      max: 100000,
      step: 100,
      unit: ' ₹',
      description: 'Current market price per unit',
      tooltip: 'The current market price of the commodity',
      required: true
    },
    {
      id: 'marginPercentage',
      label: 'Margin Percentage',
      type: 'range' as const,
      value: 5,
      min: 3,
      max: 15,
      step: 0.5,
      unit: '%',
      description: 'Margin percentage required by broker',
      tooltip: 'The percentage of contract value required as margin',
      required: true
    }
  ];

  const features = [
    {
      name: 'Instant Calculation',
      description: 'Get margin requirements instantly as you adjust values',
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
      description: 'Based on standard commodity trading formulas',
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      name: 'Free to Use',
      description: 'Completely free calculator with no hidden charges',
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      name: '2025 Updated',
      description: 'Latest commodity trading tools for 2025',
      icon: <Clock className="h-5 w-5" />
    }
  ];

  const faqs = [
    {
      question: 'What is commodity margin?',
      answer: 'Commodity margin is the amount of money required to open and maintain a position in commodity futures trading. It acts as a security deposit and represents a percentage of the total contract value.'
    },
    {
      question: 'How is commodity margin calculated?',
      answer: 'Commodity margin is calculated as: Contract Value × Margin Percentage. Contract value = Price per unit × Lot size × Number of lots. The margin percentage varies by commodity and broker.'
    },
    {
      question: 'What is leverage in commodity trading?',
      answer: 'Leverage is the ratio of total exposure to the margin required. Higher leverage means you can control larger positions with less capital, but it also increases risk. Leverage = Contract Value ÷ Required Margin.'
    },
    {
      question: 'What are the different types of commodity margins?',
      answer: 'Initial margin is required to open a position, while maintenance margin is the minimum amount needed to keep the position open. If your account falls below maintenance margin, you may face a margin call.'
    },
    {
      question: 'How does lot size affect margin requirements?',
      answer: 'Lot size determines the number of units in one contract. Larger lot sizes mean higher contract values and consequently higher margin requirements. Different commodities have different standard lot sizes.'
    },
    {
      question: 'What factors affect margin percentages?',
      answer: 'Margin percentages vary based on commodity volatility, market conditions, broker policies, and regulatory requirements. More volatile commodities typically require higher margins.'
    },
    {
      question: 'How accurate is this commodity margin calculator?',
      answer: 'Our calculator uses standard formulas and provides accurate estimates. However, actual margin requirements may vary based on broker policies, market conditions, and regulatory changes. Always verify with your broker.'
    },
    {
      question: 'Can I use this calculator for all commodities?',
      answer: 'This calculator covers major commodities like gold, silver, crude oil, and copper. For other commodities, you may need to adjust lot sizes and margin percentages according to exchange specifications.'
    }
  ];

  const relatedCalculators = [
    {
      id: 'forex-margin-calculator',
      name: 'Forex Margin Calculator',
      description: 'Calculate forex margin requirements',
      url: '/calculators/forex-margin-calculator'
    },
    {
      id: 'stock-margin-calculator',
      name: 'Stock Margin Calculator',
      description: 'Calculate stock margin requirements',
      url: '/calculators/stock-margin-calculator'
    },
    {
      id: 'futures-calculator',
      name: 'Futures Calculator',
      description: 'Calculate futures trading metrics',
      url: '/calculators/futures-calculator'
    },
    {
      id: 'options-calculator',
      name: 'Options Calculator',
      description: 'Calculate options trading metrics',
      url: '/calculators/options-calculator'
    },
    {
      id: 'profit-loss-calculator',
      name: 'Profit Loss Calculator',
      description: 'Calculate trading profit and loss',
      url: '/calculators/profit-loss-calculator'
    },
    {
      id: 'risk-calculator',
      name: 'Risk Calculator',
      description: 'Calculate trading risk metrics',
      url: '/calculators/risk-calculator'
    }
  ];

  const tips = [
    'Always maintain adequate margin to avoid margin calls',
    'Monitor your positions regularly for margin requirements',
    'Consider market volatility when calculating margin needs',
    'Keep extra funds as buffer for margin requirements',
    'Understand the difference between initial and maintenance margin',
    'Factor in potential price movements when planning positions',
    'Check with your broker for specific margin requirements',
    'Consider using stop-loss orders to manage risk'
  ];

  const calculatorData = {
    formula: 'Required Margin = Contract Value × Margin Percentage\nContract Value = Price × Lot Size × Number of Lots\nLeverage = Contract Value ÷ Required Margin',
    assumptions: [
      'Standard lot sizes for each commodity',
      'Margin percentages are approximate',
      'Prices are current market prices',
      'No additional fees or charges included',
      'Results are for planning purposes only'
    ],
    limitations: [
      'Actual margin requirements may vary by broker',
      'Market conditions can affect margin percentages',
      'Regulatory changes may impact requirements',
      'Lot sizes may vary by exchange',
      'Results are estimates only'
    ],
    lastUpdated: 'January 2025'
  };

  return (
    <EnhancedCalculator
      id="commodity-margin-calculator"
      name="Commodity Margin Calculator"
      description="Calculate commodity margin requirements with our free online calculator. Determine margin needed for gold, silver, crude oil, and copper trading."
      category="Trading Calculators"
      seoTitle="Commodity Margin Calculator 2025 - Calculate Trading Margin Online | Free Calculator India"
      seoDescription="Calculate your commodity margin requirements instantly with our free margin calculator. Determine margin for gold, silver, crude oil trading. No registration required. Updated for 2025."
      focusKeyword="commodity margin calculator"
      relatedKeywords={[
        'commodity margin calculator',
        'trading margin calculator',
        'futures margin calculator',
        'gold margin calculator',
        'silver margin calculator',
        'commodity margin calculator India',
        'commodity margin calculator online',
        'free commodity margin calculator',
        'commodity margin calculator 2025'
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