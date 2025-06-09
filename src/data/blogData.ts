interface BlogPostContent {
  type: 'paragraph' | 'heading' | 'subheading' | 'list' | 'image' | 'quote';
  content?: string;
  items?: string[];
  url?: string;
  caption?: string;
  author?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  authorTitle?: string;
  authorBio?: string;
  authorImage?: string;
  date: string;
  categories: string[];
  tags: string[];
  excerpt: string;
  coverImage: string;
  content: BlogPostContent[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Sukanya Samriddhi Yojana: A Comprehensive Guide',
    slug: 'sukanya-samriddhi-yojana-guide',
    author: 'Priya Sharma',
    authorTitle: 'Financial Advisor',
    authorBio: 'Priya is a certified financial advisor with over 10 years of experience in personal finance and investment planning.',
    authorImage: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'June 15, 2025',
    categories: ['Government Schemes', 'Investment'],
    tags: ['Sukanya Samriddhi Yojana', 'Girl Child', 'Tax Saving', 'Investment'],
    excerpt: 'Everything you need to know about Sukanya Samriddhi Yojana (SSY) - eligibility, benefits, tax advantages, and how to maximize returns.',
    coverImage: 'https://images.pexels.com/photos/7063778/pexels-photo-7063778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'Sukanya Samriddhi Yojana (SSY) is one of the most popular government-backed savings schemes in India, specifically designed for the girl child. Launched in 2015 as part of the "Beti Bachao, Beti Padhao" campaign, this scheme offers attractive interest rates and tax benefits to encourage parents to save for their daughter\'s future education and marriage expenses.'
      },
      {
        type: 'heading',
        content: 'Eligibility Criteria'
      },
      {
        type: 'list',
        items: [
          'Account can be opened by parents or legal guardians for a girl child below 10 years of age',
          'Only one account per girl child is allowed',
          'A maximum of two accounts can be opened in a family (exceptions for twins/triplets)',
          'The account holder must be a resident Indian'
        ]
      },
      {
        type: 'heading',
        content: 'Key Features and Benefits'
      },
      {
        type: 'subheading',
        content: 'Interest Rate'
      },
      {
        type: 'paragraph',
        content: 'SSY offers one of the highest interest rates among government savings schemes. As of 2025, the interest rate stands at 8.2% per annum, which is reviewed and revised quarterly by the government. The interest is compounded annually.'
      },
      {
        type: 'subheading',
        content: 'Investment Limits'
      },
      {
        type: 'paragraph',
        content: 'The minimum annual deposit required is ₹250, while the maximum deposit allowed is ₹1.5 lakh per financial year. Deposits can be made in lump sum or in installments, providing flexibility to account holders.'
      },
      {
        type: 'subheading',
        content: 'Tax Benefits'
      },
      {
        type: 'paragraph',
        content: 'SSY enjoys the EEE (Exempt-Exempt-Exempt) tax status, which means:'
      },
      {
        type: 'list',
        items: [
          'Deposits are eligible for tax deduction under Section 80C of the Income Tax Act',
          'The interest earned is tax-free',
          'The maturity amount is also exempt from tax'
        ]
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/7654586/pexels-photo-7654586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        caption: 'Planning for your daughter\'s future education and financial security'
      },
      {
        type: 'heading',
        content: 'Account Tenure and Maturity'
      },
      {
        type: 'paragraph',
        content: 'The SSY account matures when the girl child turns 21 years of age. However, deposits are only required for the first 15 years. After that, the account continues to earn interest until maturity.'
      },
      {
        type: 'subheading',
        content: 'Partial Withdrawal'
      },
      {
        type: 'paragraph',
        content: 'A partial withdrawal of up to 50% of the balance (as it stood at the end of the previous financial year) is allowed after the girl child turns 18 years or passes 10th standard, whichever is earlier. This provision is specifically meant for higher education or marriage expenses.'
      },
      {
        type: 'heading',
        content: 'How to Open an SSY Account'
      },
      {
        type: 'paragraph',
        content: 'You can open an SSY account at any authorized bank or post office. Here\'s what you\'ll need:'
      },
      {
        type: 'list',
        items: [
          'Birth certificate of the girl child',
          'Identity and address proof of the parent/guardian (Aadhaar, PAN, etc.)',
          'Recent passport-sized photographs',
          'Initial deposit amount (minimum ₹250)'
        ]
      },
      {
        type: 'heading',
        content: 'Maximizing Returns from SSY'
      },
      {
        type: 'paragraph',
        content: 'To get the most out of your Sukanya Samriddhi account, consider these strategies:'
      },
      {
        type: 'list',
        items: [
          'Deposit the maximum amount (₹1.5 lakh) each year to maximize tax benefits and returns',
          'Make deposits at the beginning of the financial year to earn interest for the full year',
          'Set up automatic transfers to ensure you never miss a deposit',
          'Open the account as early as possible (ideally right after the birth of your daughter) to maximize the compounding effect'
        ]
      },
      {
        type: 'quote',
        content: 'The Sukanya Samriddhi Yojana is not just a savings scheme; it\'s a commitment to securing your daughter\'s future and empowering her with financial independence.',
        author: 'Nirmala Sitharaman, Finance Minister'
      },
      {
        type: 'heading',
        content: 'Comparison with Other Investment Options'
      },
      {
        type: 'paragraph',
        content: 'When compared to other popular investment options for children, SSY stands out due to its government backing, high interest rates, and tax benefits. Here\'s how it compares:'
      },
      {
        type: 'list',
        items: [
          'PPF: SSY offers a higher interest rate than PPF and is specifically for girl children',
          'Fixed Deposits: SSY provides better returns and tax benefits compared to bank FDs',
          'Mutual Funds: While mutual funds might offer higher returns, they come with market risks unlike the guaranteed returns of SSY',
          'Insurance Plans: Child insurance plans typically offer lower returns compared to SSY'
        ]
      },
      {
        type: 'heading',
        content: 'Conclusion'
      },
      {
        type: 'paragraph',
        content: 'Sukanya Samriddhi Yojana is an excellent investment option for parents looking to secure their daughter\'s future. With its attractive interest rates, tax benefits, and government backing, it provides a safe and rewarding way to save for important milestones in your daughter\'s life. By starting early and contributing consistently, you can build a substantial corpus that will support her education and other financial needs as she grows.'
      },
      {
        type: 'paragraph',
        content: 'Remember, the key to maximizing the benefits of SSY lies in opening the account early, making regular maximum contributions, and letting the power of compounding work its magic over the long term.'
      }
    ]
  },
  {
    id: '2',
    title: 'National Pension System: A Complete Guide for Indian Investors',
    slug: 'national-pension-system-guide',
    author: 'Rajesh Kumar',
    authorTitle: 'Retirement Planning Specialist',
    date: 'July 10, 2025',
    categories: ['Government Schemes', 'Retirement Planning'],
    tags: ['NPS', 'Pension', 'Retirement', 'Tax Saving'],
    excerpt: 'Everything you need to know about the National Pension System (NPS) - structure, benefits, tax advantages, and investment strategies.',
    coverImage: 'https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'The National Pension System (NPS) is a voluntary, long-term retirement savings scheme designed to enable systematic savings during the working life of a subscriber. Regulated by the Pension Fund Regulatory and Development Authority (PFRDA), NPS aims to provide old-age income security to all citizens of India.'
      }
    ]
  },
  {
    id: '3',
    title: 'Kisan Vikas Patra (KVP): Features, Benefits, and Limitations',
    slug: 'kisan-vikas-patra-explained',
    author: 'Anita Desai',
    authorTitle: 'Investment Consultant',
    date: 'August 5, 2025',
    categories: ['Government Schemes', 'Investment'],
    tags: ['KVP', 'Post Office Schemes', 'Fixed Income', 'Investment'],
    excerpt: 'A detailed analysis of Kisan Vikas Patra - how it works, who should invest, current interest rates, and comparison with other fixed-income options.',
    coverImage: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'Kisan Vikas Patra (KVP) is a popular savings certificate scheme offered by the Indian Post Office. Originally launched in 1988 to promote savings among small investors and farmers, KVP was temporarily discontinued in 2011 and reintroduced in 2014 with new features.'
      }
    ]
  },
  {
    id: '4',
    title: 'Pradhan Mantri Vaya Vandana Yojana: Pension Scheme for Senior Citizens',
    slug: 'pradhan-mantri-vaya-vandana-yojana-guide',
    author: 'Suresh Menon',
    authorTitle: 'Senior Financial Planner',
    date: 'September 12, 2025',
    categories: ['Government Schemes', 'Retirement Planning'],
    tags: ['PMVVY', 'Senior Citizens', 'Pension', 'Retirement'],
    excerpt: 'A detailed look at PMVVY - benefits, eligibility, comparison with other senior citizen schemes, and application process.',
    coverImage: 'https://images.pexels.com/photos/7876383/pexels-photo-7876383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'Pradhan Mantri Vaya Vandana Yojana (PMVVY) is a government-backed pension scheme specifically designed for senior citizens in India. Launched to provide social security during old age, this scheme offers a guaranteed pension based on the lump sum investment made by the subscriber.'
      }
    ]
  },
  {
    id: '5',
    title: 'Atal Pension Yojana: Securing Retirement for the Unorganized Sector',
    slug: 'atal-pension-yojana-guide',
    author: 'Meera Iyer',
    authorTitle: 'Financial Inclusion Expert',
    date: 'October 8, 2025',
    categories: ['Government Schemes', 'Retirement Planning', 'Financial Inclusion'],
    tags: ['APY', 'Pension', 'Unorganized Sector', 'Retirement'],
    excerpt: 'Understanding Atal Pension Yojana - eligibility, benefits, contribution amounts, and how it helps secure retirement for workers in the unorganized sector.',
    coverImage: 'https://images.pexels.com/photos/7821879/pexels-photo-7821879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'Atal Pension Yojana (APY) is a government-backed pension scheme primarily aimed at workers in the unorganized sector who lack access to formal pension benefits. Launched in 2015, this scheme provides a defined pension based on the contribution amount and period.'
      }
    ]
  },
  {
    id: '6',
    title: 'Post Office Savings Schemes: Which One is Right for You?',
    slug: 'post-office-savings-schemes-comparison',
    author: 'Vikram Desai',
    authorTitle: 'Financial Analyst',
    date: 'June 20, 2025',
    categories: ['Government Schemes', 'Investment'],
    tags: ['Post Office', 'Savings', 'Fixed Income', 'Investment'],
    excerpt: 'Compare KVP, NSC, SCSS, MIS, and other post office schemes to find the best option for your financial goals.',
    coverImage: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'Post Office savings schemes have long been a cornerstone of fixed-income investments for many Indian households. With their government backing and widespread accessibility, these schemes offer security and reasonable returns for conservative investors.'
      }
    ]
  },
  {
    id: '7',
    title: 'NPS Tier 1 vs Tier 2: Understanding the Differences',
    slug: 'nps-tier1-vs-tier2-comparison',
    author: 'Rajesh Kumar',
    authorTitle: 'Retirement Planning Specialist',
    date: 'June 30, 2025',
    categories: ['Government Schemes', 'Retirement Planning'],
    tags: ['NPS', 'Pension', 'Retirement', 'Tax Saving'],
    excerpt: 'Detailed comparison of NPS Tier 1 and Tier 2 accounts - features, benefits, tax implications, and investment strategies.',
    coverImage: 'https://images.pexels.com/photos/7821620/pexels-photo-7821620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'The National Pension System (NPS) offers two types of accounts - Tier 1 and Tier 2. While both are part of the same pension framework, they have significant differences in terms of features, withdrawal rules, and tax benefits.'
      }
    ]
  },
  {
    id: '8',
    title: 'Mutual Fund Investment Guide for Beginners',
    slug: 'mutual-fund-investment-guide-beginners',
    author: 'Neha Kapoor',
    authorTitle: 'Investment Advisor',
    date: 'July 5, 2025',
    categories: ['Investment'],
    tags: ['Mutual Funds', 'Beginners', 'Investment', 'SIP'],
    excerpt: 'A step-by-step guide to understanding and investing in mutual funds - types, benefits, risks, and how to get started.',
    coverImage: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'Mutual funds have revolutionized the investment landscape in India, making it possible for individuals with limited knowledge of financial markets to benefit from professional fund management and diversification.'
      }
    ]
  },
  {
    id: '9',
    title: 'Tax-Saving Investment Options: Beyond Section 80C',
    slug: 'tax-saving-investment-options',
    author: 'Arun Jaitley',
    authorTitle: 'Tax Consultant',
    date: 'July 15, 2025',
    categories: ['Tax Planning', 'Investment'],
    tags: ['Tax Saving', 'Section 80C', 'Investment', 'Income Tax'],
    excerpt: 'Explore tax-saving options beyond the traditional Section 80C investments - maximize deductions and optimize your tax planning.',
    coverImage: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'While Section 80C of the Income Tax Act is the most well-known tax-saving provision, there are several other sections that offer additional deduction opportunities that many taxpayers overlook.'
      }
    ]
  },
  {
    id: '10',
    title: 'Home Loan Interest Rates Comparison: Which Bank Offers the Best Deal?',
    slug: 'home-loan-interest-rates-comparison',
    author: 'Sanjay Mehta',
    authorTitle: 'Mortgage Specialist',
    date: 'July 20, 2025',
    categories: ['Banking'],
    tags: ['Home Loan', 'Interest Rates', 'Banks', 'Mortgage'],
    excerpt: 'Compare home loan interest rates, processing fees, and terms across major Indian banks to find the most cost-effective option.',
    coverImage: 'https://images.pexels.com/photos/7578939/pexels-photo-7578939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'Choosing the right home loan can save you lakhs of rupees over the loan tenure. With numerous banks and housing finance companies offering competitive rates, it\'s crucial to compare all aspects before making a decision.'
      }
    ]
  }
];

// Function to get a blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Function to get related posts
export const getRelatedPosts = (slug: string, limit: number = 3): BlogPost[] => {
  const currentPost = getBlogPostBySlug(slug);
  if (!currentPost) return [];
  
  // Find posts with matching categories
  const relatedPosts = blogPosts
    .filter(post => post.slug !== slug && post.categories.some(category => 
      currentPost.categories.includes(category)
    ))
    .slice(0, limit);
  
  // If we don't have enough related posts, add some recent posts
  if (relatedPosts.length < limit) {
    const recentPosts = blogPosts
      .filter(post => post.slug !== slug && !relatedPosts.some(related => related.slug === post.slug))
      .slice(0, limit - relatedPosts.length);
    
    return [...relatedPosts, ...recentPosts];
  }
  
  return relatedPosts;
};