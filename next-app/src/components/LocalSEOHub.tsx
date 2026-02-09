import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, Users, Building, Calculator, Star, Search, Filter } from 'lucide-react';

interface CityData {
  id: string;
  name: string;
  state: string;
  population: string;
  searchVolume: number;
  competition: 'Low' | 'Medium' | 'High';
  opportunity: 'High' | 'Medium' | 'Low';
  topQueries: string[];
  localBusinesses: number;
  avgIncome: string;
  financeTrends: string[];
}

const LocalSEOHub: React.FC = () => {
  const [selectedState, setSelectedState] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState<CityData[]>([]);

  // Major Indian cities with finance search data
  const cityData: CityData[] = [
    {
      id: 'mumbai',
      name: 'Mumbai',
      state: 'Maharashtra',
      population: '20.4M',
      searchVolume: 45000,
      competition: 'High',
      opportunity: 'Medium',
      topQueries: ['home loan mumbai', 'mutual fund mumbai', 'tax consultant mumbai', 'investment advisor mumbai'],
      localBusinesses: 12500,
      avgIncome: '₹8.5L',
      financeTrends: ['High real estate investment', 'Strong mutual fund adoption', 'Active stock trading']
    },
    {
      id: 'delhi',
      name: 'Delhi',
      state: 'Delhi',
      population: '19.5M',
      searchVolume: 42000,
      competition: 'High',
      opportunity: 'Medium',
      topQueries: ['personal loan delhi', 'home loan delhi', 'mutual fund delhi', 'tax planning delhi'],
      localBusinesses: 11800,
      avgIncome: '₹7.8L',
      financeTrends: ['Government employee focus', 'Real estate investment', 'Pension planning']
    },
    {
      id: 'bangalore',
      name: 'Bangalore',
      state: 'Karnataka',
      population: '12.3M',
      searchVolume: 38000,
      competition: 'Medium',
      opportunity: 'High',
      topQueries: ['sip calculator bangalore', 'home loan bangalore', 'tax saving bangalore', 'investment bangalore'],
      localBusinesses: 9800,
      avgIncome: '₹9.2L',
      financeTrends: ['Tech employee investments', 'High SIP adoption', 'ESOP planning']
    },
    {
      id: 'hyderabad',
      name: 'Hyderabad',
      state: 'Telangana',
      population: '10.1M',
      searchVolume: 32000,
      competition: 'Medium',
      opportunity: 'High',
      topQueries: ['home loan hyderabad', 'mutual fund hyderabad', 'tax consultant hyderabad', 'investment hyderabad'],
      localBusinesses: 7500,
      avgIncome: '₹8.1L',
      financeTrends: ['IT sector growth', 'Real estate boom', 'Startup investments']
    },
    {
      id: 'chennai',
      name: 'Chennai',
      state: 'Tamil Nadu',
      population: '11.2M',
      searchVolume: 35000,
      competition: 'Medium',
      opportunity: 'High',
      topQueries: ['home loan chennai', 'mutual fund chennai', 'tax planning chennai', 'investment chennai'],
      localBusinesses: 8200,
      avgIncome: '₹7.5L',
      financeTrends: ['Manufacturing sector', 'Traditional investments', 'Gold investment preference']
    },
    {
      id: 'pune',
      name: 'Pune',
      state: 'Maharashtra',
      population: '7.1M',
      searchVolume: 28000,
      competition: 'Low',
      opportunity: 'High',
      topQueries: ['home loan pune', 'mutual fund pune', 'tax saving pune', 'investment pune'],
      localBusinesses: 5600,
      avgIncome: '₹8.8L',
      financeTrends: ['IT hub growth', 'Educational investments', 'Real estate development']
    },
    {
      id: 'ahmedabad',
      name: 'Ahmedabad',
      state: 'Gujarat',
      population: '8.1M',
      searchVolume: 25000,
      competition: 'Low',
      opportunity: 'High',
      topQueries: ['home loan ahmedabad', 'mutual fund ahmedabad', 'tax planning ahmedabad', 'investment ahmedabad'],
      localBusinesses: 4800,
      avgIncome: '₹6.8L',
      financeTrends: ['Business investments', 'Traditional savings', 'Real estate focus']
    },
    {
      id: 'kolkata',
      name: 'Kolkata',
      state: 'West Bengal',
      population: '14.9M',
      searchVolume: 30000,
      competition: 'Medium',
      opportunity: 'Medium',
      topQueries: ['home loan kolkata', 'mutual fund kolkata', 'tax consultant kolkata', 'investment kolkata'],
      localBusinesses: 6800,
      avgIncome: '₹6.2L',
      financeTrends: ['Traditional investments', 'Government sector', 'Real estate interest']
    },
    {
      id: 'surat',
      name: 'Surat',
      state: 'Gujarat',
      population: '6.9M',
      searchVolume: 18000,
      competition: 'Low',
      opportunity: 'High',
      topQueries: ['home loan surat', 'mutual fund surat', 'tax saving surat', 'investment surat'],
      localBusinesses: 3200,
      avgIncome: '₹7.2L',
      financeTrends: ['Diamond industry', 'Business investments', 'Real estate growth']
    },
    {
      id: 'jaipur',
      name: 'Jaipur',
      state: 'Rajasthan',
      population: '4.1M',
      searchVolume: 15000,
      competition: 'Low',
      opportunity: 'High',
      topQueries: ['home loan jaipur', 'mutual fund jaipur', 'tax planning jaipur', 'investment jaipur'],
      localBusinesses: 2800,
      avgIncome: '₹5.8L',
      financeTrends: ['Tourism industry', 'Traditional savings', 'Real estate development']
    }
  ];

  useEffect(() => {
    setCities(cityData);
  }, []);

  const filteredCities = cities.filter(city => {
    const matchesState = selectedState === 'all' || city.state === selectedState;
    const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         city.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         city.topQueries.some(query => query.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesState && matchesSearch;
  });

  const states = ['all', ...Array.from(new Set(cities.map(city => city.state)))];

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const totalSearchVolume = cities.reduce((sum, city) => sum + city.searchVolume, 0);
  const highOpportunityCities = cities.filter(city => city.opportunity === 'High').length;
  const lowCompetitionCities = cities.filter(city => city.competition === 'Low').length;
  const totalLocalBusinesses = cities.reduce((sum, city) => sum + city.localBusinesses, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Local SEO Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Target city-specific finance queries and dominate local search results. 
            Discover high-opportunity cities for finance content and local SEO optimization.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <MapPin className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{cities.length}</div>
            <div className="text-gray-600">Major Cities</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {totalSearchVolume.toLocaleString()}
            </div>
            <div className="text-gray-600">Total Search Volume</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{highOpportunityCities}</div>
            <div className="text-gray-600">High Opportunity</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Building className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {totalLocalBusinesses.toLocaleString()}
            </div>
            <div className="text-gray-600">Local Businesses</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Cities</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search cities, states, or finance queries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {states.map(state => (
                  <option key={state} value={state}>
                    {state === 'all' ? 'All States' : state}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => (
            <div key={city.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
                    <p className="text-gray-600">{city.state}</p>
                    <p className="text-sm text-gray-500">Population: {city.population}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{city.searchVolume.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Search Volume</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{city.avgIncome}</div>
                    <div className="text-xs text-gray-600">Avg Income</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{city.localBusinesses.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Local Businesses</div>
                  </div>
                </div>

                {/* Competition and Opportunity */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCompetitionColor(city.competition)}`}>
                    {city.competition} Competition
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOpportunityColor(city.opportunity)}`}>
                    {city.opportunity} Opportunity
                  </span>
                </div>

                {/* Top Queries */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Top Finance Queries:</h4>
                  <div className="space-y-1">
                    {city.topQueries.slice(0, 3).map((query, index) => (
                      <div key={index} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                        {query}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Finance Trends */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Finance Trends:</h4>
                  <div className="space-y-1">
                    {city.financeTrends.map((trend, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        • {trend}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 text-sm font-medium">
                  Create Local Content
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCities.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Cities Found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Dominate Local Finance Search</h3>
          <p className="text-lg mb-6 opacity-90">
            Create city-specific finance content and capture local search traffic. 
            Target high-opportunity cities with low competition for maximum impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Start Local SEO
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors duration-200">
              View Content Strategy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalSEOHub;
