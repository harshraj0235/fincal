export interface ExcelToolBlogPostSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'list' | 'image' | 'quote';
  content?: string;
  items?: string[];
  url?: string;
  caption?: string;
  author?: string;
}

export interface ExcelToolBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
  authorImage?: string;
  authorTitle?: string;
  authorBio?: string;
  categories: string[];
  content: ExcelToolBlogPostSection[];
}

export const excelToolBlogPosts: ExcelToolBlogPost[] = [
  // 1. Budget & Expense Trackers
  {
    id: '1',
    slug: 'download-free-budget-planner-excel-hindi',
    title: 'डाउनलोड फ्री बजट प्लानर एक्सेल: घर का बजट बनाने का सबसे आसान तरीका',
    excerpt: 'अपने खर्चों को ट्रैक करें और फाइनेंशियल फ्रीडम की ओर बढ़ें – फ्री बजट प्लानर एक्सेल टेम्पलेट हिंदी में डाउनलोड करें।',
    coverImage: '/images/budget-planner-excel-hindi.jpg',
    date: '2024-06-18',
    author: 'Amit Sharma',
    authorImage: '',
    authorTitle: 'वित्तीय सलाहकार',
    authorBio: 'अमित शर्मा 12 वर्षों से भारतीय परिवारों को बजट और निवेश सलाह देते हैं।',
    categories: ['Budget & Expense Trackers'],
    content: [
      { type: 'heading', content: 'परिचय: बजट प्लानिंग क्यों जरूरी है?' },
      { type: 'paragraph', content: 'आज के समय में सही बजट बनाना हर परिवार के लिए जरूरी है। बजट प्लानर एक्सेल टेम्पलेट आपके खर्च और बचत को ट्रैक करने में मदद करता है। इस लेख में आपको स्टेप-बाय-स्टेप गाइड मिलेगा कि कैसे एक्सेल में बजट बनाएं, कैसे एक्सेल टेम्पलेट डाउनलोड करें और कैसे अपने खर्चों को मैनेज करें।' },
      { type: 'heading', content: 'फ्री बजट प्लानर एक्सेल कैसे डाउनलोड करें?' },
      { type: 'paragraph', content: 'नीचे दिए गए लिंक से आप फ्री बजट प्लानर एक्सेल टेम्पलेट डाउनलोड कर सकते हैं। इसमें ऑटो कैटेगरीज, चार्ट्स, मासिक/वार्षिक रिपोर्ट, और खर्च का एनालिसिस फीचर शामिल हैं।' },
      { type: 'list', items: [
        'सबसे पहले नीचे दिए गए डाउनलोड लिंक पर क्लिक करें।',
        'डाउनलोडेड फाइल को अपने कंप्यूटर/फोन में खोलें।',
        'अपनी इनकम और खर्च भरें।',
        'चार्ट्स और एनालिसिस अपने आप अपडेट हो जाएंगे।',
      ]},
      { type: 'heading', content: 'बजट प्लानर के फीचर्स' },
      { type: 'list', items: [
        'मासिक और वार्षिक बजट ट्रैकिंग',
        'आसान खर्च कैटेगरीज (घर, राशन, EMI, निवेश आदि)',
        'ऑटोमैटिक चार्ट्स और ग्राफ',
        'सेविंग्स और इनकम कंपैरिजन',
        'Hindi इंटरफेस, आसान फॉर्मूला',
        'फैमिली और पर्सनल दोनों के लिए',
        'मोबाइल और लैपटॉप दोनों पर इस्तेमाल करें',
      ]},
      { type: 'image', url: '/excel-screenshots/budget-tracker-hindi.jpg', caption: 'हिंदी बजट प्लानर एक्सेल का डेमो स्क्रीनशॉट' },
      { type: 'heading', content: 'Google Discover और SEO टिप्स: बजट प्लानर क्यों जरूरी है?' },
      { type: 'paragraph', content: 'गूगल पर बजट प्लानर एक्सेल हिंदी, फ्री बजट एक्सेल टेम्पलेट, घर का बजट कैसे बनाएं जैसे कीवर्ड्स पर यह आर्टिकल रैंक करने के लिए बनाया गया है। इसमें आपको सभी जरूरी जानकारी, डाउनलोड लिंक, और step-by-step video tutorial भी मिलेगा।' },
      { type: 'heading', content: 'डाउनलोड करें बजट प्लानर एक्सेल टेम्पलेट (Hindi)' },
      { type: 'paragraph', content: 'Excel टेम्पलेट डाउनलोड करने के लिए नीचे दिए गए बटन पर क्लिक करें:' },
      { type: 'list', items: [
        '[डाउनलोड बजट प्लानर एक्सेल फाइल (हिंदी)](/downloads/budget-planner-hindi.xlsx)',
        '[इंग्लिश वर्शन डाउनलोड करें](/downloads/budget-planner-english.xlsx)',
      ]},
      { type: 'heading', content: 'कैसे इस्तेमाल करें बजट प्लानर फाइल?' },
      { type: 'list', items: [
        'इनकम और खर्च के सभी कॉलम भरें',
        'अगर नया खर्च जोड़ना है, तो नई रो जोड़ें',
        'ऑटो चार्ट्स में अपना प्रोग्रेस देखें',
        'हर महीने सेविंग्स का ट्रैक रखें',
      ]},
      { type: 'paragraph', content: 'अगर आपके कोई सवाल हैं या और फीचर्स चाहिए, तो कमेंट करें या हमें ईमेल करें।' },
      { type: 'heading', content: 'निष्कर्ष: फाइनेंशियल फ्रीडम की ओर पहला कदम' },
      { type: 'paragraph', content: 'फ्री बजट प्लानर एक्सेल टेम्पलेट हिंदी में डाउनलोड करें, अपने खर्चों को ट्रैक करें, और अपने परिवार को आर्थिक रूप से मजबूत बनाएं।' },
      { type: 'paragraph', content: 'अन्य उपयोगी टूल्स: [SIP Calculator Excel](https://example.com/exceltool/sip-calculator-excel-template), [Home Loan EMI Calculator Excel](https://example.com/exceltool/home-loan-emi-calculator-excel), [Income Tax Guide PDF](https://example.com/exceltool/guide-to-filing-income-tax-returns-pdf)' }
    ]
  },
  // 2. Salary, Tax, Employee Tools
  {
    id: '2',
    slug: 'download-salary-slip-template-for-employees',
    title: 'डाउनलोड सैलरी स्लिप एक्सेल टेम्पलेट: कर्मचारियों के लिए फ्री सैलरी स्लिप फॉर्मेट',
    excerpt: 'HR और बिजनेस ओनर के लिए फ्री सैलरी स्लिप टेम्पलेट एक्सेल डाउनलोड करें – भारतीय कंपनियों के लिए बिल्कुल उपयुक्त।',
    coverImage: '/images/salary-slip-template-excel.jpg',
    date: '2024-06-18',
    author: 'Priya Verma',
    authorImage: '',
    authorTitle: 'HR Consultant',
    authorBio: 'प्रिया वर्मा HR और Payroll Solutions में विशेषज्ञ हैं।',
    categories: ['Salary, Tax, Employee Tools'],
    content: [
      { type: 'heading', content: 'फ्री सैलरी स्लिप एक्सेल टेम्पलेट क्यों जरूरी है?' },
      { type: 'paragraph', content: 'भारत में अधिकतर छोटे और मिडियम बिजनेस के लिए सैलरी स्लिप प्रोसेस आसान होना चाहिए। हमारा एक्सेल सैलरी स्लिप टेम्पलेट पूरी तरह से कस्टमाइजेबल है और सभी जरूरी डिटेल्स को कवर करता है।' },
      { type: 'heading', content: 'सैलरी स्लिप टेम्पलेट के मुख्य फीचर्स' },
      { type: 'list', items: [
        'ऑटो कैलकुलेशन (Basic, HRA, Allowances, Deductions)',
        'PF, ESI, TDS की गणना',
        'कर्मचारी और कंपनी डिटेल्स के लिए अलग सेक्शन',
        'PDF में सेव करें',
        'हिंदी और इंग्लिश दोनों में उपयोगी',
        'मासिक/वार्षिक रिपोर्ट',
      ]},
      { type: 'heading', content: 'कैसे डाउनलोड और इस्तेमाल करें?' },
      { type: 'paragraph', content: 'नीचे दिए गए लिंक से एक्सेल फाइल डाउनलोड करें, अपने एम्प्लॉई डिटेल्स भरें, और स्लिप जनरेट करें।' },
      { type: 'list', items: [
        '[डाउनलोड सैलरी स्लिप एक्सेल टेम्पलेट](/downloads/salary-slip-template.xlsx)'
      ]},
      { type: 'heading', content: 'SEO Tips: Salary Slip Format in Hindi, Excel Download' },
      { type: 'paragraph', content: 'यह पोस्ट salary slip format in excel, free salary slip template india, employee salary statement जैसे कीवर्ड्स के लिए SEO फ्रेंडली है।' }
    ]
  },
  // 3. Loan & EMI Calculators
  {
    id: '3',
    slug: 'download-home-loan-emi-calculator-excel',
    title: 'डाउनलोड होम लोन EMI कैलकुलेटर एक्सेल: ईएमआई कैसे निकालें?',
    excerpt: 'घर खरीदने की सोच रहे हैं? फ्री होम लोन EMI कैलकुलेटर एक्सेल टेम्पलेट हिंदी में डाउनलोड करें और अपनी EMI मिनटों में जानें।',
    coverImage: '/images/home-loan-emi-calculator-excel.jpg',
    date: '2024-06-18',
    author: 'Suresh Kumar',
    authorImage: '',
    authorTitle: 'Home Loan Advisor',
    authorBio: 'सुरेश कुमार 8+ वर्षों से होम लोन और फाइनेंसिंग सलाह दे रहे हैं।',
    categories: ['Loan & EMI Calculators'],
    content: [
      { type: 'heading', content: 'होम लोन EMI कैलकुलेटर क्यों जरूरी है?' },
      { type: 'paragraph', content: 'होम लोन लेने से पहले EMI जानना बहुत जरूरी है। हमारा एक्सेल EMI कैलकुलेटर आसान है और हिंदी में है।' },
      { type: 'heading', content: 'कैसे इस्तेमाल करें?' },
      { type: 'list', items: [
        'लोन अमाउंट, ब्याज दर, और टेन्योर भरें',
        'EMI और कुल भुगतान ऑटोमैटिक आ जाएगा',
        'चार्ट्स से ब्याज और मूलधन का ब्रेकडाउन देखें'
      ]},
      { type: 'paragraph', content: '[डाउनलोड EMI कैलकुलेटर एक्सेल](/downloads/home-loan-emi-calculator.xlsx)' }
    ]
  },
  // 4. Investment & Retirement Tools
  {
    id: '4',
    slug: 'download-sip-calculator-excel-template',
    title: 'SIP कैलकुलेटर एक्सेल टेम्पलेट डाउनलोड करें: निवेश की पूरी गणना हिंदी में',
    excerpt: 'SIP में निवेश करने वाले भारतीयों के लिए एकदम फ्री SIP कैलकुलेटर एक्सेल टेम्पलेट – हिंदी में गाइड और डाउनलोड लिंक।',
    coverImage: '/images/sip-calculator-excel.jpg',
    date: '2024-06-18',
    author: 'Manoj Singh',
    authorImage: '',
    authorTitle: 'Investment Advisor',
    authorBio: 'मनोज सिंह SIP और म्यूचुअल फंड्स पर सलाहकार हैं।',
    categories: ['Investment & Retirement Tools'],
    content: [
      { type: 'heading', content: 'SIP कैलकुलेटर क्या है?' },
      { type: 'paragraph', content: 'हर निवेशक को SIP (Systematic Investment Plan) की पूरी गणना करनी चाहिए। इस एक्सेल टेम्पलेट से आप SIP की पावर को समझ सकते हैं।' },
      { type: 'heading', content: 'फीचर्स' },
      { type: 'list', items: [
        'मंथली SIP इनपुट',
        'रिटर्न रेट सेट करें',
        'इन्वेस्टमेंट ड्यूरेशन चुनें',
        'ऑटोमैटिक फ्यूचर वैल्यू कैलकुलेशन',
        'ग्राफिकल रिपोर्ट'
      ]},
      { type: 'paragraph', content: '[डाउनलोड SIP कैलकुलेटर एक्सेल](/downloads/sip-calculator-excel.xlsx)' }
    ]
  },
  // 5. Business & Accounting Templates
  {
    id: '5',
    slug: 'download-invoice-generator-excel',
    title: 'इनवॉइस जेनरेटर एक्सेल टेम्पलेट डाउनलोड करें: बिज़नेस के लिए फ्री',
    excerpt: 'फ्री एक्सेल इनवॉइस जेनरेटर टेम्पलेट – छोटे बिज़नेस, फ्रीलांसर और स्टार्टअप्स के लिए उपयुक्त।',
    coverImage: '/images/invoice-generator-excel.jpg',
    date: '2024-06-18',
    author: 'Ritika Gupta',
    authorImage: '',
    authorTitle: 'Accountant',
    authorBio: 'रितिका गुप्ता अकाउंटिंग और GST में माहिर हैं।',
    categories: ['Business & Accounting Templates'],
    content: [
      { type: 'heading', content: 'इनवॉइस जेनरेटर एक्सेल के फायदे' },
      { type: 'list', items: [
        'कस्टम इनवॉइस नंबर',
        'GST/IGST/SGST ऑटो कैलकुलेशन',
        'क्लाइंट डिटेल एडिट करें',
        'PDF सेविंग',
        'मल्टीपल प्रोडक्ट्स लाइन',
        'हिंदी और इंग्लिश में सपोर्ट'
      ]},
      { type: 'paragraph', content: '[डाउनलोड इनवॉइस एक्सेल टेम्पलेट](/downloads/invoice-generator-excel.xlsx)' }
    ]
  },
  // 6. Guides, Checklists, Reports
  {
    id: '6',
    slug: 'download-guide-to-filing-income-tax-returns-pdf',
    title: 'इनकम टैक्स रिटर्न फाइलिंग गाइड PDF डाउनलोड करें (2024): हिंदी में पूरी जानकारी',
    excerpt: 'आईटीआर फाइलिंग हिंदी गाइड PDF – सबसे आसान तरीका, डॉक्युमेंट्स, स्टेप्स और टिप्स।',
    coverImage: '/images/income-tax-guide-pdf.jpg',
    date: '2024-06-18',
    author: 'Deepak Yadav',
    authorImage: '',
    authorTitle: 'Tax Consultant',
    authorBio: 'दीपक यादव 10+ वर्षों से टैक्स फाइलिंग में एक्सपर्ट हैं।',
    categories: ['Guides, Checklists, Reports'],
    content: [
      { type: 'heading', content: 'ITR फाइलिंग गाइड क्यों जरूरी है?' },
      { type: 'paragraph', content: 'हर साल इनकम टैक्स रिटर्न फाइल करना अनिवार्य है। सही जानकारी और डॉक्युमेंट्स के बिना गलती हो सकती है।' },
      { type: 'heading', content: 'गाइड में क्या मिलेगा?' },
      { type: 'list', items: [
        'कौन-कौन से डॉक्युमेंट्स चाहिए',
        'ऑनलाइन फाइलिंग स्टेप्स',
        'आम गलतियां',
        'टेक्स सेविंग्स टिप्स',
        'FAQ सेक्शन'
      ]},
      { type: 'paragraph', content: '[डाउनलोड ITR फाइलिंग गाइड PDF](/downloads/itr-filing-guide-hindi.pdf)' }
    ]
  },
  // 7. Legal & Official Documents
  {
    id: '7',
    slug: 'download-noc-format-pdf',
    title: 'डाउनलोड NOC फॉर्मेट PDF: फ्री नो ऑब्जेक्शन सर्टिफिकेट हिंदी में',
    excerpt: 'NOC फॉर्मेट PDF हिंदी में डाउनलोड करें – प्रॉपर्टी, जॉब, बैंक, और अन्य ऑफिशियल कामों के लिए।',
    coverImage: '/images/noc-format-pdf.jpg',
    date: '2024-06-18',
    author: 'Sunita Joshi',
    authorImage: '',
    authorTitle: 'Legal Advisor',
    authorBio: 'सुनीता जोशी लिगल डॉक्युमेंट्स एक्सपर्ट हैं।',
    categories: ['Legal & Official Documents'],
    content: [
      { type: 'heading', content: 'NOC क्या है?' },
      { type: 'paragraph', content: 'NOC (No Objection Certificate) एक जरूरी डॉक्युमेंट है, जो कई सरकारी और प्राइवेट कामों में चाहिए होता है।' },
      { type: 'list', items: [
        'प्रॉपर्टी ट्रांसफर',
        'जॉब जॉइनिंग/रिलीविंग',
        'बैंक लोन',
        'वाहन ट्रांसफर'
      ]},
      { type: 'paragraph', content: '[डाउनलोड NOC फॉर्मेट PDF](/downloads/noc-format-hindi.pdf)' }
    ]
  },
  // 8. Productivity & Office Tools
  {
    id: '8',
    slug: 'download-business-card-template',
    title: 'फ्री बिजनेस कार्ड टेम्पलेट डाउनलोड करें: एक्सेल और वर्ड फॉर्मेट',
    excerpt: 'बिजनेस कार्ड बनाने के लिए फ्री और एडिटेबल टेम्पलेट – एक्सेल और वर्ड दोनों में उपलब्ध।',
    coverImage: '/images/business-card-template.jpg',
    date: '2024-06-18',
    author: 'Rahul Jain',
    authorImage: '',
    authorTitle: 'Graphic Designer',
    authorBio: 'राहुल जैन डिजाइनिंग और ब्रांडिंग एक्सपर्ट हैं।',
    categories: ['Productivity & Office Tools'],
    content: [
      { type: 'heading', content: 'बिजनेस कार्ड क्यों जरूरी है?' },
      { type: 'paragraph', content: 'प्रोफेशनल नेटवर्किंग के लिए बिजनेस कार्ड बहुत जरूरी है। फ्री टेम्पलेट से तुरंत कार्ड बनाएं।' },
      { type: 'paragraph', content: '[डाउनलोड बिजनेस कार्ड टेम्पलेट (Excel)](/downloads/business-card-template.xlsx)' }
    ]
  },
  // 9. Cryptocurrency & Digital Finance
  {
    id: '9',
    slug: 'download-cryptocurrency-portfolio-tracker-excel',
    title: 'क्रिप्टोकरेंसी पोर्टफोलियो ट्रैकर एक्सेल डाउनलोड करें: फ्री हिंदी टेम्पलेट',
    excerpt: 'अपने बिटकॉइन, इथेरियम, और अन्य क्रिप्टो इन्वेस्टमेंट ट्रैक करने के लिए एक्सेल पोर्टफोलियो टेम्पलेट डाउनलोड करें।',
    coverImage: '/images/cryptocurrency-tracker-excel.jpg',
    date: '2024-06-18',
    author: 'Aayush Mehra',
    authorImage: '',
    authorTitle: 'Crypto Enthusiast',
    authorBio: 'आयुष मेहरा क्रिप्टो और डिजिटल फाइनेंस में उत्साही हैं।',
    categories: ['Cryptocurrency & Digital Finance'],
    content: [
      { type: 'heading', content: 'क्रिप्टो पोर्टफोलियो ट्रैकिंग क्यों करें?' },
      { type: 'paragraph', content: 'फ्री एक्सेल टेम्पलेट से अपने सभी क्रिप्टो होल्डिंग्स को एक जगह ट्रैक करें।' },
      { type: 'paragraph', content: '[डाउनलोड क्रिप्टो पोर्टफोलियो ट्रैकर](/downloads/cryptocurrency-portfolio-tracker.xlsx)' }
    ]
  },
  // 10. Worldwide & General Audience
  {
    id: '10',
    slug: 'download-budget-planner-excel',
    title: 'Download Budget Planner Excel: Free International Version for Everyone',
    excerpt: 'Manage your expenses and savings worldwide with our free downloadable budget planner Excel template.',
    coverImage: '/images/budget-planner-excel-global.jpg',
    date: '2024-06-18',
    author: 'Global Team',
    authorImage: '',
    authorTitle: 'Finance Experts',
    authorBio: 'Our global team helps people worldwide with tools for smart financial planning.',
    categories: ['Worldwide & General Audience'],
    content: [
      { type: 'heading', content: 'Why Use a Budget Planner?' },
      { type: 'paragraph', content: 'A budget planner helps you control your finances, track spending, and achieve savings goals. Our free Excel template is designed for users around the world and is easy to use for any currency.' },
      { type: 'paragraph', content: '[Download Budget Planner Excel (Global)](/downloads/budget-planner-global.xlsx)' }
    ]
  }
];

export function getExcelToolBlogPostBySlug(slug: string): ExcelToolBlogPost | undefined {
  return excelToolBlogPosts.find(post => post.slug === slug);
}

export function getRelatedExcelToolBlogPosts(slug: string, count: number = 3): ExcelToolBlogPost[] {
  const post = getExcelToolBlogPostBySlug(slug);
  if (!post) return [];
  const related = excelToolBlogPosts.filter(
    p => p.slug !== slug && p.categories.some(cat => post.categories.includes(cat))
  );
  if (related.length < count) {
    const others = excelToolBlogPosts.filter(p => p.slug !== slug && !related.includes(p));
    return [...related, ...others].slice(0, count);
  }
  return related.slice(0, count);
}
