import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EmailSignatureGeneratorClient';

export const metadata: Metadata = {
  title: 'Email Signature Generator | MoneyCal India',
  description: "Explore Email Signature Generator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/marketing/email-signature-generator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
