import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, DollarSign, TrendingUp, AlertTriangle, CheckCircle, XCircle, Star, Users, Clock } from 'lucide-react';

export const ZodiacTraitsDetail: React.FC = () => {
  const { sign } = useParams<{ sign: string }>();
  const navigate = useNavigate();
  
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
    traits: string[];
    traitsHindi: string[];
    strengths: string[];
    strengthsHindi: string[];
    challenges: string[];
    challengesHindi: string[];
    investments: string[];
    investmentsHindi: string[];
    careers: string[];
    careersHindi: string[];
    luckyNumbers: number[];
    luckyDays: string[];
    luckyDaysHindi: string[];
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
      traits: [
        'Bold and adventurous with finances',
        'Quick decision-maker, sometimes impulsive',
        'Entrepreneurial spirit with money',
        'Competitive approach to wealth building',
        'Prefers being in control of financial decisions'
      ],
      traitsHindi: [
        'वित्त के साथ साहसी और साहसिक',
        'त्वरित निर्णय लेने वाले, कभी-कभी आवेगपूर्ण',
        'धन के साथ उद्यमी भावना',
        'धन निर्माण के प्रति प्रतिस्पर्धी दृष्टिकोण',
        'वित्तीय निर्णयों पर नियंत्रण रखना पसंद करते हैं'
      ],
      strengths: [
        'Natural leadership in financial ventures',
        'Ability to spot opportunities quickly',
        'Not afraid to take calculated risks',
        'Good at earning money',
        'Resilient after financial setbacks'
      ],
      strengthsHindi: [
        'वित्तीय उद्यमों में प्राकृतिक नेतृत्व',
        'अवसरों को जल्दी पहचानने की क्षमता',
        'सोच-समझकर जोखिम लेने से नहीं डरते',
        'पैसा कमाने में अच्छे',
        'वित्तीय झटके के बाद लचीला'
      ],
      challenges: [
        'Impulsive spending habits',
        'May not plan for the long term',
        'Can be impatient with slow-growth investments',
        'Might take unnecessary risks',
        'Sometimes neglects saving for emergencies'
      ],
      challengesHindi: [
        'आवेगपूर्ण खर्च की आदतें',
        'लंबे समय के लिए योजना नहीं बना सकते',
        'धीमी वृद्धि वाले निवेशों के साथ अधीर हो सकते हैं',
        'अनावश्यक जोखिम ले सकते हैं',
        'कभी-कभी आपातकालीन बचत की उपेक्षा करते हैं'
      ],
      investments: [
        'Startups and entrepreneurial ventures',
        'High-growth stocks',
        'Short to medium-term investments',
        'Technology and innovation sectors',
        'Real estate for quick flipping'
      ],
      investmentsHindi: [
        'स्टार्टअप और उद्यमी उद्यम',
        'उच्च विकास वाले स्टॉक',
        'अल्प से मध्यम अवधि के निवेश',
        'प्रौद्योगिकी और नवाचार क्षेत्र',
        'त्वरित फ्लिपिंग के लिए रियल एस्टेट'
      ],
      careers: [
        'Entrepreneur',
        'Sales',
        'Sports management',
        'Executive leadership',
        'Investment banking'
      ],
      careersHindi: [
        'उद्यमी',
        'बिक्री',
        'खेल प्रबंधन',
        'कार्यकारी नेतृत्व',
        'निवेश बैंकिंग'
      ],
      luckyNumbers: [1, 9, 8],
      luckyDays: ['Tuesday', 'Saturday'],
      luckyDaysHindi: ['मंगलवार', 'शनिवार']
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
      traits: [
        'Security-focused financial approach',
        'Patient and steady wealth builder',
        'Values quality and durability in purchases',
        'Practical and grounded money management',
        'Resistant to financial risks'
      ],
      traitsHindi: [
        'सुरक्षा-केंद्रित वित्तीय दृष्टिकोण',
        'धैर्यवान और स्थिर धन निर्माता',
        'खरीदारी में गुणवत्ता और टिकाऊपन को महत्व देते हैं',
        'व्यावहारिक और जमीनी धन प्रबंधन',
        'वित्तीय जोखिमों के प्रति प्रतिरोधी'
      ],
      strengths: [
        'Excellent at saving money',
        'Strong financial discipline',
        'Good at identifying quality investments',
        'Persistent in building wealth',
        'Rarely makes impulsive financial decisions'
      ],
      strengthsHindi: [
        'पैसा बचाने में उत्कृष्ट',
        'मजबूत वित्तीय अनुशासन',
        'गुणवत्तापूर्ण निवेश की पहचान करने में अच्छे',
        'धन निर्माण में दृढ़',
        'शायद ही कभी आवेगपूर्ण वित्तीय निर्णय लेते हैं'
      ],
      challenges: [
        'Can be too conservative with investments',
        'May miss growth opportunities due to caution',
        'Sometimes stubborn about financial strategies',
        'Can be resistant to financial change',
        'May overspend on luxury items'
      ],
      challengesHindi: [
        'निवेश के साथ बहुत रूढ़िवादी हो सकते हैं',
        'सावधानी के कारण विकास के अवसरों को याद कर सकते हैं',
        'कभी-कभी वित्तीय रणनीतियों के बारे में जिद्दी',
        'वित्तीय परिवर्तन के प्रति प्रतिरोधी हो सकते हैं',
        'विलासिता की वस्तुओं पर अधिक खर्च कर सकते हैं'
      ],
      investments: [
        'Real estate and property',
        'Blue-chip stocks',
        'Long-term fixed deposits',
        'Government bonds',
        'Precious metals, especially gold'
      ],
      investmentsHindi: [
        'रियल एस्टेट और संपत्ति',
        'ब्लू-चिप स्टॉक',
        'दीर्घकालिक सावधि जमा',
        'सरकारी बांड',
        'कीमती धातुएं, विशेष रूप से सोना'
      ],
      careers: [
        'Banking',
        'Real estate',
        'Agriculture',
        'Luxury goods',
        'Financial planning'
      ],
      careersHindi: [
        'बैंकिंग',
        'रियल एस्टेट',
        'कृषि',
        'विलासिता की वस्तुएं',
        'वित्तीय नियोजन'
      ],
      luckyNumbers: [2, 6, 9],
      luckyDays: ['Friday', 'Monday'],
      luckyDaysHindi: ['शुक्रवार', 'सोमवार']
    },
    // Add more zodiac signs as needed
  };
  
  // If sign doesn't exist in our data, redirect to main zodiac page
  if (!sign || !zodiacData[sign]) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Zodiac Sign Not Found</h1>
        <p className="text-neutral-600 mb-8">The zodiac sign you're looking for doesn't exist or may have been moved.</p>
        <button 
          onClick={() => navigate('/astro-finance-insights/zodiac-traits')}
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
          onClick={() => navigate('/astro-finance-insights/zodiac-traits')} 
          className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to All Zodiac Signs</span>
        </button>
      </div>
      
      <div className="mb-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <div className="text-7xl text-white">{data.symbol}</div>
          </div>
          
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl font-bold text-neutral-900">{data.name}</h1>
              <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {data.element} Sign
              </div>
            </div>
            <p className="text-xl text-neutral-600 mb-4">{data.date}</p>
            <p className="text-neutral-600 mb-4">
              Ruling Planet: <span className="font-medium">{data.ruling}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {data.luckyNumbers.map((num) => (
                <span key={num} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  Lucky Number: {num}
                </span>
              ))}
              {data.luckyDays.map((day) => (
                <span key={day} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  Lucky Day: {day}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6 flex items-center">
              <DollarSign className="h-6 w-6 text-purple-600 mr-2" />
              Financial Personality
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-neutral-900 mb-3">Key Financial Traits</h3>
                <ul className="space-y-3">
                  {data.traits.map((trait, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span className="text-neutral-700">{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-green-800 mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Financial Strengths
                  </h3>
                  <ul className="space-y-2">
                    {data.strengths.map((strength, index) => (
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
                    Financial Challenges
                  </h3>
                  <ul className="space-y-2">
                    {data.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">•</span>
                        <span className="text-red-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 text-purple-600 mr-2" />
              Investment Profile
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-neutral-900 mb-3">Preferred Investments</h3>
                <p className="text-neutral-600 mb-4">
                  {data.name} typically gravitates toward these types of investments:
                </p>
                <ul className="space-y-3">
                  {data.investments.map((investment, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span className="text-neutral-700">{investment}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-neutral-900 mb-3">Financial Career Paths</h3>
                <p className="text-neutral-600 mb-4">
                  Career fields where {data.name} often excels financially:
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.careers.map((career, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {career}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Financial Advice for {data.name}</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-neutral-900 mb-3">Money Management Tips</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    <span className="text-neutral-700">
                      {sign === 'aries' && "Balance your natural risk-taking with some conservative investments for stability"}
                      {sign === 'taurus' && "Consider allocating a small portion of your portfolio to higher-growth investments"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    <span className="text-neutral-700">
                      {sign === 'aries' && "Set up automatic savings to counter impulsive spending tendencies"}
                      {sign === 'taurus' && "Review your investment strategy periodically to ensure it's not too conservative"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    <span className="text-neutral-700">
                      {sign === 'aries' && "Consider working with a financial advisor who can help channel your energy into strategic investments"}
                      {sign === 'taurus' && "Build a diverse emergency fund to satisfy your need for security"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    <span className="text-neutral-700">
                      {sign === 'aries' && "Create a 'fun money' account for impulse purchases to protect your main savings"}
                      {sign === 'taurus' && "Don't let your resistance to change prevent you from adapting to new financial opportunities"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    <span className="text-neutral-700">
                      {sign === 'aries' && "Focus on developing patience with long-term investments"}
                      {sign === 'taurus' && "Use your natural patience to your advantage with long-term, compound-growth investments"}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-neutral-900 mb-3">Wealth Building Strategy</h3>
                <p className="text-neutral-600 mb-4">
                  {sign === 'aries' && "For Aries, the ideal wealth-building strategy combines your natural entrepreneurial spirit with structured planning. Consider a 70/30 approach: 70% of your investments in growth-oriented assets that satisfy your need for action and results, and 30% in stable, long-term investments that provide security."}
                  {sign === 'taurus' && "For Taurus, the ideal wealth-building strategy leverages your patience and stability. A diversified portfolio with emphasis on tangible assets like real estate and precious metals aligns with your need for security, while adding a small allocation to growth investments can help accelerate your wealth building."}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">Compatibility</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-purple-800 mb-2">Best Financial Partnerships</h4>
                  <div className="flex flex-wrap gap-2">
                    {sign === 'aries' && (
                      <>
                        <Link to="/astro-finance-insights/zodiac-traits/leo\" className=\"px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                          <span className="mr-1">♌</span> Leo
                        </Link>
                        <Link to="/astro-finance-insights/zodiac-traits/sagittarius" className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                          <span className="mr-1">♐</span> Sagittarius
                        </Link>
                        <Link to="/astro-finance-insights/zodiac-traits/aquarius" className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                          <span className="mr-1">♒</span> Aquarius
                        </Link>
                      </>
                    )}
                    {sign === 'taurus' && (
                      <>
                        <Link to="/astro-finance-insights/zodiac-traits/virgo" className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                          <span className="mr-1">♍</span> Virgo
                        </Link>
                        <Link to="/astro-finance-insights/zodiac-traits/capricorn" className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                          <span className="mr-1">♑</span> Capricorn
                        </Link>
                        <Link to="/astro-finance-insights/zodiac-traits/cancer" className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                          <span className="mr-1">♋</span> Cancer
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-purple-800 mb-2">Challenging Financial Partnerships</h4>
                  <div className="flex flex-wrap gap-2">
                    {sign === 'aries' && (
                      <>
                        <Link to="/astro-finance-insights/zodiac-traits/cancer\" className=\"px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                          <span className="mr-1">♋</span> Cancer
                        </Link>
                        <Link to="/astro-finance-insights/zodiac-traits/capricorn" className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                          <span className="mr-1">♑</span> Capricorn
                        </Link>
                      </>
                    )}
                    {sign === 'taurus' && (
                      <>
                        <Link to="/astro-finance-insights/zodiac-traits/leo" className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                          <span className="mr-1">♌</span> Leo
                        </Link>
                        <Link to="/astro-finance-insights/zodiac-traits/aquarius" className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                          <span className="mr-1">♒</span> Aquarius
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                
                <Link 
                  to="/astro-finance-insights/zodiac-compatibility" 
                  className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
                >
                  View detailed compatibility
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Financial Forecast</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-neutral-800 mb-2">Current Period (2025)</h4>
                  <p className="text-neutral-600 text-sm">
                    {sign === 'aries' && "With Jupiter in your financial sector for most of 2025, this is a year of expansion and opportunity. New income streams may present themselves, particularly in technology or entrepreneurial ventures. Be cautious during Mercury retrograde periods in April and August."}
                    {sign === 'taurus' && "Venus, your ruling planet, brings favorable financial aspects in 2025, especially from March to July. Property investments and long-term savings plans are particularly favored. A financial review in September could reveal overlooked opportunities."}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-neutral-800 mb-2">Favorable Periods for Financial Decisions</h4>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    {sign === 'aries' && (
                      <>
                        <li><strong>January 15 - February 20:</strong> Excellent for new investments</li>
                        <li><strong>May 10 - June 15:</strong> Favorable for career advancement and income growth</li>
                        <li><strong>September 5 - October 10:</strong> Good period for financial partnerships</li>
                      </>
                    )}
                    {sign === 'taurus' && (
                      <>
                        <li><strong>February 10 - March 25:</strong> Excellent for property investments</li>
                        <li><strong>June 5 - July 20:</strong> Favorable for savings and financial planning</li>
                        <li><strong>October 15 - November 20:</strong> Good period for passive income opportunities</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <Link 
                  to="/astro-finance-insights/daily-horoscope" 
                  className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
                >
                  View today's financial horoscope
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-1">Disclaimer</h4>
                  <p className="text-sm text-yellow-700">
                    This information is provided for entertainment purposes only. Financial decisions should be based on sound financial principles and professional advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8 mb-16">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6 text-center">Other Zodiac Financial Profiles</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Link to="/astro-finance-insights/zodiac-traits/aries" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'aries' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♈</div>
            <span className="font-medium text-neutral-900">Aries</span>
          </Link>
          <Link to="/astro-finance-insights/zodiac-traits/taurus" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'taurus' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♉</div>
            <span className="font-medium text-neutral-900">Taurus</span>
          </Link>
          <Link to="/astro-finance-insights/zodiac-traits/gemini" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'gemini' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♊</div>
            <span className="font-medium text-neutral-900">Gemini</span>
          </Link>
          <Link to="/astro-finance-insights/zodiac-traits/cancer" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'cancer' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♋</div>
            <span className="font-medium text-neutral-900">Cancer</span>
          </Link>
          <Link to="/astro-finance-insights/zodiac-traits/leo" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'leo' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♌</div>
            <span className="font-medium text-neutral-900">Leo</span>
          </Link>
          <Link to="/astro-finance-insights/zodiac-traits/virgo" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'virgo' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♍</div>
            <span className="font-medium text-neutral-900">Virgo</span>
          </Link>
          <Link to="/astro-finance-insights/zodiac-traits/libra" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'libra' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♎</div>
            <span className="font-medium text-neutral-900">Libra</span>
          </Link>
          <Link to="/astro-finance-insights/zodiac-traits/scorpio" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'scorpio' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♏</div>
            <span className="font-medium text-neutral-900">Scorpio</span>
          </Link>
          <Link to="/astro-finance-insights/zodiac-traits/sagittarius" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'sagittarius' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♐</div>
            <span className="font-medium text-neutral-900">Sagittarius</span>
          </Link>
          <Link to="/astro-finance-insights/zodiac-traits/capricorn" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'capricorn' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♑</div>
            <span className="font-medium text-neutral-900">Capricorn</span>
          </Link>
          <Link to="/astro-finance-insights/zodiac-traits/aquarius" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'aquarius' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♒</div>
            <span className="font-medium text-neutral-900">Aquarius</span>
          </Link>
          <Link to="/astro-finance-insights/zodiac-traits/pisces" className={`text-center p-4 rounded-lg hover:bg-purple-50 transition-colors ${sign === 'pisces' ? 'bg-purple-100' : ''}`}>
            <div className="text-3xl mb-2">♓</div>
            <span className="font-medium text-neutral-900">Pisces</span>
          </Link>
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
          
          <Link to="/astro-finance-insights/muhurat-finder" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Muhurat Finder</h3>
            </div>
            <p className="text-sm text-neutral-600 mb-3">Find auspicious times for important financial decisions like investments and business launches.</p>
            <span className="text-sm text-green-600 font-medium">Find Muhurat</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ZodiacTraitsDetail;