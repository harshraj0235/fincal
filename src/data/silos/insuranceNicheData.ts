/**
 * Category 10: High-CPM Insurance Niche: Rare Claims and Clauses
 * Technical insurance content for 2026 premiums.
 */
export interface InsuranceNiche {
  id: string;
  slug: string;
  title: string;
  titleHindi: string;
  category: string;
  description: string;
  excerptHindi: string;
  claimProbability: string;
  keyClauses: string[];
  faqSchema: { question: string; answer: string }[];
  keywords: string[];
}

export const insuranceNiches: InsuranceNiche[] = [
  {
    id: 'cyber-insurance-freelancers-2026',
    slug: 'cyber-insurance-freelancers-2026-data-breach-legal-costs',
    title: 'Cyber Insurance for Freelancers 2026: Clause for Data Breach Legal Costs',
    titleHindi: 'फ्रीलांसरों के लिए साइबर बीमा 2026: डेटा उल्लंघन कानूनी लागत के लिए क्लॉज',
    category: 'Insurance Niche',
    description: 'Comprehensive guide on cyber insurance for Indian freelancers covering data breach and legal liabilities.',
    excerptHindi: 'भारतीय फ्रीलांसरों के लिए डेटा उल्लंघन और कानूनी देनदारियों को कवर करने वाले साइबर बीमा पर विस्तृत गाइड।',
    claimProbability: 'Low but High Impact',
    keyClauses: [
      'Data Breach Liability Protection',
      'Ransomware Negotiation & Payment Cover',
      'Forensic Investigation Costs',
      'Legal Defense Costs'
    ],
    keywords: ['cyber insurance for freelancers India', 'data breach insurance 2026', 'cyber liability insurance clauses'],
    faqSchema: [
      { question: 'Do freelancers need cyber insurance?', answer: 'Yes, if you handle client data, insurance protects you from legal costs during a breach.' },
      { question: 'What is covered under freelancer cyber insurance?', answer: 'Legal fees, forensic costs, and sometimes settlement amounts for data leakage.' }
    ]
  },
  {
    id: 'ev-battery-insurance-2026',
    slug: 'ev-battery-replacement-insurance-clauses-india-2026',
    title: 'EV Battery Replacement Insurance 2026: Degradation vs Damage Clauses',
    titleHindi: 'EV बैटरी रिप्लेसमेंट इंश्योरेंस 2026: डिग्रेडेशन बनाम डैमेज क्लॉज',
    category: 'Insurance Niche',
    description: 'Specialized insurance for Electric Vehicle battery degradation, fire risks, and replacement costs in 2026.',
    excerptHindi: 'इलेक्ट्रिक वाहन बैटरी डिग्रेडेशन, आग के खतरों और 2026 में प्रतिस्थापन लागत के लिए विशेष बीमा।',
    claimProbability: 'Medium',
    keyClauses: [
      'Battery Degradation Cover (below 70% SOH)',
      'Fire and Explosion Liability',
      'Charging Station Equipment Protection',
      'Zero Depreciation on Battery'
    ],
    keywords: ['EV battery insurance India 2026', 'electric vehicle insurance clauses', 'ev battery warranty vs insurance'],
    faqSchema: [
      { question: 'Does normal car insurance cover EV battery?', answer: 'Standard policies may only cover accidental damage. You need specialized riders for degradation.' }
    ]
  },
  {
    id: 'gig-worker-health-micro-2026',
    slug: 'gig-worker-health-insurance-swiggy-zomato-2026-eligibility',
    title: 'Gig Worker Health Insurance 2026: Daily Premium & Accidental Cover',
    titleHindi: 'गिग वर्कर स्वास्थ्य बीमा 2026: दैनिक प्रीमियम और दुर्घटना कवर',
    category: 'Insurance Niche',
    description: 'Micro-insurance projects for Swiggy, Zomato, and Zepto workers with daily premium models in 2026.',
    excerptHindi: 'दैनिक प्रीमियम मॉडल के साथ स्विगी, जोमैटो और जेप्टो श्रमिकों के लिए 2026 में माइक्रो-बीमा परियोजनाएं।',
    claimProbability: 'High Frequency',
    keyClauses: [
      'Daily Pay-as-you-go Premiums',
      'Accidental Death & Permanent Disability',
      'In-patient Hospitalization with Cash Benefit',
      'Family Tele-consultation'
    ],
    keywords: ['gig worker insurance India 2026', 'Swiggy Zomato worker insurance', 'micro health insurance daily premium'],
    faqSchema: [
      { question: 'How much does gig worker insurance cost?', answer: 'Premiums can be as low as ₹1 to ₹5 per day, usually deducted from payouts.' }
    ]
  }
];
