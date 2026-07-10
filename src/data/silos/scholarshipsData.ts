/**
 * Category 4: Student Financial Aid, Educational Loans, and Scholarships
 * Part of the "AI-Bypass" strategy for 2026.
 */
export interface Scholarship {
  id: string;
  slug: string;
  title: string;
  titleHindi: string;
  category: string;
  description: string;
  excerptHindi: string;
  deadline: string;
  eligibility: string[];
  faqSchema: { question: string; answer: string }[];
  keywords: string[];
}

export const scholarships: Scholarship[] = [
  {
    id: 'nsp-central-sector-scholarship-2026',
    slug: 'nsp-scholarship-2025-26-central-sector-scheme-cut-off',
    title: 'NSP Scholarship 2025-26: Central Sector Scheme Cut-Off Marks by State',
    titleHindi: 'NSP स्कॉलरशिप 2025-26: राज्यवार केंद्रीय क्षेत्र योजना कट-ऑफ मार्क्स',
    category: 'Scholarships',
    description: 'NSP Central Sector Scheme 2026 cut-off marks, state-wise boards, and application process.',
    excerptHindi: 'NSP केंद्रीय क्षेत्र योजना 2026 कट-ऑफ मार्क्स, राज्यवार बोर्ड और आवेदन प्रक्रिया।',
    deadline: '2026-10-31',
    eligibility: [
      'Top 20th percentile of successful candidates in Class 12',
      'Family income less than ₹4.5 Lakh per annum',
      'Pursuing regular course (not correspondence)'
    ],
    keywords: ['NSP scholarship cut off 2026', 'central sector scheme cut off marks', 'national scholarship portal 2026'],
    faqSchema: [
      { question: 'What is the NSP 2026 cut-off for the Central Sector Scheme?', answer: 'The cut-off varies by state board and category, usually being the top 20th percentile.' },
      { question: 'Who is eligible for the NSP Central Sector Scholarship?', answer: 'Students who scored above the cut-off in Class 12 and have a low family income.' }
    ]
  },
  {
    id: 'pm-yasasvi-entrance-2026',
    slug: 'pm-yasasvi-scholarship-2026-entrance-test-syllabus',
    title: 'PM-YASASVI 2026: Entrance Test Syllabus & Scholarship Amount for OBC/EBC',
    titleHindi: 'PM-YASASVI 2026: OBC/EBC के लिए प्रवेश परीक्षा पाठ्यक्रम और छात्रवृत्ति राशि',
    category: 'Scholarships',
    description: 'Detailed syllabus, exam pattern, and eligibility for PM-YASASVI entrance test 2026.',
    excerptHindi: 'PM-YASASVI प्रवेश परीक्षा 2026 के लिए विस्तृत पाठ्यक्रम, परीक्षा पैटर्न और पात्रता।',
    deadline: '2026-08-15',
    eligibility: [
      'Students in Class 9 or 11',
      'Belonging to OBC, EBC, or DNT categories',
      'Annual family income up to ₹2.5 Lakh'
    ],
    keywords: ['PM YASASVI scholarship 2026', 'YET entrance syllabus', 'OBC scholarship India'],
    faqSchema: [
      { question: 'Is PM-YASASVI scholarship for all states?', answer: 'Yes, it is a central scheme available across India.' }
    ]
  },
  {
    id: 'nmms-results-2026',
    slug: 'nmms-scholarship-results-2026-state-wise-merit-list',
    title: 'NMMS Results 2026: Check State-wise Merit List and Claim Status',
    titleHindi: 'NMMS परिणाम 2026: राज्यवार मेरिट सूची और क्लेम स्थिति की जांच करें',
    category: 'Scholarships',
    description: 'How to check NMMS 2026 results and scholarship disbursement status for Class 8 students.',
    excerptHindi: 'कक्षा 8 के छात्रों के लिए NMMS 2026 परिणाम और छात्रवृत्ति वितरण स्थिति की जांच कैसे करें।',
    deadline: '2026-12-31',
    eligibility: [
      'Class 8 students in Govt/Aided schools',
      'Score at least 55% in Class 7',
      'Family income not exceeding ₹3.5 Lakh'
    ],
    keywords: ['NMMS results 2026', 'national means cum merit scholarship', 'NMMS merit list PDF'],
    faqSchema: [
      { question: 'What is the amount for NMMS scholarship?', answer: 'Eligible students receive ₹12,000 per annum from Class 9 to 12.' }
    ]
  }
];
