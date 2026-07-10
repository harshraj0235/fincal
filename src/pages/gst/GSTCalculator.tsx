import React, { useMemo, useRef, useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { ArrowLeft, IndianRupee, Download, Link as LinkIcon } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { CalculatorContentWrapper } from '../../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../../components/CalculatorSchema';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const GSTCalculator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [amount, setAmount] = useState<number>(0);
  const [rate, setRate] = useState<number>(18);

  const result = useMemo(() => {
    const amt = Number(amount) || 0;
    const r = Number(rate) || 0;
    if (amt <= 0 || r < 0) {
      return {
        taxAmount: 0,
        net: 0,
        gross: 0,
      };
    }
    if (mode === 'add') {
      const taxAmount = (amt * r) / 100;
      return { taxAmount, net: amt, gross: amt + taxAmount };
    }
    // remove
    const base = (amt * 100) / (100 + r);
    const taxAmount = amt - base;
    return { taxAmount, net: base, gross: amt };
  }, [amount, rate, mode]);

  const downloadPDF = async () => {
    if (!resultsRef.current) return;
    const canvas = await html2canvas(resultsRef.current, { scale: 2, useCORS: true, allowTaint: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    pdf.save('gst-calculation.pdf');
  };

  const contentData = {
    title: "GST Calculator - Goods and Services Tax",
    description: "The ultimate GST Calculator for Indian businesses and consumers. Easily add or remove GST from any amount. Calculate the exact CGST, SGST, and IGST breakdown. Whether you are generating an invoice, determining the actual cost of a product, or filing your GST returns, our tool ensures 100% accuracy with the latest tax slabs (5%, 12%, 18%, 28%).",
    
    benefits: [
      "Instantly calculate GST-inclusive and GST-exclusive prices",
      "Switch between 'Add GST' (forward calculation) and 'Remove GST' (backward calculation)",
      "Supports all primary Indian GST slabs: 5%, 12%, 18%, and 28%",
      "Provides exact tax amount breakdown to help in invoice generation",
      "Download a clean PDF report of the calculation for your accounting records",
      "Completely free, fast, and secure for everyday business use"
    ],
    
    howToSteps: [
      {
        step: "Select Calculation Mode",
        details: "Choose 'Add GST' if you have a base price and want to know the final price. Choose 'Remove GST' if you have the final MRP and want to find the base price and tax amount."
      },
      {
        step: "Enter the Amount",
        details: "Input the transaction value in rupees. This can be your product's selling price or the procurement cost."
      },
      {
        step: "Select GST Rate",
        details: "Choose the applicable GST rate percentage from the dropdown menu based on the nature of the goods or services (e.g., 18% for most services)."
      },
      {
        step: "View Results & Export",
        details: "The calculator instantly displays the Tax Amount, Net Amount (Excl. GST), and Gross Amount (Incl. GST). You can click 'Download PDF' to save the calculation."
      }
    ],
    
    examples: [
      {
        scenario: "Adding GST to a Base Price (B2B Billing)",
        inputs: [
          { label: "Mode", value: "Add GST" },
          { label: "Base Amount", value: "₹10,000" },
          { label: "GST Rate", value: "18%" }
        ],
        result: "Tax Amount: ₹1,800 | Total Invoice Value: ₹11,800",
        explanation: "A consultant charges ₹10,000 for a service. To generate the tax invoice, 18% GST (₹1,800) is added. The final amount charged to the client is ₹11,800. Half of the tax (₹900) will be CGST and the other half SGST if it is an intra-state supply."
      },
      {
        scenario: "Removing GST from Maximum Retail Price (MRP)",
        inputs: [
          { label: "Mode", value: "Remove GST" },
          { label: "MRP Amount", value: "₹2,500" },
          { label: "GST Rate", value: "12%" }
        ],
        result: "Base Price: ₹2,232.14 | Tax Amount: ₹267.86",
        explanation: "A consumer buys a product with an MRP of ₹2,500, which includes 12% GST. By using the 'Remove GST' feature, the shopkeeper can easily determine that the actual product value is ₹2,232.14, and the tax collected to be paid to the government is ₹267.86."
      }
    ],
    
    tips: [
      "For intra-state sales (within the same state), the total GST is divided equally into CGST (Central GST) and SGST (State GST). Eg: 18% = 9% CGST + 9% SGST.",
      "For inter-state sales (between two different states), the entire tax amount is charged as IGST (Integrated GST).",
      "Always keep the PDF downloads of significant GST calculations for easier reconciliation during GSTR-1 and GSTR-3B filings.",
      "Ensure you use the correct HSN/SAC code to determine the accurate GST rate for your specific goods or services to avoid penal interest."
    ],
    
    mistakes: [
      "Calculating 'Remove GST' by simply subtracting the percentage from the total. (E.g., 18% off 118 is NOT 100, you must use the proper backward calculation formula: Base = Amount / (1 + Rate)).",
      "Applying the wrong GST slab. A mistake here can lead to under-collection of tax, which you will have to pay from your own pocket later.",
      "Failing to issue a proper tax invoice when GST is added to a bill. B2B customers need it to claim Input Tax Credit (ITC)."
    ],
    
    faqs: [
      {
        question: "What is the formula to Add GST?",
        answer: "To add GST, multiply the base amount by the GST rate and divide by 100. Tax Amount = (Base Amount × GST Rate) / 100. Total Amount = Base Amount + Tax Amount."
      },
      {
        question: "What is the formula to Remove GST?",
        answer: "To remove GST from a total amount (MRP), the formula is: Base Amount = (Total Amount × 100) / (100 + GST Rate). The Tax Amount is then simply Total Amount - Base Amount."
      },
      {
        question: "What are the current GST slabs in India?",
        answer: "The primary GST slabs in India are 5% (essential goods), 12% (standard rate), 18% (services and standard goods), and 28% (luxury and sin goods). There are also special rates like 0.25% for rough diamonds and 3% for gold."
      },
      {
        question: "Is this calculator suitable for both goods and services?",
        answer: "Yes, the calculation mechanics are exactly the same regardless of whether you are selling physical goods (HSN code) or providing a service (SAC code). You only need to know the correct percentage rate."
      },
      {
        question: "How can I verify the GST number of a supplier?",
        answer: "You can verify any GSTIN (GST Identification Number) directly on the official Government of India GST Portal (gst.gov.in) under the 'Search Taxpayer' section to ensure they are legitimate."
      }
    ],
    
    relatedCalculators: [
      { name: "Income Tax Calculator", url: "/tools/income-tax-calculator", description: "Calculate your personal or business income tax liability." },
      { name: "GST Liability Calculator", url: "/gst-tools/gst-liability-calculator", description: "Determine total GST to be paid after adjusting Input Tax Credit." },
      { name: "HSN/SAC Finder", url: "/gst-tools/gst-hsn-sac-finder", description: "Find the official classification code and GST rate for any product." },
      { name: "GST Due Date Tracker", url: "/gst-tools/gst-due-date-tracker", description: "Never miss a GST return filing deadline." }
    ],
    
    lastUpdated: "2025-10-25"
  };

  return (
    <>
      <SEOHelmet
        title="GST Calculator - Add/Remove GST Online | MoneyCal.in"
        description="Quickly add or remove GST from any amount. Calculate GST-inclusive and GST-exclusive prices with exact tax breakdown for invoices."
        keywords="gst Calculator, add gst, remove gst, gst inclusive, gst exclusive, cgst, sgst, tax calculator"
        url="/gst-tools/gst-calculator"
        type="website"
        image="/images/gst-calculator.jpg"
        tags={["gst", "calculator", "tax"]}
        faqData={contentData.faqs}
      />
      <CalculatorSchema
        name="GST Calculator"
        description="Add or remove GST from any total amount and calculate exact tax breakdowns for GST compliance."
        url="/gst-tools/gst-calculator"
        features={[
          "Calculate GST-inclusive and GST-exclusive prices instantly",
          "Toggle between 'Add GST' and 'Remove GST' mathematical modes",
          "Download a PDF calculation report for invoice records",
          "Supports standard Indian GST rates (5%, 12%, 18%, 28%)"
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated={contentData.lastUpdated}
      />
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-neutral-600 hover:text-neutral-900">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </button>
          </div>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <IndianRupee className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">GST Calculator</h1>
            </div>
            <p className="text-gray-600">Add or remove GST and view tax breakdown. PDF export included.</p>
          </div>
          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                <div className="flex gap-2">
                  <button onClick={() => setMode('add')} className={`px-3 py-2 rounded-lg border ${mode==='add' ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-gray-700 border-gray-300'}`}>Add GST</button>
                  <button onClick={() => setMode('remove')} className={`px-3 py-2 rounded-lg border ${mode==='remove' ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-gray-700 border-gray-300'}`}>Remove GST</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                <input type="number" min={0} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="Enter amount" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GST Rate (%)</label>
                <select value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  {[0, 5, 12, 18, 28].map((r) => (
                    <option key={r} value={r}>{r}%</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                <div className="text-xs text-amber-700">Tax Amount</div>
                <div className="text-2xl font-bold text-amber-800">₹{result.taxAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="text-xs text-emerald-700">Amount (Excl. GST)</div>
                <div className="text-2xl font-bold text-emerald-800">₹{result.net.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-xs text-blue-700">Amount (Incl. GST)</div>
                <div className="text-2xl font-bold text-blue-800">₹{result.gross.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" />
                Related GST Tools
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <RouterLink to="/gst-tools/gst-due-date-tracker" className="text-blue-600 hover:text-blue-800 underline">GST Due Date Tracker</RouterLink>
                <RouterLink to="/gst-tools/gstr-3b-preparation" className="text-blue-600 hover:text-blue-800 underline">GSTR-3B Auto Preparation</RouterLink>
                <RouterLink to="/gst-tools/gst-hsn-sac-finder" className="text-blue-600 hover:text-blue-800 underline">HSN/SAC Code Finder</RouterLink>
                <RouterLink to="/gst-tools/gst-liability-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Liability Calculator</RouterLink>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={downloadPDF} className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </button>
          </div>
          
          <div className="mt-12">
            <CalculatorContentWrapper {...contentData} calculatorId="gst-calculator" />
          </div>
        </div>
      </div>
    </>
  );
};

export default GSTCalculator;


