import React, { useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { Link } from 'react-router-dom';
import { Users, Target, TrendingUp, BarChart3, UserCheck, Building, Lightbulb, FileText, Download, Save } from 'lucide-react';

const CustomerPersonaBuilder: React.FC = () => {
  const [persona, setPersona] = useState({
    name: '',
    age: '',
    gender: '',
    occupation: '',
    income: '',
    location: '',
    interests: '',
    motivation: '',
    painPoints: '',
    behavior: '',
    goals: '',
    challenges: '',
    preferredChannels: '',
    buyingHabits: '',
    techSavviness: ''
  });

  const [personas, setPersonas] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('builder');

  const handleInputChange = (field: string, value: string) => {
    setPersona(prev => ({ ...prev, [field]: value }));
  };

  const savePersona = () => {
    if (persona.name.trim()) {
      setPersonas(prev => [...prev, { ...persona, id: Date.now() }]);
      setPersona({
        name: '', age: '', gender: '', occupation: '', income: '', location: '',
        interests: '', motivation: '', painPoints: '', behavior: '', goals: '',
        challenges: '', preferredChannels: '', buyingHabits: '', techSavviness: ''
      });
    }
  };

  const downloadPersona = (personaData: any) => {
    const content = `Customer Persona Report

Name: ${personaData.name}
Age: ${personaData.age}
Gender: ${personaData.gender}
Occupation: ${personaData.occupation}
Income: ${personaData.income}
Location: ${personaData.location}

Interests: ${personaData.interests}
Motivation: ${personaData.motivation}
Pain Points: ${personaData.painPoints}
Behavior: ${personaData.behavior}
Goals: ${personaData.goals}
Challenges: ${personaData.challenges}
Preferred Channels: ${personaData.preferredChannels}
Buying Habits: ${personaData.buyingHabits}
Tech Savviness: ${personaData.techSavviness}

Generated on: ${new Date().toLocaleDateString()}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `persona-${personaData.name.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const samplePersonas = [
    {
      name: 'Sarah Tech-Savvy',
      age: '28',
      occupation: 'Software Developer',
      income: '₹8-12 LPA',
      interests: 'Technology, Fitness, Travel',
      motivation: 'Career growth and work-life balance',
      painPoints: 'Limited time for personal development',
      behavior: 'Researches extensively before purchases'
    },
    {
      name: 'Rajesh Family Man',
      age: '35',
      occupation: 'Business Analyst',
      income: '₹12-18 LPA',
      interests: 'Family, Investment, Real Estate',
      motivation: 'Financial security for family',
      painPoints: 'Complex financial decisions',
      behavior: 'Consults family before major decisions'
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Customer Persona Builder - Create Detailed Buyer Profiles | MoneyCal.in"
        description="Build comprehensive customer personas to understand your target audience better. Create detailed buyer profiles for effective marketing and business strategy."
        keywords="customer persona builder, buyer persona, target audience, marketing strategy, business planning, customer profiling"
        url="/tools/customer-persona-builder"
        type="website"
        image="/images/customer-persona.jpg"
        tags={["business tools", "marketing", "customer analysis", "persona builder", "target audience"]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Customer Persona Builder
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create detailed customer personas to understand your target audience better. 
              Build comprehensive buyer profiles for effective marketing and business strategy.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => setActiveTab('builder')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'builder' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <UserCheck className="h-4 w-4 inline mr-2" />
                Persona Builder
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'saved' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FileText className="h-4 w-4 inline mr-2" />
                Saved Personas
              </button>
              <button
                onClick={() => setActiveTab('samples')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'samples' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Lightbulb className="h-4 w-4 inline mr-2" />
                Sample Personas
              </button>
            </div>
          </div>

          {activeTab === 'builder' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Target className="h-6 w-6 mr-2 text-blue-600" />
                  Build Your Persona
                </h2>
                
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={persona.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="e.g., Sarah Tech-Savvy"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                        <input
                          type="text"
                          value={persona.age}
                          onChange={(e) => handleInputChange('age', e.target.value)}
                          placeholder="e.g., 28"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                          value={persona.gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                        <input
                          type="text"
                          value={persona.occupation}
                          onChange={(e) => handleInputChange('occupation', e.target.value)}
                          placeholder="e.g., Software Developer"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Income Range</label>
                        <select
                          value={persona.income}
                          onChange={(e) => handleInputChange('income', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Income</option>
                          <option value="₹2-5 LPA">₹2-5 LPA</option>
                          <option value="₹5-8 LPA">₹5-8 LPA</option>
                          <option value="₹8-12 LPA">₹8-12 LPA</option>
                          <option value="₹12-18 LPA">₹12-18 LPA</option>
                          <option value="₹18-25 LPA">₹18-25 LPA</option>
                          <option value="₹25+ LPA">₹25+ LPA</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={persona.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          placeholder="e.g., Bangalore, India"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Psychographics */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Psychographics</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Interests & Hobbies</label>
                        <textarea
                          value={persona.interests}
                          onChange={(e) => handleInputChange('interests', e.target.value)}
                          placeholder="e.g., Technology, Fitness, Travel, Reading"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Primary Motivation</label>
                        <textarea
                          value={persona.motivation}
                          onChange={(e) => handleInputChange('motivation', e.target.value)}
                          placeholder="e.g., Career growth, Financial security, Work-life balance"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pain Points</label>
                        <textarea
                          value={persona.painPoints}
                          onChange={(e) => handleInputChange('painPoints', e.target.value)}
                          placeholder="e.g., Limited time, Complex decisions, Budget constraints"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Behavior */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Behavior & Preferences</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Buying Behavior</label>
                        <textarea
                          value={persona.behavior}
                          onChange={(e) => handleInputChange('behavior', e.target.value)}
                          placeholder="e.g., Researches extensively, Consults reviews, Price-conscious"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Channels</label>
                        <input
                          type="text"
                          value={persona.preferredChannels}
                          onChange={(e) => handleInputChange('preferredChannels', e.target.value)}
                          placeholder="e.g., Social media, Email, Mobile apps"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tech Savviness</label>
                        <select
                          value={persona.techSavviness}
                          onChange={(e) => handleInputChange('techSavviness', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Level</option>
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={savePersona}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Persona
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-2 text-green-600" />
                  Persona Preview
                </h2>
                
                {persona.name ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{persona.name}</h3>
                      <p className="text-gray-600">{persona.age} years old • {persona.occupation}</p>
                      <p className="text-gray-600">{persona.location} • {persona.income}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">Interests</h4>
                        <p className="text-gray-600">{persona.interests || 'Not specified'}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Motivation</h4>
                        <p className="text-gray-600">{persona.motivation || 'Not specified'}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Pain Points</h4>
                        <p className="text-gray-600">{persona.painPoints || 'Not specified'}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Buying Behavior</h4>
                        <p className="text-gray-600">{persona.behavior || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Start building your persona to see a preview here</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FileText className="h-6 w-6 mr-2 text-blue-600" />
                Saved Personas
              </h2>
              
              {personas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {personas.map((persona, index) => (
                    <div key={persona.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-800">{persona.name}</h3>
                        <button
                          onClick={() => downloadPersona(persona)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{persona.age} • {persona.occupation}</p>
                      <p className="text-sm text-gray-600 mb-2">{persona.location} • {persona.income}</p>
                      <p className="text-sm text-gray-600">{persona.interests}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No saved personas yet. Create your first persona!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'samples' && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Lightbulb className="h-6 w-6 mr-2 text-yellow-600" />
                Sample Personas
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {samplePersonas.map((persona, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{persona.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{persona.age} • {persona.occupation}</p>
                    <p className="text-sm text-gray-600 mb-2">{persona.income}</p>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500"><strong>Interests:</strong> {persona.interests}</p>
                      <p className="text-xs text-gray-500"><strong>Motivation:</strong> {persona.motivation}</p>
                      <p className="text-xs text-gray-500"><strong>Pain Points:</strong> {persona.painPoints}</p>
                      <p className="text-xs text-gray-500"><strong>Behavior:</strong> {persona.behavior}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Educational Content */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                Why Build Personas?
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Understand your target audience better</li>
                <li>• Create more effective marketing campaigns</li>
                <li>• Improve product development decisions</li>
                <li>• Enhance customer experience</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Best Practices
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Use real data when possible</li>
                <li>• Include both demographics and psychographics</li>
                <li>• Update personas regularly</li>
                <li>• Share with your entire team</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Building className="h-5 w-5 mr-2 text-purple-600" />
                Business Impact
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 56% higher conversion rates</li>
                <li>• 73% better customer retention</li>
                <li>• 48% more effective marketing</li>
                <li>• 39% improved product adoption</li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Note</h3>
            <p className="text-yellow-700 text-sm">
              Customer personas are tools for understanding your target audience. They should be based on real data 
              and research whenever possible. Use these insights to inform your business decisions, but always 
              validate with actual customer feedback and market research.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerPersonaBuilder; 