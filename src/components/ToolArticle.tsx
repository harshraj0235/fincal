import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export interface ToolArticleProps {
  title: string;
  context: {
    name: string;
    category: string;
    keywords?: string[];
    goal?: string;
  };
  links: Array<{ href: string; label: string }>;
}

/**
 * Reusable long-form article block for tool pages.
 * Optimized headings, lists, and internal links for SEO readability.
 */
const ToolArticle: React.FC<ToolArticleProps> = ({ title, context, links }) => {
  const keywordLine = context.keywords && context.keywords.length
    ? ` Common related searches include ${context.keywords.slice(0, 6).join(', ')} and more.`
    : '';

  return (
    <div className="prose max-w-none">
      <h2>About {title}</h2>
      <p>
        Use the {context.name.toLowerCase()} to make smarter {context.category.toLowerCase()} decisions. It offers clean inputs, instant
        calculations, visual summaries, and exportable reports so you can share results and act quickly.{keywordLine}
      </p>

      <h3>What this tool helps you do</h3>
      <ul>
        <li>Plan with confidence using real-time calculations and helpful defaults</li>
        <li>Understand numbers at a glance with color-coded charts and totals</li>
        <li>Export a PDF report and share with family, team members, or your advisor</li>
        <li>Use on mobile or desktop—no sign-up, no data storage</li>
      </ul>

      <h3>How to use</h3>
      <ol>
        <li>Enter your data in the inputs at the top of the page</li>
        <li>Review the live results and charts below the inputs</li>
        <li>Refine assumptions and compare scenarios until you’re satisfied</li>
        <li>Click “Download PDF” to save or share your result</li>
      </ol>

      <h3>Example calculation</h3>
      <p>
        Suppose you enter typical values for your scenario. The results panel instantly updates the key metrics and visual breakdowns.
        You can adjust inputs to see how the outcome changes. This helps with price discovery, budget allocation, and agreement within
        a family or team.
      </p>

      <h3>Formulas explained</h3>
      <ul>
        <li><strong>Totals:</strong> Sum of line items or calculated costs based on price × quantity</li>
        <li><strong>Percentages:</strong> Conversion between rates (e.g., per‑annum to monthly) and applied to base values</li>
        <li><strong>Time value:</strong> Compounded growth where relevant to long‑term planning</li>
      </ul>

      <h3>Common mistakes to avoid</h3>
      <ul>
        <li>Using outdated prices—try to verify current rates before finalizing decisions</li>
        <li>Ignoring small fees or surcharges that can add up meaningfully</li>
        <li>Not comparing at least two scenarios for a better sense of sensitivity</li>
      </ul>

      <h3>Best practices and tips</h3>
      <ul>
        <li>Start with conservative assumptions, then fine-tune for your city and vendor</li>
        <li>For big decisions, compare two or three scenarios to understand sensitivity</li>
        <li>Keep screenshots or the PDF for your records and future planning</li>
      </ul>

      <h3>Advanced usage</h3>
      <p>
        Use this tool as a planning canvas. Create multiple scenarios—optimistic, base, and conservative—and compare how totals or
        outcomes change. This helps you negotiate better, optimize timing, and control costs without sacrificing quality.
      </p>

      <h3>FAQs</h3>
      <p><strong>Is the {context.name.toLowerCase()} free?</strong> Yes. It’s free, mobile-friendly, and requires no login.</p>
      <p><strong>Can I download or print?</strong> Yes. Use the Download PDF button under the results panel.</p>
      <p><strong>Are values exact?</strong> These are smart estimates for planning. Confirm final numbers with your provider.</p>

      <h3>Related tools and guides</h3>
      <ul>
        {links.map((l) => (
          <li key={l.href}><RouterLink to={l.href} className="text-blue-700 underline">{l.label}</RouterLink></li>
        ))}
      </ul>

      <h3>Glossary</h3>
      <ul>
        <li><strong>Assumption:</strong> A chosen input used to model outcomes; adjust based on current market data</li>
        <li><strong>Breakdown:</strong> Visual summary of components contributing to a total</li>
        <li><strong>Scenario:</strong> A set of inputs representing one possible plan; compare 2–3 scenarios</li>
      </ul>

      <h3>Disclaimer</h3>
      <p>
        This information is for education and planning. It does not constitute financial, legal, or tax advice. Please consult
        a qualified professional for personalized guidance.
      </p>
    </div>
  );
};

export default ToolArticle;


