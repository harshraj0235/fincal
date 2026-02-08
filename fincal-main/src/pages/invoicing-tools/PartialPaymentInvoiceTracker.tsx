import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Receipt, 
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
  Activity,
  Palette,
  Image,
  Type,
  Shield,
  Star,
  Calculator
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

const PartialPaymentInvoiceTracker: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100">
      <SEOHelmet
        title="Partial Payment Invoice Tracker - Payment Tracking Tool | MoneyCal"
        description="Track partial payments and outstanding amounts. Monitor payment history, calculate remaining balances, and manage installment payments effectively."
        keywords="partial payment tracker, outstanding calculation, payment history, installment tracking, payment management"
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Partial Payment Invoice Tracker
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Track partial payments and outstanding amounts with detailed payment history.
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Tracking & Outstanding Calculation</h2>
          <p className="text-gray-600 mb-4">
            This tool helps you track partial payments, calculate outstanding amounts, and maintain detailed payment history for better cash flow management and client communication.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-violet-50 p-4 rounded-lg">
              <h3 className="font-semibold text-violet-900 mb-2">Features</h3>
              <ul className="text-violet-800 text-sm space-y-1">
                <li>• Partial payment tracking</li>
                <li>• Outstanding calculation</li>
                <li>• Payment history</li>
                <li>• Balance monitoring</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Tracking Elements</h3>
              <ul className="text-purple-800 text-sm space-y-1">
                <li>• Payment dates</li>
                <li>• Payment amounts</li>
                <li>• Remaining balance</li>
                <li>• Payment methods</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppBanner />
      <AstroFinanceButton />
    </div>
  );
};

export default PartialPaymentInvoiceTracker;
