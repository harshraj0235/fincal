import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Calendar, CheckCircle, XCircle, Download, Filter } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface Festival {
  id: string;
  name: string;
  date: string;
  type: string;
  duration: number;
  importance: 'high' | 'medium' | 'low';
}

const FESTIVALS_2025: Festival[] = [
  { id: '1', name: 'Lohri', date: '2025-01-13', type: 'Regional', duration: 1, importance: 'medium' },
  { id: '2', name: 'Makar Sankranti / Pongal', date: '2025-01-14', type: 'Major', duration: 4, importance: 'high' },
  { id: '3', name: 'Republic Day', date: '2025-01-26', type: 'National', duration: 1, importance: 'high' },
  { id: '4', name: 'Vasant Panchami', date: '2025-02-03', type: 'Major', duration: 1, importance: 'medium' },
  { id: '5', name: 'Valentine\'s Day', date: '2025-02-14', type: 'Cultural', duration: 1, importance: 'low' },
  { id: '6', name: 'Maha Shivaratri', date: '2025-02-26', type: 'Major', duration: 1, importance: 'high' },
  { id: '7', name: 'Holi', date: '2025-03-14', type: 'Major', duration: 2, importance: 'high' },
  { id: '8', name: 'Gudi Padwa / Ugadi', date: '2025-03-30', type: 'Regional', duration: 1, importance: 'high' },
  { id: '9', name: 'Ram Navami', date: '2025-04-06', type: 'Major', duration: 1, importance: 'high' },
  { id: '10', name: 'Mahavir Jayanti', date: '2025-04-10', type: 'Jain', duration: 1, importance: 'medium' },
  { id: '11', name: 'Baisakhi / Tamil New Year', date: '2025-04-13', type: 'Regional', duration: 1, importance: 'high' },
  { id: '12', name: 'Good Friday', date: '2025-04-18', type: 'Christian', duration: 1, importance: 'high' },
  { id: '13', name: 'Easter', date: '2025-04-20', type: 'Christian', duration: 1, importance: 'high' },
  { id: '14', name: 'Akshaya Tritiya', date: '2025-04-21', type: 'Major', duration: 1, importance: 'high' },
  { id: '15', name: 'Buddha Purnima', date: '2025-05-12', type: 'Buddhist', duration: 1, importance: 'medium' },
  { id: '16', name: 'Eid-ul-Fitr', date: '2025-03-31', type: 'Islamic', duration: 3, importance: 'high' },
  { id: '17', name: 'Eid-ul-Adha', date: '2025-06-07', type: 'Islamic', duration: 3, importance: 'high' },
  { id: '18', name: 'Rath Yatra', date: '2025-06-29', type: 'Regional', duration: 1, importance: 'high' },
  { id: '19', name: 'Muharram', date: '2025-07-06', type: 'Islamic', duration: 1, importance: 'medium' },
  { id: '20', name: 'Raksha Bandhan', date: '2025-08-09', type: 'Major', duration: 1, importance: 'high' },
  { id: '21', name: 'Independence Day', date: '2025-08-15', type: 'National', duration: 1, importance: 'high' },
  { id: '22', name: 'Janmashtami', date: '2025-08-16', type: 'Major', duration: 2, importance: 'high' },
  { id: '23', name: 'Ganesh Chaturthi', date: '2025-08-27', type: 'Major', duration: 10, importance: 'high' },
  { id: '24', name: 'Onam', date: '2025-09-05', type: 'Regional', duration: 10, importance: 'high' },
  { id: '25', name: 'Navratri (Sharad)', date: '2025-09-22', type: 'Major', duration: 9, importance: 'high' },
  { id: '26', name: 'Gandhi Jayanti / Dussehra', date: '2025-10-02', type: 'National/Major', duration: 1, importance: 'high' },
  { id: '27', name: 'Karwa Chauth', date: '2025-10-12', type: 'Regional', duration: 1, importance: 'medium' },
  { id: '28', name: 'Diwali', date: '2025-10-20', type: 'Major', duration: 5, importance: 'high' },
  { id: '29', name: 'Bhai Dooj', date: '2025-10-22', type: 'Major', duration: 1, importance: 'medium' },
  { id: '30', name: 'Chhath Puja', date: '2025-11-05', type: 'Regional', duration: 4, importance: 'high' },
  { id: '31', name: 'Guru Nanak Jayanti', date: '2025-11-05', type: 'Sikh', duration: 1, importance: 'high' },
  { id: '32', name: 'Christmas', date: '2025-12-25', type: 'Christian', duration: 1, importance: 'high' }
];

const FestivalClashChecker: React.FC = () => {
  const [selectedFestivals, setSelectedFestivals] = useState<string[]>([]);
  const [checkResult, setCheckResult] = useState<{ hasClash: boolean; clashes: any[] } | null>(null);

  const toggleFestival = (id: string) => {
    if (selectedFestivals.includes(id)) {
      setSelectedFestivals(selectedFestivals.filter(f => f !== id));
    } else {
      setSelectedFestivals([...selectedFestivals, id]);
    }
  };

  const checkForClashes = () => {
    const selected = FESTIVALS_2025.filter(f => selectedFestivals.includes(f.id))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const clashes: any[] = [];

    for (let i = 0; i < selected.length - 1; i++) {
      for (let j = i + 1; j < selected.length; j++) {
        const festival1 = selected[i];
        const festival2 = selected[j];
        
        const date1Start = new Date(festival1.date);
        const date1End = new Date(date1Start.getTime() + festival1.duration * 24 * 60 * 60 * 1000);
        const date2Start = new Date(festival2.date);
        const date2End = new Date(date2Start.getTime() + festival2.duration * 24 * 60 * 60 * 1000);

        if (date1End >= date2Start && date1Start <= date2End) {
          clashes.push({
            festival1: festival1.name,
            festival2: festival2.name,
            type: 'overlap',
            daysBetween: Math.floor((date2Start.getTime() - date1Start.getTime()) / (1000 * 60 * 60 * 24))
          });
        } else {
          const gap = Math.floor((date2Start.getTime() - date1End.getTime()) / (1000 * 60 * 60 * 24));
          if (gap < 3) {
            clashes.push({
              festival1: festival1.name,
              festival2: festival2.name,
              type: 'close',
              daysBetween: gap
            });
          }
        }
      }
    }

    setCheckResult({
      hasClash: clashes.length > 0,
      clashes
    });
  };

  return (
    <>
      <SEOHelmet
        title="Festival Clash Checker 2025 India - Check Multiple Festival Dates Conflict | Event Planning Calendar Tool"
        description="Check if multiple Indian festivals clash or overlap! Plan weddings, events, and celebrations without conflicts. Festival clash checker for Diwali, Eid, Christmas, Holi & 100+ festivals. Free event planning tool to avoid date conflicts in India."
        keywords="festival clash checker india, check festival dates conflict, event date clash finder, multiple festival planner, avoid festival overlap, wedding date checker india, festival calendar conflict tool, plan multiple events india"
        canonicalUrl="https://moneycal.in/festival-tools/festival-clash-checker"
      />

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <AlertTriangle className="w-20 h-20 text-orange-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
              ⚠️ Festival Clash Checker
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Check Multiple Festival Dates for Conflicts & Overlaps - Plan Events Perfectly
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Festival Selection */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Select Festivals to Check ({selectedFestivals.length} selected)
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {FESTIVALS_2025.map(festival => (
                  <motion.div
                    key={festival.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => toggleFestival(festival.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedFestivals.includes(festival.id)
                        ? 'bg-blue-100 border-blue-500'
                        : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{festival.name}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(festival.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                          {festival.duration > 1 && ` (${festival.duration} days)`}
                        </p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedFestivals.includes(festival.id)
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-gray-300'
                      }`}>
                        {selectedFestivals.includes(festival.id) && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={checkForClashes}
                disabled={selectedFestivals.length < 2}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-bold text-xl hover:from-orange-700 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedFestivals.length < 2 ? 'Select at least 2 festivals' : 'Check for Clashes'}
              </button>
            </div>

            {/* Results */}
            {checkResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {checkResult.hasClash ? '⚠️ Clashes Found' : '✅ No Clashes'}
                </h3>

                {checkResult.clashes.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                    <p className="text-green-800 font-semibold">All festivals are well-spaced!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {checkResult.clashes.map((clash, idx) => (
                      <div key={idx} className={`p-4 rounded-xl ${
                        clash.type === 'overlap'
                          ? 'bg-red-50 border-2 border-red-300'
                          : 'bg-yellow-50 border-2 border-yellow-300'
                      }`}>
                        <div className="flex items-start gap-3">
                          {clash.type === 'overlap' ? (
                            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                          ) : (
                            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                          )}
                          <div>
                            <h4 className={`font-bold ${clash.type === 'overlap' ? 'text-red-900' : 'text-yellow-900'}`}>
                              {clash.festival1} & {clash.festival2}
                            </h4>
                            <p className={`text-sm ${clash.type === 'overlap' ? 'text-red-700' : 'text-yellow-700'}`}>
                              {clash.type === 'overlap'
                                ? 'These festivals overlap! Plan accordingly.'
                                : `Only ${clash.daysBetween} days apart - very close scheduling`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* SEO Content */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 prose prose-lg max-w-none">
            <h2>Festival Clash Checker Guide - Plan Multiple Indian Festivals & Events Without Conflicts</h2>
            <p>
              Planning a wedding during festival season? Organizing multiple events? Use our Festival Clash Checker to identify date conflicts and ensure smooth celebration planning across India.
            </p>

            <h3>How to Use Festival Clash Checker</h3>
            <ol>
              <li>Select multiple festivals you want to check (minimum 2)</li>
              <li>Click "Check for Clashes" button</li>
              <li>See instant results showing overlaps or close dates</li>
              <li>Adjust your event planning based on clash warnings</li>
              <li>Download conflict report for reference</li>
            </ol>

            <div className="bg-orange-50 p-6 rounded-xl">
              <h3>💡 Event Planning Tips</h3>
              <ul>
                <li>Avoid scheduling weddings during major festivals</li>
                <li>Leave 7+ days gap between back-to-back celebrations</li>
                <li>Consider travel and preparation time between events</li>
                <li>Check regional festivals in your state</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FestivalClashChecker;

