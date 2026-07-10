import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Brain, RotateCcw, ArrowRight, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

interface Question {
  question: string;
  questionHi: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  { question: 'What is compound interest?', questionHi: 'चक्रवृद्धि ब्याज क्या है?', options: ['Interest on principal only', 'Interest on principal + accumulated interest', 'Fixed monthly interest', 'Government bonus'], correct: 1, explanation: 'Compound interest is calculated on both the initial principal and the accumulated interest from previous periods. It\'s the "interest on interest" effect.' },
  { question: 'Which Indian index tracks the top 50 companies?', questionHi: 'कौन सा इंडेक्स टॉप 50 कंपनियों को ट्रैक करता है?', options: ['Sensex', 'Nifty 50', 'Bank Nifty', 'Nifty Next 50'], correct: 1, explanation: 'Nifty 50 tracks the top 50 companies listed on the NSE. Sensex tracks only 30 companies on BSE.' },
  { question: 'What does SIP stand for?', questionHi: 'SIP का फुल फॉर्म क्या है?', options: ['Standard Investment Plan', 'Systematic Investment Plan', 'Simple Interest Payment', 'Stock Investment Portfolio'], correct: 1, explanation: 'SIP stands for Systematic Investment Plan — a method of investing a fixed sum regularly in mutual funds.' },
  { question: 'What is the current Section 80C tax deduction limit?', questionHi: 'सेक्शन 80C की टैक्स छूट सीमा क्या है?', options: ['₹1 Lakh', '₹1.5 Lakh', '₹2 Lakh', '₹2.5 Lakh'], correct: 1, explanation: 'Under Section 80C, you can claim deductions up to ₹1.5 Lakh per year on investments like PPF, ELSS, life insurance, etc.' },
  { question: 'What is inflation?', questionHi: 'महंगाई (Inflation) क्या है?', options: ['Stock prices going up', 'General rise in prices over time', 'Bank interest rates increasing', 'GDP growth'], correct: 1, explanation: 'Inflation is the rate at which the general level of prices for goods and services rises, eroding purchasing power over time.' },
  { question: 'Which investment typically has the HIGHEST risk?', questionHi: 'किस निवेश में सबसे ज़्यादा जोखिम होता है?', options: ['Fixed Deposit', 'PPF', 'Small-cap Stocks', 'Government Bonds'], correct: 2, explanation: 'Small-cap stocks have the highest risk (and potential reward) among these options. FD, PPF, and Government Bonds are much safer.' },
  { question: 'What is the lock-in period of ELSS mutual funds?', questionHi: 'ELSS म्यूचुअल फंड का लॉक-इन पीरियड क्या है?', options: ['1 year', '3 years', '5 years', 'No lock-in'], correct: 1, explanation: 'ELSS (Equity Linked Savings Scheme) has the shortest lock-in of 3 years among all Section 80C investments.' },
  { question: 'What does P/E ratio measure?', questionHi: 'P/E रेशियो क्या मापता है?', options: ['Profit vs Expenses', 'Price vs Earnings per share', 'Principal vs EMI', 'Portfolio vs Equity'], correct: 1, explanation: 'P/E ratio = Price per share ÷ Earnings per share. A high P/E means the stock is expensive relative to its earnings.' },
  { question: 'Who regulates the Indian stock market?', questionHi: 'भारतीय शेयर बाज़ार को कौन नियंत्रित करता है?', options: ['RBI', 'SEBI', 'NABARD', 'IRDA'], correct: 1, explanation: 'SEBI (Securities and Exchange Board of India) regulates the Indian stock market. RBI regulates banking and monetary policy.' },
  { question: 'What is a Blue Chip stock?', questionHi: 'ब्लू चिप स्टॉक क्या है?', options: ['Newly listed penny stock', 'Large, well-established company stock', 'Government company stock only', 'Stock priced below ₹10'], correct: 1, explanation: 'Blue chip stocks are shares of large, well-established companies with a history of reliable performance (e.g., Reliance, TCS, HDFC).' },
  { question: 'What is the rule of 72?', questionHi: 'Rule of 72 क्या है?', options: ['Max age for investment', 'Time to double money = 72 ÷ interest rate', 'Tax-free income limit', 'Maximum SIP amount'], correct: 1, explanation: 'Rule of 72: Divide 72 by the annual interest rate to estimate how many years it takes to double your money. At 12%, money doubles in ~6 years.' },
  { question: 'What is a mutual fund NAV?', questionHi: 'म्यूचुअल फंड का NAV क्या है?', options: ['Number of Active Voters', 'Net Asset Value per unit', 'National Average Value', 'New Asset Verification'], correct: 1, explanation: 'NAV (Net Asset Value) is the per-unit market value of a mutual fund. It\'s calculated daily based on the fund\'s total assets minus liabilities.' },
  { question: 'What is CAGR?', questionHi: 'CAGR क्या है?', options: ['Current Annual Growth Report', 'Compound Annual Growth Rate', 'Corporate Assets Gain Ratio', 'Credit Assessment Grade Rating'], correct: 1, explanation: 'CAGR (Compound Annual Growth Rate) measures the mean annual growth rate of an investment over a specified period longer than one year.' },
  { question: 'What is the minimum CIBIL score for a home loan?', questionHi: 'होम लोन के लिए न्यूनतम CIBIL स्कोर क्या है?', options: ['500', '650', '750', '850'], correct: 2, explanation: 'Most banks require a minimum CIBIL score of 750+ for home loan approval. Below 700, you may face higher interest rates or rejection.' },
  { question: 'If you invest ₹10,000/month in SIP at 12% for 20 years, approximately how much will you have?', questionHi: 'अगर ₹10,000 SIP 12% पर 20 साल करें तो कितना मिलेगा?', options: ['₹24 Lakh', '₹50 Lakh', '₹1 Crore', '₹2 Crore'], correct: 2, explanation: 'At 12% CAGR, ₹10,000/month SIP for 20 years grows to approximately ₹1 Crore. Total investment: ₹24L, wealth gained: ₹76L from compounding!' },
];

const prizeAmounts = [
  '₹1,000', '₹2,000', '₹3,000', '₹5,000', '₹10,000', '₹20,000', '₹40,000',
  '₹80,000', '₹1,60,000', '₹3,20,000', '₹6,40,000', '₹12,50,000', '₹25,00,000', '₹50,00,000', '₹7,00,00,000'
];

const MillionaireQuiz: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = useCallback((optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    const correct = optionIndex === questions[currentQ].correct;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
    setShowExplanation(true);
  }, [currentQ, selected]);

  const nextQuestion = () => {
    if (currentQ >= questions.length - 1 || (!isCorrect && isCorrect !== null)) {
      setGameOver(true);
    } else {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setIsCorrect(null);
      setHiddenOptions([]);
      setShowExplanation(false);
    }
  };

  const useFiftyFifty = () => {
    if (usedFiftyFifty) return;
    setUsedFiftyFifty(true);
    const correct = questions[currentQ].correct;
    const wrong = [0, 1, 2, 3].filter(i => i !== correct);
    const toHide = wrong.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenOptions(toHide);
  };

  const resetGame = () => {
    setCurrentQ(0); setSelected(null); setIsCorrect(null);
    setScore(0); setGameOver(false); setUsedFiftyFifty(false);
    setHiddenOptions([]); setShowExplanation(false);
  };

  const q = questions[currentQ];
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-20 pb-16">
      <Helmet>
        <title>Finance Millionaire Quiz - Test Your Money IQ | MoneyCal</title>
        <meta name="description" content="Play the Finance Millionaire Quiz! Answer 15 money questions to win ₹7 Crore. Test your knowledge on investing, taxation, banking & more." />
        <link rel="canonical" href="https://moneycal.in/games/millionaire-quiz" />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-6">
          <Link to="/games" className="inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-800 mb-3 font-medium">← Back to Games</Link>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">🧠 Finance Millionaire Quiz</h1>
          <p className="text-slate-600">15 सवालों में बनो करोड़पति! | Answer 15 questions to win ₹7 Crore!</p>
        </div>

        {!gameOver ? (
          <>
            {/* Prize Ladder */}
            <div className="bg-slate-900 rounded-2xl p-4 mb-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {prizeAmounts.map((prize, idx) => (
                  <span key={idx} className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    idx === currentQ ? 'bg-amber-500 text-white scale-110' :
                    idx < currentQ ? 'bg-green-600/30 text-green-400' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {prize}
                  </span>
                ))}
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden mb-4">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4">
                <p className="text-white/80 text-sm">Question {currentQ + 1} of {questions.length} — For {prizeAmounts[currentQ]}</p>
                <h2 className="text-lg font-black text-white">{q.question}</h2>
                <p className="text-sm text-white/70">{q.questionHi}</p>
              </div>
              <div className="p-6">
                {/* Lifeline */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={useFiftyFifty}
                    disabled={usedFiftyFifty || selected !== null}
                    className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                      usedFiftyFifty ? 'border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed' : 'border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100'
                    }`}
                  >
                    50:50 {usedFiftyFifty ? '(Used)' : ''}
                  </button>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map((option, idx) => {
                    if (hiddenOptions.includes(idx)) return null;
                    const isSelected = selected === idx;
                    const isAnswer = idx === q.correct;
                    let style = 'border-slate-200 hover:border-amber-400 hover:bg-amber-50';
                    if (selected !== null) {
                      if (isAnswer) style = 'border-green-500 bg-green-50';
                      else if (isSelected && !isAnswer) style = 'border-red-500 bg-red-50';
                      else style = 'border-slate-200 opacity-50';
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={selected !== null}
                        className={`flex items-center gap-3 px-5 py-4 rounded-2xl border-2 text-left transition-all ${style}`}
                      >
                        <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-black text-slate-700 flex-shrink-0">
                          {optionLabels[idx]}
                        </span>
                        <span className="font-medium text-slate-800">{option}</span>
                        {selected !== null && isAnswer && <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto flex-shrink-0" />}
                        {selected !== null && isSelected && !isAnswer && <XCircle className="w-5 h-5 text-red-600 ml-auto flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showExplanation && (
                  <div className={`mt-4 p-4 rounded-xl border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <p className={`font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {isCorrect ? '✅ Correct!' : '❌ Wrong!'}
                    </p>
                    <p className="text-sm text-slate-700 mt-1">{q.explanation}</p>
                    <button onClick={nextQuestion} className="mt-3 px-6 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800">
                      {isCorrect ? 'Next Question →' : 'See Results'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Results */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-10 text-center">
              <p className="text-6xl mb-4">{score >= 12 ? '🏆' : score >= 8 ? '⭐' : score >= 5 ? '👍' : '📚'}</p>
              <h2 className="text-3xl font-black text-white mb-2">
                {score >= 12 ? 'Financial Genius!' : score >= 8 ? 'Smart Investor!' : score >= 5 ? 'Learning Fast!' : 'Keep Learning!'}
              </h2>
              <p className="text-5xl font-black text-white mt-4">{score}/{questions.length}</p>
              <p className="text-amber-200 mt-2">Won: {prizeAmounts[Math.max(0, score - 1)] || '₹0'}</p>
            </div>
            <div className="p-8 flex gap-3">
              <button onClick={resetGame} className="flex-1 flex items-center justify-center gap-2 bg-amber-600 text-white font-bold py-3 rounded-2xl hover:bg-amber-700">
                <RotateCcw className="w-5 h-5" /> Play Again
              </button>
              <Link to="/games" className="flex-1 flex items-center justify-center gap-2 bg-slate-200 text-slate-800 font-bold py-3 rounded-2xl hover:bg-slate-300">
                More Games <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MillionaireQuiz;
