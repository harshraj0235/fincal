import React from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';

const AkshayaTritiyaMuhurat: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHelmet
        title="Akshaya Tritiya Muhurat Finder | MoneyCal India"
        description="Find the best Akshaya Tritiya muhurat for purchases and investments."
        url="/festival-tools/akshaya-tritiya-muhurat"
      />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Akshaya Tritiya Muhurat Finder</h1>
        <p className="text-gray-600 mb-6">
          Check auspicious timing for Akshaya Tritiya purchases and investments.
        </p>
        <Link to="/festival-tools" className="text-blue-600 hover:text-blue-800">
          Back to Festival Tools
        </Link>
      </div>
    </div>
  );
};

export default AkshayaTritiyaMuhurat;
