import React, { useEffect } from 'react';

export interface CalculatorSchemaProps {
  name: string;
  description: string;
  url: string;
  features: string[];
  category?: string;
  screenshot?: string;
  faqData?: Array<{ question: string; answer: string }>;
  howToSteps?: Array<{ step: string; details: string }>;
  lastUpdated?: string;
  rating?: {
    value: number;
    count: number;
  };
}

export const CalculatorSchema: React.FC<CalculatorSchemaProps> = ({
  name,
  description,
  url,
  features,
  category = "FinanceApplication",
  screenshot,
  faqData,
  howToSteps,
  lastUpdated = new Date().toISOString(),
  rating
}) => {
  useEffect(() => {
    // WebApplication Schema
    const webAppSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": name,
      "description": description,
      "url": url.startsWith('http') ? url : `https://moneycal.in${url}`,
      "applicationCategory": category,
      "operatingSystem": "Web Browser",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Indian Financial Users",
        "geographicArea": {
          "@type": "Country",
          "name": "India"
        }
      },
      "featureList": features,
      "publisher": {
        "@type": "Organization",
        "name": "MoneyCal India",
        "url": "https://moneycal.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://moneycal.in/android-chrome-512x512.png"
        }
      },
      "datePublished": "2024-01-01",
      "dateModified": lastUpdated,
      "softwareVersion": "2.0"
    };

    if (screenshot) {
      webAppSchema["screenshot"] = screenshot;
    }

    if (rating) {
      webAppSchema["aggregateRating"] = {
        "@type": "AggregateRating",
        "ratingValue": rating.value.toString(),
        "reviewCount": rating.count.toString(),
        "bestRating": "5",
        "worstRating": "1"
      };
    }

    // FAQ Schema
    const faqSchema = faqData && faqData.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    } : null;

    // HowTo Schema
    const howToSchema = howToSteps && howToSteps.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `How to Use ${name}`,
      "description": `Step-by-step guide on using ${name} for financial calculations`,
      "step": howToSteps.map((step, idx) => ({
        "@type": "HowToStep",
        "position": idx + 1,
        "name": step.step,
        "text": step.details,
        "url": `${url.startsWith('http') ? url : `https://moneycal.in${url}`}#step-${idx + 1}`
      })),
      "totalTime": "PT5M"
    } : null;

    // Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://moneycal.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Calculators",
          "item": "https://moneycal.in/calculators"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": name,
          "item": url.startsWith('http') ? url : `https://moneycal.in${url}`
        }
      ]
    };

    // Combine all schemas
    const allSchemas = [webAppSchema, breadcrumbSchema];
    if (faqSchema) allSchemas.push(faqSchema);
    if (howToSchema) allSchemas.push(howToSchema);

    // Create unique ID for this component's script tag
    const scriptId = `calculator-schema-${btoa(url).slice(0, 16)}`;
    
    // Remove existing script if present
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // Add new script
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(allSchemas);
    document.head.appendChild(script);

    // Cleanup
    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [name, description, url, features, category, screenshot, faqData, howToSteps, lastUpdated, rating]);

  return null; // This component doesn't render anything visible
};

export default CalculatorSchema;

