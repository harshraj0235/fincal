import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
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
  Type
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

const CustomInvoiceThemeCreator: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
      <SEOHelmet
        title="Custom Invoice Theme Creator - Branding & Design Tool | MoneyCal"
        description="Create custom invoice themes and branding. Design professional invoice templates with your brand colors, logos, and styling for consistent business identity."
        keywords="custom invoice themes, invoice branding, template design, invoice customization, brand design"
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Custom Invoice Theme Creator
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Create custom invoice themes and branding for consistent business identity.
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Theme Customization & Branding Tools</h2>
          <p className="text-gray-600 mb-4">
            This tool helps you create professional invoice templates with your brand colors, logos, and styling for a consistent business identity across all your invoices.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-2">Features</h3>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Theme customization</li>
                <li>• Branding tools</li>
                <li>• Template design</li>
                <li>• Color schemes</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">Design Elements</h3>
              <ul className="text-orange-800 text-sm space-y-1">
                <li>• Logo placement</li>
                <li>• Font selection</li>
                <li>• Color palettes</li>
                <li>• Layout options</li>
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

export default CustomInvoiceThemeCreator;
