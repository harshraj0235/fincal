import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, HelpCircle, Calculator, BookOpen, MessageSquare, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

export const HelpCenter: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqData = [
    {
      question: "How do I use the EMI calculator?",
      answer: "The EMI calculator is simple to use. Enter your loan amount, interest rate, and loan tenure. The calculator will automatically compute your monthly EMI, total interest payable, and total amount. You can also see the amortization schedule showing the principal and interest breakdown for each month."
    },
    {
      question: "Are the calculator results accurate?",
      answer: "Yes, our calculators use standard financial formulas and are regularly updated to reflect current market conditions. However, results are for educational purposes only and should not be considered as financial advice. Always consult with a qualified financial advisor for important decisions."
    },
    {
      question: "Do I need to create an account to use calculators?",
      answer: "No, you don't need to create an account to use our calculators. All our tools are completely free and accessible without registration. Your data is processed locally in your browser and is not stored on our servers."
    },
    {
      question: "How often is the content updated?",
      answer: "We regularly update our calculators and content to reflect changes in tax laws, interest rates, and financial regulations. Major updates are typically made quarterly, while minor corrections and improvements are made as needed."
    },
    {
      question: "Can I suggest new calculators or features?",
      answer: "Absolutely! We love hearing from our users. You can suggest new calculators, report bugs, or provide feedback through our contact form. We review all suggestions and implement the most requested features."
    },
    {
      question: "Is my financial data secure?",
      answer: "Yes, we take your privacy seriously. All calculations are performed locally in your browser, and we don't store any of your personal financial information. We use industry-standard security measures to protect our website and your browsing experience."
    },
    {
      question: "How do I calculate my income tax?",
      answer: "Use our Income Tax Calculator by entering your annual income, deductions, and other relevant details. The calculator supports both old and new tax regimes and will show you the tax liability under both systems so you can choose the more beneficial one."
    },
    {
      question: "What is the difference between SIP and lumpsum investment?",
      answer: "SIP (Systematic Investment Plan) involves investing a fixed amount regularly, while lumpsum investment is a one-time investment. SIP helps in rupee cost averaging and reduces market timing risk. Use our SIP vs Lumpsum calculator to compare both approaches."
    }
  ];

  const helpCategories = [
    {
      title: "Calculators & Tools",
      description: "Learn how to use our financial calculators effectively",
      icon: Calculator,
      color: "from-blue-500 to-blue-600",
      topics: ["EMI Calculator", "SIP Calculator", "Tax Calculator", "Investment Tools"],
      link: "/calculators"
    },
    {
      title: "Educational Content",
      description: "Access our comprehensive financial education resources",
      icon: BookOpen,
      color: "from-green-500 to-green-600",
      topics: ["Personal Finance", "Investment Guide", "Tax Planning", "Retirement Planning"],
      link: "/blog"
    },
    {
      title: "Technical Support",
      description: "Get help with technical issues and website problems",
      icon: HelpCircle,
      color: "from-purple-500 to-purple-600",
      topics: ["Browser Issues", "Mobile App", "Performance", "Accessibility"],
      link: "/contact-us"
    },
    {
      title: "Account & Billing",
      description: "Manage your account and understand our services",
      icon: MessageSquare,
      color: "from-orange-500 to-orange-600",
      topics: ["Free Services", "Privacy Policy", "Terms of Service", "Data Protection"],
      link: "/privacy-policy"
    }
  ];

  const contactMethods = [
    {
      title: "Email Support",
      description: "Get detailed help via email",
      icon: Mail,
      contact: "support@moneycal.in",
      responseTime: "Within 24 hours",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Contact Form",
      description: "Send us your questions directly",
      icon: MessageSquare,
      contact: "Contact Form",
      responseTime: "Within 24 hours",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Phone Support",
      description: "Speak with our support team",
      icon: Phone,
      contact: "+91 1234 567 890",
      responseTime: "Mon-Fri, 9 AM - 6 PM",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const filteredFAQs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SEOHelmet
        title="Help Center - Get Support & Learn How to Use MoneyCal.in"
        description="Get help with MoneyCal.in calculators, learn how to use our tools, and find answers to frequently asked questions. Comprehensive support for all your financial planning needs."
        keywords="help center, support, FAQ, calculator help, financial tools support, customer service, user guide"
        url="/help-center"
        type="website"
        image="/images/help-center.jpg"
        tags={["help", "support", "FAQ", "user guide", "customer service"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </button>
          </div>

          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <HelpCircle className="h-16 w-16 text-blue-600 mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
                Help Center
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Find answers to your questions, learn how to use our tools, and get the support you need to make the most of MoneyCal.in
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for help topics, calculators, or questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-4 pl-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-lg"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Help Categories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How Can We Help You?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {helpCategories.map((category, index) => (
                <Link
                  key={index}
                  to={category.link}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all transform hover:-translate-y-1 block"
                >
                  <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.topics.map((topic, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto">
              {filteredFAQs.length > 0 ? (
                <div className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200">
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                        {expandedFAQ === index ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedFAQ === index && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try searching with different keywords or browse our help categories above.</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Methods */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
                  <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mx-auto mb-4`}>
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <div className="mb-4">
                    <p className="font-semibold text-gray-800">{method.contact}</p>
                    <p className="text-sm text-gray-500">{method.responseTime}</p>
                  </div>
                  {method.title === "Contact Form" ? (
                    <Link 
                      to="/contact-us"
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Contact Us
                    </Link>
                  ) : method.title === "Email Support" ? (
                    <a 
                      href={`mailto:${method.contact}`}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium block"
                    >
                      Send Email
                    </a>
                  ) : (
                    <a 
                      href={`tel:${method.contact}`}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium block"
                    >
                      Call Now
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Links</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/calculators/emi-calculator" className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Calculator className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-blue-800">EMI Calculator</p>
              </Link>
              <Link to="/calculators/income-tax-calculator" className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <Calculator className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-800">Tax Calculator</p>
              </Link>
              <Link to="/blog" className="text-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-purple-800">Blog</p>
              </Link>
              <Link to="/privacy-policy" className="text-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <HelpCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-orange-800">Privacy Policy</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCenter;
