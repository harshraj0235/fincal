import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SalarySlipBatchToYearlyReportClient';

export const metadata: Metadata = {
  title: 'Salary Slip Batch To Yearly Report | MoneyCal India',
  description: "Explore Salary Slip Batch To Yearly Report on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/salary-slip/salary-slip-batch-to-yearly-report'
  }
};

export default function Page() {
  return <ClientComponent />;
}
