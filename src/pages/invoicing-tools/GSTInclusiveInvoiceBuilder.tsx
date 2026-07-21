import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
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
  Timer,
  Send,
  Receipt
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


const GSTInclusiveInvoiceBuilder: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-100">
      <SEOHelmet
        title="GST-Inclusive Invoice Builder - Tax Compliant Invoice Generator | MoneyCal"
        description="Build invoices with automatic GST inclusion. Generate tax-compliant invoices with automatic GST calculation, tax breakdown, and compliance-ready formatting for Indian businesses."
        keywords="GST invoice builder, tax inclusive invoice, GST calculation, tax compliant invoice, Indian GST invoice, automatic tax calculation"
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GST-Inclusive Invoice Builder
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Build invoices with automatic GST inclusion and tax-compliant formatting.
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Tax-Compliant Invoice Generation</h2>
          <p className="text-gray-600 mb-4">
            This tool helps you build professional invoices with automatic GST inclusion, tax calculation, and compliance-ready formatting for Indian businesses, ensuring all tax requirements are met.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-lime-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lime-900 mb-2">Features</h3>
              <ul className="text-lime-800 text-sm space-y-1">
                <li>• GST inclusion</li>
                <li>• Tax calculation</li>
                <li>• Compliance ready</li>
                <li>• Automatic formatting</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Tax Elements</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• CGST & SGST breakdown</li>
                <li>• IGST calculation</li>
                <li>• Tax summary</li>
                <li>• Compliance checks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppBanner />
    </div>
  );
};

export default GSTInclusiveInvoiceBuilder;
