import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, Shield, Gavel, DollarSign } from 'lucide-react';

interface DisclaimerProps {
  type?: 'general' | 'investment' | 'tax' | 'loan' | 'insurance' | 'all';
  compact?: boolean;
  showLegal?: boolean;
}

const YMYLDisclaimer: React.FC<DisclaimerProps> = ({
  type = 'all',
  compact = false,
  showLegal = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(!compact);

  const disclaimers = {
    general: {
      title: 'General Disclaimer',
      icon: AlertTriangle,
      content:
        'MoneyCal India is an informational platform providing financial calculators and educational content. We do not provide financial advice, and the content on this site should not be considered as such. Always consult with a qualified financial advisor before making investment or financial decisions.',
    },
    investment: {
      title: 'Investment Disclaimer',
      icon: DollarSign,
      content:
        'The investment information provided is for educational purposes only. Past performance is not indicative of future results. All investments carry risk, including potential loss of principal. Before investing, understand the risks and consult a registered investment advisor. MoneyCal India does not guarantee returns or outcomes.',
    },
    tax: {
      title: 'Tax Disclaimer',
      icon: Gavel,
      content:
        'Tax laws are complex and subject to change. The tax information provided is general in nature and may not reflect your specific tax situation. We strongly recommend consulting with a qualified tax professional or CA (Chartered Accountant) before making tax-related decisions. MoneyCal India is not responsible for tax consequences of actions taken based on this information.',
    },
    loan: {
      title: 'Loan & Credit Disclaimer',
      icon: DollarSign,
      content:
        'Loan terms, interest rates, and eligibility vary by lender and borrower profile. The calculations provided are estimates based on typical market conditions and may not reflect actual loan offers. Always verify details with the lender before applying. MoneyCal India does not guarantee loan approval or specific terms.',
    },
    insurance: {
      title: 'Insurance Disclaimer',
      icon: Shield,
      content:
        'Insurance products vary significantly by provider, policy type, and coverage terms. The information provided is educational and should not be considered as insurance advice. Always review policy documents carefully and consult with an insurance advisor for personalized recommendations.',
    },
  };

  const getRelevantDisclaimers = () => {
    if (type === 'all') {
      return Object.values(disclaimers);
    }
    return [disclaimers[type as keyof typeof disclaimers]];
  };

  const relevantDisclaimers = getRelevantDisclaimers();

  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-red-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-red-600" size={24} />
          <div className="text-left">
            <h3 className="font-bold text-red-900">Important Disclaimers</h3>
            <p className="text-xs text-red-700">Please read before using our tools</p>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-red-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="border-t-2 border-red-200 p-4 space-y-4 bg-white">
          {relevantDisclaimers.map((disclaimer, idx) => {
            const IconComponent = disclaimer.icon;
            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-2">
                  <IconComponent size={18} className="text-red-600" />
                  <h4 className="font-semibold text-gray-900">{disclaimer.title}</h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed ml-6">
                  {disclaimer.content}
                </p>
              </div>
            );
          })}

          {/* Legal & Compliance Notice */}
          {showLegal && (
            <div className="mt-4 pt-4 border-t border-gray-300 space-y-2">
              <div className="flex items-center gap-2">
                <Gavel size={18} className="text-blue-600" />
                <h4 className="font-semibold text-gray-900">Legal & Regulatory Notice</h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed ml-6">
                MoneyCal India operates in accordance with applicable Indian laws and regulations. We comply with:
                <ul className="list-disc ml-4 mt-2 space-y-1">
                  <li>Reserve Bank of India (RBI) Guidelines</li>
                  <li>Securities and Exchange Board of India (SEBI) Regulations</li>
                  <li>Income Tax Department of India Rules</li>
                  <li>Insurance Regulatory and Development Authority (IRDA) Standards</li>
                  <li>Ministry of Corporate Affairs Guidelines</li>
                </ul>
              </p>
            </div>
          )}

          {/* Limitation of Liability */}
          <div className="mt-4 pt-4 border-t border-gray-300 bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong>Limitation of Liability:</strong> MoneyCal India, its creators, and contributors are not liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of this platform or reliance on any content. Use the tools and information at your own discretion and risk.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default YMYLDisclaimer;
