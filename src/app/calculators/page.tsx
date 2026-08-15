import React from 'react';
import { Metadata } from 'next';
import CalculatorsHubClient from './CalculatorsHubClient';

export const metadata: Metadata = {
  title: 'Free Financial Calculators India 2026 | EMI, SIP, Tax, PPF, NPS & 200+ Tools | MoneyCal',
  description: 'Use India\'s most trusted free SIP calculator, EMI calculator, Income Tax calculator, PPF, NPS, FD, Home Loan, GST and 200+ other financial calculators. Instant results, bank-grade accuracy, no signup required.',
  keywords: 'financial calculator, emi calculator, sip calculator, income tax calculator, ppf calculator, nps calculator, fd calculator, gst calculator, home loan calculator, mutual fund calculator, india',
  alternates: {
    canonical: 'https://moneycal.in/calculators'
  },
  openGraph: {
    title: 'Free Financial Calculators India 2026 | MoneyCal',
    description: '200+ free financial calculators for EMI, SIP, Tax, PPF, NPS, FD and more. India\'s #1 trusted financial tools platform.',
    url: 'https://moneycal.in/calculators',
    siteName: 'MoneyCal India',
  }
};

export default function CalculatorsHubPage() {
  return <CalculatorsHubClient />;
}

