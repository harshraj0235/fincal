/**
 * Category 2: High-Yield MSME Subsidies and Micro-Business Blueprints
 * Part of the "AI-Bypass" strategy for 2026.
 */
export interface MsmeScheme {
  id: string;
  slug: string;
  title: string;
  titleHindi: string;
  category: string;
  description: string;
  excerptHindi: string;
  content: any[];
  faqSchema: { question: string; answer: string }[];
  keywords: string[];
  status: 'active' | 'upcoming' | 'past';
  lastUpdated: string;
}

export const msmeSchemes: MsmeScheme[] = [
  {
    id: 'pmegp-loan-subsidy-2026',
    slug: 'pmegp-loan-subsidy-2026-rural-manufacturing',
    title: 'PMEGP Loan Subsidy 2026: 35% Margin Money for Rural Manufacturing',
    titleHindi: 'PMEGP ऋण सब्सिडी 2026: ग्रामीण विनिर्माण के लिए 35% मार्जिन मनी',
    category: 'MSME Subsidies',
    description: 'Detailed guide on PMEGP loan subsidy, margin money rules, and rural manufacturing benefits in 2026.',
    excerptHindi: 'PMEGP ऋण सब्सिडी, मार्जिन मनी नियमों और 2026 में ग्रामीण विनिर्माण लाभों पर विस्तृत गाइड।',
    status: 'active',
    lastUpdated: '2026-03-19',
    keywords: ['PMEGP loan subsidy 2026', 'margin money calculator', 'MSME loans rural India'],
    content: [
      { type: 'heading', content: 'What is PMEGP Loan Subsidy?' },
      { type: 'paragraph', content: 'The Prime Minister Employment Generation Programme (PMEGP) is a credit-linked subsidy program aimed at generating self-employment opportunities through establishment of micro-enterprises in the non-farm sector.' },
      { type: 'highlight', content: 'Subsidy Rates for 2026', items: [
        'Urban Areas: 15% (General Category), 25% (Special Category)',
        'Rural Areas: 25% (General Category), 35% (Special Category)'
      ]},
      { type: 'subheading', content: 'Eligibility for manufacturing units' },
      { type: 'paragraph', content: 'Manufacturing units with a project cost up to ₹50 Lakh are eligible for higher subsidies in rural areas.' }
    ],
    faqSchema: [
      { question: 'What is the maximum subsidy for PMEGP in rural areas?', answer: 'For special categories in rural areas, the subsidy is 35% of the project cost.' },
      { question: 'Is there any age limit for PMEGP loan?', answer: 'Any individual above 18 years of age can apply.' }
    ]
  },
  {
    id: 'stand-up-india-2026',
    slug: 'stand-up-india-loan-woman-entrepreneurs-2026',
    title: 'Stand-Up India 2026: Low-Interest Loans for Woman & SC/ST Entrepreneurs',
    titleHindi: 'Stand-Up India 2026: महिला और SC/ST उद्यमियों के लिए कम ब्याज ऋण',
    category: 'MSME Subsidies',
    description: 'A comprehensive guide to Stand-Up India scheme benefits, interest rates, and application checklist for 2026.',
    excerptHindi: 'Stand-Up India योजना के लाभों, ब्याज दरों और 2026 के लिए आवेदन चेकलिस्ट पर व्यापक गाइड।',
    status: 'active',
    lastUpdated: '2026-03-19',
    keywords: ['Stand-Up India loan 2026', 'woman entrepreneur loans', 'SC ST business subsidy'],
    content: [
      { type: 'heading', content: 'Empowering Underrepresented Entrepreneurs' },
      { type: 'paragraph', content: 'Stand-Up India facilitates bank loans between ₹10 lakh and ₹1 crore to at least one SC or ST borrower and at least one woman borrower per bank branch.' }
    ],
    faqSchema: [
      { question: 'What is the loan amount for Stand-Up India?', answer: 'Loans range from ₹10 lakh to ₹1 crore.' }
    ]
  },
  {
    id: 'mudra-loan-tarun-2026',
    slug: 'mudra-loan-tarun-category-updates-2026',
    title: 'MUDRA Loan Tarun Category: ₹10 Lakh+ Funding Guide 2026',
    titleHindi: 'मुद्रा ऋण तरुण श्रेणी: ₹10 लाख+ फंडिंग गाइड 2026',
    category: 'MSME Subsidies',
    description: 'Updated guidelines for MUDRA Tarun category loans, collateral-free limits, and interest rates in 2026.',
    excerptHindi: 'मुद्रा तरुण श्रेणी के ऋणों, संपार्श्विक-मुक्त सीमाओं और 2026 में ब्याज दरों के लिए अपडेटेड दिशानिर्देश।',
    status: 'active',
    lastUpdated: '2026-03-19',
    keywords: ['MUDRA loan Tarun 2026', 'collateral free MSME loan', 'Pradhan Mantri Mudra Yojana'],
    content: [
      { type: 'heading', content: 'Scaling Up with MUDRA Tarun' },
      { type: 'paragraph', content: 'The Tarun category is designed for established businesses looking to expand, offering funding from ₹5 lakh up to ₹10 lakh (and beyond in specific 2026 revisions).' }
    ],
    faqSchema: [
      { question: 'Is collateral required for MUDRA Tarun loans?', answer: 'Generally, MUDRA loans are collateral-free under the CGTMSE cover.' }
    ]
  }
];
