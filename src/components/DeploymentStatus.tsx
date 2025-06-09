import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Clock, RefreshCw } from 'lucide-react';

interface DeploymentStatusProps {
  deployId?: string;
}

export const DeploymentStatus: React.FC<DeploymentStatusProps> = ({ deployId }) => {
  const [status, setStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');
  const [deployUrl, setDeployUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkDeploymentStatus = async () => {
    if (!deployId) {
      setStatus('idle');
      setMessage('No deployment in progress');
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real implementation, this would be an API call to check deployment status
      // For demonstration, we'll simulate a deployment status check
      const response = await fetch(`/api/deployment-status?id=${deployId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch deployment status');
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setStatus('success');
        setMessage('Deployment completed successfully!');
        setDeployUrl(data.deployUrl || '');
      } else if (data.status === 'error') {
        setStatus('error');
        setMessage(data.message || 'Deployment failed');
      } else {
        setStatus('deploying');
        setMessage(data.message || 'Deployment in progress...');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to check deployment status');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (deployId) {
      checkDeploymentStatus();
      
      // Set up polling to check status every 10 seconds
      const interval = setInterval(checkDeploymentStatus, 10000);
      
      return () => clearInterval(interval);
    }
  }, [deployId]);

  if (status === 'idle') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-md w-full bg-white rounded-lg shadow-lg p-4 border border-neutral-200 z-50">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          {status === 'deploying' && <Clock className="h-5 w-5 text-primary-600" />}
          {status === 'success' && <CheckCircle className="h-5 w-5 text-success-600" />}
          {status === 'error' && <AlertCircle className="h-5 w-5 text-error-600" />}
        </div>
        <div className="ml-3 w-full">
          <h3 className="text-sm font-medium text-neutral-900">
            {status === 'deploying' && 'Deployment in Progress'}
            {status === 'success' && 'Deployment Successful'}
            {status === 'error' && 'Deployment Failed'}
          </h3>
          <p className="mt-1 text-sm text-neutral-600">{message}</p>
          
          {status === 'success' && deployUrl && (
            <div className="mt-2">
              <a 
                href={deployUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-primary-100 text-primary-800 hover:bg-primary-200"
              >
                View Deployed Site
              </a>
            </div>
          )}
          
          <div className="mt-2 flex justify-between">
            <button
              onClick={checkDeploymentStatus}
              disabled={isLoading}
              className="inline-flex items-center text-xs text-neutral-600 hover:text-neutral-900"
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Status
            </button>
            
            {status === 'error' && (
              <button
                className="inline-flex items-center text-xs text-error-600 hover:text-error-800"
              >
                View Logs
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentStatus;