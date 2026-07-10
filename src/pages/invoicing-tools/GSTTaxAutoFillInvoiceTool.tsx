import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  FileText, 
  Download, 
  Save,
  Eye,
  Printer,
  Mail,
  Settings,
  Building,
  Calendar,
  DollarSign,
  Percent,
  Hash,
  Smartphone,
  Info,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
  PieChart
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

const GSTTaxAutoFillInvoiceTool: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <SEOHelmet
        title="GST Tax Auto-Fill Invoice Tool - Automatic GST Calculation | MoneyCal"
        description="Create GST-compliant invoices with automatic tax calculation. Generate professional invoices with CGST, SGST, and IGST breakdown for Indian businesses."
        keywords="GST invoice tool, GST Calculator, CGST SGST IGST, tax invoice generator, GST compliance, Indian tax invoice"
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GST Tax Auto-Fill Invoice Tool
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Create GST-compliant invoices with automatic tax calculation and compliance features.
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">GST Invoice Generator</h2>
          <p className="text-gray-600 mb-4">
            This tool helps you create GST-compliant invoices with automatic tax calculations including CGST, SGST, and IGST.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Features</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Automatic GST calculation</li>
                <li>• CGST, SGST, and IGST breakdown</li>
                <li>• Tax compliance features</li>
                <li>• Professional invoice format</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">GST Rates</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• 0% - Exempt items</li>
                <li>• 5% - Reduced rate</li>
                <li>• 12% - Standard rate</li>
                <li>• 18% - Standard rate</li>
                <li>• 28% - Higher rate</li>
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

export default GSTTaxAutoFillInvoiceTool;
