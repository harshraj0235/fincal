import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, Target, Calculator, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

export const AboutUs: React.FC = () => {
  const navigate = useNavigate();
  
// Ad scripts are handled centrally with consent in App.tsx
  
  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
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
      
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">About MoneyCal India</h1>
        <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
          MoneyCal India is India's most comprehensive financial calculator platform, empowering millions of Indians to make informed financial decisions through accurate calculations, educational resources, and expert insights. Since our launch, we've helped over 500,000 users plan their financial future with our free tools and calculators.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link to="/blog" className="text-blue-600 underline hover:text-blue-800 font-medium">Financial Blog</Link>
          <span className="text-gray-400">•</span>
          <Link to="/calculators/emi-calculator" className="text-blue-600 underline hover:text-blue-800 font-medium">EMI Calculator</Link>
          <span className="text-gray-400">•</span>
          <Link to="/tax-tools" className="text-blue-600 underline hover:text-blue-800 font-medium">Tax Tools</Link>
          <span className="text-gray-400">•</span>
          <Link to="/finance-tools" className="text-blue-600 underline hover:text-blue-800 font-medium">Investment Tools</Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
            <Target className="h-6 w-6 text-primary-600 mr-2" />
            Our Mission
          </h2>
          <p className="text-lg text-neutral-700 mb-4">
            At MoneyCal India, my mission is to democratize financial literacy and empower every Indian to take control of their financial future. I believe that accurate calculations are the foundation of sound financial decisions.
          </p>
          <p className="text-lg text-neutral-700">
            I'm committed to providing free, accessible, and user-friendly financial calculators tailored specifically for the Indian context, taking into account local tax laws, investment options, and financial products.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
            <Award className="h-6 w-6 text-primary-600 mr-2" />
            Our Values
          </h2>
          <ul className="space-y-4">
            <li className="flex">
              <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0 mt-1 mr-3">1</span>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Accuracy</h3>
                <p className="text-neutral-700">We prioritize precision in our calculators, ensuring you get reliable results for your financial planning.</p>
              </div>
            </li>
            <li className="flex">
              <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0 mt-1 mr-3">2</span>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Accessibility</h3>
                <p className="text-neutral-700">Financial tools should be available to everyone, regardless of their financial background or expertise.</p>
              </div>
            </li>
            <li className="flex">
              <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0 mt-1 mr-3">3</span>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Education</h3>
                <p className="text-neutral-700">We believe in not just providing tools but also educating users about financial concepts and best practices.</p>
              </div>
            </li>
            <li className="flex">
              <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0 mt-1 mr-3">4</span>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Innovation</h3>
                <p className="text-neutral-700">We continuously improve our calculators and add new ones to address evolving financial needs.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center flex items-center justify-center">
          <Calculator className="h-6 w-6 text-primary-600 mr-2" />
          My Story
        </h2>
        <div className="bg-white rounded-xl shadow-md p-8">
          <p className="text-lg text-neutral-700 mb-4">
            Hi, I'm Harsh Raj, the creator of MoneyCal India. As a B.Tech graduate and software engineer, I started MoneyCal to make finance simple and accessible for everyone. I noticed that while there are many financial calculators online, very few are truly tailored for the Indian context or provide clear, educational content.
          </p>
          <p className="text-lg text-neutral-700 mb-4">
            My goal is to help you make better financial decisions by providing accurate calculators and easy-to-understand guides. All the content I share is for educational purposes only—I'm not a financial expert, so please consult authorized professionals for any financial advice.
          </p>
          <p className="text-lg text-neutral-700">
            Explore my <Link to="/blog" className="text-blue-600 underline hover:text-blue-800">blog</Link> for the latest educational articles, or try out the <Link to="/calculators/emi-calculator" className="text-blue-600 underline hover:text-blue-800">EMI Calculator</Link> and other tools. Want to know more about me? <Link to="/author/harsh-raj" className="text-blue-600 underline hover:text-blue-800">View my full profile</Link>.
          </p>
        </div>
      </div>

      {/* About Me Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center flex items-center justify-center">
          <User className="h-6 w-6 text-primary-600 mr-2" />
          About Me
        </h2>
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
          <div className="text-center">
            <h3 className="text-xl font-bold text-green-800 mb-2">Harsh Raj</h3>
            <p className="text-neutral-700 mb-4">
              Harsh Raj is a B.Tech graduate and Software Engineer with a passion for finance education. I love exploring financial concepts and sharing educational content to help others understand complex financial topics.
            </p>
            <div className="flex justify-center gap-4 mb-4">
              <a
                href="https://www.linkedin.com/in/harshitpatel9/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:underline font-medium"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/harshitx9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline font-medium"
              >
                Twitter (X)
              </a>
            </div>
            <Link 
              to="/author/harsh-raj" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Full Profile
            </Link>
          </div>
        </div>
      </div>
      
      {/* Our Impact Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Our Impact & Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">500K+</div>
            <div className="text-gray-600">Users Helped</div>
            <p className="text-sm text-gray-500 mt-2">Monthly active users planning their financial future</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600">Financial Tools</div>
            <p className="text-sm text-gray-500 mt-2">Comprehensive calculators for all financial needs</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
            <div className="text-gray-600">Educational Articles</div>
            <p className="text-sm text-gray-500 mt-2">In-depth guides and financial insights</p>
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Financial Calculators</h3>
            <p className="text-gray-600 mb-4">Comprehensive suite of calculators including EMI, SIP, tax, investment, and retirement planning tools.</p>
            <Link to="/calculators" className="text-blue-600 hover:text-blue-800 font-medium">Explore Calculators →</Link>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Educational Content</h3>
            <p className="text-gray-600 mb-4">In-depth articles, guides, and tutorials to help you understand complex financial concepts.</p>
            <Link to="/blog" className="text-blue-600 hover:text-blue-800 font-medium">Read Our Blog →</Link>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Tax Planning Tools</h3>
            <p className="text-gray-600 mb-4">Advanced tax calculation tools and strategies to help you optimize your tax savings.</p>
            <Link to="/tax-tools" className="text-blue-600 hover:text-blue-800 font-medium">Tax Tools →</Link>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Investment Analysis</h3>
            <p className="text-gray-600 mb-4">Tools to analyze mutual funds, stocks, and other investment options for better returns.</p>
            <Link to="/finance-tools" className="text-blue-600 hover:text-blue-800 font-medium">Investment Tools →</Link>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Government Schemes</h3>
            <p className="text-gray-600 mb-4">Information and calculators for various government schemes and benefits available to Indians.</p>
            <Link to="/government-schemes" className="text-blue-600 hover:text-blue-800 font-medium">Explore Schemes →</Link>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Astro Finance</h3>
            <p className="text-gray-600 mb-4">Unique blend of Vedic astrology and financial planning for auspicious investment timing.</p>
            <Link to="/astro-finance" className="text-blue-600 hover:text-blue-800 font-medium">Astro Finance →</Link>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Why Choose MoneyCal India?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-blue-600 font-semibold text-sm">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Indian Context</h3>
                <p className="text-gray-600">All our calculators and content are specifically designed for the Indian financial landscape, including local tax laws, investment options, and regulatory requirements.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-green-600 font-semibold text-sm">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">100% Free</h3>
                <p className="text-gray-600">All our financial calculators and educational content are completely free to use. No hidden charges, no premium tiers - just valuable tools for everyone.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-purple-600 font-semibold text-sm">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Regular Updates</h3>
                <p className="text-gray-600">We continuously update our calculators and content to reflect the latest changes in tax laws, interest rates, and financial regulations.</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-orange-600 font-semibold text-sm">4</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Educational Focus</h3>
                <p className="text-gray-600">We don't just provide calculators - we educate users about financial concepts, helping them make informed decisions and build financial literacy.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-red-600 font-semibold text-sm">5</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Mobile Optimized</h3>
                <p className="text-gray-600">Our platform is fully responsive and optimized for mobile devices, ensuring you can access financial tools anytime, anywhere.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-indigo-600 font-semibold text-sm">6</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Privacy First</h3>
                <p className="text-gray-600">We respect your privacy and don't store sensitive financial data. All calculations are performed locally in your browser.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary-50 rounded-xl p-8 border border-primary-100 text-center">
        <h2 className="text-2xl font-bold text-primary-900 mb-4">Join Us in Our Mission</h2>
        <p className="text-lg text-primary-700 mb-6 max-w-3xl mx-auto">
          We're committed to improving financial literacy across India. Whether you're a financial expert interested in contributing to our blog or a user with feedback on our calculators, we'd love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/contact-us" 
            className="btn bg-primary-600 text-white hover:bg-primary-700 inline-flex items-center px-6 py-3 rounded-lg"
          >
            Get in Touch
          </Link>
          <Link 
            to="/blog" 
            className="btn bg-white text-primary-600 border border-primary-600 hover:bg-primary-50 inline-flex items-center px-6 py-3 rounded-lg"
          >
            Read Our Blog
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutUs;
