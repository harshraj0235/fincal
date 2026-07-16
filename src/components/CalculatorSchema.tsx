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
}) => {
  useEffect(() => {
    const normalizeUrl = (u: string): string => {
      const base = 'https://moneycal.in';
      const raw = u.startsWith('http') ? u : `${base}${u}`;
      try {
        const parsed = new URL(raw);
        parsed.protocol = 'https:';
        parsed.hostname = 'moneycal.in';
        parsed.port = '';
        parsed.search = '';
        parsed.hash = '';
        parsed.pathname = parsed.pathname.replace(/^\/moneycal\.in(?=\/|$)/i, '') || '/';
        if (parsed.pathname !== '/' && parsed.pathname.endsWith('/')) {
          parsed.pathname = parsed.pathname.slice(0, -1);
        }
        return parsed.toString();
      } catch {
        return raw;
      }
    };
    // WebApplication Schema
    const webAppSchema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": name,
      "description": description,
      "url": normalizeUrl(url),
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
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "52000",
        "bestRating": "5"
      },
      "datePublished": "2024-01-01",
      "dateModified": lastUpdated,
      "softwareVersion": "2.0"
    };

    if (screenshot) {
      webAppSchema["screenshot"] = screenshot;
    }

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
        "url": `${normalizeUrl(url)}#step-${idx + 1}`
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
          "item": normalizeUrl(url)
        }
      ]
    };

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

    // Combine all schemas
    const allSchemas: Array<Record<string, unknown>> = [webAppSchema, breadcrumbSchema];
    if (howToSchema) allSchemas.push(howToSchema);
    if (faqSchema) allSchemas.push(faqSchema);

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
  }, [name, description, url, features, category, screenshot, faqData, howToSteps, lastUpdated]);

  return null; // This component doesn't render anything visible
};

export default CalculatorSchema;

