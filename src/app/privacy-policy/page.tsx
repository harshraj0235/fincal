import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PrivacyPolicyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy | MoneyCal India',
  description: "Explore Privacy Policy on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/privacy-policy'
  }
};

export default function Page() {
  return <ClientComponent />;
}
