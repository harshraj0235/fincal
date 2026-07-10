import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Rocket, Trophy, ArrowRight, Info, Play, RotateCcw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const AVERAGE_INDIAN_SIP = 5000;
const AVERAGE_INDIAN_RETURN = 8; // FD/Traditional returns

const TARGET_AMOUNT = 10000000; // 1 Crore

const CompoundRace: React.FC = () => {
  const [monthlySip, setMonthlySip] = useState<number>(10000);
  const [returnRate, setReturnRate] = useState<number>(12);
  const [isRacing, setIsRacing] = useState(false);
  const [currentYear, setCurrentYear] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [raceComplete, setRaceComplete] = useState(false);

  // Calculate total years needed to reach target
  const getYearsToTarget = (sip: number, rate: number) => {
    const monthlyRate = rate / 12 / 100;
    let months = 0;
    let balance = 0;
    while (balance < TARGET_AMOUNT && months < 600) { // Max 50 years
      balance = (balance + sip) * (1 + monthlyRate);
      months++;
    }
    return months / 12;
  };

  const myYears = getYearsToTarget(monthlySip, returnRate);
  const avgYears = getYearsToTarget(AVERAGE_INDIAN_SIP, AVERAGE_INDIAN_RETURN);
  
  const generateData = (yearLimit: number) => {
    const data = [];
    const myMonthlyRate = returnRate / 12 / 100;
    const avgMonthlyRate = AVERAGE_INDIAN_RETURN / 12 / 100;
    
    let myBalance = 0;
    let avgBalance = 0;
    
    for (let y = 0; y <= yearLimit; y++) {
      data.push({
        year: `Year ${y}`,
        you: Math.round(myBalance),
        average: Math.round(avgBalance),
        target: TARGET_AMOUNT
      });
      
      // Add 12 months
      for (let m = 0; m < 12; m++) {
        myBalance = (myBalance + monthlySip) * (1 + myMonthlyRate);
        avgBalance = (avgBalance + AVERAGE_INDIAN_SIP) * (1 + avgMonthlyRate);
      }
    }
    return data;
  };

  useEffect(() => {
    if (isRacing && !raceComplete) {
      const totalYearsToAnimate = Math.max(Math.ceil(myYears), Math.ceil(avgYears));
      if (currentYear <= totalYearsToAnimate) {
        const timer = setTimeout(() => {
          setChartData(generateData(currentYear));
          setCurrentYear(prev => prev + 1);
        }, 150); // Animation speed
        return () => clearTimeout(timer);
      } else {
        setRaceComplete(true);
      }
    }
  }, [isRacing, currentYear, raceComplete, myYears, avgYears]);

  const startRace = () => {
    setIsRacing(true);
    setRaceComplete(false);
    setCurrentYear(0);
    setChartData([]);
  };

  const resetRace = () => {
    setIsRacing(false);
    setRaceComplete(false);
    setCurrentYear(0);
    setChartData([]);
  };

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pt-20 pb-16">
      <Helmet>
        <title>Compound Interest Race to ₹1 Crore | MoneyCal Games</title>
        <meta name="description" content="Race to ₹1 Crore! See how your SIP amount and returns compare to the average Indian in this interactive compound interest visualization game." />
        <link rel="canonical" href="https://moneycal.in/games/compound-race" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <Link to="/games" className="inline-flex items-center gap-1 text-sm text-pink-600 hover:text-pink-800 mb-3 font-medium">← Back to Games</Link>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">🚀 Race to ₹1 Crore</h1>
          <p className="text-slate-600">See the magic of compounding in action! Can you beat the average?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Controls */}
          <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200 p-6 shadow-lg">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-pink-500" /> Your Strategy
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                  Monthly SIP <span className="font-bold text-pink-600">₹{monthlySip.toLocaleString('en-IN')}</span>
                </label>
                <input 
                  type="range" min="1000" max="100000" step="1000"
                  value={monthlySip} onChange={(e) => setMonthlySip(Number(e.target.value))}
                  disabled={isRacing}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                  Expected Return <span className="font-bold text-pink-600">{returnRate}%</span>
                </label>
                <input 
                  type="range" min="5" max="30" step="1"
                  value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))}
                  disabled={isRacing}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-xs text-slate-500 font-bold mb-1">THE COMPETITION</p>
                <p className="text-sm font-medium text-slate-700">Average Indian Saver</p>
                <p className="text-xs text-slate-500 mt-1">SIP: ₹5,000/mo | Returns: 8% (FD/Bank)</p>
              </div>

              {!isRacing || raceComplete ? (
                <button 
                  onClick={isRacing ? resetRace : startRace}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold py-3 rounded-xl hover:from-pink-600 hover:to-rose-700 shadow-md transition-all"
                >
                  {isRacing ? <><RotateCcw className="w-5 h-5" /> Reset Race</> : <><Play className="w-5 h-5" /> Start Race!</>}
                </button>
              ) : (
                <button disabled className="w-full bg-slate-200 text-slate-500 font-bold py-3 rounded-xl flex justify-center items-center gap-2">
                  Racing... <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                </button>
              )}
            </div>
          </div>

          {/* Race Track / Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-lg flex flex-col">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm font-bold text-pink-600">YOU (₹1 Cr in)</p>
                <p className="text-3xl font-black text-slate-900">{myYears.toFixed(1)} <span className="text-base text-slate-500">Yrs</span></p>
              </div>
              <div className="text-center">
                <Trophy className={`w-10 h-10 ${myYears < avgYears ? 'text-pink-500' : 'text-slate-300'}`} />
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-500">AVERAGE (₹1 Cr in)</p>
                <p className="text-3xl font-black text-slate-900">{avgYears.toFixed(1)} <span className="text-base text-slate-500">Yrs</span></p>
              </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 min-h-[300px] w-full relative">
              {!isRacing && !raceComplete ? (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50/50 rounded-xl z-10">
                  <div className="text-center">
                    <Rocket className="w-16 h-16 text-pink-200 mx-auto mb-2" />
                    <p className="font-bold text-slate-400">Set your strategy and click Start!</p>
                  </div>
                </div>
              ) : null}
              
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorYou" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" tick={{fontSize: 12}} stroke="#cbd5e1" />
                  <YAxis tickFormatter={(val) => formatCurrency(val)} tick={{fontSize: 12}} stroke="#cbd5e1" />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <ReferenceLine y={TARGET_AMOUNT} label={{ position: 'top', value: '₹1 Crore Goal', fill: '#10b981', fontSize: 12, fontWeight: 'bold' }} stroke="#10b981" strokeDasharray="3 3" />
                  
                  <Area type="monotone" dataKey="you" name="Your Strategy" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorYou)" />
                  <Area type="monotone" dataKey="average" name="Average Saver" stroke="#94a3b8" strokeWidth={3} fillOpacity={1} fill="url(#colorAvg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            {/* Realization Banner */}
            {raceComplete && (
              <div className={`mt-6 p-4 rounded-xl border ${myYears < avgYears ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-start gap-3">
                  <Info className={`w-5 h-5 shrink-0 mt-0.5 ${myYears < avgYears ? 'text-green-600' : 'text-red-600'}`} />
                  <div>
                    <p className={`font-bold ${myYears < avgYears ? 'text-green-800' : 'text-red-800'}`}>
                      {myYears < avgYears ? 'You beat the average! 🎉' : 'You are slower than average! 📉'}
                    </p>
                    <p className="text-sm text-slate-700 mt-1">
                      By saving ₹{monthlySip.toLocaleString('en-IN')}/mo at {returnRate}%, you save <strong>{Math.abs(avgYears - myYears).toFixed(1)} years</strong> of your life compared to the average Indian saver. That's the power of compounding!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundRace;
