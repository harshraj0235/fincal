/**
 * Category 5: Gen-Z Youth Banking and First-Time Credit (Student Credit Cards)
 * Financial literacy for the 2026 digital native generation.
 */
export interface YouthBankingProduct {
  id: string;
  slug: string;
  title: string;
  titleHindi: string;
  category: string;
  description: string;
  excerptHindi: string;
  minAge: number;
  keyFeatures: string[];
  faqSchema: { question: string; answer: string }[];
  keywords: string[];
}

export const youthBankingProducts: YouthBankingProduct[] = [
  {
    id: 'sbi-student-credit-card-2026',
    slug: 'sbi-student-credit-card-2026-no-income-proof-apply',
    title: 'SBI Student Credit Card 2026: No Income Proof, 100% Approval on FD',
    titleHindi: 'SBI छात्र क्रेडिट कार्ड 2026: कोई आय प्रमाण नहीं, FD पर 100% स्वीकृति',
    category: 'Youth Banking',
    description: 'Guide to SBI student credit card on fixed deposit, credit building, and reward rules for 2026.',
    excerptHindi: 'फिक्स्ड डिपॉजिट पर SBI छात्र क्रेडिट कार्ड, क्रेडिट निर्माण और 2026 के पुरस्कार नियमों के लिए गाइड।',
    minAge: 18,
    keyFeatures: [
      'Issued against SBI Fixed Deposit (₹5000+)',
      'No income proof required',
      'Helps build CIBIL score from age 18',
      'Interest-free credit for up to 50 days'
    ],
    keywords: ['SBI student credit card 2026', 'student credit card without income proof', 'first credit card for students'],
    faqSchema: [
      { question: 'Can students get a credit card in India without income?', answer: 'Yes, students can get "Secured Credit Cards" against a Fixed Deposit.' },
      { question: 'What is the limit for SBI student credit card?', answer: 'Generally 80% to 90% of the Fixed Deposit amount.' }
    ]
  },
  {
    id: 'hdfc-digisave-youth-2026',
    slug: 'hdfc-digisave-youth-account-2026-no-minimum-balance',
    title: 'HDFC DigiSave Youth Account 2026: Zero Balance & Lifestyle Perks',
    titleHindi: 'HDFC DigiSave यूथ अकाउंट 2026: जीरो बैलेंस और लाइफस्टाइल लाभ',
    category: 'Youth Banking',
    description: 'HDFC DigiSave account rewards, no-minimum balance rules, and student-exclusive debit cards for 2026.',
    excerptHindi: 'HDFC DigiSave अकाउंट रिवॉर्ड्स, नो-मिनिमम बैलेंस नियम और 2026 के लिए स्टूडेंट-एक्सक्लूसिव डेबिट कार्ड।',
    minAge: 18,
    keyFeatures: [
      'Zero balance maintenance for students',
      'Exclusive rewards on digital subscriptions (Netflix, Spotify)',
      'High-limit contactless debit card',
      'Integrated investment module for mutual funds'
    ],
    keywords: ['HDFC DigiSave youth 2026', 'zero balance student account', 'top youth bank accounts India'],
    faqSchema: [
      { question: 'Is HDFC DigiSave free for students?', answer: 'Yes, if the student status is verified, the maintenance charges are waived.' }
    ]
  },
  {
    id: 'idfc-first-student-loan-2026',
    slug: 'idfc-first-bank-student-loan-2026-low-emi-approval',
    title: 'IDFC First Bank Student Loans 2026: Low EMI & Instant Approval',
    titleHindi: 'IDFC फर्स्ट बैंक छात्र ऋण 2026: कम EMI और तत्काल स्वीकृति',
    category: 'Youth Banking',
    description: 'IDFC First student loan interest rates, repayment moratorium, and documentation for 2026.',
    excerptHindi: 'IDFC फर्स्ट छात्र ऋण ब्याज दरें, पुनर्भुगतान अधिस्थगन और 2026 के लिए दस्तावेज़ीकरण।',
    minAge: 18,
    keyFeatures: [
      'Coverage for over 2000+ domestic and international colleges',
      'Repayment moratorium during the course duration',
      'Minimal documentation with digital-first processing',
      'Interest rate benefits for high GPA students'
    ],
    keywords: ['IDFC First student loan 2026', 'education loan low interest India', 'student loan moratorium rules'],
    faqSchema: [
      { question: 'What is the moratorium period?', answer: 'It is the course duration plus 6 months or 1 year given before repayment starts.' }
    ]
  }
];
