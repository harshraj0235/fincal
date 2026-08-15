import React from 'react';
import { Metadata } from 'next';
import ClientPaymentBehaviorScoreTool from './ClientPaymentBehaviorScoreTool';

export const metadata: Metadata = {
  title: 'Client Payment Behavior Score Tool | MoneyCal India',
  description: 'Use our free Client Payment Behavior Score Tool to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/client-payment-behavior-score-tool'
  }
};

export default function Page() {
  return <ClientPaymentBehaviorScoreTool />;
}
