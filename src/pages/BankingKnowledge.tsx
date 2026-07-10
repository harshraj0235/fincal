import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Book, FileText, ExternalLink, Info, AlertTriangle, CheckCircle } from 'lucide-react';

export const BankingKnowledge: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back</span>
        </button>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-3">Banking Knowledge Center</h1>
        <p className="text-lg text-neutral-600">Your comprehensive guide to understanding banking services, products, and practices in India</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4 flex items-center">
              <Book className="h-6 w-6 mr-2 text-[--primary-600]" />
              Banking Fundamentals
            </h2>
            <p className="text-neutral-600 mb-6">
              Understanding the basics of banking is essential for managing your finances effectively. This section covers the fundamental concepts, account types, and services offered by banks in India.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 rounded-lg">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">Types of Bank Accounts</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-600">
                  <li><strong>Savings Account:</strong> For personal savings with interest earnings</li>
                  <li><strong>Current Account:</strong> For businesses with high transaction volumes</li>
                  <li><strong>Salary Account:</strong> Special savings account linked to employer</li>
                  <li><strong>Fixed Deposit:</strong> Term deposits with higher interest rates</li>
                  <li><strong>Recurring Deposit:</strong> Regular monthly deposits with fixed returns</li>
                </ul>
              </div>
              
              <div className="p-4 bg-neutral-50 rounded-lg">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">Banking Services</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-600">
                  <li><strong>NEFT/RTGS/IMPS:</strong> Electronic fund transfer systems</li>
                  <li><strong>UPI:</strong> Unified Payments Interface for instant transfers</li>
                  <li><strong>Debit/Credit Cards:</strong> Card-based payment methods</li>
                  <li><strong>Loans:</strong> Personal, home, education, and business loans</li>
                  <li><strong>Lockers:</strong> Safe deposit facilities for valuables</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="col-span-1">
            <div className="bg-[--primary-50] p-6 rounded-lg border border-[--primary-100]">
              <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/calculators/bank-ifsc-finder" className="text-[--primary-700] hover:text-[--primary-900] flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Bank IFSC Finder
                  </Link>
                </li>
                <li>
                  <Link to="/calculators/upi-failure-troubleshooter" className="text-[--primary-700] hover:text-[--primary-900] flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    UPI Troubleshooter
                  </Link>
                </li>
                <li>
                  <Link to="/calculators/atm-locator" className="text-[--primary-700] hover:text-[--primary-900] flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    ATM Locator
                  </Link>
                </li>
                <li>
                  <Link to="/calculators/bank-holiday-calendar" className="text-[--primary-700] hover:text-[--primary-900] flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Bank Holiday Calendar
                  </Link>
                </li>
                <li>
                  <Link to="/calculators/interest-rates-comparison" className="text-[--primary-700] hover:text-[--primary-900] flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Interest Rates Comparison
                  </Link>
                </li>
                <li>
                  <a href="/financial-navigator.html" className="text-[--primary-700] hover:text-[--primary-900] flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Financial Navigator
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-200 pt-8 mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Banking Guides</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Understanding KYC Requirements</h3>
              <p className="text-neutral-600 text-sm mb-4">
                Learn about Know Your Customer (KYC) norms, required documents, and the verification process for banking services in India.
              </p>
              <a href="/financial-navigator.html#kyc-explained" className="text-[--primary-600] hover:text-[--primary-800] font-medium flex items-center">
                Read Guide
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-medium text-neutral-900 mb-3">UPI Payment System Explained</h3>
              <p className="text-neutral-600 text-sm mb-4">
                A comprehensive guide to the Unified Payments Interface (UPI) - setup, usage, security features, and troubleshooting common issues.
              </p>
              <a href="/financial-navigator.html#upi-guide" className="text-[--primary-600] hover:text-[--primary-800] font-medium flex items-center">
                Read Guide
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Digital Banking Safety</h3>
              <p className="text-neutral-600 text-sm mb-4">
                Essential security practices for online and mobile banking - password management, fraud prevention, and what to do if you suspect a breach.
              </p>
              <span className="text-neutral-500 text-sm italic">Planned</span>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Banking Charges Explained</h3>
              <p className="text-neutral-600 text-sm mb-4">
                Understand various banking fees and charges - minimum balance requirements, transaction fees, card charges, and how to minimize them.
              </p>
              <span className="text-neutral-500 text-sm italic">Planned</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-200 pt-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Banking FAQs</h2>
          
          <div className="space-y-4">
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
                <h4 className="text-neutral-900 font-medium">What is the difference between NEFT, RTGS, and IMPS?</h4>
                <span className="transition-transform duration-300 group-open:rotate-180">
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </summary>
              <div className="p-4 text-neutral-600 text-sm">
                <p><strong>NEFT (National Electronic Funds Transfer):</strong> Operates in hourly batches with no minimum or maximum transfer limits. Transfers are not processed in real-time.</p>
                <p className="mt-2"><strong>RTGS (Real-Time Gross Settlement):</strong> Processes transactions in real-time with a minimum transfer amount of ₹2 lakhs. Suitable for high-value transactions.</p>
                <p className="mt-2"><strong>IMPS (Immediate Payment Service):</strong> Provides 24/7 instant transfers with a daily limit of ₹5 lakhs. Works on holidays and non-banking hours as well.</p>
              </div>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
                <h4 className="text-neutral-900 font-medium">How do I protect myself from banking fraud and scams?</h4>
                <span className="transition-transform duration-300 group-open:rotate-180">
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </summary>
              <div className="p-4 text-neutral-600 text-sm">
                <ul className="list-disc list-inside space-y-2">
                  <li>Never share your PIN, OTP, CVV, or password with anyone, including bank representatives</li>
                  <li>Avoid clicking on suspicious links in emails or messages claiming to be from your bank</li>
                  <li>Use strong, unique passwords for your banking accounts and enable two-factor authentication</li>
                  <li>Regularly monitor your account statements for unauthorized transactions</li>
                  <li>Use secure networks for banking transactions and avoid public Wi-Fi</li>
                  <li>Keep your contact information updated with the bank to receive transaction alerts</li>
                  <li>Report suspicious activities or unauthorized transactions immediately to your bank</li>
                </ul>
              </div>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
                <h4 className="text-neutral-900 font-medium">What is the deposit insurance coverage in India?</h4>
                <span className="transition-transform duration-300 group-open:rotate-180">
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </summary>
              <div className="p-4 text-neutral-600 text-sm">
                <p>In India, the Deposit Insurance and Credit Guarantee Corporation (DICGC), a subsidiary of the Reserve Bank of India, provides insurance coverage for bank deposits.</p>
                <p className="mt-2">Currently, deposits in banks (including savings, fixed, current, and recurring deposits) are insured up to ₹5 lakhs per depositor per bank. This includes both principal and interest amounts.</p>
                <p className="mt-2">The insurance covers all commercial banks, local area banks, regional rural banks, and cooperative banks. If a bank fails, DICGC will pay the insurance amount to depositors.</p>
                <div className="mt-4 p-3 bg-[--primary-50] rounded-lg">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-[--primary-600] mt-0.5 mr-2" />
                    <p className="text-[--primary-700]">
                      Note: The ₹5 lakh limit applies separately to each bank where you have deposits. If you have accounts in multiple banks, you'll have separate insurance coverage for each bank.
                    </p>
                  </div>
                </div>
              </div>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
                <h4 className="text-neutral-900 font-medium">How do I choose the right type of bank account?</h4>
                <span className="transition-transform duration-300 group-open:rotate-180">
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </summary>
              <div className="p-4 text-neutral-600 text-sm">
                <p>Choosing the right bank account depends on your specific needs and financial habits:</p>
                <div className="mt-3 space-y-3">
                  <div className="p-3 bg-[--success-50] rounded-lg">
                    <h5 className="font-medium text-[--success-800] mb-1">Savings Account</h5>
                    <p className="text-[--success-700]">Best for: Individuals looking to save money and earn interest</p>
                    <p className="text-[--success-700] mt-1">Consider if: You need a place to keep your emergency fund and regular savings</p>
                  </div>
                  
                  <div className="p-3 bg-[--primary-50] rounded-lg">
                    <h5 className="font-medium text-[--primary-800] mb-1">Current Account</h5>
                    <p className="text-[--primary-700]">Best for: Businesses and professionals with high transaction volumes</p>
                    <p className="text-[--primary-700] mt-1">Consider if: You need to make frequent transactions without withdrawal limits</p>
                  </div>
                  
                  <div className="p-3 bg-[--warning-50] rounded-lg">
                    <h5 className="font-medium text-[--warning-800] mb-1">Salary Account</h5>
                    <p className="text-[--warning-700]">Best for: Employees receiving regular salary deposits</p>
                    <p className="text-[--warning-700] mt-1">Consider if: Your employer offers this option with additional benefits</p>
                  </div>
                  
                  <div className="p-3 bg-[--accent-50] rounded-lg">
                    <h5 className="font-medium text-[--accent-800] mb-1">Fixed Deposit Account</h5>
                    <p className="text-[--accent-700]">Best for: Long-term savings with higher interest rates</p>
                    <p className="text-[--accent-700] mt-1">Consider if: You have funds you won't need to access for a specific period</p>
                  </div>
                </div>
                <p className="mt-4">When choosing, consider factors like minimum balance requirements, interest rates, branch/ATM accessibility, digital banking features, and associated fees.</p>
              </div>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
                <h4 className="text-neutral-900 font-medium">What is UPI and how does it work?</h4>
                <span className="transition-transform duration-300 group-open:rotate-180">
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </summary>
              <div className="p-4 text-neutral-600 text-sm">
                <p>UPI (Unified Payments Interface) is a real-time payment system developed by the National Payments Corporation of India (NPCI) that enables instant inter-bank transactions through mobile phones.</p>
                <div className="mt-3 p-3 bg-neutral-100 rounded-lg">
                  <h5 className="font-medium text-neutral-900 mb-2">How UPI Works:</h5>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>You download a UPI-enabled app (like Google Pay, PhonePe, BHIM, etc.)</li>
                    <li>Create a UPI ID by linking your bank account</li>
                    <li>Set a UPI PIN for transaction authentication</li>
                    <li>To send money, you can use:
                      <ul className="list-disc list-inside ml-4 mt-1">
                        <li>UPI ID of the recipient</li>
                        <li>QR code scanning</li>
                        <li>Mobile number (if registered with UPI)</li>
                        <li>Bank account details</li>
                      </ul>
                    </li>
                    <li>Authenticate the transaction with your UPI PIN</li>
                  </ol>
                </div>
                <div className="mt-4 flex space-x-4">
                  <div className="flex-1 p-3 bg-[--success-50] rounded-lg">
                    <h5 className="font-medium text-[--success-800] mb-1">Benefits</h5>
                    <ul className="list-disc list-inside text-[--success-700] space-y-1">
                      <li>24/7 availability</li>
                      <li>Instant transfers</li>
                      <li>No need to share bank details</li>
                      <li>Free for most transactions</li>
                    </ul>
                  </div>
                  <div className="flex-1 p-3 bg-[--warning-50] rounded-lg">
                    <h5 className="font-medium text-[--warning-800] mb-1">Limitations</h5>
                    <ul className="list-disc list-inside text-[--warning-700] space-y-1">
                      <li>Transaction limits (typically ₹1 lakh/day)</li>
                      <li>Requires internet connectivity</li>
                      <li>Potential for technical glitches</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <Link to="/calculators/upi-failure-troubleshooter" className="text-[--primary-600] hover:text-[--primary-800] font-medium">
                    Having UPI issues? Try our UPI Failure Troubleshooter →
                  </Link>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-[--warning-50] rounded-xl p-6 border border-[--warning-200]">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-[--warning-600] mt-1 mr-3" />
            <div>
              <h3 className="text-xl font-semibold text-[--warning-900] mb-2">Common Banking Scams to Avoid</h3>
              <ul className="list-disc list-inside text-[--warning-700] space-y-2">
                <li><strong>Phishing:</strong> Fake emails/messages claiming to be from your bank</li>
                <li><strong>Vishing:</strong> Phone calls requesting sensitive banking information</li>
                <li><strong>SIM Swap:</strong> Fraudsters take control of your mobile number to receive OTPs</li>
                <li><strong>Skimming:</strong> Devices attached to ATMs that steal card information</li>
                <li><strong>Fake Apps:</strong> Counterfeit banking apps that steal login credentials</li>
              </ul>
              <div className="mt-4">
                <a 
                  href="/blog/financial-scams-awareness" 
                  className="text-[--warning-700] hover:text-[--warning-900] font-medium flex items-center"
                >
                  Learn More About Financial Scams
                  <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[--success-50] rounded-xl p-6 border border-[--success-200]">
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-[--success-600] mt-1 mr-3" />
            <div>
              <h3 className="text-xl font-semibold text-[--success-900] mb-2">Banking Best Practices</h3>
              <ul className="list-disc list-inside text-[--success-700] space-y-2">
                <li>Enable SMS and email alerts for all transactions</li>
                <li>Regularly review your account statements</li>
                <li>Use strong, unique passwords for online banking</li>
                <li>Update your mobile banking apps regularly</li>
                <li>Never share OTPs, PINs, or passwords with anyone</li>
                <li>Use virtual keyboards when entering sensitive information</li>
                <li>Log out properly after completing online banking sessions</li>
              </ul>
              <div className="mt-4">
                <a 
                  href="/financial-navigator.html#banking-basics" 
                  className="text-[--success-700] hover:text-[--success-900] font-medium flex items-center"
                >
                  Explore More Banking Tips
                  <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[--primary-50] rounded-xl p-8 border border-[--primary-100] mb-8">
        <h2 className="text-2xl font-semibold text-[--primary-900] mb-6">Banking Glossary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-neutral-900 mb-1">CASA Ratio</h3>
            <p className="text-sm text-neutral-600">Current Account Savings Account ratio, indicating the portion of a bank's deposits that comes from current and savings accounts.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-neutral-900 mb-1">MCLR</h3>
            <p className="text-sm text-neutral-600">Marginal Cost of Funds based Lending Rate, the minimum interest rate below which a bank cannot lend.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-neutral-900 mb-1">NACH</h3>
            <p className="text-sm text-neutral-600">National Automated Clearing House, a system for bulk payment transactions like direct debit for loan EMIs.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-neutral-900 mb-1">IFSC</h3>
            <p className="text-sm text-neutral-600">Indian Financial System Code, a unique 11-character code assigned to bank branches participating in electronic payment systems.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-neutral-900 mb-1">MICR</h3>
            <p className="text-sm text-neutral-600">Magnetic Ink Character Recognition, a technology used for processing cheques that appears as a 9-digit code.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-neutral-900 mb-1">CIBIL Score</h3>
            <p className="text-sm text-neutral-600">A three-digit number (300-900) that represents an individual's creditworthiness based on their credit history.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-neutral-900 mb-1">IMPS</h3>
            <p className="text-sm text-neutral-600">Immediate Payment Service, a 24/7 instant interbank electronic fund transfer service.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-neutral-900 mb-1">NEFT</h3>
            <p className="text-sm text-neutral-600">National Electronic Funds Transfer, a nation-wide payment system facilitating one-to-one funds transfer.</p>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <button className="text-[--primary-600] hover:text-[--primary-800] font-medium">
            View Full Banking Glossary
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Banking Calculators</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            to="/calculators/fd-calculator" 
            className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
          >
            <h3 className="text-lg font-medium text-neutral-900 mb-1">FD Calculator</h3>
            <p className="text-sm text-neutral-600">Calculate maturity amount and interest earned on fixed deposits</p>
          </Link>
          
          <Link 
            to="/calculators/rd-calculator" 
            className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
          >
            <h3 className="text-lg font-medium text-neutral-900 mb-1">RD Calculator</h3>
            <p className="text-sm text-neutral-600">Calculate returns on recurring deposits with monthly investments</p>
          </Link>
          
          <Link 
            to="/calculators/savings-account-calculator" 
            className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
          >
            <h3 className="text-lg font-medium text-neutral-900 mb-1">Savings Account Calculator</h3>
            <p className="text-sm text-neutral-600">Calculate interest earned on your savings account balance</p>
          </Link>
          
          <Link 
            to="/calculators/loan-comparison-calculator" 
            className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
          >
            <h3 className="text-lg font-medium text-neutral-900 mb-1">Loan Comparison Calculator</h3>
            <p className="text-sm text-neutral-600">Compare loan offers from different banks side by side</p>
          </Link>
          
          <Link 
            to="/calculators/interest-rates-comparison" 
            className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
          >
            <h3 className="text-lg font-medium text-neutral-900 mb-1">Interest Rates Comparison</h3>
            <p className="text-sm text-neutral-600">Compare current interest rates across major banks in India</p>
          </Link>
          
          <Link 
            to="/calculators/currency-converter" 
            className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
          >
            <h3 className="text-lg font-medium text-neutral-900 mb-1">Currency Converter</h3>
            <p className="text-sm text-neutral-600">Convert between Indian Rupee and other major currencies</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BankingKnowledge;
