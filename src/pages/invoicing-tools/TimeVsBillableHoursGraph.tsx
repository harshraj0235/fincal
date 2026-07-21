import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
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
  Calculator,
  Timer
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


const TimeVsBillableHoursGraph: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      <SEOHelmet
        title="Time vs Billable Hours Graph - Productivity Analysis Tool | MoneyCal"
        description="Compare actual time vs billable hours with visual graphs. Track productivity, analyze billable efficiency, and optimize your time management for better profitability."
        keywords="billable hours graph, time tracking, productivity analysis, billable efficiency, time management, profitability analysis"
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Time vs Billable Hours Graph
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Compare actual time vs billable hours with visual graphs for better productivity analysis.
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Productivity Analysis & Time Tracking</h2>
          <p className="text-gray-600 mb-4">
            This tool helps you compare actual time spent vs billable hours, track productivity metrics, and analyze billable efficiency to optimize your time management and profitability.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-sky-50 p-4 rounded-lg">
              <h3 className="font-semibold text-sky-900 mb-2">Features</h3>
              <ul className="text-sky-800 text-sm space-y-1">
                <li>• Time tracking</li>
                <li>• Billable analysis</li>
                <li>• Visual graphs</li>
                <li>• Productivity metrics</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Analysis Elements</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Efficiency ratios</li>
                <li>• Time utilization</li>
                <li>• Billable percentage</li>
                <li>• Performance trends</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppBanner />
    </div>
  );
};

export default TimeVsBillableHoursGraph;
