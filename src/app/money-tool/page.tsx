import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MoneyToolClient';

export const metadata: Metadata = {
  title: 'Money Tool | MoneyCal India',
  description: "Explore Money Tool on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/money-tool'
  }
};

export default function Page() {
  return <ClientComponent />;
}
