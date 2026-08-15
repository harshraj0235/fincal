/**
 * Category 6: Middle-Class Taxation and Budget 2026 Compliance
 * Interactive taxation models for the 2026 tax code.
 */
export interface TaxationUpdate {
  id: string;
  slug: string;
  title: string;
  titleHindi: string;
  category: string;
  description: string;
  excerptHindi: string;
  effectiveDate: string;
  keyChanges: string[];
  faqSchema: { question: string; answer: string }[];
  keywords: string[];
}

export const taxationUpdates: TaxationUpdate[] = [
  {
    id: 'sgb-secondary-market-tax-2026',
    slug: 'sgb-secondary-market-tax-calculator-2026-ltcg-impact',
    title: 'SGB Secondary Market Tax Calculator 2026: 12.5% LTCG Impact',
    titleHindi: 'SGB सेकेंडरी मार्केट टैक्स कैलकुलेटर 2026: 12.5% LTCG प्रभाव',
    category: 'Taxation & Budget',
    description: 'Calculate capital gains tax on SGB purchased from secondary market under 2026 rules.',
    excerptHindi: '2026 के नियमों के तहत सेकेंडरी मार्केट से खरीदे गए SGB पर कैपिटल गेन्स टैक्स की गणना करें।',
    effectiveDate: '2026-04-01',
    keyChanges: [
      '12.5% LTCG applies to SGBs bought from secondary market',
      'Maturity of primary issuance remains tax-free',
      'No indexation benefit'
    ],
    keywords: ['SGB tax calculator 2026', 'sgb secondary market ltcg', 'sovereign gold bond capital gains'],
    faqSchema: [
      { question: 'Is maturity of SGB tax-free in 2026?', answer: 'Only primary issuances held until maturity are tax-free. Secondary market purchases attract 12.5% LTCG.' },
      { question: 'What is the tax rate for SGB in the secondary market?', answer: 'It is 12.5% Long-Term Capital Gains tax without indexation.' }
    ]
  },
  {
    id: 'new-tax-regime-2026',
    slug: 'new-tax-regime-slabs-2026-financial-year-changes',
    title: 'New Tax Regime Slabs 2026: FY 2026-27 Slabs & Standard Deduction',
    titleHindi: 'नई टैक्स व्यवस्था स्लैब 2026: वित्त वर्ष 2026-27 स्लैब और मानक कटौती',
    category: 'Taxation & Budget',
    description: 'Updated tax slabs for the New Regime in 2026, increased standard deduction, and zero-tax limits.',
    excerptHindi: '2026 में नई व्यवस्था के लिए अपडेटेड टैक्स स्लैब, बढ़ी हुई मानक कटौती और शून्य-टैक्स सीमा।',
    effectiveDate: '2026-04-01',
    keyChanges: [
      'Standard Deduction increased to ₹75,000 for salaried individuals',
      'Zero tax for income up to ₹7,75,000 including standard deduction',
      'Revised slabs: 0-3L (Nil), 3-7L (5%), 7-10L (10%)'
    ],
    keywords: ['new tax regime 2026', 'income tax slabs 2026-27', 'standard deduction 2026'],
    faqSchema: [
      { question: 'Is the standard deduction available in the New Tax Regime?', answer: 'Yes, it is available for salaried and pensioners.' }
    ]
  },
  {
    id: 'crypto-taxation-2026',
    slug: 'crypto-tax-india-2026-tds-and-offset-rules',
    title: 'Crypto Taxation 2026: TDS Rates, Loss Offsetting & Reporting Rules',
    titleHindi: 'क्रिप्टो कराधान 2026: टीडीएस दरें, हानि ऑफसेटिंग और रिपोर्टिंग नियम',
    category: 'Taxation & Budget',
    description: 'Current rules for Virtual Digital Assets (VDA) in 2026, TDS on P2P transfers, and ITR reporting requirements.',
    excerptHindi: '2026 में वर्चुअल डिजिटल एसेट्स (VDA) के लिए वर्तमान नियम, P2P ट्रांसफर पर TDS और ITR रिपोर्टिंग आवश्यकताएं।',
    effectiveDate: '2026-04-01',
    keyChanges: [
      '30% Tax on gains from VDAs remains',
      '1% TDS on all VDA transfers above threshold',
      'Loss from one VDA cannot be offset against gain from another'
    ],
    keywords: ['crypto tax India 2026', 'TDS on crypto', 'VDA taxation rules'],
    faqSchema: [
      { question: 'Can I offset crypto losses against gains in 2026?', answer: 'No, losses from Virtual Digital Assets cannot be offset against any income or other VDA gains.' }
    ]
  }
];
