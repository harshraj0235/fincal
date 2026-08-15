import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './HRAvsLTATaxComparisonToolClient';

export const metadata: Metadata = {
  title: 'HRAvs LTATax Comparison Tool | MoneyCal India',
  description: "Explore HRAvs LTATax Comparison Tool on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/hravs-ltatax-comparison-tool'
  }
};

export default function Page() {
  return <ClientComponent />;
}
