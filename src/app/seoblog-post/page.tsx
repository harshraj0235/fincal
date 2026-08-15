import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SEOBlogPostClient';

export const metadata: Metadata = {
  title: 'SEOBlog Post | MoneyCal India',
  description: "Explore SEOBlog Post on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/seoblog-post'
  }
};

export default function Page() {
  return <ClientComponent />;
}
