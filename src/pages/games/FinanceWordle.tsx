import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Type, RotateCcw, ArrowRight, Share2 } from 'lucide-react';

const WORD_LIST = [
  'EQUITY', 'ASSET', 'DEBIT', 'STOCK', 'SHARE', 'BONDS', 'YIELD', 'FUNDS',
  'TRADE', 'GAINS', 'TAXES', 'AUDIT', 'LOANS', 'BANKS', 'RATES', 'SCORE',
  'RUPEE', 'MONEY', 'HEDGE', 'RATIO', 'COSTS', 'GROSS', 'FLOAT', 'NOTES',
  'DRAFT', 'CHECK', 'LEDGE', 'FOREX', 'INDEX', 'NIFTY', 'SEBI',  'TERMS',
  'BULLS', 'BEARS', 'BREAK', 'PRICE', 'VALUE', 'CHART', 'MICRO', 'MACRO',
  'SALES', 'DELTA', 'ALPHA', 'THETA', 'SIGMA', 'SPLIT', 'MERGE', 'PRIME',
  'POWER', 'CYCLE', 'PANEL', 'BASIC', 'SETUP', 'LIMIT', 'ORDER', 'SHORT',
];

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

function getDailyWord(): string {
  const startDate = new Date('2026-01-01').getTime();
  const today = new Date().setHours(0, 0, 0, 0);
  const dayIndex = Math.floor((today - startDate) / (24 * 60 * 60 * 1000));
  return WORD_LIST[Math.abs(dayIndex) % WORD_LIST.length];
}

function getLetterStatus(guess: string, target: string): ('correct' | 'present' | 'absent')[] {
  const result: ('correct' | 'present' | 'absent')[] = Array(guess.length).fill('absent');
  const targetArr = target.split('');
  const guessArr = guess.split('');
  
  // First pass: mark correct
  guessArr.forEach((letter, i) => {
    if (letter === targetArr[i]) {
      result[i] = 'correct';
      targetArr[i] = '_';
    }
  });
  
  // Second pass: mark present
  guessArr.forEach((letter, i) => {
    if (result[i] !== 'correct') {
      const idx = targetArr.indexOf(letter);
      if (idx !== -1) {
        result[i] = 'present';
        targetArr[idx] = '_';
      }
    }
  });
  
  return result;
}

const FinanceWordle: React.FC = () => {
  const target = useMemo(() => getDailyWord(), []);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [shake, setShake] = useState(false);
  const [message, setMessage] = useState('');

  const keyboardStatus = useMemo(() => {
    const status: { [key: string]: 'correct' | 'present' | 'absent' | '' } = {};
    guesses.forEach(guess => {
      const statuses = getLetterStatus(guess, target);
      guess.split('').forEach((letter, i) => {
        const currentStatus = status[letter];
        if (statuses[i] === 'correct') status[letter] = 'correct';
        else if (statuses[i] === 'present' && currentStatus !== 'correct') status[letter] = 'present';
        else if (!currentStatus) status[letter] = 'absent';
      });
    });
    return status;
  }, [guesses, target]);

  const handleKeyPress = useCallback((key: string) => {
    if (gameOver) return;
    
    if (key === 'ENTER') {
      if (currentGuess.length !== WORD_LENGTH) {
        setShake(true);
        setMessage('Word must be 5 letters!');
        setTimeout(() => { setShake(false); setMessage(''); }, 1000);
        return;
      }
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      
      if (currentGuess === target) {
        setWon(true);
        setGameOver(true);
        setMessage('🎉 Brilliant!');
      } else if (newGuesses.length >= MAX_GUESSES) {
        setGameOver(true);
        setMessage(`The word was: ${target}`);
      }
      setCurrentGuess('');
      return;
    }
    
    if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }
    
    if (currentGuess.length < WORD_LENGTH && /^[A-Z]$/.test(key)) {
      setCurrentGuess(prev => prev + key);
    }
  }, [currentGuess, gameOver, guesses, target]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleKeyPress('ENTER');
      else if (e.key === 'Backspace') handleKeyPress('BACKSPACE');
      else if (/^[a-zA-Z]$/.test(e.key)) handleKeyPress(e.key.toUpperCase());
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleKeyPress]);

  const shareResult = () => {
    const grid = guesses.map(guess => {
      return getLetterStatus(guess, target).map(s => s === 'correct' ? '🟩' : s === 'present' ? '🟨' : '⬛').join('');
    }).join('\n');
    const text = `Finance Wordle ${won ? guesses.length : 'X'}/${MAX_GUESSES}\n${grid}\nPlay at moneycal.in/games/finance-wordle`;
    navigator.clipboard.writeText(text).then(() => setMessage('Copied to clipboard! 📋'));
    setTimeout(() => setMessage(''), 2000);
  };

  const keyboard = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
  ];

  const getKeyColor = (key: string) => {
    const s = keyboardStatus[key];
    if (s === 'correct') return 'bg-green-600 text-white border-green-600';
    if (s === 'present') return 'bg-amber-500 text-white border-amber-500';
    if (s === 'absent') return 'bg-slate-400 text-white border-slate-400';
    return 'bg-slate-200 text-slate-800 border-slate-300';
  };

  const getCellColor = (status: 'correct' | 'present' | 'absent') => {
    if (status === 'correct') return 'bg-green-600 text-white border-green-600';
    if (status === 'present') return 'bg-amber-500 text-white border-amber-500';
    return 'bg-slate-500 text-white border-slate-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 pt-20 pb-16">
      <Helmet>
        <title>Finance Wordle - Daily Finance Word Game | MoneyCal</title>
        <meta name="description" content="Play Finance Wordle: guess the daily finance word in 6 tries! Learn financial vocabulary while playing. New word every day!" />
        <link rel="canonical" href="https://moneycal.in/games/finance-wordle" />
      </Helmet>

      <div className="max-w-lg mx-auto px-4">
        <div className="text-center mb-6">
          <Link to="/games" className="inline-flex items-center gap-1 text-sm text-violet-600 hover:text-violet-800 mb-3 font-medium">← Back to Games</Link>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">🔤 Finance Wordle</h1>
          <p className="text-slate-600">रोज़ एक नया फाइनेंस शब्द पहचानो! | Guess the daily finance word!</p>
        </div>

        {/* Message */}
        {message && (
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold">
              {message}
            </span>
          </div>
        )}

        {/* Grid */}
        <div className="flex flex-col items-center gap-1.5 mb-6">
          {Array.from({ length: MAX_GUESSES }).map((_, rowIdx) => {
            const isGuessed = rowIdx < guesses.length;
            const isCurrent = rowIdx === guesses.length && !gameOver;
            const word = isGuessed ? guesses[rowIdx] : isCurrent ? currentGuess : '';
            const statuses = isGuessed ? getLetterStatus(guesses[rowIdx], target) : null;

            return (
              <div key={rowIdx} className={`flex gap-1.5 ${isCurrent && shake ? 'animate-pulse' : ''}`}>
                {Array.from({ length: WORD_LENGTH }).map((_, colIdx) => {
                  const letter = word[colIdx] || '';
                  const status = statuses ? statuses[colIdx] : null;
                  return (
                    <div
                      key={colIdx}
                      className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-2xl font-black rounded-xl border-2 transition-all duration-300 ${
                        status ? getCellColor(status) :
                        letter ? 'border-slate-400 bg-white text-slate-900' :
                        'border-slate-200 bg-slate-50'
                      }`}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Game Over Actions */}
        {gameOver && (
          <div className="flex gap-3 mb-6 justify-center">
            <button onClick={shareResult} className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700">
              <Share2 className="w-5 h-5" /> Share Result
            </button>
            <Link to="/games" className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-800 font-bold rounded-2xl hover:bg-slate-300">
              More Games <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}

        {/* Keyboard */}
        <div className="flex flex-col items-center gap-1.5">
          {keyboard.map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-1">
              {row.map(key => (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className={`${key.length > 1 ? 'px-3 text-xs' : 'w-9 sm:w-10'} h-12 sm:h-14 rounded-lg font-bold border transition-all active:scale-95 ${getKeyColor(key)}`}
                >
                  {key === 'BACKSPACE' ? '⌫' : key}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Rules */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="font-bold text-slate-900 mb-3">How to Play</h2>
          <div className="space-y-2 text-sm text-slate-600">
            <p>• Guess the 5-letter finance word in 6 tries</p>
            <p>• 🟩 <span className="font-bold text-green-700">Green</span> = Correct letter, correct position</p>
            <p>• 🟨 <span className="font-bold text-amber-600">Yellow</span> = Correct letter, wrong position</p>
            <p>• ⬛ <span className="font-bold text-slate-500">Gray</span> = Letter not in the word</p>
            <p>• A new word appears every day at midnight!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceWordle;
