import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, IndianRupee, Shield, Target, User } from 'lucide-react';
import { teamProfiles } from '../data/teamProfiles';
import { useReviewedDate } from '../hooks/useReviewedDate';

interface ToolQualityFooterProps {
  toolName: string;
  authorId?: string;
}

const buildToolPlaybook = (toolName: string) => {
  const normalized = toolName.toLowerCase();
  const hasAny = (keywords: string[]) => keywords.some((word) => normalized.includes(word));

  if (hasAny(['emi', 'loan', 'mortgage', 'credit', 'debt', 'refinance', 'prepayment', 'affordability'])) {
    return {
      heading: 'Loan planning checklist',
      inputs: ['Loan amount', 'Interest rate', 'Tenure (months/years)', 'Processing fees'],
      steps: [
        'Compare EMIs across 2-3 tenures to balance cash flow.',
        'Review total interest and prepayment impact before finalizing.',
        'Use related calculators to check affordability and eligibility.',
      ],
    };
  }

  if (hasAny(['sip', 'mutual', 'investment', 'portfolio', 'lumpsum', 'cagr', 'xirr', 'ppf', 'nps', 'retirement'])) {
    return {
      heading: 'Investment planning checklist',
      inputs: ['Monthly or lump sum amount', 'Expected return rate', 'Investment horizon', 'Goal amount'],
      steps: [
        'Run scenarios with conservative and optimistic return rates.',
        'Check goal timeline vs monthly contribution capacity.',
        'Review risk profile and diversify with related tools.',
      ],
    };
  }

  if (hasAny(['tax', 'gst', 'tds', 'itr', 'deduction', 'capital gains'])) {
    return {
      heading: 'Tax planning checklist',
      inputs: ['Annual income', 'Deductions', 'Regime selection', 'Applicable slabs'],
      steps: [
        'Compare old vs new regime outcomes with deductions.',
        'Validate GST/TDs inputs using official sources.',
        'Save the result and plan quarterly tax payments.',
      ],
    };
  }

  if (hasAny(['budget', 'expense', 'savings', 'net worth', 'goal', 'cash flow'])) {
    return {
      heading: 'Personal finance checklist',
      inputs: ['Monthly income', 'Fixed expenses', 'Variable expenses', 'Savings target'],
      steps: [
        'Identify the top 3 expense categories to optimize.',
        'Set a realistic savings percentage for the next 90 days.',
        'Track progress monthly and adjust targets.',
      ],
    };
  }

  if (hasAny(['insurance', 'ulip', 'term', 'health', 'life'])) {
    return {
      heading: 'Insurance planning checklist',
      inputs: ['Coverage amount', 'Premium budget', 'Tenure', 'Dependents'],
      steps: [
        'Match coverage to income replacement needs.',
        'Compare plan benefits and exclusions carefully.',
        'Revisit coverage annually with life changes.',
      ],
    };
  }

  if (hasAny(['invoice', 'receivable', 'payable', 'working capital', 'valuation', 'business'])) {
    return {
      heading: 'Business finance checklist',
      inputs: ['Revenue', 'Costs', 'Payment cycles', 'Working capital needs'],
      steps: [
        'Map inflows vs outflows to identify cash gaps.',
        'Track receivables and follow-up timelines.',
        'Use multiple tools for scenario planning.',
      ],
    };
  }

  return {
    heading: 'Tool usage checklist',
    inputs: ['Key inputs', 'Time period', 'Scenario variations', 'Goal outcome'],
    steps: [
      'Confirm the assumptions used by this tool.',
      'Run at least two scenarios to compare results.',
      'Use related tools to cross-check outcomes.',
    ],
  };
};

const buildSourceLinks = (toolName: string) => {
  const normalized = toolName.toLowerCase();
  const hasAny = (keywords: string[]) => keywords.some((word) => normalized.includes(word));

  if (hasAny(['emi', 'loan', 'mortgage', 'credit', 'debt', 'refinance', 'prepayment', 'affordability'])) {
    return [
      { label: 'RBI: Consumer Education – Loans & EMI', url: 'https://www.rbi.org.in/Scripts/FAQView.aspx?Id=97' },
      { label: 'RBI: Fair Practices Code for Lenders', url: 'https://www.rbi.org.in/' },
    ];
  }
  if (hasAny(['tax', 'gst', 'tds', 'itr', 'deduction', 'capital gains'])) {
    return [
      { label: 'Income Tax Department', url: 'https://www.incometax.gov.in/' },
      { label: 'GST Portal', url: 'https://www.gst.gov.in/' },
      { label: 'CBIC: GST Guides', url: 'https://www.cbic.gov.in/' },
    ];
  }
  if (hasAny(['sip', 'mutual', 'investment', 'portfolio', 'lumpsum', 'cagr', 'xirr', 'ppf', 'nps', 'retirement'])) {
    return [
      { label: 'SEBI: Investor Education', url: 'https://investor.sebi.gov.in/' },
      { label: 'AMFI: Mutual Fund Basics', url: 'https://www.amfiindia.com/investor-corner/knowledge-centre' },
      { label: 'PFRDA: NPS', url: 'https://www.pfrda.org.in/' },
    ];
  }
  if (hasAny(['insurance', 'ulip', 'term', 'health', 'life'])) {
    return [
      { label: 'IRDAI: Insurance Awareness', url: 'https://irdai.gov.in/' },
    ];
  }
  if (hasAny(['budget', 'expense', 'savings', 'net worth', 'goal', 'cash flow'])) {
    return [
      { label: 'RBI: Banking Basics', url: 'https://www.rbi.org.in/financialeducation/home.aspx' },
      { label: 'Government of India Open Data', url: 'https://data.gov.in/' },
    ];
  }
  if (hasAny(['invoice', 'receivable', 'payable', 'working capital', 'valuation', 'business'])) {
    return [
      { label: 'MCA: Company Services', url: 'https://www.mca.gov.in/' },
      { label: 'RBI: Business Banking', url: 'https://www.rbi.org.in/' },
    ];
  }
  return [
    { label: 'RBI: Financial Education', url: 'https://www.rbi.org.in/financialeducation/home.aspx' },
  ];
};

const ToolQualityFooter: React.FC<ToolQualityFooterProps> = ({ toolName, authorId = 'harsh-raj' }) => {
  const playbook = buildToolPlaybook(toolName);
  const author = teamProfiles.find((profile) => profile.id === authorId) || teamProfiles[0];
  const sources = buildSourceLinks(toolName);
  const reviewedDate = useReviewedDate();
  const seoBlocks = [
    `The ${toolName} is designed for users who want quick, reliable, and scenario-based decisions. Instead of offering a static one-line result, MoneyCal tools focus on practical interpretation so you understand what to do next.`,
    `For better outcomes, run this tool with at least three scenarios: conservative, baseline, and aggressive. This gives a realistic range and helps you avoid planning based on a single optimistic assumption.`,
    `Always align units before submitting inputs. Monthly/annual mismatch is one of the most common causes of wrong results. If needed, convert values first and then run the final calculation.`,
    `If this tool influences taxes, compliance, or legal decisions, treat output as guidance and cross-verify with the latest official circulars. Rules can change, and category-specific conditions may apply.`,
    `A strong finance workflow combines tools + documentation + review cadence. Save assumptions, rerun monthly or quarterly, and compare output with actual outcomes to improve decision quality over time.`,
    `MoneyCal pages are optimized to answer search intent fully: what to calculate, how to use the result, which mistakes to avoid, and where to verify rules. This reduces back-and-forth searching and helps users complete action in one place.`,
  ];

  return (
    <section className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              About the {toolName}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The {toolName} helps you make faster, data-backed decisions by organizing inputs and showing clear outputs.
              Use it alongside MoneyCal calculators to compare scenarios, check assumptions, and plan next steps.
            </p>
            <div className="rounded-2xl border border-gray-100 p-5 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{playbook.heading}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {playbook.steps.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-gray-100 p-4">
                    <Target className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <p className="text-sm text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h4 className="text-md font-semibold text-gray-900 mb-2">Inputs checklist</h4>
              <div className="flex flex-wrap gap-2">
                {playbook.inputs.map((item) => (
                  <span key={item} className="px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-gray-600">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Complete guide for {toolName}</h3>
              <div className="space-y-3 text-sm text-gray-700 leading-6">
                {seoBlocks.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Frequently asked quick answers</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-gray-100 p-3">
                  <p className="font-semibold text-gray-900">Is this tool free?</p>
                  <p className="text-gray-600 mt-1">Yes, this tool is free to use for standard planning scenarios.</p>
                </div>
                <div className="rounded-lg border border-gray-100 p-3">
                  <p className="font-semibold text-gray-900">Do I need sign-up?</p>
                  <p className="text-gray-600 mt-1">Most use-cases work without sign-up or account creation.</p>
                </div>
                <div className="rounded-lg border border-gray-100 p-3">
                  <p className="font-semibold text-gray-900">Can I trust the results?</p>
                  <p className="text-gray-600 mt-1">Results use standard assumptions; verify final compliance values separately.</p>
                </div>
                <div className="rounded-lg border border-gray-100 p-3">
                  <p className="font-semibold text-gray-900">How to improve accuracy?</p>
                  <p className="text-gray-600 mt-1">Use correct units, realistic assumptions, and run multiple scenarios.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {author && (
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Reviewed by</p>
                    <p className="font-semibold text-gray-900">{author.name}</p>
                    <p className="text-xs text-gray-500">{author.role}</p>
                  </div>
                </div>
                {author.bio && <p className="text-sm text-gray-600 mb-3">{author.bio}</p>}
                <p className="text-xs text-gray-500">Reviewed on {reviewedDate}</p>
              </div>
            )}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sources & references</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Keep exploring</h3>
              <p className="text-sm text-gray-600 mb-4">
                Find more tools, guides, and calculators built for India.
              </p>
              <div className="space-y-2">
                <Link to="/calculators" className="flex items-center justify-between text-sm font-semibold text-blue-700">
                  Browse calculators
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/tools" className="flex items-center justify-between text-sm font-semibold text-blue-700">
                  Explore all tools
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/learn" className="flex items-center justify-between text-sm font-semibold text-blue-700">
                  Learn personal finance
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Privacy reminder</h3>
              </div>
              <p className="text-sm text-gray-600">
                Calculations run in your browser. MoneyCal does not store your personal financial inputs.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 text-sm text-gray-500">
          <span className="inline-flex items-center gap-2">
            <IndianRupee className="h-4 w-4 text-gray-400" />
            Powered by MoneyCal tools
          </span>
          <span className="inline-flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-gray-400" />
            Updated explanations and guides
          </span>
        </div>
      </div>
    </section>
  );
};

export default ToolQualityFooter;
