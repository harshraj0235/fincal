import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
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
  Star
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

const ClientPaymentBehaviorScoreTool: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <SEOHelmet
        title="Client Payment Behavior Score Tool - Risk Assessment | MoneyCal"
        description="Score and analyze client payment behavior patterns. Assess payment risks, track client reliability, and make informed credit decisions for better cash flow management."
        keywords="client payment behavior, payment scoring, risk assessment, client reliability, credit analysis"
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Client Payment Behavior Score Tool
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Score and analyze client payment behavior patterns for better risk assessment.
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Behavior Analysis & Risk Assessment</h2>
          <p className="text-gray-600 mb-4">
            This tool helps you score and analyze client payment behavior patterns, assess payment risks, and make informed credit decisions for better cash flow management.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h3 className="font-semibold text-emerald-900 mb-2">Features</h3>
              <ul className="text-emerald-800 text-sm space-y-1">
                <li>• Behavior scoring</li>
                <li>• Risk assessment</li>
                <li>• Payment analysis</li>
                <li>• Credit evaluation</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Scoring Factors</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• Payment history</li>
                <li>• Payment delays</li>
                <li>• Invoice disputes</li>
                <li>• Communication quality</li>
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

export default ClientPaymentBehaviorScoreTool;
