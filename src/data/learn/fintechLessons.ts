/**
 * FinTech & Digital Payments - Complete Lesson Registry
 * Category: fintech-digital-payments
 * Total Lessons: 6 comprehensive lessons
 * Target: Indian audience (Hindi + English)
 * SEO: Optimized for Google ranking
 */

export interface LearnLesson {
  id: string;
  slug: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  relatedCalculators: string[];
  order: number;
}

export const fintechCategory = {
  id: 'fintech-digital-payments',
  slug: 'fintech-digital-payments',
  name: 'FinTech & Digital Payments',
  nameHindi: 'फिनटेक और डिजिटल भुगतान',
  icon: '💳',
  description: 'UPI, digital wallets, online banking, payment security, and FinTech apps for Indians',
  descriptionHindi: 'UPI, डिजिटल वॉलेट, ऑनलाइन बैंकिंग, भुगतान सुरक्षा, और भारतीयों के लिए फिनटेक ऐप',
  color: 'from-blue-500 to-cyan-600',
  totalLessons: 6,
  estimatedHours: 4
};

export const fintechLessons: LearnLesson[] = [
  {
    id: 'upi-complete-guide',
    slug: 'upi-complete-guide-gpay-phonepe-paytm-limit-charges-india-2025',
    title: 'UPI Complete Guide: GPay, PhonePe, Paytm - Limit, Charges, Safety (India 2025)',
    titleHindi: 'UPI गाइड: GPay, PhonePe, Paytm - लिमिट, चार्ज, सुरक्षा (भारत 2025)',
    description: 'Master UPI payments: How UPI works, transaction limits (₹1L/day), zero charges, best UPI apps (GPay, PhonePe, Paytm), UPI ID creation, safety tips, cashback offers',
    descriptionHindi: 'UPI भुगतान में महारत: UPI कैसे काम करता है, लेनदेन सीमा (₹1L/दिन), शून्य शुल्क, सर्वश्रेष्ठ UPI ऐप (GPay, PhonePe, Paytm), UPI ID बनाना, सुरक्षा टिप्स, कैशबैक ऑफर',
    duration: '40 mins',
    difficulty: 'beginner',
    tags: ['UPI', 'GPay', 'PhonePe', 'Paytm', 'Digital Payments', 'Hindi'],
    relatedCalculators: [],
    order: 1
  },
  {
    id: 'digital-wallets-guide',
    slug: 'digital-wallets-paytm-phonepe-amazon-pay-google-pay-india-complete-guide',
    title: 'Digital Wallets Guide: Paytm, PhonePe, Amazon Pay, Google Pay (India)',
    titleHindi: 'डिजिटल वॉलेट गाइड: Paytm, PhonePe, Amazon Pay, Google Pay (भारत)',
    description: 'Complete wallet guide: Wallet vs UPI vs card, adding money, wallet balance limit (₹1L), KYC requirements, cashback strategies, merchant payments, bill payments',
    descriptionHindi: 'संपूर्ण वॉलेट गाइड: वॉलेट बनाम UPI बनाम कार्ड, पैसे जोड़ना, वॉलेट बैलेंस लिमिट (₹1L), KYC आवश्यकताएं, कैशबैक रणनीतियां, व्यापारी भुगतान, बिल भुगतान',
    duration: '35 mins',
    difficulty: 'beginner',
    tags: ['Digital Wallet', 'Paytm', 'PhonePe', 'Cashback', 'Hindi'],
    relatedCalculators: [],
    order: 2
  },
  {
    id: 'online-banking-guide',
    slug: 'online-banking-net-banking-mobile-banking-complete-guide-india-2025',
    title: 'Online Banking Guide: Net Banking, Mobile Banking, Safety Tips (India 2025)',
    titleHindi: 'ऑनलाइन बैंकिंग गाइड: नेट बैंकिंग, मोबाइल बैंकिंग, सुरक्षा टिप्स (भारत 2025)',
    description: 'Master online banking: Net banking vs mobile banking, NEFT/RTGS/IMPS explained, transaction limits, charges, security (2FA, OTP), common frauds to avoid',
    descriptionHindi: 'ऑनलाइन बैंकिंग में महारत: नेट बैंकिंग बनाम मोबाइल बैंकिंग, NEFT/RTGS/IMPS समझाया, लेनदेन सीमा, शुल्क, सुरक्षा (2FA, OTP), सामान्य धोखाधड़ी से बचें',
    duration: '45 mins',
    difficulty: 'intermediate',
    tags: ['Net Banking', 'Mobile Banking', 'NEFT', 'RTGS', 'IMPS', 'Hindi'],
    relatedCalculators: [],
    order: 3
  },
  {
    id: 'payment-security-guide',
    slug: 'payment-security-cyber-fraud-prevention-upi-scams-india-2025',
    title: 'Payment Security Guide: Prevent Cyber Fraud, UPI Scams, OTP Fraud (India 2025)',
    titleHindi: 'भुगतान सुरक्षा गाइड: साइबर धोखाधड़ी रोकें, UPI स्कैम, OTP धोखाधड़ी (भारत 2025)',
    description: 'Stay safe online: Common UPI scams (fake calls, QR code scams), OTP security, phishing emails, how to report fraud, refund process, cybercrime helpline (1930)',
    descriptionHindi: 'ऑनलाइन सुरक्षित रहें: सामान्य UPI स्कैम (नकली कॉल, QR कोड स्कैम), OTP सुरक्षा, फ़िशिंग ईमेल, धोखाधड़ी की रिपोर्ट कैसे करें, रिफंड प्रक्रिया, साइबर अपराध हेल्पलाइन (1930)',
    duration: '50 mins',
    difficulty: 'intermediate',
    tags: ['Cyber Security', 'UPI Scams', 'Fraud Prevention', 'OTP Security', 'Hindi'],
    relatedCalculators: [],
    order: 4
  },
  {
    id: 'fintech-apps-guide',
    slug: 'best-fintech-apps-india-cred-jupiter-fi-niyo-salary-accounts-2025',
    title: 'Best FinTech Apps India: CRED, Jupiter, Fi, Niyo - Neo Banks & Salary Accounts 2025',
    titleHindi: 'भारत के सर्वश्रेष्ठ फिनटेक ऐप: CRED, Jupiter, Fi, Niyo - नियो बैंक और वेतन खाते 2025',
    description: 'Explore FinTech apps: CRED (credit card payments), Jupiter/Fi (neo banks), Niyo (zero-balance salary account), features, pros & cons, safety, customer reviews',
    descriptionHindi: 'फिनटेक ऐप्स का अन्वेषण करें: CRED (क्रेडिट कार्ड भुगतान), Jupiter/Fi (नियो बैंक), Niyo (शून्य-शेष वेतन खाता), सुविधाएं, फायदे और नुकसान, सुरक्षा, ग्राहक समीक्षा',
    duration: '40 mins',
    difficulty: 'intermediate',
    tags: ['FinTech Apps', 'CRED', 'Jupiter', 'Fi', 'Neo Banks', 'Hindi'],
    relatedCalculators: [],
    order: 5
  },
  {
    id: 'buy-now-pay-later',
    slug: 'buy-now-pay-later-bnpl-lazypay-simpl-zestmoney-india-guide-2025',
    title: 'Buy Now Pay Later (BNPL): LazyPay, Simpl, ZestMoney - How It Works, Risks (India 2025)',
    titleHindi: 'अभी खरीदें बाद में भुगतान करें (BNPL): LazyPay, Simpl, ZestMoney - कैसे काम करता है, जोखिम (भारत 2025)',
    description: 'Understand BNPL: What is buy now pay later, how it works, interest-free period (15-30 days), late payment charges (2-3% per month), impact on credit score, when to use BNPL',
    descriptionHindi: 'BNPL को समझें: अभी खरीदें बाद में भुगतान करें क्या है, कैसे काम करता है, ब्याज-मुक्त अवधि (15-30 दिन), देर से भुगतान शुल्क (2-3% प्रति माह), क्रेडिट स्कोर पर प्रभाव, BNPL कब उपयोग करें',
    duration: '35 mins',
    difficulty: 'advanced',
    tags: ['BNPL', 'LazyPay', 'Simpl', 'Credit Score', 'Hindi'],
    relatedCalculators: [],
    order: 6
  }
];

// SEO keywords for the category
export const fintechSEO = {
  metaTitle: 'FinTech & Digital Payments Guide for Indians | MoneyCal Learn',
  metaDescription: 'Master UPI, digital wallets, online banking, payment security in Hindi & English. 6 comprehensive lessons on GPay, PhonePe, Paytm, CRED, Jupiter, and cyber fraud prevention.',
  keywords: 'UPI guide India, digital wallet, GPay PhonePe Paytm, online banking, payment security, cyber fraud prevention, FinTech apps India, BNPL, UPI गाइड, डिजिटल भुगतान',
  canonicalUrl: 'https://moneycal.in/learn/fintech-digital-payments'
};


