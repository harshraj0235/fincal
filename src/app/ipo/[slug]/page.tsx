import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import IpoDetailClient from '../ipo-detail/IpoDetailClient';

import { allIpoData } from '@/services/ipoApi';

export async function generateStaticParams() {
  return allIpoData.map((ipo) => ({
    slug: ipo.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const ipo = allIpoData.find(i => i.slug === resolvedParams.slug);
  
  if (!ipo) {
    return { title: 'IPO Not Found | MoneyCal' };
  }

  const title = `${ipo.name} IPO Details | MoneyCal`;
  const description = ipo.aboutCompany?.[0]?.substring(0, 160) || `Read details about the ${ipo.name} IPO.`;
  const url = `https://moneycal.in/ipo/${ipo.slug}/`;
  const imageUrl = ipo.featuredImage || 'https://moneycal.in/images/og-default.jpg';

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
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    }
  };
}

export default async function IpoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const ipo = allIpoData.find(i => i.slug === resolvedParams.slug);
  
  if (!ipo) {
    notFound();
  }

  return <IpoDetailClient />;
}
