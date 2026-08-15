/**
 * Category 7: Financial Cybercrime Diagnostics and Scam Verification
 * Forensic breakthroughs and emergency response protocols.
 */
export interface ScamReport {
  id: string;
  slug: string;
  title: string;
  titleHindi: string;
  category: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  excerptHindi: string;
  warningSigns: string[];
  emergencySteps: string[];
  faqSchema: { question: string; answer: string }[];
  keywords: string[];
}

export const scamReports: ScamReport[] = [
  {
    id: 'digital-arrest-scam-2026',
    slug: 'digital-arrest-scam-fake-customs-verify-police-warrants',
    title: 'Digital Arrest Scam Fake Customs: How to Verify Real Police Warrants',
    titleHindi: 'डिजिटल अरेस्ट स्कैम नकली कस्टम: असली पुलिस वारंट को कैसे सत्यापित करें',
    category: 'Scam Diagnostics',
    severity: 'High',
    description: 'Verification guide for fake digital arrest warrants and customs extortion in 2026.',
    excerptHindi: '2026 में फर्जी डिजिटल अरेस्ट वारंट और कस्टम जबरन वसूली के लिए सत्यापन गाइड।',
    warningSigns: [
      'Police/Customs asking to stay on video call for hours',
      'Demanding money to clear "illegal parcel" related to your Aadhaar',
      'Sending documents over WhatsApp/Telegram'
    ],
    emergencySteps: [
      'Disconnect the call immediately',
      'Call Cybercrime Helpline 1930',
      'Do not transfer any money',
      'Report on cybercrime.gov.in'
    ],
    keywords: ['digital arrest scam verify warrant', 'fake customs police call', 'cybercrime helpline 1930'],
    faqSchema: [
      { question: 'Can police put you under "Digital Arrest"?', answer: 'No, there is no such legal concept as "Digital Arrest". Police must arrest in person with a warrant.' },
      { question: 'What to do if someone calls about an illegal parcel?', answer: 'Disconnect immediately and call 1930. Do not share any personal or financial info.' }
    ]
  },
  {
    id: 'pig-butchering-scam-2026',
    slug: 'pig-butchering-scam-recovery-investigation-2026',
    title: 'Pig Butchering Scam 2026: Psychological Tactics & Recovery Paths',
    titleHindi: 'पिग बुचरिंग स्कैम 2026: मनोवैज्ञानिक रणनीति और रिकवरी मार्ग',
    category: 'Scam Diagnostics',
    severity: 'High',
    description: 'Deep dive into romance-investment hybrid scams (Shaadi.com/Tinder) and how to freeze beneficiary accounts in 2026.',
    excerptHindi: 'रोमांस-निवेश हाइब्रिड स्कैम (Shaadi.com/Tinder) में गहराई से उतरें और 2026 में लाभार्थी खातों को फ्रीज कैसे करें।',
    warningSigns: [
      'Person met online showing high crypto gains',
      'Encouragement to use a specific, unknown trading platform',
      'Small initial withdrawals allowed to build trust'
    ],
    emergencySteps: [
      'Stop all communication',
      'Preserve all chat logs and transaction hashes',
      'Report to both local police and cyber portal',
      'Contact your bank to flag the outgoing transaction'
    ],
    keywords: ['pig butchering scam 2026', 'investment scam recovery', 'shaadi.com fraud verify'],
    faqSchema: [
      { question: 'Can I get my money back from a pig butchering scam?', answer: 'Recovery is difficult but possible if reported within the "Golden Hour" on 1930.' }
    ]
  },
  {
    id: 'upi-q-code-fraud-2026',
    slug: 'upi-qr-code-scam-prevention-recovery-2026',
    title: 'UPI QR Code Fraud 2026: "Scan to Receive Money" Trap Exposed',
    titleHindi: 'यूपीआई क्यूआर कोड धोखाधड़ी 2026: "पैसे प्राप्त करने के लिए स्कैन करें" जाल का खुलासा',
    category: 'Scam Diagnostics',
    severity: 'Medium',
    description: 'Technical guide on why you should never scan a QR code or enter a PIN to receive money in 2026.',
    excerptHindi: 'इस पर तकनीकी गाइड कि आपको 2026 में पैसे प्राप्त करने के लिए क्यूआर कोड को स्कैन क्यों नहीं करना चाहिए या पिन दर्ज क्यों नहीं करना चाहिए।',
    warningSigns: [
      'Sender claims you need to scan a QR to "accept" payment',
      'App asking for PIN during a "receive" transaction',
      'Urgent pressure to scan before a link expires'
    ],
    emergencySteps: [
      'Change UPI PIN immediately',
      'De-link the device from the payment app',
      'Report the transaction on BHIM/GPay/PhonePe support'
    ],
    keywords: ['UPI QR code scam 2026', 'scan to receive fraud', 'UPI pin safety'],
    faqSchema: [
      { question: 'Do I need to enter PIN to receive money?', answer: 'NEVER. Receiving money requires no PIN and no QR scan.' }
    ]
  }
];
