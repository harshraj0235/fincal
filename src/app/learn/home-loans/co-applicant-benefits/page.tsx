import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CoApplicantBenefitsClient';

export const metadata: Metadata = {
  title: 'Co Applicant Benefits | MoneyCal India',
  description: "Explore Co Applicant Benefits on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/home-loans/co-applicant-benefits'
  }
};

export default function Page() {
  return <ClientComponent />;
}
