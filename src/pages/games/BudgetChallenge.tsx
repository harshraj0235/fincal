import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Target, ArrowRight, RotateCcw, Heart, TrendingUp, AlertTriangle, CheckCircle2, XCircle, Home, ShoppingCart, Zap, PiggyBank, CreditCard, Briefcase, ChevronRight } from 'lucide-react';

interface MonthEvent {
  title: string;
  titleHi: string;
  description: string;
  type: 'expense' | 'investment' | 'emergency' | 'bonus';
  options: { label: string; amount: number; impact: string }[];
}

const SALARY = 50000;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const monthEvents: MonthEvent[] = [
  { title: 'Rent Decision', titleHi: 'किराये का फैसला', description: 'Choose your living situation for the year.', type: 'expense', options: [
    { label: '🏠 Shared Room (₹8,000/mo)', amount: 8000, impact: 'Smart saving! Shared living cuts costs.' },
    { label: '🏢 1BHK Alone (₹15,000/mo)', amount: 15000, impact: 'Comfortable but costly. Less savings.' },
    { label: '🏡 2BHK Premium (₹25,000/mo)', amount: 25000, impact: 'Premium living eats most of your salary!' },
  ]},
  { title: 'Festival Shopping', titleHi: 'त्योहारी शॉपिंग', description: 'Diwali is coming! How much will you spend?', type: 'expense', options: [
    { label: '🪔 Minimal (₹2,000)', amount: 2000, impact: 'Wise! Small celebrations, big savings.' },
    { label: '🎆 Moderate (₹8,000)', amount: 8000, impact: 'Balanced approach. Family is happy.' },
    { label: '💥 Grand (₹20,000)', amount: 20000, impact: 'Massive spending! Your wallet is crying.' },
  ]},
  { title: 'Medical Emergency!', titleHi: 'मेडिकल इमरजेंसी!', description: 'You fell sick. Hospital bills are pending.', type: 'emergency', options: [
    { label: '💊 Govt Hospital (₹3,000)', amount: 3000, impact: 'Smart choice. Government hospitals save money.' },
    { label: '🏥 Private Clinic (₹12,000)', amount: 12000, impact: 'Better care but significant expense.' },
    { label: '🚑 Premium Hospital (₹30,000)', amount: 30000, impact: 'Top care but devastating to your budget!' },
  ]},
  { title: 'Investment Opportunity', titleHi: 'निवेश का मौका', description: 'Start a SIP or save in FD?', type: 'investment', options: [
    { label: '📈 SIP ₹5,000/mo (12% returns)', amount: -5000, impact: 'Excellent! SIP will grow to ₹63,000+ in a year.' },
    { label: '🏦 FD ₹10,000 (7% returns)', amount: -10000, impact: 'Safe but lower growth. FD gives guaranteed returns.' },
    { label: '❌ Skip investing', amount: 0, impact: 'Missed opportunity! Inflation is eating your savings.' },
  ]},
  { title: 'Smartphone Temptation', titleHi: 'नया फोन का लालच', description: 'New iPhone launched! Your old phone works fine.', type: 'expense', options: [
    { label: '📱 Keep Old Phone (₹0)', amount: 0, impact: 'Smart! Your old phone works perfectly fine.' },
    { label: '📱 Mid-range (₹15,000)', amount: 15000, impact: 'Reasonable upgrade. Good value for money.' },
    { label: '📱 Latest iPhone (₹80,000 EMI)', amount: 80000, impact: 'Huge EMI burden! Status over savings.' },
  ]},
  { title: 'Credit Card Offer', titleHi: 'क्रेडिट कार्ड ऑफर', description: 'Bank offers credit card with ₹2L limit. What do you do?', type: 'expense', options: [
    { label: '🚫 Decline the offer', amount: 0, impact: 'Wise! No temptation to overspend.' },
    { label: '💳 Accept, use wisely (₹5,000/mo)', amount: 5000, impact: 'Good discipline. Building credit score.' },
    { label: '💳 Max it out! (₹40,000)', amount: 40000, impact: 'Danger! 36% interest will trap you in debt.' },
  ]},
  { title: 'Car vs Public Transport', titleHi: 'गाड़ी या बस?', description: 'Your commute needs a decision.', type: 'expense', options: [
    { label: '🚌 Metro/Bus Pass (₹1,500/mo)', amount: 1500, impact: 'Cheapest option. Eco-friendly too!' },
    { label: '🛵 Second-hand Scooter (₹45,000)', amount: 45000, impact: 'One-time expense. Saves time daily.' },
    { label: '🚗 Car Loan EMI (₹15,000/mo)', amount: 15000, impact: 'Massive recurring expense. Think twice!' },
  ]},
  { title: 'Side Hustle Opportunity', titleHi: 'साइड इनकम का मौका', description: 'A freelance project worth ₹20,000 comes up. But it needs weekends.', type: 'bonus', options: [
    { label: '💼 Take the project (+₹20,000)', amount: -20000, impact: 'Extra income! Hard work pays off.' },
    { label: '😴 Enjoy weekends (₹0)', amount: 0, impact: 'Rest is important, but you missed extra income.' },
  ]},
  { title: 'Insurance Decision', titleHi: 'बीमा का फैसला', description: 'Should you buy health insurance?', type: 'expense', options: [
    { label: '🛡️ Basic Plan (₹500/mo)', amount: 500, impact: 'Smart! ₹5L cover for just ₹6,000/year.' },
    { label: '🛡️ Premium Plan (₹1,500/mo)', amount: 1500, impact: 'Comprehensive coverage. Peace of mind.' },
    { label: '❌ No insurance', amount: 0, impact: 'Risky! One medical emergency can wipe out savings.' },
  ]},
  { title: 'Wedding Invitation', titleHi: 'शादी का न्योता', description: 'Best friend\'s wedding! Gift and travel costs.', type: 'expense', options: [
    { label: '🎁 Simple Gift (₹2,000)', amount: 2000, impact: 'Thoughtful and budget-friendly.' },
    { label: '🎁 Good Gift + Travel (₹10,000)', amount: 10000, impact: 'Good balance of generosity and budget.' },
    { label: '🎁 Grand Gift + Destination (₹30,000)', amount: 30000, impact: 'Very generous but burns a hole in pocket!' },
  ]},
  { title: 'Year-End Bonus!', titleHi: 'साल के आखिर में बोनस!', description: 'Company gives ₹25,000 bonus. What will you do?', type: 'bonus', options: [
    { label: '💰 Save it all (-₹25,000)', amount: -25000, impact: 'Excellent discipline! Future you will thank you.' },
    { label: '🎉 Spend half, save half (₹12,500)', amount: 12500, impact: 'Balanced approach. Enjoy a little.' },
    { label: '🛍️ Splurge it all (₹25,000)', amount: 25000, impact: 'All gone! Nothing saved from the bonus.' },
  ]},
  { title: 'Skill Investment', titleHi: 'स्किल में निवेश', description: 'An online course can boost your salary by 30%.', type: 'investment', options: [
    { label: '📚 Free YouTube Learning (₹0)', amount: 0, impact: 'Free but may take longer to learn.' },
    { label: '🎓 Online Course (₹5,000)', amount: 5000, impact: 'Great investment in yourself! ROI is huge.' },
    { label: '🏫 Bootcamp (₹50,000)', amount: 50000, impact: 'Expensive but could double your salary next year.' },
  ]},
];

const BudgetChallenge: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [choices, setChoices] = useState<{month: string; choice: string; amount: number; impact: string}[]>([]);
  const [lastImpact, setLastImpact] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const totalIncome = SALARY * 12;
  const netWorth = totalIncome - totalSpent + totalInvested;

  const handleChoice = useCallback((optionIndex: number) => {
    const event = monthEvents[currentMonth];
    const option = event.options[optionIndex];
    setSelectedOption(optionIndex);

    setTimeout(() => {
      const newChoice = { month: MONTHS[currentMonth], choice: option.label, amount: option.amount, impact: option.impact };

      if (option.amount > 0) {
        setTotalSpent(prev => prev + option.amount);
      } else {
        setTotalInvested(prev => prev + Math.abs(option.amount));
      }

      setTotalSavings(prev => prev + (SALARY - (option.amount > 0 ? option.amount : 0)));
      setChoices(prev => [...prev, newChoice]);
      setLastImpact(option.impact);
      setSelectedOption(null);

      if (currentMonth >= 11) {
        setGameOver(true);
      } else {
        setCurrentMonth(prev => prev + 1);
      }
    }, 600);
  }, [currentMonth]);

  const resetGame = () => {
    setCurrentMonth(0);
    setTotalSavings(0);
    setTotalSpent(0);
    setTotalInvested(0);
    setChoices([]);
    setLastImpact('');
    setGameOver(false);
    setSelectedOption(null);
  };

  const getScoreGrade = () => {
    const savingsRate = ((totalIncome - totalSpent) / totalIncome) * 100;
    if (savingsRate >= 40) return { grade: 'A+', emoji: '🏆', title: 'Financial Genius!', titleHi: 'फाइनेंशियल जीनियस!', color: 'text-emerald-600' };
    if (savingsRate >= 25) return { grade: 'A', emoji: '⭐', title: 'Smart Saver!', titleHi: 'स्मार्ट सेवर!', color: 'text-green-600' };
    if (savingsRate >= 15) return { grade: 'B', emoji: '👍', title: 'Good Start!', titleHi: 'अच्छी शुरुआत!', color: 'text-blue-600' };
    if (savingsRate >= 5) return { grade: 'C', emoji: '😬', title: 'Needs Work', titleHi: 'सुधार ज़रूरी', color: 'text-amber-600' };
    return { grade: 'D', emoji: '😱', title: 'Broke!', titleHi: 'कंगाल!', color: 'text-red-600' };
  };

  const event = monthEvents[currentMonth];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-20 pb-16">
      <Helmet>
        <title>Budget Challenge Game - Can You Survive 12 Months? | MoneyCal</title>
        <meta name="description" content="Play the Budget Challenge: manage ₹50,000 salary for 12 months. Handle rent, emergencies, investments & more. Free money management game!" />
        <link rel="canonical" href="https://moneycal.in/games/budget-challenge" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "WebApplication", "name": "Budget Challenge Game",
          "url": "https://moneycal.in/games/budget-challenge", "applicationCategory": "GameApplication",
          "description": "Interactive budgeting simulator game where you manage ₹50,000 salary for 12 months.",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" }
        })}</script>
      </Helmet>

      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/games" className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-800 mb-4 font-medium">
            ← Back to Games
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
            🎯 Budget Challenge
          </h1>
          <p className="text-slate-600">₹50,000 सैलरी पर 12 महीने सर्वाइव करो! | Survive 12 months on ₹50K salary!</p>
        </div>

        {/* Score Bar */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 text-center shadow-sm">
            <p className="text-xs text-slate-500 font-medium">Month</p>
            <p className="text-2xl font-black text-slate-900">{gameOver ? '12/12' : `${currentMonth + 1}/12`}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-emerald-200 text-center shadow-sm">
            <p className="text-xs text-emerald-600 font-medium">Saved</p>
            <p className="text-2xl font-black text-emerald-600">₹{(totalIncome - totalSpent - totalInvested).toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-red-200 text-center shadow-sm">
            <p className="text-xs text-red-500 font-medium">Spent</p>
            <p className="text-2xl font-black text-red-500">₹{totalSpent.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-3 mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${((gameOver ? 12 : currentMonth) / 12) * 100}%` }}
          />
        </div>

        {!gameOver ? (
          <>
            {/* Event Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden mb-6">
              <div className={`px-6 py-4 bg-gradient-to-r ${event.type === 'emergency' ? 'from-red-500 to-rose-600' : event.type === 'bonus' ? 'from-green-500 to-emerald-600' : event.type === 'investment' ? 'from-blue-500 to-indigo-600' : 'from-amber-500 to-orange-600'}`}>
                <p className="text-white/80 text-sm font-medium">{MONTHS[currentMonth]} — {event.type === 'emergency' ? '⚠️ Emergency' : event.type === 'bonus' ? '🎉 Bonus' : event.type === 'investment' ? '📈 Investment' : '💸 Decision'}</p>
                <h2 className="text-xl font-black text-white">{event.title}</h2>
                <p className="text-sm text-white/80">{event.titleHi}</p>
              </div>
              <div className="p-6">
                <p className="text-slate-600 mb-6">{event.description}</p>
                <div className="space-y-3">
                  {event.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChoice(idx)}
                      disabled={selectedOption !== null}
                      className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-300 ${
                        selectedOption === idx
                          ? 'border-emerald-500 bg-emerald-50 scale-[0.98]'
                          : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md'
                      } ${selectedOption !== null && selectedOption !== idx ? 'opacity-40' : ''}`}
                    >
                      <p className="font-bold text-slate-900">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Last Impact */}
            {lastImpact && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
                <p className="text-sm font-medium text-blue-800">💡 Last Decision: {lastImpact}</p>
              </div>
            )}
          </>
        ) : (
          /* Game Over Screen */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-10 text-center">
              <p className="text-6xl mb-4">{getScoreGrade().emoji}</p>
              <h2 className="text-3xl font-black text-white mb-2">{getScoreGrade().title}</h2>
              <p className="text-emerald-100">{getScoreGrade().titleHi}</p>
              <p className="text-5xl font-black text-white mt-4">Grade: {getScoreGrade().grade}</p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-emerald-50 rounded-2xl p-4 text-center">
                  <p className="text-sm text-emerald-700 font-medium">Total Income</p>
                  <p className="text-2xl font-black text-emerald-800">₹{totalIncome.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-red-50 rounded-2xl p-4 text-center">
                  <p className="text-sm text-red-700 font-medium">Total Spent</p>
                  <p className="text-2xl font-black text-red-800">₹{totalSpent.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-blue-50 rounded-2xl p-4 text-center">
                  <p className="text-sm text-blue-700 font-medium">Invested</p>
                  <p className="text-2xl font-black text-blue-800">₹{totalInvested.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-amber-50 rounded-2xl p-4 text-center">
                  <p className="text-sm text-amber-700 font-medium">Savings Rate</p>
                  <p className="text-2xl font-black text-amber-800">{Math.round(((totalIncome - totalSpent) / totalIncome) * 100)}%</p>
                </div>
              </div>

              {/* Decision History */}
              <h3 className="font-bold text-slate-900 mb-3">Your Decisions:</h3>
              <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
                {choices.map((c, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm bg-slate-50 rounded-xl p-3">
                    <span className="font-bold text-slate-500 w-8">{c.month.slice(0, 3)}</span>
                    <span className="text-slate-700 flex-1">{c.choice}</span>
                    <span className={c.amount > 0 ? 'text-red-600 font-bold' : 'text-emerald-600 font-bold'}>
                      {c.amount > 0 ? `-₹${c.amount.toLocaleString('en-IN')}` : c.amount < 0 ? `+₹${Math.abs(c.amount).toLocaleString('en-IN')}` : '₹0'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={resetGame} className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-3 px-6 rounded-2xl hover:bg-emerald-700 transition-colors">
                  <RotateCcw className="w-5 h-5" /> Play Again
                </button>
                <Link to="/games" className="flex-1 flex items-center justify-center gap-2 bg-slate-200 text-slate-800 font-bold py-3 px-6 rounded-2xl hover:bg-slate-300 transition-colors">
                  More Games <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* SEO FAQ */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-800">What is the Budget Challenge game?</h3>
              <p className="text-sm text-slate-600 mt-1">It's a free interactive budgeting simulator where you manage a ₹50,000 monthly salary for 12 months, making real-life financial decisions about rent, emergencies, investments, and spending.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Is this game free to play?</h3>
              <p className="text-sm text-slate-600 mt-1">Yes! Budget Challenge is completely free. No real money is used. It's designed to teach money management skills through interactive gameplay.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">What can I learn from this game?</h3>
              <p className="text-sm text-slate-600 mt-1">You'll learn budgeting basics, the importance of emergency funds, investment discipline, and how everyday spending decisions impact your long-term wealth.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetChallenge;
