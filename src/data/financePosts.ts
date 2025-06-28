export interface FinancePost {
  id: string;
  title: string;
  content: string;
  link?: string;
  image?: string;
  video?: string;
  slug: string;
  createdAt: string;
  author?: string;
  category?: string;
}

export const financePosts: FinancePost[] = [
  {
    id: "1",
    title: "5 Essential Personal Finance Tips for 2024",
    content: "Managing personal finances effectively is crucial for achieving financial stability and long-term wealth. In 2024, with changing economic conditions and new financial products available, it's more important than ever to stay informed and make smart financial decisions. Here are five essential tips that can help you improve your financial health: First, create a comprehensive budget that tracks all your income and expenses. Use budgeting apps or simple spreadsheets to monitor your spending patterns. Second, build an emergency fund that covers at least 6-12 months of your living expenses. This provides a safety net during unexpected situations like job loss or medical emergencies. Third, start investing early, even if it's a small amount. The power of compound interest can significantly grow your wealth over time. Consider SIPs in mutual funds or index funds for long-term wealth creation. Fourth, diversify your investments across different asset classes like equity, debt, gold, and real estate to reduce risk. Finally, regularly review and update your financial plan to adapt to changing life circumstances and market conditions. Remember, financial planning is a continuous process that requires discipline and patience.",
    link: "https://example.com/personal-finance-tips-2024",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    slug: "personal-finance-tips-2024",
    createdAt: "2024-01-15T10:00:00Z",
    author: "Finance Expert",
    category: "Personal Finance"
  },
  {
    id: "2",
    title: "Understanding Mutual Fund SIPs: A Complete Guide",
    content: "Systematic Investment Plans (SIPs) have become one of the most popular investment vehicles for retail investors in India. SIPs allow you to invest a fixed amount regularly in mutual funds, making it easier to build wealth over time. Here's everything you need to know about SIPs: SIPs work on the principle of rupee cost averaging, which means you buy more units when prices are low and fewer units when prices are high. This helps reduce the impact of market volatility on your investments. There are different types of SIPs available: regular SIPs where you invest a fixed amount monthly, step-up SIPs where you increase your investment amount periodically, and flexible SIPs where you can vary the investment amount based on your financial situation. The minimum investment amount for most SIPs is ₹500 per month, making them accessible to investors with different financial capacities. SIPs are particularly beneficial for long-term goals like retirement planning, children's education, or buying a house. They instill financial discipline and help you stay invested during market ups and downs. When choosing SIPs, consider factors like your investment horizon, risk tolerance, and financial goals. Equity SIPs are suitable for long-term goals with higher risk tolerance, while debt SIPs are better for short-term goals with lower risk tolerance. Remember to review your SIP portfolio regularly and rebalance if necessary to maintain your desired asset allocation.",
    link: "https://example.com/mutual-fund-sip-guide",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    slug: "mutual-fund-sip-guide",
    createdAt: "2024-01-20T14:30:00Z",
    author: "Investment Advisor",
    category: "Investment"
  },
  {
    id: "3",
    title: "Tax Planning Strategies for FY 2024-25",
    content: "With the new financial year approaching, it's crucial to plan your taxes effectively to maximize savings and ensure compliance. Here are comprehensive tax planning strategies for FY 2024-25: Start by understanding the new tax regime vs old tax regime. The new regime offers lower tax rates but removes most deductions and exemptions. Compare both regimes based on your income and deductions to choose the most beneficial option. Section 80C deductions remain one of the most popular tax-saving options. You can invest up to ₹1.5 lakh in instruments like ELSS, PPF, NSC, and life insurance premiums. Section 80D allows deduction for health insurance premiums up to ₹25,000 for self and family, with additional ₹25,000 for senior citizens. Home loan interest deduction under Section 24(b) allows up to ₹2 lakh deduction for self-occupied property. NPS contributions under Section 80CCD(1B) provide additional ₹50,000 deduction over and above Section 80C limit. Consider investing in tax-free bonds and municipal bonds for tax-free income. For business owners, explore deductions under Section 80JJAA for employment generation and Section 80-IA for infrastructure development. Remember to maintain proper documentation for all deductions and file your returns on time to avoid penalties. Regular tax planning throughout the year is more effective than last-minute planning.",
    link: "https://example.com/tax-planning-2024-25",
    image: "https://images.unsplash.com/photo-1554224154-26032cdc0df0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    slug: "tax-planning-strategies-2024-25",
    createdAt: "2024-01-25T09:15:00Z",
    author: "Tax Consultant",
    category: "Tax Planning"
  }
];

export function addFinancePost(post: FinancePost) {
  financePosts.push(post);
}

export function getFinancePostBySlug(slug: string): FinancePost | undefined {
  return financePosts.find(post => post.slug === slug);
}

export function getAllFinancePosts(): FinancePost[] {
  return financePosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
} 