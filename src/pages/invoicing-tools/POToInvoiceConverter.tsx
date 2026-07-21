import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
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
  Search,
  ArrowRight
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


const POToInvoiceConverter: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <SEOHelmet
        title="PO to Invoice Converter - Automatic Purchase Order Conversion | MoneyCal"
        description="Convert purchase orders to invoices automatically. Streamline your billing process with intelligent PO-to-invoice conversion and template matching."
        keywords="PO to invoice converter, purchase order conversion, automatic invoice generation, PO processing"
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PO to Invoice Converter
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Convert purchase orders to invoices automatically with intelligent template matching.
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Purchase Order Conversion Tool</h2>
          <p className="text-gray-600 mb-4">
            This tool helps you automatically convert purchase orders to professional invoices, saving time and reducing manual errors.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Features</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• PO conversion</li>
                <li>• Auto generation</li>
                <li>• Template matching</li>
                <li>• Data extraction</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Conversion Process</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Upload PO document</li>
                <li>• Extract key data</li>
                <li>• Generate invoice</li>
                <li>• Review and send</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppBanner />
    </div>
  );
};

export default POToInvoiceConverter;
