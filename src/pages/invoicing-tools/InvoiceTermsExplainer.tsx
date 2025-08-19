import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
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
  BookOpen,
  HelpCircle
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

const InvoiceTermsExplainer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <SEOHelmet
        title="Invoice Terms Explainer - Legal Guidance & Best Practices | MoneyCal"
        description="Understand and explain invoice terms and conditions. Get legal guidance and best practices for creating clear, enforceable invoice terms."
        keywords="invoice terms, payment terms, legal guidance, invoice conditions, business terms"
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Invoice Terms Explainer
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Understand and explain invoice terms and conditions with legal guidance and best practices.
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Legal Guidance & Terms Explanation</h2>
          <p className="text-gray-600 mb-4">
            This tool helps you understand common invoice terms, provides legal guidance, and offers best practices for creating clear and enforceable invoice terms.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-indigo-900 mb-2">Features</h3>
              <ul className="text-indigo-800 text-sm space-y-1">
                <li>• Terms explanation</li>
                <li>• Legal guidance</li>
                <li>• Best practices</li>
                <li>• Template library</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Common Terms</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Net 30, Net 60</li>
                <li>• Late payment fees</li>
                <li>• Early payment discounts</li>
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

export default InvoiceTermsExplainer;
