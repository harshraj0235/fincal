import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ExcelSalaryDataToPayslipPdfClient';

export const metadata: Metadata = {
  title: 'Excel Salary Data To Payslip Pdf | MoneyCal India',
  description: "Explore Excel Salary Data To Payslip Pdf on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/salary-slip/excel-salary-data-to-payslip-pdf'
  }
};

export default function Page() {
  return <ClientComponent />;
}
