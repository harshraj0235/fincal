import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Award, Globe, Users, Rocket } from 'lucide-react';

interface WhyChooseUsProps {
  language?: 'en' | 'hi';
  compact?: boolean;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ language = 'en', compact = false }) => {
  const features = language === 'en' ? [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant calculations with real-time results',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Shield,
      title: '100% Free',
      description: 'No registration, no hidden costs, forever free',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Most Comprehensive',
      description: '100+ tools - more than any other platform',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Globe,
      title: 'Bilingual Support',
      description: 'Available in Hindi & English',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Users,
      title: 'Trusted by Millions',
      description: 'Join 1M+ users making smarter financial decisions',
      color: 'from-teal-400 to-cyan-500'
    },
    {
      icon: Rocket,
      title: 'Always Updated',
      description: 'Latest tax rates, GST slabs, and regulations',
      color: 'from-red-400 to-rose-500'
    }
  ] : [
    {
      icon: Zap,
      title: 'बिजली की तेजी से',
      description: 'वास्तविक समय परिणामों के साथ त्वरित गणना',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Shield,
      title: '100% मुफ्त',
      description: 'कोई पंजीकरण नहीं, कोई छिपी लागत नहीं, हमेशा के लिए मुफ्त',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Award,
      title: 'सबसे व्यापक',
      description: '100+ टूल्स - किसी अन्य प्लेटफ़ॉर्म से अधिक',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Globe,
      title: 'द्विभाषी समर्थन',
      description: 'हिंदी और अंग्रेजी में उपलब्ध',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Users,
      title: 'लाखों द्वारा भरोसा',
      description: '1M+ उपयोगकर्ताओं के साथ जुड़ें',
      color: 'from-teal-400 to-cyan-500'
    },
    {
      icon: Rocket,
      title: 'हमेशा अपडेट',
      description: 'नवीनतम टैक्स दरें, GST स्लैब और नियम',
      color: 'from-red-400 to-rose-500'
    }
  ];

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 my-8">
        <h3 className="text-xl font-bold text-center mb-6 text-gray-900">
          {language === 'en' ? 'Why Choose MoneyCal?' : 'MoneyCal क्यों चुनें?'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm font-semibold text-gray-900">{feature.title}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      <h2 className="text-3xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {language === 'en' ? 'Why Choose MoneyCal?' : 'MoneyCal क्यों चुनें?'}
        </span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center group"
          >
            <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
              <feature.icon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WhyChooseUs;
