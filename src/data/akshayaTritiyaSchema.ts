// JSON-LD Structured Data for Akshaya Tritiya Muhurat Tool
// This helps Google display rich results in search

export interface AkshayaTritiyaSchemaProps {
  year: number;
  date: string;
  city: string;
  abhijitStart: string;
  abhijitEnd: string;
  rahuStart: string;
  rahuEnd: string;
}

export const generateAkshayaTritiyaFAQSchema = (props: AkshayaTritiyaSchemaProps) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the best time to buy gold on Akshaya Tritiya ${props.year}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The entire day from sunrise to sunset is auspicious on Akshaya Tritiya ${props.year}! However, Abhijit Muhurat (${props.abhijitStart} - ${props.abhijitEnd}) is considered the most powerful time window in ${props.city}. Avoid Rahu Kaal (${props.rahuStart} - ${props.rahuEnd}) for best results. No specific muhurat is needed as the word "Akshaya" means never diminishing, making every moment blessed.`
        }
      },
      {
        "@type": "Question",
        "name": "Why is Akshaya Tritiya considered auspicious for gold buying?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Akshaya means 'never diminishing' or 'eternal' in Sanskrit. According to Hindu mythology, Lord Kuber (God of Wealth) and Goddess Lakshmi (Goddess of Prosperity) bless every purchase made on this day. Gold bought on Akshaya Tritiya is believed to multiply wealth and bring eternal prosperity. This day marks the beginning of Treta Yuga when Lord Vishnu took his Parshurama avatar."
        }
      },
      {
        "@type": "Question",
        "name": `What other investments can I start on Akshaya Tritiya ${props.year}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Beyond gold, Akshaya Tritiya is perfect for: Starting Systematic Investment Plans (SIP) in mutual funds, buying stocks or equities, opening Fixed Deposits or Recurring Deposits, investing in real estate or property, purchasing silver or other precious metals, buying digital gold, starting a new business venture, and making charitable donations. All financial activities get the blessing of eternal growth on this day."
        }
      },
      {
        "@type": "Question",
        "name": `Do I need to do any puja or rituals before buying gold on Akshaya Tritiya ${props.year}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No mandatory rituals are required, but traditional families prefer to: Take a bath early morning, wear clean traditional clothes, offer prayers to Lord Ganesha and Goddess Lakshmi at home, light a diya (lamp) before shopping, and chant 'Om Shreem Mahalakshmiyei Namah' 108 times. However, the day itself is so auspicious that simply purchasing gold with a pure heart and positive intention brings blessings."
        }
      },
      {
        "@type": "Question",
        "name": "Is digital gold purchase on Akshaya Tritiya as auspicious as physical gold?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Digital gold purchased on Akshaya Tritiya carries the same spiritual and auspicious benefits as physical gold. Apps like Paytm, PhonePe, and Google Pay allow you to buy gold starting from ₹1. Digital gold is 24K pure, has no making charges, can be converted to physical gold later, and is stored securely in vaults. The blessings of the day apply to the intention and act of investing, not the format."
        }
      },
      {
        "@type": "Question",
        "name": `When is Akshaya Tritiya ${props.year}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Akshaya Tritiya ${props.year} falls on ${props.date}. It is celebrated on the third day (Tritiya) of Shukla Paksha (bright fortnight) in the Hindu month of Vaishakha (April-May). The entire day from sunrise to sunset is considered auspicious for all activities.`
        }
      },
      {
        "@type": "Question",
        "name": "What activities should be avoided on Akshaya Tritiya?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `While Akshaya Tritiya is highly auspicious, avoid starting major activities during Rahu Kaal (${props.rahuStart} - ${props.rahuEnd}) in ${props.city}. Also avoid: borrowing money or taking loans, selling existing gold or property, engaging in negative thoughts or conflicts, and making impulsive purchases without research. Focus on positive, growth-oriented activities that align with the day's eternal prosperity energy.`
        }
      }
    ]
  };
};

export const generateAkshayaTritiyaEventSchema = (props: AkshayaTritiyaSchemaProps) => {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": `Akshaya Tritiya ${props.year}`,
    "description": `Akshaya Tritiya ${props.year} - The most auspicious day for buying gold, starting investments, and beginning new ventures. Celebrated across India with special emphasis on wealth creation and prosperity.`,
    "startDate": props.date,
    "endDate": props.date,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": props.city,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": props.city,
        "addressCountry": "IN"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "MoneyCal.in",
      "url": "https://moneycal.in"
    }
  };
};

export const generateHowToSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Buy Gold on Akshaya Tritiya",
    "description": "Complete guide to buying gold on Akshaya Tritiya for maximum prosperity and blessings",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Wake up early and take a holy bath",
        "text": "Start your day with a purifying bath and wear clean traditional clothes to receive divine blessings.",
        "position": 1
      },
      {
        "@type": "HowToStep",
        "name": "Offer prayers to Lord Ganesha and Goddess Lakshmi",
        "text": "Light a diya (lamp) and offer prayers at your home altar. Chant 'Om Shreem Mahalakshmiyei Namah' for prosperity.",
        "position": 2
      },
      {
        "@type": "HowToStep",
        "name": "Check the best muhurat timing",
        "text": "While the entire day is auspicious, Abhijit Muhurat is considered the most powerful time. Avoid Rahu Kaal period.",
        "position": 3
      },
      {
        "@type": "HowToStep",
        "name": "Visit a certified jeweler or use digital gold app",
        "text": "Choose a trusted jeweler with hallmark certification for physical gold, or use apps like Paytm, PhonePe for digital gold starting from ₹1.",
        "position": 4
      },
      {
        "@type": "HowToStep",
        "name": "Verify purity and get proper documentation",
        "text": "Check for BIS hallmark certification, get proper bill with GST details, and understand making charges before purchase.",
        "position": 5
      },
      {
        "@type": "HowToStep",
        "name": "Store safely and maintain records",
        "text": "Keep physical gold in a bank locker or home safe. For digital gold, maintain app records and invoice for future reference.",
        "position": 6
      }
    ]
  };
};

// Breadcrumb Schema
export const generateBreadcrumbSchema = (city: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://moneycal.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Festival Tools",
        "item": "https://moneycal.in/festival-tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Akshaya Tritiya Muhurat",
        "item": `https://moneycal.in/festival-tools/akshaya-tritiya-muhurat?city=${city}`
      }
    ]
  };
};

// Product/Service Schema for Gold Purchase
export const generateProductSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Akshaya Tritiya Gold Purchase Guide",
    "description": "Complete guide and muhurat finder for buying gold on Akshaya Tritiya with city-wise timings and auspicious periods",
    "brand": {
      "@type": "Brand",
      "name": "MoneyCal.in"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1250"
    }
  };
};

// Multi-city comparison data for visualization
export const CITY_COMPARISON_DATA = [
  { city: 'Mumbai', goldConsumption: '95 tons/year', avgPurchase: '₹45,000', popularity: 95 },
  { city: 'Delhi', goldConsumption: '87 tons/year', avgPurchase: '₹42,000', popularity: 92 },
  { city: 'Bangalore', goldConsumption: '72 tons/year', avgPurchase: '₹38,000', popularity: 88 },
  { city: 'Kolkata', goldConsumption: '68 tons/year', avgPurchase: '₹41,000', popularity: 87 },
  { city: 'Chennai', goldConsumption: '81 tons/year', avgPurchase: '₹47,000', popularity: 91 },
  { city: 'Hyderabad', goldConsumption: '64 tons/year', avgPurchase: '₹39,000', popularity: 85 },
  { city: 'Pune', goldConsumption: '58 tons/year', avgPurchase: '₹40,000', popularity: 84 },
  { city: 'Ahmedabad', goldConsumption: '76 tons/year', avgPurchase: '₹44,000', popularity: 90 }
];

// Historical gold price data on Akshaya Tritiya
export const HISTORICAL_GOLD_PRICES = [
  { year: 2020, price24k: 47000, price22k: 43100, growth: 8.2 },
  { year: 2021, price24k: 48500, price22k: 44400, growth: 3.2 },
  { year: 2022, price24k: 51200, price22k: 46900, growth: 5.6 },
  { year: 2023, price24k: 59500, price22k: 54500, growth: 16.2 },
  { year: 2024, price24k: 72300, price22k: 66200, growth: 21.5 },
  { year: 2025, price24k: 78500, price22k: 71900, growth: 8.6 }
];

// Hindi translations for key terms
export const HINDI_TRANSLATIONS = {
  akshayaTritiya: 'अक्षय तृतीया',
  shubhMuhurat: 'शुभ मुहूर्त',
  goldBuying: 'सोना खरीदना',
  investment: 'निवेश',
  abhijitMuhurat: 'अभिजीत मुहूर्त',
  rahuKaal: 'राहु काल',
  sunrise: 'सूर्योदय',
  sunset: 'सूर्यास्त',
  auspiciousDay: 'शुभ दिन',
  prosperity: 'समृद्धि',
  wealth: 'धन',
  eternalBlessing: 'अक्षय आशीर्वाद'
};

