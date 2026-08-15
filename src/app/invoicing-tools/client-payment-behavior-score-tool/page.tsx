import React from 'react';
import { Metadata } from 'next';
import ClientPaymentBehaviorScoreTool from './ClientPaymentBehaviorScoreToolClient';

export const metadata: Metadata = {
  title: 'ClientPaymentBehaviorScoreTool | MoneyCal India',
  description: 'Free online ClientPaymentBehaviorScoreTool tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/client-payment-behavior-score-tool',
  }
};

export default function Page() {
  return <ClientPaymentBehaviorScoreTool />;
}
