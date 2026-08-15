import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CategoryCalculatorsClient';

export const metadata: Metadata = {
  title: 'Category Calculators | MoneyCal India',
  description: "Explore Category Calculators on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/category-calculators'
  }
};

export default function Page() {
  return <ClientComponent />;
}
