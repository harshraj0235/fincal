import React, { useState, useEffect } from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle, ExternalLink, Info, FileText, IndianRupee } from 'lucide-react';

// Inject FAQ schema for Google EEAT, rich snippets
const injectSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is GSTR-1 and when is it due?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GSTR-1 is a monthly return filed by GST registered taxpayers to report outward supplies. It's due by the 11th of the following month for regular taxpayers and 13th for quarterly filers."
        }
      },
      {
        "@type": "Question",
        "name": "How to calculate GSTR-1 filing deadline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For monthly filers: 11th of next month. For quarterly filers: 13th of the month following the quarter end. Use our GSTR-1 deadline Calculator for accurate dates."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if I miss GSTR-1 deadline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Late filing attracts penalty of ₹200 per day (₹100 CGST + ₹100 SGST) with maximum of ₹5,000. Interest at 18% per annum on tax liability."
        }
      },
      {
        "@type": "Question",
        "name": "Can I file GSTR-1 after the due date?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, but with penalties. File immediately to minimize charges. Use our Calculator to check exact penalty amount for late filing."
        }
      },
      {
        "@type": "Question",
        "name": "What are the GSTR-1 filing requirements for different turnover slabs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Above ₹5 crore: Monthly filing. ₹1.5-5 crore: Monthly or quarterly (with conditions). Below ₹1.5 crore: Quarterly filing allowed."
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

interface Gstr1DeadlineResult {
  dueDate: Date;
  daysRemaining: number;
  isOverdue: boolean;
  penaltyAmount: number;
  interestAmount: number;
  totalCharges: number;
  status: 'on-time' | 'warning' | 'overdue';
  message: string;
}

export const Gstr1DeadlineCalculator: React.FC = () => {
  const [filingPeriod, setFilingPeriod] = useState<string>('');
  const [filingFrequency, setFilingFrequency] = useState<'monthly' | 'quarterly'>('monthly');
  const [turnover, setTurnover] = useState<number>(0);
  const [taxLiability, setTaxLiability] = useState<number>(0);
  const [result, setResult] = useState<Gstr1DeadlineResult | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    injectSchema();
  }, []);

  const calculateDeadline = () => {
    if (!filingPeriod) return;

    const periodDate = new Date(filingPeriod);
    const currentDate = new Date();
    
    let dueDate: Date;
    
    if (filingFrequency === 'monthly') {
      // Monthly filers: 11th of next month
      dueDate = new Date(periodDate.getFullYear(), periodDate.getMonth() + 1, 11);
    } else {
      // Quarterly filers: 13th of month following quarter end
      dueDate = new Date(periodDate.getFullYear(), periodDate.getMonth() + 1, 13);
    }

    const daysRemaining = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    const isOverdue = daysRemaining < 0;
    
    let penaltyAmount = 0;
    let interestAmount = 0;
    let status: 'on-time' | 'warning' | 'overdue' = 'on-time';
    let message = '';

    if (isOverdue) {
      const daysLate = Math.abs(daysRemaining);
      penaltyAmount = Math.min(daysLate * 200, 5000); // ₹200 per day, max ₹5000
      interestAmount = (taxLiability * 18 * daysLate) / (100 * 365); // 18% per annum
      status = 'overdue';
      message = `Overdue by ${daysLate} days. File immediately to avoid further penalties.`;
    } else if (daysRemaining <= 3) {
      status = 'warning';
      message = `Only ${daysRemaining} days left to file. File soon to avoid penalties.`;
    } else {
      message = `You have ${daysRemaining} days to file GSTR-1.`;
    }

    const totalCharges = penaltyAmount + interestAmount;

    setResult({
      dueDate,
      daysRemaining,
      isOverdue,
      penaltyAmount,
      interestAmount,
      totalCharges,
      status,
      message
    });
  };

  useEffect(() => {
    if (filingPeriod) {
      calculateDeadline();
    }
  }, [filingPeriod, filingFrequency, taxLiability]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'overdue':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'overdue':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <>
      <SEO />
      <div className="mx-auto max-w-6xl px-4" itemScope itemType="https://schema.org/FinancialProduct">
        <h1 className="sr-only" itemProp="name">
          GSTR-1 Deadline Calculator India 2025 - GST Return Filing Date, Penalty, Interest Calculator
        </h1>
        <meta itemProp="description" content="Free GSTR-1 deadline Calculator for GST return filing. Calculate due dates, penalties, interest charges for late filing. Monthly & quarterly filers. Updated for 2025." />
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            GSTR-1 Deadline Calculator
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Calculate your GSTR-1 filing deadline, penalties, and interest charges. 
            Stay compliant with GST return filing requirements for 2025.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Inputs */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-6">
                <IndianRupee className="w-5 h-5 mr-2 text-primary-600" />
                Filing Details
              </h2>
              
              <div className="space-y-6">
                {/* Filing Frequency */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Filing Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      className={`p-4 rounded-lg border-2 transition-all ${
                        filingFrequency === 'monthly'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                      }`}
                      onClick={() => setFilingFrequency('monthly')}
                    >
                      <div className="text-center">
                        <Calendar className="w-6 h-6 mx-auto mb-2" />
                        <div className="font-medium">Monthly</div>
                        <div className="text-xs text-neutral-500">Due: 11th of next month</div>
                      </div>
                    </button>
                    <button
                      className={`p-4 rounded-lg border-2 transition-all ${
                        filingFrequency === 'quarterly'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                      }`}
                      onClick={() => setFilingFrequency('quarterly')}
                    >
                      <div className="text-center">
                        <Calendar className="w-6 h-6 mx-auto mb-2" />
                        <div className="font-medium">Quarterly</div>
                        <div className="text-xs text-neutral-500">Due: 13th of next month</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Filing Period */}
                <div>
                  <label htmlFor="filing-period" className="block text-sm font-medium text-neutral-700 mb-2">
                    {filingFrequency === 'monthly' ? 'Month for which return is to be filed' : 'Quarter for which return is to be filed'}
                  </label>
                  <input
                    type="month"
                    id="filing-period"
                    value={filingPeriod}
                    onChange={(e) => setFilingPeriod(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>

                {/* Turnover */}
                <div>
                  <label htmlFor="turnover" className="block text-sm font-medium text-neutral-700 mb-2">
                    Annual Turnover (₹)
                  </label>
                  <input
                    type="number"
                    id="turnover"
                    value={turnover || ''}
                    onChange={(e) => setTurnover(Number(e.target.value))}
                    placeholder="Enter your annual turnover"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    min="0"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    Helps determine filing frequency requirements
                  </p>
                </div>

                {/* Tax Liability */}
                <div>
                  <label htmlFor="tax-liability" className="block text-sm font-medium text-neutral-700 mb-2">
                    Tax Liability for the Period (₹)
                  </label>
                  <input
                    type="number"
                    id="tax-liability"
                    value={taxLiability || ''}
                    onChange={(e) => setTaxLiability(Number(e.target.value))}
                    placeholder="Enter tax liability amount"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    min="0"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    Required for interest calculation on late filing
                  </p>
                </div>
              </div>
            </div>

            {/* Filing Requirements Info */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                GSTR-1 Filing Requirements 2025
              </h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>Above ₹5 crore turnover:</strong> Mandatory monthly filing
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>₹1.5-5 crore turnover:</strong> Monthly or quarterly (with conditions)
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>Below ₹1.5 crore turnover:</strong> Quarterly filing allowed
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>Composition dealers:</strong> GSTR-4 (quarterly) instead of GSTR-1
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Main Result Card */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-6">
                    <Clock className="w-5 h-5 mr-2 text-primary-600" />
                    Filing Status
                  </h2>
                  
                  <div className={`p-6 rounded-lg border-2 ${getStatusColor(result.status)}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {getStatusIcon(result.status)}
                        <span className="ml-2 font-semibold text-lg">
                          {result.status === 'on-time' ? 'On Time' : 
                           result.status === 'warning' ? 'Warning' : 'Overdue'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Due Date:</span>
                        <span className="font-semibold">{formatDate(result.dueDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Days Remaining:</span>
                        <span className="font-semibold">{result.daysRemaining} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Status:</span>
                        <span className="font-semibold">{result.message}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Penalty & Interest Card */}
                {(result.penaltyAmount > 0 || result.interestAmount > 0) && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                      Late Filing Charges
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                        <span className="font-medium text-red-800">Penalty (₹200/day):</span>
                        <span className="font-bold text-red-900">{formatCurrency(result.penaltyAmount)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                        <span className="font-medium text-orange-800">Interest (18% p.a.):</span>
                        <span className="font-bold text-orange-900">{formatCurrency(result.interestAmount)}</span>
                      </div>
                      
                      <div className="border-t border-neutral-200 pt-4">
                        <div className="flex justify-between items-center p-4 bg-red-100 rounded-lg">
                          <span className="font-bold text-red-900">Total Charges:</span>
                          <span className="font-bold text-red-900 text-xl">{formatCurrency(result.totalCharges)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href="https://www.gst.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      File GSTR-1 Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="flex items-center justify-center p-4 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
                    >
                      <Info className="w-5 h-5 mr-2" />
                      {showDetails ? 'Hide' : 'Show'} Details
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Detailed Information */}
            {showDetails && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">GSTR-1 Filing Guide</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-neutral-800 mb-2">What is GSTR-1?</h4>
                    <p className="text-neutral-600">
                      GSTR-1 is a monthly/quarterly return filed by GST registered taxpayers to report all outward supplies 
                      (sales) made during the tax period. It contains details of invoices issued and supplies made.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-neutral-800 mb-2">Due Dates:</h4>
                    <ul className="list-disc list-inside text-neutral-600 space-y-1">
                      <li>Monthly filers: 11th of the following month</li>
                      <li>Quarterly filers: 13th of the month following quarter end</li>
                      <li>Special cases may have different due dates</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-neutral-800 mb-2">Penalties for Late Filing:</h4>
                    <ul className="list-disc list-inside text-neutral-600 space-y-1">
                      <li>₹200 per day (₹100 CGST + ₹100 SGST)</li>
                      <li>Maximum penalty: ₹5,000</li>
                      <li>Interest at 18% per annum on tax liability</li>
                      <li>Input tax credit may be restricted</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-neutral-900 flex items-center mb-6">
            <Info className="w-6 h-6 mr-2 text-primary-600" />
            GSTR-1 Deadline Calculator - Frequently Asked Questions (2025)
          </h2>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">What is GSTR-1 and when is it due?</h3>
              <p className="text-neutral-600">
                GSTR-1 is a monthly/quarterly return filed by GST registered taxpayers to report outward supplies. 
                Monthly filers must file by 11th of next month, quarterly filers by 13th of the month following quarter end.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">How to calculate GSTR-1 filing deadline?</h3>
              <p className="text-neutral-600">
                For monthly filers: 11th of next month. For quarterly filers: 13th of the month following the quarter end. 
                Use our <a href="https://moneycal.in/tools/gstr-1-deadline-calculator" className="underline text-primary-700">GSTR-1 deadline calculator</a> for accurate dates.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">What happens if I miss GSTR-1 deadline?</h3>
              <p className="text-neutral-600">
                Late filing attracts penalty of ₹200 per day (₹100 CGST + ₹100 SGST) with maximum of ₹5,000. 
                Interest at 18% per annum on tax liability. File immediately to minimize charges.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">Can I file GSTR-1 after the due date?</h3>
              <p className="text-neutral-600">
                Yes, but with penalties. File immediately to minimize charges. Use our Calculator to check exact penalty amount for late filing.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">What are the GSTR-1 filing requirements for different turnover slabs?</h3>
              <p className="text-neutral-600">
                Above ₹5 crore: Monthly filing. ₹1.5-5 crore: Monthly or quarterly (with conditions). 
                Below ₹1.5 crore: Quarterly filing allowed. Check <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer" className="underline text-primary-700">GST portal <ExternalLink className="w-3 h-3 inline" /></a> for latest updates.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">How to avoid GSTR-1 penalties?</h3>
              <p className="text-neutral-600">
                File returns on time, maintain proper records, use GST software for accuracy, and set reminders for due dates. 
                Consider <a href="https://moneycal.in/tools/gst-calculator" className="underline text-primary-700">GST calculator</a> for tax calculations.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">Is this GSTR-1 deadline Calculator free to use?</h3>
              <p className="text-neutral-600">
                100% free, accurate, instant, and updated for all GST return filing requirements in 2025. 
                No registration required.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-8 bg-neutral-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Related GST Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://moneycal.in/tools/gst-calculator"
              className="p-4 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors"
            >
              <div className="font-medium text-neutral-900">GST Calculator</div>
              <div className="text-sm text-neutral-600">Calculate GST on invoices</div>
            </a>
            <a
              href="https://moneycal.in/tools/income-tax-calculator"
              className="p-4 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors"
            >
              <div className="font-medium text-neutral-900">Income Tax Calculator</div>
              <div className="text-sm text-neutral-600">Calculate income tax liability</div>
            </a>
            <a
              href="https://moneycal.in/tools/tds-calculator"
              className="p-4 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors"
            >
              <div className="font-medium text-neutral-900">TDS Calculator</div>
              <div className="text-sm text-neutral-600">Calculate TDS deductions</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gstr1DeadlineCalculator;
