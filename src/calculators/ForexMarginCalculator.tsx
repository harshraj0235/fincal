import React from 'react';
import { EnhancedCalculator } from '../components/EnhancedCalculator';
import { 
  Calculator, TrendingUp, DollarSign, Calendar, PieChart, 
  Shield, Users, Star, Clock, Smartphone, Monitor, Tablet,
  Info, AlertCircle, CheckCircle, ExternalLink, Target, Globe
} from 'lucide-react';

export const ForexMarginCalculator: React.FC = () => {
  const handleCalculate = (values: Record<string, number | string>) => {
    const positionSize = values.positionSize as number;
    const leverage = values.leverage as number;
    const stopLoss = values.stopLoss as number;
    const currencyPair = values.currencyPair as string;
    
    // Calculate margin requirements
    const requiredMargin = positionSize / leverage;
    const marginPercentage = (requiredMargin / positionSize) * 100;
    
    // Calculate potential loss
    const pipValue = positionSize * 0.0001; // Assuming standard pip value
    const potentialLoss = pipValue * stopLoss;
    
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
        label: 'Margin Percentage',
        value: marginPercentage,
        unit: '%',
        color: 'warning' as const,
        icon: <PieChart className="h-4 w-4" />,
        description: 'Margin as percentage of position'
      },
      {
        label: 'Potential Loss',
        value: potentialLoss,
        unit: ' ₹',
        color: 'error' as const,
        icon: <AlertCircle className="h-4 w-4" />,
        description: 'Potential loss at stop loss'
      },
      {
        label: 'Position Size',
        value: positionSize,
        unit: ' ₹',
        color: 'neutral' as const,
        icon: <DollarSign className="h-4 w-4" />,
        description: 'Total position value'
      },
      {
        label: 'Leverage',
        value: leverage,
        unit: ':1',
        color: 'neutral' as const,
        icon: <TrendingUp className="h-4 w-4" />,
        description: 'Leverage ratio'
      },
      {
        label: 'Stop Loss',
        value: stopLoss,
        unit: ' pips',
        color: 'neutral' as const,
        icon: <Target className="h-4 w-4" />,
        description: 'Stop loss in pips'
      }
    ];
  };

  const inputs = [
    {
      id: 'currencyPair',
      label: 'Currency Pair',
      type: 'select' as const,
      value: 'USDINR',
      options: [
        { value: 'USDINR', label: 'USD/INR' },
        { value: 'EURINR', label: 'EUR/INR' },
        { value: 'GBPINR', label: 'GBP/INR' },
        { value: 'JPYINR', label: 'JPY/INR' }
      ],
      description: 'Select the currency pair for trading',
      tooltip: 'Choose the forex pair you want to trade',
      required: true
    },
    {
      id: 'positionSize',
      label: 'Position Size',
      type: 'range' as const,
      value: 100000,
      min: 1000,
      max: 1000000,
      step: 1000,
      unit: ' ₹',
      description: 'Total value of your forex position',
      tooltip: 'The total value of the position you want to open',
      required: true
    },
    {
      id: 'leverage',
      label: 'Leverage',
      type: 'range' as const,
      value: 20,
      min: 1,
      max: 100,
      step: 1,
      unit: ':1',
      description: 'Leverage ratio provided by broker',
      tooltip: 'The leverage ratio offered by your forex broker',
      required: true
    },
    {
      id: 'stopLoss',
      label: 'Stop Loss',
      type: 'range' as const,
      value: 50,
      min: 10,
      max: 200,
      step: 1,
      unit: ' pips',
      description: 'Stop loss distance in pips',
      tooltip: 'The distance to your stop loss in pips',
      required: true
    }
  ];

  const features = [
    {
      name: 'Instant Calculation',
      description: 'Get forex margin requirements instantly as you adjust values',
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
      description: 'Based on standard forex trading formulas',
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      name: 'Free to Use',
      description: 'Completely free calculator with no hidden charges',
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      name: '2025 Updated',
      description: 'Latest forex trading tools for 2025',
      icon: <Clock className="h-5 w-5" />
    }
  ];

  const faqs = [
    {
      question: 'What is forex margin?',
      answer: 'Forex margin is the amount of money required to open and maintain a position in foreign exchange trading. It acts as a security deposit and allows traders to control larger positions with smaller capital through leverage.'
    },
    {
      question: 'How is forex margin calculated?',
      answer: 'Forex margin is calculated as: Position Size ÷ Leverage. For example, if you want to trade $100,000 with 20:1 leverage, you need $5,000 as margin. The margin percentage is (Required Margin ÷ Position Size) × 100.'
    },
    {
      question: 'What is leverage in forex trading?',
      answer: 'Leverage is the ratio of position size to required margin. Higher leverage means you can control larger positions with less capital, but it also increases risk. Common leverage ratios range from 1:1 to 100:1.'
    },
    {
      question: 'What are the different types of forex margins?',
      answer: 'Initial margin is required to open a position, while maintenance margin is the minimum amount needed to keep the position open. If your account falls below maintenance margin, you may face a margin call.'
    },
    {
      question: 'How does stop loss affect margin requirements?',
      answer: 'Stop loss doesn\'t directly affect margin requirements, but it helps calculate potential losses. A wider stop loss means higher potential loss, which should be considered when determining position size and risk management.'
    },
    {
      question: 'What factors affect forex margin requirements?',
      answer: 'Margin requirements vary based on currency pair volatility, broker policies, regulatory requirements, and market conditions. More volatile pairs typically require higher margins.'
    },
    {
      question: 'How accurate is this forex margin calculator?',
      answer: 'Our calculator uses standard formulas and provides accurate estimates. However, actual margin requirements may vary based on broker policies, market conditions, and regulatory changes. Always verify with your broker.'
    },
    {
      question: 'Can I use this calculator for all currency pairs?',
      answer: 'This calculator works for major currency pairs. For exotic pairs or specific broker requirements, you may need to adjust calculations based on your broker\'s specific margin requirements.'
    }
  ];

  const relatedCalculators = [
    {
      id: 'commodity-margin-calculator',
      name: 'Commodity Margin Calculator',
      description: 'Calculate commodity margin requirements',
      url: '/calculators/commodity-margin-calculator'
    },
    {
      id: 'stock-margin-calculator',
      name: 'Stock Margin Calculator',
      description: 'Calculate stock margin requirements',
      url: '/calculators/stock-margin-calculator'
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
    },
    {
      id: 'currency-converter',
      name: 'Currency Converter',
      description: 'Convert between currencies',
      url: '/calculators/currency-converter'
    },
    {
      id: 'pip-calculator',
      name: 'Pip Calculator',
      description: 'Calculate pip values',
      url: '/calculators/pip-calculator'
    }
  ];

  const tips = [
    'Always maintain adequate margin to avoid margin calls',
    'Use appropriate leverage based on your risk tolerance',
    'Set stop losses to limit potential losses',
    'Monitor your positions regularly for margin requirements',
    'Keep extra funds as buffer for margin requirements',
    'Consider market volatility when calculating margin needs',
    'Check with your broker for specific margin requirements',
    'Use proper risk management strategies'
  ];

  const calculatorData = {
    formula: 'Required Margin = Position Size ÷ Leverage\nMargin Percentage = (Required Margin ÷ Position Size) × 100\nPip Value = Position Size × 0.0001\nPotential Loss = Pip Value × Stop Loss Pips',
    assumptions: [
      'Standard pip value calculation',
      'Leverage ratios are approximate',
      'No additional fees or charges included',
      'Results are for planning purposes only',
      'Market conditions remain stable'
    ],
    limitations: [
      'Actual margin requirements may vary by broker',
      'Market conditions can affect margin percentages',
      'Regulatory changes may impact requirements',
      'Pip values may vary by currency pair',
      'Results are estimates only'
    ],
    lastUpdated: 'January 2025'
  };

  return (
    <EnhancedCalculator
      id="forex-margin-calculator"
      name="Forex Margin Calculator"
      description="Calculate forex margin requirements with our free online calculator. Determine margin needed for USD/INR, EUR/INR, GBP/INR, and JPY/INR trading."
      category="Trading Calculators"
      seoTitle="Forex Margin Calculator 2025 - Calculate Trading Margin Online | Free Calculator India"
      seoDescription="Calculate your forex margin requirements instantly with our free margin calculator. Determine margin for USD/INR, EUR/INR trading. No registration required. Updated for 2025."
      focusKeyword="forex margin calculator"
      relatedKeywords={[
        'forex margin calculator',
        'trading margin calculator',
        'currency margin calculator',
        'USD INR margin calculator',
        'EUR INR margin calculator',
        'forex margin calculator India',
        'forex margin calculator online',
        'free forex margin calculator',
        'forex margin calculator 2025'
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