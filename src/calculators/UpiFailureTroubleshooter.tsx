import React, { useState } from 'react';
import { HelpCircle, AlertTriangle, CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';

type FailureReason = 
  | 'pending'
  | 'declined'
  | 'insufficient_funds'
  | 'bank_server'
  | 'incorrect_pin'
  | 'limit_exceeded'
  | 'technical_error'
  | 'beneficiary_issue'
  | 'app_issue';

interface SolutionStep {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const UpiFailureTroubleshooter: React.FC = () => {
  const [transactionStatus, setTransactionStatus] = useState<'success' | 'failed' | 'pending' | null>(null);
  const [failureReason, setFailureReason] = useState<FailureReason | null>(null);
  const [upiApp, setUpiApp] = useState<string>('');
  const [showSolution, setShowSolution] = useState(false);
  const [solutionSteps, setSolutionSteps] = useState<SolutionStep[]>([]);

  const handleStatusChange = (status: 'success' | 'failed' | 'pending' | null) => {
    setTransactionStatus(status);
    setFailureReason(null);
    setShowSolution(false);
  };

  const handleReasonChange = (reason: FailureReason) => {
    setFailureReason(reason);
    setShowSolution(false);
  };

  const handleAppChange = (app: string) => {
    setUpiApp(app);
  };

  const generateSolution = () => {
    if (!failureReason) return;

    let steps: SolutionStep[] = [];

    switch (failureReason) {
      case 'pending':
        steps = [
          {
            title: 'Wait for Processing',
            description: 'Pending transactions typically resolve within 24-48 hours. Check your bank statement to see if the amount has been debited.',
            icon: <RefreshCw className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Check Transaction Status',
            description: `Open your ${upiApp || 'UPI'} app and go to the transaction history section to check the current status.`,
            icon: <CheckCircle className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Contact Bank if Needed',
            description: 'If the transaction remains pending after 48 hours, contact your bank\'s customer care with the transaction reference number.',
            icon: <HelpCircle className="h-5 w-5 text-[--primary-600]" />
          }
        ];
        break;
        
      case 'declined':
        steps = [
          {
            title: 'Verify Recipient Details',
            description: 'Double-check the recipient\'s UPI ID or mobile number for accuracy.',
            icon: <CheckCircle className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Ask Recipient to Check App',
            description: 'Ask the recipient to check if they received a payment request and might have declined it accidentally.',
            icon: <HelpCircle className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Try Alternative Payment Method',
            description: 'If the issue persists, try sending money using a different UPI app or payment method.',
            icon: <RefreshCw className="h-5 w-5 text-[--primary-600]" />
          }
        ];
        break;
        
      case 'insufficient_funds':
        steps = [
          {
            title: 'Check Account Balance',
            description: 'Ensure you have sufficient balance in your bank account linked to UPI.',
            icon: <CheckCircle className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Add Funds',
            description: 'Transfer funds to your account or use a different bank account with adequate balance.',
            icon: <ArrowRight className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Retry Transaction',
            description: 'Once you have sufficient funds, retry the transaction.',
            icon: <RefreshCw className="h-5 w-5 text-[--primary-600]" />
          }
        ];
        break;
        
      case 'bank_server':
        steps = [
          {
            title: 'Check Bank Status',
            description: 'Visit your bank\'s website or social media channels to check for any announced server maintenance or outages.',
            icon: <CheckCircle className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Wait and Retry',
            description: 'Wait for some time (typically 1-2 hours) and try the transaction again.',
            icon: <RefreshCw className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Use Alternative Bank Account',
            description: 'If you have multiple bank accounts linked to UPI, try using a different bank account for the transaction.',
            icon: <ArrowRight className="h-5 w-5 text-[--primary-600]" />
          }
        ];
        break;
        
      case 'incorrect_pin':
        steps = [
          {
            title: 'Reset UPI PIN',
            description: `Open your ${upiApp || 'UPI'} app, go to settings, and select the option to reset your UPI PIN.`,
            icon: <RefreshCw className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Verify with Debit Card',
            description: 'You\'ll need your debit card details (card number, expiry date) and the registered mobile number to reset your UPI PIN.',
            icon: <CheckCircle className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Create New PIN',
            description: 'Create a new UPI PIN that you can remember easily but is secure enough.',
            icon: <ArrowRight className="h-5 w-5 text-[--primary-600]" />
          }
        ];
        break;
        
      case 'limit_exceeded':
        steps = [
          {
            title: 'Check UPI Limits',
            description: 'UPI has daily transaction limits (typically ₹1 lakh per day). Check your app for your specific limits.',
            icon: <CheckCircle className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Split Transactions',
            description: 'If possible, split your payment into smaller amounts across multiple days.',
            icon: <ArrowRight className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Use Alternative Methods',
            description: 'For larger amounts, consider NEFT/RTGS transfers or other payment methods with higher limits.',
            icon: <RefreshCw className="h-5 w-5 text-[--primary-600]" />
          }
        ];
        break;
        
      case 'technical_error':
        steps = [
          {
            title: 'Update Your App',
            description: `Ensure your ${upiApp || 'UPI'} app is updated to the latest version.`,
            icon: <RefreshCw className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Check Internet Connection',
            description: 'Ensure you have a stable internet connection. Try switching between Wi-Fi and mobile data.',
            icon: <CheckCircle className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Clear App Cache',
            description: 'Go to your phone settings, find the app, and clear its cache. Then restart the app and try again.',
            icon: <ArrowRight className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Try Different App',
            description: 'If the issue persists, try using a different UPI app for your transaction.',
            icon: <RefreshCw className="h-5 w-5 text-[--primary-600]" />
          }
        ];
        break;
        
      case 'beneficiary_issue':
        steps = [
          {
            title: 'Verify UPI ID',
            description: 'Double-check the beneficiary\'s UPI ID for accuracy. Even a small typo can cause the transaction to fail.',
            icon: <CheckCircle className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Confirm with Recipient',
            description: 'Ask the recipient to confirm their UPI ID and check if their UPI service is active.',
            icon: <HelpCircle className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Try Alternative Identifier',
            description: 'If sending via phone number, try using the actual UPI ID instead, or vice versa.',
            icon: <RefreshCw className="h-5 w-5 text-[--primary-600]" />
          }
        ];
        break;
        
      case 'app_issue':
        steps = [
          {
            title: 'Force Stop and Restart',
            description: `Force stop the ${upiApp || 'UPI'} app from your phone settings and restart it.`,
            icon: <RefreshCw className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Clear App Data',
            description: 'Go to your phone settings, find the app, and clear its data. Note that you\'ll need to log in again.',
            icon: <ArrowRight className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Reinstall App',
            description: 'If the issue persists, try uninstalling and reinstalling the app.',
            icon: <RefreshCw className="h-5 w-5 text-[--primary-600]" />
          },
          {
            title: 'Use Alternative App',
            description: 'Try using a different UPI app like BHIM, Google Pay, PhonePe, or Paytm.',
            icon: <ArrowRight className="h-5 w-5 text-[--primary-600]" />
          }
        ];
        break;
    }

    setSolutionSteps(steps);
    setShowSolution(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">UPI Transaction Failure Troubleshooter</h2>
        <p className="text-neutral-600">
          Diagnose and resolve issues with your UPI transactions. This tool provides step-by-step guidance to help you understand why your transaction failed and how to fix it.
        </p>
      </div>

      {/* Transaction Status Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">What's your transaction status?</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => handleStatusChange('success')}
            className={`p-4 rounded-lg border-2 flex flex-col items-center ${
              transactionStatus === 'success'
                ? 'border-[--success-500] bg-[--success-50]'
                : 'border-neutral-200 hover:border-[--success-300] hover:bg-[--success-50]'
            }`}
          >
            <CheckCircle className={`h-8 w-8 mb-2 ${
              transactionStatus === 'success' ? 'text-[--success-500]' : 'text-neutral-400'
            }`} />
            <span className="font-medium">Successful</span>
            <span className="text-xs text-neutral-500 mt-1">Money was transferred</span>
          </button>
          
          <button
            onClick={() => handleStatusChange('failed')}
            className={`p-4 rounded-lg border-2 flex flex-col items-center ${
              transactionStatus === 'failed'
                ? 'border-[--error-500] bg-[--error-50]'
                : 'border-neutral-200 hover:border-[--error-300] hover:bg-[--error-50]'
            }`}
          >
            <AlertTriangle className={`h-8 w-8 mb-2 ${
              transactionStatus === 'failed' ? 'text-[--error-500]' : 'text-neutral-400'
            }`} />
            <span className="font-medium">Failed</span>
            <span className="text-xs text-neutral-500 mt-1">Transaction was declined</span>
          </button>
          
          <button
            onClick={() => handleStatusChange('pending')}
            className={`p-4 rounded-lg border-2 flex flex-col items-center ${
              transactionStatus === 'pending'
                ? 'border-[--warning-500] bg-[--warning-50]'
                : 'border-neutral-200 hover:border-[--warning-300] hover:bg-[--warning-50]'
            }`}
          >
            <RefreshCw className={`h-8 w-8 mb-2 ${
              transactionStatus === 'pending' ? 'text-[--warning-500]' : 'text-neutral-400'
            }`} />
            <span className="font-medium">Pending</span>
            <span className="text-xs text-neutral-500 mt-1">Status is unclear</span>
          </button>
        </div>
      </div>

      {/* UPI App Selection */}
      {(transactionStatus === 'failed' || transactionStatus === 'pending') && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Which UPI app are you using?</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Google Pay', 'PhonePe', 'Paytm', 'BHIM', 'Amazon Pay', 'WhatsApp Pay', 'Other'].map((app) => (
              <button
                key={app}
                onClick={() => handleAppChange(app)}
                className={`p-3 rounded-lg border ${
                  upiApp === app
                    ? 'border-[--primary-500] bg-[--primary-50]'
                    : 'border-neutral-200 hover:border-[--primary-300]'
                }`}
              >
                <span className="font-medium text-sm">{app}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Failure Reason Selection */}
      {transactionStatus === 'failed' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">What error message did you receive?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleReasonChange('insufficient_funds')}
              className={`p-4 rounded-lg border text-left ${
                failureReason === 'insufficient_funds'
                  ? 'border-[--primary-500] bg-[--primary-50]'
                  : 'border-neutral-200 hover:border-[--primary-300]'
              }`}
            >
              <span className="font-medium">Insufficient Funds</span>
              <p className="text-xs text-neutral-500 mt-1">Your bank account doesn't have enough balance</p>
            </button>
            
            <button
              onClick={() => handleReasonChange('bank_server')}
              className={`p-4 rounded-lg border text-left ${
                failureReason === 'bank_server'
                  ? 'border-[--primary-500] bg-[--primary-50]'
                  : 'border-neutral-200 hover:border-[--primary-300]'
              }`}
            >
              <span className="font-medium">Bank Server Down</span>
              <p className="text-xs text-neutral-500 mt-1">Bank server is busy or temporarily unavailable</p>
            </button>
            
            <button
              onClick={() => handleReasonChange('incorrect_pin')}
              className={`p-4 rounded-lg border text-left ${
                failureReason === 'incorrect_pin'
                  ? 'border-[--primary-500] bg-[--primary-50]'
                  : 'border-neutral-200 hover:border-[--primary-300]'
              }`}
            >
              <span className="font-medium">Incorrect UPI PIN</span>
              <p className="text-xs text-neutral-500 mt-1">You entered the wrong UPI PIN</p>
            </button>
            
            <button
              onClick={() => handleReasonChange('limit_exceeded')}
              className={`p-4 rounded-lg border text-left ${
                failureReason === 'limit_exceeded'
                  ? 'border-[--primary-500] bg-[--primary-50]'
                  : 'border-neutral-200 hover:border-[--primary-300]'
              }`}
            >
              <span className="font-medium">Transaction Limit Exceeded</span>
              <p className="text-xs text-neutral-500 mt-1">You've exceeded your daily/monthly transaction limit</p>
            </button>
            
            <button
              onClick={() => handleReasonChange('technical_error')}
              className={`p-4 rounded-lg border text-left ${
                failureReason === 'technical_error'
                  ? 'border-[--primary-500] bg-[--primary-50]'
                  : 'border-neutral-200 hover:border-[--primary-300]'
              }`}
            >
              <span className="font-medium">Technical Error</span>
              <p className="text-xs text-neutral-500 mt-1">Generic technical error or timeout</p>
            </button>
            
            <button
              onClick={() => handleReasonChange('beneficiary_issue')}
              className={`p-4 rounded-lg border text-left ${
                failureReason === 'beneficiary_issue'
                  ? 'border-[--primary-500] bg-[--primary-50]'
                  : 'border-neutral-200 hover:border-[--primary-300]'
              }`}
            >
              <span className="font-medium">Beneficiary Account Issue</span>
              <p className="text-xs text-neutral-500 mt-1">Recipient's UPI ID is incorrect or inactive</p>
            </button>
            
            <button
              onClick={() => handleReasonChange('app_issue')}
              className={`p-4 rounded-lg border text-left ${
                failureReason === 'app_issue'
                  ? 'border-[--primary-500] bg-[--primary-50]'
                  : 'border-neutral-200 hover:border-[--primary-300]'
              }`}
            >
              <span className="font-medium">App-Related Issue</span>
              <p className="text-xs text-neutral-500 mt-1">The UPI app crashed or has a bug</p>
            </button>
          </div>
        </div>
      )}

      {/* Pending Transaction Options */}
      {transactionStatus === 'pending' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">What's happening with your pending transaction?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleReasonChange('pending')}
              className={`p-4 rounded-lg border text-left ${
                failureReason === 'pending'
                  ? 'border-[--primary-500] bg-[--primary-50]'
                  : 'border-neutral-200 hover:border-[--primary-300]'
              }`}
            >
              <span className="font-medium">Transaction Shows as Processing</span>
              <p className="text-xs text-neutral-500 mt-1">The transaction is still being processed</p>
            </button>
            
            <button
              onClick={() => handleReasonChange('declined')}
              className={`p-4 rounded-lg border text-left ${
                failureReason === 'declined'
                  ? 'border-[--primary-500] bg-[--primary-50]'
                  : 'border-neutral-200 hover:border-[--primary-300]'
              }`}
            >
              <span className="font-medium">Payment Request Declined</span>
              <p className="text-xs text-neutral-500 mt-1">The recipient declined your payment request</p>
            </button>
            
            <button
              onClick={() => handleReasonChange('bank_server')}
              className={`p-4 rounded-lg border text-left ${
                failureReason === 'bank_server'
                  ? 'border-[--primary-500] bg-[--primary-50]'
                  : 'border-neutral-200 hover:border-[--primary-300]'
              }`}
            >
              <span className="font-medium">Money Debited But Not Credited</span>
              <p className="text-xs text-neutral-500 mt-1">Amount deducted from your account but not received by recipient</p>
            </button>
            
            <button
              onClick={() => handleReasonChange('technical_error')}
              className={`p-4 rounded-lg border text-left ${
                failureReason === 'technical_error'
                  ? 'border-[--primary-500] bg-[--primary-50]'
                  : 'border-neutral-200 hover:border-[--primary-300]'
              }`}
            >
              <span className="font-medium">App Crashed During Transaction</span>
              <p className="text-xs text-neutral-500 mt-1">The app closed unexpectedly during the payment process</p>
            </button>
          </div>
        </div>
      )}

      {/* Get Solution Button */}
      {(transactionStatus === 'failed' || transactionStatus === 'pending') && failureReason && (
        <div className="text-center mb-8">
          <button
            onClick={generateSolution}
            className="btn bg-[--primary-600] text-white hover:bg-[--primary-700] px-8 py-3"
          >
            Get Solution
          </button>
        </div>
      )}

      {/* Solution Section */}
      {showSolution && solutionSteps.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Follow these steps to resolve your issue:</h3>
          
          <div className="space-y-6">
            {solutionSteps.map((step, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center mr-4">
                  {step.icon || (index + 1)}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-neutral-900 mb-1">{step.title}</h4>
                  <p className="text-neutral-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Help Section */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <h4 className="text-lg font-medium text-neutral-900 mb-3">Still having issues?</h4>
            <p className="text-neutral-600 mb-4">
              If the above steps don't resolve your issue, you can:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs">1</span>
                </div>
                <p className="text-neutral-600">
                  Contact your bank's customer service at their toll-free number (usually found on the back of your debit card)
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs">2</span>
                </div>
                <p className="text-neutral-600">
                  Raise a complaint through your UPI app's help/support section
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs">3</span>
                </div>
                <p className="text-neutral-600">
                  File a complaint on the NPCI website (National Payments Corporation of India) at <a href="https://www.npci.org.in" target="_blank" rel="noopener noreferrer" className="text-[--primary-600] hover:underline">www.npci.org.in</a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Success Message */}
      {transactionStatus === 'success' && (
        <div className="bg-[--success-50] border border-[--success-200] rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-[--success-600]" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-[--success-800]">Your transaction was successful!</h3>
              <p className="mt-2 text-[--success-700]">
                Good news! Your UPI transaction has been completed successfully. The recipient should have received the funds.
              </p>
              <p className="mt-4 text-[--success-700]">
                If you're experiencing any other UPI-related issues, you can use this troubleshooter to resolve them.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="bg-[--primary-50] rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Common UPI Transaction Failure Reasons</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-[--primary-800] mb-2">User-Related Issues</h4>
            <ul className="list-disc list-inside text-sm text-[--primary-700] space-y-1">
              <li>Incorrect UPI PIN entered</li>
              <li>Insufficient balance in bank account</li>
              <li>Daily/monthly transaction limits exceeded</li>
              <li>Incorrect beneficiary UPI ID</li>
              <li>Unstable internet connection</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-[--primary-800] mb-2">System-Related Issues</h4>
            <ul className="list-disc list-inside text-sm text-[--primary-700] space-y-1">
              <li>Bank server downtime or maintenance</li>
              <li>UPI system technical glitches</li>
              <li>App-related bugs or outdated version</li>
              <li>Beneficiary bank account issues</li>
              <li>Network congestion during peak hours</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Frequently Asked Questions</h3>
        
        <div className="space-y-4">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">How long does it take for a failed UPI transaction to be refunded?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>According to NPCI guidelines, failed UPI transaction amounts should be refunded automatically within 5 working days. However, the actual time can vary depending on:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>The specific banks involved in the transaction</li>
                <li>The reason for the transaction failure</li>
                <li>Whether the amount was actually debited from your account</li>
              </ul>
              <p className="mt-2">In most cases, failed transactions where money was debited are reversed within 24-48 hours. If you don't receive a refund within 5 working days, you should contact your bank's customer service or raise a complaint through your UPI app.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">What information do I need when reporting a failed UPI transaction?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>When reporting a failed UPI transaction to your bank or through the UPI app, keep the following information ready:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Transaction reference number/ID (available in your UPI app's transaction history)</li>
                <li>Date and time of the transaction</li>
                <li>Amount of the transaction</li>
                <li>Recipient's UPI ID or mobile number</li>
                <li>The error message you received</li>
                <li>Screenshot of the failed transaction (if available)</li>
                <li>Your bank account details linked to UPI</li>
              </ul>
              <p className="mt-2">Having this information ready will help expedite the resolution process.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">Can I cancel a UPI transaction after it's initiated?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>No, UPI transactions cannot be canceled once they are initiated and you've entered your UPI PIN. UPI transfers are designed to be instant and irreversible.</p>
              <p className="mt-2">However, there are two exceptions:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Payment requests:</strong> If you've sent a payment request (collect request) to someone else, you can cancel it before they approve it.</li>
                <li><strong>Scheduled payments:</strong> Some UPI apps allow you to schedule payments for a future date. These can typically be canceled before the scheduled date.</li>
              </ul>
              <p className="mt-2">If you've sent money to the wrong person, you'll need to contact that person directly and request them to return the funds. There's no automatic way to reverse a completed UPI transaction.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">Is there a way to track the status of my UPI complaint?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>Yes, you can track your UPI complaint through multiple channels:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>UPI App:</strong> Most UPI apps have a complaint tracking section where you can view the status of your raised complaints.</li>
                <li><strong>Bank's Net Banking/Mobile Banking:</strong> If you've raised a complaint through your bank, you can track it through their net banking portal or mobile app.</li>
                <li><strong>Customer Care:</strong> You can call your bank's customer care with your complaint reference number to check the status.</li>
                <li><strong>NPCI Portal:</strong> For complaints raised through the NPCI website, you can track them using the reference number provided.</li>
              </ul>
              <p className="mt-2">Typically, banks are required to resolve UPI-related complaints within 10 working days as per RBI guidelines. If your complaint isn't resolved within this timeframe, you can escalate it to the banking ombudsman.</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default UpiFailureTroubleshooter;