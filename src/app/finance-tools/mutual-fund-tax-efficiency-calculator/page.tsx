import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MutualFundTaxEfficiencyCalculatorClient';

export const metadata: Metadata = {
  title: 'Mutual Fund Tax Efficiency Calculator | MoneyCal India',
  description: "Explore Mutual Fund Tax Efficiency Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/mutual-fund-tax-efficiency-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
