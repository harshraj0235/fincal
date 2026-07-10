import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Bike, IndianRupee, Calendar, Shield, AlertCircle, Plus, Trash2, Edit3, Download, Link } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const TwoWheelerTracker: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [vehicles, setVehicles] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    vehicleType: 'motorcycle',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    engineCC: 150,
    purchasePrice: 100000,
    registrationNumber: '',
    insuranceProvider: '',
    policyNumber: '',
    premiumAmount: 0,
    renewalDate: '',
    coverageType: 'comprehensive'
  });

  const vehicleTypes = [
    { name: 'Motorcycle', factor: 1.0, icon: '🏍️' },
    { name: 'Scooter', factor: 0.8, icon: '🛵' },
    { name: 'Moped', factor: 0.6, icon: '🛴' }
  ];

  const brands = [
    'Bajaj', 'Hero', 'Honda', 'TVS', 'Yamaha', 'Royal Enfield', 'KTM', 'Suzuki', 'Mahindra', 'Jawa'
  ];

  const coverageTypes = [
    { name: 'Third Party', rate: 0.02, description: 'Basic liability coverage' },
    { name: 'Comprehensive', rate: 0.05, description: 'Full coverage with own damage' },
    { name: 'Zero Depreciation', rate: 0.08, description: 'Full coverage without depreciation' }
  ];

  const calculatePremium = (vehicle) => {
    const { vehicleType, year, engineCC, purchasePrice, coverageType } = vehicle;
    
    // Get vehicle type factor
    const typeData = vehicleTypes.find(t => t.name.toLowerCase().includes(vehicleType.toLowerCase()));
    const typeFactor = typeData?.factor || 1.0;
    
    // Get coverage rate
    const coverage = coverageTypes.find(c => c.name.toLowerCase().includes(coverageType.toLowerCase()));
    const coverageRate = coverage?.rate || 0.05;
    
    // Calculate age factor
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    const ageFactor = age > 5 ? 1.3 : age > 3 ? 1.1 : 1.0;
    
    // Calculate premium
    const basePremium = (purchasePrice / 100000) * coverageRate * 1000;
    const premium = basePremium * typeFactor * ageFactor;
    
    return Math.round(premium);
  };

  const addVehicle = () => {
    if (!formData.brand || !formData.model || !formData.registrationNumber) {
      alert('Please fill in all required fields');
      return;
    }

    const premium = calculatePremium(formData);
    const newVehicle = {
      id: Date.now(),
      ...formData,
      premiumAmount: premium,
      renewalDate: formData.renewalDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    if (editingVehicle) {
      setVehicles(vehicles.map(v => v.id === editingVehicle.id ? newVehicle : v));
      setEditingVehicle(null);
    } else {
      setVehicles([...vehicles, newVehicle]);
    }

    setFormData({
      vehicleType: 'motorcycle',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      engineCC: 150,
      purchasePrice: 100000,
      registrationNumber: '',
      insuranceProvider: '',
      policyNumber: '',
      premiumAmount: 0,
      renewalDate: '',
      coverageType: 'comprehensive'
    });
    setShowAddForm(false);
  };

  const deleteVehicle = (id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  const editVehicle = (vehicle) => {
    setFormData(vehicle);
    setEditingVehicle(vehicle);
    setShowAddForm(true);
  };

  const getDaysUntilRenewal = (renewalDate) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diffTime = renewal - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const downloadPDF = async () => {
    if (!resultsRef.current) return;

    try {
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save('two-wheeler-insurance-tracker.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <>
      <SEOHelmet
        title="Two-Wheeler Insurance Tracker - Bike Insurance Calculator India | MoneyCal.in"
        description="Free two-wheeler insurance tracker for India. Compare bike insurance quotes, track renewal dates, and manage your two-wheeler insurance portfolio efficiently."
        keywords="two-wheeler insurance Calculator India, bike insurance renewal tracker, bike insurance cost tool, two wheeler insurance comparison"
        url="/insurance-tools/two-wheeler-tracker"
        type="website"
        image="/images/two-wheeler-tracker.jpg"
        tags={["two wheeler insurance", "bike insurance", "insurance tracker", "vehicle insurance"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </button>
          </div>

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Bike className="h-16 w-16 text-cyan-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Two-Wheeler Insurance Tracker
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Compare bike insurance quotes, track renewal dates, and manage your two-wheeler insurance portfolio efficiently.
            </p>
          </div>

          {/* Add Vehicle Button */}
          <div className="mb-8 text-center">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center mx-auto transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Two-Wheeler
            </button>
          </div>

          {/* Add/Edit Vehicle Form */}
          {showAddForm && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <IndianRupee className="h-6 w-6 text-cyan-600 mr-2" />
                {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vehicle Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Type
                  </label>
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    {vehicleTypes.map((type, index) => (
                      <option key={index} value={type.name.toLowerCase()}>
                        {type.icon} {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand *
                  </label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand, index) => (
                      <option key={index} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Model */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model *
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="e.g., Pulsar 150"
                  />
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manufacturing Year
                  </label>
                  <input
                    type="number"
                    min="1990"
                    max="2024"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                {/* Engine CC */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Engine Capacity (CC)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="1000"
                    value={formData.engineCC}
                    onChange={(e) => setFormData({...formData, engineCC: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                {/* Purchase Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purchase Price (₹)
                  </label>
                  <input
                    type="number"
                    min="10000"
                    value={formData.purchasePrice}
                    onChange={(e) => setFormData({...formData, purchasePrice: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                {/* Registration Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Number *
                  </label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({...formData, registrationNumber: e.target.value.toUpperCase()})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="e.g., KA01AB1234"
                  />
                </div>

                {/* Coverage Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coverage Type
                  </label>
                  <select
                    value={formData.coverageType}
                    onChange={(e) => setFormData({...formData, coverageType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    {coverageTypes.map((type, index) => (
                      <option key={index} value={type.name.toLowerCase()}>
                        {type.name} - {type.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Insurance Provider */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Provider
                  </label>
                  <input
                    type="text"
                    value={formData.insuranceProvider}
                    onChange={(e) => setFormData({...formData, insuranceProvider: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="e.g., Bajaj Allianz"
                  />
                </div>

                {/* Policy Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Policy Number
                  </label>
                  <input
                    type="text"
                    value={formData.policyNumber}
                    onChange={(e) => setFormData({...formData, policyNumber: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Policy number"
                  />
                </div>

                {/* Renewal Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Renewal Date
                  </label>
                  <input
                    type="date"
                    value={formData.renewalDate}
                    onChange={(e) => setFormData({...formData, renewalDate: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingVehicle(null);
                    setFormData({
                      vehicleType: 'motorcycle',
                      brand: '',
                      model: '',
                      year: new Date().getFullYear(),
                      engineCC: 150,
                      purchasePrice: 100000,
                      registrationNumber: '',
                      insuranceProvider: '',
                      policyNumber: '',
                      premiumAmount: 0,
                      renewalDate: '',
                      coverageType: 'comprehensive'
                    });
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addVehicle}
                  className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                </button>
              </div>
            </div>
          )}

          {/* Vehicles List */}
          {vehicles.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
              <Bike className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Vehicles Added</h3>
              <p className="text-gray-600 mb-6">
                Add your two-wheelers to start tracking their insurance details and renewal dates.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Add Your First Vehicle
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => {
                const daysUntilRenewal = getDaysUntilRenewal(vehicle.renewalDate);
                const isExpiringSoon = daysUntilRenewal <= 30;
                const isExpired = daysUntilRenewal < 0;

                return (
                  <div key={vehicle.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {vehicle.brand} {vehicle.model}
                        </h3>
                        <p className="text-sm text-gray-600">{vehicle.registrationNumber}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editVehicle(vehicle)}
                          className="p-2 text-gray-400 hover:text-cyan-600 transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteVehicle(vehicle.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Vehicle Type:</span>
                        <span className="text-sm font-medium">{vehicle.vehicleType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Year:</span>
                        <span className="text-sm font-medium">{vehicle.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Engine:</span>
                        <span className="text-sm font-medium">{vehicle.engineCC} CC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Coverage:</span>
                        <span className="text-sm font-medium capitalize">{vehicle.coverageType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Premium:</span>
                        <span className="text-sm font-medium text-cyan-600">
                          {formatCurrency(vehicle.premiumAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Renewal Date:</span>
                        <span className="text-sm font-medium">{formatDate(vehicle.renewalDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Days Until Renewal:</span>
                        <span className={`text-sm font-medium ${
                          isExpired ? 'text-red-600' : 
                          isExpiringSoon ? 'text-orange-600' : 
                          'text-green-600'
                        }`}>
                          {isExpired ? 'Expired' : `${daysUntilRenewal} days`}
                        </span>
                      </div>
                    </div>

                    {vehicle.insuranceProvider && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Provider:</span>
                          <span className="text-sm font-medium">{vehicle.insuranceProvider}</span>
                        </div>
                        {vehicle.policyNumber && (
                          <div className="flex justify-between mt-1">
                            <span className="text-sm text-gray-600">Policy No:</span>
                            <span className="text-sm font-medium">{vehicle.policyNumber}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {isExpiringSoon && (
                      <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-orange-600 mr-2" />
                          <span className="text-sm text-orange-800">
                            {isExpired ? 'Insurance expired!' : 'Insurance expiring soon!'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Summary */}
          {vehicles.length > 0 && (
            <div ref={resultsRef} className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Shield className="h-5 w-5 text-cyan-600 mr-2" />
                  Portfolio Summary
                </h3>
                <button
                  onClick={downloadPDF}
                  className="flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-cyan-50 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-600">{vehicles.length}</div>
                  <div className="text-sm text-gray-600">Total Vehicles</div>
                </div>
                <div className="text-center p-4 bg-cyan-50 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-600">
                    {formatCurrency(vehicles.reduce((sum, v) => sum + v.premiumAmount, 0))}
                  </div>
                  <div className="text-sm text-gray-600">Total Annual Premium</div>
                </div>
                <div className="text-center p-4 bg-cyan-50 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-600">
                    {vehicles.filter(v => getDaysUntilRenewal(v.renewalDate) <= 30).length}
                  </div>
                  <div className="text-sm text-gray-600">Expiring Soon</div>
                </div>
              </div>
            </div>
          )}

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Two-Wheeler Insurance in India</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Two-wheeler insurance is mandatory in India and provides financial protection against various risks 
                including accidents, theft, and third-party liability. It's essential for all bike and scooter owners 
                to have adequate insurance coverage.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Types of Two-Wheeler Insurance:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Third Party Insurance:</strong> Mandatory coverage for third-party liability</li>
                <li><strong>Comprehensive Insurance:</strong> Covers own damage and third-party liability</li>
                <li><strong>Zero Depreciation:</strong> Full coverage without depreciation deduction</li>
                <li><strong>Return to Invoice:</strong> Covers the original invoice value</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Factors Affecting Premiums:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Vehicle Type:</strong> Motorcycles, scooters, and mopeds have different rates</li>
                <li><strong>Engine Capacity:</strong> Higher CC engines have higher premiums</li>
                <li><strong>Age of Vehicle:</strong> Older vehicles may have higher premiums</li>
                <li><strong>Location:</strong> Urban areas typically have higher rates</li>
                <li><strong>Coverage Type:</strong> Comprehensive coverage costs more than third-party</li>
                <li><strong>No Claim Bonus:</strong> Discounts for claim-free years</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tips for Two-Wheeler Insurance:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Compare quotes from multiple insurers before purchasing</li>
                <li>Maintain a good driving record to earn No Claim Bonus</li>
                <li>Consider add-on covers like personal accident and roadside assistance</li>
                <li>Renew your policy before expiry to avoid penalties</li>
                <li>Keep all documents safe and accessible</li>
                <li>Update your policy when making modifications to your vehicle</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Insurance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/insurance-tools/car-insurance-calculator" className="text-blue-600 hover:text-blue-800 underline">Car Insurance Calculator</RouterLink>
                  <RouterLink to="/insurance-tools/home-insurance-estimator" className="text-blue-600 hover:text-blue-800 underline">Home Insurance Estimator</RouterLink>
                  <RouterLink to="/insurance-tools/portfolio-dashboard" className="text-blue-600 hover:text-blue-800 underline">Insurance Portfolio Dashboard</RouterLink>
                  <RouterLink to="/insurance-tools/travel-insurance-selector" className="text-blue-600 hover:text-blue-800 underline">Travel Insurance Selector</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TwoWheelerTracker;
