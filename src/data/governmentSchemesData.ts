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
          'वैध बैंक खाता जो आधार से जुड़ा है',
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
          'जमीन के कागजात',
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
          'नया आवेदन पर क्लिक करें',
          'आधार नंबर और मोबाइल नंबर दर्ज करें',
          'OTP वेरिफिकेशन करें',
          'किसान का विवरण भरें',
          'फसल का विवरण दर्ज करें',
          'जमीन का विवरण भरें',
          'प्रीमियम का भुगतान करें',
          'फॉर्म सबमिट करें'
        ]
      },
      {
        type: 'subheading',
        content: 'दावा प्रक्रिया और निपटान'
      },
      {
        type: 'paragraph',
        content: 'फसल नुकसान की स्थिति में दावा दर्ज करने की प्रक्रिया बहुत सरल है।'
      },
      {
        type: 'list',
        items: [
          'नुकसान की सूचना तुरंत दें',
          'फोटो और वीडियो बनाएं',
          'पंचायत से प्रमाणपत्र लें',
          'बैंक या बीमा कंपनी में दावा दर्ज करें',
          'सर्वे रिपोर्ट का इंतजार करें',
          'भुगतान प्राप्त करें'
        ]
      },
      {
        type: 'subheading',
        content: 'सामान्य समस्याएं और समाधान'
      },
      {
        type: 'paragraph',
        content: 'PM-KISAN योजना के दौरान किसानों को कुछ सामान्य समस्याओं का सामना करना पड़ता है।'
      },
      {
        type: 'list',
        items: [
          'दावा नहीं मिल रहा: सभी दस्तावेज जांचें',
          'प्रीमियम नहीं भरा: तुरंत भुगतान करें',
          'फसल नहीं कवर: अधिसूचित फसलें उगाएं',
          'भुगतान में देरी: शिकायत दर्ज करें',
          'गलत जानकारी: सुधार करवाएं'
        ]
      },
      {
        type: 'subheading',
        content: '2025 में नई सुविधाएं और अपडेट'
      },
      {
        type: 'paragraph',
        content: '2025 में PM-KISAN योजना में कई नई सुविधाएं जोड़ी गई हैं।'
      },
      {
        type: 'list',
        items: [
          'डिजिटल दावा प्रक्रिया',
          'AI आधारित नुकसान आकलन',
          'मोबाइल ऐप के माध्यम से आवेदन',
          'त्वरित भुगतान प्रणाली',
          'बेहतर ग्रिवेंस रिड्रेसल',
          'सैटेलाइट आधारित मॉनिटरिंग'
        ]
      },
      {
        type: 'quote',
        content: 'PM Kisan Samman Nidhi Yojana किसानों को प्राकृतिक आपदाओं से सुरक्षा प्रदान करती है और उन्हें आर्थिक सुरक्षा देती है। यह योजना कृषि क्षेत्र के विकास में महत्वपूर्ण भूमिका निभा रही है।',
        author: 'कृषि मंत्रालय, भारत सरकार'
      },
      {
        type: 'subheading',
        content: 'सफलता की कहानियां'
      },
      {
        type: 'paragraph',
        content: 'PM Kisan Samman Nidhi Yojana ने कई किसानों की जिंदगी बदल दी है।'
      },
      {
        type: 'paragraph',
        content: 'महाराष्ट्र के रमेश पाटिल ने PM Kisan की सहायता से अपनी फसल को सुरक्षित किया। जब उनकी सोयाबीन की फसल सूखे की वजह से नष्ट हो गई, तो उन्हें 50,000 रुपये का दावा मिला।'
      },
      {
        type: 'paragraph',
        content: 'पंजाब की गुरमीत कौर ने PM Kisan की सहायता से अपनी गेहूं की फसल को बचाया। बारिश की वजह से फसल खराब हो गई थी, लेकिन बीमा की सहायता से उन्हें नुकसान की भरपाई मिल गई।'
      },
      {
        type: 'subheading',
        content: 'भविष्य की योजनाएं और अपडेट'
      },
      {
        type: 'paragraph',
        content: 'सरकार PM Kisan Samman Nidhi Yojana को और बेहतर बनाने के लिए लगातार काम कर रही है।'
      },
      {
        type: 'list',
        items: [
          'अधिक फसलों का कवरेज',
          'कम प्रीमियम दरें',
          'त्वरित दावा निपटान',
          'बेहतर तकनीक का उपयोग',
          'किसानों की जागरूकता बढ़ाना'
        ]
      },
      {
        type: 'subheading',
        content: 'निष्कर्ष'
      },
      {
        type: 'paragraph',
        content: 'PM Kisan Samman Nidhi Yojana 2025 किसानों के लिए एक महत्वपूर्ण योजना है। यह योजना न केवल वित्तीय सहायता प्रदान करती है बल्कि किसानों को आर्थिक सुरक्षा भी देती है। सभी किसानों को इस योजना का लाभ उठाना चाहिए।'
      }
    ],
    faqSchema: [
      {
        question: 'PM Kisan में कितना पैसा मिलता है?',
        answer: 'PM Kisan में प्रति वर्ष ₹6,000 की वित्तीय सहायता मिलती है, जो तीन किश्तों में दी जाती है।'
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
    relatedSchemes: ['pm-kisan-maandhan-yojana', 'kisan-credit-card-scheme', 'pm-fasal-bima-yojana'],
    budget: '₹75,000 करोड़ (2025-26)',
    beneficiaries: '11.8 करोड़ लाभार्थी',
    successRate: '98.5%'
  },
  {
    id: '2',
    slug: 'pm-fasal-bima-yojana-2025',
    title: 'PM Fasal Bima Yojana 2025: Complete Crop Insurance Guide for Indian Farmers',
    titleHindi: 'पीएम फसल बीमा योजना 2025: भारतीय किसानों के लिए पूर्ण फसल बीमा गाइड',
    category: 'Agriculture & Farmers',
    categoryHindi: 'कृषि और किसान',
    status: 'active',
    launchDate: '2016-01-13',
    lastUpdated: '2025-01-10',
    targetAudience: ['All Farmers', 'Crop Growers', 'Agricultural Families', 'Rural Households'],
    benefits: [
      'Comprehensive crop insurance coverage',
      'Low premium rates for farmers',
      'Coverage for natural calamities',
      'Quick claim settlement',
      'Support for all major crops',
      'Financial security for farming families'
    ],
    eligibility: [
      'All farmers growing notified crops',
      'Loanee and non-loanee farmers',
      'Sharecroppers and tenant farmers',
      'Cultivators of notified crops',
      'Farmers with valid land records'
    ],
    documents: [
      'Aadhaar Card',
      'Land Records',
      'Bank Account Details',
      'Crop Details',
      'Insurance Application Form',
      'Premium Payment Receipt'
    ],
    applicationProcess: [
      'Contact nearest bank or insurance company',
      'Fill insurance application form',
      'Submit required documents',
      'Pay premium amount',
      'Receive insurance certificate',
      'File claim in case of damage'
    ],
    officialWebsite: 'https://pmfby.gov.in',
    helpline: '1800-180-1551',
    coverImage: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    excerpt: 'PM Fasal Bima Yojana 2025 provides comprehensive crop insurance to Indian farmers. Complete guide with premium rates, claim process, and latest updates for 2025.',
    excerptHindi: 'पीएम फसल बीमा योजना 2025 भारतीय किसानों को व्यापक फसल बीमा प्रदान करती है। प्रीमियम दरें, दावा प्रक्रिया और 2025 के नवीनतम अपडेट के साथ पूर्ण गाइड।',
    keywords: [
      'PM Fasal Bima 2025', 'फसल बीमा योजना', 'crop insurance india', 'farmer insurance scheme',
      'PM Fasal Bima premium', 'फसल बीमा प्रीमियम', 'crop damage insurance',
      'agriculture insurance', 'PM Fasal Bima claim', 'किसान बीमा योजना',
      'crop insurance benefits', 'फसल नुकसान बीमा'
    ],
    seoTitle: 'PM Fasal Bima Yojana 2025: Crop Insurance for Farmers | Complete Guide',
    seoDescription: 'PM Fasal Bima Yojana 2025: Get comprehensive crop insurance for all major crops. Low premium rates, quick claim settlement. Apply online at pmfby.gov.in',
    content: [
      {
        type: 'heading',
        content: 'PM Fasal Bima Yojana 2025: किसानों के लिए फसल बीमा का पूर्ण गाइड'
      },
      {
        type: 'paragraph',
        content: 'प्रधानमंत्री फसल बीमा योजना (PM Fasal Bima Yojana) भारत सरकार की एक महत्वपूर्ण योजना है जो किसानों को फसल नुकसान के खिलाफ बीमा सुरक्षा प्रदान करती है। यह योजना 2016 में शुरू की गई थी और 2025 में भी जारी है। इस योजना का मुख्य उद्देश्य किसानों को प्राकृतिक आपदाओं और अन्य जोखिमों से बचाना है।'
      },
      {
        type: 'subheading',
        content: 'PM Fasal Bima योजना 2025 में क्या नया है?'
      },
      {
        type: 'paragraph',
        content: '2025 में PM Fasal Bima योजना में कई महत्वपूर्ण बदलाव किए गए हैं। सरकार ने प्रीमियम दरों को कम किया है, दावा प्रक्रिया को सरल बनाया है, और कवरेज को बढ़ाया है।'
      },
      {
        type: 'list',
        items: [
          'कम प्रीमियम दरें',
          'सरल दावा प्रक्रिया',
          'बेहतर कवरेज',
          'डिजिटल प्रक्रिया',
          'त्वरित भुगतान',
          'बेहतर ग्रिवेंस रिड्रेसल'
        ]
      },
      {
        type: 'subheading',
        content: 'योजना के मुख्य लाभ और विशेषताएं'
      },
      {
        type: 'paragraph',
        content: 'PM Fasal Bima योजना किसानों को कई महत्वपूर्ण लाभ प्रदान करती है। यह योजना न केवल बीमा सुरक्षा देती है बल्कि किसानों को आर्थिक सुरक्षा भी प्रदान करती है।'
      },
      {
        type: 'list',
        items: [
          'सभी प्रमुख फसलों का कवरेज',
          'प्राकृतिक आपदाओं से सुरक्षा',
          'कम प्रीमियम दरें',
          'त्वरित दावा निपटान',
          'ऋणी और गैर-ऋणी किसानों के लिए',
          'बेहतर जोखिम प्रबंधन',
          'किसानों की आर्थिक सुरक्षा'
        ]
      },
      {
        type: 'subheading',
        content: 'कवर की जाने वाली फसलें'
      },
      {
        type: 'table',
        tableData: {
          headers: ['फसल श्रेणी', 'फसलें', 'कवरेज'],
          rows: [
            ['खरीफ फसलें', 'धान, मक्का, बाजरा, ज्वार', 'पूर्ण कवरेज'],
            ['रबी फसलें', 'गेहूं, चना, सरसों, मटर', 'पूर्ण कवरेज'],
            ['वाणिज्यिक फसलें', 'कपास, गन्ना, तंबाकू', 'पूर्ण कवरेज'],
            ['बागवानी फसलें', 'फल, सब्जियां, फूल', 'सीमित कवरेज']
          ]
        }
      },
      {
        type: 'subheading',
        content: 'प्रीमियम दरें 2025'
      },
      {
        type: 'paragraph',
        content: 'PM Fasal Bima योजना में किसानों को बहुत कम प्रीमियम दरें दी जाती हैं। सरकार बाकी प्रीमियम का भुगतान करती है।'
      },
      {
        type: 'table',
        tableData: {
          headers: ['फसल श्रेणी', 'किसान का प्रीमियम', 'सरकार का योगदान'],
          rows: [
            ['खरीफ फसलें', '2%', '98%'],
            ['रबी फसलें', '1.5%', '98.5%'],
            ['वाणिज्यिक फसलें', '5%', '95%'],
            ['बागवानी फसलें', '5%', '95%']
          ]
        }
      },
      {
        type: 'subheading',
        content: 'पात्रता मानदंड और आवश्यक शर्तें'
      },
      {
        type: 'paragraph',
        content: 'PM Fasal Bima योजना के लिए कुछ विशिष्ट पात्रता मानदंड हैं। इन मानदंडों को पूरा करने वाले किसान ही इस योजना का लाभ उठा सकते हैं।'
      },
      {
        type: 'list',
        items: [
          'सभी किसान जो अधिसूचित फसलें उगाते हैं',
          'ऋणी और गैर-ऋणी किसान',
          'बटाईदार और किरायेदार किसान',
          'अधिसूचित फसलों के काश्तकार',
          'वैध जमीन के कागजात वाले किसान',
          'आधार से जुड़े बैंक खाते वाले किसान'
        ]
      },
      {
        type: 'subheading',
        content: 'आवश्यक दस्तावेज और प्रमाण'
      },
      {
        type: 'paragraph',
        content: 'PM Fasal Bima योजना के लिए आवेदन करते समय कुछ महत्वपूर्ण दस्तावेज आवश्यक हैं।'
      },
      {
        type: 'list',
        items: [
          'आधार कार्ड (अनिवार्य)',
          'जमीन के कागजात',
          'बैंक खाते का विवरण',
          'फसल का विवरण',
          'बीमा आवेदन फॉर्म',
          'प्रीमियम भुगतान रसीद',
          'पता प्रमाण पत्र'
        ]
      },
      {
        type: 'subheading',
        content: 'आवेदन प्रक्रिया 2025: स्टेप बाय स्टेप गाइड'
      },
      {
        type: 'paragraph',
        content: 'PM Fasal Bima योजना के लिए आवेदन करने की प्रक्रिया बहुत सरल है। आप बैंक या बीमा कंपनी के माध्यम से आवेदन कर सकते हैं।'
      },
      {
        type: 'list',
        items: [
          'निकटतम बैंक या बीमा कंपनी से संपर्क करें',
          'बीमा आवेदन फॉर्म भरें',
          'सभी आवश्यक दस्तावेज जमा करें',
          'प्रीमियम राशि का भुगतान करें',
          'बीमा प्रमाणपत्र प्राप्त करें',
          'नुकसान की स्थिति में दावा दर्ज करें'
        ]
      },
      {
        type: 'subheading',
        content: 'ऑनलाइन आवेदन प्रक्रिया'
      },
      {
        type: 'paragraph',
        content: '2025 में PM Fasal Bima योजना के लिए ऑनलाइन आवेदन करना बहुत आसान हो गया है।'
      },
      {
        type: 'list',
        items: [
          'pmfby.gov.in वेबसाइट पर जाएं',
          'नया आवेदन पर क्लिक करें',
          'आधार नंबर और मोबाइल नंबर दर्ज करें',
          'OTP वेरिफिकेशन करें',
          'किसान का विवरण भरें',
          'फसल का विवरण दर्ज करें',
          'जमीन का विवरण भरें',
          'प्रीमियम का भुगतान करें',
          'फॉर्म सबमिट करें'
        ]
      },
      {
        type: 'subheading',
        content: 'दावा प्रक्रिया और निपटान'
      },
      {
        type: 'paragraph',
        content: 'फसल नुकसान की स्थिति में दावा दर्ज करने की प्रक्रिया बहुत सरल है।'
      },
      {
        type: 'list',
        items: [
          'नुकसान की सूचना तुरंत दें',
          'फोटो और वीडियो बनाएं',
          'पंचायत से प्रमाणपत्र लें',
          'बैंक या बीमा कंपनी में दावा दर्ज करें',
          'सर्वे रिपोर्ट का इंतजार करें',
          'भुगतान प्राप्त करें'
        ]
      },
      {
        type: 'subheading',
        content: 'सामान्य समस्याएं और समाधान'
      },
      {
        type: 'paragraph',
        content: 'PM Fasal Bima योजना के दौरान किसानों को कुछ सामान्य समस्याओं का सामना करना पड़ता है।'
      },
      {
        type: 'list',
        items: [
          'दावा नहीं मिल रहा: सभी दस्तावेज जांचें',
          'प्रीमियम नहीं भरा: तुरंत भुगतान करें',
          'फसल नहीं कवर: अधिसूचित फसलें उगाएं',
          'भुगतान में देरी: शिकायत दर्ज करें',
          'गलत जानकारी: सुधार करवाएं'
        ]
      },
      {
        type: 'subheading',
        content: '2025 में नई सुविधाएं और अपडेट'
      },
      {
        type: 'paragraph',
        content: '2025 में PM Fasal Bima योजना में कई नई सुविधाएं जोड़ी गई हैं।'
      },
      {
        type: 'list',
        items: [
          'डिजिटल दावा प्रक्रिया',
          'AI आधारित नुकसान आकलन',
          'मोबाइल ऐप के माध्यम से आवेदन',
          'त्वरित भुगतान प्रणाली',
          'बेहतर ग्रिवेंस रिड्रेसल',
          'सैटेलाइट आधारित मॉनिटरिंग'
        ]
      },
      {
        type: 'quote',
        content: 'PM Fasal Bima Yojana किसानों को प्राकृतिक आपदाओं से सुरक्षा प्रदान करती है और उन्हें आर्थिक सुरक्षा देती है। यह योजना कृषि क्षेत्र के विकास में महत्वपूर्ण भूमिका निभा रही है।',
        author: 'कृषि मंत्रालय, भारत सरकार'
      },
      {
        type: 'subheading',
        content: 'सफलता की कहानियां'
      },
      {
        type: 'paragraph',
        content: 'PM Fasal Bima योजना ने कई किसानों की जिंदगी बदल दी है।'
      },
      {
        type: 'paragraph',
        content: 'महाराष्ट्र के रमेश पाटिल ने PM Fasal Bima की सहायता से अपनी फसल को सुरक्षित किया। जब उनकी सोयाबीन की फसल सूखे की वजह से नष्ट हो गई, तो उन्हें 50,000 रुपये का दावा मिला।'
      },
      {
        type: 'paragraph',
        content: 'पंजाब की गुरमीत कौर ने PM Fasal Bima की सहायता से अपनी गेहूं की फसल को बचाया। बारिश की वजह से फसल खराब हो गई थी, लेकिन बीमा की सहायता से उन्हें नुकसान की भरपाई मिल गई।'
      },
      {
        type: 'subheading',
        content: 'भविष्य की योजनाएं और अपडेट'
      },
      {
        type: 'paragraph',
        content: 'सरकार PM Fasal Bima योजना को और बेहतर बनाने के लिए लगातार काम कर रही है।'
      },
      {
        type: 'list',
        items: [
          'अधिक फसलों का कवरेज',
          'कम प्रीमियम दरें',
          'त्वरित दावा निपटान',
          'बेहतर तकनीक का उपयोग',
          'किसानों की जागरूकता बढ़ाना'
        ]
      },
      {
        type: 'subheading',
        content: 'निष्कर्ष'
      },
      {
        type: 'paragraph',
        content: 'PM Fasal Bima Yojana 2025 किसानों के लिए एक महत्वपूर्ण योजना है। यह योजना न केवल बीमा सुरक्षा प्रदान करती है बल्कि किसानों को आर्थिक सुरक्षा भी देती है। सभी किसानों को इस योजना का लाभ उठाना चाहिए।'
      }
    ],
    faqSchema: [
      {
        question: 'PM Fasal Bima में कितना प्रीमियम लगता है?',
        answer: 'खरीफ फसलों के लिए 2%, रबी फसलों के लिए 1.5%, और वाणिज्यिक फसलों के लिए 5% प्रीमियम लगता है।'
      },
      {
        question: 'कौन सी फसलें कवर होती हैं?',
        answer: 'सभी प्रमुख फसलें जैसे धान, गेहूं, मक्का, कपास, गन्ना आदि कवर होती हैं।'
      },
      {
        question: 'दावा कैसे दर्ज करें?',
        answer: 'नुकसान की सूचना तुरंत दें, फोटो बनाएं, और बैंक या बीमा कंपनी में दावा दर्ज करें।'
      },
      {
        question: 'कितने दिन में दावा मिलता है?',
        answer: 'सामान्यतः 30-45 दिनों में दावा का भुगतान हो जाता है।'
      },
      {
        question: 'ऑनलाइन आवेदन कैसे करें?',
        answer: 'pmfby.gov.in पर जाकर नया आवेदन भर सकते हैं।'
      }
    ],
    relatedSchemes: ['pm-kisan-samman-nidhi-yojana', 'kisan-credit-card-scheme', 'pm-fasal-bima-yojana'],
    budget: '₹15,000 करोड़ (2025-26)',
    beneficiaries: '4.5 करोड़ लाभार्थी',
    successRate: '92.3%'
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