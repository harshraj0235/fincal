export interface CryptoArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  status: 'active' | 'archived';
  launchDate: string;
  coverImage: string;
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
  relatedArticles: string[];
}

export const cryptoArticles: CryptoArticle[] = [
  {
    id: '1',
    slug: 'crypto-regulation-india-2024',
    title: 'Crypto Regulation in India 2024: Complete Guide to Laws, Tax, and Compliance',
    excerpt: 'A comprehensive guide to cryptocurrency regulation, taxation, and compliance in India for 2024. Learn about legal status, tax rules, and how to stay compliant as an Indian crypto investor.',
    category: 'Regulation',
    status: 'active',
    launchDate: '2024-06-01',
    coverImage: 'https://images.unsplash.com/photo-1518544801345-7d8b7c7c7c7c?auto=format&fit=crop&w=800&q=80',
    content: [
      { type: 'heading', content: 'Crypto Regulation in India: 2024 Overview' },
      { type: 'paragraph', content: 'Cryptocurrency has seen explosive growth in India, with millions of investors entering the market. However, the regulatory landscape remains complex and rapidly evolving. In 2024, the Indian government has taken significant steps to clarify the legal status of crypto assets, introduce taxation rules, and ensure investor protection.' },
      { type: 'subheading', content: 'Is Crypto Legal in India?' },
      { type: 'paragraph', content: 'As of 2024, cryptocurrencies are not illegal in India, but they are not recognized as legal tender. The Reserve Bank of India (RBI) has lifted its earlier banking ban, allowing crypto exchanges to operate. However, the government has introduced strict KYC (Know Your Customer) and AML (Anti-Money Laundering) requirements for all crypto platforms.' },
      { type: 'subheading', content: 'Crypto Taxation in India' },
      { type: 'paragraph', content: 'The 2022 Union Budget introduced a 30% tax on income from the transfer of virtual digital assets (VDAs), including cryptocurrencies and NFTs. Additionally, a 1% TDS (Tax Deducted at Source) is applicable on all crypto transactions above a certain threshold. Losses from crypto cannot be offset against other income. It is crucial for investors to maintain detailed records of all transactions for tax filing.' },
      { type: 'list', items: [
        '30% tax on profits from crypto trading',
        '1% TDS on transactions above ₹10,000',
        'No set-off of losses against other income',
        'Gifts of crypto assets are taxable',
        'Detailed record-keeping is mandatory'
      ] },
      { type: 'subheading', content: 'How to Stay Compliant' },
      { type: 'paragraph', content: 'To stay compliant, use only registered Indian exchanges, complete KYC verification, and report all crypto income in your ITR (Income Tax Return). Use tools to track your trades and calculate taxes accurately.' },
      { type: 'subheading', content: 'Future of Crypto Regulation' },
      { type: 'paragraph', content: 'The government is working on a comprehensive crypto bill, which may introduce further regulations on exchanges, stablecoins, and DeFi platforms. Investors should stay updated with the latest announcements from the Ministry of Finance and RBI.' },
      { type: 'subheading', content: 'Conclusion' },
      { type: 'paragraph', content: 'Crypto regulation in India is evolving. By staying informed and compliant, investors can participate in this exciting asset class while minimizing legal risks.' },
    ],
    keywords: ['crypto regulation india', 'crypto tax india', 'cryptocurrency law india', 'VDA tax', 'crypto compliance', 'crypto KYC', 'crypto AML', 'crypto bill india'],
    seoTitle: 'Crypto Regulation in India 2024: Laws, Tax, Compliance Guide',
    seoDescription: 'Learn about the latest crypto regulation, tax rules, and compliance requirements for Indian investors in 2024. Stay legal and informed with our complete guide.',
    faqSchema: [
      { question: 'Is crypto legal in India in 2024?', answer: 'Crypto is not illegal in India, but it is not legal tender. Trading is allowed with strict KYC/AML compliance.' },
      { question: 'How is crypto taxed in India?', answer: 'Profits are taxed at 30%, with 1% TDS on transactions. Losses cannot be offset against other income.' },
      { question: 'What are the KYC requirements for crypto in India?', answer: 'All users must complete KYC on registered exchanges as per government rules.' }
    ],
    relatedArticles: [],
  },
]; 