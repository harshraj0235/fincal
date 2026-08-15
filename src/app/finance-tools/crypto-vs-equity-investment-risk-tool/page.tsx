import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CryptoVsEquityInvestmentRiskToolClient';

export const metadata: Metadata = {
  title: 'Crypto Vs Equity Investment Risk Tool | MoneyCal India',
  description: "Explore Crypto Vs Equity Investment Risk Tool on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/crypto-vs-equity-investment-risk-tool'
  }
};

export default function Page() {
  return <ClientComponent />;
}
