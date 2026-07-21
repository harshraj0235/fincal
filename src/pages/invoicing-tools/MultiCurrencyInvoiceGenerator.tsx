import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  FileText, 
  Download, 
  Save,
  Eye,
  Printer,
  Mail,
  Settings,
  Building,
  Calendar,
  Percent,
  Hash,
  Smartphone,
  Info,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
  PieChart,
  Globe,
  RefreshCw
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


const MultiCurrencyInvoiceGenerator: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <SEOHelmet
        title="Multi-Currency Invoice Generator - International Billing Tool | MoneyCal"
        description="Create professional invoices in multiple currencies with real-time exchange rates. Perfect for international businesses and freelancers."
        keywords="multi currency invoice, international billing, exchange rates, currency converter, global invoice generator"
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Multi-Currency Invoice Generator
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Create professional invoices in multiple currencies with real-time exchange rates.
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Multi-Currency Invoice Tool</h2>
          <p className="text-gray-600 mb-4">
            This tool helps you create professional invoices in multiple currencies with automatic exchange rate calculations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Features</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Multi-currency support</li>
                <li>• Real-time exchange rates</li>
                <li>• International billing</li>
                <li>• Professional format</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Supported Currencies</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• INR - Indian Rupee</li>
                <li>• USD - US Dollar</li>
                <li>• EUR - Euro</li>
                <li>• GBP - British Pound</li>
                <li>• JPY - Japanese Yen</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppBanner />
    </div>
  );
};

export default MultiCurrencyInvoiceGenerator;
