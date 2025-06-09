import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Globe } from 'lucide-react';

export const ZodiacTraits: React.FC = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  
  const zodiacSigns = [
    {
      sign: 'aries',
      symbol: '♈',
      name: 'Aries',
      nameHindi: 'मेष',
      date: 'Mar 21 - Apr 19',
      dateHindi: '21 मार्च - 19 अप्रैल',
      traits: [
        'Risk-taker with money, often entrepreneurial',
        'Quick financial decisions, sometimes impulsive',
        'Good at earning, but can struggle with saving',
        'Attracted to high-growth investments',
        'Prefers financial independence'
      ],
      traitsHindi: [
        'धन के साथ जोखिम लेने वाले, अक्सर उद्यमी',
        'त्वरित वित्तीय निर्णय, कभी-कभी आवेगपूर्ण',
        'कमाई में अच्छे, लेकिन बचत में संघर्ष कर सकते हैं',
        'उच्च विकास वाले निवेशों की ओर आकर्षित',
        'वित्तीय स्वतंत्रता पसंद करते हैं'
      ]
    },
    {
      sign: 'taurus',
      symbol: '♉',
      name: 'Taurus',
      nameHindi: 'वृषभ',
      date: 'Apr 20 - May 20',
      dateHindi: '20 अप्रैल - 20 मई',
      traits: [
        'Security-focused financial approach',
        'Excellent at saving and building wealth slowly',
        'Prefers tangible investments like real estate',
        'Resistant to financial risks',
        'Values quality and long-term investments'
      ],
      traitsHindi: [
        'सुरक्षा-केंद्रित वित्तीय दृष्टिकोण',
        'धीरे-धीरे बचत और धन निर्माण में उत्कृष्ट',
        'रियल एस्टेट जैसे मूर्त निवेशों को प्राथमिकता देते हैं',
        'वित्तीय जोखिमों के प्रति प्रतिरोधी',
        'गुणवत्ता और दीर्घकालिक निवेश को महत्व देते हैं'
      ]
    },
    {
      sign: 'gemini',
      symbol: '♊',
      name: 'Gemini',
      nameHindi: 'मिथुन',
      date: 'May 21 - Jun 20',
      dateHindi: '21 मई - 20 जून',
      traits: [
        'Versatile financial approach, often with multiple income streams',
        'Interested in learning about financial markets',
        'Can be indecisive about major financial decisions',
        'Adaptable to changing financial circumstances',
        'May need help focusing on long-term financial goals'
      ],
      traitsHindi: [
        'बहुमुखी वित्तीय दृष्टिकोण, अक्सर कई आय स्रोतों के साथ',
        'वित्तीय बाजारों के बारे में जानने में रुचि रखते हैं',
        'प्रमुख वित्तीय निर्णयों के बारे में अनिर्णित हो सकते हैं',
        'बदलती वित्तीय परिस्थितियों के अनुकूल',
        'दीर्घकालिक वित्तीय लक्ष्यों पर ध्यान केंद्रित करने में मदद की आवश्यकता हो सकती है'
      ]
    },
    {
      sign: 'cancer',
      symbol: '♋',
      name: 'Cancer',
      nameHindi: 'कर्क',
      date: 'Jun 21 - Jul 22',
      dateHindi: '21 जून - 22 जुलाई',
      traits: [
        'Security-oriented financial planning',
        'Excellent at budgeting and saving',
        'Emotionally attached to financial decisions',
        'Intuitive about money matters',
        'Focuses on family financial security'
      ],
      traitsHindi: [
        'सुरक्षा-उन्मुख वित्तीय नियोजन',
        'बजट बनाने और बचत में उत्कृष्ट',
        'वित्तीय निर्णयों से भावनात्मक रूप से जुड़े',
        'धन संबंधी मामलों के बारे में अंतर्ज्ञानी',
        'पारिवारिक वित्तीय सुरक्षा पर ध्यान केंद्रित करते हैं'
      ]
    },
    {
      sign: 'leo',
      symbol: '♌',
      name: 'Leo',
      nameHindi: 'सिंह',
      date: 'Jul 23 - Aug 22',
      dateHindi: '23 जुलाई - 22 अगस्त',
      traits: [
        'Generous with money, sometimes extravagant',
        'Attracted to luxury investments',
        'Natural leadership in financial ventures',
        'Confident in financial decisions',
        'May need to balance spending and saving'
      ],
      traitsHindi: [
        'धन के साथ उदार, कभी-कभी अत्यधिक खर्चीले',
        'विलासिता निवेश की ओर आकर्षित',
        'वित्तीय उद्यमों में प्राकृतिक नेतृत्व',
        'वित्तीय निर्णयों में आत्मविश्वासी',
        'खर्च और बचत के बीच संतुलन बनाने की आवश्यकता हो सकती है'
      ]
    },
    {
      sign: 'virgo',
      symbol: '♍',
      name: 'Virgo',
      nameHindi: 'कन्या',
      date: 'Aug 23 - Sep 22',
      dateHindi: '23 अगस्त - 22 सितंबर',
      traits: [
        'Analytical and detail-oriented with finances',
        'Excellent at budgeting and tracking expenses',
        'Practical and conservative investor',
        'Avoids unnecessary financial risks',
        'Skilled at finding financial inefficiencies'
      ],
      traitsHindi: [
        'वित्त के साथ विश्लेषणात्मक और विवरण-उन्मुख',
        'बजट बनाने और खर्चों को ट्रैक करने में उत्कृष्ट',
        'व्यावहारिक और रूढ़िवादी निवेशक',
        'अनावश्यक वित्तीय जोखिमों से बचते हैं',
        'वित्तीय अक्षमताओं को खोजने में कुशल'
      ]
    },
    {
      sign: 'libra',
      symbol: '♎',
      name: 'Libra',
      nameHindi: 'तुला',
      date: 'Sep 23 - Oct 22',
      dateHindi: '23 सितंबर - 22 अक्टूबर',
      traits: [
        'Seeks balance in financial decisions',
        'Good at negotiating financial terms',
        'Appreciates quality and aesthetics in purchases',
        'May struggle with financial decisiveness',
        'Often successful in partnership investments'
      ],
      traitsHindi: [
        'वित्तीय निर्णयों में संतुलन की तलाश करते हैं',
        'वित्तीय शर्तों पर बातचीत में अच्छे',
        'खरीदारी में गुणवत्ता और सौंदर्यशास्त्र की सराहना करते हैं',
        'वित्तीय निर्णायकता में संघर्ष कर सकते हैं',
        'अक्सर साझेदारी निवेश में सफल होते हैं'
      ]
    },
    {
      sign: 'scorpio',
      symbol: '♏',
      name: 'Scorpio',
      nameHindi: 'वृश्चिक',
      date: 'Oct 23 - Nov 21',
      dateHindi: '23 अक्टूबर - 21 नवंबर',
      traits: [
        'Strategic and resourceful with money',
        'Excellent at researching investments',
        'Comfortable with financial transformation',
        'Private about financial matters',
        'Potential for significant wealth accumulation'
      ],
      traitsHindi: [
        'धन के साथ रणनीतिक और संसाधनपूर्ण',
        'निवेश अनुसंधान में उत्कृष्ट',
        'वित्तीय परिवर्तन के साथ सहज',
        'वित्तीय मामलों के बारे में निजी',
        'महत्वपूर्ण धन संचय की क्षमता'
      ]
    },
    {
      sign: 'sagittarius',
      symbol: '♐',
      name: 'Sagittarius',
      nameHindi: 'धनु',
      date: 'Nov 22 - Dec 21',
      dateHindi: '22 नवंबर - 21 दिसंबर',
      traits: [
        'Optimistic about financial opportunities',
        'Willing to take calculated financial risks',
        'May prefer international investments',
        'Sometimes impulsive with spending',
        'Values financial freedom and independence'
      ],
      traitsHindi: [
        'वित्तीय अवसरों के बारे में आशावादी',
        'सोच-समझकर वित्तीय जोखिम लेने के इच्छुक',
        'अंतरराष्ट्रीय निवेश को प्राथमिकता दे सकते हैं',
        'कभी-कभी खर्च के साथ आवेगपूर्ण',
        'वित्तीय स्वतंत्रता और आजादी को महत्व देते हैं'
      ]
    },
    {
      sign: 'capricorn',
      symbol: '♑',
      name: 'Capricorn',
      nameHindi: 'मकर',
      date: 'Dec 22 - Jan 19',
      dateHindi: '22 दिसंबर - 19 जनवरी',
      traits: [
        'Disciplined and responsible with finances',
        'Long-term financial planner',
        'Patient investor with steady growth focus',
        'Values financial security and stability',
        'Excellent at building wealth over time'
      ],
      traitsHindi: [
        'वित्त के साथ अनुशासित और जिम्मेदार',
        'दीर्घकालिक वित्तीय योजनाकार',
        'स्थिर विकास फोकस के साथ धैर्यवान निवेशक',
        'वित्तीय सुरक्षा और स्थिरता को महत्व देते हैं',
        'समय के साथ धन निर्माण में उत्कृष्ट'
      ]
    },
    {
      sign: 'aquarius',
      symbol: '♒',
      name: 'Aquarius',
      nameHindi: 'कुंभ',
      date: 'Jan 20 - Feb 18',
      dateHindi: '20 जनवरी - 18 फरवरी',
      traits: [
        'Innovative approach to finances',
        'Interested in unconventional investments',
        'May be attracted to technology-related financial opportunities',
        'Often supports social causes with money',
        'Independent financial thinking'
      ],
      traitsHindi: [
        'वित्त के प्रति नवीन दृष्टिकोण',
        'अपरंपरागत निवेशों में रुचि',
        'प्रौद्योगिकी से संबंधित वित्तीय अवसरों की ओर आकर्षित हो सकते हैं',
        'अक्सर धन से सामाजिक कारणों का समर्थन करते हैं',
        'स्वतंत्र वित्तीय सोच'
      ]
    },
    {
      sign: 'pisces',
      symbol: '♓',
      name: 'Pisces',
      nameHindi: 'मीन',
      date: 'Feb 19 - Mar 20',
      dateHindi: '19 फरवरी - 20 मार्च',
      traits: [
        'Intuitive financial decision-making',
        'May need help with practical financial planning',
        'Generous with money, sometimes to a fault',
        'Can be financially creative',
        'May benefit from structured saving plans'
      ],
      traitsHindi: [
        'अंतर्ज्ञानी वित्तीय निर्णय लेना',
        'व्यावहारिक वित्तीय नियोजन में मदद की आवश्यकता हो सकती है',
        'धन के साथ उदार, कभी-कभी गलती से',
        'वित्तीय रूप से रचनात्मक हो सकते हैं',
        'संरचित बचत योजनाओं से लाभ हो सकता है'
      ]
    }
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
      
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          {language === 'en' ? 'Financial Traits by Zodiac Sign' : 'राशि अनुसार वित्तीय विशेषताएं'}
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          {language === 'en' 
            ? 'Discover how your zodiac sign may influence your approach to money, investments, and financial decision-making' 
            : 'जानें कि आपकी राशि धन, निवेश और वित्तीय निर्णय लेने के प्रति आपके दृष्टिकोण को कैसे प्रभावित कर सकती है'}
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {zodiacSigns.map((zodiac) => (
          <Link 
            key={zodiac.sign}
            to={`/astro-finance-insights/zodiac-traits/${zodiac.sign}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all group"
          >
            <div className="h-24 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
              <div className="text-5xl text-white">{zodiac.symbol}</div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-1 group-hover:text-purple-600 transition-colors">
                {language === 'en' ? zodiac.name : zodiac.nameHindi}
              </h2>
              <p className="text-sm text-neutral-500 mb-4">
                {language === 'en' ? zodiac.date : zodiac.dateHindi}
              </p>
              
              <h3 className="text-sm font-medium text-neutral-700 mb-2">
                {language === 'en' ? 'Key Financial Traits:' : 'प्रमुख वित्तीय विशेषताएं:'}
              </h3>
              <ul className="space-y-1 mb-4">
                {(language === 'en' ? zodiac.traits : zodiac.traitsHindi).slice(0, 3).map((trait, index) => (
                  <li key={index} className="text-sm text-neutral-600 flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>{trait}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-end">
                <span className="text-purple-600 group-hover:text-purple-800 font-medium text-sm flex items-center">
                  {language === 'en' ? 'Read Full Profile' : 'पूरा प्रोफ़ाइल पढ़ें'}
                  <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-purple-50 rounded-xl p-8 border border-purple-100 mb-16">
        <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">
          {language === 'en' ? 'Understanding Zodiac Elements and Financial Tendencies' : 'राशि तत्वों और वित्तीय प्रवृत्तियों को समझना'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              {language === 'en' ? 'Fire Signs (Aries, Leo, Sagittarius)' : 'अग्नि राशियां (मेष, सिंह, धनु)'}
            </h3>
            <p className="text-purple-700 mb-3">
              {language === 'en'
                ? 'Fire signs tend to be dynamic and enthusiastic with their finances. They often have an entrepreneurial spirit and are willing to take calculated risks for potential high returns.'
                : 'अग्नि राशियां अपने वित्त के साथ गतिशील और उत्साही होती हैं। उनमें अक्सर उद्यमी भावना होती है और वे संभावित उच्च रिटर्न के लिए सोच-समझकर जोखिम लेने के लिए तैयार होते हैं।'}
            </p>
            <ul className="space-y-2 text-purple-700">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>
                  {language === 'en'
                    ? 'Strengths: Confidence, leadership in financial ventures, ability to seize opportunities'
                    : 'ताकत: आत्मविश्वास, वित्तीय उद्यमों में नेतृत्व, अवसरों को पकड़ने की क्षमता'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>
                  {language === 'en'
                    ? 'Challenges: Impulsiveness, may need to focus more on long-term planning'
                    : 'चुनौतियां: आवेगशीलता, दीर्घकालिक योजना पर अधिक ध्यान देने की आवश्यकता हो सकती है'}
                </span>
              </li>
            </ul>
            <Link 
              to="/astro-finance-insights/zodiac-elements/fire" 
              className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
            >
              {language === 'en' ? 'Learn more about Fire signs and money' : 'अग्नि राशियों और धन के बारे में अधिक जानें'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              {language === 'en' ? 'Earth Signs (Taurus, Virgo, Capricorn)' : 'पृथ्वी राशियां (वृषभ, कन्या, मकर)'}
            </h3>
            <p className="text-purple-700 mb-3">
              {language === 'en'
                ? 'Earth signs are typically the most financially grounded of the zodiac. They value security, take a practical approach to money management, and excel at building wealth steadily over time.'
                : 'पृथ्वी राशियां आमतौर पर राशिचक्र की सबसे वित्तीय रूप से जमीनी होती हैं। वे सुरक्षा को महत्व देते हैं, धन प्रबंधन के प्रति व्यावहारिक दृष्टिकोण अपनाते हैं, और समय के साथ स्थिर रूप से धन निर्माण में उत्कृष्ट होते हैं।'}
            </p>
            <ul className="space-y-2 text-purple-700">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>
                  {language === 'en'
                    ? 'Strengths: Discipline, patience, practical financial planning'
                    : 'ताकत: अनुशासन, धैर्य, व्यावहारिक वित्तीय नियोजन'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>
                  {language === 'en'
                    ? 'Challenges: May be too conservative, missing growth opportunities'
                    : 'चुनौतियां: बहुत रूढ़िवादी हो सकते हैं, विकास के अवसरों को याद कर सकते हैं'}
                </span>
              </li>
            </ul>
            <Link 
              to="/astro-finance-insights/zodiac-elements/earth" 
              className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
            >
              {language === 'en' ? 'Learn more about Earth signs and money' : 'पृथ्वी राशियों और धन के बारे में अधिक जानें'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              {language === 'en' ? 'Air Signs (Gemini, Libra, Aquarius)' : 'वायु राशियां (मिथुन, तुला, कुंभ)'}
            </h3>
            <p className="text-purple-700 mb-3">
              {language === 'en'
                ? 'Air signs bring intellectual curiosity to financial matters. They enjoy learning about different investment strategies, are adaptable to changing financial landscapes, and often have innovative approaches to money.'
                : 'वायु राशियां वित्तीय मामलों में बौद्धिक जिज्ञासा लाती हैं। वे विभिन्न निवेश रणनीतियों के बारे में जानना पसंद करते हैं, बदलते वित्तीय परिदृश्यों के अनुकूल होते हैं, और अक्सर धन के प्रति नवीन दृष्टिकोण रखते हैं।'}
            </p>
            <ul className="space-y-2 text-purple-700">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>
                  {language === 'en'
                    ? 'Strengths: Adaptability, innovative financial thinking, communication skills'
                    : 'ताकत: अनुकूलनशीलता, नवीन वित्तीय सोच, संचार कौशल'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>
                  {language === 'en'
                    ? 'Challenges: May overthink decisions, need help with implementation'
                    : 'चुनौतियां: निर्णयों पर अधिक सोच सकते हैं, कार्यान्वयन में मदद की आवश्यकता हो सकती है'}
                </span>
              </li>
            </ul>
            <Link 
              to="/astro-finance-insights/zodiac-elements/air" 
              className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
            >
              {language === 'en' ? 'Learn more about Air signs and money' : 'वायु राशियों और धन के बारे में अधिक जानें'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              {language === 'en' ? 'Water Signs (Cancer, Scorpio, Pisces)' : 'जल राशियां (कर्क, वृश्चिक, मीन)'}
            </h3>
            <p className="text-purple-700 mb-3">
              {language === 'en'
                ? 'Water signs have an intuitive and emotional approach to finances. They often have good financial instincts and may make decisions based on feelings as well as facts.'
                : 'जल राशियों का वित्त के प्रति अंतर्ज्ञानी और भावनात्मक दृष्टिकोण होता है। उनके पास अक्सर अच्छी वित्तीय अंतर्ज्ञान होती है और वे तथ्यों के साथ-साथ भावनाओं के आधार पर भी निर्णय ले सकते हैं।'}
            </p>
            <ul className="space-y-2 text-purple-700">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>
                  {language === 'en'
                    ? 'Strengths: Financial intuition, emotional intelligence with money, resourcefulness'
                    : 'ताकत: वित्तीय अंतर्ज्ञान, धन के साथ भावनात्मक बुद्धिमत्ता, संसाधनशीलता'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>
                  {language === 'en'
                    ? 'Challenges: Emotional financial decisions, may need more structure'
                    : 'चुनौतियां: भावनात्मक वित्तीय निर्णय, अधिक संरचना की आवश्यकता हो सकती है'}
                </span>
              </li>
            </ul>
            <Link 
              to="/astro-finance-insights/zodiac-elements/water" 
              className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
            >
              {language === 'en' ? 'Learn more about Water signs and money' : 'जल राशियों और धन के बारे में अधिक जानें'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8 mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
          {language === 'en' ? 'Zodiac Signs and Investment Preferences' : 'राशियां और निवेश प्राथमिकताएं'}
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  {language === 'en' ? 'Zodiac Sign' : 'राशि'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  {language === 'en' ? 'Risk Tolerance' : 'जोखिम सहनशीलता'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  {language === 'en' ? 'Preferred Investments' : 'पसंदीदा निवेश'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  {language === 'en' ? 'Financial Strengths' : 'वित्तीय ताकत'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-2xl mr-2">♈</div>
                    <div className="text-sm font-medium text-neutral-900">
                      {language === 'en' ? 'Aries' : 'मेष'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {language === 'en' ? 'High' : 'उच्च'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {language === 'en' 
                    ? 'Startups, high-growth stocks, entrepreneurial ventures' 
                    : 'स्टार्टअप, उच्च विकास वाले स्टॉक, उद्यमी उद्यम'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {language === 'en' 
                    ? 'Quick decision-making, spotting opportunities' 
                    : 'त्वरित निर्णय लेना, अवसरों को पहचानना'}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-2xl mr-2">♉</div>
                    <div className="text-sm font-medium text-neutral-900">
                      {language === 'en' ? 'Taurus' : 'वृषभ'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {language === 'en' ? 'Low to Medium' : 'कम से मध्यम'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {language === 'en' 
                    ? 'Real estate, blue-chip stocks, precious metals' 
                    : 'रियल एस्टेट, ब्लू-चिप स्टॉक, कीमती धातुएं'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {language === 'en' 
                    ? 'Patience, steady wealth building' 
                    : 'धैर्य, स्थिर धन निर्माण'}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-2xl mr-2">♊</div>
                    <div className="text-sm font-medium text-neutral-900">
                      {language === 'en' ? 'Gemini' : 'मिथुन'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {language === 'en' ? 'Medium to High' : 'मध्यम से उच्च'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {language === 'en' 
                    ? 'Tech stocks, diversified portfolios, trading' 
                    : 'टेक स्टॉक, विविध पोर्टफोलियो, ट्रेडिंग'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {language === 'en' 
                    ? 'Adaptability, information gathering' 
                    : 'अनुकूलनशीलता, जानकारी एकत्र करना'}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-2xl mr-2">♋</div>
                    <div className="text-sm font-medium text-neutral-900">
                      {language === 'en' ? 'Cancer' : 'कर्क'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {language === 'en' ? 'Low' : 'कम'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {language === 'en' 
                    ? 'Family homes, savings accounts, insurance' 
                    : 'पारिवारिक घर, बचत खाते, बीमा'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {language === 'en' 
                    ? 'Budgeting, financial security planning' 
                    : 'बजट बनाना, वित्तीय सुरक्षा योजना'}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-2xl mr-2">♌</div>
                    <div className="text-sm font-medium text-neutral-900">
                      {language === 'en' ? 'Leo' : 'सिंह'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {language === 'en' ? 'Medium to High' : 'मध्यम से उच्च'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {language === 'en' 
                    ? 'Luxury assets, high-profile stocks, gold' 
                    : 'विलासिता संपत्ति, उच्च-प्रोफाइल स्टॉक, सोना'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {language === 'en' 
                    ? 'Leadership, confidence in investments' 
                    : 'नेतृत्व, निवेश में आत्मविश्वास'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="text-center mt-6">
          <Link 
            to="/astro-finance-insights/zodiac-investment-guide" 
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
          >
            {language === 'en' ? 'View Complete Zodiac Investment Guide' : 'पूर्ण राशि निवेश गाइड देखें'}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
      
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
                  ? 'The zodiac traits and financial characteristics described here are based on traditional astrological interpretations and are provided for entertainment and cultural interest only. Individual financial behaviors are influenced by many factors beyond astrological signs.'
                  : 'यहां वर्णित राशि लक्षण और वित्तीय विशेषताएं पारंपरिक ज्योतिषीय व्याख्याओं पर आधारित हैं और केवल मनोरंजन और सांस्कृतिक रुचि के लिए प्रदान की जाती हैं। व्यक्तिगत वित्तीय व्यवहार ज्योतिषीय संकेतों के अलावा कई कारकों से प्रभावित होते हैं।'}
              </p>
              <p className="mt-2">
                {language === 'en'
                  ? 'Always base your financial decisions on sound financial principles, thorough research, and professional advice when needed, rather than astrological guidance alone.'
                  : 'अपने वित्तीय निर्णयों को हमेशा ठोस वित्तीय सिद्धांतों, विस्तृत शोध और आवश्यकता पड़ने पर पेशेवर सलाह पर आधारित करें, न कि केवल ज्योतिषीय मार्गदर्शन पर।'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
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
                ? 'Check financial compatibility between different zodiac signs for business and investment partnerships.'
                : 'व्यापार और निवेश साझेदारी के लिए विभिन्न राशियों के बीच वित्तीय संगतता की जांच करें।'}
            </p>
            <span className="text-sm text-indigo-600 font-medium">
              {language === 'en' ? 'Check Compatibility' : 'संगतता जांचें'}
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

export default ZodiacTraits;