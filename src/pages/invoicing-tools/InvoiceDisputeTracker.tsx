import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
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
  DollarSign,
  Users,
  MessageSquare,
  Flag,
  CheckCircle2,
  XCircle,
  Plus,
  Search
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


const InvoiceDisputeTracker: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <SEOHelmet
        title="Invoice Dispute Tracker - Dispute Management Tool | MoneyCal"
        description="Track and manage invoice disputes effectively. Monitor dispute resolution, document communications, and maintain detailed records for better client relationships."
        keywords="invoice dispute tracker, dispute management, resolution tracking, client disputes, invoice conflicts"
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Invoice Dispute Tracker
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Track and manage invoice disputes with comprehensive resolution tracking and documentation.
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dispute Management Tool</h2>
          <p className="text-gray-600 mb-4">
            This tool helps you track and manage invoice disputes, monitor resolution progress, and maintain detailed documentation for better client relationships.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">Features</h3>
              <ul className="text-red-800 text-sm space-y-1">
                <li>• Dispute management</li>
                <li>• Resolution tracking</li>
                <li>• Documentation</li>
                <li>• Status monitoring</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">Dispute Categories</h3>
              <ul className="text-orange-800 text-sm space-y-1">
                <li>• Pricing disputes</li>
                <li>• Quality issues</li>
                <li>• Delivery problems</li>
                <li>• Terms conflicts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppBanner />
    </div>
  );
};

export default InvoiceDisputeTracker;
