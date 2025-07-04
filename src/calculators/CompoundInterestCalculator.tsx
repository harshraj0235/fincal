import React from 'react';
import { EnhancedCalculator } from '../components/EnhancedCalculator';
import { 
  Calculator, TrendingUp, DollarSign, Calendar, PieChart, 
  Shield, Users, Star, Clock, Smartphone, Monitor, Tablet,
  Info, AlertCircle, CheckCircle, ExternalLink, Target, Zap
} from 'lucide-react';

export const CompoundInterestCalculator: React.FC = () => {
  const handleCalculate = (values: Record<string, number | string>) => {
    const principal = values.principal as number;
    const rate = values.rate as number;
    const time = values.time as number;
    const compoundingFrequency = values.compoundingFrequency as number;
    
    // Convert rate from percentage to decimal
    const r = rate / 100;
    const n = compoundingFrequency;
    const t = time;
    
    // Compound Interest Formula: A = P (1 + r/n)^(nt)
    const futureValue = principal * Math.pow((1 + r / n), (n * t));
    const totalInterest = futureValue - principal;
    
    return [
      {
        label: 'Future Value',
        value: futureValue,
        unit: ' ₹',
        color: 'primary' as const,
        icon: <Target className="h-4 w-4" />,
        description: 'Total value of your investment'
      },
      {
        label: 'Total Interest Earned',
        value: totalInterest,
        unit: ' ₹',
        color: 'success' as const,
        icon: <TrendingUp className="h-4 w-4" />,
        description: 'Wealth created through compounding'
      },
      {
        label: 'Principal Amount',
        value: principal,
        unit: ' ₹',
        color: 'neutral' as const,
        icon: <DollarSign className="h-4 w-4" />,
        description: 'Your initial investment'
      },
      {
        label: 'Annual Interest Rate',
        value: rate,
        unit: '% p.a.',
        color: 'warning' as const,
        icon: <TrendingUp className="h-4 w-4" />,
        description: 'Rate of return on investment'
      },
      {
        label: 'Investment Period',
        value: `${time} years`,
        color: 'neutral' as const,
        icon: <Calendar className="h-4 w-4" />,
        description: 'Duration of investment'
      },
      {
        label: 'Compounding Frequency',
        value: `${compoundingFrequency} times/year`,
        color: 'neutral' as const,
        icon: <Zap className="h-4 w-4" />,
        description: 'How often interest compounds'
      }
    ];
  };

  const inputs = [
    {
      id: 'principal',
      label: 'Initial Investment (Principal)',
      type: 'range' as const,
      value: 10000,
      min: 1000,
      max: 1000000,
      step: 1000,
      unit: ' ₹',
      description: 'The starting amount you want to invest',
      tooltip: 'The initial amount of money you invest. This is the base amount that will grow through compound interest.',
      required: true
    },
    {
      id: 'rate',
      label: 'Annual Interest Rate',
      type: 'range' as const,
      value: 8,
      min: 1,
      max: 20,
      step: 0.1,
      unit: '% p.a.',
      description: 'Annual interest rate your investment will earn',
      tooltip: 'The percentage rate your investment will earn annually. Higher rates mean faster growth but may come with higher risk.',
      required: true
    },
    {
      id: 'time',
      label: 'Investment Period',
      type: 'range' as const,
      value: 10,
      min: 1,
      max: 30,
      step: 1,
      unit: ' years',
      description: 'Number of years you will keep your money invested',
      tooltip: 'The longer you invest, the more powerful compound interest becomes. Time is your greatest ally in wealth building.',
      required: true
    },
    {
      id: 'compoundingFrequency',
      label: 'Compounding Frequency',
      type: 'select' as const,
      value: 12,
      options: [
        { value: 1, label: 'Annually (1 time/year)' },
        { value: 2, label: 'Semi-Annually (2 times/year)' },
        { value: 4, label: 'Quarterly (4 times/year)' },
        { value: 12, label: 'Monthly (12 times/year)' },
        { value: 365, label: 'Daily (365 times/year)' }
      ],
      description: 'How often interest is added to your principal',
      tooltip: 'More frequent compounding means faster growth. Monthly compounding is common for most investments.',
      required: true
    }
  ];

  const features = [
    {
      name: 'Instant Calculation',
      description: 'Get compound interest results instantly as you adjust values',
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
      description: 'Based on standard compound interest formulas',
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
      question: 'What is compound interest and how does it work?',
      answer: 'Compound interest is "interest on interest" - it\'s the process where the interest you earn on your initial investment is reinvested, and then that reinvested interest also starts earning interest. This creates exponential growth over time, often called the "eighth wonder of the world" by Albert Einstein.'
    },
    {
      question: 'How is compound interest calculated?',
      answer: 'Compound interest is calculated using the formula: A = P(1 + r/n)^(nt), where A is the future value, P is the principal amount, r is the annual interest rate, n is the number of times interest is compounded per year, and t is the time in years.'
    },
    {
      question: 'What is the difference between simple and compound interest?',
      answer: 'Simple interest is calculated only on the principal amount, while compound interest is calculated on both the principal and the accumulated interest. Compound interest grows faster because you\'re earning interest on your interest, creating exponential growth.'
    },
    {
      question: 'How does compounding frequency affect my returns?',
      answer: 'The more frequently your interest compounds (e.g., daily vs. annually), the faster your money will grow. This is because interest is added and starts earning interest more often. However, the difference between monthly and daily compounding is usually minimal.'
    },
    {
      question: 'What is a realistic interest rate for compound interest?',
      answer: 'Interest rates depend on the type of investment. Savings accounts typically offer 3-6%, bonds 4-8%, and stock market investments historically average 7-10% annually. Higher rates usually come with higher risk, so consider your risk tolerance.'
    },
    {
      question: 'How long does it take to see the benefits of compound interest?',
      answer: 'Compound interest works best over long periods. While you\'ll see some growth in the first few years, the real power of compounding becomes apparent after 10-20 years. The longer you invest, the more dramatic the growth becomes.'
    },
    {
      question: 'Can compound interest work against me with loans?',
      answer: 'Yes, compound interest works both ways. With loans, you pay interest on interest, which can make debt grow quickly. This is why it\'s important to pay off high-interest debt as soon as possible, especially credit cards.'
    },
    {
      question: 'How accurate is this compound interest calculator?',
      answer: 'Our calculator uses standard mathematical formulas and provides accurate projections. However, actual returns may vary due to market fluctuations, fees, taxes, and other factors. Use this as a planning tool and consult with financial advisors for personalized advice.'
    }
  ];

  const relatedCalculators = [
    {
      id: 'sip-calculator',
      name: 'SIP Calculator',
      description: 'Calculate returns on systematic investments',
      url: '/calculators/sip-calculator'
    },
    {
      id: 'simple-interest-calculator',
      name: 'Simple Interest Calculator',
      description: 'Calculate simple interest on investments',
      url: '/calculators/simple-interest-calculator'
    },
    {
      id: 'future-value-calculator',
      name: 'Future Value Calculator',
      description: 'Calculate future value of investments',
      url: '/calculators/future-value-calculator'
    },
    {
      id: 'investment-returns-calculator',
      name: 'Investment Returns Calculator',
      description: 'Calculate returns on various investments',
      url: '/calculators/investment-returns-calculator'
    },
    {
      id: 'retirement-calculator',
      name: 'Retirement Calculator',
      description: 'Plan your retirement with compound interest',
      url: '/calculators/retirement-calculator'
    },
    {
      id: 'financial-goal-calculator',
      name: 'Financial Goal Calculator',
      description: 'Calculate investment needed for goals',
      url: '/calculators/financial-goal-calculator'
    }
  ];

  const tips = [
    'Start investing early - time is the most powerful factor in compound interest',
    'Reinvest your interest and dividends to maximize compounding',
    'Choose investments with competitive interest rates',
    'Be patient - compound interest works best over long periods',
    'Consider the impact of fees and taxes on your returns',
    'Diversify your investments to manage risk',
    'Increase your investment amount regularly to boost growth',
    'Don\'t withdraw your earnings - let them compound'
  ];

  const calculatorData = {
    formula: 'A = P(1 + r/n)^(nt)',
    assumptions: [
      'Interest rate remains constant throughout the investment period',
      'No fees, taxes, or inflation are considered',
      'Interest is reinvested immediately when earned',
      'No withdrawals are made during the investment period',
      'Compounding frequency remains consistent'
    ],
    limitations: [
      'Actual returns may vary due to market fluctuations',
      'Inflation impact on purchasing power is not considered',
      'Tax implications on returns are not included',
      'Investment fees and charges are not deducted',
      'Results are for planning purposes only'
    ],
    lastUpdated: 'January 2025'
  };

  return (
    <EnhancedCalculator
      id="compound-interest-calculator"
      name="Compound Interest Calculator"
      description="Calculate compound interest on your investments with our free online calculator. See how your money grows over time with the power of compounding."
      category="Investment Calculators"
      seoTitle="Compound Interest Calculator 2025 - Calculate Investment Growth Online | Free Calculator India"
      seoDescription="Calculate compound interest instantly with our free calculator. See how your investments grow over time with the power of compounding. Plan your wealth building strategy. No registration required. Updated for 2025."
      focusKeyword="compound interest calculator"
      relatedKeywords={[
        'compound interest calculator',
        'investment calculator',
        'interest calculator',
        'compound interest formula',
        'investment growth calculator',
        'compound interest calculator India',
        'compound interest calculator online',
        'free compound interest calculator'
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

export default CompoundInterestCalculator;
