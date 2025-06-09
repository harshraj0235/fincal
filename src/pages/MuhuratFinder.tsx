import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Search, ChevronRight, Globe } from 'lucide-react';

export const MuhuratFinder: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedActivity, setSelectedActivity] = useState<string>('investment');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  
  // Financial activities
  const activities = [
    { id: 'investment', name: 'New Investment', nameHindi: 'नया निवेश' },
    { id: 'business', name: 'Starting Business', nameHindi: 'व्यापार शुरू करना' },
    { id: 'property', name: 'Property Purchase', nameHindi: 'संपत्ति खरीद' },
    { id: 'contract', name: 'Signing Contract', nameHindi: 'अनुबंध पर हस्ताक्षर' },
    { id: 'loan', name: 'Taking Loan', nameHindi: 'ऋण लेना' },
    { id: 'account', name: 'Opening Account', nameHindi: 'खाता खोलना' }
  ];
  
  // Sample muhurat data
  const muhuratData = {
    'investment': [
      { time: '09:15 AM - 10:30 AM', quality: 'Excellent', planet: 'Jupiter', significance: 'Growth and prosperity' },
      { time: '02:00 PM - 03:15 PM', quality: 'Good', planet: 'Sun', significance: 'Success and recognition' },
      { time: '05:30 PM - 06:45 PM', quality: 'Moderate', planet: 'Mercury', significance: 'Communication and clarity' }
    ],
    'business': [
      { time: '08:00 AM - 09:30 AM', quality: 'Excellent', planet: 'Sun', significance: 'Leadership and success' },
      { time: '11:15 AM - 12:30 PM', quality: 'Good', planet: 'Jupiter', significance: 'Growth and expansion' },
      { time: '04:00 PM - 05:15 PM', quality: 'Moderate', planet: 'Mercury', significance: 'Communication and networking' }
    ],
    'property': [
      { time: '10:15 AM - 11:30 AM', quality: 'Excellent', planet: 'Venus', significance: 'Value and appreciation' },
      { time: '01:00 PM - 02:15 PM', quality: 'Good', planet: 'Jupiter', significance: 'Growth and prosperity' },
      { time: '04:30 PM - 05:45 PM', quality: 'Moderate', planet: 'Moon', significance: 'Emotional satisfaction' }
    ],
    'contract': [
      { time: '09:30 AM - 10:45 AM', quality: 'Excellent', planet: 'Mercury', significance: 'Clear communication and terms' },
      { time: '12:15 PM - 01:30 PM', quality: 'Good', planet: 'Jupiter', significance: 'Favorable outcomes' },
      { time: '03:45 PM - 05:00 PM', quality: 'Moderate', planet: 'Venus', significance: 'Harmonious agreements' }
    ],
    'loan': [
      { time: '10:30 AM - 11:45 AM', quality: 'Excellent', planet: 'Jupiter', significance: 'Favorable terms and conditions' },
      { time: '02:15 PM - 03:30 PM', quality: 'Good', planet: 'Venus', significance: 'Ease of approval' },
      { time: '05:00 PM - 06:15 PM', quality: 'Moderate', planet: 'Mercury', significance: 'Clear understanding of terms' }
    ],
    'account': [
      { time: '09:00 AM - 10:15 AM', quality: 'Excellent', planet: 'Mercury', significance: 'Clear financial planning' },
      { time: '11:45 AM - 01:00 PM', quality: 'Good', planet: 'Jupiter', significance: 'Growth and prosperity' },
      { time: '03:30 PM - 04:45 PM', quality: 'Moderate', planet: 'Moon', significance: 'Security and stability' }
    ]
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/astro-finance-insights')} 
          className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>
            {language === 'en' ? 'Back to Astro-Finance Hub' : 'वित्तीय ज्योतिष केंद्र पर वापस जाएं'}
          </span>
        </button>
      </div>
      
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          {language === 'en' ? 'Muhurat Finder' : 'मुहूर्त खोजक'}
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          {language === 'en' 
            ? 'Find auspicious times for important financial decisions based on Vedic astrology' 
            : 'वैदिक ज्योतिष के आधार पर महत्वपूर्ण वित्तीय निर्णयों के लिए शुभ समय खोजें'}
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <button 
            onClick={() => setLanguage('en')}
            className={`inline-flex items-center px-4 py-2 rounded-lg ${
              language === 'en' 
                ? 'bg-primary-100 text-primary-800' 
                : 'bg-neutral-100 text-neutral-600'
            } hover:bg-primary-200 transition-colors`}
          >
            <Globe className="h-4 w-4 mr-2" />
            English
          </button>
          <button 
            onClick={() => setLanguage('hi')}
            className={`inline-flex items-center px-4 py-2 rounded-lg ${
              language === 'hi' 
                ? 'bg-primary-100 text-primary-800' 
                : 'bg-neutral-100 text-neutral-600'
            } hover:bg-primary-200 transition-colors`}
          >
            <Globe className="h-4 w-4 mr-2" />
            हिंदी
          </button>
        </div>
      </div>
      
      {/* Search Section */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-16">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6 text-center">
          {language === 'en' ? 'Find Auspicious Time' : 'शुभ समय खोजें'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {language === 'en' ? 'Select Date' : 'तिथि चुनें'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input pl-10"
                min={new Date().toISOString().split('T')[0]}
                max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {language === 'en' ? 'Financial Activity' : 'वित्तीय गतिविधि'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <select
                value={selectedActivity}
                onChange={(e) => setSelectedActivity(e.target.value)}
                className="input pl-10"
              >
                {activities.map(activity => (
                  <option key={activity.id} value={activity.id}>
                    {language === 'en' ? activity.name : activity.nameHindi}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center">
            {language === 'en' ? 'Find Muhurat' : 'मुहूर्त खोजें'}
            <Search className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
      
      {/* Results Section */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-16">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
          {language === 'en' 
            ? `Auspicious Times for ${activities.find(a => a.id === selectedActivity)?.name}` 
            : `${activities.find(a => a.id === selectedActivity)?.nameHindi} के लिए शुभ समय`}
        </h2>
        
        <div className="space-y-6">
          {muhuratData[selectedActivity as keyof typeof muhuratData].map((muhurat, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-lg border ${
                muhurat.quality === 'Excellent' 
                  ? 'bg-green-50 border-green-200' 
                  : muhurat.quality === 'Good' 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-yellow-50 border-yellow-200'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center mr-4 ${
                    muhurat.quality === 'Excellent' 
                      ? 'bg-green-100 text-green-700' 
                      : muhurat.quality === 'Good' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">{muhurat.time}</h3>
                    <p className={`text-sm ${
                      muhurat.quality === 'Excellent' 
                        ? 'text-green-700' 
                        : muhurat.quality === 'Good' 
                          ? 'text-blue-700' 
                          : 'text-yellow-700'
                    }`}>
                      {language === 'en' ? muhurat.quality : muhurat.quality === 'Excellent' ? 'उत्कृष्ट' : muhurat.quality === 'Good' ? 'अच्छा' : 'मध्यम'} {language === 'en' ? 'Muhurat' : 'मुहूर्त'}
                    </p>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-medium text-neutral-700 mr-2">
                      {language === 'en' ? 'Ruling Planet:' : 'शासक ग्रह:'}
                    </span>
                    <span className="text-sm text-neutral-900">
                      {language === 'en' 
                        ? muhurat.planet 
                        : muhurat.planet === 'Jupiter' 
                          ? 'बृहस्पति' 
                          : muhurat.planet === 'Sun' 
                            ? 'सूर्य' 
                            : muhurat.planet === 'Mercury' 
                              ? 'बुध' 
                              : muhurat.planet === 'Venus' 
                                ? 'शुक्र' 
                                : muhurat.planet === 'Moon' 
                                  ? 'चंद्रमा' 
                                  : muhurat.planet}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-neutral-700 mr-2">
                      {language === 'en' ? 'Significance:' : 'महत्व:'}
                    </span>
                    <span className="text-sm text-neutral-900">
                      {language === 'en' 
                        ? muhurat.significance 
                        : muhurat.significance === 'Growth and prosperity' 
                          ? 'विकास और समृद्धि' 
                          : muhurat.significance === 'Success and recognition' 
                            ? 'सफलता और मान्यता' 
                            : muhurat.significance === 'Communication and clarity' 
                              ? 'संचार और स्पष्टता' 
                              : muhurat.significance === 'Leadership and success' 
                                ? 'नेतृत्व और सफलता' 
                                : muhurat.significance === 'Value and appreciation' 
                                  ? 'मूल्य और सराहना' 
                                  : muhurat.significance}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Panchang Section */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-16">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6 text-center">
          {language === 'en' ? 'Daily Panchang' : 'दैनिक पंचांग'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-4">
              {language === 'en' ? 'Astrological Details' : 'ज्योतिषीय विवरण'}
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                <span className="font-medium text-neutral-800">
                  {language === 'en' ? 'Tithi (Lunar Day):' : 'तिथि:'}
                </span>
                <span className="text-neutral-900">
                  {language === 'en' ? 'Shukla Paksha Dwitiya' : 'शुक्ल पक्ष द्वितीया'}
                </span>
              </div>
              
              <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                <span className="font-medium text-neutral-800">
                  {language === 'en' ? 'Nakshatra:' : 'नक्षत्र:'}
                </span>
                <span className="text-neutral-900">
                  {language === 'en' ? 'Rohini' : 'रोहिणी'}
                </span>
              </div>
              
              <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                <span className="font-medium text-neutral-800">
                  {language === 'en' ? 'Yoga:' : 'योग:'}
                </span>
                <span className="text-neutral-900">
                  {language === 'en' ? 'Siddhi' : 'सिद्धि'}
                </span>
              </div>
              
              <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                <span className="font-medium text-neutral-800">
                  {language === 'en' ? 'Karana:' : 'करण:'}
                </span>
                <span className="text-neutral-900">
                  {language === 'en' ? 'Bava' : 'बव'}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-4">
              {language === 'en' ? 'Auspicious Periods' : 'शुभ अवधि'}
            </h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-1">
                  {language === 'en' ? 'Abhijit Muhurat:' : 'अभिजित मुहूर्त:'}
                </h4>
                <p className="text-green-700">11:45 AM - 12:30 PM</p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-1">
                  {language === 'en' ? 'Brahma Muhurat:' : 'ब्रह्म मुहूर्त:'}
                </h4>
                <p className="text-green-700">4:30 AM - 5:15 AM</p>
              </div>
              
              <div className="p-3 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-800 mb-1">
                  {language === 'en' ? 'Rahu Kalam:' : 'राहु काल:'}
                </h4>
                <p className="text-red-700">9:00 AM - 10:30 AM</p>
                <p className="text-xs text-red-600 mt-1">
                  {language === 'en' ? '(Avoid financial activities during this period)' : '(इस अवधि के दौरान वित्तीय गतिविधियों से बचें)'}
                </p>
              </div>
              
              <div className="p-3 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-800 mb-1">
                  {language === 'en' ? 'Yamaganda:' : 'यमगण्ड:'}
                </h4>
                <p className="text-red-700">2:00 PM - 3:30 PM</p>
                <p className="text-xs text-red-600 mt-1">
                  {language === 'en' ? '(Avoid financial activities during this period)' : '(इस अवधि के दौरान वित्तीय गतिविधियों से बचें)'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Information Section */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-16">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6 text-center">
          {language === 'en' ? 'Understanding Muhurat' : 'मुहूर्त को समझना'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-4">
              {language === 'en' ? 'What is a Muhurat?' : 'मुहूर्त क्या है?'}
            </h3>
            <p className="text-neutral-600 mb-4">
              {language === 'en' 
                ? 'In Vedic astrology, a Muhurat (or Muhurta) is an auspicious time period calculated based on the positions of planets, stars, and other celestial bodies. It is considered a favorable moment to initiate important activities for optimal results.' 
                : 'वैदिक ज्योतिष में, मुहूर्त ग्रहों, तारों और अन्य खगोलीय पिंडों की स्थितियों के आधार पर गणना की गई एक शुभ समय अवधि है। इसे इष्टतम परिणामों के लिए महत्वपूर्ण गतिविधियों को शुरू करने के लिए एक अनुकूल क्षण माना जाता है।'}
            </p>
            <p className="text-neutral-600">
              {language === 'en'
                ? 'Muhurats are determined by analyzing various astrological factors including the positions of planets, lunar day (tithi), weekday, and nakshatra (lunar mansion). The goal is to begin activities when cosmic energies are most supportive of the intended outcome.'
                : 'मुहूर्त विभिन्न ज्योतिषीय कारकों का विश्लेषण करके निर्धारित किए जाते हैं, जिनमें ग्रहों की स्थिति, चंद्र दिवस (तिथि), सप्ताह के दिन और नक्षत्र (चंद्र मंजिल) शामिल हैं। लक्ष्य गतिविधियों को तब शुरू करना है जब ब्रह्मांडीय ऊर्जाएं इच्छित परिणाम के लिए सबसे अधिक सहायक हों।'}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-4">
              {language === 'en' ? 'Financial Muhurats' : 'वित्तीय मुहूर्त'}
            </h3>
            <p className="text-neutral-600 mb-4">
              {language === 'en'
                ? 'In financial contexts, muhurats are often consulted for:'
                : 'वित्तीय संदर्भों में, मुहूर्त अक्सर इनके लिए परामर्श किए जाते हैं:'}
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>
                  {language === 'en' ? 'Starting a new business' : 'नया व्यापार शुरू करना'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>
                  {language === 'en' ? 'Making significant investments' : 'महत्वपूर्ण निवेश करना'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>
                  {language === 'en' ? 'Purchasing property or valuable assets' : 'संपत्ति या मूल्यवान संपत्ति खरीदना'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>
                  {language === 'en' ? 'Signing important financial contracts' : 'महत्वपूर्ण वित्तीय अनुबंधों पर हस्ताक्षर करना'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>
                  {language === 'en' ? 'Opening new bank accounts or financial instruments' : 'नए बैंक खाते या वित्तीय साधन खोलना'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-16">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-yellow-800">
              {language === 'en' ? 'Important Disclaimer' : 'महत्वपूर्ण अस्वीकरण'}
            </h3>
            <div className="mt-2 text-yellow-700">
              <p>
                {language === 'en' 
                  ? 'The muhurat information provided is for entertainment and cultural interest only. Financial decisions should always be based on sound financial principles, thorough research, and professional advice when needed.' 
                  : 'प्रदान की गई मुहूर्त जानकारी केवल मनोरंजन और सांस्कृतिक रुचि के लिए है। वित्तीय निर्णय हमेशा ठोस वित्तीय सिद्धांतों, विस्तृत शोध और आवश्यकता पड़ने पर पेशेवर सलाह पर आधारित होने चाहिए।'}
              </p>
              <p className="mt-2">
                {language === 'en'
                  ? 'While many people find value in considering astrological perspectives as part of their decision-making process, we encourage you to use these insights as complementary information rather than the sole basis for financial choices.'
                  : 'जबकि कई लोग अपनी निर्णय प्रक्रिया के हिस्से के रूप में ज्योतिषीय दृष्टिकोणों पर विचार करने में मूल्य पाते हैं, हम आपको इन अंतर्दृष्टियों का उपयोग वित्तीय विकल्पों के एकमात्र आधार के बजाय पूरक जानकारी के रूप में करने के लिए प्रोत्साहित करते हैं।'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Tools */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
          {language === 'en' ? 'Related Astro-Finance Tools' : 'संबंधित वित्तीय ज्योतिष उपकरण'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/astro-finance-insights/daily-horoscope" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {language === 'en' ? 'Daily Financial Horoscope' : 'दैनिक वित्तीय राशिफल'}
              </h3>
            </div>
            <p className="text-sm text-neutral-600 mb-3">
              {language === 'en'
                ? 'Get daily financial predictions and guidance based on your zodiac sign.'
                : 'अपनी राशि के आधार पर दैनिक वित्तीय भविष्यवाणियां और मार्गदर्शन प्राप्त करें।'}
            </p>
            <span className="text-sm text-purple-600 font-medium">
              {language === 'en' ? 'View Horoscope' : 'राशिफल देखें'}
            </span>
          </Link>
          
          <Link to="/astro-finance-insights/zodiac-traits" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <Star className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {language === 'en' ? 'Zodiac Financial Traits' : 'राशि वित्तीय लक्षण'}
              </h3>
            </div>
            <p className="text-sm text-neutral-600 mb-3">
              {language === 'en'
                ? 'Discover how your zodiac sign influences your approach to money and investments.'
                : 'जानें कि आपकी राशि धन और निवेश के प्रति आपके दृष्टिकोण को कैसे प्रभावित करती है।'}
            </p>
            <span className="text-sm text-indigo-600 font-medium">
              {language === 'en' ? 'View Traits' : 'लक्षण देखें'}
            </span>
          </Link>
          
          <Link to="/astro-finance-insights/numerology" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                <Hash className="h-5 w-5 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {language === 'en' ? 'Numerology Calculator' : 'अंकशास्त्र कैलकुलेटर'}
              </h3>
            </div>
            <p className="text-sm text-neutral-600 mb-3">
              {language === 'en'
                ? 'Discover your life path number and its financial implications.'
                : 'अपना जीवन पथ संख्या और इसके वित्तीय प्रभावों की खोज करें।'}
            </p>
            <span className="text-sm text-pink-600 font-medium">
              {language === 'en' ? 'Calculate Numbers' : 'अंक गणना करें'}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MuhuratFinder;