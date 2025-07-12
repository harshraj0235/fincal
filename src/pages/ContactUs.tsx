import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WhatsAppBanner from '../components/WhatsAppBanner';

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
      <WhatsAppBanner />
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
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Contact Us</h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          Have questions, feedback, or suggestions? We'd love to hear from you. Get in touch with our team.
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
        
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
            <MapPin className="h-6 w-6 text-primary-600 mr-2" />
            Contact Information
          </h2>
          
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">Email Us</h3>
                  <p className="text-neutral-600 mb-1">For general inquiries:</p>
                  <a href="mailto:info@fincalcindia.com" className="text-primary-600 hover:text-primary-700">
                    info@fincalcindia.com
                  </a>
                  <p className="text-neutral-600 mt-2 mb-1">For support:</p>
                  <a href="mailto:support@fincalcindia.com" className="text-primary-600 hover:text-primary-700">
                    support@fincalcindia.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">Call Us</h3>
                  <p className="text-neutral-600 mb-1">Customer Support:</p>
                  <a href="tel:+911234567890" className="text-primary-600 hover:text-primary-700">
                    +91 1234 567 890
                  </a>
                  <p className="text-neutral-600 mt-2 mb-1">Business Inquiries:</p>
                  <a href="tel:+911234567891" className="text-primary-600 hover:text-primary-700">
                    +91 1234 567 891
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">Visit Us</h3>
                  <p className="text-neutral-600">
                    FinCalc India<br />
                    123 Financial District<br />
                    Bandra Kurla Complex<br />
                    Mumbai, Maharashtra 400051<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
            <h3 className="text-xl font-semibold text-primary-900 mb-4">Business Hours</h3>
            <div className="space-y-2 text-primary-800">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 6:00 PM IST</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 4:00 PM IST</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="h-96 w-full">
          {/* In a real application, you would embed a Google Map here */}
          <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
            <p className="text-neutral-600 text-lg">Interactive Map Would Be Displayed Here</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;