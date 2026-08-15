import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ProductComparisonMatrixClient';

export const metadata: Metadata = {
  title: 'Product Comparison Matrix | MoneyCal India',
  description: "Explore Product Comparison Matrix on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/product-comparison-matrix'
  }
};

export default function Page() {
  return <ClientComponent />;
}
