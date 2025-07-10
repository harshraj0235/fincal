import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, Target, Calculator, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AboutUs: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const adsenseScript = document.createElement('script');
    adsenseScript.async = true;
    adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4446717165665089';
    adsenseScript.crossOrigin = 'anonymous';
    document.head.appendChild(adsenseScript);
    return () => {
      if (document.head.contains(adsenseScript)) document.head.removeChild(adsenseScript);
    };
  }, []);
  
  return (
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
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">About FinCalc India</h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          Empowering Indians to make informed financial decisions through accurate calculations and educational resources
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
            <Target className="h-6 w-6 text-primary-600 mr-2" />
            Our Mission
          </h2>
          <p className="text-lg text-neutral-700 mb-4">
            At FinCalc India, our mission is to democratize financial literacy and empower every Indian to take control of their financial future. We believe that accurate calculations are the foundation of sound financial decisions.
          </p>
          <p className="text-lg text-neutral-700">
            We're committed to providing free, accessible, and user-friendly financial calculators tailored specifically for the Indian context, taking into account local tax laws, investment options, and financial products.
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
          Our Story
        </h2>
        
        <div className="bg-white rounded-xl shadow-md p-8">
          <p className="text-lg text-neutral-700 mb-4">
            FinCalc India was founded in 2023 by a team of finance professionals who recognized a significant gap in the market: while there were many financial calculators available online, few were tailored specifically for the Indian context, and even fewer provided educational content alongside their tools.
          </p>
          <p className="text-lg text-neutral-700 mb-4">
            Our founders had spent years working in various segments of the financial industry – banking, investment management, tax consulting, and financial education. They had firsthand experience of how proper financial calculations could make a tremendous difference in people's financial outcomes.
          </p>
          <p className="text-lg text-neutral-700 mb-4">
            What started as a small collection of basic calculators has now grown into India's most comprehensive suite of financial tools, covering everything from loan EMIs and tax calculations to retirement planning and investment returns.
          </p>
          <p className="text-lg text-neutral-700">
            Today, FinCalc India serves millions of users across the country, helping individuals, families, and small businesses make better financial decisions through accurate calculations and educational resources.
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
          {/* If you have a photo, add an <img> tag here. Example: */}
          {/* <img src="YOUR_PHOTO_URL" alt="Harsh Raj" className="w-28 h-28 rounded-full object-cover border-2 border-green-600 mb-4" /> */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-green-800 mb-2">Harsh Raj</h3>
            <p className="text-neutral-700 mb-4">
              Harsh Raj is a Software Engineer with years of experience helping people make smart investment decisions. Passionate about financial literacy and transparent, trustworthy guidance.
            </p>
            <div className="flex justify-center gap-4">
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
          </div>
        </div>
      </div>
      
      <div className="bg-primary-50 rounded-xl p-8 border border-primary-100 text-center">
        <h2 className="text-2xl font-bold text-primary-900 mb-4">Join Us in Our Mission</h2>
        <p className="text-lg text-primary-700 mb-6 max-w-3xl mx-auto">
          We're committed to improving financial literacy across India. Whether you're a financial expert interested in contributing to our blog or a user with feedback on our calculators, we'd love to hear from you.
        </p>
        <Link 
          to="/contact-us" 
          className="btn bg-primary-600 text-white hover:bg-primary-700 inline-flex items-center"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
