import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Mic, 
  BarChart3, 
  Globe, 
  Shield, 
  Zap, 
  TrendingUp, 
  Calculator,
  Smartphone,
  Headphones,
  ArrowRight,
  Star,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';

const FinoHome: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8 text-blue-600" />,
      title: "AI-Powered Chat",
      description: "Get instant answers to any finance question with our advanced AI chatbot"
    },
    {
      icon: <Mic className="w-8 h-8 text-green-600" />,
      title: "Voice Input",
      description: "Speak your questions in English or Hindi for hands-free interaction"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Real-time Data",
      description: "Access live stock prices, market trends, and financial insights"
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-600" />,
      title: "Multi-language",
      description: "Switch between English and Hindi for comfortable communication"
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Secure & Private",
      description: "No login required - your data stays private and secure"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Lightning Fast",
      description: "Get instant responses with our optimized backend infrastructure"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Investment Advisor",
      content: "Fino has revolutionized how I provide financial advice to my clients. The real-time data and multi-language support make it incredibly useful.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Small Business Owner",
      content: "As someone who's not very tech-savvy, Fino's voice input feature has been a game-changer. I can ask questions naturally in Hindi.",
      rating: 5
    },
    {
      name: "Anita Patel",
      role: "Financial Planner",
      content: "The visualizations and charts help me explain complex financial concepts to my clients easily. Highly recommended!",
      rating: 5
    }
  ];

  const stats = [
    { number: "10K+", label: "Daily Queries" },
    { number: "50+", label: "Financial Topics" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Helmet>
        <title>Fino - AI Finance Chat System | Get Instant Financial Advice</title>
        <meta name="description" content="Fino is an advanced AI-powered finance chat system that provides instant answers to any financial question. Features voice input, real-time data, multi-language support, and beautiful visualizations. No login required!" />
        <meta name="keywords" content="finance chat, AI financial advice, voice finance assistant, Hindi finance chatbot, real-time stock data, financial calculator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Fino - AI Finance Chat System",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "description": "AI-powered finance chat system with voice input, real-time data, and multi-language support",
            "featureList": [
              "AI-Powered Chat",
              "Voice Input (English/Hindi)",
              "Real-time Financial Data",
              "Multi-language Support",
              "Secure & Private",
              "No Login Required"
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Powered by Advanced AI
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Fino</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your intelligent finance companion that answers any financial question instantly. 
              Ask about stocks, insurance, loans, taxes, and more - all in your preferred language.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.a
                href="/fino"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Chatting with Fino
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                <Headphones className="w-5 h-5 mr-2" />
                Watch Demo
              </motion.button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Fino?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of financial assistance with our cutting-edge AI technology
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How Fino Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get instant financial advice in just three simple steps
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Ask Your Question",
                description: "Type or speak your financial question in English or Hindi",
                icon: <MessageCircle className="w-12 h-12 text-blue-600" />
              },
              {
                step: "02",
                title: "AI Processing",
                description: "Our advanced AI analyzes your query and fetches real-time data",
                icon: <TrendingUp className="w-12 h-12 text-green-600" />
              },
              {
                step: "03",
                title: "Get Instant Answer",
                description: "Receive detailed answers with visualizations and suggestions",
                icon: <CheckCircle className="w-12 h-12 text-purple-600" />
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
                    {step.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-400 mb-2">{step.step}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who trust Fino for their financial queries
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-2xl"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Financial Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already using Fino to make smarter financial decisions. 
              No signup required - start chatting right away!
            </p>
            <motion.a
              href="/fino"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:shadow-lg transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Chatting with Fino Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Fino</h3>
              <p className="text-gray-400">
                Your intelligent finance companion powered by advanced AI technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>AI-Powered Chat</li>
                <li>Voice Input</li>
                <li>Real-time Data</li>
                <li>Multi-language</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>Facebook</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Fino. All rights reserved. Made with ❤️ for financial empowerment.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FinoHome;
