import React from 'react';
import SEOHelmet from './SEOHelmet';

interface AdvancedSEOProps {
  pageType: 'home' | 'calculator' | 'blog' | 'category' | 'hub';
  title: string;
  description: string;
  url: string;
  image?: string;
  keywords?: string;
  structuredData?: object;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqData?: Array<{ question: string; answer: string }>;
  calculatorData?: {
    name: string;
    category: string;
    features: string[];
    faqData?: Array<{ question: string; answer: string }>;
  };
  blogData?: {
    author: string;
    publishedTime: string;
    modifiedTime: string;
    category: string;
    tags: string[];
  };
  categoryData?: {
    name: string;
    description: string;
    calculatorCount: number;
  };
  marketData?: {
    nifty50: number;
    sensex: number;
    goldPrice: number;
    dollarRate: number;
  };
}

const AdvancedSEO: React.FC<AdvancedSEOProps> = ({
  pageType,
  title,
  description,
  url,
  image,
  keywords,
  structuredData,
  breadcrumbs,
  faqData,
  calculatorData,
  blogData,
  categoryData,
  marketData
}) => {
  // Enhanced meta description with current market data for homepage
  let finalDescription = description;
  if (marketData && pageType === 'home') {
    finalDescription = `${description} Live Nifty 50: ${marketData.nifty50.toLocaleString()}, Sensex: ${marketData.sensex.toLocaleString()}, Gold: ₹${marketData.goldPrice.toLocaleString()}/10g, USD/INR: ₹${marketData.dollarRate}.`;
  }

  return (
    <SEOHelmet
      title={title}
      description={finalDescription}
      keywords={keywords}
      image={image}
      url={url}
      type={pageType === 'blog' ? 'article' : 'website'}
      structuredData={structuredData}
      breadcrumbs={breadcrumbs}
      faqData={faqData}
      calculatorData={calculatorData ? {
        name: calculatorData.name,
        description: description, // Use original desc for app schema
        category: calculatorData.category,
        features: calculatorData.features
      } : undefined}
      articlePublishedTime={blogData?.publishedTime}
      articleModifiedTime={blogData?.modifiedTime}
      author={blogData?.author}
      section={blogData?.category}
      tags={blogData?.tags}
    />
  );
};

export default AdvancedSEO;
