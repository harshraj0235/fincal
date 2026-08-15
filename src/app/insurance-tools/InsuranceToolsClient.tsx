"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Zap, Target, BarChart3, PieChart, TrendingUp, IndianRupee, FileText, ArrowRight, Shield, Heart, Car, Plane, Home, Bike, Stethoscope } from 'lucide-react';
import WhatsAppBanner from '@/components/WhatsAppBanner';
import ToolArticle from '@/components/ToolArticle';

const insuranceTools = [
    {
      id: 'life-insurance-calculator',
      name: 'Life Insurance Needs Calculator',
      description: 'Calculate the right amount of life insurance coverage based on your income, dependents, and financial goals using the Human Life Value method.',
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
      features: ['HLV Method', 'Income Analysis', 'Dependent Coverage', 'Tax Benefits'],
      path: '/insurance-tools/life-insurance-calculator',
      keywords: 'life insurance calculator India, how much life insurance do I need, life insurance needs calculator 2025'
    },
    {
      id: 'health-insurance-estimator',
      name: 'Health Insurance Premium Estimator',
      description: 'Compare health insurance premiums across top providers and find the best family health insurance plans with comprehensive coverage.',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      features: ['Provider Comparison', 'Family Coverage', 'Pre-existing Conditions', 'Section 80D Benefits'],
      path: '/insurance-tools/health-insurance-estimator',
      keywords: 'health insurance premium calculator India, family health insurance cost estimator, best health insurance calculator 2025'
    },
    {
      id: 'car-insurance-calculator',
      name: 'Car Insurance Cost Calculator',
      description: 'Calculate car insurance premiums based on vehicle type, age, location, and coverage type. Compare third-party and comprehensive plans.',
      icon: Car,
      color: 'from-green-500 to-green-600',
      features: ['Vehicle Type Analysis', 'Location-based Pricing', 'Coverage Comparison', 'Renewal Tracking'],
      path: '/insurance-tools/car-insurance-calculator',
      keywords: 'car insurance premium calculator India, vehicle insurance cost estimator, car insurance calculator 2025'
    },
    {
      id: 'term-insurance-planner',
      name: 'Term Insurance Planner',
      description: 'Find affordable term insurance plans based on your age, income, and coverage needs. Compare premiums across top providers.',
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      features: ['Affordable Plans', 'Age-based Premiums', 'Provider Comparison', 'Coverage Optimization'],
      path: '/insurance-tools/term-insurance-planner',
      keywords: 'term insurance planner India, affordable term insurance calculator, best term insurance tool'
    },
    {
      id: 'travel-insurance-selector',
      name: 'Travel Insurance Selector',
      description: 'Get personalized travel insurance recommendations for domestic and international trips with comprehensive coverage options.',
      icon: Plane,
      color: 'from-orange-500 to-orange-600',
      features: ['Domestic & International', 'Trip Duration Analysis', 'Destination Coverage', 'Emergency Support'],
      path: '/insurance-tools/travel-insurance-selector',
      keywords: 'travel insurance selector India, best travel insurance for international trips, travel insurance calculator'
    },
    {
      id: 'home-insurance-estimator',
      name: 'Home Insurance Cost Estimator',
      description: 'Estimate home insurance premiums based on property value, location, and coverage type. Protect your biggest asset.',
      icon: Home,
      color: 'from-indigo-500 to-indigo-600',
      features: ['Property Value Analysis', 'Location-based Pricing', 'Structure & Contents', 'Natural Disaster Coverage'],
      path: '/insurance-tools/home-insurance-estimator',
      keywords: 'home insurance premium calculator India, property insurance cost estimator, home insurance tool 2025'
    },
    {
      id: 'two-wheeler-tracker',
      name: 'Two-Wheeler Insurance Tracker',
      description: 'Compare bike insurance quotes, track renewal dates, and manage your two-wheeler insurance portfolio efficiently.',
      icon: Bike,
      color: 'from-cyan-500 to-cyan-600',
      features: ['Bike Model Analysis', 'Renewal Reminders', 'Quote Comparison', 'Policy Management'],
      path: '/insurance-tools/two-wheeler-tracker',
      keywords: 'two-wheeler insurance calculator India, bike insurance renewal tracker, bike insurance cost tool'
    },
    {
      id: 'critical-illness-calculator',
      name: 'Critical Illness Cover Calculator',
      description: 'Determine the right critical illness coverage based on your medical history, income, and potential healthcare costs.',
      icon: Stethoscope,
      color: 'from-pink-500 to-pink-600',
      features: ['Medical History Analysis', 'Income-based Coverage', 'Healthcare Cost Estimation', 'Lump-sum Benefits'],
      path: '/insurance-tools/critical-illness-calculator',
      keywords: 'critical illness insurance calculator India, critical illness cover estimator, critical illness tool'
    },
    {
      id: 'portfolio-dashboard',
      name: 'Insurance Portfolio Dashboard',
      description: 'Visualize and manage all your insurance policies in one place. Track premiums, coverage, and renewal dates.',
      icon: PieChart,
      color: 'from-teal-500 to-teal-600',
      features: ['Policy Visualization', 'Premium Tracking', 'Renewal Alerts', 'Coverage Analysis'],
      path: '/insurance-tools/portfolio-dashboard',
      keywords: 'insurance portfolio tracker India, manage insurance policies online, insurance dashboard tool'
    },
    {
      id: 'ulip-calculator',
      name: 'ULIP Return Calculator',
      description: 'Estimate returns on Unit-Linked Insurance Plans based on investment amount, risk profile, and expected market performance.',
      icon: TrendingUp,
      color: 'from-emerald-500 to-emerald-600',
      features: ['Risk Profile Analysis', 'Return Projections', 'Premium Allocation', 'Market Performance'],
      path: '/insurance-tools/ulip-calculator',
      keywords: 'ULIP return calculator India, unit-linked insurance plan returns, ULIP calculator 2025'
    }
  ];

// If there are multiple arrays, we merge them for search
const allTools = insuranceTools.filter((v: any, i: number, a: any) => a.findIndex((t: any) => t.name === v.name) === i);

const InsuranceToolsClient: React.FC = () => {
  const [query, setQuery] = useState('');

  const filteredTools = useMemo(() => {
    if (!query) return allTools;
    const q = query.toLowerCase();
    return allTools.filter(t => t.name.toLowerCase().includes(q) || (t.desc || t.description || '').toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <WhatsAppBanner />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Insurance Planning Hub</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Life, health, term, and general insurance calculators.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-4 mb-8 shadow-sm max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search tools..." 
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((t, index) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.03 }}>
                <Link href={t.path || '/tools'} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-300 transform hover:-translate-y-1 transition-all block h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{t.name}</h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{t.desc || t.description}</p>
                  <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-800">
                    Open Tool <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </>
  );
};

export default InsuranceToolsClient;
