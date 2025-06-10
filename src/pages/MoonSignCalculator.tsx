import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Moon, Download, Info, ChevronRight, Globe, MapPin, Clock } from 'lucide-react';

export const MoonSignCalculator: React.FC = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [birthDate, setBirthDate] = useState<string>('');
  const [birthTime, setBirthTime] = useState<string>('');
  const [birthPlace, setBirthPlace] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [moonSign, setMoonSign] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(false);
  
  // Moon sign data
  const moonSignData: Record<string, {
    name: string;
    nameHindi: string;
    symbol: string;
    element: string;
    elementHindi: string;
    ruling: string;
    rulingHindi: string;
    traits: string[];
    traitsHindi: string[];
    financialStrengths: string[];
    financialStrengthsHindi: string[];
    financialChallenges: string[];
    financialChallengesHindi: string[];
    investmentStyle: string;
    investmentStyleHindi: string;
  }> = {
    'aries': {
      name: 'Aries',
      nameHindi: 'मेष',
      symbol: '♈',
      element: 'Fire',
      elementHindi: 'अग्नि',
      ruling: 'Mars',
      rulingHindi: 'मंगल',
      traits: [
        'Impulsive and quick decision-maker',
        'Entrepreneurial and risk-taking',
        'Competitive approach to finances',
        'Prefers independence in financial matters',
        'Enthusiastic about new financial opportunities'
      ],
      traitsHindi: [
        'आवेगपूर्ण और त्वरित निर्णय लेने वाले',
        'उद्यमी और जोखिम लेने वाले',
        'वित्त के प्रति प्रतिस्पर्धी दृष्टिकोण',
        'वित्तीय मामलों में स्वतंत्रता पसंद करते हैं',
        'नए वित्तीय अवसरों के बारे में उत्साहित'
      ],
      financialStrengths: [
        'Ability to take initiative in financial ventures',
        'Quick to capitalize on opportunities',
        'Natural leadership in business situations',
        'Resilient after financial setbacks',
        'Confident in financial negotiations'
      ],
      financialStrengthsHindi: [
        'वित्तीय उद्यमों में पहल करने की क्षमता',
        'अवसरों का लाभ उठाने में तेज़',
        'व्यावसायिक स्थितियों में प्राकृतिक नेतृत्व',
        'वित्तीय झटके के बाद लचीला',
        'वित्तीय वार्ता में आत्मविश्वासी'
      ],
      financialChallenges: [
        'Tendency toward impulsive spending',
        'May not plan for long-term financial security',
        'Can be impatient with slow-growth investments',
        'Sometimes takes unnecessary financial risks',
        'May neglect budgeting and tracking expenses'
      ],
      financialChallengesHindi: [
        'आवेगपूर्ण खर्च की ओर झुकाव',
        'दीर्घकालिक वित्तीय सुरक्षा की योजना नहीं बना सकते',
        'धीमी वृद्धि वाले निवेशों के साथ अधीर हो सकते हैं',
        'कभी-कभी अनावश्यक वित्तीय जोखिम लेते हैं',
        'बजट बनाने और खर्चों को ट्रैक करने की उपेक्षा कर सकते हैं'
      ],
      investmentStyle: 'Aggressive growth-oriented investor who prefers high-risk, high-reward opportunities. Attracted to startups, emerging technologies, and disruptive business models. May excel at short-term trading but needs discipline for long-term wealth building.',
      investmentStyleHindi: 'आक्रामक विकास-उन्मुख निवेशक जो उच्च-जोखिम, उच्च-पुरस्कार अवसरों को पसंद करते हैं। स्टार्टअप, उभरती प्रौद्योगिकियों और विघटनकारी व्यापार मॉडल की ओर आकर्षित। अल्पकालिक ट्रेडिंग में उत्कृष्ट हो सकते हैं लेकिन दीर्घकालिक धन निर्माण के लिए अनुशासन की आवश्यकता होती है।'
    },
    'taurus': {
      name: 'Taurus',
      nameHindi: 'वृषभ',
      symbol: '♉',
      element: 'Earth',
      elementHindi: 'पृथ्वी',
      ruling: 'Venus',
      rulingHindi: 'शुक्र',
      traits: [
        'Patient and methodical with finances',
        'Security-focused financial approach',
        'Values quality and durability in purchases',
        'Excellent at saving and building wealth',
        'Resistant to financial risks'
      ],
      traitsHindi: [
        'वित्त के साथ धैर्यवान और व्यवस्थित',
        'सुरक्षा-केंद्रित वित्तीय दृष्टिकोण',
        'खरीदारी में गुणवत्ता और टिकाऊपन को महत्व देते हैं',
        'बचत और धन निर्माण में उत्कृष्ट',
        'वित्तीय जोखिमों के प्रति प्रतिरोधी'
      ],
      financialStrengths: [
        'Strong financial discipline',
        'Excellent at building long-term wealth',
        'Practical approach to money management',
        'Good at identifying quality investments',
        'Persistent in achieving financial goals'
      ],
      financialStrengthsHindi: [
        'मजबूत वित्तीय अनुशासन',
        'दीर्घकालिक धन निर्माण में उत्कृष्ट',
        'धन प्रबंधन के प्रति व्यावहारिक दृष्टिकोण',
        'गुणवत्तापूर्ण निवेश की पहचान करने में अच्छे',
        'वित्तीय लक्ष्यों को प्राप्त करने में दृढ़'
      ],
      financialChallenges: [
        'Can be overly cautious with investments',
        'May miss growth opportunities due to risk aversion',
        'Sometimes stubborn about financial strategies',
        'Can be resistant to financial change',
        'May overspend on luxury items'
      ],
      financialChallengesHindi: [
        'निवेश के साथ अत्यधिक सावधान हो सकते हैं',
        'जोखिम से बचने के कारण विकास के अवसरों को याद कर सकते हैं',
        'कभी-कभी वित्तीय रणनीतियों के बारे में जिद्दी',
        'वित्तीय परिवर्तन के प्रति प्रतिरोधी हो सकते हैं',
        'विलासिता की वस्तुओं पर अधिक खर्च कर सकते हैं'
      ],
      investmentStyle: 'Conservative, value-oriented investor who prioritizes stability and security. Prefers tangible assets like real estate, blue-chip stocks, and precious metals. Excels at patient, long-term investing strategies that build wealth steadily over time.',
      investmentStyleHindi: 'रूढ़िवादी, मूल्य-उन्मुख निवेशक जो स्थिरता और सुरक्षा को प्राथमिकता देते हैं। रियल एस्टेट, ब्लू-चिप स्टॉक्स और कीमती धातुओं जैसी मूर्त संपत्तियों को प्राथमिकता देते हैं। धैर्यपूर्ण, दीर्घकालिक निवेश रणनीतियों में उत्कृष्ट जो समय के साथ स्थिर रूप से धन का निर्माण करते हैं।'
    },
    // Add more moon signs as needed
  };
  
  const handleCalculate = () => {
    if (!birthDate || !birthTime || (!birthPlace && !useCurrentLocation)) {
      alert(language === 'en' ? 'Please fill all required fields' : 'कृपया सभी आवश्यक फ़ील्ड भरें');
      return;
    }
    
    setIsCalculating(true);
    
    // Simulate calculation with timeout
    setTimeout(() => {
      // In a real implementation, this would use ephemeris data to calculate the actual moon sign
      // For demonstration, we'll randomly select a moon sign
      const signs = Object.keys(moonSignData);
      const randomSign = signs[Math.floor(Math.random() * signs.length)];
      
      setMoonSign(randomSign);
      setIsCalculating(false);
      setShowResults(true);
    }, 2000);
  };
  
  const handleUseCurrentLocation = () => {
    setUseCurrentLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(4));
          setLongitude(position.coords.longitude.toFixed(4));
          
          // In a real implementation, we would use reverse geocoding to get the place name
          setBirthPlace('Current Location');
        },
        (error) => {
          console.error('Error getting location:', error);
          setUseCurrentLocation(false);
          alert(language === 'en' 
            ? 'Could not get your current location. Please enter location manually.' 
            : 'आपका वर्तमान स्थान प्राप्त नहीं कर सका। कृपया स्थान मैन्युअल रूप से दर्ज करें।');
        }
      );
    } else {
      setUseCurrentLocation(false);
      alert(language === 'en' 
        ? 'Geolocation is not supported by your browser. Please enter location manually.' 
        : 'आपके ब्राउज़र द्वारा जियोलोकेशन समर्थित नहीं है। कृपया स्थान मैन्युअल रूप से दर्ज करें।');
    }
  };
  
  const handleDownloadReport = () => {
    if (!moonSign) return;
    
    // In a real implementation, this would generate a PDF report
    alert(language === 'en' 
      ? 'Your personalized Moon Sign report is being generated and will download shortly.' 
      : 'आपकी व्यक्तिगत चंद्र राशि रिपोर्ट तैयार की जा रही है और जल्द ही डाउनलोड हो जाएगी।');
  };

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
      
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          {language === 'en' ? 'Moon Sign Calculator' : 'चंद्र राशि कैलकुलेटर'}
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          {language === 'en' 
            ? 'Discover your Vedic Moon Sign (Janma Rashi) and its influence on your financial personality' 
            : 'अपनी वैदिक चंद्र राशि (जन्म राशि) और आपके वित्तीय व्यक्तित्व पर इसके प्रभाव की खोज करें'}
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
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Input Form */}
        <div className={`bg-white rounded-xl shadow-md p-8 ${showResults ? 'lg:hidden' : ''}`}>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6 flex items-center">
            <Calendar className="h-6 w-6 text-blue-600 mr-2" />
            {language === 'en' ? 'Birth Details' : 'जन्म विवरण'}
          </h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="birth-date" className="block text-sm font-medium text-neutral-700 mb-2">
                {language === 'en' ? 'Birth Date' : 'जन्म तिथि'} <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="birth-date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="input w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="birth-time" className="block text-sm font-medium text-neutral-700 mb-2">
                {language === 'en' ? 'Birth Time' : 'जन्म समय'} <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                id="birth-time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="input w-full"
                required
              />
              <p className="mt-1 text-xs text-neutral-500">
                {language === 'en' 
                  ? 'Accurate birth time is important for precise moon sign calculation' 
                  : 'सटीक चंद्र राशि गणना के लिए सटीक जन्म समय महत्वपूर्ण है'}
              </p>
            </div>
            
            <div>
              <label htmlFor="birth-place" className="block text-sm font-medium text-neutral-700 mb-2">
                {language === 'en' ? 'Birth Place' : 'जन्म स्थान'} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="birth-place"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  className="input w-full pl-10"
                  placeholder={language === 'en' ? 'City, Country' : 'शहर, देश'}
                  disabled={useCurrentLocation}
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-neutral-400" />
                </div>
              </div>
              
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id="use-current-location"
                  checked={useCurrentLocation}
                  onChange={() => setUseCurrentLocation(!useCurrentLocation)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-neutral-300 rounded"
                />
                <label htmlFor="use-current-location" className="ml-2 block text-sm text-neutral-700">
                  {language === 'en' ? 'Use current location' : 'वर्तमान स्थान का उपयोग करें'}
                </label>
              </div>
            </div>
            
            {useCurrentLocation && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="latitude" className="block text-sm font-medium text-neutral-700 mb-2">
                    {language === 'en' ? 'Latitude' : 'अक्षांश'}
                  </label>
                  <input
                    type="text"
                    id="latitude"
                    value={latitude}
                    readOnly
                    className="input w-full bg-neutral-50"
                  />
                </div>
                <div>
                  <label htmlFor="longitude" className="block text-sm font-medium text-neutral-700 mb-2">
                    {language === 'en' ? 'Longitude' : 'देशांतर'}
                  </label>
                  <input
                    type="text"
                    id="longitude"
                    value={longitude}
                    readOnly
                    className="input w-full bg-neutral-50"
                  />
                </div>
              </div>
            )}
            
            <div className="pt-4">
              <button
                onClick={handleCalculate}
                disabled={isCalculating}
                className={`w-full btn ${
                  isCalculating 
                    ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isCalculating 
                  ? (language === 'en' ? 'Calculating...' : 'गणना हो रही है...') 
                  : (language === 'en' ? 'Calculate Moon Sign' : 'चंद्र राशि की गणना करें')}
              </button>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        {showResults && moonSign && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-semibold text-neutral-900 flex items-center">
                <Moon className="h-6 w-6 text-blue-600 mr-2" />
                {language === 'en' ? 'Your Moon Sign' : 'आपकी चंद्र राशि'}
              </h2>
              
              <button
                onClick={handleDownloadReport}
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <Download className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">
                  {language === 'en' ? 'Download Report' : 'रिपोर्ट डाउनलोड करें'}
                </span>
              </button>
            </div>
            
            <div className="flex flex-col items-center mb-8">
              <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-5xl text-blue-600">{moonSignData[moonSign].symbol}</span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-1">
                {language === 'en' ? moonSignData[moonSign].name : moonSignData[moonSign].nameHindi}
              </h3>
              <p className="text-neutral-600">
                {language === 'en' 
                  ? `Element: ${moonSignData[moonSign].element} | Ruling Planet: ${moonSignData[moonSign].ruling}` 
                  : `तत्व: ${moonSignData[moonSign].elementHindi} | शासक ग्रह: ${moonSignData[moonSign].rulingHindi}`}
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-3">
                  {language === 'en' ? 'Financial Personality Traits' : 'वित्तीय व्यक्तित्व लक्षण'}
                </h3>
                <ul className="space-y-2">
                  {(language === 'en' ? moonSignData[moonSign].traits : moonSignData[moonSign].traitsHindi).map((trait, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span className="text-neutral-700">{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-green-800 mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    {language === 'en' ? 'Financial Strengths' : 'वित्तीय ताकत'}
                  </h3>
                  <ul className="space-y-2">
                    {(language === 'en' ? moonSignData[moonSign].financialStrengths : moonSignData[moonSign].financialStrengthsHindi).map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">•</span>
                        <span className="text-green-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-red-800 mb-3 flex items-center">
                    <XCircle className="h-5 w-5 text-red-600 mr-2" />
                    {language === 'en' ? 'Financial Challenges' : 'वित्तीय चुनौतियां'}
                  </h3>
                  <ul className="space-y-2">
                    {(language === 'en' ? moonSignData[moonSign].financialChallenges : moonSignData[moonSign].financialChallengesHindi).map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">•</span>
                        <span className="text-red-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-3">
                  {language === 'en' ? 'Investment Style' : 'निवेश शैली'}
                </h3>
                <p className="text-neutral-700">
                  {language === 'en' ? moonSignData[moonSign].investmentStyle : moonSignData[moonSign].investmentStyleHindi}
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-blue-800 mb-2">
                      {language === 'en' ? 'Financial Advice' : 'वित्तीय सलाह'}
                    </h3>
                    <p className="text-blue-700">
                      {language === 'en'
                        ? `For ${moonSignData[moonSign].name} moon signs, it's important to balance your ${moonSignData[moonSign].element.toLowerCase()} element tendencies with complementary financial strategies. Consider working with a financial advisor who understands your natural approach to money and can help you develop a balanced plan.`
                        : `${moonSignData[moonSign].nameHindi} चंद्र राशि वालों के लिए, अपने ${moonSignData[moonSign].elementHindi} तत्व की प्रवृत्तियों को पूरक वित्तीय रणनीतियों के साथ संतुलित करना महत्वपूर्ण है। ऐसे वित्तीय सलाहकार के साथ काम करने पर विचार करें जो धन के प्रति आपके प्राकृतिक दृष्टिकोण को समझता हो और आपको एक संतुलित योजना विकसित करने में मदद कर सके।`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Birth Chart Visualization */}
        {showResults && moonSign && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6 flex items-center">
              <Moon className="h-6 w-6 text-blue-600 mr-2" />
              {language === 'en' ? 'Your Birth Chart' : 'आपकी जन्म कुंडली'}
            </h2>
            
            <div className="aspect-square max-w-md mx-auto mb-8 relative">
              {/* This would be a real birth chart visualization in a production app */}
              <div className="absolute inset-0 border-2 border-blue-200 rounded-full"></div>
              <div className="absolute inset-[10%] border-2 border-blue-200 rounded-full"></div>
              <div className="absolute inset-[20%] border-2 border-blue-200 rounded-full"></div>
              <div className="absolute inset-[30%] border-2 border-blue-200 rounded-full"></div>
              
              {/* Zodiac divisions */}
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute top-1/2 left-1/2 h-1/2 w-0.5 bg-blue-100 origin-bottom" 
                  style={{ transform: `rotate(${i * 30}deg)` }}
                ></div>
              ))}
              
              {/* Moon position */}
              <div 
                className="absolute w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white"
                style={{ 
                  top: '20%', 
                  left: '70%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <Moon className="h-5 w-5" />
              </div>
              
              {/* Sun position */}
              <div 
                className="absolute w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white"
                style={{ 
                  top: '70%', 
                  left: '30%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              </div>
              
              {/* Center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] border-2 border-blue-300 rounded-full flex items-center justify-center">
                <div className="text-blue-800 font-medium text-sm text-center">
                  {language === 'en' ? 'Birth Chart' : 'जन्म कुंडली'}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">
                  {language === 'en' ? 'Moon Sign Significance in Finance' : 'वित्त में चंद्र राशि का महत्व'}
                </h3>
                <p className="text-blue-700 text-sm">
                  {language === 'en'
                    ? 'Your Moon Sign represents your emotional nature and instinctive reactions, which significantly influence your financial decision-making, risk tolerance, and money management style. Understanding your Moon Sign can help you leverage your financial strengths and address potential challenges.'
                    : 'आपकी चंद्र राशि आपकी भावनात्मक प्रकृति और सहज प्रतिक्रियाओं का प्रतिनिधित्व करती है, जो आपके वित्तीय निर्णय लेने, जोखिम सहनशीलता और धन प्रबंधन शैली को महत्वपूर्ण रूप से प्रभावित करती है। अपनी चंद्र राशि को समझने से आपको अपनी वित्तीय ताकत का लाभ उठाने और संभावित चुनौतियों का समाधान करने में मदद मिल सकती है।'}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-neutral-900 mb-2">
                  {language === 'en' ? 'Birth Details' : 'जन्म विवरण'}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-neutral-500">
                      {language === 'en' ? 'Date:' : 'तिथि:'}
                    </p>
                    <p className="font-medium text-neutral-800">{new Date(birthDate).toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500">
                      {language === 'en' ? 'Time:' : 'समय:'}
                    </p>
                    <p className="font-medium text-neutral-800">{birthTime}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500">
                      {language === 'en' ? 'Place:' : 'स्थान:'}
                    </p>
                    <p className="font-medium text-neutral-800">{birthPlace}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500">
                      {language === 'en' ? 'Coordinates:' : 'निर्देशांक:'}
                    </p>
                    <p className="font-medium text-neutral-800">{latitude ? `${latitude}, ${longitude}` : 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Link 
                  to={`/astro-finance-insights/moon-sign/${moonSign}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  {language === 'en' 
                    ? `View detailed ${moonSignData[moonSign].name} Moon Sign profile` 
                    : `विस्तृत ${moonSignData[moonSign].nameHindi} चंद्र राशि प्रोफ़ाइल देखें`}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        )}
        
        {/* Information Section */}
        {!showResults && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6 flex items-center">
              <Info className="h-6 w-6 text-blue-600 mr-2" />
              {language === 'en' ? 'About Moon Sign' : 'चंद्र राशि के बारे में'}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-3">
                  {language === 'en' ? 'What is a Moon Sign?' : 'चंद्र राशि क्या है?'}
                </h3>
                <p className="text-neutral-700 mb-3">
                  {language === 'en'
                    ? 'In Vedic astrology, your Moon Sign (Janma Rashi) represents the zodiac sign where the Moon was positioned at the time of your birth. While your Sun Sign represents your outer personality, your Moon Sign reflects your inner emotional nature, instincts, and subconscious patterns.'
                    : 'वैदिक ज्योतिष में, आपकी चंद्र राशि (जन्म राशि) उस राशि का प्रतिनिधित्व करती है जहां आपके जन्म के समय चंद्रमा स्थित था। जबकि आपकी सूर्य राशि आपके बाहरी व्यक्तित्व का प्रतिनिधित्व करती है, आपकी चंद्र राशि आपकी आंतरिक भावनात्मक प्रकृति, सहज ज्ञान और अवचेतन पैटर्न को दर्शाती है।'}
                </p>
                <p className="text-neutral-700">
                  {language === 'en'
                    ? 'Many astrologers consider the Moon Sign more important than the Sun Sign, especially in Vedic astrology, as it provides deeper insights into your personality and behaviors, including how you handle money and financial decisions.'
                    : 'कई ज्योतिषी चंद्र राशि को सूर्य राशि से अधिक महत्वपूर्ण मानते हैं, विशेष रूप से वैदिक ज्योतिष में, क्योंकि यह आपके व्यक्तित्व और व्यवहारों में गहरी अंतर्दृष्टि प्रदान करता है, जिसमें यह भी शामिल है कि आप धन और वित्तीय निर्णयों को कैसे संभालते हैं।'}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-3">
                  {language === 'en' ? 'Moon Sign and Financial Behavior' : 'चंद्र राशि और वित्तीय व्यवहार'}
                </h3>
                <p className="text-neutral-700 mb-3">
                  {language === 'en'
                    ? 'Your Moon Sign significantly influences your emotional relationship with money, your instinctive financial habits, and your subconscious attitudes toward wealth and security. Understanding these patterns can help you make more aligned financial decisions and develop strategies that work with your natural tendencies rather than against them.'
                    : 'आपकी चंद्र राशि आपके धन के साथ भावनात्मक संबंध, आपकी सहज वित्तीय आदतों, और धन और सुरक्षा के प्रति आपके अवचेतन दृष्टिकोणों को महत्वपूर्ण रूप से प्रभावित करती है। इन पैटर्न को समझने से आपको अधिक संरेखित वित्तीय निर्णय लेने और ऐसी रणनीतियां विकसित करने में मदद मिल सकती है जो आपकी प्राकृतिक प्रवृत्तियों के विपरीत नहीं बल्कि उनके साथ काम करती हैं।'}
                </p>
                <p className="text-neutral-700">
                  {language === 'en'
                    ? 'For example, a person with a Taurus Moon may have a natural inclination toward financial security and steady wealth building, while someone with an Aries Moon might be more impulsive with spending and attracted to high-risk investments.'
                    : 'उदाहरण के लिए, वृषभ चंद्रमा वाले व्यक्ति में वित्तीय सुरक्षा और स्थिर धन निर्माण की प्राकृतिक प्रवृत्ति हो सकती है, जबकि मेष चंद्रमा वाले व्यक्ति खर्च के साथ अधिक आवेगपूर्ण और उच्च जोखिम वाले निवेशों की ओर आकर्षित हो सकते हैं।'}
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">
                  {language === 'en' ? 'Why Birth Time Matters' : 'जन्म समय क्यों मायने रखता है'}
                </h3>
                <p className="text-blue-700 text-sm">
                  {language === 'en'
                    ? 'The Moon changes zodiac signs approximately every 2.5 days. However, if you were born near the time when the Moon was transitioning between signs, an accurate birth time becomes crucial for determining your correct Moon Sign. Even a difference of a few hours can sometimes result in a different Moon Sign.'
                    : 'चंद्रमा लगभग हर 2.5 दिनों में राशि बदलता है। हालांकि, यदि आप उस समय के आसपास पैदा हुए थे जब चंद्रमा राशियों के बीच संक्रमण कर रहा था, तो आपकी सही चंद्र राशि निर्धारित करने के लिए सटीक जन्म समय महत्वपूर्ण हो जाता है। कभी-कभी कुछ घंटों का अंतर भी अलग चंद्र राशि का परिणाम दे सकता है।'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Disclaimer */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mt-12">
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
                  ? 'The Moon Sign analysis provided is for entertainment and cultural interest only. Financial decisions should always be based on sound financial principles, thorough research, and professional advice when needed.' 
                  : 'प्रदान किया गया चंद्र राशि विश्लेषण केवल मनोरंजन और सांस्कृतिक रुचि के लिए है। वित्तीय निर्णय हमेशा ठोस वित्तीय सिद्धांतों, विस्तृत शोध और आवश्यकता पड़ने पर पेशेवर सलाह पर आधारित होने चाहिए।'}
              </p>
              <p className="mt-2">
                {language === 'en'
                  ? 'While many people find value in understanding their astrological influences, we encourage you to use these insights as complementary information rather than the sole basis for financial choices.'
                  : 'जबकि कई लोग अपने ज्योतिषीय प्रभावों को समझने में मूल्य पाते हैं, हम आपको इन अंतर्दृष्टियों का उपयोग वित्तीय विकल्पों के एकमात्र आधार के बजाय पूरक जानकारी के रूप में करने के लिए प्रोत्साहित करते हैं।'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Tools */}
      <div className="mt-12">
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
          
          <Link to="/astro-finance-insights/gemstone-finder" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <Gem className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {language === 'en' ? 'Gemstone Finder' : 'रत्न खोजक'}
              </h3>
            </div>
            <p className="text-sm text-neutral-600 mb-3">
              {language === 'en'
                ? 'Find the right gemstones based on your birth chart that may enhance financial prosperity.'
                : 'अपनी जन्म कुंडली के आधार पर सही रत्न खोजें जो वित्तीय समृद्धि को बढ़ा सकते हैं।'}
            </p>
            <span className="text-sm text-amber-600 font-medium">
              {language === 'en' ? 'Find Gemstones' : 'रत्न खोजें'}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MoonSignCalculator;