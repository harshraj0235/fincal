import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { INDIAN_CITIES, SILVER_CITIES } from '@/data/market/marketData';
import { newsCategories } from '@/data/newsCategories';

// We import the clients lazily or directly.
import CityRateDetailClient from '../market/city-rate-detail/CityRateDetailClient';
import NewsCategoryPageClient from '../news/news-category-page/NewsCategoryPageClient';

export async function generateStaticParams() {
  const params: { slug: string }[] = [];

  // Add Gold routes
  INDIAN_CITIES.forEach(city => {
    params.push({ slug: city.slug });
  });

  // Add Silver routes
  SILVER_CITIES.forEach(city => {
    params.push({ slug: city.slug });
  });

  // Add News Categories
  newsCategories.forEach(cat => {
    params.push({ slug: cat.slug });
  });

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const goldCity = INDIAN_CITIES.find(c => c.slug === slug);
  if (goldCity) {
    return {
      title: `${goldCity.name} Gold Rate Today | 22K & 24K Price | MoneyCal`,
      description: goldCity.description,
      keywords: goldCity.keywords.join(', '),
      alternates: { canonical: `https://moneycal.in/${slug}` }
    };
  }

  const silverCity = SILVER_CITIES.find(c => c.slug === slug);
  if (silverCity) {
    return {
      title: `${silverCity.name} Silver Rate Today | 1KG Price | MoneyCal`,
      description: silverCity.description,
      keywords: silverCity.keywords.join(', '),
      alternates: { canonical: `https://moneycal.in/${slug}` }
    };
  }

  const newsCat = newsCategories.find(c => c.slug === slug);
  if (newsCat) {
    return {
      title: `${newsCat.name} News | MoneyCal India`,
      description: newsCat.description,
      alternates: { canonical: `https://moneycal.in/${slug}` }
    };
  }

  return { title: 'Not Found | MoneyCal' };
}

export default async function TopLevelDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const isGold = INDIAN_CITIES.some(c => c.slug === slug);
  const isSilver = SILVER_CITIES.some(c => c.slug === slug);
  const isNewsCat = newsCategories.some(c => c.slug === slug);

  if (!isGold && !isSilver && !isNewsCat) {
    notFound();
  }

  if (isNewsCat) {
    return <NewsCategoryPageClient />;
  }

  return <CityRateDetailClient />;
}
