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
  },
  {
    id: '3',
    slug: 'pm-ayushman-bharat-yojana-2025',
    title: 'PM Ayushman Bharat Yojana 2025: Complete Health Insurance Guide',
    titleHindi: 'पीएम आयुष्मान भारत योजना 2025: स्वास्थ्य बीमा की पूर्ण गाइड',
    category: 'Healthcare & Medical',
    categoryHindi: 'स्वास्थ्य और चिकित्सा',
    status: 'active',
    launchDate: '2018-09-23',
    lastUpdated: '2025-01-15',
    targetAudience: ['Economically Weaker Sections', 'Rural Population', 'Urban Poor'],
    benefits: [
      '₹5 lakh health insurance coverage',
      'Cashless treatment at empaneled hospitals',
      'Coverage for pre and post hospitalization',
      'No age limit or pre-existing condition exclusions',
      'Coverage for 1,393 medical procedures'
    ],
    eligibility: [
      'Families identified in SECC 2011',
      'Rural families with deprivation criteria',
      'Urban families with specific occupational categories',
      'No income limit for eligible families'
    ],
    documents: [
      'Aadhaar Card',
      'Ration Card',
      'Income Certificate',
      'Caste Certificate (if applicable)',
      'Domicile Certificate'
    ],
    applicationProcess: [
      'Check eligibility on official website',
      'Visit nearest CSC or hospital',
      'Submit required documents',
      'Receive Ayushman Bharat card',
      'Start availing benefits'
    ],
    officialWebsite: 'https://pmjay.gov.in',
    helpline: '14555',
    coverImage: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    excerpt: 'PM Ayushman Bharat Yojana provides ₹5 lakh health insurance to economically weaker sections. Complete guide for 2025 application and benefits.',
    excerptHindi: 'पीएम आयुष्मान भारत योजना आर्थिक रूप से कमजोर वर्गों को ₹5 लाख का स्वास्थ्य बीमा प्रदान करती है। 2025 के लिए पूर्ण आवेदन और लाभ गाइड।',
    keywords: ['Ayushman Bharat', 'आयुष्मान भारत', 'health insurance', 'PMJAY', 'medical coverage', 'cashless treatment', 'healthcare scheme'],
    seoTitle: 'PM Ayushman Bharat Yojana 2025: ₹5 Lakh Health Insurance | Complete Guide',
    seoDescription: 'PM Ayushman Bharat Yojana 2025: Get ₹5 lakh health insurance coverage. Complete application guide, eligibility, and benefits. Apply at pmjay.gov.in',
    content: [
      {
        type: 'heading',
        content: 'PM Ayushman Bharat Yojana 2025: स्वास्थ्य बीमा की क्रांति'
      },
      {
        type: 'paragraph',
        content: 'प्रधानमंत्री आयुष्मान भारत योजना (PMJAY) दुनिया की सबसे बड़ी स्वास्थ्य बीमा योजना है जो आर्थिक रूप से कमजोर वर्गों को ₹5 लाख तक का स्वास्थ्य बीमा कवरेज प्रदान करती है।'
      }
    ],
    faqSchema: [
      {
        question: 'Ayushman Bharat में कितना बीमा कवरेज मिलता है?',
        answer: 'Ayushman Bharat में ₹5 लाख तक का स्वास्थ्य बीमा कवरेज मिलता है।'
      },
      {
        question: 'Ayushman Bharat के लिए कौन पात्र है?',
        answer: 'SECC 2011 में पहचाने गए परिवार और आर्थिक रूप से कमजोर वर्ग पात्र हैं।'
      }
    ],
    relatedSchemes: ['pm-jan-aushadhi-yojana', 'pm-bhartiya-janaushadhi-pariyojana', 'pm-swasthya-suraksha-yojana'],
    budget: '₹6,400 करोड़ (2025-26)',
    beneficiaries: '10.74 करोड़ परिवार',
    successRate: '96.8%'
  },
  {
    id: '4',
    slug: 'pm-jan-dhan-yojana-2025',
    title: 'PM Jan Dhan Yojana 2025: Zero Balance Bank Account Guide',
    titleHindi: 'पीएम जन धन योजना 2025: जीरो बैलेंस बैंक खाता गाइड',
    category: 'Financial Inclusion',
    categoryHindi: 'वित्तीय समावेशन',
    status: 'active',
    launchDate: '2014-08-28',
    lastUpdated: '2025-01-10',
    targetAudience: ['Unbanked Population', 'Rural Households', 'Low-Income Families'],
    benefits: [
      'Zero balance savings account',
      'RuPay debit card with ₹2 lakh accident insurance',
      '₹30,000 life insurance coverage',
      'Overdraft facility up to ₹10,000',
      'Direct benefit transfer facility'
    ],
    eligibility: [
      'Indian citizens above 10 years',
      'No existing bank account',
      'Valid Aadhaar number',
      'Valid mobile number'
    ],
    documents: [
      'Aadhaar Card',
      'PAN Card (if available)',
      'Voter ID or Driving License',
      'Passport size photographs',
      'Mobile number'
    ],
    applicationProcess: [
      'Visit nearest bank branch or BC outlet',
      'Fill account opening form',
      'Submit required documents',
      'Complete biometric verification',
      'Receive account details and RuPay card'
    ],
    officialWebsite: 'https://pmjdy.gov.in',
    helpline: '1800-111-111',
    coverImage: 'https://images.pexels.com/photos/787625/pexels-photo-787625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    excerpt: 'PM Jan Dhan Yojana provides zero balance bank accounts with insurance benefits. Complete guide for 2025 application and account features.',
    excerptHindi: 'पीएम जन धन योजना बीमा लाभों के साथ जीरो बैलेंस बैंक खाते प्रदान करती है। 2025 के लिए पूर्ण आवेदन और खाता सुविधाएं गाइड।',
    keywords: ['Jan Dhan Yojana', 'जन धन योजना', 'zero balance account', 'financial inclusion', 'bank account', 'RuPay card', 'insurance coverage'],
    seoTitle: 'PM Jan Dhan Yojana 2025: Zero Balance Bank Account | Insurance Benefits',
    seoDescription: 'PM Jan Dhan Yojana 2025: Open zero balance bank account with insurance benefits. Complete guide for application and account features.',
    content: [
      {
        type: 'heading',
        content: 'PM Jan Dhan Yojana 2025: वित्तीय समावेशन की क्रांति'
      },
      {
        type: 'paragraph',
        content: 'प्रधानमंत्री जन धन योजना (PMJDY) भारत सरकार की एक महत्वाकांक्षी योजना है जो देश के हर परिवार को बैंकिंग सुविधाओं से जोड़ने का लक्ष्य रखती है।'
      }
    ],
    faqSchema: [
      {
        question: 'Jan Dhan खाते में कितना बीमा मिलता है?',
        answer: 'Jan Dhan खाते में ₹2 लाख का दुर्घटना बीमा और ₹30,000 का जीवन बीमा मिलता है।'
      },
      {
        question: 'Jan Dhan खाता कैसे खोलें?',
        answer: 'निकटतम बैंक शाखा या BC आउटलेट पर जाकर आवश्यक दस्तावेजों के साथ आवेदन करें।'
      }
    ],
    relatedSchemes: ['pm-suraksha-bima-yojana', 'pm-jeevan-jyoti-bima-yojana', 'atal-pension-yojana'],
    budget: '₹1,500 करोड़ (2025-26)',
    beneficiaries: '50.75 करोड़ खाते',
    successRate: '99.9%'
  },
  {
    id: '5',
    slug: 'pm-mudra-yojana-2025',
    title: 'PM MUDRA Yojana 2025: Micro Enterprise Loan Guide',
    titleHindi: 'पीएम मुद्रा योजना 2025: सूक्ष्म उद्यम ऋण गाइड',
    category: 'Financial Inclusion',
    categoryHindi: 'वित्तीय समावेशन',
    status: 'active',
    launchDate: '2015-04-08',
    lastUpdated: '2025-01-12',
    targetAudience: ['Micro Entrepreneurs', 'Small Business Owners', 'Self-Employed Individuals'],
    benefits: [
      'Three loan categories: Shishu, Kishore, Tarun',
      'No collateral required for loans up to ₹10 lakh',
      'Low interest rates',
      'Quick loan processing',
      'Support for various business activities'
    ],
    eligibility: [
      'Indian citizens above 18 years',
      'Micro enterprise owners',
      'Small business operators',
      'Self-employed professionals'
    ],
    documents: [
      'Aadhaar Card',
      'PAN Card',
      'Business proof documents',
      'Bank statements',
      'Income tax returns'
    ],
    applicationProcess: [
      'Visit nearest bank or NBFC',
      'Fill MUDRA loan application',
      'Submit business plan and documents',
      'Complete verification process',
      'Receive loan disbursement'
    ],
    officialWebsite: 'https://mudra.org.in',
    helpline: '1800-180-1111',
    coverImage: 'https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    excerpt: 'PM MUDRA Yojana provides micro enterprise loans up to ₹10 lakh. Complete guide for 2025 application, eligibility, and loan categories.',
    excerptHindi: 'पीएम मुद्रा योजना ₹10 लाख तक के सूक्ष्म उद्यम ऋण प्रदान करती है। 2025 के लिए पूर्ण आवेदन, पात्रता और ऋण श्रेणियां गाइड।',
    keywords: ['MUDRA Yojana', 'मुद्रा योजना', 'micro loan', 'small business loan', 'entrepreneur loan', 'PM MUDRA', 'business financing'],
    seoTitle: 'PM MUDRA Yojana 2025: Micro Enterprise Loans up to ₹10 Lakh | Complete Guide',
    seoDescription: 'PM MUDRA Yojana 2025: Get micro enterprise loans up to ₹10 lakh. Complete application guide, eligibility, and loan categories.',
    content: [
      {
        type: 'heading',
        content: 'PM MUDRA Yojana 2025: सूक्ष्म उद्यमों का विकास'
      },
      {
        type: 'paragraph',
        content: 'प्रधानमंत्री मुद्रा योजना (PM MUDRA) सूक्ष्म उद्यमों को वित्तीय सहायता प्रदान करने के लिए शुरू की गई एक महत्वपूर्ण योजना है।'
      }
    ],
    faqSchema: [
      {
        question: 'MUDRA लोन की कितनी श्रेणियां हैं?',
        answer: 'MUDRA लोन की तीन श्रेणियां हैं: शिशु (₹50,000), किशोर (₹5 लाख), और तरुण (₹10 लाख)।'
      },
      {
        question: 'MUDRA लोन के लिए गारंटी चाहिए?',
        answer: '₹10 लाख तक के लोन के लिए कोई गारंटी नहीं चाहिए।'
      }
    ],
    relatedSchemes: ['pm-svanidhi-yojana', 'pm-employment-generation-programme', 'startup-india'],
    budget: '₹3,00,000 करोड़ (2025-26)',
    beneficiaries: '4.5 करोड़ लाभार्थी',
    successRate: '94.2%'
  },
  {
    id: '6',
    slug: 'pm-svanidhi-yojana-2025',
    title: 'PM SVANidhi Yojana 2025: Street Vendor Loan Guide',
    titleHindi: 'पीएम स्वनिधि योजना 2025: स्ट्रीट वेंडर ऋण गाइड',
    category: 'Financial Inclusion',
    categoryHindi: 'वित्तीय समावेशन',
    status: 'active',
    launchDate: '2020-06-01',
    lastUpdated: '2025-01-08',
    targetAudience: ['Street Vendors', 'Hawkers', 'Small Traders'],
    benefits: [
      'Working capital loan up to ₹10,000',
      'Interest subsidy of 7%',
      'Digital transaction incentives',
      'No collateral required',
      'Quick loan processing'
    ],
    eligibility: [
      'Street vendors with valid vending certificate',
      'Vendors operating before March 24, 2020',
      'No existing loan under the scheme',
      'Valid Aadhaar and mobile number'
    ],
    documents: [
      'Aadhaar Card',
      'Vending Certificate',
      'Bank Account Details',
      'Mobile Number',
      'Passport Size Photos'
    ],
    applicationProcess: [
      'Contact nearest bank or CSC',
      'Fill SVANidhi application form',
      'Submit required documents',
      'Complete verification',
      'Receive loan in bank account'
    ],
    officialWebsite: 'https://pmsvanidhi.mohua.gov.in',
    helpline: '1800-111-1111',
    coverImage: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    excerpt: 'PM SVANidhi Yojana provides working capital loans to street vendors. Complete guide for 2025 application, benefits, and digital incentives.',
    excerptHindi: 'पीएम स्वनिधि योजना स्ट्रीट वेंडरों को कार्यशील पूंजी ऋण प्रदान करती है। 2025 के लिए पूर्ण आवेदन, लाभ और डिजिटल प्रोत्साहन गाइड।',
    keywords: ['SVANidhi Yojana', 'स्वनिधि योजना', 'street vendor loan', 'hawker loan', 'working capital', 'PM SVANidhi', 'vendor financing'],
    seoTitle: 'PM SVANidhi Yojana 2025: Street Vendor Loans up to ₹10,000 | Complete Guide',
    seoDescription: 'PM SVANidhi Yojana 2025: Get working capital loans up to ₹10,000 for street vendors. Complete application guide and benefits.',
    content: [
      {
        type: 'heading',
        content: 'PM SVANidhi Yojana 2025: स्ट्रीट वेंडरों का सशक्तिकरण'
      },
      {
        type: 'paragraph',
        content: 'प्रधानमंत्री स्वनिधि योजना (PM SVANidhi) स्ट्रीट वेंडरों को वित्तीय सहायता प्रदान करने के लिए शुरू की गई एक महत्वपूर्ण योजना है।'
      }
    ],
    faqSchema: [
      {
        question: 'SVANidhi लोन की अधिकतम राशि कितनी है?',
        answer: 'SVANidhi लोन की अधिकतम राशि ₹10,000 है।'
      },
      {
        question: 'SVANidhi में ब्याज सब्सिडी कितनी है?',
        answer: 'SVANidhi में 7% की ब्याज सब्सिडी मिलती है।'
      }
    ],
    relatedSchemes: ['pm-mudra-yojana', 'pm-employment-generation-programme', 'pm-kisan-samman-nidhi'],
    budget: '₹5,000 करोड़ (2025-26)',
    beneficiaries: '50 लाख वेंडर',
    successRate: '92.5%'
  },
  {
    id: '7',
    slug: 'pm-kisan-maandhan-yojana-2025',
    title: 'PM Kisan Maandhan Yojana 2025: Pension Scheme for Farmers',
    titleHindi: 'पीएम किसान मांधन योजना 2025: किसानों के लिए पेंशन योजना',
    category: 'Agriculture & Farmers',
    categoryHindi: 'कृषि और किसान',
    status: 'active',
    launchDate: '2019-09-12',
    lastUpdated: '2025-01-05',
    targetAudience: ['Small and Marginal Farmers', 'Agricultural Workers', 'Landholding Farmers'],
    benefits: [
      '₹3,000 monthly pension after 60 years',
      'Government contribution of 1.5 times',
      'Life insurance coverage',
      'Spouse pension benefits',
      'Flexible contribution options'
    ],
    eligibility: [
      'Farmers between 18-40 years',
      'Landholding up to 2 hectares',
      'Not covered under other pension schemes',
      'Valid Aadhaar and bank account'
    ],
    documents: [
      'Aadhaar Card',
      'Land Records',
      'Bank Account Details',
      'Age Proof',
      'Farmer Certificate'
    ],
    applicationProcess: [
      'Visit nearest CSC or bank',
      'Fill application form',
      'Submit required documents',
      'Pay first contribution',
      'Receive pension account details'
    ],
    officialWebsite: 'https://maandhan.in',
    helpline: '1800-180-1551',
    coverImage: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    excerpt: 'PM Kisan Maandhan Yojana provides pension benefits to small farmers. Complete guide for 2025 application, contribution, and pension benefits.',
    excerptHindi: 'पीएम किसान मांधन योजना छोटे किसानों को पेंशन लाभ प्रदान करती है। 2025 के लिए पूर्ण आवेदन, योगदान और पेंशन लाभ गाइड।',
    keywords: ['Kisan Maandhan', 'किसान मांधन', 'farmer pension', 'agriculture pension', 'PM Kisan Maandhan', 'farmer retirement', 'pension scheme'],
    seoTitle: 'PM Kisan Maandhan Yojana 2025: ₹3000 Monthly Pension for Farmers | Complete Guide',
    seoDescription: 'PM Kisan Maandhan Yojana 2025: Get ₹3000 monthly pension for farmers. Complete application guide, contribution, and benefits.',
    content: [
      {
        type: 'heading',
        content: 'PM Kisan Maandhan Yojana 2025: किसानों का सुरक्षित भविष्य'
      },
      {
        type: 'paragraph',
        content: 'प्रधानमंत्री किसान मांधन योजना (PM Kisan Maandhan) छोटे और सीमांत किसानों को पेंशन सुरक्षा प्रदान करने के लिए शुरू की गई है।'
      }
    ],
    faqSchema: [
      {
        question: 'किसान मांधन में कितनी पेंशन मिलती है?',
        answer: 'किसान मांधन में 60 वर्ष के बाद ₹3,000 मासिक पेंशन मिलती है।'
      },
      {
        question: 'किसान मांधन में योगदान कितना है?',
        answer: 'किसान मांधन में ₹55 से ₹200 तक का मासिक योगदान है।'
      }
    ],
    relatedSchemes: ['pm-kisan-samman-nidhi', 'atal-pension-yojana', 'pm-fasal-bima-yojana'],
    budget: '₹2,000 करोड़ (2025-26)',
    beneficiaries: '25 लाख किसान',
    successRate: '89.7%'
  },
  {
    id: '8',
    slug: 'atal-pension-yojana-2025',
    title: 'Atal Pension Yojana 2025: Guaranteed Pension Scheme Guide',
    titleHindi: 'अटल पेंशन योजना 2025: गारंटीड पेंशन योजना गाइड',
    category: 'Financial Inclusion',
    categoryHindi: 'वित्तीय समावेशन',
    status: 'active',
    launchDate: '2015-05-09',
    lastUpdated: '2025-01-03',
    targetAudience: ['Unorganized Sector Workers', 'Self-Employed Individuals', 'Low-Income Workers'],
    benefits: [
      'Guaranteed pension between ₹1,000-₹5,000',
      'Government co-contribution up to ₹1,000',
      'Life insurance coverage',
      'Spouse pension benefits',
      'Flexible contribution periods'
    ],
    eligibility: [
      'Indian citizens between 18-40 years',
      'Not covered under other pension schemes',
      'Valid Aadhaar and bank account',
      'Mobile number linked to Aadhaar'
    ],
    documents: [
      'Aadhaar Card',
      'Bank Account Details',
      'Mobile Number',
      'Age Proof',
      'Address Proof'
    ],
    applicationProcess: [
      'Visit nearest bank or post office',
      'Fill APY application form',
      'Submit required documents',
      'Choose pension amount and contribution',
      'Start monthly contributions'
    ],
    officialWebsite: 'https://npscra.nsdl.co.in',
    helpline: '1800-180-1111',
    coverImage: 'https://images.pexels.com/photos/787625/pexels-photo-787625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    excerpt: 'Atal Pension Yojana provides guaranteed pension benefits. Complete guide for 2025 application, contribution, and pension amounts.',
    excerptHindi: 'अटल पेंशन योजना गारंटीड पेंशन लाभ प्रदान करती है। 2025 के लिए पूर्ण आवेदन, योगदान और पेंशन राशि गाइड।',
    keywords: ['Atal Pension Yojana', 'अटल पेंशन योजना', 'APY', 'guaranteed pension', 'pension scheme', 'retirement planning', 'government pension'],
    seoTitle: 'Atal Pension Yojana 2025: Guaranteed Pension ₹1000-₹5000 | Complete Guide',
    seoDescription: 'Atal Pension Yojana 2025: Get guaranteed pension between ₹1000-₹5000. Complete application guide, contribution, and benefits.',
    content: [
      {
        type: 'heading',
        content: 'Atal Pension Yojana 2025: गारंटीड पेंशन सुरक्षा'
      },
      {
        type: 'paragraph',
        content: 'अटल पेंशन योजना (APY) असंगठित क्षेत्र के कर्मचारियों को गारंटीड पेंशन सुरक्षा प्रदान करने के लिए शुरू की गई है।'
      }
    ],
    faqSchema: [
      {
        question: 'APY में कितनी पेंशन मिलती है?',
        answer: 'APY में ₹1,000 से ₹5,000 तक की गारंटीड पेंशन मिलती है।'
      },
      {
        question: 'APY में सरकारी योगदान कितना है?',
        answer: 'APY में सरकार ₹1,000 तक का सह-योगदान करती है।'
      }
    ],
    relatedSchemes: ['pm-kisan-maandhan-yojana', 'pm-suraksha-bima-yojana', 'pm-jan-dhan-yojana'],
    budget: '₹1,500 करोड़ (2025-26)',
    beneficiaries: '4.2 करोड़ लाभार्थी',
    successRate: '91.3%'
  },
  {
    id: '9',
    slug: 'pm-suraksha-bima-yojana-2025',
    title: 'PM Suraksha Bima Yojana 2025: Accident Insurance Guide',
    titleHindi: 'पीएम सुरक्षा बीमा योजना 2025: दुर्घटना बीमा गाइड',
    category: 'Financial Inclusion',
    categoryHindi: 'वित्तीय समावेशन',
    status: 'active',
    launchDate: '2015-05-09',
    lastUpdated: '2025-01-02',
    targetAudience: ['Bank Account Holders', 'Working Professionals', 'General Public'],
    benefits: [
      '₹2 lakh accident insurance coverage',
      'Annual premium of only ₹12',
      'Coverage for death and disability',
      'Auto-debit facility',
      'Family protection'
    ],
    eligibility: [
      'Bank account holders between 18-70 years',
      'Valid Aadhaar number',
      'Consent for auto-debit',
      'Active bank account'
    ],
    documents: [
      'Aadhaar Card',
      'Bank Account Details',
      'Age Proof',
      'Consent Form for Auto-debit'
    ],
    applicationProcess: [
      'Visit bank branch or use net banking',
      'Fill application form',
      'Provide Aadhaar details',
      'Give auto-debit consent',
      'Pay premium of ₹12'
    ],
    officialWebsite: 'https://jansuraksha.gov.in',
    helpline: '1800-180-1111',
    coverImage: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    excerpt: 'PM Suraksha Bima Yojana provides ₹2 lakh accident insurance for just ₹12. Complete guide for 2025 application and coverage details.',
    excerptHindi: 'पीएम सुरक्षा बीमा योजना सिर्फ ₹12 में ₹2 लाख का दुर्घटना बीमा प्रदान करती है। 2025 के लिए पूर्ण आवेदन और कवरेज विवरण गाइड।',
    keywords: ['Suraksha Bima', 'सुरक्षा बीमा', 'accident insurance', 'PM Suraksha Bima', '₹12 insurance', 'accident coverage', 'life insurance'],
    seoTitle: 'PM Suraksha Bima Yojana 2025: ₹2 Lakh Accident Insurance for ₹12 | Complete Guide',
    seoDescription: 'PM Suraksha Bima Yojana 2025: Get ₹2 lakh accident insurance for just ₹12. Complete application guide and coverage details.',
    content: [
      {
        type: 'heading',
        content: 'PM Suraksha Bima Yojana 2025: सस्ता दुर्घटना बीमा'
      },
      {
        type: 'paragraph',
        content: 'प्रधानमंत्री सुरक्षा बीमा योजना (PM Suraksha Bima) आम जनता को सस्ता दुर्घटना बीमा प्रदान करने के लिए शुरू की गई है।'
      }
    ],
    faqSchema: [
      {
        question: 'सुरक्षा बीमा में कितना कवरेज मिलता है?',
        answer: 'सुरक्षा बीमा में ₹2 लाख का दुर्घटना कवरेज मिलता है।'
      },
      {
        question: 'सुरक्षा बीमा का प्रीमियम कितना है?',
        answer: 'सुरक्षा बीमा का वार्षिक प्रीमियम सिर्फ ₹12 है।'
      }
    ],
    relatedSchemes: ['pm-jeevan-jyoti-bima-yojana', 'atal-pension-yojana', 'pm-jan-dhan-yojana'],
    budget: '₹800 करोड़ (2025-26)',
    beneficiaries: '15.5 करोड़ लाभार्थी',
    successRate: '95.8%'
  },
  {
    id: '10',
    slug: 'pm-jeevan-jyoti-bima-yojana-2025',
    title: 'PM Jeevan Jyoti Bima Yojana 2025: Life Insurance Guide',
    titleHindi: 'पीएम जीवन ज्योति बीमा योजना 2025: जीवन बीमा गाइड',
    category: 'Financial Inclusion',
    categoryHindi: 'वित्तीय समावेशन',
    status: 'active',
    launchDate: '2015-05-09',
    lastUpdated: '2025-01-01',
    targetAudience: ['Bank Account Holders', 'Working Professionals', 'Family Breadwinners'],
    benefits: [
      '₹2 lakh life insurance coverage',
      'Annual premium of only ₹330',
      'Coverage for natural and accidental death',
      'Auto-debit facility',
      'Family financial security'
    ],
    eligibility: [
      'Bank account holders between 18-50 years',
      'Valid Aadhaar number',
      'Consent for auto-debit',
      'Active bank account'
    ],
    documents: [
      'Aadhaar Card',
      'Bank Account Details',
      'Age Proof',
      'Consent Form for Auto-debit'
    ],
    applicationProcess: [
      'Visit bank branch or use net banking',
      'Fill application form',
      'Provide Aadhaar details',
      'Give auto-debit consent',
      'Pay premium of ₹330'
    ],
    officialWebsite: 'https://jansuraksha.gov.in',
    helpline: '1800-180-1111',
    coverImage: 'https://images.pexels.com/photos/787625/pexels-photo-787625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    excerpt: 'PM Jeevan Jyoti Bima Yojana provides ₹2 lakh life insurance for ₹330. Complete guide for 2025 application and coverage details.',
    excerptHindi: 'पीएम जीवन ज्योति बीमा योजना ₹330 में ₹2 लाख का जीवन बीमा प्रदान करती है। 2025 के लिए पूर्ण आवेदन और कवरेज विवरण गाइड।',
    keywords: ['Jeevan Jyoti Bima', 'जीवन ज्योति बीमा', 'life insurance', 'PM Jeevan Jyoti', '₹330 insurance', 'life coverage', 'family protection'],
    seoTitle: 'PM Jeevan Jyoti Bima Yojana 2025: ₹2 Lakh Life Insurance for ₹330 | Complete Guide',
    seoDescription: 'PM Jeevan Jyoti Bima Yojana 2025: Get ₹2 lakh life insurance for ₹330. Complete application guide and coverage details.',
    content: [
      {
        type: 'heading',
        content: 'PM Jeevan Jyoti Bima Yojana 2025: सस्ता जीवन बीमा'
      },
      {
        type: 'paragraph',
        content: 'प्रधानमंत्री जीवन ज्योति बीमा योजना (PM Jeevan Jyoti Bima) आम जनता को सस्ता जीवन बीमा प्रदान करने के लिए शुरू की गई है।'
      }
    ],
    faqSchema: [
      {
        question: 'जीवन ज्योति बीमा में कितना कवरेज मिलता है?',
        answer: 'जीवन ज्योति बीमा में ₹2 लाख का जीवन कवरेज मिलता है।'
      },
      {
        question: 'जीवन ज्योति बीमा का प्रीमियम कितना है?',
        answer: 'जीवन ज्योति बीमा का वार्षिक प्रीमियम ₹330 है।'
      }
    ],
    relatedSchemes: ['pm-suraksha-bima-yojana', 'atal-pension-yojana', 'pm-jan-dhan-yojana'],
    budget: '₹1,200 करोड़ (2025-26)',
    beneficiaries: '12.8 करोड़ लाभार्थी',
    successRate: '94.2%'
  }
  // Continue with more schemes...
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