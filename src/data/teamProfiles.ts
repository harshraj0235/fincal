/**
 * MoneyCal Team Profiles
 * Research-based financial writers and content creators
 * All team members are final-year graduation students with passion for finance
 */

export interface AuthorProfile {
  id: string;
  name: string;
  nameHindi: string;
  role: string;
  roleHindi: string;
  bio: string;
  bioHindi: string;
  education: string;
  educationHindi: string;
  expertise: string[];
  expertiseHindi: string[];
  image: string;
  socialProfiles: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  articlesCount: number;
  joinedDate: string;
}

export const teamProfiles: AuthorProfile[] = [
  {
    id: 'harsh-raj',
    name: 'Harsh Raj',
    nameHindi: 'हर्ष राज',
    role: 'Founder & Lead Financial Researcher',
    roleHindi: 'संस्थापक और मुख्य वित्तीय शोधकर्ता',
    bio: 'Final year graduation student with deep passion for finance, markets, and technology. Loves researching Indian financial markets and sharing knowledge through detailed, research-based articles. Not a certified financial expert, but dedicated to providing accurate, well-researched content for readers.',
    bioHindi: 'वित्त, बाजार और प्रौद्योगिकी के प्रति गहरी रुचि रखने वाले अंतिम वर्ष के स्नातक छात्र। भारतीय वित्तीय बाजारों पर शोध करना और विस्तृत, शोध-आधारित लेखों के माध्यम से ज्ञान साझा करना पसंद करते हैं। प्रमाणित वित्तीय विशेषज्ञ नहीं हैं, लेकिन पाठकों के लिए सटीक, अच्छी तरह से शोधित सामग्री प्रदान करने के लिए समर्पित हैं।',
    education: 'Final Year Graduation Student',
    educationHindi: 'अंतिम वर्ष स्नातक छात्र',
    expertise: ['Markets & IPOs', 'Personal Finance', 'Calculator Guides', 'Startup Ecosystem'],
    expertiseHindi: ['बाजार और IPO', 'व्यक्तिगत वित्त', 'कैलकुलेटर गाइड', 'स्टार्टअप इकोसिस्टम'],
    image: '/images/team/harsh-raj.jpg',
    socialProfiles: {
      // Add your social profiles here
    },
    articlesCount: 250,
    joinedDate: '2024-01-15'
  },
  {
    id: 'raushan-kumar',
    name: 'Raushan Kumar',
    nameHindi: 'रौशन कुमार',
    role: 'Financial Content Researcher & Writer',
    roleHindi: 'वित्तीय सामग्री शोधकर्ता और लेखक',
    bio: 'Final year graduation student passionate about financial news, market trends, and economic policy. Specializes in breaking down complex financial topics into easy-to-understand articles. Member of MoneyCal research team, committed to fact-based reporting. Not a certified financial advisor.',
    bioHindi: 'वित्तीय समाचार, बाजार के रुझान और आर्थिक नीति के प्रति जुनूनी अंतिम वर्ष के स्नातक छात्र। जटिल वित्तीय विषयों को आसानी से समझने योग्य लेखों में तोड़ने में विशेषज्ञता। मनीकैल रिसर्च टीम के सदस्य, तथ्य-आधारित रिपोर्टिंग के लिए प्रतिबद्ध। प्रमाणित वित्तीय सलाहकार नहीं हैं।',
    education: 'Final Year Graduation Student',
    educationHindi: 'अंतिम वर्ष स्नातक छात्र',
    expertise: ['Economy & Policy', 'Banking & Finance', 'Regional Business News', 'Stock Market Analysis'],
    expertiseHindi: ['अर्थव्यवस्था और नीति', 'बैंकिंग और वित्त', 'क्षेत्रीय व्यापार समाचार', 'शेयर बाजार विश्लेषण'],
    image: '/images/team/raushan-kumar.jpg',
    socialProfiles: {
      facebook: 'https://www.facebook.com/share/1CQ2QYi3hJ/',
      instagram: 'https://www.instagram.com/raushanraj45512?igsh=a3R0YTd1bjAyeXV0'
    },
    articlesCount: 180,
    joinedDate: '2024-02-01'
  },
  {
    id: 'vikram-kumar',
    name: 'Vikram Kumar',
    nameHindi: 'विक्रम कुमार',
    role: 'Fintech & Innovation Research Writer',
    roleHindi: 'फिनटेक और इनोवेशन रिसर्च लेखक',
    bio: 'Final year graduation student with keen interest in fintech, startups, and digital finance. Loves exploring how technology is transforming financial services in India. Writes research-based content on emerging trends. Part of MoneyCal content team. Not a certified technology or finance expert.',
    bioHindi: 'फिनटेक, स्टार्टअप और डिजिटल फाइनेंस में गहरी रुचि रखने वाले अंतिम वर्ष के स्नातक छात्र। भारत में वित्तीय सेवाओं को प्रौद्योगिकी कैसे बदल रही है, इसका पता लगाना पसंद करते हैं। उभरते रुझानों पर शोध-आधारित सामग्री लिखते हैं। मनीकैल कंटेंट टीम का हिस्सा। प्रमाणित प्रौद्योगिकी या वित्त विशेषज्ञ नहीं हैं।',
    education: 'Final Year Graduation Student',
    educationHindi: 'अंतिम वर्ष स्नातक छात्र',
    expertise: ['Fintech & Digital Payments', 'Startup Funding', 'Technology Innovation', 'Cryptocurrency'],
    expertiseHindi: ['फिनटेक और डिजिटल पेमेंट', 'स्टार्टअप फंडिंग', 'प्रौद्योगिकी नवाचार', 'क्रिप्टोकरेंसी'],
    image: '/images/team/vikram-kumar.jpg',
    socialProfiles: {
      facebook: 'https://www.facebook.com/share/1D31EUK18w/',
      instagram: 'https://www.instagram.com/vikram_gupta777?igsh=cjRobjJzazZxYmRv'
    },
    articlesCount: 165,
    joinedDate: '2024-02-15'
  },
  {
    id: 'saurabh-kumar',
    name: 'Saurabh Kumar',
    nameHindi: 'सौरभ कुमार',
    role: 'Investment & Personal Finance Writer',
    roleHindi: 'निवेश और व्यक्तिगत वित्त लेखक',
    bio: 'Final year graduation student passionate about personal finance, investment strategies, and financial planning. Enjoys simplifying complex investment concepts for everyday readers. Focuses on practical, research-backed financial guidance. MoneyCal team member committed to helping readers make informed decisions. Not a SEBI-registered investment advisor.',
    bioHindi: 'व्यक्तिगत वित्त, निवेश रणनीतियों और वित्तीय योजना के प्रति जुनूनी अंतिम वर्ष के स्नातक छात्र। रोजमर्रा के पाठकों के लिए जटिल निवेश अवधारणाओं को सरल बनाना पसंद करते हैं। व्यावहारिक, शोध-समर्थित वित्तीय मार्गदर्शन पर ध्यान केंद्रित करते हैं। मनीकैल टीम के सदस्य जो पाठकों को सूचित निर्णय लेने में मदद करने के लिए प्रतिबद्ध हैं। SEBI-पंजीकृत निवेश सलाहकार नहीं हैं।',
    education: 'Final Year Graduation Student',
    educationHindi: 'अंतिम वर्ष स्नातक छात्र',
    expertise: ['Mutual Funds & SIP', 'Tax Planning', 'Retirement Planning', 'Insurance & Risk Management'],
    expertiseHindi: ['म्यूचुअल फंड और SIP', 'कर योजना', 'रिटायरमेंट प्लानिंग', 'बीमा और जोखिम प्रबंधन'],
    image: '/images/team/saurabh-kumar.jpg',
    socialProfiles: {
      facebook: 'https://www.facebook.com/share/1AN1aqYijR/',
      instagram: 'https://www.instagram.com/ankitsaurabh2397?igsh=MWVxMXp5M3NieXRxZw=='
    },
    articlesCount: 195,
    joinedDate: '2024-03-01'
  }
];

export const getAuthorById = (id: string): AuthorProfile | undefined => {
  return teamProfiles.find(author => author.id === id);
};

export const getAuthorByExpertise = (expertise: string): AuthorProfile[] => {
  return teamProfiles.filter(author => 
    author.expertise.some(exp => exp.toLowerCase().includes(expertise.toLowerCase()))
  );
};

export const getRandomAuthor = (): AuthorProfile => {
  return teamProfiles[Math.floor(Math.random() * teamProfiles.length)];
};

export default teamProfiles;

