/**
 * Category 3: Digitized Land Records (Bhulekh) and Real Estate Verification
 * Technical procedural guides for state portals.
 */
export interface LandRecordGuide {
  id: string;
  slug: string;
  state: string;
  title: string;
  titleHindi: string;
  portalName: string;
  portalUrl: string;
  description: string;
  steps: string[];
  faqSchema: { question: string; answer: string }[];
  keywords: string[];
}

export const landRecordGuides: LandRecordGuide[] = [
  {
    id: 'up-bhulekh-name-search-2026',
    slug: 'bhulekh-up-2026-search-land-records-by-name',
    state: 'Uttar Pradesh',
    title: 'Bhulekh UP 2026: Search Land Records by Name without Khasra Number',
    titleHindi: 'भूलेख यूपी 2026: खसरा नंबर के बिना नाम से जमीन का रिकॉर्ड खोजें',
    portalName: 'UP Bhulekh',
    portalUrl: 'https://upbhulekh.gov.in',
    description: 'How to search land records (Khatauni) on the UP Bhulekh portal using the owner\'s name in 2026.',
    keywords: ['Bhulekh UP 2026', 'search land record by name', 'UP Khatauni online'],
    steps: [
      'Visit the official UP Bhulekh portal.',
      'Select your District, Tehsil, and Village.',
      'Click on "Account holder name search" (खातेदार के नाम द्वारा खोजें).',
      'Enter the owner\'s name and click search.',
      'Select the correct record and view Khatauni.'
    ],
    faqSchema: [
      { question: 'Can I search UP land records without a Khasra number?', answer: 'Yes, you can search by the account holder\'s name on the official portal.' },
      { question: 'Is the online copy of Khatauni valid for legal purposes?', answer: 'No, for legal purposes, you must obtain a certified copy from the Tehsil office.' }
    ]
  },
  {
    id: 'mp-bhulekh-verify-2026',
    slug: 'bhulekh-mp-2026-verify-land-ownership-online',
    state: 'Madhya Pradesh',
    title: 'Bhulekh MP 2026: Verify Land Ownership and Khasra P-II Online',
    titleHindi: 'भूलेख एमपी 2026: भूमि स्वामित्व और खसरा पी-II ऑनलाइन सत्यापित करें',
    portalName: 'MP Bhulekh',
    portalUrl: 'https://mpbhulekh.gov.in',
    description: 'Guide to checking MP land records, Khasra, and B1 Naksha on the updated 2026 MP Bhulekh portal.',
    keywords: ['Bhulekh MP 2026', 'MP land record check', 'Khasra P-II online'],
    steps: [
      'Navigate to mpbhulekh.gov.in.',
      'Select "Land Records" (भू-अभिलेख) from the home menu.',
      'Enter District, Tehsil, and Village name.',
      'Choose to search by Plot Number or Name.',
      'Download the Khasra or B1 map directly.'
    ],
    faqSchema: [
      { question: 'How can I download Khasra in MP?', answer: 'You can download it for free for viewing via the "Land Records" section on MP Bhulekh.' }
    ]
  },
  {
    id: 'bihar-bhumi-record-2026',
    slug: 'bihar-bhumi-2026-check-jamabandi-and-khatiyan',
    state: 'Bihar',
    title: 'Bihar Bhumi 2026: Check Jamabandi and Khatiyan Online (New Portal)',
    titleHindi: 'बिहार भूमि 2026: जमाबंदी और खतियान ऑनलाइन चेक करें (नया पोर्टल)',
    portalName: 'Bihar Bhumi',
    portalUrl: 'http://biharbhumi.bihar.gov.in',
    description: 'Expert guide on using the Bihar Bhumi portal to check Jamabandi register and Khatiyan records in 2026.',
    keywords: ['Bihar Bhumi 2026', 'check Jamabandi Bihar', 'Khatiyan online Bihar'],
    steps: [
      'Go to the Bihar Bhumi official website.',
      'Click on "View Jamabandi Register" (जमाबंदी पंजी देखें).',
      'Select your specific region (Halka/Mauja).',
      'Search using Jamabandi number or Owner Name.',
      'Verify the digital signature for 2026 authenticity.'
    ],
    faqSchema: [
      { question: 'What is Jamabandi in Bihar?', answer: 'It is a register containing ownership details of land parcels.' }
    ]
  }
];
