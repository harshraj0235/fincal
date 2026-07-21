import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
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
  BarChart3,
  PieChart,
  Clock,
  DollarSign
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


const InvoiceToCashCycleTracker: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <SEOHelmet
        title="Invoice-to-Cash Cycle Tracker - Cash Flow Management Tool | MoneyCal"
        description="Track the complete invoice to cash conversion cycle. Monitor cash flow, analyze performance metrics, and optimize your collection process."
        keywords="invoice to cash cycle, cash flow tracking, collection management, payment cycle, cash conversion"
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Invoice-to-Cash Cycle Tracker
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Track the complete invoice to cash conversion cycle and optimize your collection process.
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cash Flow Tracking Tool</h2>
          <p className="text-gray-600 mb-4">
            This tool helps you monitor the complete cycle from invoice generation to cash collection, providing insights into your cash flow performance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Features</h3>
              <ul className="text-purple-800 text-sm space-y-1">
                <li>• Cash flow tracking</li>
                <li>• Cycle analysis</li>
                <li>• Performance metrics</li>
                <li>• Collection optimization</li>
              </ul>
            </div>
            
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-semibold text-pink-900 mb-2">Key Metrics</h3>
              <ul className="text-pink-800 text-sm space-y-1">
                <li>• Days Sales Outstanding (DSO)</li>
                <li>• Collection efficiency</li>
                <li>• Cash conversion cycle</li>
                <li>• Payment patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppBanner />
    </div>
  );
};

export default InvoiceToCashCycleTracker;
