import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FAQ {
  question: string;
  answer: string;
}

interface PAASectionProps {
  faqs?: FAQ[];
  title?: string;
}

export const PAASection: React.FC<PAASectionProps> = ({ faqs, title }) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="my-12 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-blue-500" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          {title ? t('people_also_ask_about', `People Also Ask about {{title}}`, { title }) : t('people_also_ask', 'People Also Ask')}
        </h2>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {faqs.map((faq, index) => (
          <div key={index} className="group">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors focus:outline-none"
              aria-expanded={openIndex === index}
            >
              <h3 className="text-lg font-medium text-slate-800 pr-8">
                {faq.question}
              </h3>
              <div className={`shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
