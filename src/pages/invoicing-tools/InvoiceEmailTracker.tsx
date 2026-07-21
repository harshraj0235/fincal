import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
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
  Palette,
  Image,
  Type,
  Shield,
  Star,
  Calculator,
  Timer,
  Send
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


const InvoiceEmailTracker: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      <SEOHelmet
        title="Invoice Email Tracker - Email Analytics & Delivery Status | MoneyCal"
        description="Track invoice emails and delivery status. Monitor email analytics, open rates, delivery confirmation, and optimize your invoice communication for better payment collection."
        keywords="invoice email tracker, email analytics, delivery status, open rate analysis, email tracking, invoice communication"
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Invoice Email Tracker
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Track invoice emails and delivery status with comprehensive analytics.
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Email Analytics & Delivery Tracking</h2>
          <p className="text-gray-600 mb-4">
            This tool helps you track invoice emails, monitor delivery status, analyze open rates, and optimize your invoice communication for better payment collection and client engagement.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-50 p-4 rounded-lg">
              <h3 className="font-semibold text-rose-900 mb-2">Features</h3>
              <ul className="text-rose-800 text-sm space-y-1">
                <li>• Email tracking</li>
                <li>• Delivery status</li>
                <li>• Open rate analysis</li>
                <li>• Communication optimization</li>
              </ul>
            </div>
            
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-semibold text-pink-900 mb-2">Tracking Metrics</h3>
              <ul className="text-pink-800 text-sm space-y-1">
                <li>• Email delivery confirmation</li>
                <li>• Open and click rates</li>
                <li>• Response tracking</li>
                <li>• Engagement analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppBanner />
    </div>
  );
};

export default InvoiceEmailTracker;
