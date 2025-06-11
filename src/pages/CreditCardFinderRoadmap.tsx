import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Calendar, CheckSquare, AlertTriangle, ExternalLink } from 'lucide-react';

export const CreditCardFinderRoadmap: React.FC = () => {
  const navigate = useNavigate();
  const [roadmapContent, setRoadmapContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Fetch the HTML content from the roadmap file
    fetch('/credit-card-finder-roadmap.html')
      .then(response => response.text())
      .then(html => {
        // Extract the body content from the HTML
        const bodyContent = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || '';
        setRoadmapContent(bodyContent);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading roadmap content:', error);
        setLoading(false);
      });
  }, []);
  
  return (
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
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="roadmap-content" dangerouslySetInnerHTML={{ __html: roadmapContent }}></div>
      )}
      
      <div className="mt-12 bg-[--primary-50] rounded-xl p-6 border border-[--primary-100]">
        <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Related Financial Tools</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            to="/calculators/emi-calculator" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">EMI Calculator</h4>
            <p className="text-xs text-[--primary-600]">Calculate your loan EMI, total interest, and payment schedule</p>
          </Link>
          <Link 
            to="/calculators/loan-comparison-calculator" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">Loan Comparison Calculator</h4>
            <p className="text-xs text-[--primary-600]">Compare different loan offers side by side</p>
          </Link>
          <Link 
            to="/calculators/credit-card-emi-calculator" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">Credit Card EMI Calculator</h4>
            <p className="text-xs text-[--primary-600]">Calculate EMI for credit card payments</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreditCardFinderRoadmap;