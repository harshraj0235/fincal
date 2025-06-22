export interface GovernmentScheme {
  id: string;
  slug: string;
  title: string;
  titleHindi: string;
  category: string;
  categoryHindi: string;
  status: 'active' | 'upcoming' | 'past' | 'future';
  launchDate: string;
  lastUpdated: string;
  targetAudience: string[];
  benefits: string[];
  eligibility: string[];
  documents: string[];
  applicationProcess: string[];
  officialWebsite?: string;
  helpline?: string;
  coverImage: string;
  excerpt: string;
  excerptHindi: string;
  content: {
    type: 'paragraph' | 'heading' | 'subheading' | 'list' | 'image' | 'quote' | 'table' | 'highlight';
    content?: string;
    items?: string[];
    url?: string;
    caption?: string;
    author?: string;
    tableData?: { headers: string[]; rows: string[][] };
  }[];
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
  faqSchema: {
    question: string;
    answer: string;
  }[];
  relatedSchemes: string[];
  budget?: string;
  beneficiaries?: string;
  successRate?: string;
}

export const governmentSchemes: GovernmentScheme[] = [
  {
    id: '1',
    slug: 'pm-kisan-samman-nidhi-yojana-2025',
    title: 'PM Kisan Samman Nidhi Yojana 2025: Complete Guide for Farmers',
    titleHindi: 'पीएम किसान सम्मान निधि योजना 2025: किसानों के लिए पूर्ण गाइड',
    category: 'Agriculture & Farmers',
    categoryHindi: 'कृषि और किसान',
    status: 'active',
    launchDate: '2019-02-01',
    lastUpdated: '2025-01-15',
    targetAudience: ['Small and Marginal Farmers', 'Landholding Farmers', 'Agricultural Families'],
    benefits: [
      '₹6,000 per year financial assistance',
      'Direct bank transfer in 3 installments',
      'No middleman involvement',
      'Support for agricultural inputs',
      'Improved farming practices'
    ],
    eligibility: [
      'Small and marginal farmers',
      'Landholding up to 2 hectares',
      'Valid bank account',
      'Aadhaar linked bank account',
      'Not employed in government sector'
    ],
    documents: [
      'Aadhaar Card',
      'Land Records (Khasra/Khatauni)',
      'Bank Passbook',
      'Passport Size Photos',
      'Income Certificate'
    ],
    applicationProcess: [
      'Visit nearest Common Service Centre (CSC)',
      'Fill PM-KISAN application form',
      'Submit required documents',
      'Get application number',
      'Track status online'
    ],
    officialWebsite: 'https://pmkisan.gov.in',
    helpline: '155261',
    coverImage: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    excerpt: 'PM Kisan Samman Nidhi Yojana provides ₹6,000 annual financial assistance to small and marginal farmers. Learn complete application process, eligibility, and benefits for 2025.',
    excerptHindi: 'पीएम किसान सम्मान निधि योजना छोटे और सीमांत किसानों को ₹6,000 वार्षिक वित्तीय सहायता प्रदान करती है। 2025 के लिए पूर्ण आवेदन प्रक्रिया, पात्रता और लाभ जानें।',
    keywords: ['PM Kisan', 'किसान सम्मान निधि', 'farmer scheme', 'agriculture subsidy', 'PM Kisan 2025', 'किसान योजना', 'farmer financial assistance', 'agriculture support'],
    seoTitle: 'PM Kisan Samman Nidhi Yojana 2025: ₹6000 for Farmers | Complete Guide',
    seoDescription: 'PM Kisan Samman Nidhi Yojana 2025: Get ₹6000 annually for farming. Complete application process, eligibility, documents required. Apply online at pmkisan.gov.in',
    content: [
      {
        type: 'heading',
        content: 'PM Kisan Samman Nidhi Yojana 2025: किसानों के लिए वित्तीय सहायता'
      },
      {
        type: 'paragraph',
        content: 'प्रधानमंत्री किसान सम्मान निधि योजना (PM-KISAN) भारत सरकार की एक महत्वाकांक्षी योजना है जो छोटे और सीमांत किसानों को वित्तीय सहायता प्रदान करती है। यह योजना 2019 में शुरू की गई थी और 2025 में भी जारी है।'
      },
      {
        type: 'subheading',
        content: 'योजना का उद्देश्य'
      },
      {
        type: 'paragraph',
        content: 'इस योजना का मुख्य उद्देश्य किसानों को खेती के लिए आवश्यक वित्तीय सहायता प्रदान करना है ताकि वे बेहतर फसल उत्पादन कर सकें और अपनी आय में वृद्धि कर सकें।'
      },
      {
        type: 'subheading',
        content: 'योजना के लाभ'
      },
      {
        type: 'list',
        items: [
          'प्रति वर्ष ₹6,000 की वित्तीय सहायता',
          'तीन किश्तों में सीधा बैंक ट्रांसफर',
          'कोई बिचौलिया नहीं',
          'कृषि इनपुट के लिए समर्थन',
          'बेहतर खेती प्रथाओं को बढ़ावा'
        ]
      },
      {
        type: 'subheading',
        content: 'पात्रता मानदंड'
      },
      {
        type: 'list',
        items: [
          'छोटे और सीमांत किसान',
          '2 हेक्टेयर तक की जमीन',
          'वैध बैंक खाता',
          'आधार से जुड़ा बैंक खाता',
          'सरकारी क्षेत्र में नियोजित नहीं'
        ]
      },
      {
        type: 'subheading',
        content: 'आवश्यक दस्तावेज'
      },
      {
        type: 'list',
        items: [
          'आधार कार्ड',
          'जमीन के कागजात (खसरा/खतौनी)',
          'बैंक पासबुक',
          'पासपोर्ट साइज फोटो',
          'आय प्रमाण पत्र'
        ]
      },
      {
        type: 'subheading',
        content: 'आवेदन प्रक्रिया 2025'
      },
      {
        type: 'list',
        items: [
          'निकटतम कॉमन सर्विस सेंटर (CSC) पर जाएं',
          'PM-KISAN आवेदन फॉर्म भरें',
          'आवश्यक दस्तावेज जमा करें',
          'आवेदन संख्या प्राप्त करें',
          'ऑनलाइन स्थिति की जांच करें'
        ]
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        caption: 'PM Kisan Samman Nidhi Yojana - किसानों के लिए वित्तीय सहायता'
      },
      {
        type: 'subheading',
        content: '2025 में नई सुविधाएं'
      },
      {
        type: 'paragraph',
        content: '2025 में PM-KISAN योजना में कई नई सुविधाएं जोड़ी गई हैं:'
      },
      {
        type: 'list',
        items: [
          'डिजिटल पेमेंट का बेहतर इंफ्रास्ट्रक्चर',
          'मोबाइल ऐप के माध्यम से आवेदन',
          'बेहतर ग्रिवेंस रिड्रेसल सिस्टम',
          'AI आधारित पात्रता सत्यापन',
          'ब्लॉकचेन आधारित पारदर्शिता'
        ]
      },
      {
        type: 'quote',
        content: 'PM-KISAN योजना ने लाखों किसानों की जिंदगी बदल दी है और कृषि क्षेत्र को मजबूत बनाया है।',
        author: 'कृषि मंत्रालय, भारत सरकार'
      },
      {
        type: 'subheading',
        content: 'किश्तों का विवरण'
      },
      {
        type: 'table',
        tableData: {
          headers: ['किश्त', 'राशि', 'भुगतान माह'],
          rows: [
            ['पहली किश्त', '₹2,000', 'अप्रैल-जुलाई'],
            ['दूसरी किश्त', '₹2,000', 'अगस्त-नवंबर'],
            ['तीसरी किश्त', '₹2,000', 'दिसंबर-मार्च']
          ]
        }
      },
      {
        type: 'subheading',
        content: 'ऑनलाइन आवेदन कैसे करें'
      },
      {
        type: 'list',
        items: [
          'pmkisan.gov.in पर जाएं',
          '"New Farmer Registration" पर क्लिक करें',
          'आधार नंबर दर्ज करें',
          'पात्रता की जांच करें',
          'फॉर्म भरें और दस्तावेज अपलोड करें',
          'आवेदन जमा करें'
        ]
      },
      {
        type: 'subheading',
        content: 'स्थिति की जांच कैसे करें'
      },
      {
        type: 'list',
        items: [
          'आधार नंबर से स्थिति जांचें',
          'मोबाइल नंबर से स्थिति जांचें',
          'बैंक खाता नंबर से स्थिति जांचें',
          'आवेदन संख्या से स्थिति जांचें'
        ]
      },
      {
        type: 'subheading',
        content: 'समस्याओं का समाधान'
      },
      {
        type: 'paragraph',
        content: 'यदि आपको PM-KISAN योजना में कोई समस्या आ रही है, तो निम्नलिखित तरीकों से संपर्क कर सकते हैं:'
      },
      {
        type: 'list',
        items: [
          'हेल्पलाइन: 155261',
          'ईमेल: pmkisan-ict@gov.in',
          'टोल-फ्री नंबर: 1800-180-1551',
          'निकटतम कृषि कार्यालय में जाएं'
        ]
      }
    ],
    faqSchema: [
      {
        question: 'PM Kisan योजना में कितनी राशि मिलती है?',
        answer: 'PM Kisan योजना में प्रति वर्ष ₹6,000 की राशि तीन किश्तों में मिलती है।'
      },
      {
        question: 'PM Kisan के लिए कौन पात्र है?',
        answer: 'छोटे और सीमांत किसान जिनके पास 2 हेक्टेयर तक की जमीन है, वे पात्र हैं।'
      },
      {
        question: 'PM Kisan में आवेदन कैसे करें?',
        answer: 'आप निकटतम CSC केंद्र पर जाकर या pmkisan.gov.in पर ऑनलाइन आवेदन कर सकते हैं।'
      },
      {
        question: 'PM Kisan की किश्तें कब मिलती हैं?',
        answer: 'पहली किश्त अप्रैल-जुलाई, दूसरी अगस्त-नवंबर, और तीसरी दिसंबर-मार्च में मिलती है।'
      },
      {
        question: 'PM Kisan में कौन से दस्तावेज चाहिए?',
        answer: 'आधार कार्ड, जमीन के कागजात, बैंक पासबुक, और फोटो आवश्यक हैं।'
      }
    ],
    relatedSchemes: ['pm-fasal-bima-yojana', 'kisan-credit-card', 'pm-kisan-maandhan-yojana'],
    budget: '₹75,000 करोड़ (2025-26)',
    beneficiaries: '11.5 करोड़ किसान',
    successRate: '98.5%'
  },
  {
    id: '2',
    slug: 'pm-fasal-bima-yojana-2025',
    title: 'PM Fasal Bima Yojana 2025: Complete Crop Insurance Guide',
    titleHindi: 'पीएम फसल बीमा योजना 2025: फसल बीमा की पूर्ण गाइड',
    category: 'Agriculture & Farmers',
    categoryHindi: 'कृषि और किसान',
    status: 'active',
    launchDate: '2016-01-13',
    lastUpdated: '2025-01-10',
    targetAudience: ['All Farmers', 'Crop Growers', 'Agricultural Landowners'],
    benefits: [
      'Comprehensive crop insurance coverage',
      'Low premium rates for farmers',
      'Quick claim settlement',
      'Coverage for natural calamities',
      'Support for all major crops'
    ],
    eligibility: [
      'All farmers growing notified crops',
      'Loanee and non-loanee farmers',
      'Sharecroppers and tenant farmers',
      'All agricultural landholders'
    ],
    documents: [
      'Aadhaar Card',
      'Land Records',
      'Bank Account Details',
      'Crop Details',
      'Previous Insurance Documents'
    ],
    applicationProcess: [
      'Contact nearest bank or insurance company',
      'Fill application form',
      'Submit required documents',
      'Pay premium amount',
      'Receive insurance certificate'
    ],
    officialWebsite: 'https://pmfby.gov.in',
    helpline: '1800-180-1551',
    coverImage: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    excerpt: 'PM Fasal Bima Yojana provides comprehensive crop insurance to farmers. Learn about premium rates, claim process, and benefits for 2025.',
    excerptHindi: 'पीएम फसल बीमा योजना किसानों को व्यापक फसल बीमा प्रदान करती है। 2025 के लिए प्रीमियम दरें, दावा प्रक्रिया और लाभ जानें।',
    keywords: ['PM Fasal Bima', 'फसल बीमा', 'crop insurance', 'agriculture insurance', 'PMFBY 2025', 'किसान बीमा', 'crop damage compensation'],
    seoTitle: 'PM Fasal Bima Yojana 2025: Crop Insurance Guide | Premium & Claims',
    seoDescription: 'PM Fasal Bima Yojana 2025: Get crop insurance with low premium. Complete guide for application, claims, and benefits. Apply at pmfby.gov.in',
    content: [
      {
        type: 'heading',
        content: 'PM Fasal Bima Yojana 2025: फसल बीमा की पूर्ण जानकारी'
      },
      {
        type: 'paragraph',
        content: 'प्रधानमंत्री फसल बीमा योजना (PMFBY) भारत सरकार की एक महत्वपूर्ण योजना है जो किसानों को फसल नुकसान के खिलाफ बीमा कवरेज प्रदान करती है।'
      }
    ],
    faqSchema: [
      {
        question: 'PM Fasal Bima में कौन पात्र है?',
        answer: 'सभी किसान जो अधिसूचित फसलें उगाते हैं, वे पात्र हैं।'
      },
      {
        question: 'प्रीमियम कितना है?',
        answer: 'खरीफ फसलों के लिए 2%, रबी फसलों के लिए 1.5%, और वाणिज्यिक फसलों के लिए 5%।'
      }
    ],
    relatedSchemes: ['pm-kisan-samman-nidhi', 'kisan-credit-card', 'pm-kisan-maandhan'],
    budget: '₹15,000 करोड़ (2025-26)',
    beneficiaries: '4.5 करोड़ किसान',
    successRate: '95.2%'
  }
  // Add more schemes here...
];

export function getGovernmentSchemeBySlug(slug: string): GovernmentScheme | undefined {
  return governmentSchemes.find(scheme => scheme.slug === slug);
}

export function getGovernmentSchemesByCategory(category: string): GovernmentScheme[] {
  return governmentSchemes.filter(scheme => scheme.category === category);
}

export function getRelatedGovernmentSchemes(slug: string, count: number = 3): GovernmentScheme[] {
  const scheme = getGovernmentSchemeBySlug(slug);
  if (!scheme) return [];
  
  const related = governmentSchemes.filter(
    s => s.slug !== slug && s.category === scheme.category
  );
  
  if (related.length < count) {
    const others = governmentSchemes.filter(s => s.slug !== slug && !related.includes(s));
    return [...related, ...others].slice(0, count);
  }
  
  return related.slice(0, count);
}

export const schemeCategories = [
  { id: 'agriculture', name: 'Agriculture & Farmers', nameHindi: 'कृषि और किसान' },
  { id: 'education', name: 'Education & Skills', nameHindi: 'शिक्षा और कौशल' },
  { id: 'healthcare', name: 'Healthcare & Medical', nameHindi: 'स्वास्थ्य और चिकित्सा' },
  { id: 'employment', name: 'Employment & Jobs', nameHindi: 'रोजगार और नौकरी' },
  { id: 'women', name: 'Women Empowerment', nameHindi: 'महिला सशक्तिकरण' },
  { id: 'youth', name: 'Youth & Students', nameHindi: 'युवा और छात्र' },
  { id: 'senior', name: 'Senior Citizens', nameHindi: 'वरिष्ठ नागरिक' },
  { id: 'rural', name: 'Rural Development', nameHindi: 'ग्रामीण विकास' },
  { id: 'urban', name: 'Urban Development', nameHindi: 'शहरी विकास' },
  { id: 'financial', name: 'Financial Inclusion', nameHindi: 'वित्तीय समावेशन' }
]; 