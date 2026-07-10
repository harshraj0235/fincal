import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { AlertTriangle, IndianRupee, PieChart, ShieldCheck, Target, TrendingUp } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';

const clampExpenseInputs = (
  nextRevenue: number,
  nextCogs: number,
  nextOperating: number,
  nextOther: number
) => {
  const revenueValue = Math.max(0, nextRevenue);
  const cogsValue = Math.min(Math.max(0, nextCogs), revenueValue);
  const operatingMax = Math.max(0, revenueValue - cogsValue);
  const operatingValue = Math.min(Math.max(0, nextOperating), operatingMax);
  const otherMax = Math.max(0, revenueValue - cogsValue - operatingValue);
  const otherValue = Math.min(Math.max(0, nextOther), otherMax);
  return { revenueValue, cogsValue, operatingValue, otherValue };
};

const presets = [
  {
    label: 'Retail store',
    revenue: 1800000,
    cogs: 1200000,
    operating: 360000,
    other: 60000
  },
  {
    label: 'Restaurant',
    revenue: 900000,
    cogs: 420000,
    operating: 320000,
    other: 50000
  },
  {
    label: 'Services firm',
    revenue: 1500000,
    cogs: 350000,
    operating: 700000,
    other: 90000
  },
  {
    label: 'Ecommerce brand',
    revenue: 2400000,
    cogs: 1500000,
    operating: 600000,
    other: 120000
  }
];

const contentData = {
  title: 'Profit Margin Calculator',
  description:
    'This Profit Margin Calculator India edition helps you compute gross profit margin, operating margin, and net profit margin in one view. It is built for Indian businesses to compare selling price, cost price, operating costs, and other expenses so you can see how pricing and cost structure impact profitability. Use it as a gross profit margin calculator, operating margin calculator, or net profit margin calculator depending on the decision you are making.',
  benefits: [
    'Calculate gross, operating, and net profit margin instantly for any revenue scenario',
    'Understand whether pricing covers cost of goods, overheads, and indirect expenses',
    'Compare multiple scenarios quickly before changing price or discount strategy',
    'Estimate break-even revenue needed to cover all costs',
    'Track margin impact for GST-inclusive or GST-exclusive pricing',
    'Benchmark profitability across retail, services, manufacturing, and ecommerce'
  ],
  howToSteps: [
    {
      step: 'Enter revenue for the period',
      details: 'Use total sales for the month, quarter, or year. If you sell on GST inclusive prices, enter revenue consistently the same way you track costs.'
    },
    {
      step: 'Add cost of goods sold',
      details: 'Include raw materials, direct labor, packaging, and all variable costs directly tied to producing the product or service.'
    },
    {
      step: 'Fill operating expenses',
      details: 'Add rent, salaries, marketing, logistics, tech tools, and all overhead costs that keep the business running.'
    },
    {
      step: 'Include other expenses',
      details: 'Add interest, depreciation, bad debt, commissions, or one-time costs that affect net margin.'
    },
    {
      step: 'Review margins and insights',
      details: 'Use the margin breakdown to compare scenarios and decide where to improve pricing, procurement, or operating efficiency.'
    }
  ],
  examples: [
    {
      scenario: 'Retail apparel store',
      inputs: [
        { label: 'Revenue', value: '₹18,00,000' },
        { label: 'COGS', value: '₹12,00,000' },
        { label: 'Operating expenses', value: '₹3,60,000' },
        { label: 'Other expenses', value: '₹60,000' }
      ],
      result: 'Net margin ≈ 16.7%',
      explanation:
        'A balanced inventory mix and controlled overheads keep the net margin healthy. If discounts increase, the gross margin will fall fast, so keep a watch on price promotions.'
    },
    {
      scenario: 'Restaurant with delivery',
      inputs: [
        { label: 'Revenue', value: '₹9,00,000' },
        { label: 'COGS', value: '₹4,20,000' },
        { label: 'Operating expenses', value: '₹3,20,000' },
        { label: 'Other expenses', value: '₹50,000' }
      ],
      result: 'Net margin ≈ 15.6%',
      explanation:
        'Delivery commissions and wastage make margins tight. Small improvements in raw material cost or staff scheduling can improve net margin by 2-3 points.'
    },
    {
      scenario: 'Professional services firm',
      inputs: [
        { label: 'Revenue', value: '₹15,00,000' },
        { label: 'COGS', value: '₹3,50,000' },
        { label: 'Operating expenses', value: '₹7,00,000' },
        { label: 'Other expenses', value: '₹90,000' }
      ],
      result: 'Net margin ≈ 27.3%',
      explanation:
        'Service businesses often have higher gross margins but operating expenses dominate. Keeping billable utilization high protects operating margin.'
    }
  ],
  tips: [
    'Track gross margin per product to avoid cross-subsidizing poor performers.',
    'Separate fixed and variable expenses so you can model volume changes accurately.',
    'If discounts are frequent, measure margin after discounts, not list price.',
    'Review GST treatment to avoid mixing inclusive and exclusive values.',
    'Use this profit margin calculator for wholesale, retail, and ecommerce scenarios.',
    'Combine it with a break-even calculator to plan minimum sales targets.',
    'Compare actuals monthly to detect margin erosion early.',
    'Use contribution margin to decide which products deserve marketing spend.'
  ],
  mistakes: [
    'Mixing revenue that includes GST with costs that exclude GST.',
    'Ignoring delivery fees, commissions, and payment gateway charges.',
    'Forgetting owner salary, depreciation, or interest when calculating net margin.',
    'Using mark-up percentage when you actually need profit margin.',
    'Calculating margin on invoices instead of realized collections.',
    'Not updating costs when raw material prices change.'
  ],
  faqs: [
    {
      question: 'What is the formula for profit margin?',
      answer:
        'Profit margin is calculated as Profit ÷ Revenue × 100. For gross margin, use (Revenue − COGS) ÷ Revenue × 100. For operating margin, use Operating Profit ÷ Revenue × 100. For net margin, use Net Profit ÷ Revenue × 100.'
    },
    {
      question: 'What is the difference between markup and margin?',
      answer:
        'Markup is profit divided by cost, while margin is profit divided by revenue. A 25% margin equals a 33.3% markup. This calculator focuses on margins so you can compare profitability across products and industries.'
    },
    {
      question: 'How do I calculate profit margin for GST-inclusive pricing?',
      answer:
        'Use consistent inputs. If revenue is GST-inclusive, costs should also be GST-inclusive. Many businesses prefer GST-exclusive numbers for margin analysis to avoid tax distortions.'
    },
    {
      question: 'What is a good net profit margin in India?',
      answer:
        'It varies by industry. Retail is often 3-8%, restaurants 8-15%, manufacturing 10-20%, and services or software can exceed 20%. Use benchmarks as a guide, not an absolute rule.'
    },
    {
      question: 'Can I use this calculator for ecommerce margin?',
      answer:
        'Yes. Include marketplace commissions, shipping fees, returns, and payment gateway charges under operating or other expenses to calculate true net margin.'
    },
    {
      question: 'How do I improve profit margin quickly?',
      answer:
        'Start by reducing high-variance costs like procurement, logistics, and discounting. Then improve pricing, product mix, and operating efficiency. A small 2% improvement in gross margin can dramatically lift net margin.'
    },
    {
      question: 'Why is my gross margin high but net margin low?',
      answer:
        'High operating expenses, marketing spend, or finance costs can reduce net margin even when gross margin is strong. Review fixed costs and recurring overheads.'
    },
    {
      question: 'Does this work for service businesses?',
      answer:
        'Yes. For services, replace cost of goods with direct labor or subcontractor costs. Operating expenses will include office, tools, and overhead.'
    }
  ],
  relatedCalculators: [
    { name: 'Break Even Calculator', url: '/calculators/break-even-calculator', description: 'Find the minimum sales needed to cover fixed costs.' },
    { name: 'GST Calculator for Sellers', url: '/calculators/gst-seller-calculator', description: 'Estimate GST impact on invoice pricing and margin.' },
    { name: 'Inventory Turnover Calculator', url: '/calculators/inventory-turnover-calculator', description: 'Measure how fast inventory converts into sales.' },
    { name: 'Debt Equity Calculator', url: '/calculators/debt-equity-calculator', description: 'Evaluate leverage and funding mix for growth.' },
    { name: 'Budget Calculator', url: '/calculators/budget-calculator', description: 'Plan monthly cash flow and expense allocation.' },
    { name: 'Net Worth Calculator', url: '/calculators/net-worth-calculator', description: 'Track business owner net worth over time.' }
  ],
  lastUpdated: '2026-02-16'
};

const longFormGuide = [
  'Profit margin is the fastest signal of business health, and this Profit Margin Calculator India edition is built to show that signal clearly. Many founders, shop owners, and finance teams track sales but forget to connect sales with true cost structure. A profit margin calculator solves that gap by showing gross, operating, and net margin together so you can see where profitability is created or lost. If you search for a gross profit margin calculator, operating margin calculator, or net profit margin calculator, you are essentially asking the same question from three perspectives: how much value remains after direct costs, after operating overheads, and after every other expense.',
  'Margin analysis starts with clean inputs. Revenue should reflect what you actually collect or invoice, and cost of goods should reflect the direct costs that rise and fall with sales volume. In retail, cost of goods is purchase price plus freight-in and packaging. In manufacturing, it includes raw materials, direct labor, and production utilities. In services, cost of goods is the delivery cost of the service itself, often salary for billable staff or contractor fees. When revenue and cost of goods are aligned correctly, the gross profit margin becomes a reliable signal of product or service economics.',
  'Operating margin answers a different question: do your operations scale efficiently? After gross profit, subtract salaries, rent, tech tools, marketing, and logistics to see operating profit. A business may show a healthy gross margin but still lose money because overheads or marketing spend are too high. Operating margin keeps you focused on efficiency. For a growing brand, operating margin improvement is often more important than top-line growth because it reduces cash burn and improves resilience in slow seasons.',
  'Net margin is what remains after all expenses, including interest, depreciation, write-offs, and one-time costs. Net margin matters for cash planning and valuation. A high net margin indicates you are generating free cash, while a low or negative net margin signals the need for pricing changes, cost controls, or efficiency upgrades. This profit margin calculator also highlights how small changes in revenue or costs can shift net margin quickly, helping you compare trade-offs between growth and profitability.',
  'In India, margin reporting can be distorted by GST treatment. If you show revenue inclusive of GST but costs exclusive of GST, your margin will look artificially low. The simplest approach is to use GST-exclusive values for both revenue and costs. If you only have GST-inclusive figures, keep them consistent across inputs. For ecommerce sellers, the key is to include platform commissions, shipping fees, and payment gateway charges in operating or other expenses so your net profit margin reflects true take-home performance.',
  'A common confusion is markup versus margin. Markup is profit divided by cost, while margin is profit divided by revenue. For example, if your cost is ₹100 and you sell at ₹150, your markup is 50% but your margin is 33.3%. Many Indian businesses price with markup but measure profitability with margin, and the mismatch causes planning errors. This calculator is a margin-based tool, which makes it comparable across industries and consistent with financial reporting.',
  'If you run a retail shop, this profit margin calculator for retail shop use cases should focus on gross margin by product category and net margin by store. Apparel, electronics, and grocery have very different gross margins. Promotions, shrinkage, and clearance stock can quickly erode margins. The calculator helps you test what happens when you change average selling price, supplier cost, or discounting rate. Use the presets to simulate a typical shop month and then adjust costs to see the impact on net margin.',
  'For restaurants, a profit margin calculator for restaurant analysis must account for food cost, labor cost, and wastage. Food cost is usually 25-35% of revenue, labor often 20-30%, and rent varies by city. Delivery platforms add commissions that reduce net margin. This tool allows you to model delivery-heavy revenue vs dine-in revenue by changing operating expenses and other costs. Tracking the gap between gross and net margin makes it easier to identify where operational efficiency gains will create the biggest impact.',
  'Manufacturing and trading businesses often search for a profit margin calculator for manufacturing or wholesale. The key here is to separate direct material cost from indirect overhead such as power, maintenance, and factory admin. If you can reduce raw material cost by even 2%, gross margin increases and net margin improves disproportionately because overhead is already fixed. This calculator helps you quantify that leverage and plan procurement negotiations with more clarity.',
  'Service businesses and agencies need a profit margin calculator for services where cost of goods is the direct labor cost for delivery. If utilization is low, gross margin shrinks quickly because salaries stay fixed. In that case, operating margin can appear worse than net margin if you are capitalizing certain costs or if there are one-time expenses. Modeling both operating margin and net margin helps you see how much of the problem is utilization versus overhead.',
  'If you sell online, a profit margin calculator for ecommerce should include returns, replacement costs, packaging, and payment gateway fees. The most common ecommerce mistake is focusing only on gross margin while ignoring shipping and platform costs. Another mistake is not accounting for return rates. A 10% return rate can wipe out 2-3 points of net margin if reverse logistics are expensive. Use this calculator to test a scenario with higher return rates and see how sensitive your net profit margin is to operational friction.',
  'This tool is also a practical profit margin calculator per product. You can isolate one product line by entering its revenue and cost of goods, then add its share of marketing and overhead in operating expenses. This is useful when deciding whether to invest more in a product, discontinue it, or change its pricing. Product-level margin analysis often reveals that a high-sales product might be a low-margin product, while a smaller product line could be the true profit engine.',
  'Pricing decisions benefit from margin modeling. If you are considering a price increase of 5%, use the calculator to see how much net margin improves, assuming costs stay constant. Then test a scenario where volume drops slightly to check if the higher price still delivers better net profit. This is the core purpose of any profit margin calculator India business owners rely on: to see not just profitability today but also the range of profitability under realistic market reactions.',
  'Break-even analysis is closely related to margin. When revenue equals total costs, net profit is zero. Once you know your typical cost structure, you can calculate a minimum sales target for each month or quarter. Combine this calculator with a break-even calculator for stronger planning. For example, if your gross margin is 40% and your fixed overhead is ₹4,00,000, then you need at least ₹10,00,000 in revenue to break even. This calculation is simplified here by showing total costs and net margin in one view.',
  'Investors and lenders often evaluate margin stability. A business that maintains steady gross margin and improving net margin is more likely to attract capital. If margins swing wildly each month, it may indicate unreliable pricing or poor cost discipline. This tool helps you create a margin dashboard for board reviews or lender discussions. For small business owners seeking working capital, showing a stable net margin is often as important as showing revenue growth.',
  'When you compare gross margin vs operating margin, the gap tells a story. A large gap signals operational inefficiency or heavy overhead. A small gap indicates efficient operations or automation. If your gross margin is healthy but operating margin is weak, focus on optimizing fixed costs or shifting variable costs. If both gross and operating margins are low, you may need to renegotiate supplier contracts or raise prices. This tool helps you see that story quickly.',
  'Another advanced idea is contribution margin, which is revenue minus variable costs divided by revenue. It tells you how much each additional rupee of sales contributes to covering fixed costs. While this calculator focuses on gross and operating margins, you can approximate contribution margin by treating cost of goods as variable and operating expenses as fixed. This is useful for planning promotional campaigns where the goal is to increase volume without destroying margin.',
  'Profit margin also matters for cash flow. High net margin does not always mean strong cash if customers pay late. For B2B businesses, it is vital to connect margin analysis with collection cycles. If your margins are good but cash is tight, tighten credit terms or improve collection processes. Conversely, if you have strong cash flow but weak margins, it suggests you are financing growth with discounts or underpricing.',
  'To use this calculator as a profit margin calculator with GST, decide if your business metrics should be GST-exclusive or GST-inclusive and stay consistent. Most financial reporting in India uses GST-exclusive figures. If you sell GST-inclusive prices, you can still analyze margin by backing out GST from revenue and costs. This clarity helps you compare with industry benchmarks and prevents confusion during audit or tax planning.',
  'Benchmarking is helpful but not absolute. A retail business with 6% net margin may be excellent if it has high inventory turnover and low working capital. A manufacturing business with 12% net margin might still struggle if capital requirements are high. This is why margin should be evaluated along with turnover, cash conversion cycle, and growth rate. Use related calculators like inventory turnover and budget planning to contextualize margin results.',
  'If you are searching for a profit margin calculator for small business, the most important takeaway is that margin improvements compound. A 2% improvement in gross margin and a 1% reduction in overhead can lift net margin by 3-4 points. That is the difference between surviving and thriving during slow seasons. Use this calculator monthly, track actuals, and update your assumptions so your pricing and cost controls stay realistic.',
  'Finally, margin analysis is a strategic habit. It informs where to invest, which customer segments to prioritize, and which products to push. The goal is not to hit a perfect margin number but to build a business model that is stable and predictable. The Profit Margin Calculator on MoneyCal helps you do that with clear visuals, instant results, and a structured guide so you can make confident business decisions.'
];

export const ProfitMarginCalculator: React.FC = () => {
  const [revenue, setRevenue] = useState<number>(1000000);
  const [costOfGoods, setCostOfGoods] = useState<number>(600000);
  const [operatingExpenses, setOperatingExpenses] = useState<number>(200000);
  const [otherExpenses, setOtherExpenses] = useState<number>(50000);
  const [grossProfit, setGrossProfit] = useState<number>(0);
  const [operatingProfit, setOperatingProfit] = useState<number>(0);
  const [netProfit, setNetProfit] = useState<number>(0);
  const [margins, setMargins] = useState<{ gross: number; operating: number; net: number }>({
    gross: 0,
    operating: 0,
    net: 0
  });
  const [markup, setMarkup] = useState<number>(0);
  const [totalCosts, setTotalCosts] = useState<number>(0);

  useEffect(() => {
    const gross = revenue - costOfGoods;
    const operating = gross - operatingExpenses;
    const net = operating - otherExpenses;
    const safeRevenue = revenue > 0 ? revenue : 0;
    const grossMargin = safeRevenue > 0 ? (gross / safeRevenue) * 100 : 0;
    const operatingMargin = safeRevenue > 0 ? (operating / safeRevenue) * 100 : 0;
    const netMargin = safeRevenue > 0 ? (net / safeRevenue) * 100 : 0;
    const markupValue = costOfGoods > 0 ? (gross / costOfGoods) * 100 : 0;

    setGrossProfit(gross);
    setOperatingProfit(operating);
    setNetProfit(net);
    setMargins({
      gross: grossMargin,
      operating: operatingMargin,
      net: netMargin
    });
    setMarkup(markupValue);
    setTotalCosts(costOfGoods + operatingExpenses + otherExpenses);
  }, [revenue, costOfGoods, operatingExpenses, otherExpenses]);

  const applyPreset = (preset: typeof presets[number]) => {
    const clamped = clampExpenseInputs(preset.revenue, preset.cogs, preset.operating, preset.other);
    setRevenue(clamped.revenueValue);
    setCostOfGoods(clamped.cogsValue);
    setOperatingExpenses(clamped.operatingValue);
    setOtherExpenses(clamped.otherValue);
  };

  const handleRevenueChange = (value: number) => {
    const clamped = clampExpenseInputs(value, costOfGoods, operatingExpenses, otherExpenses);
    setRevenue(clamped.revenueValue);
    setCostOfGoods(clamped.cogsValue);
    setOperatingExpenses(clamped.operatingValue);
    setOtherExpenses(clamped.otherValue);
  };

  const handleCogsChange = (value: number) => {
    const clamped = clampExpenseInputs(revenue, value, operatingExpenses, otherExpenses);
    setCostOfGoods(clamped.cogsValue);
    setOperatingExpenses(clamped.operatingValue);
    setOtherExpenses(clamped.otherValue);
  };

  const handleOperatingChange = (value: number) => {
    const clamped = clampExpenseInputs(revenue, costOfGoods, value, otherExpenses);
    setOperatingExpenses(clamped.operatingValue);
    setOtherExpenses(clamped.otherValue);
  };

  const handleOtherChange = (value: number) => {
    const clamped = clampExpenseInputs(revenue, costOfGoods, operatingExpenses, value);
    setOtherExpenses(clamped.otherValue);
  };

  const chartNetProfit = Math.max(0, netProfit);
  const marginTone = margins.net >= 0 ? 'text-emerald-600' : 'text-rose-600';
  const netStatus = netProfit >= 0 ? 'Profitable' : 'Loss-making';
  const netStatusBg = netProfit >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200';

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
                Revenue and Cost Inputs
              </h2>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => applyPreset(preset)}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-[--primary-50] text-[--primary-700] border border-[--primary-100] hover:bg-[--primary-100]"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <label htmlFor="revenue" className="text-sm font-medium text-neutral-700">
                    Revenue (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={10000}
                    value={revenue}
                    onChange={(e) => handleRevenueChange(Number(e.target.value))}
                    className="w-40 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm text-neutral-900"
                  />
                </div>
                <input
                  type="range"
                  id="revenue"
                  min="0"
                  max="10000000"
                  step="10000"
                  value={revenue}
                  onChange={(e) => handleRevenueChange(Number(e.target.value))}
                  className="slider"
                />
                <p className="text-xs text-neutral-500 mt-2">
                  Total sales for the selected period. Keep it consistent with the cost values.
                </p>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <label htmlFor="cost-of-goods" className="text-sm font-medium text-neutral-700">
                    Cost of Goods Sold (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={revenue}
                    step={5000}
                    value={costOfGoods}
                    onChange={(e) => handleCogsChange(Number(e.target.value))}
                    className="w-40 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm text-neutral-900"
                  />
                </div>
                <input
                  type="range"
                  id="cost-of-goods"
                  min="0"
                  max={revenue}
                  step="5000"
                  value={costOfGoods}
                  onChange={(e) => handleCogsChange(Number(e.target.value))}
                  className="slider"
                />
                <p className="text-xs text-neutral-500 mt-2">
                  Direct production or purchase cost, including raw material and packaging.
                </p>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <label htmlFor="operating-expenses" className="text-sm font-medium text-neutral-700">
                    Operating Expenses (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={Math.max(0, revenue - costOfGoods)}
                    step={5000}
                    value={operatingExpenses}
                    onChange={(e) => handleOperatingChange(Number(e.target.value))}
                    className="w-40 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm text-neutral-900"
                  />
                </div>
                <input
                  type="range"
                  id="operating-expenses"
                  min="0"
                  max={Math.max(0, revenue - costOfGoods)}
                  step="5000"
                  value={operatingExpenses}
                  onChange={(e) => handleOperatingChange(Number(e.target.value))}
                  className="slider"
                />
                <p className="text-xs text-neutral-500 mt-2">
                  Salaries, rent, marketing, logistics, subscriptions, and overheads.
                </p>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <label htmlFor="other-expenses" className="text-sm font-medium text-neutral-700">
                    Other Expenses (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={Math.max(0, revenue - costOfGoods - operatingExpenses)}
                    step={2000}
                    value={otherExpenses}
                    onChange={(e) => handleOtherChange(Number(e.target.value))}
                    className="w-40 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm text-neutral-900"
                  />
                </div>
                <input
                  type="range"
                  id="other-expenses"
                  min="0"
                  max={Math.max(0, revenue - costOfGoods - operatingExpenses)}
                  step="2000"
                  value={otherExpenses}
                  onChange={(e) => handleOtherChange(Number(e.target.value))}
                  className="slider"
                />
                <p className="text-xs text-neutral-500 mt-2">
                  Interest, depreciation, commissions, bad debts, or one-time charges.
                </p>
              </div>
            </div>
          </div>

          <div className={`border rounded-2xl p-6 ${netStatusBg}`}>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-[--primary-600]" />
                Profit Summary
              </h3>
              <span className={`text-sm font-semibold ${marginTone}`}>{netStatus}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Gross Profit</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(grossProfit)}</p>
                <p className="text-sm text-neutral-500">{margins.gross.toFixed(1)}% margin</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Operating Profit</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(operatingProfit)}</p>
                <p className="text-sm text-neutral-500">{margins.operating.toFixed(1)}% margin</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Net Profit</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(netProfit)}</p>
                <p className={`text-sm font-medium ${marginTone}`}>{margins.net.toFixed(1)}% margin</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
              Cost Breakup
            </h2>
            <div className="mt-4 h-64">
              <ResultChart
                data={[
                  { name: 'Cost of Goods', value: costOfGoods, color: '#ef4444' },
                  { name: 'Operating Expenses', value: operatingExpenses, color: '#f59e0b' },
                  { name: 'Other Expenses', value: otherExpenses, color: '#a855f7' },
                  { name: 'Net Profit', value: chartNetProfit, color: '#22c55e' }
                ]}
                centerText={`${formatCurrency(revenue)}\nRevenue`}
              />
            </div>
            {netProfit < 0 && (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                <AlertTriangle className="h-4 w-4 mt-0.5" />
                Net profit is negative. Review pricing, COGS, or overheads to restore profitability.
              </div>
            )}
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
              <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
              Margin Insights
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-neutral-900">Gross Margin</h3>
                  <span className="text-sm font-semibold text-neutral-900">{margins.gross.toFixed(1)}%</span>
                </div>
                <p className="text-sm text-neutral-600">
                  Indicates product-level efficiency before overheads. Use it to compare categories and suppliers.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-neutral-900">Operating Margin</h3>
                  <span className="text-sm font-semibold text-neutral-900">{margins.operating.toFixed(1)}%</span>
                </div>
                <p className="text-sm text-neutral-600">
                  Shows how efficiently you run operations after salaries, rent, marketing, and logistics.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-neutral-900">Net Margin</h3>
                  <span className={`text-sm font-semibold ${marginTone}`}>{margins.net.toFixed(1)}%</span>
                </div>
                <p className="text-sm text-neutral-600">
                  Your true profit percentage after all expenses, useful for cash planning and valuation.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-neutral-900">Markup</h3>
                  <span className="text-sm font-semibold text-neutral-900">{markup.toFixed(1)}%</span>
                </div>
                <p className="text-sm text-neutral-600">
                  Markup compares profit to cost. It is higher than margin and helps with pricing decisions.
                </p>
              </div>
              <div className="p-4 bg-[--accent-50] rounded-lg border border-[--accent-100]">
                <h3 className="text-base font-semibold text-[--accent-900] mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Quick Benchmarks
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                  <li>Retail: 3-8% net margin</li>
                  <li>Restaurants: 8-15% net margin</li>
                  <li>Manufacturing: 10-20% net margin</li>
                  <li>Services & software: 20%+ net margin</li>
                </ul>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <p className="text-sm text-neutral-600">
                  Total costs: <span className="font-semibold text-neutral-900">{formatCurrency(totalCosts)}</span> ·
                  Break-even revenue target equals total costs for this period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <CalculatorContentWrapper {...contentData} />
      </div>

      <section className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
          Profit Margin Calculator Guide for Indian Businesses
        </h2>
        <div className="space-y-4 text-neutral-700 leading-7">
          {longFormGuide.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  );
};
