import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export const ZodiacTraits: React.FC = () => {
  const navigate = useNavigate();
  
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
          <span>Back to Astro-Finance Hub</span>
        </button>
      </div>
      
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Financial Traits by Zodiac Sign</h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          Discover how your zodiac sign may influence your approach to money, investments, and financial decision-making
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <Link to="/astro-finance-insights/zodiac-traits" className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-100 text-primary-800 hover:bg-primary-200 transition-colors">
            English
          </Link>
          <Link to="/astro-finance-insights/hi/zodiac-traits" className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-100 text-primary-800 hover:bg-primary-200 transition-colors">
            हिंदी
          </Link>
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
              <h2 className="text-xl font-semibold text-neutral-900 mb-1 group-hover:text-purple-600 transition-colors">{zodiac.name}</h2>
              <p className="text-sm text-neutral-500 mb-4">{zodiac.date}</p>
              
              <h3 className="text-sm font-medium text-neutral-700 mb-2">Key Financial Traits:</h3>
              <ul className="space-y-1 mb-4">
                {zodiac.traits.slice(0, 3).map((trait, index) => (
                  <li key={index} className="text-sm text-neutral-600 flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>{trait}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-end">
                <span className="text-purple-600 group-hover:text-purple-800 font-medium text-sm flex items-center">
                  Read Full Profile
                  <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-purple-50 rounded-xl p-8 border border-purple-100 mb-16">
        <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">Understanding Zodiac Elements and Financial Tendencies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-purple-800 mb-4">Fire Signs (Aries, Leo, Sagittarius)</h3>
            <p className="text-purple-700 mb-3">
              Fire signs tend to be dynamic and enthusiastic with their finances. They often have an entrepreneurial spirit and are willing to take calculated risks for potential high returns.
            </p>
            <ul className="space-y-2 text-purple-700">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Strengths: Confidence, leadership in financial ventures, ability to seize opportunities</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Challenges: Impulsiveness, may need to focus more on long-term planning</span>
              </li>
            </ul>
            <Link 
              to="/astro-finance-insights/zodiac-elements/fire" 
              className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
            >
              Learn more about Fire signs and money
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-purple-800 mb-4">Earth Signs (Taurus, Virgo, Capricorn)</h3>
            <p className="text-purple-700 mb-3">
              Earth signs are typically the most financially grounded of the zodiac. They value security, take a practical approach to money management, and excel at building wealth steadily over time.
            </p>
            <ul className="space-y-2 text-purple-700">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Strengths: Discipline, patience, practical financial planning</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Challenges: May be too conservative, missing growth opportunities</span>
              </li>
            </ul>
            <Link 
              to="/astro-finance-insights/zodiac-elements/earth" 
              className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
            >
              Learn more about Earth signs and money
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-purple-800 mb-4">Air Signs (Gemini, Libra, Aquarius)</h3>
            <p className="text-purple-700 mb-3">
              Air signs bring intellectual curiosity to financial matters. They enjoy learning about different investment strategies, are adaptable to changing financial landscapes, and often have innovative approaches to money.
            </p>
            <ul className="space-y-2 text-purple-700">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Strengths: Adaptability, innovative financial thinking, communication skills</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Challenges: May overthink decisions, need help with implementation</span>
              </li>
            </ul>
            <Link 
              to="/astro-finance-insights/zodiac-elements/air" 
              className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
            >
              Learn more about Air signs and money
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-purple-800 mb-4">Water Signs (Cancer, Scorpio, Pisces)</h3>
            <p className="text-purple-700 mb-3">
              Water signs have an intuitive and emotional approach to finances. They often have good financial instincts and may make decisions based on feelings as well as facts.
            </p>
            <ul className="space-y-2 text-purple-700">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Strengths: Financial intuition, emotional intelligence with money, resourcefulness</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Challenges: Emotional financial decisions, may need more structure</span>
              </li>
            </ul>
            <Link 
              to="/astro-finance-insights/zodiac-elements/water" 
              className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
            >
              Learn more about Water signs and money
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8 mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">Zodiac Signs and Investment Preferences</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Zodiac Sign</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Risk Tolerance</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Preferred Investments</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Financial Strengths</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-2xl mr-2">♈</div>
                    <div className="text-sm font-medium text-neutral-900">Aries</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">High</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Startups, high-growth stocks, entrepreneurial ventures</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Quick decision-making, spotting opportunities</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-2xl mr-2">♉</div>
                    <div className="text-sm font-medium text-neutral-900">Taurus</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Low to Medium</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Real estate, blue-chip stocks, precious metals</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Patience, steady wealth building</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-2xl mr-2">♊</div>
                    <div className="text-sm font-medium text-neutral-900">Gemini</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Medium to High</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Tech stocks, diversified portfolios, trading</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Adaptability, information gathering</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-2xl mr-2">♋</div>
                    <div className="text-sm font-medium text-neutral-900">Cancer</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Low</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Family homes, savings accounts, insurance</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Budgeting, financial security planning</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-2xl mr-2">♌</div>
                    <div className="text-sm font-medium text-neutral-900">Leo</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Medium to High</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Luxury assets, high-profile stocks, gold</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Leadership, confidence in investments</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="text-center mt-6">
          <Link 
            to="/astro-finance-insights/zodiac-investment-guide" 
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
          >
            View Complete Zodiac Investment Guide
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
            <h3 className="text-lg font-medium text-yellow-800">Important Disclaimer</h3>
            <div className="mt-2 text-yellow-700">
              <p>
                The zodiac traits and financial characteristics described here are based on traditional astrological interpretations and are provided for entertainment and cultural interest only. Individual financial behaviors are influenced by many factors beyond astrological signs.
              </p>
              <p className="mt-2">
                Always base your financial decisions on sound financial principles, thorough research, and professional advice when needed, rather than astrological guidance alone.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Related Astro-Finance Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/astro-finance-insights/daily-horoscope" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Daily Financial Horoscope</h3>
            </div>
            <p className="text-sm text-neutral-600 mb-3">Get daily financial predictions and guidance based on your zodiac sign.</p>
            <span className="text-sm text-purple-600 font-medium">View Horoscope</span>
          </Link>
          
          <Link to="/astro-finance-insights/zodiac-compatibility" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <Users className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Zodiac Compatibility</h3>
            </div>
            <p className="text-sm text-neutral-600 mb-3">Check financial compatibility between different zodiac signs for business and investment partnerships.</p>
            <span className="text-sm text-indigo-600 font-medium">Check Compatibility</span>
          </Link>
          
          <Link to="/astro-finance-insights/numerology" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                <Hash className="h-5 w-5 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Numerology Calculator</h3>
            </div>
            <p className="text-sm text-neutral-600 mb-3">Discover your life path number and its financial implications.</p>
            <span className="text-sm text-pink-600 font-medium">Calculate Numbers</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ZodiacTraits;