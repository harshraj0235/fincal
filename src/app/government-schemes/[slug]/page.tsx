import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GovernmentSchemePostClient from '../../government-scheme-post/GovernmentSchemePostClient';

import { governmentSchemes } from '@/data/governmentSchemesData';

export async function generateStaticParams() {
  return governmentSchemes.map((scheme: any) => ({
    slug: scheme.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const scheme = governmentSchemes.find((s: any) => s.slug === resolvedParams.slug);
  
  if (!scheme) {
    return { title: 'Scheme Not Found | MoneyCal' };
  }

  const title = `${scheme.title} | Government Schemes | MoneyCal`;
  const description = (scheme.excerpt || scheme.title || '').substring(0, 160);
  const url = `https://moneycal.in/government-schemes/${scheme.slug}/`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'MoneyCal India',
      locale: 'en_IN',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}

export default async function GovernmentSchemePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const scheme = governmentSchemes.find((s: any) => s.slug === resolvedParams.slug);
  
  if (!scheme) {
    notFound();
  }

  return <GovernmentSchemePostClient />;
}
