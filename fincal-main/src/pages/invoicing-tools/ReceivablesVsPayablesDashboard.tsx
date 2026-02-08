import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, 
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
  Clock,
  DollarSign,
  Users,
  MessageSquare,
  Flag,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

const ReceivablesVsPayablesDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <SEOHelmet
        title="Receivables vs Payables Dashboard - Cash Flow Management | MoneyCal"
        description="Compare receivables and payables for effective cash flow management. Analyze financial health with comprehensive dashboard views and comparison reports."
        keywords="receivables payables dashboard, cash flow analysis, financial comparison, business analytics"
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Receivables vs Payables Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Compare receivables and payables for effective cash flow management and financial analysis.
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cash Flow Analysis Dashboard</h2>
          <p className="text-gray-600 mb-4">
            This tool provides comprehensive analysis of your receivables and payables, helping you understand your cash flow position and make informed financial decisions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Features</h3>
              <ul className="text-purple-800 text-sm space-y-1">
                <li>• Cash flow analysis</li>
                <li>• Comparison reports</li>
                <li>• Dashboard view</li>
                <li>• Financial insights</li>
              </ul>
            </div>
            
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-semibold text-pink-900 mb-2">Key Metrics</h3>
              <ul className="text-pink-800 text-sm space-y-1">
                <li>• Receivables aging</li>
                <li>• Payables due dates</li>
                <li>• Cash flow ratio</li>
                <li>• Working capital</li>
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

export default ReceivablesVsPayablesDashboard;
