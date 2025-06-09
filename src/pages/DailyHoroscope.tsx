import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Star, ChevronRight, Globe } from 'lucide-react';

export const DailyHoroscope: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<string>('');
  const [selectedZodiac, setSelectedZodiac] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  
  useEffect(() => {
    // Set current date
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(today.toLocaleDateString('en-US', options));
  }, []);
  
  const zodiacSigns = [
    { sign: 'aries', symbol: '♈', name: 'Aries', nameHindi: 'मेष', date: 'Mar 21 - Apr 19', dateHindi: '21 मार्च - 19 अप्रैल' },
    { sign: 'taurus', symbol: '♉', name: 'Taurus', nameHindi: 'वृषभ', date: 'Apr 20 - May 20', dateHindi: '20 अप्रैल - 20 मई' },
    { sign: 'gemini', symbol: '♊', name: 'Gemini', nameHindi: 'मिथुन', date: 'May 21 - Jun 20', dateHindi: '21 मई - 20 जून' },
    { sign: 'cancer', symbol: '♋', name: 'Cancer', nameHindi: 'कर्क', date: 'Jun 21 - Jul 22', dateHindi: '21 जून - 22 जुलाई' },
    { sign: 'leo', symbol: '♌', name: 'Leo', nameHindi: 'सिंह', date: 'Jul 23 - Aug 22', dateHindi: '23 जुलाई - 22 अगस्त' },
    { sign: 'virgo', symbol: '♍', name: 'Virgo', nameHindi: 'कन्या', date: 'Aug 23 - Sep 22', dateHindi: '23 अगस्त - 22 सितंबर' },
    { sign: 'libra', symbol: '♎', name: 'Libra', nameHindi: 'तुला', date: 'Sep 23 - Oct 22', dateHindi: '23 सितंबर - 22 अक्टूबर' },
    { sign: 'scorpio', symbol: '♏', name: 'Scorpio', nameHindi: 'वृश्चिक', date: 'Oct 23 - Nov 21', dateHindi: '23 अक्टूबर - 21 नवंबर' },
    { sign: 'sagittarius', symbol: '♐', name: 'Sagittarius', nameHindi: 'धनु', date: 'Nov 22 - Dec 21', dateHindi: '22 नवंबर - 21 दिसंबर' },
    { sign: 'capricorn', symbol: '♑', name: 'Capricorn', nameHindi: 'मकर', date: 'Dec 22 - Jan 19', dateHindi: '22 दिसंबर - 19 जनवरी' },
    { sign: 'aquarius', symbol: '♒', name: 'Aquarius', nameHindi: 'कुंभ', date: 'Jan 20 - Feb 18', dateHindi: '20 जनवरी - 18 फरवरी' },
    { sign: 'pisces', symbol: '♓', name: 'Pisces', nameHindi: 'मीन', date: 'Feb 19 - Mar 20', dateHindi: '19 फरवरी - 20 मार्च' }
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/astro-finance-insights')} 
          className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>{language === 'en' ? 'Back to Astro-Finance Hub' : 'वित्तीय ज्योतिष केंद्र पर वापस जाएं'}</span>
        </button>
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          {language === 'en' ? 'Daily Financial Horoscope' : 'दैनिक वित्तीय राशिफल'}
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          {language === 'en' 
            ? 'Discover how cosmic energies may influence your financial decisions today' 
            : 'जानें कि कैसे ब्रह्मांडीय ऊर्जाएं आज आपके वित्तीय निर्णयों को प्रभावित कर सकती हैं'}
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
      
      {/* Hero Section */}
      <section className="cosmic-bg text-white py-12 md:py-16 star-bg rounded-2xl mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'en' ? 'Daily Financial Horoscope' : 'दैनिक वित्तीय राशिफल'}
            </h2>
            <p className="text-lg mb-6 text-purple-100">
              {language === 'en' 
                ? 'Discover how cosmic energies may influence your financial decisions today' 
                : 'जानें कि कैसे ब्रह्मांडीय ऊर्जाएं आज आपके वित्तीय निर्णयों को प्रभावित कर सकती हैं'}
            </p>
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm">
              <span className="text-white/80">
                {language === 'en' ? 'Today\'s Date:' : 'आज की तारीख:'}
              </span>
              <span className="text-white font-medium ml-2" id="current-date">{currentDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Zodiac Selection */}
      <section className="py-12 bg-white rounded-xl shadow-md mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              {language === 'en' ? 'Select Your Zodiac Sign' : 'अपनी राशि चुनें'}
            </h2>
            
            <div className="zodiac-grid mb-8">
              {zodiacSigns.map((zodiac) => (
                <button 
                  key={zodiac.sign}
                  onClick={() => setSelectedZodiac(zodiac.sign)}
                  className={`zodiac-item ${selectedZodiac === zodiac.sign ? 'ring-2 ring-purple-500' : ''}`}
                >
                  <div className="text-3xl mb-2">{zodiac.symbol}</div>
                  <span className="font-medium text-neutral-900">
                    {language === 'en' ? zodiac.name : zodiac.nameHindi}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {language === 'en' ? zodiac.date : zodiac.dateHindi}
                  </span>
                </button>
              ))}
            </div>
            
            {selectedZodiac && (
              <div className="text-center">
                <Link 
                  to={`/astro-finance-insights/${language === 'en' ? '' : 'hi/'}daily-horoscope/${selectedZodiac}`}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors inline-flex items-center"
                >
                  {language === 'en' 
                    ? `View ${zodiacSigns.find(z => z.sign === selectedZodiac)?.name} Horoscope`
                    : `${zodiacSigns.find(z => z.sign === selectedZodiac)?.nameHindi} राशिफल देखें`}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            )}
            
            <div className="text-center mt-8">
              <p className="text-neutral-600 mb-6">
                {language === 'en' 
                  ? 'Looking for a longer-term financial outlook?' 
                  : 'क्या आप दीर्घकालिक वित्तीय दृष्टिकोण की तलाश कर रहे हैं?'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to={`/astro-finance-insights/${language === 'en' ? '' : 'hi/'}weekly-horoscope`} 
                  className="bg-white border border-purple-200 text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                >
                  {language === 'en' ? 'Weekly Horoscope' : 'साप्ताहिक राशिफल'}
                </Link>
                <Link 
                  to={`/astro-finance-insights/${language === 'en' ? '' : 'hi/'}monthly-horoscope`} 
                  className="bg-white border border-purple-200 text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                >
                  {language === 'en' ? 'Monthly Horoscope' : 'मासिक राशिफल'}
                </Link>
                <Link 
                  to={`/astro-finance-insights/${language === 'en' ? '' : 'hi/'}yearly-horoscope`} 
                  className="bg-white border border-purple-200 text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                >
                  {language === 'en' ? 'Yearly Horoscope' : 'वार्षिक राशिफल'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Horoscope */}
      <section className="py-12 bg-gray-50 rounded-xl mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              {language === 'en' ? 'Today\'s Featured Financial Horoscope' : 'आज का विशेष वित्तीय राशिफल'}
            </h2>
            
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="bg-purple-50 rounded-xl p-6 text-center">
                    <div className="text-5xl mb-4">♌</div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {language === 'en' ? 'Leo' : 'सिंह'}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {language === 'en' ? 'July 23 - August 22' : '23 जुलाई - 22 अगस्त'}
                    </p>
                    <div className="mt-4 pt-4 border-t border-purple-100">
                      <p className="text-sm text-purple-700 font-medium">
                        {language === 'en' ? 'Today\'s Financial Rating' : 'आज की वित्तीय रेटिंग'}
                      </p>
                      <div className="flex justify-center mt-2">
                        <span className="text-yellow-500">★★★★</span><span className="text-gray-300">★</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                    {language === 'en' ? 'Today\'s Financial Outlook' : 'आज का वित्तीय दृष्टिकोण'}
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    {language === 'en' 
                      ? 'With Mercury forming a favorable aspect to Jupiter, today is excellent for financial planning and investment research. Your analytical abilities are heightened, making it a good time to review your portfolio or explore new investment opportunities.'
                      : 'बुध के बृहस्पति के साथ अनुकूल पहलू बनाने से, आज वित्तीय नियोजन और निवेश अनुसंधान के लिए उत्कृष्ट है। आपकी विश्लेषणात्मक क्षमताएं बढ़ जाती हैं, जिससे यह आपके पोर्टफोलियो की समीक्षा करने या नए निवेश अवसरों का पता लगाने का अच्छा समय बन जाता है।'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 rounded-lg p-3">
                      <h4 className="font-medium text-green-800 mb-1">
                        {language === 'en' ? 'Favorable For' : 'इनके लिए अनुकूल'}
                      </h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• {language === 'en' ? 'Long-term investments' : 'दीर्घकालिक निवेश'}</li>
                        <li>• {language === 'en' ? 'Financial planning' : 'वित्तीय नियोजन'}</li>
                        <li>• {language === 'en' ? 'Networking with mentors' : 'मेंटर्स के साथ नेटवर्किंग'}</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3">
                      <h4 className="font-medium text-red-800 mb-1">
                        {language === 'en' ? 'Avoid Today' : 'आज इनसे बचें'}
                      </h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• {language === 'en' ? 'Impulsive purchases' : 'आवेगपूर्ण खरीदारी'}</li>
                        <li>• {language === 'en' ? 'Lending money to friends' : 'दोस्तों को पैसे उधार देना'}</li>
                        <li>• {language === 'en' ? 'High-risk trading' : 'उच्च जोखिम वाला ट्रेडिंग'}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-purple-50 rounded-lg px-4 py-2 text-sm">
                      <span className="font-medium text-purple-700">
                        {language === 'en' ? 'Lucky Number:' : 'भाग्यशाली अंक:'}
                      </span> 8
                    </div>
                    <div className="bg-purple-50 rounded-lg px-4 py-2 text-sm">
                      <span className="font-medium text-purple-700">
                        {language === 'en' ? 'Lucky Color:' : 'भाग्यशाली रंग:'}
                      </span> {language === 'en' ? 'Gold' : 'सोनहरा'}
                    </div>
                    <div className="bg-purple-50 rounded-lg px-4 py-2 text-sm">
                      <span className="font-medium text-purple-700">
                        {language === 'en' ? 'Favorable Time:' : 'अनुकूल समय:'}
                      </span> 2-4 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-8 bg-white rounded-xl shadow-md">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    {language === 'en' 
                      ? 'The financial horoscopes provided are for entertainment and cultural interest only. Financial decisions should always be based on sound financial principles, thorough research, and professional advice when needed.'
                      : 'प्रदान किए गए वित्तीय राशिफल केवल मनोरंजन और सांस्कृतिक रुचि के लिए हैं। वित्तीय निर्णय हमेशा ठोस वित्तीय सिद्धांतों, विस्तृत शोध और आवश्यकता पड़ने पर पेशेवर सलाह पर आधारित होने चाहिए।'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DailyHoroscope;