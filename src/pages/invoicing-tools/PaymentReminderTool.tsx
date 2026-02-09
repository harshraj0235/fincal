import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
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
  Bell
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

const PaymentReminderTool: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <SEOHelmet
        title="Payment Reminder Tool - Automated Collection Management | MoneyCal"
        description="Send automated payment reminders to clients. Track follow-ups, manage collection process, and improve cash flow with smart reminder scheduling."
        keywords="payment reminder, collection tool, automated reminders, follow up tracking, payment collection"
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment Reminder Tool
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Send automated payment reminders to clients and track your collection process effectively.
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Automated Collection Management</h2>
          <p className="text-gray-600 mb-4">
            This tool helps you automate payment reminders, track follow-ups, and manage your collection process to improve cash flow.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">Features</h3>
              <ul className="text-orange-800 text-sm space-y-1">
                <li>• Auto reminders</li>
                <li>• Email templates</li>
                <li>• Follow-up tracking</li>
                <li>• Collection management</li>
              </ul>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">Reminder Types</h3>
              <ul className="text-red-800 text-sm space-y-1">
                <li>• Due date reminders</li>
                <li>• Overdue notifications</li>
                <li>• Follow-up sequences</li>
                <li>• Escalation alerts</li>
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

export default PaymentReminderTool;
