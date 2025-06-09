import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Server, Code, Globe, CheckCircle, AlertTriangle } from 'lucide-react';
import { DeploymentStatusBar } from '../components/DeploymentStatusBar';

export const DeploymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [deployId, setDeployId] = useState<string | undefined>(undefined);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [deploymentError, setDeploymentError] = useState<string | null>(null);
  
  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentError(null);
    
    try {
      // In a real implementation, this would be an API call to trigger deployment
      // For demonstration, we'll simulate a deployment
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project: 'astro-finance'
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to start deployment');
      }
      
      const data = await response.json();
      setDeployId(data.deployId);
    } catch (error) {
      setDeploymentError('Failed to start deployment. Please try again.');
    } finally {
      setIsDeploying(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back</span>
        </button>
      </div>
      
      <div className="mb-8 flex items-center">
        <Server className="h-8 w-8 text-primary-600 mr-3" />
        <h1 className="text-3xl font-bold text-neutral-900">Deploy Astro-Finance Website</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Deployment Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border border-neutral-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                <Globe className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Production Deployment</h3>
            </div>
            <p className="text-neutral-600 mb-6">
              Deploy your Astro-Finance website to production. This will make your site available to the public.
            </p>
            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              className={`w-full btn ${
                isDeploying 
                  ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed' 
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {isDeploying ? 'Deploying...' : 'Deploy to Production'}
            </button>
          </div>
          
          <div className="border border-neutral-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                <Code className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Preview Deployment</h3>
            </div>
            <p className="text-neutral-600 mb-6">
              Deploy a preview version of your site to test changes before going to production.
            </p>
            <button
              className="w-full btn bg-white text-primary-600 border border-primary-600 hover:bg-primary-50"
            >
              Deploy Preview
            </button>
          </div>
        </div>
        
        {deploymentError && (
          <div className="bg-error-50 border-l-4 border-error-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-error-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-error-700">{deploymentError}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Deployment Checklist</h3>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle className="h-5 w-5 text-success-500" />
              </div>
              <div className="ml-3">
                <p className="text-neutral-700">All pages are responsive and mobile-friendly</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle className="h-5 w-5 text-success-500" />
              </div>
              <div className="ml-3">
                <p className="text-neutral-700">Navigation links are working correctly</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle className="h-5 w-5 text-success-500" />
              </div>
              <div className="ml-3">
                <p className="text-neutral-700">SEO meta tags are properly configured</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle className="h-5 w-5 text-success-500" />
              </div>
              <div className="ml-3">
                <p className="text-neutral-700">All zodiac sign pages are complete with detailed content</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle className="h-5 w-5 text-success-500" />
              </div>
              <div className="ml-3">
                <p className="text-neutral-700">Cross-linking between related signs is implemented</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Deployment History</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Version</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Deployed By</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">June 15, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">v1.0.0</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">
                    Successful
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">Admin</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600">
                  <a href="#" className="hover:text-primary-900">View</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">June 10, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">v0.9.5</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">
                    Successful
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">Admin</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600">
                  <a href="#" className="hover:text-primary-900">View</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">June 5, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">v0.9.0</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-error-100 text-error-800">
                    Failed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">Admin</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600">
                  <a href="#" className="hover:text-primary-900">View Logs</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {deployId && <DeploymentStatusBar deployId={deployId} />}
    </div>
  );
};

export default DeploymentPage;