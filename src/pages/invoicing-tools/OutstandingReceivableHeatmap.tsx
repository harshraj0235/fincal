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
  Timer,
  Send,
  Receipt,
  Map
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

const OutstandingReceivableHeatmap: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <SEOHelmet
        title="Outstanding Receivable Heatmap - Risk Analysis & Collection Priority | MoneyCal"
        description="Visualize outstanding receivables with heatmap analysis. Identify high-risk accounts, prioritize collection efforts, and optimize your receivables management with visual risk assessment."
        keywords="outstanding receivable heatmap, risk analysis, collection priority, receivables visualization, risk assessment, collection management"
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Outstanding Receivable Heatmap
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Visualize outstanding receivables with heatmap analysis for better risk assessment.
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Risk Analysis & Collection Priority</h2>
          <p className="text-gray-600 mb-4">
            This tool helps you visualize outstanding receivables using heatmap analysis, identify high-risk accounts, prioritize collection efforts, and optimize your receivables management strategy.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="font-semibold text-amber-900 mb-2">Features</h3>
              <ul className="text-amber-800 text-sm space-y-1">
                <li>• Heatmap visualization</li>
                <li>• Risk analysis</li>
                <li>• Collection priority</li>
                <li>• Visual assessment</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">Analysis Elements</h3>
              <ul className="text-orange-800 text-sm space-y-1">
                <li>• Risk scoring</li>
                <li>• Aging analysis</li>
                <li>• Priority ranking</li>
                <li>• Collection strategy</li>
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

export default OutstandingReceivableHeatmap;
