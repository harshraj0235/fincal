import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './Form16ToolsSuiteClient';

export const metadata: Metadata = {
  title: 'Form16Tools Suite | MoneyCal India',
  description: "Explore Form16Tools Suite on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/form16/form16tools-suite'
  }
};

export default function Page() {
  return <ClientComponent />;
}
