import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, Wind, Snowflake, Leaf } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const RITU_CHAKRA = [
  {
    name: 'Vasant Ritu (Spring)',
    months: 'Chaitra - Vaishakha',
    gregorian: 'Mid-March to Mid-May',
    icon: Leaf,
    color: 'from-green-400 to-emerald-500',
    characteristics: 'Pleasant weather, blooming flowers, new leaves',
    festivals: ['Holi', 'Ram Navami', 'Baisakhi', 'Akshaya Tritiya', 'Hanuman Jayanti'],
    ayurveda: 'Kapha dosha increases, light diet recommended',
    activities: 'Ideal for outdoor activities, picnics, new beginnings'
  },
  {
    name: 'Grishma Ritu (Summer)',
    months: 'Jyeshtha - Ashadha',
    gregorian: 'Mid-May to Mid-July',
    icon: Sun,
    color: 'from-yellow-400 to-orange-500',
    characteristics: 'Hot and dry weather, high temperatures',
    festivals: ['Eid-ul-Adha (may fall)', 'Rath Yatra'],
    ayurveda: 'Pitta increases, cooling foods recommended',
    activities: 'Indoor activities, early morning/evening outings'
  },
  {
    name: 'Varsha Ritu (Monsoon)',
    months: 'Shravana - Bhadrapada',
    gregorian: 'Mid-July to Mid-September',
    icon: CloudRain,
    color: 'from-blue-400 to-cyan-500',
    characteristics: 'Heavy rainfall, humid climate, greenery everywhere',
    festivals: ['Raksha Bandhan', 'Janmashtami', 'Ganesh Chaturthi', 'Onam'],
    ayurveda: 'All doshas aggravated, digestive fire low',
    activities: 'Enjoy rains, farming activities, monsoon festivals'
  },
  {
    name: 'Sharad Ritu (Autumn)',
    months: 'Ashwin - Kartik',
    gregorian: 'Mid-September to Mid-November',
    icon: Cloud,
    color: 'from-orange-400 to-amber-500',
    characteristics: 'Clear skies, pleasant temperature, post-monsoon freshness',
    festivals: ['Navratri', 'Dussehra', 'Diwali', 'Karwa Chauth', 'Chhath Puja'],
    ayurveda: 'Pitta dominant, balanced diet needed',
    activities: 'Best season for festivals, outdoor events, marriages'
  },
  {
    name: 'Hemant Ritu (Pre-Winter)',
    months: 'Margashirsha - Pausha',
    gregorian: 'Mid-November to Mid-January',
    icon: Wind,
    color: 'from-cyan-400 to-blue-500',
    characteristics: 'Cool and dry, early morning dew',
    festivals: ['Guru Nanak Jayanti', 'Christmas'],
    ayurveda: 'Kapha accumulates, warm foods recommended',
    activities: 'Pleasant for travel, outdoor sports'
  },
  {
    name: 'Shishir Ritu (Winter)',
    months: 'Magha - Phalguna',
    gregorian: 'Mid-January to Mid-March',
    icon: Snowflake,
    color: 'from-indigo-400 to-purple-500',
    characteristics: 'Cold weather, foggy mornings, peak winter',
    festivals: ['Lohri', 'Makar Sankranti', 'Republic Day', 'Maha Shivaratri'],
    ayurveda: 'Vata and Kapha present, warming foods needed',
    activities: 'Ideal for weddings, religious ceremonies'
  }
];

const IndianSeasonCalendar: React.FC = () => {
  const [selectedRitu, setSelectedRitu] = useState(0);

  const currentRitu = RITU_CHAKRA[selectedRitu];
  const Icon = currentRitu.icon;

  return (
    <>
      <SEOHelmet
        title="Indian Season Calendar 2025 - Ritu Chakra Guide | Six Seasons of India Hindu Calendar Vasant Grishma Varsha"
        description="Complete guide to 6 seasons (Ritu Chakra) in Indian Hindu calendar. Vasant, Grishma, Varsha, Sharad, Hemant, Shishir - characteristics, festivals, Ayurveda tips for each season. Plan festivals according to traditional Indian seasonal calendar."
        keywords="indian season calendar, ritu chakra, 6 seasons india, vasant ritu, sharad ritu, varsha season, hindu seasonal calendar, indian seasons festivals, ayurveda seasons, seasonal planning india"
        canonicalUrl="https://moneycal.in/festival-tools/indian-season-calendar"
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Sun className="w-20 h-20 text-orange-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
              🌸 Indian Season Calendar - Ritu Chakra
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Discover the 6 Seasons of India - Festivals, Weather & Ayurvedic Guidelines
            </p>
          </motion.div>

          {/* Season Selector */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {RITU_CHAKRA.map((ritu, idx) => {
              const RituIcon = ritu.icon;
              return (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedRitu(idx)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedRitu === idx
                      ? `bg-gradient-to-br ${ritu.color} text-white border-transparent shadow-xl`
                      : 'bg-white border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <RituIcon className={`w-12 h-12 mx-auto mb-3 ${selectedRitu === idx ? 'text-white' : 'text-gray-600'}`} />
                  <h3 className={`font-bold text-sm ${selectedRitu === idx ? 'text-white' : 'text-gray-900'}`}>
                    {ritu.name.split(' ')[0]}
                  </h3>
                </motion.button>
              );
            })}
          </div>

          {/* Selected Season Details */}
          <motion.div
            key={selectedRitu}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br ${currentRitu.color} rounded-3xl shadow-2xl p-12 text-white mb-12`}
          >
            <div className="text-center mb-8">
              <Icon className="w-24 h-24 mx-auto mb-6" />
              <h2 className="text-4xl font-black mb-4">{currentRitu.name}</h2>
              <p className="text-xl mb-2">{currentRitu.months}</p>
              <p className="text-lg opacity-90">{currentRitu.gregorian}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 backdrop-blur rounded-xl p-6">
                <h4 className="font-bold text-lg mb-3">🌤️ Characteristics</h4>
                <p className="text-sm">{currentRitu.characteristics}</p>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl p-6">
                <h4 className="font-bold text-lg mb-3">🎊 Festivals</h4>
                <ul className="text-sm space-y-1">
                  {currentRitu.festivals.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl p-6">
                <h4 className="font-bold text-lg mb-3">🌿 Ayurveda Tips</h4>
                <p className="text-sm">{currentRitu.ayurveda}</p>
              </div>
            </div>

            <div className="mt-6 bg-white/20 backdrop-blur rounded-xl p-6">
              <h4 className="font-bold text-lg mb-2">🎯 Recommended Activities</h4>
              <p className="text-sm">{currentRitu.activities}</p>
            </div>
          </motion.div>

          {/* SEO Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 prose prose-lg max-w-none">
            <h2>Complete Guide to Indian Seasons (Ritu Chakra) - Traditional Hindu Calendar</h2>
            <p>
              Unlike the Western four-season system, India traditionally follows the <strong>Ritu Chakra</strong> with six distinct seasons. This ancient wisdom is deeply connected to festivals, agriculture, and Ayurvedic health practices.
            </p>

            <h3>The Six Seasons of India Explained</h3>
            <ol>
              <li><strong>Vasant (Spring):</strong> Blooming season with pleasant weather, Holi celebrations</li>
              <li><strong>Grishma (Summer):</strong> Hot and dry, pre-monsoon heat</li>
              <li><strong>Varsha (Monsoon):</strong> Heavy rains, Janmashtami and Ganesh Chaturthi</li>
              <li><strong>Sharad (Autumn):</strong> Post-monsoon clarity, Navratri and Diwali</li>
              <li><strong>Hemant (Pre-Winter):</strong> Cool and pleasant</li>
              <li><strong>Shishir (Winter):</strong> Cold season, Makar Sankranti</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndianSeasonCalendar;

