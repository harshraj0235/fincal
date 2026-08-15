import React from 'react';
import { Metadata } from 'next';
import ToolPlaceholderClient from '@/app/tools/tool-placeholder/ToolPlaceholderClient';

type Props = {
  params: { slug: string[] }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slugArray = params.slug || [];
  const lastSlug = slugArray[slugArray.length - 1] || 'Tool';
  const formattedTitle = lastSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    title: `${formattedTitle} | MoneyCal India`,
    description: `Use our free ${formattedTitle} online.  provided by MoneyCal for fast, accurate results.`,
    alternates: {
      canonical: `https://moneycal.in/gold-tools/${slugArray.join('/')}`
    }
  };
}

export default function DynamicHubToolPage({ params }: Props) {
  const slugArray = params.slug || [];
  const lastSlug = slugArray[slugArray.length - 1] || 'Tool';
  const formattedTitle = lastSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <>
      <ToolPlaceholderClient />
      {/* We pass the formattedTitle as a hidden SEO element or modify ToolPlaceholderClient later to accept it */}
      <h1 className="sr-only">{formattedTitle} - Gold Tool</h1>
    </>
  );
}
