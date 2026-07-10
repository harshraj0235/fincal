import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Home, ChevronRight, ExternalLink, Gift, CheckCircle, AlertCircle, Share2, Flame, ChefHat, Timer, Users } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const ChhathPujaPrasadRecipes: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <SEOHelmet
        title={`छठ पूजा के पारंपरिक प्रसाद: ठेकुआ, गुड़ की खीर, नारियल प्रसाद रेसिपी | Chhath Puja Prasad Recipes ${currentYear}`}
        description={`छठ पूजा ${currentYear} के लिए पारंपरिक प्रसाद बनाने की विधि: ठेकुआ रेसिपी (घी, गुड़, आटा), गुड़ की खीर, नारियल लड्डू, गन्ने का रस प्रसाद। स्टेप-बाय-स्टेप फोटो के साथ। बिहारी, मैथिली पारंपरिक व्यंजन। 100% शुद्ध शाकाहारी।`}
        keywords={`छठ पूजा प्रसाद रेसिपी ${currentYear}, ठेकुआ कैसे बनाएं, chhath prasad recipes, गुड़ की खीर विधि, छठ के ठेकुआ, बिहारी ठेकुआ रेसिपी, नारियल प्रसाद, गन्ना प्रसाद, छठ का खाना, पारंपरिक छठ व्यंजन`}
        canonicalUrl={`/blog/chhath-puja-prasad-recipes-${currentYear}`}
      />

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        <div className="bg-white/80 backdrop-blur-sm border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-orange-600 hover:text-orange-800 flex items-center gap-1">
                <Home className="w-4 h-4" />
                होम
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to="/blog" reloadDocument className="text-orange-600 hover:text-orange-800">
                ब्लॉग
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 font-medium">छठ पूजा प्रसाद रेसिपी</span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full mb-6 font-bold shadow-lg">
              <ChefHat className="w-5 h-5" />
              पारंपरिक व्यंजन
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 mb-6 leading-tight">
              छठ पूजा के पारंपरिक प्रसाद
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
              ठेकुआ, खीर और अन्य पवित्र प्रसाद बनाने की विधि
            </p>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
            <div className="prose prose-lg max-w-none">
              
              {/* Thekua Recipe */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-2xl border-2 border-orange-200 mb-12">
                <h2 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <Gift className="w-10 h-10 text-orange-600" />
                  ठेकुआ (छठ का मुख्य प्रसाद)
                </h2>
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">सामग्री (लगभग 50 ठेकुआ के लिए):</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6">
                      <h4 className="font-bold text-orange-900 mb-3">मुख्य सामग्री:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex justify-between">
                          <span>गेहूं का आटा</span>
                          <span className="font-bold">500 ग्राम</span>
                        </li>
                        <li className="flex justify-between">
                          <span>गुड़ (देसी)</span>
                          <span className="font-bold">250 ग्राम</span>
                        </li>
                        <li className="flex justify-between">
                          <span>शुद्ध घी</span>
                          <span className="font-bold">200 ग्राम</span>
                        </li>
                        <li className="flex justify-between">
                          <span>नारियल (कद्दूकस)</span>
                          <span className="font-bold">100 ग्राम</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-6">
                      <h4 className="font-bold text-orange-900 mb-3">मसाले:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex justify-between">
                          <span>सौंफ</span>
                          <span className="font-bold">2 बड़ा चम्मच</span>
                        </li>
                        <li className="flex justify-between">
                          <span>इलायची पाउडर</span>
                          <span className="font-bold">1 चम्मच</span>
                        </li>
                        <li className="flex justify-between">
                          <span>काली मिर्च (पिसी)</span>
                          <span className="font-bold">½ चम्मच</span>
                        </li>
                        <li className="flex justify-between">
                          <span>दूध</span>
                          <span className="font-bold">4-5 चम्मच</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Timer className="w-6 h-6 text-orange-600" />
                    ठेकुआ बनाने की विधि:
                  </h3>
                  <div className="space-y-6">
                    {[
                      {
                        step: 1,
                        title: 'गुड़ की चाशनी बनाना',
                        desc: 'गुड़ को बारीक तोड़ लें और थोड़े पानी में पकाएं। जब गुड़ पूरी तरह पिघल जाए और गाढ़ा हो जाए तो उतार लें। चाशनी को छान लें ताकि कोई अशुद्धि न रहे।'
                      },
                      {
                        step: 2,
                        title: 'आटा तैयार करना',
                        desc: 'गेहूं के आटे को अच्छी तरह छान लें। आटे में घी डालकर अच्छे से मिलाएं। घी इतना डालें कि आटा भुरभुरा हो जाए और मुट्ठी में दबाने पर आकार बन जाए।'
                      },
                      {
                        step: 3,
                        title: 'मसाले मिलाना',
                        desc: 'सौंफ, इलायची, काली मिर्च और नारियल कद्दूकस को अच्छे से मिला लें। इन सभी को आटे में मिलाएं। हल्का सा दूध डालकर और मिलाएं।'
                      },
                      {
                        step: 4,
                        title: 'आटा गूंथना',
                        desc: 'गुड़ की चाशनी को आटे में डालें और अच्छे से गूंथ लें। ध्यान रखें कि आटा ज्यादा नरम न हो। आटे को 2-3 घंटे के लिए ढककर रख दें।'
                      },
                      {
                        step: 5,
                        title: 'आकार देना',
                        desc: 'आटे के छोटे-छोटे लड्डू बना लें। हथेली पर रखकर गोल या अंडाकार आकार दें। बीच में हल्का सा दबाकर डिजाइन बना सकते हैं।'
                      },
                      {
                        step: 6,
                        title: 'तलना',
                        desc: 'कड़ाई में घी गर्म करें। मध्यम आंच पर ठेकुआ तलें। दोनों तरफ से सुनहरा भूरा होने तक तलें। जल्दबाजी न करें, धीमी आंच बेहतर है।'
                      }
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 bg-orange-50 p-5 rounded-xl border-2 border-orange-200">
                        <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-black text-lg">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h4>
                          <p className="text-gray-700">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-green-900 mb-2">सफल ठेकुआ के लिए टिप्स:</p>
                        <ul className="space-y-1 text-gray-700 text-sm">
                          <li>• आटा गूंथने के बाद 2-3 घंटे जरूर रखें</li>
                          <li>• घी गर्म होने पर आंच मध्यम कर लें</li>
                          <li>• एक बार में ज्यादा ठेकुआ न तलें</li>
                          <li>• तले हुए ठेकुआ को किचन टॉवल पर रखें</li>
                          <li>• ठंडा होने पर डिब्बे में रखें</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kheer Recipe */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200 mb-12">
                <h2 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <Flame className="w-10 h-10 text-purple-600" />
                  गुड़ की खीर (खरना प्रसाद)
                </h2>

                <div className="bg-white rounded-xl p-6 mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">सामग्री (4-5 लोगों के लिए):</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex justify-between bg-purple-50 p-3 rounded-lg">
                        <span>चावल (अरवा)</span>
                        <span className="font-bold">200 ग्राम</span>
                      </li>
                      <li className="flex justify-between bg-purple-50 p-3 rounded-lg">
                        <span>दूध (गाय का)</span>
                        <span className="font-bold">1 लीटर</span>
                      </li>
                      <li className="flex justify-between bg-purple-50 p-3 rounded-lg">
                        <span>गुड़ (पिसा हुआ)</span>
                        <span className="font-bold">250 ग्राम</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex justify-between bg-purple-50 p-3 rounded-lg">
                        <span>इलायची</span>
                        <span className="font-bold">4-5</span>
                      </li>
                      <li className="flex justify-between bg-purple-50 p-3 rounded-lg">
                        <span>काजू</span>
                        <span className="font-bold">20-25</span>
                      </li>
                      <li className="flex justify-between bg-purple-50 p-3 rounded-lg">
                        <span>किशमिश</span>
                        <span className="font-bold">25-30</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Flame className="w-6 h-6 text-purple-600" />
                    खीर बनाने की विधि:
                  </h3>
                  <ol className="space-y-4 list-decimal list-inside text-gray-700 text-lg">
                    <li className="leading-relaxed">
                      चावल को अच्छी तरह धो लें और 30 मिनट के लिए भिगो दें
                    </li>
                    <li className="leading-relaxed">
                      एक भारी तले की कड़ाई में दूध उबालें। उबाल आने पर भीगे चावल डालें
                    </li>
                    <li className="leading-relaxed">
                      धीमी आंच पर पकाएं और बीच-बीच में चलाते रहें ताकि दूध जले नहीं
                    </li>
                    <li className="leading-relaxed">
                      जब चावल पूरी तरह पक जाएं और दूध गाढ़ा हो जाए, तो गुड़ डालें
                    </li>
                    <li className="leading-relaxed">
                      गुड़ डालने के बाद 5-7 मिनट और पकाएं। गुड़ अच्छे से घुल जाना चाहिए
                    </li>
                    <li className="leading-relaxed">
                      इलायची पाउडर मिलाएं और आंच बंद कर दें
                    </li>
                    <li className="leading-relaxed">
                      अलग से घी में काजू-किशमिश भूनें और खीर में मिलाएं
                    </li>
                  </ol>

                  <div className="mt-6 bg-purple-100 rounded-lg p-6">
                    <h4 className="font-bold text-purple-900 mb-3">खीर बनाते समय ध्यान दें:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span>खीर को धीमी आंच पर ही पकाएं, जल्दबाजी न करें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span>गुड़ की मात्रा अपनी पसंद अनुसार बढ़ा-घटा सकते हैं</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span>खीर ज्यादा गाढ़ी न हो, थोड़ी पतली रखें</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span>खरना वाले दिन ताजा बनाएं, पुरानी न खाएं</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Other Prasad Items */}
              <div className="mb-12">
                <h2 className="text-4xl font-black text-gray-900 mb-8">अन्य पारंपरिक प्रसाद</h2>
                <div className="grid gap-6">
                  {[
                    {
                      name: 'नारियल लड्डू',
                      ingredients: ['नारियल कद्दूकस - 2 कप', 'गुड़ - 1 कप', 'घी - 2 चम्मच', 'इलायची - 3-4'],
                      method: 'गुड़ को पानी में पकाकर एक तार की चाशनी बना लें। नारियल मिलाएं और गाढ़ा होने तक पकाएं। ठंडा होने पर लड्डू बना लें।'
                    },
                    {
                      name: 'चावल का लड्डू',
                      ingredients: ['चावल का आटा - 2 कप', 'गुड़ - 1 कप', 'घी - 4 चम्मच', 'सौंफ - 1 चम्मच'],
                      method: 'चावल के आटे को घी में सेंक लें। गुड़ की चाशनी में मिलाएं। गर्म-गर्म लड्डू बना लें। ठंडा होने पर रख लें।'
                    },
                    {
                      name: 'केला भात',
                      ingredients: ['पके केले - 4', 'दूध - 500 मिली', 'चावल - 1 कप', 'गुड़ - आवश्यकतानुसार'],
                      method: 'केले को मसल लें। दूध में चावल पकाएं। केला और गुड़ मिलाएं। मिठास अनुसार गुड़ बढ़ाएं या घटाएं।'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.name}</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4">
                          <h4 className="font-bold text-green-900 mb-2">सामग्री:</h4>
                          <ul className="space-y-1 text-sm text-gray-700">
                            {item.ingredients.map((ing, i) => (
                              <li key={i}>• {ing}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <h4 className="font-bold text-green-900 mb-2">विधि:</h4>
                          <p className="text-sm text-gray-700 leading-relaxed">{item.method}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Storage Tips */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl border-2 border-blue-200 mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6">प्रसाद को स्टोर कैसे करें?</h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    छठ पूजा के प्रसाद को सही तरीके से स्टोर करना जरूरी है ताकि वह ताजा और स्वादिष्ट बना रहे:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6">
                      <h3 className="font-bold text-blue-900 mb-3">ठेकुआ स्टोरेज:</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• एयरटाइट डिब्बे में रखें</li>
                        <li>• ठंडा होने के बाद ही रखें</li>
                        <li>• सूखी जगह पर रखें</li>
                        <li>• 15-20 दिन तक ताजा रहता है</li>
                        <li>• फ्रिज में रखने की जरूरत नहीं</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-6">
                      <h3 className="font-bold text-blue-900 mb-3">खीर स्टोरेज:</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• फ्रिज में रखें</li>
                        <li>• 2-3 दिन में खत्म करें</li>
                        <li>• गर्म करके खाएं</li>
                        <li>• ढककर रखें</li>
                        <li>• खराब होने पर न खाएं</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Links */}
              <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">संबंधित आर्टिकल</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link to="/blog/chhath-puja-2025-schedule" reloadDocument className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-lg transition-all group">
                    <Calendar className="w-6 h-6 text-orange-600" />
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-orange-600">छठ पूजा कार्यक्रम</div>
                      <div className="text-sm text-gray-600">पूर्ण तिथियां</div>
                    </div>
                  </Link>
                  <Link to="/blog/chhath-puja-preparation-guide" reloadDocument className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-lg transition-all group">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-purple-600">तैयारी गाइड</div>
                      <div className="text-sm text-gray-600">पूजा की तैयारी</div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* External Links */}
              <div className="bg-blue-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">बाहरी संदर्भ</h2>
                <div className="space-y-3">
                  <a href="https://hi.wikipedia.org/wiki/छठ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold">
                    <ExternalLink className="w-5 h-5" />
                    छठ पूजा - विकिपीडिया
                  </a>
                  <a href="https://www.india.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold">
                    <ExternalLink className="w-5 h-5" />
                    भारत सरकार
                  </a>
                </div>
              </div>

              {/* Conclusion */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-2xl border-2 border-orange-200">
                <h2 className="text-3xl font-black text-gray-900 mb-6">निष्कर्ष</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  छठ पूजा के प्रसाद बनाना एक पवित्र और आनंददायक कार्य है। ठेकुआ, गुड़ की खीर और अन्य प्रसाद बनाते समय शुद्धता और भक्ति भाव रखना सबसे महत्वपूर्ण है। इन पारंपरिक व्यंजनों को बनाने में समय लगता है, इसलिए धैर्य रखें और प्रेम से बनाएं।
                </p>
                <p className="text-gray-700 text-lg leading-relaxed font-bold text-center mt-6">
                  छठी मैया आपके परिवार को सुख-समृद्धि दें! 🙏
                </p>
              </div>

              {/* Share */}
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">रेसिपी पसंद आई?</h3>
                <p className="text-gray-600 mb-6">शेयर करें</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    WhatsApp
                  </button>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-600 mt-8">
            <p>लेखक: MoneyCal.in टीम | प्रकाशित: {new Date().toLocaleDateString('hi-IN')}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChhathPujaPrasadRecipes;




