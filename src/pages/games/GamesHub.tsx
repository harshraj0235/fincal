import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Gamepad2, TrendingUp, Brain, Type, Rocket, Trophy, Star, Zap, Target, ArrowRight } from 'lucide-react';

const games = [
  {
    id: 'budget-challenge',
    title: 'Budget Challenge',
    titleHi: 'बजट चैलेंज',
    description: 'Can you survive 12 months on a ₹50,000 salary? Handle rent, food, emergencies & investments!',
    descriptionHi: '₹50,000 की सैलरी पर 12 महीने बचा पाओगे? किराया, खाना, इमरजेंसी सब संभालो!',
    icon: Target,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    badge: '🔥 Most Popular',
    href: '/games/budget-challenge',
    keywords: 'budget game, budgeting simulator, money management game'
  },
  {
    id: 'stock-simulator',
    title: 'Stock Market Simulator',
    titleHi: 'शेयर बाज़ार सिम्युलेटर',
    description: 'Start with ₹10 Lakh. Buy stocks, react to market events, and grow your portfolio in 30 days!',
    descriptionHi: '₹10 लाख से शुरू करो। शेयर खरीदो, मार्केट इवेंट्स का सामना करो, 30 दिनों में पोर्टफोलियो बढ़ाओ!',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    badge: '📈 Trending',
    href: '/games/stock-simulator',
    keywords: 'stock market game, investing simulator, trading game'
  },
  {
    id: 'millionaire-quiz',
    title: 'Finance Millionaire Quiz',
    titleHi: 'फाइनेंस करोड़पति क्विज़',
    description: 'Answer 15 finance questions to win ₹7 Crore! How far can you go?',
    descriptionHi: '15 फाइनेंस सवालों के जवाब दो और जीतो ₹7 करोड़! कितना आगे जा सकते हो?',
    icon: Brain,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    badge: '🧠 Test IQ',
    href: '/games/millionaire-quiz',
    keywords: 'finance quiz, money quiz, investing quiz'
  },
  {
    id: 'finance-wordle',
    title: 'Finance Wordle',
    titleHi: 'फाइनेंस वर्डल',
    description: 'Guess the daily finance word in 6 tries! A new word every day.',
    descriptionHi: '6 मौकों में रोज़ का फाइनेंस शब्द पहचानो! हर दिन एक नया शब्द।',
    icon: Type,
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-600',
    badge: '📅 Daily',
    href: '/games/finance-wordle',
    keywords: 'finance wordle, money word game, financial puzzle'
  },
  {
    id: 'compound-race',
    title: 'Compound Interest Race',
    titleHi: 'कम्पाउंड इंटरेस्ट रेस',
    description: 'Race to ₹1 Crore! Choose your SIP, returns & time. Can you beat the average Indian?',
    descriptionHi: '₹1 करोड़ तक पहुंचने की रेस! अपनी SIP, रिटर्न और समय चुनो। क्या तुम जीत सकते हो?',
    icon: Rocket,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600',
    badge: '🏎️ Race',
    href: '/games/compound-race',
    keywords: 'compound interest game, investment race, money growth game'
  }
];

const GamesHub: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-20 pb-16">
      <Helmet>
        <title>Money Games - Free Interactive Finance Games & Quizzes | MoneyCal</title>
        <meta name="description" content="Play free interactive finance games! Budget Challenge, Stock Market Simulator, Finance Quiz, Daily Wordle & more. Learn money management while having fun." />
        <link rel="canonical" href="https://moneycal.in/games" />
        <meta property="og:title" content="Money Games - Free Interactive Finance Games | MoneyCal" />
        <meta property="og:description" content="Play free finance games: Budget Challenge, Stock Simulator, Millionaire Quiz, Finance Wordle & Compound Race." />
        <meta property="og:url" content="https://moneycal.in/games" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Money Games - Interactive Finance Games",
          "description": "Play free interactive finance games and quizzes to learn money management.",
          "url": "https://moneycal.in/games",
          "publisher": { "@type": "Organization", "name": "MoneyCal.in" }
        })}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm font-bold text-purple-700 mb-6">
            <Gamepad2 className="w-4 h-4" />
            <span>Interactive Finance Games</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
            Learn Money,{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Play Games
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Master budgeting, investing, and financial literacy through interactive games. 
            No real money needed — just your brain! 🧠
          </p>
          <p className="text-base text-slate-500 mt-3">
            पैसों की समझ गेम खेलकर सीखो। बिलकुल फ्री, बिना किसी असली पैसे के! 🎮
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {games.map((game, index) => {
            const Icon = game.icon;
            return (
              <Link
                key={game.id}
                to={game.href}
                className="group relative bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-transparent transition-all duration-500 flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badge */}
                {game.badge && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-slate-700 shadow-sm">
                    {game.badge}
                  </div>
                )}

                {/* Gradient Header */}
                <div className={`relative h-44 bg-gradient-to-br ${game.color} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full" />
                    <div className="absolute bottom-4 right-4 w-32 h-32 border-2 border-white rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white rounded-full" />
                  </div>
                  <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-16 h-16 text-white drop-shadow-lg" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all">
                    {game.title}
                  </h2>
                  <p className="text-xs font-medium text-slate-400 mb-3">{game.titleHi}</p>
                  <p className="text-sm text-slate-600 mb-4 flex-grow leading-relaxed">
                    {game.description}
                  </p>
                  <div className="flex items-center text-sm font-bold group-hover:gap-3 gap-2 transition-all">
                    <span className={game.textColor}>Play Now</span>
                    <ArrowRight className={`w-4 h-4 ${game.textColor} transform group-hover:translate-x-1 transition-transform`} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8">Why Play Money Games?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Trophy, label: 'Build Financial IQ', value: 'Learn', color: 'text-yellow-400' },
              { icon: Zap, label: 'Zero Risk', value: 'Free', color: 'text-green-400' },
              { icon: Star, label: 'Fun & Interactive', value: 'Play', color: 'text-purple-400' },
              { icon: Target, label: 'Real Scenarios', value: 'Practice', color: 'text-pink-400' },
            ].map((stat) => {
              const StatIcon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <StatIcon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cross-linking section */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Also Explore</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Calculators', href: '/calculators' },
              { label: 'Learn Finance', href: '/learn' },
              { label: 'IPO Dashboard', href: '/ipo' },
              { label: 'Gold Rate', href: '/gold-rate' },
              { label: 'Discover', href: '/discover' },
            ].map(link => (
              <Link
                key={link.label}
                to={link.href}
                className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesHub;
