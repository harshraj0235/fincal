import React from 'react';
import { Metadata } from 'next';
import GoldToolPageClient from './GoldToolPageClient';
import { goldTools } from '@/data/goldTools';

export function generateStaticParams() {
  return goldTools.map((tool) => ({
    slug: tool.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = goldTools.find(t => t.slug === params.slug);
  if (!tool) return { title: 'Tool Not Found' };
  
  return {
    title: `${tool.seo?.title || tool.name} | Gold Tools | MoneyCal.in`,
    description: tool.seo?.description || tool.description,
    alternates: {
      canonical: `https://moneycal.in/gold/${tool.slug}`,
    }
  };
}

export default function Page() {
  return <GoldToolPageClient />;
}
