import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CalculatorCategoriesClient';

export const metadata: Metadata = {
  title: 'Calculator Categories | MoneyCal India',
  description: "Explore Calculator Categories on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/calculator-categories'
  }
};

export default function Page() {
  return <ClientComponent />;
}
