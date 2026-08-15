import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PromoDesignerClient';

export const metadata: Metadata = {
  title: 'Promo Designer | MoneyCal India',
  description: "Explore Promo Designer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/promo-designer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
