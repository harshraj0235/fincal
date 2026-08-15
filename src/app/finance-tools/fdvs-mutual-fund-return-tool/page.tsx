import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FDVsMutualFundReturnToolClient';

export const metadata: Metadata = {
  title: 'FDVs Mutual Fund Return Tool | MoneyCal India',
  description: "Explore FDVs Mutual Fund Return Tool on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/fdvs-mutual-fund-return-tool'
  }
};

export default function Page() {
  return <ClientComponent />;
}
