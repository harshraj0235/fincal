import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BankStatementUPIPdfToCategoryExcelClient';

export const metadata: Metadata = {
  title: 'Bank Statement UPIPdf To Category Excel | MoneyCal India',
  description: "Explore Bank Statement UPIPdf To Category Excel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/bank-statement/bank-statement-upipdf-to-category-excel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
