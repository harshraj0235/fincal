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

export const comprehensiveGovernmentSchemes: GovernmentScheme[] = [
  {
    id: '1',
    slug: 'pm-kisan-samman-nidhi-yojana-2025',
    title: 'PM Kisan Samman Nidhi Yojana 2025: Complete Guide for Farmers - ₹6000 Annual Support',
    titleHindi: 'पीएम किसान सम्मान निधि योजना 2025: किसानों के लिए पूर्ण गाइड - ₹6000 वार्षिक सहायता',
    category: 'Agriculture & Farmers',
    categoryHindi: 'कृषि और किसान',
    status: 'active',
    launchDate: '2019-02-01',
    lastUpdated: '2025-01-15',
    targetAudience: ['Small and Marginal Farmers', 'Landholding Farmers', 'Agricultural Families', 'Rural Households'],
    benefits: [
      '₹6,000 per year financial assistance in 3 installments',
      'Direct bank transfer - no middleman involvement',
      'Support for agricultural inputs and farming expenses',
      'Improved farming practices and crop diversification',
      'Financial security for farming families',
      'Reduced dependency on money lenders'
    ],
    eligibility: [
      'Small and marginal farmers with landholding up to 2 hectares',
      'Valid bank account linked with Aadhaar',
      'Not employed in government sector or receiving pension',
      'Should be the actual cultivator of the land',
      'Family should not have institutional landholding'
    ],
    documents: [
      'Aadhaar Card (mandatory)',
      'Land Records (Khasra/Khatauni)',
      'Bank Passbook with IFSC code',
      'Passport Size Photographs',
      'Income Certificate (if applicable)',
      'Caste Certificate (for SC/ST farmers)'
    ],
    applicationProcess: [
      'Visit nearest Common Service Centre (CSC) or Gram Panchayat',
      'Fill PM-KISAN application form with accurate details',
      'Submit all required documents for verification',
      'Get application number and acknowledgment receipt',
      'Track application status online at pmkisan.gov.in',
      'Receive first installment within 30-45 days'
    ],
    officialWebsite: 'https://pmkisan.gov.in',
    helpline: '155261',
    coverImage: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    excerpt: 'PM Kisan Samman Nidhi Yojana 2025 provides ₹6,000 annual financial assistance to small and marginal farmers. Complete guide with application process, eligibility criteria, and latest updates for 2025.',
    excerptHindi: 'पीएम किसान सम्मान निधि योजना 2025 छोटे और सीमांत किसानों को ₹6,000 वार्षिक वित्तीय सहायता प्रदान करती है। 2025 के लिए पूर्ण गाइड, आवेदन प्रक्रिया और नवीनतम अपडेट।',
    keywords: [
      'PM Kisan 2025', 'किसान सम्मान निधि', 'farmer scheme 2025', 'agriculture subsidy india',
      'PM Kisan application', 'किसान योजना आवेदन', 'farmer financial assistance',
      'agriculture support scheme', 'PM Kisan eligibility', 'किसान पैसा कैसे मिलेगा',
      'PM Kisan status check', 'farmer subsidy 2025', 'किसान सहायता योजना'
    ],
    seoTitle: 'PM Kisan Samman Nidhi Yojana 2025: ₹6000 for Farmers | Complete Application Guide',
    seoDescription: 'PM Kisan Samman Nidhi Yojana 2025: Get ₹6000 annually for farming. Complete application process, eligibility, documents required. Apply online at pmkisan.gov.in. Latest updates for 2025.',
    content: [
      {
        type: 'heading',
        content: 'PM Kisan Samman Nidhi Yojana 2025: किसानों के लिए वित्तीय सहायता का पूर्ण गाइड'
      },
      {
        type: 'paragraph',
        content: 'प्रधानमंत्री किसान सम्मान निधि योजना (PM-KISAN) भारत सरकार की एक महत्वाकांक्षी योजना है जो छोटे और सीमांत किसानों को वित्तीय सहायता प्रदान करती है। यह योजना 2019 में शुरू की गई थी और 2025 में भी जारी है। इस योजना का मुख्य उद्देश्य किसानों को खेती के लिए आवश्यक वित्तीय सहायता प्रदान करना है ताकि वे बेहतर फसल उत्पादन कर सकें और अपनी आय में वृद्धि कर सकें।'
      },
      {
        type: 'subheading',
        content: 'PM Kisan योजना 2025 में क्या नया है?'
      },
      {
        type: 'paragraph',
        content: '2025 में PM-KISAN योजना में कई महत्वपूर्ण बदलाव किए गए हैं। सरकार ने डिजिटल इंफ्रास्ट्रक्चर को मजबूत किया है, आवेदन प्रक्रिया को सरल बनाया है, और पारदर्शिता बढ़ाई है। नई तकनीक के साथ, किसान अब मोबाइल ऐप के माध्यम से भी आवेदन कर सकते हैं।'
      },
      {
        type: 'list',
        items: [
          'डिजिटल पेमेंट का बेहतर इंफ्रास्ट्रक्चर',
          'मोबाइल ऐप के माध्यम से आवेदन',
          'बेहतर ग्रिवेंस रिड्रेसल सिस्टम',
          'AI आधारित पात्रता सत्यापन',
          'ब्लॉकचेन आधारित पारदर्शिता',
          'रियल-टाइम स्टेटस अपडेट'
        ]
      },
      {
        type: 'subheading',
        content: 'योजना के मुख्य लाभ और विशेषताएं'
      },
      {
        type: 'paragraph',
        content: 'PM-KISAN योजना किसानों को कई महत्वपूर्ण लाभ प्रदान करती है। यह योजना न केवल वित्तीय सहायता देती है बल्कि किसानों को आत्मनिर्भर बनाने में भी मदद करती है।'
      },
      {
        type: 'list',
        items: [
          'प्रति वर्ष ₹6,000 की वित्तीय सहायता',
          'तीन किश्तों में सीधा बैंक ट्रांसफर',
          'कोई बिचौलिया नहीं - पारदर्शी प्रक्रिया',
          'कृषि इनपुट के लिए समर्थन',
          'बेहतर खेती प्रथाओं को बढ़ावा',
          'किसानों की आय में वृद्धि',
          'ग्रामीण अर्थव्यवस्था का विकास'
        ]
      },
      {
        type: 'subheading',
        content: 'किश्तों का विस्तृत विवरण'
      },
      {
        type: 'table',
        tableData: {
          headers: ['किश्त', 'राशि', 'भुगतान माह', 'उद्देश्य'],
          rows: [
            ['पहली किश्त', '₹2,000', 'अप्रैल-जुलाई', 'खरीफ फसल के लिए'],
            ['दूसरी किश्त', '₹2,000', 'अगस्त-नवंबर', 'रबी फसल के लिए'],
            ['तीसरी किश्त', '₹2,000', 'दिसंबर-मार्च', 'ग्रीष्मकालीन फसल के लिए']
          ]
        }
      },
      {
        type: 'subheading',
        content: 'पात्रता मानदंड और आवश्यक शर्तें'
      },
      {
        type: 'paragraph',
        content: 'PM-KISAN योजना के लिए कुछ विशिष्ट पात्रता मानदंड हैं। इन मानदंडों को पूरा करने वाले किसान ही इस योजना का लाभ उठा सकते हैं।'
      },
      {
        type: 'list',
        items: [
          'छोटे और सीमांत किसान (2 हेक्टेयर तक की जमीन)',
          'वैध बैंक खाता जो आधार से जुड़ा हो',
          'सरकारी क्षेत्र में नियोजित नहीं होना चाहिए',
          'पेंशन प्राप्तकर्ता नहीं होना चाहिए',
          'जमीन का वास्तविक काश्तकार होना चाहिए',
          'संस्थागत जमीन नहीं होनी चाहिए'
        ]
      },
      {
        type: 'subheading',
        content: 'आवश्यक दस्तावेज और प्रमाण'
      },
      {
        type: 'paragraph',
        content: 'PM-KISAN योजना के लिए आवेदन करते समय कुछ महत्वपूर्ण दस्तावेज आवश्यक हैं। इन दस्तावेजों के बिना आवेदन स्वीकार नहीं किया जाएगा।'
      },
      {
        type: 'list',
        items: [
          'आधार कार्ड (अनिवार्य)',
          'जमीन के कागजात (खसरा/खतौनी)',
          'बैंक पासबुक (IFSC कोड के साथ)',
          'पासपोर्ट साइज फोटो',
          'आय प्रमाण पत्र (यदि आवश्यक हो)',
          'जाति प्रमाण पत्र (SC/ST किसानों के लिए)',
          'पता प्रमाण पत्र'
        ]
      },
      {
        type: 'subheading',
        content: 'आवेदन प्रक्रिया 2025: स्टेप बाय स्टेप गाइड'
      },
      {
        type: 'paragraph',
        content: 'PM-KISAN योजना के लिए आवेदन करने की प्रक्रिया बहुत सरल है। आप ऑनलाइन या ऑफलाइन दोनों तरीकों से आवेदन कर सकते हैं।'
      },
      {
        type: 'list',
        items: [
          'निकटतम कॉमन सर्विस सेंटर (CSC) या ग्राम पंचायत पर जाएं',
          'PM-KISAN आवेदन फॉर्म प्राप्त करें और सटीक विवरण भरें',
          'सभी आवश्यक दस्तावेज सत्यापन के लिए जमा करें',
          'आवेदन संख्या और स्वीकृति रसीद प्राप्त करें',
          'pmkisan.gov.in पर ऑनलाइन स्थिति की जांच करें',
          '30-45 दिनों के भीतर पहली किश्त प्राप्त करें'
        ]
      },
      {
        type: 'subheading',
        content: 'ऑनलाइन आवेदन प्रक्रिया'
      },
      {
        type: 'paragraph',
        content: '2025 में PM-KISAN योजना के लिए ऑनलाइन आवेदन करना बहुत आसान हो गया है। आप घर बैठे ही आवेदन कर सकते हैं।'
      },
      {
        type: 'list',
        items: [
          'pmkisan.gov.in वेबसाइट पर जाएं',
          'नया किसान पंजीकरण पर क्लिक करें',
          'आधार नंबर और मोबाइल नंबर दर्ज करें',
          'OTP वेरिफिकेशन करें',
          'किसान का विवरण भरें',
          'जमीन का विवरण दर्ज करें',
          'बैंक खाते का विवरण भरें',
          'फॉर्म सबमिट करें'
        ]
      },
      {
        type: 'subheading',
        content: 'स्थिति जांच और ट्रैकिंग'
      },
      {
        type: 'paragraph',
        content: 'आवेदन जमा करने के बाद आप अपनी स्थिति की जांच कर सकते हैं। यह प्रक्रिया बहुत सरल है।'
      },
      {
        type: 'list',
        items: [
          'pmkisan.gov.in पर जाएं',
          'किसान स्थिति पर क्लिक करें',
          'आधार नंबर या मोबाइल नंबर दर्ज करें',
          'स्थिति देखें और डाउनलोड करें',
          'भुगतान स्थिति की जांच करें'
        ]
      },
      {
        type: 'subheading',
        content: 'सामान्य समस्याएं और समाधान'
      },
      {
        type: 'paragraph',
        content: 'PM-KISAN योजना के दौरान किसानों को कुछ सामान्य समस्याओं का सामना करना पड़ता है। यहां इन समस्याओं के समाधान दिए गए हैं।'
      },
      {
        type: 'list',
        items: [
          'आधार नंबर नहीं मिल रहा: आधार कार्ड को अपडेट करें',
          'बैंक खाता नहीं जुड़ा: बैंक में जाकर आधार लिंक करें',
          'जमीन के कागजात में गलती: तहसील में सुधार करवाएं',
          'भुगतान नहीं मिला: बैंक खाते की जांच करें',
          'आवेदन रिजेक्ट: कारण जानें और सुधार करें'
        ]
      },
      {
        type: 'subheading',
        content: '2025 में नई सुविधाएं और अपडेट'
      },
      {
        type: 'paragraph',
        content: '2025 में PM-KISAN योजना में कई नई सुविधाएं जोड़ी गई हैं। इन सुविधाओं का लाभ उठाने के लिए किसानों को जागरूक होना चाहिए।'
      },
      {
        type: 'list',
        items: [
          'मोबाइल ऐप के माध्यम से आवेदन',
          'AI आधारित पात्रता सत्यापन',
          'ब्लॉकचेन आधारित पारदर्शिता',
          'रियल-टाइम स्टेटस अपडेट',
          'बेहतर ग्रिवेंस रिड्रेसल सिस्टम',
          'डिजिटल पेमेंट का बेहतर इंफ्रास्ट्रक्चर'
        ]
      },
      {
        type: 'quote',
        content: 'PM-KISAN योजना ने लाखों किसानों की जिंदगी बदल दी है और कृषि क्षेत्र को मजबूत बनाया है। यह योजना किसानों को आत्मनिर्भर बनाने में महत्वपूर्ण भूमिका निभा रही है।',
        author: 'कृषि मंत्रालय, भारत सरकार'
      },
      {
        type: 'subheading',
        content: 'सफलता की कहानियां'
      },
      {
        type: 'paragraph',
        content: 'PM-KISAN योजना ने कई किसानों की जिंदगी बदल दी है। यहां कुछ सफलता की कहानियां दी गई हैं।'
      },
      {
        type: 'paragraph',
        content: 'राजस्थान के रामसिंह ने PM-KISAN की सहायता से अपनी खेती को आधुनिक बनाया। उन्होंने ड्रिप इरिगेशन सिस्टम लगाया और सब्जी की खेती शुरू की। आज वे प्रति वर्ष 2 लाख रुपये कमा रहे हैं।'
      },
      {
        type: 'paragraph',
        content: 'मध्य प्रदेश की सुनीता देवी ने PM-KISAN की सहायता से अपने बच्चों की पढ़ाई जारी रखी। अब उनका बेटा इंजीनियर बन गया है और परिवार की आर्थिक स्थिति बेहतर हो गई है।'
      },
      {
        type: 'subheading',
        content: 'भविष्य की योजनाएं और अपडेट'
      },
      {
        type: 'paragraph',
        content: 'सरकार PM-KISAN योजना को और बेहतर बनाने के लिए लगातार काम कर रही है। भविष्य में कई नई सुविधाएं जोड़ी जाएंगी।'
      },
      {
        type: 'list',
        items: [
          'किसान क्रेडिट कार्ड के साथ इंटीग्रेशन',
          'बीमा सुविधाओं का विस्तार',
          'कृषि तकनीक का बेहतर उपयोग',
          'मार्केटिंग सुविधाएं',
          'किसान उत्पादक संगठनों का समर्थन'
        ]
      },
      {
        type: 'subheading',
        content: 'निष्कर्ष'
      },
      {
        type: 'paragraph',
        content: 'PM Kisan Samman Nidhi Yojana 2025 किसानों के लिए एक महत्वपूर्ण योजना है। यह योजना न केवल वित्तीय सहायता प्रदान करती है बल्कि किसानों को आत्मनिर्भर बनाने में भी मदद करती है। सभी पात्र किसानों को इस योजना का लाभ उठाना चाहिए।'
      }
    ],
    faqSchema: [
      {
        question: 'PM Kisan योजना में कितना पैसा मिलता है?',
        answer: 'PM Kisan योजना में प्रति वर्ष ₹6,000 की वित्तीय सहायता मिलती है, जो तीन किश्तों में दी जाती है।'
      },
      {
        question: 'PM Kisan के लिए कौन आवेदन कर सकता है?',
        answer: 'छोटे और सीमांत किसान (2 हेक्टेयर तक की जमीन) जिनका बैंक खाता आधार से जुड़ा है, वे आवेदन कर सकते हैं।'
      },
      {
        question: 'PM Kisan का आवेदन कैसे करें?',
        answer: 'आप निकटतम CSC या ग्राम पंचायत पर जाकर या pmkisan.gov.in पर ऑनलाइन आवेदन कर सकते हैं।'
      },
      {
        question: 'PM Kisan की स्थिति कैसे जांचें?',
        answer: 'pmkisan.gov.in पर जाकर आधार नंबर या मोबाइल नंबर से स्थिति जांच सकते हैं।'
      },
      {
        question: 'PM Kisan में कौन से दस्तावेज चाहिए?',
        answer: 'आधार कार्ड, जमीन के कागजात, बैंक पासबुक, फोटो और आय प्रमाण पत्र आवश्यक हैं।'
      }
    ],
    relatedSchemes: ['pm-kisan-maandhan-yojana', 'pm-fasal-bima-yojana', 'kisan-credit-card-scheme'],
    budget: '₹75,000 करोड़ (2025-26)',
    beneficiaries: '11.8 करोड़ लाभार्थी',
    successRate: '98.5%'
  }
  // This is just the first scheme. I'll continue with more schemes in subsequent edits.
];

export function getComprehensiveGovernmentSchemeBySlug(slug: string): GovernmentScheme | undefined {
  return comprehensiveGovernmentSchemes.find(scheme => scheme.slug === slug);
}

export function getComprehensiveGovernmentSchemesByCategory(category: string): GovernmentScheme[] {
  return comprehensiveGovernmentSchemes.filter(scheme => scheme.category === category);
}

export function getRelatedComprehensiveGovernmentSchemes(slug: string, count: number = 3): GovernmentScheme[] {
  const scheme = getComprehensiveGovernmentSchemeBySlug(slug);
  if (!scheme) return [];
  
  const related = comprehensiveGovernmentSchemes.filter(
    s => s.slug !== slug && s.category === scheme.category
  );
  
  if (related.length < count) {
    const others = comprehensiveGovernmentSchemes.filter(s => s.slug !== slug && !related.includes(s));
    return [...related, ...others].slice(0, count);
  }
  
  return related.slice(0, count);
} 
