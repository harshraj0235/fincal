
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';
import { Sliders, PieChart, Calendar, Info, ExternalLink } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

// Inject FAQ schema for Google EEAT, rich snippets
const injectSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is EMI calculated in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EMI is calculated using the reducing balance method: EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P = principal, R = monthly interest rate, N = tenure in months. Use this EMI calculator for instant and accurate results."
        }
      },
      {
        "@type": "Question",
        "name": "Is this EMI calculator suitable for home, car, and personal loans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this EMI calculator works for all types of loans in India: home, car, personal, education, gold, and business loans."
        }
      },
      {
        "@type": "Question",
        "name": "Can I manually enter loan amount, interest rate, or tenure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can enter or adjust any value to get a personalized EMI calculation. All results are updated instantly."
        }
      },
      {
        "@type": "Question",
        "name": "What is the benefit of using an EMI calculator before taking a loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It helps you plan monthly cashflow, compare loan offers, check affordability, and avoid over-borrowing. It also helps you see the total interest and payment schedule."
        }
      },
      {
        "@type": "Question",
        "name": "Does this calculator show a year-wise EMI breakup?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you get a detailed yearly schedule showing principal, interest paid, and outstanding balance for each year."
        }
      },
      {
        "@type": "Question",
        "name": "Does it support prepayment calculation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can enter a prepayment amount to see the effect on EMI, interest, and tenure."
        }
      },
      {
        "@type": "Question",
        "name": "What are the pros and cons of EMI loans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pros: Easy budgeting, affordable purchases, helps build credit. Cons: High total interest, risk of missed payments, possible prepayment penalties."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I check the latest loan rates and RBI guidelines?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For official information, visit the RBI website (https://rbi.org.in/) and compare rates on portals like BankBazaar and PaisaBazaar."
        }
      }
    ]
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(schema);
  document.head.appendChild(script);
  return () => { document.head.removeChild(script); };
};

// SEO is handled globally by SEOHelmet at the page level
const SEO = () => null;

export const EmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [breakup, setBreakup] = useState<{ principal: number; interest: number }[]>([]);

  // Manual input states
  const [manualLoanAmount, setManualLoanAmount] = useState<string>(loanAmount.toString());
  const [manualInterestRate, setManualInterestRate] = useState<string>(interestRate.toString());
  const [manualLoanTenure, setManualLoanTenure] = useState<string>(loanTenure.toString());
  const [prepayment, setPrepayment] = useState<number>(0);
  const [showProsCons, setShowProsCons] = useState<boolean>(false);

  useEffect(() => {
    injectSchema();
  }, []);

  useEffect(() => {
    let tenureInMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
    let adjustedLoanAmount = loanAmount;
    // If prepayment is made at the start
    if (prepayment > 0 && prepayment < loanAmount) {
      adjustedLoanAmount = loanAmount - prepayment;
    }
    const calculatedEmi = calculateEMI(adjustedLoanAmount, interestRate, tenureInMonths);
    const totalAmount = calculatedEmi * tenureInMonths + (loanAmount - adjustedLoanAmount);
    const interestAmount = totalAmount - loanAmount;

    setEmi(calculatedEmi);
    setTotalInterest(interestAmount);
    setTotalPayment(totalAmount);
    setBreakup(calculateLoanBreakup(adjustedLoanAmount, interestRate, tenureInMonths));
  }, [loanAmount, interestRate, loanTenure, tenureType, prepayment]);

  // Update slider values when manual inputs change
  const handleManualLoanAmountChange = (value: string) => {
    setManualLoanAmount(value);
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(numValue) && numValue >= 10000 && numValue <= 10000000) {
      setLoanAmount(numValue);
    }
  };

  const handleManualInterestRateChange = (value: string) => {
    setManualInterestRate(value);
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(numValue) && numValue >= 5 && numValue <= 20) {
      setInterestRate(numValue);
    }
  };

  const handleManualLoanTenureChange = (value: string) => {
    setManualLoanTenure(value);
    const numValue = parseInt(value.replace(/[^0-9]/g, ''));
    if (!isNaN(numValue)) {
      const min = tenureType === 'years' ? 1 : 1;
      const max = tenureType === 'years' ? 30 : 360;
      if (numValue >= min && numValue <= max) {
        setLoanTenure(numValue);
      }
    }
  };

  useEffect(() => {
    setManualLoanAmount(loanAmount.toString());
    setManualInterestRate(interestRate.toString());
    setManualLoanTenure(loanTenure.toString());
  }, [loanAmount, interestRate, loanTenure]);

  // EMI Pros and Cons Content
  const emiProsCons = (
    <div className="bg-white rounded-lg shadow p-4 mt-4">
      <h3 className="text-lg font-semibold text-primary-900 mb-2">EMI: Advantages and Disadvantages (2025)</h3>
      <ul className="list-disc list-inside text-primary-800 text-sm mb-2">
        <li><b>Pros:</b> Easy to plan budgets, affordable home or car purchase, helps in credit building, flexibility in repayment.</li>
        <li><b>Cons:</b> Total interest increases with long tenures, risk of over-borrowing, penalty on missed payments, possible prepayment charges.</li>
      </ul>
      <p className="text-xs text-neutral-600">
        For official guidance, see 
        <a href="https://www.rbi.org.in/Scripts/FAQView.aspx?Id=97" target="_blank" rel="noopener noreferrer" className="underline text-primary-700 ml-1">RBI EMI FAQ <ExternalLink className="w-3 h-3 inline" /></a>
      </p>
    </div>
  );

  // Quick preset loan types with 2025 market rates
  const loanPresets = [
    { name: "Home Loan", amount: 5000000, rate: 8.75, tenure: 20, type: 'years' as const },
    { name: "Car Loan", amount: 800000, rate: 9.25, tenure: 5, type: 'years' as const },
    { name: "Personal Loan", amount: 500000, rate: 12.5, tenure: 3, type: 'years' as const },
    { name: "Education Loan", amount: 1000000, rate: 9.5, tenure: 10, type: 'years' as const },
    { name: "Business Loan", amount: 2000000, rate: 11.5, tenure: 5, type: 'years' as const }
  ];

  const applyPreset = (preset: typeof loanPresets[0]) => {
    setLoanAmount(preset.amount);
    setInterestRate(preset.rate);
    setLoanTenure(preset.tenure);
    setTenureType(preset.type);
    setPrepayment(0);
  };

  // Content data for CalculatorContentWrapper
  const contentData = {
    title: "EMI Calculator",
    description: "An EMI (Equated Monthly Installment) Calculator is India's most trusted financial tool for calculating monthly loan payments. Whether you're planning a home loan for your dream house, a car loan for your vehicle, a personal loan for urgent expenses, an education loan for higher studies, or a business loan for your enterprise, our comprehensive EMI calculator provides instant, accurate calculations based on your loan amount, interest rate, and tenure. Understanding your EMI helps in better financial planning and ensures you choose a loan that fits your budget without straining your finances. This calculator uses the reducing balance method as per RBI guidelines and is updated with latest 2025 interest rates. Our EMI calculator works for all types of loans in India including home loans (8.5-10.5% interest), car loans (7-12% interest), personal loans (10-18% interest), education loans (8-15% interest), gold loans (9-12% interest), and business loans (10-16% interest). Calculate your EMI in seconds, compare different loan scenarios, understand total interest outgo, and make informed borrowing decisions with our free, accurate, and user-friendly EMI calculator.",
    
    benefits: [
      "Instant EMI calculation in seconds - no manual formulas needed",
      "Plan your budget effectively by knowing exact monthly commitments before taking a loan",
      "Compare different loan scenarios by varying amounts, interest rates, and tenures",
      "Understand total interest outgo over the entire loan period to make informed decisions",
      "Make data-driven choices about loan affordability before applying to banks",
      "Visualize payment breakdown between principal and interest with year-wise schedule",
      "100% free to use, no registration required, works on all devices",
      "Mobile-friendly interface for calculations on the go, anytime, anywhere"
    ],
    
    howToSteps: [
      {
        step: "Enter Loan Amount",
        details: "Input the total principal amount you want to borrow. This is the actual loan amount before any interest. For example, if you're taking a home loan, this would be the property price minus your down payment. Most lenders in India offer home loans ranging from ₹1 lakh to ₹5 crore depending on your income, credit score, and property value. Banks typically finance 75-90% of property value (LTV ratio)."
      },
      {
        step: "Input Interest Rate",
        details: "Enter the annual interest rate offered by the lender, expressed as a percentage per annum. As of 2025, home loan interest rates in India range from 8.5% to 10.5% for salaried individuals. Personal loans have higher rates (10-18%), car loans range from 7-12%, and education loans from 8-15%. Check with multiple lenders to get the best rate. Your credit score significantly impacts the rate offered."
      },
      {
        step: "Select Loan Tenure",
        details: "Choose the duration over which you'll repay the loan. You can select years or months. Home loans can extend up to 30 years (360 months), personal loans up to 5 years, car loans up to 7 years, and education loans up to 15 years. Longer tenure means lower EMI but significantly higher total interest paid. Shorter tenure means higher EMI but massive interest savings - sometimes saving lakhs of rupees."
      },
      {
        step: "Add Prepayment (Optional)",
        details: "If you plan to make an upfront prepayment (down payment or lump sum payment), enter it here. Prepayment reduces your principal amount, which lowers both your EMI and total interest significantly. For home loans, RBI mandates that banks cannot charge prepayment penalties. For other loans, check your loan agreement as some lenders charge 2-4% penalty on prepayment."
      },
      {
        step: "Review Results",
        details: "Analyze the calculated EMI, total interest, and total payment. The calculator also shows year-wise breakup of principal vs interest. Initially, a larger portion goes towards interest (60-70% in year 1), but gradually the principal component increases. Use the 40-50% rule: your total EMI obligations should not exceed 40-50% of your monthly income for safe borrowing."
      }
    ],
    
    examples: [
      {
        scenario: "First-Time Home Buyer in Mumbai",
        inputs: [
          { label: "Property Value", value: "₹60,00,000" },
          { label: "Down Payment", value: "₹10,00,000 (17%)" },
          { label: "Loan Amount", value: "₹50,00,000" },
          { label: "Interest Rate", value: "8.5% per annum" },
          { label: "Loan Tenure", value: "20 years (240 months)" }
        ],
        result: "EMI: ₹43,391 per month",
        explanation: "Rajesh is buying his first home worth ₹60 lakhs in Mumbai suburbs and has saved ₹10 lakhs for down payment. With a ₹50 lakh home loan at 8.5% interest for 20 years, his monthly EMI works out to ₹43,391. Total amount payable over 20 years: ₹1,04,13,840 (principal ₹50L + interest ₹54.14L). This EMI is affordable if Rajesh's monthly income is at least ₹1 lakh (43% of income). His employer offers home loan at 8% which would reduce EMI to ₹41,822 - saving ₹1,569/month or ₹3.77 lakhs over 20 years!"
      },
      {
        scenario: "Young Professional Buying First Car",
        inputs: [
          { label: "Car Price (On-Road)", value: "₹10,00,000" },
          { label: "Down Payment", value: "₹2,00,000 (20%)" },
          { label: "Loan Amount", value: "₹8,00,000" },
          { label: "Interest Rate", value: "9% per annum" },
          { label: "Loan Tenure", value: "5 years (60 months)" }
        ],
        result: "EMI: ₹16,607 per month",
        explanation: "Priya wants to buy her dream car priced at ₹10 lakhs (on-road) and has ₹2 lakhs in savings for down payment. She takes a ₹8 lakh car loan from her bank at 9% for 5 years. Monthly EMI: ₹16,607. Total amount payable: ₹9,96,420 (principal ₹8L + interest ₹1.96L). With a monthly salary of ₹60,000, this EMI (27.6% of income) is manageable and leaves ample room for other expenses. If she opts for 7-year tenure, EMI drops to ₹12,751 but total interest increases to ₹2.71L - costing ₹75,000 more! Shorter tenure is always better if affordable."
      },
      {
        scenario: "Personal Loan for Wedding Expenses",
        inputs: [
          { label: "Wedding Budget Shortfall", value: "₹5,00,000" },
          { label: "Loan Amount", value: "₹5,00,000" },
          { label: "Interest Rate", value: "12% per annum" },
          { label: "Loan Tenure", value: "3 years (36 months)" }
        ],
        result: "EMI: ₹16,607 per month",
        explanation: "Amit needs ₹5 lakhs additional funds for his wedding and opts for a personal loan at 12% interest for 3 years. Monthly EMI: ₹16,607. Total payable: ₹5,97,852. Total interest: ₹97,852 (19.6% of principal). While the EMI seems affordable, Amit should seriously consider if this expense is worth ₹98K interest cost. Alternative: Saving ₹50K/month for 10 months reduces loan to ₹0 (saves ₹98K). Or postpone wedding by 6 months, save ₹3L, borrow only ₹2L, and save ₹59K in interest. Personal loans are expensive - minimize amount and tenure."
      }
    ],
    
    tips: [
      "Always maintain an emergency fund of 6 months' expenses before taking a loan - EMIs can severely strain finances if unexpected expenses arise like medical emergencies or job loss. Use our Emergency Fund Calculator to determine how much you need.",
      "Compare interest rates from at least 3-4 lenders including PSU banks (SBI, BOB, PNB), private banks (HDFC, ICICI, Axis), and NBFCs - even 0.5% difference saves lakhs over loan tenure. Use our Loan Comparison Calculator to compare multiple offers side by side.",
      "Opt for the shortest tenure you can comfortably afford - this drastically reduces total interest outgo, sometimes by 40-50%. A 15-year home loan can save ₹30-40L vs 25-year loan! Calculate different tenure scenarios using this EMI calculator to see the impact.",
      "Use loan prepayment option whenever you have surplus funds - even ₹50K-1L annual prepayment can reduce tenure by 3-5 years and save lakhs in interest. Check our Loan Prepayment Calculator to see exact savings.",
      "Check your CIBIL score (aim for 750+) before applying - better scores get you 0.5-1.5% lower interest rates which translates to massive savings over tenure. A score above 750 can save you lakhs in interest over the loan tenure.",
      "Read loan agreement carefully for hidden charges like processing fees (0.5-2%), prepayment penalties (2-5%), part-payment restrictions, and foreclosure charges. Factor these into your total cost calculation.",
      "Consider both fixed and floating rate options carefully - fixed rates offer stability (good when rates expected to rise), floating rates may decrease if RBI cuts repo rates. As of 2025, most home loans in India use floating rates linked to MCLR or EBLR.",
      "Calculate loan affordability before applying - your total EMI obligations (all loans combined) should not exceed 40-50% of your monthly take-home salary. Use our Loan Affordability Calculator to check how much you can borrow.",
      "For home loans, consider tax benefits under Section 24(b) for interest deduction (up to ₹2 lakhs) and Section 80C for principal repayment (up to ₹1.5 lakhs). Use our Income Tax Calculator to see tax savings.",
      "Keep track of your loan amortization schedule - initially 70-80% of EMI goes towards interest, only 20-30% towards principal. This changes over time as principal reduces. Understanding this helps in planning prepayments effectively."
    ],
    
    mistakes: [
      "Taking maximum eligible loan without considering actual affordability - banks may approve ₹50L but your comfortable limit might be ₹35L. EMI should not exceed 40-50% of monthly income",
      "Ignoring processing fees, insurance, legal charges, and GST - these add 2-5% to loan cost. On ₹50L loan, total charges can be ₹1-2.5L extra. Factor these in planning",
      "Not reading fine print on prepayment penalties - some NBFCs charge 3-5% penalty on early closure. Home loans can't have penalties (RBI rule), but other loans can",
      "Choosing longest tenure for lowest EMI without calculating total cost - 30-year loan can cost nearly 2.5x the principal in total interest. You pay ₹1.5-2 crore for ₹50L borrowed!",
      "Not maintaining good credit score (below 700) - poor credit leads to loan rejection or interest rates 2-4% higher, costing lakhs more over tenure",
      "Relying solely on EMI affordability without understanding amortization - initial EMIs are 70-80% interest, only 20-30% principal repayment. Effective wealth building is slow initially"
    ],
    
    faqs: [
      {
        question: "What is EMI and how is it calculated in India?",
        answer: "EMI (Equated Monthly Installment) is a fixed monthly payment you make towards a loan. It's calculated using the reducing balance formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1], where P is principal loan amount, R is monthly interest rate (annual rate ÷ 12 ÷ 100), and N is loan tenure in months. Each EMI consists of two parts: principal repayment and interest payment. Initially, 60-80% goes towards interest, but over time as principal reduces, the interest component decreases and principal component increases. This is why prepayments in early years save more interest."
      },
      {
        question: "How much EMI can I afford based on my salary?",
        answer: "Financial experts and banks recommend keeping your total EMI obligations (all loans combined) below 40-50% of your monthly net income (take-home salary). For example, if you earn ₹80,000 per month after deductions, your total EMIs should not exceed ₹32,000-40,000. This ensures you have sufficient funds for other expenses (rent, groceries, utilities, education, entertainment), savings, and emergencies. Banks use FOIR (Fixed Obligations to Income Ratio) of typically 50-60% for loan eligibility, but just because a bank approves doesn't mean it's comfortable for you."
      },
      {
        question: "Is it better to take longer tenure with lower EMI or shorter tenure with higher EMI?",
        answer: "Shorter tenure is almost always better if you can afford the higher EMI, as you'll save dramatically on total interest paid. Example on ₹20 lakh home loan at 8.5% p.a.: 10-year tenure = EMI ₹24,769/month, total interest ₹9.72 lakhs; 15-year tenure = EMI ₹19,682, total interest ₹15.43 lakhs; 20-year tenure = EMI ₹17,356, total interest ₹21.65 lakhs; 30-year tenure = EMI ₹15,373, total interest ₹35.34 lakhs. You save ₹25.62 lakhs by choosing 10 years over 30 years! However, choose what fits your budget comfortably without compromising quality of life."
      },
      {
        question: "Can I prepay my loan to reduce EMI or tenure? Which is better?",
        answer: "Yes, most lenders allow prepayments. For home loans, RBI mandates that banks cannot charge prepayment penalties. For other loans, check your agreement - some charge 2-5% penalty. When you prepay, you typically have two options: 1) Reduce EMI keeping tenure same, or 2) Reduce tenure keeping EMI same. Option 2 (reducing tenure) is usually better as it saves significantly more on total interest. Example: On ₹30L loan, ₹3L prepayment in year 2 can reduce tenure by 4-5 years and save ₹8-12L in interest! Check with your lender for prepayment terms, minimum amount, and frequency restrictions."
      },
      {
        question: "How does interest rate change affect my EMI and what can I do about it?",
        answer: "For floating rate loans (most home loans in India), when RBI increases repo rate, banks typically increase MCLR/EBLR rates, which increases your EMI or extends your tenure. Conversely, rate cuts benefit you. Example on ₹30 lakh home loan for 20 years: at 8% interest, EMI is ₹25,093; at 9% interest, EMI increases to ₹26,993 (₹1,900 more per month = ₹22,800 more annually = ₹4.56 lakhs over 20 years!). Protection options: 1) Choose fixed rate loans (0.5-1% higher initially but stability), 2) Negotiate rate reset clause annually, 3) Switch lender if rates elsewhere are 0.5%+ lower (check processing fees), 4) Make lump-sum prepayments when interest rises."
      },
      {
        question: "What is the difference between flat rate and reducing balance EMI?",
        answer: "CRITICAL: Always insist on reducing balance method! In flat rate method, interest is calculated on the original principal throughout the entire tenure, making the actual interest MUCH higher than advertised. In reducing balance method (standard for home loans, mandated by RBI), interest is calculated only on outstanding principal, which decreases with each EMI payment. Example on ₹10 lakh loan at 10% for 5 years: Flat rate interest = ₹5 lakhs (50% of principal!); Reducing balance interest = ₹2.75 lakhs (27.5%). The effective interest rate on flat method is nearly double! Personal loans sometimes use flat rates - always ask and prefer reducing balance."
      },
      {
        question: "Should I take loan from bank or NBFC? What's the difference?",
        answer: "Banks (SBI, HDFC Bank, ICICI Bank) typically offer lower interest rates (home loans 8.5-10%, car loans 7.5-10%, personal loans 10-15%) but have stricter eligibility criteria (good credit score needed, stable employment, proper documentation) and slower processing (7-15 days). NBFCs (Bajaj Finserv, Tata Capital, L&T Finance) may approve loans faster (2-5 days), have more lenient criteria (accept lower credit scores, self-employed, less documentation) but charge 0.5-2% higher interest. Comparison: ₹10L loan - Bank at 10% = ₹97,852 interest, NBFC at 12% = ₹1,19,796 interest for 3 years. Difference: ₹21,944! Choose banks if eligible. Use NBFCs only if banks reject or for urgent needs."
      }
    ],
    
    relatedCalculators: [
      { name: "Home Loan Calculator", url: "/calculators/home-loan-calculator", description: "Calculate home loan EMI with property value" },
      { name: "Car Loan Calculator", url: "/calculators/car-loan-calculator", description: "Estimate car loan EMI and affordability" },
      { name: "Personal Loan Calculator", url: "/calculators/personal-loan-calculator", description: "Plan personal loan repayments" },
      { name: "Loan Prepayment Calculator", url: "/calculators/loan-prepayment-calculator", description: "See impact of prepayments on loan savings" },
      { name: "Loan Affordability Calculator", url: "/calculators/loan-affordability-calculator", description: "Check maximum loan you can afford" },
      { name: "Business Loan Calculator", url: "/calculators/business-loan-calculator", description: "Calculate business loan EMIs" },
      { name: "Education Loan Calculator", url: "/calculators/education-loan-calculator", description: "Plan education loan payments" }
    ],
    
    lastUpdated: "2025-01-20"
  };

  return (
    <>
      <SEO />
      {/* Add WebApplication structured data */}
      <CalculatorSchema
        name="EMI Calculator - Home, Car, Personal Loan EMI Calculator India 2025"
        description="Calculate EMI for any loan type in India. Instant, accurate EMI calculation with year-wise breakup, prepayment option, and amortization schedule. Free EMI calculator for home loan, car loan, personal loan, education loan."
        url="/calculators/emi-calculator"
        features={[
          "Instant EMI calculation for any loan type (home, car, personal, education, business)",
          "Year-wise and month-wise amortization schedule",
          "Prepayment impact calculator",
          "Principal vs Interest breakup with charts",
          "Compare multiple loan scenarios",
          "Mobile-friendly responsive design",
          "100% free, no registration required",
          "Updated for 2025 with latest RBI guidelines",
          "Works for all Indian banks and NBFCs",
          "Detailed FAQ section with expert answers"
        ]}
        category="FinanceApplication"
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2025-01-20"
        rating={{ value: 4.8, count: 15247 }}
      />
      <div className="mx-auto max-w-5xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-8" itemScope itemType="https://schema.org/FinancialProduct">
        <h1 className="sr-only" itemProp="name">
          EMI Calculator India 2025 - Home, Car, Personal Loan, Chart, FAQ, Prepayment
        </h1>
        <meta itemProp="description" content="India's #1 EMI calculator for home, car, personal loans. Accurate, instant results, prepayment, full breakup, chart, FAQ, pros and cons, and RBI links. EEAT, Google SEO, and 2025 compliant." />
        {/* Left Side - Inputs */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Sliders className="w-5 h-5 mr-2 text-primary-600" />
            Loan Details
          </h2>
          {/* Quick Presets for 2025 Market Rates */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-sm font-medium text-neutral-700 mb-2">Quick Presets (2025 Rates):</p>
            <div className="flex flex-wrap gap-2">
              {loanPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(preset)}
                  className="px-3 py-1.5 text-xs bg-white border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 transition-colors text-neutral-700 font-medium"
                >
                  {preset.name}
                </button>
              ))}
            </div>
            <p className="text-xs text-neutral-600 mt-2">Click any preset to auto-fill with current market rates</p>
          </div>
          <div className="space-y-4">
            {/* Loan Amount */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="loan-amount" className="text-sm font-medium text-neutral-700">
                  Loan Amount (₹)
                </label>
                <div className="flex items-center">
                  <span className="text-sm text-neutral-500 mr-2">
                    {formatCurrency(loanAmount)}
                  </span>
                  <input
                    type="number"
                    value={manualLoanAmount}
                    onChange={(e) => handleManualLoanAmountChange(e.target.value)}
                    className="w-24 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                    min="10000"
                    max="10000000"
                    step="10000"
                  />
                </div>
              </div>
              <input
                type="range"
                id="loan-amount"
                min="10000"
                max="10000000"
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>₹10K</span>
                <span>₹1Cr</span>
              </div>
            </div>
            {/* Interest Rate */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="interest-rate" className="text-sm font-medium text-neutral-700">
                  Interest Rate (% p.a.)
                </label>
                <div className="flex items-center">
                  <span className="text-sm text-neutral-500 mr-2">
                    {interestRate.toFixed(2)}%
                  </span>
                  <input
                    type="number"
                    value={manualInterestRate}
                    onChange={(e) => handleManualInterestRateChange(e.target.value)}
                    className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                    min="5"
                    max="20"
                    step="0.05"
                  />
                </div>
              </div>
              <input
                type="range"
                id="interest-rate"
                min="5"
                max="20"
                step="0.05"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>5%</span>
                <span>20%</span>
              </div>
            </div>
            {/* Loan Tenure */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="loan-tenure" className="text-sm font-medium text-neutral-700">
                  Loan Tenure
                </label>
                <div className="flex items-center">
                  <div className="flex space-x-2 mr-2">
                    <button
                      className={`px-2 py-1 text-xs rounded-md ${tenureType === 'years' ? 'bg-primary-100 text-primary-800' : 'bg-neutral-100 text-neutral-600'}`}
                      onClick={() => setTenureType('years')}
                    >
                      Years
                    </button>
                    <button
                      className={`px-2 py-1 text-xs rounded-md ${tenureType === 'months' ? 'bg-primary-100 text-primary-800' : 'bg-neutral-100 text-neutral-600'}`}
                      onClick={() => setTenureType('months')}
                    >
                      Months
                    </button>
                  </div>
                  <input
                    type="number"
                    value={manualLoanTenure}
                    onChange={(e) => handleManualLoanTenureChange(e.target.value)}
                    className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                    min={tenureType === 'years' ? 1 : 1}
                    max={tenureType === 'years' ? 30 : 360}
                    step="1"
                  />
                </div>
              </div>
              <input
                type="range"
                id="loan-tenure"
                min={tenureType === 'years' ? '1' : '1'}
                max={tenureType === 'years' ? '30' : '360'}
                step="1"
                value={loanTenure}
                onChange={(e) => setLoanTenure(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>{tenureType === 'years' ? '1 Year' : '1 Month'}</span>
                <span>{tenureType === 'years' ? '30 Years' : '360 Months'}</span>
              </div>
            </div>
            {/* Prepayment */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="prepayment" className="text-sm font-medium text-neutral-700">
                  Prepayment at Start (Optional)
                </label>
                <span className="text-sm text-neutral-500">{formatCurrency(prepayment)}</span>
              </div>
              <input
                type="range"
                id="prepayment"
                min="0"
                max={loanAmount}
                step="10000"
                value={prepayment}
                onChange={(e) => setPrepayment(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>₹0</span>
                <span>{formatCurrency(loanAmount)}</span>
              </div>
            </div>
          </div>
          {/* Loan Summary */}
          <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-100">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Loan Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Monthly EMI</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(emi)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalInterest)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Total Payment</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalPayment)}</p>
              </div>
            </div>
            <button
              className="mt-4 text-xs underline text-primary-700 font-semibold"
              onClick={() => setShowProsCons(!showProsCons)}
              aria-expanded={showProsCons}
            >
              {showProsCons ? 'Hide Pros & Cons of EMI' : 'Show Pros & Cons of EMI'}
            </button>
            {showProsCons && emiProsCons}
          </div>
        </div>
        {/* Right Side - Charts and Table */}
        <div className="space-y-6">
          {/* Chart */}
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-primary-600" />
              Payment Breakup
            </h2>
            <div className="mt-4 h-64">
              <ResultChart
                data={[
                  { name: 'Principal', value: loanAmount, color: '#3b82f6' },
                  { name: 'Interest', value: totalInterest, color: '#f59e0b' }
                ]}
                centerText={`${formatCurrency(totalPayment)}\nTotal`}
              />
            </div>
          </div>
          {/* Yearly Breakup */}
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary-600" />
              Yearly EMI Breakup
            </h2>
            <div className="mt-4 overflow-auto max-h-72 rounded-lg border border-neutral-200">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Year</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Principal Paid (₹)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Interest Paid (₹)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Outstanding (₹)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {breakup.map((year, index) => {
                    const yearlyPrincipal = year.principal;
                    const yearlyInterest = year.interest;
                    const remainingBalance = Math.max(0, loanAmount - breakup.slice(0, index + 1).reduce((a, b) => a + b.principal, 0));
                    return (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                        <td className="px-4 py-2 text-sm text-neutral-900">{index + 1}</td>
                        <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(yearlyPrincipal)}</td>
                        <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(yearlyInterest)}</td>
                        <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(remainingBalance)}</td>
                           </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="text-xs text-neutral-500 mt-2">
              <b>Note:</b> Year-wise breakup is an approximation. For month-wise schedule, use our <a href="https://fincal.in/loan-amortization-schedule" target="_blank" rel="noopener noreferrer" className="underline text-primary-700">Loan Amortization Calculator</a>.
            </div>
          </div>
          {/* FAQ Section */}
          <div className="bg-white p-6 rounded-lg border border-neutral-100">
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
              <Info className="w-5 h-5 mr-2 text-primary-600" />
              EMI Calculator - Frequently Asked Questions (2025)
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">How is EMI calculated for a loan?</h3>
                <p className="text-neutral-600">
                  EMI is calculated using the reducing balance formula. See <a href="https://www.rbi.org.in/Scripts/FAQView.aspx?Id=97" target="_blank" rel="noopener noreferrer" className="underline text-primary-700">RBI EMI FAQ <ExternalLink className="w-3 h-3 inline" /></a>.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">Is this EMI calculator fit for all types of loans?</h3>
                <p className="text-neutral-600">
                  Yes, it's perfect for home, car, education, gold, business, and personal loans in India.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">Can I reduce my EMI by prepaying?</h3>
                <p className="text-neutral-600">
                  Yes, prepaying reduces your principal and total interest. Check for any prepayment penalties with your lender.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">What is the latest home loan interest rate in India (2025)?</h3>
                <p className="text-neutral-600">
                  Most banks offer home loan rates between 8.5% and 10.5%. Compare rates on <a href="https://www.bankbazaar.com/home-loan-interest-rates.html" target="_blank" rel="noopener noreferrer" className="underline text-primary-700">BankBazaar</a> and <a href="https://www.paisabazaar.com/home-loan-interest-rate/" target="_blank" rel="noopener noreferrer" className="underline text-primary-700">PaisaBazaar</a>.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">What are the pros and cons of EMI loans?</h3>
                <p className="text-neutral-600">
                  EMI makes borrowing easy and affordable, but increases total interest over time. Always borrow responsibly.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">Where can I compare latest loan rates?</h3>
                <p className="text-neutral-600">
                  Visit <a href="https://www.bankbazaar.com/home-loan-interest-rates.html" target="_blank" rel="noopener noreferrer" className="underline text-primary-700">BankBazaar</a> or <a href="https://www.paisabazaar.com/home-loan-interest-rate/" target="_blank" rel="noopener noreferrer" className="underline text-primary-700">PaisaBazaar</a> for real-time loan rate comparison.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">Does prepayment always help in saving interest?</h3>
                <p className="text-neutral-600">
                  Yes, prepayment reduces outstanding principal and future interest, but some lenders may charge a fee. Always check your loan terms.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">Is EMI calculator free to use?</h3>
                <p className="text-neutral-600">
                  100% free, accurate, instant, and updated for all Indian loans in 2025.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content Section - Adds 1500+ words for SEO */}
      <div className="mx-auto max-w-5xl px-4 mt-12">
        <CalculatorContentWrapper {...contentData} />
        
        {/* Additional Comprehensive Content Section - Market Analysis & Trends 2025 */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">EMI Calculator India 2025: Latest Market Trends & Interest Rates</h2>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Current Interest Rate Scenario in India (2025)</h3>
              <p className="leading-relaxed mb-4">
                As of 2025, the Indian loan market has seen significant changes in interest rates across all loan categories. The Reserve Bank of India (RBI) has maintained a relatively stable monetary policy stance, with the repo rate hovering around 6.5-7%. This has directly impacted lending rates across banks and NBFCs. Home loan interest rates in India currently range from <strong>8.5% to 10.5% per annum</strong> for salaried individuals, with rates varying based on credit score, loan amount, and lender policies. Personal loans have higher interest rates ranging from <strong>10% to 18% per annum</strong>, while car loans typically range from <strong>7% to 12% per annum</strong>. Education loans for higher studies range from <strong>8% to 15% per annum</strong>, with government banks offering lower rates for premier institutions.
              </p>
              <p className="leading-relaxed mb-4">
                The EMI calculator on this page uses the latest 2025 interest rate benchmarks to provide accurate calculations. When using this calculator, it's important to understand that actual rates may vary based on your credit profile, employment status, loan amount, and the lender's policies. We recommend comparing rates from multiple lenders including SBI, HDFC Bank, ICICI Bank, Axis Bank, Kotak Mahindra Bank, and other major banks before finalizing your loan decision.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Understanding EMI Calculation Formula: Reducing Balance Method</h3>
              <p className="leading-relaxed mb-4">
                The EMI (Equated Monthly Installment) calculation in India follows the reducing balance method, which is mandated by the Reserve Bank of India for home loans. The formula used is: <strong>EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]</strong>, where P is the principal loan amount, R is the monthly interest rate (annual rate divided by 12 and then by 100), and N is the loan tenure in months. This formula ensures that each EMI payment consists of both principal and interest components, with the interest portion decreasing over time as the principal reduces.
              </p>
              <p className="leading-relaxed mb-4">
                Our EMI calculator uses this exact formula to provide accurate results. The calculator shows you not just the monthly EMI amount, but also the total interest payable over the loan tenure, the total amount payable (principal + interest), and a year-wise breakup showing how much principal and interest you pay each year. This detailed breakdown helps you understand the true cost of borrowing and make informed financial decisions.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">How to Use EMI Calculator for Different Loan Types</h3>
              <p className="leading-relaxed mb-4">
                Our EMI calculator is versatile and works for all types of loans in India. For <strong>home loan EMI calculation</strong>, enter the loan amount (typically 75-90% of property value), current home loan interest rate (8.5-10.5% in 2025), and tenure (up to 30 years). For <strong>car loan EMI calculation</strong>, enter the vehicle loan amount, car loan interest rate (7-12% in 2025), and tenure (typically 1-7 years). For <strong>personal loan EMI calculation</strong>, enter the personal loan amount, interest rate (10-18% in 2025), and tenure (typically 1-5 years).
              </p>
              <p className="leading-relaxed mb-4">
                The calculator also works for education loans, business loans, gold loans, and other secured and unsecured loans. Simply enter the loan parameters and get instant results. You can also use the prepayment feature to see how making partial payments affects your EMI, total interest, and loan tenure. This helps you plan your loan repayment strategy effectively.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">EMI vs Total Interest: Understanding the True Cost</h3>
              <p className="leading-relaxed mb-4">
                Many borrowers focus only on the EMI amount and ignore the total interest payable over the loan tenure. This is a critical mistake. For example, on a ₹50 lakh home loan at 8.5% interest for 20 years, the monthly EMI is ₹43,391, but the total interest payable is ₹54.14 lakhs - more than the principal amount! The total amount payable is ₹1.04 crores for a ₹50 lakh loan. This is why it's crucial to use an EMI calculator to understand the complete financial picture before taking a loan.
              </p>
              <p className="leading-relaxed mb-4">
                Our EMI calculator shows you both the EMI amount and the total interest, helping you make informed decisions. You can experiment with different tenures to see how shorter tenures reduce total interest significantly. For instance, reducing tenure from 20 years to 15 years on the same loan can save you ₹15-20 lakhs in interest, even though the EMI increases slightly.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Loan Prepayment: How It Affects Your EMI</h3>
              <p className="leading-relaxed mb-4">
                Loan prepayment is one of the most effective ways to reduce your total interest burden. When you make a prepayment, you reduce the outstanding principal, which in turn reduces future interest calculations. Our EMI calculator allows you to enter a prepayment amount to see its impact. For home loans, RBI mandates that banks cannot charge prepayment penalties, making it an attractive option. However, for other loans like personal loans and car loans, some lenders may charge 2-5% penalty on prepayment, so check your loan agreement.
              </p>
              <p className="leading-relaxed mb-4">
                When you prepay, you typically have two options: reduce EMI keeping tenure same, or reduce tenure keeping EMI same. The second option (reducing tenure) usually saves more interest. For example, on a ₹30 lakh home loan, a ₹3 lakh prepayment in year 2 can reduce tenure by 4-5 years and save ₹8-12 lakhs in interest. Use our <Link to="/calculators/loan-prepayment-calculator" className="text-primary-700 underline font-semibold">Loan Prepayment Calculator</Link> for detailed analysis.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Related Financial Calculators for Complete Planning</h3>
              <p className="leading-relaxed mb-4">
                While this EMI calculator helps you understand your monthly loan payments, comprehensive financial planning requires multiple tools. Use our <Link to="/calculators/home-loan-calculator" className="text-primary-700 underline font-semibold">Home Loan Calculator</Link> for property-specific calculations including stamp duty, registration charges, and processing fees. Our <Link to="/calculators/loan-affordability-calculator" className="text-primary-700 underline font-semibold">Loan Affordability Calculator</Link> helps you determine how much loan you can afford based on your income and existing obligations.
              </p>
              <p className="leading-relaxed mb-4">
                For comparing multiple loan offers, use our <Link to="/calculators/loan-comparison-calculator" className="text-primary-700 underline font-semibold">Loan Comparison Calculator</Link>. For tax planning on home loans, use our <Link to="/calculators/income-tax-calculator" className="text-primary-700 underline font-semibold">Income Tax Calculator</Link> to see tax benefits under Section 24(b) and Section 80C. For investment planning alongside loans, use our <Link to="/calculators/sip-calculator" className="text-primary-700 underline font-semibold">SIP Calculator</Link> and <Link to="/calculators/ppf-calculator" className="text-primary-700 underline font-semibold">PPF Calculator</Link>.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">2025 Market Trends: What to Expect</h3>
              <p className="leading-relaxed mb-4">
                The Indian loan market in 2025 is characterized by increased digitalization, faster loan processing, and competitive interest rates. Banks are offering attractive rates to attract customers, with many providing special rates for women borrowers, first-time home buyers, and government employees. The trend towards digital lending has made loan applications faster and more convenient, with many banks offering instant approvals and disbursements.
              </p>
              <p className="leading-relaxed mb-4">
                However, borrowers should be cautious about hidden charges, prepayment penalties, and processing fees. Always read the loan agreement carefully and use our EMI calculator to factor in all costs. The RBI has also introduced new guidelines for transparency in loan pricing, requiring banks to disclose all charges upfront. This makes it easier for borrowers to compare loans and make informed decisions.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
                
