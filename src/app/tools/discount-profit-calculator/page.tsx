import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DiscountProfitCalculatorClient';

export const metadata: Metadata = {
  title: 'Discount Profit Calculator | MoneyCal India',
  description: "Explore Discount Profit Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/discount-profit-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
