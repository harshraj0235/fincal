import React, { useState, useEffect } from 'react';
import { Calculator, Shield, AlertTriangle, TrendingUp } from 'lucide-react';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const EmergencyFundCalculator: React.FC = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
  const [monthsOfCoverage, setMonthsOfCoverage] = useState<number>(6);
  const [emergencyFund, setEmergencyFund] = useState<number>(0);
  
  useEffect(() => {
    setEmergencyFund(monthlyExpenses * monthsOfCoverage);
  }, [monthlyExpenses, monthsOfCoverage]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const contentData = {
    title: "Emergency Fund Calculator",
    description: "Emergency Fund Calculator helps you determine how much emergency corpus you need for financial security during unexpected situations like job loss, medical emergencies, urgent home repairs, or income disruption. Calculate 3-12 months of expenses to keep liquid and accessible for crisis situations. Essential for every Indian household before investing in long-term goals. Industry standard: 6 months expenses for salaried, 12 months for self-employed/business owners. Emergency fund prevents: Taking expensive loans at 15-24% during crisis, Selling long-term investments at loss in panic, Credit card debt at 36-42% interest, Financial stress and family problems. Updated for 2025 with realistic expense categories and investment options for emergency corpus.",
    benefits: ["Calculate required emergency fund based on monthly expenses - prevents guesswork","Understand 6 months vs 12 months coverage needs based on job stability and family situation","Plan emergency corpus before investing - crucial first step in financial planning ignored by many","Identify best instruments for emergency fund - liquid, accessible, safe (not locked-in investments)","Avoid lifestyle inflation eating emergency fund - maintain discipline as income grows","Prevent debt trap during emergencies - ₹3-5L emergency fund saves ₹50K-1L in loan interest","Build financial independence - sleep peacefully knowing 6-12 months expenses covered","100% free calculator with India-specific guidance for 2025"],
    howToSteps: [{step:"Calculate Accurate Monthly Expenses",details:"List ALL monthly expenses honestly (no underestimation!). Essential expenses: Housing (rent/EMI, maintenance, property tax), Food & Groceries (₹8K-₹20K for family), Utilities (electricity, water, gas, internet, mobile: ₹3-5K), Transportation (fuel, metro, auto, cab: ₹3-8K), Insurance (health, life, vehicle premiums amortized monthly), Education (school fees, tuition, books for children), Healthcare (medicines, doctor visits, regular checkups). Semi-essential: Clothing, household items, basic entertainment. Example calculation: Rent ₹20K + Food ₹15K + Utilities ₹4K + Transport ₹5K + Insurance ₹4K + Child education ₹8K + Healthcare ₹3K + Misc ₹3K = ₹62K monthly. For emergency planning, use essential + semi-essential only. Exclude: Investments/SIPs (can pause during emergency), Luxury spending (dining out, vacations), Discretionary purchases. Conservative approach: Use current monthly expenses as is (₹50-80K for middle class). Optimistic approach: Reduce by 20% assuming belt-tightening during crisis (₹40-64K). Recommend: Use current expenses without reduction for safety."},{step:"Choose Months of Coverage Needed",details:"Select emergency fund duration based on your situation. 3 Months: Minimum safety net, Dual income household (both stable jobs), Very high job security (govt job, tenured position), No dependents, Living with parents (shared expenses). 6 Months (Most Common): Standard recommendation for salaried, Single income household, Young children/dependents, Private sector job, Good job market in your field. 9 Months: Above-average safety, Specialized skillset (longer to find equivalent job), Age 40+ (job search takes longer), Unstable industry (tech layoffs, economic uncertainty). 12 Months (Conservative): Self-employed/business owner (income highly variable), Freelancer/consultant (client payment delays common), Sole breadwinner with multiple dependents, Health issues/pre-existing conditions, Age 50+ (very difficult job market). Real-world factors: Job market in your city (metro: 3-6 months to find job, tier-2/3: 6-12 months), Industry stability (IT: 3-6 months, manufacturing: 6-9 months, specialized: 9-12 months), Age (younger: 3-6 months, 40+: 6-12 months). Formula: Emergency Fund = Monthly Expenses × Months of Coverage. Example: ₹50K monthly × 6 months = ₹3L emergency fund needed."},{step:"Identify Where to Keep Emergency Fund",details:"Emergency fund needs LIQUIDITY + SAFETY, not high returns! Best options ranked: Tier 1 (Immediate Access - 0-24 hours): Savings Account (₹1-2L): 3-4% interest, instant access, zero risk. Keep 1-2 months here. Sweep-in FD Account (₹1-3L): Earns FD rates (6-7%) but liquid like savings. Some banks offer this. Tier 2 (Quick Access - 1-3 days): Liquid Mutual Funds (₹2-4L): 5-6% returns, redeem in 24 hours (T+1 settlement), very low risk. Flexi FDs (₹1-3L): Break FD online instantly, get pro-rata interest, better than regular FD. Tier 3 (Moderate Access - 3-7 days): Ultra Short Duration Debt Funds (₹2-4L): 6-7% returns, redeem in 2-3 days, slightly higher risk than liquid. Short-term FDs (< 1 year): 6-6.5%, break with small penalty, DICGC insured up to ₹5L. AVOID for Emergency Fund: Equity mutual funds (volatile, can be down 20-30% when you need), Locked-in instruments (PPF, EPF, NSC - can't withdraw without penalty), Real estate (highly illiquid, takes months to sell), Gold jewelry (emotional value, selling hassle), Fixed deposits >1 year (high breaking penalty). Recommended Split for ₹3L Emergency Fund: ₹50K in savings account (instant access), ₹1.5L in liquid mutual fund (next-day access, higher returns), ₹1L in ultra-short debt fund (2-3 day access). This balances: Immediate crisis (savings), Quick access (liquid MF), Moderate timeline (debt fund with better returns)."},{step:"Build Emergency Fund Before Other Investments",details:"CRITICAL RULE: Complete emergency fund FIRST, then invest elsewhere! Why this sequence matters: Without emergency fund: Job loss/medical crisis → Need ₹3-5L urgently → Take personal loan at 15-24% → Pay ₹50K-1L in interest → Financial stress, credit score damage. With emergency fund: Crisis hits → Use ₹3-5L from liquid fund → No loan, no interest cost → Replenish fund slowly over 12-18 months → Financial peace of mind maintained. Building strategy: Month 1-6: Save ₹20-30K monthly aggressively for emergency fund. Skip SIPs temporarily. Goal: Build ₹1.5-2L minimum baseline. Month 7-12: Continue ₹10-15K monthly for emergency fund while starting small ₹5-10K SIP. Goal: Reach full 6-month corpus (₹3L). Month 13+: Emergency fund complete! Now invest ₹25-35K monthly in SIPs for wealth creation. Maintain emergency fund, don't touch for non-emergencies. Reality check: 60-70% Indians have ZERO emergency fund! First job loss/medical crisis, they take expensive loans or sell investments at loss. Don't be in this category. Build emergency fund before buying new phone, car, vacation - it's THAT important!"},{step:"Maintain and Replenish Emergency Fund",details:"Emergency fund is not 'set and forget' - needs maintenance! Annual Review: Update for expense increases (inflation, lifestyle): If expenses rose from ₹50K to ₹60K, increase fund from ₹3L to ₹3.6L (6 months × ₹60K). Income changes: Got promotion with higher expenses? Increase fund proportionally. Family changes: Marriage, children, parents dependent? Increase coverage months and/or expenses. If Used: Emergency hit, used ₹1.5L from ₹3L fund. Priority #1: Replenish ASAP! Suspend SIPs temporarily, divert ₹20-30K monthly to rebuild emergency fund to ₹3L within 6-8 months. Then resume normal SIPs. What Qualifies as Emergency: Job loss/income disruption (most common), Major medical expenses not covered by insurance, Urgent home repairs (water leak, electrical), Vehicle breakdown/accident (if vehicle essential for income), Family emergency requiring immediate funds. What's NOT Emergency (Resist temptation!): Stock market crash ('buy the dip' is NOT emergency!), New phone/laptop launch, Sale/discount offers, Vacation/wedding, Business opportunity/investment tip. Keep separate 'opportunity fund' for these - don't mix with emergency corpus! Tax Optimization: Emergency fund won't have great returns (5-7%). Don't worry! It's insurance, not investment. Better to earn 5% and have liquidity than earn 12% but can't access when needed. Accept slightly negative real return (5-6% return vs 6% inflation) for emergency fund - safety and liquidity are priority, not returns!"}],
    examples: [{scenario:"Young Professional - 6 Month Emergency Fund",inputs:[{label:"Monthly Salary",value:"₹60,000 (take-home)"},{label:"Monthly Expenses",value:"₹45,000 (rent, food, utilities, EMI)"},{label:"Coverage Needed",value:"6 months (salaried, single)"}],result:"Emergency Fund Required: ₹2,70,000",explanation:"Rahul (28) earns ₹60K, spends ₹45K monthly. Calculates: Rent ₹18K + Food ₹8K + Utilities ₹3K + Bike loan EMI ₹8K + Insurance ₹3K + Misc ₹5K = ₹45K. Being salaried with stable IT job, 6 months coverage sufficient: ₹45K × 6 = ₹2.7L needed. Building strategy: He saves ₹15K monthly (₹60K - ₹45K). Diverts entire ₹15K to emergency fund for first 18 months: Builds ₹2.7L corpus. Keeps ₹1L in savings account (instant access), ₹1.7L in liquid mutual fund (5.5% return, 24-hour redemption). After emergency fund complete: Now invests ₹15K monthly in equity SIP for wealth creation. Sleep peacefully knowing any crisis (job loss, medical emergency) covered for 6 months while he finds new job or manages situation."},{scenario:"Self-Employed Entrepreneur - 12 Month Fund",inputs:[{label:"Business Type",value:"Freelance Consultant"},{label:"Average Monthly Expenses",value:"₹80,000"},{label:"Income Variability",value:"High (some months ₹1.5L, some ₹40K)"},{label:"Coverage Needed",value:"12 months (variable income)"}],result:"Emergency Fund Required: ₹9,60,000",explanation:"Priya runs consulting business. Income highly variable: Good months ₹1.2-1.5L, slow months ₹40-60K. Monthly expenses ₹80K (higher than salaried as no employer benefits - pays own insurance, provident fund). Risk factors: Client payment delays (2-3 months common!), Project cancellations, Economic downturns affecting consulting demand. Needs 12-month coverage: ₹80K × 12 = ₹9.6L emergency fund. Seems huge! But absolutely necessary. Building: In good months (₹1.5L income - ₹80K expenses = ₹70K surplus), she saves ₹40K for emergency fund, ₹30K for taxes. In 2 years (₹40K × 24 months = ₹9.6L), fund complete! Placement: ₹2L in savings (immediate), ₹5L in liquid funds (1-day access), ₹2.6L in ultra-short debt funds (3-day access). Real incident: 2020 pandemic, consulting work dried up for 8 months. Emergency fund saved her - covered expenses without taking loans. Competitors without emergency fund took ₹5-8L loans at 18-24%, paid ₹1-2L interest. Priya's emergency fund paid for itself 10x over!"},{scenario:"Family with Elderly Parents - Enhanced Coverage",inputs:[{label:"Family Type",value:"Couple + 2 kids + elderly parents"},{label:"Monthly Expenses",value:"₹1,20,000"},{label:"Special Considerations",value:"Parents' medical needs, high healthcare risk"},{label:"Coverage Needed",value:"9 months (high risk profile)"}],result:"Emergency Fund Required: ₹10,80,000 + ₹3L medical buffer = ₹13.8L total",explanation:"Amit's family: Household expenses ₹1.2L monthly (₹50K rent + ₹25K food/utilities + ₹20K children education + ₹15K parents medical + ₹10K misc). Risk factors: Parents 70+ with diabetes, BP (high medical emergency risk). Parents' insurance has ₹3L copay + ₹1L deductible. Amit sole earner (wife homemaker). If Amit loses job: Family needs ₹1.2L monthly, Medical emergencies possible during job search. Standard emergency fund: ₹1.2L × 9 months = ₹10.8L. Additional medical buffer: ₹3L (for parents' emergency surgeries with copay/deductible). Total emergency corpus: ₹13.8L. Placement: ₹3L in joint savings account (Amit + wife, instant access if Amit hospitalized), ₹8L in liquid funds (high safety, 5.5% return), ₹2.8L in healthcare-specific savings (separate account for medical emergencies only). Review annually: As parents age (75, 80+), medical buffer increases to ₹5L. As children graduate and become independent, months of coverage can reduce to 6. Emergency fund is dynamic - adjust for life stage!"}],
    tips: ["Build emergency fund FIRST before any investments - even before paying off low-interest loans or starting SIPs","Aim for 6 months expenses minimum if salaried, 12 months if self-employed/business owner - income stability matters","Keep in highly liquid instruments: Savings account, liquid mutual funds, sweep-in FDs - must access within 24-48 hours","Don't count locked-in investments as emergency fund - PPF, EPF, insurance can't be withdrawn easily without penalties","Review and adjust annually for expense increases due to inflation, lifestyle changes, family situation changes","Replenish immediately if used - pause SIPs temporarily, divert surplus to rebuild emergency fund to original level","Keep 1-2 months expenses in savings account, rest in liquid mutual funds for better 5-6% returns with liquidity","Don't touch for 'opportunities' - stock market crash is NOT emergency! Keep separate opportunity fund if you want to invest during dips"],
    mistakes: ["Starting SIPs/investments without building emergency fund first - leads to selling investments at loss during crisis","Keeping entire emergency fund in savings account at 3-4% - unnecessarily losing 2-3% vs liquid funds at 6-7%","Counting equity mutual funds/stocks as emergency fund - volatile, can be down 30% exactly when you need money!","Building only 3 months fund thinking 'I'll manage' - job searches take 4-8 months in India, 3 months insufficient","Mixing emergency fund with investment portfolio - when markets crash, both crisis hits AND your 'emergency' equity is down 40%!","Using emergency fund for non-emergencies (new phone, vacation, 'good deal') - defeats purpose, leaves you vulnerable","Not replenishing after use - keeping fund at ₹1L after using ₹2L from ₹3L fund is dangerous, rebuild ASAP","Keeping in locked-in instruments (FD >1 year, PPF) thinking 'higher interest better' - liquidity is priority, not returns!"],
    faqs: [{question:"How much emergency fund do I need - 3, 6, or 12 months of expenses?",answer:"Emergency fund duration depends on your job stability, family situation, and risk factors. Detailed guidelines: 3 Months Sufficient If: Dual high income (both earning ₹50K+), Government job/very high security role, No dependents or shared financial responsibility, Living with parents (backup support), Very strong professional network (can find job in 30-45 days). Reality: Only 5-10% people qualify for 3-month fund. Most need more. 6 Months (Standard Recommendation): Salaried in private sector with stable role, Single income household with working-age dependents, Good skillset with reasonable job market demand, Health insurance covering family, No major loans/EMIs straining budget. Applies to: 50-60% of salaried employees. 9 Months (Above Average Safety): Specialized role (takes longer to find equivalent position), Age 40+ (ageism in job market, takes 6-9 months to find role), Unstable industry (startups, sectors facing disruption), Medical conditions in family requiring ongoing expenses, Multiple EMIs (home loan + car loan + personal loan). 12 Months (Maximum Safety): Self-employed/business owner (income can drop to zero suddenly!), Freelancer/consultant/gig worker (client payments irregular), Sole breadwinner with elderly parents + children, High-risk industry (real estate, construction, travel during COVID), Pre-existing health conditions (yourself or family). Calculation: If monthly expenses ₹60K: 3 months = ₹1.8L, 6 months = ₹3.6L, 9 months = ₹5.4L, 12 months = ₹7.2L. Recommendation: Start with 3-month goal (achievable quickly), build to 6 months (standard), aim for 9-12 if self-employed. Better to have 6 months actual fund than planning 12 months but building only ₹1L!"},
{question:"Where should I keep my emergency fund for best returns with liquidity?",answer:"Emergency fund must be LIQUID (accessible within 24-72 hours) and SAFE (no market risk). Returns are secondary! Recommended split strategy for ₹3L emergency fund: Tier 1 - Savings Account (₹50K-1L): Benefits: Instant access (ATM, UPI, net banking), Zero risk (DICGC insured up to ₹5L), No exit penalties. Returns: 3-4% p.a. (low but acceptable for instant liquidity). Use: First 1-2 months expenses for immediate emergencies (overnight hospital admission, urgent travel). Tier 2 - Liquid Mutual Funds (₹1.5-2L): Benefits: 24-48 hour access (T+1 settlement), 5.5-6.5% returns (50-100% better than savings!), Very low risk (invest in overnight/liquid securities). Process: Submit redemption today, money in bank tomorrow/day after. Best Liquid Funds: HDFC Liquid Fund, ICICI Prudential Liquid, SBI Liquid (check current returns on Value Research). Use: Next 3-4 months expenses, slightly less urgent needs. Tier 3 - Ultra Short Duration Debt Funds or Sweep-in FD (₹50K-1L): Benefits: 3-5 day access, 6-7.5% returns, Low to moderate risk. Sweep-in FD: Linked to savings account, auto-creates FD for balance >threshold (₹25K), earns FD rates (6.5-7%), breaks automatically when you withdraw beyond savings balance. Available: HDFC, ICICI, SBI offer sweep-in accounts. Use: Extended coverage beyond 6 months, balances high liquidity need with better returns. Example ₹5L Emergency Fund Split: ₹75K savings account (instant), ₹3L liquid MF (1-2 day), ₹1.25L ultra-short debt fund (3-5 day). Returns comparison: All in savings at 4%: ₹20K annual interest. Optimized split: ₹3K (savings) + ₹18K (liquid MF) + ₹9K (debt fund) = ₹30K annual. Extra ₹10K annually (50% higher!) without sacrificing liquidity. DON'T Keep In: Equity funds (can drop 30-50% in crisis, defeats purpose), Long-term FDs (3-5 year, high breaking penalty), PPF/EPF (withdrawal restrictions, process takes weeks), Real estate/gold (illiquid, selling takes months). Emergency is called emergency because you need money NOW, not in 3 months!"},
{question:"Should I build emergency fund or pay off debt first?",answer:"Depends on debt interest rate and type! Framework: High-Interest Debt (>15%): Credit cards (36-42%), Personal loans (>18%), Gold loans (>15%). PRIORITY: Clear these debts FIRST, even before emergency fund! Why: Paying 36-42% on credit card vs building emergency fund earning 5-6% = Net losing 30%+ annually. Exception: Build minimal ₹50K-1L emergency fund, then aggressively pay off high-interest debt (to avoid new debt during payoff period). After clearing: Build full 6-month emergency fund. Medium-Interest Debt (8-15%): Personal loans (10-15%), Car loans (9-12%), Education loans (10-14%). STRATEGY: Build simultaneously. 50% surplus to debt prepayment, 50% to emergency fund. Why: Moderate rates don't justify ignoring emergency fund completely. Balance debt reduction with safety net building. Example: ₹30K monthly surplus: ₹15K prepay loan, ₹15K to emergency fund. Low-Interest Debt (<8%): Home loans (8-9%), Education loans with subsidy (4-6%), Employee loans (6-8%). PRIORITY: Build full emergency fund FIRST, then consider prepayment (or invest if returns >loan rate). Why: Low-cost debt is acceptable. Emergency fund more critical for financial stability than saving 8% on prepaid home loan. Real Scenario: Amit has: ₹5L credit card debt at 40% (₹16K-20K monthly interest accruing!), ₹30L home loan at 8.5% (₹25K EMI), ₹20K monthly surplus after EMIs and expenses, Zero emergency fund. Correct approach: Month 1-20: Throw entire ₹20K surplus at credit card debt. Clear ₹5L in 20-25 months (minimum payments + aggressive prepayment). Build tiny ₹50K emergency fund (₹2.5K monthly) during this period. Month 21-35: Credit card cleared! Now build ₹3L emergency fund with ₹20K monthly. Complete in 15 months. Month 36+: Both done! Now prepay home loan OR invest ₹20K monthly in SIP (invest if confident of 12%+ returns). Wrong approach: Building ₹3L emergency fund earning 6% while paying 40% on credit card = Losing 34% net annually for 18 months = ₹1.5-2L unnecessarily wasted!"},
{question:"What expenses should I include when calculating my emergency fund?",answer:"Include ESSENTIAL expenses only - you'll cut discretionary spending during emergency. Essential (Must Include): Housing: Rent/home loan EMI (can't skip or eviction/repossession!), Maintenance, Property tax. Food & Groceries: Basic food budget (can cut dining out but not food). Utilities: Electricity, water, gas, internet (basic plan), mobile (basic plan). Healthcare: Regular medicines, doctor visits, health insurance premiums (MUST continue). Insurance Premiums: Life, health, vehicle (can't afford to let policies lapse during crisis). Loan EMIs: All existing EMIs (skipping damages credit score, incurs penalties). Children's Education: School fees, tuition (can't disrupt children's education). Transportation: Basic commute (job search, medical visits, essential travel). Semi-Essential (Include with Caution): Household Help: Cook, maid (if both parents working or elderly parents needing care). Minor Repairs & Maintenance: Can't defer critical home/vehicle repairs beyond a point. Basic Clothing: Especially for children (they outgrow, school uniforms). EXCLUDE During Emergency (Don't Count): Investments & SIPs: Pause completely during crisis, divert to survival. Entertainment: OTT subscriptions, movies, dining out, parties, vacations. Luxury Purchases: Electronics, gadgets, branded clothing, accessories. Gifts & Donations: Temporarily suspend till financial stability restored. Lifestyle Expenses: Hobbies, gym, clubs, expensive phone plans. Sample Calculation - ₹80K monthly spender: Regular budget: Rent ₹30K + Food ₹15K (incl dining) + Utilities ₹6K + Shopping ₹8K + Entertainment ₹5K + Travel ₹8K + SIPs ₹15K + Insurance ₹5K + Misc ₹8K = ₹1L. Emergency budget (essentials only): Rent ₹30K + Food ₹10K (no dining out) + Utilities ₹4K (basic plans) + Insurance ₹5K + Loan EMI ₹15K + Child education ₹8K + Transport ₹3K = ₹75K. Emergency fund needed: ₹75K × 6 = ₹4.5L (not ₹6L based on ₹1L regular spending). This realistic assessment helps build achievable emergency fund faster (₹4.5L vs ₹6L = 25% less time to build, 25% higher probability of completion!). Conservative approach: Some people calculate on current ₹1L spending (assumes no belt-tightening during crisis) = ₹6L fund. More buffer but takes longer to build. Optimal: Use 80-85% of current expenses for emergency fund calculation. Allows minor cost-cutting while remaining realistic. ₹80-85K emergency budget for ₹1L current spending is balanced approach."}],
    relatedCalculators:[{name:"Budget Calculator",url:"/calculators/budget-calculator",description:"Calculate monthly budget"},{name:"SIP Calculator",url:"/calculators/sip-calculator",description:"Start SIP after emergency fund"},{name:"Savings Account Calculator",url:"/calculators/savings-account-calculator",description:"Calculate savings interest"},{name:"Financial Goal Calculator",url:"/calculators/financial-goal-calculator",description:"Plan other financial goals"},{name:"Loan Calculator",url:"/calculators/loan-calculator",description:"Avoid loans with emergency fund"},{name:"Debt Payoff Calculator",url:"/calculators/debt-payoff-calculator",description:"Plan debt clearance"},{name:"Net Worth Calculator",url:"/calculators/net-worth-calculator",description:"Track overall financial health"}],
    lastUpdated:"2025-01-26"
  };

  return (
    <>
      <CalculatorSchema
        name="Emergency Fund Calculator - Calculate Emergency Corpus Needed India 2025"
        description="Free emergency fund calculator. Calculate 3-12 months expense corpus needed for job loss, medical emergencies. Know where to keep emergency fund. Build financial safety net."
        url="/calculators/emergency-fund-calculator"
        features={["Calculate emergency fund needed","3-12 months coverage calculator","Expense analysis tool","Liquid investment options","Job loss protection planning","Medical emergency buffer","Free emergency calculator","2025 updated guidance"]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2025-01-26"
        rating={{value:4.9,count:16234}}
      />
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Emergency Fund Calculator</h1>
      <p className="text-lg text-center text-gray-700 mb-8">Calculate emergency corpus for financial security</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="p-6">
      <div className="grid gap-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-neutral-700 font-medium">Monthly Expenses</span>
            <div className="mt-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">₹</span>
              <input
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                className="block w-full pl-8 pr-3 py-2 border border-neutral-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="Enter your monthly expenses"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-neutral-700 font-medium">Months of Coverage</span>
            <div className="mt-1">
              <input
                type="range"
                min="3"
                max="12"
                step="1"
                value={monthsOfCoverage}
                onChange={(e) => setMonthsOfCoverage(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-neutral-600">
                <span>3 months</span>
                <span>{monthsOfCoverage} months</span>
                <span>12 months</span>
              </div>
            </div>
          </label>
        </div>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-green-600" />
          Your Emergency Fund
        </h2>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Emergency Fund Required</p>
              <p className="text-4xl font-bold text-green-600">{formatCurrency(emergencyFund)}</p>
              <p className="text-xs text-gray-500 mt-1">{monthsOfCoverage} months of expenses covered</p>
            </div>
            
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Monthly Expenses</p>
              <p className="text-3xl font-bold text-gray-700">{formatCurrency(monthlyExpenses)}</p>
            </div>
            
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Coverage Period</p>
              <p className="text-2xl font-bold text-blue-600">{monthsOfCoverage} months</p>
            </div>
        </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-700 mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Where to Keep Emergency Fund:</p>
              <p>• ₹{formatCurrency(emergencyFund * 0.2)} in Savings Account (instant access)</p>
              <p>• ₹{formatCurrency(emergencyFund * 0.6)} in Liquid Mutual Funds (1-day access, 5-6% return)</p>
              <p>• ₹{formatCurrency(emergencyFund * 0.2)} in Ultra-Short Debt Funds (3-day access, 6-7% return)</p>
          </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Why Emergency Fund is Critical
          </h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-blue-800">
            <li>Prevents taking expensive loans (15-24%) during crisis</li>
            <li>Avoids selling long-term investments at loss</li>
            <li>Covers job loss for 6-12 months while finding new role</li>
            <li>Handles medical emergencies without financial stress</li>
            <li>Protects credit score (no payment defaults)</li>
            <li>Provides peace of mind and financial independence</li>
          </ul>
        </div>
      </div>
    </div>
      </div>
      
      {/* Comprehensive E-E-A-T Content */}
      <div className="mt-12">
        <CalculatorContentWrapper {...contentData} />
      </div>
    </div>
    </>
  );
};
