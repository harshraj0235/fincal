import React from 'react';
import { Metadata } from 'next';
import IntradayDeliveryTaxCalculator from './IntradayDeliveryTaxCalculator';

export const metadata: Metadata = {
  title: 'Intraday Delivery Tax Calculator | MoneyCal India',
  description: 'Use our free Intraday Delivery Tax Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/intraday-delivery-tax-calculator'
  }
};

export default function Page() {
  return <IntradayDeliveryTaxCalculator />;
}
