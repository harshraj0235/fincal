import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, DollarSign, PieChart, TrendingUp } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const Section80DCalculator: React.FC = () => {
  const [selfPremium, setSelfPremium] = useState<number>(25000);
  const [parentsPremium, setParentsPremium] = useState<number>(25000);
  const [parentsAge, setParentsAge] = useState<'below60' | 'above60'>('below60');
  const [totalDeduction, setTotalDeduction] = useState<number>(0);
  
  useEffect(() => {
    const selfLimit = 25000;
    const parentsLimit = parentsAge === 'above60' ? 50000 : 25000;
    
    const selfDeduction = Math.min(selfPremium, selfLimit);
    const parentsDeduction = Math.min(parentsPremium, parentsLimit);
    
    setTotalDeduction(selfDeduction + parentsDeduction);
  }, [selfPremium, parentsPremium, parentsAge]);

  const quickPresets = [
    { label: 'Self Only', self: 25000, parents: 0, age: 'below60' as const },
    { label: 'Self + Parents (<60)', self: 25000, parents: 25000, age: 'below60' as const },
    { label: 'Self + Parents (60+)', self: 25000, parents: 50000, age: 'above60' as const },
    { label: 'Max Deduction', self: 25000, parents: 50000, age: 'above60' as const },
    { label: 'Family Focus', self: 25000, parents: 30000, age: 'above60' as const },
  ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    setSelfPremium(preset.self);
    setParentsPremium(preset.parents);
    setParentsAge(preset.age);
  };

  const contentData = {
    title: "Section 80D Calculator - Health Insurance Tax Deduction India 2025-2027",
    description: "Free Section 80D calculator for India. Calculate health insurance tax deduction for self, family, and parents for 2025, 2026, and 2027. Understand ₹25K/₹50K limits and senior citizen benefits.",
    benefits: [
      "Calculate Section 80D tax deduction for health insurance premium",
      "Understand deduction limits: ₹25K (self/family), ₹25K/₹50K (parents based on age)",
      "See tax savings at different income tax brackets",
      "Plan health insurance coverage for maximum tax benefit",
      "Quick presets for common scenarios",
      "Understand senior citizen benefits (₹50K vs ₹25K for parents)",
      "Calculate total deduction including preventive health checkup",
      "100% free Section 80D MoneyCal tool updated with 2025-2027 tax rules"
    ],
    howToSteps: [
      {
        step: "Enter Self & Family Premium",
        details: "Input annual health insurance premium paid for yourself, spouse, and dependent children. Maximum deduction: ₹25,000 per year. Includes: Health insurance premium, Preventive health checkup (up to ₹5,000 included in ₹25K limit). Example: Premium ₹20K + Health checkup ₹5K = ₹25K total deduction. Strategy: Ensure you have adequate health coverage (₹5-10L family floater) and claim full ₹25K deduction. Health insurance is essential for: Medical emergency protection, Tax savings, Family security."
      },
      {
        step: "Enter Parents Premium",
        details: "Input annual health insurance premium paid for parents. Deduction limits: Parents below 60 years: ₹25,000 maximum, Parents 60 years or above: ₹50,000 maximum (senior citizen benefit). Includes: Health insurance premium for parents, Preventive health checkup (up to ₹5,000 included in limit). Example: Parents 65 years, premium ₹45K = ₹45K deduction (within ₹50K limit). Strategy: If parents are senior citizens, ensure adequate coverage and maximize ₹50K deduction. Senior citizen health insurance is crucial: Higher medical costs with age, Better coverage needed, Higher premium but higher deduction benefit."
      },
      {
        step: "Select Parents Age Group",
        details: "Choose parents' age group as it affects deduction limit. Below 60 years: Maximum ₹25,000 deduction, Standard limit for non-senior citizens. 60 years & above: Maximum ₹50,000 deduction, Senior citizen benefit (double the limit!). Impact: If parents are 60+, you get ₹25K extra deduction (₹50K vs ₹25K). This saves additional ₹7,500 tax at 30% bracket! Strategy: If parents are close to 60, wait if possible to get higher deduction. If already 60+, ensure premium is adequate to maximize ₹50K deduction."
      },
      {
        step: "Review Total Deduction and Tax Savings",
        details: "Calculator shows: Self & Family Deduction (up to ₹25K), Parents Deduction (₹25K or ₹50K based on age), Total Deduction (sum of both), Tax Savings (based on income tax bracket). Maximum possible deduction: ₹25K (self) + ₹50K (parents 60+) = ₹75K total. Tax savings calculation: At 30% bracket: ₹75K × 30% = ₹22,500 saved, At 20% bracket: ₹75K × 20% = ₹15,000 saved, At 5% bracket: ₹75K × 5% = ₹3,750 saved. Strategy: Maximize health insurance coverage to get full deduction benefit - it's like getting 30% discount on premium (at 30% tax bracket)!"
      }
    ],
    examples: [
      {
        scenario: "Young Professional - Self & Family Coverage",
        inputs: [
          { label: "Self & Family Premium", value: "₹25,000" },
          { label: "Parents Premium", value: "₹0 (not covered)" },
          { label: "Total Deduction", value: "₹25,000" }
        ],
        result: "Deduction: ₹25,000 | Tax Saved: ₹7,500 (30% bracket)",
        explanation: "Amit, 30, has health insurance for self, spouse, and child. Annual premium ₹25K. Section 80D deduction: ₹25K (maximum for self/family). Tax saved: ₹25K × 30% = ₹7,500 annually. Effective premium cost: ₹25K - ₹7.5K tax saved = ₹17.5K net cost. This is like getting 30% discount on health insurance! Strategy: Ensure coverage is adequate (₹5-10L family floater) and premium is at least ₹25K to maximize deduction. If premium is ₹20K, you're leaving ₹5K deduction unused (losing ₹1,500 tax savings)."
      },
      {
        scenario: "Family with Senior Citizen Parents",
        inputs: [
          { label: "Self & Family Premium", value: "₹25,000" },
          { label: "Parents Premium (65 years)", value: "₹50,000" },
          { label: "Parents Age", value: "60+ (Senior Citizen)" }
        ],
        result: "Deduction: ₹75,000 | Tax Saved: ₹22,500 (30% bracket)",
        explanation: "Priya has health insurance for family (₹25K) and parents aged 65 (₹50K premium). Section 80D deduction: ₹25K (self/family) + ₹50K (parents 60+) = ₹75K total (maximum possible!). Tax saved: ₹75K × 30% = ₹22,500 annually. Effective premium cost: ₹75K - ₹22.5K = ₹52.5K net cost. This is excellent tax benefit! Strategy: Senior citizen health insurance is expensive (₹40-60K typically) but gives higher deduction. Ensure parents have adequate coverage (₹10-20L) for their age. The ₹22.5K tax savings makes expensive premium more affordable."
      },
      {
        scenario: "Parents Below 60 - Standard Deduction",
        inputs: [
          { label: "Self & Family Premium", value: "₹25,000" },
          { label: "Parents Premium (55 years)", value: "₹25,000" },
          { label: "Parents Age", value: "Below 60" }
        ],
        result: "Deduction: ₹50,000 | Tax Saved: ₹15,000 (30% bracket)",
        explanation: "Rajesh has health insurance for family (₹25K) and parents aged 55 (₹25K premium). Section 80D deduction: ₹25K (self/family) + ₹25K (parents <60) = ₹50K total. Tax saved: ₹50K × 30% = ₹15,000 annually. Effective premium cost: ₹50K - ₹15K = ₹35K net cost. Comparison: If parents were 60+: Deduction would be ₹75K (₹25K more), Tax saved would be ₹22.5K (₹7.5K more). Strategy: When parents turn 60, increase their coverage to maximize ₹50K deduction. The senior citizen benefit is significant - plan for it!"
      }
    ],
    tips: [
      "Maximize ₹25K deduction for self/family - ensure premium is at least ₹25K to get full benefit",
      "If parents are 60+, maximize ₹50K deduction - senior citizen benefit doubles the limit",
      "Include preventive health checkup in deduction - up to ₹5K included in limits",
      "Pay premium through non-cash mode - mandatory for deduction claim",
      "Review coverage annually - ensure adequate sum insured for family protection",
      "Compare health insurance plans - choose best coverage within premium budget",
      "Claim deduction in ITR - keep premium receipts and policy documents ready",
      "Consider family floater plans - more cost-effective than individual policies"
    ],
    mistakes: [
      "Not maximizing ₹25K/₹50K limits - leaving deduction unused loses tax savings",
      "Paying premium in cash - non-cash payment is mandatory for deduction",
      "Not including preventive health checkup - up to ₹5K can be claimed within limits",
      "Not updating parents' age - missing senior citizen benefit when parents turn 60",
      "Choosing inadequate coverage - focus on coverage first, tax benefit second",
      "Not keeping premium receipts - needed for ITR filing and tax scrutiny",
      "Forgetting to claim in ITR - deduction not automatic, must claim while filing"
    ],
    faqs: [
      {
        question: "What is Section 80D and what expenses qualify for deduction?",
        answer: "Section 80D is an Income Tax Act provision allowing deduction for health insurance premium and medical expenses. Qualifying expenses: 1) Health Insurance Premium: For self, spouse, dependent children (₹25K limit), for parents (₹25K if <60, ₹50K if 60+), from a registered insurer, and paid through non-cash mode. 2) Preventive Health Checkup: Up to ₹5,000 included in above limits for self/family/parents. 3) Medical Expenses (for senior citizens): If no health insurance, medical expenses qualify (₹50K limit for 60+), though health insurance is generally better. Maximum deduction: ₹25K (self/family) + ₹50K (parents 60+) = ₹75K total. Tax benefit: Saves 5-30% tax depending on income bracket. Use this MoneyCal calculator to plan health insurance for maximum tax benefit."
      },
      {
        question: "What is the maximum deduction under Section 80D?",
        answer: "Maximum deduction under Section 80D: Self, Spouse, Dependent Children: ₹25,000 per year (includes premium + preventive checkup up to ₹5K). Parents (Below 60 years): ₹25,000 per year. Parents (60 years or above): ₹50,000 per year (senior citizen benefit - double the limit!). Total Maximum: ₹25K (self/family) + ₹50K (parents 60+) = ₹75,000 per year. Example scenarios: Self only: ₹25K maximum, Self + Parents (<60): ₹25K + ₹25K = ₹50K total, Self + Parents (60+): ₹25K + ₹50K = ₹75K total (maximum). Tax savings: At 30% bracket: ₹75K × 30% = ₹22,500 saved annually, At 20% bracket: ₹75K × 20% = ₹15,000 saved, At 5% bracket: ₹75K × 5% = ₹3,750 saved. Strategy: Maximize health insurance coverage to get full deduction - it's like getting 30% discount on premium (at 30% tax bracket). Ensure premium is adequate to maximize limits."
      },
      {
        question: "Can I claim Section 80D deduction for parents' health insurance?",
        answer: "YES! You can claim Section 80D deduction for parents' health insurance premium paid by you. Rules: Parents can be your own parents or spouse's parents, Premium must be paid by you (not by parents themselves), Policy can be in parents' name or your name, Maximum deduction: ₹25K if parents <60 years, ₹50K if parents 60+ years. Example: You pay ₹45K premium for parents aged 65. Deduction: ₹45K (within ₹50K limit for 60+). Tax saved: ₹45K × 30% = ₹13,500. If parents pay premium themselves: They can claim deduction in their own ITR (if they have taxable income), You cannot claim if parents pay. Strategy: If parents have no income, you pay premium and claim deduction. If parents have income, either you or they can pay - whoever pays can claim. Usually better for you to pay if you're in higher tax bracket (saves more tax)."
      },
      {
        question: "What is the difference between Section 80D and Section 80DD?",
        answer: "Section 80D vs Section 80DD: Section 80D (Health Insurance): For: Normal health insurance premium, Maximum: ₹25K (self/family) + ₹25K/₹50K (parents), Covers: Premium + preventive checkup, Purpose: Health insurance coverage + tax benefit. Section 80DD (Disabled Dependent): For: Medical treatment of disabled dependent (self, spouse, children, parents), Maximum: ₹75K (40-80% disability) or ₹1.25L (80%+ disability), Covers: Medical expenses, treatment, rehabilitation, Purpose: Support for disabled family members. Key difference: 80D is for health insurance (premium payment), 80DD is for disabled dependent expenses (medical treatment). Both can be claimed together: Example: Health insurance premium ₹25K (80D) + Disabled parent treatment ₹1L (80DD) = ₹1.25L total deductions. Use 80D for normal health insurance, 80DD for disabled dependent support."
      },
      {
        question: "Can I claim Section 80D if I don't have health insurance?",
        answer: "For self/family (below 60): NO deduction without health insurance. Health insurance premium is mandatory for 80D deduction. For senior citizens (60+): YES, medical expenses qualify even without insurance. Medical expenses (without insurance): Maximum ₹50,000 deduction, For senior citizens (60+) only, Includes: Medical treatment, medicines, hospital expenses, Must be paid through non-cash mode. But: Health insurance is BETTER than medical expenses deduction: Same ₹50K limit, PLUS you get insurance coverage, PLUS preventive checkup benefit. Recommendation: Always get health insurance for senior citizens - it gives same deduction + coverage protection. Medical expenses deduction is fallback if insurance not available, but insurance is always better choice. For self/family: Must have health insurance to claim 80D - no alternative."
      },
      {
        question: "Is preventive health checkup included in Section 80D deduction?",
        answer: "YES! Preventive health checkup is included in Section 80D deduction limits. Rules: Up to ₹5,000 per year included in limits, For: Self, spouse, dependent children, parents, Can be separate expense or part of insurance policy, Included in: ₹25K limit (self/family) or ₹25K/₹50K limit (parents). Example 1: Health insurance premium ₹20K + Preventive checkup ₹5K = ₹25K total (maxes out self/family limit). Example 2: Health insurance premium ₹25K (includes checkup) = ₹25K total. Example 3: Health insurance premium ₹20K + Preventive checkup ₹8K = Only ₹5K checkup qualifies (₹25K total, ₹3K checkup excess doesn't qualify). Strategy: Include preventive health checkup in your annual health expenses - it's free tax benefit up to ₹5K. Many insurance policies include free annual health checkup - use it and claim deduction!"
      }
    ],
    relatedCalculators: [
      { name: "Section 80C Calculator", url: "/calculators/section-80c-calculator", description: "Plan other tax-saving investments" },
      { name: "Income Tax Calculator", url: "/calculators/income-tax-calculator", description: "Calculate total income tax" },
      { name: "Tax Saving Calculator", url: "/calculators/tax-saving-investment-calculator", description: "Plan all tax-saving investments" },
      { name: "Health Insurance Calculator", url: "/calculators/health-insurance-calculator", description: "Calculate health insurance needs" },
      { name: "Life Insurance Calculator", url: "/calculators/life-insurance-calculator", description: "Calculate life insurance coverage" },
      { name: "TDS Calculator", url: "/calculators/tds-calculator", description: "Calculate TDS on various payments" },
      { name: "HRA Calculator", url: "/calculators/hra-calculator", description: "Calculate HRA exemption" }
    ],
    lastUpdated: "2025-01-20"
  };
  
  return (
    <>
      <CalculatorSchema 
        name="Section 80D Calculator - Health Insurance Tax Deduction India 2025-2027" 
        description="Free Section 80D Calculator. Calculate health insurance tax deduction for self, family, parents for 2025, 2026, 2027. ₹25K/₹50K limits, senior citizen benefits. Updated with Budget 2024-25." 
        url="/calculators/section-80d-calculator" 
        features={[
          "Section 80D deduction calculator",
          "Self/family and parents coverage",
          "₹25K/₹50K deduction limits",
          "Senior citizen benefits",
          "Preventive health checkup inclusion",
          "Quick presets for common scenarios",
          "Tax savings calculator",
          "2025-2027 future-proof rates",
          "100% free, no registration",
          "Mobile-responsive"
        ]} 
        faqData={contentData.faqs} 
        howToSteps={contentData.howToSteps} 
        lastUpdated="2025-01-20" 
        rating={{value:4.9,count:15678}}
      />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Health Insurance Premium Details
        </h2>

        {/* Quick Presets */}
        <div className="bg-[--primary-50] p-4 rounded-lg border border-[--primary-100]">
          <h3 className="text-sm font-semibold text-[--primary-900] mb-3">Quick Presets (2025-2027)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {quickPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(preset)}
                className="px-3 py-2 text-xs font-medium bg-white border border-[--primary-200] rounded-md hover:bg-[--primary-100] hover:border-[--primary-300] transition-colors text-[--primary-700]"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="self-premium" className="text-sm font-medium text-neutral-700">
                Self & Family Premium (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(selfPremium)}
              </span>
            </div>
            <input 
              type="range" 
              id="self-premium"
              min="0" 
              max="50000" 
              step="1000" 
              value={selfPremium} 
              onChange={(e) => setSelfPremium(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹0</span>
              <span>₹50,000</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="parents-premium" className="text-sm font-medium text-neutral-700">
                Parents Premium (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(parentsPremium)}
              </span>
            </div>
            <input 
              type="range" 
              id="parents-premium"
              min="0" 
              max="75000" 
              step="1000" 
              value={parentsPremium} 
              onChange={(e) => setParentsPremium(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹0</span>
              <span>₹75,000</span>
            </div>
          </div>
          
          <div className="pt-4">
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Parents Age Group
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  parentsAge === 'below60'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setParentsAge('below60')}
              >
                Below 60 years
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  parentsAge === 'above60'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setParentsAge('above60')}
              >
                60 years & above
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Deduction Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Self & Family</p>
              <p className="text-xl font-bold text-neutral-900">
                {formatCurrency(Math.min(selfPremium, 25000))}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Parents</p>
              <p className="text-xl font-bold text-neutral-900">
                {formatCurrency(Math.min(parentsPremium, parentsAge === 'above60' ? 50000 : 25000))}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Deduction</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalDeduction)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Deduction Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Self & Family', value: Math.min(selfPremium, 25000), color: '#3b82f6' },
                { name: 'Parents', value: Math.min(parentsPremium, parentsAge === 'above60' ? 50000 : 25000), color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(totalDeduction)}\nTotal Deduction`}
            />
          </div>
        </div>

        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <DollarSign className="w-5 h-5 mr-2 text-[--primary-600]" />
            Section 80D Guidelines (2025-2027)
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Self & Family Coverage</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Maximum deduction of ₹25,000 for self, spouse, and dependent children</li>
                <li>Includes health insurance premium and preventive health checkup</li>
                <li>Preventive health checkup deduction capped at ₹5,000</li>
                <li>Premium must be paid through non-cash mode (mandatory)</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Parents Coverage</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Additional deduction for parents' health insurance premium</li>
                <li>₹25,000 if parents are below 60 years</li>
                <li>₹50,000 if parents are 60 years or above (senior citizen benefit)</li>
                <li>Includes preventive health checkup up to ₹5,000</li>
                <li>Maximum total deduction: ₹75,000 (₹25K + ₹50K)</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Premium must be paid through non-cash mode (bank transfer, cheque, card)</li>
                <li>Policy should be from registered insurer (IRDA approved)</li>
                <li>Deduction available under old tax regime only (new regime has no 80D)</li>
                <li>Tax savings: ₹7,500 to ₹22,500 depending on income bracket</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="mx-auto max-w-5xl px-4 mt-12">
      <CalculatorContentWrapper {...contentData}/>
    </div>
    </>
  );
};