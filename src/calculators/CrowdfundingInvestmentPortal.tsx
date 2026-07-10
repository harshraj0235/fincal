import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Search, Filter, TrendingUp, Users, Building, Calendar, ExternalLink, Info, AlertTriangle, Heart } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  minInvestment: number;
  equity: number;
  duration: number;
  location: string;
  risk: 'Low' | 'Medium' | 'High';
  expectedReturn: string;
  image: string;
  featured: boolean;
}

export const CrowdfundingInvestmentPortal: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [minInvestment, setMinInvestment] = useState<number>(1000);
  const [maxInvestment, setMaxInvestment] = useState<number>(1000000);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [savedProjects, setSavedProjects] = useState<string[]>([]);
  
  // Sample project data
  useEffect(() => {
    const sampleProjects: Project[] = [
      {
        id: "p1",
        name: "EcoHomes: Sustainable Housing Solutions",
        category: "Real Estate",
        description: "EcoHomes is developing affordable, environmentally sustainable housing solutions using innovative construction techniques and renewable materials. Their patented design reduces energy consumption by 60% compared to traditional homes.",
        targetAmount: 5000000,
        raisedAmount: 3200000,
        minInvestment: 25000,
        equity: 8,
        duration: 24,
        location: "Bangalore",
        risk: "Medium",
        expectedReturn: "18-22% over 3 years",
        image: "https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        featured: true
      },
      {
        id: "p2",
        name: "HealthTech AI: Medical Diagnostics Platform",
        category: "Healthcare",
        description: "HealthTech AI is developing an artificial intelligence platform that can diagnose common diseases from medical images with 95% accuracy. Their technology aims to make healthcare more accessible and affordable in rural areas.",
        targetAmount: 10000000,
        raisedAmount: 7500000,
        minInvestment: 50000,
        equity: 5,
        duration: 18,
        location: "Mumbai",
        risk: "High",
        expectedReturn: "25-30% over 5 years",
        image: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        featured: true
      },
      {
        id: "p3",
        name: "FarmFresh: Farm-to-Table Marketplace",
        category: "Agriculture",
        description: "FarmFresh connects farmers directly with consumers through a digital marketplace, eliminating middlemen and ensuring better prices for farmers and fresher produce for consumers. They've already onboarded 500+ farmers in Maharashtra.",
        targetAmount: 3000000,
        raisedAmount: 1800000,
        minInvestment: 10000,
        equity: 12,
        duration: 30,
        location: "Pune",
        risk: "Medium",
        expectedReturn: "15-18% over 3 years",
        image: "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        featured: false
      },
      {
        id: "p4",
        name: "EduTech Plus: Personalized Learning Platform",
        category: "Education",
        description: "EduTech Plus uses machine learning to create personalized learning paths for K-12 students. Their platform adapts to each student's learning style and pace, improving engagement and outcomes by 40% in pilot programs.",
        targetAmount: 7000000,
        raisedAmount: 4200000,
        minInvestment: 20000,
        equity: 7,
        duration: 36,
        location: "Delhi",
        risk: "Medium",
        expectedReturn: "20-25% over 4 years",
        image: "https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        featured: false
      },
      {
        id: "p5",
        name: "CleanEnergy Solar: Affordable Solar Solutions",
        category: "Renewable Energy",
        description: "CleanEnergy Solar is making solar power accessible to middle-class households with innovative financing models and efficient installation processes. They've completed 200+ installations in the past year.",
        targetAmount: 8000000,
        raisedAmount: 6500000,
        minInvestment: 30000,
        equity: 6,
        duration: 24,
        location: "Chennai",
        risk: "Low",
        expectedReturn: "12-15% over 5 years",
        image: "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        featured: true
      },
      {
        id: "p6",
        name: "FinTech Secure: Blockchain Payment Solution",
        category: "Fintech",
        description: "FinTech Secure is building a blockchain-based payment solution that reduces transaction costs by 80% while improving security. Their technology is being piloted by two regional banks.",
        targetAmount: 12000000,
        raisedAmount: 9000000,
        minInvestment: 100000,
        equity: 4,
        duration: 12,
        location: "Hyderabad",
        risk: "High",
        expectedReturn: "30-35% over 4 years",
        image: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        featured: false
      },
      {
        id: "p7",
        name: "EcoPackaging: Biodegradable Packaging Solutions",
        category: "Manufacturing",
        description: "EcoPackaging produces 100% biodegradable packaging materials from agricultural waste. Their products are 20% cheaper than traditional plastic packaging and decompose within 180 days.",
        targetAmount: 4000000,
        raisedAmount: 2500000,
        minInvestment: 15000,
        equity: 10,
        duration: 36,
        location: "Ahmedabad",
        risk: "Medium",
        expectedReturn: "16-20% over 3 years",
        image: "https://images.pexels.com/photos/7262897/pexels-photo-7262897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        featured: false
      },
      {
        id: "p8",
        name: "TravelTech: AI Travel Assistant",
        category: "Travel",
        description: "TravelTech is developing an AI-powered travel assistant that helps users plan, book, and manage their trips with personalized recommendations. They've acquired 50,000 users in beta testing.",
        targetAmount: 6000000,
        raisedAmount: 3800000,
        minInvestment: 25000,
        equity: 9,
        duration: 24,
        location: "Bangalore",
        risk: "Medium",
        expectedReturn: "20-24% over 4 years",
        image: "https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        featured: false
      },
      {
        id: "p9",
        name: "Urban Farming: Vertical Farming Technology",
        category: "Agriculture",
        description: "Urban Farming is revolutionizing food production with vertical farming technology that uses 95% less water and 99% less land than traditional farming while producing organic vegetables in urban environments.",
        targetAmount: 9000000,
        raisedAmount: 5500000,
        minInvestment: 40000,
        equity: 7.5,
        duration: 30,
        location: "Mumbai",
        risk: "Medium",
        expectedReturn: "18-22% over 5 years",
        image: "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        featured: false
      },
      {
        id: "p10",
        name: "WasteManagement Pro: Smart Waste Solutions",
        category: "Environment",
        description: "WasteManagement Pro uses IoT sensors and route optimization to make waste collection 40% more efficient. Their system is already implemented in two municipalities with excellent results.",
        targetAmount: 5500000,
        raisedAmount: 3200000,
        minInvestment: 20000,
        equity: 8.5,
        duration: 36,
        location: "Delhi",
        risk: "Low",
        expectedReturn: "14-16% over 4 years",
        image: "https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        featured: false
      }
    ];
    
    setProjects(sampleProjects);
    setFilteredProjects(sampleProjects);
    
    // Set initial investment amount for first project
    if (sampleProjects.length > 0) {
      setInvestmentAmount(sampleProjects[0].minInvestment);
    }
  }, []);
  
  // Apply filters
  useEffect(() => {
    let result = [...projects];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(project => project.category === selectedCategory);
    }
    
    // Apply risk filter
    if (selectedRisk !== 'All') {
      result = result.filter(project => project.risk === selectedRisk);
    }
    
    // Apply location filter
    if (selectedLocation !== 'All') {
      result = result.filter(project => project.location === selectedLocation);
    }
    
    // Apply investment range filter
    result = result.filter(project => 
      project.minInvestment >= minInvestment && project.minInvestment <= maxInvestment
    );
    
    setFilteredProjects(result);
  }, [searchTerm, selectedCategory, selectedRisk, selectedLocation, minInvestment, maxInvestment, projects]);
  
  // Get unique categories
  const categories = ['All', ...new Set(projects.map(project => project.category))];
  
  // Get unique locations
  const locations = ['All', ...new Set(projects.map(project => project.location))];
  
  // Get unique risk levels
  const riskLevels = ['All', 'Low', 'Medium', 'High'];
  
  // Open project details
  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setInvestmentAmount(project.minInvestment);
  };
  
  // Close project details
  const closeProjectDetails = () => {
    setSelectedProject(null);
  };
  
  // Toggle save project
  const toggleSaveProject = (projectId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (savedProjects.includes(projectId)) {
      setSavedProjects(savedProjects.filter(id => id !== projectId));
    } else {
      setSavedProjects([...savedProjects, projectId]);
    }
  };
  
  // Get risk color
  const getRiskColor = (risk: 'Low' | 'Medium' | 'High') => {
    switch (risk) {
      case 'Low':
        return 'bg-[--success-100] text-[--success-800]';
      case 'Medium':
        return 'bg-[--warning-100] text-[--warning-800]';
      case 'High':
        return 'bg-[--error-100] text-[--error-800]';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };
  
  return (
    <>
    <SEOHelmet
      title="Crowdfunding Startup Investment Portal India 2026 - Evaluate Startup Deals | MoneyCal"
      description="Discover and evaluate startup crowdfunding opportunities with filters for risk, ticket size, category, and expected return."
      keywords="startup crowdfunding india, equity crowdfunding investment portal, startup deal evaluation tool, crowdfunding risk assessment"
      url="/calculators/crowdfunding-investment-portal"
    />
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Crowdfunding Investment Portal</h2>
        <p className="text-neutral-600">
          Discover and invest in promising startups and small businesses across India. Support innovation while diversifying your investment portfolio with equity crowdfunding opportunities.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto w-full px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg flex items-center justify-center hover:bg-neutral-200"
          >
            <Filter className="h-5 w-5 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        {showFilters && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input w-full"
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Risk Level
                </label>
                <select
                  value={selectedRisk}
                  onChange={(e) => setSelectedRisk(e.target.value)}
                  className="input w-full"
                >
                  {riskLevels.map((risk, index) => (
                    <option key={index} value={risk}>{risk}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="input w-full"
                >
                  {locations.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Minimum Investment Range: {formatCurrency(minInvestment)} - {formatCurrency(maxInvestment)}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={minInvestment}
                  onChange={(e) => setMinInvestment(Number(e.target.value))}
                  className="slider flex-grow"
                />
                <input
                  type="range"
                  min="100000"
                  max="1000000"
                  step="10000"
                  value={maxInvestment}
                  onChange={(e) => setMaxInvestment(Number(e.target.value))}
                  className="slider flex-grow"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Featured Projects Section */}
      {!selectedProject && filteredProjects.some(p => p.featured) && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">Featured Opportunities</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.filter(p => p.featured).map((project) => (
              <div 
                key={project.id}
                onClick={() => openProjectDetails(project)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 p-2">
                    <button
                      onClick={(e) => toggleSaveProject(project.id, e)}
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        savedProjects.includes(project.id)
                          ? 'bg-[--error-100] text-[--error-600]'
                          : 'bg-white/80 text-neutral-500 hover:text-[--error-600]'
                      }`}
                    >
                      <Heart className="h-5 w-5" fill={savedProjects.includes(project.id) ? "#dc2626" : "none"} />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getRiskColor(project.risk)}`}>
                      {project.risk} Risk
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-neutral-900 mb-1">{project.name}</h4>
                  <p className="text-sm text-neutral-500 mb-3">{project.category} • {project.location}</p>
                  
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-neutral-500 mb-1">
                      <span>Raised: {formatCurrency(project.raisedAmount)}</span>
                      <span>{Math.round((project.raisedAmount / project.targetAmount) * 100)}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-[--primary-600] h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (project.raisedAmount / project.targetAmount) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-neutral-500">Min. Investment</p>
                      <p className="font-medium text-neutral-900">{formatCurrency(project.minInvestment)}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Equity Offered</p>
                      <p className="font-medium text-neutral-900">{project.equity}%</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Expected Return</p>
                      <p className="font-medium text-[--success-600]">{project.expectedReturn}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Projects Section */}
      {!selectedProject && (
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">All Investment Opportunities</h3>
          
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-lg text-neutral-600 mb-4">No projects match your current filters.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedRisk('All');
                  setSelectedLocation('All');
                  setMinInvestment(1000);
                  setMaxInvestment(1000000);
                }}
                className="px-4 py-2 bg-[--primary-600] text-white rounded-lg hover:bg-[--primary-700]"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => openProjectDetails(project)}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 p-2">
                      <button
                        onClick={(e) => toggleSaveProject(project.id, e)}
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          savedProjects.includes(project.id)
                            ? 'bg-[--error-100] text-[--error-600]'
                            : 'bg-white/80 text-neutral-500 hover:text-[--error-600]'
                        }`}
                      >
                        <Heart className="h-5 w-5" fill={savedProjects.includes(project.id) ? "#dc2626" : "none"} />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getRiskColor(project.risk)}`}>
                        {project.risk} Risk
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-neutral-900 mb-1">{project.name}</h4>
                    <p className="text-sm text-neutral-500 mb-3">{project.category} • {project.location}</p>
                    
                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-neutral-500 mb-1">
                        <span>Raised: {formatCurrency(project.raisedAmount)}</span>
                        <span>{Math.round((project.raisedAmount / project.targetAmount) * 100)}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div 
                          className="bg-[--primary-600] h-2 rounded-full" 
                          style={{ width: `${Math.min(100, (project.raisedAmount / project.targetAmount) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-neutral-500">Min. Investment</p>
                        <p className="font-medium text-neutral-900">{formatCurrency(project.minInvestment)}</p>
                      </div>
                      <div>
                        <p className="text-neutral-500">Equity Offered</p>
                        <p className="font-medium text-neutral-900">{project.equity}%</p>
                      </div>
                      <div>
                        <p className="text-neutral-500">Expected Return</p>
                        <p className="font-medium text-[--success-600]">{project.expectedReturn}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.name} 
                className="w-full h-full object-cover"
              />
              <button
                onClick={closeProjectDetails}
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
              >
                ✕
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">{selectedProject.name}</h3>
                <p className="text-white/80">{selectedProject.category} • {selectedProject.location}</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Building className="h-5 w-5 text-neutral-500 mr-2" />
                    <h4 className="font-medium text-neutral-900">Funding Details</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Target Amount</span>
                      <span className="font-medium text-neutral-900">{formatCurrency(selectedProject.targetAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Raised So Far</span>
                      <span className="font-medium text-neutral-900">{formatCurrency(selectedProject.raisedAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Equity Offered</span>
                      <span className="font-medium text-neutral-900">{selectedProject.equity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Min. Investment</span>
                      <span className="font-medium text-neutral-900">{formatCurrency(selectedProject.minInvestment)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-neutral-500 mr-2" />
                    <h4 className="font-medium text-neutral-900">Investment Metrics</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Risk Level</span>
                      <span className={`font-medium ${
                        selectedProject.risk === 'Low' ? 'text-[--success-600]' :
                        selectedProject.risk === 'Medium' ? 'text-[--warning-600]' :
                        'text-[--error-600]'
                      }`}>{selectedProject.risk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Expected Return</span>
                      <span className="font-medium text-[--success-600]">{selectedProject.expectedReturn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Funding Progress</span>
                      <span className="font-medium text-neutral-900">
                        {Math.round((selectedProject.raisedAmount / selectedProject.targetAmount) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-neutral-500 mr-2" />
                    <h4 className="font-medium text-neutral-900">Timeline</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Campaign Duration</span>
                      <span className="font-medium text-neutral-900">{selectedProject.duration} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Days Remaining</span>
                      <span className="font-medium text-neutral-900">
                        {Math.floor(Math.random() * selectedProject.duration) + 1} days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Investors</span>
                      <span className="font-medium text-neutral-900">
                        {Math.floor(selectedProject.raisedAmount / (selectedProject.minInvestment * 1.5))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">About the Project</h4>
                <p className="text-neutral-600 mb-4">{selectedProject.description}</p>
                <p className="text-neutral-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                </p>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-[--primary-50] rounded-lg">
                    <h5 className="font-medium text-[--primary-800] mb-1">Business Model</h5>
                    <p className="text-sm text-[--primary-600]">
                      The company generates revenue through subscription fees, transaction commissions, and premium services. They've achieved a 40% month-over-month growth rate in the past quarter.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-[--primary-50] rounded-lg">
                    <h5 className="font-medium text-[--primary-800] mb-1">Market Opportunity</h5>
                    <p className="text-sm text-[--primary-600]">
                      The addressable market is estimated at ₹15,000 crores annually with a projected CAGR of 25% over the next five years, driven by increasing demand and favorable government policies.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-[--primary-50] rounded-lg">
                    <h5 className="font-medium text-[--primary-800] mb-1">Team</h5>
                    <p className="text-sm text-[--primary-600]">
                      Led by experienced entrepreneurs with previous successful exits and domain experts with 15+ years of industry experience. The team has a strong track record in scaling startups.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-[--primary-50] rounded-lg">
                    <h5 className="font-medium text-[--primary-800] mb-1">Use of Funds</h5>
                    <p className="text-sm text-[--primary-600]">
                      40% for product development, 30% for marketing and customer acquisition, 20% for team expansion, and 10% for operational expenses and infrastructure.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Investment Calculator</h4>
                
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Investment Amount (₹)
                    </label>
                    <input
                      type="number"
                      min={selectedProject.minInvestment}
                      step={1000}
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      className="input w-full"
                    />
                    <p className="mt-1 text-xs text-neutral-500">
                      Minimum investment: {formatCurrency(selectedProject.minInvestment)}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm text-neutral-500 mb-1">Equity Received</p>
                      <p className="text-xl font-bold text-neutral-900">
                        {((investmentAmount / selectedProject.targetAmount) * selectedProject.equity).toFixed(3)}%
                      </p>
                    </div>
                    
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm text-neutral-500 mb-1">Potential Value (Low)</p>
                      <p className="text-xl font-bold text-[--success-600]">
                        {formatCurrency(investmentAmount * 1.5)}
                      </p>
                    </div>
                    
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm text-neutral-500 mb-1">Potential Value (High)</p>
                      <p className="text-xl font-bold text-[--success-600]">
                        {formatCurrency(investmentAmount * 2.5)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-[--warning-50] rounded-lg border border-[--warning-200] mb-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-[--warning-600] mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-medium text-[--warning-800] mb-1">Risk Disclosure</h4>
                    <p className="text-sm text-[--warning-700]">
                      Startup investments are high-risk and illiquid. You should only invest what you can afford to lose. Past performance is not indicative of future results. Please read all offering documents carefully before investing.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={closeProjectDetails}
                  className="px-4 py-3 rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200 font-medium"
                >
                  Back to Projects
                </button>
                
                <button
                  className="px-4 py-3 rounded-lg text-white bg-[--primary-600] hover:bg-[--primary-700] font-medium flex-grow sm:flex-grow-0 sm:flex-1"
                >
                  Invest Now
                </button>
                
                <button
                  onClick={(e) => toggleSaveProject(selectedProject.id, e)}
                  className={`px-4 py-3 rounded-lg font-medium flex items-center justify-center ${
                    savedProjects.includes(selectedProject.id)
                      ? 'bg-[--error-100] text-[--error-600] hover:bg-[--error-200]'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <Heart className="h-5 w-5 mr-2" fill={savedProjects.includes(selectedProject.id) ? "#dc2626" : "none"} />
                  {savedProjects.includes(selectedProject.id) ? 'Saved' : 'Save Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h3 className="text-xl font-semibold text-neutral-900 mb-4">About Equity Crowdfunding</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-neutral-900 mb-2">How It Works</h4>
            <p className="text-sm text-neutral-600 mb-3">
              Equity crowdfunding allows you to invest in early-stage companies in exchange for equity (ownership). Unlike traditional crowdfunding where you receive products or rewards, equity crowdfunding makes you a partial owner of the business.
            </p>
            <ol className="list-decimal list-inside text-sm text-neutral-600 space-y-1">
              <li>Browse projects and conduct due diligence</li>
              <li>Choose your investment amount (above the minimum)</li>
              <li>Complete the investment process online</li>
              <li>Receive equity shares in the company</li>
              <li>Potentially profit when the company grows, gets acquired, or goes public</li>
            </ol>
          </div>
          
          <div>
            <h4 className="font-medium text-neutral-900 mb-2">Benefits & Risks</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-[--success-50] rounded-lg">
                <h5 className="text-sm font-medium text-[--success-800] mb-1">Benefits</h5>
                <ul className="list-disc list-inside text-xs text-[--success-700] space-y-1">
                  <li>Access to early-stage investment opportunities</li>
                  <li>Portfolio diversification</li>
                  <li>Low investment minimums</li>
                  <li>Support innovative businesses</li>
                  <li>Potential for high returns</li>
                </ul>
              </div>
              
              <div className="p-3 bg-[--error-50] rounded-lg">
                <h5 className="text-sm font-medium text-[--error-800] mb-1">Risks</h5>
                <ul className="list-disc list-inside text-xs text-[--error-700] space-y-1">
                  <li>High failure rate of startups</li>
                  <li>Illiquid investments (3-7+ years)</li>
                  <li>Limited investor rights</li>
                  <li>Potential for dilution</li>
                  <li>Limited financial information</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-[--primary-50] rounded-lg">
          <h4 className="font-medium text-[--primary-800] mb-2">Regulatory Framework in India</h4>
          <p className="text-sm text-[--primary-700] mb-3">
            Equity crowdfunding in India is regulated by SEBI (Securities and Exchange Board of India). Key regulations include:
          </p>
          <ul className="list-disc list-inside text-sm text-[--primary-700] space-y-1">
            <li>Only SEBI-registered platforms can facilitate equity crowdfunding</li>
            <li>Investment limits based on investor income and net worth</li>
            <li>Disclosure requirements for companies raising funds</li>
            <li>Restrictions on the types of companies that can raise funds</li>
            <li>Cooling-off period for investors to reconsider their investment</li>
          </ul>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-[--primary-50] rounded-lg p-6 border border-[--primary-100] mt-8">
        <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Related Investment Tools</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a 
            href="/calculators/risk-appetite-assessment" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">Risk Appetite Assessment</h4>
            <p className="text-xs text-[--primary-600]">Determine your investment risk tolerance</p>
          </a>
          <a 
            href="/calculators/asset-allocation-planner" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">Asset Allocation Planner</h4>
            <p className="text-xs text-[--primary-600]">Create a balanced portfolio based on your risk profile</p>
          </a>
          <a 
            href="/calculators/xirr-tracker" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">XIRR Tracker</h4>
            <p className="text-xs text-[--primary-600]">Track returns on irregular investments</p>
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default CrowdfundingInvestmentPortal;