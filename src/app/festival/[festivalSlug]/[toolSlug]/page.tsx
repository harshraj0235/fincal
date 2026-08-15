import React from 'react';
import { Metadata } from 'next';
import FestivalToolPageClient from './FestivalToolPageClient';
import { festivalList } from '@/data/festivalTools';

export function generateStaticParams() {
  const params: { festivalSlug: string, toolSlug: string }[] = [];
  
  festivalList.forEach(fest => {
    fest.tools.forEach(tool => {
      params.push({
        festivalSlug: fest.slug,
        toolSlug: tool.slug
      });
    });
  });
  
  return params;
}

export function generateMetadata({ params }: { params: { festivalSlug: string, toolSlug: string } }): Metadata {
  const fest = festivalList.find(f => f.slug === params.festivalSlug);
  const tool = fest?.tools.find(t => t.slug === params.toolSlug);
  
  if (!tool) return { title: 'Tool Not Found' };
  
  return {
    title: `${tool.name} | ${fest?.name} Tools | MoneyCal.in`,
    description: tool.description,
    alternates: {
      canonical: `https://moneycal.in/festival/${params.festivalSlug}/${params.toolSlug}`,
    }
  };
}

export default function Page() {
  return <FestivalToolPageClient />;
}
