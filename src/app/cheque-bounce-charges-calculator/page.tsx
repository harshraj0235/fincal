import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ChequeBounceChargesCalculatorClient';

export const metadata: Metadata = {
  title: 'Cheque Bounce Charges Calculator | MoneyCal India',
  description: "Explore Cheque Bounce Charges Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/cheque-bounce-charges-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
