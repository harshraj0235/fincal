interface BlogPostSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'list' | 'image' | 'quote';
  content?: string;
  items?: string[];
  url?: string;
  caption?: string;
  author?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  date: string;
  author: string;
  authorTitle?: string;
  authorImage?: string;
  authorBio?: string;
  coverImage: string;
  excerpt: string;
  categories: string[];
  content: BlogPostSection[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Sukanya Samriddhi Yojana: The Ultimate Guide for Parents",
    slug: "sukanya-samriddhi-yojana-guide",
    date: "June 15, 2023",
    author: "Priya Sharma",
    authorTitle: "Financial Advisor",
    authorImage: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    authorBio: "Priya is a certified financial advisor with over 10 years of experience in personal finance and investment planning. She specializes in government schemes and tax planning.",
    coverImage: "https://images.pexels.com/photos/7063778/pexels-photo-7063778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    excerpt: "Sukanya Samriddhi Yojana is one of the best government-backed savings schemes for parents with girl children. Learn everything about eligibility, benefits, tax advantages, and investment strategies.",
    categories: ["Government Schemes", "Investment", "Tax Planning"],
    content: [
      {
        type: "paragraph",
        content: "Sukanya Samriddhi Yojana (SSY) is a small savings scheme launched as part of the 'Beti Bachao, Beti Padhao' campaign by the Government of India. It's designed to provide financial security for the girl child's education and marriage expenses. With its attractive interest rates and tax benefits, SSY has become one of the most popular investment options for parents with girl children."
      },
      {
        type: "heading",
        content: "Key Features of Sukanya Samriddhi Yojana"
      },
      {
        type: "list",
        items: [
          "Account can be opened in the name of a girl child until she attains the age of 10 years",
          "Only one account is allowed per girl child (maximum two accounts in a family)",
          "Minimum deposit of ₹250 and maximum of ₹1.5 lakh per financial year",
          "Current interest rate of 8.0% p.a. (reviewed quarterly by the government)",
          "15-year deposit period from the date of account opening",
          "Account matures when the girl reaches 21 years of age",
          "Partial withdrawal allowed for higher education expenses (up to 50% of balance)"
        ]
      },
      {
        type: "image",
        url: "https://images.pexels.com/photos/3755511/pexels-photo-3755511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Planning for your daughter's future with Sukanya Samriddhi Yojana"
      },
      {
        type: "heading",
        content: "Tax Benefits of Sukanya Samriddhi Yojana"
      },
      {
        type: "paragraph",
        content: "SSY enjoys the EEE (Exempt-Exempt-Exempt) tax status, which means:"
      },
      {
        type: "list",
        items: [
          "Investments up to ₹1.5 lakh per year qualify for tax deduction under Section 80C",
          "The interest earned on the account is completely tax-free",
          "The maturity amount received is also exempt from tax"
        ]
      },
      {
        type: "quote",
        content: "Sukanya Samriddhi Yojana is one of the few investment options that offers complete tax exemption at all three stages - investment, accumulation, and withdrawal.",
        author: "Financial Expert"
      },
      {
        type: "heading",
        content: "How to Open a Sukanya Samriddhi Account"
      },
      {
        type: "paragraph",
        content: "You can open an SSY account at any authorized bank or post office. Here's what you'll need:"
      },
      {
        type: "list",
        items: [
          "Birth certificate of the girl child",
          "Identity and address proof of the parent/guardian",
          "Passport-sized photographs",
          "Initial deposit amount (minimum ₹250)"
        ]
      },
      {
        type: "subheading",
        content: "Online Account Opening"
      },
      {
        type: "paragraph",
        content: "Some banks now offer the facility to open SSY accounts online through their net banking platforms. Check with your bank for this facility."
      },
      {
        type: "heading",
        content: "Investment Strategy for Sukanya Samriddhi Yojana"
      },
      {
        type: "paragraph",
        content: "To maximize the benefits of SSY, consider the following strategies:"
      },
      {
        type: "list",
        items: [
          "Start early: Opening an account when your daughter is young maximizes the compounding benefits",
          "Invest the maximum amount: Try to contribute the full ₹1.5 lakh annually to maximize returns",
          "Maintain discipline: Regular annual contributions are essential for optimal growth",
          "Plan for education: Remember that partial withdrawals are allowed for higher education"
        ]
      },
      {
        type: "heading",
        content: "Comparing SSY with Other Investment Options"
      },
      {
        type: "paragraph",
        content: "When compared to other investment options for children's future, SSY stands out due to its government backing, high interest rates, and tax benefits. Here's how it compares:"
      },
      {
        type: "list",
        items: [
          "PPF: SSY offers a higher interest rate than PPF and is specifically designed for girl children",
          "Fixed Deposits: SSY provides better post-tax returns compared to bank FDs",
          "Mutual Funds: While equity funds might offer higher returns, they come with market risks that SSY doesn't have",
          "Child Insurance Plans: These typically offer lower returns than SSY but provide insurance coverage"
        ]
      },
      {
        type: "heading",
        content: "Conclusion"
      },
      {
        type: "paragraph",
        content: "Sukanya Samriddhi Yojana is an excellent investment option for parents looking to secure their daughter's future. With its attractive interest rates, tax benefits, and government backing, it provides a safe and rewarding way to save for your daughter's education and marriage expenses. Start early and invest regularly to make the most of this scheme."
      },
      {
        type: "paragraph",
        content: "Use our Sukanya Samriddhi Calculator to plan your investments and see how your money will grow over time."
      }
    ]
  },
  {
    id: 2,
    title: "National Pension System (NPS): A Comprehensive Guide for Retirement Planning",
    slug: "national-pension-system-guide",
    date: "July 10, 2023",
    author: "Rajesh Kumar",
    authorTitle: "Retirement Planning Specialist",
    authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    authorBio: "Rajesh is a certified retirement planning specialist with expertise in pension schemes and retirement investment strategies. He has helped hundreds of clients plan for a financially secure retirement.",
    coverImage: "https://images.pexels.com/photos/7821879/pexels-photo-7821879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    excerpt: "The National Pension System (NPS) is a voluntary, long-term retirement savings scheme designed to enable systematic savings during the working life of a subscriber. Learn about its features, benefits, and how to maximize your retirement corpus.",
    categories: ["Government Schemes", "Retirement Planning", "Tax Planning"],
    content: [
      {
        type: "paragraph",
        content: "The National Pension System (NPS) is a government-sponsored pension scheme launched in 2004, initially for government employees but later opened to all Indian citizens. It's a defined contribution scheme where you contribute regularly during your working years to build a retirement corpus. Let's dive deep into understanding this important retirement planning tool."
      },
      {
        type: "heading",
        content: "Structure of NPS: Tier 1 and Tier 2 Accounts"
      },
      {
        type: "paragraph",
        content: "NPS offers two types of accounts with different features and benefits:"
      },
      {
        type: "subheading",
        content: "Tier 1 Account"
      },
      {
        type: "list",
        items: [
          "Mandatory retirement account with restrictions on withdrawals",
          "Minimum contribution of ₹500 per month or ₹6,000 per year",
          "Tax benefits under Section 80C and 80CCD(1B)",
          "Partial withdrawals allowed for specific needs after 3 years",
          "At retirement, minimum 40% of corpus must be used to purchase an annuity"
        ]
      },
      {
        type: "subheading",
        content: "Tier 2 Account"
      },
      {
        type: "list",
        items: [
          "Voluntary savings account with no withdrawal restrictions",
          "No minimum contribution requirements",
          "No tax benefits (except for government employees)",
          "Can be opened only if you have an active Tier 1 account",
          "Higher liquidity compared to Tier 1"
        ]
      },
      {
        type: "image",
        url: "https://images.pexels.com/photos/7821711/pexels-photo-7821711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Planning for retirement with NPS can help secure your financial future"
      },
      {
        type: "heading",
        content: "Investment Options in NPS"
      },
      {
        type: "paragraph",
        content: "NPS offers two approaches to investing your contributions:"
      },
      {
        type: "subheading",
        content: "Active Choice"
      },
      {
        type: "paragraph",
        content: "You can decide the allocation of your funds across four asset classes:"
      },
      {
        type: "list",
        items: [
          "Equity (E): Investment in stocks with a cap of 75%",
          "Corporate Bonds (C): Investment in corporate debt securities",
          "Government Securities (G): Investment in government bonds",
          "Alternative Investment Funds (A): Investment in alternative assets (max 5%)"
        ]
      },
      {
        type: "subheading",
        content: "Auto Choice (Lifecycle Fund)"
      },
      {
        type: "paragraph",
        content: "Your investments are automatically allocated based on your age. As you grow older, the allocation shifts from higher-risk equity to lower-risk government securities."
      },
      {
        type: "heading",
        content: "Tax Benefits of NPS"
      },
      {
        type: "paragraph",
        content: "NPS offers significant tax advantages that make it an attractive retirement savings option:"
      },
      {
        type: "list",
        items: [
          "Section 80CCD(1): Employee contributions up to 10% of salary (within the overall 80C limit of ₹1.5 lakh)",
          "Section 80CCD(1B): Additional deduction of up to ₹50,000 exclusively for NPS",
          "Section 80CCD(2): Employer contributions up to 10% of salary (not subject to 80C limit)",
          "Tax-free withdrawal: Up to 60% of the corpus is tax-free on maturity",
          "Partial withdrawals for specific needs are tax-free"
        ]
      },
      {
        type: "quote",
        content: "NPS is one of the few investment options that offers additional tax benefits beyond the Section 80C limit, making it particularly attractive for tax-conscious investors.",
        author: "Tax Expert"
      },
      {
        type: "heading",
        content: "Withdrawal Rules"
      },
      {
        type: "paragraph",
        content: "Understanding the withdrawal rules is crucial for NPS subscribers:"
      },
      {
        type: "list",
        items: [
          "At retirement (60 years): You can withdraw up to 60% of the corpus as a lump sum (tax-free), and at least 40% must be used to purchase an annuity",
          "Premature exit (before 60 years): You can withdraw up to 20% as a lump sum, and 80% must be used for annuity purchase",
          "Partial withdrawals: Allowed after 3 years of joining, up to 25% of your contributions (not including returns) for specific needs like children's education, home purchase, medical emergencies, etc.",
          "Maximum of three partial withdrawals throughout the subscription period, with a gap of at least 5 years between withdrawals"
        ]
      },
      {
        type: "heading",
        content: "How to Open an NPS Account"
      },
      {
        type: "paragraph",
        content: "Opening an NPS account is straightforward and can be done through multiple channels:"
      },
      {
        type: "list",
        items: [
          "Online: Through the eNPS portal (https://enps.nsdl.com)",
          "Banks: Visit any NPS-enabled bank branch",
          "Point of Presence (POP): Visit any registered POP service provider",
          "Mobile app: Use the NPS mobile app"
        ]
      },
      {
        type: "paragraph",
        content: "You'll need to provide KYC documents, including identity proof, address proof, and a photograph."
      },
      {
        type: "heading",
        content: "NPS vs Other Retirement Options"
      },
      {
        type: "paragraph",
        content: "How does NPS compare to other retirement savings options in India?"
      },
      {
        type: "list",
        items: [
          "EPF: NPS potentially offers higher returns but with market risk; EPF provides guaranteed returns",
          "PPF: NPS has a longer lock-in but potentially higher returns and additional tax benefits",
          "Mutual Funds: NPS has tax advantages and forced discipline but less flexibility",
          "Traditional Pension Plans: NPS typically has lower costs and potentially higher returns"
        ]
      },
      {
        type: "heading",
        content: "Conclusion"
      },
      {
        type: "paragraph",
        content: "The National Pension System is a well-designed retirement savings scheme that offers a good balance of returns, tax benefits, and flexibility. It's particularly beneficial for those who start early and can take advantage of the power of compounding over a long period. The additional tax benefits make it an attractive option for tax-conscious investors."
      },
      {
        type: "paragraph",
        content: "However, the restrictions on withdrawals and mandatory annuitization of at least 40% of the corpus are factors to consider. It's advisable to include NPS as part of a diversified retirement portfolio rather than relying on it exclusively."
      },
      {
        type: "paragraph",
        content: "Use our NPS Calculator to estimate your retirement corpus and plan your contributions effectively."
      }
    ]
  },
  {
    id: 3,
    title: "Kisan Vikas Patra (KVP): The Farmer's Investment Scheme Explained",
    slug: "kisan-vikas-patra-explained",
    date: "August 5, 2023",
    author: "Anand Verma",
    authorTitle: "Rural Finance Specialist",
    authorImage: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    authorBio: "Anand specializes in rural finance and agricultural economics. He has extensive experience working with farmers and rural communities on financial inclusion and investment planning.",
    coverImage: "https://images.pexels.com/photos/2382665/pexels-photo-2382665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    excerpt: "Kisan Vikas Patra (KVP) is a popular small savings scheme that doubles your investment in about 10 years. Originally designed for farmers, it's now available to all Indian citizens. Learn about its features, benefits, and investment strategy.",
    categories: ["Government Schemes", "Investment", "Rural Finance"],
    content: [
      {
        type: "paragraph",
        content: "Kisan Vikas Patra (KVP) is one of India's oldest and most trusted small savings schemes. Originally launched in 1988 to promote savings among farmers, it was discontinued in 2011 and then reintroduced in 2014 with new features. Today, KVP is available to all Indian citizens and offers a secure investment option with guaranteed returns."
      },
      {
        type: "heading",
        content: "Key Features of Kisan Vikas Patra"
      },
      {
        type: "list",
        items: [
          "Investment doubles in approximately 10 years (current doubling period: 123 months)",
          "Current interest rate: 7.5% compounded annually",
          "Minimum investment: ₹1,000 (no maximum limit)",
          "Available in denominations of ₹1,000, ₹5,000, ₹10,000, and ₹50,000",
          "Can be purchased from post offices and designated banks",
          "Certificates can be held individually or jointly (up to 3 adults)",
          "Transferable from one person to another",
          "Premature withdrawal allowed after 2.5 years (with penalty)"
        ]
      },
      {
        type: "image",
        url: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "KVP offers a secure investment option for risk-averse investors"
      },
      {
        type: "heading",
        content: "Who Should Invest in KVP?"
      },
      {
        type: "paragraph",
        content: "KVP is particularly suitable for:"
      },
      {
        type: "list",
        items: [
          "Risk-averse investors looking for guaranteed returns",
          "Individuals with medium to long-term financial goals",
          "Investors seeking an alternative to fixed deposits",
          "Parents saving for children's future needs",
          "Retirees looking for safe investment options"
        ]
      },
      {
        type: "heading",
        content: "Tax Implications"
      },
      {
        type: "paragraph",
        content: "It's important to understand the tax aspects of KVP before investing:"
      },
      {
        type: "list",
        items: [
          "No tax deduction available under Section 80C for KVP investments",
          "Interest earned is fully taxable as per the investor's income tax slab",
          "TDS is not applicable, but interest income must be declared in the annual tax return",
          "Interest is taxable on an accrual basis even though it's paid at maturity"
        ]
      },
      {
        type: "quote",
        content: "While KVP doesn't offer tax benefits, its guaranteed returns and government backing make it an attractive option for conservative investors seeking capital preservation with moderate growth.",
        author: "Financial Planner"
      },
      {
        type: "heading",
        content: "How to Invest in KVP"
      },
      {
        type: "paragraph",
        content: "Investing in KVP is a straightforward process:"
      },
      {
        type: "list",
        items: [
          "Visit any post office or authorized bank",
          "Fill out the KVP application form",
          "Provide KYC documents (identity and address proof)",
          "Make the payment (cash up to ₹50,000, cheque/DD for higher amounts)",
          "Receive the KVP certificate"
        ]
      },
      {
        type: "paragraph",
        content: "You can also invest in KVP online through the India Post website or mobile app if you have a post office savings account."
      },
      {
        type: "heading",
        content: "Premature Withdrawal Rules"
      },
      {
        type: "paragraph",
        content: "While KVP is designed as a long-term investment, premature withdrawals are allowed under certain conditions:"
      },
      {
        type: "list",
        items: [
          "No withdrawal allowed before 2.5 years from the date of investment",
          "Between 2.5 to 3 years: 95% of the investment amount",
          "After 3 years: Investment amount plus interest calculated at a lower rate",
          "Premature withdrawal in case of death of the holder: Full amount with applicable interest"
        ]
      },
      {
        type: "heading",
        content: "KVP vs Other Small Savings Schemes"
      },
      {
        type: "paragraph",
        content: "How does KVP compare to other government-backed small savings schemes?"
      },
      {
        type: "subheading",
        content: "KVP vs Public Provident Fund (PPF)"
      },
      {
        type: "list",
        items: [
          "PPF offers tax benefits under Section 80C, KVP doesn't",
          "PPF has a 15-year lock-in period, KVP doubles in about 10 years",
          "PPF has an investment limit of ₹1.5 lakh per year, KVP has no upper limit",
          "PPF interest is tax-free, KVP interest is taxable"
        ]
      },
      {
        type: "subheading",
        content: "KVP vs National Savings Certificate (NSC)"
      },
      {
        type: "list",
        items: [
          "NSC offers tax benefits under Section 80C, KVP doesn't",
          "NSC has a 5-year lock-in period, KVP has a longer maturity period",
          "Both have similar interest rates, with NSC slightly higher",
          "Both allow premature withdrawal under similar conditions"
        ]
      },
      {
        type: "subheading",
        content: "KVP vs Fixed Deposits (FDs)"
      },
      {
        type: "list",
        items: [
          "KVP typically offers higher interest rates than bank FDs",
          "FDs offer more flexibility in terms of tenure options",
          "KVP has government backing, making it more secure",
          "FDs offer regular interest payout options, KVP pays at maturity"
        ]
      },
      {
        type: "heading",
        content: "Investment Strategy for KVP"
      },
      {
        type: "paragraph",
        content: "To make the most of your KVP investment, consider these strategies:"
      },
      {
        type: "list",
        items: [
          "Ladder your investments: Invest in KVP certificates with different purchase dates to improve liquidity",
          "Combine with tax-saving instruments: Since KVP doesn't offer tax benefits, pair it with tax-saving investments like ELSS or PPF",
          "Use for specific goals: KVP's fixed doubling period makes it suitable for goals with defined timelines",
          "Consider inflation: Factor in inflation when planning for long-term goals using KVP"
        ]
      },
      {
        type: "heading",
        content: "Conclusion"
      },
      {
        type: "paragraph",
        content: "Kisan Vikas Patra offers a reliable investment option for conservative investors seeking capital preservation with guaranteed returns. While it doesn't provide tax benefits, its government backing, guaranteed returns, and relatively shorter lock-in period compared to some other small savings schemes make it an attractive option for many investors."
      },
      {
        type: "paragraph",
        content: "For those looking to diversify their investment portfolio with a safe, fixed-income instrument, KVP can be a valuable addition. It's particularly useful for goals with a medium to long-term horizon where capital safety is a priority."
      },
      {
        type: "paragraph",
        content: "Use our Post Office Schemes Calculator to compare KVP with other post office investment options and plan your investments effectively."
      }
    ]
  },
  {
    id: 4,
    title: "Understanding the Pradhan Mantri Vaya Vandana Yojana (PMVVY) for Senior Citizens",
    slug: "pradhan-mantri-vaya-vandana-yojana-guide",
    date: "September 12, 2023",
    author: "Dr. Suresh Menon",
    authorTitle: "Retirement Planning Expert",
    coverImage: "https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    excerpt: "Pradhan Mantri Vaya Vandana Yojana (PMVVY) is a pension scheme specifically designed for senior citizens aged 60 years and above. Learn about its features, benefits, and how it can provide financial security during retirement.",
    categories: ["Government Schemes", "Retirement Planning", "Senior Citizens"],
    content: []
  },
  {
    id: 5,
    title: "Atal Pension Yojana: Securing Retirement for the Unorganized Sector",
    slug: "atal-pension-yojana-guide",
    date: "October 8, 2023",
    author: "Meera Desai",
    authorTitle: "Social Security Expert",
    coverImage: "https://images.pexels.com/photos/7876455/pexels-photo-7876455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    excerpt: "Atal Pension Yojana (APY) is a government-backed pension scheme primarily aimed at workers in the unorganized sector. Discover how this scheme works, its benefits, and how to maximize your pension amount.",
    categories: ["Government Schemes", "Retirement Planning", "Financial Inclusion"],
    content: []
  }
];

// Helper functions
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedPosts = (slug: string, count: number): BlogPost[] => {
  const currentPost = getBlogPostBySlug(slug);
  if (!currentPost) return [];
  
  // Find posts with matching categories
  const relatedPosts = blogPosts
    .filter(post => post.slug !== slug) // Exclude current post
    .filter(post => post.categories.some(category => 
      currentPost.categories.includes(category)
    ))
    .slice(0, count);
  
  return relatedPosts;
};
