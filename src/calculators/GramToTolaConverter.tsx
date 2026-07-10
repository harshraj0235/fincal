import React, { useState, useEffect } from 'react';
import { Scale, Info, History, ArrowRightLeft, Home, ChevronRight, Star, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import { CalculatorSchema } from '../components/CalculatorSchema';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';

const TOLA_TO_GRAM = 11.6638038;

const GramToTolaConverter: React.FC = () => {
    const [gram, setGram] = useState<string>('10');
    const [tola, setTola] = useState<string>((10 / TOLA_TO_GRAM).toFixed(4));
    const [activeUnit, setActiveUnit] = useState<'gram' | 'tola'>('gram');
    const [history, setHistory] = useState<{ from: string, to: string, type: string }[]>([]);

    const handleGramChange = (val: string) => {
        setGram(val);
        if (val === '' || isNaN(Number(val))) {
            setTola('');
        } else {
            setTola((Number(val) / TOLA_TO_GRAM).toFixed(8));
        }
    };

    const handleTolaChange = (val: string) => {
        setTola(val);
        if (val === '' || isNaN(Number(val))) {
            setGram('');
        } else {
            setGram((Number(val) * TOLA_TO_GRAM).toFixed(8));
        }
    };

    const addToHistory = () => {
        if (gram && tola) {
            setHistory(prev => [{
                from: activeUnit === 'gram' ? `${gram} g` : `${tola} tola`,
                to: activeUnit === 'gram' ? `${tola} tola` : `${gram} g`,
                type: activeUnit === 'gram' ? 'Gram to Tola' : 'Tola to Gram'
            }, ...prev].slice(0, 5));
        }
    };

    const contentData = {
        title: 'Gram to Tola Converter',
        description: 'Convert grams to tolas and vice versa with high precision (11.6638g). Essential for gold and jewelry transactions in India, Pakistan, and South Asia.',
        benefits: [
            'Universal 11.6638038 precision for official transactions.',
            'Instant bi-directional conversion.',
            'Supports milligram level accuracy for gold/silver.',
            'Save calculation history for quick reference.',
            'Educational context on Tola origins and regional variations.',
        ],
        howToSteps: [
            { step: 'Enter Grams', details: 'Type the weight in grams to see the equivalent in Tolas instantly.' },
            { step: 'Enter Tolas', details: 'Conversely, enter Tola values to get the weight in Grams (1 tola = 11.6638g).' },
            { step: 'Use Precision', details: 'The tool uses 8 decimal places to ensure no value is lost in precious metal conversion.' },
        ],
        examples: [
            { scenario: 'Standard Gold Coin', inputs: [{ label: 'Weight', value: '10 grams' }], result: '0.8573 Tola', explanation: 'A standard 10g coin is slightly less than 1 Tola.' },
            { scenario: '1 Tola Jewelry', inputs: [{ label: 'Weight', value: '1 Tola' }], result: '11.6638 Grams', explanation: 'The standard conversion used by jewelers in India.' },
        ],
        tips: [
            'Always verify if your local jeweler uses 11.66g or the rounded 10g (modern tola).',
            'The traditional tola is based on the weight of one Silver Rupee of the British Raj.',
        ],
        mistakes: [
            'Confusing biological grams with troy ounces or other units.',
            'Using 10g as a tola in traditional markets where 11.66g is standard.',
        ],
        faqs: [
            { question: 'How many grams is 1 tola?', answer: 'In the standard system, 1 tola is exactly 11.6638038 grams.' },
            { question: 'What is a "Modern Tola"?', answer: 'Some modern metrics round 1 tola to 10 grams for simplicity, but 11.66g remains the traditional standard.' },
        ],
        relatedCalculators: [
            { name: 'Gold Return Calculator', url: '/calculators/gold-return-calculator', description: 'Calculate ROI on gold investments' },
            { name: 'LCM and HCF Calculator', url: '/calculators/lcm-hcf-calculator', description: 'Solve math problems with steps' },
        ],
        lastUpdated: '2026-02-24',
    };

    return (
        <>
            <SEOHelmet
                title="Gram to Tola Converter: Precise Gold Weight Calculator | MoneyCal"
                description="Convert Grams to Tola and Tola to Grams with 11.6638 precision. Best for gold, silver, and jewelry weight conversion in India and South Asia."
                keywords="gram to tola converter, tola to gram, gold weight calculator, 1 tola in grams, jewellers weight converter india, precise gram to tola"
                url="/calculators/gram-to-tola-converter"
                breadcrumbs={[
                    { name: 'Home', url: '/' },
                    { name: 'Calculators', url: '/calculators' },
                    { name: 'Gram to Tola Converter', url: '/calculators/gram-to-tola-converter' }
                ]}
            />

            <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
                <div className="max-w-4xl mx-auto">
                    <nav className="flex items-center gap-2 text-sm text-neutral-600 mb-6" aria-label="Breadcrumb">
                        <Link to="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors"><Home className="h-4 w-4" /><span>Home</span></Link>
                        <ChevronRight className="h-4 w-4 flex-shrink-0 text-neutral-400" />
                        <Link to="/calculators" className="hover:text-blue-600 transition-colors">Calculators</Link>
                        <ChevronRight className="h-4 w-4 flex-shrink-0 text-neutral-400" />
                        <span className="text-neutral-900 font-medium" aria-current="page">Gram to Tola Converter</span>
                    </nav>

                    <header className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl shadow-lg mb-4">
                            <Scale className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">Gram to Tola Converter</h1>
                        <p className="text-slate-600 max-w-2xl mx-auto">Precise weight conversion for gold and precious metals. Standard 11.6638g conversion rate.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                            <div className="p-6 sm:p-8 space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Weight in Grams (g)</label>
                                        <div className="relative group">
                                            <input
                                                type="number"
                                                value={gram}
                                                onChange={(e) => {
                                                    setActiveUnit('gram');
                                                    handleGramChange(e.target.value);
                                                }}
                                                className="w-full px-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-xl font-bold focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
                                                placeholder="Enter grams..."
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">grams</div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center">
                                        <div className="p-3 bg-amber-50 rounded-full text-amber-600 animate-bounce">
                                            <ArrowRightLeft className="w-6 h-6 rotate-90" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Weight in Tolas</label>
                                        <div className="relative group">
                                            <input
                                                type="number"
                                                value={tola}
                                                onChange={(e) => {
                                                    setActiveUnit('tola');
                                                    handleTolaChange(e.target.value);
                                                }}
                                                className="w-full px-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-xl font-bold focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
                                                placeholder="Enter tolas..."
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">tola</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={addToHistory}
                                        className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95"
                                    >
                                        <History className="w-5 h-5" />
                                        Save Record
                                    </button>
                                    <button className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors shadow-sm">
                                        <Share2 className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Info className="w-5 h-5 text-amber-400" />
                                    Quick Reference
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-slate-700">
                                        <span className="text-slate-400">1 Tola</span>
                                        <span className="font-mono text-amber-400">11.6638038 g</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-slate-700">
                                        <span className="text-slate-400">10 Grams</span>
                                        <span className="font-mono text-amber-400">0.8573 Tola</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-slate-700">
                                        <span className="text-slate-400">100 Grams</span>
                                        <span className="font-mono text-amber-400">8.5735 Tola</span>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-white/5 rounded-2xl text-xs text-slate-400 leading-relaxed italic">
                                    Note: Values above use the British Standard Tola (approx. 11.66g) traditionally used in the Indian subcontinent.
                                </div>
                            </div>

                            {history.length > 0 && (
                                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <History className="w-5 h-5 text-blue-600" />
                                        Recent Conversions
                                    </h3>
                                    <div className="space-y-3">
                                        {history.map((item, i) => (
                                            <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl text-sm">
                                                <span className="font-medium text-slate-600">{item.from}</span>
                                                <ArrowRightLeft className="w-4 h-4 text-slate-300" />
                                                <span className="font-bold text-slate-900">{item.to}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <CalculatorContentWrapper {...contentData} />
                </div>
            </div>
        </>
    );
};

export default GramToTolaConverter;
