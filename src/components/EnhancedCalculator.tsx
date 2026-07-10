import React, { useState } from 'react';
import { IndianRupee } from 'lucide-react';

interface EnhancedCalculatorProps {
  id: string;
  name: string;
  description: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
  relatedKeywords: string[];
  inputs: Array<{
    id: string;
    label: string;
    type: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit: string;
    description: string;
    tooltip: string;
    required: boolean;
  }>;
  onCalculate: (values: Record<string, number | string>) => Array<{
    label: string;
    value: number;
    unit: string;
    color: 'primary' | 'success' | 'neutral';
    icon: React.ReactNode;
    description: string;
  }>;
  features: Array<{
    name: string;
    description: string;
    icon: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedCalculators: Array<{
    id: string;
    name: string;
    description: string;
    url: string;
  }>;
  tips: string[];
  calculatorData: {
    formula: string;
    assumptions: string[];
    limitations: string[];
    lastUpdated: string;
  };
  extraContent?: React.ReactNode;
}

export const EnhancedCalculator: React.FC<EnhancedCalculatorProps> = ({
  relatedKeywords,
  inputs,
  onCalculate,
  features,
  faqs,
  relatedCalculators,
  tips,
  calculatorData,
  extraContent
}) => {
  const [values, setValues] = useState<Record<string, number>>(
    inputs.reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {})
  );
  const [results, setResults] = useState<any[]>([]);

  const handleInputChange = (id: string, value: number) => {
    const newValues = { ...values, [id]: value };
    setValues(newValues);
    
    // Auto-calculate when values change
    try {
      const calculatedResults = onCalculate(newValues);
      setResults(calculatedResults);
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  const handleCalculate = () => {
    try {
      const calculatedResults = onCalculate(values);
      setResults(calculatedResults);
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Calculator Inputs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Calculator</h2>
        
        <div className="space-y-4">
          {inputs.map((input) => (
            <div key={input.id} className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                {input.label}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type={input.type}
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  value={values[input.id]}
                  onChange={(e) => handleInputChange(input.id, parseFloat(e.target.value))}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <span className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">{input.unit}</span>
              </div>
              <p className="text-xs text-neutral-500">{input.description}</p>
            </div>
          ))}
          
          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
          >
            Calculate
          </button>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <div key={index} className="bg-gray-50/80 rounded-xl p-5 border border-gray-100">
                <div className="flex items-center space-x-2 mb-3">
                  {result.icon}
                  <span className="font-semibold text-gray-700">{result.label}</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {result.value.toLocaleString()}{result.unit}
                </div>
                <p className="text-sm text-neutral-600">{result.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <IndianRupee className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-neutral-900">{feature.name}</h4>
                <p className="text-sm text-neutral-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      {faqs.length > 0 && (
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group">
                <summary className="flex justify-between items-center cursor-pointer py-2">
                  <h4 className="font-medium text-neutral-900">{faq.question}</h4>
                  <span className="transition-transform duration-200 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="text-neutral-600 py-2">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      {tips.length > 0 && (
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Tips</h3>
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span className="text-blue-800">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Extra Content (e.g., charts) */}
      {extraContent && (
        <div className="w-full">{extraContent}</div>
      )}
    </div>
  );
}; 