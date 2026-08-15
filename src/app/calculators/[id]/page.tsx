import React from 'react';
import { Metadata } from 'next';
import { getCalculatorById, calculatorCategories } from '@/data/calculatorData';
import ClientCalculatorDispatcher from './ClientCalculatorDispatcher';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const ids: { id: string }[] = [];
  calculatorCategories.forEach(cat => cat.calculators.forEach(calc => ids.push({ id: calc.id })));
  return ids;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const calculator = getCalculatorById(resolvedParams.id);
  
  if (!calculator) {
    return { title: 'Not Found' };
  }

  const title = calculator.hinglishTitle || `${calculator.name} India - Free Online Calculator`;
  const description = calculator.description;
  const keywords = calculator.keywords?.join(', ');

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://moneycal.in/calculators/${resolvedParams.id}`
    },
    openGraph: {
      title,
      description,
      url: `https://moneycal.in/calculators/${resolvedParams.id}`,
      siteName: 'MoneyCal India',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const calculator = getCalculatorById(resolvedParams.id);
  
  if (!calculator) {
    notFound();
  }

  // 1. SoftwareApplication Schema (For "Tool" E-E-A-T)
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": calculator.name,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "description": calculator.description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  // 2. FAQPage Schema (For Rich Snippets)
  let faqSchema = null;
  if (calculator.faqs && calculator.faqs.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": calculator.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  // 3. HowTo Schema (If steps exist)
  let howToSchema = null;
  if (calculator.howToSteps && calculator.howToSteps.length > 0) {
    howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `How to use the ${calculator.name}`,
      "description": calculator.introduction || calculator.description,
      "step": calculator.howToSteps.map((step, index) => ({
        "@type": "HowToStep",
        "url": `https://moneycal.in/calculators/${resolvedParams.id}#step${index + 1}`,
        "name": step.step,
        "text": step.description
      }))
    };
  }

  return (
    <>
      {/* Inject JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {howToSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />}
      
      {/* Client Component mounting the actual React tool */}
      <ClientCalculatorDispatcher calculatorId={resolvedParams.id} />
    </>
  );
}
