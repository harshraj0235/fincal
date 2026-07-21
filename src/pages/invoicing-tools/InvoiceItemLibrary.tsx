import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
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
  Timer,
  Send,
  Receipt,
  Map,
  CreditCard,
  Zap,
  Target,
  HelpCircle,
  Database,
  FolderOpen,
  FileText,
  Tag,
  Package,
  ShoppingCart,
  Archive,
  RefreshCw,
  Edit3,
  Trash2,
  Copy,
  Star as StarIcon
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


interface InvoiceItem {
  id: string;
  name: string;
  description: string;
  category: string;
  defaultRate: number;
  unit: string;
  tags: string[];
  isFavorite: boolean;
  usageCount: number;
  lastUsed: string;
}

const InvoiceItemLibrary: React.FC = () => {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InvoiceItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<InvoiceItem>>({
    name: '',
    description: '',
    category: '',
    defaultRate: 0,
    unit: 'piece',
    tags: [],
    isFavorite: false
  });

  // Sample data - in real app this would come from localStorage or API
  useEffect(() => {
    const sampleItems: InvoiceItem[] = [
      {
        id: '1',
        name: 'Web Development',
        description: 'Custom website development services',
        category: 'Services',
        defaultRate: 5000,
        unit: 'project',
        tags: ['web', 'development', 'custom'],
        isFavorite: true,
        usageCount: 15,
        lastUsed: '2025-01-10'
      },
      {
        id: '2',
        name: 'Consulting Hours',
        description: 'Professional consulting services',
        category: 'Services',
        defaultRate: 2000,
        unit: 'hour',
        tags: ['consulting', 'professional', 'advice'],
        isFavorite: true,
        usageCount: 23,
        lastUsed: '2025-01-12'
      },
      {
        id: '3',
        name: 'Design Services',
        description: 'Graphic design and branding',
        category: 'Services',
        defaultRate: 3000,
        unit: 'project',
        tags: ['design', 'graphic', 'branding'],
        isFavorite: false,
        usageCount: 8,
        lastUsed: '2025-01-08'
      },
      {
        id: '4',
        name: 'Software License',
        description: 'Annual software license fee',
        category: 'Products',
        defaultRate: 12000,
        unit: 'year',
        tags: ['software', 'license', 'annual'],
        isFavorite: false,
        usageCount: 5,
        lastUsed: '2025-01-05'
      }
    ];
    setItems(sampleItems);
  }, []);

  const categories = ['all', 'Services', 'Products', 'Consulting', 'Training', 'Support'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addItem = () => {
    if (newItem.name && newItem.description && newItem.category) {
      const item: InvoiceItem = {
        id: Date.now().toString(),
        name: newItem.name,
        description: newItem.description,
        category: newItem.category,
        defaultRate: newItem.defaultRate || 0,
        unit: newItem.unit || 'piece',
        tags: newItem.tags || [],
        isFavorite: newItem.isFavorite || false,
        usageCount: 0,
        lastUsed: new Date().toISOString().split('T')[0]
      };
      setItems(prev => [...prev, item]);
      setNewItem({
        name: '',
        description: '',
        category: '',
        defaultRate: 0,
        unit: 'piece',
        tags: [],
        isFavorite: false
      });
      setShowAddModal(false);
    }
  };

  const toggleFavorite = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const editItem = (item: InvoiceItem) => {
    setEditingItem(item);
    setNewItem(item);
    setShowAddModal(true);
  };

  const updateItem = () => {
    if (editingItem && newItem.name && newItem.description && newItem.category) {
      setItems(prev => prev.map(item => 
        item.id === editingItem.id ? {
          ...item,
          name: newItem.name!,
          description: newItem.description!,
          category: newItem.category!,
          defaultRate: newItem.defaultRate || 0,
          unit: newItem.unit || 'piece',
          tags: newItem.tags || [],
          isFavorite: newItem.isFavorite || false
        } : item
      ));
      setEditingItem(null);
      setNewItem({
        name: '',
        description: '',
        category: '',
        defaultRate: 0,
        unit: 'piece',
        tags: [],
        isFavorite: false
      });
      setShowAddModal(false);
    }
  };

  const addTag = (tag: string) => {
    if (tag && !newItem.tags?.includes(tag)) {
      setNewItem(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewItem(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <SEOHelmet
        title="Invoice Item Library - Auto-Complete Item Management | MoneyCal"
        description="Manage your invoice items with auto-complete functionality. Create, organize, and reuse invoice items with smart suggestions and categorization for efficient invoicing."
        keywords="invoice item library, auto-complete items, invoice management, item database, smart suggestions, invoice templates, item categorization"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Invoice Item Library
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Manage your invoice items with auto-complete functionality. Create, organize, and reuse invoice items 
            with smart suggestions and categorization for efficient invoicing.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Database className="w-4 h-4 mr-2" />
              Auto-Complete
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              Smart Suggestions
            </div>
            <div className="flex items-center">
              <FolderOpen className="w-4 h-4 mr-2" />
              Item Management
            </div>
            <div className="flex items-center">
              <Search className="w-4 h-4 mr-2" />
              Quick Search
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <FolderOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-emerald-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-emerald-600">{items.length}</div>
              <div className="text-sm text-gray-600">Total Items</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{items.filter(item => item.isFavorite).length}</div>
              <div className="text-sm text-gray-600">Favorites</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{categories.length - 1}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{items.reduce((sum, item) => sum + item.usageCount, 0)}</div>
              <div className="text-sm text-gray-600">Total Usage</div>
            </div>
          </div>
        </motion.div>

        {/* Items Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">₹{item.defaultRate.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">per {item.unit}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                      {item.category}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">Used {item.usageCount} times</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    item.isFavorite 
                      ? 'text-yellow-500 hover:bg-yellow-50' 
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <StarIcon className={`w-5 h-5 ${item.isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => editItem(item)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter item name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter item description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      {categories.filter(cat => cat !== 'all').map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Rate</label>
                    <input
                      type="number"
                      value={newItem.defaultRate}
                      onChange={(e) => setNewItem(prev => ({ ...prev, defaultRate: parseFloat(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <select
                      value={newItem.unit}
                      onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="piece">Piece</option>
                      <option value="hour">Hour</option>
                      <option value="day">Day</option>
                      <option value="project">Project</option>
                      <option value="month">Month</option>
                      <option value="year">Year</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newItem.tags?.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 bg-emerald-100 text-emerald-800 text-sm rounded">
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-emerald-600 hover:text-emerald-800"
                        >
                          <XCircle className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add tag"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.target as HTMLInputElement;
                          if (input.value.trim()) {
                            addTag(input.value.trim());
                            input.value = '';
                          }
                        }
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => {
                        const input = document.querySelector('input[placeholder="Add tag"]') as HTMLInputElement;
                        if (input && input.value.trim()) {
                          addTag(input.value.trim());
                          input.value = '';
                        }
                      }}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="favorite"
                    checked={newItem.isFavorite}
                    onChange={(e) => setNewItem(prev => ({ ...prev, isFavorite: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="favorite" className="ml-2 text-sm text-gray-700">
                    Mark as favorite
                  </label>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingItem(null);
                    setNewItem({
                      name: '',
                      description: '',
                      category: '',
                      defaultRate: 0,
                      unit: 'piece',
                      tags: [],
                      isFavorite: false
                    });
                  }}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingItem ? updateItem : addItem}
                  className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Comprehensive Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Invoice Item Library - Complete Guide</h2>
          
          <div className="prose prose-lg max-w-none">
            <h3>What is an Invoice Item Library?</h3>
            <p>
              An invoice item library is a comprehensive database of products and services that you frequently use in your invoices. 
              It provides auto-complete functionality, smart suggestions, and efficient item management to streamline your invoicing process.
            </p>

            <h3>Key Features</h3>
            <ul>
              <li><strong>Auto-Complete:</strong> Smart suggestions as you type item names</li>
              <li><strong>Item Management:</strong> Create, edit, and organize your invoice items</li>
              <li><strong>Categories:</strong> Organize items by categories for easy access</li>
              <li><strong>Tags:</strong> Add multiple tags for better search and organization</li>
              <li><strong>Favorites:</strong> Mark frequently used items as favorites</li>
              <li><strong>Usage Tracking:</strong> Monitor how often each item is used</li>
              <li><strong>Default Rates:</strong> Set standard pricing for consistent invoicing</li>
            </ul>

            <h3>Benefits of Using an Item Library</h3>
            <p>
              An organized item library saves time, reduces errors, and ensures consistency in your invoicing. 
              It helps you maintain professional pricing, track popular services, and improve your invoicing efficiency.
            </p>

            <h3>Related Tools</h3>
            <p>
              Enhance your invoicing workflow with our related tools including the 
              <a href="/invoicing-tools/custom-invoice-generator" className="text-blue-600 hover:underline"> Custom Invoice Generator</a> for creating professional invoices,
              <a href="/invoicing-tools/recurring-invoice-scheduler" className="text-blue-600 hover:underline"> Recurring Invoice Scheduler</a> for automated billing, and
              <a href="/invoicing-tools/invoice-due-date-tracker" className="text-blue-600 hover:underline"> Invoice Due Date Tracker</a> for payment monitoring.
            </p>
          </div>
        </motion.div>
      </div>

      <WhatsAppBanner />
    </div>
  );
};

export default InvoiceItemLibrary;

