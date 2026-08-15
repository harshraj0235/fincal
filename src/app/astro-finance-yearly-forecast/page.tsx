import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AstroFinanceYearlyForecastClient';

export const metadata: Metadata = {
  title: 'Astro Finance Yearly Forecast | MoneyCal India',
  description: "Explore Astro Finance Yearly Forecast on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/astro-finance-yearly-forecast'
  }
};

export default function Page() {
  return <ClientComponent />;
}
