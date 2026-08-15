import React from 'react';
import { Metadata } from 'next';
import DoubleTaxReliefTool from './DoubleTaxReliefTool';

export const metadata: Metadata = {
  title: 'Double Tax Relief Tool | MoneyCal India',
  description: 'Use our free Double Tax Relief Tool to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/double-tax-relief-tool'
  }
};

export default function Page() {
  return <DoubleTaxReliefTool />;
}
