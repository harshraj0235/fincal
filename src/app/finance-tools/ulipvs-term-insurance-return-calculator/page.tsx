import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ULIPVsTermInsuranceReturnCalculatorClient';

export const metadata: Metadata = {
  title: 'ULIPVs Term Insurance Return Calculator | MoneyCal India',
  description: "Explore ULIPVs Term Insurance Return Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/ulipvs-term-insurance-return-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
