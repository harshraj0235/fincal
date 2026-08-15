import React from 'react';
import { Metadata } from 'next';
import IntradayVsDeliveryTaxCalculator from './IntradayVsDeliveryTaxCalculator';

export const metadata: Metadata = {
  title: 'Intraday Vs Delivery Tax Calculator | MoneyCal India',
  description: 'Use our free Intraday Vs Delivery Tax Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/intraday-vs-delivery-tax-calculator'
  }
};

export default function Page() {
  return <IntradayVsDeliveryTaxCalculator />;
}
