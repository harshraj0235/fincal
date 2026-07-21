import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
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
  DollarSign,
  MessageSquare,
  Flag,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  User,
  Activity
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


const ClientWiseInvoiceHistoryVisualizer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      <SEOHelmet
        title="Client-wise Invoice History Visualizer - Client Analysis Tool | MoneyCal"
        description="Visualize invoice history and patterns by client. Analyze client behavior, track payment patterns, and identify trends for better client relationship management."
        keywords="client invoice history, client analysis, invoice patterns, client tracking, payment behavior analysis"
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Client-wise Invoice History Visualizer
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Visualize invoice history and patterns by client for better relationship management.
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Client Analysis & History Tracking</h2>
          <p className="text-gray-600 mb-4">
            This tool helps you analyze client invoice history, track payment patterns, and identify trends to improve client relationships and cash flow management.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-teal-50 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-900 mb-2">Features</h3>
              <ul className="text-teal-800 text-sm space-y-1">
                <li>• Client analysis</li>
                <li>• History tracking</li>
                <li>• Pattern recognition</li>
                <li>• Payment trends</li>
              </ul>
            </div>
            
            <div className="bg-cyan-50 p-4 rounded-lg">
              <h3 className="font-semibold text-cyan-900 mb-2">Analytics</h3>
              <ul className="text-cyan-800 text-sm space-y-1">
                <li>• Payment frequency</li>
                <li>• Average invoice value</li>
                <li>• Payment delays</li>
                <li>• Client ranking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppBanner />
    </div>
  );
};

export default ClientWiseInvoiceHistoryVisualizer;
