/**
 * SEOHelmet stub — Next.js handles SEO via export const metadata in page.tsx.
 * This component is a no-op to prevent build crashes from legacy imports.
 */
import React from 'react';

interface SEOHelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  [key: string]: any;
}

const SEOHelmet: React.FC<SEOHelmetProps> = () => null;

export default SEOHelmet;
