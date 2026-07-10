import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Sun, Sunrise, Home, ChevronRight,
  Share2, Download, Bell, ArrowRight, Info, Heart, Gift, Check, Copy,
  X, Star, Zap, Users, ShoppingBag, ExternalLink, Award, BookOpen,
  Sparkles, Target, AlertCircle, CheckCircle, XCircle, ListChecks,
  Flame, Flower2, Music
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { PUJA_VIDHI_DATABASE, DEITY_INFO, FESTIVAL_DATES, COMMON_SAMAGRI_INFO, type PujaVidhiData } from '../../data/pujaVidhiData';

const PujaVidhiGenerator: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedPuja, setSelectedPuja] = useState<PujaVidhiData>(PUJA_VIDHI_DATABASE[0]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');

  const years = [2024, 2025, 2026, 2027, 2028];

  const shareUrl = `/religious-tools/puja-vidhi-generator?puja=${selectedPuja.id}`;
  const shareText = `${selectedPuja.deity} Puja Vidhi for ${selectedPuja.festival} - Complete step-by-step guide with mantras, samagri list, and benefits! 🙏`;

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);
    
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleStepCompletion = (stepNumber: number) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepNumber)) {
        newSet.delete(stepNumber);
      } else {
        newSet.add(stepNumber);
      }
      return newSet;
    });
  };

  const handleDownloadPDF = () => {
    // Trigger print dialog which allows saving as PDF
    window.print();
  };

  // Generate structured data for SEO
  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `${selectedPuja.deity} Puja Vidhi for ${selectedPuja.festival}`,
      "description": selectedPuja.description,
      "totalTime": selectedPuja.duration,
      "step": selectedPuja.steps.map(step => ({
        "@type": "HowToStep",
        "position": step.step,
        "name": step.title,
        "text": step.description,
        "tip": step.tips || ""
      })),
      "supply": selectedPuja.samagri.map(item => ({
        "@type": "HowToSupply",
        "name": item.name,
        "requiredQuantity": item.quantity
      }))
    };
  };

  return (
    <>
      <SEOHelmet
        title={`${selectedPuja.deity} Puja Vidhi for ${selectedPuja.festival} ${selectedYear} - Complete Step-by-Step Guide with Mantras & Samagri List`}
        description={`${selectedPuja.description} Complete puja procedure with ${selectedPuja.steps.length} steps, samagri list, mantras in Sanskrit & English, regional variations, dos & don'ts. Duration: ${selectedPuja.duration}.`}
        keywords={`${selectedPuja.deity.toLowerCase()} puja vidhi, ${selectedPuja.festival.toLowerCase()} puja ${selectedYear}, how to perform ${selectedPuja.festival.toLowerCase()} puja, ${selectedPuja.deity.toLowerCase()} worship procedure, puja samagri list, hindu puja steps, ${selectedPuja.festival.toLowerCase()} mantras, puja vidhi in hindi, ${selectedPuja.deity.toLowerCase()} puja benefits`}
        url={`/religious-tools/puja-vidhi-generator?puja=${selectedPuja.id}`}
        type="article"
      />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600 flex-wrap">
              <Link to="/" className="hover:text-orange-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/religious-tools" className="hover:text-orange-600 transition-colors">
                Religious Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-orange-600 font-medium">Puja Vidhi Generator</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-pink-500/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-full mb-6">
                <Flame className="w-5 h-5" />
                <span className="font-semibold">Step-by-Step Puja Guide | Multiple Deities & Festivals</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                Puja Vidhi Generator
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Complete authentic puja procedures for all Hindu festivals and deities. Get step-by-step instructions, mantras, samagri lists, and regional variations - absolutely free!
              </p>
            </motion.div>

            {/* Main Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-200">
                {/* Puja Selector */}
                <div className="bg-gradient-to-r from-orange-600 to-red-600 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-3 flex items-center">
                        <Flame className="w-5 h-5 mr-2" />
                        Select Puja / Festival
                      </label>
                      <select
                        value={selectedPuja.id}
                        onChange={(e) => {
                          const puja = PUJA_VIDHI_DATABASE.find(p => p.id === e.target.value);
                          if (puja) {
                            setSelectedPuja(puja);
                            setCompletedSteps(new Set());
                            setActiveStep(null);
                          }
                        }}
                        className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white font-bold text-lg focus:outline-none focus:border-white backdrop-blur-sm cursor-pointer"
                      >
                        {PUJA_VIDHI_DATABASE.map(puja => (
                          <option key={puja.id} value={puja.id} className="text-gray-900">
                            {puja.deity} - {puja.festival}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-3 flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Year
                      </label>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white font-bold text-lg focus:outline-none focus:border-white backdrop-blur-sm cursor-pointer"
                      >
                        {years.map(year => (
                          <option key={year} value={year} className="text-gray-900">
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-3 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Language / भाषा
                      </label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as 'english' | 'hindi')}
                        className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white font-bold text-lg focus:outline-none focus:border-white backdrop-blur-sm cursor-pointer"
                      >
                        <option value="english" className="text-gray-900">English</option>
                        <option value="hindi" className="text-gray-900">हिंदी (Hindi)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Puja Details */}
                <div className="p-8">
                  {/* Overview */}
                  <div className="mb-8 pb-8 border-b-2 border-orange-100">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                        <Flame className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">{selectedPuja.deity} Puja</h2>
                    <h3 className="text-xl text-center text-gray-600 font-semibold mb-4">{selectedPuja.festival}</h3>
                    <p className="text-gray-700 leading-relaxed mb-4 text-center max-w-3xl mx-auto">
                      {selectedPuja.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-orange-50 p-4 rounded-xl text-center">
                        <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-1">Duration</p>
                        <p className="font-bold text-lg text-gray-900">{selectedPuja.duration}</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-xl text-center">
                        <Sun className="w-6 h-6 text-red-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-1">Best Time</p>
                        <p className="font-bold text-lg text-gray-900">{selectedPuja.bestTime}</p>
                      </div>
                      <div className="bg-pink-50 p-4 rounded-xl text-center">
                        <ListChecks className="w-6 h-6 text-pink-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-1">Total Steps</p>
                        <p className="font-bold text-lg text-gray-900">{selectedPuja.steps.length} Steps</p>
                      </div>
                    </div>
                  </div>

                  {/* Significance */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-300 mb-8">
                    <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center">
                      <Star className="w-6 h-6 mr-2 text-yellow-600" />
                      Significance & Benefits
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">{selectedPuja.significance}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedPuja.benefits.slice(0, 6).map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Samagri List */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-300 mb-8">
                    <h3 className="font-bold text-2xl text-gray-900 mb-4 flex items-center">
                      <ShoppingBag className="w-6 h-6 mr-2 text-green-600" />
                      🛒 Puja Samagri (Items Required)
                    </h3>
                    <div className="bg-white p-4 rounded-xl mb-4">
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>Total Items:</strong> {selectedPuja.samagri.length} | 
                        <strong className="ml-2">Essential:</strong> {selectedPuja.samagri.filter(s => !s.optional).length} | 
                        <strong className="ml-2">Optional:</strong> {selectedPuja.samagri.filter(s => s.optional).length}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedPuja.samagri.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-bold text-gray-900">{item.name}</span>
                                {item.optional && (
                                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Optional</span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-1">Quantity: <strong>{item.quantity}</strong></p>
                              <p className="text-xs text-gray-500 italic">{item.purpose}</p>
                            </div>
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shopping Links */}
                    <div className="mt-6 bg-green-100 p-4 rounded-xl">
                      <p className="text-sm font-semibold text-gray-700 mb-3">🛍️ Buy Puja Samagri Online:</p>
                      <div className="flex flex-wrap gap-3">
                        <a href="https://www.amazon.in/s?k=puja+samagri" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline flex items-center text-sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Amazon India
                        </a>
                        <a href="https://www.flipkart.com/search?q=puja+items" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline flex items-center text-sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Flipkart
                        </a>
                        <a href="https://www.pujashoppe.com/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline flex items-center text-sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          PujaShoppe
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Step-by-Step Procedure */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      📖 Step-by-Step Puja Procedure
                    </h3>
                    <div className="space-y-4">
                      {selectedPuja.steps.map((step, index) => (
                        <motion.div
                          key={step.step}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`bg-gradient-to-r ${
                            completedSteps.has(step.step) 
                              ? 'from-green-50 to-emerald-50 border-green-300' 
                              : 'from-white to-gray-50 border-gray-200'
                          } p-6 rounded-2xl border-2 cursor-pointer hover:shadow-lg transition-all`}
                          onClick={() => setActiveStep(activeStep === step.step ? null : step.step)}
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                              completedSteps.has(step.step)
                                ? 'bg-green-500 text-white'
                                : 'bg-gradient-to-br from-orange-500 to-red-500 text-white'
                            }`}>
                              {completedSteps.has(step.step) ? (
                                <Check className="w-6 h-6" />
                              ) : (
                                <span className="text-lg font-bold">{step.step}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-lg text-gray-900 mb-2">{step.title}</h4>
                              <p className="text-gray-700 leading-relaxed mb-3">{step.description}</p>
                              {step.duration && (
                                <div className="inline-flex items-center space-x-1 text-sm text-gray-600 bg-white px-3 py-1 rounded-full mb-2">
                                  <Clock className="w-4 h-4" />
                                  <span>Duration: {step.duration}</span>
                                </div>
                              )}
                              {step.tips && activeStep === step.step && (
                                <div className="mt-3 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-500">
                                  <p className="text-sm text-gray-700">
                                    <strong className="text-yellow-700">💡 Tip:</strong> {step.tips}
                                  </p>
                                </div>
                              )}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStepCompletion(step.step);
                              }}
                              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                                completedSteps.has(step.step)
                                  ? 'bg-green-500 text-white hover:bg-green-600'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              {completedSteps.has(step.step) ? 'Done ✓' : 'Mark Done'}
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Progress */}
                    <div className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-700">Progress</span>
                        <span className="font-bold text-orange-600">
                          {completedSteps.size} / {selectedPuja.steps.length} Steps Completed
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-4 rounded-full transition-all duration-500"
                          style={{ width: `${(completedSteps.size / selectedPuja.steps.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Mantras */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-300 mb-8">
                    <h3 className="font-bold text-2xl text-gray-900 mb-4 flex items-center">
                      <Music className="w-6 h-6 mr-2 text-purple-600" />
                      🕉️ Sacred Mantras
                    </h3>
                    <div className="space-y-6">
                      {selectedPuja.mantras.map((mantra, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-2">Sanskrit (Devanagari)</p>
                            <p className="text-2xl text-center text-orange-600 font-bold mb-3 leading-relaxed">
                              {mantra.sanskrit}
                            </p>
                          </div>
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-2">Transliteration (Roman Script)</p>
                            <p className="text-lg text-center text-gray-700 italic mb-3">
                              {mantra.transliteration}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-2">Meaning</p>
                            <p className="text-sm text-gray-700 text-center">
                              {mantra.meaning}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 bg-purple-100 p-4 rounded-lg">
                      <p className="text-xs text-gray-700">
                        <strong>💡 Tip:</strong> Chant these mantras with devotion and concentration. You can use a mala (rosary) to count 108 repetitions for maximum spiritual benefit.
                      </p>
                    </div>
                  </div>

                  {/* Do's and Don'ts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-300">
                      <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                        ✅ Do's
                      </h4>
                      <ul className="space-y-2">
                        {selectedPuja.dos.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border-2 border-red-300">
                      <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                        <XCircle className="w-6 h-6 mr-2 text-red-600" />
                        ❌ Don'ts
                      </h4>
                      <ul className="space-y-2">
                        {selectedPuja.donts.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Regional Variations */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-300 mb-8">
                    <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                      <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                      🗺️ Regional Variations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(selectedPuja.regionalVariations).map(([region, description]) => (
                        <div key={region} className="bg-white p-4 rounded-xl">
                          <h5 className="font-bold text-gray-900 mb-2">{region}</h5>
                          <p className="text-sm text-gray-700">{description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 justify-center mb-8">
                    <button
                      onClick={handleDownloadPDF}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download PDF Guide</span>
                    </button>

                    <div className="relative">
                      <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-orange-600 text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all"
                      >
                        <Share2 className="w-5 h-5" />
                        <span>Share Puja Vidhi</span>
                      </button>

                      <AnimatePresence>
                        {showShareMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 min-w-[200px]"
                          >
                            <button
                              onClick={() => handleShare('whatsapp')}
                              className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-green-50 rounded-lg"
                            >
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <Share2 className="w-4 h-4 text-white" />
                              </div>
                              <span className="font-semibold">WhatsApp</span>
                            </button>
                            <button
                              onClick={() => handleShare('facebook')}
                              className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-blue-50 rounded-lg"
                            >
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <Share2 className="w-4 h-4 text-white" />
                              </div>
                              <span className="font-semibold">Facebook</span>
                            </button>
                            <button
                              onClick={handleCopyLink}
                              className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 rounded-lg"
                            >
                              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                              </div>
                              <span className="font-semibold">{copied ? 'Copied!' : 'Copy Link'}</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Religious Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/festival-tools/akshaya-tritiya-muhurat" className="group bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl border-2 border-yellow-200 hover:shadow-xl transition-all">
                <Star className="w-10 h-10 text-yellow-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Akshaya Tritiya Muhurat</h4>
                <p className="text-gray-600 text-sm mb-3">Best time for gold buying & investments</p>
                <div className="flex items-center text-yellow-600 font-semibold group-hover:gap-2 transition-all">
                  View Muhurat
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/festival-dates" className="group bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 hover:shadow-xl transition-all">
                <Calendar className="w-10 h-10 text-purple-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">Festival Calendar</h4>
                <p className="text-gray-600 text-sm mb-3">All Hindu festival dates</p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                  View Calendar
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/religious-tools" className="group bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200 hover:shadow-xl transition-all">
                <BookOpen className="w-10 h-10 text-orange-600 mb-3" />
                <h4 className="font-bold text-lg mb-2">All Religious Tools</h4>
                <p className="text-gray-600 text-sm mb-3">Mantras, muhurats, and more</p>
                <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                  Explore Tools
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Complete Puja Vidhi Guide - {selectedPuja.deity} for {selectedPuja.festival}</h2>

            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-4">What is {selectedPuja.deity} Puja?</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {selectedPuja.description} This puja is traditionally performed during {selectedPuja.festival} and is considered one of the most sacred Hindu rituals.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Duration:</strong> {selectedPuja.duration} | <strong>Best Time:</strong> {selectedPuja.bestTime}
              </p>
            </div>

            {/* FAQs */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <h3 className="text-3xl font-bold mb-6">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-orange-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">How to perform {selectedPuja.deity} Puja at home?</h4>
                  <p className="text-gray-700">
                    Follow our {selectedPuja.steps.length}-step guide above. You'll need {selectedPuja.samagri.length} items including basic puja samagri like flowers, incense, and offerings. The complete procedure takes approximately {selectedPuja.duration}.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">What are the benefits of {selectedPuja.festival} puja?</h4>
                  <p className="text-gray-700">
                    {selectedPuja.benefits[0]} Additionally, it {selectedPuja.benefits[1].toLowerCase()} and {selectedPuja.benefits[2].toLowerCase()}.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">What items are needed for {selectedPuja.deity} puja?</h4>
                  <p className="text-gray-700">
                    Essential items include: {selectedPuja.samagri.slice(0, 5).map(s => s.name).join(', ')}, and more. Check our complete samagri list above for all {selectedPuja.samagri.length} items with quantities.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-bold text-xl mb-2">Which mantras should be chanted during {selectedPuja.festival}?</h4>
                  <p className="text-gray-700">
                    The main mantra is "{selectedPuja.mantras[0].transliteration}" which means "{selectedPuja.mantras[0].meaning}". Chant this 108 times for maximum benefit.
                  </p>
                </div>
              </div>
            </div>

            {/* External Resources */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border-2 border-indigo-200">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <ExternalLink className="w-6 h-6 mr-2 text-indigo-600" />
                Trusted Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a href="https://www.drikpanchang.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Drik Panchang - Hindu Calendar
                </a>
                <a href="https://en.wikipedia.org/wiki/Hindu_wedding" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Wikipedia - Hindu Rituals
                </a>
                <a href="https://www.youtube.com/results?search_query=puja+vidhi" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  YouTube - Puja Tutorials
                </a>
                <a href="https://www.iskcon.org/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  ISKCON - Vedic Resources
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PujaVidhiGenerator;

