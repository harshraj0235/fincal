import React, { useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { FileText, Download, Save, Building, Target, TrendingUp, CheckCircle } from 'lucide-react';

interface ProposalForm {
  client: string;
  product: string;
  price: string;
  terms: string;
  notes: string;
  validity: string;
  paymentTerms: string;
  deliverables: string;
  timeline: string;
  contactInfo: string;
}

interface Proposal extends ProposalForm {
  id: number;
}

const OfferProposalTemplateBuilder: React.FC = () => {
  const [form, setForm] = useState<ProposalForm>({
    client: '',
    product: '',
    price: '',
    terms: '',
    notes: '',
    validity: '',
    paymentTerms: '',
    deliverables: '',
    timeline: '',
    contactInfo: ''
  });

  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [activeTab, setActiveTab] = useState('builder');

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const saveProposal = () => {
    if (form.client.trim() && form.product.trim()) {
      setProposals(prev => [...prev, { ...form, id: Date.now() }]);
      setForm({
        client: '', product: '', price: '', terms: '', notes: '',
        validity: '', paymentTerms: '', deliverables: '', timeline: '', contactInfo: ''
      });
    }
  };

  const downloadProposal = (proposalData: Proposal) => {
    const content = `BUSINESS PROPOSAL

Client: ${proposalData.client}
Product/Service: ${proposalData.product}
Price: ${proposalData.price}
Terms: ${proposalData.terms}
Validity: ${proposalData.validity}
Payment Terms: ${proposalData.paymentTerms}
Deliverables: ${proposalData.deliverables}
Timeline: ${proposalData.timeline}
Contact Information: ${proposalData.contactInfo}

Notes: ${proposalData.notes}

Generated on: ${new Date().toLocaleDateString()}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `proposal-${proposalData.client.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sampleTemplates = [
    {
      name: 'Software Development Proposal',
      description: 'Comprehensive proposal for custom software development projects',
      category: 'Technology',
      template: 'Professional software development proposal with detailed scope, timeline, and deliverables.'
    },
    {
      name: 'Marketing Services Proposal',
      description: 'Complete marketing proposal template for digital marketing services',
      category: 'Marketing',
      template: 'Digital marketing proposal including SEO, social media, and content marketing services.'
    },
    {
      name: 'Consulting Services Proposal',
      description: 'Professional consulting proposal template for business advisory services',
      category: 'Consulting',
      template: 'Business consulting proposal with strategic recommendations and implementation plan.'
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Offer/Proposal Template Builder - Professional Business Proposals | MoneyCal.in"
        description="Create professional business proposals and offers with our comprehensive template builder. Generate detailed proposals for clients with proper structure and formatting."
        keywords="proposal template builder, business proposal, offer template, professional proposal, client proposal, business offer"
        url="/tools/offer-proposal-template-builder"
        type="website"
        image="/images/proposal-builder.jpg"
        tags={["business tools", "proposal builder", "offer template", "professional proposals", "client management"]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <FileText className="h-12 w-12 text-purple-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Offer/Proposal Template Builder
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create professional business proposals and offers with our comprehensive template builder. 
              Generate detailed proposals for clients with proper structure and formatting.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => setActiveTab('builder')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'builder' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FileText className="h-4 w-4 inline mr-2" />
                Proposal Builder
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'saved' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Save className="h-4 w-4 inline mr-2" />
                Saved Proposals
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'templates' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Building className="h-4 w-4 inline mr-2" />
                Sample Templates
              </button>
            </div>
          </div>

          {activeTab === 'builder' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Target className="h-6 w-6 mr-2 text-purple-600" />
                  Build Your Proposal
                </h2>
                
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                        <input
                          type="text"
                          value={form.client}
                          onChange={(e) => handleInputChange('client', e.target.value)}
                          placeholder="e.g., ABC Corporation"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product/Service</label>
                        <input
                          type="text"
                          value={form.product}
                          onChange={(e) => handleInputChange('product', e.target.value)}
                          placeholder="e.g., Custom Software Development"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input
                          type="text"
                          value={form.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          placeholder="e.g., ₹5,00,000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Terms and Conditions</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Terms</label>
                        <textarea
                          value={form.terms}
                          onChange={(e) => handleInputChange('terms', e.target.value)}
                          placeholder="e.g., Payment in 3 installments, 50% upfront"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Validity Period</label>
                        <input
                          type="text"
                          value={form.validity}
                          onChange={(e) => handleInputChange('validity', e.target.value)}
                          placeholder="e.g., 30 days from date of proposal"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                        <textarea
                          value={form.paymentTerms}
                          onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                          placeholder="e.g., 50% advance, 30% on milestone completion, 20% on delivery"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deliverables</label>
                        <textarea
                          value={form.deliverables}
                          onChange={(e) => handleInputChange('deliverables', e.target.value)}
                          placeholder="e.g., Complete software solution, documentation, training"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                        <input
                          type="text"
                          value={form.timeline}
                          onChange={(e) => handleInputChange('timeline', e.target.value)}
                          placeholder="e.g., 3 months from project start"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Information</label>
                        <textarea
                          value={form.contactInfo}
                          onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                          placeholder="e.g., Email: contact@company.com, Phone: +91-9876543210"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Any additional information, special conditions, or clarifications"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={saveProposal}
                    className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Proposal
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-green-600" />
                  Proposal Preview
                </h2>
                
                {form.client && form.product ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">BUSINESS PROPOSAL</h3>
                      <p className="text-gray-600"><strong>Client:</strong> {form.client}</p>
                      <p className="text-gray-600"><strong>Service:</strong> {form.product}</p>
                      <p className="text-gray-600"><strong>Price:</strong> {form.price}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">Terms</h4>
                        <p className="text-gray-600">{form.terms || 'Not specified'}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Timeline</h4>
                        <p className="text-gray-600">{form.timeline || 'Not specified'}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Deliverables</h4>
                        <p className="text-gray-600">{form.deliverables || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Start building your proposal to see a preview here</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Save className="h-6 w-6 mr-2 text-purple-600" />
                Saved Proposals
              </h2>
              
              {proposals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {proposals.map((proposal) => (
                    <div key={proposal.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-800">{proposal.client}</h3>
                        <button
                          onClick={() => downloadProposal(proposal)}
                          className="text-purple-600 hover:text-purple-800"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{proposal.product}</p>
                      <p className="text-sm text-gray-600 mb-2">{proposal.price}</p>
                      <p className="text-sm text-gray-600">{proposal.timeline}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Save className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No saved proposals yet. Create your first proposal!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Building className="h-6 w-6 mr-2 text-blue-600" />
                Sample Templates
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sampleTemplates.map((template, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {template.category}
                    </span>
                    <p className="text-sm text-gray-600 mt-2">{template.template}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Educational Content */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Target className="h-5 w-5 mr-2 text-purple-600" />
                Proposal Best Practices
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Clearly define scope and deliverables</li>
                <li>• Include detailed pricing breakdown</li>
                <li>• Specify timeline and milestones</li>
                <li>• Add terms and conditions</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Success Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Personalize for each client</li>
                <li>• Highlight unique value proposition</li>
                <li>• Include case studies or testimonials</li>
                <li>• Follow up after submission</li>
              </ul>
        </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                Key Elements
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Executive summary</li>
                <li>• Problem statement</li>
                <li>• Proposed solution</li>
                <li>• Pricing and timeline</li>
              </ul>
          </div>
        </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Note</h3>
            <p className="text-yellow-700 text-sm">
              This proposal builder is a tool to help create professional business proposals. 
              Always review and customize proposals according to your specific business needs and legal requirements. 
              Consider consulting with legal professionals for complex business agreements.
            </p>
          </div>
      </div>
    </div>
    </>
  );
};

export default OfferProposalTemplateBuilder; 
