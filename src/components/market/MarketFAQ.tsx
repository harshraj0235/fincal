import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface FAQItem {
    question: string;
    answer: string;
}

interface MarketFAQProps {
    items: FAQItem[];
    title?: string;
}

export const MarketFAQ: React.FC<MarketFAQProps> = ({ items, title = "Frequently Asked Questions" }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-black text-gray-900 mb-8">{title}</h2>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex justify-between items-center text-left py-4 focus:outline-none group"
                        >
                            <span className="text-lg font-bold text-gray-800 group-hover:text-amber-600 transition-colors">{item.question}</span>
                            {openIndex === index ? (
                                <ChevronUp className="w-5 h-5 text-amber-500" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-amber-400" />
                            )}
                        </button>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-4 text-gray-600 leading-relaxed text-base space-y-4">
                                        {item.answer.split('\n\n').map((paragraph, i) => (
                                            <p key={i}>{paragraph}</p>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* JSON-LD Schema for FAQ */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": items.map(item => ({
                        "@type": "Question",
                        "name": item.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": item.answer
                        }
                    }))
                })}
            </script>
        </div>
    );
};
