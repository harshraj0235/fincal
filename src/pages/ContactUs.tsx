import React, { useState } from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { ArrowLeft, MapPin, Send, MessageSquare, Mail, Phone, Clock, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

export const ContactUs: React.FC = () => {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle the form submission here
    setFormSubmitted(true);
  };
  
  return (
    <>
      <SEOHelmet
        title="Contact Us - Get in Touch with MoneyCal.in Team | Financial Calculator Support"
        description="Contact the MoneyCal.in team for support, feedback, or questions about our financial calculators. Get expert help with EMI, SIP, tax calculations and more."
        keywords="contact us, financial calculator support, EMI calculator help, SIP calculator support, tax calculator assistance, moneycal support"
        url="/contact-us"
        type="website"
        image="/images/contact-us.jpg"
        tags={["contact", "support", "help", "feedback", "financial calculators"]}
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
            <div className="flex items-center justify-center mb-4">
              <MessageSquare className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Contact Us
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions, feedback, or suggestions? We'd love to hear from you. Get in touch with our team 
              for support with financial calculators, technical issues, or general inquiries.
            </p>
          </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
            <MessageSquare className="h-6 w-6 text-primary-600 mr-2" />
            Get in Touch
          </h2>
          
          {formSubmitted ? (
            <div className="bg-success-50 border border-success-200 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-100 text-success-600 mb-4">
                <Send className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-success-800 mb-2">Message Sent Successfully!</h3>
              <p className="text-success-700 mb-4">
                Thank you for reaching out. We've received your message and will get back to you shortly.
              </p>
              <button 
                onClick={() => setFormSubmitted(false)}
                className="btn bg-success-600 text-white hover:bg-success-700"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="input"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="input"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  className="input"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  className="input"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn bg-primary-600 text-white hover:bg-primary-700 w-full sm:w-auto"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
        
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
              <MapPin className="h-6 w-6 text-primary-600 mr-2" />
              Contact Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-800">Email Support</h3>
                  <p className="text-gray-600 text-sm">support@moneycal.in</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <Globe className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-800">Website</h3>
                  <p className="text-gray-600 text-sm">https://moneycal.in</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-800">Response Time</h3>
                  <p className="text-gray-600 text-sm">Within 24-48 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Author Information */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
              <MapPin className="h-6 w-6 text-primary-600 mr-2" />
              About the Creator
            </h2>
            <div className="flex flex-col items-center">
              <img
                src="https://pbs.twimg.com/profile_images/1634415500418588677/uz8L8JKQ_400x400.png"
                alt="Harsh Raj"
                className="w-24 h-24 rounded-full border-4 border-blue-200 shadow mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-blue-800 mb-1">Harsh Raj</h3>
              <p className="text-blue-700 mb-2">Software Engineer & Finance Enthusiast</p>
              <p className="text-neutral-700 text-center mb-4">
                I am a B.Tech graduate and software engineer with a passion for finance. I love exploring financial concepts and sharing educational content to help others understand complex financial topics. Please note that I share information for educational purposes only - I am not a financial expert, and readers should consult authorized experts for financial advice.
              </p>
              <div className="flex gap-4 mb-2">
                <a href="https://linkedin.com/in/harshitpatel9/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 font-medium">LinkedIn</a>
                <a href="https://x.com/harshitx9/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 font-medium">Twitter (X)</a>
              </div>
              <a href="/author/harsh-raj" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-2">View Full Profile</a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-800">How accurate are the calculators?</h3>
                <p className="text-gray-600 text-sm">Our calculators use standard financial formulas and are regularly updated to ensure accuracy. However, results are estimates and should be verified with financial institutions.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-800">Can I use these for financial advice?</h3>
                <p className="text-gray-600 text-sm">Our tools are for educational purposes only. For financial advice, please consult with qualified financial advisors or professionals.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-800">Are my calculations saved?</h3>
                <p className="text-gray-600 text-sm">Currently, calculations are stored locally in your browser. We don't store personal financial data on our servers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Information</h3>
        <p className="text-yellow-700">
          For urgent financial advice or complex financial planning, we recommend consulting with qualified financial advisors, 
          tax professionals, or legal experts. Our calculators and tools are designed for educational purposes and general guidance only.
        </p>
      </div>
    </div>
  </div>
  );
};

export default ContactUs;
