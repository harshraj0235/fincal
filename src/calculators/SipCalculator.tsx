import React from 'react';
import { EnhancedCalculator } from '../components/EnhancedCalculator';
import { 
  Calculator, TrendingUp, DollarSign, Calendar, PieChart, 
  Shield, Users, Star, Clock, Smartphone, Monitor, Tablet,
  Info, AlertCircle, CheckCircle, ExternalLink, Target
} from 'lucide-react';
import { calculateSIPReturns } from '../utils/calculatorUtils';

export const SipCalculator: React.FC = () => {
  const handleCalculate = (values: Record<string, number | string>) => {
    const monthlyInvestment = values.monthlyInvestment as number;
    const expectedReturn = values.expectedReturn as number;
    const timePeriod = values.timePeriod as number;
    
    const result = calculateSIPReturns(monthlyInvestment, expectedReturn, timePeriod);
    
    return [
      {
        label: 'Invested Amount',
        value: result.investedAmount,
        unit: ' ₹',
        color: 'neutral' as const,
        icon: <DollarSign className="h-4 w-4" />,
        description: 'Total amount you will invest'
      },
      {
        label: 'Estimated Returns',
        value: result.estimatedReturns,
        unit: ' ₹',
        color: 'success' as const,
        icon: <TrendingUp className="h-4 w-4" />,
        description: 'Wealth gained through compounding'
      },
      {
        label: 'Total Value',
        value: result.totalValue,
        unit: ' ₹',
        color: 'primary' as const,
        icon: <Target className="h-4 w-4" />,
        description: 'Final corpus after investment period'
      },
      {
        label: 'Monthly Investment',
        value: monthlyInvestment,
        unit: ' ₹',
        color: 'neutral' as const,
        icon: <Calculator className="h-4 w-4" />,
        description: 'Amount invested every month'
      },
      {
        label: 'Expected Return',
        value: expectedReturn,
        unit: '% p.a.',
        color: 'warning' as const,
        icon: <TrendingUp className="h-4 w-4" />,
        description: 'Annual expected return rate'
      },
      {
        label: 'Investment Period',
        value: `${timePeriod} years`,
        color: 'neutral' as const,
        icon: <Calendar className="h-4 w-4" />,
        description: 'Total investment duration'
      }
    ];
  };

  const inputs = [
    {
      id: 'monthlyInvestment',
      label: 'Monthly Investment',
      type: 'range' as const,
      value: 5000,
      min: 500,
      max: 100000,
      step: 500,
      unit: ' ₹',
      description: 'Amount you will invest every month',
      tooltip: 'The fixed amount you plan to invest in SIP every month. Start with what you can afford and increase gradually.',
      required: true
    },
    {
      id: 'expectedReturn',
      label: 'Expected Annual Return',
      type: 'range' as const,
      value: 12,
      min: 1,
      max: 30,
      step: 0.1,
      unit: '% p.a.',
      description: 'Expected annual return on your investment',
      tooltip: 'The annual return rate you expect from your investment. Historical equity returns have been around 12-15% p.a.',
      required: true
    },
    {
      id: 'timePeriod',
      label: 'Investment Period',
      type: 'range' as const,
      value: 10,
      min: 1,
      max: 30,
      step: 1,
      unit: ' years',
      description: 'Duration for which you will invest',
      tooltip: 'The number of years you plan to continue your SIP. Longer periods benefit more from compounding.',
      required: true
    }
  ];

  const features = [
    {
      name: 'Instant Calculation',
      description: 'Get SIP results instantly as you adjust values',
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
      description: 'Based on standard SIP calculation formulas',
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      name: 'Free to Use',
      description: 'Completely free calculator with no hidden charges',
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      name: '2025 Updated',
      description: 'Latest rates and calculations for 2025',
      icon: <Clock className="h-5 w-5" />
    }
  ];

  const faqs = [
    {
      question: 'What is SIP and how does it work?',
      answer: 'SIP (Systematic Investment Plan) is a method of investing a fixed amount regularly in mutual funds. It allows you to invest small amounts periodically, benefiting from rupee cost averaging and the power of compounding. You can start with as little as ₹500 per month.'
    },
    {
      question: 'How is SIP return calculated?',
      answer: 'SIP returns are calculated using the compound interest formula. The calculator considers your monthly investment, expected annual return rate, and investment period to compute the total corpus. The formula accounts for the fact that each monthly investment has a different time period for compounding.'
    },
    {
      question: 'What is the difference between SIP and lump sum investment?',
      answer: 'In SIP, you invest a fixed amount regularly (monthly), while in lump sum, you invest the entire amount at once. SIP helps in rupee cost averaging, reducing the impact of market volatility, and is more suitable for regular income earners.'
    },
    {
      question: 'What is a realistic expected return for SIP investments?',
      answer: 'Historical data shows that equity mutual funds have delivered 12-15% annual returns over long periods. However, returns can vary based on market conditions, fund performance, and economic factors. Conservative estimates suggest 8-12% for balanced funds and 12-15% for equity funds.'
    },
    {
      question: 'Can I stop or modify my SIP anytime?',
      answer: 'Yes, SIPs are flexible. You can pause, stop, increase, or decrease your monthly investment amount anytime. However, consistency is key to achieving your financial goals. Consider the long-term benefits before making frequent changes.'
    },
    {
      question: 'How does compounding work in SIP?',
      answer: 'Compounding in SIP means your returns earn returns over time. Each monthly investment compounds for a different period - the first investment compounds for the entire period, while the last investment compounds for just one month. This creates a snowball effect on your wealth.'
    },
    {
      question: 'What are the tax implications of SIP investments?',
      answer: 'SIP investments in equity funds are subject to capital gains tax. Short-term gains (less than 1 year) are taxed at 15%, while long-term gains (more than 1 year) are taxed at 10% above ₹1 lakh. For debt funds, gains are added to your income and taxed as per your slab.'
    },
    {
      question: 'How accurate is this SIP calculator?',
      answer: 'Our SIP calculator uses standard mathematical formulas and provides accurate projections. However, actual returns may vary due to market fluctuations, fund performance, and economic conditions. Use this as a planning tool and review your investments regularly.'
    }
  ];

  const relatedCalculators = [
    {
      id: 'lump-sum-calculator',
      name: 'Lump Sum Calculator',
      description: 'Calculate returns on one-time investments',
      url: '/calculators/lump-sum-calculator'
    },
    {
      id: 'step-up-sip-calculator',
      name: 'Step Up SIP Calculator',
      description: 'Calculate returns with increasing monthly investments',
      url: '/calculators/step-up-sip-calculator'
    },
    {
      id: 'mutual-fund-returns-calculator',
      name: 'Mutual Fund Returns Calculator',
      description: 'Calculate returns on existing mutual fund investments',
      url: '/calculators/mutual-fund-returns-calculator'
    },
    {
      id: 'financial-goal-calculator',
      name: 'Financial Goal Calculator',
      description: 'Calculate SIP needed to achieve your financial goals',
      url: '/calculators/financial-goal-calculator'
    },
    {
      id: 'inflation-adjusted-sip-calculator',
      name: 'Inflation Adjusted SIP Calculator',
      description: 'Calculate real returns after adjusting for inflation',
      url: '/calculators/inflation-adjusted-sip-calculator'
    },
    {
      id: 'mutual-fund-cost-calculator',
      name: 'Mutual Fund Cost Calculator',
      description: 'Calculate total costs and charges in mutual funds',
      url: '/calculators/mutual-fund-cost-calculator'
    }
  ];

  const tips = [
    'Start your SIP early to benefit from the power of compounding',
    'Choose a monthly investment amount you can sustain for the long term',
    'Don\'t stop SIP during market downturns - it\'s the best time to buy more units',
    'Review and increase your SIP amount annually with salary hikes',
    'Diversify across different fund categories for better risk management',
    'Consider your risk appetite and investment horizon while choosing funds',
    'Use SIP for long-term goals like retirement, children\'s education, or buying a house',
    'Don\'t panic during market volatility - SIP works best over 5-10 years'
  ];

  const calculatorData = {
    formula: 'FV = P × (((1 + r)^n - 1) / r) × (1 + r)',
    assumptions: [
      'Monthly investments are made on the same date every month',
      'Expected return rate remains constant throughout the investment period',
      'No exit loads or transaction charges are considered',
      'Returns are compounded monthly',
      'No tax implications are included in calculations'
    ],
    limitations: [
      'Actual returns may vary due to market fluctuations and fund performance',
      'Inflation impact on purchasing power is not considered',
      'Tax implications on returns are not included',
      'Fund management fees and expense ratios are not deducted',
      'Results are for planning purposes only'
    ],
    lastUpdated: 'January 2025'
  };

  return (
    <EnhancedCalculator
      id="sip-calculator"
      name="SIP Calculator"
      description="Calculate your Systematic Investment Plan (SIP) returns with our free online SIP calculator. Plan your mutual fund investments and see the power of compounding."
      category="Investment Calculators"
      seoTitle="SIP Calculator 2025 - Calculate SIP Returns Online | Free SIP Calculator India"
      seoDescription="Calculate your SIP returns instantly with our free SIP calculator. Plan your mutual fund investments, see the power of compounding, and achieve your financial goals. No registration required. Updated for 2025."
      focusKeyword="SIP calculator"
      relatedKeywords={[
        'SIP calculator',
        'mutual fund SIP calculator',
        'SIP return calculator',
        'SIP investment calculator',
        'SIP calculator India',
        'SIP calculator online',
        'free SIP calculator',
        'SIP calculator 2025'
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