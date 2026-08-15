import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SettingFinancialGoalsClient';

export const metadata: Metadata = {
  title: 'Setting Financial Goals | MoneyCal India',
  description: "Explore Setting Financial Goals on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/money-management/setting-financial-goals'
  }
};

export default function Page() {
  return <ClientComponent />;
}
