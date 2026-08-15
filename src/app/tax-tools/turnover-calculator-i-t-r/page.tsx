import React from 'react';
import { Metadata } from 'next';
import TurnoverCalculatorITR from './TurnoverCalculatorITR';

export const metadata: Metadata = {
  title: 'Turnover Calculator I T R | MoneyCal India',
  description: 'Use our free Turnover Calculator I T R to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/turnover-calculator-i-t-r'
  }
};

export default function Page() {
  return <TurnoverCalculatorITR />;
}
