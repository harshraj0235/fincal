import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, DollarSign, TrendingUp, TrendingDown, Globe } from 'lucide-react';

export const DailyHoroscopeDetail: React.FC = () => {
  const { sign } = useParams<{ sign: string }>();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<string>('');
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
  
  // Zodiac sign data
  const zodiacData: Record<string, {
    symbol: string;
    name: string;
    nameHindi: string;
    date: string;
    dateHindi: string;
    element: string;
    elementHindi: string;
    ruling: string;
    rulingHindi: string;
    horoscope: string;
    horoscopeHindi: string;
    favorable: string[];
    favorableHindi: string[];
    avoid: string[];
    avoidHindi: string[];
    luckyNumber: number;
    luckyColor: string;
    luckyColorHindi: string;
    favorableTime: string;
  }> = {
    'aries': {
      symbol: '♈',
      name: 'Aries',
      nameHindi: 'मेष',
      date: 'March 21 - April 19',
      dateHindi: '21 मार्च - 19 अप्रैल',
      element: 'Fire',
      elementHindi: 'अग्नि',
      ruling: 'Mars',
      rulingHindi: 'मंगल',
      horoscope: 'Today brings a surge of financial energy as Mars, your ruling planet, forms a positive aspect with Jupiter. This is an excellent day for initiating new financial projects or investments, particularly those requiring courage and initiative. Your natural leadership abilities are enhanced, making it a good time to take charge of financial planning or to pitch business ideas. However, be mindful of impulsive spending, as the energetic influence could lead to hasty decisions.',
      horoscopeHindi: 'आज मंगल, आपका शासक ग्रह, बृहस्पति के साथ एक सकारात्मक पहलू बनाता है, जिससे वित्तीय ऊर्जा में वृद्धि होती है। यह नई वित्तीय परियोजनाओं या निवेशों को शुरू करने के लिए एक उत्कृष्ट दिन है, विशेष रूप से उन लोगों के लिए जिन्हें साहस और पहल की आवश्यकता होती है। आपकी प्राकृतिक नेतृत्व क्षमताएं बढ़ जाती हैं, जिससे यह वित्तीय योजना का प्रभार लेने या व्यावसायिक विचारों को प्रस्तुत करने का अच्छा समय बन जाता है। हालांकि, आवेगपूर्ण खर्च के प्रति सावधान रहें, क्योंकि ऊर्जावान प्रभाव जल्दबाजी में निर्णय ले सकता है।',
      favorable: [
        'Starting new financial ventures',
        'Investment research and planning',
        'Negotiating financial deals',
        'Taking leadership in group investments'
      ],
      favorableHindi: [
        'नए वित्तीय उद्यम शुरू करना',
        'निवेश अनुसंधान और योजना',
        'वित्तीय सौदों पर बातचीत',
        'समूह निवेशों में नेतृत्व लेना'
      ],
      avoid: [
        'Impulsive high-value purchases',
        'Risky speculative investments',
        'Lending money to friends',
        'Making decisions based on FOMO (fear of missing out)'
      ],
      avoidHindi: [
        'आवेगपूर्ण उच्च मूल्य की खरीदारी',
        'जोखिम भरे सट्टा निवेश',
        'दोस्तों को पैसे उधार देना',
        'FOMO (छूटने के डर) के आधार पर निर्णय लेना'
      ],
      luckyNumber: 9,
      luckyColor: 'Red',
      luckyColorHindi: 'लाल',
      favorableTime: '10 AM - 12 PM'
    },
    'taurus': {
      symbol: '♉',
      name: 'Taurus',
      nameHindi: 'वृषभ',
      date: 'April 20 - May 20',
      dateHindi: '20 अप्रैल - 20 मई',
      element: 'Earth',
      elementHindi: 'पृथ्वी',
      ruling: 'Venus',
      rulingHindi: 'शुक्र',
      horoscope: 'Venus, your ruling planet, is well-positioned today, bringing stability and potential growth to your financial sector. This is an excellent day for reviewing long-term investments, particularly those related to real estate or tangible assets. Your natural patience and practical approach to finances are enhanced, allowing you to see value where others might miss it. Consider setting up or reviewing a systematic investment plan that aligns with your security-focused financial goals.',
      horoscopeHindi: 'आपका शासक ग्रह शुक्र आज अच्छी स्थिति में है, जिससे आपके वित्तीय क्षेत्र में स्थिरता और संभावित विकास आ रहा है। यह दीर्घकालिक निवेशों की समीक्षा करने का एक उत्कृष्ट दिन है, विशेष रूप से रियल एस्टेट या मूर्त संपत्तियों से संबंधित। वित्त के प्रति आपका प्राकृतिक धैर्य और व्यावहारिक दृष्टिकोण बढ़ जाता है, जिससे आप वहां मूल्य देख सकते हैं जहां दूसरे इसे याद कर सकते हैं। अपने सुरक्षा-केंद्रित वित्तीय लक्ष्यों के अनुरूप एक व्यवस्थित निवेश योजना स्थापित करने या समीक्षा करने पर विचार करें।',
      favorable: [
        'Long-term investment planning',
        'Real estate or property research',
        'Setting up systematic savings',
        'Reviewing financial security measures'
      ],
      favorableHindi: [
        'दीर्घकालिक निवेश योजना',
        'रियल एस्टेट या संपत्ति अनुसंधान',
        'व्यवस्थित बचत की स्थापना',
        'वित्तीय सुरक्षा उपायों की समीक्षा'
      ],
      avoid: [
        'Impulsive changes to investment strategy',
        'Overspending on luxury items',
        'Making financial decisions based on others\' opinions',
        'Rushing major financial commitments'
      ],
      avoidHindi: [
        'निवेश रणनीति में आवेगपूर्ण परिवर्तन',
        'विलासिता की वस्तुओं पर अधिक खर्च',
        'दूसरों की राय के आधार पर वित्तीय निर्णय लेना',
        'प्रमुख वित्तीय प्रतिबद्धताओं में जल्दबाजी'
      ],
      luckyNumber: 6,
      luckyColor: 'Green',
      luckyColorHindi: 'हरा',
      favorableTime: '2 PM - 4 PM'
    },
    // Add more zodiac signs as needed
  };
  
  // If sign doesn't exist in our data, redirect to main horoscope page
  if (!sign || !zodiacData[sign]) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Zodiac Sign Not Found</h1>
        <p className="text-neutral-600 mb-8">The zodiac sign you're looking for doesn't exist or may have been moved.</p>
        <button 
          onClick={() => navigate('/astro-finance-insights/daily-horoscope')}
          className="btn btn-primary"
        >
          View All Zodiac Signs
        </button>
      </div>
    );
  }
  
  const data = zodiacData[sign];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/astro-finance-insights/daily-horoscope')} 
          className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>
            {language === 'en' ? 'Back to All Zodiac Signs' : 'सभी राशियों पर वापस जाएं'}
          </span>
        </button>
      </div>
      
      <div className="flex justify-end mb-4">
        <div className="flex space-x-2">
          <button 
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-lg text-sm ${
              language === 'en' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            <Globe className="h-3 w-3 inline mr-1" />
            English
          </button>
          <button 
            onClick={() => setLanguage('hi')}
            className={`px-3 py-1 rounded-lg text-sm ${
              language === 'hi' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            <Globe className="h-3 w-3 inline mr-1" />
            हिंदी
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-purple-500 to-indigo-600 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-7xl text-white">{data.symbol}</div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-1">
                {language === 'en' ? data.name : data.nameHindi}
              </h1>
              <p className="text-neutral-600">
                {language === 'en' ? data.date : data.dateHindi}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <Calendar className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-neutral-700 font-medium">{currentDate}</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
              <DollarSign className="h-5 w-5 text-purple-600 mr-2" />
              {language === 'en' ? 'Today\'s Financial Horoscope' : 'आज का वित्तीय राशिफल'}
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              {language === 'en' ? data.horoscope : data.horoscopeHindi}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 rounded-lg p-5">
              <h3 className="text-lg font-medium text-green-800 mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                {language === 'en' ? 'Favorable For Today' : 'आज के लिए अनुकूल'}
              </h3>
              <ul className="space-y-2">
                {(language === 'en' ? data.favorable : data.favorableHindi).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span className="text-green-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-red-50 rounded-lg p-5">
              <h3 className="text-lg font-medium text-red-800 mb-3 flex items-center">
                <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
                {language === 'en' ? 'Avoid Today' : 'आज इनसे बचें'}
              </h3>
              <ul className="space-y-2">
                {(language === 'en' ? data.avoid : data.avoidHindi).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span className="text-red-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-purple-50 rounded-lg px-5 py-3">
              <p className="text-sm text-purple-700 mb-1">
                {language === 'en' ? 'Lucky Number' : 'भाग्यशाली अंक'}
              </p>
              <p className="text-xl font-bold text-purple-900">{data.luckyNumber}</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg px-5 py-3">
              <p className="text-sm text-purple-700 mb-1">
                {language === 'en' ? 'Lucky Color' : 'भाग्यशाली रंग'}
              </p>
              <p className="text-xl font-bold text-purple-900">
                {language === 'en' ? data.luckyColor : data.luckyColorHindi}
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-lg px-5 py-3">
              <p className="text-sm text-purple-700 mb-1">
                {language === 'en' ? 'Favorable Time' : 'अनुकूल समय'}
              </p>
              <p className="text-xl font-bold text-purple-900">{data.favorableTime}</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg px-5 py-3">
              <p className="text-sm text-purple-700 mb-1">
                {language === 'en' ? 'Ruling Planet' : 'शासक ग्रह'}
              </p>
              <p className="text-xl font-bold text-purple-900">
                {language === 'en' ? data.ruling : data.rulingHindi}
              </p>
            </div>
          </div>
          
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
                    ? 'The financial horoscope provided is for entertainment and cultural interest only. Financial decisions should always be based on sound financial principles, thorough research, and professional advice when needed.'
                    : 'प्रदान किया गया वित्तीय राशिफल केवल मनोरंजन और सांस्कृतिक रुचि के लिए है। वित्तीय निर्णय हमेशा ठोस वित्तीय सिद्धांतों, विस्तृत शोध और आवश्यकता पड़ने पर पेशेवर सलाह पर आधारित होने चाहिए।'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            {language === 'en' ? 'Financial Compatibility' : 'वित्तीय संगतता'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-neutral-800 mb-2">
                {language === 'en' ? 'Best Financial Partnerships' : 'सर्वोत्तम वित्तीय साझेदारी'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {sign === 'aries' && (
                  <>
                    <Link to="/astro-finance-insights/daily-horoscope/leo" className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                      <span className="mr-1">♌</span> {language === 'en' ? 'Leo' : 'सिंह'}
                    </Link>
                    <Link to="/astro-finance-insights/daily-horoscope/sagittarius" className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                      <span className="mr-1">♐</span> {language === 'en' ? 'Sagittarius' : 'धनु'}
                    </Link>
                  </>
                )}
                {sign === 'taurus' && (
                  <>
                    <Link to="/astro-finance-insights/daily-horoscope/virgo" className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                      <span className="mr-1">♍</span> {language === 'en' ? 'Virgo' : 'कन्या'}
                    </Link>
                    <Link to="/astro-finance-insights/daily-horoscope/capricorn" className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                      <span className="mr-1">♑</span> {language === 'en' ? 'Capricorn' : 'मकर'}
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-neutral-800 mb-2">
                {language === 'en' ? 'Challenging Financial Partnerships' : 'चुनौतीपूर्ण वित्तीय साझेदारी'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {sign === 'aries' && (
                  <>
                    <Link to="/astro-finance-insights/daily-horoscope/cancer" className="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-sm flex items-center">
                      <span className="mr-1">♋</span> {language === 'en' ? 'Cancer' : 'कर्क'}
                    </Link>
                    <Link to="/astro-finance-insights/daily-horoscope/capricorn" className="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-sm flex items-center">
                      <span className="mr-1">♑</span> {language === 'en' ? 'Capricorn' : 'मकर'}
                    </Link>
                  </>
                )}
                {sign === 'taurus' && (
                  <>
                    <Link to="/astro-finance-insights/daily-horoscope/leo" className="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-sm flex items-center">
                      <span className="mr-1">♌</span> {language === 'en' ? 'Leo' : 'सिंह'}
                    </Link>
                    <Link to="/astro-finance-insights/daily-horoscope/aquarius" className="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-sm flex items-center">
                      <span className="mr-1">♒</span> {language === 'en' ? 'Aquarius' : 'कुंभ'}
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            <Link 
              to="/astro-finance-insights/zodiac-compatibility" 
              className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium text-sm"
            >
              {language === 'en' ? 'View detailed compatibility' : 'विस्तृत संगतता देखें'}
              <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            {language === 'en' ? 'Financial Outlook' : 'वित्तीय दृष्टिकोण'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-neutral-800 mb-2">
                {language === 'en' ? 'Weekly Trend' : 'साप्ताहिक प्रवृत्ति'}
              </h3>
              <div className="flex items-center">
                <div className="w-full bg-neutral-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <span className="ml-2 text-green-600 font-medium">70%</span>
              </div>
              <p className="text-sm text-neutral-600 mt-2">
                {language === 'en' 
                  ? 'Positive financial trends continue through the week, with particular strength in mid-week.'
                  : 'सप्ताह भर सकारात्मक वित्तीय रुझान जारी रहते हैं, विशेष रूप से सप्ताह के मध्य में ताकत के साथ।'}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-neutral-800 mb-2">
                {language === 'en' ? 'Monthly Projection' : 'मासिक अनुमान'}
              </h3>
              <p className="text-sm text-neutral-600">
                {language === 'en' 
                  ? 'This month brings opportunities for financial growth, particularly in areas related to your career or business ventures. The last week of the month may present a chance for an unexpected financial gain.'
                  : 'इस महीने वित्तीय विकास के अवसर आते हैं, विशेष रूप से आपके करियर या व्यावसायिक उद्यमों से संबंधित क्षेत्रों में। महीने के अंतिम सप्ताह में अप्रत्याशित वित्तीय लाभ का अवसर प्रस्तुत हो सकता है।'}
              </p>
            </div>
            
            <Link 
              to={`/astro-finance-insights/${language === 'en' ? '' : 'hi/'}monthly-horoscope/${sign}`} 
              className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium text-sm"
            >
              {language === 'en' ? 'View monthly horoscope' : 'मासिक राशिफल देखें'}
              <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6 text-center">
          {language === 'en' ? 'Other Zodiac Financial Horoscopes' : 'अन्य राशि वित्तीय राशिफल'}
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Link to="/astro-finance-insights/daily-horoscope/aries" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'aries' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♈</div>
            <span className="font-medium text-neutral-900">
              {language === 'en' ? 'Aries' : 'मेष'}
            </span>
          </Link>
          <Link to="/astro-finance-insights/daily-horoscope/taurus" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'taurus' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♉</div>
            <span className="font-medium text-neutral-900">
              {language === 'en' ? 'Taurus' : 'वृषभ'}
            </span>
          </Link>
          <Link to="/astro-finance-insights/daily-horoscope/gemini" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'gemini' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♊</div>
            <span className="font-medium text-neutral-900">
              {language === 'en' ? 'Gemini' : 'मिथुन'}
            </span>
          </Link>
          <Link to="/astro-finance-insights/daily-horoscope/cancer" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'cancer' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♋</div>
            <span className="font-medium text-neutral-900">
              {language === 'en' ? 'Cancer' : 'कर्क'}
            </span>
          </Link>
          <Link to="/astro-finance-insights/daily-horoscope/leo" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'leo' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♌</div>
            <span className="font-medium text-neutral-900">
              {language === 'en' ? 'Leo' : 'सिंह'}
            </span>
          </Link>
          <Link to="/astro-finance-insights/daily-horoscope/virgo" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'virgo' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♍</div>
            <span className="font-medium text-neutral-900">
              {language === 'en' ? 'Virgo' : 'कन्या'}
            </span>
          </Link>
          <Link to="/astro-finance-insights/daily-horoscope/libra" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'libra' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♎</div>
            <span className="font-medium text-neutral-900">
              {language === 'en' ? 'Libra' : 'तुला'}
            </span>
          </Link>
          <Link to="/astro-finance-insights/daily-horoscope/scorpio" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'scorpio' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♏</div>
            <span className="font-medium text-neutral-900">
              {language === 'en' ? 'Scorpio' : 'वृश्चिक'}
            </span>
          </Link>
          <Link to="/astro-finance-insights/daily-horoscope/sagittarius" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'sagittarius' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♐</div>
            <span className="font-medium text-neutral-900">
              {language === 'en' ? 'Sagittarius' : 'धनु'}
            </span>
          </Link>
          <Link to="/astro-finance-insights/daily-horoscope/capricorn" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'capricorn' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♑</div>
            <span className="font-medium text-neutral-900">
              {language === 'en' ? 'Capricorn' : 'मकर'}
            </span>
          </Link>
          <Link to="/astro-finance-insights/daily-horoscope/aquarius" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'aquarius' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♒</div>
            <span className="font-medium text-neutral-900">
              {language === 'en' ? 'Aquarius' : 'कुंभ'}
            </span>
          </Link>
          <Link to="/astro-finance-insights/daily-horoscope/pisces" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'pisces' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♓</div>
            <span className="font-medium text-neutral-900">
              {language === 'en' ? 'Pisces' : 'मीन'}
            </span>
          </Link>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
          {language === 'en' ? 'Related Astro-Finance Tools' : 'संबंधित वित्तीय ज्योतिष उपकरण'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/astro-finance-insights/zodiac-traits" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Star className="h-5 w-5 text-purple-600" />
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
            <span className="text-sm text-purple-600 font-medium">
              {language === 'en' ? 'View Traits' : 'लक्षण देखें'}
            </span>
          </Link>
          
          <Link to="/astro-finance-insights/zodiac-compatibility" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <Users className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {language === 'en' ? 'Zodiac Compatibility' : 'राशि संगतता'}
              </h3>
            </div>
            <p className="text-sm text-neutral-600 mb-3">
              {language === 'en'
                ? 'Check financial compatibility between different zodiac signs for business partnerships.'
                : 'व्यापार साझेदारी के लिए विभिन्न राशियों के बीच वित्तीय संगतता की जांच करें।'}
            </p>
            <span className="text-sm text-indigo-600 font-medium">
              {language === 'en' ? 'Check Compatibility' : 'संगतता जांचें'}
            </span>
          </Link>
          
          <Link to="/astro-finance-insights/muhurat-finder" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {language === 'en' ? 'Muhurat Finder' : 'मुहूर्त खोजक'}
              </h3>
            </div>
            <p className="text-sm text-neutral-600 mb-3">
              {language === 'en'
                ? 'Find auspicious times for important financial decisions and investments.'
                : 'महत्वपूर्ण वित्तीय निर्णयों और निवेशों के लिए शुभ समय खोजें।'}
            </p>
            <span className="text-sm text-green-600 font-medium">
              {language === 'en' ? 'Find Muhurat' : 'मुहूर्त खोजें'}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DailyHoroscopeDetail;