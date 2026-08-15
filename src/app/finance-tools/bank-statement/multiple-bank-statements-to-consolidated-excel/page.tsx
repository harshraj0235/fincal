import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MultipleBankStatementsToConsolidatedExcelClient';

export const metadata: Metadata = {
  title: 'Multiple Bank Statements To Consolidated Excel | MoneyCal India',
  description: "Explore Multiple Bank Statements To Consolidated Excel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/bank-statement/multiple-bank-statements-to-consolidated-excel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
