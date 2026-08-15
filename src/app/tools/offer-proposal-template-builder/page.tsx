import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './OfferProposalTemplateBuilderClient';

export const metadata: Metadata = {
  title: 'Offer Proposal Template Builder | MoneyCal India',
  description: "Explore Offer Proposal Template Builder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/offer-proposal-template-builder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
